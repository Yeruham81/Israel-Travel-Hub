import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, CarFront, Check, MapPin, PlaneLanding, TrainFront } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { TravelpayoutsHotelWidget } from "@/components/TravelpayoutsHotelWidgets";
import { FaqList, HubHeader } from "@/components/Guide";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { accommodationDestinations } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { hotelHubFaqs, hotelStyles } from "@/data/hotelHub";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import hotelRoomPhoto from "@/assets/home/hotel-room-feature.webp";

const destinations = accommodationDestinations;

/** A small category cue, one destination title, and a useful one-line promise. */
const areaGuideCards = [
  {
    id: "jerusalem", eyebrow: "History & city walks", title: "Jerusalem",
    description: "Compare Downtown, Mamilla and the Old City, with practical hotel picks for sightseeing.",
    cta: "Compare neighborhoods", to: accommodationEditorial.jerusalem.path as NonNullable<LinkProps["to"]>,
  },
  {
    id: "telaviv", eyebrow: "Beach & city life", title: "Tel Aviv",
    description: "Choose between the beachfront, Jaffa and lively central neighborhoods, with hotel recommendations.",
    cta: "Explore the areas", to: accommodationEditorial.telaviv.path as NonNullable<LinkProps["to"]>,
  },
  {
    id: "haifa", eyebrow: "Coast & Carmel", title: "Haifa",
    description: "Weigh German Colony charm, Carmel views and beach access before choosing a hotel.",
    cta: "Find your ideal base", to: accommodationEditorial.haifa.path as NonNullable<LinkProps["to"]>,
  },
  {
    id: "tiberias", eyebrow: "Lakeside escapes", title: "Tiberias & the Galilee",
    description: "Compare waterfront and hillside stays, family facilities and convenient bases for exploring the lake.",
    cta: "Explore lakeside stays", to: accommodationEditorial.tiberias.path as NonNullable<LinkProps["to"]>,
  },
  {
    id: "deadsea", eyebrow: "Desert & wellness", title: "Dead Sea",
    description: "Understand Ein Bokek, nearby resorts and Ein Gedi, from beach access to spa facilities.",
    cta: "Compare resort areas", to: accommodationEditorial.deadsea.path as NonNullable<LinkProps["to"]>,
  },
  {
    id: "eilat", eyebrow: "Red Sea getaways", title: "Eilat",
    description: "Discover beachfront resorts, marina stays and quieter options along the Red Sea.",
    cta: "Coming soon", to: null,
  },
] as const;

const bookingTips = [
  { title: "Choose a practical location", text: "Check the walk to sights, restaurants and transport. Hills and steps matter in Jerusalem and Haifa." },
  { title: "Check the room details", text: "Enter all guests and children's ages, then confirm the beds, room size and lift access." },
  { title: "Compare the full price", text: "Check taxes, breakfast, parking, deposits and cancellation terms alongside the room rate." },
  { title: "Plan your arrival", text: "For Friday, Saturday or holiday arrivals, confirm check-in, meals and a way to reach the hotel." },
] as const;

const planningGuides = [
  { title: "Ben Gurion arrival tips", detail: "Your first steps after landing.", to: "/travel-blog/ben-gurion-airport-arrival-tips/" as const, icon: PlaneLanding },
  { title: "Airport transfers", detail: "Private rides to your hotel.", to: "/airport-transfers/" as const, icon: CarFront },
  { title: "Getting around Israel", detail: "Trains, buses and intercity journeys.", to: "/travel-blog/getting-around-israel/" as const, icon: TrainFront },
  { title: "Israel in seven days", detail: "Plan your overnight bases and day trips.", to: "/travel-blog/israel-itinerary-7-days/" as const, icon: MapPin },
  { title: "Holidays and special dates", detail: "Plan around closures, transport changes and busy travel periods.", to: "/travel-blog/calendar-of-events/" as const, icon: CalendarDays },
  { title: "Israel travel tips", detail: "Practical advice before your trip.", to: "/travel-blog/israel-travel-tips/" as const, icon: BookOpen },
] as const;

export const Route = createFileRoute("/accommodation/")({
  head: () => {
    const meta = pageMeta({
      title: "Hotels in Israel: where to stay by city, area and style",
      description: "Explore hotels in Jerusalem, Tel Aviv, Haifa, Tiberias and the Dead Sea, with neighborhood advice, hotel shortlists and practical booking tips.",
      path: "/accommodation/",
      image: hotelRoomPhoto,
      imageAlt: "A welcoming hotel guest room",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/accommodation/" }],
    });
    return {
      ...meta,
      scripts: [...meta.scripts, jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Hotels in Israel",
        description: "Browse hotels and places to stay in Israel by destination.",
        url: CANONICAL_ORIGIN + "/accommodation/",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: destinations.map((destination, i) => ({
            "@type": "ListItem", position: i + 1,
            ...(destination.id === "eilat"
              ? { name: "Hotels in Eilat — coming soon" }
              : { item: {
                  "@type": "WebPage",
                  name: destination.title,
                  url: CANONICAL_ORIGIN + ("to" in destination ? destination.to : "/accommodation/"),
                } }),
          })),
        },
      })],
    };
  },
  component: AccommodationHub,
});

