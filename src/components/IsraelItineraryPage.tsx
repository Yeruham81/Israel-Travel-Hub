import { type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import { ArrowRight, CalendarDays, BedDouble } from "lucide-react";
import { Breadcrumbs, OnThisPage, FaqList } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { GetYourGuideCityWidget } from "@/components/GetYourGuideCityWidget";
import { JerusalemItineraryTourOptions } from "@/components/JerusalemItineraryTourOptions";
import type { GetYourGuideWidgetPage } from "@/lib/getyourguide-city-widget";
import { guideContactCopy } from "@/lib/guide-contact";
import type { GuidePhoto } from "@/data/travelGuides";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { isPublisherUrl } from "@/data/site-identity";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { AuthorCard } from "@/components/AuthorCard";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { PageUpdated } from "@/components/PageUpdated";
import { itineraries, itineraryIds, itinerarySourcesByGuide, type ItineraryId, type ItineraryGuide } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const REVIEWED_AT = "2026-11-24";
const itineraryPresentation: Record<ItineraryId, { bases: string; transport: string; transferDays: number[] }> = {
  "3": { bases: "Jerusalem base · Tel Aviv optional", transport: "One full desert excursion", transferDays: [3] },
  "5": { bases: "Jerusalem + Tel Aviv bases", transport: "Desert and coast excursions", transferDays: [4] },
  "7": { bases: "Jerusalem + Galilee + Tel Aviv", transport: "Galilee and coastal transfer days", transferDays: [4, 6] },
  "10": { bases: "Four bases · or three without Haifa", transport: "Galilee and coastal transfer days", transferDays: [4, 7, 8] },
};
const internal = (to: LinkProps["to"]) => to;

export function itineraryMeta(id: ItineraryId) {
  const g = itineraries[id];
  const photo = migrationPhotos[g.hero];
  const head = pageMeta({
    title: g.title, description: g.description, path: g.path, type: "article",
    image: photo.src, imageAlt: photo.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-blog/" }, { name: g.title, path: g.path }],
  });
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "Article",
    "@id": `${CANONICAL_ORIGIN}${g.path}#article`,
    headline: g.title, description: g.description, inLanguage: "en",
    mainEntityOfPage: `${CANONICAL_ORIGIN}${g.path}`,
    dateModified: g.reviewedAt ?? REVIEWED_AT, author: authorLd(),
    publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    image: new URL(photo.src, CANONICAL_ORIGIN).href,
    about: ["Israel", `${g.days}-day travel itinerary`, "Independent trip planning"],
    citation: itinerarySourcesByGuide[id].map((source) => source.url),
  })] };
}

type CopyLink = { phrase: string; to?: LinkProps["to"]; href?: string };
type DayField = "morning" | "afternoon" | "evening" | "practical" | "overnight";

/** Internal cross-guide references and verified official links share the same inline style. */
function dayTextLinks(g: ItineraryGuide, day: number, field: DayField): CopyLink[] {
  return [
    ...(g.dayInlineLinks ?? []).filter(link => link.day === day && link.field === field),
    ...(g.dayOfficialLinks ?? []).filter(link => link.day === day && link.field === field),
  ];
}

function beforeBookingLinks(g: ItineraryGuide, index: number): CopyLink[] {
  const tip = g.beforeYouGo?.[index];
  return [
    ...(tip?.to && tip.label ? [{ phrase: tip.label, to: tip.to }] : []),
    ...(g.beforeYouGoOfficialLinks ?? []).filter(link => link.index === index),
  ];
}

/** Author-specified phrases become natural in-paragraph guide links. */
function LinkedCopy({ value, links = [] }: { value: string; links?: CopyLink[] | undefined }) {
  const output: ReactNode[] = [];
  let position = 0;
  const mentions = links.map(link => ({ ...link, index: value.indexOf(link.phrase) }))
    .filter(link => link.index >= 0).sort((a, b) => a.index - b.index);
  for (const link of mentions) {
    if (link.index < position) continue;
    if (link.index > position) output.push(value.slice(position, link.index));
    const key = `${link.href ?? link.to ?? link.phrase}-${link.index}`;
    if (link.href) {
      output.push(<a key={key} href={link.href} target="_blank" rel="noopener noreferrer"
        className="font-semibold text-primary underline underline-offset-2 hover:opacity-80">{link.phrase}<span className="sr-only"> (opens in new tab)</span></a>);
    } else if (link.to) {
      output.push(<Link key={key} to={link.to}
        className="font-semibold text-primary underline underline-offset-2 hover:opacity-80">{link.phrase}</Link>);
    } else {
      output.push(link.phrase);
    }
    position = link.index + link.phrase.length;
  }
  if (position < value.length) output.push(value.slice(position));
  return <>{output}</>;
}

