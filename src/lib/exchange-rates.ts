import { referenceFxConfig, referenceFxSource, type ExchangeRateSnapshot, type ForeignDisplayCurrency } from "@/data/registry";

export type ExchangeRateResult = { rates: ExchangeRateSnapshot | null; status: "fresh" | "cached" | "unavailable" };
export const displayCurrencies: ForeignDisplayCurrency[] = ["USD", "EUR"];
const futureToleranceMs = 5 * 60 * 1000;
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const stamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(stamp) && new Date(stamp).toISOString().slice(0, 10) === value;
}

/** Reject incomplete, implausible, future or expired quotes, including persisted browser data. */
export function isUsableExchangeRates(value: unknown, now = Date.now()): value is ExchangeRateSnapshot {
  if (!record(value) || value["sourceId"] !== referenceFxSource.id || !validDate(value["publishedAt"]) || typeof value["checkedAt"] !== "string" || !record(value["ilsPerUnit"])) return false;
  const published = Date.parse(`${value["publishedAt"]}T00:00:00Z`);
  const checked = Date.parse(value["checkedAt"]);
  if (!Number.isFinite(checked) || checked > now + futureToleranceMs || checked < published || published > now + futureToleranceMs || now - published > referenceFxConfig.maxAgeMs) return false;
  const units = value["ilsPerUnit"];
  return displayCurrencies.every((currency) => {
    const rate = units[currency];
    return typeof rate === "number" && Number.isFinite(rate) && rate > 0 && rate < 1000;
  });
}

export function parseBoiRates(payload: unknown, now = Date.now()): ExchangeRateSnapshot {
  if (!record(payload) || !Array.isArray(payload["exchangeRates"])) throw new Error("Invalid reference-rate response");
  const availableRows = payload["exchangeRates"];
  const rows = displayCurrencies.map((currency) => {
    const matches = availableRows.filter((row: unknown) => record(row) && row["key"] === currency);
    const row: unknown = matches[0];
    if (matches.length !== 1 || !record(row) || row["unit"] !== 1 || typeof row["currentExchangeRate"] !== "number" || typeof row["lastUpdate"] !== "string" || !Number.isFinite(Date.parse(row["lastUpdate"]))) throw new Error(`Missing or invalid ${currency} reference rate`);
    return { currency, amount: row["currentExchangeRate"], date: row["lastUpdate"].slice(0, 10) };
  });
  if (rows[0]!.date !== rows[1]!.date) throw new Error("Reference rates have different publication dates");
  const rates: ExchangeRateSnapshot = { sourceId: referenceFxSource.id, publishedAt: rows[0]!.date, checkedAt: new Date(now).toISOString(), ilsPerUnit: { USD: rows[0]!.amount, EUR: rows[1]!.amount } };
  if (!isUsableExchangeRates(rates, now)) throw new Error("Reference rates are expired or invalid");
  return rates;
}

export function parseExchangeRateResult(value: unknown, now = Date.now()): ExchangeRateResult {
  if (!record(value) || !["fresh", "cached", "unavailable"].includes(String(value["status"]))) throw new Error("Invalid currency response");
  if (value["status"] === "unavailable" && value["rates"] === null) return { rates: null, status: "unavailable" };
  if (!isUsableExchangeRates(value["rates"], now) || value["status"] === "unavailable") throw new Error("Invalid currency data");
  return { rates: value["rates"], status: value["status"] as "fresh" | "cached" };
}

export function convertedAmount(ils: number, currency: ForeignDisplayCurrency, rates: ExchangeRateSnapshot) {
  if (!Number.isFinite(ils) || ils < 0) throw new Error("Invalid ILS amount");
  return Math.round(ils / rates.ilsPerUnit[currency]);
}

export function formatFxDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00Z`));
}
