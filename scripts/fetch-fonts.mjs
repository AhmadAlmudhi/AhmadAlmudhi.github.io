// Downloads the official Clash Grotesk webfonts from Fontshare into app/fonts/.
//
// The ITF Free Font License lets us self-host the fonts on our own site but forbids distributing
// them through a repository, so the files are gitignored and fetched before `dev` and `build`.
// Runs `unzip`, which ships with macOS and the GitHub Actions Ubuntu runners.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, copyFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ZIP_URL = "https://api.fontshare.com/v2/fonts/download/clash-grotesk";
const OUT_DIR = join(import.meta.dirname, "..", "app", "fonts");
// woff2 for the page; ttf for next/og, which renders the link-preview image and the icons at build.
const FILES = [
  "ClashGrotesk-Regular.woff2",
  "ClashGrotesk-Medium.woff2",
  "ClashGrotesk-Regular.ttf",
  "ClashGrotesk-Medium.ttf",
];

if (FILES.every((file) => existsSync(join(OUT_DIR, file)))) process.exit(0);

const work = mkdtempSync(join(tmpdir(), "clash-grotesk-"));
try {
  const res = await fetch(ZIP_URL);
  if (!res.ok) throw new Error(`Fontshare answered ${res.status} for ${ZIP_URL}`);
  const zip = join(work, "clash-grotesk.zip");
  writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
  execFileSync("unzip", ["-q", "-o", zip, "-d", work]);

  mkdirSync(OUT_DIR, { recursive: true });
  const webDir = join(work, "ClashGrotesk_Complete", "Fonts", "WEB", "fonts");
  for (const file of FILES) copyFileSync(join(webDir, file), join(OUT_DIR, file));
  console.log(`Fetched ${FILES.join(", ")} into app/fonts/`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
