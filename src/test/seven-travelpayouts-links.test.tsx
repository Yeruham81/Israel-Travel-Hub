import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { affiliateConfig, linksForPage } from "@/data/registry";
import { mountOlivesDestinationContent } from "@/components/MountOlivesAttractionPage";
import { mountZionDestinationContent } from "@/components/MountZionAttractionPage";

describe("Seven exact supplier links upgraded to Travelpayouts", () => {
  const booking = [
    { pageId: "stay-haifa-family-browse", id: "hotels-haifa-booking", url: "https://booking.tpk.lv/IMJh6Qxg" },
    { pageId: "stay-haifa-boutique-browse", id: "hotels-haifa-booking", url: "https://booking.tpk.lv/9d6zS3gn" },
    { pageId: "stay-tiberias-browse", id: "hotels-tiberias-booking", url: "https://booking.tpk.lv/tsl5okP9" },
  ] as const;

  it("routes all three Booking.com CTAs via page-specific Travelpayouts offers", () => {
    expect(new Set(booking.map(item => item.url)).size).toBe(3);
    for (const item of booking) {
      expect(affiliateConfig[item.id + "@" + item.pageId]?.trackingUrl).toBe(item.url);
      const found = linksForPage(item.pageId).filter(link => link.id === item.id);
      expect(found).toHaveLength(1);
      expect(found[0]).toMatchObject({
        providerName: "Booking.com",
        partnerId: "booking",
        isAffiliate: true,
        url: item.url,
      });
    }
    // Non-upgraded destinations remain ordinary editorial links, never rebranded.
    const general = linksForPage("stay-haifa").find(x => x.id === "hotels-haifa-booking");
    expect(general?.url).toBe("https://www.booking.com/city/il/haifa.html");
    expect(general?.isAffiliate).toBe(false);
    const genericTiberias = linksForPage("stay-tiberias").find(x => x.id === "hotels-tiberias-booking");
    expect(genericTiberias?.isAffiliate).toBe(false);
  });

  it("routes the Tel Aviv hotel hub Booking.com CTA to the exact city affiliate link", () => {
    const id = "hotels-telaviv-booking";
    const expected = "https://booking.tpk.lv/uFvoGvgK";
    expect(affiliateConfig[id + "@stay-telaviv"]?.trackingUrl).toBe(expected);
    const links = linksForPage("stay-telaviv").filter(link => link.id === id);
    expect(links).toHaveLength(1);
    expect(links[0]).toMatchObject({ providerName: "Booking.com", partnerId: "booking", url: expected, isAffiliate: true });
  });

  const viator = [
    { code: "6540P87", path: "src/components/MountOlivesAttractionPage.tsx", href: "https://viator.tpk.lv/frgpZFls", source: mountOlivesDestinationContent },
    { code: "117240P3", path: "src/components/MountOlivesAttractionPage.tsx", href: "https://viator.tpk.lv/v3Tk4hG1", source: mountOlivesDestinationContent },
    { code: "208675P3", path: "src/components/MountOlivesAttractionPage.tsx", href: "https://viator.tpk.lv/YV4HrN5E", source: mountOlivesDestinationContent },
    { code: "5209P123", path: "src/components/MountZionAttractionPage.tsx", href: "https://viator.tpk.lv/vEqDCNy8", source: mountZionDestinationContent },
    { code: "5209TEL210", path: "src/components/MountZionAttractionPage.tsx", href: "https://viator.tpk.lv/9aphqexG", source: mountZionDestinationContent },
  ] as const;

  it("uses product-specific short links for all five Viator cards but retains direct editorial citations", () => {
    expect(new Set(viator.map(item => item.href)).size).toBe(5);
    for (const item of viator) {
      const file = readFileSync(item.path, "utf8");
      expect(file).toContain('href: "' + item.href + '"');
      if (item.path.includes("MountOlives")) {
        expect(file).toContain("<CuratedPartnerTourCard");
        const sharedCard = readFileSync("src/components/CuratedPartnerTourCard.tsx", "utf8");
        expect(sharedCard).toContain("<ExternalProviderTourCard");
        const unifiedCard = readFileSync("src/components/ExternalProviderTourCard.tsx", "utf8");
        expect(unifiedCard).toContain("rel={relFor(affiliate)}");
        expect(unifiedCard).toContain("affiliate = true");
      } else {
        expect(file).toContain("<ExternalProviderTourCard");
        expect(readFileSync("src/components/ExternalProviderTourCard.tsx", "utf8")).toContain("rel={relFor(affiliate)}");
      }
      expect(item.source.sources.some(source => source.url.includes(item.code))).toBe(true);
      expect(item.source.sources.some(source => source.url === item.href)).toBe(false);
    }
    for (const path of [...new Set(viator.map(item => item.path))]) {
      const file = readFileSync(path, "utf8");
      expect(file).not.toMatch(/These are direct (?:Viator|provider) links, (?:not tracked affiliate links|without affiliate attribution)/);
    }
  });
});
