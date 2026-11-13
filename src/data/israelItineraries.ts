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
    overnight: "Jerusalem, night 1 of 3. Compare where to stay in Jerusalem for a convenient base.",
    links: [jerusalem, jerusalemHotels, L("Shopping in Jerusalem", "/travel-blog/shopping-in-jerusalem/")],
  },
  { ...days3[1]!,
    name: "Masada and the Dead Sea: desert landscapes",
    morning: "Leave Jerusalem early for the eastern Masada National Park entrance via Road 90, with its cable car and Snake Path. The Roman Ramp is reached by a separate western approach. Plan about two to three hours for the fortress itself, in addition to the journey and queues. Check the official Masada park page for entry times, the last cable car and any heat-related trail closures.",
    afternoon: "Continue to a designated bathing area at Ein Bokek for about one to two hours of changing, floating and showering. The Dead Sea visitor guide covers bathing precautions, while the Dead Sea attractions guide describes other stops. Ein Gedi Nature Reserve works as an alternative outing when relevant trails and access are open.",
    evening: "Return to Jerusalem with time for the drive and a relaxed evening at the same hotel.",
    practical: "Bring drinking water, sun protection and suitable footwear. Masada and Dead Sea day tours, a rental car and a private driver offer different levels of flexibility; for self-drive planning, see how to get from Jerusalem to the Dead Sea.",
    overnight: "Jerusalem, night 2 of 3 — same hotel.",
    links: [masada, deadSea, L("Jerusalem to Dead Sea transport", "/travel-blog/jerusalem-to-the-dead-sea/")],
  },
  { ...fiveExtra[0]!,
    name: "Another side of Jerusalem — or a regional excursion",
    image: "itinerary-5day-jerusalem-museum",
    morning: "The Israel Museum is a rewarding choice for archaeology, art and the Shrine of the Book; allow a substantial visit rather than a quick stop. For religious heritage and city views, a Mount of Olives route through viewpoints and Gethsemane offers a different Jerusalem experience.",
    afternoon: "Continue with the Jerusalem option that interests you most. Alternatively, a separately arranged Bethlehem visit or a Jericho and Jordan Valley excursion can take the place of the city programme, with its own departure, access and return arrangements.",
    evening: "Enjoy your final Jerusalem evening around the centre or hotel district, ready for the move to Tel Aviv the following morning.",
    practical: "Bethlehem and Jericho have different access rules from sightseeing in Jerusalem. Check current travel advice, eligibility to enter the planned areas and the tour operator's actual route before arranging the excursion.",
    overnight: "Jerusalem, night 3 of 3 — no hotel change.",
    links: [L("Museums in Jerusalem", "/travel-blog/museums-in-jerusalem/"), L("Mount of Olives", "/travel-blog/mount-of-olives/"), L("Jerusalem to Bethlehem", "/travel-blog/jerusalem-to-bethlehem/")],
  },
  { ...days3[2]!,
    name: "Tel Aviv–Jaffa: old port, neighbourhoods and sea",
    morning: "Travel from Jerusalem to Tel Aviv by train when services are running; the Israel Railways journey planner helps with the actual departure day. Allow an onward bus or taxi ride from the station to Old Jaffa, then explore its historic hill, port and nearby flea-market streets.",
    afternoon: "Walk toward Neve Tzedek and the seafront promenade, stopping at one of the beaches in Tel Aviv if the weather suits. Carmel Market or one of the Tel Aviv museums makes a good alternative for visitors more interested in food, art or local culture.",
    evening: "Spend the evening along the promenade or in a neighbourhood restaurant after checking into your Tel Aviv hotel.",
    practical: "Tel Aviv's railway stations are not in Old Jaffa or on the beach. Plan the final local connection with your luggage in mind, and check how to get around Tel Aviv when choosing a hotel area.",
    overnight: "Tel Aviv, night 4. Compare where to stay in Tel Aviv before booking.",
    links: [telaviv, telavivHotels, L("Tel Aviv transport", "/travel-blog/getting-around-tel-aviv/")],
  },
  { ...fiveExtra[1]!,
    name: "Caesarea and Haifa: archaeology and coastal views",
    image: "itinerary-5day-caesarea",
    morning: "Head north from Tel Aviv for Caesarea National Park. Allow about two to three hours for the Roman theatre, harbour remains and Crusader-era setting, plus transport. The official Caesarea park page lists opening hours and the last admission time.",
    afternoon: "Continue to Haifa for the German Colony, the view up toward the Bahá’í Gardens and a viewpoint on Mount Carmel. A self-guided viewpoint visit is different from a guided terrace tour, which needs advance reservation; check the official Bahá’í Gardens visitor information.",
    evening: "Return to Tel Aviv if your onward travel begins there. With a flight on Day 5, a shorter Caesarea-only visit or a relaxed Tel Aviv day gives the airport journey a safer margin.",
    practical: "Caesarea's national park and Haifa's hillside sights are not next to railway stations. A guided coastal excursion, rental car or private driver can connect both; on public transport, compare a simpler single-stop day. See Caesarea and Haifa day tour options.",
    overnight: "Depart after Day 5, or add another Tel Aviv night if leaving later. Stay in Haifa only if continuing north.",
    links: [caesarea, haifa, L("Haifa accommodation", "/travel-blog/best-hotels-in-haifa/")],
  },
];

