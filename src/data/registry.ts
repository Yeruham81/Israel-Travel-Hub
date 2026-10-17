/**
 * Typed content registry. Every record here is shaped like a future database row
 * so it can be swapped for DB-backed queries without changing page components.
 */

export type ISODate = string; // YYYY-MM-DD

export interface SourceReference {
  id: string;
  title: string;
  publisher: string;
  url: string;
  checkedAt: ISODate | null; // null = linked but not fact-checked
  note: string;
}

/** The actual company performing the service (e.g. a driver business). */
export interface Operator {
  id: string;
  name: string;
  kind: "local_operator" | "authorized_taxi_system" | "tour_operator" | "official_site";
  disclosure?: string;
}

export type PartnerCapability =
  | "editorial_only"
  | "affiliate_link"
  | "widget"
  | "content_api"
  | "live_quote_api";

/** A platform that sells/brokers services from many operators. */
export interface BookingPartner {
  id: string;
  name: string;
  capability: PartnerCapability;
  homepage: string;
}

export type PriceBasis = "per_vehicle" | "per_person" | "metered" | "unknown";

export interface IndicativePrice {
  kind: "published_starting_rate";
  currency: "ILS";
  amount: number;
  basis: PriceBasis;
  maxPartySize: number;
  conditions: string;
  sourceId: string;
}

export type OfferCategory = "prebooked" | "on_arrival";

/**
 * How a traveler continues with an offer.
 * - live_quote: a configured API returned a price for the traveler's exact context (none configured yet).
 * - provider_redirect: regular link to the provider's own site; traveler enters details there.
 * - provider_inquiry: traveler requests a quote / contacts the provider on the provider's site.
 * - official_info: official information / reservation page (e.g. national parks, airport authority).
 */
export type BookingMode = "live_quote" | "provider_redirect" | "provider_inquiry" | "official_info";

export interface Offer {
  id: string;
  productId: string;
  routeId: string;
  category: OfferCategory;
  mode: BookingMode;
  operatorId?: string;
  partnerId?: string;
  label: string;
  typeLabel: string;
  summary: string;
  priceLabel: string;
  price?: IndicativePrice;
  maxPassengersKnown: number | null; // null = confirm with provider
  ctaLabel: string;
  url: string;
  isAffiliate: boolean;
  isInformational: boolean;
  confirmOnOffer: string[];
  sourceIds: string[];
}

export interface RouteRecord {
  id: string;
  path: string;
  origin: { code: string; name: string };
  destination: { name: string };
  status: "draft" | "review" | "published";
}

export const INFO_CHECK_DATE: ISODate = "2026-10-16";
export const JERUSALEM_STAY_REVIEW_DATE: ISODate = "2026-10-17";
export const TELAVIV_STAY_REVIEW_DATE: ISODate = "2026-10-17";
export const OWNER_BASE = "https://www.israel-taxi.com";

const jerusalemHotelSources: SourceReference[] = [
  ["herbert-samuel", "Herbert Samuel Jerusalem", "https://herbertsamuel.com/en/herbert-samuel-jerusalem-hotel/"],
  ["arthur", "Arthur Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-jerusalem/arthur-hotel-jerusalem/"],
  ["mamilla", "Mamilla Hotel", "https://www.mamillahotel.com/the-hotel/"],
  ["king-david", "King David Jerusalem — Dan Hotels", "https://www.danhotels.com/jerusalemhotels/kingdavidjerusalemhotel"],
  ["new-imperial", "New Imperial Hotel", "https://www.newimperial.com/"],
  ["sephardic-house", "The Sephardic House", "https://www.thesephardichouse.com/"],
  ["bezalel", "Bezalel Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-jerusalem/bezalel-hotel-jerusalem/"],
  ["market-courtyard", "The Market Courtyard", "https://marketcourtyard.com/about/"],
  ["american-colony", "The American Colony Hotel", "https://www.americancolony.com/"],
  ["jerusalem-hotel", "Jerusalem Hotel", "https://jrshotel.com/about-us/"],
  ["orient", "Orient Jerusalem — Isrotel", "https://www.isrotel.com/isrotel-hotels/jerusalem/orient/"],
  ["rafael-residence", "Rafael Residence", "https://rafael-residence.com/about/"],
].map(([id, name, url]): SourceReference => ({
  id: `hotel-${id}-official`, title: `${name} — property information`, publisher: name!, url: url!,
  checkedAt: JERUSALEM_STAY_REVIEW_DATE,
  note: "Property identity, location and general accommodation style cross-checked with the hotel's own information. Room availability, rates, specific amenities and booking conditions must be reconfirmed for your dates.",
}));

const telAvivHotelSources: SourceReference[] = [
  ["carlton", "Carlton Tel Aviv", "https://www.carlton.co.il/en/"],
  ["embassy", "Embassy Hotel Tel Aviv", "https://www.embassyhoteltelaviv.com/"],
  ["backstage", "Backstage Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/backstage-hotel-tel-aviv/"],
  ["cinema", "Cinema Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/cinema-hotel-tel-aviv/"],
  ["port-tower", "Port Tower — Isrotel", "https://www.isrotel.com/isrotel-hotels/tel-aviv/port-tower/"],
  ["melody", "Melody Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/melody-hotel-tel-aviv/"],
  ["elkonin", "Elkonin Tel Aviv — MGallery", "https://elkonintelaviv.com/about/"],
  ["ruby", "Ruby Tel Aviv", "https://rubytelaviv.com/en/about/"],
  ["the-jaffa", "The Jaffa — Fattal Limited Edition", "https://www.fattal.co.il/hotel/the-jaffa-hotel"],
  ["market-house", "Market House Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/market-house-tel-aviv/"],
  ["albi-florentin", "Albi Florentin", "https://albihotels.com/hotels/albi-florentin-about/"],
  ["florentin-house", "Florentin House — HOMY", "https://homytlv.com/apartment-type/florentin-house/"],
  ["poli-house", "Poli House — AFI Hotels", "https://www.afi-hotels.com/poli-house-hotel-tel-aviv-rooms"],
  ["assemblage", "Assemblage Boutique", "https://assemblageboutiquehotel.com/"],
  ["the-norman", "The Norman Tel Aviv", "https://www.thenorman.com/"],
  ["65-rothschild", "65 Hotel — Atlas Hotels", "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/65-hotel-tel-aviv/"],
].map(([id, name, url]): SourceReference => ({
  id: `hotel-tlv-${id}-official`, title: `${name} — property information`, publisher: name!, url: url!,
  checkedAt: TELAVIV_STAY_REVIEW_DATE,
  note: "Property identity, location and general accommodation style checked against the property's own information. Reconfirm rooms, services, access, minimum stays and booking conditions for your dates.",
}));

