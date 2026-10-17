// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { initialReferenceFx, referenceFxConfig } from "@/data/registry";
import { convertedAmount, isUsableExchangeRates, parseBoiRates, parseExchangeRateResult } from "@/lib/exchange-rates";
import { createExchangeRateService, exchangeRatesResponse } from "@/lib/exchange-rates.server";

const checkTime = Date.parse("2026-10-17T20:00:00Z");
const payload = () => ({ exchangeRates: [
  { key: "USD", unit: 1, currentExchangeRate: 3.089, lastUpdate: "2026-10-16T09:22:04.9223221Z" },
  { key: "EUR", unit: 1, currentExchangeRate: 3.4769, lastUpdate: "2026-10-16T09:22:04.9223221Z" },
] });
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("daily reference exchange rates", () => {
  it("normalizes the official ILS-per-unit response and divides, rounds and formats the reference equivalents", () => {
    const rates = parseBoiRates(payload(), checkTime);
    expect(rates).toEqual({ sourceId: "fx-bank-of-israel", publishedAt: "2026-10-16", checkedAt: "2026-10-17T20:00:00.000Z", ilsPerUnit: { USD: 3.089, EUR: 3.4769 } });
    expect(convertedAmount(550, "USD", rates)).toBe(178);
    expect(convertedAmount(550, "EUR", rates)).toBe(158);
    expect(convertedAmount(330, "USD", rates)).toBe(107);
    expect(() => convertedAmount(NaN, "USD", rates)).toThrow();
  });

  it("rejects missing, duplicate, zero, negative, wrong-unit and mismatched-date observations", () => {
    const missing = payload(); missing.exchangeRates.pop();
    const duplicate = payload(); duplicate.exchangeRates.push({ ...duplicate.exchangeRates[0]! });
    const zero = payload(); zero.exchangeRates[0]!.currentExchangeRate = 0;
    const negative = payload(); negative.exchangeRates[1]!.currentExchangeRate = -3;
    const wrongUnit = payload(); wrongUnit.exchangeRates[0]!.unit = 100;
    const mismatched = payload(); mismatched.exchangeRates[1]!.lastUpdate = "2026-10-15T09:00:00Z";
    for (const bad of [null, {}, missing, duplicate, zero, negative, wrongUnit, mismatched]) expect(() => parseBoiRates(bad, checkTime)).toThrow();
  });

  it("keeps the real publication date through non-publishing days and rejects future, expired or poisoned saved rates", () => {
    expect(isUsableExchangeRates(initialReferenceFx, checkTime + 2 * referenceFxConfig.refreshMs)).toBe(true);
    expect(isUsableExchangeRates(initialReferenceFx, checkTime + 8 * referenceFxConfig.refreshMs)).toBe(false);
    expect(isUsableExchangeRates({ ...initialReferenceFx, checkedAt: "2099-01-01T00:00:00Z" }, checkTime)).toBe(false);
    expect(isUsableExchangeRates({ ...initialReferenceFx, publishedAt: "2026-02-30" }, checkTime)).toBe(false);
    expect(isUsableExchangeRates({ ...initialReferenceFx, sourceId: "unknown" }, checkTime)).toBe(false);
    expect(isUsableExchangeRates({ ...initialReferenceFx, ilsPerUnit: { USD: Infinity, EUR: 3 } }, checkTime)).toBe(false);
    expect(() => parseExchangeRateResult({ rates: initialReferenceFx, status: "live" }, checkTime)).toThrow();
  });

  it("deduplicates simultaneous requests and refreshes once the 24-hour cache expires", async () => {
    let time = checkTime;
    let release!: (value: Response) => void;
    const fetchImpl = vi.fn<typeof fetch>().mockImplementationOnce(() => new Promise<Response>((resolve) => { release = resolve; })).mockImplementation(async () => Response.json(payload()));
    const service = createExchangeRateService({ fetchImpl, now: () => time });
    const first = service.get();
    const second = service.get();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    release(Response.json(payload()));
    const [a, b] = await Promise.all([first, second]);
    expect(a).toEqual(b);
    expect(a.status).toBe("fresh");
    time += referenceFxConfig.refreshMs - 1;
    expect((await service.get()).rates?.checkedAt).toBe("2026-10-17T20:00:00.000Z");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    time += 2;
    expect((await service.get()).rates?.checkedAt).toBe(new Date(time).toISOString());
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl).toHaveBeenCalledWith(referenceFxConfig.upstreamUrl, expect.objectContaining({ credentials: "omit", redirect: "error" }));
  });

  it("uses a dated last-good fallback on source failure without pretending it was updated, then retries after backoff", async () => {
    let time = checkTime;
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValueOnce(new Response("Unavailable", { status: 503 })).mockImplementation(async () => Response.json(payload()));
    const service = createExchangeRateService({ fetchImpl, now: () => time });
    const fallback = await service.get();
    expect(fallback).toEqual({ rates: initialReferenceFx, status: "cached" });
    expect(fallback.rates?.checkedAt).toBe(initialReferenceFx.checkedAt);
    await service.get();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    time += referenceFxConfig.retryMs;
    expect((await service.get()).status).toBe("fresh");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("refuses to replace a newer publication with an older response", async () => {
    let time = checkTime;
    const older = payload(); older.exchangeRates.forEach((row) => { row.lastUpdate = "2026-10-15T09:00:00Z"; });
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValueOnce(Response.json(payload())).mockResolvedValueOnce(Response.json(older));
    const service = createExchangeRateService({ fetchImpl, now: () => time });
    const good = await service.get();
    time += referenceFxConfig.refreshMs;
    const fallback = await service.get();
    expect(fallback.status).toBe("cached");
    expect(fallback.rates).toEqual(good.rates);
  });

  it("returns unavailable when no usable rate remains rather than inventing a conversion", async () => {
    const service = createExchangeRateService({ now: () => checkTime + 8 * referenceFxConfig.refreshMs, fetchImpl: vi.fn<typeof fetch>().mockResolvedValue(Response.json(payload())) });
    expect(await service.get()).toEqual({ rates: null, status: "unavailable" });
  });

  it("times out a stalled source and keeps the request bounded", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(checkTime);
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation((_url, options) => new Promise<Response>((_resolve, reject) => { options!.signal!.addEventListener("abort", () => reject(new Error("Aborted"))); }));
    const service = createExchangeRateService({ fetchImpl, seed: null });
    const result = service.get();
    await vi.advanceTimersByTimeAsync(referenceFxConfig.timeoutMs + 1);
    expect(await result).toEqual({ rates: null, status: "unavailable" });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("serves the public same-origin JSON response with cache/noindex headers and no-store on failure", async () => {
    vi.useFakeTimers(); vi.setSystemTime(checkTime);
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async () => Response.json(payload()));
    vi.stubGlobal("fetch", fetchImpl);
    const fresh = await exchangeRatesResponse();
    expect(fresh.status).toBe(200);
    expect(fresh.headers.get("cache-control")).toContain("s-maxage");
    expect(fresh.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(await fresh.json()).toMatchObject({ status: "fresh", rates: { publishedAt: "2026-10-16" } });
    vi.setSystemTime(checkTime + 8 * referenceFxConfig.refreshMs);
    const unavailable = await exchangeRatesResponse();
    expect(unavailable.status).toBe(503);
    expect(unavailable.headers.get("cache-control")).toBe("no-store");
    expect(unavailable.headers.get("retry-after")).toBe("900");
    expect(await unavailable.json()).toEqual({ rates: null, status: "unavailable" });
  });
});
