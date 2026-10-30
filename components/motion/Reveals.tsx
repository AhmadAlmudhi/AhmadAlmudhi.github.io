"use client";

import { useEffect } from "react";

/**
 * Section entrances (PRD §8): the parts of each section arrive in reading order, 70ms apart, every
 * time they come into view, from below when scrolling down and from above when scrolling up. Once
 * a part has left the screen it resets, out of sight, ready to arrive again. styles/motion.css says
 * how each part moves; this only says when.
 *
 * GROUPS lists what arrives together. Nothing is hidden before this runs: everything already on
 * screen is marked as arrived first, then `html.reveal` is set, which is what lets the CSS hide the
 * rest. No script or reduced motion: the content is simply there.
 */
const GROUPS = [
  ".section-head",
  ".role",
  ".card__media, .card__text",
  ".skill-group",
  ".school",
  ".cert",
  ".contact__lead, .contact__email, .contact__actions li, .contact__links li",
  ".footer__sign",
];

export function Reveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    for (const selector of GROUPS) {
      const byParent = new Map<Element | null, number>();
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const i = byParent.get(el.parentElement) ?? 0;
        byParent.set(el.parentElement, i + 1);
        el.style.setProperty("--i", String(Math.min(i, 3)));
        targets.push(el);
      });
    }

    // what the visitor can already see has arrived; only the rest waits
    for (const el of targets) {
      const r = el.getBoundingClientRect();
      el.dataset.reveal = r.top < window.innerHeight && r.bottom > 0 ? "in" : "below";
    }
    document.documentElement.classList.add("reveal");

    // A part waiting off screen sits 2.5rem further out, so the screen is watched with a 3rem margin:
    // a part starts arriving as it reaches the edge (never leaving a blank strip there), and resets
    // only once it is well out of sight.
    const io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          (target as HTMLElement).dataset.reveal = isIntersecting ? "in" : boundingClientRect.top < 0 ? "above" : "below";
        }
      },
      { rootMargin: "48px 0px" },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
