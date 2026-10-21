import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs, Checklist, FaqList, OnThisPage, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { ShoreQuoteForm } from "@/components/ShoreQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { getShoreCatalog, getShorePort, shoreExcursionBenefits } from "@/data/shoreExcursions";
import { publicSources, SHORE_EXCURSION_CHECK_DATE, shorePorts, type ShorePortId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, pageMeta } from "@/lib/site";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { ShoreServiceCatalog } from "@/components/ShoreServiceCatalog";
import { parseShoreServiceSearch, shoreSourceIds, type ShoreServiceSearch } from "@/lib/shore-services";

function crumbsFor(id: ShorePortId) {
  return [{ name: "Home", path: "/" as const }, { name: "Shore excursions", path: "/shore-excursions/" as const }, { name: `From ${shorePorts[id].name} Port`, path: shorePorts[id].path }];
}

export function shorePortMeta(id: ShorePortId) {
  const port = getShorePort(id);
  const meta = pageMeta({ title: port.title, description: port.description, path: port.path, type: "article", crumbs: crumbsFor(id), image: port.photo.src, imageAlt: port.photo.alt });
  const imageUrl = new URL(port.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, scripts: [...meta.scripts, {
    type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: port.title, description: port.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${port.path}`, inLanguage: "en", dateModified: SHORE_EXCURSION_CHECK_DATE,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME }, image: imageUrl,
      citation: publicSources(shoreSourceIds(id)).map((source) => source.url),
    }).replaceAll("<", "\\u003c"),
  }] };
}

const sections = [["itineraries", "Tours & day trips"], ["request-quote", "Request a quote"], ["timing", "Ship timing"], ["format", "Driver or guide"], ["check", "Before booking"], ["faq", "FAQ"], ["sources", "Sources"]] as const;
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

export function PortPage({ id, filters: routeSearch, onFilterChange }: { id: ShorePortId; filters: ShoreServiceSearch; onFilterChange: (filters: ShoreServiceSearch) => void }) {
  // The router also retains raw query keys; discard retired and invalid filters at the page boundary.
  const filters = parseShoreServiceSearch(routeSearch);
  const port = getShorePort(id);
  const [itineraryId, setItineraryId] = useState("");
  const photos = [port.photo, ...getShoreCatalog(id).map((service) => service.photo), airportTransferPhotos["moshe"]!].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-5xl px-4 pb-24 lg:pb-8">
    <header className="pt-6">
      <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      <nav aria-label="Choose your cruise port" className="mt-5 flex flex-wrap gap-2">{(Object.keys(shorePorts) as ShorePortId[]).map((portId) => <Link key={portId} to={shorePorts[portId].path} className="chip inline-block" activeProps={{ "aria-current": "page", className: "bg-navy text-navy-foreground" }}>{shorePorts[portId].name} Port</Link>)}</nav>
      <div className="mt-6 grid items-center gap-7 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">Your ship. Your day ashore.</p>
          <h1 className="mt-3 text-4xl leading-[1.1] md:text-5xl">{port.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{port.intro}</p>
          <div className="mt-5"><a href="#request-quote" onClick={focusQuote} className="btn btn-primary">Request a private day trip</a></div>
        </div>
        <figure><img src={port.photo.src} alt={port.photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover" /><GuidePhotoCredit photo={port.photo} /></figure>
      </div>
      <PageUpdated date={SHORE_EXCURSION_CHECK_DATE} />
      <AuthorCard />
    </header>

    <section aria-labelledby="answer-h" className="mt-7 rounded-2xl border border-primary/20 bg-secondary/60 p-5 sm:p-6"><h2 id="answer-h" className="text-2xl">Find your ideal day ashore</h2><p className="mt-3 leading-relaxed">{port.answer}</p></section>
    <OnThisPage sections={sections} />

    <ShoreServiceCatalog portId={id} filters={filters} onFilterChange={onFilterChange} itineraryId={itineraryId} onSelectItinerary={(next) => { setItineraryId(next); focusQuote(); }} />

    <ShoreQuoteForm key={id} portId={id} itineraryId={itineraryId} onItineraryChange={setItineraryId} />

    <Section id="overview" title={`Make the most of your day from ${port.name}`}>
      {port.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </Section>
    <section aria-labelledby="benefits-h" className="mt-12"><h2 id="benefits-h" className="text-3xl">A private day, planned around you</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{shoreExcursionBenefits.map((benefit) => <li key={benefit.title} className="rounded-xl border bg-card p-5"><h3 className="text-xl">{benefit.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></li>)}</ul></section>

    <Section id="timing" title="Work back from your all-aboard time">
      <p>Docking, disembarkation, pickup and all-aboard are different times. Give the operator the ship's actual schedule and allow for the port's exit and re-entry procedures, road traffic and a return buffer before you need to be on board.</p>
      <p>Agree which stops will be shortened or removed if the ship is late. Ask for a planned return time and the terms for an itinerary change or missed port call in writing. A published excursion is an idea to assess against your schedule, not a promise that it fits every cruise.</p>
    </Section>
    <Section id="format" title="Private driver, licensed guide or shared excursion?">
      <p><strong>Car-and-driver cards cover private transportation for your party.</strong> A driver is not automatically a licensed guide, and admission or guided visits inside attractions are not included in these starting prices.</p>
      <p>Guided excursions have their own operator, guide, group format, inclusions and booking conditions. For Moshe's car-and-driver routes, request licensed guiding separately and confirm the extra cost.</p>
    </Section>
    <section id="check" aria-labelledby="check-h" className="mt-14 scroll-mt-24">
      <h2 id="check-h" className="text-3xl">Before confirming your excursion</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Checklist title="Your ship & return" items={["Ship name, call date and expected disembarkation", "All-aboard deadline and planned port-return buffer", "Exact meeting point and any port-shuttle arrangements", "Delay, cancellation and missed-call policy"]} />
        <Checklist title="Your party & itinerary" items={["All passengers, children's ages and requested seats", "Walking pace, steps, accessibility and equipment", "Which sites are open and which stops are agreed", "Full price, exclusions, any guide, payment and deposit"]} />
      </div>
    </section>
    <FaqList faqs={port.faqs} />
    <section aria-labelledby="ready-h" className="mt-14 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8"><h2 id="ready-h" className="text-3xl">Let's plan your day from {port.name}</h2><p className="mt-3 opacity-90">Share your ship's timetable, party size and favorite itinerary. Moshe will need to confirm the route, vehicle, total and booking terms.</p><a href="#request-quote" onClick={focusQuote} className="btn btn-light mt-5">Request a quote from Moshe</a></section>
    <RelatedLinks title="Useful guides for your day ashore" items={port.related} />
    <SourceList ids={shoreSourceIds(id)} intro="Product pages were checked for itinerary, duration and port pickup/return. External starting prices are dated reference snapshots, not live prices or confirmed availability. Published ILS rates apply only to Moshe's named day trips; external tours are booked on GetYourGuide or Viator under their own terms." />
    <details className="mt-10 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Excursion image credits</summary><ul className="mt-3 space-y-3">{[...new Map(photos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><p className="text-sm">{photo.alt}</p><GuidePhotoCredit photo={photo} /></li>)}</ul></details>
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><p className="text-sm font-medium">Private day ashore<br /><span className="text-xs text-muted-foreground">From {port.name} Port</span></p><a href="#request-quote" onClick={focusQuote} className="btn btn-primary shrink-0 text-sm">Request a quote</a></div></div>
  </main>;
}
