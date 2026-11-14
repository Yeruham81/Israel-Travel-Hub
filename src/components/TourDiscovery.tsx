import { Link } from "@tanstack/react-router";
import { Anchor, ArrowRight } from "lucide-react";
import { tourCategories, tourCategoryPaths, tourCruisePorts, type TourCategoryId } from "@/data/tours";

/** The hub is a visual gateway; detailed filters and individual products belong on category pages. */
const hubCategoryCopy: Record<TourCategoryId, { title: string; description: string; action: string }> = {
  jerusalem: { title: "Jerusalem tours", description: "Old City walks, sacred landmarks and guided day trips.", action: "Explore Jerusalem tours" },
  "tel-aviv-jaffa": { title: "Tel Aviv & Jaffa", description: "Historic Jaffa, street art, lively markets and local culture.", action: "Discover Tel Aviv tours" },
  "masada-dead-sea": { title: "Masada & Dead Sea", description: "Ancient ruins, desert views, sunrise hikes and Dead Sea experiences.", action: "Compare Dead Sea trips" },
  "bethlehem-jericho": { title: "Bethlehem & Jericho", description: "Christian heritage, historic sites and Jordan River excursions.", action: "Explore heritage tours" },
  "nazareth-galilee": { title: "Nazareth & Sea of Galilee", description: "Biblical landmarks, lakeside villages and northern day trips.", action: "Explore Galilee tours" },
  "northern-coast": { title: "Caesarea, Haifa & Acre", description: "Roman ruins, coastal scenery and historic port cities.", action: "Discover coastal tours" },
  "negev-ramon": { title: "Negev & Ramon Crater", description: "Desert jeep safaris, hiking, geology and stargazing.", action: "Explore desert activities" },
  "golan-heights": { title: "Golan Heights", description: "Scenic viewpoints, nature, ancient sites and guided adventures.", action: "Browse Golan tours" },
  "food-markets": { title: "Food & Market Tours", description: "Local tastings, bustling markets and hands-on cooking experiences.", action: "Browse food tours" },
  "eilat-red-sea": { title: "Eilat & Red Sea", description: "Snorkeling, boat cruises and adventures in the surrounding desert.", action: "See Eilat activities" },
};

export function TourCategoryExplorer() {
  return <section id="tour-categories" aria-labelledby="tour-categories-h" className="mt-8 scroll-mt-24 sm:mt-10">
    <h2 id="tour-categories-h" className="text-2xl font-semibold">Explore tours by destination & interest</h2>
    <ul className="mt-4 grid gap-3 md:grid-cols-2">
      {tourCategories.map(category => {
        const copy = hubCategoryCopy[category.id];
        return <li key={category.id} id={`category-${category.id}`} data-category-id={category.id} className="min-w-0 scroll-mt-24">
          <Link to={tourCategoryPaths[category.id]} className="group flex h-full min-w-0 items-center gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-4">
            <img src={category.photo.src} alt="" width={160} height={192} loading="lazy" decoding="async" className="h-28 w-24 shrink-0 rounded-xl object-cover sm:h-32 sm:w-28" />
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">{copy.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                {copy.action}<ArrowRight aria-hidden className="size-4 shrink-0" />
              </span>
            </div>
          </Link>
        </li>;
      })}
    </ul>
  </section>;
}

export function MoreTourCategories({ currentId }: { currentId: TourCategoryId }) {
  const items = tourCategories.filter(category => category.id !== currentId).map(category => ({ id: category.id, title: category.shortTitle, description: category.intro, photo: category.photo, to: tourCategoryPaths[category.id] }));
  const cards = [...items, { id: "all", title: "All tours & day trips", description: "Find more ways to spend your days in Israel. Discover every destination and interest, from historic cities to the desert and the sea.", photo: tourCategories.find(category => category.id === currentId)!.photo, to: "/tours/" as const }];
  return <section aria-labelledby="more-tour-categories-h" className="mt-14"><p className="eyebrow">Keep exploring</p><h2 id="more-tour-categories-h" className="mt-2 text-3xl font-semibold">Explore more tour categories</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{cards.map(card => <li key={card.id} className="min-w-0"><article className="flex h-full gap-4 rounded-2xl border bg-card p-4 transition-shadow hover:border-primary/40 hover:shadow-md"><div className="flex min-w-0 flex-1 flex-col items-start"><h3 className="text-xl font-semibold leading-tight">{card.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p><Link to={card.to} className="mt-auto pt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline" aria-label={`Explore ${card.title}`}>Explore tours</Link></div><img src={card.photo.src} alt={card.photo.alt} width={160} height={200} loading="lazy" decoding="async" className="h-32 w-20 shrink-0 rounded-xl object-cover sm:w-24" /></article></li>)}</ul></section>;
}

export function TourCruiseCallout() {
  return <section aria-labelledby="cruise-h" className="mt-9 rounded-2xl border bg-card px-4 py-4 sm:px-5">
    <div className="flex items-start gap-3">
      <Anchor aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <h2 id="cruise-h" className="text-lg font-semibold sm:text-xl">Arriving in Israel by cruise ship?</h2>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Explore dedicated shore excursions from Haifa and Ashdod. Confirm port pickup and return arrangements for your ship's schedule before booking.
        </p>
        <nav aria-label="Shore excursions by port" className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {tourCruisePorts.map(port => <Link key={port.id} to={port.to} className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {port.id === "haifa" ? "Haifa shore excursions" : "Ashdod shore excursions"}
          </Link>)}
        </nav>
      </div>
    </div>
  </section>;
}
