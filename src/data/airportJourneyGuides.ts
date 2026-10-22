import type { LinkProps } from "@tanstack/react-router";
import { airportTransferPhotos } from "@/data/airportTransfers";
import type { StayGuidePhoto } from "@/data/content";
import telAvivOldJaffa from "@/assets/tel-aviv/jaffa.webp";
import airportTerminalHall from "@/assets/home/ben-gurion-t3.webp";
import jerusalemMamilla from "@/assets/jerusalem/mamilla.webp";
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
  heading: string; paragraphs: string[]; checklist: string[]; inlineLinks?: { text: string; to: LinkProps["to"] }[];
};
export type AirportJourneyGuide = {
  id: AirportJourneyId; city: string; path: LinkProps["to"]; title: string; description: string;
  distance: string; intro: string; answer: string; trainIntro: string;
  privatePath: LinkProps["to"]; privateLabel: string; photo: StayGuidePhoto;
  options: JourneyOption[];
  stations: { name: string; time: string; usefulFor: string }[];
  connections: string[]; weekend: string[]; advice: string[]; faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"] }[];
  photos?: { station: Pick<StayGuidePhoto, "src" | "alt">; onward: Pick<StayGuidePhoto, "src" | "alt"> };
  stationLinks?: { text: string; to: LinkProps["to"] }[];
  weekendLinks?: { text: string; to: LinkProps["to"] }[];
  sources?: { title: string; url: string }[];
  updatedAt?: string;
  historicalPrices?: boolean;
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
    title: "How to get from Ben Gurion Airport to Jerusalem (2026): Train, Bus or Taxi?",
    description: "Ben Gurion Airport to Jerusalem in 2026: compare the direct train, bus 485, official taxis and private rides, with station, Old City and Shabbat tips.",
    distance: "Approximately 45–55 km by road, depending on your address",
    intro: "Compare the direct airport train, bus 485, authorized taxis and pre-booked transfers to Jerusalem — including the last connection from Yitzhak Navon station to your actual accommodation.",
    answer: "The direct train from Ben Gurion Airport to Jerusalem–Yitzhak Navon is often the fastest lower-cost choice when operating; allow roughly 26–30 minutes on the train plus the transfer to your hotel. Check Israel Railways for the actual ticket, departure and any required free personal travel voucher. The airport also lists bus 485 from Terminal 3, Level 2, Exit 21, but verify a real departure. Licensed metered taxis and confirmed private transfers offer direct travel, especially for Shabbat arrivals or Old City accommodation.",
    trainIntro: "The airport railway station is below Terminal 3; follow the rail signs from international arrivals. The direct journey to Jerusalem–Yitzhak Navon is commonly about 26–30 minutes when scheduled. Yitzhak Navon is a deep underground terminal near the central bus station and the light rail, not the Old City. Check Israel Railways for the service, price, platform and its current free travel-voucher requirement. The Ben Gurion Airport arrival guide explains immigration, baggage and reaching your onward transport.",
    photo: airportTransferPhotos["jerusalem"]!,
    updatedAt: "2026-10-22",
    historicalPrices: false,
    photos: {
      station: { src: airportTerminalHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall before the train to Jerusalem" },
      onward: { src: jerusalemMamilla, alt: "Jerusalem Mamilla area and buildings near Old City hotel approaches" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }],
    weekendLinks: [{ text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }, { text: "Sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" }],
    sources: [
      { title: "Israel Railways — official route and current train fare", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — free personal voucher for Jerusalem line (August 2026 notice)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Israel Airports Authority — route 485, airport rail and taxi directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Gett — authorized taxi queue and ride-code process", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner — bus 485 service dates", url: "https://bus.gov.il/" },
      { title: "Israel Railways — Yitzhak Navon station and Jerusalem rail project", url: "https://rail.co.il/?lan=en&page=jerusalem-project" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-jerusalem/",
    privateLabel: "Request a private Jerusalem transfer",
    options: [
      { id: "rail", name: "Direct train", time: "About 26–30 min to Navon station", cost: "Current train fare: check planner", bestFor: "Solo/couples, light luggage", doorToDoor: "No", availability: "Not during the main Shabbat break", heading: "Taking the direct train to Jerusalem–Yitzhak Navon", paragraphs: [
        "The rail journey is generally faster than driving in highway traffic. Jerusalem–Yitzhak Navon station sits next to the central bus station and near Jaffa Road light rail, not in the Old City or outside every hotel.",
        "The platforms are deep underground. Include lifts or escalators, the way to street level and the final bus, light-rail trip, taxi or walk in your door-to-door estimate. As of the Israel Railways notice dated 19 August 2026, this line requires a free personal travel voucher for each passenger in addition to the train ticket. Check the official Israel Railways voucher notice linked in Sources when selecting your departure. For ordinary ticketing and validation, see the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Choose a hotel-to-station connection before landing.", "Check trains for Friday, Saturday evening and holidays.", "Allow additional time for the deep underground station."] },
      { id: "taxi", name: "Official airport taxi", time: "About 45–60+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "Immediate ride to the address", doorToDoor: "Yes", availability: "Usually around the clock", heading: "Using the authorized metered taxi to Jerusalem", paragraphs: [
        ...commonTaxi, "For a Jerusalem hotel, confirm the right door or nearest vehicle-accessible Old City gate. Some historic streets cannot be reached by car, and a final walk with luggage may remain. See the official airport taxi guide for ordering and pickup, and the 2026 taxi fares guide for the regulated tariff periods."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "2026 taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }], checklist: ["Order with Gett or use the airport kiosk, then follow the queue instructions.", "Confirm payment and the regulated meter.", "For Old City lodging, save the recommended drop-off point."] },
      { id: "private", name: "Private transfer arranged ahead", time: "About 45–60+ min after pickup", cost: "Written quote; published weekday starting rate on booking page", bestFor: "Family, groups and special pickup needs", doorToDoor: "To agreed vehicle-accessible point", availability: "By confirmation", heading: "When is a pre-booked private pickup worthwhile?", paragraphs: [
        ...commonTransfer, "It can be especially helpful when you are arriving with children, multiple suitcases or a late-night hotel check-in. Confirm an Old City meeting/drop-off point rather than assuming the vehicle can enter every historic lane. The separate private transfer to Jerusalem page covers the quoted vehicle, included service and booking request."
      ], inlineLinks: [{ text: "private transfer to Jerusalem page", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" }], checklist: ["Request the vehicle size and child seats that you actually need.", "Share the hotel entrance and flight number.", "Check waiting time and flight-delay terms in writing."] },
      { id: "bus", name: "Limited airport bus", time: "Around 55–60+ min when a direct service exists", cost: "Current bus fare: check planner", bestFor: "Flexible traveler with a suitable departure", doorToDoor: "No", availability: "Route 485: verify actual dated departure", heading: "Is there a direct bus from the airport to Jerusalem?", paragraphs: [
        "The Israel Airports Authority lists Jerusalem bus 485 at Terminal 3, Level 2, Exit 21. However, a published route and boarding point do not guarantee that a departure fits your specific flight. Check the current bus 485 timetable and operator details in the national journey planner before relying on it.",
        "If line 485 has a usable departure, verify its Jerusalem destination stop and onward local trip. A bus to a city stop is not a door-to-door hotel transfer. For boarding payment and ticket validation, read the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Confirm line 485's actual operation with the national journey planner.", "Check the terminal and boarding area.", "Have rail or a confirmed ride as your fallback."] },
      { id: "rental", name: "Rental car", time: "About 45–60+ min driving, plus collection", cost: "Rental + insurance, fuel and parking", bestFor: "Onward multi-city road trip", doorToDoor: "Yes, where driving is allowed", availability: "Depends on collection hours", heading: "Does renting at TLV make sense for Jerusalem?", paragraphs: [
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
      "The former Nesher shared airport taxi to Jerusalem has been discontinued. Old listings and telephone numbers are not current airport transport choices; the Sherut in Israel guide distinguishes those old airport services from local shared routes. The airport Shabbat transport guide explains what still works during the weekend."
    ],
    advice: [
      "Compare the total from landing to hotel: immigration and baggage, getting to the station, the train and the final leg.",
      "Save the hotel address in English and Hebrew if possible, plus the vehicle entrance or nearest Old City gate.",
      "For four travelers with large cases, request the precise luggage capacity rather than assuming a four-seat sedan fits everything.",
      "For the direct Jerusalem rail line, check whether a free personal travel voucher is still required in addition to the ticket.",
      "Verify the bus 485 departure before counting on it; keep a rail or confirmed taxi alternative.",
      "Consider a private pickup when a fixed quote or an agreed larger vehicle matters more than the lowest individual fare.",
    ],
    faqs: [
      { q: "What is the cheapest way to Jerusalem from Ben Gurion Airport?", a: "For many arrivals outside Shabbat, the direct train is usually the lowest-cost practical choice. Add local transport from Yitzhak Navon to your hotel and check today's fare." },
      { q: "Can I reach the Old City directly by train?", a: "No. The airport train arrives at Yitzhak Navon near Jerusalem Central Bus Station; continue by light rail, taxi or on foot as appropriate. Some Old City addresses require walking from a permitted vehicle drop-off." },
      { q: "Do trains run from TLV to Jerusalem on Saturday?", a: "Not during the main Shabbat shutdown. Check the specific Saturday evening and holiday timetable rather than assuming a particular restart time." },
      { q: "Is the old Nesher airport sherut still running?", a: "No. The former Nesher shared-taxi airport service to Jerusalem has been discontinued. Old contact details and fares are not valid travel options." },
      { q: "Taxi or private transfer to a Jerusalem hotel?", a: "The official airport taxi offers a metered on-demand ride. A private transfer requires advance confirmation of a suitable vehicle, meeting point and total quote. Compare the full terms, not only an indicative price." },
      { q: "Do I need a travel voucher for the Ben Gurion Airport to Jerusalem train?", a: "An Israel Railways notice dated 19 August 2026 requires a free personal voucher per passenger on the Jerusalem line in addition to a valid ticket. Check the official current procedure and request the voucher for your selected train when required." },
      { q: "Where does airport bus 485 leave from?", a: "The Israel Airports Authority lists Line 485 for Jerusalem from Terminal 3, Level 2, Exit 21. Check the current departure, route, operator and final stop in the national public transport planner." },
      { q: "How do I get to Mamilla or the Old City from Yitzhak Navon?", a: "Yitzhak Navon is near the central bus station and light rail, not inside the Old City. Use the appropriate light-rail stop, a licensed taxi or the walk recommended by your accommodation and confirm the nearest accessible entrance." },
      { q: "Does the train run from Ben Gurion Airport to Jerusalem late at night?", a: "There may be late trains on some dates, but schedules and service changes matter. Check the exact date and departure with Israel Railways, including any voucher requirement, before planning your hotel arrival." },
      { q: "Can I use Uber to travel from the airport to Jerusalem?", a: "No. Uber passenger rides are not available in Israel in 2026. Use the official airport taxi system or a separately confirmed private transfer." }
    ],
    related: [{ label: "Official Ben Gurion Airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" }, { label: "Choose a Jerusalem hotel area", to: "/travel-blog/where-to-stay-in-jerusalem/" }, { label: "Arriving on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }, { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/" }],
  },
  "tel-aviv": {
    id: "tel-aviv", city: "Tel Aviv & Jaffa",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/",
    title: "How to Get from Ben Gurion Airport to Tel Aviv (2026): Train, Bus or Taxi?",
    description: "Ben Gurion Airport to Tel Aviv in 2026: compare train, bus 445, official taxis, private transfers, all four stations and Shabbat bus 711.",
    distance: "Approximately 20–25 km to central Tel Aviv, depending on the address",
    intro: "Choose the best way from Ben Gurion Airport (TLV) to your actual Tel Aviv or Jaffa address. Compare trains, bus 445, official taxis, a confirmed private pickup and the limited Shabbat alternative.",
    answer: "The airport train is often the quickest low-cost option for Tel Aviv while it is operating: choose among HaHagana, HaShalom, Savidor Center and University based on the hotel address, and plan the last connection. Kavim bus 445 also serves Tel Aviv from Terminal 3, Level 2, Exit 21, but check its actual stops and times. A licensed airport taxi or confirmed private transfer goes directly to an accessible address. On Shabbat, regular trains stop; the limited free weekend bus 711 serves Terminal 1 on its own timetable.",
    trainIntro: "Ben Gurion Airport railway station is below Terminal 3. Under the airport’s published 2026 arrangement, international arrivals use Terminal 3; always follow current airport and airline instructions. Tel Aviv has four mainline stations: HaHagana, HaShalom, Savidor Center and University. Journey times and stopping patterns vary by train; none of the four stations is on the beachfront. The Ben Gurion Airport arrival guide explains the steps from passport control to onward transport.",
    photo: airportTransferPhotos["tel-aviv"]!,
    updatedAt: "2026-10-22",
    historicalPrices: false,
    photos: {
      station: { src: airportTerminalHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall and access to onward transport" },
      onward: { src: telAvivOldJaffa, alt: "Old Jaffa waterfront and streets, where the final hotel pickup point may differ from a train station" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }],
    weekendLinks: [{ text: "dedicated airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }],
    sources: [
      { title: "Israel Railways — check trains and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Airports Authority — Line 445, taxis and internal shuttle", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" },
      { title: "Tel Aviv visitor information — four railway stations and airport transport", url: "https://visit.tel-aviv.gov.il/move/airport" },
      { title: "Tel Aviv municipality — free weekend Line 711", url: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" },
      { title: "Gett — official airport taxi ordering and pickup", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport planner — bus 445 timetable", url: "https://bus.gov.il/" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-tel-aviv/",
    privateLabel: "Request a private Tel Aviv or Jaffa transfer",
    options: [
      { id: "rail", name: "Train to Tel Aviv", time: "Varies by Tel Aviv station and service", cost: "Current rail fare: check planner", bestFor: "Quick, lower-cost weekday arrival", doorToDoor: "No", availability: "Not during the main Shabbat break", heading: "Choosing the right Tel Aviv railway station", paragraphs: [
        "Check whether HaHagana, HaShalom, Savidor Center or University best fits the actual street of your destination. HaShalom is useful for Azrieli and Sarona, Savidor for major onward connections, HaHagana for parts of the south, and University for Ramat Aviv. An arrival rail platform and the station entrance may still require a walk.",
        "For the beach, Jaffa, Neve Tzedek or most western hotels, you will normally need to walk further or take a bus, taxi or light-rail connection. A station with 'Tel Aviv' in its name is not automatically the closest to your hotel. To plan the final leg, consult my getting around Tel Aviv guide."
      ], inlineLinks: [{ text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }], checklist: ["Use the full hotel address when choosing the station.", "Check the last train and late-night stopping pattern.", "Include the onward fare and bags in the total comparison."] },
      { id: "bus", name: "Bus 445", time: "About 40–70+ min, depending on stop", cost: "Current bus fare: check planner", bestFor: "Addresses near its city stops", doorToDoor: "No", availability: "Timetable dependent; Shabbat restrictions", heading: "Bus 445: useful for some central Tel Aviv hotels", paragraphs: [
        "The Israel Airports Authority lists Kavim route 445 to Tel Aviv from Terminal 3, Level 2, Exit 21. Check the operator’s dated timetable, boarding stop, direction and stops close to your hotel; do not rely on old lists of city streets or assume that every departure follows the same route.",
        "A bus may reduce your final walk if your hotel is close to a stop, but travel time is more traffic-sensitive than rail and luggage must be carried on and off the service. Do not assume a particular frequency or late-night departure. For ticketing and validation basics, see my getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" }], checklist: ["Verify line 445's dated timetable with Kavim.", "Check Terminal 3 Level 2, Exit 21 and direction.", "Map the bus stop to the actual hotel entrance."] },
      { id: "taxi", name: "Official airport taxi", time: "About 20–40+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "Direct on-demand hotel ride", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", heading: "Getting a licensed airport taxi to Tel Aviv or Jaffa", paragraphs: [
        ...commonTaxi, "For a beachfront hotel or an Old Jaffa address, provide the name and closest permitted car entrance. Traffic near the city centre or seafront can make an airport taxi slower or more expensive than the distance suggests. Read the official airport taxi guide for pickup and ride-code instructions, and the 2026 taxi fares guide for meter tariffs."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "2026 taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" }], checklist: ["Follow the official Gett kiosk/queue system.", "Provide the exact Jaffa or Tel Aviv address.", "Ask about a large vehicle if the party carries multiple cases."] },
      { id: "private", name: "Advance private transfer", time: "About 20–40+ min after pickup", cost: "Written quote; weekday starting rate on booking page", bestFor: "Families, extra luggage, planned meeting", doorToDoor: "To confirmed address", availability: "By confirmation", heading: "Should you pre-book a private ride to Tel Aviv?", paragraphs: [
        ...commonTransfer, "Private pickup is particularly useful for a family, multiple checked bags, a child seat, a flight arriving after regular public transport or accommodation in a narrow Jaffa street where the drop-off must be agreed. The dedicated private transfer to Tel Aviv page provides the starting rate and quote request, rather than offering a second route comparison."
      ], inlineLinks: [{ text: "private transfer to Tel Aviv page", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }], checklist: ["Send flight number, passengers, bags and children's ages.", "Confirm the vehicle and all supplements.", "Agree Jaffa's exact vehicle-accessible drop-off."] },
      { id: "weekend", name: "Weekend line 711", time: "Variable with stop and departure", cost: "Free where operating", bestFor: "Flexible weekend traveler with light luggage", doorToDoor: "No", availability: "Limited Friday/Saturday timetable, Terminal 1", heading: "The free weekend 711 is a limited exception", paragraphs: [
        "Tel Aviv's municipality lists the free Naim Busofash line 711 via Ben Gurion Airport Terminal 1 between Shoham and central Tel Aviv. It is not a frequent Terminal 3 service tied to flight arrivals.",
        "If arriving at Terminal 3, use the free internal shuttle from Level G near Gate 01 toward Terminal 1 (opposite Gate 4 on the return), then check the actual 711 stop, schedule and final walk. The dedicated airport Shabbat guide covers the interchange and Saturday-night train restart in detail."
      ], inlineLinks: [{ text: "dedicated airport Shabbat guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }], checklist: ["Check the city weekend route planner, not a weekday bus schedule.", "Allow time between Terminal 3 and Terminal 1.", "Confirm your last city connection or walk."] },
      { id: "rental", name: "Rental car", time: "About 20–40+ min plus collection", cost: "Rental + parking, insurance and fuel", bestFor: "Journey beyond Tel Aviv", doorToDoor: "Yes, where permitted", availability: "Desk-hours dependent", heading: "When to rent a car at the airport", paragraphs: [
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
      "Standard rail and many buses do not run during the main Shabbat shutdown. Tel Aviv's 711 weekend line stops at Terminal 1 and has a limited timetable; it does not solve every Saturday airport arrival.",
      "An authorized taxi or confirmed private transfer may be a more practical choice when the 711 does not match your flight, when arriving late or when carrying large bags.",
      "Check the exact Saturday evening train restart separately. Holiday restrictions and line alterations can change the options. The dedicated airport Shabbat guide includes the Terminal 1 connection and how to plan around the limited bus timetable."
    ],
    advice: [
      "Make your station choice based on the hotel address and not only the train's station name.",
      "Compare the total for the whole party: four separate rail/bus tickets plus last-mile taxi may narrow the gap with a vehicle quote.",
      "Check how your group will reach a beachfront or Jaffa entrance with suitcases after dark.",
      "On Shabbat, line 711 is a limited Terminal 1 option, not an airport-wide replacement for train services.",
      "For a first-time visitor, keep the airport arrival checklist and a fallback for flight or baggage delays.",
    ],
    faqs: [
      { q: "Which train station is closest to Tel Aviv's beach?", a: "None is directly on the promenade. Compare the exact beachfront hotel with onward connections from HaHagana, HaShalom or Savidor Central." },
      { q: "How can I reach Tel Aviv on Shabbat?", a: "Check the limited free line 711 at Terminal 1 for the actual departure and city stop. If it does not work, compare an authorized metered taxi or a confirmed private transfer." },
      { q: "What is bus 445 and where does it leave?", a: "Kavim's airport-to-Tel Aviv bus is listed by the Airports Authority from Terminal 3 Level 2 Exit 21. Check the live timetable, route and direction before relying on it." },
      { q: "What if my hotel is in Jaffa?", a: "Treat Jaffa as a specific address rather than a central Tel Aviv rail station. Work out the last leg or provide a drivable hotel/host meeting point for a taxi or transfer." },
      { q: "Will the airport train take me straight to the hotel?", a: "No. It serves four railway stations. Most hotels need a further walk or local connection." },
      { q: "How do I pay for a train or bus to Tel Aviv?", a: "Check the current fare and valid ticket or payment method before travel. Rav-Kav and supported ticketing apps are common; do not assume that an overseas credit card can be tapped on every bus or at any rail gate." },
      { q: "Can I get an Uber from Ben Gurion Airport to Tel Aviv?", a: "No. Uber passenger rides are not available in Israel in 2026. The official airport taxi system uses Gett, or you can arrange a separate private transfer." },
      { q: "Do trains run from the airport late at night?", a: "Service and stopping patterns vary by date and hour. Check the actual Israel Railways journey for your flight and hotel; a late-night train may not stop at every Tel Aviv station." },
      { q: "Can I walk from Tel Aviv railway station to the beach?", a: "The four mainline Tel Aviv stations are inland. Walking may be possible for some addresses, but for many beach hotels or Old Jaffa the last leg is better planned by bus or taxi." }
    ],
    related: [{ label: "Official Ben Gurion Airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" }, { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" }, { label: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" }, { label: "Airport transport on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" }]
  },
  haifa: {
    id: "haifa", city: "Haifa",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/",
    title: "How to get from Ben Gurion Airport to Haifa (2026): Train, Bus or Taxi?",
    description: "Ben Gurion Airport to Haifa in 2026: compare train, limited bus 905, taxis and private rides, with the best Haifa station, Shabbat and cruise tips.",
    distance: "Approximately 100–110 km to central Haifa",
    intro: "Haifa stretches from the coastline to Mount Carmel. Compare train, limited bus 905, official metered taxis and confirmed transfers, then plan the final journey to your exact neighborhood or cruise terminal.",
    answer: "The airport train is generally a practical low-cost way to reach Haifa while regular rail services operate. Compare Haifa Hof HaCarmel, Bat Galim, Center HaShmona and Lev HaMifratz for your final address, especially for Mount Carmel hotels. Egged bus 905 operates only on a very limited published Saturday-night and early-Sunday timetable, not throughout the week. An authorized metered taxi or confirmed private transfer may be easier for a late arrival, luggage or a cruise connection.",
    trainIntro: "Ben Gurion Airport railway station is below Terminal 3, where international flights arrive under the airport’s published 2026 arrangement. Depending on the schedule, Haifa rail journeys may be direct or require a change. Check actual stops and the station nearest your destination; the railway follows the coast, and hilltop hotels can be a separate uphill journey. My Ben Gurion Airport arrival guide covers the steps from landing to the station.",
    photo: airportTransferPhotos["haifa"]!,
    updatedAt: "2026-10-22",
    historicalPrices: false,
    photos: {
      station: { src: airportTerminalHall, alt: "Ben Gurion Airport Terminal 3 arrivals and onward transport area" },
      onward: { src: haifaColony, alt: "Haifa German Colony and Mount Carmel above the lower city" },
    },
    stationLinks: [{ text: "Ben Gurion Airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" }],
    weekendLinks: [
      { text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { text: "Sherut in Israel guide", to: "/travel-blog/sherut-in-israel/" },
    ],
    sources: [
      { title: "Israel Railways — current Haifa departures and ticket prices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — Haifa Bat Galim station", url: "https://www.rail.co.il/en/stations/haifa-bat-galim" },
      { title: "Egged bus 905 route and schedules (updated 2026)", url: "https://moovitapp.com/index/en/public_transit-line-905-Israel-1-1-81823102-0" },
      { title: "Israel Airports Authority — train, taxis and terminal directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett — official airport taxi booking", url: "https://www.gett.com/il/airport-en/" },
      { title: "National public transport journey planner — current 905 departures", url: "https://bus.gov.il/" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-haifa/",
    privateLabel: "Request a private Haifa transfer",
    options: [
      { id: "rail", name: "Train to Haifa", time: "About 80–110 min to a station", cost: "Current train fare: check planner", bestFor: "Budget-minded intercity travel", doorToDoor: "No", availability: "Varies; not during the main Shabbat break", heading: "Direct rail to Haifa: which station should you choose?", paragraphs: [
        "Depending on the service, the journey may take about 80 minutes to Hof HaCarmel or roughly 90–100 minutes to Center HaShmona. Trains do not always serve the same stops.",
        "Haifa's hills change the last leg. A station along the coast is not necessarily a comfortable walk to a Mount Carmel hotel, even if it looks close on a flat map. Allow for a bus, taxi or other local transport. My getting around Israel guide explains ticketing and onward connections."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Check whether the chosen train actually calls at your station.", "Measure the uphill journey to the hotel.", "Look up late-night and Saturday-evening trains separately."] },
      { id: "taxi", name: "Official airport taxi", time: "About 75–110+ min after pickup", cost: "Regulated meter; no fixed fare", bestFor: "On-demand arrival at a hotel", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", heading: "Licensed airport taxi to Haifa", paragraphs: [
        ...commonTaxi, "The final distance depends strongly on whether the destination is in the German Colony, Carmel Centre, Bat Galim, a beach hotel or the passenger port. Confirm the exact street or port terminal. Read the official airport taxi guide for pickup procedures and the taxi fares guide for regulated tariffs."
      ], inlineLinks: [{ text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" }, { text: "taxi fares guide", to: "/travel-blog/taxi-fares-in-israel/" } ], checklist: ["Use Gett or the authorized kiosk and queue.", "Specify the destination neighbourhood and building.", "Allow extra margin for a cruise connection."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 75–110+ min after pickup", cost: "Written quote; starting rate on booking page", bestFor: "Large parties, bags, timed connections", doorToDoor: "To agreed point", availability: "By confirmation", heading: "When a private transfer to Haifa is a better fit", paragraphs: [
        ...commonTransfer, "It can be useful for Mount Carmel accommodation, larger parties or a cruise departure. If travelling to a port, give the ship name, terminal, check-in deadline and required drop-off. Flight-delay and road contingencies matter. The separate private transfer to Haifa page covers the dedicated service and quote request."
      ], inlineLinks: [{ text: "private transfer to Haifa page", to: "/travel-blog/ben-gurion-airport-to-haifa/" } ], checklist: ["Confirm luggage and vehicle size.", "If travelling to a ship, share boarding deadlines.", "Request the exact Haifa hotel or terminal entrance."] },
      { id: "bus", name: "Bus 905 (limited)", time: "About 110–125+ min when available", cost: "Current bus fare: check planner", bestFor: "Flexible arrivals within its window", doorToDoor: "No", availability: "Limited Saturday night / early Sunday; check actual departure", heading: "What about airport-to-Haifa bus 905?", paragraphs: [
        "The current Egged 905 listings show service from Ben Gurion Airport Terminal 3, Level 2, toward Haifa on a narrow Saturday-night and early-Sunday schedule. The route is not a normal daily alternative to the train, so verify a specific departure after clearing passport control and baggage.",
        "The listed route stops include MATAM, Haifa Hof HaCarmel and HaMifratz Central Station. Check which stop serves your hotel and whether you can complete the final journey after dark. For fares and ticket validation, see the getting around Israel guide."
      ], inlineLinks: [{ text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" } ], checklist: ["Confirm a real departure for your landing date.", "Check the exact Terminal 3 boarding stop and city destination.", "Plan a second option if the timing does not work."] },
      { id: "rental", name: "Rental car", time: "About 75–110+ min driving plus collection", cost: "Rental + insurance, tolls, fuel and parking", bestFor: "A northern Israel road trip", doorToDoor: "Yes, where permitted", availability: "Collection hours vary", heading: "Renting for Haifa and northern Israel", paragraphs: [
        ...commonRental, "A rental can be useful if Haifa is a base for Akko, Galilee or several rural stops, but less so for a brief city-only stay. Carmel slopes and some central streets complicate parking. Check the car rental page for vehicle choices and conditions."
      ], inlineLinks: [{ text: "car rental page", to: "/car-rental/" } ], checklist: ["Ask about parking at your Haifa hotel.", "Compare Highway 6 toll handling.", "Check desk hours if arriving on Shabbat."] },
    ],
    stations: [
      { name: "Haifa Hof HaCarmel", time: "≈ 80–85 min", usefulFor: "Southern Haifa, Carmel Beach and local bus connections." },
      { name: "Haifa Bat Galim", time: "≈ 85–90 min", usefulFor: "Bat Galim, Rambam Hospital and cable-car area." },
      { name: "Haifa Center HaShmona", time: "≈ 90–100 min", usefulFor: "Downtown, German Colony and Haifa Port vicinity." },
      { name: "Lev HaMifratz / HaMifratz Central", time: "Check actual service", usefulFor: "Haifa Bay hub, intercity buses and northern onward connections." },
    ],
    connections: [
      "German Colony and downtown: Center HaShmona is often a sensible place to start, but confirm how to reach your specific hotel.",
      "Carmel Centre and hilltop accommodation: plan a bus or taxi uphill. Straight-line distance from a coastal station is misleading.",
      "Cruise departure: verify the correct passenger-terminal entrance, boarding deadline and access rules rather than using 'Haifa Port' as the only destination."
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
      "For a wider northern trip, compare rail-plus-driver days with the full cost of a rental vehicle."
    ],
    faqs: [
      { q: "Is there a direct train from Ben Gurion Airport to Haifa?", a: "Direct trains are generally available during regular rail operation, but stops, frequency and service disruptions vary. Check Israel Railways for your destination station and travel date." },
      { q: "Which station is best for Haifa's German Colony?", a: "Haifa Center HaShmona often works well for downtown and the German Colony. Confirm your hotel's actual street and the remaining walk or taxi ride." },
      { q: "Can I use bus 905 on a weekday?", a: "Do not assume it runs through the day or every weekday. Its operation has been limited; use a dated public-transport planner and have a train/taxi alternative." },
      { q: "Are there airport sheruts to Haifa?", a: "No. The former Amal airport shared-taxi service has been discontinued. Historical listings and contact details are not a current transport option." },
      { q: "How should I plan an airport-to-cruise-port connection?", a: "Supply the exact Haifa passenger terminal, ship and check-in deadline. Leave a wide margin and confirm meeting/drop-off access and delay arrangements." },
      { q: "Which Haifa railway station should I use for a Mount Carmel hotel?", a: "The rail corridor is on the coast; most Mount Carmel hotels require an onward uphill bus or taxi. Compare the actual hotel address and a practical connection." },
      { q: "Is airport bus 905 available every day?", a: "No. The checked late-2026 timetable shows limited Saturday-night and early-Sunday service, not a regular daily route. Verify the actual departure before depending on it." },
      { q: "Can I get an Uber from Ben Gurion Airport to Haifa?", a: "No. Uber passenger rides are not available in Israel in 2026. Use an official airport taxi or a confirmed private transfer." },
      { q: "How do I travel from TLV to Haifa Port for a cruise?", a: "Confirm the ship, passenger-terminal entrance and boarding deadline. Consider the railway connection, final walk and baggage; for a timed arrival a direct confirmed vehicle may be easier." },
    ],
    related: [{ label: "Official Ben Gurion Airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" }, { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" }, { label: "Haifa shore excursions", to: "/haifa-shore-excursions/" }, { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" }]
  },
  "ein-bokek": {
    id: "ein-bokek", city: "Ein Bokek (Dead Sea)",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/",
    title: "How to Get from Ben Gurion Airport to Ein Bokek (2026): Bus, Taxi or Car?",
    description: "Ben Gurion Airport to Ein Bokek in 2026: train and bus via Jerusalem, Dead Sea hotel stops, taxi and private transfer options, last buses and Shabbat.",
    distance: "Approximately 155–165 km to the Ein Bokek hotel strip by road",
    intro: "There is no direct train or regular direct airport bus to Ein Bokek. Compare the train-to-Jerusalem and onward-bus route with an official airport taxi, a confirmed private transfer or a rental car — and check the stop serving your actual Dead Sea hotel.",
    answer: "For a daytime arrival with a usable connection, take the train from Ben Gurion Airport's Terminal 3 to Jerusalem–Yitzhak Navon (usually about 26–30 minutes), then change at Jerusalem Central Bus Station to an Egged bus serving Ein Bokek, such as 486 or 444 when operating. There is no rail station at the Dead Sea and the last southbound bus can be early. Check both legs, the current Jerusalem-line personal-voucher requirement, the exact hotel stop and any seat reservation before committing. For late arrivals, Shabbat or heavy luggage, compare the regulated airport taxi queue with a private transfer confirmed in advance.",
    trainIntro: "The railway station is beneath Terminal 3. Follow the train signs from arrivals, then travel to Jerusalem–Yitzhak Navon. The deep underground station is next to Jerusalem Central Bus Station, but reaching the street and intercity bus platforms still takes time. A railway ticket does not include the Dead Sea bus. An Israel Railways notice dated 19 August 2026 requires a free personal voucher for each passenger on the Jerusalem line in addition to the rail ticket; check whether it applies to your date. The airport arrival guide explains reaching the station after baggage collection. An occasional bus 421 via Tel Aviv–Savidor is a limited alternative, not the main airport-to-resort route; check a dated departure before considering it.",
    photo: airportTransferPhotos["dead-sea"]!,
    updatedAt: "2026-10-22",
    historicalPrices: false,
    photos: {
      station: { src: airportTerminalHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall before the Jerusalem train connection" },
      onward: { src: deadSeaLandscape, alt: "Desert hills and water in the Dead Sea region near Ein Bokek" },
    },
    stationLinks: [
      { text: "airport arrival guide", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
    ],
    weekendLinks: [
      { text: "airport Shabbat transport guide", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
      { text: "taxis in Israel guide", to: "/travel-blog/taxis-in-israel/" },
    ],
    sources: [
      { title: "Israel Railways — train times, fares and service notices", url: "https://www.rail.co.il/" },
      { title: "Israel Railways — free Jerusalem-line travel voucher notice (19 August 2026)", url: "https://rail.co.il/?lan=en&page=vouchers-jerusalem" },
      { title: "Tamar Regional Council — Dead Sea public transport lines 444, 486 and 421", url: "https://www.deadsea.co.il/on-the-map/?lang=en" },
      { title: "National Public Transport Journey Planner — current route and hotel-stop times", url: "https://bus.gov.il/" },
      { title: "Israel Airports Authority — Terminal 3 rail and ground transport", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
      { title: "Gett — official airport taxi ride-code and queue instructions", url: "https://www.gett.com/il/airport-en/" },
    ],
    privatePath: "/travel-blog/ben-gurion-airport-to-ein-bokek/",
    privateLabel: "Request a private Ein Bokek transfer",
    options: [
      { id: "rail", name: "Train + bus via Jerusalem", time: "Roughly 3–4+ hours with connections", cost: "Check current train + bus fares per person", bestFor: "Daytime arrivals, light luggage", doorToDoor: "No", availability: "Requires a usable onward bus", heading: "Step by step: train from TLV and bus from Jerusalem to Ein Bokek", paragraphs: [
        "From Terminal 3, take the train to Jerusalem–Yitzhak Navon. Allow roughly 26–30 minutes on the train when scheduled, plus time to reach street level from the deep station, locate Jerusalem Central Bus Station and find the correct intercity platform. Check the getting around Israel guide for ticket and public-transport payment basics.",
        "The Tamar Regional Council lists Egged buses 486 and 444 from Jerusalem for the Dead Sea area. Their actual schedules, intermediate stops, operator rules and any advance seat booking vary: a line number on a map is not a confirmed departure. Consult the current national journey planner and Egged before buying tickets, and leave a realistic transfer margin.",
        "Select the stop for your named Ein Bokek hotel, not simply the first stop marked Dead Sea. Masada, Ein Gedi and Neve Zohar have different stops and are not interchangeable with the Ein Bokek hotel strip. The Jerusalem to the Dead Sea guide explains the onward intercity journey in greater detail.",
        "Work backward from the last usable southbound bus, especially on Fridays and holidays. A late flight, passport queue or delayed train can make the public-transport route unworkable even when trains are still running."
      ], inlineLinks: [
        { text: "getting around Israel guide", to: "/travel-blog/getting-around-israel/" },
        { text: "Jerusalem to the Dead Sea guide", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      ], checklist: ["Check both train and bus on your exact date, including any required free rail voucher.", "Verify the 486 or 444 stop list, seat-booking rules and last bus to your hotel.", "Allow for airport formalities and changing stations in Jerusalem."] },
      { id: "taxi", name: "Official airport taxi", time: "About 1h 45m–2h 30m+ after pickup", cost: "Regulated meter; check current tariff", bestFor: "On-arrival direct ride to a resort", doorToDoor: "To accessible hotel entrance", availability: "Subject to available licensed taxis", heading: "Using an official metered airport taxi to Ein Bokek", paragraphs: [
        ...commonTaxi,
        "A metered taxi is not the same as a vehicle booked beforehand for a fixed quote. The total on this longer journey depends on the regulated tariff, time, distance and permitted extras. The official airport taxi guide explains how to obtain the ride code and find the authorized queue; my taxi fares in Israel guide covers current meter rules rather than an unverified route-specific price.",
        "Give the driver the full hotel name and address, and distinguish Ein Bokek from Ein Gedi or Neve Zohar. Confirm enough luggage capacity, a suitable payment method and the intended route before setting off."
      ], inlineLinks: [
        { text: "official airport taxi guide", to: "/travel-blog/ben-gurion-airport-taxis/" },
        { text: "taxi fares in Israel guide", to: "/travel-blog/taxi-fares-in-israel/" },
      ], checklist: ["Order through the official airport process, keeping the ride code and receipt.", "Check your hotel's actual entrance and suitcase capacity.", "Budget for a long metered journey without assuming a fixed fare."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 1h 45m–2h 30m+ after pickup", cost: "Published weekday vehicle starting rate; written quote", bestFor: "Families, several bags, late arrival", doorToDoor: "To agreed hotel entrance", availability: "Only after confirmation", heading: "When to arrange a private airport transfer to Ein Bokek", paragraphs: [
        ...commonTransfer,
        "For a long resort journey, a confirmed vehicle and written total can make planning easier for families, late arrivals or larger parties. Provide the hotel, flight details and full luggage list. The separate private transfer to Ein Bokek page shows the weekday per-vehicle starting rate and the request form; the form submission is not a booking.",
        "If you also want to visit Masada, Ein Gedi or a second hotel, request a separate itinerary and price. A direct transfer quote does not automatically include sightseeing stops, waiting time or the return to the airport."
      ], inlineLinks: [
        { text: "private transfer to Ein Bokek page", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
      ], checklist: ["Share the exact Dead Sea hotel, landing time, passenger count and luggage.", "Ask about child seats, waiting, flight delays, night/weekend charges and cancellation.", "Confirm any sightseeing stop or return transfer separately in writing."] },
      { id: "rental", name: "Rental car", time: "About 1h 45m–2h 30m+ driving plus collection", cost: "Rental, insurance, fuel and parking", bestFor: "Independent Masada/Dead Sea touring", doorToDoor: "To accessible parking area", availability: "Check desk hours and road access", heading: "Driving yourself from Ben Gurion Airport to the Dead Sea", paragraphs: [
        ...commonRental,
        "A rental car can make sense when Ein Bokek is one stop in a wider itinerary that includes Masada or Ein Gedi. Compare the total rental cost and available vehicle with my car rental in Israel page before committing to several days of parking at one resort.",
        "Check current travel and road alerts, especially after rain in the desert. Route 90 and access roads can be affected by flash-flood warnings or closures. Confirm hotel parking, the pickup desk's operating hours and driving arrangements for the actual arrival date."
      ], inlineLinks: [
        { text: "car rental in Israel page", to: "/car-rental/" },
      ], checklist: ["Check route and flood-related closures before starting the drive.", "Confirm hotel parking, rental coverage and pickup hours.", "Avoid assuming a self-drive detour is included in a simple airport transfer comparison."] },
    ],
    stations: [
      { name: "Ben Gurion Airport (Terminal 3)", time: "Train typically about 26–30 min to Jerusalem", usefulFor: "Start of the lower-cost journey; check the free personal voucher requirement." },
      { name: "Jerusalem–Yitzhak Navon", time: "Allow extra time for deep station exit", usefulFor: "Walk to Jerusalem Central Bus Station for the onward intercity bus." },
      { name: "Egged line 486", time: "Dead Sea segment around 1h 45m–2h+ when scheduled", usefulFor: "Confirm the southbound departure and your precise Ein Bokek hotel stop." },
      { name: "Egged line 444", time: "Journey time and stops depend on schedule", usefulFor: "Possible alternative Jerusalem departure; verify stop and any seat requirement." },
    ],
    connections: [
      "Ein Bokek is a hotel strip, not a single rail or bus terminal. Choose the stop closest to your specific property and check the walk with luggage in desert heat.",
      "The bus stop called Ein Bokek may not be the closest stop to your hotel. Neve Zohar, Masada and Ein Gedi are separate destinations; do not use an estimate for one as though it covers another.",
      "If your flight lands in the afternoon or evening, calculate passport control, baggage, train waiting, the Navon exit and the last southbound bus. Arrange a practical fallback before leaving the airport.",
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
    ],
    faqs: [
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
      { label: "Airport taxis and pickup instructions", to: "/travel-blog/ben-gurion-airport-taxis/" },
    ]
  }
};

export const airportJourneyGuides = byId;
export const airportJourneyIds: AirportJourneyId[] = ["jerusalem", "tel-aviv", "haifa", "ein-bokek"];
