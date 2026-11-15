import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, CalendarCheck, CarFront, Compass, PlaneLanding, TrainFront } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { AirportDestinationCard as DestinationCard } from "@/components/AirportDestinationCard";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { airportDestinationCards, airportTransferPhotos, airportTransferBenefits, airportTransferTips, airportTransferFaqs } from "@/data/airportTransfers";
import { AIRPORT_TRANSFER_CHECK_DATE, travelGuidePaths } from "@/data/registry";
import { PageUpdated } from "@/components/PageUpdated";
import { pageMeta } from "@/lib/site";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";

const benefitIcons = [BadgeCheck, PlaneLanding, CalendarCheck] as const;
const planningLinks = [
  { title: "Ben Gurion arrival tips", description: "What to expect after landing.", to: travelGuidePaths.arrival, icon: PlaneLanding },
  { title: "Taxis in Israel", description: "Everyday taxis, fares and apps.", to: travelGuidePaths.taxis, icon: CarFront },
  { title: "Getting around Israel", description: "Plan your onward connections.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Tours & day trips", description: "Explore more of Israel.", to: "/tours/" as const, icon: Compass },
] as const;

export const Route = createFileRoute("/airport-transfers/")({
  validateSearch: parseAirportTransferSearch,
  head: () => pageMeta({
    title: "Airport transfers from Ben Gurion: private rides and prices",
    description: "Pre-book a private TLV airport pickup to Jerusalem, Tel Aviv, Haifa or the Dead Sea. Compare weekday starting rates and request a vehicle quote.",
    path: "/airport-transfers/",
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
    ...airportDestinationCards.filter((card) => card.popular).map((card) => card.photo),
    airportTransferPhotos["moshe"]!,
  ].filter(hasPublicPhotoCredit);
  return <main className="pb-12">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/airport-transfers/" }]}
      title="Private airport transfers from Ben Gurion Airport"
      intro="Arrange a private pickup from Ben Gurion Airport (TLV) to Jerusalem, Tel Aviv, Haifa, the Dead Sea or elsewhere in Israel. See my starting fares, request a quote or explore other booking platforms."
      actions={<a href="#request-quote" className="inline-flex min-h-10 items-center rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary underline-offset-4 hover:bg-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a personal quote</a>}
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
        <p><strong>About starting prices:</strong> One-way weekday fares for my private-transfer service, per vehicle for up to four passengers. Night, weekend and holiday supplements may apply and will be included in your final quote. Larger groups need a separate quote. No extra charges are added after the full price is confirmed.</p>
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
      <section id="useful-information" aria-labelledby="tips-h" className="mt-4 rounded-xl border bg-secondary/20 px-4 py-3">
        <h2 id="tips-h" className="text-sm font-semibold">{airportTransferTips[0]!.title}</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{airportTransferTips[0]!.text}</p>
      </section>
      <AirportBookingPlatforms compact />
      <FaqList faqs={airportTransferFaqs} compact />
      <section id="keep-planning" aria-labelledby="keep-planning-h" className="mt-9">
        <h2 id="keep-planning-h" className="text-2xl font-semibold">Practical travel guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {planningLinks.map((item) => { const Icon = item.icon; return <li key={item.title}>
            <Link to={item.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="min-w-0"><span className="block text-sm font-semibold group-hover:text-primary">{item.title}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span></span>
            </Link>
          </li>; })}
        </ul>
      </section>
      {creditedPhotos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">{[...new Map(creditedPhotos.map((photo) => [photo.src, photo])).values()].map((photo) => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}</ul>
      </details>}
    </div>
  </main>;
}