export const sources: SourceReference[] = [
  ...jerusalemHotelSources,
  ...telAvivHotelSources,
  {
    id: "iaa-directions",
    title: "Ben Gurion Airport – directions and transport",
    publisher: "Israel Airports Authority",
    url: "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/",
    checkedAt: INFO_CHECK_DATE,
    note: "Licensed taxi locations at Terminals 3 and 1, round-the-clock metered service, train link and free internal shuttle.",
  },
  {
    id: "gett-airport",
    title: "Gett airport taxi information",
    publisher: "Gett",
    url: "https://www.gett.com/il/airport-en/",
    checkedAt: INFO_CHECK_DATE,
    note: "Gett's description of its role in the authorized airport taxi system and current ordering instructions.",
  },
  {
    id: "moshe-airport-transfers",
    title: "Airport transfers – published rates",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/airport-transfers/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Published starting fare ILS 550 Ben Gurion → Jerusalem for up to 4 passengers, weekday rate; surcharges may apply nights/weekends/holidays; 24 hours' notice; final price by quote.",
  },
  {
    id: "intui-airport",
    title: "Tel Aviv Ben Gurion airport transfer",
    publisher: "Intui.travel",
    url: "https://en.intui.travel/tel-aviv-ben-gurion-international-airport-transfer/",
    checkedAt: INFO_CHECK_DATE,
    note: "Transfer search page listing Jerusalem as a destination. No date-specific price or inventory was checked.",
  },
  {
    id: "gettransfer-home",
    title: "GetTransfer – book a transfer",
    publisher: "GetTransfer.com",
    url: "https://gettransfer.com/en",
    checkedAt: INFO_CHECK_DATE,
    note: "Main English site. Travelers enter their own route; no route quote was checked.",
  },
  {
    id: "israel-rail",
    title: "Israel Railways – timetables and fares",
    publisher: "Israel Railways",
    url: "https://www.rail.co.il/",
    checkedAt: null,
    note: "Official source for current train schedules and fares (linked from the IAA page).",
  },
  {
    id: "owner-route-guide",
    title: "Ben Gurion Airport to Jerusalem (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/ben-gurion-airport-to-jerusalem/`,
    checkedAt: null,
    note: "Local editorial context only; not used for regulated fares or availability.",
  },
  {
    id: "owner-stay-jerusalem",
    title: "Where to stay in Jerusalem (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/where-to-stay-in-jerusalem/`,
    checkedAt: JERUSALEM_STAY_REVIEW_DATE,
    note: "Publisher's original six-area Jerusalem guide, used for neighborhood descriptions, practical advice, selected accommodation and existing Expedia affiliate links. Property identity and style also checked against hotel sources; live rates and availability are not displayed.",
  },
  {
    id: "owner-stay-telaviv",
    title: "Where to stay in Tel Aviv (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/where-to-stay-in-tel-aviv/`,
    checkedAt: TELAVIV_STAY_REVIEW_DATE,
    note: "Editorial basis for the eight neighborhood guides and selected stays. Existing publisher-owned Expedia affiliate links and neighborhood photographs are reused from this guide; hotel identity and accommodation style were cross-checked with primary property sources. No live prices or availability are supplied.",
  },
  {
    id: "owner-hotels-tiberias",
    title: "Best hotels in Tiberias (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/best-hotels-in-tiberias/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Background for area guidance. No property, price or availability claims are taken from it.",
  },
  {
    id: "owner-bethlehem-guide",
    title: "Jerusalem to Bethlehem (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/jerusalem-to-bethlehem/`,
    checkedAt: null,
    note: "Supporting background guide on the existing site.",
  },
  {
    id: "beinharim-jlm-bethlehem",
    title: "Jerusalem and Bethlehem tour",
    publisher: "Bein Harim Tours",
    url: "https://www.beinharimtours.com/jerusalem-and-bethlehem-tour/",
    checkedAt: INFO_CHECK_DATE,
    note: "Operator tour page. Itinerary combines Jerusalem and Bethlehem; pickup listed from several cities including Jerusalem. Price, dates and availability not checked.",
  },
  {
    id: "owner-ashdod-shore",
    title: "Ashdod shore excursions",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/ashdod-shore-excursions/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Publisher's car-and-driver page. Lists suggested Tel Aviv/Jaffa, classical Jerusalem and Masada/Dead Sea itineraries. Prices and guarantee wording on the page are not reproduced here.",
  },
  {
    id: "owner-haifa-shore",
    title: "Haifa shore excursions",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/haifa-shore-excursions/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Publisher's car-and-driver page. Lists suggested Akko/Rosh Hanikra, Tel Aviv/Jaffa, Nazareth/Sea of Galilee and classical Jerusalem itineraries. Its published price figures are not reproduced here; a current offer must be requested from the operator.",
  },
  {
    id: "beinharim-ashdod-jlm-bethlehem",
    title: "Jerusalem and Bethlehem day tour from Ashdod Port",
    publisher: "Bein Harim Tours",
    url: "https://www.beinharimtours.com/jerusalem-and-bethlehem-day-tour-from-ashdod-port/",
    checkedAt: INFO_CHECK_DATE,
    note: "Operator product page for a combined Jerusalem and Bethlehem itinerary departing from Ashdod Port. Price, dates, inclusions and availability not checked.",
  },
  {
    id: "beinharim-haifa-jlm-bethlehem",
    title: "Ship-to-shore excursion: Haifa to Jerusalem and Bethlehem",
    publisher: "Bein Harim Tours",
    url: "https://www.beinharimtours.com/ship-to-shore-excursions-haifa-jerusalem-bethlehem/",
    checkedAt: INFO_CHECK_DATE,
    note: "Operator product page for a combined Jerusalem and Bethlehem itinerary departing from Haifa Port. Price, dates, inclusions and availability not checked.",
  },
  {
    id: "owner-private-day-trips",
    title: "Private day trips",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/private-day-trips/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Publisher's local operator page for private day trips. Itinerary and price by inquiry.",
  },
  {
    id: "owner-private-driver",
    title: "Private driver in Israel",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/private-driver-in-israel/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Publisher's local operator page for private driver hire.",
  },
  {
    id: "inpa-masada",
    title: "Masada National Park – reserve a visit",
    publisher: "Israel Nature and Parks Authority",
    url: "https://en.parks.org.il/reserve-park/masada-national-park/",
    checkedAt: INFO_CHECK_DATE,
    note: "Official visit reservations; describes cable car and hiking ascent options, museum reservation and separately listed west-side night-show options. Extreme weather can change access. Hours and prices not copied.",
  },
  {
    id: "inpa-caesarea",
    title: "Caesarea National Park – reserve a visit",
    publisher: "Israel Nature and Parks Authority",
    url: "https://en.parks.org.il/reserve-park/caesarea-national-park/",
    checkedAt: INFO_CHECK_DATE,
    note: "Official coastal archaeological park page with visitor information and visit reservation. Hours, admission and exhibit status not copied.",
  },
  {
    id: "discovercars-israel",
    title: "Car rental in Israel",
    publisher: "DiscoverCars",
    url: "https://www.discovercars.com/israel",
    checkedAt: INFO_CHECK_DATE,
    note: "Rental search with pickup, return and date controls on the provider's site. No prices, vehicles or terms were checked.",
  },
];

export const operators: Operator[] = [
  {
    id: "moshe-barak",
    name: "Moshe Barak",
    kind: "local_operator",
    disclosure: "Operated by the publisher's local transport business.",
  },
  { id: "bein-harim", name: "Bein Harim Tours", kind: "tour_operator" },
  { id: "inpa", name: "Israel Nature and Parks Authority", kind: "official_site" },
];

export const partners: BookingPartner[] = [
  { id: "intui", name: "Intui.travel", capability: "editorial_only", homepage: "https://en.intui.travel/" },
  { id: "gettransfer", name: "GetTransfer.com", capability: "editorial_only", homepage: "https://gettransfer.com/en" },
  { id: "gett", name: "Gett", capability: "editorial_only", homepage: "https://www.gett.com/il/airport-en/" },
  { id: "booking", name: "Booking.com", capability: "editorial_only", homepage: "https://www.booking.com/" },
  { id: "expedia", name: "Expedia", capability: "affiliate_link", homepage: "https://www.expedia.com/" },
  { id: "discovercars", name: "DiscoverCars", capability: "editorial_only", homepage: "https://www.discovercars.com/" },
];

