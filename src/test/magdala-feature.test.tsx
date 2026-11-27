import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { magdalaDestinationContent as content } from "@/components/MagdalaAttractionPage";
import { magdalaSite as site } from "@/data/magdalaSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Magdala individual attraction guide upgrade", () => {
  it("unifies the destination, metadata and official daily hours", () => {
    expect(content.path).toBe("/attractions/magdala/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find((f) => f.label === "Archaeological park")?.value).toBe("08:00–17:30");
    expect(content.facts.find((f) => f.label === "Duc In Altum")?.value).toBe("08:00–18:00");
    expect(content.facts.find((f) => f.label === "Admission")?.value).toBe("₪20 (ages 13+)");
    expect(content.facts.find((f) => f.label === "Admission")?.note).toBe(
      "₪17 per visitor in groups of 10+",
    );
    expect(content.visitorTitle).toBe("Opening hours, tickets and visitor information");
    expect(content.visitorNavLabel).toBe("Hours & tickets");
    expect(travelGuides.magdala.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.magdala.title).toBe(content.title);
    expect(travelGuides.magdala.description).toBe(site.description);
    expect(JSON.stringify(travelGuideMeta("magdala").scripts)).toContain("2026-11-17");
    expect(
      attractionHubCards.filter((item) => String(item.to) === String(content.path)),
    ).toHaveLength(1);
  });

  it("uses distinct local Magdala photographs for the hero and illustrated attractions", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    const paths = [
      "/images/attractions/magdala-duc-in-altum-exterior.webp",
      "/images/attractions/magdala-first-century-synagogue.webp",
      "/images/attractions/magdala-boat-chapel.webp",
      "/images/attractions/magdala-womens-atrium.webp",
    ];
    for (const src of paths) {
      expect(existsSync("public" + src), src).toBe(true);
    }
    expect(site.hero.src).toBe(paths[0]);
    for (const src of paths.slice(1)) {
      expect(article.split(src).length - 1, src).toBe(1);
    }
    expect(content.sources).toHaveLength(6);
    expect(content.sources.every((s) => s.url.startsWith("https://"))).toBe(true);
  });

  it("provides confirmed admission prices, a Google Maps pin and current official contacts", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.magdala.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toMatch(sourceFragment("component: MagdalaAttractionPage"));
    expect(article).toMatch(sourceFragment('data-testid="magdala-hours-tickets"'));
    expect(article).toMatch(sourceFragment('data-testid="magdala-location-map"'));
    expect(article).toMatch(sourceFragment('data-testid="magdala-visitor-essentials"'));
    expect(article).toMatch(
      sourceFragment("maps.google.com/maps?q=Magdala%20Archaeological%20Park"),
    );
    expect(article).toMatch(
      sourceFragment("www.google.com/maps/search/?api=1&query=Magdala%20Archaeological%20Park"),
    );
    expect(article).not.toContain("openstreetmap.org");
    expect(article).not.toMatch(sourceFragment("saddr="));
    expect(article).not.toMatch(sourceFragment("daddr="));
    expect(article).toMatch(sourceFragment("https://bus.gov.il/en/home"));
    expect(article).toMatch(sourceFragment('to="/car-rental/"'));
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(article).toMatch(sourceFragment('to="/tours/nazareth-sea-of-galilee/"'));
    expect(article).not.toMatch(sourceFragment("No current official price list online"));
    expect(article).not.toMatch(sourceFragment("does not publish a current admission price list"));
    expect(article).not.toMatch(sourceFragment("How much does it cost to enter Magdala?"));
    expect(site.visit.regularAdmissionPrice).toBe("₪20");
    expect(site.visit.regularAdmissionAge).toBe("Over 12");
    expect(site.visit.groupAdmissionPrice).toBe("₪17");
    expect(site.visit.groupMinimumSize).toBe(10);
    expect(article).toMatch(sourceFragment("Visitors over age 12"));
    expect(article).toMatch(
      sourceFragment(
        "Contact the visitor center for group rates, additional ticket prices and guided tours.",
      ),
    );
    expect(site.visit.visitorEmail).toBe("visit@magdala.org");
    expect(article).toContain("visit.visitorEmail");
    expect(site.visit.prayerEmail).toBe("ducinaltum@magdala.org");
    expect(article).toContain("visit.prayerEmail");
    expect(site.visit.visitorPhoneHref).toBe("+97246209900");
    expect(site.visit.prayerPhoneHref).toBe("+972533261622");
    expect(shell).toMatch(sourceFragment('["contact", "Contact me"]'));
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(
      sourceIndex(shell, "<HomeContactForm"),
    );
  });

  it("plans a manageable Galilee day, with relevant places and six follow-up guides", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    expect(article).toMatch(sourceFragment("three to five sites"));
    expect(article).toMatch(sourceFragment("The Magdala Stone"));
    expect(article).toMatch(sourceFragment("Streets, marketplace and ritual baths"));
    expect(article).toMatch(sourceFragment("Duc In Altum and the Boat Chapel"));
    expect(article).toMatch(sourceFragment("The Women's Atrium and other chapels"));
    expect(article).toMatch(sourceFragment("The stone displayed in the synagogue is a replica"));
    expect(article).toMatch(sourceFragment("Israel Antiquities Authority’s collection"));
    expect(article).toMatch(sourceFragment("24 December, visiting hours are 08:00–12:00"));
    expect(article).toMatch(sourceFragment("Christmas Day (25 December) and Yom Kippur"));
    expect(article).toMatch(sourceFragment("floor incorporates first-century paving stones"));
    expect(article).toMatch(sourceFragment("ancient marketplace near the harbour"));
    expect(site.sources.stoneCatalogue).toContain("metmuseum.org");
    expect(content.sources.some((source) => source.label.includes("Magdala Stone catalogue"))).toBe(
      true,
    );
    expect(content.nearby?.map((item) => item.to)).toEqual([
      "/attractions/tabgha/",
      "/attractions/capernaum/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(7);
  });
});
