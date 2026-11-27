import { sourceFragment } from "@/test-utils/source-fragment";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("src/components/MountZionMap.tsx", "utf8");
const mapPage = readFileSync("public/maps/mount-zion.html", "utf8");

describe("Mount Zion map with all seven pins", () => {
  it("loads one interactive map for all sites and keeps the overview visible", () => {
    expect(component).toMatch(sourceFragment('const mapUrl = "/maps/mount-zion.html?points="'));
    expect(component).toMatch(sourceFragment("JSON.stringify(points)"));
    expect(component).toMatch(sourceFragment('onClick={() => send("all")}'));
    expect(component).toMatch(sourceFragment('type: "mount-zion-map-focus"'));
    expect(component).toMatch(sourceFragment('type !== "mount-zion-map-selected"'));
    expect(component).not.toContain("googleEmbed");
    expect(component).not.toMatch(sourceFragment("key={selected"));
    expect(mapPage).toContain("new maplibregl.Map");
    expect(mapPage).toContain("new maplibregl.Marker");
    expect(mapPage).toContain("points.forEach");
    expect(mapPage).toContain("allVisible()");
    expect(mapPage).toContain('id==="all"');
    expect(mapPage).toContain('type:"mount-zion-map-selected"');
  });

  it("shows seven numbered places, with distinct central and lower areas", () => {
    const ids = ["zion-gate", "dormition", "cenacle", "david-tomb", "holocaust", "gallicantu", "schindler"];
    const listed = [...component.matchAll(/\{\s*id:\s*"([^"]+)",\s*name:/g)].map(match => match[1]);
    expect(listed).toEqual(ids);
    for (const id of ids) expect(mapPage).toContain(id);
    expect(mapPage).toContain("points.length!==7");
    expect(component).toMatch(sourceFragment('area: "gate"'));
    expect(component).toMatch(sourceFragment('area: "central"'));
    expect(component).toMatch(sourceFragment('area: "lower"'));
    expect(mapPage).toContain('point.id==="david-tomb"');
    expect(mapPage).toContain('point.id==="cenacle"');
  });

  it("preserves individual Google Maps links and avoids drawing a route", () => {
    expect(component).toContain("www.google.com/maps/search");
    expect(mapPage).toContain("www.google.com/maps/search");
    expect(mapPage).not.toContain("travelmode=driving");
    expect(mapPage).not.toContain('addLayer({id:"walking-route"');
  });
});
