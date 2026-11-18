import oldCityPhoto from "@/assets/home/jerusalem-old-city.webp";

/** Old City visitor facts checked against responsible operators, November 2026. */
export const oldCityJerusalemSite = {
  title: "Jerusalem Old City: Attractions, Quarters & Visitor Guide",
  description: "Plan a walk through Jerusalem's Old City: Western Wall, Holy Sepulchre, Via Dolorosa, Jewish Quarter, Temple Mount, Tower of David, tunnels, gates and visitor tips.",
  updatedAt: "2026-11-18",
  region: "Jerusalem",
  hero: {
    src: oldCityPhoto,
    alt: "Jerusalem's Old City skyline, ancient stone walls and historic domes",
  },
  intro: "Jerusalem’s Old City brings Jewish, Christian, Muslim and Armenian heritage together within a remarkably small area. I suggest choosing a few meaningful stops rather than trying to see every landmark in one day: the churches, prayer sites, lively markets and historic streets each deserve time of their own.",
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
    tunnels: "https://english.thekotel.org/plan-your-tour/",
    tunnelsBooking: "https://thekotel.org/en/book-a-tour/",
    tower: "https://www.tod.org.il/en/event/entrance-to-the-tower-of-david/",
    towerFaq: "https://www.tod.org.il/en/faqs/",
    ramparts: "https://www.pami.co.il/en/attractions/ramparts-walk/",
    rampartsTickets: "https://www.pami.co.il/en/ramparts-tickets/",
    jerusalemTransit: "https://bus.gov.il/en/home",
    rail: "https://www.rail.co.il/",
  },
} as const;
