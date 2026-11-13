import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import lcpHeroMobile from "@/assets/home/hero-jerusalem-sm-optimized.webp";
import lcpHeroMedium from "@/assets/home/hero-jerusalem-medium.webp";
import lcpHeroLarge from "@/assets/home/hero-jerusalem-large.webp";
import jerusalem from "@/assets/home/jerusalem-old-city.webp";
import airportTransportPhoto from "@/assets/airport-transfers/airport.webp";
import telAviv from "@/assets/home/tel-aviv-coast.webp";
import tiberias from "@/assets/home/tiberias-lake.webp";
import t3 from "@/assets/home/ben-gurion-t3.webp";
import bethlehem from "@/assets/home/bethlehem-nativity.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import caesareaDusk from "@/assets/home/caesarea-dusk-feature.webp";
import caesareaAqueduct from "@/assets/home/caesarea-aqueduct.webp";
import guidedTour from "@/assets/home/guided-tour-feature.webp";
import cruisePort from "@/assets/home/cruise-port-feature.webp";
import ashdodPort from "@/assets/home/ashdod-port.webp";
import haifaPort from "@/assets/home/haifa-port.webp";
import haifaHotels from "@/assets/haifa/panorama.webp";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import jerusalemCard from "@/assets/home/jerusalem-old-city-card.webp";
import telAvivCard from "@/assets/home/tel-aviv-coast-card.webp";
import tiberiasCard from "@/assets/home/tiberias-lake-card.webp";
import bethlehemCard from "@/assets/home/bethlehem-nativity-card.webp";
import masadaCard from "@/assets/home/masada-dead-sea-card.webp";
import caesareaDuskCard from "@/assets/home/caesarea-dusk-card.webp";
import caesareaAqueductCard from "@/assets/home/caesarea-aqueduct-card.webp";
import guidedTourCard from "@/assets/home/guided-tour-card.webp";
import cruisePortCard from "@/assets/home/cruise-port-card.webp";
import haifaHotelsCard from "@/assets/haifa/panorama-card.webp";
import deadSeaBeachCard from "@/assets/dead-sea/beach-card.webp";
import jerusalemTile from "@/assets/home/jerusalem-old-city-tile.webp";
import telAvivTile from "@/assets/home/tel-aviv-coast-tile.webp";
import tiberiasTile from "@/assets/home/tiberias-lake-tile.webp";
import bethlehemTile from "@/assets/home/bethlehem-nativity-tile.webp";
import masadaTile from "@/assets/home/masada-dead-sea-tile.webp";
import caesareaTile from "@/assets/home/caesarea-aqueduct-tile.webp";
import haifaTile from "@/assets/haifa/panorama-tile.webp";
import deadSeaTile from "@/assets/dead-sea/beach-tile.webp";
import { pageMeta } from "@/lib/site";
import { tourCategoryPaths } from "@/data/tours";
import bethlehemTourPhoto from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";
import roshHanikraPhoto from "@/assets/guides/rosh-hanikra.jpg";
import ramonCraterPhoto from "@/assets/guides/mitzpe-ramon-crater.jpg";
import capernaumPhoto from "@/assets/guides/capernaum.jpg";
import mountTaborPhoto from "@/assets/guides/mount-tabor.jpg";
import { photoCredits } from "@/data/photoCredits";
import { GuideCard } from "@/components/TravelGuide";
import { guideDirectory } from "@/data/travelGuides";
import { isPublisherUrl } from "@/data/registry";
import { AuthorCard } from "@/components/AuthorCard";
import { TripadvisorReviewsSection, PersonalTestimonialsSection } from "@/components/HomeTestimonials";
import { HomeContactForm } from "@/components/HomeContactForm";

export const Route = createFileRoute("/")({
  head: () => {
    const meta = pageMeta({
      title: "Israel Travel Guides: Airport Transfers, Tours, Hotels & Attractions",
      description: "Plan Israel airport transfers, tours, shore excursions, accommodation and attractions with practical local travel guides and clear booking options.",
      path: "/",
    });
    // HTML head discovery rather than waiting for the <picture> far below the
    // global navigation. The media constraints match HeroCarousel's sources:
    // the browser fetches ONE asset at the viewport's appropriate size.
    return {
      ...meta,
      links: [
        ...meta.links,
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroMobile, media: "(max-width: 767px)", fetchPriority: "high" },
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroMedium, media: "(min-width: 768px) and (max-width: 1800px)", fetchPriority: "high" },
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroLarge, media: "(min-width: 1801px)", fetchPriority: "high" },
      ],
    };
  },
  component: Home,
});

