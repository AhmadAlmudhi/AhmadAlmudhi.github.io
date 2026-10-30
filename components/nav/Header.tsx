"use client";

import { ArrowDownToLine } from "lucide-react";
import { profile, sections } from "@/content";
import { useNav } from "@/lib/nav";

// NAV-2/3: the full name in the identity's gold (back to the top), every section as a link on wide
// screens (the Sections list below that), and the resume PDF. The header's paper keeps the links
// legible over the towers and the green bands alike.
export function Header() {
  const { active, goTo, setIndexOpen } = useNav();
  return (
    <header className="header">
      <div className="header__inner">
        <a
          aria-label={`${profile.fullName}, back to the top`}
          className="wordmark"
          href="#summary"
          onClick={(e) => {
            e.preventDefault();
            history.pushState(null, "", location.pathname);
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            });
          }}
        >
          {profile.fullName}
        </a>
        <nav className="header__actions" aria-label="Site">
          <ul className="header__nav">
            {sections
              .filter((s) => s.id !== "summary")
              .map((s) => (
                <li key={s.id}>
                  <a
                    className="header__link header__section"
                    href={`#${s.id}`}
                    aria-current={s.id === active ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(s.id);
                    }}
                  >
                    <span className="header__mark" aria-hidden="true" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
          </ul>
          <button
            type="button"
            className="header__link header__sections"
            onClick={() => setIndexOpen(true)}
            aria-haspopup="dialog"
          >
            <span>Sections</span>
          </button>
          <a
            className="header__link"
            href={profile.links.resumePdf}
            download={profile.links.resumePdf.split("/").pop()}
            aria-label="Download resume (PDF)"
          >
            <span className="header__label">Resume</span>
            <ArrowDownToLine size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
