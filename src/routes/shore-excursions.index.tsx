import { ShoreHubComparison } from "@/components/ShorePlanning";
import { TripadvisorReviewsButton } from "@/components/TripadvisorReviewsButton";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { IconTripPlanningLinks } from "@/components/IconTripPlanningLinks";
import bethlehemPhoto from "@/assets/home/bethlehem-nativity.webp";
import akkoPhoto from "@/assets/shore-excursions/akko-port.jpg";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CarFront, CheckCircle2, Compass, Smartphone, Sun, TrainFront } from "lucide-react";
import { FaqList, HubHeader, SourceList } from "@/components/Guide";
import { GuidePhotoCredit } from "@/components/GuideCard";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";
import { getShorePort } from "@/data/shoreExcursions";
import { shoreHubGuides } from "@/data/shoreReading";
import cruisePortFeature from "@/assets/home/cruise-port-feature.webp";
import jerusalemFeature from "@/assets/home/jerusalem-old-city-card.webp";
import galileeFeature from "@/assets/home/tiberias-lake-card.webp";
import masadaFeature from "@/assets/home/masada-cable-car-card.webp";
import coastHubThumb from "@/assets/shore-hub/jaffa-route.webp";
import { shoreHubExperiences, shoreHubFaqs, shoreHubPorts, shoreHubSourceIds, shoreHubTitle, SHORE_EXCURSION_UPDATED_DATE, shorePlanningSteps, shoreTourFormats } from "@/data/shoreHub";
import { shorePorts, travelGuidePaths } from "@/data/registry";
import { authorLd } from "@/lib/author";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { CANONICAL_ORIGIN, jsonLd, pageMeta, SITE_NAME } from "@/lib/site";

const portIds = ["ashdod", "haifa"] as const;
const heroPhoto = { src: cruisePortFeature, alt: "Cruise passengers walking along a harbour quay toward a waiting vehicle", sourceUrl: "" };
const crumbs = [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }] as const;

const experiencePhotos = {
  jerusalem: { src: jerusalemFeature, alt: "Historic buildings in Jerusalem\'s Old City" },
  history: { src: bethlehemPhoto, alt: "Church of the Nativity in Bethlehem" },
  "north-coast": { src: akkoPhoto, alt: "Akko old harbour" },
  galilee: { src: galileeFeature, alt: "Sea of Galilee and its surrounding hills" },
  coast: { src: coastHubThumb, alt: "Old Jaffa harbour and its Mediterranean waterfront" },
  desert: { src: masadaFeature, alt: "Masada and the surrounding Judean Desert landscape" },
} as const;

const practicalGuides = [
  { title: "Israel travel tips", description: "Essential advice for your visit.", to: travelGuidePaths.travelTips, icon: Compass },
  { title: "Travel eSIM for Israel", description: "Stay connected during your day ashore.", to: travelGuidePaths.esim, icon: Smartphone },
  { title: "Getting around Israel", description: "Trains, buses, taxis and local travel.", to: travelGuidePaths.israel, icon: TrainFront },
  { title: "Israel holidays & events", description: "Check events that may affect your visit.", to: travelGuidePaths.calendar, icon: CalendarDays },
  { title: "Best time to visit Israel", description: "Seasons, weather and regional conditions.", to: travelGuidePaths.bestTime, icon: Sun },
  { title: "Taxis in Israel", description: "Licensed taxis, fares and booking apps.", to: travelGuidePaths.taxis, icon: CarFront },
] as const;

export const Route = createFileRoute("/shore-excursions/")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/shore-excursions.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: Shore,
});

