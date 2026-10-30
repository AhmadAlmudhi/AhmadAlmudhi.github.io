import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves the static `out/` folder (PRD §13.4).
  // Don't add cacheComponents / partialPrefetching: PPR fails in export mode.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // pre-optimized by scripts/optimize-images.mjs
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
