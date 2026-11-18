import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountZionEditorialUpdate } from "@/data/mountZionRevision";
import { mountZionSite } from "@/data/mountZionSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";
import oldCityTourPhoto from "@/assets/home/jerusalem-old-city-card.webp";

const official = mountZionSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Zion%20Gate%20Jerusalem%20Israel&hl=en&z=16&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Zion%20Gate%20Jerusalem%20Israel";
const zionGateDirections = "https://www.google.com/maps/dir/?api=1&destination=Zion%20Gate%20Jerusalem%20Israel&travelmode=driving";
const gallicantuDirections = "https://www.google.com/maps/dir/?api=1&destination=Saint%20Peter%20in%20Gallicantu%20Jerusalem%20Israel&travelmode=driving";
const oldCityWalk = "https://www.google.com/maps/dir/?api=1&origin=Jaffa%20Gate%20Jerusalem&destination=Zion%20Gate%20Jerusalem&travelmode=walking";
const gallicantuWalk = "https://www.google.com/maps/dir/?api=1&origin=Zion%20Gate%20Jerusalem&destination=Saint%20Peter%20in%20Gallicantu%20Jerusalem&travelmode=walking";
const westernWallWalk = "https://www.google.com/maps/dir/?api=1&origin=Zion%20Gate%20Jerusalem&destination=Western%20Wall%20Jerusalem&travelmode=walking";
const walkingLegs = [
  { title: "Jaffa Gate to Zion Gate", href: oldCityWalk, description: "Through the Armenian Quarter, depending on pedestrian access" },
  { title: "Zion Gate to Gallicantu", href: gallicantuWalk, description: "Down the hillside to the separate church entrance" },
  { title: "Zion Gate to Western Wall", href: westernWallWalk, description: "Through the Jewish Quarter after your Mount Zion visit" },
] as const;

const mountZionTours = [
  {
    id: "5209P123",
    platform: "Viator",
    title: "Jerusalem Old City Day Tour",
    summary: "A guided Jerusalem day including the Cenacle on Mount Zion, Old City landmarks and selected hotel pickup points.",
    duration: "About 7 hours",
    rating: "4.5 · 43 reviews",
    photo: guidedTourPhoto,
    alt: "Guided sightseeing in Jerusalem",
    href: "https://www.viator.com/tours/Jerusalem/Jerusalem-Old-City/d921-5209P123",
  },
  {
    id: "5209TEL210",
    platform: "Viator",
    title: "Jerusalem Highlights from Tel Aviv",
    summary: "Full-day tour visiting the Upper Room and David's Tomb on applicable dates. Some operating days substitute other sites.",
    duration: "Full day",
    rating: "4.5 · 87 reviews",
    photo: oldCityTourPhoto,
    alt: "Jerusalem Old City landmarks on a guided tour",
    href: "https://www.viator.com/tours/Tel-Aviv/Old-Jerusalem-Day-Trip-from-Tel-Aviv/d920-5209TEL210",
  },
] as const;

