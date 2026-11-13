import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GuideHeroMedia } from "@/components/GuideHeroMedia";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

afterEach(cleanup);

describe("shared guide hero layout", () => {
  it("uses a height-limited local cover image, useful alt text, and optional credits", () => {
    render(
      <GuideHeroMedia src="/images/jerusalem.webp" alt="View across Jerusalem" caption="Jerusalem from above">
        <p>Image credit</p>
      </GuideHeroMedia>
    );
    const photo = screen.getByRole("img", { name: "View across Jerusalem" });
    expect(photo).toHaveAttribute("src", "/images/jerusalem.webp");
    expect(photo).toHaveAttribute("fetchpriority", "high");
    expect(photo).toHaveClass("aspect-[16/9]", "max-h-[360px]", "w-full", "object-cover");
    expect(screen.getByText("Jerusalem from above")).toBeInTheDocument();
    expect(screen.getByText("Image credit")).toBeInTheDocument();
    expect(screen.getByTestId("guide-hero-media")).toHaveClass("max-w-4xl");
  });

  it("preserves the full subject in exceptional landmark photos", () => {
    render(<GuideHeroMedia src="/images/landmark.webp" alt="Historic building" fit="contain" />);
    expect(screen.getByRole("img", { name: "Historic building" })).toHaveClass("object-contain");
  });

  it("places the article headline and introduction before the shared image in all guide templates", () => {
    const paths = [
      "src/components/Guide.tsx",
      "src/components/TravelGuide.tsx",
      "src/components/AirportJourneyPage.tsx",
      "src/components/AirportRoutePage.tsx",
      "src/components/AttractionGuidePage.tsx",
      "src/components/IsraelItineraryPage.tsx",
      "src/components/PortPage.tsx",
      "src/components/TourCategoryPage.tsx",
    ];
    for (const path of paths) {
      const copy = source(path);
      expect(copy, path).toContain("<GuideHeroMedia");
      const titleStart = copy.indexOf("<h1");
      const heroStart = copy.indexOf("<GuideHeroMedia");
      expect(titleStart, path).toBeGreaterThan(-1);
      expect(heroStart, path).toBeGreaterThan(titleStart);
    }
  });

  it("preserves the homepage as a distinct photographic slideshow", () => {
    expect(source("src/components/HomeHero.tsx")).toContain("<HeroCarousel");
    expect(source("src/components/HomeHero.tsx")).not.toContain("GuideHeroMedia");
  });
});