/** Existing publisher-owned tracking links copied exactly from the supplied Jerusalem and Tel Aviv guides. */
export const affiliateConfig: Record<string, { trackingUrl: string } | undefined> = {
  "hotels-jerusalem-expedia": { trackingUrl: "https://expedia.tpm.li/yNeL4j4v" },
  "area-downtown-expedia": { trackingUrl: "https://expedia.tpm.li/2i5lfUjl" },
  "area-mamilla-expedia": { trackingUrl: "https://expedia.tpm.li/UWWQ1gK3" },
  "area-old-city-expedia": { trackingUrl: "https://expedia.tpm.li/mQved68D" },
  "area-mahane-yehuda-expedia": { trackingUrl: "https://expedia.tpm.li/7P1ejkhT" },
  "area-east-jerusalem-expedia": { trackingUrl: "https://expedia.tpm.li/7eDNY552" },
  "area-german-colony-expedia": { trackingUrl: "https://expedia.tpm.li/3mkMeHGv" },
  "hotel-herbert-samuel-expedia": { trackingUrl: "https://expedia.tpm.li/BYoR4PfJ" },
  "hotel-arthur-expedia": { trackingUrl: "https://expedia.tpm.li/j0N17qRs" },
  "hotel-mamilla-expedia": { trackingUrl: "https://expedia.tpm.li/3aaGDgYM" },
  "hotel-king-david-expedia": { trackingUrl: "https://expedia.tpm.li/Gzpd0s0j" },
  "hotel-new-imperial-expedia": { trackingUrl: "https://expedia.tpm.li/ks5sDJQZ" },
  "hotel-sephardic-house-expedia": { trackingUrl: "https://expedia.tpm.li/JQXzomLv" },
  "hotel-bezalel-expedia": { trackingUrl: "https://expedia.tpm.li/0SvFTesH" },
  "hotel-market-courtyard-expedia": { trackingUrl: "https://expedia.tpm.li/dD75XniW" },
  "hotel-american-colony-expedia": { trackingUrl: "https://expedia.tpm.li/I6gSEyzR" },
  "hotel-jerusalem-hotel-expedia": { trackingUrl: "https://expedia.tpm.li/6um6SpEN" },
  "hotel-orient-expedia": { trackingUrl: "https://expedia.tpm.li/LvbJzhBJ" },
  "hotel-rafael-residence-expedia": { trackingUrl: "https://expedia.tpm.li/yNS1BZnA" },
  "hotels-telaviv-expedia": { trackingUrl: "https://expedia.tpm.li/Dr38bDcc" },
  "area-telaviv-beachfront-expedia": { trackingUrl: "https://expedia.tpm.li/edZDHR1c" },
  "area-telaviv-dizengoff-expedia": { trackingUrl: "https://expedia.tpm.li/JwiNWfsY" },
  "area-telaviv-old-north-expedia": { trackingUrl: "https://expedia.tpm.li/emxupcKf" },
  "area-telaviv-neve-tzedek-expedia": { trackingUrl: "https://expedia.tpm.li/JfyoXEqJ" },
  "area-telaviv-jaffa-expedia": { trackingUrl: "https://expedia.tpm.li/5W9o2imV" },
  "area-telaviv-florentin-expedia": { trackingUrl: "https://expedia.tpm.li/1ALbXsq0" },
  "area-telaviv-kerem-expedia": { trackingUrl: "https://expedia.tpm.li/18erQFfV" },
  "area-telaviv-rothschild-expedia": { trackingUrl: "https://expedia.tpm.li/8BO8YTGc" },
  "hotel-tlv-carlton-expedia": { trackingUrl: "https://expedia.tpm.li/daLbFCRQ" },
  "hotel-tlv-embassy-expedia": { trackingUrl: "https://expedia.tpm.li/ROz7o60R" },
  "hotel-tlv-backstage-expedia": { trackingUrl: "https://expedia.tpm.li/IoAftG4v" },
  "hotel-tlv-cinema-expedia": { trackingUrl: "https://expedia.tpm.li/Bg9FgnkO" },
  "hotel-tlv-port-tower-expedia": { trackingUrl: "https://expedia.tpm.li/iMFiop3v" },
  "hotel-tlv-melody-expedia": { trackingUrl: "https://expedia.tpm.li/A2UCTV6o" },
  "hotel-tlv-elkonin-expedia": { trackingUrl: "https://expedia.tpm.li/foilXhPU" },
  "hotel-tlv-ruby-expedia": { trackingUrl: "https://expedia.tpm.li/tuDSNuXT" },
  "hotel-tlv-the-jaffa-expedia": { trackingUrl: "https://expedia.tpm.li/uGzualBF" },
  "hotel-tlv-market-house-expedia": { trackingUrl: "https://expedia.tpm.li/FSOsHluu" },
  "hotel-tlv-albi-florentin-expedia": { trackingUrl: "https://expedia.tpm.li/XwLalnjb" },
  "hotel-tlv-florentin-house-expedia": { trackingUrl: "https://expedia.tpm.li/mE7ZJLXn" },
  "hotel-tlv-poli-house-expedia": { trackingUrl: "https://expedia.tpm.li/mIzxDpFJ" },
  "hotel-tlv-assemblage-expedia": { trackingUrl: "https://expedia.tpm.li/K0vqkaFB" },
  "hotel-tlv-the-norman-expedia": { trackingUrl: "https://expedia.tpm.li/VLBMm8gI" },
  "hotel-tlv-65-rothschild-expedia": { trackingUrl: "https://expedia.tpm.li/hpcJ9Htm" },
};

export interface HotelRecommendation {
  id: string;
  cityId: "jerusalem" | "telaviv" | "tiberias";
  areaId: string;
  name: string;
  style: string;
  summary: string;
  bestFor: string;
  watch: string;
  sourceId: string;
}

