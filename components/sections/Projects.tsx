"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content";
import { SectionHead } from "@/components/ui/Ornament";
import { ShotFrame, shotDevice } from "@/components/ui/ProjectShot";
import { useOpenProject } from "@/components/overlays/useOpenProject";

const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
const KIND: Record<Project["kind"], string> = {
  mobile: "Mobile app",
  web: "Web app",
  dashboard: "Dashboard",
  multiplatform: "Web and mobile app",
  other: "Project",
};

/** PRJ-3: a card's screenshots cycle in place on tap, with a plain count. */
function CardShots({ project }: { project: Project }) {
  const [i, setI] = useState(0);
  const n = project.screenshots.length;
  return (
    // the panel's shape follows the first screenshot, so cycling never changes the card's height
    <div className="card__shots" data-vt={`shot-${project.slug}`} data-cover={shotDevice(project, project.screenshots[0])}>
      <ShotFrame project={project} index={i} />
      {n > 1 && (
        <button
          type="button"
          className="card__cycle"
          onClick={() => setI((i + 1) % n)}
          aria-label={`Show screenshot ${((i + 1) % n) + 1} of ${n} for ${project.title}`}
        >
          {i + 1} of {n}
        </button>
      )}
    </div>
  );
}

// PRJ-1/3/5/11/12: featured first. One column of cards below 64em, two from there; each opens its
// detail, the picture morphing into it. Placeholders say so until the real ones come.
export function Projects() {
  const open = useOpenProject();
  return (
    <section id="projects" className="section section--wide" aria-labelledby="projects-title">
      <SectionHead id="projects-title" title="Projects" />
      <ul className="cards" aria-label="Projects">
        {ordered.map((p) => (
          <li key={p.slug} className="card">
            <CardShots project={p} />
            <div className="card__text">
              <h3 className="card__title">{p.title}</h3>
              <p className="card__tagline">{p.tagline}</p>
              <p className="card__meta">
                {KIND[p.kind]}, {p.company ?? p.role.toLowerCase()}
                {p.placeholder ? ". Placeholder, details to come." : ""}
              </p>
              <button
                type="button"
                className="button button--outline-ink card__open"
                onClick={(e) => open(p.slug, e.currentTarget.closest(".card")?.querySelector("[data-vt]") ?? null)}
              >
                View project
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
