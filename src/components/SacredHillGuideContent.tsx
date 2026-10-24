import { Link, type LinkProps } from "@tanstack/react-router";
import { FaqList, OnThisPage, Section } from "@/components/Guide";
import { AuthorCard } from "@/components/AuthorCard";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { MountOlivesRelatedGuides } from "@/components/MountOlivesRelatedGuides";
import { MountZionRelatedGuides } from "@/components/MountZionRelatedGuides";
import { SacredHillDayPlanning, SacredHillSiteHours, SacredHillWalkingMaps } from "@/components/SacredHillPlanningSections";
import { SacredHillContactForm } from "@/components/SacredHillContactForm";
import { sacredHillEditorial, sacredHillOverrides, type SacredHillId } from "@/data/sacredHillGuides";

/**
 * Shared destination-guide sequence:
 * 1. Intro & quick facts (in AttractionGuidePage and here)
 * 2. Highlights  3. Routes  4. Hours & fees  5. Transport
 * 6. Practical tips  7. Significance  8. FAQ
 * 9. Contact / relevant booking options  10. Further reading.
 *
 * The order is consistent; the itinerary and visitor copy stay specific to each hill.
 */
export function SacredHillGuideContent({ id }: { id: SacredHillId }) {
  const guide = sacredHillEditorial[id];
  const place = sacredHillOverrides[id];
  const mount = id === "mount-zion" ? "Mount Zion" : "the Mount of Olives";
  const nav = [
    ["places-to-see", "What to see"],
    ["walking-route", "Walking routes"],
    ["visit-facts", "Hours & fees"],
    ["getting-there", "Getting there"],
    ["visitor-advice", "Visitor tips"],
    ["faq", "Questions"],
    ["visit-options", "Contact Moshe"],
  ] as const;

  return <>
    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Visit essentials">
      {guide.snapshot.map(fact => <div key={fact.label} className="rounded-xl border bg-card px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{fact.label}</p>
        <p className="mt-1 text-sm font-medium leading-relaxed">{fact.value}</p>
      </div>)}
    </div>
    <AuthorCard />
    <OnThisPage sections={nav} />

    <Section id="places-to-see" title={id === "mount-zion" ? "What to See on Mount Zion" : "What to See on the Mount of Olives"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.stopIntro}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {guide.stops.map((stop, index) => <article key={stop.name} className="min-w-0 rounded-xl border bg-card p-4 sm:p-5">
          <header className="flex min-w-0 items-center gap-3">
            {stop.image && <figure className="w-20 shrink-0 sm:w-24">
              <img src={stop.image.src} alt={stop.image.alt} loading="lazy" decoding="async" width={96} height={84} className="h-20 w-full rounded-lg bg-secondary object-contain sm:h-[84px]" />
              {stop.image.credit && <figcaption className="mt-1 text-[10px] leading-tight text-muted-foreground">
                <a href={stop.image.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Photo: {stop.image.credit.label}</a>
                {" · "}<a href={stop.image.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License</a>
              </figcaption>}
            </figure>}
            <div className="min-w-0 flex-1">
              <span aria-hidden="true" className="text-xs font-semibold tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-0.5 text-lg font-semibold leading-snug sm:text-xl">{stop.name}</h3>
            </div>
          </header>
          <div className="mt-4">
            <p className="leading-relaxed">{stop.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">{stop.tipLabel || "My tip"}:</strong> {stop.visit}</p>
            {stop.link && <a href={stop.link.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{stop.link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
          </div>
        </article>)}
      </div>
    </Section>

    <Section id="walking-route" title="Suggested Walking Routes">
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.routeIntro}</p>
      <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
        {guide.routes.map(route => <article key={route.name} className="rounded-2xl border bg-card p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{route.time}</p>
          <h3 className="mt-2 text-xl font-semibold">{route.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground"><strong>Best for:</strong> {route.bestFor}</p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed marker:font-bold marker:text-primary">
            {route.steps.map(step => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-5 border-t pt-4 text-sm leading-relaxed text-muted-foreground">{route.note}</p>
        </article>)}
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {id === "mount-zion" ? <>
          <strong>Combining it with the Old City:</strong> you can finish an Old City walk through Zion Gate or arrive at Mount Zion first and continue through the Armenian and Jewish Quarters. See my <Link to="/travel-blog/old-city-jerusalem/" className="text-primary underline underline-offset-4">Old City walking guide</Link> for the next part of your day.
        </> : <>
          <strong>Combining it with the Old City:</strong> start at the lookout and finish near Lion's Gate, or see the Old City first and visit the viewpoint by vehicle as your final stop. My <Link to="/travel-blog/old-city-jerusalem/" className="text-primary underline underline-offset-4">Old City guide</Link> helps connect the routes.
        </>}
      </p>
    </Section>

    <SacredHillSiteHours id={id} />
    <SacredHillDayPlanning id={id} />

    <Section id="getting-there" title={id === "mount-zion" ? "How to Get to Mount Zion" : "How to Get to the Mount of Olives"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.transportIntro}</p>
      <div className="mt-5 space-y-5">
        {guide.transport.map(mode => <div key={mode.title} className="border-l-2 border-primary/40 pl-4">
          <h3 className="text-lg font-semibold">{mode.title}</h3>
          <p className="mt-1 leading-relaxed">{mode.text}</p>
          {mode.links && <p className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">{mode.links.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{item.label} <span aria-hidden="true">↗</span></a>)}</p>}
        </div>)}
      </div>
      <SacredHillWalkingMaps id={id} />
    </Section>

    <Section id="visitor-advice" title="Practical Tips for Visiting">
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {guide.practical.map(note => <article key={note.title} className="rounded-xl bg-secondary/40 p-5">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p className="mt-2 leading-relaxed">{note.text}</p>
        </article>)}
      </div>
    </Section>

    <Section id="history" title={guide.historyTitle}>
      {guide.history.map(paragraph => <p key={paragraph} className="mt-3 max-w-3xl leading-relaxed">{paragraph}</p>)}
      <p className="mt-4 max-w-3xl leading-relaxed">For other churches and pilgrimage places in the area, see my <Link to="/travel-blog/churches-in-jerusalem/" className="text-primary underline underline-offset-4">Jerusalem churches guide</Link>.</p>
    </Section>

    <FaqList faqs={place.faqs || []} />

    <section id="visit-options" aria-labelledby="visit-options-h" className="mt-14 border-t pt-8">
      <h2 id="visit-options-h" className="text-3xl">Plan Your Jerusalem Visit with Moshe</h2>
      <p className="mt-3 max-w-3xl leading-relaxed">
        {id === "mount-zion"
          ? "Mount Zion fits easily into a day around Jerusalem's Old City. I can arrange a convenient hotel pickup and transport to the hill, or help organise collection after your walk."
          : "A visit to the Mount of Olives can begin with its panoramic viewpoint and finish near Gethsemane, or round off a day in the Old City. I can help arrange transport between your chosen stops."}
        {" "}Tell me what you would like to see and when you are visiting, and I'll respond personally.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link to="/private-driver/" className="btn btn-outline">Private transport options</Link>
        <Link to="/tours/jerusalem/" className="btn btn-outline">Jerusalem tours</Link>
      </div>
      <SacredHillContactForm id={id} />
      <JerusalemPartnerOffers id={id} />
    </section>

    {id === "mount-of-olives" ? <MountOlivesRelatedGuides /> : <MountZionRelatedGuides />}
  </>;
}
