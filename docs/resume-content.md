# Resume Content — Ahmad Almudhi

Content for the interactive resume site.

**Site URL:** https://ahmadalmudhi.github.io

---

## Progress

| Section | Text | Images / files |
|---|---|---|
| Profile & summary | ✅ Done | — |
| Experience | ✅ Done (3 roles) | — |
| Projects | ⏳ Placeholders on the site until you add them (everything else is finished and live) | ⏳ Placeholder screenshots until you add the real ones |
| Skills | ✅ Done (2 groups, 16 skills) | — |
| Education | ✅ Done (2 entries) | — |
| Certifications | ✅ Done (2, with verification links) | ✅ `public/certificates/pspo-i.webp`, `psm-i.webp` (from the PDFs in `docs/content_files/`) |
| Resume PDF | — | ✅ `public/resume/Ahmad-Almudhi-Resume.pdf` (from `docs/content_files/Ahmad_Almudhi-Resume.pdf`) |
| LinkedIn link | ✅ Done | — |

---

## Profile

| Field | Value |
|---|---|
| Full name | Ahmad Almudhi |
| Job title | Software Engineer |
| Location | Riyadh, Saudi Arabia |
| Email | a.almudhi1419@gmail.com |
| Phone | Not shown on the site (only in the PDF) |
| LinkedIn | https://www.linkedin.com/in/ahmad-almudhi-pspo%E2%84%A2-psm%E2%84%A2%E2%80%8F-a25a20181/ |
| GitHub | https://github.com/AhmadAlmudhi |

### Summary
> Software engineer specializing in Flutter, with additional experience across web development. Co-founded a clothing brand, making product decisions based on customer demand. PSPO I, PSM I certified.

### Site copy written from these facts (confirm or change)
The design needed a few lines of copy. Each one restates facts above; nothing new is claimed.

| Where | Copy |
|---|---|
| Hero | The name and the summary above, nothing else (the tagline and the "In numbers" figures were removed, 30 Oct 2026) |
| Education | Exactly the CV's lines (see Education below); no paragraph |
| Contact | Feel free to contact me at any time. |

---

## Experience
Newest first. Dates as on the CV. The site shows a duration only for past roles, calculated as end month minus start month in full words; the current role shows none.

### Frontend Developer — Muvi Cinemas
**02/2025 – Present** (no duration shown)
- Rebuilt the cinema booking app from scratch in Flutter, replacing two native apps with one cross-platform product.
- Reconstructed undocumented product requirements by tracing the existing app's behavior and gathering intended logic from IT and business stakeholders.
- Built and prioritized my own backlog from those requirements, writing user stories to define behavior across each user flow.
- Built an internal dashboard used by the IT department to monitor transactions and catch data errors across all 23 branches.
- Delivered in-seat ordering for suite guests end to end, from menu to seat.
- Developed a customer feedback platform capturing post-visit ratings from guests.

Skill tags: Flutter, Dart, BLoC, REST API integration, Requirements gathering, User stories, Backlog management, Stakeholder management

### Co-Founder — VEGA Styles
**05/2021 – 05/2025** · 4 years
- Shipped 12 collections across online and in-person channels, deciding what to produce next based on customer demand, past sales, and co-founders' input.
- Used samples to catch problems early, changing fabric, color, and print specs before committing to full production.

Skill tags: Prioritization, Prototyping, Stakeholder management

### Angular Developer — Jameel
**03/2022 – 09/2022** · 6 months · Tamheer program
- Improved an operations dashboard used to monitor captain activity, redesigning table layouts and surfacing more data per view.
- Reduced clicks needed for common monitoring tasks, making it faster for the operations team to spot issues during a shift.

Skill tags: Angular, JavaScript

---

## Projects
_For now the site shows one project, Battuta. More can be added later in `content/projects.ts`._

