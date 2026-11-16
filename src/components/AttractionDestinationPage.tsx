import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import { ArrowUpRight, BookOpen, CalendarDays, Clock3, MapPin, Ticket, CalendarClock, Landmark, Route, Lightbulb, Plane, Sun } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { guideContactCopy } from "@/lib/guide-contact";

const factIcons = { location: MapPin, duration: Clock3, admission: Ticket, hours: CalendarClock, highlights: Landmark, access: Route } as const;
export type AttractionFact = { icon: keyof typeof factIcons; label: string; value: string; note?: string };
export type AttractionSource = { label: string; url: string; note?: string };
export type AttractionNearbyLink = { label: string; to: LinkProps["to"]; note?: string };
const planningIcons = { region: BookOpen, itinerary: CalendarDays, seasons: Sun, transport: Route, arrival: Plane } as const;
export type AttractionPlanningLink = {
  label: string;
  to: LinkProps["to"];
  description?: string;
  icon?: keyof typeof planningIcons;
};
/** Yellow-bulb editorial guidance. Advice may be first-person, but must not
 * invent a visit or personal observation the author has not reported. */
export function AttractionPracticalTip({ children }: { children: ReactNode }) {
  return <aside className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-foreground dark:border-amber-800/55 dark:bg-amber-950/20" data-testid="attraction-practical-tip">
    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 fill-amber-300/80 text-amber-600 dark:text-amber-400" aria-hidden="true" />
    <div className="min-w-0">{children}</div>
  </aside>;
}

/** Reusable page framework for individual /attractions/ sites.
 * Slots let an archaeological site, church, city or nature reserve have distinct
 * researched content without forcing identical filler sections.
 */
export type AttractionDestinationContent = {
  path: LinkProps["to"];
  placeName: string;
  title: string;
  region: string;
  intro: string;
  hero: { src: string; alt: string };
  updatedAt: string;
  facts: AttractionFact[];
  glanceNote?: ReactNode;
  highlightContent: ReactNode;
  historyContent?: ReactNode;
  historyTitle?: string;
  visitorContent: ReactNode;
  transportContent: ReactNode;
  itineraryContent: ReactNode;
  tourContent?: ReactNode;
  faqs: { q: string; a: string }[];
  nearby: AttractionNearbyLink[];
  relatedTitle?: string;
  planningLinks?: AttractionPlanningLink[];
  sources: AttractionSource[];
};

function AtAGlance({ placeName, facts, note }: { placeName: string; facts: AttractionFact[]; note?: ReactNode }) {
  return (
    <section id="at-a-glance" aria-labelledby="at-a-glance-h" className="mt-7 scroll-mt-24">
      <h2 id="at-a-glance-h" className="text-xl font-bold sm:text-2xl">{placeName} at a glance</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" data-testid="attraction-at-a-glance">
        {facts.map((fact) => {
          const Icon = factIcons[fact.icon];
          return <div key={fact.label} className="min-w-0 rounded-xl border border-amber-200/80 bg-amber-50/90 px-3 py-3 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/20 sm:px-4">
            <div className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-muted-foreground">{fact.label}</p>
            </div>
            <p className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">{fact.value}</p>
            {fact.note && <p className="mt-1 text-xs leading-snug text-muted-foreground">{fact.note}</p>}
          </div>;
        })}
      </div>
      {note && <p className="mt-3 border-l-2 border-primary/50 bg-secondary/20 px-3 py-2 text-sm leading-relaxed text-muted-foreground">{note}</p>}
    </section>
  );
}

