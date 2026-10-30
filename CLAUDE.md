# CLAUDE.md

@AGENTS.md

## The project

Ahmad Almudhi's interactive resume: a single-page, mobile-first site (no personal photo) in his own identity
that replaces the PDF in interviews (handed over on a phone) and in remote hiring (link sent to recruiters).
Static export, hosted on GitHub Pages at `https://ahmadalmudhi.github.io` from the public repo
`AhmadAlmudhi/AhmadAlmudhi.github.io` (remote `origin`; Pages source: GitHub Actions). English only.
Not indexed by search engines.

## Sources of truth — read before working

| File | What it decides |
|---|---|
| `docs/PRD-Interactive-Resume.md` (v1.4) | Scope, requirement IDs (`NAV-1`, `PRJ-5`, …) with Must/Should/Could, NFRs, content model (§11), stack (§13), milestones (§14), definition of done (§15) |
| `docs/resume-content.md` | Every word of content. Never invent content, metrics, projects or proof |
| `docs/content_files/` | Source files: resume PDF, the two Scrum.org certificate PDFs and `my_theme.png` (the identity). Originals only; derived assets live in `public/` |
| `docs/content_files/my_theme.png` | **The identity:** colours, typeface, the gold name between star dividers, the green band, the towers and palm groves |
| `.agents/skills/design-taste-frontend/SKILL.md` | Art direction, house rules, the build run and the gates. Read it whole before any visual work, plus the reference file it points to for the step at hand |
| `node_modules/next/dist/docs/` | Docs for the installed Next.js 16.4.3. Check here before using any Next API |

**Precedence (decided 30 Oct 2026, v1.4):** Ahmad's theme image decides the identity (colours, type,
ornament, imagery). The design skill decides every other visual and motion question. The PRD decides
what is built and how it behaves (features, navigation, a11y, perf, content). If you find a remaining
conflict, follow that order and update the PRD to match. Cite PRD requirement IDs in commit messages and
PR descriptions.

## Stack and commands

- Next.js 16.4.3 (App Router, Turbopack), React 19.3, TypeScript strict, Tailwind CSS v4 (CSS-first
  `@theme`; wired through the `@tailwindcss/turbopack` loader rule in `next.config.ts`, no PostCSS
  config), ESLint 9 flat config (ignores `.agents/`, `.claude/`, `.taste-skill/`). Path alias `@/*` → repo root.
- `npm run dev` · `npm run build` (writes `out/`) · `npm run lint` · `npm run typecheck` · `npm start`
  (serves `out/`; `next start` does not serve a static export).
- **Font:** Castoro (OFL, regular + italic), the identity's face, loaded with `next/font/google` in
  `app/layout.tsx`: downloaded at build and served from the site. One face only.
- **Theme assets:** `npm run theme` (`scripts/cut-theme.mjs` + `scripts/make-icons.mjs`) cuts
  `public/theme/` (towers, landscape, band texture, paper grain), `public/og.jpg` and the star icons
  (`public/favicon.png`, `apple-touch-icon.png`, `icon-*.png`) from `my_theme.png`. The outputs are
  committed; rerun only if the theme image changes.
- Installed: `zod` (build-time only), `lucide-react`, `qrcode.react` (lazy), and dev: `@playwright/test`,
  `workbox-cli`, `@lhci/cli`. Overlays are native `<dialog>` (no Radix); the lightbox's swipe, pinch and
  double-tap zoom are plain pointer events; the card → detail morph uses `document.startViewTransition`
  (`components/overlays/useOpenProject.ts`, which also opens the framed certificates). `sharp` comes with Next.
- Tests: `npm test` runs Playwright (`tests/`) against the built `out/` served by `scripts/serve.mjs`,
  driving the installed Chrome (`channel: "chrome"`), desktop and phone. Build first.
  Initial JS budget is ≤ 150 KB gzipped, so check before adding anything else.
- Build pipeline: `prebuild` writes responsive AVIF/WebP of the certificates into `public/opt/`
  (`scripts/optimize-images.mjs`, gitignored); `postbuild` writes the Workbox service worker into `out/`
  (`workbox-config.cjs`).
- CI (`.github/workflows/deploy.yml`): every PR runs lint, typecheck, the design lint, the build, the
  Playwright tests, the initial-JS budget (`scripts/check-js-budget.mjs`, 150 KB gz, currently ~147 KB:
  think twice before adding client code) and Lighthouse (`lighthouserc.cjs`: a11y and best practices 1,
  performance ≥ 0.9, CLS < 0.05); a push to `main` also deploys `out/` to Pages. Wait for green checks.

## Static export: hard constraints

`next.config.ts` has `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.

- **Never add `cacheComponents` or `partialPrefetching`.** Verified on 2026-10-30: with them,
  `next build` fails with `Invariant: PPR cannot be enabled in export mode`. Don't use `use cache`,
  `cacheLife` or `cacheTag`.
- Not available: Server Actions, route handlers that read the request, rewrites/redirects/headers, `proxy`,
  ISR, cookies, the default image loader. Route handlers need `export const dynamic = 'force-static'`.
- Client components are prerendered, so touch `window`/`localStorage`/`navigator` only inside effects.
- Deep links are hash-based (`/#projects`, `/#projects/<slug>`), so there are no dynamic routes.
- Content files are plain typed data; `content/validate.ts` parses them with Zod from `app/page.tsx` at
  build. Never import Zod (or call `.parse`) from anything a client component imports.
