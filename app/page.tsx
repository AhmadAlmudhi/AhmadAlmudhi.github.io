import type { ReactNode } from "react";
import { certifications, experience, profile, projects, type SectionId } from "@/content";
import { validateContent } from "@/content/validate";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { pictures } from "@/content/pictures";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Stage, type StageLayer } from "@/components/stage/Stage";
import { StageCard } from "@/components/stage/StageCard";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectShot } from "@/components/ui/ProjectShot";
import { Picture } from "@/components/ui/Picture";

validateContent(); // PRD §11: bad content fails the build

// PRJ-12: the build lists every placeholder project still on the site. None may remain at launch.
const placeholders = projects.filter((p) => p.placeholder).map((p) => p.slug);
if (placeholders.length) {
  console.warn(`\n[content] ${placeholders.length} placeholder project(s) still on the site: ${placeholders.join(", ")}\n`);
}

// The sections that sit in the reading half of the split stage, in the order the content file sets.
const reading: Partial<Record<SectionId, () => ReactNode>> = {
  experience: () => <Experience />,
  projects: () => <Projects />,
  skills: () => <Skills />,
  education: () => <Education />,
  certifications: () => <Certifications />,
};

function shotFrame(project: (typeof projects)[number]) {
  const shot = <ProjectShot project={project} shot={project.screenshots[0]} />;
  return project.kind === "mobile" ? (
    <div data-stage-shot={project.slug}>
      <PhoneFrame>{shot}</PhoneFrame>
    </div>
  ) : (
    <div className="wide-frame" data-stage-shot={project.slug}>
      {shot}
    </div>
  );
}

function stageLayers(): StageLayer[] {
  const byCompany = (company: string) => projects.find((p) => p.company === company);
  const layers: StageLayer[] = [];

  for (const job of experience) {
    const work = byCompany(job.company);
    layers.push({
      key: `exp-${job.id}`,
      content: work ? (
        <figure className="stage-figure">
          {shotFrame(work)}
          <figcaption className="stage-caption">
            {work.title}. {work.tagline}
          </figcaption>
        </figure>
      ) : (
        <StageCard figure={job.company} caption={job.role} detail={job.highlights[0].text} />
      ),
    });
  }

  for (const project of projects) {
    layers.push({
      key: `project-${project.slug}`,
      content: (
        <figure className="stage-figure">
          {shotFrame(project)}
          <figcaption className="stage-caption">
            {project.title}. {project.tagline}
          </figcaption>
        </figure>
      ),
    });
  }

  layers.push({
    key: "skills",
    content: <StageCard figure="Product + engineering" caption="Two sets of skills, one person." />,
  });

  layers.push({
    key: "education",
    content: (
      <figure className="stage-figure stage-figure--photo">
        <Picture {...pictures.ksu} sizes="50vw" />
      </figure>
    ),
  });

  for (const cert of certifications) {
    layers.push({
      key: `cert-${cert.id}`,
      content: (
        <figure className="stage-figure stage-figure--certificate">
          <Picture {...cert.image} sizes="44rem" data-stage-cert={cert.id} />
          <figcaption className="stage-caption">
            {cert.name} ({cert.shortName}), {cert.issuer}
          </figcaption>
        </figure>
      ),
    });
  }
  return layers;
}

export default function Page() {
  const middle = profile.sectionOrder.filter((id) => reading[id]);
  return (
    <>
      <main id="main">
        <Hero>
          <Stats />
        </Hero>
        <div className="split">
          <div className="read" id="read">
            {middle.map((id) => (
              <div key={id}>{reading[id]?.()}</div>
            ))}
          </div>
          <Stage className="split__stage" watch="read" label="The work that goes with what you are reading" layers={stageLayers()} />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
