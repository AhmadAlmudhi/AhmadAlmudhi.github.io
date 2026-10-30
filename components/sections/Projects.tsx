import { projects, type Project } from "@/content";
import { SectionHead } from "@/components/ui/Ornament";
import { CardShots, OpenProject } from "./ProjectCard";

const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
const KIND: Record<Project["kind"], string> = {
  mobile: "Mobile app",
  web: "Web app",
  dashboard: "Dashboard",
  multiplatform: "Web and mobile app",
  other: "Project",
};

// PRJ-1/3/5/11/12: featured first. One column of cards below 64em, two from there (a lone card spans
// both, pictures beside words); each opens its detail. The cards render on the server; only the
// screenshot stepper and the open button run in the browser. Placeholders say so until the real
// ones come.
export function Projects() {
  return (
    <section id="projects" className="section section--wide" aria-labelledby="projects-title">
      <SectionHead id="projects-title" title="Projects" />
      <ul className="cards" aria-label="Projects">
        {ordered.map((p) => (
          <li key={p.slug} className="card">
            <CardShots project={{ slug: p.slug, title: p.title, kind: p.kind, company: p.company, screenshots: p.screenshots }} />
            <div className="card__text">
              <h3 className="card__title">{p.title}</h3>
              <p className="card__tagline">{p.tagline}</p>
              <p className="card__meta">
                {KIND[p.kind]}, {p.company ?? p.role.toLowerCase()}
                {p.placeholder ? ". Placeholder, details to come." : ""}
              </p>
              <OpenProject slug={p.slug} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
