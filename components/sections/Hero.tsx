import { ArrowDownToLine } from "lucide-react";
import { profile, projects } from "@/content";
import { Stage } from "@/components/stage/Stage";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectShot } from "@/components/ui/ProjectShot";
import { Email } from "@/components/ui/Email";
import { pictures } from "@/content/pictures";

// Hero blueprint "Menu column, sticky photograph": a paper sheet set like a card on the left, the
// stage on the right holding the one app that replaced two. HERO-1/2/3/6.
export function Hero({ children }: { children?: React.ReactNode }) {
  const lead = projects.find((p) => p.kind === "mobile") ?? projects[0];
  return (
    <section id="summary" className="summary" aria-labelledby="summary-title">
      <div className="hero">
        <div className="hero__sheet">
          <div className="hero__body">
            <h1 id="summary-title" className="hero__name display">
              <span className="line">
                <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                  {profile.firstName}
                </span>
              </span>
              <span className="line">
                <span data-line style={{ "--i": 1 } as React.CSSProperties}>
                  {profile.lastName}
                </span>
              </span>
            </h1>
            <p className="hero__title lead">
              {profile.title} in {profile.location.split(",")[0]}. {profile.tagline}
            </p>
            <p className="hero__summary">{profile.summary}</p>
            <div className="hero__actions">
              <a
                className="button"
                href={profile.links.resumePdf}
                download={profile.links.resumePdf.split("/").pop()}
              >
                Download resume
                <ArrowDownToLine size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="link" href="#contact">
                Contact me
              </a>
            </div>
          </div>
          <ul className="hero__links" aria-label="Elsewhere">
            <li>
              <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <Email className="link" />
            </li>
            <li>
              <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <Stage
          className="hero__stage"
          label={`${lead.title}, the app ${profile.firstName} rebuilt`}
          layers={[
            {
              key: "hero",
              content: (
                <figure className="hero-picture">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                  <img
                    className="hero-picture__photo"
                    src={pictures.riyadh.src}
                    width={pictures.riyadh.width}
                    height={pictures.riyadh.height}
                    alt={pictures.riyadh.alt}
                    fetchPriority="high"
                    decoding="async"
                  />
                  <PhoneFrame>
                    <ProjectShot project={lead} shot={lead.screenshots[0]} priority />
                  </PhoneFrame>
                  <figcaption className="sr-only">
                    {lead.title}, {lead.tagline}, in front of {pictures.riyadh.alt}
                  </figcaption>
                </figure>
              ),
            },
          ]}
        />
      </div>
      {children}
    </section>
  );
}
