import { ConsentIframe } from "@/components/ConsentIframe";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Lightbulb, MapPin, Waves, Users, Heart, Compass, TreePalm, Sun, ShieldCheck, Bus, Accessibility, Dog, Umbrella, CalendarDays } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { beachMapPoints, beachTopPicks, officialTelAvivBeaches, officialBeachFacilities, officialBeachPrices, telAvivBeaches, type TelAvivBeach } from "@/data/telAvivBeaches";

import heroPhoto from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import jaffaPhoto from "@/assets/tel-aviv/jaffa.webp";
import rothschildPhoto from "@/assets/tel-aviv/rothschild.webp";
import dizengoffPhoto from "@/assets/tel-aviv/dizengoff.webp";
import museumPhoto from "@/assets/guides/2026-10/museums-in-tel-aviv.webp";
import beachfrontPhoto from "@/assets/tel-aviv/beachfront.webp";
import roadPhoto from "@/assets/home/road-trip-card.webp";

const updatedAt = "2026-11-26";
const headings = [
  ["choose", "Choose a beach"],
  ["compare", "Compare beaches"],
  ["beach-map", "Beach map"],
  ["beaches", "Explore beaches"],
  ["season", "When to visit"],
  ["practical", "Practical tips"],
  ["transport", "Getting there"],
  ["beyond", "Beyond Tel Aviv"],
  ["faq", "FAQ"],
  ["explore-more", "Explore more"],
  ["contact", "Contact me"],
] as const;

