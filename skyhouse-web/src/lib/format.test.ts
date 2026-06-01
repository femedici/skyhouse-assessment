import { describe, it, expect } from "vitest";

import {
  formatCurrency,
  formatInteger,
  formatRoas,
  formatRelativeTime,
} from "./format";

describe("formatCurrency", () => {
  it("formats finite numbers as USD", () => {
    expect(formatCurrency(4200)).toBe("$4,200.00");
    expect(formatCurrency(3100.5)).toBe("$3,100.50");
  });

  it("shows a placeholder for null / undefined / non-finite", () => {
    expect(formatCurrency(null)).toBe("—");
    expect(formatCurrency(undefined)).toBe("—");
    expect(formatCurrency(Infinity)).toBe("—");
  });
});

describe("formatInteger", () => {
  it("groups thousands and drops decimals", () => {
    expect(formatInteger(1193)).toBe("1,193");
  });

  it("shows a placeholder for missing values", () => {
    expect(formatInteger(null)).toBe("—");
  });
});

describe("formatRoas", () => {
  it("renders two decimals with a multiplier sign", () => {
    expect(formatRoas(4.5)).toBe("4.50×");
  });

  it("shows a placeholder when ROAS is unavailable", () => {
    expect(formatRoas(null)).toBe("—");
  });
});

describe("formatRelativeTime", () => {
  it("returns a placeholder for missing or invalid timestamps", () => {
    expect(formatRelativeTime(null)).toBe("—");
    expect(formatRelativeTime("not-a-date")).toBe("—");
  });

  it("describes a recent timestamp as 'just now'", () => {
    expect(formatRelativeTime(new Date().toISOString())).toBe("just now");
  });

  it("describes an hours-old timestamp", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 3_600_000).toISOString();
    expect(formatRelativeTime(twoHoursAgo)).toBe("2h ago");
  });
});
