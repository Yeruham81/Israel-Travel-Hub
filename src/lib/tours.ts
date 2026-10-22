import { affiliateConfig, operators, partners, providerLinks, sources, tourBookingOffers, tourProducts } from "@/data/registry";
import { getTourCategory, tourCategoryPaths, type TourCategoryId } from "@/data/tours";
import { tourPlaces, tourTags, type TourFormat, type TourLength, type TourPlaceId, type TourTagId, type TourProduct, type TourBookingOffer } from "@/data/tourTypes";

export type TourSearch = { origin?: TourPlaceId; destination?: TourPlaceId; tag?: TourTagId; format?: TourFormat; length?: TourLength; q?: string; sort?: "duration" | "title" };
export function parseTourSearch(raw: Record<string, unknown>): TourSearch {
  const origin = tourPlaces.find(place => place.id === raw["origin"])?.id;
  const destination = tourPlaces.find(place => place.id === raw["destination"])?.id;
  const tag = tourTags.find(tag => tag.id === raw["tag"])?.id;
  const format = raw["format"] === "shared" || raw["format"] === "private" || raw["format"] === "independent" ? raw["format"] : undefined;
  const length = raw["length"] === "short" || raw["length"] === "full-day" ? raw["length"] : undefined;
  const q = typeof raw["q"] === "string" ? raw["q"].replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 80) : undefined;
  const sort = raw["sort"] === "duration" || raw["sort"] === "title" ? raw["sort"] : undefined;
  return { ...(origin && { origin }), ...(destination && { destination }), ...(tag && { tag }), ...(format && { format }), ...(length && { length }), ...(q?.trim() && { q }), ...(sort && { sort }) };
}
export function placeLabel(id: TourPlaceId) { return tourPlaces.find(place => place.id === id)!.label; }
export function isOwnerTour(tour: TourProduct) { return tour.operatorId === "moshe-barak"; }
export function offersForTour(productId: string) {
  return tourBookingOffers.filter(offer => offer.productId === productId).flatMap(offer => {
    const partner = partners.find(partner => partner.id === offer.partnerId);
    const provider = providerLinks.find(provider => provider.id === offer.id);
    if (!partner || !provider || !provider.url) return [];
    // Resolve from the one configuration, including edits made before a future DB query.
    const trackingUrl = affiliateConfig[offer.id]?.trackingUrl;
    return [{ ...offer, partner, provider: { ...provider, url: trackingUrl || offer.publicUrl, isAffiliate: Boolean(trackingUrl) } }];
  });
}
export function toursForCategory(categoryId?: TourCategoryId) {
  const match = categoryId ? getTourCategory(categoryId).match : undefined;
  return tourProducts.filter(tour => tour.status === "published" && operators.some(operator => operator.id === tour.operatorId)
    && (isOwnerTour(tour) || offersForTour(tour.id).length > 0)
    && (!match?.destinations?.length || tour.destinationIds.some(id => match.destinations!.includes(id)))
    && (!match?.tags?.length || tour.tagIds.some(id => match.tags!.includes(id))));
}
export function filterTours(categoryId: TourCategoryId, raw: TourSearch = {}) {
  const search = parseTourSearch(raw);
  const terms = search.q?.trim().toLocaleLowerCase("en").split(/\s+/) || [];
  const matches = toursForCategory(categoryId).filter(tour => {
    const searchable = [tour.title, tour.summary, tour.formatLabel, ...tour.originIds.map(placeLabel), ...tour.destinationIds.map(placeLabel), ...tour.tagIds.map(id => tourTags.find(tag => tag.id === id)!.label)].join(" ").toLocaleLowerCase("en");
    return (!search.origin || tour.originIds.includes(search.origin)) && (!search.destination || tour.destinationIds.includes(search.destination)) && (!search.tag || tour.tagIds.includes(search.tag))
      && (!search.format || tour.format === search.format) && (!search.length || tour.length === search.length) && terms.every(term => searchable.includes(term));
  });
  if (search.sort === "duration") return matches.sort((a, b) => (a.durationMinutes ?? Infinity) - (b.durationMinutes ?? Infinity) || a.title.localeCompare(b.title, "en"));
  if (search.sort === "title") return matches.sort((a, b) => a.title.localeCompare(b.title, "en"));
  return matches;
}
/** The same product's stable anchor works in every category it belongs to. */
export function tourCardHref(categoryId: TourCategoryId, productId: string) { return `${tourCategoryPaths[categoryId]}#${productId}`; }
export function tourSnapshotPrice(offer: TourBookingOffer, now = new Date()) {
  const price = offer.listedPrice;
  if (!price || price.kind !== "published_snapshot" || price.currency !== "USD" || !Number.isFinite(price.amount) || price.amount <= 0) return undefined;
  if (price.basis !== "per_person" && price.basis !== "per_group") return undefined;
  if (price.basis === "per_group" && (!Number.isInteger(price.maxPartySize) || price.maxPartySize! < 1)) return undefined;
  const source = sources.find(source => source.id === price.sourceId);
  const checked = Date.parse(`${price.checkedAt}T00:00:00Z`);
  const age = now.getTime() - checked;
  if (source?.id !== offer.id || source.checkedAt !== price.checkedAt || price.checkedAt !== offer.checkedAt || !Number.isFinite(age) || age < 0 || age > 30 * 86_400_000) return undefined;
  if (new Date(checked).toISOString().slice(0, 10) !== price.checkedAt) return undefined;
  return price;
}
