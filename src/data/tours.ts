import type { LinkProps } from "@tanstack/react-router";
import type { TourPlaceId, TourTagId } from "@/data/tourTypes";
import type { GuidePhoto } from "@/data/travelGuides";
import type { ShoreReadingGuide } from "@/data/shoreReading";
import { migrationPhotos as migration } from "@/data/guideMigrationPhotos";
import { airportTransferPhotos as airport } from "@/data/airportTransfers";
import { jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { travelGuidePaths } from "@/data/registry";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import akko from "@/assets/shore-excursions/akko-port.jpg";
import holySepulchre from "@/assets/guides/holy-sepulchre.jpg";
import coralReef from "@/assets/eilat/coral-reef.webp";

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
  "my-jerusalem-day": airport["jerusalem"]!,
  "my-masada-day": airport["dead-sea"]!,
  "my-north-coast-day": airport["haifa"]!,
  "my-galilee-day": airport["nazareth"]!,
  "jerusalem-day-tel-aviv": migration["EXISTING:jerusalem"],
  "jerusalem-bethlehem-private": migration["jerusalem-to-bethlehem"],
  "jaffa-carmel-walk": { src: jaffa, alt: "Old Jaffa's historic buildings above the Mediterranean harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/jaffa_panorama2.jpg" },
  "tel-aviv-street-art": telAvivAreaGuides.find(n => n.id === "telaviv-florentin")!.photo,
  "masada-dead-sea-tel-aviv": migration["EXISTING:masada"],
  "masada-ein-gedi-dead-sea": migration["jerusalem-to-the-dead-sea"],
  "jerusalem-bethlehem-shared": { src: holySepulchre, alt: "The Church of the Holy Sepulchre courtyard and facade in Jerusalem", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Church_of_the_Holy_Sepulchre_Jerusalem_israel.jpg" },
  "bethlehem-jericho-jordan": migration["EXISTING:qasr"],
  "nazareth-galilee-tel-aviv": migration["basilica-of-the-annunciation"],
  "galilee-nazareth-jordan": migration["EXISTING:galilee"],
  "caesarea-haifa-akko": airport["caesarea"]!,
  "north-coast-small-group": { src: akko, alt: "Fishing boats beside the historic stone buildings of Akko harbour", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/akko_port_2.jpg" },
  "mahane-yehuda-tasting": jerusalemAreaGuides.find(n => n.id === "mahane-yehuda")!.photo,
  "eilat-glass-bottom-boat": airport["eilat"]!,
  "eilat-snorkeling": { src: coralReef, alt: "Corals and fish in the waters of Eilat's Red Sea reef", sourceUrl: "https://commons.wikimedia.org/wiki/File:Corals_in_Eilat_coral_reef_nature_reserve_1.jpg", credit: "Yoav95179 · CC BY-SA 4.0 · resized and converted to WebP", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
};

type ReadingId = "jerusalem" | "jaffa" | "telAviv" | "masada" | "deadSea" | "einGedi" | "bethlehem" | "baptism" | "nazareth" | "galilee" | "akko" | "haifa" | "caesarea" | "food" | "eilat" | "tips";
const reading: Record<ReadingId, ShoreReadingGuide> = {
  jerusalem: { title: "Jerusalem's Old City", description: "Get to know the quarters, holy sites and viewpoints. Plan time for walking, queues and the places that matter most to you.", to: "/travel-blog/old-city-jerusalem/", photo: migration["EXISTING:jerusalem"] },
  jaffa: { title: "Explore Old Jaffa", description: "Discover the harbour, stone lanes and flea-market area. Add a little background to a guided walk through the old town.", to: "/travel-blog/jaffa/", photo: tourPhotos["jaffa-carmel-walk"]! },
  telAviv: { title: "Getting around Tel Aviv", description: "Connect your hotel, meeting point and seafront plans. Decide where walking fits and when another form of transport helps.", to: travelGuidePaths.telAviv, photo: airport["tel-aviv"]! },
  masada: { title: "Masada visitor guide", description: "Understand the fortress, cable-car access and desert setting. Plan admissions and realistic time on the plateau.", to: "/travel-blog/masada/", photo: migration["EXISTING:masada"] },
  deadSea: { title: "A day at the Dead Sea", description: "Compare designated beach areas and their facilities. Plan a comfortable stop beside the water and a realistic onward journey.", to: travelGuidePaths.deadSea, photo: airport["dead-sea"]! },
  einGedi: { title: "Ein Gedi Nature Reserve", description: "Learn about the oasis and its walking routes. Check which trails are open before including a nature stop in your day.", to: "/travel-blog/ein-gedi/", photo: tourPhotos["masada-ein-gedi-dead-sea"]! },
  bethlehem: { title: "Jerusalem to Bethlehem", description: "Get to know the Nativity Church and the practical journey. Understand the crossing arrangements to confirm before travelling.", to: travelGuidePaths.bethlehem, photo: migration["jerusalem-to-bethlehem"] },
  baptism: { title: "Jordan River baptism sites", description: "Understand the difference between Yardenit and Qasr el-Yahud. Match the site on your itinerary to the experience you want.", to: travelGuidePaths.baptism, photo: migration["EXISTING:qasr"] },
  nazareth: { title: "Basilica of the Annunciation", description: "Discover Nazareth's major Christian landmark and its setting. Learn what to consider about access and time inside the church.", to: travelGuidePaths.annunciation, photo: migration["basilica-of-the-annunciation"] },
  galilee: { title: "Sea of Galilee highlights", description: "Explore the lakeside setting of Capernaum, Tabgha and Tiberias. Choose a manageable group of stops for your day in the north.", to: "/travel-blog/sea-of-galilee/", photo: migration["EXISTING:galilee"] },
  akko: { title: "Akko's Old City & harbour", description: "Discover Crusader history, market lanes and the fishing harbour. Plan your walking time and the sites worth booking ahead.", to: "/travel-blog/akko-acre/", photo: tourPhotos["north-coast-small-group"]! },
  haifa: { title: "Haifa: gardens & viewpoints", description: "Get to know the Carmel slopes, German Colony and coastal setting. Distinguish a garden viewpoint from a visit inside the terraces.", to: "/travel-blog/haifa/", photo: airport["haifa"]! },
  caesarea: { title: "Caesarea by the sea", description: "Explore the Roman harbour, theatre and coastal remains. Understand the site layout before choosing how long to spend there.", to: "/attractions/caesarea/", photo: airport["caesarea"]! },
  food: { title: "What to eat in Israel", description: "Discover dishes, snacks and market favourites. Arrive at your tasting walk with a few flavours you would love to try.", to: travelGuidePaths.food, photo: migration["what-to-eat-in-israel"] },
  eilat: { title: "Eilat & the Red Sea", description: "Plan your stay around the waterfront, beaches and nearby desert. Leave time between activities to enjoy the southern coast.", to: travelGuidePaths.eilat, photo: airport["eilat"]! },
  tips: { title: "Israel travel tips", description: "Prepare the everyday essentials for a smoother visit. Find practical advice for planning your days and moving between destinations.", to: travelGuidePaths.travelTips, photo: migration["EXISTING:coast"] },
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
    intro: "Walk through ancient quarters, discover the stories behind Jerusalem's holy sites and take in the city from above. A focused city visit leaves more time for its layers; a combined day adds another destination for a fuller itinerary.",
    photo: migration["EXISTING:jerusalem"], match: { destinations: ["jerusalem"] },
    paragraphs: ["Jerusalem rewards time on foot. The Old City's lanes connect major religious landmarks, markets and quieter corners, so the balance between walking and coach sightseeing matters as much as the list of stops. A tour starting in Tel Aviv includes the intercity journey; one meeting in Jerusalem gives you a different starting point for the day.", "For a first visit, a Jerusalem-focused itinerary can be easier to absorb than several cities in a day. Combined Jerusalem and Bethlehem tours suit visitors with limited time who are comfortable with a longer schedule and crossing arrangements. Private guiding offers more individual attention, while a private driver is a separate transport service."],
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
    paragraphs: ["Tel Aviv and Jaffa offer several very different kinds of city tour. A broad walking itinerary connects historic Jaffa with modern neighborhoods and food stops, while a focused street-art walk spends more time on a single creative district. Choose the experience around your interests and the walking time you want.", "Most local walks meet at a fixed point rather than collecting every guest from a hotel. Check the start and finish locations against your other plans, especially for a route that ends in a different neighborhood. Food tastings, architecture commentary and museum admissions are separate inclusions; a city tour title alone does not promise all three."],
    choices: [
      { title: "Old Jaffa & city highlights", text: "A good introduction to the coastal setting and historic neighborhoods, with a longer walk between different areas." },
      { title: "Street art & local stories", text: "A shorter, focused experience around murals and creative streets. Ideal when you already know the city's main landmarks." },
      { title: "Markets & tastings", text: "Combine local history with food. Check the number of tastings and dietary arrangements rather than assuming a full meal." },
    ],
    faqs: [
      { q: "Are these bus tours or walking tours?", a: "The current city experiences below are walking tours. Their cards show the approximate duration and meeting arrangement; hotel pickup is not assumed." },
      { q: "Can I combine Jaffa with Carmel Market?", a: "Yes, the combined walking experience below visits both. It is a longer route than a short Jaffa-only visit, so allow time and wear comfortable shoes." },
      { q: "Are tastings included on every tour?", a: "No. Tastings are included only where the card and booking option say so. A street-art walk is a different experience from a food tour." },
    ], reading: ["jaffa", "telAviv", "food", "tips"],
  },
  {
    id: "masada-dead-sea", title: "Masada & Dead Sea tours", shortTitle: "Masada & the Dead Sea",
    description: "Compare Masada and Dead Sea day trips, including Ein Gedi combinations, departure cities, guiding, duration and admission arrangements.",
    intro: "Stand above the desert at Masada, then unwind beside the Dead Sea. Choose a guided fortress-and-beach day or a longer route with an Ein Gedi stop, balancing memorable scenery with time to enjoy each place.",
    photo: migration["EXISTING:masada"], match: { destinations: ["masada", "dead-sea", "ein-gedi"] },
    paragraphs: ["Masada and the Dead Sea make a natural pairing, but the details change the day considerably. Some tours include a guide at the fortress; others provide shared transportation and a host, leaving site visits independent. Cable-car tickets, park admission and beach facilities may be included or paid separately.", "An Ein Gedi combination adds a nature stop and a longer schedule. The exact walking route depends on current reserve access and conditions. If your priority is a relaxed beach visit, fewer stops may suit you better. For private transport, I can discuss the pickup city, time at each stop and return journey before quoting the day."],
    choices: [
      { title: "Fortress & beach", text: "A classic first visit combining archaeology, dramatic views and time at a designated Dead Sea bathing area." },
      { title: "Add an Ein Gedi stop", text: "More variety and nature in a longer day. Check the available trail and how much time is actually allocated to it." },
      { title: "Guided or independent visits", text: "A guide explains the sites; a host or driver may handle logistics only. Compare the actual inclusions and extra ticket costs." },
    ],
    faqs: [
      { q: "Is the Masada cable car included?", a: "It depends on the product and selected option. Check both the national-park admission and cable-car charge before comparing total costs." },
      { q: "Does every Dead Sea tour visit Ein Gedi?", a: "No. The destination tags show which advertised itineraries include Ein Gedi. The actual route and reserve access still need confirmation for your date." },
      { q: "Can I choose a private driver instead?", a: "Yes. My private day is quoted for your route and party. The quote separates transportation from admissions, meals and any licensed guiding you request." },
    ], reading: ["masada", "deadSea", "einGedi", "tips"],
  },
  {
    id: "bethlehem-jericho", title: "Bethlehem, Jericho & Jordan River tours", shortTitle: "Bethlehem, Jericho & Jordan River",
    description: "Compare Bethlehem tours, Jerusalem–Bethlehem combinations and Jericho and Jordan River day trips, with clear departure cities and travel-planning advice.",
    intro: "Discover Bethlehem's Christian heritage, combine it with Jerusalem or continue towards Jericho and the lower Jordan. Choose the places that matter most to you and a route that gives them the time they deserve.",
    photo: migration["jerusalem-to-bethlehem"], match: { destinations: ["bethlehem", "jericho"] },
    paragraphs: ["These tours follow different routes. A Jerusalem and Bethlehem combination connects two major pilgrimage destinations; a Bethlehem, Jericho and Jordan River itinerary heads towards the desert and lower river instead. Read the actual destination list rather than treating all Bethlehem tours as interchangeable.", "Crossing arrangements and entry requirements depend on the itinerary and traveller. Ask the operator to confirm documents, meeting points, local guide changes and the return arrangement for your date. A river stop does not automatically include a baptism ceremony, and a church visit does not guarantee access to every chapel or grotto."],
    choices: [
      { title: "Jerusalem & Bethlehem", text: "A broad day of religious heritage for visitors who want both cities in one itinerary, with shared and privately guided choices." },
      { title: "Bethlehem, Jericho & the river", text: "A different full-day route combining church heritage, desert surroundings and a lower-Jordan stop." },
      { title: "Departing from Jerusalem", text: "Start locally when staying in Jerusalem. The dedicated departure page brings together the matching options." },
    ],
    faqs: [
      { q: "Where does my Bethlehem tour start?", a: "The cards distinguish Tel Aviv and Jerusalem departures. Select the departure option you actually need on the booking site and confirm the meeting point." },
      { q: "Do I need my passport?", a: "Ask the operator what documents are required for your nationality and itinerary on the travel date. Carry the documents they specify and confirm crossing arrangements before booking." },
      { q: "Which Jordan River site will I visit?", a: "Lower-Jordan itineraries generally differ from Galilee trips visiting Yardenit. Confirm the named site with the operator; do not assume all Jordan River stops are the same." },
    ], reading: ["bethlehem", "jerusalem", "baptism", "tips"],
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
export const toursHubGuides = [reading.jerusalem, reading.masada, reading.jaffa, reading.galilee];
export const toursHubTitle = "Tours & day trips in Israel";
export const toursHubDescription = "Explore Israel tours by destination and interest: Jerusalem, Tel Aviv, Masada, Galilee, food tours and Eilat. Choose my private car-and-driver days or external guided experiences.";
export const toursHubFaqs = [
  { q: "What is the difference between your trips and the other tours?", a: "My private days are car-and-driver services arranged directly with me, with the route and total agreed in a personal quote. The other cards are independently operated experiences booked through GetYourGuide or Viator, with their own guiding, inclusions and terms." },
  { q: "How do I choose the right departure city?", a: "Each tour card identifies where it starts. A destination page can include different departures, so check that the selected option starts where you will be staying." },
  { q: "Are prices and dates confirmed here?", a: "No. External starting prices, where shown, are reference snapshots. Open the booking page for the current price, date, group size and inclusions. I confirm my own private transport quotes directly." },
  { q: "Where are the tours from cruise ports?", a: "Use the separate shore-excursion pages for Haifa and Ashdod. Ordinary city departures do not promise port pickup or a return matched to your ship's schedule." },
];

export const tourPlanningLinks: { label: string; to: LinkProps["to"] }[] = [
  { label: "Day trips from Jerusalem", to: travelGuidePaths.jerusalemDayTrips },
  { label: "Day trips from Tel Aviv", to: travelGuidePaths.telAvivDayTrips },
  { label: "Haifa shore excursions", to: "/haifa-shore-excursions/" },
  { label: "Ashdod shore excursions", to: "/ashdod-shore-excursions/" },
];

/** A departure landing has its own planning copy rather than duplicating the topic page. */
export const bethlehemJerusalemContent = {
  intro: "Staying in Jerusalem? Compare private guiding and shared day trips that start in the city, from a Jerusalem–Bethlehem combination to a longer route through Jericho and the lower Jordan.",
  choices: [
    { title: "Private guiding from Jerusalem", text: "Combine the Old City and Bethlehem with a privately guided day. Confirm your address pickup and the local guide change in Bethlehem." },
    { title: "A shared day beyond the city", text: "Join a Jerusalem departure to Bethlehem, Jericho and the lower Jordan. Allow a full day and check the exact meeting point." },
    { title: "Make the start easy", text: "Choose a departure that fits your Jerusalem accommodation and travel date. Ask for the meeting location and return arrangements in writing." },
  ],
  paragraphs: [
    "Starting in Jerusalem avoids first travelling to a Tel Aviv meeting point, but it does not make every Bethlehem itinerary a short outing. The currently listed options are full-day experiences: one combines Jerusalem and Bethlehem with private guiding, while the other continues to Jericho and the Jordan River area in a shared group.",
    "Compare the start against your hotel address. An offered address pickup and a fixed meeting-point departure are different services; a Jerusalem listing does not automatically include every hotel. Confirm when to arrive, where the tour finishes and whether the return location is convenient for your evening plans.",
    "The operator should confirm the crossing arrangements, documents for your nationality and any local guide or vehicle changes. Mention an essential church visit or river stop before booking, since access and operating arrangements can affect the itinerary. If your available time is shorter than the advertised day, ask about a suitable alternative rather than assuming you can leave a shared tour early.",
  ],
  faqs: [
    { q: "Which of these tours starts in Jerusalem?", a: "Every tour shown in this departure selection advertises Jerusalem as its starting city. The broader Bethlehem category also includes Tel Aviv departures, which are listed separately." },
    { q: "Will the operator collect me from my Jerusalem hotel?", a: "The private itinerary advertises address pickup, subject to confirmation. The shared itinerary has a meeting arrangement to confirm with its operator. Give your exact hotel address rather than assuming pickup is included." },
    { q: "Can I fit these tours into half a day?", a: "The currently listed experiences are advertised as full days. Compare the duration on each card and ask the operator for a shorter option if that is what you need." },
    { q: "Does my driver stay with me across the crossing?", a: "Guide and vehicle arrangements can change between Jerusalem and Bethlehem. Ask the tour operator to confirm who meets you, where any change happens and how the return to Jerusalem works." },
  ],
};
