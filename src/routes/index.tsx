import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import jerusalem from "@/assets/home/jerusalem-old-city.webp";
import telAviv from "@/assets/home/tel-aviv-coast.webp";
import tiberias from "@/assets/home/tiberias-lake.webp";
import t3 from "@/assets/home/ben-gurion-t3.webp";
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import caesareaDusk from "@/assets/home/caesarea-dusk.webp";
import caesareaAqueduct from "@/assets/home/caesarea-aqueduct.webp";
import hotelRoom from "@/assets/home/hotel-room.webp";
import airportPickup from "@/assets/home/airport-pickup.webp";
import guidedTour from "@/assets/home/guided-tour.webp";
import cruisePort from "@/assets/home/cruise-port.webp";
import ashdodPort from "@/assets/home/ashdod-port.webp";
import haifaPort from "@/assets/home/haifa-port.webp";
import haifaHotels from "@/assets/haifa/panorama.webp";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import { pageMeta } from "@/lib/site";
import { photoCredits } from "@/data/photoCredits";
import { GuideCard } from "@/components/TravelGuide";
import { guideDirectory } from "@/data/travelGuides";
import { isPublisherUrl } from "@/data/registry";
import { AuthorCard } from "@/components/AuthorCard";
import { TripadvisorReviewsSection, PersonalTestimonialsSection } from "@/components/HomeTestimonials";
import { HomeContactForm } from "@/components/HomeContactForm";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Israel Travel Guides: Airport Transfers, Tours, Hotels & Attractions",
      description: "Plan Israel airport transfers, tours, shore excursions, accommodation and attractions with practical local travel guides and clear booking options.",
      path: "/",
    }),
  component: Home,
});

type Img = { src: string; alt: string; pos?: string };
type Card = { label: string; text: string; to: LinkProps["to"]; img: Img };
type Service = { id: string; eyebrow: string; tagline: string; title: string; text: string; feature: Img; cards: Card[]; hub: { label: string; to: LinkProps["to"] } };

