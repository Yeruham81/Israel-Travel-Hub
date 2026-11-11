import { UsefulLinkCallout } from "@/components/UsefulLinkCallout";

/** Additional wayfinding belongs to this guide; shared articles keep their default layout. */
export function ShabbatBusLinks() {
  return <div>
    <UsefulLinkCallout
      label="Line 711 stop-by-stop timetable"
      href="https://busofash.co.il/?lines=711"
      context="Check Terminal 1 stop 34609 in the Tel Aviv-bound direction for your actual travel date. Route-wide operating hours are not departure times at the airport."
    />
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      For accessibility arrangements and service changes, see the <a className="font-medium text-primary underline underline-offset-4" href="https://busofash.co.il/" target="_blank" rel="noopener noreferrer">weekend bus operator updates<span className="sr-only"> (opens in a new tab)</span></a>.
    </p>
  </div>;
}

export function ShabbatTerminalSteps() {
  return <div className="mt-5 rounded-xl border bg-card p-4 sm:p-5" aria-label="How to reach bus 711 from Terminal 3">
    <h3 className="text-lg font-semibold">From your flight to bus 711</h3>
    <ol className="mt-4 grid gap-3 sm:grid-cols-3">
      <li className="rounded-lg bg-secondary/50 p-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">1 · Terminal 3</span>
        <p className="mt-1 text-sm">Leave arrivals and find the free shuttle on Level G near Gate 01.</p>
      </li>
      <li className="rounded-lg bg-secondary/50 p-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">2 · Internal shuttle</span>
        <p className="mt-1 text-sm">Travel to Terminal 1; allow for the wait and the ride.</p>
      </li>
      <li className="rounded-lg bg-secondary/50 p-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">3 · Bus 711</span>
        <p className="mt-1 text-sm">Find airport stop 34609 and check the Tel Aviv-bound departure.</p>
      </li>
    </ol>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">This is a sequence of steps, not a map or a guarantee of a timed connection.</p>
  </div>;
}

/** Keep practical timetable checks beside the paragraph where a visitor needs them. */
export function ShabbatTimesLink() {
  return <UsefulLinkCallout
    label="Look up Shabbat times on MyZmanim"
    href="https://www.myzmanim.com/"
    context="Check the local Friday and Saturday start and end times. These are not train or bus operating times."
  />;
}

export function ShabbatPublicTransportLinks() {
  return <div>
    <UsefulLinkCallout
      label="Israel Railways — official timetable"
      href="https://rail.co.il/?lan=en"
      context="Enter your actual date, departure station and destination to check the first train after Shabbat and your onward connection."
    />
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      For bus journeys, check the <a href="https://route.bus.gov.il/?saveParams=true&tab=source-destination" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">National Public Transport Authority — route planner<span className="sr-only"> (opens in a new tab)</span></a> for the date and exact route.
    </p>
  </div>;
}
