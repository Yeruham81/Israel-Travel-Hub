import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { guideDirectory, filterGuides, guideTopics } from "@/data/travelGuides";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { travelBlogHubImageSets, travelBlogExploreImageSets } from "@/data/travelBlogHubResponsivePhotos";

const widths = (srcset: string) => srcset.split(", ").map(part => Number(part.match(/ (\d+)w$/)?.[1]));

describe("travel-blog index responsive WebP delivery", () => {
  it("maps actual unique photos for the 49-card directory and every topic view", () => {
    expect(guideDirectory).toHaveLength(49);
    for (const topic of [undefined, ...guideTopics.map(item => item.id)]) {
      const guides = filterGuides("", topic);
      const pictured = uniqueGuideCardPhotos(guides.map(guide => ({ guide })));
      const photos = pictured.map(x => x.cardPhoto?.src).filter((s): s is string => !!s);
      expect(new Set(photos).size).toBe(photos.length);
      for (const photo of photos) {
        const srcset = travelBlogHubImageSets[photo] ?? "";
        expect(srcset, photo).toBeTruthy();
        const desc = widths(srcset);
        expect(desc.every(n => Number.isInteger(n) && n > 0), photo).toBe(true);
        expect(desc, photo).toEqual([...desc].sort((a,b) => a-b));
        expect(new Set(desc).size, photo).toBe(desc.length);
        expect(srcset.includes(photo), photo).toBe(true);
      }
    }
  });

  it("keeps originals, card aspect ratios, unique-photo assignment, filter UI and URLs intact", () => {
    const source = readFileSync("src/routes/travel-blog.index.tsx","utf8");
    const component = readFileSync("src/components/TravelGuide.tsx","utf8");
    expect(source).toContain('uniqueGuideCardPhotos(guides.map(guide => ({ guide })))');
    expect(source).toContain('responsiveSrcSet={travelBlogHubImageSets[cardPhoto?.src ?? ""]}');
    expect(source).toContain('srcSet={travelBlogExploreImageSets[item.photo.src]}');
    expect(source).toContain('href={topicHref(item.id)}');
    expect(component).toContain("src={displayedPhoto.src} srcSet={responsiveSrcSet}");
    expect(component).toContain("aspect-[3/2] w-full object-cover");
    expect(source).toContain("GuidePhotoCredit");
    expect(source).toContain("guideDirectory.flatMap");
    expect(Object.keys(travelBlogExploreImageSets).length).toBe(2);
  });
});
