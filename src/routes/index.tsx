import { PhotoCreditsDisclosure } from "@/components/PhotoCreditsDisclosure";
import { eilatSite } from "@/data/eilatSite";
import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import benGurionApronPhoto from "@/assets/airport-transfers/airport.webp";
import benGurionApronPhotoMobile from "@/assets/airport-transfers/airport-mobile.webp";
import timnaParkFeature from "@/assets/home/timna-park-feature-optimized.webp";
import guidedTour from "@/assets/home/guided-tour-feature.webp";
import guidedTourMobile from "@/assets/home/guided-tour-feature-mobile.webp";
import cruisePort from "@/assets/home/cruise-port-feature.webp";
import ashdodPort from "@/assets/shore-excursions/ashdod-shore-excursions.webp";
import haifaPort from "@/assets/shore-excursions/haifa-shore-excursions.webp";
import { tourCategoryPaths } from "@/data/tours";
import bethlehemTourPhoto from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";
import bethlehemTourPhotoMobile from "@/assets/guides/2026-10/jerusalem-to-bethlehem-mobile.webp";
import roshHanikraPhoto from "@/assets/guides/rosh-hanikra.jpg";
import ramonCraterPhoto from "@/assets/guides/mitzpe-ramon-crater.jpg";
import capernaumPhoto from "@/assets/guides/capernaum.jpg";
import mountTaborPhoto from "@/assets/guides/mount-tabor.jpg";
import { photoCredits } from "@/data/photoCredits";
import { GuideCard } from "@/components/GuideCard";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

import { guideDirectory } from "@/data/generated/guide-directory";
import { isPublisherUrl } from "@/data/site-identity";
import { AuthorCard } from "@/components/AuthorCard";
import {
  TripadvisorReviewsSection,
  PersonalTestimonialsSection,
} from "@/components/HomeTestimonials";
import { HomeContactForm } from "@/components/HomeContactForm";

export const Route = createFileRoute("/")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/index.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: Home,
});

type Img = {
  src: string;
  alt: string;
  thumb?: string;
  tile?: string;
  mobile?: string;
  pos?: string;
};
type Card = { label: string; text?: string; cta?: string; to: LinkProps["to"]; img: Img };
type Service = {
  id: string;
  eyebrow: string;
  tagline: string;
  title: string;
  text: string;
  feature?: Img;
  cards: Card[];
  hub: { label: string; to: LinkProps["to"] };
};

export const accommodationDestinationCards: Card[] = [
  {
    label: "Jerusalem",
    text: "Old City, city center & boutique hotels",
    to: "/accommodation/jerusalem/",
    img: {
      src: "/images/home/accommodation-jerusalem-ai.webp",
      thumb: "/images/home/accommodation-jerusalem-ai-tile.webp",
      alt: "AI-generated illustration of Jerusalem's Old City walls and skyline",
    },
  },
  {
    label: "Tel Aviv & Jaffa",
    text: "Beachfront, Jaffa & city hotels",
    to: "/accommodation/tel-aviv/",
    img: {
      src: "/images/home/accommodation-tel-aviv-jaffa-ai.webp",
      thumb: "/images/home/accommodation-tel-aviv-jaffa-ai-tile.webp",
      alt: "AI-generated illustration of Old Jaffa and the Tel Aviv coast",
    },
  },
  {
    label: "Tiberias & Galilee",
    text: "Lakeside, luxury & family hotels",
    to: "/accommodation/tiberias/",
    img: {
      src: "/images/home/accommodation-tiberias-galilee-ai.webp",
      thumb: "/images/home/accommodation-tiberias-galilee-ai-tile.webp",
      alt: "AI-generated illustration of the Tiberias waterfront beside the Sea of Galilee",
    },
  },
  {
    label: "Dead Sea",
    text: "Spa retreats & beachfront resorts",
    to: "/accommodation/dead-sea/",
    img: {
      src: "/images/home/accommodation-dead-sea-ai.webp",
      thumb: "/images/home/accommodation-dead-sea-ai-tile.webp",
      alt: "AI-generated illustration of Dead Sea resort hotels, salt shore and desert mountains",
    },
  },
  {
    label: "Haifa",
    text: "Carmel views, boutique & family hotels",
    to: "/accommodation/haifa/",
    img: {
      src: "/images/home/accommodation-haifa-ai.webp",
      thumb: "/images/home/accommodation-haifa-ai-tile.webp",
      alt: "AI-generated illustration of Haifa's Bahá'í Gardens and Mediterranean bay",
    },
  },
];

