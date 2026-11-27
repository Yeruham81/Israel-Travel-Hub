import { QueryClient } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  RouterContextProvider,
  rootRouteId,
} from "@tanstack/react-router";
import { cleanup, render, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/travel-blog.index";
import { Route as AttractionsRoute } from "@/routes/attractions.index";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";
import { IsraelHolidayVisitorGuidePage } from "@/components/IsraelHolidayVisitorGuide";
import { holidayGuideGroups } from "@/data/israelHolidayVisitorGuide";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { filterGuides, guideDirectory, travelGuides } from "@/data/travelGuides";
import { attractionHubCards } from "@/data/attractionsHub";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { repeatedPhotos } from "@/lib/photo-uniqueness";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import {
  getSource,
  isPublisherUrl,
  publicSources,
  travelGuidePaths,
  type TravelGuideId,
} from "@/data/registry";

afterEach(cleanup);
const ids = Object.keys({
  ...planningGuides,
  ...cityCultureGuides,
  ...heritageGuides,
  ...journeyDestinationGuides,
}).filter(
  (id) => id !== "calendar" && id !== "precipice" && id !== "megiddo" && id !== "annunciation",
) as TravelGuideId[];
async function routerAt(url: string) {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [url] }),
    trailingSlash: "always",
  });
  await router.load();
  return router;
}

