import { describe, expect, it } from "vitest";
import {
  airportTaxiFareRoutes,
  airportTaxiEstimatedFare,
  airportTaxiEstimateTable,
} from "@/data/airportTaxiFareEstimates";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { taxiFaresPreVat, TAXI_FARE_VALID_UNTIL, TAXI_FARE_EFFECTIVE_FROM } from "@/data/taxiFares";
import { shabbatAirportTaxiFareExamples } from "@/data/shabbatAirportTaxiFares";

describe("Ben Gurion airport taxi guide", () => {
  it("calculates transparent indicative day-tariff meter fares for four destinations", () => {
    expect(airportTaxiFareRoutes).toHaveLength(4);
    expect(airportTaxiFareRoutes.map((route) => airportTaxiEstimatedFare(route).range)).toEqual([
      "₪110–₪170",
      "₪260–₪320",
      "₪520–₪630",
      "₪790–₪920",
    ]);
    expect(airportTaxiEstimateTable.headers).toEqual([
      "Destination",
      "Daytime meter estimate",
      "Typical drive",
    ]);
    expect(airportTaxiEstimateTable.rows).toHaveLength(4);
    expect(airportTaxiEstimateTable.note).toContain("18% VAT");
    expect(airportTaxiEstimateTable.note).toContain("₪5");
    expect(airportTaxiEstimateTable.note).toContain("not fixed quotes");
  });

  it("uses the official temporary April 2026-March 2027 regulated tariff without inventing fixed fares", () => {
    // Ministry of Transport official 30 March 2026 order, temporary
    // section 6 effective 1 April 2026 to 31 March 2027.
    expect(TAXI_FARE_EFFECTIVE_FROM).toBe("2026-04-01");
    expect(TAXI_FARE_VALID_UNTIL).toBe("2027-03-31");
    expect(taxiFaresPreVat.start).toBe(10.56);
    expect(taxiFaresPreVat.orderedTaxi).toBe(4.9);
    expect(taxiFaresPreVat.perMinute).toEqual({ A: 1.65, B: 1.98, C: 2.31 });
    expect(taxiFaresPreVat.perKmFirst10).toEqual({ A: 1.65, B: 1.98, C: 2.31 });
    expect(taxiFaresPreVat.perKmBeyond10).toEqual({ A: 3.21, B: 3.54, C: 3.87 });
    expect(taxiFaresPreVat.waitingPerHour).toEqual({ A: 99, B: 118.8, C: 138 });
    for (const saturday of shabbatAirportTaxiFareExamples) {
      const weekday = airportTaxiEstimatedFare(
        airportTaxiFareRoutes.find((route) => route.id === saturday.id)!,
      );
      expect(saturday.daytimeB.min).toBeGreaterThan(weekday.minimum);
      expect(saturday.eveningC.min).toBeGreaterThan(saturday.daytimeB.min);
    }
  });

  it("provides published rail prices or honest pricing conditions in every airport choice guide", () => {
    for (const [id, guide] of Object.entries(airportJourneyGuides)) {
      const train = guide.options.find((option) => option.id === "rail");
      expect(train, id).toBeDefined();
      expect(train!.cost, id).toMatch(/₪\d+/);
      expect(train!.cost, id).not.toMatch(/check current fare|TBD|coming soon/i);
      expect(
        guide.sources?.some((source) => /rail\.co\.il/.test(source.url)),
        id,
      ).toBe(true);
      expect(guide.options.find((option) => option.id === "taxi")?.cost, id).toMatch(/meter/i);
    }
  });

  it("keeps route cards grounded in real linked guide hero images", () => {
    for (const route of airportTaxiFareRoutes) {
      const photo = airportJourneyGuides[route.id].photo;
      expect(photo.src).toBeTruthy();
      expect(route.to).toMatch(/^\/travel-blog\/ben-gurion-airport-to-/);
    }
    expect(
      new Set(airportTaxiFareRoutes.map((route) => airportJourneyGuides[route.id].photo.src)).size,
    ).toBe(4);
  });

  it("preserves the approved airport taxi photography and adds official support", () => {
    const guide = taxiGuideCluster.airportTaxis;
    expect(guide.photo.src).toBe("/images/travel-blog/airport-taxi-sign.webp");
    expect(guide.sections.find((s) => s.id === "terminal3")?.photo?.alt).toContain("arrivals hall");
    expect(guide.sections.find((s) => s.id === "fares")?.tables?.[0]?.rows).toEqual(
      airportTaxiEstimateTable.rows,
    );
    expect(guide.sections.find((s) => s.id === "special")?.sourceIds).toContain(
      "guide-accessible-airport",
    );
    expect(guide.sections.find((s) => s.id === "support")?.highlightedLinks).toHaveLength(2);
    expect(guide.faqs.length).toBeLessThan(8);
    expect(guide.sections.find((s) => s.id === "destinations")?.links).toBeUndefined();
  });
});
