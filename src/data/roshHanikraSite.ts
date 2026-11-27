import roshHanikraHero from "@/assets/guides/rosh-hanikra.jpg";

/** Visitor information shared by Rosh Hanikra and attraction-directory metadata. */
export const roshHanikraSite = {
  title: "Rosh Hanikra: Sea Grottoes, Cable Car & Northern Coast",
  description:
    "Visit Rosh Hanikra's sea grottoes, cable car, old railway tunnel and coastal viewpoints, with ticket, opening-hour, accessibility and travel advice.",
  region: "Haifa & northern coast" as const,
  updatedAt: "2026-11-17",
  intro:
    "At the northern tip of Israel's Mediterranean coast, the white cliffs of Rosh Hanikra drop straight into turquoise water. The cable car takes visitors down to a remarkable network of sea grottoes, where waves echo through the rock. I recommend allowing time for both the cave walk and the views from the headland.",
  hero: {
    src: roshHanikraHero,
    alt: "Turquoise Mediterranean water framed by a natural rock opening inside the sea grottoes at Rosh Hanikra",
  },
  visit: {
    lastCableAutumnWinter: "16:00",
    lastCableSummer: "18:00",
    closesAfterLastEntry: "1 hour",
    customerService: "073-2710100",
    customerServiceHref: "+972732710100",
  },
  sources: {
    tickets: "https://www.rosh-hanikra.com/tq/en/entry/",
    info: "https://www.rosh-hanikra.com/tq/en/info/",
    accessibility: "https://www.rosh-hanikra.com/tq/en/accessibility/",
    comboAkko: "https://www.rosh-hanikra.com/tq/en/p/akko-old-city/",
    railway: "https://www.ynetnews.com/magazine/article/rkvm21neze",
  },
};
