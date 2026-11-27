import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, CalendarDays, ExternalLink, Lightbulb, MapPin, Route } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { affiliateConfig } from "@/data/registry";
import { recordOutboundClick } from "@/lib/outbound";
import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { tourBookingOffers, tourProducts } from "@/data/registry";
import { tourSnapshotPrice } from "@/lib/tours";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { christianToursHero, christianAreas, christianRoutes, christianOffers, christianFaqs, christianSiteCards, christianPlanningCards, type ChristianArea, type ChristianRelated, type ChristianOffer } from "@/data/christianToursGuide";

const updatedAt="2026-11-21";
const slug="/travel-blog/christian-tours-in-israel/";
const link="font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const nav=[["start","How to plan"],["destinations","Christian destinations"],["itineraries","Sample itineraries"],["tours","Guided tours"],["practical","Visiting advice"],["other-places","Other biblical places"],["faq","FAQ"],["more-sites","Related Christian guides"],["plan-trip","Plan your visit"],["contact","Contact me"]] as const;
const sources=[
 {title:"Christian Information Center - shrine opening hours",url:"https://www.cicts.org/our-services/"},
 {title:"Christian Information Center - Masses and services",url:"https://www.cicts.org/masses-services/"},
 {title:"Custody of the Holy Land - pilgrimage sanctuaries",url:"https://www.custodia.org/en/"},
 {title:"UNESCO - Church of the Nativity in Bethlehem",url:"https://whc.unesco.org/en/list/1433/"},
 {title:"Israel Nature and Parks Authority - Qasr al-Yahud",url:"https://en.parks.org.il/reserve-park/baptismal-site-on-the-jordan-river-qasr-al-yahud/"},
 {title:"Yardenit - baptism visit information",url:"https://www.yardenit.com/baptism/"},
 {title:"Custody of the Holy Land - Church of the Nativity",url:"https://www.custodia.org/en/sanctuaries/bethlehem-basilica-of-the-nativity/"},
 {title:"Bethlehem Municipality - Milk Grotto",url:"https://bethlehem-city.org/en/milkgrotto"},
 {title:"Custody of the Holy Land - Shepherds' Field",url:"https://www.custodia.org/en/sanctuaries/bethlehem-the-shepherds-field-and-grotto/"},
 {title:"Discalced Carmelites - Stella Maris and Muhraqa",url:"https://www.carmelholylanddco.org/who-we-are/the-discalced-carmelites-in-the-holy-land/"},
] as const;

function External({href,children}:{href:string;children:ReactNode}){
 return <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children} <ExternalLink className="inline h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function Heading({id,title,intro}:{id:string;title:string;intro?:ReactNode}){
 return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function Tip({children}:{children:ReactNode}){
 return <aside className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-700/50 dark:bg-amber-950/20 dark:text-amber-100"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><div>{children}</div></aside>;
}
function MapLink({place}:{place:string}){
 return <a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(place)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><MapPin className="h-4 w-4" aria-hidden="true"/>View on Google Maps<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>;
}
function AreaCard({area}:{area:ChristianArea}){
 return <article id={area.id} aria-labelledby={area.id+"-heading"} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card" data-christian-area={area.id}>
   <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">
     <div className="min-w-0">
       <h3 id={area.id+"-heading"} className="font-serif text-xl font-semibold sm:text-2xl">{area.title}</h3>
       <p className="mt-3 text-sm leading-relaxed sm:text-base">{area.intro}</p>
       <ul className="mt-4 space-y-3">{area.sites.map(site=><li key={site.name} className="text-sm leading-relaxed">
         <strong>{site.to?<Link to={site.to} className={link}>{site.name}</Link>:site.name}</strong><span className="text-muted-foreground"> - {site.note}</span>
         {(site.officialUrl||site.mapPlace)&&<span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
           {site.officialUrl&&<External href={site.officialUrl}>Official information</External>}
           {site.mapPlace&&<a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(site.mapPlace)} className="font-semibold text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Maps <MapPin className="inline h-3 w-3" aria-hidden="true"/></a>}
         </span>}
       </li>)}</ul>
       <p className="mt-4 text-sm leading-relaxed"><strong>My planning tip:</strong> {area.planning}</p>
     </div>
     <figure className="overflow-hidden rounded-xl bg-secondary/20 lg:self-start"><img src={area.image} alt={area.alt} width={700} height={525} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/></figure>
   </div>
   <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-secondary/10 px-4 py-3 sm:px-5">
     <Link to={area.related.to} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">{area.related.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link><MapLink place={area.mapPlace}/>
   </div>
 </article>;
}
function Related({item}:{item:ChristianRelated}){
 return <Link to={item.to} className="editorial-card-link group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-primary">
   <img src={guideHeroPhotoForPath(String(item.to))?.src ?? item.image} alt={guideHeroPhotoForPath(String(item.to))?.alt ?? item.alt} width={640} height={400} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/>
   <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug group-hover:text-primary sm:text-base">{item.title}</strong><span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</span></span>
 </Link>;
}
function TourCard({tour,url}:{tour:ChristianOffer;url:string}){
 const offer = tourBookingOffers.find(item => item.id === tour.affiliateKey.split("@")[0]);
 const product = tourProducts.find(item => item.id === offer?.productId);
 const snapshot = offer ? tourSnapshotPrice(offer) : undefined;
 return <div className="min-w-0" data-christian-tour={tour.id}>
   <ExternalProviderTourCard
     image={tour.image} alt={tour.alt} platform={tour.platform}
     title={tour.title} description={tour.summary} duration={tour.duration}
     rating={product?.rating && {value:product.rating.value,count:product.rating.count}}
     price={snapshot && {amount:snapshot.amount,currency:snapshot.currency,basis:snapshot.basis,maxPartySize:snapshot.maxPartySize}}
     href={url}
     onClick={()=>recordOutboundClick({pageId:"christian_tours_in_israel",productId:tour.id,offerId:tour.subId})}
   />
 </div>;
}