export const services: Service[] = [
  {
    id: "transfers",
    eyebrow: "Airport Transfers",
    tagline: "Plan a Smooth Arrival in Israel",
    title: "Airport Transfers",
    text: "Arrange a private transfer from Ben Gurion Airport to Jerusalem, Tel Aviv, Haifa or any other destination in Israel.",
    feature: {
      src: benGurionApronPhoto,
      mobile: benGurionApronPhotoMobile,
      alt: "Parked aircraft at Ben Gurion Airport with the terminal sign reading BEN GURION AIRPORT",
    },
    cards: [
      {
        label: "To Jerusalem",
        to: "/airport-transfers/jerusalem/",
        img: {
          src: "/images/home/transfer-jerusalem-tower-of-david.webp",
          mobile: "/images/home/transfer-jerusalem-tower-of-david-mobile.webp",
          alt: "Tower of David citadel beside Jerusalem’s Old City",
        },
      },
      {
        label: "To Tel Aviv",
        to: "/airport-transfers/tel-aviv/",
        img: {
          src: "/images/home/transfer-tel-aviv-beach-skyline.webp",
          mobile: "/images/home/transfer-tel-aviv-beach-skyline-mobile.webp",
          alt: "Tel Aviv Mediterranean beach and modern skyline",
        },
      },
      {
        label: "To Haifa",
        to: "/airport-transfers/haifa/",
        img: {
          src: "/images/home/transfer-haifa-bahai-gardens.webp",
          mobile: "/images/home/transfer-haifa-bahai-gardens-mobile.webp",
          alt: "Bahá’í Gardens staircase and Shrine in Haifa",
        },
      },
      {
        label: "To Ein Bokek",
        to: "/airport-transfers/ein-bokek/",
        img: {
          src: "/images/home/transfer-ein-bokek-aerial.webp",
          mobile: "/images/home/transfer-ein-bokek-aerial-mobile.webp",
          alt: "Aerial view of Ein Bokek Dead Sea resort area and turquoise water",
        },
      },
    ],
    hub: { label: "Explore all airport transfers", to: "/airport-transfers/" },
  },
  {
    id: "tours",
    eyebrow: "Tours & Day Trips",
    tagline: "See the Best of Israel in a Day",
    title: "Tours & Day Trips",
    text: "Find guided tours and day trips to Israel’s historic cities, religious sites, coast and desert.",
    feature: {
      src: guidedTour,
      mobile: guidedTourMobile,
      alt: "Illustrative small group on a guided walk through old stone streets",
    },
    cards: [
      {
        label: "Jerusalem",
        to: tourCategoryPaths.jerusalem,
        img: {
          src: "/images/attractions/jerusalem.webp",
          mobile: "/images/attractions/jerusalem-mobile.webp",
          alt: "Jerusalem’s Old City and the Dome of the Rock",
        },
      },
      {
        label: "Tel Aviv & Jaffa",
        to: tourCategoryPaths["tel-aviv-jaffa"],
        img: {
          src: "/images/attractions/tel-aviv-jaffa.webp",
          mobile: "/images/attractions/tel-aviv-jaffa-mobile.webp",
          alt: "Fishing boats and old stone buildings around Jaffa harbour",
        },
      },
      {
        label: "Masada & Dead Sea",
        to: tourCategoryPaths["masada-dead-sea"],
        img: {
          src: "/images/tours/masada-ruins.webp",
          mobile: "/images/tours/masada-ruins-mobile.webp",
          alt: "Ancient stone ruins on the Masada plateau",
        },
      },
      {
        label: "Bethlehem & Jericho",
        to: tourCategoryPaths["bethlehem-jericho"],
        img: {
          src: bethlehemTourPhoto,
          mobile: bethlehemTourPhotoMobile,
          alt: "Church of the Nativity and Manger Square in Bethlehem",
        },
      },
      {
        label: "Nazareth & Galilee",
        to: tourCategoryPaths["nazareth-galilee"],
        img: {
          src: "/images/attractions/sea-of-galilee.webp",
          mobile: "/images/attractions/sea-of-galilee-mobile.webp",
          alt: "The Sea of Galilee and green hills overlooking the lake",
        },
      },
      {
        label: "Caesarea, Haifa & Acre",
        to: tourCategoryPaths["northern-coast"],
        img: {
          src: "/images/attractions/haifa-coast.webp",
          mobile: "/images/attractions/haifa-coast-mobile.webp",
          alt: "Haifa’s cityscape and Mediterranean coastline",
        },
      },
    ],
    hub: { label: "Explore all tours & day trips", to: "/tours/" },
  },
  {
    id: "shore-excursions",
    eyebrow: "Shore Excursions",
    tagline: "Make the Most of Your Time Ashore",
    title: "Shore Excursions",
    text: "Find excursions from Ashdod and Haifa, and choose the sights you want to visit during your time in port.",
    feature: {
      src: cruisePort,
      alt: "Illustration of cruise passengers walking along a quay toward a minivan",
    },
    cards: [
      {
        label: "From Ashdod Port",
        text: "Explore Jerusalem, Tel Aviv–Jaffa, Masada or the Dead Sea from Ashdod.",
        cta: "Explore Ashdod excursions",
        to: "/shore-excursions/ashdod/",
        img: { src: ashdodPort, alt: "Cruise ships alongside the quays at Ashdod Port" },
      },
      {
        label: "From Haifa Port",
        text: "Discover Akko, Nazareth and the Galilee, or visit Jerusalem from Haifa.",
        cta: "Explore Haifa excursions",
        to: "/shore-excursions/haifa/",
        img: { src: haifaPort, alt: "Cruise ship at Haifa Port with the city skyline at dusk" },
      },
    ],
    hub: { label: "Explore all shore excursions", to: "/shore-excursions/" },
  },
  {
    id: "accommodation",
    eyebrow: "Accommodation",
    tagline: "Find Your Perfect Base",
    title: "Where to Stay in Israel",
    text: "Choose a base that suits your trip, from historic Jerusalem and Tel Aviv's beachfront to lakeside Galilee hotels and Dead Sea resorts.",
    cards: accommodationDestinationCards,
    hub: { label: "Explore all accommodation", to: "/accommodation/" },
  },
  {
    id: "attractions",
    eyebrow: "Attractions & Experiences",
    tagline: "Discover Israel’s Must-See Places",
    title: "Attractions & Experiences",
    text: "Explore ancient sites, historic cities, beaches and natural wonders across Israel.",
    feature: {
      src: timnaParkFeature,
      alt: "Sandstone rock formations and desert landscape at Timna Park near Eilat",
    },
    cards: [
      {
        label: "Rosh Hanikra",
        to: "/attractions/rosh-hanikra/",
        img: {
          src: roshHanikraPhoto,
          alt: "Sea grottoes and white limestone cliffs at Rosh Hanikra",
        },
      },
      {
        label: "Ramon Crater",
        to: "/attractions/mitzpe-ramon-crater/",
        img: { src: ramonCraterPhoto, alt: "Layered desert landscape of Ramon Crater" },
      },
      {
        label: "Capernaum",
        to: "/attractions/capernaum/",
        img: { src: capernaumPhoto, alt: "Ancient ruins at Capernaum beside the Sea of Galilee" },
      },
      {
        label: "Mount Tabor",
        to: "/attractions/mount-tabor/",
        img: { src: mountTaborPhoto, alt: "Mount Tabor rising above the Lower Galilee" },
      },
      {
        label: "Mount of Olives",
        to: "/attractions/mount-of-olives/",
        img: {
          src: "/images/attractions/mount-of-olives.webp",
          alt: "Churches and historic sites on the Mount of Olives in Jerusalem",
        },
      },
      { label: "Eilat", to: "/attractions/eilat/", img: eilatSite.hero },
    ],
    hub: { label: "Explore all attractions & experiences", to: "/attractions/" },
  },
];

