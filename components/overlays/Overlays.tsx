"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { useNav } from "@/lib/nav";

// The detail and lightbox code is only needed after a tap, so it stays out of the initial JS budget
// (PRD §10.1): it loads once the page is idle, well before anyone can open a project, and mounts
// straight away if the page was opened on an overlay's deep link.
const OverlaysImpl = lazy(() => import("./OverlaysImpl"));

export function Overlays() {
  const { overlay } = useNav();
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const start = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!idle && !overlay) return null;
  return (
    <Suspense fallback={null}>
      <OverlaysImpl />
    </Suspense>
  );
}
