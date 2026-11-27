import type { LinkProps } from "@tanstack/react-router";
import type { StayGuidePhoto } from "@/data/content";
import telAvivOldJaffa from "@/assets/tel-aviv/jaffa.webp";
import jerusalemNavonPlatform from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import benGurionRailPlatform from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import haifaColony from "@/assets/haifa/colony.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";
import jerusalemCityRail from "@/assets/guides/2026-11/jerusalem-light-rail.webp";
import telAvivBeachfront from "@/assets/tel-aviv/beachfront.webp";
import haifaPanorama from "@/assets/haifa/panorama.webp";
import einBokekBeach from "@/assets/dead-sea/beach.webp";

/**
 * Informational journey-choice pages. They deliberately do NOT use the route
 * titles, descriptions or private-service conversion copy in airportRoutes.ts.
 * Rail and bus prices must be checked with operators; private starting fares come from the current rate registry.
 */
export type AirportJourneyId = "jerusalem" | "tel-aviv" | "haifa" | "ein-bokek";
export type JourneyOption = {
  id: string; name: string; time: string; cost: string;
  bestFor: string; doorToDoor: string; availability: string;
  comparison?: { cost?: string; advantages: string; drawbacks: string };
  heading: string; paragraphs: string[]; checklist: string[]; inlineLinks?: { text: string; to: LinkProps["to"] }[];
};
export type AirportJourneyGuide = {
  id: AirportJourneyId; city: string; path: LinkProps["to"]; title: string; description: string;
  distance: string; intro: string; answer: string; trainIntro: string;
  privatePath: LinkProps["to"]; privateLabel: string; photo: StayGuidePhoto & { credit?: string; licenseUrl?: string };
  options: JourneyOption[];
  stations: { name: string; time: string; usefulFor: string }[];
  arrivalAreas: { area: string; station: string; onward: string }[];
  connections: string[]; weekend: string[]; advice: string[]; faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"] }[];
  planNext?: { label: string; to: LinkProps["to"]; note?: string }[];
  featuredRelated: { label: string; to: LinkProps["to"]; note: string }[];
  photos?: { station: Pick<StayGuidePhoto, "src" | "alt">; onward: Pick<StayGuidePhoto, "src" | "alt"> };
  destinationPhoto?: Pick<StayGuidePhoto, "src" | "alt">;
  stationLinks?: { text: string; to: LinkProps["to"] }[];
  weekendLinks?: { text: string; to: LinkProps["to"] }[];
  sources?: { title: string; url: string }[];
  updatedAt?: string;
  historicalPrices?: boolean;
  exampleJourney: { title: string; steps: { label: string; detail: string }[]; takeaway: string };
};

const commonTaxi = [
  "Order an official taxi using Gett or the airport kiosk. Follow the authorized queue signs at Terminal 3, Exit 03, or the arrivals exit at Terminal 1. For a Gett ride booked in advance, use Terminal 3, Level 2, Exit 23.",
  "The regulated meter sets the fare. Keep the ride code and receipt, and check luggage space before boarding.",
];
const commonTransfer = [
  "I can arrange a vehicle for your group and luggage, with pickup and drop-off locations agreed in advance.",
  "I'll confirm the total price, waiting time and cancellation terms in writing. All bookings require confirmation.",
];
const commonRental = [
  "Compare rental prices, insurance excess, deposits, fuel and parking costs. Check that the rental desk is open when you arrive.",
];

