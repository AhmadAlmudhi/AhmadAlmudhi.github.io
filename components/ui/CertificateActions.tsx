"use client";

import { useRef } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { Certification } from "@/content";
import { CopyButton } from "./CopyButton";
import { emailAddress } from "./Email";
import { Picture } from "./Picture";
import { Star } from "./Ornament";
import { useOpenOverlay } from "@/components/overlays/useOpenProject";

/**
 * CRT-1/2: the certificate in its frame — green frame, gold fillet, parchment mat — as one button
 * that opens it full screen, morphing from the frame into the viewer.
 */
export function CertificateFrame({ cert }: { cert: Certification }) {
  const open = useOpenOverlay();
  const picture = useRef<HTMLDivElement>(null);
  return (
    <button
      type="button"
      className="frame"
      aria-label={`View the ${cert.shortName ?? cert.name} certificate full screen`}
      onClick={() => open({ type: "certificate", id: cert.id }, picture.current)}
    >
      <span className="frame__mat">
        <span className="frame__picture" ref={picture}>
          <Picture {...cert.image} sizes="(min-width: 64em) 24rem, 90vw" />
        </span>
      </span>
      <Star className="frame__star" size={22} />
      <span className="frame__zoom" aria-hidden="true">
        <Maximize2 size={16} strokeWidth={1.75} />
      </span>
    </button>
  );
}

/** CRT-3: verify on the issuer's site, with the hint Scrum.org needs (the holder's email) and a copy button. */
export function CertificateActions({ cert }: { cert: Certification }) {
  return (
    <div className="cert__actions">
      {cert.verifyUrl && (
        <a className="action" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          <span>Verify on {cert.issuer}</span>
        </a>
      )}
      {cert.verifyNote && (
        <p className="cert__note">
          {cert.verifyNote}{" "}
          <CopyButton value={emailAddress} label="Copy my email" done="Email copied" className="action action--inline" />
        </p>
      )}
    </div>
  );
}
