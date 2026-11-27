import { guideDirectory, travelGuides } from "@/data/travelGuides";
import { attractionGuides } from "@/data/attractionGuides";
// The full editorial modules remain the sole source of truth.
export const snapshot = {
  guideDirectory,
  travelGuidePhotos: Object.fromEntries(
    Object.entries(travelGuides).map(([id, g]) => [id, g.photo]),
  ),
  attractionGuidePhotos: Object.fromEntries(
    Object.entries(attractionGuides).map(([id, g]) => [id, g.image ?? null]),
  ),
  travelGuideCardPhotos: Object.fromEntries(
    Object.entries(travelGuides).map(([id, g]) => [id, g.cardPhoto ?? g.photo]),
  ),
};
