export const NEWS_CONFIG = {
  apiKey: process.env.GNEWS_API_KEY ?? "",
  baseUrl: "https://gnews.io/api/v4",
  query:
    process.env.GNEWS_QUERY ??
    '"performance marketing" OR "digital advertising" OR "ad spend" OR "paid media" OR "return on ad spend" OR "advertising campaign" OR "campaign performance" OR "marketing ROI"',
  lang: "en",
  max: 10,
  timeoutMs: 8000,
  cacheTtlMs: 5 * 60 * 1000,
};
