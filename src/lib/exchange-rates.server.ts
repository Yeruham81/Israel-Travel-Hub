import { initialReferenceFx, referenceFxConfig, type ExchangeRateSnapshot } from "@/data/registry";
import { isUsableExchangeRates, parseBoiRates, type ExchangeRateResult } from "@/lib/exchange-rates";

/** One shared refresh per running server instance; no customer data or API key is needed. */
export function createExchangeRateService({
  fetchImpl = (...args: Parameters<typeof fetch>) => fetch(...args),
  now = () => Date.now(), seed = initialReferenceFx as ExchangeRateSnapshot | null,
} = {}) {
  let latest = seed;
  let nextCheckAt = 0;
  let lastCheckFailed = true;
  let pending: Promise<ExchangeRateResult> | null = null;
  const result = (): ExchangeRateResult => isUsableExchangeRates(latest, now()) ? { rates: latest, status: lastCheckFailed ? "cached" : "fresh" } : { rates: null, status: "unavailable" };

  async function refresh(): Promise<ExchangeRateResult> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), referenceFxConfig.timeoutMs);
    try {
      const response = await fetchImpl(referenceFxConfig.upstreamUrl, { headers: { Accept: "application/json" }, signal: controller.signal, credentials: "omit", cache: "no-store", redirect: "error" });
      if (!response.ok) throw new Error("Reference-rate source unavailable");
      const body = await response.text();
      if (body.length > 65536) throw new Error("Oversized reference-rate response");
      const rates = parseBoiRates(JSON.parse(body), now());
      if (isUsableExchangeRates(latest, now()) && rates.publishedAt < latest.publishedAt) throw new Error("Reference-rate publication moved backwards");
      latest = rates;
      lastCheckFailed = false;
      nextCheckAt = now() + referenceFxConfig.refreshMs;
    } catch {
      lastCheckFailed = true;
      nextCheckAt = now() + referenceFxConfig.retryMs;
    } finally { clearTimeout(timer); }
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

const service = createExchangeRateService();

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
