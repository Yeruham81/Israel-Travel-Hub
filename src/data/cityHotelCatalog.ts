/** One source of truth for the city galleries and their neighborhood hotel cards.
 * New hotels are added to the city galleries as soon as they appear in an area guide.
 * Existing approved Expedia partner links are managed separately in registry.ts.
 */
import { jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { hotelsForArea, type HotelRecommendation } from "@/data/registry";
import { jerusalemHotelPhotos } from "@/data/jerusalemHotelPhotos";
import { telAvivHotelPhotos, type HotelIllustration } from "@/data/telAvivHotelPhotos";
import { supplementalHotelPhotos } from "@/data/supplementalHotelPhotos";

type CatalogCity = "jerusalem" | "telaviv";

function areaGuides(cityId: CatalogCity) {
  return cityId === "jerusalem" ? jerusalemAreaGuides : telAvivAreaGuides;
}

function photoLibrary(cityId: CatalogCity): Record<string, HotelIllustration> {
  return cityId === "jerusalem" ? jerusalemHotelPhotos : telAvivHotelPhotos;
}

/** Every property offered on a city's neighborhood pages, in area order. */
export function hotelsInCityCatalog(cityId: CatalogCity): HotelRecommendation[] {
  return areaGuides(cityId).flatMap((area) => hotelsForArea(area.id, cityId));
}

/** One dedicated photo per hotel, shared between its city and neighborhood cards.
 * No modulo-based fallback that reuses another hotel's illustration.
 * All photographic scenes are explicitly illustrative, not actual hotel photos.
 */
export function cityHotelPhoto(hotel: HotelRecommendation): HotelIllustration {
  if (hotel.cityId !== "jerusalem" && hotel.cityId !== "telaviv") {
    throw new Error("City hotel photos are only defined for Jerusalem and Tel Aviv");
  }
  const photo = photoLibrary(hotel.cityId)[hotel.id] ?? supplementalHotelPhotos[hotel.id];
  if (!photo) throw new Error(`Missing unique city hotel illustration for ${hotel.id}`);
  return photo;
}
