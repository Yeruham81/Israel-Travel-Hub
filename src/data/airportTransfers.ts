import telAviv from "@/assets/tel-aviv/beachfront.webp";
import jerusalem from "@/assets/jerusalem/old-city.webp";
import haifa from "@/assets/haifa/panorama.webp";
import deadSea from "@/assets/dead-sea/beach.webp";
import eilat from "@/assets/eilat/waterfront.webp";
import raanana from "@/assets/airport-transfers/raanana.webp";
import herzliya from "@/assets/airport-transfers/herzliya.webp";
import netanya from "@/assets/airport-transfers/netanya.webp";
import ashdod from "@/assets/airport-transfers/ashdod.webp";
import caesarea from "@/assets/airport-transfers/caesarea.webp";
import nazareth from "@/assets/airport-transfers/nazareth.webp";
import airport from "@/assets/airport-transfers/airport.webp";
import moshe from "@/assets/airport-transfers/moshe.webp";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import esim from "@/assets/guides/esim-israel.jpeg";
import roadTrip from "@/assets/home/road-trip.webp";
import { airportTransferRates, OWNER_BASE, travelGuidePaths } from "@/data/registry";
import type { StayGuidePhoto } from "@/data/content";

const upload = `${OWNER_BASE}/wp-content/uploads`;
export const airportTransferPhotos: Record<string, StayGuidePhoto> = {
  "tel-aviv": { src: telAviv, alt: "Tel Aviv's beachfront hotels and promenade", sourceUrl: `${upload}/2025/08/Tel_Aviv_Promenade1.jpg`, label: "Tel Aviv beachfront" },
  jerusalem: { src: jerusalem, alt: "Stone buildings and lanes in Jerusalem's Old City", sourceUrl: `${upload}/2026/07/Jerusalem_Old_City_street.webp`, label: "Jerusalem Old City" },
  haifa: { src: haifa, alt: "Haifa Bay and the Bahá'í Gardens from Mount Carmel", sourceUrl: `${upload}/2026/01/best_hotels_in_haifa_.webp`, label: "Haifa Bay" },
  "dead-sea": { src: deadSea, alt: "Ein Bokek beach beside the Dead Sea", sourceUrl: `${upload}/2025/08/dead_sea_beach_1.jpg`, label: "Ein Bokek, Dead Sea" },
  raanana: { src: raanana, alt: "Orange Tree public artwork in Ra’anana", sourceUrl: `${upload}/2025/08/orange_tree_in_raanana_1.jpg`, label: "Ra’anana" },
  herzliya: { src: herzliya, alt: "Herzliya beach and the Mediterranean coastline", sourceUrl: `${upload}/2025/08/beach_in_Herzliya_1.jpg`, label: "Herzliya beach" },
  netanya: { src: netanya, alt: "Netanya's coastal skyline and beaches", sourceUrl: `${upload}/2025/08/Netanya_Beach_Promende_1.jpg`, label: "Netanya coastline" },
  ashdod: { src: ashdod, alt: "Boats in Ashdod Marina seen from the air", sourceUrl: `${upload}/2025/08/Ashdod_1.jpg`, label: "Ashdod Marina" },
  caesarea: { src: caesarea, alt: "Aerial view of Caesarea's ancient coastal harbour", sourceUrl: `${upload}/2025/08/caesarea_1.jpg`, label: "Caesarea coastline" },
  nazareth: { src: nazareth, alt: "Courtyard and dome of the Basilica of the Annunciation in Nazareth", sourceUrl: `${upload}/2025/08/Basilica_of_Annunciation_1.jpg`, label: "Nazareth" },
  eilat: { src: eilat, alt: "Palm-lined waterfront and hotels in Eilat on the Red Sea", sourceUrl: `${upload}/2025/08/eilat_.jpg`, label: "Eilat waterfront" },
  other: { src: airport, alt: "Aircraft beside the terminal at Ben Gurion Airport", sourceUrl: `${upload}/2026/08/planes_at_ben_gurion_airport_.webp`, label: "Ben Gurion Airport" },
  moshe: { src: moshe, alt: "Moshe Barak seated in his vehicle", sourceUrl: `${upload}/2025/08/moshe_barak_4.webp`, label: "Moshe Barak — operator portrait" },
};

/** Use the same four destination images already displayed under Airport Transfers on the homepage. */
export const airportHomepageRoutePhotos: Record<string, Pick<StayGuidePhoto, "src" | "alt">> = {
  jerusalem: { src: "/images/home/transfer-jerusalem-tower-of-david.webp", alt: "Tower of David citadel beside Jerusalem’s Old City" },
  "tel-aviv": { src: "/images/home/transfer-tel-aviv-beach-skyline.webp", alt: "Tel Aviv Mediterranean beach and modern skyline" },
  haifa: { src: "/images/home/transfer-haifa-bahai-gardens.webp", alt: "Bahá’í Gardens staircase and Shrine in Haifa" },
  "dead-sea": { src: "/images/home/transfer-ein-bokek-aerial.webp", alt: "Aerial view of Ein Bokek Dead Sea resort area and turquoise water" },
};

