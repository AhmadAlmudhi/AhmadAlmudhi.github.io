// GLB-4: the service worker written into out/ after `next build` (npm "postbuild"). One visit online
// and the site works in airplane mode: pages, scripts, styles, the font, the resume PDF, the icons
// the theme's pictures and every AVIF picture a phone can use (under 2500 px wide) are precached; anything else seen online (WebP or original fallbacks) is
// cached as it loads.
module.exports = {
  globDirectory: "out/",
  globPatterns: ["**/*.{html,txt,js,css,woff2,pdf,webmanifest}", "opt/*.avif", "theme/*.{avif,svg}", "{favicon,icon-192,icon-512,apple-touch-icon}.png"],
  // pictures 2500 px wide and more serve only large desktop screens, which are online: cached when seen
  // and the 640 px ones serve low-density screens only (a phone asks for 1024 px and up)
  globIgnores: ["sw.js", "404/**", "opt/*-640.avif", "opt/*-2[5-9][0-9][0-9].avif", "opt/*-[3-9][0-9][0-9][0-9].avif"],
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
