import { readRouteSource } from "@/test-utils/read-route-source";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { holidayGuideGroups, holidayGuideSources, schoolCalendarPlanning } from "@/data/israelHolidayVisitorGuide";
import {
  HOLIDAY_GUIDE_TITLE, HOLIDAY_GUIDE_PATH, HOLIDAY_GUIDE_DESCRIPTION, HOLIDAY_GUIDE_PHOTO
} from "@/components/IsraelHolidayVisitorGuide";
import { guideDirectory, travelGuides } from "@/data/travelGuides";

const entries = holidayGuideGroups.flatMap(group => group.items);

describe("Israel holidays visitor guide", () => {
  it("has accurate editorial identity and remains discoverable at the original address", () => {
    expect(HOLIDAY_GUIDE_PATH).toBe("/travel-blog/calendar-of-events/");
    expect(HOLIDAY_GUIDE_TITLE).toBe("Israel's Calendar of events: A practical guide for visitors");
    expect(HOLIDAY_GUIDE_DESCRIPTION).toContain("transport");
    expect(HOLIDAY_GUIDE_DESCRIPTION).toContain("national remembrance days");
    expect(HOLIDAY_GUIDE_DESCRIPTION).toContain("school breaks");
    expect(guideDirectory.some(g => g.id === "calendar" && g.to === HOLIDAY_GUIDE_PATH && g.title === HOLIDAY_GUIDE_TITLE)).toBe(true);
    expect(travelGuides.calendar.title).toBe(HOLIDAY_GUIDE_TITLE);
    expect(travelGuides.calendar.updatedAt).toBe("2026-11-22");
    const page = readFileSync("src/components/IsraelHolidayVisitorGuide.tsx", "utf8");
    const route = readRouteSource("src/routes/travel-blog.calendar-of-events.tsx");
    expect(page).toContain('{name:"Calendar of events",to:HOLIDAY_GUIDE_PATH}');
    expect(route).toMatch(/\{\s*name:\s*"Calendar of events",\s*path:\s*HOLIDAY_GUIDE_PATH\s*,?\s*\}/);
    expect(page).not.toContain("Holidays in Israel: A Practical Guide for Visitors");
    expect(route).toMatch(/headline:\s*HOLIDAY_GUIDE_TITLE\b/);
    expect(existsSync("public" + HOLIDAY_GUIDE_PHOTO.src)).toBe(true);
    expect(HOLIDAY_GUIDE_PHOTO.src).toBe("/images/holiday-guide/israel-calendar-of-events.webp");
    expect(travelGuides.calendar.photo.src).toBe(HOLIDAY_GUIDE_PHOTO.src);
    expect(guideDirectory.find(g => g.id === "calendar")?.photo?.src).toBe(HOLIDAY_GUIDE_PHOTO.src);
    // The retired date-picker must not be shipped as a separate route.
    expect(existsSync("src/routes/travel-blog.israel-holidays.tsx")).toBe(false);
  });
  it("explains 19 recurring dates across the weekly rhythm, Jewish, national and other traditions", () => {
    expect(holidayGuideGroups.map(g => g.id)).toEqual(["weekly","jewish-major","other-jewish","national","other-traditions"]);
    expect(entries).toHaveLength(19);
    expect(new Set(entries.map(e => e.id)).size).toBe(entries.length);
    for (const g of holidayGuideGroups) {
      expect(g.intro.length, g.id).toBeGreaterThan(40);
      for (const h of g.items) {
        expect(h.name.length, h.id).toBeGreaterThan(4);
        expect(h.season.length, h.id).toBeGreaterThan(12);
        expect(h.why.length, h.id).toBeGreaterThan(60);
        expect(h.transport.length, h.id).toBeGreaterThan(65);
        expect(h.visitor.length, h.id).toBeGreaterThan(60);
        expect(h.tip.length, h.id).toBeGreaterThan(45);
      }
    }
  });
  it("does not mischaracterise local religious observances as a nationwide shutdown", () => {
    expect(entries.find(e=>e.id==="yom-kippur")?.impact).toBe("very-high");
    expect(entries.find(e=>e.id==="shabbat")?.impact).toBe("high");
    expect(entries.find(e=>e.id==="ramadan")?.impact).toBe("local");
    expect(entries.find(e=>e.id==="christmas")?.impact).toBe("local");
    expect(entries.find(e=>e.id==="easter")?.impact).toBe("local");
    expect(entries.find(e=>e.id==="eid")?.impact).toBe("local");
    expect(entries.find(e=>e.id==="lag-baomer")?.impact).toBe("local");
    expect(entries.find(e=>e.id==="lag-baomer")?.transport).toContain("Mount Meron");
    expect(entries.find(e=>e.id==="lag-baomer")?.tip).toContain("official");
    expect(schoolCalendarPlanning.body).toContain("July and August");
    expect(schoolCalendarPlanning.body).toContain("September");
    expect(schoolCalendarPlanning.body).toContain("Ministry of Education");
    expect(entries.find(e=>e.id==="passover")?.transport).toContain("Chol HaMoed");
    expect(entries.find(e=>e.id==="rosh-hashanah")?.transport).toContain("train services");
  });
  it("cites official travel sources and does not contain fabricated event tickets", () => {
    expect(holidayGuideSources.length).toBeGreaterThanOrEqual(6);
    expect(holidayGuideSources.some(s=>s.url.includes("rail.co.il"))).toBe(true);
    expect(holidayGuideSources.some(s=>s.url==="https://www.hebcal.com/holidays/?i=on")).toBe(true);
    expect(holidayGuideSources.some(s=>s.url.includes("gov.il"))).toBe(true);
    for (const s of holidayGuideSources) expect(s.url).toMatch(/^https:\/\//);
  });
});
