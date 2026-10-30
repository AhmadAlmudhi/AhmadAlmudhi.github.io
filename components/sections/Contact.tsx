import { profile } from "@/content";
import { Email } from "@/components/ui/Email";

// CON-1/3: email, LinkedIn, GitHub and the resume PDF. No phone on the site (it lives in the PDF).
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-head">
        Contact
      </h2>
      <p className="lead">Write to me about a role, a product or a Flutter app.</p>
      <p className="contact__email">
        <Email subject="Hello Ahmad" />
      </p>
      <ul className="contact__links">
        <li>
          <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a className="link" href={profile.links.resumePdf} download={profile.links.resumePdf.split("/").pop()}>
            Resume (PDF)
          </a>
        </li>
      </ul>
      <p className="small">{profile.location}</p>
    </section>
  );
}
