import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const guideTemplates = [
  ["src/components/Guide.tsx", 2],
  ["src/components/TravelGuide.tsx", 2],
  ["src/components/AirportJourneyPage.tsx", 1],
  ["src/components/AirportRoutePage.tsx", 1],
  ["src/components/AttractionGuidePage.tsx", 1],
  ["src/components/IsraelItineraryPage.tsx", 1],
  ["src/components/PortPage.tsx", 1],
  ["src/components/TourCategoryPage.tsx", 1],
  ["src/routes/travel-blog.calendar-of-events.tsx", 1],
  ["src/routes/travel-blog.israel-holidays.tsx", 1],
] as const;

describe("guide page title typography", () => {
  it("uses a single responsive heading style across guide templates", () => {
    for (const [file, expectedCount] of guideTemplates) {
      const titles = [...source(file).matchAll(/<h1\b[^>]*>/g)];
      expect(titles, file).toHaveLength(expectedCount);
      for (const [tag] of titles) expect(tag, file).toContain("guide-page-title");
    }
  });

  it("limits oversized headings while balancing longer titles", () => {
    const css = source("src/styles.css");
    expect(css).toMatch(/\.guide-page-title\s*\{[^}]*font-size:\s*2rem;/s);
    expect(css).toMatch(/\.guide-page-title\s*\{[^}]*text-wrap:\s*balance;/s);
    expect(css).toMatch(/@media \(min-width:\s*640px\)\s*\{\s*\.guide-page-title\s*\{\s*font-size:\s*2\.25rem;/);
    expect(css).toMatch(/@media \(min-width:\s*768px\)\s*\{\s*\.guide-page-title\s*\{\s*font-size:\s*2\.625rem;/);
    expect(source("src/components/HomeHero.tsx")).not.toContain("guide-page-title");
  });

  it("leaves a little more width for headings in the photo-and-text layout", () => {
    expect(source("src/components/TravelGuide.tsx")).toContain("lg:grid-cols-[1.35fr_1fr]");
  });
});
