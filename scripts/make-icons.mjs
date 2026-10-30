// The site's icons: the eight-point star from the theme's dividers, gold on the theme's green.
// Run once when the identity changes: `node scripts/make-icons.mjs` (writes into public/).

import { join } from "node:path";
import sharp from "sharp";

const OUT = join(import.meta.dirname, "..", "public");
const GREEN = "#1c2c23";
const GOLD = "#c9a24f";

// two squares turned 45° make the star; a smaller pair inside it makes the rosette
const star = (stroke) => `
  <g fill="none" stroke="${GOLD}" stroke-width="${stroke}" stroke-linejoin="miter">
    <rect x="22" y="22" width="56" height="56"/>
    <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)"/>
    <rect x="36" y="36" width="28" height="28"/>
    <rect x="36" y="36" width="28" height="28" transform="rotate(45 50 50)"/>
  </g>`;

async function icon(file, size, { scale = 0.86, stroke = 4.5 } = {}) {
  const pad = (100 - 100 * scale) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="${GREEN}"/>
    <g transform="translate(${pad} ${pad}) scale(${scale})">${star(stroke)}</g>
  </svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(OUT, file));
}

await icon("favicon.png", 48, { scale: 1.02, stroke: 7 });
await icon("apple-touch-icon.png", 180);
await icon("icon-192.png", 192);
await icon("icon-512.png", 512);
await icon("icon-maskable.png", 512, { scale: 0.66 }); // inside the maskable safe zone
console.log("Wrote the icons into public/");
