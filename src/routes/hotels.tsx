import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BedDouble, CalendarDays, CheckCircle2, MapPin, ReceiptText, Utensils, Accessibility, ExternalLink } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { HubHeader, OnThisPage, FaqList } from "@/components/Guide";
import { accommodationDestinations } from "@/data/content";
import { arrivalCards, choiceTips, eventsPhoto, hotelHubFaqs, hotelStyles, itineraryCards, seasonPhoto, seasons, type HubPhoto } from "@/data/hotelHub";
import { pageMeta } from "@/lib/site";
import { isPublisherUrl } from "@/data/registry";

export const Route = createFileRoute("/hotels")({
  head: () =>
    pageMeta({
      title: "Where to stay in Israel: hotel destinations, styles & planning tips",
      description: "Choose where to stay in Israel: Jerusalem, Tel Aviv, Haifa, Tiberias, the Dead Sea or Eilat. Compare hotel styles, seasons, holidays and airport journeys.",
      path: "/hotels/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }],
    }),
  component: Hotels,
});

const sections = [
  ["destinations", "Destinations"],
  ["styles", "Hotel styles"],
  ["choosing", "Choosing a hotel"],
  ["when", "When to visit"],
  ["itineraries", "Trip itineraries"],
  ["arrival", "Hotel transfers"],
] as const;

const tipIcons = {
  map: MapPin,
  bed: BedDouble,
  access: Accessibility,
  meal: Utensils,
  receipt: ReceiptText,
  calendar: CalendarDays,
};

const internalCardClass = "group h-full rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const actionClass = "mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 group-hover:text-primary/80";

function HotelPhoto({ photo, className = "aspect-[16/9]" }: { photo: HubPhoto; className?: string }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={755}
      height={503}
      loading="lazy"
      decoding="async"
      className={"w-full object-cover " + className}
    />
  );
}

