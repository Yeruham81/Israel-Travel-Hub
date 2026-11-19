// Editorial beach descriptions and approximate overview-map markers.
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
  /** Local image fields intentionally left empty for the later beach photo batch. */
  pickPhoto?: { src: string; alt: string };
  detailPhoto?: { src: string; alt: string };
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
    bestFor: "Spacious northern beach", summary: "At Tel Aviv's northern edge near Herzliya, North Tzuk offers lawns, shade shelters and a different pace from the hotel-lined promenade. It takes more planning to reach from central Tel Aviv.",
    tip: "The municipality says that the approach is only partly accessible because of a slope. Check the exact accessible route before travelling.",
    access: "Far north; bus, taxi or car is usually more convenient from central hotels.",
    accessShort: "Northern edge", highlights: "Lawns · Shade shelters", lat: 32.146, lon: 34.789,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hatzuk.aspx"
  },
  {
    id: "tzuk-south", name: "South Tzuk Beach", area: "Northern coast",
    bestFor: "Room away from the centre", summary: "A northern beach stretch with a more open setting than the city centre. It suits visitors who want to make the beach itself the main outing rather than combine it with central sightseeing.",
    tip: "North and South Tzuk are distinct access points; confirm which entrance and lifeguard station you plan to use.",
    access: "Northern Tel Aviv; plan a return ride and check the precise entrance.",
    accessShort: "Far north", highlights: "Northern beach · Paid parking", lat: 32.135, lon: 34.783,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/SouthHatzuk.aspx"
  },
  {
    id: "tel-baruch", name: "Tel Baruch Beach", area: "Northern coast",
    bestFor: "A relaxed beach day", summary: "North of Tel Aviv Port, this broad beach has a more local feel, with facilities and a separate dog area farther along the shore. It is not a quick stroll from the central hotel strip.",
    tip: "The off-leash area is south of the kite-surfing section, not inside the supervised swimming zone.",
    access: "North of the port; use a suitable bus, taxi or car.",
    accessShort: "North of the port", highlights: "Dog area nearby · Parking", lat: 32.120, lon: 34.778,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/TelBaruch.aspx",
    featured: true
  },
  {
    id: "metzitzim", name: "Metzitzim Beach", area: "Northern coast",
    bestFor: "Families near the port", summary: "Beside Tel Aviv Port, Metzitzim is popular with families because of its nearby facilities, child-friendly beach amenities and opportunities to stop for food or a promenade walk.",
    tip: "Choose the marked swimming area and keep children under close supervision, regardless of how calm the water appears.",
    access: "Beside Tel Aviv Port; a pleasant addition to a port visit.",
    accessShort: "By Tel Aviv Port", highlights: "Playground · Baby shower · Volleyball", lat: 32.098, lon: 34.772,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Metzizim.aspx",
    featured: true
  },
  {
    id: "nordau", name: "Nordau Religious Beach", area: "Northern coast",
    bestFor: "Gender-separated bathing", summary: "The city's designated religious bathing beach, with separate days for women and men during the bathing season. The current schedule is shown in the practical information below.",
    tip: "Check the current season's timetable, official notices and any temporary station changes before setting out; these arrangements do not apply to the neighbouring beaches.",
    access: "Northern promenade, near the Nordau street area.",
    accessShort: "Near Nordau Street", highlights: "Separate bathing · Lockers · Shade", lat: 32.093, lon: 34.770,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Nordau.aspx"
  },
  {
    id: "hilton", name: "Hilton Beach", area: "Northern coast",
    bestFor: "LGBTQ+ social scene and water sports", summary: "The area below the Hilton Hotel is especially well known for its LGBTQ+ scene, as well as surfing and other water-based activities. Look for the specific stretch suited to your plans.",
    tip: "The dog-friendly off-leash area is north of the declared swimming beach, with its own signs.",
    access: "Near Independence Park, north of the marina.",
    accessShort: "Near Independence Park", highlights: "Water sports nearby · Dog area", lat: 32.088, lon: 34.766,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hilton.aspx",
    featured: true
  },
  {
    id: "gordon", name: "Gordon Beach", area: "Central seafront",
    bestFor: "The classic Tel Aviv beach", summary: "A lively stretch at the foot of Gordon Street, with volleyball, the beachfront promenade and places to eat nearby. It's a natural first stop if you want to experience Tel Aviv beach culture.",
    tip: "Visit early on a hot weekend for more room on the sand, and enjoy the promenade after your swim.",
    access: "End of Gordon Street, near the marina and Gordon Pool.",
    accessShort: "Gordon Street", highlights: "Volleyball · Restaurants", lat: 32.0824, lon: 34.766,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Gordon.aspx",
    featured: true
  },
  {
    id: "frishman", name: "Frishman Beach", area: "Central seafront",
    bestFor: "Central hotels and easy access", summary: "One of the simplest beaches to reach if you stay near the central promenade. Frishman works well for a few hours by the sea followed by lunch or sightseeing inland.",
    tip: "If you're meeting someone, use the Frishman Street beach entrance as your meeting point.",
    access: "End of Frishman Street; convenient for many beachfront hotels.",
    accessShort: "Frishman Street", highlights: "Volleyball · Children's facilities", lat: 32.079, lon: 34.765,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Frishman.aspx",
    featured: true
  },
  {
    id: "bograshov", name: "Bograshov Beach", area: "Central seafront",
    bestFor: "A central beach stop", summary: "A popular central beach at the end of Bograshov Street. It's handy for visitors staying inland near Bograshov and Ben Yehuda as well as those exploring the seafront on foot.",
    tip: "The neighbouring beaches are close together: choose the entrance nearest your hotel instead of travelling across the city for a similar stretch.",
    access: "End of Bograshov Street on the seafront.",
    accessShort: "Bograshov Street", highlights: "Playground · Volleyball", lat: 32.076, lon: 34.764,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Bugrashov.aspx"
  },
  {
    id: "jerusalem", name: "Jerusalem Beach", area: "Central seafront",
    bestFor: "Seafront and central-city walking", summary: "Just off the end of Allenby Street, Jerusalem Beach is a practical choice for combining the sea with cafés and central Tel Aviv. The beachfront promenade continues toward Jaffa.",
    tip: "Make time for a promenade walk south toward the older parts of the city if the weather is pleasant.",
    access: "End of Allenby Street, near Opera Tower.",
    accessShort: "Allenby Street", highlights: "Playground · Volleyball", lat: 32.0708, lon: 34.762,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Jerusalem.aspx"
  },
  {
    id: "geula", name: "Geula Beach", area: "Central seafront",
    bestFor: "Central promenade & markets", summary: "Geula is another named, declared beach between the central promenade and the southern beachfront. It can be useful if your accommodation is near Geula Street or the Carmel Market area.",
    tip: "Check the active lifeguard station and posted flags at Geula itself rather than relying on conditions at a neighbouring beach.",
    access: "Near the end of Geula Street, south of Jerusalem Beach.",
    accessShort: "Geula Street", highlights: "Shade · Volleyball", lat: 32.0669, lon: 34.7589,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Geula.aspx"
  },
  {
    id: "charles-clore", name: "Charles Clore Beach", area: "Southern coast and Jaffa",
    bestFor: "A beach day with Jaffa views", summary: "Beside Charles Clore Park, this declared bathing beach has supervised areas, changing facilities and chair or sunbed hire. Nearby open stretches sometimes called Alma Beach are not necessarily part of the supervised bathing area.",
    tip: "Combine the park and shoreline with Neve Tzedek or an Old Jaffa walk. The permitted off-leash dog section is south of the declared beach.",
    access: "Along the coast south of central Tel Aviv, near Charles Clore Park.",
    accessShort: "Charles Clore Park", highlights: "Changing rooms · Beach hire", lat: 32.059, lon: 34.7548,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Charles.aspx",
    featured: true
  },
  {
    id: "givat-aliya", name: "Givat Aliya Beach", area: "Southern coast and Jaffa",
    bestFor: "A local Jaffa atmosphere", summary: "Farther south in Jaffa, Givat Aliya is known for its seaside setting and distinctive stone arches near the shore. It feels quite different from the beach-and-hotel strip in central Tel Aviv.",
    tip: "Allow for a separate journey from central Tel Aviv. Follow local signs for the supervised swimming zone and the designated dog area to the south.",
    access: "Southern Jaffa, well beyond Old Jaffa Port.",
    accessShort: "Southern Jaffa", highlights: "Stone arches · Dog area nearby", lat: 32.035, lon: 34.742,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Aliya.aspx"
  }
];

export const beachMapPoints = telAvivBeaches.map(({ id, name, lat, lon }) => ({ id, name, lat, lon }));

export const beachTopPicks = [
  { id: "gordon", label: "Classic Tel Aviv", note: "Volleyball, a lively promenade and the city's beach culture." },
  { id: "metzitzim", label: "With children", note: "Family amenities near the port; supervision still matters." },
  { id: "hilton", label: "LGBTQ+ friendly", note: "A welcoming social beach and nearby sport zones." },
  { id: "frishman", label: "Central & convenient", note: "Easy to pair with a hotel stay or city walk." },
  { id: "tel-baruch", label: "Beyond the centre", note: "A broader northern beach with a local feel." },
  { id: "charles-clore", label: "Near Jaffa", note: "A park, the shoreline and views toward Jaffa." },
] as const;
