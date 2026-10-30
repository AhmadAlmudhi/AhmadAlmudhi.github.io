import { z } from "zod";
import { Education } from "./schema";

export const education = z.array(Education).parse([
  {
    id: "tuwaiq",
    degree: "Flutter Development Bootcamp",
    institution: "Tuwaiq Academy",
    institutionNote: "Saudi Federation for Cybersecurity, Programming & Drones",
    note: "200 hours",
    start: "2023-04",
    end: "2023-06",
  },
  {
    id: "ksu",
    degree: "Bachelor's degree, Software Engineering",
    institution: "King Saud University",
    start: "2017-09",
    end: "2021-01",
  },
]);
