import { describe, expect, it } from "vitest";
import { attractionGuides } from "@/data/attractionGuides";
import { sacredHillEditorial, sacredHillOverrides, type SacredHillId } from "@/data/sacredHillGuides";
import { attractionMeta } from "@/components/AttractionGuidePage";

const ids: SacredHillId[] = ["mount-zion", "mount-of-olives"];
const oldDomain = /(?:https?:\/\/)?(?:www\.)?israel-taxi\.com/i;

describe("Mount Zion and Mount of Olives route-first visitor pages", () => {
  it.each(ids)("provides a complete practical guide for %s without old-site redirects", id => {
    const a = attractionGuides[id];
    const e = sacredHillEditorial[id];
    expect(a.title).toMatch(/Mount (?:Zion|of Olives)/);
    expect(a.description.length).toBeGreaterThan(100);
    expect(a.faqs.length).toBeGreaterThanOrEqual(7);
    expect(e.snapshot).toHaveLength(4);
    expect(e.routes).toHaveLength(2);
    expect(e.routes.every(route => route.steps.length >= 4 && route.note.length > 30)).toBe(true);
    expect(e.stops.length).toBeGreaterThanOrEqual(6);
    expect(e.stops.every(stop => stop.description.length > 80 && stop.visit.length > 50)).toBe(true);
    expect(e.transport).toHaveLength(3);
    expect(e.history.length).toBeGreaterThanOrEqual(2);
    expect(a.official.some(source => source.url.includes("cicts.org"))).toBe(true);
    expect(a.official.every(source => source.url.startsWith("https://"))).toBe(true);
    expect(JSON.stringify({a, e})).not.toMatch(oldDomain);
    const json=attractionMeta(id);
    expect(json.links[0]?.href).toContain("/travel-blog/" + id + "/");
  });

  it("distinguishes the hills and their different access needs", () => {
    const zion = sacredHillEditorial["mount-zion"];
    const olives = sacredHillEditorial["mount-of-olives"];
    expect(zion.routes[0]!.steps.join(" ")).toMatch(/Zion Gate/);
    expect(zion.stops.some(stop => /Schindler/.test(stop.name))).toBe(true);
    expect(olives.routes[0]!.steps.join(" ")).toMatch(/Seven Arches/);
    expect(olives.stops.some(stop => /Pater Noster/.test(stop.name))).toBe(true);
    expect(olives.stops.some(stop => /Jewish cemetery/.test(stop.name))).toBe(true);
    expect(sacredHillOverrides["mount-zion"].faqs?.some(f => /archaeolog/.test(f.a))).toBe(true);
    expect(sacredHillOverrides["mount-of-olives"].faqs?.some(f => /limited mobility/.test(f.q))).toBe(true);
  });
});
