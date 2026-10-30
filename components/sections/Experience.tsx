import { experience } from "@/content";
import { durationMonths, formatDuration, formatMonth, isoMonth } from "@/lib/dates";
import { SectionHead, Star } from "@/components/ui/Ornament";

// EXP-1/2/3: newest first, every point shown. A finished role shows how long it lasted, in full
// words; the current one doesn't. The record runs down a gold spine with the star at each role.
export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHead id="experience-title" title="Experience" />
      <ol className="roles">
        {experience.map((job) => (
          <li key={job.id} className="role">
            <Star className="role__mark" size={22} />
            <div className="role__head">
              <h3 className="role__title">{job.role}</h3>
              <p className="role__when">
                <time dateTime={isoMonth(job.start)}>{formatMonth(job.start)}</time>
                {" – "}
                {job.end ? <time dateTime={isoMonth(job.end)}>{formatMonth(job.end)}</time> : "Present"}
              </p>
              <p className="role__company">
                {job.company}
                {job.note ? <span className="role__note"> — {job.note}</span> : null}
              </p>
              {job.end && <p className="role__duration">{formatDuration(durationMonths(job.start, job.end))}</p>}
            </div>
            <ul className="highlights">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="skill-line" aria-label={`Skills used at ${job.company}`}>
              {job.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
