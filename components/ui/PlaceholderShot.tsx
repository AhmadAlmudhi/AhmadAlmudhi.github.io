import type { Project } from "@/content";

const KIND_LABEL: Record<Project["kind"], string> = {
  mobile: "Mobile app",
  web: "Web app",
  dashboard: "Dashboard",
  other: "Project",
};

/**
 * PRJ-12: stands in for a screenshot until the real one is supplied. A designed title card in the
 * page's type and colours at the screenshot's real ratio — never a grey box — that says plainly
 * that the screenshot is still to come.
 */
export function PlaceholderShot({
  project,
  index = 0,
  className = "",
}: {
  project: Pick<Project, "title" | "kind" | "company">;
  index?: number;
  className?: string;
}) {
  return (
    <div className={`placeholder-shot placeholder-shot--${project.kind} ${className}`} role="img" aria-label={`${project.title}: placeholder, screenshot to come`}>
      <span className="placeholder-shot__head">
        <span className="placeholder-shot__title">{project.title}</span>
        <span className="placeholder-shot__kind">
          {KIND_LABEL[project.kind]}
          {project.company ? ` for ${project.company}` : ""}
        </span>
      </span>
      <span className="placeholder-shot__note">
        Placeholder{index > 0 ? `, screen ${index + 1}` : ""}. Screenshot to come.
      </span>
    </div>
  );
}
