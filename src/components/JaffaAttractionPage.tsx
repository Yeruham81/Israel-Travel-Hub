import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BusFront, CarFront, Clock3, Footprints, MapPinned, TrainFront, Ticket } from "lucide-react";
import {
  AttractionDestinationPage, AttractionHighlight, AttractionContentImage, AttractionPracticalTip,
  type AttractionDestinationContent,
} from "@/components/AttractionDestinationPage";
import { jaffaSite } from "@/data/jaffaSite";
import tourPhoto from "@/assets/shore-hub/guide-jaffa.webp";
import promenadePhoto from "@/assets/shore-hub/jaffa-route.webp";

const official = jaffaSite.official;
const inlineLink = "font-semibold text-primary underline underline-offset-4";
const photos = {
  clock: "/images/attractions/jaffa-clock-tower.webp",
  mosque: "/images/attractions/jaffa-mahmoudiya-mosque.webp",
  square: "/images/attractions/jaffa-kedumim-square.webp",
  church: "/images/attractions/jaffa-st-peters-church.webp",
  alleys: "/images/attractions/jaffa-zodiac-alleys.webp",
  garden: "/images/attractions/jaffa-summit-garden.webp",
  port: "/images/attractions/jaffa-port.webp",
  market: "/images/attractions/jaffa-flea-market.webp",
  museum: "/images/attractions/jaffa-ilana-goor-museum.webp",
  nalagaat: "/images/attractions/jaffa-nalagaat-center.webp",
  food: "/images/attractions/jaffa-food.webp",
} as const;
const mapEmbed = "https://maps.google.com/maps?q=Old%20Jaffa%2C%20Tel%20Aviv-Yafo%2C%20Israel&hl=en&z=15&t=m&output=embed";
const mapLarger = "https://www.google.com/maps/search/?api=1&query=Old%20Jaffa%2C%20Tel%20Aviv-Yafo%2C%20Israel";
const clockDirections = "https://www.google.com/maps/dir/?api=1&destination=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel&travelmode=walking";

