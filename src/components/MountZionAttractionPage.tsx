import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountZionEditorialUpdate } from "@/data/mountZionRevision";
import { mountZionSite } from "@/data/mountZionSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";
import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { recordOutboundClick } from "@/lib/outbound";
import { MountZionMap } from "@/components/MountZionMap";
const mountZionHillsidePhoto = "/images/jerusalem/mount-zion/mount-zion-hillside.webp";

const official = mountZionSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
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

const stopOrder = ["Zion Gate", "Dormition Abbey", "Room of the Last Supper (Cenacle)", "David's Tomb", "The Chamber of the Holocaust", "St Peter in Gallicantu", "Oskar Schindler's grave"];
const orderedStops = [...mountZionEditorialUpdate.stops].sort((a, b) => stopOrder.indexOf(a.name) - stopOrder.indexOf(b.name));

const mountZionTours = [
  {
    id: "5209P123",
    platform: "Viator",
    title: "Jerusalem Old City Day Tour",
    summary: "A guided Jerusalem day including the Cenacle on Mount Zion, Old City landmarks and selected hotel pickup points.",
    duration: "About 7 hours",
    rating: "4.5 · 43 reviews",
    notice: "",
    photo: guidedTourPhoto,
    alt: "Guided sightseeing in Jerusalem",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/Jerusalem-Old-City/d921-5209P123",
    href: "https://viator.tpk.lv/vEqDCNy8",
    editorialPrice: undefined,
  },
  {
    id: "5209TEL210",
    platform: "Viator",
    title: "Jerusalem Highlights from Tel Aviv",
    summary: "A full-day Jerusalem visit with Old City highlights and, on the standard itinerary, the Upper Room and David’s Tomb.",
    duration: "About 10 hours",
    rating: "4.5 · 88 reviews",
    notice: "Monday and Thursday departures generally visit Yad Vashem in place of the Cenacle and David’s Tomb. Choose a departure that includes Mount Zion.",
    photo: mountZionHillsidePhoto,
    alt: "Mount Zion hillside and Jerusalem stone buildings near the Old City",
    sourceUrl: "https://www.viator.com/tours/Tel-Aviv/Old-Jerusalem-Day-Trip-from-Tel-Aviv/d920-5209TEL210",
    href: "https://viator.tpk.lv/9aphqexG",
    editorialPrice: undefined,
  },
  {
    id: "208675P3",
    platform: "Viator",
    title: "Jerusalem Classic Tour: Mount of Olives & Old City",
    summary: "A guided Jerusalem day with the Mount of Olives, Old City highlights and a listed Mount Zion stop. Confirm the exact itinerary for your date.",
    duration: "About 7 hours",
    rating: "5.0 · 3 reviews",
    notice: "",
    photo: "/images/attractions/old-jerusalem-damascus-gate.webp",
    alt: "Damascus Gate in the Old City of Jerusalem",
    sourceUrl: "https://www.viator.com/tours/Jerusalem/jerusalem-daily-tour/d921-208675P3",
    href: "https://viator.tpk.lv/YV4HrN5E",
    editorialPrice: { amount: 122.62, currency: "EUR" as const, basis: "per_person" as const },
  },
] as const;

