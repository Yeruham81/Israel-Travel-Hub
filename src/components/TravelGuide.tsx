import { GuideTags, GuidePhotoCredit, GuideCard } from "@/components/GuideCard";
export { GuideTags, GuidePhotoCredit, GuideCard } from "@/components/GuideCard";
import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";
import { Link as RouterLink, type LinkProps } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import { Fragment, type ReactNode } from "react";
import { BedDouble, BookOpen, CarFront, Landmark, Lightbulb, TrainFront, Waves, Plane, Car, ReceiptText, MapPinned, Smartphone, Building2, Mountain, type LucideIcon } from "lucide-react";
import { Breadcrumbs, Checklist, FaqList, OnThisPage, ProviderNameLink, RelatedLinks, SourceList } from "@/components/Guide";
import { guideTopics, travelGuides, type GuideDirectoryEntry, type GuidePhoto, type GuideTopicId, type GuideSection, type GuideInlineSpan, type GuideTable, type TravelGuide } from "@/data/travelGuides";
import { publicSources, isPublisherUrl, linksForPage, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE, type TravelGuideId } from "@/data/registry";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { AuthorCard } from "@/components/AuthorCard";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PhotoCreditsDisclosure } from "@/components/PhotoCreditsDisclosure";
import { guideContactCopy, type GuideContactKind } from "@/lib/guide-contact";
import { JerusalemJourneyOptions } from "@/components/JerusalemJourneyPlanner";
import { BethlehemTourOptions } from "@/components/BethlehemTourOptions";
import { BethlehemGuideFollowUps } from "@/components/BethlehemGuideFollowUps";
import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { DeadSeaGuideFollowUps } from "@/components/DeadSeaGuideFollowUps";
import { DeadSeaTourOptions } from "@/components/DeadSeaTourOptions";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { ShabbatBusLinks, ShabbatTerminalSteps, ShabbatTimesLink, ShabbatPublicTransportLinks } from "@/components/ShabbatGuideExtras";
import { UsefulLinkCallout } from "@/components/UsefulLinkCallout";
import { AirportTaxiDestinationCards } from "@/components/AirportTaxiDestinationCards";
import { IconTripPlanningLinks } from "@/components/IconTripPlanningLinks";

const shabbatPlanningIcons: Record<string, LucideIcon> = {
  "/car-rental/": CarFront,
  "/travel-blog/where-to-stay-in-tel-aviv/": BedDouble,
  "/travel-blog/jerusalem-travel-guide/": Landmark,
  "/travel-blog/dead-sea-attractions/": Waves,
  [travelGuidePaths.israel]: TrainFront,
  [travelGuidePaths.travelTips]: BookOpen,
};

const uberSourceIds = ["guide-uber-availability", "guide-lyft-cities", "guide-ridesharing-bill-2026", "guide-gett-app", "guide-yango-israel", "guide-iaa", "taxi-fares-2026"];

const sherutPlanningIcons: Record<string, LucideIcon> = {
  "/airport-transfers/": Plane,
  "/private-driver-in-israel/": Car,
  "/travel-blog/ben-gurion-airport-to-jerusalem/": Landmark,
  "/travel-blog/ben-gurion-airport-to-tel-aviv/": Building2,
  "/travel-blog/ben-gurion-airport-to-haifa/": Mountain,
  [travelGuidePaths.esim]: Smartphone,
};

const telAvivPlanningIcons: Record<string, LucideIcon> = {
  "/travel-blog/ben-gurion-airport-to-tel-aviv/": Plane,
  "/private-driver-in-israel/": Car,
  "/travel-blog/attractions-in-tel-aviv/": MapPinned,
  "/attractions/jaffa/": Landmark,
  [travelGuidePaths.telAvivBeaches]: Waves,
  "/travel-blog/where-to-stay-in-tel-aviv/": BedDouble,
};

const israelPlanningIcons: Record<string, LucideIcon> = {
  "/airport-transfers/": Plane,
  "/private-driver-in-israel/": Car,
  "/car-rental/": CarFront,
  "/travel-blog/ben-gurion-airport-to-jerusalem/": Landmark,
  "/travel-blog/ben-gurion-airport-to-haifa/": Mountain,
  [travelGuidePaths.esim]: Smartphone,
};

const uberPlanningIcons: Record<string, LucideIcon> = {
  "/airport-transfers/": Plane,
  "/private-driver-in-israel/": Car,
  [travelGuidePaths.taxis]: CarFront,
  [travelGuidePaths.taxiFares]: ReceiptText,
  [travelGuidePaths.israel]: MapPinned,
  [travelGuidePaths.esim]: Smartphone,
};

function sourcesFor(guide: TravelGuide) { return [...new Set([...guide.sourceIds, ...guide.sections.flatMap(section => [...(section.sourceIds || []), ...(section.subsections || []).flatMap(sub => sub.sourceIds || [])])])]; }

function guideContactKind(guide: TravelGuide): GuideContactKind {
  if (guide.id === "shabbat") return "shabbat";
  if (guide.id === "sherut") return "sherut";
  if (["arrival", "airportTaxis"].includes(guide.id)) return "airport";
  if (guide.id === "esim") return "connectivity";
  if (guide.topics.includes("transportation")) return "transport";
  if (guide.topics.includes("accommodation")) return "accommodation";
  if (guide.topics.includes("itineraries")) return "itinerary";
  if (guide.topics.includes("attractions") || guide.topics.includes("religion")) return "attraction";
  return "general";
}

const fareNavCompactLabels: Readonly<Record<string, string>> = {
  "at-a-glance": "Meter rates",
  "time-distance": "The meter",
  "tariff-hours": "Night & Shabbat",
  extras: "Surcharges",
  examples: "Fare examples",
  estimates: "Compare options",
  disputes: "Fare problems",
  faq: "FAQ",
};

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
  contact: "Contact Me",
};

