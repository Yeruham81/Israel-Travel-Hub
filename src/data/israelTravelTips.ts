import travelTipsCover from "@/assets/guides/israel-travel-tips-hero.webp";

/** Shared first-time visitor content used by the page and its SEO metadata. */
export const TRAVEL_TIPS_TITLE = "Israel Travel Tips for First-Time Visitors";
export const TRAVEL_TIPS_DESCRIPTION =
  "Practical Israel travel tips: ETA-IL entry rules, insurance, safety resources, Shabbat transport, accommodation, payments and local customs.";
export const TRAVEL_TIPS_UPDATED = "2026-11-21";

/** Shared hero for the guide and every incoming guide card. */
export const travelTipsHero = {
  src: travelTipsCover,
  alt: "Israel travel tips for first-time visitors illustrated with Jerusalem, Tel Aviv, the Dead Sea and travel essentials",
} as const;

export const travelTipsFaqs = [
  {
    q: "Do I need an ETA-IL or visa to visit Israel?",
    a: "Entry requirements depend on your nationality and immigration status. Check the official entry requirements before making non-refundable travel bookings. An approved ETA-IL lets eligible travelers travel to Israel, but does not guarantee admission.",
  },
  {
    q: "Should I bring cash, or can I pay by card?",
    a: "Cards are widely accepted in hotels, restaurants and shops, but carry some Israeli shekels for markets, smaller vendors and backup. Check exchange rates, card fees and the final charge before you pay.",
  },
  {
    q: "Do I need to rent a car to travel around Israel?",
    a: "Not for most city sightseeing. Jerusalem and Tel Aviv are often easier on foot and with public transport or taxis. A rental car or private driver makes it easier to explore rural areas and attractions with limited public transport.",
  },
  {
    q: "What happens if I arrive on Friday evening or Saturday?",
    a: "Most regular trains and bus services stop for Shabbat, but taxis and prearranged private transfers may operate. Some cities offer limited weekend bus services. Arrange transport from the airport and confirm your hotel's check-in hours in advance.",
  },
  {
    q: "How do I pay for public transport?",
    a: "Use a Rav-Kav card or an authorized fare-payment app where supported. Some buses accept bank cards, but this is not a universal payment option. Remember to validate your ticket or payment app as required.",
  },
  {
    q: "How many days should I plan for a first trip?",
    a: "I recommend seven to ten days for a first visit covering several regions of Israel. Three or five days can also be rewarding if you focus on a few destinations and spend more time in each.",
  },
  {
    q: "What should I reserve before arriving?",
    a: "Book your accommodation and airport transfers in advance. Check whether tours, national parks and religious sites require reservations. Reconfirm opening hours near your visit.",
  },
  {
    q: "Is tap water safe to drink?",
    a: "Municipal tap water is generally safe, subject to any temporary local advisories. Take your own drinking water for walking days, hot weather and desert excursions.",
  },
] as const;

export const travelTipsSources = [
  {
    label: "Population and Immigration Authority - official ETA-IL information",
    href: "https://israel-entry.piba.gov.il/",
  },
  {
    label: "Ministry of Tourism - Emergency Information for Tourists (PDF)",
    href: "https://www.gov.il/BlobFolder/generalpage/emergency-information-for-tourists-in-israel/en/emergency-information-for-tourists-in-israel-new.pdf",
  },
  {
    label: "Ministry of Tourism - current visitor information",
    href: "https://www.gov.il/en/departments/topics/tourist-and-travelers-info",
  },
  {
    label: "Home Front Command - official emergency instructions",
    href: "https://www.oref.org.il/eng",
  },
  {
    label: "Israel Airports Authority - Ben Gurion Airport security and arrival advice",
    href: "https://www.iaa.gov.il/en/airports/ben-gurion/securitybgn/",
  },
  { label: "Israel Railways - current journey planner", href: "https://rail.co.il/?lan=en" },
  {
    label: "National Public Transportation Authority - routes and fares",
    href: "https://bus.gov.il/en/home",
  },
  {
    label: "Tel Aviv-Yafo Municipality - weekend transportation",
    href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx",
  },
  { label: "Bank of Israel - exchange rates", href: "https://www.boi.org.il/en/" },
] as const;