- Brand images are static files in `public/` (`og.jpg`, the star icons), cut from the theme image.
  Don't use metadata image conventions (`opengraph-image.tsx`): they export extension-less and Pages
  would serve them as octet-stream.
- Overlay code loads when the page is idle (`components/overlays/Overlays.tsx`); the QR library loads
  when its sheet opens.
- No response headers on Pages: CSP and Referrer-Policy go in `<meta>` tags (`app/layout.tsx`, production
  only; the CSP opens to GoatCounter only if `profile.analytics` is set). `<meta name="robots"
  content="noindex, nofollow">` on every page. `public/robots.txt` disallows only `/resume/`; never block
  the pages (link previews need them). No sitemap, no JSON-LD.
- Images are pre-optimized by `scripts/optimize-images.mjs` (sharp → AVIF/WebP widths + blur placeholders).
- `experimental.agentFeedback` is on: `next dev` maintains managed blocks in `AGENTS.md`. Don't edit inside
  the markers; commit `AGENTS.md` changes with your work.

## Architecture (PRD §13.3)

`app/` (layout with the boot script, page composing sections in configured order) ·
`components/{nav,sections,overlays,motion,pwa,ui}` · `content/*.ts` + `content/schema.ts` (Zod, parsed on import:
bad content fails the build) · `lib/nav.tsx` (active section, hash/history store, overlays, shortcuts),
`lib/dates.ts`, `lib/client.ts` (`useHydrated`, `useClientValue` — use these, not setState-in-effect,
which the React lint rules reject) · `styles/` (`tokens.css` identity colours, `base.css` ornaments,
band and buttons, `frame.css` header/dock/sheet, `sections.css`, `overlays.css`, `motion.css`, imported by
`app/globals.css`) · `public/{theme,projects/<slug>,certificates,resume}` ·
`scripts/` · `.github/workflows/deploy.yml`.

The page is one centred column: the banner (hero), parchment sections under centred gold headings
(`SectionHead` and `Divider`/`Star` in `components/ui/Ornament.tsx`), green bands for Skills and
Contact, and the banner again as the footer. On phones and tablets (< 64em) the hero fills the space
between header and dock, so the first screen ends on the band.

The dock (< 64em) is always on screen; don't bring back hide-on-scroll (it vanished right after a
tap on Next). `goTo` in `lib/nav.tsx` records the target while the smooth scroll runs: sections passing
by don't steal the active state, and quick repeated Next/Previous taps count on from the target. From
75em the header lists every section (NAV-2); below that its Sections button opens the index.

Navigation behaviour (PRD §5.2) is the core of the interview use case:
- Scrolling updates the hash with `replaceState`. Tapping a nav item uses `pushState`, so Back returns to
  the previous section.
- Opening a project or certificate overlay pushes a history entry, so Back (Android gesture included)
  closes the overlay instead of leaving the site.
- Deep links work on first load. The mobile bottom dock (Prev / section index / Next) and the desktop
  header section links are both Must.

## Content rules

- Analytics (GLB-5) is built but off: set `analytics: { provider: "goatcounter", code: "<site>" }` in
  `content/profile.ts` once Ahmad has a GoatCounter site. It counts visits, resume downloads, outbound
  links, section views and `?ref=<company>` (GLB-6).

- Section order comes from one `sectionOrder` array: Hero, Experience, Projects, Skills, Education,
  Certifications, Contact.
- Dates are shown as on the CV (`MM/YYYY`). Durations are computed (end month minus start month, in
  full words: "4 years", "6 months"), only for past roles; the current role shows none.
- Experience shows every highlight (no "Show more"); Education is exactly the CV's lines; Skills are the
  CV's two groups (Product, Technical) with no note of where each was used.
- **Projects are placeholders until Ahmad adds the real ones, after everything else is finished**
  (PRJ-12). Placeholders are the four Muvi projects listed in `resume-content.md`, using only facts from
  the Experience section. Each has `placeholder: true` and a small visible "Placeholder" note. A
  screenshot without `src` renders as `PlaceholderShot`: a title card drawn in HTML at the real ratio
  (phone ≈ 9:19.5, desktop ≈ 16:10) in the page's type and colours, never a grey box. To add a real one,
  put the redacted image in `public/projects/<slug>/` and give the entry `src`, `width`, `height`. The
  build logs the remaining placeholders; none may remain at launch.
- No phone on the site (`profile.phone` omitted). The email must not appear as plain text in the static
  HTML; assemble it client-side.
- Resume PDF: `public/resume/Ahmad-Almudhi-Resume.pdf` (copy of `docs/content_files/Ahmad_Almudhi-Resume.pdf`),
  linked with `download="Ahmad-Almudhi-Resume.pdf"`. It keeps the phone number (decided). If the source
  changes, copy it again.
