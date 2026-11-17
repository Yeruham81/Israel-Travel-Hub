import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { BookOpen, CalendarDays, MapPinned, Smartphone, Sun, TrainFront } from "lucide-react";
import { GuideCard, GuidePhotoCredit } from "@/components/TravelGuide";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { HubHeader } from "@/components/Guide";
import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic, type GuideTopicId } from "@/data/travelGuides";
import { pageMeta } from "@/lib/site";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { travelGuidePaths } from "@/data/registry";
import attractionsPhoto from "@/assets/home/caesarea-dusk-card.webp";
import toursPhoto from "@/assets/home/guided-tour-card.webp";
import shorePhoto from "@/assets/home/cruise-port-card.webp";
import airportPhoto from "@/assets/home/ben-gurion-t3-card.webp";
import accommodationPhoto from "@/assets/home/hotel-room.webp";
import driverPhoto from "@/assets/home/road-trip.webp";

const exploreLinks = [
  { title: "Attractions & experiences", description: "Historic landmarks, natural wonders and places worth exploring.", to: "/attractions/", action: "See attractions", photo: { src: attractionsPhoto, alt: "Ancient ruins on the Mediterranean coast at Caesarea" } },
  { title: "Tours & day trips", description: "Guided sightseeing, city walks and unforgettable days out.", to: "/tours/", action: "Browse tours", photo: { src: toursPhoto, alt: "Travellers on a guided sightseeing tour in Israel" } },
  { title: "Shore excursions", description: "Discover Israel's highlights from Ashdod or Haifa cruise ports.", to: "/shore-excursions/", action: "View excursions", photo: { src: shorePhoto, alt: "Cruise ship at an Israeli Mediterranean port" } },
  { title: "Airport transfers", description: "Arrange a comfortable private pickup from Ben Gurion Airport.", to: "/airport-transfers/", action: "Explore transfers", photo: { src: airportPhoto, alt: "Aircraft at Ben Gurion Airport terminal" } },
  { title: "Where to stay", description: "Choose a hotel area that fits your itinerary and travel style.", to: "/accommodation/", action: "Find accommodation", photo: { src: accommodationPhoto, alt: "Comfortable hotel room ready for guests" } },
  { title: "Private driver", description: "Enjoy a flexible day of sightseeing with your own driver.", to: "/private-driver/", action: "Plan a private day", photo: { src: driverPhoto, alt: "Scenic drive through the Israeli countryside" } },
] as const;

