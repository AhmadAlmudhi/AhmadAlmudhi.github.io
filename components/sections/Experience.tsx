import { experience } from "@/content";
import { formatMonth, isoMonth } from "@/lib/dates";
import { Duration } from "@/components/ui/Duration";
import { BUILD_DAY } from "@/lib/build";

// EXP-1/2/3: newest first; role, company, dates with a computed duration, impact bullets, skill tags.
// Each role drives the stage (`data-stage`), which shows the work that belongs to it.
export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section-head">
        Experience
      </h2>
      <ol className="roles">
        {experience.map((job) => (
          <li key={job.id} className="role" data-stage={`exp-${job.id}`}>
            <h3 className="role__title">
              {job.role}
              <span className="role__company">
                {job.company}
                {job.note ? `, ${job.note}` : ""}
              </span>
            </h3>
            <p className="role__when small">
              <time dateTime={isoMonth(job.start)}>{formatMonth(job.start)}</time>
              {" – "}
              {job.end ? <time dateTime={isoMonth(job.end)}>{formatMonth(job.end)}</time> : "Present"}
              <span className="role__duration">
                <Duration start={job.start} end={job.end} built={BUILD_DAY} />
              </span>
            </p>
            <ul className="role__highlights">
              {job.highlights.map((h) => (
                <li key={h.text} data-side={h.side}>
                  {h.text}
                </li>
              ))}
            </ul>
            <ul className="tags" aria-label="Skills used">
              {job.skills.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
