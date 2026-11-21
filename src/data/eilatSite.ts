import eilatWaterfrontHero from "@/assets/eilat/waterfront.webp";

/** Official visitor sources for the multi-attraction Eilat city guide.
 * Opening hours, ticket prices and access apply to each venue, not to Eilat as a city.
 */
export const eilatSite = {
  title: "Things to Do in Eilat | Red Sea Beaches, Coral Reefs & Desert Trips",
  description: "My Eilat guide: Red Sea beaches and snorkeling, the Underwater Observatory, Dolphin Reef, Timna Park, Red Canyon, family activities, travel tips, maps and tours.",
  updatedAt: "2026-11-21",
  region: "Negev & Eilat",
  hero: {
    src: eilatWaterfrontHero,
    alt: "Eilat Red Sea shoreline, North Beach promenade and palm trees in daylight",
  },
  intro: "Eilat is more than a beach resort. Its Red Sea shoreline is known for coral reefs and marine attractions, while the Eilat Mountains and Timna Park offer a completely different desert landscape. I would plan your stay around two areas rather than rush between them: choose the beaches and marine sights for one day, then leave another morning for the desert. This guide covers the places worth prioritising, transport between them and practical choices for first-time visitors.",
  official: {
    coralReserve: "https://en.parks.org.il/reserve-park/eilat-coral-beach-nature-reserve-2/",
    beaches: "https://eilat.city/en/list/beaches",
    underwaterObservatory: "https://coralworld.co.il/en/visit-park/",
    dolphinReef: "https://www.dolphinreef.co.il/en/experience-thereef",
    dolphinSwim: "https://www.dolphinreef.co.il/en/swimming",
    timna: "https://parktimna.co.il/en/know-before-your-visit/",
    timnaTickets: "https://parktimna.co.il/en/tickets/",
    timnaNavigation: "https://parktimna.co.il/en/know-before-your-visit/navigating-timna-park/",
    eilatMountains: "https://www.parks.org.il/reserve-park/%D7%A9%D7%9E%D7%95%D7%A8%D7%AA-%D7%98%D7%91%D7%A2-%D7%9E%D7%A1%D7%99%D7%91-%D7%94%D7%A8%D7%99-%D7%90%D7%99%D7%9C%D7%AA/",
    redCanyon: "https://www.parks.org.il/trip/red-canyon-and-shani-river/",
    birds: "https://eilatbirds.com/en/",
    botanical: "https://www.botanicgarden.co.il/gan-botani?lang=en",
    airport: "https://www.iaa.gov.il/en/airports/ramon/arriving-at-the-airport/",
    egged: "https://www.egged.co.il/en/information-for-passengers/tickets-information",
    transportPlanner: "https://bus.gov.il/en/home",
  },
} as const;
