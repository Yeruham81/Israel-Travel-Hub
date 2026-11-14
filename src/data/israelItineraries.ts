import type { LinkProps } from "@tanstack/react-router";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import type { GetYourGuideWidgetCity } from "@/lib/getyourguide-city-widget";

/**
 * Four separate trip-planning guides adapted from the publisher's legacy guides.
 * These are editorial sample routes, not bookable packages, verified travel times,
 * safe-travel guarantees or promises of attraction availability.
 */
type InternalPath = LinkProps["to"];
export type ItineraryId = "3" | "5" | "7" | "10";
export type ItineraryLink = { label: string; to: InternalPath };
export type ItineraryDay = {
  name: string; region: string; image: keyof typeof migrationPhotos;
  morning: string; afternoon: string; evening: string;
  practical: string; overnight: string; links: ItineraryLink[];
};
export type ItineraryGuide = {
  id: ItineraryId; days: number; path: string; title: string; description: string; intro: string;
  idealFor: string; reality: string; hotelBases: string; noCarAdvice: string;
  route: string[]; map: { center: [number, number]; bounds: [number, number, number, number]; points: { name: string; lat: number; lon: number }[] };
  daysPlan: ItineraryDay[]; alternatives: { title: string; text: string; to?: InternalPath; label?: string }[];
  logistics: { heading: string; text: string; to?: InternalPath; label?: string }[];
  faqs: { q: string; a: string }[];
  /** Optional concise stop order for an explicitly planned route. */
  daySequences?: { day: number; steps: { stop: string; time: string; optional?: boolean }[] }[];
  /** Optional day-specific headings for the brief practical note; avoid repetitive labels. */
  dayTipHeadings?: string[];
  day3Options?: { heading: string; text: string }[];
  /** Day-specific choices for longer itineraries, each replacing that day’s main route as appropriate. */
  dayChoices?: { day: number; options: { heading: string; text: string }[] }[];
  dayOfficialLinks?: { day: number; field: "morning" | "afternoon" | "evening" | "practical" | "overnight"; phrase: string; href: string }[];
  beforeYouGoOfficialLinks?: { index: number; phrase: string; href: string }[];
  hero: keyof typeof migrationPhotos;
  dayInlineLinks?: { day: number; field: "morning" | "afternoon" | "evening" | "practical" | "overnight"; phrase: string; to: InternalPath }[];
  logisticsInlineLinks?: { index: number; phrase: string; to: InternalPath }[];
  reviewedAt?: string;
  overviewRows?: { focus: string; night: string; travel?: string }[];
  beforeYouGo?: { heading: string; text: string; to?: InternalPath; label?: string }[];
  relatedGuides?: { title: string; description: string; to: InternalPath; image: keyof typeof migrationPhotos }[];
  jerusalemTourOptionsDay?: number;
  activityWidgets?: { day: number; city: GetYourGuideWidgetCity }[];
};

const L = (label: string, to: InternalPath): ItineraryLink => ({ label, to });
const jerusalem = L("Jerusalem Old City guide", "/travel-blog/old-city-jerusalem/");
const jerusalemHotels = L("Where to stay in Jerusalem", "/travel-blog/where-to-stay-in-jerusalem/");
const masada = L("Planning a visit to Masada", "/travel-blog/masada/");
const deadSea = L("Dead Sea attractions and practical stops", "/travel-blog/dead-sea-attractions/");
const deadSeaHotels = L("Dead Sea hotel areas", "/travel-blog/best-dead-sea-hotels/");
const telaviv = L("Explore Old Jaffa", "/travel-blog/jaffa/");
const telavivHotels = L("Where to stay in Tel Aviv", "/travel-blog/where-to-stay-in-tel-aviv/");
const caesarea = L("Caesarea, Haifa and Akko tour options", "/tours/caesarea-haifa-acre/");
const haifa = L("Haifa city guide", "/travel-blog/haifa/");
const haifaHotels = L("Where to stay in Haifa", "/travel-blog/best-hotels-in-haifa/");
const nazareth = L("Basilica of the Annunciation", "/travel-blog/basilica-of-the-annunciation/");
const lake = L("Sea of Galilee guide", "/travel-blog/sea-of-galilee/");
const tiberiasHotels = L("Hotels in Tiberias", "/travel-blog/best-hotels-in-tiberias/");
const akko = L("Akko Old City", "/travel-blog/akko-acre/");
const baptism = L("Qasr el-Yahud visit guide", "/travel-blog/qasr-el-yahud/");

const days3: ItineraryDay[] = [
  {
    name: "Jerusalem: one well-planned Old City day", region: "Jerusalem", image: "itinerary-3day-holy-sepulchre",
    morning: "Enter Jerusalem’s Old City through Jaffa Gate. Walk through the Christian Quarter to the Church of the Holy Sepulchre, then continue toward the Jewish Quarter and Western Wall if time and access permit. Give the sites you choose enough time rather than trying to see every quarter.",
    afternoon: "Continue exploring your chosen Old City sites, or make the Israel Museum a separate cross-city alternative. Jerusalem museums deserve time for the exhibitions and the journey, so choose the museum instead of extending the Old City walk indefinitely.",
    evening: "Explore Jaffa Road or eat around Mahane Yehuda. For local shops and market streets, see shopping in Jerusalem; Friday and Saturday opening patterns differ from an ordinary weekday.",
    practical: "Old City streets have steps and uneven surfaces. Check site-specific entry rules and religious-service times; access to the Temple Mount/Haram al-Sharif cannot be assumed.",
    overnight: "Jerusalem, night 1. See where to stay in Jerusalem to choose a convenient base.",
    links: [jerusalem, jerusalemHotels, L("Jerusalem museum choices", "/travel-blog/museums-in-jerusalem/")],
  },
  {
    name: "Masada and floating in the Dead Sea", region: "Judean Desert", image: "EXISTING:masada",
    morning: "Leave Jerusalem early for Masada National Park’s eastern entrance via Road 90. If planning your own transport, review how to get from Jerusalem to the Dead Sea before departure. The eastern side has the cable car and Snake Path; the Roman Ramp uses a separate western approach via Arad. Allow about two to three hours on site, plus driving and queues. Check opening and heat restrictions and reserve your Masada visit on the official park page before setting out.",
    afternoon: "Continue to a designated bathing beach at Ein Bokek. Allow roughly one to two hours for changing, floating and showering, plus the transfer from Masada and the journey back to Jerusalem. The Dead Sea visitor guide explains bathing precautions; see Dead Sea attractions if you want to swap the beach for a different stop.",
    evening: "Head back to Jerusalem after the beach stop. Allow a comfortable margin for the return journey instead of adding another desert attraction late in the day.",
    practical: "Carry water and sun protection, and check the last cable-car ascent and trail restrictions. If you prefer not to drive, compare Masada and Dead Sea day tours that cover both stops. Ein Gedi is an alternative requiring its own opening and trail checks, not an automatic addition.",
    overnight: "Jerusalem, night 2 — same hotel.",
    links: [masada, L("Jerusalem to Dead Sea travel options", "/travel-blog/jerusalem-to-the-dead-sea/"), L("Masada & Dead Sea day tours", "/tours/masada-dead-sea/")],
  },
  {
    name: "Tel Aviv and Old Jaffa on the coast", region: "Tel Aviv–Jaffa", image: "EXISTING:coast",
    morning: "On a normal rail-service day, travel from Jerusalem Yitzhak Navon station to Tel Aviv by train, then take a local bus or short taxi ride to Old Jaffa: the train is not door to door. Check the Israel Railways journey planner for your date; plan a different transfer if no trains run. Walk through Jaffa’s historic hill, lanes and port, with the flea-market district nearby when its shops are open.",
    afternoon: "Continue toward Neve Tzedek and the seafront promenade, or pause at the beaches in Tel Aviv. If art and culture matter more than the coast, choose Tel Aviv museums instead. Carmel Market is another alternative on its operating days; do not squeeze every option into a short afternoon.",
    evening: "Enjoy dinner in Tel Aviv if staying overnight. If departing today, keep the evening free for your airport journey rather than scheduling another attraction.",
    practical: "Before leaving Jerusalem, confirm where you can store and collect your luggage in Tel Aviv, including opening hours and transport from the storage location to the airport. Do not assume every rail station has lockers. Consult Ben Gurion Airport connections before deciding how late to sightsee.",
    overnight: "If extending your trip, compare where to stay in Tel Aviv; otherwise, no additional hotel is needed.",
    links: [telaviv, telavivHotels, L("Tel Aviv and Ben Gurion Airport connection", "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/")],
  },
];

const fiveExtra: ItineraryDay[] = [
  {
    name: "A second Jerusalem day: city sights or one regional choice", region: "Jerusalem", image: "EXISTING:jerusalem",
    morning: "Choose the Israel Museum and a central city walk if you want archaeology and art, or plan a Mount of Olives viewpoint and nearby churches if religious heritage is your priority. Do not assume these are within the same short walking loop.",
    afternoon: "Spend more time at the chosen sites, or arrange a separately planned visit to Bethlehem or Jericho. These are alternatives with different access and operator requirements, not automatic short stops between Jerusalem attractions.",
    evening: "Return to Jerusalem for a second relaxed evening around your hotel district.",
    practical: "A Bethlehem or Jericho excursion should be checked for crossing arrangements, the actual operator, applicable travel advice and the return schedule. Do not assume the same driver can accompany visitors everywhere.",
    overnight: "Jerusalem, keeping the same room if possible.",
    links: [L("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/"), L("Jerusalem to Bethlehem travel choices", "/travel-blog/jerusalem-to-bethlehem/"), L("Mount of Olives", "/travel-blog/mount-of-olives/")],
  },
  {
    name: "Caesarea and Haifa: northbound coastal day", region: "Coast and Haifa", image: "EXISTING:haifa",
    morning: "Visit Caesarea National Park for Roman and Crusader-era remains and the coastal setting. Decide what you want to see there before adding a second city; an unhurried park visit takes longer than a quick photo stop.",
    afternoon: "Continue to Haifa for a German Colony walk and an available Bahá’í Gardens viewpoint. A full terrace tour is different from independently visiting a viewing area and generally requires a reservation.",
    evening: "If returning to Tel Aviv, budget for the southbound journey; consider staying in Haifa only when you are continuing north rather than departing the next morning.",
    practical: "A multi-stop Caesarea–Haifa outing is simplest by organized transport, self-drive or a prearranged driver. Public transport can work for specific segments but needs extra station-to-site transfers.",
    overnight: "Tel Aviv for a central-airport departure; Haifa only if it fits the next leg.",
    links: [caesarea, haifa, haifaHotels],
  },
];