const guideSections = (g: ItineraryGuide): [string, string][] => [
  ["overview", "Trip overview"],
  ["days", "Daily itinerary"],
  ...(g.id === "10"
    ? [["day-1", "Days 1–3"], ["day-4", "Days 4–6"], ["day-7", "Days 7–10"]]
    : g.id === "7"
      ? [["day-1", "Days 1–3"], ["day-4", "Days 4–7"]]
      : g.daysPlan.map((_, index): [string, string] => [`day-${index + 1}`, `Day ${index + 1}`])) as [string, string][],
  ["transport", g.beforeYouGo?.length ? "Planning tips" : "Transport & hotels"],
  ...(g.alternatives.length ? [["alternatives", "Adjust the route"] as [string, string]] : []),
  ["faq", "FAQ"],
  ...(g.relatedGuides?.length ? [["related-guides", "Related guides"] as [string, string]] : []),
  ["other-durations", g.id === "3" ? "Longer itineraries" : "More itineraries"],
  ["contact", "Contact"],
];

export function IsraelItineraryPage({ id }: { id: ItineraryId }) {
  const g = itineraries[id];
  const photo = migrationPhotos[g.hero];
  const compactOverview = true;
  const presentation = itineraryPresentation[id];
  const showTravel = g.overviewRows?.some(row => Boolean(row.travel));
  const shownImages: { label: string; photo: GuidePhoto }[] = [
    { label: "Cover", photo },
    ...g.daysPlan.map((day, index) => ({ label: `Day ${index + 1}: ${day.region}`, photo: migrationPhotos[day.image] })),
    ...(g.relatedGuides ?? []).map(related => ({ label: related.title, photo: migrationPhotos[related.image] })),
    ...itineraryIds.filter(other => other !== id).map(other => ({ label: `${other}-day itinerary`, photo: migrationPhotos[itineraries[other].hero] })),
  ];
  const seenPhotos = new Set<string>();
  const photoCredits = shownImages.filter(({ photo }) => {
    if (seenPhotos.has(photo.src)) return false;
    seenPhotos.add(photo.src);
    return hasPublicPhotoCredit(photo);
  });
  return <main className="mx-auto max-w-5xl px-4 pb-16">
    <header className="pt-6">
      <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: g.title, to: internal(g.path as LinkProps["to"]) }]} />
      <GuideHeroLayout image={<GuideHeroMedia src={photo.src} alt={photo.alt} />}>
        <p className="eyebrow">Israel itineraries · Independent trip planning</p>
        <h1 className="guide-page-title mt-3">{g.title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{g.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-secondary px-3 py-2">{g.days} full sightseeing days</span>
          <span className="rounded-full bg-secondary px-3 py-2">{presentation.bases}</span>
          <span className="rounded-full bg-secondary px-3 py-2">{presentation.transport}</span>
        </div>
        <PageUpdated date={g.reviewedAt ?? REVIEWED_AT} />
      </GuideHeroLayout>
      <AuthorCard />
    </header>
    <nav aria-label="Choose your Israel trip length" className="mt-6 rounded-xl border bg-card p-3 shadow-sm" data-testid="itinerary-duration-switcher">
      <p className="mb-2 text-sm font-semibold text-foreground">Choose your itinerary length</p>
      <div className="grid grid-cols-4 gap-2">
        {itineraryIds.map(other => <Link key={other} to={itineraries[other].path as LinkProps["to"]}
          aria-current={other === id ? "page" : undefined}
          className={`rounded-lg border px-2 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${other === id ? "border-primary bg-primary text-primary-foreground" : "bg-secondary/40 text-foreground hover:border-primary hover:bg-secondary"}`}>
          {other} days
        </Link>)}
      </div>
    </nav>
    <OnThisPage sections={guideSections(g)} />
    <section id="overview" aria-labelledby="overview-h" className="mt-10 scroll-mt-28">
      <h2 id="overview-h" className="text-3xl">The route at a glance</h2>
      <p className="mt-3 max-w-3xl leading-relaxed">{g.reality}</p>
{compactOverview ? <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p><strong className="text-foreground">Best for:</strong> {g.idealFor}</p>
        <p><strong className="text-foreground">Arrival and hotel nights:</strong> {g.hotelBases}</p>
      </div> : <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5"><dt className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-primary" aria-hidden /> Who this suits</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.idealFor}</dd></div>
        <div className="rounded-xl border bg-card p-5"><dt className="flex items-center gap-2 text-sm font-semibold"><BedDouble className="h-4 w-4 text-primary" aria-hidden /> Suggested hotel bases</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.hotelBases}</dd></div>
      </dl>}
      <h3 className="mt-7 text-xl font-semibold">{compactOverview ? "Daily route, transport and overnight stays" : "Daily route and hotel bases"}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{id === "3" ? "One continuous trip: two Jerusalem hotel nights, followed by a coastal day and either departure or an optional Tel Aviv stay." : id === "5" ? "Five sightseeing days with three Jerusalem hotel nights, a move to Tel Aviv after Day 3, and a flexible departure plan after the final coastal day." : id === "7" ? "Seven sightseeing days across three hotel bases, with planned nights after Days 1–6 and an optional arrival or departure night according to your flights." : "Ten sightseeing days with Jerusalem and Galilee hotel bases, a choice of Haifa or Tel Aviv after Akko, and a coastal finish. Your final day depends on the flight date."}</p>
      
      <div role="region" aria-label="Day-by-day itinerary overview" tabIndex={0} className="mt-4 max-w-full overflow-x-auto rounded-2xl border focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-20 bg-secondary px-4 py-3 font-semibold">Day</th>
              <th scope="col" className="px-4 py-3 font-semibold">Main focus</th>
              {showTravel && <th scope="col" className="px-4 py-3 font-semibold">Getting around</th>}
              <th scope="col" className="px-4 py-3 font-semibold">Overnight plan</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {g.daysPlan.map((day, index) => <tr key={index}>
              <th scope="row" className="sticky left-0 z-10 bg-card px-4 py-3 align-top font-semibold">
                <a href={`#day-${index + 1}`} className="rounded-sm text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">Day {index + 1}</a>
              </th>
              <td className="px-4 py-3 align-top">{g.overviewRows?.[index]?.focus ?? day.name}</td>
              {showTravel && <td className="px-4 py-3 align-top text-muted-foreground">{g.overviewRows?.[index]?.travel}</td>}
              <td className="px-4 py-3 align-top text-muted-foreground">
                {g.overviewRows?.[index]?.night ?? day.overnight}
                {presentation.transferDays.includes(index + 1) && <span className="ml-2 inline-block rounded-md border border-primary/30 bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">{id === "3" ? "Intercity travel" : "Hotel transfer"}</span>}
                {index + 1 === g.days && <span className="ml-2 inline-block rounded-md border px-2 py-0.5 text-xs font-semibold text-foreground">Flight date matters</span>}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      {id === "3" && g.day3Options?.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2" data-testid="departure-scenarios">
        {g.day3Options.map(option => <div key={option.heading} className="rounded-xl border bg-card p-4 text-sm leading-relaxed">
          <h3 className="font-semibold">{option.heading}</h3>
          <p className="mt-1 text-muted-foreground">{option.text}</p>
        </div>)}
      </div> : null}
    </section>
    <section id="days" aria-labelledby="days-h" className="mt-14 scroll-mt-28">
      <h2 id="days-h" className="text-3xl">Your {g.days}-day itinerary, day by day</h2>
      <div className="mt-7 space-y-10">
        {g.daysPlan.map((day, index) => {
          const image = migrationPhotos[day.image];
          const dayNumber = index + 1;
          const inlineDestinations = new Set((g.dayInlineLinks ?? []).filter(link => link.day === dayNumber).map(link => String(link.to)));
          const additionalDayLinks = day.links.filter(link => !inlineDestinations.has(String(link.to)));
          return <article key={index} id={`day-${index + 1}`} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card">
            <header className="border-b bg-secondary/40 px-5 py-5 sm:px-7">
              <p className="eyebrow">Day {index + 1} · {day.region}</p>
              <h3 className="mt-2 text-2xl font-semibold">{day.name}</h3>
            </header>
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="min-w-0">
                {g.daySequences?.find(sequence => sequence.day === index + 1) && (
                  <div className="mb-4 border-b pb-4" data-testid={`day-${index + 1}-highlights`}>
                    <h4 className="text-sm font-semibold">Suggested highlights</h4>
                    <ul className="mt-3 space-y-2">
                      {g.daySequences.find(sequence => sequence.day === index + 1)!.steps.map((step) => (
                        <li key={step.stop} className="flex items-start gap-2.5 text-sm leading-snug">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          <span><span className="font-medium">{step.stop}</span>{step.optional && <span className="ml-1.5 text-xs text-muted-foreground">(optional alternative)</span>}
                            <span className="block text-xs text-muted-foreground">{step.time}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    {(presentation.transferDays.includes(index + 1) || index + 1 === g.days) && (
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="seven-day-transfer-times-note">
                        The times shown are for sightseeing only. Allow extra time for travel between stops, hotel check-in and luggage, especially when using public transport.
                      </p>
                    )}
                  </div>
                )}
                <dl className="space-y-5">
                  <div><dt className="text-sm font-semibold text-primary">Morning</dt><dd className="mt-1 leading-relaxed"><LinkedCopy value={day.morning} links={dayTextLinks(g, index + 1, "morning")} /></dd></div>
                  <div><dt className="text-sm font-semibold text-primary">Afternoon</dt><dd className="mt-1 leading-relaxed"><LinkedCopy value={day.afternoon} links={dayTextLinks(g, index + 1, "afternoon")} /></dd></div>
                  <div><dt className="text-sm font-semibold text-primary">Evening</dt><dd className="mt-1 leading-relaxed"><LinkedCopy value={day.evening} links={dayTextLinks(g, index + 1, "evening")} /></dd></div>
                </dl>
                {g.dayChoices?.find(choice => choice.day === index + 1) && (
                  <section aria-label={`Day ${index + 1} options`} className="mt-5 rounded-xl border border-primary/25 bg-secondary/30 p-4" data-testid={`day-${index + 1}-route-choices`}>
                    <h4 className="text-sm font-semibold">Choose a route for this day</h4>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {g.dayChoices.find(choice => choice.day === index + 1)!.options.map(option => (
                        <div key={option.heading} className="min-w-0 text-sm leading-relaxed">
                          <h5 className="font-semibold">{option.heading}</h5>
                          <p className="mt-1 text-muted-foreground">{option.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                <div className="mt-6 border-l-4 border-primary bg-secondary/50 px-4 py-3">
                  <h4 className="font-semibold">{g.dayTipHeadings?.[index] ?? "Worth knowing"}</h4>
                  <p className="mt-1 text-sm leading-relaxed"><LinkedCopy value={day.practical} links={dayTextLinks(g, index + 1, "practical")} /></p>
                </div>
                <p className="mt-4 text-sm leading-relaxed"><strong>Where to stay:</strong> <LinkedCopy value={day.overnight} links={dayTextLinks(g, index + 1, "overnight")} /></p>
                {additionalDayLinks.length > 0 && <nav aria-label={`Additional guides for day ${index + 1}`} className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Further planning:</span>
                  {additionalDayLinks.map(link => <Link key={link.label} to={link.to} className="font-semibold text-primary underline underline-offset-2">{link.label}</Link>)}
                </nav>}
              </div>
              <figure className="order-first self-start lg:order-last"><img src={image.src} alt={image.alt} width={500} height={375}
                loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-xl object-cover sm:aspect-[4/3]" />
              </figure>
            </div>
            {g.jerusalemTourOptionsDay === index + 1 && (
              <div className="border-t bg-secondary/10 px-5 py-4 sm:px-7">
                <JerusalemItineraryTourOptions days={id === "10" ? 10 : id === "7" ? 7 : id === "5" ? 5 : 3} />
              </div>
            )}
            {g.activityWidgets?.filter(widget => widget.day === index + 1 && !(id === "7" && widget.day === 7)).map(widget =>
              <div key={widget.city} className="border-t bg-secondary/10 px-5 py-4 sm:px-7">
                <GetYourGuideCityWidget city={widget.city} page={`${id}_day` as GetYourGuideWidgetPage} />
              </div>
            )}
          </article>;
        })}
      </div>
    </section>
    {id === "7" && g.activityWidgets?.filter(widget => widget.day === 7).map(widget =>
      <section key={widget.city} className="mt-8 rounded-2xl border bg-card p-5 sm:p-6" aria-label="Optional Tel Aviv activities beyond the main itinerary">
        <h2 className="text-xl font-semibold">Extra time in Tel Aviv?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Explore additional activities when your flight and transport plans leave enough time.</p>
        <div className="mt-4"><GetYourGuideCityWidget city={widget.city} page={`${id}_day` as GetYourGuideWidgetPage} /></div>
      </section>)}
    <section id="transport" aria-labelledby="transport-h" className="mt-14 scroll-mt-28">
      <h2 id="transport-h" className="text-3xl">{g.beforeYouGo?.length ? "My practical planning tips" : "Tips for transport and hotel planning"}</h2>
      <p className="mt-3 leading-relaxed">{g.noCarAdvice}</p>
      {g.beforeYouGo?.length && id !== "5" && id !== "7" && id !== "10" ? <h3 className="mt-6 text-xl font-semibold">Transport and hotel planning</h3> : null}
      <ul className="mt-4 list-disc space-y-4 pl-6 marker:text-primary">
        {g.logistics.map((tip, index) => <li key={tip.heading} className="pl-1 leading-relaxed">
          <strong className="font-semibold">{tip.heading}.</strong>{" "}
          <LinkedCopy value={tip.text} links={g.logisticsInlineLinks?.filter(link => link.index === index)} />
          {!g.logisticsInlineLinks?.some(link => link.index === index) && tip.to && tip.label && <>{" "}<Link to={tip.to} className="text-sm font-semibold text-primary underline underline-offset-2">{tip.label}</Link></>}
        </li>)}
      </ul>
      {g.beforeYouGo?.length ? <div className="mt-7 border-t pt-6">
        <h3 className="text-xl font-semibold">Before you book</h3>
        <ul className="mt-4 list-disc space-y-3 pl-6 marker:text-primary">
          {g.beforeYouGo.map((tip, index) => <li key={tip.heading} className="pl-1 leading-relaxed">
            <strong className="font-semibold">{tip.heading}.</strong>{" "}
            <LinkedCopy value={tip.text} links={beforeBookingLinks(g, index)} />
            {tip.to && tip.label && !tip.text.includes(tip.label) && <>{" "}<Link to={tip.to} className="font-semibold text-primary underline underline-offset-2">{tip.label}</Link></>}
          </li>)}
        </ul>
      </div> : null}
    </section>
    {g.alternatives.length > 0 && (
    <section id="alternatives" aria-labelledby="alternatives-h" className="mt-14 scroll-mt-28">
      <h2 id="alternatives-h" className="text-3xl">Adjust this itinerary to your trip</h2>
      <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">{g.alternatives.map((item) => <article key={item.title} className="min-w-0 rounded-xl border bg-card p-5">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
        {item.title.includes("Eilat and Timna") && g.southernRouteOverview?.length ? (
          <div role="region" aria-label="Southern ten-day alternative at a glance" tabIndex={0} className="mt-4 min-w-0 max-w-full overflow-x-auto rounded-lg border focus-visible:outline-2 focus-visible:outline-primary">
            <table className="min-w-[550px] w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Southern ten-day route replacing the Galilee and northern coast</caption>
              <thead className="bg-secondary"><tr>
                <th className="sticky left-0 bg-secondary px-3 py-2 font-semibold" scope="col">Days</th>
                <th className="px-3 py-2 font-semibold" scope="col">Main focus</th>
                <th className="px-3 py-2 font-semibold" scope="col">Hotel base</th>
              </tr></thead>
              <tbody className="divide-y">
                {g.southernRouteOverview.map(row => <tr key={row.days}>
                  <th className="sticky left-0 bg-card px-3 py-3 font-semibold" scope="row">{row.days}</th>
                  <td className="px-3 py-3">{row.focus}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.base}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        ) : null}
        {item.to && item.label && <Link to={item.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline">{item.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link>}
      </article>)}</div>
    </section>
    )}
    <FaqList faqs={g.faqs} />
    {g.relatedGuides?.length ? <section id="related-guides" aria-labelledby="related-guides-h" className="mt-14 scroll-mt-28">
      <h2 id="related-guides-h" className="text-3xl">Related practical guides</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {g.relatedGuides.map((item) => {
          const picture = guideHeroPhotoForPath(String(item.to)) ?? migrationPhotos[item.image];
          return <article key={item.to} className="editorial-card-link min-w-0 overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-secondary/30 hover:shadow-md">
            <Link to={item.to} className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="overflow-hidden"><img src={picture.src} alt={picture.alt} width={500} height={333} loading="lazy" decoding="async"
                className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" /></span>
              <span className="flex flex-1 flex-col p-3.5 sm:p-4">
                <span className="text-sm font-bold leading-snug text-foreground group-hover:text-primary sm:text-base">{item.title}</span>
                <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span>
              </span>
            </Link>
          </article>;
        })}
      </div>
    </section> : null}
    <section id="other-durations" aria-labelledby="other-duration-h" className="mt-14 scroll-mt-28">
      <h2 id="other-duration-h" className="text-3xl">{id === "3" ? "Have more than 3 days in Israel?" : id === "5" ? "Have more or fewer than 5 days in Israel?" : id === "7" ? "Have more or fewer than 7 days in Israel?" : "Have fewer than 10 days in Israel?"}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{id === "3" ? "Explore my 5-, 7- and 10-day itineraries for more time in Jerusalem and other regions, with realistic routes and hotel bases." : id === "5" ? "Explore a shorter 3-day route or discover the 7- and 10-day itineraries for more time in Israel and its different regions." : id === "7" ? "Compare the shorter 3- and 5-day routes or spend longer exploring the country with a 10-day itinerary." : "Compare my 3-, 5- and 7-day routes for fewer travel days and a more focused itinerary."}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {itineraryIds.filter((other) => other !== id).map((other) => {
          const choice = itineraries[other];
          const choicePhoto = guideHeroPhotoForPath(String(choice.path)) ?? migrationPhotos[choice.hero];
          return <article key={other} className="overflow-hidden rounded-xl border bg-card">
            <Link to={choice.path as LinkProps["to"]} className="group block hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={choicePhoto.src} alt={choicePhoto.alt} width={440} height={300} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
              <span className="block p-4">
                <span className="block font-semibold text-primary underline-offset-2 group-hover:underline">{other}-day Israel itinerary</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{choice.description}</span>
              </span>
            </Link>
          </article>;
        })}
      </div>
    </section>
    <HomeContactForm key={id} showTripadvisorBesidePortraitMobile guide={{
      ...guideContactCopy(g.title, "itinerary"),
      eyebrow: "Contact me",
      heading: "Need a Private Driver for Your Israel Trip?",
      introduction: "Tell me your travel dates, pickup location, destinations and number of passengers. I'll reply personally about arranging private transport for your journey.",
      placeholder: "Travel dates, pickup point, destinations, passengers and luggage…",
    }} />
    <SourcesDisclosure>
      <p className="text-sm leading-relaxed text-muted-foreground">Check opening hours, entry requirements and transport schedules before your trip.</p>
      <ul className="mt-3 space-y-2">
        {itinerarySourcesByGuide[id].map((source) => <li key={source.url}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline underline-offset-2">{source.label}<span className="sr-only"> (opens in a new tab)</span></a>
        </li>)}
      </ul>
    </SourcesDisclosure>
    {photoCredits.length > 0 && <details className="mt-3 rounded-xl border bg-card text-sm text-muted-foreground" data-testid="itinerary-photo-credits">
      <summary className="cursor-pointer px-4 py-3 font-semibold text-foreground">Photo credits &amp; licences</summary>
      <ul className="space-y-2 border-t px-4 py-4">
        {photoCredits.map(({ label, photo }) => {
          const source = photo.sourceUrl && !isPublisherUrl(photo.sourceUrl) ? photo.sourceUrl : undefined;
          return <li key={photo.src}>
            <strong className="font-medium text-foreground">{label}:</strong>{" "}
            {source ? <a href={source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.credit || "Photo source"}</a> : (photo.credit || "Photo source")}
            {photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Licence</a></>}
          </li>;
        })}
      </ul>
    </details>}
  </main>;
}
