import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, CarFront, MapPin, PlaneLanding, ReceiptText, TrainFront, Users } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { FaqList, HubHeader } from "@/components/Guide";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { accommodationDestinations } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { hotelHubFaqs, hotelStyles } from "@/data/hotelHub";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import hotelRoomPhoto from "@/assets/home/hotel-room-feature.webp";

const destinations = accommodationDestinations;

const guideLabels: Record<keyof typeof accommodationEditorial, string> = {
  jerusalem: "Read the Jerusalem area guide",
  telaviv: "Read the Tel Aviv area guide",
  haifa: "Read the Haifa area guide",
  tiberias: "Read the Tiberias area guide",
  deadsea: "Read the Dead Sea area guide",
};

const bookingTips = [
  { title: "Choose a practical location", icon: MapPin, text: "Check the walk to sights, restaurants and transport. Hills and steps matter in Jerusalem and Haifa." },
  { title: "Check the room details", icon: Users, text: "Enter all guests and children's ages, then confirm the beds, room size and lift access." },
  { title: "Compare the full price", icon: ReceiptText, text: "Check taxes, breakfast, parking, deposits and cancellation terms alongside the room rate." },
  { title: "Plan your arrival", icon: CalendarDays, text: "For Friday, Saturday or holiday arrivals, confirm check-in, meals and a way to reach the hotel." },
] as const;

const planningGuides = [
  { title: "Ben Gurion arrival tips", detail: "Your first steps after landing.", to: "/travel-blog/ben-gurion-airport-arrival-tips/" as const, icon: PlaneLanding },
  { title: "Airport transfers", detail: "Private rides to your hotel.", to: "/airport-transfers/" as const, icon: CarFront },
  { title: "Getting around Israel", detail: "Trains, buses and intercity journeys.", to: "/travel-blog/getting-around-israel/" as const, icon: TrainFront },
  { title: "Israel in seven days", detail: "Plan your overnight bases and day trips.", to: "/travel-blog/israel-itinerary-7-days/" as const, icon: MapPin },
  { title: "Holidays and events", detail: "Check dates that affect transport and stays.", to: "/travel-blog/israel-holidays/" as const, icon: CalendarDays },
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
      intro="Looking for the right place to stay? Start with a destination, then compare the neighborhoods, hotel styles and practical details that suit your trip."
      image={<GuideHeroMedia src={hotelRoomPhoto} alt="A welcoming hotel guest room" compact />}
    />
    <div className="mx-auto max-w-5xl px-4">
      <section id="destinations" aria-labelledby="destinations-h" className="mt-9 scroll-mt-24">
        <h2 id="destinations-h" className="text-2xl font-semibold">Choose where to stay</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Jerusalem and Tel Aviv have neighborhood-by-neighborhood hotel guides. For Haifa, Tiberias and the Dead Sea, start with the local area overview and explore hotels by style.
        </p>
        <ul className="mt-4 grid grid-cols-2 auto-rows-fr gap-2.5 sm:gap-4" aria-label="Hotel destinations in Israel">
          {destinations.map(destination => {
            const comingSoon = destination.id === "eilat";
            const id = destination.id as keyof typeof accommodationEditorial;
            return <li key={destination.id} className="min-w-0">
              <AccommodationCard
                destination={destination}
                comingSoon={comingSoon}
                {...(!comingSoon ? { guideLink: { to: accommodationEditorial[id].path as LinkProps["to"], label: guideLabels[id] } } : {})}
              />
            </li>;
          })}
        </ul>
      </section>

      <section id="styles" aria-labelledby="hotel-styles-h" className="mt-10 scroll-mt-24">
        <h2 id="hotel-styles-h" className="text-2xl font-semibold">Explore by hotel style</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Have a particular kind of stay in mind? Open a focused guide, from city hotels and boutique properties to beachfront and spa resorts.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2" aria-label="Hotel styles">
          {hotelStyles.filter(style => style.link).map(style => <li key={style.id} className="min-w-0">
            <Link to={style.link!.to} className="group flex h-full min-w-0 items-start gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" data-testid="hotel-style-card">
              <img src={style.photo.src} alt={style.photo.alt} width={144} height={144} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-base font-semibold leading-snug sm:text-lg">{style.title}</h3>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{style.advantage}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                  {style.link!.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </span>
              </div>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="booking-tips" aria-labelledby="booking-tips-h" className="mt-10 scroll-mt-24">
        <h2 id="booking-tips-h" className="text-2xl font-semibold">Before you book</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A well-located room with the right facilities can make a real difference to your trip. These are the checks I recommend before comparing offers.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {bookingTips.map(tip => <div key={tip.title} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2.5">
              <tip.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              <h3 className="text-base font-semibold">{tip.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
          </div>)}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          When you follow a hotel link to Expedia, enter your dates and guests to check current room prices, availability and booking conditions.
        </p>
      </section>

      <section id="planning" aria-labelledby="planning-h" className="mt-10 scroll-mt-24">
        <h2 id="planning-h" className="text-2xl font-semibold">Plan the rest of your trip</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Your hotel is one part of the plan. These guides will help you choose how to arrive, get around and fit your overnight stays into a realistic itinerary.
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
    </div>
  </main>;
}
