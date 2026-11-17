import { airportTransferPhotos as photos } from "@/data/airportTransfers";
import { privateDriverServices, travelGuidePaths } from "@/data/registry";
import roadTripPhoto from "@/assets/home/road-trip.webp";
import localBusesPhoto from "@/assets/guides/2026-11/buses-in-tel-aviv.webp";
import telAvivStreetPhoto from "@/assets/tel-aviv/dizengoff.webp";
import taxiPhoto from "@/assets/guides/taxi-cabs-israel.webp";
import jerusalemPhoto from "@/assets/home/jerusalem-old-city-card.webp";
import caesareaPhoto from "@/assets/home/caesarea-dusk-card.webp";
import deadSeaPhoto from "@/assets/dead-sea/beach-card.webp";

const descriptions = {
  intercity: {
    title: "Hotel-to-hotel transfers",
    text: "Travelling from one city to another? Enjoy a direct journey between your hotels with an agreed pickup time and room for your luggage.",
    photo: photos["haifa"]!,
  },
  "day-hire": {
    title: "Private driver for the day",
    text: "Explore Jerusalem, the Galilee, the Dead Sea or places on your own wish list. Choose the stops and pace that work for your day.",
    photo: photos["jerusalem"]!,
  },
  "multi-stop": {
    title: "Multi-stop journeys",
    text: "Make the journey part of the experience with sightseeing or a relaxed break between destinations. I'll help you plan a sensible route.",
    photo: photos["caesarea"]!,
  },
};
export const privateDriverJourneys = privateDriverServices.map(service => ({ ...service, ...descriptions[service.id] }));
export const privateDriverHero = {
  src: roadTripPhoto,
  alt: "Illustration of a vehicle travelling along a desert road in Israel",
  sourceUrl: "",
};
export const privateDriverBenefits = [
  { title: "A route that fits your plans", text: "Choose your pickup, drop-off and favourite stops rather than following a fixed itinerary." },
  { title: "Space for your group", text: "Tell me how many people and bags are coming so I can check a suitable vehicle." },
  { title: "A clear quote before booking", text: "I'll confirm the itinerary, vehicle, total price and arrangements before you decide." },
];
export const privateDriverFaqs = [
  { q: "Can I book a transfer between two hotels?", a: "Yes. Send me both addresses, your date and preferred pickup time, plus the number of passengers and bags. I'll check the journey and send you a quote." },
  { q: "Can I hire a private driver for a whole day?", a: "You can request a full-day driver for sightseeing or appointments. Tell me which places interest you, where you want to start and finish, and any times that are important to you. I'll help put together a practical route." },
  { q: "Can I stop at attractions along the way?", a: "Of course — a few well-chosen stops can make an intercity journey more enjoyable. Include the places you want to visit and roughly how long you'd like at each, so the route and waiting time can be included in your quote." },
  { q: "How much does a private driver in Israel cost?", a: "Prices depend on your route, hours, date, vehicle size and any special requirements. There isn't a single fixed fare for every trip. I'll provide a personal quote with the agreed details before booking." },
  { q: "Does a private driver also provide guided tours?", a: "Private driving and licensed tour guiding are different services. If you'd like a guide as well as transport, mention it in your request and I'll check what can be arranged." },
  { q: "Can I request a larger vehicle or child seats?", a: "Yes, please mention the number of passengers, children's ages, luggage and any mobility or accessibility needs. I can then check which vehicle and equipment are available for your date." },
  { q: "Can I request a Ben Gurion Airport pickup?", a: "Yes. For airport pickups and published starting fares to popular destinations, the separate Airport Transfers page is the best place to begin." },
  { q: "When is my booking confirmed?", a: "After we agree on the route, vehicle, price and relevant terms, I'll confirm the arrangements with you. Sending the inquiry form alone does not create a booking." },
];
export const privateDriverGuides = [
  { title: "Getting around Israel", to: travelGuidePaths.israel, text: "Plan journeys between cities and regions.", photo: { src: localBusesPhoto, alt: "Buses at an Israeli transport terminal" } },
  { title: "Getting around Tel Aviv", to: travelGuidePaths.telAviv, text: "Explore local transport and travel options.", photo: { src: telAvivStreetPhoto, alt: "Pedestrian-friendly streets in central Tel Aviv" } },
  { title: "Taxis in Israel", to: travelGuidePaths.taxis, text: "Understand taxi options and fares.", photo: { src: taxiPhoto, alt: "Taxis travelling on a road in Israel" } },
  { title: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const, text: "Choose an area for your hotel stay.", photo: { src: jerusalemPhoto, alt: "Stone buildings in Jerusalem's Old City" } },
  { title: "Caesarea visitor guide", to: "/attractions/caesarea/" as const, text: "Add ancient Caesarea to a coastal route.", photo: { src: caesareaPhoto, alt: "Ancient Caesarea beside the Mediterranean Sea" } },
  { title: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" as const, text: "Find your base on the Dead Sea coast.", photo: { src: deadSeaPhoto, alt: "Beach and hotels near the Dead Sea" } },
];
