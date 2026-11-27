import type { GuidePhoto } from "@/data/travelGuides";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { shoreExcursionRates, shorePorts, type ShorePortId } from "@/data/registry";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import ashdod from "@/assets/shore-excursions/ashdod-shore-excursions.webp";
import haifa from "@/assets/shore-excursions/haifa-shore-excursions.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import cableCar from "@/assets/home/masada-cable-car.webp";
import sepulchre from "@/assets/guides/holy-sepulchre.jpg";
import caesareaTheatre from "@/assets/home/caesarea-theatre.webp";
import roshHanikraGrottoes from "@/assets/home/rosh-hanikra-grottos.jpg";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { portShoreGuides, type ShoreReadingGuide } from "@/data/shoreReading";
import {
  filterShoreServices,
  shoreListedPrice,
  shoreListedRating,
  type ShoreServiceSearch,
} from "@/lib/shore-services";

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
  portAccess: { heading: string; paragraphs: string[]; source: { title: string; url: string } };
  routeFit: { route: string; goodFor: string; constraint: string }[];
};

const masadaPhoto: GuidePhoto = {
  src: masada,
  alt: "Masada's desert plateau and ancient fortress seen from the air",
  credit: "Godot13 · CC BY-SA 4.0 · resized WebP",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

/** Each published excursion has its own destination photograph, including across ports. */
const guidedTourPhotos: Record<string, GuidePhoto> = {
  "shore-gyg-haifa-akko": migrationPhotos["EXISTING:haifa"],
  "shore-gyg-haifa-galilee": migrationPhotos["basilica-of-the-annunciation"],
  "shore-viator-haifa-galilee": migrationPhotos["EXISTING:galilee"],
  "shore-viator-haifa-jerusalem-bethlehem": {
    src: bethlehem,
    alt: "Church of the Nativity and Manger Square in Bethlehem",
    credit: "Britchi Mirela · CC BY-SA 4.0 · resized WebP",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "shore-gyg-ashdod-jerusalem-bethlehem": migrationPhotos["jerusalem-to-bethlehem"],
  "shore-gyg-ashdod-galilee": migrationPhotos["annunciation-interior"],
  "shore-gyg-ashdod-masada": {
    src: cableCar,
    alt: "A cable car ascending toward the desert fortress of Masada",
    credit: "James Emery · CC BY 2.0 · resized WebP",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "shore-viator-ashdod-jerusalem-dead-sea": migrationPhotos["jerusalem-to-the-dead-sea"],
  "shore-viator-ashdod-jerusalem-bethlehem": {
    src: sepulchre,
    alt: "Courtyard and facade of the Church of the Holy Sepulchre in Jerusalem",
    sourceUrl: "",
    credit: "Photograph from the publisher's churches guide; retained unchanged.",
  },
  "shore-viator-ashdod-jerusalem-bethlehem-smallgroup": {
    src: "/images/jerusalem/mount-zion/dormition-abbey-and-bell-tower.webp",
    alt: "Dormition Abbey and bell tower on Jerusalem's Mount Zion",
    sourceUrl: "",
  },
  "shore-viator-ashdod-jerusalem-private": {
    src: "/images/attractions/hero-jerusalem.webp",
    alt: "Historic Old City of Jerusalem seen from an elevated viewpoint",
    sourceUrl: "",
  },
  "shore-viator-haifa-jerusalem-bethlehem-smallgroup": {
    src: "/images/jerusalem/church-of-all-nations.webp",
    alt: "Church of All Nations on Jerusalem's Mount of Olives",
    sourceUrl: "",
  },
  "shore-viator-haifa-jerusalem-private": {
    src: "/images/jerusalem/mount-of-olives/mary-magdalene-church.webp",
    alt: "Russian Orthodox Church of Mary Magdalene on Jerusalem's Mount of Olives",
    sourceUrl: "",
  },
  "shore-viator-haifa-caesarea-private": {
    src: caesareaTheatre,
    alt: "Roman theatre and ancient ruins at Caesarea on the Mediterranean coast",
    sourceUrl: "",
  },
  "shore-viator-haifa-galilee-private": {
    src: "/images/attractions/sea-of-galilee.webp",
    alt: "Sea of Galilee lake and hills of northern Israel",
    sourceUrl: "",
  },
  "shore-viator-haifa-akko-private": {
    src: roshHanikraGrottoes,
    alt: "White limestone cliffs and coastal grottoes at Rosh Hanikra",
    sourceUrl: "",
  },
  "shore-viator-ashdod-masada-dead-sea": {
    src: "/images/tours/masada-ruins.webp",
    alt: "Ancient fortress ruins atop Masada above the Judean Desert",
    sourceUrl: "",
  },
  "shore-viator-haifa-jerusalem-holy-city": {
    src: "/images/jerusalem/mount-zion/st-peter-in-gallicantu.webp",
    alt: "St Peter in Gallicantu church on Mount Zion in Jerusalem",
    sourceUrl: "",
  },
};

const itineraryDetails: Record<string, ItineraryDetails> = {
  "ashdod-tel-aviv": {
    photo: airportTransferPhotos["tel-aviv"]!,
    description:
      "Combine Old Jaffa's stone lanes and harbour with Tel Aviv's Mediterranean promenade. Visit a market, explore a local neighborhood or enjoy lunch by the beach.",
    bestFor: "Coastal scenery, city life and a gentler pace",
    planningNote:
      "This coastal trip involves less driving than the desert routes, leaving more time for walks and lunch ashore.",
    highlights: ["Old Jaffa", "Tel Aviv seafront", "Flexible city stops"],
  },
  "ashdod-jerusalem": {
    photo: {
      src: "/images/attractions/jerusalem.webp",
      alt: "Jerusalem Old City walls and historic skyline across the valley",
      sourceUrl: "",
    },
    description:
      "Explore Jerusalem's historic Old City, major religious landmarks and panoramic viewpoints. I'll customize your itinerary according to your interests, walking preferences and cruise schedule.",
    bestFor: "A first visit to Jerusalem's historic and religious heart",
    planningNote:
      "The Old City involves walking, steps and modest dress at holy sites. A licensed guide is a separate arrangement.",
    highlights: ["Old City", "Religious landmarks", "City viewpoints"],
  },
  "ashdod-masada": {
    photo: masadaPhoto,
    description:
      "Travel through the Judean Desert to Masada's ancient fortress and the Dead Sea, with time at each destination tailored to your preferences.",
    bestFor: "Desert landscapes, ancient history and Dead Sea time",
    planningNote:
      "A long return journey: confirm site opening, cable-car admission, beach or resort access and the time available at each stop.",
    highlights: ["Masada", "Judean Desert", "Dead Sea stop"],
  },
  "ashdod-masada-jerusalem": {
    photo: airportTransferPhotos["dead-sea"]!,
    description:
      "Combine selected Jerusalem landmarks with Masada and the Dead Sea on a customized excursion designed for longer port calls.",
    bestFor: "A long port call with carefully chosen highlights",
    planningNote:
      "Allow a long port call for this excursion. Agree on the main stops and leave enough time to return to the ship.",
    highlights: ["Masada", "Dead Sea", "Selected Jerusalem stops"],
  },
  "haifa-akko": {
    photo: {
      src: akko,
      alt: "Fishing boats and stone buildings around Akko's old harbour",
      sourceUrl: "",
      credit:
        "Akko harbour · image reused from the publisher's original Haifa excursion page; original JPEG retained",
    },
    description:
      "Explore Akko's historic Old City and harbor, with an optional visit to Rosh Hanikra subject to site access. Agree the actual stops and walking pace with your driver.",
    bestFor: "Old-town atmosphere and northern coastal scenery",
    planningNote:
      "Confirm that Rosh Hanikra is open and accessible on your date; discuss an alternative stop in northern Israel if needed.",
    highlights: ["Akko Old City", "Historic harbour", "Rosh Hanikra if accessible"],
  },
  "haifa-tel-aviv": {
    photo: {
      src: jaffa,
      alt: "Old Jaffa and its harbour beside the Mediterranean coast",
      sourceUrl: "",
    },
    description:
      "Discover Old Jaffa's historic streets, Tel Aviv's Mediterranean promenade and its distinctive architecture and neighborhoods. Pick a few priorities and leave room for traffic on the return to Haifa.",
    bestFor: "Urban culture, Jaffa and Mediterranean promenades",
    planningNote:
      "This route takes longer than nearby northern excursions. Allow time for walking, meals and any extra stops.",
    highlights: ["Old Jaffa", "Tel Aviv promenade", "City neighborhoods"],
  },
  "haifa-galilee": {
    photo: airportTransferPhotos["nazareth"]!,
    description:
      "Visit Nazareth's historic churches and explore your preferred religious landmarks and lakeside attractions around the Sea of Galilee.",
    bestFor: "Christian heritage and Galilee landscapes",
    planningNote:
      "Agree the precise sites, opening hours, admissions and walking needs. Licensed guiding should be arranged separately.",
    highlights: ["Nazareth", "Sea of Galilee", "Selected heritage sites"],
  },
  "haifa-jerusalem": {
    photo: {
      src: "/images/hotels/jerusalem-night.webp",
      alt: "Illuminated walls and historic skyline of Jerusalem Old City after dusk",
      sourceUrl: "",
    },
    description:
      "A full-day excursion to Jerusalem's Old City, sacred landmarks and panoramic viewpoints. Choose a few main sights and allow ample time to return before the ship's all-aboard deadline.",
    bestFor: "A Jerusalem priority on a sufficiently long port call",
    planningNote:
      "Confirm the full return plan before choosing this route. A Bethlehem visit and licensed guiding need separate arrangements.",
    highlights: ["Jerusalem Old City", "Chosen holy sites", "Viewpoint if time allows"],
  },
};

const sharedFaqs = [
  {
    q: "Is a licensed guide included?",
    a: "My service includes a private vehicle and driver. Licensed guiding and admission should be arranged separately. Guided excursions list their inclusions on the booking website.",
  },
  {
    q: "Can the itinerary be customized?",
    a: "Yes. I'll help customize your private excursion according to your preferred destinations, pace, site access and the time available ashore. Changes can alter the price.",
  },
  {
    q: "Can I request a van, child seats or an accessible vehicle?",
    a: "Include all passengers, children's ages, mobility needs and any equipment in the inquiry. Vans and minibuses are available by request, subject to confirmation. Confirm vehicle capacity and any child-seat reservations with the operator.",
  },
  {
    q: "Where will I meet the driver?",
    a: "Confirm your exact pickup point in writing before arriving at the port. Ask whether you need a terminal transfer or port shuttle to reach the driver.",
  },
  {
    q: "What happens if the ship is delayed or cancels the port call?",
    a: "Send any schedule change to the operator promptly. Ask for written confirmation of the cancellation cutoff, any deposit refund, missed-call policy and revised itinerary. Other operators have their own terms. Agree a revised return plan if the port schedule changes.",
  },
  {
    q: "How do I request your car-and-driver day trip?",
    a: "Choose your itinerary and send the form with your ship, date, hours ashore and group size. I will reply personally to confirm the arrangements.",
  },
];

const portDetails: Record<ShorePortId, PortDetails> = {
  ashdod: {
    title: "Ashdod shore excursions: tours & private day trips",
    description:
      "Compare shore excursions from Ashdod Port to Jerusalem, Tel Aviv, Jaffa, Masada and the Dead Sea, with guided tours or a private driver and port return.",
    intro:
      "From Ashdod Port, my recommended day trips include Tel Aviv and Jaffa, Jerusalem's historic and religious landmarks, and the desert landscapes of Masada and the Dead Sea. I'll help you plan your excursion around your disembarkation time and your ship's all-aboard deadline.",
    answer:
      "A private car and driver lets you agree the stops and walking pace; licensed guiding and admission are separate unless stated. Guided tours follow the operator's published itinerary and inclusions. Before booking any option, verify its Ashdod Port meeting point, return arrangements and fit with your ship's deadline.",
    photo: { src: ashdod, alt: "Cruise ships alongside the quays at Ashdod Port", sourceUrl: "" },
    overview: [
      "Ashdod is a convenient starting point for excursions to the coast, Jerusalem and the Judean Desert. Visit Tel Aviv and Jaffa for Mediterranean scenery, markets and coastal walks, or Jerusalem for historic and religious landmarks. Masada and the Dead Sea add a longer desert drive, so choose them for a port call that leaves enough time for the return.",
      "Choose the attractions you'd most like to visit and allow enough time to return to your ship.",
    ],
    faqs: [
      {
        q: "Which excursion suits a shorter Ashdod port call?",
        a: "For a shorter port call, I recommend Tel Aviv and Jaffa or an excursion along the nearby Mediterranean coast. Share your expected time off the ship and all-aboard deadline to allow for the return journey.",
      },
      {
        q: "Can I combine Jerusalem, Masada and the Dead Sea?",
        a: "Visiting all three destinations requires a long day with considerable driving. Send me your ship's schedule and preferred stops so I can help plan a suitable itinerary. For shorter port calls, focus on one or two destinations.",
      },
      ...sharedFaqs,
    ],
    related: portShoreGuides.ashdod,
    alternativeSourceId: "beinharim-ashdod-jlm-bethlehem",
    portAccess: {
      heading: "Ashdod Port: arrange the meeting point before disembarking",
      paragraphs: [
        "Ashdod is a secure commercial port with controlled passenger access. The port's passenger guidance restricts walking within the port and ordinary private-vehicle entry. For a visiting cruise ship, follow your cruise line's current instructions about any internal shuttle and the authorized shore-excursion meeting area.",
        "When arranging an independent driver, share the ship's name, disembarkation instructions and all-aboard deadline. Confirm whether the pickup is inside an authorized area or outside the port after a shuttle. Agree the exact meeting point with your driver.",
      ],
      source: {
        title: "Ashdod Port - passenger and cruise access guidance",
        url: "https://www.ashdodport.co.il/english/aboutashdodport/pages/passengers-cruises.aspx",
      },
    },
    routeFit: [
      {
        route: "Tel Aviv and Old Jaffa",
        goodFor: "A city-and-coast day with flexibility for lunch and shorter walks",
        constraint:
          "Allow time to explore Old Jaffa's narrow streets on foot and for traffic on the return journey.",
      },
      {
        route: "Jerusalem",
        goodFor: "Travelers prioritizing one or two historic or religious sites",
        constraint:
          "Allow time for walking through the Old City and queuing at popular religious sites.",
      },
      {
        route: "Masada and the Dead Sea",
        goodFor: "A long call dedicated to desert scenery and a limited number of stops",
        constraint:
          "Plan your visit around Masada's last admission and cable-car hours, leaving enough time for the Dead Sea beach and your return to Ashdod.",
      },
    ],
  },
  haifa: {
    title: "Haifa shore excursions: tours & private day trips",
    description:
      "Compare Haifa Port shore excursions to Akko, Nazareth, Galilee, Tel Aviv and Jerusalem, with guided tours or a private driver and confirmed return.",
    intro:
      "From Haifa Port, I recommend exploring historic Akko, Nazareth's churches and the scenic shores of the Sea of Galilee. For longer port calls, Jerusalem and Tel Aviv are also possible day-trip destinations. Choose an itinerary that fits the time you have ashore and your ship's all-aboard deadline.",
    answer:
      "Akko generally allows more time near Haifa than a long-distance Jerusalem day. Choose a private driver for flexibility or a guided tour if you'd like to learn more about the history of the places you visit. Confirm guiding, admission, the port meeting point and the return policy in the specific offer.",
    photo: {
      src: haifa,
      alt: "Cruise ship at Haifa Port with the city skyline at dusk",
      sourceUrl: "",
    },
    overview: [
      "Choose a northern route to spend more of your day exploring Akko, the Galilee or the Carmel. Explore Akko's historic harbour and markets, or visit Nazareth's churches and the beautiful shores of the Sea of Galilee.",
      "If adding Rosh Hanikra, verify current site access before including it in the itinerary. For Jerusalem or Tel Aviv, account for the long return drive before deciding how many stops fit.",
    ],
    faqs: [
      {
        q: "Which excursion is closest to Haifa?",
        a: "Haifa, Akko and the nearby northern coast offer more sightseeing time and shorter journeys from Haifa Port.",
      },
      {
        q: "Is Rosh Hanikra definitely included?",
        a: "Rosh Hanikra is included in one of the suggested itineraries, subject to opening hours and access restrictions. Ask the operator to confirm the stop and a suitable alternative before booking.",
      },
      {
        q: "Can I visit Jerusalem from Haifa Port?",
        a: "Yes. A day trip to Jerusalem is possible, but involves a long drive in each direction. Choose a few main attractions in Jerusalem and allow plenty of time to return to Haifa Port. Bethlehem and licensed guiding need separate arrangements.",
      },
      ...sharedFaqs,
    ],
    related: portShoreGuides.haifa,
    alternativeSourceId: "beinharim-haifa-jlm-bethlehem",
    portAccess: {
      heading: "Haifa Port: the pedestrian bridge and the driver meeting point",
      paragraphs: [
        "Haifa Port's public passenger-terminal entrance connects to downtown by a pedestrian-only bridge near 65 HaAtsmaut Street, close to Haifa Center HaShmona railway station. Confirm your driver's meeting point for your ship and port access arrangements.",
        "Follow your ship’s disembarkation instructions and agree the meeting point and return time with your driver.",
      ],
      source: {
        title: "Haifa Port - passenger terminal and downtown access",
        url: "https://www.haifaport.co.il/en/terminal/",
      },
    },
    routeFit: [
      {
        route: "Akko (Acre) and Haifa",
        goodFor: "More sightseeing time close to the northern port",
        constraint:
          "Explore Akko's historic streets on foot. Check whether Rosh Hanikra is open before adding it to your itinerary.",
      },
      {
        route: "Nazareth and Sea of Galilee",
        goodFor: "Christian heritage with selected northern landscape stops",
        constraint:
          "Choose a few churches and lakeside stops to allow time for travel between them.",
      },
      {
        route: "Jerusalem or Tel Aviv–Jaffa",
        goodFor: "Ideal for longer port calls when Jerusalem or Tel Aviv is your main priority",
        constraint:
          "The long southbound journey reduces time at the destination; choose your main attractions and allow enough time to return to the ship.",
      },
    ],
  },
};

export const shoreExcursionBenefits = [
  {
    title: "A private vehicle for your group",
    text: "Travel with your own group in a vehicle suited to all passengers.",
  },
  {
    title: "A route around your interests",
    text: "Share the places that matter most, walking preferences and time for breaks.",
  },
  {
    title: "An itinerary tailored to your cruise schedule",
    text: "Agree pickup, realistic stops and the return buffer before confirming.",
  },
  {
    title: "Personal coordination",
    text: "Discuss the details directly with me, including family and mobility requests.",
  },
];

export function getShorePort(id: ShorePortId) {
  return {
    id,
    ...shorePorts[id],
    ...portDetails[id],
    itineraries: shoreExcursionRates
      .filter((rate) => rate.portId === id)
      .map((rate) => ({ ...rate, ...itineraryDetails[rate.id]! })),
  };
}

/** Editorial display details are separate from registry products and booking links. */
export function getShoreCatalog(portId: ShorePortId, filters: ShoreServiceSearch = {}) {
  const port = getShorePort(portId);
  return filterShoreServices(portId, filters)
    .sort((a, b) => {
      // Reviewed + priced listings first, then reviewed-only, priced-only and finally unverified listings.
      if (Boolean(a.partner) !== Boolean(b.partner))
        return Number(Boolean(b.partner)) - Number(Boolean(a.partner));
      if (!a.partner || !b.partner) return 0;
      const aRating = shoreListedRating(a.product);
      const bRating = shoreListedRating(b.product);
      const aPrice = shoreListedPrice(a.product);
      const bPrice = shoreListedPrice(b.product);
      const aScore = Number(Boolean(aRating)) * 2 + Number(Boolean(aPrice));
      const bScore = Number(Boolean(bRating)) * 2 + Number(Boolean(bPrice));
      if (aScore !== bScore) return bScore - aScore;
      if (aRating?.value !== bRating?.value) return (bRating?.value || 0) - (aRating?.value || 0);
      if (aRating?.count !== bRating?.count) return (bRating?.count || 0) - (aRating?.count || 0);
      return a.id.localeCompare(b.id);
    })
    .map((service) => {
      const itinerary = port.itineraries.find((item) => item.id === service.itineraryId);
      const guidedFormat =
        service.product?.groupFormat === "private"
          ? "Private guided excursion"
          : service.product?.groupFormat === "shared"
            ? "Shared guided excursion"
            : "Guided excursion";
      return {
        ...service,
        itinerary,
        listedPrice: shoreListedPrice(service.product),
        rating: shoreListedRating(service.product),
        duration: service.product?.durationLabel || "Full day",
        groupLabel:
          service.kind === "private-driver"
            ? "Private vehicle"
            : service.product?.groupFormat === "private"
              ? "Private tour"
              : service.product?.groupFormat === "shared"
                ? "Shared tour"
                : "Confirm group size",
        includesLabel: service.product?.includesLabel || "Driver & vehicle",
        title: itinerary?.destination || service.provider.title,
        description: itinerary?.description || service.provider.summary,
        photo: itinerary?.photo || guidedTourPhotos[service.productId]!,
        format:
          service.kind === "private-driver"
            ? "Private transport · return to port"
            : `${guidedFormat} · return to port`,
      };
    });
}
