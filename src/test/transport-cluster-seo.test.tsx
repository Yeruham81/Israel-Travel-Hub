import { describe, expect, it } from "vitest";
import { airportJourneyGuides, airportJourneyIds } from "@/data/airportJourneyGuides";
import { airportJourneyMeta } from "@/components/AirportJourneyPage";
import { airportRouteMeta } from "@/components/AirportRoutePage";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { airportTransferRoutes, travelGuidePaths } from "@/data/registry";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";

const transportGuideIds = [
  "taxis", "taxiFares", "airportTaxis", "uber",
  "sherut", "shabbat", "israel", "telAviv",
] as const;

const canonical = (head: { links?: { rel: string; href: string }[] }) =>
  head.links?.find(link => link.rel === "canonical")?.href;

describe("transport cluster: twelve editorial guides and four private landings", () => {
  it("gives all sixteen pages unique titles, descriptions, routes and self-canonicals", () => {
    const pages = [
      ...transportGuideIds.map(id => {
        const guide = travelGuides[id];
        return { intent: "informational", path: travelGuidePaths[id], title: guide.title, description: guide.description, head: travelGuideMeta(id) };
      }),
      ...airportJourneyIds.map(id => {
        const guide = airportJourneyGuides[id];
        return { intent: "comparison", path: guide.path, title: guide.title, description: guide.description, head: airportJourneyMeta(id) };
      }),
      ...airportTransferRoutes.map(route => {
        const guide = getAirportRouteGuide(route.id);
        return { intent: "private", path: guide.path, title: guide.title, description: guide.description, head: airportRouteMeta(route.id) };
      }),
    ];
    expect(pages).toHaveLength(16);
    expect(new Set(pages.map(p => p.path)).size).toBe(16);
    expect(new Set(pages.map(p => p.title)).size).toBe(16);
    for (const page of pages) {
      expect(page.title.length).toBeGreaterThan(20);
      expect(page.description.length).toBeGreaterThan(70);
      expect(canonical(page.head)).toMatch(new RegExp(page.path.replaceAll("/", "\\/") + "$"));
      expect(page.head.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
      if (page.intent === "private") {
        expect(page.title).toMatch(/^Private transfer/);
        expect(JSON.parse(page.head.scripts!.at(-1)!.children).mainEntity.serviceType).toBe("Private airport transfer");
      } else if (page.intent === "comparison") {
        expect(page.title).toMatch(/^How to get from Ben Gurion Airport/i);
        expect(JSON.parse(page.head.scripts!.at(-1)!.children)["@type"]).toBe("Article");
      }
    }
  });

  it("keeps public-mode comparisons separate from booking pages, and verifies contextual anchor phrases", () => {
    for (const id of airportJourneyIds) {
      const guide = airportJourneyGuides[id];
      const privateId = id === "ein-bokek" ? "dead-sea" : id;
      const privateGuide = getAirportRouteGuide(privateId);
      expect(guide.privatePath).toBe(privateGuide.path);
      expect(guide.path).not.toBe(privateGuide.path);
      expect(guide.options.map(option => option.id)).toEqual(expect.arrayContaining(["rail", "taxi", "private"]));
      expect(guide.options.filter(o => o.id === "private")).toHaveLength(1);
      expect(guide.faqs.length).toBeGreaterThanOrEqual(9);
      for (const option of guide.options) {
        for (const link of option.inlineLinks || []) {
          expect(option.paragraphs.join(" ").split(link.text).length - 1, id + ": " + link.text).toBe(1);
          expect(link.to).not.toBe(guide.path);
        }
      }
      for (const link of guide.stationLinks || []) {
        expect(guide.trainIntro.includes(link.text), id + ": station link " + link.text).toBe(true);
      }
      for (const link of guide.weekendLinks || []) {
        expect(guide.weekend.join(" ").split(link.text).length - 1, id + ": weekend link " + link.text).toBe(1);
      }
    }
  });

  it("uses contextual internal links in every major city/taxi/public-transport editorial page", () => {
    for (const id of transportGuideIds) {
      const guide = travelGuides[id];
      const contextual = guide.sections.flatMap(section =>
        (section.inlineLinks || []).map(link => ({ section, link }))
      );
      expect(contextual.length, id + " should have in-paragraph links").toBeGreaterThan(0);
      for (const { section, link } of contextual) {
        expect(section.paragraphs.join(" ").includes(link.text), id + ": " + link.text).toBe(true);
        expect(link.to).not.toBe(travelGuidePaths[id]);
        expect(link.to).not.toBe("/transfers/ben-gurion-airport/");
      }
      expect(guide.related.length, id + " needs topical links").toBeGreaterThan(0);
      expect(guide.sourceIds.length).toBeGreaterThan(0);
    }
  });

  it("retains Ein Bokek's Jerusalem-first route, current-fare caution and full guide design", () => {
    const guide = airportJourneyGuides["ein-bokek"];
    expect(guide.updatedAt).toBe("2026-10-22");
    expect(guide.historicalPrices).toBe(false);
    expect(guide.title).toMatch(/2026.*Bus.*Taxi.*Car/);
    expect(guide.answer).toMatch(/Jerusalem.*486.*444/s);
    expect(guide.answer).toMatch(/voucher/);
    expect(guide.options.map(o => o.id)).not.toContain("alternative");
    expect(guide.trainIntro).toMatch(/421.*limited alternative/);
    expect(guide.options.find(o => o.id === "rail")?.cost).not.toContain("₪");
    expect(guide.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    expect(guide.options.every(option => (option.inlineLinks?.length || 0) > 0)).toBe(true);
    expect(guide.photos?.station.alt).toContain("Terminal 3");
    expect(guide.photos?.onward.alt).toContain("Dead Sea");
    expect(guide.sources).toHaveLength(6);
    expect(guide.faqs).toHaveLength(10);
    expect(guide.weekend.join(" ")).toMatch(/Shabbat/);
    expect(guide.related.some(link => link.to === "/travel-blog/jerusalem-to-the-dead-sea/")).toBe(true);
  });

  it("keeps the Tel Aviv local transport hub distinct from the airport-only article", () => {
    const guide = travelGuides.telAviv;
    expect(guide.title).toMatch(/Getting Around Tel Aviv.*2026/);
    expect(guide.sections.map(section => section.id)).toEqual(["walking", "buses-light-rail", "rail", "weekend-and-bikes"]);
    expect(guide.sections.filter(section => (section.inlineLinks?.length || 0) > 0)).toHaveLength(4);
    expect(guide.faqs.length).toBeGreaterThanOrEqual(7);
    expect(guide.sections.find(section => section.id === "rail")?.inlineLinks).toEqual(expect.arrayContaining([
      { text: "Ben Gurion Airport to Tel Aviv journey guide", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
    ]));
  });
});
