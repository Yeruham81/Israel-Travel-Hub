/**
 * Typed content registry. Every record here is shaped like a future database row
 * so it can be swapped for DB-backed queries without changing page components.
 */
import type { TourProduct, TourBookingOffer } from "@/data/tourTypes";
import { migrationSources } from "@/data/guideMigrationSources";
import { neighborhoodHotelAdditions, neighborhoodHotelSources } from "@/data/neighborhoodHotels";
import kiwitaxiLogo from "@/assets/providers/kiwitaxi.svg";
import welcomePickupsLogo from "@/assets/providers/welcome-pickups.svg";
import intuiLogo from "@/assets/providers/intui.webp";
import gettransferLogo from "@/assets/providers/gettransfer.svg";

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
  logo?: {
    src: string;
    width: number;
    height: number;
    sourceUrl: string;
    checkedAt: ISODate;
  };
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
 * - provider_inquiry: traveler requests a quote / contacts the provider through a service page.
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
export const DEAD_SEA_STAY_REVIEW_DATE: ISODate = "2026-10-17";
export const TIBERIAS_STAY_REVIEW_DATE: ISODate = "2026-10-17";
export const HAIFA_STAY_REVIEW_DATE: ISODate = "2026-10-17";
export const OWNER_BASE = "https://www.israel-taxi.com";
export interface AuthorProfile {
  name: string;
  role: string;
  experience: string;
  bio: string;
  reviewsUrl: string;
  sourceIds: string[];
}
export const mosheBarakAuthor: AuthorProfile = {
  name: "Moshe Barak",
  role: "Private transport operator & local travel expert",
  experience: "Over 20 years helping travelers get around Israel, discover its highlights, and plan the perfect trip.",
  bio: "",
  reviewsUrl: "https://www.tripadvisor.com/Attraction_Review-g293984-d14803612-Reviews-Moshe_Barak-Tel_Aviv_Tel_Aviv_District.html",
  sourceIds: ["moshe-author-profile"],
};

/** Keep migration provenance in the registry without publishing legacy-site referrals. */
export function isPublisherUrl(url?: string) {
  if (!url) return false;
  try { return new URL(url).hostname.replace(/^www\./, "") === "israel-taxi.com"; }
  catch { return false; }
}
export const AIRPORT_TRANSFER_CHECK_DATE: ISODate = "2026-10-17";
export const TRAVEL_GUIDE_CHECK_DATE: ISODate = "2026-10-17";
export const SHORE_EXCURSION_CHECK_DATE: ISODate = "2026-10-21";

export const referenceFxSource: SourceReference = {
  id: "fx-bank-of-israel", title: "Representative exchange rates", publisher: "Bank of Israel",
  url: "https://www.boi.org.il/en/economic-roles/financial-markets/explanatory-notes-to-the-representative-exchange-rates/",
  checkedAt: "2026-10-17", note: "Official reference rates are published on foreign-currency business days. Payment is in ILS; USD/EUR equivalents are approximate estimates only. Daily API refreshes record their own publication/check times.",
};
export const referenceFxConfig = {
  upstreamUrl: "https://www.boi.org.il/PublicApi/GetExchangeRates?asXml=false",
  endpoint: "/api/exchange-rates/", refreshMs: 24 * 60 * 60 * 1000,
  retryMs: 15 * 60 * 1000, maxAgeMs: 7 * 24 * 60 * 60 * 1000,
  timeoutMs: 6000, storageKey: "ith_reference_fx_v1",
} as const;
export type ForeignDisplayCurrency = "USD" | "EUR";
export interface ExchangeRateSnapshot {
  sourceId: typeof referenceFxSource.id;
  publishedAt: ISODate;
  checkedAt: string;
  ilsPerUnit: Record<ForeignDisplayCurrency, number>;
}
/** Verified bootstrap/failure fallback, fetched from the official API; runtime updates replace it. */
export const initialReferenceFx: ExchangeRateSnapshot = {
  sourceId: "fx-bank-of-israel", publishedAt: "2026-10-16", checkedAt: "2026-10-17T19:10:55Z",
  ilsPerUnit: { USD: 3.089, EUR: 3.4769 },
};

export const travelGuidePaths = {
  bestTime: "/travel-blog/best-time-to-visit-israel/",
  food: "/travel-blog/what-to-eat-in-israel/",
  calendar: "/travel-blog/calendar-of-events/",
  eilat: "/travel-blog/eilat/",
  telAvivBeaches: "/travel-blog/beaches-in-tel-aviv/",
  telAvivMuseums: "/travel-blog/museums-in-tel-aviv/",
  haifaMuseums: "/travel-blog/museums-in-haifa/",
  megiddo: "/travel-blog/tel-megiddo/",
  precipice: "/travel-blog/mount-precipice/",
  annunciation: "/travel-blog/basilica-of-the-annunciation/",
  magdala: "/travel-blog/magdala/",
  yardenit: "/travel-blog/yardenit/",
  qasr: "/travel-blog/qasr-el-yahud/",
  deadSea: "/travel-blog/the-dead-sea/",
  bethlehem: "/travel-blog/jerusalem-to-bethlehem/",
  topTen: "/travel-blog/top-10-things-to-do-in-israel/",

  uber: "/travel-blog/uber-in-israel/",
  sherut: "/travel-blog/sherut-in-israel/",
  esim: "/travel-blog/best-esim-for-israel/",
  arrival: "/travel-blog/ben-gurion-airport-arrival-tips/",
  israel: "/travel-blog/getting-around-israel/",
  telAviv: "/travel-blog/getting-around-tel-aviv/",
  taxis: "/travel-blog/taxis-in-israel/",
  taxiFares: "/travel-blog/taxi-fares-in-israel/",
  airportTaxis: "/travel-blog/ben-gurion-airport-taxis/",
  shabbat: "/travel-blog/from-ben-gurion-airport-on-shabbat/",
  travelTips: "/travel-blog/israel-travel-tips/",
  jerusalem: "/travel-blog/jerusalem-travel-guide/",
  jerusalemDeadSea: "/travel-blog/jerusalem-to-the-dead-sea/",
  baptism: "/travel-blog/baptism-in-the-jordan-river/",
  jerusalemDayTrips: "/travel-blog/day-trips-from-jerusalem/",
  jerusalemChurches: "/travel-blog/churches-in-jerusalem/",
  jerusalemShopping: "/travel-blog/shopping-in-jerusalem/",
  telAvivDayTrips: "/travel-blog/day-trips-from-tel-aviv/",
} as const;
export type TravelGuideId = keyof typeof travelGuidePaths;

const travelGuideSources: SourceReference[] = [
  ...Object.entries(travelGuidePaths).filter(([id]) => id !== "taxiFares" && id !== "airportTaxis").map(([id, path]): SourceReference => ({
    id: `guide-original-${id}`, title: `Original guide: ${path.split("/").filter(Boolean).at(-1)!.replaceAll("-", " ")}`,
    publisher: "Israel-Taxi.com (Moshe Barak)", url: `${OWNER_BASE}${path}`, checkedAt: TRAVEL_GUIDE_CHECK_DATE,
    note: "Original publisher guide, adapted, shortened and supplemented by the primary references on this page. Published descriptions do not establish live transport, site access, opening hours or product availability. Operator-status limitations are identified in the article.",
  })),
  ...([
    ["taxi-fares-2026", "Taxi fares for 2026: official amendment and temporary rates", "Israel Ministry of Transport", "https://www.gov.il/BlobFolder/policy/taxi-rate-2026/he/taxi-rate-26.pdf", "Official government regulated taxi rates, published March 30, 2026; interim schedule April 1, 2026–March 31, 2027 unless amended. Amounts stated before VAT."],
    ["taxi-tariff-hours", "Approved A/B/C taxi tariff periods", "Israel Ministry of Transport — Price Committee", "https://www.gov.il/blobFolder/dynamiccollectorresultitem/Decision_14032018/he/decision_and_directives_Decision_14032018.pdf", "Official tariff-period framework: Sunday–Wednesday, Thursday, Friday/holiday eve, Saturday/recognized holidays; confirm later amendments if any."],
    ["taxi-passenger-rights", "Taxi driver and passenger rights", "Israel Ministry of Transport", "https://www.gov.il/he/pages/rights_and_obligations_of_a_taxi_driver", "Official guidance on regulated licensed taxi service and passenger rights; conditions may change."],
    ["taxi-complaints", "Complaints about public transportation, including taxis", "Israel Ministry of Transport", "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation", "Formal public transport complaints process, evidence and submission rules."],
    ["guide-iaa-terminal-2026", "Terminal 1 and Terminal 3 flight operations update, June 2026", "Israel Airports Authority", "https://www.iaa.gov.il/en/airports/ben-gurion/notifications-and-updates/", "IAA notice dated June 24, 2026: Terminal 1 reopened for domestic arrivals; international arriving flights continue to Terminal 3, although international departures may use either terminal. Check for later operational changes."],
    ["guide-customs-tourists", "Customs guidance for tourists and foreign residents", "Israel Tax Authority", "https://www.gov.il/en/pages/guide-tourist-customs?chapterIndex=1", "Official guide updated July 30, 2026 describes red and green customs lanes, declarations and restricted goods. When in doubt, use the red declaration channel."],
    ["guide-iaa-arrival-services", "Terminal 3 services and facilities", "Israel Airports Authority", "https://www.iaa.gov.il/en/airports/ben-gurion/terminal3sevices/", "Terminal services including ATMs, paid luggage porter assistance and other facilities; individual locations and opening times can change."],
    ["guide-iaa-accessibility", "Accessible services at Ben Gurion Airport", "Israel Airports Authority", "https://www.iaa.gov.il/en/airports/ben-gurion/accessibility/", "Airport accessibility and accessible internal shuttle information; airlines and ground handlers organize arriving passenger assistance."],
    ["guide-gett", "Airport taxi pickup and payment instructions", "Gett", "https://www.gett.com/il/airport-en/", "Official on-demand code/queue process, Terminal 3 Exit 03 and the separate scheduled-ride pickup at Level 2, Exit 23. Check the actual booking instructions before travelling."],
    ["guide-iaa", "Airport ground transportation", "Israel Airports Authority", "https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/", "Official train, bus, airport shuttle and taxi information. The internal airport shuttle is not an airport-to-city sherut."],
    ["guide-lost-property", "Lost property and baggage contacts", "Israel Airports Authority", "https://www.iaa.gov.il/en/airports/ben-gurion/lost-found/", "Use the airline or its handler for checked-baggage issues and the airport's instructions for items lost elsewhere in the terminal."],
    ["guide-telaviv-transit", "Public transport and weekend services", "Tel Aviv-Yafo Municipality", "https://www.tel-aviv.gov.il/en/Live/Transportation/Pages/PublicTransportaiton.aspx", "Municipal information on Rav-Kav and the free weekend network. Routes and operating hours must be checked for the travel date."],
    ["guide-red-line", "Tel Aviv light rail", "Tel Aviv-Yafo Municipality", "https://www.tel-aviv.gov.il/en/Live/Transportation/Pages/lightrail.aspx", "The operating Red Line is distinguished from future lines. Use the operator's current map and timetable rather than a future-network map."],
    ["guide-esim-airalo", "Israel eSIM plans and setup", "Airalo", "https://www.airalo.com/israel-esim", "Published Israel plans and installation guidance. Check the exact package for data, validity, voice/text inclusions and activation conditions. No local speed test was performed."],
    ["guide-esim-saily", "Israel plans, hotspot and optional calling", "Saily", "https://saily.com/esim-israel/", "Current Israel product page includes data packages and optional phone-number/call/text products. Its phone-number product uses a US number; an eSIM does not automatically supply an Israeli number."],
    ["guide-esim-yesim", "Israel fixed and unlimited plans", "Yesim", "https://yesim.app/country/israel/", "Israel packages include fixed and unlimited options; the provider explains fair-use speed limitations. Unlimited does not guarantee continuous maximum speed."],
    ["guide-esim-gigsky", "Israel mobile-data plans", "GigSky", "https://www.gigsky.com/country/esim-in-israel", "Country, regional and other coverage options are separate products. Confirm Israel and every other destination in the exact package's country list."],
    ["guide-esim-drimsim", "Israel pay-as-you-use SIM and eSIM", "Drimsim", "https://drimsim.com/en/country/israel", "The country page lists usage-based data for physical SIM and eSIM. Compare the current per-unit rate and any setup or balance terms with a fixed package."],
  ] as const).map(([id, title, publisher, url, note]): SourceReference => ({ id, title, publisher, url, note, checkedAt: TRAVEL_GUIDE_CHECK_DATE })),
  { id: "guide-entry", title: "Official Israel entry and ETA-IL portal", publisher: "Population and Immigration Authority", url: "https://israel-entry.piba.gov.il/", checkedAt: null, note: "Official portal for current passport-specific eligibility and application instructions. The portal is linked for readers to check their own requirements; fees, processing periods and admission conditions are not reproduced here." },
  { id: "guide-public-transport-payments", title: "Payment and validation in public transport", publisher: "National Public Transportation Authority", url: "https://bus.gov.il/how-to-pay", checkedAt: TRAVEL_GUIDE_CHECK_DATE, note: "Rav-Kav cards and supported payment apps are primary payment/validation methods. Cash cannot be paid on-board for ordinary bus travel; credit-card tap is supported only on selected lines. Check the trip, operator and validation rules." },
  { id: "guide-select-card-payment", title: "Credit card payment on selected public transport lines", publisher: "National Public Transportation Authority", url: "https://bus.gov.il/en/pay-credit", checkedAt: TRAVEL_GUIDE_CHECK_DATE, note: "Credit card and contactless wallet boarding are supported on selected operators/areas; single journey only, without ordinary transfer benefits or combined light rail ticketing. It is not nationwide tap-to-pay." },
  { id: "guide-redline-tickets", title: "Tel Aviv light rail ticketing and validation", publisher: "NTA Metropolitan Mass Transit System", url: "https://www.nta.co.il/en/buying-tickets-and-validation-machines/", checkedAt: TRAVEL_GUIDE_CHECK_DATE, note: "Official Red Line operator describes Rav-Kav and approved app validation. Passengers must validate before boarding and cannot buy tickets aboard the train." },
  { id: "guide-bus-planner", title: "National public-transport journey planner", publisher: "National Public Transportation Authority", url: "https://bus.gov.il/", checkedAt: null, note: "Official planning resource linked for date-specific bus routes and fares. No live journey was queried for the visitor's own dates; no old route number or fare is treated as a current quote." },
  ...([
    ["guide-uber-availability", "Uber Israel service availability", "Uber", "https://www.uber.com/il/en/", "Uber's official Israel-facing website states that Uber is currently unavailable in this location; checked October 2026. It is not a functioning Israel passenger-ride booking service."],
    ["guide-yango-israel", "Yango Israel taxi booking service", "Yango Israel — Appli Taxi", "https://appli.taxi/rider/", "Local operator's rider information for Yango taxi orders and listed cash/card payment choices; driver and feature availability still depend on the location and actual booking."],
    ["guide-telaviv-apps", "Getting around Tel Aviv: local taxi apps", "Tel Aviv Global / Tel Aviv-Yafo Municipality", "https://visit.tel-aviv.gov.il/move/in-tel-aviv", "Municipal visitor guide naming Gett, Raxi and Yango as local taxi-booking apps. It is background guidance, not a guarantee of live pickup or app capabilities."],
    ["guide-gett-app", "Gett Israel taxi-booking app", "Gett", "https://www.gett.com/il/", "Local taxi app and dispatcher services; pricing, methods of payment and availability should be checked in the current booking screen."],
    ["guide-weekend-711", "Weekend transport and Line 711", "Tel Aviv-Yafo Municipality", "https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx", "The municipal network page lists Line 711 between Shoham and Tel Aviv with a Ben Gurion Terminal 1 stop and describes the service as free. Route identity checked; no live departure, luggage capacity or holiday operation was tested."],
    ["guide-meter-route-estimates", "Ben Gurion Airport taxi fare calculations using April 2026 meter tariffs", "Taxitariff.co.il (independent calculator)", "https://taxitariff.co.il/ben-gurion-airport/jerusalem", "Illustrative route calculator for April 2026 metered prices. Also cross-checked Tel Aviv and Haifa route pages; calculated totals include ₪5.78 booking fee and exclude other surcharges, tolls and unexpected delays. Not a live offer or an official quote."],
    ["guide-weekend-timetable", "Na'im Besofash route maps and timetables", "Na'im Besofash", "https://busofash.co.il/?lines=711", "Official Line 711 route and Terminal 1 stop 34609. Actual Friday/Saturday departures require a live check; accessible journeys should be coordinated with the network on 03-7313911 at least three hours before the requested pickup."],
    ["guide-jerusalem-tourism", "Jerusalem visitor information", "iTravelJerusalem / Jerusalem Development Authority", "https://www.itraveljerusalem.com/", "Official destination information for areas, museums, heritage sites and visitor planning. Individual site access, reservations and religious-event arrangements need a current check."],
    ["guide-jerusalem-shopping", "Shopping in Jerusalem", "iTravelJerusalem / Jerusalem Development Authority", "https://www.itraveljerusalem.com/lobby/shopping", "Destination shopping directory, used for area orientation. The old publisher guide's blanket opening hours, fixed bargaining percentages and weekly-fair address are not treated as verified current arrangements."],
    ["guide-mahane-yehuda", "Mahane Yehuda Market", "iTravelJerusalem / Jerusalem Development Authority", "https://www.itraveljerusalem.com/lobby/machane-yehuda-market", "Market identity, location context and food/nightlife character. Individual stalls and restaurants have separate hours; not a live trading schedule."],
    ["guide-first-station", "First Station visitor information", "The First Station Jerusalem", "https://www.firststation.co.il/en/contact-us/", "The operator lists the complex as operating through the week including Saturday. This does not mean every business or event operates then; old event dates, parking prices and transport route lists are not reproduced."],
    ["guide-holy-sepulchre", "Basilica of the Holy Sepulchre", "Custodia di Terra Santa", "https://www.custodia.org/en/sanctuaries/basilica-of-the-holy-sepulchre/", "Sanctuary identity, Christian traditions and visitor information. The guide distinguishes tradition from historical certainty and does not extend one church's timetable to other sites."],
    ["guide-yardenit", "Baptism at Yardenit", "Yardenit Baptismal Site", "https://www.yardenit.com/baptism/", "The operator describes its location at the southern Sea of Galilee, designated baptism arrangements, changing facilities and required white robes. Ceremony/clergy arrangements and current charges must be confirmed separately."],
    ["guide-yardenit-about", "About Yardenit and visiting information", "Yardenit Baptismal Site", "https://www.yardenit.com/about/", "The operator's about page and other site pages display different hour sets. No single timetable or old robe price is copied; visitors are asked to confirm visit and last-baptism times directly."],
    ["guide-qasr", "Kasr el Yahud baptismal site", "Israel Nature and Parks Authority", "https://en.parks.org.il/reserve-park/baptismal-site-on-the-jordan-river-qasr-al-yahud/", "Primary site identity and visitor guidance for the lower Jordan near Jericho. Access and permitted activity depend on current instructions; an open information page is not confirmation of admission on a particular date."],
    ["guide-ein-gedi", "En Gedi Nature Reserve", "Israel Nature and Parks Authority", "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/", "Reserve and visitor-planning reference. Trails, weather closures, reservations and permitted routes must be checked for the actual visit; old assumptions of universal waterfall access are not repeated."],
    ["guide-jerusalem-deadsea", "Jerusalem to the Dead Sea and Masada", "iTravelJerusalem / Jerusalem Development Authority", "https://www.itraveljerusalem.com/en/article/travel-from-jerusalem-to-the-dead-sea-and-masada", "Useful for destination and transport orientation, including published bus-route context. Its fare examples, old spa-stop assumptions and driving-time examples are not copied as current prices or schedules."],
  ] as const).map(([id, title, publisher, url, note]): SourceReference => ({ id, title, publisher, url, note, checkedAt: TRAVEL_GUIDE_CHECK_DATE })),
];

