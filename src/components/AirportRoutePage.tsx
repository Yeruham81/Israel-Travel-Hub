import { Link } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, RelatedLinks } from "@/components/Guide";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { airportTransferNav } from "@/data/nav";
import { AirportBookingPlatforms } from "@/components/AirportBookingPlatforms";
import { AIRPORT_TRANSFER_CHECK_DATE, airportTransferRoutes, travelGuidePaths, type AirportTransferRouteId } from "@/data/registry";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { ExchangeRateNote, PriceDisplay } from "@/components/CurrencyRates";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";

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
  const head = pageMeta({ title: guide.title, description: guide.description, path: guide.path, crumbs: crumbsFor(id), image: guide.photo.src, imageAlt: guide.photo.alt });
  const url = CANONICAL_ORIGIN + guide.path;
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url,
    name: guide.title, description: guide.description, inLanguage: "en", author: authorLd(),
    primaryImageOfPage: { "@type": "ImageObject", url: new URL(guide.photo.src, CANONICAL_ORIGIN).href },
    mainEntity: { "@type": "Service", name: guide.title, serviceType: "Private airport transfer",
      provider: { "@type": "Person", name: "Moshe Barak", url: `${CANONICAL_ORIGIN}/about-moshe-barak/#moshe-barak` },
      areaServed: [{ "@type": "Place", name: "Ben Gurion Airport" }, { "@type": "Place", name: guide.city }],
    },
  })] };
}

const pickupSteps = [
  { title: "Send your arrival details", text: "Use the flight's arrival date and time in Israel local time. Add the flight number, exact hotel or address, all passengers, luggage and children's ages. Request at least 24 hours ahead." },
  { title: "Agree the full quote", text: "Confirm vehicle and luggage capacity, requested child seats, night or holiday supplements, included waiting, flight-delay arrangements, payment and cancellation terms. Your ride is booked only after confirmation." },
  { title: "Save the meeting instructions", text: "Use the meeting point and contact number in your booking confirmation for the terminal where you actually arrive. Keep them available offline and contact the operator if airport formalities take longer than expected." },
];

const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

