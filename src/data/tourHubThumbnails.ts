import type { TourCategoryId } from "@/data/tours";
import jerusalem from "@/assets/home/jerusalem-old-city-card.webp";
import telAviv from "@/assets/home/tel-aviv-coast-card.webp";
import masada from "@/assets/home/masada-dead-sea-card.webp";
import bethlehem from "@/assets/guides/2026-10/jerusalem-to-bethlehem-mobile.webp";
import galilee from "@/assets/home/tiberias-lake-card.webp";
import caesarea from "@/assets/airport-transfers/caesarea-hub.webp";
import ramon from "@/assets/tours-hub/ramon-crater.webp";
import golan from "@/assets/tours-hub/golan-heights.webp";
import food from "@/assets/tours-hub/food-markets.webp";
import eilat from "@/assets/airport-transfers/eilat-hub.webp";

/** Photos served only in the compact /tours/ hub cards.
 * Destination-page editorial photos, credits and original crops are unchanged.
 */
export const tourHubThumbnailSources: Record<TourCategoryId, string> = {
  jerusalem,
  "tel-aviv-jaffa": telAviv,
  "masada-dead-sea": masada,
  "bethlehem-jericho": bethlehem,
  "nazareth-galilee": galilee,
  "northern-coast": caesarea,
  "negev-ramon": ramon,
  "golan-heights": golan,
  "food-markets": food,
  "eilat-red-sea": eilat,
};
