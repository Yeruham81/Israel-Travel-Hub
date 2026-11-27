import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { topTenIsraelHero } from "@/data/topTenExperiences";
import { travelGuides, guideDirectory } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

const route = "/travel-blog/top-10-things-to-do-in-israel/";

describe("Top Ten Israel guide hero and all inbound cards", () => {
  it("uses the approved optimized Sea of Galilee sunset photograph", () => {
    const filename = resolve(process.cwd(), "src/assets/guides/top-ten-israel-hero.webp");
    expect(existsSync(filename)).toBe(true);
    const bytes = readFileSync(filename);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    expect(bytes.length).toBeLessThan(100_000);
    expect(topTenIsraelHero.alt).toContain("Sea of Galilee");
  });

  it("keeps the page hero identical to directory and related guide card images", () => {
    const component = readFileSync(
      resolve(process.cwd(), "src/components/TopTenIsraelGuide.tsx"),
      "utf8",
    );
    expect(component).toContain("src={topTenIsraelHero.src}");
    expect(component).toContain("alt={topTenIsraelHero.alt}");
    expect(travelGuides.topTen.photo).toEqual(topTenIsraelHero);
    expect(guideDirectory.find((entry) => String(entry.to) === route)?.photo).toEqual(
      topTenIsraelHero,
    );
    expect(guideHeroPhotoForPath(route)).toEqual(topTenIsraelHero);
  });
});
