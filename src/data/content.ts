/**
 * Editorial content for city accommodation guides. Original guidance; no property names,
 * ratings, prices or availability. Provider links live in registry.ts.
 */
import type { LinkProps } from "@tanstack/react-router";

export type StayPreference = "first-visit" | "car-free" | "quiet" | "nightlife" | "family" | "views";

export const preferenceLabels: Record<StayPreference, string> = {
  "first-visit": "First visit / sightseeing",
  "car-free": "Getting around without a car",
  quiet: "Quieter evenings",
  nightlife: "Restaurants & nightlife",
  family: "Travelling with kids",
  views: "Views & scenery",
};

export interface StayArea {
  name: string;
  suits: StayPreference[];
  text: string;
  watch: string;
}

export interface CityStayGuide {
  id: "jerusalem" | "telaviv" | "tiberias";
  city: string;
  path: string;
  title: string;
  metaDescription: string;
  intro: string;
  overview: string[];
  areas: StayArea[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  sourceIds: string[];
  related: { label: string; to: LinkProps["to"]; note?: string }[];
}

export const cityStayGuides: Record<CityStayGuide["id"], CityStayGuide> = {
  jerusalem: {
    id: "jerusalem",
    city: "Jerusalem",
    path: "/travel-blog/where-to-stay-in-jerusalem/",
    title: "Where to stay in Jerusalem: areas and hotel booking tips",
    metaDescription: "Choose the right Jerusalem area for your trip — Old City, city centre, German Colony and more — with a practical booking checklist and Shabbat tips.",
    intro: "Jerusalem is compact but hilly, and the area you pick shapes your days: how far you walk to the Old City, what's open on Shabbat and how easily a taxi can reach your door.",
    overview: [
      "Most first-time visitors want to be within walking distance of the Old City gates. The western city centre gives that plus restaurants and the light rail; staying inside the walls is atmospheric but involves stairs, cobbles and limited vehicle access.",
      "From Friday afternoon to Saturday evening much of West Jerusalem slows down for Shabbat: many restaurants and public transport pause. East Jerusalem and the Old City's Christian and Muslim quarters keep a different rhythm. Plan meals and arrivals with that in mind.",
    ],
    areas: [
      { name: "City centre (Jaffa Road, Ben Yehuda, Mamilla side)", suits: ["first-visit", "car-free", "nightlife"], text: "Walkable to Jaffa Gate, close to the light rail, cafés and shopping streets. Practical for short stays.", watch: "Street noise in the evenings; some streets are pedestrian-only, so check taxi drop-off." },
      { name: "Inside the Old City", suits: ["first-visit", "views"], text: "Wake up beside the main sights; mostly guesthouses and hospices rather than large hotels.", watch: "Cars can't reach most lanes. Expect to carry luggage over steps from the nearest gate." },
      { name: "German Colony & Emek Refaim", suits: ["quiet", "family"], text: "Leafy residential streets with restaurants along Emek Refaim; a longer walk or short ride to the Old City.", watch: "Quieter on Shabbat; check walking distance against your plans." },
      { name: "Near the central bus station / Navon train station", suits: ["car-free"], text: "Handy for early trains and buses to the airport, Tel Aviv or the Dead Sea.", watch: "Busy, functional area with less charm in the evening." },
      { name: "East Jerusalem (around Salah ad-Din St / American Colony)", suits: ["first-visit", "car-free"], text: "Walkable to Damascus and Herod's Gates, with businesses that typically stay open on Saturdays.", watch: "Confirm the exact location on a map; some addresses are less familiar to drivers." },
    ],
    checklist: [
      "Map the walking route to the Old City, including hills",
      "Ask how check-in works if you arrive on Friday evening or Saturday",
      "Confirm whether the hotel has a Shabbat elevator or step-free access if needed",
      "Ask where a taxi can stop and how far you'll carry luggage",
      "Check whether parking is available and charged, if you're driving",
      "Read the cancellation deadline and whether taxes are included in the total",
    ],
    faqs: [
      { q: "Is it better to stay inside or outside the Old City?", a: "Inside is atmospheric and close to the sights but has limited vehicle access, steps and fewer amenities. Outside, the city centre or East Jerusalem keeps you walkable with easier taxi access." },
      { q: "What changes on Shabbat?", a: "From Friday afternoon to Saturday evening many West Jerusalem businesses and most public transport pause. Ask your accommodation about check-in, elevators and meals, and plan transfers in advance." },
      { q: "Do you list specific hotels?", a: "Not yet. We don't publish property lists or ratings we haven't verified. Use the area guidance here, then compare current properties and prices on the booking site for your dates." },
      { q: "How do I get from Ben Gurion Airport to my hotel?", a: "See our airport-to-Jerusalem guide for the licensed taxi rank, pre-booked transfers and the train, plus tips for Old City drop-offs." },
    ],
    sourceIds: ["owner-stay-jerusalem"],
    related: [
      { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", note: "Taxi rank, transfers and train" },
      { label: "Bethlehem tours from Jerusalem", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
  telaviv: {
    id: "telaviv",
    city: "Tel Aviv",
    path: "/travel-blog/where-to-stay-in-tel-aviv/",
    title: "Where to stay in Tel Aviv: beachfront, Jaffa and city areas",
    metaDescription: "Compare Tel Aviv areas to stay — beachfront, Jaffa, Neve Tzedek, the city centre and the Old Port — with a booking checklist for international visitors.",
    intro: "Tel Aviv stretches along the Mediterranean, so the main choice is how close to the sea you want to be versus the cafés, bars and transport of the city centre.",
    overview: [
      "The beach promenade runs the length of the city down to Jaffa, and much of central Tel Aviv is flat and bike-friendly. Many visitors split time between the sea and inland streets like Rothschild and Dizengoff.",
      "Tel Aviv is livelier on Shabbat than Jerusalem, but public transport is still limited from Friday afternoon to Saturday evening. If you're arriving then, pre-arrange your airport transfer.",
    ],
    areas: [
      { name: "Beachfront (Hayarkon St / promenade)", suits: ["first-visit", "views", "family"], text: "Sea views and direct beach access; easy walking along the promenade.", watch: "Sea-view rooms are priced differently; check whether 'sea view' means full or side view." },
      { name: "City centre (Rothschild, Dizengoff)", suits: ["nightlife", "car-free", "first-visit"], text: "Bauhaus streets, cafés and restaurants, with good bus and taxi access.", watch: "Evening noise on popular streets; ask for a quieter room." },
      { name: "Neve Tzedek & Florentin", suits: ["nightlife", "quiet"], text: "Neve Tzedek has low-rise historic lanes and boutique stays; nearby Florentin is grittier and late-night.", watch: "Narrow streets can make taxi drop-off and parking harder." },
      { name: "Old Jaffa & Jaffa port", suits: ["views", "first-visit"], text: "Historic stone alleys, the port and flea-market area at the south end of the promenade.", watch: "Hilly, cobbled lanes; farther from northern Tel Aviv." },
      { name: "North / Old Port (Namal)", suits: ["family", "quiet"], text: "Waterfront boardwalk and Yarkon Park nearby; calmer evenings.", watch: "Longer ride to Jaffa and the centre." },
    ],
    checklist: [
      "Check the walk to the beach or promenade on a map",
      "Confirm what 'sea view' means for the room you book",
      "Ask about noise if you're on a nightlife street",
      "Check parking availability and cost — street parking is tight",
      "Plan Friday-evening and Saturday transport in advance",
      "Read the cancellation deadline and whether taxes are included",
    ],
    faqs: [
      { q: "Beach or city centre for a first visit?", a: "Both work; the city is compact. Beachfront suits relaxed days and families, while Rothschild and Dizengoff suit food and nightlife. Jaffa adds historic atmosphere." },
      { q: "Do I need a car in Tel Aviv?", a: "Usually not. Walking, bikes, buses and taxis cover most needs and parking is difficult. Rent a car when you leave the city instead." },
      { q: "Do you list specific hotels?", a: "No. We don't publish property lists or ratings we haven't verified. Use the area guidance, then compare current properties for your dates on the booking site." },
      { q: "How do I get from Ben Gurion Airport?", a: "See our airport-to-Tel Aviv guide for the licensed taxi rank, pre-booked transfers and checking the train for your date." },
    ],
    sourceIds: ["owner-stay-telaviv"],
    related: [
      { label: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Caesarea day trip", to: "/attractions/caesarea/", note: "On the coast north of Tel Aviv" },
      { label: "Car rental in Israel", to: "/car-rental/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
  tiberias: {
    id: "tiberias",
    city: "Tiberias",
    path: "/travel-blog/best-hotels-in-tiberias/",
    title: "Hotels in Tiberias & the Sea of Galilee: where to stay",
    metaDescription: "Where to stay in Tiberias and around the Sea of Galilee: lakefront, hillside and countryside options, with a practical booking checklist.",
    intro: "Tiberias is the main town on the Sea of Galilee and a base for Christian sites, the Golan and northern Israel. Choose between the walkable lakefront, quieter hillside views or countryside stays around the lake.",
    overview: [
      "Many Galilee sights are spread around the lake, so think about how you'll get around. Staying in Tiberias gives you restaurants and some public transport; countryside stays usually need a car or a driver.",
      "Summer is hot at lake level, which sits well below sea level. Air-conditioning, shade and pool access matter more here than in Jerusalem.",
    ],
    areas: [
      { name: "Lakefront promenade & old town", suits: ["first-visit", "car-free", "nightlife"], text: "Walk to the waterfront, restaurants and boat piers.", watch: "Can be busy and noisy on weekends and holidays." },
      { name: "Upper hillside (Kiryat Shmuel area)", suits: ["views", "quiet"], text: "Higher up the hill with lake views and calmer streets.", watch: "Steep roads; you'll likely drive or take taxis to the lake." },
      { name: "Around the lake (kibbutz and country guesthouses)", suits: ["family", "quiet", "views"], text: "Rural settings near beaches and sites on the north, east or south shores.", watch: "A car or driver is usually essential; evening dining options are limited." },
    ],
    checklist: [
      "Decide whether you'll have a car — it changes which area works",
      "Check air-conditioning and pool access for summer stays",
      "Confirm parking if staying in town",
      "Ask about Shabbat check-in and meal arrangements",
      "Check the walk to the lake versus the hillside location",
      "Read the cancellation deadline and whether taxes are included",
    ],
    faqs: [
      { q: "Tiberias or a countryside stay?", a: "Tiberias suits travellers without a car and those who want restaurants nearby. Countryside guesthouses around the lake are quieter and scenic but usually need a car or driver." },
      { q: "Can I visit the Galilee without driving?", a: "Yes, with a tour or a private driver. Buses exist but are slower between scattered sites. See tours and private transport options." },
      { q: "Do you list specific hotels?", a: "No. We don't publish property lists or ratings we haven't verified. Use the area guidance, then compare current properties for your dates on the booking site." },
      { q: "When is it hottest?", a: "Midsummer at lake level can be very hot. Plan outdoor sightseeing for mornings and evenings and check your accommodation's cooling and pool." },
    ],
    sourceIds: ["owner-hotels-tiberias"],
    related: [
      { label: "Tours & day trips", to: "/tours/", note: "Private drivers and guided days" },
      { label: "Car rental in Israel", to: "/car-rental/" },
      { label: "Destinations: Sea of Galilee", to: "/destinations/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
};
