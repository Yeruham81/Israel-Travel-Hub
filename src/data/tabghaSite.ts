import tabghaHero from "@/assets/guides/tabgha.jpg";

/** Shared Tabgha visitor facts for the page, directory and structured metadata. */
export const tabghaSite = {
  title: "Tabgha: Church of the Multiplication and Primacy of Peter",
  description:
    "Visit Tabgha on the Sea of Galilee: the loaves-and-fishes mosaic, the Church of the Primacy of Peter, opening hours, access and nearby sights.",
  region: "Sea of Galilee" as const,
  duration: "About 1 hour for both churches",
  intro:
    "Tabgha, on the northwestern shore of the Sea of Galilee, is best known for its ancient loaves-and-fishes mosaic and two churches linked to the Gospel stories. Visit the Church of the Multiplication, then continue to the Church of the Primacy of Peter by the water.",
  hero: {
    src: tabghaHero,
    alt: "Courtyard and olive tree at the Church of the Multiplication in Tabgha",
  },
  updatedAt: "2026-11-17",
  multiplication: {
    hours: "09:00–15:00",
    lastEntry: "14:45",
    days: "Monday–Saturday",
    closed: "Sunday",
    phone: "04-6678100",
    phoneHref: "+97246678100",
  },
  primacy: {
    hours: "08:00–17:00",
    lastEntry: "16:30",
    phone: "04-6724767",
    phoneHref: "+97246724767",
  },
  sources: {
    multiplicationHours: "https://dormitio.net/tabgha/gottesdienst-und-oeffnungszeiten/",
    primacyHours:
      "https://www.cicts.org/our-services/#:~:text=Tabgha%20%E2%80%93%20Primacy%20of%20St.%20Peter",
    benedictine: "https://dormitio.net/tabgha/",
    benedictineHistory: "https://dormitio.net/tabgha/brotvermehrungskirche/",
    benedictineVisitors: "https://dormitio.net/tabgha/pilger-und-gaeste/",
    franciscan: "https://www.custodia.org/en/sanctuaries/tabgha/",
    primacyAccessibility:
      "https://www.orientchurch.va/images/colletta2020/allegati/Allegato_Custodia_Inglese.pdf",
  },
};
