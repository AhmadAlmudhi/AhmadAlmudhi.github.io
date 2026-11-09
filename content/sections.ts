import type { SectionId } from "./schema";
import { profile } from "./profile";

// The section list, on its own so the always-loaded client components (header, dock, index sheet,
// nav) can import it without pulling every content file, and the projects' text, into the first
// JavaScript a visitor downloads (budget: 150 KB gzipped).
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
