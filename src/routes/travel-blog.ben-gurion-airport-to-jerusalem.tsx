import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import roadImg from "@/assets/road-to-jerusalem.jpg";
import { SiteHeader, SiteFooter, ExtLink } from "@/components/Layout";
import {
  offers, routeFaqs, sources, getSource, formatCheckDate, INFO_CHECK_DATE, OWNER_BASE, tlvToJerusalem,
  type Offer, type OfferCategory,
} from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { pageMeta, CANONICAL_ORIGIN } from "@/lib/site";

const PATH = tlvToJerusalem.path;
const H1 = "Ben Gurion Airport to Jerusalem: taxis & private transfers";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-jerusalem")({
  head: () => {
    const m = pageMeta({
      title: "Ben Gurion Airport to Jerusalem: taxis & private transfers",
      description: "Compare pre-booked private transfers and the licensed airport taxi from Ben Gurion (TLV) to Jerusalem: where to find taxis, what prices mean and what to confirm.",
      path: PATH,
      type: "article",
    });
    return {
      ...m,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: CANONICAL_ORIGIN + "/" },
              { "@type": "ListItem", position: 2, name: "Transfers", item: CANONICAL_ORIGIN + PATH },
              { "@type": "ListItem", position: 3, name: "Ben Gurion Airport to Jerusalem", item: CANONICAL_ORIGIN + PATH },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: H1,
            dateModified: INFO_CHECK_DATE,
            publisher: { "@type": "Organization", name: "Israel Taxi & Travel" },
          }),
        },
      ],
    };
  },
  component: RoutePage,
});

