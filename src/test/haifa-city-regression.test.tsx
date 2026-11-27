import { describe, expect, it } from "vitest";
import { destinationSectionHeadings } from "@/components/AttractionDestinationPage";
import {
  carmelWalkingRoute,
  downtownWalkingRoute,
  downtownFullRoute,
  haifaDestinationContent,
  haifaTourPlacements,
} from "@/components/HaifaAttractionPage";
import { jaffaDestinationContent } from "@/components/JaffaAttractionPage";
import { affiliateConfig, tourBookingOffers } from "@/data/registry";

describe("Haifa and Jaffa city guide regression", () => {
  it("uses destination-specific headings without changing Jaffa", () => {
    expect(destinationSectionHeadings(haifaDestinationContent.placeName)).toEqual({
      food: "Where to eat in Haifa",
      practical: "Practical tips for visiting Haifa",
    });
    expect(destinationSectionHeadings(jaffaDestinationContent.placeName)).toEqual({
      food: "Where to eat in Jaffa",
      practical: "Practical tips for visiting Jaffa",
    });
    expect(haifaDestinationContent.transportTitle).toBe("Getting to and around Haifa");
  });
  it("keeps Google Maps stops in the textual order", () => {
    const upper = new URL(carmelWalkingRoute);
    expect(upper.searchParams.get("origin")).toContain("Carmel Center");
    expect(upper.searchParams.get("waypoints")).toContain("Louis Promenade");
    expect(upper.searchParams.get("destination")).toContain("Upper Balcony");
    const lower = new URL(downtownWalkingRoute);
    expect(lower.searchParams.get("origin")).toContain("Ben Gurion Boulevard");
    expect(lower.searchParams.get("waypoints")?.split("|")[0]).toContain("21 Hagefen");
    expect(lower.searchParams.get("waypoints")?.split("|")[1]).toContain("Wadi Nisnas");
    expect(lower.searchParams.get("destination")).toContain("Turkish Market");
    expect(downtownFullRoute).toBe(downtownWalkingRoute);
  });
  it("matches each tour card to the registered provider product ID and Travelpayouts platform", () => {
    expect(haifaTourPlacements).toHaveLength(3);
    expect(new Set(haifaTourPlacements.map((t) => t.image)).size).toBe(3);
    const codes: Record<string, string> = {
      "coast-private-rosh-hanikra": "368992P3",
      "caesarea-haifa-akko": "22120",
      "north-coast-small-group": "58143P8",
    };
    for (const card of haifaTourPlacements) {
      expect(card.productCode).toBe(codes[card.id]);
      const partner = card.platform === "Viator" ? "viator" : "getyourguide";
      const offer = tourBookingOffers.find(
        (o) => o.productId === card.id && o.partnerId === partner,
      );
      expect(offer, card.title).toBeDefined();
      expect(offer!.publicUrl).toContain(partner + ".com");
      expect(offer!.publicUrl).toContain(
        partner === "viator" ? card.productCode : "-t" + card.productCode,
      );
      expect(affiliateConfig[card.affiliateKey]?.trackingUrl).toContain(
        "https://" + partner + ".tpm.li/",
      );
      expect(card.title).toContain("Haifa");
      expect(card.duration).toBeTruthy();
      expect(card.priceFrom).toMatch(/^From /);
      expect(card.rating).toContain("/5");
    }
    const first = haifaTourPlacements[0]!;
    expect(first.title).toMatch(/private tour/i);
    expect(first.description).toContain("Tel Aviv");
    expect(first.description).not.toMatch(/walking experience|short walk from the port/i);
  });
});
