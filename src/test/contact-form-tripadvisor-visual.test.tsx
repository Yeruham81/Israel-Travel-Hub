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
    const reviews = screen.getByRole("link", { name: /Read traveler reviews on Tripadvisor for Moshe Barak/ });
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
