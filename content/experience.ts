import type { Experience } from "./schema";

// Newest first, as in the CV.
export const experience: Experience[] = [
  {
    id: "muvi",
    company: "Muvi Cinemas",
    role: "Frontend Developer",
    location: "Riyadh, Saudi Arabia",
    start: "2025-02",
    highlights: [
      "Rebuilt the cinema booking app from scratch in Flutter, replacing two native apps with one cross-platform product.",
      "Reconstructed undocumented product requirements by tracing the existing app's behavior and gathering intended logic from IT and business stakeholders.",
      "Built and prioritized my own backlog from those requirements, writing user stories to define behavior across each user flow.",
      "Built an internal dashboard used by the IT department to monitor transactions and catch data errors across all 23 branches.",
      "Delivered in-seat ordering for suite guests end to end, from menu to seat.",
      "Developed a customer feedback platform capturing post-visit ratings from guests.",
    ],
    skills: [
      "Flutter",
      "Dart",
      "BLoC",
      "REST API integration",
      "Requirements gathering",
      "User stories",
      "Backlog management",
      "Stakeholder management",
    ],
  },
  {
    id: "vega",
    company: "VEGA Styles",
    role: "Co-Founder",
    start: "2021-05",
    end: "2025-05",
    highlights: [
      "Shipped 12 collections across online and in-person channels, deciding what to produce next based on customer demand, past sales, and co-founders' input.",
      "Used samples to catch problems early, changing fabric, color, and print specs before committing to full production.",
    ],
    skills: ["Prioritization", "Prototyping", "Stakeholder management"],
  },
  {
    id: "jameel",
    company: "Jameel",
    role: "Angular Developer",
    note: "Tamheer program",
    start: "2022-03",
    end: "2022-09",
    highlights: [
      "Improved an operations dashboard used to monitor captain activity, redesigning table layouts and surfacing more data per view.",
      "Reduced clicks needed for common monitoring tasks, making it faster for the operations team to spot issues during a shift.",
    ],
    skills: ["Angular", "JavaScript"],
  },
];
