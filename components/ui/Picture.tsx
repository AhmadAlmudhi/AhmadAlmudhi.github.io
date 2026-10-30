import type { CSSProperties } from "react";

// Keep in step with WIDTHS in scripts/optimize-images.mjs, which writes /opt/<name>-<width>.<avif|webp>.
const WIDTHS = [640, 1024, 1600, 2400];

/**
 * A responsive picture (PRD §10.1): AVIF, then WebP, at the widths the optimizer wrote, with the
 * original as the fallback. `tone` (the picture's average colour) is its ground while it loads, so a
 * slow image opens on its own colour rather than a blank box.
 */
export function Picture({
  src,
  width,
  height,
  alt,
  sizes,
  tone,
  priority = false,
  className,
  style,
  ...rest
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  tone?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
} & Record<`data-${string}`, string>) {
  const name = src.split("/").pop()!.replace(/\.[^.]+$/, "");
  const widths = WIDTHS.filter((w) => w < width).concat(width);
  const set = (ext: string) => widths.map((w) => `/opt/${name}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className="picture">
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        className={className}
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
        style={{ backgroundColor: tone, ...style }}
        {...rest}
      />
    </picture>
  );
}
