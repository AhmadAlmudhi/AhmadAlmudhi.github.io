# CLAUDE.md

@AGENTS.md

## The project

Ahmad Almudhi's interactive resume: a single-page, mobile-first, typography-led site (no personal photo)
that replaces the PDF in interviews (handed over on a phone) and in remote hiring (link sent to recruiters).
Static export, hosted on GitHub Pages at `https://ahmadalmudhi.github.io` from the public repo
`AhmadAlmudhi/AhmadAlmudhi.github.io` (remote `origin`; Pages source: GitHub Actions). English only.
Not indexed by search engines.

## Sources of truth — read before working

| File | What it decides |
|---|---|
| `docs/PRD-Interactive-Resume.md` (v1.3) | Scope, requirement IDs (`NAV-1`, `PRJ-5`, …) with Must/Should/Could, NFRs, content model (§11), stack (§13), milestones (§14), definition of done (§15) |
| `docs/resume-content.md` | Every word of content. Never invent content, metrics, projects or proof |
| `docs/content_files/` | Source files: resume PDF and the two Scrum.org certificate PDFs. Originals only; derived assets live in `public/` |
| `.agents/skills/design-taste-frontend/SKILL.md` | Art direction, house rules, the build run and the gates. Read it whole before any visual work, plus the reference file it points to for the step at hand |
| `node_modules/next/dist/docs/` | Docs for the installed Next.js 16.4.3. Check here before using any Next API |

**Precedence (decided 30 Oct 2026):** the design skill decides every visual and motion question,
always. The PRD decides what is built and how it behaves (features, navigation, a11y, perf, content);
v1.3 was aligned with the skill. If you find a remaining conflict, follow the skill and update the PRD
to match. Cite PRD requirement IDs in commit messages and PR descriptions.

## Stack and commands

- Next.js 16.4.3 (App Router, Turbopack), React 19.3, TypeScript strict, Tailwind CSS v4 (CSS-first
  `@theme`; wired through the `@tailwindcss/turbopack` loader rule in `next.config.ts`, no PostCSS
  config), ESLint 9 flat config (ignores `.agents/`, `.claude/`, `.taste-skill/`). Path alias `@/*` → repo root.
- `npm run dev` · `npm run build` (writes `out/`) · `npm run lint` · `npm run typecheck` · `npm start`
  (serves `out/`; `next start` does not serve a static export).
- **Fonts:** Clash Grotesk's licence (ITF FFL) allows self-hosting but forbids distribution through a
  repository, so `app/fonts/` is gitignored and `scripts/fetch-fonts.mjs` downloads the official files
  from Fontshare (`predev`/`prebuild` hooks; CI caches them). Never commit font files.
- Installed: `motion`, `zod`, `lucide-react`, `qrcode.react`. Planned (PRD §13.1), added when a milestone
  needs them: `workbox-cli`, `@playwright/test`, `@lhci/cli`; `embla-carousel-react` only if native
  scroll snap falls short. Overlays are native `<dialog>` (no Radix). `sharp` comes with Next.
  Initial JS budget is ≤ 150 KB gzipped, so check before adding anything else.
- CI (`.github/workflows/deploy.yml`): every PR runs lint, typecheck, the design lint and the build; a
  push to `main` also deploys `out/` to Pages. Wait for green checks before merging.

## Static export: hard constraints

`next.config.ts` has `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.

- **Never add `cacheComponents` or `partialPrefetching`.** Verified on 2026-10-30: with them,
  `next build` fails with `Invariant: PPR cannot be enabled in export mode`. Don't use `use cache`,
  `cacheLife` or `cacheTag`.
- Not available: Server Actions, route handlers that read the request, rewrites/redirects/headers, `proxy`,
  ISR, cookies, the default image loader. Route handlers need `export const dynamic = 'force-static'`.
- Client components are prerendered, so touch `window`/`localStorage`/`navigator` only inside effects.
- Deep links are hash-based (`/#projects`, `/#projects/<slug>`), so there are no dynamic routes.
- No response headers on Pages: CSP and Referrer-Policy go in `<meta>` tags. `<meta name="robots"
  content="noindex, nofollow">` on every page. `public/robots.txt` disallows only `/resume/`; never block
  the pages (link previews need them). No sitemap, no JSON-LD.
