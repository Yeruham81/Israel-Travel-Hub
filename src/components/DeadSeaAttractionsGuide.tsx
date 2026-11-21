import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight, ExternalLink, MapPin, Waves, Landmark, Leaf, ScrollText,
  Footprints, Trees, Mountain, Sparkles, Building2, Moon, Clock3,
  Lightbulb, CalendarDays, CarFront, ShieldCheck, BedDouble, ChevronRight, Star,
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import {
  deadSeaStops as stops, deadSeaMapPoints, deadSeaRouteIdeas,
  deadSeaFaqs, deadSeaAttractionsUpdatedAt, type DeadSeaStop,
} from "@/data/deadSeaAttractionsGuide";

import heroPhoto from "@/assets/dead-sea/landscape.webp";
import masadaRelated from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import einGediRelated from "@/assets/guides/dead-sea-excursions/ein-gedi-rock-gorge.jpg";
import shoreRelated from "@/assets/dead-sea/sunbeds.webp";
import roadRelated from "@/assets/guides/dead-sea-route-road.webp";
import hotelsRelated from "@/assets/dead-sea/pool.webp";
import toursRelated from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";
import threeDays from "@/assets/home/hero-jerusalem-sm.webp";
import fiveDays from "@/assets/home/hero-caesarea-sm.webp";
import sevenDays from "@/assets/home/hero-galilee-sm.webp";
import tenDays from "@/assets/home/hero-eilat-mountains-sm.webp";
import trainPhoto from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import seasonPhoto from "@/assets/guides/2026-10/best-time-to-visit-israel.webp";
import beachMudTourPhoto from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import masadaTourPhoto from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import sunriseTourPhoto from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";
import { affiliateConfig } from "@/data/registry";
import { relFor, recordOutboundClick } from "@/lib/outbound";
import deadSeaPhotoCredits from "@/data/deadSeaPhotoCredits.json";

const updatedAt = deadSeaAttractionsUpdatedAt;
const curatedTourIds = ["jslm-deadsea-beach-viator","jslm-deadsea-masada-viator","jslm-deadsea-sunrise-gyg"] as const;
const curatedTours = curatedTourIds.map(id=>deadSeaTourCards.find(tour=>tour.id===id)).filter((tour):tour is (typeof deadSeaTourCards)[number]=>Boolean(tour));
const curatedTourImages: Record<string,{src:string;alt:string}> = {
  "jslm-deadsea-beach-viator":{src:beachMudTourPhoto,alt:"Dead Sea mud bathing experience beside the mineral-rich water"},
  "jslm-deadsea-masada-viator":{src:masadaTourPhoto,alt:"Ruins of Herod’s palace at Masada"},
  "jslm-deadsea-sunrise-gyg":{src:sunriseTourPhoto,alt:"Snake Path winding up the slopes of Masada"},
};
function trackedDeadSeaTourUrl(id:string){
  const base=affiliateConfig[id]?.trackingUrl;
  if(!base)return null;
  const url=new URL(base);
  if(!["viator.tpm.li","getyourguide.tpm.li"].includes(url.hostname))return null;
  url.searchParams.set("sub_id","deadsea_attractions_"+id.replace("jslm-deadsea-",""));
  return url.toString();
}
const icons = [Waves, Landmark, Leaf, ScrollText, Footprints, Trees, Mountain, Sparkles, Building2, Moon];
const linkClass = "inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
const sections = [
  ["choose", "Choose an experience"], ["compare", "Compare all ten"],
  ["experiences", "Ten Dead Sea experiences"], ["area-map", "Area map"],
  ["routes", "Suggested routes"], ["practical", "Practical tips"], ["tour-options","Tours"],
  ["faq", "FAQ"], ["explore-more", "Explore further"], ["plan-trip", "Plan your trip"],
  ["contact", "Contact me"],
] as const;

