import { type ShoreDestinationId, type ShorePortId } from "@/data/registry";

/** Editorial update date, separate from the last check of product prices and sources. */
export const SHORE_EXCURSION_UPDATED_DATE = "2026-11-16";

export const shoreHubTitle = "Shore excursions from Israel's cruise ports";
export const shoreHubDescription = "Explore Israel shore excursions from Ashdod and Haifa. Compare Jerusalem, Galilee, Masada and coastal day trips, private drivers and guided tours with port pickup and return.";

export const shoreHubPorts: Record<ShorePortId, {
  location: string;
  description: string;
  highlights: string[];
  planning: string;
  pickup: string;
}> = {
  ashdod: {
    location: "Southern Mediterranean coast",
    description: "Choose Jerusalem, Tel Aviv and Old Jaffa, or a longer day at Masada and the Dead Sea.",
    highlights: ["Jerusalem & Bethlehem", "Tel Aviv & Old Jaffa", "Masada & the Dead Sea"],
    planning: "A coastal outing can offer a gentler day. Jerusalem involves walking and steps; desert routes need a longer port call and time on the road.",
    pickup: "This secure port is not a pedestrian city-center terminal. The ship's shuttle and authorized pickup point must be confirmed for the actual call.",
  },
  haifa: {
    location: "Northern Mediterranean coast",
    description: "Explore nearby Haifa and Akko, or visit Nazareth and the Sea of Galilee.",
    highlights: ["Haifa & Akko", "Nazareth & Sea of Galilee", "Jerusalem on a longer call"],
    planning: "Northern routes keep more of the day in the region. Jerusalem and Tel Aviv mean longer drives south, so plan a selective itinerary.",
    pickup: "The passenger-terminal public access is via a pedestrian bridge near 65 HaAtsmaut Street; confirm any ship-specific meeting instructions.",
  },
};

export const shoreHubExperiences: {
  id: "history" | "galilee" | "coast" | "desert";
  title: string;
  description: string;
  bestFor: string;
  links: { portId: ShorePortId; destination: ShoreDestinationId; label: string }[];
}[] = [
  {
    id: "history", title: "Jerusalem & Bethlehem",
    description: "Explore the Old City's historic quarters and sacred sites. A Bethlehem visit needs suitable arrangements and enough time for the return to port.",
    bestFor: "First-time visitors, history lovers and pilgrims",
    links: [{ portId: "ashdod", destination: "jerusalem", label: "Jerusalem from Ashdod" }, { portId: "haifa", destination: "jerusalem", label: "Jerusalem from Haifa" }],
  },
  {
    id: "galilee", title: "Nazareth & the Sea of Galilee",
    description: "Visit Nazareth and selected lakeside sites from Haifa. An Ashdod departure means significantly more driving.",
    bestFor: "Christian heritage and scenic countryside",
    links: [{ portId: "haifa", destination: "galilee", label: "Galilee from Haifa" }, { portId: "ashdod", destination: "galilee", label: "Galilee from Ashdod" }],
  },
  {
    id: "coast", title: "Coastal cities & old harbours",
    description: "Explore Akko's historic harbour from Haifa, or Tel Aviv and Old Jaffa from Ashdod, at a more relaxed pace.",
    bestFor: "Couples, families and a less hurried city experience",
    links: [{ portId: "haifa", destination: "akko", label: "Akko from Haifa" }, { portId: "ashdod", destination: "tel-aviv", label: "Tel Aviv & Jaffa from Ashdod" }],
  },
  {
    id: "desert", title: "Masada & the Dead Sea",
    description: "Combine Masada with a designated Dead Sea beach from Ashdod when your port call allows a full day.",
    bestFor: "Dramatic landscapes and a full day of discovery",
    links: [{ portId: "ashdod", destination: "masada", label: "Masada from Ashdod" }, { portId: "ashdod", destination: "dead-sea", label: "Dead Sea from Ashdod" }],
  },
];