export const hotelRecommendations: HotelRecommendation[] = [
  {
    id: "herbert-samuel", cityId: "jerusalem", areaId: "downtown", name: "Herbert Samuel Jerusalem", style: "Upscale city hotel",
    summary: "An upscale base around Shamai Street and Zion Square, close to Ben Yehuda and Jaffa Road. Consider it if you want a substantial hotel in the center rather than moving to the Mamilla luxury district.",
    bestFor: "Couples and first-time visitors who want an upscale Downtown base.",
    watch: "Confirm the entrance for your taxi, room orientation and which leisure facilities are included in your selected rate.", sourceId: "hotel-herbert-samuel-official",
  },
  {
    id: "arthur", cityId: "jerusalem", areaId: "downtown", name: "Arthur Hotel", style: "Boutique hotel",
    summary: "An Atlas boutique hotel on Dorot Rishonim Street beside the Ben Yehuda pedestrian area. Its period-inspired design and central setting suit travelers who prefer an intimate property and a neighborhood to explore on foot.",
    bestFor: "Couples and independent visitors who value character and a central walking location.",
    watch: "The pedestrian setting can mean a walk from the car. Ask about noise, parking arrangements and the specific room category.", sourceId: "hotel-arthur-official",
  },
  {
    id: "mamilla", cityId: "jerusalem", areaId: "mamilla", name: "Mamilla Hotel", style: "Contemporary luxury",
    summary: "A contemporary luxury hotel beside Mamilla Avenue and the approach to Jaffa Gate. It suits visitors who want to combine Old City sightseeing with a modern hotel setting rather than sleep inside the historic walls.",
    bestFor: "Couples and short luxury stays focused on Jaffa Gate and the Old City.",
    watch: "Book a view category explicitly if it matters. Confirm breakfast, wellness access and any extra charges for the room offer.", sourceId: "hotel-mamilla-official",
  },
  {
    id: "king-david", cityId: "jerusalem", areaId: "mamilla", name: "King David Jerusalem", style: "Historic landmark luxury",
    summary: "Dan Hotels' landmark on King David Street combines a historic grand-hotel atmosphere with an outlook toward the Old City. Consider it when the hotel itself is part of your Jerusalem experience, rather than simply a place to sleep.",
    bestFor: "Travelers who enjoy historic hotels, traditional public spaces and a landmark setting.",
    watch: "Room outlooks vary. Check the walk from the exact entrance and any seasonal restrictions on the facilities you plan to use.", sourceId: "hotel-king-david-official",
  },
  {
    id: "new-imperial", cityId: "jerusalem", areaId: "old-city", name: "New Imperial Hotel", style: "Historic hotel by Jaffa Gate",
    summary: "A historic property immediately inside Jaffa Gate, convenient for the Christian and Armenian quarters. It offers an Old City base while keeping the route out toward Mamilla more straightforward than a stay deeper in the market lanes.",
    bestFor: "First-time Old City visitors and pilgrims prioritizing Jaffa Gate access.",
    watch: "Ask about stairs, the floor of your room and help with luggage. A location near the gate does not guarantee step-free access.", sourceId: "hotel-new-imperial-official",
  },
  {
    id: "sephardic-house", cityId: "jerusalem", areaId: "old-city", name: "The Sephardic House", style: "Jewish Quarter heritage stay",
    summary: "A heritage hotel on Batei Mahase Street in the Jewish Quarter, close to the Hurva Synagogue and routes toward the Western Wall. Different wings and accommodation categories make the specific room choice important.",
    bestFor: "Jewish heritage trips, pilgrimages and visitors spending substantial time in the Jewish Quarter.",
    watch: "Confirm your wing, room category, arrival gate and the whole walking route with luggage. The surrounding streets may include steps.", sourceId: "hotel-sephardic-house-official",
  },
  {
    id: "bezalel", cityId: "jerusalem", areaId: "mahane-yehuda", name: "Bezalel Hotel", style: "Design-focused boutique hotel",
    summary: "An Atlas boutique hotel on Mesilat Yesharim Street in Nachlaot, with interiors focused on Israeli art and design. Its position lets you explore both the market and Downtown without choosing a room directly above the market's busiest lanes.",
    bestFor: "Couples and solo travelers who want boutique design and a central neighborhood base.",
    watch: "Check the walking route to the market, room orientation and parking arrangements; being nearby is different from staying inside the market.", sourceId: "hotel-bezalel-official",
  },
  {
    id: "market-courtyard", cityId: "jerusalem", areaId: "mahane-yehuda", name: "The Market Courtyard", style: "Apartment-style accommodation",
    summary: "Furnished apartments and suites around a Jerusalem-stone courtyard on HaCarmel Street, beside the market and Nachlaot. It is an alternative to a conventional hotel for travelers who want an independent base and space to settle in.",
    bestFor: "Longer stays and travelers who prefer an apartment-style setting near the market.",
    watch: "Confirm the exact unit, cooking equipment, stairs, access instructions and any cleaning charge. Market-facing units may have a different noise level.", sourceId: "hotel-market-courtyard-official",
  },
  {
    id: "american-colony", cityId: "jerusalem", areaId: "east-jerusalem", name: "The American Colony Hotel", style: "Historic luxury hotel",
    summary: "A historic hotel north of the Old City, known for its distinctive buildings, courtyards and Ottoman-inspired rooms. It offers a more enclosed hotel retreat than the busy commercial streets closer to Damascus Gate.",
    bestFor: "Couples and luxury travelers who enjoy heritage buildings and a distinctive hotel atmosphere.",
    watch: "Rooms differ between buildings and categories. Check the walk to your intended gate and any seasonal limitations on outdoor facilities.", sourceId: "hotel-american-colony-official",
  },
  {
    id: "jerusalem-hotel", cityId: "jerusalem", areaId: "east-jerusalem", name: "Jerusalem Hotel", style: "Family-run Palestinian heritage hotel",
    summary: "A family-run heritage property on Antar Ben Shaddad Street near Nablus Road and Damascus Gate. Arabesque interiors, antiques and a restaurant rooted in local Palestinian heritage make it a distinctive small-hotel option.",
    bestFor: "Independent visitors and pilgrims who value local character and northern Old City access.",
    watch: "Compare individual room layouts and accessibility, and ask about restaurant activity if you are sensitive to evening noise.", sourceId: "hotel-jerusalem-hotel-official",
  },
  {
    id: "orient", cityId: "jerusalem", areaId: "german-colony", name: "Orient Jerusalem by Isrotel", style: "Full-service luxury hotel",
    summary: "Isrotel's luxury hotel at the northern end of the German Colony combines a contemporary building with restored heritage buildings. Its location near Emek Refaim and the First Station area suits a hotel-focused stay with neighborhood walks.",
    bestFor: "Couples and families looking for substantial hotel facilities in the German Colony.",
    watch: "Confirm the room's building, pool opening dates and children's access. Ask for a current update on surrounding street works and the vehicle entrance.", sourceId: "hotel-orient-official",
  },
  {
    id: "rafael-residence", cityId: "jerusalem", areaId: "german-colony", name: "Rafael Residence", style: "Suite-style aparthotel in Baka",
    summary: "Suites on Bethlehem Road in Baka with separate living space and kitchen facilities described by the property. It is a practical alternative for visitors who want a residential base and more independence over a longer stay.",
    bestFor: "Families and longer visits where living space and preparing some meals matter.",
    watch: "Confirm the exact suite layout, kitchen equipment, parking and late check-in arrangements. Plan buses or taxis for some trips to central attractions.", sourceId: "hotel-rafael-residence-official",
  },
  {
    id: "tlv-carlton", cityId: "telaviv", areaId: "telaviv-beachfront", name: "Carlton Tel Aviv", style: "Luxury hotel by the northern central beaches",
    summary: "A substantial seafront hotel near Gordon Beach and the marina, suited to visitors who want the coast to be central to their stay. Its different room categories include different outlooks, so choosing the hotel and choosing a sea-facing room are separate decisions.",
    bestFor: "Couples and visitors seeking a full-service coastal hotel rather than a small inland boutique stay.",
    watch: "Compare full, side and other room outlooks. Confirm breakfast, parking and leisure access for the exact offer.", sourceId: "hotel-tlv-carlton-official",
  },
  {
    id: "tlv-embassy", cityId: "telaviv", areaId: "telaviv-beachfront", name: "Embassy Hotel Tel Aviv", style: "Retro-inspired boutique hotel near the beach",
    summary: "A smaller hotel on Shalom Aleichem Street at HaYarkon, close to the central promenade. Its retro-inspired interiors offer a different format from the large beachfront hotels, with the sea nearby rather than a resort setting.",
    bestFor: "Independent travelers who want central beach access and a smaller hotel atmosphere.",
    watch: "Check the room's outlook and size. A location near the coast does not guarantee a sea view or the facilities of a large resort.", sourceId: "hotel-tlv-embassy-official",
  },
  {
    id: "tlv-backstage", cityId: "telaviv", areaId: "telaviv-dizengoff", name: "Backstage Hotel", style: "Theater-inspired boutique hotel",
    summary: "An Atlas boutique hotel in the former Ohel Theater on Beilinson Street near Dizengoff Square. Theater-inspired interiors give the property a distinctive identity, with central cafés and walking routes close by.",
    bestFor: "Couples and city-break visitors who enjoy design, historic buildings and exploring on foot.",
    watch: "Ask about room orientation and any rooftop or restaurant activity. Check breakfast and access to shared spaces against your chosen rate.", sourceId: "hotel-tlv-backstage-official",
  },
  {
    id: "tlv-cinema", cityId: "telaviv", areaId: "telaviv-dizengoff", name: "Cinema Hotel", style: "Historic cinema building on Dizengoff Square",
    summary: "An Atlas hotel in the former Esther cinema beside Dizengoff Square. Film memorabilia and the building's architecture make it a characterful central base, particularly for visitors who want the square itself as their point of orientation.",
    bestFor: "Architecture and film enthusiasts, and first-time visitors seeking a recognizable central location.",
    watch: "Check the room's size, outlook and noise exposure. Confirm where a taxi can stop and any rooftop opening arrangements.", sourceId: "hotel-tlv-cinema-official",
  },
  {
    id: "tlv-port-tower", cityId: "telaviv", areaId: "telaviv-old-north", name: "Port Tower by Isrotel Design", style: "Contemporary tower hotel near Tel Aviv Port",
    summary: "Isrotel's modern hotel at the northern end of HaYarkon Street is a useful option for time around the port and northern waterfront. Its tower format offers a different stay from the smaller boutique properties farther south in the Old North.",
    bestFor: "Visitors focused on the port, northern coast and a contemporary hotel setting.",
    watch: "Check your room's actual view and the walk to your preferred beach. Confirm any pool, meal and parking conditions for your dates.", sourceId: "hotel-tlv-port-tower-official",
  },
  {
    id: "tlv-melody", cityId: "telaviv", areaId: "telaviv-old-north", name: "Melody Hotel", style: "Boutique hotel near Independence Park",
    summary: "An Atlas boutique property on HaYarkon Street beside the Independence Park area. It suits a stay that combines the northern beaches with neighborhood streets, south of the port itself and closer to central Tel Aviv than a port-side address.",
    bestFor: "Couples and independent visitors who prefer a smaller property near the park and coast.",
    watch: "Map the route to your preferred beach, and confirm the room outlook, breakfast and parking arrangements.", sourceId: "hotel-tlv-melody-official",
  },
  {
    id: "tlv-elkonin", cityId: "telaviv", areaId: "telaviv-neve-tzedek", name: "Elkonin Tel Aviv – MGallery", style: "Restored heritage hotel near Neve Tzedek",
    summary: "A restored historic hotel on Lilienblum Street, on the eastern approach to Neve Tzedek and near the southern end of Rothschild. It combines a heritage building with a contemporary hotel setting, rather than placing you deep within Shabazi's residential lanes.",
    bestFor: "Couples seeking an upscale heritage stay with access to both Neve Tzedek and the southern center.",
    watch: "Confirm your room's building and outlook, and check any spa, pool, breakfast or restaurant arrangements for the dates you book.", sourceId: "hotel-tlv-elkonin-official",
  },
  {
    id: "tlv-ruby", cityId: "telaviv", areaId: "telaviv-neve-tzedek", name: "Ruby", style: "Small independent stay near Neve Tzedek",
    summary: "A small property in the Yehuda HaLevi area near Neve Tzedek, with a more independent, house-like format than a large full-service hotel. Its position connects the historic neighborhood with the streets around lower Rothschild.",
    bestFor: "Independent travelers who enjoy a smaller property and exploring nearby cafés and neighborhoods.",
    watch: "Check the current arrival process, staff availability, shared facilities and your room layout. Confirm the exact entrance before a late arrival.", sourceId: "hotel-tlv-ruby-official",
  },
  {
    id: "tlv-the-jaffa", cityId: "telaviv", areaId: "telaviv-jaffa", name: "The Jaffa (Fattal Limited Edition)", style: "Luxury heritage hotel in Old Jaffa",
    summary: "A landmark hotel on Louis Pasteur Street in Old Jaffa, combining a restored historic building with a contemporary addition. The current Fattal Limited Edition property suits a trip where the hotel and Jaffa's historic setting are central to the experience.",
    bestFor: "Luxury travelers and couples who want a distinctive Old Jaffa base.",
    watch: "Confirm the current property name, building, room category and included services. Ask about the accessible route and any seasonal leisure arrangements.", sourceId: "hotel-tlv-the-jaffa-official",
  },
  {
    id: "tlv-market-house", cityId: "telaviv", areaId: "telaviv-jaffa", name: "Market House Hotel", style: "Boutique hotel by Jaffa's flea market",
    summary: "An Atlas boutique hotel on Beit Eshel Street near the Clock Tower and flea market. Its market-inspired design and street setting suit visitors who want Jaffa's cafés, shops and evening restaurants close to their accommodation.",
    bestFor: "Couples and independent visitors who value a lively market-side location.",
    watch: "Ask about evening noise and your room's outlook. A balcony or sea view should be explicitly included in the category you choose.", sourceId: "hotel-tlv-market-house-official",
  },
  {
    id: "tlv-albi-florentin", cityId: "telaviv", areaId: "telaviv-florentin", name: "Albi Florentin", style: "Small hotel with digital self check-in",
    summary: "A Florentin property with a technology-led arrival format, described by its operator as using self check-in. Consider it for a more independent stay focused on the neighborhood rather than a conventional staffed hotel experience.",
    bestFor: "Travelers comfortable with digital arrival instructions and a small urban property.",
    watch: "Obtain check-in instructions before arrival and confirm support availability, luggage storage and the room's noise exposure.", sourceId: "hotel-tlv-albi-florentin-official",
  },
  {
    id: "tlv-florentin-house", cityId: "telaviv", areaId: "telaviv-florentin", name: "Florentin House by HOMY", style: "Neighborhood stay on Florentin Street",
    summary: "A small-property option on Florentin Street listed by HOMY, placing you within the neighborhood's everyday café and nightlife setting. Compare the current room descriptions rather than relying on older accounts of the building's accommodation format.",
    bestFor: "Independent visitors who want Florentin itself as their base for the southern city.",
    watch: "Confirm the exact room or unit, private facilities, check-in process and sound insulation. Do not assume an older hostel listing describes the current offer.", sourceId: "hotel-tlv-florentin-house-official",
  },
  {
    id: "tlv-poli-house", cityId: "telaviv", areaId: "telaviv-kerem", name: "Poli House by AFI Hotels", style: "Design hotel by the Carmel Market district",
    summary: "An AFI design hotel by the Allenby and Nachalat Binyamin market-side streets. It offers access to Carmel Market and the Yemenite Quarter, while its busier edge location differs from a room within the quarter's small residential lanes.",
    bestFor: "Couples and city-break visitors who want design and nearby market food and nightlife.",
    watch: "Some room categories are compact. Confirm the exact size, balcony if offered, noise exposure and any rooftop or leisure access included.", sourceId: "hotel-tlv-poli-house-official",
  },
  {
    id: "tlv-assemblage", cityId: "telaviv", areaId: "telaviv-kerem", name: "Assemblage Boutique", style: "Historic boutique stay on the quarter's northern edge",
    summary: "A small property in a preserved building at 48 Allenby Street, near the northern edge of Kerem HaTeimanim. Its rooms, studios and suites offer different layouts, with access toward both the beach and Carmel Market from a busy central street.",
    bestFor: "Couples and independent visitors who enjoy historic buildings and a central market-and-beach base.",
    watch: "The operator states that the building has no lift. Confirm stairs, the self-service check-in process, exact room layout and street-facing versus courtyard outlook.", sourceId: "hotel-tlv-assemblage-official",
  },
  {
    id: "tlv-the-norman", cityId: "telaviv", areaId: "telaviv-rothschild", name: "The Norman Tel Aviv", style: "Luxury heritage hotel off Rothschild",
    summary: "A luxury property in restored buildings on Nachmani Street, near Rothschild Boulevard rather than directly on it. The historic setting suits visitors who want a distinctive hotel alongside access to the central city's restaurants and architecture.",
    bestFor: "Couples and luxury city stays where the property itself is part of the trip.",
    watch: "Confirm the exact building and room category, and check breakfast, leisure access and any additional charges in your selected offer.", sourceId: "hotel-tlv-the-norman-official",
  },
  {
    id: "tlv-65-rothschild", cityId: "telaviv", areaId: "telaviv-rothschild", name: "65 Hotel Rothschild", style: "Boutique hotel directly on Rothschild Boulevard",
    summary: "An Atlas boutique hotel at 65 Rothschild Boulevard, with the tree-lined promenade immediately outside. It is a direct-on-the-boulevard alternative to nearby heritage hotels on side streets, with the cafés and architecture of the central district close by.",
    bestFor: "Visitors who want Rothschild as their daily walking route and a boutique city-hotel format.",
    watch: "Ask about your room's outlook, traffic or venue noise, breakfast inclusion and parking availability for your dates.", sourceId: "hotel-tlv-65-rothschild-official",
  },
];

