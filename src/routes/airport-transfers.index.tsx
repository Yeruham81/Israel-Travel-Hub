import { createFileRoute, Link } from "@tanstack/react-router";
import guideSherutThumb from "@/assets/airport-transfers/guide-sherut-hub.webp";
import guideTelAvivThumb from "@/assets/airport-transfers/guide-tel-aviv-hub.webp";
import guideIsraelThumb from "@/assets/airport-transfers/guide-israel-hub.webp";
import guideTaxisThumb from "@/assets/airport-transfers/guide-taxis-hub.webp";
import guideAirportTaxisThumb from "@/assets/airport-transfers/guide-airport-taxis-hub.webp";
import guideArrivalThumb from "@/assets/airport-transfers/guide-arrival-hub.webp";
import { useEffect, useState } from "react";
import { BadgeCheck, BedDouble, BookOpen, CalendarCheck, CalendarDays, CarFront, CheckCircle2, Map as MapIcon, PlaneLanding, Smartphone, Sun } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import airportHeroMobile from "@/assets/airport-transfers/airport-mobile.webp";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { AirportDestinationCard as DestinationCard } from "@/components/AirportDestinationCard";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { IconTripPlanningLinks } from "@/components/IconTripPlanningLinks";
import { GuidePhotoCredit } from "@/components/GuideCard";
import { AIRPORT_TRANSFER_HUB_UPDATED_DATE, airportDestinationCards, airportHubPhotoSrc, airportTransferPhotos, airportTransferBenefits, airportTransferChecklist, airportTransferFaqs } from "@/data/airportTransfers";
import { travelGuidePhotos, travelGuideCardPhotos } from "@/data/generated/guide-directory";
import { travelGuidePaths } from "@/data/travel-guide-paths";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

const benefitIcons = [BadgeCheck, PlaneLanding, CalendarCheck] as const;
const bookingSteps = [
  { title: "Send your trip details", detail: "Flight, route and passengers", icon: CalendarCheck },
  { title: "Confirm your ride", detail: "Vehicle, price and pickup", icon: BadgeCheck },
  { title: "Meet your driver", detail: "Travel to your destination", icon: CarFront },
] as const;

