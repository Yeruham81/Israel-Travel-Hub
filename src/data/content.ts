/**
 * Editorial content for city and neighborhood accommodation guides.
 * Property records, sources and all booking links live in registry.ts.
 */
import type { LinkProps } from "@tanstack/react-router";
import type { ResortHotelFacts } from "@/data/registry";
import downtownPhoto from "@/assets/jerusalem/downtown.webp";
import mamillaPhoto from "@/assets/jerusalem/mamilla.webp";
import oldCityPhoto from "@/assets/jerusalem/old-city.webp";
import marketPhoto from "@/assets/jerusalem/mahane-yehuda.webp";
import eastJerusalemPhoto from "@/assets/jerusalem/east-jerusalem.webp";
import germanColonyPhoto from "@/assets/jerusalem/german-colony.webp";
import telAvivBeachfrontPhoto from "@/assets/tel-aviv/beachfront.webp";
import dizengoffPhoto from "@/assets/tel-aviv/dizengoff.webp";
import oldNorthPhoto from "@/assets/tel-aviv/old-north.webp";
import neveTzedekPhoto from "@/assets/tel-aviv/neve-tzedek.webp";
import jaffaPhoto from "@/assets/tel-aviv/jaffa.webp";
import florentinPhoto from "@/assets/tel-aviv/florentin.webp";
import keremPhoto from "@/assets/tel-aviv/kerem-hateimanim.webp";
import rothschildPhoto from "@/assets/tel-aviv/rothschild.webp";
import deadSeaBeachPhoto from "@/assets/dead-sea/beach.webp";
import deadSeaPoolPhoto from "@/assets/dead-sea/pool.webp";
import deadSeaLandscapePhoto from "@/assets/dead-sea/landscape.webp";
import deadSeaSunbedsPhoto from "@/assets/dead-sea/sunbeds.webp";
import einGediStayPhoto from "@/assets/dead-sea/ein-gedi.webp";
import tiberiasWaterfrontPhoto from "@/assets/tiberias/waterfront.webp";
import tiberiasHeritagePhoto from "@/assets/tiberias/heritage.webp";
import tiberiasCentralPhoto from "@/assets/tiberias/central.webp";
import galileeSunrisePhoto from "@/assets/tiberias/sunrise.webp";
import haifaPanoramaPhoto from "@/assets/haifa/panorama.webp";
import haifaBotanicaPhoto from "@/assets/haifa/botanica.webp";
import haifaColonyPhoto from "@/assets/haifa/colony.webp";
import haifaLeonardoPhoto from "@/assets/haifa/leonardo.webp";
import haifaDanCarmelPhoto from "@/assets/haifa/dan-carmel.webp";

export type StayPreference = "first-visit" | "car-free" | "quiet" | "nightlife" | "family" | "views" | "luxury" | "heritage" | "food" | "long-stay" | "beach" | "history";

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
  beach: "Beach days",
  history: "Historic streets & architecture",
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
  reviewedAt?: string;
  areaIntro?: string;
  quickPicks?: { areaId: string; label: string; description: string }[];
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

