import { describe, expect, it } from "vitest";
import { checkRange, findHolidayMatches, holidays, HOLIDAY_COVERAGE, intersects, isValidIsoDay, shabbatDates } from "./israelHolidays";

describe("Israel holiday travel calendar", () => {
  it("covers future 2026 and all of 2027, but never reports uncovered days as clear", () => {
    expect(HOLIDAY_COVERAGE.from).toBe("2026-10-23");
    expect(HOLIDAY_COVERAGE.to).toBe("2028-01-01");
    expect(checkRange("2027-12-29","2028-01-01")).toBeNull();
    expect(checkRange("2027-07-01","2027-07-04")).toBeNull();
    expect(checkRange("2028-01-01","2028-01-02")).toMatch(/checked coverage/);
    expect(checkRange("2026-10-22","2026-10-24")).toMatch(/checked coverage/);
  });
  it("handles exact days, malformed input and reversed dates", () => {
    expect(isValidIsoDay("2027-02-29")).toBe(false);
    expect(isValidIsoDay("2027-03-09")).toBe(true);
    expect(checkRange("2027-07-09","2027-07-07")).toMatch(/Departure/);
    expect(checkRange("2027-01-01","2027-04-12")).toMatch(/90 days/);
    expect(intersects("2027-04-21","2027-04-21","2027-04-21","2027-04-22")).toBe(true);
    expect(intersects("2027-04-20","2027-04-20","2027-04-21","2027-04-22")).toBe(false);
  });
  it("includes the sunset prior to Passover and recognises Chol HaMoed separately", () => {
    expect(findHolidayMatches("2027-04-21","2027-04-21").map(h=>h.id)).toContain("passover-first");
    const ids=findHolidayMatches("2027-04-25","2027-04-25").map(h=>h.id);
    expect(ids).toContain("passover-intermediate");
    expect(ids).not.toContain("passover-first");
    expect(findHolidayMatches("2027-04-28","2027-04-28").some(h=>h.id==="passover-last")).toBe(true);
  });
  it("keeps Israeli one-day Shavuot, followed by weekly Shabbat", () => {
    const shavuot=holidays.find(h=>h.id==="shavuot")!;
    expect([shavuot.from,shavuot.to]).toEqual(["2027-06-10","2027-06-11"]);
    expect(shabbatDates("2027-06-10","2027-06-12")).toEqual(["2027-06-11","2027-06-12"]);
  });
  it("handles Sukkot intermediate days and Israel's combined Simchat Torah", () => {
    expect(findHolidayMatches("2027-10-20","2027-10-20").map(h=>h.id)).toContain("sukkot-intermediate");
    const simchat=holidays.find(h=>h.id==="simchattorah")!;
    expect([simchat.from,simchat.to]).toEqual(["2027-10-22","2027-10-23"]);
  });
  it("includes Yom Kippur evening, Christian observances and locally tentative Eid", () => {
    expect(findHolidayMatches("2027-10-10","2027-10-10").map(h=>h.id)).toContain("yomkippur");
    expect(findHolidayMatches("2027-03-28","2027-03-28").some(h=>h.id==="western-holy-week")).toBe(true);
    expect(findHolidayMatches("2027-05-02","2027-05-02").some(h=>h.id==="orthodox-holy-week")).toBe(true);
    expect(holidays.find(h=>h.id==="eid-fitr")?.certainty).toBe("tentative");
  });
  it("matches holiday periods even when they start in the preceding year", () => {
    expect(intersects("2027-12-30","2027-12-31","2027-12-24","2028-01-01")).toBe(true);
    expect(findHolidayMatches("2027-12-31","2027-12-31").map(h=>h.id)).toContain("hanukkah27");
    expect(findHolidayMatches("2028-01-01","2028-01-01").map(h=>h.id)).toContain("hanukkah27");
    expect(checkRange("2028-01-02","2028-01-02")).toMatch(/checked coverage/);
  });
  it("explains each observance and flags realistic travel effects", () => {
    expect(holidays.every(h=>h.summary.length>=30 && h.travel.length>=45)).toBe(true);
    expect(holidays.find(h=>h.id==="shavuot")!.summary).toMatch(/Torah/);
    expect(holidays.find(h=>h.id==="passover-intermediate")!.travel).toMatch(/school.break/i);
    expect(holidays.find(h=>h.id==="sukkot-intermediate")!.travel).toMatch(/school breaks/i);
    expect(holidays.find(h=>h.id==="orthodox-holy-week")!.travel).toMatch(/Holy Fire/);
    expect(holidays.find(h=>h.id==="ramadan")!.travel).toMatch(/after sunset/);
    expect(holidays.find(h=>h.id==="yomkippur")!.travel).toMatch(/airport/i);
  });
});
