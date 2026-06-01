import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import csv from "csv-parser";

import { toNumber, computeRoas, computeCpa, round } from "../utils/metrics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.resolve(__dirname, "../data/campaigns.csv");

function readCsv() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(CSV_PATH)) {
      return reject(new Error(`Campaign data file not found at ${CSV_PATH}`));
    }

    const rows = [];
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
}

function enrichCampaign(row) {
  const spend = toNumber(row.spend);
  const revenue = toNumber(row.revenue);
  const conversions = toNumber(row.conversions);

  const warnings = [];
  const label = row.campaign_name || row.campaign_id || "Unknown campaign";

  if (spend === null) warnings.push(`${label}: missing or invalid "spend".`);
  if (revenue === null)
    warnings.push(`${label}: missing or invalid "revenue".`);
  if (conversions === null)
    warnings.push(`${label}: missing or invalid "conversions".`);

  const roas = computeRoas(revenue, spend);
  const cpa = computeCpa(spend, conversions);

  if (roas === null && spend === 0) {
    warnings.push(`${label}: ROAS unavailable (spend is 0).`);
  }
  if (cpa === null && conversions === 0) {
    warnings.push(`${label}: CPA unavailable (0 conversions).`);
  }

  return {
    campaignId: row.campaign_id ?? null,
    campaignName: row.campaign_name ?? null,
    platform: row.platform ?? null,
    spend,
    revenue,
    conversions,
    roas: round(roas, 2),
    cpa: round(cpa, 2),
    warnings,
  };
}

export async function getCampaigns() {
  const rows = await readCsv();
  const campaigns = rows.map(enrichCampaign);
  const warnings = campaigns.flatMap((c) => c.warnings);
  return { campaigns, warnings };
}

export async function getSummary() {
  const { campaigns, warnings } = await getCampaigns();

  const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend ?? 0), 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + (c.revenue ?? 0), 0);
  const totalConversions = campaigns.reduce(
    (sum, c) => sum + (c.conversions ?? 0),
    0,
  );

  const overallRoas = computeRoas(totalRevenue, totalSpend);

  return {
    campaignCount: campaigns.length,
    totalSpend: round(totalSpend, 2),
    totalRevenue: round(totalRevenue, 2),
    totalConversions,
    overallRoas: round(overallRoas, 2),
    warnings,
  };
}

export async function getRawCsv() {
  return fs.promises.readFile(CSV_PATH, "utf-8");
}
