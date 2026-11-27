import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  CalendarClock,
  Landmark,
  Route,
  Lightbulb,
  Plane,
  Sun,
} from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { Breadcrumbs, FaqList, OnThisPage, RelatedLinks, Section } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { guideContactCopy } from "@/lib/guide-contact";

const factIcons = {
  location: MapPin,
  duration: Clock3,
  admission: Ticket,
  hours: CalendarClock,
  highlights: Landmark,
  access: Route,
} as const;
export type AttractionFact = {
  icon: keyof typeof factIcons;
  label: string;
  value: string;
  note?: string;
};
export type AttractionSource = { label: string; url: string; note?: string };
export type AttractionNearbyLink = { label: string; to: LinkProps["to"]; note?: string };
const planningIcons = {
  region: BookOpen,
  itinerary: CalendarDays,
  seasons: Sun,
  transport: Route,
  arrival: Plane,
} as const;
export type AttractionPlanningLink = {
  label: string;
  to: LinkProps["to"];
  description?: string;
  icon?: keyof typeof planningIcons;
};
/** Yellow-bulb editorial guidance. Advice may be first-person, but must not
 * invent a visit or personal observation the author has not reported. */
export function AttractionPracticalTip({ children }: { children: ReactNode }) {
  return (
    <aside
      className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-foreground dark:border-amber-800/55 dark:bg-amber-950/20"
      data-testid="attraction-practical-tip"
    >
      <Lightbulb
        className="mt-0.5 h-5 w-5 shrink-0 fill-amber-300/80 text-amber-600 dark:text-amber-400"
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </aside>
  );
}

/** Reusable page framework for individual /attractions/ sites.
 * Slots let an archaeological site, church, city or nature reserve have distinct
 * researched content without forcing identical filler sections.
 */
export type AttractionDestinationContent = {
  path: LinkProps["to"];
  placeName: string;
  title: string;
  /** Shorter visual headline for narrow screens without changing SEO title. */
  heroTitle?: string;
  /** Optional idiomatic section heading for cities and historic districts. */
  highlightsTitle?: string;
  region: string;
  intro: string;
  hero: { src: string; alt: string; mobileSrc?: string };
  updatedAt: string;
  facts: AttractionFact[];
  /** Optional grammar-safe heading for place names beginning with an article. */
  factsTitle?: string;
  glanceNote?: ReactNode;
  highlightContent: ReactNode;
  historyContent?: ReactNode;
  contactIntroduction?: string;
  historyTitle?: string;
  visitorContent?: ReactNode;
  visitorTitle?: string;
  visitorNavLabel?: string;
  transportContent?: ReactNode;
  transportTitle?: string;
  itineraryContent?: ReactNode;
  itineraryFirst?: boolean;
  /** Put an interactive route plan before the landmark descriptions for walking guides. */
  itineraryBeforeHighlights?: boolean;
  itineraryTitle?: string;
  foodContent?: ReactNode;
  practicalContent?: ReactNode;
  tourContent?: ReactNode;
  faqs?: { q: string; a: string }[];
  nearby?: AttractionNearbyLink[];
  relatedTitle?: string;
  planningLinks?: AttractionPlanningLink[];
  /** Optional compact menu for a multi-stop city guide; does not hide page sections. */
  navigationSections?: [string, string][];
  sources: AttractionSource[];
  /** Optional compact attributions for third-party images below the source list. */
  photoCredits?: ReactNode;
};

