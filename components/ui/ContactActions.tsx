"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDownToLine, QrCode, UserPlus, X } from "lucide-react";
import { profile } from "@/content";
import { CopyButton } from "./CopyButton";
import { emailAddress } from "./Email";
import { toast } from "./Toast";
import { useHydrated } from "@/lib/client";

// The QR library loads only when the sheet first opens, keeping it out of the initial JS budget.
const QRCodeSVG = lazy(() => import("qrcode.react").then((m) => ({ default: m.QRCodeSVG })));

/** CON-4: a vCard built in the browser, so the email never sits in a static file. No phone. */
function saveContact() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.fullName}`,
    `TITLE:${profile.title}`,
    `EMAIL;TYPE=INTERNET:${emailAddress()}`,
    `URL:${profile.siteUrl}`,
    `URL:${profile.links.linkedin}`,
    `URL:${profile.links.github}`,
    `ADR;TYPE=WORK:;;;${profile.location.split(",")[0]};;;${profile.location.split(",")[1]?.trim() ?? ""}`,
    `NOTE:Resume: ${profile.siteUrl}`,
    "END:VCARD",
  ];
  const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.fullName.replace(/\s+/g, "-")}.vcf`;
  document.body.append(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast("Contact card saved");
}

/** CON-5: a large QR code of the site, so an interviewer can open it on their own phone. */
function QrSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const hydrated = useHydrated();
  const canShare = hydrated && "share" in navigator;
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="sheet qr-sheet"
      aria-labelledby="qr-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sheet__inner">
        <div className="sheet__top">
          <h2 id="qr-title" className="sheet__title">
            Open this on your phone
          </h2>
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className="qr">
          {open && (
            <Suspense fallback={<div className="qr__wait" aria-hidden="true" />}>
              <QRCodeSVG
            value={profile.siteUrl}
            size={512}
            level="M"
            marginSize={2}
            bgColor="#ffffff"
            fgColor="#050f16"
                title={`QR code for ${profile.siteUrl}`}
              />
            </Suspense>
          )}
        </div>
        <p className="qr__url">{profile.siteUrl.replace("https://", "")}</p>
        <div className="sheet__actions">
          <CopyButton value={() => profile.siteUrl} label="Copy link" done="Link copied" className="button button--green" />
          {canShare && (
            <button
              type="button"
              className="button button--outline-ink"
              onClick={() =>
                navigator.share({ title: `${profile.fullName}, ${profile.title}`, url: profile.siteUrl }).catch(() => {})
              }
            >
              Share
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function ContactActions() {
  const [qr, setQr] = useState(false);
  return (
    <ul className="contact__actions">
      <li>
        <CopyButton value={emailAddress} label="Copy email" done="Email copied" className="button button--gold" />
      </li>
      <li>
        <button type="button" className="button button--outline" onClick={saveContact}>
          <UserPlus size={18} strokeWidth={1.75} aria-hidden="true" />
          Save contact
        </button>
      </li>
      <li>
        <button type="button" className="button button--outline" onClick={() => setQr(true)} aria-haspopup="dialog">
          <QrCode size={18} strokeWidth={1.75} aria-hidden="true" />
          QR code
        </button>
        <QrSheet open={qr} onClose={() => setQr(false)} />
      </li>
      <li>
        <a className="button button--outline" href={profile.links.resumePdf} download={profile.links.resumePdf.split("/").pop()}>
          <ArrowDownToLine size={18} strokeWidth={1.75} aria-hidden="true" />
          Download resume
        </a>
      </li>
    </ul>
  );
}
