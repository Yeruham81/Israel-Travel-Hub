import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import hero from "@/assets/jerusalem-hero.jpg";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Israel Taxi & Travel — plan hotels, transfers, tours and tickets in Israel",
      description: "Local guidance for visiting Israel: where to stay, airport transfers, tours, attractions, tickets and car rental — with honest comparisons and links to book with providers.",
      path: "/",
    }),
  component: Home,
});

type L = { label: string; to: LinkProps["to"] };
const services: { id: string; eyebrow: string; title: string; text: string; links: L[]; hub: L }[] = [
  {
    id: "accommodation", eyebrow: "Accommodation", title: "Where to stay, city by city",
    text: "Area-by-area advice for Jerusalem, Tel Aviv and Tiberias — Shabbat, hills, parking and beach access — before you compare properties for your dates.",
    links: [
      { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
    ],
    hub: { label: "Explore accommodation", to: "/hotels/" },
  },
  {
    id: "transfers", eyebrow: "Transfers & private transport", title: "From the airport and between cities",
    text: "Where the licensed taxi rank is, when to pre-book, and how to compare transfer quotes like-for-like. Private drivers for multi-stop days.",
    links: [
      { label: "Ben Gurion Airport transfers", to: "/transfers/ben-gurion-airport/" },
      { label: "Airport → Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
      { label: "Airport → Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
    ],
    hub: { label: "Explore transfers", to: "/transfers/" },
  },
  {
    id: "tours", eyebrow: "Tours & day trips", title: "Shared tours or a private day",
    text: "How to read an itinerary, what pickup and language mean in practice, and when a private driver beats a group tour.",
    links: [
      { label: "Bethlehem tours from Jerusalem", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Masada & Dead Sea day", to: "/travel-blog/masada/" },
    ],
    hub: { label: "Explore tours", to: "/tours/" },
  },
  {
    id: "attractions", eyebrow: "Attractions & experiences", title: "Sites worth planning around",
    text: "Desert fortresses, seaside ruins and holy places — what to expect, how long to allow and how to get there.",
    links: [
      { label: "Masada National Park", to: "/travel-blog/masada/" },
      { label: "Caesarea National Park", to: "/attractions/caesarea/" },
      { label: "Bethlehem", to: "/tours/bethlehem-from-jerusalem/" },
    ],
    hub: { label: "Explore attractions", to: "/attractions/" },
  },
  {
    id: "tickets", eyebrow: "Tickets & admission", title: "Entry tickets, not tours",
    text: "Admission-only options on official sites, kept separate from tours that include transport — so you know what you're paying for.",
    links: [
      { label: "Masada tickets & cable car", to: "/travel-blog/masada/" },
      { label: "Caesarea visit options", to: "/attractions/caesarea/" },
    ],
    hub: { label: "Explore tickets", to: "/tickets/" },
  },
  {
    id: "car-rental", eyebrow: "Car rental", title: "Drive the countryside, skip the city traffic",
    text: "Airport or city pickup, Shabbat office hours, tolls and parking — then compare rentals on the provider's site.",
    links: [
      { label: "Airport vs city pickup", to: "/car-rental/" },
      { label: "Hotels in Tiberias (car useful)", to: "/travel-blog/best-hotels-in-tiberias/" },
    ],
    hub: { label: "Explore car rental", to: "/car-rental/" },
  },
];

function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 md:grid-cols-[1.1fr_1fr] md:pt-14">
        <div>
          <p className="eyebrow">Plan your trip to Israel</p>
          <h1 className="mt-4 text-4xl leading-[1.08] md:text-6xl">Where to stay, how to get around, what to see.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Locally written guides for international visitors — useful information first, then clear links to book directly with hotels, transfer companies, tour operators and official sites.
          </p>
          <nav aria-label="Services" className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => <Link key={s.id} to={s.hub.to} className="chip hover:bg-muted">{s.eyebrow}</Link>)}
          </nav>
        </div>
        <figure className="relative">
          <img src={hero} alt="Jerusalem's Old City walls and rooftops in late-afternoon light" width={1600} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl" />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">Jerusalem, Old City</figcaption>
        </figure>
      </section>

      <div className="mx-auto max-w-6xl space-y-5 px-4">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`grid gap-6 rounded-2xl p-7 md:grid-cols-[1fr_1fr] md:p-9 ${i % 2 ? "bg-card border" : "bg-accent/60"}`}>
            <div>
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 id={`${s.id}-h`} className="mt-2 text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
              <Link to={s.hub.to} className="btn btn-primary mt-5">{s.hub.label} →</Link>
            </div>
            <ul className="self-center divide-y rounded-xl border bg-background">
              {s.links.map((l) => (
                <li key={l.label}><Link to={l.to} className="flex items-center justify-between px-4 py-3 font-medium hover:text-primary">{l.label}<span aria-hidden>→</span></Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="dest-h" className="mx-auto mt-16 max-w-6xl px-4">
        <div className="rounded-2xl bg-navy p-8 text-navy-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Popular destinations</p>
          <h2 id="dest-h" className="mt-2 text-3xl">Jerusalem, Tel Aviv and the Sea of Galilee</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {([
              ["Jerusalem", "/travel-blog/where-to-stay-in-jerusalem/", "Old City, Bethlehem & Masada trips"],
              ["Tel Aviv & Jaffa", "/travel-blog/where-to-stay-in-tel-aviv/", "Beaches, food and the coast"],
              ["Tiberias & Galilee", "/travel-blog/best-hotels-in-tiberias/", "Lakeside base for the north"],
            ] as const).map(([n, to, t]) => (
              <Link key={n} to={to} className="rounded-xl bg-navy-foreground/10 p-4 hover:bg-navy-foreground/20">
                <span className="font-serif text-xl">{n}</span>
                <span className="mt-1 block text-sm opacity-80">{t}</span>
              </Link>
            ))}
          </div>
          <Link to="/destinations/" className="btn btn-light mt-6">Explore all destinations →</Link>
        </div>
      </section>
    </main>
  );
}