const days5: ItineraryDay[] = [
  { ...days3[0]!,
    name: "Jerusalem's Old City: historic quarters and sacred sites",
    morning: "Enter Jerusalem’s Old City at Jaffa Gate and make your way through the Christian Quarter to the Church of the Holy Sepulchre. Allow time inside the church, especially when services or queues affect access. The Old City guide explains the streets, gates and walking options.",
    afternoon: "Continue toward the Jewish Quarter and Western Wall if time and access allow, then enjoy the lanes and markets at an unhurried pace. The larger museums and Mount of Olives are better suited to your separate Jerusalem day.",
    evening: "Choose dinner near Jaffa Road, Mamilla or Mahane Yehuda. The shopping in Jerusalem guide covers markets and neighbourhoods; opening times vary around Friday, Saturday and holidays.",
    practical: "Expect steps and uneven stone streets around the Old City. Religious sites have different visiting rules, dress expectations and service times; access to the Temple Mount/Haram al-Sharif is especially restricted.",
    overnight: "Jerusalem after Day 1, with the same hotel for the next two sightseeing days. Compare where to stay in Jerusalem for a convenient base.",
    links: [jerusalem, jerusalemHotels, L("Shopping in Jerusalem", "/travel-blog/shopping-in-jerusalem/")],
  },
  { ...days3[1]!,
    name: "Masada and the Dead Sea: desert landscapes",
    morning: "Leave Jerusalem early for the eastern Masada National Park entrance via Road 90, with its cable car and Snake Path. The Roman Ramp is reached by a separate western approach. Plan about two to three hours for the fortress itself, in addition to the journey and queues. Check the official Masada park page for entry times, the last cable car and any heat-related trail closures.",
    afternoon: "Continue to a designated bathing area at Ein Bokek for about one to two hours of changing, floating and showering. The Dead Sea visitor guide covers bathing precautions, while the Dead Sea attractions guide describes other stops. Ein Gedi Nature Reserve works as an alternative outing when relevant trails and access are open.",
    evening: "Return to Jerusalem with time for the drive and a relaxed evening at the same hotel.",
    practical: "Bring drinking water, sun protection and suitable footwear. Masada and Dead Sea day tours, a rental car and a private driver offer different levels of flexibility; for self-drive planning, see how to get from Jerusalem to the Dead Sea.",
    overnight: "Jerusalem after Day 2 — same hotel.",
    links: [masada, deadSea, L("Jerusalem to Dead Sea transport", "/travel-blog/jerusalem-to-the-dead-sea/")],
  },
  { ...fiveExtra[0]!,
    name: "Another side of Jerusalem — or a regional excursion",
    image: "itinerary-5day-mount-of-olives",
    morning: "For a museum-focused day, the Israel Museum rewards a leisurely visit to its archaeology galleries, art collections and Shrine of the Book. A heritage-focused route on the Mount of Olives instead brings together panoramic viewpoints, churches and Gethsemane.",
    afternoon: "Continue exploring your chosen part of Jerusalem, perhaps with a neighbourhood walk, a market or a café. Allow time for the journey between districts rather than filling the afternoon with distant attractions.",
    evening: "Enjoy your final Jerusalem evening around the centre or hotel district, ready for the move to Tel Aviv the following morning.",
    practical: "A Bethlehem visit or an outing to Jericho requires arrangements separate from city sightseeing. Check current travel advice, eligibility to enter the planned areas, the operator’s itinerary and the return journey.",
    overnight: "Jerusalem after Day 3 — the last planned night in the city.",
    links: [L("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/"), L("Mount of Olives", "/travel-blog/mount-of-olives/"), L("Jerusalem to Bethlehem", "/travel-blog/jerusalem-to-bethlehem/")],
  },
  { ...days3[2]!,
    name: "Tel Aviv–Jaffa: old port, neighbourhoods and sea",
    morning: "Travel from Jerusalem to Tel Aviv by train when services are running; the Israel Railways journey planner helps with the actual departure day. Allow an onward bus or taxi ride from the station to Old Jaffa, then explore its historic hill, port and nearby flea-market streets.",
    afternoon: "Walk toward Neve Tzedek and the seafront promenade, stopping at one of the beaches in Tel Aviv if the weather suits. Carmel Market or one of the Tel Aviv museums makes a good alternative for visitors more interested in food, art or local culture.",
    evening: "Spend the evening along the promenade or in a neighbourhood restaurant after checking into your Tel Aviv hotel.",
    practical: "Tel Aviv's railway stations are not in Old Jaffa or on the beach. Plan the final local connection with your luggage in mind, and check how to get around Tel Aviv when choosing a hotel area.",
    overnight: "Tel Aviv after Day 4. Compare where to stay in Tel Aviv before booking.",
    links: [telaviv, telavivHotels, L("Tel Aviv transport", "/travel-blog/getting-around-tel-aviv/")],
  },
  { ...fiveExtra[1]!,
    name: "Caesarea and Haifa: archaeology and coastal views",
    image: "itinerary-5day-caesarea",
    morning: "Head north from Tel Aviv for Caesarea National Park. Allow about two to three hours for the Roman theatre, harbour remains and Crusader-era setting, plus transport. The official Caesarea park page lists opening hours and the last admission time.",
    afternoon: "Continue to Haifa for the German Colony and its view towards the lower Bahá’í Gardens terraces. For a higher panorama, choose the upper viewing area on Yefe Nof Street instead, allowing for the extra uphill journey. Guided terrace tours have separate access and usually require advance booking; check the official Bahá’í Gardens visitor information.",
    evening: "Head back towards Tel Aviv for dinner or onward travel, leaving a comfortable margin for the southbound journey after a full coastal day.",
    practical: "Caesarea's national park and Haifa's hillside sights are not next to railway stations. A guided coastal excursion, rental car or private driver can connect both; on public transport, compare a simpler single-stop day. See Caesarea and Haifa day tour options.",
    overnight: "No additional hotel for a Day 5 departure; otherwise stay another night in Tel Aviv. Haifa is an overnight option mainly for travellers continuing north.",
    links: [caesarea, haifa, L("Haifa accommodation", "/travel-blog/best-hotels-in-haifa/")],
  },
];

