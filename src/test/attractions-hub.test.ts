import { describe, expect, it } from "vitest";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions } from "@/data/attractionsHub";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

describe("Attractions hub redesign", () => {
  it("provides seven navigable areas with a picture, genuine guides and onward planning", () => {
    expect(attractionHubRegions).toHaveLength(7);
    expect(new Set(attractionHubRegions.map((region) => region.id)).size).toBe(7);
    for (const region of attractionHubRegions) {
      expect(region.title.length).toBeGreaterThan(4);
      expect(region.summary.length).toBeGreaterThan(35);
      expect(region.image.src).toMatch(/^\/images\/attractions\/.*\.webp$/);
      expect(region.cards.length).toBeGreaterThanOrEqual(2);
      expect(region.planning.length).toBeGreaterThanOrEqual(3);
      expect(region.planning.every((link) => String(link.to).startsWith("/"))).toBe(true);
    }
  });

  it("keeps all original attraction guides without duplicated cards or changed routes", () => {
    const paths = attractionHubCards.map((card) => String(card.to));
    expect(attractionHubCards).toHaveLength(31);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => path.startsWith("/"))).toBe(true);
    for (const id of attractionIds) {
      expect(paths).toContain(attractionPath(id));
    }
    expect(paths).toContain("/attractions/caesarea/");
    expect(paths).toContain("/travel-blog/masada/");
  });

  it("includes Jerusalem shopping and relevant area-specific tour connections", () => {
    const jerusalem = attractionHubRegions.find((region) => region.id === "jerusalem")!;
    expect(jerusalem.cards.some((card) => card.to === travelGuidePaths.jerusalemShopping)).toBe(true);
    expect(jerusalem.cards.find((card) => card.to === travelGuidePaths.jerusalemShopping)?.photo.src)
      .toBe(attractionHubPhotos.shopping.src);
    expect(jerusalem.planning.some((item) => item.to === "/tours/jerusalem/")).toBe(true);
    expect(attractionHubRegions.find((region) => region.id === "haifa-coast")?.planning.some((link) => link.to === "/haifa-shore-excursions/")).toBe(true);
  });

  it("uses locally hosted selected WordPress photographs rather than live legacy image URLs", () => {
    expect(Object.values(attractionHubPhotos)).toHaveLength(11);
    for (const photo of Object.values(attractionHubPhotos)) {
      expect(photo.src).toMatch(/^\/images\/attractions\/.*\.webp$/);
      expect(photo.alt).toBeTruthy();
      expect(photo.sourceFilename).toBeTruthy();
    }
    for (const card of attractionHubCards) {
      expect(card.title).toBeTruthy();
      expect(card.description.length).toBeGreaterThan(20);
      expect(card.photo.src).toBeTruthy();
      expect(card.photo.src).not.toContain("israel-taxi.com");
    }
  });
});
