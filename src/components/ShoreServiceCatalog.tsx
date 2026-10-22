import type { MouseEvent } from "react";
import { Clock3, MapPin, Users } from "lucide-react";
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

  return <section id="itineraries" aria-labelledby="itineraries-h" className="mt-10 scroll-mt-24">
    <h2 id="itineraries-h" className="text-3xl">Shore excursions & day trips from {port.name} Port</h2>
    <div className="mt-6 rounded-2xl border bg-secondary/50 p-4">
      <nav aria-label="Filter port services by destination">
        <p className="mb-2 text-sm font-semibold">Destination</p>
        <ul className="flex flex-wrap gap-2">
          <li><a className="chip inline-block" href={shoreServiceHref(portId, withoutDestination)} onClick={(event) => filter(event, withoutDestination)} aria-current={!filters.destination ? "true" : undefined}>All destinations</a></li>
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
        <ul aria-label={`My private day trips from ${port.name} Port`} className="mt-5 grid gap-5 sm:grid-cols-2">
      {privateTours.map((service) => {
        const itinerary = service.itinerary;
        const provider = service.provider;
        const external = !provider.url.startsWith("/");
        return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform={service.partner?.id || "direct"} data-service-kind={service.kind} className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card ${itinerary && itineraryId === itinerary.id ? "border-primary ring-1 ring-primary" : ""}`}>
          <img src={service.photo.src} alt={service.photo.alt} width={720} height={480} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-xl font-semibold leading-snug text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div><dt className="sr-only">Duration</dt><dd className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{service.duration}</dd></div>
              <div><dt className="sr-only">Tour format</dt><dd className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{service.groupLabel}</dd></div>
              <div className="col-span-2"><dt className="sr-only">Pickup and return</dt><dd className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{port.name} Port · pickup & return</dd></div>
              <div className="col-span-2"><dt className="inline font-medium">Includes: </dt><dd className="inline text-muted-foreground">{service.includesLabel}</dd></div>
            </dl>
            <ul aria-label="Destinations" className="mt-3 flex flex-wrap gap-x-3 gap-y-1">{service.destinationIds.map((id) => <li key={id}><a href={shoreServiceHref(portId, { ...filters, destination: id })} onClick={(event) => filter(event, { ...filters, destination: id })} className="text-xs text-primary underline underline-offset-2">{shoreDestinations.find((destination) => destination.id === id)!.label}</a></li>)}</ul>
            <p className="mt-3 text-xs text-muted-foreground">Operated by {service.operator?.name || provider.providerName}{service.partner && ` · Book on ${service.partner.name}`}{provider.isAffiliate && " · Affiliate link"}</p>
            <div className="mt-auto pt-4">
              <div className="border-t pt-4">
                {itinerary ? <><PriceDisplay amount={itinerary.price.amount} /><p className="mt-2 text-xs text-muted-foreground">Per vehicle · up to 4 · transport only</p></>
                  : service.listedPrice ? <><p className="text-xs text-muted-foreground">Listed from</p><p className="mt-1 text-2xl font-bold text-primary">US${service.listedPrice.amount.toLocaleString("en-US")}</p><p className="mt-1 text-xs">{service.listedPrice.basis === "per_group" ? `Per group · up to ${service.listedPrice.maxPartySize}` : "Per person"}</p></>
                  : <><p className="text-lg font-semibold">See current price</p><p className="mt-1 text-xs text-muted-foreground">Choose date & travelers on {service.partner?.name || provider.providerName}</p></>}
              </div>
              {itinerary ? <a href="#request-quote" onClick={() => onSelectItinerary(itinerary.id)} className="btn btn-primary mt-4 w-full" aria-label={`Request ${itinerary.destination} from ${port.name}`}>{itineraryId === itinerary.id ? "Selected — request this day trip" : "Request this day trip"}</a>
                : <a href={provider.url} target={external ? "_blank" : undefined} rel={external ? relFor(provider.isAffiliate) : undefined} onClick={external ? () => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id }) : undefined} className="btn btn-primary mt-4 w-full">{provider.ctaLabel}{external && <><span aria-hidden> ↗</span><span className="sr-only"> (opens in a new tab)</span></>}</a>}
            </div>
          </div>
        </li>;
      })}
    </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="owner-price-terms">My published starting rates are in ILS per vehicle for up to four passengers on weekdays, covering transportation only. Licensed guiding, admission fees, meals and tips are extra. Night, weekend or holiday supplements may apply; I'll confirm the itinerary, availability and full price before booking.</p>
      </section>}
      {partnerTours.length > 0 && <section aria-labelledby="partner-tours-h" className={privateTours.length ? "mt-12 border-t pt-10" : "mt-7"}>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Independent excursion providers</p>
            <h3 id="partner-tours-h" className="mt-2 text-2xl font-semibold">More guided shore excursions from {port.name}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Looking for a guided experience, the company of a group or a different route? Explore these additional shore excursions for memorable places, expert insights and a day that matches your interests and time ashore.</p>
            <ul aria-label={`Other operators' tours from ${port.name} Port`} className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {partnerTours.map((service) => {
                const provider = service.provider;
                const external = !provider.url.startsWith("/");
                return <li key={service.id} data-testid="shore-service-card" data-service-id={service.id} data-product-id={service.productId} data-operator-id={service.operator?.id} data-booking-platform={service.partner?.id || "direct"} data-service-kind={service.kind} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
                  <div className="relative">
                    <img src={service.photo.src} alt={service.photo.alt} width={720} height={540} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-navy/90 px-3 py-1.5 text-xs font-semibold text-navy-foreground">{service.groupLabel}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <p className="mt-3 flex items-start gap-2 text-sm"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{service.duration}</p>
                    <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{port.name} Port · pickup &amp; return</p>
                    <p className="mt-3 text-sm">Operated by {service.operator?.name || provider.providerName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Booking platform: {service.partner?.name || provider.providerName}{provider.isAffiliate && " · Sponsored link"}</p>
                    <div className="mt-auto pt-5">
                      <div className="border-t pt-4">
                        {service.listedPrice ? <>
                          <p className="text-xs text-muted-foreground">Published starting price · checked {service.listedPrice.checkedAt}</p>
                          <p className="mt-1 text-2xl font-bold text-primary">US${service.listedPrice.amount.toLocaleString("en-US")}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{service.listedPrice.basis === "per_group" ? `Per group · up to ${service.listedPrice.maxPartySize}` : "Per person"} · Confirm the total on the booking site</p>
                        </> : <>
                          <p className="text-lg font-semibold">See current price</p>
                          <p className="mt-1 text-xs text-muted-foreground">No verified current price to display · Confirm on the booking site</p>
                        </>}
                      </div>
                      <a href={provider.url} target={external ? "_blank" : undefined} rel={external ? relFor(provider.isAffiliate) : undefined} onClick={external ? () => recordOutboundClick({ pageId: port.pageId, productId: service.productId, offerId: provider.id }) : undefined} className="btn btn-primary mt-4 w-full">{provider.ctaLabel}{external && <><span aria-hidden> ↗</span><span className="sr-only"> (opens in a new tab)</span></>}</a>
                    </div>
                  </div>
                </li>;
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground" data-testid="partner-price-terms">External starting prices are dated published reference prices, not live quotes. Your travel date, party size, options and booking currency can change the final total. Check the current price, inclusions, port pickup and return, and cancellation terms on the booking platform before booking.</p>
          </section>}
    </> : <div className="mt-5 rounded-xl border p-6"><h3 className="text-2xl">No tours match this destination</h3><p className="mt-2 text-muted-foreground">Choose another destination or clear the filter to see all tours from {port.name} Port.</p></div>}
    <p className="mt-5 text-sm text-muted-foreground">Prefer another return itinerary? <a href="#request-quote" onClick={() => onSelectItinerary("other")} className="font-medium text-primary underline">Ask for a custom itinerary</a>.</p>
  </section>;
}
