import { z } from "zod";

// Content model (PRD §11). Every content file is parsed with these schemas when it is imported,
// so a typo or a missing field fails `next build` instead of breaking the live site.

const yearMonth = z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD");
const url = z.url();
const path = z.string().startsWith("/");

export const sectionIds = [
  "summary",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "contact",
] as const;
export const SectionId = z.enum(sectionIds);
export type SectionId = z.infer<typeof SectionId>;

/** The two halves of the work: the live "read as" lens re-weights content by this. */
export const Side = z.enum(["engineering", "product"]);
export type Side = z.infer<typeof Side>;

export const Profile = z.object({
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  initials: z.string().length(2),
  title: z.string(),
  /** The hero's supporting sentence after "<title> in <city>." */
  tagline: z.string(),
  summary: z.string(),
  location: z.string(),
  /** Split so the address never appears whole in the static HTML (PRD §10.4). */
  email: z.object({ user: z.string(), domain: z.string() }),
  phone: z.string().optional(),
  siteUrl: url,
  links: z.object({
    linkedin: url,
    github: url,
    resumePdf: path,
    whatsapp: url.optional(),
  }),
  stats: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(2)
    .max(4),
  sectionOrder: z.array(SectionId).length(sectionIds.length),
  /** GLB-5: privacy-friendly analytics. Omitted = none. `code` is the GoatCounter site name. */
  analytics: z.object({ provider: z.literal("goatcounter"), code: z.string().regex(/^[a-z0-9-]+$/) }).optional(),
  lastUpdated: yearMonth,
});
export type Profile = z.infer<typeof Profile>;

export const Highlight = z.object({ text: z.string(), side: Side });
export type Highlight = z.infer<typeof Highlight>;

export const Experience = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  note: z.string().optional(),
  location: z.string().optional(),
  start: yearMonth,
  end: yearMonth.optional(),
  highlights: z.array(Highlight).min(1),
  skills: z.array(z.string()),
  relatedProjects: z.array(z.string()).optional(),
});
export type Experience = z.infer<typeof Experience>;

export const Screenshot = z.object({
  /** Omitted while the project is a placeholder: a designed title card is drawn instead. */
  src: path.optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string(),
  caption: z.string().optional(),
});
export type Screenshot = z.infer<typeof Screenshot>;

export const ProjectKind = z.enum(["mobile", "web", "dashboard", "other"]);
export type ProjectKind = z.infer<typeof ProjectKind>;

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  tagline: z.string(),
  kind: ProjectKind,
  role: z.string(),
  company: z.string().optional(),
  featured: z.boolean().optional(),
  confidential: z.boolean().optional(),
  /** True until Ahmad supplies the real project (PRJ-12). None may remain at launch. */
  placeholder: z.boolean().optional(),
  overview: z.string(),
  problem: z.string().optional(),
  contributions: z.array(z.string()).min(1),
  features: z.array(z.string()).optional(),
  impact: z.array(z.string()).optional(),
  skills: z.array(z.string()),
  screenshots: z.array(Screenshot).min(1),
  links: z
    .object({ live: url.optional(), github: url.optional(), caseStudy: url.optional(), video: url.optional() })
    .optional(),
});
export type Project = z.infer<typeof Project>;

export const Certification = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  issuer: z.string(),
  issued: yearMonth,
  expires: yearMonth.optional(),
  credentialId: z.string().optional(),
  verifyUrl: url.optional(),
  verifyNote: z.string().optional(),
  image: z.object({
    src: path,
    width: z.number().int(),
    height: z.number().int(),
    alt: z.string(),
    tone: z.string().optional(),
  }),
  featured: z.boolean().optional(),
  side: Side,
});
export type Certification = z.infer<typeof Certification>;

export const Education = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  institutionNote: z.string().optional(),
  note: z.string().optional(),
  location: z.string().optional(),
  start: yearMonth,
  end: yearMonth.optional(),
  gpa: z.string().optional(),
  honors: z.array(z.string()).optional(),
  coursework: z.array(z.string()).optional(),
});
export type Education = z.infer<typeof Education>;

export const Skill = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(["Expert", "Proficient", "Familiar"]).optional(),
});
export type Skill = z.infer<typeof Skill>;

export const SkillGroup = z.object({
  id: z.string(),
  category: z.string(),
  side: Side,
  skills: z.array(Skill).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroup>;

/** A found picture of Ahmad's world, with its credit (content/pictures.ts). */
export const Picture = z.object({
  src: path,
  width: z.number().int(),
  height: z.number().int(),
  alt: z.string(),
  title: z.string(),
  creator: z.string(),
  licence: z.string(),
  licenceUrl: z.url(),
  page: z.url(),
  /** Average colour (scripts/optimize-images.mjs --tones), the ground while the picture loads. */
  tone: z.string().regex(/^#[0-9a-f]{6}$/),
});
export type Picture = z.infer<typeof Picture>;
