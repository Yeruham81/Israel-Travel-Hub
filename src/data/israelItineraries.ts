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
    afternoon: "Spend the afternoon exploring more of the Old City, or visit the Israel Museum as a separate trip across town. Allow time for travel and exhibitions; see Jerusalem museums for other options.",
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
    morning: "Take the train from Jerusalem Yitzhak Navon station to Tel Aviv when services are running, then continue to Old Jaffa by bus or taxi. Check the Israel Railways journey planner for your date; plan a different transfer if no trains run. Walk through Jaffa’s historic hill, lanes and port, with the flea-market district nearby when its shops are open.",
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
    evening: "Return to your Jerusalem hotel and enjoy a relaxed evening after the desert excursion.",
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
    morning: "When trains are running, travel from Jerusalem to Tel Aviv by rail. Check the Israel Railways journey planner for your travel date, then take a bus or taxi from the station to Old Jaffa. Explore its historic hill, port and nearby flea market.",
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
    afternoon: "Continue towards the Sea of Galilee. If your arrival time permits, stop at Magdala for its archaeological remains, or enjoy a shorter lakeside visit before checking in. Check the official Magdala visitor information for opening hours before planning your stop.",
    evening: "Check into your hotel in Tiberias or elsewhere in the Galilee and enjoy a relaxed evening after the journey north.",
    practical: "This is a hotel-transfer day as well as a sightseeing day. A self-drive route or private driver can connect Nazareth and a lakeside stop directly; public transport may mean changing services and arranging a separate local transfer, especially with luggage.",
    overnight: "Tiberias or the Galilee after Day 4 — the first of two nights in the north.",
    links: [nazareth, L("Magdala travel guide", "/travel-blog/magdala/"), tiberiasHotels],
  },
  {
    name: "Sea of Galilee: heritage sites or a nature-focused day", region: "Sea of Galilee", image: "itinerary-7day-capernaum",
    morning: "Visit Capernaum and, if it suits your interests, the Mount of Beatitudes. The lakeside heritage sites and their entrances are spread out, so allow for short drives and different visitor arrangements. The official Kfar Nahum National Park page covers one of the visitor areas at Capernaum.",
    afternoon: "Visit the lakeside churches at Tabgha, explore Magdala's archaeological site, or take a break by the Sea of Galilee. Two or three well-chosen visits leave more room for the setting than a rush through every stop.",
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
    evening: "If flying on Day 8, enjoy a final dinner in Tel Aviv. If departing on Day 7, allow plenty of time for the airport journey and check-in.",
    practical: "Work backwards from your flight's check-in time when planning how to reach Ben Gurion Airport from your actual hotel or sightseeing stop. Morning and midday departures usually make Day 7 a travel day, not a full sightseeing day. Tel Aviv's railway stations are not on the beach or in Old Jaffa, and regular public transport is limited on Shabbat; allow a generous airport margin.",
    overnight: "Depart on Day 7, or add a Tel Aviv night after Day 7 if flying the following day.",
    links: [telaviv, telavivHotels, L("Airport transfers", "/airport-transfers/")],
  },
];

