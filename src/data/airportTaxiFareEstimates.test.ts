import { describe, expect, it } from "vitest";
import { airportTaxiFareRoutes, airportTaxiEstimatedFare, airportTaxiEstimateTable } from "@/data/airportTaxiFareEstimates";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";

describe("Ben Gurion airport taxi guide", () => {
  it("calculates transparent indicative day-tariff meter fares for four destinations", () => {
    expect(airportTaxiFareRoutes).toHaveLength(4);
    expect(airportTaxiFareRoutes.map(route => airportTaxiEstimatedFare(route).range)).toEqual([
      "₪110–₪170", "₪260–₪320", "₪520–₪630", "₪790–₪920",
    ]);
    expect(airportTaxiEstimateTable.headers).toEqual(["Destination", "Daytime meter estimate", "Typical drive"]);
    expect(airportTaxiEstimateTable.rows).toHaveLength(4);
    expect(airportTaxiEstimateTable.note).toContain("18% VAT");
    expect(airportTaxiEstimateTable.note).toContain("₪5");
    expect(airportTaxiEstimateTable.note).toContain("not fixed quotes");
  });

  it("keeps route cards grounded in real linked guide hero images", () => {
    for (const route of airportTaxiFareRoutes) {
      const photo = airportJourneyGuides[route.id].photo;
      expect(photo.src).toBeTruthy();
      expect(route.to).toMatch(/^\/travel-blog\/ben-gurion-airport-to-/);
    }
    expect(new Set(airportTaxiFareRoutes.map(route => airportJourneyGuides[route.id].photo.src)).size).toBe(4);
  });

  it("preserves the approved airport taxi photography and adds official support", () => {
    const guide = taxiGuideCluster.airportTaxis;
    expect(guide.photo.src).toBe("/images/travel-blog/airport-taxi-sign.webp");
    expect(guide.sections.find(s => s.id === "terminal3")?.photo?.alt).toContain("arrivals hall");
    expect(guide.sections.find(s => s.id === "fares")?.tables?.[0]?.rows).toEqual(airportTaxiEstimateTable.rows);
    expect(guide.sections.find(s => s.id === "special")?.sourceIds).toContain("guide-accessible-airport");
    expect(guide.sections.find(s => s.id === "support")?.highlightedLinks).toHaveLength(2);
    expect(guide.faqs.length).toBeLessThan(8);
    expect(guide.sections.find(s => s.id === "destinations")?.links).toBeUndefined();
  });
});
