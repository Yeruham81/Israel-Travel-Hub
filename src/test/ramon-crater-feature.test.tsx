import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { ramonCraterDestinationContent as content } from "@/components/RamonCraterAttractionPage";
import { ramonCraterSite as site } from "@/data/ramonCraterSite";
import { ramonCraterMeta } from "@/routes/attractions.mitzpe-ramon-crater";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Ramon Crater upgraded attraction guide", () => {
  it("uses the unified destination layout, article metadata and real related pages", () => {
    const route = readFileSync("src/routes/attractions.mitzpe-ramon-crater.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: RamonCraterAttractionPage");
    expect(content.path).toBe("/attractions/mitzpe-ramon-crater/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map((x) => x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(5);
    expect(content.sources).toHaveLength(8);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell).toContain("<AuthorCard />");
    expect(attractionHubCards.some((card) => card.to === content.path)).toBe(true);
    const meta = ramonCraterMeta();
    expect(meta.links.find((link) => link.rel === "canonical")?.href).toContain(content.path);
    const article = meta.scripts
      .map((x) => JSON.parse(x.children as string))
      .find((x) => x["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-18");
    expect(article.citation).toContain(site.sources.haiRamon);
  });

  it("clearly separates free viewpoints, paid center, closed Hai Ramon and safe routes", () => {
    const article = readFileSync("src/components/RamonCraterAttractionPage.tsx", "utf8");
    expect(site.visit.adult).toBe("₪31");
    expect(site.visit.child).toBe("₪16");
    expect(site.visit.student).toBe("₪26");
    expect(article).toContain("Closed as of November 2026.");
    expect(article).toContain("Check the current visiting status on the official website");
    expect(article).not.toContain("I am keeping this site in the guide");
    expect(article).not.toContain("Planning a visit to Mitzpe Ramon and the Negev?");
    expect(article).toContain("The rim viewpoints are free");
    expect(article).toContain("Advance reservations are required");
    expect(article).toContain("Nahal Ardon");
    expect(article).toContain("HaMinsara");
    expect(article).toContain("Ramon Colors");
    expect(article).toContain("flash");
    expect(article).toContain('data-testid="ramon-hours-prices"');
    expect(article).toContain('data-testid="ramon-booking"');
    expect(article).toContain('data-testid="ramon-safety"');
    expect(article).toContain('data-testid="ramon-three-stops"');
    expect(article).toContain('data-testid="ramon-panorama"');
    expect(article).toContain('href="#contact"');
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toContain('to="/tours/negev-desert-ramon-crater/"');
  });

  it("uses distinct, locally hosted photos for desert features", () => {
    const paths = [
      "src/assets/negev/ramon-panorama.webp",
      "src/assets/negev/ramon-camel-hill.webp",
      "public/images/attractions/ramon-haminsara-columns.webp",
      "src/assets/negev/ramon-wide.webp",
      "src/assets/negev/ramon-ibexes.webp",
      "src/assets/negev/ramon-jeep.webp",
      "public/images/attractions/hai-ramon-fat-sand-rat.webp",
      "public/images/attractions/ramon-stargazing.webp",
      "src/assets/home/hero-refresh-ramon-crater-v4-large.webp",
    ];
    for (const path of paths) expect(existsSync(path), path).toBe(true);
    expect(new Set(paths).size).toBe(paths.length);
    const article = readFileSync("src/components/RamonCraterAttractionPage.tsx", "utf8");
    expect(article).not.toContain("upload.wikimedia.org");
    expect(article).toContain("src: minsaraPhoto");
    expect(article).toContain("src: sandRatPhoto");
    expect(article).toContain("src: starsPhoto");
  });
});