export const hotelsForArea = (areaId: string, cityId?: HotelRecommendation["cityId"]) => hotelRecommendations.filter((hotel) => hotel.areaId === areaId && (!cityId || hotel.cityId === cityId));

export const tlvToJerusalem: RouteRecord = {
  id: "tlv-jerusalem",
  path: "/travel-blog/ben-gurion-airport-to-jerusalem/",
  origin: { code: "TLV", name: "Ben Gurion Airport" },
  destination: { name: "Jerusalem" },
  status: "published",
};

const commonConfirm = [
  "Final total price and payment",
  "Vehicle size for your passengers and luggage",
  "Meeting point and included waiting time",
  "Child seats",
  "Cancellation and flight-delay policy",
];

export const offers: Offer[] = [
  {
    id: "offer-moshe-tlv-jlm",
    productId: "moshe-private-transfer-tlv-jlm",
    routeId: "tlv-jerusalem",
    mode: "provider_inquiry",
    category: "prebooked",
    operatorId: "moshe-barak",
    label: "Moshe Barak",
    typeLabel: "Local operator",
    summary: "Private pre-booked transfer from a local driver business. Quote-based, with a published weekday starting rate.",
    priceLabel: "From ILS 550",
    price: {
      kind: "published_starting_rate",
      currency: "ILS",
      amount: 550,
      basis: "per_vehicle",
      maxPartySize: 4,
      conditions: "Published weekday starting fare for up to 4 passengers. Night, weekend and holiday surcharges may apply. Minimum 24 hours' notice. Not a live quote.",
      sourceId: "moshe-airport-transfers",
    },
    maxPassengersKnown: 4,
    ctaLabel: "Request a quote",
    url: `${OWNER_BASE}/airport-transfers/`,
    isAffiliate: false,
    isInformational: false,
    confirmOnOffer: commonConfirm,
    sourceIds: ["moshe-airport-transfers"],
  },
  {
    id: "offer-intui-tlv-jlm",
    productId: "intui-transfer-search-tlv",
    routeId: "tlv-jerusalem",
    mode: "provider_redirect",
    category: "prebooked",
    partnerId: "intui",
    label: "Intui.travel",
    typeLabel: "Transfer booking platform",
    summary: "Online platform listing airport transfers from Ben Gurion, with Jerusalem as a destination. Prices shown on the platform for your date.",
    priceLabel: "Check current price",
    maxPassengersKnown: null,
    ctaLabel: "Check current price",
    url: "https://en.intui.travel/tel-aviv-ben-gurion-international-airport-transfer/",
    isAffiliate: false,
    isInformational: false,
    confirmOnOffer: commonConfirm,
    sourceIds: ["intui-airport"],
  },
  {
    id: "offer-gettransfer-tlv-jlm",
    productId: "gettransfer-search",
    routeId: "tlv-jerusalem",
    mode: "provider_redirect",
    category: "prebooked",
    partnerId: "gettransfer",
    label: "GetTransfer.com",
    typeLabel: "Transfer booking platform",
    summary: "Transfer marketplace. Enter Ben Gurion Airport and your Jerusalem address on their site to see whether offers are available.",
    priceLabel: "Check availability",
    maxPassengersKnown: null,
    ctaLabel: "Check availability",
    url: "https://gettransfer.com/en",
    isAffiliate: false,
    isInformational: false,
    confirmOnOffer: commonConfirm,
    sourceIds: ["gettransfer-home"],
  },
  {
    id: "info-gett-airport",
    productId: "authorized-airport-taxi",
    routeId: "tlv-jerusalem",
    mode: "official_info",
    category: "on_arrival",
    partnerId: "gett",
    label: "Authorized airport taxi (Gett)",
    typeLabel: "On-arrival taxi · information",
    summary: "Licensed taxis wait at the official airport ranks around the clock. No pre-booking; fare is metered. Gett explains how to order on arrival.",
    priceLabel: "Metered fare",
    maxPassengersKnown: null,
    ctaLabel: "View official taxi instructions",
    url: "https://www.gett.com/il/airport-en/",
    isAffiliate: false,
    isInformational: true,
    confirmOnOffer: ["Vehicle size for larger groups", "Payment method", "Luggage space"],
    sourceIds: ["gett-airport", "iaa-directions"],
  },
];

