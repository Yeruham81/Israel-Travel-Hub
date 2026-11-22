import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { akkoSite } from "@/data/akkoSite";
import akkoTourPhoto from "@/assets/shore-excursions/akko-port.jpg";
import haifaCoastPhoto from "@/assets/home/haifa-port-card.webp";

const official = akkoSite.official;
const info = akkoSite.visitor;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Old%20City%20Acre%20Akko%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Old%20City%20Akko%20Israel";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Old%20Akko%20Visitors%20Center%2C%20Weizmann%201%2C%20Akko%2C%20Israel&travelmode=driving";
const walkingMap = "https://www.akko.org.il/wp-content/uploads/2021/12/old-akko-eng.-map.pdf";
const images = {
  knights: "/images/attractions/akko-knights-halls.webp",
  tunnel: "/images/attractions/akko-templar-tunnel.webp",
  bath: "/images/attractions/akko-turkish-bath.webp",
  mosque: "/images/attractions/akko-al-jazzar-mosque.webp",
  market: "/images/attractions/akko-market.webp",
  harbour: "/images/attractions/akko-fishing-harbour.webp",
  museum: "/images/attractions/akko-treasures-museum.webp",
  ramchal: "/images/attractions/akko-ramchal-synagogue.webp",
} as const;

export const akkoDestinationContent: AttractionDestinationContent = {
  path: "/attractions/akko-acre/",
  placeName: "Old Akko",
  title: akkoSite.title,
  heroTitle: "Old Akko (Acre): Attractions & Tickets",
  highlightsTitle: "What to see in Old Akko",
  region: akkoSite.region,
  updatedAt: akkoSite.updatedAt,
  hero: akkoSite.hero,
  intro: akkoSite.intro,
  visitorTitle: "Combined tickets, opening hours and accessibility",
  visitorNavLabel: "Tickets & hours",
  historyTitle: "Crusader and Ottoman heritage",
  relatedTitle: "Explore northern Israel",
  contactIntroduction: "Tell me your travel date, where you're staying and which historic sites interest you most. I'll be happy to help arrange a private visit to Akko and nearby attractions.",
  facts: [
    { icon: "location", label: "Location", value: "Old Akko (Acre)", note: "Walled Mediterranean old town, north of Haifa" },
    { icon: "duration", label: "Time needed", value: "3–6 hours", note: "Choose a shorter or fuller walking route" },
    { icon: "admission", label: "Combined ticket", value: info.comboAdult, note: "For the main heritage sites and museums" },
    { icon: "hours", label: "Main sites", value: "From 09:00", note: "Most close at 17:00; Friday at 16:00" },
    { icon: "highlights", label: "Don't miss", value: "Crusader & Ottoman", note: "Knights’ Halls, tunnel, market and harbour" },
    { icon: "access", label: "Getting around", value: "On foot", note: "Uneven lanes; some attractions have restrictions" },
  ],
  glanceNote: <>I recommend starting at the <a href={official.visitors} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Akko Visitors Center</a> (Weizmann Street 1), where you can pick up a walking map. The ticketed heritage sites are close together, and you can explore the market and harbour freely between visits.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="Knights’ Halls — the Hospitaller Fortress"
        image={{ src: images.knights, alt: "Stone arches and vaulted Crusader halls in the Hospitaller Fortress of Old Akko" }}
      >
        <p>I recommend starting here. Beneath the later Ottoman citadel lies an extensive Crusader complex of vaulted halls, columns and courtyards that brings the medieval port city to life.</p>
        <p>The self-guided visit includes an audio guide in several languages. Allow around an hour if you enjoy history and want to explore the rooms without rushing. <a href={official.knights} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official Knights’ Halls information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Templars’ Tunnel"
        image={{ src: images.tunnel, alt: "Illuminated medieval stone passage in the Templars’ Tunnel beneath Old Akko" }}
      >
        <p>Walk through a restored underground passage linking the Templars’ former stronghold with the harbour area. The tunnel is one of the more unusual experiences in the old town and is easy to combine with the market and waterfront.</p>
        <p><strong>Accessibility:</strong> The tunnel’s lift is currently out of service, so wheelchair access is unavailable. <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the latest notice</a> before visiting.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Al-Basha Turkish Bath"
        image={{ src: images.bath, alt: "Historic domed bathing chambers inside Al-Basha Turkish Bath in Old Akko" }}
      >
        <p>Akko's beautifully restored Ottoman bathhouse offers a different side of local history. Its series of rooms and interpretive presentation introduce the rituals and social life of the old hammam.</p>
        <p>It is a good addition after the Crusader sites, especially if you prefer shorter indoor visits. <a href={official.bath} target="_blank" rel="noopener noreferrer" className={inlineLink}>See the official Turkish Bath guide</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Al-Jazzar Mosque"
        image={{ src: images.mosque, alt: "Green dome, minaret and courtyard of Al-Jazzar Mosque in Old Akko" }}
      >
        <p>Built during the Ottoman period, Al-Jazzar Mosque is one of the most distinctive buildings in the old city, with a peaceful courtyard and a striking green dome.</p>
        <p>Visitors should dress respectfully and check access around prayer times. Admission is <strong>separate</strong> from the heritage-site ticket. <a href={official.mosque} target="_blank" rel="noopener noreferrer" className={inlineLink}>Learn about Akko’s historic mosques</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Separate admission</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Old market, Turkish Bazaar and lanes"
        image={{ src: images.market, alt: "Traditional street market and shops in the narrow lanes of Old Akko" }}
      >
        <p>The market is where the historic setting feels most alive. Walk between spice shops, bakeries, small food stalls and stone passageways, and take time to enjoy the local atmosphere.</p>
        <p>I would leave room for a food stop instead of trying to visit every museum in one afternoon. <a href={official.market} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Akko market information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The fishing harbour, sea walls and waterfront"
        image={{ src: images.harbour, alt: "Fishing boats and historic stone waterfront buildings in the harbour of Old Akko" }}
      >
        <p>Finish the day among fishing boats and Mediterranean views. The harbour, sea gate and stretches of the old sea walls are an enjoyable contrast to the underground halls.</p>
        <p>Look for the historic Khan al-Umdan nearby, a landmark caravanserai associated with the port. Some heritage buildings are best viewed from outside, so check access before planning an interior visit. <a href={official.harbour} target="_blank" rel="noopener noreferrer" className={inlineLink}>Port and marina history</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Free entry</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Treasures in the Wall Museum"
        image={{ src: images.museum, alt: "Collection of antique metal padlocks on display at the Treasures in the Wall Museum in Old Akko" }}
      >
        <p>Housed inside part of the eastern city wall, this museum presents everyday life in earlier generations through old trades, household objects and recreated shops. It is especially rewarding if you enjoy local crafts and social history.</p>
        <p><a href={official.museum} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official museum details</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Ramchal Synagogue and Jewish Heritage Center"
        image={{ src: images.ramchal, alt: "Historic Ramchal Synagogue in the heart of Old Akko" }}
      >
        <p>This intimate historic site explores the life of Rabbi Moshe Chaim Luzzatto (the Ramchal) and Jewish heritage in Crusader and Ottoman Akko. Exhibits and archaeological finds add another layer to the visit.</p>
        <p>The synagogue and heritage center are <strong>closed on Saturdays and <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link></strong>. <a href={official.ramchal} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the official visitor information</a>.</p>
        <p className="text-xs font-semibold text-muted-foreground">Included in the combined ticket; check opening days</p>
      </AttractionHighlight>
      <AttractionPracticalTip>
        If you have extra time, consider the small Okashi Art Museum, which is also included in the heritage ticket. For a first visit, I would prioritise the Knights’ Halls, one or two other ticketed sites, the market and the harbour.
      </AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The combined ticket is useful if you plan to enter several historic sites. The old market and waterfront can also be enjoyed without a heritage-site ticket.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="akko-ticket-hours">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Combined heritage ticket</h3></div>
          <p className="mt-3 text-2xl font-bold text-primary">{info.comboAdult} <span className="text-sm font-normal text-muted-foreground">per person (published package price)</span></p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Includes Knights’ Halls, Templars’ Tunnel, Turkish Bath, Treasures in the Wall, Okashi Art Museum and the Ramchal Synagogue and Jewish Heritage Center. Eligible discounts or special packages may differ.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Not included:</strong> Al-Jazzar Mosque and the Underground Prisoners Museum charge separately. The old market and harbour are public spaces.</p>
          <a href={official.attractions} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">View official tickets and visitor information <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Published opening hours</h3></div>
          <dl className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between gap-3"><dt>Sunday–Thursday & Saturday</dt><dd className="shrink-0 font-semibold" dir="ltr">{info.regularHours}</dd></div>
            <div className="flex justify-between gap-3"><dt>Friday & holiday eves</dt><dd className="shrink-0 font-semibold" dir="ltr">{info.fridayHours}</dd></div>
            <div className="flex justify-between gap-3"><dt>Ticket office</dt><dd className="shrink-0 font-semibold">Closes 1 hour earlier</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">The Ramchal Synagogue and Heritage Center are closed on Saturdays and Jewish holidays. Festival dates, holidays and individual attractions may have different hours.</p>
          <a href={official.hours} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Check current site-by-site hours <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="akko-booking">
        <h3 className="font-serif text-xl font-semibold">Where to buy tickets</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Booking online is recommended but not compulsory. You can buy the combined ticket at the Visitors Center ticket office or its ticket machines. Each heritage site has its own entrance; show your ticket when visiting the included attractions.</p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">The Visitors Center is at <strong>{info.centerAddress}</strong>. <a href={official.visitors} target="_blank" rel="noopener noreferrer" className={inlineLink}>Visitor center details</a>.</p>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="akko-accessibility">
        <h3 className="font-serif text-xl font-semibold">Accessibility and visitor facilities</h3>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-x-6 sm:text-base [&>li]:mb-2 [&>li]:break-inside-avoid">
          <li><strong>Walking:</strong> Much of the old city is pedestrian-friendly, but historic stone paving, steps and narrow passages can be uneven.</li>
          <li><strong>Wheelchair access:</strong> The operator provides accessible entrances and facilities at several managed sites, though not every historic space is accessible.</li>
          <li><strong>Knights’ Halls:</strong> Most visitor areas have adaptations; the Prisoners Hall is not wheelchair accessible.</li>
          <li><strong>Restrooms:</strong> Accessible toilets are listed at the Enchanted Garden and the Ramchal visitor center.</li>
          <li><strong>Religious sites:</strong> Dress respectfully and be mindful of services and prayer times.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For specific accessibility arrangements, consult the <a href={official.accessibility} target="_blank" rel="noopener noreferrer" className={inlineLink}>official access page</a> or contact the site team at <a href="tel:+97249956706" className={inlineLink} dir="ltr">{info.phone}</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The historic sites are concentrated inside Old Akko. I recommend heading to the <strong>Visitors Center at Weizmann Street 1</strong>, then exploring the other attractions on foot. Individual lanes are much easier to navigate without a car.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" data-testid="akko-transport">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By train or bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Akko railway station is outside the old town. Continue by local bus, taxi or a longer walk to the walled city. Check services on your travel date, particularly for Friday afternoons, Shabbat and holidays, using the <a href="https://www.rail.co.il/" target="_blank" rel="noopener noreferrer" className={inlineLink}>rail operator</a> and <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Use the car parks near the Visitors Center instead of driving into the old-town lanes. The official visitor information lists <strong>Moat Parking (free)</strong> and the <strong>Eucalyptus car park (paid parking)</strong>. For a private transfer or multi-stop day out, <a href="#contact" className={inlineLink}>contact me</a>.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Directions to the Visitors Center <ArrowUpRight className="h-3.5 w-3.5"/></a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-semibold">Walking between sites</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The main highlights are close enough to combine in a half-day walking visit. Pick up the operator's map at the Visitors Center or open the <a href={walkingMap} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Old Akko walking map</a> on your phone.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="akko-map">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary"/><h3 className="text-sm font-semibold">Old Akko and its historic sites</h3></div>
          <iframe title="Map of Old Akko and its historic pedestrian attractions" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Open the map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="akko-walking-routes">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Choose your walking route</h3></div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
          <p><strong>A shorter visit (around 3 hours):</strong> Start with the Knights’ Halls, explore the market and its side streets, walk through the Templars’ Tunnel and finish beside the fishing harbour.</p>
          <p><strong>A fuller visit (5–6 hours):</strong> Add the Al-Basha Turkish Bath and Al-Jazzar Mosque, then choose either Treasures in the Wall or the Ramchal Heritage Center according to your interests and opening times.</p>
          <p><strong>If you are visiting on Shabbat:</strong> Plan around the closure of the Ramchal site and any changes to public transport services.</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">These are flexible walking suggestions. I would choose three or four main stops, leave some time for a meal and use the <a href={official.oldCityRoute} target="_blank" rel="noopener noreferrer" className={inlineLink}>official classic route</a> to find your way between the historic entrances.</p>
      </div>
      <AttractionPracticalTip>For a full day in the north, Akko can be paired with <Link to="/attractions/rosh-hanikra/" className={inlineLink}>Rosh Hanikra</Link> or a separate stop in <Link to="/attractions/haifa/" className={inlineLink}>Haifa</Link>. Allow enough time for travelling between them rather than squeezing too many attractions into a short outing.</AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Old Akko is a UNESCO World Heritage Site whose streets preserve an unusual layering of history. The Crusaders developed it into an important Mediterranean port, while the Hospitaller and Templar orders left some of the underground monuments that can be visited today.</p>
      <p>Above those remains, the Ottoman city took shape with mosques, markets, bathhouses, khans and defensive walls. That mix of visible architecture and archaeological spaces is what makes a short walk through Akko so rewarding. <a href={official.unesco} target="_blank" rel="noopener noreferrer" className={inlineLink}>UNESCO World Heritage information</a>.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>A guided heritage walk can help connect the Crusader halls, Ottoman buildings and everyday life of the old city. You can also explore independently with the site audio guides and the historic walking map.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="akko-tour-cards">
        <Link to="/tours/caesarea-haifa-acre/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={akkoTourPhoto} alt="Fishing boats and old stone buildings on Akko's Mediterranean waterfront" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Akko, Haifa and Caesarea tours</h3>
            <p className="mt-1 text-sm text-muted-foreground">Browse guided visits and north-coast heritage excursions.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4"/></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={haifaCoastPhoto} alt="Mediterranean harbour and northern coastal scenery near Haifa" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private Akko visit</h3>
            <p className="mt-1 text-sm text-muted-foreground">Choose historic sites, your pickup location and nearby coastal stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Send an inquiry <ArrowUpRight className="h-4 w-4"/></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Akko the same as Acre?", a: "Yes. Akko, Acre and Akka refer to the same Mediterranean port city. This guide concentrates on the historic Old City." },
    { q: "What should I see if I have only two hours?", a: "Choose the Knights’ Halls, then enjoy a short walk through the market or down to the harbour. Add a second ticketed site only if you have time." },
    { q: "Is Old Akko suitable for families with children?", a: "Yes. The underground halls, tunnel and harbour can be enjoyable for families. Wear comfortable shoes for the stone lanes, and allow time for breaks." },
    { q: "Are the historic attractions open on Saturdays?", a: "Most main heritage attractions are open on Saturday, but the Ramchal Synagogue and Heritage Center are closed on Saturdays and Jewish holidays. Check individual site notices and public transport options." },
    { q: "Can I visit Old Akko without a car?", a: "Yes. Take a train to Akko and continue by local bus, taxi or on foot. The main historic attractions are close enough to explore on foot." },
  ],
  nearby: [
    { label: "Rosh Hanikra", to: "/attractions/rosh-hanikra/", note: "Sea grottoes and coastal cliffs north of Akko." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "Roman ruins and an ancient Mediterranean harbour." },
    { label: "Tel Megiddo", to: "/attractions/tel-megiddo/", note: "Ancient archaeological mound in the Jezreel Valley." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "A major religious and cultural landmark in Nazareth." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Hilltop church and sweeping Galilee views." },
    { label: "Magdala", to: "/attractions/magdala/", note: "Archaeology and lakeside heritage on the Sea of Galilee." },
  ],
  planningLinks: [
    { label: "Haifa travel guide", to: "/attractions/haifa/", description: "Explore the gardens, coastline and viewpoints.", icon: "region" },
    { label: "Sea of Galilee travel guide", to: "/attractions/sea-of-galilee/", description: "Lakeside towns and historic sites.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Rail, buses and road-trip planning.", icon: "transport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Plan sightseeing around the seasons.", icon: "seasons" },
    { label: "5-day Israel itinerary", to: "/travel-blog/israel-itinerary-5-days/", description: "A practical route with coastal highlights.", icon: "itinerary" },
    { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", description: "Useful advice before your visit.", icon: "region" },
  ],
  sources: [
    { label: "Old Akko — official attractions and ticket packages", url: official.attractions },
    { label: "Old Akko — published opening hours", url: official.hours },
    { label: "Old Akko — FAQ, ticket inclusions and arrival", url: official.faq },
    { label: "Old Akko — accessibility", url: official.accessibility },
    { label: "Old Akko — classic walking route", url: official.oldCityRoute },
    { label: "UNESCO — Old City of Acre", url: official.unesco },
  ],
  photoCredits: <p>
    <strong>Photographs:</strong>{" "}
    <a href="https://commons.wikimedia.org/wiki/File:108248_el_basha_hammam_in_acre_PikiWiki_Israel.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Zeev Stein / PikiWiki Israel (Turkish Bath)</a>{" — "}
    <a href="https://creativecommons.org/licenses/by/2.5/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY 2.5</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:The_market_in_Acre_(Akko)_(373226896).jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Yaniv Ben-Arie (market)</a>{" — "}
    <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 2.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Antique_Padlocks_-_Treasures_in_the_Wall_Museum_-_Akko_(Acre)_-_Israel.jpg" target="_blank" rel="noopener noreferrer" className={inlineLink}>Adam Jones (museum collection)</a>{" — "}
    <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 2.0</a>;{" "}
    <a href="https://commons.wikimedia.org/wiki/File:Acco_Ramhal_Synagogue_IMG_0281.JPG" target="_blank" rel="noopener noreferrer" className={inlineLink}>Deror Avi (Ramchal Synagogue)</a>{" — "}
    <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className={inlineLink}>CC BY-SA 3.0</a>.
    {" "}Images resized and converted to WebP. The image files retain their original Creative Commons licenses.
  </p>,
};

export function AkkoAttractionPage() {
  return <AttractionDestinationPage content={akkoDestinationContent} />;
}
