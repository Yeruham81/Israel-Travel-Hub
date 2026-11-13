import { describe, expect, it } from "vitest";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "@/routeTree.gen";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { itineraryIds, itineraries, itinerarySourcesByGuide } from "@/data/israelItineraries";
import { threeDayJerusalemTourSelections } from "@/components/JerusalemItineraryTourOptions";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";
import { bethlehemTourCards } from "@/data/bethlehemTourOffers";
import { affiliateConfig } from "@/data/registry";
import { getYourGuideCityWidgetSrc, getYourGuideWidgetCities } from "@/lib/getyourguide-city-widget";
import { itineraryCards } from "@/data/hotelHub";
import { guideDirectory } from "@/data/travelGuides";
import { allNavGroups } from "@/data/nav";

const file = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("migrated Israel itineraries", () => {
  it("preserves the four legacy slugs as new independent article routes", () => {
    expect(itineraryIds).toEqual(["3", "5", "7", "10"]);
    for (const id of itineraryIds) {
      const guide = itineraries[id];
      expect(guide.days).toBe(Number(id));
      expect(guide.path).toBe(`/travel-blog/israel-itinerary-${id}-days/`);
      expect(file(`src/routes/travel-blog.israel-itinerary-${id}-days.tsx`)).toContain(`itineraryMeta("${id}")`);
      expect(guide.daysPlan).toHaveLength(guide.days);
      expect(new Set(guide.daysPlan.map(d => d.name)).size).toBe(guide.days);
      expect(guide.description.length).toBeGreaterThan(95);
    }
  });

  it("answers separate trip-length search intents with distinct hotel and itinerary decisions", () => {
    expect(itineraries["3"].intro).toMatch(/three full sightseeing days/i);
    expect(itineraries["5"].intro).toMatch(/five full days/i);
    expect(itineraries["7"].intro).toMatch(/week/i);
    expect(itineraries["10"].intro).toMatch(/Eilat and Timna/i);
    expect(itineraries["3"].hotelBases).not.toEqual(itineraries["7"].hotelBases);
    expect(itineraries["7"].hotelBases).not.toEqual(itineraries["10"].hotelBases);
    for (const guide of Object.values(itineraries)) {
      expect(guide.alternatives.length).toBeGreaterThanOrEqual(3);
      expect(guide.logistics.length).toBeGreaterThanOrEqual(3);
      for (const day of guide.daysPlan) {
        for (const item of ["morning", "afternoon", "practical"] as const)
          expect(day[item].length).toBeGreaterThanOrEqual(40);
        expect(day.evening.length).toBeGreaterThanOrEqual(20);
        expect(day.overnight.length).toBeGreaterThanOrEqual(15);
        expect(day.links.length).toBeGreaterThanOrEqual(2);
        for (const link of day.links) expect(link.to).toMatch(/^\//);
      }
    }
  });

  it("does not misrepresent numbered map pins as a driving route", () => {
    const mapViewer = file("public/maps/area.html");
    expect(mapViewer).toContain('params.get("waypoints")');
    expect(mapViewer).toContain("el.textContent");
    for (const guide of Object.values(itineraries)) {
      expect(guide.map.points.length).toBeGreaterThanOrEqual(3);
      expect(guide.map.points.length).toBeLessThanOrEqual(12);
      const [west, south, east, north] = guide.map.bounds;
      for (const point of guide.map.points) {
        expect(point.lon).toBeGreaterThanOrEqual(west);
        expect(point.lon).toBeLessThanOrEqual(east);
        expect(point.lat).toBeGreaterThanOrEqual(south);
        expect(point.lat).toBeLessThanOrEqual(north);
      }
    }
  });

  it("uses local hotel hub cards and the guide directory without links to the old website", () => {
    expect(itineraryCards).toHaveLength(4);
    for (const id of itineraryIds) {
      expect(itineraryCards.find(card => card.id === id)?.to).toBe(itineraries[id].path);
      expect(guideDirectory.find(item => item.id === `israel-itinerary-${id}`)?.to).toBe(itineraries[id].path);
    }
    expect(file("src/routes/accommodation.tsx")).not.toContain("trip.href");
    expect(file("src/data/hotelHub.ts")).not.toContain("LEGACY_ITINERARY_ORIGIN");
  });

  it("keeps day-by-day internal destination links resolvable", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const guide of Object.values(itineraries)) {
      for (const day of guide.daysPlan) for (const link of day.links) {
        const path = link.to as string;
        expect(router.matchRoutes(path).at(-1)?.routeId, `${guide.id}: ${path}`).not.toBe(rootRouteId);
      }
      for (const info of [...guide.alternatives, ...guide.logistics]) if (info.to) {
        expect(router.matchRoutes(info.to as string).at(-1)?.routeId, `${guide.id}: ${info.to}`).not.toBe(rootRouteId);
      }
    }
  });

  it("uses the approved Travelpayouts GetYourGuide widgets only on relevant city days", () => {
    expect(itineraries["3"].activityWidgets).toEqual([
      { day: 1, city: "jerusalem" },
      { day: 3, city: "telAviv" },
    ]);
    expect(getYourGuideWidgetCities.haifa.code).toBe("HFA");
    expect(getYourGuideCityWidgetSrc("telAviv", "3_day")).toBe(
      "https://tpwgt.com/content?trs=406243&shmarker=622032.3_day&iata=TLV&locale=en-US&powered_by=false&campaign_id=108&promo_id=4040"
    );
    expect(new URL(getYourGuideCityWidgetSrc("jerusalem", "3_day")).searchParams.get("iata")).toBe("JRS");
    expect(new URL(getYourGuideCityWidgetSrc("haifa", "5_day")).searchParams.get("iata")).toBe("HFA");
    expect(new URL(getYourGuideCityWidgetSrc("jerusalem", "3_day")).searchParams.get("shmarker")).toBe("622032.3_day");
    for (const guide of Object.values(itineraries)) {
      for (const widget of guide.activityWidgets ?? []) {
        expect(widget.day).toBeGreaterThanOrEqual(1);
        expect(widget.day).toBeLessThanOrEqual(guide.days);
      }
    }
    const widgetComponent = file("src/components/GetYourGuideCityWidget.tsx");
    expect(widgetComponent).toContain("onToggle");
    expect(widgetComponent).toContain("document.createElement(\"script\")");
    expect(widgetComponent).toContain("GetYourGuide (affiliate)");
    const guideComponent = file("src/components/IsraelItineraryPage.tsx");
    expect(guideComponent).toContain("<GetYourGuideCityWidget");
  });

  it("shows six approved Jerusalem day-trip alternatives under day two", () => {
    expect(itineraries["3"].jerusalemTourOptionsDay).toBe(2);
    for (const id of ["5", "7", "10"] as const) {
      expect(itineraries[id].jerusalemTourOptionsDay).toBeUndefined();
    }
    const ids = threeDayJerusalemTourSelections.map(item => item.id);
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    const allTours = new Map([...deadSeaTourCards, ...bethlehemTourCards].map(tour => [tour.id, tour] as const));
    for (const item of threeDayJerusalemTourSelections) {
      const tour = allTours.get(item.id);
      expect(tour, item.id).toBeDefined();
      expect(tour?.duration.length).toBeGreaterThan(0);
      expect(tour?.subtitle.length).toBeGreaterThan(0);
      expect(tour?.rating).toBeGreaterThan(0);
      expect(tour?.reviewCount).toBeGreaterThan(0);
      expect(tour?.fromUsd).toBeGreaterThan(0);
      expect(tour?.checkedAt).toBe("2026-11-13");
      const link = affiliateConfig[item.id]?.trackingUrl;
      expect(link, item.id).toMatch(/^https:\/\/[a-z0-9.-]+\.tpm\.li\//);
      expect(item.image).toBeTruthy();
    }
    const groups = threeDayJerusalemTourSelections.reduce<Record<string, number>>((counts, item) => {
      const key = item.area.includes("Jericho") ? "Jericho" : item.area.includes("Bethlehem") ? "Bethlehem" : "Dead Sea";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {});
    expect(groups).toEqual({ "Dead Sea": 2, Bethlehem: 2, Jericho: 2 });
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain("g.jerusalemTourOptionsDay === index + 1");
    expect(view).toContain("<JerusalemItineraryTourOptions />");
    const cards = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(cards).toContain("<details");
    expect(cards).toContain("More day trips from Jerusalem");
    expect(cards).toContain("rel={relFor(true)}");
    expect(cards).toContain("not live quotes");
    expect(cards).toContain('sub_id');
  });

  it("has a focused, bookable-through-guides three-day plan without intrusive affiliate links", () => {
    const three = itineraries["3"];
    expect(three.overviewRows).toHaveLength(3);
    expect(three.beforeYouGo?.length).toBeGreaterThanOrEqual(4);
    expect(three.relatedGuides).toHaveLength(6);
    expect(three.hero).not.toEqual(three.daysPlan[0]?.image);

    const related = three.relatedGuides ?? [];
    expect(new Set(related.map(item => item.to)).size).toBe(related.length);
    expect(new Set(related.map(item => item.image)).size).toBe(related.length);
    expect(three.daysPlan[1]?.links.some(link => link.to === "/tours/masada-dead-sea/")).toBe(true);
    expect(three.logistics.some(tip => tip.to === "/car-rental/")).toBe(true);
    expect(three.logistics.some(tip => tip.to === "/travel-blog/where-to-stay-in-jerusalem/")).toBe(true);

    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const link of [...related, ...(three.beforeYouGo ?? [])].filter(item => item.to)) {
      const path = link.to as string;
      expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
    expect(itinerarySourcesByGuide["3"].some(item => /Bahá/i.test(item.label))).toBe(false);
    expect(itinerarySourcesByGuide["3"].some(item => /Masada/i.test(item.label))).toBe(true);
    for (const id of itineraryIds) {
      expect(itinerarySourcesByGuide[id].length).toBeGreaterThanOrEqual(3);
    }

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain("Related practical guides");
    expect(view).toContain("Daily route and hotel bases");
    expect(view).toContain("<SourcesDisclosure>");
    expect(view.indexOf("<HomeContactForm")).toBeLessThan(view.indexOf("<SourcesDisclosure>"));
  });

  it("links natural phrases in the three-day text instead of showing a link tray after every day", () => {
    const guide = itineraries["3"];
    expect(guide.dayInlineLinks).toHaveLength(9);
    expect(guide.logisticsInlineLinks).toHaveLength(4);
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const item of guide.dayInlineLinks ?? []) {
      const text = guide.daysPlan[item.day - 1]?.[item.field] ?? "";
      expect(text, `Day ${item.day} ${item.field}: ${item.phrase}`).toContain(item.phrase);
      expect(text.indexOf(item.phrase)).toBeGreaterThanOrEqual(0);
      expect(router.matchRoutes(item.to as string).at(-1)?.routeId, item.to as string).not.toBe(rootRouteId);
    }
    for (const item of guide.logisticsInlineLinks ?? []) {
      expect(guide.logistics[item.index]?.text).toContain(item.phrase);
      expect(router.matchRoutes(item.to as string).at(-1)?.routeId, item.to as string).not.toBe(rootRouteId);
    }
  });

  it("places final planning checks after the itinerary and shows distinct Old City photos", () => {
    const guide = itineraries["3"];
    expect(guide.hero).toBe("itinerary-3day-jerusalem-cover");
    expect(guide.daysPlan[0]?.image).toBe("itinerary-3day-holy-sepulchre");
    expect(guide.relatedGuides?.find(item => item.to === "/travel-blog/old-city-jerusalem/")?.image)
      .toBe("itinerary-jerusalem-old-city");
    const cityImageKeys = [
      guide.hero,
      guide.daysPlan[0]!.image,
      guide.relatedGuides!.find(item => item.to === "/travel-blog/old-city-jerusalem/")!.image,
    ];
    expect(new Set(cityImageKeys).size).toBe(3);

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toContain('id="before-you-go"');
    expect(view).toContain('id="planning-checklist"');
    expect(view).toContain("My final planning checklist");
    expect(view).toContain("Have more than 3 days in Israel?");
    expect(view.indexOf('id="other-durations"')).toBeLessThan(view.indexOf('id="planning-checklist"'));
    expect(view.indexOf('id="planning-checklist"')).toBeLessThan(view.indexOf("<HomeContactForm"));
  });

  it("keeps map and photo-credit clutter out of the shared itinerary layout", () => {
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toContain("<RouteMap");
    expect(view).not.toContain("This sample route assumes");
    expect(view).not.toContain("Practical planning note");
    expect(view).not.toContain("Use these focused guides");
    expect(view).not.toContain("GuidePhotoCredit");
    expect(view).toContain("My practical planning tip");
    expect(view).toContain("Tips for transport and hotel planning");
    expect(view).toContain("Adjust this itinerary to your trip");
    expect(view).toContain("Photo credits &amp; licences");
    expect(view).toContain("hasPublicPhotoCredit");
    expect(view).toContain("list-disc space-y-4");
    expect(view.indexOf("<SourcesDisclosure>")).toBeLessThan(view.indexOf("Photo credits &amp; licences"));
  });

  it("has contextual navigation and a generated route-tree entry for every itinerary", () => {
    const sidebar = allNavGroups.find(g => g.title === "Travel guides");
    expect(sidebar?.items.some(item => item.label === "Israel itineraries")).toBe(true);
    const tree = file("src/routeTree.gen.ts");
    for (const id of itineraryIds) {
      expect(tree).toContain(`'/travel-blog/israel-itinerary-${id}-days'`);
    }
  });
});