export function travelGuideMeta(id: TravelGuideId) {
  const guide = travelGuides[id];
  const updatedAt = guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE;
  const path = travelGuidePaths[id];
  const parent = path.startsWith("/attractions/") ? { name: "Attractions", path: "/attractions/" } : { name: "Travel guides", path: "/travel-blog/" };
  const meta = pageMeta({ title: id === "shabbat" ? "Ben Gurion Airport on Shabbat: Bus 711, Taxis & Trains" : guide.title, description: guide.description, path, type: "article", crumbs: [{ name: "Home", path: "/" }, parent, { name: guide.title, path }], image: guide.photo.src, imageAlt: guide.photo.alt });
  const imageUrl = new URL(guide.photo.src, CANONICAL_ORIGIN).href;
  return { ...meta, scripts: [...meta.scripts, jsonLd(
    { "@context": "https://schema.org", "@type": "Article", "@id": `${CANONICAL_ORIGIN}${path}#article`, headline: guide.title, description: guide.description, mainEntityOfPage: `${CANONICAL_ORIGIN}${path}`, inLanguage: "en", dateModified: updatedAt,
      author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
      about: guide.topics.map((topic) => guideTopics.find((item) => item.id === topic)!.label), citation: publicSources(id === "uber" ? uberSourceIds : sourcesFor(guide)).map((source) => source.url), image: imageUrl,
    })] };
}

/** Keep section images with the text they illustrate, after the opening paragraph. */
function GuideSectionPhoto({ photo }: { photo: GuidePhoto }) {
  return (
    <figure className="max-w-3xl">
      <img src={photo.src} srcSet={stage5PhotoSrcSet(photo.src)} sizes="(min-width: 1024px) 755px, calc(100vw - 34px)" alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] max-h-96 w-full rounded-xl object-cover" />

    </figure>
  );
}

/** Show links beside time-sensitive claims without repeating every reference
 * under each Shabbat paragraph; all cited sources remain in the source list. */
function showSectionReferences(guideId: TravelGuideId, sectionId: string) {
  if (guideId === "shabbat" || guideId === "uber" || guideId === "sherut") return false; // A single compact source list follows the contact form.
  if (guideId === "taxis") return ["fares", "airport", "sherut", "safety"].includes(sectionId);
  if (guideId === "airportTaxis") return false; // Highlighted official links and consolidated sources replace repetitive footnotes.
  if (guideId === "esim") return false; // Provider names link directly to the offers; do not repeat references.
  if (guideId === "taxiFares") return false; // Single authoritative list at the end, not repeated under each paragraph.
  if (guideId === "jerusalemDeadSea") return false; // Official links sit beside advice; a single full source list follows the contact form.
  if (guideId === "bethlehem") return false; // Official links appear in sections, with the complete source list after contact.
  if (guideId === "israel" || guideId === "telAviv") return false; // Overview guide sources appear at the end.
  return true;
}

function SectionReferences({ ids }: { ids: string[] }) {
  const sources = publicSources(ids);
  if (!sources.length) return null;
  return <p className="mt-4 text-xs text-muted-foreground">References: {sources.map((source, index) => <span key={source.id}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.publisher}<span className="sr-only"> (opens in a new tab)</span></a></span>)}</p>;
}

