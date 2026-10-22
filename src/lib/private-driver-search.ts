import { tourProducts } from "@/data/registry";
import { tourPlaces } from "@/data/tourTypes";
import { parsePortTransferSearch, type PortTransferSearch } from "@/lib/shore-services";
import type { DriverQuoteFields } from "@/lib/private-driver-quote";

export type PrivateDriverSearch = PortTransferSearch & { tour?: string };
export function parsePrivateDriverSearch(raw: Record<string, unknown>): PrivateDriverSearch {
  const portTransfer = parsePortTransferSearch(raw);
  if (portTransfer.port) return portTransfer;
  const tour = tourProducts.find(tour => tour.id === raw["tour"] && tour.operatorId === "moshe-barak" && tour.status === "published");
  return tour ? { tour: tour.id } : {};
}
export function privateTourPrefill(search: PrivateDriverSearch): Partial<DriverQuoteFields> | undefined {
  const tour = tourProducts.find(tour => tour.id === search.tour && tour.operatorId === "moshe-barak" && tour.status === "published");
  if (!tour) return undefined;
  const destinations = tour.destinationIds.map(id => tourPlaces.find(place => place.id === id)!.label).join(", ");
  return { itinerary: `${tour.title}\nPreferred destinations: ${destinations}.`, notes: "Private car-and-driver day. Please confirm the route, transport price and any separately requested licensed guiding." };
}
