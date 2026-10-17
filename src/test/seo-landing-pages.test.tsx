import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as Root } from "@/routes/__root";
import { pageMeta, siteConfig, jsonLd, CANONICAL_ORIGIN } from "@/lib/site";

export const landingPaths = [
  "/travel-blog/ben-gurion-airport-to-jerusalem/",
  "/travel-blog/ben-gurion-airport-to-tel-aviv/",
  "/travel-blog/ben-gurion-airport-to-haifa/",
  "/travel-blog/ben-gurion-airport-to-ein-bokek/",
  "/travel-blog/from-ben-gurion-airport-on-shabbat/",
  "/travel-blog/getting-around-israel/",
  "/travel-blog/taxis-in-israel/",
  "/travel-blog/where-to-stay-in-jerusalem/",
  "/travel-blog/where-to-stay-in-tel-aviv/",
  "/travel-blog/best-dead-sea-hotels/",
] as const;

async function inspectLanding(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  const match = router.matchRoutes(path).at(-1);
  const route = match ? router.routesById[match.routeId] : undefined;
  const Page = route?.options.component;
  if (!Page || !route) throw new Error(`Missing landing: ${path}`);
  const head = await route.options.head?.({} as never);
  const html = renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
  const document = new DOMParser().parseFromString(html, "text/html");
  return { router, head, document };
}

describe("ten search-intent landing pages", () => {
  it("keeps launch configuration separate from staging and removes the root override", async () => {
    const root = await Root.options.head?.({} as never);
    expect(root?.meta?.filter((item) => item && "name" in item && item.name === "robots")).toHaveLength(0);
    const opts = { title: "Private pickup", description: "Arrange your party's pickup", path: landingPaths[0], crumbs: [{ name: "Home", path: "/" }] };
    expect(pageMeta(opts, siteConfig({})).meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
    const production = pageMeta(opts, siteConfig({ VITE_CANONICAL_ORIGIN: "https://www.israel-taxi.com///", VITE_INDEXABLE: "true" }));
    expect(production.links).toEqual([{ rel: "canonical", href: "https://www.israel-taxi.com" + landingPaths[0] }]);
    expect(production.meta).toContainEqual({ name: "robots", content: "index,follow" });
    expect(production.scripts[0]?.children).toContain("https://www.israel-taxi.com/");
    expect(pageMeta(opts, siteConfig({ VITE_INDEXABLE: "false" })).meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
  });

  it("safely encodes structured text without changing its meaning", () => {
    const value = { headline: "</script><script>unsafe & text" };
    const script = jsonLd(value);
    expect(script.children).not.toContain("<");
    expect(JSON.parse(script.children)).toEqual(value);
  });

  it("has unique accurate metadata, self URLs and truthful schemas for exactly ten pages", async () => {
    const titles: string[] = [], descriptions: string[] = [];
    for (const [index, path] of landingPaths.entries()) {
      const { head, document } = await inspectLanding(path);
      const meta = head?.meta || [];
      const title = meta.find((item) => item && "title" in item)?.title;
      const description = meta.find((item) => item && "name" in item && item.name === "description");
      if (!title || !description || !("content" in description) || !description.content) throw new Error(`Missing metadata ${path}`);
      titles.push(title); descriptions.push(description.content);
      expect(meta.filter((item) => item && "name" in item && item.name === "robots"), path).toEqual([{ name: "robots", content: "noindex,nofollow" }]);
      expect(head?.links?.filter((link) => link?.rel === "canonical"), path).toEqual([{ rel: "canonical", href: CANONICAL_ORIGIN + path }]);
      expect(meta).toContainEqual({ property: "og:url", content: CANONICAL_ORIGIN + path });
      expect(meta).toContainEqual({ property: "og:title", content: title });
      expect(meta).toContainEqual({ property: "og:description", content: description.content });
      expect(meta).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
      expect(document.querySelectorAll("h1"), path).toHaveLength(1);
      expect(document.querySelector("h1")?.textContent).toBe(title);
      const schemas = (head?.scripts || []).flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
      expect(schemas.filter((schema) => schema["@type"] === "BreadcrumbList")).toHaveLength(1);
      const primary = schemas.find((schema) => schema["@type"] === (index < 4 ? "WebPage" : "Article"));
      expect(primary?.author?.name).toBe("Moshe Barak");
      expect(primary?.[index < 4 ? "url" : "mainEntityOfPage"]).toBe(CANONICAL_ORIGIN + path);
      expect(primary?.datePublished).toBeUndefined();
      expect(JSON.stringify(schemas)).not.toMatch(/"(?:aggregateRating|review|offers)"|"@type":"(?:Product|FAQPage)"/);
      if (index < 4) expect(primary.mainEntity).toMatchObject({ "@type": "Service", serviceType: "Private airport transfer" });
      else {
        expect(primary.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const image = document.querySelector(`img[src="${new URL(primary.image).pathname}"]`);
        expect(image, path).not.toBeNull();
      }
    }
    expect(new Set(titles).size).toBe(10);
    expect(new Set(descriptions).size).toBe(10);
  }, 30000);

  it.each(landingPaths)("renders useful crawlable information and valid next steps at %s", async (path) => {
    const { router, document } = await inspectLanding(path);
    const main = document.querySelector("main");
    if (!main) throw new Error("Missing main content");
    const links = [...main.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')];
    expect(new Set(links.map((link) => link.pathname)).size).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(router.matchRoutes(link.pathname).at(-1)?.routeId, link.pathname).toBe(link.pathname.replace(/\/$/, "") || "/");
    }
    for (const link of main.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(document.getElementById(link.hash.slice(1)), link.hash).not.toBeNull();
    }
    const info = main.querySelector(path.includes("ben-gurion-airport-to-") ? "#journey-details" : path.includes("where-to-stay") || path.includes("best-dead-sea") ? "#overview" : "#quick-answer");
    expect(info?.textContent?.length).toBeGreaterThan(100);
    const form = main.querySelector("form");
    if (form && info) expect(info.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});