import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Church, Compass, Landmark, Smartphone, Sun, TrainFront, Waves } from "lucide-react";
import { FaqList, HubHeader, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { getShorePort } from "@/data/shoreExcursions";
import { shoreHubGuides } from "@/data/shoreReading";
import cruisePortFeature from "@/assets/home/cruise-port-feature.webp";
import {
  shoreHubDescription, shoreHubExperiences, shoreHubFaqs, shoreHubPorts,
  shoreHubSourceIds, shoreHubTitle, SHORE_EXCURSION_UPDATED_DATE,
  shorePlanningSteps, shoreTourFormats,
} from "@/data/shoreHub";
import { publicSources, shorePorts, travelGuidePaths } from "@/data/registry";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { CANONICAL_ORIGIN, jsonLd, pageMeta, SITE_NAME } from "@/lib/site";

const portIds = ["ashdod", "haifa"] as const;
const heroPhoto = { src: cruisePortFeature, alt: "Cruise passengers walking along a harbour quay toward a waiting vehicle", sourceUrl: "" };
const crumbs = [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }] as const;
const experienceIcons = { history: Landmark, galilee: Church, coast: Waves, desert: Sun };

const practicalGuides = [
  { title: "Israel travel tips", description: "What to know before your day ashore.", to: travelGuidePaths.travelTips, icon: Compass },
  { title: "Travel eSIM for Israel", description: "Keep in touch with your driver or guide.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "Getting around Israel", description: "Transport options beyond the port.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel holidays & events", description: "Check dates that may affect your visit.", to: travelGuidePaths.calendar, icon: CalendarDays },
] as const;

export const Route = createFileRoute("/shore-excursions/")({
  head: () => {
    const meta = pageMeta({
      title: "Israel shore excursions from Ashdod & Haifa cruise ports",
      description: shoreHubDescription,
      path: "/shore-excursions/",
      crumbs: [...crumbs],
      image: heroPhoto.src,
      imageAlt: heroPhoto.alt,
    });
    return {
      ...meta,
      scripts: [...meta.scripts, jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: shoreHubTitle,
        description: shoreHubDescription,
        url: CANONICAL_ORIGIN + "/shore-excursions/",
        inLanguage: "en",
        dateModified: SHORE_EXCURSION_UPDATED_DATE,
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME },
        image: new URL(heroPhoto.src, CANONICAL_ORIGIN).href,
        mainEntity: {
          "@type": "ItemList",
          name: "Israel cruise-port excursion guides",
          itemListElement: portIds.map((id, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@type": "WebPage", name: getShorePort(id).title, url: CANONICAL_ORIGIN + shorePorts[id].path },
          })),
        },
        citation: publicSources(shoreHubSourceIds).map(source => source.url),
      })],
    };
  },
  component: Shore,
});

