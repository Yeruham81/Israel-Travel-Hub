import type { MouseEvent } from "react";
import { getShoreCatalog } from "@/data/shoreExcursions";
import { shoreDestinations, shorePorts, type ShorePortId } from "@/data/registry";
import { shoreServiceHref, type ShoreServiceSearch } from "@/lib/shore-services";
import { recordOutboundClick } from "@/lib/outbound";
import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";

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
  const privateTours = visible.filter((service) => Boolean(service.itinerary));
  const partnerTours = visible.filter((service) => !service.itinerary);
  const destinations = shoreDestinations.filter((destination) => catalog.some((service) => service.destinationIds.includes(destination.id)));
  const withoutDestination: ShoreServiceSearch = {};
  function filter(event: MouseEvent<HTMLAnchorElement>, next: ShoreServiceSearch) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onFilterChange(next);
  }

  // Match the compact category-page sequence: filters, external experiences, then Moshe's private days.
  return <div id="itineraries" className="mt-7 scroll-mt-24">
    <h2 className="sr-only">Shore excursions from {port.name} Port</h2>
    <nav aria-label="Filter port services by destination" className="rounded-xl border bg-secondary/25 px-3 py-3 sm:px-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <span className="mr-1 shrink-0 text-xs font-semibold text-muted-foreground">Destination:</span>
        <a href={shoreServiceHref(portId, withoutDestination)} onClick={event => filter(event, withoutDestination)} aria-current={!filters.destination ? "true" : undefined} className="chip shrink-0 text-xs">All destinations</a>
        {destinations.map(destination => <a key={destination.id} href={shoreServiceHref(portId, { destination: destination.id })} onClick={event => filter(event, { destination: destination.id })} aria-current={filters.destination === destination.id ? "true" : undefined} className="chip shrink-0 text-xs">{destination.label}</a>)}
      </div>
    </nav>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "experience" : "experiences"}{filters.destination ? " · " + shoreDestinations.find(destination => destination.id === filters.destination)?.label : ""}</p>
      {filters.destination && <a href={shoreServiceHref(portId, {})} onClick={event => filter(event, {})} className="text-sm font-semibold text-primary underline">Clear filters</a>}
    </div>
    {visible.length === 0 ? <section className="mt-5 rounded-2xl border p-8 text-center">
      <h2 className="text-2xl font-semibold">No tours match your selection</h2>
      <p className="mt-3 text-muted-foreground">Choose another destination to see more shore excursions from {port.name} Port.</p>
      <a href={shoreServiceHref(portId, {})} onClick={event => filter(event, {})} className="btn btn-primary mt-5">Show all shore excursions</a>
    </section> : <>
      {partnerTours.length > 0 && <section id="external-tours" aria-labelledby="partner-tours-h" data-section="external-tours" className="mt-5 scroll-mt-24">
        <h2 id="partner-tours-h" className="text-2xl font-semibold">Explore {port.name} shore excursions</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Compare guided day trips and small-group experiences departing from {port.name} Port.</p>
        <ul aria-label={"Other operators' tours from " + port.name + " Port"} className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {partnerTours.map(service => {
            const provider = service.provider;
            return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform={service.partner?.id || "direct"} data-service-kind={service.kind} className="min-w-0 scroll-mt-24">
              <ExternalProviderTourCard
                image={service.photo.src} alt={service.photo.alt}
                platform={service.partner?.name || provider.providerName}
                title={service.title} description={service.description}
                duration={service.product?.durationLabel} location={service.product?.groupFormat === "confirm" ? undefined : service.groupLabel} omitMissingDetails
                rating={service.rating && { value: service.rating.value, count: service.rating.count }}
                price={service.listedPrice && { amount: service.listedPrice.amount, currency: "USD", basis: service.listedPrice.basis, maxPartySize: service.listedPrice.maxPartySize }}
                href={provider.url} affiliate={provider.isAffiliate}
                onClick={() => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id })}
              />
            </li>;
          })}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="partner-price-terms">Check available dates, current prices, inclusions and reviews on the booking website.</p>
      </section>}
      {privateTours.length > 0 && <section id="my-private-days" aria-labelledby="owner-tours-h" data-section="moshe-private-tours" className="mt-10 scroll-mt-24">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Personally arranged by me</p>
        <h2 id="owner-tours-h" className="mt-2 text-3xl font-semibold">My private day trips from {port.name} Port</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">I'll customize your private shore excursion around your ship's schedule and preferred destinations.</p>
        <ul aria-label={"My private day trips from " + port.name + " Port"} className="mt-4 grid auto-rows-fr gap-3">
          {privateTours.map(service => {
            const itinerary = service.itinerary;
            if (!itinerary) return null;
            return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform="direct" data-service-kind={service.kind} className={"h-full min-w-0 scroll-mt-24 overflow-hidden rounded-xl border bg-card " + (itineraryId === itinerary.id ? "border-primary ring-1 ring-primary" : "")}>
              <article className="flex h-full min-w-0 flex-col sm:flex-row sm:items-stretch">
                <div className="relative h-36 w-full shrink-0 overflow-hidden bg-secondary/20 sm:h-auto sm:w-48 lg:w-56"><img src={service.photo.src} alt={service.photo.alt} width={320} height={180} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /></div>
                <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 lg:flex-row lg:items-center lg:gap-5 lg:px-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Full day · Customized itinerary · Private car &amp; driver</p>
                  </div>
                  <a href="#request-quote" onClick={() => onSelectItinerary(itinerary.id)} className="inline-flex min-h-10 shrink-0 items-center justify-center self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:self-center" aria-label={"Get a quote: " + itinerary.destination + " from " + port.name}>Get a quote</a>
                </div>
              </article>
            </li>;
          })}
        </ul>
        <p className="mt-4 text-sm"><a href="#request-quote" onClick={()=>onSelectItinerary("other")} className="font-semibold text-primary underline">Contact me for a customized itinerary</a>.</p>
      </section>}
    </>}
  </div>;
}
