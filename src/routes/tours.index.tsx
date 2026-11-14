import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, BookOpen, Sun, TrainFront } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { TourCategoryExplorer, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourPhotoCredits } from "@/components/TourCategoryPage";
import { tourCategories, tourCategoryPaths, toursHubHero, toursHubDescription, toursHubFaqs, toursHubTitle } from "@/data/tours";
import { travelGuidePaths } from "@/data/registry";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

const hero = toursHubHero;
const planningLinks = [
  { title: "Getting around Israel", description: "Transport options between destinations.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Best time to visit", description: "Weather, seasons and trip planning.", to: travelGuidePaths.bestTime, icon: Sun },
  { title: "Where to stay", description: "Accommodation and convenient bases.", to: "/accommodation/" as const, icon: BedDouble },
  { title: "Israel travel tips", description: "Practical advice before your visit.", to: travelGuidePaths.travelTips, icon: BookOpen },
] as const;

export const Route = createFileRoute("/tours/")({
  head: () => {
    const meta = pageMeta({ title: `${toursHubTitle} | Israel Taxi & Travel`, description: toursHubDescription, path: "/tours/", image: hero.src, imageAlt: hero.alt,
      crumbs: [{ name: "Home", path: "/" }, { name: "Tours & day trips", path: "/tours/" }] });
    return { ...meta, scripts: [...meta.scripts, jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: toursHubTitle, description: toursHubDescription, url: CANONICAL_ORIGIN + "/tours/",
      author: { "@type": "Person", name: "Moshe Barak", url: CANONICAL_ORIGIN + "/about-moshe-barak/" },
      mainEntity: { "@type": "ItemList", itemListElement: tourCategories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.title, url: CANONICAL_ORIGIN + tourCategoryPaths[category.id] })) } })] };
  },
  component: Tours,
});

function Tours() {
  return <main className="pb-12">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }]}
      title={toursHubTitle}
      intro="Explore Israel's highlights, from Jerusalem and the Dead Sea to the Galilee, Negev and Red Sea. Find guided tours, private experiences and local activities to suit your travel plans."
    />
    <div className="mx-auto max-w-5xl px-4">
      <TourCategoryExplorer />
      <TourCruiseCallout />
      <FaqList faqs={toursHubFaqs} compact />
      <section id="tour-planning" aria-labelledby="tour-planning-h" className="mt-9">
        <h2 id="tour-planning-h" className="text-2xl font-semibold">Plan your trip to Israel</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {planningLinks.map(item => {
            const Icon = item.icon;
            return <li key={item.title}>
              <Link to={item.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>
      <TourPhotoCredits photos={tourCategories.map(category => category.photo)} />
    </div>
  </main>;
}
