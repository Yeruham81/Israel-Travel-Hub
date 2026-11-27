import {
  accommodationEditorial,
  jerusalemStaySourceIds,
  type AccommodationEditorialId,
} from "@/data/accommodationEditorial";
import type { CityStayGuide, HotelStayDestination } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

/** The editorial Article canonical stays at its Travel Blog URL. */
export function hotelEditorialMeta(
  guide: CityStayGuide | HotelStayDestination,
  id: AccommodationEditorialId,
  image: string,
) {
  const info = accommodationEditorial[id];
  const sourceIds =
    id === "jerusalem"
      ? [...new Set([...guide.sourceIds, ...jerusalemStaySourceIds])]
      : guide.sourceIds;
  return hotelGuideMeta(
    { ...guide, sourceIds, path: info.path, title: info.title, metaDescription: info.description },
    info.title,
    image,
    [
      { name: "Home", path: "/" },
      { name: "Travel guides", path: "/travel-blog/" },
      { name: info.title, path: info.path },
    ],
  );
}