export const homeGuideCards = {
  first: guideDirectory.filter((guide) => ["uber", "esim", "arrival"].includes(guide.id)),
  second: guideDirectory.filter((guide) =>
    ["israel", "travelTips", "airport-journey-jerusalem"].includes(guide.id),
  ),
};

const photoTitleShadow = "0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.75)";

function PhotoCard({ c }: { c: Card }) {
  return (
    <Link
      to={c.to}
      className="photo-card group relative block overflow-hidden rounded-xl bg-primary shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      {/* Use the original 3:2 landscape artwork instead of portrait-cropped desktop tiles. */}
      <img
        src={guideHeroPhotoForPath(String(c.to))?.src ?? c.img.src}
        alt={guideHeroPhotoForPath(String(c.to))?.alt ?? c.img.alt}
        loading="lazy"
        decoding="async"
        width={720}
        height={480}
        className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105 xl:aspect-[6/5]"
      />
      <span
        className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] font-serif text-base font-semibold leading-tight text-white sm:bottom-3 sm:left-3 sm:text-lg"
        style={{ textShadow: photoTitleShadow }}
      >
        {c.label}
      </span>
    </Link>
  );
}

function CompactCard({ c }: { c: Card }) {
  return (
    <li className="min-w-0">
      <Link
        to={c.to}
        className="photo-card group grid w-full min-w-0 grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-xl border bg-background p-2.5 pr-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[112px_minmax(0,1fr)]"
      >
        <span className="block overflow-hidden rounded-lg">
          <img
            src={guideHeroPhotoForPath(String(c.to))?.src ?? c.img.thumb ?? c.img.src}
            alt={guideHeroPhotoForPath(String(c.to))?.alt ?? c.img.alt}
            loading="lazy"
            decoding="async"
            width={224}
            height={160}
            className="aspect-[7/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight group-hover:text-primary">{c.label}</h3>
          {c.text && (
            <span className="mt-0.5 block text-sm text-muted-foreground">
              {c.text} <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

/** Large-photo route tiles in a two-row grid matching the compact shore-excursion layout. */
function AirportTransferCard({ c }: { c: Card }) {
  return (
    <li className="min-h-0">
      <Link
        to={c.to}
        className="group relative block aspect-[16/9] min-w-0 overflow-hidden rounded-lg bg-primary shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring lg:aspect-auto lg:h-full"
      >
        <picture className="absolute inset-0 block">
          {!guideHeroPhotoForPath(String(c.to)) && c.img.mobile && (
            <source media="(max-width: 767px)" srcSet={c.img.mobile} type="image/webp" />
          )}
          <img
            src={guideHeroPhotoForPath(String(c.to))?.src ?? c.img.src}
            alt={guideHeroPhotoForPath(String(c.to))?.alt ?? c.img.alt}
            loading="lazy"
            decoding="async"
            width={720}
            height={480}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </picture>
        <span
          className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] font-serif text-sm font-semibold leading-tight text-white sm:bottom-3 sm:left-3 sm:text-base"
          style={{ textShadow: photoTitleShadow }}
        >
          {c.label}
        </span>
      </Link>
    </li>
  );
}

/** Compact destination tile shared by the homepage tours and attractions sections. */
function DestinationImageCard({ c }: { c: Card }) {
  return (
    <Link
      to={c.to}
      className="group relative block min-w-0 overflow-hidden rounded-lg bg-primary shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      <picture className="block">
        {!guideHeroPhotoForPath(String(c.to)) && c.img.mobile && (
          <source media="(max-width: 767px)" srcSet={c.img.mobile} type="image/webp" />
        )}
        <img
          src={guideHeroPhotoForPath(String(c.to))?.src ?? c.img.thumb ?? c.img.src}
          alt={guideHeroPhotoForPath(String(c.to))?.alt ?? c.img.alt}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </picture>
      <span
        className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] font-serif text-sm font-semibold leading-tight text-white sm:bottom-3 sm:left-3 sm:text-base"
        style={{ textShadow: photoTitleShadow }}
      >
        {c.label}
      </span>
    </Link>
  );
}

/** Landscape port cards fill two short, equal-height rows beside the ship photograph. */
function ShoreExcursionCard({ c }: { c: Card }) {
  return (
    <li className="min-h-0">
      <Link
        to={c.to}
        className="editorial-card-link photo-card group grid h-full min-w-0 grid-cols-1 overflow-hidden rounded-xl border bg-background transition-colors min-[480px]:grid-cols-[43%_minmax(0,1fr)] hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        <span className="relative block aspect-[16/9] overflow-hidden min-[480px]:aspect-auto">
          <img
            src={c.img.src}
            alt={c.img.alt}
            loading="lazy"
            decoding="async"
            width={600}
            height={420}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        <span className="flex min-w-0 flex-col gap-1 p-3">
          <span className="font-serif text-base font-semibold leading-tight text-foreground sm:text-lg">
            {c.label}
          </span>
          <span className="line-clamp-2 text-sm leading-snug text-muted-foreground">{c.text}</span>
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
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className={`scroll-mt-6 rounded-2xl border p-5 md:p-8 ${i % 2 ? "bg-accent/40" : "bg-card"}`}
          >
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            <div
              className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:min-h-[280px] lg:grid-cols-2 lg:items-stretch"
              data-testid={`service-layout-${s.id}`}
            >
              {s.feature && (
                <picture className="block h-full min-w-0">
                  {s.feature.mobile && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={s.feature.mobile}
                      type="image/webp"
                    />
                  )}
                  <img
                    src={s.feature.src}
                    alt={s.feature.alt}
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={880}
                    className="aspect-[16/9] max-h-[260px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none"
                  />
                </picture>
              )}
              <ul
                className="grid min-w-0 grid-cols-2 auto-rows-fr gap-3"
                aria-label="Airport transfer destinations"
              >
                {s.cards.map((c) => (
                  <AirportTransferCard key={c.label} c={c} />
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-center">
              <Link to={s.hub.to} className="btn btn-primary">
                {s.hub.label}
              </Link>
            </div>
          </section>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-6xl space-y-8 px-4">
        {services.slice(1).map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className={`home-offscreen scroll-mt-6 rounded-2xl border p-5 md:p-8 ${(i + 1) % 2 ? "bg-accent/40" : "bg-card"}`}
          >
            <header className="border-b pb-5">
              <div className="min-w-0">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{s.text}</p>
              </div>
            </header>
            {s.id === "tours" || s.id === "attractions" ? (
              <div
                className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch"
                data-testid={`service-layout-${s.id}`}
              >
                {s.feature && (
                  <picture className="block h-full min-w-0">
                    {s.feature.mobile && (
                      <source
                        media="(max-width: 767px)"
                        srcSet={s.feature.mobile}
                        type="image/webp"
                      />
                    )}
                    <img
                      src={s.feature.src}
                      alt={s.feature.alt}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={560}
                      className="aspect-[16/9] max-h-[320px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none"
                    />
                  </picture>
                )}
                <ul
                  className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3"
                  aria-label={s.id === "tours" ? "Tour destinations" : "Featured attractions"}
                >
                  {s.cards.map((card) => (
                    <li key={card.label} className="min-w-0">
                      <DestinationImageCard c={card} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : s.id === "shore-excursions" ? (
              <div
                className="mt-6 grid min-w-0 gap-4 lg:min-h-[280px] lg:grid-cols-2 lg:items-stretch"
                data-testid={`service-layout-${s.id}`}
              >
                {s.feature && (
                  <img
                    src={s.feature.src}
                    alt={s.feature.alt}
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={880}
                    className="aspect-[16/9] max-h-[250px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none"
                  />
                )}
                <ul
                  className="grid min-w-0 auto-rows-fr gap-3"
                  aria-label="Shore excursions by port"
                >
                  {s.cards.map((card) => (
                    <ShoreExcursionCard key={card.label} c={card} />
                  ))}
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
                    <li key={card.label} className="min-w-0">
                      <PhotoCard c={card} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch"
                data-testid={`service-layout-${s.id}`}
              >
                {s.feature && (
                  <img
                    src={s.feature.src}
                    alt={s.feature.alt}
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={880}
                    className="aspect-[16/10] h-full min-h-64 w-full min-w-0 rounded-xl object-cover lg:max-h-[410px]"
                  />
                )}
                <ul
                  className="grid min-w-0 grid-cols-1 content-start gap-3"
                  aria-label={`${s.eyebrow} choices`}
                >
                  {s.cards.slice(0, 3).map((c) => (
                    <CompactCard key={c.label} c={c} />
                  ))}
                </ul>
                {s.cards.length > 3 && (
                  <ul
                    className="grid gap-3 sm:grid-cols-2 lg:col-span-2"
                    aria-label={`More ${s.eyebrow.toLowerCase()} choices`}
                    data-testid={`service-more-${s.id}`}
                  >
                    {s.cards.slice(3).map((c) => (
                      <CompactCard key={c.label} c={c} />
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-center">
              <Link to={s.hub.to} className="btn btn-primary">
                {s.hub.label}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <div className="home-offscreen home-offscreen-tripadvisor">
        <TripadvisorReviewsSection />
      </div>
      <section
        id="guides"
        aria-labelledby="guides-h"
        className="home-offscreen mx-auto mt-12 max-w-6xl scroll-mt-6 px-4"
      >
        <div>
          <p className="eyebrow">Before You Travel</p>
          <h2 id="guides-h" className="mt-2 text-3xl">
            Practical Israel Travel Guides
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            My guides cover transport, sightseeing, accommodation and everyday travel essentials.
          </p>
        </div>
        <div
          className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          data-testid="home-guide-grid"
        >
          {[...homeGuideCards.first, ...homeGuideCards.second].map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              headingLevel={3}
              showReadMoreArrow={false}
              compactHomeLayout
            />
          ))}
        </div>
        <div className="mt-7 flex justify-center">
          <Link to="/travel-blog/" className="btn btn-primary">
            Browse all guides
          </Link>
        </div>
      </section>
      <div className="home-offscreen home-offscreen-reviews">
        <PersonalTestimonialsSection />
      </div>
      <div className="home-offscreen mx-auto mt-10 max-w-6xl px-4">
        <AuthorCard introduction />
      </div>
      <div className="home-offscreen mx-auto mt-14 max-w-6xl px-4">
        <HomeContactForm showPortrait={false} showTripadvisorReviews={false} />
      </div>
      <div className="mx-auto mb-10 mt-10 max-w-6xl px-4">
        <PhotoCreditsDisclosure
          entries={photoCredits
            .filter((credit) => !isPublisherUrl(credit.sourceUrl) && credit.asset !== "ashdod-port" && credit.asset !== "haifa-port")
            .map((credit) => ({
              label: credit.subject,
              credit: [credit.author, credit.license, credit.changes].filter(Boolean).join(" · "),
              sourceUrl: credit.sourceUrl,
              licenseUrl: credit.licenseUrl,
            }))}
        />
      </div>
    </div>
  );
}
