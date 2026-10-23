import { describe, expect, it } from "vitest";
import { redirectRetiredDestinations } from "@/lib/retired-route-redirects.server";
import { attractionPlanningPaths } from "@/data/attractionsHub";
import { allNavGroups } from "@/data/nav";
import { readFile } from "node:fs/promises";

describe("retired Destinations directory", () => {
  it.each(["/destinations", "/destinations/", "/destinations/?ref=old-bookmark"])(
    "permanently redirects %s to the accommodation directory",
    (path) => {
      const response = redirectRetiredDestinations(new Request("https://example.org" + path));
      expect(response?.status).toBe(301);
      expect(response?.headers.get("Location")).toBe("https://example.org/hotels/");
    },
  );
  it("does not redirect functioning pages or change non-navigation requests", () => {
    for (const path of ["/", "/hotels/", "/attractions/", "/travel-blog/where-to-stay-in-jerusalem/"]) {
      expect(redirectRetiredDestinations(new Request("https://example.org" + path))).toBeNull();
    }
    expect(redirectRetiredDestinations(new Request("https://example.org/destinations/", { method: "POST" }))).toBeNull();
    expect(redirectRetiredDestinations(new Request("https://example.org/destinations/", { method: "HEAD" }))?.status).toBe(301);
  });
  it("keeps the old path out of active navigation and the sitemap", async () => {
    const all = allNavGroups.flatMap(group => group.items.flatMap(item =>
      "to" in item ? [item.to, ...((item.children ?? []).map(child => child.to))] : []));
    expect(all).not.toContain("/destinations/");
    expect(attractionPlanningPaths.some(item => item.to === "/destinations/")).toBe(false);
    expect(attractionPlanningPaths.find(item => item.id === "shore-excursions")?.to).toBe("/shore-excursions/");
    const home = await readFile("src/routes/index.tsx", "utf8");
    expect(home).toContain('to="/hotels/" className="btn btn-light mt-6">Explore all accommodation');
    expect(home).not.toContain('to="/destinations/"');
    const sitemap = await readFile("public/sitemap.xml", "utf8");
    expect(sitemap).not.toContain("/destinations/");
  });
});
