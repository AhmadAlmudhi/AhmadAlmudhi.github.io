import { experience, type Side } from "@/content";
import { formatMonth, isoMonth } from "@/lib/dates";
import { Duration } from "@/components/ui/Duration";
import { Lens, type LensFacts } from "@/components/lens/Lens";
import { BUILD_DAY } from "@/lib/build";
import { NextLink } from "@/components/nav/NextLink";

const VISIBLE = 4; // EXP-5: longer entries fold the rest behind "Show more"

function lensFacts(): LensFacts {
  const sides: Side[] = ["engineering", "product"];
  const bySide = Object.fromEntries(
    sides.map((side) => {
      const jobs = experience.filter((j) => j.highlights.some((h) => h.side === side));
      const count = experience.flatMap((j) => j.highlights).filter((h) => h.side === side).length;
      return [side, { count, companies: jobs.map((j) => j.company) }];
    }),
  ) as LensFacts["bySide"];
  return { total: experience.flatMap((j) => j.highlights).length, roles: experience.length, bySide };
}

// Blueprint "Sticky picture, active list" on the split stage: the roles pass in the reading half
// while the stage holds the work that belongs to each. A 4px spine runs down the record (EXP-1/4).
export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section-head">
        Experience
      </h2>
      <Lens facts={lensFacts()} />
      <ol className="roles">
        {experience.map((job) => {
          const shown = job.highlights.slice(0, VISIBLE);
          const more = job.highlights.slice(VISIBLE);
          return (
            <li key={job.id} className="role" data-stage={`exp-${job.id}`}>
              <div className="role__head">
                <h3 className="role__title">
                  {job.role}
                  <span className="role__company">
                    {job.company}
                    {job.note ? `, ${job.note}` : ""}
                  </span>
                </h3>
                <p className="role__when">
                  <span className="nums">
                    <time dateTime={isoMonth(job.start)}>{formatMonth(job.start)}</time>
                    {" – "}
                    {job.end ? <time dateTime={isoMonth(job.end)}>{formatMonth(job.end)}</time> : "Present"}
                  </span>
                  <span className="role__duration">
                    <Duration start={job.start} end={job.end} built={BUILD_DAY} />
                  </span>
                </p>
              </div>
              <ul className="highlights">
                {shown.map((h) => (
                  <li key={h.text} data-side={h.side}>
                    {h.text}
                  </li>
                ))}
              </ul>
              {more.length > 0 && (
                <details className="more">
                  <summary>
                    <span className="more__closed">Show {more.length} more</span>
                    <span className="more__open">Show fewer</span>
                  </summary>
                  <div className="more__panel">
                    <ul className="highlights">
                      {more.map((h) => (
                        <li key={h.text} data-side={h.side}>
                          {h.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}
              <ul className="tags role__tags" aria-label={`Skills used at ${job.company}`}>
                {job.skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
      <NextLink after="experience" />
    </section>
  );
}
