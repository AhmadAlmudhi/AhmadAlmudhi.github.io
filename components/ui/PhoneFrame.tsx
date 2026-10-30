import type { ReactNode } from "react";

/**
 * PRJ-2: mobile-app screenshots sit in a plain rounded rectangle drawn in CSS — no notch, buttons,
 * glare or shadow. The one rounded shape on a square page.
 */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">{children}</div>
    </div>
  );
}
