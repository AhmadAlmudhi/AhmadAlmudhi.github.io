# PRD — Interactive Resume Website

| | |
|---|---|
| **Product** | Personal interactive resume website |
| **Owner** | Ahmad Almudhi |
| **Version** | 1.4 — live at ahmadalmudhi.github.io; English only; not indexed by search engines |
| **Date** | 30 October 2026 |
| **Status** | Built (phases 1–5 merged and live, 30 Oct 2026); waiting for the real projects (phase 6) |
| **Changes in 1.4** | Ahmad's own identity (`docs/content_files/my_theme.png`) replaces the dealt palette and type: Castoro in gold on parchment, a green band with gold rules, the eight-point star ornament, Najdi mud-brick towers and palm groves, one theme only (no light/dark). Removed at his request: the tagline, the "In numbers" stats, the "read as" lens, "Show more" on roles, "Next: …" links, the side rail, the theme toggle and the found photographs. Experience and Education follow the CV (MM/YYYY dates; durations in full words, end month minus start month, none for the current role); Skills are the CV's two groups; certificates sit in frames; the dock is always on screen |
| **Changes in 1.3** | Visual and motion rules aligned with the `design-taste-frontend` skill, which now decides every visual question (§7, §8 and the affected requirements); projects start as placeholders; resume PDF and certificate images added; robots.txt keeps the PDF out of search |

---

## 1. Overview

A single-page, mobile-first website that presents my professional profile — summary, experience, education, certifications, skills and projects — as a polished, animated, interactive experience. It replaces a static PDF in two situations:

1. **In-person interviews** — I hand my phone (or open it on theirs) and the interviewer browses the site, jumping back and forth between sections.
2. **Remote hiring** — I send the link to recruiters, who open it on a laptop or phone.

The site contains **no personal photo**. It is typography-led, with project screenshots and certificate images as the main visuals.

**Design authority:** the identity comes from Ahmad's theme image (`docs/content_files/my_theme.png`, decided 30 Oct 2026): its colours, its typeface, its gold name between star dividers, its green band and its towers and palm groves. Everything else visual follows the `design-taste-frontend` skill (`.agents/skills/design-taste-frontend/`): its house rules, motion and gates, except where the identity needs one of its devices (the gold name, the divider and band rules, the landscape's fade into the paper), which are marked in the source and allowed in the gate. This document still decides what the site does.

---

## 2. Goals & Non-Goals

### 2.1 Goals
| # | Goal | How we measure it |
|---|---|---|
| G1 | Make a strong, professional first impression within 5 seconds | Hero fully rendered in < 2 s on a mid-range phone over 4G |
| G2 | Let an interviewer navigate any section in ≤ 2 taps, and move back/forth easily | Usability test with 3 people unfamiliar with the site |
| G3 | Showcase projects visually and creatively | Every project has ≥ 1 screenshot, viewable full screen with zoom |
| G4 | Prove credentials | Every certificate has an image + (if available) a verification link |
| G5 | Make contacting me and getting my PDF resume effortless | Email, phone, LinkedIn, GitHub, PDF reachable from every screen in ≤ 2 taps |
| G6 | Feel premium in every detail, including small elements | Every interactive element has defined hover/press/focus states and motion |
| G7 | Be easy for me to update | Updating content = editing one content file + dropping images in a folder |

### 2.2 Non-Goals (v1)
- No personal photo.
- No blog, CMS, admin panel, login, or database.
- No backend / contact form (direct links instead).
- No heavy 3D/WebGL scenes (cost to mobile performance outweighs value).
- No skill "percentage bars" (widely seen as unprofessional and meaningless).
- No ornament the design skill bans (glass/blur, resting shadows, eyebrow labels, monospace, 01/02/03 numbering, emoji, custom cursors, preloaders), apart from the identity's own devices listed under Design authority.

---

## 3. Users & Scenarios

| Persona | Device | Context | Needs |
|---|---|---|---|
| **In-person interviewer** | My phone or theirs | Across a table, limited time, unfamiliar with the site | Obvious navigation, large tap targets, quick jump to "Projects" or "Experience", back to previous section |
| **Remote recruiter** | Laptop (13"–16"), sometimes phone | Screening many candidates quickly | Skimmable summary, clear dates/roles, one-click PDF download, contact details |
| **Hiring manager / tech lead** | Laptop | Evaluating depth | Project details: problem, role, tech, impact, screenshots, links to code/live demo |

### Key scenarios
1. **Interview walkthrough:** Interviewer opens site → reads summary → taps "Projects" → opens a project → swipes through screenshots → closes → taps "Previous section" to return to Experience.
2. **Link sent by email/LinkedIn/WhatsApp:** The link preview shows my name, title and a branded image → recruiter opens on laptop → scans → downloads PDF.
3. **"Do you have a PDF?"** → Resume button is always visible in the header/dock.
4. **Poor venue Wi-Fi:** Site still opens from cache because I visited it earlier on my phone (offline support).

---

## 4. Scope

### 4.1 Sections (default order — configurable in the content file)
1. Hero / Summary
2. Experience
3. Projects
4. Skills
5. Education
6. Certifications
7. Contact (also accessible from the persistent header/dock)

> **Note on order:** Experience comes before Education (decided), matching standard resume order. Projects sit right after Experience because they are the most visual, memorable section. Order is a single array in the content file.

### 4.2 Priorities
- **Must** — required for launch
- **Should** — strongly desired for launch
- **Could** — nice-to-have, post-launch

---

## 5. Information Architecture & Navigation

### 5.1 Page structure
Single page with anchored sections (`/#experience`, `/#projects`, …). Project and certificate details open in overlays that also have URLs (`/#projects/project-slug`).

### 5.2 Navigation requirements

