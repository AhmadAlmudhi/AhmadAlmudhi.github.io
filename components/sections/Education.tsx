import { certifications, education, profile } from "@/content";
import { pictures } from "@/content/pictures";
import { formatMonth } from "@/lib/dates";
import { NextLink } from "@/components/nav/NextLink";

const year = (d: string) => d.slice(0, 4);

// Blueprint "Founder's letter": a short first-person letter in a centred column, signed. Every
// sentence states a fact already in the content (EDU-1); the monogram stands in for a portrait.
export function Education() {
  const degree = education.find((e) => e.id === "ksu") ?? education[education.length - 1];
  const bootcamp = education.find((e) => e.id === "tuwaiq") ?? education[0];
  const certs = certifications.map((c) => c.shortName ?? c.name);
  const certMonth = formatMonth(certifications[0].issued.slice(0, 7));
  return (
    <section id="education" className="section education" aria-labelledby="education-title" data-stage="education">
      <h2 id="education-title" className="section-head">
        Education
      </h2>
      <figure className="mobile-picture">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img
          src={pictures.ksu.src}
          width={pictures.ksu.width}
          height={pictures.ksu.height}
          alt={pictures.ksu.alt}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="letter">
        <span className="letter__mark" aria-hidden="true">
          {profile.initials}
        </span>
        <p>
          <strong>{degree.degree.replace("Bachelor's degree, ", "")}, {degree.institution}.</strong> I studied for my
          bachelor&rsquo;s degree in {profile.location.split(",")[0]} from {formatMonth(degree.start)} to{" "}
          {formatMonth(degree.end ?? degree.start)}.
        </p>
        <p>
          <strong>
            {bootcamp.degree}, {bootcamp.institution}.
          </strong>{" "}
          In {year(bootcamp.start)} I spent {bootcamp.note} there, from {formatMonth(bootcamp.start)} to{" "}
          {formatMonth(bootcamp.end ?? bootcamp.start)}. The academy is part of the {bootcamp.institutionNote}.
        </p>
        <p>
          Flutter became my main tool. At Muvi Cinemas I used it to rebuild the booking app, replacing two native
          apps with one.
        </p>
        <p>
          The product side I learned on the job, writing and prioritizing my own backlog, and certified in{" "}
          {certMonth}: {certs.join(" and ")}.
        </p>
        <p className="letter__sign">
          <span className="letter__name">{profile.fullName}</span>
          <span className="letter__role">{profile.title}</span>
        </p>
      </div>
      <NextLink after="education" />
    </section>
  );
}
