import { Link } from "@tanstack/react-router";
import { CompactHolidayRow } from "@/components/IsraelHolidayOverview";
import { checkRange, findHolidayMatches, shabbatDates } from "@/data/israelHolidays";

const formattedDate = (date: string) => new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const shortDate = (date: string) => new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function ShabbatRow({ days }: { days: string[] }) {
  const dates = days.length <= 2
    ? days.map(shortDate).join(" – ")
    : days.length + " Fridays/Saturdays";
  return <li className="grid min-w-0 gap-x-4 gap-y-1 border-b border-border/70 px-3 py-3 last:border-0 sm:grid-cols-[115px_minmax(0,1fr)] sm:px-4 lg:grid-cols-[115px_minmax(160px,0.9fr)_minmax(0,1.5fr)] lg:items-start">
    <p className="text-sm font-semibold tabular-nums">{dates}</p>
    <div className="min-w-0">
      <h4 className="text-sm font-semibold">Shabbat</h4>
      <p className="mt-0.5 text-xs text-muted-foreground">Every Friday evening and Saturday</p>
    </div>
    <div className="min-w-0 sm:col-start-2 lg:col-auto">
      <p className="flex items-center gap-1.5 text-xs font-medium"><span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />Public transport and opening hours</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Many buses and trains stop from Friday afternoon until Saturday evening; some shops and attractions close. <Link to="/travel-blog/from-ben-gurion-airport-on-shabbat/" className="text-primary underline underline-offset-2">Shabbat transport guide</Link>.</p>
    </div>
  </li>;
}

/** Directly beneath the date picker. No additional controls or separate alert cards. */
export function TripHolidayResults({ start, end }: { start: string | null; end: string | null }) {
  const complete = start !== null && end !== null;
  const error = complete ? checkRange(start, end) : null;
  const matched = complete && !error ? findHolidayMatches(start, end) : [];
  const shabbat = complete && !error ? shabbatDates(start, end) : [];
  return <section id="trip-results" className="mt-8 scroll-mt-24" aria-labelledby="trip-heading">
    <h2 id="trip-heading" className="text-2xl">How could your trip be affected?</h2>
    <div className="mt-3" aria-live="polite" aria-atomic="false">
      {!complete ? <p className="text-sm text-muted-foreground">Select your arrival and departure dates on the calendar above.</p>
        : error ? <p role="alert" className="rounded-lg border p-4 text-sm">{error}</p>
        : <>
          <p className="mb-4 text-sm text-muted-foreground">{formattedDate(start)} – {formattedDate(end)}</p>
          {matched.length || shabbat.length
            ? <ul className="overflow-hidden rounded-xl border bg-card" aria-label="Holidays and Shabbat during your visit">
                {matched.map(holiday => <CompactHolidayRow key={holiday.id} holiday={holiday} />)}
                {shabbat.length > 0 && <ShabbatRow days={shabbat} />}
              </ul>
            : <p className="rounded-xl border bg-card px-4 py-3 text-sm">No listed holidays fall within these dates.</p>}
        </>}
    </div>
  </section>;
}
