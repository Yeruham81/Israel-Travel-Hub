import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, CalendarCheck, CheckCircle2, PlaneLanding } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { AirportDestinationCard as DestinationCard } from "@/components/AirportDestinationCard";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { airportDestinationCards, airportTransferPhotos, airportTransferBenefits, airportTransferChecklist, airportTransferFaqs } from "@/data/airportTransfers";
import { travelGuides } from "@/data/travelGuides";
import { AIRPORT_TRANSFER_CHECK_DATE, travelGuidePaths } from "@/data/registry";
import { PageUpdated } from "@/components/PageUpdated";
import { pageMeta } from "@/lib/site";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";

const benefitIcons = [BadgeCheck, PlaneLanding, CalendarCheck] as const;
const planningLinks = [
  { title: "Ben Gurion arrival tips", description: "From landing to the arrivals hall.", to: travelGuidePaths.arrival, photo: travelGuides.arrival.cardPhoto ?? travelGuides.arrival.photo },
  { title: "Official airport taxis", description: "Pickup points, booking and taxi fares.", to: travelGuidePaths.airportTaxis, photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Airport taxi service sign at Ben Gurion Airport" } },
  { title: "Taxis in Israel", description: "Licensed taxis, apps and payments.", to: travelGuidePaths.taxis, photo: travelGuides.taxis.cardPhoto ?? travelGuides.taxis.photo },
  { title: "Getting around Israel", description: "Trains, buses and longer journeys.", to: travelGuidePaths.israel, photo: travelGuides.israel.cardPhoto ?? travelGuides.israel.photo },
  { title: "Getting around Tel Aviv", description: "City transport, light rail and Shabbat.", to: travelGuidePaths.telAviv, photo: travelGuides.telAviv.cardPhoto ?? travelGuides.telAviv.photo },
  { title: "Sherut in Israel", description: "Shared taxis and current airport alternatives.", to: travelGuidePaths.sherut, photo: travelGuides.sherut.cardPhoto ?? travelGuides.sherut.photo },
] as const;

export const Route = createFileRoute("/airport-transfers/")({
  validateSearch: parseAirportTransferSearch,
  head: () => pageMeta({
    title: "Airport transfers from Ben Gurion: private rides and prices",
    description: "Pre-book a private TLV airport pickup to Jerusalem, Tel Aviv, Haifa or the Dead Sea. Compare weekday starting rates and request a vehicle quote.",
    path: "/airport-transfers/",
    image: airportTransferPhotos["other"]!.src,
    imageAlt: airportTransferPhotos["other"]!.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Airport transfers", path: "/airport-transfers/" }],
  }),
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
    ...airportDestinationCards.map((card) => card.photo),
    ...planningLinks.map((guide) => guide.photo),
    airportTransferPhotos["other"]!,
    airportTransferPhotos["moshe"]!,
  ].filter(hasPublicPhotoCredit);
  return <main className="pb-12">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/airport-transfers/" }]}
      title="Private airport transfers from Ben Gurion Airport"
      intro="Arrange a private pickup from Ben Gurion Airport (TLV) to Jerusalem, Tel Aviv, Haifa, the Dead Sea or elsewhere in Israel. See my starting fares, request a quote or explore other booking platforms."
      image={<GuideHeroMedia src={airportTransferPhotos["other"]!.src} alt={airportTransferPhotos["other"]!.alt} compact />}
      actions={<a href="#request-quote" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a personal quote</a>}
    />
    <div className="mx-auto max-w-5xl px-4">
      <section id="popular-destinations" aria-labelledby="popular-h" className="mt-8 scroll-mt-24">
        <h2 id="popular-h" className="text-2xl font-semibold">Popular private transfers</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Browse route details or request a quote for your airport pickup.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {airportDestinationCards.filter((card) => card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} layout="hub-featured" />)}
        </div>
      </section>
      <section id="more-destinations" aria-labelledby="more-h" className="mt-9 scroll-mt-24">
        <h2 id="more-h" className="text-2xl font-semibold">More destinations from Ben Gurion Airport</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {airportDestinationCards.filter((card) => !card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} layout="hub-row" />)}
          <DestinationCard id="other" destination="Another destination?" photo={airportTransferPhotos["other"]!} onChoose={choose} layout="hub-row" />
        </div>
      </section>
      <div className="mt-4 text-xs leading-relaxed text-muted-foreground" data-testid="airport-rate-terms">
        <p><strong>About starting prices:</strong> All prices are one-way weekday fares, per vehicle for up to four passengers. Night, weekend and holiday surcharges may apply. Larger vehicles for groups and families can be provided, requiring a separate quote. Full price is confirmed in advance.</p>
        <PageUpdated date={AIRPORT_TRANSFER_CHECK_DATE} />
      </div>
      <section id="benefits" aria-labelledby="benefits-h" className="mt-7 scroll-mt-24">
        <h2 id="benefits-h" className="sr-only">Private transfer benefits</h2>
        <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-secondary/25 p-3 sm:gap-4 sm:p-4">
          {airportTransferBenefits.map((benefit, index) => { const Icon = benefitIcons[index]!; return <div key={benefit.title} className="min-w-0 text-center">
            <Icon className="mx-auto size-5 text-primary sm:size-6" aria-hidden />
            <h3 className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{benefit.title}</h3>
            <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{benefit.text}</p>
          </div>; })}
        </div>
      </section>
      <TransferQuoteForm destinationId={destinationId} onDestinationChange={setDestinationId} compactHeader />
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
      <section id="keep-planning" aria-labelledby="keep-planning-h" className="mt-9">
        <h2 id="keep-planning-h" className="text-2xl font-semibold">Practical travel guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {planningLinks.map((guide) => <li key={guide.to} className="min-w-0">
            <Link to={guide.to} className="group flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={guide.photo.src} alt={guide.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-24 shrink-0 rounded-lg object-cover sm:w-28" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug group-hover:text-primary">{guide.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                <span className="mt-1.5 inline-block text-xs font-semibold text-primary group-hover:underline">Read guide</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>
      {creditedPhotos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">{[...new Map(creditedPhotos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}</ul>
      </details>}
    </div>
  </main>;
}