const related = [
  {title:"Visit Masada",to:"/attractions/masada/" as const,desc:"The plateau, entrance choices and cable car",image:masadaRelated,alt:"Stone structures of Masada's ancient palaces"},
  {title:"Explore Ein Gedi",to:"/attractions/ein-gedi/" as const,desc:"Check trails, reserve access and wildlife",image:einGediRelated,alt:"Rocky canyon scenery in the Ein Gedi region"},
  {title:"The Dead Sea visitor guide",to:"/travel-blog/the-dead-sea/" as const,desc:"Beaches, floating tips and local facilities",image:shoreRelated,alt:"Sunbeds at a managed Dead Sea beach"},
  {title:"Jerusalem to the Dead Sea",to:"/travel-blog/jerusalem-to-the-dead-sea/" as const,desc:"Routes, buses and realistic travel planning",image:roadRelated,alt:"Road through the desert landscape towards the Dead Sea"},
  {title:"Where to stay at the Dead Sea",to:"/travel-blog/best-dead-sea-hotels/" as const,desc:"Compare Ein Bokek and other hotel options",image:hotelsRelated,alt:"Swimming pool at a Dead Sea resort"},
  {title:"Masada & Dead Sea tours",to:"/tours/masada-dead-sea/" as const,desc:"Explore guided day trips and available experiences",image:toursRelated,alt:"The Snake Path ascending towards Masada"},
];
const planning = [
  {title:"3 days in Israel",to:"/travel-blog/israel-itinerary-3-days/" as const,desc:"A compact city and regional trip",image:threeDays,alt:"View over Jerusalem"},
  {title:"5 days in Israel",to:"/travel-blog/israel-itinerary-5-days/" as const,desc:"Allow time for a separate excursion",image:fiveDays,alt:"Caesarea and the Mediterranean coast"},
  {title:"7 days in Israel",to:"/travel-blog/israel-itinerary-7-days/" as const,desc:"Combine several contrasting regions",image:sevenDays,alt:"Galilee hills and the Sea of Galilee"},
  {title:"10 days in Israel",to:"/travel-blog/israel-itinerary-10-days/" as const,desc:"A broader route at a sensible pace",image:tenDays,alt:"Mountains near Eilat"},
  {title:"Getting around Israel",to:"/travel-blog/getting-around-israel/" as const,desc:"Compare transport for different journeys",image:trainPhoto,alt:"Rail platform at Ben Gurion Airport"},
  {title:"Best time to visit",to:"/travel-blog/best-time-to-visit-israel/" as const,desc:"Weather and seasons by region",image:seasonPhoto,alt:"Seasonal landscape in Israel"},
];

