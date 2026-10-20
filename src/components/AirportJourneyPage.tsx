import { Link } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { AuthorCard } from "@/components/AuthorCard";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
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

function rateFor(id: AirportJourneyId) {
  const transferId = id === "ein-bokek" ? "dead-sea" : id;
  return getAirportRouteGuide(transferId).rate.price;
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
    dateModified: PUBLISHED_REVIEW, author: authorLd(),
    publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    image: new URL(guide.photo.src, CANONICAL_ORIGIN).href,
    citation: [...sources.map((source) => source.url), guide.legacySource],
  })] };
}

function PrivateRideCta({ id, variant = "mid" }: { id: AirportJourneyId; variant?: "mid" | "bottom" }) {
  const guide = airportJourneyGuides[id];
  return (
    <aside aria-label={"Private transfer quote for " + guide.city} className={"mt-10 rounded-2xl border p-6 sm:p-8 " + (variant === "bottom" ? "bg-navy text-navy-foreground" : "border-primary/25 bg-secondary/60")}>
      <p className={"text-xs font-bold uppercase tracking-widest " + (variant === "bottom" ? "opacity-80" : "text-primary")}>When door-to-door travel matters</p>
      <h2 className="mt-2 text-2xl sm:text-3xl">Would a private ride to {guide.city} be easier?</h2>
      <p className="mt-3 leading-relaxed">Traveling with children or several suitcases, arriving when trains stop, or simply want a vehicle arranged for your group? Moshe Barak can review your flight and destination and confirm a personal quote.</p>
      <p className="mt-3 text-sm opacity-85">The private-transfer page lists its own weekday starting price and conditions. Preparing an email draft does not send a request or confirm a booking.</p>
      <Link to={guide.privatePath} hash="request-quote" className={"mt-5 inline-flex rounded-lg px-5 py-3 font-semibold " + (variant === "bottom" ? "bg-white text-slate-900" : "bg-primary text-primary-foreground")}>{guide.privateLabel} →</Link>
      <p className="mt-3 text-xs opacity-75">Moshe operates the publisher's own private transport service; this guide also explains cheaper public options.</p>
    </aside>
  );
}

function OptionSection({ option, guideId }: { option: JourneyOption; guideId: AirportJourneyId }) {
  return (
    <section id={sectionId(option.id)} aria-labelledby={sectionId(option.id) + "-h"} className="mt-12 scroll-mt-28">
      <h3 id={sectionId(option.id) + "-h"} className="text-2xl font-semibold">{option.heading}</h3>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
        {option.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-4 rounded-xl bg-secondary/50 p-5">
        <h4 className="font-semibold">Before choosing this option</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {option.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {option.id === "private" && <p className="mt-4"><Link to={airportJourneyGuides[guideId].privatePath} hash="request-quote" className="font-semibold text-primary underline underline-offset-4">See private-transfer starting rate and prepare a quote request →</Link></p>}
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
  ] as const;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }, { name: "How to get to " + g.city, to: g.path }]} />
        <p className="eyebrow mt-6">Independent transport comparison · Ben Gurion Airport (TLV)</p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{g.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{g.intro}</p>
        <p className="mt-3 text-sm text-muted-foreground">Approximate distance: {g.distance} · Editorial review: {PUBLISHED_REVIEW}</p>
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
            <caption className="sr-only">Compare estimated duration, historical cost, suitability and door-to-door service</caption>
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
        <p className="mt-3 text-sm"><strong>*Price and time note:</strong> ₪ ranges are historical editorial estimates taken from the publisher's August 2026 guides; they are not current verified fares. Train and bus figures are per passenger, authorized taxis are metered per trip, rental totals depend on dates, and Moshe's displayed starting rate is a one-way weekday <strong>per-vehicle</strong> rate for up to four passengers, with possible supplements. All prices and operating schedules can change. Check the official planner/operator and a written quote for your date.</p>
      </Section>
      <PrivateRideCta id={id}/>
      <Section id="station-choice" title={"Train stations, changes and the final journey in " + g.city}>
        <p>{g.trainIntro}</p>
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
        {g.options.map(o=><OptionSection key={o.id} option={o} guideId={id}/>)}
      </section>
      <Section id="shabbat" title="Getting there on Shabbat and Jewish holidays">
        {g.weekend.map(p=><p key={p}>{p}</p>)}
        <p>For terminal-specific weekend travel, see our <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className="text-primary underline">Ben Gurion Airport Shabbat guide</Link>.</p>
      </Section>
      <Section id="tips" title="Practical tips to avoid missed connections and extra costs">
        <ul className="list-disc space-y-3 pl-5">{g.advice.map(t=><li key={t}>{t}</li>)}</ul>
        <p>For first-time arrivals, read our <Link to="/travel-blog/ben-gurion-airport-arrival-tips/" className="text-primary underline">airport arrivals checklist</Link> and save the operator's contact details offline.</p>
      </Section>
      <FaqList faqs={g.faqs}/>
      <PrivateRideCta id={id} variant="bottom"/>
      <SourcesDisclosure>
        <p className="mt-3 text-sm text-muted-foreground">Schedules, routes, meeting points, fares and access can change. Refer to the official provider pages for actual travel dates. Historical costs were sourced from Moshe's earlier August 2026 editorial comparison and are labeled as estimates.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">{sources.map(s=><li key={s.url}><a className="block rounded-lg border bg-card p-4 font-medium text-primary underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span className="sr-only">(opens a new tab)</span></a></li>)}
          <li><a className="block rounded-lg border bg-card p-4 font-medium text-primary underline" href={g.legacySource} target="_blank" rel="noopener noreferrer">Publisher's August 2026 route comparison (historical figures) <span className="sr-only">(opens a new tab)</span></a></li>
        </ul>
      </SourcesDisclosure>
      <RelatedLinks title="Plan your next step" items={[...g.related, ...airportJourneyIds.filter(other=>other!==id).map(other=>({label:"How to get to "+airportJourneyGuides[other].city,to:airportJourneyGuides[other].path}))]}/>
    </main>
  );
}
