import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { sacredHillEditorial, sacredHillOverrides } from "@/data/sacredHillGuides";
import { mountOlivesAttractionUpdate } from "@/data/mountOlivesRevision";

describe("Mount of Olives practical visitor revision", () => {
  const guide = sacredHillEditorial["mount-of-olives"];
  const attraction = sacredHillOverrides["mount-of-olives"];

  it("offers usable Old City connections from the upper lookout", () => {
    expect(guide.routes).toHaveLength(2);
    expect(guide.routes[0]?.steps.join(" ")).toMatch(/Seven Arches/);
    expect(guide.routes[0]?.steps.join(" ")).toMatch(/Lion's Gate/);
    expect(guide.routeIntro).toMatch(/Old City/);
    expect(guide.routes[1]?.steps.join(" ")).toMatch(/Pater Noster/);
  });

  it("distinguishes the bus stops and provides click-through travel planning", () => {
    const bus = guide.transport.find(mode => /bus/i.test(mode.title));
    expect(bus?.text).toMatch(/84/);
    expect(bus?.text).toMatch(/255/);
    expect(bus?.text).toMatch(/275/);
    expect(bus?.text).toMatch(/Seven Arches/);
    expect(bus?.links?.some(link => link.url.includes("moovitapp.com"))).toBe(true);
    expect(bus?.links?.some(link => link.url.includes("cityofdavid.org.il"))).toBe(true);
  });

  it("uses only project-local images with no external hotlinks", () => {
    expect(guide.stops).toHaveLength(8);
    const photos = guide.stops.flatMap(stop => stop.image ? [stop.image] : []);
    // Do not replace missing site-specific photographs with misleading generic pictures.
    expect(photos).toHaveLength(8);
    expect(photos.every(photo => Boolean(photo.alt))).toBe(true);
    expect(new Set(photos.map(photo => photo.src)).size).toBe(photos.length);
    for (const stop of guide.stops) {
      const src = stop.image!.src;
      // URL-based public assets have to exist in the local repository.
      if (src.startsWith("/images/")) {
        expect(existsSync(resolve(process.cwd(), "public", src.slice(1))), stop.name).toBe(true);
      }
    }
    const newlyImported: Record<string, string> = {
      "Pater Noster Church": "pater-noster.webp",
      "Chapel of the Ascension": "chapel-of-ascension.webp",
      "Dominus Flevit": "dominus-flevit.webp",
      "Church of St Mary Magdalene": "mary-magdalene-church.webp",
      "Tomb of the Virgin Mary": "tomb-of-virgin-mary.webp",
    };
    for (const [name, filename] of Object.entries(newlyImported)) {
      expect(guide.stops.find(stop => stop.name === name)?.image?.src)
        .toBe(`/images/jerusalem/mount-of-olives/${filename}`);
    }
    expect(new Set(guide.stops.map(stop => stop.tipLabel)).size).toBeGreaterThanOrEqual(5);
    const imageUrls = [attraction.image?.src, ...photos.map(photo => photo.src)];
    expect(imageUrls.every(src => typeof src === "string" && !/^https?:\/\//i.test(src))).toBe(true);
    expect(imageUrls.every(src => src?.startsWith("/"))).toBe(true);
  });

  it("uses a respectful pilgrimage voice without combative archaeology disclaimers", () => {
    const combined = [attraction.intro, attraction.takeaway, ...guide.history, ...guide.stops.flatMap(stop => [stop.description, stop.visit])].join(" ");
    expect(combined).not.toMatch(/not physical proof|should not be claimed|don't treat|not a guarantee|not proven/i);
    expect(combined).toMatch(/Gethsemane/);
    expect(mountOlivesAttractionUpdate.faqs).toHaveLength(7);
    expect(guide.transport).toHaveLength(3);
  });
});
