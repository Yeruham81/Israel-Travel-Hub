import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { HubHeader } from "@/components/Guide";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/destinations")({
  head: () =>
    pageMeta({
      title: "Israel destinations: Jerusalem, Tel Aviv & Sea of Galilee — Israel Taxi & Travel",
      description: "Plan by destination: hotels, airport transfers, tours and attractions for Jerusalem, Tel Aviv and Tiberias / the Sea of Galilee.",
      path: "/destinations/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations/" }],
    }),
  component: Destinations,
});

type L = { label: string; to: LinkProps["to"] };
const dests: { name: string; text: string; links: L[] }[] = [
  {
    name: "Jerusalem",
    text: "The Old City, holy sites and museums, with Bethlehem and Masada as popular day trips.",
    links: [
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Bethlehem tours", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Masada day trip", to: "/travel-blog/masada/" },
    ],
  },
  {
    name: "Tel Aviv & Jaffa",
    text: "Beaches, Bauhaus streets, food and nightlife; a base for the coast.",
    links: [
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Caesarea on the coast", to: "/attractions/caesarea/" },
      { label: "Car rental", to: "/car-rental/" },
    ],
  },
  {
    name: "Tiberias & the Sea of Galilee",
    text: "Lakeside town and Christian sites, with the Golan and northern Israel nearby.",
    links: [
      { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      { label: "Tours & private day trips", to: "/tours/" },
      { label: "Car rental", to: "/car-rental/" },
      { label: "Private transport", to: "/transfers/" },
    ],
  },
];

function Destinations() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Destinations", to: "/destinations/" }]}
        eyebrow="Destinations"
        title="Plan by destination"
        intro="Everything we cover for each base: where to stay, how to get there and what to do nearby."
      />
      <div className="mt-10 space-y-6">
        {dests.map((d) => (
          <section key={d.name} aria-label={d.name} className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="text-3xl">{d.name}</h2>
            <p className="mt-2 text-muted-foreground">{d.text}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {d.links.map((l) => <li key={l.label}><Link to={l.to} className="font-medium text-primary underline-offset-4 hover:underline">{l.label} →</Link></li>)}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
