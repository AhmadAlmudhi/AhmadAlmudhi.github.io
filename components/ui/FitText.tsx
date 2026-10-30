"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets one line of display type so it runs exactly from margin to margin (layout.md §5: fitted by
 * measurement, never by a size guessed for one face). Below `below`, CSS sizes it instead.
 */
export function FitText({ children, className = "", below = "40em" }: { children: ReactNode; className?: string; below?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const narrow = window.matchMedia(`(max-width: ${below})`);
    const fit = () => {
      if (narrow.matches) {
        el.style.fontSize = "";
        return;
      }
      el.style.fontSize = "100px";
      const natural = el.scrollWidth;
      if (natural) el.style.fontSize = `${Math.floor((98 * box.clientWidth) / natural)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    narrow.addEventListener("change", fit);
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);
    const late = window.setTimeout(fit, 800); // after hydration swaps the email's halves for text
    return () => {
      ro.disconnect();
      narrow.removeEventListener("change", fit);
      document.fonts?.removeEventListener("loadingdone", fit);
      window.clearTimeout(late);
    };
  }, [below]);

  return (
    <span ref={ref} className={`fit ${className}`}>
      {children}
    </span>
  );
}
