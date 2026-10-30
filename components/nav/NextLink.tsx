"use client";

import type { SectionId } from "@/content";
import { sections } from "@/content";
import { useNav } from "@/lib/nav";

/** NAV-7: every section ends with a plain link to the next one. Works as a normal anchor without JS. */
export function NextLink({ after }: { after: SectionId }) {
  const { goTo } = useNav();
  const i = sections.findIndex((s) => s.id === after);
  const next = sections[i + 1];
  if (!next) return null;
  return (
    <a
      className="next-link link"
      href={`#${next.id}`}
      onClick={(e) => {
        e.preventDefault();
        goTo(next.id);
      }}
    >
      Next: {next.label}
    </a>
  );
}
