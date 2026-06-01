export interface NewsArticle {
  title: string;
  summary: string | null;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string | null;
  ageHours: number | null;
}

export interface NewsMeta {
  topic: string;
  provider: string;
  query: string;
  fetchedAt: string;
  totalReturned: number;
  totalAvailable: number | null;
  sources: { name: string; count: number }[];
  topSource: string | null;
  newest: string | null;
  oldest: string | null;
  cached: boolean;
}

export interface NewsResponse {
  success: boolean;
  data: NewsArticle[];
  meta: NewsMeta;
}