function PhotoCredits({ photos }: { photos: HubPhoto[] }) {
  const unique = [...new Map(photos.filter((p) => p.sourceUrl && !isPublisherUrl(p.sourceUrl)).map((p) => [p.sourceUrl!, p])).values()];
  if (!unique.length) return null;
  return (
    <details className="mt-12 rounded-xl border bg-card p-4 text-xs text-muted-foreground">
      <summary className="cursor-pointer font-semibold text-foreground">Photo credits</summary>
      <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
        {unique.map((p) => (
          <li key={p.sourceUrl}>
            <a className="underline underline-offset-2 hover:text-primary" href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
              {p.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {p.credit && <span className="ml-1">— {p.credit}</span>}
            {p.licenseUrl && <> · <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License<span className="sr-only"> (opens in a new tab)</span></a></>}
          </li>
        ))}
      </ul>
    </details>
  );
}

function Hotels() {
  const creditedPhotos: HubPhoto[] = [
    ...accommodationDestinations.map((item) => item.photo),
    ...hotelStyles.map((item) => item.photo),
    seasonPhoto,
    eventsPhoto,
    ...itineraryCards.map((item) => item.photo),
    ...arrivalCards.map((item) => item.photo),
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 pb-10">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }]}
        eyebrow="Accommodation"
        title="Where to stay in Israel"
        intro="Your hotel shapes the way you experience Israel. Compare historic city neighborhoods, walkable beachfront bases, lakeside hotels and quieter desert resorts, then match your location, travel dates and room type to your plans. My destination guides help you narrow down the right area before checking a property's current offers."
      />
      <OnThisPage sections={sections} />

      <section id="destinations" aria-labelledby="destinations-h" className="mt-10 scroll-mt-28">
        <p className="eyebrow">First, choose your base</p>
        <h2 id="destinations-h" className="mt-2 text-3xl">Choose a destination</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Think about how you will spend your days, not just what the view looks like. A central Jerusalem hotel keeps historic sites within reach, Tel Aviv is ideal for a city-and-beach stay, and northern or Dead Sea hotels suit a different pace. Explore each destination's neighborhoods, transport connections and accommodation options before choosing a room.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {accommodationDestinations.map((destination) => <AccommodationCard key={destination.id} destination={destination} />)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Eilat currently links to hotel-area advice within my city guide; a dedicated Eilat hotel comparison is planned.
        </p>
      </section>

      <section id="styles" aria-labelledby="styles-h" className="mt-14 scroll-mt-28">
        <p className="eyebrow">Find the atmosphere that fits</p>
        <h2 id="styles-h" className="mt-2 text-3xl">Choose your hotel style</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          The same destination can offer very different stays. Decide whether you want a neighborhood to explore, facilities for the whole family or somewhere to unwind — then check the practical tradeoffs before booking.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hotelStyles.map((style) => (
            <article key={style.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
              <HotelPhoto photo={style.photo} className="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl">{style.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{style.advantage}</p>
                <p className="mt-3 text-sm leading-relaxed"><strong>Best for:</strong> {style.suits}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Check:</strong> {style.check}</p>
                {style.link && (
                  <Link to={style.link.to as LinkProps["to"]} className={actionClass + " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>
                    {style.link.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="choosing" aria-labelledby="choosing-h" className="mt-14 scroll-mt-28">
        <p className="eyebrow">A little preparation saves surprises</p>
        <h2 id="choosing-h" className="mt-2 text-3xl">What matters when choosing</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Two hotels with similar room photos may be very different once you account for hills, family-room occupancy, meal arrangements and the full cost. Keep these points beside your shortlist.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {choiceTips.map((tip) => {
            const Icon = tipIcons[tip.icon];
            return (
              <div key={tip.id} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                  <h3 className="text-lg leading-snug">{tip.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-secondary/50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-relaxed">Hotel prices and room availability depend on the dates, guests and rate conditions you enter on the actual booking site. Information here is planning guidance, not a live room quote.</p>
        </div>
      </section>

      <section id="when" aria-labelledby="when-h" className="mt-14 scroll-mt-28">
        <p className="eyebrow">Choose your dates as carefully as your location</p>
        <h2 id="when-h" className="mt-2 text-3xl">When is the best time to book a hotel in Israel?</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          There is no single best season for every itinerary. The Mediterranean coast, Jerusalem's hills, the Sea of Galilee and Eilat can feel very different during the same week. Weather affects what you will enjoy, while local holidays and events can affect demand, check-in plans and transport.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
            <HotelPhoto photo={seasonPhoto} className="aspect-[16/8]" />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-2xl">Find the right season</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {seasons.map((season) => <div key={season.id} className="rounded-xl bg-secondary/60 p-3"><h4 className="font-semibold">{season.title}</h4><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{season.text}</p></div>)}
              </div>
              <Link to="/travel-blog/best-time-to-visit-israel/" className={actionClass + " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>
                Read my guide to the best time to visit Israel <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </article>

          <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
            <HotelPhoto photo={eventsPhoto} className="aspect-[16/8]" />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-2xl">Holidays, Shabbat & special events</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Passover, Rosh Hashanah and Sukkot can bring changing demand and service arrangements, while Friday-evening and Saturday transport follows a different pattern from weekdays. Jewish holidays begin at sunset, so the evening before can matter for a hotel arrival.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Christmas and Easter may affect accommodation near pilgrimage centers. Ramadan, Eid celebrations and major city festivals can also change conditions locally. Impacts vary by date, hotel and area — none of these occasions automatically means every hotel is full or every service closed.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Check your travel year's calendar and the property's current policies before making non-refundable plans.
              </p>
              <Link to="/travel-blog/calendar-of-events/" className={actionClass + " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>
                Check the Israel holidays and events guide <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="itineraries" aria-labelledby="itineraries-h" className="mt-14 scroll-mt-28">
        <p className="eyebrow">Work backwards from your route</p>
        <h2 id="itineraries-h" className="mt-2 text-3xl">Plan your route and choose your hotel bases</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          You do not need to change hotels every night. Use these itineraries to see which regions can sensibly be visited from Jerusalem, Tel Aviv or a northern base — and when an overnight stay farther south makes your trip more comfortable.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {itineraryCards.map((trip) => (
            <a key={trip.id} href={trip.href} target="_blank" rel="noopener noreferrer" className={internalCardClass + " flex min-w-0 flex-col overflow-hidden sm:flex-row"} data-testid="hotel-itinerary-card">
              <div className="w-full shrink-0 sm:w-40 md:w-36 lg:w-44">
                <HotelPhoto photo={trip.photo} className="aspect-[16/9] h-full sm:aspect-auto sm:min-h-48" />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{trip.days}-day trip</span>
                <h3 className="mt-1 text-xl">{trip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{trip.route}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed"><strong>Hotel bases:</strong> {trip.bases}</p>
                <span className={actionClass}>Read the itinerary <ExternalLink className="h-4 w-4 shrink-0" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">These four full itineraries currently open on my existing website in a separate tab. They will be incorporated into this travel hub.</p>
      </section>

      <section id="arrival" aria-labelledby="arrival-h" className="mt-14 scroll-mt-28">
        <p className="eyebrow">From the airport to the hotel door</p>
        <h2 id="arrival-h" className="mt-2 text-3xl">Getting to your hotel</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Plan the last leg of the journey as well as the flight. A station may still be some distance from your accommodation, and a late arrival or Shabbat can change the practical options. These guides compare transport choices before you decide whether to book a private transfer.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {arrivalCards.map((card) => (
            <Link to={card.to as LinkProps["to"]} key={card.id} className={internalCardClass + " flex min-w-0 flex-col overflow-hidden sm:flex-row"} data-testid="hotel-arrival-card">
              <div className="w-full shrink-0 sm:w-32 md:w-40">
                <HotelPhoto photo={card.photo} className="aspect-[16/9] h-full sm:aspect-auto sm:min-h-44" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="eyebrow">{card.group}</p>
                <h3 className="mt-1 text-xl">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                <span className={actionClass}>{card.cta} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FaqList faqs={hotelHubFaqs} />
      <PhotoCredits photos={creditedPhotos} />
    </main>
  );
}
