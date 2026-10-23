import type { TourCategoryId } from "@/data/tours";

export type AttractionRegionLink = { hash: string; label: string };

/** Stable in-page targets within /attractions/. Keep in sync with the hub sections. */
export const regionalAttractionLinks = {
  jerusalem: { hash: "jerusalem", label: "Jerusalem" },
  telAviv: { hash: "tel-aviv-jaffa", label: "Tel Aviv & Jaffa" },
  coast: { hash: "haifa-coast", label: "Haifa & the coast" },
  nazareth: { hash: "nazareth-lower-galilee", label: "Nazareth & Galilee" },
  lake: { hash: "sea-of-galilee", label: "Sea of Galilee & Jordan River" },
  deadSea: { hash: "dead-sea-masada", label: "Dead Sea & Masada" },
  negev: { hash: "negev-eilat", label: "Negev & Eilat" },
} as const satisfies Record<string, AttractionRegionLink>;

export const attractionRegionsForTours: Partial<Record<TourCategoryId, readonly AttractionRegionLink[]>> = {
  jerusalem: [regionalAttractionLinks.jerusalem],
  "tel-aviv-jaffa": [regionalAttractionLinks.telAviv],
  "northern-coast": [regionalAttractionLinks.coast],
  "nazareth-galilee": [regionalAttractionLinks.nazareth, regionalAttractionLinks.lake],
  "masada-dead-sea": [regionalAttractionLinks.deadSea],
  "eilat-red-sea": [regionalAttractionLinks.negev],
  "food-markets": [regionalAttractionLinks.jerusalem, regionalAttractionLinks.telAviv],
  // Bethlehem / Jericho has no matching Attractions region; avoid a misleading link.
};

