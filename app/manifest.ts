import type { MetadataRoute } from "next";
import { profile } from "@/content";

export const dynamic = "force-static";

// GLB-4: installable, with the identity's eight-point star as its icon. Offline support comes from the service worker
// that scripts/generate-sw.mjs writes into out/ after the build.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.fullName}, ${profile.title}`,
    short_name: profile.fullName,
    description: `${profile.title} in ${profile.location}.`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#dfcdb7",
    theme_color: "#1c2c23",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
