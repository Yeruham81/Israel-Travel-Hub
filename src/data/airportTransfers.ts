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
import { airportTransferRates, OWNER_BASE } from "@/data/registry";
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

export const airportDestinationCards = airportTransferRates.map((rate) => ({ ...rate, photo: airportTransferPhotos[rate.id]! }));

export const airportTransferBenefits = [
  { title: "A personal welcome", text: "Arrange your arrivals meeting point with Moshe before you fly." },
  { title: "Flight coordination", text: "Share your flight number so pickup can be planned around your arrival." },
  { title: "Your own vehicle", text: "Travel with your party directly to the address agreed in your booking." },
  { title: "Room for your group", text: "Request a suitable car, van or minibus for everyone and their luggage." },
  { title: "Family arrangements", text: "Request child seats in advance, with children's ages and any special needs." },
  { title: "A price agreed ahead", text: "Confirm your full quote and booking conditions before committing to the ride." },
];

export const airportTransferTips = [
  { title: "Use your landing time", text: "Give the flight's arrival date and time in Israel local time, especially if it lands after midnight. Include the flight number and clarify any connection or separate arrival." },
  { title: "Count people and bags", text: "Include children in the passenger count. List suitcases, carry-ons, strollers and bulky items so a vehicle can be matched to the whole party." },
  { title: "Share the exact address", text: "A city name is the starting point. Add the hotel name or full address, and ask about vehicle access if your accommodation is on a pedestrian street or inside an old town." },
  { title: "Keep pickup details handy", text: "Save the agreed meeting point and contact number offline. Keep your phone charged and notify the operator if immigration or baggage collection takes longer than expected." },
];

export const airportTransferFaqs = [
  { q: "Is this a private transfer for my party?", a: "This page is for airport transfers arranged in advance for your party. Ask Moshe to confirm the vehicle, pickup and drop-off details in your quote." },
  { q: "Are the displayed prices per person?", a: "No. They are Moshe Barak's published starting prices per vehicle for up to four passengers on weekdays. Night, weekend and holiday supplements may apply. Your final price and availability are confirmed with the operator." },
  { q: "Can I request a larger vehicle or child seats?", a: "Yes. Include all passengers, luggage and children's ages in the request. The operator will confirm the suitable vehicle and any requested seats before booking." },
  { q: "How far ahead should I arrange the ride?", a: "Moshe's published service requires at least 24 hours' notice. Request earlier for busy periods, larger groups or special vehicle requirements; sending an inquiry does not confirm availability." },
  { q: "What should I confirm about delays or cancellation?", a: "Ask for the meeting point, included waiting time, delay arrangements, cancellation deadline and payment terms in writing with your final quote. Platform bookings follow the terms of the offer you choose there." },
];

export const airportRelatedLinks = [
  { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const },
  { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" as const },
  { label: "Haifa hotels", to: "/travel-blog/best-hotels-in-haifa/" as const },
  { label: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" as const },
  { label: "Tours & day trips", to: "/tours/" as const },
  { label: "Attractions & experiences", to: "/attractions/" as const },
];
