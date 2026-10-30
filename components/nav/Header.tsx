"use client";

import { ArrowDownToLine } from "lucide-react";
import { profile } from "@/content";
import { useNav } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";

// NAV-3: name (back to top), the section index on desktop, the resume PDF and the theme toggle.
export function Header() {
  const { setIndexOpen } = useNav();
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
          <span className="monogram" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="wordmark__name">{profile.fullName}</span>
        </a>
        <nav className="header__actions" aria-label="Site">
          <button type="button" className="header__link header__sections" onClick={() => setIndexOpen(true)}>
            <span>Sections</span>
          </button>
          <a
            className="header__link"
            href={profile.links.resumePdf}
            download={profile.links.resumePdf.split("/").pop()}
          >
            <span>Resume</span>
            <ArrowDownToLine size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
