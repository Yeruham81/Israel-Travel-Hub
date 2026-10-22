import { type ShoreDestinationId, type ShorePortId } from "@/data/registry";

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
    description: "From Ashdod, compare a relatively close Tel Aviv–Jaffa outing, a Jerusalem visit with substantial walking, or a longer desert day to Masada and the Dead Sea.",
    highlights: ["Jerusalem & Bethlehem", "Tel Aviv & Old Jaffa", "Masada & the Dead Sea"],
    planning: "A coastal outing can offer a gentler day. Jerusalem involves walking and steps; desert routes need a longer port call and time on the road.",
    pickup: "This secure port is not a pedestrian city-center terminal. The ship's shuttle and authorized pickup point must be confirmed for the actual call.",
  },
  haifa: {
    location: "Northern Mediterranean coast",
    description: "From Haifa, nearby Akko and northern Galilee routes preserve more sightseeing time than the longer journeys south to Tel Aviv or Jerusalem.",
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
    description: "Jerusalem's Old City involves walking and site-specific access. A combined Bethlehem itinerary also requires its own operator arrangements; compare the remaining time at each stop after the return drive.",
    bestFor: "First-time visitors, history lovers and pilgrims",
    links: [{ portId: "ashdod", destination: "jerusalem", label: "Jerusalem from Ashdod" }, { portId: "haifa", destination: "jerusalem", label: "Jerusalem from Haifa" }],
  },
  {
    id: "galilee", title: "Nazareth & the Sea of Galilee",
    description: "Connect Nazareth's Christian heritage with the landscapes around the lake. A focused route might include selected churches and lakeside sites, with time to appreciate their setting. Haifa is the natural northern starting point; the Ashdod option involves a longer journey.",
    bestFor: "Christian heritage and scenic countryside",
    links: [{ portId: "haifa", destination: "galilee", label: "Galilee from Haifa" }, { portId: "ashdod", destination: "galilee", label: "Galilee from Ashdod" }],
  },
  {
    id: "coast", title: "Coastal cities & old harbours",
    description: "Enjoy Akko's harbour and historic lanes from Haifa, or Old Jaffa and Tel Aviv's seafront from Ashdod. Markets, architecture and a relaxed lunch make appealing alternatives to an intensive religious itinerary. A private day lets you agree how much walking to include.",
    bestFor: "Couples, families and a less hurried city experience",
    links: [{ portId: "haifa", destination: "akko", label: "Akko from Haifa" }, { portId: "ashdod", destination: "tel-aviv", label: "Tel Aviv & Jaffa from Ashdod" }],
  },
  {
    id: "desert", title: "Masada & the Dead Sea",
    description: "From Ashdod, Masada and a designated Dead Sea beach make a longer day. Confirm Masada admission and cable-car operating times, then decide how much time is left for the beach and port return.",
    bestFor: "Dramatic landscapes and a full day of discovery",
    links: [{ portId: "ashdod", destination: "masada", label: "Masada from Ashdod" }, { portId: "ashdod", destination: "dead-sea", label: "Dead Sea from Ashdod" }],
  },
];

export const shoreTourFormats = [
  { title: "Private car & driver", bestFor: "Families and small groups who value their own pace", includes: "Your party's vehicle and driver; guiding and admissions arranged separately", tradeoff: "Flexible stops and breaks, with the route agreed in advance. Request a licensed guide if you want guided visits inside sites." },
  { title: "Private guided excursion", bestFor: "Travelers who want personal attention and historical context", includes: "A private guided itinerary with the inclusions stated on its booking page", tradeoff: "More personal attention, usually at a higher total cost. Confirm the guide's language, admissions and vehicle capacity." },
  { title: "Shared guided excursion", bestFor: "Solo travelers and couples who prefer a planned group day", includes: "A set route and group format, with transport and guiding as listed", tradeoff: "A potentially lower per-person cost, with less freedom over the pace and stops. Check the departure time and group size." },
];

export const shorePlanningSteps = [
  { title: "Start with the real hours ashore", description: "Use the expected time you can leave the ship and its all-aboard deadline, rather than counting every hour between docking and sailing. Share both dates for an overnight call." },
  { title: "Choose one main experience", description: "Leave room for the drive, walking, lunch and queues. A shorter route with time to enjoy a place can be more rewarding than combining Jerusalem, Masada and the Dead Sea in a single rushed day." },
  { title: "Agree pickup and the return plan", description: "Confirm the meeting point for your ship, any terminal shuttle, the planned return time and what changes if disembarkation is delayed. Keep the operator's contact details available offline." },
  { title: "Match the day to your party", description: "Mention children's ages, mobility needs, steps, walking tolerance and any equipment. Confirm vehicle capacity, child seats, guiding, admission and cancellation terms in the full quote or booking page." },
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
