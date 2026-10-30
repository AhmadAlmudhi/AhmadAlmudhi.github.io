import { certifications } from "@/content";
import { formatDay, isoMonth } from "@/lib/dates";
import { SectionHead } from "@/components/ui/Ornament";
import { CertificateActions, CertificateFrame } from "@/components/ui/CertificateActions";

// CRT-1..4: each certificate framed like a hung diploma (green frame, gold fillet, parchment mat),
// opening full screen on a tap; under it the name, issuer, date, status and how to verify it.
export function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <SectionHead id="certifications-title" title="Certifications" />
      <ul className="certs">
        {certifications.map((c) => (
          <li key={c.id} className="cert">
            <CertificateFrame cert={c} />
            <h3 className="cert__name">
              {c.name}
              {c.shortName ? ` (${c.shortName})` : ""}
            </h3>
            <p className="cert__meta">
              {c.issuer}, <time dateTime={isoMonth(c.issued)}>{formatDay(c.issued)}</time>
            </p>
            <dl className="cert__facts">
              <div>
                <dt>Status</dt>
                <dd>{c.expires ? `Expires ${formatDay(c.expires)}` : "Active, does not expire"}</dd>
              </div>
              {c.credentialId && (
                <div>
                  <dt>Credential</dt>
                  <dd className="nums">{c.credentialId}</dd>
                </div>
              )}
            </dl>
            <CertificateActions cert={c} />
          </li>
        ))}
      </ul>
    </section>
  );
}
