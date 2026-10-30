"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sections } from "@/content";
import { useNav } from "@/lib/nav";

// NAV-1: the thumb-zone dock on phones and tablets. Previous, the current section (which opens the
// section index), next. It slides away while the reader scrolls down, so it never sits on what is
// being read (design-taste-frontend, layout.md §7), and returns on any upward scroll, at the top and
// at the end of the page. The header's Sections button keeps every section two taps away meanwhile.
export function Dock() {
  const { index, goNext, goPrev, setIndexOpen } = useNav();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 8;
      if (y < 80 || atEnd) setHidden(false);
      else if (Math.abs(y - last) > 6) setHidden(y > last);
      last = y;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prev = sections[index - 1];
  const next = sections[index + 1];
  return (
    <nav className="dock" aria-label="Sections" data-hidden={hidden}>
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
