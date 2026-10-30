import { z } from "zod";
import { SkillGroup } from "./schema";

// The two groups from resume-content.md (Product, Technical), each split into the categories
// the skills section lists. No levels: none are stated, so none are shown.
export const skillGroups = z.array(SkillGroup).parse([
  {
    id: "mobile",
    category: "Mobile",
    side: "engineering",
    skills: [
      { id: "flutter", name: "Flutter" },
      { id: "dart", name: "Dart" },
      { id: "bloc", name: "BLoC" },
    ],
  },
  {
    id: "web",
    category: "Web",
    side: "engineering",
    skills: [
      { id: "angular", name: "Angular" },
      { id: "javascript", name: "JavaScript" },
    ],
  },
  {
    id: "backend",
    category: "Data, APIs and tools",
    side: "engineering",
    skills: [
      { id: "rest", name: "REST API integration" },
      { id: "firebase", name: "Firebase" },
      { id: "supabase", name: "Supabase" },
      { id: "git", name: "Git" },
    ],
  },
  {
    id: "discovery",
    category: "Discovery",
    side: "product",
    skills: [
      { id: "requirements", name: "Requirements gathering" },
      { id: "stakeholders", name: "Stakeholder management" },
      { id: "prototyping", name: "Prototyping" },
    ],
  },
  {
    id: "delivery",
    category: "Delivery",
    side: "product",
    skills: [
      { id: "user-stories", name: "User stories" },
      { id: "backlog", name: "Backlog management" },
      { id: "prioritization", name: "Prioritization" },
      { id: "scrum", name: "Agile & Scrum" },
    ],
  },
]);
