"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content";
import { NextLink } from "@/components/nav/NextLink";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectShot } from "@/components/ui/ProjectShot";
import { useOpenProject } from "@/components/overlays/useOpenProject";

const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
const KIND: Record<Project["kind"], string> = { mobile: "Mobile app", web: "Web app", dashboard: "Dashboard", other: "Project" };

function Frame({ project, index = 0 }: { project: Project; index?: number }) {
  const shot = <ProjectShot project={project} shot={project.screenshots[index]} index={index} />;
  return project.kind === "mobile" ? <PhoneFrame>{shot}</PhoneFrame> : <div className="wide-frame">{shot}</div>;
}

/** PRJ-3: on phones, a card's screenshots cycle in place on tap, with a plain count. */
function CardShots({ project }: { project: Project }) {
  const [i, setI] = useState(0);
  const n = project.screenshots.length;
  return (
    <div className="card__shots" data-vt={`shot-${project.slug}`}>
      <Frame project={project} index={i} />
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

// Blueprint "Small index, large picture" on the split stage (PRJ-1/4/11/12). Desktop: the heading,
// the current project and the index hold still in the reading half while the stage changes the
// picture, one screen of scroll per project. Phones: a swipe row of cards (PRJ-3).
export function Projects() {
  const open = useOpenProject();
  const [active, setActive] = useState(0);
  const steps = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = steps.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    root.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = ordered[active];
  const stageShot = (slug: string) => document.querySelector(`[data-stage-shot="${slug}"]`);
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects__pin">
        <h2 id="projects-title" className="projects__title display">
          Projects
        </h2>

        {/* desktop: the current project, then the index */}
        <div className="projects__current" aria-live="polite">
          <p className="projects__tagline lead">{current.tagline}</p>
          <p className="projects__meta">
            {current.role}
            {current.company ? ` at ${current.company}` : ""}. {KIND[current.kind]}.
            {current.placeholder ? " Placeholder: the real project and its screenshots are still to come." : ""}
          </p>
          <button type="button" className="button projects__open" onClick={() => open(current.slug, stageShot(current.slug))}>
            Open {current.title}
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <ol className="projects__index">
          {ordered.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                className="projects__row"
                aria-current={i === active}
                onClick={() => open(p.slug, stageShot(p.slug))}
              >
                <span className="projects__name">{p.title}</span>
                <span className="projects__kind">{KIND[p.kind]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* one screen of scroll per project drives the stage on desktop */}
      <div className="projects__steps" ref={steps} aria-hidden="true">
        {ordered.map((p, i) => (
          <div key={p.slug} className="projects__step" data-index={i} data-stage={`project-${p.slug}`} />
        ))}
      </div>

      {/* phones and tablets: the swipe row (PRJ-3) */}
      <ul className="cards" aria-label="Projects">
        {ordered.map((p) => (
          <li key={p.slug} className="card">
            <CardShots project={p} />
            <h3 className="card__title">{p.title}</h3>
            <p className="card__tagline">{p.tagline}</p>
            <p className="card__meta">
              {p.role}
              {p.company ? ` at ${p.company}` : ""}
              {p.placeholder ? ". Placeholder, details to come." : ""}
            </p>
            <button
              type="button"
              className="card__open action"
              onClick={(e) => open(p.slug, e.currentTarget.closest(".card")?.querySelector("[data-vt]") ?? null)}
            >
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>Open project</span>
            </button>
          </li>
        ))}
      </ul>
      <NextLink after="projects" />
    </section>
  );
}