const days7: ItineraryDay[] = [
  { ...days5[0]!,
    name: "Jerusalem's Old City: historic quarters and sacred sites",
    afternoon: "Continue through the Jewish Quarter towards the Western Wall if time and access permit, then wander the markets or a favourite section of the Old City. With a full second Jerusalem day ahead, there is no need to add the museums or cross-city viewpoints today.",
    practical: "The Old City has steps, uneven stone streets and differing religious-site opening arrangements. Check which gate gives practical vehicle access if your accommodation is inside the walls, especially with luggage.",
    overnight: "Jerusalem after Day 1. Keep the same room for the following two nights.",
    links: [jerusalem, jerusalemHotels, L("Jerusalem shopping and markets", "/travel-blog/shopping-in-jerusalem/")],
  },
  { ...days5[2]!,
    name: "Discover more of Jerusalem, or choose a regional excursion",
    morning: "For a city-based day, explore the Israel Museum at a relaxed pace or visit the Mount of Olives viewpoints and Gethsemane. These are separate experiences in different parts of Jerusalem, not one continuous walking route.",
    afternoon: "Leave room for a neighbourhood walk, a market or a quiet café after your chosen city visit. A Bethlehem or Jericho excursion takes the place of the Jerusalem programme rather than fitting between museum stops.",
    evening: "Enjoy another evening in Jerusalem without packing for a hotel change; the desert outing starts early tomorrow.",
    practical: "A Bethlehem or Jericho day trip needs separate route and crossing arrangements. Check current travel advice, entry eligibility, the tour operator's actual itinerary and return travel.",
    overnight: "Jerusalem after Day 2 — same hotel.",
    links: [L("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/"), L("Mount of Olives", "/travel-blog/mount-of-olives/"), L("Jerusalem to Bethlehem travel options", "/travel-blog/jerusalem-to-bethlehem/")],
  },
  { ...days5[1]!,
    name: "Masada and the Dead Sea: a full desert day",
    morning: "Leave Jerusalem early for the eastern entrance of Masada National Park via Road 90, where the cable car and Snake Path start. The Roman Ramp uses a different western approach near Arad. The official Masada visitor page explains park entry, the last cable car and heat-related trail restrictions; check these before setting out, and allow time for queues.",
    afternoon: "Continue to a designated bathing beach at Ein Bokek, accounting for the transfer, changing facilities and showers as well as time in the water. The Dead Sea visitor guide covers bathing precautions. Ein Gedi is an alternative nature outing, not an automatic third stop.",
    evening: "Return to Jerusalem and enjoy a restful evening before the longer northbound journey tomorrow.",
    practical: "Carry drinking water and sun protection and confirm current Masada operating conditions. Compare Masada and Dead Sea tours, a rental car or a private driver; the Jerusalem to Dead Sea guide covers self-directed travel options.",
    overnight: "Jerusalem after Day 3 — the final planned night before moving north.",
    links: [masada, deadSea, L("Jerusalem to Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/")],
  },
  {
    name: "Nazareth and the Sea of Galilee: journey north", region: "Lower Galilee", image: "basilica-of-the-annunciation",
    morning: "Travel north from Jerusalem to Nazareth, then visit the Basilica of the Annunciation and a manageable section of the old town. Check the Franciscan sanctuary information for visiting arrangements and religious services, and allow time to reach the site from your arrival point before continuing towards the lake.",
    afternoon: "Continue towards the Sea of Galilee. If your arrival time permits, stop at Magdala for its archaeological remains, or enjoy a shorter lakeside visit before checking in. The official Magdala visitor information is useful when planning an afternoon arrival.",
    evening: "Settle into your hotel in Tiberias or another convenient Galilee base, with dinner nearby and no need to return to Jerusalem.",
    practical: "This is a hotel-transfer day as well as a sightseeing day. A self-drive route or private driver can connect Nazareth and a lakeside stop directly; public transport may mean changing services and arranging a separate local transfer, especially with luggage.",
    overnight: "Tiberias or the Galilee after Day 4 — the first of two nights in the north.",
    links: [nazareth, L("Magdala travel guide", "/travel-blog/magdala/"), tiberiasHotels],
  },
  {
    name: "Sea of Galilee: heritage sites or a nature-focused day", region: "Sea of Galilee", image: "itinerary-7day-capernaum",
    morning: "Visit Capernaum and, if it suits your interests, the Mount of Beatitudes. The lakeside heritage sites and their entrances are spread out, so allow for short drives and different visitor arrangements. The official Kfar Nahum National Park page covers one of the visitor areas at Capernaum.",
    afternoon: "Choose Tabgha and its lakeside churches, Magdala's archaeology or a quieter pause beside the Sea of Galilee. Two or three well-chosen visits leave more room for the setting than a rush through every stop.",
    evening: "Return to the same Galilee accommodation and enjoy the lakeside atmosphere or dinner in Tiberias.",
    practical: "A car, prearranged driver or suitable guided tour simplifies the separate lakeside stops. For a nature-focused alternative, replace the heritage route with a specific, currently accessible trail; do not assume sites near border areas are suitable without checking official advice.",
    overnight: "Tiberias or the Galilee after Day 5 — second night at the same base.",
    links: [L("Capernaum", "/travel-blog/capernaum/"), L("Tabgha", "/travel-blog/tabgha/"), lake],
  },
  {
    name: "Haifa and Caesarea: coastal stops on the way south", region: "Haifa and coast", image: "EXISTING:haifa",
    morning: "Leave your Galilee hotel for Haifa. The German Colony gives a view towards the lower Bahá’í Gardens; for a higher panorama, choose the separate upper viewpoint at 61 Yefe Nof Street with time for the uphill transfer. Guided terrace tours require advance arrangements. Check the official Bahá’í Gardens visitor information for access and closures.",
    afternoon: "Travel onwards to Caesarea National Park for the Roman theatre, historic harbour and archaeological remains. The park is not beside an intercity railway station, so plan your final local connection and check the official Caesarea park page for closing and last-entry times before leaving Haifa.",
    evening: "Continue south to Tel Aviv, check into your hotel and keep the evening light after a day of intercity travel and visits.",
    practical: "This is a transfer day with luggage. A guided coastal excursion, rental car or private driver makes a two-stop Haifa–Caesarea route easier. On rail and buses, Haifa or Caesarea alone may be more relaxing because both include extra station-to-attraction connections.",
    overnight: "Tel Aviv after Day 6 — the planned final hotel base.",
    links: [haifa, caesarea, telavivHotels],
  },
  { ...days5[3]!,
    name: "Tel Aviv–Jaffa: Mediterranean neighbourhoods and departure",
    morning: "If you have a full sightseeing day, explore Old Jaffa's historic hill, port and flea-market streets at an unhurried pace. For a morning or midday flight, skip sightseeing and head to the airport instead. The Old Jaffa guide has more walking-route ideas for travellers with time.",
    afternoon: "With enough time before a late flight, or if flying on Day 8, continue towards Neve Tzedek and the seafront promenade. Choose a Tel Aviv beach, Carmel Market or a museum only after checking your airport transfer timing; keep any Day 7 departure sightseeing short.",
    evening: "Enjoy a final Tel Aviv dinner if flying tomorrow. If departing on Day 7, keep the evening free for the airport journey, security and check-in rather than assuming there is time for another activity.",
    practical: "Work backwards from your flight's check-in time when planning how to reach Ben Gurion Airport from your actual hotel or sightseeing stop. Morning and midday departures usually make Day 7 a travel day, not a full sightseeing day. Tel Aviv's railway stations are not on the beach or in Old Jaffa, and regular public transport is limited on Shabbat; allow a generous airport margin.",
    overnight: "Depart on Day 7, or add a Tel Aviv night after Day 7 if flying the following day.",
    links: [telaviv, telavivHotels, L("Airport transfers", "/airport-transfers/")],
  },
];

const days10: ItineraryDay[] = [
  {
    ...days3[0]!,
    morning: "Use the first Jerusalem morning to settle into the Old City's geography. Choose the Jewish Quarter and Western Wall route or a Christian Quarter circuit, with an informed route between them if time permits.",
    afternoon: "Continue exploring one Old City quarter or visit the Tower of David area. Keep the Israel Museum for tomorrow instead of rushing across Jerusalem.",
    evening: "Stay close to your hotel district for your first Jerusalem evening, especially after a flight or long journey.",
    practical: "A ten-day itinerary can afford a focused visit. The Old City's gates have different luggage and walking access; check the hotel's recommended approach before arrival.",
    overnight: "Jerusalem, first of three nights.",
  },
  { ...fiveExtra[0]!,
    morning: "Give the Israel Museum or another major indoor Jerusalem attraction several hours. It makes more sense to do this as a distinct second day than as a quick add-on to a crowded Old City morning.",
    afternoon: "Add a viewpoint or an additional Jerusalem neighborhood. A religious-historical visit beyond Jerusalem may replace the city program only with proper travel and access planning.",
    evening: "Spend time in the city center or around Mahane Yehuda, with the market's weekly opening pattern in mind.",
    practical: "A long-stay itinerary does not require a different excursion each day. Reserve time for a museum, a neighborhood and a meal without fixed long-distance transfers.",
  },
  {
    ...days3[1]!,
    morning: "Travel from Jerusalem to Masada with the planned opening hours in hand. Keep the fortress itself as the main morning activity rather than scheduling another major desert hike.",
    afternoon: "Spend the afternoon by a managed Dead Sea bathing area near Ein Bokek. Treat visits to an inland reserve or spa facility as separate alternatives.",
    evening: "Return to Jerusalem for the final night before changing regions. A resort overnight is a separate choice with a different hotel-transfer plan.",
    practical: "The Dead Sea resort district, Masada park and Ein Gedi reserve are separate access points. Water and weather conditions, site availability and return travel determine what fits.",
    overnight: "Jerusalem, third night.",
  },
  {
    ...days7[3]!,
    morning: "Use the move north to explore Nazareth's key heritage sights, including the Basilica of the Annunciation if open. Keep the first day to a few stops rather than trying to reach every lakeside village.",
    afternoon: "Continue toward Tiberias, with a stop near the western shore if your arrival timing allows. A second and third northern day are already reserved for the wider region.",
    evening: "Check into a Galilee hotel with a realistic plan for dinner and parking or a final taxi ride.",
    practical: "A Galilee overnight is more than a hotel choice: it prevents repeated Jerusalem-to-north driving and creates room for changing weather and attraction hours.",
    overnight: "Tiberias or the Galilee, first of three northern nights.",
  },
  {
    ...days7[4]!,
    morning: "Choose two meaningful stops around the northern Sea of Galilee, such as Capernaum and the Mount of Beatitudes. Allow time for different entry and walking arrangements.",
    afternoon: "Choose either Tabgha and Magdala or a longer relaxed stop by the lake. A northern nature excursion is a substitute for these sites, not another quick add-on.",
    evening: "Return to the same lakeside hotel and enjoy an unhurried dinner rather than an extra late transfer to another city.",
    practical: "Separate the interests of the group: archaeology, churches, viewpoints or relaxation. A single day need not cover all of them when the north receives three nights.",
    overnight: "The same northern base.",
  },
  {
    name: "A northern nature or heritage day without hotel changes", region: "Galilee and northern Israel", image: "EXISTING:galilee",
    morning: "Use the extra day to explore a selected part of northern Israel: a nature reserve where trails are open, another Galilee heritage site, or a quieter lakeside morning. The itinerary does not depend on a trip to the Golan Heights.",
    afternoon: "Continue your chosen theme rather than treating distant northern locations as neighboring stops. Verify any nature trail's status, weather risks and permitted access shortly before departure.",
    evening: "Return to the same northern hotel. Packing every morning defeats one of the main benefits of a ten-day journey.",
    practical: "Road restrictions, protected-area access and travel advisories can change. Choose an alternative in the same region if an intended site is not available; do not substitute a border-area drive without checking current official guidance.",
    overnight: "Tiberias or Galilee, third night.",
    links: [lake, L("Mount Tabor", "/travel-blog/mount-tabor/"), L("Travel-planning advice", "/travel-blog/israel-travel-tips/")],
  },
  {
    name: "Akko: historic harbor and old city lanes", region: "Akko and northern coast", image: "EXISTING:haifa",
    morning: "Leave your Galilee base and explore the old city of Akko, including its harbor, market streets and selected historic sites. Choose sites based on operating hours rather than assuming every underground attraction is open.",
    afternoon: "Continue south via the coast. Rosh Hanikra may appear on older itineraries, but site access needs independent verification; it is an optional extension, not a necessary stop.",
    evening: "Stay in Haifa or continue to Tel Aviv depending on the next day's plan. Keeping this as a transfer day avoids another north–south round trip.",
    practical: "If you want a second northern coastal stop, allow time for the detour and do not add it without checking the entry situation and your remaining daylight.",
    overnight: "Haifa for an easier city morning, or Tel Aviv for fewer hotel changes.",
    links: [akko, L("Rosh Hanikra: access and visitor information", "/travel-blog/rosh-hanikra/"), haifaHotels],
  },
  {
    name: "Haifa's viewpoints and Caesarea's Roman coast", region: "Haifa–Caesarea", image: "EXISTING:haifa",
    morning: "Visit the Haifa Bahá’í Gardens area using an available viewpoint, or choose a city museum if a timed garden tour is not available. Check which entry point matches the type of visit you want.",
    afternoon: "Travel toward Caesarea for archaeology and the Mediterranean. If the park closes earlier than expected, reorder the visits or concentrate on one major destination.",
    evening: "Check in around central Tel Aviv. A night near your final sightseeing area makes the remaining days easier to manage.",
    practical: "Caesarea's park entrances, the aqueduct beach and Haifa's hillside attractions are distinct stops. A map may show short distances while local transfers add significant time.",
    overnight: "Tel Aviv for the final two nights.",
    links: [haifa, caesarea, telavivHotels],
  },
  {
    name: "Old Jaffa, neighborhoods and the waterfront", region: "Tel Aviv–Jaffa", image: "EXISTING:coast",
    morning: "Explore Jaffa's historic hill, port and flea market at a relaxed pace. Visit Neve Tzedek if you prefer another historic district with cafés and a different architectural character.",
    afternoon: "Move toward Rothschild Boulevard or Carmel Market, or choose the beach instead. With ten days available, there is no need to complete three separate walking districts in one afternoon.",
    evening: "Stay in Tel Aviv for restaurants and the coast. Put the late-night return transport back to your hotel into the plan if you are not staying centrally.",
    practical: "A Jaffa hotel, beachfront hotel and Rothschild hotel offer different night-time and vehicle-access experiences; choose your location by your actual evening plans.",
    overnight: "Tel Aviv, second night.",
    links: [telaviv, telavivHotels, L("Tel Aviv beaches", "/travel-blog/beaches-in-tel-aviv/")],
  },
  {
    name: "A flexible final day and a realistic airport departure", region: "Tel Aviv / Ben Gurion Airport", image: "EXISTING:coast",
    morning: "If your flight schedule permits, visit a Tel Aviv museum, spend time along the promenade or do some final shopping. This is deliberately a low-pressure day rather than a long-distance excursion.",
    afternoon: "Collect bags, reach the airport by an operating train, authorized taxi or confirmed private ride, and allow the airport-recommended check-in margin for your flight.",
    evening: "Depart if flying out, or use the extra evening for a final city meal if staying another night.",
    practical: "Do not plan Timna Park in Eilat and an international departure from Ben Gurion Airport on the same day. A southern version of this itinerary should reallocate several earlier days and hotel nights.",
    overnight: "Departure day; no new hotel required unless your flight timing calls for another night.",
    links: [L("How to reach Ben Gurion Airport from Tel Aviv", "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/"), L("Arrival and departure practicalities", "/travel-blog/ben-gurion-airport-arrival-tips/")],
  },
];

