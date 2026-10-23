import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { Breadcrumbs } from "@/components/Guide";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions, type AttractionHubCard } from "@/data/attractionsHub";
import { travelGuidePaths } from "@/data/registry";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

const PATH = "/attractions/";
const TITLE = "Best attractions in Israel: places to visit & things to see";
const DESCRIPTION = "Discover attractions in Israel by area: Jerusalem, Tel Aviv, Jaffa, Haifa, Galilee, the Dead Sea, Negev and Eilat. Explore local visitor guides and day-trip ideas.";

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
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{card.category}</p>
          <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug group-hover:text-primary sm:text-2xl">{card.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight aria-hidden="true" size={15} /></span>
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
            Historic cities, ancient ruins, sacred places, beaches and desert landscapes.
            Start with a region, then explore individual visitor guides for what to see, how to get there and what to plan ahead.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#browse-regions" className="btn btn-primary inline-flex items-center gap-2">Browse by region <ArrowDownRight size={17} aria-hidden="true" /></a>
            <Link to={travelGuidePaths.topTen} className="btn border inline-flex items-center gap-2">Israel highlights <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <img src={attractionHubPhotos.hero.src} alt={attractionHubPhotos.hero.alt} width={755} height={405} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-3xl object-cover md:aspect-[5/4]" />
      </header>
      <AuthorCard />

      <section id="browse-regions" aria-labelledby="browse-regions-heading" className="mt-10 scroll-mt-24 rounded-2xl border bg-secondary/35 p-4 sm:p-6">
        <h2 id="browse-regions-heading" className="text-2xl font-semibold">Explore by region</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choose an area to jump straight to its sights and visitor guides.</p>
        <nav aria-label="Jump to an attraction region" className="mt-4">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {attractionHubRegions.map((region) => (
              <li key={region.id}>
                <a href={"#" + region.id} className="flex h-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-semibold leading-snug transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {region.title} <ArrowDownRight aria-hidden="true" size={17} className="shrink-0 text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {attractionHubRegions.map((region) => (
        <section key={region.id} id={region.id} aria-labelledby={region.id + "-heading"} className="mt-12 scroll-mt-24 sm:mt-14">
          <div className="grid overflow-hidden rounded-2xl border bg-secondary/25 sm:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
            <img src={region.image.src} alt="" width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/9] h-full max-h-[220px] w-full object-cover sm:aspect-auto sm:max-h-none" />
            <div className="flex flex-col justify-center p-5 sm:p-7">
              <p className="eyebrow">Explore the area</p>
              <h2 id={region.id + "-heading"} className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">{region.title}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{region.summary}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {region.cards.map((card) => <AttractionCard key={card.id} card={card} />)}
          </div>
          <div className="mt-5 rounded-xl border bg-card px-4 py-4 sm:px-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Continue planning your visit</p>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {region.planning.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{link.label} <ArrowUpRight size={14} aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 text-right">
            <a href="#browse-regions" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">Back to regions ↑</a>
          </div>
        </section>
      ))}

      <section aria-labelledby="more-ideas-heading" className="mt-14 border-t pt-9">
        <h2 id="more-ideas-heading" className="text-2xl font-semibold sm:text-3xl">More ways to plan your trip</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Tours & day trips", text: "Find organised tours and private day-trip ideas around the places you want to visit.", to: "/tours/" as const },
            { title: "Plan by destination", text: "Connect attractions with hotels, transport and local planning for each destination.", to: "/destinations/" as const },
            { title: "Travel guides", text: "Browse practical advice for getting around and planning your time in Israel.", to: "/guides/" as const },
          ].map((item) => (
            <Link key={item.title} to={item.to} className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <h3 className="text-xl font-semibold group-hover:text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowRight size={15} aria-hidden="true" /></span>
            </Link>
          ))}
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
