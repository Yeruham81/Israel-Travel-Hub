import type { LinkProps } from "@tanstack/react-router";
import topTenCover from "@/assets/guides/top-ten-israel-hero.webp";

export type TopTenExperience = {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  region: string;
  bestFor: string;
  visitTime: string;
  visitStyle: string;
  description: string;
  practical: string;
  gettingThere: string;
  tip: string;
  mapRegion: string;
  mapLinks: { label: string; query: string }[];
  photo: { src: string; alt: string };
  guide: { label: string; to: LinkProps["to"] };
  extraGuide?: { label: string; to: LinkProps["to"] };
  official?: { label: string; href: string };
};

/** The authoritative cover used by this page and all incoming guide cards. */
export const topTenIsraelHero = {
  src: topTenCover,
  alt: "Visitor silhouetted on a rocky overlook above the Sea of Galilee at sunset",
} as const;

const prefix = "/images/top-ten-israel/";

export const topTenExperiences: TopTenExperience[] = [
  {
    id: "beaches", title: "Spend time on the Mediterranean coast", shortTitle: "Mediterranean beaches",
    tagline: "Beach time, promenades and the Mediterranean breeze", region: "Tel Aviv & Jaffa",
    bestFor: "Sea, city life & relaxed afternoons", visitTime: "2–4 hours or more", visitStyle: "Urban beach",
    description: "I love the contrast between Tel Aviv's lively beachfront and the stone lanes around Old Jaffa. Choose a supervised swimming beach for a dip, or follow the promenade for sea views, cafés and an easy break between city sights.",
    practical: "Different stretches suit families, swimming, beach sports and walking. Look for the current bathing-season signs and lifeguard flags before entering the sea, and remember that a waterfront walk needs no swimming conditions.",
    gettingThere: "Tel Aviv's beachfront is walkable from many central hotels; buses, taxis and cycling routes connect other neighbourhoods. Old Jaffa is farther south along the promenade.",
    tip: "For a first visit, I would start around Gordon or Frishman and save Jaffa for a separate walk towards sunset.",
    mapRegion: "tel-aviv",
    mapLinks: [{ label: "Gordon Beach", query: "Gordon Beach, Tel Aviv-Yafo, Israel" }, { label: "Frishman Beach", query: "Frishman Beach, Tel Aviv-Yafo, Israel" }],
    photo: { src: prefix + "beaches.webp", alt: "Visitors relaxing beside the Mediterranean at Gordon Beach in Tel Aviv" },
    guide: { label: "Choose a Tel Aviv beach", to: "/travel-blog/beaches-in-tel-aviv/" },
    extraGuide: { label: "Explore Old Jaffa", to: "/attractions/jaffa/" },
    official: { label: "Municipal beach information (Hebrew)", href: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Beaches.aspx" },
  },
  {
    id: "jerusalem", title: "Explore Jerusalem and its Old City", shortTitle: "Jerusalem & the Old City",
    tagline: "Historic streets, sacred places and neighbourhoods", region: "Jerusalem",
    bestFor: "Heritage, faith & city walking", visitTime: "A full day; ideally longer", visitStyle: "City & heritage",
    description: "The Old City is one of the most memorable places to explore in Israel. Take time for its quarters, gates, market lanes and places of worship, then include a neighbourhood or museum that speaks to your interests. Jerusalem rewards an unhurried visit.",
    practical: "Opening and worship arrangements vary by site. Expect steps and uneven paving, and choose a route with enough time for the landmarks you most want to visit.",
    gettingThere: "Jerusalem is connected by rail from Ben Gurion Airport and Tel Aviv. Within the city, combine walking, the light rail, buses and taxis depending on your base.",
    tip: "I would give the Old City its own day, then use a second day for Mahane Yehuda, a museum or the Mount of Olives.",
    mapRegion: "jerusalem",
    mapLinks: [{ label: "Jaffa Gate", query: "Jaffa Gate, Old City, Jerusalem, Israel" }],
    photo: { src: prefix + "jerusalem.webp", alt: "Jerusalem Old City skyline and golden Dome of the Rock viewed from a hillside" },
    guide: { label: "Plan your Jerusalem visit", to: "/travel-blog/jerusalem-travel-guide/" },
    extraGuide: { label: "Explore the Old City", to: "/attractions/old-city-jerusalem/" },
  },
  {
    id: "food", title: "Taste Israeli food and explore the markets", shortTitle: "Food & markets",
    tagline: "Markets, bakeries and a rich mix of food traditions", region: "Jerusalem & Tel Aviv",
    bestFor: "Food lovers & local culture", visitTime: "Half a day, or several stops", visitStyle: "Food & markets",
    description: "Food is a wonderful way to experience the country's many communities and shared regional traditions. Sample hummus, falafel, shawarma, baked goods or a freshly prepared dessert and take time to explore a market.",
    practical: "Mahane Yehuda in Jerusalem and Carmel Market in Tel Aviv are useful starting points. Produce stalls, cafés and evening venues have different hours. Ask about ingredients, allergens, portion sizes and prices before ordering.",
    gettingThere: "Both markets are accessible from central city neighbourhoods by walking and public transport. I recommend exploring one market and the surrounding streets in a single outing.",
    tip: "Choose three or four things you genuinely want to taste; leave room for a bakery or dessert and enjoy the neighbourhood between stops.",
    mapRegion: "tel-aviv",
    mapLinks: [{ label: "Carmel Market", query: "Carmel Market, Tel Aviv-Yafo, Israel" }, { label: "Mahane Yehuda Market", query: "Mahane Yehuda Market, Jerusalem, Israel" }],
    photo: { src: prefix + "food.webp", alt: "Falafel, hummus, salads and sides served together on a plate in Israel" },
    guide: { label: "Ten foods to try in Israel", to: "/travel-blog/what-to-eat-in-israel/" },
    extraGuide: { label: "Shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/" },
  },
  {
    id: "evening", title: "Enjoy Tel Aviv after dark", shortTitle: "Tel Aviv evenings",
    tagline: "A city that comes alive after sunset", region: "Tel Aviv",
    bestFor: "Nightlife, dining & city atmosphere", visitTime: "An evening", visitStyle: "City after dark",
    description: "Tel Aviv offers many ways to enjoy an evening, from a sunset promenade walk and late dinner to bars, live performances and neighbourhood cafés. Choose a neighbourhood with the kind of evening atmosphere you enjoy.",
    practical: "Look at current event programmes and check each venue's opening days, reservations and entry requirements. If you're out late, plan how you'll get back: bus and train schedules may be different on weekends and holidays.",
    gettingThere: "Stay near your preferred evening neighbourhood or use a taxi for the final leg. Walkable districts can be more enjoyable than several cross-city trips.",
    tip: "Start with a sunset walk, then stay in one neighbourhood for dinner and whatever comes next.",
    mapRegion: "tel-aviv",
    mapLinks: [{ label: "Rothschild Boulevard", query: "Rothschild Boulevard, Tel Aviv-Yafo, Israel" }],
    photo: { src: prefix + "evening.webp", alt: "Tel Aviv skyline illuminated at night with city roads and towers" },
    guide: { label: "Explore Tel Aviv attractions", to: "/travel-blog/attractions-in-tel-aviv/" },
    extraGuide: { label: "Find upcoming events", to: "/travel-blog/calendar-of-events/" },
  },
  {
    id: "masada", title: "Discover Masada's story and desert views", shortTitle: "Masada",
    tagline: "Ancient ruins above a dramatic desert landscape", region: "Judean Desert",
    bestFor: "Archaeology, views & history", visitTime: "Allow several hours on site", visitStyle: "National park",
    description: "Masada's archaeological remains and sweeping views over the Judean Desert make it a compelling experience. Take time to explore the plateau, learn about Masada's history and enjoy the desert views.",
    practical: "The eastern entrance has a cable car; hiking options depend on the trail, the chosen entrance and the weather. Extreme heat can affect trail access. Check the Israel Nature and Parks Authority's current route notices, reservations and last entry before travelling.",
    gettingThere: "Most visitors come by car, organised tour or arranged transfer from Jerusalem or the Dead Sea. The western Roman Ramp entrance is reached by a different road from the eastern cable-car entrance.",
    tip: "I would decide between the cable car and walking only after checking the actual weather and trail status for your day.",
    mapRegion: "masada",
    mapLinks: [{ label: "Masada eastern entrance", query: "Masada National Park East Entrance Cable Car, Israel" }],
    photo: { src: prefix + "masada.webp", alt: "Excavated stone rooms on Masada plateau overlooking the Dead Sea" },
    guide: { label: "Plan a visit to Masada", to: "/attractions/masada/" },
    extraGuide: { label: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
    official: { label: "Masada National Park", href: "https://en.parks.org.il/reserve-park/masada-national-park/" },
  },
  {
    id: "dead-sea", title: "Float in the Dead Sea", shortTitle: "The Dead Sea",
    tagline: "A remarkable floating experience in a desert setting", region: "Dead Sea / Ein Bokek",
    bestFor: "Floating, relaxation & desert scenery", visitTime: "2–4 hours at the beach", visitStyle: "Managed beach",
    description: "Floating in the intensely salty Dead Sea is unlike an ordinary swim. I recommend using a managed bathing beach, enjoying the surrounding desert scenery and allowing time for a shower and a relaxed break afterwards.",
    practical: "The public beaches at Ein Bokek offer a practical option for an independent beach visit. Follow lifeguard instructions, keep the water out of your face and eyes, and avoid unregulated shorelines where access and sinkholes may pose risks.",
    gettingThere: "Ein Bokek is south of the northern Dead Sea shore and needs a specific destination in your navigation. Combine it with Masada only if your time, transport and weather permit.",
    tip: "Bring fresh drinking water, sandals, sun protection and a towel. Float gently on your back and avoid swimming strokes.",
    mapRegion: "dead-sea",
    mapLinks: [{ label: "Ein Bokek Central Beach", query: "Ein Bokek Central Beach, Israel" }],
    photo: { src: prefix + "dead-sea.webp", alt: "A visitor floating effortlessly while reading in the calm Dead Sea water" },
    guide: { label: "Plan your Dead Sea visit", to: "/attractions/dead-sea/" },
    extraGuide: { label: "How to get there from Jerusalem", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
    official: { label: "Ein Bokek public beach information", href: "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en" },
  },
  {
    id: "haifa", title: "Admire the Bahá'í Gardens in Haifa", shortTitle: "Haifa & Bahá'í Gardens",
    tagline: "Garden terraces, city views and a coastal setting", region: "Haifa",
    bestFor: "Gardens, architecture & viewpoints", visitTime: "2–4 hours; more for Haifa", visitStyle: "Gardens & city",
    description: "The Bahá'í Gardens are a striking feature of Haifa's hillside. Enjoy the views from the permitted public areas, then explore the German Colony, a museum or the waterfront for a fuller sense of the city.",
    practical: "Public viewpoints, self-guided visitor areas and guided tours have different access arrangements. The gardens are a religious site, and guided visits require advance reservations. Check the official visitor site for your chosen entrance, current access and dress expectations.",
    gettingThere: "Haifa is reachable by mainline rail. The gardens are spread over a steep hillside; choose the entrance and onward transport before setting off on foot.",
    tip: "I would pair one garden viewpoint or booked tour with a walk through the German Colony. Access to the terraces follows the garden's visitor arrangements.",
    mapRegion: "haifa",
    mapLinks: [{ label: "Bahá'í Gardens", query: "Bahai Gardens, Haifa, Israel" }],
    photo: { src: prefix + "haifa.webp", alt: "Symmetrical Bahá'í Gardens with flowers, hedges and golden-domed shrine in Haifa" },
    guide: { label: "Discover Haifa", to: "/attractions/haifa/" },
    extraGuide: { label: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/" },
    official: { label: "Official Bahá'í Gardens visitor information", href: "https://ganbahai.org.il/visit-us-haifa/" },
  },
  {
    id: "galilee", title: "Explore the Sea of Galilee", shortTitle: "Sea of Galilee",
    tagline: "Lake scenery, villages and centuries of heritage", region: "Galilee",
    bestFor: "Nature, pilgrimage & quiet exploration", visitTime: "A full day or longer", visitStyle: "Lake & heritage",
    description: "The Sea of Galilee combines beautiful lake views with villages, archaeological sites and places important to Christian tradition. Magdala, Capernaum, Tabgha, the Mount of Beatitudes and Yardenit each offer a different perspective.",
    practical: "Choose a few nearby places and check their individual entry and worship arrangements. The lake's shoreline is broad, and fixed baptism ceremonies or guided visits can require advance arrangements.",
    gettingThere: "A car, regional tour or arranged driver is often the simplest way to connect several lakeside sites. Tiberias is a common base.",
    tip: "I would choose three or four meaningful stops and allow plenty of time at each.",
    mapRegion: "galilee",
    mapLinks: [{ label: "Capernaum", query: "Capernaum National Park, Israel" }, { label: "Tabgha", query: "Church of the Multiplication, Tabgha, Israel" }],
    photo: { src: prefix + "galilee.webp", alt: "Green hills descending towards the blue Sea of Galilee" },
    guide: { label: "Explore the Sea of Galilee", to: "/attractions/sea-of-galilee/" },
    extraGuide: { label: "Visit Capernaum", to: "/attractions/capernaum/" },
  },
  {
    id: "red-sea", title: "Discover Eilat's underwater world", shortTitle: "Eilat & the Red Sea",
    tagline: "Corals, clear water and a southern seaside stay", region: "Eilat",
    bestFor: "Snorkelling, reefs & seaside activities", visitTime: "At least 1–2 days in Eilat", visitStyle: "Reef & resort",
    description: "Eilat's Red Sea coast offers a different kind of beach experience, with coral reef habitats, snorkelling and marine life. The Coral Beach Nature Reserve is an appealing starting point for suitable visitors, with other aquarium and boat experiences available.",
    practical: "Enter the water only through permitted routes, follow reserve staff and avoid touching or standing on corals. Check swimming ability, safety instructions, opening times and the requirements of any snorkelling or diving provider.",
    gettingThere: "Eilat is at Israel's far southern end. Plan it as a separate overnight stay or a longer southern journey, not an add-on to a Jerusalem day trip.",
    tip: "I would make the reef the highlight of the day and choose activities that suit everyone's comfort in the water.",
    mapRegion: "eilat",
    mapLinks: [{ label: "Coral Beach Nature Reserve", query: "Eilat Coral Beach Nature Reserve, Israel" }],
    photo: { src: prefix + "red-sea.webp", alt: "Coral reef habitat and marine life beneath the Red Sea near Eilat" },
    guide: { label: "Plan Eilat and the Red Sea", to: "/attractions/eilat/" },
    official: { label: "Coral Beach Nature Reserve", href: "https://en.parks.org.il/reserve-park/eilat-coral-beach-nature-reserve-2/" },
  },
  {
    id: "desert-night", title: "See the Ramon Crater and its night sky", shortTitle: "Mitzpe Ramon & stars",
    tagline: "Desert views by day and extraordinary dark skies by night", region: "Negev / Mitzpe Ramon",
    bestFor: "Desert landscape & stargazing", visitTime: "An afternoon and evening", visitStyle: "Desert & night sky",
    description: "Mitzpe Ramon looks over a vast erosional crater, while the surrounding nature reserve is recognised as an International Dark Sky Park. Combine a safe daytime viewpoint with a stargazing experience when the conditions and your schedule allow.",
    practical: "Moonlight, clouds and nearby lighting affect the stars you can see. Check weather, moon phase, legal access and any guided programme before visiting. Desert nights can be cold, and unlit roads require extra care.",
    gettingThere: "Mitzpe Ramon is in the Negev, well south of Beersheba. A car, regional tour or arranged driver makes it easier to visit an authorised viewpoint and return after dark.",
    tip: "If stargazing is a priority, I recommend staying overnight in or near Mitzpe Ramon to avoid a long late-night drive.",
    mapRegion: "ramon",
    mapLinks: [{ label: "Ramon Crater Visitor Center", query: "Ramon Crater Visitor Center, Mitzpe Ramon, Israel" }],
    photo: { src: prefix + "desert-night.webp", alt: "Milky Way stars over a tree and rocky desert terrain at night near Mitzpe Ramon" },
    guide: { label: "Plan the Ramon Crater visit", to: "/attractions/mitzpe-ramon-crater/" },
    official: { label: "Ramon Crater Dark Sky Park", href: "https://darksky.org/places/ramon-crater-nature-reserve-dark-sky-park/" },
  },
];

export const topTenMapRegions = [
  { id: "tel-aviv", markerLabel: "Tel Aviv", name: "Tel Aviv & Jaffa", lat: 32.074, lon: 34.768, count: 3, related: ["beaches","food","evening"] },
  { id: "jerusalem", markerLabel: "Jerusalem", name: "Jerusalem", lat: 31.778, lon: 35.233, count: 1, related: ["jerusalem"] },
  { id: "haifa", markerLabel: "Haifa", name: "Haifa", lat: 32.812, lon: 34.988, count: 1, related: ["haifa"] },
  { id: "galilee", markerLabel: "Galilee", name: "Sea of Galilee", lat: 32.828, lon: 35.586, count: 1, related: ["galilee"] },
  { id: "masada", markerLabel: "Masada", name: "Masada", lat: 31.315, lon: 35.353, count: 1, related: ["masada"] },
  { id: "dead-sea", markerLabel: "Dead Sea", name: "Dead Sea / Ein Bokek", lat: 31.199, lon: 35.364, count: 1, related: ["dead-sea"] },
  { id: "ramon", markerLabel: "Ramon", name: "Mitzpe Ramon", lat: 30.610, lon: 34.803, count: 1, related: ["desert-night"] },
  { id: "eilat", markerLabel: "Eilat", name: "Eilat", lat: 29.548, lon: 34.947, count: 1, related: ["red-sea"] },
] as const;

export const topTenSuggestedRoutes = [
  { title: "Jerusalem & the Dead Sea", locations: ["jerusalem","masada","dead-sea"], summary: "Start with a Jerusalem sightseeing day, then plan Masada and a supervised Dead Sea beach as a separate excursion or overnight outing.", note: "Heritage · Archaeology · Floating" },
  { title: "Tel Aviv & the Mediterranean", locations: ["beaches","food","evening","haifa"], summary: "Enjoy the beach, a food market and a Tel Aviv evening, with Haifa as an additional city day when your schedule allows.", note: "Coast · Food · City life" },
  { title: "Galilee & northern Israel", locations: ["galilee","haifa"], summary: "Choose a lake-area base for heritage and nature visits, then add a separate Haifa stop on a longer northern trip.", note: "Lake scenery · Heritage · Gardens" },
  { title: "Negev & Red Sea", locations: ["desert-night","red-sea"], summary: "Spend time at Mitzpe Ramon, ideally including a night, before continuing south to Eilat for reef and seaside experiences.", note: "Desert · Stars · Snorkelling" },
] as const;

export const topTenFaqs = [
  { q: "Which experiences should I choose for my first visit to Israel?",
    a: "I would prioritise Jerusalem, time on the Mediterranean coast and one regional excursion that matches your interests. If history appeals most, consider Masada; if you prefer nature or relaxation, think about a Dead Sea beach or the Galilee." },
  { q: "How many days do I need to experience Israel?",
    a: "Three to five days can give you a focused city-and-day-trip introduction, while seven to ten days offers more room for regional stops. Travelling to Eilat or Mitzpe Ramon takes extra time. Use my itineraries to build a route that fits your actual dates." },
  { q: "Can I visit these places without renting a car?",
    a: "Yes, especially Jerusalem, Tel Aviv and Haifa, which have public transport options. Masada, the Dead Sea, lakeside Galilee stops and the southern desert are more involved; compare public transport, guided tours and an arranged driver for the specific day." },
  { q: "Which experiences suit families with children?",
    a: "Consider a supervised beach, food market, accessible Old City route, museums or an Eilat marine activity suited to your children. At Masada, the desert or on snorkelling outings, choose the route and conditions for your children's ages and abilities." },
  { q: "When is the best season to visit these places?",
    a: "Spring and autumn are good starting points for a varied trip, but each region differs. Avoid the hottest hours when hiking in the desert or visiting outdoor archaeological sites. Plan beach and water activities according to the season. Check weather and holiday arrangements for your actual travel dates." },
  { q: "Can I combine Eilat and the Ramon Crater with Jerusalem or Tel Aviv?",
    a: "You can combine them on a longer trip, but I recommend treating the Negev and Eilat as a southern leg with dedicated travel time and at least one overnight stop. They are not quick additions to a central-Israel sightseeing day." },
];
