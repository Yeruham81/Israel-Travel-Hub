import { describe, expect, it } from "vitest";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { guideDirectory, travelGuides } from "@/data/travelGuides";
import { travelGuidePaths } from "@/data/registry";

describe("intent-specific taxi guide cluster", () => {
  it("keeps the legacy pillar route and registers both independent guide paths", () => {
    expect(travelGuidePaths.taxis).toBe("/travel-blog/taxis-in-israel/");
    expect(travelGuidePaths.taxiFares).toBe("/travel-blog/taxi-fares-in-israel/");
    expect(travelGuidePaths.airportTaxis).toBe("/travel-blog/ben-gurion-airport-taxis/");
    for (const id of ["taxis", "taxiFares", "airportTaxis"] as const) {
      expect(guideDirectory.some((guide) => guide.to === travelGuidePaths[id])).toBe(true);
      expect(travelGuides[id]).toBe(taxiGuideCluster[id]);
    }
  });

  it("assigns distinct primary intents and sources", () => {
    const { taxis, taxiFares, airportTaxis } = taxiGuideCluster;
    expect(taxis.title).toMatch(/Complete Guide for Tourists/);
    expect(taxis.sections.some((section) => section.id === "booking")).toBe(true);
    expect(taxiFares.sections.some((section) => section.id === "tariff-hours")).toBe(true);
    expect(taxiFares.sourceIds).toContain("taxi-fares-2026");
    expect(airportTaxis.sections.some((section) => section.id === "terminal3")).toBe(true);
    expect(airportTaxis.sourceIds).toContain("guide-gett");
    expect(taxis.sections.find((section) => section.id === "holidays")?.links?.map((item) => item.to)).toContain(travelGuidePaths.calendar);
  });

  it("shows A/B/C consumer rates and never repeats the first ten kilometers", () => {
    const table = taxiGuideCluster.taxiFares.comparison;
    expect(table.rows).toContainEqual(["Starting amount", "₪12.46", "₪12.46", "₪12.46"]);
    expect(table.rows).toContainEqual(["Per kilometer — first 10 km", "₪1.95", "₪2.34", "₪2.73"]);
    expect(table.rows).toContainEqual(["Per kilometer — after 10 km", "₪3.79", "₪4.18", "₪4.57"]);
    const examples = taxiGuideCluster.taxiFares.sections.find((section) => section.id === "examples")!.paragraphs.join(" ");
    expect(examples).toContain("₪51.40");
    expect(examples).toContain("₪102.59");
    const after10 = taxiGuideCluster.taxiFares.sections.find((section) => section.id === "time-distance")!.paragraphs.join(" ");
    expect(after10).toMatch(/Do not add this higher full per-kilometer rate again/);
  });

  it("differentiates Gett on-demand, scheduled and Terminal 1 pickup points", () => {
    const guide = taxiGuideCluster.airportTaxis;
    const rows = guide.comparison.rows;
    expect(rows.some((row) => row[0]?.includes("Immediate taxi · Terminal 3") && row[1]?.includes("Exit 03"))).toBe(true);
    expect(rows.some((row) => row[0]?.includes("scheduled") && row[1]?.includes("Exit 23"))).toBe(false);
    expect(rows.some((row) => row[0]?.includes("Gett ride scheduled") && row[1]?.includes("Exit 23"))).toBe(true);
    expect(rows.some((row) => row[0]?.includes("Terminal 1") && row[1]?.includes("Main arrivals exit"))).toBe(true);
    expect(guide.sections.find((section) => section.id === "steps")!.paragraphs.join(" ")).toMatch(/does NOT provide priority/);
  });

  it("provides context-specific links without a conflicting guide purpose", () => {
    expect(taxiGuideCluster.taxis.sections.find((section) => section.id === "fares")?.links?.[0].to).toBe(travelGuidePaths.taxiFares);
    expect(taxiGuideCluster.taxis.sections.find((section) => section.id === "airport")?.links?.[0].to).toBe(travelGuidePaths.airportTaxis);
    expect(taxiGuideCluster.taxiFares.sections.find((section) => section.id === "extras")?.links?.[0].to).toBe(travelGuidePaths.airportTaxis);
    expect(taxiGuideCluster.airportTaxis.sections.find((section) => section.id === "fares")?.links?.[0].to).toBe(travelGuidePaths.taxiFares);
    expect(taxiGuideCluster.airportTaxis.sections.find((section) => section.id === "weekend")?.links?.some((link) => link.to === travelGuidePaths.calendar)).toBe(true);
  });
});
