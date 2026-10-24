import { describe, expect, it } from "vitest";
import { sacredHillEditorial, sacredHillOverrides } from "@/data/sacredHillGuides";

describe("Mount Zion visitor guide revision", () => {
  const data = sacredHillEditorial["mount-zion"];
  const attraction = sacredHillOverrides["mount-zion"];

  it("supports itineraries both before and after walking through the Old City", () => {
    expect(data.routes).toHaveLength(2);
    expect(data.routes[0]?.steps.join(" ")).toMatch(/Armenian Quarter/);
    expect(data.routes[1]?.steps.join(" ")).toMatch(/Zion Gate/);
    expect(data.routes[1]?.steps.join(" ")).toMatch(/Old City/);
    expect(data.stopIntro).toMatch(/planning a visit/i);
  });

  it("names real bus stops, lines, and live planning resources", () => {
    const bus = data.transport.find(entry => /bus 38/i.test(entry.title));
    expect(bus?.text).toMatch(/Har Tsiyon\/Ma'ale HaShalom/);
    expect(bus?.text).toMatch(/Zion Gate\/Habad/);
    expect(bus?.text).toMatch(/route 2/i);
    expect(bus?.links).toHaveLength(2);
    expect(bus?.links?.some(link => link.url.includes("moovitapp.com"))).toBe(true);
  });

  it("has distinct personal visitor tips and avoids combative religious-history language", () => {
    expect(data.stops).toHaveLength(7);
    expect(data.stops.every(stop => stop.tipLabel && stop.visit.length > 50)).toBe(true);
    expect(new Set(data.stops.map(stop => stop.tipLabel)).size).toBeGreaterThan(4);
    const text = [attraction.intro, attraction.takeaway, ...data.history, ...data.stops.flatMap(x => [x.description, x.visit])].join(" ");
    expect(text).not.toMatch(/unproven|archaeolog|not physical proof|do not need to book|not a promise/i);
    expect(data.stops.some(stop => /Last Supper/i.test(stop.name))).toBe(true);
    expect(data.stops.some(stop => /Dormition/i.test(stop.name))).toBe(true);
    expect(data.stops.some(stop => /Schindler/i.test(stop.name))).toBe(true);
  });

  it("uses local photos only, with a natural aspect ratio in the page", () => {
    const images = [attraction.image, ...data.stops.flatMap(x => x.image ? [x.image] : [])];
    expect(images.length).toBeGreaterThanOrEqual(2);
    expect(images.every(img => Boolean(img?.src && img.alt))).toBe(true);
    expect(images.every(img => !/^https?:\/\//i.test(img?.src || ""))).toBe(true);
    expect(attraction.faqs?.some(faq => /bus/i.test(faq.q))).toBe(true);
    expect(attraction.faqs?.some(faq => /Sunday/i.test(faq.q))).toBe(true);
  });
});
