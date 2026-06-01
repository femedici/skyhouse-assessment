import { apiGet } from "../lib/api";
import type { NewsArticle, NewsMeta, NewsResponse } from "./insights.types";

export const insightsService = {
  async fetchMarketingNews(): Promise<{
    articles: NewsArticle[];
    meta: NewsMeta;
  }> {
    const res = await apiGet<NewsResponse>("/api/insights/news");
    return { articles: res.data, meta: res.meta };
  },
};
