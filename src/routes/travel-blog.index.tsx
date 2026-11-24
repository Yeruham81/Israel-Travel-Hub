import { createFileRoute, Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { BookOpen, CalendarDays, MapPinned, Smartphone, Sun, TrainFront } from "lucide-react";
import { GuideCard, GuidePhotoCredit } from "@/components/GuideCard";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { HubHeader } from "@/components/Guide";

import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic, type GuideTopicId } from "@/data/generated/guide-directory";
import { pageMeta } from "@/lib/site";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { travelGuidePaths } from "@/data/travel-guide-paths";
import { travelBlogHubImageSets, travelBlogExploreImageSets } from "@/data/travelBlogHubResponsivePhotos";
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
  { title: "Private driver", description: "Enjoy a flexible day of sightseeing with your own driver.", to: "/private-driver-in-israel/", action: "Plan a private day", photo: { src: driverPhoto, alt: "Scenic drive through the Israeli countryside" } },
] as const;

const tripPlanningLinks = [
  { title: "Israel travel tips", description: "Helpful advice for first-time visitors.", to: travelGuidePaths.travelTips, icon: BookOpen },
  { title: "Best time to visit", description: "Seasons, weather and sightseeing ideas.", to: travelGuidePaths.bestTime, icon: Sun },
  { title: "Getting around Israel", description: "Trains, buses, taxis and intercity trips.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel holidays & events", description: "Festivals and special dates to plan around.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Travel eSIM for Israel", description: "Stay connected throughout your trip.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "7-day Israel itinerary", description: "Ideas for a week of memorable highlights.", to: "/travel-blog/israel-itinerary-7-days/", icon: MapPinned },
] as const;

/** Short labels for topic chips; the shared topic names used by articles stay unchanged. */
const guideFilterLabels: Record<GuideTopicId, string> = {
  transportation: "Getting around",
  destinations: "Destinations",
  attractions: "Attractions",
  itineraries: "Itineraries & day trips",
  tips: "Travel tips",
  accommodation: "Where to stay",
  connectivity: "eSIM & mobile",
  religion: "Heritage & religion",
  shopping: "Markets & shopping",
};

export const Route = createFileRoute("/travel-blog/")({
  validateSearch: (search: Record<string, unknown>): { topic?: GuideTopicId } => isGuideTopic(search["topic"]) ? { topic: search["topic"] } : {},
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: Guides,
});

function Guides() {
  const { topic } = Route.useSearch();
  const navigate = Route.useNavigate();
  // Validate topic again while prerendering, before router search validation settles.
  const activeTopic = isGuideTopic(topic) ? topic : undefined;
  const activeTopicLabel = getGuideTopicLabel(activeTopic);
  const guides = filterGuides("", activeTopic);
  const picturedGuides = uniqueGuideCardPhotos(guides.map(guide => ({ guide })));
  const topicHref = (nextTopic?: GuideTopicId) => nextTopic ? `/travel-blog/?topic=${nextTopic}` : "/travel-blog/";
  function selectTopic(event: MouseEvent<HTMLAnchorElement>, nextTopic?: GuideTopicId) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void navigate({ search: nextTopic ? { topic: nextTopic } : {}, resetScroll: false });
  }
  const photos = [...new Map(guideDirectory.flatMap(guide => guide.photo ? [[guide.photo.src, guide.photo] as const] : [])).values()].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-6xl px-4 pb-8">
    <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }]} eyebrow="Useful answers for your Israel trip" title="Travel guides & practical tips" intro="Prepare for arrival, choose how to get around and explore destinations, day trips, religious heritage and local markets. Choose a topic below to find useful guides for your trip." />
    <nav aria-label="Filter guides by topic" className="mt-6 rounded-xl border bg-secondary/25 px-3 py-3 sm:mt-8 sm:px-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <span className="mr-1 shrink-0 text-xs font-semibold text-muted-foreground">Show:</span>
        <a href={topicHref()} onClick={event => selectTopic(event)} aria-current={!activeTopic ? "true" : undefined} className="chip shrink-0 text-xs">All guides</a>
        {guideTopics.map(item => <a key={item.id} href={topicHref(item.id)} onClick={event => selectTopic(event, item.id)} aria-current={activeTopic === item.id ? "true" : undefined} className="chip shrink-0 text-xs">{guideFilterLabels[item.id]}</a>)}
      </div>
    </nav>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{guides.length} {guides.length === 1 ? "guide" : "guides"}{activeTopicLabel ? ` · ${activeTopicLabel}` : ""}</p>
      {activeTopic && <a href={topicHref()} onClick={event => selectTopic(event)} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Clear filter</a>}
    </div>
    {guides.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{picturedGuides.map(({ guide, cardPhoto }) => <GuideCard key={guide.id} guide={guide} cardPhoto={cardPhoto || null} responsiveSrcSet={travelBlogHubImageSets[cardPhoto?.src ?? ""]} />)}</div> : <div className="mt-5 rounded-xl border p-8"><h2 className="text-2xl">No guides match this topic</h2><p className="mt-2 text-muted-foreground">Choose another topic or select All guides to see the full collection.</p></div>}
    <div className="mx-auto max-w-5xl">
      <section id="explore-israel" aria-labelledby="explore-israel-h" className="mt-12 border-t pt-9">
        <h2 id="explore-israel-h" className="text-2xl font-semibold">Explore Israel further</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {exploreLinks.map(item => <li key={item.to} className="min-w-0">
            <Link to={item.to} className="editorial-card-link group flex h-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={item.photo.src} srcSet={travelBlogExploreImageSets[item.photo.src]} sizes={travelBlogExploreImageSets[item.photo.src] ? "(min-width: 640px) 112px, 96px" : undefined} alt={item.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-full sm:shrink-0 rounded-lg object-cover sm:w-28" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="plan-israel-trip" aria-labelledby="plan-israel-trip-h" className="mt-9">
        <h2 id="plan-israel-trip-h" className="text-2xl font-semibold">Plan your trip to Israel</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
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
