import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { holidays, HOLIDAY_COVERAGE, type Community, type Holiday, type Impact } from "@/data/israelHolidays";
import { israelToday, quarterRange, visibleHolidayYears } from "@/data/holidayRolling";

type Quarter = 0 | 1 | 2 | 3 | "all";
const quarters = [
  { id: 0, label: "Jan–Mar" },
  { id: 1, label: "Apr–Jun" },
  { id: 2, label: "Jul–Sep" },
  { id: 3, label: "Oct–Dec" },
] as const;
const communities = ["All", "Jewish", "Christian", "Muslim", "Druze", "National"] as const;
const impactLabels: Record<Impact, string> = {
  major: "Major restrictions",
  mixed: "Changes and crowds",
  local: "Local impact",
  awareness: "Limited disruption",
};
const dotStyles: Record<Impact, string> = {
  major: "bg-rose-600",
  mixed: "bg-amber-500",
  local: "bg-sky-600",
  awareness: "bg-emerald-600",
};
const monthName = (month: number) => new Date(Date.UTC(2027, month, 1)).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
const shortDate = (date: string) => new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** A specific quarter or year, limited to supported current/future months. */
export function overviewHolidays(year:number, quarter:Quarter, community:"All"|Community, today=israelToday()):Holiday[] {
  const period=quarterRange(year,quarter);
  const from=[period.from,today.slice(0,7)+"-01",HOLIDAY_COVERAGE.from].sort().at(-1)!;
  const to=period.to<HOLIDAY_COVERAGE.to?period.to:HOLIDAY_COVERAGE.to;
  if(from>to) return [];
  return holidays.filter(h=>h.to>=from && h.from<=to)
    .filter(h=>community==="All" || h.community===community || h.otherCommunities?.includes(community))
    .sort((a,b)=>a.from.localeCompare(b.from)||a.name.localeCompare(b.name));
}

export function CompactHolidayRow({ holiday }: { holiday: Holiday }) {
  return <li className="grid min-w-0 gap-x-4 gap-y-1 border-b border-border/70 px-3 py-3 last:border-0 sm:grid-cols-[115px_minmax(0,1fr)] sm:px-4 lg:grid-cols-[115px_minmax(160px,0.9fr)_minmax(0,1.5fr)] lg:items-start">
    <p className="text-sm font-semibold tabular-nums text-foreground">{shortDate(holiday.from)}{holiday.from !== holiday.to && <> – {shortDate(holiday.to)}</>}</p>
    <div className="min-w-0">
      <h4 className="text-sm font-semibold leading-snug">{holiday.name}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{holiday.summary}</p>
      <p className="mt-1 text-xs text-muted-foreground">{[holiday.community, ...(holiday.otherCommunities || [])].join(" · ")}{holiday.certainty === "tentative" ? " · Dates tentative" : ""}{holiday.startsAt === "sunset" ? " · Starts at sunset" : ""}</p>
    </div>
    <div className="min-w-0 sm:col-start-2 lg:col-auto">
      <p className="flex items-center gap-1.5 text-xs font-medium text-foreground"><span aria-hidden="true" className={"h-2 w-2 shrink-0 rounded-full " + dotStyles[holiday.impact]} />{impactLabels[holiday.impact]}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{holiday.travel}</p>
      {holiday.location && <p className="mt-1 text-xs text-muted-foreground">Relevant area: {holiday.location}</p>}
    </div>
  </li>;
}

