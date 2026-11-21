import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { travelGuidePaths } from "@/data/registry";
import { guideDirectory } from "@/data/travelGuides";

const source = (path: string) => readFileSync(path, "utf8");
const liveGuide = "/travel-blog/calendar-of-events/";
const retiredRoute = "/travel-blog/israel-holidays/";

describe("Holiday and special-date guide links", () => {
  it("has one consolidated public holiday guide and no retired date-picker page", () => {
    expect(travelGuidePaths.calendar).toBe(liveGuide);
    expect(existsSync("src/routes/travel-blog.calendar-of-events.tsx")).toBe(true);
    expect(existsSync("src/routes/travel-blog.israel-holidays.tsx")).toBe(false);
    expect(guideDirectory.some(guide => guide.id === "calendar" && guide.to === liveGuide)).toBe(true);
    expect(guideDirectory.some(guide => guide.id === "israel-holidays")).toBe(false);
  });

  it.each([
    "src/components/AirportJourneyPage.tsx",
    "src/components/AkkoAttractionPage.tsx",
    "src/components/BestTimeIsraelGuide.tsx",
    "src/components/CapernaumAttractionPage.tsx",
    "src/components/HaifaAttractionPage.tsx",
    "src/components/IsraelFoodGuide.tsx",
    "src/components/JaffaAttractionPage.tsx",
    "src/components/JerusalemStayHub.tsx",
    "src/components/MountZionAttractionPage.tsx",
    "src/components/OldCityJerusalemAttractionPage.tsx",
    "src/data/airportJourneyGuides.ts",
    "src/data/bestTimeIsrael.ts",
    "src/data/travelGuideExpansion.ts",
    "src/data/jerusalemClusterEditorial.ts",
    "src/data/taxiGuideCluster.ts",
    "src/data/travelGuides.ts",
    "src/routes/accommodation.index.tsx",
  ])("points %s to the consolidated guide, with no retired URL", path => {
    const content = source(path);
    expect(content, path).toContain(liveGuide);
    expect(content, path).not.toContain(retiredRoute);
  });

  it("replaces the date-picker CTA with an external calendar for actual dates", () => {
    const page = source("src/components/IsraelHolidayVisitorGuide.tsx");
    expect(page).not.toContain(retiredRoute);
    expect(page).toContain("https://www.hebcal.com/holidays/?i=on");
    expect(page).toContain("https://www.timeanddate.com/holidays/israel/");
    expect(page).not.toContain("Check my holiday calendar");
    expect(page).not.toContain("Use my separate calendar");
  });
});