function Shore() {
  const photos = [heroPhoto, ...portIds.map(id => getShorePort(id).photo), ...shoreHubGuides.map(guide => guide.photo)].filter(hasPublicPhotoCredit);

  return <main className="pb-12" data-testid="shore-hub">
    <HubHeader
      crumbs={crumbs.map(crumb => ({ name: crumb.name, to: crumb.path }))}
      title={shoreHubTitle}
      intro="Arriving by cruise ship? I arrange private car-and-driver day trips from Ashdod and Haifa. Compare guided excursions and choose a route that fits your time ashore."
      checkedAt={SHORE_EXCURSION_UPDATED_DATE}
      showAuthor={false}
      image={<GuideHeroMedia src={heroPhoto.src} alt={heroPhoto.alt} compact />}
    />

    <div className="mx-auto max-w-5xl px-4">
      <section id="ports" aria-labelledby="shore-ports-h" className="mt-8 scroll-mt-24">
        <h2 id="shore-ports-h" className="text-2xl font-semibold">Choose your cruise port</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3" aria-label="Cruise port excursion guides">
          {portIds.map(id => {
            const port = getShorePort(id);
            const details = shoreHubPorts[id];
            return <li key={id} className="min-w-0">
              <Link to={port.path} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
                <img src={port.photo.src} alt={port.photo.alt} width={710} height={473} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform group-hover:scale-[1.03]" />
                <span className="flex min-w-0 flex-1 flex-col items-start p-3 sm:p-4">
                  <span className="mt-1 block text-lg font-semibold leading-snug">From {port.name} Port</span>
                  <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{details.description}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Popular:</strong> {details.highlights.join(" · ")}</span>
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>

      <section id="destinations" aria-labelledby="shore-destinations-h" className="mt-9 scroll-mt-24">
        <h2 id="shore-destinations-h" className="text-2xl font-semibold">Popular shore excursion routes</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Choose a destination to explore shore excursions from Ashdod or Haifa.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {shoreHubExperiences.map(experience => {
            const photo = experiencePhotos[experience.id];
            return <li key={experience.id} data-experience={experience.id} className="min-w-0">
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary">
                <img src={photo.src} alt={photo.alt} width={320} height={180} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                <div className="flex min-w-0 flex-1 flex-col items-start p-3">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{experience.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
                  <nav aria-label={`Port options for ${experience.title}`} className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                    {experience.links.map(link => <Link key={link.portId + "-" + link.destination} to={shorePorts[link.portId].path} search={{ destination: link.destination }} className="text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      {link.label}
                    </Link>)}
                  </nav>
                </div>
              </article>
            </li>;
          })}
        </ul>
      </section>

      <section id="compare-ports" aria-labelledby="compare-ports-h" className="mt-9">
        <h2 id="compare-ports-h" className="text-2xl font-semibold">Compare destinations by cruise port</h2>
        <ShoreHubComparison/>
      </section>
      <section id="tour-formats" aria-labelledby="shore-formats-h" className="mt-9 scroll-mt-24">
        <h2 id="shore-formats-h" className="text-2xl font-semibold">Private driver or guided excursion?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Choose a flexible private drive or a guided excursion. Individual listings explain what is included.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {shoreTourFormats.map(format => <li key={format.title} className="rounded-xl border bg-card p-4">
            <h3 className="text-base font-semibold">{format.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{format.bestFor}</p>
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
        <div className="mt-4 flex items-start gap-3 rounded-2xl border bg-card p-4 sm:p-5">
          <img src={airportTransferPhotos["moshe"]!.src} alt="Moshe Barak" width={150} height={200} loading="lazy" className="h-20 w-16 shrink-0 rounded-lg object-cover"/>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Private shore excursions with Moshe Barak</h3>
            <TripadvisorReviewsButton className="mt-2"/>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              I arrange private car-and-driver day trips from Haifa and Ashdod, tailored to your interests, group size and ship's schedule.
            </p>
            <nav aria-label="Private cruise-port quote requests" className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <Link to={shorePorts.ashdod.path} hash="request-quote" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Request a quote from Ashdod</Link>
              <Link to={shorePorts.haifa.path} hash="request-quote" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Request a quote from Haifa</Link>
            </nav>
          </div>
        </div>
      </section>

      <FaqList faqs={shoreHubFaqs} compact />

      <section id="shore-related-guides" aria-labelledby="shore-related-h" className="mt-9">
        <h2 id="shore-related-h" className="text-2xl font-semibold">Discover Israel's main attractions</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {shoreHubGuides.map(guide => <li key={String(guide.to)} className="min-w-0">
            <Link to={guide.to} className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src} alt={guideHeroPhotoForPath(String(guide.to))?.alt ?? guide.photo.alt} width={320} height={180} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
              <span className="min-w-0 flex-1 p-3">
                <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{guide.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{guide.description}</span>
                
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      <IconTripPlanningLinks id="shore-practical" title="Plan your trip to Israel" items={practicalGuides}/>
      {photos.length > 0 && <details className="mt-9 rounded-xl border p-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold">Photo credits</summary>
        <ul className="mt-3 space-y-3">
          {[...new Map(photos.map(photo => [photo.src, photo])).values()].map(photo => <li key={photo.src}><GuidePhotoCredit photo={photo} /></li>)}
        </ul>
      </details>}
      <SourceList
        ids={shoreHubSourceIds}
        intro="Official port and national-park information for planning. Your cruise line and tour operator confirm the arrangements for your ship and date."
      />
    </div>
  </main>;
}
