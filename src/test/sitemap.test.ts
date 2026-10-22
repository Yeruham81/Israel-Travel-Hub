import { readFile } from "node:fs/promises";
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { CANONICAL_ORIGIN, pageMeta, siteConfig } from "@/lib/site";
import { collectSitemapPaths, buildSitemap, buildRobots, normalizeOrigin, DEFAULT_CANONICAL_ORIGIN } from "../../scripts/generate-sitemap.mjs";

describe("generated XML sitemap and robots.txt", () => {
  it("covers every static HTML route, including both the airport comparison and private-transfer pages", async () => {
    const paths = await collectSitemapPaths();
    expect(paths.length).toBeGreaterThanOrEqual(80);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths[0]).toBe("/");
    expect(paths).not.toContain("/api/exchange-rates/");
    expect(paths).not.toContain("/about/");
    expect(paths).not.toContain("/transfers/ben-gurion-airport/");
    expect(paths).toContain("/about-moshe-barak/");
    expect(paths).toContain("/privacy-policy/");
    expect(paths).toContain("/terms-of-use/");
    for (const city of ["jerusalem", "tel-aviv", "haifa", "ein-bokek"]) {
      expect(paths).toContain("/travel-blog/how-to-get-from-ben-gurion-airport-to-" + city + "/");
      expect(paths).toContain("/travel-blog/ben-gurion-airport-to-" + city + "/");
    }
    expect(paths).toContain("/guides/");
    expect(paths).toContain("/transfers/");
    expect(paths).toContain("/tours/");
    expect(paths).not.toContain("/tours/bethlehem-from-jerusalem/");
    expect(paths).toContain("/travel-blog/jerusalem-to-bethlehem/");
    expect(paths).toContain("/attractions/");
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const p of paths) {
      const matched = router.matchRoutes(p);
      expect(matched.at(-1)?.routeId.replace(/\/$/, "") || "/", p).toBe(p.replace(/\/$/, "") || "/");
    }
  });

  it("generates sitemap protocol XML with valid loc elements and canonical slash URLs, without invented lastmod values", async () => {
    const paths = await collectSitemapPaths();
    const xml = buildSitemap(paths, "https://example.org/");
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    expect(doc.querySelector("parsererror")).toBeNull();
    expect(doc.documentElement.namespaceURI).toBe("http://www.sitemaps.org/schemas/sitemap/0.9");
    const found = [...doc.getElementsByTagNameNS("*", "loc")].map(x => x.textContent);
    expect(found).toEqual(paths.map(p => "https://example.org" + p));
    expect(xml).not.toMatch(/<lastmod>|<priority>|<changefreq>/);
    expect(xml).not.toContain("/api/exchange-rates/");
    expect(() => buildSitemap(["/valid/", "/valid/"], "https://example.org")).toThrow("Duplicate");
    expect(() => buildSitemap(["/invalid"], "https://example.org")).toThrow("Non-canonical");
    expect(() => buildSitemap(["/"], "https://example.org/a?b=1")).toThrow();
  });

  it("generates the sitemap and robots directive under the same site origin as canonical tags", async () => {
    const paths = await collectSitemapPaths();
    const xml = await readFile("public/sitemap.xml", "utf8");
    const robots = await readFile("public/robots.txt", "utf8");
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    expect(doc.querySelector("parsererror")).toBeNull();
    const urls = [...doc.getElementsByTagNameNS("*", "loc")].map(x => x.textContent || "");
    expect(urls.map(u => new URL(u).pathname)).toEqual(paths);
    const sitemapOrigin = new URL(urls[0]!).origin;
    expect(robots).toBe(buildRobots(sitemapOrigin));
    expect(robots).toMatch(/^User-agent: \*\nAllow: \//);
    expect(robots).not.toContain("Disallow:");
    expect(siteConfig({}).origin).toBe(DEFAULT_CANONICAL_ORIGIN);
    const expectedOrigin = normalizeOrigin(CANONICAL_ORIGIN);
    const canonical = pageMeta({ title: "Test", description: "Test", path: "/guides/" }).links[0]?.href;
    expect(canonical).toBe(expectedOrigin + "/guides/");
    // Development/indexing policy is not changed by adding an XML sitemap.
    expect(pageMeta({ title: "Test", description: "Test", path: "/guides/" }, siteConfig({})).meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
    expect(urls.every(url => url.startsWith(sitemapOrigin + "/"))).toBe(true);
  });
});
