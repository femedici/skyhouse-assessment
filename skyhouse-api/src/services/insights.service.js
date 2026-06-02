import { NEWS_CONFIG } from "../config/news.config.js";

class NewsError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = "NewsError";
    this.status = status;
  }
}

let cache = { data: null, expiresAt: 0 };

function buildSearchUrl() {
  const params = new URLSearchParams({
    q: NEWS_CONFIG.query,
    lang: NEWS_CONFIG.lang,
    max: String(NEWS_CONFIG.max),
    sortby: "publishedAt",
    apikey: NEWS_CONFIG.apiKey,
  });
  return `${NEWS_CONFIG.baseUrl}/search?${params.toString()}`;
}

function ageHoursFrom(publishedAt) {
  const t = Date.parse(publishedAt ?? "");
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.round((Date.now() - t) / 3_600_000));
}

export function transform(payload) {
  const rawArticles = Array.isArray(payload?.articles) ? payload.articles : [];

  const seen = new Set();
  const articles = [];
  for (const item of rawArticles) {
    const title = item?.title?.trim();
    const url = item?.url;
    if (!title || !url) continue;
    const dedupeKey = url.toLowerCase();
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    articles.push({
      title,
      summary: item?.description?.trim() || null,
      url,
      imageUrl: item?.image || null,
      source: item?.source?.name?.trim() || "Unknown",
      publishedAt: item?.publishedAt || null,
      ageHours: ageHoursFrom(item?.publishedAt),
    });
  }

  articles.sort(
    (a, b) => Date.parse(b.publishedAt ?? 0) - Date.parse(a.publishedAt ?? 0),
  );

  const counts = new Map();
  for (const a of articles)
    counts.set(a.source, (counts.get(a.source) ?? 0) + 1);
  const sources = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const stamps = articles
    .map((a) => Date.parse(a.publishedAt ?? ""))
    .filter((n) => !Number.isNaN(n));

  return {
    articles,
    meta: {
      topic: "Campaign performance & advertising ROI",
      provider: "GNews",
      query: NEWS_CONFIG.query,
      fetchedAt: new Date().toISOString(),
      totalReturned: articles.length,
      totalAvailable:
        typeof payload?.totalArticles === "number"
          ? payload.totalArticles
          : null,
      sources,
      topSource: sources[0]?.name ?? null,
      newest: stamps.length
        ? new Date(Math.max(...stamps)).toISOString()
        : null,
      oldest: stamps.length
        ? new Date(Math.min(...stamps)).toISOString()
        : null,
      cached: false,
    },
  };
}

export async function getMarketingNews() {
  if (!NEWS_CONFIG.apiKey) {
    throw new NewsError(
      "News integration is not configured. Add GNEWS_API_KEY to skyhouse-api/.env (a free key from gnews.io) and restart the API.",
      503,
    );
  }

  const now = Date.now();
  if (cache.data && cache.expiresAt > now) {
    return { ...cache.data, meta: { ...cache.data.meta, cached: true } };
  }

  let response;
  try {
    response = await fetch(buildSearchUrl(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(NEWS_CONFIG.timeoutMs),
    });
  } catch (err) {
    if (err?.name === "TimeoutError") {
      throw new NewsError(
        "The news provider took too long to respond. Please try again.",
        504,
      );
    }
    throw new NewsError("Could not reach the news provider (GNews).", 502);
  }

  if (!response.ok) {
    let upstream = "";
    try {
      const body = await response.json();
      if (Array.isArray(body?.errors) && body.errors.length)
        upstream = String(body.errors[0]);
    } catch {
      upstream = "";
    }

    const looksLikeAuth =
      response.status === 401 ||
      response.status === 403 ||
      /api key/i.test(upstream);
    if (looksLikeAuth) {
      throw new NewsError(
        "The news provider rejected the API key. Check GNEWS_API_KEY.",
        502,
      );
    }
    if (response.status === 429) {
      throw new NewsError(
        "News rate limit reached. The free GNews tier allows a limited number of requests per day, try again later.",
        429,
      );
    }
    throw new NewsError(
      upstream
        ? `The news provider returned an error: ${upstream}`
        : `The news provider returned an error (HTTP ${response.status}).`,
      502,
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new NewsError(
      "The news provider returned an unreadable response.",
      502,
    );
  }

  const data = transform(payload);
  cache = { data, expiresAt: now + NEWS_CONFIG.cacheTtlMs };
  return data;
}