| ID | Requirement | Priority |
|---|---|---|
| NAV-1 | **Mobile — bottom navigation dock** (thumb zone): shows current section name, ‹ Previous / Next › buttons, and a center button that opens a **Section Index sheet** listing all sections. The dock is an opaque bar attached to the bottom edge: no blur, not a floating pill. Since 1.4 it stays on screen at all times (hiding it on scroll-down made it vanish right after a tap on Next); the page keeps a bottom padding of the dock's height so the last content always scrolls clear of it, and on phones the first screen ends exactly at the dock. Quick repeated taps on Next or Previous count on from the section being travelled to | Must |
| NAV-2 | **Desktop — every section in the header** (≥ 1200 px): the section names as links, the current one in gold with a filled diamond. Between 1024 and 1200 px the header's Sections button opens the index. (Replaces the 1.3 side rail, which sat on the hero's left tower and was unreadable over the green bands) | Must |
| NAV-3 | **Top header** (all sizes): the full name in gold (tap = back to top; no monogram), Sections (opens the index; replaced by the section links on wide screens), Resume PDF. Opaque parchment, on the same outer margins as the page | Must |
| NAV-4 | Active section is tracked automatically while scrolling (IntersectionObserver) and reflected in dock/rail | Must |
| NAV-5 | URL hash updates while scrolling using `replaceState` (no history spam); tapping a nav item uses `pushState` so the **browser/OS Back button returns to the previous section** | Must |
| NAV-6 | Opening a project or certificate pushes a history entry, so **Android back gesture / browser Back closes the overlay** instead of leaving the site | Must |
| NAV-7 | ~~"Next: [Section]" link at the end of each section~~ — removed in 1.4 at Ahmad's request (the dock's Next does the job) | — |
| NAV-8 | Deep links work on first load (e.g., sending `/#projects` to a recruiter) | Must |
| NAV-9 | ~~Scroll-progress bar~~ — dropped: the dock's "3 of 7" and the header's current section already do the job | — |
| NAV-10 | Keyboard shortcuts on desktop: `J`/`K` next/previous section, `1–7` jump to section, `Esc` closes overlays | Could |
| NAV-11 | "Back to top" affordance after scrolling past the hero | Should |

---

## 6. Functional Requirements by Section

### 6.1 Hero / Summary
| ID | Requirement | Priority |
|---|---|---|
| HERO-1 | Full name and the CV's summary (the summary says what he does; the separate title and tagline were removed in 1.4 because all three said the same thing). One `h1`, the name, on one line at every width | Must |
| HERO-2 | The theme image's banner (no photo of Ahmad): the name in gold Castoro between two star dividers, on parchment, flanked by Najdi mud-brick towers over a palm-grove landscape cut from the theme image. The dividers draw out from their stars and the name rises from behind a mask on load, settled by 1.2 s. No WebGL | Must |
| HERO-3 | On the green band under the banner: **Download resume** (gold, the one primary button) and **Contact me** (outlined) | Must |
| HERO-4 | ~~Quick-stats ("In numbers")~~ — removed in 1.4 at Ahmad's request | — |
| HERO-5 | ~~Availability badge~~ — removed (not needed) | — |
| HERO-6 | Quick links on the band beside the buttons: Email, LinkedIn, GitHub, each with its icon | Must |

### 6.2 Experience
| ID | Requirement | Priority |
|---|---|---|
| EXP-1 | Vertical timeline, newest first: role, company (and note), dates as on the CV (`02/2025 – Present`), and for past roles an **auto-computed duration in full words**, end month minus start month ("4 years", "6 months", "1 year 2 months"). The current role shows no duration | Must |
| EXP-2 | 3–5 impact-focused bullets per role (metrics where possible) | Must |
| EXP-3 | Skills per role as a line of italic names separated by small gold diamonds | Must |
| EXP-4 | Timeline spine (a bar of 4 px or more, never a hairline) "draws" as the user scrolls, linked to the scrollbar; entries arrive heading → text → tags, staggered, once | Should |
| EXP-5 | ~~"Show more" on long entries~~ — removed in 1.4: every point of every role is shown | — |
| EXP-6 | Links from an experience entry to related projects | Could |

### 6.3 Projects (showcase section)
| ID | Requirement | Priority |
|---|---|---|
| PRJ-1 | Project card: title, one-line pitch, my role, skill tags, cover screenshot. No resting shadow; separated from the ground by a tone step | Must |
| PRJ-2 | **Screenshots by project type**: each project declares its type (mobile app / web / dashboard). Mobile-app screenshots sit in a plain rounded-rectangle phone frame drawn in CSS (no notch, buttons or glare). Web and dashboard screenshots are shown unframed: no browser chrome, square corners, on a surface tone. No shadows, no image mock-ups | Must |
| PRJ-3 | **Layout:** one column of cards below 1024 px (a sideways row read as clipped), two columns from there; each card's screenshots sit on a green panel with a gold fillet and cycle in place on tap with a plain "2 of 5" count. No tilted or fanned stacks | Must |
| PRJ-4 | ~~Desktop scroll-driven showcase~~ — dropped in 1.4 with the split stage; the card grid serves every width | — |
| PRJ-5 | Tapping a card opens a **Project Detail overlay** via shared-element transition (the card morphs into the overlay). Full-screen sheet on mobile, centered modal on desktop | Must |
| PRJ-6 | Detail content: overview, problem, my role & contributions, key features, tech stack, impact/results, screenshot gallery, links (Live demo, GitHub, Case study) — each link optional | Must |
| PRJ-7 | **Screenshot lightbox:** full screen, swipe between images, pinch-to-zoom / double-tap zoom, captions, image counter, close via swipe-down, ✕, Esc, or Back | Must |
| PRJ-8 | ~~3D tilt / pointer spotlight on cards~~ — dropped in 1.3 (the design skill bans hover lift on every card, spotlight glows and cursor effects). Cards get one small, consistent hover response instead | — |
| PRJ-9 | Filter projects by technology (tags); also triggered from Skills section | Could |
| PRJ-10 | "Confidential (NDA)" note, set as plain text in the text face (not a pill badge), for projects where code/links can't be shared | Should |
| PRJ-11 | Featured flag to pin top projects first | Should |
| PRJ-12 | **Placeholders until real projects arrive:** placeholder entries carry `placeholder: true`, show a small visible "Placeholder" note, use only facts already in the Experience section (no invented metrics, links or results), and show placeholder screenshots: a screenshot entry without `src` is drawn as a title card in HTML/CSS at the real ratio (phone ≈ 9:19.5, desktop ≈ 16:10), in the page's palette and type, saying the screenshot is to come — never a grey box. The build lists every remaining placeholder; none may remain at launch | Must |

