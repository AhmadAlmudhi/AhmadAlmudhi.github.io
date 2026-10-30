import type { Project } from "./schema";

// PLACEHOLDERS (PRD PRJ-12). Ahmad replaces these with the real projects and screenshots after
// everything else is finished. Until then each entry uses only facts already stated in the
// Experience section, has `placeholder: true`, and its screenshots have no `src`, so the site draws
// a designed title card at the real aspect ratio instead. None may remain at launch.
export const projects: Project[] = [
  {
    slug: "muvi-booking-app",
    title: "Muvi booking app",
    tagline: "One Flutter app in place of two native ones.",
    kind: "mobile",
    role: "Frontend Developer",
    company: "Muvi Cinemas",
    featured: true,
    placeholder: true,
    overview:
      "The cinema booking app, rebuilt from scratch in Flutter, replacing two native apps with one cross-platform product.",
    problem:
      "The existing app's product requirements were undocumented, so the intended behavior had to be reconstructed before it could be rebuilt.",
    contributions: [
      "Rebuilt the app from scratch in Flutter.",
      "Reconstructed the requirements by tracing the existing app's behavior and gathering intended logic from IT and business stakeholders.",
      "Built and prioritized the backlog, writing user stories for each user flow.",
    ],
    skills: ["Flutter", "Dart", "BLoC", "REST API integration", "User stories", "Backlog management"],
    screenshots: [
      { alt: "Muvi booking app, screenshot to come" },
      { alt: "Muvi booking app, second screenshot to come" },
      { alt: "Muvi booking app, third screenshot to come" },
    ],
  },
  {
    slug: "muvi-it-dashboard",
    title: "Muvi IT dashboard",
    tagline: "Transactions and data errors across all 23 branches, in one place.",
    kind: "dashboard",
    role: "Frontend Developer",
    company: "Muvi Cinemas",
    featured: true,
    placeholder: true,
    overview:
      "An internal dashboard used by the IT department to monitor transactions and catch data errors across all 23 branches.",
    contributions: ["Built the internal dashboard used by the IT department."],
    skills: ["Flutter", "REST API integration"],
    screenshots: [
      { alt: "Muvi IT dashboard, screenshot to come" },
      { alt: "Muvi IT dashboard, second screenshot to come" },
    ],
  },
  {
    slug: "in-seat-ordering",
    title: "In-seat ordering",
    tagline: "Suite guests order from the menu, delivered to the seat.",
    kind: "mobile",
    role: "Frontend Developer",
    company: "Muvi Cinemas",
    placeholder: true,
    overview: "In-seat ordering for suite guests, delivered end to end, from menu to seat.",
    contributions: ["Delivered in-seat ordering end to end, from menu to seat."],
    skills: ["Flutter", "Dart"],
    screenshots: [
      { alt: "In-seat ordering, screenshot to come" },
      { alt: "In-seat ordering, second screenshot to come" },
    ],
  },
  {
    slug: "customer-feedback-platform",
    title: "Customer feedback platform",
    tagline: "Post-visit ratings from cinema guests.",
    kind: "web",
    role: "Frontend Developer",
    company: "Muvi Cinemas",
    placeholder: true,
    overview: "A customer feedback platform capturing post-visit ratings from guests.",
    contributions: ["Developed the customer feedback platform."],
    skills: ["Flutter"],
    screenshots: [{ alt: "Customer feedback platform, screenshot to come" }],
  },
];
