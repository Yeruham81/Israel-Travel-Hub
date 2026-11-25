import { readRouteSource } from "@/test-utils/read-route-source";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { travelGuidePaths } from "@/data/registry";
import { travelGuides } from "@/data/travelGuides";
import { itineraries } from "@/data/israelItineraries";
import { travelTipsFaqs, travelTipsSources } from "@/data/israelTravelTips";

const source = readFileSync("src/components/IsraelTravelTipsGuide.tsx", "utf8");
const route = readRouteSource("src/routes/travel-blog.israel-travel-tips.tsx");

describe("Israel travel tips — first-time visitor guide", () => {
  it("keeps the existing canonical route with refreshed metadata and dedicated content", () => {
    expect(travelGuidePaths.travelTips).toBe("/travel-blog/israel-travel-tips/");
    expect(route).toContain('travelGuideMeta("travelTips")');
    expect(route).toContain("component: IsraelTravelTipsGuide");
    expect(travelGuides.travelTips.title).toBe("Israel Travel Tips for First-Time Visitors");
    expect(travelGuides.travelTips.updatedAt).toBe("2026-11-21");
    expect(travelGuides.travelTips.description).toContain("ETA-IL");
  });

  it("keeps practical quick tips, four stages, accommodation cards, FAQs and contact", () => {
    expect(source).toContain('id="essentials"');
    expect(source).toContain('id="before-you-travel"');
    expect(source).toContain('id="arriving"');
    expect(source).toContain('id="plan-your-stay"');
    expect(source).toContain('id="everyday"');
    expect(source).toContain('data-testid="essential-tips"');
    expect(source).toContain('data-testid="mobile-extra-quick-tips"');
    expect((source.match(/detail: "/g) || [])).toHaveLength(10);
    expect((source.match(/cta: "Explore .* hotels"/g) || [])).toHaveLength(5);
    expect(travelTipsFaqs).toHaveLength(8);
    expect(source).toContain('data-testid="travel-tips-related-guides"');
    expect((source.match(/title: "(?:Best Time to Visit|Israel.s Calendar|Ben Gurion Airport Arrival|Getting Around Israel|What to Eat|7-Day Israel Itinerary)/g) || [])).toHaveLength(6);
    expect(source).toContain("<HomeContactForm showTripadvisorBesidePortraitMobile guide=");
    expect(source).toContain("<SourcesDisclosure>");
    expect(source).toContain("<AuthorCard/>");
  });

  it("uses the actual itinerary paths and avoids unmaintained safety content", () => {
    const allPaths = ["3", "5", "7", "10"].map(id => itineraries[id as keyof typeof itineraries].path);
    for (const path of allPaths) expect(source).toContain(path);
    expect(source).not.toMatch(/\/travel-blog\/(?:3|5|7|10)-day-israel-itinerary/);
    expect(source.toLowerCase()).not.toContain("is-it-safe-to-travel-to-israel");
    expect(travelTipsSources.some(item => item.href === "https://israel-entry.piba.gov.il/")).toBe(true);
    expect(travelTipsSources.some(item => item.href.endsWith("emergency-information-for-tourists-in-israel-new.pdf"))).toBe(true);
    expect(source).toContain("https://www.iaa.gov.il/en/airports/ben-gurion/securitybgn/");
    expect(source).toContain("Police 100");
    expect(source).toContain("Home Front Command 104");
    expect(source).toContain("Na'im Busofash");
  });

  it("uses local photos and does not add direct independent affiliate links", () => {
    expect(source).toContain('src={travelTipsHero.src}');
    expect(source).toContain('import haifa from "@/assets/haifa/panorama.webp"');
    expect(source).toContain("flex h-full min-w-0 flex-col");
    expect(source).not.toMatch(/awin1.com|shareasale.com|partnerize.com|utm_affiliate=/i);
    expect(source).not.toContain("Some links on this page are affiliate links");
  });
});