const practical=[
 {title:"Opening hours and services",text:"Prayer takes priority over sightseeing. Sundays, feast days, Holy Week and local services can change church access. Verify current opening times and entrance conditions directly."},
 {title:"Dress and behaviour",text:"Cover your shoulders and knees at religious sites. Follow photography, silence, group-prayer and worship instructions."},
 {title:"Walking and accessibility",text:"Jerusalem's Old City has uneven paving, the Mount of Olives is steep and many churches have steps. Check access needs with each site."},
 {title:"Bethlehem and Jericho access",text:"These are West Bank destinations. Confirm nationality restrictions, checkpoints, insurance and any requirement to change to local transport or guiding."},
 {title:"Realistic travel distances",text:"Jerusalem, Nazareth, the lake and the lower Jordan are separate regions. Allow time for parking, walking, meals, queues and unexpected restrictions."},
 {title:"Comparing guided tours",text:"Verify the site list, admission fees, departure city, language, group size, cancellation rules and whether a baptism ceremony is included."},
] as const;
const extras=[
 {title:"Ein Karem",text:"Jerusalem-area churches linked to the Visitation and John the Baptist.",to:"/travel-blog/churches-in-jerusalem/" as const},
 {title:"Cana",text:"Kafr Kanna, linked by tradition with the wedding miracle; an optional stop from Nazareth.",to:"/attractions/basilica-of-the-annunciation/" as const},
 {title:"Emmaus traditions",text:"Several places have been proposed; check the specific location before organising a visit.",to:"/travel-blog/jerusalem-travel-guide/" as const},
 {title:"Old Jaffa and Saint Peter",text:"Coastal stories connected with Peter and early Christian communities.",to:"/attractions/jaffa/" as const},
 {title:"Caesarea Maritima",text:"Roman coastal city with links to early Christianity and the Acts of the Apostles.",to:"/attractions/caesarea/" as const},
 {title:"Tel Megiddo",text:"Archaeological landscape with biblical associations and a long history.",to:"/attractions/tel-megiddo/" as const},
] as const;

