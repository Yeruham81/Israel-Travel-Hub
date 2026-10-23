import { describe, expect, it } from "vitest";
import { attractionHubRegions, attractionHubCards } from "@/data/attractionsHub";
import { attractionRegionsForTours, regionalAttractionLinks } from "@/data/attractionRegionLinks";
import { tourCategoryPaths } from "@/data/tours";
import { travelGuidePaths } from "@/data/registry";
import { repeatedPhotos } from "@/lib/photo-uniqueness";

describe("Attractions regional scaffold and reciprocal navigation", () => {
  const ids = attractionHubRegions.map(region => region.id);
  const regionalAnchors = Object.values(regionalAttractionLinks).map(region => region.hash);

  it("has one real section per region, without empty or placeholder guide links", () => {
    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(regionalAnchors).size).toBe(7);
    expect([...ids].sort()).toEqual([...regionalAnchors].sort());
    for (const region of attractionHubRegions) {
      expect(region.cards.length).toBeGreaterThanOrEqual(2);
      expect(region.cards.every(card => String(card.to).startsWith("/"))).toBe(true);
      expect(new Set(region.cards.map(card => String(card.to))).size).toBe(region.cards.length);
      expect(region.planning.length).toBeLessThanOrEqual(4);
      expect(region.planning.every(link => String(link.to).startsWith("/"))).toBe(true);
      expect(region.planning.every(link => !region.cards.some(card => link.to === card.to))).toBe(true);
    }
  });

  it("links each appropriate tour category to its real attraction region without creating tour routes", () => {
    for (const [id, links] of Object.entries(attractionRegionsForTours)) {
      expect(id in tourCategoryPaths).toBe(true);
      expect(links?.every(link => ids.includes(link.hash))).toBe(true);
      expect(new Set(links?.map(link => link.hash)).size).toBe(links?.length);
    }
    expect(attractionRegionsForTours["nazareth-galilee"]?.map(link => link.hash)).toEqual([
      "nazareth-lower-galilee", "sea-of-galilee",
    ]);
    expect(attractionRegionsForTours["northern-coast"]?.[0]?.hash).toBe("haifa-coast");
    expect(attractionRegionsForTours["eilat-red-sea"]?.[0]?.hash).toBe("negev-eilat");
    expect(attractionRegionsForTours["bethlehem-jericho"]).toBeUndefined();
  });

  it("provides region-specific arrival and journey links without touching guide article copy", () => {
    const byId = Object.fromEntries(attractionHubRegions.map(region => [region.id, region]));
    expect(byId["tel-aviv-jaffa"]!.planning.some(link => String(link.to).includes("how-to-get-from-ben-gurion-airport-to-tel-aviv"))).toBe(true);
    expect(byId["nazareth-lower-galilee"]!.planning.some(link => link.to === "/private-driver/")).toBe(true);
    expect(byId["dead-sea-masada"]!.planning.some(link => link.to === "/travel-blog/best-dead-sea-hotels/")).toBe(true);
    expect(byId["tel-aviv-jaffa"]!.planning.some(link => link.to === travelGuidePaths.telAvivDayTrips)).toBe(true);
    expect(byId["sea-of-galilee"]!.cards.some(card => card.to === travelGuidePaths.baptism)).toBe(true);
  });

  it("keeps one photograph per distinct card and regional header", () => {
    const photos = [
      ...attractionHubRegions.map(region => region.image.src),
      ...attractionHubCards.map(card => card.photo.src),
    ];
    expect(repeatedPhotos(photos)).toEqual([]);
  });
});