function Shore() {
  const photos = [heroPhoto, ...portIds.map(id => getShorePort(id).photo), ...shoreHubGuides.map(guide => guide.photo)].filter(hasPublicPhotoCredit);

  return <main className="pb-12" data-testid="shore-hub">
    <HubHeader
      crumbs={crumbs.map(crumb => ({ name: crumb.name, to: crumb.path }))}
      title={shoreHubTitle}
      intro="Arriving in Israel by cruise ship? Find private car-and-driver days and guided shore excursions from Ashdod or Haifa. Start with your port, then choose a route that fits your hours ashore."
      checkedAt={SHORE_EXCURSION_UPDATED_DATE}
      image={<GuideHeroMedia src={heroPhoto.src} alt={heroPhoto.alt} compact />}
    />

    <div className="mx-auto max-w-5xl px-4">
      <section id="ports" aria-labelledby="shore-ports-h" className="mt-8 scroll-mt-24">
        <h2 id="shore-ports-h" className="text-2xl font-semibold">Choose your cruise port</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Ashdod is a useful starting point for Jerusalem and the southern coast. Haifa is closer to Akko, Nazareth and the Sea of Galilee.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2" aria-label="Cruise port excursion guides">
          {portIds.map(id => {
            const port = getShorePort(id);
            const details = shoreHubPorts[id];
            return <li key={id} className="min-w-0">
              <Link to={port.path} className="group flex h-full min-w-0 items-center gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-4">
                <img src={port.photo.src} alt={port.photo.alt} width={160} height={192} loading="lazy" decoding="async" className="h-32 w-24 shrink-0 rounded-xl object-cover sm:h-36 sm:w-28" />
                <span className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="block text-xs font-medium text-muted-foreground">{details.location}</span>
                  <span className="mt-1 block text-lg font-semibold leading-snug">From {port.name} Port</span>
                  <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{details.description}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Popular:</strong> {details.highlights.join(" · ")}</span>
                  <span className="mt-2 text-sm font-semibold text-primary group-hover:underline">Explore {port.name} excursions</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Pickup arrangements differ: Ashdod may involve a port shuttle or authorized pickup point, while Haifa has a downtown passenger terminal. Confirm your ship's meeting instructions before booking.
        </p>
      </section>

      <section id="destinations" aria-labelledby="shore-destinations-h" className="mt-9 scroll-mt-24">
        <h2 id="shore-destinations-h" className="text-2xl font-semibold">Explore popular shore excursion destinations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Browse a destination, then see guided tours and private-day options from the right port.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {shoreHubExperiences.map(experience => {
            const Icon = experienceIcons[experience.id];
            return <li key={experience.id} className="flex min-w-0 flex-col rounded-xl border bg-card p-4" data-experience={experience.id}>
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary/60 text-primary"><Icon className="size-5" aria-hidden /></span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{experience.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
                </div>
              </div>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-3 pl-12">
                {experience.links.map(link => <li key={link.portId + "-" + link.destination}>
                  <Link to={shorePorts[link.portId].path} search={{ destination: link.destination }} className="text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-primary">{link.label}</Link>
                </li>)}
              </ul>
            </li>;
          })}
        </ul>
      </section>

      <section id="tour-formats" aria-labelledby="shore-formats-h" className="mt-9 scroll-mt-24">
        <h2 id="shore-formats-h" className="text-2xl font-semibold">Private driver or guided excursion?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Choose the right pace and level of guiding. Individual listings explain whether the price is per person or per vehicle and what is included.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {shoreTourFormats.map(format => <li key={format.title} className="rounded-xl border bg-secondary/20 p-4">
            <h3 className="text-base font-semibold">{format.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{format.bestFor}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{format.tradeoff}</p>
          </li>)}
        </ul>
      </section>

      <section id="planning" aria-labelledby="shore-planning-h" className="mt-9 scroll-mt-24">
        <h2 id="shore-planning-h" className="text-2xl font-semibold">Before booking your shore excursion</h2>
        <ul className="mt-4 grid gap-x-5 gap-y-3 rounded-xl border bg-card p-4 sm:grid-cols-2">
          {shorePlanningSteps.map(step => <li key={step.title} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>)}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-secondary/25 p-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold">Looking for a private driver?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Share your ship's date, port and preferred stops on the relevant port page for a tailored car-and-driver quote.</p>
          </div>
          <nav aria-label="Private cruise-port quote requests" className="flex flex-wrap gap-2">
            <Link to={shorePorts.ashdod.path} hash="request-quote" className="btn btn-primary">From Ashdod</Link>
            <Link to={shorePorts.haifa.path} hash="request-quote" className="btn btn-primary">From Haifa</Link>
          </nav>
        </div>
      </section>

      <FaqList faqs={shoreHubFaqs} compact />

      <section id="shore-related-guides" aria-labelledby="shore-related-h" className="mt-9">
        <h2 id="shore-related-h" className="text-2xl font-semibold">Discover the places along your route</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shoreHubGuides.map(guide => <li key={String(guide.to)} className="min-w-0">
            <Link to={guide.to} className="group flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={guide.photo.src} alt={guide.photo.alt} width={112} height={90} loading="lazy" decoding="async" className="h-24 w-20 shrink-0 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{guide.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                <span className="mt-1.5 inline-block text-xs font-semibold text-primary group-hover:underline">Read guide</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="shore-practical" aria-labelledby="shore-practical-h" className="mt-9">
        <h2 id="shore-practical-h" className="text-2xl font-semibold">Practical travel guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {practicalGuides.map(guide => {
            const Icon = guide.icon;
            return <li key={guide.to}>
              <Link to={guide.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{guide.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>

      <SourceList
        ids={shoreHubSourceIds}
        intro="Official port and national-park information for planning. Your cruise line and tour operator confirm the arrangements for your ship and date."
      />
      {photos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">
          {[...new Map(photos.map(photo => [photo.src, photo])).values()].map(photo => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}
        </ul>
      </details>}
    </div>
  </main>;
}
