import { describe, expect, it } from "vitest";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "@/routeTree.gen";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { itineraryIds, itineraries, itinerarySourcesByGuide } from "@/data/israelItineraries";
import { itineraryCards } from "@/data/hotelHub";
import { guideDirectory } from "@/data/travelGuides";
import { allNavGroups } from "@/data/nav";

const file = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("migrated Israel itineraries", () => {
  it("preserves the four legacy slugs as new independent article routes", () => {
    expect(itineraryIds).toEqual(["3", "5", "7", "10"]);
    for (const id of itineraryIds) {
      const guide = itineraries[id];
      expect(guide.days).toBe(Number(id));
      expect(guide.path).toBe(`/travel-blog/israel-itinerary-${id}-days/`);
      expect(file(`src/routes/travel-blog.israel-itinerary-${id}-days.tsx`)).toContain(`itineraryMeta("${id}")`);
      expect(guide.daysPlan).toHaveLength(guide.days);
      expect(new Set(guide.daysPlan.map(d => d.name)).size).toBe(guide.days);
      expect(guide.description.length).toBeGreaterThan(95);
    }
  });

  it("answers separate trip-length search intents with distinct hotel and itinerary decisions", () => {
    expect(itineraries["3"].intro).toMatch(/three full sightseeing days/i);
    expect(itineraries["5"].intro).toMatch(/five full days/i);
    expect(itineraries["7"].intro).toMatch(/week/i);
    expect(itineraries["10"].intro).toMatch(/Eilat and Timna/i);
    expect(itineraries["3"].hotelBases).not.toEqual(itineraries["7"].hotelBases);
    expect(itineraries["7"].hotelBases).not.toEqual(itineraries["10"].hotelBases);
    for (const guide of Object.values(itineraries)) {
      expect(guide.alternatives.length).toBeGreaterThanOrEqual(3);
      expect(guide.logistics.length).toBeGreaterThanOrEqual(3);
      for (const day of guide.daysPlan) {
        for (const item of ["morning", "afternoon", "practical"] as const)
          expect(day[item].length).toBeGreaterThanOrEqual(40);
        expect(day.evening.length).toBeGreaterThanOrEqual(20);
        expect(day.overnight.length).toBeGreaterThanOrEqual(15);
        expect(day.links.length).toBeGreaterThanOrEqual(2);
        for (const link of day.links) expect(link.to).toMatch(/^\//);
      }
    }
  });

  it("does not misrepresent numbered map pins as a driving route", () => {
    const mapViewer = file("public/maps/area.html");
    expect(mapViewer).toContain('params.get("waypoints")');
    expect(mapViewer).toContain("el.textContent");
    for (const guide of Object.values(itineraries)) {
      expect(guide.map.points.length).toBeGreaterThanOrEqual(3);
      expect(guide.map.points.length).toBeLessThanOrEqual(12);
      const [west, south, east, north] = guide.map.bounds;
      for (const point of guide.map.points) {
        expect(point.lon).toBeGreaterThanOrEqual(west);
        expect(point.lon).toBeLessThanOrEqual(east);
        expect(point.lat).toBeGreaterThanOrEqual(south);
        expect(point.lat).toBeLessThanOrEqual(north);
      }
    }
  });

  it("uses local hotel hub cards and the guide directory without links to the old website", () => {
    expect(itineraryCards).toHaveLength(4);
    for (const id of itineraryIds) {
      expect(itineraryCards.find(card => card.id === id)?.to).toBe(itineraries[id].path);
      expect(guideDirectory.find(item => item.id === `israel-itinerary-${id}`)?.to).toBe(itineraries[id].path);
    }
    expect(file("src/routes/accommodation.tsx")).not.toContain("trip.href");
    expect(file("src/data/hotelHub.ts")).not.toContain("LEGACY_ITINERARY_ORIGIN");
  });

  it("keeps day-by-day internal destination links resolvable", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const guide of Object.values(itineraries)) {
      for (const day of guide.daysPlan) for (const link of day.links) {
        const path = link.to as string;
        expect(router.matchRoutes(path).at(-1)?.routeId, `${guide.id}: ${path}`).not.toBe(rootRouteId);
      }
      for (const info of [...guide.alternatives, ...guide.logistics]) if (info.to) {
        expect(router.matchRoutes(info.to as string).at(-1)?.routeId, `${guide.id}: ${info.to}`).not.toBe(rootRouteId);
      }
    }
  });

  it("has a focused, bookable-through-guides three-day plan without intrusive affiliate links", () => {
    const three = itineraries["3"];
    expect(three.overviewRows).toHaveLength(3);
    expect(three.beforeYouGo?.length).toBeGreaterThanOrEqual(4);
    expect(three.relatedGuides).toHaveLength(6);
    expect(three.hero).not.toEqual(three.daysPlan[0]?.image);

    const related = three.relatedGuides ?? [];
    expect(new Set(related.map(item => item.to)).size).toBe(related.length);
    expect(new Set(related.map(item => item.image)).size).toBe(related.length);
    expect(three.daysPlan[1]?.links.some(link => link.to === "/tours/masada-dead-sea/")).toBe(true);
    expect(three.logistics.some(tip => tip.to === "/car-rental/")).toBe(true);
    expect(three.logistics.some(tip => tip.to === "/travel-blog/where-to-stay-in-jerusalem/")).toBe(true);

    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const link of [...related, ...(three.beforeYouGo ?? [])].filter(item => item.to)) {
      const path = link.to as string;
      expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
    expect(itinerarySourcesByGuide["3"].some(item => /Bahá/i.test(item.label))).toBe(false);
    expect(itinerarySourcesByGuide["3"].some(item => /Masada/i.test(item.label))).toBe(true);
    for (const id of itineraryIds) {
      expect(itinerarySourcesByGuide[id].length).toBeGreaterThanOrEqual(3);
    }

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain("Related practical guides");
    expect(view).toContain("Daily route and hotel bases");
    expect(view).toContain("<SourcesDisclosure>");
    expect(view.indexOf("<HomeContactForm")).toBeLessThan(view.indexOf("<SourcesDisclosure>"));
  });

  it("has contextual navigation and a generated route-tree entry for every itinerary", () => {
    const sidebar = allNavGroups.find(g => g.title === "Travel guides");
    expect(sidebar?.items.some(item => item.label === "Israel itineraries")).toBe(true);
    const tree = file("src/routeTree.gen.ts");
    for (const id of itineraryIds) {
      expect(tree).toContain(`'/travel-blog/israel-itinerary-${id}-days'`);
    }
  });
});
