import { Profile } from "./schema";

export const profile = Profile.parse({
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
    linkedin: "https://www.linkedin.com/in/ahmad-almudhi-pspo%E2%84%A2-psm%E2%84%A2%E2%80%8F-a25a20181/",
    github: "https://github.com/AhmadAlmudhi",
    resumePdf: "/resume/Ahmad-Almudhi-Resume.pdf",
  },
  stats: [
    { value: "2 → 1", label: "Native apps replaced by one Flutter app" },
    { value: "23", label: "Branches monitored by my dashboard" },
    { value: "12", label: "Collections shipped" },
  ],
  sectionOrder: ["summary", "experience", "projects", "skills", "education", "certifications", "contact"],
  lastUpdated: "2026-10-30",
});
