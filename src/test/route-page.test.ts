import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { offers, sources, routeFaqs } from "@/data/registry";
import { relFor } from "@/lib/outbound";

describe("registry & routes", () => {
  it("matches the route page and about", () => {
    const r = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const p of ["/travel-blog/ben-gurion-airport-to-jerusalem/", "/about-moshe-barak/"]) {
      expect(r.matchRoutes(p).at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
  it("keeps local inquiries internal and uses HTTPS for other providers, none affiliate", () => {
    for (const o of offers) {
      expect(o.url).toMatch(o.operatorId === "moshe-barak" ? /^\/(?!\/)/ : /^https:\/\//);
      expect(o.isAffiliate).toBe(false);
    }
    expect(sources.every((s) => s.url.startsWith("https://"))).toBe(true);
  });
  it("rel only sponsored for affiliates", () => {
    expect(relFor(false)).toBe("noopener noreferrer");
    expect(relFor(true)).toContain("sponsored");
  });
  it("has 5-7 FAQs and Moshe price capped at 4", () => {
    expect(routeFaqs.length).toBeGreaterThanOrEqual(5);
    expect(routeFaqs.length).toBeLessThanOrEqual(7);
    expect(offers.find((o) => o.operatorId === "moshe-barak")?.price?.maxPartySize).toBe(4);
  });
});