export interface AirportTransferRate {
  id: string;
  destination: string;
  popular: boolean;
  price: IndicativePrice;
}

/** Moshe Barak's published starting rates, not live availability or a booking quote. */
export const airportTransferRates: AirportTransferRate[] = ([
  ["tel-aviv", "Tel Aviv & Jaffa", 330, true],
  ["jerusalem", "Jerusalem", 550, true],
  ["haifa", "Haifa", 930, true],
  ["dead-sea", "Ein Bokek · Dead Sea", 1300, true],
  ["raanana", "Ra’anana", 340, false],
  ["herzliya", "Herzliya", 340, false],
  ["netanya", "Netanya", 450, false],
  ["ashdod", "Ashdod", 480, false],
  ["caesarea", "Caesarea", 630, false],
  ["nazareth", "Nazareth", 950, false],
  ["eilat", "Eilat", 2700, false],
] as const).map(([id, destination, amount, popular]) => ({
  id, destination, popular,
  price: { kind: "published_starting_rate", currency: "ILS", amount, basis: "per_vehicle", maxPartySize: 4,
    conditions: "One-way weekday transfer for up to 4 passengers. Extra charges may apply for night, weekend or holiday trips. I confirm the final price and availability in writing; contact me in advance, preferably early for larger parties or special vehicle needs.",
    sourceId: "moshe-airport-transfers" },
}));

export const airportTransferContact = {
  name: "Moshe Barak", email: "reservations@israel-taxi.com",
  deliveryMode: "server_email" as const,
};

export const PRIVATE_DRIVER_CHECK_DATE: ISODate = "2026-10-17";
export const privateDriverServices = [
  { id: "intercity", label: "Intercity transfer" },
  { id: "day-hire", label: "Private driver by the day" },
  { id: "multi-stop", label: "Multi-stop journey" },
] as const;
export type PrivateDriverServiceId = typeof privateDriverServices[number]["id"];
export const privateDriverContact = {
  name: airportTransferContact.name, email: airportTransferContact.email,
  deliveryMode: "server_email" as const,
};

export const shorePorts = {
  haifa: { name: "Haifa", path: "/haifa-shore-excursions/", sourceId: "owner-haifa-shore", pageId: "shore-haifa" },
  ashdod: { name: "Ashdod", path: "/ashdod-shore-excursions/", sourceId: "owner-ashdod-shore", pageId: "shore-ashdod" },
} as const;
export type ShorePortId = keyof typeof shorePorts;

export interface ShoreExcursionRate {
  id: string;
  portId: ShorePortId;
  destination: string;
  price: IndicativePrice;
}

/** Published car-and-driver round-trip rates; never a live quote or guided-tour price. */
export const shoreExcursionRates: ShoreExcursionRate[] = ([
  ["ashdod-tel-aviv", "ashdod", "Tel Aviv & Jaffa", 1200],
  ["ashdod-jerusalem", "ashdod", "Classical Jerusalem", 1700],
  ["ashdod-masada", "ashdod", "Masada & the Dead Sea", 2200],
  ["ashdod-masada-jerusalem", "ashdod", "Masada, the Dead Sea & Jerusalem", 2400],
  ["haifa-akko", "haifa", "Akko & Rosh Hanikra", 1900],
  ["haifa-tel-aviv", "haifa", "Tel Aviv & Jaffa", 2100],
  ["haifa-galilee", "haifa", "Nazareth & the Sea of Galilee", 2300],
  ["haifa-jerusalem", "haifa", "Classical Jerusalem", 2700],
] as const).map(([id, portId, destination, amount]) => ({
  id, portId, destination,
  price: { kind: "published_starting_rate", currency: "ILS", amount, basis: "per_vehicle", maxPartySize: 4,
    conditions: "Full-day return transportation with a private driver for up to 4 passengers on weekdays. Licensed guiding, admission, meals and tips are excluded. Extra charges may apply for night, weekend or holiday trips. Final itinerary, price and availability require confirmation.",
    sourceId: shorePorts[portId].sourceId },
}));

export const shoreExcursionContact = {
  name: airportTransferContact.name, email: airportTransferContact.email,
  deliveryMode: "server_email" as const,
};

/** Port catalog records describe services, not date-specific availability. */
export const shoreServiceKinds = [
  { id: "private-driver", label: "Car & driver" },
  { id: "guided-tour", label: "Guided tours" },
  { id: "transfer", label: "Transfers" },
] as const;
export type ShoreServiceKind = typeof shoreServiceKinds[number]["id"];
export const shoreDestinations = [
  { id: "haifa", label: "Haifa" },
  { id: "caesarea", label: "Caesarea" },
  { id: "ein-gedi", label: "Ein Gedi" },
  { id: "jerusalem", label: "Jerusalem" },
  { id: "bethlehem", label: "Bethlehem" },
  { id: "tel-aviv", label: "Tel Aviv & Jaffa" },
  { id: "akko", label: "Akko (Acre)" },
  { id: "rosh-hanikra", label: "Rosh Hanikra" },
  { id: "nazareth", label: "Nazareth" },
  { id: "galilee", label: "Sea of Galilee" },
  { id: "masada", label: "Masada" },
  { id: "dead-sea", label: "Dead Sea" },
  { id: "airport", label: "Ben Gurion Airport" },
  { id: "hotels-cities", label: "Hotels & other cities" },
] as const;
export type ShoreDestinationId = typeof shoreDestinations[number]["id"];
export interface ShoreTourProduct {
  id: string;
  portIds: ShorePortId[];
  operatorId: string;
  partnerId?: string;
  destinationIds: ShoreDestinationId[];
  title: string;
  summary: string;
  publicUrl: string;
  groupFormat: "private" | "shared" | "confirm";
  seasonNote?: string;
  durationLabel?: string;
  includesLabel?: string;
  listedPrice?: {
    kind: "published_snapshot";
    amount: number;
    currency: "USD";
    basis: "per_person" | "per_group";
    maxPartySize?: number;
    checkedAt: ISODate;
    sourceId: string;
  };
}

export const shoreBookingPlatforms = ["getyourguide", "viator"] as const;
export type ShoreBookingPlatform = typeof shoreBookingPlatforms[number];

/** Verified product pages, not live inventory. One identity can appear under several ports/destinations. */
export const shoreTourProducts: ShoreTourProduct[] = [
  {
    id: "shore-tourist-haifa-jerusalem", portIds: ["haifa"], operatorId: "tourist-israel",
    destinationIds: ["jerusalem"], title: "Private Jerusalem shore excursion from Haifa",
    summary: "Walk through Jerusalem's Old City and explore modern neighborhoods and market streets with a private guide.",
    publicUrl: "https://www.touristisrael.com/tours/jerusalem-tour-from-haifa-port/", groupFormat: "private",
  },
  {
    id: "shore-tourist-haifa-tel-aviv", portIds: ["haifa"], operatorId: "tourist-israel",
    destinationIds: ["tel-aviv"], title: "Private Jaffa & Tel Aviv shore excursion from Haifa",
    summary: "Explore Old Jaffa, Neve Tzedek and Tel Aviv's city neighborhoods with private guiding and port transportation.",
    publicUrl: "https://www.touristisrael.com/tours/caesarea-jaffa-and-tel-aviv-tour-from-haifa-port-shore-excursion/", groupFormat: "private",
  },
  {
    id: "shore-tourist-haifa-jerusalem-bethlehem", portIds: ["haifa"], operatorId: "tourist-israel",
    destinationIds: ["jerusalem", "bethlehem"], title: "Private Jerusalem & Bethlehem shore excursion from Haifa",
    summary: "Combine Jerusalem's Old City landmarks with Bethlehem's Church of the Nativity on a privately guided port excursion.",
    publicUrl: "https://www.touristisrael.com/tours/jerusalem-and-bethlehem-tour-from-haifa-port-shore-excursion/", groupFormat: "private",
  },
  {
    id: "shore-tourist-ashdod-jerusalem", portIds: ["ashdod"], operatorId: "tourist-israel",
    destinationIds: ["jerusalem"], title: "Private Jerusalem shore excursion from Ashdod",
    summary: "Walk through Jerusalem's Old City and explore modern neighborhoods and market streets with a private guide.",
    publicUrl: "https://www.touristisrael.com/tours/jerusalem-tour-from-ashdod-port/", groupFormat: "private",
  },
  {
    id: "shore-tourist-ashdod-tel-aviv", portIds: ["ashdod"], operatorId: "tourist-israel",
    destinationIds: ["tel-aviv"], title: "Private Jaffa & Tel Aviv shore excursion from Ashdod",
    summary: "Explore Old Jaffa, Neve Tzedek and Tel Aviv's city neighborhoods with private guiding and port transportation.",
    publicUrl: "https://www.touristisrael.com/tours/tel-aviv-jaffa-tour-from-ashdod-port/", groupFormat: "private",
  },
  {
    id: "shore-tourist-ashdod-jerusalem-bethlehem", portIds: ["ashdod"], operatorId: "tourist-israel",
    destinationIds: ["jerusalem", "bethlehem"], title: "Private Jerusalem & Bethlehem shore excursion from Ashdod",
    summary: "Combine Jerusalem's Old City landmarks with Bethlehem's Church of the Nativity on a privately guided port excursion.",
    publicUrl: "https://www.touristisrael.com/tours/jerusalem-and-bethlehem-shore-excursion-from-ashdod-port/", groupFormat: "private",
  },
  {
    id: "shore-tourist-haifa-galilee", portIds: ["haifa"], operatorId: "tourist-israel",
    destinationIds: ["nazareth", "galilee"], title: "Private Galilee & Nazareth from Haifa",
    summary: "Visit Nazareth and selected Christian heritage sites around the Sea of Galilee with a private guide and return to Haifa Port.",
    publicUrl: "https://www.touristisrael.com/tours/galilee-tour-from-haifa-port/", groupFormat: "private",
  },
  {
    id: "shore-tourist-haifa-jerusalem-dead-sea", portIds: ["haifa"], operatorId: "tourist-israel",
    destinationIds: ["jerusalem", "dead-sea"], title: "Private Jerusalem & Dead Sea from Haifa",
    summary: "A long private excursion combining Jerusalem's Old City with a Dead Sea beach stop. Ask whether the full route fits your ship's hours.",
    publicUrl: "https://www.touristisrael.com/tours/jerusalem-and-dead-sea-tour-from-haifa-port-shore-excursion/", groupFormat: "private",
  },
  {
    id: "shore-tourist-ashdod-masada", portIds: ["ashdod"], operatorId: "tourist-israel",
    destinationIds: ["masada", "dead-sea", "ein-gedi"], title: "Private Masada, Ein Gedi & Dead Sea from Ashdod",
    summary: "A private desert itinerary featuring Masada, Ein Gedi and the Dead Sea, with pickup and return at Ashdod Port. Confirm which sites are accessible on your date.",
    publicUrl: "https://www.touristisrael.com/tours/masada-ein-gedi-and-dead-sea-tour-from-ashdod/", groupFormat: "private",
  },
  {
    id: "shore-compass-jerusalem-bethlehem", portIds: ["haifa", "ashdod"], operatorId: "compass-travel",
    destinationIds: ["jerusalem", "bethlehem"], title: "Private Jerusalem & Bethlehem",
    summary: "A privately guided itinerary through Jerusalem and Bethlehem, with a local guide for the Bethlehem section and return to your departure port.",
    publicUrl: "https://compasstravelisrael.com/tours/jerusalem-bethlehem-private-tour-from-haifa-or-ashdod-ports/", groupFormat: "private",
    seasonNote: "2027 cruise program \u00b7 confirm your sailing",
  },
  {
    id: "shore-compass-tel-aviv-caesarea", portIds: ["haifa", "ashdod"], operatorId: "compass-travel",
    destinationIds: ["tel-aviv", "caesarea"], title: "Private Tel Aviv, Old Jaffa & Caesarea",
    summary: "Combine Caesarea's coastal archaeology with Tel Aviv and Old Jaffa on a private guided day from your cruise port.",
    publicUrl: "https://compasstravelisrael.com/tours/tel-aviv-old-jaffa-caesarea-private-tour-from-haifa-ashdod-port/", groupFormat: "private",
    seasonNote: "2027 cruise program \u00b7 confirm your sailing",
  },
  {
    id: "shore-compass-ashdod-masada", portIds: ["ashdod"], operatorId: "compass-travel",
    destinationIds: ["masada", "dead-sea"], title: "Private Masada & Dead Sea from Ashdod",
    summary: "Visit Masada and plan a Dead Sea stop with a private guide and transportation back to Ashdod Port. Site entry is arranged separately.",
    publicUrl: "https://compasstravelisrael.com/tours/masada-dead-sea-private-tour-from-ashdod-port/", groupFormat: "private",
    seasonNote: "2027 cruise program \u00b7 confirm your sailing",
  },
  {
    id: "shore-compass-haifa-galilee", portIds: ["haifa"], operatorId: "compass-travel",
    destinationIds: ["nazareth", "galilee"], title: "Private Nazareth & Sea of Galilee from Haifa",
    summary: "Explore Nazareth and selected Galilee pilgrimage sites on a private guided excursion returning to Haifa Port.",
    publicUrl: "https://compasstravelisrael.com/tours/haifa-shore-nazareth-sea-of-galilee-private/", groupFormat: "private",
    seasonNote: "2027 cruise program \u00b7 confirm your sailing",
  },
  {
    id: "shore-compass-haifa-akko", portIds: ["haifa"], operatorId: "compass-travel",
    destinationIds: ["akko", "rosh-hanikra"], title: "Private Akko & Rosh Hanikra from Haifa",
    summary: "A private guided northern-coast itinerary through Haifa and Akko, with Rosh Hanikra subject to confirmed site access.",
    publicUrl: "https://compasstravelisrael.com/tours/rosh-hanikra-akko-private-tour-from-haifa-port/", groupFormat: "private",
    seasonNote: "2027 cruise program \u00b7 confirm your sailing",
  },
  {
    id: "shore-gyg-haifa-akko", portIds: ["haifa"], operatorId: "ilya-pevzner", partnerId: "getyourguide",
    destinationIds: ["akko", "rosh-hanikra", "haifa"], title: "Haifa, Acre & Rosh Hanikra for cruise passengers",
    summary: "A guided coastal outing starting and finishing at Haifa Port, with Haifa viewpoints and Akko. Confirm access to the proposed Rosh Hanikra stop.",
    publicUrl: "https://www.getyourguide.com/haifa-l2051/haifa-acre-and-rosh-anikra-for-cruises-with-licensed-guide-t482201/", groupFormat: "shared",
    durationLabel: "6 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 547, currency: "USD", basis: "per_person", checkedAt: "2026-10-21", sourceId: "shore-gyg-haifa-akko" },
  },
  {
    id: "shore-gyg-haifa-galilee", portIds: ["haifa"], operatorId: "ilya-pevzner", partnerId: "getyourguide",
    destinationIds: ["nazareth", "galilee"], title: "Christian heritage in Galilee from Haifa Port",
    summary: "A guided day visiting Nazareth and Christian sites around the Sea of Galilee. The listing includes ship pickup and drop-off; confirm the exact group arrangement.",
    publicUrl: "https://www.getyourguide.com/haifa-l2051/haifa-port-full-day-christianity-tour-to-galilee-t482329/", groupFormat: "confirm",
    durationLabel: "9 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 537, currency: "USD", basis: "per_person", checkedAt: "2026-10-21", sourceId: "shore-gyg-haifa-galilee" },
  },
  {
    id: "shore-gyg-ashdod-jerusalem-bethlehem", portIds: ["ashdod"], operatorId: "rent-a-guide", partnerId: "getyourguide",
    destinationIds: ["jerusalem", "bethlehem"], title: "Private Jerusalem & Bethlehem from Ashdod",
    summary: "Meet your guide at Ashdod's cruise terminal and combine Jerusalem's Old City with Bethlehem before returning to Ashdod Port.",
    publicUrl: "https://www.getyourguide.com/jerusalem-l97/private-shore-excursion-jerusalembethlehem-from-ashdod-port-t1219278/", groupFormat: "private",
    durationLabel: "9–11 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 1009, currency: "USD", basis: "per_group", maxPartySize: 3, checkedAt: "2026-10-21", sourceId: "shore-gyg-ashdod-jerusalem-bethlehem" },
  },
  {
    id: "shore-gyg-ashdod-galilee", portIds: ["ashdod"], operatorId: "rent-a-guide", partnerId: "getyourguide",
    destinationIds: ["nazareth", "galilee"], title: "Private Nazareth & Galilee from Ashdod",
    summary: "A long private guided journey to Nazareth, Cana and the Sea of Galilee. The detailed inclusions specify pickup and drop-off at Ashdod Port.",
    publicUrl: "https://www.getyourguide.com/nazareth-l211/private-shore-excursion-nazareth-galilee-from-ashdod-port-t1223962/", groupFormat: "private",
    durationLabel: "10 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 1294, currency: "USD", basis: "per_group", maxPartySize: 3, checkedAt: "2026-10-21", sourceId: "shore-gyg-ashdod-galilee" },
  },
  {
    id: "shore-gyg-ashdod-masada", portIds: ["ashdod"], operatorId: "bein-harim", partnerId: "getyourguide",
    destinationIds: ["masada", "dead-sea"], title: "Masada & Dead Sea guided day from Ashdod",
    summary: "Travel from Ashdod Port to Masada and a Dead Sea beach stop at Ein Bokek, with guiding and return transportation listed by the operator.",
    publicUrl: "https://www.getyourguide.com/ashdod-l2574/from-ashdod-port-masada-and-dead-sea-guided-day-trip-t427916/", groupFormat: "confirm",
    durationLabel: "9 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 130, currency: "USD", basis: "per_person", checkedAt: "2026-10-21", sourceId: "shore-gyg-ashdod-masada" },
  },
  {
    id: "shore-viator-haifa-galilee", portIds: ["haifa"], operatorId: "guided-tours-israel", partnerId: "viator",
    destinationIds: ["nazareth", "galilee"], title: "Nazareth & Galilee for cruise ship guests",
    summary: "A shared guided excursion to Nazareth and Galilee's Christian sites, with pickup and drop-off at Haifa Port. This product is for arriving cruise passengers.",
    publicUrl: "https://www.viator.com/tours/Tiberias/Haifa-Shore-Excursion-Nazareth-and-Galilee-Day-Trip/d24329-7414HBG", groupFormat: "shared",
    durationLabel: "9 hours", includesLabel: "Guide & return transport",
  },
  {
    id: "shore-viator-ashdod-jerusalem-dead-sea", portIds: ["ashdod"], operatorId: "guided-tours-israel", partnerId: "viator",
    destinationIds: ["jerusalem", "dead-sea"], title: "Jerusalem & Dead Sea for cruise ship guests",
    summary: "A shared guided day combining Jerusalem's Old City with a Dead Sea visit, with pickup and return at Ashdod Port for cruise passengers.",
    publicUrl: "https://www.viator.com/tours/Ashdod/Ashdod-Shore-Excursion-Jerusalem-and-Dead-Sea-Day-Trip/d4470-7414AJD", groupFormat: "shared",
    durationLabel: "8–10 hours", includesLabel: "Guide & return transport",
  },
  {
    id: "shore-viator-haifa-jerusalem-bethlehem", portIds: ["haifa"], operatorId: "bein-harim", partnerId: "viator",
    destinationIds: ["jerusalem", "bethlehem"], title: "Private Jerusalem & Bethlehem from Haifa",
    summary: "Visit Jerusalem's Old City and Bethlehem with a private guide, including pickup and return at Haifa Port.",
    publicUrl: "https://www.viator.com/tours/Haifa/Haifa-Shore-Excursion-Private-Jerusalem-and-Bethlehem-Day-Trip/d4472-5209PRTJRSJERBETH", groupFormat: "private",
    durationLabel: "10 hours", includesLabel: "Private guide & return transport",
  },
  {
    id: "shore-viator-ashdod-jerusalem-bethlehem", portIds: ["ashdod"], operatorId: "bein-harim", partnerId: "viator",
    destinationIds: ["jerusalem", "bethlehem"], title: "Jerusalem & Bethlehem from Ashdod",
    summary: "Walk Jerusalem's Old City and visit Bethlehem's Church of the Nativity on a guided day with pickup and return at Ashdod Port.",
    publicUrl: "https://www.viator.com/tours/Ashdod/Ashdod-Port-Shore-Excursion-Jerusalem-and-Bethlehem-Day-Tour-from-Ashdod-Port/d4470-5209P131", groupFormat: "shared",
    durationLabel: "9 hours", includesLabel: "Guide & return transport",
    listedPrice: { kind: "published_snapshot", amount: 120, currency: "USD", basis: "per_person", checkedAt: "2026-10-21", sourceId: "shore-viator-ashdod-jerusalem-bethlehem-usd" },
  },
];

