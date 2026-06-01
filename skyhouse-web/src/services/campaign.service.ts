import { apiGet, apiGetText } from "../lib/api";
import type {
  Campaign,
  CampaignsResponse,
  Summary,
  SummaryResponse,
} from "./campaign.types";

export const campaignService = {
  async fetchCampaigns(): Promise<{
    campaigns: Campaign[];
    warnings: string[];
  }> {
    const res = await apiGet<CampaignsResponse>("/api/campaigns");
    return { campaigns: res.data, warnings: res.warnings ?? [] };
  },

  async fetchSummary(): Promise<Summary> {
    const res = await apiGet<SummaryResponse>("/api/summary");
    return res.data;
  },

  async fetchRawCsv(): Promise<string> {
    return apiGetText("/api/campaigns/csv");
  },
};
