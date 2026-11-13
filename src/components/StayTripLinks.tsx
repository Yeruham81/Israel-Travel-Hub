import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import museumJerusalem from "@/assets/guides/museums-in-jerusalem.jpg";
import jerusalemOverview from "@/assets/home/hero-jerusalem.webp";
import oldCity from "@/assets/guides/holy-sepulchre.jpg";
import airportHall from "@/assets/home/ben-gurion-t3.webp";
import bethlehemTravel from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";
import deadSeaTravel from "@/assets/guides/2026-10/jerusalem-to-the-dead-sea.webp";
import roadTrip from "@/assets/home/road-trip.webp";
import masadaCable from "@/assets/home/masada-cable-car.webp";
import museumTelAviv from "@/assets/guides/2026-10/museums-in-tel-aviv.webp";
import beachesTelAviv from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import telAvivOverview from "@/assets/home/hero-tel-aviv.webp";
import telAvivCoast from "@/assets/home/tel-aviv-coast.webp";
import telAvivMuseum from "@/assets/guides/2026-10/eretz-israel-museum.webp";
import telAvivPromenade from "@/assets/tel-aviv/beachfront.webp";
import airportTransfers from "@/assets/airport-transfers/airport.webp";
import foodPhoto from "@/assets/guides/2026-10/what-to-eat-in-israel.webp";
import haifaOverview from "@/assets/home/hero-haifa.webp";
import haifaMuseums from "@/assets/guides/2026-10/museums-in-haifa.webp";
import haifaPort from "@/assets/home/haifa-port.webp";
import akkoPort from "@/assets/shore-excursions/akko-port.jpg";
import haifaArrival from "@/assets/airport-transfers/ashdod.webp";
import megiddoPhoto from "@/assets/guides/2026-10/tel-megiddo.webp";
import caesareaPhoto from "@/assets/home/caesarea-dusk.webp";
import sevenDayPhoto from "@/assets/home/hero-galilee.webp";
import tiberiasLake from "@/assets/home/tiberias-lake.webp";
import magdalaPhoto from "@/assets/guides/2026-10/magdala.webp";
import capernaumPhoto from "@/assets/guides/capernaum.jpg";
import tabghaPhoto from "@/assets/guides/tabgha.jpg";
import yardenitPhoto from "@/assets/guides/yardenit.jpg";
import beatitudesPhoto from "@/assets/guides/mount-of-beatitudes.jpg";
import nazarethPhoto from "@/assets/guides/2026-10/basilica-of-the-annunciation.webp";
import deadSeaPhoto from "@/assets/dead-sea/beach.webp";
import einGediPhoto from "@/assets/dead-sea/ein-gedi.webp";
import masadaPhoto from "@/assets/home/masada-dead-sea.webp";
import deadSeaAerial from "@/assets/home/hero-masada.webp";
import qasrPhoto from "@/assets/guides/qasr-el-yahud.jpg";
import seasonPhoto from "@/assets/guides/2026-10/best-time-to-visit-israel.webp";
import israelCalendar from "@/assets/guides/2026-10/calendar-of-events.webp";
import jerusalemNight from "@/assets/home/jerusalem-old-city.webp";
import telAvivBeachfront from "@/assets/home/tel-aviv-coast.webp";
import inlandRoute from "@/assets/home/masada-cable-car-wide.webp";

type Region = "jerusalem" | "telaviv" | "haifa" | "tiberias" | "deadsea";
type GuideCard = { title: string; to: string; note: string; photo: string; alt: string };
type GuideGroups = { name: string; local: GuideCard[]; onward: GuideCard[] };
const card = (title: string, to: string, note: string, photo: string, alt: string): GuideCard =>
  ({ title, to, note, photo, alt });

/**
 * A fixed editorial sequence, not an auto-sorted link cloud.
 *
 * Local: exactly four guides directly about the destination and its immediate region.
 * Onward: exactly six transport, excursions and wider-trip planning guides.
 * Both sections use genuine article routes and distinct local photographs.
 * A single property card can appear across pages; these guide cards must never
 * repeat a link or a picture *within* the same page.
 */
