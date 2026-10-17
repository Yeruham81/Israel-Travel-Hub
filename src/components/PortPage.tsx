import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs, Checklist, FaqList, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { ShoreQuoteForm } from "@/components/ShoreQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { getShorePort, shoreExcursionBenefits } from "@/data/shoreExcursions";
import { publicSources, linksForPage, SHORE_EXCURSION_CHECK_DATE, shorePorts, type ShorePortId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, pageMeta } from "@/lib/site";
import { ExchangeRateNote, PriceDisplay } from "@/components/CurrencyRates";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";

function crumbsFor(id: ShorePortId) {
  return [{ name: "Home", path: "/" as const }, { name: "Shore excursions", path: "/shore-excursions/" as const }, { name: `From ${shorePorts[id].name} Port`, path: shorePorts[id].path }];
}

export function shorePortMeta(id: ShorePortId) {
  const port = getShorePort(id);
  const meta = pageMeta({ title: port.title, description: port.description, path: port.path, type: "article", crumbs: crumbsFor(id) });
  const imageUrl = new URL(port.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, meta: [...meta.meta, { property: "og:image", content: imageUrl }, { name: "twitter:image", content: imageUrl }], scripts: [...meta.scripts, {
    type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: port.title, description: port.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${port.path}`, inLanguage: "en", dateModified: SHORE_EXCURSION_CHECK_DATE,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME }, image: imageUrl,
      citation: publicSources([port.sourceId, port.alternativeSourceId]).map((source) => source.url),
    }).replaceAll("<", "\\u003c"),
  }] };
}

const sections = [["itineraries", "Destinations & prices"], ["request-quote", "Request a quote"], ["timing", "Ship timing"], ["format", "Driver or guide"], ["check", "Before booking"], ["faq", "FAQ"], ["sources", "Sources"]] as const;
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

export function PortPage({ id }: { id: ShorePortId }) {
  const port = getShorePort(id);
  const [itineraryId, setItineraryId] = useState("");
  const otherOperators = linksForPage(port.pageId).filter((link) => link.relationship !== "publisher_operator");
  const minimumRate = Math.min(...port.itineraries.map((itinerary) => itinerary.price.amount));
  const photos = [port.photo, ...port.itineraries.map((itinerary) => itinerary.photo), airportTransferPhotos["moshe"]!].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-5xl px-4 pb-24 lg:pb-8">
    <header className="pt-6">
      <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      <nav aria-label="Choose your cruise port" className="mt-5 flex flex-wrap gap-2">{(Object.keys(shorePorts) as ShorePortId[]).map((portId) => <Link key={portId} to={shorePorts[portId].path} className="chip inline-block" activeProps={{ "aria-current": "page", className: "bg-navy text-navy-foreground" }}>{shorePorts[portId].name} Port</Link>)}</nav>
      <div className="mt-6 grid items-center gap-7 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">Your ship. Your day ashore.</p>
          <h1 className="mt-3 text-4xl leading-[1.1] md:text-5xl">{port.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{port.intro}</p>
          <PriceDisplay amount={minimumRate} size="hero" className="mt-5" />
          <p className="mt-1 text-sm text-muted-foreground">Full-day return transport · per vehicle · up to 4 passengers</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Weekday starting rate for transport only. Guide, admissions, meals and tips excluded. Night, weekend and holiday supplements may apply; final quote by confirmation.</p>
          <ExchangeRateNote className="mt-3" />
          <a href="#request-quote" onClick={focusQuote} className="btn btn-primary mt-5">Request your {port.name} excursion</a>
        </div>
        <figure><img src={port.photo.src} alt={port.photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover" /><GuidePhotoCredit photo={port.photo} /></figure>
      </div>
      <PageUpdated date={SHORE_EXCURSION_CHECK_DATE} />
      <AuthorCard />
    </header>

    <section aria-labelledby="answer-h" className="mt-7 rounded-2xl border border-primary/20 bg-secondary/60 p-5 sm:p-6"><h2 id="answer-h" className="text-2xl">Which day trip should I choose?</h2><p className="mt-3 leading-relaxed">{port.answer}</p></section>
    <OnThisPage sections={sections} />

    <section id="itineraries" aria-labelledby="itineraries-h" className="mt-10 scroll-mt-24">
      <h2 id="itineraries-h" className="text-3xl">Popular day trips from {port.name} Port</h2>
      <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">Choose an idea to add it to your request. These are Moshe Barak's published private car-and-driver options, operated by the publisher's local transport business. Each route returns to {port.name} Port and must fit your ship's schedule.</p>
      <div className="mt-5 rounded-xl border bg-secondary/50 p-4 text-sm leading-relaxed"><strong>What the price covers:</strong> weekday transportation and a private driver for up to four passengers. <strong>Not included:</strong> licensed guiding, admission, meals and tips. Night, weekend and holiday supplements may apply. Larger parties need a separate quote; final price, site access and route feasibility require confirmation.</div>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {port.itineraries.map((itinerary) => <li key={itinerary.id} className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card ${itineraryId === itinerary.id ? "border-primary ring-1 ring-primary" : ""}`} data-testid="shore-itinerary-card">
          <img src={itinerary.photo.src} alt={itinerary.photo.alt} width={720} height={480} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Private day trip · return to {port.name}</p>
            <h3 className="mt-2 text-2xl">{itinerary.destination}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{itinerary.description}</p>
            <ul aria-label="Possible highlights" className="mt-4 flex flex-wrap gap-2">{itinerary.highlights.map((highlight) => <li key={highlight} className="rounded-full bg-secondary px-3 py-1 text-xs">{highlight}</li>)}</ul>
            <p className="mt-4 text-sm"><strong>Best for:</strong> {itinerary.bestFor}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{itinerary.planningNote}</p>
            <div className="mt-5 border-t pt-4"><p className="text-xs text-muted-foreground">Published starting rate</p><PriceDisplay amount={itinerary.price.amount} className="mt-1" /><p className="mt-2 text-xs text-muted-foreground">Per vehicle · up to 4 · transport only</p></div>
            <a href="#request-quote" onClick={() => { setItineraryId(itinerary.id); focusQuote(); }} className="btn btn-primary mt-4" aria-label={`Request ${itinerary.destination} from ${port.name}`}>{itineraryId === itinerary.id ? "Selected — request this day trip" : "Request this day trip"}</a>
          </div>
        </li>)}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">Have another destination in mind? <a href="#request-quote" onClick={() => { setItineraryId("other"); focusQuote(); }} className="font-medium text-primary underline">Ask for a custom itinerary</a>.</p>
    </section>

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
      <p><strong>The cards above are a private car-and-driver service.</strong> They cover transportation for your party. A driver is not automatically a licensed guide, and admission or guided visits inside attractions are not included in these starting prices.</p>
      <p>Request a licensed guide if you want a guided historical or religious visit, and confirm the extra cost. A shared guided excursion is another format: you join other passengers on a set itinerary, with a separate operator's inclusions, per-person pricing and conditions.</p>
    </Section>
    <section id="check" aria-labelledby="check-h" className="mt-14 scroll-mt-24">
      <h2 id="check-h" className="text-3xl">Before confirming your excursion</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Checklist title="Your ship & return" items={["Ship name, call date and expected disembarkation", "All-aboard deadline and planned port-return buffer", "Exact meeting point and any port-shuttle arrangements", "Delay, cancellation and missed-call policy"]} />
        <Checklist title="Your party & itinerary" items={["All passengers, children's ages and requested seats", "Walking pace, steps, accessibility and equipment", "Which sites are open and which stops are agreed", "Full price, exclusions, any guide, payment and deposit"]} />
      </div>
    </section>

    {otherOperators.length > 0 && <ProviderSection title="Prefer a separate guided excursion?" intro={<>The independent operator below lists its own {port.name}-port Jerusalem and Bethlehem tour. It is separate from Moshe's car-and-driver itineraries and starting rates above. Check its actual dates, guide, inclusions, suitability and cancellation terms on the operator's page.</>} links={otherOperators} pageId={port.pageId} />}
    <FaqList faqs={port.faqs} />
    <section aria-labelledby="ready-h" className="mt-14 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8"><h2 id="ready-h" className="text-3xl">Let's plan your day from {port.name}</h2><p className="mt-3 opacity-90">Share your ship's timetable, party size and favorite itinerary. Moshe will need to confirm the route, vehicle, total and booking terms.</p><a href="#request-quote" onClick={focusQuote} className="btn btn-light mt-5">Request a quote from Moshe</a></section>
    <RelatedLinks title="Useful guides for your day ashore" items={port.related} />
    <SourceList ids={[port.sourceId, port.alternativeSourceId]} intro="The local operator's published starting rates and itinerary descriptions were checked on the date below. They are not live prices or confirmed availability. Other operators' products have separate prices and terms." />
    <details className="mt-10 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Excursion image credits</summary><ul className="mt-3 space-y-3">{[...new Map(photos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><p className="text-sm">{photo.alt}</p><GuidePhotoCredit photo={photo} /></li>)}</ul></details>
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><p className="text-sm font-medium">Private day ashore<br /><span className="text-xs text-muted-foreground">From {port.name} Port</span></p><a href="#request-quote" onClick={focusQuote} className="btn btn-primary shrink-0 text-sm">Request a quote</a></div></div>
  </main>;
}
