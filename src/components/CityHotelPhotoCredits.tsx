import { hotelsInCityCatalog, cityHotelPhoto } from "@/data/cityHotelCatalog";
import { PhotoCreditsDisclosure, type PagePhotoCredit } from "@/components/PhotoCreditsDisclosure";

export function hotelPhotoCreditEntries(
  hotels: ReturnType<typeof hotelsInCityCatalog>,
): PagePhotoCredit[] {
  return hotels.map((hotel) => {
    const photo = cityHotelPhoto(hotel);
    return {
      label: hotel.name,
      credit: photo.credit,
      sourceUrl: photo.sourceUrl,
      licenseUrl: photo.licenseUrl,
    };
  });
}

export function CityHotelPhotoCredits({
  city,
  extraEntries = [],
}: {
  city: "jerusalem" | "telaviv";
  extraEntries?: PagePhotoCredit[];
}) {
  return (
    <PhotoCreditsDisclosure
      entries={[...extraEntries, ...hotelPhotoCreditEntries(hotelsInCityCatalog(city))]}
      testId={
        city === "jerusalem" ? "jerusalem-hotel-photo-credits" : "tel-aviv-hotel-photo-credits"
      }
    />
  );
}
