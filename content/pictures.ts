import type { Picture } from "./schema";

// Pictures of Ahmad's world found in open collections (design-taste-frontend `assets.mjs`;
// raw records in public/pictures/credits.json). They show the places around him — never his own
// work — and every one is credited in the footer.


export const pictures: Record<"riyadh" | "ksu", Picture> = {
  riyadh: {
    src: "/pictures/riyadh-skyline-dusk.jpg",
    width: 2560,
    height: 1707,
    alt: "Riyadh at dusk under an orange sky, Kingdom Tower in front and the towers of the King Abdullah Financial District behind",
    title: "Riyadh Skyline showing the King Abdullah Financial District (KAFD) and the famous Kingdom Tower",
    creator: "B.alotaby",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Riyadh_Skyline_showing_the_King_Abdullah_Financial_District_(KAFD)_and_the_famous_Kingdom_Tower_.jpg",
    tone: "#a6714c",
  },
  ksu: {
    src: "/pictures/ksu-entrance-gate.jpg",
    width: 1400,
    height: 1304,
    alt: "The entrance gate of King Saud University in Riyadh, shaped like an open book, under a blue sky",
    title: "King Saud University Entrance Gate, Riyadh",
    creator: "Dr. Basil Al Bayati",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    page: "https://commons.wikimedia.org/wiki/File:King_Saud_University_Entrance_Gate,_Riyadh.jpg",
    tone: "#9aa3a6",
  },
};
