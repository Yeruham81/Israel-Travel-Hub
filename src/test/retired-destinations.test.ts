import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { attractionPlanningPaths } from "@/data/attractionsHub";
import { allNavGroups } from "@/data/nav";
import { collectSitemapPaths } from "../../scripts/generate-sitemap.mjs";

describe("removed Destinations directory", () => {
  it("has no route file, server redirect, or generated route registration", () => {
    expect(existsSync("src/routes/destinations.tsx")).toBe(false);
    expect(existsSync("src/routes/hotels.tsx")).toBe(false);
    expect(existsSync("src/routes/accommodation.tsx")).toBe(true);
    expect(existsSync("src/lib/retired-route-redirects.server.ts")).toBe(false);
    const tree = readFileSync("src/routeTree.gen.ts", "utf8");
    expect(tree).not.toContain("DestinationsRoute");
    expect(tree).not.toMatch(/\bHotelsRoute\b/);
    expect(tree).toContain("AccommodationRoute");
    expect(tree).not.toContain("'/destinations'");
    const server = readFileSync("src/server.ts", "utf8");
    expect(server).not.toContain("redirectRetiredDestinations");
  });
  it("keeps navigation, homepage, planning links and XML sitemap free of the removed URL", async () => {
    const nav = allNavGroups.flatMap(group => group.items.flatMap(item =>
      "to" in item ? [item.to, ...((item.children ?? []).map(child => child.to))] : []));
    expect(nav).not.toContain("/destinations/");
    expect(attractionPlanningPaths.some(item => String(item.to) === "/destinations/")).toBe(false);
    const home = readFileSync("src/routes/index.tsx", "utf8");
    expect(home).toContain('to="/accommodation/" className="btn btn-light mt-6">Explore all accommodation');
    expect(home).not.toContain('to="/destinations/"');
    expect(home).not.toContain('to="/hotels/"');
    expect(readFileSync("public/sitemap.xml", "utf8")).not.toContain("/destinations/");
    expect(readFileSync("public/sitemap.xml", "utf8")).not.toContain("/hotels/");
    expect(readFileSync("public/sitemap.xml", "utf8")).toContain("/accommodation/");
    expect(await collectSitemapPaths()).not.toContain("/destinations/");
  });
});
