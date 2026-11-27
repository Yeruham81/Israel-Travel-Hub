import akkoHero from "@/assets/guides/old-city-acre-aerial.webp";

/** Current published visitor facts and authoritative links for the Old Akko historic attractions. */
export const akkoSite = {
  title: "Old Akko (Acre): Attractions, Walking Routes & Visitor Guide",
  description:
    "Plan an Old Akko visit with eight historic attractions, a numbered map, walking routes, opening hours, combined tickets, food stops and transport tips.",
  region: "Haifa & northern coast",
  updatedAt: "2026-11-23",
  hero: {
    src: akkoHero,
    alt: "Aerial view of the historic stone buildings, walls and Mediterranean harbour of Old Akko",
  },
  intro:
    "Old Akko brings together an underground Crusader city, impressive Ottoman landmarks and a working Mediterranean harbour within a compact, walkable old town. I recommend starting with the Knights’ Halls, then choosing a few of the nearby heritage sites before leaving time for the market and waterfront.",
  visitor: {
    comboAdult: "₪55",
    regularHours: "09:00–17:00",
    fridayHours: "09:00–16:00",
    ticketOfficeCloses: "60 minutes before site closing",
    centerAddress: "Weizmann Street 1, Old Akko",
    phone: "04-9956706",
  },
  official: {
    main: "https://www.akko.org.il/en/",
    attractions: "https://www.akko.org.il/en/attractions/",
    hours: "https://www.akko.org.il/en/activity-time/",
    faq: "https://www.akko.org.il/en/faq/",
    accessibility: "https://www.akko.org.il/en/accessibility/",
    visitors: "https://www.akko.org.il/en/attraction/the-visitors-center/",
    knights: "https://www.akko.org.il/en/attraction/the-knights-halls/",
    templar: "https://www.akko.org.il/en/attraction/the-templars-tunnel/",
    bath: "https://www.akko.org.il/en/attraction/the-turkish-bath-house/",
    mosque: "https://www.akko.org.il/en/attraction/the-mosques-of-old-akko/",
    market: "https://www.akko.org.il/en/attraction/akko-authentic-markets/",
    harbour: "https://www.akko.org.il/en/attraction/marina-fishing-port/",
    museum: "https://www.akko.org.il/en/attraction/the-ethnographic-museum/",
    ramchal: "https://www.akko.org.il/en/attraction/ramchal-synagogue-visitors-center/",
    oldCityRoute: "https://www.akko.org.il/en/route/the-classic-route/",
    wallsRoute: "https://www.akko.org.il/en/route/the-walls-route/",
    khans: "https://www.akko.org.il/en/attraction/the-khans-of-old-akko/",
    unesco: "https://whc.unesco.org/en/list/1042/",
  },
} as const;
