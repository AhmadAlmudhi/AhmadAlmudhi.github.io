import { z } from "zod";
import { Certification } from "./schema";

// Both never expire. Scrum.org's verify page asks for the holder's email before it shows the
// name and date, so the site shows `verifyNote` and a copy-email button beside "Verify" (CRT-3).
const verifyNote = "Scrum.org asks for my email before it shows my name and the date.";

export const certifications = z.array(Certification).parse([
  {
    id: "pspo-i",
    name: "Professional Scrum Product Owner I",
    shortName: "PSPO I",
    issuer: "Scrum.org",
    issued: "2026-08-11",
    credentialId: "1341720",
    verifyUrl: "https://www.scrum.org/certificates/1341720",
    verifyNote,
    image: {
      src: "/certificates/pspo-i.webp",
      width: 2248,
      height: 1711,
      alt: "Scrum.org certificate: Professional Scrum Product Owner I, awarded to Ahmad Almudhi on August 11, 2026",
    },
    featured: true,
    side: "product",
  },
  {
    id: "psm-i",
    name: "Professional Scrum Master I",
    shortName: "PSM I",
    issuer: "Scrum.org",
    issued: "2026-08-28",
    credentialId: "1345408",
    verifyUrl: "https://www.scrum.org/certificates/1345408",
    verifyNote,
    image: {
      src: "/certificates/psm-i.webp",
      width: 2249,
      height: 1711,
      alt: "Scrum.org certificate: Professional Scrum Master I, awarded to Ahmad Almudhi on August 28, 2026",
    },
    featured: true,
    side: "product",
  },
]);