export const airportDestinationCards = airportTransferRates.map((rate) => ({ ...rate, photo: airportHomepageRoutePhotos[rate.id] ?? airportTransferPhotos[rate.id]! }));

export const airportTransferBenefits = [
  { title: "Agreed price, no extra charges", text: "The full fare is confirmed in advance, with no unexpected charges added later." },
  { title: "Flight tracking", text: "Flight status is monitored so pickup can be coordinated with the actual landing time." },
  { title: "Free cancellation up to 24 hours", text: "Direct bookings can be cancelled free of charge up to 24 hours before the scheduled pickup." },
];

export const airportTransferChecklist = [
  "Use your flight's landing date and time in Israel local time, including arrivals after midnight.",
  "Provide the full drop-off address and the number of passengers, suitcases and carry-ons.",
  "Request child seats or a larger vehicle in advance if your party needs them.",
  "Check the full price, waiting arrangements and cancellation terms before confirming.",
  "Save your driver's contact details and the agreed airport meeting point for arrival.",
];

export const airportTransferFaqs = [
  { q: "Are the displayed prices per person?", a: "No. They are my starting weekday fares per vehicle for up to four passengers. Night, weekend and holiday surcharges, when applicable, are included in the final price I confirm before booking; no extra charges are added to that agreed fare." },
  { q: "Can I request a larger vehicle or child seats?", a: "Yes. Tell me about all passengers, luggage and children's ages. I'll confirm the vehicle and any requested seats before the booking is finalized." },
  { q: "Will you track my flight if it is delayed?", a: "I track the flight details you provide and coordinate the pickup around the actual landing time. Please follow the agreed meeting instructions and contact me if your arrival or baggage collection changes unexpectedly." },
  { q: "When can I cancel for free?", a: "For transfers booked directly with me, cancellation is free until 24 hours before the scheduled pickup. Ask about the terms of later cancellations when confirming the booking. Independent booking platforms have their own cancellation policies." },
  { q: "When is my transfer booking confirmed?", a: "An inquiry does not reserve a vehicle. I'll confirm the full price, availability, pickup location and payment arrangements in writing before your booking is finalized." },
];

export const airportRelatedLinks = [
  {
    label: "Ben Gurion arrival tips", to: travelGuidePaths.arrival,
    description: "Follow the arrival sequence from passport control to baggage claim, customs and the public arrivals hall.",
    photo: { src: airportHall, alt: "Arrivals reception hall at Ben Gurion Airport Terminal 3", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  },
  {
    label: "Choosing an eSIM for Israel", to: travelGuidePaths.esim,
    description: "Stay connected for maps, messages and travel plans. Understand phone compatibility, data allowances and activation before choosing an eSIM for your visit.",
    photo: { src: esim, alt: "A phone displaying an illustrative eSIM screen against a city background", sourceUrl: `${upload}/2025/08/best_esim_for_israel.jpeg`, credit: "Illustrative eSIM screen, not a provider speed test." },
  },
  {
    label: "Taxis in Israel", to: travelGuidePaths.taxis,
    description: "Make everyday journeys easier after your airport ride. Learn about taxi apps, payment, receipts and the details to confirm before setting off.",
    photo: { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "Licensed taxis in Tel Aviv" },
  },
  {
    label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const,
    description: "Find a Jerusalem neighborhood that suits your visit. Compare Old City atmosphere, central locations and quieter areas, with practical hotel and vehicle-access advice.",
    photo: airportTransferPhotos["jerusalem"]!,
  },
  {
    label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" as const,
    description: "Choose between beachfront mornings, central city life and historic Jaffa. Explore Tel Aviv's hotel areas and find the right base for your stay.",
    photo: airportTransferPhotos["tel-aviv"]!,
  },
  {
    label: "Haifa hotels", to: "/travel-blog/best-hotels-in-haifa/" as const,
    description: "Discover places to stay around the German Colony, Carmel and coast. Match your hotel location to Haifa's sights, hills and onward plans.",
    photo: airportTransferPhotos["haifa"]!,
  },
  {
    label: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" as const,
    description: "Compare Ein Bokek resorts, southern hotel districts and Ein Gedi stays; beach access and mineral pools are not interchangeable.",
    photo: airportTransferPhotos["dead-sea"]!,
  },
  {
    label: "Tours & day trips", to: "/tours/" as const,
    description: "Turn your stay into a journey of discovery. Explore guided outings and private day trips to historic cities, sacred sites and memorable landscapes.",
    photo: airportTransferPhotos["nazareth"]!,
  },
  {
    label: "Attractions & experiences", to: "/attractions/" as const,
    description: "Find the places that make your Israel itinerary your own. Discover ancient harbours, city sights, heritage sites and natural landscapes across the country.",
    photo: airportTransferPhotos["caesarea"]!,
  },
  {
    label: "Israel travel tips", to: travelGuidePaths.travelTips,
    description: "Prepare for a smoother trip, from everyday essentials to planning your days. Find practical advice on packing, communication and exploring Israel's cities and sights.",
    photo: { src: roadTrip, alt: "Illustration of a vehicle traveling along a desert road in Israel" },
  },
];
