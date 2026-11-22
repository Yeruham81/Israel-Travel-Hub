import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { guideDirectory } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { travelTipsHero } from "@/data/israelTravelTips";
import { deadSeaAttractionsHero } from "@/data/deadSeaAttractionsGuide";
import { christianToursHero } from "@/data/christianToursGuide";

const approved = [
  {
    route: "/travel-blog/museums-in-haifa/",
    photo: migrationPhotos["museums-in-haifa"],
    asset: "haifa-museums-hero.webp",
    component: "HaifaMuseumsGuide",
    marker: 'src={migrationPhotos["museums-in-haifa"].src}',
  },
  {
    route: "/travel-blog/israel-travel-tips/",
    photo: travelTipsHero,
    asset: "israel-travel-tips-hero.webp",
    component: "IsraelTravelTipsGuide",
    marker: "src={travelTipsHero.src}",
  },
  {
    route: "/travel-blog/dead-sea-attractions/",
    photo: deadSeaAttractionsHero,
    asset: "dead-sea-attractions-hero.webp",
    component: "DeadSeaAttractionsGuide",
    marker: "src={deadSeaAttractionsHero.src}",
  },
  {
    route: "/travel-blog/christian-tours-in-israel/",
    photo: christianToursHero,
    asset: "christian-tours-hero.webp",
    component: "ChristianToursGuide",
    marker: "src={christianToursHero.src}",
  },
] as const;

describe("Approved primary images on four upgraded travel guides", () => {
  it.each(approved)("has the exact optimized local WebP cover for $route", ({ photo, asset, component, marker }) => {
    const imagePath = resolve(process.cwd(), "src/assets/guides", asset);
    expect(existsSync(imagePath), asset).toBe(true);
    const bytes = readFileSync(imagePath);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    expect(bytes.length).toBeGreaterThan(10_000);
    expect(bytes.length).toBeLessThan(100_000);
    expect(photo.src).toBeTruthy();
    expect(photo.alt).toBeTruthy();
    const page = readFileSync(resolve(process.cwd(), "src/components", component + ".tsx"), "utf8");
    expect(page).toContain(marker);
  });

  it("uses each page's approved hero unchanged in all directory and related guide cards", () => {
    for (const { route, photo } of approved) {
      const listed = guideDirectory.find(entry => String(entry.to) === route);
      expect(listed, route).toBeDefined();
      expect(listed!.photo?.src, route).toBe(photo.src);
      expect(listed!.photo?.alt, route).toBe(photo.alt);
      const related = guideHeroPhotoForPath(route);
      expect(related?.src, route).toBe(photo.src);
      expect(related?.alt, route).toBe(photo.alt);
    }
  });

  it("keeps four different primary images rather than reusing a cover between pages", () => {
    expect(new Set(approved.map(item => item.photo.src)).size).toBe(approved.length);
  });
});
