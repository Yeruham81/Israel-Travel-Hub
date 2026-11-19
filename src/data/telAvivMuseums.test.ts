import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { additionalMuseums, museumAreas, museumMapPoints, museums } from "@/data/telAvivMuseums";

describe("Tel Aviv museums editorial guide", () => {
  it("keeps each museum unique, locally positioned and linked to a museum operator", () => {
    expect(museums.length).toBeGreaterThanOrEqual(14);
    expect(new Set(museums.map(item => item.id)).size).toBe(museums.length);
    expect(new Set(museums.map(item => item.name)).size).toBe(museums.length);
    const areaIds = new Set(museumAreas.map(area => area.id));
    for (const museum of museums) {
      expect(areaIds.has(museum.area)).toBe(true);
      expect(museum.address).toBeTruthy();
      expect(museum.duration).toBeTruthy();
      expect(museum.tip).toBeTruthy();
      expect(museum.url).toMatch(/^https:\/\//);
      expect(museum.url).not.toContain("israel-taxi.com");
    }
  });

  it("keeps temporarily closed places in the main editorial list with accurate closure notices", () => {
    const independence = museums.find(museum => museum.id === "independence");
    const muza = museums.find(museum => museum.id === "muza");
    expect(independence?.closureNote).toBe("Closed until further notice for restoration.");
    expect(muza?.closureNote).toBe("Planetarium closed as of November 2026.");
    expect(independence?.intro).toContain("14 May 1948");
    expect(muza?.intro).toContain("museum");
    expect(additionalMuseums.some(museum => museum.name === "Independence Hall")).toBe(false);
  });

  it("grounds exactly fifteen museums on the shared city map and makes closed venues recognizable", () => {
    expect(museumMapPoints).toHaveLength(15);
    expect(new Set(museumMapPoints.map(point => point.id)).size).toBe(15);
    expect(museumMapPoints.map(point => point.id)).toEqual(museums.map(point => point.id));
    for (const point of museumMapPoints) {
      expect(point.lat).toBeGreaterThan(32);
      expect(point.lat).toBeLessThan(32.2);
      expect(point.lon).toBeGreaterThan(34.6);
      expect(point.lon).toBeLessThan(34.95);
    }
    expect(museumMapPoints.filter(point => point.closed).map(point => point.id)).toEqual(["independence"]);
  });

  it("publishes verified adult admission and regular opening-day guidance, without inventing unknown fees", () => {
    expect(museums).toHaveLength(15);
    expect(museums.every(museum => Boolean(museum.openingDays))).toBe(true);
    for (const [id, price] of Object.entries({
      art: 55, city: 40, rubin: 40, liebling: 0, bialik: 35,
      bauhaus: 0, anu: 54, steinhardt: 52, muza: 58,
      palmach: 30, gutman: 40, ilana: 45,
    })) {
      expect(museums.find(museum => museum.id === id)?.priceNis, id).toBe(price);
    }
    for (const id of ["rabin", "etzel-1948", "independence"]) {
      expect(museums.find(museum => museum.id === id)?.priceNis).toBeUndefined();
    }
    expect(museums.find(museum => museum.id === "city")?.ticketUrl).toContain("smarticket");
    expect(museums.find(museum => museum.id === "steinhardt")?.ticketUrl).toContain("smnh.tau.ac.il");
    expect(museums.find(museum => museum.id === "palmach")?.booking).toContain("03-5459800");
    const bauhaus = museums.find(museum => museum.id === "bauhaus");
    expect(bauhaus?.closureNote).toBeUndefined();
    expect(bauhaus?.booking).toContain("Check dates for guided White City tours");
    expect(bauhaus?.tip).toContain("Check with the centre in advance");
    expect(bauhaus?.booking.toLowerCase()).not.toContain("suspended");
    expect(museums.find(museum => museum.id === "bialik")?.admission).toContain("₪75");
    expect(museums.find(museum => museum.id === "art")?.ticketUrl).toContain("tickets.tamuseum.org.il");
    expect(museums.find(museum => museum.id === "palmach")?.openingDays).toContain("Fri 09:00–11:00");
    expect(museums.find(museum => museum.id === "bauhaus")?.admission).toContain("₪90");
  });

  it("uses built-in map clustering and keeps direct directions separate from venue searches", () => {
    const mapHtml = readFileSync("public/maps/tel-aviv-museums.html", "utf8");
    const guideCode = readFileSync("src/components/TelAvivMuseumsGuide.tsx", "utf8");
    expect(mapHtml).toContain("cluster:true");
    expect(mapHtml).toContain("getClusterExpansionZoom");
    expect(mapHtml).toContain("museum-cluster-count");
    expect(mapHtml).toContain("museum-points");
    expect(mapHtml).toContain("tel-aviv-museum-map-selected");
    expect(guideCode).toContain("https://www.google.com/maps/dir/?api=1&destination=");
    expect(guideCode).not.toContain("All 15 museums on one map. Select a venue to zoom in.");
    expect(guideCode).not.toContain("Reserve by phone or WhatsApp: <a");
  });

  it("differentiates the two Etzel sites and retains essential new venues", () => {
    expect(museums.find(museum => museum.id === "etzel-1948")?.address).toContain("Charles Clore");
    expect(additionalMuseums.find(museum => museum.name.includes("Jabotinsky"))?.place).toContain("King George");
    for (const id of ["rubin", "liebling", "bauhaus", "bialik", "city"]) {
      expect(museums.some(museum => museum.id === id)).toBe(true);
    }
  });
});
