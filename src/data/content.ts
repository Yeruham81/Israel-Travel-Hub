/**
 * Editorial content for city and neighborhood accommodation guides.
 * Property records, sources and all booking links live in registry.ts.
 */
import type { LinkProps } from "@tanstack/react-router";
import downtownPhoto from "@/assets/jerusalem/downtown.webp";
import mamillaPhoto from "@/assets/jerusalem/mamilla.webp";
import oldCityPhoto from "@/assets/jerusalem/old-city.webp";
import marketPhoto from "@/assets/jerusalem/mahane-yehuda.webp";
import eastJerusalemPhoto from "@/assets/jerusalem/east-jerusalem.webp";
import germanColonyPhoto from "@/assets/jerusalem/german-colony.webp";

export type StayPreference = "first-visit" | "car-free" | "quiet" | "nightlife" | "family" | "views" | "luxury" | "heritage" | "food" | "long-stay";

export const preferenceLabels: Record<StayPreference, string> = {
  "first-visit": "First visit / sightseeing",
  "car-free": "Getting around without a car",
  quiet: "Quieter evenings",
  nightlife: "Restaurants & nightlife",
  family: "Travelling with kids",
  views: "Views & scenery",
  luxury: "Luxury hotels",
  heritage: "History & pilgrimage",
  food: "Food & markets",
  "long-stay": "Longer stays",
};

export interface StayArea {
  name: string;
  suits: StayPreference[];
  text: string;
  watch: string;
}

