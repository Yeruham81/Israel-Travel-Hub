import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { ViaDolorosaRouteMap } from "@/components/ViaDolorosaRouteMap";
import { ExternalTourCard } from "@/components/TourCatalog";
import { CuratedPartnerTourCard } from "@/components/CuratedPartnerTourCard";
import { tourProducts } from "@/data/registry";
import { viaDolorosaSite } from "@/data/viaDolorosaSite";
import guidedTourPhoto from "@/assets/home/guided-tour-card.webp";

const info = viaDolorosaSite;
const official = info.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const featuredWalks = tourProducts.filter(tour => tour.status === "published" && (
  tour.id === "jerusalem-old-city-walk" || tour.id === "jerusalem-private-oldcity-walk"
));
const stations = info.stations;
const gateDirections = "https://www.google.com/maps/dir/?api=1&destination=Lions%20Gate%20Jerusalem%20Israel&travelmode=walking";
/** Consecutive walking legs keep the detour to Stations VIII and IX explicit. */
const walkingLegs = [
  { title:"Stations I–V", detail:"Flagellation, Al-Wad and Stations III–V", origin:"Church of the Flagellation, Jerusalem, Israel", waypoints:["Station III Via Dolorosa, Jerusalem, Israel","Station IV Via Dolorosa, Jerusalem, Israel"], destination:"Station V Via Dolorosa, Jerusalem, Israel" },
  { title:"Stations V–VII", detail:"Simon of Cyrene, Veronica and Khan al-Zeit", origin:"Station V Via Dolorosa, Jerusalem, Israel", waypoints:["Station VI Via Dolorosa, Jerusalem, Israel"], destination:"Station VII Via Dolorosa, Jerusalem, Israel" },
  { title:"Stations VII–XIV", detail:"Station VIII, back through the VII junction, up to IX, then the Holy Sepulchre", origin:"Station VII Via Dolorosa, Jerusalem, Israel", waypoints:["Station VIII Via Dolorosa, Jerusalem, Israel","Station VII Via Dolorosa, Jerusalem, Israel","Station IX Via Dolorosa, Jerusalem, Israel"], destination:"Church of the Holy Sepulchre, Jerusalem, Israel" },
] as const;
const walkingLegUrl=(leg:typeof walkingLegs[number])=>"https://www.google.com/maps/dir/?api=1&travelmode=walking&origin="+encodeURIComponent(leg.origin)+"&destination="+encodeURIComponent(leg.destination)+"&waypoints="+leg.waypoints.map(encodeURIComponent).join("%7C");

