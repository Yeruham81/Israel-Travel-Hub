import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { magdalaSite } from "@/data/magdalaSite";
import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

const visit = magdalaSite.visit;
const sources = magdalaSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const mapEmbed = "https://maps.google.com/maps?q=Magdala%20Archaeological%20Park%2C%20Migdal%2C%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Magdala%20Archaeological%20Park%2C%20Migdal%2C%20Israel&hl=en";
const drivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Magdala%20Archaeological%20Park%2C%20Migdal%2C%20Israel&travelmode=driving";

export const magdalaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/magdala/",
  placeName: "Magdala",
  title: magdalaSite.title,
  region: magdalaSite.region,
  updatedAt: magdalaSite.updatedAt,
  hero: magdalaSite.hero,
  intro: magdalaSite.intro,
  historyTitle: "Magdala's Jewish history and Mary Magdalene",
  visitorTitle: "Opening hours, tickets and visitor information",
  visitorNavLabel: "Hours & tickets",
  relatedTitle: "Explore more around the Sea of Galilee",
  contactIntroduction: "Tell me your travel date, pickup location and the Galilee places you would like to see. I'll be happy to help plan a private day trip that includes Magdala.",
  facts: [
    { icon: "location", label: "Location", value: "Western Sea of Galilee", note: "Near Migdal and Tiberias" },
    { icon: "duration", label: "Time needed", value: "60–90 minutes", note: "Archaeology and Duc In Altum" },
    { icon: "hours", label: "Archaeological park", value: visit.archaeologyHours, note: "Daily · visitor centre too" },
    { icon: "hours", label: "Duc In Altum", value: visit.prayerCentreHours, note: "Daily · prayer centre" },
    { icon: "admission", label: "Admission", value: "Contact visitor centre", note: "Tickets and group visits" },
    { icon: "access", label: "Getting there", value: "Route 90", note: "Car, taxi, local bus or tour" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The first-century synagogue"
        image={{ src: "/images/attractions/magdala-first-century-synagogue.webp", alt: "Stone foundations, benches and ancient mosaic floor in Magdala's excavated first-century synagogue" }}
      >
        <p>The synagogue is the archaeological heart of Magdala. Its stone benches, preserved floor and meeting space offer a rare window into Jewish community life in the Galilee during the first century.</p>
        <p>Walk around the sheltered excavation to see how the original building was laid out. A guided explanation can help bring the remains to life.</p>
      </AttractionHighlight>
      <AttractionHighlight title="The Magdala Stone">
        <p>The carved stone discovered in the synagogue is one of the site's most important finds. Its reliefs include a depiction of the menorah, connecting the town's Jewish life to the Temple in Jerusalem.</p>
        <p>The stone displayed in the synagogue is a replica. The original is part of the Israel Antiquities Authority’s collection and has been exhibited elsewhere.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Streets, marketplace and ritual baths">
        <p>Beyond the synagogue, the excavated town reveals shops, domestic buildings and ancient <em>mikvaot</em> (ritual baths). Together, these remains help explain how people lived and worked beside the lake.</p>
        <p>I recommend taking your time here rather than treating Magdala as just a quick church stop.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Duc In Altum and the Boat Chapel"
        image={{ src: "/images/attractions/magdala-boat-chapel.webp", alt: "Boat-shaped altar and bright arched windows inside Duc In Altum's lakeside prayer chapel at Magdala" }}
      >
        <p>The modern prayer centre is a very different experience from the excavations. Its Boat Chapel faces towards the Sea of Galilee, with an altar recalling Jesus' teaching from a fishing boat.</p>
        <p>Allow some quiet time to look around, and remember that services may be taking place.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The Women's Atrium and other chapels"
        image={{ src: "/images/attractions/magdala-womens-atrium.webp", alt: "Columned Women's Atrium inside Magdala's Duc In Altum prayer centre" }}
      >
        <p>The Women's Atrium honours women in the Gospel tradition, including Mary Magdalene. From here, explore the mosaic chapels and the lower Encounter Chapel.</p>
        <p>In the Encounter Chapel, the floor incorporates first-century paving stones from Magdala’s ancient marketplace near the harbour, carefully returned to their approximate original positions when the chapel was built.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The archaeological park and Duc In Altum are part of the same Magdala visitor complex, but their published closing times differ.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="magdala-hours-tickets">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            <div><dt className="inline font-semibold">Archaeological park & visitor centre: </dt><dd className="inline">{visit.archaeologyHours}</dd></div>
            <div><dt className="inline font-semibold">Duc In Altum: </dt><dd className="inline">{visit.prayerCentreHours}</dd></div>
          </dl>
          <p className="mt-2 text-sm">Both are normally open daily. On 24 December, visiting hours are 08:00–12:00; the site is closed on Christmas Day (25 December) and Yom Kippur. Access during religious services may vary.</p>
          <a href={sources.plan} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official visiting hours <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Tickets and guided visits</h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">For admission details, group rates and guided tours, contact the visitor centre directly.</p>
          <a href={"mailto:" + visit.visitorEmail} className={"mt-2 inline-block text-sm " + inlineLink}>{visit.visitorEmail}</a>
          <p className="mt-1 text-sm"><a href={"tel:" + visit.visitorPhoneHref} className={inlineLink} dir="ltr">{visit.visitorPhone}</a></p>
          <a href={sources.contact} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official visitor centre contacts <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>Start with the archaeology.</strong> It closes earlier than Duc In Altum. Save the chapels for the second part of your visit if both are open.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="magdala-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Dress:</strong> Comfortable shoes for the archaeological paths and respectful clothing in the chapels.</li>
          <li><strong>Accessibility:</strong> Some excavated surfaces are uneven, and parts of Duc In Altum are on different levels. Contact the visitor centre for the most suitable step-free route.</li>
          <li><strong>Facilities:</strong> The visitor centre has a gift shop and café. Restrooms and parking are available at the complex.</li>
          <li><strong>Guides and groups:</strong> Ask the visitor centre about volunteer-led tours and group arrangements.</li>
        </ul>
      </div>
      <p className="text-sm leading-relaxed">For Mass, a prayer service or a religious group visit, contact <a href={"mailto:" + visit.prayerEmail} className={inlineLink}>{visit.prayerEmail}</a> or <a href={"tel:" + visit.prayerPhoneHref} className={inlineLink} dir="ltr">{visit.prayerPhone}</a>. <a href={sources.ducInAltum} target="_blank" rel="noopener noreferrer" className={inlineLink}>See Duc In Altum's official information.</a></p>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Magdala is just north of Tiberias, close to Migdal on the western shore of the Sea of Galilee. The visitor complex is reached from Route 90.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Tiberias, drive north on Route 90 towards Migdal and follow the signs for Magdala. Use the archaeological park or visitor centre as your destination rather than a general address in Migdal.</p>
            <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Driving directions to Magdala</a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Local buses run through the Migdal area from Tiberias, making Magdala more accessible by bus than some hilltop Galilee sites. Check the correct stop, the final walk and return times in the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. If you're combining several attractions, consider <a href={carRentalAffiliateUrl("/attractions/magdala/")} target="_blank" rel="sponsored noopener noreferrer" className={inlineLink}>renting a car</a>, joining an <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>organised Galilee tour</Link>, or <a href="#contact" className={inlineLink}>arranging a private driver</a>.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="magdala-location-map">
          <h3 className="text-sm font-semibold">Where is Magdala?</h3>
          <iframe title="Google Maps location of Magdala Archaeological Park by the Sea of Galilee" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A relaxed Magdala visit: 60–90 minutes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Explore the <strong>synagogue</strong> and learn the story of the <strong>Magdala Stone</strong>.</li>
          <li>Walk past the <strong>ancient streets and ritual baths</strong> to see more of the settlement.</li>
          <li>Finish at <strong>Duc In Altum</strong>, especially the Boat Chapel and Women's Atrium.</li>
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Combine Magdala with the northern Sea of Galilee</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">I recommend choosing three to five sites for your day, depending on where you're starting and how much time you want to spend at Magdala.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Near the north shore:</strong> <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha</Link>, <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link> and the <Link to="/attractions/mount-of-beatitudes/" className={inlineLink}>Mount of Beatitudes</Link> are natural companions.</li>
          <li><strong>Along the lake:</strong> Include time in <Link to="/travel-blog/sea-of-galilee/" className={inlineLink}>Tiberias or the surrounding lakeside area</Link>.</li>
          <li><strong>A longer route:</strong> Add <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>Nazareth</Link> or <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link> if travel time and your schedule allow.</li>
        </ul>
      </div>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Magdala was a prosperous Jewish town beside the Sea of Galilee during the first century. Archaeological excavations uncovered a synagogue, houses, a marketplace and ritual baths, revealing a community shaped by trade, fishing and religious life.</p>
      <p>The town is traditionally associated with Mary Magdalene, a follower of Jesus named in the Gospels. The archaeological remains establish the ancient settlement's importance, but they cannot identify an individual home or prove details of her life.</p>
      <p>Duc In Altum is a modern centre for prayer and reflection, celebrating Gospel narratives and the women who followed Jesus. Its chapels complement the archaeological visit while belonging to a different period of the site's story.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Guided Galilee trips can make it easier to combine Magdala with lakeside churches and other nearby stops. Check the actual itinerary before booking: not every tour includes both the archaeological park and Duc In Altum.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="magdala-galilee-tours-card">
          <img src="/images/attractions/sea-of-galilee.webp" alt="Landscape of the Sea of Galilee on a northern Israel guided tour route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Compare guided Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Explore tours and check which Galilee sites are included.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="magdala-private-driver-card">
          <img src={galileePhoto} alt="Hills above the Sea of Galilee on a private day-trip route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tell me your starting point and preferred Galilee stops for a flexible day trip.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "How long should I spend at Magdala?", a: "Allow around 60–90 minutes to see the first-century synagogue, some of the excavated town and Duc In Altum. A guided visit or religious service can take longer." },
    { q: "What are Magdala's opening hours?", a: "The archaeological park and visitor centre are open 08:00–17:30, and Duc In Altum 08:00–18:00. Special hours and holiday closures are listed in the visitor information above." },
    { q: "Can I see the original Magdala Stone?", a: "The stone on display in the ancient synagogue is a replica. The original belongs to the Israel Antiquities Authority’s collection and has been displayed in exhibitions." },
    { q: "Is Duc In Altum the ancient synagogue?", a: "No. The synagogue is a first-century archaeological discovery. Duc In Altum is the modern prayer centre beside the excavations." },
    { q: "Is Magdala the hometown of Mary Magdalene?", a: "Magdala is traditionally associated with Mary Magdalene. The ancient town has been excavated, but archaeology does not prove her exact birthplace or home." },
    { q: "Can I visit Magdala by bus?", a: "Local buses serve the Migdal area from Tiberias. Check the right stop, walking route and return departure in Israel's official public transport planner before travelling." },
    { q: "Is Magdala accessible for visitors with limited mobility?", a: "The site is on relatively level ground, but excavated stone surfaces and some chapel levels need special consideration. Contact the visitor centre to confirm a suitable step-free route." },
    { q: "Can I arrange Mass or a prayer service?", a: "Yes. Contact Duc In Altum directly ahead of your visit to discuss religious services, group times and availability." },
  ],
  nearby: [
    { label: "Tabgha", to: "/attractions/tabgha/", note: "Two lakeside churches, biblical traditions and ancient mosaics." },
    { label: "Capernaum", to: "/attractions/capernaum/", note: "First-century village remains and the ancient synagogue." },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Octagonal church, gardens and elevated lake views." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "A baptismal site farther south at the Jordan River outlet." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's major church, for a wider Galilee route." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "Transfiguration pilgrimage site on a longer Galilee day." },
  ],
  planningLinks: [
    { label: "Sea of Galilee travel guide", to: "/travel-blog/sea-of-galilee/", description: "Explore Tiberias and the lakeshore.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Make room for northern Israel.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "A slower journey through the Galilee.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Seasons, weather and holidays.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Choose driving, public transport or tours.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Plan your first day in Israel.", icon: "arrival" },
  ],
  sources: [
    { label: "Magdala — official plan your visit", url: sources.plan, note: "Daily opening hours for the archaeological park and Duc In Altum, directions and site facilities." },
    { label: "Magdala — archaeological park", url: sources.archaeology, note: "Background on the first-century synagogue, Magdala Stone and excavated town." },
    { label: "Magdala — Duc In Altum", url: sources.ducInAltum, note: "Boat Chapel, Women's Atrium, prayer spaces and religious services." },
    { label: "Magdala — official contact and visitor centre", url: sources.contact, note: "Current ticket and tour enquiries, visitor contacts and religious service arrangements." },
    { label: "Christian Information Center — Magdala holiday hours", url: sources.cicHours, note: "24 December morning hours and closures on Christmas Day and Yom Kippur." },
  ],
};

export function MagdalaAttractionPage() {
  return <AttractionDestinationPage content={magdalaDestinationContent} />;
}
