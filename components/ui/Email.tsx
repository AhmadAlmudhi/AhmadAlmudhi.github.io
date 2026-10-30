"use client";

import { profile } from "@/content";
import { useHydrated } from "@/lib/client";

export const emailAddress = () => `${profile.email.user}@${profile.email.domain}`;

/**
 * PRD §10.4: the address never appears whole in the static HTML. The server renders its two halves
 * with the "@" drawn by CSS; the browser joins them into a real mailto link after hydration.
 * The halves stay in their own spans, so a display setting can break the line after the "@".
 */
export function Email({ className = "", subject }: { className?: string; subject?: string }) {
  const { user, domain } = profile.email;
  const ready = useHydrated();
  const href = `mailto:${emailAddress()}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a className={`email ${className}`} href={ready ? href : "#contact"} aria-label={ready ? emailAddress() : undefined}>
      <span className="email__user">
        {user}
        {ready ? "@" : <span className="email__at" />}
      </span>
      <span className="email__domain">{domain}</span>
    </a>
  );
}
