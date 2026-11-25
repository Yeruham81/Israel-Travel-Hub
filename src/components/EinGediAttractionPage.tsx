import { ConsentIframe } from "@/components/ConsentIframe";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Ticket, Footprints } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { einGediSite } from "@/data/einGediSite";
import rockGorgePhoto from "@/assets/guides/dead-sea-excursions/ein-gedi-rock-gorge.jpg";
import ibexPhoto from "@/assets/guides/ein-gedi-ibex.webp";
import oasisPhoto from "@/assets/guides/dead-sea-excursions/ein-gedi-oasis.webp";
import canyonPanorama from "@/assets/guides/dead-sea-excursions/ein-gedi-canyon-panorama.jpg";
import desertOverlook from "@/assets/guides/dead-sea-excursions/ein-gedi-dead-sea-overlook.jpg";
import deadSeaPhoto from "@/assets/guides/dead-sea-excursions/dead-sea-salt-shore.webp";
import masadaPhoto from "@/assets/home/masada-dead-sea-card.webp";

// Optimized local WebP of the Ein Gedi synagogue mosaic (Stéphanie Gromann / Wikimedia Commons).
const synagogueMosaicPhoto = "/images/attractions/ein-gedi-synagogue-mosaic.webp";

const info = einGediSite.visit;
const official = einGediSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const davidDirections = "https://www.google.com/maps/dir/?api=1&destination=Ein%20Gedi%20Nature%20Reserve%20Nahal%20David%2C%20Israel&travelmode=driving";
const arugotDirections = "https://www.google.com/maps/dir/?api=1&destination=Nahal%20Arugot%20Ein%20Gedi%2C%20Israel&travelmode=driving";
const antiquitiesDirections = "https://www.google.com/maps/dir/?api=1&destination=Ein%20Gedi%20Ancient%20Synagogue%2C%20Israel&travelmode=driving";
const mapEmbed = "https://maps.google.com/maps?q=Ein%20Gedi%20Nature%20Reserve%2C%20Israel&hl=en&z=13&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Ein%20Gedi%20Nature%20Reserve%2C%20Israel";

