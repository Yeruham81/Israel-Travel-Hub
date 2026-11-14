import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Users } from "lucide-react";
import type { TourProduct } from "@/data/tourTypes";
import { tourPlaces, tourTags } from "@/data/tourTypes";
import { operators } from "@/data/registry";
import { getTourCategory, tourPhotos, type TourCategoryId } from "@/data/tours";
import { filterTours, isOwnerTour, offersForTour, placeLabel, toursForCategory, tourSnapshotPrice, type TourSearch } from "@/lib/tours";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { PriceDisplay } from "@/components/CurrencyRates";

export function OwnerTourSection({ tours, compact = false }: { tours: TourProduct[]; compact?: boolean }) {
  if (!tours.length) return null;
  return <section id="my-private-days" aria-labelledby="my-private-days-h" data-section="moshe-private-tours" className="mt-10 scroll-mt-24">
    <p className="text-xs font-bold uppercase tracking-widest text-primary">Personally arranged with Moshe Barak</p>
    <h2 id="my-private-days-h" className="mt-2 text-3xl font-semibold">My private day trips</h2>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Enjoy the flexibility of a private driver, with a customized route, convenient pickup and stops of your choice.</p>
    <ul className={compact ? "mt-4 grid gap-3" : "mt-5 grid gap-5 sm:grid-cols-2"} aria-label="My private day trips">
      {tours.map(tour => compact ? <li key={tour.id} id={tour.id} data-product-id={tour.id} data-operator-id="moshe-barak" data-testid="owner-tour-card" className="min-w-0 scroll-mt-24 overflow-hidden rounded-xl border bg-card">
        <article className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
          <img src={tourPhotos[tour.id]!.src} alt={tourPhotos[tour.id]!.alt} width={320} height={180} loading="lazy" decoding="async" className="h-36 w-full object-cover sm:h-auto sm:w-48 sm:shrink-0 lg:w-56" />
          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 lg:flex-row lg:items-center lg:gap-5 lg:px-5">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-snug">{tour.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
              <p className="mt-2 text-xs text-muted-foreground">{tour.duration} · Private car &amp; driver</p>
            </div>
            <a href="#contact" aria-label={"Request a quote for " + tour.title} className="inline-flex min-h-10 shrink-0 items-center justify-center self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:self-center">Request a quote</a>
          </div>
        </article>
      </li> : <li key={tour.id} id={tour.id} data-product-id={tour.id} data-operator-id="moshe-barak" data-testid="owner-tour-card" className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card">
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
    {!compact && tours.some(tour => tour.price) && <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">My rates cover private transport only, with published starting prices in ILS per vehicle for up to four passengers on weekdays. Send me your travel date, pickup city, group size and preferred stops to get a personalized quote.</p>}
  </section>;
}

export function ExternalTourCard({ tour, pageId, compact = false }: { tour: TourProduct; pageId: string; compact?: boolean }) {
  const offers = offersForTour(tour.id, pageId);
  const price = offers.map(offer => tourSnapshotPrice(offer)).find(Boolean);
  const primaryOffer = offers[0];
  if (compact) return <li id={tour.id} data-product-id={tour.id} data-testid="tour-card" className="min-w-0 scroll-mt-24">
    <article className="flex h-full min-w-0 gap-3 rounded-xl border bg-card p-3 shadow-sm sm:gap-4">
      <img src={tourPhotos[tour.id]!.src} alt={tourPhotos[tour.id]!.alt} width={140} height={180} loading="lazy" decoding="async" className="h-40 w-[96px] shrink-0 rounded-lg object-cover sm:h-44 sm:w-[124px]" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-muted-foreground"><span className="font-semibold">{offers[0]?.partner?.name || "Booking platform"}</span>{tour.rating && <span aria-label={`Rating ${tour.rating.value} out of 5 from ${tour.rating.count} reviews`} title={`Booking-platform reviews checked ${tour.rating.checkedAt}; ratings may change`} className="font-semibold text-foreground">★ {tour.rating.value.toFixed(1)} <span className="font-normal text-muted-foreground">({tour.rating.count})</span></span>}</div>
        <h3 className="mt-1.5 line-clamp-2 text-base font-semibold leading-snug">{tour.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{tour.summary}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"><span>◷ {tour.duration}</span><span>From {tour.originIds.map(placeLabel).join(" / ")}</span></div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3"><div>{price ? <><span className="block text-[11px] text-muted-foreground">Reference price · per {price.basis === "per_person" ? "person" : "group"}</span><span className="font-bold text-primary">US${price.amount.toLocaleString("en-US")}</span></> : <span className="text-xs font-medium text-muted-foreground">Check current price</span>}</div>
          {primaryOffer && <a href={primaryOffer.provider.url} target="_blank" rel={relFor(primaryOffer.provider.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: tour.id, offerId: primaryOffer.id })} className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">View tour ↗</a>}
        </div>
      </div>
    </article>
  </li>;
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
        </div>
      </div>
    </article>
  </li>;
}

export function TourCatalog({ categoryId, filters, onChange }: { categoryId: TourCategoryId; filters: TourSearch; onChange: (next: TourSearch, replace?: boolean) => void }) {
  const compact = categoryId === "jerusalem" || categoryId === "tel-aviv-jaffa" || categoryId === "masada-dead-sea" || categoryId === "bethlehem-jericho" || categoryId === "nazareth-galilee" || categoryId === "northern-coast";
  const compactChips: { label: string; search: TourSearch }[] = categoryId === "jerusalem" ? [
    { label: "All tours", search: {} },
    { label: "From Jerusalem", search: { origin: "jerusalem" } },
    { label: "From Tel Aviv", search: { origin: "tel-aviv" } },
    { label: "Up to half a day", search: { length: "short" } },
    { label: "Full day", search: { length: "full-day" } },
    { label: "Private", search: { format: "private" } },
    { label: "Food & markets", search: { tag: "food" } },
    { label: "History & heritage", search: { tag: "heritage" } },
    { label: "Art & architecture", search: { tag: "art" } },
    { label: "Shortest first", search: { sort: "duration" } },
  ] : categoryId === "tel-aviv-jaffa" ? [
    { label: "All tours", search: {} },
    { label: "Up to half a day", search: { length: "short" } },
    { label: "Full day", search: { length: "full-day" } },
    { label: "Private", search: { format: "private" } },
    { label: "Food & markets", search: { tag: "food" } },
    { label: "History & heritage", search: { tag: "heritage" } },
    { label: "Art & architecture", search: { tag: "art" } },
    { label: "Self-guided", search: { format: "independent" } },
    { label: "Shortest first", search: { sort: "duration" } },
    { label: "Title A–Z", search: { sort: "title" } },
  ] : categoryId === "masada-dead-sea" ? [
    { label: "All tours", search: {} },
    { label: "From Jerusalem", search: { origin: "jerusalem" } },
    { label: "From Tel Aviv", search: { origin: "tel-aviv" } },
    { label: "Visit Masada", search: { destination: "masada" } },
    { label: "Ein Gedi routes", search: { destination: "ein-gedi" } },
    { label: "Dead Sea only", search: { q: "relaxation" } },
    { label: "Sunrise hikes", search: { q: "sunrise" } },
    { label: "Private driver", search: { format: "private" } },
    { label: "Guided groups", search: { format: "shared" } },
    { label: "Self-guided", search: { format: "independent" } },
    { label: "Shortest first", search: { sort: "duration" } },
  ] : categoryId === "bethlehem-jericho" ? [
    { label: "All tours", search: {} },
    { label: "From Jerusalem", search: { origin: "jerusalem" } },
    { label: "From Tel Aviv", search: { origin: "tel-aviv" } },
    { label: "Jericho", search: { destination: "jericho" } },
    { label: "Qasr al-Yahud", search: { destination: "jordan-river" } },
    { label: "Half day", search: { length: "short" } },
    { label: "Full day", search: { length: "full-day" } },
    { label: "Private guided", search: { format: "private" } },
    { label: "Group tours", search: { format: "shared" } },
    { label: "Shortest first", search: { sort: "duration" } },
  ] : categoryId === "nazareth-galilee" ? [
    { label: "All tours", search: {} },
    { label: "From Jerusalem", search: { origin: "jerusalem" } },
    { label: "From Tel Aviv", search: { origin: "tel-aviv" } },
    { label: "Jordan River stop", search: { destination: "jordan-river" } },
    { label: "Magdala", search: { q: "Magdala" } },
    { label: "Private tours", search: { format: "private" } },
    { label: "Guided group tours", search: { format: "shared" } },
    { label: "Full day", search: { length: "full-day" } },
    { label: "Shortest first", search: { sort: "duration" } },
  ] : [
    { label: "All tours", search: {} },
    { label: "From Tel Aviv", search: { origin: "tel-aviv" } },
    { label: "From Jerusalem", search: { origin: "jerusalem" } },
    { label: "Rosh Hanikra routes", search: { q: "Rosh Hanikra" } },
    { label: "Small groups", search: { q: "Small group" } },
    { label: "Guided groups", search: { format: "shared" } },
    { label: "Private tours", search: { format: "private" } },
    { label: "Shortest first", search: { sort: "duration" } },
  ];
  const all = toursForCategory(categoryId);
  const visible = filterTours(categoryId, filters);
  const owner = visible.filter(isOwnerTour);
  const external = visible.filter(tour => !isOwnerTour(tour));
  const origins = tourPlaces.filter(place => all.some(tour => tour.originIds.includes(place.id)));
  const destinations = tourPlaces.filter(place => all.some(tour => tour.destinationIds.includes(place.id)));
  const tags = tourTags.filter(tag => all.some(tour => tour.tagIds.includes(tag.id)));
  const set = (key: keyof TourSearch, value: string) => onChange({ ...filters, [key]: value || undefined }, key === "q");
  const active = Object.keys(filters).some(key => key !== "sort");
  return <div id="tour-catalog" className={compact ? "mt-7 scroll-mt-24" : "mt-10 scroll-mt-24"}>
    {compact ? <nav aria-label={`Filter ${getTourCategory(categoryId).shortTitle} tours`} className="rounded-xl border bg-secondary/25 px-3 py-3 sm:px-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <span className="mr-1 shrink-0 text-xs font-semibold text-muted-foreground">Show:</span>
        {compactChips.map(item => {
          const selected = Object.entries(item.search).length === Object.entries(filters).length && Object.entries(item.search).every(([key, value]) => filters[key as keyof TourSearch] === value);
          return <button key={item.label} type="button" className="chip shrink-0 text-xs" aria-pressed={selected} onClick={() => onChange(item.search)}>{item.label}</button>;
        })}
      </div>
    </nav> : <form role="search" aria-label="Find a tour in this category" onSubmit={event => event.preventDefault()} className="rounded-2xl border bg-secondary/40 p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold">Search tours<input type="search" value={filters.q || ""} onChange={event => set("q", event.target.value)} placeholder="Place or interest" maxLength={80} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal" /></label>
        <label className="text-xs font-semibold">Start from<select value={filters.origin || ""} onChange={event => set("origin", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">All departures</option>{origins.map(origin => <option key={origin.id} value={origin.id}>{origin.label}</option>)}</select></label>
        <label className="text-xs font-semibold">Duration<select value={filters.length || ""} onChange={event => set("length", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">Any duration</option><option value="short">Up to half a day</option><option value="full-day">Full day</option></select></label>
        <label className="text-xs font-semibold">Experience<select value={filters.format || ""} onChange={event => set("format", event.target.value)} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base font-normal"><option value="">All experiences</option><option value="shared">Shared guided experience</option><option value="private">Private</option><option value="independent">Shared transport & host</option></select></label>
      </div>
      {destinations.length > 1 && <div className="mt-4"><p className="text-xs font-semibold">Destinations</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" className="chip" aria-pressed={!filters.destination} onClick={() => set("destination", "")}>All destinations</button>{destinations.map(place => <button key={place.id} type="button" className="chip" aria-pressed={filters.destination === place.id} onClick={() => set("destination", filters.destination === place.id ? "" : place.id)}>{place.label}</button>)}</div></div>}
      {tags.length > 1 && <div className="mt-4"><p className="text-xs font-semibold">Interests</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" className="chip" aria-pressed={!filters.tag} onClick={() => set("tag", "")}>All interests</button>{tags.map(tag => <button key={tag.id} type="button" className="chip" aria-pressed={filters.tag === tag.id} onClick={() => set("tag", filters.tag === tag.id ? "" : tag.id)}>{tag.label}</button>)}</div></div>}
    </form>}
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "experience" : "experiences"}</p>
      <div className="flex flex-wrap items-center gap-3">{!compact && active && <button type="button" onClick={() => onChange({})} className="text-sm font-semibold text-primary underline">Clear filters</button>}{!compact && <label className="text-xs text-muted-foreground">Sort by <select aria-label="Sort tours" value={filters.sort || ""} onChange={event => set("sort", event.target.value)} className="ml-1 rounded-lg border bg-background p-2 text-sm text-foreground"><option value="">Featured</option><option value="duration">Shortest duration</option><option value="title">Title A–Z</option></select></label>}</div>
    </div>
    {visible.length === 0 ? <section className="mt-5 rounded-2xl border p-8 text-center"><h2 className="text-2xl font-semibold">No tours match these choices</h2><p className="mt-3 text-muted-foreground">Try another departure, destination or interest.</p><button type="button" className="btn btn-primary mt-5" onClick={() => onChange({})}>Show all tours in this category</button></section> : <>
      {!compact && <OwnerTourSection tours={owner} />}
      {external.length > 0 && <section id="external-tours" aria-labelledby="external-tours-h" data-section="external-tours" className={compact ? "mt-5 scroll-mt-24" : "mt-12 scroll-mt-24 border-t pt-8"}>
        <h2 id="external-tours-h" className={compact ? "text-2xl font-semibold" : "text-3xl font-semibold"}>{compact ? `Explore ${getTourCategory(categoryId).shortTitle} tours` : `${owner.length > 0 ? "More " : ""}${getTourCategory(categoryId).title}`}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{compact ? (categoryId === "jerusalem" ? "Compare guided walks, cultural experiences and day trips from Jerusalem or Tel Aviv. Explore the options below to find the right experience for your visit." : categoryId === "tel-aviv-jaffa" ? "Compare guided walks, food and culture tours, cycling and audio experiences around Tel Aviv & Jaffa." : categoryId === "masada-dead-sea" ? "Compare classic Masada guided tours, sunrise hikes, Ein Gedi combinations and Dead Sea beach days from Jerusalem or Tel Aviv." : categoryId === "bethlehem-jericho" ? "Compare Bethlehem highlights with longer tours visiting Jericho and the Qasr al-Yahud baptismal site. Each card identifies the actual stops and departure city." : categoryId === "nazareth-galilee" ? "Compare Nazareth, Sea of Galilee churches and day trips with or without a Yardenit Jordan River stop, with both shared and privately guided options." : "Compare guided trips to Caesarea, Haifa and Akko from Tel Aviv or Jerusalem, including small groups, private guiding and routes with an advertised Rosh Hanikra stop.") : "Discover guided itineraries, local walks and specialist activities from independent operators. Each card identifies the departure, experience and booking site."}</p>
        <ul aria-label="External tours" className={compact ? "mt-5 grid gap-3 md:grid-cols-2" : "mt-6 grid gap-5 sm:grid-cols-2"}>{external.map(tour => <ExternalTourCard key={tour.id} tour={tour} pageId={`tours-${categoryId}`} compact={compact} />)}</ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Tour details, availability, prices and booking conditions are set by the tour operators and may change. Before booking, check the current departure date and location, itinerary, guiding, admissions, meeting and return arrangements, and cancellation policy directly with the booking provider. Each tour is subject to the operator's own terms and conditions.</p>
      </section>}
      {compact && <OwnerTourSection tours={owner} compact />}
    </>}
  </div>;
}
