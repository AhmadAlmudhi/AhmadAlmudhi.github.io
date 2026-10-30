import { projects } from "@/content";

// PRJ-1/4/11/12: featured first. Each project drives the stage, which holds its screenshot while the
// text passes. Placeholders say so on the page until the real projects arrive.
export function Projects() {
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-head">
        Projects
      </h2>
      <ul className="project-list">
        {ordered.map((p) => (
          <li key={p.slug} className="project" data-stage={`project-${p.slug}`}>
            <h3 className="project__title">{p.title}</h3>
            <p className="project__tagline lead">{p.tagline}</p>
            <p className="project__meta small">
              {p.role}
              {p.company ? ` at ${p.company}` : ""}
              {p.placeholder ? ". Placeholder: details and screenshots to come." : ""}
            </p>
            <ul className="tags" aria-label="Skills used">
              {p.skills.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
