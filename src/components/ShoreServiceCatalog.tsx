import type { MouseEvent } from "react";
import { PriceDisplay } from "@/components/CurrencyRates";
import { getShoreCatalog } from "@/data/shoreExcursions";
import { shoreDestinations, shoreServiceKinds, shorePorts, type ShorePortId } from "@/data/registry";
import { parseShoreServiceSearch, shoreCatalogOperators, shoreServiceHref, type ShoreServiceSearch } from "@/lib/shore-services";
import { recordOutboundClick, relFor } from "@/lib/outbound";

type Props = {
  portId: ShorePortId;
  filters: ShoreServiceSearch;
  onFilterChange: (filters: ShoreServiceSearch) => void;
  itineraryId: string;
  onSelectItinerary: (id: string) => void;
};

export function ShoreServiceCatalog({ portId, filters, onFilterChange, itineraryId, onSelectItinerary }: Props) {
  const port = shorePorts[portId];
  const catalog = getShoreCatalog(portId);
  const visible = getShoreCatalog(portId, filters);
  const destinations = shoreDestinations.filter((destination) => catalog.some((service) => service.destinationIds.includes(destination.id)));
  const operators = shoreCatalogOperators.filter((operator) => catalog.some((service) => service.operator?.id === operator.id));
  const withoutService = parseShoreServiceSearch({ ...filters, service: undefined });
  const withoutDestination = parseShoreServiceSearch({ ...filters, destination: undefined });
  const withoutOperator = parseShoreServiceSearch({ ...filters, operator: undefined });
  function filter(event: MouseEvent<HTMLAnchorElement>, next: ShoreServiceSearch) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onFilterChange(next);
  }

  return <section id="itineraries" aria-labelledby="itineraries-h" className="mt-10 scroll-mt-24">
    <h2 id="itineraries-h" className="text-3xl">Tours, day trips & transfers from {port.name} Port</h2>
    <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">Browse every listed service below, then narrow the choices by service, destination or operator. Each card names the company running the service and where to book it.</p>
    <div className="mt-6 rounded-2xl border bg-secondary/50 p-5 sm:p-6">
      <nav aria-label="Filter port services by type">
        <p className="mb-3 text-sm font-semibold">Service</p>
        <ul className="flex flex-wrap gap-2">
          <li><a className="chip inline-block" href={shoreServiceHref(portId, withoutService)} onClick={(event) => filter(event, withoutService)} aria-current={!filters.service ? "true" : undefined}>All services</a></li>
          {shoreServiceKinds.map((kind) => <li key={kind.id}><a className="chip inline-block" href={shoreServiceHref(portId, { ...filters, service: kind.id })} onClick={(event) => filter(event, { ...filters, service: kind.id })} aria-current={filters.service === kind.id ? "true" : undefined}>{kind.label}</a></li>)}
        </ul>
      </nav>
      <nav aria-label="Filter port services by destination" className="mt-5">
        <p className="mb-3 text-sm font-semibold">Destination</p>
        <ul className="flex flex-wrap gap-2">
          <li><a className="chip inline-block" href={shoreServiceHref(portId, withoutDestination)} onClick={(event) => filter(event, withoutDestination)} aria-current={!filters.destination ? "true" : undefined}>All destinations</a></li>
          {destinations.map((destination) => <li key={destination.id}><a className="chip inline-block" href={shoreServiceHref(portId, { ...filters, destination: destination.id })} onClick={(event) => filter(event, { ...filters, destination: destination.id })} aria-current={filters.destination === destination.id ? "true" : undefined}>{destination.label}</a></li>)}
        </ul>
      </nav>
      <nav aria-label="Filter port services by operator" className="mt-5">
        <p className="mb-3 text-sm font-semibold">Operator</p>
        <ul className="flex flex-wrap gap-2">
          <li><a className="chip inline-block" href={shoreServiceHref(portId, withoutOperator)} onClick={(event) => filter(event, withoutOperator)} aria-current={!filters.operator ? "true" : undefined}>All operators</a></li>
          {operators.map((operator) => <li key={operator.id}><a className="chip inline-block" href={shoreServiceHref(portId, { ...filters, operator: operator.id })} onClick={(event) => filter(event, { ...filters, operator: operator.id })} aria-current={filters.operator === operator.id ? "true" : undefined}>{operator.name}</a></li>)}
        </ul>
      </nav>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "service" : "services"}{filters.service ? ` · ${shoreServiceKinds.find((kind) => kind.id === filters.service)?.label}` : ""}{filters.destination ? ` · ${shoreDestinations.find((destination) => destination.id === filters.destination)?.label}` : ""}{filters.operator ? ` · ${shoreCatalogOperators.find((operator) => operator.id === filters.operator)?.name}` : ""}</p>
      {(filters.service || filters.destination || filters.operator) && <a href={shoreServiceHref(portId, {})} onClick={(event) => filter(event, {})} className="text-sm font-medium text-primary underline">Clear filters</a>}
    </div>
    {visible.length > 0 ? <ul aria-label={`Services from ${port.name} Port`} className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {visible.map((service) => {
        const itinerary = service.itinerary;
        const provider = service.provider;
        const external = !provider.url.startsWith("/");
        return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-service-kind={service.kind} className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card ${itinerary && itineraryId === itinerary.id ? "border-primary ring-1 ring-primary" : ""}`}>
          <img src={service.photo.src} alt={service.photo.alt} width={720} height={480} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{service.format}</p>
            <h3 className="mt-2 text-2xl">{service.title}</h3>
            <p className="mt-2 text-sm font-medium">Operated by {service.operator?.name || provider.providerName}</p>
            <p className="mt-1 text-xs text-muted-foreground">{service.partner ? `Book on ${service.partner.name}` : provider.relationship === "publisher_operator" ? "Request directly from Moshe" : "Book directly with the operator"}</p>
            {service.product?.seasonNote && <p className="mt-2 text-xs font-medium">{service.product.seasonNote}</p>}
            {provider.relationship === "publisher_operator" && <p className="mt-1 text-xs text-muted-foreground">Operated by the publisher's local transport business.</p>}
            {provider.isAffiliate && <p className="mt-1 text-xs font-semibold">Sponsored link</p>}
            <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
            <ul aria-label="Destinations" className="mt-4 flex flex-wrap gap-2">{service.destinationIds.map((id) => <li key={id}><a href={shoreServiceHref(portId, { ...filters, destination: id })} onClick={(event) => filter(event, { ...filters, destination: id })} className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary underline decoration-primary/30 underline-offset-2">{shoreDestinations.find((destination) => destination.id === id)!.label}</a></li>)}</ul>
            {itinerary ? <>
              <p className="mt-4 text-sm"><strong>Best for:</strong> {itinerary.bestFor}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{itinerary.planningNote}</p>
              <div className="mt-5 border-t pt-4"><p className="text-xs text-muted-foreground">Published car-and-driver starting rate</p><PriceDisplay amount={itinerary.price.amount} className="mt-1" /><p className="mt-2 text-xs text-muted-foreground">Per vehicle · up to 4 · transport only</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Weekday rate. Guiding, admission, meals and tips excluded; supplements and final quote require confirmation.</p></div>
              <a href="#request-quote" onClick={() => onSelectItinerary(itinerary.id)} className="btn btn-primary mt-4" aria-label={`Request ${itinerary.destination} from ${port.name}`}>{itineraryId === itinerary.id ? "Selected — request this day trip" : "Request this day trip"}</a>
            </> : <>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{service.kind === "transfer" ? "A one-way journey, not a day trip returning to the ship. Exact pickup point, route, vehicle and price require confirmation." : "Check the actual ship date, meeting point, guide, group format, inclusions, return arrangements and cancellation terms with this operator."}</p>
              <p className="mt-5 border-t pt-4 text-sm font-semibold">{service.kind === "transfer" ? "Price on request" : "Check dates & prices on the booking site"}</p>
              <a href={provider.url} target={external ? "_blank" : undefined} rel={external ? relFor(provider.isAffiliate) : undefined} onClick={external ? () => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id }) : undefined} className="btn btn-primary mt-4">{provider.ctaLabel}{external && <><span aria-hidden> ↗</span><span className="sr-only"> (opens in a new tab)</span></>}</a>
            </>}
          </div>
        </li>;
      })}
    </ul> : <div className="mt-5 rounded-xl border p-6"><h3 className="text-2xl">No services match these tags</h3><p className="mt-2 text-muted-foreground">Choose another service or destination, or clear the filters to see all listed options from {port.name} Port.</p></div>}
    <p className="mt-5 text-sm text-muted-foreground">Prefer another return itinerary? <a href="#request-quote" onClick={() => onSelectItinerary("other")} className="font-medium text-primary underline">Ask for a custom itinerary</a>.</p>
  </section>;
}
