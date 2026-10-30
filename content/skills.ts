import type { SkillGroup } from "./schema";

// The two groups of the CV, in its order. No levels: none are stated, so none are shown.
export const skillGroups: SkillGroup[] = [
  {
    id: "product",
    category: "Product",
    skills: [
      { id: "requirements", name: "Requirements gathering" },
      { id: "user-stories", name: "User stories" },
      { id: "backlog", name: "Backlog management" },
      { id: "prioritization", name: "Prioritization" },
      { id: "stakeholders", name: "Stakeholder management" },
      { id: "prototyping", name: "Prototyping" },
      { id: "scrum", name: "Agile & Scrum" },
    ],
  },
  {
    id: "technical",
    category: "Technical",
    skills: [
      { id: "flutter", name: "Flutter" },
      { id: "dart", name: "Dart" },
      { id: "bloc", name: "BLoC" },
      { id: "rest", name: "REST API integration" },
      { id: "firebase", name: "Firebase" },
      { id: "supabase", name: "Supabase" },
      { id: "git", name: "Git" },
      { id: "angular", name: "Angular" },
      { id: "javascript", name: "JavaScript" },
    ],
  },
];
