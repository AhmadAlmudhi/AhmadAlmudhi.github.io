"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { profile, sections } from "@/content";
import { useNav } from "@/lib/nav";

// The section index: a bottom sheet on phones, a panel on desktop. A native modal <dialog> traps
// focus, closes on Esc and returns focus to the button that opened it.
export function IndexSheet() {
  const { active, goTo, indexOpen, setIndexOpen } = useNav();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (indexOpen && !dialog.open) dialog.showModal();
    if (!indexOpen && dialog.open) dialog.close();
  }, [indexOpen]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="index-title"
      onClose={() => setIndexOpen(false)}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) setIndexOpen(false);
      }}
    >
      <div className="sheet__inner">
        <div className="sheet__top">
          <h2 id="index-title" className="sheet__title">
            Sections
          </h2>
          <button type="button" className="icon-button" aria-label="Close" onClick={() => setIndexOpen(false)}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <ul className="sheet__list">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className="sheet__item"
                aria-current={s.id === active}
                onClick={() => {
                  setIndexOpen(false);
                  goTo(s.id);
                }}
              >
                <span className="sheet__mark" aria-hidden="true" />
                {s.label}
                {s.id === active && <span className="sheet__here">You are here</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="sheet__actions">
          <a className="link" href={profile.links.resumePdf} download={profile.links.resumePdf.split("/").pop()}>
            Download resume (PDF)
          </a>
          <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </dialog>
  );
}
