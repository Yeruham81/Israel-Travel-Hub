import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, BookOpen, CarFront, Compass, Luggage, MapPinned, MessageSquareText, PlaneLanding, Ship } from "lucide-react";
import { FaqList, HubHeader } from "@/components/Guide";
import { PrivateDriverQuoteForm } from "@/components/PrivateDriverQuoteForm";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { privateDriverBenefits, privateDriverFaqs, privateDriverGuides, privateDriverHero, privateDriverJourneys } from "@/data/privateDriver";
import { PRIVATE_DRIVER_CHECK_DATE } from "@/data/registry";
import { pageMeta } from "@/lib/site";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { portTransferPrefill } from "@/lib/shore-services";
import { parsePrivateDriverSearch, privateTourPrefill } from "@/lib/private-driver-search";

export const Route = createFileRoute("/private-driver-in-israel")({
  validateSearch: parsePrivateDriverSearch,
  head: () => pageMeta({
    title: "Private driver in Israel: intercity transfers and day hire",
    description: "Hire a private driver in Israel for hotel-to-hotel journeys, full-day itineraries and multiple stops. Share your route and request a written quote.",
    path: "/private-driver-in-israel/",
    image: privateDriverHero.src,
    imageAlt: privateDriverHero.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Private driver", path: "/private-driver-in-israel/" }],
  }),
  component: PrivateDriver,
});

const benefitIcons = [MapPinned, Luggage, MessageSquareText] as const;
const planningLinks = [
  { title: "Airport transfers", description: "Private pickups from Ben Gurion Airport.", to: "/airport-transfers/" as const, icon: PlaneLanding },
  { title: "Tours & day trips", description: "Explore more experiences around Israel.", to: "/tours/" as const, icon: Compass },
  { title: "Shore excursions", description: "Plan a day ashore from Haifa or Ashdod.", to: "/shore-excursions/" as const, icon: Ship },
  { title: "Where to stay", description: "Find a convenient base for your journey.", to: "/accommodation/" as const, icon: BedDouble },
  { title: "Car rental", description: "Compare options for driving independently.", to: "/car-rental/" as const, icon: CarFront },
  { title: "All travel guides", description: "Discover more practical tips for Israel.", to: "/travel-blog/" as const, icon: BookOpen },
] as const;
const focusQuote = () => requestAnimationFrame(() => document.getElementById("request-quote")?.focus({ preventScroll: true }));

function PrivateDriver() {
  const transfer = Route.useSearch();
  return <PrivateDriverContent key={String(transfer.port || "") + "-" + String(transfer.transfer || "") + "-" + String(transfer.tour || "")} transfer={transfer} />;
}