export const getSource = (id: string) => sources.find((s) => s.id === id)!;

export function formatCheckDate(d: ISODate) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}

export const routeFaqs: { q: string; a: string }[] = [
  {
    q: "Should I pre-book or take a taxi on arrival?",
    a: "Pre-booking suits late-night arrivals, families with child seats, larger groups and anyone who wants a named meeting point and agreed price before landing. The licensed airport taxi rank operates around the clock with metered fares, so it is a reasonable choice for small parties with flexible plans.",
  },
  {
    q: "Is ILS 550 the price I will pay?",
    a: "No. ILS 550 is Moshe Barak's published weekday starting rate for up to four passengers. Night, weekend and holiday surcharges may apply, and the final amount is set in a quote. Other providers set their own prices on their sites.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "Policies differ by provider. Before paying, check whether the offer tracks your flight, how much free waiting is included and what happens if you land much later. Keep your confirmation and the provider's contact number handy.",
  },
  {
    q: "Where do I meet a pre-booked driver?",
    a: "Follow the meeting point in your own booking confirmation. It may differ from the public taxi rank, which the Israel Airports Authority lists at Terminal 3, ground floor, Exit 03.",
  },
  {
    q: "We are more than four people with lots of luggage. What should I book?",
    a: "Ask for a group quote and state the exact number of passengers, suitcases and any oversized items such as strollers or golf bags. Don't assume a standard car fits; confirm the vehicle type in writing.",
  },
  {
    q: "Can I travel on Shabbat or holidays?",
    a: "Check Israel Railways' current service for your exact date before relying on the train. For a transfer or taxi, confirm the provider's availability and any night, weekend or holiday charges for your arrival time.",
  },
  {
    q: "Is there a train instead?",
    a: "Yes, Israel Railways serves the airport and Jerusalem. Schedules and fares change, so check the official Israel Railways site for your travel date and consider the extra step from the station to your accommodation.",
  },
];

/* ------------------------------------------------------------------ */
/* Generic provider referrals for hotels, tours, attractions, tickets,  */
/* car rental and additional transfer routes.                           */
/* ------------------------------------------------------------------ */

export type Relationship = "publisher_operator" | "independent_operator" | "booking_platform" | "official";

