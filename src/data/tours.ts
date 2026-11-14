import type { TourPlaceId, TourTagId } from "@/data/tourTypes";
import type { GuidePhoto } from "@/data/travelGuides";
import type { ShoreReadingGuide } from "@/data/shoreReading";
import { migrationPhotos as migration } from "@/data/guideMigrationPhotos";
import { airportTransferPhotos as airport } from "@/data/airportTransfers";
import { jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { travelGuidePaths } from "@/data/registry";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import neveTzedek from "@/assets/tel-aviv/neve-tzedek.webp";
import telAvivBeachfront from "@/assets/tel-aviv/beachfront.webp";
import telAvivDizengoff from "@/assets/tel-aviv/dizengoff.webp";
import keremHaTeimanim from "@/assets/tel-aviv/kerem-hateimanim.webp";
import rothschild from "@/assets/tel-aviv/rothschild.webp";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import holySepulchre from "@/assets/guides/holy-sepulchre.jpg";
import jerusalemOldCityStreet from "@/assets/jerusalem/old-city.webp";
import jerusalemDowntown from "@/assets/jerusalem/downtown.webp";
import jerusalemMamilla from "@/assets/jerusalem/mamilla.webp";
import museumsJerusalem from "@/assets/guides/museums-in-jerusalem.jpg";
import nativityCourtyard from "@/assets/guides/bethlehem/nativity-courtyard.jpg";
import bethlehemMangerSquare from "@/assets/guides/bethlehem/manger-square.jpg";
import bethlehemMilkGrotto from "@/assets/guides/bethlehem/milk-grotto.jpg";
import bethlehemCatholicGrottos from "@/assets/guides/bethlehem/catholic-grottos.jpg";
import bethlehemShepherdsField from "@/assets/guides/bethlehem/shepherds-field-chapel.webp";
import jordanQasrPhoto from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";
import qasrPhoto from "@/assets/guides/dead-sea-excursions/qasr-al-yahud.webp";
import palestinianTaxi from "@/assets/guides/bethlehem/palestinian-taxi.jpg";
import bethlehemNativity from "@/assets/home/bethlehem-nativity.webp";
import coralReef from "@/assets/eilat/coral-reef.webp";
import cruiseShip from "@/assets/home/cruise-port.webp";
import roadTrip from "@/assets/home/road-trip.webp";
import esim from "@/assets/guides/esim-israel.jpeg";
import hotelRoom from "@/assets/home/hotel-room.webp";
import masadaCableCar from "@/assets/home/masada-cable-car.webp";
import caesareaAqueduct from "@/assets/home/caesarea-aqueduct.webp";
import capernaum from "@/assets/guides/capernaum.jpg";
import masadaAerial from "@/assets/guides/dead-sea-excursions/masada-aerial.webp";
import masadaPalace from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import masadaSnakePath from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";
import masadaRuins from "@/assets/guides/dead-sea-excursions/masada-ruins.webp";
import einGediWaterfall from "@/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp";
import einGediOasis from "@/assets/guides/dead-sea-excursions/ein-gedi-oasis.webp";
import qumranCaves from "@/assets/guides/dead-sea-excursions/qumran-caves.webp";
import deadSeaMud from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import deadSeaSunbeds from "@/assets/dead-sea/sunbeds.webp";
import deadSeaPool from "@/assets/dead-sea/pool.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";
import deadSeaRouteRoad from "@/assets/guides/dead-sea-route-road.webp";
import heroMasada from "@/assets/home/hero-masada.webp";

export const tourCategoryPaths = {
  jerusalem: "/tours/jerusalem/",
  "tel-aviv-jaffa": "/tours/tel-aviv-jaffa/",
  "masada-dead-sea": "/tours/masada-dead-sea/",
  "bethlehem-jericho": "/tours/bethlehem-jericho-jordan-river/",
  "nazareth-galilee": "/tours/nazareth-sea-of-galilee/",
  "northern-coast": "/tours/caesarea-haifa-acre/",
  "food-markets": "/tours/food-market-tours/",
  "eilat-red-sea": "/tours/eilat-red-sea/",
} as const;
export type TourCategoryId = keyof typeof tourCategoryPaths;

export const tourPhotos: Record<string, GuidePhoto> = {
  "my-jerusalem-day": { src: "/images/jerusalem/mount-zion/mount-zion-hillside.webp", alt: "Green hillside and historic buildings on Jerusalem\'s Mount Zion" },
  "my-tel-aviv-day": { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "A taxi on a Tel Aviv street, illustrating private transport" },
  "my-masada-day": airport["dead-sea"]!,
  "my-masada-jerusalem": { src: masadaCableCar, alt: "A cable-car cabin below Masada's desert cliffs", sourceUrl: "https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg", credit: "James Emery · CC BY 2.0 · resized and converted to WebP", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  "my-north-coast-day": airport["haifa"]!,
  "my-north-coast-jerusalem": { src: caesareaAqueduct, alt: "The ancient aqueduct beside the Mediterranean beach at Caesarea", sourceUrl: "https://commons.wikimedia.org/wiki/File:125359_caesarea_national_park_PikiWiki_Israel.jpg", credit: "זאב שטיין (Zeev Stein) · CC BY 2.5 · resized and converted to WebP", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" },
  "my-galilee-day": airport["nazareth"]!,
  "my-galilee-jerusalem": { src: capernaum, alt: "Archaeological remains and the ancient synagogue at Capernaum beside the Sea of Galilee", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/capernaum_.jpg" },
  "jerusalem-old-city-walk": { src: jerusalemOldCityStreet, alt: "Stone street in Jerusalem's Old City", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/Jerusalem_Old_City_street.webp" },
  "jerusalem-private-oldcity-walk": { src: holySepulchre, alt: "Church of the Holy Sepulchre in the Old City of Jerusalem" },
  "jerusalem-beyond-walls": { src: jerusalemDowntown, alt: "Pedestrian street in central Jerusalem beyond the Old City walls" },
  "jerusalem-street-art-walk": { src: "/images/jerusalem/hutzot-hayotzer.webp", alt: "Jerusalem artists' quarter, illustrating the city's creative side" },
  "jerusalem-day-tel-aviv": { src: "/images/jerusalem/mount-zion/dormition-abbey-and-bell-tower.webp", alt: "Dormition Abbey on Mount Zion in Jerusalem" },
  "jerusalem-bethlehem-private": { src: nativityCourtyard, alt: "Courtyard of the Church of the Nativity in Bethlehem" },
  "jaffa-carmel-walk": { src: jaffa, alt: "Old Jaffa's historic buildings above the Mediterranean harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/jaffa_panorama2.jpg" },
  "tel-aviv-street-art": telAvivAreaGuides.find(n => n.id === "telaviv-florentin")!.photo,
  "old-jaffa-walk": { src: "/images/attractions/tel-aviv-jaffa.webp", alt: "Boats and historic stone buildings in Jaffa harbor" },
  "neve-tzedek-walk": { src: neveTzedek, alt: "Historic streets and restored homes in Neve Tzedek" },
  "carmel-market-food-tour": migration["what-to-eat-in-israel"],
  "tel-aviv-cycling": { src: telAvivBeachfront, alt: "Tel Aviv seafront and promenade" },
  "white-city-audio": { src: telAvivDizengoff, alt: "Dizengoff neighborhood streets in central Tel Aviv" },
  "tel-aviv-jaffa-small-group": { src: keremHaTeimanim, alt: "Historic central Tel Aviv neighborhood and streets" },
  "masada-dead-sea-tel-aviv": { src: masadaPalace, alt: "Ancient palace remains on Masada overlooking the desert" },
  "masada-ein-gedi-dead-sea": migration["jerusalem-to-the-dead-sea"],
  "masada-dead-sea-jerusalem": { src: masadaAerial, alt: "Masada plateau and the surrounding Judean Desert seen from above" },
  "masada-ein-gedi-jerusalem": { src: einGediWaterfall, alt: "Waterfall and vegetation in the Ein Gedi oasis" },
  "masada-sunrise-tel-aviv": { src: masadaSnakePath, alt: "The steep Snake Path leading up Masada in the desert" },
  "masada-sunrise-jerusalem": { src: heroMasada, alt: "Masada fortress and the Judean Desert landscape" },
  "dead-sea-relax-tel-aviv": { src: deadSeaSunbeds, alt: "Sun loungers at a designated Dead Sea beach" },
  "dead-sea-relax-jerusalem": { src: deadSeaMud, alt: "Dead Sea mud bathing experience" },
  "jerusalem-bethlehem-shared": { src: bethlehemMangerSquare, alt: "Manger Square in Bethlehem" },
  "bethlehem-jericho-jordan": migration["EXISTING:qasr"],
  "bethlehem-halfday-jerusalem": { src: bethlehemShepherdsField, alt: "Chapel at Shepherds' Field near Bethlehem" },
  "bethlehem-private-halfday": { src: bethlehemCatholicGrottos, alt: "Ancient stone chapel and grottos in Bethlehem" },
  "bethlehem-jericho-qasr-small-group": { src: bethlehemMilkGrotto, alt: "The Milk Grotto Chapel in Bethlehem on the combined guided itinerary" },
  "bethlehem-jericho-qasr-tel-aviv": { src: jordanQasrPhoto, alt: "Jordan River banks at Qasr al-Yahud" },
  "bethlehem-qasr-dead-sea": { src: deadSeaMud, alt: "Visitors bathing in mineral-rich Dead Sea mud" },
  "nazareth-galilee-tel-aviv": migration["basilica-of-the-annunciation"],
  "galilee-nazareth-jordan": migration["EXISTING:galilee"],
  "caesarea-haifa-akko": airport["caesarea"]!,
  "north-coast-small-group": { src: akko, alt: "Fishing boats beside the historic stone buildings of Akko harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/akko_port_2.jpg" },
  "mahane-yehuda-tasting": jerusalemAreaGuides.find(n => n.id === "mahane-yehuda")!.photo,
  "eilat-glass-bottom-boat": airport["eilat"]!,
  "eilat-snorkeling": { src: coralReef, alt: "Corals and fish in the waters of Eilat's Red Sea reef", sourceUrl: "https://commons.wikimedia.org/wiki/File:Corals_in_Eilat_coral_reef_nature_reserve_1.jpg", credit: "Yoav95179 · CC BY-SA 4.0 · resized and converted to WebP", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
};

/**
 * Page-specific editorial photography never repeats across a rendered page.
 * A separated Moshe Barak portrait in the introduction and bottom contact
 * form is intentional and does not count as duplicate editorial photography.
 */
/** Six Jerusalem-only editorial links: one distinct photo per card. */
export const jerusalemTourLocalCards = [
  { to: "/travel-blog/old-city-jerusalem/", cta: "Discover the Old City", title: "Jerusalem's Old City", description: "Discover the historic quarters, landmarks and streets inside the city walls.", photo: { src: "/images/attractions/jerusalem.webp", alt: "Jerusalem's Old City and historic skyline from across the valley" } },
  { to: "/travel-blog/where-to-stay-in-jerusalem/", cta: "Compare neighborhoods", title: "Where to stay in Jerusalem", description: "Compare neighborhoods and find the right base for your visit.", photo: { src: jerusalemMamilla, alt: "Jerusalem's Mamilla neighborhood" } },
  { to: "/travel-blog/museums-in-jerusalem/", cta: "Find museums", title: "Museums in Jerusalem", description: "Explore art, archaeology, history and culture across the city.", photo: { src: museumsJerusalem, alt: "Rockefeller Archaeological Museum in Jerusalem" } },
  { to: "/travel-blog/shopping-in-jerusalem/", cta: "Browse shopping tips", title: "Shopping in Jerusalem", description: "Browse local markets, crafts, boutiques and shopping streets.", photo: { src: "/images/attractions/jerusalem-shopping.webp", alt: "Historic shopping street in central Jerusalem" } },
  { to: "/travel-blog/churches-in-jerusalem/", cta: "Explore sacred sites", title: "Churches in Jerusalem", description: "Plan visits to important churches and Christian heritage sites.", photo: { src: "/images/jerusalem/church-of-all-nations.webp", alt: "Church of All Nations on the Mount of Olives in Jerusalem" } },
  { to: "/travel-blog/jerusalem-travel-guide/", cta: "Read the travel guide", title: "Jerusalem travel guide", description: "Discover highlights, neighborhoods and practical visitor advice.", photo: { src: "/images/hotels/jerusalem-night.webp", alt: "Illuminated Jerusalem Old City walls and skyline after dark" } },
] as const;

/** Six Tel Aviv editorial links, each illustrated with a distinct local image. */
export const telAvivTourLocalCards = [
  { to: "/travel-blog/jaffa/", cta: "Explore historic Jaffa", title: "Old Jaffa", description: "Explore the old port, stone alleys, flea market and viewpoints.", photo: { src: "/images/city-stays/tel-aviv-jaffa.webp", alt: "Historic buildings in Old Jaffa" } },
  { to: "/travel-blog/attractions-in-tel-aviv/", cta: "See city highlights", title: "Tel Aviv attractions", description: "Beaches, markets, Bauhaus architecture and neighborhood highlights.", photo: { src: rothschild, alt: "Rothschild Boulevard and city architecture in Tel Aviv" } },
  { to: "/travel-blog/beaches-in-tel-aviv/", cta: "Discover the beaches", title: "Tel Aviv beaches", description: "Choose a beach and plan a relaxing walk along the promenade.", photo: migration["beaches-in-tel-aviv"] },
  { to: "/travel-blog/museums-in-tel-aviv/", cta: "Find museums", title: "Museums in Tel Aviv", description: "Art, design and local history, with practical visitor details.", photo: migration["museums-in-tel-aviv"] },
  { to: "/travel-blog/where-to-stay-in-tel-aviv/", cta: "Compare neighborhoods", title: "Where to stay in Tel Aviv", description: "Find the best base for the seafront, cafés and cultural sites.", photo: { src: "/images/city-stays/tel-aviv-dizengoff.webp", alt: "Central Tel Aviv neighborhood near Dizengoff" } },
  { to: "/travel-blog/getting-around-tel-aviv/", cta: "Plan local transport", title: "Getting around Tel Aviv", description: "Explore walking, light rail, buses and taxi options.", photo: { src: "/images/city-stays/tel-aviv-beachfront.webp", alt: "Tel Aviv beachfront and seafront streets" } },
] as const;

/** Six destination-specific editorial links for Masada and the Dead Sea. */
export const masadaTourLocalCards = [
  { to: "/travel-blog/masada/", cta: "Plan your fortress visit", title: "Masada visitor guide", description: "Understand the fortress, cable car, hiking routes and entry arrangements.", photo: { src: masadaRuins, alt: "Ancient archaeological ruins at Masada" } },
  { to: "/travel-blog/the-dead-sea/", cta: "Explore the Dead Sea", title: "The Dead Sea travel guide", description: "Find designated bathing areas, facilities and practical safety advice.", photo: { src: deadSeaLandscape, alt: "The Dead Sea and the surrounding desert mountains" } },
  { to: "/travel-blog/ein-gedi/", cta: "Check reserve access", title: "Ein Gedi Nature Reserve", description: "Plan around changed trail access, advance booking and weather conditions.", photo: { src: einGediOasis, alt: "Green vegetation and water in the Ein Gedi desert oasis" } },
  { to: "/travel-blog/dead-sea-attractions/", cta: "Discover more stops", title: "Attractions around the Dead Sea", description: "Explore desert viewpoints, historic sites and other possible stops.", photo: { src: qumranCaves, alt: "Caves in the cliffs near Qumran by the Dead Sea" } },
  { to: "/travel-blog/best-dead-sea-hotels/", cta: "Compare places to stay", title: "Where to stay at the Dead Sea", description: "Compare Ein Bokek hotels, spa facilities and overnight options.", photo: { src: deadSeaPool, alt: "Swimming pool in a Dead Sea resort setting" } },
  { to: "/travel-blog/jerusalem-to-the-dead-sea/", cta: "Compare travel options", title: "Jerusalem to the Dead Sea", description: "Compare buses, driving and private transport to the Dead Sea.", photo: { src: deadSeaRouteRoad, alt: "A desert highway leading toward the Dead Sea" } },
] as const;

/** Bethlehem, Jericho and Qasr al-Yahud: six unique editorial links to existing local guides. */
export const bethlehemTourLocalCards = [
  { to: travelGuidePaths.bethlehem, cta: "Plan your Bethlehem visit", title: "Jerusalem to Bethlehem", description: "Learn about checkpoints, travel eligibility, local transport and Nativity Church visits.", photo: { src: palestinianTaxi, alt: "Local Palestinian taxi in Bethlehem" } },
  { to: travelGuidePaths.qasr, cta: "Explore the baptismal site", title: "Qasr al-Yahud", description: "Plan a visit to the Jordan River baptismal site near Jericho, including access and site hours.", photo: { src: qasrPhoto, alt: "The Jordan River baptismal area at Qasr al-Yahud" } },
  { to: travelGuidePaths.baptism, cta: "Read baptism guidance", title: "Jordan River baptism visits", description: "Understand the practical arrangements and preparation for visiting the baptismal site.", photo: { src: "/images/attractions/jordan-river-baptism.webp", alt: "Baptismal steps leading into the Jordan River" } },
  { to: travelGuidePaths.jerusalemDayTrips, cta: "Compare nearby day trips", title: "Day trips from Jerusalem", description: "Explore how to plan a day out from Jerusalem and compare travel arrangements.", photo: { src: bethlehemNativity, alt: "The Church of the Nativity complex in Bethlehem" } },
  { to: "/travel-blog/dead-sea-attractions/", cta: "Discover the Jordan Valley", title: "Jordan Valley & Dead Sea stops", description: "Learn about nearby historic and desert attractions beyond the main pilgrimage stops.", photo: { src: qumranCaves, alt: "Ancient caves in the Judean Desert near Qumran" } },
  { to: travelGuidePaths.jerusalemDeadSea, cta: "Plan the journey", title: "Jerusalem to the Dead Sea", description: "Compare road travel options if your itinerary continues through the Jordan Valley.", photo: { src: deadSeaRouteRoad, alt: "Desert road winding through the Jordan Valley" } },
] as const;

/** General planning guides use icon cards, not photographs, to distinguish them from local sights. */
export const jerusalemTourPlanningCards = [
  { to: travelGuidePaths.israel, title: "Getting around Israel", description: "Trains, buses, taxis and private travel options.", icon: "train" },
  { to: travelGuidePaths.esim, title: "eSIM & mobile data", description: "Compare mobile connectivity options for your trip.", icon: "smartphone" },
  { to: travelGuidePaths.bestTime, title: "Weather & seasons", description: "Plan for Israel's different climates and seasons.", icon: "cloud-sun" },
  { to: travelGuidePaths.calendar, title: "Holidays & events", description: "Check dates that can affect opening times and travel.", icon: "calendar-days" },
  { to: travelGuidePaths.food, title: "Food in Israel", description: "Discover local dishes, market favorites and flavors.", icon: "utensils" },
  { to: travelGuidePaths.travelTips, title: "Israel travel tips", description: "Practical advice for a smoother visit.", icon: "lightbulb" },
] as const;

type ReadingId = "jerusalem" | "jaffa" | "telAviv" | "masada" | "deadSea" | "einGedi" | "bethlehem" | "baptism" | "nazareth" | "galilee" | "akko" | "haifa" | "caesarea" | "food" | "eilat" | "tips";
const reading: Record<ReadingId, ShoreReadingGuide> = {
  jerusalem: { title: "Jerusalem's Old City", description: "Get to know the quarters, holy sites and viewpoints. Plan time for walking, queues and the places that matter most to you.", to: "/travel-blog/old-city-jerusalem/", photo: { src: "/images/attractions/jerusalem-shopping.webp", alt: "Market shopping lanes in Jerusalem" } },
  jaffa: { title: "Explore Old Jaffa", description: "Discover the harbour, stone lanes and flea-market area. Add a little background to a guided walk through the old town.", to: "/travel-blog/jaffa/", photo: tourPhotos["jaffa-carmel-walk"]! },
  telAviv: { title: "Getting around Tel Aviv", description: "Connect your hotel, meeting point and seafront plans. Decide where walking fits and when another form of transport helps.", to: travelGuidePaths.telAviv, photo: airport["tel-aviv"]! },
  masada: { title: "Masada visitor guide", description: "Understand the fortress, cable-car access and desert setting. Plan admissions and realistic time on the plateau.", to: "/travel-blog/masada/", photo: migration["EXISTING:masada"] },
  deadSea: { title: "A day at the Dead Sea", description: "Compare designated beach areas and their facilities. Plan a comfortable stop beside the water and a realistic onward journey.", to: travelGuidePaths.deadSea, photo: airport["dead-sea"]! },
  einGedi: { title: "Ein Gedi Nature Reserve", description: "Learn about the oasis and its walking routes. Check which trails are open before including a nature stop in your day.", to: "/travel-blog/ein-gedi/", photo: tourPhotos["masada-ein-gedi-dead-sea"]! },
  bethlehem: { title: "Jerusalem to Bethlehem", description: "Get to know the Nativity Church and the practical journey. Understand the crossing arrangements to confirm before travelling.", to: travelGuidePaths.bethlehem, photo: { src: bethlehemMilkGrotto, alt: "The Milk Grotto in Bethlehem" } },
  baptism: { title: "Jordan River baptism sites", description: "Understand the difference between Yardenit and Qasr el-Yahud. Match the site on your itinerary to the experience you want.", to: travelGuidePaths.baptism, photo: migration["EXISTING:qasr"] },
  nazareth: { title: "Basilica of the Annunciation", description: "Discover Nazareth's major Christian landmark and its setting. Learn what to consider about access and time inside the church.", to: travelGuidePaths.annunciation, photo: migration["basilica-of-the-annunciation"] },
  galilee: { title: "Sea of Galilee highlights", description: "Explore the lakeside setting of Capernaum, Tabgha and Tiberias. Choose a manageable group of stops for your day in the north.", to: "/travel-blog/sea-of-galilee/", photo: migration["EXISTING:galilee"] },
  akko: { title: "Akko's Old City & harbour", description: "Discover Crusader history, market lanes and the fishing harbour. Plan your walking time and the sites worth booking ahead.", to: "/travel-blog/akko-acre/", photo: tourPhotos["north-coast-small-group"]! },
  haifa: { title: "Haifa: gardens & viewpoints", description: "Get to know the Carmel slopes, German Colony and coastal setting. Distinguish a garden viewpoint from a visit inside the terraces.", to: "/travel-blog/haifa/", photo: airport["haifa"]! },
  caesarea: { title: "Caesarea by the sea", description: "Explore the Roman harbour, theatre and coastal remains. Understand the site layout before choosing how long to spend there.", to: "/attractions/caesarea/", photo: airport["caesarea"]! },
  food: { title: "What to eat in Israel", description: "Discover dishes, snacks and market favourites. Arrive at your tasting walk with a few flavours you would love to try.", to: travelGuidePaths.food, photo: migration["what-to-eat-in-israel"] },
  eilat: { title: "Eilat & the Red Sea", description: "Plan your stay around the waterfront, beaches and nearby desert. Leave time between activities to enjoy the southern coast.", to: travelGuidePaths.eilat, photo: airport["eilat"]! },
  tips: { title: "Israel travel tips", description: "Prepare the everyday essentials for a smoother visit. Find practical advice for planning your days and moving between destinations.", to: travelGuidePaths.travelTips, photo: { src: "/images/attractions/ramon-crater.webp", alt: "Desert mountains and crater in southern Israel" } },
};

export type TourCategory = {
  id: TourCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  photo: GuidePhoto;
  match: { destinations?: TourPlaceId[]; tags?: TourTagId[] };
  paragraphs: string[];
  choices: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  reading: ReadingId[];
};

export const tourCategories: TourCategory[] = [
  {
    id: "jerusalem", title: "Jerusalem tours & day trips", shortTitle: "Jerusalem",
    description: "Compare Jerusalem tours, Old City visits and guided day trips from Tel Aviv, including private and combined Jerusalem–Bethlehem itineraries.",
    intro: "Discover Jerusalem's historic quarters, sacred landmarks and panoramic viewpoints. Choose a guided walking tour, a full-day experience or a private journey tailored to your interests.",
    photo: migration["EXISTING:jerusalem"], match: { destinations: ["jerusalem"] },
    paragraphs: ["Jerusalem's Old City is best explored on foot, with uneven lanes, busy landmarks and plenty to discover between stops. Choose a tour departing from Jerusalem to spend more time in the city, or one from Tel Aviv if you need return transport.", "First-time visitors may prefer a city-focused tour rather than a packed multi-destination day. Jerusalem–Bethlehem itineraries involve more travel and crossing arrangements; check the operator's current requirements. Private guided tours include a guide, while my private-driver option provides transport only."],
    choices: [
      { title: "Jerusalem in a day", text: "A broad introduction for first-time visitors, with viewpoints, Old City walking and transport from the advertised departure city." },
      { title: "Jerusalem & Bethlehem", text: "Two important heritage destinations in one itinerary. Allow for less time in each place and confirm crossing requirements." },
      { title: "Your own pace", text: "A private guided tour suits detailed interests; my car-and-driver service suits a tailored transport plan, with guiding arranged separately." },
    ],
    faqs: [
      { q: "Does a Jerusalem tour always start in Jerusalem?", a: "No. Jerusalem is the destination on this page; each card identifies the departure city. A tour from Tel Aviv includes travel to Jerusalem, while a Jerusalem departure starts locally." },
      { q: "Will I visit every major holy site?", a: "No single itinerary covers everything. Compare the actual stops, access arrangements and time inside sites. Religious events, opening arrangements and operating days can change the route." },
      { q: "Is a walking tour suitable for everyone?", a: "Old City streets include uneven paving, slopes and steps. Tell the operator about mobility needs and ask about the actual walking route before choosing a tour." },
    ], reading: ["jerusalem", "bethlehem", "baptism", "tips"],
  },
  {
    id: "tel-aviv-jaffa", title: "Tel Aviv & Jaffa tours", shortTitle: "Tel Aviv & Jaffa",
    description: "Discover Tel Aviv and Old Jaffa through guided walks, street art, architecture and Carmel Market tastings. Compare duration, meeting points and inclusions.",
    intro: "Follow Jaffa's lanes down to the sea, explore Tel Aviv's creative neighborhoods or taste your way through the market. These local experiences bring the city to life without a full day on the road.",
    photo: migration["EXISTING:coast"], match: { destinations: ["tel-aviv"] },
    paragraphs: ["Tel Aviv and Jaffa are best explored in manageable neighborhoods: walk historic Jaffa and Neve Tzedek, discover the White City's architecture, or focus on Florentin street art and Carmel Market's food stalls. Compare the length and format of each tour: cycling, audio tours and guided walks provide different experiences.", "Most guided walks start at a meeting point rather than a hotel. Confirm where your tour ends and whether food, bicycle equipment or museum admission is included. My private-driver service offers flexible transport and stops, not a guided walking tour; professional guiding can be arranged separately when requested."],
    choices: [
      { title: "Old Jaffa & city highlights", text: "A good introduction to the coastal setting and historic neighborhoods, with a longer walk between different areas." },
      { title: "Street art & local stories", text: "A shorter, focused experience around murals and creative streets. Ideal when you already know the city's main landmarks." },
      { title: "Markets & tastings", text: "Combine local history with food. Check the number of tastings and dietary arrangements rather than assuming a full meal." },
    ],
    faqs: [
      { q: "Are these guided walking tours or other experiences?", a: "Most listings are guided walks, but cycling and self-guided audio options are also available. Each tour card gives the duration and format. Check the actual meeting point and mobility requirements on the booking page." },
      { q: "Can I combine Jaffa with Carmel Market?", a: "Yes. Some longer guided walks connect Jaffa, Neve Tzedek and Carmel Market. For a shorter outing, choose a dedicated Jaffa walk or market tasting, and check whether the tour ends where it began." },
      { q: "Are food tastings included on every tour?", a: "No. Only dedicated food tours or options that explicitly list tastings include them. Check dietary arrangements, sample quantities and operator conditions before booking." },
      { q: "Can I explore Tel Aviv & Jaffa with a private driver?", a: "Yes. I can plan a flexible transport itinerary with pickup and stops agreed in advance. My driver service is transport only; if you want a licensed guide, please ask about arranging one separately." },
      { q: "What should I know about weekends and the weather?", a: "Market stalls, museums and public transport can have different Friday, Saturday and holiday schedules. In hot weather, carry water and plan shade breaks. The historic lanes of Jaffa include slopes, steps and uneven paving." },
    ], reading: ["jaffa", "telAviv", "food", "tips"],
  },
  {
    id: "masada-dead-sea", title: "Masada & Dead Sea tours", shortTitle: "Masada & the Dead Sea",
    description: "Compare exact Masada and Dead Sea tour options from Jerusalem or Tel Aviv, including guided trips, sunrise hikes, Ein Gedi routes, beach days and private transport.",
    intro: "Explore Masada's mountain fortress and the extraordinary Dead Sea, with day trips from Jerusalem and Tel Aviv. Compare classic guided tours, sunrise hikes, Ein Gedi combinations and relaxed beach days.",
    photo: migration["EXISTING:masada"], match: { destinations: ["masada", "dead-sea", "ein-gedi"] },
    paragraphs: [
      "Choose your departure city first. Classic tours usually pair a guided visit to Masada with time at a designated Dead Sea beach. Sunrise options begin very early and often involve the steep Snake Path hike, while Dead Sea-only trips leave more time for relaxing by the water.",
      "Look carefully at what is actually included: national-park and cable-car tickets, reserve admission, Dead Sea beach access, meals and any guided visits can be charged separately. An English-speaking host or driver does not necessarily provide professional guiding at the sites.",
      "Ein Gedi's walking routes have changed following flood damage, and some advertised itineraries may visit an alternative location. Check the current accessible trails with the park authority and confirm the precise stop with the tour operator. For a flexible private day, I can arrange transport from Jerusalem or Tel Aviv, with your stops and return time agreed in advance.",
    ],
    choices: [
      { title: "Masada and beach", text: "Combine fortress history and dramatic desert views with time at a designated Dead Sea bathing area." },
      { title: "Sunrise and Ein Gedi", text: "An early, active day with a steep climb on some routes. Confirm reserve access and your fitness for the hike." },
      { title: "Dead Sea relaxation", text: "Spend more time by the water instead of visiting Masada, or arrange a flexible private itinerary." },
    ],
    faqs: [
      { q: "Can I start a Masada and Dead Sea tour from Jerusalem or Tel Aviv?", a: "Yes. The catalog includes departures from both cities. Travel times, meeting points and the time available at each stop differ, so check the exact departure shown on the booking page." },
      { q: "Is the Masada cable car included in the tour price?", a: "Not always. National-park admission and cable-car tickets may be separate. On sunrise itineraries, the ascent may be a demanding hike on the Snake Path rather than a cable-car ride." },
      { q: "Can I visit Ein Gedi on a combined day tour?", a: "Some tours advertise Ein Gedi, but floods have changed trail access and operators may substitute another location. Check current reserve information, advance-registration requirements and the operator's confirmed itinerary." },
      { q: "Are there tours that visit only the Dead Sea?", a: "Yes. Dead Sea relaxation tours focus on beach time without a Masada fortress visit. Confirm the designated beach, bathing facilities, admission fees and pickup location before booking." },
      { q: "Can I arrange a private car and driver?", a: "Yes. I can arrange a private transport day from Jerusalem or Tel Aviv with a route and stops agreed around your plans. My driving service is separate from licensed guiding, site admissions and meals." },
    ], reading: ["masada", "deadSea", "einGedi", "tips"],
  },
  {
    id: "bethlehem-jericho", title: "Bethlehem, Jericho & Qasr al-Yahud tours", shortTitle: "Bethlehem, Jericho & Qasr al-Yahud",
    description: "Compare Bethlehem, Jericho and Qasr al-Yahud day tours and guided visits from Jerusalem and Tel Aviv, with clear routes, entry requirements and local guiding details.",
    intro: "Explore Bethlehem, the ancient city of Jericho and Qasr al-Yahud, the Jordan River baptismal site near Jericho. Compare Bethlehem-only visits with full-day tours that include Jericho and the baptismal site, departing from Jerusalem or Tel Aviv.",
    photo: migration["jerusalem-to-bethlehem"], match: { destinations: ["bethlehem", "jericho"] },
    paragraphs: [
      "Not every tour visits all three locations. Short Bethlehem trips usually focus on the Church of the Nativity, Manger Square and Shepherds' Field. Longer day tours can add Jericho's archaeological and biblical sites and, on selected routes, a stop at Qasr al-Yahud on the lower Jordan River.",
      "Check the detailed itinerary and the named baptismal site: choose a tour that explicitly includes Qasr al-Yahud if that is an essential stop. A Jordan River visit does not automatically include a baptism ceremony. Visits to the Church of the Nativity and its grotto can be affected by services, restoration and queues.",
      "Bethlehem and parts of Jericho are in Palestinian Authority-administered areas, and entry rules, passport eligibility, checkpoints, local guide and vehicle arrangements depend on the visitor and itinerary. Some operators restrict participation by nationality. Confirm eligibility and permitted access directly with the operator before paying; published tours are not guarantees of access or operation for your travel date.",
    ],
    choices: [
      { title: "Bethlehem highlights", text: "A shorter visit to Nativity Church and nearby Christian heritage sites; no Jericho or river stop unless listed." },
      { title: "Bethlehem, Jericho and Qasr al-Yahud", text: "A full-day pilgrimage and heritage route; check that all three sites are explicitly included." },
      { title: "Shared or privately guided", text: "Compare the group size, departure city, local guide handovers, site access and transport inclusions." },
    ],
    faqs: [
      { q: "Do all tours on this page visit Bethlehem, Jericho and Qasr al-Yahud?", a: "No. Some focus exclusively on Bethlehem; others combine Bethlehem with Jericho and the Qasr al-Yahud baptismal site. Check each product's actual stop list before booking." },
      { q: "Which Jordan River baptismal site is relevant to these itineraries?", a: "Qasr al-Yahud (also written Kasr el-Yahud), the baptismal site on the lower Jordan River near Jericho. Only select a tour for this purpose when its advertised itinerary identifies that location." },
      { q: "Can I depart from Jerusalem or Tel Aviv?", a: "Yes, but not every tour offers both cities. Use the departure filters and confirm the exact meeting point, pickup eligibility and return city with the provider." },
      { q: "Can every traveler enter Bethlehem and Jericho?", a: "No. Entry and transit depend on nationality, travel documents, current security measures and the route. Some booking products explicitly restrict Israeli passport holders. Confirm your circumstances with the operator and current official guidance before purchasing." },
      { q: "Is baptism or entry to the Nativity Grotto guaranteed?", a: "No. A stop at Qasr al-Yahud is not necessarily a baptism ceremony; any ceremony needs separate confirmation. Grotto entry depends on religious services, restoration work, queues and available time." },
      { q: "Do tours use local guides or change vehicles at checkpoints?", a: "Sometimes. Bethlehem trips may involve locally licensed guides, a vehicle change or a checkpoint handover. The arrangements differ by operator, traveler eligibility and date. Ask the provider to confirm the complete pickup, guiding and return plan." },
    ], reading: ["bethlehem", "baptism", "jerusalem", "tips"],
  },
  {
    id: "nazareth-galilee", title: "Nazareth & Sea of Galilee tours", shortTitle: "Nazareth & Sea of Galilee",
    description: "Compare Nazareth and Sea of Galilee day trips from Tel Aviv and Jerusalem, Christian heritage itineraries and private car-and-driver options.",
    intro: "Follow the stories of Nazareth and the lakeside sites of Galilee, with time for church visits and sweeping views. A guided itinerary connects the history; a private transport plan lets you agree the stops around your own interests.",
    photo: migration["EXISTING:galilee"], match: { destinations: ["nazareth", "galilee"] },
    paragraphs: ["Nazareth and the Sea of Galilee cover a wide area, so every full-day itinerary makes choices. Some focus on the Annunciation, Capernaum and Tabgha; others include a Jordan River stop or different lakeside viewpoints. Compare named sites and time on the road, especially when starting in central Israel.", "Shared guided tours offer a planned route and a group. A private car-and-driver day gives you more say in transport timing, with licensed guiding quoted separately. Church access, ceremonies and river arrangements are specific to the site and date, so discuss any essential visit before choosing the day."],
    choices: [
      { title: "Christian heritage", text: "A guided introduction to Nazareth and selected Gospel sites around the lake. Check which churches are actually included." },
      { title: "Galilee & Jordan River", text: "Combine lakeside scenery with a river stop. Confirm the site and arrange any ceremony independently unless explicitly included." },
      { title: "A tailored northern day", text: "Prioritise fewer stops or a gentler pace with private transportation. I confirm a realistic itinerary and return time in the quote." },
    ],
    faqs: [
      { q: "Can I depart from Jerusalem?", a: "One current itinerary offers both Jerusalem and Tel Aviv departure options. Choose the correct option with the provider; the other card is specifically a Tel Aviv departure." },
      { q: "Is a baptism included?", a: "A river visit is not the same as an arranged baptism. Confirm the site, ceremony, clergy, clothing and any separate charges with the relevant operator or site." },
      { q: "Is this the same as a Haifa shore excursion?", a: "No. Ordinary city departures do not promise port pickup or return to a ship. Use the dedicated Haifa shore-excursion page for that service." },
    ], reading: ["nazareth", "galilee", "baptism", "tips"],
  },
  {
    id: "northern-coast", title: "Caesarea, Haifa & Acre tours", shortTitle: "Caesarea, Haifa & Acre",
    description: "Explore northern coast day trips to Caesarea, Haifa and Acre. Compare shared tours, smaller groups, duration, departure and admission inclusions.",
    intro: "Trace the Mediterranean coast from Roman Caesarea to Haifa's garden views and the old harbour of Acre. Choose a classic shared day, a smaller group or a private transport itinerary built around your favourite stops.",
    photo: airport["caesarea"]!, match: { destinations: ["caesarea", "haifa", "akko"] },
    paragraphs: ["Northern coast tours bring several eras together: Roman remains beside the sea, Haifa's terraced garden setting and Acre's layered Old City. Combining them in one day suits a broad first impression, while fewer stops allow more time inside individual sites and for walking through the old streets.", "Group size and admissions make a real difference to the experience and total cost. A small-group listing can still have a minimum departure requirement. Some coastal listings mention Rosh Hanikra in older descriptions; confirm the current route rather than assuming the grottoes are included. Garden viewpoints and access inside Haifa's terraces should also be distinguished."],
    choices: [
      { title: "Classic coastal day", text: "Several headline destinations in one planned itinerary, suited to travellers who want an introduction to the region." },
      { title: "A smaller guided group", text: "Fewer fellow travellers and a different price point. Confirm the group limit, minimum numbers and admission costs." },
      { title: "Your own coastal route", text: "With my private transport, agree the stops and time at each place. Licensed guiding and attraction tickets are separate." },
    ],
    faqs: [
      { q: "Is Rosh Hanikra included?", a: "Do not assume so. Product descriptions can mention different versions of the route. Confirm the actual operating itinerary and site access for your date before booking." },
      { q: "Are Caesarea and Acre admission fees included?", a: "Inclusions vary. The small-group option below specifically lists entry fees as extra. Check each site's admission and the selected option's total." },
      { q: "Can I use these tours from a cruise ship?", a: "These cards describe ordinary city departures. For port meeting arrangements and a ship's return schedule, use the separate Haifa or Ashdod shore-excursion pages." },
    ], reading: ["caesarea", "haifa", "akko", "tips"],
  },
  {
    id: "food-markets", title: "Food & market tours in Israel", shortTitle: "Food & markets",
    description: "Compare guided food and market tours in Jerusalem and Tel Aviv, including Mahane Yehuda and Carmel Market tastings, duration and meeting points.",
    intro: "Taste local favourites, hear the stories behind the stalls and see a city through its food. Choose a focused Jerusalem market walk or combine Jaffa and Tel Aviv sightseeing with Carmel Market flavours.",
    photo: migration["what-to-eat-in-israel"], match: { tags: ["food"] },
    paragraphs: ["A food tour can be a focused introduction to a market or one part of a longer city walk. Mahane Yehuda brings Jerusalem's food traditions together in a compact area, while the Jaffa and Carmel experience connects several neighborhoods before its market tastings. Choose by city, walking time and the balance of history and food.", "Check the number and size of tastings, whether drinks are included and how dietary requirements are handled. A tasting selection is not automatically a guaranteed full meal or suitable for every allergy or religious requirement. Market hours, holidays and individual stall opening days can change the food stops."],
    choices: [
      { title: "Jerusalem market flavours", text: "A shorter, food-focused walk through Mahane Yehuda, with tastings and the market's local stories." },
      { title: "Jaffa, city streets & Carmel", text: "A longer experience combining historical lanes, architecture and a market tasting stop in Tel Aviv." },
      { title: "Dietary needs", text: "Tell the operator about allergies and dietary restrictions before booking. Confirm what can actually be accommodated." },
    ],
    faqs: [
      { q: "Will the tastings replace lunch?", a: "That depends on the experience and your appetite. Read the actual tasting inclusions; drinks and extra purchases may be separate." },
      { q: "Are all tours suitable for vegetarians or kosher diets?", a: "Do not assume this. Ask the operator about the exact food stops, dietary arrangements and any substitutions before booking." },
      { q: "Do food tours include hotel pickup?", a: "The current options are local walks with meeting points. Confirm the exact address; the Mahane Yehuda listing has conflicting map and meeting text that needs clarification from its operator." },
    ], reading: ["food", "jerusalem", "jaffa", "telAviv"],
  },
  {
    id: "eilat-red-sea", title: "Eilat & Red Sea activities", shortTitle: "Eilat & the Red Sea",
    description: "Compare Eilat boat trips and guided snorkeling activities. See duration, meeting arrangements and inclusions for local Red Sea experiences.",
    intro: "See the Red Sea from above or explore it with a mask and snorkel. A glass-bottom boat keeps the day easy and dry; a guided snorkeling outing brings you closer to Eilat's underwater scenery.",
    photo: airport["eilat"]!, match: { destinations: ["eilat"] },
    paragraphs: ["These activities start locally in Eilat, so they fit naturally into a stay in the city. A glass-bottom cruise offers coastal views and underwater viewing without swimming. Snorkeling involves entering the sea and has different participation requirements, equipment arrangements and weather considerations.", "Compare total activity time with the actual time on the water. A snorkeling outing may include preparation and briefing around a shorter guided session, while the boat listing describes the cruise duration. Confirm the meeting location, equipment and any restrictions directly with the activity provider before booking."],
    choices: [
      { title: "A relaxed boat outing", text: "A shared cruise with underwater viewing, suited to visitors who prefer to stay aboard rather than swim." },
      { title: "Guided snorkeling", text: "An active experience with an instructor. Confirm swimming ability, equipment, participant requirements and the actual water time." },
      { title: "Leave room in your day", text: "Local meeting points make these shorter outings easy to combine with free time. Allow for preparation and the journey from your hotel." },
    ],
    faqs: [
      { q: "Is transport from Tel Aviv included?", a: "No. The current activities meet locally in Eilat. Intercity travel and accommodation need separate planning." },
      { q: "Do I need to swim for the glass-bottom boat?", a: "No swimming is part of the advertised boat cruise. Check boarding access and any participant restrictions with the provider." },
      { q: "Is the whole snorkeling activity spent in the water?", a: "No. The advertised total includes preparation around a shorter guided water session. Confirm the actual water time, equipment and participation requirements with the dive centre." },
    ], reading: ["eilat", "tips", "deadSea", "food"],
  },
];

export function getTourCategory(id: TourCategoryId) { return tourCategories.find(category => category.id === id)!; }
export function tourReadingGuides(id: TourCategoryId) { return getTourCategory(id).reading.map(key => reading[key]); }
export const toursHubHero = { src: "/images/attractions/hero-jerusalem.webp", alt: "Jerusalem's historic skyline overlooking the Old City" };
export const toursHubGuides = [
  { ...reading.jerusalem, photo: { src: "/images/attractions/jerusalem.webp", alt: "The Old City of Jerusalem viewed across its hills" } },
  { ...reading.masada, photo: { src: "/images/tours/masada-ruins.webp", alt: "Ancient ruins at Masada" } },
  { ...reading.jaffa, photo: { src: "/images/attractions/tel-aviv-jaffa.webp", alt: "Boats in Jaffa's old harbour" } },
  { ...reading.galilee, photo: { src: "/images/attractions/sea-of-galilee.webp", alt: "View of the Sea of Galilee" } },
];
export const toursHubTitle = "Tours & day trips in Israel";
export const toursHubDescription = "Explore Israel tours by destination and interest: Jerusalem, Tel Aviv, Masada, Galilee, food tours and Eilat. Find guided day trips, private experiences, food walks and Red Sea activities.";
export const toursHubFaqs = [
  { q: "Can I find both shared and private experiences?", a: "Yes. The category pages bring together shared guided trips, local activities and private options where available. A private driver handles transportation; licensed guiding is a separate inclusion to confirm on the specific experience." },
  { q: "How do I choose the right departure city?", a: "Each tour card identifies where it starts. A destination page can include different departures, so check that the selected option starts where you will be staying." },
  { q: "Are prices and dates confirmed here?", a: "No. External starting prices, where shown, are reference snapshots. Open the booking page for the current price, date, group size and inclusions. I confirm my own private transport quotes directly." },
  { q: "Where are the tours from cruise ports?", a: "Use the separate shore-excursion pages for Haifa and Ashdod. Ordinary city departures do not promise port pickup or a return matched to your ship's schedule." },
];

export const tourPlanningGuides: ShoreReadingGuide[] = [
  { title: "Israel travel tips", description: "Prepare for a smoother visit, from everyday essentials to planning your days. Keep the practical details in hand before you set out.", to: travelGuidePaths.travelTips, photo: { src: "/images/attractions/ramon-crater.webp", alt: "Desert landscape at Ramon Crater in southern Israel" } },
  { title: "Best time to visit Israel", description: "Find a season that suits the trip you have in mind. Plan around the weather, daylight and the experiences you most want to enjoy.", to: travelGuidePaths.bestTime, photo: migration["best-time-to-visit-israel"] },
  { title: "Holidays & events", description: "Make the calendar part of your planning. Understand how holidays and local events can shape opening times, travel and the feel of your visit.", to: travelGuidePaths.calendar, photo: migration["calendar-of-events"] },
  { title: "Getting around Israel", description: "Connect your destinations with a transport plan that fits your pace. Compare the practical options for travelling between cities and attractions.", to: travelGuidePaths.israel, photo: { src: roadTrip, alt: "Illustration of a road trip through Israel's countryside" } },
  { title: "Choose an eSIM for Israel", description: "Stay connected for maps, messages and bookings. Compare mobile-data options and check what your phone needs before you arrive.", to: travelGuidePaths.esim, photo: { src: esim, alt: "A phone displaying an eSIM graphic", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/best_esim_for_israel.jpeg" } },
  { title: "Find the right place to stay", description: "Choose a base that works with your itinerary. Explore accommodation areas and styles, from a city break to a relaxing resort stay.", to: "/accommodation/", photo: { src: hotelRoom, alt: "Illustration of a welcoming hotel room" } },
];

/** Reuse the homepage's cruise illustration without implying a particular ship or operator. */
export const tourCruisePhoto: GuidePhoto = {
  src: cruiseShip, alt: "Illustration of a cruise ship moored beside a harbour quay, with passengers setting out on an excursion",
};

export const tourCruisePorts = [
  { id: "haifa", title: "From Haifa Port", to: "/haifa-shore-excursions/", description: "Discover Galilee's sacred sites, Akko's old harbour and the northern coast.", photo: airport["haifa"]! },
  { id: "ashdod", title: "From Ashdod Port", to: "/ashdod-shore-excursions/", description: "Explore Jerusalem, the lively coast of Tel Aviv and Jaffa, or Masada and the Dead Sea.", photo: airport["ashdod"]! },
] as const;
