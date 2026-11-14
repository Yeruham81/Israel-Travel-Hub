import { JerusalemClusterLinks, type JerusalemClusterKey } from "@/components/JerusalemClusterLinks";
import { AttractionRegionTrail } from "@/components/AttractionRegionTrail";
import { AuthorCard } from "@/components/AuthorCard";
import { HomeContactForm } from "@/components/HomeContactForm";
import { attractionRegionsForTours } from "@/data/attractionRegionLinks";
import { Link } from "@tanstack/react-router";
import { CalendarDays, CloudSun, Lightbulb, Smartphone, TrainFront, Utensils } from "lucide-react";
import { travelGuidePaths } from "@/data/registry";
import { Breadcrumbs, FaqList, SourceList } from "@/components/Guide";
import { RelatedGuideCards } from "@/components/ShoreReadingGuides";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { MoreTourCategories, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourCatalog } from "@/components/TourCatalog";
import { getTourCategory, tourCategories, tourCategoryPaths, tourCruisePhoto, tourPhotos, tourReadingGuides, jerusalemTourLocalCards, jerusalemTourPlanningCards, telAvivTourLocalCards, masadaTourLocalCards, bethlehemTourLocalCards, type TourCategoryId } from "@/data/tours";
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

const jerusalemPlanningIcons = {
  train: TrainFront,
  smartphone: Smartphone,
  "cloud-sun": CloudSun,
  "calendar-days": CalendarDays,
  utensils: Utensils,
  lightbulb: Lightbulb,
} as const;

