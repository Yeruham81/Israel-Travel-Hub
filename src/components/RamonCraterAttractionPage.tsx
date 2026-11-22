import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { ramonCraterSite } from "@/data/ramonCraterSite";
import camelHillPhoto from "@/assets/negev/ramon-camel-hill.webp";
import widePhoto from "@/assets/negev/ramon-wide.webp";
import ibexPhoto from "@/assets/negev/ramon-ibexes.webp";
import jeepPhoto from "@/assets/negev/ramon-jeep.webp";
import cloudsPhoto from "@/assets/negev/ramon-clouds.webp";
import panoramaPhoto from "@/assets/home/hero-refresh-ramon-crater-v4-large.webp";

const info = ramonCraterSite.visit;
const official = ramonCraterSite.sources;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const minsaraPhoto = "/images/attractions/ramon-haminsara-columns.webp";
const sandRatPhoto = "/images/attractions/hai-ramon-fat-sand-rat.webp";
const starsPhoto = "/images/attractions/ramon-stargazing.webp";
const centerDirections = "https://www.google.com/maps/dir/?api=1&destination=Makhtesh%20Ramon%20Visitors%20Center%2C%20Mitzpe%20Ramon%2C%20Israel&travelmode=driving";
const minsaraDirections = "https://www.google.com/maps/dir/?api=1&destination=HaMinsara%2C%20Makhtesh%20Ramon%2C%20Israel&travelmode=driving";
const colorsDirections = "https://www.google.com/maps/dir/?api=1&destination=Ramon%20Colors%20National%20Park%2C%20Israel&travelmode=driving";
const mapEmbed = "https://maps.google.com/maps?q=Makhtesh%20Ramon%2C%20Israel&hl=en&z=10&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Makhtesh%20Ramon%2C%20Israel";

