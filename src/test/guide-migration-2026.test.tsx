import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider, rootRouteId } from "@tanstack/react-router";
import { cleanup, render, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/guides";
import { Route as AttractionsRoute } from "@/routes/attractions.index";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";
import { planningGuides } from "@/data/guidePlanning2026";
import { cityCultureGuides } from "@/data/guideCities2026";
import { heritageGuides } from "@/data/guideHeritage2026";
import { journeyDestinationGuides } from "@/data/guideJourneys2026";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { filterGuides, guideDirectory, travelGuides } from "@/data/travelGuides";
import { getSource, isPublisherUrl, publicSources, travelGuidePaths, type TravelGuideId } from "@/data/registry";

afterEach(cleanup);
const ids = Object.keys({ ...planningGuides, ...cityCultureGuides, ...heritageGuides, ...journeyDestinationGuides }) as TravelGuideId[];
async function routerAt(url: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [url] }), trailingSlash: "always" });
  await router.load();
  return router;
}

describe("October planning, city and heritage guide migration", () => {
  it.each(ids)("renders %s as a substantive sourced article at its original route", async id => {
    const guide = travelGuides[id];
    const router = await routerAt(travelGuidePaths[id]);
    expect(router.matchRoutes(travelGuidePaths[id]).at(-1)?.routeId).not.toBe(rootRouteId);
    const { container } = render(<RouterContextProvider router={router}><TravelGuidePage id={id} /></RouterContextProvider>);
    const article = container.querySelector("main > article")!;
    expect(within(article as HTMLElement).getByRole("heading", { level: 1, name: guide.title })).toBeInTheDocument();
    expect(article.textContent!.split(/\s+/).length).toBeGreaterThan(380);
    expect(guide.sections.length).toBeGreaterThanOrEqual(4);
    expect(new Set(guide.sections.map(section => section.id)).size).toBe(guide.sections.length);
    expect(guide.photo.alt.length).toBeGreaterThan(15);
    expect(article.querySelector("header img")).toHaveAttribute("src", guide.photo.src);
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(publicSources(guide.sourceIds).length).toBeGreaterThan(1);
    for (const anchor of article.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href")!;
      expect(isPublisherUrl(href)).toBe(false);
      if (href.startsWith("/") && !href.startsWith("//")) {
        const pathname = new URL(href, "https://example.com").pathname;
        expect(router.matchRoutes(pathname).at(-1)?.routeId, `${id}: ${href}`).not.toBe(rootRouteId);
      }
    }
    const meta = travelGuideMeta(id);
    const structured = meta.scripts.map(script => JSON.parse(script.children as string));
    const schema = structured.find(item => item["@type"] === "Article");
    expect(schema).toMatchObject({ headline: guide.title, dateModified: "2026-10-20", author: { "@type": "Person", name: "Moshe Barak" } });
    expect(meta.links[0]?.href).toContain(travelGuidePaths[id]);
    expect(meta.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
    expect(structured.some(item => item["@type"] === "Offer")).toBe(false);
  });

  it("makes every guide discoverable in the directory, with real local photographs", async () => {
    expect(ids).toHaveLength(17);
    expect(guideDirectory).toHaveLength(63);
    expect(new Set(guideDirectory.map(guide => guide.id)).size).toBe(guideDirectory.length);
    const router = await routerAt("/guides/");
    const Hub = HubRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    const cards = container.querySelectorAll('[data-testid="guide-directory-card"]');
    expect(cards).toHaveLength(63);
    for (const card of cards) expect(card.querySelector("img[alt]")).not.toBeNull();
    for (const id of ids) expect(container.querySelector(`a[href="${travelGuidePaths[id]}"]`)).not.toBeNull();
    expect(filterGuides("Yardenit").some(guide => guide.to === travelGuidePaths.yardenit)).toBe(true);
    expect(filterGuides("museum", "attractions").some(guide => guide.id === "haifaMuseums")).toBe(true);
    for (const photo of Object.values(migrationPhotos)) {
      const relative = photo.src.replace(/^\//, "").split("?")[0]!;
      expect(existsSync(path.resolve(process.cwd(), relative)), relative).toBe(true);
    }
  });

  it("links regional attractions and Eilat internally without importing the excluded safety article", async () => {
    const router = await routerAt("/attractions/");
    const Hub = AttractionsRoute.options.component!;
    const html = renderToString(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    for (const id of [...Object.keys(cityCultureGuides), ...Object.keys(heritageGuides), "deadSea", "topTen"] as TravelGuideId[]) {
      expect(html).toContain(`href="${travelGuidePaths[id]}"`);
    }
    expect(Object.values(travelGuidePaths)).not.toContain("/travel-blog/israel-safe-to-travel/");
    expect(travelGuides.telAvivMuseums.sections.some(section => section.id === "independence")).toBe(true);
    expect(travelGuides.haifaMuseums.sections.find(section => section.id === "outdoors")?.paragraphs.join(" ")).toContain("not a museum");
    expect(travelGuides.bethlehem.sections.find(section => section.id === "buses")?.paragraphs.join(" ")).toContain("231 as Beit Jala and 234 as Bethlehem");
    expect(travelGuides.yardenit.answer).toContain("no resident priest");
    expect(travelGuides.qasr.comparison.rows).toHaveLength(3);
    expect(travelGuides.topTen.sections).toHaveLength(10);
    expect(travelGuides.food.sections.filter(section => section.photo)).toHaveLength(10);
    expect(travelGuides.calendar.comparison.rows[0]).toEqual(["Passover", "21 April 2027", "28 April 2027"]);
  });
});