export const viaDolorosaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/via-dolorosa/",
  placeName: "Via Dolorosa",
  title: info.title,
  heroTitle: "Via Dolorosa, Jerusalem: 14 Stations & How to Walk the Route",
  highlightsTitle: "What to see along the Via Dolorosa",
  region: info.region,
  updatedAt: info.updatedAt,
  hero: info.hero,
  intro: info.intro,
  visitorTitle: "Opening hours, admission and accessibility",
  visitorNavLabel: "Hours & access",
  historyTitle: "The Via Dolorosa through history and tradition",
  relatedTitle: "Continue exploring Jerusalem",
  itineraryFirst: true,
  itineraryBeforeHighlights: true,
  itineraryTitle: "How to walk the Via Dolorosa",
  contactIntroduction: "Tell me your Jerusalem pickup point, travel date, passengers and whether you want to combine the Via Dolorosa with other Old City landmarks. I can arrange private transport with a driver to a suitable gate and pickup after your walk.",
  facts: [
    { icon: "location", label: "Location", value: "Jerusalem's Old City", note: "Muslim and Christian Quarters" },
    { icon: "duration", label: "Time needed", value: "1–3 hours", note: "Allow longer for prayer and church interiors" },
    { icon: "admission", label: "Public route", value: "Free", note: "Some museums and chapels have separate admission" },
    { icon: "hours", label: "Best visiting time", value: "Morning", note: "Church hours and services vary" },
    { icon: "highlights", label: "Stations", value: "14 traditional stops", note: "Nine outdoors, five inside the Holy Sepulchre" },
    { icon: "access", label: "Walking", value: "Stone lanes and steps", note: "Slopes, crowds and narrow entrances" },
  ],
  glanceNote: <>Begin near the <a href={gateDirections} target="_blank" rel="noopener noreferrer" className={inlineLink}>Lion's Gate</a> approach and the <a href={official.walk} target="_blank" rel="noopener noreferrer" className={inlineLink}>first station at Al-Umariyya School</a>. The traditional route leads west through the markets to the <a href={official.holySepulchre} target="_blank" rel="noopener noreferrer" className={inlineLink}>Church of the Holy Sepulchre</a>. Its street stations are indicated by signs and Roman numerals.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight mobileImageFirst title="Stations I–II: the traditional starting area" image={{src:"/images/jerusalem/churches/flagellation.webp",alt:"Church of the Flagellation on Jerusalem's Via Dolorosa"}}>
        <p>The walk traditionally begins at the former Antonia area near <strong>Al-Umariyya School</strong>, where Station I recalls Jesus being condemned to death. The school is in use; pilgrims generally start at the street outside, depending on local access.</p>
        <p>Across the street, the Franciscan compound contains the <strong>Chapel of the Condemnation</strong> and the <strong>Church of the Flagellation</strong> associated with Station II. Look for the numbered mark on the exterior wall.</p>
        <p><a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the Flagellation church visiting hours</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Ecce Homo Arch and the Lithostrotos" image={{src:"/images/jerusalem/churches/ecce-homo.webp",alt:"Ecce Homo Basilica along Jerusalem's traditional Via Dolorosa route"}}>
        <p>Continue past the historic <strong>Ecce Homo Arch</strong>. The Sisters of Notre Dame de Sion maintain the nearby Ecce Homo Basilica and the ancient pavement known as the <em>Lithostrotos</em>. These Roman-era remains add archaeological context to the pilgrimage route.</p>
        <p>The arch and pavement acquired their Christian associations over time. Their location illustrates how the traditions of the Passion became connected to Jerusalem's changing streets.</p>
        <p><a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check Ecce Homo opening hours</a> before planning an interior visit.</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Stations III–V: the turn at Al-Wad" image={{src:"/images/attractions/via-dolorosa-stations-3-5.svg",alt:"Illustration showing the Roman-numeral markers for Stations III to V"}}>
        <p>At the junction of Via Dolorosa and Al-Wad Street, Station III marks the traditional first fall. A Polish Catholic chapel stands nearby. A few steps farther south, Station IV recalls Jesus meeting Mary at the Armenian Catholic Church of Our Lady of Sorrows.</p>
        <p>At Station V, beside the turn back toward the west, a Franciscan oratory commemorates <strong>Simon of Cyrene</strong> carrying the cross. Watch for the Roman-numeral markers at each doorway and corner.</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Stations VI–IX: market lanes and the approach to Calvary" image={{src:"/images/attractions/via-dolorosa-stations-6-9.svg",alt:"Illustration of the market passage and Stations VI to IX, including the side-lane detour"}}>
        <p>Follow the westward lane past the traditional place where <strong>Veronica</strong> wiped Jesus' face (VI). At the Khan al-Zeit market junction, Station VII recalls the second fall. Station VIII is marked on a wall along the Al-Khanqa lane, commemorating Jesus speaking to the women of Jerusalem.</p>
        <p>Station IX is near the <strong>Coptic Orthodox monastery</strong> above the Holy Sepulchre precinct. This stop involves a short detour away from the main market passage. From there, continue toward the church entrance.</p>
        <p><a href={official.stations} target="_blank" rel="noopener noreferrer" className={inlineLink}>See the Franciscan station descriptions</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight mobileImageFirst title="Stations X–XIV: inside the Church of the Holy Sepulchre" image={{src:"/images/attractions/old-jerusalem-holy-sepulchre.webp",alt:"Inside the Church of the Holy Sepulchre in Jerusalem"}}>
        <p>The final five stations are commemorated inside the church: Jesus being stripped of his garments (X), nailed to the cross (XI), dying on the cross (XII), taken down from the cross (XIII), and laid in the tomb (XIV).</p>
        <p>At <strong>Calvary</strong>, visitors climb to the elevated chapels associated with the crucifixion. <strong>Station XIII</strong> is marked by the Latin altar of Our Lady of Sorrows, between the preceding stations. The nearby <strong>Stone of Anointing</strong>, downstairs, recalls preparation for burial, and the <strong>Edicule</strong> encloses the traditional tomb. Allow additional time for worship and queues.</p>
        <p><a href={official.holySepulchre} target="_blank" rel="noopener noreferrer" className={inlineLink}>Holy Sepulchre sanctuary information</a>.</p>
      </AttractionHighlight>
      <AttractionPracticalTip>Look up above shopfronts and doorways for the Roman-numeral station markers. The street section is a working market as well as a pilgrimage route.</AttractionPracticalTip>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>The traditional walk follows approximately 600 metres of Old City lanes, with turns, slopes and individual station markers. These visiting options allow time to pause at the landmarks and enter the Holy Sepulchre.</p>
      <div className="grid gap-3 md:grid-cols-3" data-testid="via-dolorosa-visit-choices">
        <article className="rounded-xl border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">About 45–60 minutes</p><h3 className="mt-2 text-lg font-semibold">Walk the street stations</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start near Al-Umariyya School, follow Stations I–IX through the market streets, and reach the Holy Sepulchre entrance.</p></article>
        <article className="rounded-xl border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">About 1.5–2 hours</p><h3 className="mt-2 text-lg font-semibold">All fourteen stations</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Follow the outside stations and continue into Calvary and the Holy Sepulchre, allowing time for brief pauses and the tomb shrine.</p></article>
        <article className="rounded-xl border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">2.5–3 hours or more</p><h3 className="mt-2 text-lg font-semibold">A deeper pilgrimage visit</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Include the Flagellation chapels, Ecce Homo, archaeological remains and a longer visit to the Holy Sepulchre.</p></article>
      </div>
      <ViaDolorosaRouteMap />
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="via-dolorosa-station-table">
        <h3 className="font-serif text-xl font-semibold">All 14 Stations of the Cross</h3>
        <p className="mt-2 text-sm text-muted-foreground">The locations follow the traditional devotional route. The last five stations are inside the Holy Sepulchre.</p>
        <div role="region" tabIndex={0} aria-label="Fourteen Via Dolorosa stations" className="mt-3 max-w-full overflow-x-auto rounded-lg border focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <caption className="sr-only">All fourteen Stations of the Cross and their traditional locations</caption>
            <thead className="bg-secondary/60"><tr><th scope="col" className="w-16 border-b px-3 py-3 font-semibold">No.</th><th scope="col" className="border-b px-3 py-3 font-semibold">Traditional event</th><th scope="col" className="border-b px-3 py-3 font-semibold">Where to look</th></tr></thead>
            <tbody>{stations.map(station=><tr key={station.n} className="border-b last:border-b-0"><th scope="row" className="px-3 py-3 align-top font-semibold">{station.n}</th><td className="px-3 py-3 align-top">{station.name}</td><td className="px-3 py-3 align-top">{station.place}<span className="mt-1 block text-xs text-muted-foreground">{station.note}</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <h3 className="font-serif text-xl font-semibold">Follow the route in three walking legs</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">Open each Google Maps leg in order. The final leg visits Station VIII, returns to the Station VII market junction, then follows the steps toward Station IX by the Coptic monastery before continuing to the Holy Sepulchre. Follow the numbered wall markers at each junction.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="via-dolorosa-walking-connections">
        {walkingLegs.map((leg, i) => <a key={leg.title} href={walkingLegUrl(leg)} target="_blank" rel="noopener noreferrer" className="rounded-xl border bg-card p-4 text-sm hover:border-primary/50">
          <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">Leg {i + 1} of 3</span>
          <span className="mt-1 block font-semibold text-primary">{leg.title} <ArrowUpRight className="inline size-4" aria-hidden="true"/></span>
          <span className="mt-2 block leading-relaxed text-muted-foreground">{leg.detail}</span>
        </a>)}
      </div>
      <p className="text-sm leading-relaxed">For arrival and departure, use <a className={inlineLink} href={gateDirections} target="_blank" rel="noopener noreferrer">Lion's Gate directions</a> and <a className={inlineLink} href="https://www.google.com/maps/dir/?api=1&origin=Church%20of%20the%20Holy%20Sepulchre%20Jerusalem&destination=Jaffa%20Gate%20Jerusalem&travelmode=walking" target="_blank" rel="noopener noreferrer">Holy Sepulchre to Jaffa Gate</a>.</p>
      <AttractionPracticalTip>For the full pilgrimage walk, plan your visit around the Holy Sepulchre's visiting hours and any services taking place there. Allow more time on Fridays and religious holidays.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The outdoor Stations of the Cross run along public Old City streets and are free to follow. Churches, chapels and museums along the route operate on their own schedules.</p>
      <div role="region" tabIndex={0} aria-label="Via Dolorosa admission and visiting hours" data-testid="via-dolorosa-hours" className="max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[790px] border-collapse text-left text-sm">
          <caption className="sr-only">Via Dolorosa visiting hours and admission arrangements</caption>
          <thead className="bg-secondary/60"><tr>{["Site", "Published visiting hours", "Admission", "Information"].map(x=><th key={x} scope="col" className="border-b px-3 py-3 font-semibold">{x}</th>)}</tr></thead>
          <tbody>
            <tr className="border-b"><th scope="row" className="px-3 py-3 align-top font-semibold">Via Dolorosa streets</th><td className="px-3 py-3 align-top">Public walking route throughout the day</td><td className="px-3 py-3 align-top">Free</td><td className="px-3 py-3 align-top">Look for station markers and shopfronts along the way</td></tr>
            <tr className="border-b"><th scope="row" className="px-3 py-3 align-top font-semibold">Church of the Flagellation</th><td className="px-3 py-3 align-top">07:00–18:00 summer / until 17:00 winter</td><td className="px-3 py-3 align-top">Check at church</td><td className="px-3 py-3 align-top"><a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Current sanctuary hours</a></td></tr>
            <tr className="border-b"><th scope="row" className="px-3 py-3 align-top font-semibold">Ecce Homo Basilica & Lithostrotos</th><td className="px-3 py-3 align-top">08:00–17:00</td><td className="px-3 py-3 align-top">Confirm at entrance</td><td className="px-3 py-3 align-top"><a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>CIC visiting information</a></td></tr>
            <tr className="border-b"><th scope="row" className="px-3 py-3 align-top font-semibold">Terra Sancta Museum</th><td className="px-3 py-3 align-top">Tue–Sun 09:00–18:00 summer / 09:00–17:00 winter; Mon 14:00–18:00 summer / 14:00–17:00 winter. Last admission 30 minutes before closing.</td><td className="px-3 py-3 align-top">₪30 Via Dolorosa Experience; ₪40 museum tour; ₪50 combined ticket (standard admission)</td><td className="px-3 py-3 align-top"><a href={official.flagellationMuseum} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official hours and tickets</a></td></tr>
            <tr><th scope="row" className="px-3 py-3 align-top font-semibold">Church of the Holy Sepulchre</th><td className="px-3 py-3 align-top">Open daily, with seasonal opening times and religious services</td><td className="px-3 py-3 align-top">General entry free</td><td className="px-3 py-3 align-top"><a href={official.churchHours} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check current church hours</a></td></tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="via-dolorosa-friday">
        <h3 className="font-serif text-xl font-semibold">Friday Franciscan Way of the Cross</h3>
        <p className="mt-2 text-sm leading-relaxed">The Franciscans regularly lead a Friday devotional procession along the Via Dolorosa, beginning at the Church of the Flagellation. The <a href={official.procession} target="_blank" rel="noopener noreferrer" className={inlineLink}>Christian Information Center's published schedule</a> lists <strong>16:00 in summer and 15:00 in winter</strong>. Confirm arrangements for your date, especially during Holy Week and major religious observances.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="via-dolorosa-accessibility">
        <h3 className="font-serif text-xl font-semibold">Accessibility and families</h3>
        <div className="mt-3 grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
          <p><strong>Underfoot:</strong> Expect uneven or polished stone paving, steps, sloping lanes and busy market intersections. Use comfortable shoes and allow time for pauses.</p>
          <p><strong>Wheelchairs and strollers:</strong> Some street segments are more manageable than others. Narrow chapel entrances, the Station IX approach and the raised Calvary chapels may require adapted plans.</p>
          <p><strong>With children:</strong> Choose a shorter route focusing on the major visible stations and the church exterior, with breaks in the Christian Quarter.</p>
          <p><strong>Prayer spaces:</strong> Respect services and posted photography instructions. Groups should coordinate private prayer or religious services separately where necessary.</p>
        </div>
        <p className="mt-3 text-sm"><Link to="/attractions/old-city-jerusalem/" className={inlineLink}>My Old City guide</Link> explains entrance gates, accessible approaches and nearby facilities.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Begin near the eastern end of Via Dolorosa by Lion's Gate and the Flagellation church. Damascus Gate also offers an approach through the Muslim Quarter markets. For a private drop-off, agree on the closest road-accessible gate.</p>
      <div className="grid gap-3 md:grid-cols-3" data-testid="via-dolorosa-arrival">
        <article className="rounded-xl border bg-card p-4"><div className="flex items-center gap-2"><Footprints className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">On foot</h3></div><p className="mt-2 text-sm leading-relaxed">From Lion's Gate, walk west toward the Flagellation church and Station I. From Damascus Gate, walk through the market lanes toward the eastern Via Dolorosa.</p></article>
        <article className="rounded-xl border bg-card p-4"><div className="flex items-center gap-2"><BusFront className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Public transport</h3></div><p className="mt-2 text-sm leading-relaxed">Jerusalem's light rail serves the northern approaches near Damascus Gate. Use the <a href={official.transit} target="_blank" rel="noopener noreferrer" className={inlineLink}>journey planner</a> to choose your station and continue on foot.</p></article>
        <article className="rounded-xl border bg-card p-4"><div className="flex items-center gap-2"><CarFront className="size-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Taxi or private driver</h3></div><p className="mt-2 text-sm leading-relaxed">Arrange a drop-off near Lion's Gate or another suitable road approach. For a visit ending near the Holy Sepulchre, plan pickup near Jaffa Gate or New Gate; <a href="#contact" className={inlineLink}>contact me</a> with your dates and hotel.</p></article>
      </div>
      <AttractionPracticalTip>Starting and ending at different gates is usually convenient: begin near Lion's Gate and finish with a walk through the Christian Quarter toward New Gate or Jaffa Gate.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p><strong>Via Dolorosa</strong> means the “Sorrowful Way.” The traditional fourteen Stations of the Cross commemorate episodes in the Christian accounts and devotional retellings of Jesus' path to crucifixion, death and burial.</p>
      <p>Christian pilgrims have followed changing routes across Jerusalem for many centuries. Franciscan devotion helped establish the station tradition, while the familiar itinerary and its markers developed gradually through medieval and later periods. The streets and buildings visible today belong to several chapters of Jerusalem's history.</p>
      <p>The route's meaning is principally devotional: the exact first-century path and the location of Pilate's judgment cannot be identified with certainty from the present street pattern. The Franciscan <a href={official.stations} target="_blank" rel="noopener noreferrer" className={inlineLink}>Terra Sancta Museum station guide</a> explains the history and associated chapels in detail.</p>
      <p>The <Link to="/travel-blog/churches-in-jerusalem/" className={inlineLink}>Jerusalem churches guide</Link> places the Via Dolorosa beside other Christian sites across the city, while my <Link to="/attractions/old-city-jerusalem/" className={inlineLink}>Old City visitor guide</Link> covers the surrounding quarters and markets.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>These guided Jerusalem walks cover Old City heritage and sections of the Via Dolorosa. Check each operator's exact Stations of the Cross itinerary, meeting point and available dates before choosing.</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="via-dolorosa-tour-cards">
        {featuredWalks.map(tour => <ExternalTourCard key={tour.id} tour={tour} pageId="attractions-via-dolorosa" compact />)}
        <li className="h-full min-w-0">
          <CuratedPartnerTourCard
            title="Jerusalem Classic Tour: Mount of Olives & Old City"
            description="A longer guided Jerusalem day combining the Mount of Olives with historic and religious sites inside the Old City."
            platform="Viator"
            duration="About 7 hours"
            image={guidedTourPhoto}
            alt="Guided walking experience in Jerusalem"
            href="https://viator.tpk.lv/YV4HrN5E"
            pageId="attractions-via-dolorosa"
            productId="viator-208675P3"
            offerId="viator-208675P3-via-dolorosa"
            editorialRating={{value:5,count:3}}
            editorialPrice={{amount:122.62,currency:"EUR",basis:"per_person"}}
          />
        </li>
      </ul>
      <p className="text-sm leading-relaxed"><Link to="/tours/jerusalem/" className={inlineLink}>Browse additional Jerusalem guided walks</Link>. For transport to and from the Old City, I can help with a <Link to="/private-driver-in-israel/" className={inlineLink}>private driver</Link>.</p>
    </div>
  ),
  faqs: [
    {q:"Where does the Via Dolorosa begin and end?",a:"The traditional starting point is near Al-Umariyya School and the Church of the Flagellation close to Lion's Gate. The route ends at the Church of the Holy Sepulchre in the Christian Quarter."},
    {q:"How many Stations of the Cross are on the Via Dolorosa?",a:"Fourteen traditional stations: nine along the streets of the Old City and the final five inside the Church of the Holy Sepulchre."},
    {q:"How long does it take to walk the Via Dolorosa?",a:"Allow about 45–60 minutes for the outdoor route, 1.5–2 hours with brief visits to the final five stations, or more time for chapels, exhibitions and prayer."},
    {q:"Is the Via Dolorosa free?",a:"Walking the public street stations and entering the Holy Sepulchre is generally free. Some museums, exhibitions and associated facilities charge separately."},
    {q:"When is the Friday Stations of the Cross procession?",a:"The Christian Information Center currently publishes a regular Franciscan procession at 16:00 in summer and 15:00 in winter, beginning at the Church of the Flagellation. Confirm local arrangements on the intended day."},
    {q:"Which gate is best for the Via Dolorosa?",a:"Lion's Gate is a convenient approach to the early stations. Damascus Gate offers access through the Muslim Quarter; Jaffa Gate or New Gate work well when finishing near the Holy Sepulchre."},
    {q:"Can I follow the Via Dolorosa with a wheelchair or stroller?",a:"Some sections are possible, depending on the route and mobility equipment, but steps, slopes, narrow entrances and busy lanes are common. Plan individual stops and check accessible access to the Holy Sepulchre in advance."},
  ],
  nearby: [
    {label:"Jerusalem's Old City",to:"/attractions/old-city-jerusalem/",note:"See the city gates, four quarters and major landmarks around the walk."},
    {label:"Mount of Olives",to:"/attractions/mount-of-olives/",note:"Visit Gethsemane and the traditional pilgrimage sites east of the walls."},
    {label:"Mount Zion",to:"/attractions/mount-zion/",note:"Explore the Last Supper tradition and churches south of the Old City."},
    {label:"Churches in Jerusalem",to:"/travel-blog/churches-in-jerusalem/",note:"Find other Christian sites, opening hours and nearby churches."},
    {label:"Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/",note:"Plan your city stay and wider Jerusalem sightseeing."},
    {label:"Museums in Jerusalem",to:"/travel-blog/museums-in-jerusalem/",note:"Explore the history, art and archaeology of Jerusalem."},
  ],
  planningLinks: [
    {label:"Where to stay in Jerusalem",to:"/travel-blog/where-to-stay-in-jerusalem/",description:"Choose a base within easy reach of the Old City.",icon:"region"},
    {label:"Israel's calendar of events",to:"/travel-blog/calendar-of-events/",description:"Plan around religious services and major holidays.",icon:"region"},
    {label:"Getting around Israel",to:"/travel-blog/getting-around-israel/",description:"Compare local transport and travel arrangements.",icon:"transport"},
    {label:"Ben Gurion Airport to Jerusalem",to:"/travel-blog/ben-gurion-airport-to-jerusalem/",description:"Arrive in Jerusalem by road or train.",icon:"arrival"},
    {label:"Jerusalem guided tours",to:"/tours/jerusalem/",description:"Explore guided sightseeing and heritage walks.",icon:"region"},
    {label:"Private driver in Israel",to:"/private-driver-in-israel/",description:"Arrange convenient drop-off and pickup for an Old City visit.",icon:"transport"},
  ],
  sources: [
    {label:"Franciscan Terra Sancta Museum - the fourteen Stations of the Sorrowful Way",url:official.stations},
    {label:"Enjoy Jerusalem - Via Dolorosa Stations I–IX",url:official.walk},
    {label:"Christian Information Center - shrine opening hours",url:official.churchHours},
    {label:"Christian Information Center - Friday procession schedule",url:official.procession},
    {label:"Custody of the Holy Land - Holy Sepulchre sanctuary",url:official.holySepulchre},
    {label:"Terra Sancta Museum - museum and exhibition information",url:official.flagellationMuseum},
    {label:"Christian Information Center - Jerusalem pilgrimage walk",url:official.cityGuide},
    {label:"The Jerusalem Foundation - Via Dolorosa access restoration",url:official.mobility},
  ],
};

export function ViaDolorosaAttractionPage() {
  return <AttractionDestinationPage content={viaDolorosaDestinationContent}/>;
}
