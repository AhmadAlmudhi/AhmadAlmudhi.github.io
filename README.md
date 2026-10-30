# Ahmad Almudhi — interactive resume

**[ahmadalmudhi.github.io](https://ahmadalmudhi.github.io)**

My resume as a single page: experience, projects, skills, education and certificates, built to be handed
over on a phone in an interview or opened from a link by a recruiter. It is a static site on GitHub
Pages; there is no server.

## What it does

- **The split stage.** On a laptop the page has two halves. The record scrolls on the left while the
  right half holds the work that goes with it: the app, the dashboard, the university, the certificate.
  On a phone the two halves close into one column.
- **Read as an engineer or as a product owner.** One control re-weights the experience, skills and
  certificates by side. My highlights split exactly five and five.
- **Built for the interview table.** A thumb dock (previous, section list, next), a section index two
  taps from anywhere, Back that returns to the previous section and closes overlays instead of leaving
  the site, deep links, and a QR code so the interviewer can open it on their own phone.
- **Projects** open in a detail view with a full-screen gallery (swipe, pinch and double-tap zoom).
- **Contact without a form:** copy the email, save a contact card, download the PDF.
- **Works offline** after one visit, and installs as an app.
- Light and dark themes, reduced-motion support, keyboard shortcuts (`J`/`K`, `1`–`7`).

## Built with

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 with hand-written CSS
on design tokens · Zod (content validated at build) · Workbox · Playwright · Lighthouse CI · GitHub
Actions and Pages. Set in [Clash Grotesk](https://www.fontshare.com/fonts/clash-grotesk) (Indian Type
Foundry, ITF Free Font License, self-hosted).

The art direction came from the `design-taste-frontend` skill (vendored in `.agents/skills/`, MIT): it
dealt the composition, palette and type, and its inspector checks the house rules in a real browser.

## Quality bars, checked on every pull request

- Lint, typecheck and the design lint
- End-to-end tests on desktop and phone: navigation and history, overlays, the lens, offline, privacy
- Initial JavaScript at most 150 KB gzipped
- Lighthouse (mobile): accessibility and best practices 100, performance 90 or more, layout shift under 0.05

A push to `main` that passes deploys to GitHub Pages.

## Run it

Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 (fetches the font and writes image variants first)
npm run build      # static export into out/, then the service worker
npm start          # serves out/ at http://localhost:4173
npm test           # Playwright, against the build, using your installed Chrome
```

## Change the content

All of it lives in typed files under [`content/`](content/): `profile.ts`, `experience.ts`, `projects.ts`,
`skills.ts`, `education.ts`, `certifications.ts`. Edit, push, and the site redeploys. A typo or a missing
field fails the build instead of breaking the site. Project screenshots go in
`public/projects/<slug>/`; a project marked `placeholder: true` shows a designed title card until then.

The product requirements are in [`docs/PRD-Interactive-Resume.md`](docs/PRD-Interactive-Resume.md).

## Credits

Pictures from Wikimedia Commons: “Riyadh Skyline showing the King Abdullah Financial District (KAFD)
and the famous Kingdom Tower” by B.alotaby
([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)); “King Saud University Entrance Gate,
Riyadh” by Dr. Basil Al Bayati ([CC0](https://creativecommons.org/publicdomain/zero/1.0/)).

The code is mine; the content (text, resume, certificates) is about me and not licensed for reuse.
