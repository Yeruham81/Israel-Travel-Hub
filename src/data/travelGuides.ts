import { itineraries, itineraryIds } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import type { LinkProps } from "@tanstack/react-router";
import { travelGuidePaths, AIRALO_COMPATIBILITY_AFFILIATE_URL, AIRALO_MENA_AFFILIATE_URL, type TravelGuideId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { neighborhoodGuidesForCity, cityStayGuides, haifaStayGuide, tiberiasStayGuide, deadSeaStayGuide } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import railPlatform from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import navonPlatform from "@/assets/airport-journeys/jerusalem-navon-platform.webp";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import archivedBuses from "@/assets/guides/2026-11/buses-in-tel-aviv.webp";
import sherutNesherCardPhoto from "@/assets/guides/sherut-nesher-airport.webp";
import jerusalemLightRail from "@/assets/guides/2026-11/jerusalem-light-rail.webp";
import esimPhoto from "@/assets/guides/esim-israel.jpeg";
import tiberias from "@/assets/home/tiberias-lake.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import caesarea from "@/assets/home/caesarea-dusk.webp";
import { expandedTravelGuides } from "@/data/travelGuideExpansion";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath, isRegionalOverview } from "@/data/attractionGuideTypes";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { applyJerusalemGuideEditorial } from "@/data/jerusalemClusterEditorial";
import { sanityUberGuide } from "@/data/generated/sanityUberSnapshot";
import { christianFaqs, christianToursHero } from "@/data/christianToursGuide";
import { seniorFaqs, seniorHero, seniorUpdatedAt } from "@/data/seniorToursGuide";
import { deadSeaAttractionsUpdatedAt } from "@/data/deadSeaAttractionsGuide";
import { telAvivAttractionsUpdatedAt } from "@/data/telAvivAttractionsGuide";

