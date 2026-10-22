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
      if (id === "tel-aviv") expect(doc.body.textContent).toContain("this guide does not quote an unverified current fare");
      else expect(doc.body.textContent).toContain("historical editorial estimates");
      const sourceDisclosure = doc.querySelector("#sources details");
      expect(sourceDisclosure).not.toBeNull();
      expect(sourceDisclosure!.hasAttribute("open")).toBe(false);
      expect(sourceDisclosure!.querySelector("summary")?.textContent).toContain("Sources");
      expect(sourceDisclosure!.querySelectorAll("a")).toHaveLength(6);
      expect(article.citation).toHaveLength(6);
      expect(JSON.stringify(article.citation)).not.toContain("israel-taxi.com");
    }
    expect(new Set(titles).size).toBe(4);
  }, 30000);

  it("makes the upgraded Tel Aviv comparison practical, accurate and distinct from private transfers", () => {
    const g = airportJourneyGuides["tel-aviv"];
    expect(g.updatedAt).toBe("2026-10-22");
    expect(g.historicalPrices).toBe(false);
    expect(g.title).toMatch(/Ben Gurion Airport to Tel Aviv.*Train.*Bus.*Taxi/i);
    expect(g.answer).toMatch(/bus 445.*Terminal 3.*Level 2.*Exit 21/is);
    expect(g.answer).toMatch(/HaHagana.*HaShalom.*Savidor Center.*University/s);
    expect(g.options.find(o => o.id === "rail")?.cost).not.toContain("₪");
    expect(g.options.find(o => o.id === "bus")?.cost).not.toContain("₪");
    expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    expect(g.stations).toHaveLength(4);
    expect(g.photos?.station.alt).toMatch(/Terminal 3/);
    expect(g.photos?.onward.alt).toMatch(/Old Jaffa/);
    expect(g.sources).toHaveLength(6);
    expect(g.faqs.length).toBeGreaterThanOrEqual(9);
    expect(g.weekend.join(" ")).toMatch(/Shabbat|Saturday/);
    expect(g.weekend.join(" ")).toContain("dedicated airport Shabbat guide");
    const links = g.options.flatMap(option => option.inlineLinks || []);
    for (const link of links) {
      const option = g.options.find(o => o.inlineLinks?.includes(link))!;
      expect(option.paragraphs.join(" ").split(link.text), link.text).toHaveLength(2);
    }
    expect(links.map(x => x.to)).toEqual(expect.arrayContaining([
      "/travel-blog/getting-around-tel-aviv/",
      "/travel-blog/getting-around-israel/",
      "/travel-blog/ben-gurion-airport-taxis/",
      "/travel-blog/taxi-fares-in-israel/",
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/from-ben-gurion-airport-on-shabbat/",
    ]));
  });

  it("renders in-paragraph links and two additional photos for the Tel Aviv journey", async () => {
    const g = airportJourneyGuides["tel-aviv"];
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="tel-aviv" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("article")).toHaveLength(0);
    expect(doc.querySelectorAll("figure img")).toHaveLength(3);
    for (const option of g.options) {
      for (const link of option.inlineLinks || []) {
        const el = doc.querySelector(`#option-${option.id} a[href="${link.to}"]`);
        expect(el, `Missing in-paragraph link ${link.text}`).not.toBeNull();
        expect(el?.closest("p")).not.toBeNull();
      }
    }
    expect(doc.querySelectorAll('section[aria-label="Related practical guides"] img').length).toBeGreaterThanOrEqual(4);
    expect(doc.querySelector('a[href="/travel-blog/ben-gurion-airport-to-tel-aviv/#request-quote"]')).not.toBeNull();
    expect(doc.body.textContent).not.toMatch(/≈ ₪10–15|≈ ₪8–15|≈ ₪150–230/);
  });

  it("does not invent live transport fares or claim rail on Shabbat", () => {
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      expect(g.weekend.join(" ")).toMatch(/Shabbat/);
      expect(g.options.find(o => o.id === "private")?.cost).toContain("quote");
      expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    }
    expect(airportJourneyGuides["ein-bokek"].answer).toContain("connection");
    expect(airportJourneyGuides["tel-aviv"].options.find(o => o.id === "weekend")?.name).toContain("711");
  });
});
