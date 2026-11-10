import { initialReferenceFx, referenceFxConfig, type ExchangeRateSnapshot } from "@/data/registry";
import { isUsableExchangeRates, parseBoiRates, parseExchangeRateResult, type ExchangeRateResult } from "@/lib/exchange-rates";

/** One shared refresh per running server instance; no customer data or API key is needed. */
export function createExchangeRateService({
  fetchImpl = (...args: Parameters<typeof fetch>) => fetch(...args),
  now = () => Date.now(), seed = initialReferenceFx as ExchangeRateSnapshot | null,
  // Only the production singleton uses the Hostinger backup by default;
  // tests can exercise the official source and fallback independently.
  fallbackUrl = null as string | null,
} = {}) {
  let latest = seed;
  let nextCheckAt = 0;
  let lastCheckFailed = true;
  let pending: Promise<ExchangeRateResult> | null = null;
  const result = (): ExchangeRateResult => isUsableExchangeRates(latest, now()) ? { rates: latest, status: lastCheckFailed ? "cached" : "fresh" } : { rates: null, status: "unavailable" };

  async function fetchJson(url: string, maxLength: number): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), referenceFxConfig.timeoutMs);
    try {
      const response = await fetchImpl(url, { headers: { Accept: "application/json" }, signal: controller.signal, credentials: "omit", cache: "no-store", redirect: "error" });
      if (!response.ok) throw new Error("Reference-rate source unavailable");
      const body = await response.text();
      if (body.length > maxLength) throw new Error("Oversized reference-rate response");
      return JSON.parse(body);
    } finally { clearTimeout(timer); }
  }

  function accept(rates: ExchangeRateSnapshot, fresh: boolean) {
    if (isUsableExchangeRates(latest, now()) && rates.publishedAt < latest.publishedAt) throw new Error("Reference-rate publication moved backwards");
    latest = rates;
    lastCheckFailed = !fresh;
    nextCheckAt = now() + (fresh ? referenceFxConfig.refreshMs : referenceFxConfig.retryMs);
  }

  async function refresh(): Promise<ExchangeRateResult> {
    try {
      const rates = parseBoiRates(await fetchJson(referenceFxConfig.upstreamUrl, 65536), now());
      accept(rates, true);
    } catch {
      // Lovable may be unable to fetch the upstream API even while the
      // separately hosted PHP service has valid, current Bank of Israel rates.
      // Fetch server-to-server: browser CORS settings are not relied upon.
      try {
        if (!fallbackUrl) throw new Error("No configured exchange-rate fallback");
        const data = parseExchangeRateResult(await fetchJson(fallbackUrl, 16384), now());
        if (!data.rates) throw new Error("No usable exchange-rate fallback");
        const fresh = data.status === "fresh" && Date.parse(data.rates.checkedAt) + referenceFxConfig.refreshMs > now();
        accept(data.rates, fresh);
      } catch {
        lastCheckFailed = true;
        nextCheckAt = now() + referenceFxConfig.retryMs;
      }
    }
    return result();
  }
  return {
    async get(): Promise<ExchangeRateResult> {
      if (pending) return pending;
      if (now() < nextCheckAt) return result();
      pending = refresh();
      try { return await pending; } finally { pending = null; }
    },
  };
}

const service = createExchangeRateService({ fallbackUrl: referenceFxConfig.fallbackUrl });

export async function exchangeRatesResponse() {
  const data = await service.get();
  const remaining = data.rates ? Math.max(0, Math.floor((Date.parse(data.rates.checkedAt) + referenceFxConfig.refreshMs - Date.now()) / 1000)) : 0;
  return Response.json(data, {
    status: data.status === "unavailable" ? 503 : 200,
    headers: {
      "Cache-Control": data.status === "fresh" ? `public, max-age=${Math.min(300, remaining)}, s-maxage=${Math.min(3600, remaining)}` : "no-store",
      "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow",
      ...(data.status === "fresh" ? {} : { "Retry-After": String(referenceFxConfig.retryMs / 1000) }),
    },
  });
}
