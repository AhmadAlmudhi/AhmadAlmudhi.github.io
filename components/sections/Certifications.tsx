import { certifications } from "@/content";
import { formatDay, isoMonth } from "@/lib/dates";

// CRT-1/3/4: name, issuer, date, credential ID, status, and the issuer's verification link.
export function Certifications() {
  return (
    <section id="certifications" className="section certifications" aria-labelledby="certifications-title">
      <h2 id="certifications-title" className="section-head">
        Certifications
      </h2>
      <ul className="certs">
        {certifications.map((c) => (
          <li key={c.id} className="cert" data-stage={`cert-${c.id}`}>
            <h3 className="cert__name">
              {c.name}
              {c.shortName ? ` (${c.shortName})` : ""}
            </h3>
            <p className="small">
              {c.issuer}, <time dateTime={isoMonth(c.issued)}>{formatDay(c.issued)}</time>.{" "}
              {c.expires ? `Expires ${formatDay(c.expires)}.` : "Does not expire."} Credential {c.credentialId}.
            </p>
            {c.verifyUrl && (
              <p>
                <a className="link" href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                  Verify on {c.issuer}
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
