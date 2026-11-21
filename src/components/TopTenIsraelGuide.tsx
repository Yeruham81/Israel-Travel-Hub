import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight, ExternalLink, MapPin, Waves, Landmark, UtensilsCrossed,
  Moon, Mountain, Sun, Flower2, Sailboat, Fish, Star, Lightbulb,
  CalendarDays, CarFront, Footprints, Clock3, ShieldCheck,
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { guideContactCopy } from "@/lib/guide-contact";
import {
  topTenExperiences as experiences, topTenMapRegions, topTenSuggestedRoutes,
  topTenFaqs, type TopTenExperience,
} from "@/data/topTenExperiences";

import masadaCard from "@/assets/home/hero-masada-sm.webp";
import beachGuideCard from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import threeDaysCard from "@/assets/home/hero-jerusalem-sm.webp";
import fiveDaysCard from "@/assets/home/hero-caesarea-sm.webp";
import sevenDaysCard from "@/assets/home/hero-galilee-sm.webp";
import tenDaysCard from "@/assets/home/hero-eilat-mountains-sm.webp";
import trainCard from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import seasonsCard from "@/assets/guides/2026-10/best-time-to-visit-israel.webp";

const updatedAt = "2026-11-20";
const iconList = [Waves, Landmark, UtensilsCrossed, Moon, Mountain, Sun, Flower2, Sailboat, Fish, Star];
const linkClass = "inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
const sections = [
  ["choose", "Choose your experiences"], ["compare", "Compare all ten"],
  ["experiences", "The ten experiences"], ["experience-map", "Experience map"],
  ["routes", "Combine experiences"], ["practical", "Practical tips"],
  ["faq", "FAQ"], ["explore-more", "Explore further"],
  ["plan-trip", "Plan your trip"], ["contact", "Contact me"],
] as const;

