import type { Project, Screenshot } from "@/content";
import { PlaceholderShot } from "./PlaceholderShot";

/** A project screenshot, or its placeholder title card while the real one is still to come. */
export function ProjectShot({
  project,
  shot,
  index = 0,
  priority = false,
  className = "",
}: {
  project: Pick<Project, "title" | "kind" | "company">;
  shot: Screenshot;
  index?: number;
  priority?: boolean;
  className?: string;
}) {
  if (!shot.src) return <PlaceholderShot project={project} index={index} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-optimized by scripts/optimize-images.mjs
    <img
      className={`shot shot--${project.kind} ${className}`}
      src={shot.src}
      width={shot.width}
      height={shot.height}
      alt={shot.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
