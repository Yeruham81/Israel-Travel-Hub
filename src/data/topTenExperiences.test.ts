import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { topTenExperiences, topTenMapRegions, topTenSuggestedRoutes, topTenFaqs } from "@/data/topTenExperiences";
import { travelGuides } from "@/data/travelGuides";

describe("Top 10 Israel experiences guide", () => {
  it("keeps ten unique experience records and compatible SEO data", () => {
    expect(topTenExperiences).toHaveLength(10);
    expect(new Set(topTenExperiences.map(item => item.id)).size).toBe(10);
    expect(topTenFaqs).toHaveLength(6);
    const guide = travelGuides.topTen;
    expect(guide.title).toBe("Top 10 Things to Do in Israel");
    expect(guide.updatedAt).toBe("2026-11-20");
    expect(guide.sections.map(section => section.id)).toEqual(topTenExperiences.map(item => item.id));
    expect(guide.comparison.rows).toHaveLength(10);
    expect(guide.faqs).toEqual(topTenFaqs);
  });

  it("has eleven unique, local and already optimised images", () => {
    const hero = "/images/top-ten-israel/hero.webp";
    const photos = topTenExperiences.map(item => item.photo);
    expect(new Set([hero, ...photos.map(photo => photo.src)]).size).toBe(11);
    for (const image of [hero, ...photos.map(photo => photo.src)]) {
      const file = resolve(process.cwd(), "public" + image);
      expect(existsSync(file), "Missing local photo: " + image).toBe(true);
    }
    expect(photos.every(photo => photo.alt.length >= 25)).toBe(true);
    expect(topTenExperiences.find(item => item.id === "evening")?.photo.src).toContain("evening.webp");
    expect(topTenExperiences.find(item => item.id === "red-sea")?.photo.src).toContain("red-sea.webp");
    expect(topTenExperiences.find(item => item.id === "desert-night")?.photo.src).toContain("desert-night.webp");
  });

  it("uses eight regional map pins without inventing an itinerary route", () => {
    expect(topTenMapRegions).toHaveLength(8);
    expect(new Set(topTenMapRegions.map(region => region.id)).size).toBe(8);
    for (const exp of topTenExperiences) {
      expect(topTenMapRegions.some(region => region.id === exp.mapRegion)).toBe(true);
      expect(exp.guide.to).toMatch(/^\//);
      expect(exp.mapLinks.length).toBeGreaterThan(0);
      for (const location of exp.mapLinks) {
        expect(location.label.length).toBeGreaterThan(2);
        expect(location.query).toContain("Israel");
        expect(location.query).not.toBe("Haifa, Israel");
        expect(location.query).not.toBe("Eilat, Israel");
      }
      expect(exp.official?.href ?? "https://example.org").toMatch(/^https:\/\//);
    }
    expect(topTenExperiences.find(item => item.id === "food")?.mapLinks.map(link => link.label)).toEqual(["Carmel Market", "Mahane Yehuda Market"]);
    expect(topTenMapRegions.every(region => region.markerLabel.length > 0)).toBe(true);
    expect(topTenSuggestedRoutes).toHaveLength(4);
    const map = readFileSync(resolve(process.cwd(), "public/maps/top-ten-israel.html"), "utf8");
    expect(map).toContain("places.length !== 8");
    expect(map).toContain("cluster:true");
    expect(map).toContain("top-ten-israel-map-focus");
    expect(map).toContain("top-ten-israel-map-selected");
    expect(map).toContain('id:"place-labels"');
    expect(map).not.toContain('id:"place-numbers"');
    expect(map).not.toContain("zoom:16.8");
    expect(map).not.toContain("jerusalem-shopping-map-focus");
  });

  it("keeps ten cards, the same responsive comparison table and both six-card guide collections", () => {
    const page = readFileSync(resolve(process.cwd(), "src/components/TopTenIsraelGuide.tsx"), "utf8");
    expect(page).toContain("grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5");
    expect(page).toContain("min-w-[760px]");
    expect(page).not.toContain("hidden w-full table-fixed");
    expect(page).toContain("overflow-x-auto");
    expect(page).not.toContain("Swipe the table sideways to compare all ten experiences.");
    expect(page.indexOf('<section id="experiences"')).toBeLessThan(page.indexOf('<section id="experience-map"'));
    expect(page).toContain("Where to Stay in Israel");
    expect(page).toContain("beach information (Hebrew)");
    expect(page).toContain("topTenSuggestedRoutes.map");
    expect(page).toContain("related.map");
    expect(page).toContain("planning.map");
    expect(page).toContain('ref={mapRef}');
    expect(page).toContain("HomeContactForm showTripadvisorBesidePortraitMobile guide={guideContactCopy");
    expect(page.indexOf("<HomeContactForm")).toBeLessThan(page.indexOf("<SourcesDisclosure>"));
    expect(page).not.toContain("israel-taxi.com");
    expect(page).not.toContain("20" + "27");
  });
});
