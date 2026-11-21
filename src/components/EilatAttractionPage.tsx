import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, Waves, Sun, Ticket, Mountain } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { eilatSite } from "@/data/eilatSite";
import { affiliateConfig, travelGuidePaths } from "@/data/registry";
import { recordOutboundClick } from "@/lib/outbound";
import coralUnderwater from "@/assets/eilat/coral-reef.webp";
import timnaPhoto from "@/assets/home/timna-park-feature-optimized.webp";
import mountainsPhoto from "@/assets/home/hero-eilat-mountains-large.webp";

const official = eilatSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const map = (place: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
const directions = (origin: string, destination: string) =>
  "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin)
  + "&destination=" + encodeURIComponent(destination) + "&travelmode=driving";
const maps = {
  city: "https://maps.google.com/maps?q=Eilat%2C%20Israel&hl=en&z=12&t=m&output=embed",
  marine: directions("North Beach, Eilat, Israel", "Coral Beach Nature Reserve, Eilat, Israel"),
  desert: directions("Eilat, Israel", "Timna Park, Israel"),
};
const sourcesLink = (url: string, name: string) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className={inlineLink}>{name}</a>
);
const placeLink = (place: string, name = "View location on Google Maps") => (
  <a href={map(place)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">
    {name} <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
  </a>
);

const photos = {
  reserve: "/images/attractions/eilat-coral-beach.webp",
  observatory: "/images/attractions/eilat-underwater-observatory.webp",
  dolphin: "/images/attractions/eilat-dolphin-reef.webp",
  watersports: "/images/attractions/eilat-water-sports.webp",
} as const;

const partnerTours = [
  {
    id: "glass-bottom",
    key: "tour-eilat-glass-bottom-boat-getyourguide@tours-eilat-red-sea",
    provider: "GetYourGuide",
    title: "Glass-bottom boat on the Red Sea",
    text: "An easy way to see the gulf from the water, with underwater windows on the advertised boat. Check the exact route, visibility and departure point.",
    meta: "Boat trip · No diving experience needed",
    subId: "attractions_eilat_glass_bottom",
  },
  {
    id: "snorkeling",
    key: "tour-eilat-snorkeling-viator@tours-eilat-red-sea",
    provider: "Viator",
    title: "Guided Red Sea snorkeling",
    text: "Join a supervised snorkeling activity if you want help choosing a safe entry point and learning about local marine life. Check minimum ages and swimming ability.",
    meta: "Water activity · Sea conditions matter",
    subId: "attractions_eilat_snorkeling",
  },
  {
    id: "red-canyon",
    key: "tour-eilat-red-canyon-jeep-viator@tours-eilat-red-sea",
    provider: "Viator",
    title: "Red Canyon desert jeep experience",
    text: "Explore the scenery beyond the resort area. Confirm that the itinerary includes the canyon itself, the amount of walking and current trail conditions.",
    meta: "Desert excursion · Operator-led route",
    subId: "attractions_eilat_red_canyon",
  },
] as const;

function EilatPartnerTours() {
  const tours = partnerTours.flatMap(tour => {
    const raw = affiliateConfig[tour.key]?.trackingUrl;
    if (!raw) return [];
    const link = new URL(raw);
    if (link.protocol !== "https:" || !["viator.tpm.li", "getyourguide.tpm.li", "viator.tpk.lv", "getyourguide.tpk.lv"].includes(link.hostname)) return [];
    link.searchParams.set("sub_id", tour.subId);
    return [{ ...tour, href: link.toString() }];
  });
  if (!tours.length) return null;
  return <div data-testid="eilat-affiliate-tour-cards" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {tours.map(tour => <article key={tour.id} className="flex min-w-0 flex-col rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{tour.provider}</p>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">{tour.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tour.text}</p>
      <p className="mt-3 text-xs font-semibold text-foreground">{tour.meta}</p>
      <a href={tour.href} target="_blank" rel="sponsored noopener noreferrer"
        onClick={() => recordOutboundClick({ pageId: "attractions-eilat", productId: tour.id, offerId: tour.key })}
        className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary/40 px-3 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-secondary">
        Check tour & availability <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
      </a>
    </article>)}
  </div>;
}

export const eilatDestinationContent: AttractionDestinationContent = {
  path: "/attractions/eilat/",
  placeName: "Eilat",
  title: eilatSite.title,
  heroTitle: "Eilat: Red Sea Attractions & City Guide",
  highlightsTitle: "What to see and do in Eilat",
  region: eilatSite.region,
  hero: eilatSite.hero,
  intro: eilatSite.intro,
  updatedAt: eilatSite.updatedAt,
  itineraryFirst: true,
  itineraryTitle: "How I would plan one, two or three days in Eilat",
  visitorTitle: "Admission, opening hours and visitor essentials",
  visitorNavLabel: "Visitor essentials",
  transportTitle: "Getting to Eilat and moving between attractions",
  relatedTitle: "Explore southern Israel and plan your next trip",
  navigationSections: [
    ["highlights", "Top attractions"],
    ["visit-plan", "Suggested itineraries"],
    ["visitor-info", "Tickets & practicalities"],
    ["getting-there", "Transport & map"],
    ["food", "Food & the waterfront"],
    ["practical", "My planning tips"],
    ["tours", "Tours & activities"],
    ["faq", "Questions"],
    ["contact", "Contact me"],
  ],
  contactIntroduction: "Planning a trip to Eilat or a journey through southern Israel? Tell me your travel date, starting point, passengers and the places you would like to see. I can help arrange a private transfer or a customised trip with a driver; I do not book accommodation or sell admission tickets.",
  facts: [
    { icon: "location", label: "Location", value: "Israel's Red Sea coast", note: "Southern tip of the country" },
    { icon: "duration", label: "Time to allow", value: "2–3 days", note: "A full day for the sea, another for the desert" },
    { icon: "highlights", label: "Best for", value: "Reefs, beaches & desert", note: "Family activities and outdoor experiences" },
    { icon: "admission", label: "Cost", value: "Free + paid sights", note: "Each park or activity has its own tickets" },
    { icon: "access", label: "Getting around", value: "Bus, taxi or car", note: "The southern beaches and desert are spread out" },
    { icon: "hours", label: "Visit planning", value: "Check each venue", note: "Heat, winds and holidays affect plans" },
  ],
  glanceNote: <>Eilat is a city, not a single ticketed attraction. Public beaches and the promenade are different from Coral Beach Nature Reserve, Dolphin Reef, the Underwater Observatory and Timna Park, all of which have their own admission and visitor arrangements.</>,
  highlightContent: <div className="mt-4 space-y-5" data-testid="eilat-attractions-highlights">
    <p>The city's two biggest advantages are the marine life just offshore and the contrasting desert landscapes. The following are my priorities for a first visit, beginning in the city and moving south along the coast before heading into the mountains.</p>
    <AttractionHighlight title="Coral Beach Nature Reserve" image={{ src: photos.reserve, alt: "Clear turquoise water over coral formations at Eilat Coral Beach Nature Reserve" }}>
      <p>This protected reef is among Eilat's main snorkeling spots. Marked access points help visitors enter the water without trampling coral, and the reserve has beach facilities. Entry is paid; compare the current visitor rules and time slots on the {sourcesLink(official.coralReserve, "Israel Nature and Parks Authority website")}.</p>
      <p><strong>Best for:</strong> confident swimmers and travelers who want to see colorful fish and coral while following marine-protection rules. Swimming ability, sea conditions and suitable footwear matter.</p>
      {placeLink("Coral Beach Nature Reserve, Eilat, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="Underwater Observatory Marine Park" image={{ src: photos.observatory, alt: "Distinctive white underwater observatory tower on a pier in Eilat" }}>
      <p>The observatory's viewing rooms let you look at the natural reef below the surface without entering the water. Additional exhibits focus on Red Sea marine life. It is an attractive alternative for non-swimmers, families and very hot afternoons.</p>
      <p>Allow time for a genuine park visit rather than treating it as a quick photo stop. The operator recommends around three to four hours; check {sourcesLink(official.underwaterObservatory, "current park hours, ticket types and attractions")}.</p>
      {placeLink("Underwater Observatory Marine Park, Eilat, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="Dolphin Reef" image={{ src: photos.dolphin, alt: "Dolphin swimming alongside a diver at Dolphin Reef in Eilat" }}>
      <p>At this separate coastal attraction you can watch dolphins from observation platforms and enjoy the shoreline. Guided snorkeling and introductory diving are optional activities with separate requirements and reservations.</p>
      <p>Dolphin sightings are <strong>not guaranteed</strong>; the animals are free to approach or stay away. Consult the {sourcesLink(official.dolphinReef, "official Dolphin Reef visit information")} and the {sourcesLink(official.dolphinSwim, "activity rules")} before booking.</p>
      {placeLink("Dolphin Reef, Eilat, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="North Beach, the promenade and marina" image={{ src: photos.watersports, alt: "Eilat marina with moored boats, waterfront hotels and the Red Sea" }}>
      <p>The central beachfront and promenade are easy options for an unstructured morning or evening: waterfront walks, cafés, hotel-area beaches and views towards the surrounding mountains. This is the most straightforward area if you are staying in central Eilat without a car.</p>
      <p>Not every beach has a lifeguard or identical facilities. Look for signs at the specific beach before swimming, and do not assume that every water-sports kiosk is operating year-round.</p>
      {placeLink("Eilat North Beach, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="Snorkeling, scuba diving and water sports" image={{ src: coralUnderwater, alt: "Fish and coral in the Red Sea near Eilat" }}>
      <p>Beyond the reserve, Eilat offers guided snorkeling, introductory diving, kayaking, stand-up paddling and boat trips. Choose the activity according to your swimming skills, age, comfort in the water and the operator's safety procedures.</p>
      <p>Keep distance from wildlife, never touch or stand on coral, and do not feed fish. A glass-bottom boat is a useful option for visitors who prefer to stay dry. See the <Link to="/tours/eilat-red-sea/" className={inlineLink}>Eilat activities and tours page</Link> for more options.</p>
    </AttractionHighlight>
    <AttractionHighlight title="Water sports and glass-bottom boat trips">
      <p>There are ways to enjoy the gulf without snorkeling or diving. Depending on season and conditions, private operators may offer paddleboarding, kayaking, boat cruises and other water activities. Glass-bottom boat trips are a good alternative for visitors who prefer not to swim.</p>
      <p>Check the exact departure point, safety instructions, weather cancellation policy and whether the activity is suitable for children. <Link to="/tours/eilat-red-sea/" className={inlineLink}>Compare Eilat activities</Link> before making a reservation.</p>
    </AttractionHighlight>
    <AttractionHighlight title="Timna Park" image={{ src: timnaPhoto, alt: "Sandstone cliffs and sculpted formations in Timna Park north of Eilat" }}>
      <p>Timna is a desert landscape of sandstone formations, archaeological copper-mining sites and dramatic viewpoints, a short drive north of the city. The park is extensive; many visitors combine short walks and drives between major stops rather than hiking the entire park.</p>
      <p>It has its own entry fee, opening rules and trail restrictions. Check {sourcesLink(official.timna, "visitor information")} and {sourcesLink(official.timnaNavigation, "navigation guidance")} before you leave Eilat. Carry plenty of water and avoid strenuous hiking in midday heat.</p>
      {placeLink("Timna Park, Eilot, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="Red Canyon and Eilat Mountains" image={{ src: mountainsPhoto, alt: "Rocky mountain ridges and colorful desert terrain near Eilat" }}>
      <p>The Red Canyon is a short but dramatic sandstone gorge outside the city, reached via Road 12. Some marked routes involve narrow passages, steps or ladders; they are not suitable for every visitor. Other Eilat Mountains routes include viewpoints and longer hikes with very different difficulty levels.</p>
      <p>Check the {sourcesLink(official.eilatMountains, "Eilat Mountains Nature Reserve guidance")} and the {sourcesLink(official.redCanyon, "Red Canyon route description")} for access and current closures. Never enter wadis when rain or flash flooding is possible, including storms upstream.</p>
      {placeLink("Red Canyon, Eilat Mountains, Israel")}
    </AttractionHighlight>
    <AttractionHighlight title="Eilat Birdwatching Park and Botanical Garden">
      <p>For a quieter side of Eilat, the {sourcesLink(official.birds, "Eilat Birdwatching Park")} near the northern entrance to the city provides habitat for migratory birds, with birdwatching particularly interesting during migration periods. Check whether guided walks are offered for your dates.</p>
      <p>The {sourcesLink(official.botanical, "Eilat Botanical Garden")} is a separate planted, shaded attraction on the northern side of the city. It is a good change of pace from the beaches, but it has its own opening schedule and admission rules.</p>
      <div className="flex flex-wrap gap-4">{placeLink("Eilat Birdwatching Park, Israel", "Birdwatching Park map")}{placeLink("Eilat Botanical Garden, Israel", "Botanical Garden map")}</div>
    </AttractionHighlight>
    <AttractionPracticalTip>My first-visit priorities would be one reef experience, one non-water activity and an early desert outing. Do not try to fit Timna Park, Red Canyon, the observatory and a full beach afternoon into a single day.</AttractionPracticalTip>
  </div>,
  itineraryContent: <div className="mt-4 space-y-4" data-testid="eilat-suggested-itineraries">
    <p>The best plan depends on whether you want mostly beach time or a mix of Red Sea and desert scenery. These are flexible outlines rather than fixed-hour tours.</p>
    <div className="grid gap-4 md:grid-cols-3">
      <article className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">One day: the Red Sea</h3></div>
        <p className="mt-3 text-sm leading-relaxed">Start with Coral Beach Nature Reserve <strong>or</strong> Dolphin Reef. Spend the afternoon at the Underwater Observatory if you enjoy marine exhibits, then return to the North Beach promenade for an evening walk.</p>
        <p className="mt-2 text-xs text-muted-foreground">Choose two main paid stops rather than rushing between all three.</p>
        <a href={maps.marine} target="_blank" rel="noopener noreferrer" className={inlineLink}>View north-to-south coastal route</a>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2"><Waves className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Two days: coast + desert</h3></div>
        <p className="mt-3 text-sm leading-relaxed"><strong>Day 1:</strong> Coral Beach or a guided snorkeling experience, followed by the observatory or marina. <strong>Day 2:</strong> Timna Park with an early start, keeping the late afternoon free for rest or the waterfront.</p>
        <p className="mt-2 text-xs text-muted-foreground">A rental car or pre-arranged transport makes the park day simpler.</p>
        <a href={maps.desert} target="_blank" rel="noopener noreferrer" className={inlineLink}>View Eilat–Timna driving route</a>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2"><Mountain className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Three days: a relaxed stay</h3></div>
        <p className="mt-3 text-sm leading-relaxed">Keep the first two days unhurried. On the third day, choose either a suitable Red Canyon walk or a guided Eilat Mountains activity. The Birdwatching Park or Botanical Garden is a gentler alternative.</p>
        <p className="mt-2 text-xs text-muted-foreground">Desert routes depend on weather, fitness, transport and trail status.</p>
      </article>
    </div>
    <AttractionPracticalTip>If you arrive in Eilat late in the day, use that afternoon for the promenade or a meal. Save the desert for an early morning and do not begin an unfamiliar trail close to sunset.</AttractionPracticalTip>
  </div>,
  visitorContent: <div className="mt-4 space-y-4" data-testid="eilat-visitor-essentials">
    <p>There is <strong>no single entrance fee or opening-hours timetable for Eilat</strong>. Public streets, the promenade and many beaches are free to access; admission to managed marine parks, nature reserves, Timna Park and organised activities is separate. Check each operator's rules before purchasing.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Ticket className="size-5 text-primary"/>Tickets and reservations</h3>
        <p className="mt-2 text-sm leading-relaxed">Coral Beach Reserve, Dolphin Reef, the Underwater Observatory and Timna Park all have different prices and visiting requirements. Some activities need advance booking; the park or operator's official page is the best place to verify availability.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Sun className="size-5 text-primary"/>Seasonal conditions</h3>
        <p className="mt-2 text-sm leading-relaxed">Summer afternoons can be extremely hot in the mountains. Winter is often better for strenuous desert walks, but heavy rain can close routes because of flash floods. Sea visibility, wind and water conditions also vary.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Waves className="size-5 text-primary"/>Swimming and reef safety</h3>
        <p className="mt-2 text-sm leading-relaxed">Use designated water-entry points, follow lifeguard signs where present and never step on coral. If you are not a confident swimmer, consider an aquarium visit or supervised boat activity instead of entering the water alone.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Footprints className="size-5 text-primary"/>Accessibility and families</h3>
        <p className="mt-2 text-sm leading-relaxed">The city promenade is different from rocky reefs and desert trails. Stairs, ladders, uneven rock and water access can be major limitations. Check accessible routes, child-age restrictions and any physical requirements directly with each venue.</p>
      </article>
    </div>
    <AttractionPracticalTip>Book the attraction you most care about before filling the rest of the day. If a reef activity or desert tour is weather-dependent, keep a flexible alternative such as the Underwater Observatory or a relaxed city visit.</AttractionPracticalTip>
  </div>,
  transportContent: <div className="mt-4 space-y-4" data-testid="eilat-transport">
    <p>Eilat is long and spread along the coast. The central hotel area and promenade are walkable, but Coral Beach, Dolphin Reef, the Underwater Observatory, Timna and the Red Canyon are not all within a pleasant city walk of one another.</p>
    <div className="grid gap-3 md:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-xl font-semibold"><BusFront className="size-5 text-primary"/>Local buses and airport arrival</h3>
        <p className="mt-3 text-sm leading-relaxed">Ramon Airport is north of Eilat. Egged routes, including lines 30 and 50, serve different parts of the city and airport corridor. Check the {sourcesLink(official.airport, "Ramon Airport ground-transport page")} and {sourcesLink(official.egged, "Egged route information")} for the latest stops and departures.</p>
        <p className="mt-2 text-sm leading-relaxed">Bus services can be reduced around Shabbat and Jewish holidays. Use the {sourcesLink(official.transportPlanner, "national journey planner")} before relying on a late connection.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="flex items-center gap-2 font-serif text-xl font-semibold"><CarFront className="size-5 text-primary"/>Car, taxi and day trips</h3>
        <p className="mt-3 text-sm leading-relaxed">Taxis are useful between beaches, hotels and activity locations. A car is particularly practical for Timna, while Red Canyon access and hiking arrangements deserve separate planning. You can compare <Link to="/car-rental/" className={inlineLink}>rental cars in Israel</Link> or enquire about a <Link to="/private-driver/" className={inlineLink}>private driver</Link>.</p>
        <p className="mt-2 text-sm leading-relaxed">There is no passenger railway to Eilat. Long-distance bus, road travel and flights through Ramon Airport are the main connections from central Israel; verify current schedules and services.</p>
      </article>
    </div>
    <div className="overflow-hidden rounded-xl border bg-secondary/10" data-testid="eilat-city-map">
      <iframe title="Map of Eilat, southern beaches and nearby roads" src={maps.city} width="100%" height="320" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full border-0" />
    </div>
    <p className="text-sm leading-relaxed">Use the individual Google Maps links in the attraction descriptions for precise locations. The city overview map is for orientation, not a complete route between these widely separated sites.</p>
  </div>,
  foodContent: <div className="mt-4 space-y-3">
    <p>Restaurants and cafés are concentrated around the North Beach hotel district, marina and shopping areas, while some quieter beach cafés sit farther south. Prices, kosher supervision and Friday-evening opening vary by business, so check the specific venue rather than assuming one rule applies citywide.</p>
    <p>For an introduction to Israeli food before your visit, see my <Link to="/travel-blog/what-to-eat-in-israel/" className={inlineLink}>guide to what to eat in Israel</Link>. A leisurely dinner on the waterfront makes a natural finish to a beach or boat day.</p>
  </div>,
  practicalContent: <div className="mt-4 space-y-4">
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Prepare for the sun and sea</h3>
        <p className="mt-2 text-sm leading-relaxed">Carry drinking water, sun protection and secure footwear. On the reef, prioritize marine protection over touching or photographing wildlife at close range. Check swim conditions on the day.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Do not underestimate the desert</h3>
        <p className="mt-2 text-sm leading-relaxed">Use official marked trails, start early and check weather warnings. Some routes have ladders or exposed areas; a suitable guide is sensible if you are unfamiliar with the terrain.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Match the activity to your group</h3>
        <p className="mt-2 text-sm leading-relaxed">A reef snorkel, introductory dive, desert hike and aquarium visit have very different physical requirements. Check minimum ages, accessibility, insurance and cancellation terms before booking.</p>
      </article>
      <article className="rounded-xl border bg-card p-4">
        <h3 className="font-serif text-lg font-semibold">Check special dates</h3>
        <p className="mt-2 text-sm leading-relaxed"><Link to={travelGuidePaths.calendar} className={inlineLink}>Israel's holiday and special-date guide</Link> can help you anticipate bus service changes, demand for hotels and special opening arrangements. Also check weekends and local event dates.</p>
      </article>
    </div>
  </div>,
  tourContent: <div className="mt-4 space-y-4">
    <p>Prefer a booked activity? These are three different ways to experience Eilat, selected from existing Viator and GetYourGuide listings. They are provided by independent operators, not by me. Availability, exact meeting points and whether the activity is running must be confirmed with the provider.</p>
    <EilatPartnerTours/>
    <p className="text-xs leading-relaxed text-muted-foreground">The booking links use Travelpayouts affiliate tracking. No live price, rating, departure availability or booking confirmation is displayed here; check the provider's details before purchasing.</p>
    <p>For a wider choice, <Link to="/tours/eilat-red-sea/" className={inlineLink}>explore all Eilat & Red Sea tours</Link>. If your priority is transport to several attractions rather than an organised group activity, use the inquiry form below.</p>
  </div>,
  faqs: [
    { q: "How many days should I spend in Eilat?", a: "Two or three days allow for marine attractions, the waterfront and at least one desert excursion. A single day can cover a limited set of highlights, but not everything comfortably." },
    { q: "Is Eilat a single paid attraction?", a: "No. Eilat is a resort city. Public areas such as the promenade and some beaches can be explored without a city admission ticket, while the Coral Beach Nature Reserve, Dolphin Reef, Underwater Observatory, Timna Park and guided activities charge separately." },
    { q: "Where should I go snorkeling in Eilat?", a: "Coral Beach Nature Reserve is one of the better-known supervised reef-access choices. Follow the site's designated entry points and reef-protection rules. Guided activities are available elsewhere for visitors who want instruction." },
    { q: "Can I see dolphins without booking a swim?", a: "Dolphin Reef has observation areas for visitors, with separate optional guided activities. The dolphins are free to approach or remain elsewhere, so sightings are not guaranteed." },
    { q: "Can I explore Eilat without renting a car?", a: "Yes, particularly if you stay near the central hotel district and use city buses or taxis for the southern beaches. A car or arranged excursion is much more convenient for Timna Park and remote desert trailheads." },
    { q: "Is Red Canyon suitable for everyone?", a: "Not necessarily. Some marked routes require negotiating narrow rock passages, ladders or steps. Check difficulty, mobility needs, access and weather before visiting. Never enter a canyon with a risk of flash flooding." },
    { q: "What is the best season for Eilat?", a: "The sea can be enjoyed across much of the year depending on conditions. Cooler months are often more comfortable for desert hikes; summer outings require particular heat precautions. Check the forecast and local notices." },
    { q: "How do I reach Eilat from Ramon Airport?", a: "Egged serves the airport-city corridor with routes including 30 and 50; taxis and arranged pickups are other choices. Check the official Ramon Airport and Egged information for the correct stop, timetable and accessibility arrangements." },
  ],
  nearby: [
    { label: "Ramon Crater", to: "/attractions/mitzpe-ramon-crater/", note: "A natural stop on a longer journey through the Negev" },
    { label: "Masada", to: "/attractions/masada/", note: "Desert fortress and archaeological visit" },
    { label: "The Dead Sea", to: "/attractions/dead-sea/", note: "Saltwater beaches and desert scenery" },
    { label: "Ein Gedi", to: "/attractions/ein-gedi/", note: "Oasis and nature reserve near the Dead Sea" },
    { label: "Caesarea", to: "/attractions/caesarea/", note: "Explore another coastal archaeological site" },
    { label: "Old Jaffa", to: "/attractions/jaffa/", note: "A contrasting historic port city on the Mediterranean" },
  ],
  planningLinks: [
    { label: "Eilat & Red Sea tours", to: "/tours/eilat-red-sea/", description: "Snorkeling, boats and desert activities", icon: "region" },
    { label: "Getting around Israel", to: travelGuidePaths.israel, description: "Buses, driving and connections", icon: "transport" },
    { label: "Rent a car in Israel", to: "/car-rental/", description: "Plan independent travel to the desert", icon: "transport" },
    { label: "Best time to visit", to: travelGuidePaths.bestTime, description: "Seasons and weather considerations", icon: "seasons" },
    { label: "Israel itineraries", to: "/travel-blog/israel-itinerary-10-days/", description: "Include Eilat in a longer trip", icon: "itinerary" },
    { label: "Airport transfer services", to: "/airport-transfers/", description: "Arrange a private arrival or onward transfer", icon: "arrival" },
  ],
  sources: [
    { label: "INPA — Eilat Coral Beach Nature Reserve", url: official.coralReserve },
    { label: "Underwater Observatory — visiting the park", url: official.underwaterObservatory },
    { label: "Dolphin Reef — visitor information", url: official.dolphinReef },
    { label: "Dolphin Reef — swimming and suitability rules", url: official.dolphinSwim },
    { label: "Timna Park — know before your visit", url: official.timna },
    { label: "Timna Park — navigation and access", url: official.timnaNavigation },
    { label: "INPA — Eilat Mountains Nature Reserve", url: official.eilatMountains },
    { label: "INPA — Red Canyon trail guide", url: official.redCanyon },
    { label: "Eilat Birdwatching Park — official visitor information", url: official.birds },
    { label: "Eilat Botanical Garden — official information", url: official.botanical },
    { label: "Israel Airports Authority — Ramon Airport transport", url: official.airport },
    { label: "Egged — airport and Eilat bus routes", url: official.egged },
  ],
};
export function EilatAttractionPage() {
  return <AttractionDestinationPage content={eilatDestinationContent}/>;
}
