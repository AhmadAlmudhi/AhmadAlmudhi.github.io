"use client";

import { useEffect } from "react";
import { profile, sections } from "@/content";

type Counter = { count: (e: { path: string; title?: string; event?: boolean }) => void };

/**
 * GLB-5/6: privacy-friendly analytics, off until `profile.analytics` names a GoatCounter site (no
 * cookies, no personal data). Counts visits, resume downloads, outbound links, each section's first
 * view, and the `?ref=<company>` tag on a link sent to a recruiter. The CSP in the layout opens to
 * GoatCounter only when this is configured.
 */
export function Analytics() {
  useEffect(() => {
    const config = profile.analytics;
    if (!config || process.env.NODE_ENV !== "production") return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${config.code}.goatcounter.com/count`;
    document.head.append(script);

    const event = (path: string, title?: string) =>
      (window as unknown as { goatcounter?: Counter }).goatcounter?.count({ path, title, event: true });

    const ref = new URLSearchParams(location.search).get("ref");
    if (ref) script.addEventListener("load", () => event(`ref/${ref.slice(0, 60)}`, "Opened from a shared link"));

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a) return;
      if (a.hasAttribute("download")) event("resume-download", "Resume PDF");
      else if (a.host && a.host !== location.host) event(`outbound/${a.host}`, a.textContent?.trim());
    };
    document.addEventListener("click", onClick);

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          event(`section/${id}`, `Viewed ${id}`);
        }
      },
      { threshold: 0.35 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    return () => {
      document.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, []);
  return null;
}
