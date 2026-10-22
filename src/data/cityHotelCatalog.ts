/** One source of truth for the city galleries and their neighborhood hotel cards.
 * New hotels are added to the city galleries as soon as they appear in an area guide.
 * Existing approved Expedia partner links are managed separately in registry.ts.
 */
import { jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { hotelsForArea, type HotelRecommendation } from "@/data/registry";
import { jerusalemHotelPhotos } from "@/data/jerusalemHotelPhotos";
import { telAvivHotelPhotos, type HotelIllustration } from "@/data/telAvivHotelPhotos";

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

/** Exactly the same licensed illustrative photo as on the property's neighborhood card.
 * The supplemental properties use the established illustration pool; no image is
 * represented as a photograph of the named hotel.
 */
export function cityHotelPhoto(hotel: HotelRecommendation): HotelIllustration {
  if (hotel.cityId !== "jerusalem" && hotel.cityId !== "telaviv") {
    throw new Error("City hotel photos are only defined for Jerusalem and Tel Aviv");
  }
  const photos = photoLibrary(hotel.cityId);
  if (photos[hotel.id]) return photos[hotel.id]!;
  const areaIndex = areaGuides(hotel.cityId).findIndex((area) => area.id === hotel.areaId);
  const index = hotelsForArea(hotel.areaId, hotel.cityId).findIndex((entry) => entry.id === hotel.id);
  const library = Object.values(photos);
  if (areaIndex < 0 || index < 0 || library.length === 0) {
    throw new Error(`Missing city hotel illustration for ${hotel.id}`);
  }
  return library[(areaIndex * 2 + index) % library.length]!;
}
