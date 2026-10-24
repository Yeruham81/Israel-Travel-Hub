import { Link, type LinkProps } from "@tanstack/react-router";
import { FaqList, OnThisPage, Section } from "@/components/Guide";
import { JerusalemPartnerOffers } from "@/components/JerusalemPartnerOffers";
import { MountOlivesRelatedGuides } from "@/components/MountOlivesRelatedGuides";
import { MountZionRelatedGuides } from "@/components/MountZionRelatedGuides";
import { SacredHillDayPlanning, SacredHillSiteHours, SacredHillWalkingMaps } from "@/components/SacredHillPlanningSections";
import { SacredHillContactForm } from "@/components/SacredHillContactForm";
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
    ["visit-facts", "Hours & entry"],
    ["getting-there", "Getting there"],
    ["visitor-advice", "Practical advice"],
    ["history", "History & faith"],
    ["faq", "Questions"],
    ["visit-options", "Tours & transport"],
    ["contact-moshe", "Message Moshe"],
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
      <SacredHillDayPlanning id={id} />

    </Section>

    <Section id="places-to-see" title={id === "mount-zion" ? "What to see on Mount Zion" : "Viewpoint, churches and other sites"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.stopIntro}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {guide.stops.map((stop, index) => <article key={stop.name} className="min-w-0 rounded-xl border bg-card p-4 sm:p-5">
          <header className="flex min-w-0 items-center gap-3">
            {stop.image && <figure className="w-20 shrink-0 sm:w-24">
              <img src={stop.image.src} alt={stop.image.alt} loading="lazy" decoding="async" width={96} height={84} className="h-20 w-full rounded-lg bg-secondary object-contain sm:h-[84px]" />
              {stop.image.credit && <figcaption className="mt-1 text-[10px] leading-tight text-muted-foreground">
                <a href={stop.image.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" title={stop.image.credit.label + " (opens in new tab)"}>Photo: {stop.image.credit.label}</a>
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">{stop.tipLabel || "Visitor tip"}:</strong> {stop.visit}</p>
            {stop.link && <a href={stop.link.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{stop.link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
          </div>
        </article>)}
      </div>
    </Section>
    <SacredHillSiteHours id={id} />

    <Section id="getting-there" title={id === "mount-zion" ? "How to get to Mount Zion" : "How to reach the Mount of Olives viewpoint"}>
      <p className="mt-3 max-w-3xl leading-relaxed">{guide.transportIntro}</p>
      <div className="mt-5 space-y-4">
        {guide.transport.map(mode => <div key={mode.title} className="border-l-2 border-primary/40 pl-4">
          <h3 className="text-lg font-semibold">{mode.title}</h3>
          <p className="mt-1 leading-relaxed">{mode.text}</p>
          {mode.links && <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">{mode.links.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{item.label} <span aria-hidden="true">↗</span></a>)}</p>}
        </div>)}
      </div>
      <SacredHillWalkingMaps id={id} />
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



    <FaqList faqs={place.faqs || []} />

    <section id="visit-options" aria-labelledby="visit-options-h" className="mt-14 border-t pt-8">
      <h2 id="visit-options-h" className="text-3xl">{id === "mount-of-olives" ? "Include the Mount of Olives in your Jerusalem visit" : "Include Mount Zion in your Jerusalem visit"}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed">{id === "mount-of-olives" ? "A panoramic stop on the Mount of Olives can be a memorable beginning or ending to your day in Jerusalem. I can arrange private transport from your hotel to the lookout, with time for the churches that interest you and an agreed pickup near Gethsemane or the Old City. Tell me what you would like to see and how much time you have, and I will help you plan a practical route. You can also explore guided tours for a visit with a local guide." : "If you would like to include Mount Zion in a wider day around Jerusalem, I can arrange private transport from your hotel or another pickup point, with time to explore the sites that matter to you. The central area is lovely to see on foot, and I can help arrange a convenient pickup afterwards. Tell me your preferred stops and how much time you have; for a guided explanation of the biblical traditions and history, you can also browse Jerusalem sightseeing tours."}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/private-driver/" className="btn btn-primary">Request private transport</Link>
        <Link to="/tours/jerusalem/" className="btn btn-outline">Explore Jerusalem tours</Link>
      </div>
    </section>
    <SacredHillContactForm id={id} />
    <JerusalemPartnerOffers id={id} />
    {id === "mount-of-olives" ? <MountOlivesRelatedGuides /> : <MountZionRelatedGuides />}

  </>;
}
