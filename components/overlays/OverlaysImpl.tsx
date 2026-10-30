"use client";

import { certifications, projects } from "@/content";
import { useNav } from "@/lib/nav";
import { ProjectShot } from "@/components/ui/ProjectShot";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectDialog } from "./ProjectDialog";
import { Lightbox, type LightboxItem } from "./Lightbox";

/**
 * Renders whatever the URL hash says is open: a project's detail, its screenshot lightbox on top,
 * or the certificate lightbox. Opening pushes a history entry and Back steps out one level
 * (lib/nav.tsx, NAV-6); moving between screenshots replaces the entry instead.
 */
export default function OverlaysImpl() {
  const { overlay, openOverlay, replaceOverlay, closeOverlay } = useNav();
  if (!overlay) return null;

  if (overlay.type === "project") {
    const project = projects.find((p) => p.slug === overlay.slug);
    if (!project) return null;
    const items: LightboxItem[] = project.screenshots.map((s, i) => ({
      key: `${project.slug}-${i}`,
      image: s.src && s.width && s.height ? { src: s.src, width: s.width, height: s.height, alt: s.alt } : undefined,
      node: s.src ? undefined : project.kind === "mobile" ? (
        <PhoneFrame>
          <ProjectShot project={project} shot={s} index={i} />
        </PhoneFrame>
      ) : (
        <div className="wide-frame">
          <ProjectShot project={project} shot={s} index={i} />
        </div>
      ),
      caption: s.caption ?? `${project.title}${s.src ? "" : ", placeholder"}`,
    }));
    return (
      <>
        <ProjectDialog
          key={project.slug}
          project={project}
          covered={!!overlay.shot}
          onClose={closeOverlay}
          onShot={(i) => openOverlay({ type: "project", slug: project.slug, shot: i + 1 })}
        />
        {overlay.shot && (
          <Lightbox
            key={`${project.slug}-lightbox`}
            label={`${project.title} screenshots`}
            items={items}
            index={Math.min(overlay.shot, items.length) - 1}
            onIndex={(i) => replaceOverlay({ type: "project", slug: project.slug, shot: i + 1 })}
            onClose={closeOverlay}
          />
        )}
      </>
    );
  }

  const index = certifications.findIndex((c) => c.id === overlay.id);
  if (index < 0) return null;
  const items: LightboxItem[] = certifications.map((c) => ({
    key: c.id,
    image: c.image,
    caption: `${c.name}${c.shortName ? ` (${c.shortName})` : ""}, ${c.issuer}`,
  }));
  return (
    <Lightbox
      key="certificates"
      label="Certificates"
      items={items}
      index={index}
      onIndex={(i) => replaceOverlay({ type: "certificate", id: certifications[i].id })}
      onClose={closeOverlay}
    />
  );
}
