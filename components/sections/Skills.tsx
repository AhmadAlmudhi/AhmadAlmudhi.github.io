import { skillGroups } from "@/content";

// SKL-1/2: skills grouped by category, as words. No percentage bars, no levels that were never stated.
export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title" data-stage="skills">
      <h2 id="skills-title" className="section-head">
        Skills
      </h2>
      <dl className="skill-groups">
        {skillGroups.map((g) => (
          <div key={g.id} className="skill-group" data-side={g.side}>
            <dt>{g.category}</dt>
            <dd>{g.skills.map((s) => s.name).join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
