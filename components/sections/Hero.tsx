import { ArrowDownToLine, Mail } from "lucide-react";
import { profile } from "@/content";
import { Divider } from "@/components/ui/Ornament";
import { Email } from "@/components/ui/Email";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Landscape, Tower } from "@/components/ui/ThemePictures";

// The identity's banner (Ahmad's theme image) as the first screen: the name in gold between the two
// dividers, the Najdi towers at both edges, the palm groves below, and the green band carrying the
// actions. HERO-1/2/3/6.
export function Hero() {
  return (
    <section id="summary" className="hero" aria-labelledby="summary-title">
      <div className="hero__scene">
        <Tower side="left" className="hero__tower" priority />
        <Tower side="right" className="hero__tower" priority />
        <Landscape className="hero__land" priority />
        <div className="hero__body">
          <Divider className="hero__divider" />
          <h1 id="summary-title" className="hero__name">
            <span className="line">
              <span data-line className="gold-text" style={{ "--i": 0 } as React.CSSProperties}>
                {profile.fullName}
              </span>
            </span>
          </h1>
          <Divider className="hero__divider" />
          <p className="hero__summary">{profile.summary}</p>
        </div>
      </div>

      <div className="band hero__band">
        <div className="hero__actions">
          <a className="button button--gold" href={profile.links.resumePdf} download={profile.links.resumePdf.split("/").pop()}>
            <ArrowDownToLine size={18} strokeWidth={1.75} aria-hidden="true" />
            Download resume
          </a>
          <a className="button button--outline" href="#contact">
            Contact me
          </a>
        </div>
        <ul className="hero__links" aria-label="Elsewhere">
          <li>
            <Email className="hero__link" label="Email" icon={<Mail size={18} strokeWidth={1.75} aria-hidden="true" />} />
          </li>
          <li>
            <a className="hero__link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a className="hero__link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
