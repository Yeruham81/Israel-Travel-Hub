import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, TrainFront, Ticket, TramFront } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { haifaSite } from "@/data/haifaSite";
import { affiliateConfig } from "@/data/registry";
import { recordOutboundClick } from "@/lib/outbound";
import carmelPhoto from "@/assets/haifa/panorama.webp";
import museumsPhoto from "@/assets/guides/2026-10/museums-in-haifa.webp";
import caesareaTourPhoto from "@/assets/home/caesarea-aqueduct.webp";

const official = haifaSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const pictures = {
  gardens: "/images/attractions/haifa-bahai-gardens.webp",
  carmel: carmelPhoto,
  colony: "/images/attractions/haifa-german-colony.webp",
  wadi: "/images/attractions/haifa-wadi-nisnas.webp",
  market: "/images/attractions/haifa-turkish-market.webp",
  stella: "/images/attractions/haifa-stella-maris.webp",
  cableCar: "/images/attractions/haifa-cable-car.webp",
  batGalim: "/images/attractions/haifa-bat-galim.webp",
  beach: "/images/attractions/haifa-beach.webp",
  museums: museumsPhoto,
} as const;

const placeMap = (query: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
const walkingMap = (origin: string, destination: string, waypoints: string[]) =>
  "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin)
  + "&destination=" + encodeURIComponent(destination)
  + "&travelmode=walking&waypoints=" + waypoints.map(encodeURIComponent).join("%7C");
export const downtownWalkingRoute = walkingMap(
  "Ben Gurion Boulevard, German Colony, Haifa, Israel",
  "Turkish Market, Moshe Aharon Street, Haifa, Israel",
  ["Bahai Gardens Lower Viewpoint, 21 Hagefen Street, Haifa, Israel", "Wadi Nisnas Market, Haifa, Israel"],
);
export const carmelWalkingRoute = walkingMap(
  "Carmel Center, Haifa, Israel",
  "Bahai Gardens Upper Balcony, 61 Yefe Nof, Haifa, Israel",
  ["Louis Promenade, Yefe Nof Street, Haifa, Israel"],
);
export const downtownFullRoute = downtownWalkingRoute;
const mapEmbed = "https://maps.google.com/maps?q=Haifa%2C%20Israel&hl=en&z=12&t=m&output=embed";

export type TourPlacement = {
  id: string;
  platform: "GetYourGuide" | "Viator";
  productCode: string;
  title: string;
  description: string;
  duration: string;
  priceFrom: string;
  rating: string;
  image: string;
  affiliateKey: string;
  subId: string;
};
/** Provider listing IDs and published snapshots checked 20 November 2026.
 * Travelpayouts redirect destinations still require separate periodic QA.
 */
export const haifaTourPlacements: TourPlacement[] = [
  {
    id: "coast-private-rosh-hanikra", platform: "Viator", productCode: "368992P3",
    title: "Caesarea, Haifa, Akko & Rosh Hanikra private tour",
    description: "A privately guided full-day coastal excursion starting in Tel Aviv, visiting Caesarea, a Haifa viewpoint, Akko and a planned Rosh Hanikra stop. This is not a short walk from Haifa Port.",
    duration: "8–10 hours", priceFrom: "From $1,450 per group", rating: "5.0/5 · 9 reviews",
    image: "/images/attractions/rosh-hanikra-cliffs.webp",
    affiliateKey: "tour-coast-private-rosh-hanikra-viator@tours-northern-coast",
    subId: "haifa_private_coast_viator",
  },
  {
    id: "caesarea-haifa-akko", platform: "GetYourGuide", productCode: "22120",
    title: "Caesarea, Haifa & Akko day trip from Tel Aviv",
    description: "An 11-hour guided coast tour with a Bahá’í Gardens viewpoint, Caesarea, Rosh Hanikra and Akko. Pickup is arranged in the Tel Aviv area.",
    duration: "11 hours", priceFrom: "From $95 per person", rating: "4.3/5 · 759 reviews",
    image: caesareaTourPhoto,
    affiliateKey: "tour-caesarea-haifa-akko-getyourguide@tours-northern-coast",
    subId: "haifa_coast_gyg",
  },
  {
    id: "north-coast-small-group", platform: "Viator", productCode: "58143P8",
    title: "Caesarea, Haifa & Acre small-group tour",
    description: "A guided small-group coastal day trip departing from Tel Aviv, covering Caesarea, Haifa and historic Akko. Confirm pickup and minimum-group requirements.",
    duration: "8–10 hours", priceFrom: "From $289 per person", rating: "5.0/5 · 8 reviews",
    image: "/images/attractions/akko-fishing-harbour.webp",
    affiliateKey: "tour-north-coast-small-group-viator@tours-northern-coast",
    subId: "haifa_coast_viator",
  },
];

/** Only display product-specific, already-configured Travelpayouts links. */
function HaifaPartnerTours() {
  const placements = haifaTourPlacements.flatMap((tour) => {
    const base = affiliateConfig[tour.affiliateKey]?.trackingUrl;
    return base?.startsWith("https://") && base.includes(".tpm.li/")
      ? [{ ...tour, url: base + "?sub_id=" + encodeURIComponent(tour.subId) }]
      : [];
  });
  if (!placements.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="haifa-affiliate-tour-cards">
      {placements.map((tour) => (
        <article key={tour.id} data-provider-product-code={tour.productCode} className="flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card">
          <img src={tour.image} alt="" loading="lazy" width={520} height={300} decoding="async"
            className="aspect-[16/9] w-full object-cover" />
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tour.platform}</p>
            <h3 className="mt-1 font-serif text-lg font-semibold">{tour.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground"><Clock3 className="mr-1 inline size-3.5" aria-hidden="true" />{tour.duration}</p>
              <p>{tour.priceFrom}</p>
              <p aria-label={"Rating " + tour.rating}>★ {tour.rating}</p>
            </div>
            <a href={tour.url} target="_blank" rel="sponsored noopener noreferrer"
              onClick={() => recordOutboundClick({ pageId: "attractions-haifa", productId: tour.id, offerId: tour.affiliateKey })}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">
              Check tour & availability <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
      <p className="col-span-full text-xs leading-relaxed text-muted-foreground">Prices and ratings are published provider snapshots checked November 2026, not live quotes. Verify availability, inclusions, reviews and final costs on the booking platform.</p>
    </div>
  );
}

const directions = (query: string, label = "View location on Google Maps") => (
  <a href={placeMap(query)} target="_blank" rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">
    {label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
  </a>
);

export const haifaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/haifa/",
  placeName: "Haifa",
  title: haifaSite.title,
  heroTitle: "Haifa: Attractions & City Guide",
  highlightsTitle: "What to see and do in Haifa",
  region: haifaSite.region,
  hero: haifaSite.hero,
  intro: haifaSite.intro,
  updatedAt: haifaSite.updatedAt,
  itineraryFirst: true,
  itineraryTitle: "Suggested Haifa itineraries",
  visitorTitle: "Visiting Haifa: gardens, tickets and accessibility",
  transportTitle: "Getting to and around Haifa",
  visitorNavLabel: "Visitor essentials",
  historyTitle: "Haifa's history and neighbourhoods",
  relatedTitle: "Explore Haifa and the northern coast",
  navigationSections: [
    ["highlights", "What to see"],
    ["visit-plan", "City itineraries"],
    ["visitor-info", "Visitor essentials"],
    ["getting-there", "Getting around"],
    ["food", "Food & markets"],
    ["tours", "Tours & day trips"],
    ["faq", "Questions"],
    ["contact", "Contact me"],
  ],
  contactIntroduction: "Planning a visit to Haifa, arriving at the port or travelling around northern Israel? Tell me your dates, pickup point and the places you would like to visit. I can help arrange a private transfer, a driver for the day or a customised sightseeing route.",
  facts: [
    { icon: "location", label: "Location", value: "Northern coast", note: "From Haifa Bay up Mount Carmel" },
    { icon: "duration", label: "Time needed", value: "Half-day to 2 days", note: "Choose a city walk or full itinerary" },
    { icon: "admission", label: "Public spaces", value: "Free to explore", note: "Some attractions charge separately" },
    { icon: "highlights", label: "Best for", value: "Gardens, culture & sea", note: "Viewpoints, markets, museums and beaches" },
    { icon: "access", label: "Getting around", value: "Walk + transport", note: "Steep slopes between city districts" },
    { icon: "hours", label: "Best time", value: "Daytime", note: "Market and garden access varies" },
  ],
  glanceNote: <>My advice is to choose an upper-Carmel viewpoint and one neighbourhood at the foot of the mountain, then use transport between them. Add the Bat Galim coast or a museum if your schedule permits.</>,
  highlightContent: (
    <div className="mt-4 space-y-3" data-testid="haifa-eight-highlights">
      <AttractionHighlight title="Bahá’í Gardens and the Shrine of the Báb"
        image={{ src: pictures.gardens, alt: "The symmetrical steps and greenery of the Bahá’í Gardens rising toward the golden-domed Shrine of the Báb" }}>
        <p>The nineteen garden terraces are Haifa's most recognisable landmark, stretching from the lower city up Mount Carmel. The golden-domed Shrine of the Báb is a sacred Bahá’í site. For an independent visit, choose one of the designated viewpoints; the terraces do not operate as a free, uninterrupted pedestrian route from the top to the German Colony.</p>
        <p><strong>Three separate self-guided viewpoints:</strong> Upper Balcony at <strong>61 Yefe Nof Street</strong>, Main Entrance at <strong>80 Hatzionut Avenue</strong>, and German Colony Plaza at <strong>21 Hagefen Street</strong>. The viewpoints are free, generally listed as 09:00–17:00, with closures on Bahá’í holy days, Yom Kippur and sometimes due to weather. The Shrine and inner gardens can have different access hours. See the <a href={official.bahai} className={inlineLink} target="_blank" rel="noopener noreferrer">official visit and access guide</a>.</p>
        <p><strong>Guided Upper Terraces Tour:</strong> a separate free, <a href={official.bahaiBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>advance-reservation experience</a>, starting at <strong>45 Yefe Nof Street</strong> and finishing on Hatzionut Avenue. It takes around 50 minutes, descends approximately 750 stairs and is unsuitable for visitors with walking difficulties or strollers. Dress modestly, covering shoulders and knees.</p>
        {directions("Bahai Gardens Upper Balcony, 61 Yefe Nof, Haifa, Israel", "Find the upper viewpoint on Google Maps")}
      </AttractionHighlight>
      <AttractionHighlight title="Louis Promenade and Carmel Center"
        image={{ src: pictures.carmel, alt: "Panoramic view over Haifa's city slopes and Mediterranean bay from Mount Carmel" }}>
        <p>Louis Promenade follows Yefe Nof Street on the Carmel ridge, with wide views across the city, port and bay. It is a natural pairing with the Upper Balcony of the Bahá’í Gardens: the two sights are across the street from one another.</p>
        <p>From Carmel Center, you can walk towards Louis Promenade and the nearby upper garden viewpoint. This is one of the easiest areas for visitors who want a big Haifa view without committing to a long downhill walk.</p>
        {directions("Louis Promenade, Yefe Nof, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="The German Colony"
        image={{ src: pictures.colony, alt: "Ben Gurion Boulevard and the Bahá’í Gardens rising behind Haifa's German Colony" }}>
        <p>Ben Gurion Boulevard is lined with nineteenth-century Templer-era buildings, restaurants and cafés, with the Bahá’í terraces rising above its eastern end. In the evening, the neighbourhood becomes a pleasant setting for a meal with the illuminated garden axis in view.</p>
        <p>The <Link to="/travel-blog/museums-in-haifa/" className={inlineLink}>Haifa City Museum</Link> occupies a restored historic building nearby, and the lower garden viewpoint at 21 Hagefen Street is a short walk away. This is a useful base for a compact walking route into Wadi Nisnas.</p>
        {directions("Ben Gurion Boulevard, German Colony, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="Wadi Nisnas: market and neighbourhood art"
        image={{ src: pictures.wadi, alt: "Stone buildings and street life in the Wadi Nisnas neighbourhood of Haifa", mobileContain: true }}>
        <p>Wadi Nisnas is a lived-in Arab neighbourhood known for its market lanes, small food businesses and outdoor art. It offers a different side of Haifa from the manicured gardens and waterfront.</p>
        <p>I would browse the market during the day, try a local pastry or hummus and look for the artwork along the streets. Respect residential entrances and ask before photographing people. Market stalls have independent hours; do not assume everything is open on Sunday.</p>
        {directions("Wadi Nisnas Market, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="Downtown Haifa and the Turkish Market"
        image={{ src: pictures.market, alt: "Pedestrian streets and historic commercial buildings in Haifa's Turkish Market district" }}>
        <p>The Lower City's renovated Turkish Market quarter, around Moshe Aharon Street, is a compact area of historic commercial buildings, cafés, bars and casual dining. It combines well with Wadi Nisnas and the German Colony on foot.</p>
        <p>Nearby streets around the port give a sense of Haifa's working maritime character. The nightlife is different from daytime market trading, so choose your timing according to whether you want food, architecture or an evening out.</p>
        {directions("Turkish Market, Moshe Aharon Street, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="Stella Maris Monastery and the tourist cable car"
        image={{ src: pictures.stella, alt: "Stella Maris Carmelite monastery on Mount Carmel in Haifa" }}>
        <p>The Carmelite monastery of Stella Maris overlooks the Mediterranean from the western tip of Mount Carmel. The church is associated with the tradition of the prophet Elijah, and its surroundings offer another vantage point across the coast.</p>
        <p>From nearby, the <a href={official.touristCableCar} target="_blank" rel="noopener noreferrer" className={inlineLink}>tourist cable car</a> runs between Stella Maris and the Bat Galim waterfront when operating, a short scenic ride distinct from the public-transport <em>Rakavlit</em> serving the university and Technion. Check operating hours and tickets separately, particularly in windy weather.</p>
        {directions("Stella Maris Monastery, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="Bat Galim promenade and waterfront"
        image={{ src: pictures.batGalim, alt: "Bat Galim seaside neighbourhood and Haifa Bay by the Mediterranean" }}>
        <p>Bat Galim feels unlike the hillside districts: its promenade, cafés and sea views reward an easy waterfront stroll. The lower station of the Stella Maris tourist cable car is here, so you can combine the coast with the monastery if the ride is operating.</p>
        <p>The nearby <strong>Elijah's Cave</strong> is another optional visit for those interested in religious traditions. Allow enough time to move between the sites rather than assuming all coastal stops are directly adjacent.</p>
        {directions("Bat Galim Promenade, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionHighlight title="Dado–Zamir Beach and the southern coast"
        image={{ src: pictures.beach, alt: "Sandy Mediterranean beach and shore promenade on Haifa's southern coast" }}>
        <p>Haifa's southern coastline offers a long promenade, cafés and accessible approaches near Dado–Zamir and Carmel Beach. The atmosphere is more about the sea than city sightseeing, making this a good extra stop for families or a relaxed afternoon.</p>
        <p>Swim only at officially designated beaches while lifeguards are on duty. Check the <a href={official.haifaBeaches} target="_blank" rel="noopener noreferrer" className={inlineLink}>municipal beach service and water-quality notices (Hebrew)</a>, particularly outside the normal bathing season.</p>
        {directions("Dado Beach, Haifa, Israel")}
      </AttractionHighlight>
      <AttractionPracticalTip>For a first visit, I would choose the Bahá’í Gardens viewpoint, the German Colony and Wadi Nisnas. Add one Carmel lookout or the Bat Galim coast depending on the time and transport available.</AttractionPracticalTip>
      <h3 className="pt-3 font-serif text-xl font-semibold">More culture and nature in Haifa</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <h4 className="font-serif text-lg font-semibold">Museums and family activities</h4>
          <p className="mt-2 text-sm leading-relaxed">Madatech's hands-on science exhibitions, the Haifa Museum of Art, the National Maritime Museum and the Haifa City Museum are all worth considering. Opening days, ticket prices and exhibitions differ. Start with my <Link to="/travel-blog/museums-in-haifa/" className={inlineLink}>Haifa museums guide</Link> or the <a href={official.haifaMuseums} target="_blank" rel="noopener noreferrer" className={inlineLink}>Haifa Museums network</a>.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h4 className="font-serif text-lg font-semibold">Carmel nature and city trails</h4>
          <p className="mt-2 text-sm leading-relaxed">Haifa also has urban nature paths down the Carmel wadis. Choose a marked section suited to your ability and daylight, and check current trail conditions. The municipality publishes a <a href={official.haifaNatureTrails} target="_blank" rel="noopener noreferrer" className={inlineLink}>collection of nature walks (Hebrew)</a> and the <a href={official.haifaWalkingTrails} target="_blank" rel="noopener noreferrer" className={inlineLink}>Haifa Trail's neighbourhood sections (Hebrew)</a>.</p>
        </article>
      </div>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4" data-testid="haifa-itineraries">
      <p>Haifa is not a single flat walking destination. I recommend combining short walks within individual districts with a Carmelit, bus or taxi ride when moving between Mount Carmel and the lower streets.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">A Lower City walk — around 2–3 hours</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Walk:</strong> Start on Ben Gurion Boulevard in the German Colony, stop at the lower Bahá’í viewpoint at 21 Hagefen Street, continue to Wadi Nisnas for market food and street art, and finish near the Turkish Market in the Lower City.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">The map joins the main stops. You can wander through nearby streets between them; allow extra time for a meal. The upper gardens are <strong>not</strong> part of this walk.</p>
          <a href={downtownWalkingRoute} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">
            Open Lower City walking route in Google Maps <ArrowUpRight className="h-4 w-4"/>
          </a>
        </article>
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">A Haifa highlights day — around 5–7 hours</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Morning:</strong> Start at Carmel Center, walk along Louis Promenade and finish at the Upper Balcony of the Bahá’í Gardens. <strong>Midday:</strong> Use the Carmelit, bus or taxi to reach the Lower City for the German Colony, Wadi Nisnas and lunch.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Optional afternoon:</strong> Stella Maris and the tourist cable car to Bat Galim. This last leg needs a separate bus or taxi transfer and depends on the cable car's operation. A booked garden tour or museum visit may replace other stops.</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <a className="inline-flex items-center gap-1 text-primary underline underline-offset-4" href={carmelWalkingRoute} target="_blank" rel="noopener noreferrer">Carmel viewpoint walk <ArrowUpRight className="h-4 w-4"/></a>
            <a className="inline-flex items-center gap-1 text-primary underline underline-offset-4" href={downtownFullRoute} target="_blank" rel="noopener noreferrer">Lower City section <ArrowUpRight className="h-4 w-4"/></a>
            <a className="inline-flex items-center gap-1 text-primary underline underline-offset-4" href={placeMap("Stella Maris cable car upper station, Haifa, Israel")} target="_blank" rel="noopener noreferrer">Optional Stella Maris stop <ArrowUpRight className="h-4 w-4"/></a>
          </div>
        </article>
      </div>
      <AttractionPracticalTip>If you reserve a time-specific garden visit, adjust the rest of your route around its meeting and finishing points.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4" data-testid="haifa-visitor-essentials">
      <p>Haifa is a city with independent attractions, not one ticketed site. Public streets, many viewpoints, beaches and promenades are free to visit. Museums, commercial cable cars and certain activities set separate prices and schedules.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Bahá’í Gardens access</h3></div>
          <p className="mt-2 text-sm leading-relaxed">See the main Bahá’í Gardens card above for entrances, admission and booking details. Access hours vary by area; use the <a className={inlineLink} href={official.bahai} target="_blank" rel="noopener noreferrer">official garden access page</a> for the latest changes.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Opening times vary by site</h3></div>
          <p className="mt-2 text-sm leading-relaxed">The German Colony and public promenades are not confined to museum hours. Stalls, cafés, religious sites and attractions have their own schedules; some have shorter opening days. <Link to="/travel-blog/israel-holidays/" className={inlineLink}>Jewish holidays</Link> and Bahá’í holy days can affect visits.</p>
        </article>
      </div>
      <article className="rounded-xl border bg-secondary/20 p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Accessibility and families</h3>
        <p className="mt-2 text-sm leading-relaxed">Haifa's slopes can be challenging even between nearby-looking neighbourhoods. The Lower City and parts of the beachfront are generally easier for shorter walks; the Carmel slopes, older steps and certain viewpoints require more care. For Bahá’í visits, the 80 Hatzionut Main Entrance has the largest paved self-guided area, although it includes a moderately steep slope. The guided terrace descent is not accessible to visitors with walking difficulties or strollers. Read the <a href={official.bahaiAccess} className={inlineLink} target="_blank" rel="noopener noreferrer">official accessibility guidance</a>.</p>
      </article>
      <article className="rounded-xl border bg-secondary/20 p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Safe beach visits</h3>
        <p className="mt-2 text-sm leading-relaxed">Visit designated bathing beaches, and swim only while lifeguards are on duty. The municipal <a href={official.haifaBeaches} target="_blank" rel="noopener noreferrer" className={inlineLink}>beach service information (Hebrew)</a> lists the supervised zones and seasonal updates.</p>
      </article>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4" data-testid="haifa-transport">
      <p>Haifa has several distinct transport systems. Before setting out, identify whether your next stop is uphill, downtown or on the coast. I would not recommend walking up the whole Carmel slope simply because two landmarks appear close on a map.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><TrainFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">Israel Railways and arrival stations</h3></div>
            <p className="mt-2 text-sm leading-relaxed"><strong>Haifa Center HaShmona</strong> is practical for the Lower City and German Colony; <strong>Hof HaCarmel</strong> is convenient for the southern beaches and onward buses. Bat Galim station serves the western waterfront. Use <a href={official.rail} className={inlineLink} target="_blank" rel="noopener noreferrer">Israel Railways</a> for current service and connections, or read my <Link to="/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" className={inlineLink}>airport-to-Haifa guide</Link>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><TrainFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">The Carmelit funicular</h3></div>
            <p className="mt-2 text-sm leading-relaxed">Haifa's underground Carmelit connects Downtown (Paris Square) with Carmel Center via several hillside stops. It is especially useful when combining the Lower City with Louis Promenade. Service does not operate through Shabbat itself; consult <a href={official.carmelit} className={inlineLink} target="_blank" rel="noopener noreferrer">municipal Carmelit information (Hebrew)</a> before your trip.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><BusFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">City buses and Metronit</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The bus network and Metronit rapid-bus routes connect coastal districts and other neighbourhoods. Some local routes operate on Saturdays, but services vary by line and time. Check a specific journey on the <a href={official.buses} className={inlineLink} target="_blank" rel="noopener noreferrer">national public transport planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><TramFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">Two different cable-car systems</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The short <a href={official.touristCableCar} className={inlineLink} target="_blank" rel="noopener noreferrer">tourist cable car</a> connects <strong>Stella Maris and Bat Galim</strong>. The longer public-transport <strong>Rakavlit</strong> connects the Check Post area with the Technion and University of Haifa. They serve different journeys; check each operator's schedule and price before relying on it.</p>
            <img src={pictures.cableCar} alt="Red tourist cable-car cabin above the Haifa coastline" loading="lazy" decoding="async" className="mt-3 aspect-[16/9] w-full max-w-sm rounded-lg object-cover" width={400} height={225}/>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">Taxi, private driver and parking</h3></div>
            <p className="mt-2 text-sm leading-relaxed">If you want to cover the upper Carmel, German Colony and western coast in the same day, a vehicle makes the transitions easier. Parking arrangements differ by district; allow time for a drop-off or paid parking. For a private transfer or full-day driver, <a className={inlineLink} href="#contact">send me an inquiry</a>.</p>
          </article>
        </div>
        <div className="h-fit rounded-xl border bg-card p-3">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary"/><h3 className="text-sm font-semibold">Haifa: the Carmel, Lower City and coast</h3></div>
          <iframe src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Map of Haifa and the adjoining Mount Carmel and Mediterranean coast" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-64 lg:h-72" />
          <a href={placeMap("Haifa, Israel")} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Open Haifa in Google Maps <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  foodContent: (
    <div className="mt-4 space-y-4">
      <p>Food is one of the pleasures of exploring Haifa. For a daytime market stop, I would head to Wadi Nisnas for Arab home-style dishes, hummus, pastries and small stalls. For restaurants and evening atmosphere, the German Colony and Lower City make convenient options.</p>
      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Wadi Nisnas</h3>
          <p className="mt-2 text-sm">Browse neighbourhood food stalls and local bakeries. Go earlier in the day if market shopping is your priority.</p>
          {directions("Wadi Nisnas Market, Haifa, Israel", "Find the market")}
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">Talpiot Market</h3>
          <p className="mt-2 text-sm">In Hadar, the historic Talpiot Market area mixes produce, food businesses and independent dining spots. Its geography is different from Wadi Nisnas, so plan a separate detour.</p>
          {directions("Talpiot Market, Sirkin Street, Haifa, Israel", "Find Talpiot Market")}
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-serif text-lg font-semibold">German Colony & Lower City</h3>
          <p className="mt-2 text-sm">Choose Ben Gurion Boulevard for the garden backdrop or the Turkish Market for an evening meal.</p>
          {directions("Turkish Market, Haifa, Israel", "Find the Turkish Market")}
        </article>
      </div>
      <p>For dishes to look out for across the country, see my <Link to="/travel-blog/what-to-eat-in-israel/" className={inlineLink}>guide to Israeli food</Link>. I would choose one area for a meal rather than cross the city several times just to visit restaurants.</p>
    </div>
  ),
  practicalContent: (
    <div className="mt-4 space-y-3">
      <AttractionPracticalTip><strong>Plan by elevation:</strong> use the Carmelit or a vehicle when moving between Carmel Center and the Lower City. Walking is more pleasant within a district than up the entire hill.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Before the gardens:</strong> check access restrictions or weather closures and bring water for a warm day on the Carmel.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Weekend timing:</strong> transport, shops, markets and places of worship follow different schedules on Friday and Saturday. Choose the activities you care about, then verify their operating times individually.</AttractionPracticalTip>
      <p>For a longer northern-Israel stay, consider choosing your base with my <Link to="/travel-blog/best-hotels-in-haifa/" className={inlineLink}>Haifa hotel guide</Link>. The Lower City, German Colony and Carmel Center offer very different transport and evening options.</p>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Haifa developed into a major port and commercial centre during the Ottoman and British Mandate periods. The nineteenth-century German Templer Colony, the expanding railway and harbour, and the Bahá’í World Centre added distinct layers to the city.</p>
      <p>Today, the city brings together diverse Jewish and Arab communities, historic neighbourhoods, academic institutions, industry and a vibrant cultural scene. The German Colony, Wadi Nisnas and Lower City each tell a different part of that story, while the terraces on Mount Carmel reflect Haifa's unique place in the Bahá’í faith.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>Most of the city sights above can be visited independently. If you would rather have local commentary or combine Haifa with other northern-coast destinations, these are relevant <strong>external booking options</strong>. A tour departing from Tel Aviv is not the same as a walking tour starting in Haifa. Verify the actual route, pickup, dates and price with the provider.</p>
      <HaifaPartnerTours />
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/tours/caesarea-haifa-acre/" className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/60">
          <h3 className="font-serif text-lg font-semibold group-hover:text-primary">Explore more Haifa, Caesarea & Akko tours</h3>
          <p className="mt-2 text-sm text-muted-foreground">Compare additional guided day tours and departure options in my northern coast tours collection.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Browse tours <ArrowUpRight className="h-4 w-4"/></span>
        </Link>
        <Link to="/shore-excursions/haifa/" className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/60">
          <h3 className="font-serif text-lg font-semibold group-hover:text-primary">Arriving at Haifa Port?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Explore shore excursions and private transport tailored to cruise passengers and the ship's schedule.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Haifa shore excursions <ArrowUpRight className="h-4 w-4"/></span>
        </Link>
      </div>
      <AttractionPracticalTip>The Gardens’ official guided visit is separate from the commercial tours above. Reserve it through the <a href={official.bahaiBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>official booking system</a>.</AttractionPracticalTip>
    </div>
  ),
  faqs: [
    { q: "How much time should I spend in Haifa?", a: "Two to three hours is enough for a Lower City and German Colony introduction. Allow about five to seven hours to combine Carmel viewpoints with the Lower City and an optional coast stop. An overnight visit gives you more flexibility for museums and beaches." },
    { q: "Can I visit the Bahá’í Gardens without booking?", a: "Yes. The designated viewpoints are available for self-guided visits; the separate guided route requires a reservation. See the entrances and booking details in the first attraction card." },
    { q: "Can I walk from the top of the Bahá’í Gardens to the German Colony through the terraces?", a: "No. The public viewpoints are separate; the terraces are not an unrestricted top-to-bottom public walkway. A reserved guided tour follows an authorised route with its own meeting and exit points." },
    { q: "Is Haifa easy to visit without a car?", a: "Yes, especially if you choose nearby sites within each district and use rail, the Carmelit, buses or taxis between hillside and coastal locations. Do not plan a single long walking loop across the mountain and harbour." },
    { q: "What can I do in Haifa on Saturday?", a: "Public promenades, viewpoints and some food businesses can be good options, though opening hours vary. Some city buses and Metronit services operate on Saturdays, while Israel Railways and the Carmelit have different weekend schedules. Check the exact service and venue." },
    { q: "Which Haifa activities work well for families?", a: "The Bat Galim waterfront, southern beaches in lifeguard season, Madatech and short Carmel lookouts are useful choices. For strollers, choose accessible garden areas instead of the guided terrace descent and check access notes for each site." },
  ],
  nearby: [
    { label: "Old Akko (Acre)", to: "/attractions/akko-acre/", note: "Crusader halls, Ottoman lanes, markets and harbour views." },
    { label: "Caesarea National Park", to: "/attractions/caesarea/", note: "Roman archaeology and the Mediterranean shoreline." },
    { label: "Rosh Hanikra", to: "/attractions/rosh-hanikra/", note: "Dramatic sea grottoes and coastal cliffs farther north." },
    { label: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/", note: "Art, science, maritime history and local heritage." },
    { label: "Where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/", note: "Choose between Carmel, the German Colony and the Lower City." },
    { label: "Haifa shore excursions", to: "/shore-excursions/haifa/", note: "Make the most of a cruise stop in northern Israel." },
  ],
  planningLinks: [
    { label: "Haifa museums guide", to: "/travel-blog/museums-in-haifa/", description: "Choose a museum by interest and location.", icon: "region" },
    { label: "How to get to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", description: "Airport connections by train, bus and taxi.", icon: "arrival" },
    { label: "Hotels in Haifa", to: "/travel-blog/best-hotels-in-haifa/", description: "Compare useful neighbourhoods and properties.", icon: "region" },
    { label: "Haifa & northern coast tours", to: "/tours/caesarea-haifa-acre/", description: "Explore guided visits and regional excursions.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Understand rail, buses and driving.", icon: "transport" },
    { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", description: "Practical advice before your trip.", icon: "region" },
  ],
  photoCredits: (
    <p>Additional Haifa neighbourhood photographs used under Creative Commons licences, resized and converted to WebP: <a href="https://commons.wikimedia.org/wiki/File:150421_haifa_-_ben_gurion_boulevard_PikiWiki_Israel.jpg" className={inlineLink} target="_blank" rel="noopener noreferrer">Lizzy Shaanan / PikiWiki Israel (German Colony)</a>, <a href="https://commons.wikimedia.org/wiki/File:Street_Scene_-_Wadi_Nisnas_Neighborhood_-_Haifa_-_Israel_-_01_(5690594824).jpg" className={inlineLink} target="_blank" rel="noopener noreferrer">Adam Jones (Wadi Nisnas)</a>, <a href="https://commons.wikimedia.org/wiki/File:110861_haifa_-_the_turkish_market_PikiWiki_Israel.jpg" className={inlineLink} target="_blank" rel="noopener noreferrer">Shlomo Roded / PikiWiki Israel (Turkish Market)</a>, <a href="https://commons.wikimedia.org/wiki/File:111718_haifa,_a_view_of_the_bat_galim_neighborhood_PikiWiki_Israel.jpg" className={inlineLink} target="_blank" rel="noopener noreferrer">Michal Freiman / PikiWiki Israel (Bat Galim)</a>. Licences: <a href="https://creativecommons.org/licenses/by/2.5/" className={inlineLink} target="_blank" rel="noopener noreferrer">CC BY 2.5</a> for PikiWiki photographs and <a href="https://creativecommons.org/licenses/by-sa/2.0/" className={inlineLink} target="_blank" rel="noopener noreferrer">CC BY-SA 2.0</a> for Adam Jones's photograph. The original photo rights of the site's legacy archive remain under separate review.</p>
  ),
  sources: [
    { label: "Bahá’í World Centre — official Haifa visitor entrances, hours and guided tours", url: official.bahai },
    { label: "Bahá’í World Centre — official Upper Terraces guided tour reservation", url: official.bahaiBooking },
    { label: "Bahá’í World Centre — accessibility information", url: official.bahaiAccess },
    { label: "Haifa Municipality — things to see and do (Hebrew)", url: official.haifaAttractions },
    { label: "Haifa Municipality — Carmel and neighbourhood walking routes (Hebrew)", url: official.haifaWalkingTrails },
    { label: "Haifa Municipality — nature trails (Hebrew)", url: official.haifaNatureTrails },
    { label: "Haifa Municipality — Carmelit funicular (Hebrew)", url: official.carmelit },
    { label: "Haifa Municipality — Stella Maris tourist cable car (Hebrew)", url: official.touristCableCar },
    { label: "Haifa Municipality — public beaches and safety notices (Hebrew)", url: official.haifaBeaches },
    { label: "Israel Railways — train information", url: official.rail },
    { label: "Ministry of Transport — official bus route planner", url: official.buses },
    { label: "Haifa Museums — official museum programme", url: official.haifaMuseums },
  ],
};

export function HaifaAttractionPage() {
  return <AttractionDestinationPage content={haifaDestinationContent} />;
}