const pickIcons = [Waves, Users, Heart, Compass, TreePalm, Sun];
const areas = [
  { name: "Northern coast" as const, intro: "The Tzuk beaches, Tel Baruch, the port and Hilton." },
  { name: "Central seafront" as const, intro: "The main hotel-lined promenade, from Gordon to Geula." },
  { name: "Southern coast and Jaffa" as const, intro: "Beaches and parks along the southern waterfront towards Jaffa." },
];
const related = [
  { title: "Attractions in Tel Aviv", to: "/travel-blog/attractions-in-tel-aviv/" as const, note: "Ideas for sightseeing beyond the sand", image: rothschildPhoto, alt: "Rothschild Boulevard in Tel Aviv" },
  { title: "Explore Old Jaffa", to: "/attractions/jaffa/" as const, note: "Old streets, the port and coastal views", image: jaffaPhoto, alt: "Historic streets in Old Jaffa" },
  { title: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" as const, note: "Buses, the light rail, taxis and walking", image: dizengoffPhoto, alt: "A street in central Tel Aviv" },
  { title: "Museums in Tel Aviv", to: "/travel-blog/museums-in-tel-aviv/" as const, note: "Art, history and a good rainy-day alternative", image: museumPhoto, alt: "Tel Aviv museum architecture" },
  { title: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/" as const, note: "Seasonal planning for city and beach visits", image: heroPhoto, alt: "Seasonal view of Israel" },
  { title: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" as const, note: "Compare areas near the coast and city centre", image: beachfrontPhoto, alt: "Hotels along Tel Aviv's waterfront" },
];

const faqs = [
  { q: "Which Tel Aviv beach is best for a first visit?", a: "I would start with Gordon or Frishman if you are staying centrally. Both are easy to fit around a promenade walk, a meal or a short city outing. Bograshov and Jerusalem Beach can be just as convenient depending on your hotel." },
  { q: "Which beach is most practical for families with children?", a: "Metzitzim is a good starting point because of its nearby facilities and the port area. Choose a supervised swimming zone, follow the flags and keep children within reach." },
  { q: "Can I swim at Tel Aviv's beaches all year?", a: "You can visit the waterfront throughout the year, but swimming depends on an operating lifeguard station, the permitted bathing zone and daily sea conditions. Some stations may operate beyond the main bathing season. Check municipal updates and the signs before entering the sea." },
  { q: "Are Tel Aviv beaches free?", a: "Access to the municipal public beaches is free. Sunbeds, chairs, umbrellas, parking or nearby businesses may charge separately. In 2026, reported standard prices are ₪12 for a chair or umbrella and ₪22 for a sunbed; rental prices may change." },
  { q: "Where are dogs allowed off the leash?", a: "The municipality lists signed off-leash stretches at Hilton (north of the declared beach), Tel Baruch (south of the kite-surfing area), Charles Clore (south of the declared beach) and Givat Aliya (south of the declared beach). Use the signed off-leash sections." },
  { q: "Are the beaches accessible for wheelchair users?", a: "Several beaches have accessible paths, shade, toilets and assisted water-access chairs, but access varies by specific route and conditions. North Tzuk has a documented slope limitation. Check municipal accessibility details and request current assistance information before travelling." },
];

// Additional practical questions, kept distinct from the beach descriptions.
faqs.push(
  { q: "Which Tel Aviv beaches have free parking?", a: "The city lists free parking near the entrances to North Tzuk and South Tzuk. The Tel Baruch car park charges a fee." },
  { q: "Which Tel Aviv beach is best for surfing?", a: "Hilton and the designated water-sports zone south of Charles Clore are good starting points. Tel Baruch has a dedicated kite-surfing section. Follow the signed boundaries and current sea conditions." },
  { q: "Are Tel Aviv beaches open on Shabbat?", a: "Public beaches and the promenade are accessible on Shabbat; swimming is permitted in designated zones while lifeguards are on duty. Nordau has its own separate-bathing timetable." },
  { q: "When is jellyfish season in Tel Aviv?", a: "Jellyfish are most common in early summer, often June and July, but arrivals vary each year. Follow local warnings." },
  { q: "Can I walk along the beachfront from Tel Aviv to Jaffa?", a: "Yes. The promenade runs south past the central beaches and Charles Clore Park towards Old Jaffa." },
  { q: "Are there showers and changing rooms at Tel Aviv beaches?", a: "Many municipal beaches have showers, changing rooms and public toilets. Metzitzim also lists hot showers and a baby shower." },
);
const detailLink = "inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
function OfficialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={detailLink}>{children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /><span className="sr-only"> (opens in a new tab)</span></a>;
}
function BeachMapLink({ beach }: { beach: TelAvivBeach }) {
  const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(beach.name + ", Tel Aviv-Yafo, Israel");
  return <a href={url} target="_blank" rel="noopener noreferrer" className={detailLink}>
    <MapPin aria-hidden="true" className="h-4 w-4" />View location on Google Maps<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function Heading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return <div className="mb-5">
    <h2 id={id + "-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
  </div>;
}
function Tip({ children }: { children: React.ReactNode }) {
  return <aside className="flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-800">
    <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
    <div>{children}</div>
  </aside>;
}
/** Photograph positions are part of the layout now; exact local assets can be attached later. */
function BeachPhotoSlot({ beach, kind = "detail" }: {
  beach: TelAvivBeach; kind?: "pick" | "detail";
}) {
  const photo = kind === "pick" ? beach.pickPhoto : beach.detailPhoto;
  const shape = kind === "detail" ? "aspect-[16/9] w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:aspect-[16/10] lg:rounded-xl" : "aspect-[16/9] w-full";
  return photo ? (
    ((beach.id === "tzuk-south" && kind === "detail") || (beach.id === "metzitzim" && kind === "pick")) ? (
      <figure className={shape + " relative overflow-hidden"}>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width={photo.width} height={photo.height} className="h-full w-full object-cover" />
        <figcaption className="absolute bottom-0 right-0 rounded-tl bg-black/65 px-2 py-1 text-[10px] text-white">Illustrative photo</figcaption>
      </figure>
    ) : (
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async"
        width={photo.width} height={photo.height}
        className={shape + " object-cover"} />
    )
  ) : (
    <div aria-hidden="true" data-beach-photo-slot={kind + ":" + beach.id}
      className={shape + " flex items-center justify-center bg-secondary/50 text-primary/30"}>
      <Waves className="h-12 w-12" strokeWidth={1.25} />
    </div>
  );
}

function BeachCard({ beach }: { beach: TelAvivBeach }) {
  return <article id={"beach-" + beach.id} data-detailed-card="horizontal" className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_250px] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-4 lg:gap-y-2 lg:p-4">
      <div className="lg:contents">
        <BeachPhotoSlot beach={beach} />
        <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{beach.bestFor}</p>
          <h4 className="mt-1 text-xl font-bold">{beach.name}</h4>
          <p className="mt-3 leading-relaxed lg:mt-2">{beach.summary}</p>
        </div>
      </div>
      <div className="border-t p-4 sm:p-5 lg:col-start-1 lg:row-start-2 lg:border-t-0 lg:p-0">
        <p className="text-sm leading-relaxed text-muted-foreground">{beach.tip}</p>
        <p className="mt-3 rounded-lg bg-secondary/40 px-3 py-2 text-xs font-medium lg:mt-2 lg:py-1.5">{beach.highlights} · {beach.accessShort}</p>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-4 py-3 text-xs sm:px-5 lg:px-4 lg:py-2">
      <BeachMapLink beach={beach} />
      {beach.official && <OfficialLink href={beach.official}>City beach details</OfficialLink>}
    </div>
  </article>;
}

const beachMapUrl = "/maps/tel-aviv-beaches.html?marker=32.085,34.766&bbox=34.732,32.027,34.805,32.155&name=Tel%20Aviv%20beaches&waypoints=" + encodeURIComponent(JSON.stringify(beachMapPoints));

export function TelAvivBeachesGuide() {
  const [mapBeach, setMapBeach] = useState("all");
  const beachMapRef = useRef<HTMLIFrameElement>(null);
  const focusMap = (id: string) => {
    setMapBeach(id);
    beachMapRef.current?.contentWindow?.postMessage({ type: "tel-aviv-beach-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== beachMapRef.current?.contentWindow) return;
      if (event.data?.type !== "tel-aviv-beach-map-selected") return;
      const id = event.data.id;
      if (typeof id === "string" && beachMapPoints.some(beach => beach.id === id)) setMapBeach(id);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);
  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/" }]} />
        <GuideHeroLayout image={<GuideHeroMedia src={heroPhoto} alt="The Mediterranean shoreline and beachfront in Tel Aviv" />}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Tel Aviv & Jaffa · Beaches and seaside</p>
          <h1 className="guide-page-title mt-2">The Best Beaches in Tel Aviv</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From the lively city-centre beaches to the quieter northern shoreline and the coast around Jaffa, my guide will help you choose where to swim, relax and explore the waterfront.</p>
          <PageUpdated date={updatedAt} />
        </GuideHeroLayout>
        <AuthorCard />
      </header>

      <section aria-label="My quick beach recommendation" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
        <h2 className="text-xl font-bold">Where I'd start</h2>
        <p className="mt-2 leading-relaxed">For a first visit, I'd choose <a className={detailLink} href="#beach-gordon">Gordon</a> or <a className={detailLink} href="#beach-frishman">Frishman</a> for their central location, <a className={detailLink} href="#beach-metzitzim">Metzitzim</a> for a family day near the port, or <a className={detailLink} href="#beach-charles-clore">Charles Clore</a> if you're combining the seaside with Jaffa. Tel Aviv–Yafo has 13 municipally listed bathing beaches, but the best choice depends on where you're staying and what you want to do.</p>
      </section>

      <OnThisPage sections={headings} />

      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-24">
        <Heading id="choose" title="Which Tel Aviv beach should you choose?" intro="Choose the beach that suits your plans." />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {beachTopPicks.map((pick, index) => {
            const Icon = pickIcons[index]!;
            const beach = telAvivBeaches.find(item => item.id === pick.id)!;
            return <a key={pick.id} href={"#beach-" + pick.id}
              className="editorial-card-link group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
              <BeachPhotoSlot beach={beach} kind="pick" />
              <span className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="flex items-center gap-2 text-xs font-semibold text-primary"><Icon aria-hidden="true" className="h-4 w-4 shrink-0" />{pick.label}</span>
                <strong className="mt-2 text-base leading-snug">{beach.name}</strong>
                <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{pick.note}</span>
                
              </span>
            </a>;
          })}
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-24">
        <Heading id="compare" title="Tel Aviv beaches at a glance" intro="Compare the municipality's 13 listed beaches from north to south. Check the current bathing conditions and lifeguard service before swimming." />
        
        <div role="region" aria-label="Comparison table" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[540px] table-fixed border-collapse text-left text-sm">
            <caption className="sr-only">Tel Aviv municipal beaches: location, reason to visit and facilities</caption>
            <thead className="bg-secondary/60"><tr>
              <th scope="col" className="w-[30%] border-b px-3 py-2 font-semibold">Beach</th>
              <th scope="col" className="w-[30%] border-b px-3 py-2 font-semibold">Best for</th>
              <th scope="col" className="w-[40%] border-b px-3 py-2 font-semibold">Facilities & access</th>
            </tr></thead>
            {areas.map(area => <tbody key={area.name}>
              <tr className="bg-secondary/50"><th scope="rowgroup" colSpan={3} className="px-3 py-2 text-xs font-bold uppercase tracking-wide">{area.name}</th></tr>
              {telAvivBeaches.filter(beach => beach.area === area.name).map(beach => <tr key={beach.id} className="border-b last:border-0">
                <th scope="row" className="px-3 py-2 font-semibold"><a href={"#beach-" + beach.id} className="text-primary hover:underline">{beach.name}</a></th>
                <td className="px-3 py-2">{beach.bestFor}</td>
                <td className="px-3 py-2">{beach.highlights}<span className="block text-xs text-muted-foreground">{beach.accessShort}</span></td>
              </tr>)}
            </tbody>)}
          </table>
          
        </div>
      </section>

      <section id="beach-map" aria-labelledby="beach-map-h" className="mt-12 scroll-mt-24">
        <Heading id="beach-map" title="Map of Tel Aviv's beaches" intro="The map follows the coastline from North Tzuk to Givat Aliya." />
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end">
            <label htmlFor="tel-aviv-beach-map-select" className="w-full min-w-0 text-sm font-semibold sm:w-auto sm:flex-1">
              Focus on a beach
              <select id="tel-aviv-beach-map-select" value={mapBeach} onChange={event => focusMap(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
                <option value="all">All 13 beaches</option>
                {areas.map(area => <optgroup key={area.name} label={area.name}>
                  {telAvivBeaches.filter(beach => beach.area === area.name).map(beach => <option key={beach.id} value={beach.id}>
                    {telAvivBeaches.indexOf(beach) + 1}. {beach.name}
                  </option>)}
                </optgroup>)}
              </select>
            </label>
            <button type="button" onClick={() => focusMap("all")} disabled={mapBeach === "all"}
              className="min-h-11 w-full rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:cursor-default disabled:opacity-40 sm:w-auto">Show all beaches</button>
          </div>
          <ConsentIframe ref={beachMapRef} title="Interactive map of Tel Aviv's thirteen listed beaches"
            loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={beachMapUrl} width={900} height={440}
            onLoad={() => { if (mapBeach !== "all") beachMapRef.current?.contentWindow?.postMessage({ type: "tel-aviv-beach-map-focus", id: mapBeach }, window.location.origin); }}
            className="h-[340px] w-full border-0 sm:h-[440px]" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
            <span>Map data © OpenStreetMap contributors.</span>
            {mapBeach !== "all" ? <BeachMapLink beach={telAvivBeaches.find(beach => beach.id === mapBeach)!} /> :
              <OfficialLink href="https://www.google.com/maps/search/?api=1&query=Tel+Aviv+beaches">Open in Google Maps</OfficialLink>}
          </div>
        </div>
      </section>

      <section id="beaches" aria-labelledby="beaches-h" className="mt-12 scroll-mt-24">
        <Heading id="beaches" title="My guide to Tel Aviv's beaches" intro="Explore all 13 municipal bathing beaches from north to south." />
        {areas.map((area, index) => {
          const beaches = telAvivBeaches.filter(beach => beach.area === area.name);
          return <section key={area.name} aria-label={area.name} className="mt-9">
            <h3 className="text-xl font-bold sm:text-2xl">{area.name}</h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{area.intro}</p>
            <div className="mt-4 grid gap-3" data-testid="beach-detailed-cards">
              {beaches.map(beach => <BeachCard key={beach.id} beach={beach} />)}
            </div>
          </section>;
        })}
      </section>

      <section id="season" aria-labelledby="season-h" className="mt-12 scroll-mt-24">
        <Heading id="season" title="When is the best time to visit?" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Spring · March–May", "Sea around 17–22°C. Pleasant for coastal walks; swimming becomes more comfortable in late spring."],
            ["Summer · June–August", "Sea around 25–29°C. Best for swimming and beach life; bring sun protection. Jellyfish often arrive in early summer."],
            ["Autumn · September–November", "Sea around 23–29°C, cooling through November. Warm water in early autumn and comfortable sightseeing."],
            ["Winter · December–February", "Sea around 17–21°C. Enjoy the promenade and beach cafés; swim only at staffed stations."],
          ].map(([title,desc]) => <div key={title} className="rounded-xl border bg-card p-4"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed">{desc}</p></div>)}
        </div>
        <p className="mt-4 leading-relaxed">The 2026 official bathing season ran from 25 March to 10 October. The municipality announced nine staffed beaches for November 2026: North Tzuk, Tel Baruch, Nordau, Gordon, Bograshov, Jerusalem, Geula, Charles Clore and Givat Aliya. The next season is scheduled to begin on 14 April 2027. <OfficialLink href={officialTelAvivBeaches}>Current lifeguard information</OfficialLink> includes daily changes and winter hours.</p>
      </section>

      <section id="practical" aria-labelledby="practical-h" className="mt-12 scroll-mt-24">
        <Heading id="practical" title="My practical beach tips" intro="These are the details I'd check before choosing a beach, particularly when travelling with children or anyone who needs accessible facilities." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5"><ShieldCheck aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Swimming and lifeguards</h3><p className="mt-2 text-sm leading-relaxed">Swim only in a declared bathing zone when lifeguards are on duty. White flag: bathing permitted; red: dangerous conditions, follow lifeguard instructions; black: swimming prohibited. Follow local instructions and water-quality warnings. If jellyfish are present, check current local reports and avoid contact with them.</p></div>
          <div className="rounded-xl border bg-card p-5"><Umbrella aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Facilities and costs</h3><p className="mt-2 text-sm leading-relaxed">Public beach entry is free. Reported standard 2026 visitor rental prices: <OfficialLink href={officialBeachPrices}>municipal rental information</OfficialLink>.</p><div className="mt-2 max-w-full overflow-x-auto" role="region" aria-label="Beach equipment rental prices" tabIndex={0}><table className="w-full text-sm"><caption className="sr-only">Reported 2026 beach equipment prices</caption><tbody>{[["Beach chair","₪12"],["Umbrella","₪12"],["Sunbed","₪22"],["Table","₪4"],["Single-use locker","₪5"],["Multi-use electronic locker","₪10"]].map(([item,price]) => <tr key={item} className="border-b last:border-0"><th scope="row" className="py-1 text-left font-normal">{item}</th><td className="text-right font-semibold">{price}</td></tr>)}</tbody></table></div><p className="mt-2 text-xs text-muted-foreground">Reported standard rates; availability and prices may change. Parking is charged separately where applicable.</p></div>
          <div className="rounded-xl border bg-card p-5"><Accessibility aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Accessible visits</h3><p className="mt-2 text-sm leading-relaxed">South Tzuk, Metzitzim and Charles Clore list accessible paths, shade, toilets and water-access chairs. Check the <OfficialLink href={officialBeachFacilities}>facilities and accessibility guide</OfficialLink> for the exact location; the North Tzuk approach has a documented slope limitation.</p></div>
          <div className="rounded-xl border bg-card p-5"><Dog aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Bringing a dog</h3><p className="mt-2 text-sm leading-relaxed">Signed off-leash areas: north of Hilton bathing beach, south of Tel Baruch’s kite-surfing zone, and south of the declared bathing areas at Charles Clore and Givat Aliya.</p></div>
          <div className="rounded-xl border bg-card p-5"><Waves aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Surfing and other water sports</h3><p className="mt-2 text-sm leading-relaxed">Hilton, Charles Clore and some northern areas have water-sport zones. Use the designated area for your activity and check the posted rules before surfing near a bathing zone. There are no lifeguard services at Aviv Beach. This stretch is used for water sports. For swimming, choose a declared beach with an operating lifeguard station, such as Geula.</p></div>
          <div className="rounded-xl border bg-card p-5"><CalendarDays aria-hidden="true" className="mb-2 h-5 w-5 text-primary" /><h3 className="font-bold">Religious beach and special dates</h3><p className="mt-2 text-sm leading-relaxed">Nordau has separate men's and women's bathing days during the season. <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Jewish holidays and holiday eves</Link> can change services and transit; check current official notices.</p></div>
        </div>
      </section>

      <section id="transport" aria-labelledby="transport-h" className="mt-12 scroll-mt-24">
        <Heading id="transport" title="How to get to Tel Aviv's beaches" />
        <p className="leading-relaxed">The central beaches are within walking distance of many beachfront hotels. Use the Google Maps link on each beach card for directions. For public transport and Shabbat travel, see my <Link to="/travel-blog/getting-around-tel-aviv/" className="font-semibold text-primary hover:underline">getting around Tel Aviv guide</Link>.</p>
      </section>

      <section id="beyond" aria-labelledby="beyond-h" className="mt-12 scroll-mt-24">
        <Heading id="beyond" title="Beaches beyond Tel Aviv" intro="Set aside a separate coastal outing for these beaches beyond Tel Aviv." />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="overflow-hidden rounded-xl border bg-card"><img src="/images/tel-aviv-beaches/sidna-ali.webp" alt="Rocky cliffs and Mediterranean waves at Sidna Ali Beach" width={717} height={538} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" /><div className="p-4"><h3 className="text-lg font-semibold">Sidna Ali, Herzliya</h3><p className="mt-2 text-sm leading-relaxed">A northern shore with cliffs and a different landscape from Tel Aviv. Check the specific access route, safe bathing zone and any local restrictions.</p><p className="mt-4 text-xs"><OfficialLink href="https://www.google.com/maps/search/?api=1&query=Sidna+Ali+Beach+Herzliya">View location</OfficialLink></p></div></div>
          <div className="overflow-hidden rounded-xl border bg-card"><img src="/images/tel-aviv-beaches/gaash.webp" alt="Sandy shore below the cliffs at Ga'ash Beach" width={701} height={470} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" /><div className="p-4"><h3 className="text-lg font-semibold">Ga'ash Beach</h3><p className="mt-2 text-sm leading-relaxed">A natural stretch of sand beneath coastal cliffs. Keep away from unstable cliff edges and swim only where lifeguards are on duty.</p><p className="mt-4 text-xs"><OfficialLink href="https://www.google.com/maps/search/?api=1&query=Gaash+Beach+Israel">View location</OfficialLink></p></div></div>
          <div className="overflow-hidden rounded-xl border bg-card"><img src="/images/tel-aviv-beaches/palmahim.webp" alt="Palmahim Beach and its natural coastline" width={703} height={528} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" /><div className="p-4"><h3 className="text-lg font-semibold">Palmahim Beach</h3><p className="mt-2 text-sm leading-relaxed">A protected natural shoreline south of the city. Pedestrian access is free; vehicles may incur entry or parking charges, and swimming arrangements follow park notices.</p><p className="mt-4 text-xs"><OfficialLink href="https://en.parks.org.il/reserve-park/palmahim-beach-national-park/">Official park information</OfficialLink> · <OfficialLink href="https://www.google.com/maps/search/?api=1&query=Palmahim+Beach+National+Park">View location</OfficialLink></p></div></div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">For a longer coastal sightseeing day, I recommend a separate outing to <Link to="/attractions/caesarea/" className="font-semibold text-primary hover:underline">Caesarea</Link> and its beaches.</p>
      </section>

      <FaqList faqs={faqs} />

      <section id="explore-more" aria-labelledby="explore-more-h" className="mt-12 scroll-mt-24">
        <Heading id="explore-more" title="Explore more of Tel Aviv" intro="Continue planning with my city, transport and sightseeing guides." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {related.map(item => <Link key={item.to} to={item.to} className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20">
            <img src={guideHeroPhotoForPath(item.to)!.src} alt={guideHeroPhotoForPath(item.to)!.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            <span className="flex flex-1 flex-col p-4"><strong>{item.title}</strong><span className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</span></span>
          </Link>)}
        </div>
      </section>
      <HomeContactForm showTripadvisorBesidePortraitMobile guide={neighborhoodTripContactCopy("Tel Aviv")} />
      <SourcesDisclosure>
        <p className="mb-3 text-sm leading-relaxed">I use the city's official beach descriptions for the municipal beach list, safety, accessibility and separate-bathing rules, and the Israel Nature and Parks Authority for Palmahim. Lifeguard operation, flags, sea conditions, facilities and park fees can change; confirm the details for your visit.</p>
        <ul className="grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
          <li><OfficialLink href={officialTelAvivBeaches}>Municipality - current lifeguards and sea conditions (Hebrew)</OfficialLink></li>
          <li><OfficialLink href={officialBeachFacilities}>Municipality - facilities, accessibility and dog areas (Hebrew)</OfficialLink></li>
          <li><OfficialLink href={officialBeachPrices}>Municipality - beach rental prices (Hebrew)</OfficialLink></li><li><OfficialLink href="https://seanow.co.il/tel-aviv-gordon/">Reported 2026 visitor rental prices (Hebrew)</OfficialLink></li><li><OfficialLink href="https://tlvbeaches.com/lockers-storage/">Beach locker prices</OfficialLink></li><li><OfficialLink href="https://tlvbeaches.com/temperature/">Typical sea temperatures</OfficialLink></li>
          <li><OfficialLink href="https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Nordau.aspx">Nordau separate beach - official schedule</OfficialLink></li>
          <li><OfficialLink href="https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Charles.aspx">Charles Clore - beach facilities</OfficialLink></li>
          <li><OfficialLink href="https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hatzuk.aspx">North Tzuk - accessibility and facilities</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/palmahim-beach-national-park/">Palmahim Beach National Park</OfficialLink></li>
        </ul>
      </SourcesDisclosure>
    </article>
  </main>;
}
