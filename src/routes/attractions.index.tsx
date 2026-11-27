import { createFileRoute } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  ArrowUpRight,
  BedDouble,
  BookOpen,
  CalendarDays,
  Smartphone,
  Sun,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import { HubHeader } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/GuideCard";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import {
  attractionHubRegions,
  attractionPlanningPaths,
  attractionRelatedGuides,
  type AttractionHubCard,
} from "@/data/attractionsHub";
import {
  attractionHubCardImageSets,
  attractionHubRegionImageSets,
  attractionHubRelatedImageSets,
} from "@/data/attractionHubResponsivePhotos";

const PATH = "/attractions/";

export const Route = createFileRoute("/attractions/")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/attractions.index.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
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
  // Reuse the same whole-card hover, focus, image zoom and border treatment as guide cards.
  const photo = guideHeroPhotoForPath(String(card.to)) ?? card.photo;
  return (
    <article className="min-w-0" data-testid="attraction-card">
      <Link
        to={card.to}
        className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      >
        <div className="aspect-[3/2] overflow-hidden bg-secondary">
          <img
            src={photo.src}
            srcSet={attractionHubCardImageSets[photo.src]}
            sizes="(min-width: 1280px) 365px, (min-width: 1024px) calc(33vw - 28px), calc(50vw - 24px)"
            alt={photo.alt}
            width={755}
            height={503}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-lg font-semibold leading-tight text-foreground sm:text-2xl">
            {card.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {card.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

function Attractions() {
  const creditedRelatedPhotos = attractionRelatedGuides
    .map((guide) => guide.photo)
    .filter(hasPublicPhotoCredit);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <HubHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Attractions", to: PATH },
        ]}
        eyebrow="Discover the places that make Israel memorable"
        title="Attractions & places to visit in Israel"
        intro="Discover individual places worth visiting across Israel, from ancient cities and archaeological sites to churches, nature reserves and desert viewpoints. Browse the attractions by region below."
      />

      <section
        id="browse-regions"
        aria-labelledby="browse-regions-heading"
        className="mt-8 scroll-mt-24 border-y py-4 sm:mt-10 sm:py-5"
      >
        <h2 id="browse-regions-heading" className="text-lg font-semibold sm:text-xl">
          Explore by region
        </h2>
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
        <section
          key={region.id}
          id={region.id}
          aria-labelledby={region.id + "-heading"}
          className="mt-10 scroll-mt-24 sm:mt-12"
        >
          <div className="flex items-start gap-3 border-b border-l-4 border-l-primary bg-secondary/20 py-3 pl-3 pr-2 sm:items-center sm:gap-5 sm:py-4 sm:pl-5 sm:pr-4">
            <img
              src={region.image.src}
              srcSet={attractionHubRegionImageSets[region.image.src]}
              sizes="(min-width: 640px) 144px, 80px"
              alt=""
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-36"
            />
            <div className="min-w-0 flex-1">
              <h2
                id={region.id + "-heading"}
                className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
              >
                {region.title}
              </h2>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {region.summary}
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
            {region.cards.map((card) => (
              <AttractionCard key={card.id} card={card} />
            ))}
          </div>
          {region.relatedGuides.length > 0 && (
            <nav
              aria-label={"More " + (region.navLabel ?? region.title) + " travel guides"}
              className="mt-5 border-t border-border/70 pt-3"
              data-testid="attraction-region-guides"
            >
              <h3 className="text-sm font-semibold text-muted-foreground">
                More {region.navLabel ?? region.title} travel guides
              </h3>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {region.relatedGuides.map((guide) => (
                  <li key={String(guide.to)}>
                    <Link
                      to={guide.to}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {guide.label}
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="mt-3 text-right">
            <a
              href="#browse-regions"
              className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
            >
              Back to regions ↑
            </a>
          </div>
        </section>
      ))}

      <div className="mx-auto max-w-5xl">
        <section
          id="attractions-related"
          aria-labelledby="attractions-related-h"
          className="mt-12 border-t pt-9"
        >
          <h2 id="attractions-related-h" className="text-2xl font-semibold">
            Related travel guides
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {attractionRelatedGuides.map((guide) => (
              <li key={String(guide.to)} className="min-w-0">
                <Link
                  to={guide.to}
                  className="editorial-card-link group flex h-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <img
                    src={guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src}
                    srcSet={
                      attractionHubRelatedImageSets[
                        guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src
                      ]
                    }
                    sizes="(min-width: 640px) 112px, 96px"
                    alt={guideHeroPhotoForPath(String(guide.to))?.alt ?? guide.photo.alt}
                    width={112}
                    height={75}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] w-full sm:shrink-0 rounded-lg object-cover sm:w-28"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                      {guide.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                      {guide.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Wondering how to explore these places? Find a{" "}
            <Link
              to="/tours/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              guided tour you can book online
            </Link>
            , plan an{" "}
            <Link
              to="/shore-excursions/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              unforgettable shore excursion
            </Link>
            , or enjoy a{" "}
            <Link
              to="/private-driver-in-israel/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              private day trip with your own driver
            </Link>
            .
          </p>
        </section>

        <section
          id="attractions-trip-planning"
          aria-labelledby="attractions-trip-planning-h"
          className="mt-9"
        >
          <h2 id="attractions-trip-planning-h" className="text-2xl font-semibold">
            Plan your trip to Israel
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {attractionPlanningPaths.map((item) => {
              const Icon = planningIcons[item.id];
              return (
                <li key={item.id} className="min-w-0">
                  <Link
                    to={item.to}
                    className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        {creditedRelatedPhotos.length > 0 && (
          <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-semibold">Photo credits</summary>
            <ul className="mt-3 space-y-3">
              {creditedRelatedPhotos.map((photo) => (
                <li key={photo.src}>
                  <GuidePhotoCredit photo={photo} insideDisclosure />
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </main>
  );
}
