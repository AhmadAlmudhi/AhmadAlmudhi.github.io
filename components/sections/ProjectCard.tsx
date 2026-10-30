"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content";
import { ShotFrame, shotDevice } from "@/components/ui/ProjectShot";
import { useOpenProject } from "@/components/overlays/useOpenProject";

/** What a card needs of its project; the rest stays with the detail, loaded when it opens. */
export type CardProject = Pick<Project, "slug" | "title" | "kind" | "company" | "screenshots">;

/**
 * PRJ-3: a card's screenshots, stepped through with Previous and Next (or a sideways swipe on the
 * picture), with a plain count. Each new screenshot slides in from the side it comes from.
 */
export function CardShots({ project }: { project: CardProject }) {
  const [view, setView] = useState({ i: 0, dir: 0 });
  const start = useRef<{ x: number; y: number } | null>(null);
  const n = project.screenshots.length;
  const step = (d: number) => setView(({ i }) => ({ i: Math.min(n - 1, Math.max(0, i + d)), dir: d }));

  return (
    <div className="card__media">
      {/* the panel's shape follows the first screenshot, so stepping never changes the card's height */}
      <div
        className="card__shots"
        data-vt={`shot-${project.slug}`}
        data-cover={shotDevice(project, project.screenshots[0])}
        onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
        onPointerCancel={() => (start.current = null)}
        onPointerUp={(e) => {
          const s = start.current;
          start.current = null;
          if (!s || n < 2) return;
          const dx = e.clientX - s.x, dy = e.clientY - s.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > 1.5 * Math.abs(dy)) step(dx < 0 ? 1 : -1);
        }}
      >
        <ShotFrame key={view.i} project={project} index={view.i} className={view.dir ? `shot-in shot-in--${view.dir > 0 ? "next" : "prev"}` : ""} />
      </div>
      {n > 1 && (
        <div className="card__nav" role="group" aria-label={`${project.title} screenshots`}>
          <button type="button" className="card__step" onClick={() => step(-1)} disabled={view.i === 0} aria-label="Previous screenshot">
            <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <p className="card__count nums" aria-live="polite">
            {view.i + 1} of {n}
          </p>
          <button type="button" className="card__step" onClick={() => step(1)} disabled={view.i === n - 1} aria-label="Next screenshot">
            <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

/** PRJ-5: opens the project's detail, its picture morphing from the card's. */
export function OpenProject({ slug }: { slug: string }) {
  const open = useOpenProject();
  return (
    <button
      type="button"
      className="button button--outline-ink card__open"
      onClick={(e) => open(slug, e.currentTarget.closest(".card")?.querySelector("[data-vt]") ?? null)}
    >
      View project
      <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
