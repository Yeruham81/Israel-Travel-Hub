import { attractionIds, type AttractionId, type Attraction } from "@/data/attractionGuideTypes";
import { jerusalemAttractions } from "@/data/attractionsJerusalem";
import { telAvivAttractions } from "@/data/attractionsTelAviv";
import { desertAttractions } from "@/data/attractionsDesert";
import { northernAttractions } from "@/data/attractionsNorth";
export const attractionGuides = {
  ...jerusalemAttractions, ...telAvivAttractions, ...desertAttractions, ...northernAttractions,
} as Record<AttractionId,Attraction>;
export { attractionIds };
