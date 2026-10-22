import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Users } from "lucide-react";
import type { TourProduct } from "@/data/tourTypes";
import { tourPlaces, tourTags } from "@/data/tourTypes";
import { operators } from "@/data/registry";
import { getTourCategory, tourPhotos, type TourCategoryId } from "@/data/tours";
import { filterTours, isOwnerTour, offersForTour, placeLabel, toursForCategory, tourSnapshotPrice, type TourSearch } from "@/lib/tours";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { PriceDisplay } from "@/components/CurrencyRates";

export function OwnerTourSection({ tours }: { tours: TourProduct[] }) {
  if (!tours.length) return null;
  return <section id="my-private-days" aria-labelledby="my-private-days-h" data-section="moshe-private-tours" className="mt-10 scroll-mt-24">
    <p className="text-xs font-bold uppercase tracking-widest text-primary">Personally arranged with Moshe Barak</p>
    <h2 id="my-private-days-h" className="mt-2 text-3xl font-semibold">My private day trips</h2>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Choose a private car-and-driver itinerary, then send me your date, pickup city and party details for a tailored quote. Licensed guiding can be requested separately.</p>
    <ul className="mt-5 grid gap-5 sm:grid-cols-2" aria-label="My private day trips">
      {tours.map(tour => <li key={tour.id} id={tour.id} data-product-id={tour.id} data-operator-id="moshe-barak" data-testid="owner-tour-card" className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card">
        <img src={tourPhotos[tour.id]!.src} alt={tourPhotos[tour.id]!.alt} width={720} height={480} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
        <article className="flex flex-1 flex-col p-4">
          <h3 className="text-xl font-semibold leading-snug text-foreground">{tour.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <div><dt className="sr-only">Duration</dt><dd className="flex items-start gap-2"><Clock3 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />{tour.duration}</dd></div>
            <div><dt className="sr-only">Tour format</dt><dd className="flex items-start gap-2"><Users aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />{tour.formatLabel}</dd></div>
            <div className="col-span-2"><dt className="sr-only">Departure</dt><dd className="flex items-start gap-2"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /><span><strong className="font-medium">From {tour.originIds.map(placeLabel).join(" or ")}</strong><br /><span className="text-xs text-muted-foreground">{tour.pickup}</span></span></dd></div>
            <div className="col-span-2"><dt className="inline font-medium">Includes: </dt><dd className="inline text-muted-foreground">{tour.inclusions}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-primary">{tour.destinationIds.map(placeLabel).join(" · ")}</p>
          <div className="mt-auto pt-4"><div className="border-t pt-4">{tour.price ? <><PriceDisplay amount={tour.price.amount} /><p className="mt-2 text-xs text-muted-foreground">Per vehicle · up to {tour.price.maxPartySize} · transport only</p></> : <><p className="text-lg font-semibold">Personal quote for your itinerary</p><p className="mt-1 text-xs text-muted-foreground">Route, vehicle and full price agreed before booking</p></>}</div>
            <Link to="/private-driver/" search={{ tour: tour.id }} hash="request-quote" className="btn btn-primary mt-4 w-full" aria-label={`Request a quote for ${tour.title}`}>Request this day trip</Link>
          </div>
        </article>
      </li>)}
    </ul>
    <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">{tours.some(tour => tour.price) ? "My published starting rates are in ILS per vehicle for up to four passengers on weekdays, covering transportation only. Licensed guiding, admission fees, parking, tolls, meals and tips are extra. Extra charges may apply for weekends, holidays or additional hours. I'll confirm the itinerary, availability and full price before booking." : "My quotes cover the agreed private transport service. Guiding, admissions, meals and any extra charges are confirmed separately in writing. Send me your date, pickup city, party size and preferred stops; booking follows my confirmation."}</p>
  </section>;
}

export function ExternalTourCard({ tour, pageId }: { tour: TourProduct; pageId: string }) {
  const offers = offersForTour(tour.id);
  const price = offers.map(offer => tourSnapshotPrice(offer)).find(Boolean);
  return <li id={tour.id} data-product-id={tour.id} data-testid="tour-card" className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
    <img src={tourPhotos[tour.id]!.src} alt={tourPhotos[tour.id]!.alt} width={720} height={480} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
    <article className="flex flex-1 flex-col p-5">
      <h3 className="text-xl font-semibold leading-snug text-foreground">{tour.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div><dt className="sr-only">Duration</dt><dd className="flex items-start gap-2"><Clock3 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />{tour.duration}</dd></div>
        <div><dt className="sr-only">Format</dt><dd className="flex items-start gap-2"><Users aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />{tour.formatLabel}</dd></div>
        <div><dt className="sr-only">Departure</dt><dd className="flex items-start gap-2"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /><span><strong className="font-medium">From {tour.originIds.map(placeLabel).join(" or ")}</strong><br /><span className="text-xs text-muted-foreground">{tour.pickup}</span></span></dd></div>
        <div><dt className="inline font-medium">Includes: </dt><dd className="inline text-muted-foreground">{tour.inclusions}</dd></div>
      </dl>
      <ul aria-label="Destinations" className="mt-4 flex flex-wrap gap-2">{tour.destinationIds.map(id => <li key={id} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-primary">{placeLabel(id)}</li>)}</ul>
      {tour.note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{tour.note}</p>}
      <p className="mt-3 text-xs text-muted-foreground">Operated by {operators.find(operator => operator.id === tour.operatorId)!.name}</p>
      <div className="mt-auto pt-5">
        <div className="border-t pt-4">
          {price ? <><p className="text-xs text-muted-foreground">Reference starting price</p><p className="mt-1 text-2xl font-bold text-primary">US${price.amount.toLocaleString("en-US")}<span className="ml-2 text-xs font-normal text-muted-foreground">{price.basis === "per_person" ? "per person" : `per group · up to ${price.maxPartySize}`}</span></p><p className="mt-1 text-xs text-muted-foreground">Confirm the current total for your date.</p></> : <><p className="font-semibold">Check dates & prices</p><p className="mt-1 text-xs text-muted-foreground">Current price on the booking site</p></>}
          {offers.map(offer => <a key={offer.id} href={offer.provider.url} target="_blank" rel={relFor(offer.provider.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: tour.id, offerId: offer.id })} className="btn btn-primary mt-3 w-full" aria-label={`${offer.provider.ctaLabel}: ${tour.title} (opens in a new tab)`}>{offer.provider.ctaLabel}<span aria-hidden className="ml-2">↗</span></a>)}
          {offers.some(offer => offer.provider.isAffiliate) && <p className="mt-2 text-xs text-muted-foreground">Affiliate link · I may earn a commission.</p>}
        </div>
      </div>
    </article>
  </li>;
}

export function TourCatalog({ categoryId, filters, onChange }: { categoryId: TourCategoryId; filters: TourSearch; onChange: (next: TourSearch, replace?: boolean) => void }) {
  const all = toursForCategory(categoryId);
  const visible = filterTours(categoryId, filters);
  const owner = visible.filter(isOwnerTour);
  const external = visible.filter(tour => !isOwnerTour(tour));
  const origins = tourPlaces.filter(place => all.some(tour => tour.originIds.includes(place.id)));
  const destinations = tourPlaces.filter(place => all.some(tour => tour.destinationIds.includes(place.id)));
  const tags = tourTags.filter(tag => all.some(tour => tour.tagIds.includes(tag.id)));
  const set = (key: keyof TourSearch, value: string) => onChange({ ...filters, [key]: value || undefined }, key === "q");
  const active = Object.keys(filters).some(key => key !== "sort");
  return <div id="tour-catalog" className="mt-10 scroll-mt-24">
    <form role="search" aria-label="Find a tour in this category" onSubmit={event => event.preventDefault()} className="rounded-2xl border bg-secondary/40 p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold">Search tours<input type="search" value={filters.q || ""} onChange={event => set("q", event.target.value)} placeholder="Place or interest" maxLength={80} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal" /></label>
        <label className="text-xs font-semibold">Start from<select value={filters.origin || ""} onChange={event => set("origin", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">All departures</option>{origins.map(origin => <option key={origin.id} value={origin.id}>{origin.label}</option>)}</select></label>
        <label className="text-xs font-semibold">Duration<select value={filters.length || ""} onChange={event => set("length", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">Any duration</option><option value="short">Up to half a day</option><option value="full-day">Full day</option></select></label>
        <label className="text-xs font-semibold">Experience<select value={filters.format || ""} onChange={event => set("format", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">All experiences</option><option value="shared">Shared guided experience</option><option value="private">Private</option><option value="independent">Shared transport & host</option></select></label>
      </div>
      {destinations.length > 1 && <div className="mt-4"><p className="text-xs font-semibold">Destinations</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" className="chip" aria-pressed={!filters.destination} onClick={() => set("destination", "")}>All destinations</button>{destinations.map(place => <button key={place.id} type="button" className="chip" aria-pressed={filters.destination === place.id} onClick={() => set("destination", filters.destination === place.id ? "" : place.id)}>{place.label}</button>)}</div></div>}
      {tags.length > 1 && <div className="mt-4"><p className="text-xs font-semibold">Interests</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" className="chip" aria-pressed={!filters.tag} onClick={() => set("tag", "")}>All interests</button>{tags.map(tag => <button key={tag.id} type="button" className="chip" aria-pressed={filters.tag === tag.id} onClick={() => set("tag", filters.tag === tag.id ? "" : tag.id)}>{tag.label}</button>)}</div></div>}
    </form>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "experience" : "experiences"}</p>
      <div className="flex flex-wrap items-center gap-3">{active && <button type="button" onClick={() => onChange({})} className="text-sm font-semibold text-primary underline">Clear filters</button>}<label className="text-xs text-muted-foreground">Sort by <select aria-label="Sort tours" value={filters.sort || ""} onChange={event => set("sort", event.target.value)} className="ml-1 rounded-lg border bg-background p-2 text-sm text-foreground"><option value="">Featured</option><option value="duration">Shortest duration</option><option value="title">Title A–Z</option></select></label></div>
    </div>
    {visible.length === 0 ? <section className="mt-5 rounded-2xl border p-8 text-center"><h2 className="text-2xl font-semibold">No tours match these choices</h2><p className="mt-3 text-muted-foreground">Try another departure, destination or interest.</p><button type="button" className="btn btn-primary mt-5" onClick={() => onChange({})}>Show all tours in this category</button></section> : <>
      <OwnerTourSection tours={owner} />
      {external.length > 0 && <section id="external-tours" aria-labelledby="external-tours-h" data-section="external-tours" className="mt-12 scroll-mt-24 border-t pt-8">
        <h2 id="external-tours-h" className="text-3xl font-semibold">{owner.length > 0 ? "More " : ""}{getTourCategory(categoryId).title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Discover guided itineraries, local walks and specialist activities from independent operators. Each card identifies the departure, experience and booking site.</p>
        <ul aria-label="External tours" className="mt-6 grid gap-5 sm:grid-cols-2">{external.map(tour => <ExternalTourCard key={tour.id} tour={tour} pageId={`tours-${categoryId}`} />)}</ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">External tours have their own prices and terms. Choose the correct date and departure option on the booking site, and confirm guiding, admissions, meeting and return arrangements. Any reference starting prices shown here are approximate listing snapshots, not confirmed quotes.</p>
      </section>}
    </>}
  </div>;
}
