import type { ISODate, SourceReference } from "@/data/registry";
export const referenceFxSource: SourceReference = {
  id: "fx-bank-of-israel", title: "Representative exchange rates", publisher: "Bank of Israel",
  url: "https://www.boi.org.il/en/economic-roles/financial-markets/explanatory-notes-to-the-representative-exchange-rates/",
  checkedAt: "2026-10-17", note: "Official reference rates are published on foreign-currency business days. Payment is in ILS; USD/EUR equivalents are approximate estimates only. Daily API refreshes record their own publication/check times.",
};
export const referenceFxConfig = {
  upstreamUrl: "https://www.boi.org.il/PublicApi/GetExchangeRates?asXml=false",
  // The owner's separately maintained Hostinger PHP endpoint is a verified
  // server-side fallback when another hosting runtime cannot reach Bank of Israel.
  // Update this URL if the Hostinger staging domain is retired.
  fallbackUrl: "https://saddlebrown-guanaco-454061.hostingersite.com/api/exchange-rates/",
  // Browser-readable official-rate snapshot, refreshed independently by GitHub Actions.
  // This avoids relying on server-to-server access from Lovable's runtime.
  publicSnapshotUrl: "https://raw.githubusercontent.com/Yeruham81/Israel-Travel-Hub/main/public/data/boi-exchange-rates.json",
  localSnapshotUrl: "/data/boi-exchange-rates.json",
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
