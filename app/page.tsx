import type { ReactNode } from "react";
import { profile, projects, type SectionId } from "@/content";
import { validateContent } from "@/content/validate";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

validateContent(); // PRD §11: bad content fails the build

// PRJ-12: the build lists every placeholder project still on the site. None may remain at launch.
const placeholders = projects.filter((p) => p.placeholder).map((p) => p.slug);
if (placeholders.length) {
  console.warn(`\n[content] ${placeholders.length} placeholder project(s) still on the site: ${placeholders.join(", ")}\n`);
}

const SECTIONS: Record<SectionId, () => ReactNode> = {
  summary: () => <Hero />,
  experience: () => <Experience />,
  projects: () => <Projects />,
  skills: () => <Skills />,
  education: () => <Education />,
  certifications: () => <Certifications />,
  contact: () => <Contact />,
};

// The sections in the order the content file sets (PRD §4.1).
export default function Page() {
  return (
    <>
      <main id="main">
        {profile.sectionOrder.map((id) => (
          <div key={id}>{SECTIONS[id]()}</div>
        ))}
      </main>
      <Footer />
    </>
  );
}