export interface CityStayGuide {
  id: "jerusalem" | "telaviv" | "tiberias";
  city: string;
  path: string;
  title: string;
  metaDescription: string;
  intro: string;
  overview: string[];
  areas: StayArea[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  sourceIds: string[];
  related: { label: string; to: LinkProps["to"]; note?: string }[];
}

/** Reusable city → area structure; the city hub keeps its existing public URL. */
export interface NeighborhoodStayGuide {
  id: string;
  cityId: CityStayGuide["id"];
  name: string;
  shortName: string;
  path: string;
  title: string;
  metaDescription: string;
  summary: string;
  bestFor: string;
  suits: StayPreference[];
  priceLevel: string;
  watch: string;
  photo: { src: string; alt: string; sourceUrl: string; credit?: string };
  map: { lat: number; lon: number; bounds: [number, number, number, number]; reference: string };
  overview: string[];
  highlights: { name: string; text: string }[];
  gettingAround: string[];
  arrivalTips: string[];
  bookingTips: string[];
  faqs: { q: string; a: string }[];
}

export const jerusalemAreaGuides: NeighborhoodStayGuide[] = [
  {
    id: "downtown", cityId: "jerusalem", name: "Downtown Jerusalem", shortName: "Downtown",
    path: "/jerusalem/downtown-hotels/",
    title: "Where to stay in Downtown Jerusalem: area guide & hotels",
    metaDescription: "Stay around Jaffa Road, Ben Yehuda Street and Zion Square. Explore Downtown Jerusalem, compare two hotel picks and plan your arrival before booking.",
    summary: "A practical first base between the Old City and Mahane Yehuda, with cafés, pedestrian streets and the light rail close by. Choose it for convenience and lively evenings.",
    bestFor: "First visits & exploring without a car", suits: ["first-visit", "car-free", "nightlife"], priceLevel: "Budget to upscale",
    watch: "Busy pedestrian streets can mean evening noise and a walk from the taxi drop-off.",
    photo: { src: downtownPhoto, alt: "Pedestrians and light-rail tracks on Jaffa Road in central Jerusalem", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/Jerusalem_city_center_pedestrian_mall.webp" },
    map: { lat: 31.7816, lon: 35.2199, bounds: [35.2105, 31.7765, 35.2295, 31.7875], reference: "Zion Square / Jaffa Road" },
    overview: [
      "Downtown is the modern center west of the Old City, around Jaffa Road, Zion Square, Ben Yehuda Street and the lanes of Nahalat Shiva. It is a separate area from the Old City: you stay outside the walls, with the historic sights reachable on foot rather than on your doorstep.",
      "For a first visit, this is a useful compromise. You can start the morning at a café, walk toward Jaffa Gate, and return to restaurants and shopping streets in the evening. Jaffa Road's light rail is useful for moving along the center toward the market and the station area; check its current service for your dates.",
      "The convenience comes with an urban feel. A room above a lively pedestrian street offers a different stay from an inward-facing room one lane away. If quiet nights or parking matter more than restaurants and walkability, compare the German Colony or a specific hotel away from the busiest streets before deciding.",
    ],
    highlights: [
      { name: "Jaffa Road & Zion Square", text: "A useful point of orientation, with light-rail stops and cafés along the surrounding streets." },
      { name: "Ben Yehuda & Nahalat Shiva", text: "Pedestrian shopping streets and historic stone lanes for an easy evening walk close to your hotel." },
      { name: "Jaffa Gate & the Old City", text: "Head east for the Old City. The walk depends on your starting street, hills and the gate you need." },
    ],
    gettingAround: [
      "From the eastern side of Downtown, allow roughly 10–15 minutes to walk to Jaffa Gate; hotels farther west take longer. Mahane Yehuda is usually a walk of about 10–20 minutes or a short light-rail journey. These are orientation estimates, not timed routes from every hotel.",
      "Arriving from Jerusalem–Yitzhak Navon station normally involves a separate ride or light-rail journey to your hotel. Many central streets are pedestrianized, so confirm the nearest permitted taxi stop. For a Shabbat arrival, check the actual transport service and your hotel's check-in instructions in advance.",
    ],
    arrivalTips: ["Ask for the closest vehicle-accessible entrance, not just a postal address.", "Check the walking route from your light-rail stop with luggage.", "Light sleepers should ask about inward-facing rooms and nearby bars."],
    bookingTips: ["Check whether breakfast is included in the room rate you choose.", "If you have a car, get the car park's exact location and total charge in writing."],
    faqs: [
      { q: "Is Downtown the same as Jerusalem's Old City?", a: "No. Downtown is outside the walls, mainly around Jaffa Road and Ben Yehuda Street. You walk east toward Jaffa Gate to enter the Old City." },
      { q: "Is this a good area without a rental car?", a: "Yes, it is a practical base for walking and the light rail. Check current timetables and plan Friday-evening and Saturday journeys separately." },
      { q: "Which part is quieter?", a: "Noise varies by street and room orientation. Ask the hotel about bars, deliveries and whether a higher-floor or inward-facing room is available rather than assuming all of Downtown is equally lively." },
    ],
  },
  {
    id: "mamilla", cityId: "jerusalem", name: "Mamilla & King David Street", shortName: "Mamilla & King David",
    path: "/jerusalem/mamilla-king-david-hotels/",
    title: "Mamilla & King David Street: Jerusalem area guide & luxury hotels",
    metaDescription: "Explore Mamilla and King David Street near Jaffa Gate. Compare luxury hotel styles, location tradeoffs and practical booking tips for Jerusalem.",
    summary: "Stay just outside Jaffa Gate among landmark hotels and elegant shopping streets. This is a strong choice for Old City access combined with upscale hotel facilities.",
    bestFor: "Luxury stays & easy Old City access", suits: ["first-visit", "luxury", "family"], priceLevel: "Upscale to luxury",
    watch: "Hotel and restaurant costs are generally higher; Old City views depend on the room category.",
    photo: { src: mamillaPhoto, alt: "Mamilla avenue and the surrounding hotel district seen from Jerusalem's Old City", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/mamilla_jerusalem_view_from_old_city.webp" },
    map: { lat: 31.7765, lon: 35.2254, bounds: [35.217, 31.7700, 35.233, 31.7810], reference: "Mamilla Avenue / King David Street" },
    overview: [
      "Mamilla and the northern part of King David Street form a hotel district immediately west of the Old City. Mamilla's pedestrian avenue leads toward Jaffa Gate, while King Solomon Street and King David Street connect some of Jerusalem's best-known luxury properties.",
      "The appeal is the combination of location and hotel facilities. You can explore the Old City on foot and return to a modern room, restaurants or a spa, depending on the hotel you choose. Downtown is also accessible on foot, so you do not have to spend every meal in a luxury hotel restaurant.",
      "This is one of the city's more expensive areas. It has a polished, visitor-oriented atmosphere rather than the everyday market life of Nachlaot or the neighborhood feel of Baka. Hotels farther south along King David Street are still convenient, but add walking time compared with a property immediately beside Mamilla Avenue.",
    ],
    highlights: [
      { name: "Mamilla Avenue", text: "An open-air pedestrian shopping avenue connecting the modern hotel district with Jaffa Gate." },
      { name: "Jaffa Gate & Tower of David", text: "A convenient starting point for the Christian and Armenian quarters and walks inside the Old City." },
      { name: "King David Street", text: "Landmark hotels and historic streets, with routes toward Yemin Moshe and the city center." },
    ],
    gettingAround: [
      "Most hotels in this district are roughly 5–15 minutes on foot from Jaffa Gate, with the exact distance depending on how far south you stay. Measure the route to the gate rather than a straight line to an attraction inside the walls.",
      "Hotel entrances outside the walls generally make an arrival with luggage simpler than a stay deep inside the Old City. Still, confirm the entrance and parking arrangements, particularly during holidays, events or road closures. Do not assume the light rail stops directly outside your hotel.",
    ],
    arrivalTips: ["Use the hotel's street entrance for the airport transfer, rather than a point inside the pedestrian mall.", "If traveling with children, check how the walk to Jaffa Gate works with a stroller.", "Confirm Friday-evening and Saturday check-in and meal arrangements directly."],
    bookingTips: ["Book an explicitly described view category if an Old City view is essential.", "Check pool opening dates, children's access and whether spa treatments cost extra."],
    faqs: [
      { q: "Am I staying inside the Old City?", a: "No. Mamilla and King David Street are outside the western walls. The advantage is being close to Jaffa Gate while retaining the facilities and vehicle access of a modern hotel district." },
      { q: "Do all rooms have an Old City view?", a: "No. Views vary by hotel, building, floor and room category. Only rely on a view that is explicitly included in the room description you book." },
      { q: "Is Mamilla a good choice for a short first visit?", a: "It can be, especially if convenient Old City access matters more than the lowest room rate. Downtown offers another central base with a wider mix of accommodation styles." },
    ],
  },
  {
    id: "old-city", cityId: "jerusalem", name: "Jerusalem's Old City", shortName: "Old City",
    path: "/jerusalem/old-city-hotels/",
    title: "Staying in Jerusalem's Old City: quarters, access & hotels",
    metaDescription: "Choose an Old City stay in Jerusalem. Learn about the quarters, gate access, luggage and walking routes, then compare heritage hotel recommendations.",
    summary: "Sleep inside the historic walls, close to Jerusalem's sacred sites and atmospheric lanes. Choose your quarter and nearest gate carefully, especially when arriving with luggage.",
    bestFor: "Pilgrimage, history & atmosphere", suits: ["heritage", "first-visit", "views"], priceLevel: "Simple guesthouses to heritage hotels",
    watch: "Steps, uneven paving and restricted vehicle access can make even short arrivals demanding.",
    photo: { src: oldCityPhoto, alt: "Stone buildings and a cobbled street inside Jerusalem's Old City", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/Jerusalem_Old_City_street.webp" },
    map: { lat: 31.7767, lon: 35.2332, bounds: [35.2259, 31.7709, 35.2413, 31.7833], reference: "Old City, inside the walls" },
    overview: [
      "The Old City is the most immersive option if Jerusalem's history and religious sites are the focus of your visit. Its Christian, Armenian, Jewish and Muslim quarters contain sacred places, market lanes and residential streets within the same walls. Staying here lets you experience the lanes before and after the busiest sightseeing hours.",
      "Accommodation is usually in historic hotels, religious guesthouses and smaller properties rather than large modern hotels. A courtyard, rooftop or historic building can be a memorable part of the stay, but facilities and accessibility vary considerably. Decide which quarter fits your plans before choosing a hotel name.",
      "The main compromise is practical access. A nearby map pin does not guarantee an easy walk: stairs, hills, crowds and stone paving can make luggage or a stroller difficult. Visitors who need reliable step-free access or door-to-door vehicle arrival should consider accommodation outside the walls and confirm specific arrangements with the hotel.",
    ],
    highlights: [
      { name: "Christian & Armenian quarters", text: "Explore around Jaffa Gate, the Church of the Holy Sepulchre and the historic lanes between the quarters." },
      { name: "Jewish Quarter", text: "The Cardo, Hurva Synagogue and routes toward the Western Wall make this a distinct base for a heritage visit." },
      { name: "Muslim Quarter & Via Dolorosa", text: "Market streets and religious landmarks create a busy daytime atmosphere, with access rules varying by site." },
    ],
    gettingAround: [
      "The nearest suitable gate is more useful than a general 'Old City' address. Jaffa Gate connects with Mamilla and western Jerusalem; Damascus Gate serves the northern side; Zion and Dung gates may suit parts of the Jewish Quarter. Ask the hotel which arrival route is currently appropriate.",
      "Travel between sites mainly on foot and allow extra time beyond a map's distance estimate. Vehicle restrictions and site-entry arrangements can change. A hotel with an elevator does not make the surrounding approach step-free, so discuss the whole route if accessibility is important.",
    ],
    arrivalTips: ["Get the exact gate, permitted drop-off and walking instructions from the hotel before you travel.", "Ask whether luggage help can be arranged and whether it has a separate charge.", "Check stairs both inside the building and on the approach from the gate."],
    bookingTips: ["Confirm an elevator, room floor and step-free access individually; do not infer them from a general accessibility label.", "Ask about evening reception, nearby food options and the room's outlook before booking."],
    faqs: [
      { q: "Can a taxi take me to the hotel door?", a: "Not necessarily. Many lanes have restricted vehicle access, and the appropriate drop-off depends on the property and current rules. Get written arrival instructions from the hotel." },
      { q: "Which quarter should I choose?", a: "Match the quarter to the places you plan to visit, then compare the nearest gate and actual walking route. Jaffa Gate is practical for Mamilla and Downtown; the Jewish Quarter suits extended time around its heritage sites." },
      { q: "Is staying near Jaffa Gate easier with luggage?", a: "It is often more straightforward than walking deep into the market lanes, but a historic hotel may still have stairs. Check the route and building together." },
    ],
  },
  {
    id: "mahane-yehuda", cityId: "jerusalem", name: "Mahane Yehuda & Nachlaot", shortName: "Mahane Yehuda & Nachlaot",
    path: "/jerusalem/mahane-yehuda-nachlaot-hotels/",
    title: "Mahane Yehuda & Nachlaot: Jerusalem neighborhood guide & hotels",
    metaDescription: "Stay near Mahane Yehuda Market or in Nachlaot. Discover food, local streets, nightlife and apartment-style accommodation, with practical hotel booking tips.",
    summary: "Food stalls, evening bars and historic residential lanes give this area a strong local character. Stay beside the market for energy, or choose a Nachlaot side street for a different pace.",
    bestFor: "Food lovers, nightlife & local character", suits: ["food", "nightlife", "car-free", "long-stay"], priceLevel: "Budget to upscale",
    watch: "Market deliveries and bars can be noisy; the atmosphere changes substantially on Shabbat.",
    photo: { src: marketPhoto, alt: "Agripas Street beside Mahane Yehuda Market in Jerusalem", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/mahane_yehuda_jerusalem.webp" },
    map: { lat: 31.7845, lon: 35.211, bounds: [35.201, 31.7777, 35.2198, 31.7905], reference: "Mahane Yehuda Market / Nachlaot" },
    overview: [
      "Mahane Yehuda Market sits around Jaffa Road and Agripas Street, immediately west of Downtown. Nachlaot extends into the historic lanes alongside it, with stone houses, small courtyards and synagogues. The two names often appear together in hotel descriptions, but the exact street makes a considerable difference.",
      "During market hours, the attraction is everyday food shopping: bakeries, produce, spices and casual places to eat. Later, bars and restaurants bring a different crowd. A stay facing the market can be lively and convenient, while a property a few streets into Nachlaot may feel much more residential.",
      "Boutique hotels and apartment-style stays work well here, particularly if food and neighborhood life matter more than being next to an Old City gate. Kitchens can be useful for longer stays, but verify the equipment in the exact unit. This area is less suitable if you want consistently quiet surroundings or extensive facilities in a large resort-style hotel.",
    ],
    highlights: [
      { name: "Mahane Yehuda Market", text: "Food shopping, bakeries and casual meals by day, with a different restaurant and bar scene in the evening." },
      { name: "Nachlaot lanes", text: "Historic stone houses and courtyards offer a residential contrast to the market streets. Respect residents' privacy." },
      { name: "Jaffa Road & Davidka Square", text: "Useful orientation points for light-rail connections and walking toward the city center." },
    ],
    gettingAround: [
      "Allow roughly 20–30 minutes to walk toward Jaffa Gate from much of this area. Another option is the light rail toward City Hall followed by a walk, when service is operating. Check your accommodation's exact position rather than relying on a broad 'near the market' description.",
      "Parking and driving through nearby lanes can be awkward. Ask where a taxi can stop and how to reach the entrance with suitcases. Many market businesses close from Friday afternoon for Shabbat, so confirm opening times and arrange food and transport for your actual dates.",
    ],
    arrivalTips: ["Ask whether the room faces the market, a main road or an internal courtyard.", "Arrange apartment access and key collection before a late or Shabbat arrival.", "Check both evening noise and early-morning deliveries when choosing a room."],
    bookingTips: ["For an apartment, confirm the kitchen equipment, cleaning schedule and any separate cleaning fee.", "Read recent room-specific feedback for noise, stairs and access rather than relying on the neighborhood name."],
    faqs: [
      { q: "Should I stay beside the market or inside Nachlaot?", a: "Beside the market is convenient for food and nightlife. A side street in Nachlaot can feel more residential, but access and noise still depend on the specific building and room." },
      { q: "Is the market open throughout Shabbat?", a: "Do not plan on normal market trading from Friday afternoon through Saturday. Individual restaurants and bars keep their own hours; check the businesses you intend to use." },
      { q: "Is an apartment useful for a longer stay?", a: "It can be, especially if you want to buy food at the market and prepare meals. Verify the exact kitchen, sleeping arrangement, stairs and check-in process before paying." },
    ],
  },
  {
    id: "east-jerusalem", cityId: "jerusalem", name: "East Jerusalem", shortName: "East Jerusalem",
    path: "/jerusalem/east-jerusalem-hotels/",
    title: "East Jerusalem hotels: Damascus Gate & Nablus Road area guide",
    metaDescription: "Compare stays around Damascus Gate, Nablus Road and the American Colony. Explore local character, Christian sites, arrival tips and two heritage hotel picks.",
    summary: "The hotel streets north of the Old City suit visitors focused on Damascus Gate, the Garden Tomb and Palestinian local culture. Check the map: 'East Jerusalem' covers a much wider area.",
    bestFor: "Christian sites & Palestinian heritage", suits: ["heritage", "first-visit", "car-free"], priceLevel: "Guesthouses to landmark luxury",
    watch: "A listing described as East Jerusalem may be far from the northern Old City hotel district.",
    photo: { src: eastJerusalemPhoto, alt: "Damascus Gate, the northern entrance to Jerusalem's Old City", sourceUrl: "https://commons.wikimedia.org/wiki/File:Damaskustor_BW_2.jpg", credit: "Berthold Werner · Public domain · Resized and converted to WebP" },
    map: { lat: 31.7873, lon: 35.2311, bounds: [35.224, 31.7807, 35.240, 31.7952], reference: "Nablus Road / northern Old City hotel district" },
    overview: [
      "For this accommodation guide, East Jerusalem means the hotel cluster just north and northeast of the Old City: Damascus Gate, Nablus Road, Salah ad-Din Street, St. George's Cathedral and the American Colony area. It does not mean that every hotel advertised as 'East Jerusalem' is equally close to the Old City.",
      "Palestinian restaurants, bakeries, shops and heritage buildings give these streets a character distinct from western Downtown. The Garden Tomb and northern Old City entrances make the district useful for Christian pilgrims, while smaller heritage hotels offer a different experience from a large conventional property.",
      "The area has considerable variety. Busy commercial streets near Damascus Gate feel different from quieter gardens and hotel grounds farther north. Compare the exact hotel location, current access and your itinerary rather than treating this large part of the city as one uniform neighborhood. It is less convenient for travelers who mainly want western Downtown's bars or Mahane Yehuda.",
    ],
    highlights: [
      { name: "Damascus Gate", text: "A major northern entrance to the Old City's market lanes and the Muslim and Christian quarters." },
      { name: "Garden Tomb & Nablus Road", text: "An important stop for many Christian visitors, with nearby heritage hotels and local businesses." },
      { name: "St. George's & the American Colony area", text: "Historic buildings and quieter hotel settings a little farther north of the Old City walls." },
    ],
    gettingAround: [
      "From hotels immediately beside the northern walls, Damascus Gate can be only a short walk away. Properties around the American Colony are farther north. Allow roughly 3–15 minutes from the most central hotels, but use the property's actual walking route rather than extending that estimate to all of East Jerusalem.",
      "Ask the hotel for the street name and entrance your driver should use. The Damascus Gate light-rail area can be useful when service operates, although the walk to the stop varies by property. Businesses here may keep different Saturday hours from West Jerusalem; confirm meals, transfers and site access individually.",
    ],
    arrivalTips: ["Share the exact hotel map location and entrance with your transfer provider.", "Check the route to the Old City gate you actually intend to use.", "Ask the hotel about current access and local conditions shortly before arrival."],
    bookingTips: ["Do not assume a Mount of Olives or outer-neighborhood listing is beside Damascus Gate.", "For heritage buildings, compare the room category and accessibility rather than expecting identical rooms."],
    faqs: [
      { q: "Does every East Jerusalem hotel have easy Old City access?", a: "No. The name covers a large area. This guide focuses on the northern Old City hotel district; properties on the Mount of Olives or farther out can involve substantially different journeys." },
      { q: "Is this area convenient for Christian pilgrims?", a: "The northern hotel district is useful for the Garden Tomb, Damascus Gate and several Christian institutions. The best base still depends on the specific churches and sites in your itinerary." },
      { q: "Will shops and restaurants be open on Saturday?", a: "Some businesses operate on a different weekly rhythm from western Jerusalem, but opening hours vary. Confirm the places you plan to use and arrange transport separately." },
    ],
  },
  {
    id: "german-colony", cityId: "jerusalem", name: "German Colony & Baka", shortName: "German Colony & Baka",
    path: "/jerusalem/german-colony-baka-hotels/",
    title: "German Colony & Baka: Jerusalem neighborhood guide & hotels",
    metaDescription: "Explore Emek Refaim and Baka for a quieter Jerusalem stay. Compare an Orient luxury stay with apartment-style Rafael Residence and plan local transport.",
    summary: "Cafés, stone houses and residential side streets suit a slower Jerusalem stay. The northern German Colony is closer to central sights; Baka is better suited to a neighborhood base and longer visits.",
    bestFor: "Families, quieter evenings & longer stays", suits: ["quiet", "family", "long-stay", "luxury"], priceLevel: "Midrange to luxury",
    watch: "You are farther from the Old City; check current street works and the hotel's recommended arrival route.",
    photo: { src: germanColonyPhoto, alt: "A pavement café and historic stone buildings on Emek Refaim in the German Colony", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/emek_refaim_street_jerusalem.webp" },
    map: { lat: 31.7655, lon: 35.219, bounds: [35.208, 31.7515, 35.230, 31.777], reference: "Emek Refaim / German Colony and Baka" },
    overview: [
      "The German Colony and Baka are neighboring residential areas south of central Jerusalem. Emek Refaim is the German Colony's main café and shopping street, while Baka extends farther south and east around Bethlehem Road. A hotel at the northern end of the German Colony has a different relationship to the Old City from a suite deep inside Baka.",
      "This is an appealing base for families, repeat visitors and longer stays. Historic stone buildings, neighborhood cafés and residential side streets give you a place to return to after sightseeing, rather than placing you in the busiest tourist or market streets. The accommodation mix includes a large luxury hotel and apartment-style properties with more independent living space.",
      "Distance is the tradeoff. Plan to use buses or taxis for some journeys, particularly from southern Baka, and do not assume that every important attraction is a short walk away. The original guide flags light-rail construction around Emek Refaim and the First Station: ask the hotel for a current update on noise, pedestrian routes and vehicle access rather than relying on an old construction timetable.",
    ],
    highlights: [
      { name: "Emek Refaim", text: "Cafés, restaurants and historic stone buildings form the main neighborhood spine." },
      { name: "First Station area & Train Track Park", text: "A useful point of orientation for the northern German Colony and walks along the former railway corridor; check current access." },
      { name: "Baka & Bethlehem Road", text: "Residential streets and neighborhood food options suit travelers who prefer space and a longer local stay." },
    ],
    gettingAround: [
      "From the northern German Colony, the walk toward Jaffa Gate can be roughly 15–25 minutes, depending on the hotel and route. Accommodation farther into Baka generally adds distance and is better treated as a bus-or-taxi base. Hills and a stroller can change what feels comfortably walkable.",
      "For an airport transfer, get the hotel's current recommended approach and precise entrance. Street works can change access around Emek Refaim and nearby roads. Check current bus stops and service rather than assuming an advertised future light-rail line is already operating, especially for a Shabbat arrival.",
    ],
    arrivalTips: ["Ask about street works, room orientation and the latest vehicle approach shortly before arrival.", "For Baka, plan transport to central sights as part of your daily budget.", "Arrange late apartment check-in and confirm the exact entrance, which may be on a side street."],
    bookingTips: ["For a family suite, confirm separate bedrooms, sofa beds, kitchen equipment and maximum occupancy.", "Check parking terms and any seasonal pool restrictions for the exact property and date."],
    faqs: [
      { q: "Are the German Colony and Baka the same neighborhood?", a: "They are adjoining areas. The German Colony centers on Emek Refaim and is closer to the First Station; Baka stretches farther south and east around Bethlehem Road." },
      { q: "Can I walk to the Old City?", a: "It is realistic for many visitors staying in the northern German Colony. From deeper in Baka, the longer walk makes buses or taxis more useful. Check the actual hotel-to-gate route." },
      { q: "How should I check construction disruption?", a: "Ask your accommodation shortly before arrival about its entrance, nearby roadworks, bus stops and the outlook of your room. A city-wide construction notice may not describe the effect on your particular stay." },
    ],
  },
];

export const neighborhoodGuidesForCity = (cityId: CityStayGuide["id"]) => jerusalemAreaGuides.filter((area) => area.cityId === cityId);

export const cityStayGuides: Record<CityStayGuide["id"], CityStayGuide> = {
  jerusalem: {
    id: "jerusalem",
    city: "Jerusalem",
    path: "/travel-blog/where-to-stay-in-jerusalem/",
    title: "Where to stay in Jerusalem: areas and hotel booking tips",
    metaDescription: "Compare six areas to stay in Jerusalem with photos, neighborhood maps and detailed guides. Choose your base, explore hotel recommendations and check room rates.",
    intro: "Find your Jerusalem base, from the Old City's historic lanes to Downtown cafés and the quieter streets of Baka. Explore six areas, then open a neighborhood guide for practical advice and hotel recommendations.",
    overview: [
      "Most first-time visitors want to be within walking distance of the Old City gates. The western city centre gives that plus restaurants and the light rail; staying inside the walls is atmospheric but involves stairs, cobbles and limited vehicle access.",
      "From Friday afternoon to Saturday evening much of West Jerusalem slows down for Shabbat: many restaurants and public transport pause. East Jerusalem and the Old City's Christian and Muslim quarters keep a different rhythm. Plan meals and arrivals with that in mind.",
    ],
    areas: jerusalemAreaGuides.map((area) => ({ name: area.name, suits: area.suits, text: area.summary, watch: area.watch })),
    checklist: [
      "Map the walking route to the Old City, including hills",
      "Ask how check-in works if you arrive on Friday evening or Saturday",
      "Confirm whether the hotel has a Shabbat elevator or step-free access if needed",
      "Ask where a taxi can stop and how far you'll carry luggage",
      "Check whether parking is available and charged, if you're driving",
      "Read the cancellation deadline and whether taxes are included in the total",
    ],
    faqs: [
      { q: "Is it better to stay inside or outside the Old City?", a: "Inside is atmospheric and close to the sights but has limited vehicle access, steps and fewer amenities. Outside, the city centre or East Jerusalem keeps you walkable with easier taxi access." },
      { q: "What changes on Shabbat?", a: "From Friday afternoon to Saturday evening many West Jerusalem businesses and most public transport pause. Ask your accommodation about check-in, elevators and meals, and plan transfers in advance." },
      { q: "Where can I find hotel recommendations for each area?", a: "Open any of the six neighborhood guides above. Each explains the area, arrival considerations and two selected places to stay, with links to check current room options on Expedia. Prices and availability are confirmed on the booking site." },
      { q: "How do I get from Ben Gurion Airport to my hotel?", a: "See our airport-to-Jerusalem guide for the licensed taxi rank, pre-booked transfers and the train, plus tips for Old City drop-offs." },
    ],
    sourceIds: ["owner-stay-jerusalem"],
    related: [
      { label: "Ben Gurion Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/", note: "Taxi rank, transfers and train" },
      { label: "Bethlehem tours from Jerusalem", to: "/tours/bethlehem-from-jerusalem/" },
      { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
  telaviv: {
    id: "telaviv",
    city: "Tel Aviv",
    path: "/travel-blog/where-to-stay-in-tel-aviv/",
    title: "Where to stay in Tel Aviv: beachfront, Jaffa and city areas",
    metaDescription: "Compare Tel Aviv areas to stay — beachfront, Jaffa, Neve Tzedek, the city centre and the Old Port — with a booking checklist for international visitors.",
    intro: "Tel Aviv stretches along the Mediterranean, so the main choice is how close to the sea you want to be versus the cafés, bars and transport of the city centre.",
    overview: [
      "The beach promenade runs the length of the city down to Jaffa, and much of central Tel Aviv is flat and bike-friendly. Many visitors split time between the sea and inland streets like Rothschild and Dizengoff.",
      "Tel Aviv is livelier on Shabbat than Jerusalem, but public transport is still limited from Friday afternoon to Saturday evening. If you're arriving then, pre-arrange your airport transfer.",
    ],
    areas: [
      { name: "Beachfront (Hayarkon St / promenade)", suits: ["first-visit", "views", "family"], text: "Sea views and direct beach access; easy walking along the promenade.", watch: "Sea-view rooms are priced differently; check whether 'sea view' means full or side view." },
      { name: "City centre (Rothschild, Dizengoff)", suits: ["nightlife", "car-free", "first-visit"], text: "Bauhaus streets, cafés and restaurants, with good bus and taxi access.", watch: "Evening noise on popular streets; ask for a quieter room." },
      { name: "Neve Tzedek & Florentin", suits: ["nightlife", "quiet"], text: "Neve Tzedek has low-rise historic lanes and boutique stays; nearby Florentin is grittier and late-night.", watch: "Narrow streets can make taxi drop-off and parking harder." },
      { name: "Old Jaffa & Jaffa port", suits: ["views", "first-visit"], text: "Historic stone alleys, the port and flea-market area at the south end of the promenade.", watch: "Hilly, cobbled lanes; farther from northern Tel Aviv." },
      { name: "North / Old Port (Namal)", suits: ["family", "quiet"], text: "Waterfront boardwalk and Yarkon Park nearby; calmer evenings.", watch: "Longer ride to Jaffa and the centre." },
    ],
    checklist: [
      "Check the walk to the beach or promenade on a map",
      "Confirm what 'sea view' means for the room you book",
      "Ask about noise if you're on a nightlife street",
      "Check parking availability and cost — street parking is tight",
      "Plan Friday-evening and Saturday transport in advance",
      "Read the cancellation deadline and whether taxes are included",
    ],
    faqs: [
      { q: "Beach or city centre for a first visit?", a: "Both work; the city is compact. Beachfront suits relaxed days and families, while Rothschild and Dizengoff suit food and nightlife. Jaffa adds historic atmosphere." },
      { q: "Do I need a car in Tel Aviv?", a: "Usually not. Walking, bikes, buses and taxis cover most needs and parking is difficult. Rent a car when you leave the city instead." },
      { q: "Do you list specific hotels?", a: "No. We don't publish property lists or ratings we haven't verified. Use the area guidance, then compare current properties for your dates on the booking site." },
      { q: "How do I get from Ben Gurion Airport?", a: "See our airport-to-Tel Aviv guide for the licensed taxi rank, pre-booked transfers and checking the train for your date." },
    ],
    sourceIds: ["owner-stay-telaviv"],
    related: [
      { label: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
      { label: "Caesarea day trip", to: "/attractions/caesarea/", note: "On the coast north of Tel Aviv" },
      { label: "Car rental in Israel", to: "/car-rental/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
  tiberias: {
    id: "tiberias",
    city: "Tiberias",
    path: "/travel-blog/best-hotels-in-tiberias/",
    title: "Hotels in Tiberias & the Sea of Galilee: where to stay",
    metaDescription: "Where to stay in Tiberias and around the Sea of Galilee: lakefront, hillside and countryside options, with a practical booking checklist.",
    intro: "Tiberias is the main town on the Sea of Galilee and a base for Christian sites, the Golan and northern Israel. Choose between the walkable lakefront, quieter hillside views or countryside stays around the lake.",
    overview: [
      "Many Galilee sights are spread around the lake, so think about how you'll get around. Staying in Tiberias gives you restaurants and some public transport; countryside stays usually need a car or a driver.",
      "Summer is hot at lake level, which sits well below sea level. Air-conditioning, shade and pool access matter more here than in Jerusalem.",
    ],
    areas: [
      { name: "Lakefront promenade & old town", suits: ["first-visit", "car-free", "nightlife"], text: "Walk to the waterfront, restaurants and boat piers.", watch: "Can be busy and noisy on weekends and holidays." },
      { name: "Upper hillside (Kiryat Shmuel area)", suits: ["views", "quiet"], text: "Higher up the hill with lake views and calmer streets.", watch: "Steep roads; you'll likely drive or take taxis to the lake." },
      { name: "Around the lake (kibbutz and country guesthouses)", suits: ["family", "quiet", "views"], text: "Rural settings near beaches and sites on the north, east or south shores.", watch: "A car or driver is usually essential; evening dining options are limited." },
    ],
    checklist: [
      "Decide whether you'll have a car — it changes which area works",
      "Check air-conditioning and pool access for summer stays",
      "Confirm parking if staying in town",
      "Ask about Shabbat check-in and meal arrangements",
      "Check the walk to the lake versus the hillside location",
      "Read the cancellation deadline and whether taxes are included",
    ],
    faqs: [
      { q: "Tiberias or a countryside stay?", a: "Tiberias suits travellers without a car and those who want restaurants nearby. Countryside guesthouses around the lake are quieter and scenic but usually need a car or driver." },
      { q: "Can I visit the Galilee without driving?", a: "Yes, with a tour or a private driver. Buses exist but are slower between scattered sites. See tours and private transport options." },
      { q: "Do you list specific hotels?", a: "No. We don't publish property lists or ratings we haven't verified. Use the area guidance, then compare current properties for your dates on the booking site." },
      { q: "When is it hottest?", a: "Midsummer at lake level can be very hot. Plan outdoor sightseeing for mornings and evenings and check your accommodation's cooling and pool." },
    ],
    sourceIds: ["owner-hotels-tiberias"],
    related: [
      { label: "Tours & day trips", to: "/tours/", note: "Private drivers and guided days" },
      { label: "Car rental in Israel", to: "/car-rental/" },
      { label: "Destinations: Sea of Galilee", to: "/destinations/" },
      { label: "All accommodation", to: "/hotels/" },
    ],
  },
};
