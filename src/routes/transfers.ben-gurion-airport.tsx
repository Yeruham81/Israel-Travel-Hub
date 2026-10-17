import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Baby, CarFront, Clock3, Handshake, Luggage, PlaneLanding } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { AirportDestinationCard as DestinationCard } from "@/components/AirportDestinationCard";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { airportDestinationCards, airportTransferPhotos, airportTransferBenefits, airportTransferTips, airportTransferFaqs, airportRelatedLinks } from "@/data/airportTransfers";
import { AIRPORT_TRANSFER_CHECK_DATE, formatCheckDate, getSource, linksForPage } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/transfers/ben-gurion-airport")({
  validateSearch: (search: Record<string, unknown>): { destination?: string } => {
    const destination = search["destination"];
    return typeof destination === "string" && (destination === "other" || airportDestinationCards.some((card) => card.id === destination)) ? { destination } : {};
  },
  head: () => pageMeta({
    title: "Private transfers from Ben Gurion Airport: destinations & prices",
    description: "Pre-book a private transfer from Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa, the Dead Sea and more. See starting prices and request a quote from Moshe Barak.",
    path: "/transfers/ben-gurion-airport/",
    crumbs: [{ name: "Home", path: "/" }, { name: "Airport transfers", path: "/transfers/" }, { name: "Ben Gurion Airport", path: "/transfers/ben-gurion-airport/" }],
  }),
  component: Airport,
});

const benefitIcons = [Handshake, PlaneLanding, CarFront, Luggage, Baby, Clock3];
const bannerStyles: Record<string, string> = {
  kiwitaxi: "border-emerald-200 bg-emerald-50 text-emerald-950",
  welcome: "border-amber-200 bg-amber-50 text-amber-950",
  intui: "border-sky-200 bg-sky-50 text-sky-950",
  gettransfer: "border-indigo-200 bg-indigo-50 text-indigo-950",
};

function Airport() {
  const { destination } = Route.useSearch();
  const [destinationId, setDestinationId] = useState(destination ?? "");
  useEffect(() => setDestinationId(destination ?? ""), [destination]);
  const source = getSource("moshe-airport-transfers");
  const platforms = linksForPage("airport-private-transfers");
  const choose = (id: string) => {
    setDestinationId(id);
    requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));
  };
  return <main className="mx-auto max-w-5xl px-4 pb-8">
    <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/transfers/" }, { name: "Ben Gurion Airport", to: "/transfers/ben-gurion-airport/" }]}
      eyebrow="Private airport transfers · TLV" title="Transfers from Ben Gurion Airport"
      intro="Start your Israel trip with your ride arranged. Choose a destination, explore Moshe Barak's published starting prices and request a private airport pickup for your party." />
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3 text-sm"><span className="font-medium">Pre-booked pickup</span><span aria-hidden>·</span><span>Your own vehicle</span><span aria-hidden>·</span><span>Your agreed destination</span><a href="#request-quote" className="ml-auto font-semibold text-primary underline underline-offset-4">Request your quote</a></div>

    <section id="popular-destinations" aria-labelledby="popular-h" className="mt-10">
      <p className="eyebrow">Your first stop in Israel</p><h2 id="popular-h" className="mt-2 text-3xl">Popular private transfers</h2>
      <p className="mt-3 text-muted-foreground">Explore the route details or request a personal quote for your destination.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">{airportDestinationCards.filter((card) => card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} />)}</div>
    </section>
    <section id="more-destinations" aria-labelledby="more-h" className="mt-10">
      <h2 id="more-h" className="text-3xl">More destinations across Israel</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">{airportDestinationCards.filter((card) => !card.popular).map((card) => <DestinationCard key={card.id} id={card.id} destination={card.destination} price={card.price} photo={card.photo} onChoose={choose} />)}<DestinationCard id="other" destination="Your destination" photo={airportTransferPhotos["other"]!} onChoose={choose} /></div>
    </section>
    <div className="mt-5 rounded-xl border bg-secondary/40 p-4 text-sm leading-relaxed" data-testid="airport-rate-terms">
      <p><strong>About these starting prices:</strong> one-way weekday rates for Moshe Barak's service, per vehicle for up to four passengers. Night, weekend and holiday supplements may apply. Larger groups need a separate quote.</p>
      <p className="mt-2 text-muted-foreground">Final price and availability are confirmed before booking. <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">Published operator rates<span className="sr-only"> (opens in a new tab)</span></a> checked {formatCheckDate(AIRPORT_TRANSFER_CHECK_DATE)}.</p>
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

    <section id="booking-platforms" aria-labelledby="platforms-h" className="mt-16 rounded-2xl border p-5 sm:p-8">
      <p className="eyebrow">More ways to arrange your ride</p><h2 id="platforms-h" className="mt-2 text-3xl">Prefer to book through a platform?</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">Explore these booking sites for your airport pickup. The starting prices above belong to Moshe's service; each platform supplies its own offers and terms. Enter your exact route and trip details there.</p>
      {platforms.some((p) => p.isAffiliate) && <p className="mt-3 text-sm">Links marked “Sponsored link” may earn us a commission at no extra cost to you.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{platforms.map((platform) => <a key={platform.id} href={platform.url} target="_blank" rel={relFor(platform.isAffiliate)} onClick={() => recordOutboundClick({ pageId: "airport-private-transfers", productId: platform.id, offerId: platform.id })} className={`flex h-full flex-col rounded-xl border p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${bannerStyles[platform.partnerId!] || "bg-secondary"}`} data-testid="airport-platform-banner">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Private transfer booking</p><h3 className="mt-2 font-sans text-2xl font-bold tracking-tight">{platform.providerName}</h3><p className="mt-3 flex-1 text-sm leading-relaxed">{platform.summary}</p>{platform.isAffiliate && <p className="mt-3 text-xs font-semibold">Sponsored link</p>}<span className="mt-5 text-sm font-semibold underline underline-offset-4">{platform.ctaLabel}</span><span className="sr-only"> (opens in a new tab)</span>
      </a>)}</div>
    </section>

    <section id="keep-planning" aria-labelledby="planning-h" className="mt-14">
      <p className="eyebrow">Make more of your visit</p><h2 id="planning-h" className="mt-2 text-3xl">Your ride is only the start</h2><p className="mt-3 text-muted-foreground">Find the right place to stay and discover what to do when you arrive.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{airportRelatedLinks.map((link) => <li key={link.to}><Link to={link.to} className="block h-full rounded-xl border bg-card px-5 py-4 font-medium text-primary hover:border-primary">{link.label}</Link></li>)}</ul>
    </section>
    <StayPhotoCredits photos={Object.values(airportTransferPhotos)} />
  </main>;
}
