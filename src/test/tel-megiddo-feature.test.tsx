import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { readRouteSource } from "@/test-utils/read-route-source";
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
    const route = readRouteSource("src/routes/attractions.tel-megiddo.tsx");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toMatch(sourceFragment("component: TelMegiddoAttractionPage"));
    expect(route).toMatch(sourceFragment('travelGuideMeta("megiddo")'));
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
    expect(shell).toMatch(sourceFragment('["contact", "Contact me"]'));
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(sourceIndex(shell, "<HomeContactForm"));
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
    expect(article).toMatch(sourceFragment("Last admission is one hour before closing."));
    expect(article).toMatch(sourceFragment("183 steps down"));
    expect(article).toMatch(sourceFragment("80 steps up"));
    expect(article).toMatch(sourceFragment("follow the signed path back towards the Canaanite gate"));
    expect(article).toMatch(sourceFragment("The descent is optional"));
    expect(article).toMatch(sourceFragment("official Trip Talk audio guide"));
    expect(article).toMatch(sourceFragment("https://www.parks.org.il/category/megiddo-trip-talk/"));
    expect(article).toMatch(sourceFragment("stop 55407"));
    expect(article).toMatch(sourceFragment("13:00 closing time"));
    expect(article).toMatch(sourceFragment("Holiday-eve opening hours can differ from Friday hours"));
    expect(article).not.toMatch(sourceFragment("<AttractionPracticalTip>"));
    expect(article.split("183 steps down").length - 1).toBe(1);
    expect(article).toMatch(sourceFragment("183 steps down"));
    expect(article).toMatch(sourceFragment("80 steps up"));
    expect(article).toMatch(sourceFragment("Megiddo Antiquities Junction"));
    expect(article).toMatch(sourceFragment("מסעף מגידו עתיקות"));
    expect(article).toMatch(sourceFragment("Road 66"));
    expect(article).toMatch(sourceFragment("https://bus.gov.il/en/home"));
    expect(article).toMatch(sourceFragment('to="/car-rental/"'));
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toMatch(sourceFragment('data-testid="tel-megiddo-location-map"'));
    expect(article).toMatch(sourceFragment('data-testid="tel-megiddo-visitor-hours"'));
    expect(article).toMatch(sourceFragment('data-testid="tel-megiddo-visitor-essentials"'));
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(article).toMatch(sourceFragment("UNESCO-listed Biblical Tels"));
    expect(article).toContain("telMegiddoSite.sources.unesco");
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(item => item.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(4);
    expect(article).not.toMatch(sourceFragment("These are options, not a checklist"));
  });
});