type Img = { src: string; alt: string; thumb?: string; tile?: string; pos?: string };
type Card = { label: string; text?: string; cta?: string; to: LinkProps["to"]; img: Img };
type Service = { id: string; eyebrow: string; tagline: string; title: string; text: string; feature?: Img; cards: Card[]; hub: { label: string; to: LinkProps["to"] } };

const IMG = {
  jerusalem: { src: jerusalem, thumb: jerusalemCard, tile: jerusalemTile, alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives" },
  telAviv: { src: telAviv, thumb: telAvivCard, tile: telAvivTile, alt: "Tel Aviv's beachfront skyline seen from Jaffa" },
  tiberias: { src: tiberias, thumb: tiberiasCard, tile: tiberiasTile, alt: "Tiberias on the shore of the Sea of Galilee, seen from the water" },
  deadSea: { src: deadSeaBeach, thumb: deadSeaBeachCard, tile: deadSeaTile, alt: "Ein Bokek's beach and palm-lined promenade beside the Dead Sea" },
  haifa: { src: haifaHotels, thumb: haifaHotelsCard, tile: haifaTile, alt: "Haifa Bay and the Bahá'í Gardens seen from Mount Carmel" },
  bethlehem: { src: bethlehem, thumb: bethlehemCard, tile: bethlehemTile, alt: "Church of the Nativity on Manger Square, Bethlehem" },
  masada: { src: masada, thumb: masadaCard, tile: masadaTile, alt: "Masada plateau from the air with the Dead Sea behind" },
  caesarea: { src: caesareaAqueduct, thumb: caesareaAqueductCard, tile: caesareaTile, alt: "Roman aqueduct along the beach at Caesarea" },
} satisfies Record<string, Img>;

export const accommodationDestinationCards: Card[] = [
  { label: "Jerusalem", text: "Old City, city centre & boutique hotels", to: "/travel-blog/where-to-stay-in-jerusalem/", img: { src: "/images/home/accommodation-jerusalem-ai.webp", thumb: "/images/home/accommodation-jerusalem-ai-tile.webp", alt: "AI-generated illustration of Jerusalem's Old City walls and skyline" } },
  { label: "Tel Aviv & Jaffa", text: "Beachfront, Jaffa & city hotels", to: "/travel-blog/where-to-stay-in-tel-aviv/", img: { src: "/images/home/accommodation-tel-aviv-jaffa-ai.webp", thumb: "/images/home/accommodation-tel-aviv-jaffa-ai-tile.webp", alt: "AI-generated illustration of Old Jaffa and the Tel Aviv coast" } },
  { label: "Tiberias & Galilee", text: "Lakeside, luxury & family hotels", to: "/travel-blog/best-hotels-in-tiberias/", img: { src: "/images/home/accommodation-tiberias-galilee-ai.webp", thumb: "/images/home/accommodation-tiberias-galilee-ai-tile.webp", alt: "AI-generated illustration of the Tiberias waterfront beside the Sea of Galilee" } },
  { label: "Dead Sea", text: "Spa retreats & beachfront resorts", to: "/travel-blog/best-dead-sea-hotels/", img: { src: "/images/home/accommodation-dead-sea-ai.webp", thumb: "/images/home/accommodation-dead-sea-ai-tile.webp", alt: "AI-generated illustration of Dead Sea resort hotels, salt shore and desert mountains" } },
  { label: "Haifa", text: "Carmel views, boutique & family hotels", to: "/travel-blog/best-hotels-in-haifa/", img: { src: "/images/home/accommodation-haifa-ai.webp", thumb: "/images/home/accommodation-haifa-ai-tile.webp", alt: "AI-generated illustration of Haifa's Bahá'í Gardens and Mediterranean bay" } },
];

export const services: Service[] = [
  {
    id: "transfers", eyebrow: "Airport Transfers", tagline: "Plan a Smooth Arrival in Israel", title: "Airport Transfers",
    text: "Start your visit to Israel with a smooth, comfortable arrival. Arrange a private transfer from Ben Gurion Airport to Jerusalem, Tel Aviv, Haifa, or any other destination across the country.",
    feature: { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "Licensed Israeli taxis on a street in Tel Aviv" },
    cards: [
      { label: "Private Transfer to Jerusalem", text: "Book a private pickup to your Jerusalem hotel", to: "/airport-transfers/ben-gurion-airport-to-jerusalem/", img: IMG.jerusalem },
      { label: "Private Transfer to Tel Aviv", text: "Airport pickup for Tel Aviv hotels and Jaffa", to: "/airport-transfers/ben-gurion-airport-to-tel-aviv/", img: IMG.telAviv },
      { label: "Private Transfer to Haifa", text: "Door-to-door travel to Haifa and Mount Carmel", to: "/airport-transfers/ben-gurion-airport-to-haifa/", img: IMG.haifa },
    ],
    hub: { label: "Explore airport transfers", to: "/airport-transfers/" },
  },
  {
    id: "tours", eyebrow: "Tours & Day Trips", tagline: "See the Best of Israel in a Day", title: "Tours & Day Trips",
    text: "Explore Israel’s top destinations with guided tours and day trips, and find the experiences that best match your interests and travel style.",
    feature: { src: guidedTour, alt: "Illustrative small group on a guided walk through old stone streets" },
    cards: [
      { label: "Jerusalem", to: tourCategoryPaths.jerusalem, img: { src: "/images/attractions/jerusalem.webp", alt: "Jerusalem’s Old City and the Dome of the Rock" } },
      { label: "Tel Aviv & Jaffa", to: tourCategoryPaths["tel-aviv-jaffa"], img: { src: "/images/attractions/tel-aviv-jaffa.webp", alt: "Fishing boats and old stone buildings around Jaffa harbour" } },
      { label: "Masada & Dead Sea", to: tourCategoryPaths["masada-dead-sea"], img: { src: "/images/tours/masada-ruins.webp", alt: "Ancient stone ruins on the Masada plateau" } },
      { label: "Bethlehem & Jericho", to: tourCategoryPaths["bethlehem-jericho"], img: { src: bethlehemTourPhoto, alt: "Church of the Nativity and Manger Square in Bethlehem" } },
      { label: "Nazareth & Galilee", to: tourCategoryPaths["nazareth-galilee"], img: { src: "/images/attractions/sea-of-galilee.webp", alt: "The Sea of Galilee and green hills overlooking the lake" } },
      { label: "Caesarea, Haifa & Acre", to: tourCategoryPaths["northern-coast"], img: { src: "/images/attractions/haifa-coast.webp", alt: "Haifa’s cityscape and Mediterranean coastline" } },
    ],
    hub: { label: "Explore tours & day trips", to: "/tours/" },
  },
  {
    id: "shore-excursions", eyebrow: "Shore Excursions", tagline: "Make the Most of Your Time Ashore", title: "Shore Excursions",
    text: "Make the most of your time ashore with excursions from Israel’s cruise ports, from historic landmarks and cultural highlights to unforgettable day trips.",
    feature: { src: cruisePort, alt: "Illustrative cruise passengers walking along a harbour quay toward a waiting minivan (not a specific ship or operator)" },
    cards: [
      { label: "From Ashdod Port", text: "Explore Jerusalem, Tel Aviv–Jaffa, Masada or the Dead Sea from Ashdod.", cta: "Explore Ashdod excursions", to: "/ashdod-shore-excursions/", img: { src: ashdodPort, alt: "Aerial view of Ashdod Port" } },
      { label: "From Haifa Port", text: "Discover Akko, Nazareth and the Galilee, or visit Jerusalem from Haifa.", cta: "Explore Haifa excursions", to: "/haifa-shore-excursions/", img: { src: haifaPort, alt: "Haifa Port and Haifa Bay seen from Mount Carmel" } },
    ],
    hub: { label: "Explore shore excursions", to: "/shore-excursions/" },
  },
  {
    id: "accommodation", eyebrow: "Accommodation", tagline: "Find Your Perfect Base", title: "Where to Stay in Israel",
    text: "Choose a base that suits your trip, from historic Jerusalem and Tel Aviv's beachfront to lakeside Galilee hotels and Dead Sea resorts.",
    cards: accommodationDestinationCards,
    hub: { label: "Explore all accommodation", to: "/accommodation/" },
  },
  {
    id: "attractions", eyebrow: "Attractions & Experiences", tagline: "Discover Israel’s Must-See Places", title: "Attractions & Experiences",
    text: "Discover Israel’s most memorable attractions, from ancient landmarks and historic cities to breathtaking natural wonders.",
    feature: { src: caesareaDusk, alt: "Ancient ruins on the shore at Caesarea at dusk" },
    cards: [
      { label: "Rosh Hanikra", to: "/travel-blog/rosh-hanikra/", img: { src: roshHanikraPhoto, alt: "Sea grottoes and white limestone cliffs at Rosh Hanikra" } },
      { label: "Ramon Crater", to: "/travel-blog/mitzpe-ramon-crater/", img: { src: ramonCraterPhoto, alt: "Layered desert landscape of Ramon Crater" } },
      { label: "Capernaum", to: "/travel-blog/capernaum/", img: { src: capernaumPhoto, alt: "Ancient ruins at Capernaum beside the Sea of Galilee" } },
      { label: "Mount Tabor", to: "/travel-blog/mount-tabor/", img: { src: mountTaborPhoto, alt: "Mount Tabor rising above the Lower Galilee" } },
      { label: "Mount of Olives", to: "/travel-blog/mount-of-olives/", img: { src: "/images/attractions/mount-of-olives.webp", alt: "Churches and historic sites on the Mount of Olives in Jerusalem" } },
      { label: "Eilat", to: "/travel-blog/eilat/", img: { src: "/images/attractions/eilat.webp", alt: "The Red Sea shoreline at Eilat" } },
    ],
    hub: { label: "Explore attractions & experiences", to: "/attractions/" },
  },

];



export const homeGuideCards = {
  first: guideDirectory.filter((guide) => ["uber", "esim", "arrival"].includes(guide.id)).map((guide) =>
    guide.id === "uber" ? { ...guide, photo: { src: airportTransportPhoto, alt: "Ben Gurion Airport transport area" } } : guide),
  second: guideDirectory.filter((guide) => ["israel", "travelTips", "airport-journey-jerusalem"].includes(guide.id)).map((guide) =>
    guide.id === "travelTips" ? { ...guide, photo: { src: "/images/attractions/ramon-crater.webp", alt: "Landscape of Ramon Crater in Israel" } } : guide),
};

function PhotoCard({ c }: { c: Card }) {
  return (
    <Link to={c.to} className="photo-card group relative block overflow-hidden rounded-xl bg-navy shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
      {/* Use the original 3:2 landscape artwork instead of portrait-cropped desktop tiles. */}
      <img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={720} height={480} className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105 xl:aspect-[6/5]" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden />
      <span className="absolute inset-x-0 bottom-0 p-4 text-navy-foreground">
        <span className="block font-serif text-lg leading-tight">{c.label}</span>
      </span>
    </Link>
  );
}

function CompactCard({ c }: { c: Card }) {
  return (
    <li className="min-w-0">
      <Link to={c.to} className="photo-card group grid w-full min-w-0 grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-xl border bg-background p-2.5 pr-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[112px_minmax(0,1fr)]">
        <span className="block overflow-hidden rounded-lg">
          <img src={c.img.thumb ?? c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={224} height={160} className="aspect-[7/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight group-hover:text-primary">{c.label}</h3>
          {c.text && <span className="mt-0.5 block text-sm text-muted-foreground">{c.text} <span aria-hidden>→</span></span>}
        </div>
      </Link>
    </li>
  );
}

/** Compact destination tile shared by the homepage tours and attractions sections. */
function DestinationImageCard({ c }: { c: Card }) {
  return (
    <Link to={c.to} aria-label={c.label} className="group relative block min-w-0 overflow-hidden rounded-lg bg-navy shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
      <img src={c.img.thumb ?? c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={400} height={300} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" aria-hidden="true" />
      <span className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-6 font-serif text-sm font-semibold leading-tight text-navy-foreground sm:px-3 sm:pb-3 sm:text-base">{c.label}</span>
    </Link>
  );
}

/** Landscape port cards fill two short, equal-height rows beside the ship photograph. */
function ShoreExcursionCard({ c }: { c: Card }) {
  return (
    <li className="min-h-0">
      <Link to={c.to} className="photo-card group grid h-full min-w-0 grid-cols-1 overflow-hidden rounded-xl border bg-background transition-colors min-[480px]:grid-cols-[43%_minmax(0,1fr)] hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
        <span className="relative block aspect-[16/9] overflow-hidden min-[480px]:aspect-auto">
          <img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={600} height={420} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="flex min-w-0 flex-col gap-1 p-3">
          <span className="font-serif text-base font-semibold leading-tight text-foreground sm:text-lg">{c.label}</span>
          <span className="line-clamp-2 text-sm leading-snug text-muted-foreground">{c.text}</span>
          <span className="mt-auto pt-0.5 text-xs font-semibold text-primary underline-offset-4 group-hover:underline group-focus-visible:underline sm:text-sm">{c.cta}</span>
        </span>
      </Link>
    </li>
  );
}

function Home() {
  return (
    <div>
      <div className="mx-auto mt-8 max-w-6xl space-y-8 px-4">
        {services.slice(0, 1).map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`scroll-mt-6 rounded-2xl border p-5 md:p-8 ${i % 2 ? "bg-accent/40" : "bg-card"}`}>
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch" data-testid={`service-layout-${s.id}`}>
              {s.feature && <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/10] h-full min-h-64 w-full min-w-0 rounded-xl object-cover lg:max-h-[410px]" />}
              <ul className="grid min-w-0 grid-cols-1 content-start gap-3" aria-label={`${s.eyebrow} choices`}>
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
      <div className="mx-auto mt-14 max-w-6xl space-y-8 px-4">
        {services.slice(1).map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`home-offscreen scroll-mt-6 rounded-2xl border p-5 md:p-8 ${(i + 1) % 2 ? "bg-accent/40" : "bg-card"}`}>
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            {s.id === "tours" || s.id === "attractions" ? (
              <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch" data-testid={`service-layout-${s.id}`}>
                {s.feature && <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={900} height={560} className="aspect-[16/9] max-h-[320px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none" />}
                <ul className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3" aria-label={s.id === "tours" ? "Tour destinations" : "Featured attractions"}>
                  {s.cards.map((card) => <li key={card.label} className="min-w-0"><DestinationImageCard c={card} /></li>)}
                </ul>
              </div>
            ) : s.id === "shore-excursions" ? (
              <div className="mt-6 grid min-w-0 gap-4 lg:h-[280px] lg:grid-cols-2 lg:items-stretch" data-testid={`service-layout-${s.id}`}>
                {s.feature && <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/9] max-h-[250px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none" />}
                <ul className="grid min-w-0 gap-3 lg:h-full lg:grid-rows-2" aria-label="Shore excursions by port">
                  {s.cards.map((card) => <ShoreExcursionCard key={card.label} c={card} />)}
                </ul>
              </div>
            ) : s.id === "accommodation" ? (
              <div>
                <ul
                className="mt-6 grid min-w-0 grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                data-testid={`service-layout-${s.id}`}
                aria-label="Where to stay in Israel"
              >
                {s.cards.map((card) => (
                  <li key={card.label} className="min-w-0"><PhotoCard c={card} /></li>
                ))}
                </ul>
              </div>
            ) : (
              <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch" data-testid={`service-layout-${s.id}`}>
                {s.feature && <img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/10] h-full min-h-64 w-full min-w-0 rounded-xl object-cover lg:max-h-[410px]" />}
                <ul className="grid min-w-0 grid-cols-1 content-start gap-3" aria-label={`${s.eyebrow} choices`}>
                  {s.cards.slice(0, 3).map((c) => <CompactCard key={c.label} c={c} />)}
                </ul>
                {s.cards.length > 3 && (
                  <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2" aria-label={`More ${s.eyebrow.toLowerCase()} choices`} data-testid={`service-more-${s.id}`}>
                    {s.cards.slice(3).map((c) => <CompactCard key={c.label} c={c} />)}
                  </ul>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-center">
              <Link to={s.hub.to} className="btn btn-primary">{s.hub.label} →</Link>
            </div>
          </section>
        ))}
      </div>

      <div className="home-offscreen home-offscreen-tripadvisor"><TripadvisorReviewsSection /></div>
      <section id="guides" aria-labelledby="guides-h" className="home-offscreen mx-auto mt-12 max-w-6xl scroll-mt-6 px-4">
        <div><p className="eyebrow">Before You Travel</p><h2 id="guides-h" className="mt-2 text-3xl">Practical Israel Travel Guides</h2><p className="mt-3 max-w-2xl text-muted-foreground">Plan your trip with practical local advice on transportation, travel essentials and exploring Israel with confidence.</p></div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-testid="guide-row-one">{homeGuideCards.first.map((guide) => <GuideCard key={guide.id} guide={guide} headingLevel={3} />)}</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-testid="guide-row-two">{homeGuideCards.second.map((guide) => <GuideCard key={guide.id} guide={guide} headingLevel={3} />)}</div>
        <div className="mt-7 flex justify-center"><Link to="/travel-blog/" className="btn btn-primary">Browse all guides →</Link></div>
      </section>
      <div className="home-offscreen home-offscreen-reviews"><PersonalTestimonialsSection /></div>
      <div className="home-offscreen mx-auto mt-10 max-w-6xl px-4"><AuthorCard introduction /></div>
      <div className="home-offscreen mx-auto mt-14 max-w-6xl px-4"><HomeContactForm /></div>
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
