import type { Campaign, Summary } from "../../services/campaign.types";
import type { NewsArticle, NewsMeta } from "../../services/insights.types";

export type TabKey = "csv" | "performance" | "insights";

export type RoasTier = "high" | "medium" | "low" | "none";

export interface CampaignRow extends Campaign {
  tier: RoasTier;
}

export interface DashboardViewProps {
  loading: boolean;
  error: string | null;
  onRetry: () => void;

  onReloadData: () => void;
  onClearData: () => void;

  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;

  summary: Summary | null;

  rows: CampaignRow[];
  totalCount: number;

  minRoas: string;
  onMinRoasChange: (value: string) => void;

  csv: string;

  news: NewsArticle[];
  newsMeta: NewsMeta | null;
  newsLoading: boolean;
  newsError: string | null;
  onRetryNews: () => void;
}
