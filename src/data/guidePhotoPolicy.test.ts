import {existsSync, readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {guideDirectory, travelGuides} from "@/data/travelGuides";
import {travelGuidePaths} from "@/data/registry";
import {guideHeroPhotoForPath} from "@/lib/guide-hero-photos";
import {uniqueGuideCardPhotos} from "@/lib/guide-card-photos";

const retired = ["/travel-blog/day-trips-from-jerusalem/", "/travel-blog/day-trips-from-tel-aviv/"];

describe("guide cards always use the destination hero image", () => {
  it("removes the two retired day-trip guides and their route declarations", () => {
    for (const route of retired) {
      expect(guideDirectory.some(g => String(g.to) === route)).toBe(false);
      expect(Object.values(travelGuidePaths).includes(route as never)).toBe(false);
      expect(existsSync("src/routes/travel-blog." + route.split("/").filter(Boolean).at(-1) + ".tsx")).toBe(false);
    }
    expect("jerusalemDayTrips" in travelGuides).toBe(false);
    expect("telAvivDayTrips" in travelGuides).toBe(false);
  });

  it("never substitutes section images for the primary cover in a guide card", () => {
    const cards = uniqueGuideCardPhotos(guideDirectory.map(guide => ({guide})));
    for (const {guide, cardPhoto} of cards) {
      expect(cardPhoto?.src, guide.id).toBe(guide.photo?.src);
      expect(cardPhoto?.alt, guide.id).toBe(guide.photo?.alt);
    }
  });

  it("finds a primary image for each hand-curated related guide card", () => {
    for (const target of [
      "/travel-blog/jerusalem-travel-guide/", "/attractions/old-city-jerusalem/",
      "/travel-blog/where-to-stay-in-jerusalem/", "/travel-blog/shopping-in-jerusalem/",
      "/travel-blog/churches-in-jerusalem/", "/travel-blog/jerusalem-to-bethlehem/",
      "/travel-blog/attractions-in-tel-aviv/", "/attractions/jaffa/",
      "/travel-blog/getting-around-tel-aviv/", "/travel-blog/beaches-in-tel-aviv/",
      "/travel-blog/where-to-stay-in-tel-aviv/", "/travel-blog/best-time-to-visit-israel/",
      "/travel-blog/calendar-of-events/", "/travel-blog/museums-in-tel-aviv/",
      "/travel-blog/israel-travel-tips/",
      ...["3","5","7","10"].map(id => "/travel-blog/israel-itinerary-" + id + "-days/"),
    ]) expect(guideHeroPhotoForPath(target)?.src, target).toBeTruthy();
  });

  it("flags exact primary-photo reuse across different guide pages", () => {
    const seen = new Map<string,string[]>();
    for (const guide of guideDirectory) {
      const src = guide.photo?.src;
      expect(src, "Missing primary image for " + guide.id).toBeTruthy();
      if (!src) continue;
      const routes = seen.get(src) ?? [];
      routes.push(String(guide.to));
      seen.set(src, routes);
    }
    const collisions = [...seen.entries()].filter(([,paths]) => new Set(paths).size > 1)
      .map(([src,paths]) => ({src, paths}));
    expect(collisions).toEqual([]);
  });

  it("guards the source mapping and deleted day-trip links", () => {
    const cardSource = readFileSync("src/lib/guide-card-photos.ts", "utf8");
    expect(cardSource).toContain("entry.guide.photo");
    expect(cardSource).not.toContain("sections.flatMap");
    const files = [
      "src/components/JerusalemMuseumsGuide.tsx",
      "src/components/TelAvivMuseumsGuide.tsx",
      "src/components/TelAvivBeachesGuide.tsx",
      "src/components/TelAvivAttractionsGuide.tsx",
      "src/data/airportJourneyGuides.ts",
      "src/data/travelGuideExpansion.ts",
      "src/data/jerusalemClusterEditorial.ts",
      "src/components/JerusalemClusterLinks.tsx",
    ];
    for (const file of files) {
      const contents = readFileSync(file, "utf8");
      for (const route of retired) expect(contents, file).not.toContain(route);
    }
  });
});
