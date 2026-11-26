import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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
    const page = readFileSync(resolve(process.cwd(), "src/components/TelAvivBeachesGuide.tsx"), "utf8");
    const map = readFileSync(resolve(process.cwd(), "public/maps/tel-aviv-beaches.html"), "utf8");
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

  it("keeps mobile map controls full width and prevents isolated regional cards", () => {
    const page = readFileSync(resolve(process.cwd(), "src/components/TelAvivBeachesGuide.tsx"), "utf8");
    const data = readFileSync(resolve(process.cwd(), "src/data/telAvivBeaches.ts"), "utf8");
    expect(page).toContain("flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-end");
    expect(page).toContain("w-full min-w-0 text-sm font-semibold sm:w-auto sm:flex-1");
    expect(page).toContain("disabled:opacity-40 sm:w-auto");
    expect(page).toContain('area.name === "Southern coast and Jaffa"');
    expect(page).toContain('group.compact ? "mt-5 grid items-stretch gap-4 md:grid-cols-3" : "mt-5 grid gap-4"');
    expect(page).toContain('data-testid={group.compact ? "beach-compact-cards" : "beach-detailed-cards"}');
    expect(page).toContain('data-detailed-card={compact ? undefined : "horizontal"}');
    expect(telAvivBeaches.filter(beach => beach.featured || beach.area === "Southern coast and Jaffa")).toHaveLength(7);
    expect(page).toContain("md:aspect-[16/9] md:w-full");
    expect(page).not.toContain("officialTelAvivBeachesEnglish");
    expect(data).not.toContain("officialTelAvivBeachesEnglish");
    expect(page).toContain("There are no lifeguard services at Aviv Beach.");
    expect(page).toContain("data-beach-photo-slot");
  });

  it("uses desktop-only space-saving layout for horizontal beach cards", () => {
    const page = readFileSync(resolve(process.cwd(), "src/components/TelAvivBeachesGuide.tsx"), "utf8");
    expect(page).toContain("lg:grid-cols-[minmax(0,1fr)_250px] lg:grid-rows-[auto_1fr]");
    expect(page).toContain("lg:row-span-2 lg:aspect-[16/10]");
    expect(page).toContain('className="lg:contents"');
    expect(page).toContain("border-t p-4 sm:p-5 lg:col-start-1 lg:row-start-2 lg:border-t-0 lg:p-0");
    expect(page).toContain("mt-3 leading-relaxed lg:mt-2");
    expect(page).toContain('compact ? "lg:px-6" : "lg:px-4 lg:py-2"');
  });

  it("retains thirteen map markers in north-to-south order", () => {
    expect(beachMapPoints).toHaveLength(13);
    expect(beachMapPoints.map(point => point.id)).toEqual(telAvivBeaches.map(beach => beach.id));
    expect(beachMapPoints.every((point, index) => index === 0 || point.lat < beachMapPoints[index - 1]!.lat)).toBe(true);
  });
});
