// The theme image's pictures (scripts/cut-theme.mjs), offered at 2× and more of their size on the
// page, so they stay sharp when the page is zoomed. `sizes` asks for twice the displayed width.

/** A Najdi tower. The picture is the left one; the right is the same picture mirrored in CSS, and
 *  both are clipped to the traced outline (styles/theme-shapes.css). */
export function Tower({ side, className, priority = false }: { side: "left" | "right"; className: string; priority?: boolean }) {
  const sizes = "(min-width: 64em) 44vw, 48vw";
  return (
    <picture className="picture">
      <source type="image/avif" srcSet="/theme/tower-640.avif 640w, /theme/tower-1280.avif 1280w" sizes={sizes} />
      <source type="image/webp" srcSet="/theme/tower-640.webp 640w, /theme/tower-1280.webp 1280w" sizes={sizes} />
      <img
        className={`tower tower--${side} ${className}`}
        src="/theme/tower-1280.webp"
        width={1280}
        height={1588}
        alt=""
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}

/** The mountains and palm groves between the towers. */
export function Landscape({ className, priority = false }: { className: string; priority?: boolean }) {
  const sizes = "(min-width: 64em) 164vw, 200vw";
  return (
    <picture className="picture">
      <source type="image/avif" srcSet="/theme/landscape-2792.avif 2792w, /theme/landscape-4188.avif 4188w" sizes={sizes} />
      <source type="image/webp" srcSet="/theme/landscape-2792.webp 2792w, /theme/landscape-4188.webp 4188w" sizes={sizes} />
      <img className={className} src="/theme/landscape-2792.webp" width={2792} height={282} alt="" decoding="async" loading={priority ? "eager" : "lazy"} />
    </picture>
  );
}