export const itineraries: Record<ItineraryId, ItineraryGuide> = {
  "3": {
    id: "3", days: 3, path: "/travel-blog/israel-itinerary-3-days/",
    title: "Israel in 3 Days: A Realistic First-Time Itinerary",
    description: "Plan three days in Israel with Jerusalem, Masada, the Dead Sea and Tel Aviv–Jaffa. A practical itinerary with hotel bases, transport tips and day-by-day highlights.",
    intro: "Use three full sightseeing days for Jerusalem’s Old City, Masada and the Dead Sea, then Tel Aviv–Jaffa. Explore suggested highlights, choose how to get around and plan the final day around your flight.",
    idealFor: "First-time visitors with three usable days, comfortable with one full excursion day",
    reality: "This route requires three usable sightseeing days, ideally with arrival before Day 1. If your flights take away a day, choose fewer stops or a shorter route.",
    hotelBases: "Jerusalem on nights 1 and 2. A Tel Aviv night after Day 3 makes sense only for a later departure. Count arrival and departure nights separately according to your flights.",
    noCarAdvice: "This route can suit different budgets, group sizes and travel styles. Jerusalem and Tel Aviv lend themselves to exploring on foot and by public transport, while the Masada–Dead Sea day can be a self-drive outing, an organized tour or a journey with a private driver.",
    route: ["Jerusalem", "Masada & Dead Sea", "Tel Aviv–Jaffa"],
    map: { center: [31.55, 35.04], bounds: [34.57, 30.97, 35.69, 32.37], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Ein Bokek", lat: 31.2, lon: 35.36 }, { name: "Tel Aviv–Jaffa", lat: 32.065, lon: 34.76 }] },
    daysPlan: days3,
    dayTipHeadings: [
      "Old City access and walking",
      "Desert-day essentials",
      "A smoother airport connection",
    ],
    activityWidgets: [
      { day: 1, city: "jerusalem" },
      { day: 3, city: "telAviv" },
    ],
    jerusalemTourOptionsDay: 2,
    dayInlineLinks: [
      { day: 1, field: "morning", phrase: "Old City", to: "/travel-blog/old-city-jerusalem/" },
      { day: 1, field: "afternoon", phrase: "Jerusalem museums", to: "/travel-blog/museums-in-jerusalem/" },
      { day: 1, field: "evening", phrase: "shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/" },
      { day: 1, field: "overnight", phrase: "where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Masada National Park", to: "/travel-blog/masada/" },
      { day: 2, field: "morning", phrase: "how to get from Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { day: 2, field: "afternoon", phrase: "Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/" },
      { day: 2, field: "afternoon", phrase: "Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/" },
      { day: 2, field: "practical", phrase: "Masada and Dead Sea day tours", to: "/tours/masada-dead-sea/" },
      { day: 2, field: "practical", phrase: "Ein Gedi", to: "/travel-blog/ein-gedi/" },
      { day: 3, field: "morning", phrase: "Old Jaffa", to: "/travel-blog/jaffa/" },
      { day: 3, field: "afternoon", phrase: "beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/" },
      { day: 3, field: "afternoon", phrase: "Tel Aviv museums", to: "/travel-blog/museums-in-tel-aviv/" },
      { day: 3, field: "practical", phrase: "Ben Gurion Airport connections", to: "/airport-transfers/" },
      { day: 3, field: "overnight", phrase: "where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
    ],
    logisticsInlineLinks: [
      { index: 0, phrase: "Jerusalem accommodation", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { index: 1, phrase: "Masada and Dead Sea excursions", to: "/tours/masada-dead-sea/" },
      { index: 2, phrase: "rental cars in Israel", to: "/car-rental/" },
      { index: 3, phrase: "Israel transport options", to: "/travel-blog/getting-around-israel/" },
    ],
    reviewedAt: "2026-11-13",
    overviewRows: [
      { focus: "Jerusalem Old City", travel: "Walk / short local ride", night: "Jerusalem · night 1" },
      { focus: "Masada and Ein Bokek", travel: "Tour / car / driver", night: "Jerusalem · night 2" },
      { focus: "Old Jaffa and Tel Aviv", travel: "Train when running + local ride", night: "Airport / optional Tel Aviv stay" },
    ],
    daySequences: [
      { day: 1, steps: [
        { stop: "Jaffa Gate, Christian Quarter & Holy Sepulchre", time: "About 2–3 hrs" },
        { stop: "Jewish Quarter & Western Wall", time: "Allow 1–2 hrs if time and access permit", optional: true },
        { stop: "Israel Museum instead of additional Old City sites", time: "About 2–3 hrs, plus travel across the city", optional: true },
      ] },
      { day: 2, steps: [
        { stop: "Masada plateau and archaeological remains", time: "About 2–3 hrs on site" },
        { stop: "Floating at a designated Ein Bokek beach", time: "About 1–2 hrs, plus travel" },
        { stop: "Ein Gedi Nature Reserve instead of the beach", time: "Optional; confirm open trails, access and journey times", optional: true },
      ] },
      { day: 3, steps: [
        { stop: "Old Jaffa historic lanes and port", time: "About 1½–2 hrs" },
        { stop: "Neve Tzedek and the seafront", time: "About 1–2 hrs" },
        { stop: "Carmel Market or a Tel Aviv museum instead of extra beach time", time: "Optional; check opening days and transfer times", optional: true },
      ] },
    ],
    day3Options: [
      { heading: "Flying home on Day 3?", text: "Shorten the sightseeing route and confirm a luggage-storage solution before leaving Jerusalem. Leave time for the airport journey, your airline’s check-in and security procedures; avoid last-minute sightseeing." },
      { heading: "Staying another night?", text: "Take your time in Jaffa or at the beach, enjoy dinner and check into Tel Aviv accommodation. Your airport transfer can happen the following day." },
    ],
    dayOfficialLinks: [
      { day: 2, field: "morning", phrase: "official park page", href: "https://en.parks.org.il/reserve-park/masada-national-park/" },
      { day: 3, field: "morning", phrase: "Israel Railways journey planner", href: "https://www.rail.co.il/" },
    ],
    beforeYouGoOfficialLinks: [
      { index: 0, phrase: "official Israel entry portal", href: "https://israel-entry.piba.gov.il/" },
    ],
    beforeYouGo: [
      { heading: "Check entry requirements", text: "Check visa or ETA-IL requirements for your passport on the official Israel entry portal, and review current travel advice before non-refundable bookings. See my Israel travel essentials guide for other preparations.", to: "/travel-blog/israel-travel-tips/", label: "Israel travel essentials guide" },
      { heading: "Plan around Shabbat and holidays", text: "Trains and many buses stop for much of Shabbat, with dates and service times varying by route. Consult the Transport guide and check the actual timetable.", to: "/travel-blog/getting-around-israel/", label: "Transport guide" },
      { heading: "Confirm your desert stops", text: "Check Masada opening hours, any trail heat restrictions and the availability of a designated Dead Sea bathing beach. Bring water and sun protection, and consult my Masada planning guide.", to: "/travel-blog/masada/", label: "Masada planning guide" },
    ],
    relatedGuides: [
      { title: "Jerusalem Old City", description: "Choose a practical walking route through the historic quarters.", to: "/travel-blog/old-city-jerusalem/", image: "itinerary-jerusalem-old-city" },
      { title: "Visiting Masada", description: "Entrances, cable car, hiking and visiting conditions.", to: "/travel-blog/masada/", image: "itinerary-masada-car" },
      { title: "Dead Sea attractions", description: "Where to stop, float and plan a desert outing.", to: "/travel-blog/dead-sea-attractions/", image: "itinerary-dead-sea-shore" },
      { title: "Old Jaffa", description: "Historic lanes, port views and neighborhood walks.", to: "/travel-blog/jaffa/", image: "itinerary-jaffa-streets" },
      { title: "Getting around Israel", description: "Compare rail, buses, taxis and longer day trips.", to: "/travel-blog/getting-around-israel/", image: "itinerary-train" },
      { title: "Ben Gurion Airport tips", description: "Arrival, luggage and planning a departure connection.", to: "/travel-blog/ben-gurion-airport-arrival-tips/", image: "itinerary-airport" },
    ],
    alternatives: [],
    logistics: [
      { heading: "Choose your hotel bases", text: "Pick a Jerusalem location that also works for the early desert departure. Compare Jerusalem accommodation before booking.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Compare Jerusalem hotel areas" },
      { heading: "Book the desert day sensibly", text: "Compare Masada and Dead Sea excursions with a self-drive plan or agreed private ride. For a tour, check whether pickup, site admission and time at Ein Bokek are included.", to: "/tours/masada-dead-sea/", label: "Explore Masada & Dead Sea tours" },
      { heading: "Consider rental cars only where useful", text: "For the desert day, compare rental cars in Israel if you prefer independent stops. Check pickup hours, parking and permitted driving areas before booking.", to: "/car-rental/", label: "Compare Israel car rentals" },
      { heading: "Connect cities and the airport", text: "Allow for the connections between train stations, neighborhoods and the airport rather than comparing only intercity travel times. See Israel transport options for date-specific planning.", to: "/travel-blog/getting-around-israel/", label: "Compare transport options" },
    ],
    faqs: [
      { q: "Is three days enough to visit Israel?", a: "Three full sightseeing days are enough for a focused first visit to Jerusalem, a desert excursion and Tel Aviv–Jaffa. They are not enough to see every region; arrival and departure hours can reduce the usable time." },
      { q: "Can I visit Masada and the Dead Sea in one day from Jerusalem?", a: "Yes, with an early departure, the eastern Masada entrance, a planned bathing stop near Ein Bokek and a workable return. An organized tour or car is usually simpler for this combination than relying on unverified bus connections." },
      { q: "Can I follow this itinerary without a rental car?", a: "Yes for the city days. For the Masada–Dead Sea day, compare a scheduled guided excursion or arranged private ride; public transport requires checking exact date-specific services and onward connections." },
      { q: "Where should I stay during this three-day trip?", a: "Two nights in Jerusalem minimize hotel changes. Add Tel Aviv only if staying beyond Day 3." },
      { q: "What changes if my three days include Friday or Saturday?", a: "Check the route's train and bus schedules, as regular services often stop for much of Shabbat. Markets, restaurants, religious sites and tours also follow different schedules. Adjust the order or choose a confirmed transport option." },
      { q: "Should I start in Tel Aviv instead of Jerusalem?", a: "You can reverse the route to suit your arrival or departure, but keep the desert excursion next to your Jerusalem stay and avoid planning a long drive plus a flight on the same day." },
    ],
    hero: "itinerary-3day-jerusalem-cover",
  },
  "5": {
    id: "5", days: 5, path: "/travel-blog/israel-itinerary-5-days/",
    title: "Israel in 5 Days: Jerusalem, Dead Sea, Tel Aviv & Haifa",
    description: "Explore Israel in five days: Jerusalem, Masada, the Dead Sea, Tel Aviv–Jaffa, Caesarea and Haifa, with practical transport choices, hotel bases and day-by-day highlights.",
    intro: "With five full days in Israel, this route brings together Jerusalem’s historic quarters, Masada and the Dead Sea, Tel Aviv–Jaffa and the northern coast. A second Jerusalem day and a choice of excursions offer room for different interests and travel styles.",
    idealFor: "First-time visitors who enjoy historic sites, the desert and Mediterranean cities",
    reality: "This itinerary works best with five usable sightseeing days and arrival before Day 1. The desert outing and the Caesarea–Haifa journey each deserve their own full day; an evening flight on Day 5 calls for a shorter coastal programme.",
    hotelBases: "Stay in Jerusalem after Days 1–3 and in Tel Aviv after Day 4. Arriving the evening before Day 1 adds an arrival night in Jerusalem; flying the day after Day 5 adds another Tel Aviv night.",
    noCarAdvice: "The route can be tailored to different budgets, group sizes and preferred travel styles. Jerusalem and Tel Aviv are comfortable to explore on foot and by public transport, while the desert and northern-coast days can be organized tours, self-drive outings or trips with a private driver.",
    route: ["Jerusalem Old City", "Masada & Dead Sea", "Jerusalem or regional excursion", "Tel Aviv–Jaffa", "Caesarea & Haifa"],
    map: { center: [31.78, 35.05], bounds: [34.57, 30.97, 35.69, 33.08], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Tel Aviv–Jaffa", lat: 32.065, lon: 34.76 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Haifa", lat: 32.8, lon: 34.99 }] },
    daysPlan: days5,
    reviewedAt: "2026-11-14",
    overviewRows: [
      { focus: "Old City of Jerusalem", travel: "Walk / short local ride", night: "Jerusalem · after Day 1" },
      { focus: "Masada & Ein Bokek", travel: "Tour / car / private driver", night: "Jerusalem · after Day 2" },
      { focus: "Jerusalem or Bethlehem / Jericho excursion", travel: "Walk / local ride or organized tour", night: "Jerusalem · after Day 3" },
      { focus: "Old Jaffa & Tel Aviv", travel: "Train when running + local ride", night: "Tel Aviv · after Day 4" },
      { focus: "Caesarea & Haifa", travel: "Tour / car / driver; extra transit changes", night: "Departure / optional Tel Aviv night" },
    ],
    daySequences: [
      { day: 1, steps: [
        { stop: "Jaffa Gate, Christian Quarter & Holy Sepulchre", time: "About 2–3 hrs" },
        { stop: "Jewish Quarter & Western Wall", time: "Allow 1–2 hrs, depending on access", optional: true },
        { stop: "Old City markets and historic streets", time: "Around 45–90 mins" },
      ] },
      { day: 2, steps: [
        { stop: "Masada plateau and archaeological remains", time: "About 2–3 hrs on site" },
        { stop: "Designated Ein Bokek bathing beach", time: "About 1–2 hrs, plus travel" },
        { stop: "Ein Gedi Nature Reserve instead of the beach", time: "Optional; confirm open trails and travel time", optional: true },
      ] },
      { day: 3, steps: [
        { stop: "Israel Museum for art and archaeology", time: "About 2–3 hrs" },
        { stop: "Mount of Olives viewpoints & Gethsemane instead", time: "Around 2–3 hrs; separate city route", optional: true },
        { stop: "Bethlehem or Jericho as a regional excursion", time: "Separate half-day or longer itinerary", optional: true },
      ] },
      { day: 4, steps: [
        { stop: "Old Jaffa's lanes, port and nearby flea market", time: "About 1½–2 hrs" },
        { stop: "Neve Tzedek and the seafront promenade", time: "Around 1–2 hrs" },
        { stop: "Carmel Market or a Tel Aviv museum", time: "Optional; check opening days and times", optional: true },
      ] },
      { day: 5, steps: [
        { stop: "Caesarea National Park", time: "About 2–3 hrs, plus travel" },
        { stop: "Haifa's German Colony & lower gardens viewpoint", time: "Around 45–75 mins" },
        { stop: "Upper Bahá’í Gardens panorama instead", time: "Optional; allow extra travel uphill", optional: true },
      ] },
    ],
    dayTipHeadings: [
      "Old City access and walking",
      "Desert-day essentials",
      "Choosing your Jerusalem experience",
      "Getting around Tel Aviv and Jaffa",
      "Making the most of the coastal day",
    ],
    dayChoices: [
      { day: 3, options: [
        { heading: "Stay in Jerusalem", text: "A museum-focused day or a heritage walk on the Mount of Olives leaves space to enjoy the city at your own pace." },
        { heading: "Take a regional day trip", text: "Choose a dedicated tour to Bethlehem or the Jericho–Jordan Valley area, with a separate route and travel arrangements." },
      ] },
      { day: 5, options: [
        { heading: "A full coastal day", text: "Explore Caesarea and Haifa, with time for the journey between them and the return south." },
        { heading: "Flying home on Day 5?", text: "Caesarea alone or a final few hours in Tel Aviv leaves more time for Ben Gurion Airport, check-in and security." },
      ] },
    ],
    dayInlineLinks: [
      { day: 1, field: "morning", phrase: "Old City guide", to: "/travel-blog/old-city-jerusalem/" },
      { day: 1, field: "evening", phrase: "shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/" },
      { day: 1, field: "overnight", phrase: "where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Masada National Park", to: "/travel-blog/masada/" },
      { day: 2, field: "afternoon", phrase: "Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/" },
      { day: 2, field: "afternoon", phrase: "Dead Sea attractions guide", to: "/travel-blog/dead-sea-attractions/" },
      { day: 2, field: "afternoon", phrase: "Ein Gedi Nature Reserve", to: "/travel-blog/ein-gedi/" },
      { day: 2, field: "practical", phrase: "Masada and Dead Sea day tours", to: "/tours/masada-dead-sea/" },
      { day: 2, field: "practical", phrase: "how to get from Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { day: 3, field: "morning", phrase: "Israel Museum", to: "/travel-blog/museums-in-jerusalem/" },
      { day: 3, field: "morning", phrase: "Mount of Olives", to: "/travel-blog/mount-of-olives/" },
      { day: 3, field: "practical", phrase: "Bethlehem visit", to: "/travel-blog/jerusalem-to-bethlehem/" },
      { day: 4, field: "morning", phrase: "Old Jaffa", to: "/travel-blog/jaffa/" },
      { day: 4, field: "afternoon", phrase: "beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/" },
      { day: 4, field: "afternoon", phrase: "Tel Aviv museums", to: "/travel-blog/museums-in-tel-aviv/" },
      { day: 4, field: "practical", phrase: "how to get around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" },
      { day: 4, field: "overnight", phrase: "where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { day: 5, field: "afternoon", phrase: "Haifa", to: "/travel-blog/haifa/" },
      { day: 5, field: "practical", phrase: "Caesarea and Haifa day tour options", to: "/tours/caesarea-haifa-acre/" },
    ],
    dayOfficialLinks: [
      { day: 2, field: "morning", phrase: "official Masada park page", href: "https://en.parks.org.il/reserve-park/masada-national-park/" },
      { day: 4, field: "morning", phrase: "Israel Railways journey planner", href: "https://www.rail.co.il/" },
      { day: 5, field: "morning", phrase: "official Caesarea park page", href: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
      { day: 5, field: "afternoon", phrase: "official Bahá’í Gardens visitor information", href: "https://ganbahai.org.il/visit-us-haifa/" },
    ],
    jerusalemTourOptionsDay: 2,
    activityWidgets: [{ day: 1, city: "jerusalem" }, { day: 4, city: "telAviv" }],
    alternatives: [],
    logistics: [
      { heading: "Keep the hotel changes simple", text: "Jerusalem accommodation can serve as the base throughout the city and desert days, followed by a single move to Tel Aviv hotel areas for the coast. Extra arrival and departure nights can usually be added at the same hotels.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Jerusalem accommodation" },
      { heading: "Choose a desert outing that suits your group", text: "Masada and Dead Sea tours can combine the fortress and a designated bathing stop, while a rental car or private driver gives a different pace. Compare pickup, entry and time at the beach.", to: "/tours/masada-dead-sea/", label: "Explore desert tours" },
      { heading: "Allow a full day for the northern coast", text: "A guided coastal excursion can connect Caesarea and Haifa without separate station transfers. With public transport, the last-mile journeys to the national park and hillside viewpoints matter.", to: "/tours/caesarea-haifa-acre/", label: "Explore coastal tours" },
      { heading: "Plan rail and airport connections by date", text: "The Israel transport guide explains train and bus options; service varies around Shabbat and holidays. Allow for the journey from your final sightseeing stop to Ben Gurion Airport.", to: "/travel-blog/getting-around-israel/", label: "Israel transport guide" },
    ],
    logisticsInlineLinks: [
      { index: 0, phrase: "Jerusalem accommodation", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { index: 0, phrase: "Tel Aviv hotel areas", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { index: 1, phrase: "Masada and Dead Sea tours", to: "/tours/masada-dead-sea/" },
      { index: 2, phrase: "guided coastal excursion", to: "/tours/caesarea-haifa-acre/" },
      { index: 3, phrase: "Israel transport guide", to: "/travel-blog/getting-around-israel/" },
    ],
    beforeYouGo: [
      { heading: "Check entry requirements", text: "Visa or ETA-IL arrangements depend on your passport. Check the official Israel entry portal and the latest travel advice before non-refundable bookings; the Israel travel essentials guide covers other preparations.", to: "/travel-blog/israel-travel-tips/", label: "Israel travel essentials guide" },
      { heading: "Consider Shabbat and holidays", text: "Train and bus timetables can change substantially on Friday, Saturday and public holidays. Confirm operating hours for markets, religious sites and tours on your actual dates.", to: "/travel-blog/getting-around-israel/", label: "Compare Israel transport" },
      { heading: "Check park and garden visiting arrangements", text: "Masada, Caesarea and the Bahá’í Gardens have their own opening times, admission rules and potential closures. Plan around the official visitor information linked in the daily route.", to: "/travel-blog/masada/", label: "Masada visiting guide" },
    ],
    beforeYouGoOfficialLinks: [
      { index: 0, phrase: "official Israel entry portal", href: "https://israel-entry.piba.gov.il/" },
    ],
    faqs: [
      { q: "Are five days enough for a first visit to Israel?", a: "Five full sightseeing days make room for Jerusalem, Masada and the Dead Sea, Tel Aviv–Jaffa and one northbound coastal day. Flights that use much of Day 1 or Day 5 call for a shorter plan." },
      { q: "Where should I stay for this five-day itinerary?", a: "Jerusalem and Tel Aviv make two convenient hotel bases. Allow an extra Jerusalem arrival night if you land before Day 1, and an additional Tel Aviv night if your flight is on Day 6." },
      { q: "Can I follow this route without renting a car?", a: "Yes. Jerusalem and Tel Aviv are workable on foot and by public transport when services run. A scheduled tour or private driver can simplify the separate desert and Caesarea–Haifa days, which have additional site transfers." },
      { q: "Can Masada and the Dead Sea be visited in one day?", a: "Yes, with an early start, access to the eastern Masada entrance and a planned beach stop near Ein Bokek. Allow for travel, park hours and the return to Jerusalem." },
      { q: "Should I spend the third day in Jerusalem or visit Bethlehem?", a: "Both can work as separate choices. A city day can focus on the Israel Museum or Mount of Olives; a planned Bethlehem or Jericho excursion replaces that programme and needs its own access and transport arrangements." },
      { q: "Is it possible to see Caesarea and Haifa in one day?", a: "It can be a rewarding full day by organized transport, car or private driver. Allow several hours at Caesarea and enough time for Haifa's viewpoints; public transport needs more connections." },
      { q: "What if I have a flight on the evening of Day 5?", a: "Consider Caesarea alone or a final day in Tel Aviv, with sufficient time to reach Ben Gurion Airport and complete airline check-in and security procedures." },
      { q: "How do Friday, Saturday and holidays affect the itinerary?", a: "Regular train and many bus services do not run for much of Shabbat. Opening hours for markets, parks, religious sites and gardens also vary. Check each day's availability and adjust the sightseeing order or transport." },
    ],
    relatedGuides: [
      { title: "Jerusalem Old City", description: "Historic quarters, gates and practical walking routes.", to: "/travel-blog/old-city-jerusalem/", image: "itinerary-jerusalem-old-city" },
      { title: "Masada National Park", description: "Entrances, cable car, trails and visitor conditions.", to: "/travel-blog/masada/", image: "itinerary-masada-car" },
      { title: "Dead Sea attractions", description: "Where to float and how to plan desert stops.", to: "/travel-blog/dead-sea-attractions/", image: "itinerary-dead-sea-shore" },
      { title: "Jerusalem to Bethlehem", description: "Crossing arrangements and travel options explained.", to: "/travel-blog/jerusalem-to-bethlehem/", image: "jerusalem-to-bethlehem" },
      { title: "Old Jaffa", description: "Port views, historic lanes and neighbourhood walks.", to: "/travel-blog/jaffa/", image: "itinerary-jaffa-streets" },
      { title: "Getting around Israel", description: "Rail, buses, taxis and longer day-trip connections.", to: "/travel-blog/getting-around-israel/", image: "itinerary-train" },
    ],
    hero: "EXISTING:jerusalem",
  },
  "7": {
    id: "7", days: 7, path: "/travel-blog/israel-itinerary-7-days/",
    title: "Israel in 7 Days: Jerusalem, Dead Sea, Galilee & Tel Aviv",
    description: "Plan seven full days in Israel with Jerusalem, Masada and the Dead Sea, Nazareth, the Sea of Galilee, Haifa, Caesarea and Tel Aviv–Jaffa, including hotel bases and travel options.",
    intro: "A week in Israel offers time for Jerusalem’s historic quarters, a desert excursion and two nights in the Galilee before returning south along the Mediterranean coast. The route balances memorable sights with practical transfers and room to choose the experiences that matter most to you.",
    idealFor: "First-time visitors with seven full sightseeing days, an interest in history and regional travel, and time for a northern hotel base",
    reality: "Seven full sightseeing days are realistic when you arrive before Day 1 and fly on Day 8 or later. A flight on Day 7 shortens the final day, sometimes leaving no time for sightseeing. Days 4 and 6 are hotel transfer days, so transport and stop selection matter.",
    hotelBases: "Jerusalem after Days 1–3, Tiberias or the Galilee after Days 4–5, and Tel Aviv after Day 6. Arriving the evening before Day 1 adds a Jerusalem arrival night; flying on Day 8 adds a Tel Aviv night after Day 7.",
    noCarAdvice: "This route can work for different budgets and travel styles. Jerusalem and Tel Aviv are easy to explore on foot and with public transport when it runs, while a rental car, an organized excursion or a private driver can make the desert and dispersed Galilee sites more manageable. On the transfer to the coast, train and bus travellers may prefer just one main stop.",
    route: ["Jerusalem Old City", "Jerusalem or regional excursion", "Masada & Dead Sea", "Nazareth & Sea of Galilee", "Capernaum & lakeside sites", "Haifa & Caesarea", "Tel Aviv–Jaffa"],
    map: { center: [32.03, 35.07], bounds: [34.52, 30.96, 35.84, 33.22], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Nazareth", lat: 32.7, lon: 35.3 }, { name: "Tiberias", lat: 32.79, lon: 35.54 }, { name: "Haifa", lat: 32.8, lon: 34.99 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Tel Aviv", lat: 32.08, lon: 34.78 }] },
    daysPlan: days7,
    reviewedAt: "2026-11-14",
    overviewRows: [
      { focus: "Jerusalem Old City", travel: "Walk / short local ride", night: "Jerusalem · after Day 1" },
      { focus: "Jerusalem or regional excursion", travel: "Walk / local ride or booked tour", night: "Jerusalem · after Day 2" },
      { focus: "Masada & Ein Bokek", travel: "Organized tour / car / private driver", night: "Jerusalem · after Day 3" },
      { focus: "Nazareth & first lakeside stop", travel: "Transfer north / car / bus + local rides", night: "Galilee · after Day 4" },
      { focus: "Capernaum & Sea of Galilee", travel: "Car / guided excursion / local rides", night: "Galilee · after Day 5" },
      { focus: "Haifa & Caesarea", travel: "Transfer south / tour / car; transit changes", night: "Tel Aviv · after Day 6" },
      { focus: "Tel Aviv–Jaffa", travel: "Walk + local rides / airport transfer", night: "Departure / optional Tel Aviv night" },
    ],
    daySequences: [
      { day: 1, steps: [
        { stop: "Jaffa Gate, Christian Quarter & Holy Sepulchre", time: "About 2–3 hrs" },
        { stop: "Jewish Quarter & Western Wall", time: "About 1–2 hrs; depending on access", optional: true },
        { stop: "Old City markets", time: "Around 45–90 mins" },
      ] },
      { day: 2, steps: [
        { stop: "Israel Museum", time: "About 2–3 hrs" },
        { stop: "Mount of Olives & Gethsemane", time: "Around 2–3 hrs; separate city route", optional: true },
        { stop: "Bethlehem or Jericho excursion", time: "Separate half-day or longer trip", optional: true },
      ] },
      { day: 3, steps: [
        { stop: "Masada plateau", time: "About 2–3 hrs on site" },
        { stop: "Ein Bokek bathing beach", time: "About 1–2 hrs, plus travel" },
        { stop: "Ein Gedi Nature Reserve", time: "Optional; verify opening and trails", optional: true },
      ] },
      { day: 4, steps: [
        { stop: "Basilica of the Annunciation & old Nazareth", time: "About 1–2 hrs, plus arrival" },
        { stop: "Magdala archaeology", time: "Around 1–1½ hrs, if arrival allows", optional: true },
        { stop: "Tiberias waterfront", time: "Around 30–60 mins, if arrival allows", optional: true },
      ] },
      { day: 5, steps: [
        { stop: "Capernaum archaeology", time: "About 1–1½ hrs" },
        { stop: "Mount of Beatitudes or Tabgha", time: "About 45–90 mins at each chosen stop", optional: true },
        { stop: "Magdala or a lakeside break", time: "Around 1–2 hrs; optional", optional: true },
      ] },
      { day: 6, steps: [
        { stop: "Haifa's German Colony viewpoint", time: "Around 45–75 mins" },
        { stop: "Upper Bahá’í Gardens panorama", time: "Optional; separate uphill journey", optional: true },
        { stop: "Caesarea National Park", time: "About 2–3 hrs, plus intercity travel" },
      ] },
      { day: 7, steps: [
        { stop: "Old Jaffa hill and port", time: "Around 1½–2 hrs" },
        { stop: "Neve Tzedek & promenade", time: "Around 1–2 hrs" },
        { stop: "Beach, Carmel Market or a museum", time: "Optional; allow for your flight", optional: true },
      ] },
    ],
    dayTipHeadings: [
      "Old City access and walking",
      "Your second Jerusalem day",
      "Desert-day essentials",
      "The journey north and your Galilee base",
      "Exploring the lakeside sites",
      "Making the coastal transfer worthwhile",
      "Planning your departure from Tel Aviv",
    ],
    dayChoices: [
      { day: 2, options: [
        { heading: "Stay in Jerusalem", text: "Explore the Israel Museum or take a separate Mount of Olives and Gethsemane route, with time left for neighbourhoods or a café." },
        { heading: "Take a regional day trip", text: "A planned Bethlehem or Jericho excursion replaces the Jerusalem programme and needs its own transport and access arrangements." },
      ] },
      { day: 5, options: [
        { heading: "Explore the heritage sites", text: "Choose two or three lakeside stops around Capernaum, Tabgha, the Mount of Beatitudes or Magdala." },
        { heading: "Prefer nature?", text: "A particular accessible trail or nature reserve can replace the heritage route when weather, access and travel advice permit." },
      ] },
      { day: 6, options: [
        { heading: "Travelling by car or with a driver?", text: "Haifa and Caesarea can both fit on the transfer south with an early start and planned visiting times." },
        { heading: "Using trains and buses?", text: "Choose Haifa or Caesarea for a simpler day and allow time for luggage and station-to-attraction travel." },
      ] },
      { day: 7, options: [
        { heading: "A full day in Tel Aviv", text: "Enjoy Jaffa, Neve Tzedek and the promenade at an unhurried pace when flying the following day." },
        { heading: "Flying home on Day 7?", text: "A morning or midday flight usually leaves little or no sightseeing time: travel directly to Ben Gurion Airport. With a later departure, choose at most one short stop and leave plenty of time for your transfer, security and check-in." },
      ] },
    ],
    dayInlineLinks: [
      { day: 1, field: "morning", phrase: "Old City guide", to: "/travel-blog/old-city-jerusalem/" },
      { day: 1, field: "evening", phrase: "shopping in Jerusalem", to: "/travel-blog/shopping-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Israel Museum", to: "/travel-blog/museums-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Mount of Olives", to: "/travel-blog/mount-of-olives/" },
      { day: 2, field: "practical", phrase: "Bethlehem", to: "/travel-blog/jerusalem-to-bethlehem/" },
      { day: 3, field: "morning", phrase: "Masada National Park", to: "/travel-blog/masada/" },
      { day: 3, field: "afternoon", phrase: "Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/" },
      { day: 3, field: "afternoon", phrase: "Ein Gedi", to: "/travel-blog/ein-gedi/" },
      { day: 3, field: "practical", phrase: "Masada and Dead Sea tours", to: "/tours/masada-dead-sea/" },
      { day: 3, field: "practical", phrase: "Jerusalem to Dead Sea guide", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { day: 4, field: "morning", phrase: "Basilica of the Annunciation", to: "/travel-blog/basilica-of-the-annunciation/" },
      { day: 4, field: "afternoon", phrase: "Magdala", to: "/travel-blog/magdala/" },
      { day: 4, field: "overnight", phrase: "Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      { day: 5, field: "morning", phrase: "Capernaum", to: "/travel-blog/capernaum/" },
      { day: 5, field: "morning", phrase: "Mount of Beatitudes", to: "/travel-blog/mount-of-beatitudes/" },
      { day: 5, field: "afternoon", phrase: "Tabgha", to: "/travel-blog/tabgha/" },
      { day: 5, field: "afternoon", phrase: "Magdala", to: "/travel-blog/magdala/" },
      { day: 5, field: "afternoon", phrase: "Sea of Galilee", to: "/travel-blog/sea-of-galilee/" },
      { day: 6, field: "morning", phrase: "Haifa", to: "/travel-blog/haifa/" },
      { day: 6, field: "practical", phrase: "guided coastal excursion", to: "/tours/caesarea-haifa-acre/" },
      { day: 6, field: "overnight", phrase: "Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { day: 7, field: "morning", phrase: "Old Jaffa guide", to: "/travel-blog/jaffa/" },
      { day: 7, field: "afternoon", phrase: "Tel Aviv beach", to: "/travel-blog/beaches-in-tel-aviv/" },
      { day: 7, field: "practical", phrase: "Ben Gurion Airport", to: "/airport-transfers/" },
    ],
    dayOfficialLinks: [
      { day: 3, field: "morning", phrase: "official Masada visitor page", href: "https://en.parks.org.il/reserve-park/masada-national-park/" },
      { day: 4, field: "morning", phrase: "Franciscan sanctuary information", href: "https://www.custodia.org/en/sanctuaries/nazareth-basilica-of-the-annunciation/" },
      { day: 4, field: "afternoon", phrase: "official Magdala visitor information", href: "https://www.magdala.org/plan-your-visit" },
      { day: 5, field: "morning", phrase: "official Kfar Nahum National Park page", href: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/" },
      { day: 6, field: "morning", phrase: "official Bahá’í Gardens visitor information", href: "https://ganbahai.org.il/visit-us-haifa/" },
      { day: 6, field: "afternoon", phrase: "official Caesarea park page", href: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
    ],
    jerusalemTourOptionsDay: 3,
    activityWidgets: [{ day: 1, city: "jerusalem" }, { day: 7, city: "telAviv" }],
    alternatives: [],
    logistics: [
      { heading: "Keep the hotel changes simple", text: "A Jerusalem hotel base covers the first three sightseeing nights, then Tiberias hotel options suit the two Galilee nights and Tel Aviv accommodation the coastal finish. Add arrival or departure nights at the same hotels when needed.", to: "/travel-blog/best-hotels-in-tiberias/", label: "Tiberias hotel options" },
      { heading: "Match northern transport to the route", text: "The Basilica of the Annunciation, Capernaum and the Mount of Beatitudes are separate stops. A car, private driver or guided excursion can save connections, while trains and buses work better between towns than between dispersed heritage sites.", to: "/tours/nazareth-sea-of-galilee/", label: "Galilee tour choices" },
      { heading: "Use the coastal sights as a transfer day", text: "The drive from the Galilee via Haifa and Caesarea to Tel Aviv works as one route, but public transport requires additional transfers. A planned coastal tour may be simpler; travellers relying on rail can choose a single major stop.", to: "/tours/caesarea-haifa-acre/", label: "Coastal tour choices" },
      { heading: "Consider luggage on transfer days", text: "Check hotel check-out, car or tour luggage capacity and the last connection to your next hotel. The Israel transport guide explains how rail, buses and private rides fit together.", to: "/travel-blog/getting-around-israel/", label: "Israel transport guide" },
      { heading: "Plan your airport journey by departure date", text: "Allow for the journey from your Tel Aviv hotel or final sightseeing stop to Ben Gurion Airport, including check-in. Airport transfers are one option when public transport is unavailable or indirect.", to: "/airport-transfers/", label: "Airport transfers" },
    ],
    logisticsInlineLinks: [
      { index: 0, phrase: "Tiberias hotel options", to: "/travel-blog/best-hotels-in-tiberias/" },
      { index: 0, phrase: "Tel Aviv accommodation", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { index: 1, phrase: "guided excursion", to: "/tours/nazareth-sea-of-galilee/" },
      { index: 2, phrase: "planned coastal tour", to: "/tours/caesarea-haifa-acre/" },
      { index: 3, phrase: "Israel transport guide", to: "/travel-blog/getting-around-israel/" },
      { index: 4, phrase: "Airport transfers", to: "/airport-transfers/" },
    ],
    beforeYouGo: [
      { heading: "Check entry requirements and travel advice", text: "Visa or ETA-IL eligibility depends on your passport. Review the official Israel entry information and current travel advisories before non-refundable bookings, especially for any optional border-area excursion.", to: "/travel-blog/israel-travel-tips/", label: "Israel travel essentials" },
      { heading: "Plan around Shabbat and holidays", text: "Train and many bus services can be unavailable for much of Shabbat, and religious sites, museums and markets follow their own calendars. Check Israel Railways and local operating hours for your dates.", to: "/travel-blog/getting-around-israel/", label: "Israel transport" },
      { heading: "Confirm individual attraction access", text: "Opening times, last entry, trail closures and guided-tour arrangements vary at Masada, the Galilee sites, Caesarea and the Bahá’í Gardens. The official visitor links in the daily itinerary are the best starting point.", to: "/travel-blog/masada/", label: "Masada visitor guide" },
    ],
    beforeYouGoOfficialLinks: [
      { index: 0, phrase: "official Israel entry information", href: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
      { index: 1, phrase: "Israel Railways", href: "https://www.rail.co.il/" },
    ],
    faqs: [
      { q: "Are seven days enough to visit Jerusalem, the Galilee and Tel Aviv?", a: "Seven full sightseeing days can accommodate these regions with a desert excursion and two northern nights if you arrive before Day 1 and fly on Day 8 or later. A Day 7 flight cuts into the final day; an early departure may leave no time for Tel Aviv sightseeing." },
      { q: "How many hotels and nights do I need for this route?", a: "Three bases keep travel manageable: Jerusalem after Days 1–3, Tiberias or the Galilee after Days 4–5, and Tel Aviv after Day 6. Add a Jerusalem night for an evening arrival before Day 1 and a Tel Aviv night if your flight is on Day 8." },
      { q: "Can I do the seven-day itinerary without renting a car?", a: "Yes, but the dispersed lakeside sites require more planning. Intercity trains, buses and taxis can connect the main towns, while a suitable guided tour or a private driver simplifies the desert day, northern excursions and a two-stop coastal transfer." },
      { q: "Can I see Nazareth and the Sea of Galilee on Day 4?", a: "Yes, if you treat Day 4 primarily as a northbound transfer, focus on the Basilica of the Annunciation in Nazareth and limit the first lakeside visit to one stop if there is time." },
      { q: "Which sites should I prioritize around the Sea of Galilee?", a: "Capernaum, the Mount of Beatitudes, Tabgha and Magdala are all worthwhile choices for different interests. Select two or three and allow for separate entrance arrangements and travel between them." },
      { q: "Should I add the Golan Heights to this one-week itinerary?", a: "The Golan Heights are not part of the core route. A nature or regional day can replace lakeside heritage sightseeing, but confirm current travel advice, local access and weather conditions before considering any border-area destination." },
      { q: "Can I combine Haifa and Caesarea while travelling to Tel Aviv?", a: "A full-day transfer by car, private driver or suitable organized transport can include both if you start early. With trains and buses, a single main stop may be more realistic because extra local connections add time." },
      { q: "What should I change if my flight leaves on Day 7 or during Shabbat?", a: "Morning or midday flights may leave no usable sightseeing time; treat Day 7 as a departure day. For later flights, choose at most a short stop and leave generous time to reach Ben Gurion Airport for security and check-in. Rail and bus services can be limited during Shabbat, so verify transport for your specific departure date." },
    ],
    relatedGuides: [
      { title: "Jerusalem Old City", description: "Historic quarters, gates and practical walking routes.", to: "/travel-blog/old-city-jerusalem/", image: "itinerary-jerusalem-old-city" },
      { title: "Masada and the Dead Sea", description: "Desert sites, bathing advice and travel choices.", to: "/travel-blog/masada/", image: "itinerary-dead-sea-shore" },
      { title: "Magdala and its archaeological remains", description: "A rewarding historical stop on the Galilee shore.", to: "/travel-blog/magdala/", image: "magdala-archaeology" },
      { title: "Haifa city highlights", description: "Viewpoints, the Bahá’í Gardens and museums.", to: "/travel-blog/haifa/", image: "museums-in-haifa" },
      { title: "Getting around Israel", description: "Rail, buses and connections between major regions.", to: "/travel-blog/getting-around-israel/", image: "itinerary-train" },
      { title: "Ben Gurion Airport connections", description: "Plan the final journey to your flight.", to: "/airport-transfers/", image: "itinerary-airport" },
    ],
    hero: "EXISTING:galilee",
  },
  "10": {
    id: "10", days: 10, path: "/travel-blog/israel-itinerary-10-days/",
    title: "10 Days in Israel: Complete Itinerary & Hotel Bases",
    description: "Plan ten days in Israel through Jerusalem, Dead Sea, Galilee, Akko, Haifa, Caesarea and Tel Aviv, plus a sensible Eilat and Timna alternative.",
    intro: "Ten days let you spend longer in Jerusalem and the Galilee, explore the northern Mediterranean coast and finish in Tel Aviv without changing hotels every night. The main route deliberately stays in central and northern Israel; Eilat and Timna are an alternative that replaces several days, not two rushed additions.",
    idealFor: "Travelers wanting a fuller regional itinerary with time for slower city and heritage days",
    reality: "Ten days do not make every corner of Israel a nearby day trip. The full north-and-Eilat circuit demands longer transfers and more hotel changes than the main route.",
    hotelBases: "Jerusalem (three nights), Tiberias/Galilee (three nights), optionally Haifa (one night), and Tel Aviv (the final nights).",
    noCarAdvice: "Rail and buses help between cities when operating; the wider Galilee and remote sites need more careful arrangements. Choose a partial rental or organized outings for those legs rather than paying for a parked car throughout a city stay.",
    route: ["Jerusalem", "Masada & Dead Sea", "Nazareth & Galilee", "Akko", "Haifa", "Caesarea", "Tel Aviv"],
    map: { center: [32.05, 35.05], bounds: [34.52, 30.96, 35.84, 33.22], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Nazareth", lat: 32.7, lon: 35.3 }, { name: "Tiberias", lat: 32.79, lon: 35.54 }, { name: "Akko", lat: 32.93, lon: 35.08 }, { name: "Haifa", lat: 32.8, lon: 34.99 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Tel Aviv", lat: 32.08, lon: 34.78 }] },
    daysPlan: days10,
    alternatives: [
      { title: "A real Eilat and Timna alternative", text: "Allocate at least two nights to Eilat, and remove two or three northern days rather than appending Eilat to the end. Use one day for the Red Sea and another for Timna or the Negev, with separate return travel before an international flight.", to: "/travel-blog/eilat/", label: "Eilat destination guide" },
      { title: "Make the Negev the focus instead", text: "Swap a northern day and a coastal day for a Mitzpe Ramon overnight and a desert-landscape day. This changes the route and vehicle needs; it is not a short detour between Tel Aviv and Eilat.", to: "/travel-blog/mitzpe-ramon-crater/", label: "Ramon Crater guide" },
      { title: "Build a more relaxed trip", text: "Keep three longer hotel stays and choose only one or two headline attractions per day. You will visit fewer sites but gain flexibility for museums, cafés and unplanned closures.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Jerusalem hotel areas" },
    ],
    logistics: [
      { heading: "Split the hotel nights, not every day", text: "Three northern nights substantially reduce repeated transfers. Haifa is an optional additional base, not a requirement; staying on the coast can be preferable only when it helps your route.", to: "/travel-blog/best-hotels-in-haifa/", label: "Haifa hotel guide" },
      { heading: "The price of including Eilat", text: "A southern extension requires a long land journey or another verified transport option, with overnight accommodation and return timing. Do not promise a specific domestic flight route without checking the current schedule.", to: "/travel-blog/eilat/", label: "Eilat travel guide" },
      { heading: "Transportation by region", text: "Central-city days may work by foot, rail and bus; regional nature days need transfers to exact park entrances. Recheck Shabbat, holiday timetables and official travel guidance before travel.", to: "/travel-blog/getting-around-israel/", label: "Getting around Israel" },
    ],
    faqs: [
      { q: "Can I visit Jerusalem, Galilee and Eilat in ten days?", a: "It is possible in principle but requires more long journeys and tradeoffs. This guide's main route focuses on Jerusalem, northern Israel and the coast; the Eilat option replaces northern days." },
      { q: "Should I hire a car for all ten days?", a: "Not necessarily. A car may help in the Galilee or for a Negev variant, but can be inconvenient in central Jerusalem and Tel Aviv. A partial rental or a mix of transport may be better." },
      { q: "Where should I stay for a ten-day Israel itinerary?", a: "Use Jerusalem and a northern base for several nights each, followed by Tel Aviv. Add Haifa only when it improves the coastal route rather than creating another unnecessary check-in." },
    ],
    hero: "EXISTING:haifa",
  },
};

export const itineraryIds: ItineraryId[] = ["3", "5", "7", "10"];
export const itinerarySources = [
  { label: "Masada National Park — access and visiting rules", url: "https://en.parks.org.il/reserve-park/masada-national-park/" },
  { label: "Bahá’í Gardens Haifa — visiting arrangements", url: "https://ganbahai.org.il/visit-us-haifa/" },
  { label: "Israel Railways — services and schedules", url: "https://www.rail.co.il/" },
  { label: "Israel public transport trip planner", url: "https://bus.gov.il/" },
  { label: "Israel Nature and Parks Authority — nature reserve conditions", url: "https://en.parks.org.il/" },
];

/** Keep official references relevant to each actual route, not every destination in the series. */
export const itinerarySourcesByGuide: Record<ItineraryId, { label: string; url: string }[]> = {
  "3": [
    itinerarySources[0]!,
    itinerarySources[2]!,
    itinerarySources[3]!,
    itinerarySources[4]!,
    { label: "Israel Population and Immigration Authority — ETA-IL entry rules", url: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
  ],
  "5": [
    itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!,
    { label: "Caesarea National Park — opening hours and access", url: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
    { label: "Israel Population and Immigration Authority — ETA-IL", url: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
  ],
  "7": [
    itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!,
    { label: "Basilica of the Annunciation — Franciscan sanctuary", url: "https://www.custodia.org/en/sanctuaries/nazareth-basilica-of-the-annunciation/" },
    { label: "Magdala archaeological park — visitor information", url: "https://www.magdala.org/plan-your-visit" },
    { label: "Kfar Nahum (Capernaum) National Park — visitor information", url: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/" },
    { label: "Caesarea National Park — opening hours and access", url: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
    { label: "Israel entry and ETA-IL information", url: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
  ],
  "10": [itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!],
};