const related = [
  { title: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/" as const, desc: "Old City, viewpoints and practical routes", image: "/images/attractions/old-jerusalem-tower-of-david.webp", alt: "Stone walls and towers of Jerusalem's Old City" },
  { title: "Visit Masada", to: "/attractions/masada/" as const, desc: "The plateau, cable car and trails", image: masadaCard, alt: "Masada plateau and desert landscape" },
  { title: "Explore the Dead Sea", to: "/travel-blog/the-dead-sea/" as const, desc: "Beaches, floating and where to go", image: "/images/attractions/dead-sea.webp", alt: "Turquoise Dead Sea water framed by desert hills" },
  { title: "Sea of Galilee guide", to: "/travel-blog/sea-of-galilee/" as const, desc: "Lakeside heritage and scenery", image: "/images/attractions/sea-of-galilee.webp", alt: "View towards the Sea of Galilee from northern hills" },
  { title: "Eilat & the Red Sea", to: "/attractions/eilat/" as const, desc: "Reefs, beaches and southern attractions", image: "/images/attractions/eilat.webp", alt: "Eilat and the Red Sea coast" },
  { title: "Tel Aviv beaches", to: "/travel-blog/beaches-in-tel-aviv/" as const, desc: "Find your ideal supervised beach", image: beachGuideCard, alt: "Tel Aviv Mediterranean swimming beaches and sandy shoreline" },
];

const planning = [
  { title: "3 days in Israel", to: "/travel-blog/israel-itinerary-3-days/" as const, desc: "A focused first visit", image: threeDaysCard, alt: "Jerusalem city skyline" },
  { title: "5 days in Israel", to: "/travel-blog/israel-itinerary-5-days/" as const, desc: "Cities and one extra region", image: fiveDaysCard, alt: "Caesarea's Mediterranean archaeological coast" },
  { title: "7 days in Israel", to: "/travel-blog/israel-itinerary-7-days/" as const, desc: "Time for more highlights", image: sevenDaysCard, alt: "The green Galilee hills and lake" },
  { title: "10 days in Israel", to: "/travel-blog/israel-itinerary-10-days/" as const, desc: "A wider route at a sensible pace", image: tenDaysCard, alt: "Mountains surrounding the Eilat region" },
  { title: "Getting around Israel", to: "/travel-blog/getting-around-israel/" as const, desc: "Trains, buses, taxis and drivers", image: trainCard, alt: "Rail platform at Ben Gurion Airport" },
  { title: "Best time to visit", to: "/travel-blog/best-time-to-visit-israel/" as const, desc: "Choose seasons by region and interests", image: seasonsCard, alt: "Seasonal scenery in Israel" },
];

function Heading({ id, title, intro }: { id: string; title: string; intro?: ReactNode }) {
  return <div className="mb-5">
    <h2 id={id + "-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
  </div>;
}
function OfficialLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function Tip({ children }: { children: ReactNode }) {
  return <aside className="flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-100">
    <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
    <div>{children}</div>
  </aside>;
}
function GuideCard({ item }: { item: typeof related[number] | typeof planning[number] }) {
  return <Link to={item.to} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary">
    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" width={560} height={350} className="aspect-[16/10] w-full object-cover" />
    <span className="flex flex-1 flex-col p-3 sm:p-4">
      <strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong>
      <span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</span>
      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Explore guide <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
    </span>
  </Link>;
}
function ExperienceCard({ experience, number }: { experience: TopTenExperience; number: number }) {
   return <article id={experience.id} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm" data-detailed-card="horizontal">
     <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
      <img src={experience.photo.src} alt={experience.photo.alt} loading="lazy" decoding="async" width={880} height={495} className="aspect-[16/9] w-full object-cover lg:col-start-2 lg:row-start-1 lg:aspect-[4/3] lg:rounded-xl" />
      <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
       <p className="text-xs font-semibold uppercase tracking-wide text-primary">{experience.tagline}</p>
       <h3 className="mt-2 text-xl font-bold sm:text-2xl">{number}. {experience.title}</h3>
       <p className="mt-3 text-sm leading-relaxed">{experience.description}</p>
      </div>
     </div>
     <div className="border-t p-4 sm:p-5 lg:px-6">
       <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-secondary/45 p-3 text-xs leading-snug">
        <div><strong className="block text-foreground">Best for</strong><span className="mt-1 block text-muted-foreground">{experience.bestFor}</span></div>
        <div><strong className="block text-foreground">Allow</strong><span className="mt-1 block text-muted-foreground">{experience.visitTime}</span></div>
        <div><strong className="block text-foreground">Area</strong><span className="mt-1 block text-muted-foreground">{experience.region}</span></div>
        <div><strong className="block text-foreground">Experience</strong><span className="mt-1 block text-muted-foreground">{experience.visitStyle}</span></div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{experience.practical}</p>
      <p className="mt-3 text-sm leading-relaxed"><strong>Getting there: </strong>{experience.gettingThere}</p>
      <p className="mt-4 rounded-lg border-l-2 border-primary/40 bg-secondary/30 px-3 py-2.5 text-sm leading-relaxed"><strong>My tip: </strong>{experience.tip}</p>
    </div>
    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t px-4 py-4 sm:px-5">
      <Link to={experience.guide.to} className={linkClass}>{experience.guide.label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
      {experience.extraGuide && <Link to={experience.extraGuide.to} className={linkClass}>{experience.extraGuide.label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>}
      {experience.official && <OfficialLink href={experience.official.href}>{experience.official.label}</OfficialLink>}
      {experience.mapLinks.map(mapLink => <a key={mapLink.query} className={linkClass}
        href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapLink.query)}
        target="_blank" rel="noopener noreferrer">
        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />{mapLink.label} on Google Maps
        <span className="sr-only"> (opens in a new tab)</span>
      </a>)}
    </div>
  </article>;
}

const mapUrl = "/maps/top-ten-israel.html?waypoints=" + encodeURIComponent(JSON.stringify(topTenMapRegions.map(({ id, name, markerLabel, lat, lon }) => ({ id, name, label: markerLabel, lat, lon }))));

export function TopTenIsraelGuide() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const mapRef = useRef<HTMLIFrameElement>(null);
  const focusMap = (id: string) => {
    setSelectedRegion(id);
    mapRef.current?.contentWindow?.postMessage({ type: "top-ten-israel-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== mapRef.current?.contentWindow) return;
      if (event.data?.type !== "top-ten-israel-map-selected") return;
      if (topTenMapRegions.some(region => region.id === event.data.id)) setSelectedRegion(event.data.id);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[
          { name: "Home", to: "/" },
          { name: "Travel guides", to: "/travel-blog/" },
          { name: "Top 10 Things to Do in Israel", to: "/travel-blog/top-10-things-to-do-in-israel/" },
        ]} />
        <GuideHeroLayout image={<GuideHeroMedia src="/images/top-ten-israel/hero.webp" alt="Old Jaffa and the Mediterranean waterfront in Tel Aviv" />}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Israel · Experiences worth planning around</p>
          <h1 className="guide-page-title mt-2">Top 10 Things to Do in Israel</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">
            From Jerusalem's Old City to the beaches of Tel Aviv, the Dead Sea and the desert night sky, these are ten experiences I'd consider when planning a trip to Israel. Explore the ones that interest you most and use my tips to build a comfortable route.
          </p>
          <PageUpdated date={updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>

      <section aria-label="My first-trip recommendations" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
        <h2 className="text-xl font-bold">What I'd choose for a first visit</h2>
        <p className="mt-2 leading-relaxed">
          I'd combine <a className={linkClass} href="#jerusalem">Jerusalem</a>, a day or two around <a className={linkClass} href="#beaches">Tel Aviv's coast</a> and one excursion that suits your interests. History lovers could choose <a className={linkClass} href="#masada">Masada</a>; for relaxation, consider <a className={linkClass} href="#dead-sea">the Dead Sea</a>. With more time, add the Galilee or a southern journey to Eilat and Mitzpe Ramon.
        </p>
      </section>
      <OnThisPage sections={sections} />

      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-24">
        <Heading id="choose" title="Choose the experiences that interest you"
          intro="Ten ways to experience Israel, from culture and food to beaches, history and nature. Select any card for my practical guide below." />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {experiences.map((experience,index) => {
            const Icon = iconList[index]!;
            return <a key={experience.id} href={"#" + experience.id} className="group flex min-w-0 flex-col rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
              <div className="flex items-center justify-between gap-2"><Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" /><span className="text-xs font-bold tabular-nums text-muted-foreground">{String(index + 1).padStart(2,"0")}</span></div>
              <strong className="mt-3 text-sm leading-snug">{experience.shortTitle}</strong>
              <span className="mt-2 text-xs leading-relaxed text-muted-foreground">{experience.region}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Read my tips <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
            </a>;
          })}
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-24">
        <Heading id="compare" title="Compare all ten experiences"
          intro="Use this overview to choose activities that fit your interests, base and available time. Visit lengths are suggestions, excluding journeys between destinations." />
        <p className="mb-3 text-xs text-muted-foreground md:hidden">Swipe the table sideways to compare all ten experiences.</p>
        <div role="region" aria-label="Comparison table" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-sm">
            <caption className="sr-only">Compare ten experiences in Israel by location, interest and visit duration</caption>
            <thead className="bg-secondary/60"><tr>
              <th scope="col" className="w-[28%] border-b px-3 py-3">Experience</th>
              <th scope="col" className="w-[22%] border-b px-3 py-3">Location</th>
              <th scope="col" className="w-[29%] border-b px-3 py-3">Best for</th>
              <th scope="col" className="w-[21%] border-b px-3 py-3">Time to allow</th>
            </tr></thead>
            <tbody>{experiences.map((e,i) => <tr key={e.id} className="border-b last:border-0">
              <th scope="row" className="px-3 py-3 font-semibold"><a href={"#" + e.id} className="text-primary hover:underline">{i+1}. {e.shortTitle}</a></th>
              <td className="px-3 py-3">{e.region}</td>
              <td className="px-3 py-3">{e.bestFor}</td>
              <td className="px-3 py-3 text-muted-foreground">{e.visitTime}</td>
            </tr>)}</tbody>
          </table>
          
        </div>
      </section>

      <section id="experiences" aria-labelledby="experiences-h" className="mt-12 scroll-mt-24">
        <Heading id="experiences" title="My guide to ten memorable Israel experiences"
          intro="I have included the practical details that matter most when deciding which experiences fit your trip." />
        <div className="grid gap-5" data-testid="top-ten-detailed-experience-cards">
          {experiences.map((experience,index) => <ExperienceCard key={experience.id} experience={experience} number={index+1} />)}
        </div>
      </section>
      <div className="mt-6"><Tip>For Masada and the desert, check the Israel Meteorological Service forecast and national-park access on the morning of your visit. Heat and flash-flood warnings can change what is practical, even when the forecast looks fine elsewhere in Israel.</Tip></div>

      <section id="experience-map" aria-labelledby="experience-map-h" className="mt-12 scroll-mt-24">
        <Heading id="experience-map" title="Where these experiences are in Israel"
          intro="The map highlights eight representative regions for the ten experiences. Use it to see the geography before choosing a route." />
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end">
            <label htmlFor="top-ten-region-select" className="w-full min-w-0 text-sm font-semibold sm:w-auto sm:flex-1">
              Focus on a region
              <select id="top-ten-region-select" value={selectedRegion} onChange={event => focusMap(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
                <option value="all">All eight regions</option>
                {topTenMapRegions.map(region => <option key={region.id} value={region.id}>{region.name}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => focusMap("all")} disabled={selectedRegion === "all"}
              className="min-h-11 w-full rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:opacity-40 sm:w-auto">Show all regions</button>
          </div>
          <iframe ref={mapRef} title="Interactive map of eight regions for Israel's ten recommended experiences" src={mapUrl}
            width={900} height={460} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => { if (selectedRegion !== "all") mapRef.current?.contentWindow?.postMessage({ type: "top-ten-israel-map-focus", id: selectedRegion }, window.location.origin); }}
            className="h-[360px] w-full border-0 sm:h-[460px]" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
            <span>Regional markers are for orientation, not a suggested driving route. Map data © OpenStreetMap contributors.</span>
            {selectedRegion === "all" ?
              <OfficialLink href="https://www.google.com/maps/search/?api=1&query=Israel+travel+destinations">Explore on Google Maps</OfficialLink> :
              <OfficialLink href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent((topTenMapRegions.find(region => region.id === selectedRegion)?.name || "Israel") + ", Israel")}>View this area on Google Maps</OfficialLink>}
          </div>
        </div>
      </section>

      <section id="routes" aria-labelledby="routes-h" className="mt-12 scroll-mt-24">
        <Heading id="routes" title="How I would combine the experiences"
          intro="These regional combinations work well as planning starting points. Each needs its own realistic amount of time; I wouldn't try to complete all ten in a single short trip." />
        <div className="grid gap-4 md:grid-cols-2">
          {topTenSuggestedRoutes.map((route,index) => <div key={route.title} className="rounded-xl border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Route idea {index + 1}</p>
            <h3 className="mt-2 text-lg font-bold">{route.title}</h3>
            <p className="mt-2 text-sm leading-relaxed">{route.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {route.locations.map(id => {
                const exp=experiences.find(e=>e.id===id)!;
                return <a href={"#"+id} key={id} className="rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-secondary">{exp.shortTitle}</a>;
              })}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{route.note}</p>
          </div>)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">For a shorter visit, start with Jerusalem and Tel Aviv plus one suitable day trip. If your priority is the far south, consider spending a night at Mitzpe Ramon and another in Eilat.</p>
      </section>
      <div className="mt-5"><Tip>Travelling without a car? City rail and buses are useful in Jerusalem, Tel Aviv and Haifa. For the Galilee, Masada, the Dead Sea and the Negev, compare a regional tour, arranged driver or a car for that part of your itinerary.</Tip></div>

      <section id="practical" aria-labelledby="practical-h" className="mt-12 scroll-mt-24">
        <Heading id="practical" title="My practical tips for a better Israel trip"
          intro="The best plans match the region, the weather and the way you like to travel." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5"><Clock3 aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Give every region enough time</h3><p className="mt-2 text-sm leading-relaxed">Travel between Jerusalem, the Galilee, Mitzpe Ramon and Eilat takes time. I suggest choosing a few overnight bases and avoiding repeated long return drives.</p></div>
          <div className="rounded-xl border bg-card p-5"><CalendarDays aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Plan around holidays and opening days</h3><p className="mt-2 text-sm leading-relaxed">Shabbat and religious holidays affect transport, markets and some attractions. Use my <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Israel calendar of events</Link> and check the venue you want to visit.</p></div>
          <div className="rounded-xl border bg-card p-5"><ShieldCheck aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Choose safe bathing and trails</h3><p className="mt-2 text-sm leading-relaxed">Swim only where lifeguard service is operating, use managed Dead Sea beaches, protect coral habitats, and check park trail notices before exposed hikes.</p></div>
          <div className="rounded-xl border bg-card p-5"><CarFront aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Choose transport by journey</h3><p className="mt-2 text-sm leading-relaxed">Use city transport where convenient, and weigh a tour, car or private driver for remote sites. Plan the final return journey as carefully as the outward trip. See my <Link to="/travel-blog/getting-around-israel/" className="font-semibold text-primary hover:underline">transport guide</Link>.</p></div>
          <div className="rounded-xl border bg-card p-5"><Footprints aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">Match activity to your pace</h3><p className="mt-2 text-sm leading-relaxed">The Old City has stone paving and steps; desert viewpoints, water activities and park trails involve different demands. Choose access and activity levels that fit your group.</p></div>
          <div className="rounded-xl border bg-card p-5"><Moon aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-2 font-bold">If you're going stargazing</h3><p className="mt-2 text-sm leading-relaxed">A darker moon phase, clear sky and authorised viewing area make the difference. Pack layers for cool desert nights and consider staying locally.</p></div>
        </div>
      </section>
      <div className="mt-5"><Tip>If you are choosing travel dates, spring and autumn are good starting points for a mixed city-and-nature trip. Still check the actual forecast: Jerusalem's hills, the coast and the deserts can have very different conditions on the same day.</Tip></div>

      <FaqList faqs={topTenFaqs} />

      <section id="explore-more" aria-labelledby="explore-more-h" className="mt-12 scroll-mt-24">
        <Heading id="explore-more" title="Explore these experiences further"
          intro="My dedicated destination guides provide more detailed routes, visiting advice and practical links." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item => <GuideCard key={item.to} item={item} />)}</div>
      </section>

      <section id="plan-trip" aria-labelledby="plan-trip-h" className="mt-12 scroll-mt-24">
        <Heading id="plan-trip" title="Plan the next part of your Israel trip"
          intro={<>Use my suggested itineraries, or choose the best season and transport for the experiences you want. For accommodation, see my <Link to="/accommodation/" className="font-semibold text-primary hover:underline">Where to Stay in Israel</Link> guide.</>} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{planning.map(item => <GuideCard key={item.to} item={item} />)}</div>
      </section>

      <HomeContactForm guide={guideContactCopy("Top 10 Things to Do in Israel", "itinerary", "Israel")} />

      <SourcesDisclosure>
        <p className="mb-3 text-sm leading-relaxed">I use official park, venue and local-authority information for visitor access, nature areas and safety. Check current opening hours, weather and reservations for your dates.</p>
        <ul className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
          <li><OfficialLink href="https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Beaches.aspx">Tel Aviv municipality — beach information (Hebrew)</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/masada-national-park/">Israel Nature & Parks Authority — Masada</OfficialLink></li>
          <li><OfficialLink href="https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en">Tamar Regional Council — Ein Bokek beach</OfficialLink></li>
          <li><OfficialLink href="https://ganbahai.org.il/visit-us-haifa/">Bahá'í Gardens — official visitor information</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/eilat-coral-beach-nature-reserve-2/">Israel Nature & Parks Authority — Coral Beach</OfficialLink></li>
          <li><OfficialLink href="https://darksky.org/places/ramon-crater-nature-reserve-dark-sky-park/">DarkSky International — Ramon Crater</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/makhtesh-ramon-nature-reserve-and-visitors-center/">Israel Nature & Parks Authority — Ramon Crater</OfficialLink></li>
          <li><OfficialLink href="https://ims.gov.il/en">Israel Meteorological Service — forecast and warnings</OfficialLink></li>
        </ul>
      </SourcesDisclosure>
    </article>
  </main>;
}
