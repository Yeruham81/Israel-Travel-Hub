import type { LinkProps } from "@tanstack/react-router";
import type { GuidePhoto } from "@/data/travelGuides";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { travelGuidePaths, type ShorePortId } from "@/data/registry";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import roshHanikra from "@/assets/guides/rosh-hanikra.jpg";

export type ShoreReadingGuide = {
  title: string;
  description: string;
  to: LinkProps["to"];
  photo: GuidePhoto;
};

const guides = {
  jerusalem: {
    title: "Jerusalem's Old City",
    description: "Discover the holy sites, historic quarters and viewpoints. Plan a rewarding visit around the walking, steps and time available ashore.",
    to: "/attractions/old-city-jerusalem/",
    photo: migrationPhotos["EXISTING:jerusalem"],
  },
  telAviv: {
    title: "A day in Tel Aviv",
    description: "Make room for the seafront, markets and lively neighborhoods. Find practical advice for moving between city stops during a coastal day trip.",
    to: travelGuidePaths.telAviv,
    photo: airportTransferPhotos["tel-aviv"]!,
  },
  jaffa: {
    title: "Old Jaffa & its harbour",
    description: "Explore stone lanes, sea views and the flea-market area. Choose a few memorable stops and leave time to enjoy the atmosphere.",
    to: "/attractions/jaffa/",
    photo: { src: jaffa, alt: "Old Jaffa's historic buildings and harbour beside the Mediterranean", sourceUrl: "" },
  },
  masada: {
    title: "Masada: fortress & desert views",
    description: "Discover the ancient plateau above the Dead Sea. Understand the cable-car options, admission and practical planning for a desert excursion.",
    to: "/attractions/masada/",
    photo: migrationPhotos["EXISTING:masada"],
  },
  deadSea: {
    title: "Visiting the Dead Sea",
    description: "Plan a scenic stop or time at a designated beach. Learn what to consider about access, facilities and combining the coast with Masada.",
    to: travelGuidePaths.deadSea,
    photo: airportTransferPhotos["dead-sea"]!,
  },
  bethlehem: {
    title: "Bethlehem & the Nativity Church",
    description: "Explore the Church of the Nativity and Manger Square. Understand the arrangements to discuss before adding Bethlehem to a Jerusalem excursion.",
    to: travelGuidePaths.bethlehem,
    photo: migrationPhotos["jerusalem-to-bethlehem"],
  },
  haifa: {
    title: "Haifa: gardens, views & coast",
    description: "Discover the Bahá'í Gardens, German Colony and Carmel viewpoints. Build a local outing with less driving and more time near your ship.",
    to: "/travel-blog/haifa/",
    photo: airportTransferPhotos["haifa"]!,
  },
  akko: {
    title: "Akko's Old City & harbour",
    description: "Discover Crusader heritage, market lanes and the fishing harbour. Plan the walking route and admission choices for a day along the northern coast.",
    to: "/attractions/akko-acre/",
    photo: { src: akko, alt: "Fishing boats and historic buildings around Akko's harbour", sourceUrl: "", credit: "Akko harbour · publisher's original excursion photograph; retained unchanged" },
  },
  nazareth: {
    title: "Nazareth & the Annunciation",
    description: "Visit the Basilica of the Annunciation and discover its significance. Plan church access and combine Nazareth with selected Galilee sites.",
    to: travelGuidePaths.annunciation,
    photo: migrationPhotos["basilica-of-the-annunciation"],
  },
  galilee: {
    title: "Sea of Galilee highlights",
    description: "Explore the lakeside setting of Tiberias, Capernaum and Tabgha. Choose the heritage stops and landscapes that matter most to your party.",
    to: "/travel-blog/sea-of-galilee/",
    photo: migrationPhotos["EXISTING:galilee"],
  },
  roshHanikra: {
    title: "Rosh Hanikra & the grottoes",
    description: "Discover the white cliffs and sea caves of the northern coast. Check operating conditions before including the grottoes in your day ashore.",
    to: "/attractions/rosh-hanikra/",
    photo: { src: roshHanikra, alt: "Turquoise Mediterranean water inside the Rosh Hanikra grottoes", sourceUrl: "", credit: "Photograph from the publisher's Rosh Hanikra guide; retained unchanged" },
  },
} satisfies Record<string, ShoreReadingGuide>;

export const portShoreGuides: Record<ShorePortId, ShoreReadingGuide[]> = {
  ashdod: [guides.jerusalem, guides.telAviv, guides.jaffa, guides.masada, guides.deadSea, guides.bethlehem],
  haifa: [guides.haifa, guides.akko, guides.nazareth, guides.galilee, guides.roshHanikra, guides.jerusalem],
};

/** Short hub-only previews; retain detailed descriptions on individual port pages. */
export const shoreHubGuides: ShoreReadingGuide[] = [
  { ...guides.jerusalem, description: "Historic quarters, sacred sites and classic viewpoints." },
  { ...guides.galilee, description: "Lakeside heritage around Tiberias and Capernaum." },
  { ...guides.masada, description: "Ancient fortress, desert views and cable-car planning." },
  { ...guides.akko, description: "Historic harbour, market lanes and Crusader heritage." },
  { ...guides.jaffa, description: "Stone lanes, sea views and the old harbour." },
  { ...guides.deadSea, description: "Designated beaches, access and bathing tips." },
];