export const jaffaDestinationContent: AttractionDestinationContent = {
  path: "/attractions/jaffa/",
  placeName: "Jaffa",
  title: jaffaSite.title,
  heroTitle: "Old Jaffa: Attractions & Walking Guide",
  highlightsTitle: "What to see in Jaffa",
  region: jaffaSite.region,
  updatedAt: jaffaSite.updatedAt,
  hero: jaffaSite.hero,
  intro: jaffaSite.intro,
  itineraryFirst: true,
  itineraryTitle: "Suggested walking routes in Jaffa",
  visitorTitle: "Visiting Jaffa: entrance, hours and accessibility",
  visitorNavLabel: "Visitor essentials",
  historyTitle: "Jaffa's history and cultural heritage",
  relatedTitle: "Explore Tel Aviv further",
  contactIntroduction: "Planning a visit to Jaffa or a longer trip around Tel Aviv? Tell me your dates, pickup point and the places you would like to see. I can help with a private transfer, a driver for the day or practical trip planning.",
  facts: [
    { icon: "location", label: "Location", value: "South Tel Aviv–Yafo", note: "Historic hill, harbour and surrounding streets" },
    { icon: "duration", label: "Time needed", value: "2–5 hours", note: "Choose a short walk or relaxed half-day" },
    { icon: "admission", label: "Public areas", value: "Free to explore", note: "Museums and performances charge separately" },
    { icon: "highlights", label: "Best for", value: "History, markets & coast", note: "Churches, galleries, viewpoints and food" },
    { icon: "access", label: "Getting around", value: "Mostly on foot", note: "Some hills, steps and uneven paving" },
    { icon: "hours", label: "When to visit", value: "Daytime or sunset", note: "Individual businesses have their own hours" },
  ],
  glanceNote: <>I suggest combining the old town, its hilltop viewpoints and the port in one walk. If you also want to shop at the flea market, visit during trading hours; the surrounding cafés and restaurants may have different schedules.</>,
  highlightContent: (
    <div className="mt-4 space-y-3">
      <AttractionHighlight title="Clock Tower Square" image={{ src: photos.clock, alt: "The historic Ottoman Clock Tower and surrounding streets in Jaffa" }}>
        <p>The Clock Tower is a useful landmark for the start of a visit. It stands where Jaffa's busy commercial streets meet the routes towards the historic hill, the flea market and the waterfront.</p>
        <p>The Ottoman-era tower was completed in the early twentieth century, around 1902–1903. From the square, you can head towards the old town or explore the shops and market streets to the southeast.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Mahmoudiya Mosque" image={{ src: photos.mosque, alt: "Stone architecture and minaret of Mahmoudiya Mosque in Jaffa" }}>
        <p>Just a short walk from the Clock Tower, the Mahmoudiya Mosque is one of Jaffa's most important Ottoman landmarks. Its minaret, courtyard walls and distinctive entrances are part of the historic streetscape.</p>
        <p>It remains an active place of worship. Visitors can appreciate the exterior without entering; if you wish to go inside, be respectful of prayer times and follow on-site guidance.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Kedumim Square and the Old City" image={{ src: photos.square, alt: "Historic stone buildings and public square at Kedumim Square in Old Jaffa" }}>
        <p>Kedumim Square sits near the top of Old Jaffa's hill and makes a natural base for exploring the historic lanes. Look around the square before heading into the nearby galleries, narrow passageways and sea-facing viewpoints.</p>
        <p>The Old Jaffa Visitors Center beneath the square has offered archaeological and multimedia presentations about the city's past. Check the <a href={official.oldJaffa} target="_blank" rel="noopener noreferrer" className={inlineLink}>official Old Jaffa site</a> for current visitor activities and booking details rather than relying on older ticket prices.</p>
      </AttractionHighlight>
      <AttractionHighlight title="St. Peter's Church" image={{ src: photos.church, alt: "St. Peter's Church overlooking historic Jaffa" }}>
        <p>The Franciscan church above the harbour is one of Jaffa's most recognisable landmarks. It is closely associated with the Christian traditions of Peter's time in Joppa and is worth seeing even during a short visit.</p>
        <p>As this is an active church, visitor access can vary around services and religious occasions. Wear modest clothing and consult the <a href={official.church} target="_blank" rel="noopener noreferrer" className={inlineLink}>local site information</a> if you hope to see the interior.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Zodiac Alleys and artists' galleries" image={{ src: photos.alleys, alt: "Narrow historic stone alleyway in the artists' quarter of Old Jaffa" }}>
        <p>The winding alleys named after signs of the zodiac are among the best places to wander without a rigid schedule. You will find restored stone buildings, studios, small art galleries and quiet corners between the busier squares.</p>
        <p>I recommend taking time to explore several adjoining lanes instead of following only the most direct route to the port. Some have steps and uneven surfaces, so comfortable shoes are useful.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Summit Garden and Wishing Bridge" image={{ src: photos.garden, alt: "Green hillside and coastal viewpoint in Jaffa's Summit Garden" }}>
        <p>Summit Garden (Gan HaPisga, also called Abrasha Park) offers one of the best views north towards Tel Aviv's coastline. Its open spaces, sculptures and Wishing Bridge are close to the old town's main walking route.</p>
        <p>Come for the view in late afternoon if the weather is clear. The garden is a pleasant place for a short break before walking back down towards the harbour.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Jaffa Port and the waterfront" image={{ src: photos.port, alt: "Fishing boats and waterfront buildings around Jaffa Port" }}>
        <p>Jaffa's old harbour is still associated with fishing boats, waterfront restaurants and maritime history. The quay is an enjoyable contrast to the narrow lanes above, with open views out to the Mediterranean.</p>
        <p>Look towards the offshore rocks associated with the legend of Andromeda, or spend time by the waterfront before a meal. Boat activities, when operating, are separate commercial experiences and should be checked directly.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Flea Market and Greek Market streets" image={{ src: photos.market, alt: "Antique shops and outdoor stalls in the Jaffa Flea Market area" }}>
        <p>Jaffa's flea-market district lies southeast of the Clock Tower. Antique stalls and vintage shops sit alongside cafés, restaurants and small design businesses; nearby Greek Market streets add another lively pocket to explore.</p>
        <p>For actual market browsing, daytime is a better choice than late evening. Dining and nightlife follow different hours, and trading is more limited on Saturdays and <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link>.</p>
      </AttractionHighlight>
      <AttractionPracticalTip>For a first-time visit, I would prioritise the hilltop old town, Summit Garden, the port and either the flea market or a museum according to your interests. Leave time for a coffee or meal rather than rushing from sight to sight.</AttractionPracticalTip>
      <h3 className="pt-3 font-serif text-xl font-semibold">More cultural experiences in Jaffa</h3>
      <AttractionHighlight title="Ilana Goor Museum and local art" image={{ src: photos.museum, alt: "Ilana Goor Museum in a historic building in Old Jaffa" }}>
        <p>The <a href={official.museum} target="_blank" rel="noopener noreferrer" className={inlineLink}>Ilana Goor Museum</a> combines an eclectic art collection with a historic building and sea views. It is a worthwhile extra stop for visitors interested in contemporary art, sculpture and design.</p>
        <p>There are also other small galleries and studios throughout the old town. The <a href={official.uriGeller} target="_blank" rel="noopener noreferrer" className={inlineLink}>Uri Geller Museum</a> offers a different experience through arranged visits; check its tour and booking arrangements before including it in your plans.</p>
      </AttractionHighlight>
      <AttractionHighlight title="Na Laga'at Center" image={{ src: photos.nalagaat, alt: "Na Laga'at cultural centre at the Jaffa Port complex" }}>
        <p>The <a href={official.nalagaat} target="_blank" rel="noopener noreferrer" className={inlineLink}>Na Laga'at Center</a> near Jaffa Port presents accessible cultural experiences, including theatre, workshops and dining in darkness at the BlackOut restaurant.</p>
        <p>Check the programme and reserve the specific performance, workshop or dining experience you want. This is an optional booked activity rather than a drop-in sightseeing stop.</p>
      </AttractionHighlight>
    </div>
  ),
  itineraryContent: (
    <div className="mt-4 space-y-4">
      <p>Jaffa is especially rewarding on foot. I recommend choosing a route according to the time available, then adding one or two optional stops rather than trying to cover every venue.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="jaffa-walking-routes">
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">A short walk — around 2–3 hours</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Start:</strong> Clock Tower Square. See the Mahmoudiya Mosque from outside, walk up to Kedumim Square and St. Peter's Church, explore the Zodiac Alleys and Summit Garden, then finish at Jaffa Port.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Finish:</strong> The waterfront. This route suits a first introduction to Jaffa without a museum visit.</p>
        </article>
        <article className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">A relaxed half-day — around 4–5 hours</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">Begin at the flea market for shopping or coffee, continue past Clock Tower Square towards the historic hill, and explore Kedumim Square, the church, lanes and viewpoints. Walk down to the port and allow time for lunch or dinner.</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">If art interests you, replace part of the market or harbour time with a visit to the Ilana Goor Museum.</p>
        </article>
      </div>
      <p>Both routes can be walked in reverse. If you are coming from central Tel Aviv along the beachfront, the promenade and northern waterfront make a natural approach. You can also use the <a href={official.municipalWalkingMap} target="_blank" rel="noopener noreferrer" className={inlineLink}>municipal Old Jaffa walking map</a> when navigating the historic streets.</p>
      <AttractionPracticalTip>To finish near sunset, leave the harbour or Summit Garden for the end of your walk. Allow extra time for a restaurant stop, especially on busy evenings.</AttractionPracticalTip>
    </div>
  ),
  visitorContent: (
    <div className="mt-4 space-y-4">
      <p>Jaffa is a historic neighbourhood, not a single ticketed attraction. The streets, public viewpoints, gardens and harbour can be explored without an admission ticket. Museums, cultural performances and optional tours set their own prices and opening schedules.</p>
      <div className="grid gap-3 md:grid-cols-2" data-testid="jaffa-visitor-essentials">
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Free walks and paid visits</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base"><strong>Free public spaces:</strong> Clock Tower Square, the historic lanes, Summit Garden and public parts of the port and flea-market streets.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base"><strong>Separate admission or booking:</strong> Ilana Goor Museum, organised museum visits, performances and special experiences. Check the operator's <a href={official.museum} target="_blank" rel="noopener noreferrer" className={inlineLink}>museum visitor information</a> or <a href={official.nalagaat} target="_blank" rel="noopener noreferrer" className={inlineLink}>cultural programme</a> for your visit.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary"/><h3 className="font-serif text-xl font-semibold">Opening times vary</h3></div>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">The public outdoor areas are generally accessible throughout the day. Galleries, places of worship, visitor centres, shops and museums may have limited or changing hours.</p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">Flea-market trading, restaurant service and Saturday activity are not the same. If you are travelling on <Link to="/travel-blog/calendar-of-events/" className={inlineLink}>Jewish holidays</Link> or holiday eves, confirm individual venues before setting out.</p>
        </article>
      </div>
      <article className="rounded-xl border bg-secondary/20 p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold">Accessibility and family visits</h3>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">The port promenade and parts of the surrounding streets offer relatively level approaches, while the historic hill has slopes, stone paving, steps and narrow passages. A stroller or wheelchair user may need an adapted route rather than the full route through every alley.</p>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">For a booked Na Laga'at activity, consult the centre's <a href={official.nalagaatAccess} target="_blank" rel="noopener noreferrer" className={inlineLink}>accessibility arrangements</a> in advance.</p>
      </article>
    </div>
  ),
  transportContent: (
    <div className="mt-4 space-y-4" data-testid="jaffa-transport">
      <p>Jaffa is part of Tel Aviv–Yafo, so you can reach it by light rail, bus, taxi or a walk along the sea. Once you arrive, the central historic area is best explored on foot.</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><TrainFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">Red Line light rail and buses</h3></div>
            <p className="mt-2 text-sm leading-relaxed">The Red Line (DAN KAL) runs along Jerusalem Boulevard in Jaffa. Shalma is one useful station for the historic area, followed by a walk towards the flea market or Clock Tower. For the best stop from your accommodation, check the <a href={official.transit} target="_blank" rel="noopener noreferrer" className={inlineLink}>light rail operator</a> or <a href={official.buses} target="_blank" rel="noopener noreferrer" className={inlineLink}>official bus planner</a>.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary"/><h3 className="font-semibold">Walk from Tel Aviv's seafront</h3></div>
            <p className="mt-2 text-sm leading-relaxed">If you are staying near the southern beaches, the promenade through Charles Clore Park is a pleasant way to approach Jaffa. From more northern districts, check the distance before deciding to walk the whole way. My <Link to="/travel-blog/getting-around-tel-aviv/" className={inlineLink}>getting around Tel Aviv guide</Link> explains the city transport options.</p>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2"><CarFront className="h-5 w-5 text-primary"/><h3 className="font-semibold">Taxi, private driver and parking</h3></div>
            <p className="mt-2 text-sm leading-relaxed">For a simple drop-off, Clock Tower Square or an accessible point near the port makes sense; the historic hill has pedestrian lanes. If driving, check parking near Jaffa Port, Tzorfim Street or the flea market, as listed by the <a href={official.oldJaffaArrival} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Jaffa visitor information</a>. For a private transfer or wider itinerary, <a href="#contact" className={inlineLink}>send me an inquiry</a>.</p>
            <a href={clockDirections} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Walking directions to the Clock Tower <ArrowUpRight className="h-3.5 w-3.5"/></a>
          </article>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary"/><h3 className="text-sm font-semibold">Old Jaffa and its harbour</h3></div>
          <iframe title="Map of Old Jaffa, its harbour and surrounding streets" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-2 h-52 w-full rounded-lg border-0 sm:h-60 lg:h-56"/>
          <a href={mapLarger} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">Open the map <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </div>
  ),
  foodContent: (
    <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-3">
        <p>Jaffa is a good place to explore local food, whether you want a quick bite or a longer dinner after sightseeing. The flea-market streets have casual cafés and lively restaurants, while the waterfront has spots for a slower meal beside the harbour.</p>
        <p>For traditional flavours, look for hummus, falafel, shakshuka, freshly baked pastries and seafood. Long-established names such as Abu Hassan, Dr. Shakshuka and Abulafia Bakery are associated with Jaffa, but check their current branches and hours before making a special journey.</p>
        <p>I would choose a lunch stop around the flea market if you are visiting during the day, or end your walk at the port for an evening meal. For more ideas, see my guide to <Link to="/travel-blog/what-to-eat-in-israel/" className={inlineLink}>what to eat in Israel</Link>.</p>
      </div>
      <AttractionContentImage src={photos.food} alt="Local food and café dishes associated with Jaffa's culinary scene" />
    </div>
  ),
  practicalContent: (
    <div className="mt-4 space-y-4">
      <p>Most visits are straightforward, but a few small planning decisions can make the walk more comfortable.</p>
      <AttractionPracticalTip><strong>Shoes and slopes:</strong> Wear comfortable footwear for the stepped alleys and historic stone surfaces. If you prefer fewer hills, concentrate on the market and the port.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Market timing:</strong> Browse flea-market stalls in the daytime. Saturday and holiday trading may be reduced even when the restaurants and public streets are active.</AttractionPracticalTip>
      <AttractionPracticalTip><strong>Churches and neighbourhoods:</strong> Dress respectfully at religious sites and be considerate when photographing people, worshippers and residential doors.</AttractionPracticalTip>
      <p>Jaffa works well as part of a larger Tel Aviv visit. If you have additional time, combine it with the southern beachfront or <Link to="/travel-blog/beaches-in-tel-aviv/" className={inlineLink}>Tel Aviv's beaches</Link>, rather than crossing the city repeatedly.</p>
    </div>
  ),
  historyContent: (
    <div className="mt-4 space-y-3">
      <p>Jaffa, historically known as Joppa, has been a Mediterranean port and gateway to the region for thousands of years. It appears in ancient texts and in biblical and Christian traditions, including the story of Jonah and accounts connected to Peter.</p>
      <p>The streets visible today reflect many layers: medieval remains, Ottoman-era mosques and commercial buildings, churches, and more recent neighbourhoods. Modern Jaffa is also home to diverse communities and active cultural life. The port, Clock Tower and market show different parts of this history during one compact walk.</p>
      <p>The <a href={official.oldJaffa} target="_blank" rel="noopener noreferrer" className={inlineLink}>Old Jaffa development authority</a> and the <a href={official.municipality} target="_blank" rel="noopener noreferrer" className={inlineLink}>Tel Aviv–Yafo municipality</a> provide further information about the historic district.</p>
    </div>
  ),
  tourContent: (
    <div className="mt-4 space-y-4">
      <p>You can enjoy the public sights independently, or join a guided heritage walk to hear more about the people, buildings and changing neighbourhoods. For a fuller day, Jaffa also combines naturally with other Tel Aviv highlights.</p>
      <div className="grid gap-3 sm:grid-cols-2" data-testid="jaffa-tour-cards">
        <Link to="/tours/tel-aviv-jaffa/" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={tourPhoto} alt="Stone buildings and a walking route through Old Jaffa" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Tel Aviv and Jaffa guided tours</h3>
            <p className="mt-1 text-sm text-muted-foreground">Browse city walks, cultural experiences and guided sightseeing.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore tours <ArrowUpRight className="h-4 w-4"/></span>
          </div>
        </Link>
        <a href="#contact" className="attraction-tour-card group flex h-full min-w-0 items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary sm:p-4">
          <img src={promenadePhoto} alt="Coastal walkway and historic Jaffa scenery" width={128} height={100} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-lg object-cover sm:w-28"/>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">Plan a private Tel Aviv visit</h3>
            <p className="mt-1 text-sm text-muted-foreground">Ask about a transfer or private driver for a customised day.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Send an inquiry <ArrowUpRight className="h-4 w-4"/></span>
          </div>
        </a>
      </div>
    </div>
  ),
  faqs: [
    { q: "Is Jaffa worth visiting from Tel Aviv?", a: "Yes. Old Jaffa offers a historic harbour, distinctive stone streets, viewpoints and a flea market within easy reach of central Tel Aviv. Even a short visit gives you a different side of the city." },
    { q: "How long should I spend in Jaffa?", a: "Around two or three hours covers a highlights walk. Allow four or five hours for the flea market, a museum or an unhurried meal." },
    { q: "Do you need a guide to explore Old Jaffa?", a: "No. The main outdoor sights are close enough for an independent walk. A guided tour can add historical context and help you discover less obvious corners." },
    { q: "Is Jaffa open on Saturdays?", a: "The public outdoor areas remain accessible, but flea-market stalls, museums, places of worship and businesses follow their own schedules. Public transport services also differ on Shabbat." },
    { q: "Can I visit Jaffa with a stroller or wheelchair?", a: "Parts of the harbour and surrounding streets can be easier to navigate, but the old hill has steep slopes, steps and uneven paving. Plan an adapted route and confirm access at any paid venue." },
    { q: "Is Jaffa part of Tel Aviv?", a: "Yes. Jaffa and Tel Aviv form the same municipality, Tel Aviv–Yafo. Jaffa is the older port and historic district at the southern end of the city's coastline." },
  ],
  nearby: [
    { label: "Things to do in Tel Aviv", to: "/travel-blog/attractions-in-tel-aviv/", note: "Explore markets, neighbourhoods, culture and coastal sights." },
    { label: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/", note: "Find popular beaches and advice for a seafront day." },
    { label: "Museums in Tel Aviv", to: "/travel-blog/museums-in-tel-aviv/", note: "Art, heritage and family-friendly museum ideas." },
    { label: "Day trips from Tel Aviv", to: "/travel-blog/day-trips-from-tel-aviv/", note: "Choose practical excursions beyond the city." },
    { label: "Where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Compare neighbourhoods and hotel areas." },
    { label: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/", note: "Learn about the light rail, buses and walking routes." },
  ],
  planningLinks: [
    { label: "Tel Aviv and Jaffa tours", to: "/tours/tel-aviv-jaffa/", description: "Explore guided walks and sightseeing.", icon: "region" },
    { label: "What to eat in Israel", to: "/travel-blog/what-to-eat-in-israel/", description: "Local dishes and food traditions.", icon: "region" },
    { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", description: "Public transport and road travel.", icon: "transport" },
    { label: "Best time to visit Israel", to: "/travel-blog/best-time-to-visit-israel/", description: "Seasonal planning and weather.", icon: "seasons" },
    { label: "5-day Israel itinerary", to: "/travel-blog/israel-itinerary-5-days/", description: "Combine the coast with Jerusalem.", icon: "itinerary" },
    { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", description: "Practical advice before your visit.", icon: "region" },
  ],
  sources: [
    { label: "Old Jaffa development authority — attractions and visitors", url: official.oldJaffa },
    { label: "Tel Aviv–Yafo municipality — Old Jaffa walking map", url: official.municipalWalkingMap },
    { label: "Old Jaffa — arrival directions and parking", url: official.oldJaffaArrival },
    { label: "Old Jaffa — St. Peter's Church", url: official.church },
    { label: "Ilana Goor Museum — visiting information", url: official.museum },
    { label: "Uri Geller Museum — arranged visits", url: official.uriGeller },
    { label: "Na Laga'at — performances and experiences", url: official.nalagaat },
    { label: "DAN KAL — Red Line information", url: official.transit },
  ],
};

export function JaffaAttractionPage() {
  return <AttractionDestinationPage content={jaffaDestinationContent} />;
}
