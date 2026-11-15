import { describe, expect, it } from "vitest";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions, attractionPlanningPaths } from "@/data/attractionsHub";
import { readFileSync } from "node:fs";
import { attractionIds, attractionPath, isRegionalOverview } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

describe("Attractions hub redesign", () => {
  it("provides seven navigable areas with a picture, genuine guides and onward planning", () => {
    expect(attractionHubRegions).toHaveLength(7);
    expect(new Set(attractionHubRegions.map((region) => region.id)).size).toBe(7);
    expect(attractionHubRegions.find((region) => region.id === "nazareth-lower-galilee")?.title).toBe("Nazareth & Galilee");
    expect(new Set(attractionHubRegions.map((region) => region.summary)).size).toBe(7);
    for (const region of attractionHubRegions) {
      expect(region.title.length).toBeGreaterThan(4);
      expect(region.summary.length).toBeGreaterThan(35);
      expect(region.summary).toMatch(/^(Wander|Find|Take|Discover|Follow|Float)\b/);
      expect((region.navLabel ?? region.title).length).toBeLessThan(27);
      expect(region.image.src).toMatch(/^\/images\/attractions\/.*\.webp$/);
      expect(region.cards.length).toBeGreaterThanOrEqual(1);
      expect(region.planning.length).toBeGreaterThanOrEqual(3);
      expect(region.planning.every((link) => String(link.to).startsWith("/"))).toBe(true);
    }
  });

  it("keeps internal image provenance out of the public Attractions page", () => {
    const page = readFileSync("src/routes/attractions.index.tsx", "utf8");
    expect(page).not.toContain("WordPress");
    expect(page).not.toContain("original WordPress media library");
    expect(page).not.toContain("<details");
    expect(page).toContain("border border-border/75 bg-secondary/30");
  });

  it("offers six distinct planning pathways with relevant, real internal next steps", () => {
    expect(attractionPlanningPaths).toHaveLength(6);
    expect(new Set(attractionPlanningPaths.map(item => item.id)).size).toBe(6);
    expect(new Set(attractionPlanningPaths.map(item => item.to)).size).toBe(6);
    for (const item of attractionPlanningPaths) {
      expect(item.title.length).toBeGreaterThan(12);
      expect(item.description.length).toBeGreaterThan(75);
      expect(String(item.to).startsWith("/") && String(item.to).endsWith("/")).toBe(true);
      expect(item.links).toHaveLength(2);
      expect(new Set(item.links.map(link => link.to)).size).toBe(2);
      expect(item.links.every(link => String(link.to).startsWith("/"))).toBe(true);
      expect(item.links.every(link => link.to !== item.to)).toBe(true);
    }
    expect(attractionPlanningPaths.find(item => item.id === "hotels")?.to).toBe("/accommodation/");
    expect(attractionPlanningPaths.find(item => item.id === "transport")?.links.some(link => link.to === "/travel-blog/getting-around-israel/")).toBe(true);
  });

  it("keeps all individual attractions on the hub without listing regional overview guides as site cards", () => {
    const paths = attractionHubCards.map((card) => String(card.to));
    expect(attractionHubCards).toHaveLength(20);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => path.startsWith("/"))).toBe(true);
    for (const id of attractionIds) {
      if (isRegionalOverview(id)) expect(paths).not.toContain(attractionPath(id));
      else expect(paths).toContain(attractionPath(id));
    }
    for (const id of ["megiddo", "precipice", "annunciation", "magdala", "yardenit", "qasr"] as const) {
      expect(paths).toContain(travelGuidePaths[id]);
    }
    expect(paths).toContain("/attractions/caesarea/");
    expect(paths).toContain("/attractions/masada/");
    expect(paths.every(path => path.startsWith("/attractions/"))).toBe(true);
  });

  it("keeps overview guides in planning links and individual sites in attraction cards", () => {
    const jerusalem = attractionHubRegions.find((region) => region.id === "jerusalem")!;
    expect(jerusalem.cards.some((card) => card.to === travelGuidePaths.jerusalemShopping)).toBe(false);
    expect(jerusalem.planning.some((item) => item.to === travelGuidePaths.jerusalemShopping)).toBe(true);
    expect(jerusalem.planning.some((item) => item.to === "/tours/jerusalem/")).toBe(true);
    const galilee = attractionHubRegions.find(region => region.id === "sea-of-galilee")!;
    expect(galilee.cards.some(card => card.to === travelGuidePaths.baptism)).toBe(false);
    expect(galilee.planning.some(link => link.to === travelGuidePaths.baptism)).toBe(true);
    expect(attractionHubRegions.find((region) => region.id === "haifa-coast")?.planning.some((link) => link.to === "/shore-excursions/haifa/")).toBe(true);
  });

  it("uses locally hosted selected WordPress photographs rather than live legacy image URLs", () => {
    expect(Object.values(attractionHubPhotos)).toHaveLength(12);
    for (const photo of Object.values(attractionHubPhotos)) {
      expect(photo.src).toMatch(/^\/images\/attractions\/.*\.webp$/);
      expect(photo.alt).toBeTruthy();
      expect(photo.sourceFilename).toBeTruthy();
    }
    for (const card of attractionHubCards) {
      expect(card.title).toBeTruthy();
      expect("category" in card).toBe(false);
      expect(card.description.length).toBeGreaterThan(20);
      expect(card.photo.src).toBeTruthy();
      expect(card.photo.src).not.toContain("israel-taxi.com");
    }
  });
});