/** Quarterly at-a-glance reference, moving forward with the month in Israel. */
export function IsraelHolidayOverview() {
  const [today,setToday]=useState(()=>israelToday());
  const [year,setYear]=useState(()=>Number(israelToday().slice(0,4)));
  const [quarter,setQuarter]=useState<Quarter>(()=>Math.floor((Number(israelToday().slice(5,7))-1)/3) as Quarter);
  const [community,setCommunity]=useState<"All"|Community>("All");
  const currentMonth=today.slice(0,7);
  useEffect(()=>{
    const refresh=()=>{const value=israelToday();setToday(old=>old===value?old:value);};
    const timer=window.setInterval(refresh,60*60*1000);
    window.addEventListener("focus",refresh);
    document.addEventListener("visibilitychange",refresh);
    return ()=>{window.clearInterval(timer);window.removeEventListener("focus",refresh);document.removeEventListener("visibilitychange",refresh);};
  },[]);
  useEffect(()=>{
    const currentYear=Number(currentMonth.slice(0,4));
    setYear(currentYear);
    setQuarter(Math.floor((Number(currentMonth.slice(5,7))-1)/3) as Quarter);
  },[currentMonth]);
  const years=visibleHolidayYears(today,HOLIDAY_COVERAGE.to);
  const matches=overviewHolidays(year,quarter,community,today);
  const availableFrom=today.slice(0,7)+"-01";
  const groups=matches.reduce<Array<{month:string;entries:Holiday[]}>>((list,holiday)=>{
    const periodStart=quarterRange(year,quarter).from;
    const shown=[holiday.from,availableFrom,periodStart].sort().at(-1)!;
    const key=shown.slice(0,7);
    const previous=list[list.length-1];
    if(previous?.month===key) previous.entries.push(holiday);
    else list.push({month:key,entries:[holiday]});
    return list;
  },[]);
  const enabledQuarter=(q:number)=>{const range=quarterRange(year,q);return range.to>=availableFrom && range.from<=HOLIDAY_COVERAGE.to;};
  const selectYear=(chosen:number)=>{
    setYear(chosen);
    const first=[0,1,2,3].find(enabled=>{const range=quarterRange(chosen,enabled);return range.to>=availableFrom&&range.from<=HOLIDAY_COVERAGE.to;});
    setQuarter((first??0) as Quarter);
  };
  const dateLabel=quarter==="all"?"Available dates":quarters[quarter].label;
  return <section id="year-calendar" className="mt-12 scroll-mt-24" aria-labelledby="year-heading">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 id="year-heading" className="text-3xl">Holiday dates at a glance</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">Browse holiday dates and their likely effects on travel. Jewish festival dates follow the calendar in Israel; Muslim dates are tentative.</p>
      </div>
      {years.length>0 && <div role="group" aria-label="Holiday calendar year" className="inline-flex flex-wrap rounded-xl border bg-secondary/40 p-1">
        {years.map(value=><button type="button" key={value} aria-pressed={year===value} onClick={()=>selectYear(value)} className={"rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary "+(year===value?"bg-primary text-primary-foreground":"hover:bg-background")}>{value}</button>)}
      </div>}
    </div>
    {years.length===0 ? <p className="mt-4 rounded-xl border bg-card p-5 text-sm">Upcoming dates are being updated.</p> : <>
      <div className="mt-5 rounded-xl border bg-card p-3 sm:p-4">
        <div role="group" aria-label="Choose calendar period" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {quarters.map(item=><button type="button" key={item.id} disabled={!enabledQuarter(item.id)} aria-pressed={quarter===item.id} onClick={()=>setQuarter(item.id)}
            className={"rounded-lg border px-2 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 "+(quarter===item.id?"border-primary bg-primary text-primary-foreground":"bg-background hover:bg-secondary")}>{item.label}</button>)}
          <button type="button" aria-pressed={quarter==="all"} onClick={()=>setQuarter("all")}
            className={"col-span-2 rounded-lg border px-2 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary sm:col-span-1 "+(quarter==="all"?"border-primary bg-primary text-primary-foreground":"bg-background hover:bg-secondary")}>All available</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter holidays by community">
          {communities.map(item=><button type="button" key={item} aria-pressed={community===item} onClick={()=>setCommunity(item)}
            className={"rounded-full border px-3 py-1.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-primary "+(community===item?"border-primary bg-secondary text-foreground":"border-transparent text-muted-foreground hover:border-border hover:text-foreground")}>{item==="All"?"All traditions":item}</button>)}
        </div>
      </div>
      <div className="mt-4" aria-live="polite" aria-atomic="false">
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={16} aria-hidden="true"/>{year} · {dateLabel} · {matches.length} {matches.length===1?"observance":"observances"}</p>
        {matches.length===0
          ? <p className="rounded-xl border bg-secondary/40 p-5 text-sm">No listed holidays match these filters. Try another period or tradition.</p>
          : <div className="overflow-hidden rounded-xl border bg-card">{groups.map(({month,entries})=><div key={month}>
              <h3 className="border-y bg-secondary/50 px-3 py-2 text-sm font-bold first:border-t-0 sm:px-4">{monthName(Number(month.slice(5,7))-1)} {month.slice(0,4)}</h3>
              <ul className="list-none">{entries.map(holiday=><CompactHolidayRow key={holiday.id} holiday={holiday}/>)}</ul>
            </div>)}</div>}
      </div>
    </>}
  </section>;
}
