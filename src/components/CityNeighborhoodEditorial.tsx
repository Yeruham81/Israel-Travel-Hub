import { Link, type LinkProps } from "@tanstack/react-router";
import { Accessibility, ArrowRight, Eye, Footprints, House, Lightbulb, MapPin, Route, TrainFront, Volume2, type LucideIcon } from "lucide-react";
import { GuideHeader, OnThisPage, FaqList, SourceList } from "@/components/Guide";
import { StayTripLinks } from "@/components/StayTripLinks";
import { AreaMap } from "@/components/AreaMap";
import { JerusalemEditorialHotels } from "@/components/JerusalemEditorialHotels";
import { CityHotelPhotoCredits } from "@/components/CityHotelPhotoCredits";
import { HomeContactForm } from "@/components/HomeContactForm";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { neighborhoodGuidesForCity, type CityStayGuide } from "@/data/content";
import { areaDecisionNotes } from "@/data/localEditorialInsights";
import { INFO_CHECK_DATE } from "@/data/registry";
import { guideContactCopy } from "@/lib/guide-contact";
import jerusalemHero from "@/assets/guides/2026-11/where-to-stay-jerusalem-drive.webp";
import telAvivHero from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";
import oldCityStoneLane from "@/assets/guides/2026-11/jerusalem-jewish-quarter-stone-lane.webp";

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

const jerusalemSections = sections.filter(([id]) => id !== "compare");

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

/** Short decisions and transport advice that add to, rather than repeat, the area overview. */
const jerusalemPractical: Record<string, { consider: string; gettingAround: string }> = {
  downtown: {
    consider: "Busy pedestrian streets suit visitors who enjoy cafés and city life. For quieter evenings, compare a courtyard-facing room or the German Colony.",
    gettingAround: "From the eastern end of Downtown, Jaffa Gate is roughly 10–15 minutes on foot; hotels farther west take longer. Jaffa Road has light-rail stops for the market and station area. Confirm the nearest vehicle-accessible drop-off.",
  },
  mamilla: {
    consider: "Room rates are often higher than Downtown, and an Old City view is only guaranteed when the chosen room category explicitly includes it.",
    gettingAround: "Jaffa Gate is often roughly 5–15 minutes on foot from hotels in this district. King David Street extends south, adding walking time. Ask your driver to use the hotel entrance rather than the pedestrian avenue.",
  },
  "old-city": {
    consider: "Historic guesthouses vary greatly in facilities and accessibility. A lift inside the building does not make the cobbled approach from the gate step-free.",
    gettingAround: "Choose the arrival gate with your hotel: Jaffa Gate suits many western approaches, Damascus Gate the northern lanes, while Zion or Dung gates may suit some Jewish Quarter addresses. Confirm the permitted drop-off and remaining walk with luggage.",
  },
  "mahane-yehuda": {
    consider: "Market-facing rooms can hear deliveries and evening bars. Apartments can be convenient for longer stays, but check the kitchen and check-in arrangements in the exact unit.",
    gettingAround: "Jaffa Gate is roughly 20–30 minutes on foot from much of this area. Alternatively, take the light rail toward City Hall when it is operating, then walk. Parking and pickup beside the market can be awkward.",
  },
  "east-jerusalem": {
    consider: "Hotels close to Damascus Gate and those farther north around the American Colony have different walking distances. An 'East Jerusalem' listing can refer to a much wider area.",
    gettingAround: "Hotels beside the northern Old City walls may be a short walk from Damascus Gate, while properties near the American Colony are farther away. Use the precise address for arrival and check the most useful gate for your itinerary.",
  },
  "german-colony": {
    consider: "The northern German Colony is closer to central sights than southern Baka. A residential atmosphere often means using taxis or buses on some sightseeing days.",
    gettingAround: "From the northern German Colony, Jaffa Gate is roughly a 15–25-minute walk, depending on the starting point. Properties farther into Baka usually make more sense as a bus-or-taxi base.",
  },
};

