// Serves the static export in out/ the way GitHub Pages does: /path/ → /path/index.html, unknown
// paths → 404.html with status 404. Zero dependencies. `npm start`, and the Playwright web server.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = join(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".vcf": "text/vcard",
};

async function file(path) {
  try {
    const s = await stat(path);
    if (s.isDirectory()) return file(join(path, "index.html"));
    return { path, body: await readFile(path) };
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const safe = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const found = await file(join(ROOT, safe));
  if (found) {
    res.writeHead(200, { "content-type": TYPES[extname(found.path)] ?? "application/octet-stream" });
    res.end(found.body);
    return;
  }
  const notFound = await file(join(ROOT, "404.html"));
  res.writeHead(404, { "content-type": TYPES[".html"] });
  res.end(notFound?.body ?? "Not found");
}).listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}`));
