import type { SectionId } from "./schema";
import { profile } from "./profile";

export { profile } from "./profile";
export { experience } from "./experience";
export { projects } from "./projects";
export { skillGroups } from "./skills";
export { education } from "./education";
export { certifications } from "./certifications";
export type * from "./schema";

export const sectionLabels: Record<SectionId, string> = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  certifications: "Certifications",
  contact: "Contact",
};

/** Sections in the order the content file sets (PRD §4.1). */
export const sections = profile.sectionOrder.map((id) => ({ id, label: sectionLabels[id] }));
