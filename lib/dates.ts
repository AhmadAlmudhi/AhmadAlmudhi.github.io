const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

/** "2025-02" → "Feb 2025" */
export function formatMonth(value: string) {
  const { y, m } = parts(value);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2026-08-11" → "August 11, 2026"; "2026-08" → "August 2026" */
export function formatDay(value: string) {
  const { y, m, d } = parts(value);
  return d ? `${MONTHS_LONG[m - 1]} ${d}, ${y}` : `${MONTHS_LONG[m - 1]} ${y}`;
}

/** "Feb 2025 – Present" */
export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

/**
 * Inclusive month count, the way resumes and LinkedIn count it: Feb 2025 to Oct 2026 is 21 months
 * ("1 yr 9 mos"). An open-ended range runs to the month of `today`.
 */
export function durationMonths(start: string, end: string | undefined, today: Date) {
  const s = parts(start);
  const e = end ? parts(end) : { y: today.getFullYear(), m: today.getMonth() + 1 };
  return e.y * 12 + e.m - (s.y * 12 + s.m) + 1;
}

/** 21 → "1 yr 9 mos", 7 → "7 mos", 49 → "4 yrs 1 mo" */
export function formatDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const out: string[] = [];
  if (y) out.push(`${y} ${y === 1 ? "yr" : "yrs"}`);
  if (m) out.push(`${m} ${m === 1 ? "mo" : "mos"}`);
  return out.join(" ") || "1 mo";
}

/** ISO date for <time dateTime>. */
export function isoMonth(value: string) {
  return value.length === 7 ? value : value.slice(0, 10);
}
