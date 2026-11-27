import { sourceFragment } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import {
  christianAreas,
  christianRoutes,
  christianOffers,
  christianFaqs,
  christianPlanningCards,
  christianSiteCards,
} from "@/data/christianToursGuide";
import { affiliateConfig, travelGuidePaths } from "@/data/registry";
import { travelGuides, guideDirectory } from "@/data/travelGuides";
import { allNavGroups } from "@/data/nav";

const page = readFileSync("src/components/ChristianToursGuide.tsx", "utf8");
const data = readFileSync("src/data/christianToursGuide.ts", "utf8");

describe("Christian tours in Israel editorial guide", () => {
  it("registers exactly one canonical travel-blog page with article metadata and directory navigation", () => {
    expect(travelGuidePaths.christianTours).toBe("/travel-blog/christian-tours-in-israel/");
    expect(existsSync("src/routes/travel-blog.christian-tours-in-israel.tsx")).toBe(true);
    expect(guideDirectory.filter((g) => g.to === travelGuidePaths.christianTours)).toHaveLength(1);
    expect(travelGuides.christianTours.title).toMatch(/^Christian Tours in Israel/);
    expect(travelGuides.christianTours.topics).toContain("religion");
    expect(
      allNavGroups.some((g) =>
        g.items.some((item) => "to" in item && item.to === travelGuidePaths.christianTours),
      ),
    ).toBe(true);
    expect(page).toMatch(sourceFragment("<AuthorCard/>"));
    expect(page).toMatch(sourceFragment("<HomeContactForm"));
    expect(page).toMatch(sourceFragment("<SourcesDisclosure>"));
    expect(page).toContain("PageUpdated");
    expect(page).not.toMatch(sourceFragment("Top 7 Places to Visit"));
  });
  it("contains seven distinct areas, practical routes, FAQs, related guides and careful cross-border guidance", () => {
    expect(christianAreas).toHaveLength(7);
    expect(new Set(christianAreas.map((a) => a.id)).size).toBe(7);
    expect(christianAreas.flatMap((a) => a.sites).length).toBeGreaterThan(17);
    expect(christianRoutes.map((r) => r.time)).toEqual(["1 day", "2 days", "4 days", "7 days"]);
    expect(christianRoutes.map((r) => r.mapLegs.length)).toEqual([1, 2, 4, 5]);
    for (const route of christianRoutes) {
      for (const leg of route.mapLegs) {
        expect(leg.origin).toBeTruthy();
        expect(leg.destination).toBeTruthy();
        expect(["walking", "driving"]).toContain(leg.mode);
      }
    }
    expect(
      christianAreas
        .find((a) => a.id === "bethlehem")
        ?.sites.every((s) => s.officialUrl && s.mapPlace),
    ).toBe(true);
    expect(
      christianAreas
        .find((a) => a.id === "carmel")
        ?.sites.every((s) => s.officialUrl && s.mapPlace),
    ).toBe(true);
    expect(christianFaqs.length).toBeGreaterThanOrEqual(8);
    expect(christianSiteCards).toHaveLength(6);
    expect(christianPlanningCards).toHaveLength(6);
    expect(page).toMatch(sourceFragment("Google Maps"));
    expect(page).toMatch(sourceFragment('query.set("waypoints",leg.waypoints.join("|"))'));
    expect(page).toContain("site.officialUrl");
    expect(page).toMatch(sourceFragment("West Bank"));
    expect(christianAreas.find((area) => area.intro.includes("Qasr al-Yahud"))?.intro).toMatch(
      /Qasr al-Yahud.*traditionally associated with Jesus\x27 baptism.*Yardenit is a modern baptism site/s,
    );
    expect(data).toMatch(sourceFragment("separate half- or full-day visit"));
  });
  it("links exactly six product-specific tours through Travelpayouts with page-specific attribution", () => {
    expect(christianOffers).toHaveLength(6);
    const south = christianOffers.filter((t) => t.group === "south");
    const north = christianOffers.filter((t) => t.group === "north");
    expect(south).toHaveLength(3);
    expect(north).toHaveLength(3);
    expect(south.map((t) => t.id)).toContain("baptism-jericho");
    expect(north.map((t) => t.id)).toContain("nazareth-yardenit");
    expect(north.map((t) => t.id)).not.toContain("baptism-jericho");
    expect(
      christianOffers.every((t) => !("startingPriceUsd" in t || "rating" in t || "reviews" in t)),
    ).toBe(true);
    for (const offer of christianOffers) {
      expect(affiliateConfig[offer.affiliateKey]?.trackingUrl, offer.affiliateKey).toMatch(
        /^https:\/\/(?:viator|getyourguide)\.tpm\.li\//,
      );
      expect(offer.subId).toMatch(/^christian_tours_/);
    }
    expect(page).toMatch(sourceFragment('searchParams.set("sub_id",tour.subId)'));
    expect(page).toMatch(sourceFragment("<ExternalProviderTourCard"));
    expect(page).toMatch(sourceFragment("lg:grid-cols-3"));
    expect(page).not.toMatch(sourceFragment("https://www.viator.com/tours/"));
    expect(page).not.toMatch(sourceFragment("https://www.getyourguide.com/"));
  });
  it("uses existing local images and never duplicates an image path", () => {
    const matches = [...data.matchAll(/"\/images\/[^"]+\.(?:webp|jpg|png)"/g)].map((m) =>
      m[0].slice(1, -1),
    );
    for (const path of matches) expect(existsSync("public" + path), path).toBe(true);
    const images = christianAreas
      .map((a) => a.image)
      .concat(
        christianOffers.map((o) => o.image),
        christianSiteCards.map((x) => x.image),
        christianPlanningCards.map((x) => x.image),
        [travelGuides.christianTours.photo.src],
      );
    expect(new Set(images).size).toBe(images.length);
    expect(christianSiteCards.some((c) => c.title === "Visiting Bethlehem from Jerusalem")).toBe(
      true,
    );
    expect(christianPlanningCards.find((c) => c.to === "/private-driver-in-israel/")?.alt).toMatch(
      /private transport/,
    );
  });
});
