import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { GuidePhotoCredit, GuideParagraph } from "@/components/TravelGuide";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { airportJourneyGuides, airportJourneyIds, type AirportJourneyId, type AirportJourneyGuide, type JourneyOption } from "@/data/airportJourneyGuides";
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

/**
 * A selective, action-oriented link rather than a repeated checklist.
 * Keep the warm highlight subtle and the link itself prominent.
 */
function UsefulJourneyLink({ label, href, context }: { label: string; href: string; context: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <aside aria-label={label} data-testid="useful-journey-link" className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 dark:border-amber-700/40 dark:bg-amber-950/20">
      <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 fill-amber-200/70 text-amber-600 dark:fill-amber-500/25 dark:text-amber-400" />
      <div className="min-w-0">
        <p className="text-sm leading-relaxed">
          <a href={href} className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{context}</p>
      </div>
    </aside>
  );
}

/** Keep the complete Jerusalem train journey, voucher, station exit and hotel leg together. */
function JerusalemRailDetails({ guide }: { guide: AirportJourneyGuide }) {
  return (
    <>
      {guide.photos?.onward && <figure className="mt-6 max-w-3xl">
        <img src={guide.photos.onward.src} alt={guide.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <aside aria-label="Important Jerusalem train ticket information" className="mt-6 rounded-xl border border-amber-300/60 bg-amber-50/60 p-5 leading-relaxed dark:border-amber-700/40 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 fill-amber-200/70 text-amber-600 dark:fill-amber-500/25 dark:text-amber-400" />
          <h4 className="text-xl font-semibold">Jerusalem train: free personal voucher</h4>
        </div>
        <p className="mt-2">Israel Railways' August 19, 2026 notice requires each passenger to obtain a <strong>free personal voucher for the selected Jerusalem train, in addition to a valid ticket</strong>. Check the current requirement before travelling.</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href="https://rail.co.il/?lan=en&page=vouchers-jerusalem" className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">Official voucher instructions</a>
          <a href="https://www.rail.co.il/" className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">Check the train timetable and fare</a>
        </p>
        <p className="mt-2 text-sm">A revised Israel Railways timetable is scheduled to start on November 14, 2026. Use the date-specific planner rather than a fixed departure interval.</p>
      </aside>
      <h4 className="mt-8 text-xl font-semibold">From Jerusalem–Yitzhak Navon station to your hotel</h4>
      <p className="mt-3 leading-relaxed"><GuideParagraph paragraph={guide.trainIntro} inlineLinks={guide.stationLinks} /></p>
      {guide.photos?.station && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.station.src} alt={guide.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{guide.connections.map((connection) => <li key={connection}>{connection}</li>)}</ul>
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div></li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed"><strong>Practical choice:</strong> {guide.exampleJourney.takeaway}</p>
      </aside>
    </>
  );
}

/** Keep Tel Aviv's four stations and the actual hotel connection inside the train section. */
function TelAvivRailDetails({ guide }: { guide: AirportJourneyGuide }) {
  return (
    <>
      {guide.photos?.station && <figure className="mt-6 max-w-3xl">
        <img src={guide.photos.station.src} alt={guide.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <h4 className="mt-8 text-xl font-semibold">Which Tel Aviv train station is best for your hotel?</h4>
      <p className="mt-3 leading-relaxed"><GuideParagraph paragraph={guide.trainIntro} inlineLinks={guide.stationLinks} /></p>
      <div role="region" aria-label="Tel Aviv railway station comparison" tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[540px] text-left text-sm">
          <caption className="sr-only">Travel time from Ben Gurion Airport and useful Tel Aviv neighborhoods by station</caption>
          <thead className="bg-secondary"><tr><th scope="col" className="p-3">Station</th><th scope="col" className="p-3">Train time</th><th scope="col" className="p-3">Where it helps</th></tr></thead>
          <tbody className="divide-y">{guide.stations.map(station => <tr key={station.name}>
            <th scope="row" className="p-3 font-semibold">{station.name}</th><td className="p-3">{station.time}</td><td className="p-3">{station.usefulFor}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <h4 className="mt-8 text-xl font-semibold">From the station to the beach, your hotel or Old Jaffa</h4>
      {guide.photos?.onward && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.onward.src} alt={guide.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{guide.connections.map(connection => <li key={connection}>{connection}</li>)}</ul>
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3">
          <span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div>
        </li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed"><strong>Practical choice:</strong> {guide.exampleJourney.takeaway}</p>
      </aside>
    </>
  );
}

function OptionSection({ option, guideId }: { option: JourneyOption; guideId: AirportJourneyId }) {
  const jerusalemPrivate = guideId === "jerusalem" && option.id === "private";
  return (
    <section id={sectionId(option.id)} aria-labelledby={sectionId(option.id) + "-h"} className="mt-12 scroll-mt-28">
      <h3 id={sectionId(option.id) + "-h"} className="text-2xl font-semibold">{option.heading}</h3>
      <div className="mt-3 space-y-3 leading-relaxed text-foreground">
        {option.paragraphs.map((paragraph) => <p key={paragraph}><GuideParagraph paragraph={paragraph} inlineLinks={option.inlineLinks} /></p>)}
      </div>
      {guideId === "jerusalem" && option.id === "rail" && <JerusalemRailDetails guide={airportJourneyGuides.jerusalem} />}
      {guideId === "jerusalem" && option.id === "taxi" && <UsefulJourneyLink label="Official airport taxi pickup instructions" href="https://www.gett.com/il/airport-en/" context="Check the ride-code procedure and the pickup point for your terminal." />}
      {guideId === "jerusalem" && option.id === "bus" && <UsefulJourneyLink label="Check bus 485 departures" href="https://bus.gov.il/" context="Find the actual timetable and boarding stop for your travel date." />}
      {jerusalemPrivate && <UsefulJourneyLink label="Send me a message using the form below" href="#request-quote" context="Share your flight, destination and luggage details. I'll confirm availability and the price before you book." />}
      {guideId !== "jerusalem" && <div className="mt-4 rounded-xl bg-secondary/50 p-5">
        <h4 className="font-semibold">Before choosing this option</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {option.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>}
      {option.id === "private" && !jerusalemPrivate && <p className="mt-4"><a href="#request-quote" className="font-semibold text-primary underline underline-offset-4">Ask me for a private-transfer quote →</a>.</p>}
    </section>
  );
}

export function AirportJourneyPage({ id }: { id: AirportJourneyId }) {
  const g = airportJourneyGuides[id];
  const privateRate = rateFor(id);
  const links = [
    ["comparison", "At-a-glance comparison"],
    ...(id === "jerusalem"
      ? [["options", "All transport options"] as const, ["option-rail", "Train & final connection"] as const]
      : [["station-choice", "Stations & connections"] as const, ["options", "All transport options"] as const]),
    ["shabbat", "Shabbat & holidays"],
    ["tips", "Planning tips"],
    ["faq", "Questions"],
    ...(id === "jerusalem"
      ? [["request-quote", "Send a message"] as const, ["sources", "Sources"] as const]
      : [["sources", "Sources"] as const, ["request-quote", "Private transfer quote"] as const]),
  ] as const;
  const stationSection = (
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
        <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={g.exampleJourney.title}>
          <h3 className="text-xl font-semibold">{g.exampleJourney.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Illustrative planning example, not a live timetable or reserved connection.</p>
          <ol className="mt-4 space-y-3">{g.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div></li>)}</ol>
          <p className="mt-4 border-t pt-4 text-sm leading-relaxed"><strong>Practical choice:</strong> {g.exampleJourney.takeaway}</p>
        </aside>
      </Section>
  );

  const sourceBlock = (
  <SourcesDisclosure>
          <p className="mt-3 text-sm text-muted-foreground">Schedules, routes, meeting points, fares and access can change. Refer to official provider pages for actual travel dates. {id === "jerusalem" ? "Train and taxi figures are indicative estimates; check the live train fare, voucher and regulated metered tariff before travelling." : g.historicalPrices === false ? "Displayed rail and bus costs are not price quotes; verify current prices before travel." : "Cost ranges are historical August 2026 editorial estimates, not verified current fares."}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">{(g.sources || sources).map(s=><li key={s.url}><a className="block rounded-lg border bg-card p-4 font-medium text-primary underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span className="sr-only">(opens a new tab)</span></a></li>)}
  
          </ul>
          {id === "jerusalem" && hasPublicPhotoCredit(g.photo) && <div className="mt-3"><GuidePhotoCredit photo={g.photo} insideDisclosure /></div>}
        </SourcesDisclosure>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }, { name: "How to get to " + g.city, to: g.path }]} />
        <p className="eyebrow mt-6">Independent transport comparison · Ben Gurion Airport (TLV)</p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{g.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{g.intro}</p>
        {id === "jerusalem" ? <PageUpdated date={g.updatedAt || PUBLISHED_REVIEW} /> : <p className="mt-3 text-sm text-muted-foreground">Approximate distance: {g.distance} · Editorial review: {g.updatedAt || PUBLISHED_REVIEW}</p>}
        <figure className="mt-7"><img src={g.photo.src} alt={g.photo.alt} width={1200} height={675} fetchPriority="high" decoding="async" className="aspect-[16/9] max-h-[450px] w-full rounded-2xl object-cover"/>{id !== "jerusalem" && <GuidePhotoCredit photo={g.photo} />}</figure>
        <AuthorCard />
      </header>
      <section id="quick-answer" aria-labelledby="quick-answer-h" className="mt-8 rounded-2xl border border-primary/20 bg-secondary/60 p-6">
        <h2 id="quick-answer-h" className="text-2xl">Quick answer: what is the best way to get there?</h2>
        <p className="mt-3 leading-relaxed">{g.answer}</p>
        {id !== "jerusalem" && <p className="mt-3 text-sm text-muted-foreground">This is an independent transport comparison, not a confirmed booking or fixed-price offer. Compare total costs to your actual address.</p>}
      </section>
      <OnThisPage sections={links} />
      <Section id="comparison" title={"Compare all ways from TLV Airport to " + g.city}>
        <p>{id === "jerusalem" ? "Compare the main options, including the onward journey to your hotel." : "Choose by the full journey to your address, not only the lowest fare or the fastest station-to-station time. The figures below are planning estimates, not real-time quotes."}</p>
        <div role="region" aria-label={"Travel options to " + g.city} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border bg-card">
          {id === "jerusalem" ? (
            <table className="min-w-[660px] w-full text-left text-sm">
              <caption className="sr-only">Airport to Jerusalem: travel time, estimated cost, advantages and drawbacks</caption>
              <thead className="bg-secondary"><tr>{["Option", "Travel time", "Estimated cost", "Advantages", "Drawbacks"].map(t => <th key={t} scope="col" className="p-3 font-semibold">{t}</th>)}</tr></thead>
              <tbody className="divide-y">{g.options.map(option => <tr key={option.id}>
                <th scope="row" className="p-3 font-semibold"><a href={"#" + sectionId(option.id)} className="text-primary underline underline-offset-2">{option.name}</a></th>
                <td className="p-3 whitespace-nowrap">{option.time}</td>
                <td className="p-3 whitespace-nowrap">{option.id === "private" ? `From ₪${privateRate.amount.toLocaleString("en-US")}` : option.comparison?.cost}</td>
                <td className="p-3">{option.comparison?.advantages}</td>
                <td className="p-3">{option.comparison?.drawbacks}</td>
              </tr>)}</tbody>
            </table>
          ) : (
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
          )}
        </div>
        {id === "jerusalem" ? (
          <p className="mt-3 text-sm text-muted-foreground">Final taxi fares depend on the regulated tariff period, distance, journey time, traffic and extras. Schedules may change; check the journey planner for actual train and bus times and fares. My listed private-transfer starting price is for a one-way weekday trip per vehicle for up to four passengers, with possible extra charges.</p>
        ) : (        <p className="mt-3 text-sm"><strong>*Price and time note:</strong> {g.historicalPrices === false ? "The train and bus prices must be checked in the official planner for your travel date; this guide does not quote an unverified current fare. " : "₪ ranges are historical editorial estimates from August 2026; they are not current verified fares. "}Train and bus prices are per passenger; official taxis use the regulated meter, and rental totals depend on dates. My displayed starting price is a one-way weekday <strong>per-vehicle</strong> rate for up to four passengers with possible extra charges. All schedules can change. Check the operator and any written quote before you travel.</p>)}
      </Section>
      {id !== "jerusalem" && <PrivateRideCta id={id}/>}
      {id !== "jerusalem" && stationSection}
      <section id="options" aria-labelledby="options-h" className="mt-14 scroll-mt-28">
        <h2 id="options-h" className="text-3xl">How each transport option works</h2>
        {id !== "jerusalem" && g.photos?.onward && <figure className="mt-6 max-w-3xl"><img src={g.photos.onward.src} alt={g.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /><GuidePhotoCredit photo={g.photos.onward} /></figure>}
        {g.options.map(o=><OptionSection key={o.id} option={o} guideId={id} />)}
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
      {id !== "jerusalem" && sourceBlock}
      {id === "jerusalem" ? <>
        <RelatedLinks title="Related practical guides" currentPath={g.path} items={g.related} />
        <RelatedLinks title="Plan the next part of your trip" items={g.planNext || []} />
      </> : <>
        <RelatedLinks title="Related practical guides" items={[
          ...g.related,
          { label: "Taxi fares in Israel", to: "/travel-blog/taxi-fares-in-israel/" },
          { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
        ]} />
        <RelatedLinks title="Other airport journey comparisons" items={airportJourneyIds.filter(other => other !== id).map(other => ({ label: "How to get to " + airportJourneyGuides[other].city, to: airportJourneyGuides[other].path }))} />
      </>}
      <TransferQuoteForm key={transferIdFor(id)} destinationId={transferIdFor(id)} fixedDestination fixedDestinationLabel={g.city} />
      {id === "jerusalem" && sourceBlock}
    </main>
  );
}
