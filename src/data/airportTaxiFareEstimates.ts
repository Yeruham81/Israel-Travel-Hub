/**
 * Editorial BEN GURION taxi examples: fare formula from the temporary
 * Israeli Ministry of Transport 2026 meter order (in force through March 2027
 * unless amended); road distances and typical drive-time ranges come from
 * src/data/airportJourneyGuides.ts.
 *
 * The estimates are illustrative weekday daytime Tariff A meter journeys,
 * NOT fixed prices or current Gett quotes. Includes ₪5 airport-departure fee,
 * excludes possible dispatch charges, tolls and unusual delays.
 */
import { meteredFareEstimate } from "@/data/taxiFares";

export const AIRPORT_TAXI_ESTIMATE_UPDATED_AT = "2026-11-24";
const airportDepartureFee = 5;

export const airportTaxiFareRoutes = [
  {
    id: "tel-aviv",
    label: "Tel Aviv & Jaffa",
    photoAlt: "Tel Aviv skyline and beachfront",
    destination: "Central Tel Aviv; Jaffa may take longer",
    roadKm: [20, 25] as const,
    driveMinutes: [20, 40] as const,
    travelTime: "20–40+ min",
    to: "/travel-blog/ben-gurion-airport-to-tel-aviv/",
  },
  {
    id: "jerusalem",
    label: "Jerusalem",
    photoAlt: "Jerusalem Old City",
    destination: "Central Jerusalem; Old City access varies",
    roadKm: [45, 55] as const,
    driveMinutes: [45, 60] as const,
    travelTime: "45–60+ min",
    to: "/travel-blog/ben-gurion-airport-to-jerusalem/",
  },
  {
    id: "haifa",
    label: "Haifa",
    photoAlt: "Haifa city and harbour",
    destination: "Central Haifa; Mount Carmel may take longer",
    roadKm: [100, 110] as const,
    driveMinutes: [75, 110] as const,
    travelTime: "75–110+ min",
    to: "/travel-blog/ben-gurion-airport-to-haifa/",
  },
  {
    id: "ein-bokek",
    label: "Ein Bokek · Dead Sea",
    photoAlt: "Dead Sea hotel district",
    destination: "Ein Bokek hotel district",
    roadKm: [155, 165] as const,
    driveMinutes: [105, 150] as const,
    travelTime: "1h 45m–2h 30m+",
    to: "/travel-blog/ben-gurion-airport-to-ein-bokek/",
  },
] as const;

const roundNearestTen = (value: number) => Math.round(value / 10) * 10;

export function airportTaxiEstimatedFare(route: (typeof airportTaxiFareRoutes)[number]) {
  const [minimumKm, maximumKm] = route.roadKm;
  const [minimumMinutes, maximumMinutes] = route.driveMinutes;
  const low = meteredFareEstimate({ tariff: "A", km: minimumKm, minutes: minimumMinutes }).withVat + airportDepartureFee;
  const high = meteredFareEstimate({ tariff: "A", km: maximumKm, minutes: maximumMinutes }).withVat + airportDepartureFee;
  return {
    minimum: roundNearestTen(low),
    maximum: roundNearestTen(high),
    range: `₪${roundNearestTen(low)}–₪${roundNearestTen(high)}`,
  };
}

export const airportTaxiEstimateTable = {
  caption: "Estimated daytime fares from Ben Gurion Airport",
  headers: ["Destination", "Daytime meter estimate", "Typical drive"],
  rows: airportTaxiFareRoutes.map((route) => [
    route.label, airportTaxiEstimatedFare(route).range, route.travelTime,
  ]),
  rowLinks: airportTaxiFareRoutes.map((route) => ({ to: route.to })),
  note: "Illustrative Tariff A meter estimates in NIS, calculated from the April 2026 regulated rates and indicative route distances/drive times; updated November 2026. Includes 18% VAT and the ₪5 airport departure addition. The meter can run higher with traffic, a different final address, night/Shabbat tariffs, tolls or other permitted charges. These are planning estimates, not fixed quotes.",
};
