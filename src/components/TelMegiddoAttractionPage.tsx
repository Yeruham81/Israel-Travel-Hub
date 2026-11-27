import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { telMegiddoSite } from "@/data/telMegiddoSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Tel%20Megiddo%20National%20Park%2C%20Road%2066%2C%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Tel%20Megiddo%20National%20Park%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Tel%20Megiddo%20National%20Park%2C%20Israel&travelmode=driving";

export const telMegiddoDestinationContent: AttractionDestinationContent = {
  path: "/attractions/tel-megiddo/",
  placeName: "Tel Megiddo",
  title: telMegiddoSite.title,
  region: telMegiddoSite.region,
  updatedAt: telMegiddoSite.updatedAt,
  hero: telMegiddoSite.hero,
  intro: telMegiddoSite.intro,
  visitorTitle: "Opening hours, admission and visitor information",
  visitorNavLabel: "Hours & tickets",
  historyTitle: "Megiddo through history and the Armageddon tradition",
  relatedTitle: "Explore more in the Jezreel Valley and Lower Galilee",
  contactIntroduction: "Tell me your travel date, pickup point, group size and the northern sites you want to visit. I can arrange a private day trip with a driver including Tel Megiddo.",
  facts: [
    { icon: "location", label: "Location", value: "Road 66, Jezreel Valley", note: "About 2 km northwest of Megiddo Junction" },
    { icon: "duration", label: "Time needed", value: "1.5–2 hours", note: "Longer with the film and full water-system route" },
    { icon: "admission", label: "Standard admission", value: telMegiddoSite.prices.adult + " adult", note: telMegiddoSite.prices.child + " child; other categories may differ" },
    { icon: "hours", label: "Regular opening", value: "08:00 daily", note: "Seasonal closing times; last entry 1 hour earlier" },
    { icon: "highlights", label: "World Heritage", value: "UNESCO since 2005", note: "One of the three Biblical Tels" },
    { icon: "access", label: "Water system", value: "Many steep steps", note: "Confirm its availability before descending" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The Canaanite and Israelite city gates"
        image={{ src: "/images/attractions/tel-megiddo-gate.webp", alt: "Massive ancient stone gate and paved approach at Tel Megiddo National Park" }}
      >
        <p>Megiddo's imposing stone gates reflect its strategic importance along ancient trade routes through the valley. The Canaanite gateway and later Israelite fortifications belong to different periods, even though they are close together on the visitor trail.</p>
        <p>Look at the thickness of the walls and the stone paving before moving farther into the mound. Information signs explain when the different structures were built.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Temples and many layers of ancient cities"
        image={{ src: "/images/attractions/tel-megiddo-city-layers.webp", alt: "Excavated stone foundations and archaeological trenches showing ancient occupation at Tel Megiddo" }}
      >
        <p>In the great excavation trench, successive layers reveal how the city was built and rebuilt over thousands of years. The sacred area contains the remains of Bronze Age temples, alongside foundations of buildings from other periods.</p>
        <p>I recommend taking a moment at the viewpoint over the excavation; understanding the layers makes the later buildings much easier to appreciate.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Stables, granary and daily life">
        <p>The buildings traditionally identified as stables contain stone troughs and features associated with keeping horses. A large circular stone-lined pit served as a granary, with grain remains helping archaeologists understand its use.</p>
        <p>Archaeologists debate the dates of some buildings and which kings commissioned them. The surviving structures help explain how the city managed transport, storage and administration.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The underground water system">
        <p>One of Tel Megiddo's most memorable sights is the water system: a deep rock-cut shaft and a tunnel leading towards a spring outside the ancient city walls. It allowed residents to collect water while remaining protected during a siege.</p>
        <p>The marked underground route has <strong>183 steps down</strong> to the shaft and <strong>80 steps up</strong> at the other end of the tunnel. You emerge at a different point from where you entered; follow the signed path back towards the Canaanite gate and the start of the visit.</p>
        <p>The descent is optional. If stairs or enclosed spaces are difficult for your group, follow the above-ground trail instead. Check with park staff that the underground section is open and where to rejoin your group.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The tell and its Jezreel Valley setting"
        image={{ src: "/images/attractions/tel-megiddo-aerial.webp", alt: "Aerial view of the ancient Tel Megiddo mound amid cultivated fields of the Jezreel Valley" }}
      >
        <p>From the elevated remains, look across the fields and the historic routes connecting the coastal plain with the inland valleys. Megiddo's location explains much of its wealth, military significance and repeated destruction and rebuilding.</p>
        <p>On a clear day, you can enjoy panoramic views over the valley associated with the biblical tradition of Armageddon.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Tel Megiddo is a managed national park with a visitor centre, museum displays and an introductory film. The Israel Nature and Parks Authority publishes seasonal hours, entry fees and advance visit coordination on the <a href={telMegiddoSite.sources.park} target="_blank" rel="noopener noreferrer" className={inlineLink}>official park page</a>.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="tel-megiddo-visitor-hours">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Summer, Sunday–Thursday and Saturday:</strong> {telMegiddoSite.hours.summerRegular}.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Summer, Friday:</strong> {telMegiddoSite.hours.summerFriday}.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Winter, Sunday–Thursday and Saturday:</strong> {telMegiddoSite.hours.winterRegular}.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Winter, Friday:</strong> {telMegiddoSite.hours.winterFriday}.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Last admission is one hour before closing.</strong> On some holiday eves, including Yom Kippur eve, the park has an earlier <strong>13:00 closing time</strong>. Holiday-eve opening hours can differ from Friday hours; confirm the schedule for your date on the official park page.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Admission and contact</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Published standard admission is <strong>{telMegiddoSite.prices.adult} per adult</strong> and <strong>{telMegiddoSite.prices.child} per child</strong>. Other reductions or group prices may apply.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">I recommend <a href={telMegiddoSite.sources.reserve} target="_blank" rel="noopener noreferrer" className={inlineLink}>booking your visit in advance through the official website</a>. You'll also receive updates about trail closures or changes to opening hours.</p>
          <p className="mt-3 text-sm"><strong>Phone: </strong><a href={"tel:" + telMegiddoSite.phoneHref} dir="ltr" className={inlineLink}>{telMegiddoSite.phone}</a></p>
          <p className="mt-1 text-sm"><strong>Email: </strong><a href={"mailto:" + telMegiddoSite.email} className={inlineLink}>{telMegiddoSite.email}</a></p>
          <a href={telMegiddoSite.sources.park} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official prices and hours <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="tel-megiddo-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Footwear:</strong> Wear comfortable shoes with grip for uneven archaeological surfaces and steps.</li>
          <li><strong>Weather:</strong> Much of the mound is open to the sun. Bring drinking water and sun protection in warmer months.</li>
          <li><strong>Accessibility:</strong> Parts of the park have adapted visitor routes, but not every excavation or underground section is step-free. Ask about the route that suits your needs.</li>
          <li><strong>Facilities:</strong> The official site lists a museum, explanatory film and visitor services near the entrance.</li>
        </ul>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The national park is on <strong>Road 66</strong>, roughly 2 km northwest of Megiddo Junction between Megiddo and Yokneam. Set your navigation to <strong>Tel Megiddo National Park</strong>.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Follow Route 66 towards the signed entrance of Tel Megiddo National Park. There is parking at the visitor centre. Allow time to check in and walk from the entrance to the excavated areas, especially if you have other northern Israel stops planned.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Driving directions to Tel Megiddo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Look for services to <strong>Megiddo Antiquities Junction (מסעף מגידו עתיקות, stop 55407)</strong> on Route 66. Route 56 is among the services listed for the area. Check which stop serves your direction, the safe walk to the entrance and the return timetable using the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. For several sites in one day, consider <Link to="/car-rental/" className={inlineLink}>renting a car</Link>, <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>comparing northern Israel tours</Link> or <a href="#contact" className={inlineLink}>arranging a private driver</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">Walking inside the park</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Follow the numbered, signposted visitor route around the mound. If you prefer to skip the underground tunnel, ask the park staff about the above-ground paths and accessible areas.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="tel-megiddo-location-map">
          <h3 className="text-sm font-semibold">Where is Tel Megiddo?</h3>
          <ConsentIframe title="Google Maps location of Tel Megiddo National Park near Megiddo Junction" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A rewarding visit to Tel Megiddo</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">Plan approximately <strong>1.5–2 hours</strong> for the museum introduction, ancient gates, excavations and viewpoints. Leave extra time if you watch the film, explore the whole marked route and enter the water system.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Begin at the visitor centre and museum to understand the sequence of cities.</li>
          <li>Follow the marked trail through the city gates, temples, granary and stables.</li>
          <li>Enjoy the valley viewpoints and choose whether to take the optional water-system route.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a self-guided visit, try the <a href="https://www.parks.org.il/category/megiddo-trip-talk/" target="_blank" rel="noopener noreferrer" className={inlineLink}>official Trip Talk audio guide</a>, with English explanations for stops including the gates, temples, granary and water system.</p>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Tel Megiddo with a northern Israel day trip</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">I recommend choosing three to five stops based on where you start and how long you'd like to spend at each. Here are some places that work well within a wider northern Israel itinerary:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Nazareth:</strong> See the <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>Basilica of the Annunciation</Link> and the views from <Link to="/attractions/mount-precipice/" className={inlineLink}>Mount Precipice</Link>.</li>
          <li><strong>Lower Galilee:</strong> Add <Link to="/attractions/mount-tabor/" className={inlineLink}>Mount Tabor</Link> and its Church of the Transfiguration.</li>
          <li><strong>Wider routes:</strong> <Link to="/attractions/caesarea/" className={inlineLink}>Caesarea</Link>, <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link> or <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link> may suit a journey continuing along the coast or towards the Sea of Galilee.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Megiddo occupied a strategic position above one of the great routes connecting Egypt with Syria and Mesopotamia. Over thousands of years, successive Canaanite and Israelite communities constructed new walls, temples, palaces and public buildings on the remains of earlier settlements.</p>
      <p>Its importance is reflected in accounts of ancient military campaigns, including the Egyptian pharaoh Thutmose III's battle near Megiddo in the fifteenth century BCE. The fortifications and buildings visitors see today date from different centuries, and archaeologists continue to debate some royal attributions.</p>
      <p>In the New Testament's Book of Revelation, <em>Armageddon</em> is associated with a gathering for a final battle. The name is commonly linked to the Hebrew <em>Har Megiddo</em>, or Mount Megiddo. That religious tradition is an important part of the site's cultural story, distinct from what archaeology can establish about the excavated city.</p>
      <p>Since 2005, Tel Megiddo has been part of the <a href={telMegiddoSite.sources.unesco} target="_blank" rel="noopener noreferrer" className={inlineLink}>UNESCO-listed Biblical Tels</a> property together with Hazor and Beer Sheba. The designation recognises the remarkable evidence for ancient urban life, major trade routes and sophisticated water systems.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Some northern Israel tours include Tel Megiddo, while others focus on Nazareth and the Sea of Galilee. Check whether the national park visit and admission are part of the itinerary, and whether there is time for the water system.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src="/images/attractions/nazareth-galilee.webp" alt="Artwork at a religious heritage site in Nazareth, on a northern Israel itinerary" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore northern Israel tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare routes and check which tours include Tel Megiddo.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={galileePhoto} alt="Green hills of northern Israel along a private day-trip route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Visit with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Plan the archaeological visit and other northern stops at your own pace.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "How much does Tel Megiddo cost?", a: "Standard admission is ₪31 for adults and ₪16 for children. Check the official price list for discounts and updates." },
    { q: "What are the opening hours?", a: "The park generally opens at 08:00. Summer closing is 17:00 (16:00 Fridays), while winter closing is 16:00 (15:00 Fridays). Last admission is one hour before closing, and holiday schedules can be shorter." },
    { q: "Should I reserve my visit?", a: "I recommend booking through the official park website to reserve a time and receive updates about your visit." },
    { q: "How long should I spend at Tel Megiddo?", a: "Allow roughly 1.5–2 hours for the main archaeological site, with extra time if you take the underground water-system route and watch the introductory film." },
    { q: "Can everyone visit the underground water system?", a: "No. The underground route has a steep descent and ascent. A surface route is available for visitors who prefer to skip it." },
    { q: "Can visitors who cannot use stairs still enjoy Tel Megiddo?", a: "Yes, there are adapted areas above ground. Ask the park which route is currently accessible and skip the underground steps if they are unsuitable." },
    { q: "Is Tel Megiddo the biblical Armageddon?", a: "The name Armageddon is widely associated with Megiddo in the Book of Revelation. The archaeological remains tell the documented history of ancient settlement and warfare; religious interpretations are a separate subject." },
    { q: "Can I get there by public transport?", a: "Bus services travel along Road 66 near Megiddo Antiquities Junction. Confirm the nearest stop, the safe final walk to the entrance and your return connection before travelling." },
  ],
  nearby: [
    { label: "Mount Precipice", to: "/attractions/mount-precipice/", note: "Take in the Jezreel Valley panorama outside Nazareth." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Visit Nazareth's best-known Christian sanctuary." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Church of the Transfiguration and hilltop views." },
    { label: "Caesarea", to: "/attractions/caesarea/", note: "Explore Roman and Crusader remains on the coast." },
    { label: "Magdala", to: "/attractions/magdala/", note: "First-century remains on the Sea of Galilee." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "A Jordan River baptism stop south of the lake." },
  ],
  planningLinks: [
    { label: "Sea of Galilee guide", to: "/attractions/sea-of-galilee/", description: "Explore Tiberias and the lakeside sites.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Build a balanced northern Israel day.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Make more time for archaeology and Galilee.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Consider seasonal weather and daylight.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare public transport and driving.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your first connections in Israel.", icon: "arrival" },
  ],
  sources: [
    { label: "Israel Nature and Parks Authority — Tel Megiddo National Park", url: telMegiddoSite.sources.park, note: "Official fees, opening hours, reservations, facilities, access and contact details." },
    { label: "Israel Nature and Parks Authority — visit coordination", url: telMegiddoSite.sources.reserve, note: "Official advance coordination system and visit updates." },
    { label: "UNESCO — Biblical Tels: Megiddo, Hazor, Beer Sheba", url: telMegiddoSite.sources.unesco, note: "World Heritage designation and significance of the ancient cities and water systems." },
    { label: "Israel Nature and Parks Authority — Megiddo water system", url: telMegiddoSite.sources.water, note: "Explanation of the underground engineering and the site's visitor route." },
  ],
};

export function TelMegiddoAttractionPage() {
  return <AttractionDestinationPage content={telMegiddoDestinationContent} />;
}
