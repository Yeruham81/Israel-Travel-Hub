import { type ShoreDestinationId, type ShorePortId } from "@/data/registry";

/** Editorial update date, separate from the last check of product prices and sources. */
export const SHORE_EXCURSION_UPDATED_DATE = "2026-11-26";

export const shoreHubTitle = "Shore excursions from Israel's cruise ports";
export const shoreHubDescription = "Compare shore excursions from Ashdod and Haifa to Jerusalem, the Galilee, Masada and the coast, with guided tours or private drivers and port return.";

export const shoreHubPorts: Record<ShorePortId, {
  location: string;
  description: string;
  highlights: string[];
  planning: string;
  pickup: string;
}> = {
  ashdod: {
    location: "Southern Mediterranean coast",
    description: "A great starting point for visiting some of Israel's major attractions.",
    highlights: ["Jerusalem & Bethlehem", "Tel Aviv & Old Jaffa", "Masada & the Dead Sea"],
    planning: "A trip to Tel Aviv and Jaffa offers a more relaxed day by the Mediterranean. Jerusalem involves walking and steps; desert routes need a longer port call and time on the road.",
    pickup: "Ashdod Port is a commercial port with restricted pedestrian access. Confirm the ship's shuttle arrangements and authorized pickup point before your visit.",
  },
  haifa: {
    location: "Northern Mediterranean coast",
    description: "The ideal location for touring the northern coast and Galilee region.",
    highlights: ["Haifa & Akko", "Nazareth & Sea of Galilee", "Jerusalem on a longer call"],
    planning: "Choosing attractions in northern Israel gives you more time for sightseeing and less time on the road. Jerusalem and Tel Aviv mean longer drives south, so plan a selective itinerary.",
    pickup: "The passenger-terminal public access is via a pedestrian bridge near 65 HaAtsmaut Street; confirm any ship-specific meeting instructions.",
  },
};

export const shoreHubExperiences: {
  id: "jerusalem" | "history" | "galilee" | "coast" | "north-coast" | "desert";
  title: string;
  description: string;
  bestFor: string;
  links: { portId: ShorePortId; destination: ShoreDestinationId; label: string }[];
}[] = [
  { id:"jerusalem",title:"Jerusalem",description:"Old City landmarks, sacred sites and viewpoints.",bestFor:"History and religious heritage",links:[{portId:"ashdod",destination:"jerusalem",label:"From Ashdod"},{portId:"haifa",destination:"jerusalem",label:"From Haifa"}] },
  {
    id: "history", title: "Jerusalem & Bethlehem",
    description: "Wander Jerusalem's ancient lanes and discover its sacred landmarks, alongside Bethlehem's rich heritage.",
    bestFor: "First-time visitors, history lovers and pilgrims",
    links: [{ portId: "ashdod", destination: "bethlehem", label: "From Ashdod" }, { portId: "haifa", destination: "bethlehem", label: "From Haifa" }],
  },
  {
    id: "galilee", title: "Nazareth & the Sea of Galilee",
    description: "Explore Nazareth's landmark churches, charming Galilee villages and the peaceful shores of the Sea of Galilee.",
    bestFor: "Christian heritage and scenic countryside",
    links: [{ portId: "haifa", destination: "galilee", label: "From Haifa" }, { portId: "ashdod", destination: "galilee", label: "From Ashdod" }],
  },
  {
    id: "coast", title: "Tel Aviv & Jaffa",
    description: "Enjoy colourful old harbours, winding stone lanes, lively markets and beautiful Mediterranean views.",
    bestFor: "Couples, families and a less hurried city experience",
    links: [{ portId: "ashdod", destination: "tel-aviv", label: "From Ashdod" }, { portId: "haifa", destination: "tel-aviv", label: "From Haifa" }],
  },
  { id:"north-coast",title:"Haifa & Akko",description:"Carmel views, historic harbour and market lanes.",bestFor:"Northern coast and shorter journeys",links:[{portId:"haifa",destination:"akko",label:"From Haifa"}] },
  {
    id: "desert", title: "Masada & the Dead Sea",
    description: "Admire breathtaking desert panoramas from Masada and unwind beside the shimmering waters of the Dead Sea.",
    bestFor: "Dramatic landscapes and a full day of discovery",
    links: [{ portId: "ashdod", destination: "masada", label: "From Ashdod" }],
  },
];

export const shoreTourFormats = [
  { title: "Private car & driver", bestFor: "A private day trip for your group, with your choice of stops and breaks.", tradeoff: "Transport is provided; licensed guiding and admissions are separate unless specifically arranged." },
  { title: "Guided shore excursion", bestFor: "A planned tour with a guide, either private or shared depending on the offer.", tradeoff: "Check group size, language, included stops, the port meeting point and return terms." },
];

export const shorePlanningSteps = [
  { title: "How much time do you have ashore?", description: "Plan around your expected disembarkation time and all-aboard deadline as well as docking and sailing times." },
  { title: "Choose one main experience", description: "Choose your main attractions and allow time for driving, walking and queues." },
  { title: "Agree pickup and the return plan", description: "Confirm the port meeting point, any shuttle, the return buffer and your operator's contact details." },
  { title: "Plan a trip that suits your group", description: "Share your group size and accessibility needs; check vehicle capacity and cancellation terms." },
];

export const shoreHubFaqs = [
  { q: "Which Israeli cruise port is better for Jerusalem?", a: "Jerusalem excursions are listed from both Ashdod and Haifa. Ashdod is the more southerly starting point; Haifa involves a longer journey south. Choose an excursion from your ship's port that leaves enough time for sightseeing and returning before the all-aboard deadline." },
  { q: "What can I visit on a shore excursion from Haifa?", a: "Haifa and Akko offer a northern coastal day, while Nazareth and the Sea of Galilee suit Christian heritage and countryside interests. Jerusalem and Tel Aviv are longer-distance options. If Rosh Hanikra is part of your proposed route, confirm that the site is operating and agree an alternative stop." },
  { q: "Can I visit Masada and the Dead Sea from Ashdod Port?", a: "Yes, the Ashdod page includes guided and private-driver options for Masada and the Dead Sea. It is a full-day desert outing, so allow for the return drive, cable-car and admission arrangements, and time at a designated beach." },
  { q: "Is a licensed guide included in every excursion?", a: "A car-and-driver service covers transport and a driver; licensed guiding is a separate arrangement unless explicitly included. Guided tours have their own stated inclusions. Check the guide's language, site entry and any local handover arrangements for a combined Jerusalem and Bethlehem visit." },
  { q: "Does every tour include pickup and return to the same port?", a: "The excursions on these port pages are return day trips from the named port. Confirm the exact meeting point and whether a terminal shuttle is involved. Choose a tour with confirmed pickup at your cruise port." },
  { q: "What if the ship arrives late or changes its itinerary?", a: "Ask the provider for its written delay, missed-port-call and cancellation policy before booking. Discuss how the itinerary can be adjusted if your ship arrives late. Agree the return plan and cancellation terms with the booking provider." },
  { q: "How far ahead should I arrange a private day trip?", a: "Get in touch once you know your cruise date and port schedule, especially for a larger vehicle, child seats, accessibility requests or a licensed guide. Send me your cruise details, and I'll confirm availability, the itinerary, price and booking terms. All bookings require confirmation." },
];

export const shoreHubSourceIds = ["shore-haifa-terminal", "shore-ashdod-terminal", "inpa-masada"];
