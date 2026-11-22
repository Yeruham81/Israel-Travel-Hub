import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, ExternalLink, Lightbulb, MapPinned, Shirt, Star, Users } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { HomeContactForm } from "@/components/HomeContactForm";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { affiliateConfig, tourBookingOffers, tourProducts } from "@/data/registry";
import { tourPhotos } from "@/data/tours";
import { yardenitSite } from "@/data/yardenitSite";
import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { recordAffiliateTourClick } from "@/lib/tour-analytics";
import { relFor } from "@/lib/outbound";
import { BAPTISM_PATH, BAPTISM_TITLE, BAPTISM_UPDATED, BAPTISM_HERO, baptismFaqs, baptismSources, baptismTourGroups } from "@/data/jordanRiverBaptism";
import qasrPhoto from "@/assets/guides/dead-sea-excursions/qasr-al-yahud.webp";

// Use the existing English location map with two place markers and no route overlay.
const baptismMapLocations = [
  { name: "Yardenit — Sea of Galilee", lat: 32.71094, lon: 35.57086 },
  { name: "Qasr el-Yahud — Jordan Valley", lat: 31.83709, lon: 35.5465 },
] as const;
const baptismComparisonMapUrl = "/maps/area.html?" + new URLSearchParams({
  marker: "32.28,35.56",
  bbox: "35.42,31.73,35.69,32.81",
  name: "Yardenit and Qasr el-Yahud",
  lang: "en",
  pinMode: "locations",
  waypoints: JSON.stringify(baptismMapLocations),
}).toString();

