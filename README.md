# Ahmad Almudhi — interactive resume

**[ahmadalmudhi.github.io](https://ahmadalmudhi.github.io)**

My resume as a single page: experience, projects, skills, education and certificates, built to be handed
over on a phone in an interview or opened from a link by a recruiter. It is a static site on GitHub
Pages; there is no server.

## What it does

- **My own identity.** Gold Castoro on parchment, a green band with gold rules, an eight-point star, and
  Najdi mud-brick towers over palm groves, all taken from one theme image of mine.
- **Built for the interview table.** A thumb dock that stays on screen (previous, section list, next),
  every section in the header on a laptop, a section index two taps from anywhere, Back that returns to the previous section and closes overlays instead of leaving
  the site, deep links, and a QR code so the interviewer can open it on their own phone.
- **Projects** open in a detail view with a full-screen gallery (swipe, pinch and double-tap zoom).
- **Contact without a form:** copy the email, save a contact card, download the PDF.
- **Works offline** after one visit, and installs as an app.
- Reduced-motion support and keyboard shortcuts (`J`/`K`, `1`–`7`).

## Built with

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 with hand-written CSS
on design tokens · Zod (content validated at build) · Workbox · Playwright · Lighthouse CI · GitHub
Actions and Pages. Set in [Castoro](https://fonts.google.com/specimen/Castoro) (Tiro Typeworks, SIL
Open Font License, self-hosted).

The house rules, motion and design checks come from the `design-taste-frontend` skill (vendored in
`.agents/skills/`, MIT); its inspector measures the built page in a real browser.

## Quality bars, checked on every pull request

- Lint, typecheck and the design lint
- End-to-end tests on desktop and phone: navigation and history, overlays, the dock, the record against the CV, offline, privacy
- Initial JavaScript at most 150 KB gzipped
- Lighthouse (mobile): accessibility and best practices 100, performance 90 or more, layout shift under 0.05

A push to `main` that passes deploys to GitHub Pages.

## Run it

Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 (writes image variants first)
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

The code is mine; the content (text, resume, certificates) is about me and not licensed for reuse.
