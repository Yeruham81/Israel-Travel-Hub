import { Link, type LinkProps } from "@tanstack/react-router";
import { FaqList, OnThisPage, Section } from "@/components/Guide";
import { JerusalemClusterLinks } from "@/components/JerusalemClusterLinks";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { sacredHillEditorial, sacredHillOverrides, type SacredHillId } from "@/data/sacredHillGuides";

/**
 * Practical place-focused layout for the two Jerusalem hills.
 * It deliberately replaces the generic attraction highlight cards, which
 * obscured route order, site-by-site access rules and the distinct terrain.
 */
export function SacredHillGuideContent({ id }: { id: SacredHillId }) {
  const guide = sacredHillEditorial[id];
  const place = sacredHillOverrides[id];
  const nav = [
    ["walking-route", "Walking routes"],
    ["places-to-see", "Sites to visit"],
    ["getting-there", "Getting there"],
    ["visitor-advice", "Practical advice"],
    ["history", "History & faith"],
    ["visit-options", "Tours & transport"],
  ] as const;

  return <>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Visit essentials">
      {guide.snapshot.map(fact => <div key={fact.label} className="rounded-xl border bg-card px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{fact.label}</p>
        <p className="mt-1 text-sm font-medium leading-relaxed">{fact.value}</p>
      </div>)}
    </div>
    <OnThisPage sections={nav} />
    <Section id="walking-route" title={id === "mount-zion" ? "A walking route around Mount Zion" : "The best way to walk down the Mount of Olives"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.routeIntro}</p>
      <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
        {guide.routes.map(route => <article key={route.name} className="h-full rounded-2xl border bg-card p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{route.time}</p>
          <h3 className="mt-2 text-xl font-semibold">{route.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground"><strong>Best for:</strong> {route.bestFor}</p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed marker:font-bold marker:text-primary">
            {route.steps.map(step => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-5 border-t pt-4 text-sm leading-relaxed text-muted-foreground">{route.note}</p>
        </article>)}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Visiting the Old City too? Read my <Link to="/travel-blog/old-city-jerusalem/" className="text-primary underline underline-offset-4">Old City walking guide</Link> for gates and onward routes. If you want to visit the other hill as well, use my <Link to={id === "mount-zion" ? "/travel-blog/mount-of-olives/" : "/travel-blog/mount-zion/"} className="text-primary underline underline-offset-4">{id === "mount-zion" ? "Mount of Olives guide" : "Mount Zion guide"}</Link> to plan the separate stop.
      </p>
    </Section>

    <Section id="places-to-see" title={id === "mount-zion" ? "What to see on Mount Zion" : "Viewpoint, churches and other sites"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.stopIntro}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {guide.stops.map((stop, index) => <article key={stop.name} className="rounded-xl border bg-card p-5">
          <div className="flex items-baseline gap-3">
            <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold leading-snug">{stop.name}</h3>
          </div>
          <p className="mt-3 leading-relaxed">{stop.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Visiting:</strong> {stop.visit}</p>
          {stop.link && <a href={stop.link.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{stop.link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
        </article>)}
      </div>
    </Section>

    <Section id="getting-there" title={id === "mount-zion" ? "How to get to Mount Zion" : "How to reach the Mount of Olives viewpoint"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.transportIntro}</p>
      <div className="mt-5 space-y-4">
        {guide.transport.map(mode => <div key={mode.title} className="border-l-2 border-primary/40 pl-4">
          <h3 className="text-lg font-semibold">{mode.title}</h3>
          <p className="mt-1 leading-relaxed">{mode.text}</p>
        </div>)}
      </div>
      <p className="mt-5 leading-relaxed">If you are arriving from Ben Gurion Airport, the <Link to="/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" className="text-primary underline underline-offset-4">airport-to-Jerusalem guide</Link> compares trains, buses and direct transport. It is a separate journey from getting around the city's historic sites.</p>
    </Section>

    <Section id="visitor-advice" title="Practical advice before you go">
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {guide.practical.map(note => <article key={note.title} className="rounded-xl bg-secondary/40 p-5">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p className="mt-2 leading-relaxed">{note.text}</p>
        </article>)}
      </div>
      <p className="mt-5 leading-relaxed">{guide.hotelNote} My <Link to={guide.relatedHotel.to as LinkProps["to"]} className="text-primary underline underline-offset-4">{guide.relatedHotel.text}</Link> compares the main neighbourhoods and accommodation locations.</p>
      <p className="mt-4 leading-relaxed">For a longer Christian pilgrimage itinerary, the <Link to="/travel-blog/churches-in-jerusalem/" className="text-primary underline underline-offset-4">Jerusalem churches guide</Link> places these sites alongside the Old City, Ein Karem and other church visits without repeating the entire route.</p>
    </Section>

    <Section id="history" title={guide.historyTitle}>
      {guide.history.map(paragraph => <p key={paragraph} className="mt-3 max-w-3xl leading-relaxed">{paragraph}</p>)}
    </Section>

    <Section id="official" title="Check opening hours before visiting">
      <p className="mt-3 max-w-3xl leading-relaxed">The Christian Information Center's published holy-site list was updated on 15 September 2026. It is useful for individual churches and visiting rules, but religious services, holidays, security restrictions and exceptional closures may change access without notice. Check the latest notice for each site; do not rely on old admission prices or a single timetable for the whole hill.</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {place.official?.map(source => <li key={source.url}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border bg-card p-4 font-semibold leading-snug text-primary underline underline-offset-4 hover:border-primary">{source.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        </li>)}
      </ul>
    </Section>

    <section id="visit-options" aria-labelledby="visit-options-h" className="mt-14 border-t pt-8">
      <h2 id="visit-options-h" className="text-3xl">Visit independently or arrange a tour</h2>
      <p className="mt-3 max-w-3xl leading-relaxed">You do not need to book a tour just to see the public parts of the hill. If you would rather not organise the journey between stops, I can help arrange private transport and a route that fits your time. My driver service is transport, not a promise of a licensed guide or of entry to religious buildings. For interpretation and guided walks, check the individual tour operator's itinerary and inclusions.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/private-driver/" className="btn btn-primary">Request private transport</Link>
        <Link to="/tours/jerusalem/" className="btn btn-outline">Explore Jerusalem tours</Link>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">For a journey starting from Ashdod port, the <Link to="/ashdod-shore-excursions/" className="text-primary underline underline-offset-4">Ashdod shore excursions</Link> page explains how a Jerusalem visit can fit around your ship's return time.</p>
    </section>
    <JerusalemPartnerOffers id={id} />
    <JerusalemClusterLinks pageKey={id} />
    <FaqList faqs={place.faqs || []} />
  </>;
}
