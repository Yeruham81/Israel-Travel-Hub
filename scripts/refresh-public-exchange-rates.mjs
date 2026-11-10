// Public reference rates, refreshed in GitHub Actions without rebuilding or
// republishing the Lovable site. Never store credentials or customer data here.
import { readFile, writeFile } from "node:fs/promises";

const officialUrl = "https://www.boi.org.il/PublicApi/GetExchangeRates?asXml=false";
const mirrorUrl = "https://saddlebrown-guanaco-454061.hostingersite.com/api/exchange-rates/";
const target = "public/data/boi-exchange-rates.json";
const now = new Date();
const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
const toleranceMs = 5 * 60 * 1000;

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`FX source returned HTTP ${response.status}`);
  const body = await response.text();
  if (body.length > 65536) throw new Error("Oversized FX response");
  return JSON.parse(body);
}

function validateRates(rates) {
  const { publishedAt, checkedAt, ilsPerUnit } = rates ?? {};
  if (typeof publishedAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt))
    throw new Error("Invalid FX publication date");
  const published = Date.parse(`${publishedAt}T00:00:00Z`);
  if (!Number.isFinite(published) || new Date(published).toISOString().slice(0, 10) !== publishedAt
    || now.getTime() - published > maxAgeMs || published > now.getTime() + toleranceMs)
    throw new Error("Published FX rates are stale or dated in the future");
  const checked = Date.parse(checkedAt);
  if (!Number.isFinite(checked) || checked < published || checked > now.getTime() + toleranceMs)
    throw new Error("Invalid FX verification timestamp");
  if (!ilsPerUnit || ["USD", "EUR"].some(key =>
    typeof ilsPerUnit[key] !== "number" || !Number.isFinite(ilsPerUnit[key]) || ilsPerUnit[key] <= 0 || ilsPerUnit[key] >= 1000))
    throw new Error("Invalid USD/EUR FX amounts");
  return { publishedAt, checkedAt, ilsPerUnit: { USD: ilsPerUnit.USD, EUR: ilsPerUnit.EUR } };
}

function parseOfficial(body) {
  if (!Array.isArray(body?.exchangeRates)) throw new Error("Invalid Bank of Israel payload");
  const observations = ["USD", "EUR"].map((currency) => {
    const matches = body.exchangeRates.filter(row => row && typeof row === "object" && row.key === currency);
    if (matches.length !== 1) throw new Error(`Missing or duplicate ${currency} observation`);
    const row = matches[0];
    if (row.unit !== 1 || typeof row.currentExchangeRate !== "number"
      || typeof row.lastUpdate !== "string" || !Number.isFinite(Date.parse(row.lastUpdate)))
      throw new Error(`Invalid ${currency} observation`);
    return { date: row.lastUpdate.slice(0, 10), value: row.currentExchangeRate };
  });
  if (observations[0].date !== observations[1].date)
    throw new Error("USD and EUR publication dates disagree");
  return validateRates({
    publishedAt: observations[0].date,
    checkedAt: now.toISOString(),
    ilsPerUnit: { USD: observations[0].value, EUR: observations[1].value },
  });
}

function parseMirror(body) {
  if (body?.rates?.sourceId !== "fx-bank-of-israel" || !["fresh", "cached"].includes(body.status))
    throw new Error("Hostinger did not return verified Bank of Israel rates");
  return validateRates(body.rates);
}

let current;
try {
  current = parseOfficial(await fetchJson(officialUrl));
  console.log("Read current reference rates directly from Bank of Israel");
} catch (error) {
  console.warn("Direct Bank of Israel request failed:", String(error));
  // The existing Hostinger PHP service already refreshes BOI independently.
  // Use it only after fully validating its published data and timestamps.
  current = parseMirror(await fetchJson(mirrorUrl));
  console.log("Read validated Bank of Israel reference rates from Hostinger");
}

const previous = await readFile(target, "utf8").then(JSON.parse).catch(() => null);
if (previous?.rates?.publishedAt && current.publishedAt < previous.rates.publishedAt)
  throw new Error("Refusing to overwrite a newer publication");
if (previous?.rates?.publishedAt === current.publishedAt &&
  previous.rates.ilsPerUnit?.USD === current.ilsPerUnit.USD &&
  previous.rates.ilsPerUnit?.EUR === current.ilsPerUnit.EUR) {
  console.log(`Bank of Israel publication ${current.publishedAt} unchanged`);
  process.exit(0);
}

const output = { rates: { sourceId: "fx-bank-of-israel", ...current }, status: "fresh" };
await writeFile(target, JSON.stringify(output, null, 2) + "\n");
console.log(`Published updated Bank of Israel reference rates: ${current.publishedAt}`);