function PrivateDriverContent({ transfer }: { transfer: ReturnType<typeof parsePrivateDriverSearch> }) {
  const portFields = portTransferPrefill(transfer);
  const tourFields = privateTourPrefill(transfer);
  const [serviceId, setServiceId] = useState(portFields ? "intercity" : tourFields ? "day-hire" : "");
  const creditedPhotos = [privateDriverHero, ...privateDriverJourneys.map(journey => journey.photo), ...privateDriverGuides.map(guide => guide.photo)];

  return <main className="pb-12" data-testid="private-driver-page">
    <HubHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Private driver", to: "/private-driver-in-israel/" }]}
      eyebrow="Travel at your own pace"
      title="Private driver in Israel"
      intro="From hotel-to-hotel transfers to a full day exploring Israel, I'll help arrange a private driver around your route and group. Tell me what you have in mind, and I'll prepare a personal quote."
      checkedAt={PRIVATE_DRIVER_CHECK_DATE}
      image={<GuideHeroMedia src={privateDriverHero.src} alt={privateDriverHero.alt} compact />}
      actions={<a href="#request-quote" onClick={focusQuote} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a personal quote</a>}
    />

    <div className="mx-auto max-w-5xl px-4">
      <section id="service-overview" aria-labelledby="service-overview-h" className="mt-9 scroll-mt-24" data-testid="driver-service-overview">
        <h2 id="service-overview-h" className="text-2xl font-semibold sm:text-3xl">Private driver service in Israel: travel on your own terms</h2>
        <div className="mt-3 max-w-4xl space-y-4 text-[15px] leading-7 sm:text-base">
          <p>Hiring a private car and driver in Israel gives you a direct journey planned around your own schedule. Instead of driving yourself, navigating unfamiliar roads or arranging several separate taxis, you can agree on one pickup, your preferred route and a final drop-off. I help arrange private transport between hotels and cities, a day of sightseeing with selected stops, or a longer journey that combines travel and visits along the way. You choose the places that matter to you, and I'll help work out realistic timing.</p>
          <h3 className="pt-1 text-lg font-semibold">Who is a private driver suitable for?</h3>
          <p>This service can work well for couples, families with children, friends travelling together, business visitors with several appointments, and travellers carrying luggage between accommodations. It is also worth considering if you have limited time in Israel, prefer door-to-door transport, or want a more relaxed pace with planned breaks. For older travellers or anyone with particular mobility needs, please tell me what support is required so I can check the vehicle and arrangements in advance.</p>
          <p><strong>What is included?</strong> Your quote will describe the agreed transport, route, vehicle, pickup arrangements and any included waiting time. A private driver provides transportation rather than licensed tour guiding; entrance tickets, guiding and other extras should be arranged separately unless specifically confirmed. Share your dates, destinations, number of passengers and any special requests, and I'll reply with the options and relevant booking terms.</p>
        </div>
      </section>

      <section id="journeys" aria-labelledby="journeys-h" className="mt-8 scroll-mt-24">
        <h2 id="journeys-h" className="text-2xl font-semibold">Choose the journey that suits you</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">A direct transfer, a day out or several stops along the way — choose a starting point and I'll help with the details.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {privateDriverJourneys.map(journey => <article key={journey.id} className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/40" data-testid="driver-journey-card">
            <img src={journey.photo.src} alt={journey.photo.alt} width={360} height={240} loading="lazy" decoding="async" className="aspect-[16/9] h-auto w-full object-cover" />
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
              <h3 className="text-base font-semibold leading-snug sm:text-lg">{journey.title}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">{journey.text}</p>
              <a href="#request-quote" onClick={() => { setServiceId(journey.id); focusQuote(); }} className="mt-2 inline-flex min-h-8 items-center self-start text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request this journey</a>
            </div>
          </article>)}
        </div>
      </section>

      <section id="benefits" aria-labelledby="benefits-h" className="mt-8 scroll-mt-24">
        <h2 id="benefits-h" className="text-2xl font-semibold">A journey planned around you</h2>
        <div className="mt-4 grid gap-3 rounded-2xl border bg-secondary/25 p-3 sm:grid-cols-3 sm:p-4">
          {privateDriverBenefits.map((benefit, index) => {
            const Icon = benefitIcons[index]!;
            return <div key={benefit.title} className="min-w-0 rounded-xl bg-card/70 p-3 sm:bg-transparent sm:p-2">
              <Icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-2 text-base font-semibold leading-snug">{benefit.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
            </div>;
          })}
        </div>
      </section>

      {portFields && <p className="mt-6 rounded-xl border bg-secondary/40 px-4 py-3 text-sm leading-relaxed">Travelling from {portFields.pickup}? Please add your exact pickup point, destination and any ship or flight details in the form so I can check the arrangements for your journey.</p>}
      {tourFields && <p className="mt-6 rounded-xl border bg-secondary/40 px-4 py-3 text-sm leading-relaxed">Planning a private day out? Please include the itinerary you'd like, your pickup point and any changes you have in mind in the form below.</p>}
      <PrivateDriverQuoteForm serviceId={serviceId} onServiceChange={setServiceId} />

      <FaqList faqs={privateDriverFaqs} compact />
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-primary/15 bg-secondary/25 px-4 py-4 sm:flex-row sm:items-center sm:justify-between" data-testid="driver-after-faq-cta">
        <div className="min-w-0">
          <p className="text-sm font-semibold">Have a route in mind?</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Share your date, stops and group size, and I'll help you plan a private journey.</p>
        </div>
        <a href="#request-quote" onClick={focusQuote} className="inline-flex min-h-9 shrink-0 items-center justify-center self-start rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:self-center">Request a quote</a>
      </div>

      <section id="travel-guides" aria-labelledby="guides-h" className="mt-9 scroll-mt-24">
        <h2 id="guides-h" className="text-2xl font-semibold">Related travel guides</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {privateDriverGuides.map(guide => <li key={guide.to} className="min-w-0">
            <Link to={guide.to} className="editorial-card-link group flex h-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" data-testid="driver-guide-card">
              <img src={guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src} alt={guideHeroPhotoForPath(String(guide.to))?.alt ?? guide.photo.alt} width={112} height={75} loading="lazy" decoding="async" className="aspect-[3/2] w-full sm:shrink-0 rounded-lg object-cover sm:w-24 lg:w-20 xl:w-24" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{guide.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{guide.text}</span>
                
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="next-steps" aria-labelledby="next-steps-h" className="mt-9 scroll-mt-24">
        <h2 id="next-steps-h" className="text-2xl font-semibold">Plan the next part of your trip</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {planningLinks.map(item => {
            const Icon = item.icon;
            return <li key={item.to} className="min-w-0">
              <Link to={item.to} className="group flex h-full min-w-0 flex-col items-start gap-3 sm:flex-row rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>

      <StayPhotoCredits photos={creditedPhotos} />
    </div>
  </main>;
}
