import type { Project, Screenshot } from "./schema";

// The projects (PRJ-1..12), Ahmad's own apps. Every word is taken from each project's repository
// (its README, requirements document and commit history) and listed in docs/resume-content.md for
// Ahmad to confirm. The screenshots were taken in the live web apps with Playwright, at phone size
// (390 × 844 at 4×) and laptop size (1440 × 900 at 3×); the high density keeps them sharp when zoomed.

/** A screenshot in public/projects/<slug>/, named <slug>-<device>-<name>.png. `tone` is the app's ground. */
const shots =
  (slug: string, tone: string) =>
  (device: "phone" | "desktop", name: string, alt: string, caption: string): Screenshot => ({
    src: `/projects/${slug}/${slug}-${device}-${name}.png`,
    ...(device === "phone" ? { width: 1560, height: 3376 } : { width: 4320, height: 2700 }),
    alt,
    caption,
    device,
    tone,
  });

// Battuta: taken as a guest in its dark theme, with demo travels
const battuta = shots("battuta", "#0e1415");
const phone = (name: string, alt: string, caption: string) => battuta("phone", name, alt, caption);
const desktop = (name: string, alt: string, caption: string) => battuta("desktop", name, alt, caption);

// The Seventh Card: a real game on the live server, four players, each in their own browser
// (Ahmad on a phone and Sara on a laptop in English, عمر on a phone in Arabic, Noor alongside)
const seventh = shots("seventh-card", "#184838");

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
        "Battuta on a phone, dark theme: Explore, round country flags with visited ticks on France, the United States, China, Spain, Mexico and Italy",
        "Explore on a phone: every country, most visited first.",
      ),
      phone(
        "country",
        "Battuta on a phone, dark theme: Brazil's details, its flag with a Visited 2023 stamp, the visit date, five stars and a note, and the facts",
        "A country's details, stamped once it's visited.",
      ),
      phone(
        "travels",
        "Battuta on a phone, dark theme: My travels, twenty visited countries grouped by year with their flags, ratings, dates and notes",
        "My travels: visits by year, with ratings and notes.",
      ),
      phone(
        "stats",
        "Battuta on a phone, dark theme: Stats, 20 of 249 countries visited, 8 percent of the world, and a world map with the Americas, Asia and Australia in amber and Russia hatched",
        "Stats and the world map the app draws itself.",
      ),
      phone(
        "arabic",
        "Battuta on a phone in Arabic: My travels in a right-to-left layout with Arabic country names and dates",
        "The same screen in Arabic, right to left.",
      ),
      phone(
        "welcome",
        "Battuta on a phone, dark theme: the welcome screen, the logo among round flags, three lines on what the app does, and Continue as guest",
        "Welcome: no account needed.",
      ),
      desktop(
        "explore",
        "Battuta on a laptop, dark theme: Explore sorted by area, Russia and Greenland on the wishlist, Canada, China, the United States, Brazil, Australia and India visited",
        "Explore on a laptop, largest countries first.",
      ),
      desktop(
        "country",
        "Battuta on a laptop, dark theme: Brazil's details in two columns, the stamped flag and visit card on the left, facts and ten neighboring countries on the right",
        "Country details in two columns, with the neighbors' flags.",
      ),
      desktop(
        "stats",
        "Battuta on a laptop, dark theme: Stats with the world map, visited countries in amber and the wishlist hatched, region filters, Replay my travels and Share my map",
        "Stats on a laptop: the map, Replay and Share, and visits by region.",
      ),
    ],
    links: { live: "https://battuta-travel.web.app", github: "https://github.com/AhmadAlmudhi/Battuta" },
  },
  {
    slug: "seventh-card",
    title: "The Seventh Card",
    tagline: "A real-time card game for 2 to 8 friends, each playing on their own phone or computer.",
    kind: "game",
    role: "Personal project",
    featured: true,
    overview:
      "The Seventh Card (الورقة السابعة) is a real-time, press-your-luck card game. Create a private room, share its code, and everyone plays from their own phone or computer, in the browser, with no install. Each turn you Hit to take a card or Stay to keep your points; a number you already have busts you for the round, and seven different numbers end the round with a 15-point bonus. Arabic is the default language, with English too, and a tutorial game against a bot teaches newcomers.",
    contributions: [
      "Wrote the whole ruleset as a pure TypeScript engine, every action taking the game from one state to the next with the events it caused, with no network, storage or timers, so each rule can be tested on its own.",
      "Built the room server on Cloudflare Workers and Durable Objects: a WebSocket protocol with every message validated by Zod, rate limits, state saved before every broadcast, one alarm for every deadline, and cleanup of empty and abandoned rooms. The server runs every rule, so players can't cheat.",
      "Built the app in Flutter, in Arabic (right to left) and English: home, lobby, game table, round scores and results, with reconnecting, pausing, turn timeouts and leaving all handled.",
      "Choreographed the table so every update plays one beat at a time: cards flip in the middle and fly to their row, a bust shakes the seat, Freeze frosts it, and the Seventh Card brings confetti, with sound and haptics.",
      "Tested it as a whole: unit tests for every rule, integration tests in the Workers runtime including a full game over real WebSockets, and simulations where bots play 1,000 random games on every run and 10,000 every night, checking every invariant after every action.",
      "Turned play-test feedback into changes: every opponent's score on screen, number colours that show risk, a tutorial, and timeouts that always Stay for you.",
    ],
    features: [
      "Private rooms with a 5-character code and a share link; 2 to 8 players, each on their own device.",
      "Special cards: Freeze, Draw Three and Second Chance, with + and x2 bonus cards.",
      "Normal and Hard Mode, a winning score the host sets, and tie-break rounds.",
      "A tutorial game against Robo, with a tip for each new moment.",
      "A card counter, and number colours that run from green to red by how many copies each number has, so you can see the risk.",
      "Arabic (the default, right to left) and English, sound and haptics, and wide-screen layouts with an oval table.",
    ],
    impact: [
      "Live at ahmadalmudhi.github.io/seventh-card-game, version 1.0.0.",
      "About 200 automated tests across the rules engine, the server and the app, plus a nightly simulation of 10,000 games.",
    ],
    skills: ["Flutter", "Dart", "TypeScript", "Cloudflare Workers", "Durable Objects", "WebSockets", "Zod", "Vitest", "GitHub Actions"],
    screenshots: [
      seventh(
        "phone",
        "table",
        "The Seventh Card on a phone: round 4, three opponents' seats at the top, a 12 just drawn in the middle, your row of five number cards and the Hit and Stay buttons",
        "Your turn: Hit for another card, or Stay to keep your points.",
      ),
      seventh(
        "phone",
        "scores",
        "The Seventh Card on a phone: the round 2 scores over the table, two players busted and two scoring",
        "The round's scores, then the next round deals itself.",
      ),
      seventh(
        "phone",
        "freeze-arabic",
        "The Seventh Card on a phone in Arabic: a Freeze card in the middle and the prompt to choose a player to freeze, with a button for each player",
        "A Freeze card waits for its target, in Arabic.",
      ),
      seventh(
        "phone",
        "results-arabic",
        "The Seventh Card on a phone in Arabic: the game is over, Ahmad wins with 120 points, and the final ranking of four players",
        "The results: the winner and the final ranking.",
      ),
      seventh(
        "phone",
        "lobby",
        "The Seventh Card on a phone: a room's lobby with its code, Copy code and Share link, four players, the game settings and Start game",
        "The lobby: share the code, set the mode and start.",
      ),
      seventh(
        "phone",
        "home",
        "The Seventh Card on a phone: the home screen with the logo, a nickname, Create room, Join room, Tutorial game and How to play",
        "Home: create a room, join one, or learn with the tutorial.",
      ),
      seventh(
        "desktop",
        "table",
        "The Seventh Card on a laptop: the opponents in one row above an oval table, the last card in the middle, your row and the Hit and Stay buttons",
        "On a laptop: an oval table, the opponents in one row.",
      ),
      seventh(
        "desktop",
        "bust",
        "The Seventh Card on a laptop: a second 8 drawn, a Bust! stamp on the card and your row turned red",
        "A duplicate number: bust, and the round scores 0.",
      ),
      seventh(
        "desktop",
        "lobby",
        "The Seventh Card on a laptop: the lobby seen by a player who joined, waiting for the host to start",
        "The lobby, as a player who joined sees it.",
      ),
    ],
    links: { live: "https://ahmadalmudhi.github.io/seventh-card-game/", github: "https://github.com/AhmadAlmudhi/seventh-card-game" },
  },
];
