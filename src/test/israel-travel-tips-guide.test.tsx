import { sourceFragment } from "@/test-utils/source-fragment";
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
    expect(route).toMatch(sourceFragment('travelGuideMeta("travelTips")'));
    expect(route).toMatch(sourceFragment("component: IsraelTravelTipsGuide"));
    expect(travelGuides.travelTips.title).toBe("Israel Travel Tips for First-Time Visitors");
    expect(travelGuides.travelTips.updatedAt).toBe("2026-11-21");
    expect(travelGuides.travelTips.description).toContain("ETA-IL");
  });

  it("keeps practical quick tips, four stages, accommodation cards, FAQs and contact", () => {
    expect(source).toMatch(sourceFragment('id="essentials"'));
    expect(source).toMatch(sourceFragment('id="before-you-travel"'));
    expect(source).toMatch(sourceFragment('id="arriving"'));
    expect(source).toMatch(sourceFragment('id="plan-your-stay"'));
    expect(source).toMatch(sourceFragment('id="everyday"'));
    expect(source).toMatch(sourceFragment('data-testid="essential-tips"'));
    expect(source).toMatch(sourceFragment('data-testid="mobile-extra-quick-tips"'));
    expect((source.match(/detail: "/g) || [])).toHaveLength(10);
    expect((source.match(/cta: "Explore .* hotels"/g) || [])).toHaveLength(5);
    expect(travelTipsFaqs).toHaveLength(8);
    expect(source).toMatch(sourceFragment('data-testid="travel-tips-related-guides"'));
    expect((source.match(/title: "(?:Best Time to Visit|Israel.s Calendar|Ben Gurion Airport Arrival|Getting Around Israel|What to Eat|7-Day Israel Itinerary)/g) || [])).toHaveLength(6);
    expect(source).toMatch(sourceFragment("<HomeContactForm showTripadvisorBesidePortraitMobile guide="));
    expect(source).toMatch(sourceFragment("<SourcesDisclosure>"));
    expect(source).toMatch(sourceFragment("<AuthorCard/>"));
  });

  it("uses the actual itinerary paths and avoids unmaintained safety content", () => {
    const allPaths = ["3", "5", "7", "10"].map(id => itineraries[id as keyof typeof itineraries].path);
    for (const path of allPaths) expect(source).toMatch(sourceFragment(path));
    expect(source).not.toMatch(/\/travel-blog\/(?:3|5|7|10)-day-israel-itinerary/);
    expect(source.toLowerCase()).not.toContain("is-it-safe-to-travel-to-israel");
    expect(travelTipsSources.some(item => item.href === "https://israel-entry.piba.gov.il/")).toBe(true);
    expect(travelTipsSources.some(item => item.href.endsWith("emergency-information-for-tourists-in-israel-new.pdf"))).toBe(true);
    expect(source).toMatch(sourceFragment("https://www.iaa.gov.il/en/airports/ben-gurion/securitybgn/"));
    expect(source).toMatch(sourceFragment("Police 100"));
    expect(source).toMatch(sourceFragment("Home Front Command 104"));
    expect(source).toMatch(sourceFragment("Na'im Busofash"));
  });

  it("uses local photos and does not add direct independent affiliate links", () => {
    expect(source).toMatch(sourceFragment('src={travelTipsHero.src}'));
    expect(source).toMatch(sourceFragment('import haifa from "@/assets/haifa/panorama.webp"'));
    expect(source).toMatch(sourceFragment("flex h-full min-w-0 flex-col"));
    expect(source).not.toMatch(/awin1.com|shareasale.com|partnerize.com|utm_affiliate=/i);
    expect(source).not.toMatch(sourceFragment("Some links on this page are affiliate links"));
  });
});
