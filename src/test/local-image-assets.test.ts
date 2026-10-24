import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { attractionGuides } from "@/data/attractionGuides";
import { travelGuides } from "@/data/travelGuides";

const srcRoot = resolve(process.cwd(), "src");

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(item => {
    const path = join(directory, item.name);
    if (item.isDirectory()) return item.name === "test" ? [] : sourceFiles(path);
    return /\.(tsx?|css)$/.test(item.name) && item.name !== "routeTree.gen.ts" ? [path] : [];
  });
}

const remoteImagePatterns = [
  // A literal remote URL assigned to a rendered image, image set or background.
  /\b(?:src|srcSet|imageSrc|imageUrl|image_url|backgroundImage)\b\s*[:=]\s*(?:\{\s*)?["'`]https?:\/\//i,
  /\burl\(\s*["']?https?:\/\//i,
  // Prevent regressions to the remote image hosts previously used in guides.
  /(?:thumb|upload)\.wikimedia\.org\/wikipedia\/commons/i,
  /(?:images\.unsplash\.com|source\.unsplash\.com|images\.pexels\.com|cdn\.pixabay\.com)/i,
];

describe("local-only image asset policy", () => {
  it("never hotlinks images in authored source", () => {
    const violations: string[] = [];
    for (const file of sourceFiles(srcRoot)) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, index) => {
        if (remoteImagePatterns.some(regex => regex.test(line))) {
          violations.push(`${relative(process.cwd(), file)}:${index + 1}`);
        }
      });
    }
    expect(violations).toEqual([]);
  });

  it("keeps every attraction and travel-guide image on the project's own origin", () => {
    const allImages = [
      ...Object.values(attractionGuides).flatMap(guide => guide.image ? [guide.image.src] : []),
      ...Object.values(travelGuides).flatMap(guide => [
        ...(guide.photo?.src ? [guide.photo.src] : []),
        ...guide.sections.flatMap(section => section.photo?.src ? [section.photo.src] : []),
      ]),
    ];
    expect(allImages.length).toBeGreaterThan(60);
    expect(allImages.filter(src => /^https?:\/\//i.test(src))).toEqual([]);
    expect(allImages.every(src => src.startsWith("/"))).toBe(true);
  });
});
