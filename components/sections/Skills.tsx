import { skillGroups } from "@/content";
import { SectionHead } from "@/components/ui/Ornament";

// SKL-1/2: the CV's two groups on the identity's green band, each skill set as a word in a grid,
// marked with the dividers' gold diamond. No levels, no percentages, no "where used".
export function Skills() {
  return (
    <section id="skills" className="band band--section" aria-labelledby="skills-title">
      <div className="band__inner">
        <SectionHead id="skills-title" title="Skills" className="section-head--on-band" />
        <div className="skill-groups">
          {skillGroups.map((g) => (
            <div key={g.id} className="skill-group">
              <h3 className="skill-group__title">{g.category}</h3>
              <ul className="skill-group__list">
                {g.skills.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