export function AttractionHighlight({
  title, image, children, note,
}: {
  title: string;
  image?: { src: string; alt: string } | undefined;
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-border/80 bg-card p-4 sm:p-5" data-testid="attraction-highlight">
      <div className={image ? "grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,220px)] sm:items-start lg:grid-cols-[minmax(0,1fr)_240px]" : ""}>
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold leading-snug">{title}</h3>
          <div className="mt-2 space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
          {note && <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm leading-relaxed text-muted-foreground">{note}</p>}
        </div>
        {image && <img src={image.src} alt={image.alt} width={640} height={480} loading="lazy" decoding="async" className="aspect-[16/10] max-h-44 w-full rounded-lg object-cover sm:max-h-40 lg:max-h-44" />}
      </div>
    </article>
  );
}

export function AttractionDestinationPage({ content }: { content: AttractionDestinationContent }) {
  const sections: [string, string][] = [
    ["highlights", "What to see"],
    ["visitor-info", "Opening hours & tickets"],
    ["getting-there", "How to get there"],
    ["visit-plan", "Plan your visit"],
    ...(content.historyContent ? [["history", "History and significance"] as [string, string]] : []),
    ...(content.tourContent ? [["tours", "Tours and private visits"] as [string, string]] : []),
    ["faq", "Questions"],
    ["nearby", "Related sites"],
    ...(content.planningLinks?.length ? [["trip-planning", "Plan your trip"] as [string, string]] : []),
    ["contact", "Contact"],
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs items={[
          { name: "Home", to: "/" },
          { name: "Attractions", to: "/attractions/" },
          { name: content.title, to: content.path },
        ]} />
        <GuideHeroLayout image={<GuideHeroMedia src={content.hero.src} alt={content.hero.alt} />}>
          <p className="eyebrow">{content.region} · Attractions</p>
          <h1 className="guide-page-title mt-3">{content.title}</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{content.intro}</p>
          <PageUpdated date={content.updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>
      <AtAGlance placeName={content.placeName} facts={content.facts} note={content.glanceNote} />
      <OnThisPage sections={sections} />
      <Section id="highlights" title={"What to see at " + content.placeName} className="mt-9">
        {content.highlightContent}
      </Section>
      <Section id="visitor-info" title="Opening hours, tickets and practical information">{content.visitorContent}</Section>
      <Section id="getting-there" title={"How to get to " + content.placeName}>{content.transportContent}</Section>
      <Section id="visit-plan" title="How to plan your visit">{content.itineraryContent}</Section>
      {content.historyContent && <Section id="history" title={content.historyTitle ?? "History and significance"}>{content.historyContent}</Section>}
      {content.tourContent && <Section id="tours" title="Guided tours and private visits">{content.tourContent}</Section>}
      <FaqList faqs={content.faqs} />
      <section id="nearby" aria-label="Related sites" className="scroll-mt-24">
        <RelatedLinks title={content.relatedTitle ?? "Explore related sites"} currentPath={String(content.path)} items={content.nearby} illustrated maxPhotoCards={content.nearby.length >= 6 ? 6 : 4} />
      </section>
      {!!content.planningLinks?.length && <nav id="trip-planning" aria-label="Plan your trip to Israel" className="mt-10 scroll-mt-24 rounded-xl border border-border/70 bg-secondary/15 p-4 sm:p-5" data-testid="attraction-trip-planning">
        <h2 className="text-lg font-semibold sm:text-xl">Plan your trip to Israel</h2>
        <p className="mt-1 text-sm text-muted-foreground">Practical guides to help you plan the rest of your journey.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {content.planningLinks.map(item => {
            const Icon = planningIcons[item.icon ?? "region"];
            return <li key={String(item.to)} className="min-w-0">
              <Link to={item.to} className="group flex h-full min-w-0 items-start gap-2.5 rounded-lg border border-border/75 bg-card px-3 py-3 text-foreground no-underline shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{item.label}</span>
                  {item.description && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>}
                </span>
                <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-primary/75" aria-hidden="true" />
              </Link>
            </li>;
          })}
        </ul>
      </nav>}
      <HomeContactForm key={String(content.path)} guide={guideContactCopy(content.title, "attraction", content.placeName)} />
      <SourcesDisclosure>
        <p className="mb-3 leading-relaxed">Official information checked {new Date(content.updatedAt + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}. Visiting rules and access can change; check the relevant operator's latest notices for your date.</p>
        <ul className="space-y-3">
          {content.sources.map(source => <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">
              {source.label}<ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {source.note && <p className="mt-0.5 text-xs">{source.note}</p>}
          </li>)}
        </ul>
      </SourcesDisclosure>
    </main>
  );
}
