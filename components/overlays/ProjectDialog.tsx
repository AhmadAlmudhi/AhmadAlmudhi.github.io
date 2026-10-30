"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/content";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectShot } from "@/components/ui/ProjectShot";

const LINKS: { key: keyof NonNullable<Project["links"]>; label: string }[] = [
  { key: "live", label: "Live demo" },
  { key: "github", label: "Code on GitHub" },
  { key: "caseStudy", label: "Case study" },
  { key: "video", label: "Video" },
];

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="detail__block">
      <h3 className="detail__head">{title}</h3>
      <ul className="highlights">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * PRJ-5/6: the project detail. A full-screen sheet on phones, a large centred panel on desktop
 * (native modal <dialog>: focus trap, Esc, focus returned). Its first picture is where the tapped
 * card's picture lands in the morph.
 */
export function ProjectDialog({
  project,
  onClose,
  onShot,
  covered,
}: {
  project: Project;
  onClose: () => void;
  onShot: (index: number) => void;
  /** True while the lightbox lies on top, so this dialog drops the morph name. */
  covered: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Open on mount; close on unmount (Back, ✕, Esc), so the browser returns focus to the opener.
  useLayoutEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    // land on the title, so screen readers announce it and no ring sits on the close button
    d?.querySelector<HTMLElement>("#detail-title")?.focus({ preventScroll: true });
    return () => d?.close();
  }, []);

  const frame = (i: number, morph = false) => {
    const shot = <ProjectShot project={project} shot={project.screenshots[i]} index={i} />;
    const style = morph && !covered ? { viewTransitionName: "overlay-shot" } : undefined;
    return project.kind === "mobile" ? (
      <div style={style}>
        <PhoneFrame>{shot}</PhoneFrame>
      </div>
    ) : (
      <div className="wide-frame" style={style}>
        {shot}
      </div>
    );
  };

  const links = LINKS.filter((l) => project.links?.[l.key]);
  return (
    <dialog
      ref={ref}
      className="detail"
      aria-labelledby="detail-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="detail__inner">
        <div className="detail__bar">
          <p className="detail__crumb">Projects</p>
          <button type="button" className="icon-button" aria-label="Close project" onClick={onClose}>
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="detail__grid">
          <div className="detail__text">
            <h2 id="detail-title" className="detail__title" tabIndex={-1}>
              {project.title}
            </h2>
            <p className="detail__tagline lead">{project.tagline}</p>
            <p className="detail__role">
              {project.role}
              {project.company ? ` at ${project.company}` : ""}
            </p>
            {project.placeholder && (
              <p className="detail__note">
                Placeholder. The real project, its screenshots and its links are still to come; what is written here
                is taken from my experience at {project.company}.
              </p>
            )}
            {project.confidential && <p className="detail__note">Confidential (NDA): screenshots only, no links.</p>}
            <div className="detail__block">
              <h3 className="detail__head">Overview</h3>
              <p>{project.overview}</p>
            </div>
            {project.problem && (
              <div className="detail__block">
                <h3 className="detail__head">The problem</h3>
                <p>{project.problem}</p>
              </div>
            )}
            <List title="What I did" items={project.contributions} />
            <List title="Key features" items={project.features} />
            <List title="Results" items={project.impact} />
            <div className="detail__block">
              <h3 className="detail__head">Built with</h3>
              <ul className="tags">
                {project.skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {links.length > 0 && (
              <div className="detail__links">
                {links.map((l) => (
                  <a key={l.key} className="action" href={project.links?.[l.key]} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="detail__gallery">
            <h3 className="sr-only">Screenshots</h3>
            <ul className="detail__shots">
              {project.screenshots.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="detail__shot"
                    onClick={() => onShot(i)}
                    aria-label={`Open screenshot ${i + 1} of ${project.screenshots.length} full screen`}
                  >
                    {frame(i, i === 0)}
                    <span className="detail__zoom" aria-hidden="true">
                      <Maximize2 size={18} strokeWidth={1.75} />
                    </span>
                  </button>
                  {s.caption && <p className="detail__caption">{s.caption}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  );
}