export const shoreTourFormats = [
  { title: "Private car & driver", bestFor: "Families and small groups who value their own pace", includes: "Your party's vehicle and driver; guiding and admissions arranged separately", tradeoff: "Flexible stops and breaks. Guiding is separate unless specifically arranged." },
  { title: "Private guided excursion", bestFor: "Travelers who want personal attention and historical context", includes: "A private guided itinerary with the inclusions stated on its booking page", tradeoff: "Personal guiding for your party, usually at a higher total cost." },
  { title: "Shared guided excursion", bestFor: "Solo travelers and couples who prefer a planned group day", includes: "A set route and group format, with transport and guiding as listed", tradeoff: "A fixed schedule and less flexibility. Check pickup, departure and group size." },
  { title: "Small-group guided excursion", bestFor: "Visitors who prefer a smaller group without booking a private guide", includes: "A guided itinerary with a stated maximum group size, where the operator offers one", tradeoff: "A smaller group on a set itinerary; confirm its maximum size and pickup." },
];

export const shorePlanningSteps = [
  { title: "Start with the real hours ashore", description: "Use the expected disembarkation time and all-aboard deadline, not only your docking and sailing times." },
  { title: "Choose one main experience", description: "Allow time for driving, walking and queues; keep your route manageable." },
  { title: "Agree pickup and the return plan", description: "Confirm the port meeting point, any shuttle, the return buffer and your operator's contact details." },
  { title: "Match the day to your party", description: "Share your group size and accessibility needs; check vehicle capacity and cancellation terms." },
];

export const shoreHubFaqs = [
  { q: "Which Israeli cruise port is better for Jerusalem?", a: "Jerusalem excursions are listed from both Ashdod and Haifa. Ashdod is the more southerly starting point; Haifa involves a longer journey south. The right choice is the port on your ship's itinerary and a tour that fits the actual hours ashore, with time reserved for the return." },
  { q: "What can I visit on a shore excursion from Haifa?", a: "Haifa and Akko offer a northern coastal day, while Nazareth and the Sea of Galilee suit Christian heritage and countryside interests. Jerusalem and Tel Aviv are longer-distance options. If Rosh Hanikra is part of your proposed route, confirm that the site is operating and agree an alternative stop." },
  { q: "Can I visit Masada and the Dead Sea from Ashdod Port?", a: "Yes, the Ashdod page includes guided and private-driver options for Masada and the Dead Sea. It is a full-day desert outing, so check the fit with your ship's schedule, the cable-car and admission arrangements, and how much time remains for a designated beach stop." },
  { q: "Is a licensed guide included in every excursion?", a: "No. A car-and-driver service covers transport and a driver; licensed guiding is a separate arrangement unless explicitly included. Guided tours have their own stated inclusions. Check the guide's language, site entry and any local handover arrangements for a combined Jerusalem and Bethlehem visit." },
  { q: "Are shore excursion prices per person or per vehicle?", a: "The individual tour cards state the basis. My private-driver starting rates are per vehicle for up to four passengers; external tours may quote per person or per group. Compare the total for your party, including guiding, admission, meals and any extras. The booking site's current price or the confirmed private quote determines the final total." },
  { q: "Does every tour include pickup and return to the same port?", a: "The excursions on these port pages are return day trips from the named port. Confirm the exact meeting point and whether a terminal shuttle is involved. A city or hotel pickup elsewhere is not a substitute for confirmed cruise-port pickup." },
  { q: "What if the ship arrives late or changes its itinerary?", a: "Ask the provider for its written delay, missed-port-call and cancellation policy before booking. Agree which stops will be shortened or removed if time is lost. Return-to-ship protections depend on the specific booking terms; this portal does not provide a blanket guarantee." },
  { q: "How far ahead should I arrange a private day trip?", a: "Get in touch once you know your cruise date and port schedule, especially for a larger vehicle, child seats, accessibility requests or a licensed guide. Sending an inquiry begins the planning; the booking is confirmed only after availability, itinerary, price and terms have been agreed." },
];

export const shoreHubSourceIds = ["shore-haifa-terminal", "shore-ashdod-terminal", "inpa-masada"];