- Certificates: `public/certificates/pspo-i.webp` and `psm-i.webp` (rendered from the PDFs, cropped to the
  certificate edges, WebP for weight). Both are Scrum.org and never expire; verify URLs are in `resume-content.md`.
  Scrum.org asks for the holder's email, so show the `verifyNote` hint and a copy-email button next to
  "Verify" (CRT-3).
- No percentage bars. No found photographs (Ahmad removed them); the only pictures are the theme
  image's cuts, the certificates and, later, the project screenshots.
- Removed at Ahmad's request, don't bring back: the tagline (the summary says it), the "In numbers"
  stats, the "read as" lens, "Next: (section)" links, the light/dark themes and their toggle.
- Commit only redacted screenshots. Originals stay outside the repo (Git history is public and permanent).

## Design: the `design-taste-frontend` skill

Vendored in `.agents/skills/design-taste-frontend` (MIT, notice in `.agents/skills/LICENSE-design-taste-frontend`;
pinned by `skills-lock.json`; don't edit its files) and linked from `.claude/skills/` so Claude Code
loads it. `<skill>` below = that folder. Run its scripts from the repo root (Node 22+, Chrome installed).
Working files land in `.taste-skill/` (gitignored).

- This is a **page**, not an app screen: follow "The run" in SKILL.md, not `references/app-screens.md`.
  Sector `personal-portfolio`. Pass `--have product-ui` only once real project screenshots exist.
- The run's draw was done in Phase 1 and its palette and type are superseded by the identity; later
  visual work goes: build still → gate → look/critique (≤ 3 rounds) → motion → report.
- The identity replaces the draw's palette and fonts (decided 30 Oct 2026). Never use CDN `<link>`
  tags for fonts: they break offline/PWA and the CSP.
- The identity's own devices are allowed and marked `/* taste-skill-ignore: … */` in the CSS: the gold
  name (gradient text with an embossed edge), the divider and band rules, the gold fillets and frames,
  the landscape's fade into the paper, outlined secondary buttons.
- Gate on what ships: `node <skill>/scripts/lint.mjs app components styles`, then after `npm run build`
  serve `out/` at its root (`python3 -m http.server 4321 --directory out`; passing `out/index.html`
  breaks the absolute `/_next/` paths) and run `node <skill>/scripts/inspect.mjs http://127.0.0.1:4321/
  --allow gradient-text,font-not-dealt,palette-cream,covered-text` (the gold name, Castoro, cream text on
  green, and text passing under the fixed dock mid-scroll). Overlay shadows carry `/* taste-skill-ignore */`. Aim for 0 FAIL at
  1440/768/390, then open every screenshot it saves. Until real projects arrive, the picture-floor
  check may still fail; say so instead of padding with unrelated pictures.
- House rules apply everywhere: headlines ≤ 2 lines at every width; one `h1` saying who and what; a
  heading on every section; equal outer margins; no eyebrows or tiny tracked-caps labels; no monospace
  (drop the boilerplate Geist Mono); no 01/02/03 numbering; no gradients or shadows beyond the
  identity's devices above; no glass; no emoji; one typeface; no styled accent word.
- Don't copy the resume PDF's look: its spaced-caps section labels ("S U M M A R Y") and hairline rules
  are exactly what the house rules ban.
- No scroll scenes: the skill ships no `library/scenes.json`, and its scenes load GSAP from a CDN.
  The motion layer is CSS (`styles/motion.css`, the skill's tokens and recipes) plus one small script:
  - the signature move: the hero's dividers draw out from their stars as the name rises from its mask
    (pure CSS under `.js`, settled by 1.2s);
  - section entrances are choreographed in `components/motion/Reveals.tsx` (`GROUPS` lists what
    arrives together, 70ms apart, four steps at most). It marks what is already on screen as shown,
    then sets `html.reveal`, which alone lets CSS hide the rest — so nothing is ever hidden before
    hydration. To add an entrance, add a selector to `GROUPS`; don't put `data-reveal` in markup;
  - scroll-linked (CSS scroll timelines in `@supports`): the experience spine draws; `<details>` open
    with `interpolate-size`.
- Content must be visible without JS. Hidden start states apply only under JS and
  `prefers-reduced-motion: no-preference`. A Motion `initial={{ opacity: 0 }}` on server-rendered content
  breaks this. Reveals play once; no preloader; the first screen is readable on first paint.

## Done means (PRD §15)

Lint, typecheck and static-export build pass. The skill's gate is clean (or remaining FAILs are explained).
WCAG 2.2 AA: focus trapped in overlays and restored on close, visible focus, tap targets ≥ 44px,
contrast ≥ 4.5:1, reduced motion respected. No horizontal overflow at 375px. Lighthouse mobile
Performance ≥ 95, Accessibility and Best Practices 100. LCP ≤ 2.0s (the simulated figure is ~2.8s, bound
by the JS bundle under throttling; observed LCP is the first paint), CLS < 0.05. One theme, the
identity's, at every system setting. Every interactive element has hover (desktop), pressed and
focus-visible states.