export interface ShoreServiceRecord {
  id: string;
  productId: string;
  portId: ShorePortId;
  kind: ShoreServiceKind;
  destinationIds: ShoreDestinationId[];
  providerLinkId: string;
  /** Only a publisher's priced return itinerary can select the shore form. */
  itineraryId?: string;
  status: "draft" | "published";
}
const shoreItineraryDestinations: Record<string, ShoreDestinationId[]> = {
  "ashdod-tel-aviv": ["tel-aviv"], "ashdod-jerusalem": ["jerusalem"],
  "ashdod-masada": ["masada", "dead-sea"], "ashdod-masada-jerusalem": ["masada", "dead-sea", "jerusalem"],
  "haifa-akko": ["akko", "rosh-hanikra"], "haifa-tel-aviv": ["tel-aviv"],
  "haifa-galilee": ["nazareth", "galilee"], "haifa-jerusalem": ["jerusalem"],
};
export const shoreServices: ShoreServiceRecord[] = [
  ...shoreExcursionRates.map((rate): ShoreServiceRecord => ({
    id: rate.id, productId: rate.id, portId: rate.portId, kind: "private-driver", destinationIds: shoreItineraryDestinations[rate.id]!,
    providerLinkId: `${rate.portId}-shore-moshe`, itineraryId: rate.id, status: "published",
  })),
  ...shoreTourProducts.filter((product) => product.partnerId && shoreBookingPlatforms.some((id) => id === product.partnerId)).flatMap((product) => product.portIds.map((portId): ShoreServiceRecord => ({
    id: `${portId}-${product.id}`, productId: product.id, portId, kind: "guided-tour",
    destinationIds: product.destinationIds, providerLinkId: product.id, status: "published",
  }))),
];

/** Only these four airport destinations have individual transfer guides. */
export const airportTransferRoutes = [
  { id: "jerusalem", path: "/travel-blog/ben-gurion-airport-to-jerusalem/", sourceId: "owner-route-guide", driveTime: "45–60+ minutes" },
  { id: "tel-aviv", path: "/travel-blog/ben-gurion-airport-to-tel-aviv/", sourceId: "owner-airport-tel-aviv", driveTime: "20–40+ minutes" },
  { id: "haifa", path: "/travel-blog/ben-gurion-airport-to-haifa/", sourceId: "owner-airport-haifa", driveTime: "75–110+ minutes" },
  { id: "dead-sea", path: "/travel-blog/ben-gurion-airport-to-ein-bokek/", sourceId: "owner-airport-ein-bokek", driveTime: "1 hr 45 min–2 hr 30 min+" },
] as const;
export type AirportTransferRouteId = typeof airportTransferRoutes[number]["id"];

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

const deadSeaHotelSources: SourceReference[] = [
  ["kayma", "Kayma — Isrotel", "https://www.isrotel.com/isrotel-hotels/dead-sea/kayma/"],
  ["herods", "Herods Dead Sea — Leonardo Hotels", "https://www.leonardo-hotels.com/dead-sea/herods-dead-sea-hotel/facilities"],
  ["milos", "Herbert Samuel Milos Dead Sea", "https://herbertsamuel.com/en/herbert-samuel-milos-dead-sea-hotel/"],
  ["nevo", "Nevo — Isrotel", "https://www.isrotel.com/isrotel-hotels/dead-sea/isrotel-dead-sea/"],
  ["oasis", "Oasis Spa Club — Prima Hotels", "https://www.prima-hotels-israel.com/oasis-spa-club-hotel-dead-sea"],
  ["leonardo-club", "Leonardo Club Dead Sea — all-inclusive", "https://www.leonardo-hotels.com/dead-sea/leonardo-club-dead-sea/all-inclusive"],
  ["vert", "VERT Dead Sea — AFI Hotels", "https://www.afi-hotels.com/vert-dead-sea-hotel"],
  ["noga", "Noga — Isrotel", "https://www.isrotel.com/isrotel-hotels/dead-sea/isrotel-ganim/"],
  ["leonardo-plaza", "Leonardo Plaza Dead Sea — hotel FAQ", "https://www.leonardo-hotels.com/dead-sea/leonardo-plaza-dead-sea/faq"],
  ["ein-gedi", "Ein Gedi Hotel", "https://ngedi.co.il/en/"],
  ["hi-ein-gedi", "HI Ein Gedi Hostel — Israel Youth Hostels Association", "https://en.iyha.org.il/ein-gedi-hostel"],
].map(([id, name, url]): SourceReference => ({
  id: `hotel-ds-${id}-official`, title: `${name} — property information`, publisher: name!, url: url!,
  checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
  note: "Property identity, location and general facilities checked against the operator's own information. Confirm current operation, beach access, room occupancy, age limits, meal-plan inclusions and seasonal facilities for your dates; rates and inventory are not live.",
}));

const tiberiasHotelSources: SourceReference[] = [
  ["u-boutique", "U Boutique Kinneret — operator facilities", "https://www.nyx-hotels.com/tiberias/u-boutique-kinneret/facilities"],
  ["galei-kinneret", "Galei Kinneret — hotel information and guest ages", "https://www.galei-kinneret.com/info-page"],
  ["scots", "The Scots Hotel", "https://www.scotshotels.com/"],
  ["gai-beach", "Gai Beach — water park and beach", "https://www.gaibeach.com/water-park-sea-of-galilee"],
  ["leonardo-club", "Leonardo Club Tiberias — facilities and operating notices", "https://www.leonardo-hotels.com/tiberias/leonardo-club-tiberias"],
  ["caesar", "Caesar Premier Tiberias", "https://www.caesarpremier.com/caesar-tiberias-hotel"],
  ["sofia", "Sofia Hotel Tiberias", "https://sofiahotel.co.il/"],
  ["emily", "Emily's Hotel", "https://english.emilys-aviv.co.il/emilys-tiberias-hotel"],
  ["tiberia", "Tiberia Hotel — operator's public profile", "https://www.facebook.com/tiberiahotel/"],
  ["hostel", "Tiberias Hostel", "https://www.hosteltiberias.com/"],
].map(([id, name, url]): SourceReference => ({
  id: `hotel-tib-${id}-official`, title: `${name} — property information`, publisher: name!, url: url!,
  checkedAt: TIBERIAS_STAY_REVIEW_DATE,
  note: id === "tiberia"
    ? "The operator's public profile supports the property identity and small central-hotel format. No separate official website was established; confirm room facilities and arrival arrangements directly. Prices and inventory are not live."
    : "Identity, location and relevant facilities or policies checked against primary operator information. Reconfirm operation, guest and facility age limits, seasonal pools, beach arrangements and the exact meal plan for your dates. No live rates or availability are supplied.",
}));

const haifaHotelSources: SourceReference[] = [
  ["botanica", "Hotel Botanica — Leonardo Hotels", "https://www.leonardo-hotels.com/haifa/hotel-botanica-haifa"],
  ["dan-carmel", "Dan Carmel Haifa — Dan Hotels", "https://www.danhotels.com/HaifaHotels/DanCarmelHaifaHotel"],
  ["schumacher", "The Schumacher Hotel", "https://www.theschumacher.co.il/"],
  ["colony", "The Colony Hotel Haifa", "https://colonyhaifa.com/"],
  ["crowne-plaza", "Crowne Plaza Haifa — IHG", "https://www.ihg.com/crowneplaza/hotels/gb/en/haifa/hfayn/hoteldetail"],
  ["leonardo-plaza", "Leonardo Plaza Haifa — operator facilities", "https://www.leonardo-hotels.com/haifa/leonardo-plaza-haifa/facilities"],
  ["golden-crown", "Golden Crown Haifa", "https://www.goldencrown-hotels.com/hotel/golden-crown-haifa"],
  ["nof", "Nof Hotel Haifa — Nara Hotels", "https://www.nara-hotels.com/nof"],
  ["port-inn", "Port Inn Haifa — operator's public profile", "https://www.facebook.com/Port.Inn.Haifa/"],
  ["loui-talpiot", "Loui Talpiot Hotel", "https://talpiotguesthouse.com/en/loui-talpiot-hotel/"],
].map(([id, name, url]): SourceReference => ({
  id: `hotel-haifa-${id}-official`, title: `${name} — property information`, publisher: name!, url: url!,
  checkedAt: HAIFA_STAY_REVIEW_DATE,
  note: id === "port-inn"
    ? "The indexed operator public profile supports the name and downtown address only; a full current facilities page could not be retrieved. Confirm room type, bathroom, meals and arrival arrangements directly. No detailed amenities or live inventory are asserted."
    : "Property identity, location and relevant facilities or policies checked against primary operator information. Confirm current operation, room occupancy, age restrictions, seasonal pools, meals and parking for your dates. Rates and inventory are not live.",
}));

/** Ordinary tours use one product identity across all destination/topic pages.
 * Port pickup and return products remain in the dedicated shore catalog.
 */
export const TOUR_CATALOG_CHECK_DATE: ISODate = "2026-10-22";

/** Published owner rates are transport-only weekday starting prices, not date-specific quotes. */
function ownerDayTripRate(amount: number, sourceId: string): IndicativePrice & { basis: "per_vehicle" } {
  return { kind: "published_starting_rate", currency: "ILS", amount, basis: "per_vehicle", maxPartySize: 4,
    conditions: "Weekdays, up to four passengers, private transport only. Guiding, admissions, parking, tolls, meals and tips extra. Confirm the full price and any weekend, holiday or extra-hour charges before booking.", sourceId };
}
const ownerDayTripSources: SourceReference[] = [
  { id: "owner-masada-tel-aviv", title: "Masada & Dead Sea private day from Tel Aviv", path: "dead-sea-masada-day-trip-from-tel-aviv" },
  { id: "owner-masada-jerusalem", title: "Masada & Dead Sea private day from Jerusalem", path: "dead-sea-masada-day-trip-from-jerusalem" },
  { id: "owner-north-coast-tel-aviv", title: "Caesarea, Haifa & Acre private day from Tel Aviv", path: "caesarea-haifa-akko-day-trip-from-tel-aviv" },
  { id: "owner-north-coast-jerusalem", title: "Caesarea, Haifa & Acre private day from Jerusalem", path: "caesarea-haifa-akko-day-trip-from-jerusalem" },
  { id: "owner-galilee-tel-aviv", title: "Nazareth & Sea of Galilee private day from Tel Aviv", path: "nazareth-sea-of-galilee-day-trip-from-tel-aviv" },
  { id: "owner-galilee-jerusalem", title: "Nazareth & Sea of Galilee private day from Jerusalem", path: "nazareth-sea-of-galilee-day-trip-from-jerusalem" },
].map(({ id, title, path }) => ({ id, title, publisher: "Israel-Taxi.com (Moshe Barak)", url: `${OWNER_BASE}/private-day-trips/${path}/`, checkedAt: TOUR_CATALOG_CHECK_DATE,
  note: "Owner's original itinerary page checked for the explicit ILS price block, duration, pickup and return city, weekday basis and up-to-four-passenger limit. The legacy notes still contain an outdated USD sentence; the explicit ILS price block is used. Transportation only; guiding, admissions, parking, tolls, meals and tips excluded. Availability and the full price require confirmation." }));
