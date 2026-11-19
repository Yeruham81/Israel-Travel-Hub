import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { jerusalemShoppingPlaces as places, shoppingMapPoints, shoppingTopPicks, shoppingDistricts } from "@/data/jerusalemShopping";

describe("Jerusalem shopping guide editorial regression", () => {
  it("contains exactly ten distinctive destinations and six choices", () => {
    expect(places).toHaveLength(10);
    expect(new Set(places.map(place => place.id)).size).toBe(10);
    expect(shoppingTopPicks).toHaveLength(6);
    expect(new Set(shoppingTopPicks.map(pick => pick.id)).size).toBe(6);
    expect(shoppingTopPicks.every(pick => places.some(place => place.id === pick.id))).toBe(true);
    expect(shoppingDistricts.map(group => group.title)).toEqual([
      "Old City & Mamilla", "City centre & markets", "South Jerusalem",
    ]);
    expect(places.every(place => shoppingDistricts.some(group => group.title === place.district))).toBe(true);
  });

  it("uses locally hosted, unique photographs and reserves only the missing fair image", () => {
    const photos = places.filter(place => place.photo);
    expect(photos).toHaveLength(9);
    expect(new Set(photos.map(place => place.photo!.src)).size).toBe(9);
    expect(places.find(place => place.id === "bezalel")?.photo).toBeUndefined();
    expect(existsSync(resolve(process.cwd(), "public/images/jerusalem-shopping/hero.webp"))).toBe(true);
    for (const place of photos) {
      const file = resolve(process.cwd(), "public" + place.photo!.src);
      expect(existsSync(file), place.name + " image missing").toBe(true);
      expect(place.photo!.alt.length).toBeGreaterThan(12);
    }
  });

  it("connects ten selectable map pins and keeps mobile/table layouts", () => {
    expect(shoppingMapPoints.map(place => place.id)).toEqual(places.map(place => place.id));
    const page = readFileSync(resolve(process.cwd(), "src/components/JerusalemShoppingGuide.tsx"), "utf8");
    const map = readFileSync(resolve(process.cwd(), "public/maps/jerusalem-shopping.html"), "utf8");
    expect(page).toContain("data-shopping-photo-slot");
    expect(page).toContain("jerusalem-shopping-map-focus");
    expect(page).toContain("jerusalem-shopping-map-selected");
    expect(page).toContain("flex flex-col gap-3 border-b p-4 sm:flex-row");
    expect(page).toContain("md:hidden");
    expect(map).toContain("places.length !== 10");
    expect(map).toContain("cluster:true");
    expect(map).toContain("jerusalem-shopping-map-focus");
  });

  it("keeps updated venue and purchase advice without stale fixed-price discounts", () => {
    const page = readFileSync(resolve(process.cwd(), "src/components/JerusalemShoppingGuide.tsx"), "utf8");
    const data = readFileSync(resolve(process.cwd(), "src/data/jerusalemShopping.ts"), "utf8");
    expect(page).toContain("Tourist VAT refunds");
    expect(page).toContain("The First Station");
    expect(page).toContain("Contact me");
    expect(data).toContain("Bezalel and Shatz");
    expect(data).not.toContain("offer half");
    expect(page).not.toContain("50% of");
    expect(page).not.toContain("60%-70%");
  });
});
