import { IconTripPlanningLinks } from "@/components/IconTripPlanningLinks";
import { ShorePortPlanning } from "@/components/ShorePlanning";
import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Compass, Smartphone, TrainFront, CarFront, CloudSun } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs, FaqList, SourceList, OnThisPage } from "@/components/Guide";
import { PhotoCreditsDisclosure, photoCreditEntries } from "@/components/PhotoCreditsDisclosure";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { ShoreQuoteForm } from "@/components/ShoreQuoteForm";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { getShoreCatalog, getShorePort } from "@/data/shoreExcursions";
import { publicSources, shorePorts, travelGuidePaths, type ShorePortId } from "@/data/registry";
import { CANONICAL_ORIGIN, jsonLd, organizationPublisherLd, pageMeta } from "@/lib/site";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { ShoreServiceCatalog } from "@/components/ShoreServiceCatalog";
import {
  parseShoreServiceSearch,
  shoreSourceIds,
  type ShoreServiceSearch,
} from "@/lib/shore-services";
import { SHORE_EXCURSION_UPDATED_DATE } from "@/data/shoreHub";

function crumbsFor(id: ShorePortId) {
  return [
    { name: "Home", path: "/" as const },
    { name: "Shore excursions", path: "/shore-excursions/" as const },
    { name: `From ${shorePorts[id].name} Port`, path: shorePorts[id].path },
  ];
}

export function shorePortMeta(id: ShorePortId) {
  const port = getShorePort(id);
  const meta = pageMeta({
    title: port.title,
    description: port.description,
    path: port.path,
    type: "article",
    crumbs: crumbsFor(id),
    image: port.photo.src,
    imageAlt: port.photo.alt,
  });
  const imageUrl = new URL(port.photo.src, CANONICAL_ORIGIN).href;
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: port.title,
        description: port.description,
        mainEntityOfPage: `${CANONICAL_ORIGIN}${port.path}`,
        inLanguage: "en",
        dateModified: SHORE_EXCURSION_UPDATED_DATE,
        author: authorLd(),
        publisher: organizationPublisherLd(),
        image: imageUrl,
        citation: publicSources(shoreSourceIds(id)).map((source) => source.url),
      }),
    ],
  };
}

const practicalGuides = [
  {
    title: "Israel holidays & opening hours",
    description: "Check holidays and closures that may affect your itinerary.",
    to: travelGuidePaths.calendar,
    icon: CalendarDays,
  },
  {
    title: "Travel eSIM for Israel",
    description: "Stay in contact with your driver or tour operator while ashore.",
    to: travelGuidePaths.esim,
    icon: Smartphone,
  },
  {
    title: "Getting around Israel",
    description: "Explore transport choices beyond your cruise excursion.",
    to: travelGuidePaths.israel,
    icon: TrainFront,
  },
  {
    title: "Israel travel tips",
    description: "Prepare for local customs, weather and practical essentials.",
    to: travelGuidePaths.travelTips,
    icon: Compass,
  },
  {
    title: "Taxis in Israel",
    description: "Understand licensed taxis for independent journeys.",
    to: travelGuidePaths.taxis,
    icon: CarFront,
  },
  {
    title: "Best time to visit Israel",
    description: "Seasonal weather and conditions for sightseeing.",
    to: travelGuidePaths.bestTime,
    icon: CloudSun,
  },
] as const;

