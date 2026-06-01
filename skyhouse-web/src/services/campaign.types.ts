export interface Campaign {
  campaignId: string | null;
  campaignName: string | null;
  platform: string | null;
  spend: number | null;
  revenue: number | null;
  conversions: number | null;
  roas: number | null;
  cpa: number | null;
  warnings: string[];
}

export interface Summary {
  campaignCount: number;
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  overallRoas: number | null;
  warnings: string[];
}

export interface CampaignsResponse {
  success: boolean;
  data: Campaign[];
  warnings: string[];
}

export interface SummaryResponse {
  success: boolean;
  data: Summary;
}
