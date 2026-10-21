/**
 * Regulated Israeli taxi meter fares, 2026 order (gov.il "taxi-rate-26.pdf").
 * In force from 1 April 2026; temporary rates until 31 March 2027 unless amended.
 * Amounts are ILS. Calculations use the pre-VAT amounts and apply VAT once.
 */
export type TaxiTariff = "A" | "B" | "C";

export const TAXI_FARE_EFFECTIVE_FROM = "2026-04-01";
export const TAXI_FARE_VALID_UNTIL = "2027-03-31";
export const TAXI_FARE_VERIFIED_AT = "2026-10-22";
export const TAXI_VAT_RATE = 0.18;
/** Distance threshold after which the higher per-kilometre amount applies. */
export const TAXI_KM_THRESHOLD = 10;

export const taxiFaresPreVat = {
  start: 10.56,
  perMinute: { A: 1.65, B: 1.98, C: 2.31 },
  perKmFirst10: { A: 1.65, B: 1.98, C: 2.31 },
  perKmBeyond10: { A: 3.21, B: 3.54, C: 3.87 },
  waitingPerHour: { A: 99, B: 118.8, C: 138 },
  orderedTaxi: 4.9,
} as const;

/** Rounded consumer prices including VAT, as published with the order. */
export const taxiFaresWithVat = {
  start: 12.46,
  perMinute: { A: 1.95, B: 2.34, C: 2.73 },
  perKmFirst10: { A: 1.95, B: 2.34, C: 2.73 },
  perKmBeyond10: { A: 3.79, B: 4.18, C: 4.57 },
  waitingPerHour: { A: 116.82, B: 140.18, C: 162.84 },
  orderedTaxi: 5.78,
} as const;

/**
 * Hypothetical meter total (time + distance) excluding dispatch addition, tolls
 * and other permitted extras. Kilometres beyond 10 are charged ONLY at the
 * higher rate — the first-10 rate is never added to them as well.
 */
export function meteredFareEstimate({ tariff, km, minutes }: { tariff: TaxiTariff; km: number; minutes: number }) {
  if (km < 0 || minutes < 0) throw new Error("Distance and time must be non-negative");
  const f = taxiFaresPreVat;
  const firstKm = Math.min(km, TAXI_KM_THRESHOLD);
  const extraKm = Math.max(km - TAXI_KM_THRESHOLD, 0);
  const preVat = f.start + firstKm * f.perKmFirst10[tariff] + extraKm * f.perKmBeyond10[tariff] + minutes * f.perMinute[tariff];
  const withVat = preVat * (1 + TAXI_VAT_RATE);
  return { preVat: Math.round(preVat * 100) / 100, withVat: Math.round(withVat * 100) / 100 };
}

const ils = (n: number) => `₪${n.toFixed(2)}`;

export const fareExamples = [
  { id: "a-short", label: "Tariff A, 5 km in 15 minutes", tariff: "A" as const, km: 5, minutes: 15,
    working: `(10.56 + 5 × 1.65 + 15 × 1.65) × 1.18` },
  { id: "b-longer", label: "Tariff B, 12 km in 25 minutes", tariff: "B" as const, km: 12, minutes: 25,
    working: `(10.56 + 10 × 1.98 + 2 × 3.54 + 25 × 1.98) × 1.18` },
].map((example) => ({ ...example, total: meteredFareEstimate(example).withVat }));

export const consumerFareTable = {
  caption: "Official taxi meter prices from 1 April 2026 (ILS, including 18% VAT)",
  headers: ["Charge", "Tariff A", "Tariff B", "Tariff C"],
  rows: [
    ["Starting meter (initial charge)", ils(taxiFaresWithVat.start), ils(taxiFaresWithVat.start), ils(taxiFaresWithVat.start)],
    ["Per minute of travel", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresWithVat.perMinute[t]))],
    ["Per km, first 10 km", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresWithVat.perKmFirst10[t]))],
    ["Per km, beyond 10 km", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresWithVat.perKmBeyond10[t]))],
    ["Waiting at passenger's request, per hour", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresWithVat.waitingPerHour[t]))],
    ["Ordered taxi (dispatch) addition", ils(taxiFaresWithVat.orderedTaxi), ils(taxiFaresWithVat.orderedTaxi), ils(taxiFaresWithVat.orderedTaxi)],
  ],
  note: "Rounded consumer amounts as published with the 2026 order. Temporary rates valid until 31 March 2027 unless amended. Tolls and other permitted additions are charged separately.",
};

export const preVatFareTable = {
  caption: "The same 2026 amounts before VAT (ILS)",
  headers: ["Charge", "Tariff A", "Tariff B", "Tariff C"],
  rows: [
    ["Starting meter", ils(taxiFaresPreVat.start), ils(taxiFaresPreVat.start), ils(taxiFaresPreVat.start)],
    ["Per minute", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresPreVat.perMinute[t]))],
    ["Per km, first 10 km", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresPreVat.perKmFirst10[t]))],
    ["Per km, beyond 10 km", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresPreVat.perKmBeyond10[t]))],
    ["Waiting, per hour", ...(["A", "B", "C"] as const).map((t) => ils(taxiFaresPreVat.waitingPerHour[t]))],
    ["Ordered taxi addition", ils(taxiFaresPreVat.orderedTaxi), ils(taxiFaresPreVat.orderedTaxi), ils(taxiFaresPreVat.orderedTaxi)],
  ],
  note: "Useful for checking arithmetic: VAT at 18% is applied once to the total, so results can differ by a few agorot from adding the rounded consumer amounts.",
};

export const tariffHoursTable = {
  caption: "When each tariff applies (Israel local time)",
  headers: ["Day", "Tariff A", "Tariff B", "Tariff C"],
  rows: [
    ["Sunday–Wednesday", "06:00–21:00", "21:00–06:00", "—"],
    ["Thursday", "06:00–21:00", "21:00–23:00", "23:00–06:00"],
    ["Friday and holiday eve", "06:00–16:00", "16:00–21:00", "21:00–06:00"],
    ["Saturday and recognized holidays", "—", "06:00–19:00", "19:00–06:00"],
  ],
  note: "Overnight periods run until 06:00 the next morning. Schedule per the 2018 tariff decision, still referenced by the 2026 order.",
};
