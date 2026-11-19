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
    access: "Far north; bus, taxi or car is usually more convenient from central hotels.", lat: 32.146, lon: 34.789,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Hatzuk.aspx"
  },
  {
    id: "tzuk-south", name: "South Tzuk Beach", area: "Northern coast",
    bestFor: "Room away from the centre", summary: "A northern beach stretch with a more open setting than the city centre. It suits visitors who want to make the beach itself the main outing rather than combine it with central sightseeing.",
    tip: "North and South Tzuk are distinct access points; confirm which entrance and lifeguard station you plan to use.",
    access: "Northern Tel Aviv; plan a return ride and check the precise entrance.", lat: 32.135, lon: 34.783
  },
  {
    id: "tel-baruch", name: "Tel Baruch Beach", area: "Northern coast",
    bestFor: "A relaxed beach day", summary: "North of Tel Aviv Port, this broad beach has a more local feel, with facilities and a separate dog area farther along the shore. It is not a quick stroll from the central hotel strip.",
    tip: "The off-leash area is south of the kite-surfing section, not inside the supervised swimming zone.",
    access: "North of the port; use a suitable bus, taxi or car.", lat: 32.120, lon: 34.778,
    featured: true
  },
  {
    id: "metzitzim", name: "Metzitzim Beach", area: "Northern coast",
    bestFor: "Families near the port", summary: "Beside Tel Aviv Port, Metzitzim is popular with families because of its nearby facilities, child-friendly beach amenities and opportunities to stop for food or a promenade walk.",
    tip: "Choose the marked swimming area and keep children under close supervision, regardless of how calm the water appears.",
    access: "Beside Tel Aviv Port; a pleasant addition to a port visit.", lat: 32.098, lon: 34.772,
    featured: true
  },
  {
    id: "nordau", name: "Nordau Religious Beach", area: "Northern coast",
    bestFor: "Gender-separated bathing", summary: "The city's designated separate bathing beach. During the official season, the municipality allocates Sunday, Tuesday and Thursday to women, and Monday, Wednesday and Friday to men.",
    tip: "Check the current season's timetable, official notices and any temporary station changes before setting out; these arrangements do not apply to the neighbouring beaches.",
    access: "Northern promenade, near the Nordau street area.", lat: 32.093, lon: 34.770,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Nordau.aspx"
  },
  {
    id: "hilton", name: "Hilton Beach", area: "Northern coast",
    bestFor: "LGBTQ+ social scene and water sports", summary: "The area below the Hilton Hotel is especially well known for its LGBTQ+ scene, as well as surfing and other water-based activities. Look for the specific stretch suited to your plans.",
    tip: "The dog-friendly off-leash area is north of the declared swimming beach, with its own signs.",
    access: "Near Independence Park, north of the marina.", lat: 32.088, lon: 34.766,
    featured: true
  },
  {
    id: "gordon", name: "Gordon Beach", area: "Central seafront",
    bestFor: "The classic Tel Aviv beach", summary: "A lively stretch at the foot of Gordon Street, with volleyball, the beachfront promenade and places to eat nearby. It's a natural first stop if you want to experience Tel Aviv beach culture.",
    tip: "Visit early on a hot weekend for more room on the sand, and enjoy the promenade after your swim.",
    access: "End of Gordon Street, near the marina and Gordon Pool.", lat: 32.0824, lon: 34.766,
    featured: true
  },
  {
    id: "frishman", name: "Frishman Beach", area: "Central seafront",
    bestFor: "Central hotels and easy access", summary: "One of the simplest beaches to reach if you stay near the central promenade. Frishman works well for a few hours by the sea followed by lunch or sightseeing inland.",
    tip: "If you're meeting someone, use the Frishman Street beach entrance as your meeting point.",
    access: "End of Frishman Street; convenient for many beachfront hotels.", lat: 32.079, lon: 34.765,
    featured: true
  },
  {
    id: "bograshov", name: "Bograshov Beach", area: "Central seafront",
    bestFor: "A central beach stop", summary: "A popular central beach at the end of Bograshov Street. It's handy for visitors staying inland near Bograshov and Ben Yehuda as well as those exploring the seafront on foot.",
    tip: "The neighbouring beaches are close together: choose the entrance nearest your hotel instead of travelling across the city for a similar stretch.",
    access: "End of Bograshov Street on the seafront.", lat: 32.076, lon: 34.764
  },
  {
    id: "jerusalem", name: "Jerusalem Beach", area: "Central seafront",
    bestFor: "Seafront and central-city walking", summary: "Just off the end of Allenby Street, Jerusalem Beach is a practical choice for combining the sea with cafés and central Tel Aviv. The beachfront promenade continues toward Jaffa.",
    tip: "Make time for a promenade walk south toward the older parts of the city if the weather is pleasant.",
    access: "End of Allenby Street, near Opera Tower.", lat: 32.0708, lon: 34.762
  },
  {
    id: "geula", name: "Geula Beach", area: "Central seafront",
    bestFor: "A quieter central alternative", summary: "Geula is another named, declared beach between the central promenade and the southern beachfront. It can be useful if your accommodation is near Geula Street or the Carmel Market area.",
    tip: "Check the active lifeguard station and posted flags at Geula itself rather than relying on conditions at a neighbouring beach.",
    access: "Near the end of Geula Street, south of Jerusalem Beach.", lat: 32.0669, lon: 34.7589
  },
  {
    id: "charles-clore", name: "Charles Clore Beach", area: "Southern coast and Jaffa",
    bestFor: "A beach day with Jaffa views", summary: "Beside Charles Clore Park, this declared bathing beach has supervised areas, changing facilities and chair or sunbed hire. Nearby open stretches sometimes called Alma Beach are not necessarily part of the supervised bathing area.",
    tip: "Combine the park and shoreline with Neve Tzedek or an Old Jaffa walk. The permitted off-leash dog section is south of the declared beach.",
    access: "Along the coast south of central Tel Aviv, near Charles Clore Park.", lat: 32.059, lon: 34.7548,
    official: "https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Charles.aspx",
    featured: true
  },
  {
    id: "givat-aliya", name: "Givat Aliya Beach", area: "Southern coast and Jaffa",
    bestFor: "A local Jaffa atmosphere", summary: "Farther south in Jaffa, Givat Aliya is known for its seaside setting and distinctive stone arches near the shore. It feels quite different from the beach-and-hotel strip in central Tel Aviv.",
    tip: "Allow for a separate journey from central Tel Aviv. Follow local signs for the supervised swimming zone and the designated dog area to the south.",
    access: "Southern Jaffa, well beyond Old Jaffa Port.", lat: 32.035, lon: 34.742
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
