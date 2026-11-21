import roadTrip from "@/assets/home/road-trip.webp";

/** Shared first-time visitor content used by the page and its SEO metadata. */
export const TRAVEL_TIPS_TITLE = "Israel Travel Tips for First-Time Visitors";
export const TRAVEL_TIPS_DESCRIPTION = "Practical Israel travel tips for first-time visitors: entry and ETA-IL, travel insurance, safety resources, Shabbat transport, where to stay, payments and local customs.";
export const TRAVEL_TIPS_UPDATED = "2026-11-21";

/** Shared hero for the guide and every incoming guide card. */
export const travelTipsHero = { src: roadTrip, alt: "Scenic road through the Israeli countryside at sunset" } as const;

export const travelTipsFaqs = [
  { q: "Do I need an ETA-IL or visa to visit Israel?", a: "That depends on your passport and immigration status. Check the official ETA-IL and Population and Immigration Authority website before paying for nonrefundable travel. An approved ETA-IL lets eligible travelers travel to Israel, but does not guarantee admission." },
  { q: "Should I bring cash, or can I pay by card?", a: "Cards are widely accepted in hotels, restaurants and shops, but carry some Israeli shekels for markets, smaller vendors and backup. Check exchange rates, card fees and the final charge before you pay." },
  { q: "Do I need to rent a car to travel around Israel?", a: "Not for most city sightseeing. Jerusalem and Tel Aviv are often easier on foot and with public transport or taxis. A rental car or private driver can help for rural routes, several stops or destinations with limited transit." },
  { q: "What happens if I arrive on Friday evening or Saturday?", a: "Most regular trains and bus services stop for Shabbat, but taxis and prearranged private transfers may operate. Some local weekend networks serve selected areas. Check your exact airport-to-hotel journey and your accommodation's check-in arrangements in advance." },
  { q: "How do I pay for public transport?", a: "Use a Rav-Kav card or an authorized fare-payment app where supported. Some buses accept bank cards, but this is not a universal payment option. Validate your journey according to the operator's rules." },
  { q: "How many days should I plan for a first trip?", a: "Seven to ten days works well for a first visit with several regions. Three or five days can also be rewarding if you focus on fewer destinations rather than rushing between hotels." },
  { q: "What should I reserve before arriving?", a: "Reserve essential accommodation and airport arrangements, and check whether popular tours, national parks, religious sites or special activities require timed tickets. Reconfirm opening hours near your visit." },
  { q: "Is tap water safe to drink?", a: "Municipal tap water is generally safe, subject to any temporary local advisories. Take your own drinking water for walking days, hot weather and desert excursions." },
] as const;

export const travelTipsSources = [
  { label: "Population and Immigration Authority — official ETA-IL information", href: "https://israel-entry.piba.gov.il/" },
  { label: "Ministry of Tourism — Emergency Information for Tourists (PDF)", href: "https://www.gov.il/BlobFolder/generalpage/emergency-information-for-tourists-in-israel/en/emergency-information-for-tourists-in-israel-new.pdf" },
  { label: "Ministry of Tourism — current visitor information", href: "https://www.gov.il/en/departments/topics/tourist-and-travelers-info" },
  { label: "Home Front Command — official emergency instructions", href: "https://www.oref.org.il/eng" },
  { label: "Israel Airports Authority — Ben Gurion Airport security and arrival advice", href: "https://www.iaa.gov.il/en/airports/ben-gurion/securitybgn/" },
  { label: "Israel Railways — current journey planner", href: "https://rail.co.il/?lan=en" },
  { label: "National Public Transportation Authority — routes and fares", href: "https://bus.gov.il/en/home" },
  { label: "Tel Aviv-Yafo Municipality — weekend transportation", href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" },
  { label: "Bank of Israel — exchange rates", href: "https://www.boi.org.il/en/" },
] as const;
