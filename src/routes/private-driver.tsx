import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock3, Luggage, MapPinned, MessageSquareText } from "lucide-react";
import { Breadcrumbs, Checklist, FaqList, RelatedLinks } from "@/components/Guide";
import { PrivateDriverQuoteForm } from "@/components/PrivateDriverQuoteForm";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { privateDriverBenefits, privateDriverFaqs, privateDriverGuides, privateDriverHero, privateDriverJourneys, privateDriverSteps } from "@/data/privateDriver";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { PRIVATE_DRIVER_CHECK_DATE } from "@/data/registry";
import { pageMeta } from "@/lib/site";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";

export const Route = createFileRoute("/private-driver")({
  head: () => pageMeta({
    title: "Private driver in Israel: intercity transfers and day hire",
    description: "Hire a private driver in Israel for hotel-to-hotel journeys, full-day itineraries and multiple stops. Share your route and request a written quote.",
    path: "/private-driver/",
    crumbs: [{ name: "Home", path: "/" }, { name: "Private driver", path: "/private-driver/" }],
  }),
  component: PrivateDriver,
});

const benefitIcons = [MapPinned, Luggage, Clock3, MessageSquareText];
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

function PrivateDriver() {
  const [serviceId, setServiceId] = useState("");
  return <main className="mx-auto max-w-5xl px-4 pb-24 lg:pb-8">
    <div className="pt-6"><Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Private driver", to: "/private-driver/" }]} /></div>
    <header className="mt-7 grid items-center gap-7 lg:grid-cols-[1.2fr_1fr]">
      <div className="min-w-0"><p className="eyebrow">Your journey, your pace</p><h1 className="mt-3 text-4xl leading-[1.1] md:text-5xl">Private driver in Israel</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Travel between hotels, plan a day out or connect several stops with a private driver. Share your route with Moshe Barak and agree the vehicle, itinerary and full price before you book.</p>
        <a href="#request-quote" onClick={focusQuote} className="btn btn-primary mt-6">Request your private driver</a><p className="mt-3 text-sm text-muted-foreground">A personal quote · Your agreed itinerary · No booking until confirmation</p>
        <PageUpdated date={PRIVATE_DRIVER_CHECK_DATE} />
      </div>
      <img src={privateDriverHero.src} alt={privateDriverHero.alt} width={755} height={503} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-2xl object-cover" />
    </header>
    <AuthorCard />
    <section id="journeys" aria-labelledby="journeys-h" className="mt-12">
      <p className="eyebrow">Choose the journey you need</p><h2 id="journeys-h" className="mt-2 text-3xl">Intercity transfers & day hire</h2><p className="mt-3 leading-relaxed text-muted-foreground">Start with the type of trip, then tell us the details. Every route is quoted individually.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{privateDriverJourneys.map((journey) => <article key={journey.id} className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card" data-testid="driver-journey-card">
        <img src={journey.photo.src} alt={journey.photo.alt} width={360} height={240} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
        <div className="flex flex-1 flex-col p-5"><h3 className="text-2xl">{journey.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{journey.text}</p><a href="#request-quote" onClick={() => { setServiceId(journey.id); focusQuote(); }} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">Plan this journey<ArrowRight className="h-4 w-4" aria-hidden /></a></div>
      </article>)}</div>
    </section>
    <PrivateDriverQuoteForm serviceId={serviceId} onServiceChange={setServiceId} />
    <section id="benefits" aria-labelledby="benefits-h" className="mt-14">
      <p className="eyebrow">Make the day work for you</p><h2 id="benefits-h" className="mt-2 text-3xl">What to arrange with your private driver</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{privateDriverBenefits.map((benefit, index) => { const Icon = benefitIcons[index]!; return <article key={benefit.title} className="rounded-xl border bg-card p-6"><Icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-4 text-2xl">{benefit.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></article>; })}</div>
    </section>
    <section id="planning" aria-labelledby="planning-h" className="mt-14">
      <h2 id="planning-h" className="text-3xl">Plan the day before requesting a quote</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Checklist title="Share the details" items={["Pickup and final drop-off addresses", "Date, preferred time and any fixed appointments", "Every stop and the time you would like there", "All passengers, bags and children's ages", "Guide language, mobility or access needs"]} />
        <Checklist title="Confirm in writing" items={["Vehicle size, luggage capacity and total price", "Included hours, distance and waiting time", "Parking, tolls, extra stops and overtime", "Guiding, entrance tickets and meals", "Payment, cancellation and itinerary changes"]} />
      </div>
      <div className="mt-5 rounded-2xl bg-secondary/60 p-6"><h3 className="text-2xl">A driver and a tour guide are different services</h3><p className="mt-3 leading-relaxed text-muted-foreground">Use a driver for transportation and an agreed route. If you want guided visits, request a licensed guide and the language you need; ask what is included and what costs extra. Do not assume admission, meals or guiding are part of a transport quote.</p><p className="mt-3 text-sm text-muted-foreground">Prefer to drive yourself? Explore <Link to="/car-rental/" className="font-semibold text-primary underline">car rental in Israel</Link> and compare the full cost for your plans.</p></div>
    </section>
    <section id="how-it-works" aria-labelledby="steps-h" className="mt-14"><h2 id="steps-h" className="text-3xl">From an idea to an agreed itinerary</h2><ol className="mt-5 grid gap-4 md:grid-cols-3">{privateDriverSteps.map((step, index) => <li key={step.title} className="rounded-xl border p-5"><p className="text-xs font-semibold text-primary">0{index + 1}</p><h3 className="mt-3 text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol></section>
    <FaqList faqs={privateDriverFaqs} />
    <section aria-labelledby="ready-h" className="mt-14 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8"><h2 id="ready-h" className="text-3xl">Tell Moshe where you want to go</h2><p className="mt-3 max-w-2xl leading-relaxed opacity-90">A simple hotel transfer or a day with several stops: share what matters to your party and ask for a personal proposal.</p><a href="#request-quote" onClick={focusQuote} className="btn btn-light mt-5">Request a quote from Moshe</a></section>
    <section id="travel-guides" aria-labelledby="guides-h" className="mt-14">
      <p className="eyebrow">Keep planning your visit</p><h2 id="guides-h" className="mt-2 text-3xl">Guides for your route and your stay</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{privateDriverGuides.map((guide) => <Link key={guide.to} to={guide.to} className="flex h-full flex-col overflow-hidden rounded-xl border bg-card hover:border-primary focus-visible:outline-2 focus-visible:outline-primary" data-testid="driver-guide-card"><img src={guide.photo.src} alt={guide.photo.alt} width={360} height={240} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" /><div className="flex flex-1 flex-col p-5"><h3 className="text-2xl">{guide.title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.text}</p><span className="mt-4 text-sm font-semibold text-primary">Read the guide <span aria-hidden>→</span></span></div></Link>)}</div>
    </section>
    <RelatedLinks title="More ways to travel in Israel" items={[
      { label: "Airport transfers", to: "/transfers/", note: "Private Ben Gurion pickups and destination starting rates" },
      { label: "Car rental", to: "/car-rental/", note: "For an independent driving itinerary" },
      { label: "Tours & day trips", to: "/tours/", note: "Explore organised visits and day-trip options" },
      { label: "Shore excursions", to: "/shore-excursions/", note: "Plan around a Haifa or Ashdod port call" },
    ]} />
    <StayPhotoCredits photos={[privateDriverHero, ...privateDriverJourneys.map((journey) => journey.photo), ...privateDriverGuides.map((guide) => guide.photo), airportTransferPhotos["moshe"]!]} />
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><p className="text-sm font-medium">Your private driver<br /><span className="text-xs text-muted-foreground">A quote for your itinerary</span></p><a href="#request-quote" onClick={focusQuote} className="btn btn-primary shrink-0 text-sm">Request a quote</a></div></div>
  </main>;
}
