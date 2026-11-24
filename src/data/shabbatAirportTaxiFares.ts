/**
 * Indicative airport taxi meter fares on Shabbat, using the same 2026
 * regulated meter formula and route assumptions as the airport taxi guide.
 * B applies Saturday 06:00–19:00; C applies Saturday 19:00–06:00.
 * Friday tariff changes at 16:00 (B) and 21:00 (C).
 * These are editorial planning ranges, not supplier quotes.
 */
import { airportTaxiFareRoutes } from "@/data/airportTaxiFareEstimates";
import { meteredFareEstimate, type TaxiTariff } from "@/data/taxiFares";

const AIRPORT_DEPARTURE_SUPPLEMENT_NIS = 5;
const roundNearestTen = (nis: number) => Math.round(nis / 10) * 10;

function estimateShabbatFare(route: (typeof airportTaxiFareRoutes)[number], tariff: Extract<TaxiTariff, "B" | "C">) {
  const minimum = meteredFareEstimate({
    tariff, km: route.roadKm[0], minutes: route.driveMinutes[0],
  }).withVat + AIRPORT_DEPARTURE_SUPPLEMENT_NIS;
  const maximum = meteredFareEstimate({
    tariff, km: route.roadKm[1], minutes: route.driveMinutes[1],
  }).withVat + AIRPORT_DEPARTURE_SUPPLEMENT_NIS;
  return {
    min: roundNearestTen(minimum),
    max: roundNearestTen(maximum),
    range: `₪${roundNearestTen(minimum)}–${roundNearestTen(maximum)}`,
  };
}

export const shabbatAirportTaxiFareExamples = airportTaxiFareRoutes
  .filter((route) => route.id !== "ein-bokek")
  .map((route) => ({
    id: route.id,
    label: route.label === "Tel Aviv & Jaffa" ? "Tel Aviv" : route.label,
    daytimeB: estimateShabbatFare(route, "B"),
    eveningC: estimateShabbatFare(route, "C"),
    drive: route.travelTime,
  }));

export const shabbatAirportTaxiFareTable = {
  caption: "Illustrative Ben Gurion Airport taxi fares on Shabbat",
  headers: ["Destination", "Saturday daytime · B", "Saturday evening/night · C", "Typical drive"],
  rows: shabbatAirportTaxiFareExamples.map((route) => [
    route.label, route.daytimeB.range, route.eveningC.range, route.drive,
  ]),
  note: "Indicative 2026 meter estimates calculated with Saturday Tariff B (06:00–19:00) and Tariff C (19:00–06:00), route-specific distances and driving times. Friday tariff periods differ: B from 16:00 and C from 21:00. All estimates include 18% VAT and the ₪5 airport departure supplement, but exclude tolls, optional dispatch additions and unexpected traffic. Actual meter fares vary by address, journey and pickup time; these are planning ranges rather than fixed offers.",
} as const;