export const tourProducts: TourProduct[] = [
  { id: "my-jerusalem-day", status: "published", operatorId: "moshe-barak", originIds: ["tel-aviv", "jerusalem"], destinationIds: ["jerusalem"], tagIds: ["heritage", "christian"], title: "Jerusalem at your own pace", summary: "Build a private day around Jerusalem's Old City, viewpoints and the places that matter to your party. I arrange the driving around your agreed stops.", duration: "Full day · agreed individually", length: "full-day", format: "private", formatLabel: "Private car & driver", pickup: "Hotel pickup and final drop-off agreed in advance", inclusions: "Private transportation; licensed guiding quoted separately" },
  {
    id: "my-masada-day", status: "published", operatorId: "moshe-barak",
    originIds: ["tel-aviv"], destinationIds: ["masada", "dead-sea"], tagIds: ["heritage", "nature"],
    title: "Masada & Dead Sea private day from Tel Aviv",
    summary: "Leave the coast for Masada's dramatic desert setting and a relaxing Dead Sea beach stop. I arrange your private drive around your preferred pace, with a return to Tel Aviv at the end of the day.",
    duration: "9 hours", durationMinutes: 540, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Tel Aviv", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2100, "owner-masada-tel-aviv"),
  },
  {
    id: "my-masada-jerusalem", status: "published", operatorId: "moshe-barak",
    originIds: ["jerusalem"], destinationIds: ["masada", "dead-sea"], tagIds: ["heritage", "nature"],
    title: "Masada & Dead Sea private day from Jerusalem",
    summary: "Head down from Jerusalem into the Judean Desert for Masada and time beside the Dead Sea. I help you balance the fortress visit and beach stop, then arrange the drive back to your accommodation.",
    duration: "8 hours", durationMinutes: 480, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Jerusalem", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2100, "owner-masada-jerusalem"),
  },
  {
    id: "my-north-coast-day", status: "published", operatorId: "moshe-barak",
    originIds: ["tel-aviv"], destinationIds: ["caesarea", "haifa", "akko"], tagIds: ["heritage", "nature"],
    title: "Caesarea, Haifa & Acre private day from Tel Aviv",
    summary: "Follow the Mediterranean north to Caesarea's Roman remains, Haifa's viewpoints and Acre's historic lanes. I plan the driving around your chosen stops, with pickup and return in Tel Aviv.",
    duration: "9 hours", durationMinutes: 540, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Tel Aviv", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2000, "owner-north-coast-tel-aviv"),
  },
  {
    id: "my-north-coast-jerusalem", status: "published", operatorId: "moshe-barak",
    originIds: ["jerusalem"], destinationIds: ["caesarea", "haifa", "akko"], tagIds: ["heritage", "nature"],
    title: "Caesarea, Haifa & Acre private day from Jerusalem",
    summary: "Trade Jerusalem's hills for a day of coastal ruins, sea views and Acre's Old City. I shape a realistic route through Caesarea and Haifa, allowing for the longer drive and your return to Jerusalem.",
    duration: "10 hours", durationMinutes: 600, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Jerusalem", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2700, "owner-north-coast-jerusalem"),
  },
  {
    id: "my-galilee-day", status: "published", operatorId: "moshe-barak",
    originIds: ["tel-aviv"], destinationIds: ["nazareth", "galilee"], tagIds: ["christian", "nature"],
    title: "Nazareth & Sea of Galilee private day from Tel Aviv",
    summary: "Explore Nazareth's Christian heritage and the peaceful landscapes around the Sea of Galilee. I help you choose the churches and lakeside stops that matter most, with private transport back to Tel Aviv.",
    duration: "10 hours", durationMinutes: 600, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Tel Aviv", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2300, "owner-galilee-tel-aviv"),
  },
  {
    id: "my-galilee-jerusalem", status: "published", operatorId: "moshe-barak",
    originIds: ["jerusalem"], destinationIds: ["nazareth", "galilee"], tagIds: ["christian", "nature"],
    title: "Nazareth & Sea of Galilee private day from Jerusalem",
    summary: "Journey north from Jerusalem to Nazareth and selected sites around the Sea of Galilee. I plan a focused day around your interests, from ancient Capernaum to lakeside churches, before returning you to Jerusalem.",
    duration: "10 hours", durationMinutes: 600, length: "full-day", format: "private", formatLabel: "Private car & driver",
    pickup: "Accommodation pickup and return in Jerusalem", inclusions: "Private vehicle and dedicated driver; guiding and admissions extra",
    price: ownerDayTripRate(2900, "owner-galilee-jerusalem"),
  },
  { id: "jerusalem-day-tel-aviv", status: "published", operatorId: "bein-harim", originIds: ["tel-aviv"], destinationIds: ["jerusalem"], tagIds: ["heritage", "christian"], title: "Jerusalem full-day tour from Tel Aviv", summary: "Travel to Jerusalem for Old City landmarks and panoramic views, combining coach transport with guided walking.", duration: "About 10 hours", durationMinutes: 600, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Selected central Tel Aviv hotels; confirm your meeting hotel", inclusions: "Guide and air-conditioned transportation", note: "The itinerary varies by operating day; check the exact stops and admissions." },
  { id: "jerusalem-bethlehem-private", status: "published", operatorId: "bein-harim", originIds: ["jerusalem"], destinationIds: ["jerusalem", "bethlehem"], tagIds: ["heritage", "christian"], title: "Private Jerusalem & Bethlehem tour", summary: "Explore the Old City and Bethlehem's Nativity Church with private guiding, including a local guide change in Bethlehem.", duration: "About 10 hours", durationMinutes: 600, length: "full-day", format: "private", formatLabel: "Private guided tour", pickup: "Jerusalem address pickup; confirm the address with the operator", inclusions: "Private guiding and arranged transportation", note: "Confirm documents, crossing arrangements and the current church itinerary." },
  { id: "jaffa-carmel-walk", status: "published", operatorId: "tourist-israel", originIds: ["tel-aviv"], destinationIds: ["tel-aviv"], tagIds: ["heritage", "food", "art"], title: "Jaffa, Tel Aviv & Carmel Market walking tour", summary: "Walk from Old Jaffa through city neighborhoods and finish with local flavours at Carmel Market.", duration: "About 6 hours", durationMinutes: 360, length: "full-day", format: "shared", formatLabel: "Guided walking & tasting tour", pickup: "Meet at The Setai in Jaffa; walking tour", inclusions: "Guide and Carmel Market tastings" },
  { id: "tel-aviv-street-art", status: "published", operatorId: "be-tel-aviv", originIds: ["tel-aviv"], destinationIds: ["tel-aviv"], tagIds: ["art"], title: "Tel Aviv street art & graffiti walk", summary: "Discover Florentin's murals and street art with a guide who explains the stories behind the walls.", duration: "About 2 hours", durationMinutes: 120, length: "short", format: "shared", formatLabel: "Guided walking tour", pickup: "Tel Aviv meeting point; confirm the exact location", inclusions: "Local guide; walking between neighborhood stops" },
  { id: "masada-dead-sea-tel-aviv", status: "published", operatorId: "bein-harim", originIds: ["tel-aviv"], destinationIds: ["masada", "dead-sea"], tagIds: ["heritage", "nature"], title: "Masada & Dead Sea day trip from Tel Aviv", summary: "Combine the ancient mountaintop fortress with a designated Dead Sea beach stop on a guided day out.", duration: "About 10 hours", durationMinutes: 600, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Selected Tel Aviv pickup hotels; confirm your location", inclusions: "Guiding and transportation; check cable car and beach inclusions" },
  { id: "masada-ein-gedi-dead-sea", status: "published", operatorId: "abraham-tlalim", originIds: ["tel-aviv"], destinationIds: ["masada", "ein-gedi", "dead-sea"], tagIds: ["heritage", "nature"], title: "Masada, Ein Gedi & the Dead Sea", summary: "A longer desert day combining Masada, an Ein Gedi stop and time beside the Dead Sea.", duration: "About 12 hours", durationMinutes: 720, length: "full-day", format: "independent", formatLabel: "Shared transport & host", pickup: "Meet at Abraham Tel Aviv", inclusions: "Transport and English-speaking host; site visits at your own pace", note: "Admissions and cable car may cost extra. Confirm the open Ein Gedi route and guiding inclusions." },
  { id: "jerusalem-bethlehem-shared", status: "published", operatorId: "bein-harim", originIds: ["tel-aviv"], destinationIds: ["jerusalem", "bethlehem"], tagIds: ["heritage", "christian"], title: "Jerusalem & Bethlehem day trip from Tel Aviv", summary: "Discover major Old City landmarks and continue to Bethlehem's Christian heritage sites in one full day.", duration: "About 10 hours", durationMinutes: 600, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Tel Aviv pickup; choose the offered meeting location", inclusions: "Guided visits and transportation; check the selected option", note: "Bring the documents required by the operator for your travel date." },
  { id: "bethlehem-jericho-jordan", status: "published", operatorId: "elijah-tours", originIds: ["jerusalem"], destinationIds: ["bethlehem", "jericho", "jordan-river"], tagIds: ["christian", "heritage"], title: "Bethlehem, Jericho & Jordan River from Jerusalem", summary: "Combine Bethlehem and Jericho with the lower Jordan River area on a shared guided itinerary.", duration: "About 8–11 hours", durationMinutes: 480, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Jerusalem meeting point; confirm before departure", inclusions: "Guided itinerary and transportation; confirm site admissions", note: "Confirm passport requirements, the river stop and any itinerary changes." },
  { id: "nazareth-galilee-tel-aviv", status: "published", operatorId: "bein-harim", originIds: ["tel-aviv"], destinationIds: ["nazareth", "galilee", "jordan-river"], tagIds: ["christian", "nature"], title: "Nazareth & Sea of Galilee from Tel Aviv", summary: "Explore Nazareth and selected Christian sites around the Sea of Galilee, with guided visits along the route.", duration: "About 10 hours", durationMinutes: 600, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Tel Aviv pickup; confirm the offered location", inclusions: "Guiding and transportation; check the day's church stops" },
  { id: "galilee-nazareth-jordan", status: "published", operatorId: "tourist-israel", originIds: ["tel-aviv", "jerusalem"], destinationIds: ["nazareth", "galilee", "jordan-river"], tagIds: ["christian", "nature"], title: "Galilee, Nazareth & Jordan River", summary: "Visit Nazareth and Galilee highlights with departure options from Tel Aviv or Jerusalem.", duration: "About 12 hours", durationMinutes: 720, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Choose the Tel Aviv or Jerusalem departure option", inclusions: "Guided itinerary and transportation; verify the selected departure", note: "The river stop may change. Any baptism ceremony needs separate arrangements." },
  { id: "caesarea-haifa-akko", status: "published", operatorId: "bein-harim", originIds: ["tel-aviv"], destinationIds: ["caesarea", "haifa", "akko"], tagIds: ["heritage", "nature"], title: "Caesarea, Haifa & Akko from Tel Aviv", summary: "Discover Roman coastal heritage, Haifa's garden views and the streets of historic Akko in a full day.", duration: "About 11 hours", durationMinutes: 660, length: "full-day", format: "shared", formatLabel: "Shared guided day trip", pickup: "Selected Tel Aviv pickup locations", inclusions: "Guide and transportation; check entrance inclusions", note: "Some versions mention Rosh Hanikra; confirm the actual operating route before booking." },
  { id: "north-coast-small-group", status: "published", operatorId: "hallelujah-tours", originIds: ["tel-aviv"], destinationIds: ["caesarea", "haifa", "akko"], tagIds: ["heritage", "nature"], title: "Caesarea, Haifa & Acre in a small group", summary: "A smaller guided group visits the northern coast's Roman remains, garden views and Old City landmarks.", duration: "About 8–10 hours", durationMinutes: 480, length: "full-day", format: "shared", formatLabel: "Small group · up to 10", pickup: "Tel Aviv hotel or address, subject to operator approval", inclusions: "Licensed guide and vehicle; entry fees and meals extra", note: "A minimum participation requirement applies; confirm the departure." },
  { id: "mahane-yehuda-tasting", status: "published", operatorId: "abraham-tlalim", originIds: ["jerusalem"], destinationIds: ["jerusalem"], tagIds: ["food"], title: "Mahane Yehuda Market tasting tour", summary: "Discover Jerusalem's food market through a guided tasting walk and samples from a selection of market stalls.", duration: "About 3 hours", durationMinutes: 180, length: "short", format: "shared", formatLabel: "Guided walking & tasting tour", pickup: "Jerusalem meeting point — ask the operator for written confirmation", inclusions: "Guide and tastings from five market vendors", note: "The listing's map and meeting description differ. Confirm the Jerusalem address and dietary requirements." },
  { id: "eilat-glass-bottom-boat", status: "published", operatorId: "booking-tours", originIds: ["eilat"], destinationIds: ["eilat"], tagIds: ["water", "nature"], title: "Eilat glass-bottom boat cruise", summary: "Enjoy the Gulf of Eilat from a boat with underwater viewing, shaded seating and a sun deck.", duration: "About 2 hours", durationMinutes: 120, length: "short", format: "shared", formatLabel: "Shared boat cruise", pickup: "Hananya Beach; look for the Jules Verne boat", inclusions: "Two-hour cruise; food and drinks extra" },
  { id: "eilat-snorkeling", status: "published", operatorId: "ahla-diving", originIds: ["eilat"], destinationIds: ["eilat"], tagIds: ["water", "nature"], title: "Eilat coral reef snorkeling with an instructor", summary: "Explore Eilat's underwater scenery on a guided snorkeling outing with a local dive centre.", duration: "About 1½ hours total", durationMinutes: 90, length: "short", format: "shared", formatLabel: "Small-group snorkeling", pickup: "Dive-centre meeting point in Eilat; confirm with the operator", inclusions: "Guided snorkeling; confirm equipment in the selected option", note: "The advertised underwater session is shorter than the total activity. Confirm swimming and participation requirements." },
];

/** Separate offer identities allow another booking channel without duplicating a tour. */
export const tourBookingOffers: TourBookingOffer[] = ([
  ["jerusalem-day-tel-aviv", "viator", "https://www.viator.com/tours/Tel-Aviv/Old-and-New-Jerusalem-Day-Trip-from-Tel-Aviv/d920-5209TEL211"],
  ["jerusalem-bethlehem-private", "getyourguide", "https://www.getyourguide.com/jerusalem-l97/jerusalem-and-bethlehem-private-tour-t411126/"],
  ["jaffa-carmel-walk", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/tel-aviv-urban-tour-architecture-food-street-art-t203290/"],
  ["tel-aviv-street-art", "viator", "https://www.viator.com/tours/Tel-Aviv/Tel-Aviv-Street-Art-and-Graffiti-Tour/d920-58980P2"],
  ["masada-dead-sea-tel-aviv", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/masada-the-dead-sea-full-day-tour-from-tel-aviv-t21580/"],
  ["masada-ein-gedi-dead-sea", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/masada-ein-gedi-and-dead-sea-day-trip-from-tel-aviv-t195356/"],
  ["jerusalem-bethlehem-shared", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/jerusalem-and-bethlehem-full-day-trip-from-tel-aviv-t22202/"],
  ["bethlehem-jericho-jordan", "viator", "https://www.viator.com/tours/Jerusalem/Bethlehem-and-Jericho-Full-Day-Tour-from-Jerusalem-and-Tel-Aviv/d921-115730P10"],
  ["nazareth-galilee-tel-aviv", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/jerusalem-nazareth-tiberias-and-sea-of-galilee-tour-t21581/"],
  ["galilee-nazareth-jordan", "viator", "https://www.viator.com/tours/Tel-Aviv/Highlights-Around-the-Sea-of-Galilee-Tour/d920-26254P72"],
  ["caesarea-haifa-akko", "getyourguide", "https://www.getyourguide.com/tel-aviv-l487/israel-s-mediterranean-coast-full-day-tour-from-tel-aviv-t22120/"],
  ["north-coast-small-group", "viator", "https://www.viator.com/tours/Tel-Aviv/Caesarea-Haifa-and-Acre-Tiny-group-from-Tel-aviv/d920-58143P8"],
  ["mahane-yehuda-tasting", "viator", "https://www.viator.com/tours/Jerusalem/Mahane-Yehuda-Market-Tasting-Tour/d921-6540P10"],
  ["eilat-glass-bottom-boat", "getyourguide", "https://www.getyourguide.com/eilat-l2663/eilat-2-hour-glass-bottom-boat-tour-t373525/"],
  ["eilat-snorkeling", "viator", "https://www.viator.com/tours/Eilat/Snorkeling-on-Coral-Reef-in-Eilat/d23242-70978P8"],
] as const).map(([productId, partnerId, publicUrl]): TourBookingOffer => {
  const id = `tour-${productId}-${partnerId}`;
  // Only prices explicitly observed in USD on the named product's listing are stored.
  const amount = productId === "north-coast-small-group" ? 279 : productId === "eilat-glass-bottom-boat" ? 24 : undefined;
  return { id, productId, partnerId, publicUrl, checkedAt: TOUR_CATALOG_CHECK_DATE,
    ...(amount ? { listedPrice: { kind: "published_snapshot", amount, currency: "USD", basis: "per_person", checkedAt: TOUR_CATALOG_CHECK_DATE, sourceId: id } } : {}) };
});

export const sources: SourceReference[] = [
  ...neighborhoodHotelSources,
  ...ownerDayTripSources,
  ...tourBookingOffers.map((offer): SourceReference => ({ id: offer.id, title: tourProducts.find((tour) => tour.id === offer.productId)!.title, publisher: offer.partnerId === "viator" ? "Viator" : "GetYourGuide", url: offer.publicUrl, checkedAt: offer.checkedAt, note: "Product identity, operator, advertised itinerary and duration reviewed. No date-specific availability is confirmed. Starting prices, when present, are short-lived editorial snapshots, not live quotes. Confirm pickup, inclusions, access and cancellation with the booking provider." })),
  { id: "shore-haifa-terminal", title: "Haifa Port cruise terminal", publisher: "Haifa Port", url: "https://www.haifaport.co.il/en/terminal/", checkedAt: null, note: "Official passenger-terminal information and downtown access. Consult the port, cruise line and operator for the arrangements applying to your ship; no current sailing schedule or dockside vehicle access is asserted." },
  { id: "shore-ashdod-terminal", title: "Ashdod Port passenger cruises", publisher: "Ashdod Port Company", url: "https://www.ashdodport.co.il/english/aboutashdodport/pages/passengers-cruises.aspx", checkedAt: null, note: "Official passenger-terminal information. Confirm the terminal, meeting point and any shuttle arrangements for the actual port call; no current cruise schedule or general access permission is asserted." },
  { id: "shore-viator-ashdod-jerusalem-bethlehem-usd", title: "Ashdod Jerusalem & Bethlehem — USD starting-price option", publisher: "Viator", url: "https://www.viator.com/es-CL/tours/Ashdod/Ashdod-Port-Shore-Excursion-Jerusalem-and-Bethlehem-Day-Tour-from-Ashdod-Port/d4470-5209P131", checkedAt: SHORE_EXCURSION_CHECK_DATE, note: "The official Spanish-language listing for the same 5209P131 product shows an English-tour option from US$120 per person. An indicative checked starting price only; dates, travelers, options and final checkout currency change the total." },
  ...shoreTourProducts.map((product): SourceReference => ({
    id: product.id, title: product.title, publisher: product.partnerId === "getyourguide" ? "GetYourGuide product listing" : product.partnerId === "viator" ? "Viator product listing" : product.operatorId === "tourist-israel" ? "Tourist Israel" : "Compass Travel Israel",
    url: product.publicUrl, checkedAt: SHORE_EXCURSION_CHECK_DATE,
    note: `Product identity, named operator, itinerary and pickup/return at ${product.portIds.map((id) => shorePorts[id].name).join(" / ")} Port checked. ${product.seasonNote ? "The operator currently advertises a 2027 cruise program. " : ""}${product.operatorId === "rent-a-guide" ? "The title mentions both ports, but the detailed return/inclusions specify Ashdod; listed here only for Ashdod. " : ""}${product.listedPrice ? "The displayed USD starting price and per-person/per-group basis were checked as an indicative snapshot, not a quote for selected dates. " : ""}No sailing-date availability, live price, port-access permission or return guarantee is verified by this portal. Confirm all arrangements before booking.`,
  })),
  { id: "moshe-author-profile", title: "Moshe Barak biography", publisher: "Moshe Barak", url: `${OWNER_BASE}/about-me/`, checkedAt: "2026-10-18", note: "Publisher biography supports over 20 years in private transport, local route knowledge and tailored journeys for international visitors. Tripadvisor is linked to the owner-supplied profile only; no live score, count or review text is reproduced." },
  referenceFxSource,
  ...travelGuideSources,
  ...migrationSources,
  ...airportTransferRoutes.filter((route) => route.id !== "jerusalem").map((route): SourceReference => ({
    id: route.sourceId, title: `Ben Gurion Airport to ${route.id === "dead-sea" ? "Ein Bokek" : route.id === "tel-aviv" ? "Tel Aviv" : "Haifa"} — original guide`,
    publisher: "Israel-Taxi.com (Moshe Barak)", url: `${OWNER_BASE}${route.path}`, checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Moshe Barak's original route guide provides local planning context and approximate driving time. Road time starts after pickup and excludes airport formalities. It is a planning estimate; current traffic, the exact address and road conditions can change the journey.",
  })),
  ...jerusalemHotelSources,
  ...telAvivHotelSources,
  ...deadSeaHotelSources,
  ...tiberiasHotelSources,
  ...haifaHotelSources,
  {
    id: "owner-hotels-haifa", title: "Best hotels in Haifa (original guide)", publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/best-hotels-in-haifa/`, checkedAt: HAIFA_STAY_REVIEW_DATE,
    note: "Editorial basis for the ten-property hub, boutique and family guides. Existing publisher-owned Expedia links and selected photographs are reused. Primary operator sources supplement the original guide; old ratings, fixed price ranges and unconfirmed amenities are not repeated.",
  },
  {
    id: "haifa-botanica-facilities", title: "Botanica — rooftop plunge pool and facilities", publisher: "Leonardo Hotels",
    url: "https://www.leonardo-hotels.com/haifa/hotel-botanica-haifa/facilities", checkedAt: HAIFA_STAY_REVIEW_DATE,
    note: "The operator describes a rooftop plunge pool, rather than a full-size swimming pool. Confirm the seasonal calendar and spa inclusions separately from the room offer.",
  },
  {
    id: "haifa-dan-carmel-rooms", title: "Dan Carmel — room layouts and occupancy", publisher: "Dan Hotels",
    url: "https://www.danhotels.com/HaifaHotels/DanCarmelHaifaHotel/Rooms", checkedAt: HAIFA_STAY_REVIEW_DATE,
    note: "Room occupancy varies by category; some rooms accept two adults and two children, while certain executive rooms and lounge access have different restrictions. Confirm the exact room, beds and ages in your offer.",
  },
  {
    id: "owner-hotels-deadsea", title: "Best Dead Sea Hotels (original guide)", publisher: "Israel-Taxi.com",
    url: `${OWNER_BASE}/travel-blog/best-dead-sea-hotels/`, checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
    note: "Editorial basis for the destination guide, spa and family comparisons. Existing publisher-owned Expedia links and photographs are reused. Hotel policies were checked against primary operator sources; no firsthand stays at every property or live prices are claimed.",
  },
  {
    id: "ds-nevo-spa", title: "Esprit Spa — Nevo", publisher: "Isrotel",
    url: "https://www.isrotel.com/eventsmain/hangouts/attraction/dead-sea/isrotel-dead-sea-attractions/esprit-dead-sea-spa/", checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
    note: "Operator's spa description. Check which facilities your room rate includes and book treatments separately unless explicitly included.",
  },
  {
    id: "ds-noga-spa", title: "Esprit Spa — Noga: facilities and minimum age", publisher: "Isrotel",
    url: "https://www.isrotel.com/eventsmain/hangouts/attraction/dead-sea/isrotel-ganim-attractions/esprit-spa/", checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
    note: "The operator states spa entry is for guests aged 16 and over, with treatments charged separately. This restriction applies to the spa rather than the whole hotel.",
  },
  {
    id: "ds-herods-spa", title: "Vitalis Spa — Herods Dead Sea", publisher: "Leonardo Hotels",
    url: "https://www.leonardo-hotels.com/dead-sea/herods-dead-sea-hotel/spa", checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
    note: "Primary spa information; reconfirm access, treatment charges and age restrictions for the facilities you intend to use.",
  },
  {
    id: "ds-ein-gedi-spa", title: "Synergy Spa — Ein Gedi Hotel", publisher: "Ein Gedi Hotel",
    url: "https://ngedi.co.il/en/synergy-spa/", checkedAt: DEAD_SEA_STAY_REVIEW_DATE,
    note: "The inland hotel's spa includes a Dead Sea water pool. A mineral-water pool is different from access to an operating beach on the shore.",
  },
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
    checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Publisher's starting fares for eleven Ben Gurion airport destinations, for up to 4 passengers on weekdays. Extra charges may apply for night, weekend or holiday trips; advance contact recommended; final price and availability by quote. Not live inventory.",
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
    id: "kiwitaxi-airport", title: "Ben Gurion Airport transfers", publisher: "Kiwitaxi",
    url: "https://kiwitaxi.com/en/israel/ben-gurion-airport", checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Official airport transfer page. Travelers enter their destination and dates; no live quote or booking was checked.",
  },
  {
    id: "welcome-telaviv", title: "Tel Aviv airport pickups", publisher: "Welcome Pickups",
    url: "https://www.welcomepickups.com/tel-aviv/", checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Official destination and airport pickup page. Enter the exact destination, flight and guests on the booking site; availability not checked.",
  },
  {
    id: "gettransfer-telaviv", title: "Tel Aviv transfers", publisher: "GetTransfer.com",
    url: "https://gettransfer.com/en/directions/israel/tel-aviv", checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Official local transfer page. Travelers re-enter their route and trip details; no price or inventory is supplied here.",
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
    checkedAt: AIRPORT_TRANSFER_CHECK_DATE,
    note: "Moshe Barak's original Jerusalem guide gives local planning context and an approximate 45–60+ minute drive after pickup. Airport formalities are additional; the final Jerusalem address and road traffic can extend the journey. The estimate is not a live traffic forecast.",
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
    checkedAt: TIBERIAS_STAY_REVIEW_DATE,
    note: "Editorial basis for the ten-property destination guide and focused family and luxury comparisons. Publisher-owned Expedia links and selected photographs are reused. Primary hotel sources supplement the guide, including current meal-plan notices and guest ages; no firsthand stays at every hotel or live room offers are claimed.",
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
    checkedAt: SHORE_EXCURSION_CHECK_DATE,
    note: "Publisher's four Ashdod return car-and-driver itineraries and ILS starting rates checked: Tel Aviv/Jaffa 1,200; Jerusalem 1,700; Masada/Dead Sea 2,200; Masada/Dead Sea/Jerusalem 2,400. Up to four passengers. The fare cards and payment note specify ILS; a conflicting USD FAQ and approximate conversions are not used. These are published starting figures, not live quotes. Guiding and admissions are excluded; final terms require confirmation.",
  },
  {
    id: "owner-haifa-shore",
    title: "Haifa shore excursions",
    publisher: "Israel-Taxi.com (Moshe Barak)",
    url: `${OWNER_BASE}/haifa-shore-excursions/`,
    checkedAt: SHORE_EXCURSION_CHECK_DATE,
    note: "Publisher's four Haifa return car-and-driver itineraries and ILS starting rates checked: Akko/Rosh Hanikra 1,900; Tel Aviv/Jaffa 2,100; Nazareth/Galilee 2,300; Jerusalem 2,700. Up to four passengers. The fare cards and payment note specify ILS; a conflicting USD FAQ and approximate conversions are not used. These are published starting figures, not live quotes. Site operation, guiding, admissions and final terms must be confirmed.",
  },
  {
    id: "beinharim-ashdod-jlm-bethlehem",
    title: "Jerusalem and Bethlehem day tour from Ashdod Port",
    publisher: "Bein Harim Tours",
    url: "https://www.beinharimtours.com/jerusalem-and-bethlehem-day-tour-from-ashdod-port/",
    checkedAt: SHORE_EXCURSION_CHECK_DATE,
    note: "Operator product page reopened 21 October 2026: guided Jerusalem and Bethlehem itinerary with pickup and return at Ashdod Port. No date-specific availability, current price or return guarantee is verified by this portal.",
  },
  {
    id: "beinharim-haifa-jlm-bethlehem",
    title: "Ship-to-shore excursion: Haifa to Jerusalem and Bethlehem",
    publisher: "Bein Harim Tours",
    url: "https://www.beinharimtours.com/ship-to-shore-excursions-haifa-jerusalem-bethlehem/",
    checkedAt: SHORE_EXCURSION_CHECK_DATE,
    note: "Operator product page reopened 21 October 2026: private guided Jerusalem and Bethlehem itinerary with pickup and return at Haifa Port. No date-specific availability, current price or return guarantee is verified by this portal.",
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
    checkedAt: PRIVATE_DRIVER_CHECK_DATE,
    note: "Publisher's private-driver service and contact form checked on 17 October 2026. The original page prices each itinerary by vehicle, distance, travel date/time and special requests. No fixed fare, vehicle inventory or availability has been independently confirmed.",
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
  ...([["be-tel-aviv", "Be Tel Aviv tours"], ["abraham-tlalim", "Abraham Tlalim Tours LTD"], ["elijah-tours", "Elijah Tours & Travel"], ["hallelujah-tours", "Hallelujah Tours"], ["booking-tours", "booking-tours.com"], ["ahla-diving", "Ahla Diving Center"]] as const).map(([id, name]): Operator => ({ id, name, kind: "tour_operator" })),
  {
    id: "moshe-barak",
    name: "Moshe Barak",
    kind: "local_operator",
    disclosure: "Operated by the publisher's local transport business.",
  },
  { id: "bein-harim", name: "Bein Harim Tours", kind: "tour_operator" },
  { id: "tourist-israel", name: "Tourist Israel", kind: "tour_operator" },
  { id: "compass-travel", name: "Compass Travel Israel", kind: "tour_operator" },
  { id: "ilya-pevzner", name: "Ilya Pevzner Guide Israel", kind: "tour_operator" },
  { id: "rent-a-guide", name: "Rent-a-Guide", kind: "tour_operator" },
  { id: "guided-tours-israel", name: "Guided Tours Israel", kind: "tour_operator" },
  { id: "inpa", name: "Israel Nature and Parks Authority", kind: "official_site" },
];

/** Existing publisher-owned tracking links copied exactly from the supplied destination guides. */
export const affiliateConfig: Record<string, { trackingUrl: string } | undefined> = {
  // Configure an approved product-specific affiliate URL once; all category appearances use it.
  ...Object.fromEntries(tourBookingOffers.map((offer) => [offer.id, undefined])),
  "shore-viator-haifa-jerusalem-bethlehem": undefined,
  "shore-viator-ashdod-jerusalem-bethlehem": undefined,
  // Shore products: replace each undefined value with { trackingUrl: "your approved product link" }.
  "shore-tourist-haifa-jerusalem": undefined,
  "shore-tourist-haifa-tel-aviv": undefined,
  "shore-tourist-haifa-jerusalem-bethlehem": undefined,
  "shore-tourist-ashdod-jerusalem": undefined,
  "shore-tourist-ashdod-tel-aviv": undefined,
  "shore-tourist-ashdod-jerusalem-bethlehem": undefined,
  "shore-tourist-haifa-galilee": undefined,
  "shore-tourist-haifa-jerusalem-dead-sea": undefined,
  "shore-tourist-ashdod-masada": undefined,
  "shore-compass-jerusalem-bethlehem": undefined,
  "shore-compass-tel-aviv-caesarea": undefined,
  "shore-compass-ashdod-masada": undefined,
  "shore-compass-haifa-galilee": undefined,
  "shore-compass-haifa-akko": undefined,
  "shore-gyg-haifa-akko": undefined,
  "shore-gyg-haifa-galilee": undefined,
  "shore-gyg-ashdod-jerusalem-bethlehem": undefined,
  "shore-gyg-ashdod-galilee": undefined,
  "shore-gyg-ashdod-masada": undefined,
  "shore-viator-haifa-galilee": undefined,
  "shore-viator-ashdod-jerusalem-dead-sea": undefined,

  "esim-airalo": { trackingUrl: "https://airalo.tpm.li/JmHFDV3v" },
  "esim-saily": { trackingUrl: "https://saily.tpm.li/nM5mNYzP" },
  "esim-yesim": { trackingUrl: "https://yesim.tpm.li/6WmqBIJV" },
  "esim-gigsky": { trackingUrl: "https://gigsky.tpm.li/NxqtNVtH" },
  "esim-drimsim": { trackingUrl: "https://drimsim.tpm.li/khIJTNaX" },
  // Replace only with the publisher's actual approved tracking links, including destination parameters.
  "airport-kiwitaxi": undefined,
  "airport-welcome": undefined,
  "airport-intui": undefined,
  "airport-gettransfer": undefined,
  "ashdod-shore-beinharim": undefined,
  "haifa-shore-beinharim": undefined,
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
  "hotels-deadsea-expedia": { trackingUrl: "https://expedia.tpm.li/UgChNxYh" },
  "category-deadsea-luxury-expedia": { trackingUrl: "https://expedia.tpm.li/kIQiA2gD" },
  "category-deadsea-spa-expedia": { trackingUrl: "https://expedia.tpm.li/hj7Ho47x" },
  "category-deadsea-family-expedia": { trackingUrl: "https://expedia.tpm.li/nJNahv0S" },
  "category-deadsea-value-expedia": { trackingUrl: "https://expedia.tpm.li/p3ucPL77" },
  "category-deadsea-ein-gedi-expedia": { trackingUrl: "https://expedia.tpm.li/XGDXTTv5" },
  "hotel-ds-kayma-expedia": { trackingUrl: "https://expedia.tpm.li/KcmNOZek" },
  "hotel-ds-herods-expedia": { trackingUrl: "https://expedia.tpm.li/bfBGkDIB" },
  "hotel-ds-milos-expedia": { trackingUrl: "https://expedia.tpm.li/4vmGNewy" },
  "hotel-ds-nevo-expedia": { trackingUrl: "https://expedia.tpm.li/vqyc5OUk" },
  "hotel-ds-oasis-expedia": { trackingUrl: "https://expedia.tpm.li/wSfoVPfF" },
  "hotel-ds-leonardo-club-expedia": { trackingUrl: "https://expedia.tpm.li/BWsDABMA" },
  "hotel-ds-vert-expedia": { trackingUrl: "https://expedia.tpm.li/Q55gt8Wx" },
  "hotel-ds-noga-expedia": { trackingUrl: "https://expedia.tpm.li/5JwQJQLV" },
  "hotel-ds-leonardo-plaza-expedia": { trackingUrl: "https://expedia.tpm.li/ExXg3tn5" },
  "hotel-ds-ein-gedi-expedia": { trackingUrl: "https://expedia.tpm.li/6BK7fDJ1" },
  "hotel-ds-hi-ein-gedi-expedia": { trackingUrl: "https://expedia.tpm.li/PscLWtIj" },
  "hotels-tiberias-expedia": { trackingUrl: "https://expedia.tpm.li/DEbYK2CW" },
  "category-tiberias-luxury-expedia": { trackingUrl: "https://expedia.tpm.li/xdeJinwP" },
  "category-tiberias-family-expedia": { trackingUrl: "https://expedia.tpm.li/Jj517ypi" },
  "category-tiberias-central-expedia": { trackingUrl: "https://expedia.tpm.li/qWtAVTqG" },
  "category-tiberias-budget-expedia": { trackingUrl: "https://expedia.tpm.li/YLENwQmV" },
  "hotel-tib-u-boutique-expedia": { trackingUrl: "https://expedia.tpm.li/cji9mC7b" },
  "hotel-tib-galei-kinneret-expedia": { trackingUrl: "https://expedia.tpm.li/OjD96b2I" },
  "hotel-tib-scots-expedia": { trackingUrl: "https://expedia.tpm.li/DlqQLqw5" },
  "hotel-tib-gai-beach-expedia": { trackingUrl: "https://expedia.tpm.li/9WNQnms9" },
  "hotel-tib-leonardo-club-expedia": { trackingUrl: "https://expedia.tpm.li/gu6JTl94" },
  "hotel-tib-caesar-expedia": { trackingUrl: "https://expedia.tpm.li/t4Qn13Gp" },
  "hotel-tib-sofia-expedia": { trackingUrl: "https://expedia.tpm.li/PvwSGlLH" },
  "hotel-tib-emily-expedia": { trackingUrl: "https://expedia.tpm.li/e19VwpLE" },
  "hotel-tib-tiberia-expedia": { trackingUrl: "https://expedia.tpm.li/KFPHkIPk" },
  "hotel-tib-hostel-expedia": { trackingUrl: "https://expedia.tpm.li/oPqpXNAU" },
  "hotel-haifa-botanica-expedia": { trackingUrl: "https://expedia.tpm.li/2e89Wczt" },
  "hotel-haifa-dan-carmel-expedia": { trackingUrl: "https://expedia.tpm.li/ykXaomoy" },
  "hotel-haifa-schumacher-expedia": { trackingUrl: "https://expedia.tpm.li/B0kTGlZv" },
  "hotel-haifa-colony-expedia": { trackingUrl: "https://expedia.tpm.li/aNh9exqi" },
  "hotel-haifa-crowne-plaza-expedia": { trackingUrl: "https://expedia.tpm.li/3gDCII02" },
  "hotel-haifa-leonardo-plaza-expedia": { trackingUrl: "https://expedia.tpm.li/5EteFiQA" },
  "hotel-haifa-golden-crown-expedia": { trackingUrl: "https://expedia.tpm.li/vNAvMtwB" },
  "hotel-haifa-nof-expedia": { trackingUrl: "https://expedia.tpm.li/29IRgC8m" },
  "hotel-haifa-port-inn-expedia": { trackingUrl: "https://expedia.tpm.li/wYvcNQoB" },
  "hotel-haifa-loui-talpiot-expedia": { trackingUrl: "https://expedia.tpm.li/p7P9zxsX" },
};

export const partners: BookingPartner[] = [
  ...([{ id: "getyourguide", name: "GetYourGuide", homepage: "https://www.getyourguide.com/" }, { id: "viator", name: "Viator", homepage: "https://www.viator.com/" }]).map((partner): BookingPartner => ({ ...partner, capability: (shoreTourProducts.some((product) => product.partnerId === partner.id && affiliateConfig[product.id]?.trackingUrl) || tourBookingOffers.some((offer) => offer.partnerId === partner.id && affiliateConfig[offer.id]?.trackingUrl)) ? "affiliate_link" : "editorial_only" })),
  ...(["airalo", "saily", "yesim", "gigsky", "drimsim"] as const).map((id): BookingPartner => ({ id, name: ({ airalo: "Airalo", saily: "Saily", yesim: "Yesim", gigsky: "GigSky", drimsim: "Drimsim" })[id], capability: affiliateConfig[`esim-${id}`] ? "affiliate_link" : "editorial_only", homepage: travelGuideSources.find((source) => source.id === `guide-esim-${id}`)!.url })),
  { id: "kiwitaxi", name: "Kiwitaxi", capability: affiliateConfig["airport-kiwitaxi"] ? "affiliate_link" : "editorial_only", homepage: "https://kiwitaxi.com/",
    logo: { src: kiwitaxiLogo, width: 45, height: 40, sourceUrl: "https://ftcdn.kiwitaxi.com/app2/assets/icons/logo-dark.svg", checkedAt: "2026-10-17" } },
  { id: "welcome", name: "Welcome Pickups", capability: affiliateConfig["airport-welcome"] ? "affiliate_link" : "editorial_only", homepage: "https://www.welcomepickups.com/",
    logo: { src: welcomePickupsLogo, width: 195, height: 28, sourceUrl: "https://www.welcomepickups.com/", checkedAt: "2026-10-17" } },
  { id: "intui", name: "Intui.travel", capability: affiliateConfig["airport-intui"] ? "affiliate_link" : "editorial_only", homepage: "https://en.intui.travel/",
    logo: { src: intuiLogo, width: 890, height: 365, sourceUrl: "https://en.intui.travel/press/logos-banners-intui/", checkedAt: "2026-10-17" } },
  { id: "gettransfer", name: "GetTransfer.com", capability: affiliateConfig["airport-gettransfer"] ? "affiliate_link" : "editorial_only", homepage: "https://gettransfer.com/en",
    logo: { src: gettransferLogo, width: 200, height: 21, sourceUrl: "https://gettransfer.com/common/logo.svg?v=2026.1", checkedAt: "2026-10-17" } },
  { id: "gett", name: "Gett", capability: "editorial_only", homepage: "https://www.gett.com/il/airport-en/" },
  { id: "booking", name: "Booking.com", capability: "editorial_only", homepage: "https://www.booking.com/" },
  { id: "expedia", name: "Expedia", capability: "affiliate_link", homepage: "https://www.expedia.com/" },
  { id: "discovercars", name: "DiscoverCars", capability: "editorial_only", homepage: "https://www.discovercars.com/" },
];

export interface ResortHotelFacts {
  location: string;
  beach: string;
  spa: string;
  agePolicy: string;
  children: string;
  meals: string;
}

export interface HotelRecommendation {
  id: string;
  cityId: "jerusalem" | "telaviv" | "tiberias" | "deadsea" | "haifa";
  areaId: string;
  name: string;
  style: string;
  summary: string;
  bestFor: string;
  watch: string;
  sourceId: string;
  resortFacts?: ResortHotelFacts;
  operatingNotice?: { message: string; expiresOn: ISODate };
}

export const deadSeaHotelRecommendations: (HotelRecommendation & { resortFacts: ResortHotelFacts })[] = [
  {
    id: "ds-kayma", cityId: "deadsea", areaId: "deadsea", name: "Kayma by Isrotel Exclusive", style: "Intimate luxury resort · guests aged 10+",
    summary: "A smaller luxury resort in the southern hotel district, with an infinity pool and direct access to the beach. Choose it for a more intimate hotel experience, keeping its minimum guest age in mind.",
    bestFor: "Couples and travelers seeking a quieter luxury stay; guests must be at least ten.",
    watch: "Confirm the minimum age for every guest, your exact room category and meal inclusions. It is not an option for families with younger children.", sourceId: "hotel-ds-kayma-official",
    resortFacts: { location: "Southern hotel district", beach: "Direct beach access", spa: "Confirm the wellness facilities in your offer", agePolicy: "Hotel welcomes guests aged 10+", children: "Not suitable for children under ten", meals: "Confirm the selected room rate and meal plan" },
  },
  {
    id: "ds-herods", cityId: "deadsea", areaId: "deadsea", name: "Herods Dead Sea", style: "Luxury beachfront resort with Vitalis Spa",
    summary: "A resort near Neve Zohar with an adjoining beach and the Vitalis Spa. Its southern setting suits a stay centered on the hotel, with fewer outside dining and shopping options close by than central Ein Bokek.",
    bestFor: "Couples and travelers combining a substantial spa with a southern beachfront base.",
    watch: "Ask which spa facilities your rate includes, about treatment charges and age limits, and whether your room has the outlook you want.", sourceId: "hotel-ds-herods-official",
    resortFacts: { location: "Neve Zohar / southern hotel district", beach: "Adjoining serviced beach via a deck path", spa: "Vitalis Spa, mineral pools and treatment options", agePolicy: "Family hotel; confirm spa age limits", children: "Children's facilities; confirm the activity schedule", meals: "Meal plan depends on the rate selected" },
  },
  {
    id: "ds-milos", cityId: "deadsea", areaId: "deadsea", name: "Herbert Samuel Milos Dead Sea", style: "Design-focused beachfront resort",
    summary: "A low-rise, Greek-inspired hotel in Ein Bokek with beach access and a spa complex. It offers a different atmosphere from the larger resort towers, with room categories and outdoor spaces that need individual comparison.",
    bestFor: "Couples who value design, a beachfront setting and spa facilities.",
    watch: "Confirm spa access, any age restrictions and extra charges. A private pool or special terrace is included only when stated for the room you book.", sourceId: "hotel-ds-milos-official",
    resortFacts: { location: "Ein Bokek", beach: "Beachfront access", spa: "Dead Sea water pool, sulfur pool, hammam and treatments", agePolicy: "Check spa age restrictions separately", children: "Confirm room occupancy and children's facilities", meals: "Check which meals your room offer includes" },
  },
  {
    id: "ds-nevo", cityId: "deadsea", areaId: "deadsea", name: "Nevo by Isrotel Collection", style: "Full-service resort with Esprit Spa",
    summary: "A substantial Ein Bokek resort combining the Esprit Spa, pools and access to nearby beach services. It is a useful all-round choice when different members of the party want hotel facilities as well as time beside the water.",
    bestFor: "First visits and mixed-interest groups looking for a broad resort experience.",
    watch: "Confirm the route to the beach, the spa access included in your room rate and charges for treatments or specific facilities.", sourceId: "hotel-ds-nevo-official",
    resortFacts: { location: "Ein Bokek", beach: "Beach beside the hotel; confirm the access route", spa: "Esprit Spa, mineral-water pools and treatments", agePolicy: "Hotel accepts families; confirm spa age limits", children: "Kids' club and pool facilities; schedules vary", meals: "Meals depend on the selected booking offer" },
  },
  {
    id: "ds-oasis", cityId: "deadsea", areaId: "deadsea", name: "Oasis Spa Club", style: "Age-restricted spa hotel · operator lists 16+",
    summary: "A spa-focused Prima property in Ein Bokek, a short walk from the beach. Its Moroccan-inspired spa and age-restricted format suit visitors prioritizing a quieter wellness setting over a family activity resort.",
    bestFor: "Adults and eligible older teenagers seeking a spa-focused stay.",
    watch: "The operator currently lists hotel and spa entry as 16+, with check-in from age 18 and younger eligible guests accompanied by an adult. Confirm the policy for your party directly.", sourceId: "hotel-ds-oasis-official",
    resortFacts: { location: "Ein Bokek", beach: "Short walk to the beach", spa: "Heated Dead Sea water pool, hammam, sauna and treatments", agePolicy: "Entry 16+; check-in 18+; confirm accompaniment", children: "No guests under 16 under the published policy", meals: "Confirm breakfast and dinner inclusions" },
  },
  {
    id: "ds-leonardo-club", cityId: "deadsea", areaId: "deadsea", name: "Leonardo Club Dead Sea", style: "All-inclusive family resort with a water park",
    summary: "A family-focused resort in the southern hotel district with a water park, children's pools and adjacent beach access. The operator markets an all-inclusive format, making the package contents an important part of comparing total holiday costs.",
    bestFor: "Families who want meals, hotel activities and water slides in one resort.",
    watch: "Confirm water-park opening, slide height or age rules, kids' club arrangements and exactly which meals, drinks and services your package includes.", sourceId: "hotel-ds-leonardo-club-official",
    resortFacts: { location: "Southern hotel district, near Neve Zohar", beach: "Adjacent beach with direct access", spa: "Spa facilities; confirm age limits and extras", agePolicy: "Family resort; facility-specific restrictions apply", children: "Water park, children's pools and activity clubs", meals: "Marketed as all-inclusive; confirm package details" },
  },
  {
    id: "ds-vert", cityId: "deadsea", areaId: "deadsea", name: "VERT Dead Sea", style: "Beachfront resort in central Ein Bokek",
    summary: "An AFI resort by the Ein Bokek promenade with beach access, pools, a spa and children's facilities. It suits families who want a hotel base near the central resort area and prefer choosing their meal plan.",
    bestFor: "Families combining beach time, hotel facilities and central Ein Bokek convenience.",
    watch: "Check the exact room layout, connecting-room confirmation, club schedule and meal plan. A family-hotel label does not mean an all-inclusive rate.", sourceId: "hotel-ds-vert-official",
    resortFacts: { location: "Ein Bokek promenade", beach: "Hotel access to the adjacent beach", spa: "Indoor mineral-water pool, spa and treatments", agePolicy: "Families welcome; check spa age restrictions", children: "Children's club and pool facilities", meals: "Compare the selected meal plan; do not assume all-inclusive" },
  },
  {
    id: "ds-noga", cityId: "deadsea", areaId: "deadsea", name: "Noga by Isrotel Collection", style: "Ein Bokek hotel with mineral-water pools",
    summary: "An Ein Bokek hotel near the beach, combining the Esprit Spa with a more straightforward resort format. Consider it when comparing the facilities you will use rather than paying primarily for a luxury room or a direct beachfront address.",
    bestFor: "Couples and families comparing wellness facilities with the total cost of a stay.",
    watch: "The spa is for guests aged 16+, and treatments cost extra. Confirm the beach walk, children's facilities and room occupancy for your dates.", sourceId: "hotel-ds-noga-official",
    resortFacts: { location: "Ein Bokek", beach: "Short walk to the beach", spa: "Two Dead Sea pools; treatments charged separately", agePolicy: "Spa entry 16+; the hotel itself accepts families", children: "Children's activities; verify seasonal programming", meals: "Check your chosen room offer and meal plan" },
  },
  {
    id: "ds-leonardo-plaza", cityId: "deadsea", areaId: "deadsea", name: "Leonardo Plaza Dead Sea", style: "Southern resort with family-room options",
    summary: "A resort near Neve Zohar offering family rooms and hotel activities in a more self-contained setting. Compare it when its total rate and room configuration suit your party, allowing for the separate route to the beach.",
    bestFor: "Families and groups who prioritize room arrangements and a resort-based stay.",
    watch: "The beach is reached by a pathway or shuttle rather than immediately from the room block. Confirm shuttle hours, connecting rooms, meals and children's activities.", sourceId: "hotel-ds-leonardo-plaza-official",
    resortFacts: { location: "Neve Zohar / southern hotel district", beach: "Pathway or hotel shuttle to the beach", spa: "Hotel spa; check inclusions and minimum ages", agePolicy: "Family hotel; spa rules are separate", children: "Family and connecting rooms; children's activities", meals: "Confirm the meal plan for the selected rate" },
  },
  {
    id: "ds-ein-gedi", cityId: "deadsea", areaId: "deadsea", name: "Ein Gedi Hotel", style: "Inland nature stay with Synergy Spa",
    summary: "A hotel in the Ein Gedi kibbutz setting, with gardens and the Synergy Spa. It is an alternative for travelers who want a nature-focused stay rather than the Ein Bokek beachfront resort district.",
    bestFor: "Visitors prioritizing gardens, the Ein Gedi area and an inland spa retreat.",
    watch: "Do not assume a room overlooking the Dead Sea includes nearby sea bathing. Plan a separate journey to an operating beach and check nature-reserve access for your dates.", sourceId: "hotel-ds-ein-gedi-official",
    resortFacts: { location: "Ein Gedi, north of the main hotel district", beach: "Separate journey to an operating beach", spa: "Synergy Spa with a Dead Sea water pool", agePolicy: "Confirm age rules for the hotel and spa separately", children: "Check room layout and the facilities your family needs", meals: "Check the offer and outside dining options" },
  },
  {
    id: "ds-hi-ein-gedi", cityId: "deadsea", areaId: "deadsea", name: "HI Ein Gedi Hostel", style: "Simple hostel stay near the nature reserve",
    summary: "An Israel Youth Hostels Association property near Ein Gedi, with private-room options for travelers and groups. It is a practical accommodation alternative for a nature-focused itinerary, with a simpler format than a spa resort.",
    bestFor: "Hikers, independent visitors and groups comparing simpler accommodation.",
    watch: "This is not a beachfront spa resort. Confirm the room format, reception arrangements, meals and transport to any beach or attraction you intend to visit.", sourceId: "hotel-ds-hi-ein-gedi-official",
    resortFacts: { location: "Ein Gedi nature-reserve area", beach: "Separate journey to an operating beach", spa: "No resort spa advertised", agePolicy: "Confirm room and group arrangements", children: "Private-room options; no resort activity format", meals: "Confirm breakfast and any additional meals" },
  },
];

export const tiberiasHotelRecommendations: (HotelRecommendation & { resortFacts: ResortHotelFacts })[] = [
  {
    id: "tib-u-boutique", cityId: "tiberias", areaId: "tiberias", name: "U Boutique Kinneret", style: "Contemporary lakefront boutique hotel",
    summary: "A smaller lakefront hotel with a private beach area, seasonal outdoor pool and spa facilities. It combines a resort setting with a boutique format, and accepts families as well as couples.",
    bestFor: "Couples who want lake access and a contemporary hotel, or families comparing a smaller upscale stay.",
    watch: "Confirm beach and pool operation, your room's actual outlook, spa access and the meal plan. Lake-view rooms and particular facilities are not implied by every rate.", sourceId: "hotel-tib-u-boutique-official",
    resortFacts: { location: "Northern edge of the central waterfront", beach: "Private beach area; confirm seasonal access", spa: "Spa facilities; check access and treatment extras", agePolicy: "Families accepted; check individual spa age limits", children: "Seasonal outdoor pool and shallow children's pool", meals: "Check the selected room's meal plan" },
  },
  {
    id: "tib-galei-kinneret", cityId: "tiberias", areaId: "tiberias", name: "Galei Kinneret", style: "Luxury lakeside hotel · guests aged 12+",
    summary: "A luxury hotel on the southern waterfront with a private beach, pool and spa. Its minimum guest age of 12 makes it a different choice from a resort designed around younger children's activities.",
    bestFor: "Couples and eligible older families prioritizing a lakeside hotel and wellness break.",
    watch: "The operator states guests must be 12 or older. Confirm seasonal beach access, spa inclusions, treatments and the exact room category.", sourceId: "hotel-tib-galei-kinneret-official",
    resortFacts: { location: "Southern waterfront, near the town", beach: "Private beach; seasonal operation", spa: "Spa and pool; confirm access inclusions", agePolicy: "Hotel guests 12+", children: "Not a young-child resort; minimum age 12", meals: "Check meals and dining reservations in the offer" },
  },
  {
    id: "tib-scots", cityId: "tiberias", areaId: "tiberias", name: "The Scots Hotel", style: "Heritage hotel in restored hospital buildings",
    summary: "Historic basalt-stone buildings and gardens on the central waterfront create a distinctive heritage stay. Choose it for the architecture and atmosphere; lakeside gardens do not mean a swimming beach.",
    bestFor: "Couples interested in a historic setting, gardens and a central base for exploring Tiberias.",
    watch: "The usual guest policy is 16+, with exceptions during holidays and July–August. Contact reservations directly before planning a stay with children, and check seasonal pool operation.", sourceId: "hotel-tib-scots-official",
    resortFacts: { location: "Central waterfront and historic town", beach: "Lakefront gardens; no swimming beach assumed", spa: "Spa services and seasonal outdoor pool; check inclusions", agePolicy: "Generally 16+; holiday and July–August exceptions need confirmation", children: "Children's stays require checking the date-specific policy", meals: "Compare the selected dining package" },
  },
  {
    id: "tib-gai-beach", cityId: "tiberias", areaId: "tiberias", name: "Gai Beach Hotel", style: "Lakeside family hotel with a water park",
    summary: "A southern-shore hotel combining a declared swimming beach with a water park. The operator advertises water-park entry for hotel guests, making it a useful family comparison when slides and time by the water are central to the holiday.",
    bestFor: "Families planning to spend substantial time at the hotel, beach and water park.",
    watch: "Confirm the current water-park calendar, separate-swimming sessions, slide restrictions and which facilities operate during your stay. Do not assume year-round water-park opening.", sourceId: "hotel-tib-gai-beach-official",
    resortFacts: { location: "Southern lakeshore, beyond the central promenade", beach: "Declared beach beside the water park; check operation", spa: "Hotel spa; confirm entry ages and charges", agePolicy: "Families accepted; water attractions have separate rules", children: "Water park with slides and children's areas; seasonal calendar", meals: "Compare the exact breakfast or other board package" },
  },
  {
    id: "tib-leonardo-club", cityId: "tiberias", areaId: "tiberias", name: "Leonardo Club Tiberias", style: "Central family hotel · check the current board basis",
    summary: "A central hotel with children's and teens' clubs, pools and seasonal water slides. Although marketed as all-inclusive, the operator currently posts a notice that it is running on full board instead; confirm the exact package before booking.",
    bestFor: "Families who want on-site activities and meals while staying near the town and promenade.",
    watch: "Full board does not automatically include all drinks and snacks. Confirm the meal basis in writing, pool and slide opening, club ages and your room's occupancy. This is not a private-beach hotel.", sourceId: "hotel-tib-leonardo-club-official",
    operatingNotice: { message: "Operator notice, checked 17 October 2026: the pool is scheduled to close on 25–27 October 2026 for enclosure maintenance. Confirm any change directly before booking those dates.", expiresOn: "2026-10-27" },
    resortFacts: { location: "Central Tiberias, a walk from the promenade", beach: "No private beach; plan swimming separately", spa: "Check which wellness facilities are currently available", agePolicy: "Families accepted; confirm slide and club ages", children: "Children's and teens' clubs; seasonal water slides", meals: "Marketed all-inclusive, but current operator notice says full board; confirm" },
  },
  {
    id: "tib-caesar", cityId: "tiberias", areaId: "tiberias", name: "Caesar Premier Tiberias", style: "Full-service hotel by the promenade",
    summary: "A central promenade hotel with family facilities, an outdoor pool and a spa with a thermal mineral pool. It suits visitors combining hotel time with walks in town; the thermal pool is for guests aged 18 and over.",
    bestFor: "Families and couples seeking a central waterfront base with conventional hotel facilities.",
    watch: "The 18+ restriction applies to the thermal mineral pool, not the whole hotel. Check outdoor-pool operation, children's facilities, room layout, meals and parking availability.", sourceId: "hotel-tib-caesar-official",
    resortFacts: { location: "On the central promenade", beach: "Promenade location; no private beach assumed", spa: "Spa and thermal mineral pool; mineral pool 18+", agePolicy: "Family hotel; thermal mineral pool 18+", children: "Outdoor pool, children's playroom and family-room options", meals: "Check the selected room and board basis" },
  },
  {
    id: "tib-sofia", cityId: "tiberias", areaId: "tiberias", name: "Sofia Hotel Tiberias", style: "City hotel with history, spa and lake views",
    summary: "A hotel on Palmach Street above the lower waterfront, with a historic setting and spa. Compare it when you want a city base with a lake outlook, allowing for the uphill return from the promenade.",
    bestFor: "Couples and city-break visitors who value the hotel's setting and do not need an adjoining beach.",
    watch: "Ask which rooms actually face the lake, about the walking route and steps, and which spa facilities your rate includes. A lake view is not direct beach access.", sourceId: "hotel-tib-sofia-official",
    resortFacts: { location: "Palmach Street, above the lower waterfront", beach: "Walk down to the shore; no adjoining swimming beach assumed", spa: "Hotel spa; check access, age limits and treatments", agePolicy: "Confirm guest and facility policies for your party", children: "Check room occupancy and facilities for your children's ages", meals: "Compare the selected dining package" },
  },
  {
    id: "tib-emily", cityId: "tiberias", areaId: "tiberias", name: "Emily's Hotel", style: "Small hotel near central Tiberias",
    summary: "A smaller hotel within walking reach of downtown, useful as a base for time in town and trips around the Galilee. Its operator describes a bed-and-breakfast format, with other meals available by advance arrangement at extra cost.",
    bestFor: "Travelers comparing a smaller base rather than a large activity resort.",
    watch: "Confirm parking availability, the exact room, pool operation if important and the walk to your planned outings. Do not treat proximity to the lake as a private beach.", sourceId: "hotel-tib-emily-official",
    resortFacts: { location: "Near the southern side of downtown", beach: "Near the shore; no private beach assumed", spa: "No resort-spa package assumed; confirm any required facilities", agePolicy: "Check room and guest policies for your party", children: "Confirm room capacity; no large resort activity program assumed", meals: "B&B format; lunch/dinner by advance arrangement at extra cost" },
  },
  {
    id: "tib-tiberia", cityId: "tiberias", areaId: "tiberias", name: "Tiberia Hotel", style: "Small central hotel in a restored building",
    summary: "A smaller central-hotel option in a restored historic building. Compare the final room total with larger hotels and hostels; being in this group is not a promise of the lowest price.",
    bestFor: "Independent visitors who need a simple town base and can confirm the room's essential facilities.",
    watch: "The primary source is the operator's public profile. Confirm reception and late arrival, bathroom, accessibility, parking and all required facilities directly; a pool or spa is not assumed.", sourceId: "hotel-tib-tiberia-official",
    resortFacts: { location: "Central Tiberias", beach: "Town base; arrange swimming separately", spa: "No spa or pool assumed; confirm required facilities", agePolicy: "Confirm with the property for the selected room", children: "Check occupancy and sleeping arrangements directly", meals: "Confirm whether any meals are included" },
  },
  {
    id: "tib-hostel", cityId: "tiberias", areaId: "tiberias", name: "Tiberias Hostel", style: "Independent hostel · private and shared-room options",
    summary: "A central hostel between the bus station and waterfront, with a shared kitchen, luggage storage and rooftop space. Compare a private room with a dorm bed as different products, checking the bathroom arrangement for each.",
    bestFor: "Independent travelers prioritizing a central base, shared facilities and flexible self-catering.",
    watch: "Check private versus shared room and bathroom, reception hours and late-arrival arrangements. Do not assume every room is en suite or that reception operates around the clock.", sourceId: "hotel-tib-hostel-official",
    resortFacts: { location: "Central town, between the bus station and lake", beach: "Walk to the waterfront; no private beach", spa: "Hostel facilities, not a spa resort", agePolicy: "Check dorm and private-room policies for your party", children: "Private-room capacity and suitability need confirmation", meals: "Shared kitchen; do not assume a meal package" },
  },
];

export const haifaHotelRecommendations: (HotelRecommendation & { resortFacts: ResortHotelFacts })[] = [
  {
    id: "haifa-botanica", cityId: "haifa", areaId: "haifa", name: "Hotel Botanica Haifa", style: "Design-led luxury hotel · operator lists 16+",
    summary: "A contemporary hotel beside the lower Bahá'í Gardens in the German Colony, with a botanical design theme, spa and seasonal rooftop plunge pool. It is an age-restricted city stay, rather than a family swimming resort.",
    bestFor: "Couples and eligible older guests seeking design, dining and a German Colony base.",
    watch: "Confirm the minimum guest age for your party, your room's outlook and spa inclusions. The rooftop plunge pool is for a dip and relaxation, not a full-size swimming pool; check seasonal operation.", sourceId: "hotel-haifa-botanica-official",
    resortFacts: { location: "German Colony, beside the lower Bahá'í Gardens", beach: "City location; transport needed for a beach day", spa: "Spa and seasonal rooftop plunge pool; confirm inclusions", agePolicy: "Operator describes guests aged 16+; reconfirm eligibility", children: "Not a young-family hotel; age-restricted admission", meals: "Check breakfast and any other dining inclusions" },
  },
  {
    id: "haifa-dan-carmel", cityId: "haifa", areaId: "haifa", name: "Dan Carmel Haifa", style: "Classic luxury hotel on Mount Carmel",
    summary: "A substantial hilltop hotel by the Louis Promenade, with gardens, an outdoor pool and a separate children's pool. Choose it for the Carmel setting and hotel facilities; a panoramic bay view does not put the beach beside the hotel.",
    bestFor: "Couples and families who want an upscale Carmel base and time at the hotel between outings.",
    watch: "Room occupancy differs by category. Confirm beds for every child, pool operation, your exact view, meals and paid parking. Some executive rooms and lounge access have additional age restrictions.", sourceId: "hotel-haifa-dan-carmel-official",
    resortFacts: { location: "Carmel Center, by the Louis Promenade", beach: "Hilltop location; separate journey to the shore", spa: "Outdoor pool, children's pool and wellness facilities; check operation", agePolicy: "Family hotel; certain room floors and lounge access have separate rules", children: "Separate children's pool; selected rooms accommodate families", meals: "Compare the specific breakfast or other board offer" },
  },
  {
    id: "haifa-schumacher", cityId: "haifa", areaId: "haifa", name: "The Schumacher Hotel", style: "Adults-only heritage boutique hotel",
    summary: "A preserved Templer building and a newer wing in the German Colony, with design-focused rooms, a garden and rooftop sun terrace. The hotel's own site describes it as adults-only.",
    bestFor: "Couples and independent adults prioritizing historic character and a neighborhood hotel.",
    watch: "Confirm the precise minimum age, building, room layout and any steps. Check where breakfast is served, treatment bookings and parking arrangements rather than assuming full-service resort facilities.", sourceId: "hotel-haifa-schumacher-official",
    resortFacts: { location: "German Colony, on Lohamei HaGeta'ot Street", beach: "Urban neighborhood base; not a beachfront hotel", spa: "Treatment room and rooftop sun terrace; confirm services", agePolicy: "Operator's own site says adults-only; confirm minimum age", children: "Excluded from the young-family shortlist", meals: "Check breakfast inclusion and where it is served" },
  },
  {
    id: "haifa-colony", cityId: "haifa", areaId: "haifa", name: "The Colony Hotel Haifa", style: "Historic boutique hotel on Ben Gurion Boulevard",
    summary: "A preserved historic building in the German Colony, directly on Ben Gurion Boulevard below the Bahá'í Gardens. It suits a city stay built around the neighborhood's architecture, cafés and restaurants.",
    bestFor: "Couples and city-break visitors who want a heritage hotel on the main German Colony boulevard.",
    watch: "Compare room categories, outlook and possible boulevard noise. Confirm accessibility, spa-treatment arrangements, breakfast, room occupancy and parking for the selected offer.", sourceId: "hotel-haifa-colony-official",
    resortFacts: { location: "Ben Gurion Boulevard, German Colony", beach: "Boulevard setting; separate trip to a swimming beach", spa: "Rooftop terrace and spa services; check access and extras", agePolicy: "Confirm guest and treatment policies for your party", children: "Check the selected room's capacity and beds directly", meals: "Check breakfast and any package inclusions" },
  },
  {
    id: "haifa-crowne-plaza", cityId: "haifa", areaId: "haifa", name: "Crowne Plaza Haifa", style: "Carmel hotel with a heated indoor pool",
    summary: "A hotel on Yefe Nof Street near Carmel Center, with a heated indoor pool and health-club facilities. It is a family comparison for visitors who want a hilltop city base and an indoor swimming option.",
    bestFor: "Families and couples prioritizing Carmel Center and indoor-pool facilities over immediate beach access.",
    watch: "Confirm children's pool-access rules and the exact room or extra-bed arrangement. Check any meal promotions against their terms; do not assume a children's club or play program is included.", sourceId: "hotel-haifa-crowne-plaza-official",
    resortFacts: { location: "Yefe Nof Street, near Carmel Center", beach: "Hilltop base; arrange transport to the beach", spa: "Heated indoor pool and health club; check facility ages", agePolicy: "Families accepted; minimum check-in age and facility ages differ", children: "Indoor pool; confirm child access and room occupancy", meals: "Check the actual rate; children's dining offers have conditions" },
  },
  {
    id: "haifa-leonardo-plaza", cityId: "haifa", areaId: "haifa", name: "Leonardo Plaza Haifa", style: "Beachfront hotel with family suites",
    summary: "A hotel on Haifa's southern beachfront, with access to the beach from the pool area. The operator lists a pool covered and heated in colder seasons, children's pools and a children's club with a date-dependent schedule.",
    bestFor: "Families who want the promenade, beach and swimming facilities to be a central part of the holiday.",
    watch: "Confirm the suite layout, balcony or sea view, pool operation and children's club dates. The operator lists club activity on weekends, holidays and in July–August, rather than every day all year.", sourceId: "hotel-haifa-leonardo-plaza-official",
    resortFacts: { location: "Southern beachfront, by the beach promenade", beach: "Beach access from the pool area; confirm current swimming arrangements", spa: "Main pool covered and heated in colder seasons; confirm operation", agePolicy: "Family hotel; pool and club rules need age-specific confirmation", children: "Children's pools; club on weekends, holidays and July–August", meals: "Compare breakfast and any other board basis in the offer" },
  },
  {
    id: "haifa-golden-crown", cityId: "haifa", areaId: "haifa", name: "Golden Crown Haifa", style: "Modern lower-city hotel near the German Colony",
    summary: "A city hotel on Derech Yafo near the German Colony and lower town, useful for restaurants, business and time around the port district. Compare it as a practical urban base rather than a beach resort.",
    bestFor: "Couples, independent visitors and business travelers prioritizing a lower-city location.",
    watch: "Confirm your room's outlook, occupancy, breakfast and parking availability. Check the exact route to your station, port entrance or meeting; being near the port does not establish terminal access.", sourceId: "hotel-haifa-golden-crown-official",
    resortFacts: { location: "Derech Yafo, near the German Colony and lower city", beach: "Port-district location; not a swimming-beach hotel", spa: "Gym advertised; no resort-spa or pool package assumed", agePolicy: "Confirm the selected room's guest policy", children: "Check room capacity; no children's resort program assumed", meals: "Breakfast offered; verify inclusion in the selected rate" },
  },
  {
    id: "haifa-nof", cityId: "haifa", areaId: "haifa", name: "Nof Hotel (Haifa Bay View)", style: "Carmel hotel overlooking Haifa Bay",
    summary: "Also known as Haifa Bay View, this property is now presented by Nara Hotels as Nof Hotel. Its Carmel location and bay outlook suit an urban sightseeing base, rather than a stay beside a swimming beach.",
    bestFor: "Visitors comparing a Carmel address and bay views with larger full-service hotels.",
    watch: "The booking site may retain the Bay View name. Confirm the property at 101 Hanassi Avenue, the room, meals and parking, and ask directly about any leisure facility essential to your stay.", sourceId: "hotel-haifa-nof-official",
    resortFacts: { location: "101 Hanassi Avenue, Carmel Center", beach: "Bay outlook from the hill; separate journey to the beach", spa: "Gym advertised; confirm any other required leisure facilities", agePolicy: "Confirm room and facility policies for your party", children: "Check the exact room's occupancy and sleeping arrangements", meals: "Check breakfast or dining inclusions in the selected rate" },
  },
  {
    id: "haifa-port-inn", cityId: "haifa", areaId: "haifa", name: "Port Inn Haifa", style: "Downtown guesthouse · confirm the room format",
    summary: "A smaller downtown accommodation option on Derech Yafo. Compare its exact room and total with conventional hotels, checking private versus shared facilities and the arrival arrangements directly.",
    bestFor: "Independent visitors seeking a lower-city base and willing to verify the room's essential details.",
    watch: "Current primary information is limited to the operator's indexed public profile. Confirm bathroom, room capacity, meals, accessibility and late arrival; detailed facilities and a permanently low price are not assumed.", sourceId: "hotel-haifa-port-inn-official",
    resortFacts: { location: "34 Derech Yafo, lower city", beach: "Downtown base; arrange beach visits separately", spa: "No resort-spa or pool facilities assumed", agePolicy: "Confirm the chosen room's guest policy directly", children: "Confirm capacity and room suitability with the property", meals: "Confirm whether any meals or kitchen access are included" },
  },
  {
    id: "haifa-loui-talpiot", cityId: "haifa", areaId: "haifa", name: "Loui Talpiot Hotel", style: "Market-neighborhood stay with kitchenettes",
    summary: "An independent hotel by Talpiot Market in Hadar, with simple rooms, kitchenettes and shared courtyard and rooftop spaces. Its cultural events and market surroundings suit visitors who want the neighborhood to be part of the stay.",
    bestFor: "Market and food enthusiasts, independent travelers and guests who value simple self-catering.",
    watch: "Confirm the exact kitchenette equipment, beds, steps and arrival procedure. Ask about rooftop events and room noise for your dates, and check the route between Hadar, downtown and the Carmel.", sourceId: "hotel-haifa-loui-talpiot-official",
    resortFacts: { location: "HaHalutz Street, Talpiot Market / Hadar", beach: "Hillside urban neighborhood; separate trip to the shore", spa: "Courtyard and rooftop setting; no resort-spa package assumed", agePolicy: "Check room occupancy and policies for your party", children: "Operator lists family layouts; confirm the actual beds", meals: "Room kitchenettes; confirm equipment and any meal inclusions" },
  },
];

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
  ...deadSeaHotelRecommendations,
  ...tiberiasHotelRecommendations,
  ...haifaHotelRecommendations,
];

export const hotelsForArea = (areaId: string, cityId?: HotelRecommendation["cityId"]) => [...hotelRecommendations, ...neighborhoodHotelAdditions].filter((hotel) => hotel.areaId === areaId && (!cityId || hotel.cityId === cityId));

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
      conditions: "Published weekday starting fare for up to 4 passengers. Extra charges may apply for night, weekend or holiday trips. Please inquire in advance. Not a live quote.",
      sourceId: "moshe-airport-transfers",
    },
    maxPassengersKnown: 4,
    ctaLabel: "Request a quote",
    url: "/travel-blog/ben-gurion-airport-to-jerusalem/#request-quote",
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

export const publicSources = (ids: string[]) => [...new Set(ids)].map(getSource).filter((source) => !isPublisherUrl(source.url));

export function formatCheckDate(d: ISODate) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", {
    month: "long", year: "numeric", timeZone: "UTC",
  });
}

export const routeFaqs: { q: string; a: string }[] = [
  {
    q: "Should I pre-book or take a taxi on arrival?",
    a: "Pre-booking suits late-night arrivals, families with child seats, larger groups and anyone who wants a named meeting point and agreed price before landing. The licensed airport taxi rank operates around the clock with metered fares, so it is a reasonable choice for small parties with flexible plans.",
  },
  {
    q: "Is ILS 550 the price I will pay?",
    a: "No. ILS 550 is my published weekday starting rate for up to four passengers. Extra charges may apply for night, weekend or holiday trips. I'll confirm the final amount in a personal quote. Other providers set their own prices on their sites.",
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
  ...tourBookingOffers.map((offer): ProviderLink => {
    const product = tourProducts.find((tour) => tour.id === offer.productId)!;
    const partner = partners.find((partner) => partner.id === offer.partnerId)!;
    const trackingUrl = affiliateConfig[offer.id]?.trackingUrl;
    return { id: offer.id, pageIds: ["tour-catalog"], providerName: partner.name, relationship: "booking_platform", operatorId: product.operatorId, partnerId: partner.id,
      mode: "provider_redirect", title: product.title, summary: product.summary, ctaLabel: `View on ${partner.name}`, url: trackingUrl || offer.publicUrl, isAffiliate: Boolean(trackingUrl), sourceId: offer.id,
      confirm: ["Travel date and departure option", "Meeting point and return location", "Guiding, language and inclusions", "Total price and cancellation terms"] };
  }),
  ...shoreTourProducts.map((product): ProviderLink => {
    const operator = operators.find((item) => item.id === product.operatorId)!;
    const partner = partners.find((item) => item.id === product.partnerId);
    const trackingUrl = affiliateConfig[product.id]?.trackingUrl;
    return {
      id: product.id, pageIds: product.portIds.map((id) => shorePorts[id].pageId), providerName: partner?.name || operator.name,
      relationship: partner ? "booking_platform" : "independent_operator", operatorId: operator.id, ...(partner ? { partnerId: partner.id } : {}),
      mode: "provider_redirect", title: product.title, summary: product.summary,
      ctaLabel: `View on ${partner?.name || operator.name}`, url: trackingUrl || product.publicUrl, isAffiliate: Boolean(trackingUrl), sourceId: product.id,
      reentryNote: "Select your actual sailing date and party on the booking site. Confirm the port and return arrangements before booking.",
      confirm: ["Actual sailing date and port-call times", "Exact port meeting point", "Guide, group format and inclusions", "Site access and admission fees", "Return arrangements and cancellation terms"],
    };
  }),
  ...([
    ["airalo", "Airalo", "Compare Israel package sizes, validity and the inclusions of the exact plan."],
    ["saily", "Saily", "Compare data packages and any optional call/text product separately; check the number's country."],
    ["yesim", "Yesim", "Compare fixed data with unlimited packages and read the fair-use speed conditions."],
    ["gigsky", "GigSky", "Choose Israel in the app or site; check country coverage if considering a regional or wider-travel package."],
    ["drimsim", "Drimsim", "Compare pay-as-you-use data costs and setup terms with a fixed-data travel package."],
  ] as const).map(([partnerId, providerName, summary]): ProviderLink => {
    const id = `esim-${partnerId}`;
    const trackingUrl = affiliateConfig[id]?.trackingUrl;
    return { id, pageIds: ["guide-esim"], providerName, relationship: "booking_platform", partnerId, mode: "provider_redirect", title: `${providerName} for Israel`, summary,
      ctaLabel: `Check plans on ${providerName}`, url: trackingUrl || travelGuideSources.find((source) => source.id === `guide-esim-${partnerId}`)!.url, isAffiliate: Boolean(trackingUrl), sourceId: `guide-esim-${partnerId}`,
      confirm: ["Exact device compatibility", "Country coverage and activation", "Data and validity", "Hotspot and fair-use rules", "Final price and refund terms"], reentryNote: "Choose and purchase the plan on the provider's site. No live price, network speed or completed purchase is verified here." };
  }),
  ...([
    ["kiwitaxi", "Kiwitaxi", "kiwitaxi-airport", "Choose your destination and vehicle on Kiwitaxi's Ben Gurion Airport page."],
    ["welcome", "Welcome Pickups", "welcome-telaviv", "Start from Welcome's Tel Aviv page and enter your airport pickup and exact drop-off."],
    ["intui", "Intui.travel", "intui-airport", "Search from Ben Gurion Airport to your destination, with dates and party details."],
    ["gettransfer", "GetTransfer.com", "gettransfer-telaviv", "Open the Tel Aviv transfer page, then enter Ben Gurion Airport and your destination."],
  ] as const).map(([partnerId, providerName, sourceId, summary]): ProviderLink => {
    const id = `airport-${partnerId}`;
    const trackingUrl = affiliateConfig[id]?.trackingUrl;
    return { id, pageIds: ["airport-private-transfers", ...airportTransferRoutes.map((route) => `airport-route-${route.id}`)], providerName, relationship: "booking_platform", partnerId, mode: "provider_redirect",
      title: `${providerName} airport transfers`, summary, ctaLabel: `Check transfers on ${providerName}`,
      url: trackingUrl || sources.find((source) => source.id === sourceId)!.url, isAffiliate: Boolean(trackingUrl),
      reentryNote: "Enter Ben Gurion Airport, your exact destination, date, passengers and luggage on the provider's site.",
      confirm: ["Route and pickup time", "Vehicle and luggage allowance", "Total price and waiting policy", "Cancellation terms"], sourceId };
  }),
  ...[...hotelRecommendations, ...neighborhoodHotelAdditions].map((hotel): ProviderLink => {
    const id = `hotel-${hotel.id}-expedia`;
    const trackingUrl = affiliateConfig[id]?.trackingUrl;
    const officialUrl = sources.find((source) => source.id === hotel.sourceId)!.url;
    const isUntrackedExpedia = neighborhoodHotelAdditions.some((addition) => addition.id === hotel.id);
    return {
      id, pageIds: [hotel.cityId === "deadsea" || hotel.cityId === "tiberias" || hotel.cityId === "haifa" ? `stay-${hotel.cityId}` : `stay-area-${hotel.areaId}`], providerName: trackingUrl || isUntrackedExpedia ? "Expedia" : hotel.name,
      relationship: trackingUrl || isUntrackedExpedia ? "booking_platform" : "official", ...(trackingUrl || isUntrackedExpedia ? { partnerId: "expedia" } : {}), mode: "provider_redirect",
      title: hotel.name, summary: hotel.summary, ctaLabel: trackingUrl ? "Check rooms on Expedia" : isUntrackedExpedia ? "View hotel on Expedia" : "Visit the hotel's website",
      url: trackingUrl || officialUrl, isAffiliate: Boolean(trackingUrl), sourceId: hotel.sourceId,
      confirm: ["Property name and location", "Dates and room category", "Total including taxes and fees", "Cancellation deadline"],
    };
  }),
  ...([
    ["hotels-deadsea-expedia", "stay-deadsea-browse", "Dead Sea hotels in Israel", "owner-hotels-deadsea"],
    ["category-deadsea-luxury-expedia", "stay-deadsea-luxury-browse", "luxury hotels on Israel's Dead Sea shore", "owner-hotels-deadsea"],
    ["category-deadsea-spa-expedia", "stay-deadsea-spa-browse", "Dead Sea spa hotels in Israel", "owner-hotels-deadsea"],
    ["category-deadsea-family-expedia", "stay-deadsea-family-browse", "Dead Sea family hotels in Israel", "owner-hotels-deadsea"],
    ["category-deadsea-value-expedia", "stay-deadsea-value-browse", "value stays in the Dead Sea region", "owner-hotels-deadsea"],
    ["category-deadsea-ein-gedi-expedia", "stay-deadsea-ein-gedi-browse", "places to stay near Ein Gedi", "owner-hotels-deadsea"],
    ["hotels-tiberias-expedia", "stay-tiberias-browse", "Tiberias hotels", "owner-hotels-tiberias"],
    ["category-tiberias-luxury-expedia", "stay-tiberias-luxury-browse", "Tiberias luxury hotels", "owner-hotels-tiberias"],
    ["category-tiberias-family-expedia", "stay-tiberias-family-browse", "Tiberias family hotels", "owner-hotels-tiberias"],
    ["category-tiberias-central-expedia", "stay-tiberias-central-browse", "central Tiberias hotels", "owner-hotels-tiberias"],
    ["category-tiberias-budget-expedia", "stay-tiberias-budget-browse", "budget stays in Tiberias", "owner-hotels-tiberias"],
  ] as const).map(([id, pageId, name, sourceId]): ProviderLink => ({
    id, pageIds: [pageId], providerName: "Expedia", relationship: "booking_platform", partnerId: "expedia", mode: "provider_redirect",
    title: `Browse more ${name}`, summary: "Explore other properties for your dates. Check the map, country and exact accommodation type before choosing a room.",
    ctaLabel: "Browse stays on Expedia", url: affiliateConfig[id]?.trackingUrl || "https://www.expedia.com/", isAffiliate: Boolean(affiliateConfig[id]?.trackingUrl), sourceId,
    reentryNote: "Enter dates, adults and the ages of all children on Expedia. No trip details are passed from this page.",
    confirm: ["Israeli location and exact property", "Room occupancy and guest ages", "Meal and spa inclusions", "Total price and cancellation terms"],
  })),
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
  // The Tel Aviv route keeps its inquiry flow; starting rates are listed on the airport hub.
  {
    id: "tlv-ta-moshe", pageIds: ["tlv-telaviv"], ...moshe, mode: "provider_inquiry",
    title: "Private pre-booked transfer", summary: "Local driver business. Ask for a quote for your Tel Aviv or Jaffa address, party size and arrival time.",
    ctaLabel: "Request a quote", url: "/travel-blog/ben-gurion-airport-to-tel-aviv/#request-quote", isAffiliate: false,
    reentryNote: "Your details are not passed on. Include flight time, passengers, luggage and address in your request.",
    confirm: ["Final price and any extra charges", "Vehicle size", "Meeting point and waiting time", "Child seats"], sourceId: "moshe-airport-transfers",
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
    id: "private-driver-moshe", pageIds: ["private-driver", "tours-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private driver by the day", summary: "Hire a local driver for multi-stop days or intercity transfers. Itinerary and price agreed by inquiry.",
    ctaLabel: "Request a quote", url: "/private-driver/#request-quote", isAffiliate: false,
    reentryNote: "Include your date, route and party details. I'll confirm the arrangements with you in writing.", confirm: ["Hours included", "Entrance fees not included unless stated", "Guide vs driver only"], sourceId: "owner-private-driver",
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
    ctaLabel: "Request a quote", url: "/private-driver/#request-quote", isAffiliate: false,
    reentryNote: "Include your date, route and party details. I'll confirm the arrangements with you in writing.", confirm: ["Exact itinerary and stops", "Whether a licensed guide is included", "Entrance fees", "Travel requirements for crossings"], sourceId: "owner-private-day-trips",
  },
  // Shore excursions (port-specific pages only)
  {
    id: "ashdod-shore-moshe", pageIds: ["shore-ashdod", "shore-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private car-and-driver shore excursion from Ashdod", summary: "Local driver business with suggested Tel Aviv/Jaffa, Jerusalem and Masada/Dead Sea days from Ashdod Port. Itinerary, price and timing agreed by inquiry.",
    ctaLabel: "Request a quote", url: "/ashdod-shore-excursions/#request-quote", isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Include ship name, date, disembarkation and all-aboard times and party size in your request.",
    confirm: ["Price and what it covers", "Pickup point at the port", "Driver only or licensed guide", "Return timing for your all-aboard time", "Cancellation terms"], sourceId: "owner-ashdod-shore",
  },
  {
    id: "ashdod-shore-beinharim", pageIds: ["shore-ashdod"], providerName: "Bein Harim Tours", relationship: "independent_operator", operatorId: "bein-harim", mode: "provider_redirect",
    title: "Jerusalem and Bethlehem day tour from Ashdod Port", summary: "The operator's port-specific product combining Jerusalem and Bethlehem in one day from Ashdod.",
    ctaLabel: "See dates and prices on Bein Harim", url: affiliateConfig["ashdod-shore-beinharim"]?.trackingUrl || "https://www.beinharimtours.com/jerusalem-and-bethlehem-day-tour-from-ashdod-port/", isAffiliate: Boolean(affiliateConfig["ashdod-shore-beinharim"]?.trackingUrl),
    reentryNote: "Choose your date on the operator's site.", confirm: ["Your ship's date and port-call times", "Meeting point at the port", "Shared or private format and inclusions", "Passport and travel requirements for Bethlehem", "Return arrangements and cancellation terms"], sourceId: "beinharim-ashdod-jlm-bethlehem",
  },
  {
    id: "haifa-shore-moshe", pageIds: ["shore-haifa", "shore-hub"], ...moshe, mode: "provider_inquiry",
    title: "Private car-and-driver shore excursion from Haifa", summary: "Local driver business with suggested Akko/Rosh Hanikra, Tel Aviv/Jaffa, Nazareth/Sea of Galilee and Jerusalem days from Haifa Port. Itinerary and price by inquiry.",
    ctaLabel: "Request a quote", url: "/haifa-shore-excursions/#request-quote", isAffiliate: false,
    reentryNote: "Nothing is sent from this page. Include ship name, date, disembarkation and all-aboard times and party size in your request.",
    confirm: ["Whether the itinerary fits your port-call time", "Pickup point at the port", "Driver only or licensed guide", "Entrance fees", "Cancellation terms"], sourceId: "owner-haifa-shore",
  },
  {
    id: "haifa-shore-beinharim", pageIds: ["shore-haifa"], providerName: "Bein Harim Tours", relationship: "independent_operator", operatorId: "bein-harim", mode: "provider_redirect",
    title: "Ship-to-shore: Haifa to Jerusalem and Bethlehem", summary: "The operator's Haifa-port product combining Jerusalem and Bethlehem in one long day.",
    ctaLabel: "See dates and prices on Bein Harim", url: affiliateConfig["haifa-shore-beinharim"]?.trackingUrl || "https://www.beinharimtours.com/ship-to-shore-excursions-haifa-jerusalem-bethlehem/", isAffiliate: Boolean(affiliateConfig["haifa-shore-beinharim"]?.trackingUrl),
    reentryNote: "Choose your date on the operator's site.", confirm: ["Your ship's date and port-call times", "Meeting point at the port", "Shared or private format and inclusions", "Passport and travel requirements for Bethlehem", "Return arrangements and cancellation terms"], sourceId: "beinharim-haifa-jlm-bethlehem",
  },
  ...(["haifa", "ashdod"] as const).flatMap((portId): ProviderLink[] => (["airport", "city"] as const).map((destination) => ({
    id: `${portId}-port-${destination}-transfer`, pageIds: [shorePorts[portId].pageId], ...moshe, mode: "provider_inquiry",
    title: destination === "airport" ? `${shorePorts[portId].name} Port to Ben Gurion Airport` : `${shorePorts[portId].name} Port to your hotel or another city`,
    summary: destination === "airport" ? "Request a one-way private transfer after your cruise. Share your ship, flight, passengers and luggage so I can assess the pickup, route and price." : "Request a one-way transfer from the port to your hotel or another address in Israel. The route, vehicle, pickup point and price are agreed individually.",
    ctaLabel: "Request a transfer quote", url: `/private-driver/?port=${portId}&transfer=${destination}#request-quote`, isAffiliate: false,
    reentryNote: "A transfer request, not a return shore excursion. Confirm the exact meeting point and destination; no vehicle, port access or availability is reserved by selecting it.",
    confirm: ["Exact port meeting point", "Destination and luggage", "Pickup date and time", "Vehicle and total price", "Cancellation terms"], sourceId: "owner-private-driver",
  }))),
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
    ["haifa", "Haifa", "https://www.booking.com/city/il/haifa.html"],
  ] as const).map(([id, city, url]): ProviderLink => ({
    id: `hotels-${id}-booking`, pageIds: id === "haifa" ? ["stay-haifa", "stay-haifa-browse", "stay-haifa-family-browse", "stay-haifa-boutique-browse"] : id === "tiberias" ? ["stay-tiberias", "stay-tiberias-browse"] : [`stay-${id}`], providerName: "Booking.com", relationship: "booking_platform", partnerId: "booking", mode: "provider_redirect",
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
