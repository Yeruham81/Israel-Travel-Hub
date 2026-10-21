import { operators, partners, providerLinks, sources, shoreBookingPlatforms, shoreDestinations, shoreServiceKinds, shoreServices, shoreTourProducts, shorePorts, type ShoreBookingPlatform, type ShoreDestinationId, type ShorePortId, type ShoreServiceKind, type ShoreTourProduct } from "@/data/registry";

export type ShoreServiceSearch = { service?: ShoreServiceKind; destination?: ShoreDestinationId; operator?: string; platform?: ShoreBookingPlatform };

export const shoreCatalogOperators = operators.filter((operator) => shoreServices.some((service) => providerLinks.some((link) => link.id === service.providerLinkId && link.operatorId === operator.id)));

export function parseShoreServiceSearch(search: Record<string, unknown>): ShoreServiceSearch {
  const service = shoreServiceKinds.find((item) => item.id === search["service"])?.id;
  const destination = shoreDestinations.find((item) => item.id === search["destination"])?.id;
  const operator = shoreCatalogOperators.find((item) => item.id === search["operator"])?.id;
  const platform = shoreBookingPlatforms.find((id) => id === search["platform"]);
  return { ...(service ? { service } : {}), ...(destination ? { destination } : {}), ...(operator ? { operator } : {}), ...(platform ? { platform } : {}) };
}

/** One card per published product; never infer port pickup from a city listing. */
export function servicesForPort(portId: ShorePortId) {
  return shoreServices.filter((item) => item.portId === portId && item.status === "published").flatMap((item) => {
    const provider = providerLinks.find((link) => link.id === item.providerLinkId && link.pageIds.includes(shorePorts[portId].pageId));
    if (!provider || (provider.relationship !== "publisher_operator" && !shoreBookingPlatforms.some((id) => id === provider.partnerId))) return [];
    const operator = operators.find((operator) => operator.id === provider?.operatorId);
    const partner = partners.find((partner) => partner.id === provider?.partnerId);
    const product = shoreTourProducts.find((product) => product.id === item.productId);
    return provider?.url ? [{ ...item, provider, operator, partner, product }] : [];
  });
}

export function filterShoreServices(portId: ShorePortId, search: ShoreServiceSearch) {
  return servicesForPort(portId).filter((item) => (!search.service || item.kind === search.service) && (!search.destination || item.destinationIds.includes(search.destination)) && (!search.operator || item.operator?.id === search.operator) && (!search.platform || item.partner?.id === search.platform));
}

export function shoreSourceIds(portId: ShorePortId) {
  return [...new Set([shorePorts[portId].sourceId, "owner-private-driver", ...servicesForPort(portId).flatMap((service) => [service.provider.sourceId, service.product?.listedPrice?.sourceId].filter((id): id is string => Boolean(id)))])];
}

/** A short-lived editorial starting-price snapshot, never an exact-date live quote. */
export function shoreListedPrice(product: ShoreTourProduct | undefined, now = new Date()) {
  const price = product?.listedPrice;
  if (!price || price.kind !== "published_snapshot" || price.currency !== "USD" || !Number.isFinite(price.amount) || price.amount <= 0) return undefined;
  if (price.basis !== "per_person" && price.basis !== "per_group") return undefined;
  if (price.basis === "per_group" && (!Number.isInteger(price.maxPartySize) || price.maxPartySize! < 1)) return undefined;
  const source = sources.find((source) => source.id === price.sourceId);
  const checked = Date.parse(`${price.checkedAt}T00:00:00Z`);
  const age = now.getTime() - checked;
  if (!source || source.checkedAt !== price.checkedAt || !Number.isFinite(age) || age < 0 || age > 30 * 86_400_000) return undefined;
  if (new Date(checked).toISOString().slice(0, 10) !== price.checkedAt) return undefined;
  return price;
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
