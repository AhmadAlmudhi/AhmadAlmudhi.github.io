"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { SectionId } from "@/content/schema";
import { sections } from "@/content";

// Navigation and history for the interview use case (PRD §5.2):
// - scrolling updates the hash with replaceState (no history spam, NAV-5);
// - tapping a nav item uses pushState, so Back returns to the previous section (NAV-5);
// - opening an overlay pushes an entry, so Back closes it instead of leaving the site (NAV-6);
// - deep links work on first load, overlays included (NAV-8);
// - J/K and 1–7 move between sections on desktop (NAV-10).
//
// The open overlay is derived from the URL hash, so the URL is the single source of truth.

export type Overlay =
  | { type: "project"; slug: string; shot?: number }
  | { type: "certificate"; id: string };

type NavState = {
  active: SectionId;
  index: number;
  overlay: Overlay | null;
  goTo: (id: SectionId) => void;
  goNext: () => void;
  goPrev: () => void;
  openOverlay: (overlay: Overlay) => void;
  replaceOverlay: (overlay: Overlay) => void;
  closeOverlay: () => void;
  indexOpen: boolean;
  setIndexOpen: (open: boolean) => void;
};

const NavContext = createContext<NavState | null>(null);

const ids = sections.map((s) => s.id);
const OVERLAY_KEY = "overlay";

function overlayHash(o: Overlay) {
  if (o.type === "project") return `#projects/${o.slug}${o.shot ? `/${o.shot}` : ""}`;
  return `#certifications/${o.id}`;
}

export function parseHash(hash: string): { section: SectionId | null; overlay: Overlay | null } {
  const [first, second, third] = hash.replace(/^#/, "").split("/");
  const section = (ids as string[]).includes(first) ? (first as SectionId) : null;
  if (section === "projects" && second) {
    const shot = Number(third);
    return { section, overlay: { type: "project", slug: second, shot: shot > 0 ? shot : undefined } };
  }
  if (section === "certifications" && second) return { section, overlay: { type: "certificate", id: second } };
  return { section, overlay: null };
}

// A tiny store over the URL hash. pushState/replaceState fire no events, so changes we make
// ourselves call `emit()`; Back and Forward arrive as popstate.
const listeners = new Set<() => void>();
function subscribeHash(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}
function emit() {
  listeners.forEach((l) => l());
}
const overlayOpen = () => !!parseHash(location.hash).overlay;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToSection(id: SectionId, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: smooth && !reducedMotion() ? "smooth" : "auto", block: "start" });
  // Move focus for keyboard and screen-reader users without a second jump.
  const heading = el.querySelector<HTMLElement>("h1, h2");
  heading?.setAttribute("tabindex", "-1");
  heading?.focus({ preventScroll: true });
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<SectionId>(ids[0]);
  const [indexOpen, setIndexOpen] = useState(false);
  const hash = useSyncExternalStore(subscribeHash, () => location.hash, () => "");
  const overlay = useMemo(() => parseHash(hash).overlay, [hash]);

  // Active section: whichever section crosses a band just above the middle of the viewport.
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as SectionId;
          setActive(id);
          if (!overlayOpen() && parseHash(location.hash).section !== id) {
            history.replaceState(history.state, "", `#${id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Deep links on first load, and the Back/Forward buttons afterwards.
  useEffect(() => {
    const initial = parseHash(location.hash);
    if (initial.overlay && initial.section) {
      // Give the overlay a base entry to return to, so closing it never leaves the site.
      const target = location.hash;
      history.replaceState(null, "", `#${initial.section}`);
      history.pushState({ [OVERLAY_KEY]: true }, "", target);
      scrollToSection(initial.section, false);
    }

    let wasOpen = !!initial.overlay;
    const onPop = () => {
      const next = parseHash(location.hash);
      // Closing an overlay returns to where the reader was; only plain section changes scroll.
      if (!next.overlay && !wasOpen) {
        if (next.section) scrollToSection(next.section, true);
        else if (!location.hash) window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
      }
      wasOpen = !!next.overlay;
    };
    const onEmit = () => {
      wasOpen = overlayOpen();
    };
    listeners.add(onEmit);
    window.addEventListener("popstate", onPop);
    return () => {
      listeners.delete(onEmit);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const goTo = useCallback((id: SectionId) => {
    history.pushState({ section: id }, "", `#${id}`);
    emit();
    setActive(id);
    scrollToSection(id, true);
  }, []);

  const index = ids.indexOf(active);
  const goNext = useCallback(() => {
    const i = ids.indexOf(active);
    if (i < ids.length - 1) goTo(ids[i + 1]);
  }, [active, goTo]);
  const goPrev = useCallback(() => {
    const i = ids.indexOf(active);
    if (i > 0) goTo(ids[i - 1]);
  }, [active, goTo]);

  // Each level (detail, then its lightbox) is one history entry, so Back steps out one level.
  const openOverlay = useCallback((next: Overlay) => {
    history.pushState({ [OVERLAY_KEY]: true }, "", overlayHash(next));
    emit();
  }, []);

  // Moving within a level (swiping to the next screenshot) replaces the entry instead.
  const replaceOverlay = useCallback((next: Overlay) => {
    history.replaceState({ [OVERLAY_KEY]: true }, "", overlayHash(next));
    emit();
  }, []);

  const closeOverlay = useCallback(() => {
    if (history.state?.[OVERLAY_KEY]) {
      history.back();
    } else {
      const base = parseHash(location.hash).section;
      history.replaceState(null, "", base ? `#${base}` : location.pathname);
      emit();
    }
  }, []);

  // Keyboard shortcuts on desktop (NAV-10). Esc is handled by each dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || overlayOpen()) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable], dialog")) return;
      if (e.key === "j") goNext();
      else if (e.key === "k") goPrev();
      else if (/^[1-9]$/.test(e.key) && Number(e.key) <= ids.length) goTo(ids[Number(e.key) - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo]);

  const value = useMemo(
    () => ({
      active,
      index,
      overlay,
      goTo,
      goNext,
      goPrev,
      openOverlay,
      replaceOverlay,
      closeOverlay,
      indexOpen,
      setIndexOpen,
    }),
    [active, index, overlay, goTo, goNext, goPrev, openOverlay, replaceOverlay, closeOverlay, indexOpen],
  );
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside <NavProvider>");
  return ctx;
}
