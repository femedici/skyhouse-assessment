import test from "node:test";
import assert from "node:assert/strict";

import {
  toNumber,
  computeRoas,
  computeCpa,
  round,
} from "../src/utils/metrics.js";

test("toNumber parses valid numeric strings (CSV values arrive as text)", () => {
  assert.equal(toNumber("4200.00"), 4200);
  assert.equal(toNumber("  3100.5  "), 3100.5);
  assert.equal(toNumber("0"), 0);
  assert.equal(toNumber(312), 312);
});

test("toNumber returns null for missing, empty, or non-numeric input", () => {
  assert.equal(toNumber(null), null);
  assert.equal(toNumber(undefined), null);
  assert.equal(toNumber(""), null);
  assert.equal(toNumber("   "), null);
  assert.equal(toNumber("abc"), null);
  assert.equal(toNumber("NaN"), null);
  assert.equal(toNumber("Infinity"), null);
});

test("computeRoas returns revenue / spend, not the other way around", () => {
  assert.equal(computeRoas(18900, 4200), 4.5);
});

test("computeRoas guards against divide-by-zero and missing data", () => {
  assert.equal(computeRoas(100, 0), null);
  assert.equal(computeRoas(null, 100), null);
  assert.equal(computeRoas(100, null), null);
});

test("computeCpa returns spend / conversions", () => {
  assert.equal(computeCpa(4200, 300), 14);
});

test("computeCpa guards against zero conversions and missing data", () => {
  assert.equal(computeCpa(100, 0), null);
  assert.equal(computeCpa(null, 10), null);
  assert.equal(computeCpa(100, null), null);
});

test("round trims to the requested decimals and passes null through", () => {
  assert.equal(round(13.4615, 2), 13.46);
  assert.equal(round(4.5, 2), 4.5);
  assert.equal(round(null), null);
});
