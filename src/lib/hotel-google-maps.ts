/** Google Maps searches use specific confirmed street or neighborhood information
 * for ambiguous hotel names; no invented place IDs or coordinates.
 * Other hotels retain a hotel-name search rather than a potentially wrong pin.
 */
const specificHotelQueries: Record<string, string> = {
  "tib-tiberia": "Tiberia Hotel, 17 HaNoter Street, Tiberias, Israel",
  "tib-hostel": "Tiberias Hostel, Rabin Square, Tiberias, Israel",
  "tib-sofia": "Sofia Hotel, Palmach Street, Tiberias, Israel",
  "tib-emily": "Emily's Hotel, HaGalil Street, Tiberias, Israel",
  "ds-ein-gedi": "Ein Gedi Hotel, Kibbutz Ein Gedi, Israel",
  "ds-hi-ein-gedi": "HI Ein Gedi Hostel, Ein Gedi Nature Reserve, Israel",
  "ds-herods": "Herods Dead Sea Hotel, Neve Zohar, Israel",
  "ds-leonardo-plaza": "Leonardo Plaza Dead Sea, Neve Zohar, Israel",
  "haifa-botanica": "Hotel Botanica, 50 Ben Gurion Boulevard, Haifa, Israel",
  "haifa-dan-carmel": "Dan Carmel Hotel, Louis Promenade, Carmel Center, Haifa, Israel",
  "haifa-schumacher": "The Schumacher Hotel, Lohamei HaGetaot Street, Haifa, Israel",
  "haifa-colony": "The Colony Hotel, Ben Gurion Boulevard, German Colony, Haifa, Israel",
  "haifa-crowne-plaza": "Crowne Plaza Haifa, Yefe Nof Street, Haifa, Israel",
  "haifa-leonardo-plaza": "Leonardo Plaza Haifa, Carmel Beach, Haifa, Israel",
  "haifa-golden-crown": "Golden Crown Haifa, Derech Yafo, Haifa, Israel",
  "haifa-nof": "Nof Hotel, 101 Hanassi Avenue, Haifa, Israel",
  "haifa-port-inn": "Port Inn, 34 Derech Yafo, Haifa, Israel",
  "haifa-loui-talpiot": "Loui Talpiot Hotel, HaHalutz Street, Talpiot Market, Haifa, Israel",
};

export function hotelGoogleMapsUrl(hotel: { id?: string; name: string; cityId: string }): string {
  const area = hotel.cityId === "deadsea" ? "Dead Sea" : hotel.cityId === "tiberias" ? "Tiberias" : hotel.cityId;
  const location = (hotel.id && specificHotelQueries[hotel.id]) || `${hotel.name}, ${area}, Israel`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}