- Images are pre-optimized by `scripts/optimize-images.mjs` (sharp → AVIF/WebP widths + blur placeholders).
- `experimental.agentFeedback` is on: `next dev` maintains managed blocks in `AGENTS.md`. Don't edit inside
  the markers; commit `AGENTS.md` changes with your work.

## Architecture (PRD §13.3)

`app/` (layout with the boot script, page composing sections in configured order) ·
`components/{nav,sections,stage,ui}` · `content/*.ts` + `content/schema.ts` (Zod, parsed on import:
bad content fails the build) · `lib/nav.tsx` (active section, hash/history store, overlays, shortcuts),
`lib/dates.ts`, `lib/client.ts` (`useHydrated`, `useClientValue` — use these, not setState-in-effect,
which the React lint rules reject) · `styles/` (`tokens.css` roles, `base.css`, `frame.css`,
`sections.css`, imported by `app/globals.css`) · `public/{projects/<slug>,certificates,resume}` ·
`scripts/` · `.github/workflows/deploy.yml`.

The mobile dock hides while scrolling down and returns on scroll up (skill layout.md §7); the header's
Sections button is always there. Display lines fitted to the width use `components/ui/FitText.tsx`.

The page is the dealt split stage: `components/stage/Stage.tsx` is the fixed half on desktop (≥ 64em).
Blocks in the reading half carry `data-stage="<key>"`; the stage crossfades to the layer with that key
(layers are built in `app/page.tsx`). The stage also carries the desktop rail and the section bar.

Navigation behaviour (PRD §5.2) is the core of the interview use case:
- Scrolling updates the hash with `replaceState`. Tapping a nav item uses `pushState`, so Back returns to
  the previous section.
- Opening a project or certificate overlay pushes a history entry, so Back (Android gesture included)
  closes the overlay instead of leaving the site.
- Deep links work on first load. The mobile bottom dock (Prev / section index / Next) and the desktop
  side rail (≥ 1024px) are both Must.

## Content rules

- Section order comes from one `sectionOrder` array: Hero, Experience, Projects, Skills, Education,
  Certifications, Contact.
- Durations are computed, never hard-coded. A value computed at build goes stale between deploys, so
  compute it in the browser after hydration (with the build value as fallback) or schedule a rebuild.
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
- Skill levels are words only (Expert / Proficient / Familiar). No percentage bars.
- Found pictures of Ahmad's world (Riyadh at dusk, the King Saud University gate) live in
  `public/pictures/` with their records in `content/pictures.ts` (and `credits.json`); the footer credits
  every one. They show places, never his work. Add new ones with the skill's `assets.mjs --get`.
- The live thing is the "read as" lens: each experience highlight, skill group and certificate carries
  `side: "engineering" | "product"`; the lens sets `data-lens` on `<html>` and CSS mutes the other side.
  Copy written from the facts is listed in `docs/resume-content.md` for Ahmad to confirm.
- Commit only redacted screenshots. Originals stay outside the repo (Git history is public and permanent).

## Design: the `design-taste-frontend` skill

