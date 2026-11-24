import { readRouteSource } from "@/test-utils/read-route-source";
import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { roshHanikraDestinationContent as content } from "@/components/RoshHanikraAttractionPage";
import { roshHanikraSite as site } from "@/data/roshHanikraSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Rosh Hanikra attraction guide", () => {
  it("uses the shared destination layout with correct SEO, contact, sources and recommendations", () => {
    const route = readRouteSource("src/routes/attractions.rosh-hanikra.tsx");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: RoshHanikraAttractionPage");
    expect(route).toContain('attractionMeta("rosh-hanikra")');
    expect(content.path).toBe("/attractions/rosh-hanikra/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Entry")?.value).toBe("₪47 adult");
    expect(content.facts.find(f => f.label === "Accessibility")?.value).toBe("Partly accessible");
    expect(attractionGuides["rosh-hanikra"].title).toBe(content.title);
    expect(attractionGuides["rosh-hanikra"].description).toBe(site.description);
    expect(attractionGuides["rosh-hanikra"].image).toEqual(site.hero);
    expect(attractionGuides["rosh-hanikra"].highlights).toHaveLength(0);
    expect(attractionGuides["rosh-hanikra"].arrival).toHaveLength(0);
    expect(attractionGuides["rosh-hanikra"].faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("rosh-hanikra").scripts)).toContain("2026-11-17");
    const metaCitation = attractionMeta("rosh-hanikra").scripts
      .map(script => JSON.parse(script.children as string))
      .find(script => script["@type"] === "Article");
    expect(metaCitation.citation).toEqual(content.sources.map(source => source.url));
    expect(attractionHubCards.filter(card => String(card.to) === String(content.path))).toHaveLength(1);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(item => item.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(5);
  });

  it("provides practical, verified visitor details and uses distinct local images", () => {
    const article = readFileSync("src/components/RoshHanikraAttractionPage.tsx", "utf8");
    const imageFiles = [
      "src/assets/guides/rosh-hanikra.jpg",
      "public/images/attractions/rosh-hanikra-cable-car.webp",
      "public/images/attractions/rosh-hanikra-blue-grotto.webp",
      "public/images/attractions/rosh-hanikra-railway-tunnel.webp",
      "public/images/attractions/rosh-hanikra-cliffs.webp",
    ];
    const hashes = imageFiles.map(path => {
      expect(existsSync(path), path).toBe(true);
      return createHash("sha256").update(readFileSync(path)).digest("hex");
    });
    expect(new Set(hashes).size).toBe(imageFiles.length);
    for (const path of imageFiles.slice(1)) {
      const url = "/" + path.replace(/^public\//, "");
      expect(article.split(url).length - 1, url).toBe(1);
    }
    expect(site.visit.lastCableAutumnWinter).toBe("16:00");
    expect(site.visit.lastCableSummer).toBe("18:00");
    expect(site.visit.customerServiceHref).toBe("+972732710100");
    expect(article).toContain("100-metre accessible bridge");
    expect(article).toContain("first grotto and part of the second");
    expect(article).not.toContain("Nativ Express line 31");
    expect(article).toContain("₪47");
    expect(article).toContain("₪39");
    expect(article).toContain("₪29");
    expect(article).toContain("every day of the week");
    expect(article).toContain("official homepage");
    expect(article).toContain("Nahariya");
    expect(article).toContain("Haifa–Beirut–Tripoli railway");
    expect(article).toContain("Elephant's Foot");
    expect(article).not.toContain("October 2026");
    expect(article).toContain("https://www.rosh-hanikra.com/tq/en/");
    expect(article).toContain("Child tickets are required from age 3.");
    expect(article).toContain('aria-label="Admission prices"');
    expect(article).not.toContain("Screenings are subject to");
    expect(article).toContain("not a swimming beach");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('to="/car-rental/"');
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toContain('data-testid="rosh-hanikra-location-map"');
    expect(article).toContain('data-testid="rosh-hanikra-visitor-hours"');
    expect(article).toContain('data-testid="rosh-hanikra-visitor-essentials"');
    expect(article).toContain('href="#contact"');
    expect(article).not.toContain("These are options, not a checklist");
  });
});
