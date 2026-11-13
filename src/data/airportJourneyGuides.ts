import type { LinkProps } from "@tanstack/react-router";
import { airportTransferPhotos } from "@/data/airportTransfers";
import type { StayGuidePhoto } from "@/data/content";
import telAvivOldJaffa from "@/assets/tel-aviv/jaffa.webp";
import jerusalemNavonPlatform from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import jerusalemPanorama from "@/assets/home/hero-jerusalem.webp";
import benGurionRailPlatform from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import airportTerminalHall from "@/assets/home/ben-gurion-t3.webp";
import haifaColony from "@/assets/haifa/colony.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";

/**
 * Informational journey-choice pages. They deliberately do NOT use the route
 * titles, descriptions or private-service conversion copy in airportRoutes.ts.
 * The ILS ranges are historical editorial estimates (August 2026), NOT quotes.
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
  connections: string[]; weekend: string[]; advice: string[]; faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"] }[];
  planNext?: { label: string; to: LinkProps["to"]; note?: string }[];
  photos?: { station: Pick<StayGuidePhoto, "src" | "alt">; onward: Pick<StayGuidePhoto, "src" | "alt"> };
  stationLinks?: { text: string; to: LinkProps["to"] }[];
  weekendLinks?: { text: string; to: LinkProps["to"] }[];
  sources?: { title: string; url: string }[];
  updatedAt?: string;
  historicalPrices?: boolean;
  exampleJourney: { title: string; steps: { label: string; detail: string }[]; takeaway: string };
};

const commonTaxi = [
  "For an official on-demand airport taxi, use Gett or a self-service kiosk to obtain a ride code and join the authorized queue: Terminal 3 ground floor, Exit 03; Terminal 1 main arrivals exit. A Gett ride scheduled in advance has different instructions (Terminal 3 Level 2, Exit 23).",
  "Official airport taxis use a regulated meter, not the published private-transfer starting rate. Actual cost depends on the route, traffic, tariffs and allowed extras. Keep your ride code and receipt, and confirm luggage space before boarding.",
];
const commonTransfer = [
  "A pre-booked private transfer is a different service from the airport's metered taxi queue. Arrange the vehicle for your whole party, agree the exact hotel address and ask for a written total, waiting allowance, meeting place and cancellation terms.",
  "A request for my private-transfer service is not itself a reservation. Send your details and wait for my confirmation of availability and the final price; larger groups, child seats, heavy luggage, holidays and night arrivals may need a different vehicle or price.",
];
const commonRental = [
  "A rental car helps if you will continue to several out-of-town destinations. Compare the full rental price, insurance excess, credit-card deposit, fuel, parking, toll handling and pick-up desk hours.",
  "For a city-only break, parking and urban traffic can erase the benefit of collecting a car after a flight. Check whether your hotel has a place to park and whether the rental company's service is available when you land.",
];

const byId: Record<AirportJourneyId, AirportJourneyGuide> = {
  jerusalem: {
    id: "jerusalem", city: "Jerusalem",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/",
    title: "Ben Gurion Airport to Jerusalem: Train, Taxi, Bus & Transfers",
    description: "Compare train, metered taxi, private transfer, limited bus 485 and rental car from Ben Gurion Airport to Jerusalem, with current rail voucher rules and hotel connections.",
    distance: "Approximately 45–55 km by road, depending on your address",
    intro: "From the airport train to a door-to-door taxi, there are several ways to reach Jerusalem. In this guide, I compare the available options, their costs and travel times, and what to consider when travelling to your hotel or the Old City.",
    exampleJourney: {
      title: "Example: landing at TLV and staying near Jaffa Gate",
      steps: [
        { label: "Reach the airport railway", detail: "After collecting your bags, follow the signs to the Terminal 3 railway station and check the actual departure and ticket requirements." },
        { label: "Travel to Jerusalem–Yitzhak Navon", detail: "Allow roughly 26–30 minutes on the train, then extra time to reach street level." },
        { label: "Continue toward Jaffa Gate", detail: "Use the light rail and a suitable final walk, or a local taxi if carrying heavy bags. Ask the hotel which Old City entrance and drop-off are practical." },
      ],
      takeaway: "The train can be efficient for a central hotel; a private vehicle is more convenient when several large bags or an Old City luggage walk make the last connection difficult.",
    },
    answer: "The direct train to Jerusalem–Yitzhak Navon is usually the fastest low-cost option when it runs (26–30 minutes, around ₪21). For a direct ride to your address, take an official metered taxi or arrange a private transfer. Bus 485 has very limited departures, so check its timetable before relying on it.",
    trainIntro: "Jerusalem–Yitzhak Navon is a deep underground station beside the central bus station and Jaffa Road light rail. Allow time to reach street level, then choose a suitable light-rail stop, taxi or walk for your exact hotel address. The train does not stop at Mamilla or the Old City. For the steps before boarding at the airport, see my Ben Gurion Airport arrival guide.",
    photo: { src: jerusalemPanorama, alt: "Panoramic view of Jerusalem’s Old City and the Dome of the Rock from the Mount of Olives", label: "Jerusalem skyline", credit: "Berthold Werner · Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG" },
    updatedAt: "2026-11-11",
    historicalPrices: false,
    photos: {
      station: { src: jerusalemNavonPlatform, alt: "Israel Railways train beside the deep underground platform at Jerusalem Yitzhak Navon station" },
      onward: { src: benGurionRailPlatform, alt: "Ben Gurion Airport railway station platform used to board trains toward Jerusalem" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }],
    weekendLinks: [{ text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }, { text: "Sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" }, { text: "Israel\'s calendar of events", to: "/travel-blog/israel-holidays/" }],
    sources: [
      { title: "Israel Railways — official route and current train fare", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — free personal voucher for Jerusalem line (August 2026 notice)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Israel Airports Authority — route 485, airport rail and taxi directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Gett — authorized taxi queue and ride-code process", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner — bus 485 service dates", url: "https://bus.gov.il/" },
      { title: "Israel Railways — timetable changes from November 14, 2026", url: "https://rail.co.il/?page=new-schedule-141126" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-jerusalem/",
    privateLabel: "Request a private Jerusalem transfer",
    options: [
      { id: "rail", name: "Direct train", time: "26–30 min", cost: "About ₪21/adult, one way; check current fare", bestFor: "Solo/couples, light luggage", doorToDoor: "No", availability: "Not during the main Shabbat break", comparison: { cost: "₪21", advantages: "Fast and affordable", drawbacks: "Ends at Yitzhak Navon station; no Shabbat service" }, heading: "Taking the direct train to Jerusalem–Yitzhak Navon", paragraphs: [
        "The airport railway station is below Terminal 3. Follow the signs after baggage collection, check your actual departure and allow around 26–30 minutes aboard a direct train to Jerusalem–Yitzhak Navon. This is the rail leg, not the journey to your hotel.",
        "For ticket validation and onward local transport, read my getting around Israel guide. The Jerusalem-line voucher instructions and official railway links follow here, before the final-station and hotel-connection advice."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Choose a hotel-to-station connection before landing.", "Check trains for Friday, Saturday evening and holidays.", "Allow additional time for the deep underground station."] },
      { id: "taxi", name: "Official airport taxi", time: "45–60+ min", cost: "About ₪270–410+ on the regulated meter (illustrative)", bestFor: "Immediate ride to the address", doorToDoor: "Yes", availability: "Usually around the clock", comparison: { cost: "₪270–410+", advantages: "Direct ride, no advance booking needed", drawbacks: "Metered fare varies with traffic" }, heading: "Using the authorized metered taxi to Jerusalem", paragraphs: [
        ...commonTaxi, "For a Jerusalem hotel, confirm the right door or nearest vehicle-accessible Old City gate. Some historic streets cannot be reached by car, and a final walk with luggage may remain. See the official airport taxi guide for ordering and pickup, and the taxi fares in Israel guide for the regulated tariff periods."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares in Israel guide", to: "/travel-blog/taxi-fares-in-israel/" }], checklist: ["Order with Gett or use the airport kiosk, then follow the queue instructions.", "Confirm payment and the regulated meter.", "For Old City lodging, save the recommended drop-off point."] },
      { id: "private", name: "Private transfer arranged ahead", time: "45–60+ min", cost: "Written quote; published weekday starting rate on booking page", bestFor: "Family, groups and special pickup needs", doorToDoor: "To agreed vehicle-accessible point", availability: "By confirmation", comparison: { advantages: "Pre-arranged pickup and vehicle choice", drawbacks: "Book ahead; extras may apply" }, heading: "When is a pre-booked private pickup worthwhile?", paragraphs: [
        ...commonTransfer, "It can be especially helpful when you are arriving with children, multiple suitcases or a late-night hotel check-in. Confirm an Old City meeting/drop-off point rather than assuming the vehicle can enter every historic lane. The separate private transfer to Jerusalem page covers the quoted vehicle, included service and booking request."
      ], inlineLinks: [{ text: "private transfer to Jerusalem page", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" }], checklist: ["Request the vehicle size and child seats that you actually need.", "Share the hotel entrance and flight number.", "Check waiting time and flight-delay terms in writing."] },
      { id: "bus", name: "Bus 485 (very limited)", time: "55–60+ min", cost: "Current bus fare: check planner", bestFor: "Only if its timetable fits your flight", doorToDoor: "No", availability: "Sparse departures; confirm date and operator", comparison: { cost: "Check fare", advantages: "Public-transport alternative", drawbacks: "Very limited departures" }, heading: "Is there a direct bus from the airport to Jerusalem?", paragraphs: [
        "The Israel Airports Authority still lists bus 485 to Jerusalem at Terminal 3, Level 2, Exit 21. Published timetable data indicates only sparse departures, not a dependable frequent service. Confirm the actual day, operator and departure in the official national public-transport planner rather than relying on the airport stop listing alone.",
        "If line 485 has a usable departure, verify its Jerusalem destination stop and onward local trip. A bus to a city stop is not a door-to-door hotel transfer. For boarding payment and ticket validation, read the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Confirm line 485's actual operation with the national journey planner.", "Check the terminal and boarding area.", "Have rail or a confirmed ride as your fallback."] },
      { id: "rental", name: "Rental car", time: "45–60+ min", cost: "Rental + insurance, fuel and parking", bestFor: "Onward multi-city road trip", doorToDoor: "Yes, where driving is allowed", availability: "Depends on collection hours", comparison: { cost: "Varies", advantages: "Useful for onward travel", drawbacks: "Parking and traffic in Jerusalem" }, heading: "Does renting at TLV make sense for Jerusalem?", paragraphs: [
        ...commonRental, "Jerusalem's Old City, pedestrian areas and central parking restrictions can make a car inconvenient during a city-focused stay. Compare collection and vehicle options on the car rental page."
      ], inlineLinks: [{ text: "car rental page", to: "/car-rental/" }], checklist: ["Check permitted parking at your accommodation.", "Compare city collection after a few days instead of airport collection.", "Verify rental operating hours for your arrival day."] },
    ],
    stations: [{ name: "Jerusalem–Yitzhak Navon", time: "Around 26–30 min from TLV", usefulFor: "Central bus station and Jaffa Road light rail; connect to your actual hotel." }],
    connections: [
      "For Downtown/Mamilla, choose the best light-rail stop or a taxi from Navon, and check the walking distance with luggage. Not every property is directly on the light rail.",
      "For the Old City, know which gate is closest to your accommodation. Steps, steep stone lanes and vehicle restrictions can make a small map distance awkward.",
      "For East Jerusalem or a residential address, enter the full street address; a station-to-city-centre estimate does not cover the onward journey."
    ],
    weekend: [
      "Israel Railways and most regular buses normally stop during the main Shabbat period and many Jewish holidays. The exact last/first departure depends on the date, so check the journey planner rather than assuming Saturday night trains start at a fixed time.",
      "For an arrival without a usable rail connection, compare the airport's authorized metered taxi with a confirmed private transfer. A rental car is another possibility only if collection is operating.",
      "The regular Nesher airport-to-Jerusalem shared-taxi route described in older guides no longer runs. Do not rely on old pickup details. My Sherut in Israel guide explains the distinction, and the airport Shabbat transport guide covers current weekend options.",
      "For holiday dates and their potential impact on public transport, see Israel\'s calendar of events, then verify trains and buses for the exact day with their operators."
    ],
    advice: [
      "Compare the total from landing to hotel: immigration and baggage, getting to the station, the train and the final leg.",
      "Save the hotel address in English and Hebrew if possible, plus the vehicle entrance or nearest Old City gate.",
      "For four travelers with large cases, request the precise luggage capacity rather than assuming a four-seat sedan fits everything.",
      "Check the train section for ticket and voucher instructions before committing to a rail connection.",
      "Expect limited bus 485 departures and check your actual day; keep a rail or confirmed taxi alternative.",
      "Consider a private pickup when a fixed quote or an agreed larger vehicle matters more than the lowest individual fare.",
    ],
    faqs: [
      { q: "What is the cheapest way from Ben Gurion Airport to Jerusalem?", a: "When running, the direct train is usually the lowest-cost practical option, approximately ₪21 per adult one way before any onward city transport. Check the live fare and obtain the additional free personal voucher required on the Jerusalem line." },
      { q: "Do I need a free voucher for the Jerusalem train?", a: "The railway\'s current notice requires a free personal voucher as well as a valid train ticket. The official instructions are linked directly in the train section above; recheck them before travelling." },
      { q: "Can the train take me directly to the Old City or Mamilla?", a: "No. The train stops at Jerusalem–Yitzhak Navon near the central bus station. Continue by light rail, suitable taxi or a walk; check the gate and hotel entrance if carrying luggage." },
      { q: "How much is a taxi from the airport to Jerusalem?", a: "A general metered planning range is about ₪270–410 or more for a standard taxi, depending on pickup time, traffic, address and legal extras. The final regulated meter fare is not a fixed-price promise." },
      { q: "Does bus 485 still run directly to Jerusalem?", a: "The airport still lists it from Terminal 3, Level 2, Exit 21, but scheduled departures are very limited. Confirm an actual departure and final stop on your date before relying on it." },
      { q: "Do trains run to Jerusalem on Shabbat or late at night?", a: "Trains usually stop during the main Shabbat break, while some late-night or Saturday-evening departures may be scheduled. Always check your exact date, including timetable revisions and voucher rules." },
      { q: "Should I book a taxi or a private transfer for an Old City hotel?", a: "An authorized taxi runs on the regulated meter. A private ride requires a confirmed quote and agreed vehicle. For either one, ask your accommodation for its nearest vehicle-accessible entrance or gate." },
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
      { label: "Explore Jerusalem's Old City", to: "/travel-blog/old-city-jerusalem/", note: "Check the gates, walking routes and practical access." },
      { label: "Discover day trips from Jerusalem", to: "/travel-blog/day-trips-from-jerusalem/", note: "See options beyond the city once you have settled in." },
      { label: "Choose an Israel eSIM", to: "/travel-blog/best-esim-for-israel/", note: "Keep maps, rail timetables and arrival messages at hand." },
    ],
  },
  "tel-aviv": {
    id: "tel-aviv", city: "Tel Aviv & Jaffa",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/",
    title: "Ben Gurion Airport to Tel Aviv: Train, Taxi, Bus & Transfers",
    description: "Compare trains, bus 445, official airport taxis, private transfers and free weekend Line 711 from Ben Gurion Airport to Tel Aviv, with station choice, hotel connections and updated travel tips.",
    distance: "Approximately 20–25 km to central Tel Aviv, depending on the address",
    intro: "From the airport train to a direct taxi or bus, there are several ways to reach Tel Aviv. In this guide, I compare the options, their costs and journey times, and the final connection to your beach hotel, city address or Old Jaffa.",
    exampleJourney: {
      title: "Example: a hotel on the central beachfront",
      steps: [
        { label: "Choose the rail service", detail: "From the Terminal 3 railway, compare the actual stops at HaHagana, HaShalom and Savidor Center rather than assuming the first Tel Aviv stop is best." },
        { label: "Plan the inland-to-coast leg", detail: "None of the mainline stations is on the beach promenade. Check the bus, local taxi or walking route to the hotel's exact HaYarkon Street entrance." },
        { label: "Recheck a Friday or Saturday arrival", detail: "Regular rail service stops for much of Shabbat. The limited weekend Line 711 runs via Terminal 1, with its own stops and timetable; it is not a direct replacement for the rail service." },
      ],
      takeaway: "For a light-bag daytime arrival, train plus local transport may work well. For Old Jaffa, family luggage or late arrivals, compare the whole door-to-door journey.",
    },
    answer: "When it runs, the train from Terminal 3 is usually the quickest low-cost choice. Choose the Tel Aviv railway station—HaHagana, HaShalom, Savidor Center or University—that offers the best onward connection to your address. Kavim bus 445 leaves Terminal 3, Level 2, Exit 21 and can suit hotels near its stops. An official metered taxi or confirmed private transfer takes you directly to an accessible address. On Shabbat, regular trains stop and free Line 711 runs only at limited times via Terminal 1.",
    trainIntro: "The airport railway station is below Terminal 3; follow the train signs after customs. If you arrive at Terminal 1, take the free internal shuttle to Terminal 3 first. You can purchase a single train ticket at the station, or use a valid Rav-Kav or supported payment app; check current ticketing rules and fares before travel. Tel Aviv has four mainline stations: HaHagana, HaShalom, Savidor Center and University. None is directly on the beachfront, so plan the last bus, taxi, walk or light-rail connection to your hotel. The Ben Gurion Airport arrival guide explains the airport sequence; the getting around Tel Aviv guide covers the city connections.",
    photo: airportTransferPhotos["tel-aviv"]!,
    updatedAt: "2026-11-11",
    historicalPrices: false,
    photos: {
      station: { src: benGurionRailPlatform, alt: "Ben Gurion Airport railway platform below Terminal 3, where trains depart toward Tel Aviv" },
      onward: { src: telAvivOldJaffa, alt: "Old Jaffa waterfront and streets, where the final hotel pickup point may differ from a train station" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }, { text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }],
    weekendLinks: [{ text: "dedicated airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }, { text: "sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" }],
    sources: [
      { title: "Israel Railways — check trains and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — revised timetable from November 14, 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Israel Airports Authority — Line 445, taxis and internal shuttle", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Tel Aviv visitor information — four railway stations and airport transport", url: "https://visit.tel-aviv.gov.il/move/airport" },
      { title: "Na’im Busofash — weekend Line 711 and Terminal 1 stop", url: "https://busofash.co.il/?lines=711" },
      { title: "Gett — official airport taxi ordering and pickup", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner — bus 445 timetable", url: "https://bus.gov.il/" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-tel-aviv/",
    privateLabel: "Request a private Tel Aviv or Jaffa transfer",
    options: [
      { id: "rail", name: "Train to Tel Aviv", time: "About 11–30 min to a station", cost: "Current rail fare: check planner", bestFor: "Quick, lower-cost weekday arrival", doorToDoor: "No", availability: "Not during the main Shabbat break", comparison: { cost: "Check current fare", advantages: "Quick, low-cost and avoids traffic", drawbacks: "Train stops inland; hotel connection often required" }, heading: "Train from Ben Gurion Airport to Tel Aviv", paragraphs: [
        "Check whether HaHagana, HaShalom, Savidor Center or University best fits the actual street of your destination. HaShalom serves Azrieli and Sarona, Savidor is useful for onward buses, HaHagana serves parts of southern Tel Aviv, and University serves Ramat Aviv. The shortest train leg to HaHagana can take around 11–15 minutes; other stations take longer, depending on the service.",
        "For the beach, Old Jaffa, Neve Tzedek or most western hotels, allow time and possibly another fare for a bus, taxi, light rail or walk. Choose the station based on your exact accommodation address, not just the city name. The where to stay in Tel Aviv guide can help you identify the neighborhood, while the getting around Tel Aviv guide explains local connections."
      ], inlineLinks: [{ text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" }, { text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }], checklist: ["Use the full hotel address when choosing the station.", "Check the last train and late-night stopping pattern.", "Include the onward fare and bags in the total comparison."] },
      { id: "bus", name: "Bus 445", time: "About 40–70+ min, depending on stop", cost: "Current bus fare: check planner", bestFor: "Addresses near its city stops", doorToDoor: "No", availability: "Timetable dependent; Shabbat restrictions", comparison: { cost: "Check current fare", advantages: "May reach central or beachfront stops", drawbacks: "Slower; timetable and stop dependent" }, heading: "Bus 445: another route into central Tel Aviv", paragraphs: [
        "The Israel Airports Authority lists Kavim bus 445 from Terminal 3, Level 2, Exit 21. The route may bring you closer to parts of central Tel Aviv or the beachfront than a rail station. Check the dated timetable, direction and actual stops instead of relying on old street lists or an assumed hourly frequency.",
        "Bus 445 can take about 40–70 minutes or more depending on the stop and traffic. It is not door to door, and you need room for bags. Regular public buses do not normally take cash from the driver: have a valid Rav-Kav or supported public transport payment app ready. For ticketing and validation basics, see my getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Verify line 445's dated timetable with Kavim.", "Check Terminal 3 Level 2, Exit 21 and direction.", "Map the bus stop to the actual hotel entrance."] },
      { id: "taxi", name: "Official airport taxi", time: "About 20–40+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "Direct on-demand hotel ride", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", comparison: { cost: "Metered; varies", advantages: "Direct ride, including on Shabbat", drawbacks: "Traffic, fares and queue time vary" }, heading: "Official airport taxi to Tel Aviv or Jaffa", paragraphs: [
        ...commonTaxi, "For a beachfront hotel or an Old Jaffa address, provide the hotel name and nearest permitted vehicle entrance. Traffic can increase journey time and the meter fare. Do not accept unsolicited driver offers in arrivals. Read the official airport taxi guide for ride-code instructions, the taxi fares guide for regulated meter charges, and my Uber alternatives guide for taxi app availability."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }, { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" }], checklist: ["Follow the official Gett kiosk/queue system.", "Provide the exact Jaffa or Tel Aviv address.", "Ask about a large vehicle if the party carries multiple cases."] },
      { id: "private", name: "Advance private transfer", time: "About 20–40+ min after pickup", cost: "Written quote; weekday starting rate on booking page", bestFor: "Families, extra luggage, planned meeting", doorToDoor: "To confirmed address", availability: "By confirmation", comparison: { advantages: "Agreed vehicle, meeting point and price", drawbacks: "Advance confirmation; costs more than rail" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer, "Private pickup is particularly useful for a family, multiple checked bags, a child seat, a flight arriving after regular public transport or accommodation in a narrow Jaffa street where the drop-off must be agreed. The private transfer to Tel Aviv page explains the separate service and lists its published starting rate. Share your details using the form below and wait for a written quote and confirmation; an inquiry is not a booking."
      ], inlineLinks: [{ text: "private transfer to Tel Aviv page", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }], checklist: ["Send flight number, passengers, bags and children's ages.", "Confirm the vehicle and any extra charges.", "Agree Jaffa's exact vehicle-accessible drop-off."] },
      { id: "weekend", name: "Weekend line 711", time: "Variable with stop and departure", cost: "Free where operating", bestFor: "Flexible weekend traveler with light luggage", doorToDoor: "No", availability: "Limited Friday/Saturday timetable, Terminal 1", comparison: { cost: "Free", advantages: "Free limited Shabbat option", drawbacks: "Terminal 1 only; sparse trips, not door to door" }, heading: "Free weekend bus 711 on Shabbat", paragraphs: [
        "Tel Aviv's municipality lists the free Naim Busofash line 711 via Ben Gurion Airport Terminal 1 between Shoham and central Tel Aviv. It is not a frequent Terminal 3 service tied to flight arrivals.",
        "If arriving at Terminal 3, take the free internal shuttle from Level G near Gate 01 to Terminal 1. Bus 711 serves airport stop 34609 on its limited timetable; check the Tel Aviv-bound direction and final walk. The dedicated airport Shabbat guide explains the interchange and Saturday-night train restart."
      ], inlineLinks: [{ text: "dedicated airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }], checklist: ["Check the city weekend route planner, not a weekday bus schedule.", "Allow time between Terminal 3 and Terminal 1.", "Confirm your last city connection or walk."] },
      { id: "rental", name: "Rental car", time: "About 20–40+ min plus collection", cost: "Rental + parking, insurance and fuel", bestFor: "Journey beyond Tel Aviv", doorToDoor: "Yes, where permitted", availability: "Desk-hours dependent", comparison: { cost: "Rental + extras", advantages: "Flexible for an onward road trip", drawbacks: "Collection time, traffic and city parking" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental, "Central Tel Aviv and Jaffa have limited and potentially expensive parking. If you intend to spend the first few days walking around the city, consider renting only when you leave. Compare vehicle options on the car rental page."
      ], inlineLinks: [{ text: "car rental page", to: "/car-rental/" }], checklist: ["Check your hotel's parking arrangements.", "Compare city and airport pickup costs.", "Confirm any toll or one-way charges."] },
    ],
    stations: [
      { name: "Tel Aviv–HaHagana", time: "≈ 11–15 min", usefulFor: "Southern city connections and the Levinsky/Florentin area." },
      { name: "Tel Aviv–HaShalom", time: "≈ 15–20 min", usefulFor: "Azrieli, Sarona and the business centre." },
      { name: "Tel Aviv–Savidor Center", time: "≈ 20–25 min", usefulFor: "Arlozorov, northern/central onward buses." },
      { name: "Tel Aviv–University", time: "Up to ≈ 30 min", usefulFor: "Ramat Aviv, university and Expo Tel Aviv." },
    ],
    connections: [
      "Beachfront accommodation: the station is usually inland; compare a local bus or taxi for the last leg, especially with luggage.",
      "Old Jaffa: historic lanes, pedestrian areas and steps can make a precise drop-off important. Check the nearest road-accessible entrance.",
      "Dizengoff/Rothschild: a bus may place you closer than a train, but confirm the actual route rather than trusting a district name.",
    ],
    weekend: [
      "Standard trains and most regular buses do not run during the main Shabbat break. Tel Aviv’s free weekend bus 711 serves Terminal 1 on a limited timetable, not every arriving flight. Check whether its actual stop and departure suit your destination.",
      "An authorized taxi or confirmed private transfer may be a more practical choice when the 711 does not match your flight, when arriving late or when carrying large bags.",
      "Check the exact Saturday-evening train restart and Jewish-holiday changes in the dedicated airport Shabbat guide. There is no regular walk-up airport sherut to Tel Aviv; the sherut in Israel guide explains why old shared-taxi descriptions should not guide your arrival."
    ],
    advice: [
      "Make your station choice based on the hotel address and not only the train's station name.",
      "Compare the total for the whole party: four separate rail/bus tickets plus last-mile taxi may narrow the gap with a vehicle quote.",
      "Check how your group will reach a beachfront or Jaffa entrance with suitcases after dark.",
      "On Shabbat, free line 711 serves Terminal 1; verify the actual stop, direction and departure.",
      "For a first-time visitor, keep the airport arrival checklist and a fallback for flight or baggage delays.",
    ],
    faqs: [
      { q: "Is there a sherut from Ben Gurion Airport to Tel Aviv?", a: "No regular walk-up shared airport sherut serves Tel Aviv. The free terminal shuttle, weekend Line 711 and separately booked transfers are different services." },
      { q: "Can I pay cash to the driver of bus 445?", a: "Regular public buses generally require an appropriately loaded Rav-Kav or supported payment app, not cash given to the driver. Check current ticketing rules before travel." },
      { q: "Which train station is closest to Tel Aviv's beach?", a: "None is directly on the promenade. Compare the exact beachfront hotel with onward connections from HaHagana, HaShalom or Savidor Central." },
      { q: "How can I reach Tel Aviv on Shabbat?", a: "Check the limited free line 711 at Terminal 1 for the actual departure and city stop. If it does not work, compare an authorized metered taxi or a confirmed private transfer." },
      { q: "What is bus 445 and where does it leave?", a: "Kavim's airport-to-Tel Aviv bus is listed by the Airports Authority from Terminal 3 Level 2 Exit 21. Check the live timetable, route and direction before relying on it." },
      { q: "What if my hotel is in Jaffa?", a: "Treat Jaffa as a specific address rather than a central Tel Aviv rail station. Work out the last leg or provide a drivable hotel/host meeting point for a taxi or transfer." },
      { q: "Will the airport train take me straight to the hotel?", a: "No. It serves four railway stations. Most hotels need a further walk or local connection." },
      { q: "How do I pay for a train or bus to Tel Aviv?", a: "Check the current fare and valid ticket or payment method before travel. Rav-Kav and supported ticketing apps are common; do not assume that an overseas credit card can be tapped on every bus or at any rail gate." },
      { q: "Can I get an Uber from Ben Gurion Airport to Tel Aviv?", a: "No. Uber passenger rides are not available in Israel as of November 2026. Use the authorized Gett airport taxi system or a separately confirmed private transfer." },
      { q: "Do trains run from the airport late at night?", a: "Service and stopping patterns vary by date and hour. Check the actual Israel Railways journey for your flight and hotel; a late-night train may not stop at every Tel Aviv station." },
      { q: "Can I walk from Tel Aviv railway station to the beach?", a: "The four mainline Tel Aviv stations are inland. Walking may be possible for some addresses, but for many beach hotels or Old Jaffa the last leg is better planned by bus or taxi." }
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
      { label: "Beachfront hotels in Tel Aviv", to: "/tel-aviv/beachfront-hotels/", note: "Find a hotel close to the promenade and check its access." },
      { label: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/", note: "Plan your first day near the coast." },
      { label: "Day trips from Tel Aviv", to: "/travel-blog/day-trips-from-tel-aviv/", note: "Explore destinations beyond the city once you have settled in." },
    ]
  },
  haifa: {
    id: "haifa", city: "Haifa",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/",
    title: "Ben Gurion Airport to Haifa: Train, Taxi, Bus & Transfers",
    description: "Compare the train, official airport taxis, private transfers and limited Egged bus 905 from Ben Gurion Airport to Haifa. Find the right railway station for your hotel, Mount Carmel or Haifa Port and check Shabbat options.",
    distance: "Approximately 100–110 km to central Haifa",
    intro: "From the direct airport train to an authorized taxi or pre-booked transfer, there are several ways to reach Haifa. This guide compares travel times, costs and practical connections to the German Colony, Mount Carmel hotels and Haifa Port, including the limited weekend bus.",
    exampleJourney: {
      title: "Example: deciding which Haifa station to use",
      steps: [
        { label: "Lower City or German Colony", detail: "Haifa Center HaShmona is often a practical starting point for downtown addresses. Match the remaining walk or taxi leg to the street and luggage." },
        { label: "Mount Carmel hotel", detail: "The rail corridor remains near the coast. Even if a station looks close on the map, the final route to Carmel Center is uphill and usually needs another ride." },
        { label: "Cruise connection", detail: "Haifa's passenger terminal is a different destination from a city hotel. Confirm the ship, terminal instructions, boarding deadline and how you will reach the pedestrian entrance." },
      ],
      takeaway: "Choose by hotel elevation and final access, not by the distance between a station pin and your hotel pin.",
    },
    answer: "When it operates, the train from Terminal 3 is usually the best low-cost way to reach Haifa. Choose the Haifa railway station—Hof HaCarmel, Bat Galim, Center HaShmona or HaMifratz Central—that offers the easiest onward connection to your hotel. The line runs along the coast, so Mount Carmel accommodation often requires an uphill bus or taxi. An authorized metered airport taxi or confirmed private transfer is more convenient door to door; Egged bus 905 operates only on a limited Saturday-night and early-Sunday timetable.",
    trainIntro: "The Ben Gurion Airport railway station is below Terminal 3. Follow the train signs after customs; passengers using Terminal 1 first need the free internal shuttle to Terminal 3. Direct trains commonly serve Haifa, with approximately 80–100 minutes to key stations depending on the service. Buy a single ticket at the station or use a valid Rav-Kav or supported payment app, and check the current fare and the stops of the actual train. The railway runs near the coast, so a Mount Carmel hotel may require an additional uphill bus or taxi. My Ben Gurion Airport arrival guide explains the terminal steps; the getting around Israel guide explains onward public transport.",
    photo: airportTransferPhotos["haifa"]!,
    updatedAt: "2026-11-12",
    historicalPrices: false,
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
      { title: "Israel Railways — current Haifa departures and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — timetable changes starting November 14, 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Egged bus 905 — current stop list and limited operation", url: "https://moovitapp.com/index/en/public_transit-line-905-Israel-1-1-81823102-0" },
      { title: "Israel Airports Authority — train, taxis and terminal directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett — official airport taxi booking", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport journey planner — actual 905 departures and ticketing", url: "https://bus.gov.il/" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-haifa/",
    privateLabel: "Request a private Haifa transfer",
    options: [
      { id: "rail", name: "Train to Haifa", time: "About 80–110 min to a station", cost: "Current train fare: check planner", bestFor: "Budget-minded intercity travel", doorToDoor: "No", availability: "Varies; not during the main Shabbat break", comparison: { cost: "Check live rail fare", advantages: "Direct, affordable, avoids road traffic", drawbacks: "Coastal stations; uphill hotel connection may be needed" }, heading: "Train from Ben Gurion Airport to Haifa", paragraphs: [
        "Direct trains often take about 80–85 minutes to Haifa Hof HaCarmel and approximately 90–100 minutes to Haifa Center HaShmona, but routes and stopping patterns vary. The nationwide rail timetable is due to change on November 14, 2026; check the actual arrival station, fare and service for your travel date.",
        "Haifa's railway stations follow the coast; a hotel on Mount Carmel may need an uphill bus or taxi. A short map distance is not necessarily an easy luggage walk. My where to stay in Haifa guide explains the neighborhoods, while the getting around Israel guide explains ticketing and onward connections."
      ], inlineLinks: [{ text: "where to stay in Haifa guide", to: "/travel-blog/best-hotels-in-haifa/" }, { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Check whether the chosen train actually calls at your station.", "Measure the uphill journey to the hotel.", "Look up late-night and Saturday-evening trains separately."] },
      { id: "taxi", name: "Official airport taxi", time: "About 75–110+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "On-demand arrival at a hotel", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", comparison: { cost: "Regulated meter", advantages: "Direct ride at any time, including Shabbat", drawbacks: "Meter varies with traffic and tariff; luggage limits" }, heading: "Official airport taxi to Haifa", paragraphs: [
        ...commonTaxi, "The journey and fare depend on whether your address is in the German Colony, Carmel Center, Bat Galim, the beachfront or the passenger port. Provide the exact building or authorized terminal entrance, and keep your ride code. Read the official airport taxi guide for Gett pickup instructions, the taxi fares guide for regulated meter charges, and my Uber alternatives guide for app availability."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }, { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" } ], checklist: ["Use Gett or the authorized kiosk and queue.", "Specify the destination neighbourhood and building.", "Allow extra margin for a cruise connection."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 75–110+ min after pickup", cost: "Written quote; starting rate on booking page", bestFor: "Large parties, bags, timed connections", doorToDoor: "To agreed point", availability: "By confirmation", comparison: { advantages: "Vehicle size, pickup and written price arranged", drawbacks: "Book and confirm in advance; costs more than rail" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer, "A pre-booked transfer can suit Mount Carmel hotels, several suitcases, larger groups or a cruise departure. If boarding a ship, supply its name, the passenger-terminal entrance and check-in deadline; allow for flight and road delays. The separate private transfer to Haifa page explains the service and starting rate, while a form inquiry is not a confirmed booking."
      ], inlineLinks: [{ text: "private transfer to Haifa page", to: "/travel-blog/ben-gurion-airport-to-haifa/" } ], checklist: ["Confirm luggage and vehicle size.", "If travelling to a ship, share boarding deadlines.", "Request the exact Haifa hotel or terminal entrance."] },
      { id: "bus", name: "Bus 905 (limited)", time: "About 110–125+ min when available", cost: "Current bus fare: check planner", bestFor: "Flexible arrivals within its window", doorToDoor: "No", availability: "Limited Saturday night / early Sunday; check actual departure", comparison: { cost: "Check current fare", advantages: "Low-cost direct ride if the departure fits", drawbacks: "Very limited weekend schedule and onward stop connection" }, heading: "Bus 905 from the airport to Haifa: limited weekend service", paragraphs: [
        "Egged bus 905 is a direct but very limited service from Ben Gurion Airport to Haifa. Late-2026 listings show mainly Saturday-night and early-Sunday departures, not an everyday alternative to the train. It starts from Terminal 3, Level 2 and also serves Terminal 1. Allow enough time to clear passport control and collect luggage, and check the departure for your exact date.",
        "The listed route continues via Tel Aviv Savidor, HaSira, Netanya and Olga before stopping at MATAM, Haifa Hof HaCarmel and HaMifratz Central. It does not stop at the German Colony or Haifa Center HaShmona railway station. Choose a practical last connection and check the current fare. Regular buses generally require a loaded Rav-Kav or supported payment app rather than cash to the driver; see the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Confirm a real departure for your landing date.", "Check the exact Terminal 3 boarding stop and city destination.", "Plan a second option if the timing does not work."] },
      { id: "rental", name: "Rental car", time: "About 75–110+ min driving plus collection", cost: "Rental + insurance, tolls, fuel and parking", bestFor: "A northern Israel road trip", doorToDoor: "Yes, where permitted", availability: "Collection hours vary", comparison: { cost: "Rental + extras", advantages: "Flexible for further northern Israel travel", drawbacks: "Collection hours, hills, tolls and parking" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental, "A rental can be useful if Haifa is a base for Akko (Acre), Nazareth, the Sea of Galilee or other northern road trips. For a short city-only stay, steep streets and limited parking may make it less useful. Compare the Akko travel guide and the car rental page before choosing a car."
      ], inlineLinks: [{ text: "Akko travel guide", to: "/travel-blog/akko-acre/" }, { text: "car rental page", to: "/car-rental/" } ], checklist: ["Ask about parking at your Haifa hotel.", "Compare Highway 6 toll handling.", "Check desk hours if arriving on Shabbat."] },
    ],
    stations: [
      { name: "Haifa Hof HaCarmel", time: "About 80–85 min", usefulFor: "Southern Haifa, Carmel Beach, MATAM and bus connections." },
      { name: "Haifa Bat Galim", time: "About 85–90 min", usefulFor: "Bat Galim, Rambam Hospital and the cable car toward Stella Maris." },
      { name: "Haifa Center HaShmona", time: "About 90–100 min", usefulFor: "Downtown, German Colony, the port district and lower Bahá’í Gardens." },
      { name: "HaMifratz Central (Lev HaMifratz)", time: "Check train stops", usefulFor: "Haifa Bay, intercity buses, the Krayot and northern connections." },
    ],
    connections: [
      "Downtown, German Colony and lower Bahá’í Gardens: Center HaShmona is often a practical station, but check the walk and your hotel entrance.",
      "Carmel Center and hilltop accommodation: plan an uphill bus or taxi. A nearby coastal station may still require a steep climb.",
      "Cruise departures: Center HaShmona is near the port district, but the passenger entrance and baggage route are distinct; verify the ship, check-in deadline and access rules."
    ],
    weekend: [
      "Rail service normally pauses during the main Shabbat period and most Jewish holidays. Published bus 905 service is limited to Saturday night and early Sunday, and must be checked for your specific date.",
      "If no operating rail/bus connection suits the flight, compare the official airport taxi queue with an advance private transfer. Price, vehicle size and meeting instructions differ.",
      "The former Amal shared airport taxi to Haifa has been discontinued. The Sherut in Israel guide explains why old Amal listings cannot be relied upon; the airport Shabbat transport guide covers currently available weekend options."
    ],
    advice: [
      "Pick your station by hotel elevation and actual bus connection, not by the first Haifa station on the railway line.",
      "If connecting to a cruise, avoid a narrow margin between airport arrival and ship check-in.",
      "Review the number of bags and passenger count before choosing a standard taxi.",
      "For a wider northern trip, compare rail-plus-driver days with the full cost of a rental vehicle.",
      "For bus 905, check the actual terminal stop, departure and Haifa destination instead of relying on an old timetable.",
      "Arrange mobile data for live timetables, payment apps and driver communications if you need it after landing."
    ],
    faqs: [
      { q: "Can I buy a train ticket at the airport without a Rav-Kav?", a: "Normally yes. You can buy a single journey ticket at the station beneath Terminal 3; a Rav-Kav or supported app can be convenient for further travel. Check the current fare and accepted methods." },
      { q: "How do I pay for airport bus 905?", a: "Regular buses generally take a loaded Rav-Kav or a supported public-transport payment app, not cash passed to the driver. Check current ticketing rules before you board." },
      { q: "Does bus 905 stop in the German Colony?", a: "No. The published route serves MATAM, Hof HaCarmel and HaMifratz Central rather than Haifa Center HaShmona or the German Colony. Plan the last part of the trip separately." },
      { q: "Is there a direct train from Ben Gurion Airport to Haifa?", a: "Direct trains are generally available during regular rail operation, but stops, frequency and service disruptions vary. Check Israel Railways for your destination station and travel date." },
      { q: "Which station is best for Haifa's German Colony?", a: "Haifa Center HaShmona often works well for downtown and the German Colony. Confirm your hotel's actual street and the remaining walk or taxi ride." },
      { q: "Can I use bus 905 on a weekday?", a: "Do not assume it runs through the day or every weekday. Its operation has been limited; use a dated public-transport planner and have a train/taxi alternative." },
      { q: "Are there airport sheruts to Haifa?", a: "No. The former Amal airport shared-taxi service has been discontinued. Historical listings and contact details are not a current transport option." },
      { q: "How should I plan an airport-to-cruise-port connection?", a: "Supply the exact Haifa passenger terminal, ship and check-in deadline. Leave a wide margin and confirm meeting/drop-off access and delay arrangements." },
      { q: "Which Haifa railway station should I use for a Mount Carmel hotel?", a: "The rail corridor is on the coast; most Mount Carmel hotels require an onward uphill bus or taxi. Compare the actual hotel address and a practical connection." },
      { q: "Is airport bus 905 available every day?", a: "No. The checked late-2026 timetable shows limited Saturday-night and early-Sunday service, not a regular daily route. Verify the actual departure before depending on it." },
      { q: "Can I get an Uber from Ben Gurion Airport to Haifa?", a: "No. Uber passenger rides are not available in Israel as of November 2026. Use an official airport taxi or a confirmed private transfer." },
      { q: "How do I travel from TLV to Haifa Port for a cruise?", a: "Confirm the ship, passenger-terminal entrance and boarding deadline. Consider the railway connection, final walk and baggage; for a timed arrival a direct confirmed vehicle may be easier." },
    ],
    related: [
      { label: "Official airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Haifa shore excursions and port planning", to: "/haifa-shore-excursions/" },
      { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" },
      { label: "Ben Gurion Airport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Sherut in Israel: former Amal airport service", to: "/travel-blog/sherut-in-israel/" },
    ],
    planNext: [
      { label: "Haifa travel guide", to: "/travel-blog/haifa/", note: "Plan the German Colony, Mount Carmel and the waterfront." },
      { label: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/", note: "Discover museums and cultural sights on Mount Carmel and downtown." },
      { label: "Akko (Acre) travel guide", to: "/travel-blog/akko-acre/", note: "Explore the historic walled coastal city near Haifa." },
      { label: "Nazareth and the Basilica of the Annunciation", to: "/travel-blog/basilica-of-the-annunciation/", note: "Plan an excursion into the Galilee." },
    ]
  },
  "ein-bokek": {
    id: "ein-bokek", city: "Ein Bokek (Dead Sea)",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/",
    title: "Ben Gurion Airport to Ein Bokek: Train, Bus, Taxi & Transfers",
    description: "Compare train and bus via Jerusalem, official airport taxis, private transfers and rental cars to Ein Bokek, with bus 486/444 times, Jerusalem rail vouchers, hotel stops and Shabbat travel.",
    distance: "Approximately 155–165 km to the Ein Bokek hotel strip by road",
    intro: "There is no direct train or regular airport bus to the Ein Bokek hotels on the Dead Sea. This guide compares the train-and-bus connection via Jerusalem with official taxis, pre-booked transfers and rental cars, including costs, travel times, the last bus and the correct stop for your hotel.",
    exampleJourney: {
      title: "Example: a daytime public-transport connection to Ein Bokek",
      steps: [
        { label: "Check the last southbound bus first", detail: "Before leaving the airport, look up a dated bus departure serving your named hotel stop from Jerusalem. A late arrival may leave no usable connection." },
        { label: "Train to Jerusalem–Yitzhak Navon", detail: "Allow time to exit the deep station and reach the intercity platforms at Jerusalem Central Bus Station; check ticket and any Jerusalem-line voucher requirement." },
        { label: "Continue to the hotel district", detail: "Find the appropriate 486 or 444 service if operating, then verify the specific stop and remaining luggage walk to your Ein Bokek accommodation." },
      ],
      takeaway: "This is a connection-dependent itinerary, not a through ticket. If the final bus cannot be reached comfortably, compare a confirmed transfer or a different travel plan before departing.",
    },
    answer: "The lowest-cost practical route is usually a train from Terminal 3 to Jerusalem–Yitzhak Navon railway station, followed by Egged bus 486 or reserved-seat bus 444 from Jerusalem Central Bus Station to the stop nearest your Ein Bokek hotel. Allow roughly 3–4 hours or more for both legs and the connection; check the last southbound bus, the separate Jerusalem train voucher and seat reservations before travelling. An official metered taxi or confirmed private transfer takes you directly to the hotel and is more practical after the last bus, on Shabbat or with substantial luggage.",
    trainIntro: "Ben Gurion Airport railway station is directly below Terminal 3; follow the train signs after customs. Passengers arriving at Terminal 1 need the airport's free internal shuttle to Terminal 3. The train to Jerusalem–Yitzhak Navon usually takes about 26–30 minutes. You can buy a single train ticket at the station or use an accepted Rav-Kav or payment app. Check the actual timetable, price and the additional free personal voucher currently required on the Jerusalem line. My airport arrival guide covers the terminal steps, and the getting around Israel guide explains public-transport ticketing.",
    photo: airportTransferPhotos["dead-sea"]!,
    updatedAt: "2026-11-12",
    historicalPrices: false,
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
      { title: "Israel Railways — train times, fares and service notices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — free Jerusalem-line travel voucher notice (19 August 2026)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Israel Railways — timetable changes starting 14 November 2026", url: "https://rail.co.il/?lan=en&page=new-schedule-141126" },
      { title: "Tamar Regional Council — Dead Sea public transport lines 444, 486 and 421", url: "https://www.deadsea.co.il/on-the-map/?lang=en" },
      { title: "Egged — reserved-seat lines including buses 444 and 421", url: "https://www.egged.co.il/en/information-for-passengers/tickets-information" },
      { title: "National Public Transport Journey Planner — current route and hotel-stop times", url: "https://bus.gov.il/" },
      { title: "Israel Airports Authority — Terminal 3 rail and ground transport", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett — official airport taxi ride-code and queue instructions", url: "https://www.gett.com/il/airport-en/" },
      { title: "Israel Police — flood warnings and road safety guidance", url: "https://www.gov.il/he/pages/police_5_11_26_weather" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-ein-bokek/",
    privateLabel: "Request a private Ein Bokek transfer",
    options: [
      { id: "rail", name: "Train + bus via Jerusalem", time: "Roughly 3–4+ hours with connections", cost: "Check current train + bus fares per person", bestFor: "Daytime arrivals, light luggage", doorToDoor: "No", availability: "Requires a usable onward bus", comparison: { cost: "Check rail + bus fares", advantages: "Usually the least expensive option", drawbacks: "Train–bus transfer, early last bus, hotel-stop walk" }, heading: "Train and bus via Jerusalem: the budget option", paragraphs: [
        "There is no train station at the Dead Sea. The train from Terminal 3 reaches Jerusalem–Yitzhak Navon in about 26–30 minutes when scheduled. Jerusalem Central Bus Station is beside Navon, but its intercity platforms are above ground and the railway platforms are deep below street level. Allow time for lifts, walking and finding the correct bus departure. My getting around Israel guide explains ticketing and bus payment.",
        "For the Jerusalem-to-Ein Bokek leg, Egged bus 486 is usually the more frequent service and bus 444 toward Eilat may help with some later connections. Bus 444 is a reserved-seat service; check its available seats and book in advance through Egged. The bus leg is normally roughly 1 hour 45 minutes to 2 hours 15 minutes, depending on stops and traffic. Check the exact dated departure before purchasing a train ticket.",
        "Choose the stop closest to your named Ein Bokek hotel, not just one marked Dead Sea. Neve Zohar and Hamei Zohar properties, Masada and Ein Gedi are separate destinations. The Jerusalem to the Dead Sea guide explains the onward intercity journey and the hotel-stop differences in more detail.",
        "Plan from the last usable southbound bus backwards: airport formalities can take one or two hours, the Navon-to-bus transfer needs a margin, and the last bus often leaves much earlier than the last train. A late flight or a missed connection can leave no usable public transport to the hotel that day. A very limited reserved-seat bus 421 from Tel Aviv–Savidor is another possible route, but it requires a separate airport train and a date-specific bus reservation."
      ], inlineLinks: [
        { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" },
        { text: "Jerusalem to the Dead Sea guide", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      ], checklist: ["Check both train and bus on your exact date, including any required free rail voucher.", "Verify the 486 or 444 stop list, seat-booking rules and last bus to your hotel.", "Allow for airport formalities and changing stations in Jerusalem."] },
      { id: "taxi", name: "Official airport taxi", time: "About 1h 45m–2h 30m+ after pickup", cost: "Regulated meter; check current tariff", bestFor: "On-arrival direct ride to a resort", doorToDoor: "To accessible hotel entrance", availability: "Subject to available licensed taxis", comparison: { cost: "Regulated meter", advantages: "Direct airport-to-hotel ride, including Shabbat", drawbacks: "High and variable long-distance meter fare" }, heading: "Official airport taxi to Ein Bokek or Neve Zohar", paragraphs: [
        ...commonTaxi,
        "A metered taxi is not the same as a vehicle booked beforehand for a fixed quote. The total on this longer journey depends on the regulated tariff, time, distance and permitted extras. The official airport taxi guide explains how to obtain the ride code and find the authorized queue; my taxi fares in Israel guide covers current meter rules rather than an unverified route-specific price.",
        "Give the driver your complete hotel name, not just “Dead Sea”: Ein Bokek, Hamei Zohar, Neve Zohar and Ein Gedi are not interchangeable drop-offs. Check luggage space, payment, any planned stop and hotel access before leaving the airport. There is no Uber passenger-car service in Israel; my Uber alternatives guide explains available apps."
      ], inlineLinks: [
        { text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" },
        { text: "taxi fares in Israel guide", to: "/travel-blog/taxi-fares-in-israel/" },
        { text: "Uber alternatives guide", to: "/travel-blog/uber-in-israel/" },
      ], checklist: ["Order through the official airport process, keeping the ride code and receipt.", "Check your hotel's actual entrance and suitcase capacity.", "Budget for a long metered journey without assuming a fixed fare."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 1h 45m–2h 30m+ after pickup", cost: "Published weekday vehicle starting rate; written quote", bestFor: "Families, several bags, late arrival", doorToDoor: "To agreed hotel entrance", availability: "Only after confirmation", comparison: { advantages: "Confirmed vehicle and agreed meeting point", drawbacks: "Must be booked and confirmed; costlier than public transport" }, heading: "When a pre-booked transfer is useful", paragraphs: [
        ...commonTransfer,
        "For a long resort journey, a confirmed vehicle and written total can make planning easier for families, late arrivals or larger parties. Provide the hotel, flight details and full luggage list. The separate private transfer to Ein Bokek page shows the weekday per-vehicle starting rate and the request form; the form submission is not a booking.",
        "If you want to stop at Masada, Ein Gedi or another hotel, request a separate itinerary and price. A direct airport-to-resort transfer does not automatically include sightseeing, waiting time or a return journey. See the Masada visitor guide to understand access and visiting time before proposing an extra stop."
      ], inlineLinks: [
        { text: "private transfer to Ein Bokek page", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
        { text: "Masada visitor guide", to: "/travel-blog/masada/" },
      ], checklist: ["Share the exact Dead Sea hotel, landing time, passenger count and luggage.", "Ask about child seats, waiting, flight delays, night/weekend charges and cancellation.", "Confirm any sightseeing stop or return transfer separately in writing."] },
      { id: "rental", name: "Rental car", time: "About 1h 45m–2h 30m+ driving plus collection", cost: "Rental, insurance, fuel and parking", bestFor: "Independent Masada/Dead Sea touring", doorToDoor: "To accessible parking area", availability: "Check desk hours and road access", comparison: { cost: "Rental + extras", advantages: "Freedom for Masada and other Dead Sea stops", drawbacks: "Collection time, parking and flood-related road closures" }, heading: "Should you rent a car at the airport?", paragraphs: [
        ...commonRental,
        "A rental car can make sense when Ein Bokek is one stop in a wider itinerary that includes Masada or Ein Gedi. Compare the total rental cost and available vehicle with my car rental in Israel page before committing to several days of parking at one resort.",
        "Check current police, weather and road notices before the drive, particularly after rain in the Judean Desert. Flash floods can temporarily close Route 90; never drive into water covering the road. Check pickup hours, parking and insurance terms, especially if you are landing on Shabbat or a Jewish holiday."
      ], inlineLinks: [
        { text: "car rental in Israel page", to: "/car-rental/" },
      ], checklist: ["Check route and flood-related closures before starting the drive.", "Confirm hotel parking, rental coverage and pickup hours.", "Avoid assuming a self-drive detour is included in a simple airport transfer comparison."] },
    ],
    stations: [
      { name: "Airport train → Jerusalem–Yitzhak Navon", time: "About 26–30 min by train", usefulFor: "Starts below Terminal 3; check rail fare and separate Jerusalem-line voucher." },
      { name: "Navon → Jerusalem Central Bus Station", time: "Allow extra transfer time", usefulFor: "Exit the deep rail station, walk to the bus station and find intercity platforms." },
      { name: "Egged bus 486 → Ein Bokek", time: "About 1h 45m–2h 15m", usefulFor: "Check the last southbound departure and the stop nearest your hotel." },
      { name: "Egged bus 444 → Ein Bokek", time: "Check actual itinerary", usefulFor: "Reserved-seat Jerusalem–Eilat bus; book in advance and verify the hotel stop." },
    ],
    connections: [
      "Ein Bokek has multiple hotel-area bus stops. Enter your full hotel name in the journey planner and confirm the exact stop, walking distance and direction before boarding.",
      "Neve Zohar and Hamei Zohar hotels may have different stops from central Ein Bokek. Masada and Ein Gedi are separate destinations farther north; use their own journey plans.",
      "If your flight arrives in the afternoon or evening, allow for immigration, baggage, waiting for the airport train, exiting Navon and the last southbound bus. Check whether the final arrival stop is a safe and practical walk with bags or whether another ride is needed.",
    ],
    weekend: [
      "Most regular rail and intercity bus services stop for the main Shabbat period and many Jewish holidays. The 486 and 444 are not reliable Friday-night or Saturday daytime transfers; verify the precise last and first departures in the official planner. My airport Shabbat transport guide covers practical alternatives from TLV.",
      "An official metered taxi or a private vehicle may be a viable direct option when public transport is not operating, subject to actual availability and confirmation. The taxis in Israel guide explains the difference between metered rides and advance private transport.",
      "For a self-drive option, check that the car-rental counter is open for your arrival and that desert road access is safe on that date.",
    ],
    advice: [
      "Compare the full airport-to-hotel journey, not just the 26–30-minute rail leg to Jerusalem.",
      "Work backwards from the final bus; check its operating date, destination direction, seat rules and named hotel stop.",
      "Ask about the railway's current free personal travel voucher requirement for the Jerusalem line before boarding.",
      "Bring water for any outdoor transfer and consider daytime desert heat when estimating a walk with bags.",
      "If you miss the last bus, a long-distance metered taxi may cost far more than your original train-plus-bus plan.",
      "For any private or rental vehicle, confirm the actual hotel address, luggage space and any itinerary detours or restrictions.",
      "If you use bus 444 or the limited bus 421 from Tel Aviv, check the seat-reservation system and arrive at the boarding stop early.",
      "Check Route 90 and desert weather warnings before an onward drive; flash floods can affect roads even when it is not raining at the hotel."
    ],
    faqs: [
      { q: "Do I need to reserve a seat on bus 444 or 421?", a: "Egged lists routes 444 and 421 as reserved-seat services. Check availability and the current reservation instructions before travel, and allow time to reach the correct departure platform." },
      { q: "How do I pay for the airport train and Dead Sea bus?", a: "Train tickets are available at Ben Gurion Airport railway station, with accepted Rav-Kav or payment-app options where supported. The bus fare is separate; use an accepted bus payment method or Egged's advance seat-booking process where required." },
      { q: "Is bus 421 via Tel Aviv a good alternative?", a: "Only occasionally. Bus 421 is a limited reserved-seat service from Tel Aviv–Savidor toward the Dead Sea, so you first need a suitable airport train and then a reliably timed, separately booked bus. Jerusalem is usually the more practical interchange." },
      { q: "What if road 90 is closed because of flooding?", a: "Check police and official road notices, and follow closures. Flash floods can make the road dangerous; do not drive through a flooded roadway or assume a hired vehicle can legally bypass a closure." },
      { q: "Is there a direct train from Ben Gurion Airport to Ein Bokek?", a: "No. There is no railway station in Ein Bokek. A common lower-cost route is the train to Jerusalem–Yitzhak Navon followed by a scheduled Dead Sea bus, when both services operate." },
      { q: "Is there a direct bus from Ben Gurion Airport to the Dead Sea?", a: "Do not count on a regular direct airport-to-Ein Bokek bus. The usual public-transport plan is a train to Jerusalem and an onward Egged bus, subject to the actual dated timetable." },
      { q: "Which Jerusalem buses reach Ein Bokek hotels?", a: "Tamar Regional Council lists routes 486 and 444 for the Dead Sea from Jerusalem. Confirm the current departure, direction, hotel-stop list and any seat-booking requirement with the operator or journey planner." },
      { q: "How long does it take from TLV Airport to Ein Bokek?", a: "Plan roughly 1 hour 45 minutes to 2 hours 30 minutes or more of driving after pickup, depending on traffic and road conditions. A train-and-bus journey can take 3–4 hours or longer including realistic connections and waiting." },
      { q: "Can I reach Ein Bokek after an evening flight?", a: "Only if an actual onward bus still runs after you clear the airport and reach Jerusalem Central Bus Station. Check the last bus before depending on public transport; a late train does not guarantee a Dead Sea connection." },
      { q: "Do buses or trains run to Ein Bokek on Shabbat?", a: "Regular train and intercity-bus connections generally stop during the main Shabbat period. Check the precise holiday/weekend schedules, and compare a confirmed taxi, pre-booked transfer or car rental if there is no usable service." },
      { q: "Do I need a voucher for the train to Jerusalem?", a: "An Israel Railways notice dated 19 August 2026 introduced a free personal travel voucher, in addition to a ticket, for journeys on the Jerusalem–Yitzhak Navon line. Verify the current requirement and request it in advance if applicable." },
      { q: "Is the Ein Bokek bus stop outside every hotel?", a: "No. Buses serve multiple stops along the resort area, and the generic Ein Bokek stop may be some distance from your hotel. Search using the full hotel name and check the remaining walk." },
      { q: "Is Ein Gedi the same as Ein Bokek?", a: "No. Ein Gedi, Masada, Neve Zohar and the Ein Bokek hotel area are distinct places and stops. Confirm the precise destination in your route plan or transfer request." },
      { q: "Should I choose an airport taxi or a private transfer?", a: "An official airport taxi is ordered on arrival through the authorized process and charged by the regulated meter. A private transfer is arranged in advance and needs a confirmed vehicle, meeting point and written total; compare the full terms for your party." },
    ],
    related: [
      { label: "Jerusalem to the Dead Sea by bus, taxi or car", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { label: "Where to stay at the Dead Sea", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Masada visitor information", to: "/travel-blog/masada/" },
      { label: "Official airport taxis and pickup instructions", to: "/travel-blog/ben-gurion-airport-taxis/" },
      { label: "Ben Gurion Airport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { label: "Getting around Israel: tickets and buses", to: "/travel-blog/getting-around-israel/" },
    ],
    planNext: [
      { label: "The Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/", note: "Learn about swimming, the resort areas and practical conditions." },
      { label: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Choose viewpoints, reserves and scenic stops near the shore." },
      { label: "Ein Gedi visitor guide", to: "/travel-blog/ein-gedi/", note: "Plan the nature reserve and its separate location from Ein Bokek." },
      { label: "Israel itinerary: five days", to: "/travel-blog/israel-itinerary-5-days/", note: "Combine a Dead Sea stay with nearby destinations." },
    ]
  }
};

export const airportJourneyGuides = byId;
export const airportJourneyIds: AirportJourneyId[] = ["jerusalem", "tel-aviv", "haifa", "ein-bokek"];
