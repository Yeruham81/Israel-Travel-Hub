import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { readRouteSource } from "@/test-utils/read-route-source";
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
import {
  getYourGuideCityWidgetSrc,
  getYourGuideWidgetCities,
} from "@/lib/getyourguide-city-widget";
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
      expect(readRouteSource(`src/routes/travel-blog.israel-itinerary-${id}-days.tsx`)).toMatch(
        sourceFragment(`itineraryMeta("${id}")`),
      );
      expect(guide.daysPlan).toHaveLength(guide.days);
      expect(new Set(guide.daysPlan.map((d) => d.name)).size).toBe(guide.days);
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
      expect(guide.alternatives.length).toBe(guide.id === "10" ? 2 : 0);
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
      expect(itineraryCards.find((card) => card.id === id)?.to).toBe(itineraries[id].path);
      expect(guideDirectory.find((item) => item.id === `israel-itinerary-${id}`)?.to).toBe(
        itineraries[id].path,
      );
    }
    expect(file("src/routes/accommodation.index.tsx")).not.toContain("trip.href");
    expect(file("src/data/hotelHub.ts")).not.toContain("LEGACY_ITINERARY_ORIGIN");
  });

  it("keeps day-by-day internal destination links resolvable", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
    for (const guide of Object.values(itineraries)) {
      for (const day of guide.daysPlan)
        for (const link of day.links) {
          const path = link.to as string;
          expect(router.matchRoutes(path).at(-1)?.routeId, `${guide.id}: ${path}`).not.toBe(
            rootRouteId,
          );
        }
      for (const info of [...guide.alternatives, ...guide.logistics])
        if (info.to) {
          expect(
            router.matchRoutes(info.to as string).at(-1)?.routeId,
            `${guide.id}: ${info.to}`,
          ).not.toBe(rootRouteId);
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
      "https://tpwgt.com/content?trs=406243&shmarker=622032.3_day&iata=TLV&locale=en-US&powered_by=false&campaign_id=108&promo_id=4040",
    );
    expect(new URL(getYourGuideCityWidgetSrc("jerusalem", "3_day")).searchParams.get("iata")).toBe(
      "JRS",
    );
    expect(new URL(getYourGuideCityWidgetSrc("haifa", "5_day")).searchParams.get("iata")).toBe(
      "HFA",
    );
    expect(
      new URL(getYourGuideCityWidgetSrc("jerusalem", "3_day")).searchParams.get("shmarker"),
    ).toBe("622032.3_day");
    for (const guide of Object.values(itineraries)) {
      for (const widget of guide.activityWidgets ?? []) {
        expect(widget.day).toBeGreaterThanOrEqual(1);
        expect(widget.day).toBeLessThanOrEqual(guide.days);
      }
    }
    const widgetComponent = file("src/components/GetYourGuideCityWidget.tsx");
    expect(widgetComponent).not.toMatch(sourceFragment("<details"));
    expect(widgetComponent).not.toMatch(sourceFragment("<summary"));
    expect(widgetComponent).not.toContain("onToggle");
    expect(widgetComponent).not.toContain("useState");
    expect(widgetComponent).toMatch(sourceFragment("<h4"));
    expect(widgetComponent).toMatch(sourceFragment("More things to do in {config.name}"));
    expect(widgetComponent).toMatch(
      sourceFragment("><BookingWidgetFrame scriptUrl={getYourGuideCityWidgetSrc(city, page)}"),
    );
    expect(file("src/components/BookingWidgetFrame.tsx")).toMatch(sourceFragment('loading="lazy"'));
    expect(widgetComponent).toMatch(sourceFragment("<BookingWidgetFrame"));
    expect(file("src/components/BookingWidgetFrame.tsx")).toMatch(
      sourceFragment('category="marketing"'),
    );
    expect(widgetComponent).not.toMatch(sourceFragment("GetYourGuide (affiliate)"));
    expect(widgetComponent).not.toMatch(sourceFragment("I may earn a commission"));
    const guideComponent = file("src/components/IsraelItineraryPage.tsx");
    expect(guideComponent).toMatch(sourceFragment("<GetYourGuideCityWidget"));
  });

  it("gives curated three-column partner tour cards consistent breathing room", () => {
    for (const path of [
      "src/components/JerusalemItineraryTourOptions.tsx",
      "src/components/BethlehemTourOptions.tsx",
      "src/components/DeadSeaTourOptions.tsx",
    ]) {
      const cards = file(path);
      expect(cards, path).toMatch(/grid gap-5 sm:grid-cols-2 (?:lg|xl):grid-cols-3/);
      expect(cards, path).not.toMatch(sourceFragment("grid gap-3 sm:grid-cols-2 xl:grid-cols-3"));
    }
  });

  it("shows six approved optional Jerusalem day trips in the three-, five- and seven-day itineraries", () => {
    expect(itineraries["3"].jerusalemTourOptionsDay).toBe(2);
    expect(itineraries["5"].jerusalemTourOptionsDay).toBe(2);
    expect(itineraries["7"].jerusalemTourOptionsDay).toBe(3);
    expect(itineraries["10"].jerusalemTourOptionsDay).toBe(3);
    const ids = threeDayJerusalemTourSelections.map((item) => item.id);
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    const allTours = new Map(
      [...deadSeaTourCards, ...bethlehemTourCards].map((tour) => [tour.id, tour] as const),
    );
    for (const item of threeDayJerusalemTourSelections) {
      const tour = allTours.get(item.id);
      expect(tour, item.id).toBeDefined();
      expect(tour?.duration.length).toBeGreaterThan(0);
      expect(tour?.subtitle.length).toBeGreaterThan(0);
      expect(tour?.rating).toBeGreaterThan(0);
      expect(tour?.reviewCount).toBeGreaterThan(0);
      expect(tour?.fromUsd).toBeGreaterThan(0);
      expect(tour?.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(tour!.checkedAt >= "2026-11-13").toBe(true);
      const link = affiliateConfig[item.id]?.trackingUrl;
      expect(link, item.id).toMatch(/^https:\/\/[a-z0-9.-]+\.tpm\.li\//);
      expect(item.image).toBeTruthy();
    }
    const groups = threeDayJerusalemTourSelections.reduce<Record<string, number>>(
      (counts, item) => {
        const key = item.area.includes("Jericho")
          ? "Jericho"
          : item.area.includes("Bethlehem")
            ? "Bethlehem"
            : "Dead Sea";
        counts[key] = (counts[key] ?? 0) + 1;
        return counts;
      },
      {},
    );
    expect(groups).toEqual({ "Dead Sea": 2, Bethlehem: 2, Jericho: 2 });
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toMatch(sourceFragment("g.jerusalemTourOptionsDay === index + 1"));
    expect(view).toMatch(
      sourceFragment(
        '<JerusalemItineraryTourOptions days={id === "10" ? 10 : id === "7" ? 7 : id === "5" ? 5 : 3} />',
      ),
    );
    const cards = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(cards).not.toMatch(sourceFragment("<details"));
    expect(cards).not.toMatch(sourceFragment("<summary"));
    expect(cards).toMatch(
      sourceFragment(
        '<h4 className="font-semibold text-primary">Alternative day tours from Jerusalem</h4>',
      ),
    );
    expect(cards).toMatch(sourceFragment('data-testid="itinerary-jerusalem-tours"'));
    expect(cards).toMatch(sourceFragment("Alternative day tours from Jerusalem"));
    expect(cards).toMatch(sourceFragment("Book these tours with the individual providers."));
    expect(cards).toMatch(sourceFragment("platform={tour.provider}"));
    expect(cards).not.toMatch(sourceFragment("{item.area} · {tour.provider}"));
    expect(cards).toMatch(sourceFragment("<ExternalProviderTourCard"));
    expect(cards).not.toMatch(
      sourceFragment("Affiliate links: I may earn a commission if you book."),
    );
    expect(cards).not.toMatch(sourceFragment("indicative snapshots, not live quotes."));
    expect(cards).not.toMatch(
      sourceFragment("Check availability, current prices, inclusions, entry requirements"),
    );
    expect(cards).toContain("sub_id");
  });

  it("uses natural editorial copy, invites enquiries and leaves subjects blank", () => {
    const guide = itineraries["3"];
    const view = file("src/components/IsraelItineraryPage.tsx");
    const widget = file("src/components/GetYourGuideCityWidget.tsx");
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    const contact = file("src/components/HomeContactForm.tsx");
    const messageCopy = file("src/lib/guide-contact.ts");
    const footer = file("src/components/Layout.tsx");

    expect(view).not.toMatch(sourceFragment("Each day offers a different side of Israel"));
    expect(view).not.toMatch(sourceFragment("Each day distinguishes a workable core"));
    expect(view).toMatch(sourceFragment('{g.dayTipHeadings?.[index] ?? "Worth knowing"}'));
    expect(itineraries["3"].dayTipHeadings).toEqual([
      "Old City access and walking",
      "Desert-day essentials",
      "A smoother airport connection",
    ]);
    expect(new Set(itineraries["3"].dayTipHeadings).size).toBe(3);
    expect(itineraries["10"].dayTipHeadings).toHaveLength(10);
    expect(view).toMatch(sourceFragment("My practical planning tips"));
    expect(guide.noCarAdvice).toMatch(/^Jerusalem and Tel Aviv are easy to explore/);
    expect(guide.noCarAdvice).not.toContain("Choose an organized tour");

    expect(messageCopy).toMatch(
      sourceFragment(
        "I'm Moshe Barak. I arrange airport transfers, private journeys between cities and sightseeing days with a driver.",
      ),
    );
    expect(contact).toMatch(sourceFragment('const [subject, setSubject] = useState("");'));
    expect(messageCopy).toMatch(
      sourceFragment(
        'return { ...base, subject: "", heading: "Need private transport for your Israel itinerary?"',
      ),
    );
    expect(contact).toMatch(sourceFragment('name="subject" required'));
    expect(contact).toMatch(sourceFragment("update(setSubject, e.target.value)"));

    expect(widget).not.toMatch(
      sourceFragment("Optional tours and activities from GetYourGuide (affiliate)."),
    );
    expect(widget).not.toMatch(
      sourceFragment("I may earn a commission if you book through this widget."),
    );
    expect(widget).toMatch(sourceFragment("getYourGuideCityWidgetSrc(city, page)"));
    expect(footer).toMatch(sourceFragment("This website contains affiliate links"));
    expect(tours).toMatch(
      sourceFragment("Use a guided Masada and Dead Sea tour for your desert day"),
    );
    expect(tours).not.toMatch(sourceFragment("not additional stops to fit into it"));
    expect(tours).toMatch(sourceFragment("<ExternalProviderTourCard"));
    expect(tours).toContain("recordOutboundClick");
  });

  it("keeps 3- and 5-day copy concise and flight-day advice realistic", () => {
    const three = itineraries["3"];
    const five = itineraries["5"];
    expect(three.daysPlan[0]?.afternoon).toContain("see Jerusalem museums for other options");
    expect(three.daysPlan[2]?.morning).toContain("then continue to Old Jaffa by bus or taxi");
    expect(three.hotelBases).toContain("your flight is on Day 4 or later");
    expect(three.day3Options?.[0]?.text).toContain("skip Tel Aviv sightseeing entirely");
    expect(three.noCarAdvice).not.toContain("different budgets");

    expect(five.noCarAdvice).toMatch(/^Jerusalem and Tel Aviv are comfortable to explore/);
    expect(five.daysPlan[1]?.evening).toContain(
      "enjoy a relaxed evening after the desert excursion",
    );
    expect(five.daysPlan[3]?.morning).toContain(
      "Check the Israel Railways journey planner for your travel date",
    );
    expect(five.dayChoices?.find((choice) => choice.day === 5)?.options[1]?.text).toContain(
      "For a morning or midday flight, go straight to Ben Gurion Airport",
    );
    expect(five.logistics[0]?.text).toContain(
      "Use Jerusalem accommodation as your base for Days 1–3",
    );
    expect(
      five.faqs.some(
        (faq) => faq.q === "What if I fly home on Day 5?" && faq.a.includes("An early flight"),
      ),
    ).toBe(true);

    expect(three.dayInlineLinks?.find((link) => link.phrase === "Jerusalem museums")).toBeDefined();
    expect(
      five.dayOfficialLinks?.find((link) => link.phrase === "Israel Railways journey planner"),
    ).toBeDefined();
  });

  it("turns the five-day route into a detailed, coherent full-day itinerary", () => {
    const g = itineraries["5"];
    expect(g.title).toBe("Israel in 5 Days: Jerusalem, Dead Sea, Tel Aviv & Haifa");
    expect(g.description).toContain("day-by-day highlights");
    expect(g.reviewedAt).toBe("2026-11-24");
    expect(g.hotelBases).toContain("after Days 1–3");
    expect(g.hotelBases).toContain("after Day 4");
    expect(g.hotelBases).toContain("evening before Day 1 adds an arrival night");
    expect(g.hotelBases).toContain("flying the day after Day 5");
    expect(g.overviewRows?.[0]?.night).toContain("after Day 1");
    expect(g.overviewRows?.[3]?.night).toContain("after Day 4");
    expect(g.reality).toContain("the day before your five-day itinerary begins");
    expect(g.overviewRows).toHaveLength(5);
    expect(g.overviewRows?.every((row) => Boolean(row.travel))).toBe(true);
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

    expect(g.daySequences?.map((item) => item.day)).toEqual([1, 2, 3, 4, 5]);
    for (const item of g.daySequences ?? []) {
      expect(item.steps).toHaveLength(3);
      expect(item.steps.every((step) => step.time.length > 8)).toBe(true);
      expect(item.steps.some((step) => /Return to|Leave Jerusalem|Lunch/.test(step.stop))).toBe(
        false,
      );
    }
    expect(g.dayTipHeadings).toHaveLength(5);
    expect(new Set(g.dayTipHeadings).size).toBe(5);
    expect(g.dayTipHeadings).not.toContain("Worth knowing");
    expect(g.dayChoices?.map((choice) => choice.day)).toEqual([3, 5]);
    expect(g.dayChoices?.every((choice) => choice.options.length === 2)).toBe(true);
    expect(g.dayChoices?.[0]?.options[1]?.text).toContain("Bethlehem");
    expect(g.dayChoices?.[1]?.options[1]?.text).toMatch(/airport/i);
    expect(g.dayChoices?.[0]?.options[0]?.text).not.toContain("Bethlehem");
    expect(g.beforeYouGo).toHaveLength(3);
    expect(g.logistics).toHaveLength(4);
    expect(g.alternatives).toEqual([]);
    expect(g.faqs).toHaveLength(8);
    expect(g.relatedGuides).toHaveLength(6);
    expect(g.activityWidgets).toEqual([
      { day: 1, city: "jerusalem" },
      { day: 4, city: "telAviv" },
    ]);
    expect(g.jerusalemTourOptionsDay).toBe(2);
    expect(g.daysPlan[2]?.image).toBe("itinerary-5day-mount-of-olives");
    expect(migrationPhotos["itinerary-5day-mount-of-olives"].src).toBe(
      "/images/jerusalem/church-of-all-nations.webp",
    );
    expect(g.day3Options).toBeUndefined();
    expect(g.hero).not.toBe(g.daysPlan[3]!.image);
    expect(g.daysPlan[4]?.image).not.toBe(itineraries["10"].hero);
    const illustrated = [
      g.hero,
      ...g.daysPlan.map((day) => day.image),
      ...(g.relatedGuides ?? []).map((item) => item.image),
    ];
    expect(new Set(illustrated.map((key) => migrationPhotos[key].src)).size).toBe(
      illustrated.length,
    );
    expect(g.daysPlan[4]!.image).toBe("itinerary-5day-caesarea");
    expect(migrationPhotos["itinerary-5day-caesarea"].sourceUrl).toContain("commons.wikimedia.org");
    expect(migrationPhotos["itinerary-5day-caesarea"].licenseUrl).toContain("creativecommons.org");
  });

  it("keeps five-day travel links contextual and the original other itineraries unchanged", () => {
    const g = itineraries["5"];
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
    expect(g.dayInlineLinks?.length).toBeGreaterThanOrEqual(18);
    expect(g.dayOfficialLinks).toHaveLength(4);
    expect(g.dayOfficialLinks?.map((link) => new URL(link.href).host)).toEqual([
      "en.parks.org.il",
      "www.rail.co.il",
      "en.parks.org.il",
      "ganbahai.org.il",
    ]);
    expect(g.beforeYouGoOfficialLinks?.[0]?.index).toBe(0);
    for (const link of g.dayInlineLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
      expect(router.matchRoutes(link.to as string).at(-1)?.routeId, link.to as string).not.toBe(
        rootRouteId,
      );
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
    expect(new Set(g.relatedGuides?.map((item) => item.to)).size).toBe(6);
    for (const related of g.relatedGuides ?? []) {
      expect(router.matchRoutes(related.to as string).at(-1)?.routeId).not.toBe(rootRouteId);
    }
    expect(
      itinerarySourcesByGuide["5"].some((source) => source.url.includes("caesarea-national-park")),
    ).toBe(true);
    expect(itinerarySourcesByGuide["5"].some((source) => source.url.includes("eta-il"))).toBe(true);
    expect(itineraries["10"].daySequences?.map((item) => item.day)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(itineraries["10"].dayChoices?.map((item) => item.day)).toEqual([2, 6, 7, 8, 10]);
    expect(itineraries["10"].dayTipHeadings).toHaveLength(10);
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toMatch(sourceFragment("const compactOverview = true"));
    expect(view).toMatch(sourceFragment("data-testid={`day-${index + 1}-route-choices`}"));
    expect(sourceIndex(view, "data-testid={`day-${index + 1}-route-choices`}")).toBeGreaterThan(
      sourceIndex(view, '<dl className="space-y-5">'),
    );
    expect(view).toMatch(
      sourceFragment(
        'id !== "5" && id !== "7" && id !== "10" ? <h3 className="mt-6 text-xl font-semibold">Transport and hotel planning</h3>',
      ),
    );
    expect(view).toMatch(sourceFragment("Have more or fewer than 5 days in Israel?"));
    expect(view).toMatch(sourceFragment("My practical planning tips"));
    expect(view).toContain("g.dayTipHeadings?.[index]");
    expect(view).toMatch(sourceFragment("<GetYourGuideCityWidget"));
    expect(view).toMatch(
      sourceFragment('days={id === "10" ? 10 : id === "7" ? 7 : id === "5" ? 5 : 3}'),
    );
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(tours).toMatch(
      sourceFragment("export function JerusalemItineraryTourOptions({ days = 3 }"),
    );
    expect(tours).toMatch(sourceFragment("itt_${days}day_"));
    expect(tours).toMatch(sourceFragment("pageId: `israel-itinerary-${days}-days`"));
    expect(tours).toMatch(sourceFragment("grid gap-5 sm:grid-cols-2 lg:grid-cols-3"));
  });

  it("provides a coherent seven-day route across three hotel bases with realistic transfer days", () => {
    const g = itineraries["7"];
    expect(g.title).toBe("Israel in 7 Days: Jerusalem, Dead Sea, Galilee & Tel Aviv");
    expect(g.description).toContain("Nazareth");
    expect(g.intro).toMatch(/a week in Israel/i);
    expect(g.reviewedAt).toBe("2026-11-24");
    expect(g.reality).toContain("Allow extra travel time on Days 4 and 6");
    expect(g.reality).toContain("changing hotels");
    expect(g.hotelBases).toContain("after Days 1–3");
    expect(g.hotelBases).toContain("after Days 4–5");
    expect(g.hotelBases).toContain("after Day 6");
    expect(g.hotelBases).toContain("evening before Day 1");
    expect(g.hotelBases).toContain("flying on Day 8");
    expect(g.overviewRows).toHaveLength(7);
    expect(g.overviewRows?.every((row) => Boolean(row.travel))).toBe(true);
    expect(g.overviewRows?.[3]?.night).toContain("Galilee");
    expect(g.overviewRows?.[5]?.night).toContain("Tel Aviv");
    expect(g.overviewRows?.[6]?.night).toContain("Departure");
    expect(g.daysPlan).toHaveLength(7);
    expect(g.daysPlan[0]?.morning).toContain("Jaffa Gate");
    expect(g.daysPlan[1]?.morning).toContain("Israel Museum");
    expect(g.daysPlan[2]?.morning).toContain("eastern entrance");
    expect(g.daysPlan[3]?.morning).toContain("Nazareth");
    expect(g.daysPlan[4]?.morning).toContain("Capernaum");
    expect(g.daysPlan[5]?.afternoon).toContain("Caesarea National Park");
    expect(g.daysPlan[6]?.morning).toContain("Old Jaffa");
    expect(g.daysPlan[5]?.practical).toContain("transfer day with luggage");

    expect(g.daySequences?.map((day) => day.day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    for (const sequence of g.daySequences ?? []) {
      expect(sequence.steps).toHaveLength(3);
      expect(sequence.steps.every((step) => step.stop.length > 10 && step.time.length > 10)).toBe(
        true,
      );
      expect(
        sequence.steps.every(
          (step) => !/hotel transfer|return to|departure|settl(e|ing) in/i.test(step.stop),
        ),
      ).toBe(true);
    }
    expect(g.dayTipHeadings).toHaveLength(7);
    expect(new Set(g.dayTipHeadings).size).toBe(7);
    expect(g.dayTipHeadings).not.toContain("Worth knowing");
    expect(g.dayChoices?.map((choice) => choice.day)).toEqual([2, 5, 6, 7]);
    expect(g.dayChoices?.every((choice) => choice.options.length === 2)).toBe(true);
    expect(g.dayChoices?.[2]?.options[1]?.text).toContain("Haifa or Caesarea");
    expect(g.dayChoices?.[3]?.options[1]?.text).toContain("Ben Gurion Airport");
    expect(g.alternatives).toEqual([]);
    expect(g.logistics).toHaveLength(5);
    expect(g.beforeYouGo).toHaveLength(3);
    expect(g.faqs).toHaveLength(8);
    expect(g.relatedGuides).toHaveLength(6);
    expect(g.activityWidgets).toEqual([
      { day: 1, city: "jerusalem" },
      { day: 7, city: "telAviv" },
    ]);
    expect(g.jerusalemTourOptionsDay).toBe(3);
    expect(g.hero).toBe("featured-original-7day");
    expect(g.daysPlan[4]?.image).toBe("itinerary-7day-capernaum");
    expect(g.hero).not.toBe(g.daysPlan[4]!.image);
    const photoKeys = [
      g.hero,
      ...g.daysPlan.map((day) => day.image),
      ...(g.relatedGuides ?? []).map((item) => item.image),
    ];
    expect(new Set(photoKeys.map((key) => migrationPhotos[key].src)).size).toBe(photoKeys.length);
  });

  it("keeps optional tours, transfer timings and departure decisions clear for the seven-day guide", () => {
    const g = itineraries["7"];
    const tourComponent = file("src/components/JerusalemItineraryTourOptions.tsx");
    const itineraryComponent = file("src/components/IsraelItineraryPage.tsx");

    expect(tourComponent).toMatch(
      sourceFragment(
        '<h4 className="font-semibold text-primary">Alternative day tours from Jerusalem</h4>',
      ),
    );
    expect(tourComponent).toMatch(sourceFragment("Each replaces that day's planned sightseeing."));
    expect(tourComponent).toMatch(sourceFragment("a guided Masada and Dead Sea trip for Day 3"));
    expect(itineraryComponent).toMatch(
      sourceFragment("presentation.transferDays.includes(index + 1)"),
    );
    expect(itineraryComponent).toMatch(sourceFragment("The times shown are for sightseeing only."));
    expect(g.daySequences?.[2]?.steps[0]?.stop).toBe("Masada plateau");
    expect(g.daySequences?.[5]?.steps[0]?.stop).toBe("Haifa's German Colony viewpoint");
    expect(g.daysPlan[2]?.morning).not.toContain("Allow about two to three hours at the fortress");
    expect(g.daysPlan[3]?.morning).not.toContain("Allow roughly one to two hours for the basilica");
    expect(g.daysPlan[5]?.afternoon).not.toContain("Allow roughly two to three hours on site");
    expect(g.noCarAdvice).toMatch(/^Jerusalem and Tel Aviv are easy to explore/);
    expect(g.daysPlan[3]?.afternoon).toContain(
      "Check the official Magdala visitor information for opening hours",
    );
    expect(g.daysPlan[3]?.evening).toContain("enjoy a relaxed evening after the journey north");
    expect(g.daysPlan[4]?.afternoon).toContain("Visit the lakeside churches at Tabgha");
    expect(g.daysPlan[6]?.evening).toContain(
      "If flying on Day 8, enjoy a final dinner in Tel Aviv",
    );

    expect(g.reality).toContain("fly on Day 8");
    expect(g.daysPlan[6]?.morning).toContain("morning or midday flight");
    expect(g.daysPlan[6]?.practical).toContain("travel day");
    expect(g.dayChoices?.find((choice) => choice.day === 7)?.options[1]?.text).toContain(
      "little or no sightseeing time",
    );
    expect(
      g.faqs.some(
        (item) =>
          item.q.includes("flight leaves on Day 7") &&
          item.a.includes("no usable sightseeing time"),
      ),
    ).toBe(true);
  });

  it("links all seven days naturally, cites relevant official sites and preserves other guides", () => {
    const g = itineraries["7"];
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
    expect(g.dayInlineLinks?.length).toBeGreaterThanOrEqual(22);
    expect(g.dayOfficialLinks).toHaveLength(6);
    expect(g.beforeYouGoOfficialLinks).toHaveLength(2);
    expect(g.dayOfficialLinks?.map((link) => new URL(link.href).host)).toEqual([
      "en.parks.org.il",
      "www.custodia.org",
      "www.magdala.org",
      "en.parks.org.il",
      "ganbahai.org.il",
      "en.parks.org.il",
    ]);
    for (const link of g.dayInlineLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
      expect(router.matchRoutes(link.to as string).at(-1)?.routeId, link.to as string).not.toBe(
        rootRouteId,
      );
    }
    for (const link of g.dayOfficialLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
      expect(link.href).toMatch(/^https:\/\//);
    }
    for (const link of g.logisticsInlineLinks ?? []) {
      expect(g.logistics[link.index]?.text, link.phrase).toContain(link.phrase);
      expect(router.matchRoutes(link.to as string).at(-1)?.routeId, link.to as string).not.toBe(
        rootRouteId,
      );
    }
    for (const link of g.beforeYouGoOfficialLinks ?? []) {
      expect(g.beforeYouGo?.[link.index]?.text).toContain(link.phrase);
    }
    for (const related of g.relatedGuides ?? []) {
      expect(
        router.matchRoutes(related.to as string).at(-1)?.routeId,
        related.to as string,
      ).not.toBe(rootRouteId);
    }
    expect(new Set(g.relatedGuides?.map((item) => item.to)).size).toBe(6);
    expect(
      itinerarySourcesByGuide["7"].some((source) => source.url.includes("capernaum-national-park")),
    ).toBe(true);
    expect(itinerarySourcesByGuide["7"].some((source) => source.url.includes("magdala.org"))).toBe(
      true,
    );
    expect(
      itinerarySourcesByGuide["7"].some((source) => source.url.includes("caesarea-national-park")),
    ).toBe(true);
    expect(itinerarySourcesByGuide["7"].some((source) => source.url.includes("eta-il"))).toBe(true);
    expect(
      g.logistics.every((tip) => tip.to !== "/travel-blog/ben-gurion-airport-to-tel-aviv/"),
    ).toBe(true);
    expect(g.logistics.some((tip) => tip.to === "/airport-transfers/")).toBe(true);
    expect(itineraries["10"].daySequences?.map((item) => item.day)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(itineraries["10"].dayChoices?.map((item) => item.day)).toEqual([2, 6, 7, 8, 10]);
    expect(itineraries["10"].jerusalemTourOptionsDay).toBe(3);
  });

  it("uses the consistent seven-day responsive layout and correctly attributed partner links", () => {
    const view = file("src/components/IsraelItineraryPage.tsx");
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(view).toMatch(sourceFragment("const compactOverview = true"));
    expect(view).toMatch(sourceFragment("Daily route, transport and overnight stays"));
    expect(view).toMatch(sourceFragment("Have more or fewer than 7 days in Israel?"));
    expect(view).toMatch(sourceFragment("Before you book"));
    expect(view).toMatch(sourceFragment("Related practical guides"));
    expect(view).toMatch(
      sourceFragment('days={id === "10" ? 10 : id === "7" ? 7 : id === "5" ? 5 : 3}'),
    );
    expect(view).toMatch(sourceFragment('id !== "5" && id !== "7" && id !== "10"'));
    expect(sourceIndex(view, "data-testid={`day-${index + 1}-route-choices`}")).toBeGreaterThan(
      sourceIndex(view, '<dl className="space-y-5">'),
    );
    expect(tours).toMatch(sourceFragment("days?: 3 | 5 | 7 | 10"));
    expect(tours).toMatch(sourceFragment("days: 3 | 5 | 7 | 10"));
    expect(tours).toMatch(sourceFragment("itt_${days}day_"));
    expect(tours).toMatch(sourceFragment("pageId: `israel-itinerary-${days}-days`"));
    expect(tours).toMatch(sourceFragment("grid gap-5 sm:grid-cols-2 lg:grid-cols-3"));
    expect(
      new URL(getYourGuideCityWidgetSrc("jerusalem", "7_day")).searchParams.get("shmarker"),
    ).toBe("622032.7_day");
    expect(new URL(getYourGuideCityWidgetSrc("telAviv", "7_day")).searchParams.get("iata")).toBe(
      "TLV",
    );
    expect(file("src/components/GetYourGuideCityWidget.tsx")).not.toMatch(
      sourceFragment("Optional tours and activities from GetYourGuide (affiliate)."),
    );
  });

  it("has a focused, bookable-through-guides three-day plan without intrusive affiliate links", () => {
    const three = itineraries["3"];
    expect(three.overviewRows).toHaveLength(3);
    expect(three.beforeYouGo).toHaveLength(3);
    expect(three.relatedGuides).toHaveLength(6);
    expect(three.hero).not.toEqual(three.daysPlan[0]?.image);

    const related = three.relatedGuides ?? [];
    expect(new Set(related.map((item) => item.to)).size).toBe(related.length);
    expect(new Set(related.map((item) => item.image)).size).toBe(related.length);
    expect(three.daysPlan[1]?.links.some((link) => link.to === "/tours/masada-dead-sea/")).toBe(
      true,
    );
    expect(three.logistics.some((tip) => tip.to === "/car-rental/")).toBe(true);
    expect(
      three.logistics.some((tip) => tip.to === "/travel-blog/where-to-stay-in-jerusalem/"),
    ).toBe(true);

    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
    for (const link of [...related, ...(three.beforeYouGo ?? [])].filter((item) => item.to)) {
      const path = link.to as string;
      expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
    expect(itinerarySourcesByGuide["3"].some((item) => /Bahá/i.test(item.label))).toBe(false);
    expect(itinerarySourcesByGuide["3"].some((item) => /Masada/i.test(item.label))).toBe(true);
    for (const id of itineraryIds) {
      expect(itinerarySourcesByGuide[id].length).toBeGreaterThanOrEqual(3);
    }

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toMatch(sourceFragment("Related practical guides"));
    expect(view).toMatch(sourceFragment("Daily route and hotel bases"));
    expect(view).toMatch(sourceFragment("<SourcesDisclosure>"));
    expect(sourceIndex(view, "<HomeContactForm")).toBeLessThan(
      sourceIndex(view, "<SourcesDisclosure>"),
    );
  });

  it("keeps the upgraded ten-day route, hotel choices, affiliate widgets and source links coherent", () => {
    const g = itineraries["10"];
    const view = file("src/components/IsraelItineraryPage.tsx");
    const tours = file("src/components/JerusalemItineraryTourOptions.tsx");
    expect(g.daysPlan).toHaveLength(10);
    expect(g.reviewedAt).toBe("2026-11-24");
    expect(g.hero).toBe("featured-original-10day");
    expect(g.daysPlan[6]?.image).toBe("itinerary-10day-akko-port");
    expect(new Set([g.hero, ...g.daysPlan.map((day) => day.image)]).size).toBe(11);
    expect(g.overviewRows).toHaveLength(10);
    expect(g.overviewRows?.every((row) => Boolean(row.travel))).toBe(true);
    expect(g.hotelBases).toContain("Haifa after Day 7");
    expect(g.daysPlan[6]?.evening).toContain("continue to Tel Aviv instead");
    expect(g.daysPlan[3]?.afternoon).toContain(
      "Check Magdala’s visiting hours before adding this stop",
    );
    expect(g.daysPlan[4]?.afternoon).toMatch(/allow time for short drives and separate entrances/i);
    expect(g.daysPlan[5]?.morning).toContain("Arbel National Park");
    expect(g.daySequences?.[5]?.steps[0]?.stop).toContain("Arbel");
    expect(g.overviewRows?.[6]?.travel).toContain("Road/bus to Akko");
    expect(g.daysPlan[6]?.morning).toContain("ticket sales end one hour before closing");
    expect(g.daysPlan[6]?.afternoon).toContain("Rosh Hanikra lies north of Akko");
    expect(g.daysPlan[6]?.practical).toContain("no railway station in Tiberias");
    expect(g.daysPlan[7]?.morning).toContain("61 Yefe Nof Street");
    expect(g.daysPlan[8]?.morning).toContain("self-guided walking route");
    expect(g.daysPlan[9]?.afternoon).toContain("If flying on Day 11");
    expect(g.relatedGuides?.find((item) => item.title === "Akko Old City")?.image).toBe(
      "itinerary-10day-akko-aerial",
    );
    expect(g.relatedGuides?.find((item) => item.title === "Akko Old City")?.image).not.toBe(
      g.daysPlan[6]?.image,
    );
    expect(g.daysPlan[7]?.afternoon).toContain(
      "spend Day 8 in the city or take a separate trip to Caesarea",
    );
    expect(g.daysPlan[9]?.morning).toContain("skip sightseeing");
    expect(g.daySequences?.map((day) => day.day)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const sequence of g.daySequences ?? []) {
      expect(sequence.steps).toHaveLength(3);
      expect(sequence.steps.every((step) => step.stop.length > 10 && step.time.length > 10)).toBe(
        true,
      );
    }
    expect(g.dayChoices?.map((choice) => choice.day)).toEqual([2, 6, 7, 8, 10]);
    expect(g.dayChoices?.every((choice) => choice.options.length === 2)).toBe(true);
    expect(g.dayTipHeadings).toHaveLength(10);
    expect(new Set(g.dayTipHeadings).size).toBe(10);
    expect(g.jerusalemTourOptionsDay).toBe(3);
    expect(g.activityWidgets).toEqual([
      { day: 1, city: "jerusalem" },
      { day: 8, city: "haifa" },
      { day: 9, city: "telAviv" },
    ]);
    expect(getYourGuideCityWidgetSrc("haifa", "10_day")).toContain("shmarker=622032.10_day");
    expect(tours).toMatch(sourceFragment("days?: 3 | 5 | 7 | 10"));
    expect(tours).toMatch(sourceFragment("Set aside Day 2 for Bethlehem or Jericho"));
    expect(view).toMatch(sourceFragment("presentation.transferDays.includes(index + 1)"));
    expect(view).toMatch(sourceFragment("const compactOverview = true"));
    expect(g.alternatives).toHaveLength(2);
    expect(g.alternatives[0]?.text).toMatch(
      /southern 10-day route.*replace the Galilee and Haifa with Eilat and Timna/i,
    );
    expect(g.southernRouteOverview).toHaveLength(5);
    expect(g.southernRouteOverview?.[2]?.focus).toContain("Timna Park");
    expect(view).toMatch(sourceFragment("Southern ten-day alternative at a glance"));
    expect(g.relatedGuides).toHaveLength(6);
    expect(g.faqs).toHaveLength(8);
    expect(g.beforeYouGo).toHaveLength(4);
    expect(g.dayOfficialLinks).toHaveLength(8);
    expect(g.beforeYouGoOfficialLinks).toHaveLength(2);
    expect(itinerarySourcesByGuide["10"].some((source) => source.url.includes("akko.org.il"))).toBe(
      true,
    );
    expect(
      itinerarySourcesByGuide["10"].some((source) => source.url.includes("arbel-national-park")),
    ).toBe(true);
    expect(
      itinerarySourcesByGuide["10"].some((source) => source.url.includes("parktimna.co.il")),
    ).toBe(true);
    for (const link of g.dayInlineLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
    }
    for (const link of g.dayOfficialLinks ?? []) {
      expect(g.daysPlan[link.day - 1]?.[link.field], link.phrase).toContain(link.phrase);
      expect(link.href).toMatch(/^https:\/\//);
    }
    for (const link of g.logisticsInlineLinks ?? []) {
      expect(g.logistics[link.index]?.text, link.phrase).toContain(link.phrase);
    }
    for (const link of g.beforeYouGoOfficialLinks ?? []) {
      expect(g.beforeYouGo?.[link.index]?.text, link.phrase).toContain(link.phrase);
    }
  });

  it("links natural phrases in the three-day text instead of showing a link tray after every day", () => {
    const guide = itineraries["3"];
    expect(guide.dayInlineLinks).toHaveLength(15);
    expect(guide.logisticsInlineLinks).toHaveLength(4);
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
    for (const item of guide.dayInlineLinks ?? []) {
      const text = guide.daysPlan[item.day - 1]?.[item.field] ?? "";
      expect(text, `Day ${item.day} ${item.field}: ${item.phrase}`).toContain(item.phrase);
      expect(text.indexOf(item.phrase)).toBeGreaterThanOrEqual(0);
      expect(router.matchRoutes(item.to as string).at(-1)?.routeId, item.to as string).not.toBe(
        rootRouteId,
      );
    }
    for (const item of guide.logisticsInlineLinks ?? []) {
      expect(guide.logistics[item.index]?.text).toContain(item.phrase);
      expect(router.matchRoutes(item.to as string).at(-1)?.routeId, item.to as string).not.toBe(
        rootRouteId,
      );
    }
  });

  it("removes redundant adjustment cards from the three-, five- and seven-day guides", () => {
    expect(itineraries["3"].alternatives).toEqual([]);
    expect(itineraries["5"].alternatives).toEqual([]);
    expect(itineraries["7"].alternatives).toEqual([]);
    expect(itineraries["10"].alternatives).toHaveLength(2);
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toMatch(sourceFragment("g.alternatives.length > 0 && ("));
    expect(view).toMatch(
      sourceFragment('...(g.alternatives.length ? [["alternatives", "Adjust the route"]'),
    );
    expect(view).toMatch(sourceFragment('id="alternatives"'));
    expect(view).toMatch(sourceFragment("Adjust this itinerary to your trip"));
    expect(view).toMatch(sourceFragment('id="transport"'));
    expect(view).toMatch(sourceFragment("<FaqList faqs={g.faqs} />"));
  });

  it("turns the three-day guide into a travel-ready plan without changing longer itineraries", () => {
    const guide = itineraries["3"];
    expect(guide.hotelBases).toContain("nights 1 and 2");
    expect(guide.hotelBases).toContain("Add a night in Tel Aviv after Day 3");
    expect(guide.daySequences?.map((day) => day.day)).toEqual([1, 2, 3]);
    for (const day of guide.daySequences ?? []) {
      expect(day.steps).toHaveLength(3);
      expect(
        day.steps.some((step) =>
          /return to jerusalem|leave jerusalem|lunch and|jerusalem → tel aviv/i.test(step.stop),
        ),
      ).toBe(false);
      for (const step of day.steps) {
        expect(step.stop.length).toBeGreaterThan(12);
        expect(step.time.length).toBeGreaterThan(5);
      }
    }
    expect(
      guide.daySequences?.[0]?.steps.some(
        (step) => /Israel Museum/.test(step.stop) && step.optional,
      ),
    ).toBe(true);
    expect(guide.daySequences?.[1]?.steps.some((step) => /Ein Bokek/.test(step.stop))).toBe(true);
    expect(
      guide.daySequences?.[1]?.steps.some((step) => /Ein Gedi/.test(step.stop) && step.optional),
    ).toBe(true);
    expect(
      guide.dayInlineLinks?.find((link) => link.phrase === "Ben Gurion Airport connections")?.to,
    ).toBe("/airport-transfers/");
    expect(
      guide.dayInlineLinks?.some(
        (link) => link.to === "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      ),
    ).toBe(false);
    expect(guide.description).toContain("day-by-day highlights");
    expect(guide.beforeYouGo?.some((tip) => tip.heading === "Count your usable days")).toBe(false);
    expect(guide.beforeYouGoOfficialLinks?.[0]?.index).toBe(0);
    expect(guide.daySequences?.[2]?.steps.some((step) => /Old Jaffa/.test(step.stop))).toBe(true);
    expect(guide.overviewRows?.every((row) => row.travel)).toBe(true);
    expect(guide.day3Options?.map((option) => option.heading)).toEqual([
      "Flying home on Day 3?",
      "Staying another night?",
    ]);
    expect(guide.daysPlan[2]?.practical).toBe(
      "Arrange luggage storage in Tel Aviv before leaving Jerusalem. Check its opening hours and allow enough time to collect your bags and reach the airport. See Ben Gurion Airport connections to plan your departure.",
    );
    expect(guide.day3Options?.[0]?.text).toContain("arrange luggage storage in advance");
    expect(guide.daysPlan[2]?.morning).toMatch(/no trains run/i);
    for (const id of ["7", "10"] as const) expect(itineraries[id].day3Options).toBeUndefined();
    expect(itineraries["10"].daySequences?.map((item) => item.day)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(itineraries["10"].dayOfficialLinks).toHaveLength(8);
    expect(itineraries["10"].beforeYouGoOfficialLinks).toHaveLength(2);
    const expectedLinks = [
      "/attractions/old-city-jerusalem/",
      "/travel-blog/shopping-in-jerusalem/",
      "/attractions/masada/",
      "/travel-blog/jerusalem-to-the-dead-sea/",
      "/airport-transfers/",
      "/attractions/dead-sea/",
      "/travel-blog/dead-sea-attractions/",
      "/attractions/ein-gedi/",
      "/attractions/jaffa/",
      "/travel-blog/beaches-in-tel-aviv/",
      "/travel-blog/museums-in-tel-aviv/",
    ];
    const internalLinks = new Set<string>(
      guide.dayInlineLinks?.map((link) => link.to as string) ?? [],
    );
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "always",
    });
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
    expect(guide.dayOfficialLinks?.map((link) => new URL(link.href).host)).toEqual([
      "en.parks.org.il",
      "www.rail.co.il",
    ]);
    for (const link of guide.dayOfficialLinks ?? []) {
      expect(guide.daysPlan[link.day - 1]?.[link.field]).toContain(link.phrase);
    }
    for (const link of guide.beforeYouGoOfficialLinks ?? []) {
      expect(guide.beforeYouGo?.[link.index]?.text).toContain(link.phrase);
      expect(link.href).toMatch(/^https:\/\//);
    }

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).toMatch(sourceFragment("day-${index + 1}-highlights"));
    expect(view).toMatch(sourceFragment("Suggested highlights"));
    expect(view).toMatch(sourceFragment('<ul className="mt-3 space-y-2">'));
    expect(view).not.toMatch(sourceFragment("approximate times</span>"));
    expect(view).toMatch(sourceFragment('data-testid="departure-scenarios"'));
    expect(view).toMatch(sourceFragment("Getting around"));
    expect(view).toMatch(sourceFragment("dayTextLinks(g, index + 1"));
    expect(view).toMatch(sourceFragment("beforeBookingLinks(g, index)"));
    expect(view).toMatch(sourceFragment('rel="noopener noreferrer"'));
    expect(view).toContain("g.daySequences?.find");
    expect(view).not.toMatch(sourceFragment("<RouteMap"));
  });

  it("integrates pre-booking checks with transport tips after the itinerary and keeps distinct Old City photos", () => {
    const guide = itineraries["3"];
    expect(guide.hero).toBe("featured-original-3day");
    expect(guide.daysPlan[0]?.image).toBe("itinerary-3day-holy-sepulchre");
    expect(
      guide.relatedGuides?.find((item) => item.to === "/attractions/old-city-jerusalem/")?.image,
    ).toBe("itinerary-jerusalem-old-city");
    const cityImageKeys = [
      guide.hero,
      guide.daysPlan[0]!.image,
      guide.relatedGuides!.find((item) => item.to === "/attractions/old-city-jerusalem/")!.image,
    ];
    expect(new Set(cityImageKeys).size).toBe(3);
    expect(migrationPhotos["itinerary-3day-holy-sepulchre"].src).toBeTruthy();
    expect(migrationPhotos["itinerary-3day-holy-sepulchre"].sourceUrl).toBe("");

    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toMatch(sourceFragment('id="before-you-go"'));
    expect(view).not.toMatch(sourceFragment('id="planning-checklist"'));
    expect(view).toMatch(sourceFragment("My practical planning tips"));
    expect(view).toMatch(sourceFragment("Transport and hotel planning"));
    expect(view).toMatch(sourceFragment("Before you book"));
    expect(view).toMatch(sourceFragment("Have more than 3 days in Israel?"));
    expect(sourceIndex(view, 'id="days"')).toBeLessThan(sourceIndex(view, 'id="transport"'));
    expect(sourceIndex(view, 'id="transport"')).toBeLessThan(
      sourceIndex(view, 'id="alternatives"'),
    );
    expect(sourceIndex(view, "Transport and hotel planning")).toBeLessThan(
      sourceIndex(view, "Before you book"),
    );
    expect(sourceIndex(view, "Before you book")).toBeLessThan(
      sourceIndex(view, 'id="alternatives"'),
    );
    expect(sourceIndex(view, 'id="alternatives"')).toBeLessThan(
      sourceIndex(view, 'id="other-durations"'),
    );
    expect(sourceIndex(view, "Before you book")).toBeLessThan(
      sourceIndex(view, "<HomeContactForm"),
    );
    expect(view).toMatch(sourceFragment("g.beforeYouGo.map((tip, index) =>"));
    expect(view).toMatch(sourceFragment("g.logistics.map((tip, index) =>"));
  });

  it("keeps map and photo-credit clutter out of the shared itinerary layout", () => {
    const view = file("src/components/IsraelItineraryPage.tsx");
    expect(view).not.toMatch(sourceFragment("<RouteMap"));
    expect(view).not.toMatch(sourceFragment("This sample route assumes"));
    expect(view).not.toMatch(sourceFragment("Practical planning note"));
    expect(view).not.toMatch(sourceFragment("Use these focused guides"));
    expect(view).not.toContain("GuidePhotoCredit");
    expect(view).toMatch(sourceFragment('g.dayTipHeadings?.[index] ?? "Worth knowing"'));
    expect(view).not.toMatch(sourceFragment(">Worth knowing</h4>"));
    expect(view).not.toMatch(
      sourceFragment('<h4 className="font-semibold">My practical planning tip</h4>'),
    );
    expect(view).toMatch(sourceFragment("Tips for transport and hotel planning"));
    expect(view).toMatch(sourceFragment("Adjust this itinerary to your trip"));
    expect(view).toContain("<PhotoCreditsDisclosure");
    expect(view).toContain("hasPublicPhotoCredit");
    expect(view).toMatch(sourceFragment("list-disc space-y-4"));
    expect(sourceIndex(view, "<SourcesDisclosure>")).toBeLessThan(
      sourceIndex(view, "<PhotoCreditsDisclosure"),
    );
  });

  it("has contextual navigation and a generated route-tree entry for every itinerary", () => {
    const sidebar = allNavGroups.find((g) => g.title === "Travel guides");
    expect(sidebar?.items.some((item) => item.label === "Israel Itineraries")).toBe(true);
    const tree = file("src/routeTree.gen.ts");
    for (const id of itineraryIds) {
      expect(tree).toContain(`'/travel-blog/israel-itinerary-${id}-days'`);
    }
  });
});
