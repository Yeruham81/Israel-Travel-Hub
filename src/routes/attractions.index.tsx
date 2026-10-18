import { createFileRoute } from "@tanstack/react-router";
import { HubCard, HubHeader, RelatedLinks } from "@/components/Guide";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/attractions/")({
  head: () =>
    pageMeta({
      title: "Israel attractions to visit: Masada, Caesarea and more",
      description: "Explore Israeli attractions by region, including Masada, Caesarea and Bethlehem. Find practical guides to admission, travel and tours.",
      path: "/attractions/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Attractions", path: "/attractions/" }],
    }),
  component: Attractions,
});

const regions = [
  { region: "Dead Sea & desert", items: [{ to: "/travel-blog/masada/" as const, title: "Masada National Park", text: "Desert fortress with cable car, hiking ascent, museum and a separate west-side night show.", type: "National park · archaeology" }] },
  { region: "Mediterranean coast", items: [{ to: "/attractions/caesarea/" as const, title: "Caesarea National Park", text: "Seafront archaeological park between Tel Aviv and Haifa.", type: "National park · archaeology" }] },
  { region: "Jerusalem area", items: [{ to: "/tours/bethlehem-from-jerusalem/" as const, title: "Bethlehem", text: "Church of the Nativity and Manger Square, usually visited with a tour or driver.", type: "Religious heritage · tour" }] },
];

function Attractions() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Attractions", to: "/attractions/" }]}
        eyebrow="Attractions & experiences"
        title="Attractions and experiences"
        intro="Browse by region. Each guide covers what to expect, timing and how to get there before linking to official visit options or tours."
      />
      {regions.map((r) => (
        <section key={r.region} aria-label={r.region} className="mt-10">
          <h2 className="text-3xl">{r.region}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {r.items.map((i) => <HubCard key={i.title} to={i.to} eyebrow={i.type} title={i.title} text={i.text} cta="Plan your visit" />)}
          </div>
        </section>
      ))}
      <RelatedLinks title="Related" items={[
        { label: "Tickets & admission", to: "/tickets/", note: "Entry-only options, separate from tours" },
        { label: "Tours & day trips", to: "/tours/" },
        { label: "Car rental", to: "/car-rental/" },
        { label: "Destinations", to: "/destinations/" },
      ]} />
    </main>
  );
}
