import { certifications, experience, skillGroups } from "@/content";
import { NextLink } from "@/components/nav/NextLink";

/** SKL-4: where each skill was used, from the roles' skill tags (and the Scrum certificates). */
function usedIn(name: string) {
  const roles = experience.filter((j) => j.skills.includes(name)).map((j) => j.company);
  const certs = name === "Agile & Scrum" ? certifications.map((c) => c.shortName ?? c.name) : [];
  return [...roles, ...certs];
}

// Blueprint "Giant word, filled bar rows": the word fills the reading column, then one filled bar
// per category. Each bar names its skills; opening it says where each one was used (SKL-1/2/4).
export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title" data-stage="skills">
      <h2 id="skills-title" className="skills__word">
        Skills
      </h2>
      <div className="bars">
        {skillGroups.map((g, i) => (
          <details key={g.id} className="bar" data-side={g.side} open={i === 0}>
            <summary className="bar__summary">
              <span className="bar__text">
                <span className="bar__name">{g.category}</span>
                <span className="bar__skills">{g.skills.map((s) => s.name).join(", ")}</span>
              </span>
              <span className="bar__toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <ul className="bar__panel">
              {g.skills.map((s) => {
                const where = usedIn(s.name);
                return (
                  <li key={s.id} className="bar__item">
                    <span>{s.name}</span>
                    <span className="bar__where">{where.length ? where.join(", ") : ""}</span>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
      <NextLink after="skills" />
    </section>
  );
}
