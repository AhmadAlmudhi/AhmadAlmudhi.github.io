import type { Project } from "./schema";

// The projects (PRJ-1..12). For now only Battuta, Ahmad's own app; more come later. Every word is
// taken from the project's README and requirements document (github.com/AhmadAlmudhi/Battuta) and
// listed in docs/resume-content.md for Ahmad to confirm. The screenshots were taken in the live web
// app as a guest, at phone size (390 × 844, 3×) and laptop size (1440 × 900, 2×), with demo travels.
const BATTUTA = "/projects/battuta";
const APP_GROUND = "#f5fafb";

const phone = (name: string, alt: string, caption: string) => ({
  src: `${BATTUTA}/battuta-phone-${name}.png`,
  width: 1170,
  height: 2532,
  alt,
  caption,
  device: "phone" as const,
  tone: APP_GROUND,
});

const desktop = (name: string, alt: string, caption: string) => ({
  src: `${BATTUTA}/battuta-desktop-${name}.png`,
  width: 2880,
  height: 1800,
  alt,
  caption,
  device: "desktop" as const,
  tone: APP_GROUND,
});

export const projects: Project[] = [
  {
    slug: "battuta",
    title: "Battuta",
    tagline: "Explore 249 countries, record the ones you've visited, and plan the next trip.",
    kind: "multiplatform",
    role: "Personal project",
    featured: true,
    overview:
      "An app for exploring every country in the world, keeping track of the ones you've visited, and planning the next trip, named after Ibn Battuta, the 14th-century traveler from Tangier. It runs in any modern browser, on a phone or a computer, with no account and no install; Android and iOS build from the same Flutter code.",
    problem:
      "People who travel keep track of their trips in notes, photos, or memory. They have no quick, private way to see which countries they have visited, how much of the world they have covered, and where they want to go next. Most tools that do this require an account up front, need a connection, or are not available in Arabic.",
    contributions: [
      "Wrote the product requirements document: every feature as numbered requirements with priorities and testable acceptance criteria, kept current through 22 revisions as the app grew.",
      "Built the app in Flutter from one codebase for the web, Android and iOS, with Riverpod and go_router.",
      "Made it local-first: travels are saved on the device first (Drift, SQLite, also on the web), so the app works without an account or a connection.",
      "Added optional accounts with Firebase Authentication and sync through Cloud Firestore, with security rules that enforce last write wins and the shape of each entry.",
      "Drew the world map in the app itself from bundled Natural Earth data, with no map service.",
      "Set up CI and delivery with GitHub Actions: formatting, analysis, tests and web, Android and iOS builds on every pull request, a preview site per pull request, deploys from version tags, and a weekly redeploy with fresh country data.",
    ],
    features: [
      "Explore 249 countries and territories with their flags: search in English or Arabic, filter by region, language or currency, and sort by name, population or area.",
      "Country details: capital, population, area, languages, currencies, time zones and neighbors, with Open in Maps.",
      "Mark countries as visited with a date, rating and notes, or add them to a wishlist with a priority and target year. A passport stamp lands on the flag when a visit is saved.",
      "Quick select: pick several countries and mark them all as visited at once, with one Undo.",
      "Stats on a world map: visited countries in amber, the wishlist hatched. Zoom in, focus on a region, replay your trips in date order, and share an image of your map.",
      "English or Arabic with a full right-to-left layout, and light and dark themes.",
    ],
    impact: [
      "Live at battuta-travel.web.app, released in four versions so far (1.0.0 to 1.3.0).",
      "Covered by 45 test files; sync is tested against the Firebase emulators.",
    ],
    skills: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Drift (SQLite)",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Hosting",
      "GitHub Actions",
    ],
    screenshots: [
      phone(
        "explore",
        "Battuta on a phone: Explore, a grid of round country flags with names and regions, 249 countries, a search field and the tab bar",
        "Explore on a phone: every country, most visited first.",
      ),
      phone(
        "country",
        "Battuta on a phone: Turkey's details, its flag with a Visited 2024 stamp, the visit date, five stars and a note, and the facts",
        "A country's details, stamped once it's visited.",
      ),
      phone(
        "travels",
        "Battuta on a phone: My travels, fourteen visited countries grouped by year with their flags, ratings, dates and notes",
        "My travels: visits by year, with ratings and notes.",
      ),
      phone(
        "stats",
        "Battuta on a phone: Stats, 14 of 249 countries visited, 5.6 percent of the world, and a world map with visited countries in amber",
        "Stats and the world map the app draws itself.",
      ),
      phone(
        "arabic",
        "Battuta on a phone in Arabic: My travels in a right-to-left layout with Arabic country names and dates",
        "The same screen in Arabic, right to left.",
      ),
      phone(
        "welcome",
        "Battuta on a phone: the welcome screen, the logo among round flags, three lines on what the app does, and Continue as guest",
        "Welcome: no account needed.",
      ),
      desktop(
        "explore",
        "Battuta on a laptop: Explore, six round flags to a row with visited and wishlist badges, and the navigation rail on the left",
        "Explore on a laptop.",
      ),
      desktop(
        "country",
        "Battuta on a laptop: Turkey's details in two columns, the stamped flag and visit card on the left, facts and neighboring countries on the right",
        "Country details in two columns, with the neighbors' flags.",
      ),
      desktop(
        "stats",
        "Battuta on a laptop: Stats with the world map, region filters, Replay my travels, Share my map, and visits by region",
        "Stats on a laptop: the map, Replay and Share, and visits by region.",
      ),
    ],
    links: { live: "https://battuta-travel.web.app", github: "https://github.com/AhmadAlmudhi/Battuta" },
  },
];
