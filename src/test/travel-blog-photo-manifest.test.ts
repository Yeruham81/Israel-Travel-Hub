import { describe, expect, it } from "vitest";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { filterGuides, guideDirectory, guideTopics } from "@/data/travelGuides";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";

/**
 * Validates and optionally exports the exact set of photos that /travel-blog/ can render after
 * unique-image assignment, including every selectable topic filter.
 * This intentionally runs inside Vite/Vitest to resolve the site's real
 * bundled image imports, rather than guessing filenames from its TS source.
 */
describe("capture travel blog hub image sources", () => {
  it("validates default and filtered guide card photos and optionally writes the manifest", () => {
    // Every canonical Travel Blog leaf route must have exactly one directory card.
    // Derive coverage from the actual route files, not the historical manifest count.
    const expectedRoutes = readdirSync("src/routes")
      .filter((name) => /^travel-blog\.[^.]+\.tsx$/.test(name) && name !== "travel-blog.index.tsx")
      .map((name) => `/travel-blog/${name.slice("travel-blog.".length, -".tsx".length)}/`)
      .sort();
    expect(expectedRoutes.length).toBeGreaterThan(0);
    expect(guideDirectory.map((guide) => guide.to).sort()).toEqual(expectedRoutes);
    expect(new Set(guideDirectory.map((guide) => guide.id)).size).toBe(expectedRoutes.length);
    const selected = new Map<string, { src: string; guideIds: Set<string>; views: Set<string> }>();
    const sizes: Record<string, number> = {};
    const topics = [{ id: "all" }, ...guideTopics];
    for (const topic of topics) {
      const subset = filterGuides(
        "",
        topic.id === "all" ? undefined : (topic.id as (typeof guideTopics)[number]["id"]),
      );
      const expected =
        topic.id === "all"
          ? guideDirectory
          : guideDirectory.filter((guide) =>
              guide.topics.includes(topic.id as (typeof guideTopics)[number]["id"]),
            );
      expect(subset.map((guide) => guide.id)).toEqual(expected.map((guide) => guide.id));
      sizes[topic.id] = subset.length;
      const pictured = uniqueGuideCardPhotos(subset.map((guide) => ({ guide })));
      const unique = pictured.map((row) => row.cardPhoto?.src).filter(Boolean);
      expect(unique).toHaveLength(subset.length);
      expect(new Set(unique).size).toBe(unique.length);
      for (const { guide, cardPhoto } of pictured) {
        expect(cardPhoto?.src, guide.id).toBe(guide.photo?.src);
        expect(cardPhoto?.alt?.trim(), guide.id).toBeTruthy();
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
    expect(sizes["all"]).toBe(expectedRoutes.length);
    const paths = [...selected.values()]
      .map((v) => ({
        src: v.src,
        guideIds: [...v.guideIds].sort(),
        views: [...v.views].sort(),
      }))
      .sort((a, b) => a.src.localeCompare(b.src));
    const invalid = paths.filter(
      (p) => !p.src.startsWith("/src/assets/") && !p.src.startsWith("/images/"),
    );
    expect(invalid).toEqual([]);
    for (const { src } of paths) {
      const file = src.startsWith("/images/") ? "public" + src : src.slice(1);
      expect(existsSync(file), src).toBe(true);
    }
    const manifest = { directorySize: guideDirectory.length, topicCounts: sizes, sources: paths };
    if (process.env["WRITE_TRAVEL_BLOG_MANIFEST"] === "1") {
      mkdirSync("docs", { recursive: true });
      writeFileSync(
        "docs/TRAVEL_BLOG_HUB_PHOTO_MANIFEST.json",
        JSON.stringify(manifest, null, 2) + "\n",
      );
    }
    console.log("Travel-blog renderable photo sources:", paths.length);
    console.log("All-guide cards:", sizes["all"], "filter counts:", sizes);
  });
});
