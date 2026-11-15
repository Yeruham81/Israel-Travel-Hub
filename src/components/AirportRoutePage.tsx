import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarCheck, CheckCircle2, LayoutGrid, MapPin, PlaneLanding } from "lucide-react";
import { Breadcrumbs, FaqList } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { AIRPORT_TRANSFER_UPDATED_DATE, airportHomepageRoutePhotos, airportTransferBenefits, airportTransferChecklist, airportTransferPhotos } from "@/data/airportTransfers";
import { travelGuides } from "@/data/travelGuides";
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
      provider: { "@type": "Person", name: "Moshe Barak", url: `${CANONICAL_ORIGIN}/about-moshe-barak/#moshe-barak` },
      areaServed: [{ "@type": "Place", name: "Ben Gurion Airport" }, { "@type": "Place", name: guide.city }],
    },
  })] };
}

const benefitIcons = [BadgeCheck, PlaneLanding, CalendarCheck] as const;
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

type RelatedCard = { title: string; description: string; to: LinkProps["to"]; photo: { src: string; alt: string; sourceUrl?: string; licenseUrl?: string; credit?: string } };

export function AirportRoutePage({ id }: { id: AirportTransferRouteId }) {
  const guide = getAirportRouteGuide(id);
  const { price } = guide.rate;
  const heroPhoto = airportHomepageRoutePhotos[id] ?? guide.photo;
  const localGuide = id === "tel-aviv"
    ? { title: "Getting around Tel Aviv", description: "Plan transport once you reach the city.", to: travelGuidePaths.telAviv, photo: travelGuides.telAviv.cardPhoto ?? travelGuides.telAviv.photo }
    : { title: "Getting around Israel", description: "Plan your onward journeys.", to: travelGuidePaths.israel, photo: travelGuides.israel.cardPhoto ?? travelGuides.israel.photo };
  const relatedCards: RelatedCard[] = [
    { title: "Ben Gurion Airport arrival tips", description: "What to expect after landing.", to: travelGuidePaths.arrival, photo: travelGuides.arrival.cardPhoto ?? travelGuides.arrival.photo },
    { title: "Official airport taxis", description: "Taxi pickup points and metered fares.", to: travelGuidePaths.airportTaxis, photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Ben Gurion Airport taxi service sign" } },
    localGuide,
    { title: guide.related[0]?.label ?? "Explore hotels", description: "Choose the right area for your stay.", to: guide.related[0]?.to ?? "/accommodation/", photo: guide.photo },
  ];
  const faqs = [
    ...guide.faqs,
    { q: "Is the starting fare per vehicle or per passenger?", a: "The displayed weekday fare is per vehicle for up to four passengers, not per person. Night, weekend and holiday surcharges may apply, and luggage or a larger vehicle can affect the quote. I confirm the full price before booking." },
    { q: "What happens if my flight is delayed?", a: "I can monitor the flight details you provide and coordinate the agreed pickup around the actual landing time. Confirm the meeting point and any waiting arrangements with me before booking, and message me if your plans change." },
    { q: "Can I cancel my airport transfer free of charge?", a: "For a transfer booked directly with me, cancellation is free up to 24 hours before the scheduled pickup. Please check the terms for later cancellations in your booking confirmation. External booking platforms set their own policies." },
  ];
  const checklist = [...airportTransferChecklist.slice(0, 4), guide.checklistTip];
  const creditedPhotos = [guide.photo, airportTransferPhotos["moshe"]!, ...relatedCards.map((card) => card.photo)]
    .filter(hasPublicPhotoCredit);
  return (
    <main className="mx-auto max-w-5xl px-4 pb-12">
      <div className="pt-6">
        <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      </div>
      <header>
        <GuideHeroLayout image={<GuideHeroMedia src={heroPhoto.src} alt={heroPhoto.alt} compact />}>
          <p className="eyebrow">Private airport transfer · TLV</p>
          <h1 className="guide-page-title mt-3">{guide.title}</h1>
          <p data-guide-intro className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
          <PageUpdated date={AIRPORT_TRANSFER_UPDATED_DATE} />
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-secondary/35 p-3 sm:p-4" data-testid="route-starting-rate">
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">One-way weekday fare</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-foreground">From ₪{price.amount.toLocaleString("en-US")}</p>
              <CompactCurrencyEquivalents amount={price.amount} />
            </div>
            <div className="border-l-0 text-sm sm:border-l sm:pl-5">
              <p className="text-xs text-muted-foreground">Drive after pickup</p>
              <p className="mt-0.5 font-semibold">{guide.driveTime}</p>
              <p className="mt-1 text-xs text-muted-foreground">Per vehicle · up to 4 passengers</p>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Night, weekend and holiday surcharges may apply.</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Larger vehicles for groups and families can be provided, requiring a separate quote.</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground" data-testid="airport-route-fx-note">Full price is confirmed in advance. All fares are quoted and charged in ILS. USD and EUR amounts are approximate, based on current exchange rates.</p>
          <a href="#request-quote" onClick={focusQuote} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a personal quote</a>
        </GuideHeroLayout>
      </header>
      <AuthorCard />

      <section id="journey-details" aria-labelledby="journey-h" className="mt-9 scroll-mt-24">
        <h2 id="journey-h" className="text-2xl font-semibold">Your private airport pickup</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">I can arrange a vehicle matched to your party and luggage, with an agreed meeting point and hotel or address drop-off. Send your flight details so pickup can be coordinated with your landing time.</p>
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
        <aside className="mt-3 rounded-xl border-l-4 border-primary bg-secondary/30 px-4 py-3">
          <h3 className="text-sm font-semibold">{guide.planningTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guide.planningText}</p>
        </aside>
      </section>

      <TransferQuoteForm destinationId={id} fixedDestination compactHeader />

      <section id="before-booking" aria-labelledby="checklist-h" className="mx-auto mt-7 max-w-4xl">
        <h2 id="checklist-h" className="text-xl font-semibold">Before booking your transfer</h2>
        <ul className="mt-3 grid gap-x-5 gap-y-2 rounded-xl border bg-card p-4 text-sm sm:grid-cols-2" aria-label="Airport transfer checklist">
          {checklist.map((item) => <li key={item} className="flex items-start gap-2 leading-relaxed">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>)}
        </ul>
      </section>

      <AirportBookingPlatforms pageId={"airport-route-" + id} destination={guide.city} compact />
      <FaqList faqs={faqs} compact />

      <section id="related-travel-guides" aria-labelledby="related-guides-h" className="mt-9">
        <h2 id="related-guides-h" className="text-2xl font-semibold">Related travel guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedCards.map((card) => <li key={card.title}>
            <Link to={card.to} className="group flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={card.photo.src} alt={card.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-24 shrink-0 rounded-lg object-cover sm:w-28" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{card.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{card.description}</span>
                <span className="mt-1.5 inline-block text-xs font-semibold text-primary group-hover:underline">Read guide</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>
      <section id="other-routes" aria-labelledby="other-routes-h" className="mt-9">
        <h2 id="other-routes-h" className="text-xl font-semibold">Other airport transfer destinations</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {airportTransferRoutes.filter((route) => route.id !== id).map((route) => <li key={route.id} className="min-w-0">
            <Link to={route.path} className="group flex h-full min-h-24 min-w-0 items-center gap-3 rounded-xl border bg-card p-3 shadow-sm transition-[border-color,background-color,box-shadow] hover:border-primary/55 hover:bg-secondary/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"><MapPin className="size-5" aria-hidden /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">From Ben Gurion Airport</span>
                <span className="mt-0.5 block font-semibold leading-snug text-foreground group-hover:text-primary">{getAirportRouteGuide(route.id).city}</span>
                <span className="mt-1 block text-xs text-muted-foreground">Starting fare &amp; route details</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
            </Link>
          </li>)}
          <li className="min-w-0">
            <Link to="/airport-transfers/" className="group flex h-full min-h-24 min-w-0 items-center gap-3 rounded-xl border bg-secondary/30 p-3 shadow-sm transition-[border-color,background-color,box-shadow] hover:border-primary/55 hover:bg-secondary/55 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"><LayoutGrid className="size-5" aria-hidden /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">Explore more routes</span>
                <span className="mt-0.5 block font-semibold leading-snug text-foreground group-hover:text-primary">All destinations</span>
                <span className="mt-1 block text-xs text-muted-foreground">Browse transfers and request a quote</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
            </Link>
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