### Battuta — personal project
Web and mobile app · [battuta-travel.web.app](https://battuta-travel.web.app) · [github.com/AhmadAlmudhi/Battuta](https://github.com/AhmadAlmudhi/Battuta)

Everything below is taken from the Battuta README and `docs/Battuta_PRD.md` in that repo. **Please confirm**, especially "What I did" (it assumes you wrote the requirements document and built everything yourself).

**Card line:** Explore 249 countries, record the ones you've visited, and plan the next trip.

**Overview:** An app for exploring every country in the world, keeping track of the ones you've visited, and planning the next trip, named after Ibn Battuta, the 14th-century traveler from Tangier. It runs in any modern browser, on a phone or a computer, with no account and no install; Android and iOS build from the same Flutter code.

**The problem:** People who travel keep track of their trips in notes, photos, or memory. They have no quick, private way to see which countries they have visited, how much of the world they have covered, and where they want to go next. Most tools that do this require an account up front, need a connection, or are not available in Arabic.

**What I did**
- Wrote the product requirements document: every feature as numbered requirements with priorities and testable acceptance criteria, kept current through 22 revisions as the app grew.
- Built the app in Flutter from one codebase for the web, Android and iOS, with Riverpod and go_router.
- Made it local-first: travels are saved on the device first (Drift, SQLite, also on the web), so the app works without an account or a connection.
- Added optional accounts with Firebase Authentication and sync through Cloud Firestore, with security rules that enforce last write wins and the shape of each entry.
- Drew the world map in the app itself from bundled Natural Earth data, with no map service.
- Set up CI and delivery with GitHub Actions: formatting, analysis, tests and web, Android and iOS builds on every pull request, a preview site per pull request, deploys from version tags, and a weekly redeploy with fresh country data.

**Key features:** Explore with search in English or Arabic, filters and sorting · country details with neighbors and Open in Maps · visits with date, rating and notes, wishlist with priority and target year, the passport stamp · Quick select with one Undo · Stats on the world map with zoom, region focus, Replay and Share · English and Arabic (right to left), light and dark themes.

**Results:** Live at battuta-travel.web.app, released in four versions so far (1.0.0 to 1.3.0) · covered by 45 test files; sync is tested against the Firebase emulators.

**Built with:** Flutter, Dart, Riverpod, go_router, Drift (SQLite), Firebase Authentication, Cloud Firestore, Firebase Hosting, GitHub Actions.

**Screenshots** (`public/projects/battuta/`): taken on 30 Oct 2026 in the live web app as a guest, six at phone size (390 × 844 at 3×: Explore, Turkey's details, My travels, Stats, My travels in Arabic, Welcome) and three at laptop size (1440 × 900 at 2×: Explore, Turkey's details, Stats). The travels in them are demo data entered for the screenshots (14 visited countries, 4 on the wishlist), not your real trips; they were saved only in that test browser.

---

## Skills

**Product:** Requirements gathering · User stories · Backlog management · Prioritization · Stakeholder management · Prototyping · Agile & Scrum

**Technical:** Flutter · Dart · BLoC · REST API integration · Firebase · Supabase · Git · Angular · JavaScript

---

## Education

As on the CV:

### Flutter Development Bootcamp (200 hours)
**Tuwaiq Academy** — Saudi Federation for Cybersecurity, Programming & Drones
04/2023 – 06/2023

### Software Engineering, Bachelor's degree
**King Saud University**
09/2017 – 01/2021

---

## Certifications

| Certificate | Issuer | Issued | Credential ID | Verify |
|---|---|---|---|---|
| Professional Scrum Product Owner I (PSPO I) | Scrum.org | 11 Aug 2026 | 1341720 | [scrum.org/certificates/1341720](https://www.scrum.org/certificates/1341720) |
| Professional Scrum Master I (PSM I) | Scrum.org | 28 Aug 2026 | 1345408 | [scrum.org/certificates/1345408](https://www.scrum.org/certificates/1345408) |

They never expire. Scrum.org's verify page asks for your email before it shows your name and date, so the site shows a hint and a copy-email button next to "Verify".

Images: `public/certificates/pspo-i.webp` and `public/certificates/psm-i.webp`, rendered from `docs/content_files/Professional Scrum Product Owner I.pdf` and `Professional Scrum Master I.pdf` and cropped to the certificate edges.

---

## Decisions

- English only.
- Experience before Education.
- Not shown in Google search results (link-only).
- No "open to work" badge.
- No custom domain.
- Email only on the site; phone only in the PDF. The phone stays in the PDF (recruiters need it); it never appears in the site's HTML, and `robots.txt` keeps the PDF out of search engines.
- Identity: your theme image (`docs/content_files/my_theme.png`) decides colours, type and ornament (30 Oct 2026, PRD v1.4); the design skill decides the rest. One theme, no light/dark.
- Projects: Battuta only for now (30 Oct 2026); the four Muvi placeholders were removed.

---

## Still to add
- [x] Battuta with phone and desktop screenshots (the only project for now)
- [ ] More projects, if you want them
- [x] PSPO I and PSM I certificate images
- [x] Resume PDF
