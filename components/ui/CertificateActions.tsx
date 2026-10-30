"use client";

import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { Certification } from "@/content";
import { CopyButton } from "./CopyButton";
import { emailAddress } from "./Email";
import { useOpenOverlay } from "@/components/overlays/useOpenProject";

/**
 * CRT-2/3: verify on the issuer's site, with the hint Scrum.org needs (the holder's email) and a
 * button to copy it; open the certificate full screen.
 */
export function CertificateActions({ cert }: { cert: Certification }) {
  const open = useOpenOverlay();
  return (
    <div className="cert__actions">
      <a
        className="action"
        href={`#certifications/${cert.id}`}
        onClick={(e) => {
          e.preventDefault();
          // the picture in view: the stage on desktop, the one beside the name on phones
          const from =
            [...document.querySelectorAll<HTMLElement>(`[data-stage-cert="${cert.id}"], [data-cert="${cert.id}"] img`)].find(
              (el) => el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden",
            ) ?? null;
          open({ type: "certificate", id: cert.id }, from);
        }}
      >
        <Maximize2 size={18} strokeWidth={1.75} aria-hidden="true" />
        <span>View certificate</span>
      </a>
      {cert.verifyUrl && (
        <a className="action" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          <span>Verify on {cert.issuer}</span>
        </a>
      )}
      {cert.verifyNote && (
        <p className="cert__note">
          {cert.verifyNote}{" "}
          <CopyButton value={emailAddress} label="Copy my email" done="Email copied" className="action--inline" />
        </p>
      )}
    </div>
  );
}
