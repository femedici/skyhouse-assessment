export function toNumber(value) {
  if (value === undefined || value === null) return null;

  const trimmed = String(value).trim();
  if (trimmed === "") return null;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function computeRoas(revenue, spend) {
  if (revenue === null || spend === null || spend === 0) return null;
  return revenue / spend;
}

export function computeCpa(spend, conversions) {
  if (spend === null || conversions === null || conversions === 0) return null;
  return spend / conversions;
}

export function round(value, decimals = 2) {
  if (value === null) return null;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
