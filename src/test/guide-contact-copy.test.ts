import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { guideContactCopy, type GuideContactKind } from "@/lib/guide-contact";

describe("contextual personal guide contact", () => {
  it("leaves subjects blank while keeping contextual descriptions for every guide theme", () => {
    const kinds: GuideContactKind[] = ["airport", "shabbat", "sherut", "transport", "attraction", "itinerary", "accommodation", "connectivity", "general"];
    const descriptions = new Set<string>();
    for (const kind of kinds) {
      const c = guideContactCopy("Test travel guide", kind, "Jerusalem");
      expect(c.subject).toBe("");
      expect(c.introduction).toMatch(/I'll reply personally/);
      expect(c.introduction).not.toMatch(/\bour team\b|\bwe recommend\b/i);
      expect(`${c.heading} ${c.introduction}`).toMatch(/private (?:transfer|airport|driver|journey|journeys|transport)|driver|day trip/i);
      expect(c.heading).not.toMatch(/have a question|ask me about|planning a trip|help planning/i);
      descriptions.add(c.introduction);
    }
    expect(descriptions.size).toBe(kinds.length);
  });
  it("allows readers to write their own itinerary enquiry subject", () => {
    const contact = guideContactCopy("Israel in 3 Days: A Realistic First-Time Itinerary", "itinerary");
    expect(contact.subject).toBe("");
    expect(contact.introduction).toMatch(/airport transfers|private journeys|driver/i);
    expect(contact.heading).toMatch(/private transport/i);
  });

  it("does not populate the subject even when a guide title is long", () => {
    expect(guideContactCopy("a".repeat(240), "general").subject).toBe("");
  });
});

describe("attraction contact introductions promote transport instead of generic visitor advice", () => {
  const pages = [
    "Akko", "Annunciation", "Caesarea", "Capernaum", "DeadSea", "Eilat", "EinGedi",
    "Haifa", "Jaffa", "Magdala", "Masada", "MountBeatitudes", "MountOlives",
    "MountPrecipice", "MountTabor", "MountZion", "OldCityJerusalem", "QasrElYahud",
    "RamonCrater", "RoshHanikra", "SeaOfGalilee", "Tabgha", "TelMegiddo",
    "ViaDolorosa", "Yardenit",
  ] as const;

  it.each(pages)("%s offers a private transfer or day trip with a driver", page => {
    const src = readFileSync(`src/components/${page}AttractionPage.tsx`, "utf8");
    const tree = ts.createSourceFile(page + ".tsx", src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const introductions: string[] = [];
    function visit(node: ts.Node) {
      if (ts.isPropertyAssignment(node) &&
          (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
          node.name.text === "contactIntroduction" &&
          ts.isStringLiteralLike(node.initializer)) {
        introductions.push(node.initializer.text);
      }
      ts.forEachChild(node, visit);
    }
    visit(tree);
    expect(introductions, page).toHaveLength(1);
    const contact = introductions[0];
    expect(contact, page).toBeTruthy();
    expect(contact, page).toMatch(/private (?:transfer|transport|driver|day trip|journey)|day trip with a driver|transport with a driver/i);
    expect(contact, page).not.toMatch(/general planning information|have a question about visiting/i);
  });

  it("keeps the dedicated inquiry templates focused on Moshe's private transport services", () => {
    const files = ["HomeContactForm", "TourCategoryPage", "TransferQuoteForm", "PrivateDriverQuoteForm", "ShoreQuoteForm"];
    for (const name of files) {
      const src = readFileSync(`src/components/${name}.tsx`, "utf8");
      expect(src, name).toMatch(/private (?:transfer|transport|driver|journey|ride|vehicle|day trip)|private airport|driver/i);
    }
    const tours = readFileSync("src/components/TourCategoryPage.tsx", "utf8");
    expect(tours).not.toContain("I can offer general planning information");
    expect(tours).toContain("I arrange private transfers and day trips with a driver");
  });
});
