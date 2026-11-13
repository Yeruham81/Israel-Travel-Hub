import { type LinkProps } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import { ArrowRight, TrainFront, CalendarDays, BedDouble, Route as RouteIcon } from "lucide-react";
import { Breadcrumbs, OnThisPage, FaqList } from "@/components/Guide";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { AuthorCard } from "@/components/AuthorCard";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { PageUpdated } from "@/components/PageUpdated";
import { itineraries, itineraryIds, itinerarySourcesByGuide, type ItineraryId, type ItineraryGuide } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const REVIEWED_AT = "2026-10-23";
const internal = (to: LinkProps["to"]) => to;

export function itineraryMeta(id: ItineraryId) {
  const g = itineraries[id];
  const photo = migrationPhotos[g.hero];
  const head = pageMeta({
    title: g.title, description: g.description, path: g.path, type: "article",
    image: photo.src, imageAlt: photo.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-blog/" }, { name: g.title, path: g.path }],
  });
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "Article",
    "@id": `${CANONICAL_ORIGIN}${g.path}#article`,
    headline: g.title, description: g.description, inLanguage: "en",
    mainEntityOfPage: `${CANONICAL_ORIGIN}${g.path}`,
    dateModified: g.reviewedAt ?? REVIEWED_AT, author: authorLd(),
    publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    image: new URL(photo.src, CANONICAL_ORIGIN).href,
    about: ["Israel", `${g.days}-day travel itinerary`, "Independent trip planning"],
    citation: itinerarySourcesByGuide[id].map((source) => source.url),
  })] };
}

function RouteMap({ guide }: { guide: ItineraryGuide }) {
  const map = guide.map;
  const params = new URLSearchParams({
    bbox: map.bounds.join(","), marker: map.center.join(","),
    name: `Israel ${guide.days}-day trip regions`, lang: "en",
    waypoints: JSON.stringify(map.points),
  });
  const mapUrl = `/maps/area.html?${params.toString()}`;
  return <figure className="mt-6 overflow-hidden rounded-2xl border bg-card">
    <iframe title={`Map of Israel destinations on the ${guide.days}-day itinerary`} src={mapUrl} width={900} height={360}
      loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-64 w-full border-0 sm:h-80" />
    <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      <span className="font-semibold">Destination map:</span> numbered pins mark stops (not day numbers); they do not show a driven road route or travel-time estimate.
      {" "}Open the <a className="font-semibold text-primary underline" href={mapUrl} target="_blank" rel="noopener noreferrer">larger map<span className="sr-only"> (opens a new tab)</span></a>.
      Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a>.
    </figcaption>
  </figure>;
}

const guideSections = (g: ItineraryGuide): [string, string][] => [
  ["overview", "Trip overview"],
  ...(g.beforeYouGo?.length ? [["before-you-go", "Before you go"] as [string, string]] : []),
  ["days", "Daily itinerary"],
  ...g.daysPlan.map((_, index): [string, string] => [`day-${index + 1}`, `Day ${index + 1}`]),
  ["transport", "Transport & hotels"],
  ["alternatives", "Adapt the route"],
  ["faq", "FAQ"],
  ...(g.relatedGuides?.length ? [["related-guides", "Related guides"] as [string, string]] : []),
  ["other-durations", "More itineraries"],
  ["contact", "Contact"],
];

