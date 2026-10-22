import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { travelGuides } from "@/data/travelGuides";

function source(path: string) {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("owner voice throughout the public site", () => {
  const coreEditorial = [
    "src/data/content.ts",
    "src/data/travelGuides.ts",
    "src/data/travelGuideExpansion.ts",
    "src/data/taxiGuideCluster.ts",
    "src/data/airportJourneyGuides.ts",
  ];

  it("uses first-person guide references rather than a fictitious editorial team", () => {
    for (const file of coreEditorial) {
      const copy = source(file);
      expect(copy, file).not.toMatch(/\bour (?:guide|guides|airport|private|fare|fares|accommodation|taxi|Israel|travel|car rental|Sherut|churches|events)/i);
      expect(copy, file).not.toMatch(/\bwe (?:recommend|offer|provide|may earn|do not show)/i);
    }
    expect(source("src/data/content.ts")).toContain("open on our dates?");
    expect(getAirportRouteGuide("jerusalem").intro).toContain("Send me your flight");
    expect(airportJourneyGuides["ein-bokek"].options.find(o => o.id === "rental")?.paragraphs.join(" ")).toContain("my car rental in Israel page");
  });

  it("keeps contextual link anchor phrases synchronized after first-person edits", () => {
    for (const guide of Object.values(travelGuides)) {
      for (const section of guide.sections) for (const link of section.inlineLinks || []) {
        expect(section.paragraphs.some(p => p.includes(link.text)), guide.id + ":" + link.text).toBe(true);
      }
    }
    for (const guide of Object.values(airportJourneyGuides)) {
      for (const option of guide.options) for (const link of option.inlineLinks || []) {
        expect(option.paragraphs.some(p => p.includes(link.text)), guide.id + ":" + link.text).toBe(true);
      }
    }
  });

  it("uses direct ownership in affiliate, contact and service copy", () => {
    for (const file of [
      "src/components/Layout.tsx",
      "src/components/StayGuideParts.tsx",
      "src/components/AirportBookingPlatforms.tsx",
      
      "src/components/TravelGuide.tsx",
    ]) {
      expect(source(file), file).toMatch(/earn me a commission/);
      expect(source(file), file).not.toMatch(/earn us a commission/);
    }
    expect(source("src/components/NeighborhoodStayPage.tsx")).toContain("I may earn a commission");
    expect(source("src/components/HomeContactForm.tsx")).toContain("Tell me how I can help");
    expect(source("src/routes/private-driver.tsx")).toContain("Tell me where you want to go");
    expect(source("src/routes/transfers.index.tsx")).toContain("Why arrange your airport pickup with me?");
    expect(source("src/routes/terms-of-use.tsx")).toContain("contact me at {email}");
    expect(source("src/components/AirportRoutePage.tsx")).toContain("I confirm the final total and availability.");
    expect(source("src/components/PortPage.tsx")).toContain("Plan your day from {port.name} with me");
  });
});
