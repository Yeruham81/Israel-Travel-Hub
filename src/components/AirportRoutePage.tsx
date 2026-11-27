import { Link, type LinkProps } from "@tanstack/react-router";
import { BadgeCheck, CalendarCheck, CheckCircle2, PlaneLanding } from "lucide-react";
import { Breadcrumbs, FaqList } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { GuidePhotoCredit } from "@/components/GuideCard";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { AIRPORT_TRANSFER_UPDATED_DATE, airportHomepageRoutePhotos, airportHubPhotoSrc, airportTransferBenefits, airportTransferChecklist, airportTransferPhotos } from "@/data/airportTransfers";
import { getShorePort } from "@/data/shoreExcursions";
import { airportTransferNav } from "@/data/nav";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { airportTransferRoutes, travelGuidePaths, type AirportTransferRouteId } from "@/data/registry";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { CompactCurrencyEquivalents } from "@/components/CurrencyRates";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

function crumbsFor(id: AirportTransferRouteId) {
  const guide = getAirportRouteGuide(id);
  return [
    { name: "Home", path: "/" as const },
    { name: airportTransferNav.label, path: airportTransferNav.to },
    { name: guide.city, path: guide.path },
  ];
}

export function airportRouteMeta(id: AirportTransferRouteId) {
  const guide = getAirportRouteGuide(id);
  const head = pageMeta({ title: guide.title, description: guide.description, path: guide.path, crumbs: crumbsFor(id), image: (airportHomepageRoutePhotos[id] ?? guide.photo).src, imageAlt: (airportHomepageRoutePhotos[id] ?? guide.photo).alt });
  const url = CANONICAL_ORIGIN + guide.path;
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url,
    name: guide.title, description: guide.description, inLanguage: "en", author: authorLd(),
    primaryImageOfPage: { "@type": "ImageObject", url: new URL((airportHomepageRoutePhotos[id] ?? guide.photo).src, CANONICAL_ORIGIN).href },
    mainEntity: { "@type": "Service", name: guide.title, serviceType: "Private airport transfer",
      provider: { "@type": "Person", name: "Moshe Barak", url: `${CANONICAL_ORIGIN}/about-me/#moshe-barak` },
      areaServed: [{ "@type": "Place", name: "Ben Gurion Airport" }, { "@type": "Place", name: guide.city }],
    },
  })] };
}

const benefitIcons = [BadgeCheck, PlaneLanding, CalendarCheck] as const;
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

type RelatedCard = { title: string; description: string; to: LinkProps["to"] };

const transportComparisons: Record<AirportTransferRouteId, LinkProps["to"]> = {
  jerusalem: "/travel-blog/ben-gurion-airport-to-jerusalem/",
  "tel-aviv": "/travel-blog/ben-gurion-airport-to-tel-aviv/",
  haifa: "/travel-blog/ben-gurion-airport-to-haifa/",
  "dead-sea": "/travel-blog/ben-gurion-airport-to-ein-bokek/",
};

