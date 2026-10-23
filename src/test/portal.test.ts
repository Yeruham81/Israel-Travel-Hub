import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { allNavGroups, hotelNav, serviceNav, utilityNav, footerNav } from "@/data/nav";
import { attractionHubRegions } from "@/data/attractionsHub";
import { providerLinks, offers, sources, linksForPage, affiliateConfig, partners } from "@/data/registry";
import { isDisplayableLiveQuote, type LiveQuote } from "@/lib/booking";

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });

describe("portal navigation", () => {
  it("every internal sidebar link resolves to a real page and every service remains reachable", () => {
    const internal = [...utilityNav, ...footerNav, ...allNavGroups.flatMap((g) => g.items.flatMap((item) => [item, ...("children" in item ? item.children || [] : [])])).filter((item) => "to" in item)];
    for (const item of internal) {
      const match = router.matchRoutes(String(item.to)).at(-1);
      expect(match?.routeId, String(item.to)).toBeTruthy();
      expect(match?.routeId, String(item.to)).not.toBe(rootRouteId);
    }
    for (const item of serviceNav) expect(internal.some((link) => link.to === item.to), item.label).toBe(true);
  });
  it("organizes attractions and religious sites without the removed popular-links group", () => {
    expect(allNavGroups.map((group) => group.title)).toEqual([
      "Transportation", "Tours & trips", "Accommodation", "Attractions", "Religious sites", "Travel guides & tips",
    ]);
    const attractions = allNavGroups.find((group) => group.title === "Attractions")!.items;
    expect(attractions).toHaveLength(8);
    expect(attractions[0]).toMatchObject({ label: "All attractions", to: "/attractions/" });
    for (const [index, region] of attractionHubRegions.entries()) {
      const group = attractions[index + 1];
      expect(group).toMatchObject({
        label: region.navLabel ?? region.title,
        toggleOnly: true,
        childrenLabel: `${region.title} guides`,
      });
      if (!("children" in group!) || !group.children) throw new Error("Attraction region has no guide links");
      expect(group.children.map((child) => child.to)).toEqual(region.cards.map((card) => card.to));
    }
    const religiousSites = allNavGroups.find((group) => group.title === "Religious sites")!.items;
    for (const path of ["mount-zion", "mount-of-olives", "basilica-of-the-annunciation", "mount-precipice", "mount-tabor", "magdala", "capernaum", "tabgha", "mount-of-beatitudes", "yardenit", "qasr-el-yahud"]) {
      expect(religiousSites).toContainEqual(expect.objectContaining({ to: `/travel-blog/${path}/` }));
    }
  });
  it("sidebar includes one-click hotel guides for every destination covered", () => {
    const accommodation = allNavGroups.find((g) => g.title === "Accommodation")!.items;
    expect(accommodation).toEqual(expect.arrayContaining(hotelNav));
    expect(hotelNav.map((item) => item.label)).toEqual(["Hotels in Jerusalem", "Hotels in Tel Aviv", "Hotels in Tiberias", "Hotels in Haifa", "Dead Sea hotels"]);
  });
  it("links all seven migrated practical guides internally", () => {
    const group = allNavGroups.find((item) => item.title === "Travel guides & tips")!;
    const links = group.items.filter((item) => "to" in item).map((item) => item.to);
    expect(links).toContain("/guides/");
    for (const path of ["uber-in-israel", "sherut-in-israel", "best-esim-for-israel", "ben-gurion-airport-arrival-tips", "getting-around-israel", "getting-around-tel-aviv", "taxis-in-israel"]) expect(links).toContain(`/travel-blog/${path}/`);
    expect(group.items.some((item) => "href" in item)).toBe(false);
  });
});

describe("booking honesty", () => {
  it("only configured affiliate partners can have sponsored links; no referral claims live prices", () => {
    for (const l of providerLinks) {
      expect(l.mode).not.toBe("live_quote");
      if (l.relationship === "publisher_operator") {
        expect(l.url).toMatch(/^\/(?!\/)/);
        expect(router.matchRoutes(l.url.split("#")[0]!).at(-1)?.routeId, l.id).not.toBe(rootRouteId);
      } else {
        expect(l.url).toMatch(/^https:\/\//);
      }
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