### 6.4 Skills
| ID | Requirement | Priority |
|---|---|---|
| SKL-1 | The CV's two groups, **Product** and **Technical**, with the CV's skills, on a green band | Must |
| SKL-2 | Skills set as flowing lines of text separated by gold diamonds (no cards, no tags, no icons); no note of where a skill was used; **no percentage bars** | Must |
| SKL-3 | Groups arrive row by row (50–90 ms stagger), once | Should |
| SKL-4 | ~~Tapping a skill shows where it was used~~ — dropped in 1.4 at Ahmad's request | — |

### 6.5 Education
| ID | Requirement | Priority |
|---|---|---|
| EDU-1 | Exactly as the CV: program or degree (with the note, e.g. "(200 hours)"), dates, institution (with its note). No paragraphs, no picture | Must |
| EDU-2 | Graduation/capstone project with link to its entry in Projects (optional) | Could |

### 6.6 Certifications
| ID | Requirement | Priority |
|---|---|---|
| CRT-1 | Each certificate in a frame (green moulding, parchment mat, gold star at the top) that matches the identity, with name, issuer, issue date, status and credential ID. Images in `public/certificates/` (`pspo-i.webp`, `psm-i.webp`, rendered from the Scrum.org PDFs and cropped to the certificate edges) | Must |
| CRT-2 | Tap opens the certificate image in the **lightbox** (zoom, swipe to next/previous certificate) | Must |
| CRT-3 | "Verify" button linking to the issuer's credential URL when available. Scrum.org shows the holder's name and date only after the visitor enters the holder's email, so show the `verifyNote` hint plus a copy-email button beside "Verify" | Must |
| CRT-4 | Status as plain text: Active / Expired (computed from expiry date; both current certificates never expire) | Should |
| CRT-5 | Featured certificates shown first; "Show all" if more than 6 | Should |
| CRT-6 | Filter by issuer or category | Could |

### 6.7 Contact & Footer
| ID | Requirement | Priority |
|---|---|---|
| CON-1 | Full name, email (`mailto:`), LinkedIn, GitHub, Resume PDF. Phone (`tel:`) only if `profile.phone` is set — decided: phone **not** shown, it lives in the PDF | Must |
| CON-2 | **Copy** button for email (and phone, if shown) with animated checkmark + toast "Copied" | Must |
| CON-3 | Resume PDF at `public/resume/Ahmad-Almudhi-Resume.pdf`: opens in a new tab and offers download (`download="Ahmad-Almudhi-Resume.pdf"`) | Must |
| CON-4 | **Save contact (vCard)** button — adds me to the interviewer's phone contacts in one tap | Should |
| CON-5 | **Share / QR mode:** button that shows a large QR code of the site URL + "Copy link" — so an in-person interviewer can open it on their own phone | Should |
| CON-6 | WhatsApp quick-chat link | Could |
| CON-7 | Footer as a designed close: the banner again (name between star dividers, towers and palm groves), then a green band with © year and the last-updated date. The Contact section opens with "Feel free to contact me at any time." (no role or product named) | Should |

### 6.8 Global
| ID | Requirement | Priority |
|---|---|---|
| GLB-1 | ~~Light & dark themes~~ — replaced in 1.4: one theme, the identity's colours, at every system setting (`color-scheme: light`) | — |
| GLB-2 | Custom 404 page in the same design | Should |
| GLB-3 | Print stylesheet (or redirect "Print" to the PDF) | Could |
| GLB-4 | Installable as an app (PWA) with the gold star icon on green; **works offline** after first visit, including images and the PDF | Should |
| GLB-5 | Privacy-friendly analytics: visits, section views, resume downloads, outbound link clicks | Should |
| GLB-6 | Optional `?ref=company-name` tracking param to know which recruiter's link was opened | Could |

---

## 7. Design System & Visual Direction

**Source of truth:** colours, type and ornament come from Ahmad's theme image (`docs/content_files/my_theme.png`); the `design-taste-frontend` skill's house rules, motion and gates (`lint.mjs`, `inspect.mjs` at 1440 / 768 / 390 px) cover the rest. The draw's palette and type no longer apply. The gate runs with `--allow gradient-text,font-not-dealt,palette-cream,covered-text` (the gold name, Castoro, the cream text on the band, and text passing under the fixed dock mid-scroll).

**Personality:** modern, calm, confident, precise. Premium through scale, space and substance — not decoration. Restraint is not emptiness: type set large, whole fields of colour, and every section carrying its full content.

