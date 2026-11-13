import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

const broadHubs = [
  "src/routes/transfers.index.tsx",
  "src/routes/tours.index.tsx",
  "src/routes/attractions.index.tsx",
  "src/routes/shore-excursions.tsx",
  "src/routes/accommodation.tsx",
] as const;

const focusedPages = [
  "src/components/AirportRoutePage.tsx",
  "src/components/TourCategoryPage.tsx",
  "src/components/AttractionGuidePage.tsx",
  "src/components/PortPage.tsx",
  "src/components/Guide.tsx",
] as const;

describe("consistent top-of-page layout for service and discovery hubs", () => {
  it("gives all five broad overviews the same image-free heading component", () => {
    for (const file of broadHubs) {
      const src = read(file);
      expect(src, file).toContain("<HubHeader");
      expect(src.match(/<h1\b/g), file).toBeNull();
      expect(src, file).not.toMatch(/<header[^>]*grid[^>]*>/);
    }
    const hub = read("src/components/Guide.tsx");
    expect(hub).toContain('data-testid="hub-header"');
    expect(hub).toContain('<h1 className="guide-page-title mt-3 max-w-4xl">');
    expect(hub).toContain('data-guide-intro');
  });

  it("keeps concise and useful opening paragraphs rather than long promotional banners", () => {
    for (const file of broadHubs) {
      const src = read(file);
      const intro = src.match(/\bintro="([^"]+)"/)?.[1];
      expect(intro, file).toBeDefined();
      expect(intro!.length, file).toBeLessThanOrEqual(200);
    }
  });

  it("retains compact, relevant side images on focused destinations and service pages", () => {
    for (const file of focusedPages) {
      const src = read(file);
      expect(src, file).toContain("<GuideHeroLayout");
      expect(src, file).toContain("<GuideHeroMedia");
    }
    const media = read("src/components/GuideHeroMedia.tsx");
    expect(media).toContain("lg:max-h-[260px]");
    expect(media).toContain("lg:aspect-[4/3]");
    expect(read("src/components/AttractionGuidePage.tsx")).not.toContain("caption={id ===");
  });

  it("preserves the unique photographic design of the main homepage", () => {
    expect(read("src/components/HomeHero.tsx")).toContain("<HeroCarousel");
  });
});