function AtAGlance({
  placeName,
  facts,
  note,
  title,
}: {
  placeName: string;
  facts: AttractionFact[];
  note?: ReactNode;
  title?: string | undefined;
}) {
  return (
    <section id="at-a-glance" aria-labelledby="at-a-glance-h" className="mt-7 scroll-mt-24">
      <h2 id="at-a-glance-h" className="text-xl font-bold sm:text-2xl">
        {title ?? `${placeName} at a glance`}
      </h2>
      <div
        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3"
        data-testid="attraction-at-a-glance"
      >
        {facts.map((fact) => {
          const Icon = factIcons[fact.icon];
          return (
            <div
              key={fact.label}
              className="min-w-0 rounded-xl border border-amber-200/80 bg-amber-50/90 px-3 py-3 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/20 sm:px-4"
            >
              <div className="flex items-center gap-1.5">
                <Icon
                  className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-muted-foreground">
                  {fact.label}
                </p>
              </div>
              <p className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">
                {fact.value}
              </p>
              {fact.note && (
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{fact.note}</p>
              )}
            </div>
          );
        })}
      </div>
      {note && (
        <p className="mt-3 border-l-2 border-primary/50 bg-secondary/20 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
    </section>
  );
}

/** Standard article photo: 4:3 at every breakpoint, up to 260 × 195 px on desktop.
 * Full mobile width; independent of the compact hero, panoramas and link thumbnails.
 */
export function AttractionContentImage({
  src,
  alt,
  position,
  mobileContain,
}: {
  src: string;
  alt: string;
  position?: string;
  mobileContain?: boolean;
}) {
  if (mobileContain) {
    return (
      <img
        src={src}
        alt={alt}
        width={520}
        height={390}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] h-auto w-full rounded-lg bg-muted/20 object-contain sm:object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={520}
      height={390}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] h-auto w-full rounded-lg object-cover"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

export function AttractionHighlight({
  title,
  image,
  children,
  note,
  mobileImageFirst = false,
}: {
  title: string;
  image?: { src: string; alt: string; position?: string; mobileContain?: boolean } | undefined;
  children: ReactNode;
  note?: ReactNode;
  /** Destination-specific choice: put the photograph above its description only on mobile. */
  mobileImageFirst?: boolean;
}) {
  return (
    <article
      className="rounded-xl border border-border/80 bg-card p-4 sm:p-5"
      data-testid="attraction-highlight"
    >
      <div
        className={
          image
            ? "grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)] sm:items-start lg:grid-cols-[minmax(0,1fr)_260px]"
            : ""
        }
      >
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold leading-snug">{title}</h3>
          <div className="mt-2 space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
          {note && (
            <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm leading-relaxed text-muted-foreground">
              {note}
            </p>
          )}
        </div>
        {image &&
          (mobileImageFirst ? (
            <div className="order-first min-w-0 sm:order-last">
              <AttractionContentImage
                src={image.src}
                alt={image.alt}
                {...(image.position ? { position: image.position } : {})}
                {...(image.mobileContain ? { mobileContain: true } : {})}
              />
            </div>
          ) : (
            <AttractionContentImage
              src={image.src}
              alt={image.alt}
              {...(image.position ? { position: image.position } : {})}
              {...(image.mobileContain ? { mobileContain: true } : {})}
            />
          ))}
      </div>
    </article>
  );
}

/** Shared, destination-specific section headings. */
export function destinationSectionHeadings(placeName: string) {
  return {
    food: "Where to eat in " + placeName,
    practical: "Practical tips for visiting " + placeName,
  };
}

export function AttractionDestinationPage({ content }: { content: AttractionDestinationContent }) {
  const destinationHeadings = destinationSectionHeadings(content.placeName);
  const sections: [string, string][] = [
    ...(content.itineraryBeforeHighlights && content.itineraryContent
      ? [["visit-plan", content.itineraryTitle ?? "Plan your visit"] as [string, string]]
      : []),
    ["highlights", "What to see"],
    ...(content.itineraryFirst && !content.itineraryBeforeHighlights && content.itineraryContent
      ? [["visit-plan", content.itineraryTitle ?? "Plan your visit"] as [string, string]]
      : []),
    ...(content.visitorContent
      ? [["visitor-info", content.visitorNavLabel ?? "Opening hours & tickets"] as [string, string]]
      : []),
    ...(content.transportContent
      ? [["getting-there", "How to get there"] as [string, string]]
      : []),
    ...(!content.itineraryFirst && !content.itineraryBeforeHighlights && content.itineraryContent
      ? [["visit-plan", content.itineraryTitle ?? "Plan your visit"] as [string, string]]
      : []),
    ...(content.foodContent ? [["food", "Food and cafés"] as [string, string]] : []),
    ...(content.practicalContent ? [["practical", "Practical tips"] as [string, string]] : []),
    ...(content.historyContent
      ? [["history", "History and significance"] as [string, string]]
      : []),
    ...(content.tourContent ? [["tours", "Tours and private visits"] as [string, string]] : []),
    ...(content.faqs?.length ? [["faq", "Questions"] as [string, string]] : []),
    ...(content.nearby?.length ? [["nearby", "Related sites"] as [string, string]] : []),
    ...(content.planningLinks?.length
      ? [["trip-planning", "Plan your trip"] as [string, string]]
      : []),
    ["contact", "Contact me"],
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <header className="pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", to: "/" },
            { name: "Attractions", to: "/attractions/" },
            { name: content.heroTitle ?? content.title, to: content.path },
          ]}
        />
        <GuideHeroLayout
          image={
            <GuideHeroMedia
              src={content.hero.src}
              alt={content.hero.alt}
              mobileSrc={content.hero.mobileSrc}
            />
          }
        >
          <p className="eyebrow">{content.region} · Attractions</p>
          <h1 className="guide-page-title mt-3">{content.heroTitle ?? content.title}</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">
            {content.intro}
          </p>
          <PageUpdated date={content.updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>
      <AtAGlance
        placeName={content.placeName}
        facts={content.facts}
        note={content.glanceNote}
        title={content.factsTitle}
      />
      <OnThisPage sections={content.navigationSections ?? sections} />
      {content.itineraryBeforeHighlights && content.itineraryContent && (
        <Section id="visit-plan" title={content.itineraryTitle ?? "How to plan your visit"}>
          {content.itineraryContent}
        </Section>
      )}
      <Section
        id="highlights"
        title={content.highlightsTitle ?? "What to see at " + content.placeName}
        className="mt-9"
      >
        {content.highlightContent}
      </Section>
      {content.itineraryFirst && !content.itineraryBeforeHighlights && content.itineraryContent && (
        <Section id="visit-plan" title={content.itineraryTitle ?? "How to plan your visit"}>
          {content.itineraryContent}
        </Section>
      )}
      {content.visitorContent && (
        <Section
          id="visitor-info"
          title={content.visitorTitle ?? "Opening hours, tickets and practical information"}
        >
          {content.visitorContent}
        </Section>
      )}
      {content.transportContent && (
        <Section
          id="getting-there"
          title={content.transportTitle ?? "How to get to " + content.placeName}
        >
          {content.transportContent}
        </Section>
      )}
      {!content.itineraryFirst &&
        !content.itineraryBeforeHighlights &&
        content.itineraryContent && (
          <Section id="visit-plan" title={content.itineraryTitle ?? "How to plan your visit"}>
            {content.itineraryContent}
          </Section>
        )}
      {content.foodContent && (
        <Section id="food" title={destinationHeadings.food}>
          {content.foodContent}
        </Section>
      )}
      {content.practicalContent && (
        <Section id="practical" title={destinationHeadings.practical}>
          {content.practicalContent}
        </Section>
      )}
      {content.historyContent && (
        <Section id="history" title={content.historyTitle ?? "History and significance"}>
          {content.historyContent}
        </Section>
      )}
      {content.tourContent && (
        <Section id="tours" title="Guided tours and private visits">
          {content.tourContent}
        </Section>
      )}
      {!!content.faqs?.length && <FaqList faqs={content.faqs} />}
      {!!content.nearby?.length && (
        <section id="nearby" aria-label="Related sites" className="scroll-mt-24">
          <RelatedLinks
            title={content.relatedTitle ?? "Explore related sites"}
            currentPath={String(content.path)}
            items={content.nearby}
            illustrated
            maxPhotoCards={content.nearby.length >= 6 ? 6 : 4}
          />
        </section>
      )}
      {!!content.planningLinks?.length && (
        <nav
          id="trip-planning"
          aria-label="Plan your trip to Israel"
          className="mt-10 scroll-mt-24 rounded-xl border border-border/70 bg-secondary/15 p-4 sm:p-5"
          data-testid="attraction-trip-planning"
        >
          <h2 className="text-lg font-semibold sm:text-xl">Plan your trip to Israel</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Practical guides to help you plan the rest of your journey.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
            {content.planningLinks.map((item) => {
              const Icon = planningIcons[item.icon ?? "region"];
              return (
                <li key={String(item.to)} className="min-w-0">
                  <Link
                    to={item.to}
                    className="editorial-card-link group flex h-full min-w-0 flex-col items-start gap-2.5 rounded-lg border sm:flex-row border-border/75 bg-card px-3 py-3 text-foreground no-underline shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug group-hover:text-primary">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <HomeContactForm
        key={String(content.path)}
        showTripadvisorBesidePortraitMobile
        guide={{
          ...guideContactCopy(content.title, "attraction", content.placeName),
          ...(content.contactIntroduction ? { introduction: content.contactIntroduction } : {}),
        }}
      />
      <SourcesDisclosure>
        <p className="mb-3 leading-relaxed">
          Official information checked{" "}
          {new Date(content.updatedAt + "T00:00:00Z").toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
          .
        </p>
        <ul className="space-y-3">
          {content.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4"
              >
                {source.label}
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {source.note && <p className="mt-0.5 text-xs">{source.note}</p>}
            </li>
          ))}
        </ul>
      </SourcesDisclosure>
      {content.photoCredits && (
        <details
          className="group/attraction-credits mt-6 rounded-xl border bg-card text-sm text-muted-foreground"
          data-testid="attraction-photo-credits"
        >
          <summary className="cursor-pointer rounded-xl px-4 py-3 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-primary">
            Photo credits &amp; licences
          </summary>
          <div className="border-t px-4 py-4 text-xs leading-relaxed">{content.photoCredits}</div>
        </details>
      )}
    </main>
  );
}