const tripPlanningLinks = [
  { title: "Israel travel tips", description: "Helpful advice for first-time visitors.", to: travelGuidePaths.travelTips, icon: BookOpen },
  { title: "Best time to visit", description: "Seasons, weather and sightseeing ideas.", to: travelGuidePaths.bestTime, icon: Sun },
  { title: "Getting around Israel", description: "Trains, buses, taxis and intercity trips.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel holidays & events", description: "Festivals and special dates to plan around.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Travel eSIM for Israel", description: "Stay connected throughout your trip.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "7-day Israel itinerary", description: "Ideas for a week of memorable highlights.", to: "/travel-blog/israel-itinerary-7-days/", icon: MapPinned },
] as const;

export const Route = createFileRoute("/travel-blog/")({
  validateSearch: (search: Record<string, unknown>): { q?: string; topic?: GuideTopicId } => ({ ...(typeof search["q"] === "string" && search["q"].trim() ? { q: search["q"].trim().slice(0, 120) } : {}), ...(isGuideTopic(search["topic"]) ? { topic: search["topic"] } : {}) }),
  head: () => pageMeta({ title: "Israel travel guides: transport, destinations and trip planning", description: "Browse guides to Israel's airport arrivals, taxis, public transport, hotel areas, Jerusalem, the Dead Sea, attractions and day trips.", path: "/travel-blog/", crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-blog/" }] }),
  component: Guides,
});

function Guides() {
  const { q = "", topic } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  useEffect(() => setQuery(q), [q]);
  // The prerenderer can reach a query string before router validation completes.
  // Always validate it at the rendering boundary too.
  const activeTopic = isGuideTopic(topic) ? topic : undefined;
  const activeTopicLabel = getGuideTopicLabel(activeTopic);
  const guides = filterGuides(query, activeTopic);
  const picturedGuides = uniqueGuideCardPhotos(guides.map(guide => ({ guide })));
  const searchFor = (nextTopic?: GuideTopicId) => ({ ...(query.trim() ? { q: query.trim().slice(0, 120) } : {}), ...(nextTopic ? { topic: nextTopic } : {}) });
  const topicHref = (nextTopic?: GuideTopicId) => {
    const params = new URLSearchParams(searchFor(nextTopic));
    return `/travel-blog/${params.size ? `?${params}` : ""}`;
  };
  function selectTopic(event: MouseEvent<HTMLAnchorElement>, nextTopic?: GuideTopicId) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void navigate({ search: searchFor(nextTopic) });
  }
  const photos = [...new Map(guideDirectory.flatMap(guide => guide.photo ? [[guide.photo.src, guide.photo] as const] : [])).values()].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-6xl px-4 pb-8">
    <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }]} eyebrow="Useful answers for your Israel trip" title="Travel guides & practical tips" intro="Prepare for arrival, choose how to get around and explore destinations, day trips, religious heritage and local markets. Browse by topic or search for the question you need answered." />
    <div className="mt-6 rounded-2xl border bg-secondary/50 p-3.5 sm:mt-8 sm:p-7">
      <form onSubmit={(event) => { event.preventDefault(); void navigate({ search: searchFor(activeTopic), replace: true }); }} role="search" className="flex flex-wrap items-end gap-2 sm:gap-3"><label className="min-w-0 flex-1 text-xs font-medium sm:text-sm">Search travel guides<input value={query} maxLength={120} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="City, airport or eSIM" className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base sm:mt-2 sm:h-12 sm:px-4" /></label><button type="submit" className="btn btn-primary h-10 shrink-0 px-3 py-2 text-sm sm:h-auto sm:px-5 sm:py-3">Search</button></form>
      <nav aria-label="Filter guides by topic" className="mt-3 sm:mt-5">
        <ul className="flex flex-wrap gap-1.5 sm:gap-2">
          <li><a href={topicHref()} onClick={(event) => selectTopic(event)} className="chip inline-block" aria-current={!activeTopic ? "true" : undefined}>All topics</a></li>
          {guideTopics.map((item) => <li key={item.id}><a href={topicHref(item.id)} onClick={(event) => selectTopic(event, item.id)} className="chip inline-block" aria-current={activeTopic === item.id ? "true" : undefined}>{item.label}</a></li>)}
        </ul>
      </nav>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-3"><p role="status" aria-live="polite" className="text-sm text-muted-foreground">{guides.length} {guides.length === 1 ? "guide" : "guides"}{activeTopicLabel ? ` · ${activeTopicLabel}` : ""}</p>{(query || activeTopic) && <button type="button" onClick={() => { setQuery(""); void navigate({ search: {}, replace: true }); }} className="text-sm font-medium text-primary underline">Clear filters</button>}</div>
    {guides.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{picturedGuides.map(({ guide, cardPhoto }) => <GuideCard key={guide.id} guide={guide} cardPhoto={cardPhoto || null} />)}</div> : <div className="mt-5 rounded-xl border p-8"><h2 className="text-2xl">No guides match this search</h2><p className="mt-2 text-muted-foreground">Try fewer words or choose another topic. Clear the filters to browse every guide.</p></div>}
    <div className="mx-auto max-w-5xl">
      <section id="explore-israel" aria-labelledby="explore-israel-h" className="mt-12 border-t pt-9">
        <h2 id="explore-israel-h" className="text-2xl font-semibold">Explore Israel further</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exploreLinks.map(item => <li key={item.to} className="min-w-0">
            <Link to={item.to} className="group flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={item.photo.src} alt={item.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-24 shrink-0 rounded-lg object-cover sm:w-28" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                <span className="mt-1.5 inline-block text-xs font-semibold text-primary group-hover:underline">{item.action}</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="plan-israel-trip" aria-labelledby="plan-israel-trip-h" className="mt-9">
        <h2 id="plan-israel-trip-h" className="text-2xl font-semibold">Plan your trip to Israel</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {tripPlanningLinks.map(item => {
            const Icon = item.icon;
            return <li key={item.to} className="min-w-0">
              <Link to={item.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>
    </div>

    <details className="mt-10 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Guide image credits</summary><ul className="mt-3 space-y-3">{photos.map((photo) => <li key={photo.src}><span className="text-sm">{photo.alt}</span><GuidePhotoCredit photo={photo} /></li>)}</ul></details>
  </main>;
}
