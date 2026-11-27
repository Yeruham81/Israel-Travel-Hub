import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import {
  accommodationDestinations,
  cityStayGuides,
  neighborhoodGuidesForCity,
  hotelCategoryGuides,
  haifaStayGuide,
  tiberiasStayGuide,
  deadSeaStayGuide,
} from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";

describe("planning guides and accommodation hierarchy", () => {
  const pages = [
    ["jerusalem", "jerusalem", cityStayGuides.jerusalem],
    ["telaviv", "tel-aviv", cityStayGuides.telaviv],
    ["haifa", "haifa", haifaStayGuide],
    ["tiberias", "tiberias", tiberiasStayGuide],
    ["deadsea", "dead-sea", deadSeaStayGuide],
  ] as const;
  it("keeps the five information guides separate from five booking destinations", () => {
    expect(
      accommodationDestinations
        .filter((d) => d.id !== "eilat")
        .map((d) => ("to" in d ? d.to : null)),
    ).toEqual(pages.map((p) => "/accommodation/" + p[1] + "/"));
    for (const [id, slug, g] of pages) {
      expect(g.path).toBe("/accommodation/" + slug + "/");
      expect(accommodationEditorial[id].path).toMatch(/^\/travel-blog\//);
      expect(existsSync("src/routes/accommodation." + slug + ".index.tsx")).toBe(true);
    }
  });
  it("uses concise area and category slugs without a repeated hotels suffix", () => {
    const nested = [
      ...neighborhoodGuidesForCity("jerusalem"),
      ...neighborhoodGuidesForCity("telaviv"),
      ...hotelCategoryGuides,
    ];
    expect(nested).toHaveLength(20);
    for (const guide of nested) {
      expect(guide.path).toMatch(
        /^\/accommodation\/(jerusalem|tel-aviv|haifa|tiberias|dead-sea)\/[a-z0-9-]+\/$/,
      );
      expect(guide.path).not.toMatch(/-hotels\/$/);
      expect(
        existsSync(
          "src/routes/accommodation." +
            guide.path.slice("/accommodation/".length, -1).replaceAll("/", ".") +
            ".tsx",
        ),
      ).toBe(true);
    }
  });
  it("nests all neighborhoods and hotel categories under their destination", () => {
    for (const city of ["jerusalem", "telaviv"] as const)
      for (const area of neighborhoodGuidesForCity(city)) {
        expect(area.path).toMatch(/^\/accommodation\//);
        const hotels = hotelsForArea(area.id, city);
        if (hotels.length) {
          const b = linksForPage("stay-area-" + area.id).find(
            (x) => x.id === "hotel-" + hotels[0]!.id + "-expedia",
          );
          expect(b?.isAffiliate).toBe(true);
          expect(hotelAffiliateUrl(b!, "stay-area-" + area.id, hotels[0]!.id)).toContain("sub_id=");
        }
      }
    for (const guide of hotelCategoryGuides) expect(guide.path).toMatch(/^\/accommodation\//);
  });
});
