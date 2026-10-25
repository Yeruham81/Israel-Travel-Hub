import { itineraries, itineraryIds } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import type { LinkProps } from "@tanstack/react-router";
import { getShorePort } from "@/data/shoreExcursions";
import { travelGuidePaths, type TravelGuideId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import airportPickup from "@/assets/home/airport-pickup.webp";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import roadTrip from "@/assets/home/road-trip.webp";
import esimPhoto from "@/assets/guides/esim-israel.jpeg";
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
export type GuideTable = { caption: string; headers: string[]; rows: string[][]; note?: string };
export type GuideSection = { id: string; title: string; paragraphs: string[]; bullets?: string[]; sourceIds?: string[]; photo?: GuidePhoto; links?: { label: string; to: LinkProps["to"] }[]; inlineLinks?: { text: string; to: LinkProps["to"] }[]; tables?: GuideTable[] };
export type GuideReading = { label: string; href: string; note: string };
export type TravelGuide = {
  id: TravelGuideId; title: string; description: string; intro: string; answer: string; updatedAt?: string;
  topics: GuideTopicId[]; photo: GuidePhoto; facts: { label: string; text: string }[];
  comparison: { caption: string; headers: string[]; rows: string[][] };
  sections: GuideSection[]; checklist: string[]; faqs: { q: string; a: string }[];
  sourceIds: string[]; related: TravelGuideId[];
  services: { label: string; to: LinkProps["to"]; note?: string }[];
  reading?: GuideReading[]; reviewNote?: string; providerPageId?: string;
  nextSteps?: { label: string; to: LinkProps["to"] }[];
};

const pickupPhoto: GuidePhoto = { src: airportPickup, alt: "Illustration of an airport pickup with driver and luggage" };
const hallPhoto: GuidePhoto = { src: airportHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };

export const travelGuides: Record<TravelGuideId, TravelGuide> = {
  ...expandedTravelGuides,
  ...planningGuides,
  ...cityCultureGuides,
  ...heritageGuides,
  ...journeyDestinationGuides,
  uber: {
    id: "uber",
    title: "Is Uber Available in Israel in 2026? Gett & Yango Alternatives",
    description: "No, Uber is not available for rides in Israel in 2026. See how to use Gett, Yango, licensed taxis and private transfers in Tel Aviv, Jerusalem and Ben Gurion Airport.",
    intro: "If you normally use Uber when travelling, here is the answer for Israel in 2026 and the taxi apps and booking methods that can actually help you get around.",
    answer: "No. Uber is not available for passenger rides in Israel in 2026. Uber's official Israel website confirms that its service is unavailable here. For local travel, consider Gett or Yango to book a licensed taxi, a street or hotel-arranged taxi, or a private transfer confirmed in advance. Check the actual pickup, fare and payment conditions before booking.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-10-22",
    photo: pickupPhoto,
    facts: [
      { label: "Uber in Israel", text: "Not available for passenger rides in 2026" },
      { label: "Taxi-booking apps", text: "Gett and Yango; availability depends on your location" },
      { label: "Airport arrival", text: "Official taxis ordered through Gett or an airport self-service kiosk" },
    ],
    nextSteps: [
      { label: "How taxis in Israel work", to: travelGuidePaths.taxis },
      { label: "Official taxi fares and tariff hours", to: travelGuidePaths.taxiFares },
      { label: "Ben Gurion Airport taxi pickup", to: travelGuidePaths.airportTaxis },
      { label: "Airport travel on Shabbat", to: travelGuidePaths.shabbat },
    ],
    comparison: {
      caption: "The practical alternatives to Uber in Israel",
      headers: ["Option", "When it is useful", "What to confirm"],
      rows: [
        ["Gett", "Booking licensed taxis through an app; the official Ben Gurion Airport taxi system", "Available car, fare basis, supported payment and pickup instructions"],
        ["Yango", "Another app for licensed taxi booking in cities and other supported areas", "Actual coverage, payment options, vehicle and fare shown locally"],
        ["Local taxi or hotel dispatcher", "When you want a taxi without installing an app", "Licensed vehicle, meter, exact address and payment"],
        ["Pre-booked private transfer", "Airport pickup, early travel, luggage or a larger group", "Confirmed booking, total price, exact meeting point, vehicle and waiting terms"],
      ],
    },
    sections: [
      {
        id: "uber-status",
        title: "Does Uber work in Israel in 2026?",
        paragraphs: [
          "No. As of October 2026, Uber does not operate its passenger ride service in Israel. Uber's own Israel-facing website states that Uber is currently unavailable in this location. An Uber app installed for trips in other countries does not give you a usable Uber ride service in Tel Aviv, Jerusalem, Haifa or Ben Gurion Airport.",
          "You may still encounter an Israeli Uber webpage, an app download link or old articles about services that previously operated. None of those means that a driver can be booked through Uber in Israel today. Plan your transportation with a currently available local provider instead.",
          "The practical question is which app or booking method suits your route. Gett and Yango are local taxi-booking alternatives, while a licensed taxi or a confirmed private transfer may be simpler for some journeys. This guide explains those options rather than speculating about any future Uber launch.",
        ],
        sourceIds: ["guide-uber-availability"],
      },
      {
        id: "gett",
        title: "How do I use Gett instead of Uber?",
        photo: airportTransferPhotos["tel-aviv"]!,
        paragraphs: [
          "Gett is an established way to request a licensed taxi in Israel through a smartphone app. Enter the pickup location and exact destination, review the available booking details and make sure the driver has accepted before you leave your accommodation. The booking screen is the place to confirm fare information, payment methods and any additions.",
          "Download the app and complete account setup while you still have a reliable internet connection. Keep access to the phone number used for registration, check whether your card is accepted, and verify your pickup pin rather than assuming GPS has selected the correct side of the street.",
          "Gett is also the official operator of authorized taxis from Ben Gurion Airport, but the airport has its own taxi-ordering and queue process. The full airport pickup procedure is in my Ben Gurion Airport taxis guide; it is not identical to ordering a city taxi by a normal app pin.",
        ],
        inlineLinks: [{ text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis }],
        sourceIds: ["guide-gett-app", "guide-gett"],
      },
      {
        id: "yango",
        title: "Can tourists use Yango to book a taxi in Israel?",
        paragraphs: [
          "Yango is another taxi-booking app available in Israel, operated locally through Appli Taxi. Its Israeli rider information describes requesting a taxi through the app and lists payment by card or cash. Whether it can find a driver depends on the address, city, time and current supply.",
          "The Tel Aviv visitor guide also lists Yango alongside Gett and Raxi as taxi apps. That does not mean every app serves every location or offers the same fare and payment conditions. Install a usable option before the trip and check the service for the specific city and pickup address.",
          "For a first ride, enter the destination, review the pickup and fare information provided, then verify the car and driver details when a taxi has been allocated. If an important pickup is not accepted, use a second taxi app, ask your hotel to call a taxi, or arrange a confirmed transfer.",
        ],
        sourceIds: ["guide-yango-israel", "guide-telaviv-apps"],
      },
      {
        id: "booking-without-app",
        title: "How can I get a taxi without Gett or Yango?",
        paragraphs: [
          "You can still use a regular licensed taxi without a ride-booking app. Depending on the area, hail one on the street, go to a taxi stand, call a local taxi dispatcher or ask your hotel or accommodation to arrange a pickup. For a city ride, state the exact destination and confirm the regulated meter and available payment methods before starting.",
          "App ordering and street taxis are different ways of arranging a local taxi, not different guarantees of vehicle size, child seats or availability. In a smaller town, a remote attraction or late at night, local dispatch or a booking made ahead may be more dependable than simply opening an app.",
          "My complete guide to taxis in Israel explains licensing, meters, booking, safety, receipts and passenger rights. This Uber alternatives page stays focused on choosing and using booking services.",
        ],
        inlineLinks: [{ text: "complete guide to taxis in Israel", to: travelGuidePaths.taxis }],
        sourceIds: ["guide-telaviv-apps", "taxi-passenger-rights"],
      },
      {
        id: "prices-payments",
        title: "Do Gett and Yango rides have Uber-style prices and payment?",
        paragraphs: [
          "Do not assume the price model used by Uber abroad applies to a taxi ordered in Israel. Licensed Israeli taxis are subject to regulated fares; the actual amount can depend on the distance, travel time, tariff period and permitted additions. An app may present a quote, estimate or other booking information, so read the details for that exact ride rather than assuming the screen shows an all-inclusive fixed price.",
          "For payments, check the app's current options for your account and route. Gett's airport instructions permit cash or credit card payment to the driver or payment through its app. Yango's Israeli rider page lists cash and card. A particular foreign-issued card or app configuration should not be assumed to work without testing it.",
          "If you want to understand the 2026 A, B and C tariff periods, weekend fares, supplements and worked examples, see the Israeli taxi fares guide. It contains the figures and sources; this app comparison deliberately does not duplicate the complete tariff tables.",
        ],
        inlineLinks: [{ text: "Israeli taxi fares guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026", "guide-gett", "guide-yango-israel"],
      },
      {
        id: "airport",
        title: "Can I use Uber, Gett or Yango at Ben Gurion Airport?",
        photo: hallPhoto,
        paragraphs: [
          "Uber cannot be used to book a ride from Ben Gurion Airport in 2026. For an authorized taxi on arrival, Gett operates the official ordering system. Use the Gett app or one of the self-service kiosks to obtain a ride code and then join the authorized taxi queue. At Terminal 3, the immediate taxi queue is on the ground floor at Exit 03; at Terminal 1, follow the main arrivals exit.",
          "Gett's future-dated airport taxi booking has a different pickup location at Terminal 3, Level 2, Exit 23. Do not treat a Yango city pickup pin as a substitute for the airport's official taxi procedure. Follow the instructions for the service you actually booked.",
          "If you prefer a dedicated pickup, reserve a private airport transfer directly with its operator and confirm the meeting point, passengers, luggage, vehicle and full price. My official airport taxi guide explains the authorized queue and scheduled Gett pickup in detail. The airport arrival guide covers passports, baggage and leaving the terminal.",
        ],
        inlineLinks: [
          { text: "private airport transfer", to: "/transfers/" },
          { text: "official airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "airport arrival guide", to: travelGuidePaths.arrival },
        ],
        sourceIds: ["guide-uber-availability", "guide-gett", "guide-iaa"],
      },
      {
        id: "locations",
        title: "Which taxi app should I use in Tel Aviv, Jerusalem or Haifa?",
        paragraphs: [
          "In Tel Aviv, Gett and Yango are practical apps to check; the city's visitor information names both. The right choice is whichever service can actually accept your pickup at the requested time. For journeys near the beach, Old Jaffa or pedestrian streets, check whether the driver can reach your precise entrance.",
          "In Jerusalem, enter your hotel's actual street address and check the permitted vehicle approach if you are visiting the Old City. In Haifa, coastal and hilltop addresses can make a difference to the drive. App coverage, wait times and availability should be verified for each address rather than inferred from the city name.",
          "For longer intercity trips or destinations away from large urban centers, compare taxi availability against other practical transport modes. My getting around Israel guide explains when trains, buses, a rental car or a private driver may fit better.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        sourceIds: ["guide-telaviv-apps", "guide-gett-app", "guide-yango-israel"],
      },
      {
        id: "setup-backups",
        title: "What should visitors check before booking their first ride?",
        paragraphs: [
          "Before arrival, download a local taxi app, make sure you can complete phone-number verification, and check whether mobile data and payment work with your account. Save the address of your accommodation in English and, if possible, Hebrew. A screenshot or offline note is useful when mobile reception is poor.",
          "After ordering, check that a driver has really accepted, verify the license plate and booking details, and confirm the intended destination. If you have a child, wheelchair, bulky luggage or a larger group, request the required vehicle or equipment in advance; a standard taxi request does not guarantee a special vehicle.",
          "You can arrange a local SIM or eSIM for reliable mapping and messaging; the Israel eSIM guide explains options. Keep a backup such as a hotel-arranged taxi or a pre-confirmed private driver for a time-critical appointment, flight or long-distance pickup.",
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
          "Licensed taxis may operate on Shabbat and Jewish holidays, including when much scheduled public transport is paused. Gett or Yango may still be worth checking, but an app does not guarantee that a driver will accept the ride at your location. Demand, the holiday and the time of day affect availability.",
          "For a flight or another important transfer, book and confirm a suitable vehicle in advance where possible. Metered taxis are subject to designated nighttime, weekend and holiday tariff periods, so do not use a weekday estimate as an assured Saturday fare.",
          "If your journey begins at Ben Gurion Airport on Shabbat, the dedicated airport Shabbat travel guide compares official taxis, advance transfers, limited free weekend Line 711 and the restart of scheduled trains and buses.",
        ],
        inlineLinks: [{ text: "airport Shabbat travel guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-iaa", "taxi-fares-2026", "guide-weekend-711"],
      },
    ],
    checklist: [
      "Do not plan to use Uber for an Israeli passenger ride in 2026",
      "Install and test a local taxi-booking app such as Gett or Yango",
      "Confirm phone verification, mobile data and payment for your account",
      "Save the full pickup and destination addresses",
      "Read the fare basis, tariff period and any booking additions",
      "Verify the driver and vehicle before boarding",
      "For Ben Gurion Airport, use the authorized Gett or kiosk queue process",
      "Arrange a confirmed vehicle for a large group or time-sensitive pickup",
    ],
    faqs: [
      { q: "Is Uber available in Israel in 2026?", a: "No. Uber does not operate its passenger ride service in Israel in 2026. Uber's official Israel webpage says the service is currently unavailable." },
      { q: "Does Uber work in Tel Aviv?", a: "No. You cannot book an Uber passenger ride in Tel Aviv in 2026. Check Gett, Yango or a licensed taxi instead." },
      { q: "Does Uber work in Jerusalem or Haifa?", a: "No. Uber is not available for passenger rides in Jerusalem, Haifa or elsewhere in Israel in 2026." },
      { q: "Can I get an Uber from Ben Gurion Airport?", a: "No. Gett operates the official authorized airport taxi-ordering system, with app or kiosk orders and a physical taxi queue. Dedicated private transfers are a separate option." },
      { q: "What is the best alternative to Uber in Israel?", a: "Gett and Yango are local taxi-booking apps worth checking. The best fit depends on current vehicle availability, location and booking terms. A regular licensed taxi or confirmed transfer may suit some journeys better." },
      { q: "Is Gett the same company as Uber?", a: "No. Gett is a separate taxi-booking service. It arranges licensed taxi rides in Israel and is the official operator of the authorized Ben Gurion Airport taxi-ordering system." },
      { q: "Is Yango available in Israel?", a: "Yes. Yango operates locally through Appli Taxi, but verify app service, booking features and driver availability at your actual address." },
      { q: "Can I pay cash or use a credit card for a taxi app ride?", a: "Gett's airport taxi instructions allow cash, credit card or app payment. Yango's Israeli rider information lists cash and card. Check the accepted methods for the booking and any foreign-issued card." },
      { q: "Do I have to download Gett to order a taxi at Ben Gurion Airport?", a: "No. Official airport self-service kiosks can issue the ride code used to join the physical taxi queue." },
      { q: "Are taxi apps available on Shabbat?", a: "Taxi services may operate during Shabbat, but app supply and driver acceptance vary. Check your exact location and date, and confirm important pickups in advance." },
      { q: "Is an app taxi always cheaper than a street taxi?", a: "No general cheaper-price rule applies. Read the exact app offer and the regulated meter and permitted extra-charge rules before making a price comparison." },
      { q: "Can I book a van or child seat through a regular taxi app?", a: "Do not assume a standard booking includes a large vehicle or child seat. Request the requirement explicitly and obtain confirmation of vehicle capacity and equipment." },
    ],
    sourceIds: ["guide-uber-availability", "guide-gett-app", "guide-yango-israel", "guide-telaviv-apps", "guide-gett", "guide-iaa", "taxi-fares-2026"],
    related: ["taxis", "taxiFares", "airportTaxis", "shabbat", "sherut", "israel"],
    services: [
      { label: "Pre-booked airport transfers", to: "/transfers/" },
      { label: "Private driver for intercity travel", to: "/private-driver/" },
    ],
  },
  sherut: {
    id: "sherut",
    title: "Ben Gurion Airport Sherut (2026): Nesher & Amal No Longer Operate",
    description: "Nesher and Amal airport sheruts have stopped operating. Learn what sherut means in Israel, which shared taxis still exist, and how to travel from Ben Gurion Airport instead.",
    intro: "Old websites still describe shared airport taxis to Jerusalem and Haifa. Here is the current situation in 2026, the difference between a sherut and a shuttle, and the alternatives you can actually plan.",
    answer: "No. As of 2026, the former Nesher shared-taxi service between Ben Gurion Airport and Jerusalem and the Amal airport service to Haifa and the north are no longer operating. Do not rely on their old fares, phone numbers or pickup instructions. Local route-based shared taxis (monit sherut) can still exist elsewhere in Israel, but they are not replacements for these airport services. For an airport journey, check a current train or bus, the authorized taxi service or a private transfer confirmed in advance.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-10-22",
    photo: airportTransferPhotos["other"]!,
    facts: [
      { label: "Nesher to Jerusalem", text: "Former airport sherut service: discontinued" },
      { label: "Amal to Haifa", text: "Former airport sherut service: discontinued" },
      { label: "Still available", text: "Trains and buses on operating days, authorized taxis and confirmed transfers" },
    ],
    nextSteps: [
      { label: "Official Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
      { label: "Airport transport during Shabbat", to: travelGuidePaths.shabbat },
      { label: "Ben Gurion Airport arrival information", to: travelGuidePaths.arrival },
      { label: "How licensed taxis work in Israel", to: travelGuidePaths.taxis },
    ],
    comparison: {
      caption: "Sherut, shuttle or taxi: what is the difference?",
      headers: ["Transport type", "How it works", "Status for Ben Gurion Airport"],
      rows: [
        ["Former Nesher / Amal airport sherut", "Shared ride with multiple passengers and destinations", "Discontinued; do not plan on a walk-up service"],
        ["Local monit sherut", "Shared taxi on a specific urban or intercity route", "Separate local routes; not a replacement for Nesher or Amal"],
        ["Free airport shuttle", "Bus connecting terminals and airport facilities", "Internal transport only, not a ride to a city"],
        ["Pre-booked shared transfer", "Seats sold by a particular commercial operator", "Only if a provider confirms a specific bookable service"],
        ["Official airport taxi", "Licensed taxi for your own journey, ordered through the airport system", "Current 24-hour metered service"],
        ["Private transfer", "A dedicated vehicle and pickup agreed with an operator", "Available by advance arrangement and confirmation"],
      ],
    },
    sections: [
      {
        id: "nesher-amal",
        title: "Are Nesher and Amal shared taxis still running from Ben Gurion Airport?",
        paragraphs: [
          "No. The former Nesher airport sherut between Ben Gurion Airport and Jerusalem has stopped operating. The former Amal airport sherut serving Haifa and northern destinations has also stopped operating. Both are discontinued as of 2026; neither should be treated as an airport transport option.",
          "You may still find old hotel instructions, university arrival guides, directory entries, forum posts and historical price tables naming Nesher or Amal. Those pages describe earlier operations. An old telephone number, listed fare or airport stop is not evidence that you can catch either service today.",
          "This does not mean that every shared-taxi route across Israel has disappeared. The discontinued Nesher and Amal airport services are a specific case; local monit sherut routes and independently booked shuttle products must be evaluated separately.",
        ],
        sourceIds: [],
      },
      {
        id: "what-is-sherut",
        title: "What is a sherut taxi in Israel?",
        paragraphs: [
          "A sherut (Hebrew: שירות, meaning service) is a shared-taxi arrangement in which several unrelated passengers use the same vehicle. Traditional monit sherut services often follow a particular corridor and may stop for passengers along an established route. They differ from an ordinary licensed taxi hired for your own trip.",
          "Airport shared taxis historically offered a seat rather than a private car, sometimes dropping passengers at multiple addresses. That is why older visitor guides associate the word sherut with arriving at Ben Gurion Airport. Those descriptions should not be applied to today's airport arrangements.",
          "The English word shuttle is also used for completely different services: a free shuttle within an airport, a scheduled coach, or a commercial shared transfer sold per seat. A vehicle advertised as a shuttle is not automatically a licensed monit sherut or a working successor to Nesher or Amal.",
        ],
        sourceIds: [],
      },
      {
        id: "airport-alternatives",
        title: "What should I use instead of an airport sherut?",
        photo: hallPhoto,
        paragraphs: [
          "For a rail-connected destination, start by checking Israel Railways for your actual travel date. The airport train station serves Terminal 3, and a train may be practical for Tel Aviv or for a journey involving onward connections. Add the final distance from the arrival station to your hotel, particularly with luggage.",
          "Buses may also work for some journeys, but do not assume a direct airport bus exists to your exact neighborhood or resort. Check both the timetable and the final connection. Train and regular bus operations change on Fridays, Saturdays and holidays. The dedicated guide to airport travel on Shabbat covers those exceptions.",
          "For a direct on-arrival ride, the airport operates an authorized taxi system. You can also arrange a dedicated vehicle through a confirmed private airport transfer. Compare the whole door-to-door journey, including luggage, child seats, pickup location, waiting time and any late-night arrival.",
        ],
        inlineLinks: [
          { text: "guide to airport travel on Shabbat", to: travelGuidePaths.shabbat },
          { text: "private airport transfer", to: "/transfers/" },
        ],
        sourceIds: ["guide-iaa", "israel-rail", "guide-gett"],
      },
      {
        id: "where-to-go",
        title: "How can I get from Ben Gurion Airport to Jerusalem, Haifa or Tel Aviv?",
        paragraphs: [
          "For Jerusalem, compare the current rail-and-connection itinerary with a licensed taxi or a pre-arranged direct ride. Do not plan around the discontinued Nesher service. If you want your own driver, the private transfer to Jerusalem page explains that booking option; the rail itinerary needs a separate timetable check.",
          "For Haifa and the north, check the airport train route and your onward station or destination. The former Amal shared-taxi service is no longer available. A private transfer to Haifa may be more convenient with several passengers, large bags or an address far from the railway.",
          "For Tel Aviv, a train may be convenient when it is operating, but its station is not necessarily beside your accommodation. Compare the remaining connection with an authorized taxi. On limited weekend dates, bus 711 is a separate municipal option via Terminal 1; check the Shabbat guide rather than mistaking it for the former airport sheruts.",
        ],
        inlineLinks: [
          { text: "private transfer to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "private transfer to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        tables: [{
          caption: "Airport transport options by destination",
          headers: ["Destination", "Useful starting options", "Key planning point"],
          rows: [
            ["Jerusalem", "Rail with onward connection; authorized taxi; private transfer", "Nesher is discontinued; compare the complete route to your hotel"],
            ["Haifa and the north", "Rail where practical; authorized taxi; private transfer", "Amal is discontinued; confirm onward travel from the station"],
            ["Tel Aviv", "Train when running; authorized taxi; private transfer", "Check the exact hotel address, final connection and weekend service"],
            ["Dead Sea / Ein Bokek", "Pre-arranged direct transfer or suitable taxi; rental car", "Check the resort address and the full journey rather than assuming a sherut"],
          ],
          note: "These are transport categories, not live seat availability, departures or price quotations.",
        }],
        sourceIds: ["guide-iaa", "israel-rail", ],
      },
      {
        id: "official-taxi",
        title: "Where do I get an official taxi at Ben Gurion Airport?",
        photo: pickupPhoto,
        paragraphs: [
          "An official airport taxi is not a sherut: the vehicle serves your booking rather than selling separate seats to unrelated travelers. The Israel Airports Authority describes the on-demand taxi process through Gett or a self-service kiosk. Receive a ride code and proceed to the authorized queue. At Terminal 3 the immediate taxi queue is on Level G at Exit 03; Terminal 1 has its own authorized pickup point outside arrivals.",
          "Official airport taxis operate around the clock and use a regulated meter. A Gett ride arranged in advance can have different pickup instructions from an on-demand ride. For the complete process and terminal-specific directions, use my Ben Gurion Airport taxis guide.",
          "For fare rules, additional charges and the applicable tariff hours, consult the taxi fares in Israel guide. This sherut article deliberately does not reproduce regulated taxi pricing tables.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "airport-shuttle",
        title: "Is the free airport shuttle the same as a sherut?",
        paragraphs: [
          "No. Ben Gurion Airport's free internal shuttle is for movements within the airport complex, including the connection between Terminal 3 and Terminal 1. It is not a ride to Jerusalem, Haifa or a Tel Aviv hotel, and it should not be confused with a shared airport taxi.",
          "The airport publishes a terminal-to-terminal shuttle about every 15 minutes around the clock. Terminal 3 passengers find the Terminal 1 shuttle stop on Level G near Gate 01; the Terminal 1 return stop is opposite Gate 4. Follow airport signage because individual operating arrangements can change.",
          "If you are arriving in Israel for the first time, my Ben Gurion Airport arrival guide covers passport control, baggage claim, terminals and the onward journey without duplicating them here.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival },
        ],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "local-sherut",
        title: "Are there still local monit sherut routes elsewhere in Israel?",
        paragraphs: [
          "Some shared-taxi services can operate on specific routes outside the former airport sherut network. Their availability depends on the operator, corridor, direction, day and time; do not assume a historical line still runs just because a route number appears on a website.",
          "If you intend to use a local monit sherut, verify the current boarding location, destination, payment method, fare and last departure with the operator or a reliable local transport source. Luggage capacity and exact stops can differ from a normal taxi.",
          "For most visitors, local shared taxis are one small part of a wider travel plan. The getting around Israel guide compares regular trains, buses, light rail, taxis and self-drive options. The getting around Tel Aviv guide concentrates on transport within the city.",
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv },
        ],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "booked-shared",
        title: "What if a company advertises a shared shuttle from the airport?",
        paragraphs: [
          "A company may advertise a pre-booked shared airport transfer under the words shuttle, shared ride or seat transfer. That is a separate commercial booking product, not proof that the old Nesher or Amal airport sheruts have returned. A listing is also not evidence of a confirmed departure on your date.",
          "Before paying, ask who operates the vehicle, whether the fare is per seat or per vehicle, the exact meeting point, the scheduled departure, waiting rules for delayed flights, the maximum luggage allowance, the final drop-off address and the cancellation policy.",
          "If there is no verifiable operator, specific date, published booking conditions and written confirmation, do not rely on that service for a flight connection. A dedicated airport transfer can be easier to verify when you need a specific car or direct hotel drop-off.",
        ],
        inlineLinks: [
          { text: "dedicated airport transfer", to: "/transfers/" },
        ],
        sourceIds: [],
      },
      {
        id: "weekend",
        title: "What should I do if I land during Shabbat or a holiday?",
        paragraphs: [
          "Do not treat the former shared airport taxi services as a weekend fallback; Nesher and Amal no longer run. On Shabbat, regular rail and bus services are restricted, so check your actual arrival date before choosing public transport.",
          "The limited free weekend bus 711 runs via Terminal 1 toward central Tel Aviv, subject to its operating timetable. An authorized airport taxi or a pre-confirmed transfer may work when the bus route or timing does not. For terminal changes, Line 711 instructions and Saturday-night train restart planning, consult the full airport Shabbat transport guide.",
        ],
        inlineLinks: [
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
        ],
        sourceIds: ["guide-weekend-711", "guide-iaa", "israel-rail"],
      },
    ],
    checklist: [
      "Do not rely on old Nesher or Amal airport sherut timetables, fares or phone numbers",
      "Check the arrival date, terminal and exact hotel or destination address",
      "Compare a complete train or bus journey with a licensed taxi or confirmed transfer",
      "For an airport taxi, use the authorized order and queue rather than an unsolicited offer",
      "If a shared transfer is advertised, verify the operator, schedule, luggage and drop-off",
      "Check weekend or holiday transport separately before booking the rest of your trip",
      "Keep the first accommodation address and confirmed pickup details available offline",
    ],
    faqs: [
      { q: "Is Nesher sherut still operating from Ben Gurion Airport in 2026?", a: "No. The former Nesher airport shared-taxi service to Jerusalem has been discontinued. Do not use old pickup instructions, phone numbers or prices as if the service still existed." },
      { q: "Is Amal sherut still operating between Ben Gurion Airport and Haifa?", a: "No. The former Amal airport shared-taxi service to Haifa and northern destinations is no longer operating." },
      { q: "Is there a shared taxi from Ben Gurion Airport to Jerusalem?", a: "The former regular Nesher airport sherut is no longer operating. Check a current rail connection, an authorized taxi or an advance-confirmed transfer instead. Any separately advertised shared ride must be verified with its actual operator." },
      { q: "Is there a sherut from Ben Gurion Airport to Tel Aviv?", a: "Do not expect a regular walk-up airport-to-Tel-Aviv sherut. Trains, licensed airport taxis and confirmed transfers are the main options to check. Limited weekend Line 711 is a municipal bus via Terminal 1, not a sherut." },
      { q: "Are all sherut taxis in Israel discontinued?", a: "No. The closure of the former Nesher and Amal airport services does not mean that every local shared-taxi route in Israel has closed. Check each local route and operator individually." },
      { q: "Is the Ben Gurion Airport shuttle bus free?", a: "Yes, the airport's internal terminal shuttle is free, but it operates inside the airport complex. It is not transportation to Tel Aviv, Haifa or Jerusalem." },
      { q: "Where do official taxis depart from Terminal 3?", a: "For on-demand authorized taxis, the airport lists ground-floor Exit 03 at Terminal 3. Use Gett or an airport kiosk for a ride code and follow the official taxi queue instructions." },
      { q: "Can I pay per seat for a shared airport transfer?", a: "Only if a current provider specifically sells a per-seat product and confirms availability. Verify who operates it, the meeting point, schedule, luggage limit, total price and cancellation rules." },
      { q: "What is the difference between a sherut and a private transfer?", a: "A sherut traditionally shares a route or vehicle with unrelated passengers. A private transfer is booked for your own party under the agreed vehicle, pickup and payment terms." },
      { q: "Do airport sheruts run on Shabbat?", a: "Nesher and Amal airport sheruts no longer run on any day. For current Shabbat airport options, check limited Line 711, the authorized taxi service and confirmed private transfers." },
      { q: "How can I travel from Ben Gurion Airport to Haifa now?", a: "Check the current train route, a licensed airport taxi or an advance-confirmed private transfer. The former Amal airport sherut is not available." },
    ],
    sourceIds: ["guide-iaa", "guide-gett", "israel-rail", "guide-weekend-711"],
    related: ["shabbat", "airportTaxis", "taxis", "arrival", "israel", "taxiFares"],
    services: [
      { label: "Private airport transfer to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Private airport transfer to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
      { label: "Private airport transfer to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Airport transfer destinations and quote request", to: "/transfers/" },
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
    sourceIds: ["guide-esim-airalo", "guide-esim-saily", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"], related: ["arrival", "uber", "israel"], services: [{ label: "Arrange your airport pickup", to: "/transfers/" }], providerPageId: "guide-esim",
  },
  arrival: {
    id: "arrival",
    title: "Ben Gurion Airport Arrivals Guide (2026): Passport Control, Bags & Transport",
    description: "Arriving at Ben Gurion Airport in 2026? Follow Terminal 3 arrivals, passport control, baggage claim, customs and the best way to reach your hotel.",
    intro: "From landing at Tel Aviv's Ben Gurion Airport (TLV) to meeting your ride, here is the practical arrival sequence, what to prepare and where to find the right onward transport.",
    answer: "For an international arrival at Ben Gurion Airport in 2026, follow the signs in Terminal 3 to passport control, collect your checked baggage, use the appropriate customs channel and enter the public arrivals hall. Before flying, check whether your passport requires an ETA-IL or a visa. Once outside, choose a train, bus, authorized airport taxi or confirmed private pickup for your actual arrival date. Allow for variable immigration and baggage delays instead of treating landing time as your pickup time.",
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
        photo: pickupPhoto,
        paragraphs: [
          "Choose your route based on the complete journey to the hotel, not just the first train or bus. Israel Railways serves the airport at Terminal 3 and can be useful for destinations connected to the railway, while buses may fit other journeys when they are operating. Check the actual date, station and final connection with bags.",
          "For an on-demand authorized airport taxi, Gett operates the official order and queue process: request a ride using its app or an airport self-service kiosk, obtain a ride code and join the physical taxi queue. Terminal 3 immediate taxis depart at ground-floor Exit 03; a scheduled Gett pickup is different and is listed at Level 2, Exit 23. The official Ben Gurion Airport taxi guide provides the complete pickup procedure.",
          "You can instead request a private airport transfer for your party, with a meeting point, suitable vehicle and total price agreed in advance. The former Nesher and Amal airport shared-taxi services have been discontinued; the sherut guide explains the old services and today's alternatives. If you want to compare the national taxi fare rules, use the 2026 taxi fares guide rather than assuming every airport ride has a fixed price.",
        ],
        inlineLinks: [
          { text: "official Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport transfer", to: "/transfers/" },
          { text: "sherut guide", to: travelGuidePaths.sherut },
          { text: "2026 taxi fares guide", to: travelGuidePaths.taxiFares },
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
          note: "This comparison is general guidance, not live departures or confirmed ride availability.",
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
      { q: "Which terminal do international flights arrive at Ben Gurion Airport in 2026?", a: "The airport authority's June 2026 announcement says international arriving flights use Terminal 3. Some international departures use Terminal 1, so always check the latest flight and airport notices." },
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
      { label: "Airport transfer destinations and personal quote", to: "/transfers/" },
      { label: "Private airport transfer to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Private airport transfer to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Private airport transfer to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
    ],
  },
  israel: {
    id: "israel",
    title: "Getting Around Israel in 2026: Trains, Buses, Taxis & Car Rental",
    description: "How to get around Israel without a car: compare trains, buses, light rail, taxis, Rav-Kav and payment apps, Shabbat transport, car rental and private drivers.",
    intro: "You do not need one transport method for your entire Israel trip. Choose what works for each city, intercity connection and rural day, taking account of schedules, luggage, payment and Shabbat.",
    answer: "For many trips in Israel, combine trains between well-connected cities, buses and light rail for local travel, and walking for nearby sights. Licensed taxis, Gett or Yango, and confirmed private transfers can help with luggage, late arrivals or awkward last-mile connections. A rental car is useful for some rural or multi-stop itineraries, but often unnecessary in major city centers. Check your exact route, travel date and payment method; most regular public transport is reduced or suspended during Shabbat.",
    topics: ["transportation", "destinations", "itineraries", "tips"],
    updatedAt: "2026-10-22",
    photo: { src: roadTrip, alt: "Illustration of a road trip across the Israeli landscape" },
    facts: [
      { label: "For intercity travel", text: "Check trains first where both destinations are rail-connected" },
      { label: "Public transport payment", text: "Rav-Kav or an approved app; credit-card tap only on selected lines" },
      { label: "Shabbat and holidays", text: "Check route-specific breaks, weekend exceptions and return plans" },
    ],
    nextSteps: [
      { label: "Israel taxi booking, safety and payment", to: travelGuidePaths.taxis },
      { label: "2026 taxi fares and tariffs", to: travelGuidePaths.taxiFares },
      { label: "Airport arrival and ground transport", to: travelGuidePaths.arrival },
      { label: "Travel from Ben Gurion Airport on Shabbat", to: travelGuidePaths.shabbat },
    ],
    comparison: {
      caption: "Which way of getting around Israel suits your journey?",
      headers: ["Transport choice", "Best starting use", "Check before committing"],
      rows: [
        ["Israel Railways", "Journeys between rail-connected cities and the airport", "Station location, last train, onward trip and Shabbat timetable"],
        ["City and intercity buses", "City travel or destinations without convenient rail", "Route, stop, transfers, payment and service date"],
        ["Light rail", "Travel along an operating urban line", "Actual line coverage, station location and validation"],
        ["Licensed taxi / taxi app", "Direct address-to-address trips and luggage", "Licensed car, fare basis, payment and availability"],
        ["Local sherut", "A particular shared-taxi corridor when the route runs", "Actual route and operating hours; not an airport Nesher/Amal service"],
        ["Rental car", "A multi-stop regional itinerary or dispersed rural attractions", "Parking, permitted roads, insurance and total cost"],
        ["Private driver or organized tour", "A planned trip without self-driving", "Driver versus licensed guide, inclusions, pickup and return"],
      ],
    },
    sections: [
      {
        id: "choose-transport",
        title: "What is the best way to get around Israel without a car?",
        paragraphs: [
          "Start with your actual journey rather than choosing one type of transport for an entire holiday. Between city centers, a train or bus may be convenient; for short city journeys, walking and local transit may work better. Compare door-to-door time, which includes getting to the station, waiting, walking and the final connection to your hotel.",
          "If you have several suitcases, a stroller, mobility needs or a late-night arrival, a direct licensed taxi or a confirmed transfer may be worth comparing with several public transport changes. For remote nature sites or multiple stops in one day, a rental car, private driver or organized tour may be more practical.",
          "You can travel in Tel Aviv, Jerusalem and other cities without keeping a rental car all week. Pick your accommodation with the places you will actually visit in mind, and check the return journey before settling on a route.",
        ],
        sourceIds: ["guide-bus-planner"],
      },
      {
        id: "intercity-trains",
        title: "How can tourists use Israel Railways between cities?",
        photo: airportTransferPhotos["haifa"]!,
        paragraphs: [
          "Israel Railways can be a useful first choice between rail-connected destinations, including journeys involving Tel Aviv, Haifa, Jerusalem and Ben Gurion Airport. Look up the exact departure and destination stations, changeovers and the day-specific timetable; not every city, beach district or attraction has a nearby railway station.",
          "In Tel Aviv, the mainline stations sit along the inland rail corridor, not directly on the beachfront. Jerusalem's main intercity train station does not put you inside the Old City, while Haifa's topography can make a hilltop hotel a separate journey from the rail stop. Include the final walk, bus or taxi when comparing travel times.",
          "Check the latest Israel Railways timetable for planned engineering work, holiday restrictions and the final departure. For airport-specific baggage, terminal and pickup details, see the Ben Gurion Airport arrival guide; this national guide focuses on choosing the right transport mode.",
        ],
        inlineLinks: [{ text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival }],
        sourceIds: ["israel-rail", "guide-iaa", ],
      },
      {
        id: "buses",
        title: "When are buses better than trains in Israel?",
        paragraphs: [
          "City buses serve many neighborhoods beyond railway or light-rail corridors. Intercity buses can connect areas where the rail route is indirect or unavailable. Use an up-to-date journey planner with the real start and end addresses, not just the names of two cities, and check the operator's actual stops and direction.",
          "For a long-distance journey, compare a direct bus against a train plus a local connection. A bus can be convenient when it gets you close to your accommodation, while a train may reduce traffic delays on another route. Bus and rail timetables can change during holidays, disruptions and roadworks.",
          "For an important connection, save the bus stop location, direction and last departure offline. The official national public transport planner provides route information; verify the actual service date, especially on Friday, Saturday and Jewish holidays.",
        ],
        sourceIds: ["guide-bus-planner", "guide-public-transport-payments"],
      },
      {
        id: "paying",
        title: "How do tourists pay for buses, trains and light rail?",
        paragraphs: [
          "A Rav-Kav public transport card and approved mobile ticketing apps are the main options for many Israeli public transport journeys. Load the correct travel product onto a Rav-Kav or set up an authorized app, then validate the journey as instructed. The fare and eligibility for transfers depend on distance, transport mode and the product purchased.",
          "Do not count on paying cash to a bus driver. The National Public Transportation Authority says ordinary bus travel requires a supported ticket or validation method. Direct contactless credit-card or phone-wallet payment is available on selected bus lines only, not universally. Those selected-line card payments are for single journeys and do not include the normal transfer or light-rail combination benefits.",
          "For urban light rail, validation rules can differ from bus boarding. On Tel Aviv's Red Line, the operator requires travelers to validate before boarding, with station gates or validators depending on the stop and the payment method. For a day with multiple connections, check the appropriate Rav-Kav or app product rather than assuming one bank-card tap will cover everything.",
        ],
        sourceIds: ["guide-public-transport-payments", "guide-select-card-payment", "guide-redline-tickets"],
      },
      {
        id: "city-transport",
        title: "How should I get around Tel Aviv, Jerusalem and Haifa?",
        photo: airportTransferPhotos["tel-aviv"]!,
        paragraphs: [
          "Tel Aviv is often easiest with a combination of walking, buses, the operating Red Line light rail and occasional taxis. The Red Line serves a specific corridor and does not take you to every hotel, beach or attraction. The getting around Tel Aviv guide covers route planning, national railway stations, payment and the local weekend network.",
          "In Jerusalem, combine walking and the available light-rail and bus routes with a taxi when needed. A short map distance can still involve steps, hills, pedestrian-only approaches or security restrictions near the Old City. Plan vehicle drop-off and walking access for your actual address.",
          "In Haifa, distance is only part of the trip: the climb from the coast up Mount Carmel can make a bus or taxi more useful than walking. In all three cities, group nearby attractions by area and keep a realistic return route, especially after dark or with luggage.",
        ],
        inlineLinks: [{ text: "getting around Tel Aviv guide", to: travelGuidePaths.telAviv }],
        sourceIds: ["guide-red-line", "guide-telaviv-transit", ],
      },
      {
        id: "taxis-apps",
        title: "When should I use taxis, Gett or Yango?",
        paragraphs: [
          "Licensed taxis are useful for direct trips, short city rides with luggage, unfamiliar addresses and connections that public transport does not complete conveniently. You can find a taxi at a stand, through a dispatcher or by an available booking app. The taxis in Israel guide explains licensing, ordering, safety and payment in detail.",
          "Gett and Yango are local taxi-booking alternatives. Uber passenger rides are not available in Israel in 2026; the Uber alternatives guide explains what visitors can use instead. A successful app installation is not a confirmed ride, and you should check the actual driver allocation and vehicle.",
          "Ordinary Israeli taxi journeys use regulated fares and lawful additions. Nighttime, Shabbat, distance and travel time can change the final amount. Rather than quoting an approximate national fare here, the 2026 taxi fares guide provides tariff hours, tables and worked examples.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "Uber alternatives guide", to: travelGuidePaths.uber },
          { text: "2026 taxi fares guide", to: travelGuidePaths.taxiFares },
        ],
        sourceIds: ["guide-gett-app", "guide-yango-israel", "guide-uber-availability", "taxi-fares-2026"],
      },
      {
        id: "sherut",
        title: "What are sherut shared taxis, and do they still operate?",
        paragraphs: [
          "A local monit sherut is a shared taxi or minibus that may operate along a particular urban or intercity corridor, rather than taking one private party to any address. Route, boarding rules and working hours depend on the local service. Do not assume a route mentioned in an older visitor guide is still operating.",
          "Importantly, the former Nesher airport sherut to Jerusalem and Amal airport sherut to Haifa and northern destinations have been discontinued. Old airport shared-taxi prices and contact instructions should not be used to plan arrival. My Sherut in Israel guide explains the difference between those former airport services, local route-based sheruts and independently bookable shared shuttles.",
          "If you want a predictable flight connection or travel with several bags, compare the whole journey with a licensed taxi, train or confirmed direct transfer rather than relying on an unverified shared-vehicle route.",
        ],
        inlineLinks: [{ text: "Sherut in Israel guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-telaviv-transit"],
      },
      {
        id: "airport",
        title: "What is the easiest way to leave Ben Gurion Airport?",
        paragraphs: [
          "The best airport-to-city option depends on your destination, luggage, arrival time and operating day. Rail may be practical for a rail-connected city when it is running. Official airport taxis provide a direct metered journey, while a privately arranged vehicle can be confirmed ahead of time for a family, group or specific meeting point.",
          "At Ben Gurion Airport, immediate authorized taxis use Gett or a self-service kiosk for a ride code and then the official queue. Terminal 3 on-demand taxis use ground-floor Exit 03; scheduled Gett rides have separate instructions. The official Ben Gurion Airport taxi guide explains the full procedure; this national article does not duplicate the terminal diagrams and ordering steps.",
          "Check your international arrival terminal, passport control and baggage timing before committing to a tight connection. The airport arrivals guide covers the steps between landing and the public arrivals hall, while the airport transfer pages describe separately arranged private pickups.",
        ],
        inlineLinks: [
          { text: "official Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "airport arrivals guide", to: travelGuidePaths.arrival },
          { text: "airport transfer pages", to: "/transfers/" },
        ],
        sourceIds: ["guide-iaa", "guide-gett", "israel-rail"],
      },
      {
        id: "weekends",
        title: "Does public transport run on Shabbat and Jewish holidays?",
        paragraphs: [
          "Much of Israel's regular public transport stops or is reduced during the main Shabbat period from Friday afternoon through Saturday evening, and major Jewish holidays can also change service. The exact last Friday and first Saturday-evening departures vary by mode, route, location and season. Always check the actual date; sunset alone is not a reliable departure timetable.",
          "Some local weekend transport networks are separate exceptions. Tel Aviv's municipal weekend network serves selected routes, but it is not a nationwide replacement for regular buses or trains. Licensed taxis may operate during Shabbat, subject to driver availability and the applicable fare rules.",
          "For a flight arriving or departing during Shabbat, read the dedicated airport Shabbat transport guide. It explains the limited free Line 711 via Terminal 1, internal airport shuttle, authorized taxis and Saturday-night service restarts, without turning this national overview into another airport timetable.",
        ],
        inlineLinks: [{ text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["guide-weekend-711", "guide-telaviv-transit", "israel-rail"],
      },
      {
        id: "rental-car",
        title: "Should I rent a car or use a private driver in Israel?",
        paragraphs: [
          "A rental car may make sense for a multi-stop itinerary across rural sites, especially when the places you want to see are far from scheduled transport. Compare the whole rental cost including insurance, fuel, toll roads, parking, any one-way return charge and the ability to collect or return the car on your exact dates. The car rental page covers available options.",
          "A rental may be less convenient for a stay focused on central Tel Aviv or Jerusalem, where parking and traffic can outweigh its flexibility. If you only want a car for a few countryside days, compare a shorter rental with the cost and convenience of using public transport for the rest of the trip.",
          "A private driver arranges transportation for your own party, but driving does not automatically include a licensed sightseeing guide, attraction entry or a fixed number of hours. Read the service inclusions and final quote. The private driver page explains that arrangement separately from organized tours.",
        ],
        inlineLinks: [
          { text: "car rental page", to: "/car-rental/" },
          { text: "private driver page", to: "/private-driver/" },
        ],
        sourceIds: [],
      },
      {
        id: "day-trips",
        title: "How should I plan the Dead Sea, Galilee and other rural day trips?",
        paragraphs: [
          "For the Dead Sea, Galilee, nature reserves or remote attractions, map every stop including the return journey. A public transport route to the nearest town is not necessarily a practical connection to the particular beach, national park or trailhead. Check walking distances, site hours and how you will get back before choosing an outward bus.",
          "For a one-day itinerary, compare a rental car, an agreed private driver and an organized tour. A tour may package transportation, a schedule and guiding, while a private driver may offer more flexibility for your own stops. Confirm the language of any guide, admissions, pickup, time limits and what happens if you finish early or late. See the tours and day trips directory for the types of excursions offered.",
          "Save the destination and return pickup point offline. For travelers with mobility limitations or substantial baggage, stairs, hills, uneven surfaces and vehicle access may matter as much as the distance shown on the map.",
        ],
        inlineLinks: [{ text: "tours and day trips directory", to: "/tours/" }],
        sourceIds: [],
      },
    ],
    checklist: [
      "Compare door-to-door routes to your real hotel and attraction addresses",
      "Check the rail or bus timetable for your exact travel date and direction",
      "Prepare Rav-Kav or a supported ticketing app and validate every journey",
      "Do not assume bank-card tap-to-pay works on every bus, train or light rail",
      "Include final walking, steps, hills and luggage when comparing stations",
      "Use licensed taxis and confirm payment, fare basis and vehicle capacity",
      "Plan separate Shabbat and holiday journeys and check the final return connection",
      "Confirm driver or rental-car inclusions, pickup and permitted areas",
      "For rural day trips, verify the last departure and how to return",
      "Keep offline addresses, backup transport and an emergency contact",
    ],
    faqs: [
      { q: "Can tourists get around Israel without renting a car?", a: "Yes, many city and intercity trips are possible by train, bus, light rail and walking, supplemented by licensed taxis when needed. A car becomes more useful for a route with several dispersed rural stops." },
      { q: "What is the best way to travel between Tel Aviv and Jerusalem?", a: "Check the current train and bus options for your actual addresses and date. A station-to-station journey is not the entire trip; include the final connection to your accommodation and weekend operations." },
      { q: "Is Israel Railways useful for tourists?", a: "Yes, for many rail-connected city journeys and Ben Gurion Airport, but choose actual stations and verify timetables, transfers and the final hotel leg." },
      { q: "How do you pay for public buses in Israel?", a: "Use a valid Rav-Kav card or a supported payment/validation app. Ordinary on-board cash payment is not available. Contactless credit-card payment exists only on selected lines and does not provide normal transfer benefits." },
      { q: "Can I tap my foreign credit card on every Israeli bus?", a: "No. The National Public Transportation Authority permits direct card payment on selected lines only. Prepare Rav-Kav or an approved app as your main method." },
      { q: "Can Rav-Kav be used on trains and light rail?", a: "Rav-Kav supports a wide range of public transport services, including many train and light-rail journeys, with product-specific loading and validation rules. Confirm the fare and relevant station procedure." },
      { q: "Does Tel Aviv have a metro or light rail?", a: "The Red Line light rail operates on its designated corridor. Do not confuse it with future light-rail lines or a completed metro system; check the current stop map before choosing your route." },
      { q: "What taxi apps work in Israel instead of Uber?", a: "Gett and Yango are local taxi-booking options. Uber passenger rides are not available in Israel in 2026. Check driver availability, exact pickup and payment in the chosen app." },
      { q: "Are sherut shared taxis still available?", a: "Some local shared-taxi routes exist, depending on the corridor and operator. The former Nesher and Amal airport sherut services have stopped operating; do not rely on historical airport directions." },
      { q: "Does public transportation run on Saturday in Israel?", a: "Most regular train and bus services pause or are reduced for Shabbat, with separate municipal weekend exceptions in certain areas. Check the exact route and date rather than assuming a national timetable." },
      { q: "What is the best way to leave Ben Gurion Airport?", a: "Compare a train or bus with the official metered taxi service or a pre-confirmed private transfer based on arrival time, luggage and final address. Taxi ordering has a specific airport queue procedure." },
      { q: "Is a rental car necessary for Jerusalem and Tel Aviv?", a: "Often not for a city-focused trip, but a short rental could be helpful for specific rural outings. Factor in parking, traffic, insurance and your actual itinerary." },
      { q: "How do I reach the Dead Sea without a car?", a: "Compare available buses to your exact resort or area with a licensed taxi, private driver or organized tour. Verify access to the specific beach or attraction and the return journey." },
      { q: "Is a private driver the same as a guided tour?", a: "No. A driver-only service does not automatically include a licensed guide or attraction tickets. Check the quote, route, included hours, passenger and luggage capacity." },
    ],
    sourceIds: [
      "guide-bus-planner", "guide-public-transport-payments",
      "guide-select-card-payment", "guide-redline-tickets", "israel-rail", "guide-telaviv-transit",
      "guide-red-line", "guide-iaa", "guide-gett", "guide-uber-availability", ],
    related: ["telAviv", "taxis", "taxiFares", "uber", "sherut", "airportTaxis", "arrival", "shabbat"],
    services: [
      { label: "Rent a car for a regional itinerary", to: "/car-rental/" },
      { label: "Private driver and intercity journeys", to: "/private-driver/" },
      { label: "Tours & day trips", to: "/tours/" },
      { label: "Travel guides by topic", to: "/guides/" },
    ],
  },
  telAviv: {
    id: "telAviv", title: "Getting Around Tel Aviv (2026): Buses, Light Rail, Trains & Taxis",
    description: "Getting around Tel Aviv in 2026: compare buses, Red Line light rail, trains, taxis and walking, with Rav-Kav, Jaffa, airport and Shabbat tips.",
    intro: "Match the mode to the neighbourhood you want to explore. A short coastal walk and an airport train solve different parts of your trip.",
    answer: "For a central Tel Aviv stay, combine walking with buses, the Red Line where its corridor helps, and occasional taxis. National rail is mainly useful for the airport and journeys beyond the city. Check the municipal weekend network separately for Shabbat; a rental car is often easier to justify for days outside the city.",
    updatedAt: "2026-10-22",
    topics: ["transportation", "destinations", "tips"], photo: airportTransferPhotos["tel-aviv"]!,
    facts: [{ label: "Light rail", text: "Use the operating Red Line map, not future-line plans" }, { label: "National rail", text: "Include the final journey to the beach or hotel" }, { label: "Weekend", text: "Municipal routes have a separate map and schedule" }],
    comparison: { caption: "Choose how to move around Tel Aviv", headers: ["Journey", "Start by considering", "Check"], rows: [["Nearby central sights", "Walking", "Actual distance, heat, steps and street crossings"], ["A longer city trip", "Bus or Red Line", "Route coverage, stop and last departure"], ["Airport or another city", "National rail or an agreed transfer", "Station, date, luggage and last leg"], ["Luggage or awkward connections", "Licensed taxi", "Exact entrance, fare basis and capacity"], ["Shabbat outing", "Municipal weekend route, walking or taxi", "The separate weekend network and return time"]] },
    sections: [
      { id: "walking", title: "Can I walk between the main neighbourhoods?", paragraphs: ["Use walking for genuinely nearby stops and group sights by area. The promenade, central streets, Neve Tzedek and Jaffa can form useful parts of a walking day, but check the whole distance instead of assuming every attraction is close to your hotel.", "Account for heat, shade, crossings and steps. With luggage or limited mobility, check the exact entrance and an alternative vehicle drop-off. A pleasant daytime walk does not automatically suit a late-night arrival with suitcases. Choose a convenient base using my where to stay in Tel Aviv guide."], inlineLinks: [{ text: "where to stay in Tel Aviv guide", to: "/travel-blog/where-to-stay-in-tel-aviv/" }], sourceIds: [] },
      { id: "buses-light-rail", title: "When should I use a bus or the Red Line?", paragraphs: ["Look up the actual destination on the live route map. The Red Line is operating, but it does not serve every beach, hotel or northern tourist area. A bus or another connection may be more direct. Construction or a future-network drawing is not proof that another line is carrying passengers.", "Check the supported Rav-Kav, mobile-payment or other ticket option for your journey. Validate as instructed on boarding or entering the system; a transfer arrangement does not remove the need to follow validation rules. My getting around Israel guide explains Rav-Kav and intercity ticketing in more detail."], inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }], sourceIds: ["guide-red-line", "guide-telaviv-transit"] },
      { id: "rail", title: "Which Tel Aviv train station should I use?", paragraphs: ["National rail stations serve different parts of the Ayalon corridor, rather than lining the beachfront. Choose the station from the full door-to-door route to your hotel, university, business address or onward city. Do not select a station only because it contains the words Tel Aviv.", "For an airport journey, check date-specific service and luggage access. Compare the final walk or taxi with an agreed direct transfer if several connections would be awkward. The Ben Gurion Airport to Tel Aviv journey guide compares the complete airport-to-hotel choices."], inlineLinks: [{ text: "Ben Gurion Airport to Tel Aviv journey guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" }], sourceIds: ["israel-rail", ] },
      { id: "weekend-and-bikes", title: "What changes on Shabbat, and what about bikes?", paragraphs: ["The municipality publishes a separate free weekend network. Check its route, operating window and return direction; it is not a replacement for every normal bus or an assumed airport service. Taxis remain another option subject to actual availability and the fare terms. Read the taxis in Israel guide for authorized taxi use, and the airport Shabbat transport guide if your trip starts at Ben Gurion Airport.", "Shared bikes or scooters may suit a confident rider on an appropriate route. Before renting, check the operator's age and eligibility rules, helmet requirements, permitted riding areas and parking instructions. Do not assume that a short map distance makes a pavement or pedestrian area suitable for riding."], inlineLinks: [{ text: "taxis in Israel guide", to: travelGuidePaths.taxis }, { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }], sourceIds: ["guide-telaviv-transit", ] },
    ],
    nextSteps: [{ label: "Airport to Tel Aviv: train, bus or taxi?", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" }, { label: "Official Ben Gurion Airport taxi pickup", to: travelGuidePaths.airportTaxis }],
    checklist: ["Choose your hotel area around the places you will visit", "Group nearby attractions into a walking route", "Check current Red Line and bus maps", "Include the last leg from national rail", "Check the separate weekend service and return trip", "Read taxi or bike/scooter terms before starting"],
    faqs: [{ q: "Is Tel Aviv easy to visit without a car?", a: "A central stay can work well with walking, buses, the Red Line and occasional taxis. The right hotel location and actual daily routes matter more than having a car for every day." }, { q: "Does the Red Line go to every beach hotel?", a: "No. Check the current route and remaining walk. A bus or taxi may suit a particular hotel better." }, { q: "Are Tel Aviv weekend buses the same as weekday buses?", a: "No. The municipal weekend network has its own map, stops and timetable. Check the return journey and do not assume it provides your airport connection." }, { q: "Which railway station is closest to the Tel Aviv beach?", a: "The mainline stations are inland. Compare the final bus, taxi or walk from HaHagana, HaShalom, Savidor Center or University to your specific hotel rather than treating a station as a beachfront stop." }, { q: "Can I pay cash on Tel Aviv buses?", a: "Ordinary bus services generally require a validated Rav-Kav or supported payment app rather than cash to the driver. Contactless credit card acceptance is limited to selected services; confirm the current route-specific rules." }, { q: "Does the Red Line light rail serve Jaffa?", a: "Yes, its southern corridor reaches Jaffa-area stations, but the stop may still be a walk or onward connection from Old Jaffa or your accommodation. Check the live map before traveling." }, { q: "Is there an Uber car service in Tel Aviv?", a: "Uber passenger rides are not available in Israel in 2026. Use a licensed taxi, an available local app such as Gett, or a separately confirmed private transfer." }],
    sourceIds: ["guide-telaviv-transit", "guide-red-line", "israel-rail"], related: ["israel", "uber", "taxis", "esim", "telAvivDayTrips", "shabbat"], services: [{ label: "Choose your Tel Aviv hotel area", to: "/travel-blog/where-to-stay-in-tel-aviv/" }, { label: "Jaffa hotel guide", to: "/tel-aviv/jaffa-hotels/" }, { label: "Private airport transfer to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }],
  },
  ...taxiGuideCluster,
};

// Enrich the already-migrated Jerusalem pages while retaining their full sections.
applyJerusalemGuideEditorial(travelGuides);

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
  ...Object.values(travelGuides).map((guide) => ({ id: guide.id, title: guide.title, description: guide.description, to: travelGuidePaths[guide.id], topics: guide.topics, photo: guide.photo })),
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
export function filterGuides(query: string, topic?: GuideTopicId) {
  const terms = query.trim().toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  return guideDirectory.filter((guide) => (!topic || guide.topics.includes(topic)) && terms.every((term) => `${guide.title} ${guide.description} ${guide.topics.map((id) => guideTopics.find((item) => item.id === id)!.label).join(" ")}`.toLocaleLowerCase("en").includes(term)));
}
