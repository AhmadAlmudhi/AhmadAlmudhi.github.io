import type { Metadata, Viewport } from "next";
import { Castoro } from "next/font/google";
import { preload } from "react-dom";
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

// The identity's typeface: Castoro (Tiro Typeworks, OFL), the closest match to the name in Ahmad's
// theme image. next/font downloads it at build and serves it from this site.
const castoro = Castoro({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-castoro",
  display: "swap",
});

const description = `${profile.title} in ${profile.location}. Flutter apps, web development and product ownership (PSPO I, PSM I).`;
const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: `${profile.fullName}` };

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

// One identity, one set of colours: no light and dark themes.
export const viewport: Viewport = {
  themeColor: "#dfcdb7",
  colorScheme: "light",
  viewportFit: "cover",
};

// Runs before the first paint: marks that scripting works, so motion may hide content before
// revealing it (without it, everything simply shows).
const bootScript = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The paper and the band are CSS backgrounds, found only once the stylesheet is parsed; the hero's
  // band is the first screen's largest paint, so both start loading with the HTML.
  preload("/theme/band.webp", { as: "image", fetchPriority: "high" });
  preload("/theme/paper.webp", { as: "image" });
  return (
    <html lang="en" className={castoro.variable}>
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
