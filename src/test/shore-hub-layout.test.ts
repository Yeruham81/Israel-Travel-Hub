import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { shoreHubExperiences, shoreHubFaqs, shorePlanningSteps, shoreTourFormats } from "@/data/shoreHub";
import { shoreHubGuides } from "@/data/shoreReading";

const page = readFileSync(resolve(process.cwd(), "src/routes/shore-excursions.index.tsx"), "utf-8");

describe("compact shore excursions hub", () => {
  it("matches the concise gateway structure of tours and airport transfers", () => {
    expect(page).toContain("<HubHeader");
    expect(page).toContain("image={<GuideHeroMedia");
    expect(page).toContain("checkedAt={SHORE_EXCURSION_UPDATED_DATE}");
    expect(page).toContain('className="mt-8 scroll-mt-24"');
    expect(page).toContain("Choose your cruise port");
    expect(page).toContain("Popular shore excursion routes");
    expect(page).toContain("Private driver or guided excursion?");
    expect(page).toContain("Before booking your shore excursion");
    expect(page).toContain("<FaqList faqs={shoreHubFaqs} compact />");
    expect(page).not.toContain("<OnThisPage");
    expect(page).not.toContain("Small details that make a better day ashore");
  });

  it("keeps two equal port actions, direct port cards and destination-filtered links", () => {
    expect(page).toContain("Excursions from Ashdod");
    expect(page).toContain("Excursions from Haifa");
    expect(page).toContain("sm:min-w-48");
    expect(page).toContain("portIds.map(id =>");
    expect(page).toContain("getShorePort(id)");
    expect(page).toContain("search={{ destination: link.destination }}");
    expect(page).toContain('hash="request-quote"');
    expect(page).toContain('aria-label="Cruise port excursion guides"');
  });

  it("retains even card grids, related guides, factual FAQs and source citations", () => {
    expect(shoreHubExperiences).toHaveLength(4);
    expect(shoreTourFormats).toHaveLength(2);
    expect(shorePlanningSteps).toHaveLength(4);
    expect(shoreHubGuides).toHaveLength(6);
    expect(page).toContain("icon: Sun");
    expect(page).toContain("icon: CarFront");
    expect(page).toContain("Plan your trip to Israel");
    expect(page).toContain("Read more");
    expect(page).toContain("Read guide");
    expect(page).not.toContain("travelGuides.bestTime");
    expect(page).toContain("Discover Israel's main attractions");
    expect(page).not.toContain("Pickup arrangements differ:");
    expect(page).not.toContain("Ashdod is a useful starting point");
    expect(shoreHubExperiences.every(experience => new Set(experience.links.map(link => link.portId)).size === experience.links.length)).toBe(true);
    expect(shoreHubFaqs.length).toBeGreaterThanOrEqual(6);
    expect(page).toContain("shoreHubExperiences.map");
    expect(page).toContain("shoreTourFormats.map");
    expect(page).toContain("shorePlanningSteps.map");
    expect(page).toContain("shoreHubGuides.map");
    expect(page).toContain("SourceList");
    expect(page.indexOf("<SourceList")).toBeGreaterThan(page.indexOf("Photo credits"));
    expect(page).toContain("GuidePhotoCredit");
    expect(page).toContain("jsonLd({");
    expect(page).toContain('path: "/shore-excursions/"');
    expect(page).toContain('className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"');
  });
});
