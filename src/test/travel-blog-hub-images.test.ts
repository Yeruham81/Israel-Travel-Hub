import { sourceFragment } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { guideDirectory, filterGuides, guideTopics } from "@/data/travelGuides";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import {
  travelBlogHubImageSets,
  travelBlogExploreImageSets,
} from "@/data/travelBlogHubResponsivePhotos";

const widths = (srcset: string) =>
  srcset.split(", ").map((part) => Number(part.match(/ (\d+)w$/)?.[1]));

describe("travel-blog index responsive WebP delivery", () => {
  it("maps actual unique photos for the current directory and every topic view", () => {
    expect(guideDirectory.length).toBeGreaterThan(0);
    const requireCompleteMap = process.env["REQUIRE_TRAVEL_BLOG_IMAGE_MAP"] === "1";
    const selectedPhotos = new Set<string>();
    expect(guideDirectory.some((g) => g.id === "eilat")).toBe(false);
    for (const topic of [undefined, ...guideTopics.map((item) => item.id)]) {
      const guides = filterGuides("", topic);
      const pictured = uniqueGuideCardPhotos(guides.map((guide) => ({ guide })));
      const photos = pictured.map((x) => x.cardPhoto?.src).filter((s): s is string => !!s);
      expect(photos).toHaveLength(guides.length);
      expect(new Set(photos).size).toBe(photos.length);
      photos.forEach((photo) => selectedPhotos.add(photo));
      for (const photo of photos) {
        const srcset = travelBlogHubImageSets[photo] ?? "";
        // Additional distinct hero photos are already optimized native WebPs;
        // use the original directly when the historical generated srcSet lacks a mapping.
        if (!srcset && !requireCompleteMap) {
          const file = photo.startsWith("/images/")
            ? "public" + photo
            : photo.startsWith("/src/assets/")
              ? photo.slice(1)
              : "";
          expect(file && existsSync(file), photo).toBeTruthy();
          const bytes = readFileSync(file);
          expect(bytes.subarray(0, 4).toString(), photo).toBe("RIFF");
          expect(bytes.length, photo).toBeLessThan(
            photo.endsWith("/hero-jerusalem.webp") ? 500_000 : 180_000,
          );
          continue;
        }
        expect(srcset, photo).toBeTruthy();
        const desc = widths(srcset);
        expect(
          desc.every((n) => Number.isInteger(n) && n > 0),
          photo,
        ).toBe(true);
        expect(desc, photo).toEqual([...desc].sort((a, b) => a - b));
        expect(new Set(desc).size, photo).toBe(desc.length);
        expect(
          srcset
            .split(", ")
            .at(-1)
            ?.replace(/ \d+w$/, ""),
          photo,
        ).toBe(photo);
      }
    }
    if (requireCompleteMap) {
      expect(Object.keys(travelBlogHubImageSets).sort()).toEqual([...selectedPhotos].sort());
    }
  });

  it("keeps originals, card aspect ratios, unique-photo assignment, filter UI and URLs intact", () => {
    const source = readFileSync("src/routes/travel-blog.index.tsx", "utf8");
    const component = readFileSync("src/components/GuideCard.tsx", "utf8");
    expect(source).toMatch(
      /uniqueGuideCardPhotos\(\s*guides\.map\(\s*\(?guide\)?\s*=>\s*\(\{\s*guide\s*,?\s*\}\)\s*,?\s*\)\s*,?\s*\)/,
    );
    expect(source).toMatch(
      sourceFragment('responsiveSrcSet={travelBlogHubImageSets[cardPhoto?.src ?? ""]}'),
    );
    expect(source).toMatch(sourceFragment("srcSet={travelBlogExploreImageSets[item.photo.src]}"));
    expect(source).toMatch(sourceFragment("href={topicHref(item.id)}"));
    expect(component).toMatch(
      sourceFragment(
        "src={displayedPhoto.src} srcSet={responsiveSrcSet ?? stage5PhotoSrcSet(displayedPhoto.src)}",
      ),
    );
    expect(component).toMatch(sourceFragment("aspect-[3/2] w-full object-cover"));
    expect(source).toContain("GuidePhotoCredit");
    expect(source).toContain("guideDirectory.flatMap");
    expect(Object.keys(travelBlogExploreImageSets).length).toBe(2);
  });
});
