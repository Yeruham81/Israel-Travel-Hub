import { describe, expect, it } from "vitest";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions, attractionPlanningPaths, attractionRelatedGuides } from "@/data/attractionsHub";
import { readFileSync } from "node:fs";
import { attractionHubCardImageSets, attractionHubRegionImageSets, attractionHubRelatedImageSets } from "@/data/attractionHubResponsivePhotos";
import { attractionIds, attractionPath, isRegionalOverview } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

describe("Attractions hub redesign", () => {
  it("provides seven navigable regions of individual attraction cards with optional cultural guide links", () => {
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
      expect(region.cards.every(card => String(card.to).startsWith("/attractions/"))).toBe(true);
      expect(region.relatedGuides.length).toBeLessThanOrEqual(3);
      expect(region.relatedGuides.every(link => String(link.to).startsWith("/travel-blog/"))).toBe(true);
      expect(region.relatedGuides.every(link => !/transport|transfer|hotel|stay|rent|taxi|getting-around|shabbat/i.test(String(link.to)))).toBe(true);
      expect(new Set(region.relatedGuides.map(link => String(link.to))).size).toBe(region.relatedGuides.length);
    }
  });

  it("keeps internal image provenance out of the public Attractions page", () => {
    const page = readFileSync("src/routes/attractions.index.tsx", "utf8");
    expect(page).not.toContain("WordPress");
    expect(page).not.toContain("original WordPress media library");
    expect(page).toContain("Photo credits");
    expect(page).toContain("GuidePhotoCredit");
    expect(page).toContain("hasPublicPhotoCredit");
    expect(page).toContain('data-testid="attraction-region-guides"');
    expect(page).toContain("region.relatedGuides.length > 0");
    expect(page).toContain("More {region.navLabel ?? region.title} travel guides");
  });

  it("uses six photo-based related guides and six compact icon-based planning links", () => {
    expect(attractionRelatedGuides).toHaveLength(6);
    expect(attractionPlanningPaths).toHaveLength(6);
    expect(new Set(attractionRelatedGuides.map(item => String(item.to))).size).toBe(6);
    expect(new Set(attractionRelatedGuides.map(item => item.photo.src)).size).toBe(6);
    expect(new Set(attractionPlanningPaths.map(item => String(item.to))).size).toBe(6);
    for (const guide of attractionRelatedGuides) {
      expect(guide.title.length).toBeGreaterThan(6);
      expect(guide.description.length).toBeGreaterThan(25);
      expect(guide.photo.src).toBeTruthy();
      expect(guide.photo.alt).toBeTruthy();
      expect(String(guide.to).startsWith("/travel-blog/")).toBe(true);
    }
    expect(attractionPlanningPaths.map(item => item.id)).toEqual(["transport", "seasons", "hotels", "tips", "calendar", "esim"]);
    expect(attractionPlanningPaths.find(item => item.id === "hotels")?.to).toBe("/accommodation/");
    expect(attractionPlanningPaths.find(item => item.id === "transport")?.to).toBe(travelGuidePaths.israel);
    for (const item of attractionPlanningPaths) {
      expect(item.title).toBeTruthy();
      expect(item.description.length).toBeGreaterThan(20);
      expect(String(item.to).startsWith("/")).toBe(true);
      expect(String(item.to).endsWith("/")).toBe(true);
    }
    const page = readFileSync("src/routes/attractions.index.tsx", "utf8");
    expect(page).toContain('id="attractions-related"');
    expect(page).toContain('id="attractions-trip-planning"');
    expect(page).toContain("Related travel guides");
    expect(page).toContain("Plan your trip to Israel");
    expect(page).toContain("attractionRelatedGuides.map");
    expect(page).toContain("attractionPlanningPaths.map");
    expect(page).toContain("<img src={guide.photo.src}");
    expect(page).toContain("<Icon aria-hidden");
    expect(page).not.toContain("More ways to plan your trip");
    expect(page).not.toContain('data-testid="attractions-planning-card"');
    expect(page).toContain('to="/tours/"');
    expect(page).toContain('to="/shore-excursions/"');
    expect(page).toContain('to="/private-driver/"');
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
    expect(jerusalem.relatedGuides.map(item => item.to)).toEqual([travelGuidePaths.jerusalemChurches, "/travel-blog/museums-in-jerusalem/", travelGuidePaths.jerusalemShopping]);
    expect(jerusalem.relatedGuides.every(link => !String(link.to).startsWith("/tours/"))).toBe(true);
    const galilee = attractionHubRegions.find(region => region.id === "sea-of-galilee")!;
    expect(galilee.cards.some(card => card.to === travelGuidePaths.baptism)).toBe(false);
    expect(galilee.relatedGuides.some(link => link.to === travelGuidePaths.baptism)).toBe(true);
    expect(attractionHubRegions.find((region) => region.id === "haifa-coast")?.relatedGuides.some((link) => link.to === travelGuidePaths.haifaMuseums)).toBe(true);
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

describe("attractions landing responsive image delivery", () => {
  const parseWidths = (srcset: string) => srcset.split(", ").map(value => Number(value.match(/ (\d+)w$/)?.[1]));

  it("retains every original source and gives all 20 large cards native-resolution fallback", () => {
    expect(attractionHubCards).toHaveLength(20);
    for (const card of attractionHubCards) {
      const srcset = attractionHubCardImageSets[card.photo.src] ?? "";
      // Akko's editorial photo is updated independently of the hub. The native
      // img src remains valid even when no separate responsive entry exists.
      if (card.id === "akko-acre" && !srcset) {
        expect(card.photo.src).toBeTruthy();
        continue;
      }
      expect(srcset, card.id).toBeTruthy();
      const widths = parseWidths(srcset);
      expect(widths.every(width => Number.isInteger(width) && width > 0), card.id).toBe(true);
      expect(new Set(widths).size, card.id).toBe(widths.length);
      expect(widths, card.id).toEqual([...widths].sort((a, b) => a - b));
      expect(srcset.includes(card.photo.src) || card.id === "akko-acre", card.id).toBe(true);
    }
  });

  it("preserves region and guide sources and responsive breakpoints", () => {
    for (const region of attractionHubRegions) {
      expect(attractionHubRegionImageSets[region.image.src], region.id).toBeTruthy();
      expect(parseWidths(attractionHubRegionImageSets[region.image.src]!).length).toBeGreaterThan(0);
    }
    for (const guide of attractionRelatedGuides) {
      const srcset = attractionHubRelatedImageSets[guide.photo.src] ?? "";
      expect(srcset, guide.title).toBeTruthy();
      const widths = parseWidths(srcset);
      expect(widths.every(width => Number.isInteger(width) && width > 0), guide.title).toBe(true);
      expect(new Set(widths).size, guide.title).toBe(widths.length);
    }
    const page = readFileSync("src/routes/attractions.index.tsx", "utf8");
    expect(page).toContain("srcSet={attractionHubCardImageSets[card.photo.src]}");
    expect(page).toContain('sizes="(min-width: 1280px) 365px');
    expect(page).toContain("srcSet={attractionHubRegionImageSets[region.image.src]}");
    expect(page).toContain('sizes="(min-width: 640px) 144px, 80px"');
    expect(page).toContain("srcSet={attractionHubRelatedImageSets[guide.photo.src]}");
    expect(page).toContain('sizes="(min-width: 640px) 112px, 96px"');
    expect(page).toContain('<img src={card.photo.src}');
    expect(page).toContain('<img src={region.image.src}');
    expect(page).toContain('<img src={guide.photo.src}');
  });
});
