"use client";

import type { ReactNode } from "react";
import { profile } from "@/content";
import { useHydrated } from "@/lib/client";

export const emailAddress = () => `${profile.email.user}@${profile.email.domain}`;

/**
 * PRD §10.4: the address never appears whole in the static HTML. The server renders its two halves
 * with the "@" drawn by CSS; the browser joins them into a real mailto link after hydration.
 * With a `label`, the link shows that word instead of the address.
 */
export function Email({
  className = "",
  subject,
  label,
  icon,
}: {
  className?: string;
  subject?: string;
  label?: string;
  icon?: ReactNode;
}) {
  const { user, domain } = profile.email;
  const ready = useHydrated();
  const href = `mailto:${emailAddress()}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a className={`email ${className}`} href={ready ? href : "#contact"} aria-label={ready ? `Email ${emailAddress()}` : undefined}>
      {icon}
      {label ? (
        <span>{label}</span>
      ) : (
        <span className="email__address">
          <span className="email__user">
            {user}
            {ready ? "@" : <span className="email__at" />}
          </span>
          <span className="email__domain">{domain}</span>
        </span>
      )}
    </a>
  );
}
