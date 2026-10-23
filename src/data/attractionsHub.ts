import type { LinkProps } from "@tanstack/react-router";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionPath, type AttractionId } from "@/data/attractionGuideTypes";
import { travelGuides } from "@/data/travelGuides";
import { travelGuidePaths, type TravelGuideId } from "@/data/registry";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import caesareaPhoto from "@/assets/home/caesarea-dusk.webp";

export type AttractionHubCard = {
  id: string;
  title: string;
  description: string;
  to: LinkProps["to"];
  photo: { src: string; alt: string };
};
export type AttractionHubRegion = {
  id: string;
  title: string;
  summary: string;
  navLabel?: string;
  image: { src: string; alt: string; sourceFilename: string };
  cards: AttractionHubCard[];
  planning: { label: string; to: LinkProps["to"] }[];
};

export const attractionHubPhotos = {
  hero: { src: "/images/attractions/hero-jerusalem.webp", alt: "Jerusalem's ancient walls and skyline in daylight", sourceFilename: "skyline-jerusalem-panorama.webp" },
  olives: { src: "/images/attractions/mount-of-olives.webp", alt: "Mount of Olives and its hillside buildings overlooking Jerusalem", sourceFilename: "mount_of_olives__.jpg.webp" },
  jerusalem: { src: "/images/attractions/jerusalem.webp", alt: "View of Jerusalem's Old City and the Dome of the Rock", sourceFilename: "The_Old_City_of_Jerusalem_3.jpg.webp" },
  telAviv: { src: "/images/attractions/tel-aviv-jaffa.webp", alt: "Fishing boats and historic stone buildings in Jaffa harbour", sourceFilename: "jaffa1.jpg.webp" },
  haifa: { src: "/images/attractions/haifa-coast.webp", alt: "View across Haifa and its Mediterranean coastline", sourceFilename: "haifa_panorama_1.jpg.webp" },
  nazareth: { src: "/images/attractions/nazareth-galilee.webp", alt: "Religious art inside the Basilica of the Annunciation in Nazareth", sourceFilename: "courtyard_basilica_of_annunciation_.jpg.webp" },
  galilee: { src: "/images/attractions/sea-of-galilee.webp", alt: "Lake and green hills seen from above the Sea of Galilee", sourceFilename: "sea_of_galilee_panorama.webp" },
  deadSea: { src: "/images/attractions/dead-sea.webp", alt: "Bather in the shallow waters of the Dead Sea", sourceFilename: "dead-sea-israel.jpg.webp" },
  negev: { src: "/images/attractions/ramon-crater.webp", alt: "Clouds above the layered desert cliffs of Ramon Crater", sourceFilename: "clouds_at_ramon_crater.jpg.webp" },
  eilat: { src: "/images/attractions/eilat.webp", alt: "Visitors relaxing beside the Red Sea in Eilat", sourceFilename: "Eilat_Village_Beach.jpg.webp" },
  baptism: { src: "/images/attractions/jordan-river-baptism.webp", alt: "Pilgrims gathered for a baptism ceremony beside the Jordan River", sourceFilename: "pilgrims_baptism_jordan_river1.jpg.webp" },
  shopping: { src: "/images/attractions/jerusalem-shopping.webp", alt: "Shops and street life near Mahane Yehuda Market in Jerusalem", sourceFilename: "mahane_yehuda_jerusalem.webp" },
} as const;

const attraction = (id: AttractionId, title: string, description: string, fallback: string, photoOverride?: { src: string; alt: string }): AttractionHubCard => {
  const item = attractionGuides[id];
  return {
    id, title, description, to: attractionPath(id),
    photo: photoOverride ?? item.image ?? { src: fallback, alt: title },
  };
};
const guide = (id: TravelGuideId, title: string, description: string, photoOverride?: { src: string; alt: string }): AttractionHubCard => ({
  id, title, description, to: travelGuidePaths[id],
  photo: photoOverride ?? travelGuides[id].photo,
});

