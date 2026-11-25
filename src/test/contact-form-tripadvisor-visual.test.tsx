import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { QuoteFormIntro } from "@/components/QuoteFormIntro";
import { mosheBarakAuthor } from "@/data/registry";

afterEach(cleanup);

describe("personal inquiry intro matches the approved TripAdvisor layout", () => {
  it("keeps the reviews button next to the portrait and the personal message below on mobile, with the link also visible on desktop", () => {
    const view = render(
      <QuoteFormIntro
        headingId="form-intro-heading"
        eyebrow="Contact me"
        title="Request a private transfer"
        description="Tell me where and when you want to travel. I'll reply personally."
      />,
    );
    const intro = view.container.querySelector('[data-testid="quote-form-intro"]')!;
    const photo = intro.querySelector("img")!;
    const reviews = screen.getByRole("link", { name: /Read Reviews on TripAdvisor for Moshe Barak/ });
    expect(photo.getAttribute("alt")).toBeTruthy();
    expect(reviews).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
    expect(reviews).toHaveAttribute("target", "_blank");
    expect(intro).toHaveTextContent("Contact me");
    expect(intro).toHaveTextContent("I'll reply personally");
    expect(intro.querySelectorAll('a[href*="tripadvisor"]')).toHaveLength(1);
    expect(intro.className).toContain("grid-cols-[auto_minmax(0,1fr)]");
    expect(intro.className).toContain("sm:flex");
  });
});

describe("attraction contact panels share the approved mobile TripAdvisor layout", () => {
  const attractions = [
    "src/components/AttractionDestinationPage.tsx",
    "src/components/TelAvivAttractionsGuide.tsx",
    "src/components/DeadSeaAttractionsGuide.tsx",
    "src/components/TopTenIsraelGuide.tsx",
  ];

  it.each(attractions)("%s enables the photo-and-reviews row on mobile", path => {
    const source = readFileSync(path, "utf8");
    expect(source).toMatch(/<HomeContactForm\b[^>]*\bshowTripadvisorBesidePortraitMobile\b/);
  });

  it("keeps the shared contact description below the photo and reviews, without forcing desktop nowrap", () => {
    const source = readFileSync("src/components/HomeContactForm.tsx", "utf8");
    expect(source).toContain('showTripadvisorBesidePortraitMobile ? "flex-nowrap md:flex-wrap" : "flex-wrap"');
    const rowAt = source.indexOf('data-testid="contact-reviews-row"');
    const reviewsAt = source.indexOf('data-testid="contact-tripadvisor-reviews"');
    const textAt = source.indexOf('{guide?.introduction');
    expect(rowAt).toBeGreaterThanOrEqual(0);
    expect(reviewsAt).toBeGreaterThan(rowAt);
    expect(textAt).toBeGreaterThan(reviewsAt);
    expect(source).toContain("<TripadvisorReviewsButton />");
  });
});

describe("all travel-guide contact layouts", () => {
  const sharedGuideComponents = [
    "TravelGuide",
    "JordanRiverBaptismGuide",
    "ChristianToursGuide",
    "JerusalemChurchesGuide",
    "TelAvivBeachesGuide",
    "JerusalemCityHub",
    "HaifaMuseumsGuide",
    "JerusalemMuseumsGuide",
    "TelAvivMuseumsGuide",
    "JerusalemShoppingGuide",
    "HotelStyleEditorialGuide",
    "TiberiasHotelEditorialGuide",
    "CityNeighborhoodEditorial",
    "BestTimeIsraelGuide",
    "IsraelHolidayVisitorGuide",
    "SeniorToursGuide",
    "IsraelTravelTipsGuide",
    "IsraelFoodGuide",
    "StayEditorialGuidePage",
  ] as const;

  it.each(sharedGuideComponents)("%s places TripAdvisor reviews next to the portrait on mobile", component => {
    const source = readFileSync(`src/components/${component}.tsx`, "utf8");
    expect(source).toMatch(/<HomeContactForm\b[^>]*\bshowTripadvisorBesidePortraitMobile\b/);
  });

  it("adds the missing contact form to the Haifa hotels editorial page", () => {
    const route = readFileSync("src/routes/travel-blog.best-hotels-in-haifa.tsx", "utf8");
    const page = readFileSync("src/components/StayEditorialGuidePage.tsx", "utf8");
    expect(route).toContain('<StayEditorialGuidePage guide={g} id="haifa" />');
    expect(page).toContain('["contact", "Contact me"]');
    expect(page).toContain("HomeContactForm showTripadvisorBesidePortraitMobile");
    expect(page).toContain("Need a Private Transfer To or From");
    expect(page).toContain("I'll reply personally");
    expect(page).not.toContain("hotel advice");
  });

  it("keeps the reviews link on every airport journey's quote form", () => {
    const route = readFileSync("src/components/AirportJourneyPage.tsx", "utf8");
    const quote = readFileSync("src/components/TransferQuoteForm.tsx", "utf8");
    const intro = readFileSync("src/components/QuoteFormIntro.tsx", "utf8");
    expect(route).toContain("<TransferQuoteForm");
    expect(quote).toContain("showTripadvisorReviews");
    expect(intro).toContain("<TripadvisorReviewsButton />");
  });
});
