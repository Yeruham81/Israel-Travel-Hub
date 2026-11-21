import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
 ArrowUpRight, ExternalLink, MapPin, Clock3, Waves, Landmark, Utensils, House,
 Building2, Palette, Footprints, ShoppingBag, Coffee, TreePalm, Lightbulb,
 CalendarDays, Train, ShieldCheck, BedDouble, ChevronRight, Compass, Ticket,
} from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import {
 telAvivExperiences as stops, telAvivRoutes, telAvivRouteNavigation, telAvivFaqs,
 telAvivMapPoints, telAvivAttractionsUpdatedAt, type TelAvivExperience
} from "@/data/telAvivAttractionsGuide";
import { affiliateConfig } from "@/data/registry";
import { tourPhotos } from "@/data/tours";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import florentinPhotoCredit from "@/data/telAvivGraffitiPhotoCredit.json";

import hero from "@/assets/home/tel-aviv-coast.webp";
import relatedJaffa from "@/assets/shore-hub/guide-jaffa.webp";
import relatedBeach from "@/assets/tel-aviv/beachfront.webp";
import relatedMuseum from "@/assets/guides/2026-10/museums-in-tel-aviv.webp";
import relatedTransport from "@/assets/guides/2026-11/buses-in-tel-aviv.webp";
import relatedHotels from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";
import relatedDayTrips from "@/assets/home/road-trip-card.webp";
import threeDays from "@/assets/home/hero-jerusalem-sm.webp";
import fiveDays from "@/assets/home/hero-caesarea-sm.webp";
import sevenDays from "@/assets/home/hero-galilee-sm.webp";
import tenDays from "@/assets/home/hero-eilat-mountains-sm.webp";
import railPhoto from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import seasonPhoto from "@/assets/guides/2026-10/best-time-to-visit-israel.webp";
import tourJaffa from "@/assets/attractions-hub/card-jaffa-420.webp";
import tourFood from "@/assets/tel-aviv/kerem-hateimanim.webp";
import tourCity from "@/assets/home/hero-tel-aviv-sm.webp";

