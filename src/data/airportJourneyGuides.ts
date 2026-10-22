import type { LinkProps } from "@tanstack/react-router";
import { airportTransferPhotos } from "@/data/airportTransfers";
import type { StayGuidePhoto } from "@/data/content";
import telAvivOldJaffa from "@/assets/tel-aviv/jaffa.webp";
import airportTerminalHall from "@/assets/home/ben-gurion-t3.webp";

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
  photos?: { station: StayGuidePhoto; onward: StayGuidePhoto };
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
  "A quote request to Moshe Barak is not itself a reservation. Send the message and wait for his confirmation of availability and the final price; larger groups, child seats, heavy luggage, holidays and night arrivals may need a different vehicle or price.",
];
const commonRental = [
  "A rental car helps if you will continue to several out-of-town destinations. Compare the full rental price, insurance excess, credit-card deposit, fuel, parking, toll handling and pick-up desk hours.",
  "For a city-only break, parking and urban traffic can erase the benefit of collecting a car after a flight. Check whether your hotel has a place to park and whether the rental company's service is available when you land.",
];
const byId: Record<AirportJourneyId, AirportJourneyGuide> = {
  jerusalem: {
    id: "jerusalem", city: "Jerusalem",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/",
    title: "How to get from Ben Gurion Airport to Jerusalem: train, bus or taxi?",
    description: "Compare Ben Gurion Airport to Jerusalem by train, bus, taxi and private transfer. See indicative fares, journey times, Shabbat tips and hotel connections.",
    distance: "Approximately 45–55 km by road, depending on your address",
    intro: "Choose the best journey to your actual Jerusalem hotel, not just to a station. This independent transport comparison covers the fast direct train, airport taxis, private transfers, limited bus options and car rental.",
    answer: "For many weekday arrivals, a direct train to Jerusalem–Yitzhak Navon is the least expensive and fastest station-to-station option. You still need to reach your accommodation from the station. If you arrive on Shabbat, have several large bags or need an Old City drop-off, compare an authorized metered airport taxi with a private pickup arranged in advance.",
    trainIntro: "The airport rail station is below Terminal 3. Follow the train signs from arrivals. Terminal 1 passengers must first use the airport's internal shuttle to Terminal 3. Check the actual platform, fare and departure for your arrival date with Israel Railways.",
    photo: airportTransferPhotos["jerusalem"]!,
    privatePath: "/travel-blog/ben-gurion-airport-to-jerusalem/",
    privateLabel: "Request a private Jerusalem transfer",
    options: [
      { id: "rail", name: "Direct train", time: "About 26–30 min to Navon station", cost: "≈ ₪20–30 per person*", bestFor: "Solo/couples, light luggage", doorToDoor: "No", availability: "Not during the main Shabbat break", heading: "Taking the direct train to Jerusalem–Yitzhak Navon", paragraphs: [
        "The rail journey is generally faster than driving in highway traffic. Jerusalem–Yitzhak Navon station sits next to the central bus station and near Jaffa Road light rail, not in the Old City or outside every hotel.",
        "The platforms are deep underground. Include the escalators, ticketing, navigating to street level and the final bus, light-rail trip, taxi or walk in your door-to-door estimate. A short train time is not your hotel-arrival time."
      ], checklist: ["Choose a hotel-to-station connection before landing.", "Check trains for Friday, Saturday evening and holidays.", "Allow additional time for the deep underground station."] },
      { id: "taxi", name: "Official airport taxi", time: "About 45–60+ min after pickup", cost: "Meter; ≈ ₪300–360+*", bestFor: "Immediate ride to the address", doorToDoor: "Yes", availability: "Usually around the clock", heading: "Using the authorized metered taxi to Jerusalem", paragraphs: [
        ...commonTaxi, "For a Jerusalem hotel, confirm the right door or nearest vehicle-accessible Old City gate. Some historic streets cannot be reached by car, and a final walk with luggage may remain."
      ], checklist: ["Order with Gett or use the airport kiosk, then follow the queue instructions.", "Confirm payment and the regulated meter.", "For Old City lodging, save the recommended drop-off point."] },
      { id: "private", name: "Private transfer arranged ahead", time: "About 45–60+ min after pickup", cost: "Written quote; published weekday starting rate on booking page", bestFor: "Family, groups and special pickup needs", doorToDoor: "To agreed vehicle-accessible point", availability: "By confirmation", heading: "When is a pre-booked private pickup worthwhile?", paragraphs: [
        ...commonTransfer, "It can be especially helpful when you are arriving with children, multiple suitcases or a late-night hotel check-in. Confirm an Old City meeting/drop-off point rather than assuming the vehicle can enter every historic lane."
      ], checklist: ["Request the vehicle size and child seats that you actually need.", "Share the hotel entrance and flight number.", "Check waiting time and flight-delay terms in writing."] },
      { id: "bus", name: "Limited airport bus", time: "Around 55–60+ min when a direct service exists", cost: "Low public-bus fare; verify*", bestFor: "Flexible traveler with a suitable departure", doorToDoor: "No", availability: "Route 485 has been highly restricted; check live", heading: "Is there a direct bus from the airport to Jerusalem?", paragraphs: [
        "Line 485 has appeared in airport guides, but its timetable was already extremely limited in 2026. Do not build your arrival around a supposed hourly or reliable direct connection without finding a real departure for your date.",
        "If a relevant airport bus is running, verify the departure terminal, final stop and any onward local trip. A bus to the central station is not a door-to-door transfer to a hotel."
      ], checklist: ["Confirm line 485's actual operation with the national journey planner.", "Check the terminal and boarding area.", "Have rail or a confirmed ride as your fallback."] },
      { id: "rental", name: "Rental car", time: "About 45–60+ min driving, plus collection", cost: "Rental + insurance, fuel and parking", bestFor: "Onward multi-city road trip", doorToDoor: "Yes, where driving is allowed", availability: "Depends on collection hours", heading: "Does renting at TLV make sense for Jerusalem?", paragraphs: [
        ...commonRental, "Jerusalem's Old City, pedestrian areas and central parking restrictions can make a car inconvenient during a city-focused stay."
      ], checklist: ["Check permitted parking at your accommodation.", "Compare city collection after a few days instead of airport collection.", "Verify rental operating hours for your arrival day."] },
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
      "Do not rely on the former Nesher shared airport taxi to Jerusalem; its old airport service is reported discontinued. Local weekend services in other cities should not be mistaken for a direct airport–Jerusalem ride."
    ],
    advice: [
      "Compare the total from landing to hotel: immigration and baggage, getting to the station, the train and the final leg.",
      "Save the hotel address in English and Hebrew if possible, plus the vehicle entrance or nearest Old City gate.",
      "For four travelers with large cases, request the precise luggage capacity rather than assuming a four-seat sedan fits everything.",
      "Consider a private pickup when a fixed quote or an agreed larger vehicle matters more than the lowest individual fare.",
    ],
    faqs: [
      { q: "What is the cheapest way to Jerusalem from Ben Gurion Airport?", a: "For many arrivals outside Shabbat, the direct train is usually the lowest-cost practical choice. Add local transport from Yitzhak Navon to your hotel and check today's fare." },
      { q: "Can I reach the Old City directly by train?", a: "No. The airport train arrives at Yitzhak Navon near Jerusalem Central Bus Station; continue by light rail, taxi or on foot as appropriate. Some Old City addresses require walking from a permitted vehicle drop-off." },
      { q: "Do trains run from TLV to Jerusalem on Saturday?", a: "Not during the main Shabbat shutdown. Check the specific Saturday evening and holiday timetable rather than assuming a particular restart time." },
      { q: "Is the old Nesher airport sherut still running?", a: "The former Nesher shared-taxi airport route is reported discontinued. Do not plan a journey from old forum posts or phone numbers without a current operating provider." },
      { q: "Taxi or private transfer to a Jerusalem hotel?", a: "The official airport taxi offers a metered on-demand ride. A private transfer requires advance confirmation of a suitable vehicle, meeting point and total quote. Compare the full terms, not only an indicative price." }
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
        "For the beach, Jaffa, Neve Tzedek or most western hotels, you will normally need to walk further or take a bus, taxi or light-rail connection. A station with 'Tel Aviv' in its name is not automatically the closest to your hotel. To plan the final leg, consult our getting around Tel Aviv guide."
      ], inlineLinks: [{ text: "getting around Tel Aviv guide", to: "/travel-blog/getting-around-tel-aviv/" }], checklist: ["Use the full hotel address when choosing the station.", "Check the last train and late-night stopping pattern.", "Include the onward fare and bags in the total comparison."] },
      { id: "bus", name: "Bus 445", time: "About 40–70+ min, depending on stop", cost: "Current bus fare: check planner", bestFor: "Addresses near its city stops", doorToDoor: "No", availability: "Timetable dependent; Shabbat restrictions", heading: "Bus 445: useful for some central Tel Aviv hotels", paragraphs: [
        "The Israel Airports Authority lists Kavim route 445 to Tel Aviv from Terminal 3, Level 2, Exit 21. Check the operator’s dated timetable, boarding stop, direction and stops close to your hotel; do not rely on old lists of city streets or assume that every departure follows the same route.",
        "A bus may reduce your final walk if your hotel is close to a stop, but travel time is more traffic-sensitive than rail and luggage must be carried on and off the service. Do not assume a particular frequency or late-night departure. For ticketing and validation basics, see our getting around Israel guide."
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
    title: "How to get from Ben Gurion Airport to Haifa: train, bus or taxi?",
    description: "Compare TLV airport to Haifa trains, limited bus 905, taxi and private transfer. See indicative fares, best Haifa stations, Shabbat and hotel access.",
    distance: "Approximately 100–110 km to central Haifa",
    intro: "Haifa stretches from the coastline to Mount Carmel. Choosing a station or road drop-off for your exact neighbourhood matters as much as choosing between rail, taxi and a private transfer.",
    answer: "When the service is running, direct trains toward Haifa are normally the lowest-cost practical choice. Choose Hof HaCarmel, Bat Galim, Center HaShmona or HaMifrats for the right final connection. For night, Shabbat or a hilltop hotel with heavy luggage, compare an authorized metered taxi or a pre-booked driver.",
    trainIntro: "The airport railway station is below Terminal 3; Terminal 1 arrivals connect by internal shuttle. Many services run directly north to Haifa, but stops vary by train. Check the current timetable, station and whether a change is needed.",
    photo: airportTransferPhotos["haifa"]!,
    privatePath: "/travel-blog/ben-gurion-airport-to-haifa/",
    privateLabel: "Request a private Haifa transfer",
    options: [
      { id: "rail", name: "Train to Haifa", time: "About 80–110 min to a station", cost: "≈ ₪30–45 per person*", bestFor: "Budget-minded intercity travel", doorToDoor: "No", availability: "Varies; not during the main Shabbat break", heading: "Direct rail to Haifa: which station should you choose?", paragraphs: [
        "Depending on the service, the journey may take about 80 minutes to Hof HaCarmel or roughly 90–100 minutes to Center HaShmona. Trains do not always serve the same stops.",
        "Haifa's hills change the last leg. A station along the coast is not necessarily a comfortable walk to a Mount Carmel hotel, even if it looks close on a flat map. Allow for a bus, taxi or other local transport."
      ], checklist: ["Check whether the chosen train actually calls at your station.", "Measure the uphill journey to the hotel.", "Look up late-night and Saturday-evening trains separately."] },
      { id: "taxi", name: "Official airport taxi", time: "About 75–110+ min after pickup", cost: "Meter; ≈ ₪500–600+*", bestFor: "On-demand arrival at a hotel", doorToDoor: "Yes, where accessible", availability: "Usually around the clock", heading: "Licensed airport taxi to Haifa", paragraphs: [
        ...commonTaxi, "The final distance depends strongly on whether the destination is in the German Colony, Carmel Centre, Bat Galim, a beach hotel or the passenger port. Confirm the exact street or port terminal."
      ], checklist: ["Use Gett or the authorized kiosk and queue.", "Specify the destination neighbourhood and building.", "Allow extra margin for a cruise connection."] },
      { id: "private", name: "Pre-booked private transfer", time: "About 75–110+ min after pickup", cost: "Written quote; starting rate on booking page", bestFor: "Large parties, bags, timed connections", doorToDoor: "To agreed point", availability: "By confirmation", heading: "When a private transfer to Haifa is a better fit", paragraphs: [
        ...commonTransfer, "It can be useful for Mount Carmel accommodation, larger parties or a cruise departure. If travelling to a port, give the ship name, terminal, check-in deadline and required drop-off. Flight-delay and road contingencies matter."
      ], checklist: ["Confirm luggage and vehicle size.", "If travelling to a ship, share boarding deadlines.", "Request the exact Haifa hotel or terminal entrance."] },
      { id: "bus", name: "Bus 905 (limited)", time: "About 110–125+ min when available", cost: "≈ ₪20–30 per person*", bestFor: "Flexible arrivals within its window", doorToDoor: "No", availability: "Very restricted weekend/night window; verify", heading: "What about airport-to-Haifa bus 905?", paragraphs: [
        "Bus 905 appears in route listings for airport–Haifa, but it is not a full-day bus alternative to the train. Historical descriptions of a narrow Saturday-night/early-Sunday operating window need date-specific confirmation in the public journey planner.",
        "Verify the stop served by your particular bus and whether it matches your hotel. If it ends at HaMifrats or another major station you may still need a local connection."
      ], checklist: ["Confirm a real departure for your landing date.", "Check the exact Terminal 3 boarding stop and city destination.", "Plan a second option if the timing does not work."] },
      { id: "rental", name: "Rental car", time: "About 75–110+ min driving plus collection", cost: "Rental + insurance, tolls, fuel and parking", bestFor: "A northern Israel road trip", doorToDoor: "Yes, where permitted", availability: "Collection hours vary", heading: "Renting for Haifa and northern Israel", paragraphs: [
        ...commonRental, "A rental can be useful if Haifa is a base for Akko, Galilee or several rural stops, but less so for a brief city-only stay. Carmel slopes and some central streets complicate parking."
      ], checklist: ["Ask about parking at your Haifa hotel.", "Compare Highway 6 toll handling.", "Check desk hours if arriving on Shabbat."] },
    ],
    stations: [
      { name: "Haifa Hof HaCarmel", time: "≈ 80–85 min", usefulFor: "Southern Haifa, Carmel Beach and local bus connections." },
      { name: "Haifa Bat Galim", time: "≈ 85–90 min", usefulFor: "Bat Galim, Rambam Hospital and cable-car area." },
      { name: "Haifa Center HaShmona", time: "≈ 90–100 min", usefulFor: "Downtown, German Colony and Haifa Port vicinity." },
      { name: "HaMifrats Central", time: "≈ 100–110 min", usefulFor: "Eastern/northern connections and regional buses." },
    ],
    connections: [
      "German Colony and downtown: Center HaShmona is often a sensible place to start, but confirm how to reach your specific hotel.",
      "Carmel Centre and hilltop accommodation: plan a bus or taxi uphill. Straight-line distance from a coastal station is misleading.",
      "Cruise departure: verify the correct passenger-terminal entrance, boarding deadline and access rules rather than using 'Haifa Port' as the only destination."
    ],
    weekend: [
      "Rail service normally pauses during the main Shabbat period and most Jewish holidays. Bus 905 has historically had a limited weekend-night service but must be checked for your exact day.",
      "If no operating rail/bus connection suits the flight, compare the official airport taxi queue with an advance private transfer. Price, vehicle size and meeting instructions differ.",
      "The former Amal airport sherut to Haifa is reported discontinued. Do not rely on older travel articles listing it as an operating shared minibus."
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
      { q: "Are there airport sheruts to Haifa?", a: "The former Amal shared airport taxi service is reported discontinued. A historical phone number or forum recommendation is not proof of an active service." },
      { q: "How should I plan an airport-to-cruise-port connection?", a: "Supply the exact Haifa passenger terminal, ship and check-in deadline. Leave a wide margin and confirm meeting/drop-off access and delay arrangements." }
    ],
    related: [{ label: "Official Ben Gurion Airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" }, { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" }, { label: "Haifa shore excursions", to: "/haifa-shore-excursions/" }, { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" }]
  },
  "ein-bokek": {
    id: "ein-bokek", city: "Ein Bokek (Dead Sea)",
    path: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/",
    title: "How to get from Ben Gurion Airport to Ein Bokek: bus, taxi or car?",
    description: "Compare TLV Airport to Ein Bokek via Jerusalem train and buses 486/444, taxi, private ride or rental. See indicative fares, connections and Shabbat tips.",
    distance: "Approximately 155–165 km by road to the Ein Bokek hotel area",
    intro: "Reaching the Dead Sea is a different journey from reaching a city railway station. There is no railway station at Ein Bokek; public transport generally requires a connection, while road transport runs to the hotel area.",
    answer: "For light luggage and a well-timed daytime arrival, taking the airport train to Jerusalem–Yitzhak Navon and changing to a verified bus toward Ein Bokek can be the cheapest route. The connection is not guaranteed and the last bus matters. Late-night, Shabbat, family and group arrivals often make direct transport more practical.",
    trainIntro: "Start with the airport train from beneath Terminal 3 to Jerusalem–Yitzhak Navon, then reach the adjacent central bus station above ground. There is no through airport train to the Dead Sea, and a ticket to Jerusalem does not cover the entire journey.",
    photo: airportTransferPhotos["dead-sea"]!,
    privatePath: "/travel-blog/ben-gurion-airport-to-ein-bokek/",
    privateLabel: "Request a private Ein Bokek transfer",
    options: [
      { id: "rail", name: "Train + bus via Jerusalem", time: "About 3–4+ hours with transfers", cost: "≈ ₪35–50 per person total*", bestFor: "Daytime, light luggage, flexible plans", doorToDoor: "No", availability: "Bus and rail both required; limited late service", heading: "Step by step: airport train and bus via Jerusalem", paragraphs: [
        "Take the train to Jerusalem–Yitzhak Navon, exit the deep station and walk into Jerusalem Central Bus Station. Allow time to locate the correct bus platform rather than planning a tight same-minute transfer.",
        "Egged route 486 has served Ein Bokek and Neve Zohar; route 444 is a reserved-seat intercity alternative that may call at southern Dead Sea stops. Confirm the current route, specific hotel stop, seat-booking requirements and last departure. Bus services are far less frequent than the airport train.",
        "There is no protection for a missed bus if your plane or train is late. Save a fallback before beginning the trip, particularly if the connection is at the end of the operating day."
      ], checklist: ["Check the train and Dead Sea bus schedules for the same date.", "Reserve a seat on line 444 if required by Egged.", "Identify your hotel's closest bus stop and last usable connection."] },
      { id: "taxi", name: "Official airport taxi", time: "About 1h 45m–2h 30m+ after pickup", cost: "Meter; ≈ ₪800–1,100*", bestFor: "Direct on-arrival hotel ride", doorToDoor: "To accessible entrance", availability: "Usually around the clock", heading: "Taking a metered airport taxi to the Dead Sea", paragraphs: [
        ...commonTaxi, "Because this is a relatively long journey, the metered total can vary substantially. Confirm that the driver understands whether your hotel is in Ein Bokek, Neve Zohar or another Dead Sea area, and check the approved fare basis."
      ], checklist: ["Give the full resort and hotel name.", "Confirm vehicle capacity for the long ride.", "Keep an additional budget margin beyond the indicative taxi range."] },
      { id: "private", name: "Private vehicle booked ahead", time: "About 1h 45m–2h 30m+ after pickup", cost: "Written quote; weekday starting rate on booking page", bestFor: "Late arrivals, resort holidays, groups", doorToDoor: "To agreed hotel entrance", availability: "By confirmation", heading: "Pre-booking a private vehicle to Ein Bokek", paragraphs: [
        ...commonTransfer, "An airport-to-resort transfer is particularly useful for parties carrying large suitcases, families arriving late, and travelers who prefer to agree the long-distance price in advance. Make sure any stop at Masada, Ein Gedi or another resort is separately included if requested."
      ], checklist: ["Specify Ein Bokek rather than only 'Dead Sea'.", "Ask about hotel arrival and any rest stop.", "Request a separate quote for a return flight or Masada detour."] },
      { id: "rental", name: "Rental car", time: "About 1h 45m–2h 30m+ driving plus pickup", cost: "Rental + insurance, fuel and parking", bestFor: "Masada, Ein Gedi and multiple stops", doorToDoor: "Yes, to accessible hotels", availability: "Depends on airport rental hours", heading: "Renting to explore the Dead Sea region", paragraphs: [
        ...commonRental, "A car is useful if the trip includes Masada, Ein Gedi or other destinations around Route 90. Verify current road and site access. If your entire holiday is inside one resort, renting for every day may be less attractive."
      ], checklist: ["Verify road and weather alerts on your travel date.", "Check collection hours and hotel parking.", "Budget for extra stops and fuel."] },
      { id: "alternative", name: "Train + bus via Tel Aviv", time: "Highly dependent on the connection", cost: "Public transport fares; check live", bestFor: "Only a departure matching your arrival", doorToDoor: "No", availability: "Limited; route 421 must be verified", heading: "Is there another route via Tel Aviv?", paragraphs: [
        "An alternative sometimes listed is a train to Tel Aviv–Savidor followed by reserved-seat bus 421 toward Dead Sea stops. This is only practical if a real bus departure matches your flight, so verify the line and reservation terms first.",
        "Do not choose a route simply because it appears on an old map; compare the actual dated connections through Jerusalem and Tel Aviv, including the final hotel stop."
      ], checklist: ["Check that 421 currently operates on your date.", "Verify Savidor transfer time and seat reservations.", "Do not rely on this as a guaranteed alternative to the Jerusalem route."] },
    ],
    stations: [
      { name: "Jerusalem–Yitzhak Navon", time: "≈ 26–30 min from TLV", usefulFor: "Change from the airport train to buses at Jerusalem Central Bus Station." },
      { name: "Egged 486", time: "≈ 1h 45m–2h 15m from Jerusalem*", usefulFor: "Potential service to Ein Bokek / Neve Zohar: verify stop and timetable." },
      { name: "Egged 444", time: "Varies by dated service", usefulFor: "Reserved-seat intercity alternative; check hotel stop and reservation." },
      { name: "Egged 421 via Tel Aviv", time: "Dependent on connection", usefulFor: "Limited alternative via Savidor; only if a confirmed departure fits." },
    ],
    connections: [
      "For Ein Bokek hotels, pick the stop nearest your exact resort rather than treating all Dead Sea hotels as interchangeable.",
      "Neve Zohar, Ein Gedi and Masada are different destinations. One airport quote, bus ticket or transfer stop does not automatically cover them all.",
      "On an evening arrival, check whether there is enough time after immigration, the airport train and Jerusalem station transfer to reach the last appropriate bus."
    ],
    weekend: [
      "A public transport trip that needs both rail and an intercity bus normally will not work during the main Shabbat closure. Bus 444, 486 and 421 timetables and holiday arrangements must all be checked individually.",
      "For a Saturday or late-night arrival without a workable bus, compare the official taxi queue with a private transfer arranged in advance. Do not assume every standard taxi has enough space for your party.",
      "If renting a car, verify that the airport collection desk will be open and that the intended desert roads are accessible."
    ],
    advice: [
      "Calculate the connection realistically: airport formalities, train ride, the deep Navon station, platform search and the final bus.",
      "Before paying for bus seats, verify every passenger's travel date and the stop nearest the hotel.",
      "If the last bus is missed, the potential cost of a long metered taxi can outweigh the intended public-transport saving.",
      "Ask for a complete private quote if you need an additional stop, late hotel arrival or a confirmed return airport journey."
    ],
    faqs: [
      { q: "Is there a direct train from Ben Gurion Airport to Ein Bokek?", a: "No. There is no railway station in the Dead Sea resort area. A typical public-transport plan changes from the airport train to a bus in Jerusalem." },
      { q: "Which bus serves Ein Bokek from Jerusalem?", a: "Routes 486 and reserved-seat 444 have served the southern Dead Sea area. Check their dated schedules, stop lists, fare and any seat reservation requirement directly with Egged." },
      { q: "Can I reach Ein Bokek by public transport after a late flight?", a: "Not reliably without checking the last bus. The airport train is only the first leg; public bus frequencies are lower, and there is no guarantee of making a connection." },
      { q: "Is Ein Gedi the same drop-off as Ein Bokek?", a: "No. They are geographically separate. Tell the operator or route planner the exact hotel or stop you need." },
      { q: "Is a private transfer better for a Dead Sea family trip?", a: "It may be when you have children, large luggage, a late arrival or a hotel meal/check-in deadline. Compare its written vehicle quote with the total cost and waiting time of the available public transport." }
    ],
    related: [{ label: "Official Ben Gurion Airport taxi booking and pickup", to: "/travel-blog/ben-gurion-airport-taxis/" }, { label: "Compare Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" }, { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/" }, { label: "Masada trip planning", to: "/travel-blog/masada/" }]
  },
};

export const airportJourneyGuides = byId;
export const airportJourneyIds: AirportJourneyId[] = ["jerusalem", "tel-aviv", "haifa", "ein-bokek"];