export const telAvivAreaGuides: NeighborhoodStayGuide[] = [
  {
    id: "telaviv-beachfront", cityId: "telaviv", name: "Tel Aviv Beachfront", shortName: "Beachfront",
    path: "/tel-aviv/beachfront-hotels/",
    title: "Tel Aviv beachfront hotels: promenade & beach area guide",
    metaDescription: "Choose a base by Tel Aviv's promenade, Gordon and Frishman beaches. Explore the area, compare two hotel picks and check sea-view room details before booking.",
    summary: "Make the Mediterranean part of every day, with the promenade, central beaches and cafés close by. Choose between large seafront hotels and smaller properties a street inland.",
    bestFor: "Beach days & a first Tel Aviv visit", suits: ["beach", "first-visit", "views", "luxury"], priceLevel: "Mid-range to luxury",
    watch: "A beachfront address does not guarantee a sea-facing room or a private beach.",
    photo: { src: telAvivBeachfrontPhoto, alt: "Tel Aviv's beachfront hotels and Mediterranean promenade", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Tel_Aviv_Promenade1.jpg" },
    map: { lat: 32.0821, lon: 34.7674, bounds: [34.759, 32.069, 34.775, 32.0915], reference: "Gordon / Frishman beach district" },
    overview: [
      "Tel Aviv's central beachfront follows the promenade beside HaYarkon Street, with Gordon, Frishman and Bograshov beaches providing useful landmarks. This guide focuses on that central strip: the port to the north and Jaffa to the south offer different bases and have their own guides.",
      "Stay here if an early swim, a sunset walk or an easy return from the beach matters to your trip. The coast also works for a first visit because you can walk inland to restaurants and central streets. The accommodation mix ranges from substantial hotels with leisure facilities to smaller boutique properties just behind the waterfront.",
      "Expect an urban coastline, with road traffic, people on the promenade and busy public beaches. Sea-facing rooms often carry a premium, while a side view can be very different from a full view. Look at the exact entrance and room description: some properties are across HaYarkon Street, and others sit a block or more inland.",
    ],
    highlights: [
      { name: "Gordon, Frishman & Bograshov beaches", text: "Central beach landmarks for choosing your preferred part of the coast. Check current lifeguard hours and swimming conditions locally." },
      { name: "The seafront promenade", text: "A continuous waterfront route for walking north toward the port or south toward Jaffa; the full distance is longer than a short city stroll." },
      { name: "Ben Yehuda & the city center", text: "Cafés, shops and restaurants a few streets inland add everyday choices beyond hotel dining." },
    ],
    gettingAround: [
      "From the central beaches, Dizengoff Square is often around 10–20 minutes away on foot, depending on the hotel. Jaffa and the port are farther along the coast: compare the actual walking route before deciding to cover both ends of the city in one day.",
      "The airport train does not deliver you to the promenade. Plan the onward trip from your chosen Tel Aviv station, or arrange a transfer to the hotel's street entrance. If driving, confirm a specific parking space and charge; a nearby public car park is different from hotel parking.",
    ],
    arrivalTips: ["Give your driver the hotel's entrance address, which may differ from the promenade frontage.", "Check the current train or bus service for your arrival date, especially Friday evening and Saturday.", "Ask how far you will carry bags from the drop-off, and whether the route has steps."],
    bookingTips: ["Choose a room explicitly described as full sea view if that is essential; do not infer it from the hotel's location.", "Confirm which pool, breakfast and beach-related services are included for your dates."],
    faqs: [
      { q: "Does a beachfront hotel have its own beach?", a: "Do not assume so. Tel Aviv's central beaches are public, and hotel arrangements vary. Confirm any advertised beach services directly and check whether a road separates your hotel from the sand." },
      { q: "Is the beachfront convenient for a first visit?", a: "Yes, particularly if you want beach time alongside city sightseeing. The central strip gives access to the promenade and inland cafés; Jaffa and the northern port still require a longer walk or a ride." },
      { q: "What is the difference between full and side sea view?", a: "A full view normally faces the sea more directly, while a side view may be angled or partly obstructed. The property's own room description and photos should define what your selected category includes." },
    ],
  },
  {
    id: "telaviv-dizengoff", cityId: "telaviv", name: "Dizengoff Square & City Center", shortName: "Dizengoff & City Center",
    path: "/tel-aviv/dizengoff-city-center-hotels/",
    title: "Dizengoff & central Tel Aviv: area guide & boutique hotels",
    metaDescription: "Explore the streets around Dizengoff Square, cafés and White City architecture. Compare two boutique hotels and plan a central Tel Aviv stay without a car.",
    summary: "Cafés, boutique hotels and White City streets make this a convenient base for exploring on foot, with the beach a walk away rather than outside your door.",
    bestFor: "First visits, cafés & exploring on foot", suits: ["first-visit", "car-free", "nightlife", "history"], priceLevel: "Mid-range to upscale",
    watch: "Dizengoff Street is long. Check the address rather than assuming every hotel is beside the square.",
    photo: { src: dizengoffPhoto, alt: "The fountain and pedestrian plaza at Dizengoff Square in Tel Aviv", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/07/dizengoff_square_tel_aviv.webp" },
    map: { lat: 32.0773, lon: 34.7737, bounds: [34.7664, 32.0705, 34.783, 32.0858], reference: "Dizengoff Square" },
    overview: [
      "This area centers on Dizengoff Square and the surrounding streets, including the nearby stretch of Dizengoff Street, Frishman and Bograshov. It is a useful introduction to central Tel Aviv, with neighborhood cafés, restaurants and architecture woven into everyday city life.",
      "Choose it if you want to leave the hotel on foot and have several directions to explore. You can head west toward the beach, south toward Meir Park and the shopping streets, or spend the evening close to the square. Several boutique hotels occupy buildings with their own histories, making the accommodation part of the neighborhood experience.",
      "The tradeoff is city noise and a smaller hotel format. A characterful central property may have fewer leisure facilities than a large hotel on the seafront. Some streets are lively late into the evening, and a listing described simply as 'Dizengoff' can be well north of the square.",
    ],
    highlights: [
      { name: "Dizengoff Square", text: "The fountain and surrounding buildings provide a recognizable meeting point and an easy start for a walk through the White City." },
      { name: "Dizengoff Street cafés", text: "Independent shops, places to eat and bars offer options throughout the day; the atmosphere varies along the street." },
      { name: "Meir Park & Dizengoff Center", text: "A park and shopping landmark to the south help orient your route toward the wider city center." },
    ],
    gettingAround: [
      "The beach is roughly 10–15 minutes on foot from the square, with extra time from hotels farther east or north. For Jaffa, the port or an airport station, plan a longer walk or a bus or taxi rather than treating every Tel Aviv sight as immediately nearby.",
      "This is a practical base without a rental car. Check the walking route from your bus stop and the hotel's vehicle entrance, particularly if the address faces a pedestrian space. Friday-evening and Saturday transport has different service patterns; verify your exact journey before arrival.",
    ],
    arrivalTips: ["Confirm the hotel is near Dizengoff Square if that is the location you want.", "Ask for the nearest taxi stopping point and how to reach reception with luggage.", "Light sleepers should ask about room orientation, nearby bars and street works."],
    bookingTips: ["Compare room size and window outlook, particularly in converted historic buildings.", "Check breakfast, parking and any rooftop access against the rate you select."],
    faqs: [
      { q: "Is this a good alternative to a beachfront hotel?", a: "Yes, if you prefer cafés, architecture and a central city feel. You can still walk to the beach, but you will not have the same immediate access or outlook as a room on the coast." },
      { q: "Are all Dizengoff hotels close to the square?", a: "No. Dizengoff Street continues a long way north. Check the exact address and walking route to the square before booking." },
      { q: "Can I explore without a car?", a: "Walking works well for the nearby center and beaches. Use current bus information or taxis for longer trips, and plan airport journeys and Shabbat travel separately." },
    ],
  },
  {
    id: "telaviv-old-north", cityId: "telaviv", name: "Old North & Tel Aviv Port", shortName: "Old North & Port",
    path: "/tel-aviv/old-north-port-hotels/",
    title: "Old North & Tel Aviv Port: neighborhood guide & hotels",
    metaDescription: "Find a base near Tel Aviv Port, northern beaches and Yarkon Park. Compare two hotel styles, map the district and understand the distance to central Tel Aviv.",
    summary: "Residential café streets, northern beaches and waterfront walks suit a slower city stay. The port and Yarkon Park add outdoor space, farther from Jaffa and the southern markets.",
    bestFor: "Northern beaches, parks & a slower pace", suits: ["beach", "family", "quiet", "long-stay"], priceLevel: "Mid-range to upscale",
    watch: "The port can be lively; a quiet residential side street and a waterfront hotel offer different evenings.",
    photo: { src: oldNorthPhoto, alt: "Aerial view of Tel Aviv Port and the Yarkon River meeting the Mediterranean", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/tel-aviv_port_aerial.jpg" },
    map: { lat: 32.0936, lon: 34.7777, bounds: [34.768, 32.083, 34.793, 32.1045], reference: "Old North / Tel Aviv Port district" },
    overview: [
      "The Old North stretches through residential streets north of the central city toward the Yarkon River. Tel Aviv Port, known locally as the Namal, sits on its coastal edge. These are adjoining places rather than one compact hotel block, so the street you choose affects both the atmosphere and your daily walks.",
      "The appeal is a mix of neighborhood cafés, beach access and open space. Independence Park, the northern beaches, the port's waterfront and the Yarkon corridor give families and longer-stay visitors alternatives to a day of shopping or sightseeing. Southern parts of the Old North remain closer to the city center than a hotel right beside the port.",
      "Do not read 'north' as a guarantee of silence. The port has restaurants and a lively public waterfront, while major roads remain busy. If your itinerary focuses on Jaffa, Carmel Market and the southern neighborhoods, factor in the extra journeys before choosing this base.",
    ],
    highlights: [
      { name: "Tel Aviv Port boardwalk", text: "Waterfront restaurants and an open walking area at the northern end of the city's coastal route." },
      { name: "Independence Park & northern beaches", text: "Green space and access toward Hilton, Nordau and Metzitzim beaches, depending on where you stay." },
      { name: "Yarkon River & park", text: "The river corridor leads inland from the coast, offering a different setting for a walk or a longer outdoor outing." },
    ],
    gettingAround: [
      "Map the route from your hotel to the particular beach or park entrance you plan to use. A property near Independence Park is not beside the port itself. Central Tel Aviv is closer from the southern Old North; Jaffa is a substantially longer coastal walk from the port.",
      "Buses and taxis help with trips to the southern city and railway stations. For an airport arrival, choose the onward connection based on the actual address rather than the broad 'Tel Aviv' destination. Ask about parking if driving, and check services for your exact arrival time.",
    ],
    arrivalTips: ["Use the hotel's street entrance rather than a general map pin for Tel Aviv Port.", "Check which side of a main road you need to reach when arriving with children or bags.", "Ask about nearby nightlife, construction and room orientation if quiet is a priority."],
    bookingTips: ["For a family stay, confirm the actual sleeping arrangement and maximum occupancy.", "Check the distance to your preferred beach and whether advertised leisure facilities are available for your dates."],
    faqs: [
      { q: "Is the Old North the same as Tel Aviv Port?", a: "No. The Old North is a broader residential district. The port is its northern waterfront destination; a hotel described as Old North may be a walk away from it." },
      { q: "Is this a useful area for families?", a: "It can be, because of the parks, waterfront and northern beaches. Check the hotel's room layout and the route to the places you will use rather than relying on the district label alone." },
      { q: "Is it convenient for exploring Jaffa every day?", a: "Jaffa is at the other end of the coastal city. A stay here works best if you are comfortable using transport for southern outings; choose Jaffa or the southern center if those are your main focus." },
    ],
  },
  {
    id: "telaviv-neve-tzedek", cityId: "telaviv", name: "Neve Tzedek & Surroundings", shortName: "Neve Tzedek",
    path: "/tel-aviv/neve-tzedek-hotels/",
    title: "Neve Tzedek: historic neighborhood guide & boutique stays",
    metaDescription: "Explore Shabazi Street, the Suzanne Dellal area and historic Neve Tzedek. Compare two stays in and around the neighborhood with maps and practical arrival tips.",
    summary: "Low-rise historic streets, galleries and cafés create an intimate southern base near the coast. Hotel listings also include the neighborhood's edges, so check the precise street.",
    bestFor: "Couples, historic streets & boutique stays", suits: ["history", "quiet", "food", "luxury"], priceLevel: "Mid-range to luxury",
    watch: "Properties on Lilienblum or Herzl may be on the edge of Neve Tzedek rather than in its historic lanes.",
    photo: { src: neveTzedekPhoto, alt: "Historic buildings and gardens in Neve Tzedek", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Neve_Tzedek_Tel_Aviv_1.jpg" },
    map: { lat: 32.061, lon: 34.7659, bounds: [34.756, 32.053, 34.775, 32.069], reference: "Shabazi / Suzanne Dellal district" },
    overview: [
      "Neve Tzedek is one of the city's earliest neighborhoods, with small historic houses, narrow lanes and Shabazi Street at its heart. Its scale feels different from the hotel towers on the beachfront and the busier commercial streets of central Tel Aviv.",
      "Choose this area for wandering, cafés, galleries and an evening close to your accommodation. The Suzanne Dellal area is a natural landmark, and the southern promenade, Rothschild Boulevard and Florentin are nearby directions to explore. It suits visitors who want the neighborhood itself to be part of the holiday.",
      "Accommodation within the historic core is limited, and booking platforms often include properties just beyond it. Lilienblum, Herzl and Yehuda HaLevi streets connect Neve Tzedek with the wider southern center; a hotel there may offer easy access without the same quiet-lane setting. Narrow streets and limited parking also make the exact entrance important.",
    ],
    highlights: [
      { name: "Shabazi Street", text: "The neighborhood's main walking spine, with boutiques, cafés and side lanes to explore." },
      { name: "Suzanne Dellal area", text: "Historic buildings and courtyards around the dance and cultural center form a useful neighborhood landmark; check events separately." },
      { name: "Charles Clore Park & the southern promenade", text: "The nearby coast offers a route toward Jaffa and a break from the enclosed neighborhood streets." },
    ],
    gettingAround: [
      "The southern promenade is roughly 10–15 minutes on foot from many parts of Neve Tzedek, with a different walk from hotels on its eastern edges. Rothschild and Florentin are nearby; Jaffa is farther south. Plot the actual route rather than assuming all southern districts meet at your hotel.",
      "Much of the appeal is exploring on foot. For luggage, a late arrival or an airport transfer, ask where a car can legally stop and which doorway is yours. If bringing a car, arrange a specific parking option before arrival instead of relying on a space in the historic lanes.",
    ],
    arrivalTips: ["Check whether your hotel is inside Neve Tzedek or on its eastern edge.", "Ask about steps and lifts in converted historic buildings.", "Arrange the drop-off and any independent check-in instructions before a late arrival."],
    bookingTips: ["Compare full hotel service with a more independent guesthouse format; both appear in the wider area.", "Confirm room size, noise exposure and whether breakfast is offered or included."],
    faqs: [
      { q: "Are all Neve Tzedek hotel listings inside the neighborhood?", a: "No. Listings commonly cover nearby Lilienblum, Herzl and other southern-center streets. Check the street and map if staying among the low-rise historic lanes is important to you." },
      { q: "Is Neve Tzedek beside the beach?", a: "The southern coast is within walking reach, but this is an inland neighborhood. Allow roughly 10–15 minutes from many addresses and check the route from your chosen property." },
      { q: "Is it a quiet area?", a: "Its residential lanes can feel calmer than the major nightlife streets, but cafés, deliveries and nearby roads still matter. Ask about your room's outlook rather than expecting the whole area to be silent." },
    ],
  },
  {
    id: "telaviv-jaffa", cityId: "telaviv", name: "Jaffa: Old City & Flea Market", shortName: "Jaffa",
    path: "/tel-aviv/jaffa-hotels/",
    title: "Where to stay in Jaffa: Old City, flea market & hotels",
    metaDescription: "Choose between Old Jaffa's historic lanes and the lively flea-market district. Explore the map, compare two hotel picks and plan luggage access before booking.",
    summary: "Historic stone streets, the fishing port and flea-market cafés make Jaffa a destination in its own right. Choose between an Old City landmark and a lively market-side stay.",
    bestFor: "Historic atmosphere, galleries & market evenings", suits: ["history", "food", "views", "luxury"], priceLevel: "Mid-range to luxury",
    watch: "Old Jaffa has slopes and steps; the flea-market streets can be lively at night.",
    photo: { src: jaffaPhoto, alt: "Aerial view of Old Jaffa, its port and the Mediterranean coast", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/jaffa_panorama2.jpg" },
    map: { lat: 32.0538, lon: 34.7523, bounds: [34.743, 32.0445, 34.766, 32.064], reference: "Old Jaffa / flea-market district" },
    overview: [
      "Jaffa sits at the southern end of the Tel Aviv coastline, with an old port, stone lanes and a historic hill above the sea. The adjoining flea-market district adds shops, cafés and evening restaurants around the streets inland from the Clock Tower.",
      "Choose Jaffa if you want to spend time here rather than treat it as a quick excursion from central Tel Aviv. A morning around the port, an afternoon among galleries and an evening in the market make a different rhythm from a stay beside Dizengoff Square. Luxury heritage hotels and smaller boutique properties offer different ways to experience it.",
      "Be precise about which part you book. The Old City can involve slopes, cobbles and steps, while a flea-market hotel puts you closer to lively eating and drinking streets. Jaffa's coastal setting does not mean every room has a sea view, and the central Tel Aviv beaches and northern neighborhoods are a longer journey away.",
    ],
    highlights: [
      { name: "Old Jaffa lanes & galleries", text: "Stone streets and courtyards lead around the historic hill, with sea viewpoints along the way." },
      { name: "Flea market & Clock Tower", text: "A useful meeting point and a neighborhood of shops, cafés and restaurants; individual businesses keep their own hours." },
      { name: "Jaffa Port & the southern coast", text: "The old fishing port and routes toward Alma Beach connect the historic district with the waterfront." },
    ],
    gettingAround: [
      "Old Jaffa and the flea-market district can be explored on foot, but the hill and steps affect accessibility. The coastal route north links toward Neve Tzedek and central Tel Aviv; allow a longer walk or use transport if your daily plans center on Dizengoff or the port.",
      "For an airport transfer, use the exact Jaffa address and ask the hotel which entrance a vehicle can reach. A road-level doorway does not guarantee a step-free route to the room. Confirm the whole arrival route if you have a stroller, limited mobility or heavy luggage.",
    ],
    arrivalTips: ["Ask about stairs, lifts and the route from the taxi drop-off to your room.", "Check whether your hotel is on the Old City hill or beside the flea market.", "For a market-side room, ask about restaurant noise and late-evening activity."],
    bookingTips: ["Book an explicit sea-view category if an outlook matters; a Jaffa address alone is not enough.", "Confirm the current property name, room category and services, particularly in landmark hotels that have changed operator."],
    faqs: [
      { q: "Should I choose Old Jaffa or the flea market?", a: "Old Jaffa suits historic surroundings and time around the port and galleries. The flea-market district puts cafés and restaurants close by, with a livelier evening feel. Check the exact entrance and room outlook in either area." },
      { q: "Is Jaffa convenient for central Tel Aviv?", a: "It is connected to the city, but the central beaches, Dizengoff Square and especially the northern port are farther away. Choose Jaffa for its own atmosphere and plan transport for longer outings." },
      { q: "Is Old Jaffa suitable with a stroller or limited mobility?", a: "Some routes have slopes, uneven surfaces or steps. Ask the hotel for a specific accessible approach and check the route to the attractions you want to visit rather than relying on a general accessibility label." },
    ],
  },
  {
    id: "telaviv-florentin", cityId: "telaviv", name: "Florentin & Levinsky Market", shortName: "Florentin",
    path: "/tel-aviv/florentin-hotels/",
    title: "Florentin hotels: street art, Levinsky Market & area guide",
    metaDescription: "Explore Florentin's cafés, street art and nightlife near Levinsky Market. Compare two small-property stays and check noise, check-in and location before booking.",
    summary: "Street art, neighborhood bars and Levinsky Market suit visitors who enjoy an active, less polished city base. Small hotels and independent stays are the main accommodation style.",
    bestFor: "Nightlife, food & an independent city stay", suits: ["nightlife", "food", "long-stay"], priceLevel: "Budget to mid-range; dates vary",
    watch: "Bars, workshops and building activity make the exact block and room orientation important.",
    photo: { src: florentinPhoto, alt: "Street cafés and apartment buildings in Florentin, Tel Aviv", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/florentin_tel_aviv1.jpg" },
    map: { lat: 32.0557, lon: 34.7695, bounds: [34.76, 32.0485, 34.781, 32.063], reference: "Florentin / Levinsky Market district" },
    overview: [
      "Florentin is a southern Tel Aviv neighborhood of apartment buildings, workshops, cafés, bars and changing street art. The Levinsky Market streets add food shops and places to eat along its northern side. The appeal is everyday city life rather than a polished hotel district.",
      "Choose it if you enjoy exploring food streets by day and going out nearby in the evening. Neve Tzedek, the southern end of Rothschild Boulevard and Jaffa are nearby directions to explore, making it useful for a trip focused on the southern city. Accommodation is more often a small property, room or apartment-style stay than a large resort hotel.",
      "The same mix that gives Florentin its character can affect sleep. Nightlife, deliveries, workshops and construction vary from one block to the next. Compare recent room-specific information, and ask about the entrance and check-in format: a digitally managed stay may provide a different level of on-site service from a conventional hotel.",
    ],
    highlights: [
      { name: "Florentin's street art", text: "Murals and painted shutters change over time; explore the neighborhood rather than expecting every artwork in an old photo to remain." },
      { name: "Levinsky Market streets", text: "Food shops, spices and cafés provide a natural route for tasting the southern city. Check individual opening hours." },
      { name: "Neighborhood cafés & bars", text: "Florentin's evening life is part of the attraction and a reason to choose your room location carefully." },
    ],
    gettingAround: [
      "The beach is roughly a 15–25 minute walk from different parts of Florentin, so treat this as an inland base. The walk toward Neve Tzedek or lower Rothschild is shorter from the neighborhood's northern edge; central Dizengoff and the northern port are farther away.",
      "Ask your accommodation for the exact doorway and airport drop-off instructions. Smaller properties may use remote support or self check-in, so obtain the access process before traveling. Confirm current bus or train connections for your date and the onward journey to Florentin.",
    ],
    arrivalTips: ["Get access codes and the support contact before a late arrival if check-in is independent.", "Ask whether the room faces a bar, a workshop, a main road or a quieter rear side.", "Confirm lift access, luggage storage and where a taxi can stop."],
    bookingTips: ["Check whether you are booking a private room, apartment or another format, and what service is included.", "For a longer stay, confirm cleaning, kitchen facilities and any additional charges for your specific unit."],
    faqs: [
      { q: "Is Florentin a beachfront area?", a: "No. It is inland in southern Tel Aviv. The beach can be around 15–25 minutes away on foot, depending on your address and route." },
      { q: "Is Florentin a quiet place to stay?", a: "Its nightlife and working streets can be lively. Noise varies by block and room, so ask about the exact outlook. Travelers prioritizing early, quiet nights should compare other areas as well." },
      { q: "Are all Florentin stays conventional hotels?", a: "No. The area includes small hotels, apartments and properties with independent or digital check-in. Read the listing for the actual room format, staffing and arrival process." },
    ],
  },
  {
    id: "telaviv-kerem", cityId: "telaviv", name: "Kerem HaTeimanim & Carmel Market", shortName: "Kerem HaTeimanim",
    path: "/tel-aviv/kerem-hateimanim-hotels/",
    title: "Kerem HaTeimanim hotels: Yemenite Quarter & Carmel Market guide",
    metaDescription: "Stay near Carmel Market, Yemenite food streets and the beach. Explore Kerem HaTeimanim, compare two nearby stays and check exact locations and arrival access.",
    summary: "Narrow residential lanes and Yemenite food sit between Carmel Market and the coast. Nearby market-edge hotels offer a lively base with easy access to several southern districts.",
    bestFor: "Food, market mornings & beach access", suits: ["food", "beach", "car-free", "history"], priceLevel: "Mid-range to upscale",
    watch: "Market-edge and Allenby addresses can be busy; nearby listings are not always inside the residential quarter.",
    photo: { src: keremPhoto, alt: "A narrow residential street in Kerem HaTeimanim, Tel Aviv", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Kerem_Hateimanim_tel_aviv1.jpg" },
    map: { lat: 32.069, lon: 34.7672, bounds: [34.759, 32.0635, 34.777, 32.0765], reference: "Kerem HaTeimanim / Carmel Market" },
    overview: [
      "Kerem HaTeimanim, the Yemenite Quarter, occupies small streets between the Carmel Market area and the coast. Its low-rise buildings, residential lanes and places serving Yemenite food create a distinct setting close to several of Tel Aviv's busiest visitor routes.",
      "Choose this area if you want market food and the beach in the same stay. Nachalat Binyamin, Neve Tzedek and Rothschild Boulevard are nearby directions to explore, while the coastal promenade gives another route through the city. It can work particularly well if you prefer walking between smaller outings rather than driving each day.",
      "The boundaries matter when choosing accommodation. Properties around Allenby and Nachalat Binyamin are often grouped with the quarter but sit on its market-facing edges. The inner lanes can feel more residential; market deliveries, main-road activity and evening venues create a different atmosphere around the perimeter.",
    ],
    highlights: [
      { name: "Carmel Market", text: "A focal point for food shopping and market browsing. Opening hours and the Friday-to-Saturday rhythm vary by business." },
      { name: "Yemenite Quarter food streets", text: "Small local places to eat and residential lanes give the quarter a different feel from the main market thoroughfare." },
      { name: "Nachalat Binyamin & the nearby coast", text: "Historic streets and the promenade offer two directions for extending a short neighborhood walk." },
    ],
    gettingAround: [
      "The beach is around 10–15 minutes on foot from many addresses, sometimes closer from the western lanes. Check your actual route: an apartment on Nachalat Binyamin is east of the residential quarter, while a place closer to the sea gives a different starting point.",
      "Narrow lanes, pedestrian sections and limited parking make this easier as a walking base than a driving base. Ask for a vehicle-accessible meeting point and the last stretch with luggage. Confirm transport and arrival instructions for the exact day rather than assuming the market's schedule applies to your hotel.",
    ],
    arrivalTips: ["Confirm whether your stay is in the quarter or on the Carmel Market / Nachalat Binyamin edge.", "Ask how far the taxi stop is from your entrance, especially in pedestrian streets.", "Check lift access and any early-morning delivery or nightlife noise near your room."],
    bookingTips: ["For an apartment, confirm the exact unit, minimum stay, cleaning and on-site support.", "Compare the room's actual outlook and included services rather than treating every nearby listing as a quiet neighborhood stay."],
    faqs: [
      { q: "Is Kerem HaTeimanim the same as Carmel Market?", a: "No. The Yemenite Quarter is the residential neighborhood toward the sea from the market. Listings around the market and Nachalat Binyamin can be nearby without being within its inner lanes." },
      { q: "Can I combine market visits and beach time on foot?", a: "Yes, that is one of the area's main attractions. Many addresses are roughly 10–15 minutes from the coast, but check the exact route from the property you choose." },
      { q: "Are apartment stays available for a few nights?", a: "It depends on the property and unit. Some focus on monthly rentals or offer only selected apartments for short stays. Confirm the minimum stay and the exact unit before paying." },
    ],
  },
  {
    id: "telaviv-rothschild", cityId: "telaviv", name: "Rothschild Boulevard & White City", shortName: "Rothschild Boulevard",
    path: "/tel-aviv/rothschild-boulevard-hotels/",
    title: "Rothschild Boulevard hotels: White City area & booking guide",
    metaDescription: "Explore Rothschild Boulevard's architecture, cafés and central promenade. Compare two hotel picks on and near the boulevard, with maps and practical booking advice.",
    summary: "Tree-lined walks, historic architecture, restaurants and evening life suit a city-focused stay. Hotels on and just off the boulevard range from boutique properties to luxury landmarks.",
    bestFor: "Architecture, restaurants & a stylish city stay", suits: ["history", "food", "nightlife", "luxury", "car-free"], priceLevel: "Mid-range to luxury",
    watch: "Rothschild is a long inland boulevard; check which end you are booking and the walk to the beach.",
    photo: { src: rothschildPhoto, alt: "The shaded central promenade and trees of Rothschild Boulevard in Tel Aviv", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/Rothschild_Boulevard_Tel_Aviv1.jpg" },
    map: { lat: 32.0643, lon: 34.7754, bounds: [34.767, 32.0555, 34.7855, 32.0755], reference: "Rothschild Boulevard / White City district" },
    overview: [
      "Rothschild Boulevard is a long, tree-lined route through the central and southern city, with a central walking strip and buildings from different periods of Tel Aviv's development. The surrounding White City streets mix historic architecture, offices, restaurants and residential life.",
      "Choose it if architecture, food and evening walks matter more than waking up beside the sand. Some hotels stand directly on the boulevard; others, including The Norman on Nachmani Street, are a short walk away. The wider district offers boutique and luxury stays without the seafront tower setting.",
      "Look at the street number and surrounding blocks. The southern end connects toward Neve Tzedek, Florentin and Levinsky Market, while the northern end leads toward Habima and the wider center. Traffic and evening venues can affect rooms even with a leafy outlook, and the beach remains a separate walk.",
    ],
    highlights: [
      { name: "The boulevard's central promenade", text: "A shaded route for walking and getting a feel for the surrounding streets, with cafés along the way." },
      { name: "White City & historic architecture", text: "International Style and other historic buildings make the boulevard and neighboring streets rewarding to explore on foot." },
      { name: "Habima & southern-center connections", text: "The northern end points toward the cultural center; the southern end gives access toward Neve Tzedek and Florentin." },
    ],
    gettingAround: [
      "Allow roughly 15–30 minutes to reach the coast from different parts of the boulevard, and check the route from your exact hotel. The distance between its ends also matters: a property near Habima offers a different starting point from one near the southern nightlife streets.",
      "Walking is useful locally, with buses or taxis for farther trips and the airport-station connection. For a transfer, give the precise entrance address, especially for a property on a side street. If renting a car, confirm the parking location and total cost before committing to a city-center stay.",
    ],
    arrivalTips: ["Check whether the hotel is directly on Rothschild or on a nearby street.", "Ask about room orientation and nearby restaurants or bars if you prefer quieter evenings.", "Get the exact parking or taxi entrance rather than relying on the boulevard name."],
    bookingTips: ["Compare the property's facilities and the selected room category; the district includes very different hotel formats.", "For a special stay, confirm any terrace, view, breakfast or leisure access explicitly in your booking."],
    faqs: [
      { q: "Is Rothschild Boulevard a beachfront location?", a: "No. It is inland. A walk to the coast can take around 15–30 minutes depending on the hotel and route, so choose it for the city atmosphere rather than immediate beach access." },
      { q: "Are all hotels in this guide on the boulevard?", a: "No. The guide includes properties on and near Rothschild. For example, The Norman is on Nachmani Street nearby. Each recommendation explains its setting." },
      { q: "Which end should I choose?", a: "Choose the southern end for easier access toward Neve Tzedek, Florentin and Levinsky Market, or look farther north for Habima and the wider center. Check the route to the places you will visit most." },
    ],
  },
];

export const neighborhoodGuidesForCity = (cityId: CityStayGuide["id"]) => [...jerusalemAreaGuides, ...telAvivAreaGuides].filter((area) => area.cityId === cityId);

export const cityStayGuides: Record<CityStayGuide["id"], CityStayGuide> = {
  jerusalem: {
    id: "jerusalem",
    city: "Jerusalem",
    reviewedAt: "2026-10-17",
    areaIntro: "For a first visit, Downtown is a practical starting point. Mamilla puts luxury hotels close to Jaffa Gate; the Old City offers the most immersive historic stay. Choose the market for food and nightlife, the northern East Jerusalem hotel district for Damascus Gate, or the German Colony and Baka for a more residential base.",
    quickPicks: [
      { areaId: "downtown", label: "Your first visit", description: "A convenient base for the main sights" },
      { areaId: "mamilla", label: "A little more luxury", description: "Landmark hotels near the Old City" },
      { areaId: "german-colony", label: "A slower stay", description: "Neighborhood cafés and residential streets" },
    ],
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
    reviewedAt: "2026-10-17",
    areaIntro: "Start with the beachfront for sea and promenade time, or Dizengoff for a central café base. Choose the Old North for parks and northern beaches, Neve Tzedek or Jaffa for historic character, Florentin for nightlife, Kerem HaTeimanim for food and the coast, or Rothschild for architecture and restaurants.",
    quickPicks: [
      { areaId: "telaviv-beachfront", label: "Sea & a first visit", description: "Central beaches and the Mediterranean promenade" },
      { areaId: "telaviv-dizengoff", label: "Cafés & city life", description: "Boutique hotels around Dizengoff Square" },
      { areaId: "telaviv-jaffa", label: "A historic stay", description: "Old Jaffa, the port and flea-market evenings" },
    ],
    path: "/travel-blog/where-to-stay-in-tel-aviv/",
    title: "Where to stay in Tel Aviv: beachfront, Jaffa and city areas",
    metaDescription: "Compare eight Tel Aviv areas with photos, maps and practical neighborhood guides. Choose between beachfront, Dizengoff, Jaffa and more, then explore hotel recommendations.",
    intro: "Find your Tel Aviv base, from Mediterranean beaches to Jaffa's stone lanes and the cafés of the White City. Compare eight areas, then open a neighborhood guide for local highlights, arrival advice and hotel recommendations.",
    overview: [
      "The coast is a useful point of orientation, but a beachfront hotel, a boutique property near Dizengoff and a stay in Jaffa create very different holidays. Compare the actual street, the places you will visit and the room's outlook before choosing.",
      "Friday-evening and Saturday transport follows different service patterns. Check the current train or bus service for your specific journey and plan the final connection from the airport or railway station to your accommodation.",
    ],
    areas: telAvivAreaGuides.map((area) => ({ name: area.name, suits: area.suits, text: area.summary, watch: area.watch })),
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
      { q: "Where can I find hotel recommendations for each area?", a: "Open any of the eight neighborhood guides above. Each explains the area's character, nearby sights and practical arrival considerations, followed by two selected places to stay. Check current room options, prices and booking terms on Expedia." },
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
      { q: "Do you list specific hotels?", a: "The Tiberias destination guide now compares ten hotels and hostels, with focused family and luxury guides. Property information is checked against primary operator sources; room rates and availability are confirmed on the booking site." },
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

export interface StayGuidePhoto {
  src: string;
  alt: string;
  sourceUrl: string;
  label: string;
}

export interface HotelStayGroup {
  id: string;
  title: string;
  intro: string;
  hotelIds: string[];
  photo: StayGuidePhoto;
  guidePath?: string;
  guideLabel?: string;
  browsePageId?: string;
}

/** A destination organized by hotel intent rather than neighborhood pages. */
export interface HotelStayDestination {
  id: string;
  name: string;
  path: string;
  title: string;
  metaDescription: string;
  intro: string;
  reviewedAt: string;
  photo: StayGuidePhoto;
  overview: string[];
  map: NeighborhoodStayGuide["map"];
  locations: { name: string; text: string }[];
  arrival: string[];
  groups: HotelStayGroup[];
  categoryIntro: string;
  comparisonIntro: string;
  comparison: { key: keyof ResortHotelFacts; label: string }[];
  locationLinkText: string;
  checklist: string[];
  faqs: { q: string; a: string }[];
  sourceIds: string[];
  related: CityStayGuide["related"];
}

export interface HotelCategoryGuide {
  id: string;
  destinationId: string;
  path: string;
  title: string;
  metaDescription: string;
  shortTitle: string;
  summary: string;
  photo: StayGuidePhoto;
  overviewTitle: string;
  detailNavLabel: string;
  checklistTitle: string;
  overview: string[];
  decisions: { title: string; text: string }[];
  comparison: { key: keyof ResortHotelFacts; label: string }[];
  picks: { hotelId: string; summary: string; bestFor: string; watch: string }[];
  detailTitle: string;
  details: { title: string; text: string }[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  sourceIds: string[];
}

export const deadSeaPhotos = {
  beach: { src: deadSeaBeachPhoto, alt: "Palm-lined Ein Bokek promenade, maintained beach and turquoise Dead Sea", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/dead_sea_beach_1.jpg", label: "Ein Bokek beach and promenade" },
  pool: { src: deadSeaPoolPhoto, alt: "Outdoor hotel swimming pools and sun loungers with the Dead Sea beyond", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/Dead_Sea_61.jpg", label: "Dead Sea resort pool scene" },
  landscape: { src: deadSeaLandscapePhoto, alt: "Aerial view of the southern Dead Sea hotel district and turquoise water", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/02/jerusalem_to_the_dead_sea.jpg", label: "Southern Dead Sea hotel district" },
  sunbeds: { src: deadSeaSunbedsPhoto, alt: "Shaded sun loungers beside a maintained Dead Sea beach and desert cliffs", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2025/08/dead_sea_beach_sunbeds_.jpg", label: "Dead Sea beach and shaded loungers" },
  einGedi: { src: einGediStayPhoto, alt: "A courtyard and low-rise hostel buildings beneath the desert cliffs at Ein Gedi", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/dead_sea_hostel.jpg", label: "Ein Gedi hostel setting" },
} satisfies Record<string, StayGuidePhoto>;

export const deadSeaStayGuide: HotelStayDestination = {
  id: "deadsea", name: "Dead Sea", path: "/travel-blog/best-dead-sea-hotels/",
  title: "Best Dead Sea hotels in Israel: spa, family & luxury stays",
  metaDescription: "Compare 11 Dead Sea stays in Israel, from luxury resorts to family hotels and Ein Gedi alternatives. Explore dedicated spa and family guides before booking.",
  intro: "Choose your Dead Sea stay by the holiday you want: a spa break, a family resort, an intimate luxury hotel or a nature-focused base near Ein Gedi. Compare the Israeli shore's options, then check rooms for your dates.",
  reviewedAt: "2026-10-17", photo: deadSeaPhotos.beach,
  categoryIntro: "Open a focused guide for a different set of comparisons: spa facilities and age policies, or children's activities, rooms and meal plans.",
  comparisonIntro: "Compare locations and access before room rates. The table includes nine resort hotels and two Ein Gedi alternatives; a sea view, a mineral-water pool and an operating beach are different features.",
  comparison: [{ key: "location", label: "Location" }, { key: "beach", label: "Beach arrangement" }, { key: "agePolicy", label: "Guest & spa ages" }],
  locationLinkText: "See the map and compare Ein Bokek, the southern hotel district and Ein Gedi.",
  overview: [
    "A Dead Sea hotel is often a large part of the holiday itself. Beach access, freshwater pools, spa entry, children's facilities and meals can matter more than choosing a particular street. This guide covers the Israeli side of the Dead Sea, with the main resort hotels around Ein Bokek and the southern district near Neve Zohar.",
    "Start with the tradeoff that matters to your party. Nevo offers a broad resort-and-spa format; Oasis Spa Club has an age-restricted spa focus. Leonardo Club is a family option marketed as all-inclusive, while VERT combines a central Ein Bokek setting with a more conventional resort stay. Kayma, Herods and Milos offer different styles of upscale accommodation.",
    "The comparison also includes Ein Gedi Hotel and HI Ein Gedi Hostel as inland alternatives. A Dead Sea view or a mineral-water pool does not establish access to an operating beach. Check the actual route to the water and the facilities included in the room offer, rather than relying on a 'spa' or 'beachfront' label.",
  ],
  map: { lat: 31.1997, lon: 35.3634, bounds: [35.325, 31.13, 35.405, 31.49], reference: "Ein Bokek reference point; map also covers the southern district and Ein Gedi" },
  locations: [
    { name: "Ein Bokek", text: "The main resort center, with the promenade, maintained beaches and a greater choice of shops and outside dining within walking reach. Check the hotel entrance and actual beach route." },
    { name: "Neve Zohar & the southern hotel district", text: "A more spread-out, resort-focused base. Choose the hotel for the facilities and dining you will use, and plan transport for trips beyond it." },
    { name: "Ein Gedi", text: "An inland nature-focused alternative north of the resort strip. Choose it for the surrounding landscape and local outings; plan a separate journey if you want to visit an operating Dead Sea beach." },
  ],
  arrival: [
    "Arrange the journey to the exact hotel, not simply to 'the Dead Sea'. Hotels around Ein Bokek, the southern resort district and Ein Gedi are different destinations. If arriving by bus, check the stop and the final walk with luggage; for a driver, confirm the entrance and return pickup.",
    "A car or a booked driver is useful for combining your stay with Masada and other sites along Route 90. Check current transport services, attraction access and hotel check-in for your travel date, especially Friday evening, Saturday and holidays. Reserve child seats or accessible transport where needed.",
  ],
  groups: [
    { id: "luxury", title: "Luxury & quieter resort stays", intro: "Choose between a smaller luxury format, a substantial beachfront spa resort and a low-rise design hotel. Check minimum guest ages and the exact room category before choosing a special stay.", hotelIds: ["ds-kayma", "ds-herods", "ds-milos"], photo: deadSeaPhotos.landscape, browsePageId: "stay-deadsea-luxury-browse" },
    { id: "spa", title: "Spa-focused hotels", intro: "Nevo and Oasis offer different wellness breaks: a broad full-service resort versus an age-restricted spa setting. The detailed guide also compares Herods, Milos and Noga by facilities, access and booking conditions.", hotelIds: ["ds-nevo", "ds-oasis"], photo: deadSeaPhotos.sunbeds, guidePath: "/dead-sea/spa-hotels/", guideLabel: "Compare Dead Sea spa hotels" },
    { id: "family", title: "Hotels for families with children", intro: "Compare an all-inclusive resort with a water park against a central beachfront hotel with a choice of meal plans. For more options, the family guide also covers Noga and Leonardo Plaza and the questions to ask for your children's ages.", hotelIds: ["ds-leonardo-club", "ds-vert"], photo: deadSeaPhotos.pool, guidePath: "/dead-sea/family-hotels/", guideLabel: "Compare Dead Sea family hotels" },
    { id: "value", title: "Value & practical resort alternatives", intro: "Value depends on the total offer, not a permanent 'cheap' label. Compare Noga's Ein Bokek setting with Leonardo Plaza's southern location, room options and separate route to the beach.", hotelIds: ["ds-noga", "ds-leonardo-plaza"], photo: deadSeaPhotos.beach, browsePageId: "stay-deadsea-value-browse" },
    { id: "ein-gedi", title: "Nature-focused stays near Ein Gedi", intro: "These two alternatives suit a different trip from a beachfront resort holiday. Ein Gedi Hotel adds gardens and a spa; the HI hostel offers a simpler base near the nature-reserve area. Check current access to the places you plan to visit.", hotelIds: ["ds-ein-gedi", "ds-hi-ein-gedi"], photo: deadSeaPhotos.einGedi, browsePageId: "stay-deadsea-ein-gedi-browse" },
  ],
  checklist: [
    "Confirm the hotel is on the Israeli shore and check its exact location",
    "Check whether beach access is direct, a walk, a pathway or a shuttle",
    "Enter all adults and the ages of every child for the room offer",
    "Confirm spa entry, minimum ages and charges for treatments or special pools",
    "Check meals, parking, taxes and other extras in the final total",
    "Read cancellation terms and reconfirm essential seasonal facilities before travel",
  ],
  faqs: [
    { q: "Does this guide include hotels in Jordan?", a: "No. It covers hotels on the Israeli side of the Dead Sea, including Ein Bokek, the southern hotel district near Neve Zohar and alternatives near Ein Gedi. Confirm the country and exact property on any booking platform." },
    { q: "Should I choose Ein Bokek or the southern hotel district?", a: "Ein Bokek is useful if you want the promenade, shops and outside dining within easier reach. The southern resorts suit a stay centered on the hotel's own beach, meals and facilities. Choose the actual property and arrival route rather than the area name alone." },
    { q: "Which Dead Sea hotel has an all-inclusive format?", a: "Leonardo Club Dead Sea is marketed by its operator as all-inclusive. Check the exact package, drinks, meal times and activity inclusions. Other hotels' breakfast or half-board rates are different products; the family guide explains how to compare them." },
    { q: "Does having a spa mean the hotel is adults-only?", a: "No. A hotel can accept families while restricting spa entry to older guests. Noga, for example, lists spa entry from age 16. Oasis Spa Club has a separate age-restricted hotel policy. Check the hotel's admission rules and each facility's age limit separately." },
    { q: "Can I choose Ein Gedi for a beachfront holiday?", a: "Treat Ein Gedi as a nature-focused base rather than assuming beach access beside your hotel. A view of the water and a Dead Sea water spa pool are different from an operating beach. Confirm your beach plan and transport before booking." },
  ],
  sourceIds: ["owner-hotels-deadsea", "ds-nevo-spa", "ds-noga-spa", "ds-herods-spa", "ds-ein-gedi-spa"],
  related: [
    { label: "Masada: plan your visit", to: "/travel-blog/masada/", note: "Tickets, cable car and practical visit information" },
    { label: "Transfers & private transport", to: "/transfers/", note: "Plan your arrival and return journey" },
    { label: "Car rental in Israel", to: "/car-rental/" },
    { label: "All accommodation", to: "/hotels/" },
  ],
};

export const tiberiasPhotos = {
  waterfront: { src: tiberiasWaterfrontPhoto, alt: "Tiberias waterfront, marina and hotels beside the Sea of Galilee", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/best_hotels_in_tiberias-1.webp", label: "Tiberias waterfront and marina" },
  heritage: { src: tiberiasHeritagePhoto, alt: "Historic basalt-stone buildings and palm trees at The Scots Hotel in Tiberias", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/The_Scots_Hotel_Tiberias.webp", label: "The Scots Hotel — historic buildings" },
  central: { src: tiberiasCentralPhoto, alt: "Caesar Premier Tiberias and the central promenade seen from the lake", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/caesar_premier_hotel_tiberias.jpg", label: "Caesar Premier and the Tiberias promenade" },
  sunrise: { src: galileeSunrisePhoto, alt: "Sunrise over the Sea of Galilee with a boat on the water", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/Israel_Sunrise_over_Sea_of_Galilee.jpg", label: "Sea of Galilee sunrise — destination scene" },
} satisfies Record<string, StayGuidePhoto>;

export const tiberiasStayGuide: HotelStayDestination = {
  id: "tiberias", name: "Tiberias", path: "/travel-blog/best-hotels-in-tiberias/",
  title: "Best hotels in Tiberias: family, luxury & lakeside stays",
  metaDescription: "Compare 10 Tiberias hotels and hostels by location, beach access and travel style. Explore focused family and luxury guides, then check rooms for your dates.",
  intro: "Find your base on the Sea of Galilee: a family hotel with water slides, a luxury lakeside retreat, a central hotel or a simpler independent stay. Start with the experience and location, then compare the room offer.",
  reviewedAt: "2026-10-17", photo: tiberiasPhotos.waterfront,
  categoryIntro: "Explore two focused comparisons: water parks, children's facilities and meal plans for families; or beach access, heritage settings and guest ages for a luxury or couples' break. Central and budget options remain in the complete guide below.",
  comparisonIntro: "All ten places below are in Tiberias. Compare a private swimming beach, a walk to the promenade and a room with a lake view as different features. The wider Sea of Galilee also has rural stays, but those are a different location choice from these town hotels.",
  comparison: [{ key: "location", label: "Location" }, { key: "beach", label: "Lake & beach access" }, { key: "agePolicy", label: "Guest & facility ages" }],
  locationLinkText: "See the map and compare the central waterfront, upper streets and lakeside hotel locations.",
  overview: [
    "Choose Tiberias if you want a town base with restaurants, the waterfront promenade and places to stay at several price levels. For Galilee sightseeing, think beyond the hotel view: Capernaum, Tabgha and other sites are spread around the lake. A central address helps with time in town, while a rental car, organized excursion or booked driver makes a different kind of trip possible.",
    "For families, Gai Beach combines a water park and a declared swimming beach; Leonardo Club combines activities with a central location, but its operator currently posts a full-board notice despite the all-inclusive branding. Caesar Premier is another family comparison if access to the promenade matters more than water slides. The focused family guide explains these differences before presenting room links.",
    "For an upscale break, compare U Boutique Kinneret's contemporary lakefront format, Galei Kinneret's 12+ guest policy and The Scots Hotel's historic buildings and usual 16+ policy. Sofia and Emily's offer other city-hotel formats; Tiberia Hotel and Tiberias Hostel provide smaller alternatives. These are editorial matches for different trips, rather than a claim that one hotel wins for every traveler or always costs less.",
  ],
  map: { lat: 32.7889, lon: 35.5418, bounds: [35.525, 32.762, 35.558, 32.812], reference: "Central Tiberias waterfront reference point; the map also shows the nearby northern and southern shores" },
  locations: [
    { name: "Promenade & lower town", text: "Useful for waterfront walks, restaurants and the marina. Caesar Premier and The Scots Hotel are central waterfront comparisons; Leonardo Club and the hostel are town bases. Being near the promenade does not establish a private swimming beach." },
    { name: "Streets above the waterfront", text: "A higher address can provide a lake outlook but a steeper return from town. Sofia is a comparison here. Check the actual entrance, steps, accessible route and the walk with luggage rather than relying on a straight-line distance." },
    { name: "Lakeside hotel edges", text: "U Boutique is toward the northern edge of the central waterfront; Galei Kinneret and Gai Beach are to the south. Compare the hotel's own beach and facilities, then consider journeys to dinner or sightseeing outside the property." },
  ],
  arrival: [
    "Give your driver the exact property and entrance. The waterfront, upper streets and southern hotels have different arrival routes. If you arrive by bus, check the final walk with luggage, reception hours and any hills. Arrange late check-in with smaller hotels and the hostel rather than assuming a staffed desk all night.",
    "If you will drive around the Galilee, compare parking availability, charges and access at the hotel. Without a car, plan your northern sightseeing through the tours or transport pages and check date-specific services, especially around Shabbat and holidays. Book suitable child seats when arranging family transport.",
  ],
  groups: [
    { id: "luxury", title: "Luxury & couples' stays", intro: "Compare a contemporary boutique hotel, a luxury beach hotel and a heritage property. Their guest ages and relationship to the lake differ, so choose the setting before paying for a particular room category.", hotelIds: ["tib-u-boutique", "tib-galei-kinneret", "tib-scots"], photo: tiberiasPhotos.heritage, guidePath: "/tiberias/luxury-hotels/", guideLabel: "Compare Tiberias luxury & couples' hotels" },
    { id: "family", title: "Family hotels & water activities", intro: "Gai Beach suits a holiday built around the beach and water park. Leonardo Club is a central activity hotel with a meal-plan notice to check. The full family guide also includes Caesar Premier for a promenade-based stay.", hotelIds: ["tib-gai-beach", "tib-leonardo-club"], photo: tiberiasPhotos.sunrise, guidePath: "/tiberias/family-hotels/", guideLabel: "Compare Tiberias family hotels" },
    { id: "central", title: "Central hotels & a base for exploring", intro: "Compare a full-service promenade hotel, a hotel above the waterfront and a smaller property near downtown. Choose for the daily walking route and the facilities you will actually use between Galilee outings.", hotelIds: ["tib-caesar", "tib-sofia", "tib-emily"], photo: tiberiasPhotos.central, browsePageId: "stay-tiberias-central-browse" },
    { id: "budget", title: "Budget-minded & independent stays", intro: "Compare a smaller hotel with hostel-style accommodation, including private and shared rooms. Check the final price for the same dates and party, plus bathrooms, meals and arrival arrangements; neither format guarantees the lowest total.", hotelIds: ["tib-tiberia", "tib-hostel"], photo: tiberiasPhotos.waterfront, browsePageId: "stay-tiberias-budget-browse" },
  ],
  checklist: ["Check the exact Tiberias address and the walking route, including hills", "Distinguish a swimming beach from a promenade or lake-view room", "Enter all guests and children's ages; check hotel and facility restrictions separately", "Confirm seasonal pools, water parks and essential facilities directly", "Read the actual meal plan, parking charges, taxes and final room total", "Confirm arrival arrangements and the cancellation deadline for the selected rate"],
  faqs: [
    { q: "Should I stay in Tiberias or elsewhere around the Sea of Galilee?", a: "Tiberias suits visitors who want town services, restaurants and the promenade. Rural and kibbutz stays around the lake can suit a quieter base but require a different transport plan. This shortlist covers Tiberias properties, not every hotel around the lake." },
    { q: "Which Tiberias hotels should families compare first?", a: "Start with Gai Beach for the water park and beach, Leonardo Club for central activities and its current meal-plan terms, and Caesar Premier for a promenade base. The family guide compares all three by children's facilities, meals and swimming arrangements." },
    { q: "Is Leonardo Club Tiberias currently all-inclusive?", a: "The hotel retains all-inclusive branding, but the operator page checked on 17 October 2026 says it is operating on full board instead. Confirm the current basis and exactly which meals, drinks and snacks your offer includes before paying." },
    { q: "Are the luxury hotels adults-only?", a: "They have different policies. U Boutique accepts families, Galei Kinneret states a minimum age of 12, and The Scots Hotel usually accepts guests from 16 with holiday and July–August exceptions. Confirm directly for all guests and dates; a spa can have additional restrictions." },
    { q: "Does a lakefront hotel guarantee a swimming beach?", a: "No. A lake view, lakeside garden, marina or promenade is different from access to a declared operating swimming beach. Check the hotel's actual beach arrangement, season and route before booking." },
    { q: "Can I stay in Tiberias without renting a car?", a: "A central hotel can work for time in town. For sights spread around the Galilee, plan an organized excursion, booked driver or current public-transport itinerary. Check the final walk to your hotel and services on your travel dates." },
  ],
  sourceIds: ["owner-hotels-tiberias"],
  related: [
    { label: "Tours & day trips", to: "/tours/", note: "Plan outings around the Galilee" },
    { label: "Transfers & private transport", to: "/transfers/", note: "Arrange the exact hotel and return journey" },
    { label: "Car rental in Israel", to: "/car-rental/" },
    { label: "All accommodation", to: "/hotels/" },
  ],
};

const tiberiasCategoryGuides: HotelCategoryGuide[] = [
  {
    id: "family", destinationId: "tiberias", path: "/tiberias/family-hotels/", shortTitle: "Family hotels",
    title: "Best family hotels in Tiberias: pools, water parks & meals",
    metaDescription: "Compare Gai Beach, Leonardo Club and Caesar Premier for a Tiberias family holiday. Check water parks, beach access, room layouts and the current meal plan.",
    summary: "Choose between a beach-and-water-park holiday, a central activity hotel and a promenade base. Compare three Tiberias family hotels by children's facilities, meal plans and the practical details that change the whole family total.",
    photo: tiberiasPhotos.sunrise,
    overviewTitle: "Match the hotel to your children's ages and your days out", detailNavLabel: "Meals & rooms", checklistTitle: "Children, rooms & swimming",
    overview: [
      "Start with how your family will spend the day. Gai Beach is a comparison for beach time and the water park, Leonardo Club for children's activities near the town, and Caesar Premier for a central hotel beside the promenade. The most useful choice depends on whether hotel activities or Galilee outings will fill most of your time.",
      "A family-hotel label does not confirm a cot, separate sleeping area or suitable slides for every child. Enter every child's age, inspect the actual room layout and check seasonal operation. If you need two rooms with an internal connection, ask for that connection to be confirmed rather than relying on a request field.",
      "Meal-plan descriptions need particular attention here. Leonardo Club Tiberias is still marketed as all-inclusive, but the operator's current notice says full board instead. Treat the exact written offer as the basis for comparing meals and drinks. Caesar's 18+ thermal-pool rule is a facility restriction, not a ban on children staying at the hotel.",
    ],
    decisions: [
      { title: "Water park or a town base?", text: "Gai Beach's water park and declared beach suit time at the hotel. Leonardo Club and Caesar are central town comparisons, with different pool and activity arrangements; neither should be assumed to include a private beach." },
      { title: "Toddlers, school-age children or teens?", text: "Check pool depth, slide height and age rules, club groups and whether a parent must remain. A resort's headline activity list may not suit every child's age." },
      { title: "What does the room actually fit?", text: "Compare beds, maximum occupancy, cots and the layout when extra beds are in place. A family room, suite and pair of connecting rooms can provide very different evenings and sleeping arrangements." },
      { title: "Which meals will you use?", text: "Compare all-inclusive, full board, half board and breakfast on their actual inclusions. Count drinks, snacks, outside meals and any lunch missed while touring in the family total." },
    ],
    comparison: [{ key: "children", label: "Children's facilities" }, { key: "meals", label: "Meal-plan checks" }, { key: "beach", label: "Swimming & beach" }],
    picks: [
      { hotelId: "tib-gai-beach", summary: "Choose Gai Beach when the water park and beach are central to the holiday rather than an occasional extra. The operator advertises water-park entry for hotel guests, alongside slides, children's areas and a declared beach. The southern-shore setting also means considering journeys into town or around the Galilee.", bestFor: "Families wanting water activities and beach time as a substantial part of the stay.", watch: "Confirm opening dates, current hours, separate-swimming sessions and slide restrictions for each child. Check the exact guest-entry entitlement, room layout, meals and parking in your booking." },
      { hotelId: "tib-leonardo-club", summary: "Leonardo Club is a different family format: a central hotel with children's and teens' clubs, pools and seasonal water slides. Compare it when activities and on-site meals matter alongside access to town. The operator currently says full board instead of all-inclusive, so use the written package rather than the hotel's branding to decide its value.", bestFor: "Families looking for an activity hotel near the promenade and a package built around meals.", watch: "Ask which drinks, snacks and services are included under full board. Reconfirm pool and slide operation, club supervision, the children's age groups and the room's maximum occupancy. There is no private hotel beach." },
      { hotelId: "tib-caesar", summary: "Caesar Premier suits a family trip combining time at the hotel with waterfront walks and outings. Its promenade setting, outdoor pool and children's playroom give a different comparison from a water-park resort. The spa's thermal mineral pool is reserved for guests aged 18 and over, so it is not part of a younger child's activity plan.", bestFor: "Families prioritizing a central promenade location and hotel facilities between excursions.", watch: "Confirm outdoor-pool opening, family-room beds and current children's programming. The thermal mineral pool is 18+; ask separately about facilities appropriate for your children. Check meals, parking and the actual swimming plan." },
    ],
    detailTitle: "Full board, all-inclusive & a room that works for everyone",
    details: [
      { title: "Leonardo Club: read the current full-board notice", text: "The operator page checked on 17 October 2026 retains all-inclusive marketing but explicitly says the hotel is operating on full board instead. Full board normally describes meals, while drinks, snacks and other services depend on the offer. Get the current inclusions confirmed in writing and compare the same dates and cancellation terms." },
      { title: "Seasonal water attractions need a date check", text: "A photograph of slides does not establish that they will run during your stay. Confirm Gai Beach's current water-park calendar and Leonardo Club's pool and slide operation, including maintenance and weather limitations. Ask which areas suit your children's ages and whether an adult needs to accompany them." },
      { title: "Separate hotel admission from facility ages", text: "Caesar Premier accepts families while restricting its thermal mineral pool to guests aged 18 and over. Water slides, spas and activity clubs can each have their own rules. For a toddler or school-age child, compare the freshwater pools and children's facilities that the hotel confirms they can actually use." },
      { title: "Compare the whole family total", text: "Enter all adults and the ages of all children on the booking site. Add meals and drinks outside the package, parking and transport for outings. Confirm a cot, extra bed or essential connecting doorway directly, then check whether the cancellation deadline allows you to change plans." },
    ],
    checklist: ["Enter every child's age and confirm beds, cots and maximum room occupancy", "Ask about slide rules, club ages, supervision and the current pool calendar", "Check the actual swimming-beach arrangement and route with a stroller", "Get the current meal basis and drinks or snack inclusions in writing", "Include parking, outside meals and Galilee transport in the family total", "Confirm child seats, arrival timing and the cancellation deadline"],
    faqs: [
      { q: "Which hotel in this shortlist has a water park?", a: "Gai Beach advertises a water park with guest entry, and Leonardo Club lists seasonal water slides. They are different facilities. Confirm the calendar, entry terms and each child's eligibility rather than assuming all attractions operate throughout the year." },
      { q: "Can I book Leonardo Club Tiberias as all-inclusive?", a: "Check the exact current offer. The operator notice reviewed on 17 October 2026 says full board instead of all-inclusive. Ask the hotel to confirm meals, drinks, snacks and other inclusions before paying." },
      { q: "Can children stay at Caesar Premier?", a: "Yes, it is a family-hotel comparison. Its 18+ thermal mineral-pool restriction is separate from hotel admission. Check the outdoor pool and children's facilities for your dates and the ages of your children." },
      { q: "Are all three hotels on a private swimming beach?", a: "No. Gai Beach advertises a declared beach by its water park. Leonardo Club is a town hotel, and Caesar's promenade position does not establish a private beach. Confirm the actual swimming arrangement before deciding." },
      { q: "Should I choose a family room or connecting rooms?", a: "Compare the actual floor plan, beds and maximum occupancy. A family room may keep everyone in one space; connecting rooms require an internal doorway between two rooms. If that connection is essential, get it confirmed in writing." },
    ],
    sourceIds: [],
  },
  {
    id: "luxury", destinationId: "tiberias", path: "/tiberias/luxury-hotels/", shortTitle: "Luxury & couples' hotels",
    title: "Best luxury hotels in Tiberias: lakeside & couples' stays",
    metaDescription: "Compare U Boutique Kinneret, Galei Kinneret and The Scots Hotel for a luxury Tiberias stay. Check beach access, heritage settings, spa inclusions and guest ages.",
    summary: "Compare three different luxury stays on the Sea of Galilee: contemporary boutique comfort, a beach-and-spa hotel and a historic waterfront setting. Choose the atmosphere, lake access and guest policy that fit your trip.",
    photo: tiberiasPhotos.heritage,
    overviewTitle: "Choose the setting before the room category", detailNavLabel: "Beach, spa & ages", checklistTitle: "Setting, guest ages & spa",
    overview: [
      "Luxury in Tiberias can mean different things. U Boutique Kinneret offers a contemporary lakefront hotel with a smaller boutique format; Galei Kinneret combines a private beach and spa with a minimum guest age of 12; The Scots Hotel offers historic basalt-stone buildings, gardens and a central waterfront setting. Compare these experiences before comparing room names.",
      "For couples, privacy, the room's outlook and the facilities you plan to use may matter more than the length of the amenities list. A lake-view room is not implied by every booking, and lakefront gardens do not establish a swimming beach. Check the exact room and how you reach the water.",
      "None of these labels alone guarantees a child-free stay. U Boutique accepts families; Galei Kinneret allows guests from 12; The Scots Hotel usually has a 16+ policy, with holiday and July–August exceptions that need direct confirmation. Ask about your travel dates and distinguish admission to the hotel from entry to a spa or treatment area.",
    ],
    decisions: [
      { title: "Contemporary boutique or historic character?", text: "U Boutique is the contemporary lakeside comparison. The Scots Hotel is the heritage option, with restored hospital buildings and gardens. Galei Kinneret is a comparison when a beach-and-spa setting is the priority." },
      { title: "Will you actually swim in the lake?", text: "U Boutique and Galei Kinneret advertise private beach areas; confirm operation for your dates. At The Scots Hotel, compare the gardens and seasonal pool without assuming a swimming beach beside the room." },
      { title: "How quiet do you need the stay to be?", text: "Check the property's guest-age rules, exceptions and any events for the dates you want. A minimum age of 12 or 16 is different from an adults-only 18+ policy." },
      { title: "What is included in the special stay?", text: "Confirm breakfast or other meals, spa access, treatments, parking and the room's actual view. A more expensive room category may change the outlook or space without including every hotel service." },
    ],
    comparison: [{ key: "beach", label: "Lake & beach arrangement" }, { key: "spa", label: "Spa & pool checks" }, { key: "agePolicy", label: "Guest ages" }],
    picks: [
      { hotelId: "tib-u-boutique", summary: "U Boutique Kinneret suits a contemporary lakeside break where the beach area and seasonal pool matter alongside a smaller hotel format. It is a useful comparison for couples who want lake access without choosing a heritage property. Families are accepted, so the boutique label does not imply an adults-only setting.", bestFor: "Couples seeking contemporary comfort and lake access, or guests who prefer a smaller upscale format.", watch: "Check beach and pool operation, spa entry and treatment charges. Confirm the room's view and layout, meals and parking, and ask about any date-specific facility changes." },
      { hotelId: "tib-galei-kinneret", summary: "Choose Galei Kinneret when a luxury lakeside hotel, private beach and wellness facilities form the core of the holiday. The operator's minimum guest age of 12 distinguishes it from an unrestricted family resort, while still allowing eligible teenagers. Compare its actual room-and-dining package with the alternatives.", bestFor: "Couples and eligible older guests prioritizing a beach-and-spa stay on the southern waterfront.", watch: "Every guest must meet the 12+ hotel policy. Reconfirm beach season, spa entry and treatments, pool operation and the precise room category; do not assume all services are included in the room price." },
      { hotelId: "tib-scots", summary: "The Scots Hotel is the heritage choice: restored hospital buildings, basalt-stone architecture and gardens in a central waterfront location. It suits a stay built around atmosphere and time in town as much as hotel leisure. Its lakeside setting should not be confused with a hotel swimming beach.", bestFor: "Couples and heritage-focused visitors wanting a distinctive historic hotel and access to central Tiberias.", watch: "The usual policy is 16+, with exceptions during holidays and July–August. Contact reservations directly for a stay with children. Confirm the building and room category, seasonal pool, spa services and dining inclusions." },
    ],
    detailTitle: "Beach access, spa inclusions & choosing a quieter stay",
    details: [
      { title: "A lake view and a swimming beach are different", text: "Choose a room for its confirmed outlook, then check beach access separately. U Boutique and Galei Kinneret advertise private beach arrangements, subject to current operation. The Scots Hotel's gardens and waterfront location offer a different experience. A marina or promenade is not evidence of an operating swimming beach." },
      { title: "Check hotel ages and spa ages separately", text: "Galei Kinneret's operator states a hotel minimum age of 12. The Scots Hotel normally accepts guests from 16, with exceptions in holidays and July–August; direct confirmation is needed for younger guests. U Boutique accepts families. In every case, a spa, pool or treatment can have separate access rules." },
      { title: "Book the wellness experience you intend to use", text: "A spa on the property does not mean massages, every treatment or every facility is included in the room. Confirm basic entry, opening hours, any age restrictions and advance treatment reservations. If a particular pool or treatment is essential to the trip, reconfirm directly before the cancellation deadline." },
      { title: "Choose between hotel time and exploring", text: "The Scots Hotel has a central waterfront setting, while the other two offer different lakeside positions. Check the actual walking route, hotel entrance and parking if you will visit sites around the Galilee. Compare transport and outside dining with the cost of the room and meal package." },
    ],
    checklist: ["Confirm guest ages and any date-specific exceptions directly", "Check the precise room category, lake outlook and layout", "Verify beach, seasonal pool and spa operation for the stay", "Confirm treatments, meals and other services included in the offer", "Ask about parking, access needs and any events affecting the stay", "Compare the total and cancellation deadline for the same dates"],
    faqs: [
      { q: "Which Tiberias luxury hotel is adults-only?", a: "Do not treat this shortlist as uniformly adults-only. U Boutique accepts families, Galei Kinneret has a 12+ hotel policy, and The Scots Hotel normally uses 16+ with date-specific exceptions. Confirm the current policy and atmosphere for your dates." },
      { q: "Which hotels advertise private beach access?", a: "U Boutique Kinneret and Galei Kinneret advertise private beach areas. Check current operation and the route to the water. The Scots Hotel's lakefront gardens do not establish a swimming beach." },
      { q: "Is The Scots Hotel a good choice for a historic setting?", a: "It is the heritage-focused comparison here, with restored hospital buildings, basalt-stone architecture and gardens on the central waterfront. Compare the exact building and room category with your accessibility and space needs." },
      { q: "Does a luxury room include spa treatments?", a: "Only if the specific offer says so. Confirm basic spa access separately from massages and other treatments, along with age limits and advance-booking requirements." },
      { q: "Should I pay extra for a lake-view room?", a: "It depends on how much time you plan to spend in the room and the confirmed outlook. Compare the actual room description and any balcony rather than assuming every room in a waterfront hotel faces the lake." },
    ],
    sourceIds: [],
  },
];

export const haifaPhotos = {
  panorama: { src: haifaPanoramaPhoto, alt: "Haifa Bay, the Bahá'í Gardens and the lower city seen from Mount Carmel", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/best_hotels_in_haifa_.webp", label: "Haifa Bay and the Bahá'í Gardens — city panorama" },
  botanica: { src: haifaBotanicaPhoto, alt: "Botanica Hotel's rooftop plunge pool overlooking the Bahá'í Gardens at dusk", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/hotel_botanica_haifa.webp", label: "Hotel Botanica — rooftop plunge pool" },
  colony: { src: haifaColonyPhoto, alt: "Preserved stone facade and balconies of The Colony Hotel in Haifa", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/colony_hotel_haifa.webp", label: "The Colony Hotel — German Colony exterior" },
  leonardo: { src: haifaLeonardoPhoto, alt: "Entrance of Leonardo Plaza Haifa beside the beachfront", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/leonardo_plaza_haifa.jpg", label: "Leonardo Plaza Haifa — entrance" },
  danCarmel: { src: haifaDanCarmelPhoto, alt: "Dan Carmel Haifa hotel building and balconies on Mount Carmel", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/2026/01/Dan_Carmel_hotel_haifa.jpg", label: "Dan Carmel Haifa — hotel exterior" },
} satisfies Record<string, StayGuidePhoto>;

export const haifaStayGuide: HotelStayDestination = {
  id: "haifa", name: "Haifa", path: "/travel-blog/best-hotels-in-haifa/",
  title: "Best hotels in Haifa: boutique, family & luxury stays",
  metaDescription: "Compare 10 Haifa hotels and guesthouses by location, travel style and facilities. Explore boutique and family guides, from the German Colony to Carmel and the beach.",
  intro: "Choose a heritage hotel in the German Colony, a Carmel hotel overlooking the bay or a family stay beside the beach. Compare ten places to stay, understand Haifa's hills and neighborhoods, then check the right room for your trip.",
  reviewedAt: "2026-10-17", photo: haifaPhotos.panorama,
  categoryIntro: "Open a focused boutique comparison for design, heritage and guest-age policies, or a family guide for pools, room layouts and the choice between the beach and Mount Carmel. Luxury, mid-range and independent options are also covered in the complete guide below.",
  comparisonIntro: "Haifa's elevation changes the daily experience. A room with a bay view on the Carmel is different from a hotel beside a swimming beach; the German Colony and downtown offer another urban base. Compare locations and facilities before looking at the final room total.",
  comparison: [{ key: "location", label: "City setting" }, { key: "beach", label: "Beach access" }, { key: "agePolicy", label: "Guest & facility ages" }],
  locationLinkText: "See the map and compare the German Colony, Carmel, Hadar and beachfront settings.",
  overview: [
    "Start by deciding where you want to spend your time. The German Colony suits a city break around historic streets, restaurants and the lower Bahá'í Gardens. Carmel Center gives a higher base near the Louis Promenade and bay viewpoints. For beach time, Leonardo Plaza's southern seafront position is a different choice from either of those neighborhoods.",
    "The luxury comparison begins with Botanica's contemporary German Colony setting and Dan Carmel's classic hilltop hotel format. For heritage boutique stays, compare The Schumacher and The Colony Hotel. Families can compare Crowne Plaza's indoor pool, Leonardo Plaza's beachfront setting and Dan Carmel's pools and family-room options in the dedicated family guide.",
    "Golden Crown and Nof provide two practical city-hotel comparisons on different levels of Haifa: the lower city and the Carmel. Nof is the property called Haifa Bay View in the original guide and may still appear under that name on booking sites. Port Inn and Loui Talpiot offer smaller independent formats. 'Mid-range' and 'budget-minded' describe the comparison, not fixed nightly prices or a promise that one hotel is always cheaper.",
  ],
  map: { lat: 32.8191, lon: 34.9884, bounds: [34.951, 32.785, 35.017, 32.837], reference: "German Colony reference point; map also covers Carmel Center, Hadar and the southern beachfront" },
  locations: [
    { name: "German Colony & lower city", text: "Historic streets and restaurants below the Bahá'í Gardens, with downtown and the port district nearby. Botanica, Schumacher, Colony and Golden Crown are comparisons here; Port Inn is a lower-city option. Check the actual port entrance and station route if arriving with luggage." },
    { name: "Carmel Center & Hadar", text: "Dan Carmel, Crowne Plaza and Nof occupy the higher Carmel area. Loui Talpiot is in the market neighborhood of Hadar, on a different level. Map distance can hide steep climbs, so compare the route and transport rather than assuming every nearby point is an easy walk." },
    { name: "Southern beachfront", text: "Leonardo Plaza suits time on the beach and promenade. It is a different base from the German Colony and Carmel viewpoints. Include journeys into town and to your planned attractions when deciding whether to stay by the shore." },
  ],
  arrival: [
    "Arrange the journey to the exact hotel entrance. If arriving by train, choose the station and final transfer for your property; a lower-city hotel, a Carmel hotel and the southern beachfront need different plans. Check current services, the walk with luggage and any steps or steep streets, especially for late arrivals or mobility needs.",
    "If combining a stay with a cruise, confirm your terminal, ship schedule and the actual pickup or drop-off point. A hotel near the port is not a guarantee of a walkable cruise entrance. For Galilee outings, compare a rental car, tour or booked driver, and confirm hotel parking and date-specific transport around Shabbat and holidays.",
  ],
  groups: [
    { id: "luxury", title: "Luxury hotels: German Colony or Carmel", intro: "Compare Botanica's contemporary design and age-restricted setting with Dan Carmel's larger hilltop hotel and family facilities. Choose between the neighborhood, the room's outlook and the leisure experience you want.", hotelIds: ["haifa-botanica", "haifa-dan-carmel"], photo: haifaPhotos.botanica },
    { id: "boutique", title: "Boutique hotels & historic character", intro: "The Schumacher combines a preserved building and newer wing with an adults-only policy; The Colony Hotel offers a heritage address on Ben Gurion Boulevard. The detailed boutique guide also includes Botanica as a larger design-led alternative.", hotelIds: ["haifa-schumacher", "haifa-colony"], photo: haifaPhotos.colony, guidePath: "/haifa/boutique-hotels/", guideLabel: "Compare Haifa boutique hotels" },
    { id: "family", title: "Hotels for families with children", intro: "Compare a heated indoor pool on the Carmel with a beachfront hotel and children's facilities. The dedicated family guide also covers Dan Carmel, room occupancy and the activities that are actually available on your travel dates.", hotelIds: ["haifa-crowne-plaza", "haifa-leonardo-plaza"], photo: haifaPhotos.leonardo, guidePath: "/haifa/family-hotels/", guideLabel: "Compare Haifa family hotels" },
    { id: "mid-range", title: "Practical city hotels & mid-range comparisons", intro: "Golden Crown is a lower-city base near the German Colony; Nof is a Carmel address with bay views. Compare the final room offer and your daily transport rather than expecting the same experience from hotels in a similar price bracket.", hotelIds: ["haifa-golden-crown", "haifa-nof"], photo: haifaPhotos.panorama },
    { id: "budget", title: "Budget-minded & independent stays", intro: "Port Inn is a downtown guesthouse comparison; Loui Talpiot adds a market-neighborhood location and room kitchenettes. Check the exact room and included services, with meals, bathrooms and arrival arrangements part of the decision.", hotelIds: ["haifa-port-inn", "haifa-loui-talpiot"], photo: haifaPhotos.panorama },
  ],
  checklist: ["Match the hotel to the German Colony, Carmel, Hadar or beach part of your trip", "Check hills, steps and the actual luggage route from the arrival point", "Enter every guest's age and confirm the room's maximum occupancy", "Confirm seasonal pools, club dates, spa entry and any essential facility", "Compare meals, parking, taxes and local transport in the final total", "Read cancellation terms and confirm late or Shabbat arrival arrangements"],
  faqs: [
    { q: "Is it better to stay on Mount Carmel or in the German Colony?", a: "Choose the Carmel for the Louis Promenade, bay viewpoints and a higher hotel base. The German Colony suits historic streets, restaurants and the lower part of the Bahá'í Gardens. Haifa is steep, so compare the actual daily route and transport rather than map distance alone." },
    { q: "Which hotel should I compare for a beach holiday?", a: "Leonardo Plaza is the beachfront comparison in this shortlist, with access to the shore from the pool area. Carmel hotels can offer impressive sea views while still requiring a separate journey to a swimming beach." },
    { q: "Which boutique hotels are suitable for a couples' break?", a: "Compare The Schumacher and The Colony Hotel for heritage settings in the German Colony, and Botanica for contemporary design, a spa and a seasonal rooftop plunge pool. Check the individual age policy, room and inclusions; boutique is not a single facilities standard." },
    { q: "Are Botanica and Schumacher options for young children?", a: "They are excluded from this guide's young-family shortlist. Botanica's operator describes age-restricted stays from 16, while Schumacher's own site says adults-only. Confirm exact eligibility directly. The family guide compares Leonardo Plaza, Crowne Plaza and Dan Carmel instead." },
    { q: "Is Nof Hotel the same property as Haifa Bay View?", a: "The property at 101 Hanassi Avenue, listed as Haifa Bay View in the original guide, is presented by Nara Hotels as Nof Hotel. Booking platforms may retain the Bay View name. Check the address and exact room when following the booking link." },
    { q: "Can I use a Haifa hotel before or after a cruise?", a: "Yes, but plan the journey for the actual terminal and ship schedule. A hotel near the port district is not proof of a walkable passenger entrance. Confirm luggage storage, reception times and pickup arrangements before choosing a short stay." },
  ],
  sourceIds: ["owner-hotels-haifa", "haifa-botanica-facilities", "haifa-dan-carmel-rooms"],
  related: [
    { label: "Shore excursions from Haifa Port", to: "/haifa-shore-excursions/", note: "Plan the day around your ship's schedule" },
    { label: "Transfers & private transport", to: "/transfers/", note: "Arrange the exact hotel and arrival point" },
    { label: "Tours & day trips", to: "/tours/" },
    { label: "Car rental in Israel", to: "/car-rental/" },
    { label: "All accommodation", to: "/hotels/" },
  ],
};

const haifaCategoryGuides: HotelCategoryGuide[] = [
  {
    id: "boutique", destinationId: "haifa", path: "/haifa/boutique-hotels/", shortTitle: "Boutique hotels",
    title: "Best boutique hotels in Haifa: German Colony & design stays",
    metaDescription: "Compare The Schumacher, The Colony Hotel and Botanica in Haifa's German Colony. Check heritage settings, guest ages, rooftop facilities and room choices before booking.",
    summary: "Choose between restored historic buildings and a contemporary design-led hotel below the Bahá'í Gardens. Compare three German Colony stays by character, guest policy and the facilities that matter to your city break.",
    photo: haifaPhotos.colony,
    overviewTitle: "Choose the character and facilities you want", detailNavLabel: "Heritage, ages & facilities", checklistTitle: "Room, setting & guest ages",
    overview: [
      "Haifa's German Colony is a useful place to begin a boutique-hotel search if restaurants, historic architecture and an urban base matter to you. The Schumacher and The Colony Hotel offer different heritage settings. Botanica is included as a larger, contemporary luxury alternative for visitors who put design and wellness facilities ahead of a small property size.",
      "A boutique label does not establish a pool, a restaurant, a balcony or an adults-only policy. Compare your actual room and the way you plan to spend the day. Schumacher's garden and sun terrace, Colony's historic boulevard setting and Botanica's spa and seasonal plunge pool create different stays within the same broad neighborhood.",
      "Guest ages need a separate check. Schumacher's own site describes adults-only stays; Botanica's operator lists an age restriction from 16. Confirm the exact eligibility for your dates and party rather than treating all boutique properties as interchangeable. Families with younger children should start with the dedicated family guide.",
    ],
    decisions: [
      { title: "Preserved building or contemporary design?", text: "Compare Schumacher's restored Templer building and modern wing with Colony's historic boulevard building. Botanica offers a contemporary design-led alternative and a larger hotel format." },
      { title: "Terrace, treatments or a pool?", text: "A sun terrace and a treatment room are different from a swimming pool. Botanica's operator specifically describes a rooftop plunge pool, with seasonal operation. Check the facilities you actually intend to use." },
      { title: "Main boulevard or side-street address?", text: "Colony sits on Ben Gurion Boulevard; Schumacher is on Lohamei HaGeta'ot Street; Botanica is beside the lower gardens. Check the room's outlook, street noise and walk to your chosen restaurants." },
      { title: "Can every guest stay?", text: "Get the hotel's precise minimum guest age confirmed. A couples' atmosphere, a restricted admission policy and spa age limits are separate matters; room capacity is another check." },
    ],
    comparison: [{ key: "location", label: "Neighborhood setting" }, { key: "spa", label: "Leisure facilities" }, { key: "agePolicy", label: "Guest policy" }],
    picks: [
      { hotelId: "haifa-schumacher", summary: "Choose The Schumacher when a preserved building, garden and smaller neighborhood-hotel format are central to the trip. Its combination of historic and modern wings gives another room choice within the German Colony. The operator's own site says adults-only, making the admission policy part of the decision rather than a detail to check after booking.", bestFor: "Couples and independent adults seeking heritage character, design and a German Colony base.", watch: "Confirm the exact minimum age, building, room layout and step-free route if needed. Ask where breakfast is served and how treatments and parking work; do not assume a full resort facilities package." },
      { hotelId: "haifa-colony", summary: "The Colony Hotel is the comparison for a preserved building directly on Ben Gurion Boulevard. Its location makes the neighborhood's restaurants and architecture part of the stay, with the lower Bahá'í Gardens as a nearby landmark. Choose the room and outlook as carefully as the historic exterior.", bestFor: "Visitors wanting a heritage hotel on the main German Colony boulevard and a city break focused on walking and dining.", watch: "Ask about your room's view, street noise, accessibility and maximum occupancy. Check breakfast and spa-treatment inclusions separately, along with parking and arrival arrangements." },
      { hotelId: "haifa-botanica", summary: "Botanica is the contemporary luxury alternative in this comparison. Its botanical design, spa and seasonal rooftop plunge pool suit a stay where the hotel experience matters alongside the German Colony location. It is larger than the two heritage boutiques, so choose it for the experience rather than expecting an intimate guesthouse.", bestFor: "Couples and eligible older guests prioritizing contemporary design and wellness facilities.", watch: "Confirm the operator's 16+ guest policy and exact eligibility. The rooftop facility is a plunge pool, not a full-size swimming pool; check its season, spa access, treatments and the room's actual outlook." },
    ],
    detailTitle: "Historic rooms, age policies & what a boutique stay includes",
    details: [
      { title: "The German Colony is below the Carmel viewpoints", text: "These hotels are comparisons for the lower German Colony setting, rather than hilltop addresses by the Louis Promenade. Seeing the gardens from your hotel does not establish access through every terrace or gate. Check current visiting arrangements and plan the route to the sights you will actually visit." },
      { title: "Confirm the room inside the building", text: "In a heritage property, room layout, floor and access can matter as much as the exterior. Ask about the wing, steps, bathroom, balcony and outlook of the room category you are booking. A photograph of a terrace or a special room does not mean every room includes it." },
      { title: "Read guest policies before choosing dates", text: "Schumacher's operator describes adults-only accommodation. Botanica describes an age-restricted stay from 16; confirm its exact minimum-age rule for every guest. At Colony, check the selected room's occupancy and any relevant facility rules. Do not infer a shared policy from the boutique label." },
      { title: "Compare the complete hotel experience", text: "Confirm breakfast inclusion and where it is served, treatment charges, parking and late-arrival arrangements. For Botanica, check the seasonal plunge pool and spa separately. Compare the same dates and cancellation conditions before deciding which offer provides the stay you want." },
    ],
    checklist: ["Confirm minimum ages, guest eligibility and room occupancy", "Check the actual building, floor, room layout and any steps", "Confirm whether your room has the balcony or outlook you want", "Check seasonal leisure facilities, treatments and breakfast arrangements", "Include parking, meals and transport to the Carmel or beach in the total", "Read the cancellation deadline and confirm your arrival time"],
    faqs: [
      { q: "Which Haifa boutique hotels are compared here?", a: "The Schumacher and The Colony Hotel are the heritage-focused comparisons in the German Colony. Botanica is a larger, contemporary design-led alternative with a spa and seasonal rooftop plunge pool." },
      { q: "Are these hotels all adults-only?", a: "They have different policies. Schumacher's own site says adults-only; Botanica's operator lists a restriction from age 16. Confirm exact eligibility directly and check Colony's selected room and facility policies separately." },
      { q: "Does a boutique hotel in Haifa necessarily have a pool?", a: "No. Compare the actual leisure facilities. A sun terrace or treatment room is not a pool, and Botanica specifically describes its rooftop facility as a plunge pool for a dip and relaxation." },
      { q: "Is the German Colony convenient for a beach holiday?", a: "It is principally an urban base for dining, architecture and the lower gardens. Plan a separate beach journey. If immediate beach access is your priority, compare the beachfront option in the main and family guides." },
      { q: "Will every room overlook the Bahá'í Gardens?", a: "No view should be assumed from the hotel's location or a promotional photograph. Check the exact room category, outlook and any balcony in the offer before booking." },
    ],
    sourceIds: ["haifa-botanica-facilities"],
  },
  {
    id: "family", destinationId: "haifa", path: "/haifa/family-hotels/", shortTitle: "Family hotels",
    title: "Best family hotels in Haifa: beach, pools & Carmel stays",
    metaDescription: "Compare Leonardo Plaza, Crowne Plaza and Dan Carmel for a Haifa family trip. Check beach access, pools, children's activities, room occupancy and transport.",
    summary: "Choose a beachfront family stay or a Carmel base with hotel pools and city outings. Compare three Haifa hotels by swimming arrangements, room layouts and the daily journeys you will make with children.",
    photo: haifaPhotos.danCarmel,
    overviewTitle: "Decide between beach days and a Carmel city base", detailNavLabel: "Pools, rooms & transport", checklistTitle: "Children, rooms & pool access",
    overview: [
      "Start with your family's daily plan. Leonardo Plaza puts the beach and promenade beside the hotel. Crowne Plaza offers a Carmel address with a heated indoor pool. Dan Carmel combines a higher city setting with hotel gardens, an outdoor pool and a separate children's pool. Each suits a different balance of hotel time and outings.",
      "A bay view from the Carmel is not the same as immediate beach access. Factor in the journeys to the shore, downtown or your chosen attractions, especially with a stroller or tired children. If you need step-free access or car seats, arrange them for the actual hotel entrance and transport plan.",
      "Match the room to the whole party before comparing a headline rate. Dan Carmel's published occupancy varies between categories, and a hotel's family-friendly label does not establish a separate bedroom or an internal connection. Also check the dates of children's programming: Leonardo Plaza lists club activity on weekends, holidays and in July–August, not an unrestricted daily timetable.",
    ],
    decisions: [
      { title: "Beach and promenade nearby", text: "Compare Leonardo Plaza when swimming and time by the sea are central to the holiday. Ask about current beach arrangements, the pool calendar and the exact room or suite layout." },
      { title: "Indoor pool on the Carmel", text: "Compare Crowne Plaza when an indoor swimming option and Carmel Center matter more than immediate beach access. Confirm children's admission, supervision and operating hours directly." },
      { title: "Hotel grounds and an upscale base", text: "Dan Carmel offers another family format with gardens, an outdoor pool and a separate children's pool. Check the pool season and choose a room category with the right capacity for all children." },
      { title: "Space and transport together", text: "Compare beds, room connections and cots alongside parking, taxis and outing costs. A room that sleeps everyone may still differ from the layout your family needs at bedtime." },
    ],
    comparison: [{ key: "children", label: "Family facilities" }, { key: "beach", label: "Beach & daily journeys" }, { key: "meals", label: "Meals to check" }],
    picks: [
      { hotelId: "haifa-leonardo-plaza", summary: "Choose Leonardo Plaza when the beach and promenade are part of your daily routine. Its operator advertises a main pool covered and heated in colder seasons, children's pools and a club with a date-dependent schedule. The beachfront setting is a different choice from the hilltop hotels, especially if you expect to spend substantial time by the water.", bestFor: "Families prioritizing immediate access to the beach area, pools and a coastal holiday setting.", watch: "Confirm the suite's actual bedrooms, beds, balcony and outlook. Check pool and beach operation; the operator lists children's club activity on weekends, holidays and July–August. Arrange transport for outings away from the beachfront." },
      { hotelId: "haifa-crowne-plaza", summary: "Crowne Plaza suits a family city break based near Carmel Center, with a heated indoor pool as a practical leisure option. Compare it when you plan to combine hotel time with viewpoints, restaurants and outings, allowing for transport to the beach and lower city.", bestFor: "Families who prefer a Carmel base and want to check an indoor swimming option for their travel dates.", watch: "Confirm child access to the pool and health club, maximum room occupancy and any extra bed. Do not assume a children's activity club. If a dining promotion affects your choice, check its specific age, adult-meal and rate conditions." },
      { hotelId: "haifa-dan-carmel", summary: "Dan Carmel is the upscale comparison for families who want hotel gardens and pools alongside a hilltop city base. The operator lists a separate children's pool, and selected room categories accommodate two adults and two children. That does not mean every room or executive category fits the same party.", bestFor: "Families who value a substantial hotel setting, outdoor pool time and the Carmel location.", watch: "Confirm the exact room's occupancy and beds, pool opening and any essential connection. Certain executive rooms and lounge access have age restrictions separate from family admission. Include meals, paid parking and beach journeys in the total." },
    ],
    detailTitle: "Swimming dates, family-room layouts & the real trip total",
    details: [
      { title: "Check the facilities for the dates, not just the photograph", text: "Ask about current pool opening, children's access, adult supervision and any maintenance. Leonardo Plaza's published children's club schedule covers weekends, holidays and July–August; verify the actual dates and age groups. Crowne Plaza's indoor pool does not imply a children's club, while Dan Carmel's outdoor and children's pools need a seasonal check." },
      { title: "Book the right room category for every child", text: "Enter all adults and every child's age on the booking site. Compare a single family room, a suite and connecting rooms as different layouts. Dan Carmel's published room categories have different occupancy limits, and lounge or executive-floor restrictions are separate. Get an essential internal connection or cot confirmed in writing." },
      { title: "Include Haifa's hills in the plan", text: "A Carmel hotel can suit viewpoints and outings while requiring transport for beach time. A beachfront hotel creates the opposite tradeoff for visits to the German Colony or higher city. Check the route with a stroller, hotel parking and child seats for a booked driver rather than assuming map proximity means an easy walk." },
      { title: "Compare meals and outings in the family total", text: "Read the actual meal basis and any children's dining promotion. A breakfast rate, a conditional dining offer and a broader package are different products. Add parking, transport, lunches and other meals to compare the same dates and cancellation conditions fairly." },
    ],
    checklist: ["Enter all adults and each child's age; confirm the actual beds and capacity", "Ask about pool access, supervision, opening and maintenance for your dates", "Confirm club dates and age groups rather than assuming daily programming", "Check cots, a separate bedroom or any essential connecting doorway", "Include meals, parking, child seats and daily transport in the total", "Confirm arrival arrangements, cancellation terms and access needs"],
    faqs: [
      { q: "Which hotel in this family shortlist is on the beach?", a: "Leonardo Plaza is the beachfront comparison, with access from the pool area to the shore. Crowne Plaza and Dan Carmel are Carmel bases; a sea view there does not establish immediate beach access." },
      { q: "Which Haifa hotel should I compare for an indoor pool?", a: "Crowne Plaza advertises a heated indoor pool. Leonardo Plaza describes its main pool as covered and heated during colder seasons. Confirm current operation and children's access directly for your dates." },
      { q: "Is Leonardo Plaza's children's club open every day?", a: "Do not assume so. The operator lists Fridays, Saturdays, holidays and July–August. Reconfirm the timetable, age groups and supervision arrangements for the stay you intend to book." },
      { q: "Can every Dan Carmel room fit two adults and two children?", a: "No. Published occupancy varies by room category, with some rooms accommodating that party and other categories having different limits. Enter the actual guests and ages, and confirm the room's sleeping arrangement before paying." },
      { q: "Are Botanica and Schumacher included as young-family options?", a: "No. Their guest-age policies make them different choices from these family hotels. Check the boutique guide for those policies; this shortlist focuses on Leonardo Plaza, Crowne Plaza and Dan Carmel." },
    ],
    sourceIds: ["haifa-dan-carmel-rooms"],
  },
];

export const hotelCategoryGuides: HotelCategoryGuide[] = [
  ...haifaCategoryGuides,
  ...tiberiasCategoryGuides,
  {
    id: "spa", destinationId: "deadsea", path: "/dead-sea/spa-hotels/", shortTitle: "Spa hotels",
    overviewTitle: "Choose the spa experience you want", detailNavLabel: "Spa access", checklistTitle: "Spa entry & guest ages",
    title: "Best Dead Sea spa hotels in Israel: compare facilities & stays",
    metaDescription: "Compare five Dead Sea spa hotels in Israel by wellness facilities, age policies and beach access. Understand spa inclusions and treatment extras before booking.",
    summary: "Find the spa break that fits your trip, from a full-service resort to an age-restricted wellness stay. Compare five hotels on Israel's Dead Sea shore by facilities, beach access and what your room rate actually includes.",
    photo: deadSeaPhotos.sunbeds,
    overview: [
      "Start by separating the hotel stay from the spa experience. A property may advertise mineral-water pools and treatment rooms while charging separately for massages, sulfur pools or particular access packages. A cheaper room is not necessarily better value once you add the facilities you intend to use.",
      "The shortlist below compares different settings rather than awarding one universal winner. Nevo combines a broad resort format with the Esprit Spa; Oasis Spa Club focuses on an age-restricted wellness stay. Herods adds a southern beachfront setting, Milos offers a low-rise design format, and Noga is an alternative with two Dead Sea water pools.",
      "A spa hotel can still welcome families. Check whole-hotel guest ages separately from access to mineral pools, saunas, gyms and treatments. The same distinction matters for beach access: a saltwater pool inside the hotel is different from an operating beach on the shore.",
    ],
    decisions: [
      { title: "Choose the atmosphere", text: "Decide whether you want an age-restricted stay, a couples' break in a family hotel or a full-service resort where your party can split between activities." },
      { title: "Compare the actual facilities", text: "List the pools, sauna or hammam you will use, then confirm current operation. A general spa label does not describe every hotel's facilities." },
      { title: "Add the extra costs", text: "Compare room, meals, spa entry and any treatments as one budget. Check whether an advertised spa package is a day visit or an overnight room offer." },
      { title: "Plan the beach route", text: "Decide how often you want to move between your room, the spa and the beach. Compare direct access with a walk or shuttle." },
    ],
    comparison: [{ key: "spa", label: "Wellness facilities" }, { key: "agePolicy", label: "Age policy" }, { key: "beach", label: "Beach arrangement" }],
    picks: [
      { hotelId: "ds-nevo", summary: "Choose Nevo when the spa is one part of a broader resort holiday. Its Esprit Spa and mineral-water facilities sit alongside the services of a substantial hotel in Ein Bokek, so companions with different priorities have more to compare than a treatment menu alone.", bestFor: "A first spa-and-resort stay, or couples and groups who want facilities beyond the spa.", watch: "Ask for the spa inclusions attached to your exact room offer. Confirm any charges for treatments or particular pools and the minimum age for each facility." },
      { hotelId: "ds-oasis", summary: "Oasis Spa Club is the shortlist's most explicitly age-restricted wellness format, with a Moroccan-inspired spa, indoor mineral-water facilities and a beach reached on foot. The operator currently states hotel and spa entry from 16, with an adult-accompaniment rule and minimum check-in age of 18.", bestFor: "Adults seeking a spa-focused atmosphere rather than a children's activity resort.", watch: "Confirm the current policy directly for any 16–17-year-old. Check which treatments are extra and whether the short beach walk suits your mobility requirements." },
      { hotelId: "ds-herods", summary: "Choose Herods if you want a substantial spa and an adjoining beach in the southern hotel district. It suits spending much of the stay at the resort; that setting is less convenient for frequent walks to Ein Bokek's shops and restaurants.", bestFor: "A resort-focused couples' break combining the Vitalis Spa with beach time.", watch: "Verify the Vitalis facilities and entry included in your rate. Check treatment availability, spa age limits and the exact room outlook before paying." },
      { hotelId: "ds-milos", summary: "Milos offers a design-focused alternative to a large hotel tower. Its low-rise setting in Ein Bokek combines beach access with a spa advertising mineral-water and sulfur pools, a hammam and treatments. Compare the actual room and facilities rather than assuming every offer includes private outdoor space.", bestFor: "Couples who want hotel design and beach access alongside a spa break.", watch: "Check spa admission ages, pool operation and treatment charges. Confirm any private pool or terrace explicitly in the room category you select." },
      { hotelId: "ds-noga", summary: "Noga is worth comparing when you want mineral-water facilities without making luxury-room design the main priority. Its Esprit Spa advertises two Dead Sea pools, and its Ein Bokek position places the beach a short walk away rather than making it a direct beachfront stay.", bestFor: "Travelers comparing a practical Ein Bokek base and the facilities they will actually use.", watch: "Spa entry is listed for guests aged 16+, and treatments are charged separately. Compare the final room-and-meals total with other hotels for the same dates." },
    ],
    detailTitle: "Spa access, treatments & age restrictions",
    details: [
      { title: "Included entry is different from included treatments", text: "Ask the hotel to list which pools and shared spa facilities your rate covers. Treatments, private sessions and certain facilities can cost extra even when basic entry is included. Reserve essential treatment times directly before relying on them as the reason for your stay." },
      { title: "Check the policy for each guest", text: "A whole-hotel age restriction and a spa minimum age are different. Noga's 16+ spa rule does not make the hotel adults-only. Oasis currently publishes 16+ admission with additional check-in and accompaniment conditions. Reconfirm the exact policy for your party." },
      { title: "Compare the location beyond the spa", text: "For outside dining and promenade walks, compare the exact Ein Bokek address. For a more self-contained southern stay, plan meals and transport around the resort. An Ein Gedi spa stay is another format, covered in the main destination guide rather than treated as a beachfront hotel." },
    ],
    checklist: ["Get the spa inclusions for your exact room rate", "Confirm minimum ages for the hotel, mineral pools, gym and treatments", "Book any essential treatments and check cancellation terms", "Ask about maintenance or seasonal closures before arrival", "Check the beach route and any step-free access needs", "Compare room, meals, spa extras, taxes and parking as one total"],
    faqs: [
      { q: "Are all Dead Sea spa hotels adults-only?", a: "No. Several are family hotels with age-restricted spa facilities. If a child-free or age-restricted atmosphere matters, check the whole-hotel policy rather than relying on the spa description." },
      { q: "Is Oasis Spa Club strictly 18+?", a: "The operator's current English information states hotel and spa entry from 16, minimum check-in age 18 and adult accompaniment for eligible younger guests. Older guides can differ. Confirm directly before booking, especially for a 16–17-year-old." },
      { q: "Are massages included with a spa hotel room?", a: "Only rely on a treatment being included when the exact room or package description says so. Basic spa entry, specific pools and treatments can be sold separately." },
      { q: "Does a Dead Sea water pool replace beach access?", a: "They are different facilities. If visiting the shore is central to your trip, confirm the hotel's route to an operating beach, the hours and any shuttle arrangements." },
      { q: "Can I book a spa day instead of staying overnight?", a: "Some operators offer day packages, but those are different products from the overnight hotel links here. Ask the spa directly for current day-visit availability, inclusions and reservation conditions." },
    ],
    sourceIds: ["ds-nevo-spa", "ds-noga-spa", "ds-herods-spa"],
  },
  {
    id: "family", destinationId: "deadsea", path: "/dead-sea/family-hotels/", shortTitle: "Family hotels",
    overviewTitle: "Choose for your children's ages and your travel plans", detailNavLabel: "Meals & rooms", checklistTitle: "The room & children's facilities",
    title: "Best Dead Sea family hotels in Israel: pools, rooms & meal plans",
    metaDescription: "Compare four Dead Sea family hotels in Israel by children's facilities, beach access and meals. Explore all-inclusive options and the room checks to make before booking.",
    summary: "Choose a Dead Sea hotel for the children who are actually traveling with you. Compare four Israeli resorts by pools and activities, room arrangements, beach access and the cost of the meal plan.",
    photo: deadSeaPhotos.pool,
    overview: [
      "The right family hotel depends on the ages of your children and how you plan to spend the day. A toddler pool, water slides, an older child's activities and space for everyone to sleep are different needs. A 'family-friendly' label is only the start of the comparison.",
      "Leonardo Club is the most activity-focused option in this shortlist, with a water park and an all-inclusive format. VERT suits a central Ein Bokek resort stay with beach access and a choice of meal plans. Noga offers another Ein Bokek base, while Leonardo Plaza is useful to compare for family-room arrangements in the southern district.",
      "Start with the exact room occupancy, then compare the facilities and total cost. Hotel photos do not confirm the number of beds, a connecting doorway or which activities operate on your dates. Spa facilities can have older-guest age limits even when the hotel welcomes young children.",
    ],
    decisions: [
      { title: "Match the children's ages", text: "Ask which activities are suitable for toddlers, school-age children and teens. Check slide height rules, club ages, opening times and whether adult attendance is required." },
      { title: "Confirm where everyone sleeps", text: "Enter every child's age and compare a family room, suite or two rooms. A connecting-room request needs written confirmation if the connection is essential." },
      { title: "Choose the meal plan", text: "Compare all-inclusive with breakfast or half board using the full family total. Check which meals and drinks are included and where you will eat outside the hotel." },
      { title: "Check the daily routes", text: "Consider the walk between the room, pool, dining area and beach with a stroller or tired children. A shuttle can affect your plans differently from an adjoining beach." },
    ],
    comparison: [{ key: "children", label: "Family facilities" }, { key: "meals", label: "Meals" }, { key: "beach", label: "Beach arrangement" }],
    picks: [
      { hotelId: "ds-leonardo-club", summary: "Choose Leonardo Club when the hotel activities and meals are the core of the family holiday. Its operator advertises an all-inclusive format, a water park, children's pools and clubs, with adjacent beach access. Compare the room category and the package details together rather than judging only the nightly headline rate.", bestFor: "Families seeking water slides, on-site activities and a package built around meals and drinks.", watch: "Confirm slide height or age rules, water-park operation, club ages and supervision arrangements. Ask which snacks, drinks and services are included on your exact dates." },
      { hotelId: "ds-vert", summary: "VERT is a useful alternative when you want a central Ein Bokek base and beach access without making an all-inclusive package the deciding factor. The hotel's pools and children's facilities sit alongside the promenade setting, giving families another way to combine hotel time with short outings.", bestFor: "Families prioritizing the Ein Bokek location, beach access and flexibility over meal plans.", watch: "Confirm the sleeping arrangement for all children, any connecting rooms and club hours. Check the selected meal plan and allow for extra food and drinks in the family budget." },
      { hotelId: "ds-noga", summary: "Compare Noga for a family stay that combines the Ein Bokek location with a more straightforward hotel format. The beach is reached on foot, so check the route with a stroller. Its mineral-water spa is a separate consideration for adults and eligible older teenagers rather than a young-child activity.", bestFor: "Families comparing an Ein Bokek base and overall cost without needing a water-park resort.", watch: "Check the room's maximum occupancy, children's pool and activity schedule, and beach route. Spa entry is 16+, so do not count those facilities among options for younger children." },
      { hotelId: "ds-leonardo-plaza", summary: "Leonardo Plaza is worth comparing when your family needs a particular room layout or wants a southern resort base. The operator lists family and connecting-room options. Beach access uses a pathway or shuttle, which is a different daily routine from stepping out onto an adjoining beach.", bestFor: "Families and groups who value room configuration and are comfortable with a more self-contained location.", watch: "Get the essential room connection confirmed in writing. Check the beach shuttle schedule, activity programming and meals, and include local journeys in the total cost." },
    ],
    detailTitle: "All-inclusive, half board & the real family total",
    details: [
      { title: "What all-inclusive means here", text: "Leonardo Club Dead Sea is marketed by its operator as all-inclusive, with meals, drinks and activities forming part of the resort format. Check the exact offer for meal times, drink selections, snacks, activities and exclusions. A spa treatment or every special service should not be assumed included." },
      { title: "When another meal plan may work better", text: "If your family plans excursions or wants outside dining, compare breakfast or half board with the all-inclusive total. Central Ein Bokek and a self-contained southern resort provide different outside options. Count lunch, drinks, snacks and local transport in the comparison." },
      { title: "Use the right party details", text: "Enter the ages of all children and the true number of adults on the booking site. Compare the same dates and cancellation conditions. A cot, extra bed, separate bedroom or connecting room is available only if the hotel confirms it for the room you choose." },
      { title: "Plan around freshwater pools and activities", text: "Check the actual children's pools and activity timetable rather than treating a Dead Sea beachfront as a substitute for a family swimming program. Ask about shaded areas, the walk between facilities and any age or height restrictions before choosing the hotel." },
    ],
    checklist: ["Enter every adult and each child's age on the booking site", "Confirm beds, maximum occupancy, cots and any essential connecting doorway", "Check pool and water-park operation for the travel dates", "Ask about club age groups, staffing and adult-attendance rules", "Compare meals, snacks, drinks, parking and transport in the final family total", "Arrange child seats and check the hotel's arrival and cancellation terms"],
    faqs: [
      { q: "Which hotel in this shortlist offers all-inclusive?", a: "Leonardo Club Dead Sea is marketed as all-inclusive. The other shortlisted hotels offer different room and meal-plan choices. Check each exact offer rather than assuming every family resort is all-inclusive." },
      { q: "Is a water park guaranteed to be open on our dates?", a: "No. Confirm current operation directly with the hotel, along with slide height or age restrictions and weather or maintenance limitations. Do the same for children's pools and activity clubs." },
      { q: "Can children use all the spa pools?", a: "Do not assume so. Spa and mineral-pool age limits are separate from a hotel's family policy. Noga's spa, for example, is listed for guests aged 16 and over. Ask about the freshwater pools and activities appropriate for your children." },
      { q: "Is a family room the same as two connecting rooms?", a: "No. A family room may put everyone in one space, while connecting rooms require two rooms with an internal doorway. Check the actual layout and get a connection confirmed in writing if you need it." },
      { q: "Should families choose Ein Bokek or the southern resorts?", a: "Ein Bokek gives easier access to the promenade and outside shops and dining. Southern resorts can work well when you plan to use the hotel's own facilities and meals. Compare the actual beach route, room and children's program before deciding." },
    ],
    sourceIds: ["ds-noga-spa"],
  },
];
