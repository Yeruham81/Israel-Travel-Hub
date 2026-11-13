import { itineraries, itineraryIds } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import type { LinkProps } from "@tanstack/react-router";
import { getShorePort } from "@/data/shoreExcursions";
import { travelGuidePaths, type TravelGuideId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import railPlatform from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import navonPlatform from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import archivedBuses from "@/assets/travel-blog/2026-11/buses-in-tel-aviv.webp";
import sherutNesherCardPhoto from "@/assets/travel-blog/sherut-nesher-airport.webp";
import jerusalemLightRail from "@/assets/travel-blog/2026-11/jerusalem-light-rail.webp";
import esimPhoto from "@/assets/travel-blog/esim-israel.jpeg";
import tiberias from "@/assets/home/tiberias-lake.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import caesarea from "@/assets/home/caesarea-dusk.webp";
import { expandedTravelGuides } from "@/data/travelGuideExpansion";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { applyJerusalemGuideEditorial } from "@/data/jerusalemClusterEditorial";
import { sanityUberGuide } from "@/data/generated/sanityUberSnapshot";

export const guideTopics = [
  { id: "transportation", label: "Transportation" },
  { id: "destinations", label: "Destinations" },
  { id: "attractions", label: "Attractions" },
  { id: "itineraries", label: "Itineraries & day trips" },
  { id: "tips", label: "Tips & recommendations" },
  { id: "accommodation", label: "Accommodation" },
  { id: "connectivity", label: "Mobile & connectivity" },
  { id: "religion", label: "Religion & heritage" },
  { id: "shopping", label: "Shopping & markets" },
] as const;
export type GuideTopicId = typeof guideTopics[number]["id"];
export type GuidePhoto = { src: string; alt: string; sourceUrl?: string; credit?: string; licenseUrl?: string };
export type GuideTable = { caption: string; headers: string[]; rows: string[][]; note?: string; rowLinks?: ({ to: LinkProps["to"]; label?: string } | { href: string; label?: string } | null)[] };
export type GuideInlineSpan = { text: string; to?: LinkProps["to"]; href?: string; marks?: ("strong" | "em" | "underline" | "code")[] };
export type GuideSubsection = { id: string; title: string; paragraphs: string[]; richParagraphs?: GuideInlineSpan[][]; bullets?: string[]; steps?: string[]; sourceIds?: string[]; photo?: GuidePhoto; links?: { label: string; to: LinkProps["to"] }[]; inlineLinks?: { text: string; to: LinkProps["to"] }[]; externalLinks?: { label: string; href: string }[]; highlightedLinks?: { label: string; href: string; context: string }[]; tables?: GuideTable[]; tip?: string };
export type GuideSection = GuideSubsection & { subsections?: GuideSubsection[] };
export type GuideReading = { label: string; href: string; note: string };
export type TravelGuide = {
  id: TravelGuideId; title: string; description: string; intro: string; answer: string; updatedAt?: string;
  topics: GuideTopicId[]; photo: GuidePhoto; cardPhoto?: GuidePhoto; facts: { label: string; text: string; link?: { text: string; href: string } }[];
  comparison: { caption: string; headers: string[]; rows: string[][] };
  sections: GuideSection[]; checklist: string[]; faqs: { q: string; a: string }[];
  faqGroups?: { title: string; indexes: number[] }[];
  sourceIds: string[]; related: TravelGuideId[];
  services: { label: string; to: LinkProps["to"]; note?: string }[];
  reading?: GuideReading[]; reviewNote?: string; providerPageId?: string;
  nextSteps?: { label: string; to: LinkProps["to"] }[];
};

const hallPhoto: GuidePhoto = { src: airportHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };

export const travelGuides: Record<TravelGuideId, TravelGuide> = {
  ...expandedTravelGuides,
  ...planningGuides,
  ...cityCultureGuides,
  ...heritageGuides,
  ...journeyDestinationGuides,
  uber: {
    id: "uber",
    title: "Is Uber Available in Israel? Gett & Yango Taxi Alternatives",
    description: "Is Uber or Lyft available in Israel? Read the current status, the ride-sharing proposal, and practical Gett, Yango and licensed-taxi alternatives.",
    intro: "If you normally use Uber or Lyft while travelling, here is what works in Israel today, how local taxi apps differ, and what to check before arranging a ride.",
    answer: "No. Uber does not currently offer passenger rides in Israel, and Lyft does not list Israel among its rider cities. Uber's official Israel page confirms that its service is unavailable here. Gett and Yango can help you request licensed taxis, while a taxi stand, hotel dispatcher or confirmed transfer may work better for some journeys. Check the actual pickup, fare terms and payment method.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-11",
    photo: { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "Licensed taxis on a street in Tel Aviv" },
    facts: [
      { label: "Uber & Lyft", text: "No passenger ride-booking service in Israel as of November 2026" },
      { label: "Taxi-booking apps", text: "Gett and Yango; check availability for your address and time" },
      { label: "Airport arrival", text: "Official taxis ordered through Gett or an airport self-service kiosk" },
    ],
    nextSteps: [
      { label: "How taxis in Israel work", to: travelGuidePaths.taxis },
      { label: "Official taxi fares and tariff hours", to: travelGuidePaths.taxiFares },
      { label: "Ben Gurion Airport taxi pickup", to: travelGuidePaths.airportTaxis },
      { label: "Airport travel on Shabbat", to: travelGuidePaths.shabbat },
    ],
    comparison: {
      caption: "Alternatives to Uber: choosing a ride in Israel",
      headers: ["Option", "Best for", "Before booking, check"],
      rows: [
        ["Gett", "App-based licensed taxis and the official Ben Gurion Airport taxi-ordering system", "Driver acceptance, pickup pin, fare basis, available payment and any extras"],
        ["Yango", "App-based taxi requests where local drivers are available", "Coverage, accepted ride, whether displayed price is estimated or fixed, and cash/card options"],
        ["Licensed taxi or hotel dispatcher", "Taxi stands, street hails and hotel-booked pickups without an app", "Licensed vehicle, meter, exact address and payment method"],
        ["Confirmed private transfer", "Airport and longer journeys, groups or bulky luggage", "Written total, vehicle size, meeting point, waiting and cancellation terms"],
      ],
    },
    sections: [
      {
        id: "uber-status",
        title: "Does Uber work in Israel?",
        paragraphs: [
          "As of November 2026, Uber's Israel-facing website says passenger rides are unavailable here. An app download or local landing page is not evidence that you can book a driver. Lyft's official rider-city list likewise does not include Israel.",
          "On March 24, 2026, a proposal to allow paid app-based rides in private cars passed its first Knesset reading and was sent to the Economic Affairs Committee. A first reading is not a law in force or a launch announcement; do not assume Uber or Lyft will be operating for your trip.",
        ],
        sourceIds: ["guide-uber-availability","guide-lyft-cities","guide-ridesharing-bill-2026"],
      },
      {
        id: "gett",
        title: "How do I use Gett instead of Uber?",
        paragraphs: [
          "Gett lets you request a licensed taxi through its app in supported areas. Enter your exact pickup and destination, check the pickup pin and fare information, then wait for driver acceptance. The displayed estimate or booking details are not necessarily a fixed all-inclusive fare.",
          "Set up the app while you have mobile data, verify your phone number and check whether your card works. The authorized airport taxi system is different from a normal city pickup, as explained in my Ben Gurion Airport taxis guide.",
        ],
        inlineLinks: [{ text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis }],
        externalLinks: [
          { label: "Official Gett app and service information", href: "https://www.gett.com/il/" },
        ],
        highlightedLinks: [{ label: "Gett Israel — official app and booking information", href: "https://www.gett.com/il/", context: "Check the current service and app details before requesting a licensed taxi." }],
        sourceIds: ["guide-gett-app", "guide-gett"],
      },
      {
        id: "yango",
        title: "Can tourists use Yango to book a taxi in Israel?",
        paragraphs: [
          "Yango is another local app for requesting licensed taxis, operated in Israel through Appli Taxi. Its rider information lists cash and card payment. Driver availability depends on the address, time and current service area.",
          "Enter your destination, check the pickup and whether the displayed price is an estimate or a fixed offer, then verify the driver and vehicle after acceptance. Keep another taxi app or dispatcher as a backup for an important pickup.",
        ],
        externalLinks: [
          { label: "Official Yango Israel rider information", href: "https://appli.taxi/rider/" },
        ],
        highlightedLinks: [{ label: "Yango Israel — rider information", href: "https://appli.taxi/rider/", context: "Review the app, payment options and availability for your pickup area." }],
        sourceIds: ["guide-yango-israel", "guide-telaviv-apps"],
      },
      {
        id: "booking-without-app",
        title: "How can I get a taxi without Gett or Yango?",
        paragraphs: [
          "You can still take a licensed taxi without any app: hail one where permitted, use a taxi stand, call a local dispatcher or ask your hotel to arrange a pickup. Confirm the destination, meter and accepted payment before travelling.",
          "An ordinary taxi request does not guarantee a child seat, large vehicle or accessible equipment. Plan those needs ahead of time, especially in smaller towns or late at night. My complete guide to taxis in Israel covers fares, safety and passenger rights.",
        ],
        inlineLinks: [{ text: "complete guide to taxis in Israel", to: travelGuidePaths.taxis }],
        sourceIds: ["guide-telaviv-apps", "taxi-passenger-rights"],
      },
      {
        id: "prices-payments",
        title: "Do Gett and Yango rides have Uber-style prices and payment?",
        paragraphs: [
          "Licensed taxi fares in Israel are regulated, but the final amount varies with distance, driving time, tariff period and permitted extras. App screens may show estimates or a specific offer: check which applies rather than assuming a guaranteed fixed price. Apps are not automatically cheaper than street taxis.",
          "Gett's airport service lists cash, payment to the driver by card or in-app payment. Yango's Israeli rider page lists cash and card. Check the options for your exact booking and test any foreign-issued card. The Israeli taxi fares guide covers the detailed tariff periods and extra charges.",
        ],
        inlineLinks: [{ text: "Israeli taxi fares guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026", "guide-gett", "guide-yango-israel"],
      },
      {
        id: "airport",
        title: "Can I use Uber, Gett or Yango at Ben Gurion Airport?",
        photo: hallPhoto,
        paragraphs: [
          "Uber is not a passenger pickup option at Ben Gurion Airport. For an immediate official taxi, get a ride code from Gett or an airport self-service kiosk and join the authorized taxi queue. The Terminal 3 taxi line is on the ground floor at Exit 03, while Terminal 1 has a separate arrivals pickup. The kiosk does not require the Gett app.",
          "An advance Gett booking has different pickup instructions; a standard Yango city pin is not the official airport taxi process. Follow the current guidance in my official airport taxi guide, or arrange a confirmed private airport transfer for a dedicated pickup.",
        ],
        inlineLinks: [
          { text: "official airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/airport-transfers/" },
        ],
        sourceIds: ["guide-uber-availability", "guide-gett", "guide-iaa"],
      },
      {
        id: "locations",
        title: "Which taxi app should I use in Tel Aviv, Jerusalem or Haifa?",
        paragraphs: [
          "In Tel Aviv, Gett and Yango are options to check; use the correct entrance around beach promenades, Old Jaffa and pedestrian streets. In Jerusalem, pay attention to permitted vehicle access around the Old City. In Haifa, the street level of a hillside address can matter.",
          "Actual driver supply and waiting time need to be checked at your precise location. For longer or more remote journeys, my getting around Israel guide compares buses, rail, rental cars and other options.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        sourceIds: ["guide-telaviv-apps", "guide-gett-app", "guide-yango-israel"],
      },
      {
        id: "setup-backups",
        title: "What should visitors check before booking their first ride?",
        paragraphs: [
          "Before arrival, complete phone verification for your app, test mobile data and payment, and save your full pickup and destination addresses. An offline screenshot or an address in Hebrew can help if the pickup pin is unclear.",
          "After driver acceptance, verify the vehicle and license plate. Confirm child seats, wheelchair access, room for luggage or a large group ahead of time. My Israel eSIM guide explains mobile options; a confirmed private driver is a useful backup for time-critical journeys.",
        ],
        inlineLinks: [
          { text: "Israel eSIM guide", to: travelGuidePaths.esim },
          { text: "private driver", to: "/private-driver/" },
        ],
        sourceIds: ["guide-gett-app", "guide-yango-israel"],
      },
      {
        id: "shabbat",
        title: "Can I book a taxi app ride on Shabbat or late at night?",
        paragraphs: [
          "Licensed taxis may operate on Shabbat and Jewish holidays while much scheduled public transport is paused. Check Gett or Yango for your location, but app driver acceptance is not guaranteed. For a flight or another important ride, confirm a suitable vehicle in advance.",
          "Metered fares follow designated night, weekend and holiday tariffs. For journeys starting at Ben Gurion Airport on Shabbat, my airport Shabbat travel guide explains official taxis, private pickups and limited bus 711; there is no need to repeat that timetable here.",
        ],
        inlineLinks: [{ text: "airport Shabbat travel guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-iaa", "taxi-fares-2026", "guide-weekend-711"],
      },
    ],
    checklist: [
      "Do not rely on Uber or Lyft for passenger rides in Israel",
      "Set up and test Gett or Yango before your trip",
      "Confirm phone verification, mobile data and payment",
      "Save exact pickup and destination addresses",
      "Check whether the displayed fare is an estimate or a fixed offer",
      "Verify the driver and vehicle before boarding",
      "At Ben Gurion Airport, use the official Gett or kiosk taxi process",
      "Confirm special vehicle needs and important pickups in advance",
    ],
    faqs: [
      { q: "Does Lyft work in Israel?", a: "No. Lyft does not list Israel among its supported rider cities." },
      { q: "Does the ride-sharing bill mean Uber will launch soon?", a: "No date is confirmed. The proposal passed a first reading in March 2026; it was not final enactment or an Uber launch." },
      { q: "What is the best alternative to Uber in Israel?", a: "Gett and Yango can connect you with licensed taxis where drivers are available. Local dispatch, a taxi stand or a private transfer may suit some trips better." },
      { q: "Do I need Gett to get a taxi at Ben Gurion Airport?", a: "No. Official airport self-service kiosks also issue the ride code needed for the authorized queue." },
      { q: "Are app fares fixed and do foreign cards work?", a: "Not necessarily. Review whether a price is an estimate or fixed offer and check accepted payment for your actual booking." },
      { q: "Can I book an app taxi during Shabbat?", a: "Licensed taxis may operate, but driver availability is not guaranteed. Confirm time-sensitive pickups in advance." },
      { q: "Can I request a van or child seat in a taxi app?", a: "Do not assume a standard taxi booking includes special equipment or a large vehicle. Arrange and confirm those needs beforehand." },
    ],
    sourceIds: ["guide-uber-availability", "guide-lyft-cities", "guide-ridesharing-bill-2026", "guide-gett-app", "guide-yango-israel", "guide-telaviv-apps", "guide-gett", "guide-iaa", "taxi-fares-2026"],
    related: ["taxis", "taxiFares", "airportTaxis", "shabbat", "sherut", "israel"],
    services: [
      { label: "Choose an Israel eSIM", to: travelGuidePaths.esim, note: "Prepare mobile data for taxi apps and maps." },
      { label: "Explore car rental options", to: "/car-rental/", note: "Compare driving with taxis for longer or multi-stop days." },
      { label: "Plan a visit to Jerusalem", to: travelGuidePaths.jerusalem, note: "Explore the city's attractions and neighbourhoods." },
      { label: "Choose where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Find a convenient area for your first few days." },
    ],
  },
  sherut: {
    id: "sherut",
    title: "Is There Still a Sherut from Ben Gurion Airport? Current Options",
    description: "The former Nesher and Amal shared airport taxis to Jerusalem and Haifa no longer run as regular airport sherut routes. Learn the difference between sherut and shuttle and which alternatives to use.",
    intro: "Shared shuttle taxis once operated from Ben Gurion Airport to Jerusalem and Haifa, but those regular airport services have been discontinued. Read on to discover the transport alternatives available today, including trains, buses and taxis, and how local sherut services differ.",
    answer: "No. The former regular shared-taxi services from Ben Gurion Airport to Jerusalem (Nesher) and to Haifa and the north (Amal) no longer operate as the airport sheruts described in older travel guides. Do not plan around their old boarding points, prices or contact details. Local monit sherut routes elsewhere in Israel are separate services, and independently advertised shared shuttles must be checked individually. For your airport journey, compare current trains or buses, the authorized taxi system or a private transfer confirmed in advance.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-11",
    photo: airportTransferPhotos["other"]!,
    cardPhoto: { src: sherutNesherCardPhoto, alt: "Former Nesher yellow-and-white shared shuttle van at Ben Gurion Airport" },
    facts: [
      { label: "Former Nesher airport sherut", text: "No longer running as the regular shared airport ride to Jerusalem" },
      { label: "Former Amal airport sherut", text: "No longer running as the regular shared airport ride to Haifa and the north" },
      { label: "Plan a current connection", text: "Check rail or bus departures, authorized taxis, or a confirmed private pickup" },
    ],
    comparison: {
      caption: "Sherut, shuttle, taxi or transfer: which is which?",
      headers: ["Type of service", "How it works", "What it means for airport arrivals"],
      rows: [
        ["Former Nesher / Amal airport sherut", "Shared seats on historical airport routes to Jerusalem or Haifa", "Not a current regular walk-up option; do not rely on old listings"],
        ["Local monit sherut", "Passengers pay individually on an established local route", "Some local routes may run elsewhere, but they do not replace the former airport services"],
        ["Free airport shuttle", "Airport-operated bus between terminals or parking areas", "Free internal connection only; not transport into a city"],
        ["Commercial shared shuttle", "Seats may be sold on a specific pre-booked departure", "Use only when an identifiable operator confirms your actual date and route"],
        ["Authorized airport taxi", "Licensed metered taxi arranged via the airport system", "On-demand service with official pickup procedures, 24 hours a day"],
        ["Private transfer", "Dedicated vehicle booked for your party", "Requires an agreed vehicle, pickup point, terms and confirmation"],
      ],
    },
    sections: [
      {
        id: "nesher-amal",
        title: "Do the old Nesher and Amal airport sherut routes still operate?",
        photo: { src: sherutNesherCardPhoto, alt: "Historic yellow-and-white Nesher airport sherut serving Jerusalem" },
        paragraphs: [
          "No. The regular shared airport-taxi routes formerly associated with Nesher (Ben Gurion Airport–Jerusalem) and Amal (Ben Gurion Airport–Haifa and the north) are no longer operating as those services. Do not arrive expecting to join one of their old airport shared-taxi departures.",
          "Older websites, hotel directions and published fares may still describe the former pickup arrangements. They are not reliable instructions for a current journey. The airport's present ground-transport information instead directs travellers to trains, buses, authorized taxis and its internal shuttle, with pre-booked transfers a separate option."
        ],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "what-is-sherut",
        title: "What does monit sherut mean in Israel?",
        paragraphs: [
          "A monit sherut (מונית שירות) is a shared taxi: unrelated passengers travel along an established route and generally pay for their own seats, rather than hiring the whole vehicle. Depending on the route, boarding and alighting may be at designated stops or approved points along the corridor.",
          "The word shuttle is broader. It may mean the airport's free inter-terminal bus or a commercial service sold per seat. Neither is automatically the same as a licensed route-based sherut; the name alone tells you nothing about a confirmed departure."
        ],
        sourceIds: ["guide-sherut-regulation"],
      },
      {
        id: "airport-alternatives",
        title: "What can I use instead of an airport sherut?",
        paragraphs: [
          "For destinations served by rail, check Israel Railways for your actual date and final station; Ben Gurion Airport's train station is at Terminal 3. A bus may work for other trips, but check the whole route and last connection to your accommodation, not only the departure from the airport.",
          "For a direct ride, the airport has an authorized metered taxi system. A confirmed private airport transfer is another option, particularly with children, large bags or a late arrival. Compare the full door-to-door trip, pickup arrangements and total costs. Weekend and holiday schedules require separate checks in my guide to airport travel on Shabbat."
        ],
        inlineLinks: [
          { text: "guide to airport travel on Shabbat", to: travelGuidePaths.shabbat },
        ],
        highlightedLinks: [
          { label: "Israel Railways — check train times", href: "https://www.rail.co.il/", context: "Enter your travel date and destination, and check the final leg from the station." },
          { label: "National public transport journey planner", href: "https://bus.gov.il/", context: "Check available bus routes and connections for the day you arrive." },
        ],
        sourceIds: ["guide-iaa", "israel-rail", "guide-gett"],
      },
      {
        id: "where-to-go",
        title: "Which transport options fit Jerusalem, Haifa or Tel Aviv?",
        paragraphs: [
          "The most useful alternative depends on where you are staying, your luggage and when you land. Check the complete journey, including the final walk or taxi from the railway station. My airport-to-Jerusalem guide and airport-to-Haifa guide explain those routes; the Shabbat guide covers the limited weekend options.",
          "The comparison below is a starting point, not a live timetable or price quote. Confirm any connection on the actual travel date before relying on it."
        ],
        inlineLinks: [
          { text: "airport-to-Jerusalem guide", to: "/airport-transfers/ben-gurion-airport-to-jerusalem/" },
          { text: "airport-to-Haifa guide", to: "/airport-transfers/ben-gurion-airport-to-haifa/" },
          { text: "Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        tables: [{
          caption: "Practical Ben Gurion Airport options by destination",
          headers: ["Destination", "Useful choices", "Check before you go"],
          rows: [
            ["Jerusalem", "Train toward Jerusalem–Yitzhak Navon when operating; official taxi; confirmed transfer", "Last leg to your accommodation and actual train departure"],
            ["Haifa and the north", "Train toward Haifa where suitable; official taxi; confirmed transfer", "Onward station, transfer connections and luggage"],
            ["Tel Aviv", "Train when operating; official taxi; confirmed transfer", "Which station is nearest your hotel and any weekend gap"],
            ["Dead Sea / Ein Bokek", "Confirmed direct ride or suitable taxi; rental car", "Resort address, luggage and whether collection is possible on your date"],
          ],
          note: "Categories of travel, not guaranteed departures, live availability or fixed prices.",
        }],
        sourceIds: ["guide-iaa", "israel-rail"],
      },
      {
        id: "official-taxi",
        title: "How do official airport taxis work instead?",
        paragraphs: [
          "A licensed airport taxi is reserved for your journey rather than sold by the seat. At Ben Gurion Airport, obtain a ride code using Gett or a self-service kiosk and join the official taxi queue. At Terminal 3, the immediate taxi pickup is on Level G at Exit 03. The airport taxi service operates around the clock with a regulated meter.",
          "Advance Gett pickups can use different instructions. My Ben Gurion Airport taxis guide explains the full procedure; the taxi fares in Israel guide covers tariff periods and lawful additions without repeating those details here."
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares },
        ],
        highlightedLinks: [{ label: "Gett — official airport taxi instructions", href: "https://www.gett.com/il/airport-en/", context: "Check how to obtain a ride code and where to join the authorized taxi queue." }],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "airport-shuttle",
        title: "Is the free airport shuttle a sherut into the city?",
        paragraphs: [
          "No. The airport's free shuttle links Terminal 1 and Terminal 3 and serves internal airport needs; it does not take passengers to Jerusalem, Haifa or Tel Aviv. The airport publishes inter-terminal departures about every 15 minutes, around the clock.",
          "At Terminal 3, the Terminal 1 shuttle leaves from Level G near Gate 01. For terminal orientation and arrivals procedures, see my Ben Gurion Airport arrival guide."
        ],
        inlineLinks: [{ text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "local-sherut",
        title: "How do local sherut taxis work, and are any still available?",
        paragraphs: [
          "Local monit sherut lines are separate from the former airport services. Depending on the operator, a route may connect neighbourhoods or cities. Passengers usually pay individually, but the fare, accepted cash/card or travel passes, permitted stops and whether you can flag down a vehicle vary. Verify the current route and fare rather than assuming the arrangement is the same as an ordinary taxi.",
          "Some routes may operate on Shabbat, but that is not a general promise of weekend service. Check the day, direction, departure point, last trip, luggage capacity and payment with the operator or a current transport source. For wider choices, my getting around Israel guide covers rail and buses alongside taxis; the getting around Tel Aviv guide concentrates on local travel."
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv },
        ],
        sourceIds: ["guide-sherut-regulation", "guide-telaviv-transit"],
      },
      {
        id: "booked-shared",
        title: "What if I find a bookable shared airport shuttle?",
        paragraphs: [
          "A commercial provider may sell seats on a specific shared shuttle. That is a separately booked product, not a continuation of the old airport sherut routes. A website listing by itself does not establish that a departure is running on your date.",
          "Before paying, verify the actual operator, per-seat or per-vehicle price, pickup location, departure time, luggage allowance, flight-delay waiting rules, final drop-off and cancellation policy. Obtain written confirmation; otherwise compare a confirmed dedicated airport transfer instead."
        ],
        inlineLinks: [{ text: "dedicated airport transfer", to: "/airport-transfers/" }],
        sourceIds: [],
      },
      {
        id: "weekend",
        title: "What if I arrive during Shabbat or a holiday?",
        paragraphs: [
          "Regular trains and buses are restricted during much of Shabbat, so check your date and destination rather than assuming a convenient public-transport connection. Local sherut services are not an assured replacement for the former airport routes.",
          "Free weekend Line 711 serves Ben Gurion Airport Terminal 1 on limited Friday and Saturday schedules toward central Tel Aviv. Check the current timetable and terminal transfer, or arrange an authorized taxi or confirmed pickup. My airport Shabbat transport guide explains the details."
        ],
        inlineLinks: [{ text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-weekend-711", "guide-weekend-timetable", "guide-iaa"],
      },
    ],
    checklist: [
      "Do not rely on old Nesher or Amal airport sherut pickup instructions",
      "Check your landing date, terminal and full accommodation address",
      "Compare the actual rail or bus journey with an authorized taxi",
      "Confirm luggage, children’s equipment and accessibility requirements",
      "For a shared shuttle, verify the operator, per-seat price, timetable and written confirmation",
      "Check public transport and Line 711 separately for Shabbat or holidays",
      "Keep pickup details and your destination available offline",
    ],
    faqs: [
      { q: "Do regular Nesher and Amal airport sheruts still run?", a: "No. The former shared airport routes from Ben Gurion Airport to Jerusalem and Haifa are no longer operating as regular airport sherut services. Do not rely on old pickup points, prices or phone numbers." },
      { q: "Can I buy a seat on a shared shuttle from Ben Gurion Airport?", a: "Only where a current provider confirms a specific bookable departure. Check the operator, date, pickup, seat price, luggage and cancellation terms before paying." },
      { q: "Are local monit sherut taxis still available in Israel?", a: "Some separate local routes may operate, but coverage, schedules and payment vary. Confirm the particular line and operator rather than using an old route list." },
      { q: "How do passengers pay for a local sherut?", a: "Passengers generally pay individually rather than hiring the whole taxi. The fare and accepted payment options vary by route and provider." },
      { q: "Is the free shuttle between the airport terminals a sherut?", a: "No. It is the airport's internal bus service between terminals, not a shared ride to a city." },
      { q: "Can I use a sherut or airport bus on Shabbat?", a: "Do not assume a local sherut serves the airport. Limited free Line 711 serves Terminal 1 on published weekend schedules; check the actual departure and alternatives in the Shabbat guide." },
      { q: "What is the alternative to a former airport sherut for Jerusalem or Haifa?", a: "Check the actual train journey, the authorized airport taxi queue or a confirmed private pickup to your exact destination." },
    ],
    sourceIds: ["guide-iaa", "guide-gett", "israel-rail", "guide-weekend-711", "guide-sherut-regulation"],
    related: ["shabbat", "airportTaxis", "taxis", "arrival", "israel", "taxiFares"],
    services: [
      { label: "Explore car rental options", to: "/car-rental/", note: "Check collection hours and whether driving makes sense for your trip." },
      { label: "Choose where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", note: "Compare areas for a convenient first stay in the capital." },
      { label: "Discover Haifa and northern Israel", to: "/travel-blog/haifa/", note: "Explore the city and ideas for continuing your journey north." },
      { label: "Choose an Israel eSIM", to: travelGuidePaths.esim, note: "Keep maps and booking messages working after you land." },
    ],
  },
  esim: {
    id: "esim", title: "Best eSIM for Israel: data plans, calls and setup explained",
    description: "Choose an Israel eSIM by phone compatibility, data, validity, calls and hotspot rules. Compare providers and avoid common activation mistakes.",
    intro: "Get mobile data ready for maps, your hotel and your airport pickup. Choose the actual plan that fits your phone and trip, with a clear view of its limitations.",
    answer: "The best Israel eSIM depends on your exact phone, days of use, data needs and whether you need calls or a local number. Check device compatibility first, then compare the package's country coverage, activation rule, data allowance, fair-use policy and final total. An unlimited label does not promise unlimited full-speed data.",
    topics: ["connectivity", "tips"], photo: { src: esimPhoto, alt: "A phone displaying an eSIM graphic in front of a blurred city background", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/best_esim_for_israel.jpeg", credit: "Illustrative eSIM screen, not a provider speed test." },
    facts: [{ label: "First check", text: "Exact phone model, regional variant and carrier lock" }, { label: "Calls & SMS", text: "Check the package; a travel eSIM may be data-only" }, { label: "Unlimited", text: "Read speed, fair-use and hotspot conditions" }],
    comparison: { caption: "Provider options and the decision each one needs", headers: ["Provider", "Published option to compare", "Read before buying"], rows: [["Airalo", "Israel data packages and different plan sizes", "Validity, activation, top-ups and included services"], ["Saily", "Israel data and optional call/text products", "The phone-number country and any separate voice/text cost"], ["Yesim", "Fixed-data and unlimited options", "Fair-use throttling and the exact plan period"], ["GigSky", "Israel and wider-coverage products", "The actual country list; choose Israel in the app"], ["Drimsim", "Pay-as-you-use SIM/eSIM data", "Current per-unit cost, initial balance and setup terms"]] },
    sections: [
      { id: "compatibility", title: "Will an Israel eSIM work on my phone?", paragraphs: ["Check the exact model and regional version with the manufacturer and provider, and confirm that the phone is unlocked for another network. A recent phone name alone is not sufficient: regional variants and carrier restrictions can differ.", "If you want to keep your home number active, check the device's simultaneous-SIM support. Turn off mobile-data roaming on the home line and select the travel line for data, following the provider's setup instructions."], sourceIds: ["guide-esim-airalo", "guide-esim-saily"] },
      { id: "plan", title: "How much data and validity should I choose?", paragraphs: ["Estimate maps, messaging, browsing and any video calls separately. Download offline maps and use trusted Wi-Fi for large updates. A fixed allowance with a usable top-up option can make cost easier to track; heavy hotspot or streaming use needs closer attention to fair-use and speed limits.", "Compare the complete plan period with your travel dates. Regional and global plans are separate products: confirm Israel and every other stop in the exact country list, rather than assuming one country plan follows you across borders."], sourceIds: ["guide-esim-yesim", "guide-esim-gigsky"] },
      { id: "calling", title: "Does a travel eSIM include an Israeli phone number?", paragraphs: ["Not automatically. Data can support WhatsApp or another internet calling app, but ordinary phone calls, SMS and a local Israeli number are separate features. Saily's current product page, for example, describes an optional US phone number with separate calling/text plans. That is different from an Israeli number.", "For a longer stay or a definite local-number requirement, compare current local mobile offers as well as travel eSIMs. Confirm identity/setup requirements, call inclusions and renewal terms with the operator."], sourceIds: ["guide-esim-saily", "guide-esim-airalo"] },
      { id: "setup", title: "When should I install and activate the eSIM?", paragraphs: ["Install while you have a stable connection and enough time to troubleshoot, but read the plan's activation rule before switching it on. Installation, first network connection and the start of paid validity are not necessarily the same event.", "After arrival, select the intended data line, enable roaming on that line only if the provider requires it, and test maps and a message to your driver. If it fails, use the provider's support instructions; do not delete the eSIM profile unless told to, because reinstalling may be restricted."], bullets: ["Save the installation instructions and support contact offline.", "Check whether automatic renewal or top-up is enabled.", "Keep a Wi-Fi or alternative connection for an important pickup."], sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-drimsim"] },
    ],
    checklist: ["Confirm the exact phone is compatible and unlocked", "Match data, days, countries and hotspot needs", "Distinguish data calling from a phone number and SMS", "Read activation, renewal, refunds and fair-use rules", "Test connectivity before leaving the airport"],
    faqs: [{ q: "Which eSIM is cheapest for Israel?", a: "Compare the current total for the same data and travel period, including setup or usage charges. I do not publish a live cheapest-price ranking; provider packages, currencies and promotions change." }, { q: "Does unlimited mean maximum speed all day?", a: "No. Read the provider's fair-use and speed policy, plus any hotspot restriction. Yesim's published guidance explicitly describes potential throttling." }, { q: "Can I keep WhatsApp and my home number?", a: "A data connection can support your existing messaging apps. Keeping the home SIM active depends on the device and your carrier; control home-line roaming to avoid unintended charges." }, { q: "Will every eSIM give me an Israeli number?", a: "No. Check whether it is data-only or includes phone services, and which country's number is supplied. An optional US number is not an Israeli number." }],
    sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"], related: ["arrival", "uber", "israel"], services: [{ label: "Arrange your airport pickup", to: "/airport-transfers/" }], providerPageId: "guide-esim",
  },
  arrival: {
    id: "arrival",
    title: "Ben Gurion Airport Arrivals Guide: Passport Control, Bags & Transport",
    description: "Arriving at Ben Gurion Airport? Follow Terminal 3 arrivals, passport control, baggage claim, customs and the best way to reach your hotel.",
    intro: "From landing at Tel Aviv's Ben Gurion Airport (TLV) to meeting your ride, here is the practical arrival sequence, what to prepare and where to find the right onward transport.",
    answer: "For an international arrival at Ben Gurion Airport, follow the signs in Terminal 3 to passport control, collect your checked baggage, use the appropriate customs channel and enter the public arrivals hall. Before flying, check whether your passport requires an ETA-IL or a visa. Once outside, choose a train, bus, authorized airport taxi or confirmed private pickup for your actual arrival date. Allow for variable immigration and baggage delays instead of treating landing time as your pickup time.",
    topics: ["tips", "transportation"],
    updatedAt: "2026-10-22",
    photo: hallPhoto,
    facts: [
      { label: "International arrivals", text: "Terminal 3 under the airport's June 2026 published arrangement" },
      { label: "Entry documents", text: "Valid passport and visa or ETA-IL where required" },
      { label: "After baggage", text: "Customs, public arrivals hall, then confirmed ground transport" },
    ],
    nextSteps: [
      { label: "Official airport taxi ordering and pickup", to: travelGuidePaths.airportTaxis },
      { label: "Airport ground transport during Shabbat", to: travelGuidePaths.shabbat },
      { label: "Current airport sherut alternatives", to: travelGuidePaths.sherut },
      { label: "Getting around Israel", to: travelGuidePaths.israel },
    ],
    comparison: {
      caption: "From landing to your first journey in Israel",
      headers: ["Arrival stage", "What to do", "Keep ready"],
      rows: [
        ["Before the flight", "Check entry eligibility, ETA-IL or visa, and airport flight information", "Passport, approval, hotel and onward-travel details"],
        ["Passport control", "Follow arrivals and immigration signage and staff instructions", "Travel documents and purpose-of-visit information"],
        ["Baggage claim", "Find your flight's carousel; report missing or damaged luggage to the airline or handler", "Baggage tag, reference number, delivery address"],
        ["Customs", "Choose the correct green or red channel under the official rules", "Information and documents for items to declare"],
        ["Public arrivals hall", "Connect to your driver, railway station, bus stop or taxi queue", "Booking details, phone access, exact destination"],
      ],
    },
    sections: [
      {
        id: "before-you-fly",
        title: "What do I need before flying to Israel?",
        paragraphs: [
          "Check Israel's official entry portal for the rules applicable to your passport and purpose of visit. Since January 2025, travelers from visa-exempt countries generally need an approved ETA-IL before travelling to Israel, while many other travelers require a visa. Israeli citizens and other exempt categories have different rules. An ETA-IL authorizes travel but does not replace admission checks by border control.",
          "Have your passport, any required visa or ETA-IL confirmation, the address of your first accommodation, onward flight or return details and a way to contact your host accessible offline. Apply through the official portal rather than an intermediary that could add charges or provide outdated eligibility information.",
          "Check your flight's actual status and destination terminal on the airline and Israel Airports Authority websites shortly before travel. Tell a pre-booked driver the flight number and the arrival date in Israel, especially when a flight lands after midnight.",
        ],
        sourceIds: ["guide-entry", "guide-iaa", ],
      },
      {
        id: "arrival-terminal",
        title: "Which terminal do international flights arrive at?",
        photo: airportTransferPhotos["other"]!,
        paragraphs: [
          "The Israel Airports Authority announced in June 2026 that international arriving flights continue to use Terminal 3, even though some airlines depart internationally from Terminal 1. Domestic flights arriving from Ramon Airport use Terminal 1. This is the airport's published 2026 arrangement, not a guarantee against a later operational change.",
          "Follow the airline's actual arrival instructions and the latest airport notices. Do not infer your arrival terminal from where the same airline departs, or from a trip you took in an earlier year. Passengers who need to transfer between Terminals 3 and 1 can use the free internal airport shuttle.",
          "The internal shuttle is not a service to Tel Aviv or another city. The airport lists the Terminal 3 stop on Level G near Gate 01 and the Terminal 1 stop opposite Gate 4, with departures roughly every 15 minutes around the clock. Allow time to find the stop and reach the next connection.",
        ],
        sourceIds: ["guide-iaa-terminal-2026", "guide-iaa"],
      },
      {
        id: "passport-control",
        title: "What happens at passport control in Ben Gurion Airport?",
        paragraphs: [
          "After leaving the aircraft, follow signs for arrivals and passport control. Use the lane or facility appropriate for your passport and follow the instructions of immigration staff. Automated processing may be offered to eligible passengers, but no visitor should assume it applies to every nationality or document.",
          "You may be asked about the reason for your trip, accommodation and travel arrangements. Answer accurately and have your documents accessible. An approved ETA-IL or valid visa does not automatically guarantee admission; the entry decision is made at the border.",
          "Retain any entry card or record issued to you, including a printed slip if you receive one, with your passport. You may need the record during your stay. If you are unsure what was issued or need to resolve an entry-record problem, ask the issuing authority rather than relying on an online description of a universal procedure.",
        ],
        sourceIds: ["guide-entry", ],
      },
      {
        id: "baggage",
        title: "Where do I collect checked luggage, and what if a bag is missing?",
        paragraphs: [
          "After passport control, follow the signs to baggage reclaim and use the arrival screens to find the carousel assigned to your flight. Keep your baggage claim tags until every checked bag is in your possession. Allow extra time for oversized items, strollers or checked mobility equipment.",
          "If your checked suitcase has not arrived, or is visibly damaged, contact your airline or its ground handling company and complete a baggage report before leaving the reclaim area where possible. Obtain the file or report reference, keep your baggage tags, and provide a reachable phone number and delivery address in Israel.",
          "The airport separates airline-handled baggage problems from general items lost elsewhere in the terminal. Its lost property page directs questions about checked baggage and items lost on board or around the carousel to the airline's ground handler. If you only discover a problem after leaving, contact the airline or handler promptly and follow its procedures.",
        ],
        sourceIds: ["guide-lost-property", ],
      },
      {
        id: "customs",
        title: "How does customs work when entering Israel?",
        paragraphs: [
          "After collecting your bags, follow the customs signs toward the red and green channels. The Israel Tax Authority's visitor guide explains that the green channel is for travelers who have nothing requiring declaration; the red channel is for goods or circumstances requiring a declaration.",
          "Review the official rules for the goods you are carrying, including any controlled or restricted items, cash-reporting obligations and customs allowances. Do not assume that an allowance described for another country applies to Israel. The Tax Authority advises travelers who are uncertain which channel to use to take the red channel and ask.",
          "Keep receipts and relevant documentation accessible if an item may need to be declared. Customs processing can add time to an airport arrival, especially when you need to ask a question or provide information; take this into account before promising a pickup time.",
        ],
        sourceIds: ["guide-customs-tourists"],
      },
      {
        id: "arrivals-hall",
        title: "What should I do in the public arrivals hall?",
        paragraphs: [
          "After customs, you enter the public arrivals area. This is where you can contact the person meeting you, check transport signs and work out the final journey. Save the name and complete address of your hotel, the booking reference and the meeting instructions before leaving home.",
          "If a private driver is collecting you, read the actual confirmed meeting point rather than assuming every pickup takes place at the same exit. Notify the operator if passport control or baggage claim delays you, and check the agreed waiting policy. An inquiry for a quote is not itself a confirmed booking.",
          "Keep your passport, phone and luggage secure, and use signed airport services rather than accepting unsolicited transport approaches. If your pickup instructions are unclear, contact the provider or ask at an official airport information point.",
        ],
        sourceIds: ["guide-iaa", ],
      },
      {
        id: "phones-money",
        title: "Can I get mobile data, cash and essential services on arrival?",
        paragraphs: [
          "A working connection makes it easier to follow meeting instructions and check train or taxi arrangements. Arrange roaming, a physical SIM or an eSIM before travel where possible, and save key addresses and documents offline. The Israel eSIM guide compares local data options and activation considerations.",
          "The airport's Terminal 3 services directory lists ATMs and other traveler facilities, including locations in the arrivals area. For cash, use Israeli shekels as the local currency and check exchange rates and fees before withdrawing or converting money. Availability of individual counters and services can vary by time and airport operations.",
          "Keep a payment backup if your first card is not accepted. If you need mobility assistance or help transporting bags, request it through the airline or relevant service before travelling; not every form of help is available spontaneously at the arrivals exit.",
        ],
        inlineLinks: [{ text: "Israel eSIM guide", to: travelGuidePaths.esim }],
        sourceIds: ["guide-iaa-arrival-services", "guide-iaa-accessibility"],
      },
      {
        id: "leave-airport",
        title: "How do I get from Ben Gurion Airport to my hotel?",
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Taxi entrance sign at Ben Gurion Airport" },
        paragraphs: [
          "Choose your route based on the complete journey to the hotel, not just the first train or bus. Israel Railways serves the airport at Terminal 3 and can be useful for destinations connected to the railway, while buses may fit other journeys when they are operating. Check the actual date, station and final connection with bags.",
          "For an on-demand authorized airport taxi, Gett operates the official order and queue process: request a ride using its app or an airport self-service kiosk, obtain a ride code and join the physical taxi queue. Terminal 3 immediate taxis depart at ground-floor Exit 03; a scheduled Gett pickup is different and is listed at Level 2, Exit 23. The official Ben Gurion Airport taxi guide provides the complete pickup procedure.",
          "You can instead request a private airport transfer for your party, with a meeting point, suitable vehicle and total price agreed in advance. The former Nesher and Amal airport shared-taxi services have been discontinued; the sherut guide explains the old services and today's alternatives. If you want to compare the national taxi fare rules, use my Israeli taxi fares guide rather than assuming every airport ride has a fixed price.",
        ],
        inlineLinks: [
          { text: "official Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/airport-transfers/" },
          { text: "sherut guide", to: travelGuidePaths.sherut },
          { text: "Israeli taxi fares guide", to: travelGuidePaths.taxiFares },
        ],
        tables: [{
          caption: "Airport-to-hotel transport at a glance",
          headers: ["Mode", "Useful for", "Main limitation"],
          rows: [
            ["Train", "Many rail-connected city trips when services run", "Station-to-hotel connection, luggage and date-specific timetable"],
            ["Public bus", "A route served by a suitable current line", "Service hours and possible transfers; no universal airport-to-hotel bus"],
            ["Official airport taxi", "Direct on-arrival licensed taxi ride", "Meter and physical queue; verify space and any special needs"],
            ["Private transfer", "Pre-arranged meeting or family/group vehicle", "Booking, total cost and pickup conditions must be confirmed"],
            ["Rental car", "An onward self-drive itinerary", "Collection location, desk hours, insurance and parking"],
          ],
        }],
        sourceIds: ["guide-iaa", "guide-gett", "israel-rail", ],
      },
      {
        id: "arrival-timing",
        title: "How long does it take to get out of Ben Gurion Airport?",
        paragraphs: [
          "There is no reliable fixed number of minutes from touchdown to the public arrivals hall. The time depends on where the aircraft parks, the walk to immigration, queue conditions, passport processing, checked baggage and any customs questions. A smooth arrival may be relatively quick; a busy flight bank or missing bag can take considerably longer.",
          "Do not arrange a tight onward train or bus connection solely from the published landing time. For a private pickup, supply the flight number and check the agreed arrival monitoring, free waiting period, extra charges and what happens if immigration takes longer. Contact the operator after collecting bags if that is what the confirmation instructs.",
          "For a same-day onward journey, include time to reach the railway station, the official taxi line or a different terminal. The published airport flight status can change, so refresh it close to your arrival and keep an alternative for late-night transport.",
        ],
        sourceIds: ["guide-iaa", ],
      },
      {
        id: "shabbat",
        title: "What changes if I land on Friday evening or Saturday?",
        paragraphs: [
          "Ben Gurion Airport can receive flights during Shabbat, but most regular train and bus service is suspended during the main weekly rest period. Do not assume the last Friday train or first Saturday-night departure matches your flight. Check the actual timetable and include the final journey from the station to your accommodation.",
          "A licensed airport taxi or an advance-confirmed private transfer may work when the train does not. Limited free weekend Line 711 serves central Tel Aviv from Terminal 1 on its own schedule, with an internal shuttle connection from Terminal 3. It is not a guaranteed connection to every arriving flight.",
          "The airport Shabbat transport guide explains Line 711, the terminal shuttle, taxi alternatives and Saturday-night restarts. Use that page for the weekend details rather than relying on this general airport arrival checklist.",
        ],
        inlineLinks: [{ text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-weekend-711", "guide-iaa", "israel-rail"],
      },
      {
        id: "assistance",
        title: "How should families and passengers needing assistance prepare?",
        paragraphs: [
          "If you are travelling with infants, older relatives, a wheelchair or other mobility needs, contact the airline in advance to request the right arrival assistance. The airport authority states that airlines and their ground handling companies provide help to arriving passengers requiring assistance, while the airport supplies the relevant infrastructure.",
          "Identify any stroller, oversized baggage or mobility equipment that you will need to collect before customs. If a separate porter service is useful, the Terminal 3 services directory describes paid baggage handling; confirm its current arrangements rather than assuming it is included with the flight.",
          "For onward travel, tell any taxi or private-transfer operator about child seats, accessible vehicle requirements and the full quantity of luggage before booking. A standard taxi queue does not ensure a particular vehicle. The taxis in Israel guide covers general taxi booking and passenger arrangements outside the airport.",
        ],
        inlineLinks: [{ text: "taxis in Israel guide", to: travelGuidePaths.taxis }],
        sourceIds: ["guide-iaa-accessibility", "guide-iaa-arrival-services", "guide-iaa"],
      },
    ],
    checklist: [
      "Check passport validity and the correct visa or ETA-IL requirement before your flight",
      "Save flight number, entry approval and accommodation address offline",
      "Check the airport's latest terminal and flight notices",
      "Follow passport control, baggage reclaim and customs signs after landing",
      "Retain your entry record and checked-baggage tags",
      "Report missing or damaged baggage to the airline or handler",
      "Set up mobile access and a payment backup",
      "Confirm the complete onward route and the correct taxi or private pickup point",
      "Check Shabbat or holiday public-transport changes for the actual date",
      "Arrange assistance, child seats or suitable vehicle size before travel",
    ],
    faqs: [
      { q: "Which terminal do international flights arrive at Ben Gurion Airport?", a: "The airport authority's June 2026 announcement says international arriving flights use Terminal 3. Some international departures use Terminal 1, so always check the latest flight and airport notices." },
      { q: "Do I need an ETA-IL to enter Israel?", a: "Many visitors from visa-exempt countries need an approved ETA-IL before travel; others need a visa or fall under an exemption. Check your passport on the official Israel entry portal. Authorization to travel does not guarantee admission." },
      { q: "What happens after landing at Ben Gurion Airport?", a: "Follow the arrivals signs to passport control, collect checked luggage, pass through the appropriate customs channel and enter the public arrivals hall to meet your onward transportation." },
      { q: "How long does passport control take at Ben Gurion Airport?", a: "There is no dependable fixed processing time. Queues and individual document checks vary; allow a flexible margin before arranging onward travel." },
      { q: "Do tourists get an entry card at Ben Gurion Airport?", a: "Keep any entry card or record issued to you with your passport. The format can vary by process and traveler, so follow the authority's instructions for your own entry record." },
      { q: "Where can I report luggage missing after an arriving flight?", a: "Contact the airline or ground handling company responsible for your flight, ideally before leaving baggage reclaim. Keep luggage tags and obtain a report reference. The airport has separate lost-property guidance for items misplaced in the terminal." },
      { q: "What is the difference between the red and green customs channels?", a: "Use the green channel only when you have nothing requiring declaration. Use the red channel for declarations; the Israel Tax Authority advises using the red channel if you are unsure." },
      { q: "Is there an ATM at Ben Gurion Airport arrivals?", a: "The airport's Terminal 3 services directory lists ATMs in the arrivals area. Check the current location and fees, and keep a backup payment method." },
      { q: "How do I get an official taxi at Terminal 3?", a: "Order through Gett or an airport kiosk, keep the ride code and join the authorized physical queue on the ground floor at Exit 03. Scheduled Gett taxi rides use a different pickup arrangement." },
      { q: "Can I book a private transfer to meet me after customs?", a: "Yes, if the operator confirms the booking. Share the flight number, terminal, destination, passengers and bags, and agree the exact meeting point, total price, waiting and delay conditions." },
      { q: "Can I take a train from Ben Gurion Airport to Tel Aviv?", a: "The airport has an Israel Railways station at Terminal 3. Check the train's actual date and timetable, including Shabbat or holiday interruptions, and plan the connection from your city station to your accommodation." },
      { q: "Do Nesher and Amal sherut vans still pick up airport passengers?", a: "No. The former Nesher and Amal airport sherut services have been discontinued. Use current rail, bus, authorized taxi or confirmed private-transfer options instead." },
      { q: "Can I arrive in Israel on Shabbat?", a: "Flights may arrive during Shabbat, but regular rail and most bus service pauses. Authorized airport taxis, confirmed private transfers and limited Line 711 to Tel Aviv may be options depending on the date." },
      { q: "What if my flight arrives late or is delayed?", a: "Check current ground-transport service and notify your pickup operator according to the booking instructions. Do not use the original landing estimate as a guarantee of when you will exit passport control and baggage reclaim." },
      { q: "Is there help for wheelchair users or travelers with reduced mobility?", a: "Yes. Request assistance with your airline in advance. Ground handlers provide arrival support, and the airport publishes accessible facility and internal shuttle information." },
    ],
    sourceIds: [
      "guide-entry", "guide-iaa-terminal-2026", "guide-iaa",
      "guide-lost-property", "guide-customs-tourists", "guide-iaa-arrival-services",
      "guide-iaa-accessibility", "guide-gett", "israel-rail", "guide-weekend-711",
    ],
    related: ["airportTaxis", "shabbat", "sherut", "taxiFares", "esim", "taxis", "israel", "uber"],
    services: [
      { label: "Airport transfer destinations and personal quote", to: "/airport-transfers/" },
      { label: "Private airport transfer to Tel Aviv", to: "/airport-transfers/ben-gurion-airport-to-tel-aviv/" },
      { label: "Private airport transfer to Jerusalem", to: "/airport-transfers/ben-gurion-airport-to-jerusalem/" },
      { label: "Private airport transfer to Haifa", to: "/airport-transfers/ben-gurion-airport-to-haifa/" },
    ],
  },
  israel: {
    id: "israel",
    title: "Getting Around Israel: Trains, Buses, Taxis & Travel Tips",
    description: "Getting around Israel: trains, buses, Rav-Kav, mobile payments, taxis, Shabbat travel, rental cars and practical routes between major cities.",
    intro: "Getting around Israel is easier with a well-planned itinerary and transport choices that suit each region. Compare trains, buses, light rail, taxis and other available options, considering connections between destinations, payment methods and Shabbat services.",
    answer: "For rail-connected cities such as Tel Aviv, Jerusalem and Haifa, start by comparing trains and buses for your full door-to-door trip. Use city buses, operating light rail, the Haifa Metronit and walking for local journeys. Tourists can generally pay with a preloaded anonymous Rav-Kav card or an approved mobile payment app; ordinary bus drivers do not accept cash, and direct bank-card taps are not yet universal. Licensed taxis and confirmed transfers help with awkward last-mile connections or Shabbat, while a rental car suits more remote or multi-stop itineraries. Always check your exact route, payment method and return departure.",
    topics: ["transportation", "destinations", "itineraries", "tips"],
    updatedAt: "2026-11-12",
    photo: {
      src: archivedBuses,
      alt: "Buses waiting at a transport terminal in the Tel Aviv metropolitan area",
    },
    facts: [
      { label: "Between cities", text: "Compare the train and direct bus for your actual station and address" },
      { label: "How to pay", text: "Bring a loaded Rav-Kav card or set up an approved app before boarding" },
      { label: "Shabbat & holidays", text: "Plan a separate itinerary; regular services often pause" },
    ],
    comparison: {
      caption: "Which transport option suits your journey?",
      headers: ["Transport", "Best for", "Cost level", "On Shabbat?", "Main limitation"],
      rows: [
        ["Train", "Airport and rail-connected cities", "Low", "No regular service", "Stations may be far from your hotel"],
        ["Bus", "City journeys, intercity routes and smaller towns", "Low", "Most routes stop", "Frequency, last bus and final stop"],
        ["Light rail", "Operating urban corridors in Jerusalem and greater Tel Aviv", "Low", "No regular service", "Only selected corridors; validate before boarding"],
        ["Licensed taxi", "Door-to-door travel and luggage", "Higher, metered", "Usually available", "Fare varies by time, distance and extras"],
        ["Shared taxi (sherut)", "Specific local shared-vehicle corridors", "Varies", "Some routes may run", "Check the route; former airport services stopped"],
        ["Rental car", "Regional road trips and several rural stops", "Variable", "Driving possible", "Rental hours, parking, insurance and permitted roads"],
        ["Private driver or tour", "Arranged multi-stop travel without self-driving", "Higher", "By confirmation", "Price, scope, inclusions and availability"],
      ],
    },
    sections: [
      {
        id: "choose-transport", title: "Choose the right transport for your trip",
        paragraphs: [
          "Do not assume one transport method is best for your whole holiday. A train can work between major cities, a bus or light rail for city neighborhoods, and a taxi for the final connection to your hotel. Compare walking distance, wait time, operating hours and total cost—not only the time spent onboard.",
          "If your trip focuses on central Tel Aviv and Jerusalem, you can often avoid city-center parking. If you are visiting nature reserves or several sites in one day, a rental car, a private driver or an organized tour may be more realistic. Start with the return journey and the latest service you can safely catch.",
        ],
        bullets: [
          "Solo travelers and couples: rail and buses usually have the lowest direct cost.",
          "Families and luggage: include lifts, stairs, stop location and the final taxi or walk.",
          "Remote destinations: check whether the nearest public-transport stop actually serves the attraction.",
          "Friday, Saturday or major holiday: plan the operating-day alternative before buying tickets.",
        ],
        sourceIds: ["guide-bus-planner", "guide-train-nov-2026"],
      },
      {
        id: "public-transport", title: "Trains, buses and light rail",
        paragraphs: [
          "These three networks complement each other rather than operating as one continuous door-to-door service. Check your destination station, live route changes, the final connection and the last departure before deciding which is best.",
        ],
        subsections: [
          {
            id: "israel-trains", title: "Israel Railways: intercity trains and airport connections",
            paragraphs: [
              "Israel Railways connects Ben Gurion Airport and many destinations including Tel Aviv, Jerusalem, Haifa, Akko and Be'er Sheva. Choose the real railway station closest to your destination; Tel Aviv's mainline stations are inland, Jerusalem–Yitzhak Navon is near the central bus station rather than the Old City, and Haifa's coastal railway stops can be far below Mount Carmel hotels.",
              "From November 2026, Israel Railways' revised timetable includes longer through services from Jerusalem via Tel Aviv to several northern stations. Some journeys still require a change of trains.",
              "As of the August 2026 Israel Railways notice, travel to or from Jerusalem–Yitzhak Navon requires a separate free personal voucher for the selected train, in addition to a valid rail ticket. You can request the voucher starting 72 hours before departure. Check the latest instructions for your date: the voucher is not a replacement ticket. For flight-specific terminal access, see my airport arrival guide.",
            ],
            steps: [
              "Up to 72 hours before the journey, search from or to Jerusalem–Yitzhak Navon on the official Israel Railways planner and select your exact train.",
              "Choose “Order Travel Voucher” for that departure (under “Actions” on mobile). Enter a phone number able to receive an SMS verification code, complete verification and choose a voucher for each passenger.",
              "Keep the voucher code sent by SMS, show it to station staff alongside your valid rail ticket and retain it until the journey ends. A voucher is valid only for the train selected.",
            ],
            photo: { src: navonPlatform, alt: "Jerusalem–Yitzhak Navon railway platforms on the deep intercity station" },
            inlineLinks: [{ text: "airport arrival guide", to: travelGuidePaths.arrival }],
            highlightedLinks: [
              { label: "Israel Railways — search a journey and check fares", href: "https://www.rail.co.il/", context: "Select the real travel date, stations, train changes and last departure. Check disruption notices before leaving." },
              { label: "Jerusalem line — free passenger voucher", href: "https://rail.co.il/?lan=en&page=vouchers-jerusalem", context: "The August 2026 rule requires a free voucher for the selected train. Apply from 72 hours before departure, verify by SMS and bring both voucher and rail ticket; confirm the current rule." },
            ],
            sourceIds: ["israel-rail", "guide-train-nov-2026", "guide-jerusalem-train-voucher"],
          },
          {
            id: "israel-buses", title: "City buses and intercity buses",
            paragraphs: [
              "City buses reach neighborhoods beyond railway stations; intercity services connect Tiberias, Safed, Nazareth, Eilat, Dead Sea resorts and many other destinations without direct rail. Some long-distance departures require seat reservations, and remote attractions may be far from the nearest bus stop.",
              "Use the national journey planner with your actual start and end addresses. Check the boarding side of the street, whether you need to change vehicles, ticket acceptance and the last return bus. Public transport information may be incomplete during diversions, holidays or security-related changes.",
            ],
            highlightedLinks: [
              { label: "National public transport route planner", href: "https://route.bus.gov.il/", context: "Search buses and light rail by the exact travel date, stop and direction. Verify important departures with the operator." },
              { label: "Egged — seat reservations for selected routes", href: "https://www.egged.co.il/en/information-for-passengers/tickets-information", context: "Some intercity services such as selected Eilat routes use seat reservations; check before travelling." },
            ],
            sourceIds: ["guide-bus-planner", "guide-egged-seat-reservations"],
          },
          {
            id: "israel-light-rail", title: "Light rail and bus rapid transit",
            paragraphs: [
              "Jerusalem's light rail is useful along its operating corridor, including parts of the center and approaches to the Old City. Greater Tel Aviv's operating Red Line serves parts of Tel Aviv–Jaffa, Ramat Gan, Bnei Brak, Petah Tikva and Bat Yam; it does not reach every beach or hotel. Do not confuse future rail lines with those already running.",
              "Haifa also has the Metronit bus rapid transit network and the Carmelit underground funicular between the Lower City and Carmel Center. The university-bound Rakbalit cable-car transit is a separate service from the tourist cable car near Bat Galim. Always check operating hours and ticket acceptance for the specific system.",
            ],
            photo: {
              src: jerusalemLightRail,
              alt: "Jerusalem light rail train alongside a street-level platform",
            },
            highlightedLinks: [{ label: "Tel Aviv light rail Red Line — ticketing and validation", href: "https://www.nta.co.il/en/buying-tickets-and-validation-machines/", context: "Validate your Rav-Kav or app journey before boarding the Red Line, including when connecting from another service." }],
            sourceIds: ["guide-red-line", "guide-urban-transit-validation", "guide-haifa-carmelit"],
          },
        ],
      },
      {
        id: "paying", title: "Tickets, Rav-Kav and mobile payment apps",
        paragraphs: [
          "For most visitors, the simplest choices are an anonymous Rav-Kav card loaded before travelling or a supported mobile payment app. Do not assume you can pay cash on a public bus or tap any foreign bank card on every route. Choose a method that works even if you lose mobile reception, and check that children have the correct ticket arrangements.",
        ],
        tables: [{
          caption: "Rav-Kav vs payment app vs bank-card tap",
          headers: ["Method", "How to start", "Good for", "Important limitation"],
          rows: [
            ["Anonymous Rav-Kav", "Buy at a supported counter, machine or retailer and preload value or a day pass", "Tourists wanting a physical card and offline backup", "Card must be loaded and validated; no personalized concessions"],
            ["Approved mobile app", "Install, register and add an accepted payment method before travel", "Flexible bus and rail use without preloading a card", "Data, battery and supported payment method required; follow QR/validation instructions"],
            ["Direct contactless bank card", "Tap only where Egged explicitly supports payment (including selected lines in Eilat, Jerusalem and Haifa)", "A simple single full-fare ride on an enabled service", "Not nationwide; no personal concessions or normal Rav-Kav/app fare benefits"],
          ],
        }],
        subsections: [
          {
            id: "israel-ravkav", title: "Buying and loading an anonymous Rav-Kav",
            paragraphs: [
              "An anonymous Rav-Kav generally does not need an Israeli identity number or photo and can be purchased from designated service centers, kiosks and some ticket machines. Check current locations and card fees before visiting. Load stored value or the relevant daily travel product before boarding; keep enough balance for your planned journey.",
              "Rav-Kav Online can help users with a compatible NFC phone load the card. Some ticket machines or service points can also load it. Validate each journey when boarding, including transfers when required. Anonymous cards are not a way to claim discounts reserved for verified personal travel profiles.",
            ],
            highlightedLinks: [
              { label: "Rav-Kav and ticket types — Ministry of Transport", href: "https://www.gov.il/he/pages/tickets_and_discounts", context: "Check anonymous-card rules, ticket types and discount eligibility; the official information is primarily in Hebrew." },
              { label: "Rav-Kav Online — English visitor instructions", href: "https://ravkavonline.co.il/en/public-transport-in-israel", context: "See how a visitor can obtain and load a card. Check current service points and app compatibility." },
            ],
            sourceIds: ["guide-ravkav-2026", "guide-ravkav-visitor"],
          },
          {
            id: "israel-payment-apps", title: "Using a supported ticketing app",
            paragraphs: [
              "Approved public transport payment apps can include Moovit and Rav-Pass; other supported apps and features can change. Register while you have working data, add a compatible payment method and learn how to validate your journey before boarding. App payments can be settled after travel under applicable fare caps and ticket rules. My Israel eSIM guide explains how to arrange mobile data for these services.",
              "On a city bus, follow the app's QR or location instructions for the correct vehicle or stop. On Israel Railways, use the app's train-trip procedure at the entrance and exit gates; on the Tel Aviv Red Line, validation happens before boarding. Avoid assuming a screenshot or an unused app session counts as a valid ticket.",
            ],
            inlineLinks: [{ text: "Israel eSIM guide", to: travelGuidePaths.esim }],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets"],
            highlightedLinks: [{ label: "Official route-planning apps and public transit tools", href: "https://www.gov.il/he/Departments/Topics/routes-public-transportion", context: "The Ministry of Transport lists approved trip-planning tools; prepare your preferred ticketing app and payment method before travel." }],
          },
          {
            id: "israel-ticket-rules", title: "Cash, contactless cards, transfers and children",
            paragraphs: [
              "Ordinary buses do not normally sell tickets for cash onboard. A railway station may offer ticket machines or staffed counters, with payment options varying by location. Egged introduced contactless credit-card and digital-wallet validation in January 2026 on supported lines in Eilat, Jerusalem and metropolitan Haifa. Coverage is expected to expand gradually, but as of November 2026, direct bank-card taps are not yet universally accepted across Israeli buses and operators.",
              "Egged's supported contactless validators accept international Visa and Mastercard cards, but do not apply passenger profile discounts or the standard Rav-Kav/app fare benefits. They are intended for a full-fare single journey. Carry a loaded Rav-Kav or supported app as a backup; transfer or day-pass benefits vary by payment system, distance and mode. Check child fares and how to validate each passenger.",
            ],
            highlightedLinks: [{ label: "Egged — where credit-card taps work", href: "https://www.egged.co.il/en/information-for-passengers/rav-kav-and-payment-apps", context: "Egged specifies the pilot areas, supported international cards and its full-fare single-journey rules. Do not assume other operators use the same system." }],
            sourceIds: ["guide-select-card-payment", "guide-ravkav-2026", "guide-urban-transit-validation", "guide-egged-card-payment-2026"],
          },
        ],
      },
      {
        id: "taxis-and-sherut", title: "Taxis, shared taxis and arranged rides",
        paragraphs: [
          "Taxis and booked transport are useful when the bus or train will not reach the final address, especially with luggage, at night or during Shabbat. A licensed metered taxi, a route-based shared taxi and a confirmed private driver are three different services; their pricing, pickup process and availability should not be confused.",
        ],
        subsections: [
          {
            id: "israel-taxis", title: "Licensed taxis and Gett or Yango",
            paragraphs: [
              "Licensed Israeli taxis can be booked at a stand, by phone, through a hotel or using Gett or Yango where available. Check the authorized vehicle, exact pickup, fare basis and receipt. Regulated meter fares can vary with traffic, distance, tariff period and permitted extras; an app estimate is not always a fixed price.",
              "Uber and Lyft do not currently provide ordinary passenger ride-booking services in Israel. My taxis in Israel guide explains safety and how metered trips work, the taxi fares guide explains tariff rules, and the Uber alternatives guide compares available booking apps.",
            ],
            inlineLinks: [
              { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
              { text: "taxi fares guide", to: travelGuidePaths.taxiFares },
              { text: "Uber alternatives guide", to: travelGuidePaths.uber },
            ],
            sourceIds: ["guide-gett-app", "guide-yango-israel", "guide-uber-availability", "taxi-fares-2026"],
          },
          {
            id: "israel-sherut", title: "What about shared-taxi sherut routes?",
            paragraphs: [
              "A local monit sherut is a shared minibus or taxi that follows a particular urban or intercity corridor. Routes, payment and Shabbat operation depend on the local service. Do not confuse it with an individually booked shuttle that picks up a whole party.",
              "The former Nesher airport shared service to Jerusalem and Amal service to Haifa have been discontinued. Old directory listings should not be treated as valid airport pickup instructions. See the Sherut in Israel guide for the distinction between current local corridors and former airport operations.",
            ],
            inlineLinks: [{ text: "Sherut in Israel guide", to: travelGuidePaths.sherut }],
            sourceIds: ["guide-sherut-regulation"],
          },
          {
            id: "israel-airport-options", title: "Arriving at Ben Gurion Airport",
            paragraphs: [
              "From Terminal 3, use the airport railway where it serves your destination. For door-to-door travel, the authorized airport taxis use the official Gett or self-service kiosk ride code and a designated queue; a privately arranged airport transfer is separate and must be confirmed in advance.",
              "My airport arrival guide explains passport control, baggage and reaching the transport areas. My Ben Gurion Airport taxi guide covers the authorized pickup procedure. Before an early flight or a Shabbat arrival, also check the airport Shabbat guide for operating-day limitations.",
            ],
            inlineLinks: [
              { text: "airport arrival guide", to: travelGuidePaths.arrival },
              { text: "Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
              { text: "airport Shabbat guide", to: travelGuidePaths.shabbat },
            ],
            sourceIds: ["guide-iaa", "guide-gett"],
          },
        ],
      },
      {
        id: "destinations", title: "Getting around major cities and regions",
        paragraphs: [
          "Local geography matters as much as distance. Choose accommodation near the places you will visit and plan how to reach the final hotel or attraction after stepping off a train or bus.",
        ],
        subsections: [
          {
            id: "israel-tel-aviv", title: "Tel Aviv and Old Jaffa",
            paragraphs: [
              "Walking, city buses, the operating Red Line and occasional taxis cover most visitor needs, but no single rail stop serves the entire beachfront. Bikeshare or cycling may help on suitable routes. My getting around Tel Aviv guide includes the four mainline rail stations, payment and the separate weekend bus network.",
            ],
            photo: { src: telAvivDizengoff, alt: "Dizengoff neighborhood streets in Tel Aviv for planning city walks and local transfers" },
            inlineLinks: [{ text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv }],
            sourceIds: ["guide-telaviv-transit", "guide-red-line"],
          },
          {
            id: "israel-jerusalem", title: "Jerusalem and the Old City",
            paragraphs: [
              "Use the operating light rail and city buses for the appropriate corridor, then walk or take a taxi near the Old City. Pedestrian gates, hills, stairs and restricted vehicle access can mean that a short map distance is not an easy walk. The Jerusalem travel guide explains where to stay and visit; the airport-to-Jerusalem guide covers the rail arrival and final connection.",
            ],
            inlineLinks: [{ text: "Jerusalem travel guide", to: travelGuidePaths.jerusalem }, { text: "airport-to-Jerusalem guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" }],
          },
          {
            id: "israel-haifa", title: "Haifa: Metronit, Carmelit and cable cars",
            paragraphs: [
              "Haifa rises steeply from the coast to Mount Carmel. The Metronit bus rapid transit serves several urban corridors and the Krayot; the underground Carmelit climbs between the Lower City and Carmel Center. The Rakbalit transit cable car serves the university and Technion area, while the tourist cable car at Bat Galim is a different operation.",
              "A coastal railway station is not necessarily an easy walk to a hotel higher on the hill. My Haifa travel guide and airport-to-Haifa guide explain neighborhoods and the final station connection.",
            ],
            inlineLinks: [{ text: "Haifa travel guide", to: "/travel-blog/haifa/" }, { text: "airport-to-Haifa guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" }],
            sourceIds: ["guide-haifa-carmelit", "guide-bus-planner"],
          },
          {
            id: "israel-galilee", title: "Tiberias, the Galilee and the Sea of Galilee",
            paragraphs: [
              "Intercity and local buses connect Tiberias, Nazareth and other towns, but attractions and viewpoints around the Sea of Galilee are spread out and their nearest stops may be inconvenient. Confirm the return bus and park entrance before departing. A rental car or a properly planned day tour may work better for multiple regional stops.",
              "The Tiberias accommodation guide helps you compare areas near the waterfront and intercity terminals, rather than assuming all hotels have similar connections.",
            ],
            inlineLinks: [{ text: "Tiberias accommodation guide", to: "/travel-blog/best-hotels-in-tiberias/" }],
          },
          {
            id: "israel-eilat", title: "Eilat, the Negev and the Dead Sea",
            paragraphs: [
              "There is no operating Israel Railways passenger train to Eilat. Long-distance buses can get you there, but selected departures require seat reservation. Ramon Airport also has its own local bus links. For the Negev, the Dead Sea and desert parks, compare the actual last bus and trailhead access with a rental car or organized tour.",
              "The Eilat visitor guide and Jerusalem-to-the-Dead-Sea guide provide destination-specific advice; if arriving from Ben Gurion Airport, the airport-to-Ein-Bokek guide explains the train-and-bus connection and the hotel stops.",
            ],
            inlineLinks: [
              { text: "Eilat visitor guide", to: travelGuidePaths.eilat },
              { text: "Jerusalem-to-the-Dead-Sea guide", to: travelGuidePaths.jerusalemDeadSea },
              { text: "airport-to-Ein-Bokek guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
            ],
            sourceIds: ["guide-egged-seat-reservations", "guide-bus-planner"],
          },
        ],
      },
      {
        id: "rental-car", title: "Rental cars, private drivers and day trips",
        paragraphs: [
          "A car can simplify remote, multi-stop itineraries but is often an unnecessary expense for a trip centered on Tel Aviv and Jerusalem. Compare the complete price and practical limitations before deciding.",
        ],
        subsections: [
          {
            id: "israel-rentals", title: "When is a rental car worth it?",
            paragraphs: [
              "For a wider Galilee, Dead Sea or Negev itinerary, a rental car may save time over several buses and taxis. Include insurance, deposit, fuel, highway toll handling, parking, daily mileage limits and pickup/return hours. A rental desk may be closed on Shabbat even though driving itself is possible.",
              "Check your signed rental contract before entering restricted areas, including any journey toward Bethlehem or Palestinian Authority territory. Hertz Israel's terms explicitly prohibit entering Area A, and other companies can impose different restrictions. Coverage may not apply to prohibited roads or territory. Compare vehicle choices and booking conditions on DiscoverCars.",
            ],
            inlineLinks: [{ text: "DiscoverCars", to: "/car-rental/" }],
            highlightedLinks: [{ label: "Read the rental company's restricted-area terms", href: "https://www.hertz.co.il/en/GoodToKnow/IsraelContract/", context: "Hertz's Israeli contract is an example that prohibits driving the rental into Area A. Check your own contract and insurance before travel." }],
            sourceIds: ["guide-rental-territory"],
          },
          {
            id: "israel-drivers", title: "Private driver versus an organized guided tour",
            paragraphs: [
              "A private driver transports your group according to an agreed itinerary, but does not automatically provide a licensed guide, entrance tickets or unlimited stops. A guided tour may include guiding and specific scheduled visits, yet can be less flexible. Compare the total hours, pickup, admissions, luggage and the return journey.",
              "The private driver page describes how to arrange your own route, while the tours and day trips directory lists organized visits. Neither is a substitute for confirming the actual itinerary and total price before booking.",
            ],
            inlineLinks: [{ text: "private driver page", to: "/private-driver/" }, { text: "tours and day trips directory", to: "/tours/" }],
          },
        ],
      },
      {
        id: "weekends", title: "Travel on Shabbat and Jewish holidays",
        paragraphs: [
          "Most regular Israel Railways and public bus services stop or reduce service before Shabbat on Friday and resume only after Saturday evening; major Jewish holidays can follow similar patterns. Precise last and first departures depend on the date, region and operator. Sunset alone is not a reliable timetable.",
          "Tel Aviv's free municipal Na'im Busofash network is a local exception with selected Friday and Saturday routes. It does not replace the national system. Some local shared taxis and licensed taxis also operate, but availability must be verified before relying on them.",
          "Before planning around a holiday, check Israel's calendar of events for the dates and public-service implications, then confirm the operator timetable for your route. For flights, the airport Shabbat transport guide covers the limited Terminal 1 weekend Line 711 and authorized taxis.",
        ],
        inlineLinks: [
          { text: "Israel's calendar of events", to: "/travel-blog/israel-holidays/" },
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
        ],
        highlightedLinks: [{ label: "Na'im Busofash — weekend routes and operating hours", href: "https://busofash.co.il/", context: "Check the actual Friday or Saturday route, stop, service direction and timetable; the network is limited to participating communities." }],
        sourceIds: ["guide-weekend-network", "guide-telaviv-transit", "israel-rail"],
      },
      {
        id: "planning", title: "Popular journeys and practical travel advice",
        paragraphs: [
          "The examples below show how to decide between services, not guaranteed schedules or quotes. Check your full start and end addresses, travel date, the last return journey and any reservation rules.",
        ],
        subsections: [
          {
            id: "israel-popular-journeys", title: "Popular routes: what should you check first?",
            paragraphs: [
              "Between Tel Aviv and Jerusalem, a train is often a practical starting point, but include the transfer to the Old City or your hotel. For airport-to-Haifa journeys, pick the coastal station with the best connection to your address. Jerusalem-to-the-Dead-Sea trips depend on the onward bus and the correct resort stop; buses to Tiberias may be more relevant than rail.",
              "For detailed planning, compare the Ben Gurion Airport to Tel Aviv guide, Ben Gurion Airport to Jerusalem guide, Ben Gurion Airport to Haifa guide and Ben Gurion Airport to Ein Bokek guide instead of treating the airport arrival as the end of the journey.",
            ],
            inlineLinks: [
              { text: "Ben Gurion Airport to Tel Aviv guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
              { text: "Ben Gurion Airport to Jerusalem guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
              { text: "Ben Gurion Airport to Haifa guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
              { text: "Ben Gurion Airport to Ein Bokek guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
            ],
            tables: [{
              caption: "Common trips: the first option to compare",
              headers: ["Journey", "Try first", "Before committing"],
              rows: [
                ["Tel Aviv ↔ Jerusalem", "Train or direct bus", "Last train, Navon station exit and hotel connection"],
                ["Airport → Haifa", "Direct train when operating", "Haifa station, hotel elevation and train service date"],
                ["Jerusalem → Ein Bokek", "Scheduled Dead Sea bus", "Last southbound departure and the correct hotel stop"],
                ["Tel Aviv → Tiberias", "Intercity bus or planned regional trip", "Arrival terminal, total time and final return bus"],
              ],
              rowLinks: [
                { href: "https://route.bus.gov.il/", label: "Plan Tel Aviv–Jerusalem on the national public transport planner" },
                { to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", label: "Ben Gurion Airport to Haifa" },
                { to: "/travel-blog/jerusalem-to-the-dead-sea/", label: "Jerusalem to the Dead Sea" },
                { href: "https://route.bus.gov.il/", label: "Plan Tel Aviv–Tiberias on the national public transport planner" },
              ],
            }],
          },
          {
            id: "israel-accessibility", title: "Accessibility, luggage and travelling with children",
            paragraphs: [
              "Accessible city buses and intercity coaches are not interchangeable: many intercity vehicles have steps, and only selected services are equipped for wheelchair boarding. Egged asks travelers needing wheelchair spaces on participating accessible intercity routes to reserve in advance. Check the specific station's lifts, platform access and support before purchasing a ticket.",
              "For a stroller or several suitcases, check whether the boarding stop, train interchange and final hotel approach are manageable. Confirm any child seat with a taxi or private transfer ahead of time rather than assuming one is available on demand. Keep enough time for changing platforms and boarding with a family.",
            ],
            highlightedLinks: [{ label: "Egged — accessibility and advance booking", href: "https://www.egged.co.il/en/accessibility-statement", context: "Check accessible intercity lines, wheelchair limits and reservation instructions for the selected departure." }],
            sourceIds: ["guide-egged-accessibility"],
          },
          {
            id: "israel-last-check", title: "Before leaving: offline backup and a realistic return",
            paragraphs: [
              "Save your hotel address, departure stop, route number and last return service offline. Check live changes shortly before travel, but do not assume a mapping app will immediately reflect a road closure or special event. Prepare mobile data or a physical Rav-Kav backup before relying on an app.",
              "For a rural outing, check national-park opening rules, safe walking distances and weather conditions. Leave a backup plan if a connection is missed, especially on Friday afternoons and in the desert. My Israel eSIM guide explains connectivity options for transit apps and route updates.",
            ],
            inlineLinks: [{ text: "Israel eSIM guide", to: travelGuidePaths.esim }],
          },
        ],
      },
    ],
    checklist: [
      "Check travel dates, Shabbat and holiday changes before committing to intercity tickets.",
      "Compare door-to-door time: station location, changes, walking and hotel access.",
      "Set up and test a supported payment app or load an anonymous Rav-Kav before boarding.",
      "Validate each public transport journey using the correct method for that service.",
      "Confirm any extra Jerusalem railway voucher and any intercity seat reservation.",
      "Save your final stop, last return departure and an offline route.",
      "Check lifts, luggage arrangements, child seats and mobility access in advance.",
      "Use licensed taxi services and confirm fare basis, driver and payment method.",
      "Review rental insurance, territorial restrictions, deposits, tolls and collection hours.",
      "Before a rural or desert trip, check weather, park access and road closures.",
    ],
    faqs: [
      { q: "Can visitors travel around Israel without renting a car?", a: "Yes. Many city and intercity journeys are possible by trains, buses and light rail, with occasional licensed taxis. A car is more useful for remote or multi-stop itineraries." },
      { q: "Is a train or a bus better between Tel Aviv and Jerusalem?", a: "Compare the actual timetable and your end address. Trains can be convenient between rail stations, but Jerusalem–Yitzhak Navon is not inside the Old City. A direct bus may fit a different origin or destination better." },
      { q: "Do I need an Israeli ID to buy an anonymous Rav-Kav?", a: "No. Anonymous Rav-Kav cards generally do not require a personal ID or photo. Buy from an authorized machine or retailer and load a valid fare product before boarding." },
      { q: "Where can I buy or load Rav-Kav for the first time?", a: "Designated service centers, kiosks, some transit ticket machines and Rav-Kav Online with a compatible NFC device offer purchase or loading options. Check the current location and opening hours." },
      { q: "Can I pay cash to a bus driver?", a: "Not normally. Use a loaded Rav-Kav or an approved mobile payment app. A rail station may sell a separate ticket at machines or staffed counters." },
      { q: "Can I tap a foreign credit card on every Israeli bus?", a: "No. Egged accepts contactless international Visa and Mastercard on supported buses in Eilat, Jerusalem and metropolitan Haifa, but this is not nationwide. Card taps charge a full-fare single ride without usual passenger-profile discounts or integrated fare benefits. Carry a Rav-Kav or approved payment app as a backup." },
      { q: "How do I pay for light rail?", a: "On operating light-rail lines, buy or load an accepted ticket and validate it before boarding using the station's Rav-Kav equipment or the relevant payment app process. The exact procedure depends on the line and station." },
      { q: "Do travelers need a free voucher for the Jerusalem train?", a: "As of the August 2026 notice, yes: request a free voucher for your selected Jerusalem–Yitzhak Navon train starting 72 hours before departure on Israel Railways' planner. Verify your mobile number by SMS and save the voucher code. Carry it together with a separate valid rail ticket; reconfirm the requirement before travelling." },
      { q: "Which apps are useful for public transport in Israel?", a: "The official planner, Moovit and other supported route apps can help plan trips; approved ticketing apps such as Moovit or Rav-Pass can also validate and pay for many public transit journeys. Check current app support and card acceptance." },
      { q: "Does Israel have a metro or light rail?", a: "Jerusalem and greater Tel Aviv operate light rail along designated corridors. Haifa has the Carmelit underground funicular and Metronit rapid bus network. Future metro plans are not current operating services." },
      { q: "What is the best way to get around Haifa?", a: "Combine buses and Metronit with the Carmelit where its hillside corridor helps. The Rakbalit transit cable car serves another corridor. Check climbs between coastal rail stations and Mount Carmel hotels." },
      { q: "Do Uber or Lyft work in Israel?", a: "As of November 2026, regular Uber and Lyft passenger services are not operating in Israel. Gett and Yango are local licensed taxi booking alternatives, where available." },
      { q: "Are sherut shared taxis still operating?", a: "Some specific local sherut routes operate, but old airport services such as Nesher and Amal were discontinued. Verify an actual route and departure rather than relying on an older directory listing." },
      { q: "Does public transport run on Shabbat or Jewish holidays?", a: "Most regular rail and bus services pause or are reduced, although selected weekend local routes operate and licensed taxis may be available. Check the exact holiday date and route before travelling." },
      { q: "How do I reach Eilat or the Dead Sea without a car?", a: "Use the relevant intercity bus or bus connection, verify any seat reservation and the final stop. There is no passenger rail service to Eilat and no rail station at the Ein Bokek hotel area." },
      { q: "Are intercity buses wheelchair accessible?", a: "Not all. Some lines have steps and no wheelchair lift; participating accessible services may require advance reservation. Check the operator and exact departure." },
      { q: "Can a rented car enter Bethlehem or Palestinian Authority areas?", a: "Rental contracts can prohibit some territories and invalidate insurance coverage. For example, Hertz Israel's contract prohibits driving into Area A. Check your own rental agreement and the legal route before travel." },
      { q: "Is a private driver the same as a guided tour?", a: "No. A driver-only service does not automatically include a licensed guide, tickets or unlimited sightseeing time. Confirm the itinerary, hours, pickup and full quote." },
    ],
    faqGroups: [
      { title: "Tickets & payments", indexes: [2, 3, 4, 5, 6, 7, 8] },
      { title: "Choosing transport", indexes: [0, 1, 9, 10, 11, 12, 14] },
      { title: "Shabbat, access & practical planning", indexes: [13, 15, 16, 17] },
    ],
    sourceIds: [
      "guide-bus-planner", "guide-public-transport-payments", "guide-select-card-payment",
      "guide-ravkav-2026", "guide-ravkav-visitor", "guide-urban-transit-validation", "guide-egged-card-payment-2026",
      "israel-rail", "guide-train-nov-2026", "guide-jerusalem-train-voucher",
      "guide-weekend-network", "guide-egged-accessibility", "guide-egged-seat-reservations",
      "guide-rental-territory", "guide-haifa-carmelit", "guide-red-line",
      "guide-gett-app", "guide-uber-availability",
    ],
    related: ["telAviv", "taxis", "sherut", "shabbat", "airportTaxis", "arrival"],
    services: [
      { label: "Plan a trip to Tiberias and the Sea of Galilee", to: "/travel-blog/best-hotels-in-tiberias/", note: "Consider where to stay and how to reach regional attractions." },
      { label: "Eilat travel guide", to: travelGuidePaths.eilat, note: "Plan intercity travel and local transport in Israel's southern resort city." },
      { label: "Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea, note: "Check bus connections and hotel stops before setting off." },
      { label: "Five-day Israel itinerary", to: "/travel-blog/israel-itinerary-5-days/", note: "Group destinations and decide when public transport is practical." },
    ],
  },
telAviv: {
    id: "telAviv",
    title: "Getting Around Tel Aviv: Buses, Red Line, Taxis & Shabbat Travel",
    description: "Practical Tel Aviv transport guide: how to pay for buses and the Red Line, which train station to use, weekend buses, taxis, bikes and accessible travel.",
    intro: "Tel Aviv is easy to explore when you choose the right mode for each part of the city. Here is how to connect the beach, Jaffa, neighborhoods and railway stations, handle payments correctly and plan around Shabbat.",
    answer: "For most central Tel Aviv visits, walk between nearby sights, use city buses for wider coverage and take the Red Line of Tel Aviv's light rail (locally called Dankal) when its stops match your journey. Israel Railways is mainly for Ben Gurion Airport and other cities, not the beachfront. A licensed taxi is useful with luggage, after a late arrival or on Shabbat. Regular buses and rail normally stop for Shabbat, but the separate free Na'im Busofash network covers selected weekend routes. Confirm the last leg, boarding direction, validation method and return trip before you leave.",
    updatedAt: "2026-11-12",
    topics: ["transportation", "destinations", "tips"],
    photo: migrationPhotos["EXISTING:coast"],
    facts: [
      { label: "Best starting point", text: "Walk locally; check buses and the Red Line light rail for cross-town trips" },
      { label: "How to pay", text: "Rav-Kav card or an authorized app; card taps are not yet universal" },
      { label: "Weekend travel", text: "Normal services pause; check the free municipal weekend map", link: { text: "weekend map", href: "https://experience.arcgis.com/experience/9f4b2c7f7143485a887e8576a15ce8e7/" } },
    ],
    comparison: {
      caption: "Getting around Tel Aviv at a glance",
      headers: ["Option", "Best for", "Cost", "On Shabbat?", "What to check"],
      rows: [
        ["Walking", "Beachfront and compact sightseeing clusters", "Free", "Yes", "Actual route, heat, crossings and distance"],
        ["City bus", "Neighborhoods and cross-town journeys", "Public fare", "Regular routes stop", "Direction, stop and payment validation"],
        ["Light rail (Red Line)", "Journeys along its operating corridor", "Public fare", "No regular service", "Station location and service-line destination"],
        ["Israel Railways", "Ben Gurion Airport and intercity journeys", "Distance-based", "No regular service", "Four different Tel Aviv stations and final connection"],
        ["Licensed taxi", "Luggage, late arrivals and direct trips", "Higher, metered or agreed", "Usually available", "Pickup pin, fare basis, accessible vehicle"],
        ["Shared taxi (sherut)", "Specific fixed corridors", "Route-dependent", "Some routes may run", "Actual route, pickup and fare; not an airport guarantee"],
        ["Na'im Busofash", "Selected Friday/Saturday municipal corridors", "Free", "Yes, special service", "Weekend map, hours and last return"],
        ["Rental bike or e-scooter", "Suitable short city trips", "Rental-dependent", "Usually, subject to operator", "Age, eligibility, lane safety and parking rules"],
        ["Rental car", "Day trips outside the city", "Variable; parking extra", "Driving possible", "Parking signs, traffic, return hours and insurance"],
      ],
    },
    sections: [
      {
        id: "choose", title: "What is the best way to get around Tel Aviv?",
        paragraphs: [
          "Most visitors do not need one transport method for an entire stay. A walk may be ideal between neighboring beaches and streets, a bus can cross the city more directly than the light rail, and a taxi can finish a late journey with suitcases. Compare the whole door-to-door route, not just the time aboard.",
          "Start by choosing accommodation near the areas you actually plan to visit. For example, staying near the seafront and central streets can reduce short taxi rides; a visit to Jaffa or a business meeting east of the center may require a separate journey. The where to stay in Tel Aviv guide helps you select a practical base.",
        ],
        bullets: [
          "Plan in clusters: Old Jaffa and the port; Neve Tzedek and Rothschild; Carmel Market and central streets; or the beach and Tel Aviv Port.",
          "Check the return journey first when traveling on Friday or before a holiday.",
          "Choose the correct side of the road and the correct station exit; a short geographic distance is not always a short accessible route.",
          "If the route requires several transfers with luggage, compare the full cost of a licensed taxi.",
        ],
        inlineLinks: [{ text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" }],
        sourceIds: ["guide-telaviv-transit", "guide-bus-planner"],
      },
      {
        id: "paying", title: "How to pay for public transport in Tel Aviv",
        paragraphs: [
          "Ordinary bus drivers do not sell cash tickets. Most visitors should prepare either a loaded Rav-Kav card or an approved Israeli transport-payment app before making their first journey. Although some operators accept direct contactless Visa or Mastercard taps, that is not the same as universal tap-to-pay across buses, light rail and national rail.",
          "A valid travel product is not enough on its own: you must also validate each ride under the rules of the service you use. Fare zones and transfer entitlements may change, so check the current conditions when choosing a travel product.",
        ],
        subsections: [
          {
            id: "ta-ravkav", title: "Rav-Kav: a practical choice for visitors",
            paragraphs: [
              "An anonymous Rav-Kav is a reusable public-transport card that tourists can obtain and load at supported points. Plan where to obtain it before you arrive at a stop; not every station or shop issues a new card. A supported NFC smartphone and card-loading service can be convenient for top-ups.",
              "Tap your card on the bus validator after boarding. On the Red Line light rail, validate before entering the train, including for a valid pass or a qualifying transfer. Inspectors may ask to see the card used for validation.",
            ],
            externalLinks: [{ label: "Rav-Kav Online — card information and top-up", href: "https://ravkavonline.co.il/en/" }],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets"],
          },
          {
            id: "ta-mobile-payment", title: "Paying with an authorized transport app",
            paragraphs: [
              "Supported transport-payment apps let eligible passengers select and validate trips without a physical Rav-Kav. Set up the app, the required account or payment method and mobile data beforehand. App rules can differ by service; on the Red Line you must validate using the correct station and app QR procedure before boarding.",
              "Do not confuse a journey-planning app with a ticketing app. Some apps offer both features, but looking up a route does not pay the fare. If using a transfer benefit, complete the required new validation on each leg.",
            ],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets"],
          },
          {
            id: "ta-bank-card", title: "Can I tap a foreign credit card on a bus?",
            paragraphs: [
              "Dan publishes contactless Visa and Mastercard acceptance on its own bus services, including international-issued cards and compatible wallets. As of November 2026, Dan's official guidance lists NIS 8 for a full-fare single ride, covers one person per card and does not include a free 90-minute transfer or the usual discounts. Check for later fare updates before your journey.",
              "Do not assume the same bank-card rules apply on every bus operator, the Red Line light rail or Israel Railways. For transfers, several travelers or reduced fares, use a suitable Rav-Kav or approved ticketing app instead.",
            ],
            tables: [{
              caption: "Which ticketing method should I choose?",
              headers: ["Payment method", "Buses", "Red Line", "Important limitation"],
              rows: [
                ["Loaded Rav-Kav", "Supported across participating public services", "Yes, validate before boarding", "Load the correct product and validate every leg"],
                ["Approved payment app", "On supported services", "Yes, with station-specific validation", "Requires a compatible app, account and working phone"],
                ["Contactless bank card", "Dan and certain other supported buses only", "Do not rely on it", "Single full-fare ride; Dan card taps have no 90-minute transfer"],
                ["Cash to the driver", "Not the normal ticketing method", "Not accepted onboard", "Arrange a valid ticket or payment app first"],
              ],
                }],
            externalLinks: [{ label: "Dan — official contactless card payment rules", href: "https://www.dan.co.il/faq/credit-card-ride-validation" }],
            sourceIds: ["guide-dan-bank-card-2026", "guide-public-transport-payments", "guide-redline-tickets"],
          },
        ],
        sourceIds: ["guide-dan-bank-card-2026", "guide-public-transport-payments", "guide-redline-tickets"],
      },
      {
        id: "walking", title: "Walking: which neighborhoods work well together?",
        paragraphs: [
          "Tel Aviv is especially enjoyable on foot when you group attractions by area. The seafront promenade, neighborhood cafés, markets and low-rise streets invite short walks, but the distances between Old Jaffa, Tel Aviv Port and northern museums add up quickly. Check each route on a map rather than assuming everything labeled central Tel Aviv is close.",
          "Allow for summer heat, shade, water, busy crossings and step-free access. Walking with luggage or after a flight is very different from sightseeing without bags. The Tel Aviv beaches guide and Jaffa travel guide provide ideas for individual stops.",
        ],
        photo: { src: telAvivDizengoff, alt: "Pedestrian-friendly streets in Tel Aviv's Dizengoff area" },
        inlineLinks: [
          { text: "northern museums", to: travelGuidePaths.telAvivMuseums },
          { text: "Tel Aviv beaches guide", to: travelGuidePaths.telAvivBeaches },
          { text: "Jaffa travel guide", to: "/travel-blog/jaffa/" },
        ],
        tables: [{
          caption: "Practical walking clusters for visitors",
          headers: ["Area", "Places to combine", "When to consider a ride"],
          rows: [
            ["Old Jaffa", "Old streets, Jaffa Port and the flea market", "Returning to north Tel Aviv or with mobility limitations"],
            ["Neve Tzedek and south center", "Neve Tzedek, the old railway-station complex and Rothschild", "If your hotel is far north or east"],
            ["Carmel Market and center", "Carmel Market, Kerem HaTeimanim and nearby central streets", "In high heat or after carrying purchases"],
            ["Beach and Dizengoff", "Seafront sections, Dizengoff streets and cafés", "For longer north–south stretches"],
            ["Tel Aviv Port and Yarkon", "Port boardwalk and selected park sections", "Connecting to Old Jaffa or distant stations"],
          ],
        }],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "city-buses", title: "Using city buses in Tel Aviv",
        paragraphs: [
          "City buses serve far more streets than the Red Line of Tel Aviv's light rail system. They can connect hotels, beaches, markets, museums, university areas and neighborhoods away from the rail corridor. Routes and boarding locations change during roadworks and events, so search by your exact starting address, destination and travel time.",
          "At the stop, check the route number and direction, not just the destination name in a map result. Have a validated Rav-Kav, approved payment app or another payment method explicitly accepted by the operator. On Fridays and holidays, the final regular departure may be much earlier than you expect.",
        ],
        photo: { src: archivedBuses, alt: "City buses at a Tel Aviv metropolitan transport terminal" },
        bullets: [
          "Check the live stop and service direction, especially on one-way streets.",
          "Plan the final walk from the stop, including crossings and stroller access.",
          "Some night routes run on particular nights; do not assume the normal route is a 24-hour service.",
          "Use official operator or route-planner notices to confirm disruptions and the last return.",
        ],
        externalLinks: [{ label: "National public-transport route planner", href: "https://route.bus.gov.il/" }],
        sourceIds: ["guide-telaviv-transit", "guide-bus-planner", "guide-public-transport-payments"],
      },
      {
        id: "red-line", title: "Tel Aviv light rail: Red Line stops and how it works",
        paragraphs: [
          "The operating Red Line links parts of Tel Aviv–Jaffa with Bat Yam, Ramat Gan, Bnei Brak and Petah Tikva. It is particularly useful along the Ayalon/Begin corridor and in parts of Jaffa, but it does not run along the beachfront or directly reach many northern hotels. Future Green and Purple Line maps should not be mistaken for services already running.",
          "The Red Line has different service patterns (R1, R2 and R3, with R2 described by the operator as partially operated). Read the electronic destination signs before boarding; not every train has the same terminus. Underground and street-level stations use different layouts.",
        ],
        tables: [{
          caption: "Red Line stations and nearby places",
          headers: ["Station", "Nearby places and connections"],
          rows: [
            ["Arlozorov", "Tel Aviv Savidor Center railway station and major bus connections"],
            ["Sha'ul HaMelekh", "Tel Aviv Museum of Art and government offices"],
            ["Yehudit", "Sarona and the Begin business district"],
            ["Karlibach", "Central business district and onward bus connections"],
            ["Allenby", "Allenby Street, Rothschild Boulevard and Carmel Market area"],
            ["Elifelet", "Neve Tzedek and the southern city"],
            ["Shalma (Salame)", "Southern Jaffa and the theater district"],
            ["Bloomfield Stadium", "Bloomfield Stadium and surrounding Jaffa streets"],
          ],
        }],
        subsections: [{
          id: "ta-redline-validation", title: "Validate before you board",
          paragraphs: [
            "The Red Line requires ticketing and validation before boarding—not inside the tram. At a street-level platform, use the designated validator or ticket machine; at underground stations, follow the gate, Rav-Kav or app QR instructions. Retain the validated card or app journey for inspection.",
            "Even with a travel pass or an eligible connecting trip, validate the new leg. On leaving an underground station, follow the exit-gate process for your Rav-Kav or app. A normal bank-card tap on a Dan bus is not a light-rail ticket.",
          ],
          externalLinks: [
            { label: "NTA — the Red Line and its stations", href: "https://www.nta.co.il/en/light-rail/red-line/" },
            { label: "NTA — buying and validating Red Line tickets", href: "https://www.nta.co.il/en/buying-tickets-and-validation-machines/" },
          ],
          sourceIds: ["guide-red-line-stations-2026", "guide-urban-transit-validation"],
        }],
        sourceIds: ["guide-red-line-stations-2026", "guide-urban-transit-validation"],
      },
      {
        id: "national-rail", title: "Which Tel Aviv train station should I use?",
        paragraphs: [
          "Israel Railways is useful for Ben Gurion Airport and other cities, but Tel Aviv's four mainline stations follow the inland Ayalon corridor rather than the shore. The closest station on the map is not necessarily the best one if you need to cross traffic or make an onward bus connection.",
          "Use the Israel Railways journey planner for the specific travel date. Timetables can change, including service amendments planned for November 2026; check your actual train, airport connection and last departure. My Ben Gurion Airport to Tel Aviv guide compares onward transport to a hotel, not merely the rail journey.",
        ],
        tables: [{
          caption: "Tel Aviv's four mainline railway stations",
          headers: ["Station", "Practical orientation", "Typical reason to choose it"],
          rows: [
            ["Tel Aviv University", "North Tel Aviv, university and Expo area", "Northern destination or suitable onward local connection"],
            ["Tel Aviv Savidor Center", "Central-northern Ayalon corridor; bus connections", "Transferring to a bus or Red Line at Arlozorov"],
            ["Tel Aviv HaShalom", "Azrieli area and central business district", "Nearby offices, shopping or cross-town onward travel"],
            ["Tel Aviv HaHagana", "Southern Ayalon corridor", "Southern-area journey or an appropriate bus transfer"],
          ],
        }],
        inlineLinks: [
          { text: "Ben Gurion Airport to Tel Aviv guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
        ],
        externalLinks: [{ label: "Israel Railways — schedules and station search", href: "https://www.rail.co.il/" }],
        sourceIds: ["israel-rail", "guide-train-nov-2026"],
      },
      {
        id: "taxis", title: "Licensed taxis and taxi-booking apps",
        paragraphs: [
          "A licensed taxi is useful for a late return, a journey with suitcases, travel during Shabbat or any route where connections are inconvenient. You can arrange one through a local taxi-booking app such as Gett where available, use a taxi stand or ask your accommodation to call a licensed driver.",
          "Confirm the exact pickup point, whether the displayed fare is an estimate or an agreed total, how the meter applies and which payment methods are accepted. Ask about luggage or child seats in advance, and request a suitable accessible vehicle if required. As of November 2026, Uber and Lyft passenger booking services are not operating in Israel; the Uber alternatives guide explains the distinction.",
        ],
        inlineLinks: [
          { text: "Uber alternatives guide", to: travelGuidePaths.uber },
        ],
        links: [
          { label: "Taxis in Israel: licensing and booking", to: travelGuidePaths.taxis },
          { label: "Taxi fares and additional charges", to: travelGuidePaths.taxiFares },
        ],
        sourceIds: ["guide-gett-app", "guide-telaviv-apps", "guide-uber-availability", "taxi-passenger-rights"],
      },
      {
        id: "shared-taxis", title: "Are shared taxis (sherut) useful in Tel Aviv?",
        paragraphs: [
          "A sherut is a route-based shared vehicle, not the same as an individually booked licensed taxi. Some local corridors may operate when regular buses do not, but the routes, stops, fares and operating times differ. Do not assume that a historic route is still running or that every shared vehicle can be hailed anywhere.",
          "If you plan to use one, identify the currently operating route, direction and payment method and verify your return. In particular, former airport shared-taxi arrangements should not be presented as a current automatic connection. Read the sherut guide for the wider distinction and alternatives.",
        ],
        inlineLinks: [{ text: "sherut guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-sherut-regulation"],
      },
      {
        id: "bikes", title: "Bicycles and electric scooters",
        paragraphs: [
          "Cycling can be a pleasant way to cover the promenade, selected park routes and streets with proper bicycle infrastructure. Shared bikes and scooters generally require the operator's app, identity/payment setup and compliance with the operator's parking or service-area rules. Availability is not guaranteed at every corner.",
          "Israeli rules for electric bicycles and scooters include a minimum age of 16 and a qualification requirement. Helmets are mandatory on electric devices, riding on ordinary pedestrian pavements is prohibited, and passengers must not be carried on electric scooters. Use marked bike lanes; where absent, follow the legal road rules and take extra care at junctions. Visitors should check their eligibility before renting, rather than treating a foreign driver's licence as automatic proof.",
        ],
        bullets: [
          "Check the app's allowed parking zone and finish the rental correctly.",
          "Keep off pedestrian-only pavements and give way at crossings.",
          "Use lights at night, wear a helmet and avoid riding while using a phone.",
          "If unfamiliar with local traffic, choose a walk or public transport instead.",
        ],
        externalLinks: [{ label: "Tel Aviv-Yafo Municipality — bicycle and scooter rules", href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/BicycleEnforcement.aspx" }],
        sourceIds: ["guide-telaviv-bicycle-rules"],
      },
      {
        id: "shabbat", title: "Getting around Tel Aviv on Shabbat and holidays",
        paragraphs: [
          "Regular Israeli buses, Israel Railways and the Red Line light rail generally do not run during Shabbat. Tel Aviv and partner municipalities operate a separate free weekend network called Na'im Busofash on selected routes. It does not cover all weekday destinations, and its stops and schedule must be checked independently.",
          "As of November 2026, the operator lists 17 weekend lines and general service hours of Friday from 16:30 to 02:00 and Saturday from 09:00 to 17:30. Service hours, holiday operation and routes can change, so use the official live map or journey apps before departing. The municipality lists Line 711 between Shoham and central Tel Aviv via Ben Gurion Airport Terminal 1; do not assume that this stops at Terminal 3 or replaces ordinary airport transfers.",
          "If the free weekend network does not fit the journey, consider a licensed taxi, walking or a prearranged ride. For flights, see the dedicated Ben Gurion Airport on Shabbat guide and confirm terminal access and luggage requirements separately.",
        ],
        inlineLinks: [{ text: "Ben Gurion Airport on Shabbat guide", to: travelGuidePaths.shabbat }],
        tables: [{
          caption: "What usually runs during Shabbat?",
          headers: ["Service", "General weekend position", "Important caveat"],
          rows: [
            ["Normal city bus lines", "Generally suspended", "Do not confuse with municipal weekend lines"],
            ["Red Line light rail", "No normal Shabbat service", "Check holiday and reopening notices"],
            ["Israel Railways", "No regular Shabbat service", "Verify last and first train at each station"],
            ["Na'im Busofash", "Free on its selected weekend routes", "Separate map, schedule and stops"],
            ["Licensed taxis", "Usually bookable", "Availability, tariff and pickup vary"],
            ["Walking or cycling", "Possible", "Weather, safety and rental-provider conditions apply"],
          ],
        }],
        externalLinks: [
          { label: "Na'im Busofash — official routes, map and FAQ", href: "https://busofash.co.il/" },
          { label: "Tel Aviv Municipality — weekend lines including 711", href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" },
        ],
        sourceIds: ["guide-weekend-network", "guide-telaviv-weekend-hours", "guide-weekend-711"],
      },
      {
        id: "driving", title: "Should I rent a car or park in Tel Aviv?",
        paragraphs: [
          "For central sightseeing, a car is often less convenient than walking, local transport and occasional taxis. It becomes more useful when your trip includes several stops outside the city, rural areas or destinations with limited transit.",
          "Parking in Tel Aviv is constrained and often paid. A blue-and-white curb is not a promise of free parking: read the sign at the actual space for hours, payment and local permit restrictions. Before renting, compare insurance, deposits, allowed roads and pickup/return opening times, especially near holidays.",
        ],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "accessibility", title: "Accessibility, navigation apps and final planning",
        paragraphs: [
          "If you travel with a wheelchair, stroller or heavy luggage, check the entire route: pavement, platform entrance, working lift, service vehicle and final destination. Some bus or rail services offer level access, but the route may depend on a particular station exit or vehicle. Request an appropriately equipped licensed taxi in advance rather than assuming every available taxi can carry a wheelchair.",
          "Route planners help you compare alternatives, but live information can be incomplete during diversions and special events. Google Maps or Moovit can help with walking and route options; use the operator or Israel Railways site for authoritative station, fare and service alerts. For a longer journey beyond Tel Aviv, refer to my getting around Israel guide.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        tables: [{
          caption: "Which planning tool helps with which task?",
          headers: ["Tool", "Useful for", "Check separately"],
          rows: [
            ["Moovit or Google Maps", "Comparing walking, bus and light-rail paths", "Live disruptions, payment and stop direction"],
            ["Israel Railways planner", "Rail station and departure planning", "Final hotel connection and current service changes"],
            ["Light-rail and transit operator sites", "Red Line stations, routes and service notices", "Correct platform, payment and accessibility"],
            ["Rav-Kav or authorized payment app", "Paying and validating eligible journeys", "Account compatibility and the exact fare product"],
            ["Taxi-booking app", "Requesting a licensed taxi", "Accepted driver, fare basis and vehicle requirements"],
          ],
        }],
        sourceIds: ["guide-bus-planner", "israel-rail", "guide-egged-accessibility", "guide-red-line-stations-2026"],
      },
    ],
    nextSteps: [
      { label: "From Ben Gurion Airport to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
      { label: "Official airport taxi pickup", to: travelGuidePaths.airportTaxis },
    ],
    checklist: [
      "Choose your hotel area around your daily sightseeing clusters",
      "Check the exact bus stop, Red Line station and final walking distance",
      "Load a Rav-Kav or configure an approved transport payment app before boarding",
      "Validate each leg and confirm whether a transfer is included",
      "For a taxi, check the pickup point and fare basis before accepting",
      "For a bike or scooter, check age, qualification, helmet and parking rules",
      "Check the last return and separate weekend service when traveling on Friday or Shabbat",
      "If accessibility matters, confirm the working lift, step-free route or suitable vehicle",
    ],
    faqs: [
      { q: "Do I need a car to see Tel Aviv?", a: "Usually not for a central stay. Combine walking with buses, the Red Line when convenient, and taxis for luggage or awkward connections. A car can make more sense for multiple rural day-trip stops." },
      { q: "How do tourists pay for city buses?", a: "Use a loaded Rav-Kav, an approved payment app or a bank card only where the operator specifically supports it. Cash to the driver is not the normal method. Validate each journey." },
      { q: "Can I use a foreign Visa or Mastercard on Dan buses?", a: "Dan's November 2026 guidance accepts qualifying international Visa and Mastercard contactless cards and wallets. The listed NIS 8 charge is a full-fare single ride, for one passenger, with no free 90-minute transfer. Verify current rules and your exact operator." },
      { q: "Is my Dan bus bank-card tap valid on the Red Line?", a: "No. A contactless bank-card ride on Dan is separate from light-rail ticketing. Use a valid Rav-Kav or approved app and validate before boarding the tram." },
      { q: "Do I need to validate again when transferring?", a: "Yes. Revalidate each bus or Red Line leg even when an eligible pass or transfer means no additional payment. Direct bank-card taps on Dan do not include the usual 90-minute free transfer." },
      { q: "Does the Red Line reach Tel Aviv's beaches?", a: "Not directly along the beachfront. It serves central and southern corridors, including parts of Jaffa. Compare the final walk or a bus connection with a direct bus or taxi." },
      { q: "Which Red Line station is best for Jaffa?", a: "Shalma, Bloomfield or another southern stop may help, depending on your exact destination, but Old Jaffa and the port can require additional walking. Check the route and station exit." },
      { q: "What is the difference between R1, R2 and R3?", a: "These are service patterns on the operating Red Line with different termini; R2 is listed as partially operated. Read platform destination signs and verify the train serving your required stop." },
      { q: "Which Tel Aviv railway station should I choose for my hotel?", a: "Compare Tel Aviv University, Savidor Center, HaShalom and HaHagana by the full door-to-door connection. None is directly on the beach." },
      { q: "Is Israel Railways useful within Tel Aviv?", a: "Primarily for airport/intercity connections and selected trips along the inland rail corridor. For most city sightseeing, walking, buses, the Red Line or taxis are better suited." },
      { q: "Are there free buses in Tel Aviv on Shabbat?", a: "The Na'im Busofash municipal network runs selected routes free of charge during published weekend hours. It is separate from regular bus service. Confirm the map, actual stops and final return for your date." },
      { q: "Can weekend Line 711 get me to Ben Gurion Airport?", a: "The municipality lists a Terminal 1 stop on Line 711. Do not assume Terminal 3 service or a suitable connection for a flight; check the current schedule and terminal transfer separately." },
      { q: "Do taxis operate in Tel Aviv on Shabbat?", a: "Licensed taxis are generally available but prices, availability and waiting time vary. Arrange a ride ahead where practical, especially with luggage or an accessibility requirement." },
      { q: "Can visitors rent an electric scooter?", a: "Only if they satisfy Israeli legal and the rental company's requirements. Electric scooter and bicycle riders must be at least 16 and meet the applicable qualification rules. A helmet, legal riding area and correct parking are essential." },
      { q: "Is Tel Aviv easy to navigate with a wheelchair or stroller?", a: "It depends on the exact route. Check the pavement, lift, station exit, vehicle and last connection; request a suitable taxi in advance when needed. The weekend network publishes an advance accessibility coordination procedure." },
    ],
    faqGroups: [
      { title: "Tickets, apps and payment", indexes: [1, 2, 3, 4] },
      { title: "Walking, Red Line and railway connections", indexes: [0, 5, 6, 7, 8, 9] },
      { title: "Shabbat, taxis and practical access", indexes: [10, 11, 12, 13, 14] },
    ],
    sourceIds: [
      "guide-telaviv-transit", "guide-bus-planner", "guide-public-transport-payments",
      "guide-dan-bank-card-2026", "guide-red-line-stations-2026", "guide-urban-transit-validation",
      "israel-rail", "guide-train-nov-2026", "guide-gett-app", "guide-telaviv-apps",
      "guide-sherut-regulation", "guide-telaviv-bicycle-rules", "guide-telaviv-weekend-hours",
      "guide-weekend-network", "guide-weekend-711",
    ],
    related: ["israel", "taxis", "sherut", "shabbat", "airportTaxis", "telAvivDayTrips"],
    services: [
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Compare neighborhoods by the places you plan to visit and your transit options." },
      { label: "Explore Old Jaffa", to: "/travel-blog/jaffa/", note: "Plan the old streets, port and connections to the rest of the city." },
      { label: "Tel Aviv beaches guide", to: travelGuidePaths.telAvivBeaches, note: "Choose a stretch of shoreline and plan walking or onward transport." },
      { label: "Day trips from Tel Aviv", to: travelGuidePaths.telAvivDayTrips, note: "Decide when train, bus, tour or private car makes most sense beyond the city." },
    ],
  },

  ...taxiGuideCluster,
};

// Enrich the already-migrated Jerusalem pages while retaining their full sections.
applyJerusalemGuideEditorial(travelGuides);

// Only the selected, validated Sanity build snapshot overrides the Uber guide.
// Ordinary builds continue using the source-controlled content.
if (sanityUberGuide) travelGuides.uber = sanityUberGuide;

export type GuideDirectoryEntry = { id: string; title: string; description: string; to: LinkProps["to"]; topics: GuideTopicId[]; photo?: GuidePhoto };
export const guideDirectory: GuideDirectoryEntry[] = [
  ...itineraryIds.map((id): GuideDirectoryEntry => {
    const g = itineraries[id];
    return { id: `israel-itinerary-${id}`, title: g.title, description: g.description,
      to: g.path as LinkProps["to"], topics: ["itineraries", "destinations", "tips"],
      photo: migrationPhotos[g.hero] };
  }),
  ...attractionIds.map((id): GuideDirectoryEntry => { const g = attractionGuides[id]; return { id: `attraction-${id}`, title: g.title, description: g.description, to: attractionPath(id), topics: ["attractions","destinations",...(id.includes("mount-") || ["capernaum","tabgha"].includes(id) ? ["religion" as const] : [])], ...(g.image ? {photo:g.image}: {}) }; }),
  { id: "airport-journey-jerusalem", title: "How to get from Ben Gurion Airport to Jerusalem", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", topics: ["transportation", "tips"], photo: airportTransferPhotos["jerusalem"]! },
  { id: "airport-journey-tel-aviv", title: "How to get from Ben Gurion Airport to Tel Aviv", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", topics: ["transportation", "tips"], photo: airportTransferPhotos["tel-aviv"]! },
  { id: "airport-journey-haifa", title: "How to get from Ben Gurion Airport to Haifa", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", topics: ["transportation", "tips"], photo: airportTransferPhotos["haifa"]! },
  { id: "airport-journey-ein-bokek", title: "How to get from Ben Gurion Airport to Ein Bokek", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/", topics: ["transportation", "tips"], photo: airportTransferPhotos["dead-sea"]! },

  { id: "israel-holidays", title: "Israel Holidays Calendar: Dates & Travel Planning", description: "Select your trip dates on an interactive calendar to see which holidays could affect transport, opening hours, crowds and prices.", to: "/travel-blog/israel-holidays/" as LinkProps["to"], topics: ["tips","religion","itineraries"], photo: migrationPhotos["calendar-of-events"] },
  ...Object.values(travelGuides).map((guide) => ({ id: guide.id, title: guide.title, description: guide.description, to: travelGuidePaths[guide.id], topics: guide.topics, photo: guide.cardPhoto ?? guide.photo })),
  ...(["haifa", "ashdod"] as const).map((id): GuideDirectoryEntry => { const port = getShorePort(id); return { id: `shore-${id}`, title: port.title, description: port.description, to: port.path, topics: ["destinations", "itineraries", "transportation"], photo: port.photo }; }),
  { id: "stay-jerusalem", title: "Where to stay in Jerusalem", description: "Choose the neighbourhood and hotel style that fit your visit.", to: "/travel-blog/where-to-stay-in-jerusalem/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["jerusalem"]! },
  { id: "stay-telaviv", title: "Where to stay in Tel Aviv", description: "Compare beachfront, Jaffa and central neighbourhoods.", to: "/travel-blog/where-to-stay-in-tel-aviv/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["tel-aviv"]! },
  { id: "stay-haifa", title: "Where to stay in Haifa", description: "Understand coastal, German Colony and Carmel hotel locations.", to: "/travel-blog/best-hotels-in-haifa/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["haifa"]! },
  { id: "stay-tiberias", title: "Tiberias & Sea of Galilee hotels", description: "Lakeside bases, family facilities and practical arrival checks.", to: "/travel-blog/best-hotels-in-tiberias/", topics: ["destinations", "accommodation"], photo: { src: tiberias, alt: "Tiberias on the Sea of Galilee", credit: "Ian Scott · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" } },
  { id: "stay-deadsea", title: "Dead Sea hotels", description: "Choose Ein Bokek, a spa stay or a family hotel on the Israeli shore.", to: "/travel-blog/best-dead-sea-hotels/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["dead-sea"]! },
  { id: "masada", title: "Masada: plan your visit", description: "Cable car, entrance choices and a practical desert day trip.", to: "/travel-blog/masada/", topics: ["attractions", "itineraries", "tips"], photo: { src: masada, alt: "Masada plateau above the Dead Sea", credit: "Godot13 · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  { id: "caesarea", title: "Caesarea: visiting the ancient harbour", description: "Explore the coast, park entry and what to plan before travelling.", to: "/attractions/caesarea/", topics: ["attractions", "destinations"], photo: { src: caesarea, alt: "Caesarea's ancient coastal ruins", credit: "Zeev Stein · CC BY 2.5 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" } },
];

export function isGuideTopic(value: unknown): value is GuideTopicId { return typeof value === "string" && guideTopics.some((topic) => topic.id === value); }

/** Unknown URL parameters must not crash server-side prerendering. */
export function getGuideTopicLabel(value: unknown): string | undefined {
  return guideTopics.find((item) => item.id === value)?.label;
}

export function filterGuides(query: string, topic?: unknown) {
  const activeTopic = isGuideTopic(topic) ? topic : undefined;
  const terms = query.trim().toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  return guideDirectory.filter((guide) =>
    (!activeTopic || guide.topics.includes(activeTopic)) &&
    terms.every((term) => `${guide.title} ${guide.description} ${guide.topics.map((id) => getGuideTopicLabel(id) ?? "").join(" ")}`.toLocaleLowerCase("en").includes(term))
  );
}
