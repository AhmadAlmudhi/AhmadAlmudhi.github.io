// PRD §10.1: the JavaScript a modern browser loads up front stays within 150 KB gzipped. Counts the
// scripts out/index.html loads, minus `noModule` ones (legacy polyfills modern browsers never fetch).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET_KB = 150;
const out = join(import.meta.dirname, "..", "out");
const html = readFileSync(join(out, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="(\/_next\/[^"]+\.js)"[^>]*>/g)]
  .filter((m) => !/\bnoModule\b/i.test(m[0]))
  .map((m) => m[1]);
const kb = [...new Set(scripts)].reduce((sum, src) => sum + gzipSync(readFileSync(join(out, src))).length, 0) / 1024;
console.log(`Initial JS: ${kb.toFixed(1)} KB gzipped (budget ${BUDGET_KB} KB)`);
if (kb > BUDGET_KB) process.exit(1);