const linkClass = "font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const toc = [
 ["compare-sites","Compare the sites"],["yardenit","Yardenit"],["qasr","Qasr el-Yahud"],
 ["ceremony","Arrange your baptism"],["getting-there","Getting there"],
 ["galilee-tours","Galilee tours"],["jordan-valley-tours","Jordan Valley tours"],
 ["practical-tips","My tips"],["faq","FAQ"],["attractions","Biblical attractions"],
 ["related","More guides"],["contact","Contact me"],
] as const;
const attractions = [
 {to:"/attractions/yardenit/",title:"Yardenit",note:"Southern Sea of Galilee: visitor and baptism facilities"},
 {to:"/attractions/qasr-el-yahud/",title:"Qasr el-Yahud",note:"Lower Jordan near Jericho: traditional baptism landscape"},
 {to:"/attractions/capernaum/",title:"Capernaum",note:"Ancient village beside the Sea of Galilee"},
 {to:"/attractions/tabgha/",title:"Tabgha",note:"Lakeside churches and Christian traditions"},
 {to:"/attractions/magdala/",title:"Magdala",note:"Archaeology and pilgrimage by the lake"},
 {to:"/attractions/mount-of-beatitudes/",title:"Mount of Beatitudes",note:"A quiet hillside and lake views"},
] as const;
const related = [
 {to:"/attractions/sea-of-galilee/",title:"Sea of Galilee",note:"My practical guide to the lake and surrounding sites"},
 {to:"/travel-blog/churches-in-jerusalem/",title:"Churches in Jerusalem",note:"Plan historic churches and pilgrimage visits"},
 {to:"/travel-blog/jerusalem-to-the-dead-sea/",title:"Jerusalem to the Dead Sea",note:"Routes and stops through the Jordan Valley"},
 {to:"/travel-blog/jerusalem-to-bethlehem/",title:"Jerusalem to Bethlehem",note:"A practical visit to the Nativity city"},
 {to:"/travel-blog/getting-around-israel/",title:"Getting around Israel",note:"Public transport, taxis and private travel"},
 {to:"/travel-blog/christian-tours-in-israel/",title:"Christian Tours in Israel",note:"My pilgrimage routes and biblical sites across the Holy Land"},
] as const;
function Heading({id,children,intro}:{id:string;children:string;intro?:string}) {
 return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>{intro && <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function MyTip({children}:{children:ReactNode}) {
 return <aside className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><p><strong>My tip:</strong> {children}</p></aside>;
}
/** Every linked editorial card uses the destination page's exact hero image. */
function PhotoCards({id,title,intro,items}:{id:string;title:string;intro:string;items:typeof attractions | typeof related}) {
 return <section id={id} aria-labelledby={id+"-heading"} className="mt-12 scroll-mt-24">
  <Heading id={id} intro={intro}>{title}</Heading>
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3" data-testid={id+"-cards"}>
   {items.map(item=>{
    const photo=guideHeroPhotoForPath(item.to);
    return <Link key={item.to} to={item.to} className="editorial-card-link group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20">
     {photo && <img src={photo.src} alt={photo.alt} width={480} height={270} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>}
     <span className="flex flex-1 flex-col p-3 sm:p-4"><strong className="text-sm leading-snug sm:text-base">{item.title}</strong><span className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.note}</span></span>
    </Link>;
   })}
  </div>
 </section>;
}
function TourSection({group}:{group:typeof baptismTourGroups[number]}) {
 return <section id={group.id} aria-labelledby={group.id+"-heading"} className="mt-12 scroll-mt-24">
  <Heading id={group.id} intro={group.description}>{group.title}</Heading>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid={group.id+"-cards"}>
   {group.products.map(entry=>{
    const product=tourProducts.find(p=>p.id===entry.id);
    const offerId="tour-"+entry.id+"-"+entry.provider;
    const offer=tourBookingOffers.find(o=>o.id===offerId);
    const trackingUrl=affiliateConfig[offerId+"@travel-blog-baptism"]?.trackingUrl;
    const photo=tourPhotos[entry.id];
    if(!product || !offer || !trackingUrl || !photo) return null;
    return <a key={entry.id} href={trackingUrl} target="_blank" rel={relFor(true)}
     onClick={()=>recordAffiliateTourClick({pageId:"travel_blog_baptism",productId:entry.id,offerId,provider:entry.provider,linkUrl:trackingUrl})}
     data-testid="baptism-tour-card" data-site={group.id}
     className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary">
      <img src={photo.src} alt={photo.alt} width={480} height={280} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>
      <span className="flex flex-1 flex-col p-4">
       <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{entry.provider==="getyourguide"?"GetYourGuide":"Viator"}</span>
       <strong className="mt-1 text-base leading-snug group-hover:text-primary">{product.title}</strong>
       <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.summary}</span>
       <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" aria-hidden="true"/>{product.duration}</span><span className="inline-flex items-center gap-1"><MapPinned className="h-3.5 w-3.5" aria-hidden="true"/>{entry.departure}</span></span>
       {product.rating && <span data-testid="baptism-tour-rating" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground" aria-label={product.rating.value.toFixed(1)+" out of 5 stars from "+product.rating.count+" reviews, checked November 2026"}><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden="true"/>{product.rating.value.toFixed(1)} <span>({product.rating.count.toLocaleString("en-US")} reviews)</span></span>}
       <span className="mt-auto flex items-end justify-between gap-2 border-t pt-3 text-sm">
        <span>{offer.listedPrice ? <><span className="text-xs text-muted-foreground">From </span><strong>{"US$"+offer.listedPrice.amount.toFixed(offer.listedPrice.amount % 1 ? 2 : 0)}</strong><span className="block text-[11px] text-muted-foreground">{offer.listedPrice.basis==="per_person"?"Per person":"Per group"} · checked Nov 2026</span></> : <span className="text-xs text-muted-foreground">Check current price</span>}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-primary">View tour <ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/></span>
       </span>
      </span><span className="sr-only"> (opens in a new tab)</span>
    </a>;
   })}
  </div>
  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Check current prices, availability, the exact river stop, pickup and cancellation terms with the tour provider. Arrange any baptism ceremony, clergy or Qasr el-Yahud visitor reservation separately.</p>
 </section>;
}
export function JordanRiverBaptismGuidePage() {
 return <main className="mx-auto max-w-5xl px-4 pb-12"><article>
  <header className="pt-6">
   <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Jordan River baptism",to:BAPTISM_PATH}]}/>
   <GuideHeroLayout image={<GuideHeroMedia src={BAPTISM_HERO.src} alt={BAPTISM_HERO.alt} width={640} height={400}/>}>
    <p className="text-xs font-bold uppercase tracking-wider text-primary">My Holy Land pilgrimage guide</p>
    <h1 className="guide-page-title mt-2">{BAPTISM_TITLE}</h1>
    <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">If you're planning a baptism or a visit to the Jordan River, choosing the right site is the first step. I'll help you compare Yardenit and Qasr el-Yahud, arrange the practical details and plan a journey that fits your time in Israel.</p>
    <PageUpdated date={BAPTISM_UPDATED}/>
   </GuideHeroLayout>
   <AuthorCard/>
  </header>
  <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" id="quick-answer" aria-labelledby="quick-answer-h">
   <h2 id="quick-answer-h" className="text-xl font-bold">My quick recommendation</h2>
   <p className="mt-2 leading-relaxed">Choose <Link to="/attractions/yardenit/" className={linkClass}>Yardenit</Link> for modern baptism facilities in a Galilee itinerary, or <Link to="/attractions/qasr-el-yahud/" className={linkClass}>Qasr el-Yahud</Link> for the lower-Jordan landscape traditionally associated with Jesus' baptism. Both can be visited without taking part in a ceremony. If you wish to be baptized, organise your clergy and site arrangements separately from transport.</p>
  </section>
  <OnThisPage sections={toc}/>
  <section id="compare-sites" className="mt-11 scroll-mt-24" aria-labelledby="compare-sites-heading">
   <Heading id="compare-sites" intro="The two sites are on different stretches of the river, far apart. I recommend choosing by religious meaning, travel region and the facilities you need.">Yardenit or Qasr el-Yahud: which site should you visit?</Heading>
   
   <div role="region" tabIndex={0} aria-label="Jordan River baptism site comparison" className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary" data-testid="baptism-site-comparison">
    <table className="w-full min-w-[640px] text-left text-sm leading-relaxed"><caption className="sr-only">Comparison of Yardenit and Qasr el-Yahud</caption><thead className="bg-secondary/60"><tr><th scope="col" className="p-3">Compare</th><th scope="col" className="p-3">Yardenit</th><th scope="col" className="p-3">Qasr el-Yahud</th></tr></thead><tbody>
    {[
     ["Location","Near the southern Sea of Galilee","Lower Jordan near Jericho"],
     ["Setting","Purpose-built modern baptism facility","Traditional lower-Jordan baptism landscape"],
     ["Entry","Free; robes and some facilities cost extra","Free, but advance registration is required"],
     ["Ceremony","White robe required; arrange clergy","Coordinate clergy and river-access rules"],
     ["Getting there","Galilee tour, car or private driver","Jerusalem / Jordan Valley tour, car or driver"],
     ["Combine with","Nazareth, Tiberias and Galilee churches","Jericho, Bethlehem or the Dead Sea"],
    ].map(row=><tr key={row[0]} className="border-t align-top"><th scope="row" className="p-3 font-semibold">{row[0]}</th><td className="p-3">{row[1]}</td><td className="p-3">{row[2]}</td></tr>)}
    </tbody></table>
   </div>
   <MyTip>I would agree on the exact river site with your church leader first. A tour simply labelled “Jordan River” may take you to a different location.</MyTip>
  </section>
  <section id="yardenit" className="mt-12 scroll-mt-24" aria-labelledby="yardenit-heading">
   <Heading id="yardenit" intro="An established, peaceful baptism setting near Kibbutz Kinneret.">Yardenit: baptism near the Sea of Galilee</Heading>
   <p className="leading-relaxed">At Yardenit, designated steps lead to the Jordan River and visitors can use changing facilities and riverside spaces. According to the operator, general entry and conducting a baptism are free. A special white robe is required, available to rent or buy, and certain facilities cost extra. There is no resident priest, but the operator can provide clergy contacts. For an ordinary visit, parties of up to 40 people can arrive without advance coordination; groups larger than 40 should notify Yardenit before coming. <a href={yardenitSite.sources.faq} target="_blank" rel="noopener noreferrer" className={linkClass}>See the official questions and answers</a>.</p>
   <div className="mt-5 grid items-start gap-5 sm:grid-cols-2" data-testid="baptism-yardenit-photo-facts">
    <img src={yardenitSite.hero.src} alt={yardenitSite.hero.alt} width={620} height={400} loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl object-cover"/>
    <div className="rounded-xl border bg-card p-4">
     <h3 className="font-bold">Before you go</h3>
     <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The landscaped riverbank has designated baptism areas, changing facilities and space for quiet reflection.</p>
     <ul className="mt-3 space-y-2 text-sm leading-relaxed">
      <li>• Confirm current visitor hours and last baptism time</li>
      <li>• Notify the site if your group has more than 40 visitors</li>
      <li>• Arrange your priest or pastor and ceremony time</li>
      <li>• Ask about white robes, changing rooms and charges</li>
      <li>• Leave time to change and reflect</li>
     </ul>
     <Link to="/attractions/yardenit/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Read my full Yardenit visitor guide <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link>
    </div>
   </div>
   <MyTip>I recommend checking the <a href={yardenitSite.sources.contact} target="_blank" rel="noopener noreferrer" className="font-semibold underline">current visitor and baptism windows</a> before finalising your day.</MyTip>
  </section>
  <section id="qasr" className="mt-12 scroll-mt-24" aria-labelledby="qasr-heading">
   <Heading id="qasr" intro="A revered traditional baptism landscape on the lower Jordan near Jericho.">Qasr el-Yahud: the lower Jordan baptism site</Heading>
   <p className="leading-relaxed">Christian tradition places Jesus' baptism by John the Baptist in the lower-Jordan area. The Israel Nature and Parks Authority operates Qasr el-Yahud. General admission is free, but <strong>you must reserve your visit in advance</strong>. There are renewed riverbank terraces and facilities. Use the official site page below to reserve a visit before travelling. Check the <a href={qasrElYahudSite.sources.operatorEnglish} target="_blank" rel="noopener noreferrer" className={linkClass}>official park page</a> for seasonal hours, last entry and access notices.</p>
   <div className="mt-4 flex flex-col gap-3 rounded-xl border border-primary/20 bg-secondary/40 p-4 sm:flex-row sm:items-center">
    <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">The official Israel Nature and Parks Authority page includes the visitor booking form. Register the visit separately from any tour or baptism ceremony.</p>
    <a data-testid="qasr-reservation-cta" href={qasrElYahudSite.sources.operatorEnglish} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">Reserve your free visit <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true"/></a>
   </div>
   <div className="mt-5 grid items-start gap-5 sm:grid-cols-2"><img src={qasrPhoto} alt="Palm trees and visitor buildings beside the Jordan River at Qasr el-Yahud" width={620} height={400} loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl object-cover"/><div className="rounded-xl border bg-card p-4"><h3 className="font-bold">Before you go</h3><ul className="mt-3 space-y-2 text-sm leading-relaxed"><li>• Make the free advance visitor reservation</li><li>• Check any restricted access or group arrangements</li><li>• Agree the officiant, clothing and ceremony time</li><li>• Confirm pickup and the return journey</li></ul><Link to="/attractions/qasr-el-yahud/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Read my full Qasr el-Yahud visitor guide <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link></div></div>
   <aside data-testid="qasr-access-safety" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950"><strong>Stay on authorised roads and inside the visitor area.</strong> The surrounding monastery district included historical minefields and restricted compounds. Never go beyond fences, enter closed monastery grounds or leave marked access routes independently. Some monastery visits may be offered only as authorised guided activities; follow current park and security instructions. <a href="https://inmaa.mod.gov.il/En/OurDoingEn/MineFieldsEn/Pages/TheBaptismSite.aspx" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Official mine-clearance background</a>.</aside>
  </section>
  <section id="ceremony" className="mt-12 scroll-mt-24" aria-labelledby="ceremony-heading">
   <Heading id="ceremony" intro="A sightseeing visit and a religious ceremony are different arrangements. Build the day around what your church requires.">How to arrange a Jordan River baptism</Heading>
   <div className="grid gap-3 sm:grid-cols-2">{[
    ["1","Choose the location and type of service","Ask your church leader about baptism, renewal of vows or a commemorative visit. Agree which setting is appropriate."],
    ["2","Arrange the officiant and timing","Confirm the priest or pastor, language, group size and ceremony time. A sightseeing tour does not automatically provide clergy."],
    ["3","Check each site’s requirements","Reserve admission at Qasr el-Yahud. At Yardenit, ordinary parties of up to 40 need no advance visit coordination; notify the site for a larger group. In either case, separately confirm ceremony timing, dress and facilities."],
    ["4","Pack and allow enough time","Bring towels, dry clothes, suitable footwear, water and sun protection. Leave time to prepare, pray and change."],
   ].map(step=><article key={step[0]} className="rounded-xl border bg-card p-4"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{step[0]}</span><h3 className="mt-2 font-bold">{step[1]}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step[2]}</p></article>)}</div>
   <MyTip>If baptism is the main purpose of your trip, I would fix the ceremony time first and add other sightseeing stops only after that.</MyTip>
  </section>
  <section id="getting-there" className="mt-12 scroll-mt-24" aria-labelledby="getting-there-heading">
   <Heading id="getting-there" intro="These are two different journeys. Use the precise site name when booking a driver or using navigation.">Getting to Yardenit and Qasr el-Yahud</Heading>
   <div className="grid gap-4 sm:grid-cols-2">
    <article className="rounded-xl border bg-card p-4"><MapPinned className="mb-2 h-5 w-5 text-primary" aria-hidden="true"/><h3 className="text-lg font-bold">Yardenit — Galilee</h3><p className="mt-2 text-sm leading-relaxed">Near Kibbutz Kinneret, south of Tiberias. I would usually combine it with selected Sea of Galilee or Nazareth stops. A suitable tour, rental car or prearranged driver makes the last leg easier. If using public transport, check the exact stop and final walk, not just Tiberias.</p><a href="https://www.google.com/maps/dir/?api=1&destination=Yardenit%20Baptismal%20Site%2C%20Kibbutz%20Kinneret%2C%20Israel&travelmode=driving" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Directions to Yardenit <ExternalLink className="h-4 w-4" aria-hidden="true"/></a></article>
    <article className="rounded-xl border bg-card p-4"><MapPinned className="mb-2 h-5 w-5 text-primary" aria-hidden="true"/><h3 className="text-lg font-bold">Qasr el-Yahud — lower Jordan</h3><p className="mt-2 text-sm leading-relaxed">Near Jericho, north of the Dead Sea. Follow the signed access road. I would favour a confirmed driver or guided tour over an unverified bus connection to the entrance. Check the actual reservation and access instructions before travelling.</p><a href="https://www.google.com/maps/dir/?api=1&destination=Qasr%20el%20Yahud%20Baptismal%20Site%2C%20Israel&travelmode=driving" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Directions to Qasr el-Yahud <ExternalLink className="h-4 w-4" aria-hidden="true"/></a></article>
   </div>
   <div data-testid="baptism-comparison-map" className="mt-5 overflow-hidden rounded-xl border bg-card">
    <div className="px-4 pt-4"><h3 className="font-bold">Compare both sites on one map</h3></div>
    <iframe title="Map showing Yardenit and Qasr el-Yahud as two locations" src={baptismComparisonMapUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-3 h-[290px] w-full border-0 sm:h-[350px]"/>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 text-sm">
     <a href="https://www.google.com/maps/search/?api=1&query=Yardenit%20Baptismal%20Site%2C%20Kibbutz%20Kinneret%2C%20Israel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4"><span className="inline-grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">1</span> Yardenit <ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/></a>
     <a href="https://www.google.com/maps/search/?api=1&query=Qasr%20el%20Yahud%20Baptismal%20Site%2C%20Israel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4"><span className="inline-grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">2</span> Qasr el-Yahud <ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/></a>
    </div>
   </div>
   <p className="mt-4 text-sm leading-relaxed">For private transport, <a href="#contact" className={linkClass}>tell me your chosen site, date, departure point and ceremony time</a>. I can discuss a driver, waiting time and practical stops. Guiding and religious services should be arranged separately.</p>
  </section>
  {baptismTourGroups.map(group=><TourSection key={group.id} group={group}/>)}
  <section id="practical-tips" className="mt-12 scroll-mt-24" aria-labelledby="practical-tips-heading">
   <Heading id="practical-tips" intro="A little preparation can make a religious visit more meaningful and comfortable.">My practical tips</Heading>
   <div className="grid gap-3 sm:grid-cols-2">{[
    {icon:<Shirt className="h-5 w-5 text-primary"/>,title:"Clothing and river safety",text:"These are managed baptism areas, not swimming beaches. Enter the water only where and when staff permit it, and ask about steps and mobility needs before immersion."},
    {icon:<Users className="h-5 w-5 text-primary"/>,title:"Respect the ceremony",text:"Give other visitors room to pray and always ask before photographing people who are being baptized."},
    {icon:<Clock3 className="h-5 w-5 text-primary"/>,title:"Check the actual access",text:"Opening hours, last-baptism times, special events and local restrictions can change. Confirm with the responsible operator close to your visit."},
    {icon:<CheckCircle2 className="h-5 w-5 text-primary"/>,title:"Choose a manageable route",text:"Around Galilee, focus on a few churches. Near Qasr el-Yahud, add Jericho or the Dead Sea only if you have enough time for the full visit."},
   ].map(item=><article key={item.title} className="rounded-xl border bg-card p-4">{item.icon}<h3 className="mt-2 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div>
  </section>
  <FaqList faqs={[...baptismFaqs]}/>
  <PhotoCards id="attractions" title="Explore more biblical sites" intro="These are in different regions: most Galilee sites are near Yardenit, while Qasr el-Yahud is much farther south." items={attractions}/>
  <PhotoCards id="related" title="Plan the rest of your Holy Land journey" intro="My practical guides to churches, the Galilee, Jerusalem and transport in Israel." items={related}/>
  <HomeContactForm guide={{heading:"Planning a Jordan River baptism visit?",introduction:"I'm Moshe Barak. I arrange private airport transfers, day trips with a driver and tailored journeys in Israel. Tell me whether you mean Yardenit or Qasr el-Yahud, your date, pickup point and group size. I'll reply personally about private transport. The ceremony and clergy need separate arrangements.",subject:"",placeholder:"Yardenit or Qasr el-Yahud, date, pickup point, passengers, ceremony time and transport needs…"}}/>
  <SourcesDisclosure><p className="mb-3 text-sm leading-relaxed">Official site instructions and background references. Confirm admission, reservations, ceremonies, access and opening times directly for your date.</p><ul className="space-y-2 text-sm">{baptismSources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true"/></a></li>)}</ul></SourcesDisclosure>
 </article></main>;
}