export function AirportRoutePage({ id }: { id: AirportTransferRouteId }) {
  const guide = getAirportRouteGuide(id);
  const journeyGuide = airportJourneyGuides[id === "dead-sea" ? "ein-bokek" : id];
  const { price } = guide.rate;
  const faqs = [
    ...guide.faqs,
    { q: "Is the starting price for the whole vehicle?", a: `The published starting rate of ILS ${price.amount.toLocaleString("en-US")} is a one-way weekday price per vehicle for up to four passengers. Night, weekend and holiday supplements may apply. The vehicle must fit your luggage; larger groups and special requirements need a separate quote. I confirm the final total and availability.` },
    { q: "How do I send the request and confirm the booking?", a: "Complete the form and press Send quote request to email your details directly to me. Wait for the on-page confirmation. Ask me to confirm your quote and booking in writing before relying on the pickup." },
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 lg:pb-8">
      <div className="pt-6"><Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} /></div>
      <header className="mt-7 grid items-center gap-7 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <p className="eyebrow">Your private airport pickup · TLV</p>
          <h1 className="mt-3 text-4xl leading-[1.1] md:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3 rounded-xl border bg-secondary/50 p-4" data-testid="route-starting-rate">
            <div><p className="text-xs font-medium text-muted-foreground">Published starting rate</p><PriceDisplay amount={price.amount} size="hero" className="mt-1" /><p className="mt-2 text-xs text-muted-foreground">One way · per vehicle · up to 4</p></div>
            <div><p className="text-xs font-medium text-muted-foreground">Drive after pickup</p><p className="mt-1 font-semibold">{guide.driveTime}</p><p className="mt-1 text-xs text-muted-foreground">Guide estimate · traffic can add time</p></div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Weekday starting rate. Night, weekend and holiday supplements may apply. Final price and availability by confirmation; larger groups need a quote.</p>
          <ExchangeRateNote className="mt-3" />
          <a href="#request-quote" onClick={focusQuote} className="btn btn-primary mt-5">Request your airport transfer</a>
          <p className="mt-3 text-sm text-muted-foreground">Private vehicle for your party · Exact hotel or address · Request at least 24 hours ahead</p>
          <PageUpdated date={AIRPORT_TRANSFER_CHECK_DATE} />
        </div>
        <img src={guide.photo.src} alt={guide.photo.alt} width={900} height={675} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[3/4] lg:max-h-[560px]" />
      </header>

      <AuthorCard />
      <nav aria-label="Transfer planning next steps" className="mt-5 flex flex-wrap gap-4 text-sm">
        <a href="#journey-details" className="font-semibold text-primary underline">Drive time & destination</a>
        <Link to={travelGuidePaths.shabbat} className="text-primary underline">Friday-night or Saturday arrival?</Link>
        <Link to={guide.related[0]?.to || "/hotels/"} className="text-primary underline">Choose your hotel area</Link>
      </nav>

      <section id="journey-details" aria-labelledby="journey-h" className="mt-14 scroll-mt-24">
        <p className="eyebrow">Your route, planned properly</p>
        <h2 id="journey-h" className="mt-2 text-3xl">{guide.journeyTitle}</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">{guide.journeyText}</p>
      </section>
      <section id="taxi-or-transfer" aria-labelledby="taxi-or-transfer-h" className="mt-10 rounded-2xl border bg-card p-5 sm:p-7">
        <h2 id="taxi-or-transfer-h" className="text-2xl">Private transfer or airport taxi to {guide.city}?</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">This page is for a private vehicle arranged in advance for your party, with pickup instructions and a quoted total to confirm with me. An on-arrival licensed airport taxi instead uses the authorized taxi queue and a regulated meter. These are different booking arrangements.</p>
        <p className="mt-3 text-sm leading-relaxed">For an on-arrival metered ride, read my <Link to={travelGuidePaths.airportTaxis} className="font-semibold text-primary underline">official airport taxi pickup guide</Link> and <Link to={travelGuidePaths.taxiFares} className="font-semibold text-primary underline">regulated taxi fares guide</Link>, or consult the <a href="https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Israel Airports Authority instructions<span className="sr-only"> (opens in a new tab)</span></a>.</p>
        <p className="mt-3 text-sm leading-relaxed">For an independent overview of other ways to reach your destination, read my <Link to={journeyGuide.path} className="font-semibold text-primary underline">airport-to-{guide.city} travel comparison</Link>. This page is exclusively about a separately arranged private vehicle, its agreed pickup and a written quote from me.</p>
      </section>
      <section id="drop-off" aria-labelledby="dropoff-h" className="mt-12">
        <h2 id="dropoff-h" className="text-3xl">{guide.areasTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{guide.areas.map((area) => <article key={area.title} className="rounded-xl border bg-card p-5"><h3 className="text-xl">{area.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.text}</p></article>)}</div>
      </section>
      <section aria-labelledby="planning-h" className="mt-10 rounded-2xl bg-secondary/60 p-6 sm:p-8">
        <h2 id="planning-h" className="text-3xl">{guide.planningTitle}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{guide.planningText}</p>
        <a href="#request-quote" onClick={focusQuote} className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">Add your details to the quote request</a>
      </section>
      <section id="pickup" aria-labelledby="pickup-h" className="mt-14">
        <h2 id="pickup-h" className="text-3xl">Arrange the pickup before you fly</h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">{pickupSteps.map((step, index) => <li key={step.title} className="rounded-xl border bg-card p-5"><p className="text-xs font-semibold text-primary">0{index + 1}</p><h3 className="mt-2 text-xl">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
      </section>
      <TransferQuoteForm destinationId={id} fixedDestination />
      <FaqList faqs={faqs} />
      <section className="mt-14 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8" aria-labelledby="ready-h">
        <h2 id="ready-h" className="text-3xl">Your flight. Your destination. Your private ride.</h2>
        <p className="mt-3 opacity-90">Tell me when you arrive and where you're staying in {guide.city}. Ask for the full price and pickup details before confirming your booking.</p>
        <a href="#request-quote" onClick={focusQuote} className="btn btn-light mt-5">Request a personal quote</a>
      </section>
      <RelatedLinks title="Plan your stay" items={[{ label: "Compare other ways to reach your destination", to: journeyGuide.path }, ...guide.related, { label: "Ben Gurion arrival tips", to: travelGuidePaths.arrival }, { label: "Choosing an eSIM for Israel", to: travelGuidePaths.esim }]} />
      <section aria-labelledby="other-routes-h" className="mt-12">
        <h2 id="other-routes-h" className="text-2xl">Other airport transfer routes</h2>
        <ul className="mt-4 flex flex-wrap gap-3">{airportTransferRoutes.filter((route) => route.id !== id).map((route) => <li key={route.id}><Link to={route.path} className="chip inline-block">Ben Gurion to {getAirportRouteGuide(route.id).city}</Link></li>)}<li><Link to="/transfers/" className="chip inline-block">All destinations</Link></li></ul>
      </section>
      <details className="mt-10 rounded-xl border p-5 text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">Route planning notes</summary>
        <p className="mt-3">Driving times begin after pickup and are planning estimates, not live traffic predictions. Starting rates are for the conditions stated above. Your final quote and booking require confirmation.</p>
      </details>
      <AirportBookingPlatforms pageId={`airport-route-${id}`} destination={guide.city} />
      <StayPhotoCredits photos={airportTransferPhotos["moshe"] ? [guide.photo, airportTransferPhotos["moshe"]] : [guide.photo]} />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><p className="min-w-0 text-sm font-medium">Private transfer<br /><span className="text-xs text-muted-foreground">Ben Gurion to {guide.city}</span></p><a href="#request-quote" onClick={focusQuote} className="btn btn-primary shrink-0 text-sm">Request a quote</a></div>
      </div>
    </main>
  );
}
