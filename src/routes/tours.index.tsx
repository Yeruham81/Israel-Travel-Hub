import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, RelatedLinks } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { OwnerTourSection } from "@/components/TourCatalog";
import { TourPhotoCredits } from "@/components/TourCategoryPage";
import { tourCategories, tourCategoryPaths, tourPhotos, tourPlanningLinks, toursHubDescription, toursHubFaqs, toursHubGuides, toursHubTitle } from "@/data/tours";
import { isOwnerTour, placeLabel, tourCardHref, toursForCategory } from "@/lib/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { migrationPhotos } from "@/data/guideMigrationPhotos";

const hero = migrationPhotos["EXISTING:masada"];
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
  const owner = toursForCategory().filter(isOwnerTour);
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <div className="pt-6"><Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }]} /></div>
    <header className="relative mt-6 overflow-hidden rounded-3xl bg-navy text-navy-foreground">
      <img src={hero.src} alt={hero.alt} width={1200} height={600} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
      <div className="relative max-w-3xl px-6 py-12 sm:px-10 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Great places. A day that fits you.</p><h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">{toursHubTitle}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed">Ancient cities, desert views, market flavours and the Red Sea. Find a day that matches your interests, from my private car-and-driver itineraries to guided experiences with independent operators.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#my-private-days" className="btn btn-light">Plan a private day with me</a><a href="#tour-categories" className="btn border border-white/60 bg-navy/40 text-white hover:bg-navy/70">Explore tour categories</a></div></div>
    </header>
    <nav aria-label="Tour categories" className="mt-5 flex flex-wrap gap-2">{tourCategories.map(category => <a key={category.id} href={`#category-${category.id}`} className="chip">{category.shortTitle}</a>)}</nav>
    <OwnerTourSection tours={owner} hub />
    <section id="tour-categories" aria-labelledby="tour-categories-h" data-section="external-tour-categories" className="mt-14 scroll-mt-24 border-t pt-10">
      <p className="eyebrow">Independent operators · GetYourGuide & Viator</p><h2 id="tour-categories-h" className="mt-2 text-3xl font-semibold">Find your next experience</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Discover Israel with a guide, join a small group or try a local activity. From a few hours in the city to a full day exploring further afield, choose the places and experiences that appeal to you.</p>
      <div className="mt-7 grid gap-6 md:grid-cols-2">{tourCategories.map(category => {
        const products = toursForCategory(category.id).filter(tour => !isOwnerTour(tour));
        const examples = products.slice(0, 2);
        return <article key={category.id} id={`category-${category.id}`} data-category-id={category.id} className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
          <Link to={tourCategoryPaths[category.id]} tabIndex={-1} aria-hidden><img src={category.photo.src} alt="" width={720} height={360} loading="lazy" decoding="async" className="aspect-[2/1] w-full object-cover transition-opacity hover:opacity-90" /></Link>
          <div className="flex flex-1 flex-col p-5 sm:p-6"><h3 className="text-2xl font-semibold leading-tight"><Link to={tourCategoryPaths[category.id]} className="hover:text-primary">{category.title}</Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.intro}</p>
            <ul aria-label={`${category.shortTitle} tour examples`} className="mt-5 divide-y border-y">{examples.map(tour => <li key={tour.id} data-product-id={tour.id} className="py-3"><a href={tourCardHref(category.id, tour.id)} className="font-semibold text-primary underline-offset-4 hover:underline">{tour.title}</a><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tour.duration} · From {tour.originIds.map(placeLabel).join(" or ")}</p></li>)}</ul>
            <Link to={tourCategoryPaths[category.id]} className="btn btn-primary mt-5 w-full" aria-label={`Explore all ${category.shortTitle} tours`}>Explore all {category.shortTitle} tours</Link>
          </div>
        </article>;
      })}</div>
    </section>
    <section aria-labelledby="choose-format-h" className="mt-14"><h2 id="choose-format-h" className="text-3xl font-semibold">Choose how you want to spend the day</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[
      { title: "A private car & driver", text: "For families, friends and travellers who want their own transport plan. I agree the route and price with you; guiding can be requested separately." },
      { title: "A guided day trip", text: "For a planned itinerary, local explanations and a group to travel with. Compare the actual departure, walking time and admission inclusions." },
      { title: "A local experience", text: "For a shorter outing close to your hotel: food, art, historic streets or time on the water. Most start at a fixed local meeting point." },
    ].map(item => <article key={item.title} className="rounded-2xl border bg-secondary/30 p-5"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div></section>
    <section aria-labelledby="cruise-h" className="mt-14 rounded-2xl border bg-secondary/40 p-6"><h2 id="cruise-h" className="text-2xl font-semibold">A day ashore starts at your cruise port</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A ship's timetable calls for a different plan. Explore excursions with port meeting and return arrangements from Haifa or Ashdod.</p><div className="mt-4 flex flex-wrap gap-4"><Link to="/haifa-shore-excursions/" className="font-semibold text-primary underline">Shore excursions from Haifa</Link><Link to="/ashdod-shore-excursions/" className="font-semibold text-primary underline">Shore excursions from Ashdod</Link></div></section>
    <FaqList faqs={toursHubFaqs} />
    <RelatedGuideCards title="Inspiration for your next day out" guides={toursHubGuides} />
    <RelatedLinks title="More help planning your trip" items={tourPlanningLinks} />
    <TourPhotoCredits photos={[hero, ...owner.map(tour => tourPhotos[tour.id]!), ...tourCategories.map(category => category.photo), ...toursHubGuides.map(guide => guide.photo)]} />
  </main>;
}
