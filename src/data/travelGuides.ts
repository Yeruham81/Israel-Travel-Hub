import { ESIM_UPDATED, esimFacts, esimComparison, esimRegional, esimUsd, esimPlan } from "@/data/esimIsraelPlans";
import { guideTopics, type GuideTopicId } from "@/data/guide-topics";
export { guideTopics, type GuideTopicId } from "@/data/guide-topics";
import { itineraries, itineraryIds } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import type { LinkProps } from "@tanstack/react-router";
import { travelGuidePaths, AIRALO_COMPATIBILITY_AFFILIATE_URL, AIRALO_MENA_AFFILIATE_URL, type TravelGuideId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { cityStayGuides, tiberiasStayGuide, deadSeaStayGuide } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import navonPlatform from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import archivedBuses from "@/assets/guides/2026-11/buses-in-tel-aviv.webp";
import sherutNesherCardPhoto from "@/assets/guides/sherut-nesher-airport.webp";
import sherutLocalTaxisPhoto from "@/assets/guides/sherut-local-taxis.webp";
import jerusalemLightRail from "@/assets/guides/2026-11/jerusalem-light-rail.webp";
import telAvivLightRail from "@/assets/guides/2026-11/tel-aviv-light-rail.webp";
import esimPhoto from "@/assets/guides/esim-israel.jpeg";
import { expandedTravelGuides } from "@/data/travelGuideExpansion";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath, isRegionalOverview } from "@/data/attractionGuideTypes";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { applyJerusalemGuideEditorial } from "@/data/jerusalemClusterEditorial";
import { christianFaqs, christianToursHero } from "@/data/christianToursGuide";
import { seniorFaqs, seniorHero, seniorUpdatedAt } from "@/data/seniorToursGuide";
import { deadSeaAttractionsUpdatedAt } from "@/data/deadSeaAttractionsGuide";
import { telAvivAttractionsUpdatedAt } from "@/data/telAvivAttractionsGuide";

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
  seniorTours: {
    id: "seniorTours",
    title: "Israel Tours for Seniors: Private Day Trips at Your Own Pace",
    description: "Plan comfortable Israel tours for seniors with private transport, flexible sightseeing and day trips to Jerusalem, Masada, the Galilee and coast.",
    intro: "My personal guide to unhurried, carefully planned day trips for older visitors who appreciate private transport, manageable walks and the freedom to choose their own pace.",
    answer: "A private day trip with a driver allows you to visit several attractions at your own pace, with convenient pickups, shorter walks and time for rest breaks. Choose an itinerary that suits your pace and discuss any accessibility or special vehicle requirements before booking.",
    updatedAt: seniorUpdatedAt,
    topics: ["tips", "itineraries", "transportation", "destinations"],
    photo: seniorHero,
    facts: [],
    comparison: {caption:"Choose a comfortable sightseeing pace",headers:[],rows:[]},
    sections:[],
    checklist:[],
    faqs:seniorFaqs,
    sourceIds:[],
    related:["jerusalem","israel","christianTours","travelTips"],
    services:[{label:"Ask me about a private driver",to:"/private-driver-in-israel/"}],
  },
  christianTours: {
    id: "christianTours",
    title: "Christian Tours in Israel: Biblical Sites & Pilgrimage Routes",
    description: "Plan Christian tours in Israel: Jerusalem, Bethlehem, Nazareth, Sea of Galilee and Jordan River baptism sites, with itinerary tips and guided day trips.",
    intro: "My practical introduction to Christian pilgrimage and biblical heritage sites in Jerusalem, Bethlehem, Nazareth and Galilee, with suggested journeys and trusted resources.",
    answer: "Begin with Jerusalem, then choose Bethlehem and/or Galilee based on your time, interests and current transport arrangements. Group sites by area, and check church access and guided-tour details before travelling.",
    updatedAt: "2026-11-21",
    topics: ["religion", "itineraries", "attractions", "destinations"],
    photo: christianToursHero,
    facts: [],
    comparison: { caption: "Christian sites planning", headers: [], rows: [] },
    sections: [],
    checklist: [],
    faqs: christianFaqs,
    sourceIds: ["guide-holy-sepulchre", "guide-qasr", "guide-yardenit"],
    related: ["jerusalemChurches", "bethlehem", "baptism", "jerusalem"],
    services: [{label: "Private driver in Israel", to: "/private-driver-in-israel/"}],
  },
  uber: {
    id: "uber",
    title: "Is Uber Available in Israel? Gett & Yango Taxi Alternatives",
    description: "Is Uber available in Israel? Compare Gett, Yango, licensed taxis and private transfers, with practical tips for Ben Gurion Airport, fares and Shabbat.",
    intro: "Uber and Lyft do not currently offer passenger rides in Israel. Here's how to choose between local taxi apps, licensed taxis and pre-booked transfers.",
    answer: "For app-based taxi booking, try Gett or Yango, depending on driver availability. You can also use licensed taxi stands, hotel dispatchers or pre-booked private transfers. At Ben Gurion Airport, official on-demand taxis use the Gett ordering system or self-service kiosks.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-24",
    photo: { src: "/images/home/uber-in-israel-phone-question.webp", alt: "Illustration of a phone asking about Uber availability in Israel" },
    facts: [
      { label: "Uber & Lyft", text: "No passenger ride-booking service currently available" },
      { label: "Taxi-booking apps", text: "Gett and Yango; availability varies by location and time" },
      { label: "Airport arrival", text: "Gett app or official kiosk for the licensed airport taxi queue" },
    ],
    nextSteps: [
      { label: "How taxis in Israel work", to: travelGuidePaths.taxis },
      { label: "Official taxi fares and tariff hours", to: travelGuidePaths.taxiFares },
      { label: "Ben Gurion Airport taxi pickup", to: travelGuidePaths.airportTaxis },
      { label: "Airport travel on Shabbat", to: travelGuidePaths.shabbat },
    ],
    comparison: {
      caption: "Compare your ride options in Israel",
      headers: ["Service", "How it works", "Pricing", "Best for"],
      rows: [
        ["Gett", "Request a licensed taxi through the app; Gett also runs the official airport taxi ordering system", "Regulated metered fare or displayed offer, depending on the booking", "Everyday app bookings and Ben Gurion Airport taxis"],
        ["Yango", "Book a licensed taxi through the app in areas served by Yango.", "Check the displayed estimate or fixed offer before confirming", "App-based rides in supported areas"],
        ["Licensed taxi or hotel dispatcher", "Use a licensed taxi stand, hail a taxi or ask a hotel or local dispatch office", "Regulated taxi meter and permitted charges; confirm payment method", "Travellers who prefer booking without an app"],
        ["Pre-booked private transfer", "Book a private vehicle and agree on the pickup details in advance.", "Confirmed quote with agreed vehicle, waiting and cancellation terms", "Airport arrivals, longer routes, groups and extra luggage"],
      ],
    },
    sections: [
      {
        id: "uber-status",
        title: "Is Uber available in Israel?",
        paragraphs: [
          "Uber and Lyft currently have no passenger ride-booking service in Israel.",
          "On 24 March 2026, a proposal concerning app-based rides in private cars passed its first reading in the Knesset. The proposal must pass further legislative stages before the new service can begin. See the Knesset's official announcement for the proposal's recorded status.",
        ],
        externalLinks: [
          { label: "Uber - official Israel information", href: "https://www.uber.com/il/en/" },
          { label: "Knesset - March 2026 legislative announcement", href: "https://main.knesset.gov.il/News/PressReleases/pages/press24032026p.aspx" },
        ],
        sourceIds: ["guide-uber-availability", "guide-lyft-cities", "guide-ridesharing-bill-2026"],
      },
      {
        id: "taxi-apps",
        title: "Gett and Yango: booking a taxi with an app",
        paragraphs: [
          "Gett lets you request a licensed taxi, enter your destination and review the booking information. Check the pickup pin, the offered fare or estimate, and your payment method before confirming a ride. Drivers and features vary by location.",
          "Yango is another option for requesting licensed taxis where it operates. Check the pickup location, the quoted or estimated price and the available payment method in the app before booking.",
          "Download your preferred taxi app and set up your account before travelling. The official App Store and Google Play listings below take you directly to the passenger apps.",
        ],
        externalLinks: [
          { label: "Gett for iPhone", href: "https://apps.apple.com/il/app/id412802326" },
          { label: "Gett for Android", href: "https://play.google.com/store/apps/details?id=com.gettaxi.android" },
          { label: "Yango for iPhone", href: "https://apps.apple.com/il/app/id1437157286" },
          { label: "Yango for Android", href: "https://play.google.com/store/apps/details?id=com.yandex.yango" },
        ],
        sourceIds: ["guide-gett-app", "guide-gett", "guide-yango-israel"],
      },
      {
        id: "fares-options",
        title: "Other taxis, fares and payment",
        paragraphs: [
          "You can also get a taxi from a licensed stand, hail one on the street, call a local dispatcher or ask your hotel to book one. Confirm the pickup location, how the fare will be calculated and the accepted payment methods. My taxis in Israel guide covers passenger rights and booking methods.",
          "Israeli taxi fares are regulated. The total can vary with distance, traffic, time of day and permitted surcharges. An app may display an estimate rather than a fixed fare, so read the booking screen carefully. My taxi fares guide explains meter tariffs and extra charges.",
          "Check whether cash or card payment is available for your booking, especially if you use a foreign-issued card. Around Tel Aviv's pedestrian areas, Jerusalem's Old City or Haifa's steep streets, a precise pickup pin and hotel entrance can make the meeting easier.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "taxi fares guide", to: travelGuidePaths.taxiFares },
        ],
        sourceIds: ["taxi-passenger-rights", "taxi-fares-2026", "guide-telaviv-apps", "guide-gett", "guide-yango-israel"],
      },
      {
        id: "airport",
        title: "Getting a taxi at Ben Gurion Airport",
        photo: hallPhoto,
        paragraphs: [
          "For an immediate licensed taxi, order through Gett or an airport self-service kiosk and save the ride code. At Terminal 3, join the official taxi queue on the ground floor by Exit 03. At Terminal 1, use the main arrivals exit. Show your code when directed to the taxi.",
          "For a Gett ride scheduled at least two hours in advance, Terminal 3 pickup is on Level 2 by Exit 23. This differs from the on-demand queue at Exit 03. See Gett's airport guide for both pickup locations.",
          "A separately booked private transfer can have its own meeting instructions. Follow the confirmation from your operator. For more details, see my Ben Gurion Airport taxis guide or arrange a private airport transfer.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/airport-transfers/" },
        ],
        highlightedLinks: [
          { label: "Gett - official Ben Gurion Airport taxi instructions", href: "https://www.gett.com/il/airport-en/", context: "On-demand queue, ride codes and advance-booked pickup points." },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "shabbat",
        title: "Taxi apps during Shabbat and late at night",
        paragraphs: [
          "Licensed taxis may operate during Shabbat, Jewish holidays and late at night, although driver availability depends on the location. I recommend booking in advance for airport pickups or journeys where timing is important.",
          "Night, weekend and holiday tariffs can be higher. Check my guide to airport travel on Shabbat for transport options and the Israeli taxi fares guide for regulated charges.",
        ],
        inlineLinks: [
          { text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" },
          { text: "guide to airport travel on Shabbat", to: travelGuidePaths.shabbat },
          { text: "Israeli taxi fares guide", to: travelGuidePaths.taxiFares },
        ],
        sourceIds: ["guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "practical-tips",
        title: "Practical tips before your first ride",
        paragraphs: [
          "Save your hotel name and street address, keep mobile data available, and check that the driver and vehicle match the booking before boarding. An address written in Hebrew can help if a pickup point is unclear.",
          "If you need child seats, wheelchair access or extra luggage space, request a suitable vehicle in advance. For longer routes, compare transport options in my getting around Israel guide or consider a confirmed private driver.",
          "See my Israel eSIM guide for mobile data options during your stay.",
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "private driver", to: "/private-driver-in-israel/" },
          { text: "Israel eSIM guide", to: travelGuidePaths.esim },
        ],
        sourceIds: ["guide-gett-app", "guide-yango-israel", "taxi-passenger-rights"],
      },
    ],
    checklist: [
      "Install and verify a taxi app before travel if you plan to use one",
      "Save your pickup and destination addresses and check the location pin",
      "Review whether the quoted fare is fixed or estimated and confirm your payment method",
      "Verify the driver and vehicle before boarding",
      "At Ben Gurion Airport, follow the official Gett or kiosk instructions for your booking type",
      "Confirm child seats, accessibility, luggage and other vehicle requirements in advance",
    ],
    faqs: [
      { q: "Can I pay with a foreign credit card?", a: "A foreign-issued card may work, but acceptance varies by app and transaction. Check your chosen app's payment options before requesting a taxi and keep a backup payment method." },
      { q: "Can I get a taxi without a smartphone?", a: "Yes. Use a licensed taxi stand, a local dispatcher or a hotel-booked taxi. Ben Gurion Airport also has self-service kiosks for the authorized on-demand queue." },
      { q: "Can I request child seats, a minivan or an accessible vehicle?", a: "Some providers can arrange special equipment or a suitable vehicle with advance notice. Confirm your equipment or accessibility request directly when booking a taxi." },
      { q: "Are taxi apps available on Shabbat?", a: "Licensed taxis can operate during Shabbat and holidays, but local driver availability varies. Plan important pickups ahead." },
    ],
    sourceIds: ["guide-uber-availability", "guide-lyft-cities", "guide-ridesharing-bill-2026", "guide-gett-app", "guide-yango-israel", "guide-gett", "guide-iaa", "taxi-fares-2026"],
    related: ["taxis", "taxiFares", "airportTaxis", "shabbat", "sherut", "israel"],
    services: [
      { label: "Airport Transfers", to: "/airport-transfers/", note: "Plan a private airport pickup." },
      { label: "Private Driver Service", to: "/private-driver-in-israel/", note: "Arrange your own driver and vehicle." },
      { label: "Taxis in Israel", to: travelGuidePaths.taxis, note: "Understand licensed taxi services." },
      { label: "Taxi Fares", to: travelGuidePaths.taxiFares, note: "Check tariffs and permitted extras." },
      { label: "Getting Around Israel", to: travelGuidePaths.israel, note: "Compare public and private transport." },
      { label: "Israel eSIM", to: travelGuidePaths.esim, note: "Stay connected on arrival." },
    ],
  },
  sherut: {
    id: "sherut",
    title: "Is There Still a Sherut from Ben Gurion Airport? Current Options",
    description: "Are sherut taxis still running in Israel? Understand local shared taxis, the end of Nesher and Amal airport services, Ben Gurion alternatives and Shabbat transport.",
    intro: "The former Nesher and Amal shared taxis from Ben Gurion Airport have ended. Here's how local sherut minibuses work in Israel and which transport options now serve airport arrivals.",
    answer: "Regular Nesher sherut rides to Jerusalem and Amal shared taxis to Haifa no longer operate from Ben Gurion Airport. Today, choose a train, suitable bus, licensed airport taxi or confirmed private transfer. Local sherut minibuses still operate on some routes elsewhere in Israel; commercial shared shuttles are booked separately.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-24",
    photo: { src: sherutNesherCardPhoto, alt: "Former Nesher yellow-and-white shared shuttle van at Ben Gurion Airport" },
    facts: [
      { label: "Nesher & Amal airport sherut", text: "Former scheduled shared rides to Jerusalem and Haifa — ended" },
      { label: "Local sherut minibuses", text: "Local shared taxis still operate in some cities" },
      { label: "Airport arrivals today", text: "Train, scheduled bus, authorized taxi or private transfer" },
    ],
    comparison: {
      caption: "Sherut, shuttle, taxi or private transfer?",
      headers: ["Ride type", "How it works", "When it is useful"],
      rows: [
        ["Local sherut (monit sherut)", "Shared minibus on a set route; each passenger pays for a seat", "Short trips along a local route when that service is running"],
        ["Pre-booked shared shuttle", "Book an individual seat on a scheduled shared shuttle", "Travellers looking for a pre-booked shared ride"],
        ["Licensed airport taxi", "Exclusive taxi for your party, ordered via Gett or an airport kiosk", "Direct airport travel without sharing the vehicle"],
        ["Private transfer", "Dedicated vehicle arranged in advance for your group", "Airport arrivals, families and travellers with extra luggage"],
      ],
    },
    sections: [
      {
        id: "nesher-amal",
        title: "What happened to the Nesher and Amal airport sheruts?",
        paragraphs: [
          "The regular Nesher shared taxi service from Ben Gurion Airport to Jerusalem and the former Amal service to Haifa have ended. Visitors arriving today use the current rail, bus and taxi services or arrange a private pickup.",
          "Older airport guides may still show collection points for these former services.",
        ],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "local-sherut",
        title: "How local sherut taxis work in Israel",
        photo: {
          src: sherutLocalTaxisPhoto,
          alt: "Two yellow-and-white shared sherut minibus taxis parked on a street in Tel Aviv",
          credit: "Leineabstiegsschleuse · Wikimedia Commons · public domain",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Sherut.JPG",
        },
        paragraphs: [
          "A monit sherut (מונית שירות) is usually a yellow shared minibus travelling along a numbered route. Look for its route number and destination on the front windshield. Each passenger pays an individual fare.",
          "At a safe, permitted place along the route, signal to a driver to stop and tell them where you would like to get off. The driver follows the designated route, and pickup or drop-off arrangements vary. Ask about the fare and whether to pay cash or another way before boarding.",
          "Local sherut minibuses still operate in some areas, including parts of Tel Aviv. Service frequency varies by route. Space for large suitcases, prams and other equipment can be limited. For wider city and intercity transport choices, see my getting around Israel guide and getting around Tel Aviv guide.",
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv },
        ],
        sourceIds: ["guide-sherut-regulation", "guide-telaviv-transit"],
      },
      {
        id: "airport-alternatives",
        title: "Getting from Ben Gurion Airport to your destination",
        paragraphs: [
          "Trains from Terminal 3 connect Ben Gurion Airport with several major cities. Choose the station with the most convenient connection to your hotel. For a direct journey, compare the licensed airport taxi queue with a confirmed private transfer.",
          "My guides to Jerusalem, Tel Aviv, Haifa and Ein Bokek explain the transport options from Ben Gurion Airport. For Friday and Saturday journeys, my airport Shabbat guide explains the available transport.",
        ],
        inlineLinks: [
          { text: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { text: "airport Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        tables: [{
          caption: "Ben Gurion Airport transport by destination",
          headers: ["Destination", "Transport choices", "Arrival station and hotel connections"],
          rows: [
            ["Jerusalem", "Train, authorized taxi or private transfer", "Jerusalem–Yitzhak Navon station; continue to the hotel by light rail or local transport"],
            ["Tel Aviv", "Train, suitable bus, authorized taxi or private transfer", "Choose Tel Aviv HaHagana, HaShalom, Savidor Center or University according to your address"],
            ["Haifa", "Train, authorized taxi or private transfer", "Choose Haifa Hof HaCarmel, Bat Galim or HaMerkaz HaShmona for your final destination"],
            ["Dead Sea / Ein Bokek", "Bus connection via Jerusalem, authorized taxi, private transfer or rental car", "Take the train to Jerusalem and continue by bus to Ein Bokek."],
          ],
          rowLinks: [
            { to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
            { to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
            { to: "/travel-blog/ben-gurion-airport-to-haifa/" },
            { to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          ],
        }],
        highlightedLinks: [
          { label: "Israel Railways - journey planner", href: "https://www.rail.co.il/", context: "Timetables, stations and rail connections." },
          { label: "National public transport journey planner", href: "https://bus.gov.il/en/home", context: "Current bus routes and departures for your travel day." },
        ],
        sourceIds: ["guide-iaa", "israel-rail", "guide-gett"],
      },
      {
        id: "official-taxi",
        title: "Licensed airport taxis and the free terminal shuttle",
        paragraphs: [
          "For an immediate licensed taxi, request your ride code through Gett or an airport self-service kiosk. At Terminal 3, the authorized taxi queue is on the ground floor by Exit 03. At Terminal 1, use the main arrivals exit. A licensed airport taxi takes you and your group directly to your destination and charges a regulated metered fare.",
          "A Gett taxi scheduled at least two hours ahead has a different Terminal 3 collection point: Level 2, Gate 23. My Ben Gurion Airport taxis guide explains the pickup procedures, and the taxi fares in Israel guide covers regulated charges.",
          "The free airport shuttle connects Terminals 1 and 3 with other airport facilities. From Terminal 3, find it on Level G near Gate 01. The shuttle operates exclusively within the airport complex. See my Ben Gurion Airport arrival guide for terminal guidance.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares },
          { text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival },
        ],
        highlightedLinks: [
          { label: "Gett - official airport taxi pickup instructions", href: "https://www.gett.com/il/airport-en/", context: "Where to join the taxi queue and meet pre-booked Gett drivers." },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "weekend",
        title: "Sherut and airport transport on Shabbat",
        paragraphs: [
          "Some local shared-taxi routes operate during Shabbat and Jewish holidays, but their availability depends on the particular line. The former regular Nesher and Amal airport services are no longer available, and trains and most ordinary buses pause for much of Shabbat.",
          "Free weekend Line 711 links Shoham with central Tel Aviv via Ben Gurion Airport Terminal 1 on limited Friday and Saturday departures. Its operating hours vary between winter and summer. The airport Shabbat transport guide explains the timetable, Terminal 3 connections and taxi alternatives.",
        ],
        inlineLinks: [
          { text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" },
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
        ],
        sourceIds: ["guide-weekend-711", "guide-weekend-timetable", "guide-iaa"],
      },
      {
        id: "booked-shared",
        title: "Booking a shared airport shuttle in advance",
        paragraphs: [
          "Commercial shared shuttles offer individual seats that can be booked in advance. Local sherut minibuses pick up passengers along designated routes. Choose a shuttle departure that suits your flight's arrival time and destination.",
          "Before paying, confirm the operator and departure, exact pickup and drop-off points, total price per seat, luggage allowance, child-seat or accessibility needs, flight-delay arrangements and cancellation terms. Keep the written confirmation. You can also request a dedicated airport transfer for your own group.",
        ],
        inlineLinks: [{ text: "dedicated airport transfer", to: "/airport-transfers/" }],
        sourceIds: [],
      },
    ],
    checklist: [
      "Choose an available airport transport service",
      "Keep your arrival terminal, flight details and full destination address handy",
      "Compare rail or bus connections with an official airport taxi or private transfer",
      "For local sherut rides, check the route number, boarding location, fare and payment method",
      "Confirm space for luggage, child seats or accessibility equipment before booking",
      "On Friday or Saturday, check the seasonal Line 711 timetable and terminal connections",
    ],
    faqs: [
      { q: "How do I pay for a local sherut ride?", a: "You pay for your own seat. Fares and accepted payment methods depend on the route, so ask the driver about the fare and payment before boarding." },
      { q: "Can I reserve a seat on a sherut or shared shuttle?", a: "A local route-based sherut usually accepts passengers along its route as space allows. A separate commercial shared shuttle may require advance booking and written confirmation for a specific departure." },
      { q: "Can I bring large suitcases on a sherut?", a: "Capacity in shared minibuses can be limited. If you're travelling with large suitcases, a stroller or mobility equipment, consider booking a private vehicle with enough space." },
      { q: "Does a sherut or airport bus run on Shabbat?", a: "Some local sherut routes operate, but the former regular airport sheruts have ended. Free weekend Line 711 serves Terminal 1 on selected departures, with seasonal operating hours." },
      { q: "What's the difference between a sherut and a pre-booked shared shuttle?", a: "A local sherut normally follows a numbered public route and takes passengers along that line. A pre-booked shared shuttle offers reserved seats at scheduled departure times, with its own booking conditions." },
    ],
    sourceIds: ["guide-iaa", "guide-gett", "israel-rail", "guide-weekend-711", "guide-weekend-timetable", "guide-sherut-regulation", "guide-telaviv-transit"],
    related: ["shabbat", "airportTaxis", "taxis", "arrival", "israel", "taxiFares"],
    services: [
      { label: "Airport Transfers", to: "/airport-transfers/", note: "Arrange a confirmed pickup from Ben Gurion." },
      { label: "Private Driver Service", to: "/private-driver-in-israel/", note: "Travel in a vehicle reserved for your group." },
      { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", note: "Train, taxi and private transfer options." },
      { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/", note: "Compare stations and arrival choices." },
      { label: "Airport to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/", note: "Choose rail, taxi or direct pickup." },
      { label: "Israel eSIM", to: travelGuidePaths.esim, note: "Use maps and booking details after landing." },
    ],
  },
  esim: {
    id: "esim",
    title: "Best eSIM for Israel: Prices, Providers & My Picks",
    description: "Compare Israel eSIM prices for short trips, longer stays and heavy data use. My picks for 3GB, 5GB, 10GB and unlimited travel plans.",
    intro: "Choosing an eSIM for Israel? Here are my picks for a short break, a longer holiday and travellers who need unlimited data.",
    answer: "I would start with Saily for a short trip or everyday use and Airalo for 10GB over 30 days. For unlimited data, I would choose GigSky, with 3.5GB of high-speed data per day.",
    updatedAt: ESIM_UPDATED,
    topics: ["connectivity", "tips"],
    photo: { src: esimPhoto, alt: "A phone displaying an eSIM graphic in front of a blurred city background", sourceUrl: "", credit: "Illustrative eSIM screen." },
    facts: esimFacts,
    comparison: esimComparison,
    sections: [
      {
        id: "short-trip",
        title: "Compare prepaid eSIM data plans",
        paragraphs: ["For a week of using maps, messaging and occasional browsing, I recommend a small data package that covers your stay. My choice: Saily."],
        sourceIds: ["guide-esim-saily", "guide-esim-airalo-fixed", "guide-esim-yesim", "guide-esim-gigsky"],
      },
      {
        id: "unlimited",
        title: "Compare unlimited eSIM plans",
        paragraphs: ["Choose the number of days that covers your whole trip. Unlimited plans still have high-speed limits or operator fair-use policies. For heavy daily use, GigSky combines competitive prices with a 3.5GB daily high-speed allowance. My choice: GigSky.", "Airalo also lists a fixed 50GB plan for 30 days at " + esimUsd(esimPlan("Airalo",50,30).amount) + ". If that covers your needs, it can be a practical alternative to daily speed limits."],
        sourceIds: ["guide-esim-airalo", "guide-esim-airalo-fup", "guide-esim-saily", "guide-esim-saily-fup", "guide-esim-yesim", "guide-esim-yesim-15", "guide-esim-gigsky", "guide-esim-gigsky-fup", "guide-esim-yesim-7", "guide-esim-yesim-30"],
      },
      {
        id: "features",
        title: "Compare eSIM provider features",
        paragraphs: ["Compare network coverage, hotspot use, top-up options and activation rules as well as prices."],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim", "guide-esim-gigsky-activation"],
      },
      {
        id: "long-trip",
        title: "How much data do you need in Israel?",
        paragraphs: ["For one to three weeks of navigation and browsing, 5GB is a reasonable starting point. If you frequently upload photos or make video calls, consider 10GB or more. For a month with 10GB, my choice is Airalo."],
        sourceIds: ["guide-esim-airalo-fixed", "guide-esim-saily"],
      },
      {
        id: "payg",
        title: "Pay-as-you-go eSIM for Israel",
        paragraphs: ["With Drimsim, you pay only for the data you use. It may suit occasional use or a backup connection, while a prepaid package can be more economical for daily navigation and social media."],
        sourceIds: ["guide-esim-drimsim"],
      },
      {
        id: "regional",
        title: "Best eSIM for a Middle East trip",
        paragraphs: [
          "Combining Israel with Jordan, Egypt or other countries? Airalo's Middle East & North Africa regional eSIM can cover several destinations with one plan. A listed option is " + esimRegional.gb + "GB for " + esimRegional.days + " days at " + esimUsd(esimRegional.usd).replace(/\.00$/, "") + ". Before buying, confirm coverage for Israel and each additional destination, including access to Palestinian networks if your trip includes the West Bank. My choice: Airalo.",
        ],
        externalLinks: [
          { label: "View Airalo's Middle East & North Africa plans", href: AIRALO_MENA_AFFILIATE_URL },
        ],
        sourceIds: ["guide-esim-airalo-mena"],
      },
      {
        id: "compatibility",
        title: "Will an eSIM work on your phone?",
        paragraphs: [
          "Use Airalo's compatibility checker to find out whether your phone supports eSIM. Check your exact model and regional version before purchasing a plan.",
          "Your phone also needs to be unlocked. Many phones can keep a home SIM active for calls and messages while using a travel eSIM for data.",
        ],
        externalLinks: [
          { label: "Check whether your phone supports eSIM", href: AIRALO_COMPATIBILITY_AFFILIATE_URL },
        ],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily"],
      },
      {
        id: "calling",
        title: "Do you need calls, SMS or an Israeli number?",
        paragraphs: [
          "A data-only eSIM lets you browse, navigate and use WhatsApp or FaceTime calls. Ordinary calls, SMS and a local number require a plan that specifically includes those services.",
          "Airalo also offers some Israel plans with data, call minutes and SMS. Saily sells optional calls and texts with a US number, not an Israeli number. If you need standard mobile calls, choose a plan that includes them and compare the included minutes and phone number.",
          "You can usually keep your home SIM active for WhatsApp and verification messages while using the travel eSIM for data. For a local Israeli number, look for a plan that specifically provides one or consider a local operator.",
        ],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily"],
      },
      {
        id: "coverage",
        title: "Will it work throughout Israel?",
        paragraphs: [
          "Mobile coverage is generally better in major cities than in remote parts of the Negev, Galilee and Dead Sea region. Your eSIM's local network also affects reception.",
          "Visiting Bethlehem, Jericho or other parts of the West Bank? Check whether your Israel eSIM includes Palestinian mobile networks if you plan to visit areas served by them. Coverage may differ across the area, so confirm the relevant network before you go.",
        ],
        sourceIds: ["guide-esim-yesim", "guide-esim-airalo"],
      },
      {
        id: "setup",
        title: "How to install and activate your eSIM",
        paragraphs: [
          "Install your eSIM over Wi-Fi before departure. Check when your eSIM plan starts and keep your regular SIM active if you need to receive verification codes by SMS. Ordinary calls and texts on your home line can still incur roaming fees.",
        ],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily"],
      },
    ],
    checklist: [
      "Confirm that your phone supports eSIM and is unlocked",
      "Choose around 3GB for a short trip, 5–10GB for a longer stay, or unlimited for heavy use",
      "Choose a plan that covers your trip dates",
      "Check calls, hotspot use and coverage where you'll travel",
      "Install the eSIM over Wi-Fi before departure, and check when your plan starts",
      "On arrival select the travel eSIM for mobile data; follow its roaming instructions and prevent roaming charges on your home SIM",
    ],
    faqs: [
      { q: "Can I keep my WhatsApp number with a travel eSIM?", a: "Yes. WhatsApp normally stays linked to your existing number while you use the travel eSIM for internet access. You do not need to change your WhatsApp number." },
      { q: "Can I use my eSIM as a hotspot for a laptop?", a: "Many travel eSIMs allow tethering, but the limits vary by provider. For work or frequent video calls, pay attention to the amount of high-speed data included each day." },
      { q: "What happens when my fixed-data eSIM runs out?", a: "Your mobile data service may stop until you buy a top-up or another plan. Check the provider's top-up options before your trip." },
      { q: "Will my Israel eSIM work in Bethlehem or Jericho?", a: "Coverage in the West Bank depends on the networks included in your plan. Israeli coverage alone does not guarantee access to Palestinian networks." },
      { q: "Do travel eSIMs give me an Israeli number?", a: "Most basic travel eSIMs include mobile data only. If you need calls, SMS or an Israeli phone number, choose a plan that specifically includes those services." },
      { q: "Can I buy an eSIM after arriving in Israel?", a: "Yes, you can buy online at any time. I recommend arranging it before the flight, so you can use maps, messages and booking details as soon as you land." },
    ],
    sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-saily-usd-price-nov26", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"],
    related: ["arrival", "airportTaxis", "uber", "taxis", "israel", "shabbat"],
    services: [
      { label: "Airport transfers", to: "/airport-transfers/", note: "Choose a confirmed pickup or compare ways to leave Ben Gurion Airport." },
      { label: "Tours & day trips", to: "/tours/", note: "Explore city tours, day trips and private sightseeing options." },
      { label: "Where to stay in Israel", to: "/accommodation/", note: "Find suitable areas and accommodation guides." },
      { label: "Israel itinerary: 7 days", to: "/travel-blog/israel-itinerary-7-days/", note: "See a practical first-time route through the country." },
      { label: "Private driver in Israel", to: "/private-driver-in-israel/", note: "Arrange a private ride or sightseeing day." },
      { label: "Israel travel tips", to: travelGuidePaths.travelTips, note: "Prepare for your arrival and everyday travel." },
    ],
    providerPageId: "guide-esim",
  },
  arrival: {
    id: "arrival",
    title: "Ben Gurion Airport Arrivals Guide: Passport Control, Bags & Transport",
    description: "Arriving at Ben Gurion Airport? Follow Terminal 3 arrivals, passport control, baggage claim, customs and the best way to reach your hotel.",
    intro: "I'll walk you through the arrival process at Ben Gurion Airport, from passport control and collecting bags to customs, airport services and reaching your destination.",
    answer: "For an international arrival at Terminal 3, follow the signs to passport control, collect your bags, pass through customs and enter the public arrivals hall. Have any required visa or ETA-IL arranged before you fly and keep your accommodation address handy. From arrivals, follow the route to your confirmed pickup, the official taxi queue, the railway station or a bus stop.",
    topics: ["tips", "transportation"],
    updatedAt: "2026-11-24",
    photo: { src: "/images/travel-blog/featured-ben-gurion-arrival.webp", alt: "Welcome to Israel sign at Ben Gurion Airport arrivals" },
    facts: [
      { label: "International arrivals", text: "Terminal 3; check current airport notices" },
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
        ["Before the flight", "Check entry requirements, ETA-IL or visa requirements and flight details", "Passport, approval, hotel and onward-travel details"],
        ["Passport control", "Follow arrivals and immigration signage and staff instructions", "Passport, entry documents and travel details"],
        ["Baggage claim", "Find your flight's carousel; report missing or damaged luggage to the airline or handler", "Baggage tag, report number and delivery address"],
        ["Customs", "Choose the correct green or red channel under the official rules", "Receipts or documents for goods you need to declare"],
        ["Public arrivals hall", "Connect to your driver, railway station, bus stop or taxi queue", "Booking confirmation, working phone and destination address"],
      ],
    },
    sections: [
      {
        id: "before-you-fly",
        title: "Entry documents and ETA-IL: what to prepare before flying",
        paragraphs: [
          "Visitors travelling on visa-exempt passports generally need an approved ETA-IL before departure. The official application fee is ₪25 (November 2026); apply through the Population and Immigration Authority's website. Travellers who require a visa should arrange the appropriate visa before flying, while Israeli citizens and other exempt categories follow different rules.",
          "Keep your passport, any required ETA-IL or visa, your first accommodation address and onward or return travel details accessible offline. ETA-IL is a travel authorisation; the border officer makes the final entry decision.",
          "Check your arrival terminal and flight status with your airline or the airport before departure. For a private airport pickup, provide your flight number and arrival date in Israel, especially if your flight lands after midnight.",
        ],
        highlightedLinks: [{
          label: "Apply for ETA-IL - official Israeli government portal",
          href: "https://israel-entry.piba.gov.il/",
          context: "Check eligibility for your passport, apply for ETA-IL and pay the published ₪25 fee directly to the Population and Immigration Authority.",
        }],
        sourceIds: ["guide-entry", "guide-iaa"],
      },
      {
        id: "arrival-terminal",
        title: "Terminal 3 arrivals and the free terminal shuttle",
        photo: airportTransferPhotos["other"]!,
        paragraphs: [
          "International arriving flights currently use Terminal 3. Terminal 1 serves domestic arrivals from Ramon Airport and also some international departures. Check the terminal shown for your particular flight, since arrival and departure terminals can differ.",
          "If you need to travel between Terminals 3 and 1, take the free airport shuttle. At Terminal 3, board on Level G near Gate 01; at Terminal 1, use the stop opposite Gate 4. The airport lists departures approximately every 15 minutes, around the clock. Allow time to reach the stop and complete your transfer.",
          "The free airport shuttle connects the terminals and airport facilities. For transport to a hotel or city, use the train, public buses, official taxis or an arranged transfer.",
        ],
        highlightedLinks: [{
          label: "Airport shuttle - official stops and timetable",
          href: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/",
          context: "The airport authority lists the current Terminal 1–Terminal 3 shuttle stops, approximately 15-minute service and airport transport information.",
        }],
        sourceIds: ["guide-iaa-terminal-2026", "guide-iaa", "guide-iaa-shuttle"],
      },
      {
        id: "passport-control",
        title: "Passport control and the blue entry card",
        paragraphs: [
          "After leaving the aircraft, follow arrivals signs to passport control and choose the appropriate lane. Passengers who qualify can use the automated passport control gates. Airport staff will direct you. Keep your passport, ETA-IL or visa where required, accommodation address and onward travel information ready.",
          "Border staff may ask about your visit, where you will stay and when you plan to leave. Follow their instructions and keep the entry record issued to you.",
          "International visitors normally receive a small blue entry card at passport control. Keep it with your passport throughout the trip: it documents your entry and may be requested for a tourist VAT refund when departing Israel.",
        ],
        highlightedLinks: [{
          label: "Blue entry card - Population and Immigration Authority",
          href: "https://www.iaa.gov.il/en/companies/government-offices/population-and-immigration-authority-%D7%A8%D7%A9%D7%95%D7%AA-%D7%94%D7%90%D7%95%D7%9B%D7%9C%D7%95%D7%A1%D7%99%D7%9F-%D7%95%D7%94%D7%94%D7%92%D7%99%D7%A8%D7%94/",
          context: "Official airport immigration information on the blue entry card and using it for a VAT-refund request.",
        }],
        sourceIds: ["guide-entry", "guide-blue-entry-card"],
      },
      {
        id: "baggage",
        title: "Collecting luggage and reporting a missing bag",
        paragraphs: [
          "After passport control, find your flight number on the baggage screens and follow its assigned carousel. Keep your baggage tags until you've collected all your luggage. Strollers, wheelchairs and oversized luggage may need to be collected separately.",
          "If a checked bag is missing or damaged, go to the airline's baggage service desk or its ground-handling company's desk before leaving baggage reclaim. File a report, obtain the case reference (often called a Property Irregularity Report or PIR), and keep your baggage tag, flight details, contact number and delivery address in Israel.",
          "For missing checked luggage or belongings left on the plane, contact the airline or its ground handler using the airport's lost-property directory. For belongings lost in the public terminal, use the airport's separate lost-and-found form.",
        ],
        externalLinks: [
          { label: "Baggage and ground-handler contacts - Israel Airports Authority", href: "https://www.iaa.gov.il/en/airports/ben-gurion/lost-found/" },
          { label: "Report an item lost in the terminal - airport form", href: "https://www.iaa.gov.il/en/airports/ben-gurion/lost-and-found/" },
        ],
        sourceIds: ["guide-lost-property"],
      },
      {
        id: "customs",
        title: "Red and green customs channels",
        paragraphs: [
          "After baggage claim, follow the customs signs. The green channel is for travellers with nothing requiring declaration; use the red channel for goods or amounts that must be declared under Israel's customs rules.",
          "Check restrictions and declaration limits if you are carrying cash, valuable goods or regulated items. The Israel Tax Authority recommends using the red channel and asking a customs officer when you are unsure.",
          "Keep receipts and supporting documents ready for anything you need to declare. Allow time for any customs checks when arranging your pickup.",
        ],
        highlightedLinks: [{
          label: "Customs rules for visitors - Israel Tax Authority",
          href: "https://www.gov.il/en/pages/guide-tourist-customs?chapterIndex=1",
          context: "Official guidance on the red and green channels, duty-free allowances and declarations.",
        }],
        sourceIds: ["guide-customs-tourists"],
      },
      {
        id: "arrivals-hall",
        title: "Meeting your driver in the public arrivals hall",
        paragraphs: [
          "After customs, enter the public arrivals hall and follow your transport provider's meeting instructions. Before leaving baggage claim, have your destination address, booking confirmation and driver's contact details ready.",
          "Meet your driver at the location specified in your booking confirmation. Tell your operator if baggage collection or passport control takes longer than expected, and follow the agreed waiting and flight-delay policy.",
          "If you need help finding your pickup point, ask at the airport information desk or contact your driver.",
        ],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "phones-money",
        title: "Mobile data, ATMs and essential arrivals services",
        paragraphs: [
          "Set up roaming or an eSIM before departure when possible. A working phone helps you receive your taxi ride code, reach a driver and view current train times. Save your accommodation address, pickup instructions and travel documents offline. My Israel eSIM guide explains the available data options.",
          "Terminal 3 provides ATMs and other passenger services near the arrivals area. The local currency is the Israeli shekel (ILS); check withdrawal and exchange fees and keep a backup payment method.",
          "Ask your airline in advance for any mobility or baggage assistance you need. The airport also lists paid porter services for travellers who want additional help with luggage.",
        ],
        inlineLinks: [{ text: "Israel eSIM guide", to: travelGuidePaths.esim }],
        sourceIds: ["guide-iaa-arrival-services", "guide-iaa-accessibility"],
      },
      {
        id: "leave-airport",
        title: "How to travel from Ben Gurion Airport to your hotel",
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Taxi entrance sign at Ben Gurion Airport" },
        paragraphs: [
          "Choose the most convenient transport option for your destination. Trains are convenient for reaching major cities, although you may need a bus or taxi from the station to your hotel. Buses serve selected routes, and an official airport taxi provides a direct metered journey.",
          "For an immediate taxi at Terminal 3, order through Gett or an airport kiosk and take your ride code to the official queue at ground-floor Exit 03. Advance-scheduled Gett taxis meet at Level 2, Exit 23. My Ben Gurion Airport taxi guide explains the full booking and pickup procedure.",
          "You can arrange a private airport transfer in advance, with the vehicle, meeting point, waiting conditions and price confirmed by the provider. My airport sherut guide explains the former shared-taxi routes and today's alternatives; the taxi fares guide covers regulated meter charges.",
          "For a complete route comparison, read my destination guides to Tel Aviv, Jerusalem, Haifa and Ein Bokek at the Dead Sea. My getting around Israel guide explains how to travel around the country by train, bus and taxi.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/airport-transfers/" },
          { text: "airport sherut guide", to: travelGuidePaths.sherut },
          { text: "taxi fares guide", to: travelGuidePaths.taxiFares },
          { text: "Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
        ],
        tables: [{
          caption: "Airport-to-hotel transport at a glance",
          headers: ["Mode", "Useful when", "Where to go / Pickup point"],
          rows: [
            ["Train", "Major cities served by Israel Railways", "Terminal 3 railway station, below the terminal; follow the train signs"],
            ["Public bus", "Your journey matches a current bus route", "Check your line: services such as 445/485 use Terminal 3, Level 2, Exit 21"],
            ["Immediate airport taxi", "A direct ride to your address", "Terminal 3 ground floor, Exit 03; use Gett or an airport taxi kiosk"],
            ["Gett taxi booked in advance", "Scheduled airport pickup using Gett", "Terminal 3, Level 2, Exit 23; follow the booking details"],
            ["Pre-booked private transfer", "A confirmed vehicle and meeting point", "Meet your driver at the location stated in your confirmation"],
            ["Rental car", "A self-drive journey after landing", "Follow your rental provider's Terminal 3 collection instructions"],
          ],
          note: "Terminals, bus stops and pickup instructions can change by service and date. The weekend Line 711 has a Terminal 1 stop; see my airport Shabbat transport guide.",
        }],
        sourceIds: ["guide-iaa", "guide-gett", "israel-rail"],
      },
      {
        id: "arrival-timing",
        title: "Planning the time from landing to the arrivals hall",
        paragraphs: [
          "Your landing time and the time you reach the public arrivals hall are different. Allow for taxiing, leaving the aircraft, walking to passport control, queues, baggage collection and any customs processing.",
          "These estimates are based on typical passenger experience from landing to the public arrivals hall. Long queues, additional passport checks or a bus ride from the aircraft to the terminal can increase the time needed to leave the airport.",
          "Give your driver your flight number and confirm the pickup time, included waiting time and any delay charges. Contact your driver after collecting your luggage.",
        ],
        tables: [{
          caption: "Estimated time from landing to the public arrivals hall",
          headers: ["Arrival situation", "Planning allowance", "How to arrange pickup"],
          rows: [
            ["Hand luggage only", "Allow roughly 30–60 minutes", "Include passport control, the walk and customs"],
            ["Checked luggage", "Allow roughly 60–120 minutes or more", "Leave time for your carousel and any baggage delay"],
            ["Wheelchair or additional arrival assistance", "Confirm an individual allowance with your airline", "Arrange ground-handler help in advance and tell the driver about the extra coordination"],
          ],
          note: "Allow additional time for security, immigration or baggage delays.",
        }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "shabbat",
        title: "Arriving on Shabbat or a Jewish holiday",
        paragraphs: [
          "Ben Gurion Airport can receive flights on Shabbat, while most regular trains and buses pause during the weekly rest period. Check the last Friday departure and the first Saturday-night departure, including transport from the station to your hotel.",
          "Authorized airport taxis and confirmed private transfers remain practical options. Free weekend Line 711 serves parts of Tel Aviv on a limited timetable from Terminal 1, with the airport's internal shuttle connecting the terminals. My airport Shabbat transport guide explains these options and the service restart times.",
        ],
        inlineLinks: [{ text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-weekend-711", "guide-iaa", "israel-rail"],
      },
      {
        id: "assistance",
        title: "Arrival assistance for families and passengers with disabilities",
        paragraphs: [
          "If a member of your party needs wheelchair assistance, help moving through the terminal or additional support on arrival, request the service from your airline before flying. Its ground-handling company arranges the arrival assistance, while the airport provides accessible facilities and shuttle buses.",
          "Confirm how you will collect strollers, oversized bags or mobility equipment and tell your airline what help is required between the aircraft and baggage claim. You can also arrange a paid airport porter service through the airport's terminal facilities.",
          "When booking your airport transfer, mention any child seats, luggage and wheelchair accessibility requirements. My taxis in Israel guide explains general vehicle arrangements; the airport taxi guide covers accessible taxi requests at Terminal 3.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "airport taxi guide", to: travelGuidePaths.airportTaxis },
        ],
        highlightedLinks: [{
          label: "Accessibility and passenger assistance - Israel Airports Authority",
          href: "https://www.iaa.gov.il/en/airports/ben-gurion/accessibility/",
          context: "Official guidance about airline-arranged assistance, accessible airport facilities and the free accessible shuttle.",
        }],
        sourceIds: ["guide-iaa-accessibility", "guide-iaa-arrival-services", "guide-iaa"],
      },
    ],
    checklist: [
      "Check passport and ETA-IL or visa requirements before departure",
      "Save your arrival flight number, booking, first address and documents offline",
      "Keep the blue entry card and baggage claim tags",
      "Report missing checked baggage at your airline's baggage service desk",
      "Choose the correct customs channel and keep relevant receipts",
      "Arrange your airport transfer and confirm the meeting point and waiting time policy",
      "Arrange mobile connectivity, child seats or accessibility assistance in advance",
    ],
    faqs: [
      { q: "Do I need an ETA-IL or a visa to enter Israel?", a: "Visitors from visa-exempt countries generally need ETA-IL approval before flying; other passports may need a visa or qualify for an exemption. The official ETA-IL fee is ₪25. Use Israel's official entry portal for passport-specific requirements." },
      { q: "What is the blue entry card and should I keep it?", a: "A blue entry card is normally issued to arriving foreign visitors at passport control. Keep it with your passport; it documents your entry and may be needed for a tourist VAT-refund request on departure." },
      { q: "What if my checked luggage does not arrive?", a: "Go to your airline's baggage or ground-handling desk before leaving baggage reclaim. Report the missing bag, keep the claim tags and obtain a reference number for follow-up or delivery." },
      { q: "Which terminal will my flight arrive at?", a: "International flights currently arrive at Terminal 3. Domestic flights from Ramon use Terminal 1. Check your arrival terminal and share the details with your driver." },
      { q: "How early should I arrange a driver after landing?", a: "Share your flight number and agree on the pickup meeting procedure in advance. Passport control and baggage collection may add considerable time; check the arrival-time planning table above." },
      { q: "What if I have goods to declare at customs?", a: "Follow the red customs channel and keep receipts or supporting documents ready. Israel's Tax Authority recommends using the red channel if you are uncertain whether an item needs declaration." },
      { q: "Can I arrange wheelchair or other arrival assistance?", a: "Request help from your airline before departure. Its ground-handling provider supports arriving passengers, and you should arrange any wheelchair-accessible taxi or private vehicle separately for the onward journey." },
      { q: "How can I leave the airport on Shabbat?", a: "Authorized taxis and confirmed private transfers can operate during Shabbat. Free weekend Line 711 runs to parts of Tel Aviv from Terminal 1 on a limited timetable; the airport Shabbat guide covers the journey and terminal shuttle." },
    ],
    sourceIds: [
      "guide-entry", "guide-iaa-terminal-2026", "guide-iaa", "guide-blue-entry-card", "guide-iaa-shuttle",
      "guide-lost-property", "guide-customs-tourists", "guide-iaa-arrival-services",
      "guide-iaa-accessibility", "guide-gett", "israel-rail", "guide-weekend-711",
    ],
    related: ["airportTaxis", "shabbat", "sherut", "esim", "israel", "taxis"],
    services: [
      { label: "Airport transfer destinations and personal quote", to: "/airport-transfers/" },
      { label: "Private airport transfer to Tel Aviv", to: "/airport-transfers/tel-aviv/" },
      { label: "Private airport transfer to Jerusalem", to: "/airport-transfers/jerusalem/" },
      { label: "Private airport transfer to Haifa", to: "/airport-transfers/haifa/" },
    ],
  },
  israel: {
    id: "israel",
    title: "Getting Around Israel: Trains, Buses, Taxis & Travel Tips",
    description: "How to travel around Israel by train, bus, light rail, sherut, taxi or car. Practical Rav-Kav fares, Jerusalem train vouchers, Shabbat travel and city connections.",
    intro: "Planning how to get around Israel? This guide compares trains, buses, light rail, taxis and private journeys, with practical advice on fares, transfers and Shabbat travel.",
    answer: "Trains and intercity buses are convenient for travelling between Tel Aviv, Jerusalem and Haifa. Choose a station or stop with easy connections to your hotel. Explore city centres on foot, by local bus or light rail. For more remote attractions, consider renting a car, joining a tour or booking a private driver. Pay for most public transport using a loaded Rav-Kav or an approved ticketing app. Check service hours for Shabbat and public holidays.",
    topics: ["transportation", "destinations", "itineraries", "tips"],
    updatedAt: "2026-11-24",
    photo: {
      src: "/images/travel-blog/featured-getting-around-israel.webp",
      alt: "Traffic on a busy Israeli highway in the Tel Aviv area",
    },
    facts: [
      { label: "Local fares", text: "A standard short ride up to 15 km costs ₪8, with eligible 90-minute transfers" },
      { label: "Jerusalem trains", text: "A free advance voucher is currently required for Jerusalem–Yitzhak Navon journeys" },
      { label: "Weekend transport", text: "Most regular trains and buses pause for Shabbat; selected alternatives operate" },
    ],
    comparison: {
      caption: "Which transport option suits your journey?",
      headers: ["Transport", "Best for", "Fare basis", "Shabbat service", "Useful detail"],
      rows: [
        ["Train", "Airport and cities served by rail", "Distance-based ticket", "Generally suspended", "Plan transport from the station to your hotel"],
        ["Bus", "Cities, towns and intercity routes", "Regulated distance fare", "Most routes suspended", "Check departure times and the last return bus"],
        ["Light rail", "Operating corridors in Jerusalem and Tel Aviv", "Regulated transit fare", "Generally suspended", "Validate before boarding; routes are limited"],
        ["Licensed taxi", "Door-to-door journeys with luggage", "Metered fare", "Usually available", "Check the pickup point and permitted extras"],
        ["Shared taxi (sherut)", "Selected local routes", "Fare per passenger", "Some routes operate", "Service and room for luggage vary by route"],
        ["Rental car", "Rural areas and multi-stop days", "Rental, fuel and parking", "Driving possible", "Check desk hours and insurance restrictions"],
        ["Private driver or tour", "Direct travel and arranged sightseeing", "Quoted service price", "By arrangement", "Confirm hours, stops and services included"],
      ],
    },
    sections: [
      {
        id: "public-transport", title: "Trains, buses and light rail",
        paragraphs: [
          "Trains are useful between major cities; buses extend the network to smaller towns. Light rail and local buses are convenient for getting around cities. Consider the entire journey to your hotel, including transfers and walking distances.",
        ],
        subsections: [
          {
            id: "israel-trains", title: "Israel Railways and Jerusalem train vouchers",
            paragraphs: [
              "Israel Railways serves Ben Gurion Airport, Tel Aviv, Jerusalem, Haifa, Akko, Be'er Sheva and other destinations. Jerusalem–Yitzhak Navon is outside the Old City, Tel Aviv's stations are inland, and many Haifa hotels sit uphill from the coastal line. For terminal connections, see my airport arrival guide.",
              "For trains to or from Jerusalem–Yitzhak Navon, Israel Railways currently requires a separate free personal travel voucher as well as a valid ticket. Request the voucher for your selected train from 72 hours before departure. Check whether the voucher is still required before travelling.",
            ],
            inlineLinks: [{ text: "my airport arrival guide", to: travelGuidePaths.arrival }],
            photo: { src: navonPlatform, alt: "Platforms at Jerusalem–Yitzhak Navon railway station" },
            highlightedLinks: [
              { label: "Israel Railways - journeys, fares and departures", href: "https://www.rail.co.il/", context: "Choose stations and travel date, and check train changes and disruption notices." },
              { label: "Jerusalem line - free train travel voucher", href: "https://rail.co.il/?lan=en&page=vouchers-jerusalem", context: "Official information and instructions for the currently required advance voucher." },
            ],
            sourceIds: ["israel-rail", "guide-train-nov-2026", "guide-jerusalem-train-voucher"],
          },
          {
            id: "israel-buses", title: "City and intercity buses",
            paragraphs: [
              "Buses reach Tiberias, Safed, Nazareth, Eilat, the Dead Sea and neighbourhoods away from railway stations. For long-distance journeys, check whether the operator requires an advance seat reservation, especially on selected routes to Eilat.",
              "The national public transport planner shows stops, connections and departure times. Pay attention to the last return service, particularly on Fridays, before visiting smaller towns or rural attractions.",
            ],
            highlightedLinks: [{ label: "National public transport journey planner", href: "https://bus.gov.il/en/home", context: "Enter your travel date, starting point and destination." }],
            sourceIds: ["guide-bus-planner", "guide-egged-seat-reservations"],
          },
          {
            id: "israel-light-rail", title: "Urban rail, Metronit and Haifa cable cars",
            paragraphs: [
              "In Jerusalem, the Red Line serves the city centre and approaches to the Old City. The first Green Line L3 service opened in August 2026 and was extended in November from the Malha area via the centre to Damascus Gate. Use the latest route map to see which stations are open.",
              "Greater Tel Aviv's Red Line links parts of Tel Aviv–Jaffa, Ramat Gan, Bnei Brak, Petah Tikva and Bat Yam. In Haifa, the Metronit buses, Carmelit underground railway and Rakbalit cable car connect different parts of the city. The tourist cable car near Bat Galim is a different service.",
              "Use the correct ticket or payment app for each transport service. For light rail, validate before boarding.",
            ],
            photo: { src: jerusalemLightRail, alt: "Jerusalem light rail train by a city station" },
            highlightedLinks: [{ label: "Jerusalem light rail - official service updates", href: "https://j-lrt.co.il/updates/", context: "Operating lines, stations, service notices and planned extensions." }],
            sourceIds: ["jerusalem-light-rail-updates", "guide-red-line", "guide-urban-transit-validation", "guide-haifa-carmelit"],
          },
        ],
      },
      {
        id: "paying", title: "Tickets, Rav-Kav and fares",
        paragraphs: [
          "For most train, bus and light-rail journeys, use a loaded Rav-Kav card or a supported mobile ticketing app. A standard urban ride up to 15 km is ₪8, with eligible transfers during a 90-minute window. Longer journeys use distance-based fares; compare daily passes when planning several rides in one day.",
          "Cash is generally unavailable on buses. Direct contactless bank-card payment is available only on selected services, so use Rav-Kav or an approved payment app as your main option.",
        ],
        tables: [{
          caption: "Rav-Kav, ticketing apps and contactless cards",
          headers: ["Payment method", "Getting started", "Useful for", "Important detail"],
          rows: [
            ["Anonymous Rav-Kav", "Buy and load at a supported counter, machine or retailer", "Visitors who prefer a physical card", "Validate each ride; personalized discounts are unavailable"],
            ["Approved mobile app", "Register and add a supported payment method", "Bus and rail journeys without preloading a card", "Follow the app's validation steps; keep mobile data and battery"],
            ["Contactless bank card", "Tap on an explicitly enabled Egged bus", "An occasional single full-fare journey", "Only selected routes, without normal transfer benefits"],
          ],
        }],
        subsections: [
          {
            id: "israel-ravkav", title: "Choosing Rav-Kav or a ticketing app",
            paragraphs: [
              "Visitors can purchase an anonymous Rav-Kav without an Israeli ID or personal photo at selected sales points. Load a suitable fare or pass in advance. You can top up your Rav-Kav using a compatible phone. The card also works without mobile internet.",
              "You can pay for supported journeys using apps such as Moovit and Rav-Pass. Set up your payment method before travelling and follow the instructions on buses, at rail gates and on light rail. For mobile data during your visit, see my Israel eSIM guide.",
            ],
            inlineLinks: [{ text: "my Israel eSIM guide", to: travelGuidePaths.esim }],
            highlightedLinks: [{ label: "Rav-Kav Online - visitor instructions", href: "https://ravkavonline.co.il/en/public-transport-in-israel", context: "Where to obtain, load and use Rav-Kav, including fare and transfer guidance." }],
            sourceIds: ["guide-ravkav-2026", "guide-ravkav-visitor", "guide-public-transport-payments"],
          },
          {
            id: "israel-ticket-rules", title: "Fares, transfers and credit-card taps",
            paragraphs: [
              "The standard ₪8 fare applies to journeys up to 15 km under the current distance-based system. Eligible city bus and light-rail journeys can include transfers within 90 minutes, provided each leg is correctly validated. For several daily journeys, compare a day pass with individual fares; longer journeys have different prices.",
              "Since January 2026, Egged has accepted contactless international Visa and Mastercard cards and digital wallets on selected services in Eilat, Jerusalem and metropolitan Haifa. This is not a nationwide payment method: it generally covers a full-fare single journey, without the ordinary Rav-Kav or app transfer and discount benefits. For children and reduced-fare tickets, check passenger eligibility and validation rules.",
            ],
            highlightedLinks: [{ label: "Egged - supported credit-card payment routes", href: "https://www.egged.co.il/en/information-for-passengers/rav-kav-and-payment-apps", context: "The pilot locations, accepted cards and single-ride limitations." }],
            sourceIds: ["guide-select-card-payment", "guide-egged-card-payment-2026", "guide-urban-transit-validation", "guide-ravkav-2026"],
          },
        ],
      },
      {
        id: "taxis-and-sherut", title: "Taxis, shared taxis and private transfers",
        paragraphs: [
          "Licensed taxis serve direct journeys, including evenings and Shabbat. Gett and Yango help book taxis where available. For booking methods, metered fares and airport collection, see my taxis in Israel guide, taxi fares guide and Ben Gurion Airport taxi guide.",
          "A local sherut (shared minibus) follows a set route and charges per passenger. Some local routes still operate, while the former regular Nesher and Amal shared airport rides have ended. My Sherut in Israel guide explains the difference.",
          "For an airport arrival, the railway station is at Terminal 3. Authorized taxis can be requested through Gett or an airport kiosk; you can also book a private transfer in advance. My airport arrival guide covers the terminal, and my airport Shabbat guide explains weekend alternatives.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "taxi fares guide", to: travelGuidePaths.taxiFares },
          { text: "Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "Sherut in Israel guide", to: travelGuidePaths.sherut },
          { text: "airport arrival guide", to: travelGuidePaths.arrival },
          { text: "airport Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        subsections: [
          {
            id: "israel-taxis", title: "Licensed taxis and booking apps",
            paragraphs: [
              "Taxis can be booked at taxi stands, via your hotel or through Gett or Yango where supported. Confirm where the taxi will collect you, how the fare is calculated and how you can pay. Uber and Lyft currently do not offer passenger rides in Israel; my Uber alternatives guide compares the local booking choices.",
            ],
            inlineLinks: [{ text: "Uber alternatives guide", to: travelGuidePaths.uber }],
            sourceIds: ["guide-gett-app", "guide-yango-israel", "guide-uber-availability", "taxi-fares-2026"],
          },
          {
            id: "israel-sherut", title: "Shared taxis on local routes",
            paragraphs: [
              "Local sherut minibuses charge individual fares on designated routes. Stops, luggage capacity, payment and Shabbat operation vary. Check the sherut route and stops before boarding.",
            ],
            sourceIds: ["guide-sherut-regulation"],
          },
        ],
      },
      {
        id: "destinations", title: "Getting around cities and regions",
        paragraphs: [
          "Travel time depends on where you stay and how you connect from the nearest station.",
        ],
        subsections: [
          {
            id: "israel-tel-aviv", title: "Tel Aviv and Old Jaffa",
            paragraphs: [
              "Walk, cycle on suitable routes, or use buses and the Red Line. Tel Aviv's railway stations are inland, with buses and taxis connecting them to beachfront hotels. My getting around Tel Aviv guide covers stations, local tickets and weekend buses.",
            ],
            photo: { src: telAvivDizengoff, alt: "Dizengoff neighbourhood streets in Tel Aviv" },
            inlineLinks: [{ text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv }],
          },
          {
            id: "israel-jerusalem", title: "Jerusalem and the Old City",
            paragraphs: [
              "Use the operating light-rail lines and buses for the city centre, then walk or take a taxi where needed. Hills, steps and restricted Old City streets affect travel with luggage. See my Jerusalem travel guide and airport-to-Jerusalem guide.",
            ],
            inlineLinks: [
              { text: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
              { text: "airport-to-Jerusalem guide", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
            ],
          },
          {
            id: "israel-haifa", title: "Haifa and Mount Carmel",
            paragraphs: [
              "Haifa's railway stations lie near the coast; much of the city climbs Mount Carmel. Use buses, the Metronit or Carmelit to get around Haifa. A taxi can be convenient for reaching hotels higher up Mount Carmel. See my Haifa attractions guide and airport-to-Haifa guide.",
            ],
            inlineLinks: [
              { text: "Haifa attractions guide", to: "/attractions/haifa/" },
              { text: "airport-to-Haifa guide", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
            ],
            sourceIds: ["guide-haifa-carmelit", "guide-bus-planner"],
          },
          {
            id: "israel-galilee", title: "Tiberias, the Galilee and the Sea of Galilee",
            paragraphs: [
              "Regional buses connect Tiberias, Nazareth and other towns. Allow extra travel time between attractions around the Sea of Galilee. Check the last bus and the walking distance from its stop. A rental car, private driver or day tour makes it easier to visit several sites around the lake. See my Tiberias hotel guide for places to stay.",
            ],
            inlineLinks: [{ text: "Tiberias hotel guide", to: "/travel-blog/best-hotels-in-tiberias/" }],
          },
          {
            id: "israel-eilat", title: "Eilat, the Negev and the Dead Sea",
            paragraphs: [
              "Eilat and the Ein Bokek hotel area are served by intercity buses; neither has passenger rail service. Check whether your journey requires a seat reservation or a connection. My Eilat attractions guide, Jerusalem-to-the-Dead-Sea guide and airport-to-Ein-Bokek guide provide destination-specific options.",
            ],
            inlineLinks: [
              { text: "Eilat attractions guide", to: "/attractions/eilat/" },
              { text: "Jerusalem-to-the-Dead-Sea guide", to: travelGuidePaths.jerusalemDeadSea },
              { text: "airport-to-Ein-Bokek guide", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
            ],
            sourceIds: ["guide-egged-seat-reservations", "guide-bus-planner"],
          },
        ],
      },
      {
        id: "rental-car", title: "Rental cars, private drivers and day trips",
        paragraphs: [
          "For remote sites and several destinations in one day, compare a rental car with an arranged private driver or guided tour. In central Tel Aviv and Jerusalem, a car may add parking and traffic difficulties.",
        ],
        subsections: [
          {
            id: "israel-rentals", title: "When to rent a car",
            paragraphs: [
              "Compare the total cost of rental, insurance, deposits, fuel, parking and tolls. Check collection hours, especially for Shabbat, and whether the contract covers all intended roads and destinations. Rental terms may restrict entry into some Palestinian Authority areas, including Area A. My car rental guide has the booking details.",
            ],
            inlineLinks: [{ text: "car rental guide", to: "/car-rental/" }],
            highlightedLinks: [{ label: "Example rental conditions - Hertz Israel", href: "https://www.hertz.co.il/en/GoodToKnow/IsraelContract/", context: "Check your own provider's territorial restrictions and insurance exclusions." }],
            sourceIds: ["guide-rental-territory"],
          },
          {
            id: "israel-drivers", title: "Private driver or organized tour?",
            paragraphs: [
              "A private driver provides transport for your agreed itinerary; guiding, admission tickets and extra stops depend on the arrangement. An organised tour usually follows a set sightseeing itinerary. Compare hours, pickup, vehicle size and total price. See my private driver page or the tours and day trips directory.",
            ],
            inlineLinks: [
              { text: "private driver page", to: "/private-driver-in-israel/" },
              { text: "tours and day trips directory", to: "/tours/" },
            ],
          },
        ],
      },
      {
        id: "weekends", title: "Shabbat and Jewish holiday travel",
        paragraphs: [
          "Most regular trains and buses pause before Shabbat begins on Friday and resume after Saturday evening; some holidays have similar service restrictions. Check the last Friday departure and the first service after Shabbat.",
          "Tel Aviv's free Na'im Busofash network operates selected Friday and Saturday routes, while some local sheruts and licensed taxis may be available. See Israel's Calendar of Events for holiday dates and my airport Shabbat transport guide for Line 711 at Terminal 1 and airport taxi alternatives.",
        ],
        inlineLinks: [
          { text: "Israel's Calendar of Events", to: "/travel-blog/calendar-of-events/" },
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
        ],
        highlightedLinks: [{ label: "Na'im Busofash - weekend network", href: "https://busofash.co.il/", context: "Participating communities, Friday and Saturday stops and schedules." }],
        sourceIds: ["guide-weekend-network", "guide-telaviv-transit", "israel-rail"],
      },
      {
        id: "planning", title: "Popular journeys and practical travel tips",
        paragraphs: [
          "Plan your journey from your starting address to your hotel or attraction, including walking and transfers. Save your route and the last return departure time on your phone, especially before travel to rural areas, parks or during major events.",
        ],
        subsections: [
          {
            id: "israel-popular-journeys", title: "Common intercity routes",
            paragraphs: [
              "Use the route guides and official transport planners to compare travel options for your dates.",
            ],
            tables: [{
              caption: "Four common journeys in Israel",
              headers: ["Journey", "Compare first", "Arrival or connection"],
              rows: [
                ["Tel Aviv ↔ Jerusalem", "Train or direct intercity bus", "Jerusalem–Yitzhak Navon station, with light rail and bus connections"],
                ["Ben Gurion Airport → Haifa", "Direct train when running", "Choose the Haifa station nearest your address"],
                ["Jerusalem → Ein Bokek", "Scheduled Dead Sea bus", "Confirm the resort stop and last return service"],
                ["Tel Aviv → Tiberias", "Intercity bus", "Check the departure terminal, destination stop and return timetable"],
              ],
              rowLinks: [
                { href: "https://bus.gov.il/en/home", label: "Plan Tel Aviv to Jerusalem on the national public transport planner" },
                { to: "/travel-blog/ben-gurion-airport-to-haifa/", label: "Ben Gurion Airport to Haifa" },
                { to: "/travel-blog/jerusalem-to-the-dead-sea/", label: "Jerusalem to the Dead Sea" },
                { href: "https://bus.gov.il/en/home", label: "Plan Tel Aviv to Tiberias on the national public transport planner" },
              ],
            }],
          },
          {
            id: "israel-accessibility", title: "Luggage, accessibility and children",
            paragraphs: [
              "Station lifts, bus equipment, wheelchair places and step-free routes vary. Some intercity accessible services require advance arrangements. Check your departure time and boarding location, and confirm child seats or luggage capacity with your chosen taxi or private-transfer provider.",
            ],
            highlightedLinks: [{ label: "Egged - accessibility arrangements", href: "https://www.egged.co.il/en/accessibility-statement", context: "Accessible vehicles, reservation requirements and passenger assistance." }],
            sourceIds: ["guide-egged-accessibility"],
          },
        ],
      },
    ],
    checklist: [
      "Compare the full journey from your starting address to your hotel or attraction.",
      "Choose a loaded Rav-Kav or approved payment app and validate every ride.",
      "Check 90-minute transfers, longer-distance fares and day passes.",
      "For Jerusalem trains, reserve a free personal voucher for each passenger in addition to a valid ticket.",
      "Check weekend and holiday timetables before travelling.",
      "Confirm the last return service, luggage space and accessibility arrangements.",
      "For rural travel, review weather, attraction access and offline directions.",
    ],
    faqs: [
      { q: "Can I travel around Israel without renting a car?", a: "Yes. Trains and buses connect major cities, while local buses, light rail and taxis help you reach hotels and attractions. A rental car, arranged tour or private driver is more useful for remote sites and several rural stops." },
      { q: "Is the train or bus better between Tel Aviv and Jerusalem?", a: "Both are convenient options for travelling between Tel Aviv and Jerusalem. The train arrives at Jerusalem–Yitzhak Navon, outside the Old City, so compare the total journey time to your hotel by train and bus." },
      { q: "Do tourists need an Israeli ID for a Rav-Kav card?", a: "An anonymous Rav-Kav generally requires no Israeli ID or photograph. Buy and load it at a supported point before you travel." },
      { q: "Can I use a foreign credit card on every bus?", a: "No. Contactless Visa or Mastercard payments are accepted on selected Egged buses in Eilat, Jerusalem and metropolitan Haifa. Use a loaded Rav-Kav or approved app for wider network access." },
      { q: "How do ₪8 fares and 90-minute transfers work?", a: "A standard journey up to 15 km costs ₪8. Eligible bus and light-rail transfers within 90 minutes are included when you validate correctly; longer journeys and special products use other fare rules." },
      { q: "Do I need an advance train voucher for Jerusalem?", a: "Israel Railways currently requires a separate free personal voucher for travel to or from Jerusalem–Yitzhak Navon, available from 72 hours before your selected train. Check the official rule for your date; the voucher does not replace your ticket." },
      { q: "Does public transport operate during Shabbat?", a: "Most regular trains and buses pause for much of Shabbat. Selected local shared taxis and weekend buses operate on specific routes; licensed taxis and confirmed private transfers are other options." },
      { q: "Can I reach Eilat and the Dead Sea without a car?", a: "You can reach Eilat and the Dead Sea by intercity bus. Some journeys require a connection or seat reservation. There is no passenger train to Eilat or Ein Bokek. Check the stop nearest your accommodation and the last available departure." },
    ],
    sourceIds: [
      "guide-bus-planner", "guide-public-transport-payments", "guide-select-card-payment",
      "guide-ravkav-2026", "guide-ravkav-visitor", "guide-urban-transit-validation", "guide-egged-card-payment-2026",
      "israel-rail", "guide-train-nov-2026", "guide-jerusalem-train-voucher",
      "guide-weekend-network", "guide-egged-accessibility", "guide-egged-seat-reservations",
      "guide-rental-territory", "guide-haifa-carmelit", "guide-red-line", "jerusalem-light-rail-updates",
      "guide-gett-app", "guide-uber-availability",
    ],
    related: ["telAviv", "taxis", "sherut", "shabbat", "airportTaxis", "arrival"],
    services: [
      { label: "Airport Transfers", to: "/airport-transfers/", note: "Arrange your arrival or departure pickup." },
      { label: "Private Driver", to: "/private-driver-in-israel/", note: "Plan flexible multi-stop journeys." },
      { label: "Car Rental", to: "/car-rental/", note: "Compare vehicles for regional trips." },
      { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", note: "Rail, taxi and private travel choices." },
      { label: "Airport to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/", note: "Choose the closest railway station to your hotel." },
      { label: "Israel eSIM", to: travelGuidePaths.esim, note: "Use maps and tickets on arrival." },
    ],
  },
telAviv: {
    id: "telAviv",
    title: "Getting Around Tel Aviv: Buses, Red Line, Taxis & Shabbat Travel",
    description: "Practical Tel Aviv transport guide: Red Line light rail, local buses and Rav-Kav fares, station choices, taxis, free Shabbat buses, bikes and accessibility.",
    intro: "Explore Tel Aviv and Old Jaffa on foot, by bus, light rail or taxi. Compare routes, payment options and weekend transport.",
    answer: "For nearby beaches, markets and central neighbourhoods, walk. Use city buses for longer journeys, the Red Line where its stations suit your route and Israel Railways for the airport and intercity trips. During Shabbat, selected free Na'im Busofash routes and licensed taxis offer alternatives to regular buses and trains.",
    updatedAt: "2026-11-24",
    topics: ["transportation", "destinations", "tips"],
    photo: {src: telAvivLightRail, alt: "Tel Aviv light rail tram on the Red Line"},
    facts: [
      { label: "Standard local fare", text: "₪8 up to 15 km, with eligible 90-minute transfers" },
      { label: "Tel Aviv rail stations", text: "Four railway stations serving different parts of the city" },
      { label: "Free weekend buses", text: "Na'im Busofash operates selected Friday and Saturday routes", link: { text: "Na'im Busofash", href: "https://busofash.co.il/" } },
    ],
    comparison: {
      caption: "Getting around Tel Aviv at a glance",
      headers: ["Option", "Best for", "Fare basis", "Shabbat availability", "Useful detail"],
      rows: [
        ["Walking", "Beaches, markets and adjacent neighbourhoods", "Free", "Available", "Allow for heat and walking distances"],
        ["City buses", "Cross-town and neighbourhood connections", "₪8 for up to 15 km", "Regular routes generally pause", "Confirm stop, direction and validation"],
        ["Red Line light rail", "Journeys along the operating corridor", "Standard public fare", "Generally suspended", "Check R1, R2 or R3 destination"],
        ["Israel Railways", "Airport and intercity travel", "Distance-based", "Generally suspended", "Stations are inland from the beach"],
        ["Licensed taxis", "Direct journeys, luggage and late arrivals", "Metered fare", "Usually available", "Check pickup and extra charges"],
        ["Shared taxi (sherut)", "Selected local routes", "Per passenger", "Some routes operate", "Confirm the line and current service"],
        ["Na'im Busofash", "Selected weekend routes", "Free", "Friday and Saturday", "Check the precise stop and timetable"],
        ["Bike or e-scooter", "Short rides on suitable routes", "Rental-dependent", "Operator-dependent", "Observe helmet and parking rules"],
        ["Rental car", "Day trips outside the city", "Rental, fuel and parking", "Driving possible", "Check parking and rental desk hours"],
      ],
    },
    sections: [
      {
        id: "choose", title: "Choosing transport and walking routes",
        paragraphs: [
          "For central sightseeing, walk between nearby attractions and use buses or light rail for longer connections. Choose a hotel near the areas you will explore most often; my where to stay in Tel Aviv guide explains convenient neighbourhoods.",
          "Old Jaffa and its port, Neve Tzedek and Rothschild Boulevard, and the Carmel Market area each work well as walking clusters. Tel Aviv Port, the northern museums and Old Jaffa are farther apart. See my Jaffa attraction guide and Tel Aviv beaches guide when planning individual stops.",
          "In summer, choose shaded walking routes and check accessibility if needed. Consider a taxi if you're carrying heavy luggage or staying far from the station.",
        ],
        photo: { src: telAvivDizengoff, alt: "Pedestrian-friendly streets in Tel Aviv's Dizengoff area" },
        inlineLinks: [
          { text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
          { text: "Jaffa attraction guide", to: "/attractions/jaffa/" },
          { text: "Tel Aviv beaches guide", to: travelGuidePaths.telAvivBeaches },
        ],
        tables: [{
          caption: "Practical walking clusters in Tel Aviv",
          headers: ["Area", "Nearby places to combine", "When to take transport"],
          rows: [
            ["Old Jaffa", "Old streets, Jaffa Port and flea market", "Returning to north Tel Aviv"],
            ["Neve Tzedek and Rothschild", "Neve Tzedek, old railway station and Rothschild Boulevard", "Long journey to your hotel"],
            ["Carmel Market", "Carmel Market, Kerem HaTeimanim and nearby streets", "After carrying purchases"],
            ["Beach and Dizengoff", "Selected promenade sections, cafés and central streets", "Long north–south trips"],
            ["Tel Aviv Port and Yarkon", "Port boardwalk and nearby park areas", "Connections to Old Jaffa or rail stations"],
          ],
        }],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "paying", title: "City buses, fares and payment",
        paragraphs: [
          "City buses cover more Tel Aviv neighbourhoods than the Red Line, connecting beaches, museums, markets and hotels. Check the bus number, direction, walking distance to your destination and last Friday departure.",
          "A standard journey of up to 15 km costs ₪8. When you validate your journey using a Rav-Kav or approved payment app, eligible transfers between buses and the light rail are included within 90 minutes. Longer trips and daily passes follow separate fare rules.",
          "Load a Rav-Kav card or register an approved ticketing app before boarding, and validate each journey. Cash to the driver is generally unavailable. Use the national public transport planner for exact stops and departures.",
        ],
        photo: { src: archivedBuses, alt: "City buses at a Tel Aviv metropolitan transport terminal" },
        tables: [{
          caption: "Paying for buses and the Red Line",
          headers: ["Payment", "Buses", "Red Line", "Main limitation"],
          rows: [
            ["Anonymous Rav-Kav", "Load suitable fare; validate on boarding", "Validate before boarding", "Transfer benefits require eligible products and validation"],
            ["Approved payment app", "Set up account and validate", "Use station-specific app or QR procedure", "Needs compatible phone and payment account"],
            ["Contactless bank card", "Supported Dan buses only", "Not valid as a light-rail ticket", "₪8 one full-fare journey; no free transfer or profile discounts"],
          ],
        }],
        subsections: [
          {
            id: "ta-ravkav", title: "Rav-Kav and mobile ticketing",
            paragraphs: [
              "Visitors can obtain an anonymous Rav-Kav without an Israeli ID, load it at supported sales points and use it for eligible public transport services. Approved transport payment apps are another option; set one up before travelling.",
              "Validate each bus boarding and before entering the Red Line, even when a transfer or pass covers the fare. The getting around Israel guide explains wider national fares and day passes.",
            ],
            inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
            externalLinks: [{ label: "Rav-Kav Online - visitor information", href: "https://ravkavonline.co.il/en/public-transport-in-israel" }],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets", "guide-ravkav-2026"],
          },
          {
            id: "ta-bank-card", title: "Paying by credit card on Dan buses",
            paragraphs: [
              "On participating Dan buses, a supported contactless Visa or Mastercard, including eligible foreign cards and digital wallets, pays the published ₪8 fare for one passenger.",
              "This full-fare single journey carries no ordinary 90-minute transfer benefit or personal discounts. A Dan bank-card tap does not cover travel on the Red Line.",
            ],
            externalLinks: [{ label: "Dan - official card payment rules", href: "https://www.dan.co.il/faq/credit-card-ride-validation" }],
            sourceIds: ["guide-dan-bank-card-2026"],
          },
        ],
        externalLinks: [{ label: "National public-transport route planner", href: "https://bus.gov.il/en/home" }],
        sourceIds: ["guide-bus-planner", "guide-public-transport-payments", "guide-dan-bank-card-2026"],
      },
      {
        id: "red-line", title: "Red Line light rail: useful stops and routes",
        paragraphs: [
          "The operating Red Line connects parts of Tel Aviv–Jaffa, Bat Yam, Ramat Gan, Bnei Brak and Petah Tikva. It does not run along Tel Aviv's beachfront, so plan a bus or walk for some hotels and attractions.",
          "The R1 service runs between HaKomemiyut in Bat Yam and the Petah Tikva Central Station. R2 connects HaKomemiyut to Kiryat Arye in Petah Tikva on a partially operated service. R3 links Elifelet in Tel Aviv with Kiryat Arye. Choose the train with the correct destination for your stop.",
        ],
        tables: [{
          caption: "Useful Red Line stations for visitors",
          headers: ["Station", "Nearby sights and connections"],
          rows: [
            ["Arlozorov", "Tel Aviv Savidor Center railway station, buses and north-central connections"],
            ["Sha'ul HaMelekh", "Tel Aviv Museum of Art and government district"],
            ["Yehudit", "Sarona and the Begin business district"],
            ["Karlibach", "Business district and local bus connections"],
            ["Allenby", "Rothschild Boulevard, Allenby and access to Carmel Market"],
            ["Elifelet", "Neve Tzedek and south Tel Aviv"],
            ["Shalma (Salame)", "Southern Jaffa; continue towards Old Jaffa"],
            ["Bloomfield Stadium", "Stadium and southern Jaffa; Old Jaffa Port requires extra travel"],
          ],
        }],
        subsections: [{
          id: "ta-redline-validation", title: "Validate before you board",
          paragraphs: [
            "Validate each ticket before boarding the Red Line. Follow the station signs for Rav-Kav or supported mobile payment methods, and keep the same validated card or app ready for inspection.",
            "A bank-card tap on a Dan bus does not provide a valid light-rail ticket. Follow the accepted Red Line ticketing instructions for your journey.",
          ],
          externalLinks: [
            { label: "NTA - Red Line services and stations", href: "https://www.nta.co.il/en/light-rail/red-line/" },
            { label: "NTA - buying and validating tickets", href: "https://www.nta.co.il/en/buying-tickets-and-validation-machines/" },
          ],
          sourceIds: ["guide-red-line-stations-2026", "guide-urban-transit-validation"],
        }],
        sourceIds: ["guide-red-line-stations-2026", "guide-urban-transit-validation"],
      },
      {
        id: "national-rail", title: "Which Tel Aviv railway station should you use?",
        paragraphs: [
          "Israel Railways connects Tel Aviv with Ben Gurion Airport and other major cities. Choose the Tel Aviv railway station with the most convenient bus or taxi connection to your destination.",
          "My Ben Gurion Airport to Tel Aviv guide explains how to reach your hotel by train, bus, taxi or private transfer.",
        ],
        tables: [{
          caption: "Tel Aviv railway stations, south to north",
          headers: ["Station", "Nearby areas", "Useful onward connection"],
          rows: [
            ["Tel Aviv HaHagana", "Southern Ayalon corridor and southern neighbourhoods", "Buses or taxis towards south Tel Aviv"],
            ["Tel Aviv HaShalom", "Azrieli and Sarona business and shopping districts", "Walking distance or local bus connections"],
            ["Tel Aviv Savidor Center", "Central-northern Ayalon corridor", "Arlozorov Red Line station and major bus hub"],
            ["Tel Aviv University", "University, Expo and north Tel Aviv", "Local bus or taxi to the north-city areas"],
          ],
        }],
        inlineLinks: [{ text: "Ben Gurion Airport to Tel Aviv guide", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }],
        externalLinks: [{ label: "Israel Railways - stations and timetables", href: "https://www.rail.co.il/" }],
        sourceIds: ["israel-rail", "guide-train-nov-2026"],
      },
      {
        id: "taxis", title: "Licensed taxis and local sherut minibuses",
        paragraphs: [
          "Licensed taxis are convenient for heavy luggage, direct journeys, late arrivals and Shabbat travel. Book with Gett where supported, at a taxi stand or through your hotel. Confirm the pickup, meter and payment method. My Uber alternatives guide explains local taxi apps, while the taxi fares guide covers prices and surcharges.",
          "A local sherut follows a designated route and charges per passenger. Selected shared-taxi routes operate in parts of Tel Aviv, including some weekend services. Pickup locations and service frequency vary by route. My Sherut in Israel guide explains how to use shared taxis and which services are available today.",
          "For an arranged private pickup or city-to-city journey, send me the route, date, group size and luggage details in the form below.",
        ],
        inlineLinks: [
          { text: "Uber alternatives guide", to: travelGuidePaths.uber },
          { text: "taxi fares guide", to: travelGuidePaths.taxiFares },
          { text: "Sherut in Israel guide", to: travelGuidePaths.sherut },
        ],
        links: [{ label: "Taxis in Israel: booking and licensing", to: travelGuidePaths.taxis }],
        sourceIds: ["guide-gett-app", "guide-telaviv-apps", "guide-sherut-regulation", "taxi-passenger-rights"],
      },
      {
        id: "bikes", title: "Cycling, e-scooters, parking and rental cars",
        paragraphs: [
          "Bikes and e-scooters suit short trips on permitted cycling routes. Rent a bicycle or e-scooter through the operator's app. Check registration and payment requirements, use permitted cycling routes and end your rental in an approved parking area.",
          "Electric bike and scooter riders must be at least 16 and meet the applicable qualification requirements. Helmets are mandatory, ordinary pedestrian pavements are for walking, and scooters cannot carry passengers.",
          "Walking and public transport are convenient for exploring central Tel Aviv. Consider renting a car for trips outside the city. Blue-and-white street parking may require payment or a permit. Check the parking signs and rental desk hours. See my car rental guide for options beyond the city.",
        ],
        inlineLinks: [{ text: "car rental guide", to: "/car-rental/" }],
        externalLinks: [{ label: "Tel Aviv municipality - bicycle and scooter rules", href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/BicycleEnforcement.aspx" }],
        sourceIds: ["guide-telaviv-bicycle-rules", "guide-telaviv-transit"],
      },
      {
        id: "shabbat", title: "Getting around Tel Aviv on Shabbat",
        paragraphs: [
          "Regular city buses, the Red Line and Israel Railways generally pause for Shabbat. Na'im Busofash operates free routes through Tel Aviv and nearby municipalities on Friday and Saturday.",
          "The network publishes general service hours of Friday 16:30–02:00 and Saturday 09:00–17:30. Each line has its own stops and departures, so use the official map and timetable. If you need an accessible pickup, contact the operator in advance, generally at least three hours before your planned journey.",
          "Free weekend bus 711 serves Ben Gurion Airport Terminal 1 on selected departures, with seasonal operating hours. My Ben Gurion Airport on Shabbat guide covers the timetable and connections. For destinations without a suitable weekend bus, licensed taxis and arranged private transfers are available.",
        ],
        inlineLinks: [{ text: "Ben Gurion Airport on Shabbat guide", to: travelGuidePaths.shabbat }],
        tables: [{
          caption: "Weekend transport in Tel Aviv",
          headers: ["Service", "Weekend position", "Planning detail"],
          rows: [
            ["Regular buses, Red Line and trains", "Generally suspended", "Check Friday's last and Saturday's first services"],
            ["Na'im Busofash", "Free on selected Friday/Saturday routes", "Stops and last buses vary by line"],
            ["Local sherut", "Selected routes", "Check which routes operate on Shabbat"],
            ["Licensed taxis", "Usually available", "Fare, availability and pickup vary"],
            ["Walking and cycling", "Possible", "Consider weather and safe routes"],
          ],
        }],
        externalLinks: [
          { label: "Na'im Busofash - official timetable and routes", href: "https://busofash.co.il/" },
          { label: "Tel Aviv municipality - weekend network", href: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" },
        ],
        sourceIds: ["guide-weekend-network", "guide-telaviv-weekend-hours", "guide-weekend-711"],
      },
      {
        id: "accessibility", title: "Accessibility and practical navigation",
        paragraphs: [
          "If you're travelling with a wheelchair, stroller or heavy luggage, look for stations with lifts and step-free access, and check the route from the station to your destination. Book an appropriate accessible taxi in advance where needed.",
          "Google Maps and Moovit help compare walking, bus and rail routes. The official transport planner and operator sites provide timetables and disruptions. My getting around Israel guide covers travelling beyond Tel Aviv.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        externalLinks: [
          { label: "National public transport planner", href: "https://bus.gov.il/en/home" },
          { label: "Israel Railways - station and service notices", href: "https://www.rail.co.il/" },
        ],
        sourceIds: ["guide-bus-planner", "israel-rail", "guide-egged-accessibility", "guide-red-line-stations-2026"],
      }
,
    ],
    checklist: [
      "Choose the station or bus stop within the shortest convenient walking distance of your destination.",
      "Set up Rav-Kav or an approved payment app and validate every journey.",
      "Use the ₪8 local fare and eligible 90-minute transfers when planning costs.",
      "Confirm the Red Line service and final destination before boarding.",
      "Check the Friday and Saturday weekend bus timetable and the last return.",
      "Check luggage room, step-free routes and accessible vehicles when needed.",
    ],
    faqs: [
      { q: "Do I need a rental car in Tel Aviv?", a: "Usually not for a central visit. Walk, use city buses and the Red Line, or book taxis. A car is more useful for several day trips outside the city." },
      { q: "How do tourists pay for Tel Aviv buses?", a: "Use a loaded Rav-Kav card, an approved payment app or a contactless card on supported Dan buses. Standard local journeys up to 15 km cost ₪8; validate each boarding." },
      { q: "Can I use a foreign Visa or Mastercard on Dan buses?", a: "Participating Dan buses accept supported foreign contactless Visa and Mastercard payments at ₪8 for one full-fare ride. These taps do not include the normal 90-minute transfer benefit." },
      { q: "Is a Dan bank-card tap valid on the Red Line?", a: "No. A Dan bus bank-card payment is separate from light-rail ticketing. Validate a Rav-Kav or an approved app before boarding the Red Line." },
      { q: "Which Red Line station is best for Jaffa?", a: "Shalma and Bloomfield Stadium serve southern Jaffa, but reaching the older streets or Jaffa Port can require further walking. Check your exact destination." },
      { q: "Which Tel Aviv railway station should I choose?", a: "HaHagana serves the southern corridor, HaShalom the Azrieli area, Savidor Center connects to the Red Line at Arlozorov, and University serves northern areas. Select by your hotel address." },
      { q: "Are there free buses in Tel Aviv on Shabbat?", a: "Yes. Na'im Busofash runs selected free Friday and Saturday routes. Published general hours are Friday 16:30–02:00 and Saturday 09:00–17:30; individual lines vary." },
      { q: "Can visitors rent electric scooters or bikes?", a: "Yes, if they meet the operator and Israeli legal requirements. Electric bike and scooter riders must be at least 16 and comply with qualification, helmet, riding and parking rules." },
    ],
    sourceIds: [
      "guide-telaviv-transit", "guide-bus-planner", "guide-public-transport-payments",
      "guide-dan-bank-card-2026", "guide-red-line-stations-2026", "guide-urban-transit-validation",
      "israel-rail", "guide-train-nov-2026", "guide-gett-app", "guide-telaviv-apps",
      "guide-sherut-regulation", "guide-telaviv-bicycle-rules", "guide-telaviv-weekend-hours",
      "guide-weekend-network", "guide-weekend-711", "guide-ravkav-2026",
    ],
    related: ["israel", "taxis", "sherut", "shabbat", "airportTaxis", "arrival"],
    services: [
      { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/", note: "Rail, taxi and private airport pickup options." },
      { label: "Private Driver", to: "/private-driver-in-israel/", note: "Arrange a direct ride or a flexible day trip." },
      { label: "Tel Aviv Attractions", to: "/travel-blog/attractions-in-tel-aviv/", note: "Markets, museums and city highlights." },
      { label: "Explore Old Jaffa", to: "/attractions/jaffa/", note: "Old streets, port and walking stops." },
      { label: "Tel Aviv Beaches", to: travelGuidePaths.telAvivBeaches, note: "Beachfront areas and onward connections." },
      { label: "Where to Stay", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Choose the right neighbourhood for your plans." },
    ],
  },
  ...taxiGuideCluster,
};

// Enrich the already-migrated Jerusalem pages while retaining their full sections.
applyJerusalemGuideEditorial(travelGuides);

export type GuideDirectoryEntry = { id: string; title: string; description: string; to: LinkProps["to"]; topics: GuideTopicId[]; photo?: GuidePhoto; updatedAt?: string };

/** Only verified editorial update dates determine the directory order. */
const regionalGuideUpdateDates: Record<string, string> = {
  "attractions-in-tel-aviv": telAvivAttractionsUpdatedAt,
  "dead-sea-attractions": deadSeaAttractionsUpdatedAt,
  "museums-in-jerusalem": "2026-11-20", // JerusalemMuseumsGuide editorial update date.
};
const guideDirectoryEntries: GuideDirectoryEntry[] = [
  ...itineraryIds.map((id): GuideDirectoryEntry => {
    const g = itineraries[id];
    return { id: `israel-itinerary-${id}`, title: g.title, description: g.description,
      to: g.path as LinkProps["to"], topics: ["itineraries", "destinations", "tips"], updatedAt: g.reviewedAt ?? "",
      // Keep directory cards aligned with the distinct editorial hero for each itinerary.
      photo: migrationPhotos[g.hero] };
  }),
  ...attractionIds.filter(isRegionalOverview).map((id): GuideDirectoryEntry => { const g = attractionGuides[id]; return { id: `attraction-${id}`, title: g.title, description: g.description, to: attractionPath(id), updatedAt: regionalGuideUpdateDates[id] ?? "", topics: ["attractions","destinations",...(id.includes("mount-") || ["capernaum","tabgha"].includes(id) ? ["religion" as const] : [])], ...(g.image ? {photo:g.image}: {}) }; }),
  { id: "airport-journey-jerusalem", title: "How to get from Ben Gurion Airport to Jerusalem", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", topics: ["transportation", "tips"], photo: airportJourneyGuides.jerusalem.photo, updatedAt: airportJourneyGuides.jerusalem.updatedAt ?? "" },
  { id: "airport-journey-tel-aviv", title: "How to get from Ben Gurion Airport to Tel Aviv", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/", topics: ["transportation", "tips"], photo: airportJourneyGuides["tel-aviv"].photo, updatedAt: airportJourneyGuides["tel-aviv"].updatedAt ?? "" },
  { id: "airport-journey-haifa", title: "How to get from Ben Gurion Airport to Haifa", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/ben-gurion-airport-to-haifa/", topics: ["transportation", "tips"], photo: airportJourneyGuides.haifa.photo, updatedAt: airportJourneyGuides.haifa.updatedAt ?? "" },
  { id: "airport-journey-ein-bokek", title: "How to get from Ben Gurion Airport to Ein Bokek", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/", topics: ["transportation", "tips"], photo: airportJourneyGuides["ein-bokek"].photo, updatedAt: airportJourneyGuides["ein-bokek"].updatedAt ?? "" },
  ...Object.values(travelGuides).filter((guide) => !travelGuidePaths[guide.id].startsWith("/attractions/")).map((guide) => ({ id: guide.id, title: guide.title, description: guide.description, to: travelGuidePaths[guide.id], topics: guide.topics, photo: guide.photo, updatedAt: guide.updatedAt ?? "" })),
  { id: "stay-jerusalem", title: "Where to stay in Jerusalem", description: "Choose the neighbourhood and hotel style that fit your visit.", to: "/travel-blog/where-to-stay-in-jerusalem/", topics: ["destinations", "accommodation"], photo: stayEditorialHeroPhotos.jerusalem, updatedAt: cityStayGuides.jerusalem.reviewedAt ?? "" },
  { id: "stay-telaviv", title: "Where to stay in Tel Aviv", description: "Compare beachfront, Jaffa and central neighbourhoods.", to: "/travel-blog/where-to-stay-in-tel-aviv/", topics: ["destinations", "accommodation"], photo: stayEditorialHeroPhotos.telaviv, updatedAt: cityStayGuides.telaviv.reviewedAt ?? "" },
  { id: "stay-haifa", title: "Best Hotels in Haifa: Where to Stay", description: "Compare ten hotels across the German Colony, Mount Carmel, Hadar and Haifa beaches.", to: "/travel-blog/best-hotels-in-haifa/", topics: ["destinations", "accommodation"], photo: { src: "/images/travel-blog/featured-haifa-hotels.webp", alt: "Haifa hotels and cityscape" }, updatedAt: "2026-11-25" },
  { id: "stay-tiberias", title: "Tiberias & Sea of Galilee hotels", description: "Lakeside bases, family facilities and practical arrival checks.", to: "/travel-blog/best-hotels-in-tiberias/", topics: ["destinations", "accommodation"], photo: tiberiasStayGuide.photo, updatedAt: "2026-11-19" },
  { id: "stay-deadsea", title: "Dead Sea hotels", description: "Choose Ein Bokek, a spa stay or a family hotel on the Israeli shore.", to: "/travel-blog/best-dead-sea-hotels/", topics: ["destinations", "accommodation"], photo: deadSeaStayGuide.photo, updatedAt: "2026-11-19" },
// ISO YYYY-MM-DD dates sort lexically. Stable sort preserves existing order for
// same-day updates and entries without a known editorial revision date.
 ];

export const guideDirectory: GuideDirectoryEntry[] = guideDirectoryEntries.sort((a, b) =>
  (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")
);

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