describe("October planning, city and heritage guide migration", () => {
  it.each(ids)("renders %s as a substantive sourced article at its original route", async (id) => {
    const guide = travelGuides[id];
    const router = await routerAt(travelGuidePaths[id]);
    expect(router.matchRoutes(travelGuidePaths[id]).at(-1)?.routeId).not.toBe(rootRouteId);
    const { container } = render(
      <RouterContextProvider router={router}>
        <TravelGuidePage id={id} />
      </RouterContextProvider>,
    );
    const article = container.querySelector("main > article")!;
    expect(
      within(article as HTMLElement).getByRole("heading", { level: 1, name: guide.title }),
    ).toBeInTheDocument();
    expect(article.textContent!.split(/\s+/).length).toBeGreaterThan(380);
    expect(guide.sections.length).toBeGreaterThanOrEqual(4);
    expect(new Set(guide.sections.map((section) => section.id)).size).toBe(guide.sections.length);
    expect(guide.photo.alt.length).toBeGreaterThan(15);
    expect(article.querySelector("header figure img")).toHaveAttribute("src", guide.photo.src);
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(publicSources(guide.sourceIds).length).toBeGreaterThan(1);
    for (const anchor of article.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href")!;
      expect(isPublisherUrl(href)).toBe(false);
      if (href.startsWith("/") && !href.startsWith("//")) {
        const pathname = new URL(href, "https://example.com").pathname;
        expect(router.matchRoutes(pathname).at(-1)?.routeId, `${id}: ${href}`).not.toBe(
          rootRouteId,
        );
      }
    }
    const meta = travelGuideMeta(id);
    const structured = meta.scripts.map((script) => JSON.parse(script.children as string));
    const schema = structured.find((item) => item["@type"] === "Article");
    expect(schema).toMatchObject({
      headline: guide.title,
      dateModified: guide.updatedAt || "2026-10-20",
      author: { "@type": "Person", name: "Moshe Barak" },
    });
    expect(meta.links[0]?.href).toContain(travelGuidePaths[id]);
    expect(meta.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
    expect(structured.some((item) => item["@type"] === "Offer")).toBe(false);
  });

  it("makes every guide discoverable in the directory, with real local photographs", async () => {
    // These three destinations now have dedicated attraction pages and tests.
    expect(ids).toHaveLength(12);
    expect(guideDirectory.length).toBeGreaterThanOrEqual(42);
    expect(
      guideDirectory.some(
        (guide) => guide.id === "calendar" && guide.to === "/travel-blog/calendar-of-events/",
      ),
    ).toBe(true);
    expect(guideDirectory.some((guide) => guide.id === "israel-holidays")).toBe(false);
    expect(new Set(guideDirectory.map((guide) => guide.id)).size).toBe(guideDirectory.length);
    const router = await routerAt("/travel-blog/");
    const Hub = HubRoute.options.component!;
    const { container } = render(
      <RouterContextProvider router={router}>
        <Hub />
      </RouterContextProvider>,
    );
    const cards = container.querySelectorAll('[data-testid="guide-directory-card"]');
    expect(cards).toHaveLength(guideDirectory.length);
    const missing = uniqueGuideCardPhotos(guideDirectory.map((guide) => ({ guide })))
      .filter((entry) => !entry.cardPhoto)
      .map((entry) => entry.guide.id);
    expect(missing, "Every directory card must display a suitable actual image").toEqual([]);
    for (const card of cards) expect(card.querySelector("img[alt]")).not.toBeNull();
    for (const id of ids) {
      if (travelGuidePaths[id].startsWith("/travel-blog/"))
        expect(container.querySelector(`a[href="${travelGuidePaths[id]}"]`)).not.toBeNull();
    }
    expect(filterGuides("Yardenit").some((guide) => guide.to === travelGuidePaths.yardenit)).toBe(
      false,
    );
    expect(attractionHubCards.some((card) => card.to === travelGuidePaths.yardenit)).toBe(true);
    expect(filterGuides("museum", "attractions").some((guide) => guide.id === "haifaMuseums")).toBe(
      true,
    );
    for (const photo of Object.values(migrationPhotos)) {
      const relative = photo.src.replace(/^\//, "").split("?")[0]!;
      // Public URLs resolve under public/, while bundled imports resolve to source assets.
      const isPresent =
        existsSync(path.resolve(process.cwd(), relative)) ||
        (photo.src.startsWith("/images/") &&
          existsSync(path.resolve(process.cwd(), "public", relative)));
      expect(isPresent, relative).toBe(true);
    }
  });

  it("keeps real, nonrepeating photographs in every article's related guide cards", () => {
    const problems: string[] = [];
    for (const article of Object.values(travelGuides)) {
      const options = article.related
        .flatMap((id) => guideDirectory.filter((entry) => entry.id === id))
        .map((guide) => ({ guide }));
      const cards = uniqueGuideCardPhotos(options, [article.photo.src]);
      for (const card of cards)
        if (!card.cardPhoto) problems.push(article.id + " → " + card.guide.id);
      if (repeatedPhotos(cards.map((card) => card.cardPhoto?.src || "")).length)
        problems.push(article.id + " → repeated photos");
    }
    for (const [id, journey] of Object.entries(airportJourneyGuides)) {
      const options = journey.related
        .flatMap((link) => guideDirectory.filter((entry) => entry.to === link.to))
        .map((guide) => ({ guide }));
      const cards = uniqueGuideCardPhotos(options, [journey.photo.src]);
      for (const card of cards) if (!card.cardPhoto) problems.push(id + " → " + card.guide.id);
      if (repeatedPhotos(cards.map((card) => card.cardPhoto?.src || "")).length)
        problems.push(id + " → repeated photos");
    }
    expect(problems, "Related guide cards must show distinct real photos").toEqual([]);
  });

  it("links regional attractions and Eilat internally without importing the excluded safety article", async () => {
    const router = await routerAt("/attractions/");
    const Hub = AttractionsRoute.options.component!;
    const html = renderToString(
      <RouterContextProvider router={router}>
        <Hub />
      </RouterContextProvider>,
    );
    for (const id of [
      ...Object.keys(cityCultureGuides),
      ...Object.keys(heritageGuides),
      "deadSea",
    ] as TravelGuideId[]) {
      expect(html).toContain(`href="${travelGuidePaths[id]}"`);
    }
    expect(html).toContain('id="browse-regions-heading"');
    expect(html).toContain('href="#nazareth-lower-galilee"');
    expect(html).toContain("Nazareth &amp; Galilee");
    expect(html).not.toContain(`href="${travelGuidePaths.topTen}"`);
    expect(Object.values(travelGuidePaths)).not.toContain("/travel-blog/israel-safe-to-travel/");
    expect(
      travelGuides.telAvivMuseums.sections.some((section) =>
        section.subsections?.some((sub) => sub.id === "museum-independence"),
      ),
    ).toBe(true);
    expect(
      travelGuides.haifaMuseums.sections
        .find((section) => section.id === "outdoors")
        ?.paragraphs.join(" "),
    ).toContain("not a museum");
    expect(
      travelGuides.bethlehem.sections
        .find((section) => section.id === "buses")
        ?.subsections?.find((sub) => sub.id === "bus-231")
        ?.paragraphs.join(" "),
    ).toContain("Bab al-Zaqaq / Beit Jala Road stop");
    expect(
      travelGuides.bethlehem.sections
        .find((section) => section.id === "buses")
        ?.subsections?.find((sub) => sub.id === "bus-234")
        ?.paragraphs.join(" "),
    ).toContain("Bus 234 travels from Nevi'im Terminal to Checkpoint 300");
    expect(travelGuides.yardenit.answer).toContain("no resident priest");
    expect(travelGuides.qasr.comparison.rows).toHaveLength(3);
    expect(travelGuides.topTen.sections).toHaveLength(10);
    expect(travelGuides.food.sections.filter((section) => section.photo)).toHaveLength(10);
    expect(travelGuides.calendar.comparison.rows[0]).toEqual([
      "Yom Kippur",
      "Major interruption to transport, airport operations and business activity",
    ]);
  });
  it("restores the original holiday guide purpose without an event database", async () => {
    const url = "/travel-blog/calendar-of-events/";
    const router = await routerAt(url);
    expect(router.matchRoutes(url).at(-1)?.routeId).not.toBe(rootRouteId);
    const { container } = render(
      <RouterContextProvider router={router}>
        <IsraelHolidayVisitorGuidePage />
      </RouterContextProvider>,
    );
    expect(
      within(container).getByRole("heading", {
        level: 1,
        name: "Israel's Calendar of events: A practical guide for visitors",
      }),
    ).toBeInTheDocument();
    expect(
      within(container).getByRole("heading", { name: "Which dates affect travel most?" }),
    ).toBeInTheDocument();
    expect(
      within(container).getByRole("heading", {
        name: "Major Jewish holidays that can change your itinerary",
      }),
    ).toBeInTheDocument();
    expect(
      within(container).getByRole("heading", { name: "Muslim, Christian & Druze holidays" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("[data-holiday-card]")).toHaveLength(
      holidayGuideGroups.flatMap((g) => g.items).length,
    );
    expect(container.querySelectorAll("#faq details")).toHaveLength(9);
    expect(container.querySelectorAll("#explore-more a")).toHaveLength(6);
    expect(container.querySelector("#contact form")).not.toBeNull();
    expect(
      container.querySelector('a[href="https://www.hebcal.com/holidays/?i=on"]'),
    ).not.toBeNull();
    expect(container.querySelector("#event-planner")).toBeNull();
    expect(container.querySelector("#confirmed-events")).toBeNull();
    expect(container.querySelector("#annual-festivals")).toBeNull();
    expect(
      within(container).queryByRole("heading", { name: "Upcoming confirmed events" }),
    ).toBeNull();
  });
});
