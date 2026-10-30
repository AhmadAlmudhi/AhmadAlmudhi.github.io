import { certifications } from "@/content";
import { formatDay, isoMonth } from "@/lib/dates";
import { NextLink } from "@/components/nav/NextLink";
import { CertificateActions } from "@/components/ui/CertificateActions";

// Blueprint "Plain names in columns": the names set as type, no logos or boxes. On desktop the stage
// holds each certificate as its name passes; on phones the image sits with the name (CRT-1..4).
export function Certifications() {
  return (
    <section id="certifications" className="section certifications" aria-labelledby="certifications-title">
      <h2 id="certifications-title" className="section-head">
        Certifications
      </h2>
      <ul className="certs">
        {certifications.map((c) => (
          <li key={c.id} className="cert" data-stage={`cert-${c.id}`} data-side={c.side} data-cert={c.id}>
            <figure className="mobile-picture cert__picture">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
              <img
                src={c.image.src}
                width={c.image.width}
                height={c.image.height}
                alt={c.image.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <h3 className="cert__name">
              {c.name}
              {c.shortName ? <span className="cert__short"> ({c.shortName})</span> : null}
            </h3>
            <dl className="cert__facts">
              <div>
                <dt>Issued by</dt>
                <dd>{c.issuer}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>
                  <time dateTime={isoMonth(c.issued)}>{formatDay(c.issued)}</time>
                </dd>
              </div>
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
      <NextLink after="certifications" />
    </section>
  );
}