export const ramonCraterDestinationContent: AttractionDestinationContent = {
  path: "/attractions/mitzpe-ramon-crater/",
  placeName: "Ramon Crater",
  title: ramonCraterSite.title,
  region: ramonCraterSite.region,
  updatedAt: ramonCraterSite.updatedAt,
  hero: ramonCraterSite.hero,
  intro: ramonCraterSite.intro,
  visitorTitle: "Visitor center tickets, hours and practical information",
  visitorNavLabel: "Tickets & hours",
  historyTitle: "How Makhtesh Ramon was formed",
  relatedTitle: "Explore the desert and beyond",
  contactIntroduction: "Tell me your travel date, where you're staying and whether you prefer viewpoints, easy walks or a longer desert outing. I'll be happy to help plan a private trip.",
  facts: [
    { icon: "location", label: "Location", value: "Negev Highlands", note: "Mitzpe Ramon, on Route 40" },
    { icon: "duration", label: "Time needed", value: "1 hour–full day", note: "Longer for a serious hike or overnight stay" },
    { icon: "admission", label: "Admission", value: "Rim views: free", note: info.adult + " adult for the visitor center" },
    { icon: "hours", label: "Visitor center", value: "From 08:00", note: "Timed entry, booked in advance" },
    { icon: "highlights", label: "Don't miss", value: "Rim & geology", note: "Camel Hill, Colors Road and HaMinsara" },
    { icon: "access", label: "Accessibility", value: "Selected areas", note: "Visitor center and marked viewing points" },
  ],
  glanceNote: <><strong>Choose your experience:</strong> The rim viewpoints are free to explore; the indoor <a href={official.center} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramon Visitor Center</a> charges admission and requires an advance reservation.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="Ramon Crater Visitor Center">
        <p>Start at the visitor center on the crater rim. Its exhibitions combine the story of Israeli astronaut Ilan Ramon with the geology, wildlife and natural history of the makhtesh. The center is a useful introduction before you head outside.</p>
        <p>Allow roughly an hour for the indoor experience and reserve an entry time. You can enjoy many of the surrounding viewpoints without a visitor-center ticket. <a href={official.center} target="_blank" rel="noopener noreferrer" className={inlineLink}>Visitor information and reservations</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Camel Hill and the crater-rim viewpoints" image={{ src: camelHillPhoto, alt: "Rocky viewpoint at Camel Hill overlooking the Negev landscape" }}>
        <p>The town-side promenade and Camel Hill (Har Gamal) give you sweeping views of the vast crater basin and its ridges. I would visit in the early morning or late afternoon, when softer light brings out the colours of the rocks.</p>
        <p>These are good options when you have limited time or prefer to enjoy the desert without a strenuous hike. Keep to the marked approaches and stay clear of exposed cliff edges.</p>
      </AttractionHighlight>
      <AttractionHighlight title="HaMinsara — the Carpentry Shop" image={{ src: minsaraPhoto, alt: "Rectangular and hexagonal sandstone prisms at HaMinsara in Ramon Crater" }}>
        <p>HaMinsara is a short geological walk famous for polygonal stone columns that resemble pieces of timber. Their unusual shape makes this a rewarding stop even for visitors who are not planning a long trail.</p>
        <p>Access is via a short track from Route 40, south of Mitzpe Ramon. <a href={official.minsara} target="_blank" rel="noopener noreferrer" className={inlineLink}>See the official approach and walking information</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Ramon Colors National Park" image={{ src: widePhoto, alt: "Wide desert landscape showing the rocky slopes of Makhtesh Ramon" }}>
        <p>Drive through the restored former quarry area to see remarkable bands of coloured stone, old mining features and accessible viewing platforms. The signed scenic route is particularly convenient for visitors who want to explore the crater floor with short stops.</p>
        <p>The park is open from sunrise to sunset. Respect temporary restoration signs and stay out of the water-filled quarry pits; no drinking water is available on the route. <a href={official.colors} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ramon Colors official visitor page</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Nahal Ardon and longer hikes">
        <p>Marked hikes around Nahal Ardon reveal geological dikes, layers of coloured rock and open desert scenery. Some trailheads require driving on dirt tracks, so check whether your vehicle is suitable and allow enough daylight for the walk.</p>
        <p>For longer routes, bring a current hiking map and water, and check weather, heat and flood warnings. <a href={official.ardon} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official Nahal Ardon route</a>.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Desert ibex and local wildlife" image={{ src: ibexPhoto, alt: "Ibexes standing on the rocky terrain near Mitzpe Ramon" }}>
        <p>Ibex often appear near the town's cliffs and paths, and their sure-footed movement among the rocks is a highlight for many visitors. Keep your distance, store food securely and do not feed the animals.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Hai Ramon — desert wildlife park" image={{ src: sandRatPhoto, alt: "A fat sand rat, one of the desert animals featured at Hai Ramon; representative photograph taken at another wildlife facility" }}>
        <p>Hai Ramon introduces visitors to desert animals that are rarely seen during a walk, including lizards, tortoises, hedgehogs, sand rats and other small creatures. The adjacent botanical garden illustrates the Negev's varied habitats.</p>
        <p><strong>Closed as of November 2026.</strong> <a href={official.haiRamon} target="_blank" rel="noopener noreferrer" className={inlineLink}>Check the current visiting status on the official website</a> when planning your trip.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Stargazing in the desert" image={{ src: starsPhoto, alt: "The Milky Way and a star-filled night sky above a desert tree near Ramon Crater" }}>
        <p>Ramon Crater was designated an International Dark Sky Park in 2017. An overnight stay provides a different experience from a daytime visit, with a chance to see remarkably dark skies.</p>
        <p>Look for a cloud-free night with little moonlight and use an authorised overnight site or guided activity. Avoid entering closed trails or driving off-road after dark. <a href={official.darkSky} target="_blank" rel="noopener noreferrer" className={inlineLink}>Dark-sky park information</a>.</p>
      </AttractionHighlight>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>The <strong>visitor center</strong>, the <strong>free rim viewpoints</strong> and the <strong>outdoor crater routes</strong> are separate experiences. Only the indoor center has the admission fees and operating hours shown below.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="ramon-hours-prices">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Visitor center hours</h3></div>
          <p className="mt-3 text-sm font-semibold">Summer / daylight saving time</p>
          <p className="mt-1 text-sm sm:text-base">Sunday–Thursday & Saturday: <strong>{info.summerRegular}</strong></p>
          <p className="mt-1 text-sm sm:text-base">Friday and ordinary holiday eves: <strong>{info.summerFriday}</strong></p>
          <p className="mt-3 text-sm font-semibold">Winter / standard time</p>
          <p className="mt-1 text-sm sm:text-base">Sunday–Thursday & Saturday: <strong>{info.winterRegular}</strong></p>
          <p className="mt-1 text-sm sm:text-base">Friday and ordinary holiday eves: <strong>{info.winterFriday}</strong></p>
          <p className="mt-3 text-sm sm:text-base">Special holiday eves: <strong>{info.holidayEves}</strong></p>
          <p className="mt-3 text-sm leading-relaxed"><strong>Last entry is one hour before closing.</strong> A confirmed timed reservation is required. Check <a href={official.center} target="_blank" rel="noopener noreferrer" className={inlineLink}>official hours</a> for holiday exceptions.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Visitor center admission</h3></div>
          <dl className="mt-3 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between gap-3"><dt>Adult</dt><dd className="font-semibold" dir="ltr">{info.adult}</dd></div>
            <div className="flex justify-between gap-3"><dt>Child, ages 5–18</dt><dd className="font-semibold" dir="ltr">{info.child}</dd></div>
            <div className="flex justify-between gap-3"><dt>Student</dt><dd className="font-semibold" dir="ltr">{info.student}</dd></div>
            <div className="flex justify-between gap-3"><dt>Adult in group (30+)</dt><dd className="font-semibold" dir="ltr">{info.adultGroup}</dd></div>
            <div className="flex justify-between gap-3"><dt>Child in group (30+)</dt><dd className="font-semibold" dir="ltr">{info.childGroup}</dd></div>
            <div className="flex justify-between gap-3"><dt>Israeli senior / active-duty soldier</dt><dd className="font-semibold" dir="ltr">{info.israeliSenior}</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed">Children under 5 enter free. Eligible park memberships and discounts may apply. These prices do <strong>not</strong> apply to open crater viewpoints. <a href={official.center} target="_blank" rel="noopener noreferrer" className={inlineLink}>Official fee list</a>.</p>
        </article>
      </div>
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="ramon-booking">
        <h3 className="font-serif text-xl font-semibold">Reserve the visitor center</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">Advance reservations are required for indoor exhibitions. The link opens the official site, where you can choose an available entry time; the crater itself can be enjoyed from outdoor viewpoints without this booking.</p>
        <a href={official.center} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">Visitor center — information & reservations <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
      </div>
      <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 sm:p-5" data-testid="ramon-safety">
        <h3 className="font-serif text-xl font-semibold">Safety, accessibility and facilities</h3>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-x-6 sm:text-base [&>li]:mb-2 [&>li]:break-inside-avoid">
          <li><strong>Heat and water:</strong> Pack water, sun protection and suitable walking shoes. Most crater-floor routes have little shade.</li>
          <li><strong>Floods:</strong> Do not enter wadis when storms are forecast anywhere upstream. Check flash-flood forecasts and follow official trail and road closure notices.</li>
          <li><strong>Driving:</strong> Route 40 is paved, but desert side tracks vary. Use a suitable vehicle and stay on designated roads.</li>
          <li><strong>Cliffs:</strong> Keep behind barriers and away from unstable edges; supervise children near viewpoints.</li>
          <li><strong>Accessibility:</strong> The visitor center and some park viewing areas have accessible facilities. Natural hiking trails and dirt roads may not be suitable for wheelchairs.</li>
          <li><strong>Facilities:</strong> Restrooms, information and services are available at the visitor center; do not expect water or toilets at every desert stop.</li>
          <li><strong>Wildlife:</strong> Observe ibex from a distance and never feed them.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">For visitor-center information, call <a href="tel:+97286588691" className={inlineLink} dir="ltr">{info.phone}</a> or email <a href={"mailto:" + info.email} className={inlineLink}>{info.email}</a>. For park-wide notices, check the <a href={official.center} target="_blank" rel="noopener noreferrer" className={inlineLink}>parks authority</a>.</p>
      </div>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4">
      <p>Mitzpe Ramon sits on <strong>Route 40, south of Be'er Sheva</strong>. The crater rim is beside the town; HaMinsara, Ramon Colors and some trailheads are farther along or off the road. Save your actual stop before setting out.</p>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="ramon-three-stops">
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Visitor center</h3>
          <p className="mt-2 text-sm">Start here for the museum and rim views.</p>
          <a href={centerDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">HaMinsara</h3>
          <p className="mt-2 text-sm">Short walk to unusual geological columns.</p>
          <a href={minsaraDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
        <article className="rounded-xl border bg-card p-3">
          <h3 className="font-serif text-lg font-semibold">Ramon Colors</h3>
          <p className="mt-2 text-sm">Scenic drive through restored quarries.</p>
          <a href={colorsDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Directions <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </article>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By car or private driver</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Route 40 connects Be'er Sheva, Mitzpe Ramon and the desert farther south. A <Link to="/car-rental/" className={inlineLink}>rental car</Link> or <a href="#contact" className={inlineLink}>private driver</a> is the easiest way to link different crater stops. Check road conditions before taking a dirt track. Parking beside the visitor center is paid; the park authority lists free parking at the Hai Ramon lot.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">By bus</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Intercity buses serve Mitzpe Ramon, including connections via Be'er Sheva. Use the <a href="https://bus.gov.il/en/home" target="_blank" rel="noopener noreferrer" className={inlineLink}>official journey planner</a> for your date and return trip. Most crater-floor trailheads are not close to a town bus stop.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-semibold">On foot</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The town-side rim is easy to explore on a short visit. For crater-floor trails, plan an appropriate trailhead and enough time to return safely before dark.</p>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3" data-testid="ramon-map">
          <h3 className="text-sm font-semibold">Where is Ramon Crater?</h3>
          <iframe title="Map showing Ramon Crater and Mitzpe Ramon in the Negev" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">View larger map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border bg-card p-4 sm:p-5" data-testid="ramon-visit-options">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Choose your visit</h3></div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
          <p><strong>Quick stop (45–90 minutes):</strong> Enjoy a free rim viewpoint and Camel Hill, or reserve the visitor center if you prefer an indoor experience.</p>
          <p><strong>Half day (3–4 hours):</strong> Start at the rim, visit HaMinsara and drive through Ramon Colors, with time for photographs and short walks.</p>
          <p><strong>Full day:</strong> Combine an early marked hike with viewpoint stops and a relaxed visit to Mitzpe Ramon. Make sure the route suits the weather and your hiking experience.</p>
          <p><strong>Overnight:</strong> Stay in the area for sunset, stargazing and a cooler morning walk. Choose an authorised campground or accommodation.</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">I recommend prioritising two or three stops and allowing more time than the map suggests for dirt roads, walking and photos.</p>
      </div>
      <figure className="overflow-hidden rounded-xl border bg-card" data-testid="ramon-panorama">
        <img src={panoramaPhoto} alt="Wide panoramic view over the rocky terrain and coloured layers of Ramon Crater" width={1200} height={675} loading="lazy" decoding="async" className="h-auto max-h-[420px] w-full object-cover object-center"/>
        <figcaption className="px-3 py-2 text-xs text-muted-foreground">Ramon Crater's wide desert landscape. Plan walks according to the weather and available daylight.</figcaption>
      </figure>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Despite its name in English, Makhtesh Ramon is neither a volcano nor a meteor-impact crater. It was formed by erosion over millions of years as softer rock layers were worn away within a folded geological structure, leaving a vast basin surrounded by steep cliffs.</p>
      <p>The makhtesh is around 40 kilometres long and exposes a remarkable record of ancient geological events. Its coloured sediments, volcanic rocks and changing desert habitats make it a memorable open-air geology lesson.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Guided desert walks, jeep excursions and night-sky experiences can introduce you to parts of the landscape that require more preparation. Check each tour's actual route, pickup location, duration and weather policy before booking.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/negev-desert-ramon-crater/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={jeepPhoto} alt="Off-road vehicle on a desert track in the Ramon Crater area" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Negev desert & Ramon Crater tours</h3><p className="mt-1 text-sm text-muted-foreground">Explore guided trips, desert experiences and available excursions.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4"/></span></div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={cloudsPhoto} alt="Clouds and open desert slopes at Makhtesh Ramon" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1"><h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private desert day</h3><p className="mt-1 text-sm text-muted-foreground">Choose your viewpoints, time on the trails and departure location.</p><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Request a quote <ArrowUpRight className="h-4 w-4"/></span></div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Ramon Crater a meteorite crater?", a: "No. Makhtesh Ramon is an erosion landform created as rock layers wore away over millions of years, not an impact crater or volcano." },
    { q: "Do I have to pay to see Ramon Crater?", a: "No. Outdoor rim viewpoints are free. The indoor Ramon Visitor Center charges admission and requires an advance booking." },
    { q: "Can I enjoy Ramon Crater without hiking?", a: "Yes. The rim promenade, Camel Hill and scenic drives provide memorable views. Parts of Ramon Colors also have accessible facilities." },
    { q: "Is Hai Ramon open?", a: "Hai Ramon is closed as of November 2026. Check the official Israel Nature and Parks Authority website for its current status before travelling." },
    { q: "Can I see the stars from Ramon Crater?", a: "The dark-sky park offers excellent potential for stargazing, but actual visibility depends on moonlight, clouds and local conditions. Use authorised viewing areas." },
  ],
  nearby: [
    { label: "Masada National Park", to: "/attractions/masada/", note: "The famous desert fortress above the Dead Sea on a separate excursion." },
    { label: "Ein Gedi Nature Reserve", to: "/attractions/ein-gedi/", note: "A contrasting freshwater oasis and desert trails by the Dead Sea." },
    { label: "Qasr el-Yahud", to: "/attractions/qasr-el-yahud/", note: "A Jordan River heritage stop for a longer regional trip." },
    { label: "Old City of Jerusalem", to: "/attractions/old-city-jerusalem/", note: "Historic quarters and pilgrimage sites on another sightseeing day." },
    { label: "Mount of Olives", to: "/attractions/mount-of-olives/", note: "Jerusalem panoramas and significant heritage landmarks." },
    { label: "Mount Zion", to: "/attractions/mount-zion/", note: "Historic churches and religious sites in Jerusalem." },
  ],
  planningLinks: [
    { label: "Eilat & the Red Sea", to: "/attractions/eilat/", description: "Plan the next part of a southern Israel trip.", icon: "region" },
    { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/", description: "Build a longer journey with time for the desert.", icon: "itinerary" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Compare buses, drivers and car rentals.", icon: "transport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Weather and season-by-season planning.", icon: "seasons" },
    { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/", description: "See how the desert can fit a longer visit.", icon: "itinerary" },
    { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", description: "Practical advice for your journey.", icon: "region" },
  ],
  sources: [
    { label: "Israel Nature and Parks Authority — Ramon Visitor Center", url: official.center },
    { label: "Israel Nature and Parks Authority — Ramon Colors", url: official.colors },
    { label: "Israel Nature and Parks Authority — HaMinsara walk", url: official.minsara },
    { label: "Israel Nature and Parks Authority — Nahal Ardon trail", url: official.ardon },
    { label: "Israel Nature and Parks Authority — Hai Ramon status", url: official.haiRamon },
    { label: "DarkSky International — Ramon Crater Dark Sky Park", url: official.darkSky },
    { label: "Photo credit — HaMinsara columns (Yuvalr, CC BY-SA 3.0; resized)", url: "https://commons.wikimedia.org/wiki/File:Sandy_rectangular_and_hexagonal_prisms_at_the_centre_of_Makhtesh_Ramon_-_Ha-Minsara_(The_Carpentry_Shop),_Israel.jpg" },
    { label: "Photo credit — fat sand rat (SuperJew, CC BY-SA 3.0; resized)", url: "https://commons.wikimedia.org/wiki/File:Fat_Sand_Rat.jpg" },
  ],
};

export function RamonCraterAttractionPage() {
  return <AttractionDestinationPage content={ramonCraterDestinationContent} />;
}
