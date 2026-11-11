import { Link } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";
import { Breadcrumbs, Checklist, FaqList, OnThisPage, ProviderCard, RelatedLinks, SourceList } from "@/components/Guide";
import { guideTopics, travelGuides, type GuideDirectoryEntry, type GuidePhoto, type GuideTopicId, type GuideSection, type GuideTable, type TravelGuide } from "@/data/travelGuides";
import { publicSources, isPublisherUrl, linksForPage, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE, type TravelGuideId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { AuthorCard } from "@/components/AuthorCard";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { guideContactCopy, type GuideContactKind } from "@/lib/guide-contact";
import { JerusalemJourneyOptions, JerusalemJourneyBooking, JerusalemJourneyResources } from "@/components/JerusalemJourneyPlanner";
import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { ShabbatBusLinks, ShabbatTerminalSteps, ShabbatTimesLink, ShabbatPublicTransportLinks } from "@/components/ShabbatGuideExtras";

function sourcesFor(guide: TravelGuide) { return [...new Set([...guide.sourceIds, ...guide.sections.flatMap((section) => section.sourceIds || [])])]; }

function guideContactKind(guide: TravelGuide): GuideContactKind {
  if (guide.id === "shabbat") return "shabbat";
  if (["arrival", "airportTaxis", "sherut"].includes(guide.id)) return "airport";
  if (guide.id === "esim") return "connectivity";
  if (guide.topics.includes("transportation")) return "transport";
  if (guide.topics.includes("accommodation")) return "accommodation";
  if (guide.topics.includes("itineraries")) return "itinerary";
  if (guide.topics.includes("attractions") || guide.topics.includes("religion")) return "attraction";
  return "general";
}

const taxiNavCompactLabels: Readonly<Record<string, string>> = {
  "at-a-glance": "Overview",
  recognize: "Licensed taxis",
  booking: "Booking",
  fares: "Fares",
  apps: "Apps",
  airport: "Airport taxis",
  sherut: "Sherut",
  holidays: "Shabbat & holidays",
  payment: "Payment",
  "special-needs": "Luggage & access",
  intercity: "Long-distance",
  safety: "Safety",
  checklist: "Checklist",
  faq: "FAQ",
  sources: "Sources",
  contact: "Contact Moshe",
};

export function travelGuideMeta(id: TravelGuideId) {
  const guide = travelGuides[id];
  const updatedAt = guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE;
  const path = travelGuidePaths[id];
  const meta = pageMeta({ title: id === "shabbat" ? "Ben Gurion Airport on Shabbat: Bus 711, Taxis & Trains" : guide.title, description: guide.description, path, type: "article", crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/guides/" }, { name: guide.title, path }], image: guide.photo.src, imageAlt: guide.photo.alt });
  const imageUrl = new URL(guide.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, scripts: [...meta.scripts, jsonLd(
    { "@context": "https://schema.org", "@type": "Article", "@id": `${CANONICAL_ORIGIN}${path}#article`, headline: guide.title, description: guide.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${path}`, inLanguage: "en", dateModified: updatedAt,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      about: guide.topics.map((topic) => guideTopics.find((item) => item.id === topic)!.label), citation: publicSources(sourcesFor(guide)).map((source) => source.url), image: imageUrl,
    })] };
}

export function GuideTags({ topics }: { topics: GuideTopicId[] }) {
  return <ul className="flex flex-wrap gap-2" aria-label="Guide topics">{topics.map((id) => <li key={id}><Link to="/guides/" search={{ topic: id }} className="inline-block rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary hover:bg-secondary">{guideTopics.find((topic) => topic.id === id)!.label}</Link></li>)}</ul>;
}

export function GuidePhotoCredit({ photo, insideDisclosure = false }: { photo: GuidePhoto; insideDisclosure?: boolean }) {
  if (!hasPublicPhotoCredit(photo)) return null;
  const sourceUrl = !isPublisherUrl(photo.sourceUrl) ? photo.sourceUrl : undefined;
  const attribution = <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit || "Photo source"}<span className="sr-only"> (opens in a new tab)</span></a> : photo.credit}{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licence<span className="sr-only"> (opens in a new tab)</span></a></>}</p>;
  // Keep attribution and licence links accessible, without showing technical metadata below photos.
  if (insideDisclosure) return attribution;
  return <details className="mt-2 text-xs text-muted-foreground">
    <summary className="w-fit cursor-pointer rounded px-1 py-1 text-xs font-medium underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-primary">Photo credits &amp; licence</summary>
    <div className="pb-2 pl-1">{attribution}</div>
  </details>;
}

/** Keep section images with the text they illustrate, after the opening paragraph. */
function GuideSectionPhoto({ photo }: { photo: GuidePhoto }) {
  return (
    <figure className="max-w-3xl">
      <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />
      <GuidePhotoCredit photo={photo} />
    </figure>
  );
}

/** Show links beside time-sensitive claims without repeating every reference
 * under each Shabbat paragraph; all cited sources remain in the source list. */
function showSectionReferences(guideId: TravelGuideId, sectionId: string) {
  if (guideId === "shabbat") return ["terminal-transfer", "taxis-transfers", "practical"].includes(sectionId);
  if (guideId === "taxis") return ["fares", "airport", "sherut", "safety"].includes(sectionId);
  return true;
}

function SectionReferences({ ids }: { ids: string[] }) {
  const sources = publicSources(ids);
  if (!sources.length) return null;
  return <p className="mt-4 text-xs text-muted-foreground">References: {sources.map((source, index) => <span key={source.id}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.publisher}<span className="sr-only"> (opens in a new tab)</span></a></span>)}</p>;
}

export function GuideCard({ guide, headingLevel = 2 }: { guide: GuideDirectoryEntry; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card" data-testid="guide-directory-card">
    <Link to={guide.to} className="group flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
      {guide.photo && <img src={guide.photo.src} alt={guide.photo.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-5"><Heading className="text-2xl font-semibold leading-tight group-hover:text-primary">{guide.title}</Heading><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p><span className="mt-4 text-sm font-semibold text-primary">Read more →</span></div>
    </Link>
    <div className="px-5 pb-5"><GuideTags topics={guide.topics} /></div>
  </article>;
}

function GuideDataTable({ table }: { table: GuideTable }) {
  return <div className="mt-6">
    <h3 className="text-xl font-semibold">{table.caption}</h3>
    <div role="region" aria-label={table.caption} tabIndex={0} className="mt-3 max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-primary">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead className="bg-secondary"><tr>{table.headers.map((h) => <th key={h} scope="col" className="p-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody className="divide-y">{table.rows.map((row, i) => <tr key={i} className="bg-card">{row.map((cell, j) => j === 0 ? <th scope="row" key={j} className="p-3 font-medium">{cell}</th> : <td key={j} className="p-3 leading-relaxed">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    {table.note && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{table.note}</p>}
  </div>;
}

/** Link a specific phrase inside a paragraph, keeping all other article text as plain text. */
export function GuideParagraph({ paragraph, inlineLinks }: { paragraph: string; inlineLinks?: GuideSection["inlineLinks"] }) {
  if (!inlineLinks?.length) return <>{paragraph}</>;
  const matches = inlineLinks
    .map(({ text, to }) => ({ text, to, index: paragraph.indexOf(text) }))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index);
  const parts: ReactNode[] = [];
  let pos = 0;
  for (const { text, to, index } of matches) {
    if (index < pos) continue;
    parts.push(paragraph.slice(pos, index));
    parts.push(<Link key={`${index}-${text}`} to={to} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary">{text}</Link>);
    pos = index + text.length;
  }
  parts.push(paragraph.slice(pos));
  return <>{parts}</>;
}

export function TravelGuidePage({ id }: { id: TravelGuideId }) {
  const guide = travelGuides[id];
  const providers = guide.providerPageId ? linksForPage(guide.providerPageId) : [];
  const isJerusalemDayJourney = id === "bethlehem" || id === "jerusalemDeadSea";
  const isJerusalemCluster = (["jerusalem", "jerusalemChurches", "jerusalemShopping", "jerusalemDayTrips", "bethlehem", "jerusalemDeadSea"] as string[]).includes(id);
  return <main className="mx-auto max-w-5xl px-4 pb-8">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }, { name: guide.title, to: travelGuidePaths[id] }]} />
        <div className="mt-6"><GuideTags topics={guide.topics} /></div>
        <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div><h1 className="text-4xl leading-[1.1] md:text-5xl">{guide.title}</h1><p className="mt-4 text-lg leading-relaxed text-foreground">{guide.intro}</p>
            <PageUpdated date={guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE} />
          </div>
          <figure><img src={guide.photo.src} alt={guide.photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover" /><GuidePhotoCredit photo={guide.photo} /></figure>
        </div>
        <AuthorCard />
      </header>
      <section id="quick-answer" aria-labelledby="answer-h" className="mt-8 scroll-mt-24 rounded-2xl border border-primary/20 bg-secondary/60 p-5 sm:p-7">
        <h2 id="answer-h" className="text-2xl">Quick answer</h2><p className="mt-3 text-lg leading-relaxed">{guide.answer}</p>
        {guide.reviewNote && <p className="mt-4 border-t border-primary/20 pt-3 text-sm leading-relaxed text-muted-foreground">{guide.reviewNote}</p>}
      </section>
      {isJerusalemDayJourney && <JerusalemJourneyOptions id={id} />}
      <OnThisPage sections={isJerusalemDayJourney
        ? [["journey-options", "Compare transport"], ["journey-destinations", "Stops & destinations"], ...guide.sections.map((section) => [section.id, section.title] as const), ["journey-booking", "Tours & private trips"], ["checklist", "Checklist"], ["faq", "FAQ"], ["sources", "Sources"], ["contact", "Contact Moshe"]]
        : [["at-a-glance", "At a glance"], ...guide.sections.map((section) => [section.id, section.title] as const), ["checklist", "Checklist"], ["faq", "FAQ"], ["sources", "Sources"], ["contact", "Contact Moshe"] as const]} compactLabels={id === "taxis" ? taxiNavCompactLabels : undefined} />
      {!isJerusalemDayJourney && <section id="at-a-glance" aria-labelledby="comparison-h" className="mt-10 scroll-mt-24">
        <h2 id="comparison-h" className="text-3xl">{guide.comparison.caption}</h2>
        <div className="mt-5 max-w-full overflow-x-auto rounded-xl border"><table className="w-full min-w-[560px] text-left text-sm"><caption className="sr-only">{guide.comparison.caption}</caption><thead className="bg-secondary"><tr>{guide.comparison.headers.map((heading) => <th key={heading} scope="col" className="p-4 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y">{guide.comparison.rows.map((row, index) => <tr key={index} className="bg-card">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="p-4 font-medium">{cell}</th> : <td key={cellIndex} className="p-4 leading-relaxed text-muted-foreground">{cell}</td>)}</tr>)}</tbody></table></div>
      </section>}
      {guide.sections.map((section) => <Fragment key={section.id}><section id={section.id} aria-labelledby={`${section.id}-h`} className="mt-12 scroll-mt-24"><h2 id={`${section.id}-h`} className="text-3xl">{section.title}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-foreground">
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <Fragment key={paragraphIndex}>
              <p><GuideParagraph paragraph={paragraph} inlineLinks={section.inlineLinks} /></p>
              {paragraphIndex === 0 && section.photo && <GuideSectionPhoto photo={section.photo} />}
            </Fragment>
          ))}
          {section.paragraphs.length === 0 && section.photo && <GuideSectionPhoto photo={section.photo} />}
        </div>{section.tables?.map((table) => <GuideDataTable key={table.caption} table={table} />)}{section.bullets && <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.links && <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{section.links.map((link) => <li key={link.to}><Link to={link.to} className="font-medium text-primary underline underline-offset-4">{link.label}</Link></li>)}</ul>}{section.externalLinks && <ul aria-label="Official resources" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{section.externalLinks.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{link.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>}{showSectionReferences(id, section.id) && <SectionReferences ids={section.sourceIds || []} />}{id === "shabbat" && section.id === "taxis-transfers" && <p className="mt-4 max-w-4xl leading-relaxed text-foreground">Want to arrange a private pickup on Shabbat? <a href="#contact" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Send me your arrival details using the contact form below</a>.</p>}</section>{id === "shabbat" && section.id === "shabbat-hours" && <ShabbatTimesLink />}{id === "shabbat" && section.id === "weekend-711" && <ShabbatBusLinks />}{id === "shabbat" && section.id === "terminal-transfer" && <ShabbatTerminalSteps />}{id === "shabbat" && section.id === "restart" && <ShabbatPublicTransportLinks />}</Fragment>)}
      {isJerusalemDayJourney && <JerusalemJourneyBooking id={id} />}
      <section id="checklist" aria-label="Travel checklist" className="mt-12 scroll-mt-24"><Checklist title="Before you go" items={guide.checklist} /></section>
      {providers.length > 0 && <section id="provider-options" aria-labelledby="providers-h" className="mt-14"><h2 id="providers-h" className="text-3xl">Compare current eSIM plans</h2><p className="mt-3 leading-relaxed text-muted-foreground">These options are based on published product information, not an on-location speed test or a cheapest-price ranking. Links marked “Sponsored link” may earn me a commission at no extra cost to you. Select Israel and verify the exact package before paying.</p><ul className="mt-5 grid gap-4 md:grid-cols-2">{providers.map((link) => <ProviderCard key={link.id} link={link} pageId={guide.providerPageId!} />)}</ul></section>}
      <JerusalemPartnerOffers id={id} />
      {isJerusalemCluster && <JerusalemClusterLinks pageKey={id as JerusalemClusterKey} />}
      <FaqList faqs={guide.faqs} />
      {isJerusalemDayJourney && <JerusalemJourneyResources id={id} />}
      {id === "shabbat" ? <SourceList ids={sourcesFor(guide)} intro="Official airport, public-transport and taxi-tariff references. Confirm timetables, charges and pickup instructions for your date." /> : <SourceList ids={sourcesFor(guide)} />}
      {!isJerusalemCluster && id !== "shabbat" && <RelatedLinks title="Related practical guides" currentPath={travelGuidePaths[id]} items={guide.related.map((guideId) => ({ label: travelGuides[guideId].title, to: travelGuidePaths[guideId] }))} />}
      {!isJerusalemCluster && id !== "shabbat" && <RelatedLinks title="Plan the next part of your trip" items={guide.services} />}
      {id === "shabbat" && <RelatedLinks title="Related practical guides" currentPath={travelGuidePaths.shabbat} items={[
        { label: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
        { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
        { label: "Ben Gurion Airport to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
        { label: "Ben Gurion Airport to Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
        { label: "Official airport taxi pickup", to: travelGuidePaths.airportTaxis },
        { label: "Ben Gurion Airport arrival tips", to: travelGuidePaths.arrival },
      ]} />}
      {id === "shabbat" && <RelatedLinks title="Plan the next part of your trip" items={guide.services} />}
      {guide.reading && <section aria-labelledby="reading-h" className="mt-12"><h2 id="reading-h" className="text-2xl">More on this topic</h2><ul className="mt-4 space-y-3">{guide.reading.map((reading) => <li key={reading.href} className="rounded-xl border p-4"><a href={reading.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">{reading.label}<span className="sr-only"> (opens in a new tab)</span></a><p className="mt-1 text-sm text-muted-foreground">{reading.note}</p></li>)}</ul></section>}
      {id === "taxis" && <HomeContactForm context="taxis" />}
      {id !== "taxis" && <HomeContactForm key={id} guide={guideContactCopy(guide.title, guideContactKind(guide), guide.title.split(":")[0])} />}
    </article>
  </main>;
}