| Element | Direction |
|---|---|
| **Typography** | One face, **Castoro** (Tiro Typeworks, OFL; regular and italic), the closest match to the name in the theme image, self-hosted with `next/font/google`. The name and headings in gold; body 20 px at 45–75 characters per line; italic for companies, places and skill lines. Every headline ≤ 2 lines at every width. Fluid sizes with `clamp()` |
| **Color** | Sampled from the theme image: parchment ground `#dfcdb7` (with a faint paper grain), deep green `#1c2c23` for ink and bands, gold `#8a5f18` for headings and ornaments on parchment, light gold `#d6bd8a` and bright gold `#c9a24f` on green, cream `#efe4d2` for text on green. One theme only |
| **Layout** | One 12-column grid with one pair of tight, equal outer margins (16–32 px); large things run to the edges and only text measure is constrained (no reflex 1200 px container; cap the layout around 1760–1920 px). Sections 120–240 px apart on desktop, 72–112 px on phones. Neighbouring sections never share a layout; no card grids, no bento. Every section opens with a heading; no blank stretch taller than half a screen |
| **Surfaces** | Parchment sections and green bands; the bands carry the theme's two gold rules inside both edges. No glass or backdrop blur. Shadows only on what truly floats (sheet, modals, lightbox, toasts) and the name's embossed edge |
| **Radius** | 2 px everywhere (nearly square). Pictures square (the CSS phone frame of PRJ-2 is the one exception) |
| **Icons** | Lucide (outline) for controls (copy, close, chevrons, download, mail) plus the LinkedIn and GitHub marks. The eight-point star from the theme image is the one ornament. No icon-topped cards, no emoji |
| **Imagery** | The theme image's towers and landscape (cut by `scripts/cut-theme.mjs`); mobile-app screenshots in a plain rounded-rectangle CSS phone frame and web/dashboard screenshots unframed, both on green panels; certificates in their frames. No found photographs |
| **Labels** | No eyebrow labels, no tiny letter-spaced capitals, no pill badges, no monospace outside code, no 01 / 02 / 03 numbering (plain "3 of 7" where a count helps), no styled accent word in a headline |
| **Tokens** | All colors, spacing, the radius, durations and easings defined as design tokens (CSS variables), named after the skill's roles (`--bg`, `--surface`, `--ink`, `--muted`, `--accent`, `--accent-ink`; motion tokens from the skill's `references/motion.md` §4) |

### 7.1 States for every interactive element
Every button, link, tag, card and input defines: **default, hover (desktop, behind `(hover: hover)`), pressed, focus-visible, disabled, loading** (where relevant). Hover raises contrast and never changes font weight. Examples:
- Buttons: flat, one fill colour; press scale ≈ 0.97 (140 ms); colour shift on hover (180 ms).
- Links: underline colour fades in on hover; offset clears the descenders.
- Copy buttons: icon morphs to a checkmark, toast slides in.
- Nav active indicator: slides between items (shared layout animation).
- Focus: a visible 2 px gold outline, offset from the element.
- Images: blur-up placeholder → sharp image fade-in, on a ground-coloured container (no grey skeleton boxes).

---

## 8. Motion Guidelines

Follows the design skill's `references/motion.md`; its tokens are the source of truth.

| Rule | Detail |
|---|---|
| **Purposeful** | Motion explains hierarchy and continuity (where something came from / went). Never decorative noise |
| **Durations** | Press 140 ms · hover colour 180–200 ms · hover that moves 300–400 ms · menus and sheets 240 ms · dialogs 250–450 ms · section reveals 700–900 ms · picture openings 1,100–1,300 ms · exits 60–70 % of the matching entrance |
| **Easing** | Tokens: `--ease-out` (under 600 ms), `--ease-expo` (reveals of 800 ms or more), `--ease-in-out` (things that travel, wipes), `--ease-exit` (leaving for good), `linear` for scroll-linked motion, plain `ease` for colour. Gesture-driven motion (drag, swipe-to-close) may use springs, critically damped — no overshoot, bounce or elastic anywhere |
| **Stagger** | Lines 80–110 ms · list items 50–90 ms · characters 20–40 ms only in a heading of one to three words · four steps at most per sequence |
| **Choreographed, not uniform** | Each section's parts arrive in reading order (heading, text, picture, details), rising 12–32 px or from a line mask. Never the same fade-up on every block |
| **Once** | Scroll reveals play **once** per session, firing when the element's top is 85–90 % down the viewport — re-scrolling must not re-animate everything |
| **Never block reading** | The first screen (name, title, summary, primary button) is in the HTML and readable on first paint; the load sequence is settled by 1.2 s with four elements at most. Nothing in view stays hidden for more than 900 ms. Content stays visible without JavaScript: hidden start states apply only when JS runs and reduced motion is off. No preloader, no gate |
| **No scroll-jacking** | Native scroll speed; scroll-linked effects only *react* to scroll. Optional Lenis smoothing on desktop only (lerp 0.1–0.14), off for touch and reduced motion. No custom cursor |
| **Performance** | Animate only `transform`, `opacity` and `clip-path`. Target 60 fps on mid-range Android. Loops pause off screen |
| **Reduced motion** | If `prefers-reduced-motion` is on: the finished state is shown; keep opacity/colour changes, drop travel, scale, parallax and roll-ups |
| **Signature moments** | One signature move: the hero's dividers drawing out from their stars as the name rises. Supporting moments: the project card → detail morph (a UI transition) and the experience timeline drawing with the scrollbar. Nothing moves across text being read |

---

## 9. Responsive Behavior (Mobile-First)

| Breakpoint | Width | Layout |
|---|---|---|
| Base (mobile) | < 640 px | Its own composition, not the desktop squeezed: single column; margins 16–20 px; bottom dock navigation; the banner and its band fill the first screen; full-screen overlays; pictures first at full width; safe-area insets respected (notch / home indicator) |
| `sm` | ≥ 640 px | Larger type; line breaks re-authored |
| `md` (tablet) | ≥ 768 px | Larger type in the same centred column; project panels go landscape; the contact buttons two by two; overlays become large sheets |
| `lg` (laptop) | ≥ 1024 px | The dock goes; the towers flank the name; two-column project cards; centered modals; hover effects enabled. From 1200 px the header lists every section |
| `xl` | ≥ 1280 px | Type keeps scaling with `clamp()`; layout capped around 1760–1920 px; outer margins stay tight and equal |

