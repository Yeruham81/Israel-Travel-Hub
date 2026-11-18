import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Lightbulb, MapPin } from "lucide-react";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { StayTripLinks } from "@/components/StayTripLinks";
import { HomeContactForm } from "@/components/HomeContactForm";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { neighborhoodGuidesForCity, type CityStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE } from "@/data/registry";
import { guideContactCopy } from "@/lib/guide-contact";
import jerusalemHero from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";
import telAvivHero from "@/assets/home/hero-refresh-tel-aviv-coastline-v2-medium.webp";

/**
 * A travel-blog neighbourhood-choice article, deliberately separate from the
 * hotel catalogues under /accommodation/. Hotel recommendations and booking
 * buttons belong to those catalogue pages, not this editorial guide.
 */
const sections = [
  ["choose", "Choose your area"], ["compare", "At a glance"],
  ["neighborhoods", "Neighbourhoods"], ["tips", "Booking tips"],
  ["faq", "FAQ"], ["explore", "Related guides"],
  ["trip-planning", "Trip planning"], ["contact", "Contact me"],
] as const;

const decisionNotes = {
  jerusalem: {
    introduction: "For a first visit, I usually recommend comparing Downtown and Mamilla first. Downtown has the broadest mix of restaurants and transport, while Mamilla is particularly useful for Jaffa Gate. The right choice changes if your focus is pilgrimage, market food or a quieter residential stay.",
    callout: "Jerusalem is hilly. A hotel that looks close to the Old City on a map may still involve steps, an uphill return or a long walk from the nearest taxi drop-off.",
    check: "If you plan to arrive on Friday evening or Saturday, check your hotel's reception and meals, as well as transport. Services vary by area.",
    faqs: [
      { q: "Where is the most convenient base for a first visit to Jerusalem?", a: "Downtown around Jaffa Road is a practical starting point for restaurants, the light rail and walks towards the Old City. If Jaffa Gate is your priority, compare Mamilla and nearby King David Street." },
      { q: "Should I stay inside Jerusalem's Old City?", a: "It can be a memorable choice if you are visiting religious and historic sites early or late in the day. Check the specific gate, steps and luggage access first; a hotel just outside the walls can be simpler." },
      { q: "Which Jerusalem areas suit families or longer stays?", a: "The German Colony and Baka offer more of a residential atmosphere. Downtown can be more convenient without a car, depending on where you will spend your days." },
      { q: "What changes over Shabbat?", a: "Regular public transport and many businesses in West Jerusalem pause from Friday afternoon to Saturday evening. East Jerusalem and parts of the Old City have different business patterns. Confirm your arrival, meals and check-in arrangements." },
    ],
  },
  telaviv: {
    introduction: "I would start with the central beaches or Dizengoff Square if this is your first Tel Aviv visit. From there, choose between easy access to the sea, cafés and shopping, or a different neighbourhood experience in Jaffa, Neve Tzedek, Rothschild, Florentin and the north.",
    callout: "A Tel Aviv neighbourhood name can cover quite different streets. Before booking, compare the actual walk from the hotel door to the beach, restaurants or sights you plan to visit most.",
    check: "If you arrive on Friday evening or Saturday, check the current airport-to-hotel connection. Trains and regular bus routes may have limited or no service.",
    faqs: [
      { q: "Where should I stay in Tel Aviv on my first visit?", a: "The central beachfront around Gordon, Frishman and Bograshov beaches works well for sea-focused visits. The streets around Dizengoff Square balance city life and beach access." },
      { q: "Where is a quieter area for a family stay?", a: "Residential parts of the Old North have parks and northern beaches nearby. The Tel Aviv Port itself is busier, so pay attention to the exact street and room location." },
      { q: "Is Jaffa a good base for exploring Tel Aviv?", a: "Yes, especially if you enjoy history, galleries, food and the old port. Central beaches and Dizengoff are farther north, so consider the transport or walking you will need." },
      { q: "Do I need a rental car if I stay centrally?", a: "Usually not for exploring Tel Aviv. Many central sights are walkable, and buses, the Red Line and taxis cover longer journeys. Parking can be difficult and expensive." },
    ],
  },
} as const;

function AreaComparison({ areaId }: { areaId: string }) {
  const note = areaDecisionNotes[areaId];
  if (!note) return null;
  return <aside className="mt-5 grid gap-3 rounded-xl border bg-secondary/25 p-4 text-sm leading-relaxed sm:grid-cols-2 sm:p-5">
    <div>
      <h4 className="font-semibold">{note.heading}</h4>
      <p className="mt-2 text-muted-foreground">{note.compare}</p>
    </div>
    <div>
      <h4 className="font-semibold">Before arriving</h4>
      <p className="mt-2 text-muted-foreground">{note.arrival}</p>
    </div>
  </aside>;
}

