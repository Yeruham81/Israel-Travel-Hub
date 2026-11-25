import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { mountBeatitudesSite } from "@/data/mountBeatitudesSite";
import galileePhoto from "@/assets/home/hero-galilee-sm.webp";

// A single Google Maps pin is sufficient to orient visitors; do not draw a route in the embedded map.
const locationMapEmbed = "https://maps.google.com/maps?q=Church%20of%20the%20Beatitudes%2C%20Israel&hl=en&z=14&t=m&output=embed";
const locationMapLarger = "https://www.google.com/maps/search/?api=1&query=Church%20of%20the%20Beatitudes%2C%20Israel&hl=en";
const churchDrivingDirections = "https://www.google.com/maps/dir/?api=1&destination=Church%20of%20the%20Beatitudes%2C%20Israel&travelmode=driving";
const visit = mountBeatitudesSite.visit;
const source = mountBeatitudesSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";

export const mountBeatitudesDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mount-of-beatitudes/",
  placeName: "the Mount of Beatitudes",
  title: mountBeatitudesSite.title,
  region: mountBeatitudesSite.region,
  updatedAt: mountBeatitudesSite.updatedAt,
  hero: mountBeatitudesSite.hero,
  intro: mountBeatitudesSite.intro,
  historyTitle: "The Sermon on the Mount and the church's history",
  visitorTitle: "Opening hours, admission and visitor information",
  visitorNavLabel: "Hours & admission",
  relatedTitle: "Explore more around the Sea of Galilee",
  contactIntroduction: "Tell me your date, pickup point, passengers and the Galilee sites you want to include. I can arrange a private day trip with a driver to the Mount of Beatitudes and nearby sites.",
  facts: [
    { icon: "location", label: "Location", value: "Above the Sea of Galilee", note: "Near Tabgha and Capernaum" },
    { icon: "duration", label: "Time needed", value: "45–60 minutes", note: "Church, gardens and viewpoint" },
    { icon: "hours", label: "Morning hours", value: visit.morning, note: "Midday closure follows" },
    { icon: "hours", label: "Afternoon hours", value: visit.afternoon, note: "Check holiday closures" },
    { icon: "admission", label: "Entrance fee", value: visit.entryPerPerson, note: "Per person" },
    { icon: "access", label: "Getting there", value: "Car or organised tour", note: "Uphill access road" },
  ],
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight
        title="The octagonal Church of the Beatitudes"
        image={{ src: "/images/attractions/beatitudes-church-gardens.jpg", alt: "The domed octagonal Church of the Beatitudes seen through flowering gardens and palm trees" }}
      >
        <p>The small sanctuary, designed by Italian architect Antonio Barluzzi, is the centrepiece of the visit. Its eight sides reflect the eight Beatitudes at the beginning of the Sermon on the Mount.</p>
        <p>Step inside to see the central altar, the dome and the Latin Beatitudes written in the upper windows. The quiet interior is especially rewarding when there are few visitors.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The shaded colonnade and lake views"
        image={{ src: "/images/attractions/beatitudes-colonnade-lake.webp", alt: "Arched stone colonnade at the Church of the Beatitudes opening towards gardens and the Sea of Galilee" }}
      >
        <p>Walk around the arches encircling the church. They frame lovely views towards the lake and offer shade while you take in the hillside setting.</p>
        <p>I recommend allowing a few extra minutes here rather than rushing straight back to the car.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Gardens and views over the Sea of Galilee">
        <p>Walk through the landscaped gardens to enjoy the quiet setting and views over the lake. Some outdoor areas are reserved for organised prayer and services, so give groups their space.</p>
        <p>Garden paths follow the slope, with changes in level as you move away from the main church.</p>
        <figure className="mt-3 overflow-hidden rounded-lg border border-border/70">
          <img src="/images/attractions/beatitudes-sea-view.webp" alt="Panoramic view of the Sea of Galilee and green hills from the Mount of Beatitudes gardens" loading="lazy" decoding="async" width={768} height={249} className="block h-auto w-full object-cover" />
          <figcaption className="px-3 py-2 text-xs text-muted-foreground">The Sea of Galilee as seen from the Mount of Beatitudes.</figcaption>
        </figure>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The church and gardens are visited as one site, with the lake viewpoints close to the sanctuary.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="beatitudes-hours-admission">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            <div><dt className="inline font-semibold">Morning: </dt><dd className="inline">{visit.morning}</dd></div>
            <div><dt className="inline font-semibold">Afternoon: </dt><dd className="inline">{visit.afternoon}</dd></div>
          </dl>
          <p className="mt-2 text-sm">The site is closed between 11:30 and 14:00, and also at Easter, Christmas and the Feast of the Beatitudes.</p>
          <a href={source.hours} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Official shrine hours <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Entrance fee</h3>
          <p className="mt-3 text-lg font-semibold">{visit.entryPerPerson} per person</p>
          <p className="mt-2 text-sm leading-relaxed">Allow time to explore the church, colonnade and gardens during the visiting hours.</p>
        </article>
      </div>
      <AttractionPracticalTip>
        <strong>Plan around the opening hours.</strong> Visit in the morning or after 14:00. If you're also visiting Tabgha and Capernaum, check each site's opening hours before setting out.
      </AttractionPracticalTip>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="beatitudes-visitor-essentials">
        <h3 className="font-serif text-xl font-semibold">Useful things to know before visiting</h3>
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-2 pl-5 text-sm leading-relaxed sm:grid-cols-2 sm:text-base">
          <li><strong>Dress:</strong> Cover shoulders and knees and keep voices low inside the church and gardens.</li>
          <li><strong>Accessibility:</strong> Cars can reach the hilltop entrance, but some garden paths slope or have steps. Contact the sisters about step-free access if needed.</li>
          <li><strong>Facilities:</strong> Parking and restrooms are available within the grounds. The site also has guesthouses for pilgrims.</li>
          <li><strong>Guesthouse and general enquiries:</strong> <a href={"tel:" + visit.phoneHref} dir="ltr" className="inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4">{visit.phone}</a>.</li>
          <li><strong>Prayer and Mass arrangements:</strong> <a href={"tel:" + visit.prayerPhoneHref} dir="ltr" className="inline-block whitespace-nowrap font-semibold text-primary underline underline-offset-4">{visit.prayerPhone}</a>.</li>
        </ul>
      </div>
      <p className="text-sm leading-relaxed">If you're planning a group service, <a href={source.visitAndGroups} target="_blank" rel="noopener noreferrer" className={inlineLink}>see prayer and Mass arrangements</a> on the church's website before your visit.</p>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>The Mount of Beatitudes stands on a hill above the <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha churches</Link> and near <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link>, on the northwestern side of the Sea of Galilee.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By car or with a driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Tiberias, follow Route 90 north along the lake towards Tabgha and take the signed access road uphill to the Church of the Beatitudes. Use the church entrance as your navigation destination.</p>
            <a href={churchDrivingDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Directions to the Church of the Beatitudes</a>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold">By public transport</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Buses from Tiberias may get you to the area around Tabgha, but the uphill approach makes this inconvenient for most visitors, particularly if you hope to see several Galilee sites in one day. Check connections with the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. I recommend <Link to="/car-rental/" className={inlineLink}>renting a car</Link>, joining an <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>organised Galilee tour</Link>, or <a href="#contact" className={inlineLink}>arranging a private day trip with a driver</a>.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="beatitudes-location-map">
          <h3 className="text-sm font-semibold">Where is the Mount of Beatitudes?</h3>
          <ConsentIframe title="Google Maps location of the Church of the Beatitudes above the Sea of Galilee" src={locationMapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56" />
          <a href={locationMapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A short visit: 45–60 minutes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Step inside the <strong>octagonal church</strong> and look up at its dome and Latin inscriptions.</li>
          <li>Walk around the <strong>shaded colonnade</strong> and enjoy the views over the Sea of Galilee.</li>
          <li>Spend a little time in the <strong>gardens</strong> before continuing to the nearby lakeside sites.</li>
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">A full-day Galilee and Sea of Galilee trip</h3>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">From Tiberias, Tel Aviv or Jerusalem, I recommend choosing three to five stops, including the Mount of Beatitudes, based on your starting point and available time.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li><strong>Northern shore:</strong> <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha</Link> and <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link> are the easiest places to combine with this hilltop visit.</li>
          <li><strong>Along the lake:</strong> Add <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link> or <Link to="/attractions/sea-of-galilee/" className={inlineLink}>Tiberias</Link>.</li>
          <li><strong>Wider Galilee:</strong> Consider <Link to="/attractions/basilica-of-the-annunciation/" className={inlineLink}>Nazareth</Link> or <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link> if your route allows.</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">If you're visiting on a shore excursion from Haifa Port, allow enough time for the return journey.</p>
      </div>

    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>The name comes from the <em>Beatitudes</em> at the opening of Jesus' Sermon on the Mount (Matthew 5–7), a teaching about humility, mercy, justice and peace. Christian pilgrims traditionally associate this hillside with the sermon, even though the Gospels do not identify an exact location.</p>
      <p>Antonio Barluzzi designed the present church, built between 1936 and 1938. Its eight-sided plan honours the eight Beatitudes, while the surrounding colonnade and gardens make the view of the lake part of the experience. The hillside also has a longer history of Christian pilgrimage.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Many organised Galilee tours include the Mount of Beatitudes, Tabgha and Capernaum. Compare departure points and included stops when choosing a tour.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/nazareth-sea-of-galilee/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="beatitudes-galilee-tours-card">
          <img src="/images/attractions/sea-of-galilee.webp" alt="Sea of Galilee landscape representing guided tours in northern Israel" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Compare guided Galilee tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">See guided options around the Sea of Galilee and check which stops are included.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="beatitudes-private-driver-card">
          <img src={galileePhoto} alt="Green hills above the Sea of Galilee on a northern Israel route" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28" />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Explore with a private driver</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Send me your preferred stops to arrange a flexible Galilee day trip, including pickup from Tel Aviv, Jerusalem or Haifa Port.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "How much time do I need at the Mount of Beatitudes?", a: "Around 45–60 minutes is comfortable for the church, colonnade, gardens and lake views. Allow longer if you are attending a booked service." },
    { q: "What are the visiting hours?", a: "The published visiting hours are 08:00–11:30 and 14:00–16:30, with a midday closure in between. Check holiday closures before travelling." },
    { q: "Is there an entrance fee?", a: "Yes. The entrance fee is ₪10 per person." },
    { q: "Can I visit without a car?", a: "You may be able to reach the Tabgha area by bus from Tiberias, but the uphill approach to the church makes this less convenient. A rental car, organised tour or private driver is easier when combining sites." },
    { q: "Is the Mount of Beatitudes wheelchair accessible?", a: "Vehicles can reach the hilltop grounds, while some garden paths slope or have steps. Contact the sisters before travelling to check the accessible entrance and route for your needs." },
    { q: "Can our group arrange Mass or a prayer service?", a: "Yes. Arrange services ahead of time with the Franciscan Missionary Sisters at 04-6711223." },
    { q: "Is the Mount of Beatitudes the same as Mount Tabor?", a: "No. The Mount of Beatitudes overlooks the Sea of Galilee and is associated with the Sermon on the Mount. Mount Tabor is a separate pilgrimage site in Lower Galilee linked to the Transfiguration." },
  ],
  nearby: [
    { label: "Tabgha", to: "/attractions/tabgha/", note: "The loaves-and-fishes mosaic and Primacy of Peter chapel by the lake." },
    { label: "Capernaum", to: "/attractions/capernaum/", note: "The ancient synagogue and traditional House of Peter." },
    { label: "Magdala", to: "/attractions/magdala/", note: "Archaeological remains and Christian pilgrimage sites on the western shore." },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Jordan River baptism site, a useful stop on a longer Galilee day." },
    { label: "Basilica of the Annunciation", to: "/attractions/basilica-of-the-annunciation/", note: "Nazareth's major Christian pilgrimage church." },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "The Basilica of the Transfiguration and Lower Galilee views." },
  ],
  planningLinks: [
    { label: "Sea of Galilee travel guide", to: "/attractions/sea-of-galilee/", description: "Explore the lakeshore and nearby towns.", icon: "region" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Plan a balanced week.", icon: "itinerary" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Allow more time for northern Israel.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Weather, seasons and holidays.", icon: "seasons" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Driving and public transport.", icon: "transport" },
    { label: "Ben Gurion Airport arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", description: "Practical advice for your arrival.", icon: "arrival" },
  ],
  sources: [
    { label: "Christian Information Center — Mount of Beatitudes visiting hours", url: source.hours, note: "Published visiting hours, holiday closures and visitor contact details." },
    { label: "Church of the Beatitudes — official history and contact", url: source.churchAbout, note: "Antonio Barluzzi, octagonal design, construction dates and site contact details." },
    { label: "Church of the Beatitudes — prayer, Mass and guesthouse arrangements", url: source.visitAndGroups, note: "Church contact details for services and group accommodation." },
    { label: "Jesus Trail — walking route through the Mount of Beatitudes", url: source.jesusTrail, note: "Background on the marked long-distance route linking Tabgha, the Mount of Beatitudes and Capernaum." },
  ],
};

export function MountBeatitudesAttractionPage() {
  return <AttractionDestinationPage content={mountBeatitudesDestinationContent} />;
}
