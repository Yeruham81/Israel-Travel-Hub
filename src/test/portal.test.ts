import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { allNavGroups } from "@/data/nav";
import { providerLinks, offers, sources, linksForPage, affiliateConfig, partners } from "@/data/registry";
import { isDisplayableLiveQuote, type LiveQuote } from "@/lib/booking";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });

describe("portal navigation", () => {
  it("every global sidebar link resolves to a real page", () => {
    for (const g of allNavGroups) for (const i of g.items) {
      expect(router.matchRoutes(String(i.to)).at(-1)?.routeId, String(i.to)).not.toBe(rootRouteId);
    }
  });
  it("sidebar includes one-click hotels for Jerusalem, Tel Aviv and Tiberias", () => {
    const hotels = allNavGroups.find((g) => g.title === "Popular hotels")!.items.map((i) => i.label);
    expect(hotels).toEqual(["Hotels in Jerusalem", "Hotels in Tel Aviv", "Hotels in Tiberias"]);
  });
});

describe("booking honesty", () => {
  it("only configured affiliate partners can have sponsored links; no referral claims live prices", () => {
    for (const l of providerLinks) {
      expect(l.mode).not.toBe("live_quote");
      expect(l.url).toMatch(/^https:\/\//);
      if (l.isAffiliate) {
        expect(affiliateConfig[l.id]?.trackingUrl, l.id).toBe(l.url);
        expect(partners.find((partner) => partner.id === l.partnerId)?.capability, l.id).toBe("affiliate_link");
      } else {
        expect(l.url, l.id).not.toMatch(/[?&](aid|affiliate|ref|label)=|\.tpm\.li\//i);
      }
    }
    expect(offers.every((o) => o.mode !== "live_quote")).toBe(true);
  });
  it("Jerusalem ILS 550 rate is not reused on the Tel Aviv route", () => {
    expect(JSON.stringify(linksForPage("tlv-telaviv"))).not.toMatch(/550/);
  });
  it("Bethlehem referral is labeled as a combined Jerusalem and Bethlehem tour", () => {
    const b = linksForPage("bethlehem").find((l) => l.operatorId === "bein-harim")!;
    expect(b.title).toMatch(/Jerusalem and Bethlehem/);
  });
  it("Booking.com city pages are not used as fact sources", () => {
    expect(sources.some((s) => s.url.includes("booking.com"))).toBe(false);
  });
  it("live quote shows only for exact context before expiry", () => {
    const q: LiveQuote = { providerId: "x", context: { productId: "p", date: "2026-11-01", partySize: 2 }, currency: "ILS", basis: "per_vehicle", amount: 300, inclusions: [], fetchedAt: "2026-10-16T10:00:00Z", expiresAt: "2026-10-16T12:00:00Z" };
    const now = new Date("2026-10-16T11:00:00Z");
    expect(isDisplayableLiveQuote(q, { productId: "p", date: "2026-11-01", partySize: 2 }, now)).toBe(true);
    expect(isDisplayableLiveQuote(q, { productId: "p", date: "2026-11-01", partySize: 3 }, now)).toBe(false);
    expect(isDisplayableLiveQuote(q, { productId: "p", date: "2026-11-01", partySize: 2 }, new Date("2026-10-16T13:00:00Z"))).toBe(false);
    expect(isDisplayableLiveQuote(null, { productId: "p", date: "2026-11-01", partySize: 2 }, now)).toBe(false);
  });
});
