import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { deadSeaStops, deadSeaMapPoints, deadSeaRouteIdeas, deadSeaFaqs } from "@/data/deadSeaAttractionsGuide";
import { attractionGuides } from "@/data/attractionGuides";

describe("Dead Sea attractions editorial guide", () => {
  it("has ten distinct practical attractions with map links and verified external sources", () => {
    expect(deadSeaStops).toHaveLength(10);
    expect(new Set(deadSeaStops.map(stop => stop.id)).size).toBe(10);
    expect(deadSeaFaqs).toHaveLength(6);
    for (const stop of deadSeaStops) {
      expect(stop.title.length).toBeGreaterThan(12);
      expect(stop.description.length).toBeGreaterThan(90);
      expect(stop.practical.length).toBeGreaterThan(70);
      expect(stop.mapLinks.length).toBeGreaterThan(0);
      expect(stop.mapLinks.every(link => link.query.includes("Israel"))).toBe(true);
      if (stop.official) expect(stop.official.href).toMatch(/^https:\/\//);
      if (stop.guide) expect(stop.guide.to).toMatch(/^\//);
    }
    expect(deadSeaStops.find(stop => stop.id === "einot-tsukim")?.practical).toContain("does not offer access");
    expect(deadSeaStops.find(stop => stop.id === "ein-gedi")?.practical).toContain("restricted");
    expect(deadSeaStops.find(stop => stop.id === "novomeysky")?.practical).toContain("booking");
    expect(attractionGuides["dead-sea-attractions"].title).toContain("Dead Sea Attractions");
  });

  it("uses existing local images or explicit image-free cards when a suitable photo is missing", () => {
    const images=deadSeaStops.flatMap(stop => stop.image ? [stop.image] : []);
    expect(images.length).toBeGreaterThanOrEqual(6);
    expect(new Set(images.map(image => image.src)).size).toBe(images.length);
    expect(images.every(image => image.alt.length > 25)).toBe(true);
    expect(existsSync(resolve(process.cwd(), "public/images/dead-sea-attractions/mount-sodom.webp"))).toBe(true);
  });

  it("maps eight regional orientation points without showing a suggested route", () => {
    expect(deadSeaMapPoints).toHaveLength(8);
    expect(new Set(deadSeaMapPoints.map(point => point.id)).size).toBe(8);
    expect(deadSeaMapPoints.every(point => Number.isFinite(point.lat) && Number.isFinite(point.lon))).toBe(true);
    expect(deadSeaRouteIdeas).toHaveLength(3);
    for (const route of deadSeaRouteIdeas) {
      expect(route.stopIds.length).toBeGreaterThanOrEqual(2);
      for (const id of route.stopIds) expect(deadSeaStops.some(stop => stop.id === id)).toBe(true);
    }
    const map=readFileSync(resolve(process.cwd(), "public/maps/dead-sea-attractions.html"),"utf8");
    expect(map).toContain("places.length !== 8");
    expect(map).toContain("dead-sea-attractions-map-focus");
    expect(map).toContain("dead-sea-attractions-map-selected");
    expect(map).toContain('"place-labels"');
    expect(map).not.toContain("zoom:16.8");
  });

  it("keeps the user-first card layout, compact mobile comparison, two six-card collections and source footer", () => {
    const page=readFileSync(resolve(process.cwd(), "src/components/DeadSeaAttractionsGuide.tsx"),"utf8");
    expect(page).toContain("grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5");
    expect(page).toContain("Show the comparison of all ten experiences");
    expect(page.indexOf('<section id="experiences"')).toBeLessThan(page.indexOf('<section id="area-map"'));
    expect(page).toContain("related.map");
    expect(page).toContain("planning.map");
    expect(page).toContain("HomeContactForm");
    expect(page.indexOf("<HomeContactForm")).toBeLessThan(page.indexOf("<SourcesDisclosure>"));
    expect(page).toContain("Where to Stay in Israel");
    expect(page).not.toContain("israel-taxi.com");
    const route=readFileSync(resolve(process.cwd(),"src/routes/travel-blog.dead-sea-attractions.tsx"),"utf8");
    expect(route).toContain("component: DeadSeaAttractionsGuide");
  });
});
