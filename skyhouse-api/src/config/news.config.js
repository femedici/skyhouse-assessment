export const NEWS_CONFIG = {
  apiKey: process.env.GNEWS_API_KEY ?? "",
  baseUrl: "https://gnews.io/api/v4",
  query:
    process.env.GNEWS_QUERY ??
    '"brand strategy" OR branding OR "marketing strategy" OR "marketing trends" OR "consumer insights" OR "marketing technology" OR martech',
  lang: "en",
  max: 10,
  timeoutMs: 8000,
  cacheTtlMs: 5 * 60 * 1000,
};