/** Exactly six useful destination-specific guides, each with its own featured photograph. */
const routeReading: Record<AirportTransferRouteId, RelatedCard[]> = {
  jerusalem: [
    { title: "Ben Gurion Airport arrival tips", description: "Arrival formalities, luggage collection and meeting your driver.", to: travelGuidePaths.arrival },
    { title: "Where to stay in Jerusalem", description: "Choose between Mamilla, the Old City and residential districts.", to: "/travel-blog/where-to-stay-in-jerusalem/" },
    { title: "Jerusalem Old City", description: "Explore the gates, walking routes and historic sites.", to: "/attractions/old-city-jerusalem/" },
    { title: "Jerusalem travel guide", description: "Plan neighborhoods, attractions and sightseeing days.", to: travelGuidePaths.jerusalem },
    { title: "Airport travel on Shabbat", description: "Understand weekend and holiday transport choices.", to: travelGuidePaths.shabbat },
    { title: "Getting around Israel", description: "Continue your journey between cities and regions.", to: travelGuidePaths.israel },
  ],
  "tel-aviv": [
    { title: "Ben Gurion Airport arrival tips", description: "Terminal arrival steps and meeting your driver.", to: travelGuidePaths.arrival },
    { title: "Where to stay in Tel Aviv", description: "Compare beach, central-city and Jaffa neighborhoods.", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
    { title: "Explore Old Jaffa", description: "See the port, stone lanes and nearby sights.", to: "/attractions/jaffa/" },
    { title: "Getting around Tel Aviv", description: "Light rail, buses and local transport after check-in.", to: travelGuidePaths.telAviv },
    { title: "Tel Aviv beaches", description: "Explore Tel Aviv's beaches and seafront neighborhoods.", to: travelGuidePaths.telAvivBeaches },
    { title: "Official airport taxis", description: "Learn about airport taxi pickup and fare arrangements.", to: travelGuidePaths.airportTaxis },
  ],
  haifa: [
    { title: "Ben Gurion Airport arrival tips", description: "Plan baggage collection and your driver meeting point.", to: travelGuidePaths.arrival },
    { title: "Where to stay in Haifa", description: "Choose a hotel near the Haifa attractions you plan to visit.", to: "/travel-blog/best-hotels-in-haifa/" },
    { title: "Haifa attractions", description: "Explore the gardens, waterfront and Carmel viewpoints.", to: "/attractions/haifa/" },
    { title: "Haifa shore excursions", description: "Plan a visit around your cruise and port schedule.", to: "/shore-excursions/haifa/" },
    { title: "Getting around Israel", description: "Continue your journey through northern Israel.", to: travelGuidePaths.israel },
    { title: "Official airport taxis", description: "See how official airport taxi pickups work.", to: travelGuidePaths.airportTaxis },
  ],
  "dead-sea": [
    { title: "Ben Gurion Airport arrival tips", description: "From passport control to the driver meeting point.", to: travelGuidePaths.arrival },
    { title: "Dead Sea hotels", description: "Compare hotels in Ein Bokek, Neve Zohar and Ein Gedi, including beach access, mineral pools and spa facilities.", to: "/travel-blog/best-dead-sea-hotels/" },
    { title: "Dead Sea attractions", description: "Plan beaches, viewpoints and desert highlights.", to: "/attractions/dead-sea/" },
    { title: "Visit Masada", description: "Plan the fortress visit, cable car and site access.", to: "/attractions/masada/" },
    { title: "Jerusalem to the Dead Sea", description: "Explore further journeys and stops around the region.", to: travelGuidePaths.jerusalemDeadSea },
    { title: "Getting around Israel", description: "Plan onward road and public-transport connections.", to: travelGuidePaths.israel },
  ],
};

export function AirportRoutePage({ id }: { id: AirportTransferRouteId }) {
  const guide = getAirportRouteGuide(id);
  const { price } = guide.rate;
  const heroPhoto = airportHomepageRoutePhotos[id] ?? guide.photo;
  const relatedCards = routeReading[id].map((card) => {
    const photo = guideHeroPhotoForPath(String(card.to)) ??
      (card.to === "/shore-excursions/haifa/" ? getShorePort("haifa").photo : undefined);
    if (!photo) throw new Error(`Missing featured image for airport guide: ${card.to}`);
    return { ...card, photo };
  });
  const faqs = [
    ...guide.faqs,
    { q: "Where will I meet my driver at Ben Gurion Airport?", a: "For airport pickups, I'll confirm the terminal meeting point and collection instructions with your booking. Follow the agreed details after collecting your luggage." },
    { q: "How can I pay for my transfer?", a: "I'll confirm the available payment methods and when payment is due before the booking is finalized." },
    { q: "Can I arrange a transfer on Shabbat or late at night?", a: "Share the journey date and flight time. I'll check availability and confirm the full fare, including any applicable night, weekend or holiday surcharge." },
  ];
  const checklist = [...airportTransferChecklist.slice(0, 4), guide.checklistTip];
  const creditedPhotos = [guide.photo, airportTransferPhotos["moshe"]!, ...relatedCards.map(({ photo }) => ({
    ...photo, sourceUrl: "sourceUrl" in photo && typeof photo.sourceUrl === "string" ? photo.sourceUrl : "",
  }))].filter(hasPublicPhotoCredit);
  return (
    <main className="mx-auto max-w-5xl px-4 pb-12">
      <div className="pt-6">
        <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      </div>
      <header>
        <GuideHeroLayout image={<GuideHeroMedia src={heroPhoto.src} mobileSrc={airportHubPhotoSrc[id]} alt={heroPhoto.alt} compact />}>
          <p className="eyebrow">Private airport transfer · TLV</p>
          <h1 className="guide-page-title mt-3">{guide.title}</h1>
          <p data-guide-intro className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
          <PageUpdated date={AIRPORT_TRANSFER_UPDATED_DATE} />
        </GuideHeroLayout>
        <div className="mt-4 border-t pt-1" data-testid="airport-route-author-position"><AuthorCard /></div>
        <div className="mt-5 max-w-4xl">
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-secondary/35 p-3 sm:p-4" data-testid="route-starting-rate">
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">One-way weekday airport pickup</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-foreground">From ₪{price.amount.toLocaleString("en-US")}</p>
              <CompactCurrencyEquivalents amount={price.amount} />
            </div>
            <div className="border-l-0 text-sm sm:border-l sm:pl-5">
              <p className="text-xs text-muted-foreground">Drive after pickup</p>
              <p className="mt-0.5 font-semibold">{guide.driveTime}</p>
              <p className="mt-1 text-xs text-muted-foreground">Per vehicle · up to 4 passengers</p>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">The starting fare covers airport pickup. I'll quote return trips, larger vehicles and extra stops separately.</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground" data-testid="airport-route-fx-note">I confirm the full price before booking. The ILS fare includes any applicable night, weekend or holiday surcharge; USD and EUR estimates use current exchange rates.</p>
          <a href="#request-quote" onClick={focusQuote} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a personal quote</a>
        </div>
      </header>

      <section id="journey-details" aria-labelledby="journey-h" className="mt-9 scroll-mt-24">
        <h2 id="journey-h" className="text-2xl font-semibold">Private transfer to {guide.city}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">I'll arrange a vehicle for your group and luggage, and agree on where to meet you at the airport.</p>
        <div className="mt-4 grid grid-cols-3 gap-4 rounded-2xl border bg-secondary/25 p-3 sm:gap-6 sm:p-4 lg:gap-8">
          {airportTransferBenefits.map((benefit, index) => {
            const Icon = benefitIcons[index]!;
            return <div key={benefit.title} className="min-w-0 px-0.5 text-center sm:px-2 lg:px-3">
              <Icon className="mx-auto size-5 text-primary sm:size-6" aria-hidden />
              <h3 className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{benefit.title}</h3>
              <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{benefit.text}</p>
            </div>;
          })}
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">For airport pickups, I send the agreed terminal meeting point and collection instructions with your booking confirmation. You can also read my <Link to={travelGuidePaths.arrival} className="font-semibold text-primary underline-offset-2 hover:underline">Ben Gurion Airport arrival tips</Link> before your flight.</p>
        <div className="mt-5 max-w-4xl">
          <h3 className="text-lg font-semibold">{guide.journeyTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guide.journeyText}</p>
        </div>
      </section>

      <section id="drop-off" aria-labelledby="dropoff-h" className="mt-9 scroll-mt-24">
        <h2 id="dropoff-h" className="text-2xl font-semibold">{guide.areasTitle}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {guide.areas.map((area) => <article key={area.title} className="rounded-xl border bg-card p-4">
            <h3 className="text-base font-semibold leading-snug">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
          </article>)}
        </div>
        <aside className="mt-3 rounded-xl border-l-4 border-primary bg-secondary/30 px-4 py-3" aria-label="Practical example">
          <h3 className="text-base font-semibold">{guide.example.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guide.example.situation} {guide.example.response}</p>
        </aside>
      </section>

      <TransferQuoteForm destinationId={id} fixedDestination compactHeader allowAirportDropoff />

      <section id="before-booking" aria-labelledby="checklist-h" className="mx-auto mt-7 max-w-4xl">
        <h2 id="checklist-h" className="text-xl font-semibold">Before booking your transfer</h2>
        <ul className="mt-3 grid gap-x-5 gap-y-2 rounded-xl border bg-card p-4 text-sm sm:grid-cols-2" aria-label="Airport transfer checklist">
          {checklist.map((item) => <li key={item} className="flex items-start gap-2 leading-relaxed">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>)}
        </ul>
      </section>

      <AirportBookingPlatforms pageId={"airport-route-" + id} destination={guide.city} compact title="Compare other transfer providers" />
      <FaqList faqs={faqs} compact />
      <p className="mt-6 rounded-xl border bg-secondary/20 px-4 py-3 text-sm leading-relaxed">Want to compare trains, buses and taxis for this route? Read my <Link to={transportComparisons[id]} className="font-semibold text-primary underline-offset-2 hover:underline">Ben Gurion Airport to {guide.city} transport guide</Link>.</p>

      <section id="related-travel-guides" aria-labelledby="related-guides-h" className="mt-9">
        <h2 id="related-guides-h" className="text-2xl font-semibold">Plan your arrival and stay</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {relatedCards.map((card) => <li key={card.to} className="min-w-0">
            <Link to={card.to} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card p-2.5 transition-[border-color,background-color,box-shadow] hover:border-primary/50 hover:bg-secondary/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="block w-full overflow-hidden rounded-lg">
                <img src={card.photo.src} alt={card.photo.alt} width={320} height={192} loading="lazy" decoding="async" className="aspect-[5/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.045]" />
              </span>
              <span className="mt-2 block min-w-0 px-0.5 pb-1">
                <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{card.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{card.description}</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>
      <section id="other-routes" aria-labelledby="other-routes-h" className="mt-9">
        <h2 id="other-routes-h" className="text-xl font-semibold">Other airport transfer destinations</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {airportTransferRoutes.filter((route) => route.id !== id).map((route) => <li key={route.id} className="min-w-0">
            <Link to={route.path} className="flex h-full min-h-14 min-w-0 items-center justify-center rounded-xl border bg-card px-3 py-2 text-center text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary/55 hover:bg-secondary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{getAirportRouteGuide(route.id).city}</Link>
          </li>)}
          <li className="min-w-0">
            <Link to="/airport-transfers/" className="flex h-full min-h-14 min-w-0 items-center justify-center rounded-xl border bg-secondary/30 px-3 py-2 text-center text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary/55 hover:bg-secondary/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">All destinations</Link>
          </li>
        </ul>
      </section>
      {creditedPhotos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">{[...new Map(creditedPhotos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}</ul>
      </details>}
    </main>
  );
}
