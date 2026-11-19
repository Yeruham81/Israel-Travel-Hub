import { describe, expect, it } from "vitest";
import { additionalMuseums, museumAreas, museums } from "@/data/telAvivMuseums";

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

  it("keeps temporarily closed places in the main editorial list with dated closure notes", () => {
    const independence = museums.find(museum => museum.id === "independence");
    const muza = museums.find(museum => museum.id === "muza");
    expect(independence?.closureNote).toBe("Closed as of November 2026.");
    expect(muza?.closureNote).toBe("Planetarium closed as of November 2026.");
    expect(independence?.intro).toContain("14 May 1948");
    expect(muza?.intro).toContain("museum");
    expect(additionalMuseums.some(museum => museum.name === "Independence Hall")).toBe(false);
  });

  it("differentiates the two Etzel sites and retains essential new venues", () => {
    expect(museums.find(museum => museum.id === "etzel-1948")?.address).toContain("Charles Clore");
    expect(additionalMuseums.find(museum => museum.name.includes("Jabotinsky"))?.place).toContain("King George");
    for (const id of ["rubin", "liebling", "bauhaus", "bialik", "city"]) {
      expect(museums.some(museum => museum.id === id)).toBe(true);
    }
  });
});
