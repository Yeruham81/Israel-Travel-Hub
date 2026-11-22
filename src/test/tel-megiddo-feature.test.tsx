import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { telMegiddoDestinationContent as content } from "@/components/TelMegiddoAttractionPage";
import { telMegiddoSite as site } from "@/data/telMegiddoSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";
import { publicSources } from "@/data/registry";

describe("Tel Megiddo attraction guide", () => {
  it("uses the shared attraction page with synchronized SEO and no obsolete guide", () => {
    const route = readFileSync("src/routes/attractions.tel-megiddo.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: TelMegiddoAttractionPage");
    expect(route).toContain('travelGuideMeta("megiddo")');
    expect(content.path).toBe("/attractions/tel-megiddo/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "World Heritage")?.value).toBe("UNESCO since 2005");
    expect(travelGuides.megiddo.title).toBe(site.title);
    expect(travelGuides.megiddo.description).toBe(site.description);
    expect(travelGuides.megiddo.photo).toEqual(site.hero);
    expect(travelGuides.megiddo.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.megiddo.sections).toHaveLength(0);
    expect(travelGuides.megiddo.faqs).toHaveLength(0);
    expect(travelGuides.megiddo.comparison.rows).toHaveLength(0);
    expect(travelGuides.megiddo.sourceIds).toEqual([
      "m26-megiddo",
      "m26-megiddo-reservation",
      "m26-unesco-tels",
      "m26-megiddo-water-system",
    ]);
    const citations = publicSources(travelGuides.megiddo.sourceIds).map(source => source.url);
    expect(citations).toEqual(content.sources.map(source => source.url));
    const articleLd = travelGuideMeta("megiddo").scripts
      .map(script => JSON.parse(script.children as string))
      .find(script => script["@type"] === "Article");
    expect(articleLd.citation).toEqual(citations);
    expect(articleLd.dateModified).toBe("2026-11-17");
    expect(attractionHubCards.filter(c => String(c.to) === String(content.path))).toHaveLength(1);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });

  it("shows accurate visitor essentials, transport and three nonrepeating local images", () => {
    const article = readFileSync("src/components/TelMegiddoAttractionPage.tsx", "utf8");
    expect(existsSync("src/assets/guides/2026-10/tel-megiddo.webp")).toBe(true);
    for (const image of [
      "/images/attractions/tel-megiddo-gate.webp",
      "/images/attractions/tel-megiddo-city-layers.webp",
      "/images/attractions/tel-megiddo-aerial.webp",
    ]) {
      expect(existsSync("public" + image), image).toBe(true);
      expect(article.split(image).length - 1, image).toBe(1);
    }
    expect(site.prices).toEqual({ adult: "₪31", child: "₪16" });
    expect(site.hours.summerRegular).toBe("08:00–17:00");
    expect(site.hours.winterRegular).toBe("08:00–16:00");
    expect(article).toContain("Last admission is one hour before closing.");
    expect(article).toContain("183 steps down");
    expect(article).toContain("80 steps up");
    expect(article).toContain("follow the signed path back towards the Canaanite gate");
    expect(article).toContain("The descent is optional");
    expect(article).toContain("official Trip Talk audio guide");
    expect(article).toContain("https://www.parks.org.il/category/megiddo-trip-talk/");
    expect(article).toContain("stop 55407");
    expect(article).toContain("13:00 closing time");
    expect(article).toContain("Holiday-eve hours are not necessarily the same as Friday hours");
    expect(article).not.toContain("<AttractionPracticalTip>");
    expect(article.split("183 steps down").length - 1).toBe(1);
    expect(article).toContain("183 steps down");
    expect(article).toContain("80 steps up");
    expect(article).toContain("Megiddo Antiquities Junction");
    expect(article).toContain("מסעף מגידו עתיקות");
    expect(article).toContain("Road 66");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('to="/car-rental/"');
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toContain('data-testid="tel-megiddo-location-map"');
    expect(article).toContain('data-testid="tel-megiddo-visitor-hours"');
    expect(article).toContain('data-testid="tel-megiddo-visitor-essentials"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain("UNESCO-listed Biblical Tels");
    expect(article).toContain("telMegiddoSite.sources.unesco");
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(item => item.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(4);
    expect(article).not.toContain("These are options, not a checklist");
  });
});