export function PortPage({
  id,
  filters: routeSearch,
  onFilterChange,
}: {
  id: ShorePortId;
  filters: ShoreServiceSearch;
  onFilterChange: (filters: ShoreServiceSearch) => void;
}) {
  const filters = parseShoreServiceSearch(routeSearch);
  const port = getShorePort(id);
  const [itineraryId, setItineraryId] = useState("");
  const photos = [
    port.photo,
    ...getShoreCatalog(id).map((service) => service.photo),
    ...port.related.map((guide) => guide.photo),
    airportTransferPhotos["moshe"]!,
  ].filter(hasPublicPhotoCredit);
  return (
    <main className="mx-auto max-w-5xl px-4 pb-12">
      <div className="pt-6">
        <Breadcrumbs items={crumbsFor(id).map((crumb) => ({ name: crumb.name, to: crumb.path }))} />
      </div>
      <header className="mt-2">
        <GuideHeroLayout
          image={
            <GuideHeroMedia
              src={port.photo.src}
              alt={port.photo.alt}
              width={710}
              height={473}
              compact
            />
          }
        >
          <p className="eyebrow">Private excursions, guided tours & cruise-port pickup</p>
          <h1 className="guide-page-title mt-3 font-semibold">{port.title}</h1>
          <p
            data-guide-intro
            className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground"
          >
            {port.intro}
          </p>
          <PageUpdated date={SHORE_EXCURSION_UPDATED_DATE} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>
      <OnThisPage
        sections={[
          ["itineraries", "Shore excursions"],
          ["shore-planning", "Compare destinations"],
          ["shore-map", "Destination map"],
          ["port-pickup", "Port pickup"],
          ["return-to-ship", "Return to the ship"],
          ["faq", "FAQ"],
          ["shore-local", "Related guides"],
          ["request-quote", "Contact me"],
        ]}
      />
      <ShoreServiceCatalog
        portId={id}
        filters={filters}
        onFilterChange={onFilterChange}
        itineraryId={itineraryId}
        onSelectItinerary={setItineraryId}
      />
      <ShorePortPlanning id={id} name={port.name} />
      <section id="port-pickup" aria-labelledby="port-pickup-h" className="mt-12 scroll-mt-24">
        <h2 id="port-pickup-h" className="text-3xl">
          {port.portAccess.heading}
        </h2>
        <div className="mt-4 space-y-3 leading-relaxed">
          {port.portAccess.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <a
              href={port.portAccess.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              Official {port.name} Port information
            </a>
            {id === "haifa" && (
              <>
                {" "}
                ·{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=65+HaAtsmaut+Street+Haifa+Israel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline"
                >
                  Public terminal approach on Google Maps
                </a>
              </>
            )}
          </p>
        </div>
      </section>
      <section
        id="return-to-ship"
        aria-labelledby="return-to-ship-h"
        className="mt-12 scroll-mt-24"
      >
        <h2 id="return-to-ship-h" className="text-3xl">
          Planning your return to the cruise ship
        </h2>
        <p className="mt-4 leading-relaxed">
          I plan your day from the time you expect to disembark until the all-aboard deadline.
          Docking and sailing times are different from the time available for sightseeing.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["Docking", "Arrival of your ship at the port."],
            ["Disembarkation", "When you can leave the ship and meet your driver."],
            ["All aboard", "The deadline to be back on board."],
            ["Sailing", "Scheduled departure from port."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border bg-card p-3">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Allow time for the return drive, shuttle and security procedures. Share any changes to
          your ship's schedule with your driver or tour operator promptly.
        </p>
        {id === "ashdod" && (
          <p className="mt-3">
            For Masada, plan your visit around the{" "}
            <a
              href="https://en.parks.org.il/reserve-park/masada-national-park"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              park and cable-car operating hours
            </a>
            .
          </p>
        )}
      </section>
      <FaqList faqs={port.faqs} />
      <section id="shore-local" aria-labelledby="shore-local-h" className="mt-12">
        <h2 id="shore-local-h" className="text-2xl font-semibold">
          Explore destinations from {port.name} further
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover the places you can include in your day ashore.
        </p>
        <ul
          className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3"
          aria-label="Useful guides for your day ashore"
        >
          {port.related.map((guide) => (
            <li key={guide.to} className="min-w-0">
              <Link
                to={guide.to}
                className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
              >
                <img
                  src={guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src}
                  srcSet={stage5PhotoSrcSet(
                    guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src,
                  )}
                  sizes="(min-width: 1024px) 340px, 45vw"
                  alt={guideHeroPhotoForPath(String(guide.to))?.alt ?? guide.photo.alt}
                  width={320}
                  height={176}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="flex flex-1 flex-col p-3.5">
                  <span className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                    {guide.title}
                  </span>
                  <span className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {guide.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <IconTripPlanningLinks
        id="shore-practical"
        title="Plan the next part of your trip"
        items={practicalGuides}
      />
      <ShoreQuoteForm
        key={id}
        portId={id}
        itineraryId={itineraryId}
        onItineraryChange={setItineraryId}
      />
      <SourceList
        ids={shoreSourceIds(id)}
        intro="Official port information and tour booking sources. Confirm availability for your sailing date, total price, port access and return arrangements with the operator."
      />
      <PhotoCreditsDisclosure entries={photoCreditEntries(photos)} />
    </main>
  );
}
