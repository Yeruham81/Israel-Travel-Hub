import { createFileRoute } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import { ArrowUpRight, BedDouble, BookOpen, CalendarDays, Smartphone, Sun, TrainFront, type LucideIcon } from "lucide-react";
import { HubHeader } from "@/components/Guide";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions, attractionPlanningPaths, attractionRelatedGuides, type AttractionHubCard } from "@/data/attractionsHub";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

const PATH = "/attractions/";
const TITLE = "Best attractions in Israel: places to visit & things to see";
const DESCRIPTION = "Explore Israel's individual attractions by region, including Jerusalem's Old City, Old Jaffa, Caesarea, Masada and sites across the Galilee and Negev.";

export const Route = createFileRoute("/attractions/")({
  head: () => {
    const meta = pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      path: PATH,
      image: attractionHubPhotos.hero.src,
      imageAlt: attractionHubPhotos.hero.alt,
      crumbs: [{ name: "Home", path: "/" }, { name: "Attractions", path: PATH }],
    });
    return {
      ...meta,
      scripts: [
        ...meta.scripts,
        jsonLd({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: CANONICAL_ORIGIN + PATH,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: attractionHubCards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: card.title,
              url: CANONICAL_ORIGIN + String(card.to),
            })),
          },
        }),
      ],
    };
  },
  component: Attractions,
});

const planningIcons: Record<(typeof attractionPlanningPaths)[number]["id"], LucideIcon> = {
  transport: TrainFront,
  seasons: Sun,
  hotels: BedDouble,
  tips: BookOpen,
  calendar: CalendarDays,
  esim: Smartphone,
};

function AttractionCard({ card }: { card: AttractionHubCard }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-primary/60 hover:shadow-md motion-safe:hover:-translate-y-0.5" data-testid="attraction-card">
      <Link
        to={card.to}
        className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
      >
        <div className="aspect-[3/2] overflow-hidden bg-secondary">
          <img src={card.photo.src} alt={card.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary group-hover:underline group-hover:underline-offset-4 sm:text-xl">{card.title}</h3>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-primary/65 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
        </div>
      </Link>
    </article>
  );
}

function Attractions() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Attractions", to: PATH }]}
        eyebrow="Discover the places that make Israel memorable"
        title="Attractions & places to visit in Israel"
        intro="Discover individual places worth visiting across Israel, from ancient cities and archaeological sites to churches, nature reserves and desert viewpoints. Browse the attractions by region below."
      />

      <section id="browse-regions" aria-labelledby="browse-regions-heading" className="mt-8 scroll-mt-24 border-y py-4 sm:mt-10 sm:py-5">
        <h2 id="browse-regions-heading" className="text-lg font-semibold sm:text-xl">Explore by region</h2>
        <nav aria-label="Jump to an attraction region" className="mt-3">
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4">
            {attractionHubRegions.map((region) => (
              <li key={region.id}>
                <a href={"#" + region.id} className="chip h-full w-full text-left sm:text-sm">
                  {region.navLabel ?? region.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {attractionHubRegions.map((region) => (
        <section key={region.id} id={region.id} aria-labelledby={region.id + "-heading"} className="mt-10 scroll-mt-24 sm:mt-12">
          <div className="flex items-start gap-3 border-b border-l-4 border-l-primary bg-secondary/20 py-3 pl-3 pr-2 sm:items-center sm:gap-5 sm:py-4 sm:pl-5 sm:pr-4">
            <img src={region.image.src} alt="" width={240} height={160} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-36" />
            <div className="min-w-0 flex-1">
              <h2 id={region.id + "-heading"} className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{region.title}</h2>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{region.summary}</p>
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {region.cards.map((card) => <AttractionCard key={card.id} card={card} />)}
          </div>
          {region.relatedGuides.length > 0 && (
            <nav aria-label={"More " + (region.navLabel ?? region.title) + " travel guides"} className="mt-5 border-t border-border/70 pt-3" data-testid="attraction-region-guides">
              <h3 className="text-sm font-semibold text-muted-foreground">More {region.navLabel ?? region.title} travel guides</h3>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {region.relatedGuides.map((guide) => (
                  <li key={String(guide.to)}>
                    <Link to={guide.to} className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      {guide.label}
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="mt-3 text-right">
            <a href="#browse-regions" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">Back to regions ↑</a>
          </div>
        </section>
      ))}

      <div className="mx-auto max-w-5xl">
        <section id="attractions-related" aria-labelledby="attractions-related-h" className="mt-12 border-t pt-9">
          <h2 id="attractions-related-h" className="text-2xl font-semibold">Related travel guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {attractionRelatedGuides.map(guide => <li key={String(guide.to)} className="min-w-0">
              <Link to={guide.to} className="group flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <img src={guide.photo.src} alt={guide.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-24 shrink-0 rounded-lg object-cover sm:w-28" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{guide.title}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                  <span className="mt-1.5 inline-block text-xs font-semibold text-primary group-hover:underline">Read guide</span>
                </span>
              </Link>
            </li>)}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Want to explore these places in person? Browse <Link to="/tours/" className="font-medium text-primary underline-offset-4 hover:underline">tours &amp; day trips</Link>, <Link to="/shore-excursions/" className="font-medium text-primary underline-offset-4 hover:underline">shore excursions</Link> or <Link to="/private-driver/" className="font-medium text-primary underline-offset-4 hover:underline">a private driver</Link>.
          </p>
        </section>

        <section id="attractions-trip-planning" aria-labelledby="attractions-trip-planning-h" className="mt-9">
          <h2 id="attractions-trip-planning-h" className="text-2xl font-semibold">Plan your trip to Israel</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {attractionPlanningPaths.map(item => {
              const Icon = planningIcons[item.id];
              return <li key={item.id} className="min-w-0">
                <Link to={item.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                  </span>
                </Link>
              </li>;
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
