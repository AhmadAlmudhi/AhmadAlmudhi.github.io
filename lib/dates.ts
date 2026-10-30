const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parts(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return { y, m, d };
}

/** "2025-02" → "02/2025", the way the CV writes dates. */
export function formatMonth(value: string) {
  const { y, m } = parts(value);
  return `${String(m).padStart(2, "0")}/${y}`;
}

/** "02/2025 – Present" */
export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

/** "2026-08-11" → "August 11, 2026"; "2026-08" → "August 2026" */
export function formatDay(value: string) {
  const { y, m, d } = parts(value);
  return d ? `${MONTHS_LONG[m - 1]} ${d}, ${y}` : `${MONTHS_LONG[m - 1]} ${y}`;
}

/**
 * EXP-1: the length of a finished role, end minus start: May 2021 to May 2025 is exactly
 * four years. A current role shows no length.
 */
export function durationMonths(start: string, end: string) {
  const s = parts(start);
  const e = parts(end);
  return e.y * 12 + e.m - (s.y * 12 + s.m);
}

/** 48 → "4 years", 6 → "6 months", 14 → "1 year 2 months" */
export function formatDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const out: string[] = [];
  if (y) out.push(`${y} ${y === 1 ? "year" : "years"}`);
  if (m) out.push(`${m} ${m === 1 ? "month" : "months"}`);
  return out.join(" ") || "1 month";
}

/** ISO date for <time dateTime>. */
export function isoMonth(value: string) {
  return value.length === 7 ? value : value.slice(0, 10);
}
