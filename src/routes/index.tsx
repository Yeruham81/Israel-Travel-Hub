import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import hero from "@/assets/jerusalem-hero.jpg";
import jerusalem from "@/assets/home/jerusalem-old-city.webp";
import telAviv from "@/assets/home/tel-aviv-coast.webp";
import tiberias from "@/assets/home/tiberias-lake.webp";
import t3 from "@/assets/home/ben-gurion-t3.webp";
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import cableCar from "@/assets/home/masada-cable-car.webp";
import cableCarWide from "@/assets/home/masada-cable-car-wide.webp";
import caesareaDusk from "@/assets/home/caesarea-dusk.webp";
import caesareaAqueduct from "@/assets/home/caesarea-aqueduct.webp";
import caesareaTheatre from "@/assets/home/caesarea-theatre.webp";
import hotelPool from "@/assets/home/hotel-pool.webp";
import airportPickup from "@/assets/home/airport-pickup.webp";
import guidedTour from "@/assets/home/guided-tour.webp";
import roadTrip from "@/assets/home/road-trip.webp";
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

type Img = { src: string; alt: string; pos?: string };
type Card = { label: string; text: string; to: LinkProps["to"]; img: Img };
type Service = { id: string; eyebrow: string; title: string; text: string; feature: Img; cards: Card[]; hub: { label: string; to: LinkProps["to"] } };

const IMG = {
  jerusalem: { src: jerusalem, alt: "Jerusalem's Old City walls and rooftops" },
  telAviv: { src: telAviv, alt: "Tel Aviv's beachfront skyline seen from Jaffa" },
  tiberias: { src: tiberias, alt: "Tiberias on the shore of the Sea of Galilee, seen from the water" },
  t3: { src: t3, alt: "Arrivals hall at Ben Gurion Airport Terminal 3" },
  bethlehem: { src: bethlehem, alt: "Church of the Nativity on Manger Square, Bethlehem" },
  masada: { src: masada, alt: "Masada plateau from the air with the Dead Sea behind" },
  cableCar: { src: cableCar, alt: "Masada cable car approaching the summit station" },
  caesarea: { src: caesareaAqueduct, alt: "Roman aqueduct along the beach at Caesarea" },
  caesareaTheatre: { src: caesareaTheatre, alt: "Roman theatre at Caesarea National Park" },
} satisfies Record<string, Img>;

