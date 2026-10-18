import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { airportJourneyGuides, airportJourneyIds } from "@/data/airportJourneyGuides";
import { airportJourneyMeta, AirportJourneyPage } from "@/components/AirportJourneyPage";
import { getAirportRouteGuide } from "@/data/airportRoutes";

describe("four independent airport transportation comparisons", () => {
  it("separates informational search intent and self canonical from private booking", async () => {
    const titles: string[] = [];
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      const privateId = id === "ein-bokek" ? "dead-sea" : id;
      const privateGuide = getAirportRouteGuide(privateId);
      expect(g.path).not.toBe(privateGuide.path);
      expect(g.title).toMatch(/^How to get from Ben Gurion Airport/i);
      expect(privateGuide.title).toMatch(/^Private transfer/i);
      expect(g.options.some(o => o.id === "rail")).toBe(true);
      expect(g.options.some(o => o.id === "taxi")).toBe(true);
      expect(g.options.some(o => o.id === "private")).toBe(true);
      expect(g.faqs.length).toBeGreaterThanOrEqual(4);
      const meta = airportJourneyMeta(id);
      expect(meta.links).toEqual([{ rel: "canonical", href: expect.stringMatching(new RegExp(g.path.replaceAll("/", "\\/") + "$")) }]);
      expect(meta.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
      expect(meta.meta).toContainEqual({ title: g.title });
      expect(meta.meta).toContainEqual({ property: "og:image", content: expect.stringMatching(/^https:\/\//) });
      const article = JSON.parse(meta.scripts[1]!.children);
      expect(article["@type"]).toBe("Article");
      expect(article.author.name).toBe("Moshe Barak");
      expect(article).not.toHaveProperty("offers");
      titles.push(g.title);
      const path = g.path;
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
      await router.load();
      expect(router.matchRoutes(path).at(-1)?.routeId.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
      const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id={id}/></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelectorAll("h1")).toHaveLength(1);
      expect(doc.querySelectorAll("table")).toHaveLength(2);
      expect(doc.querySelector('a[href*="#request-quote"]')).not.toBeNull();
      expect(doc.querySelector('a[href*="#request-quote"]')?.getAttribute("href")).toContain(privateGuide.path);
      expect(doc.body.textContent).toContain("historical editorial estimates");
      expect(doc.querySelector("#sources")).not.toBeNull();
    }
    expect(new Set(titles).size).toBe(4);
  }, 30000);

  it("does not invent live transport fares or claim rail on Shabbat", () => {
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      expect(g.weekend.join(" ")).toMatch(/Shabbat/);
      expect(g.options.find(o => o.id === "private")?.cost).toContain("quote");
      expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/Meter/);
    }
    expect(airportJourneyGuides["ein-bokek"].answer).toContain("connection");
    expect(airportJourneyGuides["tel-aviv"].options.find(o => o.id === "weekend")?.name).toContain("711");
  });
});
