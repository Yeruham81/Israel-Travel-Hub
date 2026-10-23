import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { HubHeader } from "@/components/Guide";
import { pageMeta } from "@/lib/site";
import { travelGuidePaths } from "@/data/registry";

export const Route = createFileRoute("/destinations")({
  head: () =>
    pageMeta({
      title: "Israel destinations: cities, Galilee & Dead Sea — Israel Taxi & Travel",
      description: "Plan by destination: hotels, transport, tours and attractions for Jerusalem, Tel Aviv, Haifa, Tiberias, the Sea of Galilee and Israel's Dead Sea shore.",
      path: "/destinations/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations/" }],
    }),
  component: Destinations,
});

type L = { label: string; to: LinkProps["to"] };
const dests: { id: string; name: string; text: string; links: L[] }[] = [
  {
    id: "dead-sea", name: "Dead Sea & Ein Bokek",
    text: "Compare spa breaks, family resorts, luxury stays and nature-focused alternatives near Ein Gedi on the Israeli shore.",
    links: [
      { label: "All Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Dead Sea visitor guide", to: travelGuidePaths.deadSea },
      { label: "Qasr el-Yahud visitor guide", to: travelGuidePaths.qasr },
      { label: "Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea },
      { label: "Dead Sea spa hotels", to: "/dead-sea/spa-hotels/" },
      { label: "Dead Sea family hotels", to: "/dead-sea/family-hotels/" },
      { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
      { label: "Airport transfer to Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
    ],
  },
  {
    id: "jerusalem", name: "Jerusalem",
    text: "The Old City, holy sites and museums, with Bethlehem and Masada as popular day trips.",
    links: [
      { label: "Jerusalem travel guide", to: travelGuidePaths.jerusalem },
      { label: "Churches and pilgrimage routes", to: travelGuidePaths.jerusalemChurches },
      { label: "Jerusalem shopping guide", to: travelGuidePaths.jerusalemShopping },
      { label: "Day trips from Jerusalem", to: travelGuidePaths.jerusalemDayTrips },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Bethlehem tours", to: "/tours/bethlehem-jericho-jordan-river/" },
      { label: "Jerusalem to Bethlehem: transport", to: travelGuidePaths.bethlehem },
      { label: "Masada day trip", to: "/travel-blog/masada/" },
    ],
  },
  {
    id: "tel-aviv-jaffa", name: "Tel Aviv & Jaffa",
    text: "Beaches, Bauhaus streets, food and nightlife; a base for the coast.",
    links: [
      { label: "Day trips from Tel Aviv", to: travelGuidePaths.telAvivDayTrips },
      { label: "Tel Aviv beaches", to: travelGuidePaths.telAvivBeaches },
      { label: "Tel Aviv museums", to: travelGuidePaths.telAvivMuseums },
      { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Caesarea on the coast", to: "/attractions/caesarea/" },
      { label: "Car rental", to: "/car-rental/" },
    ],
  },
  {
    id: "haifa", name: "Haifa & Mount Carmel",
    text: "Compare German Colony boutique stays, Carmel views and beachfront family hotels, with connections to shore excursions and northern day trips.",
    links: [
      { label: "All Haifa hotels", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Haifa museums", to: travelGuidePaths.haifaMuseums },
      { label: "Haifa boutique hotels", to: "/haifa/boutique-hotels/" },
      { label: "Haifa family hotels", to: "/haifa/family-hotels/" },
      { label: "Shore excursions from Haifa Port", to: "/haifa-shore-excursions/" },
      { label: "Airport transfer to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
      { label: "Private driver", to: "/private-driver/" },
      { label: "Tours & day trips", to: "/tours/" },
    ],
  },
  {
    id: "tiberias-galilee", name: "Tiberias & the Sea of Galilee",
    text: "Lakeside town and Christian sites, with the Golan and northern Israel nearby.",
    links: [
      { label: "Jordan River baptism sites", to: travelGuidePaths.baptism },
      { label: "Yardenit visitor guide", to: travelGuidePaths.yardenit },
      { label: "Magdala archaeology and pilgrimage", to: travelGuidePaths.magdala },
      { label: "Basilica of the Annunciation", to: travelGuidePaths.annunciation },
      { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      { label: "Tiberias family hotels", to: "/tiberias/family-hotels/" },
      { label: "Tiberias luxury & couples' hotels", to: "/tiberias/luxury-hotels/" },
      { label: "Tours & private day trips", to: "/tours/" },
      { label: "Car rental", to: "/car-rental/" },
      { label: "Private driver", to: "/private-driver/" },
      { label: "Airport transfers", to: "/transfers/" },
    ],
  },
  {
    id: "eilat", name: "Eilat & the Red Sea",
    text: "Red Sea beaches, resort stays and desert scenery. Consider your beach and pool priorities, the hotel's location and the onward journey when planning an Eilat stay.",
    links: [
      { label: "Eilat beaches, reef and desert guide", to: travelGuidePaths.eilat },
      { label: "Best time to visit Israel", to: travelGuidePaths.bestTime },
      { label: "Getting around Israel", to: travelGuidePaths.israel },
      { label: "Airport-transfer destinations & quotes", to: "/transfers/" },
      { label: "Private driver for your route", to: "/private-driver/" },
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
        intro="What I cover for each destination: where to stay, how to get there and what to do nearby."
      />
      <nav aria-label="Browse destinations" className="mt-8 border-y py-4">
        <h2 className="text-lg font-semibold sm:text-xl">Explore by destination</h2>
        <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2">
          {dests.map((destination) => (
            <li key={destination.id}>
              <a href={"#" + destination.id} className="chip h-full w-full text-left">{destination.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 space-y-6">
        {dests.map((d) => (
          <section key={d.name} id={d.id} aria-label={d.name} className="scroll-mt-24 rounded-2xl border bg-card p-6 md:p-8">
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
