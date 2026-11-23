import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { GuideParagraph } from "@/components/TravelGuide";
import { PhotoCreditsDisclosure } from "@/components/PhotoCreditsDisclosure";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
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
  { title: "National public-transport journey information", url: "https://bus.gov.il/en/home" },
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
    { name: "Travel guides", path: "/travel-blog/" },
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
    <p data-testid="useful-journey-link" className="mt-4 text-sm leading-relaxed">
      <a href={href} className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>
      {context && <span className="text-muted-foreground"> — {context}</span>}
    </p>
  );
}

function ArrivalAreaTable({ guide }: { guide: AirportJourneyGuide }) {
  return (
    <div role="region" aria-label={"Arrival connections in " + guide.city} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[610px] text-left text-sm" data-testid="airport-arrival-areas">
        <caption className="sr-only">Suggested arrival stations or stops for destinations in {guide.city}</caption>
        <thead className="bg-secondary">
          <tr><th scope="col" className="p-3">Area</th><th scope="col" className="p-3">Arrival station or stop</th><th scope="col" className="p-3">Last connection</th></tr>
        </thead>
        <tbody className="divide-y">{guide.arrivalAreas.map(area => <tr key={area.area}>
          <th scope="row" className="p-3 font-semibold">{area.area}</th>
          <td className="p-3">{area.station}</td>
          <td className="p-3">{area.onward}</td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

function JourneyRelatedCards({ guide }: { guide: AirportJourneyGuide }) {
  return <section aria-label="Related practical guides" data-testid="airport-related-guides" className="mt-12">
    <h2 className="text-2xl font-semibold">Continue exploring {guide.city}</h2>
    <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
      {guide.featuredRelated.map(item => {
        const photo = guideHeroPhotoForPath(String(item.to));
        return <li key={String(item.to)} className="min-w-0">
          <Link to={item.to} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/60 hover:bg-secondary/20 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {photo && <span className="aspect-[3/2] overflow-hidden bg-secondary/30">
              <img src={photo.src} alt={photo.alt} width={480} height={320} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
            </span>}
            <span className="flex flex-1 flex-col p-3 sm:p-4">
              <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary sm:text-base">{item.label}</span>
              <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.note}</span>
            </span>
          </Link>
        </li>;
      })}
    </ul>
  </section>;
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
        <p className="mt-2">Israel Railways has required a <strong>free personal voucher for the selected Jerusalem train, in addition to a valid ticket</strong>. Check the current requirement and instructions before travelling.</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href="https://rail.co.il/?lan=en&page=vouchers-jerusalem" className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">Official voucher instructions</a>
          <a href="https://www.rail.co.il/" className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">Check the train timetable and fare</a>
        </p>
        <p className="mt-2 text-sm">Train times and departure intervals can change. Check the Israel Railways timetable for your travel date.</p>
      </aside>
      <h4 className="mt-8 text-xl font-semibold">From Jerusalem–Yitzhak Navon station to your hotel</h4>
      <p className="mt-3 leading-relaxed"><GuideParagraph paragraph={guide.trainIntro} inlineLinks={guide.stationLinks} /></p>
      {guide.photos?.station && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.station.src} alt={guide.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ArrivalAreaTable guide={guide} />
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div></li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed">{guide.exampleJourney.takeaway}</p>
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
      <p className="mt-3 leading-relaxed">All four mainline railway stations are inland. Check the complete connection to your hotel, especially if you are carrying luggage or staying near the beach or in Old Jaffa.</p>
      {guide.photos?.onward && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.onward.src} alt={guide.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ArrivalAreaTable guide={guide} />
      <p className="mt-4 text-sm leading-relaxed">Staying in the historic port area? My <Link to="/attractions/jaffa/" className="font-semibold text-primary underline underline-offset-4">Old Jaffa guide</Link> explains the lanes, attractions and local access before you decide where a driver can leave you.</p>
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3">
          <span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div>
        </li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed">{guide.exampleJourney.takeaway}</p>
      </aside>
    </>
  );
}

/** Haifa decisions hinge on the coastal station and the full uphill or port approach. */
function HaifaRailDetails({ guide }: { guide: AirportJourneyGuide }) {
  return (
    <>
      <h4 className="mt-8 text-xl font-semibold">Airport train: tickets, terminal and route</h4>
      <p className="mt-3 leading-relaxed"><GuideParagraph paragraph={guide.trainIntro} inlineLinks={guide.stationLinks} /></p>
      {guide.photos?.station && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.station.src} alt={guide.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <h4 className="mt-8 text-xl font-semibold">Which Haifa railway station should you use?</h4>
      <p className="mt-3 leading-relaxed">Haifa's main railway stations serve very different neighborhoods. Check where your train actually stops, then compare the final bus, taxi or walk to your accommodation rather than choosing the first station with “Haifa” in its name.</p>
      <div role="region" aria-label="Haifa railway station comparison" tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[580px] text-left text-sm">
          <caption className="sr-only">Ben Gurion Airport to Haifa train stations and onward destinations</caption>
          <thead className="bg-secondary"><tr><th scope="col" className="p-3">Station</th><th scope="col" className="p-3">Typical train time</th><th scope="col" className="p-3">Useful destinations</th></tr></thead>
          <tbody className="divide-y">{guide.stations.map(station => <tr key={station.name}>
            <th scope="row" className="p-3 font-semibold">{station.name}</th><td className="p-3">{station.time}</td><td className="p-3">{station.usefulFor}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <h4 className="mt-8 text-xl font-semibold">From the station to your hotel, Mount Carmel or Haifa Port</h4>
      <p className="mt-3 leading-relaxed">The railway follows the coastline, while much of Haifa rises steeply up Mount Carmel. The journey from the station to your hotel or cruise terminal may take longer than expected, especially with luggage.</p>
      {guide.photos?.onward && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.onward.src} alt={guide.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ArrivalAreaTable guide={guide} />
      <p className="mt-4 text-sm leading-relaxed">For specific neighborhood and hotel choices, read my <Link to="/travel-blog/best-hotels-in-haifa/" className="font-semibold text-primary underline underline-offset-4">where to stay in Haifa guide</Link>. If you are boarding a cruise, see the <Link to="/shore-excursions/haifa/" className="font-semibold text-primary underline underline-offset-4">Haifa port and shore excursions guide</Link> and verify the ship's check-in instructions.</p>
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3">
          <span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div>
        </li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed">{guide.exampleJourney.takeaway}</p>
      </aside>
    </>
  );
}

/** Dead Sea journeys require two distinct public-transport legs; keep the full connection together. */
function EinBokekPublicTransportDetails({ guide }: { guide: AirportJourneyGuide }) {
  return (
    <>
      <h4 className="mt-8 text-xl font-semibold">Step 1: Take the airport train to Jerusalem–Yitzhak Navon</h4>
      <p className="mt-3 leading-relaxed"><GuideParagraph paragraph={guide.trainIntro} inlineLinks={guide.stationLinks} /></p>
      {guide.photos?.station && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.station.src} alt={guide.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <UsefulJourneyLink label="Jerusalem train: free personal voucher instructions" href="https://rail.co.il/?lan=en&page=vouchers-jerusalem" context="Israel Railways' August 2026 notice requires a separate, free voucher for each passenger on the selected Jerusalem train, in addition to a valid ticket. Check the current rule before travelling." />
      <h4 className="mt-8 text-xl font-semibold">Step 2: Change to an Egged bus at Jerusalem Central Bus Station</h4>
      <p className="mt-3 leading-relaxed">Jerusalem–Yitzhak Navon railway station is deep underground. Allow time for lifts, the walk to Jerusalem Central Bus Station and its intercity platforms. Bus 486 serves the Dead Sea hotel area; reserved-seat bus 444 to Eilat may offer another departure. The buses are not coordinated with airport train arrivals. Check the last bus to Ein Bokek and leave enough time to change in Jerusalem.</p>
      <div role="region" aria-label="Airport-to-Ein-Bokek public transport legs" tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[590px] text-left text-sm">
          <caption className="sr-only">Ben Gurion Airport to Ein Bokek: train, transfer and bus journey stages</caption>
          <thead className="bg-secondary"><tr><th scope="col" className="p-3">Journey leg</th><th scope="col" className="p-3">Typical duration</th><th scope="col" className="p-3">What to check</th></tr></thead>
          <tbody className="divide-y">{guide.stations.map(stage => <tr key={stage.name}>
            <th scope="row" className="p-3 font-semibold">{stage.name}</th><td className="p-3">{stage.time}</td><td className="p-3">{stage.usefulFor}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <UsefulJourneyLink label="Check the last 486 or 444 bus to the Dead Sea" href="https://bus.gov.il/en/home" context="Check the last bus to your hotel, then choose an airport train that leaves enough time for the connection." />
      <UsefulJourneyLink label="Egged — reserve seats on bus 444 (or limited 421)" href="https://www.egged.co.il/en/information-for-passengers/tickets-information" context="The operator lists these as reserved-seat services. Check seat availability and the correct departure stop before depending on either route." />
      <h4 className="mt-8 text-xl font-semibold">Step 3: Get off at the correct Dead Sea hotel stop</h4>
      <p className="mt-3 leading-relaxed">Ein Bokek, Hamei Zohar and Neve Zohar have different stops along the hotel area; Ein Gedi and Masada are separate destinations. Confirm the exact stop for your hotel and the final walk with luggage, especially during the hottest hours of the day.</p>
      {guide.photos?.onward && <figure className="mt-5 max-w-3xl">
        <img src={guide.photos.onward.src} alt={guide.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      </figure>}
      <ArrivalAreaTable guide={guide} />
      <p className="mt-4 text-sm leading-relaxed">For the exact resort location, compare my <Link to="/travel-blog/best-dead-sea-hotels/" className="font-semibold text-primary underline underline-offset-4">Dead Sea hotels guide</Link>. If you are starting your trip in Jerusalem instead of changing trains there, consult <Link to="/travel-blog/jerusalem-to-the-dead-sea/" className="font-semibold text-primary underline underline-offset-4">Jerusalem to the Dead Sea</Link>.</p>
      <h4 className="mt-8 text-xl font-semibold">A limited alternative: bus 421 via Tel Aviv–Savidor</h4>
      <p className="mt-3 leading-relaxed">Bus 421 is another limited option from Tel Aviv–Savidor to the Dead Sea. You would first need to reach Savidor by train from the airport and reserve your bus seat separately. Use this route only if the timetable works better than travelling via Jerusalem. See my <Link to="/travel-blog/ben-gurion-airport-to-tel-aviv/" className="font-semibold text-primary underline underline-offset-4">airport-to-Tel-Aviv guide</Link> for the rail arrival leg.</p>
      <aside className="mt-7 rounded-2xl border bg-secondary/40 p-5 sm:p-6" aria-label={guide.exampleJourney.title}>
        <h4 className="text-xl font-semibold">{guide.exampleJourney.title}</h4>
        
        <ol className="mt-4 space-y-3">{guide.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3">
          <span className="font-semibold text-primary">{index + 1}.</span>
          <div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div>
        </li>)}</ol>
        <p className="mt-4 border-t pt-4 text-sm leading-relaxed">{guide.exampleJourney.takeaway}</p>
      </aside>
    </>
  );
}

function OptionSection({ option, guideId }: { option: JourneyOption; guideId: AirportJourneyId }) {
  const conciseGuide = guideId === "jerusalem" || guideId === "tel-aviv" || guideId === "haifa" || guideId === "ein-bokek";
  const inlinePrivate = conciseGuide && option.id === "private";
  return (
    <section id={sectionId(option.id)} aria-labelledby={sectionId(option.id) + "-h"} className="mt-12 scroll-mt-28">
      <h3 id={sectionId(option.id) + "-h"} className="text-2xl font-semibold">{option.heading}</h3>
      <div className="mt-3 space-y-3 leading-relaxed text-foreground">
        {option.paragraphs.map((paragraph) => <p key={paragraph}><GuideParagraph paragraph={paragraph} inlineLinks={option.inlineLinks} /></p>)}
      </div>
      {guideId === "jerusalem" && option.id === "rail" && <JerusalemRailDetails guide={airportJourneyGuides.jerusalem} />}
      {guideId === "tel-aviv" && option.id === "rail" && <TelAvivRailDetails guide={airportJourneyGuides["tel-aviv"]} />}
      {guideId === "haifa" && option.id === "rail" && <HaifaRailDetails guide={airportJourneyGuides.haifa} />}
      {guideId === "ein-bokek" && option.id === "rail" && <EinBokekPublicTransportDetails guide={airportJourneyGuides["ein-bokek"]} />}
      {guideId === "jerusalem" && option.id === "taxi" && <UsefulJourneyLink label="Official airport taxi pickup instructions" href="https://www.gett.com/il/airport-en/" context="Check the ride-code procedure and the pickup point for your terminal." />}
      {guideId === "jerusalem" && option.id === "bus" && <UsefulJourneyLink label="Check bus 485 departures" href="https://bus.gov.il/en/home" context="Find the actual timetable and boarding stop for your travel date." />}
      {inlinePrivate && <p className="mt-4 text-sm leading-relaxed">For a personal quote, <a href="#request-quote" className="font-semibold text-primary underline underline-offset-4">send me your flight, hotel and luggage details</a>.</p>}
      {guideId === "tel-aviv" && option.id === "rail" && <UsefulJourneyLink label="Check train times and fares" href="https://www.rail.co.il/" context="Choose the station with the easiest connection to your hotel, and check train times for your arrival date." />}
      {guideId === "tel-aviv" && option.id === "taxi" && <UsefulJourneyLink label="Official Gett airport taxi instructions" href="https://www.gett.com/il/airport-en/" context="Get your ride code and confirm the correct taxi queue at the terminal." />}
      {guideId === "tel-aviv" && option.id === "bus" && <UsefulJourneyLink label="Check bus 445 stops and departures" href="https://bus.gov.il/en/home" context="Find the actual route, fare and closest stop to your hotel; board at Terminal 3, Level 2, Exit 21." />}
      {guideId === "tel-aviv" && option.id === "weekend" && <UsefulJourneyLink label="Free Line 711 — stop-by-stop timetable" href="https://busofash.co.il/?lines=711" context="Check Terminal 1 stop 34609 and the Tel Aviv-bound departure on your Friday or Saturday." />}
      {guideId === "haifa" && option.id === "rail" && <UsefulJourneyLink label="Israel Railways — check trains and fares" href="https://www.rail.co.il/" context="Check the Haifa station, ticket price and train service for your travel date." />}
      {guideId === "haifa" && option.id === "taxi" && <UsefulJourneyLink label="Official Gett airport taxi pickup" href="https://www.gett.com/il/airport-en/" context="Get the ride code and follow the authorized taxi queue: Terminal 3 Exit 03, or the main arrivals exit at Terminal 1." />}
      {guideId === "haifa" && option.id === "bus" && <UsefulJourneyLink label="Verify Egged bus 905 departures" href="https://bus.gov.il/en/home" context="Check the dated Saturday-night or early-Sunday timetable, Terminal 3 Level 2 or Terminal 1 stop, and your Haifa drop-off." />}
      {guideId === "ein-bokek" && option.id === "taxi" && <UsefulJourneyLink label="Official Gett airport taxi pickup instructions" href="https://www.gett.com/il/airport-en/" context="Get your ride code at the airport and follow the official queue; ask the driver to confirm the exact Ein Bokek or Neve Zohar hotel." />}
      {guideId === "ein-bokek" && option.id === "rental" && <UsefulJourneyLink label="Israel Meteorological Service — flood and weather warnings" href="https://ims.gov.il/en/warning" context="Check warnings for the Judean Desert and Dead Sea, plus official road closures, before driving on Route 90. Do not drive through flooded roads." />}
      {!conciseGuide && <div className="mt-4 rounded-xl bg-secondary/50 p-5">
        <h4 className="font-semibold">Before choosing this option</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {option.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>}
      {option.id === "private" && !inlinePrivate && <p className="mt-4"><a href="#request-quote" className="font-semibold text-primary underline underline-offset-4">Ask me for a private-transfer quote →</a>.</p>}
    </section>
  );
}

export function AirportJourneyPage({ id }: { id: AirportJourneyId }) {
  const g = airportJourneyGuides[id];
  const privateRate = rateFor(id);
  const focusedLayout = id === "jerusalem" || id === "tel-aviv" || id === "haifa" || id === "ein-bokek";
  const displayOptions = id === "tel-aviv"
    ? ["rail", "taxi", "private", "bus", "weekend", "rental"].map(optionId => g.options.find(option => option.id === optionId)!)
    : g.options;
  const links = [
    ["comparison", "At-a-glance comparison"],
    ...(focusedLayout
      ? [["options", "All transport options"] as const, ["option-rail", "Train & final connection"] as const]
      : [["station-choice", "Stations & connections"] as const, ["options", "All transport options"] as const]),
    ["shabbat", "Shabbat & holidays"],
    ["tips", "Planning tips"],
    ["faq", "Questions"],
    ...(focusedLayout
      ? [["request-quote", "Send a message"] as const, ["sources", "Sources"] as const]
      : [["sources", "Sources"] as const, ["request-quote", "Private transfer quote"] as const]),
  ] as const;
  const stationSection = (
<Section id="station-choice" title={"Train stations, changes and the final journey in " + g.city}>
        <p><GuideParagraph paragraph={g.trainIntro} inlineLinks={g.stationLinks} /></p>
        {g.photos?.station && <figure className="mt-5 mb-6 max-w-3xl"><img src={g.photos.station.src} alt={g.photos.station.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /></figure>}
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
          <ol className="mt-4 space-y-3">{g.exampleJourney.steps.map((step, index) => <li key={step.label} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}.</span><div><strong>{step.label}</strong><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div></li>)}</ol>
          <p className="mt-4 border-t pt-4 text-sm leading-relaxed"><strong>Practical choice:</strong> {g.exampleJourney.takeaway}</p>
        </aside>
      </Section>
  );

  const sourceBlock = (
  <SourcesDisclosure>
          <p className="mt-3 text-sm text-muted-foreground">Check the linked operators for fares, dated timetables and pickup points before travelling. {id === "jerusalem" || id === "ein-bokek" ? "If taking the Jerusalem train, check the current personal-voucher rule as well." : ""}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">{(g.sources || sources).map(s=><li key={s.url}><a className="block rounded-lg border bg-card p-4 font-medium text-primary underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span className="sr-only">(opens a new tab)</span></a></li>)}
  
          </ul>

        </SourcesDisclosure>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: "How to get to " + g.city, to: g.path }]} />
        <GuideHeroLayout image={
          <GuideHeroMedia src={g.photo.src} alt={g.photo.alt}/>
        }>
          <h1 className="guide-page-title mt-3">{g.title}</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{g.intro}</p>
          {focusedLayout ? <PageUpdated date={g.updatedAt || PUBLISHED_REVIEW} /> : <p className="mt-3 text-sm text-muted-foreground">Approximate distance: {g.distance} · Editorial review: {g.updatedAt || PUBLISHED_REVIEW}</p>}
        </GuideHeroLayout>
        <AuthorCard />
      </header>
      <section id="quick-answer" aria-labelledby="quick-answer-h" className="mt-8 rounded-2xl border border-primary/20 bg-secondary/60 p-6">
        <h2 id="quick-answer-h" className="text-2xl font-semibold">Best way to reach {g.city}</h2>
        <p className="mt-3 leading-relaxed">{g.answer}</p>
        {!focusedLayout && <p className="mt-3 text-sm text-muted-foreground">Compare the total door-to-door cost to your address. Each provider confirms prices and availability.</p>}
      </section>
      <OnThisPage sections={links} />
      <Section id="comparison" title={"Compare ways to reach " + g.city}>
        {!focusedLayout && <p>Compare the complete door-to-door journey, including transfers, total travel time and cost. Check current fares with each provider.</p>}
        <div role="region" aria-label={"Travel options to " + g.city} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border bg-card">
          {focusedLayout ? (
            <table className="w-full min-w-[840px] text-left text-sm" data-testid="airport-journey-comparison">
              <caption className="sr-only">Airport to {g.city}: travel time, price basis, suitability, hotel drop-off and service availability</caption>
              <thead className="bg-secondary"><tr>{["Option", "Travel time", "Cost", "Best for", "To hotel?", "Availability"].map(t => <th key={t} scope="col" className="p-3 font-semibold">{t}</th>)}</tr></thead>
              <tbody className="divide-y">{displayOptions.map(option => <tr key={option.id}>
                <th scope="row" className="p-3 font-semibold"><a href={"#" + sectionId(option.id)} className="text-primary underline underline-offset-2">{option.name}</a></th>
                <td className="p-3 whitespace-nowrap">{option.time}</td>
                <td className="p-3">{option.id === "private" ? `From ₪${privateRate.amount.toLocaleString("en-US")}/vehicle` : option.id === "taxi" ? "Regulated meter" : option.comparison?.cost ?? option.cost}</td>
                <td className="p-3">{option.bestFor}</td>
                <td className="p-3">{option.doorToDoor}</td>
                <td className="p-3">{option.availability}</td>
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
        {focusedLayout ? (
          <p className="mt-3 text-sm text-muted-foreground">Taxi fares are metered; check current rail and bus prices with each operator. My private-transfer starting price is one way, on weekdays, per vehicle for up to four passengers; I confirm extras in writing. Journey times are estimates and exclude airport arrival formalities and onward connections unless noted.</p>
        ) : (        <p className="mt-3 text-sm"><strong>*Price and time note:</strong> {g.historicalPrices === false ? "The train and bus prices must be checked in the official planner for your travel date; this guide does not quote an unverified current fare. " : "₪ ranges are historical editorial estimates from August 2026; they are not current verified fares. "}Train and bus prices are per passenger; official taxis use the regulated meter, and rental totals depend on dates. My displayed starting price is a one-way weekday <strong>per-vehicle</strong> rate for up to four passengers with possible extra charges. All schedules can change. Check the operator and any written quote before you travel.</p>)}
        {focusedLayout && <aside aria-label={"Pre-booked airport transfer to " + g.city} data-testid="airport-journey-private-links" className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-secondary/30 p-4">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Prefer an arranged airport pickup?</p>
            <p className="mt-1 text-sm text-muted-foreground">See vehicle and starting-price details, or request a personal quote for your flight and hotel.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={g.privatePath} className="inline-flex min-h-11 items-center rounded-lg border border-primary/35 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary">Private transfer details</Link>
            <a href="#request-quote" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Request a quote</a>
          </div>
        </aside>}
      </Section>
      {!focusedLayout && <PrivateRideCta id={id}/>}
      {!focusedLayout && stationSection}
      <section id="options" aria-labelledby="options-h" className="mt-14 scroll-mt-28">
        <h2 id="options-h" className="text-3xl">Transport options from the airport</h2>
        {!focusedLayout && <p className="mt-3 leading-relaxed">Compare each option's actual pickup, onward connection and limitations before choosing what works for your destination.</p>}
        {!focusedLayout && g.photos?.onward && <figure className="mt-6 max-w-3xl"><img src={g.photos.onward.src} alt={g.photos.onward.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" /></figure>}
        {displayOptions.map(o=><OptionSection key={o.id} option={o} guideId={id} />)}
      </section>
      <Section id="shabbat" title="Getting there on Shabbat and Jewish holidays">
        {g.weekend.map(p=><p key={p}><GuideParagraph paragraph={p} inlineLinks={g.weekendLinks} /></p>)}
        {!g.weekendLinks?.length && <p>For terminal-specific weekend travel, see my <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className="text-primary underline">Ben Gurion Airport Shabbat guide</Link>.</p>}
        {!g.weekendLinks?.some(link => link.to === "/travel-blog/calendar-of-events/") && <p>For holiday dates, see <Link to="/travel-blog/calendar-of-events/" className="font-medium text-primary underline underline-offset-4">Israel's Calendar of Events</Link>.</p>}
      </Section>
      <Section id="tips" title="Before you travel">
        <ul className="list-disc space-y-3 pl-5">{g.advice.map(t=><li key={t}>{t}</li>)}</ul>
        <p>For terminal directions and arrival procedures, see my <Link to="/travel-blog/ben-gurion-airport-arrival-tips/" className="text-primary underline">Ben Gurion Airport arrival guide</Link>.</p>
      </Section>
      <FaqList faqs={g.faqs}/>
      {!focusedLayout && sourceBlock}
      {focusedLayout ? <JourneyRelatedCards guide={g} /> : <>
        <RelatedLinks title="Related practical guides" items={[
          ...g.related,
          { label: "Taxi fares in Israel", to: "/travel-blog/taxi-fares-in-israel/" },
          { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
        ]} />
        <RelatedLinks title="Other airport journey comparisons" items={airportJourneyIds.filter(other => other !== id).map(other => ({ label: "How to get to " + airportJourneyGuides[other].city, to: airportJourneyGuides[other].path }))} />
      </>}
      <TransferQuoteForm key={transferIdFor(id)} destinationId={transferIdFor(id)} fixedDestination fixedDestinationLabel={g.city} />
      {focusedLayout && sourceBlock}
      <PhotoCreditsDisclosure entries={hasPublicPhotoCredit(g.photo) ? [{
        label:"Main image",credit:g.photo.credit,sourceUrl:g.photo.sourceUrl,licenseUrl:g.photo.licenseUrl
      }] : []}/>
    </main>
  );
}
