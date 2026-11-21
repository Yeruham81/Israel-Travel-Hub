import type { LinkProps } from "@tanstack/react-router";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import { jaffaSite } from "@/data/jaffaSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionPath, type AttractionId } from "@/data/attractionGuideTypes";
import { travelGuides, type GuidePhoto } from "@/data/travelGuides";
import { travelGuidePaths, type TravelGuideId } from "@/data/registry";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import caesareaPhoto from "@/assets/home/caesarea-dusk.webp";
import telAvivMain from "@/assets/home/tel-aviv-coast.webp";
import { einGediCardPhoto } from "@/data/einGediCardPhoto";
import deadSeaBeachCard from "@/assets/dead-sea/beach-card.webp";
import galileeLakeCard from "@/assets/home/tiberias-lake-tile.webp";

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
    photo: id === "old-city-jerusalem" ? oldCityJerusalemSite.hero : id === "jaffa" ? jaffaSite.hero : item.image ?? photoOverride ?? { src: fallback, alt: title },
  };
};
const editorialAttraction = (id: TravelGuideId, title: string, description: string, photoOverride?: { src: string; alt: string }): AttractionHubCard => ({
  id, title, description, to: travelGuidePaths[id],
  photo: travelGuides[id].photo,
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
    summary: "Discover Haifa's hillside gardens and city neighbourhoods alongside the ancient streets of Akko, Roman Caesarea and the sea grottoes of Rosh Hanikra.",
    navLabel: "Haifa & Coast",
    image: attractionHubPhotos.haifa,
    cards: [
      attraction("haifa", "Haifa: City Attractions", "Bahá’í Gardens, Carmel lookouts, markets, historic districts and beaches.", attractionHubPhotos.haifa.src, { src: "/images/home/transfer-haifa-bahai-gardens.webp", alt: "The terraced Bahá’í Gardens overlooking Haifa" }),
      attraction("akko-acre", "Akko (Acre)", "Crusader halls, Ottoman streets, markets and a working harbour.", attractionHubPhotos.haifa.src),
      { id: "caesarea", title: "Caesarea National Park", description: "Roman ruins, an ancient harbour and archaeology beside the sea.", to: "/attractions/caesarea/", photo: { src: caesareaPhoto, alt: "Ruins and Mediterranean coast at Caesarea" } },
      attraction("rosh-hanikra", "Rosh Hanikra", "Sea grottoes, coastal cliffs and views near the Lebanese border.", attractionHubPhotos.haifa.src),
    ],
    relatedGuides: [
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
    summary: "Explore the lake itself, choose a supervised beach, and visit Capernaum, Tabgha, Magdala and Yardenit.",
    navLabel: "Sea of Galilee & Jordan",
    image: attractionHubPhotos.galilee,
    cards: [
      { id: "sea-of-galilee", title: "The Sea of Galilee", description: "Lake Kinneret, supervised beaches, Tiberias, boats and practical day planning.", to: "/attractions/sea-of-galilee/", photo: { src: galileeLakeCard, alt: "The Sea of Galilee with the surrounding hills" } },
      attraction("capernaum", "Capernaum", "Explore the ancient synagogue, Peter’s house and lakeside ruins.", attractionHubPhotos.galilee.src),
      attraction("tabgha", "Tabgha", "Lakeside churches, mosaics and biblical traditions.", attractionHubPhotos.galilee.src),
      attraction("mount-of-beatitudes", "Mount of Beatitudes", "A peaceful hilltop church and lake panorama.", attractionHubPhotos.galilee.src),
      editorialAttraction("magdala", "Magdala", "Archaeology and pilgrimage on the western shore."),
      editorialAttraction("yardenit", "Yardenit", "Plan a visit to this Jordan River baptism site."),
    ],
    relatedGuides: [
      { label: "Hotels and visitor base in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      { label: "Jordan River baptism sites", to: travelGuidePaths.baptism },
    ],
  },
  {
    id: "dead-sea-masada",
    title: "Dead Sea & Masada",
    summary: "Float at the Dead Sea’s free public beaches, explore Masada’s desert fortress and discover Ein Gedi’s oasis and trails.",
    image: attractionHubPhotos.deadSea,
    cards: [
      { id: "dead-sea", title: "The Dead Sea", description: "Free public beaches, effortless floating, safety tips and practical visit planning.", to: "/attractions/dead-sea/", photo: { src: deadSeaBeachCard, alt: "Saltwater beach and desert shoreline at the Dead Sea" } },
      { id: "masada", title: "Masada National Park", description: "The mountain fortress, cable car, desert trails and visit planning.", to: "/attractions/masada/", photo: migrationPhotos["EXISTING:masada"] },
      attraction("ein-gedi", "Ein Gedi Nature Reserve", "Desert springs, wildlife and trail-access considerations.", einGediCardPhoto.src, einGediCardPhoto),
      editorialAttraction("qasr", "Qasr el-Yahud", "The Jordan River pilgrimage site near Jericho."),
    ],
    relatedGuides: [
      { label: "Things to see around the Dead Sea", to: "/travel-blog/dead-sea-attractions/" },
      { label: "Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea },
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

export const attractionRelatedGuides: {
  title: string;
  description: string;
  to: LinkProps["to"];
  photo: GuidePhoto;
}[] = [
  {
    title: "Jerusalem travel guide",
    description: "Old City highlights, neighbourhoods and memorable viewpoints.",
    to: travelGuidePaths.jerusalem,
    photo: travelGuides.jerusalem.photo,
  },
  {
    title: "Discover Tel Aviv & Jaffa",
    description: "A lively coast, historic lanes, markets and city culture.",
    to: "/travel-blog/attractions-in-tel-aviv/",
    photo: {src: telAvivMain, alt: "Tel Aviv skyline and Mediterranean beachfront"},
  },
  {
    title: "Haifa visitor guide",
    description: "Gardens, hilltop views and northern coastal experiences.",
    to: "/attractions/haifa/",
    photo: attractionGuides.haifa.image!,
  },
  {
    title: "Sea of Galilee travel guide",
    description: "Lakeside towns, heritage sites and beautiful scenery.",
    to: "/attractions/sea-of-galilee/",
    photo: attractionGuides["sea-of-galilee"].image!,
  },
  {
    title: "Explore the Dead Sea",
    description: "Saltwater beaches, desert landscapes and nearby sights.",
    to: travelGuidePaths.deadSea,
    photo: travelGuides.deadSea.photo,
  },
  {
    title: "Eilat & the Red Sea",
    description: "Beaches, coral reefs and adventures in the desert.",
    to: travelGuidePaths.eilat,
    photo: travelGuides.eilat.photo,
  },
];

export const attractionPlanningPaths: {
  id: "transport" | "seasons" | "hotels" | "tips" | "calendar" | "esim";
  title: string;
  description: string;
  to: LinkProps["to"];
}[] = [
  { id: "transport", title: "Getting around Israel", description: "Trains, buses, taxis and travel between cities.", to: travelGuidePaths.israel },
  { id: "seasons", title: "Best time to visit", description: "Weather, seasons and planning your sightseeing.", to: travelGuidePaths.bestTime },
  { id: "hotels", title: "Where to stay", description: "Find a convenient base for exploring Israel.", to: "/accommodation/" },
  { id: "tips", title: "Israel travel tips", description: "Helpful advice before and during your visit.", to: travelGuidePaths.travelTips },
  { id: "calendar", title: "Israel holidays & events", description: "Check local festivals and special dates.", to: travelGuidePaths.calendar },
  { id: "esim", title: "Travel eSIM for Israel", description: "Stay connected during your trip.", to: travelGuidePaths.esim },
];

export const attractionHubCards = attractionHubRegions.flatMap((region) => region.cards);
