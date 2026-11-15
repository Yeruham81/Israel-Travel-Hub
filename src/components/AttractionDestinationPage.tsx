import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, Clock3, MapPin, Ticket, CalendarClock, Info } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { guideContactCopy } from "@/lib/guide-contact";

export type AttractionFact = { label: string; value: string; note?: string };
export type AttractionSource = { label: string; url: string; note?: string };
export type AttractionNearbyLink = { label: string; to: LinkProps["to"]; note?: string };

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
  visitorContent: ReactNode;
  transportContent: ReactNode;
  itineraryContent: ReactNode;
  tourContent?: ReactNode;
  faqs: { q: string; a: string }[];
  nearby: AttractionNearbyLink[];
  sources: AttractionSource[];
};

function AtAGlance({ placeName, facts, note }: { placeName: string; facts: AttractionFact[]; note?: ReactNode }) {
  const icons = [MapPin, Clock3, Ticket, CalendarClock, Info, Info];
  return (
    <section id="at-a-glance" aria-labelledby="at-a-glance-h" className="mt-7 scroll-mt-24">
      <h2 id="at-a-glance-h" className="text-xl font-bold sm:text-2xl">{placeName} at a glance</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" data-testid="attraction-at-a-glance">
        {facts.map((fact, index) => {
          const Icon = icons[index % icons.length]!;
          return <div key={fact.label} className="min-w-0 rounded-xl border border-border/80 bg-secondary/25 px-3 py-3 sm:px-4">
            <div className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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
      <div className={image ? "grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-start" : ""}>
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold leading-snug">{title}</h3>
          <div className="mt-2 space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
          {note && <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm leading-relaxed text-muted-foreground"><strong>Worth knowing:</strong> {note}</p>}
        </div>
        {image && <img src={image.src} alt={image.alt} width={640} height={480} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover" />}
      </div>
    </article>
  );
}

export function AttractionDestinationPage({ content }: { content: AttractionDestinationContent }) {
  const sections: [string, string][] = [
    ["highlights", "What to see"],
    ...(content.historyContent ? [["history", "History and significance"] as [string, string]] : []),
    ["visitor-info", "Opening hours & tickets"],
    ["getting-there", "How to get there"],
    ["visit-plan", "Plan your visit"],
    ...(content.tourContent ? [["tours", "Tours and private visits"] as [string, string]] : []),
    ["faq", "Questions"],
    ["nearby", "Nearby attractions"],
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
      {content.historyContent && <Section id="history" title="History and biblical significance">{content.historyContent}</Section>}
      <Section id="visitor-info" title="Opening hours, tickets and practical information">{content.visitorContent}</Section>
      <Section id="getting-there" title={"How to get to " + content.placeName}>{content.transportContent}</Section>
      <Section id="visit-plan" title="How to plan your visit">{content.itineraryContent}</Section>
      {content.tourContent && <Section id="tours" title="Guided tours and private visits">{content.tourContent}</Section>}
      <FaqList faqs={content.faqs} />
      <section id="nearby" aria-label="Nearby attractions" className="scroll-mt-24">
        <RelatedLinks title="Explore nearby attractions" currentPath={String(content.path)} items={content.nearby} illustrated maxPhotoCards={4} />
      </section>
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