**Test matrix:** iPhone SE (375 px), iPhone 16 (393 px), Pixel (412 px), iPad (portrait & landscape), 1366×768 laptop, 1440×900, 1920×1080. Browsers: iOS Safari, Android Chrome, desktop Chrome, Safari, Edge, Firefox (latest 2 versions).

**Touch rules:** tap targets ≥ 44×44 px; hover-only features have tap equivalents; no horizontal page overflow; swipe gestures never conflict with the browser's edge-swipe back gesture.

---

## 10. Non-Functional Requirements

### 10.1 Performance
| Metric | Target (mobile, 4G, mid-range device) |
|---|---|
| Largest Contentful Paint | ≤ 2.0 s |
| Cumulative Layout Shift | < 0.05 |
| Interaction to Next Paint | < 200 ms |
| Lighthouse (mobile) | Performance ≥ 95; Accessibility & Best Practices = 100; SEO passes every audit except the intentional "blocked from indexing" one |
| Initial JS (gzipped) | ≤ 150 KB |
| Images | AVIF/WebP, responsive sizes, lazy-loaded below the fold, blur placeholders |
| Fonts | Self-hosted, subset, `font-display: swap`, no layout shift |

### 10.2 Accessibility (WCAG 2.2 AA)
- Semantic landmarks and heading order; skip-to-content link.
- Full keyboard navigation; visible focus rings; focus trapped in overlays and restored on close.
- Meaningful `alt` text for every screenshot and certificate.
- Color contrast ≥ 4.5:1 for all text.
- Respect reduced-motion preference (see §8).
- Screen-reader announcements for "Copied" toasts and section changes.

