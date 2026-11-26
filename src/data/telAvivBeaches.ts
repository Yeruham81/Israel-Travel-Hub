// Editorial beach descriptions and approximate overview-map markers. Coordinates cross-checked against named OpenStreetMap beach features (Mapcarta), November 2026.
// Official classifications and lifeguard arrangements: Tel Aviv–Yafo Municipality.
export type TelAvivBeach = {
  id: string;
  name: string;
  area: "Northern coast" | "Central seafront" | "Southern coast and Jaffa";
  bestFor: string;
  summary: string;
  tip: string;
  access: string;
  accessShort: string;
  highlights: string;
  /** Local photographs; use distinct images for the quick pick and detailed card. */
  pickPhoto?: { src: string; alt: string; width: number; height: number };
  detailPhoto?: { src: string; alt: string; width: number; height: number };
  lat: number;
  lon: number;
  official?: string;
  featured?: boolean;
};
export const officialTelAvivBeaches = "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Beaches.aspx";
export const officialBeachFacilities = "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/beachlist.aspx";
export const officialBeachPrices = "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Instructions.aspx";

export const telAvivBeaches: TelAvivBeach[] = [
  {
    id: "tzuk-north", name: "North Tzuk Beach", area: "Northern coast",
    detailPhoto: { src: "/images/tel-aviv-beaches/tzuk-north.webp", alt: "Sandy North Tzuk Beach with coastal cliffs and the Herzliya skyline", width: 706, height: 530 },
    bestFor: "Spacious northern beach", summary: "At Tel Aviv's northern edge near Herzliya, North Tzuk offers lawns, shade shelters and a different pace from the hotel-lined promenade. The municipality lists free parking near the entrance.",
    tip: "The municipality says that the approach is only partly accessible because of a slope. Check the exact accessible route before travelling.",
    access: "Far north; bus, taxi or car is usually more convenient from central hotels.",
    accessShort: "Northern edge", highlights: "Lawns · Shade · Free parking", lat: 32.14376, lon: 34.79094,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hatzuk.aspx"
  },
  {
    id: "tzuk-south", name: "South Tzuk Beach", area: "Northern coast",
    detailPhoto: { src: "/images/tel-aviv-beaches/south-tzuk-neutral.webp", alt: "Mediterranean waves washing onto a sandy beach", width: 480, height: 300 },
    bestFor: "Room away from the centre", summary: "An open northern beach with large lawns, a restaurant, a playground, sports facilities and accessible paths.",
    tip: "Free parking is available near the entrance; accessible beach showers and water-access chairs are listed by the municipality.",
    access: "Northern Tel Aviv; plan a return ride and check the precise entrance.",
    accessShort: "Far north", highlights: "Free parking · Playground · Accessible facilities", lat: 32.14019, lon: 34.78973,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/SouthHatzuk.aspx"
  },
  {
    id: "tel-baruch", name: "Tel Baruch Beach", area: "Northern coast",
    pickPhoto: { src: "/images/tel-aviv-beaches/tel-baruch-pick.webp", alt: "Sandy shoreline and waves at Tel Baruch Beach", width: 680, height: 383 },
    detailPhoto: { src: "/images/tel-aviv-beaches/tel-baruch.webp", alt: "Tel Baruch Beach with its open sandy shoreline and coastal cliffs", width: 694, height: 521 },
    bestFor: "A relaxed beach day", summary: "North of Tel Aviv Port, this broad beach has a more local feel, with lawns, a promenade towards the port and designated water-sport and dog areas.",
    tip: "The designated off-leash area is south of the kite-surfing section.",
    access: "North of the port; use a suitable bus, taxi or car.",
    accessShort: "North of the port", highlights: "Lawns · Kite-surfing · Paid parking", lat: 32.12203, lon: 34.78247,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/TelBaruch.aspx",
    featured: true
  },
  {
    id: "metzitzim", name: "Metzitzim Beach", area: "Northern coast",
    pickPhoto: { src: "/images/tel-aviv-beaches/metzitzim-pick.webp", alt: "Metzitzim Beach seen from above, with a sheltered bathing area and sailing boats offshore", width: 800, height: 449 },
    detailPhoto: { src: "/images/tel-aviv-beaches/metzitzim.webp", alt: "Sunbeds and umbrellas at Metzitzim Beach near Tel Aviv Port", width: 748, height: 486 },
    bestFor: "Families near the port", summary: "Beside Tel Aviv Port, Metzitzim is popular with families for its playground, baby shower, beach library and nearby cafés.",
    tip: "Choose the marked swimming area and keep children under close supervision, regardless of how calm the water appears.",
    access: "Beside Tel Aviv Port; a pleasant addition to a port visit.",
    accessShort: "By Tel Aviv Port", highlights: "Playground · Hot showers · Floodlit volleyball", lat: 32.09418, lon: 34.77084,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Metzizim.aspx",
    featured: true
  },
  {
    id: "nordau", name: "Nordau Religious Beach", area: "Northern coast",
    detailPhoto: { src: "/images/tel-aviv-beaches/nordau.webp", alt: "Aerial view of Nordau Religious Beach, its shade shelters and bathing area", width: 960, height: 540 },
    bestFor: "Gender-separated bathing", summary: "The city's designated religious bathing beach. During the official bathing season, women: Sunday · Tuesday · Thursday; men: Monday · Wednesday · Friday.",
    tip: "Facilities include a playground, kiosk, lockers and accessible shade shelters.",
    access: "Northern promenade, near the Nordau street area.",
    accessShort: "Near Nordau Street", highlights: "Separate bathing · Lockers · Shade", lat: 32.09301, lon: 34.77033,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Nordau.aspx"
  },
  {
    id: "hilton", name: "Hilton Beach", area: "Northern coast",
    pickPhoto: { src: "/images/tel-aviv-beaches/hilton-pick.webp", alt: "Colourful shade shelters and sunbeds on Hilton Beach", width: 680, height: 466 },
    detailPhoto: { src: "/images/tel-aviv-beaches/hilton.webp", alt: "Rainbow flags along the promenade at Hilton Beach", width: 719, height: 572 },
    bestFor: "LGBTQ+ social scene and water sports", summary: "The area below the Hilton Hotel is especially well known for its LGBTQ+ scene, as well as surfing and other water-based activities. Use the marked swimming and surfing areas; the dog beach lies farther north.",
    tip: "The dog-friendly off-leash area is north of the declared swimming beach, with its own signs.",
    access: "Near Independence Park, north of the marina.",
    accessShort: "Near Independence Park", highlights: "Water sports nearby · Dog area", lat: 32.08762, lon: 34.76923,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hilton.aspx",
    featured: true
  },
  {
    id: "gordon", name: "Gordon Beach", area: "Central seafront",
    detailPhoto: { src: "/images/tel-aviv-beaches/gordon.webp", alt: "Gordon Beach and the beachfront hotels seen from the breakwater", width: 738, height: 493 },
    pickPhoto: { src: "/images/top-ten-israel/beaches.webp", alt: "Gordon Beach and the palm-lined Tel Aviv promenade", width: 738, height: 483 },
    bestFor: "The classic Tel Aviv beach", summary: "A lively stretch at the foot of Gordon Street, with volleyball, sports facilities, cafés and the adjacent Gordon Pool. It's a natural first stop if you want to experience Tel Aviv beach culture.",
    tip: "Visit early on a hot weekend for more room on the sand, and enjoy the promenade after your swim.",
    access: "End of Gordon Street, near the marina and Gordon Pool.",
    accessShort: "Gordon Street", highlights: "Volleyball · Restaurants", lat: 32.08315, lon: 34.76747,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Gordon.aspx",
    featured: true
  },
  {
    id: "frishman", name: "Frishman Beach", area: "Central seafront",
    pickPhoto: { src: "/images/tel-aviv-beaches/frishman-pick.webp", alt: "Frishman Beach and the central Tel Aviv promenade", width: 680, height: 454 },
    detailPhoto: { src: "/images/tel-aviv-beaches/frishman.webp", alt: "Sandy Frishman Beach with volleyball nets and shade shelters", width: 717, height: 480 },
    bestFor: "Central hotels and easy access", summary: "One of the simplest beaches to reach if you stay near the central promenade. Frishman works well for a few hours by the sea followed by lunch or sightseeing inland.",
    tip: "If you're meeting someone, use the Frishman Street beach entrance as your meeting point.",
    access: "End of Frishman Street; convenient for many beachfront hotels.",
    accessShort: "Frishman Street", highlights: "Volleyball · Children's facilities", lat: 32.08055, lon: 34.76665,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Frishman.aspx",
    featured: true
  },
  {
    id: "bograshov", name: "Bograshov Beach", area: "Central seafront",
    detailPhoto: { src: "/images/tel-aviv-beaches/bograshov.webp", alt: "Bograshov Beach, beachfront hotels, promenade and playground", width: 960, height: 638 },
    bestFor: "A central beach stop", summary: "A popular central beach at the end of Bograshov Street. It's handy for visitors staying inland near Bograshov and Ben Yehuda as well as those exploring the seafront on foot.",
    tip: "London Square and the beachfront hotels are nearby.",
    access: "End of Bograshov Street on the seafront.",
    accessShort: "Bograshov Street", highlights: "Playground · Volleyball", lat: 32.07782, lon: 34.76574,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Bugrashov.aspx"
  },
  {
    id: "jerusalem", name: "Jerusalem Beach", area: "Central seafront",
    detailPhoto: { src: "/images/tel-aviv-beaches/jerusalem.webp", alt: "Jerusalem Beach with a lifeguard tower and shaded seating", width: 715, height: 477 },
    bestFor: "Seafront and central-city walking", summary: "Just off the end of Allenby Street, Jerusalem Beach is a practical choice for combining the sea with cafés and central Tel Aviv. The beachfront promenade continues toward Jaffa.",
    tip: "Make time for a promenade walk south toward the older parts of the city if the weather is pleasant.",
    access: "End of Allenby Street, near Opera Tower.",
    accessShort: "Allenby Street", highlights: "Playground · Volleyball", lat: 32.07471, lon: 34.76467,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Jerusalem.aspx"
  },
  {
    id: "geula", name: "Geula Beach", area: "Central seafront",
    detailPhoto: { src: "/images/tel-aviv-beaches/geula.webp", alt: "Geula Beach with red sunbeds, shade shelters and a lifeguard tower", width: 960, height: 640 },
    bestFor: "Central promenade & markets", summary: "Geula is a central beach near Carmel Market and the Yemenite Quarter, ideal for combining a swim with a market visit.",
    tip: "Walk inland along Geula Street to explore the neighbourhood's cafés and market.",
    access: "Near the end of Geula Street, south of Jerusalem Beach.",
    accessShort: "Geula Street", highlights: "Shade · Volleyball", lat: 32.07208, lon: 34.76372,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Geula.aspx"
  },
  {
    id: "charles-clore", name: "Charles Clore Beach", area: "Southern coast and Jaffa",
    pickPhoto: { src: "/images/tel-aviv-beaches/charles-clore-pick.webp", alt: "Charles Clore shoreline and promenade in the evening light", width: 680, height: 452 },
    detailPhoto: { src: "/images/tel-aviv-beaches/charles-clore.webp", alt: "Sunset along the Charles Clore shoreline with Old Jaffa in the distance", width: 960, height: 638 },
    bestFor: "A beach day with Jaffa views", summary: "Beside Charles Clore Park, the beach offers changing rooms, a café, lawns, a playground and walking and cycling paths. Swim within the marked bathing zone; the southern stretch is designated for water sports.",
    tip: "Combine the park and shoreline with Neve Tzedek or an Old Jaffa walk. The permitted off-leash dog section is south of the declared beach.",
    access: "Along the coast south of central Tel Aviv, near Charles Clore Park.",
    accessShort: "Charles Clore Park", highlights: "Lawns · Playground · Water sports", lat: 32.06032, lon: 34.75869,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Charles.aspx",
    featured: true
  },
  {
    id: "givat-aliya", name: "Givat Aliya Beach", area: "Southern coast and Jaffa",
    detailPhoto: { src: "/images/tel-aviv-beaches/givat-aliya.webp", alt: "Givat Aliya Beach and the stone arches along the Jaffa waterfront", width: 720, height: 405 },
    bestFor: "A local Jaffa atmosphere", summary: "Farther south in Jaffa, Givat Aliya is known for its seaside setting and distinctive stone arches near the shore. Its stone arches and local Jaffa setting make it a distinctive coastal stop.",
    tip: "Allow for a separate journey from central Tel Aviv. Follow local signs for the supervised swimming zone and the designated dog area to the south.",
    access: "Southern Jaffa, well beyond Old Jaffa Port.",
    accessShort: "Southern Jaffa", highlights: "Stone arches · Dog area nearby", lat: 32.03884, lon: 34.74486,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Aliya.aspx"
  }
];

export const beachMapPoints = telAvivBeaches.map(({ id, name, lat, lon }) => ({ id, name, lat, lon }));

export const beachTopPicks = [
  { id: "gordon", label: "Classic Tel Aviv", note: "Volleyball, a lively promenade and the city's beach culture." },
  { id: "metzitzim", label: "With children", note: "Playground, family facilities and easy access to the port." },
  { id: "hilton", label: "LGBTQ+ friendly", note: "A welcoming social beach and nearby sport zones." },
  { id: "frishman", label: "Central & convenient", note: "Easy to pair with a hotel stay or city walk." },
  { id: "tel-baruch", label: "Beyond the centre", note: "A broader northern beach with a local feel." },
  { id: "charles-clore", label: "Near Jaffa", note: "A park, the shoreline and views toward Jaffa." },
] as const;
