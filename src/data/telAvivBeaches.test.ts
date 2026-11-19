import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { beachMapPoints, beachTopPicks, telAvivBeaches } from "@/data/telAvivBeaches";

describe("Tel Aviv beach guide editorial regression", () => {
  it("keeps the exact 13 declared municipal bathing beaches and unique official links", () => {
    expect(telAvivBeaches).toHaveLength(13);
    expect(new Set(telAvivBeaches.map(beach => beach.id)).size).toBe(13);
    expect(new Set(telAvivBeaches.map(beach => beach.official)).size).toBe(13);
    expect(telAvivBeaches.every(beach => beach.official?.startsWith("https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/"))).toBe(true);
    expect(telAvivBeaches.some(beach => /Aviv Beach/i.test(beach.name))).toBe(false);
    expect(telAvivBeaches.map(beach => beach.id)).toEqual([
      "tzuk-north", "tzuk-south", "tel-baruch", "metzitzim", "nordau", "hilton",
      "gordon", "frishman", "bograshov", "jerusalem", "geula", "charles-clore", "givat-aliya",
    ]);
  });

  it("keeps six distinctive top picks, concise comparison text and photo-ready fields", () => {
    expect(beachTopPicks).toHaveLength(6);
    expect(new Set(beachTopPicks.map(pick => pick.id)).size).toBe(6);
    expect(beachTopPicks.every(pick => telAvivBeaches.find(beach => beach.id === pick.id)?.featured)).toBe(true);
    expect(telAvivBeaches.filter(beach => beach.featured)).toHaveLength(6);
    for (const beach of telAvivBeaches) {
      expect(beach.highlights.trim().length).toBeGreaterThan(5);
      expect(beach.accessShort.trim().length).toBeGreaterThan(5);
      expect(beach.lat).toBeGreaterThan(32);
      expect(beach.lon).toBeGreaterThan(34.7);
      if (beach.pickPhoto && beach.detailPhoto) {
        expect(beach.pickPhoto.src).not.toBe(beach.detailPhoto.src);
      }
    }
  });

  it("keeps the selectable clustered map and the direct Aviv Beach lifeguard statement", () => {
    const page = readFileSync(new URL("../components/TelAvivBeachesGuide.tsx", import.meta.url), "utf8");
    const map = readFileSync(new URL("../../public/maps/tel-aviv-beaches.html", import.meta.url), "utf8");
    expect(page).toContain("data-beach-photo-slot");
    expect(page).toContain('kind="pick"');
    expect(page).toContain("Focus on a beach");
    expect(page).toContain("There are no lifeguard services at Aviv Beach.");
    expect(page).toContain("Sunday · Tuesday · Thursday");
    expect(page).toContain("Monday · Wednesday · Friday");
    expect(page).not.toMatch(/(?:stopped|ceased|discontinued).*lifeguard services at Aviv Beach/i);
    expect(map).toContain("cluster:true");
    expect(map).toContain("tel-aviv-beach-map-focus");
    expect(map).toContain("tel-aviv-beach-map-selected");
  });

  it("retains thirteen map markers in north-to-south order", () => {
    expect(beachMapPoints).toHaveLength(13);
    expect(beachMapPoints.map(point => point.id)).toEqual(telAvivBeaches.map(beach => beach.id));
    expect(beachMapPoints.every((point, index) => index === 0 || point.lat < beachMapPoints[index - 1]!.lat)).toBe(true);
  });
});
