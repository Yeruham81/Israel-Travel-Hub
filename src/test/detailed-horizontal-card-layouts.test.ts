import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { seniorDayTrips } from "@/data/seniorToursGuide";
import { telAvivExperiences } from "@/data/telAvivAttractionsGuide";
import { deadSeaStops } from "@/data/deadSeaAttractionsGuide";
import { topTenExperiences } from "@/data/topTenExperiences";
import { jerusalemShoppingPlaces } from "@/data/jerusalemShopping";
import { foodDishes } from "@/data/israelFoodExplorer";
import { telAvivBeaches } from "@/data/telAvivBeaches";

/** Long-form editorial cards are not small guide cards or bookable third-party
 * product offers. They use one full-width row and a right-hand photograph on
 * desktop, matching Jerusalem's museum detail cards. */
const readComponent = (name: string) =>
  readFileSync(resolve(process.cwd(), "src/components", name + ".tsx"), "utf8");

const layouts = [
  {
    component: "SeniorToursGuide",
    grid: 'className="grid gap-5" data-testid="senior-detailed-trip-cards"',
  },
  {
    component: "TelAvivAttractionsGuide",
    grid: 'className="grid gap-5" data-testid="tel-aviv-detailed-experience-cards"',
  },
  {
    component: "DeadSeaAttractionsGuide",
    grid: 'className="grid gap-5" data-testid="deadsea-detailed-experience-cards"',
  },
  {
    component: "TopTenIsraelGuide",
    grid: 'className="grid gap-5" data-testid="top-ten-detailed-experience-cards"',
  },
  {
    component: "JerusalemShoppingGuide",
    grid: 'className="mt-5 grid gap-5" data-testid="jerusalem-shopping-detailed-cards"',
  },
  {
    component: "IsraelFoodGuide",
    grid: 'className="grid gap-5" data-testid="israel-food-dish-grid"',
  },
] as const;

describe("Full-width editorial detail cards", () => {
  it("has exactly 67 long-form cards across seven guide pages", () => {
    const detailedBeachCount = telAvivBeaches.length;
    expect([
      seniorDayTrips.length,
      telAvivExperiences.length,
      deadSeaStops.length,
      topTenExperiences.length,
      jerusalemShoppingPlaces.length,
      foodDishes.length,
      detailedBeachCount,
    ]).toEqual([4, 10, 10, 10, 10, 10, 13]);
    expect(4 + 10 + 10 + 10 + 10 + 10 + detailedBeachCount).toBe(67);
  });

  it.each(layouts)(
    "$component uses a single desktop row with image in the upper right",
    ({ component, grid }) => {
      const page = readComponent(component);
      expect(page).toContain(grid);
      expect(page).toContain('data-detailed-card="horizontal"');
      expect(page).toContain("lg:grid-cols-[minmax(0,1fr)_270px]");
      expect(page).toContain("lg:col-start-2 lg:row-start-1");
      expect(page).toContain("lg:col-start-1 lg:row-start-1");
    },
  );

  it("shows all Tel Aviv beaches as full-width rows with a right-hand photograph", () => {
    const page = readComponent("TelAvivBeachesGuide");
    expect(page).toContain('data-detailed-card="horizontal"');
    expect(page).toContain('className="mt-4 grid gap-3" data-testid="beach-detailed-cards"');
    expect(page).toContain("lg:grid-cols-[minmax(0,1fr)_250px]");
    expect(page).toContain("lg:col-start-2 lg:row-start-1");
    expect(page).toContain("lg:col-start-1 lg:row-start-1");
    expect(page).toContain("beaches.map(beach => <BeachCard");
    expect(page).not.toContain("beach-compact-cards");
    expect(telAvivBeaches).toHaveLength(13);
  });

  it("keeps short-form provider and related-guide tiles out of the wide-card transformation", () => {
    const food = readComponent("IsraelFoodGuide");
    expect(food).toContain('data-testid="israel-food-tour-cards"');
    expect(food).toContain('className="grid gap-4 md:grid-cols-3"');
    const telAviv = readComponent("TelAvivAttractionsGuide");
    expect(telAviv).toContain(
      'sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-affiliate-tours"',
    );
    const senior = readComponent("SeniorToursGuide");
    expect(senior).toContain('className="grid grid-cols-2 gap-4 lg:grid-cols-3"');
  });
});