export const mountZionDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-zion/",
  placeName: "Mount Zion",
  title: mountZionSite.title,
  heroTitle: "Mount Zion, Jerusalem: What to See & How to Visit",
  highlightsTitle: "What to see on Mount Zion",
  region: mountZionSite.region,
  updatedAt: mountZionSite.updatedAt,
  hero: mountZionSite.hero,
  intro: mountZionSite.intro,
  visitorTitle: "Opening hours, admission and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "Mount Zion: sacred traditions and Jerusalem history",
  relatedTitle: "Continue exploring Jerusalem",
  itineraryFirst: true,
  contactIntroduction: "Tell me when you are visiting and whether you want to explore Mount Zion alone or combine it with Jerusalem's Old City. I can help arrange transport to a convenient pickup or drop-off point.",
  facts: [
    { icon: "location", label: "Location", value: "Beside Zion Gate", note: "Just south of the Old City walls" },
    { icon: "duration", label: "Time needed", value: "1–3 hours", note: "Allow more time for Gallicantu or the cemetery" },
    { icon: "admission", label: "Central sites", value: "Mostly free", note: "Check individual museums and churches" },
    { icon: "hours", label: "Plan for", value: "Sunday differences", note: "Abbey opens 11:30; Gallicantu closed" },
    { icon: "highlights", label: "Main landmarks", value: "Upper Room & Dormition", note: "David's Tomb in the same historic complex" },
    { icon: "access", label: "Walking", value: "Compact central circuit", note: "Lower sites need additional steps or a vehicle" },
  ],
  glanceNote: <>Start on foot near <a href={zionGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Zion Gate</a>. The Upper Room is upstairs from David’s Tomb; both have their own visitor and worship arrangements. See <a href={official.dormition} target="_blank" rel="noopener noreferrer" className={inlineLink}>Dormition Abbey’s hours</a> before a Sunday visit.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <p className="text-sm leading-relaxed sm:text-base">{mountZionEditorialUpdate.stopIntro}</p>
      {orderedStops.map(stop => <AttractionHighlight key={stop.name} title={stop.name} mobileImageFirst image={stop.image ? { src: stop.image.src, alt: stop.image.alt } : undefined}>
        <p>{stop.description}</p>
        <p>{stop.visit}</p>
        {stop.link && <p><a href={stop.link.url} target="_blank" rel="noopener noreferrer" className={inlineLink}>{stop.link.label} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></p>}
      </AttractionHighlight>)}
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The central Mount Zion area is free to walk through. Each religious compound and museum manages its own opening hours and admission. These are published reference times; services, <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link> and local arrangements may change access.</p>
      <div role="region" aria-label="Mount Zion opening hours and admission comparison" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary" data-testid="mount-zion-hours-fees">
        <table className="w-full min-w-[790px] border-collapse text-left text-sm">
          <caption className="sr-only">Opening hours, admission and visitor notes for seven Mount Zion sites</caption>
          <thead className="bg-secondary/60">
            <tr>{["Site", "Visiting hours", "Admission", "Important notes"].map((heading, index) => <th key={heading} scope="col" className={index === 0 ? "sticky left-0 z-10 border-b bg-secondary px-3 py-3 font-semibold" : "border-b px-3 py-3 font-semibold"}>{heading}</th>)}</tr>
          </thead>
          <tbody>{mountZionSite.hours.map(fact => <tr key={fact.name} className="border-b last:border-0">
            <th scope="row" className="sticky left-0 z-10 w-[150px] min-w-[136px] bg-card px-3 py-3 align-top font-semibold">{fact.name}</th>
            <td className="px-3 py-3 align-top">{fact.time}</td>
            <td className="px-3 py-3 align-top font-medium">{fact.admission}</td>
            <td className="px-3 py-3 align-top text-muted-foreground">{fact.note}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed"><strong>Dormition Abbey:</strong> Sunday visiting begins at 11:30 according to the <a href={official.dormition} target="_blank" rel="noopener noreferrer" className={inlineLink}>abbey’s published timetable</a>. For feast days and special services, check the abbey’s announcements.</p>
      <div className="rounded-xl border bg-secondary/20 p-4 sm:p-5" data-testid="mount-zion-accessibility">
        <h3 className="font-serif text-xl font-semibold">Accessibility and practical considerations</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Upper Room:</strong> The traditional entrance involves a staircase. Contact the responsible site before relying on step-free entry.</li>
          <li><strong>St Peter in Gallicantu:</strong> The <a href={official.gallicantu} target="_blank" rel="noopener noreferrer" className={inlineLink}>sanctuary reports accessibility for visitors with reduced mobility</a>, but the walk down from Zion Gate is on a slope. Arrive via Hebron Road, following the sanctuary’s car-access directions.</li>
          <li><strong>David's Tomb:</strong> Respect the separate prayer areas, modest dress and photography rules; men should carry a head covering.</li>
          <li><strong>Schindler's grave:</strong> The Catholic cemetery has a <a href={official.catholicCemetery} target="_blank" rel="noopener noreferrer" className={inlineLink}>separate entrance on the southern hillside</a> and stair-linked terraces. It is not beside the Upper Room.</li>
          <li><strong>Chamber of the Holocaust:</strong> <a href={official.holocaustChamber} target="_blank" rel="noopener noreferrer" className={inlineLink}>Arrange group visits</a> in advance, especially when adding the memorial to a busy itinerary.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>For the central landmarks, start at Zion Gate. St Peter in Gallicantu and the Catholic cemetery have their own hillside approaches; choose a suitable pickup point when visiting either one.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="mount-zion-access-points">
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Zion Gate</h3><p className="mt-2 text-sm">Starting point for the Cenacle, David’s Tomb and Dormition Abbey.</p><a href={zionGateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Driving to the gate area <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">St Peter in Gallicantu</h3><p className="mt-2 text-sm">Reach the sanctuary from Hebron Road for a convenient lower-hillside arrival.</p><a href={gallicantuDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Driving directions <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Continue into the Old City</h3><p className="mt-2 text-sm">Walk through Zion Gate to the Armenian and Jewish Quarters.</p><a href={oldCityWalk} target="_blank" rel="noopener noreferrer" className={inlineLink}>Walking directions <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a></article>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Walk from the Old City</h3></div>
          <p className="mt-2 text-sm leading-relaxed">From Jaffa Gate, follow the Armenian Quarter towards Zion Gate. From the Jewish Quarter, head south towards the same gate. The central landmarks are close together, with historic stone paving along the way.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Public buses</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Bus 38 serves Mount Zion/Ma’ale HaShalom and Zion Gate/Habad; bus 2 also serves the Zion Gate area. Check the direction of the circular 38 route and departures on the <a href={official.busPlanner} target="_blank" rel="noopener noreferrer" className={inlineLink}>public transport planner</a>. Most Israeli city buses pause for Shabbat from Friday afternoon to Saturday evening.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Taxi or private driver</h3></div>
          <p className="mt-2 text-sm leading-relaxed">Arrange a drop-off on a road near Zion Gate for the central circuit. For St Peter in Gallicantu, follow the <a href={official.gallicantu} target="_blank" rel="noopener noreferrer" className={inlineLink}>sanctuary’s approach via Hebron Road</a>. A separate pickup can make a longer visit easier; <a href="#contact" className={inlineLink}>tell me your plans</a>.</p>
        </article>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>{mountZionEditorialUpdate.routeIntro}</p>
      <div className="grid gap-3 md:grid-cols-3" data-testid="mount-zion-visit-choices">
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">45–60 minutes</p>
          <h3 className="mt-2 text-lg font-semibold">The main landmarks</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start at Zion Gate, visit the Upper Room and continue downstairs to David’s Tomb. A good choice for a short visit.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">1.5–2 hours</p>
          <h3 className="mt-2 text-lg font-semibold">The central Mount Zion circuit</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Add Dormition Abbey, its mosaics and crypt, and the Chamber of the Holocaust when open.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">2.5–3 hours or longer</p>
          <h3 className="mt-2 text-lg font-semibold">A longer history or pilgrimage visit</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Explore the central sites, then continue to St Peter in Gallicantu or Oskar Schindler’s grave on the lower hillside.</p>
        </article>
      </div>
      <MountZionMap />
      <h3 className="pt-3 text-xl font-semibold">Two suggested walking routes</h3>
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
        <ul className="mt-3 grid list-none gap-3 p-0 sm:grid-cols-3">
          {walkingLegs.map(leg => <li key={leg.href} className="list-none rounded-lg border bg-secondary/20 p-3">
            <a href={leg.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>{leg.title} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true"/></a>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{leg.description}</p>
          </li>)}
        </ul>
      </div>
      <AttractionPracticalTip>On Sundays, visit the Upper Room and David’s Tomb first, then Dormition Abbey after 11:30. For St Peter in Gallicantu, choose Monday–Saturday. My <Link to="/attractions/old-city-jerusalem/" className={inlineLink}>Jerusalem Old City guide</Link> helps plan the next part of your walk.</AttractionPracticalTip>
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
      <p>These guided full-day tours combine Mount Zion with Jerusalem’s Old City and other landmarks. Compare the departure point and individual stops before choosing your tour.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="mount-zion-tour-cards">
        {mountZionTours.map(tour => <ExternalProviderTourCard
          key={tour.id} image={tour.photo} alt={tour.alt}
          platform={tour.platform} title={tour.title} description={tour.summary}
          duration={tour.duration} rating={{
            value: Number(tour.rating.split(" · ")[0]),
            count: Number(tour.rating.split(" · ")[1]?.split(" ")[0]),
          }}
          href={tour.href} note={tour.notice} price={tour.editorialPrice}
          onClick={() => recordOutboundClick({ pageId: "attractions-mount-zion", productId: tour.id, offerId: tour.id })}
        />)}
      </div>
      <p className="text-sm leading-relaxed"><Link to="/tours/jerusalem/" className={inlineLink}>Browse more Jerusalem tours</Link>, or <a href="#contact" className={inlineLink}>contact me about private transport</a> for your visit.</p>
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
    { label: "Jerusalem’s Old City", to: "/attractions/old-city-jerusalem/", note: "Walk through Zion Gate into the historic quarters." },
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Panoramic viewpoints, Gethsemane and pilgrimage sites." },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", note: "Explore churches and Christian sites across the city." },
    { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", note: "Plan sightseeing, transport and your time in the city." },
    { label: "Museums in Jerusalem", to: "/travel-blog/museums-in-jerusalem/", note: "Discover the city’s collections and cultural history." },
    { label: "Via Dolorosa", to: "/attractions/via-dolorosa/", note: "Walk the traditional Stations of the Cross in the Old City." },
  ],
  planningLinks: [
    { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", description: "Choose a base for Old City visits.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Plan public transport and other connections.", icon: "region" },
    { label: "Israel’s calendar of events", to: "/travel-blog/calendar-of-events/", description: "Choose dates around religious and local events.", icon: "region" },
    { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", description: "Compare arrival and transfer options.", icon: "arrival" },
    { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/", description: "Fit Jerusalem into a short visit.", icon: "itinerary" },
    { label: "Private driver in Israel", to: "/private-driver-in-israel/", description: "Arrange flexible transport for your visit.", icon: "region" },
  ],
  photoCredits: <p>
    Photographs (resized and cropped to WebP):{" "}
    <a href="https://commons.wikimedia.org/wiki/File:The_cenotaph_of_David%27s_Tomb.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>David’s Tomb</a> — Jacek555, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 3.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Jerusalem_-_Zion_gate.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Zion Gate</a> and{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Jerusalem_-_Oskar_Schindler%27s_Grave.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Oskar Schindler’s grave</a> — Marco Plassio, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 3.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Chamber_of_the_Holocaust_-_Outside_King_David%27s_Tomb_-_Jerusalem_-_Israel_-_02_(5676110809).jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Chamber of the Holocaust</a> — Adam Jones, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 2.0</a>. Source: Wikimedia Commons.
  </p>,
  sources: [
    { label: "Christian Information Center — holy site visiting hours", url: official.cicHours },
    { label: "Dormition Abbey — official opening hours", url: official.dormition },
    { label: "St Peter in Gallicantu — visiting hours and accessibility", url: official.gallicantu },
    { label: "Window to Mount Zion — local heritage and walking context", url: official.mountZionHeritage },
    { label: "Window to Mount Zion — detailed site map (PDF)", url: official.mountZionMap },
    { label: "Mount Zion Catholic Cemetery — Oskar Schindler's grave", url: official.catholicCemetery },
    { label: "Chamber of the Holocaust — hours and group visits", url: official.holocaustChamber },
    { label: "Israel public transport planner", url: official.busPlanner },
    { label: "Viator — Jerusalem Old City Day Tour", url: mountZionTours[0].sourceUrl },
    { label: "Viator — Jerusalem Highlights from Tel Aviv", url: mountZionTours[1].sourceUrl },
    { label: "Viator — Jerusalem Classic Tour", url: mountZionTours[2].sourceUrl },
  ],
};

export function MountZionAttractionPage() {
  return <AttractionDestinationPage content={mountZionDestinationContent}/>;
}
