// PRD §10.1/§13.1: GitHub Pages has no image optimizer, so this writes AVIF and WebP copies of every
// picture at the widths the page asks for into public/opt/ (gitignored), before `dev` and `build`.
// components/ui/Picture.tsx builds the matching srcset from the same widths. Skips work already done.
// It also prints each picture's average colour, used as its ground while it loads (content/*.ts `tone`).

import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..", "public");
const OUT = join(ROOT, "opt");
const SOURCES = ["certificates"];
// Keep in step with WIDTHS in components/ui/Picture.tsx.
const WIDTHS = [640, 1024, 1600, 2400];

mkdirSync(OUT, { recursive: true });
let written = 0;

for (const dir of SOURCES) {
  for (const file of readdirSync(join(ROOT, dir))) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const src = join(ROOT, dir, file);
    const name = basename(file, extname(file));
    const meta = await sharp(src).metadata();
    const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width);
    for (const w of widths) {
      for (const format of ["avif", "webp"]) {
        const dest = join(OUT, `${name}-${w}.${format}`);
        if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) continue;
        const pipeline = sharp(src).resize({ width: w, withoutEnlargement: true });
        await (format === "avif" ? pipeline.avif({ quality: 52, effort: 4 }) : pipeline.webp({ quality: 78 })).toFile(dest);
        written++;
      }
    }
    if (process.argv.includes("--tones")) {
      const { channels } = await sharp(src).stats();
      const hex = channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, "0")).join("");
      console.log(`${dir}/${file}: tone #${hex}, ${meta.width}×${meta.height}`);
    }
  }
}
if (written) console.log(`Optimized ${written} image file(s) into public/opt/`);
