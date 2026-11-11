import { hotelsInCityCatalog, cityHotelPhoto } from "@/data/cityHotelCatalog";

/**
 * Source and licensing details belong after the contact form, not among
 * recommendations or booking offers.
 */
export function CityHotelPhotoCredits({ city }: { city: "jerusalem" | "telaviv" }) {
  const hotels = hotelsInCityCatalog(city);
  return <details className="mt-5 rounded-xl border bg-card p-3 text-xs text-muted-foreground" data-testid={city === "jerusalem" ? "jerusalem-hotel-photo-credits" : "tel-aviv-hotel-photo-credits"}>
    <summary className="cursor-pointer font-semibold text-foreground">Illustrative photo credits & licenses</summary>
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
      {hotels.map((hotel) => {
        const photo = cityHotelPhoto(hotel);
        return <li key={hotel.id}>
          <span className="font-medium text-foreground">{hotel.name}: </span>
          {photo.sourceUrl
            ? <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.credit}<span className="sr-only"> (opens in a new tab)</span></a>
            : photo.credit}
          {photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License<span className="sr-only"> (opens in a new tab)</span></a></>}
        </li>;
      })}
    </ul>
  </details>;
}
