import { describe, expect, it } from "vitest";
import { sacredHillEditorial, sacredHillOverrides } from "@/data/sacredHillGuides";
import { mountOlivesAttractionUpdate } from "@/data/mountOlivesRevision";

describe("Mount of Olives practical visitor revision", () => {
  const guide = sacredHillEditorial["mount-of-olives"];
  const attraction = sacredHillOverrides["mount-of-olives"];

  it("offers usable Old City connections from the upper lookout", () => {
    expect(guide.routes).toHaveLength(2);
    expect(guide.routes[0]?.steps.join(" ")).toMatch(/Seven Arches/);
    expect(guide.routes[0]?.steps.join(" ")).toMatch(/Lion's Gate/);
    expect(guide.routeIntro).toMatch(/Old City/);
    expect(guide.routes[1]?.steps.join(" ")).toMatch(/Pater Noster/);
  });

  it("distinguishes the bus stops and provides click-through travel planning", () => {
    const bus = guide.transport.find(mode => /bus/i.test(mode.title));
    expect(bus?.text).toMatch(/84/);
    expect(bus?.text).toMatch(/255/);
    expect(bus?.text).toMatch(/275/);
    expect(bus?.text).toMatch(/Seven Arches/);
    expect(bus?.links?.some(link => link.url.includes("moovitapp.com"))).toBe(true);
    expect(bus?.links?.some(link => link.url.includes("cityofdavid.org.il"))).toBe(true);
  });

  it("uses distinct photo-led site cards with attribution and varied advice", () => {
    expect(guide.stops).toHaveLength(8);
    expect(guide.stops.every(stop => Boolean(stop.image?.src && stop.image.alt))).toBe(true);
    expect(new Set(guide.stops.map(stop => stop.image?.src)).size).toBe(8);
    expect(new Set(guide.stops.map(stop => stop.tipLabel)).size).toBeGreaterThanOrEqual(5);
    for (const stop of guide.stops) {
      if (stop.image?.src.startsWith("https://")) {
        expect(stop.image.credit?.url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
        expect(stop.image.credit?.licenseUrl).toMatch(/^https:\/\//);
      }
    }
  });

  it("uses a respectful pilgrimage voice without combative archaeology disclaimers", () => {
    const combined = [attraction.intro, attraction.takeaway, ...guide.history, ...guide.stops.flatMap(stop => [stop.description, stop.visit])].join(" ");
    expect(combined).not.toMatch(/not physical proof|should not be claimed|don't treat|not a guarantee|not proven/i);
    expect(combined).toMatch(/Gethsemane/);
    expect(mountOlivesAttractionUpdate.faqs).toHaveLength(8);
    expect(guide.transport).toHaveLength(3);
  });
});
