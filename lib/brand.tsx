import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Brand images rendered at build by next/og, served as real .png files (route folders named
// `*.png` with force-static), so link-preview crawlers get an image content type on GitHub Pages.
// Clash Grotesk's TTFs are fetched with the woff2s by scripts/fetch-fonts.mjs (gitignored).

const ORANGE = "#ff7a1f";
const INK = "#050f16";

async function fonts() {
  const dir = join(process.cwd(), "app", "fonts");
  const [regular, medium] = await Promise.all([
    readFile(join(dir, "ClashGrotesk-Regular.ttf")),
    readFile(join(dir, "ClashGrotesk-Medium.ttf")),
  ]);
  return [
    { name: "Clash Grotesk", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Clash Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
  ];
}

/** The monogram on its square: the favicon, the app icons. `inset` leaves the maskable safe zone. */
export async function monogram(size: number, inset = 0) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: inset ? ORANGE : INK,
          padding: inset,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: INK,
            color: ORANGE,
            fontFamily: "Clash Grotesk",
            fontWeight: 500,
            fontSize: (size - inset * 2) * 0.42,
            letterSpacing: "0.02em",
          }}
        >
          {profile.initials}
        </div>
      </div>
    ),
    { width: size, height: size, fonts: await fonts() },
  );
}

/** The link-preview image (1200 × 630): the page's split, the name on orange, 2 → 1 on the stage. */
export async function socialCard() {
  const [figure] = profile.stats;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: ORANGE, fontFamily: "Clash Grotesk", color: INK }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 740, padding: "64px 0 56px 64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: INK,
              color: ORANGE,
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.95, letterSpacing: "-0.035em" }}>
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 34, fontWeight: 500, lineHeight: 1.25, maxWidth: 620 }}>
              {`${profile.title} in ${profile.location.split(",")[0]}. ${profile.tagline}`}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26 }}>{profile.siteUrl.replace("https://", "")}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            margin: "40px 40px 40px 0",
            padding: 40,
            background: INK,
            color: ORANGE,
          }}
        >
          <div style={{ display: "flex", fontSize: 120, letterSpacing: "-0.035em", lineHeight: 1 }}>{figure.value}</div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.25 }}>{figure.label}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await fonts() },
  );
}
