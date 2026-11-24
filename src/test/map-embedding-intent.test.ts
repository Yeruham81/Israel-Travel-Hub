import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Map embeds show locations; directions are optional outbound actions for real journeys. */
describe("map embedding intent across attraction and travel guides", () => {
  it("uses location embeds rather than Google Maps turn-by-turn route embeds", () => {
    const pages = ["src/components", "src/routes"].flatMap((directory) =>
      readdirSync(directory).filter((name) => name.endsWith(".tsx")).map((name) => join(directory, name)),
    );
    expect(pages.length).toBeGreaterThan(35);

    for (const file of pages) {
      const page = readFileSync(file, "utf8");
      expect(page, file).not.toMatch(/maps\.google\.com\/maps\?saddr=|google\.com\/maps\/embed\/v1\/directions/i);
      // Check each actual iframe source, rather than banning useful outbound Directions links.
      for (const frame of page.matchAll(/<(?:iframe|ConsentIframe)\b[\s\S]*?\bsrc\s*=\s*(?:"[^"]*"|\{[^}]*\})/g)) {
        expect(frame[0], file).not.toMatch(/(?:maps\/dir|saddr=|daddr=|travelmode=driving|travelmode=walking)/i);
      }
    }
  });

  it("keeps each overview map point-only without drawn route lines", () => {
    const mapFiles = readdirSync("public/maps").filter((name) => name.endsWith(".html"));
    expect(mapFiles.length).toBeGreaterThanOrEqual(11);
    expect(mapFiles).toContain("mount-of-olives.html");
    for (const name of mapFiles) {
      const html = readFileSync(join("public/maps", name), "utf8");
      expect(html, name).not.toMatch(/\bLineString\b|\btype\s*:\s*["']line["']|["']line-color["']|DirectionsRenderer|Routing\.control\(/i);
      expect(html, name).toContain("maplibregl.");
    }
  });

  it("shows both baptism sites as independent pins but keeps useful outward navigation", () => {
    const baptism = readFileSync("src/components/JordanRiverBaptismGuide.tsx", "utf8");
    expect(baptism).toContain('waypoints: JSON.stringify(baptismMapLocations)');
    expect(baptism).toContain('pinMode: "locations"');
    expect(baptism).toContain('Map showing Yardenit and Qasr el-Yahud as two locations');
    expect(baptism).toContain("Directions to Yardenit");

    const jaffa = readFileSync("src/components/JaffaAttractionPage.tsx", "utf8");
    expect(jaffa).toContain("Open short walking route in Google Maps");
    expect(jaffa).toContain("Open half-day walking route in Google Maps");

    const christian = readFileSync("src/components/ChristianToursGuide.tsx", "utf8");
    expect(christian).toContain('https://www.google.com/maps/dir/?');
  });
});
