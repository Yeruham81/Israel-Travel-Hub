import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initialReferenceFx, referenceFxConfig, type ForeignDisplayCurrency } from "@/data/registry";
import { convertedAmount, displayCurrencies, isUsableExchangeRates, parseExchangeRateResult, type ExchangeRateResult } from "@/lib/exchange-rates";

type CurrencyState = ExchangeRateResult & { loading: boolean };
type StoredRates = ExchangeRateResult & { nextCheckAt: number };
const bootstrap = (): CurrencyState => ({ rates: isUsableExchangeRates(initialReferenceFx) ? initialReferenceFx : null, status: "cached", loading: false });
export const CurrencyRatesContext = createContext<CurrencyState>(bootstrap());

function readStoredRates(): StoredRates | null {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(referenceFxConfig.storageKey) || "null");
    if (!raw || typeof raw !== "object" || !("nextCheckAt" in raw) || typeof raw.nextCheckAt !== "number" || !Number.isFinite(raw.nextCheckAt) || raw.nextCheckAt > Date.now() + referenceFxConfig.refreshMs) return null;
    const data = parseExchangeRateResult(raw);
    return data.rates ? { ...data, nextCheckAt: raw.nextCheckAt } : null;
  } catch { return null; }
}
function storeRates(data: StoredRates) {
  try {
    if (data.rates) localStorage.setItem(referenceFxConfig.storageKey, JSON.stringify(data));
    else localStorage.removeItem(referenceFxConfig.storageKey);
  } catch { /* Conversion remains usable when browser storage is blocked. */ }
}

/** One request shared by every price on a page, with daily refresh across navigation and reloads. */
export function CurrencyRatesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(bootstrap);
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | null = null;
    const stored = readStoredRates();
    const initial = bootstrap();
    let current: ExchangeRateResult = stored?.rates && (!initial.rates || stored.rates.publishedAt >= initial.rates.publishedAt) ? stored : initial;
    let nextCheckAt = current === stored ? stored!.nextCheckAt : 0;
    setState({ ...current, loading: false });

    function schedule() {
      clearTimeout(timer);
      const expiresAt = current.rates ? Date.parse(`${current.rates.publishedAt}T00:00:00Z`) + referenceFxConfig.maxAgeMs + 1 : Infinity;
      if (active) timer = setTimeout(() => {
        if (document.visibilityState !== "hidden") void refresh();
      }, Math.max(1000, Math.min(nextCheckAt, expiresAt) - Date.now()));
    }
    async function refresh() {
      if (!active || controller) return;
      if (Date.now() < nextCheckAt && (!current.rates || isUsableExchangeRates(current.rates))) { schedule(); return; }
      controller = new AbortController();
      const request = controller;
      const timeout = setTimeout(() => request.abort(), referenceFxConfig.timeoutMs + 2000);
      const usable = isUsableExchangeRates(current.rates);
      setState({ rates: usable ? current.rates : null, status: usable ? "cached" : "unavailable", loading: true });
      try {
        const response = await fetch(referenceFxConfig.endpoint, { headers: { Accept: "application/json" }, credentials: "omit", signal: request.signal });
        if (!response.ok) throw new Error("Currency estimates unavailable");
        const text = await response.text();
        if (text.length > 16384) throw new Error("Invalid currency response");
        const data = parseExchangeRateResult(JSON.parse(text));
        if (!data.rates) throw new Error("No usable currency data");
        if (isUsableExchangeRates(current.rates) && data.rates.publishedAt < current.rates.publishedAt) throw new Error("Older currency publication");
        if (!active) return;
        const freshUntil = Date.parse(data.rates.checkedAt) + referenceFxConfig.refreshMs;
        const fresh = data.status === "fresh" && freshUntil > Date.now();
        current = { rates: data.rates, status: fresh ? "fresh" : "cached" };
        nextCheckAt = fresh ? freshUntil : Date.now() + referenceFxConfig.retryMs;
      } catch {
        if (!active) return;
        current = isUsableExchangeRates(current.rates) ? { rates: current.rates, status: "cached" } : { rates: null, status: "unavailable" };
        nextCheckAt = Date.now() + referenceFxConfig.retryMs;
      } finally {
        clearTimeout(timeout);
        controller = null;
        if (active) {
          storeRates({ ...current, nextCheckAt });
          setState({ ...current, loading: false });
          schedule();
        }
      }
    }
    function resume() { if (document.visibilityState !== "hidden") void refresh(); }
    if (Date.now() >= nextCheckAt) void refresh(); else schedule();
    window.addEventListener("focus", resume);
    document.addEventListener("visibilitychange", resume);
    return () => { active = false; clearTimeout(timer); controller?.abort(); window.removeEventListener("focus", resume); document.removeEventListener("visibilitychange", resume); };
  }, []);
  return <CurrencyRatesContext.Provider value={state}>{children}</CurrencyRatesContext.Provider>;
}

const currencyVisuals = {
  ILS: { symbol: "₪", tone: "bg-amber-100 text-amber-900" },
  USD: { symbol: "$", tone: "bg-emerald-100 text-emerald-800" },
  EUR: { symbol: "€", tone: "bg-sky-100 text-sky-800" },
};
function CurrencyIcon({ currency }: { currency: "ILS" | ForeignDisplayCurrency }) {
  const visual = currencyVisuals[currency];
  return <span aria-hidden="true" className={`inline-grid h-5 w-5 shrink-0 place-items-center rounded-full font-sans text-xs font-bold leading-none ${visual.tone}`}>{visual.symbol}</span>;
}

export function PriceDisplay({ amount, size = "card", from = true, className = "" }: { amount: number; size?: "card" | "hero" | "compact"; from?: boolean; className?: string }) {
  const { rates, loading } = useContext(CurrencyRatesContext);
  const available = isUsableExchangeRates(rates);
  return <div className={`min-w-0 ${className}`} data-testid="currency-price" data-ils={amount}>
    <p className={`flex flex-wrap items-center gap-2 font-semibold tabular-nums ${size === "hero" ? "text-3xl" : size === "compact" ? "text-base" : "text-2xl"}`}><CurrencyIcon currency="ILS" /><span>{from ? "From " : ""}ILS {amount.toLocaleString("en-US")}</span></p>
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium tabular-nums text-muted-foreground" aria-label="Approximate foreign-currency equivalents">
      {available ? displayCurrencies.map((currency) => <span key={currency} className="inline-flex items-center gap-1.5 whitespace-nowrap" data-currency={currency}><CurrencyIcon currency={currency} /><span>≈ {currency} {convertedAmount(amount, currency, rates).toLocaleString("en-US")}</span></span>) : <span className="font-normal">{loading ? "Loading currency estimates…" : "USD/EUR estimates unavailable"}</span>}
    </div>
    <p className="mt-1.5 text-[0.65rem] leading-relaxed text-muted-foreground">Estimates only · charged in ILS</p>
  </div>;
}

/** Shared concise pricing disclaimer; FX publication and cache status are kept in data, not displayed. */
export function ExchangeRateNote({ className = "" }: { className?: string }) {
  return <p className={`text-xs leading-relaxed text-muted-foreground ${className}`} data-testid="exchange-rate-note">
    Charged in ILS. USD and EUR amounts are approximate estimates only.
  </p>;
}