const services: Service[] = [
  {
    id: "accommodation", eyebrow: "Accommodation", title: "Where to stay, city by city",
    text: "Area-by-area advice — Shabbat, hills, parking, beach access — before you compare properties for your dates.",
    feature: { src: hotelPool, alt: "Illustrative hotel rooftop pool at sunset (not a specific property)" },
    cards: [
      { label: "Jerusalem", text: "Old City, German Colony or city centre?", to: "/travel-blog/where-to-stay-in-jerusalem/", img: IMG.jerusalem },
      { label: "Tel Aviv", text: "Beachfront, Jaffa or the White City", to: "/travel-blog/where-to-stay-in-tel-aviv/", img: IMG.telAviv },
      { label: "Tiberias & Galilee", text: "A lakeside base for the north", to: "/travel-blog/best-hotels-in-tiberias/", img: IMG.tiberias },
    ],
    hub: { label: "Explore accommodation", to: "/hotels/" },
  },
  {
    id: "transfers", eyebrow: "Transfers & private transport", title: "From the airport and between cities",
    text: "Where the licensed taxi rank is, when to pre-book, and how to compare transfer quotes like-for-like.",
    feature: { src: airportPickup, alt: "Illustrative driver loading luggage for arriving travellers" },
    cards: [
      { label: "Airport → Jerusalem", text: "Taxis, private transfers & the train", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", img: IMG.jerusalem },
      { label: "Airport → Tel Aviv", text: "Short ride to the coast", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/", img: IMG.telAviv },
      { label: "Ben Gurion Airport", text: "All airport transfer routes", to: "/transfers/ben-gurion-airport/", img: IMG.t3 },
    ],
    hub: { label: "Explore transfers", to: "/transfers/" },
  },
  {
    id: "tours", eyebrow: "Tours & day trips", title: "Shared tours or a private day",
    text: "How to read an itinerary, what pickup and guide language mean in practice, and when a private driver fits better.",
    feature: { src: guidedTour, alt: "Illustrative small group on a guided walk through old stone streets" },
    cards: [
      { label: "Bethlehem from Jerusalem", text: "Compare combined day tours", to: "/tours/bethlehem-from-jerusalem/", img: IMG.bethlehem },
      { label: "Masada & Dead Sea", text: "Plan the desert day", to: "/travel-blog/masada/", img: IMG.masada },
    ],
    hub: { label: "Explore tours", to: "/tours/" },
  },
  {
    id: "attractions", eyebrow: "Attractions & experiences", title: "Sites worth planning around",
    text: "Desert fortresses, seaside ruins and holy places — what to expect and how long to allow.",
    feature: { src: caesareaDusk, alt: "Ancient ruins on the shore at Caesarea at dusk" },
    cards: [
      { label: "Masada", text: "Cable car or the hiking paths", to: "/travel-blog/masada/", img: IMG.masada },
      { label: "Caesarea", text: "Roman harbour city on the coast", to: "/attractions/caesarea/", img: IMG.caesarea },
      { label: "Bethlehem", text: "Church of the Nativity & Manger Square", to: "/tours/bethlehem-from-jerusalem/", img: IMG.bethlehem },
    ],
    hub: { label: "Explore attractions", to: "/attractions/" },
  },
  {
    id: "tickets", eyebrow: "Tickets & admission", title: "Entry tickets, not tours",
    text: "Admission options on official sites, kept separate from tours that include transport.",
    feature: { src: cableCarWide, alt: "Masada cable car above the desert cliffs" },
    cards: [
      { label: "Masada tickets & cable car", text: "Official visit options", to: "/travel-blog/masada/", img: IMG.cableCar },
      { label: "Caesarea visit options", text: "Official park admission", to: "/attractions/caesarea/", img: IMG.caesareaTheatre },
    ],
    hub: { label: "Explore tickets", to: "/tickets/" },
  },
  {
    id: "car-rental", eyebrow: "Car rental", title: "Drive the countryside, skip the city traffic",
    text: "Airport or city pickup, Shabbat office hours, tolls and parking — then compare on the provider's site.",
    feature: { src: roadTrip, alt: "Illustrative rental car on an open desert road at sunset" },
    cards: [
      { label: "Airport pickup", text: "Collect at Ben Gurion on arrival", to: "/car-rental/", img: IMG.t3 },
      { label: "City pickup", text: "Rent only for out-of-town days", to: "/car-rental/", img: IMG.telAviv },
      { label: "Tiberias & Galilee", text: "Where a car is most useful", to: "/travel-blog/best-hotels-in-tiberias/", img: IMG.tiberias },
    ],
    hub: { label: "Explore car rental", to: "/car-rental/" },
  },
];

function PhotoCard({ c }: { c: Card }) {
  return (
    <Link to={c.to} className="photo-card group relative block overflow-hidden rounded-xl bg-navy shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
      <img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={600} height={400} className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden />
      <span className="absolute inset-x-0 bottom-0 p-4 text-navy-foreground">
        <span className="block font-serif text-lg leading-tight">{c.label}</span>
        <span className="mt-0.5 block text-sm opacity-90">{c.text} <span aria-hidden>→</span></span>
      </span>
    </Link>
  );
}

function Home() {
  return (
    <main>
      <section className="relative mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-navy">
          <img src={hero} alt="Jerusalem's Old City walls and rooftops in late-afternoon light" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10" aria-hidden />
          <div className="relative max-w-2xl px-6 py-16 text-navy-foreground md:px-12 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-85">Plan your trip to Israel</p>
            <h1 className="mt-4 text-4xl leading-[1.08] md:text-6xl">Where to stay, how to get around, what to see.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-90">
              Locally written guides for international visitors — useful information first, then clear links to book with hotels, transfer companies, tour operators and official sites.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/hotels/" className="btn btn-light">Find where to stay</Link>
              <Link to="/destinations/" className="btn border border-navy-foreground/60 text-navy-foreground hover:bg-navy-foreground/15">Browse destinations</Link>
            </div>
          </div>
          <p className="absolute bottom-3 right-4 text-xs text-navy-foreground/80">Jerusalem, Old City</p>
        </div>
        <nav aria-label="Services" className="relative -mt-6 mx-4 grid grid-cols-2 gap-2 rounded-2xl border bg-card p-3 shadow-lg sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-lg px-3 py-2 text-center text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{s.eyebrow.split(" &")[0]}</a>
          ))}
        </nav>
      </section>

      <div className="mx-auto mt-14 max-w-6xl space-y-16 px-4">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-6">
            <div className={`grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-stretch ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-navy md:min-h-[420px]">
                <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6 text-navy-foreground md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-85">{s.eyebrow}</p>
                  <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">{s.title}</h2>
                  <p className="mt-2 max-w-md opacity-90">{s.text}</p>
                  <Link to={s.hub.to} className="btn btn-light mt-4">{s.hub.label} →</Link>
                </div>
              </div>
              <div className={`grid content-center gap-4 ${s.cards.length === 2 ? "sm:grid-cols-2 lg:grid-cols-1" : "sm:grid-cols-3 lg:grid-cols-2 lg:[&>*:first-child]:col-span-2"}`}>
                {s.cards.map((c) => <PhotoCard key={c.label} c={c} />)}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="dest-h" className="mx-auto mt-20 max-w-6xl px-4">
        <div className="rounded-2xl bg-navy p-6 text-navy-foreground md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Popular destinations</p>
          <h2 id="dest-h" className="mt-2 text-3xl">Jerusalem, Tel Aviv and the Sea of Galilee</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <PhotoCard c={{ label: "Jerusalem", text: "Old City, Bethlehem & Masada trips", to: "/travel-blog/where-to-stay-in-jerusalem/", img: IMG.jerusalem }} />
            <PhotoCard c={{ label: "Tel Aviv & Jaffa", text: "Beaches, food and the coast", to: "/travel-blog/where-to-stay-in-tel-aviv/", img: IMG.telAviv }} />
            <PhotoCard c={{ label: "Tiberias & Galilee", text: "Lakeside base for the north", to: "/travel-blog/best-hotels-in-tiberias/", img: IMG.tiberias }} />
          </div>
          <Link to="/destinations/" className="btn btn-light mt-6">Explore all destinations →</Link>
        </div>
      </section>
    </main>
  );
}