const comparisonGuides = [
  { city: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
  { city: "Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
  { city: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
  { city: "Ein Bokek & Dead Sea", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
] as const;

const planningLinks = [
  { title: "Ben Gurion arrival tips", description: "Learn what to expect at Ben Gurion Airport, from passport control and baggage collection to customs and meeting your driver.", to: travelGuidePaths.arrival, photo: travelGuideCardPhotos.arrival, thumb: guideArrivalThumb },
  { title: "Official airport taxis", description: "Airport taxi queues, ride codes and regulated metered fares.", to: travelGuidePaths.airportTaxis, photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Airport taxi service sign at Ben Gurion Airport" }, thumb: guideAirportTaxisThumb },
  { title: "Taxis in Israel", description: "Taxi apps, fares, receipts and paying for local rides.", to: travelGuidePaths.taxis, photo: travelGuideCardPhotos.taxis, thumb: guideTaxisThumb },
  { title: "Getting around Israel", description: "Intercity trains, buses and travel between destinations.", to: travelGuidePaths.israel, photo: travelGuideCardPhotos.israel, thumb: guideIsraelThumb },
  { title: "Getting around Tel Aviv", description: "Light rail, city buses and weekend travel options.", to: travelGuidePaths.telAviv, photo: travelGuideCardPhotos.telAviv, thumb: guideTelAvivThumb },
  { title: "Sherut in Israel", description: "How shared taxis work and where they operate.", to: travelGuidePaths.sherut, photo: travelGuideCardPhotos.sherut, thumb: guideSherutThumb },
] as const;

// General trip-planning ideas complement the airport-specific guides above.
const tripPlanningLinks = [
  { title: "Israel travel tips", description: "Money, transport, local customs and arrival essentials.", to: travelGuidePaths.travelTips, icon: BookOpen },
  { title: "Best time to visit", description: "Choose travel dates around the weather and seasons.", to: travelGuidePaths.bestTime, icon: Sun },
  { title: "Where to stay", description: "Find hotels and neighborhoods near your plans.", to: "/accommodation/" as const, icon: BedDouble },
  { title: "Travel eSIM for Israel", description: "Compare mobile data plans for navigation and messages.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "Israel holidays & events", description: "Find dates that affect transport and opening hours.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Israel itinerary: 7 days", description: "A seven-day route through Israel's main destinations.", to: "/travel-blog/israel-itinerary-7-days/" as const, icon: MapIcon },
] as const;

export const Route = createFileRoute("/airport-transfers/")({
  validateSearch: parseAirportTransferSearch,
  head: async (ctx) => { const { routeHead } = await import("../route-heads/airport-transfers.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: Airport,
});

function Airport() {
  const { destination } = Route.useSearch();
  const [destinationId, setDestinationId] = useState(destination ?? "");
  useEffect(() => setDestinationId(destination ?? ""), [destination]);
  const choose = (id: string) => {
    setDestinationId(id);
    requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));
  };
  const creditedPhotos = [
    ...Object.values(airportTransferPhotos),
    travelGuidePhotos.arrival,
    travelGuidePhotos.israel,
    travelGuidePhotos.telAviv,
    travelGuideCardPhotos.sherut,
  ].filter(hasPublicPhotoCredit);
  return <main className="pb-12">
    <HubHeader
      checkedAt={AIRPORT_TRANSFER_HUB_UPDATED_DATE}
      crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/airport-transfers/" }]}
      title="Private airport transfers from Ben Gurion Airport"
      intro="Arrange a private, door-to-door transfer between Ben Gurion Airport (TLV) and Jerusalem, Tel Aviv, Haifa, the Dead Sea or elsewhere in Israel. Check pickup fares and request a personal quote."
      image={<GuideHeroMedia src={airportTransferPhotos["other"]!.src} mobileSrc={airportHeroMobile} alt={airportTransferPhotos["other"]!.alt} compact />}
    />
    <div className="mx-auto max-w-5xl px-4">
      <section id="popular-destinations" aria-labelledby="popular-h" className="mt-8 scroll-mt-24">
        <h2 id="popular-h" className="text-2xl font-semibold">Popular private transfers</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choose your destination to see pickup prices and request a direct transfer to your hotel or address.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {airportDestinationCards.filter((card) => card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} layout="hub-featured" />)}
        </div>
      </section>
      <section id="benefits" aria-labelledby="benefits-h" className="mt-8 scroll-mt-24">
        <h2 id="benefits-h" className="sr-only">Private transfer benefits</h2>
        <div className="grid grid-cols-3 gap-4 rounded-2xl border bg-secondary/25 p-3 sm:gap-6 sm:p-4 lg:gap-8">
          {airportTransferBenefits.map((benefit, index) => { const Icon = benefitIcons[index]!; return <div key={benefit.title} className="min-w-0 px-0.5 text-center sm:px-2 lg:px-3">
            <Icon className="mx-auto size-5 text-primary sm:size-6" aria-hidden />
            <h3 className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{benefit.title}</h3>
            <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{benefit.text}</p>
          </div>; })}
        </div>
      </section>
      <section id="more-destinations" aria-labelledby="more-h" className="mt-9 scroll-mt-24">
        <h2 id="more-h" className="text-2xl font-semibold">More destinations from Ben Gurion Airport</h2>
        <div className="mt-4 grid auto-rows-fr gap-2 lg:grid-cols-2">
          {airportDestinationCards.filter((card) => !card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} layout="hub-row" />)}
          <DestinationCard id="other" destination="Another destination?" photo={{ ...airportTransferPhotos["other"]!, hubSrc: airportHubPhotoSrc["other"] }} onChoose={choose} layout="hub-row" />
        </div>
      </section>
      <div className="mt-4 text-xs leading-relaxed text-muted-foreground" data-testid="airport-rate-terms">
        <p>Starting prices are for one-way weekday pickups from Ben Gurion Airport, per vehicle for up to four passengers. Larger vehicles and trips to the airport are quoted individually.</p>
        <p className="mt-2" data-testid="airport-fx-note">I confirm the full fare, including any night, weekend or holiday surcharge, in advance in ILS. USD and EUR estimates use current exchange rates.</p>
      </div>
      <section id="booking-steps" aria-labelledby="booking-steps-h" className="mt-8">
        <h2 id="booking-steps-h" className="text-xl font-semibold">How your transfer is arranged</h2>
        <ol className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {bookingSteps.map((step, index) => { const Icon = step.icon; return <li key={step.title} className="min-w-0 rounded-xl border bg-card p-2.5 text-center sm:p-4">
            <Icon className="mx-auto size-5 text-primary sm:size-6" aria-hidden />
            <p className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{index + 1}. {step.title}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">{step.detail}</p>
          </li>; })}
        </ol>
      </section>
      <TransferQuoteForm destinationId={destinationId} onDestinationChange={setDestinationId} compactHeader allowAirportDropoff />
      <section id="useful-information" aria-labelledby="tips-h" className="mx-auto mt-7 max-w-4xl">
        <h2 id="tips-h" className="text-xl font-semibold">Before booking your airport transfer</h2>
        <ul className="mt-3 grid gap-x-5 gap-y-2 rounded-xl border bg-card p-4 text-sm sm:grid-cols-2" aria-label="Airport transfer checklist">
          {airportTransferChecklist.map((item) => <li key={item} className="flex items-start gap-2 leading-relaxed">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>{item}</span>
          </li>)}
        </ul>
      </section>
      <AirportBookingPlatforms compact />
      <FaqList faqs={airportTransferFaqs} compact />
      <section id="compare-airport-transport" aria-labelledby="compare-airport-transport-h" className="mt-9">
        <h2 id="compare-airport-transport-h" className="text-2xl font-semibold">Compare all transport options from Ben Gurion Airport</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Explore trains, buses, taxis and private transfers to each destination.</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {comparisonGuides.map(guide => <li key={guide.to} className="min-w-0">
            <Link to={guide.to} className="flex h-full min-h-11 items-center justify-center rounded-lg border bg-card px-3 py-2 text-center text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{guide.city}</Link>
          </li>)}
        </ul>
      </section>

      <section id="keep-planning" aria-labelledby="keep-planning-h" className="mt-9">
        <h2 id="keep-planning-h" className="text-2xl font-semibold">Airport arrival and transport guides</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {planningLinks.map((guide) => <li key={guide.to} className="min-w-0">
            <Link to={guide.to} className="editorial-card-link group flex h-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src} alt={guideHeroPhotoForPath(String(guide.to))?.alt ?? guide.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-full sm:shrink-0 rounded-lg object-cover sm:w-28" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{guide.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                
              </span>
            </Link>
          </li>)}
        </ul>
      </section>
      <IconTripPlanningLinks title="Plan the rest of your stay" items={tripPlanningLinks} />
      {creditedPhotos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">{[...new Map(creditedPhotos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}</ul>
      </details>}
    </div>
  </main>;
}
