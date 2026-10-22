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
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import { expandedTravelGuides } from "@/data/travelGuideExpansion";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";

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
          "Gett is also the official operator of authorized taxis from Ben Gurion Airport, but the airport has its own taxi-ordering and queue process. The full airport pickup procedure is in our Ben Gurion Airport taxis guide; it is not identical to ordering a city taxi by a normal app pin.",
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
          "Our complete guide to taxis in Israel explains licensing, meters, booking, safety, receipts and passenger rights. This Uber alternatives page stays focused on choosing and using booking services.",
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
          "If you prefer a dedicated pickup, reserve a private airport transfer directly with its operator and confirm the meeting point, passengers, luggage, vehicle and full price. Our official airport taxi guide explains the authorized queue and scheduled Gett pickup in detail. The airport arrival guide covers passports, baggage and leaving the terminal.",
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
          "For longer intercity trips or destinations away from large urban centers, compare taxi availability against other practical transport modes. Our getting around Israel guide explains when trains, buses, a rental car or a private driver may fit better.",
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
        sourceIds: ["guide-original-sherut"],
      },
      {
        id: "what-is-sherut",
        title: "What is a sherut taxi in Israel?",
        paragraphs: [
          "A sherut (Hebrew: שירות, meaning service) is a shared-taxi arrangement in which several unrelated passengers use the same vehicle. Traditional monit sherut services often follow a particular corridor and may stop for passengers along an established route. They differ from an ordinary licensed taxi hired for your own trip.",
          "Airport shared taxis historically offered a seat rather than a private car, sometimes dropping passengers at multiple addresses. That is why older visitor guides associate the word sherut with arriving at Ben Gurion Airport. Those descriptions should not be applied to today's airport arrangements.",
          "The English word shuttle is also used for completely different services: a free shuttle within an airport, a scheduled coach, or a commercial shared transfer sold per seat. A vehicle advertised as a shuttle is not automatically a licensed monit sherut or a working successor to Nesher or Amal.",
        ],
        sourceIds: ["guide-original-sherut"],
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
        sourceIds: ["guide-iaa", "israel-rail", "guide-original-sherut"],
      },
      {
        id: "official-taxi",
        title: "Where do I get an official taxi at Ben Gurion Airport?",
        photo: pickupPhoto,
        paragraphs: [
          "An official airport taxi is not a sherut: the vehicle serves your booking rather than selling separate seats to unrelated travelers. The Israel Airports Authority describes the on-demand taxi process through Gett or a self-service kiosk. Receive a ride code and proceed to the authorized queue. At Terminal 3 the immediate taxi queue is on Level G at Exit 03; Terminal 1 has its own authorized pickup point outside arrivals.",
          "Official airport taxis operate around the clock and use a regulated meter. A Gett ride arranged in advance can have different pickup instructions from an on-demand ride. For the complete process and terminal-specific directions, use our Ben Gurion Airport taxis guide.",
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
          "If you are arriving in Israel for the first time, our Ben Gurion Airport arrival guide covers passport control, baggage claim, terminals and the onward journey without duplicating them here.",
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
        sourceIds: ["guide-original-sherut", "guide-telaviv-transit"],
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
        sourceIds: ["guide-original-sherut"],
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
    sourceIds: ["guide-original-sherut", "guide-iaa", "guide-gett", "israel-rail", "guide-weekend-711"],
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
    faqs: [{ q: "Which eSIM is cheapest for Israel?", a: "Compare the current total for the same data and travel period, including setup or usage charges. We do not show a live cheapest-price ranking; provider packages, currencies and promotions change." }, { q: "Does unlimited mean maximum speed all day?", a: "No. Read the provider's fair-use and speed policy, plus any hotspot restriction. Yesim's published guidance explicitly describes potential throttling." }, { q: "Can I keep WhatsApp and my home number?", a: "A data connection can support your existing messaging apps. Keeping the home SIM active depends on the device and your carrier; control home-line roaming to avoid unintended charges." }, { q: "Will every eSIM give me an Israeli number?", a: "No. Check whether it is data-only or includes phone services, and which country's number is supplied. An optional US number is not an Israeli number." }],
    sourceIds: ["guide-original-esim", "guide-esim-airalo", "guide-esim-saily", "guide-esim-yesim", "guide-esim-gigsky", "guide-esim-drimsim"], related: ["arrival", "uber", "israel"], services: [{ label: "Arrange your airport pickup", to: "/transfers/" }], providerPageId: "guide-esim",
  },
  arrival: {
    id: "arrival", title: "Ben Gurion Airport arrivals: passport control, bags and taxis",
    description: "Arriving at Ben Gurion Airport? Plan passport control, baggage claim, customs, mobile data and how to get to your hotel after landing.",
    intro: "Keep the essentials ready before your flight, then work through the arrival process without confusing your landing time with your hotel arrival time.",
    answer: "After landing, follow arrivals signs to passport control, collect checked bags, pass through customs and enter the public arrivals area. Keep your passport, entry record and accommodation details accessible. Confirm the actual arrival terminal and onward transport shortly before travel; airport processing time varies.",
    topics: ["tips", "transportation"], photo: hallPhoto,
    facts: [{ label: "Before flying", text: "Check current entry requirements and your actual terminal" }, { label: "Missing bags", text: "Report to the airline/handler before leaving baggage claim" }, { label: "Onward pickup", text: "Use the confirmation's location, not a generic meeting pin" }],
    comparison: { caption: "Your arrival sequence", headers: ["Stage", "What to do", "Keep handy"], rows: [["Passport control", "Follow the line and staff instructions for your passport", "Passport, entry approval if required, first accommodation"], ["Baggage", "Check the carousel and report missing or damaged bags", "Bag tags, airline report and delivery address"], ["Customs", "Follow the applicable declaration instructions", "Any documents for goods requiring declaration"], ["Arrivals hall", "Contact your driver/host and check your onward route", "Pickup confirmation, mobile data and hotel address"]] },
    sections: [
      { id: "before-flight", title: "What should I prepare before flying?", paragraphs: ["Use the official Israel entry portal to check your passport-specific visa or ETA-IL requirements. Complete any required approval before travel and follow the current official instructions; this guide does not determine your admission or reproduce fees and processing periods.", "Save the first accommodation address, onward-flight details, a basic itinerary and any pickup confirmation where you can reach them offline. Check airline and airport flight information for the actual terminal rather than relying on a blanket statement that every flight uses one building."], sourceIds: ["guide-entry", "guide-iaa"] },
      { id: "border", title: "What happens at passport control?", paragraphs: ["Follow the airport signs and the staff's instructions for your passport. Have straightforward travel and accommodation details ready and answer questions truthfully. Do not plan a tight connection on the assumption that everyone passes through in the same amount of time.", "Keep any entry card or entry record issued to you with your passport throughout the stay. If you need evidence of entry for accommodation or another purpose, retain the original and follow the authority's instructions; a photograph is a useful backup, not an assured replacement."], sourceIds: ["guide-original-arrival", "guide-entry"] },
      { id: "bags", title: "What if a suitcase does not arrive?", paragraphs: ["Report missing or damaged checked baggage to the airline or handling agent before leaving baggage claim. Keep the baggage tags, obtain a written reference and give a usable local delivery address. A general airport lost-property request does not replace the airline baggage report.", "After collecting bags, use the appropriate customs channel and check current declaration rules for what you are carrying. Ask an officer when uncertain. Allow time for these steps before telling a driver that you are ready for pickup."], sourceIds: ["guide-lost-property", "guide-original-arrival"] },
      { id: "onward", title: "How do I leave the airport?", paragraphs: ["Check train and bus service for your exact date and the last leg to your hotel. For an on-demand authorized taxi, Gett's app or kiosk provides a ride code for the queue. Terminal 3 on-demand taxis use ground-floor Exit 03; scheduled Gett rides use Level 2, Exit 23. Follow the actual confirmation for private pickups.", "Arrange mobile data or connect to airport Wi-Fi so you can reach your driver or accommodation. Keep a backup payment method and ask about any airport services you need; desks and operational arrangements can change with the flight schedule, holidays or disruptions."], sourceIds: ["guide-gett", "guide-iaa", "israel-rail"] },
    ],
    checklist: ["Check official entry requirements before departure", "Save passport/approval and accommodation details offline", "Check the actual terminal and flight status", "Keep baggage tags and any entry record", "Report baggage problems before leaving claim", "Confirm mobile data, onward route and pickup location"],
    faqs: [{ q: "How long does it take to leave Ben Gurion Airport?", a: "It varies with the flight, stand, border queues and bags. Allow a generous margin rather than booking an onward connection from landing time alone. Give a transfer operator the flight number and discuss waiting terms." }, { q: "Are all airport taxi pickup points the same?", a: "No. Gett distinguishes on-demand and scheduled rides at Terminal 3. Private operators provide their own confirmed meeting instructions. Use the correct terminal and booking type." }, { q: "Should I throw away my entry card?", a: "Keep any entry card or record issued to you with your passport during the stay. Follow the issuing authority's advice if it is lost." }],
    sourceIds: ["guide-original-arrival", "guide-iaa", "guide-gett", "guide-lost-property", "guide-entry"], related: ["esim", "sherut", "taxis", "israel", "shabbat", "travelTips", "airportTaxis"], services: [{ label: "Choose your airport destination", to: "/transfers/" }, { label: "Private transfer to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }, { label: "Private transfer to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" }],
  },
  israel: {
    id: "israel", nextSteps: [{ label: "Taxi fares, apps & payment", to: travelGuidePaths.taxis }, { label: "Airport transport on Shabbat", to: travelGuidePaths.shabbat }, { label: "Compare rental-car requirements", to: "/car-rental/" }], title: "Getting around Israel: a practical transport guide",
    description: "Getting around Israel without a car? Compare trains, buses, light rail, taxis and rentals for city trips, rural stops, payment and weekends.",
    intro: "Plan the whole journey to the address you need, then choose a mix of transport that suits your cities, countryside days, luggage and travel dates.",
    answer: "Combine rail for suitable intercity journeys, buses or light rail for the remaining local route, and walking within convenient areas. Use a taxi or agreed private transfer when luggage, access, timing or a remote pickup makes connections awkward. A rental car is most useful when your actual itinerary benefits from driving and parking it.",
    topics: ["transportation", "destinations", "itineraries", "tips"], photo: { src: roadTrip, alt: "Illustration of a vehicle traveling along a desert road" },
    facts: [{ label: "Compare", text: "Door-to-door time, not just station-to-station time" }, { label: "Pay", text: "Use a supported ticket, Rav-Kav or authorized payment method" }, { label: "Weekend", text: "Check each route and date; municipal exceptions are local" }],
    comparison: { caption: "Choose transport by the journey", headers: ["Option", "Useful when", "Allow for"], rows: [["Israel Railways", "Your cities and travel date have a suitable connection", "Station access, the final leg and service changes"], ["Bus / light rail", "The route reaches the place you need", "Validation, connections and actual operating hours"], ["Taxi / private driver", "You need an exact address, luggage space or a planned pickup", "Fare terms, capacity and confirmation"], ["Rental car", "Several rural stops make independent driving useful", "Parking, fuel, tolls, insurance and permitted areas"], ["Organized day trip", "Transport and an itinerary are sold together", "Pickup, guide language, admission and return time"]] },
    sections: [
      { id: "public-transport", title: "How do trains, buses and light rail fit together?", paragraphs: ["Check a current journey planner with the real start and end addresses. Rail can be useful between the airport and rail-connected cities, while buses and urban light rail can complete the trip. A central-looking station may still be far from a beachfront hotel, hilltop property or Old City gate.", "Choose a supported payment method before boarding. A Rav-Kav card and authorized mobile-payment apps are common options; a train ticket may be another option for a particular journey. Validate as instructed on every ride and check distance, transfer and ticket rules for the product you buy."], sourceIds: ["israel-rail", "guide-telaviv-transit"] },
      { id: "cities", title: "What works in Tel Aviv, Jerusalem and Haifa?", paragraphs: ["In central Tel Aviv, combine walking with a bus or the Red Line when it actually follows your route. In Jerusalem, check light-rail access and the final walk to an Old City or neighbourhood address. In Haifa, consider elevation as well as distance when connecting from the coast to Mount Carmel.", "Group nearby sights into the same part of the day. Check the walking route, steps and luggage access when selecting a hotel, and plan an alternative for a late return or limited mobility."], sourceIds: ["guide-original-israel", "guide-red-line"] },
      { id: "weekends", title: "How should I plan Shabbat and holidays?", paragraphs: ["Check each operator for your own route and date rather than applying one nationwide timetable. For an airport arrival during Shabbat, use our dedicated Shabbat guide for terminal-specific weekend options and Saturday-evening restart checks. Local weekend networks are not substitutes for every weekday route.", "Confirm an important flight transfer, remote pickup or early departure before committing to the rest of the itinerary. Check the final return journey as carefully as the outward trip."], sourceIds: ["guide-telaviv-transit", "israel-rail"] },
      { id: "rural-trips", title: "Should I rent a car or arrange a driver?", paragraphs: ["List the rural stops you genuinely intend to visit, then compare a rental's complete cost and permitted areas with a driver or organized day trip. Include hotel parking, one-way return charges, fuel, toll handling and any special vehicle requirements.", "For one planned excursion, compare the guide, admissions, pickup and return details of a tour with a driver-only service. A transfer quote does not automatically include a licensed guide or sightseeing tickets."], sourceIds: ["guide-original-israel"] },
    ],
    checklist: ["Use actual hotel and attraction addresses", "Check dates, last departures and return connections", "Prepare payment and validate every journey", "Include luggage, walking and elevation in the comparison", "Confirm rental restrictions or driver inclusions", "Save an offline route and contact number"],
    faqs: [{ q: "Do tourists need a rental car in Israel?", a: "It depends on the itinerary. A city-focused stay may work well without one; several rural stops may make a car useful. Compare actual routes, parking and total cost rather than choosing by country alone." }, { q: "Can one app or ticket cover every journey?", a: "Do not assume so. Check the supported operator, product, distance and transfer rules. A taxi, rental car or private tour is separate from a public-transport fare." }, { q: "Does public transport run normally on Saturday?", a: "Check each route and date. Many regular services have a Shabbat break; some municipal weekend services are local exceptions with their own network and timetable." }],
    sourceIds: ["guide-original-israel", "israel-rail", "guide-telaviv-transit", "guide-red-line", "guide-iaa"], related: ["telAviv", "taxis", "shabbat", "arrival", "esim", "travelTips", "jerusalem", "taxiFares"], services: [{ label: "Private driver and intercity journeys", to: "/private-driver/" }, { label: "Car rental", to: "/car-rental/" }, { label: "Tours & day trips", to: "/tours/" }, { label: "Destinations and city guides", to: "/destinations/" }],
  },
  telAviv: {
    id: "telAviv", title: "Getting around Tel Aviv without a car: buses, rail and taxis",
    description: "Explore Tel Aviv by foot, bus, Red Line light rail or taxi. Check Rav-Kav payment, railway stations, Jaffa connections and weekend options.",
    intro: "Match the mode to the neighbourhood you want to explore. A short coastal walk and an airport train solve different parts of your trip.",
    answer: "For a central Tel Aviv stay, combine walking with buses, the Red Line where its corridor helps, and occasional taxis. National rail is mainly useful for the airport and journeys beyond the city. Check the municipal weekend network separately for Shabbat; a rental car is often easier to justify for days outside the city.",
    topics: ["transportation", "destinations", "tips"], photo: airportTransferPhotos["tel-aviv"]!,
    facts: [{ label: "Light rail", text: "Use the operating Red Line map, not future-line plans" }, { label: "National rail", text: "Include the final journey to the beach or hotel" }, { label: "Weekend", text: "Municipal routes have a separate map and schedule" }],
    comparison: { caption: "Choose how to move around Tel Aviv", headers: ["Journey", "Start by considering", "Check"], rows: [["Nearby central sights", "Walking", "Actual distance, heat, steps and street crossings"], ["A longer city trip", "Bus or Red Line", "Route coverage, stop and last departure"], ["Airport or another city", "National rail or an agreed transfer", "Station, date, luggage and last leg"], ["Luggage or awkward connections", "Licensed taxi", "Exact entrance, fare basis and capacity"], ["Shabbat outing", "Municipal weekend route, walking or taxi", "The separate weekend network and return time"]] },
    sections: [
      { id: "walking", title: "Can I walk between the main neighbourhoods?", paragraphs: ["Use walking for genuinely nearby stops and group sights by area. The promenade, central streets, Neve Tzedek and Jaffa can form useful parts of a walking day, but check the whole distance instead of assuming every attraction is close to your hotel.", "Account for heat, shade, crossings and steps. With luggage or limited mobility, check the exact entrance and an alternative vehicle drop-off. A pleasant daytime walk does not automatically suit a late-night arrival with suitcases."], sourceIds: ["guide-original-telAviv"] },
      { id: "buses-light-rail", title: "When should I use a bus or the Red Line?", paragraphs: ["Look up the actual destination on the live route map. The Red Line is operating, but it does not serve every beach, hotel or northern tourist area. A bus or another connection may be more direct. Construction or a future-network drawing is not proof that another line is carrying passengers.", "Check the supported Rav-Kav, mobile-payment or other ticket option for your journey. Validate as instructed on boarding or entering the system; a transfer arrangement does not remove the need to follow validation rules."], sourceIds: ["guide-red-line", "guide-telaviv-transit"] },
      { id: "rail", title: "Which Tel Aviv train station should I use?", paragraphs: ["National rail stations serve different parts of the Ayalon corridor, rather than lining the beachfront. Choose the station from the full door-to-door route to your hotel, university, business address or onward city. Do not select a station only because it contains the words Tel Aviv.", "For an airport journey, check date-specific service and luggage access. Compare the final walk or taxi with an agreed direct transfer if several connections would be awkward."], sourceIds: ["israel-rail", "guide-original-telAviv"] },
      { id: "weekend-and-bikes", title: "What changes on Shabbat, and what about bikes?", paragraphs: ["The municipality publishes a separate free weekend network. Check its route, operating window and return direction; it is not a replacement for every normal bus or an assumed airport service. Taxis remain another option subject to actual availability and the fare terms.", "Shared bikes or scooters may suit a confident rider on an appropriate route. Before renting, check the operator's age and eligibility rules, helmet requirements, permitted riding areas and parking instructions. Do not assume that a short map distance makes a pavement or pedestrian area suitable for riding."], sourceIds: ["guide-telaviv-transit", "guide-original-telAviv"] },
    ],
    checklist: ["Choose your hotel area around the places you will visit", "Group nearby attractions into a walking route", "Check current Red Line and bus maps", "Include the last leg from national rail", "Check the separate weekend service and return trip", "Read taxi or bike/scooter terms before starting"],
    faqs: [{ q: "Is Tel Aviv easy to visit without a car?", a: "A central stay can work well with walking, buses, the Red Line and occasional taxis. The right hotel location and actual daily routes matter more than having a car for every day." }, { q: "Does the Red Line go to every beach hotel?", a: "No. Check the current route and remaining walk. A bus or taxi may suit a particular hotel better." }, { q: "Are Tel Aviv weekend buses the same as weekday buses?", a: "No. The municipal weekend network has its own map, stops and timetable. Check the return journey and do not assume it provides your airport connection." }],
    sourceIds: ["guide-original-telAviv", "guide-telaviv-transit", "guide-red-line", "israel-rail"], related: ["israel", "uber", "taxis", "esim", "telAvivDayTrips", "shabbat"], services: [{ label: "Choose your Tel Aviv hotel area", to: "/travel-blog/where-to-stay-in-tel-aviv/" }, { label: "Jaffa hotel guide", to: "/tel-aviv/jaffa-hotels/" }, { label: "Private airport transfer to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" }],
  },
  ...taxiGuideCluster,
};

export type GuideDirectoryEntry = { id: string; title: string; description: string; to: LinkProps["to"]; topics: GuideTopicId[]; photo?: GuidePhoto };
export const guideDirectory: GuideDirectoryEntry[] = [
  ...attractionIds.map((id): GuideDirectoryEntry => { const g = attractionGuides[id]; return { id: `attraction-${id}`, title: g.title, description: g.description, to: attractionPath(id), topics: ["attractions","destinations",...(id.includes("mount-") || ["capernaum","tabgha"].includes(id) ? ["religion" as const] : [])], ...(g.image ? {photo:g.image}: {}) }; }),
  { id: "airport-journey-jerusalem", title: "How to get from Ben Gurion Airport to Jerusalem", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", topics: ["transportation", "tips"], photo: airportTransferPhotos["jerusalem"]! },
  { id: "airport-journey-tel-aviv", title: "How to get from Ben Gurion Airport to Tel Aviv", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", topics: ["transportation", "tips"], photo: airportTransferPhotos["tel-aviv"]! },
  { id: "airport-journey-haifa", title: "How to get from Ben Gurion Airport to Haifa", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", topics: ["transportation", "tips"], photo: airportTransferPhotos["haifa"]! },
  { id: "airport-journey-ein-bokek", title: "How to get from Ben Gurion Airport to Ein Bokek", description: "Compare train, bus, taxi and private-transfer options, travel times, estimated fares and weekend alternatives.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/", topics: ["transportation", "tips"], photo: airportTransferPhotos["dead-sea"]! },

  ...Object.values(travelGuides).map((guide) => ({ id: guide.id, title: guide.title, description: guide.description, to: travelGuidePaths[guide.id], topics: guide.topics, photo: guide.photo })),
  ...(["haifa", "ashdod"] as const).map((id): GuideDirectoryEntry => { const port = getShorePort(id); return { id: `shore-${id}`, title: port.title, description: port.description, to: port.path, topics: ["destinations", "itineraries", "transportation"], photo: port.photo }; }),
  { id: "stay-jerusalem", title: "Where to stay in Jerusalem", description: "Choose the neighbourhood and hotel style that fit your visit.", to: "/travel-blog/where-to-stay-in-jerusalem/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["jerusalem"]! },
  { id: "stay-telaviv", title: "Where to stay in Tel Aviv", description: "Compare beachfront, Jaffa and central neighbourhoods.", to: "/travel-blog/where-to-stay-in-tel-aviv/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["tel-aviv"]! },
  { id: "stay-haifa", title: "Where to stay in Haifa", description: "Understand coastal, German Colony and Carmel hotel locations.", to: "/travel-blog/best-hotels-in-haifa/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["haifa"]! },
  { id: "stay-tiberias", title: "Tiberias & Sea of Galilee hotels", description: "Lakeside bases, family facilities and practical arrival checks.", to: "/travel-blog/best-hotels-in-tiberias/", topics: ["destinations", "accommodation"], photo: { src: tiberias, alt: "Tiberias on the Sea of Galilee", credit: "Ian Scott · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" } },
  { id: "stay-deadsea", title: "Dead Sea hotels", description: "Choose Ein Bokek, a spa stay or a family hotel on the Israeli shore.", to: "/travel-blog/best-dead-sea-hotels/", topics: ["destinations", "accommodation"], photo: airportTransferPhotos["dead-sea"]! },
  { id: "masada", title: "Masada: plan your visit", description: "Cable car, entrance choices and a practical desert day trip.", to: "/travel-blog/masada/", topics: ["attractions", "itineraries", "tips"], photo: { src: masada, alt: "Masada plateau above the Dead Sea", credit: "Godot13 · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  { id: "caesarea", title: "Caesarea: visiting the ancient harbour", description: "Explore the coast, park entry and what to plan before travelling.", to: "/attractions/caesarea/", topics: ["attractions", "destinations"], photo: { src: caesarea, alt: "Caesarea's ancient coastal ruins", credit: "Zeev Stein · CC BY 2.5 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" } },
  { id: "tour-bethlehem", title: "Bethlehem from Jerusalem", description: "Read the itinerary and practical requirements of a combined day tour.", to: "/tours/bethlehem-from-jerusalem/", topics: ["itineraries", "attractions"], photo: { src: bethlehem, alt: "Church of the Nativity in Bethlehem", credit: "Britchi Mirela · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
];

export function isGuideTopic(value: unknown): value is GuideTopicId { return typeof value === "string" && guideTopics.some((topic) => topic.id === value); }
export function filterGuides(query: string, topic?: GuideTopicId) {
  const terms = query.trim().toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  return guideDirectory.filter((guide) => (!topic || guide.topics.includes(topic)) && terms.every((term) => `${guide.title} ${guide.description} ${guide.topics.map((id) => guideTopics.find((item) => item.id === id)!.label).join(" ")}`.toLocaleLowerCase("en").includes(term)));
}