const byId: Record<AirportJourneyId, AirportJourneyGuide> = {
  jerusalem: {
    id: "jerusalem", city: "Jerusalem",
    path: "/travel-blog/ben-gurion-airport-to-jerusalem/",
    title: "Ben Gurion Airport to Jerusalem: Train, Taxi, Bus & Transfers",
    description: "Compare trains to Jerusalem–Yitzhak Navon, airport taxis, bus 485 and private transfers, including hotel connections and Shabbat travel.",
    distance: "Approximately 45–55 km by road, depending on your address",
    intro: "You can travel from Ben Gurion Airport to Jerusalem by train, taxi, private transfer or bus. The best option depends on your arrival time, luggage and where you're staying.",
    exampleJourney: {
      title: "Example: landing at TLV and staying near Jaffa Gate",
      steps: [
        { label: "Take the airport train", detail: "After collecting your luggage, follow the signs to the train station below Terminal 3 and check the next departure." },
        { label: "Travel to Jerusalem–Yitzhak Navon", detail: "Allow roughly 26–30 minutes on the train, then extra time to reach street level." },
        { label: "Continue toward Jaffa Gate", detail: "Take the light rail and walk to your hotel, or use a taxi if you have heavy luggage. Ask the hotel which Old City entrance and drop-off are practical." },
      ],
      takeaway: "The train works well for many central Jerusalem hotels. A taxi or private transfer may be easier with heavy luggage or accommodation inside the Old City.",
    },
    answer: "The direct train reaches Jerusalem–Yitzhak Navon in about 26–30 minutes when operating. From there, take the light rail or a taxi to your hotel. For a direct ride from the airport, use an official metered taxi or arrange a private transfer.",
    trainIntro: "Jerusalem–Yitzhak Navon is a deep underground station beside the central bus station and Jaffa Road light rail. Once you reach street level, continue to your hotel by light rail, taxi or on foot. The train does not stop at Mamilla or the Old City. For the steps before boarding at the airport, see my Ben Gurion Airport arrival guide.",
    photo: { src: "/images/travel-blog/featured-airport-jerusalem.webp", alt: "Tower of David in Jerusalem near Jaffa Gate", label: "Jerusalem Tower of David", sourceUrl: "" },
    updatedAt: "2026-11-23",
    historicalPrices: false,
    destinationPhoto: { src: jerusalemCityRail, alt: "Jerusalem light rail travelling along Jaffa Road" },
    photos: {
      station: { src: jerusalemNavonPlatform, alt: "Israel Railways train beside the deep underground platform at Jerusalem Yitzhak Navon station" },
      onward: { src: benGurionRailPlatform, alt: "Ben Gurion Airport railway station platform used to board trains toward Jerusalem" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }],
    weekendLinks: [{ text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }, { text: "Sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" }, { text: "Israel\'s holiday and special dates guide", to: "/travel-blog/calendar-of-events/" }],
    sources: [
      { title: "Israel Railways - official route and current train fare", url: "https://www.rail.co.il/" },
      { title: "Israel Railways - free personal voucher for Jerusalem line (August 2026 notice)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Israel Airports Authority - route 485, airport rail and taxi directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Gett - authorized taxi queue and ride-code process", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner - bus 485 service dates", url: "https://bus.gov.il/en/home" },
      { title: "Israel Railways - timetable changes from November 14, 2026", url: "https://rail.co.il/?page=new-schedule-141126" },
    ],
    privatePath: "/airport-transfers/jerusalem/",
    privateLabel: "Request a private Jerusalem transfer",
    options: [
      { id: "rail", name: "Direct train", time: "26–30 min", cost: "₪21 per adult (one way)", bestFor: "Solo/couples, light luggage", doorToDoor: "No", availability: "Not during the main Shabbat break", comparison: { cost: "₪21", advantages: "Fast and affordable", drawbacks: "Ends at Yitzhak Navon station; no Shabbat service" }, heading: "Taking the direct train to Jerusalem–Yitzhak Navon", paragraphs: [
        "Follow the signs to the railway station beneath Terminal 3 and check the departure to Jerusalem–Yitzhak Navon.",
        "For ticket validation and local transport, see my getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Plan how to get from Yitzhak Navon station to your hotel.", "Check trains for Friday, Saturday evening and holidays.", "Allow additional time for the deep underground station."] },
      { id: "taxi", name: "Official airport taxi", time: "45–60+ min", cost: "Regulated meter; check current taxi tariff", bestFor: "Immediate ride to the address", doorToDoor: "Yes", availability: "Usually around the clock", comparison: { cost: "Metered fare", advantages: "Direct ride, no advance booking needed", drawbacks: "Metered fare varies with traffic" }, heading: "Using the authorized metered taxi to Jerusalem", paragraphs: [
        ...commonTaxi, "If you're staying in or near the Old City, ask your hotel where a vehicle can drop you off. You may need to walk the final stretch with your luggage. See the official airport taxi guide for pickup instructions and the taxi fares in Israel guide for metered prices."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares in Israel guide", to: "/travel-blog/taxi-fares-in-israel/" }], checklist: ["Order with Gett or use the airport kiosk, then follow the queue instructions.", "Confirm payment and the regulated meter.", "For Old City lodging, save the recommended drop-off point."] },
      { id: "private", name: "Private transfer arranged ahead", time: "45–60+ min", cost: "Written quote; published weekday starting rate on booking page", bestFor: "Family, groups and special pickup needs", doorToDoor: "To agreed vehicle-accessible point", availability: "By confirmation", comparison: { advantages: "Pre-arranged pickup and vehicle choice", drawbacks: "Book ahead; extras may apply" }, heading: "When is a pre-booked private pickup worthwhile?", paragraphs: [
        ...commonTransfer, "A private transfer is particularly convenient for families with children, travelers with several suitcases and late-night arrivals. Arrange pickup or drop-off near an Old City gate close to your hotel. Visit my private transfer to Jerusalem page for prices, service details and booking inquiries."
      ], inlineLinks: [{ text: "private transfer to Jerusalem page", to: "/airport-transfers/jerusalem/" }], checklist: ["Request the vehicle size and child seats that you actually need.", "Share the hotel entrance and flight number.", "Check waiting time and flight-delay terms in writing."] },
      { id: "bus", name: "Bus 485 (very limited)", time: "55–60+ min", cost: "About ₪14.50 per adult (when operating)", bestFor: "Only if its timetable fits your flight", doorToDoor: "No", availability: "Sparse departures; confirm date and operator", comparison: { cost: "≈₪14.50", advantages: "Public-transport alternative", drawbacks: "Very limited departures" }, heading: "Is there a direct bus from the airport to Jerusalem?", paragraphs: [
        "The Israel Airports Authority still lists bus 485 to Jerusalem at Terminal 3, Level 2, Exit 21. Bus 485 runs infrequently, so check whether a departure suits your arrival time in the official national public-transport planner.",
        "If a departure suits your flight, check where bus 485 stops in Jerusalem and how to reach your hotel from there. For boarding payment and ticket validation, see the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Check line 485's departure times in the national public transport planner.", "Check the terminal and boarding area.", "Consider the train or an arranged transfer as an alternative."] },
      { id: "rental", name: "Rental car", time: "45–60+ min", cost: "Rental + insurance, fuel and parking", bestFor: "Onward multi-city road trip", doorToDoor: "Yes, where driving is allowed", availability: "Depends on collection hours", comparison: { cost: "Varies", advantages: "Convenient for multi-city trips", drawbacks: "Parking and traffic in Jerusalem" }, heading: "Should you rent a car for a stay in Jerusalem?", paragraphs: [
        ...commonRental, "Jerusalem's Old City, pedestrian areas and central parking restrictions can make a car inconvenient during a city-focused stay. Compare collection and vehicle options on DiscoverCars."
      ], inlineLinks: [{ text: "DiscoverCars", to: "/car-rental/" }], checklist: ["Check permitted parking at your accommodation.", "Compare airport collection with picking up your rental car in the city after a few days.", "Verify rental operating hours for your arrival day."] },
    ],
    stations: [{ name: "Jerusalem–Yitzhak Navon", time: "Around 26–30 min from TLV", usefulFor: "Near the Central Bus Station and the Jaffa Road light rail." }],
    arrivalAreas: [
      { area: "Downtown / Jaffa Road", station: "Jerusalem–Yitzhak Navon", onward: "Use the light rail along Jaffa Road or take a short taxi ride to your address." },
      { area: "Mamilla", station: "Jerusalem–Yitzhak Navon", onward: "Take the light rail toward the city center and walk the final stretch, or use a taxi with luggage." },
      { area: "Old City / Jaffa Gate", station: "Jerusalem–Yitzhak Navon", onward: "Continue toward City Hall and Jaffa Gate. Confirm the closest accessible gate with your accommodation." },
      { area: "Mount Scopus / East Jerusalem", station: "Jerusalem–Yitzhak Navon", onward: "Take a local bus or taxi to your hotel." },
    ],
    connections: [
      "For Downtown/Mamilla, choose the best light-rail stop or a taxi from Navon, and check the walking distance with luggage. Allow time to walk from the station or drop-off point to your hotel.",
      "For the Old City, know which gate is closest to your accommodation. Even a short walk can be difficult with luggage because of steps and steep streets.",
      "For accommodation outside central Jerusalem, check the complete journey from Yitzhak Navon station to your address."
    ],
    weekend: [
      "Israel Railways and most regular buses normally stop during the main Shabbat period and many Jewish holidays. Check the journey planner for the last departure before Shabbat and the first Saturday-night service.",
      "If trains are not running when you arrive, take an official metered taxi or arrange a private transfer. You can also rent a car if the rental desk is open.",
      "The regular Nesher airport-to-Jerusalem shared-taxi route described in older guides no longer runs. Do not rely on old pickup details. My Sherut in Israel guide explains the distinction, and the airport Shabbat transport guide covers current weekend options.",
      "For holiday-related travel planning, see Israel\'s holiday and special dates guide."
    ],
    advice: [
      "Allow time for baggage collection and the journey from Yitzhak Navon station to your hotel.",
      "Keep the full hotel address and nearest Old City gate handy, especially if arriving after dark.",
      "For several suitcases or a family group, check luggage space and any child-seat requirements.",
      "On Fridays and holiday eves, check the last train before choosing public transport.",
    ],
    faqs: [
      { q: "What is the cheapest way from Ben Gurion Airport to Jerusalem?", a: "During operating hours, the direct train is usually the cheapest option, at ₪21 for an adult ticket, plus local transport. The Jerusalem line also requires a free personal voucher." },
      { q: "Do I need a free voucher for the Jerusalem train?", a: "Yes. Each passenger needs a free personal voucher as well as a valid train ticket. Follow the official voucher instructions in the train section above." },
      { q: "Can the train take me directly to the Old City or Mamilla?", a: "No. The train stops at Jerusalem–Yitzhak Navon near the central bus station. Continue by light rail, suitable taxi or a walk; check the gate and hotel entrance if carrying luggage." },
      { q: "How much is a taxi from the airport to Jerusalem?", a: "Official airport taxis use the regulated meter. The total depends on the exact address, traffic, pickup time and permitted extras; check the current taxi tariff and pay according to the meter." },
      { q: "Does bus 485 still run directly to Jerusalem?", a: "The airport still lists it from Terminal 3, Level 2, Exit 21, but scheduled departures are very limited. Check the timetable and where the bus stops in Jerusalem." },
      { q: "Do trains run to Jerusalem on Shabbat or late at night?", a: "Trains usually stop during the main Shabbat break, while some late-night or Saturday-evening departures may be scheduled. Always check your exact date, including timetable revisions and voucher rules." },
      { q: "Should I book a taxi or a private transfer for an Old City hotel?", a: "An authorized taxi runs on the regulated meter. A private ride requires a confirmed quote and agreed vehicle. For either one, ask your accommodation for its nearest vehicle-accessible entrance or gate." },
    ],
    featuredRelated: [
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", note: "Choose a neighborhood and hotel location." },
      { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", note: "Plan your visit and key sights." },
      { label: "Jerusalem Old City", to: "/attractions/old-city-jerusalem/", note: "Find the gates and walking approaches." },
      { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", note: "Understand rail, bus and ticketing." },
      { label: "Airport taxis and pickup", to: "/travel-blog/ben-gurion-airport-taxis/", note: "Find the official taxi departure point." },
      { label: "Airport transport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/", note: "Compare arrivals during the weekend." },
    ],
    related: [
      { label: "Ben Gurion Airport taxis and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Travelling from Ben Gurion Airport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Sherut and shared airport shuttle options", to: "/travel-blog/sherut-in-israel/" },
      { label: "Getting around Israel by train, bus or taxi", to: "/travel-blog/getting-around-israel/" },
      { label: "Taxi fares and metered rates in Israel", to: "/travel-blog/taxi-fares-in-israel/" },
      { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
    ],
    planNext: [
      { label: "Choose where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", note: "Find a hotel area that fits your arrival and sightseeing plans." },
      { label: "Explore Jerusalem's Old City", to: "/attractions/old-city-jerusalem/", note: "Check the gates, walking routes and practical access." },
      { label: "Jerusalem tours and sightseeing", to: "/tours/jerusalem/", note: "Find guided walks and experiences in the city." },
      { label: "Choose an Israel eSIM", to: "/travel-blog/best-esim-for-israel/", note: "Keep maps, rail timetables and arrival messages at hand." },
    ],
  },
  "tel-aviv": {
    id: "tel-aviv", city: "Tel Aviv & Jaffa",
    path: "/travel-blog/ben-gurion-airport-to-tel-aviv/",
    title: "Ben Gurion Airport to Tel Aviv: Train, Taxi, Bus & Transfers",
    description: "Compare trains, bus 445, airport taxis and private transfers to Tel Aviv. Choose the right station for your hotel and check weekend line 711.",
    distance: "Approximately 20–25 km to central Tel Aviv, depending on the address",
    intro: "You can reach Tel Aviv from Ben Gurion Airport by train, bus, taxi or private transfer. The best choice depends on where you're staying, your luggage and your arrival time.",
    exampleJourney: {
      title: "Example: a hotel on the central beachfront",
      steps: [
        { label: "Choose the rail service", detail: "From Terminal 3, choose HaHagana, HaShalom or Savidor Center according to the easiest connection to your hotel." },
        { label: "Get from the station to the beach or hotel", detail: "Tel Aviv's railway stations are inland. Check how to reach your hotel by bus, taxi or on foot, especially if you're staying near the beach." },
        { label: "Recheck a Friday or Saturday arrival", detail: "Regular rail service stops for much of Shabbat. Weekend bus line 711 serves Terminal 1 and selected stops in Tel Aviv, with limited Friday and Saturday departures." },
      ],
      takeaway: "If you're arriving during the day with little luggage, the train is a convenient option. For Old Jaffa, family luggage or late arrivals, compare the whole door-to-door journey.",
    },
    answer: "The train is usually the fastest low-cost choice during operating hours. Choose the station that works best for your hotel, then continue by bus or taxi. Bus 445 may serve a more convenient city stop; an official taxi or private transfer goes directly to an accessible address.",
    trainIntro: "The airport railway station is below Terminal 3; follow the train signs after customs. If you arrive at Terminal 1, take the free internal shuttle to Terminal 3 first. Buy a train ticket at the station or use an accepted Rav-Kav or payment app. A standard adult train ticket to Tel Aviv costs ₪11.50. Tel Aviv has four mainline stations: HaHagana, HaShalom, Savidor Center and University. None is directly on the beachfront, so plan how to reach your hotel by bus, taxi, light rail or on foot. The Ben Gurion Airport arrival guide explains what to do at the airport; the getting around Tel Aviv guide covers city transport.",
    photo: { src: "/images/home/transfer-tel-aviv-beach-skyline.webp", alt: "Tel Aviv Mediterranean beachfront and skyline", label: "Tel Aviv beachfront", sourceUrl: "" },
    updatedAt: "2026-11-23",
    historicalPrices: false,
    destinationPhoto: { src: telAvivBeachfront, alt: "Tel Aviv beach and Mediterranean waterfront" },
    photos: {
      station: { src: benGurionRailPlatform, alt: "Ben Gurion Airport railway platform below Terminal 3, where trains depart toward Tel Aviv" },
      onward: { src: telAvivOldJaffa, alt: "Old Jaffa waterfront and streets, where the final hotel pickup point may differ from a train station" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }, { text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }],
    weekendLinks: [{ text: "dedicated airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },],
    sources: [
      { title: "Israel Railways - check trains and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways - revised timetable from November 14, 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Israel Airports Authority - Line 445, taxis and internal shuttle", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Tel Aviv visitor information - four railway stations and airport transport", url: "https://visit.tel-aviv.gov.il/move/airport" },
      { title: "Na’im Busofash - weekend Line 711 and Terminal 1 stop", url: "https://busofash.co.il/?lines=711" },
      { title: "Gett - official airport taxi ordering and pickup", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner - bus 445 timetable", url: "https://bus.gov.il/en/home" },
    ],
    privatePath: "/airport-transfers/tel-aviv/",
    privateLabel: "Request a private Tel Aviv or Jaffa transfer",
    options: [
      { id: "rail", name: "Train to Tel Aviv", time: "About 11–30 min to a station", cost: "₪11.50 per adult (one way)", bestFor: "Quick, lower-cost weekday arrival", doorToDoor: "No", availability: "Not during the main Shabbat break", comparison: { cost: "₪11.50", advantages: "Quick, low-cost and avoids traffic", drawbacks: "Train stops inland; hotel connection often required" }, heading: "Train from Ben Gurion Airport to Tel Aviv", paragraphs: [
        "Use the station table below to choose the train stop with the easiest connection to your hotel.",
        "For hotels near the beach, Old Jaffa or Neve Tzedek, my where to stay in Tel Aviv guide explains the neighborhoods, and the getting around Tel Aviv guide covers local connections."
      ], inlineLinks: [{ text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" }, { text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }], checklist: ["Use the full hotel address when choosing the station.", "Check the last train departure and which stations it serves.", "Consider the cost of transport from the station to your hotel and how much luggage you're carrying."] },
      { id: "bus", name: "Bus 445", time: "About 40–70+ min, depending on stop", cost: "₪8–14.50 per adult, depending on stop", bestFor: "Addresses near its city stops", doorToDoor: "No", availability: "Timetable dependent; Shabbat restrictions", comparison: { cost: "₪8–14.50", advantages: "May reach central or beachfront stops", drawbacks: "Slower; timetable and stop dependent" }, heading: "Bus 445: another route into central Tel Aviv", paragraphs: [
        "The Israel Airports Authority lists Kavim bus 445 from Terminal 3, Level 2, Exit 21. The route may bring you closer to parts of central Tel Aviv or the beachfront than a rail station. Check bus 445's current timetable and stops before choosing it.",
        "Bus 445 usually takes around 40–70 minutes, depending on traffic and where you get off. Check the walk from your stop to the hotel, especially with luggage. Regular public buses do not normally take cash from the driver: have a valid Rav-Kav or supported public transport payment app ready. For ticketing and validation basics, see my getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Check Kavim's line 445 timetable for your travel date.", "Check Terminal 3 Level 2, Exit 21 and direction.", "Check the walking distance from the bus stop to your hotel."] },
      { id: "taxi", name: "Official airport taxi", time: "About 20–40+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "Direct on-demand hotel ride", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", comparison: { cost: "Metered; varies", advantages: "Direct ride, including on Shabbat", drawbacks: "Traffic, fares and queue time vary" }, heading: "Official airport taxi to Tel Aviv or Jaffa", paragraphs: [
        ...commonTaxi, "For a beachfront hotel or an Old Jaffa address, provide the hotel name and nearest permitted vehicle entrance. Traffic can increase journey time and the meter fare. Do not accept unsolicited driver offers in arrivals. For more details, see the official airport taxi guide, taxi fares guide and Uber alternatives guide."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }, { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" }], checklist: ["Follow the official Gett kiosk/queue system.", "Provide the exact Jaffa or Tel Aviv address.", "Request a larger taxi if you're travelling with several suitcases."] },
      { id: "private", name: "Advance private transfer", time: "About 20–40+ min after pickup", cost: "Written quote; weekday starting rate on booking page", bestFor: "Families, extra luggage, planned meeting", doorToDoor: "To confirmed address", availability: "By confirmation", comparison: { advantages: "Agreed vehicle, meeting point and price", drawbacks: "Advance confirmation; costs more than rail" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer, "A private transfer is especially convenient for families, travelers with several suitcases, passengers requiring child seats and late-night arrivals. If you're staying in Old Jaffa, arrange a convenient drop-off point in advance. My private transfer to Tel Aviv page includes service details and starting prices. Send your flight and destination details to receive a personal quote and written booking confirmation."
      ], inlineLinks: [{ text: "private transfer to Tel Aviv page", to: "/airport-transfers/tel-aviv/" }], checklist: ["Send flight number, passengers, bags and children's ages.", "Confirm the vehicle and any extra charges.", "Confirm where your driver can drop you off in Jaffa."] },
      { id: "weekend", name: "Weekend line 711", time: "Variable with stop and departure", cost: "Free where operating", bestFor: "Flexible weekend traveler with light luggage", doorToDoor: "No", availability: "Limited Friday/Saturday timetable, Terminal 1", comparison: { cost: "Free", advantages: "Free limited Shabbat option", drawbacks: "Terminal 1 only; sparse trips, not door to door" }, heading: "Free weekend bus 711 on Shabbat", paragraphs: [
        "Tel Aviv's municipality lists the free Naim Busofash line 711 via Ben Gurion Airport Terminal 1 between Shoham and central Tel Aviv. ",
        "If arriving at Terminal 3, take the free internal shuttle from Level G near Gate 01 to Terminal 1. Bus 711 serves airport stop 34609 on its limited timetable; check the Tel Aviv-bound direction and final walk. My airport Shabbat guide explains how to reach Terminal 1 and when trains resume on Saturday evening."
      ], inlineLinks: [{ text: "airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }], checklist: ["Check the city weekend route planner, not a weekday bus schedule.", "Allow time between Terminal 3 and Terminal 1.", "Plan the bus ride or walk from the city stop to your hotel."] },
      { id: "rental", name: "Rental car", time: "About 20–40+ min plus collection", cost: "Rental + parking, insurance and fuel", bestFor: "Journey beyond Tel Aviv", doorToDoor: "Yes, where permitted", availability: "Depends on rental office opening hours", comparison: { cost: "Rental + extras", advantages: "Flexibility for trips beyond Tel Aviv", drawbacks: "Collection time, traffic and city parking" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental, "Parking in central Tel Aviv and Jaffa is limited and can be expensive. If you intend to spend the first few days walking around the city, consider renting only when you leave. Compare vehicle options on DiscoverCars."
      ], inlineLinks: [{ text: "DiscoverCars", to: "/car-rental/" }], checklist: ["Check your hotel's parking arrangements.", "Compare city and airport pickup costs.", "Confirm any toll or one-way charges."] },
    ],
    stations: [
      { name: "Tel Aviv–HaHagana", time: "≈ 11–15 min", usefulFor: "Southern city connections and the Levinsky/Florentin area." },
      { name: "Tel Aviv–HaShalom", time: "≈ 15–20 min", usefulFor: "Azrieli, Sarona and the business center." },
      { name: "Tel Aviv–Savidor Center", time: "≈ 20–25 min", usefulFor: "Arlozorov, northern/central onward buses." },
      { name: "Tel Aviv–University", time: "Up to ≈ 30 min", usefulFor: "Ramat Aviv, university and Expo Tel Aviv." },
    ],
    arrivalAreas: [
      { area: "Florentin / Neve Tzedek", station: "Tel Aviv–HaHagana", onward: "Continue by bus or taxi and allow time to walk to your hotel with luggage." },
      { area: "Rothschild / Sarona", station: "HaHagana or HaShalom", onward: "Choose the station closest to your address, then continue by bus, taxi or on foot." },
      { area: "Beachfront / Dizengoff", station: "HaShalom or Savidor Center", onward: "Continue by bus or taxi toward the promenade or hotel." },
      { area: "Old Jaffa", station: "Tel Aviv–HaHagana", onward: "Take a local bus or taxi to the nearest vehicle-accessible entrance." },
      { area: "Ramat Aviv / Expo", station: "Tel Aviv–University", onward: "Use a local bus, taxi or walk according to the destination." },
    ],
    connections: [
      "Beachfront accommodation: the station is usually inland; compare a local bus or taxi for the last leg, especially with luggage.",
      "Old Jaffa: narrow streets and steps may mean walking the last part of your journey. Ask your hotel where a taxi can drop you off.",
      "For Dizengoff Street or Rothschild Boulevard, compare nearby bus stops before choosing a train station.",
    ],
    weekend: [
      "Standard trains and most regular buses do not run during the main Shabbat break. Tel Aviv’s free weekend bus 711 serves Terminal 1 on a limited timetable. Check the bus timetable and stops.",
      "Consider an official airport taxi or a pre-booked private transfer for late arrivals, large suitcases or flights outside line 711's operating hours.",
      "Check Saturday-evening train departures and holiday changes in the dedicated airport Shabbat guide."
    ],
    advice: [
      "Families should compare the total cost of train tickets and a taxi to the hotel with the price of a private airport transfer.",
      "If you're staying in Old Jaffa or on a pedestrian street, ask your hotel for the nearest taxi drop-off point.",
      "For a late arrival, check the last train and the next available alternative.",
    ],
    faqs: [
      { q: "Is there a sherut from Ben Gurion Airport to Tel Aviv?", a: "Regular shared airport taxis to Tel Aviv are currently unavailable. Alternatives include trains and buses when running, licensed taxis and pre-booked private transfers." },
      { q: "Can I pay cash to the driver of bus 445?", a: "Generally, no. Pay with a loaded Rav-Kav card or a supported public transport app. Check the current payment rules before travelling." },
      { q: "Which train station is closest to Tel Aviv's beach?", a: "None is directly on the promenade. Choose between HaHagana, HaShalom and Savidor Central according to the easiest connection to your beachfront hotel." },
      { q: "How can I reach Tel Aviv on Shabbat?", a: "Check departure times and Tel Aviv stops for the free weekend bus line 711 from Terminal 1. Alternatively, take an authorized metered airport taxi or book a private transfer in advance." },
      { q: "What is bus 445 and where does it leave?", a: "Kavim's airport-to-Tel Aviv bus is listed by the Airports Authority from Terminal 3 Level 2 Exit 21. Check the live timetable, route and direction before relying on it." },
      { q: "What if my hotel is in Jaffa?", a: "There is no mainline railway station in Old Jaffa. Plan a bus or taxi from your chosen Tel Aviv station, or arrange a direct ride to an accessible drop-off point." },
      { q: "Will the airport train take me straight to the hotel?", a: "No. Trains stop at four railway stations in Tel Aviv. Most hotels are a further walk, bus or taxi ride away." },
      { q: "How do I pay for a train or bus to Tel Aviv?", a: "A standard adult train ticket costs ₪11.50. Buy a single train ticket at the airport railway station or use a loaded Rav-Kav or supported payment app. Bus 445 costs ₪8–14.50 depending on your stop; pay with a loaded Rav-Kav or supported payment app." },
      { q: "Can I get an Uber from Ben Gurion Airport to Tel Aviv?", a: "No. Uber passenger rides are not currently available in Israel. Use the authorized Gett airport taxi system or a separately confirmed private transfer." },
      { q: "Do trains run from the airport late at night?", a: "Some trains run late at night, with stops varying by service. Check the timetable for your arrival time and destination station." },
    ],
    featuredRelated: [
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Choose a hotel area that fits your arrival." },
      { label: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/", note: "Continue from the station by bus or light rail." },
      { label: "Old Jaffa visitor guide", to: "/attractions/jaffa/", note: "Find the old port and historic streets." },
      { label: "Tel Aviv attractions", to: "/travel-blog/attractions-in-tel-aviv/", note: "Explore places to visit across the city." },
      { label: "Airport taxis and pickup", to: "/travel-blog/ben-gurion-airport-taxis/", note: "Find the official taxi departure point." },
      { label: "Airport transport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/", note: "Check weekend travel choices." },
    ],
    related: [
      { label: "Official airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" },
      { label: "Airport transport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Sherut in Israel: what still operates", to: "/travel-blog/sherut-in-israel/" },
      { label: "Uber, Gett and Yango in Israel", to: "/travel-blog/uber-in-israel/" },
      { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
    ],
    planNext: [
      { label: "Choose where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Match the hotel area to your arrival station or bus stop." },
      { label: "Beachfront hotels in Tel Aviv", to: "/accommodation/tel-aviv/beachfront/", note: "Find a hotel close to the promenade and check its access." },
      { label: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/", note: "Plan your first day near the coast." },
      { label: "Tel Aviv and Jaffa tours", to: "/tours/tel-aviv-jaffa/", note: "Explore guided city walks and experiences." },
    ]
  },
  haifa: {
    id: "haifa", city: "Haifa",
    path: "/travel-blog/ben-gurion-airport-to-haifa/",
    title: "Ben Gurion Airport to Haifa: Train, Taxi, Bus & Transfers",
    description: "Travel from Ben Gurion Airport to Haifa by train, taxi or private transfer. Find the best station for Mount Carmel, the port and your hotel.",
    distance: "Approximately 100–110 km to central Haifa",
    intro: "You can reach Haifa from Ben Gurion Airport by train, taxi, private transfer or limited bus services. If taking the train, choose the station with the easiest connection to your hotel.",
    exampleJourney: {
      title: "Example: deciding which Haifa station to use",
      steps: [
        { label: "Lower City or German Colony", detail: "Haifa Center HaShmona is convenient for downtown hotels. If you're carrying luggage, consider taking a taxi from the station to your hotel." },
        { label: "Mount Carmel hotel", detail: "Trains run along the coast, while Carmel Center is uphill. You'll usually need a bus or taxi from the station." },
        { label: "Cruise connection", detail: "Confirm the ship, terminal instructions, boarding deadline and how you will reach the pedestrian entrance." },
      ],
      takeaway: "Choose the station with the easiest onward route to your hotel.",
    },
    answer: "The train is usually the best low-cost option when running. Choose a station near your destination: Hof HaCarmel for southern Haifa, Bat Galim for the coast or Center HaShmona for downtown. Hotels on Mount Carmel generally need an uphill bus or taxi; a direct taxi or private transfer avoids that change.",
    trainIntro: "The Ben Gurion Airport railway station is below Terminal 3. Follow the train signs after customs; passengers using Terminal 1 first need the free internal shuttle to Terminal 3. Direct trains to Haifa take approximately 80–110 minutes, depending on your destination station and the service. Buy a ticket at the station or use a valid Rav-Kav or supported payment app. Check the current fare and make sure your train stops at the station nearest your hotel. Haifa's railway stations are near the coast. To reach a hotel on Mount Carmel, you'll usually need a bus or taxi. My Ben Gurion Airport arrival guide explains what to do at the airport, and the getting around Israel guide covers public transport.",
    photo: { src: "/images/travel-blog/featured-airport-haifa.webp", alt: "Route to Haifa from Ben Gurion Airport", label: "Airport to Haifa", sourceUrl: "" },
    updatedAt: "2026-11-23",
    historicalPrices: false,
    destinationPhoto: { src: haifaPanorama, alt: "Panoramic view of Haifa and Mount Carmel" },
    photos: {
      station: { src: benGurionRailPlatform, alt: "Railway platform at Ben Gurion Airport beneath Terminal 3" },
      onward: { src: haifaColony, alt: "Haifa German Colony and Mount Carmel above the lower city" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }, { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }],
    weekendLinks: [
      { text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { text: "Sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" },
    ],
    sources: [
      { title: "Israel Railways - current Haifa departures and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways - timetable changes starting November 14, 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Egged bus 905 - current stop list and limited operation", url: "https://moovitapp.com/index/en/public_transit-line-905-Israel-1-1-81823102-0" },
      { title: "Israel Airports Authority - train, taxis and terminal directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett - official airport taxi booking", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner - bus 905 timetable and fares", url: "https://bus.gov.il/en/home" },
    ],
    privatePath: "/airport-transfers/haifa/",
    privateLabel: "Request a private Haifa transfer",
    options: [
      { id: "rail", name: "Train to Haifa", time: "About 80–110 min to a station", cost: "₪30.50 per adult (one way)", bestFor: "Budget-minded intercity travel", doorToDoor: "No", availability: "Varies; not during the main Shabbat break", comparison: { cost: "₪30.50", advantages: "Direct, affordable, avoids road traffic", drawbacks: "Coastal stations; uphill hotel connection may be needed" }, heading: "Train from Ben Gurion Airport to Haifa", paragraphs: [
        "The airport train stops at several stations along Haifa's coastline. Choose the station closest to your hotel using the table below. Allow extra time if you're staying on Mount Carmel.",
        "My where to stay in Haifa guide explains the neighborhoods, while the getting around Israel guide covers tickets and local connections."
      ], inlineLinks: [{ text: "where to stay in Haifa guide", to: "/travel-blog/best-hotels-in-haifa/" }, { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Check that your train stops at your chosen Haifa station.", "Check how far your hotel is from the station and whether you'll need a taxi uphill.", "Look up late-night and Saturday-evening trains separately."] },
      { id: "taxi", name: "Official airport taxi", time: "About 75–110+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "On-demand arrival at a hotel", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", comparison: { cost: "Regulated meter", advantages: "Direct ride at any time, including Shabbat", drawbacks: "Meter varies with traffic and tariff; luggage limits" }, heading: "Official airport taxi to Haifa", paragraphs: [
        ...commonTaxi, "Travel time and taxi fares depend on where you're going in Haifa, particularly whether your destination is by the coast or up Mount Carmel. Provide the exact building or authorized terminal entrance, and keep your ride code. Read the official airport taxi guide for Gett pickup instructions, the taxi fares guide for regulated meter charges, and my Uber alternatives guide for app availability."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }, { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" } ], checklist: ["Use Gett or the authorized kiosk and queue.", "Specify the destination neighborhood and building.", "Allow extra margin for a cruise connection."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 75–110+ min after pickup", cost: "Written quote; starting rate on booking page", bestFor: "Large parties, bags, timed connections", doorToDoor: "To agreed point", availability: "By confirmation", comparison: { advantages: "Vehicle size, pickup and written price arranged", drawbacks: "Book and confirm in advance; costs more than rail" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer, "A pre-booked transfer is especially convenient for travelers staying on Mount Carmel, larger groups, passengers with several suitcases and cruise passengers. If you're joining a cruise, provide the ship's name, passenger terminal entrance and check-in deadline. Allow extra time for flight delays and traffic. See my private transfer to Haifa page for vehicle options, starting prices and a personal quote."
      ], inlineLinks: [{ text: "private transfer to Haifa page", to: "/airport-transfers/haifa/" } ], checklist: ["Confirm luggage and vehicle size.", "If travelling to a ship, share boarding deadlines.", "Request the exact Haifa hotel or terminal entrance."] },
      { id: "bus", name: "Bus 905 (limited)", time: "About 110–125+ min when available", cost: "Distance-based fare; limited service", bestFor: "Arrivals that coincide with the bus timetable", doorToDoor: "No", availability: "Limited departures on Saturday night and early Sunday morning", comparison: { cost: "Distance-based", advantages: "Low-cost direct bus when available", drawbacks: "Limited weekend departures and possible additional transport within Haifa" }, heading: "Bus 905 from the airport to Haifa: limited weekend service", paragraphs: [
        "Bus 905 runs on a limited timetable, mainly on Saturday night and early Sunday. Check the live timetable and boarding stop for your arrival date, allowing time for passport control and baggage collection.",
        "Line 905 lists stops at Haifa Hof HaCarmel and HaMifratz Central. Check the stops for your travel date. You'll need another bus, train or taxi to reach the German Colony or Center HaShmona. The fare for bus 905 depends on the distance travelled. Pay for regular bus journeys with a loaded Rav-Kav or supported payment app. Drivers generally do not accept cash. My getting around Israel guide explains the available payment methods."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Check departure times for your arrival date.", "Check the exact Terminal 3 boarding stop and city destination.", "Consider a train (when running) or taxi as an alternative."] },
      { id: "rental", name: "Rental car", time: "About 75–110+ min driving plus collection", cost: "Rental + insurance, tolls, fuel and parking", bestFor: "A northern Israel road trip", doorToDoor: "Yes, where permitted", availability: "Collection hours vary", comparison: { cost: "Rental + extras", advantages: "Flexible for further northern Israel travel", drawbacks: "Collection hours, hills, tolls and parking" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental, "Buses and taxis may be more convenient for a short stay in Haifa. If you plan to explore Akko (Acre), Nazareth, the Sea of Galilee or other parts of northern Israel, compare rental-car options on DiscoverCars. See the Akko travel guide to plan your visit."
      ], inlineLinks: [{ text: "Akko travel guide", to: "/attractions/akko-acre/" }, { text: "DiscoverCars", to: "/car-rental/" } ], checklist: ["Ask about parking at your Haifa hotel.", "Check how your rental company charges for Highway 6 tolls.", "Check desk hours if arriving on Shabbat."] },
    ],
    stations: [
      { name: "Haifa Hof HaCarmel", time: "About 80–85 min", usefulFor: "Southern Haifa, Carmel Beach, MATAM and bus connections." },
      { name: "Haifa Bat Galim", time: "About 85–90 min", usefulFor: "Bat Galim, Rambam Hospital and the cable car toward Stella Maris." },
      { name: "Haifa Center HaShmona", time: "About 90–100 min", usefulFor: "Downtown, German Colony, the port district and lower Bahá’í Gardens." },
      { name: "HaMifratz Central (Lev HaMifratz)", time: "Check train stops", usefulFor: "Haifa Bay, intercity buses, the Krayot and northern connections." },
    ],
    arrivalAreas: [
      { area: "Southern Haifa / MATAM", station: "Haifa Hof HaCarmel", onward: "Use local transport for the nearby business district or beach." },
      { area: "Bat Galim / Rambam", station: "Haifa Bat Galim", onward: "Walk or take a short taxi ride to the address." },
      { area: "Downtown / German Colony", station: "Haifa Center HaShmona", onward: "Walk or take a short taxi ride toward Ben Gurion Boulevard." },
      { area: "Carmel Center / hilltop hotels", station: "Haifa Center HaShmona", onward: "Take a bus or taxi up to Carmel Center." },
      { area: "Haifa Port / cruise terminal", station: "Haifa Center HaShmona", onward: "Check your ship's passenger entrance and check-in time before continuing." },
    ],
    connections: [
      "Downtown, German Colony and lower Bahá’í Gardens: Center HaShmona is often a practical station, but check the walk and your hotel entrance.",
      "Carmel Center and hilltop accommodation: plan an uphill bus or taxi. A nearby coastal station may still require a steep climb.",
      "Cruise departures: Center HaShmona is near the port district, but the passenger entrance and baggage route are distinct; verify the ship, check-in deadline and access rules."
    ],
    weekend: [
      "Rail service normally pauses during the main Shabbat period and most Jewish holidays. Published bus 905 service is limited to Saturday night and early Sunday, and must be checked for your specific date.",
      "If no operating rail/bus connection suits the flight, compare the official airport taxi queue with an advance private transfer. Price, vehicle size and meeting instructions differ.",
      "The former Amal shared airport taxi service to Haifa has ended. My Sherut in Israel guide and airport Shabbat transport guide explain the available transport options."
    ],
    advice: [
      "Allow plenty of time between your flight's arrival and your cruise check-in deadline.",
      "Confirm luggage space and child seats if booking a standard taxi or private vehicle.",
      "If Haifa is your base for northern day trips, compare rental-car costs with rail and taxis.",
    ],
    faqs: [
      { q: "Can I buy a train ticket at the airport without a Rav-Kav?", a: "Yes. An adult single ticket to Haifa costs ₪30.50 and can be bought at the Terminal 3 railway station. Rav-Kav and supported ticketing apps are also available." },
      { q: "How do I pay for airport bus 905?", a: "Use a loaded Rav-Kav card or a supported public transport app. Drivers generally do not accept cash. Check the current payment rules before boarding." },
      { q: "Does bus 905 stop in the German Colony?", a: "No. The published route serves MATAM, Hof HaCarmel and HaMifratz Central rather than Haifa Center HaShmona or the German Colony. Plan the last part of the trip separately." },
      { q: "Is there a direct train from Ben Gurion Airport to Haifa?", a: "Yes, direct trains generally run when regular rail services are operating. Check Israel Railways for trains stopping at your chosen station on your arrival date." },
      { q: "Which station is best for Haifa's German Colony?", a: "Haifa Center HaShmona is a convenient station for downtown Haifa and the German Colony. Check your hotel's address and the walking distance or taxi ride from the station." },
      { q: "When does airport bus 905 run?", a: "Bus 905 has a very limited timetable, mainly around Saturday night and early Sunday. Check departures for your travel date and keep a train or taxi alternative." },
      { q: "Are there airport sheruts to Haifa?", a: "The former Amal shared airport taxi service to Haifa is no longer operating. You can take an authorized airport taxi or arrange a private transfer." },
      { q: "How do I get from Ben Gurion Airport to Haifa's cruise terminal?", a: "You can take the train and arrange the final journey from the station, or book a direct vehicle. Confirm your ship's passenger entrance and check-in deadline, and allow time for luggage, traffic and possible delays." },
      { q: "Which Haifa railway station should I use for a Mount Carmel hotel?", a: "Haifa's railway stations are along the coast. Most hotels on Mount Carmel require a short bus or taxi ride from the station." },
      { q: "Can I get an Uber from Ben Gurion Airport to Haifa?", a: "No. Uber passenger rides are not available in Israel as of November 2026. Use an official airport taxi or a confirmed private transfer." },
    ],
    featuredRelated: [
      { label: "Haifa attractions", to: "/attractions/haifa/", note: "Explore the German Colony, coast and Carmel." },
      { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/", note: "Compare hotel locations on the coast and hill." },
      { label: "Haifa museums", to: "/travel-blog/museums-in-haifa/", note: "Plan museums in the city." },
      { label: "Akko (Acre) visitor guide", to: "/attractions/akko-acre/", note: "Explore the nearby walled port city." },
      { label: "Caesarea visitor guide", to: "/attractions/caesarea/", note: "Plan another coastal stop." },
      { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", note: "Plan your journey by train and bus." },
    ],
    related: [
      { label: "Official airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Haifa shore excursions and port planning", to: "/shore-excursions/haifa/" },
      { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" },
      { label: "Ben Gurion Airport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Sherut in Israel: current shared-taxi options", to: "/travel-blog/sherut-in-israel/" },
    ],
    planNext: [
      { label: "Haifa travel guide", to: "/attractions/haifa/", note: "Plan the German Colony, Mount Carmel and the waterfront." },
      { label: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/", note: "Discover museums and cultural sights on Mount Carmel and downtown." },
      { label: "Akko (Acre) travel guide", to: "/attractions/akko-acre/", note: "Explore the historic walled coastal city near Haifa." },
      { label: "Nazareth and the Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Plan an excursion into the Galilee." },
    ]
  },
  "ein-bokek": {
    id: "ein-bokek", city: "Ein Bokek (Dead Sea)",
    path: "/travel-blog/ben-gurion-airport-to-ein-bokek/",
    title: "Ben Gurion Airport to Ein Bokek: Train, Bus, Taxi & Transfers",
    description: "Reach Ein Bokek from Ben Gurion Airport by train and bus via Jerusalem, taxi or private transfer. Check buses 486/444 and Dead Sea hotel stops.",
    distance: "Approximately 155–165 km to the Ein Bokek hotel strip by road",
    intro: "There is no direct train or regular airport bus to Ein Bokek. You can travel via Jerusalem by train and bus, or reach your Dead Sea hotel by taxi, private transfer or rental car. Here's how to choose the best option for your arrival time.",
    exampleJourney: {
      title: "Example: a daytime public-transport connection to Ein Bokek",
      steps: [
        { label: "Check the last bus to your hotel", detail: "Before leaving the airport, check the bus timetable from Jerusalem to your Dead Sea hotel. If your flight arrives late, you may miss the last bus." },
        { label: "Train to Jerusalem–Yitzhak Navon", detail: "Allow time to exit the deep station and reach the intercity platforms at Jerusalem Central Bus Station; obtain a free personal voucher for your selected train as well as a valid ticket." },
        { label: "Continue to the hotel district", detail: "Take bus 486 or 444 when available, and get off at the stop nearest your hotel in Ein Bokek." },
      ],
      takeaway: "The train and bus are separate services, so allow plenty of time between them. If you cannot catch the last bus, arrange another way to reach your hotel.",
    },
    answer: "For a lower-cost journey, take the train to Jerusalem and connect to bus 486 or reserved-seat bus 444. Allow roughly 3–4 hours or more and check the last bus before boarding the train. A metered taxi or confirmed private transfer goes straight to the hotel.",
    trainIntro: "Ben Gurion Airport railway station is directly below Terminal 3; follow the train signs after customs. Passengers arriving at Terminal 1 need the airport's free internal shuttle to Terminal 3. The train to Jerusalem–Yitzhak Navon usually takes about 26–30 minutes. You can buy a single train ticket at the station or use an accepted Rav-Kav or payment app. Each passenger also needs a free personal voucher for the selected Jerusalem train, in addition to a valid ticket. My airport arrival guide explains what to do at the airport, and the getting around Israel guide covers public transport tickets.",
    photo: { src: "/images/travel-blog/featured-airport-ein-bokek.webp", alt: "Road and scenery approaching Ein Bokek at the Dead Sea", label: "Airport to Ein Bokek", sourceUrl: "" },
    updatedAt: "2026-11-23",
    historicalPrices: false,
    destinationPhoto: { src: einBokekBeach, alt: "Dead Sea shoreline at Ein Bokek" },
    photos: {
      station: { src: benGurionRailPlatform, alt: "Ben Gurion Airport train station platform below Terminal 3" },
      onward: { src: deadSeaLandscape, alt: "Desert hills and water in the Dead Sea region near Ein Bokek" },
    },
    stationLinks: [
      { text: "airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
      { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" },
    ],
    weekendLinks: [
      { text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { text: "taxis in Israel guide", to: "/travel-blog/taxis-in-israel/" },
    ],
    sources: [
      { title: "Israel Railways - train times, fares and service notices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways - free Jerusalem-line travel voucher notice (19 August 2026)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Israel Railways - timetable changes starting 14 November 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Tamar Regional Council - Dead Sea public transport lines 444, 486 and 421", url: "https://www.deadsea.co.il/on-the-map/?lang=en" },
      { title: "Egged - reserved-seat lines including buses 444 and 421", url: "https://www.egged.co.il/en/information-for-passengers/tickets-information" },
      { title: "National Public Transport Journey Planner - current route and hotel-stop times", url: "https://bus.gov.il/en/home" },
      { title: "Israel Airports Authority - Terminal 3 rail and ground transport", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett - official airport taxi ride-code and queue instructions", url: "https://www.gett.com/il/airport-en/" },
      { title: "Israel Meteorological Service - flood and weather warnings", url: "https://ims.gov.il/en/warning" },
    ],
    privatePath: "/airport-transfers/ein-bokek/",
    privateLabel: "Request a private Ein Bokek transfer",
    options: [
      { id: "rail", name: "Train + bus via Jerusalem", time: "Roughly 3–4+ hours with connections", cost: "About ₪40 per adult (₪21 train + ₪19 bus)", bestFor: "Daytime arrivals, light luggage", doorToDoor: "No", availability: "Requires a bus connection in Jerusalem", comparison: { cost: "≈₪40 total", advantages: "Usually the least expensive option", drawbacks: "Change in Jerusalem, limited evening buses and a possible walk to your hotel" }, heading: "Train and bus via Jerusalem: the budget option", paragraphs: [
        "For a cheaper journey, take the train to Jerusalem–Yitzhak Navon and continue by bus to the Dead Sea. Check the last bus serving your hotel before choosing an airport train departure.",
        "My getting around Israel guide explains how to pay for public transport, and the Jerusalem to the Dead Sea guide provides details of the bus journey."
      ], inlineLinks: [
        { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" },
        { text: "Jerusalem to the Dead Sea guide", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      ], checklist: ["Check train and bus timetables for your travel date and reserve a free personal voucher for each passenger on your selected Jerusalem train.", "Check the stops, seat reservation requirements and last departure of bus lines 486 and 444.", "Allow time for passport control, baggage collection and the transfer from Yitzhak Navon railway station to Jerusalem Central Bus Station."] },
      { id: "taxi", name: "Official airport taxi", time: "About 1h 45m–2h 30m+ after pickup", cost: "Regulated meter; check current tariff", bestFor: "On-arrival direct ride to a resort", doorToDoor: "To accessible hotel entrance", availability: "Subject to available licensed taxis", comparison: { cost: "Regulated meter", advantages: "Direct airport-to-hotel ride, including Shabbat", drawbacks: "High and variable long-distance meter fare" }, heading: "Official airport taxi to Ein Bokek or Neve Zohar", paragraphs: [
        ...commonTaxi,
        "The taxi fare depends on the regulated tariff, journey time, distance and any permitted additional charges. See my official airport taxi guide for pickup instructions and the taxi fares in Israel guide for how metered fares are calculated.",
        "Give the driver your complete hotel name: Ein Bokek, Hamei Zohar, Neve Zohar and Ein Gedi are distinct destinations. Check luggage space, payment, any planned stop and hotel access before leaving the airport. There is no Uber passenger-car service in Israel; my Uber alternatives guide explains available apps."
      ], inlineLinks: [
        { text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" },
        { text: "taxi fares in Israel guide", to: "/travel-blog/taxi-fares-in-israel/" },
        { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" },
      ], checklist: ["Order through the official airport process, keeping the ride code and receipt.", "Confirm your hotel's drop-off point and make sure the taxi has enough space for your luggage.", "Allow for the cost of a long-distance metered taxi ride."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 1h 45m–2h 30m+ after pickup", cost: "Published weekday vehicle starting rate; written quote", bestFor: "Families, several bags, late arrival", doorToDoor: "To agreed hotel entrance", availability: "Only after confirmation", comparison: { advantages: "Confirmed vehicle and agreed meeting point", drawbacks: "Must be booked and confirmed; costlier than public transport" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer,
        "A private transfer can be convenient for families, late arrivals and travelers with extra luggage because the vehicle and price are arranged in advance. Send me your hotel name, flight details, passenger count and luggage details. See my private transfer to Ein Bokek page for starting prices and a personal quote.",
        "If you'd like to visit Masada or Ein Gedi on the way, I can provide a quote that includes the sightseeing stop and waiting time. The Masada visitor guide can help you plan how long to spend there."
      ], inlineLinks: [
        { text: "private transfer to Ein Bokek page", to: "/airport-transfers/ein-bokek/" },
        { text: "Masada visitor guide", to: "/attractions/masada/" },
      ], checklist: ["Provide your hotel name, flight arrival time, passenger count and luggage details.", "Ask about child seats, waiting, flight delays, night/weekend charges and cancellation.", "Confirm any sightseeing stop or return transfer separately in writing."] },
      { id: "rental", name: "Rental car", time: "About 1h 45m–2h 30m+ driving plus collection", cost: "Rental, insurance, fuel and parking", bestFor: "Independent Masada/Dead Sea touring", doorToDoor: "To accessible parking area", availability: "Check desk hours and road access", comparison: { cost: "Rental + extras", advantages: "Freedom for Masada and other Dead Sea stops", drawbacks: "Collection time, parking and flood-related road closures" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental,
        "Consider renting a car if you also plan to visit Masada, Ein Gedi or other destinations. Compare rental prices, insurance and parking costs on DiscoverCars' Israel rental search.",
        "Check current police, weather and road notices before the drive, particularly after rain in the Judean Desert. Flash floods can temporarily close Route 90; never drive into water covering the road. Check pickup hours, parking and insurance terms, especially if you are landing on Shabbat or a Jewish holiday."
      ], inlineLinks: [
        { text: "DiscoverCars' Israel rental search", to: "/car-rental/" },
      ], checklist: ["Check route and flood-related closures before starting the drive.", "Confirm hotel parking, rental coverage and pickup hours."] },
    ],
    stations: [
      { name: "Airport train → Jerusalem–Yitzhak Navon", time: "About 26–30 min by train", usefulFor: "Starts below Terminal 3; adult single ticket ₪21, plus the free Jerusalem-line voucher." },
      { name: "Navon → Jerusalem Central Bus Station", time: "Allow extra transfer time", usefulFor: "Exit the deep rail station, walk to the bus station and find intercity platforms." },
      { name: "Egged bus 486 → Ein Bokek", time: "About 1h 45m–2h 15m", usefulFor: "Check the last southbound departure and the stop nearest your hotel." },
      { name: "Egged bus 444 → Ein Bokek", time: "Check departure times", usefulFor: "Reserved-seat Jerusalem–Eilat bus; book in advance and verify the hotel stop." },
    ],
    arrivalAreas: [
      { area: "Ein Bokek hotel strip", station: "Bus 486 or 444 from Jerusalem", onward: "Get off at the stop closest to your hotel." },
      { area: "Hamei Zohar / Neve Zohar", station: "Bus to your hotel area", onward: "Check the hotel name and stop before boarding in Jerusalem." },
      { area: "Ein Gedi / Masada", station: "Bus to Ein Gedi or Masada", onward: "Choose the bus stop closest to Masada or Ein Gedi." },
    ],
    connections: [
      "Ein Bokek has multiple hotel-area bus stops. Enter your hotel's name in the journey planner to find the nearest bus stop and walking route. Check the bus direction before boarding.",
      "Neve Zohar and Hamei Zohar hotels may have different stops from central Ein Bokek. Masada and Ein Gedi lie farther north along the Dead Sea shore and have their own bus stops.",
      "For afternoon or evening arrivals, check that you can still catch the final bus from Jerusalem. Also make sure you can reach your hotel safely from the bus stop, especially with luggage.",
    ],
    weekend: [
      "Most regular rail and intercity bus services stop for the main Shabbat period and many Jewish holidays. Buses 486 and 444 generally do not operate during Shabbat. Check the last departure before Shabbat and the first service afterwards. My airport Shabbat transport guide explains the available weekend transport options from Ben Gurion Airport.",
      "When public transport isn't running, consider an official airport taxi or a pre-booked private transfer, subject to availability. The taxis in Israel guide explains the difference between metered rides and advance private transport.",
      "For a self-drive option, check that the car-rental counter is open for your arrival and that desert road access is safe on that date.",
    ],
    advice: [
      "Plan your train journey around the last bus from Jerusalem to your hotel.",
      "Carry drinking water for any outdoor walk between a bus stop and your hotel.",
      "Check Route 90 closures and desert flood warnings before driving.",
      "If you miss the last bus, you may need to pay for a long-distance taxi from Jerusalem to the Dead Sea.",
    ],
    faqs: [
      { q: "Do I need to reserve a seat on bus 444 or 421?", a: "Egged lists routes 444 and 421 as reserved-seat services. Check availability and the current reservation instructions before travel, and allow time to reach the correct departure platform." },
      { q: "How do I pay for the airport train and Dead Sea bus?", a: "Train tickets are available at Ben Gurion Airport railway station, with accepted Rav-Kav or payment-app options where supported. A standard adult bus fare from Jerusalem to Ein Bokek is about ₪19; use an accepted payment method or Egged's advance seat-booking process where required." },
      { q: "Is bus 421 via Tel Aviv a good alternative?", a: "Bus 421 from Tel Aviv–Savidor runs infrequently and requires a seat reservation. Allow enough time to reach Tel Aviv Savidor station before departure. For most airport arrivals, travelling via Jerusalem is easier." },
      { q: "What if road 90 is closed because of flooding?", a: "Check police and official road notices, and follow closures. Flash floods can make the road dangerous; do not drive through a flooded roadway or assume a hired vehicle can legally bypass a closure." },
      { q: "Is there a direct train from Ben Gurion Airport to Ein Bokek?", a: "No. There is no railway station in Ein Bokek. A common lower-cost route is the train to Jerusalem–Yitzhak Navon followed by a scheduled Dead Sea bus, when both services operate." },
      { q: "Is there a direct bus from Ben Gurion Airport to the Dead Sea?", a: "There is no regular direct bus from the airport to Ein Bokek. The usual public transport route is by train to Jerusalem, followed by an Egged bus to the Dead Sea. Check the timetable for your travel date." },
      { q: "Which Jerusalem buses reach Ein Bokek hotels?", a: "Tamar Regional Council lists routes 486 and 444 for the Dead Sea from Jerusalem. Confirm the current departure, direction, hotel-stop list and any seat-booking requirement with the operator or journey planner." },
      { q: "How long does it take from TLV Airport to Ein Bokek?", a: "Plan roughly 1 hour 45 minutes to 2 hours 30 minutes or more of driving after pickup, depending on traffic and road conditions. Travelling by train and bus can take 3–4 hours or longer, including waiting times." },
      { q: "Can I reach Ein Bokek after an evening flight?", a: "Yes, if you reach Jerusalem Central Bus Station before the last bus to Ein Bokek. Check the last bus before choosing your airport train." },
      { q: "Do buses or trains run to Ein Bokek on Shabbat?", a: "Regular train and intercity-bus connections generally stop during the main Shabbat period. Check the precise holiday/weekend schedules, and compare a confirmed taxi, pre-booked transfer or car rental if there is no usable service." },
      { q: "Do I need a voucher for the train to Jerusalem?", a: "Yes. Each passenger needs a free personal voucher for the selected train to Jerusalem–Yitzhak Navon, in addition to a valid train ticket. Follow the Israel Railways voucher instructions before boarding." },
      { q: "Is the Ein Bokek bus stop outside every hotel?", a: "Several bus stops serve the Ein Bokek hotel area, and some hotels require a further walk. Search using the full hotel name and check the remaining walk." },
      { q: "Is Ein Gedi the same as Ein Bokek?", a: "No. Ein Gedi, Masada, Neve Zohar and the Ein Bokek hotel area are distinct places and stops. Confirm the precise destination in your route plan or transfer request." },
      { q: "Should I choose an airport taxi or a private transfer?", a: "Order an official airport taxi on arrival and pay the regulated meter fare. For a private transfer, agree on the vehicle, meeting point and total price in writing before you travel." },
    ],
    featuredRelated: [
      { label: "Where to stay at the Dead Sea", to: "/travel-blog/best-dead-sea-hotels/", note: "Choose the right resort area." },
      { label: "The Dead Sea visitor guide", to: "/attractions/dead-sea/", note: "Learn about beaches and resort access." },
      { label: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Plan sights along the shore." },
      { label: "Masada visitor guide", to: "/attractions/masada/", note: "Plan a visit to the mountain fortress." },
      { label: "Ein Gedi visitor guide", to: "/attractions/ein-gedi/", note: "Find the nature reserve and visitor access." },
      { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/", note: "Plan the bus and road journey." },
    ],
    related: [
      { label: "Jerusalem to the Dead Sea by bus, taxi or car", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { label: "Where to stay at the Dead Sea", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Masada visitor information", to: "/attractions/masada/" },
      { label: "Official airport taxis and pickup instructions", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Ben Gurion Airport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Getting around Israel: tickets and buses", to: "/travel-blog/getting-around-israel/" },
    ],
    planNext: [
      { label: "The Dead Sea visitor guide", to: "/attractions/dead-sea/", note: "Learn about swimming, the resort areas and practical conditions." },
      { label: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Choose viewpoints, reserves and scenic stops near the shore." },
      { label: "Ein Gedi visitor guide", to: "/attractions/ein-gedi/", note: "Discover Ein Gedi's hiking trails, waterfalls and visitor information." },
      { label: "Israel itinerary: five days", to: "/travel-blog/israel-itinerary-5-days/", note: "Combine a Dead Sea stay with nearby destinations." },
    ]
  }
};

export const airportJourneyGuides = byId;
export const airportJourneyIds: AirportJourneyId[] = ["jerusalem", "tel-aviv", "haifa", "ein-bokek"];
