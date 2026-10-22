import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqList } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { TourCategoryExplorer, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourPhotoCredits } from "@/components/TourCategoryPage";
import { tourCategories, tourCategoryPaths, tourCruisePhoto, tourPlanningGuides, toursHubDescription, toursHubFaqs, toursHubGuides, toursHubTitle } from "@/data/tours";
import { parseTourHubSearch } from "@/lib/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { migrationPhotos } from "@/data/guideMigrationPhotos";

const hero = migrationPhotos["EXISTING:masada"];
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
    <div className="pt-6"><Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }]} /></div>
    <header className="relative mt-6 overflow-hidden rounded-3xl bg-navy text-navy-foreground">
      <img src={hero.src} alt={hero.alt} width={1200} height={600} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
      <div className="relative max-w-3xl px-6 py-12 sm:px-10 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Great places. A day that fits you.</p><h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">{toursHubTitle}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed">Ancient cities, desert views, market flavours and the Red Sea. Discover remarkable places, inspiring stories and local experiences that turn a day out into a highlight of your visit.</p></div>
    </header>
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
