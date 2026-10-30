"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sections } from "@/content";
import { useNav } from "@/lib/nav";

export type StageLayer = { key: string; content: ReactNode };

/**
 * The fixed half of the split stage (desktop only). It shows the picture that belongs to whatever
 * the reader is on: each block in the reading half carries `data-stage="<key>"`, and the layer with
 * that key crossfades in when the block crosses the middle of the screen. The rail and the bar give
 * the stage its second job as the desktop navigation (NAV-2).
 */
export function Stage({
  layers,
  watch,
  label,
  className = "",
}: {
  layers: StageLayer[];
  /** id of the element whose `[data-stage]` children drive the stage. */
  watch?: string;
  label: string;
  className?: string;
}) {
  const first = layers[0]?.key;
  const [current, setCurrent] = useState(first);

  useEffect(() => {
    if (!watch) return;
    const root = document.getElementById(watch);
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent((entry.target as HTMLElement).dataset.stage ?? first);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    root.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [watch, first]);

  return (
    <aside className={`stage ${className}`} aria-label={label}>
      <div className="stage__view">
        {layers.map((layer) => (
          <div
            key={layer.key}
            className="stage__layer"
            data-on={layer.key === current}
            aria-hidden={layer.key !== current}
          >
            {layer.content}
          </div>
        ))}
      </div>
      <Rail />
      <StageBar />
    </aside>
  );
}

function Rail() {
  const { active, goTo } = useNav();
  return (
    <nav className="rail" aria-label="Sections">
      <ul className="rail__list">
        {sections.map((s) => (
          <li key={s.id}>
            <button type="button" className="rail__item" aria-current={s.id === active} onClick={() => goTo(s.id)}>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function StageBar() {
  const { index, goNext, goPrev } = useNav();
  const prev = sections[index - 1];
  const next = sections[index + 1];
  return (
    <div className="stage__bar">
      <p className="stage__where">
        <strong>{sections[index].label}</strong>
        <span>
          {index + 1} of {sections.length}
        </span>
      </p>
      <div className="stage__steps">
        <button
          type="button"
          className="icon-button"
          onClick={goPrev}
          disabled={!prev}
          aria-label={prev ? `Previous section: ${prev.label}` : "No previous section"}
        >
          <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={goNext}
          disabled={!next}
          aria-label={next ? `Next section: ${next.label}` : "No next section"}
        >
          <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
