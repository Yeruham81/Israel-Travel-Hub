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
export const OWNER_BASE = "https://www.israel-taxi.com";

export const sources: SourceReference[] = [
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
    checkedAt: INFO_CHECK_DATE,
    note: "Background for area guidance. No property, price or availability claims are taken from it.",
  },
  {
    id: "owner-stay-telaviv",
    title: "Where to stay in Tel Aviv (existing guide)",
    publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/where-to-stay-in-tel-aviv/`,
    checkedAt: INFO_CHECK_DATE,
    note: "Background for area guidance. No property, price or availability claims are taken from it.",
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
  { id: "discovercars", name: "DiscoverCars", capability: "editorial_only", homepage: "https://www.discovercars.com/" },
];

/** Affiliate URLs live separately; empty until a partner agreement provides tracking links. */
export const affiliateConfig: Record<string, { trackingUrl: string } | undefined> = {};

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
