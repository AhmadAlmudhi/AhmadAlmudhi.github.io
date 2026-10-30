"use client";

import { useEffect, useState } from "react";
import type { Side } from "@/content";

type Lens = "both" | Side;

const OPTIONS: { value: Lens; label: string }[] = [
  { value: "both", label: "Both" },
  { value: "engineering", label: "Engineer" },
  { value: "product", label: "Product owner" },
];

const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const word = (n: number) => WORDS[n] ?? String(n);
const list = (items: string[]) =>
  items.length < 2 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export type LensFacts = {
  total: number;
  roles: number;
  bySide: Record<Side, { count: number; companies: string[] }>;
};

/**
 * The page's one live thing: read the record as an engineer's or as a product owner's. The other
 * side's highlights, skills and certificates step back to the muted ink (still readable), and the
 * sentence states the real split. Without JavaScript the control is hidden and everything is ink.
 */
export function Lens({ facts }: { facts: LensFacts }) {
  const [lens, setLens] = useState<Lens>("both");

  useEffect(() => {
    document.documentElement.dataset.lens = lens;
  }, [lens]);

  const sentence =
    lens === "both"
      ? `${word(facts.total)[0].toUpperCase()}${word(facts.total).slice(1)} highlights across ${word(facts.roles)} roles: ${word(facts.bySide.engineering.count)} engineering, ${word(facts.bySide.product.count)} product.`
      : `${lens === "engineering" ? "Engineering" : "Product"} work: ${facts.bySide[lens].count} of ${facts.total} highlights, at ${list(facts.bySide[lens].companies)}.`;

  return (
    <div className="lens">
      <fieldset className="lens__control">
        <legend className="lens__legend">Read my experience as</legend>
        <div className="lens__options">
          {OPTIONS.map((o) => (
            <label key={o.value} className="lens__option">
              <input
                type="radio"
                name="lens"
                value={o.value}
                checked={lens === o.value}
                onChange={() => setLens(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="lens__sentence" aria-live="polite">
        {sentence}
      </p>
    </div>
  );
}
