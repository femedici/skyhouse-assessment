import { describe, it, expect } from "vitest";

import {
  classifyRoas,
  parseMinRoas,
  filterByMinRoas,
  toRows,
} from "./display.controller";
import type { Campaign } from "../../services/campaign.types";

function makeCampaign(overrides: Partial<Campaign> = {}): Campaign {
  return {
    campaignId: "C001",
    campaignName: "Test Campaign",
    platform: "Facebook",
    spend: 1000,
    revenue: 4000,
    conversions: 100,
    roas: 4,
    cpa: 10,
    warnings: [],
    ...overrides,
  };
}

describe("classifyRoas", () => {
  it("classifies at the tier boundaries (>=3 high, >=1.5 medium, else low)", () => {
    expect(classifyRoas(3.0)).toBe("high");
    expect(classifyRoas(2.99)).toBe("medium");
    expect(classifyRoas(1.5)).toBe("medium");
    expect(classifyRoas(1.49)).toBe("low");
    expect(classifyRoas(0)).toBe("low");
  });

  it("returns 'none' when ROAS is unavailable", () => {
    expect(classifyRoas(null)).toBe("none");
  });
});

describe("parseMinRoas", () => {
  it("parses a valid numeric string", () => {
    expect(parseMinRoas("2")).toBe(2);
    expect(parseMinRoas(" 2.5 ")).toBe(2.5);
  });

  it("treats blank input as no filter (null)", () => {
    expect(parseMinRoas("")).toBeNull();
    expect(parseMinRoas("   ")).toBeNull();
  });

  it("rejects non-numeric input", () => {
    expect(parseMinRoas("abc")).toBeNull();
  });
});

describe("filterByMinRoas", () => {
  const rows = toRows([
    makeCampaign({ campaignId: "A", roas: 4.5 }),
    makeCampaign({ campaignId: "B", roas: 2.8 }),
    makeCampaign({ campaignId: "C", roas: null }),
  ]);

  it("returns every row when no threshold is set", () => {
    expect(filterByMinRoas(rows, null)).toHaveLength(3);
  });

  it("keeps only rows at or above the threshold and drops null ROAS", () => {
    const result = filterByMinRoas(rows, 3);
    expect(result.map((r) => r.campaignId)).toEqual(["A"]);
  });
});

describe("toRows", () => {
  it("attaches the ROAS tier to each row", () => {
    const [row] = toRows([makeCampaign({ roas: 4.5 })]);
    expect(row.tier).toBe("high");
    expect(row.campaignId).toBe("C001");
  });
});
