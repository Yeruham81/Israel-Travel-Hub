import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Baby, CarFront, Clock3, Handshake, Luggage, PlaneLanding } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { AirportDestinationCard as DestinationCard } from "@/components/AirportDestinationCard";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { airportDestinationCards, airportTransferPhotos, airportTransferBenefits, airportTransferTips, airportTransferFaqs, airportRelatedLinks } from "@/data/airportTransfers";
import { AIRPORT_TRANSFER_CHECK_DATE } from "@/data/registry";
import { PageUpdated } from "@/components/PageUpdated";
import { pageMeta } from "@/lib/site";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";
import { ExchangeRateNote } from "@/components/CurrencyRates";

export const Route = createFileRoute("/transfers/")({
  validateSearch: parseAirportTransferSearch,
  head: () => pageMeta({
    title: "Airport transfers from Ben Gurion Airport: destinations & prices",
    description: "Pre-book a private transfer from Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa, the Dead Sea and more. See starting prices and request a quote from Moshe Barak.",
    path: "/transfers/",
    crumbs: [{ name: "Home", path: "/" }, { name: "Airport transfers", path: "/transfers/" }],
  }),
  component: Airport,
});

const benefitIcons = [Handshake, PlaneLanding, CarFront, Luggage, Baby, Clock3];
function Airport() {
  const { destination } = Route.useSearch();
  const [destinationId, setDestinationId] = useState(destination ?? "");
  useEffect(() => setDestinationId(destination ?? ""), [destination]);
  const choose = (id: string) => {
    setDestinationId(id);
    requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));
  };
  return <main className="mx-auto max-w-5xl px-4 pb-8">
    <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/transfers/" }]}
      eyebrow="Private airport transfers · TLV" title="Airport transfers"
      intro="Arrange a private pickup from Ben Gurion Airport (TLV) to your hotel or another destination in Israel. Explore starting prices and request a personal quote from Moshe Barak." />
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3 text-sm"><span className="font-medium">Pre-booked pickup</span><span aria-hidden>·</span><span>Your own vehicle</span><span aria-hidden>·</span><span>Your agreed destination</span><a href="#request-quote" className="ml-auto font-semibold text-primary underline underline-offset-4">Request your quote</a></div>

    <section id="popular-destinations" aria-labelledby="popular-h" className="mt-10">
      <p className="eyebrow">Your first stop in Israel</p><h2 id="popular-h" className="mt-2 text-3xl">Popular private transfers</h2>
      <p className="mt-3 text-muted-foreground">Explore the route details or request a personal quote for your destination.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">{airportDestinationCards.filter((card) => card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} />)}</div>
    </section>
    <section id="more-destinations" aria-labelledby="more-h" className="mt-10">
      <h2 id="more-h" className="text-3xl">More destinations from Ben Gurion Airport</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-5">{airportDestinationCards.filter((card) => !card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} layout="compact" />)}<DestinationCard id="other" destination="Your destination" photo={airportTransferPhotos["other"]!} onChoose={choose} layout="compact" /></div>
    </section>
    <div className="mt-5 rounded-xl border bg-secondary/40 p-4 text-sm leading-relaxed" data-testid="airport-rate-terms">
      <p><strong>About these starting prices:</strong> one-way weekday rates for Moshe Barak's service, per vehicle for up to four passengers. Night, weekend and holiday supplements may apply. Larger groups need a separate quote.</p>
      <p className="mt-2 text-muted-foreground">Final price and availability are confirmed before booking.</p>
      <PageUpdated date={AIRPORT_TRANSFER_CHECK_DATE} />
      <ExchangeRateNote className="mt-3" />
    </div>

    <TransferQuoteForm destinationId={destinationId} onDestinationChange={setDestinationId} />

    <section id="benefits" aria-labelledby="benefits-h" className="mt-16">
      <p className="eyebrow">Travel with a plan</p><h2 id="benefits-h" className="mt-2 text-3xl">Why arrange your airport pickup with Moshe?</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{airportTransferBenefits.map((benefit, index) => { const Icon = benefitIcons[index]!; return <div key={benefit.title} className="rounded-xl border bg-card p-5"><Icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-4 text-xl">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></div>; })}</div>
    </section>
    <section id="useful-information" aria-labelledby="tips-h" className="mt-14">
      <h2 id="tips-h" className="text-3xl">A smoother arrival starts before you fly</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{airportTransferTips.map((tip, index) => <article key={tip.title} className="rounded-xl bg-secondary/60 p-6"><p className="text-xs font-semibold text-primary">0{index + 1}</p><h3 className="mt-2 text-2xl">{tip.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tip.text}</p></article>)}</div>
    </section>
    <FaqList faqs={airportTransferFaqs} />

    <AirportBookingPlatforms />

    <section id="keep-planning" aria-labelledby="planning-h" className="mt-14">
      <p className="eyebrow">Make more of your visit</p><h2 id="planning-h" className="mt-2 text-3xl">Your ride is only the start</h2><p className="mt-3 text-muted-foreground">Find the right place to stay and discover what to do when you arrive.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{airportRelatedLinks.map((link) => <li key={link.to}><Link to={link.to} className="block h-full rounded-xl border bg-card px-5 py-4 font-medium text-primary hover:border-primary">{link.label}</Link></li>)}</ul>
    </section>
    <StayPhotoCredits photos={Object.values(airportTransferPhotos)} />
  </main>;
}
