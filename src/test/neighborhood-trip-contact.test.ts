import { describe, expect, it } from "vitest";
import { jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { guideContactCopy, neighborhoodTripContactCopy } from "@/lib/guide-contact";

describe("Neighborhood contact panels focus on travel services, not hotel selection", () => {
  it("covers all fourteen shared neighborhood pages", () => {
    expect(jerusalemAreaGuides).toHaveLength(6);
    expect(telAvivAreaGuides).toHaveLength(8);
    expect(jerusalemAreaGuides.every((area) => area.cityId === "jerusalem")).toBe(true);
    expect(telAvivAreaGuides.every((area) => area.cityId === "telaviv")).toBe(true);
  });

  it.each(["Jerusalem", "Tel Aviv"] as const)(
    "offers trip planning and private transport in %s",
    (city) => {
      const copy = neighborhoodTripContactCopy(city);
      expect(copy.heading).toBe(`Need a private driver or transfer in ${city}?`);
      expect(copy.introduction).toMatch(/airport transfer/i);
      expect(copy.introduction).toMatch(/private (driver|ride)/i);
      expect(copy.introduction).toMatch(/day trip/i);
      expect(copy.introduction).toMatch(/I'll reply personally/);
      expect(copy.introduction).not.toMatch(/hotel|room|booking provider|which area/i);
      expect(copy.placeholder).toMatch(/pickup location/);
      expect(copy.placeholder).not.toMatch(/preferred area|hotel/i);
      expect(copy.subject).toBe("");
    },
  );

  it("keeps the shared accommodation contact helper focused on private transport", () => {
    const copy = guideContactCopy("Accommodation guide", "accommodation", "Haifa");
    expect(copy.heading).toBe("Need a private transfer to or from Haifa?");
  });
});
