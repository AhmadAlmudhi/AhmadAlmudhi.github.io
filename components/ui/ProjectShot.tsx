import type { CSSProperties } from "react";
import type { Project, Screenshot } from "@/content";
import { PlaceholderShot } from "./PlaceholderShot";
import { PhoneFrame } from "./PhoneFrame";
import { Picture } from "./Picture";

export type Device = NonNullable<Screenshot["device"]>;

/** The frame a screenshot sits in: its own `device`, else the project's kind decides. */
export function shotDevice(project: Pick<Project, "kind">, shot: Screenshot): Device {
  return shot.device ?? (project.kind === "mobile" ? "phone" : "desktop");
}

// twice what the frames measure across, so the screenshot stays sharp when the page is zoomed: a
// phone frame stays narrow, a desktop one runs wide
const SIZES: Record<Device, string> = {
  phone: "(min-width: 64em) 28rem, 90vw",
  desktop: "(min-width: 64em) 80rem, 184vw",
};

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
  if (!shot.src || !shot.width || !shot.height) return <PlaceholderShot project={project} index={index} className={className} />;
  const device = shotDevice(project, shot);
  return (
    <Picture
      className={`shot shot--${device} ${className}`}
      src={shot.src}
      width={shot.width}
      height={shot.height}
      alt={shot.alt}
      sizes={SIZES[device]}
      tone={shot.tone}
      priority={priority}
    />
  );
}

/** PRJ-2: a phone screenshot in the CSS phone frame, a desktop one unframed and square. */
export function ShotFrame({
  project,
  index,
  style,
  className = "",
}: {
  project: Pick<Project, "title" | "kind" | "company" | "screenshots">;
  index: number;
  style?: CSSProperties;
  className?: string;
}) {
  const shot = project.screenshots[index];
  const inner = <ProjectShot project={project} shot={shot} index={index} />;
  if (shotDevice(project, shot) === "phone") {
    // the morph name rides on a wrapper; without one the frame sizes straight from its panel
    return style ? (
      <div className={className} style={style}>
        <PhoneFrame>{inner}</PhoneFrame>
      </div>
    ) : (
      <PhoneFrame className={className}>{inner}</PhoneFrame>
    );
  }
  return (
    <div className={`wide-frame ${className}`} style={style}>
      {inner}
    </div>
  );
}
