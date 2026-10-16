import { createFileRoute } from "@tanstack/react-router";
import { Checklist, HubCard, HubHeader, RelatedLinks } from "@/components/Guide";
import { cityStayGuides } from "@/data/content";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/hotels")({
  head: () =>
    pageMeta({
      title: "Hotels & places to stay in Israel by city — Israel Taxi & Travel",
      description: "Choose where to stay in Jerusalem, Tel Aviv or Tiberias: area guidance, what to check before booking, and links to compare current properties.",
      path: "/hotels/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }],
    }),
  component: Hotels,
});

const blurbs = {
  jerusalem: "Old City atmosphere, walkable centre and Shabbat-aware planning.",
  telaviv: "Beachfront, Jaffa or the café streets of the city centre.",
  tiberias: "Lakefront town, hillside views or countryside stays around the Sea of Galilee.",
} as const;

function Hotels() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }]}
        eyebrow="Accommodation"
        title="Where to stay in Israel"
        intro="Start with the city, then choose an area that fits how you'll get around. Each guide ends with a link to compare current properties for your dates."
      />
      <section aria-labelledby="cities-h" className="mt-10">
        <h2 id="cities-h" className="text-3xl">Choose a city</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {Object.values(cityStayGuides).map((g) => (
            <HubCard key={g.id} to={g.path as never} eyebrow={g.city} title={`Hotels in ${g.city}`} text={blurbs[g.id]} cta={`Explore ${g.city} areas`} />
          ))}
        </div>
      </section>
      <section aria-labelledby="crit-h" className="mt-14">
        <h2 id="crit-h" className="text-3xl">What matters when choosing</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Checklist title="Location" items={["Walking distance to what you'll actually visit", "Hills and steps, especially in Jerusalem", "Taxi drop-off and parking"]} />
          <Checklist title="Timing" items={["Friday-evening and Saturday arrivals (Shabbat)", "Holiday periods book up early", "Summer heat in Tiberias and the Dead Sea"]} />
          <Checklist title="Price" items={["Total with taxes and fees", "Cancellation deadline", "Breakfast and parking included or not"]} />
          <Checklist title="Access" items={["Step-free access or elevator", "Shabbat elevator arrangements", "Family rooms and cots"]} />
        </div>
      </section>
      <RelatedLinks title="Getting to your hotel" items={[
        { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
        { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
        { label: "All transfers", to: "/transfers/" },
        { label: "Destinations", to: "/destinations/" },
      ]} />
    </main>
  );
}
