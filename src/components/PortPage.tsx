import { Link } from "@tanstack/react-router";
import { CalendarDays, Compass, Smartphone, TrainFront } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs, Checklist, FaqList, Section, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { ShoreQuoteForm } from "@/components/ShoreQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { getShoreCatalog, getShorePort, shoreExcursionBenefits } from "@/data/shoreExcursions";
import { publicSources, shorePorts, travelGuidePaths, type ShorePortId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, pageMeta } from "@/lib/site";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { ShoreServiceCatalog } from "@/components/ShoreServiceCatalog";
import { ShoreReadingGuides } from "@/components/ShoreReadingGuides";
import { parseShoreServiceSearch, shoreSourceIds, type ShoreServiceSearch } from "@/lib/shore-services";
import { JerusalemClusterLinks } from "@/components/JerusalemClusterLinks";
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

const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

const practicalGuides = [
  { title: "Israel holidays & special dates", description: "Check closures and holiday schedules on your port-call date.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Travel eSIM for Israel", description: "Stay in contact with your driver or tour operator while ashore.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "Getting around Israel", description: "Understand intercity journeys and practical onward transport.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel travel tips", description: "Plan what to bring, local essentials and a smoother sightseeing day.", to: travelGuidePaths.travelTips, icon: Compass },
] as const;


export function PortPage({ id, filters: routeSearch, onFilterChange }: { id: ShorePortId; filters: ShoreServiceSearch; onFilterChange: (filters: ShoreServiceSearch) => void }) {
  // The router also retains raw query keys; discard retired and invalid filters at the page boundary.
  const filters = parseShoreServiceSearch(routeSearch);
  const port = getShorePort(id);
  const [itineraryId, setItineraryId] = useState("");
  const photos = [port.photo, ...getShoreCatalog(id).map((service) => service.photo), ...port.related.map((guide) => guide.photo), airportTransferPhotos["moshe"]!].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <header className="pt-6">
      <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      <nav aria-label="Choose your cruise port" className="mt-5 flex flex-wrap gap-2">{(Object.keys(shorePorts) as ShorePortId[]).map((portId) => <Link key={portId} to={shorePorts[portId].path} className="chip inline-block" activeProps={{ "aria-current": "page", className: "bg-navy text-navy-foreground" }}>{shorePorts[portId].name} Port</Link>)}</nav>
      <GuideHeroLayout image={<GuideHeroMedia src={port.photo.src} alt={port.photo.alt} compact />}>
        <p className="eyebrow">Your ship. Your day ashore.</p>
        <h1 className="guide-page-title mt-3">{port.title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{port.intro}</p>
        <PageUpdated date={SHORE_EXCURSION_UPDATED_DATE} />
        <div className="mt-5"><a href="#request-quote" onClick={focusQuote} className="btn btn-primary">Request a private day trip</a></div>
      </GuideHeroLayout>
      <AuthorCard introduction />
    </header>


    <ShoreServiceCatalog portId={id} filters={filters} onFilterChange={onFilterChange} itineraryId={itineraryId} onSelectItinerary={(next) => { setItineraryId(next); focusQuote(); }} />

    <Section id="overview" title={`Choosing the right shore excursion from ${port.name}`}>
      <p>{port.answer}</p>
      {port.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </Section>
    <Section id="route-fit" title={`Which excursion fits your ${port.name} port call?`}>
      <p>These are planning tradeoffs, not promised journey durations. Count from your permitted disembarkation and actual pickup until the return deadline, allowing time for traffic, walking and port entry.</p>
      <div role="region" aria-label={`Route choices from ${port.name} Port`} tabIndex={0} className="mt-5 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[680px] text-left text-sm">
          <caption className="sr-only">Destination, who it suits and the main time or access constraint</caption>
          <thead className="bg-secondary"><tr><th scope="col" className="p-3">Route</th><th scope="col" className="p-3">A good fit for</th><th scope="col" className="p-3">Main constraint</th></tr></thead>
          <tbody className="divide-y">{port.routeFit.map((choice) => <tr key={choice.route}><th scope="row" className="p-3 font-semibold">{choice.route}</th><td className="p-3">{choice.goodFor}</td><td className="p-3">{choice.constraint}</td></tr>)}</tbody>
        </table>
      </div>
      {id === "ashdod" && <p className="mt-4 text-sm">For Masada, the <a href="https://en.parks.org.il/reserve-park/masada-national-park" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">official park page</a> lists advance visit coordination and the last cable-car ascent one hour before closing. Check the current visit slot before treating it as a cruise-day stop.</p>}
    </Section>
    <Section id="port-access" title={port.portAccess.heading}>
      {port.portAccess.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <p className="text-sm"><a href={port.portAccess.source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">{port.portAccess.source.title} (official source)</a></p>
    </Section>
    <section aria-labelledby="benefits-h" className="mt-12"><h2 id="benefits-h" className="text-3xl">What a private car and driver covers</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{shoreExcursionBenefits.map((benefit) => <li key={benefit.title} className="rounded-xl border bg-card p-5"><h3 className="text-xl">{benefit.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></li>)}</ul></section>

    <Section id="timing" title="Work back from your all-aboard time">
      <p>Docking, disembarkation, pickup and all-aboard are different times. Give the operator the ship's actual schedule and allow for the port's exit and re-entry procedures, road traffic and a return buffer before you need to be on board.</p>
      <p>Agree which stops will be shortened or removed if the ship is late. Ask for a planned return time and the terms for an itinerary change or missed port call in writing. Even a published excursion may not fit a short port call.</p>
    </Section>
    <Section id="format" title="Private driver, licensed guide or shared excursion?">
      <p><strong>Car-and-driver cards cover private transportation for your party.</strong> A driver is not automatically a licensed guide, and admission or guided visits inside attractions are not included in these starting prices.</p>
      <p>Guided excursions have their own operator, guide, group format, inclusions and booking conditions. For my car-and-driver routes, request licensed guiding separately and confirm the extra cost.</p>
    </Section>
    <section id="check" aria-labelledby="check-h" className="mt-14 scroll-mt-24">
      <h2 id="check-h" className="text-3xl">Before confirming your excursion</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Checklist title="Your ship & return" items={["Ship name, call date and expected disembarkation", "All-aboard deadline and planned port-return buffer", "Exact meeting point and any port-shuttle arrangements", "Delay, cancellation and missed-call policy"]} />
        <Checklist title="Your party & itinerary" items={["All passengers, children's ages and requested seats", "Walking pace, steps, accessibility and equipment", "Which sites are open and which stops are agreed", "Full price, exclusions, any guide, payment and deposit"]} />
      </div>
    </section>
    <FaqList faqs={port.faqs} />
    <section aria-labelledby="ready-h" className="mt-14 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8"><h2 id="ready-h" className="text-3xl">Request an itinerary from {port.name}</h2><p className="mt-3 opacity-90">Send your ship's arrival and all-aboard times, party size and preferred route. I will reply with an itinerary and quote for your review.</p><a href="#request-quote" onClick={focusQuote} className="btn btn-light mt-5">Request a personal quote</a></section>
    {id === "ashdod" && <JerusalemClusterLinks pageKey="shore-ashdod" />}
    <ShoreReadingGuides guides={port.related} />
    <section id="practical-cruise-guides" aria-labelledby="practical-cruise-guides-h" className="mt-10">
      <h2 id="practical-cruise-guides-h" className="text-2xl font-semibold">Practical guides for your day ashore</h2>
      <p className="mt-2 text-sm text-muted-foreground">Useful reading for planning your visit beyond the excursion itself.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {practicalGuides.map((guide) => { const Icon = guide.icon; return <li key={guide.to}>
          <Link to={guide.to} className="group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-secondary/25 p-3.5 transition-colors hover:border-primary/50 hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-background text-primary"><Icon size={20} aria-hidden /></span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{guide.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
            </span>
          </Link>
        </li>; })}
      </ul>
    </section>
    <ShoreQuoteForm key={id} portId={id} itineraryId={itineraryId} onItineraryChange={setItineraryId} />
    <SourceList ids={shoreSourceIds(id)} intro="Product pages were checked for itinerary, duration and port pickup/return. External starting prices are dated reference snapshots, not live prices or confirmed availability. Published ILS rates apply only to my named day trips; external tours are booked on GetYourGuide or Viator under their own terms." />
    <details className="mt-10 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Excursion image credits</summary><ul className="mt-3 space-y-3">{[...new Map(photos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><p className="text-sm">{photo.alt}</p><GuidePhotoCredit photo={photo} insideDisclosure /></li>)}</ul></details>
  </main>;
}