const jerusalemNoteDesign: Record<string, { insightTitle: string; arrivalTitle: string; InsightIcon: LucideIcon; ArrivalIcon: LucideIcon }> = {
  downtown: { insightTitle: "City energy & quiet rooms", arrivalTitle: "Walking to Jaffa Gate", InsightIcon: Volume2, ArrivalIcon: Footprints },
  mamilla: { insightTitle: "Booking a room with a view", arrivalTitle: "Reaching Jaffa Gate", InsightIcon: Eye, ArrivalIcon: Footprints },
  "old-city": { insightTitle: "Historic buildings & accessibility", arrivalTitle: "Choose the right gate", InsightIcon: Accessibility, ArrivalIcon: MapPin },
  "mahane-yehuda": { insightTitle: "Market streets after dark", arrivalTitle: "Getting to the Old City", InsightIcon: Volume2, ArrivalIcon: TrainFront },
  "east-jerusalem": { insightTitle: "Choose the exact location", arrivalTitle: "Damascus Gate on foot", InsightIcon: MapPin, ArrivalIcon: Footprints },
  "german-colony": { insightTitle: "A residential base", arrivalTitle: "Routes from Baka & the German Colony", InsightIcon: House, ArrivalIcon: Route },
};

function JerusalemPracticalNotes({ areaId }: { areaId: string }) {
  const notes = jerusalemPractical[areaId];
  const presentation = jerusalemNoteDesign[areaId];
  if (!notes || !presentation) return null;
  const { InsightIcon, ArrivalIcon } = presentation;
  return <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="jerusalem-practical-notes">
    <aside className="rounded-2xl border border-primary/20 border-l-4 border-l-primary bg-secondary/40 p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <InsightIcon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h4 className="font-semibold leading-snug">{presentation.insightTitle}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notes.consider}</p>
        </div>
      </div>
    </aside>
    <div className="rounded-2xl border border-sky-200/80 bg-sky-50/70 p-4 shadow-sm dark:border-sky-700/35 dark:bg-sky-950/25 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-900/45 dark:text-sky-300">
          <ArrivalIcon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h4 className="font-semibold leading-snug">{presentation.arrivalTitle}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notes.gettingAround}</p>
        </div>
      </div>
    </div>
  </div>;
}

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
    ? { src: jerusalemHero, alt: "Aerial view of Jaffa Road and the buildings of central Jerusalem" }
    : { src: telAvivHero, alt: "Beachfront hotels, promenade and Mediterranean shoreline in Tel Aviv" };

  return <main className="pb-10" data-testid="city-neighborhood-editorial">
    <GuideHeader
      crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: info.title, to: info.path as LinkProps["to"] }]}
      eyebrow={`Travel guide · ${cityName}`}
      title={info.title}
      intro={info.intro}
      checkedAt={guide.reviewedAt || INFO_CHECK_DATE}
      image={hero}
    />
    <OnThisPage sections={cityId === "jerusalem" ? jerusalemSections : sections} />
    <article className="mx-auto max-w-5xl px-4">
      <section id="choose" aria-labelledby="choose-h" className="mt-10 scroll-mt-32">
        <p className="eyebrow">Choose your base</p>
        <h2 id="choose-h" className="mt-2 text-3xl">Where should you stay in {cityName}?</h2>
        <p className="mt-4 max-w-4xl leading-relaxed">{choices.introduction}</p>
        {cityId !== "jerusalem" && <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">
          I suggest choosing the area before you start comparing individual hotels. Think about the places you want to visit on foot, where you would like to spend your evenings and how easily you can reach the accommodation with luggage.
        </p>}
        {cityId === "jerusalem"
          ? <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" data-testid="jerusalem-area-image-grid">
            {areas.map((area) => <li key={area.id} className="min-w-0">
              <a href={`#area-${area.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <div className="overflow-hidden bg-muted">
                  <img src={area.photo.src} alt={area.photo.alt} width={600} height={375} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]" />
                </div>
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <span className="text-sm font-bold leading-snug text-foreground group-hover:text-primary sm:text-lg">{area.shortName}</span>
                  <span className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{area.bestFor}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary sm:text-sm">Explore this area <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden /></span>
                </span>
              </a>
            </li>)}
          </ul>
          : <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {(guide.quickPicks || []).map((pick) => {
              const area = areas.find((candidate) => candidate.id === pick.areaId);
              return <li key={pick.areaId} className="rounded-xl border bg-secondary/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{pick.label}</p>
                <h3 className="mt-2 text-lg font-semibold">{area?.shortName || pick.areaId}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick.description}</p>
                <a href={`#area-${pick.areaId}`} className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary hover:underline">Read about this area <ArrowRight className="h-4 w-4" aria-hidden /></a>
              </li>;
            })}
          </ul>}
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>{choices.callout}</p>
        </aside>
      </section>

      {cityId !== "jerusalem" && <section id="compare" aria-labelledby="compare-h" className="mt-14 scroll-mt-32">
        <h2 id="compare-h" className="text-3xl">Areas at a glance</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => <li key={area.id}>
            <a href={`#area-${area.id}`} className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="font-semibold group-hover:text-primary">{area.shortName}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{area.bestFor}</span>
              <span className="mt-3 text-xs font-semibold text-primary">Explore this neighbourhood →</span>
            </a>
          </li>)}
        </ul>
      </section>}

      <section id="neighborhoods" aria-labelledby="neighborhoods-h" className="mt-14 scroll-mt-32">
        <h2 id="neighborhoods-h" className="text-3xl">Neighbourhoods in {cityName}</h2>
        {cityId === "jerusalem" && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">The maps show the general location of each area. Check your hotel's exact address before booking.</p>}
        <div className="mt-5 divide-y border-t">
          {areas.map((area) => {
            const photo = cityId === "jerusalem" && area.id === "old-city"
              ? { src: oldCityStoneLane, alt: "Narrow sandstone lane in Jerusalem's Jewish Quarter" }
              : area.photo;
            return <section key={area.id} id={`area-${area.id}`} aria-labelledby={`area-${area.id}-h`} className="scroll-mt-32 py-9 sm:py-11" data-testid="editorial-neighborhood">
            <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(230px,1fr)] md:gap-7">
              <div className="min-w-0">
                <h3 id={`area-${area.id}-h`} className="text-2xl font-semibold sm:text-3xl">{area.name}</h3>
                {cityId === "jerusalem" && <div className="mt-3 space-y-1.5 text-sm leading-relaxed" data-testid="jerusalem-area-highlights">
                  <p><strong>Best for:</strong> {area.bestFor}</p>
                  <p><strong>Nearby highlights:</strong> {area.highlights.slice(0, 3).map((place) => place.name).join(" · ")}</p>
                </div>}
                {(cityId === "jerusalem" ? area.overview.slice(0, 2) : area.overview).map((paragraph, index) => <p key={index} className="mt-3 leading-relaxed">{paragraph}</p>)}
                {cityId !== "jerusalem" && <>
                  <p className="mt-4 text-sm leading-relaxed"><strong>Best for:</strong> {area.bestFor}</p>
                  <p className="mt-2 text-sm leading-relaxed"><strong>Nearby highlights:</strong> {area.highlights.slice(0, 3).map((place) => place.name).join(" · ")}</p>
                </>}
              </div>
              <div className="min-w-0">
                <figure className="overflow-hidden rounded-xl border bg-secondary/20">
                  <img src={photo.src} alt={photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                  <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">{photo.alt}</figcaption>
                </figure>
                <div className="mt-3"><AreaMap area={area} compact provider="google" showExternalLink={false} /></div>
              </div>
            </div>
            {cityId === "jerusalem" ? <JerusalemPracticalNotes areaId={area.id} /> : <AreaComparison areaId={area.id} />}
            {cityId === "jerusalem" && area.id === "german-colony" && <aside className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
              <p>Blue Line light-rail construction on Emek Refaim has changed some road and bus arrangements. Ask your accommodation about its current entrance and drop-off; consult the <a href="https://baka.org.il/he/120/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">local construction updates</a> before travelling.</p>
            </aside>}
            {cityId === "jerusalem" && <JerusalemEditorialHotels area={area} />}
            <div className="mt-6 flex justify-center">
              <Link to={area.path as LinkProps["to"]} className="btn btn-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold">
                {cityId === "jerusalem" ? "Browse more hotels in " : "Browse hotels in "}{area.shortName} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </section>;
          })}
        </div>
      </section>

      <section id="tips" aria-labelledby="tips-h" className="mt-12 scroll-mt-32">
        <h2 id="tips-h" className="text-3xl">What to check before booking</h2>
        {cityId !== "jerusalem" && <p className="mt-3 max-w-3xl leading-relaxed">The exact street, hotel entrance and room category can matter as much as the neighbourhood itself.</p>}
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {(cityId === "jerusalem" ? [
            "Plan the walk to your preferred Old City gate, including hills and steps.",
            "Confirm where your taxi can stop and how far you will carry luggage.",
            "Ask about noise from pedestrian streets, market deliveries and nearby bars.",
            "Check lift access and the full step-free route to your room if needed.",
            "For a Friday-evening or Saturday arrival, confirm check-in, meals and transport.",
            "If you need a Shabbat elevator, check whether the hotel has one.",
            "Driving? Ask for the exact parking location and daily charge.",
            "Check the full price, included taxes and cancellation deadline before paying.",
          ] : guide.checklist).map((tip) => <li key={tip} className="flex gap-3 rounded-xl border bg-secondary/25 p-4 text-sm leading-relaxed"><span aria-hidden className="font-bold text-primary">✓</span>{tip}</li>)}
        </ul>
        <aside className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/20">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p>{choices.check} See my <Link to="/travel-blog/calendar-of-events/" className="font-semibold text-primary underline underline-offset-2">Israel calendar of events</Link> for public holidays and special dates that can affect your plans.</p>
        </aside>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Accommodation and reservations are provided by independent hotels and external booking websites. Check the exact property address, room type, total price and cancellation terms with the provider before booking.
        </p>
      </section>

      <FaqList faqs={cityId === "jerusalem"
        ? [...decisionNotes.jerusalem.faqs, {
          q: "How do I get from Jerusalem Yitzhak Navon station to my hotel?",
          a: "Yitzhak Navon station is next to the Central Bus Station and the light-rail connection. Use the light rail along Jaffa Road for many Downtown and market-area hotels, or take a taxi for an address farther away. Allow for the final walk to the entrance and check service on Friday evenings, Saturdays and holidays.",
        }]
        : [...decisionNotes.telaviv.faqs]} />
      <StayTripLinks region={cityId} currentPath={info.path} presentation="guide" />
      <HomeContactForm guide={cityId === "jerusalem"
        ? { ...guideContactCopy(info.title, "accommodation", cityName),
            introduction: "Not sure which part of Jerusalem would suit your plans? Tell me your travel dates, main interests and how you expect to arrive. I'll be happy to share practical advice." }
        : guideContactCopy(info.title, "accommodation", cityName)} />
      {cityId === "jerusalem" && <CityHotelPhotoCredits city="jerusalem" />}
      <SourceList
        ids={cityId === "jerusalem" ? [...guide.sourceIds, "israel-rail", "jerusalem-light-rail-updates", "jerusalem-emek-refaim-works"] : guide.sourceIds}
        {...(cityId === "jerusalem" ? { intro: "Transport and access information for planning your stay." } : {})}
      />
    </article>
  </main>;
}
