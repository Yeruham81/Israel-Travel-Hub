import { accommodationEditorial, type AccommodationEditorialId } from "@/data/accommodationEditorial";
import type { CityStayGuide, HotelStayDestination } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

/** The editorial Article canonical stays at its Travel Blog URL. */
export function hotelEditorialMeta(guide: CityStayGuide | HotelStayDestination, id: AccommodationEditorialId, image: string) {
 const info = accommodationEditorial[id];
 return hotelGuideMeta({ ...guide, path: info.path, title: info.title, metaDescription: info.description },
   info.title, image,
   [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-blog/" }, { name: info.title, path: info.path }]);
}