Vendored in `.agents/skills/design-taste-frontend` (MIT, notice in `.agents/skills/LICENSE-design-taste-frontend`;
pinned by `skills-lock.json`; don't edit its files) and linked from `.claude/skills/` so Claude Code
loads it. `<skill>` below = that folder. Run its scripts from the repo root (Node 22+, Chrome installed).
Working files land in `.taste-skill/` (gitignored).

- This is a **page**, not an app screen: follow "The run" in SKILL.md, not `references/app-screens.md`.
  Sector `personal-portfolio`. Pass `--have product-ui` only once real project screenshots exist.
- Order: inventory → argument → `draw.mjs --options 3`, then `--direction <id>` → the idea sentence + one
  live thing → full copy deck → build still → gate → look/critique (≤ 3 rounds) → motion → report.
- The draw deals the accent colour and fonts. Self-host the dealt faces with `next/font/google` or
  `next/font/local` (Fontshare faces). Never use CDN `<link>` tags: they break offline/PWA and the CSP.
- Gate on what ships: `node <skill>/scripts/lint.mjs app components styles`, then after `npm run build`
  serve `out/` at its root (`python3 -m http.server 4321 --directory out`; passing `out/index.html`
  breaks the absolute `/_next/` paths) and run `node <skill>/scripts/inspect.mjs http://127.0.0.1:4321/`.
  Headless Chrome follows the OS theme, so inspect both: append `?theme=light` or `?theme=dark` (the boot
  script honours it for that view only). Overlay shadows carry `/* taste-skill-ignore */`. Aim for 0 FAIL at
  1440/768/390, then open every screenshot it saves. Until real projects arrive, the picture-floor
  check may still fail; say so instead of padding with unrelated pictures.
- House rules apply everywhere: headlines ≤ 2 lines at every width; one `h1` saying who and what; a
  heading on every section; equal outer margins; no eyebrows or tiny tracked-caps labels; no monospace
  (drop the boilerplate Geist Mono); no 01/02/03 numbering; no 1px rules or outlined boxes; no gradients;
  no shadows on resting elements; no glass; no violet/indigo; no cream + terracotta; no emoji; ≤ 2
  typefaces; no styled accent word.
- Don't copy the resume PDF's look: its spaced-caps section labels ("S U M M A R Y") and hairline rules
  are exactly what the house rules ban.
- No scroll scenes: the skill ships no `library/scenes.json`, and its scenes load GSAP from a CDN.
  Build motion with Motion for React (`LazyMotion`) and CSS scroll timelines, using the skill's tokens
  (`references/motion.md` §4; PRD §8 follows them).
- Content must be visible without JS. Hidden start states apply only under JS and
  `prefers-reduced-motion: no-preference`. A Motion `initial={{ opacity: 0 }}` on server-rendered content
  breaks this. Reveals play once; no preloader; the first screen is readable on first paint.

### How the former PRD ↔ skill conflicts were settled (PRD v1.3)

| Topic | Decision |
|---|---|
| Hero background (HERO-2) | Flat colour field from the palette; the masked name reveal carries the motion. No gradient mesh, no grain |
| Header and dock (NAV-1/3) | Opaque bars one tone step from the ground, attached to the edge, on the page margins. No blur, no floating pill |
| Surfaces (§7) | Tone steps only; shadows only on floating layers (sheet, modal, lightbox, toast) |
| Radius (§7) | One value, square or fully round, decided from the draw; pictures square |
| Screenshots (PRJ-2) | Mobile apps: plain rounded-rectangle CSS phone frame. Web/dashboard: unframed, square, on a surface tone |
| Project stack (PRJ-3) | Screenshots cycle in place with a "2 of 5" count; no tilted/fanned stack |
| Tilt / spotlight (PRJ-8) | Dropped |
| Stats and certificates | Stats as large type with rolling figures; certificates per the dealt blueprint; no bento |
| Progress (NAV-2/9) | Plain "3 of 7" position; any bar ≥ 4px; no hairlines |
| Tags and badges | Filled tone-step tags, sentence case, no outline; status and NDA notes as plain text, not pills |
| Motion (§8) | The skill's durations, curves and staggers; one signature move (the name reveal) |

## Done means (PRD §15)

Lint, typecheck and static-export build pass. The skill's gate is clean (or remaining FAILs are explained).
WCAG 2.2 AA: focus trapped in overlays and restored on close, visible focus, tap targets ≥ 44px,
contrast ≥ 4.5:1 in both themes, reduced motion respected. No horizontal overflow at 375px. Lighthouse
mobile Performance ≥ 95, Accessibility and Best Practices 100. LCP ≤ 2.0s, CLS < 0.05. Light and dark
themes follow the system preference, persist the toggle, and never flash the wrong theme. Every
interactive element has hover (desktop), pressed and focus-visible states.