function GuideDataTable({ table, nested = false, mobileGuidance = false }: { table: GuideTable; nested?: boolean; mobileGuidance?: boolean }) {
  const Heading = nested ? "h4" : "h3";
  return <div className="mt-6">
    <Heading className="text-xl font-semibold">{table.caption}</Heading>
        <div role="region" aria-label={table.caption} tabIndex={0} className="mt-3 max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-primary">
      <table className={"w-full text-left text-sm " + (mobileGuidance ? "min-w-[720px]" : "min-w-[560px]")}>
        <caption className="sr-only">{table.caption}</caption>
        <thead className="bg-secondary"><tr>{table.headers.map((h, i) => <th key={h} scope="col" className={"p-3 font-semibold " + (mobileGuidance && i === 0 ? "sticky left-0 z-10 bg-secondary shadow-[1px_0_0_0_var(--border)]" : "")}>{h}</th>)}</tr></thead>
        <tbody className="divide-y">{table.rows.map((row, i) => <tr key={i} className="bg-card">{row.map((cell, j) => j === 0
          ? <th scope="row" key={j} className={"p-3 font-medium " + (mobileGuidance ? "sticky left-0 z-10 bg-card shadow-[1px_0_0_0_var(--border)]" : "")}>
              {table.rowLinks?.[i] ? ("to" in table.rowLinks[i]! ? <Link to={(table.rowLinks[i]! as { to: string }).to as LinkProps["to"]} className="font-medium text-primary underline underline-offset-4">{cell}</Link> : <a href={(table.rowLinks[i]! as { href: string }).href} target="_blank" rel="noopener noreferrer" aria-label={(table.rowLinks[i]! as { href: string; label?: string }).label || cell} className="font-medium text-primary underline underline-offset-4">{cell}<span className="sr-only"> (opens in a new tab)</span></a>) : cell}
            </th>
          : <td key={j} className="p-3 leading-relaxed">{cell}</td>)}</tr>)}</tbody>
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


/** Preserve Portable Text link spans and inline emphasis within the original guide layout. */
function GuideRichParagraph({ spans }: { spans: GuideInlineSpan[] }) {
  return <>{spans.map((span, index) => {
    let node: ReactNode = span.text;
    if (span.marks?.includes("code")) node = <code className="rounded bg-secondary px-1 py-0.5 text-sm">{node}</code>;
    if (span.marks?.includes("strong")) node = <strong>{node}</strong>;
    if (span.marks?.includes("em")) node = <em>{node}</em>;
    if (span.marks?.includes("underline")) node = <u>{node}</u>;
    if (span.to) node = <Link to={span.to} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary">{node}</Link>;
    if (span.href) node = <a href={span.href} target="_blank" rel={/^https:\/\/[a-z0-9-]+\.tpm\.li\//i.test(span.href) ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">{node}<span className="sr-only"> (opens in a new tab)</span></a>;
    return <Fragment key={index}>{node}</Fragment>;
  })}</>;
}

/** Link provider names in eSIM buying advice using existing tracked affiliate URLs. */
function emphasizeEsimNames(paragraph: string): ReactNode {
  return paragraph.split(/\b(Airalo|Saily|Yesim|GigSky|Drimsim)\b/g)
    .map((part, i) => /^(Airalo|Saily|Yesim|GigSky|Drimsim)$/.test(part) ? <strong key={i}>{part}</strong> : part);
}

/** Recommendations show one tracked provider action at the end, without repeated brand links. */
function esimRecommendation(paragraph: string, providers: ReturnType<typeof linksForPage>): ReactNode {
  const match = paragraph.match(/^(.*?)(My choice:\s*)(Airalo|Saily|Yesim|GigSky|Drimsim)(\.)$/s);
  if (!match) return emphasizeEsimNames(paragraph);
  const provider = providers.find((item) => item.providerName === match[3]);
  if (!provider) return emphasizeEsimNames(paragraph);
  return <>{emphasizeEsimNames(match[1] ?? "")}<strong>My choice:</strong>{" "}
    <ProviderNameLink link={provider} pageId="guide-esim">{match[3]}</ProviderNameLink>{match[4]}</>;
}

function EsimPickCards({ facts, providers }: { facts: TravelGuide["facts"]; providers: ReturnType<typeof linksForPage> }) {
  const recommendedNames = ["Saily", "Saily", "GigSky"];
  return <section aria-label="Choose your eSIM by trip type" className="mt-5 grid gap-3 sm:grid-cols-3">
    {facts.map((fact, index) => {
      const provider = providers.find((item) => item.providerName === recommendedNames[index]);
      return <article key={fact.label} className="flex h-full flex-col rounded-xl border bg-card px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="text-sm font-semibold text-foreground">{fact.label}</h3>
        <p className="mt-2 text-base font-semibold leading-snug">{fact.text}</p>
        {provider && <p className="mt-auto pt-4 text-sm"><strong>My choice:</strong>{" "}
          <ProviderNameLink link={provider} pageId="guide-esim">{provider.providerName} · See plans</ProviderNameLink>
        </p>}
      </article>;
    })}
  </section>;
}

/** Compare only genuine 30-day unlimited plans; Drimsim is disclosed as unavailable. */
function EsimUnlimitedComparison({ guide, providers }: { guide: TravelGuide; providers: ReturnType<typeof linksForPage> }) {
  const unlimited = guide.comparison.rows.filter((row) => row[0] !== "Drimsim");
  const drimsim = guide.comparison.rows.find((row) => row[0] === "Drimsim");
  return <section aria-label="Compare 30-day unlimited eSIM plans" className="mt-5">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {unlimited.map(([name, price, allowance]) => {
        const provider = providers.find((item) => item.providerName === name);
        return <article key={name} className={"flex min-w-0 flex-col rounded-xl border bg-card p-4 " + (name === "GigSky" ? "border-primary/60" : "")}>
          <h3 className="text-sm font-semibold">{provider ? <ProviderNameLink link={provider} pageId="guide-esim">{name}</ProviderNameLink> : name}</h3>
          <p className="mt-2 text-xl font-semibold tabular-nums">{price}</p>
          <p className="text-xs text-muted-foreground">Unlimited · 30 days</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{allowance}</p>
        </article>;
      })}
    </div>
    {drimsim && <p className="mt-3 text-sm text-muted-foreground"><strong>{drimsim[0]}:</strong> no unlimited plan. Its published Israel pay-as-you-go rate is €0.01 per MB; review activation fees and total usage costs before choosing it.</p>}
  </section>;
}

export function TravelGuidePage({ id }: { id: TravelGuideId }) {
  const guide = travelGuides[id];
  // Area A entry rules introduce the Bethlehem route choices before the comparison.
  const bethlehemEntryRules = id === "bethlehem" ? guide.sections.find((section) => section.id === "entry-rules") : undefined;
  const providers = guide.providerPageId ? linksForPage(guide.providerPageId) : [];
  const isJerusalemDayJourney = id === "bethlehem" || id === "jerusalemDeadSea";
  const isJerusalemCluster = (["jerusalem", "jerusalemChurches", "jerusalemShopping", "bethlehem", "jerusalemDeadSea"] as string[]).includes(id);
  const isNationalGuide = id === "israel";
  const isTransportOverview = isNationalGuide || id === "telAviv";
  const isTaxiFareGuide = id === "taxiFares";
  const overviewRowAnchors = id === "telAviv"
    ? ["choose", "paying", "red-line", "national-rail", "taxis", "taxis", "shabbat", "bikes", "bikes"]
    : ["israel-trains", "israel-buses", "israel-light-rail", "israel-taxis", "israel-sherut", "israel-rentals", "israel-drivers"];
  const creditedPhotos = [
    { label: "Main guide image", photo: guide.photo },
    ...guide.sections.flatMap(section => [
      ...(section.photo ? [{ label: section.title, photo: section.photo }] : []),
      ...(section.subsections || []).flatMap(sub => sub.photo ? [{ label: sub.title, photo: sub.photo }] : []),
    ]),
  ].filter(entry => hasPublicPhotoCredit(entry.photo)).map(({label, photo}) => ({
    label,
    credit: photo.credit,
    sourceUrl: photo.sourceUrl && !isPublisherUrl(photo.sourceUrl) ? photo.sourceUrl : undefined,
    licenseUrl: photo.licenseUrl,
  }));
  return <main className="mx-auto max-w-5xl px-4 pb-8">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: travelGuidePaths[id].startsWith("/attractions/") ? "Attractions" : "Travel guides", to: travelGuidePaths[id].startsWith("/attractions/") ? "/attractions/" : "/travel-blog/" }, { name: guide.title, to: travelGuidePaths[id] }]} />
        {!travelGuidePaths[id].startsWith("/attractions/") && <div className="mt-6"><GuideTags topics={guide.topics} /></div>}
        <GuideHeroLayout image={
          <GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}/>
        }>
          <h1 className="guide-page-title">{guide.title}</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{guide.intro}</p>
          <PageUpdated date={guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE} />
          {(id === "uber" || id === "sherut" || id === "israel" || id === "telAviv" || id === "jerusalemDeadSea") && <AuthorCard />}
        </GuideHeroLayout>
        {id !== "uber" && id !== "sherut" && id !== "israel" && id !== "telAviv" && id !== "jerusalemDeadSea" && <AuthorCard />}
      </header>
      <section id="quick-answer" aria-labelledby="answer-h" className="mt-8 scroll-mt-24 rounded-2xl border border-primary/20 bg-secondary/60 p-5 sm:p-7">
        <h2 id="answer-h" className="text-2xl">Quick answer</h2><p className="mt-3 text-lg leading-relaxed">{id === "esim" ? emphasizeEsimNames(guide.answer) : guide.answer}</p>
        {guide.reviewNote && <p className="mt-4 border-t border-primary/20 pt-3 text-sm leading-relaxed text-muted-foreground">{guide.reviewNote}</p>}
      </section>
      {id === "esim" && <><EsimPickCards facts={guide.facts} providers={providers} /><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Plan prices checked 15 November 2026 (USD unless otherwise stated). Prices, discounts, taxes and package terms can change; confirm the final amount and allowance with the provider before buying. Providers may display prices in your local currency.</p></>}
      {isTransportOverview && <section aria-label="Transport planning essentials" className="mt-5 grid gap-3 sm:grid-cols-3">
        {guide.facts.map(fact => <div key={fact.label} className="rounded-xl border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{fact.label}</p>
          <p className="mt-2 text-sm leading-relaxed">
            {fact.link && fact.text.includes(fact.link.text) ? <>
              {fact.text.slice(0, fact.text.indexOf(fact.link.text))}
              <a href={fact.link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary">
                {fact.link.text}<span className="sr-only"> (opens in a new tab)</span>
              </a>
              {fact.text.slice(fact.text.indexOf(fact.link.text) + fact.link.text.length)}
            </> : fact.text}
          </p>
        </div>)}
      </section>}
      {isJerusalemDayJourney && id !== "jerusalemDeadSea" && id !== "bethlehem" && <JerusalemJourneyOptions id={id} />}
      <OnThisPage sections={id === "jerusalemDeadSea"
        ? [["at-a-glance", "Compare options"], ["destinations", "Destinations & times"], ["bus", "Bus 486 / 444"], ["private", "Taxi & driver"], ["tours", "Organised tours"], ["driving", "Rental car"], ["beach", "Public beach"], ["journey-destinations", "Other stops"], ["contact", "Contact Me"]]
        : id === "bethlehem"
        ? [["entry-rules", "Area A & entry rules"], ["at-a-glance", "Compare travel options"], ...guide.sections.filter((section) => section.id !== "entry-rules").map((section) => [section.id, section.title] as const), ["checklist", "Checklist"], ["faq", "FAQ"], ["contact", "Contact"], ["sources", "Sources"]]
        : isJerusalemDayJourney
        ? [["journey-options", "Compare transport"], ["journey-destinations", "Stops & destinations"], ...guide.sections.map((section) => [section.id, section.title] as const), ["journey-booking", "Tours & private trips"], ["checklist", "Checklist"], ["faq", "FAQ"], ["sources", "Sources"], ["contact", "Contact Me"]]
        : id === "shabbat"
          ? [["at-a-glance", "Compare options"], ["shabbat-hours", "Shabbat services"], ["weekend-711", "Free bus 711"], ["terminal-transfer", "Terminal shuttle"], ["taxis-transfers", "Taxis & transfers"], ["costs", "Shabbat taxi fares"], ["destinations", "Destinations"], ["restart", "When trains resume"], ["faq", "FAQ"], ["contact", "Contact Me"]]
        : id === "arrival"
          ? [["at-a-glance", "Arrival steps"], ["before-you-fly", "Before flying"], ["arrival-terminal", "Terminal 3"], ["passport-control", "Passport control"], ["baggage", "Baggage claim"], ["customs", "Customs"], ["arrivals-hall", "Arrival hall"], ["leave-airport", "Transport"], ["arrival-timing", "Arrival timing"], ["faq", "FAQ"], ["contact", "Contact Me"]]
        : id === "taxis"
          ? [["at-a-glance", "Booking methods"], ["recognize", "Licensed taxis"], ["booking", "How to book"], ["fares", "Taxi fares"], ["apps", "Taxi apps"], ["airport", "Taking a Taxi from Ben Gurion Airport"], ["holidays", "Shabbat & holidays"], ["intercity", "Long-distance taxis"], ["faq", "FAQ"], ["contact", "Contact Me"]]
        : isTaxiFareGuide
          ? [["at-a-glance", "Meter rates"], ...guide.sections.map((section) => [section.id, section.title] as const), ["checklist", "Before you go"], ["faq", "FAQ"], ["contact", "Contact Me"], ["sources", "Sources"]]
          : id === "esim"
          ? [...guide.sections.map((section) => [section.id, section.title] as const), ["checklist", "Checklist"], ["faq", "FAQ"], ["contact", "Contact Me"]]
          : id === "uber" || id === "sherut"
          ? [["at-a-glance", id === "uber" ? "Compare ride options" : "Compare travel options"], ...guide.sections.map(section => [section.id, section.title] as const), ["checklist", "Before you go"], ["faq", "FAQ"], ["contact", "Contact Me"]]
        : id === "telAviv"
          ? [["at-a-glance", "Compare options"], ["choose", "Getting around"], ["paying", "Buses & tickets"], ["red-line", "Red Line"], ["national-rail", "Rail stations"], ["taxis", "Taxis & sherut"], ["bikes", "Cycling & driving"], ["shabbat", "Weekend travel"], ["accessibility", "Practical tips"], ["contact", "Contact Me"]]
        : id === "israel"
          ? [["at-a-glance", "Choosing transport"], ["public-transport", "Public transport"], ["paying", "Tickets & payment"], ["taxis-and-sherut", "Taxis & transfers"], ["destinations", "Cities & regions"], ["rental-car", "Car rental & day trips"], ["weekends", "Shabbat & travel tips"], ["contact", "Contact Me"]]
        : id === "airportTaxis"
          ? [["at-a-glance", "Pickup points"], ["steps", "How to book"], ["terminal3", "Terminal 3"], ["terminal1", "Terminal 1"], ["scheduled", "Advance booking"], ["fares", "Taxi fares"], ["weekend", "Shabbat & holidays"], ["destinations", "Popular destinations"], ["faq", "FAQ"], ["contact", "Contact Me"]]
          : [["at-a-glance", "At a glance"], ...guide.sections.map((section) => [section.id, section.title] as const), ["checklist", "Checklist"], ["faq", "FAQ"], ...(isTransportOverview ? [["contact", "Contact Me"], ["sources", "Sources"]] as const : [["sources", "Sources"], ["contact", "Contact Me"]] as const)]} compactLabels={id === "taxis" ? taxiNavCompactLabels : isTaxiFareGuide ? fareNavCompactLabels : undefined} />
      {bethlehemEntryRules && <section id={bethlehemEntryRules.id} aria-labelledby="entry-rules-h" className="mt-10 scroll-mt-24">
        <h2 id="entry-rules-h" className="text-3xl">{bethlehemEntryRules.title}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-foreground">
          {bethlehemEntryRules.paragraphs.map((paragraph, index) => <p key={index}>
            {bethlehemEntryRules.richParagraphs?.[index]
              ? <GuideRichParagraph spans={bethlehemEntryRules.richParagraphs[index]} />
              : <GuideParagraph paragraph={paragraph} inlineLinks={bethlehemEntryRules.inlineLinks} />}
          </p>)}
        </div>
      </section>}
      {id !== "esim" && (!isJerusalemDayJourney || id === "jerusalemDeadSea" || id === "bethlehem") && <section id="at-a-glance" aria-labelledby="comparison-h" className="mt-10 scroll-mt-24">
        <h2 id="comparison-h" className="text-3xl">{guide.comparison.caption}</h2>
        {isTransportOverview && <p className="mt-3 max-w-3xl leading-relaxed">{id === "israel" ? "Compare fares, the complete journey to your final address and availability for your travel date." : id === "telAviv" ? "Choose the option that suits your destination, fare and day of travel." : "Compare the entire trip to your final address. Cost labels are relative, not live fares; operating hours depend on your date and route."}</p>}
        {isTransportOverview && id !== "israel" && id !== "telAviv" && <p className="mt-3 text-xs text-muted-foreground sm:hidden">Swipe horizontally to view all five columns.</p>}
        <div role="region" aria-label="Transport comparison table" tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-primary"><table className={isTransportOverview ? "w-full min-w-[860px] text-left text-sm" : (id === "jerusalemDeadSea" || id === "bethlehem") ? "w-full min-w-[780px] text-left text-sm" : id === "uber" || id === "sherut" ? "w-full min-w-[760px] text-left text-sm" : isTaxiFareGuide ? "w-full min-w-[640px] text-left text-sm" : "w-full min-w-[560px] text-left text-sm"}><caption className="sr-only">{guide.comparison.caption}</caption><thead className="bg-secondary"><tr>{guide.comparison.headers.map((heading) => <th key={heading} scope="col" className={"p-4 font-semibold " + ((isTransportOverview || isTaxiFareGuide || id === "uber" || id === "sherut" || id === "jerusalemDeadSea" || id === "bethlehem") && heading === guide.comparison.headers[0] ? "sticky left-0 z-10 bg-secondary" : "")}>{heading}</th>)}</tr></thead><tbody className="divide-y">{guide.comparison.rows.map((row, index) => <tr key={index} className="bg-card">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className={"p-4 font-medium " + ((isTransportOverview || isTaxiFareGuide || id === "uber" || id === "sherut" || id === "jerusalemDeadSea" || id === "bethlehem") ? "sticky left-0 z-10 bg-card" : "")}>{isTransportOverview ? <a href={"#" + (overviewRowAnchors[index] || "choose")} className="text-primary underline underline-offset-4">{cell}</a> : cell}</th> : <td key={cellIndex} className="p-4 leading-relaxed text-muted-foreground">{cell}</td>)}</tr>)}</tbody></table></div>
        {isTaxiFareGuide && <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">Rates effective April 2026, specified through March 2027 unless amended. All amounts above include 18% VAT outside Eilat; the official regulation lists amounts before VAT.</p>}
      </section>}
      {isTransportOverview && id !== "israel" && id !== "telAviv" && <nav aria-label="Quick transport topics" className="mt-4 rounded-xl border bg-secondary/30 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Jump to a popular topic</p>
        <div className="flex flex-wrap gap-2">{(id === "telAviv" ? [
          ["paying", "Tickets & payment"],
          ["red-line", "Red Line stations"],
          ["national-rail", "Mainline rail"],
          ["shabbat", "Weekend transport"],
        ] : [
          ["israel-trains", "Train travel"],
          ["israel-ravkav", "Rav-Kav & payment"],
          ["israel-haifa", "Getting around Haifa"],
          ["weekends", "Shabbat & holidays"],
        ]).map(([anchor, label]) => <a key={anchor} href={"#" + anchor} className="rounded-full border bg-card px-3 py-2 text-sm font-medium text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary">{label}</a>)}</div>
      </nav>}
      {guide.sections.filter((section) => !(id === "bethlehem" && section.id === "entry-rules")).map((section) => <Fragment key={section.id}><section id={section.id} aria-labelledby={`${section.id}-h`} className="mt-12 scroll-mt-24"><h2 id={`${section.id}-h`} className="text-3xl">{section.title}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-foreground">
          {id === "airportTaxis" && section.id === "steps" ? (
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="airport-taxi-booking-steps">
              {section.paragraphs.map((step, index) => <li key={index} className="rounded-2xl border bg-card p-5 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-base font-bold text-primary">{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{["Order a taxi", "Save the ride code", "Join the official line"][index]}</h3>
                <p className="mt-2 text-sm leading-relaxed">{step.replace(/^\d+\.\s*/, "")}</p>
              </li>)}
            </ol>
          ) : section.paragraphs.map((paragraph, paragraphIndex) => (
            <Fragment key={paragraphIndex}>
              <p>{section.richParagraphs?.[paragraphIndex] ? <GuideRichParagraph spans={section.richParagraphs[paragraphIndex]} /> : id === "esim" ? esimRecommendation(paragraph, providers) : <GuideParagraph paragraph={paragraph} inlineLinks={section.inlineLinks} />}</p>
              {id === "esim" && section.id === "unlimited" && paragraphIndex === 0 && <EsimUnlimitedComparison guide={guide} providers={providers} />}
              {paragraphIndex === 0 && section.photo && <GuideSectionPhoto photo={section.photo} />}
            </Fragment>
          ))}
          {section.paragraphs.length === 0 && section.photo && <GuideSectionPhoto photo={section.photo} />}
        </div>{section.tables?.map((table) => <GuideDataTable key={table.caption} table={table} mobileGuidance={isTransportOverview || isTaxiFareGuide || id === "sherut" || id === "jerusalemDeadSea"} />)}
        {section.subsections?.map(sub => <section key={sub.id} id={sub.id} aria-labelledby={sub.id + "-h"} className="mt-9 scroll-mt-24">
          <h3 id={sub.id + "-h"} className="text-2xl font-semibold">{sub.title}</h3>
          <div className="mt-3 max-w-4xl space-y-4 leading-relaxed text-foreground">
            {sub.paragraphs.map((paragraph, paragraphIndex) => <Fragment key={paragraphIndex}>
              <p><GuideParagraph paragraph={paragraph} inlineLinks={sub.inlineLinks} /></p>
              {paragraphIndex === 0 && sub.photo && <GuideSectionPhoto photo={sub.photo} />}
            </Fragment>)}
            {sub.paragraphs.length === 0 && sub.photo && <GuideSectionPhoto photo={sub.photo} />}
          </div>
          {sub.steps && <div className="mt-6 max-w-4xl rounded-xl border bg-secondary/40 p-5" aria-label="Step-by-step instructions">
            <h4 className="text-lg font-semibold">{sub.id === "israel-trains" ? "How to request the free Jerusalem train voucher" : "Step by step"}</h4>
            <ol className="mt-3 list-decimal space-y-3 pl-5 leading-relaxed">{sub.steps.map(step => <li key={step}>{step}</li>)}</ol>
          </div>}
          {sub.tables?.map(table => <GuideDataTable key={table.caption} table={table} nested mobileGuidance={isTransportOverview} />)}
          {sub.bullets && <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{sub.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
          {sub.links && <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{sub.links.map(link => <li key={link.to}><Link to={link.to} className="font-medium text-primary underline underline-offset-4">{link.label}</Link></li>)}</ul>}
          {sub.externalLinks?.filter(link => !sub.highlightedLinks?.some(highlighted => highlighted.href === link.href)).map(link => <p key={link.href} className="mt-3 text-sm"><a href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{link.label}</a></p>)}
          {sub.highlightedLinks?.map(link => <UsefulLinkCallout key={link.href} {...link} />)}
        </section>)}
        {id === "airportTaxis" && section.id === "destinations" && <AirportTaxiDestinationCards />}{section.bullets && <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">{section.bullets.map((bullet) => <li key={bullet}>{id === "esim" ? emphasizeEsimNames(bullet) : bullet}</li>)}</ul>}{section.links && <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{section.links.map((link) => <li key={link.to}><Link to={link.to} className="font-medium text-primary underline underline-offset-4">{link.label}</Link></li>)}</ul>}{section.externalLinks?.some(link => !section.highlightedLinks?.some(highlighted => highlighted.href === link.href)) && <ul aria-label="Official resources" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{section.externalLinks.filter(link => !section.highlightedLinks?.some(highlighted => highlighted.href === link.href)).map((link) => <li key={link.href}><a href={link.href} target="_blank" rel={link.href.startsWith("https://tp.media/r?") ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="font-medium text-primary underline underline-offset-4">{link.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>}{section.highlightedLinks?.map(link => <UsefulLinkCallout key={link.href} {...link} />)}{section.tip && <aside role="note" className="mt-5 flex max-w-4xl items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:border-amber-700/70 dark:bg-amber-950/25 dark:text-amber-100"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden /><p><strong>Tip:</strong> {section.tip}</p></aside>}{id === "jerusalemDeadSea" && section.id === "tours" && <DeadSeaTourOptions />}{id === "bethlehem" && section.id === "tours" && <BethlehemTourOptions />}{showSectionReferences(id, section.id) && <SectionReferences ids={section.sourceIds || []} />}{id === "esim" && section.id === "coverage" && <p className="mt-4 max-w-4xl text-sm leading-relaxed">If Bethlehem is on your itinerary, see my <Link to="/travel-blog/jerusalem-to-bethlehem/" className="font-medium text-primary underline underline-offset-4">Jerusalem to Bethlehem travel guide</Link>.</p>}{id === "shabbat" && section.id === "taxis-transfers" && <p className="mt-4 max-w-4xl leading-relaxed text-foreground">Want to arrange a private pickup on Shabbat? <a href="#contact" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Send me your arrival details using the contact form below</a>.</p>}{id === "sherut" && section.id === "airport-alternatives" && <p className="mt-4 max-w-4xl leading-relaxed text-foreground">For a direct journey, <a href="#contact" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">ask me about a private airport pickup</a>.</p>}</section>
        {id === "shabbat" && section.id === "shabbat-hours" && <ShabbatTimesLink />}{id === "shabbat" && section.id === "weekend-711" && <ShabbatBusLinks />}{id === "shabbat" && section.id === "terminal-transfer" && <ShabbatTerminalSteps />}{id === "shabbat" && section.id === "restart" && <ShabbatPublicTransportLinks />}</Fragment>)}
      {id === "jerusalemDeadSea" && <JerusalemJourneyOptions id={id} />}
      
      {<section id="checklist" aria-label="Travel checklist" className="mt-12 scroll-mt-24"><Checklist title={id === "bethlehem" ? "Travel checklist" : "Before you go"} items={guide.checklist} /></section>}
      
      {id !== "jerusalemDeadSea" && id !== "bethlehem" && <JerusalemPartnerOffers id={id} />}
      {isJerusalemCluster && id !== "jerusalemDeadSea" && id !== "bethlehem" && <JerusalemClusterLinks pageKey={id as JerusalemClusterKey} />}
      <FaqList faqs={guide.faqs} {...(isTransportOverview && guide.faqGroups ? { groups: guide.faqGroups } : {})} />
      {id === "jerusalemDeadSea" && <DeadSeaGuideFollowUps />}
      {id === "bethlehem" && <BethlehemGuideFollowUps />}
      {!isTransportOverview && !isTaxiFareGuide && id !== "esim" && id !== "jerusalemDeadSea" && id !== "bethlehem" && id !== "airportTaxis" && id !== "taxis" && id !== "arrival" && id !== "shabbat" && id !== "uber" && id !== "sherut" && <SourceList ids={sourcesFor(guide)} />}
      {!isJerusalemCluster && id !== "shabbat" && <RelatedLinks title="Related practical guides" currentPath={travelGuidePaths[id]} illustrated={id === "israel" || id === "telAviv" || id === "esim" || id === "airportTaxis" || id === "arrival"} maxPhotoCards={id === "israel" || id === "telAviv" || id === "esim" || id === "airportTaxis" || id === "arrival" ? 6 : 4} items={guide.related.map((guideId) => ({ label: travelGuides[guideId].title, to: travelGuidePaths[guideId] }))} />}
      {!isJerusalemCluster && id !== "shabbat" && id !== "jerusalemDeadSea" && id !== "uber" && id !== "sherut" && id !== "israel" && id !== "telAviv" && <RelatedLinks title="Plan the next part of your trip" items={guide.services} />}
      {id === "shabbat" && <RelatedLinks title="Related practical guides" currentPath={travelGuidePaths.shabbat} illustrated maxPhotoCards={6} items={[
        { label: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
        { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
        { label: "Ben Gurion Airport to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
        { label: "Ben Gurion Airport to Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
        { label: "Official airport taxi pickup", to: travelGuidePaths.airportTaxis },
        { label: "Ben Gurion Airport arrival tips", to: travelGuidePaths.arrival },
      ]} />}
      {id === "telAviv" && <IconTripPlanningLinks title="Plan the next part of your trip" id="tel-aviv-trip-planning" className="mt-12" items={guide.services.map(item => ({ title: item.label, description: item.note ?? "", to: item.to, icon: telAvivPlanningIcons[String(item.to)] ?? BookOpen }))} />}
      {id === "israel" && <IconTripPlanningLinks title="Plan the next part of your trip" id="israel-trip-planning" className="mt-12" items={guide.services.map(item => ({ title: item.label, description: item.note ?? "", to: item.to, icon: israelPlanningIcons[String(item.to)] ?? BookOpen }))} />}
      {id === "sherut" && <IconTripPlanningLinks title="Plan the next part of your trip" id="sherut-trip-planning" className="mt-12" items={guide.services.map(item => ({ title: item.label, description: item.note ?? "", to: item.to, icon: sherutPlanningIcons[String(item.to)] ?? BookOpen }))} />}
      {id === "uber" && <IconTripPlanningLinks title="Plan the next part of your trip" id="uber-trip-planning" className="mt-12" items={guide.services.map(item => ({ title: item.label, description: item.note ?? "", to: item.to, icon: uberPlanningIcons[String(item.to)] ?? BookOpen }))} />}
      {id === "shabbat" && <IconTripPlanningLinks title="Plan the next part of your trip" id="shabbat-trip-planning" className="mt-12" items={guide.services.map(item => ({ title: item.label, description: item.note ?? "", to: item.to, icon: shabbatPlanningIcons[String(item.to)] ?? BookOpen }))} />}
      {guide.reading && <section aria-labelledby="reading-h" className="mt-12"><h2 id="reading-h" className="text-2xl">More on this topic</h2><ul className="mt-4 space-y-3">{guide.reading.map((reading) => <li key={reading.href} className="rounded-xl border p-4"><a href={reading.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">{reading.label}<span className="sr-only"> (opens in a new tab)</span></a><p className="mt-1 text-sm text-muted-foreground">{reading.note}</p></li>)}</ul></section>}
      {id === "taxis" && <HomeContactForm context="taxis" showTripadvisorBesidePortraitMobile />}
      {id !== "taxis" && <HomeContactForm key={id} showTripadvisorBesidePortraitMobile={id === "airportTaxis" || id === "taxiFares" || id === "arrival" || id === "shabbat" || id === "uber" || id === "sherut" || id === "israel" || id === "telAviv" || id === "jerusalemDeadSea" || id === "bethlehem"} guide={id === "uber" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Need a Private Transfer in Israel?", introduction: "Tell me your pickup location, destination, travel date and passenger details. I\u0027ll reply personally with an option suited to your journey.", placeholder: "Pickup, destination, date, passengers and luggage…" } : id === "airportTaxis" ? { ...guideContactCopy(guide.title, "airport"), eyebrow: "Contact Me", heading: "Need a private airport pickup?", introduction: "Tell me your arrival date, flight, destination, passengers and luggage. I'll reply personally about arranging a confirmed pickup.", placeholder: "Flight date, destination, passengers, luggage or your question…" } : id === "taxiFares" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Questions about a taxi journey?", introduction: "Tell me where and when you plan to travel. I can help you understand the available options or discuss a separately arranged private ride.", placeholder: "Route, travel date, passengers, luggage or your question…" } : id === "arrival" ? { ...guideContactCopy(guide.title, "airport"), eyebrow: "Contact Me", heading: "Need a private airport pickup?", introduction: "Tell me your arrival date, flight number, destination, passenger count and luggage. I can discuss a suitable confirmed airport transfer and meeting arrangement.", placeholder: "Flight date, destination, passengers, luggage or your question…" } : id === "shabbat" ? { ...guideContactCopy(guide.title, "shabbat"), eyebrow: "Contact Me" } : id === "bethlehem" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Need a Private Transfer To or From Jerusalem?", introduction: "Tell me your pickup location, destination, travel date, passengers and luggage. I\u0027ll reply personally about arranging private transport to or from Jerusalem.", placeholder: "Pickup, destination, date, passengers and luggage…" } : id === "jerusalemDeadSea" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Need a Private Transfer or Driver to the Dead Sea?", introduction: "Tell me your pickup location in Jerusalem, travel date, destinations, passengers and planned return time. I'll reply personally about arranging your private journey.", placeholder: "Jerusalem pickup, date, Dead Sea stops, passengers and return time…" } : id === "telAviv" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Need a Private Transfer or Driver in Tel Aviv?", introduction: "Tell me your pickup point, destination, travel date and number of passengers. I\u0027ll reply personally about arranging your private journey.", placeholder: "Pickup point, destination, date and passengers…" } : id === "israel" ? { ...guideContactCopy(guide.title, "transport"), eyebrow: "Contact Me", heading: "Need a Private Transfer or Driver in Israel?", introduction: "Tell me your travel date, pickup point, destinations and number of passengers. I\u0027ll reply personally about arranging a suitable private journey.", placeholder: "Travel date, pickup, destinations and passengers…" } : guideContactCopy(guide.title, guideContactKind(guide), guide.title.split(":")[0])} />}
      {id === "uber" && <SourceList ids={uberSourceIds} intro="Official information on ride apps, taxi regulations and airport pickup." compact linksOnly />}
      {id === "sherut" && <SourceList ids={sourcesFor(guide)} intro="Official information on airport pickup, public transport and local sherut services." compact linksOnly />}
      {id === "taxis" && <SourceList ids={sourcesFor(guide)} intro="Official taxi service, passenger rights and public transport sources for this guide." />}
      {id === "airportTaxis" && <SourceList ids={sourcesFor(guide)} intro="Official Gett, Israel Airports Authority and Ministry of Transport information for airport taxi booking, pickup and fares." />}
      {id === "arrival" && <SourceList ids={sourcesFor(guide)} intro="Official entry, airport, customs, baggage and transport information for planning your arrival." />}
      {id === "shabbat" && <SourceList ids={sourcesFor(guide)} intro="Official Line 711 seasonal timetables, airport services, regulated taxi fares and public transport references." />}
      {isTransportOverview && <SourceList ids={sourcesFor(guide)} intro={id === "israel" ? "Official public transport, railway and operator information." : id === "telAviv" ? "Official operator information on Tel Aviv transport, ticketing and weekend routes." : "Official operator and government references checked on the indicated dates. Routes, fares, ticket rules and accessibility can change; verify your exact journey before departure."} compact={id === "israel" || id === "telAviv"} linksOnly={id === "israel" || id === "telAviv"} />}
      {isTaxiFareGuide && <SourceList ids={sourcesFor(guide)} intro="Official taxi tariffs, applicable times and passenger-rights references." />}
      {id === "jerusalemDeadSea" && <SourceList ids={sourcesFor(guide)} intro="Official bus, beach and national-park information." compact linksOnly />}
      {id === "bethlehem" && <SourceList ids={sourcesFor(guide)} intro="Official bus, church and entry references." />}
      {id === "esim" && <SourceList ids={sourcesFor(guide)} intro="Official provider plan pages used for these comparisons. Prices, coverage and fair-use limits can change; confirm the details for the exact package before purchase." />}
      <PhotoCreditsDisclosure entries={creditedPhotos}/>
    </article>
  </main>;
}
