import { readFileSync, readdirSync } from "node:fs";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PhotoCreditsDisclosure, photoCreditEntries } from "@/components/PhotoCreditsDisclosure";

afterEach(cleanup);

describe("page photo attribution policy", () => {
  const credit = {
    label: "City view",
    credit: "Photographer · CC BY-SA 4.0; resized",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  };

  it("renders one initially collapsed list with intact attribution and no nested disclosures", () => {
    const { container } = render(<PhotoCreditsDisclosure entries={[credit, credit]} />);
    const disclosure = screen.getByTestId("page-photo-credits");
    expect(container.querySelectorAll("details")).toHaveLength(1);
    expect(disclosure).not.toHaveAttribute("open");
    expect(disclosure.querySelectorAll("details")).toHaveLength(0);
    expect(disclosure.querySelectorAll("li")).toHaveLength(1);
    expect(disclosure).toHaveTextContent(credit.credit);
    expect(within(disclosure).getByText("Photo source")).toHaveAttribute("href", credit.sourceUrl);
    expect(within(disclosure).getByText("Licence")).toHaveAttribute("href", credit.licenseUrl);
  });

  it("omits an empty disclosure and filters photos without public attribution", () => {
    const entries = photoCreditEntries([{ src: "/local.webp", alt: "Local illustration" }]);
    const { container } = render(<PhotoCreditsDisclosure entries={entries} />);
    expect(container.querySelector("details")).toBeNull();
  });

  it("keeps credit disclosures out of individual photos and source lists", () => {
    for (const dir of ["src/components", "src/routes"]) {
      for (const name of readdirSync(dir).filter((name) => name.endsWith(".tsx"))) {
        if (name === "PhotoCreditsDisclosure.tsx") continue;
        const file = dir + "/" + name;
        const source = readFileSync(file, "utf8");
        expect(source, file).not.toMatch(/<GuidePhotoCredit\b/);
        expect(source, file).not.toMatch(/<summary\b[^>]*>\s*(?:Guide image credits|Image credits|Photo credits|Illustrative photo credits)/i);
        for (const block of source.matchAll(/<SourcesDisclosure\b[^>]*>[\s\S]*?<\/SourcesDisclosure>/g)) {
          expect(block[0], file).not.toMatch(/<PhotoCreditsDisclosure\b|commons\.wikimedia\.org\/wiki\/File:|creativecommons\.org\/licenses\//i);
        }
      }
    }
  });

  it("places the migrated guide credit blocks after sources", () => {
    for (const name of [
      "ChristianToursGuide",
      "DeadSeaAttractionsGuide",
      "HaifaMuseumsGuide",
      "TelAvivAttractionsGuide",
      "TelAvivMuseumsGuide",
      "IsraelItineraryPage",
      "AttractionDestinationPage",
    ]) {
      const source = readFileSync("src/components/" + name + ".tsx", "utf8");
      expect(source.indexOf("<PhotoCreditsDisclosure"), name).toBeGreaterThan(source.lastIndexOf("</SourcesDisclosure>"));
      expect(source.match(/<PhotoCreditsDisclosure\b/g), name).toHaveLength(1);
    }
  });
});