export function IsraelItineraryPage({ id }: { id: ItineraryId }) {
  const g = itineraries[id];
  const photo = migrationPhotos[g.hero];
  return <main className="mx-auto max-w-5xl px-4 pb-16">
    <header className="pt-6">
      <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: g.title, to: internal(g.path as LinkProps["to"]) }]} />
      <GuideHeroLayout image={
        <GuideHeroMedia src={photo.src} alt={photo.alt}>
          <GuidePhotoCredit photo={photo} />
        </GuideHeroMedia>
      }>
        <p className="eyebrow">Israel itineraries · Independent trip planning</p>
        <h1 className="guide-page-title mt-3">{g.title}</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">{g.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-secondary px-3 py-2">{g.days} full sightseeing days</span>
          <span className="rounded-full bg-secondary px-3 py-2">Realistic hotel bases</span>
          <span className="rounded-full bg-secondary px-3 py-2">Public / private transport choices</span>
        </div>
        <PageUpdated date={g.reviewedAt ?? REVIEWED_AT} />
      </GuideHeroLayout>
      <AuthorCard />
    </header>
    <OnThisPage sections={guideSections(g)} />
    <section id="overview" aria-labelledby="overview-h" className="mt-10 scroll-mt-28">
      <h2 id="overview-h" className="text-3xl">The route at a glance</h2>
      <p className="mt-3 max-w-3xl leading-relaxed">{g.reality}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5"><dt className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-primary" aria-hidden /> Who this suits</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.idealFor}</dd></div>
        <div className="rounded-xl border bg-card p-5"><dt className="flex items-center gap-2 text-sm font-semibold"><BedDouble className="h-4 w-4 text-primary" aria-hidden /> Suggested hotel bases</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.hotelBases}</dd></div>
      </dl>
      <h3 className="mt-7 text-xl font-semibold">Daily route and hotel bases</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">This plan groups nearby stops and limits hotel changes. Suggested overnight locations depend on your arrival and departure times.</p>
      <ol className="mt-4 space-y-2 sm:hidden" aria-label="Day-by-day route and overnight stays">
        {g.daysPlan.map((day, index) => <li key={index} className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Day {index + 1}</p>
          <p className="mt-1 font-semibold">{g.overviewRows?.[index]?.focus ?? day.name}</p>
          <p className="mt-2 text-sm text-muted-foreground"><BedDouble className="mr-1.5 inline h-4 w-4" aria-hidden />{g.overviewRows?.[index]?.night ?? day.overnight}</p>
        </li>)}
      </ol>
      <div className="mt-4 hidden overflow-hidden rounded-2xl border sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th scope="col" className="w-20 px-4 py-3 font-semibold">Day</th>
              <th scope="col" className="px-4 py-3 font-semibold">Main focus</th>
              <th scope="col" className="px-4 py-3 font-semibold">Overnight plan</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {g.daysPlan.map((day, index) => <tr key={index}>
              <th scope="row" className="px-4 py-3 align-top font-semibold">{index + 1}</th>
              <td className="px-4 py-3 align-top">{g.overviewRows?.[index]?.focus ?? day.name}</td>
              <td className="px-4 py-3 align-top text-muted-foreground">{g.overviewRows?.[index]?.night ?? day.overnight}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <RouteMap guide={g} />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">This sample route assumes <strong>{g.days} usable sightseeing days</strong>, excluding travel days that are substantially lost to arrival or departure. Attraction entry, border/crossing arrangements, walking access and opening hours must be verified for your dates; this is not a bookable package or a guarantee that all locations are open.</p>
    </section>
    {g.beforeYouGo?.length ? <section id="before-you-go" aria-labelledby="before-you-go-h" className="mt-12 scroll-mt-28">
      <h2 id="before-you-go-h" className="text-3xl">Before you go</h2>
      <p className="mt-2 text-muted-foreground">These checks affect the whole trip, so handle them before choosing exact visits and booking transport.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {g.beforeYouGo.map((tip) => <article key={tip.heading} className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold">{tip.heading}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
          {tip.to && tip.label && <Link to={tip.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-2">{tip.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link>}
        </article>)}
      </div>
    </section> : null}
    <section id="days" aria-labelledby="days-h" className="mt-14 scroll-mt-28">
      <h2 id="days-h" className="text-3xl">Your {g.days}-day itinerary, day by day</h2>
      <p className="mt-3 text-muted-foreground">Each day distinguishes a workable core from optional extras. Use the linked destination guides for entry information, walking routes and alternatives.</p>
      <div className="mt-7 space-y-10">
        {g.daysPlan.map((day, index) => {
          const image = migrationPhotos[day.image];
          return <article key={index} id={`day-${index + 1}`} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card">
            <header className="border-b bg-secondary/40 px-5 py-5 sm:px-7">
              <p className="eyebrow">Day {index + 1} · {day.region}</p>
              <h3 className="mt-2 text-2xl font-semibold">{day.name}</h3>
            </header>
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="min-w-0">
                <dl className="space-y-5">
                  <div><dt className="text-sm font-semibold text-primary">Morning</dt><dd className="mt-1 leading-relaxed">{day.morning}</dd></div>
                  <div><dt className="text-sm font-semibold text-primary">Afternoon</dt><dd className="mt-1 leading-relaxed">{day.afternoon}</dd></div>
                  <div><dt className="text-sm font-semibold text-primary">Evening</dt><dd className="mt-1 leading-relaxed">{day.evening}</dd></div>
                </dl>
                <div className="mt-6 border-l-4 border-primary bg-secondary/50 px-4 py-3">
                  <h4 className="font-semibold">Practical planning note</h4>
                  <p className="mt-1 text-sm leading-relaxed">{day.practical}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed"><strong>Where to stay:</strong> {day.overnight}</p>
                <nav aria-label={`Read more about day ${index + 1}`} className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {day.links.map((link) => <Link key={link.label} to={link.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2">{link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link>)}
                </nav>
              </div>
              <figure className="order-first self-start lg:order-last"><img src={image.src} alt={image.alt} width={500} height={375}
                loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-xl object-cover sm:aspect-[4/3]" />
                <GuidePhotoCredit photo={image} />
              </figure>
            </div>
          </article>;
        })}
      </div>
    </section>
    <section id="transport" aria-labelledby="transport-h" className="mt-14 scroll-mt-28">
      <h2 id="transport-h" className="text-3xl">Transport and hotel planning</h2>
      <p className="mt-3 leading-relaxed">{g.noCarAdvice}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{g.logistics.map((tip) => <article key={tip.heading} className="rounded-xl border bg-card p-5">
        <TrainFront className="h-5 w-5 text-primary" aria-hidden />
        <h3 className="mt-3 text-lg font-semibold">{tip.heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
        {tip.to && tip.label && <Link to={tip.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline">{tip.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link>}
      </article>)}</div>
      <p className="mt-5 text-sm leading-relaxed"><RouteIcon className="mr-2 inline h-4 w-4 text-primary" aria-hidden />Self-drive, public transport, guided excursions and a private car-and-driver are different arrangements. Driving alone does not include licensed guiding or site admissions. Compare your exact route and date before booking.</p>
    </section>
    <section id="alternatives" aria-labelledby="alternatives-h" className="mt-14 scroll-mt-28">
      <h2 id="alternatives-h" className="text-3xl">Adapt this itinerary to your trip</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{g.alternatives.map((item) => <article key={item.title} className="rounded-xl border bg-card p-5">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
        {item.to && item.label && <Link to={item.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline">{item.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link>}
      </article>)}</div>
    </section>
    <FaqList faqs={g.faqs} />
    {g.relatedGuides?.length ? <section id="related-guides" aria-labelledby="related-guides-h" className="mt-14 scroll-mt-28">
      <h2 id="related-guides-h" className="text-3xl">Related practical guides</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use these focused guides for visiting details and, where relevant, hotel and tour-booking options.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {g.relatedGuides.map((item) => {
          const picture = migrationPhotos[item.image];
          return <article key={item.to} className="overflow-hidden rounded-xl border bg-card">
            <Link to={item.to} className="group grid h-full grid-cols-[108px_minmax(0,1fr)] items-start gap-3 hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:grid-cols-[116px_minmax(0,1fr)]">
              <img src={picture.src} alt={picture.alt} width={220} height={180} loading="lazy" decoding="async"
                className="h-full min-h-28 w-full object-cover" />
              <span className="min-w-0 py-3 pr-3">
                <span className="block text-sm font-semibold text-primary underline-offset-2 group-hover:underline">{item.title}</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Read guide <ArrowRight className="h-3 w-3" aria-hidden /></span>
              </span>
            </Link>
            {picture.credit && <div className="px-3 pb-2"><GuidePhotoCredit photo={picture} /></div>}
          </article>;
        })}
      </div>
    </section> : null}
    <section id="other-durations" aria-labelledby="other-duration-h" className="mt-14 scroll-mt-28">
      <h2 id="other-duration-h" className="text-3xl">Plan the rest of your trip</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Have more or fewer days? Compare the actual routes, hotel bases and travel commitments rather than adding destinations to an already full day.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {itineraryIds.filter((other) => other !== id).map((other) => {
          const choice = itineraries[other];
          const choicePhoto = migrationPhotos[choice.hero];
          return <article key={other} className="overflow-hidden rounded-xl border bg-card">
            <Link to={choice.path as LinkProps["to"]} className="group block hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <img src={choicePhoto.src} alt={choicePhoto.alt} width={440} height={300} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
              <span className="block p-4">
                <span className="block font-semibold text-primary underline-offset-2 group-hover:underline">{other}-day Israel itinerary</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{choice.description}</span>
              </span>
            </Link>
            {choicePhoto.credit && <div className="px-4 pb-2"><GuidePhotoCredit photo={choicePhoto} /></div>}
          </article>;
        })}
      </div>
    </section>
    <HomeContactForm key={id} guide={guideContactCopy(g.title, "itinerary")} />
    <SourcesDisclosure>
      <p className="text-sm leading-relaxed text-muted-foreground">Official planning references for this itinerary. Verify schedules, entry conditions and openings for your exact dates; these sources do not imply live availability.</p>
      <ul className="mt-3 space-y-2">
        {itinerarySourcesByGuide[id].map((source) => <li key={source.url}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline underline-offset-2">{source.label}<span className="sr-only"> (opens in a new tab)</span></a>
        </li>)}
      </ul>
    </SourcesDisclosure>
  </main>;
}