export const mountZionDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-zion/",
  placeName: "Mount Zion",
  title: mountZionSite.title,
  heroTitle: "Mount Zion: What to See & Visitor Guide",
  highlightsTitle: "What to see on Mount Zion",
  region: mountZionSite.region,
  updatedAt: mountZionSite.updatedAt,
  hero: mountZionSite.hero,
  intro: mountZionSite.intro,
  visitorTitle: "Opening hours, admission and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "Mount Zion in Jerusalem's religious traditions",
  relatedTitle: "Explore Jerusalem and day trips across Israel",
  contactIntroduction: "Tell me when you are visiting and whether you want to explore Mount Zion alone or combine it with Jerusalem's Old City. I can help arrange transport to a convenient pickup or drop-off point.",
  facts: [
    { icon: "location", label: "Location", value: "Beside Zion Gate", note: "Just south of the Old City walls" },
    { icon: "duration", label: "Time needed", value: "1–3 hours", note: "Allow more time for Gallicantu or the cemetery" },
    { icon: "admission", label: "Central sites", value: "Mostly free", note: "Check individual museums and churches" },
    { icon: "hours", label: "Plan for", value: "Sunday differences", note: "Abbey opens 11:30; Gallicantu closed" },
    { icon: "highlights", label: "Main landmarks", value: "Upper Room & Dormition", note: "David's Tomb in the same historic complex" },
    { icon: "access", label: "Walking", value: "Compact central circuit", note: "Lower sites need additional steps or a vehicle" },
  ],
  glanceNote: <>The easiest short visit starts just outside <a href={zionGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Zion Gate</a>. The <strong>Upper Room is upstairs</strong> and David's Tomb is on the lower level; allow for separate prayer and access arrangements. <a href={official.dormition} target="_blank" rel="noopener noreferrer" className={inlineLink}>Dormition Abbey</a> has different Sunday visiting hours.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <p className="text-sm leading-relaxed sm:text-base">{mountZionEditorialUpdate.stopIntro}</p>
      {mountZionEditorialUpdate.stops.map(stop => <AttractionHighlight key={stop.name} title={stop.name} image={stop.image ? { src: stop.image.src, alt: stop.image.alt } : undefined}>
        <p>{stop.description}</p>
        <p>{stop.visit}</p>
        {stop.link && <p><a href={stop.link.url} target="_blank" rel="noopener noreferrer" className={inlineLink}>{stop.link.label} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></p>}
      </AttractionHighlight>)}
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The central Mount Zion area is free to walk through. Each religious compound and museum manages its own opening hours and admission. These are published reference times; services, holidays and local arrangements may change access.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-zion-hours-fees">
        {mountZionSite.hours.map(fact => <article key={fact.name} className="rounded-xl border bg-card p-4">
          <div className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/><h3 className="font-serif text-lg font-semibold leading-snug">{fact.name}</h3></div>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">{fact.time}</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t pt-3 text-sm">
            <span className="inline-flex items-center gap-1 font-semibold text-primary"><Ticket className="h-4 w-4" aria-hidden="true"/>{fact.admission}</span>
            <span className="text-xs text-muted-foreground">{fact.note}</span>
          </div>
        </article>)}
      </div>
      <div className="rounded-xl border bg-secondary/20 p-4 sm:p-5" data-testid="mount-zion-accessibility">
        <h3 className="font-serif text-xl font-semibold">Accessibility and practical considerations</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Upper Room:</strong> The traditional entrance involves a staircase. Contact the responsible site before relying on step-free entry.</li>
          <li><strong>St Peter in Gallicantu:</strong> The <a href={official.gallicantu} target="_blank" rel="noopener noreferrer" className={inlineLink}>sanctuary reports accessibility for visitors with reduced mobility</a>, but the walk down from Zion Gate is on a slope. A vehicle can approach from Hebron Road; do not assume every nearby road turn is permitted.</li>
          <li><strong>David's Tomb:</strong> Respect the separate prayer areas, modest dress and photography rules; men should carry a head covering.</li>
          <li><strong>Schindler's grave:</strong> The Catholic cemetery has a <a href={official.catholicCemetery} target="_blank" rel="noopener noreferrer" className={inlineLink}>separate entrance on the southern hillside</a> and stair-linked terraces. It is not beside the Upper Room.</li>
          <li><strong>Chamber of the Holocaust:</strong> The <a href={official.holocaustChamber} target="_blank" rel="noopener noreferrer" className={inlineLink}>museum</a> opens Sunday–Thursday 09:00–14:00, with group visits arranged ahead.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Zion Gate is a helpful point of reference, whether you are walking from the Old City or arranging road transport. The central sites are close together; the lower cemetery and Gallicantu are separate extensions.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="mount-zion-access-points">
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Zion Gate</h3><p className="mt-2 text-sm">Start for Dormition Abbey, the Cenacle and David's Tomb.</p><a href={zionGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Map directions <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">St Peter in Gallicantu</h3><p className="mt-2 text-sm">A lower hillside stop with its own road access from Hebron Road.</p><a href={gallicantuDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Driving directions <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Old City connection</h3><p className="mt-2 text-sm">Return through Zion Gate to the Armenian and Jewish Quarters.</p><a href={oldCityWalk} target="_blank" rel="noopener noreferrer" className={inlineLink}>Walking map <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Walk from the Old City</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Jaffa Gate, walk through the Armenian Quarter towards Zion Gate. From the Jewish Quarter, follow signs to Zion Gate and exit the city wall. The short central Mount Zion circuit is easily combined with these neighbourhoods, but the streets may have uneven paving.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Buses 38 and 2</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Circular bus route 38 serves stops including <strong>Mount Zion/Ma'ale HaShalom</strong> and <strong>Zion Gate/Habad</strong>; route 2 also serves Zion Gate. Confirm the correct direction and current timetable on the <a href={official.busPlanner} target="_blank" rel="noopener noreferrer" className={inlineLink}>public transport planner</a>. Most Israeli city buses do not operate from Friday afternoon until Saturday evening.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Taxi and private transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Arrange a drop-off at a road-accessible point near Zion Gate rather than at a church door within a pedestrian courtyard. For Gallicantu, follow the site's <a href={official.gallicantu} target="_blank" rel="noopener noreferrer" className={inlineLink}>specific driving approach</a> via Hebron Road. Agree on pickup details before going downhill.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="mount-zion-map">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary" aria-hidden="true"/><h3 className="text-sm font-semibold">Where is Mount Zion?</h3></div>
          <iframe title="Map of Mount Zion and Zion Gate, Jerusalem" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">View larger map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>{mountZionEditorialUpdate.routeIntro}</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="mount-zion-walking-routes">
        {mountZionEditorialUpdate.routes.map(route => <article key={route.name} className="rounded-xl border bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase text-primary">{route.time}</p>
          <h3 className="mt-2 font-serif text-xl font-semibold">{route.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{route.bestFor}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">{route.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="mt-3 border-t pt-3 text-sm text-muted-foreground">{route.note}</p>
        </article>)}
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="mount-zion-walking-connections">
        <h3 className="font-serif text-xl font-semibold">Walking connections</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Open the leg you need for directions; local gates, steps and road crossings may affect the exact route.</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {walkingLegs.map(leg => <li key={leg.href} className="rounded-lg border bg-secondary/20 p-3">
            <a href={leg.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>{leg.title} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{leg.description}</p>
          </li>)}
        </ul>
      </div>
      <AttractionPracticalTip>For a Sunday visit, explore the Upper Room and David's Tomb before visiting Dormition Abbey after 11:30. Save St Peter in Gallicantu for Monday–Saturday. For the rest of your walking day, see my <Link to="/attractions/old-city-jerusalem/" className={inlineLink}>Jerusalem Old City guide</Link>.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      {mountZionEditorialUpdate.history.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p>For further background on the hill's varied communities, see <a href={official.mountZionHeritage} target="_blank" rel="noopener noreferrer" className={inlineLink}>Window to Mount Zion</a>. For a wider Christian pilgrimage route, see my <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>Jerusalem churches guide</Link>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>These full-day tours include Mount Zion among other Jerusalem highlights. They are not dedicated short walks on the hill; check whether the Upper Room, David's Tomb and other stops are included for your specific departure date.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-zion-tour-cards">
        {mountZionTours.map(tour => <article key={tour.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card">
          <img src={tour.photo} alt={tour.alt} width={480} height={260} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover"/>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs font-semibold text-muted-foreground">{tour.platform}</p>
            <h3 className="mt-1 font-serif text-lg font-semibold leading-snug">{tour.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
            <p className="mt-3 text-sm">{tour.duration} · ★ {tour.rating}</p>
            <div className="mt-auto pt-4"><a href={tour.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">View tour <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a></div>
          </div>
        </article>)}
      </div>
      <p className="text-xs text-muted-foreground">Ratings are dated Viator listing snapshots, not live availability. The Tel Aviv departure may substitute other sites for Mount Zion on Mondays and Thursdays. These are direct provider links, without affiliate attribution.</p>
      <p className="text-sm leading-relaxed">You can <Link to="/tours/jerusalem/" className={inlineLink}>explore other Jerusalem tours</Link>, or <a href="#contact" className={inlineLink}>contact me about private transport</a> if you mainly need help with drop-off and pickup.</p>
    </div>
  ),
  faqs: [
    { q: "How do I reach Mount Zion from Jerusalem's Old City?", a: "Walk south through the Armenian or Jewish Quarter to Zion Gate. The Upper Room, David's Tomb and Dormition Abbey are a short walk just outside the walls." },
    { q: "How much time should I allow for Mount Zion?", a: "Allow about one or two hours for the central sites. Set aside around three hours if you also want St Peter in Gallicantu or the separate Catholic cemetery." },
    { q: "Are David's Tomb and the Last Supper Room in the same building?", a: "Yes. The traditional Cenacle is upstairs, with David's Tomb on the lower level. Visitors and worshippers use different access arrangements." },
    { q: "Is Mount Zion free to visit?", a: "The public streets and Zion Gate are free, as are many central religious sites. Museums and other compounds may have their own entrance requirements and charges." },
    { q: "Can I visit Mount Zion on Sunday?", a: "Yes. The Cenacle and David's Tomb have separate arrangements; Dormition Abbey welcomes sightseeing visitors from 11:30, while St Peter in Gallicantu is normally closed." },
    { q: "Can I visit Oskar Schindler's grave?", a: "His grave is in the Catholic cemetery on the lower southern slope, not directly beside the Upper Room. Check the gate before descending and treat the cemetery as a place of remembrance." },
    { q: "Is Mount Zion suitable for wheelchair users?", a: "The compact area near Zion Gate is easier than the lower extensions, but the Upper Room is reached by stairs. St Peter in Gallicantu reports an accessible site with separate vehicle access, while the walk between stops may still be steep or uneven." },
  ],
  nearby: [
    { label: "Jerusalem's Old City", to: "/attractions/old-city-jerusalem/", note: "Continue through Zion Gate to the Armenian and Jewish Quarters." },
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Panorama, Gethsemane and hillside pilgrimage sites." },
    { label: "Museums in Jerusalem", to: "/attractions/museums-in-jerusalem/", note: "Explore museums and heritage collections across the city." },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "Jordan River pilgrimage site on a separate day." },
    { label: "Masada National Park", to: "/attractions/masada/", note: "Ancient desert fortress for a longer excursion." },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "Oasis walks and natural scenery by the Dead Sea." },
  ],
  planningLinks: [
    { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", description: "Plan your stay, neighbourhoods and transport.", icon: "region" },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", description: "Explore nearby pilgrimage sites.", icon: "region" },
    { label: "Day trips from Jerusalem", to: "/travel-blog/day-trips-from-jerusalem/", description: "Ideas for another day beyond the city.", icon: "region" },
    { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", description: "Choose a base for sightseeing.", icon: "region" },
    { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", description: "Compare train, taxi and transfer options.", icon: "arrival" },
    { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/", description: "See how Jerusalem fits into a shorter trip.", icon: "itinerary" },
  ],
  sources: [
    { label: "Christian Information Center — holy site visiting hours", url: official.cicHours },
    { label: "Dormition Abbey — official opening hours", url: official.dormition },
    { label: "St Peter in Gallicantu — visiting hours and accessibility", url: official.gallicantu },
    { label: "Window to Mount Zion — local heritage and walking context", url: official.mountZionHeritage },
    { label: "Mount Zion Catholic Cemetery — Oskar Schindler's grave", url: official.catholicCemetery },
    { label: "Chamber of the Holocaust — hours and group visits", url: official.holocaustChamber },
    { label: "Israel public transport planner", url: official.busPlanner },
    { label: "Viator — Jerusalem Old City Day Tour", url: mountZionTours[0].href },
    { label: "Viator — Jerusalem Highlights from Tel Aviv", url: mountZionTours[1].href },
  ],
};

export function MountZionAttractionPage() {
  return <AttractionDestinationPage content={mountZionDestinationContent}/>;
}
