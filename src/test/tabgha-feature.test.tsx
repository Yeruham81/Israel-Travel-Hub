import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { tabghaDestinationContent as content } from "@/components/TabghaAttractionPage";
import { tabghaSite } from "@/data/tabghaSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionHubCards } from "@/data/attractionsHub";
import { attractionMeta } from "@/components/AttractionGuidePage";

describe("Tabgha visitor guide follows the individual-attraction template", () => {
  it("keeps Tabgha metadata, dates and church-specific visitor hours consistent", () => {
    expect(content.path).toBe("/attractions/tabgha/");
    expect(content.title).toBe(tabghaSite.title);
    expect(content.intro).toBe(tabghaSite.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Multiplication church")?.value).toBe("09:00–15:00");
    expect(content.facts.find(f => f.label === "Primacy church")?.value).toBe("08:00–17:00");
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("No published fee");
    expect(tabghaSite.multiplication.closed).toBe("Sunday");
    expect(tabghaSite.multiplication.lastEntry).toBe("14:45");
    expect(tabghaSite.primacy.lastEntry).toBe("16:30");
    expect(tabghaSite.sources.multiplicationHours).toBe("https://dormitio.net/tabgha/gottesdienst-und-oeffnungszeiten/");
    expect(tabghaSite.sources.primacyHours).toContain("www.cicts.org/our-services/#:~:text=Tabgha");
    expect(attractionGuides.tabgha.title).toBe(content.title);
    expect(attractionGuides.tabgha.intro).toBe(content.intro);
    expect(attractionGuides.tabgha.highlights).toHaveLength(0);
    expect(attractionGuides.tabgha.arrival).toHaveLength(0);
    expect(attractionGuides.tabgha.planning).toHaveLength(0);
    expect(attractionGuides.tabgha.faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("tabgha").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(card => String(card.to) === String(content.path))).toHaveLength(1);
  });

  it("uses four different genuine locally stored Tabgha images and related routes", () => {
    const photos = [
      "/images/attractions/tabgha-multiplication-church.webp",
      "/images/attractions/tabgha-loaves-fishes-mosaic.webp",
      "/images/attractions/tabgha-primacy-chapel.webp",
      "/images/attractions/tabgha-primacy-interior.webp",
    ];
    expect(photos.every(path => existsSync("public" + path))).toBe(true);
    const article = readFileSync("src/components/TabghaAttractionPage.tsx", "utf8");
    for (const path of photos) expect(article.split(path).length - 1).toBe(1);
    expect(article).toMatch(sourceFragment("<AttractionContentImage"));
    expect(content.nearby?.map(item => item.to)).toEqual([
      "/attractions/capernaum/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/magdala/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.planningLinks).toHaveLength(6);
    expect(new Set(content.nearby?.map(item => String(item.to))).size).toBe(6);
    expect(content.sources).toHaveLength(6);
    expect(content.sources.every(s => s.url.startsWith("https://"))).toBe(true);
  });

  it("provides practical planning, readable phones, an interactive location map and one form", () => {
    const article = readFileSync("src/components/TabghaAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.tabgha.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toMatch(sourceFragment("component: TabghaAttractionPage"));
    expect(article).not.toMatch(sourceFragment('data-testid="tabgha-mobile-hours"'));
    expect(article).toContain("overflow-x-auto");
    expect(article).toMatch(sourceFragment('data-testid="tabgha-visitor-table"'));
    expect(article).toMatch(sourceFragment('data-testid="tabgha-location-map"'));
    expect(article).toMatch(sourceFragment('const tabghaMapEmbed = "https://maps.google.com/maps?q=Tabgha%2C%20Israel&hl=en&z=15&t=m&output=embed"'));
    expect(article).toMatch(sourceFragment('const tabghaMapLarger = "https://www.google.com/maps/search/?api=1&query=Tabgha%2C%20Israel&hl=en"'));
    expect(article).toMatch(sourceFragment("Where is Tabgha?"));
    expect(article).toMatch(sourceFragment("View larger map"));
    expect(article).not.toContain("maps/tabgha-churches.html");
    expect(article).not.toMatch(sourceFragment("The two Tabgha churches"));
    expect(article).not.toMatch(sourceFragment("saddr="));
    expect(article).not.toMatch(sourceFragment("daddr="));
    expect(existsSync("public/maps/tabgha-churches.html")).toBe(false);
    expect(article).toMatch(sourceFragment("maps/dir/?api=1&destination=Church%20of%20the%20Multiplication"));
    expect(article).toMatch(sourceFragment("maps/dir/?api=1&destination=Church%20of%20the%20Primacy"));
    expect(article).toMatch(sourceFragment("https://bus.gov.il/en/home"));
    expect(article).not.toMatch(sourceFragment("https://bus.gov.il/en/Geographic-Area"));
    expect(article).toMatch(sourceFragment("Follow the signs to each Tabgha site."));
    expect(article).toMatch(sourceFragment("Buses from Tiberias serve Tabgha"));
    expect(article).toMatch(sourceFragment('to="/car-rental/"'));
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toMatch(sourceFragment("joining an <Link to=\"/tours/nazareth-sea-of-galilee/\""));
    expect(article).toMatch(sourceFragment('href="#contact" className="font-semibold text-primary underline underline-offset-4">arranging a private day trip with a driver'));
    expect(article).toContain("tabghaSite.multiplication.hours");
    expect(article).toContain("tabghaSite.primacy.hours");
    expect(article).toContain("tabghaSite.sources.multiplicationHours");
    expect(article).toContain("tabghaSite.sources.primacyHours");
    expect(article).toContain("tabghaSite.sources.primacyAccessibility");
    expect(article).toMatch(sourceFragment("An access ramp was installed at the Primacy chapel"));
    expect(article).toMatch(sourceFragment("Car and coach parking is available around Tabgha"));
    expect(content.visitorTitle).toBe("Opening hours and visitor information");
    expect(content.visitorNavLabel).toBe("Opening hours & visits");
    expect(shell).toMatch(sourceFragment('content.visitorTitle ?? "Opening hours, tickets and practical information"'));
    expect(shell).toMatch(sourceFragment('content.visitorNavLabel ?? "Opening hours & tickets"'));
    expect(article).toMatch(sourceFragment("site.source}</a>"));
    expect(article).not.toMatch(sourceFragment(">Official hours</a>"));
    expect(article).toMatch(sourceFragment('href={"tel:" + site.phoneHref}'));
    expect(article).toContain("whitespace-nowrap");
    expect(article).toMatch(sourceFragment("A short visit: about one hour"));
    expect(article).toMatch(sourceFragment("A full-day Galilee and Sea of Galilee trip"));
    expect(article).toMatch(sourceFragment("choosing three to five stops"));
    expect(article).toMatch(sourceFragment('to="/tours/nazareth-sea-of-galilee/"'));
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(article).toMatch(sourceFragment("Request a quote"));
    expect(article.match(/<AttractionPracticalTip>/g)).toHaveLength(2);
    expect(article).not.toMatch(sourceFragment("Worth knowing:"));
    expect(article).not.toMatch(sourceFragment("Map: OpenStreetMap contributors"));
    expect(article).not.toMatch(sourceFragment("These are options, not a checklist"));
    expect(content.contactIntroduction).toMatch(/^Tell me your date, pickup point/);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(sourceIndex(shell, "<HomeContactForm"));
  });
});
