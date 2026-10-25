import { useState } from "react";
import { TransferQuoteForm } from "@/components/TransferQuoteForm";

/** Additional wayfinding belongs to this guide; shared articles keep their default layout. */
export function ShabbatBusLinks() {
  return <div className="mt-5 rounded-xl border bg-secondary/40 p-4 sm:p-5">
    <p className="font-semibold text-foreground">Before relying on Line 711</p>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The airport stop is Terminal 1, stop 34609. Use the operator's current timetable, select the direction toward Tel Aviv and check your exact travel date. Network-wide hours are not the departure time at the airport.</p>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <a className="font-medium text-primary underline underline-offset-4" href="https://busofash.co.il/?lines=711" target="_blank" rel="noopener noreferrer">Official Line 711 stops and route <span className="sr-only">(opens in a new tab)</span></a>
      <a className="font-medium text-primary underline underline-offset-4" href="https://busofash.co.il/" target="_blank" rel="noopener noreferrer">Timetable, accessibility and service updates <span className="sr-only">(opens in a new tab)</span></a>
    </div>
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

export function ShabbatQuoteForm() {
  const [destinationId, setDestinationId] = useState("");
  return <TransferQuoteForm destinationId={destinationId} onDestinationChange={setDestinationId} />;
}

/** Keep practical timetable checks beside the paragraph where a visitor needs them. */
export function ShabbatTimesLink() {
  return <div className="mt-4 rounded-xl border bg-secondary/40 p-4 text-sm">
    <p className="font-semibold text-foreground">Check the date, not just the day of the week</p>
    <p className="mt-1 leading-relaxed text-muted-foreground">Find local Friday and Saturday Shabbat times. These do not tell you when the first train will run.</p>
    <a href="https://www.myzmanim.com/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-primary underline underline-offset-4">Look up Shabbat times on MyZmanim<span className="sr-only"> (opens in a new tab)</span></a>
  </div>;
}

export function ShabbatPublicTransportLinks() {
  return <div className="mt-4 rounded-xl border bg-secondary/40 p-4 text-sm" aria-label="Official rail and bus journey planners">
    <p className="font-semibold text-foreground">Check your first available Saturday-night departure</p>
    <p className="mt-1 leading-relaxed text-muted-foreground">Enter your actual travel date, origin and destination; then check any final connection to your accommodation.</p>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
      <a href="https://rail.co.il/?lan=en" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Israel Railways — official timetable<span className="sr-only"> (opens in a new tab)</span></a>
      <a href="https://route.bus.gov.il/?saveParams=true&tab=source-destination" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">National Public Transport Authority — route planner<span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </div>;
}

export function ShabbatTaxiFareLinks() {
  return <div className="mt-4 rounded-xl border bg-secondary/40 p-4 text-sm" aria-label="Taxi fare calculation sources">
    <p className="font-semibold text-foreground">Check the fare calculation</p>
    <p className="mt-1 leading-relaxed text-muted-foreground">These independent route calculations use the April 2026 regulated meter rates. They are estimates, not operator quotes.</p>
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
      <a href="https://taxitariff.co.il/ben-gurion-airport/tel-aviv-yafo" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Tel Aviv calculation<span className="sr-only"> (opens in a new tab)</span></a>
      <a href="https://taxitariff.co.il/ben-gurion-airport/jerusalem" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Jerusalem calculation<span className="sr-only"> (opens in a new tab)</span></a>
      <a href="https://taxitariff.co.il/ben-gurion-airport/haifa" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Haifa calculation<span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </div>;
}
