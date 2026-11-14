import { describe, expect, it } from "vitest";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "@/routeTree.gen";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { itineraryIds, itineraries, itinerarySourcesByGuide } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
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
      expect(guide.alternatives.length).toBe(guide.id === "3" || guide.id === "5" ? 0 : 3);
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
    expect(widgetComponent).not.toContain("GetYourGuide (affiliate)");
    expect(widgetComponent).not.toContain("I may earn a commission");
    const guideComponent = file("src/components/IsraelItineraryPage.tsx");
    expect(guideComponent).toContain("<GetYourGuideCityWidget");
  });

  it("gives curated three-column partner tour cards consistent breathing room", () => {
    for (const path of [
      "src/components/JerusalemItineraryTourOptions.tsx",
      "src/components/BethlehemTourOptions.tsx",
      "src/components/DeadSeaTourOptions.tsx",
    ]) {
      const cards = file(path);
      expect(cards, path).toContain("grid gap-5 sm:grid-cols-2 xl:grid-cols-3");
      expect(cards, path).not.toContain("grid gap-3 sm:grid-cols-2 xl:grid-cols-3");
    }
  });

  it("shows six approved Jerusalem day-trip alternatives under day two", () => {
    expect(itineraries["3"].jerusalemTourOptionsDay).toBe(2);
    expect(itineraries["5"].jerusalemTourOptionsDay).toBe(2);
    for (const id of ["7", "10"] as const) {
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
    expect(view).toContain('<JerusalemItineraryTourOptions days={id === "5" ? 5 : 3} />');
    const cards = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(cards).toContain("<details");
    expect(cards).toContain("More day trips from Jerusalem");
    expect(cards).toContain(">{tour.provider}</span>");
    expect(cards).not.toContain("{item.area} · {tour.provider}");
    expect(cards).toContain("rel={relFor(true)}");
    expect(cards).not.toContain("Affiliate links: I may earn a commission if you book.");
    expect(cards).not.toContain("indicative snapshots, not live quotes.");
    expect(cards).not.toContain("Check availability, current prices, inclusions, entry requirements");
    expect(cards).toContain('sub_id');
  });

  it("uses natural editorial copy, invites enquiries and leaves subjects blank", () => {
    const guide = itineraries["3"];
    const view = file("src/components/IsraelItineraryPage.tsx");
    const widget = file("src/components/GetYourGuideCityWidget.tsx");
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    const contact = file("src/components/HomeContactForm.tsx");
    const messageCopy = file("src/lib/guide-contact.ts");
    const footer = file("src/components/Layout.tsx");

    expect(view).toContain("Each day offers a different side of Israel");
    expect(view).not.toContain("Each day distinguishes a workable core");
    expect(view).toContain('{g.dayTipHeadings?.[index] ?? "Worth knowing"}');
    expect(itineraries["3"].dayTipHeadings).toEqual([
      "Old City access and walking",
      "Desert-day essentials",
      "A smoother airport connection",
    ]);
    expect(new Set(itineraries["3"].dayTipHeadings).size).toBe(3);
    for (const id of ["7", "10"] as const) expect(itineraries[id].dayTipHeadings).toBeUndefined();
    expect(view).toContain("My practical planning tips");
    expect(guide.noCarAdvice).toContain("different budgets, group sizes and travel styles");
    expect(guide.noCarAdvice).not.toContain("Choose an organized tour");

    expect(messageCopy).toContain("Have a question about your itinerary, or need to arrange an airport transfer or private journey in Israel?");
    expect(contact).toContain("useState(guide?.subject");
    expect(messageCopy).toContain('return { ...base, subject: "", heading: "Questions about planning your Israel itinerary?"');
    expect(contact).toContain('name="subject" required');
    expect(contact).toContain("update(setSubject, e.target.value)");

    expect(widget).not.toContain("Optional tours and activities from GetYourGuide (affiliate).");
    expect(widget).not.toContain("I may earn a commission if you book through this widget.");
    expect(widget).toContain("getYourGuideCityWidgetSrc(city, page)");
    expect(footer).toContain("Some links on this page are affiliate links");
    expect(tours).toContain("Explore optional day trips from Jerusalem");
    expect(tours).not.toContain("not additional stops to fit into it");
    expect(tours).toContain('rel={relFor(true)}');
    expect(tours).toContain("recordOutboundClick");
  });

  it("turns the five-day route into a detailed, coherent full-day itinerary", () => {
    const g = itineraries["5"];
    expect(g.title).toBe("Israel in 5 Days: Jerusalem, Dead Sea, Tel Aviv & Haifa");
    expect(g.description).toContain("day-by-day highlights");
    expect(g.reviewedAt).toBe("2026-11-14");
    expect(g.hotelBases).toContain("after Days 1–3");
    expect(g.hotelBases).toContain("after Day 4");
    expect(g.hotelBases).toContain("evening before Day 1 adds an arrival night");
    expect(g.hotelBases).toContain("flying the day after Day 5");
    expect(g.overviewRows?.[0]?.night).toContain("after Day 1");
    expect(g.overviewRows?.[3]?.night).toContain("after Day 4");
    expect(g.reality).toContain("five usable sightseeing days");
    expect(g.overviewRows).toHaveLength(5);
    expect(g.overviewRows?.every(row => Boolean(row.travel))).toBe(true);
    expect(g.overviewRows?.[4]?.night).toContain("Departure");
    expect(g.daysPlan).toHaveLength(5);
    expect(g.daysPlan[0]?.morning).toContain("Jaffa Gate");
    expect(g.daysPlan[1]?.morning).toContain("eastern Masada");
    expect(g.daysPlan[2]?.morning).toContain("Israel Museum");
    expect(g.daysPlan[3]?.morning).toContain("Old Jaffa");
    expect(g.daysPlan[4]?.morning).toContain("Caesarea National Park");
    expect(g.daysPlan[4]?.afternoon).toContain("German Colony");
    expect(g.daysPlan[4]?.evening).toContain("southbound journey");
    expect(g.daysPlan[4]?.afternoon).toContain("German Colony");
    expect(g.daysPlan[4]?.afternoon).toContain("Yefe Nof Street");
    expect(g.daysPlan[4]?.afternoon).toContain("upper viewing area");
    expect(g.daysPlan[4]?.afternoon).toContain("lower Bahá’í Gardens terraces");
    expect(g.daySequences?.[4]?.steps[2]?.optional).toBe(true);
    expect(g.daysPlan[2]?.afternoon).not.toContain("Bethlehem");
    expect(g.daysPlan[2]?.practical).toContain("Bethlehem visit");

    expect(g.daySequences?.map(item => item.day)).toEqual([1, 2, 3, 4, 5]);
    for (const item of g.daySequences ?? []) {
      expect(item.steps).toHaveLength(3);
      expect(item.steps.every(step => step.time.length > 8)).toBe(true);
      expect(item.steps.some(step => /Return to|Leave Jerusalem|Lunch/.test(step.stop))).toBe(false);
    }
    expect(g.dayTipHeadings).toHaveLength(5);
    expect(new Set(g.dayTipHeadings).size).toBe(5);
    expect(g.dayTipHeadings).not.toContain("Worth knowing");
    expect(g.dayChoices?.map(choice => choice.day)).toEqual([3, 5]);
    expect(g.dayChoices?.every(choice => choice.options.length === 2)).toBe(true);
    expect(g.dayChoices?.[0]?.options[1]?.text).toContain("Bethlehem");
    expect(g.dayChoices?.[1]?.options[1]?.text).toMatch(/airport/i);
    expect(g.dayChoices?.[0]?.options[0]?.text).not.toContain("Bethlehem");
    expect(g.beforeYouGo).toHaveLength(3);
    expect(g.logistics).toHaveLength(4);
    expect(g.alternatives).toEqual([]);
    expect(g.faqs).toHaveLength(8);
    expect(g.relatedGuides).toHaveLength(6);
    expect(g.activityWidgets).toEqual([{ day: 1, city: "jerusalem" }, { day: 4, city: "telAviv" }]);
    expect(g.jerusalemTourOptionsDay).toBe(2);
    expect(g.daysPlan[2]?.image).toBe("itinerary-5day-mount-of-olives");
    expect(migrationPhotos["itinerary-5day-mount-of-olives"].src).toBe("/images/jerusalem/church-of-all-nations.webp");
    expect(g.day3Options).toBeUndefined();
    expect(g.hero).not.toBe(g.daysPlan[3]!.image);
    expect(g.daysPlan[4]?.image).not.toBe(itineraries["10"].hero);
    const illustrated = [g.hero, ...g.daysPlan.map(day => day.image), ...(g.relatedGuides ?? []).map(item => item.image)];
    expect(new Set(illustrated.map(key => migrationPhotos[key].src)).size).toBe(illustrated.length);
    expect(g.daysPlan[4]!.image).toBe("itinerary-5day-caesarea");
    expect(migrationPhotos["itinerary-5day-caesarea"].sourceUrl).toContain("commons.wikimedia.org");
    expect(migrationPhotos["itinerary-5day-caesarea"].licenseUrl).toContain("creativecommons.org");
  });

  it("keeps five-day travel links contextual and the original other itineraries unchanged", () => {
    const g = itineraries["5"];
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    expect(g.dayInlineLinks?.length).toBeGreaterThanOrEqual(18);
    expect(g.dayOfficialLinks).toHaveLength(4);
    expect(g.dayOfficialLinks?.map(link => new URL(link.href).host)).toEqual([
      "en.parks.org.il", "www.rail.co.il", "en.parks.org.il", "ganbahai.org.il",
    ]);
    expect(g.beforeYouGoOfficialLinks?.[0]?.index).toBe(0);
    for (const link of g.dayInlineLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
      expect(router.matchRoutes(link.to as string).at(-1)?.routeId, link.to as string).not.toBe(rootRouteId);
    }
    for (const link of g.dayOfficialLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field]).toContain(link.phrase);
      expect(link.href).toMatch(/^https:\/\//);
    }
    for (const link of g.logisticsInlineLinks ?? []) {
      expect(g.logistics[link.index]?.text).toContain(link.phrase);
      expect(router.matchRoutes(link.to as string).at(-1)?.routeId).not.toBe(rootRouteId);
    }
    for (const link of g.beforeYouGoOfficialLinks ?? []) {
      expect(g.beforeYouGo?.[link.index]?.text).toContain(link.phrase);
    }
    expect(new Set(g.relatedGuides?.map(item => item.to)).size).toBe(6);
    for (const related of g.relatedGuides ?? []) {
      expect(router.matchRoutes(related.to as string).at(-1)?.routeId).not.toBe(rootRouteId);
    }
    expect(itinerarySourcesByGuide["5"].some(source => source.url.includes("caesarea-national-park"))).toBe(true);
    expect(itinerarySourcesByGuide["5"].some(source => source.url.includes("eta-il"))).toBe(true);
    for (const id of ["7", "10"] as const) {
      expect(itineraries[id].daySequences).toBeUndefined();
      expect(itineraries[id].dayChoices).toBeUndefined();
      expect(itineraries[id].dayTipHeadings).toBeUndefined();
    }
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain('const compactOverview = id === "3" || id === "5"');
    expect(view).toContain('data-testid={`day-${index + 1}-route-choices`}');
    expect(view.indexOf('data-testid={`day-${index + 1}-route-choices`}')).toBeLessThan(view.indexOf('<dl className="space-y-5">'));
    expect(view).toContain('id !== "5" ? <h3 className="mt-6 text-xl font-semibold">Transport and hotel planning</h3>');
    expect(view).toContain("Have more or fewer than 5 days in Israel?");
    expect(view).toContain("My practical planning tips");
    expect(view).toContain("g.dayTipHeadings?.[index]");
    expect(view).toContain("<GetYourGuideCityWidget");
    expect(view).toContain('days={id === "5" ? 5 : 3}');
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(tours).toContain('export function JerusalemItineraryTourOptions({ days = 3 }');
    expect(tours).toContain('itt_${days}day_');
    expect(tours).toContain('pageId: `israel-itinerary-${days}-days`');
    expect(tours).toContain("grid gap-5 sm:grid-cols-2 xl:grid-cols-3");
  });

  it("has a focused, bookable-through-guides three-day plan without intrusive affiliate links", () => {
    const three = itineraries["3"];
    expect(three.overviewRows).toHaveLength(3);
    expect(three.beforeYouGo).toHaveLength(3);
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
    expect(guide.dayInlineLinks).toHaveLength(15);
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

  it("removes redundant adjustment cards from the three- and five-day guides", () => {
    expect(itineraries["3"].alternatives).toEqual([]);
    expect(itineraries["5"].alternatives).toEqual([]);
    for (const id of ["7", "10"] as const) {
      expect(itineraries[id].alternatives.length).toBeGreaterThanOrEqual(3);
    }
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain('g.alternatives.length > 0 && (');
    expect(view).toContain('...(g.alternatives.length ? [["alternatives", "Adjust the route"]');
    expect(view).toContain('id="alternatives"');
    expect(view).toContain("Adjust this itinerary to your trip");
    expect(view).toContain('id="transport"');
    expect(view).toContain("<FaqList faqs={g.faqs} />");
  });

  it("turns the three-day guide into a travel-ready plan without changing longer itineraries", () => {
    const guide = itineraries["3"];
    expect(guide.hotelBases).toContain("nights 1 and 2");
    expect(guide.hotelBases).toContain("A Tel Aviv night after Day 3");
    expect(guide.daySequences?.map(day => day.day)).toEqual([1, 2, 3]);
    for (const day of guide.daySequences ?? []) {
      expect(day.steps).toHaveLength(3);
      expect(day.steps.some(step => /return to jerusalem|leave jerusalem|lunch and|jerusalem → tel aviv/i.test(step.stop))).toBe(false);
      for (const step of day.steps) {
        expect(step.stop.length).toBeGreaterThan(12);
        expect(step.time.length).toBeGreaterThan(5);
      }
    }
    expect(guide.daySequences?.[0]?.steps.some(step => /Israel Museum/.test(step.stop) && step.optional)).toBe(true);
    expect(guide.daySequences?.[1]?.steps.some(step => /Ein Bokek/.test(step.stop))).toBe(true);
    expect(guide.daySequences?.[1]?.steps.some(step => /Ein Gedi/.test(step.stop) && step.optional)).toBe(true);
    expect(guide.dayInlineLinks?.find(link => link.phrase === "Ben Gurion Airport connections")?.to).toBe("/airport-transfers/");
    expect(guide.dayInlineLinks?.some(link => link.to === "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/")).toBe(false);
    expect(guide.description).toContain("day-by-day highlights");
    expect(guide.beforeYouGo?.some(tip => tip.heading === "Count your usable days")).toBe(false);
    expect(guide.beforeYouGoOfficialLinks?.[0]?.index).toBe(0);
    expect(guide.daySequences?.[2]?.steps.some(step => /Old Jaffa/.test(step.stop))).toBe(true);
    expect(guide.overviewRows?.every(row => row.travel)).toBe(true);
    expect(guide.day3Options?.map(option => option.heading)).toEqual([
      "Flying home on Day 3?", "Staying another night?",
    ]);
    expect(guide.daysPlan[2]?.practical).toBe("Before leaving Jerusalem, confirm where you can store and collect your luggage in Tel Aviv, including opening hours and transport from the storage location to the airport. Do not assume every rail station has lockers. Consult Ben Gurion Airport connections before deciding how late to sightsee.");
    expect(guide.day3Options?.[0]?.text).toContain("confirm a luggage-storage solution");
    expect(guide.daysPlan[2]?.morning).toMatch(/no trains run/i);
    for (const id of ["7", "10"] as const) {
      expect(itineraries[id].daySequences).toBeUndefined();
      expect(itineraries[id].day3Options).toBeUndefined();
      expect(itineraries[id].dayOfficialLinks).toBeUndefined();
      expect(itineraries[id].beforeYouGoOfficialLinks).toBeUndefined();
    }
    const expectedLinks = [
      "/travel-blog/old-city-jerusalem/",
      "/travel-blog/shopping-in-jerusalem/",
      "/travel-blog/masada/",
      "/travel-blog/jerusalem-to-the-dead-sea/",
      "/airport-transfers/",
      "/travel-blog/the-dead-sea/",
      "/travel-blog/dead-sea-attractions/",
      "/travel-blog/ein-gedi/",
      "/travel-blog/jaffa/",
      "/travel-blog/beaches-in-tel-aviv/",
      "/travel-blog/museums-in-tel-aviv/",
    ];
    const internalLinks = new Set<string>(guide.dayInlineLinks?.map(link => link.to as string) ?? []);
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const link of expectedLinks) {
      expect(internalLinks.has(link), link).toBe(true);
      expect(router.matchRoutes(link).at(-1)?.routeId, link).not.toBe(rootRouteId);
    }
    const seenLinkTargets = new Set<string>();
    for (const link of guide.dayInlineLinks ?? []) {
      const key = `${link.day}|${link.field}|${link.phrase}`;
      expect(seenLinkTargets.has(key), key).toBe(false);
      seenLinkTargets.add(key);
    }
    expect(guide.dayOfficialLinks?.map(link => new URL(link.href).host)).toEqual([
      "en.parks.org.il", "www.rail.co.il",
    ]);
    for (const link of guide.dayOfficialLinks ?? []) {
      expect(guide.daysPlan[link.day - 1]?.[link.field]).toContain(link.phrase);
    }
    for (const link of guide.beforeYouGoOfficialLinks ?? []) {
      expect(guide.beforeYouGo?.[link.index]?.text).toContain(link.phrase);
      expect(link.href).toMatch(/^https:\/\//);
    }

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toContain("day-${index + 1}-highlights");
    expect(view).toContain("Suggested highlights");
    expect(view).toContain('<ul className="mt-3 space-y-2">');
    expect(view).not.toContain("approximate times</span>");
    expect(view).toContain('data-testid="departure-scenarios"');
    expect(view).toContain("Getting around");
    expect(view).toContain("dayTextLinks(g, index + 1");
    expect(view).toContain("beforeBookingLinks(g, index)");
    expect(view).toContain('rel="noopener noreferrer"');
    expect(view).toContain("g.daySequences?.find");
    expect(view).not.toContain("<RouteMap");
  });

  it("integrates pre-booking checks with transport tips after the itinerary and keeps distinct Old City photos", () => {
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
    expect(file("src/data/guideMigrationPhotos.ts")).toContain("Church_of_the_Holy_Sepulchre_Jerusalem_israel.jpg");

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toContain('id="before-you-go"');
    expect(view).not.toContain('id="planning-checklist"');
    expect(view).toContain("My practical planning tips");
    expect(view).toContain("Transport and hotel planning");
    expect(view).toContain("Before you book");
    expect(view).toContain("Have more than 3 days in Israel?");
    expect(view.indexOf('id="days"')).toBeLessThan(view.indexOf('id="transport"'));
    expect(view.indexOf('id="transport"')).toBeLessThan(view.indexOf('id="alternatives"'));
    expect(view.indexOf("Transport and hotel planning")).toBeLessThan(view.indexOf("Before you book"));
    expect(view.indexOf("Before you book")).toBeLessThan(view.indexOf('id="alternatives"'));
    expect(view.indexOf('id="alternatives"')).toBeLessThan(view.indexOf('id="other-durations"'));
    expect(view.indexOf("Before you book")).toBeLessThan(view.indexOf("<HomeContactForm"));
    expect(view).toContain("g.beforeYouGo.map((tip, index) =>");
    expect(view).toContain("g.logistics.map((tip, index) =>");
  });

  it("keeps map and photo-credit clutter out of the shared itinerary layout", () => {
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toContain("<RouteMap");
    expect(view).not.toContain("This sample route assumes");
    expect(view).not.toContain("Practical planning note");
    expect(view).not.toContain("Use these focused guides");
    expect(view).not.toContain("GuidePhotoCredit");
    expect(view).toContain('g.dayTipHeadings?.[index] ?? "Worth knowing"');
    expect(view).not.toContain('>Worth knowing</h4>');
    expect(view).not.toContain('<h4 className="font-semibold">My practical planning tip</h4>');
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