const days10: ItineraryDay[] = [
  {
    name: "Jerusalem's Old City: historic quarters and sacred sites", region: "Jerusalem", image: "itinerary-3day-holy-sepulchre",
    morning: "Start at Jaffa Gate and follow a manageable route through the Christian Quarter to the Church of the Holy Sepulchre. The Old City guide explains the gates, walking routes and access to religious sites.",
    afternoon: "Choose the Jewish Quarter and Western Wall if time and access permit, then enjoy the markets or a favourite stretch of the Old City. Keep the Israel Museum and cross-city viewpoints for tomorrow.",
    evening: "Enjoy dinner near Jaffa Road or Mahane Yehuda, depending on opening hours and where you are staying.",
    practical: "Old City streets include steps and uneven stone surfaces. Check visiting arrangements at religious sites, especially around services, holidays and restricted areas. Arrange a practical luggage drop-off if staying inside the walls.",
    overnight: "Jerusalem after Day 1 — stay at the same hotel for the following two nights.",
    links: [jerusalem, jerusalemHotels, L("Shopping in Jerusalem", "/travel-blog/shopping-in-jerusalem/")],
  },
  {
    name: "Jerusalem's museums and viewpoints — or a regional excursion", region: "Jerusalem", image: "itinerary-5day-mount-of-olives",
    morning: "Visit the Israel Museum for its archaeology, art and Shrine of the Book, or take a separate heritage route to the Mount of Olives and Gethsemane. These are alternatives in different parts of the city, not one short walking circuit.",
    afternoon: "Continue with your chosen Jerusalem experience and allow time for a neighbourhood walk or café. A Bethlehem or Jericho excursion replaces the city programme and needs a separately planned itinerary.",
    evening: "Explore Mahane Yehuda or enjoy a quieter evening near your hotel before the early desert outing.",
    practical: "If choosing Bethlehem or Jericho, check current travel advice, entry eligibility, crossing arrangements and the tour operator's actual route. Do not assume a Jerusalem taxi or driver can enter every area.",
    overnight: "Jerusalem after Day 2 — second night at the same hotel.",
    links: [L("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/"), L("Mount of Olives", "/travel-blog/mount-of-olives/"), L("Jerusalem to Bethlehem", "/travel-blog/jerusalem-to-bethlehem/")],
  },
  {
    name: "Masada and the Dead Sea: a full desert excursion", region: "Judean Desert", image: "EXISTING:masada",
    morning: "Leave Jerusalem early for Masada National Park via Road 90. The eastern entrance has the cable car and Snake Path; the Roman Ramp uses a separate western approach near Arad. Check the official Masada visitor page for entry, the last cable car and heat-related restrictions.",
    afternoon: "Continue to a designated Ein Bokek bathing beach for floating, changing and showering. The Dead Sea visitor guide covers bathing precautions. Ein Gedi Nature Reserve is an alternative nature outing, not another stop to add automatically.",
    evening: "Return to Jerusalem and allow time to rest before tomorrow's longer drive north.",
    practical: "Bring water, sun protection and suitable shoes. Compare Masada and Dead Sea day tours, a rental car or a private driver; the Jerusalem to Dead Sea guide explains independent transport choices.",
    overnight: "Jerusalem after Day 3 — final planned night before changing regions.",
    links: [masada, deadSea, L("Jerusalem to Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/")],
  },
  {
    name: "Nazareth and the Sea of Galilee: journey north", region: "Lower Galilee", image: "basilica-of-the-annunciation",
    morning: "Travel north from Jerusalem to Nazareth to visit the Basilica of the Annunciation and a section of the old town. Check the official Franciscan sanctuary information for visiting arrangements and religious services before planning your arrival.",
    afternoon: "Continue towards the Sea of Galilee. If the journey permits, choose Magdala's archaeological site or a short lakeside stop before checking in. Check Magdala’s visiting hours before adding this stop.",
    evening: "Check into accommodation in Tiberias or another convenient Galilee base and enjoy a relaxed dinner after the intercity journey.",
    practical: "This is a hotel-transfer day with luggage, not a full day at the attractions. A car or private driver can connect the stops; buses may require changes and additional local rides, particularly between Nazareth and the lake.",
    overnight: "Tiberias or the Galilee after Day 4 — first of three nights in the north.",
    links: [nazareth, L("Magdala guide", "/travel-blog/magdala/"), tiberiasHotels],
  },
  {
    name: "Sea of Galilee: Capernaum and lakeside heritage", region: "Sea of Galilee", image: "itinerary-7day-capernaum",
    morning: "Visit Capernaum and, if it fits your interests, the Mount of Beatitudes. The heritage sites have separate entrances and opening arrangements; check the official Capernaum National Park visitor information for the park area.",
    afternoon: "Choose the churches at Tabgha, Magdala's archaeology or a relaxed break beside the lake. Choose one or two additional lakeside stops and allow time for short drives and separate entrances.",
    evening: "Return to your Galilee hotel for a relaxed evening without moving luggage or changing accommodation.",
    practical: "A car, prearranged driver or suitable guided tour is useful for dispersed lakeside sites. Check worship schedules, access and official travel advice before visiting, and use designated swimming areas if entering the water.",
    overnight: "Tiberias or the Galilee after Day 5 — second night at the same base.",
    links: [L("Capernaum", "/travel-blog/capernaum/"), L("Tabgha", "/travel-blog/tabgha/"), lake],
  },
  {
    name: "A flexible Galilee day: nature or more heritage", region: "Galilee", image: "EXISTING:galilee",
    morning: "Choose Arbel National Park for a clifftop viewpoint or a marked trail suited to your ability and the weather. Check the official Arbel visitor information for trail difficulty, advance reservations and entry times. Mount Tabor and a relaxed morning beside the lake are separate alternatives.",
    afternoon: "Continue with the theme you chose rather than combining distant northern sites. Check trail status, opening times and local travel advice before setting off, and leave room for return travel.",
    evening: "Enjoy a third evening at the same Galilee hotel, with time for dinner and an easy start tomorrow.",
    practical: "Nature sites can have seasonal restrictions and different entrances. Choose a currently accessible destination in the same region if your first choice is closed; border-area routes require particular care and up-to-date official advice.",
    overnight: "Tiberias or the Galilee after Day 6 — third night at the same base.",
    links: [lake, L("Mount Tabor guide", "/travel-blog/mount-tabor/"), L("Israel travel advice", "/travel-blog/israel-travel-tips/")],
  },
  {
    name: "Old Akko and the northern coast: southbound transfer", region: "Akko and Haifa", image: "itinerary-10day-akko-port",
    morning: "Leave the Galilee for Old Akko. Visit the Knights' Halls or Templar Tunnel and explore the market streets; choose sites based on actual opening hours. The official Old Akko visiting information lists opening hours; ticket sales end one hour before closing, so plan to arrive earlier.",
    afternoon: "Walk by Akko's historic harbour, then continue south to Haifa. Rosh Hanikra lies north of Akko, so include it only as a planned detour with confirmed visitor access and enough time for the onward journey.",
    evening: "For the full Haifa and Caesarea route tomorrow, stay in Haifa tonight. To avoid another hotel change, continue to Tel Aviv instead and choose a shorter Day 8 without returning north to Haifa.",
    practical: "This is a hotel-transfer day with luggage. From Tiberias, travel to Akko by road or bus; there is no railway station in Tiberias. Trains can be useful from Akko to Haifa, but Akko station is outside the old town. Plan luggage storage and local connections before setting off.",
    overnight: "Haifa after Day 7 for the full coastal route; alternatively Tel Aviv if shortening Day 8.",
    links: [akko, L("Rosh Hanikra visitor guide", "/travel-blog/rosh-hanikra/"), haifaHotels],
  },
  {
    name: "Haifa and Caesarea: follow the Mediterranean coast", region: "Haifa and Caesarea", image: "itinerary-5day-caesarea",
    morning: "If you stayed in Haifa, visit the German Colony viewpoint towards the lower Bahá’í Gardens or the upper viewpoint at 61 Yefe Nof Street. Self-guided viewpoints do not require a reservation, while guided terrace tours must be booked separately. Check the official Bahá’í Gardens visitor information for current access.",
    afternoon: "Travel south to Caesarea National Park for the Roman theatre, archaeological remains and historic harbour. Check the official Caesarea park page for opening and last-entry times. If you stayed in Tel Aviv after Day 7, choose Caesarea as a separate outing or stay in the city rather than travelling back to Haifa.",
    evening: "Continue to Tel Aviv, check into your hotel and keep the evening flexible after the coastal journey.",
    practical: "A car, guided coastal excursion or private driver makes a Haifa–Caesarea transfer simpler. Rail travellers need local connections to the gardens and the national park; the site entrances are not at the stations.",
    overnight: "Tel Aviv after Day 8 — the first of two planned nights at this base.",
    links: [haifa, caesarea, telavivHotels],
  },
  {
    name: "Old Jaffa and Tel Aviv: coastal neighbourhoods", region: "Tel Aviv–Jaffa", image: "itinerary-jaffa-streets",
    morning: "Explore Old Jaffa's historic hill, port and flea-market streets. Use the Old Jaffa guide to choose a self-guided walking route.",
    afternoon: "Continue towards Neve Tzedek, Rothschild Boulevard or the seafront promenade. Choose a beach or Carmel Market rather than trying to cover every neighbourhood in a single afternoon.",
    evening: "Enjoy dinner in Tel Aviv or an evening along the promenade, with your hotel within practical reach.",
    practical: "Jaffa, the beachfront and Rothschild Boulevard are different areas; allow time between them and check local public transport and market opening days.",
    overnight: "Tel Aviv after Day 9 — the second planned night at the same hotel.",
    links: [telaviv, telavivHotels, L("Tel Aviv beaches", "/travel-blog/beaches-in-tel-aviv/")],
  },
  {
    name: "Tel Aviv's final sights — or your airport departure", region: "Tel Aviv and Ben Gurion Airport", image: "itinerary-airport",
    morning: "With a full sightseeing day and a flight on Day 11, choose a Tel Aviv museum, beach walk or final shopping. If your flight leaves on Day 10 in the morning or around midday, skip sightseeing and travel directly towards Ben Gurion Airport.",
    afternoon: "If flying on Day 11, enjoy a relaxed final afternoon in Tel Aviv. For a late Day 10 departure, choose at most one short stop and leave plenty of time for the airport.",
    evening: "Enjoy a final Tel Aviv dinner if departing tomorrow. If flying tonight, allow enough time for the airport journey, security and check-in instead of scheduling another activity.",
    practical: "Work backwards from your airline's check-in instructions, hotel location and actual departure date. Tel Aviv's main railway stations are not in Old Jaffa or at the beach, and regular public transport is limited during Shabbat; compare airport transfer options in advance.",
    overnight: "Depart on Day 10, or add a Tel Aviv night after Day 10 if your flight is on Day 11.",
    links: [L("Airport transfers", "/airport-transfers/"), L("Ben Gurion Airport tips", "/travel-blog/ben-gurion-airport-arrival-tips/")],
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
    hotelBases: "Jerusalem on nights 1 and 2. Add a night in Tel Aviv after Day 3 only if your flight is on Day 4 or later. Count arrival and departure nights separately according to your flights.",
    noCarAdvice: "Jerusalem and Tel Aviv lend themselves to exploring on foot and by public transport, while the Masada–Dead Sea day can be a self-drive outing, an organized tour or a journey with a private driver.",
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
      { heading: "Flying home on Day 3?", text: "If your flight leaves early on Day 3, you may need to skip Tel Aviv sightseeing entirely. For a later flight, keep the route short, arrange luggage storage in advance and leave enough time for airport travel, security and check-in." },
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
    noCarAdvice: "Jerusalem and Tel Aviv are comfortable to explore on foot and by public transport, while the desert and northern-coast days can be organized tours, self-drive outings or trips with a private driver.",
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
        { heading: "Flying home on Day 5?", text: "An early flight may leave no time for the coastal excursion. For a later flight, choose a shorter plan—perhaps Tel Aviv or Caesarea alone—and allow plenty of time for the airport journey, security and check-in." },
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
      { heading: "Keep the hotel changes simple", text: "Use Jerusalem accommodation as your base for Days 1–3, then choose among Tel Aviv hotel areas for the final part of your trip. Add extra arrival or departure nights at the same hotels if needed.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Jerusalem accommodation" },
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
      { q: "What if I fly home on Day 5?", a: "An early flight may leave no time for the coastal excursion. For a later departure, consider Caesarea alone or a short visit in Tel Aviv, allowing plenty of time to reach Ben Gurion Airport for check-in and security." },
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
    noCarAdvice: "Jerusalem and Tel Aviv are easy to explore on foot and with public transport when it runs, while a rental car, an organized excursion or a private driver can make the desert and dispersed Galilee sites more manageable. On the transfer to the coast, train and bus travellers may prefer just one main stop.",
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
    title: "Israel in 10 Days: Jerusalem, Galilee, Coast & Tel Aviv",
    description: "Plan ten days in Israel with Jerusalem, Masada and the Dead Sea, Nazareth, the Galilee, Akko, Haifa, Caesarea and Tel Aviv, including hotel bases, transport and a separate Eilat alternative.",
    intro: "Ten days in Israel allow time for Jerusalem, a Dead Sea excursion, three nights in the Galilee and a journey south along the Mediterranean coast. This route finishes in Tel Aviv, with practical hotel and transport choices; Eilat and Timna form a separate southern alternative, not extra stops to squeeze into the same trip.",
    idealFor: "First-time visitors who want a broader route with heritage sites, the Galilee and the coast, without changing hotels every night",
    reality: "Ten full sightseeing days work best if you arrive before Day 1 and fly on Day 11 or later. A flight on Day 10 shortens the final day, sometimes leaving no time for sightseeing. Days 4, 7 and 8 involve hotel transfers; the core route stays in central and northern Israel.",
    hotelBases: "Jerusalem after Days 1–3, Tiberias or the Galilee after Days 4–6, Haifa after Day 7, and Tel Aviv after Days 8–9. To avoid a Haifa hotel change, continue to Tel Aviv on Day 7 and shorten Day 8. Add arrival or departure nights according to your flights.",
    noCarAdvice: "Jerusalem and Tel Aviv can be explored on foot and by public transport when services operate. A rental car, organized excursion or private driver is more practical for Masada, the scattered Galilee sites and a multi-stop coastal transfer. Trains between cities still require local connections to individual attractions.",
    route: ["Jerusalem Old City", "Jerusalem or regional excursion", "Masada & Dead Sea", "Nazareth & Galilee", "Sea of Galilee sites", "Galilee nature or heritage", "Akko & Haifa", "Haifa & Caesarea", "Tel Aviv–Jaffa", "Tel Aviv / departure"],
    map: { center: [32.05, 35.05], bounds: [34.52, 30.96, 35.84, 33.22], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Nazareth", lat: 32.7, lon: 35.3 }, { name: "Tiberias", lat: 32.79, lon: 35.54 }, { name: "Akko", lat: 32.93, lon: 35.08 }, { name: "Haifa", lat: 32.8, lon: 34.99 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Tel Aviv", lat: 32.08, lon: 34.78 }] },
    daysPlan: days10,
    reviewedAt: "2026-11-14",
    overviewRows: [
      { focus: "Jerusalem Old City", travel: "Walk / short local rides", night: "Jerusalem · after Day 1" },
      { focus: "Jerusalem or regional excursion", travel: "Walk / local rides or booked tour", night: "Jerusalem · after Day 2" },
      { focus: "Masada & Ein Bokek", travel: "Tour / car / private driver", night: "Jerusalem · after Day 3" },
      { focus: "Nazareth & first lakeside stop", travel: "Transfer north / car / bus + local rides", night: "Galilee · after Day 4" },
      { focus: "Capernaum & lakeside sites", travel: "Car / guided excursion / local rides", night: "Galilee · after Day 5" },
      { focus: "Galilee nature or heritage", travel: "Car / local driver / suitable tour", night: "Galilee · after Day 6" },
      { focus: "Akko & northern coast", travel: "Road/bus to Akko; rail or road onward", night: "Haifa · or Tel Aviv after Day 7" },
      { focus: "Haifa & Caesarea, or shortened coast", travel: "Car / tour / rail + local rides", night: "Tel Aviv · after Day 8" },
      { focus: "Old Jaffa & Tel Aviv", travel: "Walk / local bus or taxi", night: "Tel Aviv · after Day 9" },
      { focus: "Tel Aviv or departure", travel: "Walk + local rides / airport transfer", night: "Departure / optional Tel Aviv night" },
    ],
    daySequences: [
      { day: 1, steps: [
        { stop: "Jaffa Gate and Christian Quarter", time: "About 1–2 hrs" },
        { stop: "Church of the Holy Sepulchre", time: "About 1–2 hrs; access varies" },
        { stop: "Jewish Quarter and Western Wall", time: "About 1–2 hrs if time permits", optional: true },
      ] },
      { day: 2, steps: [
        { stop: "Israel Museum", time: "About 2–3 hrs" },
        { stop: "Mount of Olives and Gethsemane", time: "Separate city route; about 2–3 hrs", optional: true },
        { stop: "Bethlehem or Jericho excursion", time: "Separate half-day or longer trip", optional: true },
      ] },
      { day: 3, steps: [
        { stop: "Masada plateau", time: "About 2–3 hrs on site" },
        { stop: "Ein Bokek bathing beach", time: "About 1–2 hrs plus travel" },
        { stop: "Ein Gedi Nature Reserve", time: "Alternative; check access and trails", optional: true },
      ] },
      { day: 4, steps: [
        { stop: "Basilica of the Annunciation", time: "About 1–2 hrs including old town" },
        { stop: "Magdala archaeological site", time: "About 1–1½ hrs if arrival allows", optional: true },
        { stop: "Tiberias lakeside stop", time: "Around 30–60 mins if time allows", optional: true },
      ] },
      { day: 5, steps: [
        { stop: "Capernaum archaeological site", time: "About 1–1½ hrs" },
        { stop: "Mount of Beatitudes or Tabgha", time: "Around 45–90 mins per chosen site", optional: true },
        { stop: "Magdala or a lakeside break", time: "Around 1–2 hrs; optional", optional: true },
      ] },
      { day: 6, steps: [
        { stop: "Arbel viewpoint or marked trail", time: "Visit length depends on the route and conditions" },
        { stop: "Mount Tabor heritage visit", time: "Alternative; allow local travel", optional: true },
        { stop: "Tiberias waterfront and leisure", time: "Flexible relaxed alternative", optional: true },
      ] },
      { day: 7, steps: [
        { stop: "Old Akko Knights' Halls or tunnel", time: "About 1½–2½ hrs" },
        { stop: "Old Akko market and harbour", time: "Around 1–2 hrs" },
        { stop: "Rosh Hanikra detour north of Akko", time: "Optional; allow extra travel and verify access", optional: true },
      ] },
      { day: 8, steps: [
        { stop: "Haifa German Colony viewpoint", time: "Around 45–75 mins if based in Haifa" },
        { stop: "Upper Bahá’í Gardens panorama", time: "Alternative viewpoint; local transfer", optional: true },
        { stop: "Caesarea National Park", time: "About 2–3 hrs, plus intercity travel" },
      ] },
      { day: 9, steps: [
        { stop: "Old Jaffa hill and port", time: "About 1½–2 hrs" },
        { stop: "Neve Tzedek or Rothschild Boulevard", time: "About 1–2 hrs" },
        { stop: "Beach or Carmel Market", time: "Optional, depending on opening hours", optional: true },
      ] },
      { day: 10, steps: [
        { stop: "Tel Aviv museum", time: "Optional; with a full final day", optional: true },
        { stop: "Seafront promenade or a beach", time: "Optional; if flight timing permits", optional: true },
        { stop: "Carmel Market or final shopping", time: "Optional; check operating days", optional: true },
      ] },
    ],
    dayTipHeadings: [
      "Old City access and walking",
      "Choosing your second Jerusalem day",
      "Desert-day essentials",
      "The journey north and luggage",
      "Exploring the lakeside sites",
      "Choosing a Galilee nature or heritage day",
      "Akko access and the hotel decision",
      "Bahá’í Gardens and Caesarea logistics",
      "Getting around Tel Aviv and Jaffa",
      "Planning your departure",
    ],
    dayChoices: [
      { day: 2, options: [
        { heading: "Stay in Jerusalem", text: "Choose a museum day or a separate Mount of Olives route, with time for a neighbourhood walk or relaxed meal." },
        { heading: "Take a regional day trip", text: "A Bethlehem or Jericho tour replaces the Jerusalem programme and needs its own access and transport arrangements." },
      ] },
      { day: 6, options: [
        { heading: "Choose nature", text: "Visit an Arbel National Park viewpoint or choose a marked trail after checking difficulty, weather and entry arrangements." },
        { heading: "Prefer heritage or a slower day?", text: "Visit Mount Tabor or spend more time beside the Sea of Galilee, without adding a border-area trip." },
      ] },
      { day: 7, options: [
        { heading: "Stay in Haifa tonight", text: "After exploring Akko, continue to Haifa for the night. This makes tomorrow's gardens and Caesarea visit a logical southbound route." },
        { heading: "Avoid another hotel change", text: "Continue to Tel Aviv after Akko instead. Skip Haifa on Day 8 and choose Caesarea alone or a quieter city day without backtracking north." },
      ] },
      { day: 8, options: [
        { heading: "Starting from Haifa?", text: "Visit one Bahá’í Gardens viewpoint, then continue south to Caesarea and Tel Aviv. Guided terrace tours require a reservation." },
        { heading: "Already staying in Tel Aviv?", text: "Do not return to Haifa. Choose Caesarea as a separate outing, or stay in Tel Aviv for a slower day." },
      ] },
      { day: 10, options: [
        { heading: "A full sightseeing day", text: "Explore a museum, seafront or favourite Tel Aviv district if you depart on Day 11 or later." },
        { heading: "Flying home on Day 10?", text: "Morning or midday departures may leave no sightseeing time. With a later flight, limit activities to a short nearby stop and allow plenty of time for the airport journey, security and check-in." },
      ] },
    ],
    dayInlineLinks: [
      { day: 1, field: "morning", phrase: "Old City guide", to: "/travel-blog/old-city-jerusalem/" },
      { day: 1, field: "evening", phrase: "Mahane Yehuda", to: "/travel-blog/shopping-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Israel Museum", to: "/travel-blog/museums-in-jerusalem/" },
      { day: 2, field: "morning", phrase: "Mount of Olives", to: "/travel-blog/mount-of-olives/" },
      { day: 2, field: "practical", phrase: "Bethlehem", to: "/travel-blog/jerusalem-to-bethlehem/" },
      { day: 3, field: "morning", phrase: "Masada National Park", to: "/travel-blog/masada/" },
      { day: 3, field: "afternoon", phrase: "Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/" },
      { day: 3, field: "afternoon", phrase: "Ein Gedi Nature Reserve", to: "/travel-blog/ein-gedi/" },
      { day: 3, field: "practical", phrase: "Masada and Dead Sea day tours", to: "/tours/masada-dead-sea/" },
      { day: 3, field: "practical", phrase: "Jerusalem to Dead Sea guide", to: "/travel-blog/jerusalem-to-the-dead-sea/" },
      { day: 4, field: "morning", phrase: "Basilica of the Annunciation", to: "/travel-blog/basilica-of-the-annunciation/" },
      { day: 4, field: "afternoon", phrase: "Magdala", to: "/travel-blog/magdala/" },
      { day: 4, field: "overnight", phrase: "Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      { day: 5, field: "morning", phrase: "Capernaum", to: "/travel-blog/capernaum/" },
      { day: 5, field: "afternoon", phrase: "Tabgha", to: "/travel-blog/tabgha/" },
      { day: 6, field: "morning", phrase: "Mount Tabor", to: "/travel-blog/mount-tabor/" },
      { day: 6, field: "afternoon", phrase: "travel advice", to: "/travel-blog/israel-travel-tips/" },
      { day: 7, field: "morning", phrase: "Old Akko", to: "/travel-blog/akko-acre/" },
      { day: 7, field: "afternoon", phrase: "Rosh Hanikra", to: "/travel-blog/rosh-hanikra/" },
      { day: 7, field: "overnight", phrase: "Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { day: 8, field: "morning", phrase: "Bahá’í Gardens", to: "/travel-blog/haifa/" },
      { day: 8, field: "afternoon", phrase: "Caesarea National Park", to: "/attractions/caesarea/" },
      { day: 8, field: "overnight", phrase: "Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { day: 9, field: "morning", phrase: "Old Jaffa", to: "/travel-blog/jaffa/" },
      { day: 9, field: "afternoon", phrase: "Carmel Market", to: "/travel-blog/attractions-in-tel-aviv/" },
      { day: 10, field: "morning", phrase: "Tel Aviv museum", to: "/travel-blog/museums-in-tel-aviv/" },
      { day: 10, field: "practical", phrase: "airport transfer options", to: "/airport-transfers/" },
    ],
    dayOfficialLinks: [
      { day: 3, field: "morning", phrase: "official Masada visitor page", href: "https://en.parks.org.il/reserve-park/masada-national-park/" },
      { day: 4, field: "morning", phrase: "official Franciscan sanctuary information", href: "https://www.custodia.org/en/sanctuaries/nazareth-basilica-of-the-annunciation/" },
      { day: 4, field: "afternoon", phrase: "visiting hours", href: "https://www.magdala.org/plan-your-visit" },
      { day: 5, field: "morning", phrase: "official Capernaum National Park visitor information", href: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/" },
      { day: 6, field: "morning", phrase: "official Arbel visitor information", href: "https://en.parks.org.il/reserve-park/arbel-national-park-and-nature-reserve/" },
      { day: 7, field: "morning", phrase: "official Old Akko visiting information", href: "https://www.akko.org.il/en/activity-time/" },
      { day: 8, field: "morning", phrase: "official Bahá’í Gardens visitor information", href: "https://ganbahai.org.il/visit-us-haifa/" },
      { day: 8, field: "afternoon", phrase: "official Caesarea park page", href: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
    ],
    activityWidgets: [
      { day: 1, city: "jerusalem" },
      { day: 8, city: "haifa" },
      { day: 9, city: "telAviv" },
    ],
    jerusalemTourOptionsDay: 3,
    alternatives: [
      { title: "Prefer Eilat and Timna? Choose a southern 10-day route", text: "Do not add Eilat onto this Galilee itinerary. Instead spend Days 1–3 in Jerusalem and at the Dead Sea, Days 4–5 in Tel Aviv or on a short coastal trip, Days 6–8 based in Eilat (including a dedicated Timna Park day), and Day 9 returning to central Israel ahead of your Day 10 departure. Allow a full travel day for each long transfer and verify operating routes and hotel nights.", to: "/travel-blog/eilat/", label: "Eilat travel guide" },
      { title: "Prefer the Negev and Ramon Crater?", text: "Replace several Galilee and coastal days with a planned overnight in Mitzpe Ramon and a separate desert sightseeing day. This is a different route with different transport and hotel needs, not a quick detour between Jerusalem and Tel Aviv.", to: "/travel-blog/mitzpe-ramon-crater/", label: "Ramon Crater guide" },
    ],
    logistics: [
      { heading: "Keep hotel changes purposeful", text: "Use Jerusalem accommodation for three nights and Tiberias hotel options for the next three. A Haifa night supports a full Haifa–Caesarea transfer, while Tel Aviv hotel areas suit the coastal finish. If you skip Haifa as a base, adjust Day 8 rather than returning north.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Jerusalem accommodation" },
      { heading: "Choose transport for the long travel days", text: "Masada and Dead Sea tours are practical alternatives to self-driving in the desert. For the Galilee and coast, a car, private driver or organized trip reduces station-to-attraction transfers; the Israel transport guide explains rail and bus options.", to: "/travel-blog/getting-around-israel/", label: "Israel transport guide" },
      { heading: "Keep the northern coast route coherent", text: "After Akko, stay in Haifa for a morning viewpoint followed by Caesarea on the way to Tel Aviv. If staying in Tel Aviv instead, choose one coastal outing on Day 8 rather than travelling back to Haifa.", to: "/tours/caesarea-haifa-acre/", label: "Coastal tour options" },
      { heading: "Plan luggage on transfer days", text: "Check hotel check-out times, driver or tour luggage capacity and the connection to your next hotel before booking the northbound and southbound journeys.", to: "/travel-blog/getting-around-israel/", label: "Getting around Israel" },
      { heading: "Plan the airport journey by departure date", text: "Allow for the journey from your actual Tel Aviv hotel or final sightseeing stop to Ben Gurion Airport, including airline check-in and security. Airport transfers can help when rail or buses are unavailable or indirect.", to: "/airport-transfers/", label: "Airport transfers" },
    ],
    logisticsInlineLinks: [
      { index: 0, phrase: "Jerusalem accommodation", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { index: 0, phrase: "Tiberias hotel options", to: "/travel-blog/best-hotels-in-tiberias/" },
      { index: 0, phrase: "Tel Aviv hotel areas", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { index: 1, phrase: "Masada and Dead Sea tours", to: "/tours/masada-dead-sea/" },
      { index: 1, phrase: "Israel transport guide", to: "/travel-blog/getting-around-israel/" },
      { index: 2, phrase: "coastal outing", to: "/tours/caesarea-haifa-acre/" },
      { index: 4, phrase: "Airport transfers", to: "/airport-transfers/" },
    ],
    beforeYouGo: [
      { heading: "Check entry requirements and travel advice", text: "Visa or ETA-IL eligibility depends on your passport. Review the official Israel entry information and current travel advice before making non-refundable bookings, especially for optional excursions near restricted areas.", to: "/travel-blog/israel-travel-tips/", label: "Israel travel essentials" },
      { heading: "Plan around Shabbat and holidays", text: "Trains and many bus services do not operate for much of Shabbat. Check Israel Railways and local opening calendars for your actual dates, including gardens, museums and markets.", to: "/travel-blog/getting-around-israel/", label: "Israel transport guide" },
      { heading: "Confirm national parks and heritage access", text: "Masada, Capernaum, Caesarea, Akko and the Bahá’í Gardens have different opening hours, access arrangements and potential closures. Use the official links within the daily itinerary rather than assuming availability.", to: "/travel-blog/masada/", label: "Masada guide" },
      { heading: "Allow for hotel transfers and luggage", text: "Check bags, accommodation check-in and onward station connections on Days 4, 7 and 8. Avoid booking activities too close to a hotel change or a flight.", to: "/travel-blog/getting-around-israel/", label: "Getting around Israel" },
    ],
    beforeYouGoOfficialLinks: [
      { index: 0, phrase: "official Israel entry information", href: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
      { index: 1, phrase: "Israel Railways", href: "https://www.rail.co.il/" },
    ],
    faqs: [
      { q: "Are ten days enough to visit Jerusalem, the Galilee and Tel Aviv?", a: "Yes, with ten usable sightseeing days and arrival before Day 1. This route combines Jerusalem, a Dead Sea excursion, the Galilee, Akko, Haifa, Caesarea and Tel Aviv. A Day 10 departure shortens the final day; an early flight may leave no sightseeing time." },
      { q: "How many hotels and nights do I need?", a: "The full route uses Jerusalem for three nights, Tiberias or the Galilee for three, Haifa for one and Tel Aviv for two. To avoid the Haifa hotel change, continue to Tel Aviv after Akko and shorten Day 8. Add arrival or departure nights based on your flights." },
      { q: "Can I follow the ten-day route without renting a car?", a: "Yes, with more careful planning. City days are relatively straightforward on foot and by public transport when it operates, but the desert, dispersed Galilee stops and multi-stop coastal days benefit from a guided excursion, car or private driver." },
      { q: "What should I visit around the Sea of Galilee?", a: "Choose two or three of Capernaum, Mount of Beatitudes, Tabgha and Magdala on Day 5. Day 6 can focus on Arbel National Park, Mount Tabor or a relaxed lakeside day rather than adding another distant circuit." },
      { q: "Do I need to stay overnight in Haifa after Akko?", a: "Not necessarily. Staying in Haifa makes the next day's gardens-and-Caesarea trip more logical. If you prefer fewer hotels, continue to Tel Aviv on Day 7 and use Day 8 for Caesarea alone or sightseeing in Tel Aviv, without returning north to Haifa." },
      { q: "Can I include Eilat and Timna in ten days?", a: "Yes as a different itinerary, not as extra stops. Replace the Galilee and much of the northern coast with several nights in Eilat, a dedicated Timna visit and time to return to central Israel before your international flight." },
      { q: "How do Shabbat and holidays change the itinerary?", a: "Rail and many bus services stop for much of Shabbat, and parks, religious sites, markets and gardens can follow different calendars. Check your exact dates and rearrange visits or book suitable transport where necessary." },
      { q: "What if my flight leaves on Day 10?", a: "Morning or midday flights can eliminate Day 10 sightseeing. For an evening departure, plan at most a short nearby activity and allow ample time for the journey to Ben Gurion Airport, security and airline check-in." },
    ],
    relatedGuides: [
      { title: "Jerusalem Old City", description: "Gates, historic quarters and walking routes.", to: "/travel-blog/old-city-jerusalem/", image: "itinerary-jerusalem-old-city" },
      { title: "Masada and the Dead Sea", description: "Desert sites, bathing precautions and access.", to: "/travel-blog/masada/", image: "itinerary-dead-sea-shore" },
      { title: "Sea of Galilee", description: "Lakeside stops and heritage-site connections.", to: "/travel-blog/sea-of-galilee/", image: "magdala-archaeology" },
      { title: "Akko Old City", description: "Crusader halls, markets and harbour heritage.", to: "/travel-blog/akko-acre/", image: "itinerary-10day-akko-aerial" },
      { title: "Haifa", description: "Bahá’í Gardens viewpoints and coastal sights.", to: "/travel-blog/haifa/", image: "EXISTING:haifa" },
      { title: "Getting around Israel", description: "Trains, buses and practical regional transport.", to: "/travel-blog/getting-around-israel/", image: "itinerary-train" },
    ],
    hero: "itinerary-10day-cover",
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
  "10": [
    itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!,
    { label: "Basilica of the Annunciation — Franciscan visiting details", url: "https://www.custodia.org/en/sanctuaries/nazareth-basilica-of-the-annunciation/" },
    { label: "Magdala — archaeological park visitor information", url: "https://www.magdala.org/plan-your-visit" },
    { label: "Capernaum National Park — visitor information", url: "https://en.parks.org.il/reserve-park/kfar-nahum-capernaum-national-park/" },
    { label: "Arbel National Park — viewpoint and hiking route access", url: "https://en.parks.org.il/reserve-park/arbel-national-park-and-nature-reserve/" },
    { label: "Old Akko — heritage-site opening times", url: "https://www.akko.org.il/en/activity-time/" },
    { label: "Haifa Bahá’í Gardens — self-guided viewpoints and guided tours", url: "https://ganbahai.org.il/visit-us-haifa/" },
    { label: "Caesarea National Park — opening and last-entry times", url: "https://en.parks.org.il/reserve-park/caesarea-national-park/" },
    { label: "Timna Park — visitor transport and access", url: "https://parktimna.co.il/en/know-before-your-visit/navigating-timna-park/" },
    { label: "Israel entry and ETA-IL information", url: "https://www.gov.il/en/departments/topics/eta-il/govil-landing-page" },
  ],
};
