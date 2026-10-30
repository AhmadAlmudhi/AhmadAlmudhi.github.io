"use client";

import { useEffect } from "react";

/**
 * Section entrances (design-taste-frontend motion.md §6, PRD §8): the parts of each section arrive in
 * reading order, rising once as they enter, 70ms apart, four steps at most per sequence.
 *
 * The choreography lives here, not in the markup: GROUPS lists what arrives together. Nothing is
 * hidden before this runs — first it marks everything already on screen as shown, then it sets
 * `html.reveal`, which is what lets the CSS hide the rest until it scrolls in. No script, reduced
 * motion, or a missed observer: the content is simply there.
 */
const GROUPS = [
  ".stats__title, .tile",
  ".section-head, .skills__word, .projects__title",
  ".lens",
  ".role",
  ".projects__row",
  ".card",
  ".bar",
  ".letter > *, .education .mobile-picture",
  ".cert",
  ".contact__lead, .contact__actions li, .contact__email",
  ".footer__name",
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

    const done = (el: HTMLElement) => {
      el.removeAttribute("data-reveal");
      el.classList.remove("is-in");
      el.style.removeProperty("--i");
    };
    const show = (el: HTMLElement) => {
      el.classList.add("is-in");
      el.addEventListener("transitionend", (e) => e.target === el && e.propertyName === "translate" && done(el));
      window.setTimeout(() => done(el), 2400); // never leave a reveal half-finished
    };

    // Whatever the visitor can already see stays as it is; only what lies below waits.
    const fold = window.innerHeight * 0.92;
    for (const el of targets) {
      if (el.getBoundingClientRect().top < fold) continue;
      el.setAttribute("data-reveal", "");
    }
    document.documentElement.classList.add("reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          show(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    // Deep links and overlays jump; anything that ends up in view without crossing the band shows.
    const sweep = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      });
    const late = window.setTimeout(sweep, 1500);
    window.addEventListener("hashchange", sweep);
    return () => {
      io.disconnect();
      window.clearTimeout(late);
      window.removeEventListener("hashchange", sweep);
    };
  }, []);

  return null;
}
