import type { LinkProps } from "@tanstack/react-router";
import type { GuidePhoto } from "@/data/travelGuides";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { shoreExcursionRates, shorePorts, travelGuidePaths, type ShorePortId } from "@/data/registry";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import ashdod from "@/assets/home/ashdod-port.webp";
import haifa from "@/assets/home/haifa-port.webp";
import masada from "@/assets/home/masada-dead-sea.webp";

type ItineraryDetails = {
  photo: GuidePhoto;
  description: string;
  bestFor: string;
  planningNote: string;
  highlights: string[];
};
type PortDetails = {
  title: string;
  description: string;
  intro: string;
  answer: string;
  photo: GuidePhoto;
  overview: string[];
  faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"]; note?: string }[];
  alternativeSourceId: string;
};

const masadaPhoto: GuidePhoto = { src: masada, alt: "Masada's desert plateau and ancient fortress seen from the air", credit: "Godot13 · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

const itineraryDetails: Record<string, ItineraryDetails> = {
  "ashdod-tel-aviv": {
    photo: airportTransferPhotos["tel-aviv"]!,
    description: "Combine Old Jaffa's stone lanes and harbour with Tel Aviv's Mediterranean promenade. Discuss a market, neighborhood walk or beachside lunch instead of a tightly packed checklist.",
    bestFor: "Coastal scenery, city life and a gentler pace",
    planningNote: "Choose the walking and lunch stops around your time ashore; this is a shorter coastal journey than the desert options.",
    highlights: ["Old Jaffa", "Tel Aviv seafront", "Flexible city stops"],
  },
  "ashdod-jerusalem": {
    photo: airportTransferPhotos["jerusalem"]!,
    description: "Plan a Jerusalem day around Old City lanes, major religious sites and a viewpoint. Tell Moshe which places matter most so the driving, walking and return can be planned together.",
    bestFor: "A first visit to Jerusalem's historic and religious heart",
    planningNote: "The Old City involves walking, steps and modest dress at holy sites. A licensed guide is a separate arrangement.",
    highlights: ["Old City", "Religious landmarks", "City viewpoints"],
  },
  "ashdod-masada": {
    photo: masadaPhoto,
    description: "Head into the Judean Desert for Masada and a Dead Sea stop. Decide whether your priority is the fortress visit, floating time or a slower combination of both.",
    bestFor: "Desert landscapes, ancient history and Dead Sea time",
    planningNote: "A long return journey: confirm site opening, cable-car admission, beach or resort access and the time available at each stop.",
    highlights: ["Masada", "Judean Desert", "Dead Sea stop"],
  },
  "ashdod-masada-jerusalem": {
    photo: airportTransferPhotos["dead-sea"]!,
    description: "The original operator page also offers a combined desert-and-Jerusalem route. Treat it as an ambitious custom request, with priorities and shorter stops agreed before booking.",
    bestFor: "A long port call with carefully chosen highlights",
    planningNote: "Request only for a sufficiently long call. The provider must confirm feasibility; a published route does not mean every port schedule can accommodate it.",
    highlights: ["Masada", "Dead Sea", "Selected Jerusalem stops"],
  },
  "haifa-akko": {
    photo: { src: akko, alt: "Fishing boats and stone buildings around Akko's old harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/akko_port_2.jpg", credit: "Akko harbour · image reused from the publisher's original Haifa excursion page; original JPEG retained" },
    description: "Explore Akko's old harbour and historic lanes, with a proposed coastal extension to Rosh Hanikra. Agree the actual stops and walking pace with your driver.",
    bestFor: "Old-town atmosphere and northern coastal scenery",
    planningNote: "Ask whether Rosh Hanikra is operating and accessible on your date before relying on it. Discuss an alternative northern stop if needed.",
    highlights: ["Akko Old City", "Historic harbour", "Rosh Hanikra if accessible"],
  },
  "haifa-tel-aviv": {
    photo: airportTransferPhotos["tel-aviv"]!,
    description: "Travel south for Old Jaffa and Tel Aviv's seafront, architecture or city neighborhoods. Pick a few priorities and leave room for traffic on the return to Haifa.",
    bestFor: "Urban culture, Jaffa and Mediterranean promenades",
    planningNote: "This involves more road time than a nearby northern outing. Confirm the time left for walking, food and any extra stops.",
    highlights: ["Old Jaffa", "Tel Aviv promenade", "City neighborhoods"],
  },
  "haifa-galilee": {
    photo: airportTransferPhotos["nazareth"]!,
    description: "Combine Nazareth with selected Sea of Galilee sites. Share the religious or landscape stops you care about, rather than assuming every church and lakeside site fits one day.",
    bestFor: "Christian heritage and Galilee landscapes",
    planningNote: "Agree the precise sites, opening hours, admissions and walking needs. Licensed guiding is not included in the car-and-driver starting rate.",
    highlights: ["Nazareth", "Sea of Galilee", "Selected heritage sites"],
  },
  "haifa-jerusalem": {
    photo: airportTransferPhotos["jerusalem"]!,
    description: "A long day south to Jerusalem, focused on your essential Old City sites and viewpoints. Keep the plan selective and make the ship's return deadline the first planning constraint.",
    bestFor: "A Jerusalem priority on a sufficiently long port call",
    planningNote: "Confirm the full return plan before choosing this route. Bethlehem is not included in this starting price; a guided combined product is listed separately below.",
    highlights: ["Jerusalem Old City", "Chosen holy sites", "Viewpoint if time allows"],
  },
};

const sharedFaqs = [
  { q: "Are the starting prices per person or per vehicle?", a: "They are published ILS starting prices for a full-day return car-and-driver service for up to four passengers on weekdays. They are not per-person fares or live quotes. Night, weekend and holiday supplements may apply; Moshe confirms the total for your actual party and schedule." },
  { q: "Is a licensed guide included?", a: "No. These starting rates cover private transportation and a driver. Licensed guiding, site admission, meals and tips are excluded. Request a guide separately if you want interpretation or guided visits inside sites, and ask for its price in the written quote." },
  { q: "Can the itinerary be customized?", a: "Yes, request different priorities, a slower pace or another destination. The operator must confirm that the route fits your hours ashore, site access and return buffer. Changes can alter the price." },
  { q: "Can I request a van, child seats or an accessible vehicle?", a: "Include all passengers, children's ages, mobility needs and any equipment in the inquiry. Vans and minibuses are available by request, subject to confirmation. Do not assume a suitable vehicle or seat is reserved until the operator confirms it." },
  { q: "Where will I meet the driver?", a: "Agree the precise meeting point for your ship, berth and port procedures in writing. Ask whether a terminal transfer or port shuttle is needed; do not assume every driver can wait beside the ship." },
  { q: "What happens if the ship is delayed or cancels the port call?", a: "Send any schedule change to the operator promptly. The original local pages advertise schedule coordination and a 24-hour cancellation window, but your written offer should specify the cutoff, any deposit refund, missed-call policy and revised itinerary. Other operators have their own terms. No return-to-ship guarantee is made by this portal." },
  { q: "How do I send the inquiry and book?", a: "Choose an itinerary and complete the form with your ship, date, hours ashore and party details. Prepare and send the request through your email app, or use the original online form. A prepared draft has not been sent. The excursion is booked only after the operator confirms availability, price, payment and terms." },
];

const portDetails: Record<ShorePortId, PortDetails> = {
  ashdod: {
    title: "Ashdod shore excursions: private day trips & prices",
    description: "Plan a private shore excursion from Ashdod Port to Tel Aviv and Jaffa, Jerusalem, Masada or the Dead Sea. Compare published car-and-driver rates and request a quote.",
    intro: "Make your day ashore your own: explore Jerusalem, stroll Tel Aviv and Jaffa, or plan a desert day at Masada and the Dead Sea. Choose an idea below and send Moshe your ship's schedule for a tailored quote.",
    answer: "From Ashdod, choose the Tel Aviv–Jaffa coast, Jerusalem or a longer Masada and Dead Sea journey. Compare Moshe Barak's published car-and-driver starting rates below, quoted per vehicle for up to four passengers. The right route depends on your actual disembarkation and all-aboard times; guiding and admission are separate.",
    photo: { src: ashdod, alt: "Aerial view of Ashdod Port and its Mediterranean breakwater", credit: "Amos Meron · CC BY-SA 3.0 · cropped and resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ashdod_Port_Aerial_View.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
    overview: [
      "Ashdod is the southern cruise-port starting point in this guide. A Tel Aviv–Jaffa day keeps the focus on the coast; Jerusalem puts historic and religious sites first. Masada and the Dead Sea add a longer desert drive, so choose them for a port call that leaves enough time for the return.",
      "Choose one main experience before adding stops. Tell Moshe if your priority is the Western Wall, Jaffa's old lanes, Masada or time at the Dead Sea. Your quote should name the agreed route, stops, pickup and planned return, rather than promising every attraction in a region.",
    ],
    faqs: [
      { q: "Which excursion suits a shorter Ashdod port call?", a: "Discuss Tel Aviv and Jaffa or a more local coastal plan before a long desert itinerary. No route is automatically suitable: give the operator your expected time off the ship and all-aboard deadline so the return buffer can be assessed." },
      { q: "Can I combine Jerusalem, Masada and the Dead Sea?", a: "The original operator page publishes this combined route, but it is an ambitious long day. Request a feasibility check for your exact call and agree the priority stops. Choose a simpler itinerary if the schedule does not allow enough time." },
      ...sharedFaqs,
    ],
    related: [
      { label: "Masada visit & tickets", to: "/travel-blog/masada/", note: "Plan the fortress visit and admission separately." },
      { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
      { label: "Jerusalem neighborhoods & stays", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Bethlehem guided-tour planning", to: "/tours/bethlehem-from-jerusalem/", note: "A separate guided product; not included in the car-and-driver cards." },
      { label: "Private driver for other travel days", to: "/private-driver/" },
      { label: "Shore excursions from Haifa", to: "/haifa-shore-excursions/" },
    ],
    alternativeSourceId: "beinharim-ashdod-jlm-bethlehem",
  },
  haifa: {
    title: "Haifa shore excursions: private day trips & prices",
    description: "Choose a Haifa Port shore excursion to Akko, Nazareth and the Sea of Galilee, Tel Aviv or Jerusalem. See published private-driver starting rates and request a quote.",
    intro: "Explore the northern coast, follow a Galilee itinerary or make Jerusalem your priority. Start with an excursion idea, then let Moshe plan the vehicle and route around your ship's time in Haifa.",
    answer: "Haifa is a practical starting point for Akko, Nazareth and the Sea of Galilee; Tel Aviv and Jerusalem involve longer drives south. Compare his published return car-and-driver starting rates below, quoted per vehicle for up to four passengers. Site access, your hours ashore and the return plan must be confirmed before booking.",
    photo: { src: haifa, alt: "Haifa Port and Haifa Bay seen from Mount Carmel", credit: "Юкатан · CC BY-SA 3.0 · cropped and resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
    overview: [
      "Choose the north if you want more of the day around Akko, the Galilee or the Carmel rather than on the road to Jerusalem. Akko's old harbour suits a coastal day; Nazareth and selected lakeside sites offer a different route for Christian heritage and Galilee scenery.",
      "The published Rosh Hanikra extension needs an explicit check of site operation and access for your date. Jerusalem and Tel Aviv are longer journeys from Haifa, so ask how much time remains at the destination after the return drive and port buffer. A nearby alternative may be a better fit for a shorter call.",
    ],
    faqs: [
      { q: "Which excursion is closest to Haifa?", a: "Akko and a tailored Haifa or northern-coast plan usually leave more time near the port than Jerusalem. The right choice still depends on traffic, the exact stops, walking pace and your ship's timetable." },
      { q: "Is Rosh Hanikra definitely included?", a: "It is part of a published itinerary idea, but operation and access must be checked for your date. Ask the operator to confirm the stop and a suitable alternative before booking. The photo on that card shows Akko's harbour, not the grottoes." },
      { q: "Can I visit Jerusalem from Haifa Port?", a: "It is a published option, with a long drive in each direction. Ask for a selective itinerary and a realistic return plan for your actual port call. The car-and-driver Jerusalem rate does not include Bethlehem or a licensed guide." },
      ...sharedFaqs,
    ],
    related: [
      { label: "Haifa hotels before or after your cruise", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Caesarea visit planning", to: "/attractions/caesarea/", note: "An alternative destination to discuss in a custom request." },
      { label: "Tiberias & Sea of Galilee stays", to: "/travel-blog/best-hotels-in-tiberias/" },
      { label: "Choosing an eSIM for Israel", to: travelGuidePaths.esim },
      { label: "Private driver for other travel days", to: "/private-driver/" },
      { label: "Shore excursions from Ashdod", to: "/ashdod-shore-excursions/" },
    ],
    alternativeSourceId: "beinharim-haifa-jlm-bethlehem",
  },
};

export const shoreExcursionBenefits = [
  { title: "Your party, your vehicle", text: "Choose a private day with the vehicle size confirmed for all passengers." },
  { title: "A route around your interests", text: "Share the places that matter most, walking preferences and time for breaks." },
  { title: "A plan around your ship", text: "Agree pickup, realistic stops and the return buffer before confirming." },
  { title: "Personal coordination", text: "Discuss the details directly with Moshe, including family and mobility requests." },
];

export function getShorePort(id: ShorePortId) {
  return { id, ...shorePorts[id], ...portDetails[id], itineraries: shoreExcursionRates.filter((rate) => rate.portId === id).map((rate) => ({ ...rate, ...itineraryDetails[rate.id]! })) };
}
