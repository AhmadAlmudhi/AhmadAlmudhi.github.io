"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { sections } from "@/content";
import { useNav } from "@/lib/nav";

// NAV-1: the thumb-zone dock on phones and tablets. Previous, the current section (which opens the
// section index), next. Any section is two taps away from anywhere.
export function Dock() {
  const { index, goNext, goPrev, setIndexOpen } = useNav();
  const prev = sections[index - 1];
  const next = sections[index + 1];
  return (
    <nav className="dock" aria-label="Sections">
      <button
        type="button"
        className="dock__step"
        onClick={goPrev}
        disabled={!prev}
        aria-label={prev ? `Previous section: ${prev.label}` : "No previous section"}
      >
        <ChevronLeft size={26} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="dock__current"
        onClick={() => setIndexOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${sections[index].label}, section ${index + 1} of ${sections.length}. Open the section list`}
      >
        <span className="dock__name">{sections[index].label}</span>
        <span className="dock__count">
          {index + 1} of {sections.length}
        </span>
      </button>
      <button
        type="button"
        className="dock__step"
        onClick={goNext}
        disabled={!next}
        aria-label={next ? `Next section: ${next.label}` : "No next section"}
      >
        <ChevronRight size={26} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </nav>
  );
}