const IMG = {
  jerusalem: { src: jerusalem, alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives" },
  telAviv: { src: telAviv, alt: "Tel Aviv's beachfront skyline seen from Jaffa" },
  tiberias: { src: tiberias, alt: "Tiberias on the shore of the Sea of Galilee, seen from the water" },
  deadSea: { src: deadSeaBeach, alt: "Ein Bokek's beach and palm-lined promenade beside the Dead Sea" },
  haifa: { src: haifaHotels, alt: "Haifa Bay and the Bahá'í Gardens seen from Mount Carmel" },
  bethlehem: { src: bethlehem, alt: "Church of the Nativity on Manger Square, Bethlehem" },
  masada: { src: masada, alt: "Masada plateau from the air with the Dead Sea behind" },
  caesarea: { src: caesareaAqueduct, alt: "Roman aqueduct along the beach at Caesarea" },
} satisfies Record<string, Img>;

const services: Service[] = [
  {
    id: "transfers", eyebrow: "Airport Transfers", tagline: "Plan a Smooth Arrival in Israel", title: "Airport Transfers",
    text: "Arrange a comfortable private pickup from Ben Gurion Airport to Jerusalem, Tel Aviv or Haifa, with a vehicle and meeting point tailored to your needs.",
    feature: { src: airportPickup, alt: "Illustrative driver loading luggage for arriving travellers" },
    cards: [
      { label: "Private Transfer to Jerusalem", text: "Book a private pickup to your Jerusalem hotel", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", img: IMG.jerusalem },
      { label: "Private Transfer to Tel Aviv", text: "Airport pickup for Tel Aviv hotels and Jaffa", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/", img: IMG.telAviv },
      { label: "Private Transfer to Haifa", text: "Door-to-door travel to Haifa and Mount Carmel", to: "/travel-blog/ben-gurion-airport-to-haifa/", img: IMG.haifa },
    ],
    hub: { label: "Explore airport transfers", to: "/transfers/" },
  },
  {
    id: "tours", eyebrow: "Tours & Day Trips", tagline: "See the Best of Israel in a Day", title: "Tours & Day Trips",
    text: "How to read an itinerary, what pickup and guide language mean in practice, and when a private driver fits better.",
    feature: { src: guidedTour, alt: "Illustrative small group on a guided walk through old stone streets" },
    cards: [
      { label: "Bethlehem from Jerusalem", text: "Compare combined day tours", to: "/tours/bethlehem-from-jerusalem/", img: IMG.bethlehem },
      { label: "Masada & Dead Sea", text: "Plan the desert day", to: "/travel-blog/masada/", img: IMG.masada },
    ],
    hub: { label: "Explore tours & day trips", to: "/tours/" },
  },
  {
    id: "shore-excursions", eyebrow: "Shore Excursions", tagline: "Make the Most of Your Time Ashore", title: "Shore Excursions",
    text: "Arriving by cruise ship? Plan a day ashore around your all-aboard time, then choose a private driver, guide or port-specific tour.",
    feature: { src: cruisePort, alt: "Illustrative cruise passengers walking along a harbour quay toward a waiting minivan (not a specific ship or operator)" },
    cards: [
      { label: "From Ashdod Port", text: "Jerusalem, Tel Aviv–Jaffa or the Dead Sea", to: "/ashdod-shore-excursions/", img: { src: ashdodPort, alt: "Aerial view of Ashdod Port" } },
      { label: "From Haifa Port", text: "Akko, the Galilee or a long day to Jerusalem", to: "/haifa-shore-excursions/", img: { src: haifaPort, alt: "Haifa Port and Haifa Bay seen from Mount Carmel" } },
    ],
    hub: { label: "Explore shore excursions", to: "/shore-excursions/" },
  },
  {
    id: "accommodation", eyebrow: "Accommodation", tagline: "Find the Perfect Place to Stay", title: "Accommodation in Israel",
    text: "Choose a neighborhood or hotel style, then compare practical details such as beach access, family facilities, spa entry and arrival before booking.",
    feature: { src: hotelRoom, alt: "Illustrative bright hotel room with a made bed by the window (not a specific property)" },
    cards: [
      { label: "Jerusalem", text: "Old City, German Colony or city centre?", to: "/travel-blog/where-to-stay-in-jerusalem/", img: IMG.jerusalem },
      { label: "Tel Aviv", text: "Beachfront, Jaffa or the White City", to: "/travel-blog/where-to-stay-in-tel-aviv/", img: IMG.telAviv },
      { label: "Tiberias & Galilee", text: "Family, luxury & lakeside hotels", to: "/travel-blog/best-hotels-in-tiberias/", img: IMG.tiberias },
      { label: "Dead Sea", text: "Spa breaks, family resorts & luxury stays", to: "/travel-blog/best-dead-sea-hotels/", img: IMG.deadSea },
      { label: "Haifa", text: "Boutique, family & Carmel hotels", to: "/travel-blog/best-hotels-in-haifa/", img: IMG.haifa },
    ],
    hub: { label: "Explore accommodation", to: "/hotels/" },
  },
  {
    id: "attractions", eyebrow: "Attractions & Experiences", tagline: "Discover Israel’s Must-See Places", title: "Attractions & Experiences",
    text: "Desert fortresses, seaside ruins and holy places — what to expect and how long to allow.",
    feature: { src: caesareaDusk, alt: "Ancient ruins on the shore at Caesarea at dusk" },
    cards: [
      { label: "Masada", text: "Cable car or the hiking paths", to: "/travel-blog/masada/", img: IMG.masada },
      { label: "Caesarea", text: "Roman harbour city on the coast", to: "/attractions/caesarea/", img: IMG.caesarea },
      { label: "Bethlehem", text: "Church of the Nativity & Manger Square", to: "/tours/bethlehem-from-jerusalem/", img: IMG.bethlehem },
    ],
    hub: { label: "Explore attractions & experiences", to: "/attractions/" },
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

function CompactCard({ c }: { c: Card }) {
  return (
    <li>
      <Link to={c.to} className="photo-card group grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-xl border bg-background p-2.5 pr-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[112px_minmax(0,1fr)]">
        <span className="block overflow-hidden rounded-lg">
          <img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={224} height={160} className="aspect-[7/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight group-hover:text-primary">{c.label}</h3>
          <span className="mt-0.5 block text-sm text-muted-foreground">{c.text} <span aria-hidden>→</span></span>
        </div>
      </Link>
    </li>
  );
}

function Home() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <nav aria-label="Services" className="grid grid-cols-2 gap-2 rounded-2xl border bg-card p-3 shadow-lg sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-lg px-3 py-2 text-center text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{s.id === "tours" ? "Tours & Day Trips" : s.eyebrow.split(" &")[0]}</a>
          ))}
          <a href="#guides" className="rounded-lg px-3 py-2 text-center text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Travel Guides</a>
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-6xl space-y-8 px-4">
        {services.slice(0, 1).map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`scroll-mt-6 rounded-2xl border p-5 md:p-8 ${i % 2 ? "bg-accent/40" : "bg-card"}`}>
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-stretch" data-testid={`service-layout-${s.id}`}>
              <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/10] h-full min-h-64 w-full rounded-xl object-cover lg:max-h-[410px]" />
              <ul className="grid content-start gap-3" aria-label={`${s.eyebrow} choices`}>
                {s.cards.slice(0, 3).map((c) => <CompactCard key={c.label} c={c} />)}
              </ul>
              {s.cards.length > 3 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2" aria-label={`More ${s.eyebrow.toLowerCase()} choices`} data-testid={`service-more-${s.id}`}>
                  {s.cards.slice(3).map((c) => <CompactCard key={c.label} c={c} />)}
                </ul>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <Link to={s.hub.to} className="btn btn-primary">{s.hub.label} →</Link>
            </div>
          </section>
        ))}
      </div>
      <TripadvisorReviewsSection />
      <div className="mx-auto mt-14 max-w-6xl space-y-8 px-4">
        {services.slice(1).map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`scroll-mt-6 rounded-2xl border p-5 md:p-8 ${(i + 1) % 2 ? "bg-accent/40" : "bg-card"}`}>
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-stretch" data-testid={`service-layout-${s.id}`}>
              <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/10] h-full min-h-64 w-full rounded-xl object-cover lg:max-h-[410px]" />
              <ul className="grid content-start gap-3" aria-label={`${s.eyebrow} choices`}>
                {s.cards.slice(0, 3).map((c) => <CompactCard key={c.label} c={c} />)}
              </ul>
              {s.cards.length > 3 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2" aria-label={`More ${s.eyebrow.toLowerCase()} choices`} data-testid={`service-more-${s.id}`}>
                  {s.cards.slice(3).map((c) => <CompactCard key={c.label} c={c} />)}
                </ul>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <Link to={s.hub.to} className="btn btn-primary">{s.hub.label} →</Link>
            </div>
          </section>
        ))}
      </div>

      <section id="guides" aria-labelledby="guides-h" className="mx-auto mt-16 max-w-6xl scroll-mt-6 px-4">
        <div><p className="eyebrow">Before You Travel</p><h2 id="guides-h" className="mt-2 text-3xl">Practical Israel Travel Guides</h2><p className="mt-3 max-w-2xl text-muted-foreground">Clear answers about arrival, getting connected and choosing how to get around.</p></div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-testid="guide-row-one">{guideDirectory.filter((guide) => ["uber", "esim", "arrival"].includes(guide.id)).map((guide) => <GuideCard key={guide.id} guide={guide} headingLevel={3} />)}</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-testid="guide-row-two">{guideDirectory.filter((guide) => ["israel", "travelTips", "airport-journey-jerusalem"].includes(guide.id)).map((guide) => <GuideCard key={guide.id} guide={guide} headingLevel={3} />)}</div>
        <div className="mt-7 flex justify-center"><Link to="/guides/" className="btn btn-primary">Browse all guides →</Link></div>
      </section>
      <section aria-labelledby="dest-h" className="mx-auto mt-20 max-w-6xl px-4">
        <div className="rounded-2xl bg-navy p-6 text-navy-foreground md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Where to Base Yourself</p>
          <h2 id="dest-h" className="mt-2 text-3xl">Popular Destinations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <PhotoCard c={{ label: "Jerusalem", text: "Old City, Bethlehem & Masada trips", to: "/travel-blog/where-to-stay-in-jerusalem/", img: IMG.jerusalem }} />
            <PhotoCard c={{ label: "Tel Aviv & Jaffa", text: "Beaches, food and the coast", to: "/travel-blog/where-to-stay-in-tel-aviv/", img: IMG.telAviv }} />
            <PhotoCard c={{ label: "Tiberias & Galilee", text: "Lakeside base for the north", to: "/travel-blog/best-hotels-in-tiberias/", img: IMG.tiberias }} />
            <PhotoCard c={{ label: "Dead Sea", text: "Spa, family and resort stays", to: "/travel-blog/best-dead-sea-hotels/", img: IMG.deadSea }} />
            <PhotoCard c={{ label: "Haifa", text: "Carmel views, boutique & beach stays", to: "/travel-blog/best-hotels-in-haifa/", img: IMG.haifa }} />
          </div>
          <Link to="/destinations/" className="btn btn-light mt-6">Explore all destinations →</Link>
        </div>
      </section>
      <PersonalTestimonialsSection />
      <div className="mx-auto mt-10 max-w-6xl px-4"><AuthorCard introduction /></div>
      <div className="mx-auto mt-14 max-w-6xl px-4"><HomeContactForm /></div>
      <details className="mx-auto mb-10 mt-10 max-w-6xl px-4 text-sm text-muted-foreground">
        <summary className="inline-block cursor-pointer rounded px-1 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Photo credits</summary>
        <ul className="mt-3 space-y-1.5">
          {photoCredits.filter((credit) => !isPublisherUrl(credit.sourceUrl)).map((c) => (
            <li key={c.asset}>
              {c.sourceUrl ? <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{c.subject}</a> : c.subject}
              {c.author && <> by {c.author}</>}
              {" — "}
              {c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{c.license}</a> : c.license}
              {". "}{c.changes}.
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
