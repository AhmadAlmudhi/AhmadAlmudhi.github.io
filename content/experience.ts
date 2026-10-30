import { z } from "zod";
import { Experience } from "./schema";

// Newest first. `side` tags each highlight for the "read as" lens: engineering work or product work.
export const experience = z.array(Experience).parse([
  {
    id: "muvi",
    company: "Muvi Cinemas",
    role: "Frontend Developer",
    location: "Riyadh, Saudi Arabia",
    start: "2025-02",
    highlights: [
      {
        side: "engineering",
        text: "Rebuilt the cinema booking app from scratch in Flutter, replacing two native apps with one cross-platform product.",
      },
      {
        side: "product",
        text: "Reconstructed undocumented product requirements by tracing the existing app's behavior and gathering intended logic from IT and business stakeholders.",
      },
      {
        side: "product",
        text: "Built and prioritized my own backlog from those requirements, writing user stories to define behavior across each user flow.",
      },
      {
        side: "engineering",
        text: "Built an internal dashboard used by the IT department to monitor transactions and catch data errors across all 23 branches.",
      },
      { side: "engineering", text: "Delivered in-seat ordering for suite guests end to end, from menu to seat." },
      { side: "engineering", text: "Developed a customer feedback platform capturing post-visit ratings from guests." },
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
    relatedProjects: ["muvi-booking-app", "muvi-it-dashboard", "in-seat-ordering", "customer-feedback-platform"],
  },
  {
    id: "vega",
    company: "VEGA Styles",
    role: "Co-Founder",
    start: "2021-05",
    end: "2025-05",
    highlights: [
      {
        side: "product",
        text: "Shipped 12 collections across online and in-person channels, deciding what to produce next based on customer demand, past sales, and co-founders' input.",
      },
      {
        side: "product",
        text: "Used samples to catch problems early, changing fabric, color, and print specs before committing to full production.",
      },
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
      {
        side: "engineering",
        text: "Improved an operations dashboard used to monitor captain activity, redesigning table layouts and surfacing more data per view.",
      },
      {
        side: "product",
        text: "Reduced clicks needed for common monitoring tasks, making it faster for the operations team to spot issues during a shift.",
      },
    ],
    skills: ["Angular", "JavaScript"],
  },
]);
