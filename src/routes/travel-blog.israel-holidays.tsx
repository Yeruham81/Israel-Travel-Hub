import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Breadcrumbs, OnThisPage } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { PageUpdated } from "@/components/PageUpdated";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { holidays, HOLIDAY_COVERAGE, intersects, type Impact } from "@/data/israelHolidays";
import { IsraelHolidayOverview } from "@/components/IsraelHolidayOverview";
import { TripHolidayResults } from "@/components/TripHolidayResults";

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

type DateSelection = { start:string|null; end:string|null };
const monthStart = { year: 2026, month: 9 }; // October 2026; month is zero based.
const months = Array.from({length:16},(_,i)=>{
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
function HolidayDot({ impact }: {impact:Impact}) {
  return <span className={"inline-block h-1.5 w-1.5 rounded-full "+impactColor[impact]} aria-hidden="true"/>;
}
function MonthCalendar({offset,selection,onSelect}:{offset:number;selection:DateSelection;onSelect:(date:string)=>void}) {
  const {year,month,label}=months[offset]!;
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
export function IsraelHolidaysPage() {
  const [monthOffset,setMonthOffset]=useState(3); // Jan 2027
  const [selection,setSelection]=useState<DateSelection>({start:null,end:null});
  const start=selection.start;
  const end=selection.end;
  const selectDate=(day:string)=>{
    setSelection(current=>{
      if(!current.start || current.end) return {start:day,end:null};
      if(day<current.start) return {start:day,end:current.start};
      return {start:current.start,end:day};
    });
  };
  return <main className="mx-auto max-w-6xl px-4 pb-12">
    <article>
      <header className="pt-6">
        <Breadcrumbs items={[{name:"Home",to:"/"},{name:"Travel guides",to:"/guides/"},{name:"Israel holidays",to:PATH}]}/>
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">TRAVEL PLANNING GUIDE</p>
            <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{TITLE}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Public transport can pause, attractions can get busy and religious celebrations can change access to particular places. Use this 2027 calendar to see which dates matter for your visit.</p>
            <PageUpdated date={HOLIDAY_COVERAGE.checkedAt}/>
          </div>
          <figure><img src={photo.src} alt={photo.alt} width={900} height={600} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover"/></figure>
        </div>
        <AuthorCard/>
      </header>
      <OnThisPage sections={[
        ["trip-calendar","Choose your dates"],["trip-results","Your trip"],["year-calendar","Holiday dates"],
        ["what-changes","What may change"],["travel-advice","Planning advice"],["questions","Questions"],["sources","Sources"]
      ]}/>
      <section id="trip-calendar" className="mt-10 scroll-mt-24" aria-labelledby="trip-calendar-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 id="trip-calendar-heading" className="text-3xl">Choose your travel dates</h2><p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">Select your arrival and departure dates to see which holidays fall during your visit and how they may affect transport, opening hours and crowds.</p></div>
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
          <p className="mt-3 text-center text-sm text-muted-foreground" role="status" aria-live="polite">{!start?"Choose your arrival date":!end?"Choose your departure date":fmt(start)+" → "+fmt(end)}</p>
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
      <TripHolidayResults start={start} end={end} />
      <IsraelHolidayOverview />
      <section id="what-changes" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">What changes during Israeli holidays?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Buses, trains and airport journeys</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Regular buses and trains generally stop for Shabbat and major Jewish festival days. Yom Kippur also affects scheduled flights. Private transport and some local services may operate differently; see the <Link className="text-primary underline" to="/travel-blog/from-ben-gurion-airport-on-shabbat/">Shabbat airport transport guide</Link>.</p>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Churches and religious sites</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Christian Holy Week services can restrict sightseeing access, especially in Jerusalem's Old City. Ramadan and Eid may change local opening hours. Read about <Link className="text-primary underline" to="/travel-blog/churches-in-jerusalem/">Jerusalem's churches</Link> and <Link className="text-primary underline" to="/travel-blog/jerusalem-to-bethlehem/">visiting Bethlehem</Link>.</p>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Restaurants, shops and attractions</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Opening hours depend on the holiday and the individual business. Passover may bring special menus at kosher restaurants and hotels. Many attractions remain open on Chol HaMoed, even while transport stops for Shabbat or full festival days.</p>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Hotels and domestic holiday crowds</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">School breaks around Passover, Sukkot and other holidays can make family attractions and accommodation busier. Hotel and tour prices vary by place and date; a holiday does not automatically mean a higher rate.</p>
          </div>
        </div>
      </section>
      <section id="travel-advice" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Plan around your arrival and departure</h2>
        <p className="mt-3 leading-relaxed">A flight or transfer that falls near Friday sunset or a major festival can be harder to arrange than a sightseeing day. Check how you will reach your hotel and return to the airport; our <Link className="font-medium text-primary underline" to="/travel-blog/getting-around-israel/">Getting Around Israel</Link> guide covers the transport options. For weather and seasonal demand, see <Link className="font-medium text-primary underline" to="/travel-blog/best-time-to-visit-israel/">Best Time to Visit Israel</Link>.</p>
      </section>
      <section id="questions" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl">Common questions</h2>
        <div className="mt-4 divide-y rounded-xl border">
          {[
            ["Why do some overseas calendars show extra Jewish festival days?","Israel follows seven days of Passover and one day of Shavuot. Shemini Atzeret and Simchat Torah also share one day. Some communities outside Israel observe additional festival days."],
            ["Why do some holiday dates start the evening before?","Jewish festivals usually begin at sunset, so travel or restaurant plans on the preceding evening can already be affected. The calendar shows that starting date."],
            ["Are Ramadan and Eid dates fixed?","The Islamic calendar follows lunar observations. Dates shown for Ramadan and Eid are estimates until relevant local religious authorities confirm them."],
            ["When is Easter celebrated in Jerusalem in 2027?","Western Easter Sunday is 28 March. Orthodox Easter Sunday is 2 May; the Holy Fire ceremony takes place on Orthodox Holy Saturday, 1 May. Religious services can affect access around the Old City."],
                    ].map(([q,a])=><details key={q} className="p-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 leading-relaxed text-muted-foreground">{a}</p></details>)}
        </div>
      </section>
      <section id="sources" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Holiday calendars and travel resources</h2>
        <p className="mt-2 text-sm text-muted-foreground">Dates reviewed: 23 October 2026. School breaks differ by school sector; Muslim holiday dates can shift with local announcements.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li><a className="text-primary underline" href="https://www.hebcal.com/holidays/2027?i=on" target="_blank" rel="noopener noreferrer">Hebcal — Jewish holidays (Israel setting)</a></li>
          <li><a className="text-primary underline" href="https://www.timeanddate.com/holidays/israel/2027" target="_blank" rel="noopener noreferrer">Time and Date — Israel holidays and estimated observances</a></li>
          <li><a className="text-primary underline" href="https://parents.education.gov.il/gov-education/vacations-camps-leisure/schedule/" target="_blank" rel="noopener noreferrer">Israel Ministry of Education — school vacation calendar</a></li>
          <li><a className="text-primary underline" href="https://bus.gov.il/" target="_blank" rel="noopener noreferrer">Israel Ministry of Transport — check current bus services</a></li>
          <li><a className="text-primary underline" href="https://www.rail.co.il/" target="_blank" rel="noopener noreferrer">Israel Railways — train schedules</a></li>
          <li><a className="text-primary underline" href="https://www.iaa.gov.il/en/airports/ben-gurion/" target="_blank" rel="noopener noreferrer">Israel Airports Authority — airport information</a></li>
        </ul>
      </section>
      <p className="mt-8 text-sm"><Link to="/guides/" className="font-medium text-primary underline">Explore more travel guides →</Link></p>
    </article>
  </main>;
}