function AccommodationHub() {
  return <main className="pb-12" data-testid="accommodation-hub">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }]}
      eyebrow="Accommodation"
      title="Hotels in Israel"
      intro="Find the right place to stay in Israel, from Jerusalem's historic neighborhoods and Tel Aviv's beaches to Haifa, the Sea of Galilee and the Dead Sea."
      image={<GuideHeroMedia src={hotelRoomPhoto} alt="A welcoming hotel guest room" compact />}
    />
    <div className="mx-auto max-w-5xl px-4">
      <section id="destinations" aria-labelledby="destinations-h" className="mt-9 scroll-mt-24">
        <h2 id="destinations-h" className="text-2xl font-semibold">Choose where to stay</h2>
        <ul className="mt-4 grid grid-cols-2 auto-rows-fr gap-2.5 sm:gap-4" aria-label="Hotel destinations in Israel">
          {destinations.map(destination => <li key={destination.id} className="min-w-0">
            <AccommodationCard destination={destination} comingSoon={destination.id === "eilat"} />
          </li>)}
        </ul>
      </section>

      <section id="styles" aria-labelledby="hotel-styles-h" className="mt-10 scroll-mt-24">
        <h2 id="hotel-styles-h" className="text-2xl font-semibold">Explore by hotel style</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2" aria-label="Hotel styles">
          {hotelStyles.filter(style => style.link).map(style => <li key={style.id} className="min-w-0">
            <Link to={style.link!.to} className="editorial-card-link group flex h-full min-w-0 items-start gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" data-testid="hotel-style-card">
              <img src={style.photo.src} alt={style.photo.alt} width={144} height={144} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-base font-semibold leading-snug sm:text-lg">{style.title}</h3>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{style.advantage}</span>
                
              </div>
            </Link>
          </li>)}
        </ul>
      </section>

      <TravelpayoutsHotelWidget provider="booking" />

      <section id="where-to-stay-guides" aria-labelledby="where-to-stay-guides-h" className="mt-10 scroll-mt-24" data-testid="accommodation-area-guides">
        <h2 id="where-to-stay-guides-h" className="text-2xl font-semibold">Not sure where to base yourself?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Explore my guides to the most popular neighborhoods and best areas to stay in Israel, with practical tips and handpicked hotel recommendations.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Where to stay guides by destination">
          {areaGuideCards.map(guide => {
            const available = guide.to !== null;
            const content = <>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <BookOpen className="h-4 w-4 shrink-0" aria-hidden /> {guide.eyebrow}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{guide.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
              {!available && <span className="mt-4 text-sm font-semibold text-muted-foreground">{guide.cta}</span>}
            </>;
            const baseClass = "flex h-full min-w-0 flex-col rounded-2xl border bg-card p-4";
            return <li key={guide.id} className="min-w-0">
              {available
                ? <Link
                    to={guide.to}
                    className={`editorial-card-link group ${baseClass} transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                    data-testid="accommodation-area-guide-card"
                  >{content}</Link>
                : <article
                    className={baseClass}
                    data-testid="accommodation-area-guide-coming-soon"
                    aria-label="Eilat hotel area guide — coming soon"
                  >{content}</article>}
            </li>;
          })}
        </ul>
      </section>

      <section id="booking-tips" aria-labelledby="booking-tips-h" className="mt-10 scroll-mt-24">
        <h2 id="booking-tips-h" className="text-2xl font-semibold">Before you book</h2>
        <ul className="mt-4 grid gap-x-6 rounded-2xl border bg-secondary/20 px-4 sm:grid-cols-2 sm:px-6" aria-label="Hotel booking checklist">
          {bookingTips.map(tip => <li key={tip.title} className="flex items-start gap-3 border-b py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <Check className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold">{tip.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
            </div>
          </li>)}
        </ul>
      </section>

      <section id="planning" aria-labelledby="planning-h" className="mt-10 scroll-mt-24">
        <h2 id="planning-h" className="text-2xl font-semibold">Plan the rest of your trip</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Find helpful guides to arriving, getting around and planning overnight stops across Israel.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {planningGuides.map(guide => <li key={guide.title}>
            <Link to={guide.to} className="group flex h-full min-w-0 items-start gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <guide.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-semibold group-hover:underline">{guide.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{guide.detail}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            </Link>
          </li>)}
        </ul>
      </section>

      <FaqList compact faqs={hotelHubFaqs} />
      <TravelpayoutsHotelWidget provider="agoda" />
    </div>
  </main>;
}
