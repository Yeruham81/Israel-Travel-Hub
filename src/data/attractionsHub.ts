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
  /** Quiet, editorially related reading below the attraction cards; never transport, hotels or tours. */
  relatedGuides: { label: string; to: LinkProps["to"] }[];
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
const editorialAttraction = (id: TravelGuideId, title: string, description: string, photoOverride?: { src: string; alt: string }): AttractionHubCard => ({
  id, title, description, to: travelGuidePaths[id],
  photo: photoOverride ?? travelGuides[id].photo,
});

export const attractionHubRegions: AttractionHubRegion[] = [
  {
    id: "jerusalem",
    title: "Jerusalem",
    summary: "Wander Jerusalem’s Old City, take in the views from the Mount of Olives, and discover the historic landmarks of Mount Zion.",
    image: attractionHubPhotos.jerusalem,
    cards: [
      attraction("old-city-jerusalem", "Jerusalem's Old City", "Quarters, historic gates, holy sites and practical walking advice.", attractionHubPhotos.jerusalem.src),
      attraction("mount-of-olives", "Mount of Olives", "Panoramic views, churches and historic pilgrimage sites.", attractionHubPhotos.jerusalem.src, attractionHubPhotos.olives),
      attraction("mount-zion", "Mount Zion", "Churches, the Last Supper tradition and places just outside the walls.", attractionHubPhotos.jerusalem.src),
    ],
    relatedGuides: [
      { label: "Churches in Jerusalem", to: travelGuidePaths.jerusalemChurches },
      { label: "Museums in Jerusalem", to: "/travel-blog/museums-in-jerusalem/" },
      { label: "Shopping in Jerusalem", to: travelGuidePaths.jerusalemShopping },
    ],
  },
  {
    id: "tel-aviv-jaffa",
    title: "Tel Aviv & Jaffa",
    summary: "Wander Old Jaffa’s stone lanes, explore its historic harbour, and browse the colourful flea market beside the Mediterranean.",
    image: attractionHubPhotos.telAviv,
    cards: [
      attraction("jaffa", "Old Jaffa", "Stone lanes, the harbour, flea market and historic landmarks.", attractionHubPhotos.telAviv.src),
    ],
    relatedGuides: [
      { label: "Things to see in Tel Aviv", to: "/travel-blog/attractions-in-tel-aviv/" },
      { label: "Beaches in Tel Aviv", to: travelGuidePaths.telAvivBeaches },
      { label: "Museums in Tel Aviv", to: travelGuidePaths.telAvivMuseums },
    ],
  },
  {
    id: "haifa-coast",
    title: "Haifa & the Mediterranean coast",
    summary: "Discover the ancient streets of Akko, the Roman ruins of Caesarea and the dramatic sea grottoes of Rosh Hanikra.",
    navLabel: "Haifa & Coast",
    image: attractionHubPhotos.haifa,
    cards: [
      attraction("akko-acre", "Akko (Acre)", "Crusader halls, Ottoman streets, markets and a working harbour.", attractionHubPhotos.haifa.src),
      { id: "caesarea", title: "Caesarea National Park", description: "Roman ruins, an ancient harbour and archaeology beside the sea.", to: "/attractions/caesarea/", photo: { src: caesareaPhoto, alt: "Ruins and Mediterranean coast at Caesarea" } },
      attraction("rosh-hanikra", "Rosh Hanikra", "Sea grottoes, coastal cliffs and views near the Lebanese border.", attractionHubPhotos.haifa.src),
    ],
    relatedGuides: [
      { label: "Haifa visitor guide", to: "/travel-blog/haifa/" },
      { label: "Museums in Haifa", to: travelGuidePaths.haifaMuseums },
    ],
  },
  {
    id: "nazareth-lower-galilee",
    title: "Nazareth & Galilee",
    summary: "Discover Nazareth’s Basilica of the Annunciation, take in views from Mount Tabor and Mount Precipice, and explore ancient Tel Megiddo.",
    image: attractionHubPhotos.nazareth,
    cards: [
      editorialAttraction("annunciation", "Basilica of the Annunciation", "Explore Nazareth's major Christian landmark and its history."),
      attraction("mount-tabor", "Mount Tabor", "Church of the Transfiguration and views over the valley.", attractionHubPhotos.nazareth.src),
      editorialAttraction("precipice", "Mount Precipice", "A lookout linked to Christian tradition just outside Nazareth."),
      editorialAttraction("megiddo", "Tel Megiddo", "A major archaeological mound overlooking the Jezreel Valley."),
    ],
    relatedGuides: [],
  },
  {
    id: "sea-of-galilee",
    title: "Sea of Galilee & the Jordan River",
    summary: "Follow the lakeshore to Capernaum, Tabgha and Magdala, then visit the Mount of Beatitudes and Yardenit by the Jordan River.",
    navLabel: "Sea of Galilee & Jordan",
    image: attractionHubPhotos.galilee,
    cards: [
      attraction("capernaum", "Capernaum", "Explore the ancient synagogue, Peter’s house and lakeside ruins.", attractionHubPhotos.galilee.src),
      attraction("tabgha", "Tabgha", "Lakeside churches, mosaics and biblical traditions.", attractionHubPhotos.galilee.src),
      attraction("mount-of-beatitudes", "Mount of Beatitudes", "A peaceful hilltop church and lake panorama.", attractionHubPhotos.galilee.src),
      editorialAttraction("magdala", "Magdala", "Archaeology and pilgrimage on the western shore."),
      editorialAttraction("yardenit", "Yardenit", "Plan a visit to this Jordan River baptism site."),
    ],
    relatedGuides: [
      { label: "Sea of Galilee visitor guide", to: "/travel-blog/sea-of-galilee/" },
      { label: "Jordan River baptism sites", to: travelGuidePaths.baptism },
    ],
  },
  {
    id: "dead-sea-masada",
    title: "Dead Sea & Masada",
    summary: "Discover Masada’s desert fortress, the springs and trails of Ein Gedi, and the Jordan River pilgrimage site of Qasr el-Yahud.",
    image: attractionHubPhotos.deadSea,
    cards: [
      { id: "masada", title: "Masada National Park", description: "The mountain fortress, cable car, desert trails and visit planning.", to: "/attractions/masada/", photo: migrationPhotos["EXISTING:masada"] },
      attraction("ein-gedi", "Ein Gedi Nature Reserve", "Desert springs, wildlife and trail-access considerations.", attractionHubPhotos.deadSea.src),
      editorialAttraction("qasr", "Qasr el-Yahud", "The Jordan River pilgrimage site near Jericho."),
    ],
    relatedGuides: [
      { label: "Things to see around the Dead Sea", to: "/travel-blog/dead-sea-attractions/" },
      { label: "Dead Sea visitor guide", to: travelGuidePaths.deadSea },
    ],
  },
  {
    id: "negev-eilat",
    title: "Negev Desert & Eilat",
    summary: "Take in the vast landscapes and viewpoints of Ramon Crater, with desert trails and stargazing opportunities near Mitzpe Ramon.",
    navLabel: "Negev & Eilat",
    image: attractionHubPhotos.negev,
    cards: [
      attraction("mitzpe-ramon-crater", "Mitzpe Ramon & Ramon Crater", "Desert lookouts, geology, trails and stargazing.", attractionHubPhotos.negev.src),
    ],
    relatedGuides: [
      { label: "Eilat & the Red Sea guide", to: travelGuidePaths.eilat },
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
    id: "shore-excursions",
    title: "Shore excursions",
    description: "Arriving by cruise ship? Find day-trip ideas from Haifa or Ashdod that fit your port call, with enough time for your return to the ship.",
    to: "/shore-excursions/",
    links: [
      { label: "From Haifa Port", to: "/shore-excursions/haifa/" },
      { label: "From Ashdod Port", to: "/shore-excursions/ashdod/" },
    ],
  },
  {
    id: "hotels",
    title: "Find the right place to stay",
    description: "Compare neighbourhoods, coastal resorts and hotel areas to find a practical base for sightseeing and day trips.",
    to: "/accommodation/",
    links: [
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
    ],
  },
  {
    id: "transport",
    title: "Arrive and get around",
    description: "Make sense of airport journeys, trains, buses and taxis, including that last leg from the station to your hotel.",
    to: "/airport-transfers/",
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
    to: "/travel-blog/",
    links: [
      { label: "Best time to visit", to: travelGuidePaths.bestTime },
      { label: "Airport travel on Shabbat", to: travelGuidePaths.shabbat },
    ],
  },
];

export const attractionHubCards = attractionHubRegions.flatMap((region) => region.cards);
