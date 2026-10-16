import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/jerusalem-hero.jpg";
import { SiteHeader, SiteFooter, ExtLink } from "@/components/Layout";
import { OWNER_BASE } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Israel Taxi & Travel — reliable travel info and booking options",
      description: "Local guidance for international visitors to Israel: airport transfers, hotels, day trips and attractions, with honest comparisons and booking links.",
      path: "/",
    }),
  component: Home,
});

const intents = [
  { n: "01", title: "Airport taxi to Jerusalem", text: "Compare pre-booked private transfers with the licensed taxi rank, and know exactly where to go after landing.", internal: true, cta: "Compare transfer options" },
  { n: "02", title: "Hotels in Tiberias", text: "Where to stay on the Sea of Galilee, by neighbourhood and travel style.", href: `${OWNER_BASE}/travel-blog/best-hotels-in-tiberias/`, cta: "Read hotel guide" },
  { n: "03", title: "Bethlehem day trips", text: "How to get from Jerusalem to Bethlehem, crossings and planning a day visit.", href: `${OWNER_BASE}/travel-blog/jerusalem-to-bethlehem/`, cta: "Read planning guide" },
  { n: "04", title: "Masada tickets and visiting", text: "Opening times, the cable car or Snake Path, and how to plan around the heat.", href: `${OWNER_BASE}/travel-blog/masada/`, cta: "Read visiting guide" },
];

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:pt-16">
          <div>
            <p className="eyebrow">Travel guidance for Israel</p>
            <h1 className="mt-4 text-4xl leading-[1.08] md:text-6xl">Reliable travel information, and the right place to book.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Locally written guides for international visitors, with clear comparisons of transfers, hotels, tours and tickets — and links to book directly with the provider.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/travel-blog/ben-gurion-airport-to-jerusalem/" className="btn btn-primary">Ben Gurion Airport → Jerusalem</Link>
              <Link to="/about/" className="btn btn-outline">How we compare</Link>
            </div>
          </div>
          <figure className="relative">
            <img src={hero} alt="Jerusalem's Old City walls and rooftops in late-afternoon light" width={1600} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">Jerusalem, Old City</figcaption>
          </figure>
        </section>

        <section aria-labelledby="intents" className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between border-b pb-4">
            <h2 id="intents" className="text-3xl">Start with what you're planning</h2>
          </div>
          <ol className="divide-y">
            {intents.map((i) => (
              <li key={i.n} className="grid gap-3 py-7 md:grid-cols-[5rem_1fr_auto] md:items-center">
                <span className="font-serif text-3xl text-primary">{i.n}</span>
                <div>
                  <h3 className="text-2xl">{i.title}</h3>
                  <p className="mt-1 max-w-2xl text-muted-foreground">{i.text}</p>
                  {!i.internal && <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Existing guide on israel-taxi.com</p>}
                </div>
                {i.internal ? (
                  <Link to="/travel-blog/ben-gurion-airport-to-jerusalem/" className="btn btn-primary">{i.cta} →</Link>
                ) : (
                  <ExtLink href={i.href!} className="btn btn-outline">{i.cta}</ExtLink>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto mt-20 grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div id="hotels" className="rounded-2xl border bg-card p-7">
            <p className="eyebrow">Hotels</p>
            <h2 className="mt-2 text-2xl">Where to stay</h2>
            <p className="mt-2 text-muted-foreground">Neighbourhood-by-neighbourhood advice from our existing guides.</p>
            <ul className="mt-4 space-y-2">
              <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/where-to-stay-in-jerusalem/`} className="font-medium text-primary underline-offset-4 hover:underline">Where to stay in Jerusalem</ExtLink></li>
              <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/where-to-stay-in-tel-aviv/`} className="font-medium text-primary underline-offset-4 hover:underline">Where to stay in Tel Aviv</ExtLink></li>
              <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/best-hotels-in-tiberias/`} className="font-medium text-primary underline-offset-4 hover:underline">Best hotels in Tiberias</ExtLink></li>
            </ul>
          </div>
          <div id="car-rental" className="rounded-2xl border bg-card p-7">
            <p className="eyebrow">Car rental & getting around</p>
            <h2 className="mt-2 text-2xl">Driving, trains and buses</h2>
            <p className="mt-2 text-muted-foreground">Car-rental comparisons are coming. Meanwhile our guide covers driving in Israel alongside public transport.</p>
            <ul className="mt-4 space-y-2">
              <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/getting-around-israel/`} className="font-medium text-primary underline-offset-4 hover:underline">Getting around Israel</ExtLink></li>
              <li><ExtLink guide href={`${OWNER_BASE}/airport-transfers/`} className="font-medium text-primary underline-offset-4 hover:underline">Airport transfers across Israel</ExtLink></li>
            </ul>
          </div>
          <div id="destinations" className="rounded-2xl bg-navy p-7 text-navy-foreground md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Destinations & tours</p>
            <h2 className="mt-2 text-2xl">Jerusalem, the Galilee and the Dead Sea</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <ExtLink guide href={`${OWNER_BASE}/travel-blog/jerusalem-travel-guide/`} className="btn btn-light">Jerusalem travel guide</ExtLink>
              <ExtLink guide href={`${OWNER_BASE}/private-day-trips/`} className="btn btn-light">Private day trips</ExtLink>
              <ExtLink guide href={`${OWNER_BASE}/travel-blog/masada/`} className="btn btn-light">Masada</ExtLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
