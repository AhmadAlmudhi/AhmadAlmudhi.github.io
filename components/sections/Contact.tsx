import { profile } from "@/content";
import { Email } from "@/components/ui/Email";
import { FitText } from "@/components/ui/FitText";
import { ContactActions } from "@/components/ui/ContactActions";

// Blueprint "The email as display type": one screen in the inverse colours, the address fitted from
// margin to margin. CON-1..5: email, copy, save contact, QR, resume. No phone on the site.
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__top">
        <h2 id="contact-title" className="contact__lead">
          Write to me about a role, a product or a Flutter app.
        </h2>
        <ContactActions />
      </div>
      <p className="contact__email">
        <FitText below="63.99em">
          <Email subject="Hello Ahmad" />
        </FitText>
      </p>
      <div className="contact__foot">
        <p>{profile.location}</p>
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
        </ul>
      </div>
    </section>
  );
}
