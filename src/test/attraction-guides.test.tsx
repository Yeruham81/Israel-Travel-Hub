import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { filterGuides, guideDirectory } from "@/data/travelGuides";
import { routeTree } from "@/routeTree.gen";

describe("17 original attraction destination guides", () => {
  it("defines a complete guide at each unique route without legacy-site links", () => {
    expect(attractionIds).toHaveLength(17);
    expect(new Set(attractionIds).size).toBe(17);
    const router = createRouter({routeTree,context:{queryClient:new QueryClient()},trailingSlash:"always"});
    for (const id of attractionIds) {
      const guide = attractionGuides[id];
      expect(guide.title.length).toBeGreaterThan(22);
      expect(guide.highlights.length).toBeGreaterThanOrEqual(3);
      expect(guide.arrival.length).toBeGreaterThanOrEqual(3);
      expect(guide.faqs.length).toBeGreaterThanOrEqual(3);
      const p = attractionPath(id);
      expect(router.matchRoutes(p).at(-1)?.routeId).not.toBe(rootRouteId);
      expect(attractionMeta(id).links[0]?.href).toContain(p);
      expect(JSON.stringify(guide)).not.toMatch(/israel-taxi\.com|Original guide|legacy source/i);
      expect(guide.official.length).toBeGreaterThan(0);
      expect(guide.official.every(entry => /^https:\/\//.test(entry.url))).toBe(true);
      expect(guide.highlights.every(item => item.name && item.description && item.tip)).toBe(true);
    }
  });
  it("includes the new guides in the directory and its attraction search filter", () => {
    expect(guideDirectory).toHaveLength(65);
    const attractionItems = filterGuides("", "attractions");
    for (const id of attractionIds) {
      expect(attractionItems.some(guide => guide.to === attractionPath(id))).toBe(true);
      expect(guideDirectory.filter(guide => guide.to === attractionPath(id))).toHaveLength(1);
    }
  });
});
