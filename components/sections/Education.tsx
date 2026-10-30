import { education } from "@/content";
import { formatMonth, isoMonth } from "@/lib/dates";
import { SectionHead } from "@/components/ui/Ornament";

// EDU-1, exactly as the CV sets it: the program (with its hours), its dates, then the institution.
export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <SectionHead id="education-title" title="Education" />
      <ul className="schools">
        {education.map((e) => (
          <li key={e.id} className="school">
            <h3 className="school__title">
              {e.degree}
              {e.note ? ` (${e.note})` : ""}
            </h3>
            <p className="school__when">
              <time dateTime={isoMonth(e.start)}>{formatMonth(e.start)}</time>
              {" – "}
              {e.end ? <time dateTime={isoMonth(e.end)}>{formatMonth(e.end)}</time> : "Present"}
            </p>
            <p className="school__place">
              {e.institution}
              {e.institutionNote ? ` — ${e.institutionNote}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