export const guideTopics = [
  { id: "transportation", label: "Transportation" },
  { id: "destinations", label: "Destinations" },
  { id: "attractions", label: "Attractions" },
  { id: "itineraries", label: "Itineraries & day trips" },
  { id: "tips", label: "Travel tips" },
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
  seniorTours: {
    id: "seniorTours",
    title: "Israel Tours for Seniors: Private Day Trips at Your Own Pace",
    description: "Plan comfortable Israel tours for seniors with private transport, flexible sightseeing and day trips to Jerusalem, Masada, the Galilee and coast.",
    intro: "My personal guide to unhurried, carefully planned day trips for older visitors who appreciate private transport, manageable walks and the freedom to choose their own pace.",
    answer: "Private sightseeing with a driver can connect key sites with flexible pickups, shorter walking segments and rest breaks. Choose realistic stops and confirm any essential accessibility or specialist vehicle requirements before booking.",
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
    services:[{label:"Ask Moshe about a private driver",to:"/private-driver-in-israel/"}],
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
        ["Yango", "Request a licensed taxi using the rider app where local drivers are available", "Check the displayed estimate or fixed offer before confirming", "App-based rides in supported areas"],
        ["Licensed taxi or hotel dispatcher", "Use a licensed taxi stand, hail a taxi or ask a hotel or local dispatch office", "Regulated taxi meter and permitted charges; confirm payment method", "Travellers who prefer booking without an app"],
        ["Pre-booked private transfer", "Arrange a dedicated vehicle and pickup details in advance", "Confirmed quote with agreed vehicle, waiting and cancellation terms", "Airport arrivals, longer routes, groups and extra luggage"],
      ],
    },
    sections: [
      {
        id: "uber-status",
        title: "Is Uber available in Israel?",
        paragraphs: [
          "Uber and Lyft currently have no passenger ride-booking service in Israel. An installed app does not mean you can order a car locally.",
          "On 24 March 2026, a proposal concerning app-based rides in private cars passed its first reading in the Knesset. That was a legislative step rather than approval for Uber to begin service. See the Knesset's official announcement for the proposal's recorded status.",
        ],
        externalLinks: [
          { label: "Uber — official Israel information", href: "https://www.uber.com/il/en/" },
          { label: "Knesset — March 2026 legislative announcement", href: "https://main.knesset.gov.il/News/PressReleases/pages/press24032026p.aspx" },
        ],
        sourceIds: ["guide-uber-availability", "guide-lyft-cities", "guide-ridesharing-bill-2026"],
      },
      {
        id: "taxi-apps",
        title: "Gett and Yango: booking a taxi with an app",
        paragraphs: [
          "Gett lets you request a licensed taxi, enter your destination and review the booking information. Check the pickup pin, the offered fare or estimate, and your payment method before confirming a ride. Drivers and features vary by location.",
          "Yango is another option for requesting licensed taxis where it operates. Check the pickup location, the quoted or estimated price and the available payment method in the app before booking.",
          "Download and verify your preferred app before your trip. The official App Store and Google Play listings below take you directly to the passenger apps.",
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
          "You can also get a taxi from a licensed stand, hail one on the street, call a local dispatcher or ask your hotel to book one. Confirm your exact pickup address, the regulated meter or agreed permitted fare, and how you can pay. My taxis in Israel guide covers passenger rights and booking methods.",
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
          "For a Gett ride scheduled at least two hours in advance, Terminal 3 pickup is on Level 2 by Exit 23. This differs from the on-demand queue at Exit 03. The official Gett airport page explains both arrangements.",
          "A separately booked private transfer can have its own meeting instructions. Follow the confirmation from your operator. For more details, see my Ben Gurion Airport taxis guide or arrange a private airport transfer.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/airport-transfers/" },
        ],
        highlightedLinks: [
          { label: "Gett — official Ben Gurion Airport taxi instructions", href: "https://www.gett.com/il/airport-en/", context: "On-demand queue, ride codes and advance-booked pickup points." },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "shabbat",
        title: "Taxi apps during Shabbat and late at night",
        paragraphs: [
          "Licensed taxis may operate during Shabbat, Jewish holidays and late at night, although driver availability depends on the location. For an airport arrival or another time-sensitive ride, arranging pickup in advance is sensible.",
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
          "Request child seats, wheelchair-accessible transport or a larger luggage allowance in advance and confirm the vehicle that will arrive. For longer routes, compare transport options in my getting around Israel guide or consider a confirmed private driver.",
          "If you need mobile data on arrival, my Israel eSIM guide explains the options for visiting travellers.",
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
      { q: "Can I request child seats, a minivan or an accessible vehicle?", a: "Some providers can arrange special equipment or a suitable vehicle with advance notice. Confirm the request directly rather than assuming a standard taxi will have it." },
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
    photo: { src: sherutNesherCardPhoto, alt: "Former Nesher shared airport shuttle van in Israel" },
    facts: [
      { label: "Nesher & Amal airport sherut", text: "Former scheduled shared rides to Jerusalem and Haifa — ended" },
      { label: "Local sherut minibuses", text: "Route-based shared taxis remain on some routes outside the airport" },
      { label: "Airport arrivals today", text: "Train, scheduled bus, authorized taxi or private transfer" },
    ],
    comparison: {
      caption: "Sherut, shuttle, taxi or private transfer?",
      headers: ["Ride type", "How it works", "When it is useful"],
      rows: [
        ["Local sherut (monit sherut)", "Shared minibus on a set route; each passenger pays for a seat", "Short trips along a local route when that service is running"],
        ["Pre-booked shared shuttle", "Operator confirms an available departure and sells individual places", "Travellers whose dates, luggage and pickup match an actual confirmed service"],
        ["Licensed airport taxi", "Exclusive taxi for your party, ordered via Gett or an airport kiosk", "Direct airport travel without sharing the vehicle"],
        ["Private transfer", "Dedicated vehicle arranged in advance for your group", "Flight arrivals, luggage-heavy journeys and a confirmed meeting arrangement"],
      ],
    },
    sections: [
      {
        id: "nesher-amal",
        title: "What happened to the Nesher and Amal airport sheruts?",
        paragraphs: [
          "The regular Nesher shared taxi service from Ben Gurion Airport to Jerusalem and the former Amal service to Haifa have ended. Visitors arriving today use the current rail, bus and taxi services or arrange a private pickup.",
          "Older airport guides may still show collection points for these former services. The practical alternatives for Jerusalem, Haifa, Tel Aviv and Ein Bokek are compared below.",
        ],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "local-sherut",
        title: "How local sherut taxis work in Israel",
        paragraphs: [
          "A monit sherut (מונית שירות) is usually a yellow shared minibus travelling along a numbered route. Look for its route number and destination on the front windshield. You pay for one seat rather than hiring the vehicle.",
          "At a safe, permitted place along the route, signal to a driver to stop and tell them where you would like to get off. The driver follows the designated route, and pickup or drop-off arrangements vary. Ask about the fare and whether to pay cash or another way before boarding.",
          "Local sherut services remain in selected areas, including parts of Tel Aviv, but a listed route is not a promise of a departure at your chosen time. Space for large suitcases, prams and other equipment can be limited. For wider city and intercity transport choices, see my getting around Israel guide and getting around Tel Aviv guide.",
        ],
        photo: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Sherut.JPG/800px-Sherut.JPG",
          alt: "Yellow shared sherut minibuses on a street in Tel Aviv",
          credit: "Leineabstiegsschleuse · Wikimedia Commons · public domain",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Sherut.JPG",
        },
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
          "The train station at Terminal 3 serves useful connections when rail services are operating. For Jerusalem, Haifa and Tel Aviv, choose the station nearest your destination and include the final connection to your hotel. For a direct journey, compare the licensed airport taxi queue with a confirmed private transfer.",
          "My airport-to-Jerusalem guide, airport-to-Tel Aviv guide, airport-to-Haifa guide and airport-to-Ein Bokek guide provide route-specific advice. For Friday and Saturday journeys, my airport Shabbat guide explains the available transport.",
        ],
        inlineLinks: [
          { text: "airport-to-Jerusalem guide", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "airport-to-Tel Aviv guide", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "airport-to-Haifa guide", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "airport-to-Ein Bokek guide", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { text: "airport Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        tables: [{
          caption: "Ben Gurion Airport transport by destination",
          headers: ["Destination", "Transport choices", "Arrival and onward connection"],
          rows: [
            ["Jerusalem", "Train, authorized taxi or private transfer", "Jerusalem–Yitzhak Navon station; continue to the hotel by light rail or local transport"],
            ["Tel Aviv", "Train, suitable bus, authorized taxi or private transfer", "Choose Tel Aviv HaHagana, HaShalom, Savidor Center or University according to your address"],
            ["Haifa", "Train, authorized taxi or private transfer", "Choose Haifa Hof HaCarmel, Bat Galim or HaMerkaz HaShmona for your final destination"],
            ["Dead Sea / Ein Bokek", "Bus connection via Jerusalem, authorized taxi, private transfer or rental car", "A public-transport trip typically requires a change in Jerusalem and a final bus towards Ein Bokek"],
          ],
          rowLinks: [
            { to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
            { to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
            { to: "/travel-blog/ben-gurion-airport-to-haifa/" },
            { to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          ],
        }],
        highlightedLinks: [
          { label: "Israel Railways — journey planner", href: "https://www.rail.co.il/", context: "Timetables, stations and rail connections." },
          { label: "National public transport journey planner", href: "https://bus.gov.il/en/home", context: "Current bus routes and departures for your travel day." },
        ],
        sourceIds: ["guide-iaa", "israel-rail", "guide-gett"],
      },
      {
        id: "official-taxi",
        title: "Licensed airport taxis and the free terminal shuttle",
        paragraphs: [
          "For an immediate licensed taxi, request your ride code through Gett or an airport self-service kiosk. At Terminal 3, the authorized taxi queue is on the ground floor by Exit 03. At Terminal 1, use the main arrivals exit. A licensed taxi carries your own party and operates under the regulated taxi fare system.",
          "A Gett taxi scheduled at least two hours ahead has a different Terminal 3 collection point: Level 2, Gate 23. My Ben Gurion Airport taxis guide explains the pickup procedures, and the taxi fares in Israel guide covers regulated charges.",
          "The free airport shuttle is a separate internal bus connecting Terminal 1 and Terminal 3 and airport facilities. From Terminal 3, find it on Level G near Gate 01. It serves the airport rather than transporting travellers to Tel Aviv, Jerusalem or Haifa. See my Ben Gurion Airport arrival guide for terminal guidance.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares },
          { text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival },
        ],
        highlightedLinks: [
          { label: "Gett — official airport taxi pickup instructions", href: "https://www.gett.com/il/airport-en/", context: "Where to join the taxi queue and meet pre-booked Gett drivers." },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "weekend",
        title: "Sherut and airport transport on Shabbat",
        paragraphs: [
          "Some local shared-taxi routes operate during Shabbat and Jewish holidays, but their availability depends on the particular line. The former regular Nesher and Amal airport services are no longer available, and trains and most ordinary buses pause for much of Shabbat.",
          "Free weekend Line 711 links Shoham with central Tel Aviv via Ben Gurion Airport Terminal 1 on limited Friday and Saturday departures. Its operating window changes between winter and summer schedules. The airport Shabbat transport guide explains the timetable, Terminal 3 connections and taxi alternatives.",
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
          "A commercially booked shared shuttle is a separate service from a numbered local sherut route. A company may offer individual seats on a specific departure; check that a confirmed service matches your arrival date, flight and destination.",
          "Before paying, confirm the operator and departure, exact pickup and drop-off points, total price per seat, luggage allowance, child-seat or accessibility needs, flight-delay arrangements and cancellation terms. Keep the written confirmation. You can also request a dedicated airport transfer for your own group.",
        ],
        inlineLinks: [{ text: "dedicated airport transfer", to: "/airport-transfers/" }],
        sourceIds: [],
      },
    ],
    checklist: [
      "Choose your current airport route instead of an old Nesher or Amal pickup",
      "Keep your arrival terminal, flight details and full destination address handy",
      "Compare rail or bus connections with an official airport taxi or private transfer",
      "For local sherut rides, check the route number, boarding location, fare and payment method",
      "Confirm space for luggage, child seats or accessibility equipment before booking",
      "On Friday or Saturday, check the seasonal Line 711 timetable and terminal connections",
    ],
    faqs: [
      { q: "How do I pay for a local sherut ride?", a: "You pay for your own seat. Fares and accepted payment methods depend on the route, so ask the driver about the fare and payment before boarding." },
      { q: "Can I reserve a seat on a sherut or shared shuttle?", a: "A local route-based sherut usually accepts passengers along its route as space allows. A separate commercial shared shuttle may require advance booking and written confirmation for a specific departure." },
      { q: "Can I bring large suitcases on a sherut?", a: "Capacity in shared minibuses can be limited. For large cases, prams or specialist equipment, confirm the available space and consider a vehicle arranged for your group." },
      { q: "Does a sherut or airport bus run on Shabbat?", a: "Some local sherut routes operate, but the former regular airport sheruts have ended. Free weekend Line 711 serves Terminal 1 on selected departures, with seasonal operating hours." },
      { q: "What's the difference between a sherut and a pre-booked shared shuttle?", a: "A local sherut normally follows a numbered public route and takes passengers along that line. A booked shared shuttle is a specific commercial service with its own departure time, reservation and terms." },
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
    answer: "For a short visit or a longer trip with moderate data use, I would start with Saily. For 10GB, consider Airalo. For unlimited data, GigSky has the lowest listed 30-day price of the four plans compared below. Check the daily high-speed limits before choosing.",
    updatedAt: "2026-11-15",
    topics: ["connectivity", "tips"],
    photo: { src: esimPhoto, alt: "A phone displaying an eSIM graphic in front of a blurred city background", sourceUrl: "", credit: "Illustrative eSIM screen." },
    facts: [
      { label: "Short trip", text: "3GB · 30 days · $5.99" },
      { label: "Longer trip", text: "5GB · 30 days · $7.99" },
      { label: "Heavy data use", text: "Unlimited · 30 days · $56.24" },
    ],
    comparison: {
      caption: "Compare 30-day unlimited eSIM plans",
      headers: ["Provider", "30-day price", "High-speed data"],
      rows: [
        ["GigSky", "$56.24", "3.5GB of high-speed data per day, then reduced speed"],
        ["Yesim", "$66.00", "Fair-use limits apply; check the plan for speed restrictions"],
        ["Airalo", "$69.00", "3GB of high-speed data per day, then up to 1 Mbps"],
        ["Saily", "$71.99", "5GB of high-speed data per day, then up to 1 Mbps"],
        ["Drimsim", "Not offered", "Pay-as-you-go data only"],
      ],
    },
    sections: [
      {
        id: "short-trip",
        title: "Best eSIM for a short trip",
        paragraphs: [
          "For a week of maps, WhatsApp and light browsing, 3GB is a sensible starting point. Saily costs $5.99 for 3GB valid for 30 days, while Airalo costs $6 for 3GB valid for seven days. For almost the same price, Saily gives you more flexibility if your plans change. My choice: Saily.",
        ],
        sourceIds: ["guide-esim-saily", "guide-esim-airalo"],
      },
      {
        id: "long-trip",
        title: "Best eSIM for a longer trip",
        paragraphs: [
          "For one to three weeks of navigation, messaging and browsing, 5GB should suit many visitors. Saily costs $7.99 for 30 days, almost identical to Airalo at $8 for 30 days — just a one-cent difference. Both are good-value options; compare network coverage, app features and installation instructions rather than deciding by price alone. Yesim costs $9.90 and GigSky $18.89. My choice: Saily.",
          "For frequent photo uploads, social media and video calls, consider 10GB instead. Airalo costs $11.50 for 30 days, just below Saily at $11.99; Yesim costs $16.50. My choice: Airalo.",
        ],
        sourceIds: ["guide-esim-saily", "guide-esim-saily-usd-price-nov26", "guide-esim-airalo", "guide-esim-yesim", "guide-esim-gigsky"],
      },
      {
        id: "unlimited",
        title: "Best eSIM for unlimited data",
        paragraphs: [
          "Four of the five providers offer 30-day unlimited plans for Israel. Unlimited does not mean unlimited full-speed data: the daily high-speed allowance and fair-use rules vary. Compare the published prices and limits below. Drimsim has no unlimited package.",
          "At the checked price of $56.24, GigSky is the cheapest of these four 30-day unlimited plans, with 3.5GB of high-speed data per day before speeds are reduced. Saily costs $71.99 but offers 5GB at full speed per day, which may suit heavier daily use. The reduced speed and fair-use rules can affect streaming and video calls. My choice: GigSky.",
          "Not sure you need unlimited? Airalo also lists a fixed 50GB plan for 30 days at $39 — potentially better value if your total data use stays below 50GB. Unlike unlimited plans, it has a fixed overall allowance.",
        ],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"],
      },
      {
        id: "regional",
        title: "Best eSIM for a Middle East trip",
        paragraphs: [
          "Combining Israel with Jordan, Egypt or other countries? Airalo's Middle East & North Africa regional eSIM can cover several destinations with one plan. A listed option is 5GB for 30 days at $18. Check that Israel and each additional destination are included in the exact package before buying; West Bank or Palestinian-network access is not guaranteed. My choice: Airalo.",
        ],
        externalLinks: [
          { label: "View Airalo's Middle East & North Africa plans", href: AIRALO_MENA_AFFILIATE_URL },
        ],
        sourceIds: ["guide-esim-airalo"],
      },
      {
        id: "compatibility",
        title: "Will an eSIM work on your phone?",
        paragraphs: [
          "Not sure if your phone supports eSIM? Airalo's compatibility checker lists supported iPhone, Samsung, Pixel and other models. Look up your exact model before buying, especially if it was purchased in another region.",
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
          "A data-only eSIM lets you browse, navigate and use WhatsApp or FaceTime calls. It does not automatically include ordinary phone calls, SMS or an Israeli mobile number.",
          "Airalo also offers some Israel plans with data, call minutes and SMS. Saily sells optional calls and texts with a US number, not an Israeli number. If you need standard mobile calls, compare the actual minutes and number included rather than choosing a data-only plan.",
          "You can usually keep your home SIM active for WhatsApp and verification messages while using the travel eSIM for data. For a local Israeli number, look for a plan that specifically provides one or consider a local operator.",
        ],
        sourceIds: ["guide-esim-airalo", "guide-esim-saily"],
      },
      {
        id: "coverage",
        title: "Will it work throughout Israel?",
        paragraphs: [
          "Coverage is generally easier to find in Tel Aviv, Jerusalem and other major cities than in remote areas of the Negev, Galilee and Dead Sea region. Your eSIM's local network also affects reception.",
          "Visiting Bethlehem, Jericho or other parts of the West Bank? An Israel eSIM does not necessarily include access to Palestinian mobile networks. Coverage may differ across the area, so confirm the relevant network before you go.",
        ],
        sourceIds: ["guide-esim-yesim", "guide-esim-airalo"],
      },
      {
        id: "setup",
        title: "When should you buy your eSIM?",
        paragraphs: [
          "Buy and install your travel eSIM before flying, while you have reliable Wi-Fi. Installation and the start of a plan's validity are not always the same: check the provider's activation rules so the package does not begin earlier than intended.",
          "When you arrive, select the travel eSIM as your phone's mobile-data line and enable data roaming on that line if the provider instructs you to. Disable data roaming on your home SIM and, where available, automatic mobile-data switching to avoid unexpected roaming charges. You can generally keep your home number active for calls and verification messages.",
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
      { q: "Will my Israel eSIM work in Bethlehem or Jericho?", a: "Not necessarily. Coverage in the West Bank depends on the networks included in your plan. Israeli coverage alone does not guarantee access to Palestinian networks." },
      { q: "Do travel eSIMs give me an Israeli number?", a: "Most basic plans are data-only. Some providers sell calls and SMS separately, but check the country of the phone number; a US number is not an Israeli one." },
      { q: "Can I buy an eSIM after arriving in Israel?", a: "Yes, you can buy online at any time. I recommend arranging it before the flight, so you can use maps, messages and booking details as soon as you land." },
    ],
    sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-saily-usd-price-nov26", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"],
    related: ["arrival", "airportTaxis", "uber", "taxis", "israel", "shabbat"],
    services: [
      { label: "Airport transfers", to: "/airport-transfers/", note: "Choose a confirmed pickup or compare ways to leave Ben Gurion Airport." },
      { label: "Tours & day trips", to: "/tours/", note: "Explore city tours, day trips and private sightseeing options." },
      { label: "Where to stay in Israel", to: "/accommodation/", note: "Find suitable areas and accommodation guides." },
      { label: "Israel itinerary: 7 days", to: "/travel-blog/israel-itinerary-7-days/", note: "See a practical first-time route through the country." },
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
        ["Before the flight", "Check entry eligibility, ETA-IL or visa, and airport flight information", "Passport, approval, hotel and onward-travel details"],
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
          "Check your arrival terminal and flight status with your airline or the airport before departure. For a private pickup, share your flight number and the local calendar date of arrival in Israel, especially after midnight.",
        ],
        highlightedLinks: [{
          label: "Apply for ETA-IL — official Israeli government portal",
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
          label: "Airport shuttle — official stops and timetable",
          href: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/",
          context: "The airport authority lists the current Terminal 1–Terminal 3 shuttle stops, approximately 15-minute service and airport transport information.",
        }],
        sourceIds: ["guide-iaa-terminal-2026", "guide-iaa", "guide-iaa-shuttle"],
      },
      {
        id: "passport-control",
        title: "Passport control and the blue entry card",
        paragraphs: [
          "After leaving the aircraft, follow arrivals signs to passport control and choose the appropriate lane. Eligible passengers may use automated stations; airport staff will direct you. Keep your passport, ETA-IL or visa where required, accommodation address and onward travel information ready.",
          "Border staff may ask about your visit, where you will stay and when you plan to leave. Follow their instructions and keep the entry record issued to you.",
          "International visitors normally receive a small blue entry card at passport control. Keep it with your passport throughout the trip: it documents your entry and may be requested for a tourist VAT refund when departing Israel.",
        ],
        highlightedLinks: [{
          label: "Blue entry card — Population and Immigration Authority",
          href: "https://www.iaa.gov.il/en/companies/government-offices/population-and-immigration-authority-%D7%A8%D7%A9%D7%95%D7%AA-%D7%94%D7%90%D7%95%D7%9B%D7%9C%D7%95%D7%A1%D7%99%D7%9F-%D7%95%D7%94%D7%94%D7%92%D7%99%D7%A8%D7%94/",
          context: "Official airport immigration information on the blue entry card and using it for a VAT-refund request.",
        }],
        sourceIds: ["guide-entry", "guide-blue-entry-card"],
      },
      {
        id: "baggage",
        title: "Collecting luggage and reporting a missing bag",
        paragraphs: [
          "After passport control, find your flight number on the baggage screens and follow its assigned carousel. Keep the baggage tags from check-in until all bags have arrived. Strollers, mobility equipment and oversized items may arrive at a separate collection point.",
          "If a checked bag is missing or damaged, go to the airline's baggage service desk or its ground-handling company's desk before leaving baggage reclaim. File a report, obtain the case reference (often called a Property Irregularity Report or PIR), and keep your baggage tag, flight details, contact number and delivery address in Israel.",
          "For follow-up on checked baggage or items left on an aircraft, contact the airline or its ground handler using the airport's lost-property directory. For belongings lost in the public terminal, use the airport's separate lost-and-found form.",
        ],
        externalLinks: [
          { label: "Baggage and ground-handler contacts — Israel Airports Authority", href: "https://www.iaa.gov.il/en/airports/ben-gurion/lost-found/" },
          { label: "Report an item lost in the terminal — airport form", href: "https://www.iaa.gov.il/en/airports/ben-gurion/lost-and-found/" },
        ],
        sourceIds: ["guide-lost-property"],
      },
      {
        id: "customs",
        title: "Red and green customs channels",
        paragraphs: [
          "After baggage claim, follow the customs signs. The green channel is for travellers with nothing requiring declaration; use the red channel for goods or amounts that must be declared under Israel's customs rules.",
          "Check restrictions and declaration limits if you are carrying cash, valuable goods or regulated items. The Israel Tax Authority recommends using the red channel and asking a customs officer when you are unsure.",
          "Keep receipts and supporting documents ready for anything you need to declare. Factor additional customs processing into your pickup arrangements if applicable.",
        ],
        highlightedLinks: [{
          label: "Customs rules for visitors — Israel Tax Authority",
          href: "https://www.gov.il/en/pages/guide-tourist-customs?chapterIndex=1",
          context: "Official guidance on the red and green channels, duty-free allowances and declarations.",
        }],
        sourceIds: ["guide-customs-tourists"],
      },
      {
        id: "arrivals-hall",
        title: "Meeting your driver in the public arrivals hall",
        paragraphs: [
          "After customs, enter the public arrivals hall and follow your transport provider's meeting instructions. Save the destination address, booking confirmation and a reachable telephone number or messaging contact before you leave the baggage area.",
          "For a pre-booked private transfer, use the exact meeting point specified in the confirmation. Tell your operator if baggage collection or passport control takes longer than expected, and follow the agreed waiting and flight-delay policy.",
          "Keep your belongings together, and choose the official airport information desk or your confirmed provider if you need directions to the correct collection point.",
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
          "Choose your transport according to your exact hotel or final address. Trains are useful for rail-connected cities, with a further bus, taxi or walk to some hotels. Buses serve selected routes, and an official airport taxi provides a direct metered journey.",
          "For an immediate taxi at Terminal 3, order through Gett or an airport kiosk and take your ride code to the official queue at ground-floor Exit 03. Advance-scheduled Gett taxis meet at Level 2, Exit 23. My Ben Gurion Airport taxi guide explains the full booking and pickup procedure.",
          "You can arrange a private airport transfer in advance, with the vehicle, meeting point, waiting conditions and price confirmed by the provider. My airport sherut guide explains the former shared-taxi routes and today's alternatives; the taxi fares guide covers regulated meter charges.",
          "For a complete route comparison, read my destination guides to Tel Aviv, Jerusalem, Haifa and Ein Bokek at the Dead Sea. My getting around Israel guide compares onward travel by rail, bus and taxi throughout the country.",
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
            ["Train", "Rail-connected cities and onward local connections", "Terminal 3 railway station, below the terminal; follow the train signs"],
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
          "The ranges below are practical planning allowances from landing to the public arrivals hall, based on typical passenger experience rather than official airport guarantees. A busy arrival period, a remote aircraft stand or further border checks can extend any of them.",
          "Give a pre-booked driver your flight number and agree how the meeting time, free waiting allowance and delay charges work. When possible, coordinate the final meeting after you have collected your bags.",
        ],
        tables: [{
          caption: "Estimated time from landing to the public arrivals hall",
          headers: ["Arrival situation", "Planning allowance", "How to arrange pickup"],
          rows: [
            ["Hand luggage only", "Allow roughly 30–60 minutes", "Include passport control, the walk and customs"],
            ["Checked luggage", "Allow roughly 60–120 minutes or more", "Leave time for your carousel and any baggage delay"],
            ["Wheelchair or additional arrival assistance", "Confirm an individual allowance with your airline", "Arrange ground-handler help in advance and tell the driver about the extra coordination"],
          ],
          note: "Editorial planning ranges, not airport-reported waiting times or a promise of exit time. Allow additional time for security, immigration or baggage delays.",
        }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "shabbat",
        title: "Arriving on Shabbat or a Jewish holiday",
        paragraphs: [
          "Ben Gurion Airport can receive flights on Shabbat, while most regular trains and buses pause during the weekly rest period. Check the last Friday and first Saturday-night departure for your actual travel date, including the connection from your final station to the hotel.",
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
          "For onward transport, specify child seats, all luggage and any wheelchair-accessible vehicle or ramp requirements when you book. My taxis in Israel guide explains general vehicle arrangements; the airport taxi guide covers accessible taxi requests at Terminal 3.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "airport taxi guide", to: travelGuidePaths.airportTaxis },
        ],
        highlightedLinks: [{
          label: "Accessibility and passenger assistance — Israel Airports Authority",
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
      "Confirm onward transport, the pickup point and the waiting policy",
      "Arrange mobile connectivity, child seats or accessibility assistance in advance",
    ],
    faqs: [
      { q: "Do I need an ETA-IL or a visa to enter Israel?", a: "Visitors from visa-exempt countries generally need ETA-IL approval before flying; other passports may need a visa or qualify for an exemption. The official ETA-IL fee is ₪25. Use Israel's official entry portal for passport-specific requirements." },
      { q: "What is the blue entry card and should I keep it?", a: "A blue entry card is normally issued to arriving foreign visitors at passport control. Keep it with your passport; it documents your entry and may be needed for a tourist VAT-refund request on departure." },
      { q: "What if my checked luggage does not arrive?", a: "Go to your airline's baggage or ground-handling desk before leaving baggage reclaim. Report the missing bag, keep the claim tags and obtain a reference number for follow-up or delivery." },
      { q: "Which terminal will my flight arrive at?", a: "International flights currently arrive at Terminal 3. Domestic flights from Ramon use Terminal 1. Verify your flight and terminal before travel, especially for an onward pickup." },
      { q: "How early should I arrange a driver after landing?", a: "Share your flight number and agree the pickup meeting procedure rather than relying only on scheduled landing time. Passport control and baggage collection may add considerable time; check the arrival-time planning table above." },
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
    answer: "For journeys between Tel Aviv, Jerusalem and Haifa, compare trains and buses alongside the connection to your final address. In cities, walk or use local buses and light rail; for remote attractions, a rental car, tour or private driver may save time. Pay for most public transport with a loaded Rav-Kav or an approved ticketing app, and plan separately for Shabbat and holidays.",
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
        ["Train", "Airport and cities served by rail", "Distance-based ticket", "Generally suspended", "Plan the final connection from the station"],
        ["Bus", "Cities, towns and intercity routes", "Regulated distance fare", "Most routes suspended", "Check the departure and final return service"],
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
          "Trains are useful between major cities; buses extend the network to smaller towns. Light rail and local buses work well along operating urban corridors. Compare the full trip to your hotel, including station access and changes.",
        ],
        subsections: [
          {
            id: "israel-trains", title: "Israel Railways and Jerusalem train vouchers",
            paragraphs: [
              "Israel Railways serves Ben Gurion Airport, Tel Aviv, Jerusalem, Haifa, Akko, Be'er Sheva and other destinations. Jerusalem–Yitzhak Navon is outside the Old City, Tel Aviv's stations are inland, and many Haifa hotels sit uphill from the coastal line. For terminal connections, see my airport arrival guide.",
              "For trains to or from Jerusalem–Yitzhak Navon, Israel Railways currently requires a separate free personal travel voucher as well as a valid ticket. Request the voucher for your selected train from 72 hours before departure. Confirm the rule on your actual travel date using the official link below.",
            ],
            inlineLinks: [{ text: "my airport arrival guide", to: travelGuidePaths.arrival }],
            photo: { src: navonPlatform, alt: "Platforms at Jerusalem–Yitzhak Navon railway station" },
            highlightedLinks: [
              { label: "Israel Railways — journeys, fares and departures", href: "https://www.rail.co.il/", context: "Choose stations and travel date, and check train changes and disruption notices." },
              { label: "Jerusalem line — free train travel voucher", href: "https://rail.co.il/?lan=en&page=vouchers-jerusalem", context: "Official information and instructions for the currently required advance voucher." },
            ],
            sourceIds: ["israel-rail", "guide-train-nov-2026", "guide-jerusalem-train-voucher"],
          },
          {
            id: "israel-buses", title: "City and intercity buses",
            paragraphs: [
              "Buses reach Tiberias, Safed, Nazareth, Eilat, the Dead Sea and neighbourhoods away from railway stations. For long-distance journeys, check whether the operator requires an advance seat reservation, especially on selected routes to Eilat.",
              "The national public transport planner shows stops, connections and departure times. Pay attention to the last return service, particularly on Fridays, before visiting smaller towns or rural attractions.",
            ],
            highlightedLinks: [{ label: "National public transport journey planner", href: "https://bus.gov.il/en/home", context: "Search routes using your actual date, departure point and destination." }],
            sourceIds: ["guide-bus-planner", "guide-egged-seat-reservations"],
          },
          {
            id: "israel-light-rail", title: "Urban rail, Metronit and Haifa cable cars",
            paragraphs: [
              "In Jerusalem, the Red Line serves the city centre and approaches to the Old City. The first Green Line L3 service opened in August 2026 and was extended in November from the Malha area via the centre to Damascus Gate. Check the current operating map: later planned extensions are separate from the lines already running.",
              "Greater Tel Aviv's Red Line links parts of Tel Aviv–Jaffa, Ramat Gan, Bnei Brak, Petah Tikva and Bat Yam. In Haifa, the Metronit rapid-bus network, Carmelit underground funicular and Rakbalit transit cable car serve different corridors. The tourist cable car near Bat Galim is a different service.",
              "Use the fare and validation method accepted by your service. For light rail, validate before boarding.",
            ],
            photo: { src: jerusalemLightRail, alt: "Jerusalem light rail train by a city station" },
            highlightedLinks: [{ label: "Jerusalem light rail — official service updates", href: "https://j-lrt.co.il/updates/", context: "Operating lines, stations, service notices and planned extensions." }],
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
              "Visitors can purchase an anonymous Rav-Kav without an Israeli ID or personal photo at selected sales points. Load a suitable fare or pass in advance. Compatible phones can add value using Rav-Kav Online, and the card works as a practical backup when mobile data is unavailable.",
              "Approved apps including Moovit and Rav-Pass can validate eligible journeys. Set up your payment method before travelling and follow the instructions on buses, at rail gates and on light rail. For mobile data during your visit, see my Israel eSIM guide.",
            ],
            inlineLinks: [{ text: "my Israel eSIM guide", to: travelGuidePaths.esim }],
            highlightedLinks: [{ label: "Rav-Kav Online — visitor instructions", href: "https://ravkavonline.co.il/en/public-transport-in-israel", context: "Where to obtain, load and use Rav-Kav, including fare and transfer guidance." }],
            sourceIds: ["guide-ravkav-2026", "guide-ravkav-visitor", "guide-public-transport-payments"],
          },
          {
            id: "israel-ticket-rules", title: "Fares, transfers and credit-card taps",
            paragraphs: [
              "The standard ₪8 fare applies to journeys up to 15 km under the current distance-based system. Eligible city bus and light-rail journeys can include transfers within 90 minutes, provided each leg is correctly validated. For several daily journeys, compare a day pass with individual fares; longer journeys have different prices.",
              "Since January 2026, Egged has accepted contactless international Visa and Mastercard cards and digital wallets on selected services in Eilat, Jerusalem and metropolitan Haifa. This is not a nationwide payment method: it generally covers a full-fare single journey, without the ordinary Rav-Kav or app transfer and discount benefits. For children and reduced-fare tickets, check passenger eligibility and validation rules.",
            ],
            highlightedLinks: [{ label: "Egged — supported credit-card payment routes", href: "https://www.egged.co.il/en/information-for-passengers/rav-kav-and-payment-apps", context: "The pilot locations, accepted cards and single-ride limitations." }],
            sourceIds: ["guide-select-card-payment", "guide-egged-card-payment-2026", "guide-urban-transit-validation", "guide-ravkav-2026"],
          },
        ],
      },
      {
        id: "taxis-and-sherut", title: "Taxis, shared taxis and private transfers",
        paragraphs: [
          "Licensed taxis serve direct journeys, including evenings and Shabbat. Gett and Yango help book taxis where available. For booking methods, metered fares and airport collection, see my taxis in Israel guide, taxi fares guide and Ben Gurion Airport taxi guide.",
          "A local sherut (shared minibus) follows a set route and charges per passenger. Some local routes still operate, while the former regular Nesher and Amal shared airport rides have ended. My Sherut in Israel guide explains the difference.",
          "For an airport arrival, the railway station is at Terminal 3. Authorized taxis can be requested through Gett or an airport kiosk; a private transfer is arranged separately in advance. My airport arrival guide covers the terminal, and my airport Shabbat guide explains weekend alternatives.",
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
              "Taxis can be booked at taxi stands, via your hotel or through Gett or Yango where supported. Confirm the pickup, payment and fare basis. Uber and Lyft currently do not offer passenger rides in Israel; my Uber alternatives guide compares the local booking choices.",
            ],
            inlineLinks: [{ text: "Uber alternatives guide", to: travelGuidePaths.uber }],
            sourceIds: ["guide-gett-app", "guide-yango-israel", "guide-uber-availability", "taxi-fares-2026"],
          },
          {
            id: "israel-sherut", title: "Shared taxis on local routes",
            paragraphs: [
              "Local sherut minibuses charge individual fares on designated routes. Stops, luggage capacity, payment and Shabbat operation vary. Check the exact route before using one for your journey.",
            ],
            sourceIds: ["guide-sherut-regulation"],
          },
        ],
      },
      {
        id: "destinations", title: "Getting around cities and regions",
        paragraphs: [
          "Travel time depends on where you stay and how you connect from the nearest station. These practical pointers help you choose the right local guide.",
        ],
        subsections: [
          {
            id: "israel-tel-aviv", title: "Tel Aviv and Old Jaffa",
            paragraphs: [
              "Walk, cycle on suitable routes, or use buses and the Red Line. The railway stations are inland from the beach, so plan the final journey to your hotel. My getting around Tel Aviv guide covers stations, local tickets and weekend buses.",
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
              "Haifa's railway stations lie near the coast; much of the city climbs Mount Carmel. Combine buses, Metronit and the Carmelit where useful, and plan a taxi or uphill connection to your accommodation. See my Haifa attractions guide and airport-to-Haifa guide.",
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
              "Regional buses connect Tiberias, Nazareth and other towns, but many attractions around the Sea of Galilee are separated by long distances. Check the last bus and the walking distance from its stop. A rental car, private driver or day tour can help with multiple sites; the Tiberias accommodation guide compares convenient bases.",
            ],
            inlineLinks: [{ text: "Tiberias accommodation guide", to: "/travel-blog/best-hotels-in-tiberias/" }],
          },
          {
            id: "israel-eilat", title: "Eilat, the Negev and the Dead Sea",
            paragraphs: [
              "There is no passenger rail line to Eilat or the Ein Bokek hotel area. Check intercity bus reservations and connections, particularly for remote desert sites. My Eilat attractions guide, Jerusalem-to-the-Dead-Sea guide and airport-to-Ein-Bokek guide provide destination-specific options.",
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
            highlightedLinks: [{ label: "Example rental conditions — Hertz Israel", href: "https://www.hertz.co.il/en/GoodToKnow/IsraelContract/", context: "Check your own provider's territorial restrictions and insurance exclusions." }],
            sourceIds: ["guide-rental-territory"],
          },
          {
            id: "israel-drivers", title: "Private driver or organized tour?",
            paragraphs: [
              "A private driver provides transport for your agreed itinerary; guiding, admission tickets and extra stops depend on the arrangement. A guided tour may include more fixed sightseeing services. Compare hours, pickup, vehicle size and total price. See my private driver page or the tours and day trips directory.",
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
          "Most regular trains and buses pause before Shabbat begins on Friday and resume after Saturday evening; some holidays have similar service restrictions. Check the exact last and first departures for your route.",
          "Tel Aviv's free Na'im Busofash network operates selected Friday and Saturday routes, while some local sheruts and licensed taxis may be available. See Israel's Calendar of Events for holiday dates and my airport Shabbat transport guide for Line 711 at Terminal 1 and airport taxi alternatives.",
        ],
        inlineLinks: [
          { text: "Israel's Calendar of Events", to: "/travel-blog/calendar-of-events/" },
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
        ],
        highlightedLinks: [{ label: "Na'im Busofash — weekend network", href: "https://busofash.co.il/", context: "Participating communities, Friday and Saturday stops and schedules." }],
        sourceIds: ["guide-weekend-network", "guide-telaviv-transit", "israel-rail"],
      },
      {
        id: "planning", title: "Popular journeys and practical travel tips",
        paragraphs: [
          "Plan from your real departure address to the final hotel or attraction, including any walking and transfers. Save the last return trip and your route offline, especially before travel to rural areas, parks or during major events.",
        ],
        subsections: [
          {
            id: "israel-popular-journeys", title: "Common intercity routes",
            paragraphs: [
              "Compare the first practical service for each journey, then open the linked route guide or official planner for the precise travel date.",
            ],
            tables: [{
              caption: "Four common journeys in Israel",
              headers: ["Journey", "Compare first", "Arrival or connection"],
              rows: [
                ["Tel Aviv ↔ Jerusalem", "Train or direct intercity bus", "Jerusalem–Yitzhak Navon and onward light rail or bus to the hotel"],
                ["Ben Gurion Airport → Haifa", "Direct train when running", "Choose the Haifa station nearest your address"],
                ["Jerusalem → Ein Bokek", "Scheduled Dead Sea bus", "Confirm the resort stop and last return service"],
                ["Tel Aviv → Tiberias", "Intercity bus", "Confirm the terminal, final stop and return bus"],
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
              "Station lifts, bus equipment, wheelchair places and step-free routes vary. Some intercity accessible services require advance arrangements. Check the actual departure and boarding point, and confirm child seats or luggage capacity with your chosen taxi or private-transfer provider.",
            ],
            highlightedLinks: [{ label: "Egged — accessibility arrangements", href: "https://www.egged.co.il/en/accessibility-statement", context: "Accessible vehicles, reservation requirements and passenger assistance." }],
            sourceIds: ["guide-egged-accessibility"],
          },
        ],
      },
    ],
    checklist: [
      "Compare the full journey from your starting address to your hotel or attraction.",
      "Choose a loaded Rav-Kav or approved payment app and validate every ride.",
      "Check 90-minute transfers, longer-distance fares and day passes.",
      "For Jerusalem trains, check whether the free advance voucher is required.",
      "Check weekend and holiday timetables before travelling.",
      "Confirm the last return service, luggage space and accessibility arrangements.",
      "For rural travel, review weather, attraction access and offline directions.",
    ],
    faqs: [
      { q: "Can I travel around Israel without renting a car?", a: "Yes. Trains, buses and light rail serve most major cities, with taxis for final connections. A rental car, arranged tour or private driver is more useful for remote sites and several rural stops." },
      { q: "Is the train or bus better between Tel Aviv and Jerusalem?", a: "Both are useful. The train arrives at Jerusalem–Yitzhak Navon, outside the Old City, so compare the onward connection to your destination with the direct bus route." },
      { q: "Do tourists need an Israeli ID for a Rav-Kav card?", a: "An anonymous Rav-Kav generally requires no Israeli ID or photograph. Buy and load it at a supported point before you travel." },
      { q: "Can I use a foreign credit card on every bus?", a: "No. Contactless Visa or Mastercard payments are accepted on selected Egged buses in Eilat, Jerusalem and metropolitan Haifa. Use a loaded Rav-Kav or approved app for wider network access." },
      { q: "How do ₪8 fares and 90-minute transfers work?", a: "A standard journey up to 15 km costs ₪8. Eligible bus and light-rail transfers within 90 minutes are included when you validate correctly; longer journeys and special products use other fare rules." },
      { q: "Do I need an advance train voucher for Jerusalem?", a: "Israel Railways currently requires a separate free personal voucher for travel to or from Jerusalem–Yitzhak Navon, available from 72 hours before your selected train. Check the official rule for your date; the voucher does not replace your ticket." },
      { q: "Does public transport operate during Shabbat?", a: "Most regular trains and buses pause for much of Shabbat. Selected local shared taxis and weekend buses operate on specific routes; licensed taxis and confirmed private transfers are other options." },
      { q: "Can I reach Eilat and the Dead Sea without a car?", a: "Intercity buses serve Eilat and Dead Sea destinations, sometimes with connections or seat reservations. There is no passenger train to Eilat or Ein Bokek; plan the last bus and final stop." },
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
      { label: "Airport to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/", note: "Plan the station and final connection." },
      { label: "Israel eSIM", to: travelGuidePaths.esim, note: "Use maps and tickets on arrival." },
    ],
  },
telAviv: {
    id: "telAviv",
    title: "Getting Around Tel Aviv: Buses, Red Line, Taxis & Shabbat Travel",
    description: "Practical Tel Aviv transport guide: how to pay for buses and the Red Line, which train station to use, weekend buses, taxis, bikes and accessible travel.",
    intro: "Tel Aviv is easy to explore on foot, by bus, light rail or taxi. Here's how to reach the beaches, Old Jaffa and other neighbourhoods, pay for public transport and travel during Shabbat.",
    answer: "For most visitors, walking and city buses are the easiest ways to explore Tel Aviv. The Red Line light rail is also useful when its stations are close to your destination. Use Israel Railways for airport and intercity journeys; its Tel Aviv stations are inland, away from the beach. Taxis are convenient for late arrivals, heavy luggage and trips during Shabbat. Regular buses and trains generally stop during Shabbat, but Tel Aviv has a free weekend bus network on selected routes.",
    updatedAt: "2026-11-12",
    topics: ["transportation", "destinations", "tips"],
    photo: {src: jerusalemLightRail, alt: "Tel Aviv light rail tram on the Red Line"},
    facts: [
      { label: "Best starting point", text: "Walk locally; check buses and the Red Line light rail for cross-town trips" },
      { label: "How to pay", text: "Rav-Kav card or an authorized app; card taps are not yet universal" },
      { label: "Weekend travel", text: "Normal services pause; check the free municipal weekend map", link: { text: "weekend map", href: "https://experience.arcgis.com/experience/9f4b2c7f7143485a887e8576a15ce8e7/" } },
    ],
    comparison: {
      caption: "Getting around Tel Aviv at a glance",
      headers: ["Option", "Best for", "Cost", "On Shabbat?", "What to check"],
      rows: [
        ["Walking", "Beachfront and compact sightseeing clusters", "Free", "Yes", "Walking distance, heat and safe crossings"],
        ["City bus", "Neighborhoods and cross-town journeys", "Public fare", "Regular routes stop", "Correct stop, direction and ticket payment"],
        ["Light rail (Red Line)", "Journeys along its operating corridor", "Public fare", "No regular service", "Nearest station and train destination"],
        ["Israel Railways", "Ben Gurion Airport and intercity journeys", "Distance-based", "No regular service", "Choose the right station for your hotel"],
        ["Licensed taxi", "Luggage, late arrivals and direct trips", "Higher, metered or agreed", "Usually available", "Pickup location, fare and vehicle requirements"],
        ["Shared taxi (sherut)", "Specific fixed corridors", "Route-dependent", "Some routes may run", "Current route, stops and fare"],
        ["Na'im Busofash", "Selected Friday/Saturday municipal corridors", "Free", "Yes, special service", "Route, timetable and last return bus"],
        ["Rental bike or e-scooter", "Suitable short city trips", "Rental-dependent", "Usually, subject to operator", "Age requirements, cycling rules and parking"],
        ["Rental car", "Day trips outside the city", "Variable; parking extra", "Driving possible", "Parking signs, traffic, return hours and insurance"],
      ],
    },
    sections: [
      {
        id: "choose", title: "What is the best way to get around Tel Aviv?",
        paragraphs: [
          "You can combine walking, buses, light rail and taxis during your stay. Walking works well between nearby attractions, while buses and taxis are useful for longer journeys. Include walking and waiting time when comparing routes.",
          "Choose a hotel close to the areas you'll visit most often. Staying near the seafront and central streets may reduce taxi rides, while Jaffa and destinations farther east may require a separate journey. The where to stay in Tel Aviv guide can help you choose a convenient base.",
        ],
        bullets: [
          "Group nearby attractions together, such as Old Jaffa and the port, Neve Tzedek and Rothschild Boulevard, or the beachfront.",
          "Check the return journey first when traveling on Friday or before a holiday.",
          "Check your bus stop and station exit, especially if you need step-free access.",
          "With heavy luggage, a direct taxi may be easier than several transfers.",
        ],
        inlineLinks: [{ text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" }],
        sourceIds: ["guide-telaviv-transit", "guide-bus-planner"],
      },
      {
        id: "paying", title: "How to pay for public transport in Tel Aviv",
        paragraphs: [
          "You generally cannot buy a ticket from the bus driver with cash. Before your first journey, load a Rav-Kav card or set up an approved public transport payment app. Some buses accept contactless Visa or Mastercard payments, but you cannot use this method on every bus or train.",
          "Having a ticket or pass isn't enough. You must also validate each journey. Check whether your ticket covers the route and any transfers you plan to make.",
        ],
        subsections: [
          {
            id: "ta-ravkav", title: "Rav-Kav: a practical choice for visitors",
            paragraphs: [
              "Tourists can buy and load an anonymous Rav-Kav card at selected locations. Check where to buy a new card, as not every station or shop sells one. You can also top up your card using a compatible smartphone.",
              "Tap your card on the bus validator when boarding. On the Red Line, validate before boarding, even when using a travel pass or eligible transfer. Keep your card available in case a ticket inspector asks to see it.",
            ],
            externalLinks: [{ label: "Rav-Kav Online — card information and top-up", href: "https://ravkavonline.co.il/en/" }],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets"],
          },
          {
            id: "ta-mobile-payment", title: "Paying with an authorized transport app",
            paragraphs: [
              "Approved payment apps let you pay for public transport without a physical Rav-Kav card. Install the app and check your account, payment method and mobile connection before travelling. Payment instructions vary by service. On the Red Line, follow the station's app and QR-code instructions before boarding.",
              "Not every route-planning app can pay for tickets. Check that your app supports payment and that you've validated your journey. Even when a transfer is included, validate the next leg.",
            ],
            sourceIds: ["guide-public-transport-payments", "guide-redline-tickets"],
          },
          {
            id: "ta-bank-card", title: "Can I tap a foreign credit card on a bus?",
            paragraphs: [
              "Dan accepts contactless Visa and Mastercard payments, including supported foreign cards and digital wallets, on participating buses. Under its published rules, a bank-card payment covers one full-fare journey for one passenger, without the usual 90-minute transfer benefit or passenger discounts. Check the current fare before travelling.",
              "Contactless payment rules vary between operators and are not the same on buses, light rail and Israel Railways. For transfers, group travel or reduced fares, a Rav-Kav or approved payment app may be more suitable.",
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
          "Tel Aviv is a great city for walking, especially around the beachfront, markets and central neighbourhoods. However, Old Jaffa, Tel Aviv Port and the northern museums are farther apart than they may appear. Check walking distances before setting out.",
          "Allow for summer heat, shade, water, crossings and step-free access. With heavy luggage, consider a taxi for longer walks. The Tel Aviv beaches guide and Jaffa travel guide can help you plan individual stops.",
        ],
        photo: { src: telAvivDizengoff, alt: "Pedestrian-friendly streets in Tel Aviv's Dizengoff area" },
        inlineLinks: [
          { text: "northern museums", to: travelGuidePaths.telAvivMuseums },
          { text: "Tel Aviv beaches guide", to: travelGuidePaths.telAvivBeaches },
          { text: "Jaffa travel guide", to: "/attractions/jaffa/" },
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
          "Buses cover more of Tel Aviv than the Red Line light rail, connecting hotels, beaches, markets, museums and university areas. Bus routes and stops may change during roadworks or events. Check your journey using your exact starting point and destination.",
          "At the bus stop, confirm the route number and direction before boarding. Use a loaded Rav-Kav, approved payment app or another method accepted by the operator, and validate your ride. On Fridays and holidays, check the last departure in advance.",
        ],
        photo: { src: archivedBuses, alt: "City buses at a Tel Aviv metropolitan transport terminal" },
        bullets: [
          "Check the live stop and service direction, especially on one-way streets.",
          "Plan the final walk from the stop, including crossings and stroller access.",
          "Some night buses operate only on selected nights. Don't assume your regular route runs around the clock.",
          "Use official operator or route-planner notices to confirm disruptions and the last return.",
        ],
        externalLinks: [{ label: "National public-transport route planner", href: "https://bus.gov.il/en/home" }],
        sourceIds: ["guide-telaviv-transit", "guide-bus-planner", "guide-public-transport-payments"],
      },
      {
        id: "red-line", title: "Tel Aviv light rail: Red Line stops and how it works",
        paragraphs: [
          "The Red Line connects parts of Tel Aviv–Jaffa with Bat Yam, Ramat Gan, Bnei Brak and Petah Tikva. It's useful for journeys through central and southern Tel Aviv and parts of Jaffa, but it does not run along the beachfront or serve many northern hotels directly. The planned Green and Purple Lines are separate from the operating Red Line; check which lines are open before travelling.",
          "Red Line trains may have different final destinations (R1, R2 and R3). Check the electronic signs and make sure your train stops where you need to get off.",
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
            "Buy or validate your Red Line ticket before boarding the train. At street-level stops, use the ticket machine or validator. At underground stations, follow the signs for Rav-Kav cards or payment apps. Keep the validated card or app ticket for inspection.",
            "Validate every journey, even if your pass or transfer covers the fare. Follow the exit-gate instructions when leaving underground stations. Paying by bank card on a Dan bus does not give you a valid Red Line ticket.",
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
          "Israel Railways is useful for airport and intercity trips. Tel Aviv's four main railway stations are inland, away from the beachfront. Choose the station with the easiest bus, taxi or walking connection to your destination.",
          "Use the Israel Railways planner for your travel date. Train schedules can change, so check departure times, connections and the last service. See my Ben Gurion Airport to Tel Aviv guide for the full journey to your hotel.",
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
          { text: "Ben Gurion Airport to Tel Aviv guide", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
        ],
        externalLinks: [{ label: "Israel Railways — schedules and station search", href: "https://www.rail.co.il/" }],
        sourceIds: ["israel-rail", "guide-train-nov-2026"],
      },
      {
        id: "taxis", title: "Licensed taxis and taxi-booking apps",
        paragraphs: [
          "A taxi is convenient for late journeys, heavy luggage, Shabbat travel or destinations that are difficult to reach by public transport. Use Gett where available, a taxi stand or your hotel to arrange a licensed driver.",
          "Confirm your pickup point, fare type and payment method before travelling. Arrange extra luggage space, child seats or an accessible vehicle in advance. Uber and Lyft do not currently offer passenger rides in Israel. See my Uber alternatives guide for local booking options.",
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
          "A sherut is a shared taxi or minibus that follows a set route, rather than a private taxi hired for your journey. Some local routes operate when regular buses do not, but stops, fares and hours vary. Check whether the route still operates and where passengers can board.",
          "Before travelling, confirm the sherut route, direction, fare, payment method and return service. See my sherut guide for more on local routes and airport alternatives.",
        ],
        inlineLinks: [{ text: "sherut guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-sherut-regulation"],
      },
      {
        id: "bikes", title: "Bicycles and electric scooters",
        paragraphs: [
          "Cycling is a convenient way to explore the promenade, parks and streets with designated bike lanes. To rent a shared bike or scooter, you'll usually need the operator's app and a payment method. Check where you're allowed to ride and park.",
          "Riders of electric bikes and scooters must be at least 16 and meet the applicable Israeli qualification requirements. Helmets are mandatory, riding on ordinary pedestrian pavements is prohibited, and electric scooters cannot carry passengers. Use designated bike lanes where available, follow the road rules and take extra care at junctions. Check the legal requirements before renting; a foreign driving licence may not be enough on its own.",
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
          "Regular buses, trains and the Red Line generally do not operate during Shabbat. Tel Aviv and nearby municipalities provide free weekend buses through the Na'im Busofash network. It covers selected routes only, so check the map and timetable before travelling.",
          "The weekend bus network operates selected routes on Friday afternoons, Friday nights and Saturdays. Check the official map for current routes and operating hours. Bus 711 serves Ben Gurion Airport Terminal 1 on selected departures, not Terminal 3 directly. Check the timetable and terminal connection before relying on it.",
          "If the weekend buses don't serve your destination, consider walking, a licensed taxi or a pre-booked ride. For flights, see my Ben Gurion Airport on Shabbat guide and check terminal access and luggage requirements.",
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
          "You usually don't need a car for sightseeing in central Tel Aviv. Consider renting one if you're visiting several destinations outside the city.",
          "Parking in Tel Aviv can be difficult and expensive. Blue-and-white street parking is not necessarily free, so check the signs for payment hours and permit restrictions. Before renting, compare insurance, deposits, permitted roads and rental desk hours, especially near holidays.",
        ],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "accessibility", title: "Accessibility, navigation apps and final planning",
        paragraphs: [
          "If you're travelling with a wheelchair, stroller or heavy luggage, check station lifts, accessible entrances and the final route to your destination. Accessibility varies between stations and vehicles. If you need a wheelchair-accessible taxi, book a suitable vehicle in advance.",
          "Route-planning apps are useful, but may not immediately reflect road closures or special events. Use Google Maps or Moovit to compare routes, and check official transport websites for service changes and fares. For travel beyond Tel Aviv, see my getting around Israel guide.",
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
      { label: "From Ben Gurion Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Official airport taxi pickup", to: travelGuidePaths.airportTaxis },
    ],
    checklist: [
      "Choose a hotel close to the areas you'll visit most",
      "Check the exact bus stop, Red Line station and final walking distance",
      "Load a Rav-Kav or configure an approved transport payment app before boarding",
      "Validate every journey and check whether your ticket includes transfers",
      "For taxis, confirm your pickup point and how the fare is calculated",
      "For a bike or scooter, check age, qualification, helmet and parking rules",
      "Check the last return service on Fridays and the separate weekend bus timetable",
      "If accessibility matters, confirm the working lift, step-free route or suitable vehicle",
    ],
    faqs: [
      { q: "Do I need a car to see Tel Aviv?", a: "Usually not for a central stay. Combine walking with buses, the Red Line when convenient, and taxis for luggage or awkward connections. A car can make more sense for multiple rural day-trip stops." },
      { q: "How do tourists pay for city buses?", a: "Use a loaded Rav-Kav, an approved payment app or a bank card only where the operator specifically supports it. Cash to the driver is not the normal method. Validate each journey." },
      { q: "Can I use a foreign Visa or Mastercard on Dan buses?", a: "Dan accepts supported foreign contactless Visa and Mastercard payments on participating buses. Each card payment covers one full-fare ride without the usual 90-minute transfer benefit. Check the current fare before travelling." },
      { q: "Is my Dan bus bank-card tap valid on the Red Line?", a: "No. A contactless bank-card ride on Dan is separate from light-rail ticketing. Use a valid Rav-Kav or approved app and validate before boarding the tram." },
      { q: "Do I need to validate again when transferring?", a: "Yes. Revalidate each bus or Red Line leg even when an eligible pass or transfer means no additional payment. Direct bank-card taps on Dan do not include the usual 90-minute free transfer." },
      { q: "Does the Red Line reach Tel Aviv's beaches?", a: "Not directly along the beachfront. It serves central and southern corridors, including parts of Jaffa. Compare the final walk or a bus connection with a direct bus or taxi." },
      { q: "Which Red Line station is best for Jaffa?", a: "Shalma, Bloomfield or another southern stop may help, depending on your exact destination, but Old Jaffa and the port can require additional walking. Check the route and station exit." },
      { q: "What is the difference between R1, R2 and R3?", a: "R1, R2 and R3 refer to different Red Line services and destinations. Not every train follows the same route. Check the destination signs before boarding." },
      { q: "Which Tel Aviv railway station should I choose for my hotel?", a: "Choose among Tel Aviv University, Savidor Center, HaShalom and HaHagana based on your hotel's location. None is directly on the beach." },
      { q: "Is Israel Railways useful within Tel Aviv?", a: "Israel Railways is mainly useful for airport and intercity travel. For most sightseeing within Tel Aviv, walking, buses, light rail or taxis are easier." },
      { q: "Are there free buses in Tel Aviv on Shabbat?", a: "Yes. Na'im Busofash offers free buses on selected Friday and Saturday routes. Check the official map for stops and times." },
      { q: "Can weekend Line 711 get me to Ben Gurion Airport?", a: "Bus 711 serves Terminal 1 on selected weekend departures. Check the timetable and terminal connection carefully before using it for a flight." },
      { q: "Do taxis operate in Tel Aviv on Shabbat?", a: "Licensed taxis are generally available but prices, availability and waiting time vary. Arrange a ride ahead where practical, especially with luggage or an accessibility requirement." },
      { q: "Can visitors rent an electric scooter?", a: "Only if they satisfy Israeli legal and the rental company's requirements. Electric scooter and bicycle riders must be at least 16 and meet the applicable qualification rules. A helmet, legal riding area and correct parking are essential." },
      { q: "Is Tel Aviv easy to navigate with a wheelchair or stroller?", a: "Accessibility depends on your route and the stations involved. Check lifts, step-free access and vehicle availability, or book an accessible taxi in advance. The weekend network also has an advance accessibility coordination procedure." },
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
    related: ["israel", "taxis", "sherut", "shabbat", "airportTaxis", "arrival"],
    services: [
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Compare neighborhoods by the places you plan to visit and your transit options." },
      { label: "Explore Old Jaffa", to: "/attractions/jaffa/", note: "Plan the old streets, port and connections to the rest of the city." },
      { label: "Tel Aviv beaches guide", to: travelGuidePaths.telAvivBeaches, note: "Choose a stretch of shoreline and plan walking or onward transport." },
      { label: "Attractions in Tel Aviv", to: "/travel-blog/attractions-in-tel-aviv/", note: "Explore sights, museums and neighbourhoods." },
    ],
  },

  ...taxiGuideCluster,
};

// Enrich the already-migrated Jerusalem pages while retaining their full sections.
applyJerusalemGuideEditorial(travelGuides);

// Only the selected, validated Sanity build snapshot overrides the Uber guide.
// Ordinary builds continue using the source-controlled content.
if (sanityUberGuide) travelGuides.uber = sanityUberGuide;

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
  { id: "stay-haifa", title: "Where to stay in Haifa", description: "Understand coastal, German Colony and Carmel hotel locations.", to: "/travel-blog/best-hotels-in-haifa/", topics: ["destinations", "accommodation"], photo: { src: "/images/travel-blog/featured-haifa-hotels.webp", alt: "Haifa hotels and cityscape" }, updatedAt: "2026-11-19" },
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