const days7: ItineraryDay[] = [
  { ...days3[0]!,
    morning: "Start with one side of Jerusalem's Old City, deciding between a detailed Christian Quarter route and the Western Wall approach rather than treating all sites as adjacent.",
    afternoon: "Add a second walking area or a museum only when the morning visits leave enough time. An extra Jerusalem day tomorrow means there is no need to crowd everything into today.",
    evening: "Visit Jaffa Road or a central restaurant if time allows.",
    practical: "If your accommodation is in the Old City, ask which gate allows a practical luggage drop-off. The nearest gate on a map may not offer vehicle access.",
    overnight: "Jerusalem, with the next two nights in the same base.",
  },
  { ...fiveExtra[0]!,
    morning: "Spend the second day on the Israel Museum, modern city neighborhoods or a Mount of Olives itinerary depending on your interests. These areas are not an easy single pedestrian circuit.",
    afternoon: "If religious heritage is the focus, add a timed view from the Mount of Olives. Bethlehem or Jericho belong to a separate planned regional excursion and can replace this program.",
    evening: "Use the same Jerusalem base and enjoy a local dinner instead of packing for another hotel.",
    practical: "Access to Bethlehem and Jericho follows different arrangements from local Jerusalem sightseeing. Confirm current guidance, the authorized operator and return rather than improvising a same-day border crossing.",
  },
  { ...days3[1]!,
    morning: "This is the last full day from your Jerusalem base: leave early for Masada and make sure your chosen visit method is available on your date.",
    afternoon: "Continue to the Dead Sea with enough time for a designated bathing stop, then begin the return without squeezing in every desert attraction.",
    evening: "Return to Jerusalem and prepare for the northbound transfer the following day.",
    practical: "A long desert day followed by tomorrow's northbound move is easier if you return to the same Jerusalem hotel. Treat Ein Gedi only as a deliberate substitute if current access permits.",
    overnight: "Jerusalem, final night before changing regions.",
  },
  {
    name: "Nazareth and a first Sea of Galilee stop", region: "Lower Galilee", image: "basilica-of-the-annunciation",
    morning: "Leave Jerusalem for Nazareth. Focus on the Basilica of the Annunciation and a limited part of the old city rather than squeezing a full northern itinerary into the travel morning.",
    afternoon: "Continue toward the Sea of Galilee. Magdala or a relaxed lakeside visit can work as a first stop depending on opening hours and the timing of your arrival.",
    evening: "Check in near Tiberias or another suitable Galilee base. Having a northern room avoids a long return to Jerusalem.",
    practical: "Driving and public-transport itineraries differ significantly around dispersed Galilee sites. A train or intercity bus gets you to a hub, not necessarily to an archaeological site entrance.",
    overnight: "Tiberias or a northern Galilee base, first of two nights.",
    links: [nazareth, lake, tiberiasHotels],
  },
  {
    name: "Sea of Galilee: select your lakeside sites", region: "Sea of Galilee", image: "EXISTING:galilee",
    morning: "Choose Capernaum and the Mount of Beatitudes, checking each site's current visit conditions and the travel between them. Visiting a series of churches is not the same as walking a compact city center.",
    afternoon: "Add Tabgha or Magdala, or spend the time by the lake. If nature matters more than heritage, substitute a separately planned trail or northern excursion rather than treating the whole Golan as an afternoon stop.",
    evening: "Return to your northern accommodation. Use the spare time for dinner in the town or at the hotel, depending on where you are based.",
    practical: "A rental car, agreed driver or suitable guided excursion is often the clearest way to link dispersed lakeside sites. Confirm what is actually included with any booked tour.",
    overnight: "Same Tiberias or Galilee base.",
    links: [L("Capernaum", "/travel-blog/capernaum/"), L("Tabgha", "/travel-blog/tabgha/"), lake],
  },
  {
    name: "Haifa and Caesarea on the way south", region: "Haifa and coast", image: "EXISTING:haifa",
    morning: "Drive toward Haifa and choose a gardens viewpoint, the German Colony or one museum according to your interests. The Bahá’í Gardens guided terraces require separate reservation; an open viewpoint is a different visit.",
    afternoon: "Continue to Caesarea's archaeological park if you have enough time. The visit works particularly well when it is part of the transfer south, rather than as a separate round trip from Tel Aviv.",
    evening: "Reach Tel Aviv, check into your last hotel and keep the evening relatively flexible after the intercity journey.",
    practical: "If using rail and buses instead of a car, consider choosing Haifa or Caesarea rather than forcing both; the final transfers between attractions and stations take time.",
    overnight: "Tel Aviv: move to the coast for the final night.",
    links: [haifa, caesarea, telavivHotels],
  },
  { ...days3[2]!,
    morning: "Use the last full day for Jaffa's historic hill and flea market, or stay farther north if your hotel and luggage arrangements make that easier.",
    afternoon: "Move toward the promenade and choose a final museum, Neve Tzedek stroll or beach break. You have already covered the country's principal regions; keep the closing day deliberately flexible.",
    evening: "Plan the airport departure separately from the sightseeing day. If you have an early flight tomorrow, choose dinner near the hotel.",
    practical: "For hotels by the sea or in Old Jaffa, the nearest railway station may still require a taxi or bus. Check Saturday services and your actual international departure.",
    overnight: "Tel Aviv if extending the trip; otherwise plan your airport departure separately.",
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
    intro: "Five full sightseeing days offer a rewarding mix of Jerusalem’s historic quarters, Masada and the Dead Sea, Tel Aviv–Jaffa and the northern coast. With time for a second Jerusalem day and a choice of excursions, the route suits different interests and travel styles.",
    idealFor: "First-time visitors who enjoy historic sites, the desert and Mediterranean cities",
    reality: "This itinerary works best with five usable sightseeing days and arrival before Day 1. The desert outing and the Caesarea–Haifa journey each deserve their own full day; an evening flight on Day 5 calls for a shorter coastal programme.",
    hotelBases: "Jerusalem for nights 1–3, then Tel Aviv for night 4. Add a Tel Aviv night after Day 5 only if departing later; count arrival and departure nights according to your flights.",
    noCarAdvice: "The route can be tailored to different budgets, group sizes and preferred travel styles. Jerusalem and Tel Aviv are comfortable to explore on foot and by public transport, while the desert and northern-coast days can be organized tours, self-drive outings or trips with a private driver.",
    route: ["Jerusalem Old City", "Masada & Dead Sea", "Jerusalem or regional excursion", "Tel Aviv–Jaffa", "Caesarea & Haifa"],
    map: { center: [31.78, 35.05], bounds: [34.57, 30.97, 35.69, 33.08], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Tel Aviv–Jaffa", lat: 32.065, lon: 34.76 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Haifa", lat: 32.8, lon: 34.99 }] },
    daysPlan: days5,
    reviewedAt: "2026-11-14",
    overviewRows: [
      { focus: "Old City of Jerusalem", travel: "Walk / short local ride", night: "Jerusalem · night 1" },
      { focus: "Masada & Ein Bokek", travel: "Tour / car / private driver", night: "Jerusalem · night 2" },
      { focus: "Jerusalem or Bethlehem / Jericho excursion", travel: "Walk / local ride or organized tour", night: "Jerusalem · night 3" },
      { focus: "Old Jaffa & Tel Aviv", travel: "Train when running + local ride", night: "Tel Aviv · night 4" },
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
        { stop: "Haifa's German Colony", time: "Around 45–75 mins" },
        { stop: "Bahá’í Gardens designated viewpoint", time: "Around 30–60 mins; check access" },
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
        { heading: "Spend the day in Jerusalem", text: "Explore the Israel Museum at a relaxed pace, or take a Mount of Olives and Gethsemane route for viewpoints and religious heritage. These are different city experiences, with time for a neighbourhood or café afterwards." },
        { heading: "Prefer a regional day trip?", text: "A planned tour to Bethlehem or the Jericho and Jordan Valley area can take the place of the city programme. The destinations, entry arrangements and time commitments differ, so choose according to your interests and available time." },
      ] },
      { day: 5, options: [
        { heading: "Have a full sightseeing day?", text: "Combine Caesarea's archaeological park with the German Colony and a designated Bahá’í Gardens viewpoint in Haifa, allowing plenty of time to return to Tel Aviv." },
        { heading: "Flying home on Day 5?", text: "A shorter visit to Caesarea alone, or a relaxed final day in Tel Aviv, leaves more room for the airport journey, security procedures and airline check-in." },
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
      { day: 3, field: "afternoon", phrase: "Bethlehem visit", to: "/travel-blog/jerusalem-to-bethlehem/" },
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
    jerusalemTourOptionsDay: 3,
    activityWidgets: [{ day: 1, city: "jerusalem" }, { day: 4, city: "telAviv" }],
    alternatives: [],
    logistics: [
      { heading: "Keep the hotel changes simple", text: "A convenient Jerusalem accommodation base covers the first three nights; Tel Aviv hotel areas suit the coastal section. One transfer between hotels is usually enough for this route.", to: "/travel-blog/where-to-stay-in-jerusalem/", label: "Jerusalem accommodation" },
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
      { q: "Where should I stay for this five-day itinerary?", a: "Three nights in Jerusalem and a night in Tel Aviv keep hotel changes manageable. Add a Tel Aviv night after Day 5 when flying out on a later day." },
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
    title: "7-Day Israel Itinerary: Jerusalem, Galilee & Coast",
    description: "A realistic one-week Israel route through Jerusalem, Masada, Dead Sea, Nazareth, Sea of Galilee, Haifa, Caesarea and Tel Aviv. Day-by-day planning.",
    intro: "A week provides enough time to combine Israel's central cities, a desert excursion and a northern overnight stay. This route favors three hotel bases over repeated long drives and treats the Golan Heights as an optional substitute for Galilee sightseeing.",
    idealFor: "First-time visitors with seven full sightseeing days and an interest in history and regional travel",
    reality: "You will change regions twice. Two northern nights are more useful than attempting the Galilee entirely as a day trip from Jerusalem.",
    hotelBases: "Jerusalem for three nights, the Tiberias/Galilee area for two and Tel Aviv for the final night; adjust to flights.",
    noCarAdvice: "Use trains and buses for city connections where practical, but plan northern sites individually: national parks, churches and lakeside viewpoints may be far from the nearest intercity stop. A short rental or organized regional excursions can simplify those days.",
    route: ["Jerusalem", "Masada & Dead Sea", "Nazareth", "Sea of Galilee", "Haifa & Caesarea", "Tel Aviv–Jaffa"],
    map: { center: [32.03, 35.07], bounds: [34.52, 30.96, 35.84, 33.22], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Nazareth", lat: 32.7, lon: 35.3 }, { name: "Tiberias", lat: 32.79, lon: 35.54 }, { name: "Haifa", lat: 32.8, lon: 34.99 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Tel Aviv", lat: 32.08, lon: 34.78 }] },
    daysPlan: days7,
    alternatives: [
      { title: "Nature over churches?", text: "Replace selected Sea of Galilee heritage sites with a northern trail or nature reserve if weather, regulations and access permit. Do not assume a border-area destination is currently suitable." },
      { title: "Less moving between hotels?", text: "Swap the second northern sightseeing day for a Jerusalem or Tel Aviv day and keep two city bases. The shorter route will cover fewer regions but require less packing." },
      { title: "Travel without a rental car?", text: "Consider a regional day tour out of your northern base and use rail for the coastal intercity leg when operating. Check the return and local connections separately.", to: "/tours/nazareth-sea-of-galilee/", label: "Galilee tour options" },
    ],
    logistics: [
      { heading: "Why the northern overnight matters", text: "Nazareth, Capernaum and the Mount of Beatitudes are distinct destinations, not one pedestrian cluster. Two northern nights give flexibility for site hours, meals and travel.", to: "/travel-blog/best-hotels-in-tiberias/", label: "Northern hotel bases" },
      { heading: "Use coast stops as a transfer day", text: "Haifa and Caesarea fit more naturally while traveling from the Galilee to Tel Aviv than on a new return excursion from Tel Aviv.", to: "/tours/caesarea-haifa-acre/", label: "Coastal excursion options" },
      { heading: "Plan the airport leg separately", text: "The Tel Aviv-to-airport connection may work by rail when operating, but the beach and Jaffa areas require another connection to a railway station.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", label: "Tel Aviv airport options" },
    ],
    faqs: [
      { q: "Is one week enough for Jerusalem and the Galilee?", a: "Yes, if you stay a couple of nights in the north instead of driving back to Jerusalem every evening. Keep the last day near the departure city." },
      { q: "Does this itinerary include the Golan Heights?", a: "Not in the main route. It is an optional replacement for a northern day and depends on current access, travel guidance and your interests." },
      { q: "Is three hotel bases too many?", a: "For travelers covering Jerusalem, the Galilee and Tel Aviv, three bases limit repetitive intercity journeys. Those prioritizing a relaxed city break can stay in two." },
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
  "7": [itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!],
  "10": [itinerarySources[0]!, itinerarySources[1]!, itinerarySources[2]!, itinerarySources[3]!, itinerarySources[4]!],
};
