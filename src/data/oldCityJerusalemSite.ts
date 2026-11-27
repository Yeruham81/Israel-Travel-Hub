import oldCityPanorama from "@/assets/home/jerusalem-old-city.webp";

/** Old City visitor facts checked against responsible operators, November 2026. */
export const oldCityJerusalemSite = {
  title: "Jerusalem’s Old City: What to See & How to Visit",
  description:
    "Explore Jerusalem’s Old City with an interactive map of landmarks and gates, three walking itineraries, opening hours, admission, tours and helpful arrival tips.",
  updatedAt: "2026-11-23",
  region: "Jerusalem",
  hero: {
    src: oldCityPanorama,
    alt: "Panoramic view of Jerusalem’s Old City walls, stone buildings, domes and skyline",
  },
  intro:
    "Jerusalem’s Old City brings Jewish, Christian, Muslim and Armenian heritage together behind historic walls. Walk through lively markets, centuries-old churches and prayer sites, or add a museum or guided underground tour. Start with the map and three suggested routes below to choose the right gate, landmarks and visiting time.",
  visitor: {
    towerAdult: "₪55",
    rampartsAdult: "₪25",
    westernWall: "Free",
    holySepulchre: "Free",
    oldCityStreets: "Free",
    towerLocation: "Jaffa Gate",
    rampartsTicketOffice: "Jaffa Gate",
  },
  official: {
    unesco: "https://whc.unesco.org/en/list/148/",
    christianHours: "https://www.cicts.org/our-services/",
    westernWall: "https://thekotel.org/en/visitor.info/",
    westernWallDirections: "https://thekotel.org/en/visitor_information/Directions/",
    tunnels: "https://thekotel.org/en/book-a-tour/",
    tunnelsAccessibility: "https://thekotel.org/en/visitor_information/accessibility-statement/",
    accessibleJlmIos: "https://apps.apple.com/il/app/accessible-jlm/id1434672106",
    accessibleJlmAndroid: "https://play.google.com/store/apps/details?id=pami.accessibility.sayyes",
    christianQuarterWorks: "https://www.jpost.com/archaeology/article-914805",
    stJames: "https://www.itraveljerusalem.com/attraction/armenian-patriarchate-armenian-quarter",
    tunnelsBooking: "https://thekotel.org/en/book-a-tour/",
    tower: "https://www.tod.org.il/en/event/entrance-to-the-tower-of-david/",
    towerFaq: "https://www.tod.org.il/en/faqs/",
    towerEntrance: "https://www.tod.org.il/en/qa/where-is-the-entrance-to-the-museum/",
    ramparts: "https://www.pami.co.il/en/attractions/ramparts-walk/",
    rampartsTickets: "https://www.pami.co.il/en/ramparts-tickets/",
    jerusalemTransit: "https://bus.gov.il/en/home",
    rail: "https://www.rail.co.il/",
  },
} as const;