const icons=[Landmark,Waves,Utensils,House,Building2,Palette,Footprints,ShoppingBag,Coffee,TreePalm];
const linkClass="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
const sections=[
 ["choose","Choose an experience"],["compare","Compare ten attractions"],
 ["explore","Ten attractions"],["map","Attractions map"],["routes","Suggested walks"],
 ["tips","Practical tips"],["activities","Tours & activities"],
 ["faq","FAQ"],["explore-more","Explore further"],["plan","Plan your trip"],["contact","Contact me"],
] as const;
const related=[
 {title:"Explore Old Jaffa",to:"/attractions/jaffa/" as const,description:"Harbour, historic lanes and hilltop views",image:relatedJaffa,alt:"Jaffa harbour and historic buildings"},
 {title:"Tel Aviv beaches",to:"/travel-blog/beaches-in-tel-aviv/" as const,description:"Choose a supervised beach and seaside walk",image:relatedBeach,alt:"Sandy beach and promenade on the Tel Aviv coast"},
 {title:"Museums in Tel Aviv",to:"/travel-blog/museums-in-tel-aviv/" as const,description:"Art, archaeology and indoor culture",image:relatedMuseum,alt:"Exterior of a Tel Aviv museum"},
 {title:"Getting around Tel Aviv",to:"/travel-blog/getting-around-tel-aviv/" as const,description:"Buses, the Red Line, walking and taxis",image:relatedTransport,alt:"Bus serving central Tel Aviv"},
 {title:"Israel travel tips",to:"/travel-blog/israel-travel-tips/" as const,description:"My essential planning advice for visitors",image:relatedDayTrips,alt:"Travel planning in Israel"},
 {title:"Where to stay in Tel Aviv",to:"/travel-blog/where-to-stay-in-tel-aviv/" as const,description:"Compare neighbourhoods and hotels",image:relatedHotels,alt:"A street in a central Tel Aviv accommodation area"},
];
const planning=[
 {title:"3 days in Israel",to:"/travel-blog/israel-itinerary-3-days/" as const,description:"A shorter journey around the highlights",image:threeDays,alt:"Jerusalem skyline"},
 {title:"5 days in Israel",to:"/travel-blog/israel-itinerary-5-days/" as const,description:"Add a city visit or a day excursion",image:fiveDays,alt:"Coastal ruins of Caesarea"},
 {title:"7 days in Israel",to:"/travel-blog/israel-itinerary-7-days/" as const,description:"Explore a broader range of regions",image:sevenDays,alt:"Sea of Galilee landscape"},
 {title:"10 days in Israel",to:"/travel-blog/israel-itinerary-10-days/" as const,description:"Plan a more extensive Israel route",image:tenDays,alt:"Mountains near Eilat"},
 {title:"Ben Gurion Airport to Tel Aviv",to:"/travel-blog/ben-gurion-airport-to-tel-aviv/" as const,description:"Train, bus and private transfer options",image:railPhoto,alt:"Rail platform at Ben Gurion Airport"},
 {title:"Best time to visit Israel",to:"/travel-blog/best-time-to-visit-israel/" as const,description:"Compare seasons and weather",image:seasonPhoto,alt:"Landscape showing a season in Israel"}
];
const affiliateTours=[
 {id:"tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",provider:"GetYourGuide",title:"Tel Aviv Urban Walk: Architecture, Food & Street Art",description:"A guided city experience combining neighbourhood culture, streets and local flavours",image:tourCity,alt:"The Tel Aviv skyline and urban coastline",duration:"Confirm with provider",meeting:"Check selected meeting point",fromUsd:null,ratingLabel:null},
 {id:"tour-old-jaffa-walk-viator@tours-tel-aviv-jaffa",provider:"Viator",title:"Old Jaffa & Flea Market Walking Tour",description:"A compact walking tour of Jaffa's stone streets, harbour and flea market",image:tourJaffa,alt:"Historic stone buildings in Jaffa",duration:"1 hr 30 min",meeting:"Yefet St 7, Jaffa",fromUsd:59,ratingLabel:"4.5 · 13 reviews"},
 {id:"tour-carmel-market-food-tour-viator@tours-tel-aviv-jaffa",provider:"Viator",title:"Carmel Market Food-Tasting Tour",description:"Local flavours and food tastings at Carmel Market and Kerem HaTeimanim. This is a tasting walk, not a cooking workshop.",image:"/images/tel-aviv-attractions/carmel-food-tasting.webp",alt:"A colourful stall of olives, pickles and spices at Carmel Market",duration:"3 hours",meeting:"HaCarmel St 43",fromUsd:145,ratingLabel:"5.0 · 143 reviews"},
 {id:"tour-tel-aviv-street-art-viator@tours-tel-aviv-jaffa",provider:"Viator",title:"Tel Aviv Street Art & Graffiti Tour",description:"Discover the changing graffiti and urban-art scene with a local guide",image:"/images/tel-aviv-attractions/florentin-graffiti.webp",alt:"A real graffiti mural on Florentin Street in Tel Aviv",duration:"2 hours",meeting:"Meeting point varies",fromUsd:65,ratingLabel:"4.9 · 77 reviews"},
 {id:"tour-neve-tzedek-walk-getyourguide@tours-tel-aviv-jaffa",provider:"GetYourGuide",title:"Neve Tzedek Cultural Walking Tour",description:"Explore restored historic streets, galleries and the Suzanne Dellal Center with a local guide",image:tourPhotos["neve-tzedek-walk"]!.src,alt:tourPhotos["neve-tzedek-walk"]!.alt,duration:"1½ hours",meeting:"Shabazi Street; confirm your selected starting point",fromUsd:null,ratingLabel:null},
 {id:"tour-tel-aviv-cycling-viator@tours-tel-aviv-jaffa",provider:"Viator",title:"Tel Aviv Guided Cycling Tour",description:"Explore waterfront paths and neighbourhood landmarks by bike; check the route, cycling requirements and inclusions",image:tourPhotos["tel-aviv-cycling"]!.src,alt:tourPhotos["tel-aviv-cycling"]!.alt,duration:"About 3 hours",meeting:"Confirm the departure location with the operator",fromUsd:null,ratingLabel:null},
] as const;
/** Google Maps opens an ordinary walking itinerary; visitors can adjust transit on the map. */
function walkingDirectionsUrl(index:number){
 const route=telAvivRouteNavigation[index];
 if(!route)return "https://www.google.com/maps/dir/?api=1&destination=Tel+Aviv+Israel";
 const params=new URLSearchParams({api:"1",origin:route.origin,destination:route.destination,travelmode:"walking"});
 params.set("waypoints",route.waypoints.join("|"));
 return "https://www.google.com/maps/dir/?"+params.toString();
}

