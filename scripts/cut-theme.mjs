// Cuts the identity's pictures out of Ahmad's theme image (docs/content_files/my_theme.png) into
// public/theme/: the two Najdi mud-brick towers on transparent ground, the landscape strip and the
// green band's texture, plus the link-preview image. Run once when the theme image changes: `node scripts/cut-theme.mjs`.

import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "docs", "content_files", "my_theme.png");
const OUT = join(ROOT, "public", "theme");
mkdirSync(OUT, { recursive: true });

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const W = info.width, C = info.channels;
const px = (x, y) => { const i = (y * W + x) * C; return [data[i], data[i + 1], data[i + 2]]; };
const lum = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b;
// measured: brick has luminance 123–161 and red − blue 71–82; the lattice and paper are lighter and greyer
const brick = (p) => p[0] - p[2] > 64 && lum(p) < 172;

// The tower's top, traced by hand (image px): parapet blocks, then the spire whose sunlit right face
// slants from (124, 228) to (142, 389). Below that row the computed edge below takes over.
const TRACED_UNTIL = 392;
const spireEdge = (y) => Math.round(124 + ((142 - 124) * (y - 228)) / (389 - 228));
// [from x, to x, top y]: the parapet blocks left to right, then the spire
const BLOCKS = [
  [0, 20, 278],
  [20, 52, 290],
  [52, 76, 276],
  [76, 98, 251],
];
function tracedOpaque(x, y) {
  if (x >= 98) return y >= 228 && x <= spireEdge(y);
  return BLOCKS.some(([from, to, top]) => x >= from && x < to && y >= top);
}

// A tower's silhouette, row by row: out to its furthest brick run, then across the sunlit step face
// (luminance ≥ 203, the paper beside it is ≤ 200). outward = +1 when the steps descend to the right.
async function tower(name, xFrom, xTo, top, bottom, outward) {
  const width = xTo - xFrom, height = bottom - top;
  const at = (i, y) => px(outward > 0 ? xFrom + i : xTo - 1 - i, top + y);
  // a row's edge: the furthest brick pixel with the row mostly brick up to it (windows and vents
  // don't break it; stray lattice pixels out in the paper can't reach it)
  const raw = [];
  for (let y = 0; y < height; y++) {
    let count = 0, edge = -1;
    for (let i = 0; i < width; i++) {
      if (brick(at(i, y))) { count++; if (count / (i + 1) >= 0.55 && count >= 8) edge = i; }
    }
    raw.push(edge);
  }
  // smooth single-row noise with a vertical median of nine rows
  const edges = raw.map((_, y) => {
    const win = raw.slice(Math.max(0, y - 4), y + 5).sort((a, b) => a - b);
    return win[Math.floor(win.length / 2)];
  });
  for (let y = 0; y < height; y++) {
    if (edges[y] < 0) continue;
    let lit = edges[y], gap = 0;
    for (let i = edges[y] + 1; i < Math.min(width, edges[y] + 26); i++) {
      if (lum(at(i, y)) >= 203) { lit = i; gap = 0; } else if (++gap > 2) break;
    }
    edges[y] = lit;
  }
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) for (let j = 0; j < width; j++) {
    const i = outward > 0 ? j : width - 1 - j, o = (y * width + j) * 4;
    const [r, g, b] = px(xFrom + j, top + y);
    out[o] = r; out[o + 1] = g; out[o + 2] = b;
    if (top + y < TRACED_UNTIL) {
      out[o + 3] = tracedOpaque(xFrom + j, top + y) ? 255 : 0;
      continue;
    }
    const beyond = edges[y] < 0 ? 1e9 : i - edges[y];
    out[o + 3] = beyond <= 0 ? 255 : beyond >= 2 ? 0 : 128;
  }
  await sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(join(OUT, `${name}.png`));
}

await tower("tower-left", 0, 320, 222, 619, +1);
// the composition is symmetrical: the right tower is the left one mirrored; both as WebP with alpha
const left = await sharp(join(OUT, "tower-left.png")).toBuffer();
await sharp(left).webp({ quality: 84, alphaQuality: 90 }).toFile(join(OUT, "tower-left.webp"));
await sharp(left).flop().webp({ quality: 84, alphaQuality: 90 }).toFile(join(OUT, "tower-right.webp"));
rmSync(join(OUT, "tower-left.png"));

// the link-preview image: the centre of the theme image itself, name and all (1200 × 630)
await sharp(SRC).extract({ left: 330, top: 18, width: 1396, height: 731 }).resize({ width: 1200, height: 630, fit: "cover" }).jpeg({ quality: 84, mozjpeg: true }).toFile(join(ROOT, "public", "og.jpg"));
// the mountains and palm groves between the towers, and the green band's own texture
await sharp(SRC).extract({ left: 330, top: 478, width: 1396, height: 141 }).webp({ quality: 82 }).toFile(join(OUT, "landscape.webp"));
await sharp(SRC).extract({ left: 0, top: 636, width: 2056, height: 66 }).webp({ quality: 80 }).toFile(join(OUT, "band.webp"));
console.log("Cut the theme pictures into public/theme/");

// The page's paper: a seamless grain tile in the theme's parchment (#dfcdb7), ±a few levels, softened.
{
  const size = 320, paper = [0xdf, 0xcd, 0xb7];
  const raw = Buffer.alloc(size * size * 3);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < size * size; i++) {
    const n = (rand() + rand() + rand() - 1.5) * 9; // roughly gaussian
    for (let c = 0; c < 3; c++) raw[i * 3 + c] = Math.max(0, Math.min(255, Math.round(paper[c] + n)));
  }
  await sharp(raw, { raw: { width: size, height: size, channels: 3 } }).blur(0.45).webp({ quality: 70 }).toFile(join(OUT, "paper.webp"));
}
