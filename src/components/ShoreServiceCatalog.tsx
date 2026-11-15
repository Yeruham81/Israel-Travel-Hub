import type { MouseEvent } from "react";
import { getShoreCatalog } from "@/data/shoreExcursions";
import { shoreDestinations, shorePorts, type ShorePortId } from "@/data/registry";
import { parseShoreServiceSearch, shoreServiceHref, type ShoreServiceSearch } from "@/lib/shore-services";
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
  const privateTours = visible.filter((service) => Boolean(service.itinerary));
  const partnerTours = visible.filter((service) => !service.itinerary);
  const destinations = shoreDestinations.filter((destination) => catalog.some((service) => service.destinationIds.includes(destination.id)));
  const withoutDestination = parseShoreServiceSearch({ ...filters, destination: undefined });
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
        <span className="mr-1 shrink-0 text-xs font-semibold text-muted-foreground">Show:</span>
        <a href={shoreServiceHref(portId, withoutDestination)} onClick={event => filter(event, withoutDestination)} aria-current={!filters.destination ? "true" : undefined} className="chip shrink-0 text-xs">All destinations</a>
        {destinations.map(destination => <a key={destination.id} href={shoreServiceHref(portId, { ...filters, destination: destination.id })} onClick={event => filter(event, { ...filters, destination: destination.id })} aria-current={filters.destination === destination.id ? "true" : undefined} className="chip shrink-0 text-xs">{destination.label}</a>)}
      </div>
    </nav>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "experience" : "experiences"}{filters.destination ? " · " + shoreDestinations.find(destination => destination.id === filters.destination)?.label : ""}</p>
      {filters.destination && <a href={shoreServiceHref(portId, {})} onClick={event => filter(event, {})} className="text-sm font-semibold text-primary underline">Clear filters</a>}
    </div>
    {visible.length === 0 ? <section className="mt-5 rounded-2xl border p-8 text-center">
      <h2 className="text-2xl font-semibold">No tours match this destination</h2>
      <p className="mt-3 text-muted-foreground">Try another destination to see more shore excursions from {port.name} Port.</p>
      <a href={shoreServiceHref(portId, {})} onClick={event => filter(event, {})} className="btn btn-primary mt-5">Show all shore excursions</a>
    </section> : <>
      {partnerTours.length > 0 && <section id="external-tours" aria-labelledby="partner-tours-h" data-section="external-tours" className="mt-5 scroll-mt-24">
        <h2 id="partner-tours-h" className="text-2xl font-semibold">Explore {port.name} shore excursions</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Compare guided day trips and small-group experiences departing from {port.name} Port. Check the exact meeting point and ship-return arrangements before booking.</p>
        <ul aria-label={"Other operators' tours from " + port.name + " Port"} className="mt-5 grid gap-3 md:grid-cols-2">
          {partnerTours.map(service => {
            const provider = service.provider;
            return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform={service.partner?.id || "direct"} data-service-kind={service.kind} className="min-w-0 scroll-mt-24">
              <article className="flex h-full min-w-0 gap-3 rounded-xl border bg-card p-3 shadow-sm sm:gap-4">
                <img src={service.photo.src} alt={service.photo.alt} width={140} height={180} loading="lazy" decoding="async" className="h-40 w-[96px] shrink-0 rounded-lg object-cover sm:h-44 sm:w-[124px]" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-semibold"><span className="sr-only">Booking platform: </span>{service.partner?.name || provider.providerName}</span>{service.rating && <span aria-label={`Rating ${service.rating.value.toFixed(1)} out of 5 from ${service.rating.count} reviews`} title={`Booking-platform reviews checked ${service.rating.checkedAt}; ratings may change`} className="font-semibold text-foreground">★ {service.rating.value.toFixed(1)} <span className="font-normal text-muted-foreground">({service.rating.count})</span></span>}
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 text-base font-semibold leading-snug">{service.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{service.description}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>◷ {service.duration}</span>
                    <span>From {port.name} Port</span>
                    <span>{service.groupLabel}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
                    <div>{service.listedPrice ? <>
                      <span className="block text-[11px] text-muted-foreground">Reference price · {service.listedPrice.basis === "per_person" ? "per person" : "per group"}</span>
                      <span className="font-bold text-primary">{"US$" + service.listedPrice.amount.toLocaleString("en-US")}</span>
                    </> : <span className="text-xs font-medium text-muted-foreground">Check current price</span>}</div>
                    <a href={provider.url} target="_blank" rel={relFor(provider.isAffiliate)} onClick={() => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id })} className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90" aria-label={provider.ctaLabel + ": " + service.title + " (opens in a new tab)"}>View tour ↗</a>
                  </div>
                </div>
              </article>
            </li>;
          })}
          {partnerTours.length % 2 === 1 && <li data-testid="shore-companion-card" className="min-w-0 rounded-xl border bg-secondary/30 p-5">
            <div className="flex h-full flex-col justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-primary">Plan your day ashore</p><h3 className="mt-2 text-lg font-semibold">Explore another destination</h3><p className="mt-2 text-sm text-muted-foreground">See every available excursion from {port.name} Port, or ask for a private route that fits your ship's schedule.</p></div>
              <a href={shoreServiceHref(portId, {})} onClick={event => filter(event, {})} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary">Explore all destinations</a>
            </div>
          </li>}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="partner-price-terms">Tour details, availability, prices and booking conditions are set by the tour operators and may change. Check the current itinerary, port pickup, return and cancellation terms with the booking provider.</p>
      </section>}
      {privateTours.length > 0 && <section id="my-private-days" aria-labelledby="owner-tours-h" data-section="moshe-private-tours" className="mt-10 scroll-mt-24">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Personally arranged with Moshe Barak</p>
        <h2 id="owner-tours-h" className="mt-2 text-3xl font-semibold">My private day trips from {port.name} Port</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Enjoy a flexible private car-and-driver day, with pickup and return arranged around your ship's schedule and your preferred stops.</p>
        <ul aria-label={"My private day trips from " + port.name + " Port"} className="mt-4 grid gap-3">
          {privateTours.map(service => {
            const itinerary = service.itinerary;
            if (!itinerary) return null;
            return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform="direct" data-service-kind={service.kind} className={"min-w-0 scroll-mt-24 overflow-hidden rounded-xl border bg-card " + (itineraryId === itinerary.id ? "border-primary ring-1 ring-primary" : "")}>
              <article className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
                <img src={service.photo.src} alt={service.photo.alt} width={320} height={180} loading="lazy" decoding="async" className="h-36 w-full object-cover sm:h-auto sm:w-48 sm:shrink-0 lg:w-56" />
                <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 lg:flex-row lg:items-center lg:gap-5 lg:px-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{service.duration} · Private car &amp; driver · From {port.name} Port</p>
                  </div>
                  <a href="#request-quote" onClick={() => onSelectItinerary(itinerary.id)} className="inline-flex min-h-10 shrink-0 items-center justify-center self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:self-center" aria-label={"Request " + itinerary.destination + " from " + port.name}>Request a quote</a>
                </div>
              </article>
            </li>;
          })}
          {privateTours.length % 2 === 1 && <li data-testid="shore-companion-card" className="min-w-0 rounded-xl border bg-secondary/25 p-4">
            <div className="flex h-full flex-wrap items-center justify-between gap-4">
              <div><h3 className="text-base font-semibold">Looking for a different private itinerary?</h3><p className="mt-1 max-w-xl text-sm text-muted-foreground">Tell me your preferred stops, group size and all-aboard deadline.</p></div>
              <a href="#request-quote" onClick={() => onSelectItinerary("other")} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Request a custom route</a>
            </div>
          </li>}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground" data-testid="owner-price-terms">Published weekday private transport rates are per vehicle for up to four passengers. Larger vehicles for families and groups can be arranged in advance.</p>
      </section>}
    </>}
  </div>;
}
