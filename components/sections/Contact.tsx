import { MapPin } from "lucide-react";
import { profile } from "@/content";
import { Email } from "@/components/ui/Email";
import { SectionHead } from "@/components/ui/Ornament";
import { ContactActions } from "@/components/ui/ContactActions";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

// CON-1..5 on the identity's green band: one open invitation, the address set large, then the ways
// to keep it (copy, contact card, QR code, the PDF). No phone on the site; it lives in the PDF.
export function Contact() {
  return (
    <section id="contact" className="band band--section contact" aria-labelledby="contact-title">
      <div className="band__inner">
        <SectionHead id="contact-title" title="Contact" className="section-head--on-band" />
        <p className="contact__lead">Feel free to contact me at any time.</p>
        <p className="contact__email">
          <Email subject="Hello Ahmad" />
        </p>
        <ContactActions />
        <ul className="contact__links">
          <li>
            <a className="contact__link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a className="contact__link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </li>
          <li className="contact__place">
            <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{profile.location}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
