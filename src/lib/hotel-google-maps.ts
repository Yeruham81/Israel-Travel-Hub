/** Google Maps search links for named hotels; no unverified map coordinates or third-party map provider. */
export function hotelGoogleMapsUrl(hotel: { name: string; cityId: string }): string {
  const area = hotel.cityId === "deadsea" ? "Dead Sea" : hotel.cityId === "tiberias" ? "Tiberias" : hotel.cityId;
  const location = `${hotel.name}, ${area}, Israel`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}
