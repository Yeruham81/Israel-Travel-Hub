import { operators, partners, providerLinks, sources, shoreBookingPlatforms, shoreDestinations, shoreServices, shoreTourProducts, shorePorts, type ShoreDestinationId, type ShorePortId, type ShoreTourProduct } from "@/data/registry";

export type ShoreServiceSearch = { destination?: ShoreDestinationId; format?: "shared" | "private" | "driver" };

export function parseShoreServiceSearch(search: Record<string, unknown>): ShoreServiceSearch {
  const destination = shoreDestinations.find((item) => item.id === search["destination"] && shoreServices.some((service) => service.status === "published" && service.kind !== "transfer" && service.destinationIds.includes(item.id)))?.id;
  const format = search["format"] === "shared" || search["format"] === "private" || search["format"] === "driver" ? search["format"] : undefined;
  return { ...(destination ? { destination } : {}), ...(format ? { format } : {}) };
}

/** One card per published product; never infer port pickup from a city listing. */
export function servicesForPort(portId: ShorePortId) {
  return shoreServices.filter((item) => item.portId === portId && item.status === "published" && item.kind !== "transfer").flatMap((item) => {
    const provider = providerLinks.find((link) => link.id === item.providerLinkId && link.pageIds.includes(shorePorts[portId].pageId));
    if (!provider || (provider.relationship !== "publisher_operator" && !shoreBookingPlatforms.some((id) => id === provider.partnerId))) return [];
    const operator = operators.find((operator) => operator.id === provider?.operatorId);
    const partner = partners.find((partner) => partner.id === provider?.partnerId);
    const product = shoreTourProducts.find((product) => product.id === item.productId);
    return provider?.url ? [{ ...item, provider, operator, partner, product }] : [];
  });
}

export function filterShoreServices(portId: ShorePortId, search: ShoreServiceSearch) {
  return servicesForPort(portId).filter(item => (!search.destination || item.destinationIds.includes(search.destination)) && (!search.format || (search.format === "driver" ? item.kind === "private-driver" : item.kind === "guided-tour" && item.product?.groupFormat === search.format)));
}

export function shoreSourceIds(portId: ShorePortId) {
  return [...new Set([shorePorts[portId].sourceId, "owner-private-driver", portId === "haifa" ? "shore-haifa-terminal" : "shore-ashdod-terminal", ...(portId === "ashdod" ? ["inpa-masada"] : []), ...servicesForPort(portId).flatMap((service) => [service.provider.sourceId, service.product?.listedPrice?.sourceId].filter((id): id is string => Boolean(id)))])];
}

/** Recorded starting prices remain visible until updated or removed. */
export function shoreListedPrice(product: ShoreTourProduct | undefined, now = new Date()) {
  const price = product?.listedPrice;
  if (!price || price.kind !== "published_snapshot" || price.currency !== "USD" || !Number.isFinite(price.amount) || price.amount <= 0) return undefined;
  if (price.basis !== "per_person" && price.basis !== "per_group") return undefined;
  if (price.basis === "per_group" && (!Number.isInteger(price.maxPartySize) || price.maxPartySize! < 1)) return undefined;
  const source = sources.find((source) => source.id === price.sourceId);
  const checked = Date.parse(`${price.checkedAt}T00:00:00Z`);
  const age = now.getTime() - checked;
  if (!source || source.checkedAt !== price.checkedAt || !Number.isFinite(age) || age < 0) return undefined;
  if (new Date(checked).toISOString().slice(0, 10) !== price.checkedAt) return undefined;
  return price;
}

/** Verified product ratings remain visible only while their source check is sufficiently recent. */
export function shoreListedRating(product: ShoreTourProduct | undefined, now = new Date()) {
  const rating = product?.rating;
  if (!rating || !Number.isFinite(rating.value) || rating.value < 1 || rating.value > 5 || !Number.isInteger(rating.count) || rating.count < 1) return undefined;
  const source = sources.find(source => source.id === product.id);
  const checked = Date.parse(rating.checkedAt + "T00:00:00Z");
  const age = now.getTime() - checked;
  if (!source || source.checkedAt !== rating.checkedAt || !Number.isFinite(age) || age < 0 || age > 90 * 86_400_000) return undefined;
  return rating;
}

export function shoreServiceHref(portId: ShorePortId, search: ShoreServiceSearch) {
  const params = new URLSearchParams(parseShoreServiceSearch(search));
  return `${shorePorts[portId].path}${params.size ? `?${params}` : ""}`;
}

export type PortTransferSearch = { port?: ShorePortId; transfer?: "airport" | "city" };
export function parsePortTransferSearch(search: Record<string, unknown>): PortTransferSearch {
  const port = search["port"] === "haifa" || search["port"] === "ashdod" ? search["port"] : undefined;
  const transfer = search["transfer"] === "airport" || search["transfer"] === "city" ? search["transfer"] : undefined;
  return port && transfer ? { port, transfer } : {};
}

export function portTransferPrefill(search: PortTransferSearch) {
  if (!search.port || !search.transfer) return undefined;
  return {
    pickup: `${shorePorts[search.port].name} Port`,
    dropoff: search.transfer === "airport" ? "Ben Gurion Airport" : "",
    notes: `One-way transfer after a cruise call at ${shorePorts[search.port].name} Port. Please confirm the ship's disembarkation time and exact port meeting point.`,
  };
}
