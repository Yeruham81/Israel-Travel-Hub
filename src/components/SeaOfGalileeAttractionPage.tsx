import type { ReactNode } from "react";
import { BusFront, CarFront, ExternalLink } from "lucide-react";
import { SiteLink as Link } from "@/components/SiteLink";
import { AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip, type AttractionDestinationContent } from "@/components/AttractionDestinationPage";
import { affiliateConfig } from "@/data/registry";
import { recordAffiliateTourClick } from "@/lib/tour-analytics";
import { relFor } from "@/lib/outbound";
const lakeHero = "/images/attractions/sea-of-galilee.webp";
import waterfront from "@/assets/tiberias/waterfront.webp";
import sunrise from "@/assets/tiberias/sunrise.webp";
import lakeView from "@/assets/home/hero-galilee-sm-optimized.webp";
import boatCard from "@/assets/tiberias/central.webp";
import nazarethCard from "@/assets/guides/2026-10/mount-precipice.webp";
import privateCard from "@/assets/tiberias/heritage.webp";

const sources = {
  beaches: "https://ikinneret.org.il/%D7%9E%D7%99%D7%93%D7%A2-%D7%95%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%97%D7%95%D7%A4%D7%99-%D7%9B%D7%99%D7%A0%D7%A8%D7%AA/",
  tzemach: "https://ikinneret.org.il/beaches/%D7%97%D7%95%D7%A3-%D7%A6%D7%9E%D7%97/",
  hukok: "https://ikinneret.org.il/beaches/%D7%97%D7%95%D7%A3-%D7%97%D7%95%D7%A7%D7%95%D7%A7-%D7%A6%D7%A4%D7%95%D7%9F/",
  kursi: "https://ikinneret.org.il/beaches/%D7%9B%D7%95%D7%A8%D7%A1%D7%99-%D7%97%D7%95%D7%A3-%D7%A9%D7%A7%D7%98/",
  unsafeShore: "https://ikinneret.org.il/beaches/%D7%A9%D7%A4%D7%9A-%D7%A0%D7%97%D7%9C-%D7%A2%D7%9E%D7%95%D7%93/",
  arbel: "https://en.parks.org.il/reserve-park/arbel-national-park-and-nature-reserve/",
  egged: "https://www.egged.co.il/",
  lakeAuthority: "https://ikinneret.org.il/",
};
const maps = {
  tiberias: "https://www.google.com/maps/dir/?api=1&destination=Tiberias%2C%20Israel",
  tzemach: "https://www.google.com/maps/dir/?api=1&destination=Tzemach%20Beach%2C%20Sea%20of%20Galilee%2C%20Israel",
  hukok: "https://www.google.com/maps/dir/?api=1&destination=Hukok%20North%20Beach%2C%20Sea%20of%20Galilee%2C%20Israel",
  kursi: "https://www.google.com/maps/dir/?api=1&destination=Kursi%20Beach%2C%20Sea%20of%20Galilee%2C%20Israel",
  lake: "https://www.google.com/maps/search/?api=1&query=Sea%20of%20Galilee%2C%20Israel",
};
const inlineLink = "font-semibold text-primary underline underline-offset-4";
function External({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={inlineLink}>{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

export const seaOfGalileeSite = {
  title: "Sea of Galilee: Beaches, Tiberias & Visitor Guide",
  description: "Plan a visit to Israel's Sea of Galilee: supervised beaches, Tiberias, lakeside boat trips, Capernaum, Tabgha, transport and day-trip ideas.",
  updatedAt: "2026-11-21",
  hero: { src: lakeHero, alt: "Blue waters of the Sea of Galilee with the surrounding hills" },
  sources,
} as const;

export const galileeTours = [
  {
    id: "tour-nazareth-galilee-tel-aviv-getyourguide@tours-nazareth-galilee",
    provider: "GetYourGuide",
    title: "Nazareth, Tiberias & Sea of Galilee",
    description: "An organised Galilee excursion departing from Tel Aviv. Check the exact stops, duration and pickup details.",
    photo: { src: boatCard, alt: "Tiberias and the Sea of Galilee seen from the town" },
    departure: "From Tel Aviv",
  },
  {
    id: "tour-nazareth-galilee-jerusalem-viator@tours-nazareth-galilee",
    provider: "Viator",
    title: "Nazareth & Sea of Galilee Day Trip",
    description: "A guided northern Israel day trip from Jerusalem with selected lakeside and Christian heritage stops.",
    photo: { src: nazarethCard, alt: "View over Nazareth and the Galilee hills" },
    departure: "From Jerusalem",
  },
  {
    id: "tour-galilee-private-tel-aviv-viator@tours-nazareth-galilee",
    provider: "Viator",
    title: "Private Nazareth, Tiberias & Galilee Tour",
    description: "An externally operated private guided option from Tel Aviv; inclusions and itinerary depend on the product selected.",
    photo: { src: privateCard, alt: "Historic architecture in Tiberias near the Sea of Galilee" },
    departure: "Private tour · Tel Aviv",
  },
] as const;

export function SeaOfGalileeTourCards() {
  return <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="galilee-tour-cards">
    {galileeTours.map(tour => {
      const href = affiliateConfig[tour.id]?.trackingUrl;
      if (!href) return null;
      return <a key={tour.id} href={href} target="_blank" rel={relFor(true)}
        onClick={() => recordAffiliateTourClick({ pageId: "attractions-sea-of-galilee", productId: tour.id, offerId: tour.id, provider: tour.provider, linkUrl: href })}
        className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <img src={tour.photo.src} alt={tour.photo.alt} width={480} height={280} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
        <span className="flex flex-1 flex-col p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{tour.provider}</span>
          <span className="mt-1 text-base font-bold leading-snug">{tour.title}</span>
          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.description}</span>
          <span className="mt-3 text-xs font-semibold text-muted-foreground">{tour.departure} · Check current dates and rates</span>
          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary">View tour details <ExternalLink className="size-3.5" aria-hidden="true" /></span>
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>;
    })}
  </div>;
}

/** A lakeside visitor guide, rather than a second list of the individual church pages. */
export const seaOfGalileeDestinationContent: AttractionDestinationContent = {
  path: "/attractions/sea-of-galilee/",
  placeName: "the Sea of Galilee",
  factsTitle: "The Sea of Galilee at a glance",
  title: seaOfGalileeSite.title,
  heroTitle: "The Sea of Galilee",
  region: "Sea of Galilee & Jordan River",
  intro: "The Sea of Galilee combines a peaceful freshwater lake with some of northern Israel's best-known historical and biblical sites. I'll help you choose a beach, explore Tiberias and the northern shore, and plan a realistic day without rushing between every stop.",
  hero: seaOfGalileeSite.hero,
  updatedAt: seaOfGalileeSite.updatedAt,
  highlightsTitle: "What to experience around the lake",
  visitorTitle: "Beaches, swimming and facilities",
  visitorNavLabel: "Beaches & swimming",
  transportTitle: "Getting to the Sea of Galilee",
  itineraryTitle: "Plan a day at the Sea of Galilee",
  historyTitle: "Why the Sea of Galilee matters",
  relatedTitle: "Explore the Sea of Galilee and Jordan",
  contactIntroduction: "Planning a private day trip around the Sea of Galilee, Tiberias or Nazareth? Tell me your starting point, travel date and the places you'd like to visit. I'll reply personally about private transport and a route that fits your day.",
  facts: [
    { icon: "location", label: "Region", value: "Northern Israel", note: "The lake lies below sea level in the Jordan Rift Valley" },
    { icon: "duration", label: "Time needed", value: "1–2 days", note: "Half a day for a beach; longer to explore the lake" },
    { icon: "admission", label: "Lake access", value: "Varies by beach", note: "Several beaches offer free pedestrian entry" },
    { icon: "hours", label: "Swimming", value: "Seasonal", note: "Use designated beaches during lifeguard shifts" },
    { icon: "highlights", label: "Best for", value: "Scenery & heritage", note: "Beaches, boat trips and Christian sites" },
    { icon: "access", label: "Main base", value: "Tiberias", note: "Hotels, buses, restaurants and lakeside walks" },
  ],
  glanceNote: <><strong>For a first visit, I recommend choosing one main focus:</strong> a relaxed beach and Tiberias, or the northwestern shore's historic churches and archaeological sites. Combine both only when your transport and opening hours make it practical.</>,
  highlightContent: <div className="mt-4 space-y-3">
    <AttractionHighlight title="Walk along the Tiberias waterfront" image={{ src: waterfront, alt: "Tiberias waterfront and the Sea of Galilee" }}>
      <p>Tiberias is the region's most convenient base, with lakeside views, hotels, restaurants and bus connections. Start at the promenade for a relaxed introduction, then explore the town or continue to a supervised beach.</p>
      <p>For a longer stay, my <Link to="/accommodation/tiberias/" className={inlineLink}>Tiberias accommodation guide</Link> helps you compare hotel styles and locations. A hotel with a lake view does not necessarily have its own swimming beach.</p>
    </AttractionHighlight>
    <AttractionHighlight title="Enjoy a designated lakeside beach">
      <p>Unlike the Dead Sea, Lake Kinneret is freshwater, and swimming feels much more like an ordinary lake. Facilities, lifeguard shifts, parking, camping and entry policies vary considerably between beaches.</p>
      <p>Good places to investigate include <External href={sources.tzemach}>Tzemach Beach</External> on the southern shore, <External href={sources.hukok}>Hukok North</External> on the northwest, and <External href={sources.kursi}>Kursi</External> to the east. Check the beach authority's notices before setting out.</p>
    </AttractionHighlight>
    <AttractionPracticalTip><strong>Not every shoreline is a swimming beach.</strong> Some scenic or freely accessible stretches are officially unrecognised for bathing. For example, the <External href={sources.unsafeShore}>Nahal Amud estuary</External> is a natural shoreline where the authorities prohibit swimming.</AttractionPracticalTip>
    <AttractionHighlight title="See Capernaum, Tabgha and the Mount of Beatitudes">
      <p>The northwestern shore is especially rewarding for visitors interested in New Testament history. <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link> has lakeside archaeological remains, <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha</Link> is associated with the multiplication of the loaves and fishes, and the <Link to="/attractions/mount-of-beatitudes/" className={inlineLink}>Mount of Beatitudes</Link> offers a hilltop sanctuary with lake views.</p>
      <p>Choose two or three nearby sites, allowing time for separate entrances, religious services and local opening arrangements. The sites are not a single admission complex.</p>
    </AttractionHighlight>
    <AttractionHighlight title="Boat trips and lake views" image={{ src: sunrise, alt: "Sunlight reflecting across Lake Kinneret at Tiberias" }}>
      <p>Boat excursions can offer a different perspective on the surrounding hills and villages. Cruises depart from designated jetties, including in the Tiberias area, but routes and departure schedules depend on operators and season.</p>
      <p>If your preference is a lookout rather than a cruise, <External href={sources.arbel}>Arbel National Park</External> overlooks the lake from the west. Cliff-edge routes can be steep and may close in unsuitable weather; a short viewpoint visit is different from the full hike.</p>
    </AttractionHighlight>
    <AttractionHighlight title="The Jordan River and Yardenit" image={{ src: lakeView, alt: "Green hills and lake scenery of the Galilee region" }}>
      <p>The Jordan River flows out of the southern end of the Sea of Galilee. <Link to="/attractions/yardenit/" className={inlineLink}>Yardenit</Link> is a managed baptismal visitor site south of the lake, while <Link to="/attractions/magdala/" className={inlineLink}>Magdala</Link> on the western shore combines archaeology with a modern pilgrimage centre.</p>
      <p>A visit to Yardenit is not the same as arranging a baptism ceremony; check the site's visitor guidance if that is your purpose.</p>
    </AttractionHighlight>
  </div>,
  visitorContent: <div className="mt-4 space-y-4">
    <p>The Sea of Galilee has both municipal and regional-authority beaches. Free entry on foot at some managed beaches does not mean free parking, guaranteed facilities or supervised swimming at all hours. The <External href={sources.beaches}>official Kinneret beach guide</External> is the best place to check the beach that matches your route.</p>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="galilee-beaches">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Tzemach Beach</h3>
        <p className="mt-2 text-sm"><strong>Southern shore · Free entry</strong></p>
        <p className="mt-2 text-sm leading-relaxed">A designated quiet beach with accessible facilities. The authority lists supervised bathing during its swimming season, normally 09:00–17:00. Camping is prohibited here.</p>
        <div className="mt-3 space-y-1 text-sm"><External href={sources.tzemach}>Beach rules and facilities</External><div><External href={maps.tzemach}>Get directions</External></div></div>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Hukok North</h3>
        <p className="mt-2 text-sm"><strong>Northwestern shore · Free on foot</strong></p>
        <p className="mt-2 text-sm leading-relaxed">A family-oriented quiet beach with shaded areas and camping facilities. Vehicle parking and some optional services are charged separately.</p>
        <div className="mt-3 space-y-1 text-sm"><External href={sources.hukok}>Beach rules and facilities</External><div><External href={maps.hukok}>Get directions</External></div></div>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Kursi Beach</h3>
        <p className="mt-2 text-sm"><strong>Eastern shore · Free on foot</strong></p>
        <p className="mt-2 text-sm leading-relaxed">A quieter managed shoreline with shade, showers and accessible bathing equipment. Parking is charged by the beach authority.</p>
        <div className="mt-3 space-y-1 text-sm"><External href={sources.kursi}>Beach rules and facilities</External><div><External href={maps.kursi}>Get directions</External></div></div>
      </article>
    </div>
    <AttractionPracticalTip>Swimming is permitted only in the designated area when lifeguards are working. Check seasonal notices, water-quality alerts and weather before entering. Unsupervised shores are not a substitute, even when the gate or promenade is open.</AttractionPracticalTip>
    <p className="text-sm leading-relaxed">A beach's admission policy, paid parking, camping permission and accessibility are separate questions. The Kinneret Cities Association operates a public information hotline at <strong>*55477</strong> for current beach details.</p>
  </div>,
  transportContent: <div className="mt-4 space-y-3">
    <p>Use a specific destination such as Tiberias, Tzemach Beach or Capernaum when planning transport. The lake has a long shoreline, and attractions on different sides can take much longer to connect than a map suggests.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><CarFront className="size-5 text-primary" aria-hidden="true" />By car or private driver</h3>
        <p className="mt-2 text-sm leading-relaxed">A car gives the most flexibility for the northern heritage sites, beaches and eastern shore. Approaches from the centre of Israel generally use Route 6 or other northbound highways, with Routes 77, 90 and 92 around the lake depending on the destination.</p>
        <p className="mt-2 text-sm leading-relaxed">Leave time for traffic and site opening hours. A <Link to="/private-driver-in-israel/" className={inlineLink}>private driver</Link> can be practical for a full-day route with several stops.</p>
        <div className="mt-2"><External href={maps.tiberias}>Directions to Tiberias</External></div>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><BusFront className="size-5 text-primary" aria-hidden="true" />By public bus</h3>
        <p className="mt-2 text-sm leading-relaxed">Tiberias is the area's principal bus hub. Intercity buses connect it with other parts of Israel, but not every lakeside church, viewpoint or beach has a convenient connection or return service.</p>
        <p className="mt-2 text-sm leading-relaxed">There is no passenger railway station at Tiberias. Check <External href={sources.egged}>current bus schedules</External>, the exact nearest stop, and your return trip—especially on Fridays and Jewish holidays.</p>
      </article>
    </div>
    <p className="text-sm">For an organised excursion that starts outside the region, browse <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>Nazareth & Sea of Galilee day tours</Link>.</p>
  </div>,
  itineraryContent: <div className="mt-4 space-y-4">
    <div className="grid gap-3 sm:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">A relaxed lakeside day</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>Start with a walk and a coffee along the Tiberias waterfront.</li>
          <li>Spend time at a lifeguard-supervised beach that fits your transport route and bathing season.</li>
          <li>Enjoy a short boat trip, a lake viewpoint or a meal beside the shore, subject to availability.</li>
        </ol>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Northwestern heritage circuit</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>Visit Capernaum and its lakeside remains in the morning.</li>
          <li>Continue to Tabgha and the Mount of Beatitudes, checking each site's opening hours.</li>
          <li>Choose Magdala or a Tiberias waterfront stop if time permits; allow for the drive back.</li>
        </ol>
      </article>
    </div>
    <AttractionPracticalTip>For a one-day trip from Jerusalem or Tel Aviv, choose three or four main places and keep them geographically close. A beach break, several churches, an Arbel hike and a Jordan River stop will usually be too much for one comfortable day.</AttractionPracticalTip>
    <div className="rounded-xl border bg-card p-4 sm:p-5">
      <h3 className="font-serif text-lg font-semibold">Sea of Galilee area map</h3>
      <p className="mt-1 text-sm text-muted-foreground">The map covers the wider lake. Use the individual directions above for a specific beach or Tiberias.</p>
      <iframe title="Map of the Sea of Galilee, Tiberias and surrounding shores in Israel" src="https://maps.google.com/maps?q=Sea%20of%20Galilee%2C%20Israel&hl=en&z=10&t=m&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-3 h-64 w-full rounded-lg border sm:h-80" />
      <div className="mt-3"><External href={maps.lake}>Open the Sea of Galilee in Google Maps</External></div>
    </div>
  </div>,
  practicalContent: <div className="mt-4 space-y-4">
    <div className="grid gap-3 sm:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">At the beach</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Swim only at declared, lifeguard-supervised areas during official shifts.</li>
          <li>Take water shoes for rocky lake edges; keep children within reach and follow lifeguard warnings.</li>
          <li>Bring water, sunscreen, shade and a towel. Conditions can change with winds and changing water levels.</li>
          <li>Check whether camping, loud music, barbecues or dogs are permitted at your selected beach.</li>
        </ul>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">At historic and religious sites</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Wear clothing suitable for visiting churches and active worship sites.</li>
          <li>Check the opening hours and separate access rules of each compound.</li>
          <li>Choose cooler hours for outdoor ruins, viewpoints and walking routes.</li>
          <li>Check <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays and special dates</Link> when planning transport and services.</li>
        </ul>
      </article>
    </div>
    <AttractionPracticalTip>Water levels, storm conditions and seasonal beach operations can affect access. Confirm the current status of the specific beach or trail on the day you visit rather than assuming all of the lake is open for swimming or walking.</AttractionPracticalTip>
  </div>,
  historyContent: <div className="mt-4 space-y-3 leading-relaxed">
    <p>Despite its English name, the Sea of Galilee is a freshwater lake. It is also known as Lake Kinneret and Lake Tiberias. Its water level varies over time, and the lake is an important part of Israel's northern landscape and water history.</p>
    <p>The lakeshore and nearby settlements are associated with several accounts in the New Testament, including the ministry of Jesus and traditions remembered at Capernaum, Tabgha and the Mount of Beatitudes. Visitors also find Jewish history, archaeology, agricultural villages and modern lakeside life.</p>
    <p>If religious heritage is your main interest, start with the dedicated <Link to="/attractions/capernaum/" className={inlineLink}>Capernaum</Link> and <Link to="/attractions/tabgha/" className={inlineLink}>Tabgha</Link> guides; the lake itself also rewards time simply spent enjoying the setting.</p>
  </div>,
  tourContent: <div className="mt-4 space-y-3">
    <p>These existing Viator and GetYourGuide partner tours offer organised ways to explore parts of the Galilee from Jerusalem or Tel Aviv. Operators select different stops; not every tour includes a boat ride, swimming, or a Jordan River baptism ceremony.</p>
    <SeaOfGalileeTourCards />
    <p className="text-xs leading-relaxed text-muted-foreground">Check current prices, departure times, ratings, entrance tickets and cancellation terms on the booking provider before paying.</p>
    <p>For additional routes and departure choices, see <Link to="/tours/nazareth-sea-of-galilee/" className={inlineLink}>all Nazareth & Sea of Galilee tours</Link>. For a flexible private car-and-driver itinerary, <a href="#contact" className={inlineLink}>contact me</a>.</p>
  </div>,
  faqs: [
    { q: "Is the Sea of Galilee a sea or a lake?", a: "It is a freshwater lake, known in Hebrew as Lake Kinneret. Its shore and waters lie below sea level." },
    { q: "Can I swim in the Sea of Galilee?", a: "Yes, at designated beaches in the supervised bathing area during active lifeguard shifts. Some natural shorelines are not authorised for swimming, even if they are open for walking." },
    { q: "Are Sea of Galilee beaches free?", a: "Some Kinneret authority beaches offer free pedestrian entry but charge for parking or extras. Other municipal or private facilities may charge admission. Check the specific beach." },
    { q: "What is the best town to stay in?", a: "Tiberias is usually the most practical base for hotels, restaurants and bus connections. Smaller lakeside communities can suit travellers looking for a quieter overnight stay." },
    { q: "How long should I spend around the lake?", a: "Allow half a day for a beach and Tiberias or a full day for a selection of the northern heritage sites. Two days lets you explore more slowly and include viewpoints or a boat trip." },
    { q: "Can I visit Capernaum and Tabgha in one day?", a: "Yes. Capernaum, Tabgha and the Mount of Beatitudes form a practical cluster on the northwestern shore when their opening hours allow." },
    { q: "Can I reach the Sea of Galilee without a car?", a: "Tiberias has intercity bus services, but many lakeside sights need further transport. Check routes and the last return bus before committing to a multi-stop day." },
    { q: "Do the boat cruises operate every day?", a: "Not necessarily. Operators set their own schedules and departure points, so confirm current availability directly before arranging the rest of your itinerary." },
    { q: "Can I see Nazareth and the Sea of Galilee in a day?", a: "Yes, but a guided excursion or private driver can help because the sites are spread out. Choose the highlights most important to you rather than every possible stop." },
    { q: "Is Yardenit beside the Sea of Galilee?", a: "Yardenit is at the southern end of the area, on the Jordan River downstream from the lake. A baptismal ceremony is separate from simply visiting the site." },
    { q: "Which beach is best for families?", a: "Choose a declared beach with staffed lifeguards, shade, toilets and accessible facilities for your group. Tzemach, Hukok North and Kursi are three options to compare using the authority's beach guide." },
  ],
  nearby: [
    { label: "Capernaum", to: "/attractions/capernaum/", note: "Ancient synagogue and lakeside archaeology" },
    { label: "Tabgha", to: "/attractions/tabgha/", note: "Mosaic church and biblical traditions" },
    { label: "Mount of Beatitudes", to: "/attractions/mount-of-beatitudes/", note: "Church gardens and sweeping lake views" },
    { label: "Magdala", to: "/attractions/magdala/", note: "Archaeological remains and pilgrimage centre" },
    { label: "Yardenit", to: "/attractions/yardenit/", note: "Managed baptismal site on the Jordan River" },
    { label: "Mount Tabor", to: "/attractions/mount-tabor/", note: "A nearby Galilee heritage destination" },
  ],
  planningLinks: [
    { label: "Hotels around Tiberias", to: "/accommodation/tiberias/", icon: "region", description: "Find a practical lakeside base" },
    { label: "Nazareth & Galilee tours", to: "/tours/nazareth-sea-of-galilee/", icon: "itinerary", description: "Compare organised excursions" },
    { label: "Jordan River baptism sites", to: "/travel-blog/baptism-in-the-jordan-river/", icon: "region", description: "Compare Yardenit with other baptism sites" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", icon: "transport", description: "Plan connections and bus journeys" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", icon: "seasons", description: "Weather, heat and seasonal planning" },
    { label: "Private driver in Israel", to: "/private-driver-in-israel/", icon: "itinerary", description: "Arrange flexible road transport" },
  ],
  sources: [
    { label: "Kinneret Cities Association — official beach directory", url: sources.beaches },
    { label: "Kinneret Cities Association — Tzemach Beach", url: sources.tzemach },
    { label: "Kinneret Cities Association — Hukok North Beach", url: sources.hukok },
    { label: "Kinneret Cities Association — Kursi Beach", url: sources.kursi },
    { label: "Kinneret Cities Association — Nahal Amud estuary (bathing prohibited)", url: sources.unsafeShore },
    { label: "Kinneret Cities Association — visitor notices", url: sources.lakeAuthority },
    { label: "Israel Nature and Parks Authority — Arbel National Park", url: sources.arbel },
    { label: "Egged — official bus and route planning", url: sources.egged },
  ],
};

export function SeaOfGalileeAttractionPage() {
  return <AttractionDestinationPage content={seaOfGalileeDestinationContent} />;
}
