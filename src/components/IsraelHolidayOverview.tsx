import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { holidays, type Community, type Holiday, type Impact } from "@/data/israelHolidays";

type Quarter = 0 | 1 | 2 | 3 | "all";
type Year = 2026 | 2027;
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

/**
 * A genuine quarter view, not a set of collapsed month accordions.
 * Keeps the full data available but only shows the visitor a short,
 * readable portion at once. Date selection in the planner above is separate.
 */
export function overviewHolidays(year: Year, quarter: Quarter, community: "All" | Community): Holiday[] {
  return holidays
    .filter(h => h.from.startsWith(String(year)))
    .filter(h => quarter === "all" || Math.floor((Number(h.from.slice(5, 7)) - 1) / 3) === quarter)
    .filter(h => community === "All" || h.community === community)
    .sort((a, b) => a.from.localeCompare(b.from) || a.name.localeCompare(b.name));
}

export function CompactHolidayRow({ holiday }: { holiday: Holiday }) {
  return <li className="grid min-w-0 gap-x-4 gap-y-1 border-b border-border/70 px-3 py-3 last:border-0 sm:grid-cols-[115px_minmax(0,1fr)] sm:px-4 lg:grid-cols-[115px_minmax(160px,0.9fr)_minmax(0,1.5fr)] lg:items-start">
    <p className="text-sm font-semibold tabular-nums text-foreground">{shortDate(holiday.from)}{holiday.from !== holiday.to && <> – {shortDate(holiday.to)}</>}</p>
    <div className="min-w-0">
      <h4 className="text-sm font-semibold leading-snug">{holiday.name}</h4>
      <p className="mt-0.5 text-xs text-muted-foreground">{holiday.community}{holiday.certainty === "tentative" ? " · Dates tentative" : ""}{holiday.startsAt === "sunset" ? " · Starts at sunset" : ""}</p>
    </div>
    <div className="min-w-0 sm:col-start-2 lg:col-auto">
      <p className="flex items-center gap-1.5 text-xs font-medium text-foreground"><span aria-hidden="true" className={"h-2 w-2 shrink-0 rounded-full " + dotStyles[holiday.impact]} />{impactLabels[holiday.impact]}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{holiday.travel}</p>
      {holiday.location && <p className="mt-1 text-xs text-muted-foreground">Relevant area: {holiday.location}</p>}
    </div>
  </li>;
}

/** Compact year reference below the interactive trip-date calendar. */
export function IsraelHolidayOverview() {
  const [year, setYear] = useState<Year>(2027);
  const [quarter, setQuarter] = useState<Quarter>(0);
  const [community, setCommunity] = useState<"All" | Community>("All");
  const matches = overviewHolidays(year, quarter, community);
  const groups = matches.reduce<Array<{ month: number; entries: Holiday[] }>>((all, holiday) => {
    const month = Number(holiday.from.slice(5, 7)) - 1;
    const previous = all[all.length - 1];
    if (previous?.month === month) previous.entries.push(holiday);
    else all.push({ month, entries: [holiday] });
    return all;
  }, []);
  const chooseYear = (next: Year) => { setYear(next); setQuarter(next === 2026 ? 3 : 0); };
  return <section id="year-calendar" className="mt-12 scroll-mt-24" aria-labelledby="year-heading">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 id="year-heading" className="text-3xl">Holiday dates at a glance</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">Browse holiday dates and their likely effects on travel. Jewish festival dates follow the calendar in Israel; Muslim dates are tentative.</p>
      </div>
      <div role="group" aria-label="Holiday calendar year" className="inline-flex rounded-xl border bg-secondary/40 p-1">
        {([2026, 2027] as const).map(value => <button type="button" key={value} aria-pressed={year === value} onClick={() => chooseYear(value)} className={"rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary " + (year === value ? "bg-primary text-primary-foreground" : "hover:bg-background")}>{value}</button>)}
      </div>
    </div>
    <div className="mt-5 rounded-xl border bg-card p-3 sm:p-4">
      <div role="group" aria-label="Choose calendar period" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {quarters.map(item => <button type="button" key={item.id} disabled={year === 2026 && item.id !== 3} aria-pressed={quarter === item.id} onClick={() => setQuarter(item.id)}
          className={"rounded-lg border px-2 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 " + (quarter === item.id ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-secondary")}>{item.label}</button>)}
        <button type="button" aria-pressed={quarter === "all"} onClick={() => setQuarter("all")}
          className={"col-span-2 rounded-lg border px-2 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary sm:col-span-1 " + (quarter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-secondary")}>Full year</button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter holidays by community">
        {communities.map(item => <button type="button" key={item} aria-pressed={community === item} onClick={() => setCommunity(item)}
          className={"rounded-full border px-3 py-1.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-primary " + (community === item ? "border-primary bg-secondary text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground")}>{item === "All" ? "All traditions" : item}</button>)}
      </div>
    </div>
    <div className="mt-4" aria-live="polite" aria-atomic="false">
      <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={16} aria-hidden="true" />{year === 2026 ? "Remaining dates in 2026" : "2027"} · {quarter === "all" ? "Full year" : quarters[quarter].label} · {matches.length} {matches.length === 1 ? "observance" : "observances"}</p>
      {matches.length === 0
        ? <p className="rounded-xl border bg-secondary/40 p-5 text-sm">No listed holidays match these filters. Try another period or tradition.</p>
        : <div className="overflow-hidden rounded-xl border bg-card">
          {groups.map(({month,entries}) => <div key={month}>
            <h3 className="border-y bg-secondary/50 px-3 py-2 text-sm font-bold first:border-t-0 sm:px-4">{monthName(month)} {year}</h3>
            <ul className="list-none">{entries.map(holiday => <CompactHolidayRow key={holiday.id} holiday={holiday} />)}</ul>
          </div>)}
        </div>}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Dates include the preceding evening when an observance begins at sunset. These are practical planning notes, not live opening hours, ticket availability or price forecasts. For an exact visit, select your arrival and departure on the calendar above.</p>
  </section>;
}
