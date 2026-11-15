import type { MouseEvent } from "react";
import { Clock3 } from "lucide-react";
import { PriceDisplay } from "@/components/CurrencyRates";
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

  return <section id="itineraries" aria-labelledby="itineraries-h" className="mt-7 scroll-mt-24">
    <h2 id="itineraries-h" className="sr-only">Shore excursions & day trips from {port.name} Port</h2>
    <div className="rounded-xl border bg-secondary/25 px-3 py-3 sm:px-4">
      <nav aria-label="Filter port services by destination">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Show:</p>
        <ul className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <li><a className="chip shrink-0 text-xs" href={shoreServiceHref(portId, withoutDestination)} onClick={(event) => filter(event, withoutDestination)} aria-current={!filters.destination ? "true" : undefined}>All destinations</a></li>
          {destinations.map((destination) => <li key={destination.id}><a className="chip inline-block" href={shoreServiceHref(portId, { ...filters, destination: destination.id })} onClick={(event) => filter(event, { ...filters, destination: destination.id })} aria-current={filters.destination === destination.id ? "true" : undefined}>{destination.label}</a></li>)}
        </ul>
      </nav>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "tour" : "tours"}{filters.destination ? ` · ${shoreDestinations.find((destination) => destination.id === filters.destination)?.label}` : ""}</p>
      {filters.destination && <a href={shoreServiceHref(portId, {})} onClick={(event) => filter(event, {})} className="text-sm font-medium text-primary underline">Clear filters</a>}
    </div>
    {visible.length > 0 ? <>
      {privateTours.length > 0 && <section aria-labelledby="owner-tours-h" data-section="moshe-private-tours">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Personally arranged with Moshe Barak</p>
        <h3 id="owner-tours-h" className="mt-2 text-2xl font-semibold">My private day trips from {port.name} Port</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Choose a private car-and-driver itinerary, then send me your ship's schedule and party details for a tailored quote.</p>
        <ul aria-label={`My private day trips from ${port.name} Port`} className="mt-4 grid gap-3">
      {privateTours.map((service) => {
        const itinerary = service.itinerary;
                return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform="direct" data-service-kind={service.kind} className={"min-w-0 scroll-mt-24 overflow-hidden rounded-xl border bg-card " + (itineraryId === itinerary!.id ? "border-primary ring-1 ring-primary" : "")}>
          <article className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
            <img src={service.photo.src} alt={service.photo.alt} width={320} height={180} loading="lazy" decoding="async" className="h-36 w-full object-cover sm:h-auto sm:w-48 sm:shrink-0 lg:w-56" />
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 lg:flex-row lg:items-center lg:gap-5 lg:px-5">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-snug">{service.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">{service.duration} · Private car &amp; driver · {port.name} Port · pickup &amp; return</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:w-44 lg:shrink-0 lg:flex-col lg:items-stretch">
                <div><PriceDisplay amount={itinerary!.price.amount} /><p className="mt-1 text-xs text-muted-foreground">Per vehicle · up to 4 · transport only</p></div>
                <a href="#request-quote" onClick={() => onSelectItinerary(itinerary!.id)} className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90" aria-label={"Request " + itinerary!.destination + " from " + port.name}>{itineraryId === itinerary!.id ? "Selected — request this day trip" : "Request a quote"}</a>
              </div>
            </div>
          </article>
        </li>;
      })}
    </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="owner-price-terms">My published starting rates are in ILS per vehicle for up to four passengers on weekdays, covering transportation only. Licensed guiding, admission fees, meals and tips are extra. Extra charges may apply for night, weekend or holiday trips. I'll confirm the itinerary, availability and full price before booking.</p>
      </section>}
      {partnerTours.length > 0 && <section aria-labelledby="partner-tours-h" className="mt-8 scroll-mt-24">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Independent excursion providers</p>
            <h3 id="partner-tours-h" className="text-2xl font-semibold">Explore {port.name} shore excursions</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Compare independently operated guided and shared excursions, with pickup and return from the named cruise port. Confirm the meeting point and return to your ship.</p>
            <ul aria-label={`Other operators' tours from ${port.name} Port`} className="mt-4 grid gap-3 md:grid-cols-2">
              {partnerTours.map((service) => {
                const provider = service.provider;
                                return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform={service.partner?.id || "direct"} data-service-kind={service.kind} className="min-w-0 scroll-mt-24">
                  <article className="flex h-full min-w-0 gap-3 rounded-xl border bg-card p-3 shadow-sm sm:gap-4">
                    <img src={service.photo.src} alt={service.photo.alt} width={140} height={180} loading="lazy" decoding="async" className="h-40 w-[96px] shrink-0 rounded-lg object-cover sm:h-44 sm:w-[124px]" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-xs font-semibold text-muted-foreground"><span className="sr-only">Booking platform: </span>{service.partner?.name || provider.providerName}</p>
                      <h3 className="mt-1.5 line-clamp-2 text-base font-semibold leading-snug">{service.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{service.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground"><Clock3 className="mr-1 inline size-3.5 text-primary" aria-hidden />{service.duration} · {service.groupLabel}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{port.name} Port · pickup &amp; return</p>
                      <p className="mt-1 text-xs text-muted-foreground">Operated by {service.operator?.name || provider.providerName}</p>
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
                        <div>{service.listedPrice ? <>
                          <span className="block text-[11px] text-muted-foreground">Published starting price · checked {service.listedPrice.checkedAt}</span>
                          <span className="font-bold text-primary">{"US$" + service.listedPrice.amount.toLocaleString("en-US")}</span>
                          <span className="block text-[11px] text-muted-foreground">{service.listedPrice.basis === "per_group" ? "Per group · up to " + service.listedPrice.maxPartySize : "Per person"}</span>
                        </> : <span className="text-xs font-medium text-muted-foreground">See current price</span>}</div>
                        <a href={provider.url} target="_blank" rel={relFor(provider.isAffiliate)} onClick={() => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id })} className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90" aria-label={provider.ctaLabel + ": " + service.title + " (opens in a new tab)"}>View tour <span aria-hidden>↗</span></a>
                      </div>
                    </div>
                  </article>
                </li>;
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="partner-price-terms">External starting prices are dated published reference prices, not live quotes. Your travel date, party size, options and booking currency can change the final total. Check the current price, inclusions, port pickup and return, and cancellation terms on the booking platform before booking.</p>
          </section>}
    </> : <div className="mt-5 rounded-xl border p-6"><h3 className="text-2xl">No tours match this destination</h3><p className="mt-2 text-muted-foreground">Choose another destination or clear the filter to see all tours from {port.name} Port.</p></div>}
    <p className="mt-5 text-sm text-muted-foreground">Prefer another return itinerary? <a href="#request-quote" onClick={() => onSelectItinerary("other")} className="font-medium text-primary underline">Ask for a custom itinerary</a>.</p>
  </section>;
}
