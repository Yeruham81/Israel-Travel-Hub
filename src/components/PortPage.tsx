import { Link } from "@tanstack/react-router";
import { CalendarDays, Compass, Smartphone, TrainFront, CarFront, CloudSun } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs, FaqList, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { ShoreQuoteForm } from "@/components/ShoreQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { getShoreCatalog, getShorePort } from "@/data/shoreExcursions";
import { publicSources, shorePorts, travelGuidePaths, type ShorePortId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, pageMeta } from "@/lib/site";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { ShoreServiceCatalog } from "@/components/ShoreServiceCatalog";
import { parseShoreServiceSearch, shoreSourceIds, type ShoreServiceSearch } from "@/lib/shore-services";
import { SHORE_EXCURSION_UPDATED_DATE } from "@/data/shoreHub";

function crumbsFor(id: ShorePortId) {
  return [{ name: "Home", path: "/" as const }, { name: "Shore excursions", path: "/shore-excursions/" as const }, { name: `From ${shorePorts[id].name} Port`, path: shorePorts[id].path }];
}

export function shorePortMeta(id: ShorePortId) {
  const port = getShorePort(id);
  const meta = pageMeta({ title: port.title, description: port.description, path: port.path, type: "article", crumbs: crumbsFor(id), image: port.photo.src, imageAlt: port.photo.alt });
  const imageUrl = new URL(port.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, scripts: [...meta.scripts, {
    type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: port.title, description: port.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${port.path}`, inLanguage: "en", dateModified: SHORE_EXCURSION_UPDATED_DATE,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME }, image: imageUrl,
      citation: publicSources(shoreSourceIds(id)).map((source) => source.url),
    }).replaceAll("<", "\\u003c"),
  }] };
}

const practicalGuides = [
  { title: "Israel holidays & opening hours", description: "Check holidays and closures that may affect your itinerary.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Travel eSIM for Israel", description: "Stay in contact with your driver or tour operator while ashore.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "Getting around Israel", description: "Explore transport choices beyond your cruise excursion.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel travel tips", description: "Prepare for local customs, weather and practical essentials.", to: travelGuidePaths.travelTips, icon: Compass },
  { title: "Taxis in Israel", description: "Understand licensed taxis for independent journeys.", to: travelGuidePaths.taxis, icon: CarFront },
  { title: "Best time to visit Israel", description: "Seasonal weather and conditions for sightseeing.", to: travelGuidePaths.bestTime, icon: CloudSun },
] as const;

export function PortPage({ id, filters: routeSearch, onFilterChange }: { id: ShorePortId; filters: ShoreServiceSearch; onFilterChange: (filters: ShoreServiceSearch) => void }) {
  const filters = parseShoreServiceSearch(routeSearch);
  const port = getShorePort(id);
  const [itineraryId, setItineraryId] = useState("");
  const photos = [port.photo, ...getShoreCatalog(id).map(service => service.photo), ...port.related.map(guide => guide.photo), airportTransferPhotos["moshe"]!].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <div className="pt-6"><Breadcrumbs items={crumbsFor(id).map(crumb => ({ name: crumb.name, to: crumb.path }))} /></div>
    <header className="mt-2">
      <GuideHeroLayout image={<GuideHeroMedia src={port.photo.src} alt={port.photo.alt} width={1200} height={450} compact />}>
        <p className="eyebrow">Private excursions, guided tours & cruise-port pickup</p>
        <h1 className="guide-page-title mt-3 font-semibold">{port.title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{port.intro}</p>
        <PageUpdated date={SHORE_EXCURSION_UPDATED_DATE} />
      </GuideHeroLayout>
    </header>
    <div className="mt-4"><AuthorCard introduction /></div>
    <ShoreServiceCatalog portId={id} filters={filters} onFilterChange={onFilterChange} itineraryId={itineraryId} onSelectItinerary={setItineraryId} />
    <section aria-labelledby="shore-planning-h" className="mt-12">
      <h2 id="shore-planning-h" className="text-2xl font-semibold">Choosing the right shore excursion from {port.name}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
        <p>{port.answer}</p>
        <p>{port.overview[0]}</p>
        <p><strong className="text-foreground">Port pickup:</strong> {port.portAccess.paragraphs[0]} <a href={port.portAccess.source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">Official {port.name} Port information</a>.</p>
        <p><strong className="text-foreground">Returning to the ship:</strong> Plan from the time you can actually disembark, not just the scheduled arrival. Confirm the pickup point, any shuttle, road-traffic allowance and return buffer before the all-aboard deadline. Ask what happens if your port call changes.</p>
        {id === "ashdod" && <p>For Masada, check <a href="https://en.parks.org.il/reserve-park/masada-national-park" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">official park and cable-car information</a> before planning your beach stop and return journey.</p>}
      </div>
    </section>
    <FaqList faqs={port.faqs} />
    <section aria-labelledby="shore-local-h" className="mt-12">
      <h2 id="shore-local-h" className="text-2xl font-semibold">Explore destinations from {port.name} further</h2>
      <p className="mt-2 text-sm text-muted-foreground">Discover the places you can include in your day ashore.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Useful guides for your day ashore">
        {port.related.map(guide => <article key={guide.to} role="listitem" className="min-w-0">
          <Link to={guide.to} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
            <img src={guide.photo.src} alt={guide.photo.alt} width={320} height={176} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <span className="flex flex-1 flex-col p-3.5">
              <span className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">{guide.title}</span>
              <span className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
              <span className="mt-auto pt-2 text-xs font-semibold text-primary">Read More</span>
            </span>
          </Link>
        </article>)}
      </div>
    </section>
    <section aria-labelledby="shore-practical-h" className="mt-12">
      <h2 id="shore-practical-h" className="text-2xl font-semibold">Practical guides for your trip to Israel</h2>
      <p className="mt-2 text-sm text-muted-foreground">Helpful information for your cruise stop and journeys beyond the excursion.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {practicalGuides.map(guide => {
          const Icon = guide.icon;
          return <Link key={guide.to} to={guide.to} className="group flex min-w-0 items-start gap-3 rounded-xl border bg-secondary/25 p-3.5 transition-colors hover:border-primary hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-primary">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-background text-primary"><Icon size={20} aria-hidden="true" /></span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{guide.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
            </span>
          </Link>;
        })}
      </div>
    </section>
    <ShoreQuoteForm key={id} portId={id} itineraryId={itineraryId} onItineraryChange={setItineraryId} />
    <SourceList ids={shoreSourceIds(id)} intro="Excursion listings describe published itineraries, not confirmed availability or live prices. My published ILS rates cover private transportation only. Confirm final prices, inclusions and port-return conditions with the operator." />
    <details className="mt-10 rounded-xl border p-4 text-sm">
      <summary className="cursor-pointer font-semibold">Image credits</summary>
      <div className="mt-3 space-y-3">{[...new Map(photos.map(photo => [photo.src, photo])).values()].map(photo => <GuidePhotoCredit key={photo.src} photo={photo} insideDisclosure />)}</div>
    </details>
  </main>;
}
