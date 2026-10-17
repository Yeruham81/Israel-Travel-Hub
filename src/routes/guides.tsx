import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { GuideCard, GuidePhotoCredit } from "@/components/TravelGuide";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { HubHeader } from "@/components/Guide";
import { filterGuides, guideDirectory, guideTopics, isGuideTopic, type GuideTopicId } from "@/data/travelGuides";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/guides")({
  validateSearch: (search: Record<string, unknown>): { q?: string; topic?: GuideTopicId } => ({ ...(typeof search["q"] === "string" && search["q"].trim() ? { q: search["q"].trim().slice(0, 120) } : {}), ...(isGuideTopic(search["topic"]) ? { topic: search["topic"] } : {}) }),
  head: () => pageMeta({ title: "Israel travel guides & practical tips", description: "Find Israel travel guides by topic: airport arrivals, transport, eSIMs, destinations, hotels, attractions and day trips. Search and filter practical local advice.", path: "/guides/", crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/guides/" }] }),
  component: Guides,
});

function Guides() {
  const { q = "", topic } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  useEffect(() => setQuery(q), [q]);
  const guides = filterGuides(query, topic);
  const searchFor = (nextTopic?: GuideTopicId) => ({ ...(query.trim() ? { q: query.trim().slice(0, 120) } : {}), ...(nextTopic ? { topic: nextTopic } : {}) });
  const topicHref = (nextTopic?: GuideTopicId) => {
    const params = new URLSearchParams(searchFor(nextTopic));
    return `/guides/${params.size ? `?${params}` : ""}`;
  };
  function selectTopic(event: MouseEvent<HTMLAnchorElement>, nextTopic?: GuideTopicId) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void navigate({ search: searchFor(nextTopic) });
  }
  const photos = [...new Map(guideDirectory.map((guide) => [guide.photo.src, guide.photo])).values()].filter(hasPublicPhotoCredit);
  return <main className="mx-auto max-w-6xl px-4 pb-8">
    <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/guides/" }]} eyebrow="Useful answers for your Israel trip" title="Travel guides & practical tips" intro="Prepare for arrival, choose how to get around and explore destinations, day trips, religious heritage and local markets. Browse by topic or search for the question you need answered." />
    <div className="mt-8 rounded-2xl border bg-secondary/50 p-5 sm:p-7">
      <form onSubmit={(event) => { event.preventDefault(); void navigate({ search: searchFor(topic), replace: true }); }} role="search" className="flex flex-wrap gap-3"><label className="min-w-0 flex-1 text-sm font-medium">Search travel guides<input value={query} maxLength={120} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try airport, eSIM, Tel Aviv or hotels" className="mt-2 h-12 w-full rounded-lg border bg-background px-4 text-base" /></label><button type="submit" className="btn btn-primary self-end">Search</button></form>
      <nav aria-label="Filter guides by topic" className="mt-5">
        <ul className="flex flex-wrap gap-2">
          <li><a href={topicHref()} onClick={(event) => selectTopic(event)} className="chip inline-block" aria-current={!topic ? "true" : undefined}>All topics</a></li>
          {guideTopics.map((item) => <li key={item.id}><a href={topicHref(item.id)} onClick={(event) => selectTopic(event, item.id)} className="chip inline-block" aria-current={topic === item.id ? "true" : undefined}>{item.label}</a></li>)}
        </ul>
      </nav>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-3"><p role="status" aria-live="polite" className="text-sm text-muted-foreground">{guides.length} {guides.length === 1 ? "guide" : "guides"}{topic ? ` · ${guideTopics.find((item) => item.id === topic)!.label}` : ""}</p>{(query || topic) && <button type="button" onClick={() => { setQuery(""); void navigate({ search: {}, replace: true }); }} className="text-sm font-medium text-primary underline">Clear filters</button>}</div>
    {guides.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div> : <div className="mt-5 rounded-xl border p-8"><h2 className="text-2xl">No guides match this search</h2><p className="mt-2 text-muted-foreground">Try fewer words or choose another topic. Clear the filters to browse every guide.</p></div>}
    <details className="mt-10 rounded-xl border p-5"><summary className="cursor-pointer text-sm font-medium">Guide image credits</summary><ul className="mt-3 space-y-3">{photos.map((photo) => <li key={photo.src}><span className="text-sm">{photo.alt}</span><GuidePhotoCredit photo={photo} /></li>)}</ul></details>
  </main>;
}
