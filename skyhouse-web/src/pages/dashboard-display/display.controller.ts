import type { Campaign } from "../../services/campaign.types";
import type { CampaignRow, RoasTier } from "./display.types";

export const ROAS_THRESHOLDS = { high: 3.0, medium: 1.5 } as const;

export function classifyRoas(roas: number | null): RoasTier {
  if (roas === null) return "none";
  if (roas >= ROAS_THRESHOLDS.high) return "high";
  if (roas >= ROAS_THRESHOLDS.medium) return "medium";
  return "low";
}

export function toRows(campaigns: Campaign[]): CampaignRow[] {
  return campaigns.map((campaign) => ({
    ...campaign,
    tier: classifyRoas(campaign.roas),
  }));
}

export function parseMinRoas(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}

export function filterByMinRoas(
  rows: CampaignRow[],
  minRoas: number | null,
): CampaignRow[] {
  if (minRoas === null) return rows;
  return rows.filter((row) => row.roas !== null && row.roas >= minRoas);
}
