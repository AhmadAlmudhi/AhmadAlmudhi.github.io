"use client";

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNav, type Overlay } from "@/lib/nav";

/** The view-transition name the picture carries while it morphs into the open overlay (PRJ-5). */
export const MORPH = "overlay-shot";

/**
 * Opens an overlay, morphing `from` (the picture that was tapped) into the overlay's picture with
 * the browser's View Transitions. The name sits on exactly one element in each state, so the
 * browser can pair them. Without support, or with reduced motion, the overlay simply opens.
 */
export function useOpenOverlay() {
  const { openOverlay } = useNav();
  return useCallback(
    (overlay: Overlay, from: Element | null) => {
      const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduced || !(from instanceof HTMLElement)) {
        openOverlay(overlay);
        return;
      }
      from.style.viewTransitionName = MORPH;
      doc.startViewTransition(() => {
        from.style.viewTransitionName = "";
        flushSync(() => openOverlay(overlay));
      });
    },
    [openOverlay],
  );
}

export function useOpenProject() {
  const openOverlayWithMorph = useOpenOverlay();
  return useCallback(
    (slug: string, from: Element | null) => openOverlayWithMorph({ type: "project", slug }, from),
    [openOverlayWithMorph],
  );
}
