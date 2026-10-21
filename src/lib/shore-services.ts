import { operators, partners, providerLinks, shoreDestinations, shoreServiceKinds, shoreServices, shoreTourProducts, shorePorts, type ShoreDestinationId, type ShorePortId, type ShoreServiceKind } from "@/data/registry";

export type ShoreServiceSearch = { service?: ShoreServiceKind; destination?: ShoreDestinationId; operator?: string };

export const shoreCatalogOperators = operators.filter((operator) => shoreServices.some((service) => providerLinks.some((link) => link.id === service.providerLinkId && link.operatorId === operator.id)));

export function parseShoreServiceSearch(search: Record<string, unknown>): ShoreServiceSearch {
  const service = shoreServiceKinds.find((item) => item.id === search["service"])?.id;
  const destination = shoreDestinations.find((item) => item.id === search["destination"])?.id;
  const operator = shoreCatalogOperators.find((item) => item.id === search["operator"])?.id;
  return { ...(service ? { service } : {}), ...(destination ? { destination } : {}), ...(operator ? { operator } : {}) };
}

/** One card per published product; never infer port pickup from a city listing. */
export function servicesForPort(portId: ShorePortId) {
  return shoreServices.filter((item) => item.portId === portId && item.status === "published").flatMap((item) => {
    const provider = providerLinks.find((link) => link.id === item.providerLinkId && link.pageIds.includes(shorePorts[portId].pageId));
    const operator = operators.find((operator) => operator.id === provider?.operatorId);
    const partner = partners.find((partner) => partner.id === provider?.partnerId);
    const product = shoreTourProducts.find((product) => product.id === item.productId);
    return provider?.url ? [{ ...item, provider, operator, partner, product }] : [];
  });
}

export function filterShoreServices(portId: ShorePortId, search: ShoreServiceSearch) {
  return servicesForPort(portId).filter((item) => (!search.service || item.kind === search.service) && (!search.destination || item.destinationIds.includes(search.destination)) && (!search.operator || item.operator?.id === search.operator));
}

export function shoreSourceIds(portId: ShorePortId) {
  return [...new Set([shorePorts[portId].sourceId, "owner-private-driver", ...servicesForPort(portId).flatMap((service) => service.provider.sourceId ? [service.provider.sourceId] : [])])];
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
