import { createFileRoute } from "@tanstack/react-router";
import { FaqList, HubHeader } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { TourCategoryExplorer, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourPhotoCredits } from "@/components/TourCategoryPage";
import { tourCategories, tourCategoryPaths, tourCruisePhoto, toursHubHero, tourPlanningGuides, toursHubDescription, toursHubFaqs, toursHubGuides, toursHubTitle } from "@/data/tours";
import { parseTourHubSearch } from "@/lib/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
 
const hero = toursHubHero;
export const Route = createFileRoute("/tours/")({
  validateSearch: parseTourHubSearch,
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
  const filters = parseTourHubSearch(Route.useSearch());
  const navigate = Route.useNavigate();
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }]}
      eyebrow="Great places. A day that fits you."
      title={toursHubTitle}
      intro="Discover Israel's historic cities, dramatic landscapes and local experiences. Browse day trips and activities, then choose a tour that fits your interests and schedule."
    />
    <TourCategoryExplorer filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourHubSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />
    <section aria-labelledby="choose-format-h" className="mt-14"><h2 id="choose-format-h" className="text-3xl font-semibold">Choose how you want to spend the day</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[
      { title: "A private experience", text: "For families, friends and travellers who want a more individual day. Choose a privately guided visit or tailored transport, and agree the pace and inclusions before booking." },
      { title: "A guided day trip", text: "For a planned itinerary, local explanations and a group to travel with. Compare the actual departure, walking time and admission inclusions." },
      { title: "A local experience", text: "For a shorter outing close to your hotel: food, art, historic streets or time on the water. Most start at a fixed local meeting point." },
    ].map(item => <article key={item.title} className="rounded-2xl border bg-secondary/30 p-5"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div></section>
    <TourCruiseCallout />
    <FaqList faqs={toursHubFaqs} />
    <RelatedGuideCards title="Inspiration for your next day out" guides={toursHubGuides} />
    <RelatedGuideCards title="More help planning your trip" intro="A little practical planning leaves more time to enjoy the journey." guides={tourPlanningGuides} />
    <TourPhotoCredits photos={[hero, tourCruisePhoto, ...tourCategories.map(category => category.photo), ...toursHubGuides.map(guide => guide.photo), ...tourPlanningGuides.map(guide => guide.photo)]} />
  </main>;
}