export function CityNeighborhoodEditorial({ guide }: { guide: CityStayGuide }) {
  if (guide.id !== "jerusalem" && guide.id !== "telaviv") return null;
  const cityId = guide.id;
  const cityName = cityId === "jerusalem" ? "Jerusalem" : "Tel Aviv";
  const info = accommodationEditorial[cityId];
  const choices = decisionNotes[cityId];
  const areas = neighborhoodGuidesForCity(cityId);
  const hero = cityId === "jerusalem"
    ? { src: jerusalemHero, alt: "Jerusalem's Jaffa Gate and the Old City walls" }
    : { src: telAvivHero, alt: "Central Tel Aviv beachfront and the Mediterranean coast" };

  return <main className="pb-10" data-testid="city-neighborhood-editorial">
    <GuideHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: info.title, to: info.path as LinkProps["to"] }]}
      eyebrow={`Travel guide · ${cityName}`}
      title={info.title}
      intro={info.intro}
      checkedAt={guide.reviewedAt || INFO_CHECK_DATE}
      image={hero}
    />
    <OnThisPage sections={sections} />
    <article className="mx-auto max-w-5xl px-4">
      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-32">
        <p className="eyebrow">Choose your base</p>
        <h2 id="choose-h" className="mt-2 text-3xl">Where should you stay in {cityName}?</h2>
        <p className="mt-4 max-w-4xl leading-relaxed">{choices.introduction}</p>
        <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">
          I suggest choosing the area before you start comparing individual hotels. Think about the places you want to visit on foot, where you would like to spend your evenings and how easily you can reach the accommodation with luggage.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {(guide.quickPicks || []).map((pick) => {
            const area = areas.find((candidate) => candidate.id === pick.areaId);
            return <li key={pick.areaId} className="rounded-xl border bg-secondary/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{pick.label}</p>
              <h3 className="mt-2 text-lg font-semibold">{area?.shortName || pick.areaId}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick.description}</p>
              <a href={`#area-${pick.areaId}`} className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary hover:underline">Read about this area <ArrowRight className="h-4 w-4" aria-hidden /></a>
            </li>;
          })}
        </ul>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>{choices.callout}</p>
        </aside>
      </section>

      <section id="compare" aria-labelledby="compare-h" className="mt-14 scroll-mt-32">
        <h2 id="compare-h" className="text-3xl">Compare the main areas at a glance</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Use these short summaries to narrow your options. Each links to a fuller neighbourhood explanation below, followed by a separate page for hotel choices.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => <li key={area.id}>
            <a href={`#area-${area.id}`} className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="font-semibold group-hover:text-primary">{area.shortName}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{area.bestFor}</span>
              <span className="mt-3 text-xs font-semibold text-primary">Explore this neighbourhood →</span>
            </a>
          </li>)}
        </ul>
      </section>

      <section id="neighborhoods" aria-labelledby="neighborhoods-h" className="mt-14 scroll-mt-32">
        <h2 id="neighborhoods-h" className="text-3xl">The neighbourhoods, area by area</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          These are my practical notes about the atmosphere, sightseeing access and trade-offs in each part of the city. Hotel selections are kept separately under Accommodation.
        </p>
        <div className="mt-5 divide-y border-t">
          {areas.map((area) => <section key={area.id} id={`area-${area.id}`} aria-labelledby={`area-${area.id}-h`} className="scroll-mt-32 py-9 sm:py-11" data-testid="editorial-neighborhood">
            <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(230px,1fr)] md:gap-7">
              <div className="min-w-0">
                <h3 id={`area-${area.id}-h`} className="text-2xl font-semibold sm:text-3xl">{area.name}</h3>
                {area.overview.map((paragraph, index) => <p key={index} className="mt-3 leading-relaxed">{paragraph}</p>)}
                <p className="mt-4 text-sm leading-relaxed"><strong>Best for:</strong> {area.bestFor}</p>
                <p className="mt-2 text-sm leading-relaxed"><strong>Nearby highlights:</strong> {area.highlights.slice(0, 3).map((place) => place.name).join(" · ")}</p>
              </div>
              <figure className="min-w-0 overflow-hidden rounded-xl border bg-secondary/20">
                <img src={area.photo.src} alt={area.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                <figcaption className="px-3 py-2 text-xs text-muted-foreground">{area.shortName} · neighbourhood view</figcaption>
              </figure>
            </div>
            <AreaComparison areaId={area.id} />
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to={area.path as LinkProps["to"]} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/25 bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Browse hotels in {area.shortName} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={`https://www.google.com/maps/search/?api=1&query=${area.map.lat}%2C${area.map.lon}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2">
                <MapPin className="h-4 w-4" aria-hidden /> Find the area on Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </section>)}
        </div>
      </section>

      <section id="tips" aria-labelledby="tips-h" className="mt-12 scroll-mt-32">
        <h2 id="tips-h" className="text-3xl">What to check before booking</h2>
        <p className="mt-3 max-w-3xl leading-relaxed">Choosing the right neighbourhood is only half of the decision. Here are the details I recommend checking before paying for a room.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {guide.checklist.map((tip) => <li key={tip} className="flex gap-3 rounded-xl border bg-secondary/25 p-4 text-sm leading-relaxed"><span aria-hidden className="font-bold text-primary">✓</span>{tip}</li>)}
        </ul>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>{choices.check} See my <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Israel calendar of events</Link> for public holidays and special dates that can affect your plans.</p>
        </aside>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Accommodation and reservations are provided by independent hotels and external booking websites. Check the exact property address, room type, total price and cancellation terms with the provider before booking.
        </p>
      </section>

      <FaqList faqs={[...decisionNotes[cityId].faqs]} />
      <StayTripLinks region={cityId} currentPath={info.path} />
      <HomeContactForm guide={guideContactCopy(info.title, "accommodation", cityName)} />
      <SourceList ids={guide.sourceIds} />
    </article>
  </main>;
}
