import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { churchAreas, jerusalemChurches } from "@/data/jerusalemChurches";
import { affiliateConfig } from "@/data/registry";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

describe("Jerusalem churches editorial guide", () => {
  it("covers twenty distinct sites grouped across four church-visiting areas", () => {
    expect(jerusalemChurches).toHaveLength(20);
    expect(churchAreas.map(a => a.id)).toEqual(["old", "olives", "zion", "karem"]);
    expect(new Set(jerusalemChurches.map(c => c.id)).size).toBe(20);
    expect(jerusalemChurches.filter(c => c.feature).length).toBeGreaterThanOrEqual(4);
    for (const church of jerusalemChurches) {
      expect(church.photoAlt.length,church.id).toBeGreaterThan(16);
      if(church.officialUrl)expect(church.officialUrl).toMatch(/^https:\/\//);
      expect(churchAreas.some(a => a.id === church.area), church.id).toBe(true);
      expect(church.description.length, church.id).toBeGreaterThan(40);
      expect(church.tradition, church.id).toBeTruthy();
      expect(church.hours, church.id).toBeTruthy();
      expect(church.admission, church.id).toBeTruthy();
      expect(church.tip, church.id).toBeTruthy();
    }
  });
  it("uses bounded coordinates and only real locally hosted site images", () => {
    const photos = jerusalemChurches.filter(c => c.photo);
    expect(photos).toHaveLength(20);
    const used = new Set<string>();
    for (const c of jerusalemChurches) {
      expect(c.lat, c.id).toBeGreaterThan(31.7);
      expect(c.lat, c.id).toBeLessThan(31.85);
      expect(c.lon, c.id).toBeGreaterThan(35.14);
      expect(c.lon, c.id).toBeLessThan(35.28);
      if (c.photo) {
        expect(c.photo, c.id).toMatch(/^\/images\//);
        expect(existsSync("public" + c.photo), c.id).toBe(true);
        expect(used.has(c.photo), c.id).toBe(false);
        used.add(c.photo);
      }
    }
  });
  it("qualifies access arrangements and separates non-church heritage sites", () => {
    const cenacle = jerusalemChurches.find(c => c.id === "cenacle")!;
    expect(cenacle.tradition).toContain("not an active church");
    expect(jerusalemChurches.find(c => c.id === "pater-noster")?.hours).toContain("Temporary");
    expect(jerusalemChurches.find(c => c.id === "st-james")?.tip).toContain("worship");
    expect(jerusalemChurches.find(c => c.id === "mary-tomb")?.tip).toContain("staircase");
    expect(jerusalemChurches.find(c => c.id === "dormition")?.hours).toContain("Sun 11:30–17:00");
    expect(jerusalemChurches.find(c => c.id === "gallicantu")?.tip).toContain("accessible itinerary");
    expect(jerusalemChurches.filter(c => c.officialUrl).length).toBeGreaterThanOrEqual(14);
  });
  it("has map focus, accurate related-page photos and centrally registered affiliate links", () => {
    const component = readFileSync("src/components/JerusalemChurchesGuide.tsx", "utf8");
    const map = readFileSync("public/maps/jerusalem-churches.html", "utf8");
    expect(component).toContain("jerusalem-church-map-focus");
    expect(component).toContain("jerusalem-church-map-selected");
    expect(map).toContain("churches.length !== 20");
    expect(map).toContain("areaColors");
    expect(map).toContain("jerusalem-church-map-selected");
    expect(map).toContain("destination=");
    expect(component).toContain("aspect-[16/9] w-full bg-secondary/20 object-contain");
    expect(component).toContain("h-[390px] w-full border-0");
    expect(component).toContain("church.photoAlt");
    expect(component).toContain("church.officialUrl");
    expect(component).toContain("guideHeroPhotoForPath(item.to)");
    expect(component).toContain('data-church-card="horizontal"');
    expect(component).toContain("lg:grid-cols-[minmax(0,1fr)_270px]");
    expect(component).toContain("lg:col-start-2 lg:row-start-1");
    expect(component).toContain("lg:col-start-1 lg:row-start-1");
    expect(component).toContain('className="mt-5 grid gap-5"');
    expect(component).not.toContain('className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"');
    expect(component).not.toContain('url:"https://viator.tpm.li');
    expect(component).not.toContain('url:"https://getyourguide.tpm.li');
    for (const key of [
      "churches-jerusalem-old-city-walk-viator",
      "churches-jerusalem-private-oldcity-viator",
      "churches-jerusalem-bethlehem-halfday-gyg",
    ]) {
      expect(affiliateConfig[key]?.trackingUrl).toMatch(/^https:\/\//);
      expect(affiliateConfig[key]?.trackingUrl).toContain("sub_id=churches_jerusalem_");
    }
    for (const path of [
      "/attractions/old-city-jerusalem/", "/attractions/mount-of-olives/",
      "/attractions/mount-zion/", "/travel-blog/jerusalem-to-bethlehem/",
      "/travel-blog/jerusalem-travel-guide/", "/travel-blog/calendar-of-events/",
    ]) expect(guideHeroPhotoForPath(path)?.src, path).toBeTruthy();
  });
});
