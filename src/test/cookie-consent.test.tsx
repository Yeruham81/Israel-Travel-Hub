import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { ConsentIframe } from "@/components/ConsentIframe";
import { BookingWidgetFrame } from "@/components/BookingWidgetFrame";
import {
  COOKIE_CONSENT_KEY,
  CONSENT_LIFETIME,
  ALL_CATEGORIES,
  NECESSARY_ONLY,
  hasCookieConsent,
  readStoredConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent";
import { recordOutboundClick, readOutboundClicks } from "@/lib/outbound";
beforeEach(() => {
  saveCookieConsent(NECESSARY_ONLY);
  localStorage.clear();
  window.dispatchEvent(new StorageEvent("storage", { key: COOKIE_CONSENT_KEY }));
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});
describe("whole-site consent", () => {
  it("migrates a former Accept all without inferring advertising consent or extending expiry", () => {
    const expiresAt = Date.now() + 3600000;
    const previous = JSON.stringify({
      version: 1,
      categories: { analytics: true, external: true, marketing: true },
      expiresAt,
    });
    localStorage.setItem(COOKIE_CONSENT_KEY, previous);
    expect(readStoredConsent(localStorage)).toEqual({
      version: 2,
      expiresAt,
      categories: { ...ALL_CATEGORIES, advertising: false },
    });
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(previous);
  });
  it("does not accept a new-schema record without an explicit advertising choice", () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        version: 2,
        categories: { analytics: true, external: true, marketing: true },
        expiresAt: Date.now() + 3600000,
      }),
    );
    expect(readStoredConsent(localStorage)).toBeNull();
  });
  it("keeps advertising separate from analytics, maps and booking widgets", () => {
    const { container } = render(
      <>
        <ConsentIframe src="https://maps.google.com/maps?output=embed" title="Map" />
        <BookingWidgetFrame
          title="Hotel search"
          scriptUrl="https://tpwgt.com/content?campaign_id=84"
        />
      </>,
    );
    act(() => saveCookieConsent({ ...NECESSARY_ONLY, advertising: true }));
    expect(readStoredConsent(localStorage)?.categories).toEqual({
      ...NECESSARY_ONLY,
      advertising: true,
    });
    expect(container.querySelector("iframe[src],iframe[srcdoc]")).toBeNull();
    expect(hasCookieConsent("analytics")).toBe(false);
  });
  it("fails closed for absent, legacy, malformed, expired and invalid category records", () => {
    for (const value of [
      null,
      "oops",
      { choice: "granted", expiresAt: Date.now() + 10000 },
      { version: 1, categories: ALL_CATEGORIES, expiresAt: Date.now() - 1 },
      { version: 1, categories: { analytics: true }, expiresAt: Date.now() + 10000 },
      { version: 1, categories: ALL_CATEGORIES, expiresAt: Date.now() + CONSENT_LIFETIME * 2 },
    ]) {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        typeof value === "string" ? value : JSON.stringify(value),
      );
      expect(readStoredConsent(localStorage)).toBeNull();
    }
    expect(
      readStoredConsent({
        getItem: () => {
          throw Error("blocked");
        },
      }),
    ).toBeNull();
  });
  it("does not expose external URLs to a browser before permission, including server-rendered output", () => {
    const markup = renderToString(
      <ConsentIframe src="https://maps.google.com/maps?output=embed" title="Map" />,
    );
    expect(markup).toContain("data-consent-placeholder");
    expect(markup).not.toMatch(/\ssrc="/);
    const { container } = render(
      <ConsentIframe src="https://maps.google.com/maps?output=embed" title="Map" />,
    );
    expect(container.querySelector("iframe")).not.toHaveAttribute("src");
    expect(screen.getByRole("button", { name: /Cookie settings/ })).toBeVisible();
  });
  it("enables only the selected category and destroys its browsing context on withdrawal", () => {
    const { container } = render(
      <>
        <ConsentIframe src="https://maps.google.com/maps?output=embed" title="Map" />
        <BookingWidgetFrame
          title="Hotel search"
          scriptUrl="https://tpwgt.com/content?campaign_id=84"
        />
      </>,
    );
    act(() => saveCookieConsent({ ...NECESSARY_ONLY, external: true }));
    const activeMap = container.querySelector("iframe[src]")!;
    expect(activeMap).toHaveAttribute("title", "Map");
    expect(container.querySelector("iframe[srcdoc]")).toBeNull();
    act(() => saveCookieConsent({ ...NECESSARY_ONLY, marketing: true }));
    expect(activeMap.isConnected).toBe(false);
    expect(container.querySelector("iframe[src]")).toBeNull();
    const widget = container.querySelector("iframe[srcdoc]")!;
    expect(widget).toHaveAttribute("title", "Hotel search");
    expect(container.querySelector("script")).toBeNull();
    act(() => saveCookieConsent(NECESSARY_ONLY));
    expect(widget.isConnected).toBe(false);
    expect(container.querySelector("iframe[src],iframe[srcdoc]")).toBeNull();
  });
  it("records clicks only with analytics approval and clears records when withdrawn", () => {
    const click = { pageId: "guide", productId: "tour", offerId: "one" };
    recordOutboundClick(click);
    expect(localStorage.getItem("itt_outbound_clicks_v1")).toBeNull();
    saveCookieConsent({ ...NECESSARY_ONLY, analytics: true });
    recordOutboundClick(click);
    expect(readOutboundClicks()).toHaveLength(1);
    saveCookieConsent(NECESSARY_ONLY);
    expect(readOutboundClicks()).toEqual([]);
    expect(localStorage.getItem("itt_outbound_clicks_v1")).toBeNull();
  });
  it("keeps a failed-write rejection effective for this document and removes any older grant", () => {
    saveCookieConsent(ALL_CATEGORIES);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw Error("full");
    });
    saveCookieConsent(NECESSARY_ONLY);
    expect(hasCookieConsent("external")).toBe(false);
    expect(hasCookieConsent("analytics")).toBe(false);
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBeNull();
  });
});
