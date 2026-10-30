"use client";

import { durationMonths, formatDuration } from "@/lib/dates";
import { useClientValue } from "@/lib/client";

/**
 * EXP-1: duration computed from the dates, never typed in. The static build renders the value as
 * of the build day; the browser recomputes it so an open-ended role stays current between deploys.
 */
export function Duration({ start, end, built }: { start: string; end?: string; built: string }) {
  const text = useClientValue(
    () => formatDuration(durationMonths(start, end, new Date())),
    formatDuration(durationMonths(start, end, new Date(built))),
  );
  return <span>{text}</span>;
}
