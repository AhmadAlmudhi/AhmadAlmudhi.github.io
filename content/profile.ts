import type { Profile } from "./schema";

export const profile: Profile = {
  fullName: "Ahmad Almudhi",
  firstName: "Ahmad",
  lastName: "Almudhi",
  initials: "AA",
  title: "Software Engineer",
  summary:
    "Software engineer specializing in Flutter, with additional experience across web development. Co-founded a clothing brand, making product decisions based on customer demand. PSPO I, PSM I certified.",
  location: "Riyadh, Saudi Arabia",
  email: { user: "a.almudhi1419", domain: "gmail.com" },
  // phone: omitted on purpose — it lives in the resume PDF only (PRD CON-1).
  siteUrl: "https://ahmadalmudhi.github.io",
  links: {
    linkedin: "https://www.linkedin.com/in/ahmad-almudhi",
    github: "https://github.com/AhmadAlmudhi",
    resumePdf: "/resume/Ahmad-Almudhi-Resume.pdf",
  },
  stats: [
    { value: "2 → 1", label: "Native apps replaced by one Flutter app" },
    { value: "23", label: "Branches monitored by my dashboard" },
    { value: "12", label: "Collections shipped" },
  ],
  sectionOrder: ["summary", "experience", "projects", "skills", "education", "certifications", "contact"],
  // analytics: { provider: "goatcounter", code: "<your-site>" },  // GLB-5: off until a provider is chosen
  lastUpdated: "2026-10-30",
};
