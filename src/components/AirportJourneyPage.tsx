import { Link } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { GuidePhotoCredit, GuideParagraph } from "@/components/TravelGuide";
import { AuthorCard } from "@/components/AuthorCard";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { airportJourneyGuides, airportJourneyIds, type AirportJourneyId, type JourneyOption } from "@/data/airportJourneyGuides";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { authorLd } from "@/lib/author";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";

const PUBLISHED_REVIEW = "2026-10-18";
const sources = [
  { title: "Israel Railways — schedules and actual fares", url: "https://www.rail.co.il/" },
  { title: "Israel Airports Authority — transport and terminal directions", url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038" },
  { title: "Gett — official airport taxi instructions", url: "https://www.gett.com/il/airport-en/" },
  { title: "National public-transport journey information", url: "https://bus.gov.il/" },
  { title: "Egged — relevant intercity bus schedules", url: "https://www.egged.co.il/" },
  { title: "Tel Aviv municipality — weekend bus network", url: "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx" },
];

function transferIdFor(id: AirportJourneyId) {
  return id === "ein-bokek" ? "dead-sea" : id;
}
function rateFor(id: AirportJourneyId) {
  return getAirportRouteGuide(transferIdFor(id)).rate.price;
}
function sectionId(id: string) { return "option-" + id; }

export function airportJourneyMeta(id: AirportJourneyId) {
  const guide = airportJourneyGuides[id];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Travel guides", path: "/guides/" },
    { name: "How to get to " + guide.city, path: guide.path },
  ];
  const head = pageMeta({ title: guide.title, description: guide.description, path: guide.path, type: "article", image: guide.photo.src, imageAlt: guide.photo.alt, crumbs });
  const url = CANONICAL_ORIGIN + guide.path;
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "Article",
    "@id": url + "#article", mainEntityOfPage: url,
    headline: guide.title, description: guide.description, inLanguage: "en",
    dateModified: guide.updatedAt || PUBLISHED_REVIEW, author: authorLd(),
    publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    image: new URL(guide.photo.src, CANONICAL_ORIGIN).href,
    citation: (guide.sources || sources).map((source) => source.url),
  })] };
}

function PrivateRideCta({ id }: { id: AirportJourneyId }) {
  const guide = airportJourneyGuides[id];
  const portrait = airportTransferPhotos["moshe"]!;
  return (
    <aside aria-label={"Private transfer quote for " + guide.city} className="mx-auto mt-9 max-w-4xl rounded-xl border border-primary/20 bg-secondary/50 p-4 sm:p-5">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">A comfortable arrival, arranged for you</p>
          <h2 className="mt-1.5 text-xl font-semibold sm:text-2xl">Prefer a private ride to {guide.city}?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">I'll help arrange a door-to-door airport pickup that suits your flight, luggage and party. Tell me where you're staying for a personal quote.</p>
          <a href="#request-quote" className="mt-3 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{guide.privateLabel} <span aria-hidden="true" className="ml-2">→</span></a>
        </div>
        <img src={portrait.src} alt="Moshe Barak" width={112} height={140} loading="lazy" decoding="async" className="h-24 w-20 shrink-0 rounded-lg object-cover object-top sm:h-32 sm:w-24" />
      </div>
    </aside>
  );
}

