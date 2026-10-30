// GLB-4: the service worker written into out/ after `next build` (npm "postbuild"). One visit online
// and the site works in airplane mode: pages, scripts, styles, the font, the resume PDF, the icons
// and every AVIF picture are precached; anything else seen online (WebP or original fallbacks) is
// cached as it loads.
module.exports = {
  globDirectory: "out/",
  globPatterns: ["**/*.{html,txt,js,css,woff2,pdf,webmanifest}", "opt/*.avif", "theme/*.webp", "{favicon,icon-192,icon-512,apple-touch-icon}.png"],
  globIgnores: ["sw.js", "404/**"],
  swDest: "out/sw.js",
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
  // ?theme= (design QA) and ?ref= (recruiter links) don't change the page
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^theme$/, /^ref$/],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  inlineWorkboxRuntime: true,
  sourcemap: false,
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: { cacheName: "images", expiration: { maxEntries: 80 } },
    },
  ],
};