export const einGediDestinationContent: AttractionDestinationContent = {
  path: "/attractions/ein-gedi/",
  placeName: "Ein Gedi Nature Reserve",
  title: einGediSite.title,
  region: einGediSite.region,
  updatedAt: einGediSite.updatedAt,
  hero: einGediSite.hero,
  intro: einGediSite.intro,
  visitorTitle: "Trail conditions, tickets, hours and accessibility",
  visitorNavLabel: "Trails & tickets",
  historyTitle: "A desert oasis with a long human history",
  relatedTitle: "Explore the Dead Sea and beyond",
  contactIntroduction: "Tell me your travel date, pickup point, passengers and the Dead Sea stops you have in mind. I can arrange private transport or a day trip with a driver to Ein Gedi and nearby sites.",
  facts: [
    { icon: "location", label: "Location", value: "Western Dead Sea", note: "Route 90, close to Kibbutz Ein Gedi" },
    { icon: "duration", label: "Time needed", value: "30 min–4+ hours", note: "Depends on the trail and current access" },
    { icon: "admission", label: "Admission", value: info.adult + " adult", note: info.child + " child, ages 5–18" },
    { icon: "hours", label: "Opening hours", value: "From 08:00", note: "Route-specific last entry times" },
    { icon: "highlights", label: "Don't miss", value: "Streams & wildlife", note: "Waterfalls, ibex and dramatic desert scenery" },
    { icon: "access", label: "Accessibility", value: "Selected paths", note: "Short accessible Nahal David section and synagogue" },
  ],
  glanceNote: <><strong>Trail update (November 2026):</strong> Following the October floods, Nahal David has a shortened waterfall walk; Nahal Arugot and the upper paths have different conditions and difficulty levels. <a href={official.overview} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the latest site-by-site status</a> and reserve each entrance you plan to use.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="Nahal David - the short waterfall approach" image={{ src: oasisPhoto, alt: "Freshwater and lush greenery in the Nahal David area of Ein Gedi oasis" }}>
        <p>For a short nature visit, I would start at Nahal David. After the October 2026 floods, the park authority describes a <strong>walk of around ten minutes to the first waterfall</strong>. The pool below it currently has no water because of flood debris; the former longer waterfall circuit should not be assumed open.</p>
        <p>There are accessibility features on the approach, but the section available on your visit may be shorter than the usual paved route. <a href={official.david} target="_blank" rel="noopener noreferrer" className={inlineLink}>See the official Nahal David route update</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Nahal Arugot - the wilder canyon"
        image={{ src: rockGorgePhoto, alt: "Rocky water-carved gorge within Ein Gedi Nature Reserve" }}
      >
        <p>South of Nahal David, Nahal Arugot offers a more demanding canyon hike. The route towards the Hidden Waterfall has been modified after flooding and is currently intended for <strong>experienced hikers</strong>. The red-marked trail follows the drier northern bank; the blue-marked option includes sections in the stream bed.</p>
        <p>Allow several hours and check the conditions of any pools before setting off. The park currently lists an earlier cutoff for new entrants to this trail, so plan your starting time around the <a href={official.arugot} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Nahal Arugot notice</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The green oasis and its desert wildlife"
        image={{ src: ibexPhoto, alt: "Nubian ibex in the rocky Ein Gedi desert nature reserve" }}
      >
        <p>Freshwater springs support palms, reeds, shrubs and wildlife against an almost bare desert backdrop. Nubian ibexes and rock hyraxes are often seen around the reserve's paths and entrances.</p>
        <p>Keep your distance from the animals and store food securely; feeding wildlife harms the reserve's ecosystem.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="Ein Gedi Spring, higher paths and viewpoints"
        image={{ src: desertOverlook, alt: "Desert hiking ledge above Ein Gedi with views down to the Dead Sea" }}
      >
        <p>Experienced hikers can explore the upper paths towards Ein Gedi Spring and Dodim Cave when those routes are open. The park describes a roughly three-hour route from Tel Goren, with an early last-entry time (currently listed as 10:00 on its English visitor page).</p>
        <p>This is a different outing from the short Nahal David waterfall visit. Check the <a href={official.overview} target="_blank" rel="noopener noreferrer" className={inlineLink}>latest route-specific entry and exit times</a> before choosing it.</p>
      </AttractionHighlight>
      <AttractionHighlight
        title="The ancient synagogue and its mosaics"
        image={{ src: synagogueMosaicPhoto, alt: "Bird and geometric designs in the mosaic floor of the ancient synagogue at Ein Gedi" }}
        note={<>Mosaic photo: <a href="https://commons.wikimedia.org/wiki/File:Ein_Gedi_synagogue058.JPG" target="_blank" rel="noopener noreferrer" className={inlineLink}>Stéphanie Gromann / Wikimedia Commons</a> (attribution license).</>}
      >
        <p>Just south of the Nahal David entrance, Ein Gedi Antiquities National Park preserves a late-antique synagogue and mosaic floor, offering a different perspective on the oasis's history.</p>
        <p>This archaeological site has a separate, lower-priced entrance ticket if visited on its own. It can be a good addition to a shorter nature walk, and the synagogue itself is accessible.</p>
        <a href={official.antiquities} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official ancient synagogue visitor information</a>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Ein Gedi has separate entrances for its two streams and ancient synagogue. <strong>Reserve a visit for each entrance you plan to use</strong>; the route notices below explain the currently available walks.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="ein-gedi-hours-tickets">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
          <p className="mt-3 text-sm font-semibold">Summer / daylight saving time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Sunday–Thursday & Saturday: <strong>{info.summerRegular}</strong></p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Friday & ordinary holiday eves: <strong>{info.summerFriday}</strong></p>
          <p className="mt-3 text-sm font-semibold">Winter / standard time</p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Sunday–Thursday & Saturday: <strong>{info.winterRegular}</strong></p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">Friday & ordinary holiday eves: <strong>{info.winterFriday}</strong></p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Rosh Hashanah, Passover and Yom Kippur eves: <strong>{info.specialHolidayEves}</strong>.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>General last entry is one hour before closing.</strong> Nahal Arugot currently has an earlier cutoff (up to three hours before closing), while the upper Ein Gedi Spring route lists entry by 10:00. Verify route-specific times for your visit. <a href={official.english} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official hours and notices</a>.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-serif text-xl font-semibold">Nature reserve admission</h3></div>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            <div className="flex justify-between gap-3"><dt>Adult</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.adult}</dd></div>
            <div className="flex justify-between gap-3"><dt>Child, ages 5–18</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.child}</dd></div>
            <div className="flex justify-between gap-3"><dt>Student</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.student}</dd></div>
            <div className="flex justify-between gap-3"><dt>Adult in a group (over 30)</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.adultGroup}</dd></div>
            <div className="flex justify-between gap-3"><dt>Child in a group (over 30)</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.childGroup}</dd></div>
            <div className="flex justify-between gap-3"><dt>Active-duty soldier / Israeli senior</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.soldier}</dd></div>
            <div className="flex justify-between gap-3"><dt>Active reservist</dt><dd dir="ltr" className="shrink-0 font-semibold">{info.activeReservist}</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Children under 5 enter free. Qualifying Matmon memberships cover admission according to their terms. <a href={official.english} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official ticket information</a>.</p>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="ein-gedi-trail-booking">
        <h3 className="font-serif text-xl font-semibold">Check your route and reserve the correct entrance</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Nahal David and Nahal Arugot require <strong>separate visit reservations</strong>. The official links below open each site's information and visit-coordination page; continue to its reservation system to choose an available time. The antiquities-only ticket is separate.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a href={official.david} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">Nahal David - information & reservations <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
          <a href={official.arugot} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">Nahal Arugot - information & reservations <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
          <a href={official.antiquities} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">Ancient synagogue - information & reservations <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Antiquities-only tickets:</strong> adult {info.antiquitiesAdult}, child {info.antiquitiesChild}, Israeli senior citizen {info.antiquitiesSenior}. The ancient synagogue is on a separate archaeological site.</p>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="ein-gedi-safety">
        <h3 className="font-serif text-xl font-semibold">Safety, accessibility and facilities</h3>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-x-6 sm:text-base [&>li]:mb-2 [&>li]:break-inside-avoid">
          <li><strong>Flash floods:</strong> Never enter a canyon when storms or flood warnings affect its drainage area, even if the sky above you is clear.</li>
          <li><strong>Heat and water:</strong> Carry drinking water, a hat and closed hiking shoes. Plan longer hikes for cooler hours and do not drink stream water.</li>
          <li><strong>Accessible areas:</strong> A roughly 500-metre paved Nahal David approach, resting points and the synagogue have accessibility features; natural canyon routes are often unsuitable for wheelchairs.</li>
          <li><strong>Facilities:</strong> Parking, restrooms, shaded picnic spots and a visitor service point are available at designated entrances.</li>
          <li><strong>Wildlife:</strong> Keep your distance from ibex and hyrax, and never offer food to animals.</li>
          <li><strong>Swimming:</strong> Pools and water access depend on the particular trail's open status; the Dead Sea shoreline beside the reserve is not a designated swimming beach.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">Contact Nahal David at <a href="tel:+97286584285" className={inlineLink} dir="ltr">{info.davidPhone}</a>, Nahal Arugot at <a href="tel:+97286118860" className={inlineLink} dir="ltr">{info.arugotPhone}</a>, or Ein Gedi Antiquities at <a href="tel:+97289170586" className={inlineLink} dir="ltr">{info.antiquitiesPhone}</a> for entrance-specific guidance.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Ein Gedi's entrances lie along <strong>Route 90 on the western shore of the Dead Sea</strong>. Nahal David, Nahal Arugot and the ancient synagogue are distinct visitor stops, so check the location on your reservation before navigating.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="ein-gedi-three-entrances">
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Nahal David</h3>
          <p className="mt-2 text-sm leading-relaxed">Main waterfall approach and accessible section.</p>
          <a href={davidDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Nahal Arugot</h3>
          <p className="mt-2 text-sm leading-relaxed">Longer canyon hikes, with separate booking and entry cutoff.</p>
          <a href={arugotDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Ancient synagogue</h3>
          <p className="mt-2 text-sm leading-relaxed">Mosaics and ancient ruins beside a separate entrance.</p>
          <a href={antiquitiesDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </article>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">From Jerusalem, follow Route 1 east to the Dead Sea and Route 90 south. A <Link to="/car-rental/" className={inlineLink}>rental car</Link> or <a href="#contact" className={inlineLink}>private driver</a> makes it easy to include Masada or a Dead Sea beach on the same day. Always check flood-related road closures.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">By bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Some intercity buses between Jerusalem and the Dead Sea serve Ein Gedi-area stops on Route 90. Check the correct stop for your chosen entrance and the last return bus in the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official public transport planner</a>. Allow time for the walk between the bus stop and the trail entrance.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-semibold">Moving between the entrances</h3></div>
            <p className="mt-2 text-sm leading-relaxed">An accessible promenade links parts of the Nahal David area, the antiquities site and the approach toward Nahal Arugot. Allow time between separate entrance gates, especially when visiting more than one site.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="ein-gedi-map">
          <h3 className="text-sm font-semibold">Where is Ein Gedi?</h3>
          <ConsentIframe title="Google Maps showing Ein Gedi Nature Reserve near the Dead Sea" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">View larger map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Choose a visit that suits the open trails</h3></div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
          <div><strong>A short, easy visit (30–60 minutes):</strong> Start at Nahal David for the ten-minute waterfall approach and enjoy the oasis scenery at a relaxed pace.</div>
          <div><strong>Nature and history (1½–2½ hours):</strong> Add the ancient synagogue and its mosaics, with enough time for the separate entrance.</div>
          <div><strong>A challenging hike (3–4+ hours):</strong> For experienced hikers, consider Nahal Arugot or a permitted upper route, starting early enough for the designated entry cutoff.</div>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">For a full-day excursion, I recommend choosing one main Ein Gedi trail and adding Masada and an authorized Dead Sea beach at Ein Bokek only if the travel times and opening hours fit comfortably.</p>
      </div>
      <figure className="overflow-hidden rounded-xl border bg-card" data-testid="ein-gedi-wide-panorama">
        <img src={canyonPanorama} alt="Wide photograph of a waterfall plunging into a rocky canyon pool in Ein Gedi Nature Reserve" width={1200} height={675} loading="lazy" decoding="async" className="h-auto max-h-[420px] w-full object-cover object-center"/>
        <figcaption className="px-3 py-2 text-xs text-muted-foreground">Ein Gedi's spring-fed canyon scenery. Actual waterfall access depends on the trails open on your visit.</figcaption>
      </figure>
      <AttractionPracticalTip>
        <strong>For a Dead Sea swim:</strong> Use an authorized beach with suitable facilities, such as the public beach area at Ein Bokek, rather than the shoreline immediately below the reserve.
      </AttractionPracticalTip>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Ein Gedi means “spring of the young goat” in Hebrew. Its reliable freshwater springs made settlement and agriculture possible on the edge of the Judean Desert. Biblical traditions associate the cliffs and caves with David's refuge during his flight from King Saul.</p>
      <p>The ancient community cultivated valuable plants, including balsam, and the synagogue's mosaic floor preserves a glimpse of local life in late antiquity. Today the streams support a protected ecosystem of desert animals, trees and water-loving plants.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Day trips to the Dead Sea often include Masada and a stop at Ein Gedi. Check whether your tour actually enters the nature reserve, which trail is planned and whether the itinerary can adapt to current closures.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/masada-dead-sea/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="ein-gedi-tours-card">
          <img src={masadaPhoto} alt="Masada fortress above the Dead Sea, a popular day-trip combination with Ein Gedi" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Masada & Dead Sea tours</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Compare regional day trips and included stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4" data-testid="ein-gedi-private-trip">
          <img src={deadSeaPhoto} alt="Salt formations and desert coastline of the Dead Sea near Ein Gedi" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private Dead Sea day</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Choose your preferred nature and sightseeing stops.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Ein Gedi Nature Reserve open?", a: "Yes, but flood damage has altered several routes. Nahal David currently offers a short walk to its first waterfall, while Nahal Arugot and the upper trails have different difficulty and entry rules. Check the current park notice before travelling." },
    { q: "Do I need to reserve entry?", a: "Yes. The park requires advance visit coordination for each nature-reserve entrance separately. Use the official Nahal David or Nahal Arugot page to select a visit time. The ancient synagogue has its own visitor arrangements." },
    { q: "Which Ein Gedi walk is suitable for families?", a: "Nahal David's short waterfall approach is usually the simpler choice. The modified Nahal Arugot route to the Hidden Waterfall is intended for experienced hikers, so choose it only if everyone is prepared for the difficulty." },
    { q: "Is Ein Gedi wheelchair accessible?", a: "The Nahal David entrance area has accessible features, and the ancient synagogue and its mosaic floor are accessible. Confirm the exact open section before arriving; natural canyon trails are generally not wheelchair accessible." },
    { q: "Can I swim in the Dead Sea at Ein Gedi?", a: "The reserve's shoreline is not a designated Dead Sea swimming beach. For a swim, plan a separate stop at an authorized beach, such as the public beach in Ein Bokek." },
  ],
  nearby: [
    { label: "Masada National Park", to: "/attractions/masada/", note: "Herod's cliff-top fortress and famous Dead Sea views." },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "A peaceful Jordan River baptism site north of the Dead Sea." },
    { label: "Old City of Jerusalem", to: "/attractions/old-city-jerusalem/", note: "Pilgrimage sites and historic quarters for a separate city day." },
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Jerusalem viewpoints and important religious landmarks." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Churches and historic sites near Jerusalem's Old City." },
    { label: "Mitzpe Ramon", to: "/attractions/mitzpe-ramon-crater/", note: "Ramon Crater landscapes on a longer Negev desert trip." },
  ],
  planningLinks: [
    { label: "The Dead Sea visitor guide", to: "/attractions/dead-sea/", description: "Beaches, distances and useful local advice.", icon: "region" },
    { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/", description: "Build a realistic route from Jerusalem.", icon: "itinerary" },
    { label: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", description: "Choose your stops around the sea.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare buses, drivers and rental cars.", icon: "transport" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "Plan a balanced week across Israel.", icon: "itinerary" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Weather and seasons for desert travel.", icon: "seasons" },
  ],
  sources: [
    { label: "Nature and Parks Authority - En Gedi Nature Reserve", url: official.english },
    { label: "Nature and Parks Authority - current visitor areas", url: official.overview },
    { label: "Nature and Parks Authority - Nahal David", url: official.david },
    { label: "Nature and Parks Authority - Nahal Arugot", url: official.arugot },
    { label: "Nature and Parks Authority - Ein Gedi Antiquities", url: official.antiquities },
  ],
};

export function EinGediAttractionPage() {
  return <AttractionDestinationPage content={einGediDestinationContent} />;
}
