import { describe, expect, it } from "vitest";
import { taxiGuideCluster } from "@/data/taxiGuideCluster";
import { guideDirectory, travelGuides } from "@/data/travelGuides";
import { travelGuidePaths } from "@/data/registry";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { photoIdentity } from "@/lib/photo-uniqueness";

describe("intent-specific taxi guide cluster", () => {
  it("keeps the legacy pillar route and registers both independent guide paths", () => {
    expect(travelGuidePaths.taxis).toBe("/travel-blog/taxis-in-israel/");
    expect(travelGuidePaths.taxiFares).toBe("/travel-blog/taxi-fares-in-israel/");
    expect(travelGuidePaths.airportTaxis).toBe("/travel-blog/ben-gurion-airport-taxis/");
    for (const id of ["taxis", "taxiFares", "airportTaxis"] as const) {
      expect(guideDirectory.some((guide) => guide.to === travelGuidePaths[id])).toBe(true);
      expect(travelGuides[id]).toBe(taxiGuideCluster[id]);
    }
  });

  it("assigns distinct primary intents and sources", () => {
    const { taxis, taxiFares, airportTaxis } = taxiGuideCluster;
    expect(taxis.title).toMatch(/Complete Guide for Tourists/);
    expect(taxis.sections.some((section) => section.id === "booking")).toBe(true);
    expect(taxiFares.sections.some((section) => section.id === "tariff-hours")).toBe(true);
    expect(taxiFares.sourceIds).toContain("taxi-fares-2026");
    expect(taxiFares.title).not.toMatch(/20\d{2}/);
    expect(taxiFares.sections.map((section) => section.id)).toEqual([
      "time-distance", "tariff-hours", "extras", "examples", "estimates", "disputes",
    ]);
    expect(taxiFares.sections.some((section) => (section.highlightedLinks?.length ?? 0) > 0)).toBe(true);
    expect(airportTaxis.sections.some((section) => section.id === "terminal3")).toBe(true);
    expect(airportTaxis.sourceIds).toContain("guide-gett");
    expect(taxis.sections.find((section) => section.id === "holidays")?.inlineLinks?.map((item) => item.to)).toContain("/travel-blog/calendar-of-events/");
  });

  it("uses surcharge terminology and keeps six distinct, photographed related guides", () => {
    const { taxiFares } = taxiGuideCluster;
    expect(taxiFares.title).toContain("Surcharges");
    const text = [
      taxiFares.title, taxiFares.description, taxiFares.intro, taxiFares.answer,
      ...taxiFares.sections.flatMap((section) => [
        section.title, ...section.paragraphs, ...(section.tables || []).flatMap((table) => [table.caption, ...table.headers, ...table.rows.flat()]),
      ]),
      ...taxiFares.faqs.map((faq) => faq.a),
    ].join(" ");
    expect(text).not.toMatch(/supplements?/i);
    expect(taxiFares.related).toEqual(["taxis", "airportTaxis", "uber", "sherut", "shabbat", "arrival"]);

    const cards = taxiFares.related.map((id) => ({
      guide: guideDirectory.find((candidate) => candidate.to === travelGuidePaths[id])!,
    }));
    expect(cards.every(({ guide }) => Boolean(guide?.photo))).toBe(true);
    const illustrated = uniqueGuideCardPhotos(cards, [taxiFares.photo.src]);
    expect(illustrated).toHaveLength(6);
    expect(illustrated.every((card) => Boolean(card.cardPhoto?.src))).toBe(true);
    expect(new Set(illustrated.map((card) => photoIdentity(card.cardPhoto!.src))).size).toBe(6);
  });

  it("keeps onward planning focused and the rental referral routed through the affiliate-aware link", () => {
    const services = taxiGuideCluster.taxiFares.services;
    expect(services.map((item) => item.to)).toEqual([
      "/airport-transfers/", "/private-driver-in-israel/", "/car-rental/", travelGuidePaths.israel,
    ]);
    expect(new Set(services.map((item) => item.to)).size).toBe(4);
    expect(services.every((item) => Boolean(item.note?.trim()))).toBe(true);
    expect(services.find((item) => item.to === "/car-rental/")?.label).toBe("Compare car rentals in Israel");
  });

  it("shows A/B/C consumer rates and never repeats the first ten kilometers", () => {
    const table = taxiGuideCluster.taxiFares.comparison;
    expect(table.rows).toContainEqual(["Starting amount", "₪12.46", "₪12.46", "₪12.46"]);
    expect(table.rows).toContainEqual(["Per kilometer — first 10 km", "₪1.95", "₪2.34", "₪2.73"]);
    expect(table.rows).toContainEqual(["Per kilometer — after 10 km", "₪3.79", "₪4.18", "₪4.57"]);
    const examples = taxiGuideCluster.taxiFares.sections.find((section) => section.id === "examples")!.paragraphs.join(" ");
    expect(examples).toContain("₪51.40");
    expect(examples).toContain("₪102.59");
    const after10 = taxiGuideCluster.taxiFares.sections.find((section) => section.id === "time-distance")!.paragraphs.join(" ");
    expect(after10).toContain("higher kilometre rate applies");
  });

  it("retains useful standalone answers and original images in the general taxi guide", () => {
    const guide = taxiGuideCluster.taxis;
    expect(guide.photo.src).toBe("/images/travel-blog/taxi-in-tel-aviv.webp");
    expect(guide.sections.find((s) => s.id === "fares")?.tables).toBeUndefined();
    expect(guide.sections.find((s) => s.id === "fares")?.paragraphs.join(" ")).toContain("₪12.46");
    expect(guide.sections.find((s) => s.id === "airport")?.paragraphs.join(" ")).toContain("Exit 23");
    expect(guide.sections.find((s) => s.id === "airport")?.paragraphs.join(" ")).toContain("Exit 03");
    expect(guide.sections.find((s) => s.id === "sherut")?.paragraphs.join(" ")).toContain("former regular airport shared-taxi services");
    expect(guide.sections.find((s) => s.id === "payment")?.paragraphs.join(" ")).toContain("luggage");
    expect(guide.sections.find((s) => s.id === "intercity")?.paragraphs.join(" ")).toContain("Mitzpe Ramon");
  });
  it("preserves the final editorial refinements and verified official help links", () => {
    const guide = taxiGuideCluster.taxis;
    expect(guide.updatedAt).toBe("2026-11-24");
    const apps = guide.sections.find((section) => section.id === "apps")!;
    expect(apps.externalLinks?.map((link) => link.href)).toEqual(["https://www.gett.com/il/", "https://appli.taxi/rider/"]);
    expect(guide.sections.find((section) => section.id === "airport")?.paragraphs.join(" ")).not.toContain("at least two hours");
    expect(guide.sections.find((section) => section.id === "airport")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.airportTaxis);
    expect(guide.sections.find((section) => section.id === "holidays")?.paragraphs.join(" ")).not.toContain("16:01");
    expect(guide.sections.find((section) => section.id === "holidays")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxiFares);
    expect(guide.sections.find((section) => section.id === "intercity")?.paragraphs.join(" ")).toContain("pedestrian crossing");
    expect(guide.sections.find((section) => section.id === "safety")?.externalLinks?.[0]?.href).toContain("complaint_about_conduct_in_public_transportation");
    expect(guide.services[0]?.label).toContain("Request a quote");
  });

  it("places airport destination and private-transfer links naturally inside one explanatory paragraph", () => {
    const airport = taxiGuideCluster.taxis.sections.find((section) => section.id === "airport")!;
    expect(airport.links).toBeUndefined();
    const paragraph = airport.paragraphs.at(-1)!;
    const contextualLinks = airport.inlineLinks!.slice(-5);
    expect(contextualLinks.map((link) => link.to)).toEqual([
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-haifa/",
      "/travel-blog/ben-gurion-airport-to-ein-bokek/",
      "/airport-transfers/",
    ]);
    for (const link of contextualLinks) expect(paragraph.split(link.text)).toHaveLength(2);
    expect(paragraph).toContain("To compare transport choices");
  });

  it("separates the three taxi guide intents without repeating full tariff and airport procedures", () => {
    const { taxis, taxiFares, airportTaxis } = taxiGuideCluster;
    expect(taxis.sections.find(s => s.id === "fares")?.tables).toBeUndefined();
    expect(taxis.sections.find(s => s.id === "holidays")?.paragraphs.join(" ")).not.toMatch(/16:01|21:01/);
    expect(taxis.sections.find(s => s.id === "airport")?.paragraphs.join(" ")).toContain("My airport taxi guide explains ride codes");
    expect(taxiFares.sections.find(s => s.id === "estimates")?.inlineLinks?.some(l => l.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(taxiFares.sections.find(s => s.id === "extras")?.highlightedLinks).toBeUndefined();
    expect(airportTaxis.sections.find(s => s.id === "fares")?.tables?.[0]?.headers).toEqual(["Destination", "Daytime meter estimate", "Typical drive"]);
    for (const id of ["taxis", "taxiFares", "airportTaxis"] as const) {
      expect(taxiGuideCluster[id].updatedAt).toBe("2026-11-24");
      expect(taxiGuideCluster[id].related).toHaveLength(6);
      expect(taxiGuideCluster[id].photo.src).toBeTruthy();
    }
  });

  it("differentiates Gett on-demand, scheduled and Terminal 1 pickup points", () => {
    const guide = taxiGuideCluster.airportTaxis;
    const rows = guide.comparison.rows;
    expect(rows.some((row) => row[0]?.includes("Immediate taxi · Terminal 3") && row[1]?.includes("Exit 03"))).toBe(true);
    expect(rows.some((row) => row[0]?.includes("Gett ride scheduled") && row[1]?.includes("Exit 23"))).toBe(true);
    expect(rows.some((row) => row[0]?.includes("Terminal 1") && row[1]?.includes("Main arrivals exit"))).toBe(true);
    expect(guide.sections.find((section) => section.id === "steps")!.paragraphs.join(" ")).toMatch(/taxis are assigned in the order passengers reach the queue/i);
    expect(guide.photo.src).toBe("/images/travel-blog/airport-taxi-sign.webp");
    expect(guide.photo.alt.toLowerCase()).toContain("taxi");
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.sections.flatMap((section) => section.photo ? [section.photo.src] : [])).not.toContain(guide.photo.src);
    expect(guide.related).toHaveLength(6);
    expect(guide.sections.find((section) => section.id === "fares")!.paragraphs.join(" ")).toContain("₪12.46");
  });

  it("provides context-specific links without a conflicting guide purpose", () => {
    expect(taxiGuideCluster.taxis.sections.find((section) => section.id === "fares")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxiFares);
    expect(taxiGuideCluster.taxis.sections.find((section) => section.id === "airport")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.airportTaxis);
    expect(taxiGuideCluster.taxiFares.sections.find((section) => section.id === "extras")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.airportTaxis);
    expect(taxiGuideCluster.airportTaxis.sections.find((section) => section.id === "fares")?.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxiFares);
    expect(taxiGuideCluster.airportTaxis.sections.find((section) => section.id === "weekend")?.inlineLinks?.some((link) => link.to === "/travel-blog/calendar-of-events/")).toBe(true);
  });
});