export function ChristianToursGuide(){
 const offers=christianOffers.flatMap(tour=>{
   const raw=affiliateConfig[tour.affiliateKey]?.trackingUrl;
   if(!raw||!/^https:\/\/(?:viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+(?:\?|$)/.test(raw))return [];
   const u=new URL(raw);u.searchParams.set("sub_id",tour.subId);
   return [{tour,url:u.toString()}];
 });
 return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
   <header className="pt-6">
     <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Christian tours in Israel",to:slug}]}/>
     <GuideHeroLayout image={<GuideHeroMedia src={christianToursHero.src} alt={christianToursHero.alt}/>}>
       <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Christian heritage · Holy Land visitor guide</p>
       <h1 className="guide-page-title mt-2">Christian Tours in Israel: Biblical Sites &amp; Pilgrimage Routes</h1>
       <p className="mt-4 max-w-3xl text-lg leading-relaxed" data-guide-intro>Planning a Christian pilgrimage, or hoping to visit the biblical places you have read about? I'm Moshe Barak. In this guide, I'll help you choose meaningful sites, understand the distances, and plan a practical route through Jerusalem, Bethlehem, Nazareth and the Galilee.</p>
       <PageUpdated date={updatedAt}/>
     </GuideHeroLayout>
     <AuthorCard/>
   </header>
   <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" aria-labelledby="quick-answer">
     <h2 id="quick-answer" className="text-xl font-bold">Where I recommend starting</h2>
     <p className="mt-2 leading-relaxed">For a first Christian heritage trip, begin with <Link to="/travel-blog/churches-in-jerusalem/" className={link}>Jerusalem's churches</Link>, then choose <Link to="/travel-blog/jerusalem-to-bethlehem/" className={link}>Bethlehem</Link> or <Link to="/attractions/sea-of-galilee/" className={link}>Nazareth and the Sea of Galilee</Link> according to your available days. If baptism is a priority, compare <Link to="/travel-blog/baptism-in-the-jordan-river/" className={link}>Yardenit and Qasr al-Yahud</Link> before deciding where to go.</p>
   </section>
   <OnThisPage sections={nav}/>

   <section id="start" aria-labelledby="start-heading" className="mt-12 scroll-mt-24">
     <Heading id="start" title="How to plan a Christian tour" intro="Choose the traditions and places that matter most to you, then group visits by area."/>
     <div className="grid gap-4 sm:grid-cols-3">{[
       {number:"01",title:"Choose your focus",text:"Jerusalem's Passion sites, the Nativity in Bethlehem, the ministry in Galilee or a river baptism visit."},
       {number:"02",title:"Group sites geographically",text:"A Jerusalem walking day differs from a Galilee road trip. An overnight stay in the north can cut long return journeys."},
       {number:"03",title:"Confirm practical details",text:"Check religious services, opening hours, mobility, borders, departure points and cancellation conditions before booking."},
     ].map(item=><div key={item.number} className="rounded-xl border bg-card p-4"><p className="text-xs font-bold text-primary">{item.number}</p><h3 className="mt-2 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}</div>
     <div className="mt-5"><Tip>Want to attend Mass, prayer or a liturgy? Check <External href="https://www.cicts.org/masses-services/">Christian Information Center service details</External> and contact the responsible church. Arrange any religious ceremony separately.</Tip></div>
   </section>

   <section id="destinations" aria-labelledby="destinations-heading" className="mt-12 scroll-mt-24">
     <Heading id="destinations" title="The main Christian pilgrimage destinations" intro="Explore Christian pilgrimage destinations across seven regions of Israel and the West Bank, with my detailed visitor and transport guides."/>
     <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border bg-secondary/20 p-3 sm:grid-cols-4">{christianAreas.map(area=><a key={area.id} href={"#"+area.id} className="flex min-h-10 items-center gap-1 rounded-lg border bg-card px-3 py-2 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-secondary">{area.name}<ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0" aria-hidden="true"/></a>)}</div>
     <div className="space-y-6">{christianAreas.map(area=><AreaCard key={area.id} area={area}/>)}</div>
     <div className="mt-5"><Tip><strong>Two distinct Jordan River sites:</strong> Qasr al-Yahud near Jericho is traditionally associated with Jesus' baptism, while Yardenit is an organised modern visitor site near the Sea of Galilee. Read my <Link to="/travel-blog/baptism-in-the-jordan-river/" className={link}>baptism site comparison</Link> before choosing.</Tip></div>
   </section>

   <section id="itineraries" aria-labelledby="itineraries-heading" className="mt-12 scroll-mt-24">
     <Heading id="itineraries" title="Four ways to plan a Christian itinerary" intro="Four flexible itineraries to adapt to your interests, departure city and pace."/>
     <div className="grid gap-4 md:grid-cols-2">{christianRoutes.map(item=>{
       return <article key={item.time} className="flex flex-col rounded-xl border bg-card p-5">
         <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary"><CalendarDays className="h-4 w-4" aria-hidden="true"/>{item.time} · {item.subtitle}</p>
         <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
         <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">{item.steps.map(step=><li key={step}>{step}</li>)}</ol>
         <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">My planning note:</strong> {item.advice}</p>
         <div className="mt-auto space-y-2 pt-4" aria-label={"Regional maps for "+item.title}>
           {item.mapLegs.map(leg=>{
             const query=new URLSearchParams({api:"1",origin:leg.origin,destination:leg.destination,travelmode:leg.mode});
             if(leg.waypoints.length)query.set("waypoints",leg.waypoints.join("|"));
             return <a key={leg.label} href={"https://www.google.com/maps/dir/?"+query.toString()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline"><Route className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"/>{leg.label} <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"/></a>;
           })}
         </div>
       </article>;
     })}</div>
     <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The map links cover the main regional journeys. Explore Jerusalem's Old City on foot, and check current West Bank access conditions before travelling.</p>
   </section>


   <section id="tours" aria-labelledby="tours-heading" className="mt-12 scroll-mt-24">
     <Heading id="tours" title="Guided Christian tours and day trips" intro="These independent guided tours help with history and transport. Confirm church stops, guiding language, pickup city, admission costs and availability on the provider's booking page."/>
     <h3 className="mb-3 font-serif text-xl font-semibold">Jerusalem &amp; Bethlehem</h3>
     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-christian-tour-group="south">{offers.filter(o=>o.tour.group==="south").map(o=><TourCard key={o.tour.id} tour={o.tour} url={o.url}/>)}</div>
     <h3 className="mb-3 mt-8 font-serif text-xl font-semibold">Nazareth, Galilee &amp; Jordan River</h3>
     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-christian-tour-group="north">{offers.filter(o=>o.tour.group==="north").map(o=><TourCard key={o.tour.id} tour={o.tour} url={o.url}/>)}</div>
     <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Check the booking website for current prices, availability, ratings and reviews. Before paying, confirm your tour date, itinerary, included stops, final price and eligibility to enter the West Bank.</p>
     <p className="mt-3 text-sm leading-relaxed">For more options, see my <Link to="/tours/jerusalem/" className={link}>Jerusalem tours</Link>, <Link to="/tours/bethlehem-jericho-jordan-river/" className={link}>Bethlehem and Jordan River tours</Link> and <Link to="/tours/nazareth-sea-of-galilee/" className={link}>Galilee tours</Link>. My <Link to="/private-driver-in-israel/" className={link}>private driver service</Link> covers transportation. Licensed guiding should be arranged separately.</p>
   </section>

   <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
     <Heading id="practical" title="Practical advice before visiting Christian sites" intro="A few checks can avoid disappointment, particularly during church festivals, Sundays and complex multi-region itineraries."/>
     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{practical.map(item=><div key={item.title} className="rounded-xl border bg-card p-4"><h3 className="font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}</div>
     <div className="mt-5 space-y-4">
       <Tip>Use the <External href="https://www.cicts.org/our-services/">Christian Information Center's current shrine information</External> and my <Link to="/travel-blog/calendar-of-events/" className={link}>Israel calendar of holidays and special dates</Link> to plan around services and public holidays.</Tip>
       <p className="text-sm leading-relaxed">If your trip includes Bethlehem, Jericho or Qasr al-Yahud, read my <Link to="/travel-blog/jerusalem-to-bethlehem/" className={link}>Bethlehem transport and crossing guide</Link>. Entry eligibility, local transport rules and rental-car insurance differ. Confirm that your driver and vehicle can serve each destination.</p>
     </div>
   </section>

   <section id="other-places" aria-labelledby="other-places-heading" className="mt-12 scroll-mt-24">
     <Heading id="other-places" title="More biblical sites to visit" intro="Add these sites to a longer itinerary exploring the history and archaeology of the New Testament."/>
     <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{extras.map(site=><article key={site.title} className="flex flex-col rounded-xl border bg-card p-4"><h3 className="font-semibold">{site.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{site.text}</p><Link to={site.to} className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary hover:underline">Read related guide<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link></article>)}</div>
   </section>
   <FaqList faqs={christianFaqs}/>
   <section id="more-sites" aria-labelledby="more-sites-heading" className="mt-12 scroll-mt-24">
     <Heading id="more-sites" title="Explore Christian heritage sites" intro="Continue to the more detailed destination and church guides to plan your individual visits."/>
     <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{christianSiteCards.map(item=><Related key={item.to} item={item}/>)}</div>
   </section>
   <section id="plan-trip" aria-labelledby="plan-trip-heading" className="mt-12 scroll-mt-24">
     <Heading id="plan-trip" title="Plan the rest of your Israel visit" intro="Match your pilgrimage stops with the dates, travel distances, holidays and transport choices for your whole trip."/>
     <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{christianPlanningCards.map(item=><Related key={item.to} item={item}/>)}</div>
   </section>
   <section id="contact" aria-labelledby="contact-heading" className="mt-12 scroll-mt-24">
     <h2 id="contact-heading" className="sr-only">Ask me about private transport for your Christian heritage trip</h2>
     <HomeContactForm showTripadvisorBesidePortraitMobile guide={{
       heading:"Need transport between Christian sites?",
       introduction:"I'm Moshe Barak. Tell me your travel dates, pickup location and group size if you want a private airport transfer, a multi-stop sightseeing day or a driver for your journey between Jerusalem, Nazareth and the Galilee. Guiding and West Bank arrangements must be confirmed separately.",
       subject:"",
       placeholder:"Your dates, pickup, destinations, number of passengers and any mobility needs…",
     }}/>
   </section>
   <SourcesDisclosure>
     <p className="text-sm leading-relaxed">This guide distinguishes Christian traditions from historical certainty. Opening hours, worship schedules, prices, access arrangements and tour availability may change. Primary heritage and visitor references:</p>
     <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
       {sources.map(source=><li key={source.url}><External href={source.url}>{source.title}</External></li>)}
       <li>Sea of Galilee photograph: <External href="https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg">Ian Scott / Wikimedia Commons</External> · <External href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</External>; resized to WebP.</li>
     </ul>
   </SourcesDisclosure>
 </article></main>;
}