export const attractionHubRegions: AttractionHubRegion[] = [
  {
    id: "jerusalem",
    title: "Jerusalem",
    summary: "Wander Jerusalem’s ancient quarters, explore remarkable museums and sacred places, and discover atmospheric markets and local shopping streets.",
    image: attractionHubPhotos.jerusalem,
    cards: [
      attraction("old-city-jerusalem", "Jerusalem's Old City", "Quarters, historic gates, holy sites and practical walking advice.", attractionHubPhotos.jerusalem.src),
      attraction("mount-of-olives", "Mount of Olives", "Panoramic views, churches and historic pilgrimage sites.", attractionHubPhotos.jerusalem.src, attractionHubPhotos.olives),
      attraction("mount-zion", "Mount Zion", "Churches, the Last Supper tradition and places just outside the walls.", attractionHubPhotos.jerusalem.src),
      attraction("museums-in-jerusalem", "Museums in Jerusalem", "Choose between major collections, archaeology and city history.", attractionHubPhotos.jerusalem.src),
      guide("jerusalemChurches", "Churches in Jerusalem", "Key Christian landmarks, visiting etiquette and planning a route."),
      guide("jerusalemShopping", "Shopping in Jerusalem", "Mahane Yehuda, Old City markets, Mamilla and city shopping streets.", attractionHubPhotos.shopping),
    ],
    planning: [
      { label: "Jerusalem city guide", to: travelGuidePaths.jerusalem },
      { label: "Jerusalem tours", to: "/tours/jerusalem/" },
      { label: "Day trips from Jerusalem", to: travelGuidePaths.jerusalemDayTrips },
      { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
    ],
  },
  {
    id: "tel-aviv-jaffa",
    title: "Tel Aviv & Jaffa",
    summary: "Find your favourite beach for a day in the sun, explore Tel Aviv’s museums and neighbourhoods, and wander through Old Jaffa’s lively market lanes.",
    image: attractionHubPhotos.telAviv,
    cards: [
      attraction("attractions-in-tel-aviv", "Things to see in Tel Aviv", "Markets, neighbourhoods, architecture and favourite city sights.", attractionHubPhotos.telAviv.src),
      attraction("jaffa", "Old Jaffa", "Stone lanes, the harbour, flea market and historic landmarks.", attractionHubPhotos.telAviv.src),
      guide("telAvivBeaches", "Tel Aviv beaches", "Find a stretch of coast that suits your day by the sea."),
      guide("telAvivMuseums", "Museums in Tel Aviv", "Art, design, history and cultural collections around the city."),
    ],
    planning: [
      { label: "Tel Aviv & Jaffa tours", to: "/tours/tel-aviv-jaffa/" },
      { label: "Food & market tours", to: "/tours/food-market-tours/" },
      { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Getting around Tel Aviv", to: travelGuidePaths.telAviv },
      { label: "Day trips from Tel Aviv", to: travelGuidePaths.telAvivDayTrips },
      { label: "Airport to Tel Aviv: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
    ],
  },
  {
    id: "haifa-coast",
    title: "Haifa & the Mediterranean coast",
    summary: "Take in Haifa’s sweeping views, roam Acre’s old alleys, and discover Roman Caesarea and the sea grottoes at Rosh Hanikra.",
    navLabel: "Haifa & Coast",
    image: attractionHubPhotos.haifa,
    cards: [
      attraction("haifa", "Haifa", "Bahá'í Gardens, the German Colony, Mount Carmel and city viewpoints.", attractionHubPhotos.haifa.src),
      attraction("akko-acre", "Akko (Acre)", "Crusader halls, Ottoman streets, markets and a working harbour.", attractionHubPhotos.haifa.src),
      { id: "caesarea", title: "Caesarea National Park", description: "Roman ruins, an ancient harbour and archaeology beside the sea.", to: "/attractions/caesarea/", photo: { src: caesareaPhoto, alt: "Ruins and Mediterranean coast at Caesarea" } },
      attraction("rosh-hanikra", "Rosh Hanikra", "Sea grottoes, coastal cliffs and views near the Lebanese border.", attractionHubPhotos.haifa.src),
      guide("haifaMuseums", "Museums in Haifa", "Find art, science, maritime history and other collections."),
    ],
    planning: [
      { label: "Caesarea, Haifa & Acre tours", to: "/tours/caesarea-haifa-acre/" },
      { label: "Shore excursions from Haifa", to: "/haifa-shore-excursions/" },
      { label: "Hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Airport to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
    ],
  },
  {
    id: "nazareth-lower-galilee",
    title: "Nazareth & Galilee",
    summary: "Discover Nazareth’s historic churches, take in the views from Mount Tabor, and explore ancient Megiddo in the heart of Galilee.",
    image: attractionHubPhotos.nazareth,
    cards: [
      guide("annunciation", "Basilica of the Annunciation", "Explore Nazareth's major Christian landmark and its history."),
      attraction("mount-tabor", "Mount Tabor", "Church of the Transfiguration and views over the valley.", attractionHubPhotos.nazareth.src),
      guide("precipice", "Mount Precipice", "A lookout linked to Christian tradition just outside Nazareth."),
      guide("megiddo", "Tel Megiddo", "A major archaeological mound overlooking the Jezreel Valley."),
    ],
    planning: [
      { label: "Nazareth & Galilee tours", to: "/tours/nazareth-sea-of-galilee/" },
      { label: "Shore excursions from Haifa", to: "/haifa-shore-excursions/" },
      { label: "Explore the Sea of Galilee", to: "/travel-blog/sea-of-galilee/" },
      { label: "Private driver service", to: "/private-driver/" },
    ],
  },
  {
    id: "sea-of-galilee",
    title: "Sea of Galilee & the Jordan River",
    summary: "Follow the Sea of Galilee’s shore to ancient sites, lakeside churches and meaningful pilgrimage stops along the Jordan River.",
    navLabel: "Sea of Galilee & Jordan",
    image: attractionHubPhotos.galilee,
    cards: [
      attraction("sea-of-galilee", "Sea of Galilee", "Where to visit around the lake and how to plan your stops.", attractionHubPhotos.galilee.src),
      attraction("capernaum", "Capernaum", "Ancient synagogue remains and churches near the lake.", attractionHubPhotos.galilee.src),
      attraction("tabgha", "Tabgha", "Lakeside churches, mosaics and biblical traditions.", attractionHubPhotos.galilee.src),
      attraction("mount-of-beatitudes", "Mount of Beatitudes", "A peaceful hilltop church and lake panorama.", attractionHubPhotos.galilee.src),
      guide("magdala", "Magdala", "Archaeology and pilgrimage on the western shore."),
      guide("yardenit", "Yardenit", "Plan a visit to this Jordan River baptism site."),
      guide("baptism", "Jordan River baptism sites", "Compare Yardenit and Qasr el-Yahud before choosing a pilgrimage stop.", attractionHubPhotos.baptism),
    ],
    planning: [
      { label: "Nazareth & Sea of Galilee tours", to: "/tours/nazareth-sea-of-galilee/" },
      { label: "Getting around Israel", to: travelGuidePaths.israel },
      { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
    ],
  },
  {
    id: "dead-sea-masada",
    title: "Dead Sea & Masada",
    summary: "Float in the Dead Sea, explore Masada’s desert fortress, and find the springs, nature reserves and landscapes that make this region so distinctive.",
    image: attractionHubPhotos.deadSea,
    cards: [
      attraction("dead-sea-attractions", "Dead Sea attractions", "Swimming areas, desert landscapes and nearby stops.", attractionHubPhotos.deadSea.src),
      { id: "masada", title: "Masada National Park", description: "The mountain fortress, cable car, desert trails and visit planning.", to: "/travel-blog/masada/", photo: migrationPhotos["EXISTING:masada"] },
      attraction("ein-gedi", "Ein Gedi Nature Reserve", "Desert springs, wildlife and trail-access considerations.", attractionHubPhotos.deadSea.src),
      guide("qasr", "Qasr el-Yahud", "The Jordan River pilgrimage site near Jericho."),
    ],
    planning: [
      { label: "Masada & Dead Sea tours", to: "/tours/masada-dead-sea/" },
      { label: "Dead Sea visitor guide", to: travelGuidePaths.deadSea },
      { label: "Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea },
      { label: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Airport to Ein Bokek: all options", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
    ],
  },
  {
    id: "negev-eilat",
    title: "Negev Desert & Eilat",
    summary: "Take in the dramatic scenery of Ramon Crater, plan a stargazing escape, and enjoy Eilat’s Red Sea beaches and marine life.",
    navLabel: "Negev & Eilat",
    image: attractionHubPhotos.negev,
    cards: [
      attraction("mitzpe-ramon-crater", "Mitzpe Ramon & Ramon Crater", "Desert lookouts, geology, trails and stargazing.", attractionHubPhotos.negev.src),
      guide("eilat", "Eilat & the Red Sea", "Beaches, coral reef experiences and desert excursions.", attractionHubPhotos.eilat),
    ],
    planning: [
      { label: "Eilat & Red Sea tours", to: "/tours/eilat-red-sea/" },
      { label: "Travel around Israel", to: travelGuidePaths.israel },
      { label: "Rent a car", to: "/car-rental/" },
    ],
  },
];

export const attractionPlanningPaths: {
  id: string;
  title: string;
  description: string;
  to: LinkProps["to"];
  links: { label: string; to: LinkProps["to"] }[];
}[] = [
  {
    id: "tours",
    title: "Tours & day trips",
    description: "Discover guided city walks, archaeological sites and full-day excursions, with options for different interests and starting points.",
    to: "/tours/",
    links: [
      { label: "Jerusalem tours", to: "/tours/jerusalem/" },
      { label: "Masada & Dead Sea tours", to: "/tours/masada-dead-sea/" },
    ],
  },
  {
    id: "destinations",
    title: "Choose a destination",
    description: "Put together a visit around the places that interest you, with ideas for nearby sights and how to connect them.",
    to: "/destinations/",
    links: [
      { label: "Jerusalem guide", to: travelGuidePaths.jerusalem },
      { label: "Sea of Galilee guide", to: "/travel-blog/sea-of-galilee/" },
    ],
  },
  {
    id: "hotels",
    title: "Find the right place to stay",
    description: "Compare neighbourhoods, coastal resorts and hotel areas to find a practical base for sightseeing and day trips.",
    to: "/hotels/",
    links: [
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
    ],
  },
  {
    id: "transport",
    title: "Arrive and get around",
    description: "Make sense of airport journeys, trains, buses and taxis, including that last leg from the station to your hotel.",
    to: "/transfers/",
    links: [
      { label: "Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
      { label: "Getting around Israel", to: travelGuidePaths.israel },
    ],
  },
  {
    id: "private-days",
    title: "Explore with a private driver",
    description: "Build a flexible sightseeing day around your priorities and ask for a personal transport quote, with guiding arranged separately.",
    to: "/private-driver/",
    links: [
      { label: "Caesarea, Haifa & Acre", to: "/tours/caesarea-haifa-acre/" },
      { label: "Nazareth & Galilee tours", to: "/tours/nazareth-sea-of-galilee/" },
    ],
  },
  {
    id: "practical-guides",
    title: "Plan around dates and local customs",
    description: "Check seasonal conditions, religious holidays and public-transport patterns before setting your itinerary.",
    to: "/guides/",
    links: [
      { label: "Best time to visit", to: travelGuidePaths.bestTime },
      { label: "Airport travel on Shabbat", to: travelGuidePaths.shabbat },
    ],
  },
];

export const attractionHubCards = attractionHubRegions.flatMap((region) => region.cards);
