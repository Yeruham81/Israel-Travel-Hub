import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountTaborDestinationContent as content } from "@/components/MountTaborAttractionPage";
import { mountTaborSite as site } from "@/data/mountTaborSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Mount Tabor individual attraction guide", () => {
  it("shares metadata with the directory, keeps six facts, and uses the right route", () => {
    const route = readFileSync("src/routes/attractions.mount-tabor.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: MountTaborAttractionPage");
    expect(content.path).toBe("/attractions/mount-tabor/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Summit access")?.value).toBe("Car or local taxi");
    expect(attractionGuides["mount-tabor"].title).toBe(content.title);
    expect(attractionGuides["mount-tabor"].image).toEqual(site.hero);
    expect(attractionGuides["mount-tabor"].highlights).toHaveLength(0);
    expect(attractionGuides["mount-tabor"].arrival).toHaveLength(0);
    expect(attractionGuides["mount-tabor"].faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("mount-tabor").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(c => String(c.to) === String(content.path))).toHaveLength(1);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });

  it("uses genuine, distinct local images and grounded details on access and visiting", () => {
    const article = readFileSync("src/components/MountTaborAttractionPage.tsx", "utf8");
    expect(existsSync("src/assets/guides/mount-tabor.jpg")).toBe(true);
    const photos = [
      "/images/attractions/mount-tabor-mosaic.webp",
      "/images/attractions/mount-tabor-basilica-aerial.webp",
      "/images/attractions/mount-tabor-orthodox-interior.webp",
      "/images/attractions/mount-tabor-landscape.webp",
    ];
    for (const path of photos) {
      expect(existsSync("public" + path), path).toBe(true);
      expect(article.split(path).length - 1, path).toBe(1);
    }
    expect(article).toContain("Private cars can use the narrow summit road");
    expect(article).toContain("large coaches cannot");
    expect(article).toContain("black-marked summit circuit");
    expect(article).toContain("not normally open for casual sightseeing");
    expect(article).toContain("Antonio Barluzzi");
    expect(article).toContain("1924");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('carRentalAffiliateUrl("/attractions/mount-tabor/")');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain('data-testid="mount-tabor-location-map"');
    expect(article).toContain('data-testid="mount-tabor-visitor-hours"');
    expect(article).toContain('data-testid="mount-tabor-visitor-essentials"');
    expect(article).toContain('href="#contact"');
    expect(article).not.toContain("These are options, not a checklist");
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(content.sources).toHaveLength(4);
    expect(site.visit.visitorPhoneHref).toBe("+97246620720");
    expect(site.visit.friarsPhoneHref).toBe("+97246676300");
    expect(site.sources.parks).toContain("en.parks.org.il");
    expect(site.sources.franciscan).toContain("custodia.org");
  });
});
