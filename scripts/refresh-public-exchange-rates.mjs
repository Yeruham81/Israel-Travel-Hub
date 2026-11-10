// Refresh the public FX snapshot with published representative rates from Bank of Israel.
// This file contains only public rates, never secrets or customer data.
import { readFile, writeFile } from "node:fs/promises";

const source = "https://www.boi.org.il/PublicApi/GetExchangeRates?asXml=false";
const target = "public/data/boi-exchange-rates.json";
const now = new Date();
const response = await fetch(source, {
  headers: { Accept: "application/json" },
  signal: AbortSignal.timeout(15000),
  redirect: "error",
  cache: "no-store",
});
if (!response.ok) throw new Error(`Bank of Israel returned HTTP ${response.status}`);
const text = await response.text();
if (text.length > 65536) throw new Error("Oversized Bank of Israel response");
const body = JSON.parse(text);
if (!Array.isArray(body.exchangeRates)) throw new Error("Missing official exchange-rates array");
const rows = ["USD", "EUR"].map((key) => {
  const matches = body.exchangeRates.filter((row) => row && typeof row === "object" && row.key === key);
  if (matches.length !== 1) throw new Error(`Expected one ${key} reference rate`);
  const row = matches[0];
  const rate = row.currentExchangeRate;
  if (row.unit !== 1 || typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0 || rate >= 1000
    || typeof row.lastUpdate !== "string") throw new Error(`Invalid ${key} reference rate`);
  return { date: row.lastUpdate.slice(0, 10), rate };
});
if (rows[0].date !== rows[1].date || !/^\d{4}-\d{2}-\d{2}$/.test(rows[0].date))
  throw new Error("Inconsistent publication dates");
const publishedAt = rows[0].date;
const stamp = Date.parse(`${publishedAt}T00:00:00Z`);
if (!Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== publishedAt
  || stamp > now.getTime() + 5 * 60 * 1000 || now.getTime() - stamp > 7 * 24 * 60 * 60 * 1000)
  throw new Error("Reference rates are dated in the future or expired");
const prior = await readFile(target, "utf8").then(JSON.parse).catch(() => null);
if (prior?.rates?.publishedAt === publishedAt
  && prior.rates.ilsPerUnit?.USD === rows[0].rate
  && prior.rates.ilsPerUnit?.EUR === rows[1].rate) {
  console.log(`No new Bank of Israel publication since ${publishedAt}`);
  process.exit(0);
}
if (prior?.rates?.publishedAt && publishedAt < prior.rates.publishedAt)
  throw new Error("Refusing to overwrite newer saved rates with older publication");
const output = {
  rates: {
    sourceId: "fx-bank-of-israel",
    publishedAt,
    checkedAt: now.toISOString(),
    ilsPerUnit: { USD: rows[0].rate, EUR: rows[1].rate },
  },
  status: "fresh",
};
await writeFile(target, JSON.stringify(output, null, 2) + "\n");
console.log(`Updated published rates: ${publishedAt}`);
