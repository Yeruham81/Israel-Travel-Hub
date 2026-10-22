import { describe, expect, it } from "vitest";
import { jerusalemAreaGuides, telAvivAreaGuides, hotelCategoryGuides } from "@/data/content";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { getShorePort } from "@/data/shoreExcursions";
import { areaArrivalSignals, areaDecisionNotes, categoryDecisionExamples, destinationBaseChoices } from "@/data/localEditorialInsights";

describe("round two original planning content", () => {
  it("covers all existing Jerusalem and Tel Aviv neighborhood guides without generic empty notes", () => {
    const areas = [...jerusalemAreaGuides, ...telAvivAreaGuides];
    expect(areas).toHaveLength(14);
    for (const area of areas) {
      const note = areaDecisionNotes[area.id]!;
      expect(note, area.id).toBeDefined();
      expect(note.heading.length, area.id).toBeGreaterThan(15);
      expect(note.choose.length, area.id).toBeGreaterThan(45);
      expect(note.compare.length, area.id).toBeGreaterThan(45);
      expect(note.arrival.length, area.id).toBeGreaterThan(45);
      expect(areaArrivalSignals[area.id]?.length, area.id).toBeGreaterThan(15);
    }
  });

  it("covers every destination's separate base-choice scenarios", () => {
    for (const id of ["deadsea", "tiberias", "haifa"] as const) {
      expect(destinationBaseChoices[id], id).toHaveLength(3);
      for (const choice of destinationBaseChoices[id]!) {
        expect(choice.visitor).toBeTruthy();
        expect(choice.base).toBeTruthy();
        expect(choice.reason.length).toBeGreaterThan(50);
      }
    }
  });

  it("has a separate concrete scenario for each existing focused hotel guide", () => {
    const focused = hotelCategoryGuides.filter((guide) => ["deadsea", "tiberias", "haifa"].includes(guide.destinationId));
    expect(focused).toHaveLength(6);
    for (const guide of focused) {
      const example = categoryDecisionExamples[`${guide.destinationId}:${guide.id}`]!;
      expect(example, guide.title).toBeDefined();
      expect(example.situation.length).toBeGreaterThan(40);
      expect(example.decision.length).toBeGreaterThan(50);
    }
  });

  it("keeps distinct train-to-hotel and private-transfer decisions by airport destination", () => {
    for (const id of ["jerusalem", "tel-aviv", "haifa", "ein-bokek"] as const) {
      const guide = airportJourneyGuides[id];
      expect(guide.exampleJourney.title).toBeTruthy();
      expect(guide.exampleJourney.steps).toHaveLength(3);
      expect(guide.exampleJourney.takeaway.length).toBeGreaterThan(55);
    }
  });

  it("gives both cruise ports their own access instructions and three route constraints", () => {
    for (const id of ["ashdod", "haifa"] as const) {
      const port = getShorePort(id);
      expect(port.portAccess.paragraphs).toHaveLength(2);
      expect(port.portAccess.source.url).toMatch(/^https:\/\/www\./);
      expect(port.routeFit).toHaveLength(3);
      for (const choice of port.routeFit) expect(choice.constraint.length).toBeGreaterThan(60);
    }
  });
});
