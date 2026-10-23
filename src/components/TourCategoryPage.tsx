import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { AttractionRegionTrail } from "@/components/AttractionRegionTrail";
import { attractionRegionsForTours } from "@/data/attractionRegionLinks";
import { Link } from "@tanstack/react-router";
import { travelGuidePaths } from "@/data/registry";
import { Breadcrumbs, FaqList, SourceList } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { MoreTourCategories, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourCatalog } from "@/components/TourCatalog";
import { getTourCategory, tourCategories, tourCategoryPaths, tourCruisePhoto, tourPhotos, tourReadingGuides, type TourCategoryId } from "@/data/tours";
import { offersForTour, parseTourSearch, toursForCategory, type TourSearch } from "@/lib/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";

export function tourCategoryMeta(id: TourCategoryId) {
  const category = getTourCategory(id);
  const path = tourCategoryPaths[id];
  const title = category.title;
  const description = category.description;
  const meta = pageMeta({ title: `${title} | Israel Taxi & Travel`, description, path, image: category.photo.src, imageAlt: category.photo.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Tours & day trips", path: "/tours/" }, { name: title, path }] });
  return { ...meta, scripts: [...meta.scripts, jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: CANONICAL_ORIGIN + path,
    author: { "@type": "Person", name: "Moshe Barak", url: CANONICAL_ORIGIN + "/about-moshe-barak/" },
    mainEntity: { "@type": "ItemList", itemListElement: toursForCategory(id).map((tour, index) => ({ "@type": "ListItem", position: index + 1, name: tour.title, url: CANONICAL_ORIGIN + path + "#" + tour.id })) } })] };
}

export function TourPhotoCredits({ photos }: { photos: { src: string; alt: string; sourceUrl?: string; credit?: string; licenseUrl?: string }[] }) {
  const unique = [...new Map(photos.filter(hasPublicPhotoCredit).map(photo => [photo.src, photo])).values()];
  return unique.length ? <details className="mt-10 rounded-xl border p-4 text-sm"><summary className="cursor-pointer font-semibold">Image credits</summary><div className="mt-3 space-y-3">{unique.map(photo => <GuidePhotoCredit key={photo.src} photo={photo} insideDisclosure />)}</div></details> : null;
}

export function TourCategoryPage({ id, filters: rawFilters, onChange }: { id: TourCategoryId; filters: TourSearch; onChange: (next: TourSearch, replace?: boolean) => void }) {
  const category = getTourCategory(id);
  const filters = parseTourSearch(rawFilters);
  const path = tourCategoryPaths[id];
  const title = category.title;
  const products = toursForCategory(id);
  const guides = tourReadingGuides(id);
  const attractionRegions = attractionRegionsForTours[id] ?? [];
  const sourceIds = products.flatMap(tour => [...(tour.price ? [tour.price.sourceId] : []), ...offersForTour(tour.id).map(offer => offer.id)]);
  return <main className="mx-auto max-w-5xl px-4 pb-12">
    <div className="pt-6"><Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Tours & day trips", to: "/tours/" }, { name: title, to: path }]} /></div>
    <header className="mt-6 overflow-hidden rounded-3xl border bg-secondary/30">
      <img src={category.photo.src} alt={category.photo.alt} width={1200} height={450} fetchPriority="high" className="aspect-[16/7] w-full object-cover sm:aspect-[3/1]" />
      <div className="p-6 sm:p-8"><p className="eyebrow">Tours & day trips · {category.shortTitle}</p><h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{category.intro}</p><a href="#tour-catalog" className="btn btn-primary mt-5">Explore {category.shortTitle} experiences</a></div>
    </header>
    <AttractionRegionTrail links={attractionRegions} />
    <section aria-labelledby="choose-day-h" className="mt-10"><h2 id="choose-day-h" className="text-3xl font-semibold">Find the right day for your trip</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{category.choices.map(choice => <article key={choice.title} className="rounded-2xl border bg-card p-5"><h3 className="text-xl font-semibold">{choice.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.text}</p></article>)}</div></section>
    <TourCatalog categoryId={id} filters={filters} onChange={onChange} />
    <section aria-labelledby="planning-day-h" className="mt-14"><h2 id="planning-day-h" className="text-3xl font-semibold">Planning your {category.shortTitle} experience</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{category.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {id === "bethlehem-jericho" && <p className="mt-4 text-sm"><Link to={travelGuidePaths.bethlehem} className="font-semibold text-primary underline">Read my Jerusalem to Bethlehem travel guide</Link></p>}
      {id === "masada-dead-sea" && <p className="mt-4 text-sm"><Link to={travelGuidePaths.jerusalemDeadSea} className="font-semibold text-primary underline">Planning the journey independently? Compare buses, driving and private transport from Jerusalem.</Link></p>}
    </section>
    {(["jerusalem", "bethlehem-jericho", "masada-dead-sea", "food-markets"] as string[]).includes(id) && <JerusalemClusterLinks pageKey={("tour-" + id) as JerusalemClusterKey} />}
    <FaqList faqs={category.faqs} />
    <RelatedGuideCards title="Get to know the places on your itinerary" guides={guides} />
    <MoreTourCategories currentId={id} />
    <TourCruiseCallout />
    <SourceList ids={sourceIds} intro="Product listings were reviewed for advertised itinerary, operator and duration. Confirm the date, availability, full price and arrangements with me for my private days, or with the booking provider for external tours." />
    <TourPhotoCredits photos={[tourCruisePhoto, ...tourCategories.map(category => category.photo), ...products.map(tour => tourPhotos[tour.id]!), ...guides.map(guide => guide.photo)]} />
  </main>;
}
