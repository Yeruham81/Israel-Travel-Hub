import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import { AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip, type AttractionDestinationContent } from "@/components/AttractionDestinationPage";
import capernaumPhoto from "@/assets/guides/capernaum.jpg";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const visitSources = {
  franciscan: "https://www.cicts.org/our-services/",
  archaeology: "https://www.custodia.org/en/sanctuaries/capernaum/",
  orthodox: "https://capernaum.info/opening-hours-and-contacts/",
  park: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/",
  parkHebrew: "https://www.parks.org.il/reserve-park/%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9B%D7%A4%D7%A8-%D7%A0%D7%97%D7%95%D7%9D/",
};

const visitorAreas = [
  {
    name: "Franciscan archaeological site",
    details: <><strong>₪10</strong> admission. <strong>08:00–12:00</strong> (last entry 11:40) and <strong>14:00–17:00</strong> (last entry 16:30). Holiday closures and shortened hours apply.</>,
    source: "Christian Information Center",
    url: visitSources.franciscan,
  },
  {
    name: "Greek Orthodox monastery",
    details: <>Visits <strong>by prior phone arrangement</strong> with the monastery's superior. Separate access and religious-service schedules.</>,
    source: "Monastery visitor information",
    url: visitSources.orthodox,
  },
  {
    name: "National park / marine terminal",
    details: <>Free access to the <strong>marine-terminal visitor area</strong> without prior booking, according to the park authority. Separate park hours and rules.</>,
    source: "Israel Nature and Parks Authority",
    url: visitSources.park,
  },
] as const;

/** Approximate ancient-site marker from OpenStreetMap (way 551062314). */
const openStreetMapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=35.549%2C32.861%2C35.603%2C32.898&layer=mapnik&marker=32.88069%2C35.57552";
const openStreetMapLarger = "https://www.openstreetmap.org/?mlat=32.88069&mlon=35.57552#map=14/32.88069/35.57552";

