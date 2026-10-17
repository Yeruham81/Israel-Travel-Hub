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
import telAvivBeachfrontPhoto from "@/assets/tel-aviv/beachfront.webp";
import dizengoffPhoto from "@/assets/tel-aviv/dizengoff.webp";
import oldNorthPhoto from "@/assets/tel-aviv/old-north.webp";
import neveTzedekPhoto from "@/assets/tel-aviv/neve-tzedek.webp";
import jaffaPhoto from "@/assets/tel-aviv/jaffa.webp";
import florentinPhoto from "@/assets/tel-aviv/florentin.webp";
import keremPhoto from "@/assets/tel-aviv/kerem-hateimanim.webp";
import rothschildPhoto from "@/assets/tel-aviv/rothschild.webp";

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
