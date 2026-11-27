import mountTaborHero from "@/assets/guides/mount-tabor.jpg";

/** Visitor facts shared by the Mount Tabor page and attraction directory. */
export const mountTaborSite = {
  title: "Mount Tabor: Church of the Transfiguration and Galilee Views",
  description:
    "Visit Mount Tabor in Lower Galilee: the Church of the Transfiguration, mosaics, summit viewpoints, opening hours, road access, taxis and the walking trail.",
  region: "Lower Galilee & Jezreel Valley" as const,
  updatedAt: "2026-11-17",
  intro:
    "Mount Tabor rises above the Jezreel Valley, with the Church of the Transfiguration on its wooded summit. I recommend spending time inside the beautiful Franciscan basilica, enjoying the views and allowing enough time for the winding road up and down the mountain.",
  hero: {
    src: mountTaborHero,
    alt: "Twin stone towers of the Church of the Transfiguration on Mount Tabor",
  },
  duration: "60–90 minutes at the summit, excluding travel",
  visit: {
    weekdayHours: "08:00–17:00",
    weekendHours: "08:00–12:00 / 14:00–16:30",
    cicLastEntry: "16:30",
    visitorPhone: "04-662-0720",
    visitorPhoneHref: "+97246620720",
    friarsPhone: "04-667-6300",
    friarsPhoneHref: "+97246676300",
  },
  sources: {
    cic: "https://www.cicts.org/our-services/",
    franciscan:
      "https://www.custodia.org/en/sanctuaries/mount-tabor-basilica-of-the-transfiguration/",
    parks: "https://en.parks.org.il/reserve-park/mount-tabor-nature-reserve-and-national-park/",
    trail: "https://www.kkl-jnf.org/hiking_and_walking_tracks/mount-tavor-galilee/",
  },
};
