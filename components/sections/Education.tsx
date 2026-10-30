import { education } from "@/content";
import { formatMonth, isoMonth } from "@/lib/dates";

// EDU-1: program, institution, dates and notes.
export function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-title" data-stage="education">
      <h2 id="education-title" className="section-head">
        Education
      </h2>
      <ul className="schools">
        {education.map((e) => (
          <li key={e.id} className="school">
            <h3 className="school__name">{e.degree}</h3>
            <p>
              {e.institution}
              {e.institutionNote ? `, ${e.institutionNote}` : ""}
            </p>
            <p className="small muted">
              <time dateTime={isoMonth(e.start)}>{formatMonth(e.start)}</time>
              {" – "}
              {e.end ? <time dateTime={isoMonth(e.end)}>{formatMonth(e.end)}</time> : "Present"}
              {e.note ? `, ${e.note}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
