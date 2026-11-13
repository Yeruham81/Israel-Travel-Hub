import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { AttractionRegionTrail } from "@/components/AttractionRegionTrail";
import { AuthorCard } from "@/components/AuthorCard";
import { HomeContactForm } from "@/components/HomeContactForm";
import { attractionRegionsForTours } from "@/data/attractionRegionLinks";
import { Link } from "@tanstack/react-router";
import { travelGuidePaths } from "@/data/registry";
import { Breadcrumbs, FaqList, SourceList } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
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
    <header className="mt-2">
      <GuideHeroLayout image={<GuideHeroMedia src={category.photo.src} alt={category.photo.alt} width={1200} height={450} />}>
        <p className="eyebrow">{id === "jerusalem" ? "Guided walks, small groups & private experiences" : `Tours & day trips · ${category.shortTitle}`}</p>
        <h1 className="guide-page-title mt-3 font-semibold">{title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{category.intro}</p>
        <a href="#tour-catalog" className="btn btn-primary mt-5">Explore {category.shortTitle} experiences</a>
      </GuideHeroLayout>
    </header>
    {id === "jerusalem" ? <div className="mt-5"><AuthorCard introduction /></div> : <AttractionRegionTrail links={attractionRegions} />}
    <section aria-labelledby="choose-day-h" className={id === "jerusalem" ? "mt-7" : "mt-10"}><h2 id="choose-day-h" className={id === "jerusalem" ? "text-2xl font-semibold" : "text-3xl font-semibold"}>Find the right day for your trip</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{category.choices.map(choice => <article key={choice.title} className="rounded-2xl border bg-card p-5"><h3 className="text-xl font-semibold">{choice.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.text}</p></article>)}</div></section>
    <TourCatalog categoryId={id} filters={filters} onChange={onChange} />
    <section aria-labelledby="planning-day-h" className="mt-12"><h2 id="planning-day-h" className="text-2xl font-semibold">{id === "jerusalem" ? "Before you book a Jerusalem tour" : `Planning your ${category.shortTitle} experience`}</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{category.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {id === "bethlehem-jericho" && <p className="mt-4 text-sm"><Link to={travelGuidePaths.bethlehem} className="font-semibold text-primary underline">Read my Jerusalem to Bethlehem travel guide</Link></p>}
      {id === "masada-dead-sea" && <p className="mt-4 text-sm"><Link to={travelGuidePaths.jerusalemDeadSea} className="font-semibold text-primary underline">Planning the journey independently? Compare buses, driving and private transport from Jerusalem.</Link></p>}
    </section>
    {id !== "jerusalem" && (["bethlehem-jericho", "masada-dead-sea", "food-markets"] as string[]).includes(id) && <JerusalemClusterLinks pageKey={("tour-" + id) as JerusalemClusterKey} />}
    <FaqList faqs={category.faqs} />
    <RelatedGuideCards title={id === "jerusalem" ? "Explore Jerusalem further" : "Get to know the places on your itinerary"} guides={guides} />
    {id === "jerusalem" ? <section aria-labelledby="jerusalem-next-h" className="mt-12"><h2 id="jerusalem-next-h" className="text-2xl font-semibold">Plan more of your trip</h2><p className="mt-2 text-sm text-muted-foreground">Explore day trips and nearby experiences after visiting Jerusalem.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{([
      { to: "/tours/masada-dead-sea/", title: "Masada & Dead Sea tours", description: "Explore the desert fortress and plan time beside the Dead Sea.", photo: tourPhotos["my-masada-jerusalem"]! },
      { to: "/tours/bethlehem-jericho-jordan-river/", title: "Bethlehem & Jericho tours", description: "Discover heritage sites beyond Jerusalem and understand the journey.", photo: tourPhotos["jerusalem-bethlehem-private"]! },
      { to: "/travel-blog/day-trips-from-jerusalem/", title: "Day trips from Jerusalem", description: "Compare practical ways to explore more places from your base.", photo: tourPhotos["my-galilee-jerusalem"]! },
      { to: "/travel-blog/where-to-stay-in-jerusalem/", title: "Where to stay in Jerusalem", description: "Choose a neighborhood that suits your plans and transport needs.", photo: category.photo }
    ] as const).map(item => <Link key={item.to} to={item.to} className="group flex min-w-0 gap-3 overflow-hidden rounded-xl border bg-card p-3 transition-colors hover:border-primary hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-primary"><img src={item.photo.src} alt={item.photo.alt} width={145} height={112} loading="lazy" decoding="async" className="h-28 w-28 shrink-0 rounded-lg object-cover sm:w-32" /><span className="flex min-w-0 flex-1 flex-col justify-center"><span className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span><span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</span><span className="mt-2 text-xs font-semibold text-primary">Explore →</span></span></Link>)}</div><div className="mt-6 rounded-xl border bg-secondary/40 p-5"><h3 className="text-lg font-semibold">Need a private driver for your day?</h3><p className="mt-2 text-sm text-muted-foreground">I can arrange a private vehicle and driver for your preferred Jerusalem route and stops.</p><Link to="/private-driver/" className="btn btn-primary mt-4">Enquire about a private day</Link></div></section> : <><MoreTourCategories currentId={id} /><TourCruiseCallout /></>}
    {id === "jerusalem" && <div className="mt-12"><HomeContactForm guide={{ heading: "Questions about your Jerusalem visit?", introduction: "Tell me your travel dates, interests and any private transportation needs. I'll reply personally and can help plan a suitable private journey.", subject: "Jerusalem tours and private journeys", placeholder: "Dates, number of travelers, places you want to visit or your question…" }} showPortrait={false} /></div>}
    <SourceList ids={sourceIds} intro="Product listings were reviewed for advertised itinerary, operator and duration. Confirm the date, availability, full price and arrangements with me for my private days, or with the booking provider for external tours." />
    <TourPhotoCredits photos={[tourCruisePhoto, ...tourCategories.map(category => category.photo), ...products.map(tour => tourPhotos[tour.id]!), ...guides.map(guide => guide.photo)]} />
  </main>;
}
