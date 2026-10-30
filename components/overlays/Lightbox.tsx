"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Picture } from "@/components/ui/Picture";

export type LightboxItem = {
  key: string;
  /** A real image can be zoomed; a placeholder card cannot. */
  image?: { src: string; width: number; height: number; alt: string; tone?: string };
  node?: ReactNode;
  caption?: string;
};

type Point = { x: number; y: number };
const MAX_ZOOM = 4;

/**
 * PRJ-7 / CRT-2: full screen, swipe between items, pinch or double-tap to zoom, captions and a plain
 * "2 of 5" count; closes with a downward swipe, ✕, Esc, a backdrop tap or the Back button (the
 * caller owns history). Built on a native modal <dialog> and pointer events, no library.
 */
export function Lightbox({
  label,
  items,
  index,
  onIndex,
  onClose,
}: {
  label: string;
  items: LightboxItem[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [drag, setDrag] = useState({ dx: 0, dy: 0, active: false });
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<{ start: Point; startView: typeof view; pinchDist?: number; axis?: "x" | "y" } | null>(null);
  const lastTap = useRef(0);

  const item = items[index];
  const zoomable = !!item?.image;
  const count = items.length;

  // Open on mount; close on unmount (Back, ✕, Esc), so the browser returns focus to the opener.
  useLayoutEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    stage.current?.focus({ preventScroll: true });
    return () => d?.close();
  }, []);

  const go = useCallback(
    (step: number) => {
      const next = index + step;
      if (next < 0 || next >= count) return;
      setView({ scale: 1, x: 0, y: 0 });
      onIndex(next);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if ((e.key === "+" || e.key === "=") && zoomable) setView((v) => ({ ...v, scale: Math.min(MAX_ZOOM, v.scale * 1.5) }));
      else if (e.key === "-" && zoomable) setView((v) => (v.scale / 1.5 <= 1 ? { scale: 1, x: 0, y: 0 } : { ...v, scale: v.scale / 1.5 }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, zoomable]);

  const zoomAt = (p: Point, scale: number) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    const cx = p.x - (r.left + r.width / 2);
    const cy = p.y - (r.top + r.height / 2);
    setView((v) => {
      const s = Math.min(MAX_ZOOM, Math.max(1, scale));
      if (s === 1) return { scale: 1, x: 0, y: 0 };
      const k = s / v.scale;
      return { scale: s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 2 && zoomable) {
      gesture.current = { start: pts[0], startView: view, pinchDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) };
    } else if (pts.length === 1) {
      gesture.current = { start: { x: e.clientX, y: e.clientY }, startView: view };
      const now = performance.now();
      if (zoomable && now - lastTap.current < 280) {
        zoomAt({ x: e.clientX, y: e.clientY }, view.scale > 1 ? 1 : 2.5);
        lastTap.current = 0;
        gesture.current = null;
      } else lastTap.current = now;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const g = gesture.current;
    if (pts.length === 2 && g.pinchDist) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      zoomAt(mid, g.startView.scale * (dist / g.pinchDist));
      return;
    }
    const dx = e.clientX - g.start.x;
    const dy = e.clientY - g.start.y;
    if (view.scale > 1) {
      setView({ ...g.startView, x: g.startView.x + dx, y: g.startView.y + dy });
      return;
    }
    if (!g.axis && Math.hypot(dx, dy) > 8) g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (g.axis === "x") setDrag({ dx, dy: 0, active: true });
    if (g.axis === "y" && dy > 0) setDrag({ dx: 0, dy, active: true });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    if (pointers.current.size > 0) return;
    gesture.current = null;
    if (!g || view.scale > 1) return;
    const width = stage.current?.clientWidth ?? window.innerWidth;
    if (g.axis === "x" && Math.abs(drag.dx) > width * 0.18) go(drag.dx < 0 ? 1 : -1);
    if (g.axis === "y" && drag.dy > 120) onClose();
    setDrag({ dx: 0, dy: 0, active: false });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!zoomable || !e.ctrlKey) return; // trackpad pinch arrives as ctrl + wheel
    zoomAt({ x: e.clientX, y: e.clientY }, view.scale * (1 - e.deltaY * 0.01));
  };

  const fade = drag.dy > 0 ? Math.max(0.35, 1 - drag.dy / 400) : 1;
  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      style={{ "--fade": fade } as React.CSSProperties}
    >
      <div className="lightbox__top">
        <p className="lightbox__count" aria-live="polite">
          {index + 1} of {count}
        </p>
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
          <X size={24} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={stage}
        tabIndex={-1}
        aria-label={item?.image?.alt ?? item?.caption}
        className="lightbox__stage"
        data-dragging={drag.active}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClick={(e) => {
          if (e.target === e.currentTarget && view.scale === 1 && !drag.active) onClose();
        }}
      >
        <div
          className="lightbox__item"
          style={{
            transform: `translate(${drag.dx + view.x}px, ${drag.dy + view.y}px) scale(${view.scale})`,
          }}
        >
          {item?.image ? (
            // zooming in asks for a bigger file, so the picture sharpens instead of blurring
            <Picture
              {...item.image}
              sizes={`${Math.round(100 * Math.max(1, view.scale))}vw`}
              priority
              style={{ viewTransitionName: "overlay-shot" }}
            />
          ) : (
            <div className="lightbox__node" style={{ viewTransitionName: "overlay-shot" }}>
              {item?.node}
            </div>
          )}
        </div>
      </div>

      <div className="lightbox__foot">
        <button type="button" className="icon-button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">
          <ChevronLeft size={26} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <p className="lightbox__caption">{item?.caption}</p>
        <button type="button" className="icon-button" onClick={() => go(1)} disabled={index === count - 1} aria-label="Next">
          <ChevronRight size={26} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
