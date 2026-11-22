import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import { guideDirectory } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

const routes = [
  { key: "jerusalem", path: "/travel-blog/where-to-stay-in-jerusalem/" },
  { key: "telaviv", path: "/travel-blog/where-to-stay-in-tel-aviv/" },
] as const;

describe("Where to Stay card and page hero parity", () => {
  it.each(routes)("$path cards always display the page's actual main photograph", ({ key, path }) => {
    const hero = stayEditorialHeroPhotos[key];
    const directory = guideDirectory.find(entry => String(entry.to) === path);
    expect(directory?.photo).toEqual(hero);
    expect(guideHeroPhotoForPath(path)).toEqual(hero);
    const page = readFileSync("src/components/CityNeighborhoodEditorial.tsx", "utf8");
    expect(page).toContain("const hero = stayEditorialHeroPhotos[cityId]");
    const route = readFileSync("src/routes/travel-blog.where-to-stay-in-" + (key === "jerusalem" ? "jerusalem" : "tel-aviv") + ".tsx", "utf8");
    expect(route).toContain("hotelEditorialMeta(g,");
    expect(route).toContain("stayEditorialHeroPhotos." + key + ".src");
  });
});