export function TourCategoryPage({ id, filters: rawFilters, onChange }: { id: TourCategoryId; filters: TourSearch; onChange: (next: TourSearch, replace?: boolean) => void }) {
  const category = getTourCategory(id);
  const isCityTemplate = id === "jerusalem" || id === "tel-aviv-jaffa" || id === "masada-dead-sea" || id === "bethlehem-jericho";
  const localCards = id === "jerusalem" ? jerusalemTourLocalCards : id === "tel-aviv-jaffa" ? telAvivTourLocalCards : id === "masada-dead-sea" ? masadaTourLocalCards : bethlehemTourLocalCards;
  const cityName = id === "jerusalem" ? "Jerusalem" : id === "tel-aviv-jaffa" ? "Tel Aviv & Jaffa" : id === "masada-dead-sea" ? "Masada & the Dead Sea" : "Bethlehem, Jericho & Qasr al-Yahud";
  const localHeadingId = id === "jerusalem" ? "jerusalem-local-h" : id === "tel-aviv-jaffa" ? "tel-aviv-local-h" : id === "masada-dead-sea" ? "masada-local-h" : "bethlehem-local-h";
  const planningHeadingId = id === "jerusalem" ? "jerusalem-planning-h" : id === "tel-aviv-jaffa" ? "tel-aviv-planning-h" : id === "masada-dead-sea" ? "masada-planning-h" : "bethlehem-planning-h";
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
      <GuideHeroLayout image={<GuideHeroMedia src={category.photo.src} alt={category.photo.alt} width={1200} height={450} compact={isCityTemplate} />}>
        <p className="eyebrow">{id === "jerusalem" ? "Guided walks, small groups & private experiences" : id === "tel-aviv-jaffa" ? "Guided walks, food, art & private experiences" : id === "masada-dead-sea" ? "Guided desert days, sunrise hikes & private transport" : id === "bethlehem-jericho" ? "Bethlehem, Jericho & Qasr al-Yahud guided experiences" : `Tours & day trips · ${category.shortTitle}`}</p>
        <h1 className="guide-page-title mt-3 font-semibold">{title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{category.intro}</p>
        {!isCityTemplate && <a href="#tour-catalog" className="btn btn-primary mt-5">Explore {category.shortTitle} experiences</a>}
      </GuideHeroLayout>
    </header>
    {isCityTemplate ? <div className="mt-4"><AuthorCard introduction /></div> : <AttractionRegionTrail links={attractionRegions} />}
    {!isCityTemplate && <section aria-labelledby="choose-day-h" className="mt-10"><h2 id="choose-day-h" className="text-3xl font-semibold">Find the right day for your trip</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{category.choices.map(choice => <article key={choice.title} className="rounded-2xl border bg-card p-5"><h3 className="text-xl font-semibold">{choice.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.text}</p></article>)}</div></section>}
    <TourCatalog categoryId={id} filters={filters} onChange={onChange} />
    <section aria-labelledby="planning-day-h" className="mt-12"><h2 id="planning-day-h" className="text-2xl font-semibold">{id === "jerusalem" ? "Choosing the right Jerusalem tour" : id === "tel-aviv-jaffa" ? "Choosing the right Tel Aviv & Jaffa tour" : id === "masada-dead-sea" ? "Choosing the right Masada & Dead Sea tour" : id === "bethlehem-jericho" ? "Choosing the right Bethlehem & Jericho tour" : `Planning your ${category.shortTitle} experience`}</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{category.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {id === "bethlehem-jericho" && <p className="mt-4 text-sm text-muted-foreground">For the Qasr al-Yahud portion of the trip, <a href="https://en.parks.org.il/reserve-park/baptismal-site-on-the-jordan-river-qasr-al-yahud/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">check the official visitor information</a>. Opening, admission and permitted activities can change.</p>}
      {id === "masada-dead-sea" && <p className="mt-4 text-sm text-muted-foreground">Ein Gedi access changes after floods. <a href="https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Check current routes and advance reservations with the parks authority</a> before relying on a tour itinerary.</p>}
    </section>
    {!isCityTemplate && (["bethlehem-jericho", "masada-dead-sea", "food-markets"] as string[]).includes(id) && <JerusalemClusterLinks pageKey={("tour-" + id) as JerusalemClusterKey} />}
    <FaqList faqs={category.faqs} />
    {isCityTemplate ? <>
      <section aria-labelledby={localHeadingId} className="mt-12">
        <h2 id={localHeadingId} className="text-2xl font-semibold">Explore {cityName} further</h2>
        <p className="mt-2 text-sm text-muted-foreground">{id === "masada-dead-sea" ? "Plan your fortress visit, check nature-trail access, discover desert attractions and choose a place to stay." : id === "bethlehem-jericho" ? "Plan your Bethlehem visit, understand the Qasr al-Yahud site and check practical travel arrangements for the Jordan Valley." : `Find places to visit, neighborhoods to explore and more ways to enjoy ${cityName}.`}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localCards.map(item => <Link key={item.to} to={item.to} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
            <img src={item.photo.src} alt={item.photo.alt} width={320} height={176} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <span className="flex flex-1 flex-col p-3.5">
              <span className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</span>
              <span className="mt-auto pt-2 text-xs font-semibold text-primary">{item.cta}</span>
            </span>
          </Link>)}
        </div>
      </section>
      <section aria-labelledby={planningHeadingId} className="mt-12">
        <h2 id={planningHeadingId} className="text-2xl font-semibold">Practical guides for your trip to Israel</h2>
        <p className="mt-2 text-sm text-muted-foreground">Helpful information for planning your visit beyond {cityName}.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {jerusalemTourPlanningCards.map(item => {
            const Icon = jerusalemPlanningIcons[item.icon];
            return <Link key={item.to} to={item.to} className="group flex min-w-0 items-start gap-3 rounded-xl border bg-secondary/25 p-3.5 transition-colors hover:border-primary hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-primary">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background text-primary"><Icon size={20} aria-hidden="true" /></span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
              </span>
            </Link>;
          })}
        </div>
      </section>
      <HomeContactForm guide={{ heading: id === "masada-dead-sea" ? "Need help planning a Masada & Dead Sea day?" : id === "bethlehem-jericho" ? "Questions about Bethlehem, Jericho or Qasr al-Yahud?" : `Need help planning your time in ${cityName}?`, introduction: id === "bethlehem-jericho" ? "Tell me your travel date, departure city and which places you hope to visit. I can offer general planning information; check eligibility, permitted transport and booking conditions with the licensed tour operator." : "Have a question about your visit or need a private driver? Tell me your travel dates, preferred stops and transportation needs, and I'll get back to you personally.", subject: "", placeholder: "Dates, number of travelers, places you want to visit or your question…" }} />
    </> : <>
      <RelatedGuideCards title="Get to know the places on your itinerary" guides={guides} />
      <MoreTourCategories currentId={id} />
      <TourCruiseCallout />
    </>}
    <SourceList ids={sourceIds} intro={id === "bethlehem-jericho" ? "These product listings describe published itineraries, not live availability or confirmed entry permissions. Check nationality eligibility, official access, meeting arrangements and the exact Qasr al-Yahud stop directly with the booking operator." : "Product listings were reviewed for advertised itinerary, operator and duration. Confirm the date, availability, full price and arrangements with me for my private days, or with the booking provider for external tours."} />
    <TourPhotoCredits photos={[category.photo, ...products.map(tour => tourPhotos[tour.id]!), ...(!isCityTemplate ? [tourCruisePhoto, ...tourCategories.map(item => item.photo), ...guides.map(guide => guide.photo)] : []), ...(isCityTemplate ? localCards.map(card => card.photo) : [])]} />
  </main>;
}
