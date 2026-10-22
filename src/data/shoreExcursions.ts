import type { GuidePhoto } from "@/data/travelGuides";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { shoreExcursionRates, shorePorts, type ShorePortId } from "@/data/registry";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import ashdod from "@/assets/home/ashdod-port.webp";
import haifa from "@/assets/home/haifa-port.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import cableCar from "@/assets/home/masada-cable-car.webp";
import sepulchre from "@/assets/guides/holy-sepulchre.jpg";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { portShoreGuides, type ShoreReadingGuide } from "@/data/shoreReading";
import { filterShoreServices, shoreListedPrice, type ShoreServiceSearch } from "@/lib/shore-services";

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
  related: ShoreReadingGuide[];
  alternativeSourceId: string;
};

const masadaPhoto: GuidePhoto = { src: masada, alt: "Masada's desert plateau and ancient fortress seen from the air", credit: "Godot13 · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

/** Each published excursion has its own destination photograph, including across ports. */
const guidedTourPhotos: Record<string, GuidePhoto> = {
  "shore-gyg-haifa-akko": migrationPhotos["EXISTING:haifa"],
  "shore-gyg-haifa-galilee": migrationPhotos["basilica-of-the-annunciation"],
  "shore-viator-haifa-galilee": migrationPhotos["EXISTING:galilee"],
  "shore-viator-haifa-jerusalem-bethlehem": { src: bethlehem, alt: "Church of the Nativity and Manger Square in Bethlehem", credit: "Britchi Mirela · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "shore-gyg-ashdod-jerusalem-bethlehem": migrationPhotos["jerusalem-to-bethlehem"],
  "shore-gyg-ashdod-galilee": migrationPhotos["annunciation-interior"],
  "shore-gyg-ashdod-masada": { src: cableCar, alt: "A cable car ascending toward the desert fortress of Masada", credit: "James Emery · CC BY 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  "shore-viator-ashdod-jerusalem-dead-sea": migrationPhotos["jerusalem-to-the-dead-sea"],
  "shore-viator-ashdod-jerusalem-bethlehem": { src: sepulchre, alt: "Courtyard and facade of the Church of the Holy Sepulchre in Jerusalem", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Church_of_the_Holy_Sepulchre_Jerusalem_israel.jpg", credit: "Photograph from the publisher's churches guide; retained unchanged." },
};

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
    description: "Plan a Jerusalem day around Old City lanes, major religious sites and a viewpoint. Tell me which places matter most so the driving, walking and return can be planned together.",
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
    description: "Combining the desert with Jerusalem is an ambitious custom request, with priorities and shorter stops agreed before booking.",
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
    photo: { src: jaffa, alt: "Old Jaffa and its harbour beside the Mediterranean coast", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/jaffa_panorama2.jpg" },
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
    photo: migrationPhotos["EXISTING:jerusalem"],
    description: "A long day south to Jerusalem, focused on your essential Old City sites and viewpoints. Keep the plan selective and make the ship's return deadline the first planning constraint.",
    bestFor: "A Jerusalem priority on a sufficiently long port call",
    planningNote: "Confirm the full return plan before choosing this route. Bethlehem and licensed guiding are not included in this car-and-driver starting price.",
    highlights: ["Jerusalem Old City", "Chosen holy sites", "Viewpoint if time allows"],
  },
};

const sharedFaqs = [
  { q: "Do all cards belong to the same operator?", a: "No. Each card names the operator and, where relevant, the booking platform such as GetYourGuide or Viator. My published ILS day-trip starting rates apply only to my named car-and-driver itineraries; other operators have separate prices, inclusions and terms." },
  { q: "Are the starting prices per person or per vehicle?", a: "Each card states its price basis. My ILS starting rates cover a full-day return car-and-driver service for up to four passengers on weekdays. External excursions may be priced per person or per group, as shown. Prices are not live quotes; confirm the total for your actual party, date and options before booking." },
  { q: "Is a licensed guide included?", a: "My car-and-driver starting rates cover private transportation and a driver, with licensed guiding, admission, meals and tips extra. Request a guide separately for interpretation or guided visits inside sites. External guided excursions have their own inclusions, shown on the booking page; confirm the guide, language and admission arrangements before booking." },
  { q: "Can the itinerary be customized?", a: "Yes, request different priorities, a slower pace or another destination. The operator must confirm that the route fits your hours ashore, site access and return buffer. Changes can alter the price." },
  { q: "Can I request a van, child seats or an accessible vehicle?", a: "Include all passengers, children's ages, mobility needs and any equipment in the inquiry. Vans and minibuses are available by request, subject to confirmation. Do not assume a suitable vehicle or seat is reserved until the operator confirms it." },
  { q: "Where will I meet the driver?", a: "Agree the precise meeting point for your ship, berth and port procedures in writing. Ask whether a terminal transfer or port shuttle is needed; do not assume every driver can wait beside the ship." },
  { q: "What happens if the ship is delayed or cancels the port call?", a: "Send any schedule change to the operator promptly. Ask for written confirmation of the cancellation cutoff, any deposit refund, missed-call policy and revised itinerary. Other operators have their own terms. No return-to-ship guarantee is made by this portal." },
  { q: "How do I request your car-and-driver day trip?", a: "Choose an itinerary and complete the form with your ship, date, hours ashore and party details. Press Send excursion request to email the details directly and wait for the on-page confirmation. The excursion is booked only after the operator confirms availability, price, payment and terms. External guided-tour cards open their booking page on GetYourGuide or Viator." },
];

const portDetails: Record<ShorePortId, PortDetails> = {
  ashdod: {
    title: "Ashdod shore excursions: tours & private day trips",
    description: "Make the most of your Ashdod port call with Jerusalem, Tel Aviv and Jaffa, Masada or the Dead Sea. Compare guided excursions and flexible private day trips with port pickup and return.",
    intro: "From Ashdod Port, choose between a coastal visit to Jaffa and Tel Aviv, a walking-intensive day in Jerusalem, or a longer desert route to Masada and the Dead Sea. The best fit depends on when you can actually leave the ship, how much time you want at the sites and the all-aboard deadline.",
    answer: "A private car and driver lets you agree the stops and walking pace; licensed guiding and admission are separate unless stated. Guided tours follow the operator's published itinerary and inclusions. Before booking any option, verify its Ashdod Port meeting point, return arrangements and fit with your ship's deadline.",
    photo: { src: ashdod, alt: "Aerial view of Ashdod Port and its Mediterranean breakwater", credit: "Amos Meron · CC BY-SA 3.0 · cropped and resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ashdod_Port_Aerial_View.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
    overview: [
      "Ashdod is the southern cruise-port starting point in this guide. A Tel Aviv–Jaffa day keeps the focus on the coast; Jerusalem puts historic and religious sites first. Masada and the Dead Sea add a longer desert drive, so choose them for a port call that leaves enough time for the return.",
      "Make the main destination clear: the Western Wall, Jaffa, Masada or a Dead Sea beach involves a different day. Agree the stops and planned return rather than trying to fit every regional attraction into one excursion.",
    ],
    faqs: [
      { q: "Which excursion suits a shorter Ashdod port call?", a: "Discuss Tel Aviv and Jaffa or a more local coastal plan before a long desert itinerary. No route is automatically suitable: give the operator your expected time off the ship and all-aboard deadline so the return buffer can be assessed." },
      { q: "Can I combine Jerusalem, Masada and the Dead Sea?", a: "Combining these destinations makes for an ambitious long day. Request a feasibility check for your exact call and agree the priority stops. Choose a simpler itinerary if the schedule does not allow enough time." },
      ...sharedFaqs,
    ],
    related: portShoreGuides.ashdod,
    alternativeSourceId: "beinharim-ashdod-jlm-bethlehem",
  },
  haifa: {
    title: "Haifa shore excursions: tours & private day trips",
    description: "Discover Akko, Nazareth and the Sea of Galilee, Tel Aviv or Jerusalem from Haifa Port. Compare guided excursions and flexible private day trips with port pickup and return.",
    intro: "Haifa Port is a practical starting point for Akko or selected sites in Nazareth and the Galilee. Jerusalem and Tel Aviv require a longer southbound journey, reducing time at the destination. Compare each route against your actual hours ashore and the return deadline, not just the advertised sightseeing stops.",
    answer: "Akko generally allows more time near Haifa than a long-distance Jerusalem day. Choose a private driver for an agreed route and pace, or a guided tour when site interpretation is central to your visit. Confirm guiding, admission, the port meeting point and the return policy in the specific offer.",
    photo: { src: haifa, alt: "Haifa Port and Haifa Bay seen from Mount Carmel", credit: "Юкатан · CC BY-SA 3.0 · cropped and resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
    overview: [
      "Choose the north if you want more of the day around Akko, the Galilee or the Carmel rather than on the road to Jerusalem. Akko's old harbour suits a coastal day; Nazareth and selected lakeside sites offer a different route for Christian heritage and Galilee scenery.",
      "If adding Rosh Hanikra, verify current site access before including it in the itinerary. For Jerusalem or Tel Aviv, account for the long return drive before deciding how many stops fit.",
    ],
    faqs: [
      { q: "Which excursion is closest to Haifa?", a: "Akko and a tailored Haifa or northern-coast plan usually leave more time near the port than Jerusalem. The right choice still depends on traffic, the exact stops, walking pace and your ship's timetable." },
      { q: "Is Rosh Hanikra definitely included?", a: "It is part of a published itinerary idea, but operation and access must be checked for your date. Ask the operator to confirm the stop and a suitable alternative before booking." },
      { q: "Can I visit Jerusalem from Haifa Port?", a: "It is a published option, with a long drive in each direction. Ask for a selective itinerary and a realistic return plan for your actual port call. The car-and-driver Jerusalem rate does not include Bethlehem or a licensed guide." },
      ...sharedFaqs,
    ],
    related: portShoreGuides.haifa,
    alternativeSourceId: "beinharim-haifa-jlm-bethlehem",
  },
};

export const shoreExcursionBenefits = [
  { title: "Your party, your vehicle", text: "Choose a private day with the vehicle size confirmed for all passengers." },
  { title: "A route around your interests", text: "Share the places that matter most, walking preferences and time for breaks." },
  { title: "A plan around your ship", text: "Agree pickup, realistic stops and the return buffer before confirming." },
  { title: "Personal coordination", text: "Discuss the details directly with me, including family and mobility requests." },
];

export function getShorePort(id: ShorePortId) {
  return { id, ...shorePorts[id], ...portDetails[id], itineraries: shoreExcursionRates.filter((rate) => rate.portId === id).map((rate) => ({ ...rate, ...itineraryDetails[rate.id]! })) };
}

/** Editorial display details are separate from registry products and booking links. */
export function getShoreCatalog(portId: ShorePortId, filters: ShoreServiceSearch = {}) {
  const port = getShorePort(portId);
  return filterShoreServices(portId, filters).sort((a, b) => Number(Boolean(b.partner)) - Number(Boolean(a.partner))).map((service) => {
    const itinerary = port.itineraries.find((item) => item.id === service.itineraryId);
    const guidedFormat = service.product?.groupFormat === "private" ? "Private guided excursion" : service.product?.groupFormat === "shared" ? "Shared guided excursion" : "Guided excursion";
    return {
      ...service, itinerary,
      listedPrice: shoreListedPrice(service.product),
      duration: service.product?.durationLabel || "Full day · by agreement",
      groupLabel: service.kind === "private-driver" ? "Private vehicle" : service.product?.groupFormat === "private" ? "Private tour" : service.product?.groupFormat === "shared" ? "Shared tour" : "Confirm group size",
      includesLabel: service.product?.includesLabel || "Driver & vehicle",
      title: itinerary?.destination || service.provider.title,
      description: itinerary?.description || service.provider.summary,
      photo: itinerary?.photo || guidedTourPhotos[service.productId]!,
      format: service.kind === "private-driver" ? "Private transport · return to port" : `${guidedFormat} · return to port`,
    };
  });
}
