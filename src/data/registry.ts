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
  kind: "local_operator" | "authorized_taxi_system";
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

export interface Offer {
  id: string;
  productId: string;
  routeId: string;
  category: OfferCategory;
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
];

export const operators: Operator[] = [
  {
    id: "moshe-barak",
    name: "Moshe Barak",
    kind: "local_operator",
    disclosure: "Operated by the publisher's local transport business.",
  },
];

export const partners: BookingPartner[] = [
  { id: "intui", name: "Intui.travel", capability: "editorial_only", homepage: "https://en.intui.travel/" },
  { id: "gettransfer", name: "GetTransfer.com", capability: "editorial_only", homepage: "https://gettransfer.com/en" },
  { id: "gett", name: "Gett", capability: "editorial_only", homepage: "https://www.gett.com/il/airport-en/" },
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
    a: "Private transfers and licensed taxis can usually be arranged, but surcharges may apply and train services are limited. Check Israel Railways for current schedules and confirm any surcharge in your quote.",
  },
  {
    q: "Is there a train instead?",
    a: "Yes, Israel Railways serves the airport and Jerusalem. Schedules and fares change, so check the official Israel Railways site for your travel date and consider the extra step from the station to your accommodation.",
  },
];
