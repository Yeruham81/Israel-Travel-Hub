import { describe, expect, it } from "vitest";
import { mkdirSync, writeFileSync } from "node:fs";
import { filterGuides, guideDirectory, guideTopics } from "@/data/travelGuides";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";

/**
 * Generates the exact set of photos that /travel-blog/ can render after
 * unique-image assignment, including every selectable topic filter.
 * This intentionally runs inside Vite/Vitest to resolve the site's real
 * bundled image imports, rather than guessing filenames from its TS source.
 */
describe("capture travel blog hub image sources", () => {
  it.skipIf(process.env.WRITE_TRAVEL_BLOG_MANIFEST !== "1")("collects default and filtered guide card photos", () => {
    const selected = new Map<string, { src: string; guideIds: Set<string>; views: Set<string> }>();
    const sizes: Record<string, number> = {};
    const topics = [{ id: "all" }, ...guideTopics];
    for (const topic of topics) {
      const subset = filterGuides("", topic.id === "all" ? undefined : topic.id as typeof guideTopics[number]["id"]);
      sizes[topic.id] = subset.length;
      const pictured = uniqueGuideCardPhotos(subset.map(guide => ({ guide })));
      const unique = pictured.map(row => row.cardPhoto?.src).filter(Boolean);
      expect(new Set(unique).size).toBe(unique.length);
      for (const { guide, cardPhoto } of pictured) {
        if (!cardPhoto) continue;
        const image = selected.get(cardPhoto.src) ?? {
          src: cardPhoto.src,
          guideIds: new Set<string>(),
          views: new Set<string>(),
        };
        image.guideIds.add(guide.id);
        image.views.add(topic.id);
        selected.set(cardPhoto.src, image);
      }
    }
    expect(guideDirectory).toHaveLength(49);
    expect(sizes["all"]).toBe(49);
    const paths = [...selected.values()].map(v => ({
      src: v.src,
      guideIds: [...v.guideIds].sort(),
      views: [...v.views].sort(),
    })).sort((a,b) => a.src.localeCompare(b.src));
    const invalid = paths.filter(p => !p.src.startsWith("/src/assets/") && !p.src.startsWith("/images/"));
    expect(invalid).toEqual([]);
    const manifest = { directorySize: guideDirectory.length, topicCounts: sizes, sources: paths };
    mkdirSync("docs", { recursive: true });
    writeFileSync("docs/TRAVEL_BLOG_HUB_PHOTO_MANIFEST.json", JSON.stringify(manifest, null, 2) + "\n");
    console.log("Travel-blog renderable photo sources:", paths.length);
    console.log("All-guide cards:", sizes["all"], "filter counts:", sizes);
  });
});
