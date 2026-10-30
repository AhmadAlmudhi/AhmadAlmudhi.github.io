import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/content";
import { NavProvider } from "@/lib/nav";
import { Header } from "@/components/nav/Header";
import { Dock } from "@/components/nav/Dock";
import { IndexSheet } from "@/components/nav/IndexSheet";
import { Toaster } from "@/components/ui/Toast";
import { Overlays } from "@/components/overlays/Overlays";
import { Reveals } from "@/components/motion/Reveals";
import { ServiceWorker } from "@/components/pwa/ServiceWorker";
import { Analytics } from "@/components/pwa/Analytics";
import "./globals.css";

// Clash Grotesk, self-hosted (fetched by scripts/fetch-fonts.mjs; see .gitignore for why).
const clash = localFont({
  src: [
    { path: "./fonts/ClashGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashGrotesk-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const description = `${profile.title} in ${profile.location}. Flutter apps, web development and product ownership (PSPO I, PSM I).`;
const ogImage = { url: "/og.png", width: 1200, height: 630, alt: `${profile.fullName}, ${profile.title}` };

// PRD §10.4: GitHub Pages sends no custom headers, so the policy rides in a <meta> tag. Next's static
// export inlines its bootstrap scripts, hence 'unsafe-inline' for scripts; everything loads from
// this origin. Production only: the dev server needs eval and a websocket.
const counter = profile.analytics ? ` https://gc.zgo.at https://${profile.analytics.code}.goatcounter.com` : "";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${counter}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${counter}`,
  "font-src 'self'",
  `connect-src 'self'${counter}`,
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.fullName} — ${profile.title}`,
  description,
  alternates: { canonical: "/" },
  // Link-only site: never indexed, but crawlable so link previews work (PRD §10.3).
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "profile",
    images: [ogImage],
    url: "/",
    siteName: profile.fullName,
    title: `${profile.fullName} — ${profile.title}`,
    description,
    firstName: profile.firstName,
    lastName: profile.lastName,
  },
  twitter: { card: "summary_large_image", title: `${profile.fullName} — ${profile.title}`, description, images: [ogImage] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff7a1f" },
    { media: "(prefers-color-scheme: dark)", color: "#050f16" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

// Runs before the first paint: picks the saved or system theme so the wrong one never flashes
// (GLB-1), and marks that scripting works so motion may hide content before revealing it.
// `?theme=light|dark` forces a theme for that view only (design QA screenshots).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=new URLSearchParams(location.search).get('theme');var s=q||localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;var c=t==='dark'?'#050f16':'#ff7a1f';document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute('content',c)})}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clash.variable} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavProvider>
          <Header />
          {children}
          <Dock />
          <IndexSheet />
          <Overlays />
          <Reveals />
          <ServiceWorker />
          <Analytics />
          <Toaster />
        </NavProvider>
      </body>
    </html>
  );
}