function Heading({id,title,intro}:{id:string;title:string;intro?:ReactNode}) {
 return <div className="mb-5"><h2 id={id+"-h"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
 {intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function External({url,children}:{url:string;children:ReactNode}) {
 return <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}<ExternalLink aria-hidden className="h-3.5 w-3.5"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function MapLink({label,query}:{label:string;query:string}){
 const url="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query);
 return <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}><MapPin aria-hidden className="h-3.5 w-3.5"/>{label} on Google Maps<span className="sr-only"> (opens in a new tab)</span></a>;
}
function Tip({children}:{children:ReactNode}){
 return <aside className="flex items-start gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-100">
 <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"/><div>{children}</div></aside>;
}
function GuideCard({item}:{item:typeof related[number] | typeof planning[number]}){
 return <Link to={item.to} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary">
 <img src={guideHeroPhotoForPath(item.to)!.src} alt={guideHeroPhotoForPath(item.to)!.alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>
 <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong>
 <span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span>
 <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">Explore guide <ArrowUpRight aria-hidden className="h-3.5 w-3.5"/></span></span></Link>;
}
function ExperienceCard({stop,num}:{stop:TelAvivExperience;num:number}){
 return <article id={stop.id} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm" data-testid="tel-aviv-experience-card" data-detailed-card="horizontal">
  <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
   <img src={stop.image.src} alt={stop.image.alt} width={880} height={495} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover lg:col-start-2 lg:row-start-1 lg:aspect-[4/3] lg:rounded-xl"/>
   <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{stop.category}</p>
    <h3 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{num}. {stop.title}</h3>
    <p className="mt-3 text-sm leading-relaxed">{stop.description}</p>
   </div>
  </div>
  <div className="border-t p-4 sm:p-5 lg:px-6">
  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 rounded-lg bg-secondary/45 p-3 text-xs leading-snug">
  <div><dt className="font-semibold">Best for</dt><dd className="mt-1 text-muted-foreground">{stop.bestFor}</dd></div>
  <div><dt className="font-semibold">Allow</dt><dd className="mt-1 text-muted-foreground">{stop.time}</dd></div>
  <div><dt className="font-semibold">Area</dt><dd className="mt-1 text-muted-foreground">{stop.area}</dd></div>
  <div><dt className="font-semibold">Entry</dt><dd className="mt-1 text-muted-foreground">{stop.entry}</dd></div>
 </dl>
 <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stop.practical}</p>
 <p className="mt-3 text-sm leading-relaxed"><strong>Getting there: </strong>{stop.transport}</p>
 <p className="mt-4 rounded-lg border-l-2 border-primary/40 bg-secondary/30 px-3 py-2.5 text-sm leading-relaxed"><strong>My tip: </strong>{stop.tip}</p>
 </div>
 <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t px-4 py-4 sm:px-5">
  {stop.guide&&<Link to={stop.guide.to} className={linkClass}>{stop.guide.label}<ArrowUpRight aria-hidden className="h-3.5 w-3.5"/></Link>}
  {stop.official&&<External url={stop.official.url}>{stop.official.label}</External>}
  {stop.additionalOfficial&&<External url={stop.additionalOfficial.url}>{stop.additionalOfficial.label}</External>}
  {stop.mapLinks.map(location=><MapLink key={location.query} {...location}/>)}
 </div>
 </article>;
}
function Tours(){
 return <section id="activities" aria-labelledby="activities-h" className="mt-12 scroll-mt-24">
  <Heading id="activities" title="City tours and local activities" intro="A walk through Jaffa, a market-food experience or a guided street-art tour can add local context. These are selected third-party experiences, with booking completed directly by the provider."/>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-affiliate-tours">
  {affiliateTours.map(tour=>{
   const tracking=affiliateConfig[tour.id]?.trackingUrl;
   if(!tracking || !/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//.test(tracking)) return null;
   const url=new URL(tracking);
   url.searchParams.set("sub_id","tel_aviv_attractions_"+tour.id.split("@")[0]!.replace("tour-","").replaceAll("-","_"));
   return <a key={tour.id} href={url.toString()} target="_blank" rel={relFor(true)}
     onClick={()=>recordOutboundClick({pageId:"tel_aviv_attractions",productId:tour.id,offerId:tour.id})}
     data-testid="tel-aviv-curated-tour" className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
    <img src={tour.image} alt={tour.alt} loading="lazy" decoding="async" width={600} height={338} className="aspect-[16/9] w-full object-cover"/>
    <span className="flex flex-1 flex-col p-4">
     <span className="text-xs font-semibold uppercase tracking-wide text-primary">{tour.provider}</span>
     <strong className="mt-1 text-lg leading-snug group-hover:text-primary">{tour.title}</strong>
     <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.description}</span>
     <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1"><Clock3 aria-hidden className="h-3.5 w-3.5"/>{tour.duration}</span>
      <span className="inline-flex items-center gap-1"><MapPin aria-hidden className="h-3.5 w-3.5"/>{tour.meeting}</span>
     </span>
     {(tour.fromUsd || tour.ratingLabel) && <span className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
       {tour.fromUsd && <span>From <strong className="text-foreground">US${tour.fromUsd}</strong> per person*</span>}
       {tour.ratingLabel && <span>{tour.ratingLabel}*</span>}
     </span>}
     <span className="mt-auto flex items-center justify-between gap-3 border-t pt-4 text-sm font-semibold text-primary">
       <span>Check duration, price & availability</span><span className="inline-flex items-center gap-1 whitespace-nowrap">View & book <ExternalLink aria-hidden className="h-3.5 w-3.5"/></span>
     </span>
    </span><span className="sr-only"> (opens in a new tab)</span>
   </a>;
  })}
  </div>
  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Duration, meeting points, prices and ratings shown are indicative provider details checked in November 2026, not live offers; some listings may change or become unavailable. Confirm all arrangements, accessibility and booking conditions with the supplier.</p>
  <div className="mt-5 flex flex-wrap justify-center gap-3">
   <Link to="/tours/tel-aviv-jaffa/" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-secondary/35 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">Explore all Tel Aviv & Jaffa tours <ChevronRight aria-hidden className="h-4 w-4"/></Link>
   <Link to="/tours/food-market-tours/" className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">Explore food & market tours <ChevronRight aria-hidden className="h-4 w-4"/></Link>
  </div>
 </section>;
}
const mapUrl="/maps/tel-aviv-attractions.html?waypoints="+encodeURIComponent(JSON.stringify(telAvivMapPoints.map(({id,name,label,lat,lon,query})=>({id,name,label,lat,lon,query}))));

export function TelAvivAttractionsGuide(){
 const [selected,setSelected]=useState("all");
 const frame=useRef<HTMLIFrameElement>(null);
 const focus=(id:string)=>{setSelected(id);frame.current?.contentWindow?.postMessage({type:"tel-aviv-attractions-map-focus",id},window.location.origin);};
 useEffect(()=>{
  const handle=(event:MessageEvent)=>{
   if(event.origin!==window.location.origin || event.source!==frame.current?.contentWindow)return;
   if(event.data?.type!=="tel-aviv-attractions-map-selected")return;
   if(telAvivMapPoints.some(p=>p.id===event.data.id))setSelected(event.data.id);
  };
  window.addEventListener("message",handle);
  return ()=>window.removeEventListener("message",handle);
 },[]);
 return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
  <header className="pt-6">
   <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Attractions in Tel Aviv",to:"/travel-blog/attractions-in-tel-aviv/"}]}/>
   <GuideHeroLayout image={<GuideHeroMedia src={hero} alt="The Mediterranean beachfront and urban skyline of Tel Aviv"/>}>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Tel Aviv & Jaffa · Attractions & local experiences</p>
    <h1 className="guide-page-title mt-2">Best Things to Do in Tel Aviv: Attractions & Local Experiences</h1>
    <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From Old Jaffa's stone lanes to sandy beaches, food markets, Bauhaus streets and lively neighbourhoods, Tel Aviv offers many different experiences. I've chosen ten highlights and practical walking routes to help you make the most of your time without crossing the city needlessly.</p>
    <PageUpdated date={telAvivAttractionsUpdatedAt}/>
   </GuideHeroLayout>
   <AuthorCard/>
  </header>
  <section aria-labelledby="first-visit-h" className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6">
    <h2 id="first-visit-h" className="text-xl font-bold">What I'd choose for a first visit</h2>
    <p className="mt-2 leading-relaxed">I'd start with <a href="#old-jaffa" className={linkClass}>Old Jaffa</a>, follow the historic streets through <a href="#neve-tzedek" className={linkClass}>Neve Tzedek</a>, browse <a href="#carmel-market" className={linkClass}>Carmel Market</a>, and finish near the <a href="#beaches" className={linkClass}>beach</a>. A separate museum or northern-waterfront visit fits better on a second day.</p>
  </section>
  <OnThisPage sections={sections}/>
  <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-24">
    <Heading id="choose" title="Choose your Tel Aviv experiences" intro="Find the highlights that suit your interests. Each card takes you directly to practical details, location links and my tips."/>
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5" data-testid="tel-aviv-quick-picks">
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
    <Heading id="compare" title="Compare ten Tel Aviv attractions" intro="Use this overview to choose by area, visiting time and admission type. Allow additional time to get between neighbourhoods."/>
    <p className="mb-3 text-xs text-muted-foreground md:hidden">Swipe the table sideways to compare all ten attractions.</p>
        <div role="region" aria-label="Comparison table" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
      <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">Compare ten attractions by neighbourhood, suggested duration and admission</caption>
        <thead className="bg-secondary/60"><tr>
         <th scope="col" className="w-[28%] border-b px-3 py-3">Experience</th>
         <th scope="col" className="w-[19%] border-b px-3 py-3">Area</th>
         <th scope="col" className="w-[35%] border-b px-3 py-3">Entry & booking</th>
         <th scope="col" className="w-[18%] border-b px-3 py-3">Time to allow</th>
        </tr></thead>
        <tbody>{stops.map((s,i)=><tr key={s.id} className="border-b last:border-0">
          <th scope="row" className="px-3 py-3 font-semibold"><a href={"#"+s.id} className="text-primary hover:underline">{i+1}. {s.shortTitle}</a></th>
          <td className="px-3 py-3">{s.area}</td><td className="px-3 py-3">{s.entry}</td><td className="px-3 py-3 text-muted-foreground">{s.time}</td>
        </tr>)}</tbody>
      </table>
      
    </div>
  </section>
  <section id="explore" aria-labelledby="explore-h" className="mt-12 scroll-mt-24">
    <Heading id="explore" title="Ten attractions and experiences I recommend" intro="I've chosen a mix of neighbourhoods, landmarks, markets, beaches and culture. Explore the places that interest you; you can follow the detailed guides where available."/>
    <div className="grid gap-5" data-testid="tel-aviv-detailed-experience-cards">
      {stops.map((stop,i)=><ExperienceCard key={stop.id} stop={stop} num={i+1}/>)}
    </div>
  </section>
  <div className="mt-6"><Tip>Old Jaffa, Neve Tzedek, Carmel Market and the central beaches work well as a combined walking day. The northern port and the museum district are better planned as additional areas, especially when travelling with children or in hot weather.</Tip></div>
  <section id="map" aria-labelledby="map-h" className="mt-12 scroll-mt-24">
    <Heading id="map" title="Map of the ten Tel Aviv attractions" intro="See how the city stretches from Old Jaffa in the south to the northern port. Pins are for orientation; each attraction card also links to the precise place on Google Maps."/>
    <div className="overflow-hidden rounded-xl border bg-card">
     <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end">
      <label htmlFor="tel-aviv-attractions-map-select" className="min-w-0 flex-1 text-sm font-semibold">Focus on a place
       <select id="tel-aviv-attractions-map-select" value={selected} onChange={e=>focus(e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
        <option value="all">All ten attractions</option>{telAvivMapPoints.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
       </select>
      </label>
      <button type="button" onClick={()=>focus("all")} disabled={selected==="all"} className="min-h-11 rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:opacity-40">Show all locations</button>
     </div>
     <iframe ref={frame} title="Interactive map of ten Tel Aviv and Jaffa attractions" src={mapUrl} width={900} height={470} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[340px] w-full border-0 sm:h-[470px]"
      onLoad={()=>{if(selected!=="all")frame.current?.contentWindow?.postMessage({type:"tel-aviv-attractions-map-focus",id:selected},window.location.origin);}}/>
     <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground"><span>Map positions are approximate orientation points, not an itinerary. © OpenStreetMap contributors.</span>
       {selected==="all"?<External url="https://www.google.com/maps/search/?api=1&query=Tel+Aviv+Yafo+attractions">View Tel Aviv on Google Maps</External>:
        <MapLink label="Selected location" query={telAvivMapPoints.find(p=>p.id===selected)?.query||"Tel Aviv Yafo Israel"}/>}
     </div>
    </div>
  </section>
  <section id="routes" aria-labelledby="routes-h" className="mt-12 scroll-mt-24">
    <Heading id="routes" title="How I'd plan a day in Tel Aviv" intro="These flexible combinations keep neighbouring places together. Times include breaks but depend on your interests, walking pace and transport."/>
    <div className="grid gap-4 lg:grid-cols-3">
      {telAvivRoutes.map((route,i)=><article key={route.title} className="flex flex-col rounded-xl border bg-card p-5">
       <p className="text-xs font-semibold uppercase tracking-wide text-primary">Route idea {i+1} · {route.kind}</p>
       <h3 className="mt-2 text-lg font-bold">{route.title}</h3>
       <p className="mt-2 text-sm leading-relaxed"><strong>Allow: </strong>{route.allow}</p>
       <p className="mt-2 text-sm leading-relaxed">{route.text}</p>
       <div className="mt-4 flex flex-wrap gap-2">{route.ids.map(id=>{
         const s=stops.find(item=>item.id===id)!;
         return <a key={id} href={"#"+id} className="rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-secondary">{s.shortTitle}</a>;
       })}</div>
       <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">My tip: </strong>{route.tip}</p>
       <a href={walkingDirectionsUrl(i)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary hover:underline">
         <MapPin aria-hidden className="h-4 w-4"/>Open walking route on Google Maps
         <ExternalLink aria-hidden className="h-3.5 w-3.5"/>
         <span className="sr-only"> (opens in a new tab)</span>
       </a>
      </article>)}
    </div>
  </section>
  <section id="tips" aria-labelledby="tips-h" className="mt-12 scroll-mt-24">
    <Heading id="tips" title="My practical tips for sightseeing in Tel Aviv" intro="A little planning goes a long way in a coastal city where outdoor activities, cultural hours and weekend transport can differ."/>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-5"><Footprints aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Plan by neighbourhood</h3><p className="mt-2 text-sm leading-relaxed">Jaffa, Neve Tzedek and Carmel Market fit naturally together. The port and northern park are farther away. Choose a few clusters rather than switching repeatedly across town.</p></div>
      <div className="rounded-xl border bg-card p-5"><Waves aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Check beach safety</h3><p className="mt-2 text-sm leading-relaxed">Use designated swimming areas with active lifeguard services and follow flags and sea conditions. A public boardwalk is not automatically a swimming zone. <Link to="/travel-blog/beaches-in-tel-aviv/" className="font-semibold text-primary hover:underline">Compare beach facilities</Link>.</p></div>
      <div className="rounded-xl border bg-card p-5"><CalendarDays aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Look at the calendar</h3><p className="mt-2 text-sm leading-relaxed">Carmel Market and many shops change their hours before Shabbat; museums and performances have separate schedules. My <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Israel calendar of events</Link> explains holidays and special dates.</p></div>
      <div className="rounded-xl border bg-card p-5"><Train aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Choose transport for the actual route</h3><p className="mt-2 text-sm leading-relaxed">Buses, the Red Line light rail, taxis and walking can work better than a car in central Tel Aviv. On Fridays and Saturdays the free <External url="https://www.tel-aviv.gov.il/en/Live/Transportation/Pages/PublicTransportaiton.aspx">Na'im BeSofash weekend shuttle</External> serves parts of the metropolitan area; check current routes and schedules before relying on it. Rail stations are inland. See my <Link to="/travel-blog/getting-around-tel-aviv/" className="font-semibold text-primary hover:underline">transport guide</Link>.</p></div>
      <div className="rounded-xl border bg-card p-5"><ShieldCheck aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Plan for sun and access</h3><p className="mt-2 text-sm leading-relaxed">Carry drinking water, dress for heat and use sun protection. Old Jaffa has steep and uneven sections, while beach-access arrangements differ. Check accessibility for your chosen route.</p></div>
      <div className="rounded-xl border bg-card p-5"><BedDouble aria-hidden className="h-5 w-5 text-primary"/><h3 className="mt-2 font-bold">Stay in a convenient area</h3><p className="mt-2 text-sm leading-relaxed">A hotel near the central beach or one of the walkable districts can simplify sightseeing. Compare neighbourhoods with my <Link to="/travel-blog/where-to-stay-in-tel-aviv/" className="font-semibold text-primary hover:underline">Tel Aviv accommodation guide</Link>.</p></div>
    </div>
  </section>
  <div className="mt-5"><Tip>For arrivals from Ben Gurion Airport, check the correct railway station, luggage access and final connection. My <Link to="/travel-blog/ben-gurion-airport-to-tel-aviv/" className="font-semibold text-primary hover:underline">airport-to-Tel Aviv guide</Link> compares the main options.</Tip></div>
  <Tours/>
  <FaqList faqs={telAvivFaqs}/>
  <section id="explore-more" aria-labelledby="explore-more-h" className="mt-12 scroll-mt-24">
    <Heading id="explore-more" title="Explore Tel Aviv further" intro="My guides go into more detail on beaches, museums, Jaffa, transport and where to stay."/>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item=><GuideCard key={item.to} item={item}/>)}</div>
  </section>
  <section id="plan" aria-labelledby="plan-h" className="mt-12 scroll-mt-24">
    <Heading id="plan" title="Plan the next part of your Israel trip" intro={<>Choose an itinerary or an onward connection. For other bases across Israel, see my <Link to="/accommodation/" className="font-semibold text-primary hover:underline">Where to Stay in Israel</Link> guide.</>}/>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{planning.map(item=><GuideCard key={item.to} item={item}/>)}</div>
  </section>
  <HomeContactForm guide={{
    heading:"Need a private transfer or day trip in Tel Aviv?",
    introduction:"I'm Moshe Barak. I arrange private airport transfers, private rides and day trips with a driver in Israel. Tell me your dates, pickup point, group size and where you would like to go, and I'll reply personally about transport options.",
    subject:"",
    placeholder:"Pickup location, travel date, number of travellers and the sights you would like to visit…",
  }}/>
  <SourcesDisclosure>
    <p className="mb-3 text-sm leading-relaxed">For the latest admission details, lifeguard services, exhibitions and special dates, I recommend checking the relevant authority or operator shortly before you visit.</p>
    <ul className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
     <li><External url="https://www.tel-aviv.gov.il/en/Visit/Top10Places/Pages/default.aspx">Tel Aviv–Yafo Municipality — key places</External></li>
     <li><External url="https://www.tel-aviv.gov.il/Visitors/Jaffa/Pages/oldjaffatour.aspx">Old Jaffa municipal walking route (Hebrew)</External></li>
     <li><External url="https://www.tel-aviv.gov.il/en/visit/beaches/pages/default.aspx">Municipal beach information (English)</External></li>
     <li><External url="https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Beaches.aspx">Beach conditions and lifeguard services (Hebrew)</External></li>
     <li><External url="https://www.tel-aviv.gov.il/en/Live/Transportation/Pages/PublicTransportaiton.aspx">Free weekend public transport — municipality</External></li>
     <li><External url="https://whc.unesco.org/en/list/1096/">UNESCO — White City of Tel Aviv</External></li>
     <li><External url="https://www.tamuseum.org.il/en/visit/">Tel Aviv Museum of Art — visitor information</External></li>
     <li><External url="https://nachalatbinyamin-tlv.com/en/">Nahalat Binyamin Arts & Crafts Fair</External></li>
     <li><External url="https://suzannedellal.org.il/en/neve-tzedek/">Neve Tzedek history — Suzanne Dellal Centre</External></li>
     <li><External url="https://www.tel-aviv.gov.il/en/Pages/HomePage.aspx">Tel Aviv–Yafo Municipality</External></li>
     <li><External url="https://www.rail.co.il/en">Israel Railways</External></li>
    </ul>
    <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
      Florentin graffiti photograph: <a className="font-semibold text-primary hover:underline" href={florentinPhotoCredit.sourceUrl} target="_blank" rel="noopener noreferrer">{florentinPhotoCredit.author}</a>, licensed under <a className="font-semibold text-primary hover:underline" href={florentinPhotoCredit.licenseUrl} target="_blank" rel="noopener noreferrer">{florentinPhotoCredit.license}</a>. {florentinPhotoCredit.modification}.
    </p>
  </SourcesDisclosure>
 </article></main>;
}
