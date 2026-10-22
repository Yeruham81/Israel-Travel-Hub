import { Link } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, SourceList } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { MoreTourCategories, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourCatalog } from "@/components/TourCatalog";
import { bethlehemJerusalemContent, getTourCategory, tourCategories, tourCategoryPaths, tourCruisePhoto, tourPhotos, tourReadingGuides, type TourCategoryId } from "@/data/tours";
import { offersForTour, parseTourSearch, toursForCategory, type TourSearch } from "@/lib/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";

export function tourCategoryMeta(id: TourCategoryId, options?: { path: string; title: string; description: string; origin: TourSearch["origin"] }) {
  const category = getTourCategory(id);
  const path = options?.path || tourCategoryPaths[id];
  const title = options?.title || category.title;
  const description = options?.description || category.description;
  const meta = pageMeta({ title: `${title} | Israel Taxi & Travel`, description, path, image: category.photo.src, imageAlt: category.photo.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Tours & day trips", path: "/tours/" }, { name: title, path }] });
  return { ...meta, scripts: [...meta.scripts, jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: CANONICAL_ORIGIN + path,
    author: { "@type": "Person", name: "Moshe Barak", url: CANONICAL_ORIGIN + "/about-moshe-barak/" },
    mainEntity: { "@type": "ItemList", itemListElement: toursForCategory(id).filter(tour => !options?.origin || tour.originIds.includes(options.origin)).map((tour, index) => ({ "@type": "ListItem", position: index + 1, name: tour.title, url: CANONICAL_ORIGIN + path + "#" + tour.id })) } })] };
}

export function TourPhotoCredits({ photos }: { photos: { src: string; alt: string; sourceUrl?: string; credit?: string; licenseUrl?: string }[] }) {
  const unique = [...new Map(photos.filter(hasPublicPhotoCredit).map(photo => [photo.src, photo])).values()];
  return unique.length ? <details className="mt-10 rounded-xl border p-4 text-sm"><summary className="cursor-pointer font-semibold">Image credits</summary><div className="mt-3 space-y-3">{unique.map(photo => <GuidePhotoCredit key={photo.src} photo={photo} insideDisclosure />)}</div></details> : null;
}

export function TourCategoryPage({ id, filters: rawFilters, onChange, departurePage = false }: { id: TourCategoryId; filters: TourSearch; onChange: (next: TourSearch, replace?: boolean) => void; departurePage?: boolean }) {
  const category = getTourCategory(id);
  const filters = parseTourSearch(rawFilters);
  const path = departurePage ? "/tours/bethlehem-from-jerusalem/" : tourCategoryPaths[id];
  const title = departurePage ? "Bethlehem tours from Jerusalem" : category.title;
  const editorial = departurePage ? bethlehemJerusalemContent : category;
  const products = toursForCategory(id).filter(tour => !departurePage || tour.originIds.includes("jerusalem"));
  const guides = tourReadingGuides(id);
  const sourceIds = products.flatMap(tour => offersForTour(tour.id).map(offer => offer.id));
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <div className="pt-6"><Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }, { name: title, to: path }]} /></div>
    <header className="mt-6 overflow-hidden rounded-3xl border bg-secondary/30">
      <img src={category.photo.src} alt={category.photo.alt} width={1200} height={450} fetchPriority="high" className="aspect-[16/7] w-full object-cover sm:aspect-[3/1]" />
      <div className="p-6 sm:p-8"><p className="eyebrow">Tours & day trips · {category.shortTitle}</p><h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{editorial.intro}</p><a href="#tour-catalog" className="btn btn-primary mt-5">Explore {category.shortTitle} experiences</a></div>
    </header>
    <section aria-labelledby="choose-day-h" className="mt-10"><h2 id="choose-day-h" className="text-3xl font-semibold">{departurePage ? "Choose your Bethlehem day from Jerusalem" : "Find the right day for your trip"}</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{editorial.choices.map(choice => <article key={choice.title} className="rounded-2xl border bg-card p-5"><h3 className="text-xl font-semibold">{choice.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.text}</p></article>)}</div></section>
    <TourCatalog categoryId={id} filters={filters} originScope={departurePage ? "jerusalem" : undefined} onChange={onChange} />
    <section aria-labelledby="planning-day-h" className="mt-14"><h2 id="planning-day-h" className="text-3xl font-semibold">Planning your {category.shortTitle} experience</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{editorial.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {id === "bethlehem-jericho" && <p className="mt-4 text-sm"><Link to={departurePage ? tourCategoryPaths[id] : "/tours/bethlehem-from-jerusalem/"} className="font-semibold text-primary underline">{departurePage ? "See all Bethlehem, Jericho & Jordan River departures" : "Compare Bethlehem tours departing from Jerusalem"}</Link></p>}
    </section>
    <FaqList faqs={editorial.faqs} />
    <RelatedGuideCards title="Get to know the places on your itinerary" guides={guides} />
    <MoreTourCategories currentId={id} />
    <TourCruiseCallout />
    <SourceList ids={sourceIds} intro="Product listings were reviewed for advertised itinerary, operator and duration. Confirm actual-date operation, price and arrangements with the booking provider." />
    <TourPhotoCredits photos={[tourCruisePhoto, ...tourCategories.map(category => category.photo), ...products.map(tour => tourPhotos[tour.id]!), ...guides.map(guide => guide.photo)]} />
  </main>;
}
