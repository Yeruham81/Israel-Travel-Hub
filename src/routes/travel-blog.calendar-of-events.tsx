import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink, MapPin, Ticket } from "lucide-react";
import { Breadcrumbs, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { israelToday, rollingMonths, type Month } from "@/data/holidayRolling";
import { CONFIRMED_EVENTS, RECURRING_FESTIVALS, EVENT_CATEGORIES, EVENT_REGIONS, EVENT_CHECK_DATE, EVENT_FEED_CHECK_DATE, publishedEvents, filterConfirmedEvents, filterRecurringFestivals, type EventCategory, type EventRegion, type ConfirmedEvent, type RecurringFestival } from "@/data/israelEvents";
import { eventLinks } from "@/data/eventTicketLinks";
import { recordOutboundClick, relFor } from "@/lib/outbound";

const PATH="/travel-blog/calendar-of-events/";
const TITLE="Israel Events Calendar: Festivals & Things to Do";
const DESCRIPTION="Find festivals, concerts, films and cultural events in Israel. Check confirmed event dates, filter by city and explore annual festivals with official organiser links.";
const hero=migrationPhotos["calendar-of-events"];
const dateFormat=(s:string)=>new Date(s+"T12:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
const shortDate=(s:string)=>new Date(s+"T12:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"UTC"});
const labels=Object.fromEntries(EVENT_REGIONS.map(item=>[item.id,item.label])) as Record<EventRegion,string>;
type Selection={start:string|null;end:string|null};
type Place="all"|EventRegion;
type Kind="all"|EventCategory;

export const Route=createFileRoute("/travel-blog/calendar-of-events")({
  head:()=>{
    const crumbs=[{name:"Home",path:"/"},{name:"Travel guides",path:"/guides/"},{name:"Israel events",path:PATH}];
    const meta=pageMeta({title:TITLE,description:DESCRIPTION,path:PATH,type:"article",crumbs,image:hero.src,imageAlt:hero.alt});
    return {...meta,scripts:[...meta.scripts,jsonLd({
      "@context":"https://schema.org","@type":"Article",headline:TITLE,description:DESCRIPTION,
      "@id":CANONICAL_ORIGIN+PATH+"#article",mainEntityOfPage:CANONICAL_ORIGIN+PATH,
      inLanguage:"en",dateModified:EVENT_CHECK_DATE,author:authorLd(),
      publisher:{"@type":"Organization",name:SITE_NAME,url:CANONICAL_ORIGIN},
      image:new URL(hero.src,CANONICAL_ORIGIN).href,
    })]};
  },
  component:IsraelEventsPage,
});

function ExternalEventLink({id,label,tickets=false,sourceUrl}:{id:string;label?:string;tickets?:boolean;sourceUrl?:string}) {
  const links=eventLinks(id,sourceUrl);
  const href=tickets?links.ticket:links.official;
  if(!href)return null;
  const affiliate=tickets&&links.affiliate;
  const title=label||(tickets?"View tickets":"Official event details");
  return <a href={href} target="_blank" rel={relFor(affiliate)}
    onClick={()=>recordOutboundClick({pageId:"calendar-of-events",productId:id,offerId:tickets?(affiliate?"affiliate-tickets":"direct-tickets"):"official"})}
    className={tickets?"inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary":"inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2 hover:text-foreground"}>
    {tickets&&<Ticket size={15} aria-hidden="true"/>}{title}<ExternalLink size={14} aria-hidden="true"/>
  </a>;
}
function EventListItem({event}:{event:ConfirmedEvent}) {
  const links=eventLinks(event.id,event.sourceUrl);
  return <li className="grid min-w-0 gap-2 border-b px-3 py-4 last:border-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4 sm:px-4">
    <div className="text-sm font-semibold tabular-nums">{shortDate(event.from)}{event.from!==event.to&&<> – {shortDate(event.to)}</>}</div>
    <div className="min-w-0">
      <h3 className="text-base font-semibold">{event.title}</h3>
      <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground"><MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true"/>{event.location} · {labels[event.region]}{event.startTime?" · "+event.startTime:""}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
      <p className="mt-2 text-sm leading-relaxed"><strong>Good to know:</strong> {event.visitorNote}</p>
      {event.sourceName&&<p className="mt-1 text-xs text-muted-foreground">Listing source: {event.sourceName} · checked {shortDate(event.checkedAt)}. Check the provider for latest status.</p>}
      {event.languageNote&&<p className="mt-1 text-xs text-muted-foreground">{event.languageNote}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {links.ticket&&<ExternalEventLink id={event.id} tickets/>}
        <ExternalEventLink id={event.id} sourceUrl={event.sourceUrl} label={event.sourceName?"Event details on "+event.sourceName:undefined}/>
      </div>
    </div>
  </li>;
}
function RecurringListItem({festival}:{festival:RecurringFestival}) {
  return <li className="grid gap-2 border-b px-3 py-4 last:border-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4 sm:px-4">
    <p className="text-sm font-semibold text-muted-foreground">{festival.usualSeason}</p>
    <div>
      <h3 className="text-base font-semibold">{festival.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{labels[festival.region]}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{festival.description}</p>
      <p className="mt-1 text-sm"><strong>Before you go:</strong> {festival.visitorNote}</p>
      <div className="mt-2"><ExternalEventLink id={festival.id} label="Check the organiser's next edition"/></div>
    </div>
  </li>;
}
const weekdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function MonthGrid({month,today,events,selection,onChoose}:{month:Month;today:string;events:readonly ConfirmedEvent[];selection:Selection;onChoose:(date:string)=>void}){
  const lead=new Date(Date.UTC(month.year,month.month,1)).getUTCDay();
  const count=new Date(Date.UTC(month.year,month.month+1,0)).getUTCDate();
  return <div className="min-w-0 rounded-xl border bg-card p-3 sm:p-4">
    <h3 className="mb-3 text-center text-base font-semibold">{month.label}</h3>
    <div className="grid grid-cols-7 gap-1" role="group" aria-label={month.label}>
      {weekdays.map(day=><span key={day} className="py-1 text-center text-[11px] font-semibold text-muted-foreground">{day}</span>)}
      {Array.from({length:lead},(_,i)=><span key={"lead-"+i} aria-hidden="true"/>)}
      {Array.from({length:count},(_,i)=>{
        const d=month.key+"-"+String(i+1).padStart(2,"0");
        const selected=d===selection.start||d===selection.end;
        const between=Boolean(selection.start&&selection.end&&d>selection.start&&d<selection.end);
        const includes=events.some(e=>e.from<=d&&e.to>=d&&e.to>=today);
        return <button type="button" key={d} disabled={d<today} onClick={()=>onChoose(d)}
          aria-label={dateFormat(d)+(includes?" — event listed":"")+(d===selection.start?" — arrival":d===selection.end?" — departure":"")}
          aria-pressed={selected||between}
          className={"relative flex aspect-square min-h-9 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-10 "+
            (selected?"border-primary bg-primary font-bold text-primary-foreground":between?"border-primary/40 bg-primary/10":"border-transparent hover:border-primary/40 hover:bg-secondary")}>
          {i+1}
          {includes&&<span className={"h-1.5 w-1.5 rounded-full "+(selected?"bg-primary-foreground":"bg-primary")} aria-hidden="true"/>}
        </button>;
      })}
    </div>
  </div>;
}

export function IsraelEventsPage() {
  const [today,setToday]=useState(()=>israelToday());
  const months=useMemo(()=>rollingMonths(today,"2100-12-31",15),[today]);
  const [monthOffset,setMonthOffset]=useState(0);
  const offset=Math.min(monthOffset,Math.max(0,months.length-1));
  const [selection,setSelection]=useState<Selection>({start:null,end:null});
  const events=useMemo(()=>publishedEvents(today),[today]);
  const [region,setRegion]=useState<Place>("all");
  const [category,setCategory]=useState<Kind>("all");
  useEffect(()=>{
    const refresh=()=>setToday(old=>{const value=israelToday();return value===old?old:value;});
    const timer=window.setInterval(refresh,60*60*1000);
    window.addEventListener("focus",refresh);
    document.addEventListener("visibilitychange",refresh);
    return ()=>{window.clearInterval(timer);window.removeEventListener("focus",refresh);document.removeEventListener("visibilitychange",refresh);};
  },[]);
  useEffect(()=>{setMonthOffset(0);setSelection({start:null,end:null});},[today.slice(0,7)]);
  const chooseDate=(d:string)=>setSelection(old=>{
    if(!old.start||old.end)return {start:d,end:null};
    return d<old.start?{start:d,end:old.start}:{start:old.start,end:d};
  });
  const complete=Boolean(selection.start&&selection.end);
  const upcoming=useMemo(()=>filterConfirmedEvents(events,{
    today, start:complete?selection.start:null,end:complete?selection.end:null,region,category
  }),[events,today,selection.start,selection.end,complete,region,category]);
  const recurring=useMemo(()=>filterRecurringFestivals(RECURRING_FESTIVALS,region,category),[region,category]);
  return <main className="mx-auto max-w-6xl px-4 pb-12">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/guides/"},{name:"Israel events",to:PATH}]}/>
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">TRAVEL PLANNING GUIDE</p>
            <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{TITLE}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Discover festivals, concerts and cultural events during your trip. Compare confirmed dates and explore annual events before their next programme is announced.</p>
            <PageUpdated date={EVENT_CHECK_DATE}/>
          </div>
          <figure><img src={hero.src} alt={hero.alt} width={900} height={600} loading="eager" fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover"/></figure>
        </div>
        <AuthorCard/>
      </header>
      <OnThisPage sections={[
        ["event-planner","Find events"],["confirmed-events","Confirmed events"],["annual-festivals","Annual festivals"],["event-advice","Before you go"],["event-sources","Event calendars"]
      ]}/>
      <section id="event-planner" className="mt-10 scroll-mt-24" aria-labelledby="event-planner-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="event-planner-heading" className="text-3xl">Find events during your visit</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose your arrival and departure dates, then narrow the list by region or event type.</p>
          </div>
          <button type="button" onClick={()=>setSelection({start:null,end:null})} className="rounded-lg border bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary">Clear dates</button>
        </div>
        <div className="mt-5 rounded-2xl border bg-secondary/40 p-3 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <button type="button" disabled={offset===0} onClick={()=>setMonthOffset(v=>Math.max(v-1,0))} aria-label="Previous month" className="rounded-lg border bg-background p-2 disabled:opacity-40"><ChevronLeft size={22}/></button>
            <label className="flex items-center gap-2 text-sm font-semibold"><CalendarDays size={18} aria-hidden="true"/>
              <select value={offset} onChange={e=>setMonthOffset(Number(e.target.value))} aria-label="Choose a month" className="max-w-[220px] rounded-lg border bg-background px-3 py-2 text-sm">
                {months.map((month,i)=><option key={month.key} value={i}>{month.label}</option>)}
              </select>
            </label>
            <button type="button" disabled={offset===months.length-1} onClick={()=>setMonthOffset(v=>Math.min(v+1,months.length-1))} aria-label="Next month" className="rounded-lg border bg-background p-2 disabled:opacity-40"><ChevronRight size={22}/></button>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground" role="status" aria-live="polite">{!selection.start?"Choose your arrival date":!selection.end?"Choose your departure date":dateFormat(selection.start)+" – "+dateFormat(selection.end)}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {months[offset]&&<MonthGrid month={months[offset]} today={today} events={events} selection={selection} onChoose={chooseDate}/>}
            {offset+1<months.length&&<div className="hidden lg:block"><MonthGrid month={months[offset+1]!} today={today} events={events} selection={selection} onChoose={chooseDate}/></div>}
          </div>
          <p className="mt-3 text-xs text-muted-foreground"><span aria-hidden="true" className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary"/>Dots indicate events currently listed for those dates, not a complete schedule of everything happening in Israel.</p>
        </div>
        <div className="mt-5 space-y-3 rounded-xl border bg-card p-4">
          <fieldset>
            <legend className="text-sm font-semibold">City or region</legend>
            <div className="mt-2 flex flex-wrap gap-2">{EVENT_REGIONS.map(item=><button key={item.id} type="button" aria-pressed={region===item.id} onClick={()=>setRegion(item.id)} className={"rounded-full border px-3 py-1.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary "+(region===item.id?"border-primary bg-primary text-primary-foreground":"bg-background hover:bg-secondary")}>{item.label}</button>)}</div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold">Event type</legend>
            <div className="mt-2 flex flex-wrap gap-2">{EVENT_CATEGORIES.map(item=><button key={item.id} type="button" aria-pressed={category===item.id} onClick={()=>setCategory(item.id)} className={"rounded-full border px-3 py-1.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary "+(category===item.id?"border-primary bg-primary text-primary-foreground":"bg-background hover:bg-secondary")}>{item.label}</button>)}</div>
          </fieldset>
        </div>
      </section>
      <section id="confirmed-events" className="mt-10 scroll-mt-24">
        <h2 className="text-3xl">Upcoming confirmed events</h2>
        <p className="mt-2 text-sm text-muted-foreground">{complete?dateFormat(selection.start!)+" – "+dateFormat(selection.end!):"Events with published dates from today onwards"} · {upcoming.length} {upcoming.length===1?"event":"events"} in our checked listings</p>
        {upcoming.length>0?<ul className="mt-4 overflow-hidden rounded-xl border bg-card" aria-label="Confirmed events">{upcoming.map(event=><EventListItem key={event.id} event={event}/>)}</ul>:
          <div className="mt-4 rounded-xl border bg-card p-4">
            <p className="text-sm font-medium">No verified events are currently listed for {complete?"these dates and filters":"these filters"}.</p>
            <p className="mt-2 text-sm text-muted-foreground">This does not mean there are no events. Check the city event calendars linked below; additional programmes may be announced later.</p>
          </div>}
      </section>
      <section id="annual-festivals" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Annual festivals worth knowing about</h2>
        <p className="mt-2 text-sm text-muted-foreground">These are recurring events, not confirmed future bookings. The season is a guide only; use the organiser's site for the next edition's dates.</p>
        {recurring.length>0?<ul className="mt-4 overflow-hidden rounded-xl border bg-card" aria-label="Recurring festivals">{recurring.map(event=><RecurringListItem key={event.id} festival={event}/>)}</ul>:
          <p className="mt-4 rounded-xl border bg-card p-4 text-sm">No annual festivals match these filters. Choose a different region or event type.</p>}
      </section>
      <section id="event-advice" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Before you book an event</h2>
        <p className="mt-3 leading-relaxed">Check the specific performance date and venue, not just the festival's overall dates. Some productions are in Hebrew, while films may have English subtitles. Free events can still require registration. For popular concerts or tours, check the entry time and ticket terms on the organiser's website.</p>
        <p className="mt-3 leading-relaxed">Check transport after the event, especially for late-night performances and journeys between cities. See <Link to="/travel-blog/getting-around-israel/" className="text-primary underline">Getting Around Israel</Link>. For possible holiday closures and special opening hours, use the <Link to="/travel-blog/israel-holidays/" className="text-primary underline">Israel Holidays Calendar</Link>.</p>
        <p className="mt-3 text-sm text-muted-foreground">Some event websites and ticket services may be in Hebrew. Listings can change or be cancelled; the organiser's latest information takes precedence.</p>
      </section>
      <section id="event-sources" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Check more city event calendars</h2>
        <p className="mt-2 text-sm text-muted-foreground">Our first release includes a selection of checked events, not an exhaustive live feed. Local organisers may publish additional events at short notice.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li><a href="https://www.tel-aviv.gov.il/Visitors/Events/Pages/Events.aspx" target="_blank" rel="noopener noreferrer" className="text-primary underline">Tel Aviv-Yafo municipality — events and performances</a></li>
          <li><a href="https://www.itraveljerusalem.com/list/events" target="_blank" rel="noopener noreferrer" className="text-primary underline">Jerusalem tourism — events</a></li>
          <li><a href="https://www.haifa.muni.il/culture/city-events/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Haifa municipality — cultural events</a></li>
          <li><a href="https://www.eilat.muni.il/events/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Eilat municipality — events calendar</a></li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">Editorial events checked {dateFormat(EVENT_CHECK_DATE)}. {EVENT_FEED_CHECK_DATE&&publishedEvents(today).length>CONFIRMED_EVENTS.length?"Automated source last checked "+dateFormat(EVENT_FEED_CHECK_DATE)+".":"Additional automatically verified events appear when a licensed source feed is connected."}</p>
      </section>
      <p className="mt-8 text-sm"><Link to="/guides/" className="font-medium text-primary underline">Explore more travel guides →</Link></p>
    </article>
  </main>;
}
