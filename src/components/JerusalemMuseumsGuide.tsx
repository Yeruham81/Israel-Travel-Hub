import { ConsentIframe } from "@/components/ConsentIframe";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck2, CalendarDays, Clock3, ExternalLink, Lightbulb, MapPin, Ticket } from "lucide-react";
import { Breadcrumbs, FaqList, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { GuideHeroLayout, GuideHeroMedia } from "@/components/GuideHeroMedia";
import { PageUpdated } from "@/components/PageUpdated";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
import { HomeContactForm } from "@/components/HomeContactForm";
import { neighborhoodTripContactCopy } from "@/lib/guide-contact";
import { jerusalemAdditionalMuseums as additionalMuseums, jerusalemMuseumAreas as museumAreas, jerusalemMuseumMapPoints as museumMapPoints, jerusalemMuseums as museums, type JerusalemMuseumEntry as MuseumEntry } from "@/data/jerusalemMuseums";
import {jerusalemMuseumPhotos} from "@/data/jerusalemMuseumPhotos";
import museumHero from "@/assets/guides/museums-in-jerusalem.jpg";
import oldCityPhoto from "@/assets/attractions-hub/card-old-city-jerusalem-420.webp";
import jerusalemPhoto from "@/assets/attractions-hub/related-jerusalem-360.webp";
import mamillaPhoto from "@/assets/jerusalem/mamilla.webp";
import downtownPhoto from "@/assets/jerusalem/downtown.webp";
import bethlehemPhoto from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";
import mahanePhoto from "@/assets/jerusalem/mahane-yehuda.webp";

const updatedAt = "2026-11-20";
const related = [
  {title:"Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/" as const,note:"My practical introduction to the city and its sights",image:jerusalemPhoto,alt:"Jerusalem city view"},
  {title:"Explore the Old City",to:"/attractions/old-city-jerusalem/" as const,note:"City gates, historic streets and places to visit",image:oldCityPhoto,alt:"Jerusalem Old City"},
  {title:"Where to stay in Jerusalem",to:"/travel-blog/where-to-stay-in-jerusalem/" as const,note:"Neighbourhoods and hotel areas for your visit",image:mamillaPhoto,alt:"Mamilla area of Jerusalem"},
  {title:"Shopping in Jerusalem",to:"/travel-blog/shopping-in-jerusalem/" as const,note:"Markets, crafts and shopping streets around the city",image:mahanePhoto,alt:"Mahane Yehuda market in Jerusalem"},
  {title:"Churches in Jerusalem",to:"/travel-blog/churches-in-jerusalem/" as const,note:"My guide to churches, pilgrimage routes and practical visiting tips",image:museumHero,alt:"Historic Jerusalem churches"},
  {title:"How to get to Bethlehem",to:"/travel-blog/jerusalem-to-bethlehem/" as const,note:"Practical travel options and planning advice",image:bethlehemPhoto,alt:"Bethlehem pilgrimage site"},
];
function OfficialLink({href,children}:{href:string;children:ReactNode}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary">{children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function MapLink({museum}:{museum:MuseumEntry}) {
  const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(museum.name+", "+museum.address+", Israel");
  return <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline"><MapPin className="h-3.5 w-3.5" aria-hidden="true"/> Directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
function SectionHeading({id,title,intro}:{id:string;title:string;intro?:string}) {
  return <div className="mb-5"><h2 id={id+"-heading"} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{intro&&<p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{intro}</p>}</div>;
}
function PlanningTip({children}:{children:ReactNode}) {
  return <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-950"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true"/><div><strong>My tip:</strong> {children}</div></aside>;
}
function MuseumCard({museum}:{museum:MuseumEntry}) {
  const museumPhoto = jerusalemMuseumPhotos[museum.id]!;
  const family = ["science","time","music","tower"].includes(museum.id);
  const bookAhead = ["yad","science","time","friends","tolerance","begin","music"].includes(museum.id);
  const tags = [museum.theme, museum.priceNis === 0 ? "Free entry" : null, family ? "Family-friendly" : null, bookAhead ? "Book ahead" : null].filter((x):x is string=>Boolean(x));
  const showTicket = Boolean(museum.ticketUrl && museum.ticketUrl !== museum.url);
  const ticketLabel = museum.id === "rockefeller" ? "Check organised tours" : ["yad","begin","friends","tolerance","time"].includes(museum.id) ? "Reserve a visit" : museum.id === "israel" ? "Tickets & admission" : "Check tickets & rates";
  return <article id={"museum-"+museum.id} data-museum-card="horizontal" className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-6 lg:p-5">
      <figure className="min-w-0 bg-secondary/20 lg:col-start-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
        <div className="overflow-hidden bg-secondary/40">
          <img
            src={museumPhoto.src}
            alt={museumPhoto.alt}
            width={museumPhoto.width}
            height={museumPhoto.height}
            loading="lazy"
            decoding="async"
            className={`h-48 w-full sm:h-56 lg:aspect-[4/3] lg:h-auto ${museumPhoto.fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        </div>
        
      </figure>
      <div className="min-w-0 p-4 sm:p-5 lg:col-start-1 lg:row-start-1 lg:p-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{museum.neighbourhood}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{museum.name}</h3>
        {tags.length>0 && <div className="mt-2 flex flex-wrap gap-1.5">{tags.map(tag=><span key={tag} className="rounded-full border border-primary/15 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium">{tag}</span>)}</div>}
        {museum.closureNote && <p className="mt-3 w-fit rounded-md border border-amber-300/60 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">{museum.closureNote}</p>}
        <p className="mt-3 text-sm leading-relaxed">{museum.intro}</p>
      </div>
    </div>
    <div className="border-t px-4 py-4 sm:px-5 lg:px-6">
      <dl className="grid gap-3 rounded-xl bg-secondary/40 p-3.5 text-sm sm:grid-cols-2">
          <div className="relative min-w-0 pl-6"><dt className="font-semibold">Allow<Clock3 className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true"/></dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.duration}</dd></div>
          <div className="relative min-w-0 pl-6"><dt className="font-semibold">Admission<Ticket className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true"/></dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.admission}</dd></div>
          <div className="relative min-w-0 pl-6"><dt className="font-semibold">Usual opening<CalendarDays className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true"/></dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.openingDays}</dd></div>
          <div className="relative min-w-0 pl-6"><dt className="font-semibold">Booking<CalendarCheck2 className="absolute left-0 top-0.5 h-4 w-4 text-primary" aria-hidden="true"/></dt><dd className="mt-0.5 leading-relaxed text-muted-foreground">{museum.booking}</dd></div>
      </dl>
    </div>
    <div className="grid gap-4 border-t px-4 py-4 sm:px-5 lg:grid-cols-2 lg:gap-6 lg:px-6">
      <div>
        <h4 className="text-sm font-semibold">Highlights</h4>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-muted-foreground">{museum.highlights.slice(0,2).map(item=><li key={item}>{item}</li>)}</ul>
        {museum.highlightsForFamilies && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{museum.highlightsForFamilies}</p>}
      </div>
      <p className="text-sm leading-relaxed"><strong className="text-primary">My tip:</strong> {museum.tip}</p>
    </div>
    <div className="flex flex-col gap-3 border-t bg-secondary/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:px-6">
      <div className="flex min-w-0 flex-col gap-1 text-xs text-muted-foreground">
        <span>{museum.address}</span>
        <div><MapLink museum={museum}/></div>
      </div>
      <div className={`grid w-full gap-2 text-sm lg:w-auto lg:min-w-[360px] ${showTicket ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
        {showTicket && <a href={museum.ticketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90">{ticketLabel}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>}
        <a href={museum.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-100 px-3 py-2.5 text-center font-semibold text-sky-950 hover:bg-sky-200">{museum.id === "rockefeller" ? "Official tour information" : "Official museum website"}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  </article>;
}
const museumMapUrl="/maps/jerusalem-museums.html?points="+encodeURIComponent(JSON.stringify(museumMapPoints));
function MuseumMap() {
  const [selectedId,setSelectedId]=useState("all");
  const frame=useRef<HTMLIFrameElement>(null);
  const selected=museums.find(m=>m.id===selectedId);
  const focus=(id:string)=>{
    setSelectedId(id);
    frame.current?.contentWindow?.postMessage({type:"jerusalem-museum-map-focus",id},window.location.origin);
  };
  useEffect(()=>{
    const listener=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow)return;
      if(event.data?.type==="jerusalem-museum-map-selected"&&museumMapPoints.some(m=>m.id===event.data.id))setSelectedId(event.data.id);
    };
    window.addEventListener("message",listener);
    return ()=>window.removeEventListener("message",listener);
  },[]);
  return <section aria-label="Museum locations in Jerusalem" className="mt-7 overflow-hidden rounded-xl border bg-card">
    <div className="p-4">
      <h3 className="text-lg font-semibold">Museums on the map</h3>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label htmlFor="jerusalem-museum-select" className="min-w-0 flex-1 text-sm font-semibold">Focus on a museum
          <select id="jerusalem-museum-select" value={selectedId} onChange={e=>focus(e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm font-normal focus-visible:outline-2 focus-visible:outline-primary">
            <option value="all">All museums — city overview</option>
            {museumAreas.map(area=><optgroup key={area.id} label={area.name}>{museums.filter(m=>m.area===area.id).map(m=><option key={m.id} value={m.id}>{museums.findIndex(x=>x.id===m.id)+1}. {m.name}{m.id==="rockefeller"?" (restricted entry)":""}</option>)}</optgroup>)}
          </select>
        </label>
        <button type="button" disabled={selectedId==="all"} onClick={()=>focus("all")} className="min-h-11 rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary disabled:cursor-default disabled:opacity-50">Show all museums</button>
      </div>
      {selected&&<p className="mt-2 text-xs text-muted-foreground">{selected.address}, Israel{selected.closureNote?" · "+selected.closureNote:""}</p>}
    </div>
    <ConsentIframe ref={frame} title="Fifteen Jerusalem museums and cultural experiences" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={museumMapUrl} onLoad={()=>{
      if(selectedId!=="all")frame.current?.contentWindow?.postMessage({type:"jerusalem-museum-map-focus",id:selectedId},window.location.origin);
    }} width={900} height={440} className="h-[360px] w-full border-0 sm:h-[440px]"/>
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted-foreground"><span>Map data © OpenStreetMap contributors.</span>{selected&&<OfficialLink href={"https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(selected.name+", "+selected.address+", Israel")}>Get directions on Google Maps</OfficialLink>}</div>
  </section>;
}
const faqs=[
  {q:"Which museum should I visit first in Jerusalem?",a:"For a broad art-and-archaeology collection, choose the Israel Museum. For the story of the city itself, Tower of David is a strong first stop. Yad Vashem has a different commemorative purpose and deserves its own unhurried visit."},
  {q:"Do I need a reservation for Yad Vashem?",a:"Entry is free. Reserve a Holocaust History Museum entry slot online to secure your preferred time; walk-in entry depends on availability. Children under ten cannot enter the Holocaust History Museum."},
  {q:"Can I visit the Rockefeller Archaeological Museum?",a:"Rockefeller is closed to regular walk-in visitors. Occasionally organised, pre-booked tours may be available; check with Tower of David or the current operator before making plans."},
  {q:"Which Jerusalem museums are best for children?",a:"The Bloomfield Science Museum is particularly interactive, while Time Elevator is a multimedia attraction for older children. Ask about minimum ages, languages and booked time slots."},
  {q:"Which museums are close enough to combine?",a:"The Israel Museum and Bible Lands Museum are close together, and the city-centre museums around Nahalat Shiva and Hillel Street are walkable. Yad Vashem and the Old City need separate travel arrangements."},
  {q:"Are Jerusalem museums open on Shabbat and Jewish holidays?",a:"Some open on Saturdays, including the Israel Museum and Museum for Islamic Art, while others close. Fridays and holiday eves often have shorter hours. Check the official museum calendar before visiting."},
  {q:"Is the Time Elevator a museum?",a:"It is a separate, immersive audiovisual attraction rather than a collection-based museum. I include it because it can be an entertaining history stop, particularly for families."},
];
export function JerusalemMuseumsGuide(){
  const featured=museums.filter(m=>["israel","yad","tower","science","tolerance","begin"].includes(m.id));
  const jump=[["top-picks","My top picks"],["compare","Compare museums"],["by-area","Museums by area"],["choose","Which museum?"],["museum-routes","Suggested visits"],["practical","Visitor tips"],["faq","FAQ"],["explore-more","Explore more"],["contact","Contact me"]] as const;
  return <main className="mx-auto max-w-5xl px-4 pb-10"><article>
    <header className="pt-6">
      <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/travel-blog/"},{name:"Museums in Jerusalem",to:"/travel-blog/museums-in-jerusalem/"}]}/>
      <GuideHeroLayout image={<GuideHeroMedia src={museumHero} alt="Rockefeller Museum courtyard and tower in Jerusalem"/>}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Jerusalem · Museums, history and culture</p>
        <h1 className="guide-page-title mt-2">Best Museums in Jerusalem</h1>
        <p data-guide-intro className="mt-4 max-w-3xl text-lg leading-relaxed">From archaeology and art to Holocaust remembrance and hands-on science, Jerusalem offers very different museum experiences. In my guide, I compare the options, visitor arrangements and neighbourhoods to help you plan a rewarding visit.</p>
        <PageUpdated date={updatedAt}/>
      </GuideHeroLayout>
      <AuthorCard/>
    </header>
    <section className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-5 sm:p-6" aria-label="My quick recommendation">
      <h2 className="text-xl font-bold">Where I'd start</h2>
      <p className="mt-2 leading-relaxed">For a first museum day in Jerusalem, I would choose the <a href="#museum-israel" className="font-semibold text-primary hover:underline">Israel Museum</a> for its breadth, <a href="#museum-tower" className="font-semibold text-primary hover:underline">Tower of David</a> for the city's history, or <a href="#museum-science" className="font-semibold text-primary hover:underline">Bloomfield Science Museum</a> for a family visit. <a href="#museum-yad" className="font-semibold text-primary hover:underline">Yad Vashem</a> is an important but distinct remembrance experience that I would plan separately.</p>
    </section>
    <OnThisPage sections={jump}/>
    <section id="top-picks" aria-labelledby="top-picks-heading" className="mt-10 scroll-mt-24">
      <SectionHeading id="top-picks" title="My top museum picks" intro="Six places worth considering for different interests. Choose what matters most to you."/>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featured.map(m=><a key={m.id} href={"#museum-"+m.id} className="editorial-card-link group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-primary">
        <span className="text-[11px] font-bold uppercase tracking-wide text-primary">{m.theme}</span>
        <strong className="mt-2 text-base leading-snug">{m.name}</strong>
        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bestFor}</span>
        <span className="mt-2 text-xs text-muted-foreground">{m.priceNis===0?"Free general entry":typeof m.priceNis==="number"?"Adult ₪"+m.priceNis:"Check admission"}</span>
        
      </a>)}</div>
    </section>
    <section id="compare" aria-labelledby="compare-heading" className="mt-11 scroll-mt-24">
      <SectionHeading id="compare" title="Compare Jerusalem museums at a glance" intro="Regular adult rates checked in November 2026 where published by operators. Times are planning estimates; visitor arrangements can change."/>
      <div role="region" aria-label="Jerusalem museums admission and visiting comparison" tabIndex={0} className="overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <caption className="sr-only">Fifteen Jerusalem museums and experiences compared by area, adult admission, opening days and booking</caption>
          <thead className="bg-secondary/60"><tr>{["Museum","Best for","Area","Adult admission","Opening days","Allow","Booking"].map((label,i)=><th scope="col" key={label} className={i===0?"sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold":"border-b px-3 py-3 font-semibold"}>{label}</th>)}</tr></thead>
          <tbody>{museums.map(m=><tr key={m.id} className="border-b last:border-0">
            <th scope="row" className="sticky left-0 z-10 w-[140px] min-w-[136px] bg-card px-3 py-3 font-semibold"><a href={"#museum-"+m.id} className="text-primary hover:underline">{m.name}</a>{m.closureNote&&<span className="mt-1 block text-xs font-normal text-amber-800">{m.closureNote}</span>}</th>
            <td className="px-3 py-3">{m.bestFor}</td><td className="px-3 py-3">{m.neighbourhood}</td>
            <td className="whitespace-nowrap px-3 py-3 font-medium">{m.id==="rockefeller"?"Restricted entry":m.priceNis===0?"Free":typeof m.priceNis==="number"?"₪"+m.priceNis:"Check operator"}</td>
            <td className="px-3 py-3">{m.openingDays}</td><td className="whitespace-nowrap px-3 py-3">{m.duration}</td><td className="px-3 py-3">{m.booking}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="by-area" aria-labelledby="by-area-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="by-area" title="Explore museums by area" intro="Use these neighbourhood groups to plan realistically. Choose one major museum or a few smaller nearby venues, allowing for transport."/>
      {museumAreas.map((area,index)=><section key={area.id} id={"area-"+area.id} aria-label={area.name} className="mt-9 scroll-mt-24">
        <h3 className="text-2xl font-semibold">{area.name}</h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{area.intro}</p>
        <div className="mt-5 grid gap-5">{museums.filter(m=>m.area===area.id).map(m=><MuseumCard key={m.id} museum={m}/>)}</div>
        {index===0&&<div className="mt-5"><PlanningTip>The Israel Museum and Bible Lands Museum are close, but each can fill a substantial visit. The Israel Museum offers a 10% Bible Lands discount within a week when you show its ticket. <OfficialLink href="https://www.imj.org.il/en/node/1249261">Check the ticket conditions</OfficialLink> before combining visits.</PlanningTip></div>}
        {index===1&&<div className="mt-5"><PlanningTip>Rockefeller is closed to regular walk-in visitors. Only include an interior visit after securing an organised tour; otherwise, admire its exterior near Herod's Gate.</PlanningTip></div>}
      </section>)}
      <div className="mt-8 rounded-xl border bg-card p-4">
        <h3 className="text-lg font-semibold">Other interesting museum visits</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Two smaller cultural venues to consider when their current programmes suit your dates.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">{additionalMuseums.map(item=><li key={item.name} className="rounded-lg bg-secondary/40 p-4"><strong>{item.name}</strong><p className="mt-1 text-xs text-muted-foreground">{item.place}</p><p className="mt-2 text-sm leading-relaxed">{item.note}</p><p className="mt-3 text-sm"><OfficialLink href={item.url}>Official visitor information</OfficialLink></p></li>)}</ul>
      </div>
    </section>
    <section id="choose" aria-labelledby="choose-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="choose" title="Which museum is right for you?" intro="A few easy ways to narrow the choice by interest."/>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[
        {label:"Art and archaeology",text:"The Israel Museum for broad collections, or Bible Lands Museum for the ancient Near East.",href:"#museum-israel"},
        {label:"Jerusalem's history",text:"Tower of David's galleries and citadel views before exploring the Old City.",href:"#museum-tower"},
        {label:"Holocaust remembrance",text:"Yad Vashem and its memorial grounds, with time to reflect.",href:"#museum-yad"},
        {label:"With children",text:"Hands-on experiments at Bloomfield or the Time Elevator audiovisual show.",href:"#museum-science"},
        {label:"Jewish cultural heritage",text:"Hebrew Music Museum or the Nahon Museum of Italian Jewish Art.",href:"#museum-music"},
        {label:"Modern society and history",text:"Museum on the Seam, Museum of Tolerance or the Begin Heritage Center.",href:"#museum-seam"},
      ].map(item=><a key={item.label} href={item.href} className="rounded-xl border bg-card p-4 hover:border-primary/40 hover:bg-secondary/25"><h3 className="font-bold text-primary">{item.label}</h3><p className="mt-2 text-sm leading-relaxed">{item.text}</p></a>)}</div>
    </section>
    <section id="museum-routes" aria-labelledby="museum-routes-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="museum-routes" title="Plan a museum day in Jerusalem" intro="Three realistic ways to group museums, depending on your interests."/>
      <div className="grid gap-4 md:grid-cols-3">{[
        {title:"Museum Row: art and archaeology",time:"Half to full day",steps:["Israel Museum – choose two or three highlights","Bible Lands Museum if time and energy permit","Relax with a café break"],note:"Bloomfield is an alternative to a second traditional museum for families."},
        {title:"Jaffa Gate and the Old City",time:"Around half a day",steps:["Tower of David Jerusalem Museum","Walk through Jaffa Gate into the Old City","Optional Time Elevator show in Mamilla"],note:"The show is a separate, timed ticketed attraction."},
        {title:"Central Jerusalem cultural walk",time:"Around half a day",steps:["Hebrew Music Museum in Nahalat Shiva","Museum of Tolerance or Italian Jewish Art Museum","Explore the city-centre streets afterwards"],note:"Check tour schedules first: these venues may not share opening days."}
      ].map(route=><div key={route.title} className="rounded-xl border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{route.time}</p><h3 className="mt-1 text-lg font-bold">{route.title}</h3><ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">{route.steps.map(step=><li key={step}>{step}</li>)}</ol><p className="mt-3 text-sm text-muted-foreground">{route.note}</p></div>)}</div>
    </section>
    <section id="practical" aria-labelledby="practical-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="practical" title="My practical museum-planning tips"/>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5"><h3 className="font-bold">Tickets and languages</h3><p className="mt-2 text-sm leading-relaxed">Book timed visits at Yad Vashem, Bloomfield, Begin Center and multimedia venues ahead. For the Time Elevator, arrange English audio by phone; other guided tours may have language-specific dates.</p></div>
        <div className="rounded-xl border p-5"><h3 className="font-bold">Distances and transport</h3><p className="mt-2 text-sm leading-relaxed">Museum Row is west of the city centre, Yad Vashem is farther west, and Tower of David is by Jaffa Gate. Walk between central venues but plan transport between districts. My <Link to="/travel-blog/jerusalem-travel-guide/" className="font-semibold text-primary hover:underline">Jerusalem guide</Link> has more advice.</p></div>
        <div className="rounded-xl border p-5"><h3 className="font-bold">Shabbat and holidays</h3><p className="mt-2 text-sm leading-relaxed">Friday hours can be short and Saturday opening differs by museum. <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary hover:underline">Jewish holidays and holiday eves</Link> may affect visitor hours and public transport.</p></div>
        <div className="rounded-xl border p-5"><h3 className="font-bold">Age guidance and accessibility</h3><p className="mt-2 text-sm leading-relaxed">The Holocaust History Museum at Yad Vashem is for ages 10+. Certain Museum of Tolerance exhibitions are for ages 16+. Check accessible entrances and walking distances directly with each operator.</p></div>
      </div>
      <div className="mt-5"><PlanningTip>I generally prefer one substantial museum and time to enjoy its surrounding neighbourhood. Yad Vashem deserves a calm visit rather than a packed sightseeing schedule.</PlanningTip></div>
      <MuseumMap/>
    </section>
    <FaqList faqs={faqs}/>
    <section id="explore-more" aria-labelledby="explore-more-heading" className="mt-12 scroll-mt-24">
      <SectionHeading id="explore-more" title="Explore more of Jerusalem" intro="Continue planning with my Jerusalem city guides, neighbourhoods and day trips."/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map(item=><Link key={item.to} to={item.to} className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 hover:bg-secondary/20"><img src={guideHeroPhotoForPath(item.to)!.src} alt={guideHeroPhotoForPath(item.to)!.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/><span className="flex flex-1 flex-col p-4"><strong className="text-base">{item.title}</strong><span className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</span></span></Link>)}</div>
    </section>
    <HomeContactForm guide={neighborhoodTripContactCopy("Jerusalem")}/>
    <SourcesDisclosure>
      <p className="mb-3 text-sm leading-relaxed">Visitor information is based on official museum and operator pages checked in November 2026. Ticket prices, opening hours, guided-tour schedules and access arrangements may change; confirm details for your dates.</p>
      <ul className="grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">{museums.map(m=><li key={m.id}><OfficialLink href={m.url}>{m.name}</OfficialLink></li>)}</ul>
    </SourcesDisclosure>
  </article></main>;
}
