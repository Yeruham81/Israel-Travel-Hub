import { Link } from "@tanstack/react-router";
import { Anchor, ArrowRight, MapPin, Search } from "lucide-react";
import { tourCategories, tourCategoryPaths, tourCruisePhoto, tourCruisePorts, type TourCategoryId } from "@/data/tours";
import { tourPlaces } from "@/data/tourTypes";
import { parseTourHubSearch, placeLabel, tourCategoryResults, toursForCategory, type TourHubSearch } from "@/lib/tours";

export function TourCategoryExplorer({ filters, onChange }: { filters: TourHubSearch; onChange: (next: TourHubSearch, replace?: boolean) => void }) {
  const results = tourCategoryResults(filters);
  const origins = tourPlaces.filter(place => toursForCategory().some(tour => tour.originIds.includes(place.id)));
  return <section id="tour-categories" aria-labelledby="tour-categories-h" className="mt-10 scroll-mt-24">
    <p className="eyebrow">Explore by destination & interest</p>
    <h2 id="tour-categories-h" className="mt-2 text-3xl font-semibold">Find your next experience</h2>
    <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Discover Israel with a guide, enjoy a private day at your own pace or try something new close to your hotel. Historic cities, inspiring landscapes and memorable local flavours are a great place to start.</p>
    <form role="search" aria-label="Find tour categories" onSubmit={event => event.preventDefault()} className="mt-6 grid gap-4 rounded-2xl border bg-secondary/40 p-4 sm:grid-cols-[2fr_1fr] sm:p-5">
      <label className="text-sm font-semibold">Where would you like to go?<span className="relative mt-2 block"><Search aria-hidden className="absolute left-3 top-3 size-5 text-muted-foreground" /><input type="search" value={filters.q || ""} maxLength={80} placeholder="A destination or interest, e.g. Galilee or food" onChange={event => onChange(parseTourHubSearch({ ...filters, q: event.target.value }), true)} className="w-full rounded-xl border bg-background py-3 pl-11 pr-3 text-base font-normal" /></span></label>
      <label className="text-sm font-semibold">Start from<select value={filters.origin || ""} onChange={event => onChange(parseTourHubSearch({ ...filters, origin: event.target.value }))} className="mt-2 w-full rounded-xl border bg-background px-3 py-3 text-base font-normal"><option value="">Any departure city</option>{origins.map(origin => <option key={origin.id} value={origin.id}>{origin.label}</option>)}</select></label>
    </form>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p role="status" aria-live="polite" className="text-sm text-muted-foreground">{results.length} {results.length === 1 ? "category" : "categories"}{filters.origin ? ` · From ${placeLabel(filters.origin)}` : ""}</p>{(filters.q || filters.origin) && <button type="button" onClick={() => onChange({})} className="text-sm font-semibold text-primary underline">Clear search</button>}</div>
    {results.length ? <div className="mt-6 grid gap-6 md:grid-cols-2">{results.map(({ category, examples, search }) => <article key={category.id} id={`category-${category.id}`} data-category-id={category.id} className="group flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <Link to={tourCategoryPaths[category.id]} search={search} tabIndex={-1} aria-hidden className="overflow-hidden"><img src={category.photo.src} alt="" width={720} height={360} loading="lazy" decoding="async" className="aspect-[2/1] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105" /></Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6"><h3 className="text-2xl font-semibold leading-tight"><Link to={tourCategoryPaths[category.id]} search={search} className="hover:text-primary">{category.title}</Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.intro}</p>
        <ul aria-label={`${category.shortTitle} tour examples`} className="mb-5 mt-5 divide-y border-y">{examples.map(tour => <li key={tour.id} data-product-id={tour.id} className="py-3"><Link to={tourCategoryPaths[category.id]} search={search} hash={tour.id} className="font-semibold text-primary underline-offset-4 hover:underline">{tour.title}</Link><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tour.duration} · From {tour.originIds.map(placeLabel).join(" or ")}</p></li>)}</ul>
        <Link to={tourCategoryPaths[category.id]} search={search} className="btn btn-primary mt-auto w-full" aria-label={`Explore ${category.shortTitle} tours`}>Explore {category.shortTitle} tours</Link>
      </div>
    </article>)}</div> : <div className="mt-6 rounded-2xl border bg-card p-8 text-center"><h3 className="text-2xl font-semibold">No categories match your search</h3><p className="mt-3 text-muted-foreground">Try another destination or interest, or clear the search to see every category.</p><button type="button" onClick={() => onChange({})} className="btn btn-primary mt-5">Show all categories</button></div>}
  </section>;
}

export function MoreTourCategories({ currentId }: { currentId: TourCategoryId }) {
  const items = tourCategories.filter(category => category.id !== currentId).map(category => ({ id: category.id, title: category.shortTitle, description: category.intro, photo: category.photo, to: tourCategoryPaths[category.id] }));
  const cards = [...items, { id: "all", title: "All tours & day trips", description: "Find more ways to spend your days in Israel. Discover every destination and interest, from historic cities to the desert and the sea.", photo: tourCategories.find(category => category.id === currentId)!.photo, to: "/tours/" as const }];
  return <section aria-labelledby="more-tour-categories-h" className="mt-14"><p className="eyebrow">Keep exploring</p><h2 id="more-tour-categories-h" className="mt-2 text-3xl font-semibold">Explore more tour categories</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{cards.map(card => <li key={card.id} className="min-w-0"><article className="flex h-full gap-4 rounded-2xl border bg-card p-4 transition-shadow hover:border-primary/40 hover:shadow-md"><div className="flex min-w-0 flex-1 flex-col items-start"><h3 className="text-xl font-semibold leading-tight">{card.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p><Link to={card.to} className="mt-auto pt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline" aria-label={`Explore ${card.title}`}>Explore tours</Link></div><img src={card.photo.src} alt={card.photo.alt} width={160} height={200} loading="lazy" decoding="async" className="h-32 w-20 shrink-0 rounded-xl object-cover sm:w-24" /></article></li>)}</ul></section>;
}

export function TourCruiseCallout() {
  return <section aria-labelledby="cruise-h" className="mt-14 overflow-hidden rounded-3xl border bg-card shadow-sm">
    <div className="grid md:grid-cols-[0.9fr_1.3fr]"><img src={tourCruisePhoto.src} alt={tourCruisePhoto.alt} width={973} height={850} loading="lazy" decoding="async" className="h-64 w-full object-cover md:h-full md:min-h-96" />
      <div className="p-6 sm:p-8"><p className="eyebrow flex items-center gap-2"><Anchor aria-hidden className="size-4" />Make the most of your time ashore</p><h2 id="cruise-h" className="mt-3 text-3xl font-semibold leading-tight">A day ashore starts at your cruise port</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Step off the ship and into a memorable day in Israel. Explore inspiring places with pickup and return arrangements shaped around your port call.</p>
        <div className="mt-5 grid gap-3">{tourCruisePorts.map(port => <Link key={port.id} to={port.to} className="group flex items-center gap-4 rounded-2xl border bg-secondary/40 p-4 transition-colors hover:border-primary/50 hover:bg-secondary"><MapPin aria-hidden className="size-6 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h3 className="text-xl font-semibold text-primary">{port.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{port.description}</p><span className="mt-2 inline-block text-sm font-semibold text-primary">Explore shore excursions</span></div><ArrowRight aria-hidden className="size-5 shrink-0 text-primary transition-transform motion-safe:group-hover:translate-x-1" /></Link>)}</div>
      </div>
    </div>
  </section>;
}
