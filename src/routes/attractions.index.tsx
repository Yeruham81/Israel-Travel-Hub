import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BedDouble, CalendarDays, CarFront, Compass, Ship, TrainFront, type LucideIcon } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { Breadcrumbs } from "@/components/Guide";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions, attractionPlanningPaths, type AttractionHubCard } from "@/data/attractionsHub";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

const PATH = "/attractions/";
const TITLE = "Best attractions in Israel: places to visit & things to see";
const DESCRIPTION = "From Jerusalem's Old City and Tel Aviv's beaches to Masada, the Galilee and Eilat, discover memorable attractions and places to visit across Israel.";

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

const planningIcons: Record<string, LucideIcon> = {
  tours: Compass,
  "shore-excursions": Ship,
  hotels: BedDouble,
  transport: TrainFront,
  "private-days": CarFront,
  "practical-guides": CalendarDays,
};

function AttractionCard({ card }: { card: AttractionHubCard }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors hover:border-primary/60" data-testid="attraction-card">
      <Link
        to={card.to}
        className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
      >
        <div className="aspect-[3/2] overflow-hidden bg-secondary">
          <img src={card.photo.src} alt={card.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-serif text-xl font-semibold leading-snug group-hover:text-primary group-hover:underline group-hover:underline-offset-4 sm:text-2xl">{card.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
        </div>
      </Link>
    </article>
  );
}

function Attractions() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <div className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Attractions", to: PATH }]} />
      </div>

      <header className="mt-7 grid items-center gap-7 md:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow">Discover the places that make Israel memorable</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Attractions & places to visit in Israel</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore Jerusalem’s historic quarters and lively markets, enjoy Tel Aviv’s beaches and culture,
            or follow the Mediterranean coast to ancient ports and dramatic sea cliffs. Beyond the cities,
            discover the Sea of Galilee, Masada, the Dead Sea and desert landscapes stretching to Eilat.
          </p>
        </div>
        <img src={attractionHubPhotos.hero.src} alt={attractionHubPhotos.hero.alt} width={755} height={405} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-3xl object-cover md:aspect-[5/4]" />
      </header>
      <AuthorCard />

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
          <nav aria-label={"More ways to explore " + region.title} className="mt-4 border-t pt-3">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {region.planning.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{link.label} <ArrowUpRight size={14} aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 text-right">
            <a href="#browse-regions" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">Back to regions ↑</a>
          </div>
        </section>
      ))}

      <section aria-labelledby="more-ideas-heading" className="mt-14 border-t pt-9">
        <h2 id="more-ideas-heading" className="text-2xl font-semibold sm:text-3xl">More ways to plan your trip</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Finding the places you want to visit is only part of a great trip. Choose an interesting day out,
          decide where to stay and plan the journeys in between — with practical guidance for each step.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {attractionPlanningPaths.map((item) => {
            const Icon = planningIcons[item.id] ?? Compass;
            return (
              <article key={item.id} className="flex min-w-0 flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50" data-testid="attractions-planning-card">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="pt-1 text-xl font-semibold leading-snug">
                    <Link to={item.to} className="text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{item.title}</Link>
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <ul className="mt-4 space-y-2 border-t pt-3" aria-label={"Related reading for " + item.title}>
                  {item.links.map((link) => (
                    <li key={String(link.to)}>
                      <Link to={link.to} className="inline-flex items-start gap-1 text-sm font-semibold leading-snug text-primary underline-offset-4 hover:underline">
                        {link.label} <ArrowUpRight aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <details className="mt-12 rounded-xl border bg-card p-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold text-foreground">Images from the original WordPress media library</summary>
        <p className="mt-3 leading-relaxed">Region and Jerusalem shopping photographs were selected from the original site's archived media. Original filenames are listed here for attribution and rights-review tracking. Other guide-card images retain their existing source metadata in the guide library.</p>
        <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {Object.values(attractionHubPhotos).map((photo) => <li key={photo.sourceFilename}>{photo.sourceFilename}</li>)}
        </ul>
      </details>
    </main>
  );
}
