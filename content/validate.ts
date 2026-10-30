import { z } from "zod";
import { Certification, Education, Experience, Profile, Project, SkillGroup } from "./schema";
import { profile } from "./profile";
import { experience } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { education } from "./education";
import { certifications } from "./certifications";

/**
 * PRD §11: validates every content file against its schema when the page is built (app/page.tsx, a
 * server component, calls this). A typo or a missing field fails `next build`. The content files
 * themselves are plain typed data, so the validator never ships to the browser.
 */
export function validateContent() {
  Profile.parse(profile);
  z.array(Experience).parse(experience);
  z.array(Project).parse(projects);
  z.array(SkillGroup).parse(skillGroups);
  z.array(Education).parse(education);
  z.array(Certification).parse(certifications);

  const slugs = new Set(projects.map((p) => p.slug));
  for (const job of experience) {
    for (const slug of job.relatedProjects ?? []) {
      if (!slugs.has(slug)) throw new Error(`content/experience.ts: ${job.id} relates to unknown project "${slug}"`);
    }
  }
}
