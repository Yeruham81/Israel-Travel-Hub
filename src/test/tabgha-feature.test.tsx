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
    expect(article).toContain("<AttractionContentImage");
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
    expect(route).toContain("component: TabghaAttractionPage");
    expect(article).toContain('data-testid="tabgha-mobile-hours"');
    expect(article).toContain('data-testid="tabgha-visitor-table"');
    expect(article).toContain('data-testid="tabgha-location-map"');
    const map = readFileSync("public/maps/tabgha-churches.html", "utf8");
    expect(article).toContain('const tabghaMapEmbed = "/maps/tabgha-churches.html"');
    expect(map).toContain("32.87326, 35.54955");
    expect(map).toContain("32.871858, 35.5503");
    expect(map).toContain('mark(multiplication, "1", "Church of the Multiplication")');
    expect(map).toContain('mark(primacy, "2", "Church of the Primacy of Peter")');
    expect(map).not.toContain("L.Routing");
    expect(map).not.toContain("L.polyline");
    expect(map).not.toContain("maps/dir");
    expect(article).toContain("The two Tabgha churches");
    expect(article).toContain("1. Church of the Multiplication (inland)");
    expect(article).toContain("2. Church of the Primacy of Peter (lakeside)");
    expect(article).toContain("Open larger map");
    expect(article).not.toContain("tabghaMapLarger");
    expect(article).toContain("maps/dir/?api=1&destination=Church%20of%20the%20Multiplication");
    expect(article).toContain("maps/dir/?api=1&destination=Church%20of%20the%20Primacy");
    expect(article).toContain("https://bus.gov.il/en/Geographic-Area");
    expect(article).toContain("Follow the signs to each Tabgha site.");
    expect(article).toContain("You can reach Tabgha by bus from Tiberias");
    expect(article).toContain('carRentalAffiliateUrl("/attractions/tabgha/")');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain("joining an <Link to=\"/tours/nazareth-sea-of-galilee/\"");
    expect(article).toContain('href="#contact" className="font-semibold text-primary underline underline-offset-4">arranging a private day trip with a driver');
    expect(article).toContain("tabghaSite.multiplication.hours");
    expect(article).toContain("tabghaSite.primacy.hours");
    expect(article).toContain("tabghaSite.sources.multiplicationHours");
    expect(article).toContain("tabghaSite.sources.primacyHours");
    expect(article).toContain("tabghaSite.sources.primacyAccessibility");
    expect(article).toContain("An access ramp was installed at the Primacy chapel");
    expect(article).toContain("Car and coach parking is available around Tabgha");
    expect(content.visitorTitle).toBe("Opening hours and visitor information");
    expect(content.visitorNavLabel).toBe("Opening hours & visits");
    expect(shell).toContain('content.visitorTitle ?? "Opening hours, tickets and practical information"');
    expect(shell).toContain('content.visitorNavLabel ?? "Opening hours & tickets"');
    expect(article).toContain("site.source}</a>");
    expect(article).not.toContain(">Official hours</a>");
    expect(article).toContain('href={"tel:" + site.phoneHref}');
    expect(article).toContain("whitespace-nowrap");
    expect(article).toContain("A short visit: about one hour");
    expect(article).toContain("A full-day Galilee and Sea of Galilee trip");
    expect(article).toContain("choosing three to five stops");
    expect(article).toContain('to="/tours/nazareth-sea-of-galilee/"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain("Request a quote");
    expect(article.match(/<AttractionPracticalTip>/g)).toHaveLength(2);
    expect(article).not.toContain("Worth knowing:");
    expect(article).not.toContain("Map: OpenStreetMap contributors");
    expect(article).not.toContain("These are options, not a checklist");
    expect(content.contactIntroduction).toMatch(/^Tell me when you’re visiting/);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });
});
