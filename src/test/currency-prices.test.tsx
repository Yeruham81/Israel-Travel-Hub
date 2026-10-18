import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CurrencyRatesContext, CurrencyRatesProvider, ExchangeRateNote, PriceDisplay } from "@/components/CurrencyRates";
import { initialReferenceFx, referenceFxConfig, type ExchangeRateSnapshot } from "@/data/registry";
import { routeTree } from "@/routeTree.gen";
import { Route as TransfersRoute } from "@/routes/transfers.index";
import { Route as JerusalemRoute } from "@/routes/travel-blog.ben-gurion-airport-to-jerusalem";
import { Route as HaifaShoreRoute } from "@/routes/haifa-shore-excursions";

const checkTime = Date.parse("2026-10-17T20:00:00Z");
const rates = (): ExchangeRateSnapshot => ({ ...initialReferenceFx, checkedAt: new Date().toISOString(), ilsPerUnit: { USD: 4, EUR: 5 } });
const flush = () => act(async () => { await vi.advanceTimersByTimeAsync(0); });
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(checkTime); localStorage.clear(); vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible"); });
afterEach(() => { cleanup(); localStorage.clear(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("international price estimates", () => {
  it("server-renders the ILS charge and rounded estimates with three distinct decorative currency icons", () => {
    const result = { rates: rates(), status: "fresh" as const, loading: false };
    const html = renderToString(<CurrencyRatesContext.Provider value={result}><PriceDisplay amount={550} /><ExchangeRateNote /></CurrencyRatesContext.Provider>);
    expect(html).toContain("ILS ");
    render(<CurrencyRatesContext.Provider value={result}><PriceDisplay amount={550} /><ExchangeRateNote /></CurrencyRatesContext.Provider>);
    const price = screen.getByTestId("currency-price");
    expect(price).toHaveTextContent("From ILS 550");
    expect(price.querySelector('[data-currency="USD"]')).toHaveTextContent("≈ USD 138");
    expect(price.querySelector('[data-currency="EUR"]')).toHaveTextContent("≈ EUR 110");
    expect([...price.querySelectorAll('[aria-hidden="true"]')].map((icon) => icon.textContent)).toEqual(["₪", "$", "€"]);
    expect(new Set([...price.querySelectorAll('[aria-hidden="true"]')].map((icon) => icon.className)).size).toBe(3);
    const note = screen.getByTestId("exchange-rate-note");
    expect(note).toHaveTextContent("Charged in ILS. USD and EUR amounts are approximate estimates only.");
    expect(note).not.toHaveTextContent(/Bank of Israel|dated|Rates are checked daily|last saved rates|temporarily unavailable/i);
    expect(note.querySelector("a, time")).toBeNull();
    expect(html).not.toContain("Bank of Israel");
  });

  it.each([
    { label: "airport hub", path: "/transfers/", route: TransfersRoute, count: 11 },
    { label: "dedicated airport route", path: "/travel-blog/ben-gurion-airport-to-jerusalem/", route: JerusalemRoute, count: 1 },
    { label: "shore-excursion hero and cards", path: "/haifa-shore-excursions/", route: HaifaShoreRoute, count: 5 },
  ])("shows consistent estimates on $label while retaining ILS fares and unpriced inquiries", async ({ path, route, count }) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
    await router.load();
    const Page = route.options.component!;
    const { container } = render(<RouterContextProvider router={router}><CurrencyRatesContext.Provider value={{ rates: rates(), status: "fresh", loading: false }}><Page /></CurrencyRatesContext.Provider></RouterContextProvider>);
    const prices = screen.getAllByTestId("currency-price");
    expect(prices).toHaveLength(count);
    for (const price of prices) {
      const amount = Number(price.dataset["ils"]);
      expect(price).toHaveTextContent(`ILS ${amount.toLocaleString("en-US")}`);
      expect(price.querySelector('[data-currency="USD"]')).toHaveTextContent(`≈ USD ${Math.round(amount / 4).toLocaleString("en-US")}`);
      expect(price.querySelector('[data-currency="EUR"]')).toHaveTextContent(`≈ EUR ${Math.round(amount / 5).toLocaleString("en-US")}`);
      expect(price).toHaveTextContent("charged in ILS");
    }
    if (path === "/transfers/") {
      const other = container.querySelector('[data-destination="other"]')!;
      expect(other).toHaveTextContent("Ask for a quote");
      expect(other.querySelector('[data-testid="currency-price"]')).toBeNull();
    }
  });

  it("shares one request across prices, persists public rates across reloads and refreshes after 24 hours", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async () => Response.json({ rates: rates(), status: "fresh" }));
    vi.stubGlobal("fetch", fetchImpl);
    const content = <CurrencyRatesProvider><PriceDisplay amount={550} /><PriceDisplay amount={330} /><ExchangeRateNote /></CurrencyRatesProvider>;
    const first = render(content);
    await flush();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(referenceFxConfig.endpoint, expect.objectContaining({ credentials: "omit", signal: expect.anything() }));
    expect(screen.getAllByTestId("currency-price")[0]!.querySelector('[data-currency="USD"]')).toHaveTextContent("138");
    const saved = JSON.parse(localStorage.getItem(referenceFxConfig.storageKey)!);
    expect(saved.rates.ilsPerUnit).toEqual({ USD: 4, EUR: 5 });
    expect(Object.keys(saved)).toEqual(["rates", "status", "nextCheckAt"]);
    first.unmount();
    render(content);
    await flush();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await act(async () => { await vi.advanceTimersByTimeAsync(referenceFxConfig.refreshMs + 1); });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId("exchange-rate-note")).not.toHaveTextContent("unavailable");
  });

  it("keeps a dated saved estimate after a failed check and retries without changing the ILS amount", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(new Error("Offline")));
    render(<CurrencyRatesProvider><PriceDisplay amount={550} /><ExchangeRateNote /></CurrencyRatesProvider>);
    await flush();
    expect(screen.getByTestId("currency-price")).toHaveTextContent("ILS 550");
    expect(screen.getByTestId("currency-price").querySelector('[data-currency="USD"]')).toHaveTextContent("178");
    expect(screen.getByTestId("exchange-rate-note")).toHaveTextContent("Charged in ILS. USD and EUR amounts are approximate estimates only.");
    expect(JSON.parse(localStorage.getItem(referenceFxConfig.storageKey)!).rates.checkedAt).toBe(initialReferenceFx.checkedAt);
    await act(async () => { await vi.advanceTimersByTimeAsync(referenceFxConfig.retryMs); });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("hides expired conversions and never shows zero or NaN estimates when data is unavailable", async () => {
    vi.setSystemTime(checkTime + 8 * referenceFxConfig.refreshMs);
    localStorage.setItem(referenceFxConfig.storageKey, JSON.stringify({ rates: initialReferenceFx, status: "fresh", nextCheckAt: Date.now() + referenceFxConfig.refreshMs }));
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(new Response("Unavailable", { status: 503 })));
    render(<CurrencyRatesProvider><PriceDisplay amount={550} /><ExchangeRateNote /></CurrencyRatesProvider>);
    await flush();
    const price = screen.getByTestId("currency-price");
    expect(price).toHaveTextContent("ILS 550");
    expect(price.querySelector('[data-currency="USD"]')).toBeNull();
    expect(price.querySelector('[data-currency="EUR"]')).toBeNull();
    expect(price).not.toHaveTextContent(/NaN|Infinity/);
    expect(screen.getByTestId("exchange-rate-note")).toHaveTextContent("Charged in ILS. USD and EUR amounts are approximate estimates only.");
    expect(localStorage.getItem(referenceFxConfig.storageKey)).toBeNull();
  });

  it("supports blocked browser storage and resumes an overdue check when the visitor returns to the tab", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async () => Response.json({ rates: rates(), status: "fresh" }));
    vi.stubGlobal("fetch", fetchImpl);
    render(<CurrencyRatesProvider><PriceDisplay amount={550} /></CurrencyRatesProvider>);
    await flush();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    vi.setSystemTime(checkTime + referenceFxConfig.refreshMs + 1);
    fireEvent.focus(window);
    await flush();
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(within(screen.getByTestId("currency-price")).getByText("≈ USD 138")).toBeInTheDocument();
  });
});