function Heading({id,title,intro}:{id:string;title:string;intro?:ReactNode}) {
  return <div className="mb-5">
    <h2 id={id+"-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}
  </div>;
}
function OfficialLink({href,children}:{href:string;children:ReactNode}) {
  return <a className={linkClass} href={href} target="_blank" rel="noopener noreferrer">{children}
    <ExternalLink aria-hidden className="h-3.5 w-3.5" /><span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function MapLink({label,query}:{label:string;query:string}) {
  return <a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query)} target="_blank" rel="noopener noreferrer" className={linkClass}>
    <MapPin aria-hidden className="h-3.5 w-3.5" />{label} on Google Maps<span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
function Tip({children}:{children:ReactNode}) {
  return <aside className="flex items-start gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-100">
    <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div>{children}</div>
  </aside>;
}
function GuideCard({item}:{item:typeof related[number] | typeof planning[number]}) {
  return <Link to={item.to} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary">
    <img src={guideHeroPhotoForPath(String(item.to))?.src ?? item.image} alt={guideHeroPhotoForPath(String(item.to))?.alt ?? item.alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
    <span className="flex flex-1 flex-col p-3 sm:p-4">
      <strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong>
      <span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</span>
      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Explore guide <ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></span>
    </span>
  </Link>;
}
function StopCard({stop,number}:{stop:DeadSeaStop;number:number}) {
  const Icon=icons[number-1]!;
  return <article id={stop.id} className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm" data-testid="deadsea-experience-card">
    {stop.image ? <img src={stop.image.src} alt={stop.image.alt} loading="lazy" decoding="async" width={880} height={495} className="aspect-[16/9] w-full object-cover"/> :
      <div className="flex aspect-[16/9] items-center justify-center gap-3 bg-secondary/45 px-4 text-center">
        <Icon aria-hidden className="h-10 w-10 shrink-0 text-primary/70" />
        <span className="max-w-44 text-base font-semibold leading-snug text-foreground">{stop.shortTitle}</span>
      </div>}
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{stop.kind}</p>
      <h3 className="mt-2 text-xl font-bold sm:text-2xl">{number}. {stop.title}</h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 rounded-lg bg-secondary/45 p-3 text-xs leading-snug">
        <div><dt className="font-semibold text-foreground">Best for</dt><dd className="mt-1 text-muted-foreground">{stop.bestFor}</dd></div>
        <div><dt className="font-semibold text-foreground">Allow</dt><dd className="mt-1 text-muted-foreground">{stop.allow}</dd></div>
        <div><dt className="font-semibold text-foreground">Area</dt><dd className="mt-1 text-muted-foreground">{stop.area}</dd></div>
        <div><dt className="font-semibold text-foreground">Access</dt><dd className="mt-1 text-muted-foreground">{stop.access}</dd></div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed">{stop.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stop.practical}</p>
      <p className="mt-3 text-sm leading-relaxed"><strong>Getting there: </strong>{stop.gettingThere}</p>
      <p className="mt-4 rounded-lg border-l-2 border-primary/40 bg-secondary/30 px-3 py-2.5 text-sm leading-relaxed"><strong>My tip: </strong>{stop.tip}</p>
    </div>
    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t px-4 py-4 sm:px-5">
      {stop.guide && <Link to={stop.guide.to} className={linkClass}>{stop.guide.label}<ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></Link>}
      {stop.extraGuide && <Link to={stop.extraGuide.to} className={linkClass}>{stop.extraGuide.label}<ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></Link>}
      {stop.official && <OfficialLink href={stop.official.href}>{stop.official.label}</OfficialLink>}
      {stop.mapLinks.map(location=><MapLink key={location.query} {...location}/>)}
    </div>
  </article>;
}

const mapUrl="/maps/dead-sea-attractions.html?waypoints="+encodeURIComponent(JSON.stringify(
  deadSeaMapPoints.map(({id,name,label,lat,lon,query})=>({id,name,label,lat,lon,query}))
));

export function DeadSeaAttractionsGuide() {
  const [selectedPoint,setSelectedPoint]=useState("all");
  const mapRef=useRef<HTMLIFrameElement>(null);
  const focusMap=(id:string)=>{
    setSelectedPoint(id);
    mapRef.current?.contentWindow?.postMessage({type:"dead-sea-attractions-map-focus",id},window.location.origin);
  };
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin || event.source!==mapRef.current?.contentWindow)return;
      if(event.data?.type!=="dead-sea-attractions-map-selected")return;
      if(deadSeaMapPoints.some(point=>point.id===event.data.id))setSelectedPoint(event.data.id);
    };
    window.addEventListener("message",receive);
    return ()=>window.removeEventListener("message",receive);
  },[]);
  return <main className="mx-auto max-w-5xl px-4 pb-10">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[
          {name:"Home",to:"/"},
          {name:"Travel guides",to:"/travel-blog/"},
          {name:"Dead Sea attractions",to:"/travel-blog/dead-sea-attractions/"},
        ]}/>
        <GuideHeroLayout image={<GuideHeroMedia src={heroPhoto} alt="Desert hills and the deep blue water of the Dead Sea" />}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Dead Sea · Nature, heritage & experiences</p>
          <h1 className="guide-page-title mt-2">Dead Sea Attractions: Best Things to Do in Israel's Dead Sea Region</h1>
          <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">
            The Dead Sea is more than a place to float. I recommend pairing its shoreline with one or two well-chosen desert, historical or nature stops. This guide will help you compare ten experiences, pick a realistic route and find the right entrance before setting out.
          </p>
          <PageUpdated date={updatedAt}/>
        </GuideHeroLayout>
        <AuthorCard/>
      </header>

      <section aria-labelledby="first-visit-h" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
        <h2 id="first-visit-h" className="text-xl font-bold">What I'd choose for a first visit</h2>
        <p className="mt-2 leading-relaxed">I'd start with <a href="#masada" className={linkClass}>Masada</a> and a supervised <a href="#ein-bokek-beach" className={linkClass}>Ein Bokek beach</a> if the travel day allows. For a quieter nature day, choose an appropriate open route at <a href="#ein-gedi" className={linkClass}>Ein Gedi</a> or <a href="#nahal-bokek" className={linkClass}>Nahal Bokek</a>. The northern sites of Qumran and Einot Tsukim make more sense as a separate outing.</p>
      </section>
      <OnThisPage sections={sections}/>

      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-24">
        <Heading id="choose" title="Choose what to see and do" intro="Ten different ways to enjoy the Dead Sea region. Choose what interests you, then follow the card to the detailed visitor tips."/>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5" data-testid="deadsea-quick-picks">
          {stops.map((stop,index)=>{
            const Icon=icons[index]!;
            return <a key={stop.id} href={"#"+stop.id} className="group flex min-w-0 flex-col rounded-xl border bg-card p-2.5 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary sm:p-3">
              <div className="flex items-center justify-between gap-2"><Icon aria-hidden className="h-5 w-5 shrink-0 text-primary"/><span className="text-xs font-bold tabular-nums text-muted-foreground">{String(index+1).padStart(2,"0")}</span></div>
              <strong className="mt-2 text-sm leading-snug">{stop.shortTitle}</strong>
              <span className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{stop.area}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-primary">Read tips <ArrowUpRight aria-hidden className="h-3.5 w-3.5"/></span>
            </a>;
          })}
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-h" className="mt-12 scroll-mt-24">
        <Heading id="compare" title="Compare all ten Dead Sea experiences" intro="Use this overview to match your interests, access requirements and available time. The suggested durations exclude travel between stops."/>
        <p className="mb-3 text-xs text-muted-foreground md:hidden">Swipe the table sideways to compare all ten Dead Sea experiences.</p>
        <div role="region" aria-label="Dead Sea attractions comparison" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[800px] table-fixed border-collapse text-left text-sm">
            <caption className="sr-only">Compare ten attractions by area, admission or booking requirements, and suggested visiting duration</caption>
            <thead className="bg-secondary/60"><tr>
              <th scope="col" className="w-[29%] border-b px-3 py-3">Attraction</th>
              <th scope="col" className="w-[23%] border-b px-3 py-3">Area</th>
              <th scope="col" className="w-[28%] border-b px-3 py-3">Entry & booking</th>
              <th scope="col" className="w-[20%] border-b px-3 py-3">Time to allow</th>
            </tr></thead>
            <tbody>{stops.map((stop,index)=><tr key={stop.id} className="border-b last:border-0">
              <th scope="row" className="px-3 py-3 font-semibold"><a href={"#"+stop.id} className="text-primary hover:underline">{index+1}. {stop.shortTitle}</a></th>
              <td className="px-3 py-3">{stop.area}</td>
              <td className="px-3 py-3">{stop.access}</td>
              <td className="px-3 py-3 text-muted-foreground">{stop.allow}</td>
            </tr>)}</tbody>
          </table>
          
        </div>
      </section>

      <section id="experiences" aria-labelledby="experiences-h" className="mt-12 scroll-mt-24">
        <Heading id="experiences" title="My guide to ten Dead Sea experiences" intro="I've included practical access, transport and planning advice with each stop. Where the site has a separate in-depth guide, you can continue there."/>
        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {stops.map((stop,index)=><StopCard key={stop.id} stop={stop} number={index+1}/>)}
        </div>
      </section>
      <div className="mt-6"><Tip>Check the <OfficialLink href="https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/">current Ein Gedi trail arrangements</OfficialLink> before planning a hike, and watch for flash-flood or heat warnings anywhere in the Judean Desert. A marked route may be closed even when conditions look fine where you are staying.</Tip></div>

      <section id="area-map" aria-labelledby="area-map-h" className="mt-12 scroll-mt-24">
        <Heading id="area-map" title="Where the Dead Sea attractions are" intro="The northern Dead Sea, the Ein Gedi–Masada area and the southern resort strip are different parts of a long region. Use this map to plan the geography before setting off."/>
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end">
            <label htmlFor="deadsea-map-select" className="min-w-0 flex-1 text-sm font-semibold">
              Focus on a location
              <select id="deadsea-map-select" className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary" value={selectedPoint} onChange={event=>focusMap(event.target.value)}>
                <option value="all">All map locations</option>
                {deadSeaMapPoints.map(point=><option key={point.id} value={point.id}>{point.name}</option>)}
              </select>
            </label>
            <button type="button" onClick={()=>focusMap("all")} disabled={selectedPoint==="all"} className="min-h-11 rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:opacity-40">Show all locations</button>
          </div>
          <iframe ref={mapRef} title="Interactive map of representative Dead Sea attractions" src={mapUrl} width={900} height={450} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[330px] w-full border-0 sm:h-[450px]"
            onLoad={()=>{if(selectedPoint!=="all")mapRef.current?.contentWindow?.postMessage({type:"dead-sea-attractions-map-focus",id:selectedPoint},window.location.origin);}}/>
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground">
            <span>Markers are for regional orientation; confirm the exact entrance or trailhead before travelling. Map data © OpenStreetMap contributors.</span>
            {selectedPoint==="all" ? <OfficialLink href="https://www.google.com/maps/search/?api=1&query=Dead+Sea+Israel+attractions">See the region on Google Maps</OfficialLink> :
            <MapLink label="Selected location" query={deadSeaMapPoints.find(point=>point.id===selectedPoint)?.query||"Dead Sea, Israel"}/>}
          </div>
        </div>
      </section>

      <section id="routes" aria-labelledby="routes-h" className="mt-12 scroll-mt-24">
        <Heading id="routes" title="How I'd combine the attractions" intro="Choose a manageable pair of attractions or allow an overnight stay for more. I wouldn't try to cover both ends of the Dead Sea in a rushed day."/>
        <div className="grid gap-4 lg:grid-cols-3">
          {deadSeaRouteIdeas.map((route,index)=><article key={route.title} className="flex flex-col rounded-xl border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Route idea {index+1} · {route.kind}</p>
            <h3 className="mt-2 text-lg font-bold">{route.title}</h3>
            <p className="mt-2 text-sm leading-relaxed">{route.intro}</p>
            <p className="mt-3 text-sm leading-relaxed"><strong>Time to allow: </strong>{route.timeBudget}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Travel: </strong>{route.travel}</p>
            <div className="mt-4 flex flex-wrap gap-2">{route.stopIds.map(id=>{
              const stop=stops.find(item=>item.id===id)!;
              return <a key={id} href={"#"+id} className="rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-secondary">{stop.shortTitle}</a>;
            })}</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">My tip: </strong>{route.tip}</p>
          </article>)}
        </div>
      </section>
      <div className="mt-5"><Tip>A trip based in <Link to="/travel-blog/jerusalem-to-the-dead-sea/" className="font-semibold text-primary underline-offset-4 hover:underline">Jerusalem</Link> has a different travel budget from one based at an Ein Bokek hotel. Always leave room for the return journey and site closing times.</Tip></div>

      <section id="practical" aria-labelledby="practical-h" className="mt-12 scroll-mt-24">
        <Heading id="practical" title="My practical tips for the Dead Sea region" intro="A little planning matters here, especially with desert heat, transport gaps and changing access to nature sites."/>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed">For journeys from Jerusalem, see my <Link to="/travel-blog/jerusalem-to-the-dead-sea/" className="font-semibold text-primary hover:underline">Jerusalem–Dead Sea travel guide</Link>. If you are arriving at Ben Gurion Airport, compare the <Link to="/travel-blog/ben-gurion-airport-to-ein-bokek/" className="font-semibold text-primary hover:underline">airport-to-Ein-Bokek options</Link>. From Tel Aviv, allow extra intercity travel time, and check the departure and return services for your date.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5"><ShieldCheck aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Choose safe places to bathe</h3><p className="mt-2 text-sm leading-relaxed">Use a supervised designated Dead Sea beach, not a roadside shoreline. Keep the water out of your eyes and avoid swimming where unstable ground or sinkholes are a risk.</p></div>
          <div className="rounded-xl border bg-card p-5"><Clock3 aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Build in travel time</h3><p className="mt-2 text-sm leading-relaxed">Qumran, Ein Gedi, Masada and Ein Bokek lie in different sections of the region. Verify the exact park entrance and allow time for parking, showers and transfers.</p></div>
          <div className="rounded-xl border bg-card p-5"><CalendarDays aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Check seasonal access</h3><p className="mt-2 text-sm leading-relaxed">Park closing times, guided visits, lifeguard services and public transport vary. My <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Israel calendar of events</Link> explains holidays that can affect your trip.</p></div>
          <div className="rounded-xl border bg-card p-5"><Footprints aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Respect desert trail warnings</h3><p className="mt-2 text-sm leading-relaxed">Avoid exposed hikes in extreme heat and never enter a wadi when flash floods are forecast upstream. Follow signed routes and the park authorities' latest notices.</p></div>
          <div className="rounded-xl border bg-card p-5"><CarFront aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Choose transport for your plan</h3><p className="mt-2 text-sm leading-relaxed">A focused beach day may work by bus; combining sites usually takes more effort. Compare <Link to="/travel-blog/getting-around-israel/" className="font-semibold text-primary hover:underline">public transport</Link>, tours and a private driver.</p></div>
          <div className="rounded-xl border bg-card p-5"><BedDouble aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Consider an overnight stay</h3><p className="mt-2 text-sm leading-relaxed">Staying near Ein Bokek gives you a more relaxed beach visit and time for southern attractions. See my <Link to="/travel-blog/best-dead-sea-hotels/" className="font-semibold text-primary hover:underline">Dead Sea hotels guide</Link>.</p></div>
        </div>
      </section>
      <div className="mt-5"><Tip>For water activities, hiking and organised desert outings, check your party's physical ability, accessibility needs and the operator's exact instructions before reserving.</Tip></div>

      <section id="tour-options" aria-labelledby="tour-options-h" className="mt-12 scroll-mt-24">
        <Heading id="tour-options" title="Compare three organised Dead Sea tours" intro="These are examples from Viator and GetYourGuide, departing from Jerusalem. I suggest comparing the stops, walking conditions and what is included before choosing a date."/>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-three-tours">
          {curatedTours.map(tour=>{
            const href=trackedDeadSeaTourUrl(tour.id);
            const photo=curatedTourImages[tour.id];
            if(!href||!photo)return null;
            return <a key={tour.id} href={href} target="_blank" rel={relFor(true)}
              onClick={()=>recordOutboundClick({pageId:"dead_sea_attractions",productId:tour.id,offerId:tour.id})}
              data-testid="deadsea-curated-tour" className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width={600} height={338} className="aspect-[16/9] w-full object-cover"/>
              <span className="flex flex-1 flex-col p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{tour.provider}</span>
                <strong className="mt-1 text-base leading-snug group-hover:text-primary">{tour.title}</strong>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.subtitle}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock3 aria-hidden className="h-3.5 w-3.5"/>{tour.duration}</span>
                  <span className="inline-flex items-center gap-1" aria-label={tour.rating+" out of five based on a previously checked rating"}>
                    <Star aria-hidden className="h-3.5 w-3.5 fill-current text-amber-500"/>{tour.rating.toFixed(1)} ({tour.reviewCount.toLocaleString("en-US")})
                  </span>
                </span>
                <span className="mt-auto flex items-end justify-between gap-2 border-t pt-4 text-sm">
                  <span className="text-muted-foreground">From <strong className="text-foreground">US${tour.fromUsd}</strong><span className="block text-xs">per person</span></span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">View & book <ExternalLink aria-hidden className="h-3.5 w-3.5"/></span>
                </span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>;
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Starting prices, ratings and review counts are previously checked provider snapshots, not live availability. Check the current booking terms and Ein Gedi access conditions before reserving.</p>
        <div className="mt-5 flex justify-center">
          <Link to="/tours/masada-dead-sea/" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-secondary/35 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">Explore all Masada & Dead Sea tours <ChevronRight aria-hidden className="h-4 w-4"/></Link>
        </div>
      </section>

      <FaqList faqs={deadSeaFaqs}/>

      <section id="explore-more" aria-labelledby="explore-more-h" className="mt-12 scroll-mt-24">
        <Heading id="explore-more" title="Explore the Dead Sea further" intro="My detailed guides can help you choose an entrance, plan a beach stop or extend your stay."/>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item=><GuideCard key={item.to} item={item}/>)}</div>
      </section>

      <section id="plan-trip" aria-labelledby="plan-trip-h" className="mt-12 scroll-mt-24">
        <Heading id="plan-trip" title="Plan the next part of your Israel trip" intro={<>Use a suggested itinerary or compare seasons and transport. If you are staying overnight, see my <Link to="/accommodation/" className="font-semibold text-primary hover:underline">Where to Stay in Israel</Link> guide.</>}/>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{planning.map(item=><GuideCard key={item.to} item={item}/>)}</div>
      </section>

      <HomeContactForm guide={{
        heading:"Need a private transfer or day trip to the Dead Sea?",
        introduction:"I'm Moshe Barak. I arrange private airport transfers and customised trips in Israel. Tell me your travel dates, pickup point, group size and the Dead Sea sites you would like to visit, and I'll reply personally about transport options.",
        subject:"",
        placeholder:"Travel date, pickup location, number of travellers, Dead Sea stops or your question…",
      }}/>

      <SourcesDisclosure>
        <p className="mb-3 text-sm leading-relaxed">Official site pages are useful for current reservations, entry arrangements and weather-sensitive changes. I recommend checking the specific date before you travel.</p>
        <ul className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
          <li><OfficialLink href="https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en">Tamar Regional Council — Ein Bokek Central Beach</OfficialLink></li>
          <li><OfficialLink href="https://www.deadsea.co.il/tracks/ein-bokek/?lang=en">Tamar Regional Council — Nahal Bokek</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/masada-national-park/">Israel Nature & Parks Authority — Masada</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/">Israel Nature & Parks Authority — Ein Gedi</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/qumran-park">Israel Nature & Parks Authority — Qumran</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/reserve-park/enot-tsukim-nature-reserve/">Israel Nature & Parks Authority — Einot Tsukim</OfficialLink></li>
          <li><OfficialLink href="https://www.deadseanovo.co.il/">Moshe Novomeysky Visitor Center — booking (Hebrew)</OfficialLink></li>
          <li><OfficialLink href="https://www.deadsea.co.il/attractions/?lang=en">Dead Sea regional tourism — activities</OfficialLink></li>
          <li><OfficialLink href="https://ims.gov.il/en">Israel Meteorological Service — forecast and warnings</OfficialLink></li>
          <li><OfficialLink href="https://en.parks.org.il/">Israel Nature & Parks Authority — parks and access</OfficialLink></li>
        </ul>
        <div className="mt-5 border-t pt-4">
          <h3 className="text-sm font-semibold text-foreground">Photograph credits</h3>
          <p className="mt-1 text-xs leading-relaxed">Three location-specific images are adapted to the card proportions from licensed Wikimedia Commons originals.</p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed">
            {deadSeaPhotoCredits.map(credit=><li key={credit.id}>
              <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{credit.id==="nahal-bokek"?"Nahal Bokek":credit.id==="einot-tsukim"?"Einot Tsukim":"Moshe Novomeysky Visitor Center"}</a>
              {" — photograph by "+credit.author+", "}
              <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{credit.license}</a>
              {". Cropped to fit the layout."}
            </li>)}
          </ul>
        </div>
      </SourcesDisclosure>
    </article>
  </main>;
}
