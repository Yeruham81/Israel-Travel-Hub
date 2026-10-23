import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, Bus, AlertCircle } from "lucide-react";
import { Breadcrumbs, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { holidays, HOLIDAY_COVERAGE, findHolidayMatches, checkRange, shabbatDates, intersects, type Holiday, type Community, type Impact } from "@/data/israelHolidays";

const PATH = "/travel-blog/israel-holidays/";
const TITLE = "Israel Holidays Calendar 2027: Dates & Travel Planning";
const DESCRIPTION = "Explore Israel's holidays in 2027. Select your travel dates on a visual calendar to see possible closures, transport changes, busy periods and local observances.";
const photo = migrationPhotos["calendar-of-events"];
const crumbs = [{name:"Home",path:"/"},{name:"Travel guides",path:"/guides/"},{name:"Israel holidays",path:PATH}];

export const Route = createFileRoute("/travel-blog/israel-holidays")({
  head: () => {
    const meta = pageMeta({ title:TITLE,description:DESCRIPTION,path:PATH,type:"article",crumbs,image:photo.src,imageAlt:photo.alt });
    return { ...meta, scripts: [...meta.scripts, jsonLd({
      "@context":"https://schema.org","@type":"Article",
      "@id":CANONICAL_ORIGIN+PATH+"#article",
      headline:TITLE,description:DESCRIPTION,inLanguage:"en",
      mainEntityOfPage:CANONICAL_ORIGIN+PATH,
      dateModified:HOLIDAY_COVERAGE.checkedAt,author:authorLd(),
      publisher:{"@type":"Organization",name:SITE_NAME,url:CANONICAL_ORIGIN},
      image:new URL(photo.src,CANONICAL_ORIGIN).href,
      citation:[...new Set(holidays.map(h=>h.source))],
    })] };
  },
  component: IsraelHolidaysPage,
});

type TripStyle = "public" | "car" | "private" | "mixed";
type DateSelection = { start:string|null; end:string|null };
const monthStart = { year: 2026, month: 9 }; // October 2026; month is zero based.
const months = Array.from({length:15},(_,i)=>{
  const d=new Date(Date.UTC(monthStart.year,monthStart.month+i,1));
  return { year:d.getUTCFullYear(),month:d.getUTCMonth(),label:d.toLocaleDateString("en-GB",{month:"long",year:"numeric",timeZone:"UTC"}) };
});
const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fmt = (iso:string) => new Date(iso+"T12:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
const impactLabel:Record<Impact,string> = {
  major:"Major service changes",
  mixed:"Changed hours or higher demand",
  local:"Mainly local / community-specific",
  awareness:"Usually limited disruption",
};
const impactColor:Record<Impact,string> = {
  major:"bg-rose-600",
  mixed:"bg-amber-500",
  local:"bg-sky-600",
  awareness:"bg-emerald-600",
};
const impactBorder:Record<Impact,string> = {
  major:"border-rose-300/70",
  mixed:"border-amber-300/70",
  local:"border-sky-300/70",
  awareness:"border-emerald-300/70",
};

function displayDates(h:Holiday) {
  return h.from===h.to ? fmt(h.from) : fmt(h.from)+" – "+fmt(h.to);
}
function travelTip(style:TripStyle, matches:Holiday[], hasShabbat:boolean):string|null {
  if(style==="public") {
    if(matches.some(h=>h.impact==="major") || hasShabbat) return "Because you plan to use buses or trains, verify the exact LAST service before each festival or Friday evening and the FIRST service after it. Some regular routes may not run at all.";
    return "Check each bus and rail operator for the dates of your trip, including the return connection.";
  }
  if(style==="private") return matches.some(h=>h.impact==="major") || hasShabbat
    ? "Pre-arrange any taxi or private transfer needed during Shabbat or major festivals. Availability and holiday pricing must be confirmed by the provider for your journey."
    : "Confirm pickup availability, local traffic restrictions and the actual quoted fare with your provider.";
  if(style==="car") return "Having a car does not guarantee access: ceremonies, local festivals and some religious areas can restrict roads or parking. On Yom Kippur, avoid driving except when necessary.";
  if(matches.some(h=>h.impact==="major") || hasShabbat) return "Check how you will get from the airport and back during Shabbat or a major festival. Public transport may be unavailable even while some private services operate.";
  return null;
}
function HolidayDot({ impact }: {impact:Impact}) {
  return <span className={"inline-block h-1.5 w-1.5 rounded-full "+impactColor[impact]} aria-hidden="true"/>;
}
function MonthCalendar({offset,selection,onSelect}:{offset:number;selection:DateSelection;onSelect:(date:string)=>void}) {
  const {year,month,label}=months[offset];
  const leading=new Date(Date.UTC(year,month,1)).getUTCDay();
  const days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  return <div className="min-w-0 rounded-2xl border bg-card p-3 sm:p-4">
    <h3 className="mb-3 text-center text-lg font-semibold">{label}</h3>
    <div className="grid grid-cols-7 gap-1" role="group" aria-label={label}>
      {week.map(d=><span key={d} className="py-1 text-center text-[11px] font-semibold text-muted-foreground">{d}</span>)}
      {Array.from({length:leading},(_,i)=><span key={"leading-"+i} aria-hidden="true" />)}
      {Array.from({length:days},(_,i)=>{
        const date=[year,String(month+1).padStart(2,"0"),String(i+1).padStart(2,"0")].join("-");
        const isValid=date>=HOLIDAY_COVERAGE.from && date<=HOLIDAY_COVERAGE.to;
        const isStart=selection.start===date;
        const isEnd=selection.end===date;
        const between=!!(selection.start && selection.end && date>selection.start && date<selection.end);
        const dayHolidays=holidays.filter(h=>intersects(date,date,h.from,h.to));
        const dow=new Date(Date.UTC(year,month,i+1)).getUTCDay();
        const shabbat=dow===5 || dow===6;
        const tags=dayHolidays.map(h=>h.name).join(", ");
        const classes=(isStart || isEnd)
          ? "border-primary bg-primary text-primary-foreground font-bold"
          : between ? "border-primary/50 bg-primary/10 text-foreground" :
            !isValid ? "border-transparent bg-secondary/30 text-muted-foreground/50" :
            shabbat ? "border-border bg-secondary/70 text-foreground" : "border-transparent text-foreground hover:border-primary/40 hover:bg-secondary/70";
        return <button type="button" key={date} disabled={!isValid} onClick={()=>onSelect(date)}
          aria-label={fmt(date)+(tags?" — "+tags:"")+(shabbat?" — Shabbat":"")+(isStart?" — arrival":isEnd?" — departure":between?" — within selected trip":"")}
          aria-pressed={isStart||isEnd||between}
          title={tags || (shabbat?(dow===5?"Shabbat begins Friday evening":"Saturday Shabbat; public transport generally limited"):"Select travel date")}
          className={"relative flex aspect-square min-h-9 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed sm:min-h-10 "+classes}>
          <span>{i+1}</span>
          {dayHolidays.length>0
            ? <span className="flex max-w-full items-center gap-0.5">{[...new Set(dayHolidays.map(h=>h.impact))].slice(0,3).map(impact=><HolidayDot key={impact} impact={impact}/>)}</span>
            : shabbat ? <span className={"text-[9px] leading-none "+(isStart||isEnd?"text-primary-foreground":"text-muted-foreground")}>{dow===5?"eve":"Sh"}</span> : null}
        </button>;
      })}
    </div>
  </div>;
}
function HolidayItem({holiday,compact=false}:{holiday:Holiday;compact?:boolean}) {
  return <article className={"rounded-xl border bg-card p-4 "+impactBorder[holiday.impact]}>
    <div className="flex flex-wrap items-start justify-between gap-2">
      <h4 className="text-base font-semibold leading-snug">{holiday.name}</h4>
      <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium"><HolidayDot impact={holiday.impact}/>{impactLabel[holiday.impact]}</span>
    </div>
    <p className="mt-2 text-sm font-medium">{displayDates(holiday)}{holiday.startsAt==="sunset"?" · begins at sunset":""}{holiday.certainty==="tentative"?" · tentative":""}</p>
    {holiday.location && <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={13}/>{holiday.location}</p>}
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{holiday.summary}</p>
    <p className="mt-2 text-sm leading-relaxed"><strong>For visitors:</strong> {holiday.travel}</p>
    {!compact && <a href={holiday.source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-medium text-primary underline underline-offset-4">Check calendar source <span className="sr-only">(opens in new tab)</span></a>}
  </article>;
}

export function IsraelHolidaysPage() {
  const [monthOffset,setMonthOffset]=useState(3); // Jan 2027
  const [selection,setSelection]=useState<DateSelection>({start:null,end:null});
  const [style,setStyle]=useState<TripStyle>("mixed");
  const [community,setCommunity]=useState<"All"|Community>("All");
  const start=selection.start;
  const end=selection.end;
  const error=start && end ? checkRange(start,end) : null;
  const matched=useMemo(()=>start&&end&&!error ? findHolidayMatches(start,end):[],[start,end,error]);
  const shabbat=useMemo(()=>start&&end&&!error ? shabbatDates(start,end):[],[start,end,error]);
  const hasShabbat=shabbat.length>0;
  const tripAdvice=start&&end&&!error ? travelTip(style,matched,hasShabbat) : null;
  const fullList=community==="All"?holidays:holidays.filter(h=>h.community===community);
  const grouped=Object.entries(fullList.reduce<Record<string,Holiday[]>>((acc,h)=>{
    const key=h.from.slice(0,7);
    (acc[key] ||= []).push(h);
    return acc;
  },{})).sort(([a],[b])=>a.localeCompare(b));
  const selectDate=(day:string)=>{
    setSelection(current=>{
      if(!current.start || current.end) return {start:day,end:null};
      if(day<current.start) return {start:day,end:current.start};
      return {start:current.start,end:day};
    });
  };
  const selectedMonth=months[monthOffset]!;
  return <main className="mx-auto max-w-6xl px-4 pb-12">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/guides/"},{name:"Israel holidays",to:PATH}]}/>
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">TRAVEL PLANNING GUIDE</p>
            <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{TITLE}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Find out what changes during Jewish, Christian and Muslim holidays and Israel's national observances. Pick your travel dates directly on the calendar to see the holidays that may affect your plans.</p>
            <PageUpdated date={HOLIDAY_COVERAGE.checkedAt}/>
          </div>
          <figure><img src={photo.src} alt={photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover"/></figure>
        </div>
        <AuthorCard/>
      </header>
      <section className="mt-8 rounded-2xl border bg-secondary/50 p-5 sm:p-6">
        <h2 className="text-2xl">What visitors should know</h2>
        <p className="mt-3 leading-relaxed">Not every holiday means the country closes. Major Jewish festival days and weekly Shabbat can interrupt buses, trains and many services. Passover and Sukkot include intermediate days when attractions are often open but busier. Christian and Muslim celebrations mostly affect particular communities, churches and neighbourhoods. Your dates, destination and mode of travel matter more than the holiday name alone.</p>
      </section>
      <OnThisPage sections={[
        ["trip-calendar","Choose your dates"],["trip-results","Your trip"],["year-calendar","Holiday dates"],
        ["what-changes","What may change"],["travel-advice","Planning advice"],["questions","Questions"],["sources","Sources"]
      ]}/>
      <section id="trip-calendar" className="mt-10 scroll-mt-24" aria-labelledby="trip-calendar-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 id="trip-calendar-heading" className="text-3xl">Choose your travel dates</h2><p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">Tap your arrival date, then your departure date. You can move between months or jump to a month. Holiday dots show potential disruptions even before you choose dates.</p></div>
          <button type="button" onClick={()=>setSelection({start:null,end:null})} className="rounded-lg border bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary">Clear dates</button>
        </div>
        <div className="mt-5 rounded-2xl border bg-secondary/40 p-3 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" disabled={monthOffset===0} aria-label="Previous month" onClick={()=>setMonthOffset(n=>Math.max(0,n-1))} className="rounded-lg border bg-background p-2 disabled:opacity-40"><ChevronLeft size={22}/></button>
            <label className="flex items-center gap-2 text-sm font-semibold"><CalendarDays size={18}/><span className="sr-only">Jump to month</span>
              <select value={monthOffset} aria-label="Choose a month" onChange={e=>setMonthOffset(Number(e.target.value))} className="max-w-[220px] rounded-lg border bg-background px-3 py-2 text-sm">
                {months.map((m,i)=><option key={m.label} value={i}>{m.label}</option>)}
              </select>
            </label>
            <button type="button" disabled={monthOffset===months.length-1} aria-label="Next month" onClick={()=>setMonthOffset(n=>Math.min(months.length-1,n+1))} className="rounded-lg border bg-background p-2 disabled:opacity-40"><ChevronRight size={22}/></button>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground" role="status" aria-live="polite">{!start?"1. Choose your arrival date":!end?"2. Now choose your departure date (in this or a later month)":fmt(start)+" → "+fmt(end)}. {selectedMonth.label} {monthOffset+1<months.length?"and the following month are visible on wide screens.":""}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <MonthCalendar offset={monthOffset} selection={selection} onSelect={selectDate}/>
            {monthOffset+1<months.length && <div className="hidden lg:block"><MonthCalendar offset={monthOffset+1} selection={selection} onSelect={selectDate}/></div>}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Calendar symbols">
            {(Object.keys(impactLabel) as Impact[]).map(key=><span key={key} className="inline-flex items-center gap-1.5"><HolidayDot impact={key}/>{impactLabel[key]}</span>)}
            <span><strong>eve</strong> = Shabbat begins Friday evening; <strong>Sh</strong> = Saturday</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Israel dates; many Jewish observances begin the previous sunset. Dates for Muslim observances remain tentative until local confirmation. Calendar days are shown in local date format without promising precise opening or closing hours.</p>
        </div>
      </section>
      <section id="trip-results" className="mt-8 scroll-mt-24" aria-labelledby="trip-heading">
        <h2 id="trip-heading" className="text-2xl">How could your trip be affected?</h2>
        {!start || !end ? <div className="mt-4 rounded-xl border bg-card p-5 text-muted-foreground">Select arrival and departure on the calendar above to see holiday-by-holiday travel advice for those dates.</div>
          : error ? <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border bg-card p-5"><AlertCircle size={20}/><p>{error}</p></div>
          : <div className="mt-4 space-y-4" aria-live="polite">
            <div className="rounded-xl border bg-card p-5">
              <p className="font-semibold">{fmt(start)} – {fmt(end)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{matched.length} relevant holiday {matched.length===1?"period":"periods"} found, plus {shabbat.length} Friday/Saturday dates to consider. These are planning flags, not live transport or booking availability.</p>
              {(start && end) && ([
                {label:"Arrival",day:start},
                {label:"Departure",day:end},
              ] as const).map(({label,day})=>{
                const major=matched.filter(h=>h.impact==="major" && intersects(day,day,h.from,h.to));
                const dow=new Date(day+"T12:00:00Z").getUTCDay();
                if(!major.length && dow!==5 && dow!==6) return null;
                return <p key={label} className="mt-3 rounded-lg border border-amber-300/60 bg-secondary p-3 text-sm leading-relaxed"><strong>{label} date alert ({fmt(day)}):</strong> {major.length?"Overlaps "+major.map(h=>h.name).join(", ")+". Check flight, rail, bus and pickup arrangements at the relevant times. ":""}{dow===5?"Shabbat begins Friday evening; check the last available departure before sunset.":dow===6?"Saturday Shabbat may limit buses and trains until after nightfall.":""}</p>;
              })}
              <label className="mt-4 block text-sm font-medium">How do you expect to get around?
                <select value={style} onChange={e=>setStyle(e.target.value as TripStyle)} className="mt-2 block w-full max-w-sm rounded-lg border bg-background px-3 py-2.5 text-base">
                  <option value="mixed">Not decided / mixed transport</option><option value="public">Buses and trains</option><option value="private">Taxi or private driver</option><option value="car">Rental car</option>
                </select>
              </label>
              {tripAdvice && <p className="mt-4 flex items-start gap-2 rounded-lg bg-secondary p-3 text-sm leading-relaxed"><Bus className="mt-0.5 shrink-0" size={18}/>{tripAdvice}</p>}
              {hasShabbat && <p className="mt-3 text-sm leading-relaxed"><strong>Weekly Shabbat:</strong> Your dates include Friday afternoon/evening or Saturday ({shabbat.slice(0,8).map(fmt).join(", ")}{shabbat.length>8?` and ${shabbat.length-8} more dates`:""}). Many buses and trains stop before sunset Friday and resume after nightfall Saturday; exact services and local exceptions vary. <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className="text-primary underline">Read the airport arrival options</Link>.</p>}
              {!matched.length && <p className="mt-3 text-sm">No listed holiday overlaps the selected dates. That does not guarantee normal opening hours, low hotel prices or uninterrupted services; check Shabbat and your particular venue or operator.</p>}
            </div>
            {matched.length>0 && <div className="grid gap-3 md:grid-cols-2">{matched.map(h=><HolidayItem key={h.id} holiday={h}/>)}</div>}
          </div>}
      </section>
      <section id="year-calendar" className="mt-12 scroll-mt-24" aria-labelledby="year-heading">
        <h2 id="year-heading" className="text-3xl">Holiday dates: late 2026 and 2027</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Browse the holidays without selecting a trip. Full Jewish festival dates here follow practice in Israel, not the longer Diaspora schedules. Muslim dates are provisional. Dates shown include the preceding evening where relevant.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter holidays by tradition">
          {(["All","Jewish","Christian","Muslim","Druze","National"] as const).map(item=><button key={item} type="button" aria-pressed={community===item} onClick={()=>setCommunity(item)} className={"rounded-full border px-3 py-1.5 text-sm font-medium "+(community===item?"border-primary bg-primary text-primary-foreground":"bg-background hover:bg-secondary")}>{item==="All"?"All holidays":item}</button>)}
        </div>
        <div className="mt-5 space-y-4">{grouped.map(([month,items])=><details key={month} className="rounded-xl border bg-card p-4" open={month==="2026-12" || month==="2027-04" || month==="2027-10" ? true : undefined}>
          <summary className="cursor-pointer text-lg font-semibold">{new Date(month+"-15T12:00:00Z").toLocaleDateString("en-GB",{month:"long",year:"numeric",timeZone:"UTC"})} <span className="text-sm font-normal text-muted-foreground">({items.length})</span></summary>
          <div className="mt-4 grid gap-3 md:grid-cols-2">{items.map(h=><HolidayItem key={h.id} holiday={h} />)}</div>
        </details>)}</div>
      </section>
      <section id="what-changes" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">What actually changes on Israeli holidays?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Shabbat and major Jewish festivals</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Many intercity buses and trains stop before sunset on Friday or a major festival eve and restart after the observance ends. Some taxis, private transfers and services in non-Jewish areas can still operate. Never infer your own route's timetable from a national rule.</p></div>
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Passover and Sukkot: not one long closure</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">The first and final festival days carry stronger restrictions. On intermediate days (Chol HaMoed), many tourist attractions, restaurants and transport services operate, sometimes with special hours or heavy domestic holiday crowds. Shabbat in the middle remains distinct.</p></div>
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Yom Kippur is different</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Commercial activity and transportation are much more widely suspended, and scheduled flight operations at Ben Gurion Airport are normally paused. Do not plan travel into or out of the country without checking the actual airport schedule.</p></div>
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Local religious and memorial observances</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Easter, Christmas, Ramadan and Eid have especially local impacts. Memorial days involve moments of silence, closures of entertainment venues and solemn public ceremonies. Independence Day and city celebrations may create traffic restrictions rather than uniform shutdowns.</p></div>
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Hotels and prices</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Hotel, flight and tour demand can rise at Passover, Sukkot, school breaks or major local events, but price changes are not guaranteed and depend on each booking. Check refundable room terms and the actual total before booking.</p></div>
          <div className="rounded-xl border p-5"><h3 className="text-lg font-semibold">Restaurants, museums and worship sites</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A Jewish-run shop may close while a nearby restaurant stays open; churches may stop sightseeing admissions for services. Check the named venue, including whether reservation times and the evening before are affected.</p></div>
        </div>
      </section>
      <section id="travel-advice" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Plan around the full journey</h2>
        <p className="mt-3 leading-relaxed">Start by marking your arrival and departure dates. Check not only the holiday itself but the <strong>previous afternoon or evening</strong>, when public transport may already be winding down. Then confirm your airport journey, hotel check-in, restaurant reservations and the return journey from any day trip. Build flexibility into itineraries around holidays and processions.</p>
        <p className="mt-4 leading-relaxed">For the practical differences between trains, buses, licensed taxis and private drivers, read <Link className="font-medium text-primary underline" to="/travel-blog/getting-around-israel/">Getting Around Israel</Link> and <Link className="font-medium text-primary underline" to="/travel-blog/from-ben-gurion-airport-on-shabbat/">Ben Gurion Airport on Shabbat</Link>. Travelling for Easter or Christmas? See <Link className="font-medium text-primary underline" to="/travel-blog/churches-in-jerusalem/">Jerusalem churches</Link> and <Link className="font-medium text-primary underline" to="/travel-blog/jerusalem-to-bethlehem/">Jerusalem to Bethlehem</Link>. For weather and seasonal choices, use <Link className="font-medium text-primary underline" to="/travel-blog/best-time-to-visit-israel/">Best Time to Visit Israel</Link>.</p>
        <div className="mt-5 rounded-xl border bg-secondary/40 p-5"><h3 className="font-semibold">Important limitation</h3><p className="mt-2 text-sm leading-relaxed">This is an editorial calendar, not a live schedule, fare calculator or venue availability feed. Exact sunset times vary by city and date. Islamic dates may shift with local moon-sighting announcements. Closures, demand, roads and prices need checking for the actual provider and date, especially during emergency restrictions.</p></div>
      </section>
      <section id="questions" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Common questions</h2>
        <div className="mt-4 divide-y rounded-xl border">
          {[
            ["Do all shops and restaurants close on Israeli holidays?","No. It depends on the specific holiday, the neighbourhood and who runs the business. Most change on the major Jewish festival days or Yom Kippur, while Christian and Muslim holidays have more local effects."],
            ["Are trains and buses available on Jewish holidays?","Regular public transport is generally suspended during Shabbat and major Jewish festival days, but some local exceptions exist. Chol HaMoed is not uniformly a closure period. Verify your exact route."],
            ["Do Jewish holidays begin the evening before?","Yes, many begin at sunset. That previous evening can be important for transport, dinner plans and access to venues. The calendar intentionally marks the starting evening."],
            ["Do Jewish holidays in Israel last as long as overseas?","Not always. Passover lasts seven days, Shavuot one festival day, and Shemini Atzeret and Simchat Torah coincide in Israel. Many overseas Jewish calendars list additional festival days."],
            ["Can holiday dates change?","Jewish dates on the Hebrew calendar are predictable, though observances may be shifted in particular years. Christian dates vary by church tradition. Muslim dates shown here are estimates until locally confirmed."],
            ["Are hotels always more expensive during festivals?","Not necessarily. Demand and rates can change by city, day, room type and cancellation terms. Compare real prices for your exact dates; this calendar does not predict rates."],
          ].map(([q,a])=><details key={q} className="p-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 leading-relaxed text-muted-foreground">{a}</p></details>)}
        </div>
      </section>
      <section id="sources" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Calendar and official travel resources</h2>
        <p className="mt-2 text-sm text-muted-foreground">Review date: 23 October 2026. Check your city, denomination and route again before travel.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li><a className="text-primary underline" href="https://www.hebcal.com/holidays/2027?i=on" target="_blank" rel="noopener noreferrer">Hebcal — Jewish holidays (Israel setting)</a></li>
          <li><a className="text-primary underline" href="https://www.timeanddate.com/holidays/israel/2027" target="_blank" rel="noopener noreferrer">Time and Date — Israel holidays and estimated observances</a></li>
          <li><a className="text-primary underline" href="https://bus.gov.il/" target="_blank" rel="noopener noreferrer">Israel Ministry of Transport — check current bus services</a></li>
          <li><a className="text-primary underline" href="https://www.rail.co.il/" target="_blank" rel="noopener noreferrer">Israel Railways — train schedules</a></li>
          <li><a className="text-primary underline" href="https://www.iaa.gov.il/en/airports/ben-gurion/" target="_blank" rel="noopener noreferrer">Israel Airports Authority — airport information</a></li>
        </ul>
      </section>
      <div className="mt-10 rounded-2xl bg-secondary/50 p-6">
        <h2 className="text-xl font-semibold">Also planning when to visit?</h2><p className="mt-2 text-sm">The holiday calendar helps with closures and dates. For festivals and concerts, check current organiser programmes; our dedicated events guide will be expanded separately.</p>
        <Link to="/guides/" className="mt-4 inline-block font-medium text-primary underline">Explore more travel guides →</Link>
      </div>
    </article>
  </main>;
}