### 10.3 SEO & Link Sharing
- Title, meta description, canonical URL.
- **Open Graph / Twitter card image** cut from the theme image (`public/og.jpg`, the name between the dividers over the landscape) so links look professional in LinkedIn, WhatsApp, email and Slack previews.
- **Not indexed by search engines (decided):** `<meta name="robots" content="noindex, nofollow">` on every page. `robots.txt` must **not** block crawlers from the pages: link-preview bots (LinkedIn, WhatsApp, Slack) need to fetch the page to show the preview image, and search engines must be able to read the page to see the `noindex` tag. The one exception is `Disallow: /resume/`: a PDF can't carry a `noindex` tag on GitHub Pages (no custom headers), and the PDF holds the phone number. Link previews don't need the PDF.
- No `sitemap.xml` and no JSON-LD structured data (no value when the site isn't indexed).
- Favicon and app icons: the gold star on green (`scripts/make-icons.mjs`).

### 10.4 Privacy & Security
- Email and phone not present as plain text in the static HTML (assembled client-side) to reduce scraping/spam. (The repository is public, so these values are still visible in the source on GitHub — see §16.)
- No third-party trackers or cookies; privacy-friendly analytics only.
- Screenshots reviewed and **redacted** for client/employer confidential data.
- Resume PDF: no home address, no ID number or date of birth. Its metadata holds only the author name, the title "Ahmad Almudhi - Resume" (shown as the browser-tab title when the PDF opens), the subject and creation dates — nothing private (checked 30 Oct 2026). The phone number stays in the PDF (decided: recruiters need it), is never in the site's HTML, and the PDF is kept out of search by `robots.txt`.
- HTTPS enforced (GitHub Pages setting). GitHub Pages doesn't allow custom response headers, so Content-Security-Policy and Referrer-Policy are set with `<meta>` tags in the page head. If full header control is ever needed, put Cloudflare (free plan) in front of a custom domain.

### 10.5 Reliability
- Fully static site served by GitHub Pages' CDN — no server, nothing to go down at interview time.
- Offline support via service worker (GLB-4).

---

## 11. Content Model

All content lives in typed files under `/content`, validated at build time (a typo or missing field fails the build instead of breaking the site).

```ts
// content/types.ts (illustrative)
type Profile = {
  fullName: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone?: string;         // omitted = phone not shown on the site
  siteUrl: string;        // used for the QR code and link previews
  links: { linkedin: string; github: string; resumePdf: string; whatsapp?: string };
  sectionOrder: SectionId[];
};

type Experience = {
  company: string;
  role: string;
  note?: string;          // e.g., "Tamheer program"
  location?: string;
  start: string;          // "2023-02"
  end?: string;           // undefined = "Present"
  highlights: string[];   // impact bullets, all shown
  skills: string[];       // skill ids
  relatedProjects?: string[];
};

type Project = {
  slug: string;
  title: string;
  tagline: string;
  kind: "mobile" | "web" | "dashboard" | "other"; // mobile = plain CSS phone frame; others unframed
  role: string;
  featured?: boolean;
  confidential?: boolean;
  placeholder?: boolean;  // true until the real project is supplied (PRJ-12); none at launch
  overview: string;
  problem?: string;
  contributions: string[];
  features?: string[];
  impact?: string[];
  skills: string[];
  screenshots: { src: string; alt: string; caption?: string }[];
  links?: { live?: string; github?: string; caseStudy?: string; video?: string };
};

type Certification = {
  name: string;
  shortName?: string;     // e.g., "PSM I"
  issuer: string;
  issued: string;         // "YYYY-MM" or "YYYY-MM-DD"
  expires?: string;       // omitted = never expires
  credentialId?: string;
  verifyUrl?: string;
  verifyNote?: string;    // helper text next to the Verify button
  image: { src: string; alt: string };
  featured?: boolean;
};

type Education = {
  degree: string;         // degree or program name
  institution: string;
  institutionNote?: string; // e.g., "Saudi Federation for Cybersecurity, Programming & Drones"
  note?: string;          // e.g., "200 hours"
  location?: string;
  start: string;
  end?: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
};

type SkillGroup = {
  id: string;
  category: string;       // "Product" | "Technical", as on the CV
  skills: string[];
};
```

---

## 12. Asset Guidelines

| Asset | Guideline |
|---|---|
| **Project screenshots** | PNG source at 2× resolution; consistent aspect ratio per project type (phone ≈ 9:19.5, desktop ≈ 16:10); clean demo data; sensitive info redacted; 3–6 per project; the build pipeline converts to AVIF/WebP |
| **Certificate images** | High-res export (≤ 2400 px long edge), cropped to the certificate edges, straight (not a photo at an angle); PNG or JPG. Done: `public/certificates/pspo-i.webp` and `psm-i.webp` (≈ 2250 × 1711, WebP), rendered from the PDFs in `docs/content_files/` |
| **Resume PDF** | < 1 MB, text-selectable (not scanned), content consistent with the site, named `FirstName-LastName-Resume.pdf`. Done: `public/resume/Ahmad-Almudhi-Resume.pdf` (24 KB), copied from `docs/content_files/Ahmad_Almudhi-Resume.pdf` |
| **Placeholder screenshots** | Until real screenshots exist (PRJ-12): screenshot entries without `src`, drawn as HTML title cards at the real ratios in the page's palette and type. Replaced by adding `src`, `width` and `height` for each real, redacted screenshot in `public/projects/<slug>/` |
| **Logos (optional)** | SVG company/issuer logos, used monochrome to keep the design consistent |

---

## 13. Recommended Tech Stack

### 13.1 Summary

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Next.js 16 (App Router)** with **static export** (`output: 'export'`) | The build produces a plain `out` folder of HTML/CSS/JS that GitHub Pages serves directly → instant first paint, great link previews/SEO; built-in font optimization; huge ecosystem |
| **Language** | **TypeScript** (strict) | Typed content model catches mistakes when updating the resume |
| **Styling** | **Tailwind CSS v4** | CSS-first `@theme` tokens map directly to the design system; fast to build responsive mobile-first layouts |
| **Animation** | CSS (the design skill's motion tokens and recipes), CSS scroll timelines and the View Transitions API for the card → detail morph; **Motion for React** only if a gesture needs it | The browser does the work: zero or near-zero JavaScript for reveals, scroll-linked effects and the shared-element morph, reduced motion handled in CSS, well inside the 150 KB JS budget |
| **Carousels** | Native `overflow-x` + scroll snap first; **Embla Carousel** only where native snap falls short | Native rows work with touch, trackpad and keyboard at zero JS; Embla is tiny and touch-first |
| **Overlays** | Native **`<dialog>`** with `showModal()` | Focus trap (the rest of the page goes inert), Esc to close, focus returned to the opener, top layer — with zero added JavaScript |
| **Lightbox zoom** | Custom lightbox on a native `<dialog>` with pointer events (swipe, pinch, double-tap, swipe-down to close) — built | Pinch/double-tap zoom on screenshots and certificates, no library weight |
| **Smooth scrolling** | **Lenis** — desktop only, optional | Polished wheel scrolling on laptops; mobile keeps native scrolling |
| **Icons** | **Lucide** for controls (+ Simple Icons for tech/brand logos where they inform) | Consistent, tree-shakeable |
| **Fonts** | Castoro (OFL), downloaded by `next/font/google` at build and served from the site | Zero layout shift, no external requests at runtime, works offline and under the CSP |
| **Art direction & design QA** | **`design-taste-frontend` skill** (vendored in `.agents/skills/`, MIT): `lint.mjs` scans source, `inspect.mjs` renders the built `out/` in Chrome at 1440 / 768 / 390 and measures the house rules | Decisions instead of defaults; rules checked rather than hoped for |
| **Images** | Build-time optimization script with **sharp** (`scripts/optimize-images.mjs`) and a `<Picture>` component | Next.js's on-demand image optimizer needs a server, so a script writes AVIF/WebP at several widths before the build; each picture loads on a ground of its own average colour |
| **Content validation** | **Zod** | Fails the build on invalid/missing content |
| **OG images** | Static `public/og.jpg` cut from the theme image by `scripts/cut-theme.mjs` | Branded link-preview image |
| **Offline / PWA** | **Workbox** (`generateSW` run on the exported `out` folder) + web app manifest | Precache pages, images and PDF for offline interviews; works with any static host |
| **QR code** | `qrcode.react` | Share/QR mode |
| **Quality** | ESLint + Prettier (or Biome), **Playwright** (e2e + mobile viewports), **Lighthouse CI**, the design skill's `lint.mjs` | Guard performance, accessibility and design budgets on every push |
| **Hosting** | **GitHub Pages** (free, public repo) at `https://ahmadalmudhi.github.io` — no custom domain | Code and site in one place; the repo doubles as a portfolio piece; free HTTPS; limits far above a resume site's needs (see §13.4) |
| **Analytics** | GoatCounter (script tag), built in and switched off until a site code is set in `content/profile.ts` | Cookie-free, privacy-friendly; works on any static host; free for personal sites |
| **Source control / CI/CD** | GitHub + **GitHub Actions** | Every push to `main` runs checks, builds and deploys to Pages automatically |

### 13.2 Alternatives considered

| Option | Verdict |
|---|---|
| **Astro 6 + React islands** | Strong alternative: ships the least JavaScript. Not chosen because almost every section is interactive/animated and cross-section features (shared-element transitions, skill → project filtering, global nav state) are simpler inside one React tree. Choose Astro if minimum bundle size matters more than animation richness |
| **Vite + React SPA** | Works, but loses static pre-rendering (slower first paint, weaker link previews/SEO) and built-in image optimization |
| **GSAP (ScrollTrigger)** | Excellent for complex timelines; can be added later for one pinned showcase if Motion isn't enough. Motion fits React's component model better as the primary library |
| **Three.js / WebGL hero** | Rejected: heavy on mid-range phones, hurts LCP and battery for little professional value |
| **Headless CMS** | Unnecessary for one editor; a typed content file is faster, versioned in Git, and free |
| **Vercel hosting** | Easiest Next.js host (on-demand image optimization, a preview link per change, custom headers). Not chosen, to keep everything on GitHub. Because the site is a static export, moving to Vercel later needs no code changes — it deploys from the same repo |

### 13.3 Proposed project structure
```
/.github/workflows
  deploy.yml            # test → build → deploy to GitHub Pages
/scripts
  optimize-images.mjs   # sharp: AVIF/WebP sizes + blur placeholders
next.config.ts          # output: 'export'
/app
  layout.tsx            # fonts, theme, metadata, providers
  page.tsx              # composes sections in configured order
  opengraph-image.tsx   # generated link-preview image
  not-found.tsx
/components
  /nav                  # Header (with the wide-screen section links), Dock, IndexSheet
  /sections             # Hero, Experience, Projects, Skills, Education, Certifications, Contact
  /ui                   # Button, Tag, Card, Toast, CopyButton, PhoneFrame, Lightbox
  /motion               # Reveal, Stagger, CountUp, presets (durations, springs)
/content
  profile.ts experience.ts projects.ts skills.ts education.ts certifications.ts
  schema.ts             # Zod schemas
/public
  /projects/<slug>/*.png        # real screenshots; placeholders are drawn in HTML until then
  /certificates/pspo-i.webp psm-i.webp
  /resume/Ahmad-Almudhi-Resume.pdf
  robots.txt                    # Disallow: /resume/ only
/lib                    # date/duration utils, active-section hook, history/hash sync
/styles/globals.css     # Tailwind @theme tokens
/tests                  # Playwright specs
```

### 13.4 Hosting & Deployment — GitHub Pages

**URL options**

| Option | URL | Notes |
|---|---|---|
| **User site — chosen** | `https://ahmadalmudhi.github.io` | Repo `AhmadAlmudhi/AhmadAlmudhi.github.io` (name still free on 30 Oct 2026; local remote `origin` points to it), public, Pages source set to GitHub Actions so nothing publishes until the deploy workflow exists; site is served at the root, no `basePath` needed. Each account gets only one user site |
| Project site | `https://<username>.github.io/<repo>` | Requires `basePath: '/<repo>'`; asset paths and service-worker scope must include the repo name |
| Custom domain (not planned) | e.g., `https://firstname-lastname.dev` | Set in Settings → Pages, add DNS records at the registrar, tick **Enforce HTTPS**. Works with either repo type and removes the need for `basePath` |

**Next.js config**

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',               // generate static files into /out
  trailingSlash: true,            // clean URLs on GitHub Pages
  images: { unoptimized: true },  // images are pre-optimized by scripts/optimize-images.mjs
  // basePath: '/<repo>',         // only for a project site without a custom domain
};

export default nextConfig;
```

**Deployment pipeline (GitHub Actions, on every push to `main`)**
1. Check out code, set up Node (LTS), install dependencies (cached).
2. Lint, type-check, run Playwright tests.
3. Optimize images → `next build` (outputs `/out`) → generate the service worker into `/out`.
4. Run Lighthouse CI against `/out`; fail the run if the budgets in §10.1 aren't met.
5. Upload `/out` as the Pages artifact and deploy with GitHub's official Pages actions.

Repository setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

**GitHub Pages limits (all far above this site's needs)**
- Published site ≤ 1 GB (target for this site: `/out` < 50 MB); soft bandwidth limit 100 GB/month; deployments time out after 10 minutes.
- On the free plan the repository must be **public** (private requires GitHub Pro).
- Personal, non-commercial use only — a resume site qualifies.

**Trade-offs accepted vs. Vercel**
- No preview link per change → preview locally by serving the `out` folder after `next build`, and merge changes through pull requests that run the test workflow first.
- No custom response headers → CSP and Referrer-Policy via `<meta>` tags (§10.4).
- No on-demand image optimization → build-time image script (§13.1).

---

## 14. Milestones

| Phase | Deliverables |
|---|---|
| **0. Content** | Done except projects: text for all other sections, certificate images, final PDF resume. Projects and their screenshots come last (placeholders until then, PRJ-12). Accent colour and fonts are dealt in Phase 1 |
| **1. Foundation** | Repo (connected 30 Oct 2026), design-skill run up to the copy deck (inventory, argument, direction draw → palette, type, section blueprints), Next.js + Tailwind + Motion setup, design tokens, light/dark themes, content schema, header + bottom dock + side rail with hash/history sync, deploy pipeline to GitHub Pages via GitHub Actions |
| **2. Core sections** | Hero, Experience timeline, Skills, Education, Contact (copy buttons, vCard, PDF), each from its dealt blueprint and passing the skill's gate |
| **3. Showcases** | Projects (with placeholders): phone frames, mobile swipe row, desktop scroll showcase, detail overlay, lightbox. Certifications + lightbox |
| **4. Motion polish** | Signature animations, micro-interactions for all elements, reduced-motion variants |
| **5. Hardening** | Done 30 Oct 2026: Lighthouse mobile performance 0.97, accessibility 1, best practices 1, CLS 0 (LCP 2.6 s simulated, bound by the web font; kept `font-display: swap`); initial JS 149 KB gz; OG image and monogram icons; designed 404; PWA with offline after one visit (tested); CSP and referrer policy via `<meta>`; analytics built and off until a provider is chosen. Still to do by Ahmad: real-device testing on his phone |
| **5b. Identity (1.4)** | Done 30 Oct 2026: redesign to Ahmad's theme image and his list of changes (see the 1.4 change note); Lighthouse mobile performance 0.96, accessibility 1, best practices 1, CLS 0 (LCP 2.8 s simulated: the JS bundle's download and evaluation under throttling; observed LCP is the first paint); initial JS 147 KB gz; design gate 0 FAIL at 1440/768/390 with the identity allow-list |
| **6. Real projects** | **Next, with Ahmad's material.** Replace every placeholder project and screenshot with the real content and redacted screenshots; re-run the design gate with `--have product-ui` |
| **7. Launch** | Done: live at `https://ahmadalmudhi.github.io`, HTTPS enforced, repo README written. Left for Ahmad: open the site once on his phone (offline cache) and keep the QR one tap away; add the link to LinkedIn, GitHub and the PDF resume once the real projects are in |

---

## 15. Acceptance Criteria (Definition of Done)

- [ ] All 7 sections render from the content files; changing a content file and redeploying updates the site.
- [ ] On a 375 px phone, any section is reachable in ≤ 2 taps from anywhere on the page.
- [ ] Previous/Next controls move between sections in order; browser/OS Back returns to the previously viewed section and closes open overlays.
- [ ] Deep link `/#projects` (and a project deep link) opens in the correct place on first load.
- [ ] Every project opens a detail overlay with a swipeable, zoomable screenshot gallery.
- [ ] Every certificate opens full screen with zoom; "Verify" works where a URL exists.
- [ ] Email/phone copy buttons work on iOS Safari and Android Chrome; vCard imports correctly on both.
- [ ] Resume PDF opens and downloads with the correct file name.
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility/Best Practices = 100, SEO passes every audit except the intentional noindex.
- [ ] Every page carries the `noindex` tag, and link previews still work in LinkedIn and WhatsApp.
- [ ] No layout shift or horizontal overflow at any breakpoint in the test matrix.
- [ ] With reduced motion enabled, no parallax, tilt or large movement occurs.
- [ ] After one visit, the site (including images and PDF) loads in airplane mode.
- [ ] Sharing the URL in WhatsApp/LinkedIn shows the branded preview image.
- [ ] A push to `main` tests, builds and deploys to GitHub Pages automatically; a failing test or Lighthouse budget blocks the deploy.
- [ ] The site loads at its final URL over HTTPS, and the custom 404 page is served for unknown paths.
- [ ] Every interactive element has hover (desktop), pressed, and focus-visible states.
- [ ] The design skill's gate passes on the built `out/`: `lint.mjs` and `inspect.mjs` (with the identity allow-list, §7) report 0 FAIL at 1440, 768 and 390 px, and the last critique round is written down (`references/critique.md` §4).
- [ ] No placeholder project or screenshot remains (`placeholder: true` count is zero).
- [ ] `robots.txt` disallows only `/resume/`; the phone number appears nowhere in the site's HTML.

---

## 16. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Too much animation feels gimmicky or slows phones | Motion guidelines (§8), 2–3 signature moments only, 60 fps testing on a mid-range Android |
| Large screenshots slow the site | Automatic AVIF/WebP + responsive sizes + lazy loading; asset guidelines (§12) |
| Bad Wi-Fi during an interview | PWA offline cache; open the site once before the interview |
| Confidential data in screenshots | Redaction checklist; a plain-text "Confidential (NDA)" note instead of links |
| Spam from public email/phone | Client-side assembly of contact details; no phone in structured data |
| Interviewer gets lost on an unfamiliar device | Dock with section name + Prev/Next + index sheet, always on screen; a Sections button in the header (every section listed on wide screens); tested with real users |
| Content goes stale | Single content source, "Last updated" date in footer |
| Public repo exposes contact details and assets | Contact info is public on the site anyway; keep the resume PDF free of home address; never commit anything I wouldn't show on the site |
| Unredacted screenshot committed by mistake (stays in Git history even after deletion) | Keep original screenshots outside the repo; commit only redacted exports; review images in each pull request |
| GitHub Pages outage right before an interview | Offline cache on my phone; the same repo can be deployed to Vercel or Netlify in minutes |
| Placeholder projects seen by a recruiter before the real ones are added | Visible "Placeholder" note on each; only real Experience facts used; build lists remaining placeholders; don't share the link until Phase 6 is done |
| Phone number in the public PDF attracts spam calls/messages | Accepted (recruiters need it). Kept out of the HTML; `robots.txt` keeps the PDF out of search; if spam becomes a problem, swap to a secondary or WhatsApp Business number in the PDF |

---

## 17. Open Questions

1. ~~**Language**~~ **Decided:** English only.
2. ~~**URL**~~ **Decided:** `https://ahmadalmudhi.github.io` (repo `AhmadAlmudhi.github.io`), no custom domain.
3. ~~**Brand**~~ **Decided (30 Oct 2026):** Ahmad's theme image is the identity (colours, Castoro, ornaments, towers); it replaced the draw's accent and fonts in 1.4.
4. ~~**Section order**~~ **Decided:** Experience before Education.
5. ~~**Search visibility**~~ **Decided:** not indexed (`noindex`), link-only.
6. **Projects:** Which projects to include, and which are confidential (screenshots only, no links)? **Decided for now:** placeholders (PRJ-12) until I add the real content and screenshots after everything else is finished.
7. ~~**Phone visibility**~~ **Decided:** email only on the site; phone only in the resume PDF.
8. **Analytics:** Do I want per-recruiter tracking links (`?ref=`)?
9. ~~**Resume PDF**~~ **Done:** `public/resume/Ahmad-Almudhi-Resume.pdf`.
10. ~~**Design conflicts**~~ **Decided (30 Oct 2026):** the design skill wins on every visual decision; this document was updated to match (v1.3). **Superseded the same day (v1.4):** Ahmad's theme image decides the identity; the skill decides the rest.
