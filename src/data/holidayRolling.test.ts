import { describe, expect, it } from "vitest";
import { israelToday, latestAllowedQuarter, monthKey, quarterRange, rollingMonths, visibleHolidayYears } from "./holidayRolling";

describe("rolling Israel holiday window",()=>{
  it("uses the local Israeli calendar date regardless of the visitor's timezone",()=>{
    expect(israelToday(new Date("2026-10-31T22:30:00Z"))).toBe("2026-11-01");
    expect(israelToday(new Date("2027-01-01T00:00:00Z"))).toBe("2027-01-01");
  });
  it("starts in the current month and drops elapsed months at each boundary",()=>{
    const october=rollingMonths("2026-10-23","2029-12-31");
    expect(october).toHaveLength(15);
    expect(october[0]?.key).toBe("2026-10");
    expect(october.at(-1)?.key).toBe("2027-12");
    const november=rollingMonths("2026-11-01","2029-12-31");
    expect(november[0]?.key).toBe("2026-11");
    expect(november.at(-1)?.key).toBe("2028-01");
  });
  it("never permits a month outside the verified dataset",()=>{
    expect(rollingMonths("2027-12-20","2028-01-01").map(m=>m.key)).toEqual(["2027-12","2028-01"]);
    expect(rollingMonths("2028-02-01","2028-01-01")).toEqual([]);
    expect(visibleHolidayYears("2027-11-10","2029-12-31")).toEqual([2027,2028,2029]);
  });
  it("calculates date ranges and quarter availability across years",()=>{
    expect(quarterRange(2027,3)).toEqual({from:"2027-10-01",to:"2027-12-31"});
    expect(quarterRange(2028,0)).toEqual({from:"2028-01-01",to:"2028-03-31"});
    expect(latestAllowedQuarter(2027,"2027-11-10","2028-01-01")).toBe(3);
    expect(monthKey(2028,0)).toBe("2028-01");
  });
});
