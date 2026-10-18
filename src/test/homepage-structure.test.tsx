import { describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { HomeTestimonials } from "@/components/HomeTestimonials";
import { serviceDomains, allNavGroups } from "@/data/nav";
import { customerTestimonials, tripadvisorReviews, tripadvisorProfileUrl, tripadvisorSnapshot } from "@/data/homeReviews";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("homepage navigation and review sources", () => {
  it("keeps six ordered primary entries and rental only in the sidebar", () => {
    expect(serviceDomains.map(x => x.label)).toEqual(["Airport transfers", "Tours & Day Trips", "Shore excursions", "Accommodation", "Attractions", "Travel guides"]);
    expect(serviceDomains.some(x => x.to === "/car-rental/" || x.to === "/tickets/")).toBe(false);
    const sidebar = allNavGroups.flatMap(group => group.items.filter(item => "to" in item));
    expect(sidebar.some(x => "to" in x && x.to === "/car-rental/")).toBe(true);
    expect(sidebar.some(x => "to" in x && x.to === "/tickets/")).toBe(false);
  });
  it("keeps credited review excerpts concise, balanced and linked to Tripadvisor", () => {
    expect(tripadvisorReviews).toHaveLength(6);
    const excerptLengths = tripadvisorReviews.filter((review) => "excerpt" in review).map(review => review.excerpt.split(/\s+/).length);
    expect(Math.max(...excerptLengths) - Math.min(...excerptLengths)).toBeLessThanOrEqual(6);
    expect(excerptLengths.every(length => length >= 27 && length <= 33)).toBe(true);
    expect(tripadvisorReviews.filter(review => "summary" in review)).toHaveLength(0);
    expect(new Set(tripadvisorReviews.map(review => review.author)).size).toBe(6);
    expect(customerTestimonials).toHaveLength(4);
    expect(customerTestimonials.every(review => review.photo.includes("/assets/testimonials/"))).toBe(true);
    expect(new Set(customerTestimonials.map(review => review.photo)).size).toBe(4);
    expect(tripadvisorSnapshot).toMatchObject({ rating: 5, reviewCount: 11 });
    expect(tripadvisorProfileUrl).toMatch(/^https:\/\/www\.tripadvisor\.com\//);
  });
  it("shows three Tripadvisor cards, rotates every six seconds and honors pause and navigation", () => {
    vi.useFakeTimers();
    render(<HomeTestimonials />);
    const cards = screen.getByTestId("tripadvisor-review-cards");
    expect(cards.querySelectorAll("article")).toHaveLength(3);
    expect(cards).toHaveTextContent("Kaye L");
    expect(cards).toHaveTextContent("Lilach T");
    expect(cards).toHaveTextContent("Janet");
    expect(screen.getByRole("heading", { name: "Kind words from satisfied travelers" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(6000));
    expect(cards).toHaveTextContent("Yaniv B");
    expect(cards).not.toHaveTextContent("Kaye L");

    fireEvent.click(screen.getByRole("button", { name: "Pause Tripadvisor reviews" }));
    act(() => vi.advanceTimersByTime(18000));
    expect(cards).not.toHaveTextContent("Marc");

    fireEvent.click(screen.getByRole("button", { name: "Next Tripadvisor reviews" }));
    expect(cards).toHaveTextContent("Marc");
    fireEvent.click(screen.getByRole("button", { name: "Previous Tripadvisor reviews" }));
    expect(cards).toHaveTextContent("Yaniv B");

    fireEvent.click(screen.getByRole("button", { name: "Play Tripadvisor reviews" }));
    act(() => vi.advanceTimersByTime(6000));
    expect(cards).toHaveTextContent("Marc");
  });

  it("renders the correct uploaded image for every client and changes images with the carousel", () => {
    render(<HomeTestimonials />);
    for (const client of customerTestimonials) {
      fireEvent.click(screen.getByRole("button", { name: "Show testimonial from " + client.author }));
      const carousel = screen.getByTestId("original-testimonial-carousel");
      const photo = carousel.querySelector("img");
      expect(photo).toHaveAttribute("src", client.photo);
      expect(photo).toHaveAttribute("alt", "Photo featured alongside the testimonial from " + client.author);
      expect(carousel).toHaveTextContent(client.author);
      expect(carousel).toHaveTextContent(client.quote);
    }
    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByTestId("original-testimonial-carousel").querySelector("img")).toHaveAttribute("src", customerTestimonials[0]!.photo);
  });

});
