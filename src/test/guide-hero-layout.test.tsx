import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GuideHeroLayout, GuideHeroMedia, introFitsFourLines } from "@/components/GuideHeroMedia";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

afterEach(cleanup);

describe("shared guide hero layout", () => {
  it("keeps the title and introduction alongside a small photo on desktop", () => {
    render(
      <GuideHeroLayout image={
        <GuideHeroMedia src="/images/jerusalem.webp" alt="View across Jerusalem" caption="Jerusalem from above">
          <p>Image credit</p>
        </GuideHeroMedia>
      }>
        <h1>Travel to Jerusalem</h1>
        <p data-guide-intro>A practical guide for visitors.</p>
      </GuideHeroLayout>
    );
    const layout = screen.getByTestId("guide-hero-layout");
    const titleColumn = layout.children[0] as HTMLElement;
    const photoColumn = layout.children[1] as HTMLElement;
    expect(layout).toHaveClass("grid", "lg:grid-cols-[minmax(0,1.85fr)_minmax(0,0.9fr)]");
    expect(within(titleColumn).getByRole("heading", { level: 1 })).toHaveTextContent("Travel to Jerusalem");
    expect(within(titleColumn).getByText("A practical guide for visitors.")).toBeInTheDocument();
    expect(within(photoColumn).getByRole("img", { name: "View across Jerusalem" })).toBeInTheDocument();
    expect(screen.getByText("Jerusalem from above")).toBeInTheDocument();
    expect(screen.getByText("Image credit")).toBeInTheDocument();
    const photo = screen.getByRole("img", { name: "View across Jerusalem" });
    expect(photo).toHaveAttribute("fetchpriority", "high");
    expect(photo).toHaveClass("aspect-[16/9]", "lg:aspect-[4/3]", "max-h-[300px]", "lg:max-h-[260px]", "w-full", "object-cover");
    expect(screen.getByTestId("guide-hero-media")).toHaveClass("max-w-2xl", "lg:max-w-none");
  });

  it("enlarges the photo only when the complete introduction is four lines or fewer", () => {
    expect(introFitsFourLines(100, 25)).toBe(true);
    expect(introFitsFourLines(101, 25)).toBe(true); // fractional-pixel tolerance
    expect(introFitsFourLines(102, 25)).toBe(false);
    expect(introFitsFourLines(125, 25)).toBe(false);
    expect(introFitsFourLines(0, 25)).toBe(false);
    expect(introFitsFourLines(80, Number.NaN)).toBe(false);
    const css = source("src/styles.css");
    expect(css).toContain(".guide-hero-layout.guide-hero-photo-expanded");
    expect(css).toContain("minmax(0, 1.72fr) minmax(0, 1fr)");
    expect(source("src/components/GuideHeroMedia.tsx")).toContain('layout.classList.toggle(');
    expect(source("src/components/GuideHeroMedia.tsx")).not.toContain("line-clamp");
  });

  it("allows image-free guides to retain full headline width", () => {
    render(<GuideHeroLayout><h1>Guide without a photograph</h1></GuideHeroLayout>);
    const layout = screen.getByTestId("guide-hero-layout");
    expect(layout.children).toHaveLength(1);
    expect(layout.className).not.toContain("lg:grid-cols-");
  });

  it("preserves the whole subject in exceptional landmark images", () => {
    render(<GuideHeroMedia src="/images/landmark.webp" alt="Historic building" fit="contain" />);
    expect(screen.getByRole("img", { name: "Historic building" })).toHaveClass("object-contain");
  });

  it("uses the shared side-by-side cover in all image-bearing guide templates", () => {
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
      expect(copy, path).toContain("<GuideHeroLayout");
      expect(copy, path).toContain("<GuideHeroMedia");
      expect(copy, path).toContain("guide-page-title");
      expect(copy, path).toContain("data-guide-intro");
    }
  });

  it("preserves the homepage as an independent photographic slideshow", () => {
    expect(source("src/components/HomeHero.tsx")).toContain("<HeroCarousel");
    expect(source("src/components/HomeHero.tsx")).not.toContain("GuideHeroLayout");
  });
});