const page: AttractionDestinationContent = {
  path: "/attractions/capernaum/",
  placeName: "Capernaum",
  title: "Capernaum (Kfar Nahum): Visitor Guide",
  region: "Sea of Galilee",
  historyTitle: "History and biblical significance",
  relatedTitle: "Explore related sites",
  updatedAt: "2026-11-16",
  hero: {
    src: capernaumPhoto,
    alt: "Basalt village remains and part of the ancient limestone synagogue at Capernaum, beside the Sea of Galilee",
  },
  intro: "On the northwestern shore of the Sea of Galilee, Capernaum preserves the remains of a Jewish village closely associated with Jesus' ministry. Visit the ancient synagogue and the traditional site of Peter's house, then discover the nearby Greek Orthodox monastery and Kfar Nahum National Park along the lakeshore.",
  facts: [
    { icon: "location", label: "Location", value: "Northern Sea of Galilee", note: "Near Route 87, east of Route 90" },
    { icon: "duration", label: "Time needed", value: "60–90 minutes", note: "At the main archaeological site" },
    { icon: "admission", label: "Entry fee", value: "₪10", note: "Franciscan archaeological site" },
    { icon: "hours", label: "Opening hours", value: "08:00–12:00 / 14:00–17:00", note: "Last entry 11:40 / 16:30" },
    { icon: "highlights", label: "Highlights", value: "Synagogue & Peter's house", note: "Inside the Franciscan site" },
    { icon: "access", label: "Other places", value: "Separate entrances", note: "Orthodox monastery and park" },
  ],
  glanceNote: <>The hours and ₪10 fee above apply <strong>only to the Franciscan archaeological site</strong>. The Orthodox monastery and national park have their own visiting arrangements.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The ancient synagogue"
        image={{ src: "/images/attractions/capernaum-synagogue.webp", alt: "Visitors beside the white limestone synagogue walls and columns at Capernaum" }}
      >
        <p>White limestone columns and carved details stand out against the darker basalt of the village. This is the best-known archaeological landmark at Capernaum.</p>
        <p>The synagogue visible today is generally dated to the fifth century, much later than the time of Jesus. Earlier archaeological levels lie beneath it.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The traditional House of Peter"
        image={{ src: "/images/attractions/capernaum-peters-house.webp", alt: "Basalt dwelling remains and the elevated modern memorial above the traditional House of Peter at Capernaum" }}
      >
        <p>Excavated rooms near the synagogue are traditionally associated with the apostle Peter. Christian worship developed here over centuries, and a Byzantine octagonal church later enclosed part of the earlier site.</p>
        <p>The modern memorial church rises above the excavations, allowing visitors to see the remains below. The identification as Peter's personal home is a matter of tradition, not proven archaeological certainty.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The basalt houses of the old village">
        <p>Take a few minutes to explore the low stone walls and courtyards between the main monuments. These domestic remains show the scale and layout of the settlement that stood beside the lake.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The Greek Orthodox Church of the Twelve Apostles">
        <p>The neighbouring Greek Orthodox monastery is recognisable by its red-domed church and peaceful grounds. It is separate from the Franciscan archaeological site and offers a different religious and architectural experience.</p>
        <p><strong>Visits must be arranged in advance</strong> with the monastery. Do not assume that a ticket for the ruins also provides admission here.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The national park and the lakeshore">
        <p>Kfar Nahum National Park is a separately managed visitor area near the excavations. It includes lakeside space and a marine terminal, with its own hours and entry rules. The park authority lists free access to the terminal area without advance booking.</p>
        <p>Swimming is not permitted within the national park. Check signs on site and enjoy the views from the shore instead.</p>
      </AttractionHighlight>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-4">
      <p>Known in Hebrew as Kfar Nahum (“village of Nahum”), Capernaum was a lakeside Jewish settlement during the Roman period. The New Testament describes Jesus teaching and healing here, including events associated with the synagogue and Peter's house (Mark 1:21–31).</p>
      <div className="grid gap-4 rounded-xl border bg-secondary/20 p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-start sm:p-5">
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold">How the site changed over time</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
            <li><strong>Roman period:</strong> A village of basalt houses stood beside the lake.</li>
            <li><strong>Early Christian period:</strong> One domestic complex became a place of veneration according to the archaeological interpretation.</li>
            <li><strong>Byzantine period:</strong> The monumental limestone synagogue and an octagonal church reflect later religious life.</li>
            <li><strong>Today:</strong> Visitors can compare the excavated layers with the modern memorial built over the traditional House of Peter.</li>
          </ul>
        </div>
        <img src="/images/attractions/capernaum-peter-memorial-interior.webp" alt="Archaeological rooms visible through the floor of the modern memorial above Peter's traditional house" width={640} height={480} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover" />
      </div>
      <p className="text-sm text-muted-foreground">Biblical tradition explains why Capernaum became a pilgrimage destination; the visible ruins and their dates must be interpreted separately from those traditions.</p>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>There are three different places to enter in the Capernaum area. The table below compares their published visiting arrangements.</p>
      <div className="grid gap-3 md:hidden" data-testid="capernaum-mobile-visitor-cards">
        {visitorAreas.map(site => <article key={site.name} className="rounded-xl border bg-card p-4">
          <h3 className="text-base font-semibold">{site.name}</h3>
          <p className="mt-2 text-sm leading-relaxed">{site.details}</p>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{site.source}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>)}
      </div>
      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse text-left text-sm" data-testid="capernaum-visitor-table">
          <thead className="bg-secondary/70"><tr>
            <th scope="col" className="w-[26%] px-4 py-3 font-bold">Visitor area</th>
            <th scope="col" className="px-4 py-3 font-bold">Admission and visiting rules</th>
            <th scope="col" className="w-[26%] px-4 py-3 font-bold">Official information</th>
          </tr></thead>
          <tbody className="divide-y">{visitorAreas.map(site => <tr key={site.name}>
            <th scope="row" className="px-4 py-3 align-top font-semibold">{site.name}</th>
            <td className="px-4 py-3 align-top leading-relaxed">{site.details}</td>
            <td className="px-4 py-3 align-top"><a href={site.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{site.source}</a></td>
          </tr>)}</tbody>
        </table>
      </div>
      <AttractionPracticalTip>
        <strong>Plan around the midday break.</strong> I recommend visiting the Franciscan site in the morning or after 14:00. Its gates close from 12:00 to 14:00, so arriving at lunchtime can disrupt the rest of your Galilee itinerary.
      </AttractionPracticalTip>
      <AttractionPracticalTip>
        <strong>Check Christian and Jewish holiday dates.</strong> The Franciscan compound is closed on Christmas Day, New Year's Day, Easter Sunday and Yom Kippur, with reduced hours on certain other religious dates. Verify the official schedule shortly before travelling.
      </AttractionPracticalTip>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
        <li><strong>Clothing:</strong> Choose respectful dress for churches and sacred spaces.</li>
        <li><strong>Comfort:</strong> Wear shoes suitable for uneven stones; bring drinking water and sun protection.</li>
        <li><strong>Accessibility:</strong> The national park publishes information for its own facilities, but this does not establish step-free access throughout the archaeological and monastery grounds. Ask the relevant operator.</li>
        <li><strong>Orthodox monastery:</strong> Arrange a visit with the superior by phone at <a href="tel:+972532840991" className="font-semibold text-primary underline underline-offset-4">+972 53 284 0991</a>.</li>
      </ul>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Capernaum is on the <strong>northwestern shore of the Sea of Galilee</strong>, northeast of Tiberias. The Franciscan ruins, Orthodox monastery and national park are close to one another, but have <strong>different entrances</strong>.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Route 90, turn east onto <strong>Route 87</strong> and follow signs to Capernaum (about 4 km from the junction). The site can also be approached from Route 92 along the eastern side of the lake. Choose the <strong>exact site entrance</strong> in your navigation app.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Getting here by bus may be possible, but infrequent services and the walk to the entrance make it inconvenient. <strong>I recommend a car, taxi, or prearranged group or private tour</strong> for an easier visit, especially when combining several lakeside sites.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="capernaum-location-map">
          <h3 className="text-sm font-semibold">Where is Capernaum?</h3>
          <iframe title="OpenStreetMap showing the archaeological site of Capernaum by the Sea of Galilee" src={openStreetMapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={openStreetMapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-4 hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          <p className="mt-1 text-xs text-muted-foreground">Map: OpenStreetMap contributors · The pin marks the archaeological site, not every nearby entrance.</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed">If you are staying in Tiberias, this is a convenient stop on a northern-lake itinerary. For a wider look at the region, see my <Link to="/travel-blog/sea-of-galilee/" className="font-semibold text-primary underline underline-offset-4">Sea of Galilee visitor guide</Link>.</p>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A short visit: 60–90 minutes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Start with the <strong>white limestone synagogue</strong> and its carved details.</li>
          <li>Continue to the <strong>traditional House of Peter</strong> and look towards the remains beneath the modern memorial.</li>
          <li>Walk past the <strong>basalt village foundations</strong> and enjoy the lakeside setting.</li>
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A half-day on the northern Sea of Galilee</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Begin with the archaeological site at <strong>Capernaum</strong>.</li>
          <li>Drive to <Link to="/attractions/tabgha/" className="font-semibold text-primary underline underline-offset-4">Tabgha</Link> for its mosaic and lakeside churches.</li>
          <li>Continue to the <Link to="/attractions/mount-of-beatitudes/" className="font-semibold text-primary underline underline-offset-4">Mount of Beatitudes</Link> for a peaceful hilltop church and lake views.</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">Add the Greek Orthodox monastery only if you have arranged a visit. Allow time for opening hours and short drives between the sites.</p>
      </div>
      <AttractionPracticalTip>
        <strong>My lakeside-break suggestion:</strong> If you find a public bench or permitted seating area overlooking the lake, a light picnic or snack can be a pleasant pause between visits. Respect the rules of the religious compounds and national park, and take all litter with you.
      </AttractionPracticalTip>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Galilee day tours may include Capernaum alongside Nazareth, Tabgha or the Mount of Beatitudes. Choose a trip that <strong>explicitly lists Capernaum as a stop</strong> and check its departure city, time on site, guiding language and admission arrangements.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="capernaum-galilee-tours-card">
          <img src="/images/attractions/sea-of-galilee.webp" alt="Sea of Galilee landscape representing guided visits around its northern shore" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Compare guided Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Browse local and full-day options. Check which stops are included and compare prices on the tour pages.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <Link to="/private-driver/" className="group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="capernaum-private-driver-card">
          <img src={galileePhoto} alt="Green hills above the Sea of Galilee on a northern Israel day-trip route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">I can help arrange a car and flexible stops that fit your day. Professional guiding can be arranged separately.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Private journeys <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
      </div>
    </div>
  ),
  faqs: [
    { q: "Are Capernaum and Kfar Nahum the same place?", a: "Yes. Kfar Nahum is the Hebrew name of Capernaum, on the northwestern shore of the Sea of Galilee." },
    { q: "Do I need to book admission to the archaeological site?", a: "The Franciscan compound publishes an entrance fee, opening hours and last-entry times; individual visits are generally arranged at the entrance. Check current holiday and group rules with the Christian Information Center before arriving." },
    { q: "Is one ticket valid for all parts of Capernaum?", a: "No. The Franciscan ruins, Orthodox monastery and national park visitor area are separately managed. The monastery asks for advance phone arrangements." },
    { q: "Is the synagogue standing today from the time of Jesus?", a: "No. The monumental white limestone building is generally dated to the fifth century, with older archaeological layers below it." },
    { q: "Can I combine Capernaum with Nazareth in one day?", a: "Yes, if you have a vehicle or suitable prearranged tour. Capernaum combines naturally with Tabgha and the Mount of Beatitudes; Nazareth adds travel and sightseeing time, so plan a realistic route." },
    { q: "Is a public bus a convenient way to visit?", a: "Usually not. Some connections are possible, but stops can be far from the entrance and buses are not frequent. A car, taxi or organised day trip is generally simpler." },
    { q: "Is the visit suitable for people with limited mobility?", a: "The visitor areas have different surfaces and accessibility arrangements. Excavated basalt areas can be uneven. Check step-free access with the exact site operator before travelling." },
  ],
  nearby: [
    { label: "Tabgha", to: "/attractions/tabgha/", note: "Lakeside churches, mosaics and early Christian traditions." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Hilltop church and broad views over the Sea of Galilee." },
    { label: "Magdala", to: "/attractions/magdala/", note: "A first-century synagogue and archaeological heritage on the western shore." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Jordan River baptism site often included on longer Galilee days." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "An important Christian pilgrimage landmark in Nazareth." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "The Transfiguration church and scenic Lower Galilee viewpoints." },
  ],
  planningLinks: [
    { label: "Sea of Galilee travel guide", to: "/travel-blog/sea-of-galilee/" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" },
    { label: "Arrival tips at Ben Gurion Airport", to: "/travel-blog/ben-gurion-airport-arrival-tips/" },
  ],
  sources: [
    { label: "Israel Nature and Parks Authority — Hebrew visitor information", url: visitSources.parkHebrew, note: "Official notice about free marine-terminal access and national-park visitor rules." },
    { label: "Christian Information Center — Capernaum entrance and opening hours", url: visitSources.franciscan, note: "Franciscan compound: published entrance fee, last-admission times and holiday exceptions." },
    { label: "Custody of the Holy Land — Capernaum archaeology and history", url: visitSources.archaeology, note: "Historical background, excavation history, synagogue dating and traditional Peter's house." },
    { label: "Greek Orthodox Monastery of the Twelve Apostles — visitor arrangements", url: visitSources.orthodox, note: "Official advance-contact requirement and monastery details." },
    { label: "Israel Nature and Parks Authority — Kfar Nahum National Park", url: visitSources.park, note: "Separate visitor area, marine terminal, accessibility information, navigation and park rules." },
  ],
};

export function CapernaumAttractionPage() {
  return <AttractionDestinationPage content={page} />;
}

export { page as capernaumDestinationContent };