export interface ProviderLink {
  id: string;
  pageIds: string[];
  providerName: string;
  relationship: Relationship;
  operatorId?: string;
  partnerId?: string;
  mode: Exclude<BookingMode, "live_quote">; // live quotes require a configured API (none yet)
  title: string;
  summary: string;
  ctaLabel: string;
  url: string;
  isAffiliate: boolean;
  /** Shown when the traveler must re-enter details on the provider's site. */
  reentryNote?: string;
  confirm: string[];
  sourceId?: string;
}

const moshe = { providerName: "Moshe Barak", relationship: "publisher_operator" as const, operatorId: "moshe-barak" };

export const providerLinks: ProviderLink[] = [
  ...hotelRecommendations.map((hotel): ProviderLink => {
    const id = `hotel-${hotel.id}-expedia`;
    const trackingUrl = affiliateConfig[id]?.trackingUrl;
    const officialUrl = sources.find((source) => source.id === hotel.sourceId)!.url;
    return {
      id, pageIds: [`stay-area-${hotel.areaId}`], providerName: trackingUrl ? "Expedia" : hotel.name,
      relationship: trackingUrl ? "booking_platform" : "official", ...(trackingUrl ? { partnerId: "expedia" } : {}), mode: "provider_redirect",
      title: hotel.name, summary: hotel.summary, ctaLabel: trackingUrl ? "Check rooms on Expedia" : "Visit the hotel's website",
      url: trackingUrl || officialUrl, isAffiliate: Boolean(trackingUrl), sourceId: hotel.sourceId,
      confirm: ["Property name and location", "Dates and room category", "Total including taxes and fees", "Cancellation deadline"],
    };
  }),
  ...([
    ["jerusalem", "Jerusalem", "jerusalem"],
    ["downtown", "Downtown Jerusalem", "jerusalem"],
    ["mamilla", "Mamilla & King David Street", "jerusalem"],
    ["old-city", "Jerusalem's Old City", "jerusalem"],
    ["mahane-yehuda", "Mahane Yehuda & Nachlaot", "jerusalem"],
    ["east-jerusalem", "East Jerusalem", "jerusalem"],
    ["german-colony", "German Colony & Baka", "jerusalem"],
    ["telaviv", "Tel Aviv", "telaviv"],
    ["telaviv-beachfront", "Tel Aviv Beachfront", "telaviv"],
    ["telaviv-dizengoff", "Dizengoff & City Center", "telaviv"],
    ["telaviv-old-north", "Old North & Tel Aviv Port", "telaviv"],
    ["telaviv-neve-tzedek", "Neve Tzedek & Surroundings", "telaviv"],
    ["telaviv-jaffa", "Jaffa", "telaviv"],
    ["telaviv-florentin", "Florentin", "telaviv"],
    ["telaviv-kerem", "Kerem HaTeimanim & Carmel Market", "telaviv"],
    ["telaviv-rothschild", "Rothschild Boulevard", "telaviv"],
  ] as const).map(([areaId, name, cityId]): ProviderLink => {
    const cityWide = areaId === cityId;
    const id = cityWide ? `hotels-${cityId}-expedia` : `area-${areaId}-expedia`;
    const trackingUrl = affiliateConfig[id]?.trackingUrl;
    return {
      id, pageIds: [cityWide ? `stay-${cityId}` : `stay-area-${areaId}-browse`],
      providerName: "Expedia", relationship: "booking_platform", partnerId: "expedia", mode: "provider_redirect",
      title: `Browse more places to stay in ${name}`, summary: "Compare other accommodation options for your dates. Check the map on Expedia to confirm the property is in your preferred area.",
      ctaLabel: "Browse hotels on Expedia", url: trackingUrl || "https://www.expedia.com/", isAffiliate: Boolean(trackingUrl), sourceId: `owner-stay-${cityId}`,
      reentryNote: "Enter your dates and guests on Expedia, then confirm the property and room before booking.",
      confirm: ["Exact neighborhood and map location", "Total including taxes and fees", "Room type", "Cancellation conditions"],
    };
  }),
  // Ben Gurion → Tel Aviv (no published Tel Aviv rate is shown)
  {
    id: "tlv-ta-moshe", pageIds: ["tlv-telaviv"], ...moshe, mode: "provider_inquiry",
    title: "Private pre-booked transfer", summary: "Local driver business. Ask for a quote for your Tel Aviv or Jaffa address, party size and arrival time.",
    ctaLabel: "Request a quote on Israel-Taxi.com", url: `${OWNER_BASE}/airport-transfers/`, isAffiliate: false,
    reentryNote: "Your details are not passed on. Include flight time, passengers, luggage and address in your request.",
    confirm: ["Final price and surcharges", "Vehicle size", "Meeting point and waiting time", "Child seats"], sourceId: "moshe-airport-transfers",
  },
  {
    id: "tlv-ta-intui", pageIds: ["tlv-telaviv"], providerName: "Intui.travel", relationship: "booking_platform", partnerId: "intui", mode: "provider_redirect",
    title: "Transfer booking platform", summary: "Ben Gurion airport transfer page. Choose Tel Aviv as your destination on their site to see current options.",
    ctaLabel: "Check prices on Intui.travel", url: "https://en.intui.travel/tel-aviv-ben-gurion-international-airport-transfer/", isAffiliate: false,
    reentryNote: "Enter your date, address and party on Intui.travel.", confirm: ["Final total", "Vehicle class", "Cancellation and delay policy"], sourceId: "intui-airport",
  },
  {
    id: "tlv-ta-gettransfer", pageIds: ["tlv-telaviv"], providerName: "GetTransfer.com", relationship: "booking_platform", partnerId: "gettransfer", mode: "provider_redirect",
    title: "Transfer marketplace", summary: "Enter Ben Gurion Airport and your Tel Aviv address to see whether drivers offer the trip.",
    ctaLabel: "Check availability on GetTransfer", url: "https://gettransfer.com/en", isAffiliate: false,
    reentryNote: "Enter your route and date on GetTransfer.", confirm: ["Final total", "Driver and vehicle details", "Cancellation policy"], sourceId: "gettransfer-home",
  },
  {
    id: "tlv-ta-gett", pageIds: ["tlv-telaviv"], providerName: "Gett", relationship: "official", partnerId: "gett", mode: "official_info",
    title: "Authorized airport taxi (on arrival)", summary: "Licensed metered taxis at the official ranks around the clock. No pre-booking needed.",
    ctaLabel: "View official taxi instructions", url: "https://www.gett.com/il/airport-en/", isAffiliate: false,
    confirm: ["Payment method", "Space for luggage"], sourceId: "gett-airport",
  },
  // Private transport (non-airport)
  {
    id: "private-driver-moshe", pageIds: ["transfers-hub", "tours-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private driver by the day", summary: "Hire a local driver for multi-stop days or intercity transfers. Itinerary and price agreed by inquiry.",
    ctaLabel: "Request a quote on Israel-Taxi.com", url: `${OWNER_BASE}/private-driver-in-israel/`, isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Contact the operator on their site.", confirm: ["Hours included", "Entrance fees not included unless stated", "Guide vs driver only"], sourceId: "owner-private-driver",
  },
  // Tours
  {
    id: "bethlehem-beinharim", pageIds: ["bethlehem", "tours-hub"], providerName: "Bein Harim Tours", relationship: "independent_operator", operatorId: "bein-harim", mode: "provider_redirect",
    title: "Jerusalem and Bethlehem tour (combined itinerary)", summary: "A combined day covering sites in Jerusalem and Bethlehem — not a Bethlehem-only tour. The operator lists pickup from several cities, including Jerusalem.",
    ctaLabel: "See dates and prices on Bein Harim", url: "https://www.beinharimtours.com/jerusalem-and-bethlehem-tour/", isAffiliate: false,
    reentryNote: "Choose your date and pickup on the operator's site.", confirm: ["Departure date and pickup point", "Tour language", "Shared or private format", "Passport and current travel requirements", "Cancellation terms"], sourceId: "beinharim-jlm-bethlehem",
  },
  {
    id: "private-daytrips-moshe", pageIds: ["tours-hub", "masada"], ...moshe, mode: "provider_inquiry",
    title: "Private day trips", summary: "Private day trips with a local driver, planned around your own itinerary.",
    ctaLabel: "Request a quote on Israel-Taxi.com", url: `${OWNER_BASE}/private-day-trips/`, isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Contact the operator on their site.", confirm: ["Exact itinerary and stops", "Whether a licensed guide is included", "Entrance fees", "Travel requirements for crossings"], sourceId: "owner-private-day-trips",
  },
  // Shore excursions (port-specific pages only)
  {
    id: "ashdod-shore-moshe", pageIds: ["shore-ashdod", "shore-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private car-and-driver shore excursion from Ashdod", summary: "Local driver business with suggested Tel Aviv/Jaffa, Jerusalem and Masada/Dead Sea days from Ashdod Port. Itinerary, price and timing agreed by inquiry.",
    ctaLabel: "Request a quote on Israel-Taxi.com", url: `${OWNER_BASE}/ashdod-shore-excursions/`, isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Include ship name, date, disembarkation and all-aboard times and party size in your request.",
    confirm: ["Price and what it covers", "Pickup point at the port", "Driver only or licensed guide", "Return timing for your all-aboard time", "Cancellation terms"], sourceId: "owner-ashdod-shore",
  },
  {
    id: "ashdod-shore-beinharim", pageIds: ["shore-ashdod"], providerName: "Bein Harim Tours", relationship: "independent_operator", operatorId: "bein-harim", mode: "provider_redirect",
    title: "Jerusalem and Bethlehem day tour from Ashdod Port", summary: "The operator's port-specific product combining Jerusalem and Bethlehem in one day from Ashdod.",
    ctaLabel: "See dates and prices on Bein Harim", url: "https://www.beinharimtours.com/jerusalem-and-bethlehem-day-tour-from-ashdod-port/", isAffiliate: false,
    reentryNote: "Choose your date on the operator's site.", confirm: ["Your ship's date and port-call times", "Meeting point at the port", "Shared or private format and inclusions", "Passport and travel requirements for Bethlehem", "Return arrangements and cancellation terms"], sourceId: "beinharim-ashdod-jlm-bethlehem",
  },
  {
    id: "haifa-shore-moshe", pageIds: ["shore-haifa", "shore-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private car-and-driver shore excursion from Haifa", summary: "Local driver business with suggested Akko/Rosh Hanikra, Tel Aviv/Jaffa, Nazareth/Sea of Galilee and Jerusalem days from Haifa Port. Itinerary and price by inquiry.",
    ctaLabel: "Request a quote on Israel-Taxi.com", url: `${OWNER_BASE}/haifa-shore-excursions/`, isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Include ship name, date, disembarkation and all-aboard times and party size in your request.",
    confirm: ["Whether the itinerary fits your port-call time", "Pickup point at the port", "Driver only or licensed guide", "Entrance fees", "Cancellation terms"], sourceId: "owner-haifa-shore",
  },
  {
    id: "haifa-shore-beinharim", pageIds: ["shore-haifa"], providerName: "Bein Harim Tours", relationship: "independent_operator", operatorId: "bein-harim", mode: "provider_redirect",
    title: "Ship-to-shore: Haifa to Jerusalem and Bethlehem", summary: "The operator's Haifa-port product combining Jerusalem and Bethlehem in one long day.",
    ctaLabel: "See dates and prices on Bein Harim", url: "https://www.beinharimtours.com/ship-to-shore-excursions-haifa-jerusalem-bethlehem/", isAffiliate: false,
    reentryNote: "Choose your date on the operator's site.", confirm: ["Your ship's date and port-call times", "Meeting point at the port", "Shared or private format and inclusions", "Passport and travel requirements for Bethlehem", "Return arrangements and cancellation terms"], sourceId: "beinharim-haifa-jlm-bethlehem",
  },
  // Attractions & tickets (official)
  {
    id: "masada-inpa", pageIds: ["masada", "tickets-hub", "attractions-hub"], providerName: "Israel Nature and Parks Authority", relationship: "official", operatorId: "inpa", mode: "official_info",
    title: "Masada National Park — official visit reservations", summary: "Reserve site entry and see current cable car, museum and night-show options on the official site.",
    ctaLabel: "See visit options on the official site", url: "https://en.parks.org.il/reserve-park/masada-national-park/", isAffiliate: false,
    reentryNote: "Select your date and visit type on the official site.", confirm: ["Today's opening hours and weather closures", "Cable car vs hiking access", "Museum and night-show booking", "Which side (east or west) you are arriving at"], sourceId: "inpa-masada",
  },
  {
    id: "caesarea-inpa", pageIds: ["caesarea", "tickets-hub", "attractions-hub"], providerName: "Israel Nature and Parks Authority", relationship: "official", operatorId: "inpa", mode: "official_info",
    title: "Caesarea National Park — official visit information", summary: "Current opening hours, admission options and visit reservation for the coastal archaeological park.",
    ctaLabel: "See visit options on the official site", url: "https://en.parks.org.il/reserve-park/caesarea-national-park/", isAffiliate: false,
    reentryNote: "Select your date on the official site.", confirm: ["Opening hours for your date", "Which exhibits are currently open", "Admission type"], sourceId: "inpa-caesarea",
  },
  // Hotels (regular city-browsing links; not fact sources, not verified inventory)
  ...([
    ["jerusalem", "Jerusalem", "https://www.booking.com/city/il/jerusalem.html"],
    ["telaviv", "Tel Aviv", "https://www.booking.com/city/il/tel-aviv.html"],
    ["tiberias", "Tiberias", "https://www.booking.com/city/il/tiberias.html"],
  ] as const).map(([id, city, url]): ProviderLink => ({
    id: `hotels-${id}-booking`, pageIds: [`stay-${id}`], providerName: "Booking.com", relationship: "booking_platform", partnerId: "booking", mode: "provider_redirect",
    title: `Browse places to stay in ${city}`, summary: `Booking.com's ${city} city page. Enter your dates and guests there to see current properties and prices.`,
    ctaLabel: "Check prices on Booking.com", url, isAffiliate: false,
    reentryNote: "Dates and preferences chosen here are not passed on. Enter them on Booking.com.",
    confirm: ["Total price incl. taxes and fees", "Cancellation deadline", "Exact location on the map", "Shabbat check-in arrangements if relevant", "Parking"],
  })),
  // Car rental
  {
    id: "cars-discovercars", pageIds: ["car-rental"], providerName: "DiscoverCars", relationship: "booking_platform", partnerId: "discovercars", mode: "provider_redirect",
    title: "Compare rental cars in Israel", summary: "Rental search where you set pickup and return location and dates on their site.",
    ctaLabel: "Check prices on DiscoverCars", url: "https://www.discovercars.com/israel", isAffiliate: false,
    reentryNote: "Pickup location and dates chosen here are not passed on. Enter them on DiscoverCars.",
    confirm: ["Insurance and excess for your specific offer", "Deposit and credit-card requirements", "Driver age and licence rules", "Areas the rental terms allow you to drive", "Cancellation terms"], sourceId: "discovercars-israel",
  },
];

export const linksForPage = (pageId: string) => providerLinks.filter((l) => l.pageIds.includes(pageId));