function OptionSection({ option }: { option: JourneyOption }) {
  return (
    <section id={sectionId(option.id)} aria-labelledby={sectionId(option.id) + "-h"} className="mt-12 scroll-mt-28">
      <h3 id={sectionId(option.id) + "-h"} className="text-2xl font-semibold">{option.heading}</h3>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
        {option.paragraphs.map((paragraph) => <p key={paragraph}><GuideParagraph paragraph={paragraph} inlineLinks={option.inlineLinks} /></p>)}
      </div>
      <div className="mt-4 rounded-xl bg-secondary/50 p-5">
        <h4 className="font-semibold">Before choosing this option</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {option.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {option.id === "private" && <p className="mt-4"><a href="#request-quote" className="font-semibold text-primary underline underline-offset-4">Ask me for a private-transfer quote →</a></p>}
    </section>
  );
}

export function AirportJourneyPage({ id }: { id: AirportJourneyId }) {
  const g = airportJourneyGuides[id];
  const privateRate = rateFor(id);
  const links = [
    ["comparison", "At-a-glance comparison"],
    ["station-choice", "Stations & connections"],
    ["options", "All transport options"],
    ["shabbat", "Shabbat & holidays"],
    ["tips", "Planning tips"],
    ["faq", "Questions"],
    ["sources", "Sources"],
    ["request-quote", "Private transfer quote"],
  ] as const;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }, { name: "How to get to " + g.city, to: g.path }]} />
        <p className="eyebrow mt-6">Independent transport comparison · Ben Gurion Airport (TLV)</p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{g.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{g.intro}</p>
        <p className="mt-3 text-sm text-muted-foreground">Approximate distance: {g.distance} · Editorial review: {g.updatedAt || PUBLISHED_REVIEW}</p>
        <figure className="mt-7"><img src={g.photo.src} alt={g.photo.alt} width={1200} height={675} fetchPriority="high" decoding="async" className="aspect-[16/9] max-h-[450px] w-full rounded-2xl object-cover"/><GuidePhotoCredit photo={g.photo} /></figure>
        <AuthorCard />
      </header>
      <section id="quick-answer" aria-labelledby="quick-answer-h" className="mt-8 rounded-2xl border border-primary/20 bg-secondary/60 p-6">
        <h2 id="quick-answer-h" className="text-2xl">Quick answer: what is the best way to get there?</h2>
        <p className="mt-3 leading-relaxed">{g.answer}</p>
        <p className="mt-3 text-sm text-muted-foreground">This is an all-transport guide, not a private-transfer booking page. See the different price bases before comparing cost.</p>
      </section>
      <OnThisPage sections={links} />
      <Section id="comparison" title={"Compare all ways from TLV Airport to " + g.city}>
        <p>Choose by the full journey to your address, not only the lowest fare or the fastest station-to-station time. The figures below are planning estimates, not real-time quotes.</p>
        <div role="region" aria-label={"Travel options to " + g.city} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border bg-card">
          <table className="min-w-[760px] w-full text-left text-sm">
            <caption className="sr-only">Compare estimated duration, fare basis, suitability and door-to-door service</caption>
            <thead className="bg-secondary">
              <tr>{["Option", "Typical time", "Indicative cost", "Best for", "To your door?", "Service"].map(t=><th key={t} scope="col" className="p-3 font-semibold">{t}</th>)}</tr>
            </thead>
            <tbody className="divide-y">{g.options.map(option=>(
              <tr key={option.id}>
                <th scope="row" className="p-3 font-semibold"><a href={"#" + sectionId(option.id)} className="text-primary underline underline-offset-2">{option.name}</a></th>
                <td className="p-3">{option.time}</td>
                <td className="p-3">{option.id === "private" ? <span>From ₪{privateRate.amount.toLocaleString("en-US")}/vehicle on weekdays; written quote required</span> : option.cost}</td>
                <td className="p-3">{option.bestFor}</td><td className="p-3">{option.doorToDoor}</td><td className="p-3">{option.availability}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-3 text-sm"><strong>*Price and time note:</strong> {g.historicalPrices === false ? "The train and bus prices must be checked in the official planner for your travel date; this guide does not quote an unverified current fare. " : "₪ ranges are historical editorial estimates from August 2026; they are not current verified fares. " }Train and bus prices are per passenger; official taxis use the regulated meter, and rental totals depend on dates. My displayed starting price is a one-way weekday <strong>per-vehicle</strong> rate for up to four passengers with possible extra charges. All schedules can change. Check the operator and any written quote before you travel.</p>
      </Section>
      <PrivateRideCta id={id}/>
      <Section id="station-choice" title={"Train stations, changes and the final journey in " + g.city}>
        {g.photos?.station && <figure className="mb-6 max-w-3xl"><img src={g.photos.station.src} alt={g.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /><GuidePhotoCredit photo={g.photos.station} /></figure>}
        <p><GuideParagraph paragraph={g.trainIntro} inlineLinks={g.stationLinks} /></p>
        <div className="mt-4 max-w-full overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[540px] text-left text-sm">
            <caption className="sr-only">Useful stations and connections</caption>
            <thead className="bg-secondary"><tr><th className="p-3">Station / service</th><th className="p-3">Typical journey segment</th><th className="p-3">Where it helps</th></tr></thead>
            <tbody className="divide-y">{g.stations.map(s=><tr key={s.name}><th scope="row" className="p-3">{s.name}</th><td className="p-3">{s.time}</td><td className="p-3">{s.usefulFor}</td></tr>)}</tbody>
          </table>
        </div>
        <h3 className="mt-6 text-xl font-semibold">Reaching the exact hotel</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5">{g.connections.map(p=><li key={p}>{p}</li>)}</ul>
      </Section>
      <section id="options" aria-labelledby="options-h" className="mt-14 scroll-mt-28">
        <h2 id="options-h" className="text-3xl">How each transport option works</h2>
        {g.photos?.onward && <figure className="mt-6 max-w-3xl"><img src={g.photos.onward.src} alt={g.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /><GuidePhotoCredit photo={g.photos.onward} /></figure>}
        {g.options.map(o=><OptionSection key={o.id} option={o}/>)}
      </section>
      <Section id="shabbat" title="Getting there on Shabbat and Jewish holidays">
        {g.weekend.map(p=><p key={p}><GuideParagraph paragraph={p} inlineLinks={g.weekendLinks} /></p>)}
        {!g.weekendLinks?.length && <p>For terminal-specific weekend travel, see my <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className="text-primary underline">Ben Gurion Airport Shabbat guide</Link>.</p>}
      </Section>
      <Section id="tips" title="Practical tips to avoid missed connections and extra costs">
        <ul className="list-disc space-y-3 pl-5">{g.advice.map(t=><li key={t}>{t}</li>)}</ul>
        <p>For first-time arrivals, read my <Link to="/travel-blog/ben-gurion-airport-arrival-tips/" className="text-primary underline">airport arrivals checklist</Link> and save the operator's contact details offline.</p>
      </Section>
      <FaqList faqs={g.faqs}/>
      <SourcesDisclosure>
        <p className="mt-3 text-sm text-muted-foreground">Schedules, routes, meeting points, fares and access can change. Refer to official provider pages for actual travel dates. {g.historicalPrices === false ? "Displayed rail and bus costs are not price quotes; verify current prices before travel." : "Cost ranges are historical August 2026 editorial estimates, not verified current fares."}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">{(g.sources || sources).map(s=><li key={s.url}><a className="block rounded-lg border bg-card p-4 font-medium text-primary underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span className="sr-only">(opens a new tab)</span></a></li>)}

        </ul>
      </SourcesDisclosure>
      <RelatedLinks title="Related practical guides" items={[
        ...g.related,
        { label: "Taxi fares in Israel", to: "/travel-blog/taxi-fares-in-israel/" },
        { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
      ]} />
      <RelatedLinks title="Other airport journey comparisons" items={airportJourneyIds.filter(other => other !== id).map(other => ({ label: "How to get to " + airportJourneyGuides[other].city, to: airportJourneyGuides[other].path }))} />
      <TransferQuoteForm key={transferIdFor(id)} destinationId={transferIdFor(id)} fixedDestination fixedDestinationLabel={g.city} />
    </main>
  );
}
