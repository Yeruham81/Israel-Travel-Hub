import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { haifaDestinationContent as content } from "@/components/HaifaAttractionPage";
import { haifaSite } from "@/data/haifaSite";
import { haifaMeta } from "@/routes/attractions.haifa";
import { attractionHubRegions } from "@/data/attractionsHub";
import { attractionSidebarRegions } from "@/data/nav";

describe("Haifa city-attractions guide", () => {
  it("uses the complete city guide, eight attractions and practical itinerary sections", () => {
    const page = readFileSync("src/components/HaifaAttractionPage.tsx", "utf8");
    expect(content.path).toBe("/attractions/haifa/");
    expect(content.heroTitle).toBe("Haifa: Attractions & City Guide");
    expect(content.facts).toHaveLength(6);
    expect(content.itineraryFirst).toBe(true);
    expect(content.navigationSections).toHaveLength(8);
    expect(content.navigationSections?.at(-1)).toEqual(["contact", "Contact me"]);
    expect(content.visitorContent).toBeTruthy();
    expect(content.transportContent).toBeTruthy();
    expect(content.foodContent).toBeTruthy();
    expect(content.practicalContent).toBeTruthy();
    expect(content.historyContent).toBeTruthy();
    expect(content.tourContent).toBeTruthy();
    expect(content.faqs).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(page.match(/<AttractionHighlight title=/g)).toHaveLength(8);
    expect(page).toContain('data-testid="haifa-itineraries"');
    expect(page).toContain("Open Lower City walking route in Google Maps");
    expect(page).toContain("Carmel viewpoint walk");
    expect(page).toContain("Google Maps");
    expect(page).toContain("HaifaPartnerTours");
    expect(page).toContain("Talpiot Market");
  });
  it("distinguishes free gardens, booked tours, hillside travel and transport systems", () => {
    const page = readFileSync("src/components/HaifaAttractionPage.tsx", "utf8");
    for(const address of ["61 Yefe Nof", "80 Hatzionut", "21 Hagefen", "45 Yefe Nof"]) expect(page).toContain(address);
    expect(page).toContain("750 stairs");
    expect(page).toContain("Carmelit");
    expect(page).toContain("Rakavlit");
    expect(page).toContain("Metronit");
    expect(page).toContain("Bat Galim");
    expect(page).toContain("Free to explore");
    expect(page).not.toContain("Most attractions are free");
    expect(page).not.toContain("walk down through the terraces");
    expect(page).toContain("<ExternalProviderTourCard");
    expect(readFileSync("src/components/ExternalProviderTourCard.tsx", "utf8")).toContain("rel={relFor(affiliate)}");
    expect(page).toContain("tour-coast-private-rosh-hanikra-viator@tours-northern-coast");
    expect(page).toContain("tour-caesarea-haifa-akko-getyourguide@tours-northern-coast");
  });
  it("appears in Attractions hub and Haifa & Coast sidebar with a legacy redirect", () => {
    const hub = attractionHubRegions.find(r => r.id === "haifa-coast");
    expect(hub?.cards.filter(c => c.id === "haifa")).toHaveLength(1);
    expect(hub?.cards.find(c => c.id === "haifa")?.to).toBe("/attractions/haifa/");
    const nav = attractionSidebarRegions.find(g => g.label === "Haifa & Coast");
    expect(nav && "children" in nav).toBeTruthy();
    if(nav && "children" in nav) expect(nav.children?.find(x => x.label === "Haifa")?.to).toBe("/attractions/haifa/");
    const old = readFileSync("src/routes/travel-blog.haifa.tsx", "utf8");
    expect(old).toContain('<Navigate to="/attractions/haifa/" replace />');
    expect(old).toContain("noindex,follow");
  });
  it("has canonical metadata, researched references and cached photos", () => {
    const meta = haifaMeta();
    expect(meta.links.find(l => l.rel === "canonical")?.href).toContain("/attractions/haifa/");
    expect(haifaSite.official.bahai).toContain("ganbahai.org.il");
    expect(content.sources).toHaveLength(12);
    expect(content.photoCredits).toBeTruthy();
    const images = [
      "haifa-bahai-gardens.webp", "haifa-stella-maris.webp", "haifa-cable-car.webp", "haifa-beach.webp",
      "haifa-german-colony.webp", "haifa-wadi-nisnas.webp", "haifa-turkish-market.webp", "haifa-bat-galim.webp",
    ];
    for(const name of images) expect(existsSync("public/images/attractions/" + name), name).toBe(true);
  });
});