const sections = [
  ["quick-answer", "Quick answer"],
  ["plan", "Plan your journey"],
  ["options", "Booking options"],
  ["pricing", "Pricing & inclusions"],
  ["arrival", "Arrival & pickup"],
  ["compare-tips", "Comparing like-for-like"],
  ["train", "Train & alternatives"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

type Mode = "all" | OfferCategory;

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function validate(date: string, time: string, pax: string, lug: string) {
  const errors: Partial<Record<"date" | "time" | "pax" | "lug", string>> = {};
  const p = Number(pax);
  const l = Number(lug);
  if (!Number.isInteger(p) || p < 1 || p > 16) errors.pax = "Enter between 1 and 16 passengers.";
  if (lug.trim() === "" || !Number.isInteger(l) || l < 0 || l > 40) errors.lug = "Enter a luggage count between 0 and 40.";
  if (time && !date) errors.date = "Add the arrival date for this time.";
  if (date) {
    const today = todayISO();
    if (date < today) errors.date = "This date is in the past. Choose today or a later date.";
    else if (date === today && time) {
      const [h, m] = time.split(":").map(Number);
      const now = new Date();
      if (h * 60 + m < now.getHours() * 60 + now.getMinutes()) errors.time = "This time has already passed today.";
    }
  }
  return errors;
}

function RoutePage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("2");
  const [lug, setLug] = useState("2");
  const [errors, setErrors] = useState<Partial<Record<"date" | "time" | "pax" | "lug", string>>>({});
  const [applied, setApplied] = useState<{ date: string; time: string; pax: number; lug: number } | null>(null);
  const [mode, setMode] = useState<Mode>("all");
  const [compare, setCompare] = useState<string[]>([]);
  const [minDate, setMinDate] = useState<string | undefined>();
  useEffect(() => setMinDate(todayISO()), []);

  const party = applied?.pax ?? null;
  const visible = useMemo(() => offers.filter((o) => mode === "all" || o.category === mode), [mode]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(date, time, pax, lug);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setApplied({ date, time, pax: Number(pax), lug: Number(lug) });
    setMode("prebooked");
    document.getElementById("options")?.scrollIntoView({ block: "start" });
  }

  function reset() {
    setMode("all");
    setApplied(null);
    setCompare([]);
    setErrors({});
  }

  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <>
      <SiteHeader />
      <main className="pb-24 lg:pb-0">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-1">
              <li><Link to="/" className="hover:text-primary">Home</Link> /</li>
              <li>Transfers /</li>
              <li aria-current="page" className="text-foreground">Ben Gurion Airport to Jerusalem</li>
            </ol>
          </nav>
        </div>

        <header className="mx-auto max-w-6xl px-4 pt-6">
          <p className="eyebrow">Airport transfer guide · TLV → Jerusalem</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-[1.1] md:text-5xl">{H1}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Source facts checked {formatCheckDate(INFO_CHECK_DATE)} · <Link to="/about/" className="underline">How we compare</Link></p>
          <img src={roadImg} alt="Road winding through the Judean hills towards Jerusalem at sunset" width={1600} height={912} className="mt-8 aspect-[21/9] w-full rounded-2xl object-cover" />
        </header>

        {/* Mobile section nav */}
        <nav aria-label="On this page" className="sticky top-[57px] z-30 mt-6 overflow-x-auto border-y bg-background/95 backdrop-blur lg:hidden">
          <ul className="flex gap-2 px-4 py-2 text-sm whitespace-nowrap">
            {sections.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="chip inline-block">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto mt-10 grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_17rem]">
          <article className="min-w-0">
            <section id="quick-answer" aria-labelledby="qa-h">
              <h2 id="qa-h" className="text-3xl">Quick answer</h2>
              <div className="prose-guide">
                <p>The drive from Ben Gurion Airport to Jerusalem is roughly 50–60 km by road, typically under an hour outside rush hour. You have two taxi-style choices: <strong>pre-book a private transfer</strong> with an agreed meeting point and quoted price, or <strong>take a licensed taxi on arrival</strong> from the official rank, which runs around the clock on a metered fare.</p>
                <p><strong>Pre-booking suits</strong> late-night arrivals, families needing child seats, groups of five or more, travelers with lots of luggage, and anyone heading to a hard-to-find address.</p>
                <p><strong>How to use this page:</strong> enter your passengers and luggage below, compare the options side by side, then confirm price and details on the provider's own site before paying.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#options" className="btn btn-primary">See booking options</a>
                <a href="#plan" className="btn btn-outline">Plan my journey</a>
              </div>
            </section>

            <section id="plan" aria-labelledby="plan-h" className="mt-16 rounded-2xl border bg-card p-6 md:p-8">
              <h2 id="plan-h" className="text-2xl">Plan your journey</h2>
              <form noValidate onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-sm font-medium">From</span>
                  <p className="field mt-1 bg-muted">Ben Gurion Airport (TLV)</p>
                </div>
                <div>
                  <span className="text-sm font-medium">To</span>
                  <p className="field mt-1 bg-muted">Jerusalem</p>
                </div>
                <Field id="date" label="Arrival date (optional)" error={errors.date}>
                  <input id="date" type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="field mt-1" aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-err" : undefined} />
                </Field>
                <Field id="time" label="Landing time (optional)" error={errors.time}>
                  <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="field mt-1" aria-invalid={!!errors.time} aria-describedby={errors.time ? "time-err" : undefined} />
                </Field>
                <Field id="pax" label="Passengers (1–16)" error={errors.pax}>
                  <input id="pax" type="number" inputMode="numeric" min={1} max={16} value={pax} onChange={(e) => setPax(e.target.value)} className="field mt-1" aria-invalid={!!errors.pax} aria-describedby={errors.pax ? "pax-err" : undefined} />
                </Field>
                <Field id="lug" label="Suitcases" error={errors.lug}>
                  <input id="lug" type="number" inputMode="numeric" min={0} max={40} value={lug} onChange={(e) => setLug(e.target.value)} className="field mt-1" aria-invalid={!!errors.lug} aria-describedby={errors.lug ? "lug-err" : undefined} />
                </Field>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn btn-primary">Compare booking options</button>
                  <p className="text-sm text-muted-foreground">These details stay on this page. Re-enter and reconfirm them on the provider's site.</p>
                </div>
              </form>
              {applied && (
                <div role="status" className="mt-5 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
                  <strong>Your journey:</strong> Ben Gurion Airport → Jerusalem · {applied.pax} passenger{applied.pax > 1 ? "s" : ""} · {applied.lug} suitcase{applied.lug === 1 ? "" : "s"}
                  {applied.date ? ` · ${formatCheckDate(applied.date)}` : " · date not set"}{applied.time ? ` at ${applied.time}` : ""}.
                  {" "}Showing pre-booked options. No offers have been requested or reserved.
                </div>
              )}
            </section>

            <section id="options" aria-labelledby="opt-h" className="mt-16">
              <h2 id="opt-h" className="text-3xl">Booking options</h2>
              <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by option type">
                {([["all", "All options"], ["prebooked", "Pre-booked"], ["on_arrival", "On-arrival taxi"]] as const).map(([m, l]) => (
                  <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className="chip">{l}</button>
                ))}
                <button type="button" onClick={reset} className="ml-auto text-sm font-medium text-primary underline underline-offset-4">Reset</button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">{visible.length} option{visible.length === 1 ? "" : "s"} shown{party ? ` for ${party} passenger${party > 1 ? "s" : ""}` : ""}.</p>
              <ul className="mt-5 space-y-4">
                {visible.map((o) => (
                  <OfferCard key={o.id} offer={o} party={party} compared={compare.includes(o.id)} onCompare={() => toggleCompare(o.id)} />
                ))}
              </ul>
              {visible.length === 0 && <p className="mt-4">No options match this filter. <button className="underline" onClick={reset}>Reset filters</button></p>}

              {compare.length > 0 && (
                <div id="compare-table" className="mt-8 overflow-x-auto rounded-2xl border bg-card">
                  <table className="w-full min-w-[36rem] text-left text-sm">
                    <caption className="p-4 text-left font-serif text-xl">Side-by-side ({compare.length})</caption>
                    <thead className="bg-muted"><tr><th className="p-3">Detail</th>{compare.map((id) => <th key={id} className="p-3">{offers.find((o) => o.id === id)!.label}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ["Type", (o: Offer) => o.typeLabel],
                        ["Price shown", (o: Offer) => priceText(o, party)],
                        ["Booking", (o: Offer) => (o.category === "prebooked" ? "Book ahead" : "No booking — rank on arrival")],
                        ["Capacity", (o: Offer) => capacityText(o, party)],
                        ["Confirm on offer", (o: Offer) => o.confirmOnOffer.join(", ")],
                      ].map(([label, fn]) => (
                        <tr key={label as string} className="border-t align-top">
                          <th scope="row" className="p-3 font-medium">{label as string}</th>
                          {compare.map((id) => <td key={id} className="p-3">{(fn as (o: Offer) => string)(offers.find((o) => o.id === id)!)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="p-4 pt-0 text-xs text-muted-foreground">Prices use different bases and are not ranked against each other.</p>
                </div>
              )}
            </section>

            <section id="pricing" className="mt-16 prose-guide">
              <h2 className="text-3xl">Pricing and what's included</h2>
              <p>There are three kinds of price you'll meet on this route, and they aren't directly comparable:</p>
              <ul>
                <li><strong>Published starting rate:</strong> an operator's advertised “from” price. Moshe Barak publishes from ILS 550 for up to four passengers on weekdays, with possible night, weekend and holiday surcharges and 24 hours' notice (<ExtLink href={getSource("moshe-airport-transfers").url}>source</ExtLink>). It is not a quote.</li>
                <li><strong>Live quote:</strong> the price a booking platform shows for your date and party. Only that quote, on their site, reflects current availability.</li>
                <li><strong>Metered fare:</strong> licensed airport taxis charge by meter (<ExtLink href={getSource("iaa-directions").url}>IAA</ExtLink>), so the amount is known at the end of the ride.</li>
              </ul>
              <p>Whatever you choose, confirm on the specific offer: the final total, a vehicle that fits your group and luggage, included waiting time, the meeting point, child seats, the cancellation policy and what happens if your flight changes.</p>
            </section>

            <section id="arrival" className="mt-16 prose-guide">
              <h2 className="text-3xl">Arrival and pickup guide</h2>
              <p>According to the Israel Airports Authority, licensed taxis wait at <strong>Terminal 3, ground floor, Exit 03</strong>, and at <strong>Terminal 1</strong> by the exit of the domestic arrivals hall. A free shuttle connects the terminals.</p>
              <p>If you pre-booked, follow the meeting point in <em>your own confirmation</em> — it can differ from the taxi rank.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Checklist title="Before you fly" items={["Save the provider's phone number offline", "Send your flight number if the provider asks for it", "Note your exact Jerusalem address, in English and Hebrew if possible", "Confirm child seats in writing"]} />
                <Checklist title="After landing" items={["Switch on data or airport Wi-Fi to message your driver", "Go to the meeting point in your confirmation", "For an on-arrival taxi, use the official rank only", "Agree payment method before setting off"]} />
              </div>
            </section>

            <section id="compare-tips" className="mt-16 prose-guide">
              <h2 className="text-3xl">How to compare like-for-like</h2>
              <ul>
                <li>Compare the same party size, luggage and time of day — surcharges often apply at night and on Shabbat/holidays.</li>
                <li>Check whether a price is per vehicle or per person, and whether tolls and waiting are included.</li>
                <li>Confirm the vehicle type: four passengers with four large cases may not fit a standard sedan.</li>
              </ul>
              <h3 className="mt-8 text-xl">Getting to a precise Jerusalem address</h3>
              <p>Old City gates, hotel side entrances and pedestrian streets can confuse drivers. Give the full street address and the nearest drivable point, and share a map pin with your driver. If staying inside the Old City walls, expect a short walk from the nearest gate.</p>
            </section>

            <section id="train" className="mt-16 prose-guide">
              <h2 className="text-3xl">Train and other alternatives</h2>
              <p>Israel Railways connects the airport with Jerusalem. It can be good value for light travelers, but you'll still need to reach your accommodation from the station, and services are limited on Shabbat and holidays. Check current timetables and fares on <ExtLink href="https://www.rail.co.il/">Israel Railways</ExtLink>. Our <ExtLink guide href={`${OWNER_BASE}/travel-blog/getting-around-israel/`}>getting around Israel</ExtLink> article covers buses and driving.</p>
            </section>

            <section id="faq" className="mt-16">
              <h2 className="text-3xl">Frequently asked questions</h2>
              <div className="mt-4 divide-y rounded-2xl border bg-card">
                {routeFaqs.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold flex justify-between gap-4">{f.q}<span aria-hidden className="text-primary transition-transform group-open:rotate-45">+</span></summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="sources" className="mt-16">
              <h2 className="text-3xl">Sources</h2>
              <p className="mt-2 text-sm text-muted-foreground">Facts marked “checked” were reviewed on {formatCheckDate(INFO_CHECK_DATE)}. This date refers to the source facts listed here only; it does not mean every provider's current availability or vehicles were verified.</p>
              <ul className="mt-4 space-y-3">
                {sources.map((s) => (
                  <li key={s.id} className="rounded-xl border bg-card p-4 text-sm">
                    <ExtLink href={s.url} className="font-semibold text-primary">{s.publisher}: {s.title}</ExtLink>
                    <p className="mt-1 text-muted-foreground">{s.note}</p>
                    <p className="mt-1 text-xs">{s.checkedAt ? `Checked ${formatCheckDate(s.checkedAt)}` : "Linked for reference"}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16">
              <h2 className="text-3xl">Plan the rest of your trip</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/where-to-stay-in-jerusalem/`} className="block rounded-xl border bg-card p-4 font-medium hover:border-primary">Where to stay in Jerusalem</ExtLink></li>
                <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/jerusalem-travel-guide/`} className="block rounded-xl border bg-card p-4 font-medium hover:border-primary">Jerusalem travel guide</ExtLink></li>
                <li><ExtLink guide href={`${OWNER_BASE}/travel-blog/jerusalem-to-bethlehem/`} className="block rounded-xl border bg-card p-4 font-medium hover:border-primary">Jerusalem to Bethlehem</ExtLink></li>
                <li><ExtLink guide href={`${OWNER_BASE}/private-day-trips/`} className="block rounded-xl border bg-card p-4 font-medium hover:border-primary">Private day trips</ExtLink></li>
              </ul>
            </section>

            <section className="mt-16 rounded-2xl bg-navy p-8 text-navy-foreground">
              <h2 className="text-3xl">Ready to book your ride?</h2>
              <p className="mt-2 opacity-85">Pick the option that suits your arrival, then confirm the price and details on the provider's site.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {offers.map((o) => <OutboundButton key={o.id} offer={o} light />)}
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <nav aria-label="Contents" className="rounded-2xl border bg-card p-5">
                <p className="eyebrow">Contents</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {sections.map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-primary">{label}</a></li>)}
                </ul>
              </nav>
              <div className="rounded-2xl bg-accent p-5 text-sm text-accent-foreground">
                <p className="font-semibold">Your plan</p>
                <p className="mt-1">{applied ? `${applied.pax} passengers · ${applied.lug} cases` : "Not set yet"}</p>
                <p className="mt-1">Comparing: {compare.length}</p>
                <a href={compare.length ? "#compare-table" : "#options"} className="btn btn-primary mt-4 w-full">Compare options</a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile compact sticky action */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        <a href={compare.length ? "#compare-table" : "#options"} className="btn btn-primary w-full py-2.5">
          Compare options{compare.length ? ` (${compare.length})` : ""}
        </a>
      </div>
      <SiteFooter />
    </>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-serif text-lg">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm" style={{ listStyle: "none", paddingLeft: 0 }}>
        {items.map((i) => <li key={i}>✓ {i}</li>)}
      </ul>
    </div>
  );
}

function priceText(o: Offer, party: number | null) {
  if (o.price && party && party > o.price.maxPartySize) return "Request group quote";
  return o.priceLabel;
}

function capacityText(o: Offer, party: number | null) {
  if (o.maxPassengersKnown == null) return "Confirm with provider";
  if (party && party > o.maxPassengersKnown) return `Starting rate covers up to ${o.maxPassengersKnown}; larger groups by quote`;
  return `Starting rate covers up to ${o.maxPassengersKnown} passengers`;
}

function OutboundButton({ offer, light }: { offer: Offer; light?: boolean }) {
  return (
    <a
      href={offer.url}
      target="_blank"
      rel={relFor(offer.isAffiliate)}
      onClick={() => recordOutboundClick({ pageId: tlvToJerusalem.id, productId: offer.productId, offerId: offer.id })}
      className={`btn ${light ? "btn-light" : offer.isInformational ? "btn-outline" : "btn-primary"}`}
    >
      {light ? `${offer.label}: ${offer.ctaLabel}` : offer.ctaLabel} <span aria-hidden>↗</span>
      <span className="sr-only"> on {offer.label} (opens in a new tab)</span>
    </a>
  );
}

function OfferCard({ offer: o, party, compared, onCompare }: { offer: Offer; party: number | null; compared: boolean; onCompare: () => void }) {
  const src = o.price ? getSource(o.price.sourceId) : null;
  const price = priceText(o, party);
  return (
    <li className="rounded-2xl border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{o.typeLabel}</p>
          <h3 className="mt-1 text-2xl">{o.label}</h3>
          {o.operatorId === "moshe-barak" && <p className="mt-1 text-sm font-medium text-warning">Disclosure: operated by the publisher's local transport business.</p>}
          {o.isAffiliate && <p className="mt-1 text-xs font-semibold">Sponsored link</p>}
          <p className="mt-2 text-muted-foreground">{o.summary}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl" data-testid={`price-${o.id}`}>{price}</p>
          {o.price && price !== "Request group quote" && (
            <p className="max-w-[16rem] text-xs text-muted-foreground">Published weekday starting fare, up to {o.price.maxPartySize} passengers. Not a live quote. {src && <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">Source</a>}</p>
          )}
          {o.price && price === "Request group quote" && <p className="max-w-[16rem] text-xs text-muted-foreground">Published starting fare applies to up to {o.price.maxPartySize} passengers.</p>}
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div><dt className="inline font-medium">Capacity: </dt><dd className="inline">{capacityText(o, party)}</dd></div>
        <div><dt className="inline font-medium">Confirm: </dt><dd className="inline">{o.confirmOnOffer.slice(0, 3).join(", ")}</dd></div>
      </dl>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <OutboundButton offer={o} />
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={compared} onChange={onCompare} className="h-4 w-4 accent-primary" />
          Add to comparison
        </label>
      </div>
    </li>
  );
}
