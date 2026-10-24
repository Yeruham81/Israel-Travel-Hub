import { attractionIds, type AttractionId, type Attraction } from "@/data/attractionGuideTypes";
import { jerusalemAttractions } from "@/data/attractionsJerusalem";
import { telAvivAttractions } from "@/data/attractionsTelAviv";
import { desertAttractions } from "@/data/attractionsDesert";
import { northernAttractions } from "@/data/attractionsNorth";
import { jerusalemAttractionUpdates } from "@/data/jerusalemClusterEditorial";
import { sacredHillOverrides, type SacredHillId } from "@/data/sacredHillGuides";
export const attractionGuides = {
  ...Object.fromEntries(Object.entries(jerusalemAttractions).map(([id, guide]) => [id, { ...guide, ...(jerusalemAttractionUpdates[id as AttractionId] || {}), ...(sacredHillOverrides[id as SacredHillId] || {}) }])),
  ...telAvivAttractions, ...desertAttractions, ...northernAttractions,
} as Record<AttractionId,Attraction>;
export { attractionIds };