export const stayGuideGroups: Record<Region, GuideGroups> = {
  jerusalem: {
    name: "Jerusalem",
    local: [
      card("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/", "Choose cultural highlights from the city’s museums.", museumJerusalem, "Jerusalem museum interior"),
      card("Shopping in Jerusalem", "/travel-blog/shopping-in-jerusalem/", "Explore markets, craft stalls and local shopping streets.", "/images/jerusalem/hutzot-hayotzer.webp", "Artisan shops in Jerusalem"),
      card("Jerusalem Old City", "/travel-blog/old-city-jerusalem/", "Understand the quarters, historic gates and walking routes.", oldCity, "Historic church and stone architecture inside the Old City"),
      card("Jerusalem travel guide", "/travel-blog/jerusalem-travel-guide/", "Discover the city’s principal sights and plan your days.", jerusalemOverview, "Jerusalem skyline and old city"),
    ],
    onward: [
      card("Ben Gurion Airport to Jerusalem", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", "Compare train, bus, taxi and transfer arrangements.", airportHall, "Ben Gurion Airport terminal"),
      card("Jerusalem to Bethlehem", "/travel-blog/jerusalem-to-bethlehem/", "Plan a practical journey to Bethlehem from the city.", bethlehemTravel, "Road and buildings on the way to Bethlehem"),
      card("Jerusalem to the Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/", "Compare routes for a desert and Dead Sea excursion.", deadSeaTravel, "Road through the Judean Desert"),
      card("Day trips from Jerusalem", "/travel-blog/day-trips-from-jerusalem/", "Compare destinations you can visit without changing hotels.", roadTrip, "Scenic road trip in Israel"),
      card("Airport travel on Shabbat", "/travel-blog/from-ben-gurion-airport-on-shabbat/", "Understand arrivals when regular public transport is limited.", airportTransfers, "Ben Gurion Airport terminal and aircraft"),
      card("Visiting Masada", "/travel-blog/masada/", "Plan the fortress and cable car for an early desert visit.", masadaCable, "Cable car travelling toward Masada"),
    ],
  },
  telaviv: {
    name: "Tel Aviv",
    local: [
      card("Attractions in Tel Aviv", "/travel-blog/attractions-in-tel-aviv/", "Find city sights beyond the hotel neighbourhood.", telAvivOverview, "Tel Aviv skyline and Mediterranean seafront"),
      card("Museums in Tel Aviv", "/travel-blog/museums-in-tel-aviv/", "Explore art, heritage and the city’s museums.", museumTelAviv, "Museum architecture in Tel Aviv"),
      card("Beaches in Tel Aviv", "/travel-blog/beaches-in-tel-aviv/", "Choose the right part of the waterfront for your visit.", beachesTelAviv, "Tel Aviv Mediterranean beach"),
      card("Exploring Jaffa", "/travel-blog/jaffa/", "Explore Old Jaffa’s harbour, lanes and local character.", "/images/city-stays/tel-aviv-jaffa.webp", "Old Jaffa market and streets"),
    ],
    onward: [
      card("Ben Gurion Airport to Tel Aviv", "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", "Select the right arrival connection for your hotel.", airportTransfers, "Airport arrival and transfer facilities"),
      card("Getting around Tel Aviv", "/travel-blog/getting-around-tel-aviv/", "Plan walking, local trains, buses and taxis.", telAvivPromenade, "Tel Aviv promenade and city streets"),
      card("Day trips from Tel Aviv", "/travel-blog/day-trips-from-tel-aviv/", "Explore other destinations from a city hotel base.", caesareaPhoto, "Ancient coastal ruins at Caesarea"),
      card("Airport arrivals on Shabbat", "/travel-blog/from-ben-gurion-airport-on-shabbat/", "Check weekend arrivals and transport changes.", airportHall, "Ben Gurion Airport arrival terminal"),
      card("What to eat in Israel", "/travel-blog/what-to-eat-in-israel/", "Add markets and regional food to your itinerary.", foodPhoto, "Israeli food and local dishes"),
      card("Israel travel tips", "/travel-blog/israel-travel-tips/", "Practical preparation before you explore beyond the city.", seasonPhoto, "Seasonal landscape in Israel"),
    ],
  },
  haifa: {
    name: "Haifa",
    local: [
      card("Haifa travel guide", "/travel-blog/haifa/", "Explore the city's landmarks and neighbourhoods.", haifaOverview, "Haifa city and hillside"),
      card("Museums in Haifa", "/travel-blog/museums-in-haifa/", "Find museums and cultural stops on Mount Carmel.", haifaMuseums, "Haifa museum and exhibits"),
      card("Acre (Akko)", "/travel-blog/akko-acre/", "Discover the historic walled port city close to Haifa.", akkoPort, "Historic coastal stone buildings in Acre"),
      card("Haifa shore excursions", "/haifa-shore-excursions/", "Explore the port region and excursions from Haifa.", haifaPort, "Port and coastline at Haifa"),
    ],
    onward: [
      card("Ben Gurion Airport to Haifa", "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", "Compare the train, taxi and transfer options.", airportHall, "Ben Gurion Airport arrivals hall"),
      card("Visiting Tel Megiddo", "/travel-blog/tel-megiddo/", "Plan an archaeological stop in northern Israel.", megiddoPhoto, "Ancient ruins at Tel Megiddo"),
      card("Caesarea", "/attractions/caesarea/", "Visit the Roman harbour on the coast south of Haifa.", caesareaPhoto, "Ancient Caesarea amphitheatre and coast"),
      card("Getting around Israel", "/travel-blog/getting-around-israel/", "Connect Haifa with other cities and regional destinations.", roadTrip, "A road through Israeli countryside"),
      card("Israel itinerary: seven days", "/travel-blog/israel-itinerary-7-days/", "Fit the coast and north into a one-week trip.", sevenDayPhoto, "Landscape of the Galilee"),
      card("Best time to visit Israel", "/travel-blog/best-time-to-visit-israel/", "Plan around seasonal conditions and regional activities.", seasonPhoto, "Seasonal Israel landscape"),
    ],
  },
  tiberias: {
    name: "Tiberias",
    local: [
      card("Sea of Galilee guide", "/travel-blog/sea-of-galilee/", "Explore the lake and surrounding attractions.", tiberiasLake, "Sea of Galilee near Tiberias"),
      card("Magdala", "/travel-blog/magdala/", "Discover an archaeological site on the lakeshore.", magdalaPhoto, "Historic archaeological site at Magdala"),
      card("Capernaum", "/travel-blog/capernaum/", "Plan a visit to the northern lakeside heritage site.", capernaumPhoto, "Ruins and stonework at Capernaum"),
      card("Tabgha", "/travel-blog/tabgha/", "Explore churches and historic sites beside the lake.", tabghaPhoto, "Historic church setting at Tabgha"),
    ],
    onward: [
      card("Yardenit", "/travel-blog/yardenit/", "Plan a visit to the Jordan River baptism site.", yardenitPhoto, "Yardenit and the Jordan River"),
      card("Mount of Beatitudes", "/travel-blog/mount-of-beatitudes/", "Visit the hillside overlooking the Sea of Galilee.", beatitudesPhoto, "Mount of Beatitudes landscape"),
      card("Nazareth", "/travel-blog/basilica-of-the-annunciation/", "Add a trip to Nazareth and its major historic church.", nazarethPhoto, "Basilica of the Annunciation in Nazareth"),
      card("Getting around Israel", "/travel-blog/getting-around-israel/", "See how the north fits with the rest of your journey.", roadTrip, "Road travel through the countryside"),
      card("Israel itinerary: seven days", "/travel-blog/israel-itinerary-7-days/", "Build a northern stop into a week-long itinerary.", sevenDayPhoto, "Galilee hills and countryside"),
      card("Israel itinerary: ten days", "/travel-blog/israel-itinerary-10-days/", "Allow more time around the lake and further afield.", caesareaPhoto, "Coastal sights and wider itinerary across Israel"),
    ],
  },
  deadsea: {
    name: "the Dead Sea",
    local: [
      card("The Dead Sea visitor guide", "/travel-blog/the-dead-sea/", "Learn about swimming, salt and practical conditions.", deadSeaPhoto, "Dead Sea beachfront and salt water"),
      card("Dead Sea attractions", "/travel-blog/dead-sea-attractions/", "Compare natural sites and stops around the region.", deadSeaAerial, "Judean Desert around the Dead Sea"),
      card("Ein Gedi", "/travel-blog/ein-gedi/", "Plan a visit to the springs and nature reserve.", einGediPhoto, "Vegetation and landscape near Ein Gedi"),
      card("Masada", "/travel-blog/masada/", "Visit the historic desert fortress near the shore.", masadaPhoto, "Masada and Dead Sea landscape"),
    ],
    onward: [
      card("Ben Gurion Airport to Ein Bokek", "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/", "Compare routes to the Dead Sea hotel strip.", airportHall, "Ben Gurion Airport arrival terminal"),
      card("Jerusalem to the Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/", "Plan a day trip or transfer from Jerusalem.", deadSeaTravel, "Road from Jerusalem to the Dead Sea"),
      card("Israel itinerary: three days", "/travel-blog/israel-itinerary-3-days/", "Consider the Dead Sea on a short holiday.", roadTrip, "Scenic road in Israel"),
      card("Israel itinerary: five days", "/travel-blog/israel-itinerary-5-days/", "Combine a Dead Sea stay with other regions.", seasonPhoto, "Israeli desert and seasonal landscape"),
      card("Qasr el Yahud", "/travel-blog/qasr-el-yahud/", "Explore another Jordan River site when planning a longer route.", qasrPhoto, "Jordan River baptism site at Qasr el Yahud"),
      card("Baptism in the Jordan River", "/travel-blog/baptism-in-the-jordan-river/", "Compare the main baptism locations and access.", "/images/attractions/jordan-river-baptism.webp", "Jordan River waterside"),
    ],
  },
};

export function StayTripLinks({
  region, currentPath,
}: {
  region: string;
  currentPath?: string;
}) {
  const set = stayGuideGroups[region as Region];
  if (!set) return null;
  const normalized = (url: string) => url.replace(/\/+$/, "");
  const visited = new Set<string>();
  const imagePaths = new Set<string>();
  const keep = (item: GuideCard) => {
    if (normalized(item.to) === normalized(currentPath ?? "") || visited.has(normalized(item.to)) || imagePaths.has(item.photo)) return false;
    visited.add(normalized(item.to));
    imagePaths.add(item.photo);
    return true;
  };
  const local = set.local.filter(keep);
  const onward = set.onward.filter(keep);
  const renderCards = (items: GuideCard[], grid: string, testId: string): ReactNode => (
    <ul className={`mt-5 grid gap-4 ${grid}`} data-testid={testId}>
      {items.map((item) => <li key={item.to} className="min-w-0">
        <Link to={item.to as LinkProps["to"]} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <img src={item.photo} alt={item.alt} loading="lazy" decoding="async" width={600} height={375} className="aspect-[16/10] w-full object-cover" />
          <span className="flex flex-1 flex-col p-4">
            <span className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.note}</span>
            <span className="mt-4 text-sm font-semibold text-primary">Read the guide →</span>
          </span>
        </Link>
      </li>)}
    </ul>
  );
  return <div data-testid="stay-trip-planning" className="space-y-12">
    {local.length > 0 && <section id="explore" aria-labelledby="stay-explore-h" className="mt-14 scroll-mt-32">
      <h2 id="stay-explore-h" className="text-2xl font-bold sm:text-3xl">Explore more around {set.name}</h2>
      <p className="mt-2 text-muted-foreground">Explore places and practical guides directly related to {set.name}.</p>
      {renderCards(local, "sm:grid-cols-2", "stay-local-photo-grid")}
    </section>}
    {onward.length > 0 && <section id="trip-planning" aria-labelledby="stay-planning-h" className="scroll-mt-32">
      <h2 id="stay-planning-h" className="text-2xl font-bold sm:text-3xl">Plan the rest of your trip</h2>
      <p className="mt-2 text-muted-foreground">Plan your arrivals, excursions and onward travel after choosing your hotel.</p>
      {renderCards(onward, "sm:grid-cols-2 lg:grid-cols-3", "stay-trip-photo-grid")}
    </section>}
  </div>;
}
