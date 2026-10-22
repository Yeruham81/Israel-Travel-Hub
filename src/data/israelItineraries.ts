import type { LinkProps } from "@tanstack/react-router";
import { migrationPhotos } from "@/data/guideMigrationPhotos";

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
  hero: keyof typeof migrationPhotos;
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
    name: "Jerusalem: the Old City without a sightseeing sprint", region: "Jerusalem", image: "EXISTING:jerusalem",
    morning: "Begin at one Old City gate and select two or three priorities rather than trying to see every religious landmark. The Western Wall and the Christian Quarter follow different walking routes; the Old City has steps, uneven stone streets and site-specific access rules.",
    afternoon: "Choose either more Old City time or one major modern Jerusalem stop, such as the Israel Museum. If the morning ran long, stay within the walls instead of adding the museum purely to complete a checklist.",
    evening: "Walk along Jaffa Road or explore food options near Mahane Yehuda, allowing for Friday and Saturday business-hour changes.",
    practical: "Set your walking route according to the gate and your hotel, not a straight-line map distance. Visiting the Temple Mount/Haram al-Sharif is never guaranteed and follows separate entry rules.",
    overnight: "Jerusalem: two nights is usually simplest when the following day is the desert excursion.",
    links: [jerusalem, jerusalemHotels, L("Jerusalem museums", "/travel-blog/museums-in-jerusalem/")],
  },
  {
    name: "Masada and a managed Dead Sea beach", region: "Judean Desert", image: "EXISTING:masada",
    morning: "Leave Jerusalem early for Masada. Decide between the cable car and an approved hiking approach before traveling; heat restrictions, site opening and the last ascent can make an apparently easy late visit impractical.",
    afternoon: "Continue to a designated bathing beach around Ein Bokek if conditions permit. Plan time for changing, rinsing and the return drive; swimming arrangements are not interchangeable with a hotel spa booking.",
    evening: "Return to the same Jerusalem hotel unless your onward plans clearly justify moving your bags to a Dead Sea resort.",
    practical: "Do not treat Ein Gedi Nature Reserve as a guaranteed extra stop: trails and access can be restricted, and it is a different destination from an Ein Bokek bathing beach.",
    overnight: "Jerusalem again; choose an Ein Bokek night only if you deliberately want more resort time.",
    links: [masada, deadSea, deadSeaHotels],
  },
  {
    name: "Tel Aviv and Old Jaffa on the coast", region: "Tel Aviv–Jaffa", image: "EXISTING:coast",
    morning: "Travel to Old Jaffa and explore the historic hill, the old port and the flea-market quarter. Allow for uphill lanes and pedestrian sections rather than scheduling a vehicle stop at each sight.",
    afternoon: "Choose between Neve Tzedek and Rothschild Boulevard or a longer beach-and-promenade break. The Carmel Market is an alternative, not an obligation on a short final day.",
    evening: "Dine near your accommodation or return to Ben Gurion Airport with a realistic margin for the actual international flight and airport procedures.",
    practical: "If this is also your flight day, fit sights around the departure window. Avoid making the Dead Sea–Tel Aviv transition and an international flight an unplanned same-day chain.",
    overnight: "Tel Aviv if staying an extra night; otherwise depart on a separately planned airport journey.",
    links: [telaviv, telavivHotels, L("Tel Aviv airport connection", "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/")],
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
    morning: "Give the Old City a full morning: choose a logical gate-to-gate walk through the sites that matter to you, rather than combining all quarters and every church in one crowded loop.",
    afternoon: "Use the afternoon for a focused museum visit or additional Old City exploration. Keep major viewpoints for the separate Jerusalem day; five days allow better pacing than a one-day city visit.",
    evening: "Dine around Downtown or Mahane Yehuda if operating, or enjoy the quieter streets around Mamilla.",
    practical: "The Western Wall, Holy Sepulchre and Temple Mount/Haram al-Sharif have different access and etiquette. A listed place does not establish permission to enter on a specific date.",
    overnight: "Jerusalem: stay in one hotel for the first three nights.",
  },
  { ...days3[1]!,
    morning: "Use the day for a genuine desert outing: reach Masada early enough for the actual visiting window, with its cable car or a permissible trail as an explicit choice.",
    afternoon: "Reserve a separate block of time for Ein Bokek's designated bathing area and changing facilities; do not add Ein Gedi unless a specific open trail and return schedule are confirmed.",
    evening: "Return to your Jerusalem base instead of checking into a resort just for one night.",
    practical: "A combined Masada–Dead Sea trip is not guaranteed by purchasing entry to either site. Choose public transport, an actual organized product or an agreed driver according to the dated itinerary.",
    overnight: "Jerusalem, keeping the same base for the next day's city sights.",
  },
  fiveExtra[0]!,
  { ...days3[2]!,
    morning: "Arrive in Tel Aviv and head to Old Jaffa for the harbor and old streets. If arriving from Jerusalem that morning, allow time for the station-to-hotel connection.",
    afternoon: "Choose a market-and-neighborhood walk through Neve Tzedek and southern Tel Aviv or a beach break. Trying to do both plus multiple museums is not essential.",
    evening: "Spend the evening by the promenade or the central neighborhoods. If visiting the coast tomorrow, stay in Tel Aviv rather than making a separate late-night transfer.",
    practical: "Tel Aviv HaHagana and Savidor railway stations are not on the beach. Match the final local transfer to the hotel area, especially with luggage.",
    overnight: "Tel Aviv: generally the practical base for the final coastal day.",
  },
  fiveExtra[1]!,
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
    description: "Plan 3 full days in Israel with a practical Jerusalem, Masada and Dead Sea, and Tel Aviv itinerary. Hotels, transport options, what to skip and useful guides.",
    intro: "Three full sightseeing days are enough for an introduction to Jerusalem and Tel Aviv, with a desert day if that is a priority. This plan is intentionally selective: it does not pretend that three days include every major region or that a landing day is a full sightseeing day.",
    idealFor: "First-time visitors with three usable days, comfortable with one full excursion day",
    reality: "Two hotel bases at most; an optional Dead Sea day means an early start and a full return journey. If flights eat into your three days, skip a region rather than race through three.",
    hotelBases: "Stay in Jerusalem for the first two nights; add Tel Aviv only when the departure schedule justifies it.",
    noCarAdvice: "Jerusalem and Tel Aviv work without a rental car. For Masada and the Dead Sea, compare a date-specific tour, an agreed private driver or a carefully checked bus itinerary; do not assume a single easy public connection covers both sites.",
    route: ["Jerusalem", "Masada & Dead Sea", "Tel Aviv–Jaffa"],
    map: { center: [31.55, 35.04], bounds: [34.57, 30.97, 35.69, 32.37], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Ein Bokek", lat: 31.2, lon: 35.36 }, { name: "Tel Aviv–Jaffa", lat: 32.065, lon: 34.76 }] },
    daysPlan: days3,
    alternatives: [
      { title: "Only two sightseeing days after flights?", text: "Stay with Jerusalem and Tel Aviv, or choose one city and a booked day trip. Do not attempt all three regions with two partially usable days.", to: "/travel-blog/getting-around-israel/", label: "Compare transport choices" },
      { title: "Prefer cities over a desert excursion?", text: "Replace the Masada–Dead Sea day with museums and viewpoints in Jerusalem or a fuller Tel Aviv–Jaffa day.", to: "/travel-blog/museums-in-jerusalem/", label: "Jerusalem museum options" },
      { title: "Traveling on Friday or Saturday?", text: "Arrange the intercity journey around the actual Shabbat timetable. Regular rail and many buses do not run for much of the period.", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/", label: "Shabbat transport" },
    ],
    logistics: [
      { heading: "How to move between bases", text: "For the Jerusalem–Tel Aviv leg, compare an operating train with your actual hotel-to-station and station-to-hotel connections. The ticketed railway journey is not door to door.", to: "/travel-blog/getting-around-israel/", label: "Getting around Israel" },
      { heading: "When a private ride helps", text: "It may make sense for airport luggage or a two-stop desert day, but guiding, entrance fees and a sightseeing itinerary should be agreed separately.", to: "/private-driver/", label: "Private driver options" },
      { heading: "Arrival and departure", text: "A three-day plan assumes arrival before the first full sightseeing day and departure after the last one, or sufficiently generous flight times.", to: "/travel-blog/ben-gurion-airport-arrival-tips/", label: "Airport arrival guide" },
    ],
    faqs: [
      { q: "Is three days enough to visit Israel?", a: "Enough for a focused introduction, not a full-country tour. Choose Jerusalem and Tel Aviv plus one optional desert day; flight times can reduce the number of usable days." },
      { q: "Can I do this without a car?", a: "Yes for city sightseeing, with a separate transport plan for Masada and the Dead Sea. Check site access and actual tour or bus dates rather than assuming connections." },
      { q: "Where should I stay for three days?", a: "Jerusalem for two nights is efficient for the Old City and a desert day. Move to Tel Aviv only if the final-day program and airport schedule justify the transfer." },
    ],
    hero: "EXISTING:jerusalem",
  },
  "5": {
    id: "5", days: 5, path: "/travel-blog/israel-itinerary-5-days/",
    title: "5 Days in Israel: Jerusalem, Dead Sea, Tel Aviv & Coast",
    description: "A five-day Israel itinerary for first-time visitors: Jerusalem, Masada, Dead Sea, Jaffa, Caesarea and Haifa, with hotel bases and realistic alternatives.",
    intro: "With five full days you can give Jerusalem proper time, visit Masada and the Dead Sea, explore Jaffa and Tel Aviv, and add a selective coastal day. You do not need to move hotels every night or add Bethlehem and Jericho as rushed stops.",
    idealFor: "First-time travelers seeking history, a desert experience and coastal cities",
    reality: "A full-day desert excursion and a northbound coastal day are separate commitments. The fifth day needs to be shortened if you also have a flight out that evening.",
    hotelBases: "Jerusalem for the first three nights and Tel Aviv for the last one or two, depending on departure timing.",
    noCarAdvice: "The two cities connect by public transport when operating. Organized excursions can cover Masada or a multi-stop Caesarea–Haifa day; self-drive or a private vehicle allows different flexibility but brings added cost and parking considerations.",
    route: ["Jerusalem", "Masada & Dead Sea", "Jerusalem / optional Bethlehem", "Tel Aviv–Jaffa", "Caesarea & Haifa"],
    map: { center: [31.78, 35.05], bounds: [34.57, 30.97, 35.69, 33.08], points: [{ name: "Jerusalem", lat: 31.78, lon: 35.23 }, { name: "Masada", lat: 31.31, lon: 35.35 }, { name: "Tel Aviv–Jaffa", lat: 32.065, lon: 34.76 }, { name: "Caesarea", lat: 32.5, lon: 34.89 }, { name: "Haifa", lat: 32.8, lon: 34.99 }] },
    daysPlan: days5,
    alternatives: [
      { title: "Want a slower final day?", text: "Replace Caesarea and Haifa with more time in Tel Aviv, or visit Caesarea alone. This is a better fit for travelers departing that evening." },
      { title: "Faith-focused itinerary?", text: "Use the third Jerusalem day for a separately arranged Bethlehem visit or a Jordan River/ Jericho experience, subject to access rules and an operator able to confirm the itinerary.", to: "/travel-blog/jerusalem-to-bethlehem/", label: "Bethlehem transport options" },
      { title: "More resort time?", text: "Add a Dead Sea overnight only by removing time elsewhere. Ein Bokek resort hotels are not interchangeable with the Ein Gedi nature base.", to: "/travel-blog/best-dead-sea-hotels/", label: "Dead Sea hotel comparison" },
    ],
    logistics: [
      { heading: "Two hotels instead of five", text: "Jerusalem and Tel Aviv are the most straightforward bases for this route. Avoid a separate Haifa night unless you plan to continue into the north.", to: "/hotels/", label: "Compare accommodation bases" },
      { heading: "When public transport works", text: "Rail suits the city-to-city journey when scheduled; Caesarea's national park and Haifa's hillside viewpoints require extra onward connections.", to: "/travel-blog/getting-around-israel/", label: "Getting around Israel" },
      { heading: "What a guided day trip includes", text: "Check the named itinerary, pickup point, licensed guiding, park admission, cancellation and return. A private car-and-driver service does not automatically include a guide.", to: "/tours/", label: "Compare tours and day trips" },
    ],
    faqs: [
      { q: "Can I see the main highlights in five days?", a: "Yes with selective daily plans. Jerusalem, Tel Aviv and the Dead Sea are a practical core; adding Caesarea and Haifa takes another full or substantially used travel day." },
      { q: "Should I add Bethlehem and Jericho?", a: "Choose one only if it is a genuine priority, with verified crossing and transport arrangements. Do not count both as quick detours within another Jerusalem sightseeing day." },
      { q: "How many hotel bases do I need?", a: "Usually two, in Jerusalem and Tel Aviv. A Haifa overnight makes sense mainly if you are staying in the north after this itinerary." },
    ],
    hero: "EXISTING:coast",
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
