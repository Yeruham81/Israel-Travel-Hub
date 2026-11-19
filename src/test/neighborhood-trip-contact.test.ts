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

  it.each(["Jerusalem", "Tel Aviv"] as const)("offers trip planning and private transport in %s", (city) => {
    const copy = neighborhoodTripContactCopy(city);
    expect(copy.heading).toBe(`Planning a trip to ${city}?`);
    expect(copy.introduction).toMatch(/airport transfer/i);
    expect(copy.introduction).toMatch(/private driver/i);
    expect(copy.introduction).toMatch(/day trip/i);
    expect(copy.introduction).toMatch(/I'll reply personally/);
    expect(copy.introduction).not.toMatch(/hotel|room|booking provider|which area/i);
    expect(copy.placeholder).toMatch(/pickup location/);
    expect(copy.placeholder).not.toMatch(/preferred area|hotel/i);
    expect(copy.subject).toBe("");
  });

  it("preserves the accommodation-specific helper for other pages", () => {
    const copy = guideContactCopy("Accommodation guide", "accommodation", "Haifa");
    expect(copy.heading).toBe("Questions about staying in Haifa?");
  });
});
