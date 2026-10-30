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

### Hero numbers
| Number | Label |
|---|---|
| 2 → 1 | Native apps replaced by one Flutter app |
| 23 | Branches monitored by my dashboard |
| 12 | Collections shipped |

### Site copy written from these facts (confirm or change)
The design needed a few lines of copy. Each one restates facts above; nothing new is claimed.

| Where | Copy |
|---|---|
| Hero, under the name | Software Engineer in Riyadh. I build Flutter apps and own their backlog. (`profile.tagline`) |
| Numbers heading | In numbers |
| Experience, the "read as" control | Read my experience as: Both / Engineer / Product owner. Its sentence is computed from the highlights (five engineering, five product). Which highlight counts as which is set by `side` in `content/experience.ts`. |
| Education | A short first-person letter in `components/sections/Education.tsx`: the degree and dates, the 200-hour Tuwaiq bootcamp, Flutter as the main tool since, the backlog work at Muvi and the August 2026 certificates. |
| Contact | Write to me about a role, a product or a Flutter app. |

---

## Experience
Newest first. Durations are calculated by the site (shown here as of Oct 2026).

### Frontend Developer — Muvi Cinemas
**02/2025 – Present** · 1 yr 9 mos
- Rebuilt the cinema booking app from scratch in Flutter, replacing two native apps with one cross-platform product.
- Reconstructed undocumented product requirements by tracing the existing app's behavior and gathering intended logic from IT and business stakeholders.
- Built and prioritized my own backlog from those requirements, writing user stories to define behavior across each user flow.
- Built an internal dashboard used by the IT department to monitor transactions and catch data errors across all 23 branches.
- Delivered in-seat ordering for suite guests end to end, from menu to seat.
- Developed a customer feedback platform capturing post-visit ratings from guests.

Skill tags: Flutter, Dart, BLoC, REST API integration, Requirements gathering, User stories, Backlog management, Stakeholder management

### Co-Founder — VEGA Styles
**05/2021 – 05/2025** · 4 yrs 1 mo
- Shipped 12 collections across online and in-person channels, deciding what to produce next based on customer demand, past sales, and co-founders' input.
- Used samples to catch problems early, changing fabric, color, and print specs before committing to full production.

Skill tags: Prioritization, Prototyping, Stakeholder management

### Angular Developer — Jameel
**03/2022 – 09/2022** · 7 mos · Tamheer program
- Improved an operations dashboard used to monitor captain activity, redesigning table layouts and surfacing more data per view.
- Reduced clicks needed for common monitoring tasks, making it faster for the operations team to spot issues during a shift.

Skill tags: Angular, JavaScript

---

## Projects
_You'll add these after everything else is finished. Until then the site shows placeholders._

**Placeholders in the meantime** (PRD PRJ-12): the four Muvi projects, using only facts already in the Experience section above — no invented metrics, links or results. Each has `placeholder: true`, a small visible "Placeholder" note, and placeholder screenshots drawn as title cards at the real ratios until the real ones are added.

| Placeholder | Type | Facts used (from Experience) |
|---|---|---|
| Muvi booking app | mobile | Rebuilt in Flutter from scratch, replacing two native apps with one cross-platform product |
| Muvi IT dashboard | dashboard | Used by the IT department to monitor transactions and catch data errors across all 23 branches |
| In-seat ordering | mobile | Suite guests order end to end, from menu to seat |
| Customer feedback platform | web | Captures post-visit ratings from guests |

Paws, Battuta, baloot-calculator and tv-shows get no placeholder: there are no facts about them yet.

**Candidates:** Muvi booking app, Muvi IT dashboard, in-seat ordering, customer feedback platform, Paws, Battuta, baloot-calculator, tv-shows.

**For each project:** a one-line description, type (mobile / web / dashboard), the problem, your role, key features, results, technologies, 3–6 screenshots, links (live, GitHub, video) if any, and whether it's confidential. Pick your top 2–3 to feature first.

---

## Skills

**Product:** Requirements gathering · User stories · Backlog management · Prioritization · Stakeholder management · Prototyping · Agile & Scrum

**Technical:** Flutter · Dart · BLoC · REST API integration · Firebase · Supabase · Git · Angular · JavaScript

---

## Education

### Flutter Development Bootcamp
**Tuwaiq Academy** — Saudi Federation for Cybersecurity, Programming & Drones
04/2023 – 06/2023 · 200 hours

### Bachelor's degree, Software Engineering
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
- Design: the `design-taste-frontend` skill decides every visual question; the PRD was updated to match (v1.3).
- Accent colour and fonts: dealt by the design skill in Phase 1.
- Projects: placeholders until you add the real ones, after everything else is finished.

---

## Still to add
- [ ] Projects and their screenshots (placeholders until then; launch blocker)
- [x] PSPO I and PSM I certificate images
- [x] Resume PDF
