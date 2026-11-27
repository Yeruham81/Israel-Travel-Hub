import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { photoCredits } from "@/data/photoCredits";
import {
  airportTransferRates,
  airportTransferRoutes,
  getSource,
  isPublisherUrl,
  linksForPage,
  publicSources,
  sources,
} from "@/data/registry";

describe("external references and private transfer route migration", () => {
  it("publishes only independent websites as external sources", () => {
    expect(sources.length).toBeGreaterThan(50);
    for (const source of sources) {
      expect(source.url, source.id).toMatch(/^https:\/\//);
      expect(isPublisherUrl(source.url), source.id).toBe(false);
    }
    const firstPartyIds = [
      "moshe-author-profile",
      "moshe-airport-transfers",
      "owner-route-guide",
      "owner-airport-tel-aviv",
      "owner-airport-haifa",
      "owner-airport-ein-bokek",
      "owner-hotels-deadsea",
      "owner-hotels-haifa",
      "owner-stay-jerusalem",
      "owner-stay-telaviv",
      "owner-hotels-tiberias",
      "owner-private-driver",
      "owner-ashdod-shore",
      "owner-haifa-shore",
    ];
    for (const id of firstPartyIds) {
      expect(getSource(id)?.url, id).toBe("");
      expect(publicSources([id]), id).toEqual([]);
    }
    expect(publicSources(["iaa-directions", "moshe-airport-transfers"]).map((s) => s.id)).toEqual([
      "iaa-directions",
    ]);
  });

  it("does not cite local images as external source links", () => {
    for (const [id, photo] of Object.entries(airportTransferPhotos)) {
      expect(isPublisherUrl(photo.sourceUrl), id).toBe(false);
    }
    for (const photo of photoCredits) {
      expect(isPublisherUrl(photo.sourceUrl), photo.asset).toBe(false);
    }
  });

  it("keeps four clean service URLs without changing 20 tracked platform offers", () => {
    expect(airportTransferRoutes.map((route) => route.path)).toEqual([
      "/airport-transfers/jerusalem/",
      "/airport-transfers/tel-aviv/",
      "/airport-transfers/haifa/",
      "/airport-transfers/ein-bokek/",
    ]);
    expect(
      airportTransferRates.every((rate) => rate.price.sourceId === "moshe-airport-transfers"),
    ).toBe(true);
    const pageIds = [
      "airport-private-transfers",
      ...airportTransferRoutes.map((route) => "airport-route-" + route.id),
    ];
    const urls = pageIds.flatMap((id) =>
      linksForPage(id).map((link) => {
        expect(link.isAffiliate).toBe(true);
        expect(link.url).toMatch(/^https:\/\//);
        return link.url;
      }),
    );
    expect(urls).toHaveLength(20);
    expect(new Set(urls).size).toBe(20);
  });
  it("has no stale private-transfer path literals in app code or old-domain photo source links", () => {
    const scan = (directory: string): string[] =>
      readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        if (entry.isDirectory())
          return entry.name === "test" || entry.name === "generated" ? [] : scan(path);
        return /\.tsx?$/.test(entry.name) && entry.name !== "routeTree.gen.ts" ? [path] : [];
      });
    for (const path of scan("src")) {
      const content = readFileSync(path, "utf8");
      expect(content.includes("/airport-transfers/ben-gurion-airport-to-"), path).toBe(false);
      if (path.startsWith(join("src", "data"))) {
        expect(content, path).not.toMatch(
          /(?:sourceUrl|url)["']?\s*:\s*["']https:\/\/(?:www\.)?israel-taxi\.com\//,
        );
      }
    }
  });
});
