import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountOlivesEditorialUpdate, mountOlivesAttractionUpdate } from "@/data/mountOlivesRevision";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";
import oldCityTourPhoto from "@/assets/home/jerusalem-old-city-card.webp";

const official = mountOlivesSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem";
const viewpointDirections = "https://www.google.com/maps/dir/?api=1&destination=Seven%20Arches%20Hotel%20Mount%20of%20Olives%20Jerusalem&travelmode=driving";
const gethsemaneDirections = "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&travelmode=driving";
const lionGateWalk = "https://www.google.com/maps/dir/?api=1&origin=Church%20of%20All%20Nations%20Gethsemane%20Jerusalem&destination=Lions%20Gate%20Jerusalem&travelmode=walking";

export const mountOlivesDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-of-olives/",
  placeName: "Mount of Olives",
  title: mountOlivesSite.title,
  heroTitle: "Mount of Olives: Viewpoint & Visitor Guide",
  highlightsTitle: "What to see on the Mount of Olives",
  region: mountOlivesSite.region,
  updatedAt: mountOlivesSite.updatedAt,
  hero: mountOlivesSite.hero,
  intro: mountOlivesSite.intro,
  visitorTitle: "Opening hours, admission and accessibility",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "The Mount of Olives in Jewish and Christian tradition",
  relatedTitle: "Explore Jerusalem and beyond",
  contactIntroduction: "Tell me where you're staying, when you'd like to visit and whether you prefer the panorama, the churches or a longer Jerusalem day. I can help arrange a practical drop-off and pickup for your plans.",
  facts: [
    { icon: "location", label: "Location", value: "East of the Old City", note: "Across the Kidron Valley" },
    { icon: "duration", label: "Time needed", value: "30 min–half day", note: "About 2–3 hours for the lookout and selected churches" },
    { icon: "admission", label: "Viewpoint", value: "Free", note: "Individual compounds may charge admission" },
    { icon: "hours", label: "Church hours", value: "Vary by site", note: "Pater Noster and St Mary Magdalene have limited days" },
    { icon: "highlights", label: "Don't miss", value: "Panorama & Gethsemane", note: "Dominus Flevit on the downhill route" },
    { icon: "access", label: "Walking", value: "Steep hillside", note: "Arrange separate upper and lower stops if needed" },
  ],
  glanceNote: <>For the classic Jerusalem panorama, head to the public terrace near the <a href={viewpointDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Seven Arches Hotel</a>. If you would like to visit churches, choose your day carefully: <a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>opening hours</a> are different at each site.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <p className="text-sm leading-relaxed sm:text-base">{mountOlivesEditorialUpdate.stopIntro}</p>
      {mountOlivesEditorialUpdate.stops.map((stop, index) => <AttractionHighlight
        key={stop.name}
        title={stop.name}
        image={stop.image ? { src: stop.image.src, alt: stop.image.alt } : undefined}
      >
        <p>{stop.description}</p>
        <p>{stop.visit}</p>
        <p className="text-xs font-semibold text-muted-foreground">{mountOlivesSite.hours[index]?.name === stop.name || index === 0 ? mountOlivesSite.hours[index]?.time : ""}</p>
      </AttractionHighlight>)}
      <AttractionPracticalTip>The hillside is steep and some entrances are on different paths. For a comfortable first visit, I would begin at the Seven Arches lookout, choose one or two church interiors and finish at Gethsemane rather than returning uphill on foot.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The open-air panoramic viewpoint is free. The churches, monasteries and pilgrimage sites below follow separate schedules, and Pater Noster and the Chapel of the Ascension charge their own entrance fees. The following published hours are a planning guide, not a guarantee of entry on holidays or during services.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-olives-hours-fees">
        {mountOlivesSite.hours.map(fact => <article key={fact.name} className="rounded-xl border bg-card p-4">
          <div className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/><h3 className="font-serif text-lg font-semibold leading-snug">{fact.name}</h3></div>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">{fact.time}</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t pt-3 text-sm">
            <span className="inline-flex items-center gap-1 font-semibold text-primary"><Ticket className="h-4 w-4" aria-hidden="true"/>{fact.admission}</span>
            <span className="text-xs text-muted-foreground">{fact.note}</span>
          </div>
        </article>)}
      </div>
      <p className="text-sm leading-relaxed">The published Pater Noster timetable and its temporary shorter schedule differ; check the current <a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center hours</a> before planning a visit around it. The Church of All Nations and the nearby Grotto of the Apostles do not share the same continuous opening hours: the grotto closes around midday.</p>
      <div className="rounded-xl border bg-secondary/20 p-4 sm:p-5" data-testid="mount-olives-access">
        <h3 className="font-serif text-xl font-semibold">Accessibility, visiting etiquette and practical details</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Steep walk:</strong> The Palm Sunday road descends sharply, with uneven paving and some steps. It is not a reliably step-free route and can be tiring on the return uphill.</li>
          <li><strong>Alternative:</strong> For limited mobility, visit the lookout by vehicle and arrange a separate drop-off near Gethsemane. Check step-free access to each church directly.</li>
          <li><strong>Tomb of Mary:</strong> Reaching the underground sanctuary involves a long stairway.</li>
          <li><strong>Respectful visits:</strong> Wear modest clothing inside churches, observe service times and follow photography instructions.</li>
          <li><strong>Jewish cemetery:</strong> This is an active burial place; please respect graves, funerals and mourners. The <a href={official.cemetery} target="_blank" rel="noopener noreferrer" className={inlineLink}>Mount of Olives Information Center</a> currently reports that it is temporarily closed to visitors.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>It is useful to distinguish between the <strong>upper ridge</strong> around the Seven Arches lookout and the <strong>lower sites</strong> around Gethsemane. Transport to one does not place you at the entrance of the other.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="mount-olives-access-points">
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Seven Arches viewpoint</h3><p className="mt-2 text-sm">Best starting point for the panorama and a downhill walk.</p><a href={viewpointDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Driving directions <ArrowUpRight className="inline h-4 w-4"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Gethsemane</h3><p className="mt-2 text-sm">Lower pickup point near the Church of All Nations and Tomb of Mary.</p><a href={gethsemaneDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Driving directions <ArrowUpRight className="inline h-4 w-4"/></a></article>
        <article className="rounded-xl border bg-card p-3"><h3 className="font-serif text-lg font-semibold">Lion's Gate</h3><p className="mt-2 text-sm">Continue into Jerusalem's Old City from the foot of the hill.</p><a href={lionGateWalk} target="_blank" rel="noopener noreferrer" className={inlineLink}>Walking directions <ArrowUpRight className="inline h-4 w-4"/></a></article>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By public bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">City of David lists bus 84 from Ammunition Hill near the light rail toward Ma'ale HaZeitim and Seven Arches. Routes 83, 83A and 51 serve Derech Yericho near the lower cemetery approach. Verify the exact stop and day with the <a href={official.transit} target="_blank" rel="noopener noreferrer" className={inlineLink}>public transport planner</a>; routes may change.</p>
            <p className="mt-2 text-sm leading-relaxed">The light rail and most Israeli city buses do not operate during Shabbat, from Friday afternoon until Saturday evening. Other local services can follow different schedules.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By taxi or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">A taxi to Seven Arches avoids climbing up from the Kidron Valley. If you plan to walk down, arrange pickup near Gethsemane rather than at the summit. <a href="#contact" className={inlineLink}>Contact me</a> if you would like help arranging the route.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">On foot from the Old City</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Lion's Gate, cross toward Gethsemane near the foot of the Mount of Olives. You can visit the lower churches without climbing the entire hillside. The full ascent to the upper viewpoint is steep, especially in warm weather.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="mount-olives-map">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary" aria-hidden="true"/><h3 className="text-sm font-semibold">Where is the main viewpoint?</h3></div>
          <iframe title="Map of Seven Arches viewpoint on the Mount of Olives, Jerusalem" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">View larger map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>{mountOlivesEditorialUpdate.routeIntro}</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="mount-olives-walking-routes">
        {mountOlivesEditorialUpdate.routes.map(route => <article key={route.name} className="rounded-xl border bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase text-primary">{route.time}</p>
          <h3 className="mt-2 font-serif text-xl font-semibold">{route.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{route.bestFor}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">{route.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="mt-3 border-t pt-3 text-sm text-muted-foreground">{route.note}</p>
        </article>)}
      </div>
      <AttractionPracticalTip>For the fuller pilgrimage route, Tuesday or Thursday is often the most useful day because St Mary Magdalene has a short morning window and Pater Noster has temporarily reduced visiting hours. Confirm both before you set out. For an independent Old City walk afterwards, see my <Link to="/attractions/old-city-jerusalem/" className={inlineLink}>Jerusalem Old City guide</Link>.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      {mountOlivesEditorialUpdate.history.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p>The Mount of Olives Jewish cemetery is still used today. You can learn about the graves and their history from <a href={official.cemeteryGraves} target="_blank" rel="noopener noreferrer" className={inlineLink}>the dedicated cemetery information project</a>. For nearby Christian heritage, see my <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>Jerusalem churches guide</Link>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Guided Jerusalem visits can offer more context about the churches and the Old City. Before booking, confirm that your chosen tour actually includes the Mount of Olives viewpoint and the stops you want; not every Jerusalem tour goes up the hill.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="mount-olives-tour-cards">
        <Link to="/tours/jerusalem/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm sm:p-4">
          <img src={guidedTourPhoto} alt="Guided sightseeing in Jerusalem" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Jerusalem guided tours</h3><p className="mt-1 text-sm text-muted-foreground">Compare independently operated walks and sightseeing days.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4"/></span></div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm sm:p-4">
          <img src={oldCityTourPhoto} alt="Jerusalem Old City skyline and historic walls" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Private driver for the day</h3><p className="mt-1 text-sm text-muted-foreground">Arrange drop-off at the viewpoint and pickup near Gethsemane.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Send an inquiry <ArrowUpRight className="h-4 w-4"/></span></div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Where is the best Mount of Olives viewpoint?", a: "The classic open-air panorama is near the Seven Arches Hotel on the ridge, overlooking the Jewish cemetery and Jerusalem's Old City." },
    { q: "How long should I allow?", a: "Around 30–45 minutes is enough for the panorama. Allow two to three hours for a downhill walk with selected churches, or half a day for a fuller pilgrimage route." },
    { q: "Is the Mount of Olives free to visit?", a: "The public viewpoint is free. Pater Noster currently lists ₪12 admission (₪10 for students), and the Chapel of the Ascension lists ₪10. Other sites have separate visiting arrangements." },
    { q: "Can I visit the churches on Sunday?", a: "Gethsemane and the Church of All Nations generally admit visitors on Sunday, and Dominus Flevit has split visiting hours. Pater Noster is closed Sunday, and St Mary Magdalene normally opens for visitors on Tuesday, Thursday and Saturday mornings." },
    { q: "Can I walk to the Old City after visiting?", a: "Yes. From Gethsemane at the foot of the hill, you can walk towards Lion's Gate. The downhill route from the upper viewpoint is steep and may be unsuitable for some visitors." },
    { q: "Is there a wheelchair-accessible route?", a: "The traditional downhill pilgrimage path is not a reliably step-free route. Consider separate vehicle approaches for the public viewpoint and Gethsemane, then confirm accessibility with each site." },
    { q: "Can I visit the Jewish cemetery?", a: "This is an active cemetery with separate sections, funerals and families visiting graves. Access depends on the section and purpose of your visit. The Mount of Olives Information Center currently reports a temporary closure to visitors." },
  ],
  nearby: [
    { label: "Jerusalem's Old City", to: "/attractions/old-city-jerusalem/", note: "Continue through Lion's Gate to historic quarters and sacred landmarks." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Dormition Abbey, the Cenacle and sites near Zion Gate." },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "Jordan River baptism site for a separate outing east of Jerusalem." },
    { label: "Masada National Park", to: "/attractions/masada/", note: "Ancient hilltop fortress for a longer desert day trip." },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "Oasis trails and the Dead Sea on a separate travel day." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "Roman ruins and the Mediterranean coast on another day." },
  ],
  planningLinks: [
    { label: "Jerusalem city guide", to: "/travel-blog/jerusalem-travel-guide/", description: "Plan your stay, neighbourhoods and transport.", icon: "region" },
    { label: "Churches in Jerusalem", to: "/travel-blog/churches-in-jerusalem/", description: "Explore other Christian pilgrimage sites.", icon: "region" },
    { label: "Day trips from Jerusalem", to: "/travel-blog/day-trips-from-jerusalem/", description: "Ideas for another day beyond the city.", icon: "region" },
    { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/", description: "Choose a hotel area and arrival plan.", icon: "region" },
    { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", description: "Compare airport rail, road and private transport.", icon: "arrival" },
    { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/", description: "Fit Jerusalem into a short holiday.", icon: "itinerary" },
  ],
  sources: [
    { label: "Christian Information Center — Holy Land church hours and fees", url: official.churchHours },
    { label: "City of David — Mount of Olives visitor access and buses", url: official.cemetery },
    { label: "Mount of Olives cemetery information", url: official.cemeteryGraves },
    { label: "Israel public transportation planner", url: official.transit },
    { label: "City of David — Jerusalem Trail route", url: official.jerusalemWalk },
  ],
};

export function MountOlivesAttractionPage() {
  return <AttractionDestinationPage content={mountOlivesDestinationContent}/>;
}
