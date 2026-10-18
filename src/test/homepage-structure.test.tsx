import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { HomeTestimonials } from "@/components/HomeTestimonials";
import { serviceDomains, allNavGroups } from "@/data/nav";
import { customerTestimonials, tripadvisorReviews, tripadvisorProfileUrl, tripadvisorSnapshot } from "@/data/homeReviews";

describe("homepage navigation and review sources", () => {
  it("keeps six ordered primary entries and rental only in the sidebar", () => {
    expect(serviceDomains.map(x => x.label)).toEqual(["Airport transfers", "Tours & Day Trips", "Shore excursions", "Accommodation", "Attractions", "Travel guides"]);
    expect(serviceDomains.some(x => x.to === "/car-rental/" || x.to === "/tickets/")).toBe(false);
    const sidebar = allNavGroups.flatMap(group => group.items.filter(item => "to" in item));
    expect(sidebar.some(x => "to" in x && x.to === "/car-rental/")).toBe(true);
    expect(sidebar.some(x => "to" in x && x.to === "/tickets/")).toBe(false);
  });
  it("keeps credited review excerpts concise, balanced and linked to Tripadvisor", () => {
    expect(tripadvisorReviews).toHaveLength(3);
    const lengths = tripadvisorReviews.map(review => review.excerpt.split(/\s+/).length);
    expect(Math.max(...lengths) - Math.min(...lengths)).toBeLessThanOrEqual(5);
    expect(lengths.every(length => length >= 20 && length <= 25)).toBe(true);
    expect(customerTestimonials).toHaveLength(4);
    expect(customerTestimonials.every(review => review.photo.includes("/assets/testimonials/"))).toBe(true);
    expect(new Set(customerTestimonials.map(review => review.photo)).size).toBe(4);
    expect(tripadvisorSnapshot).toMatchObject({ rating: 5, reviewCount: 11 });
    expect(tripadvisorProfileUrl).toMatch(/^https:\/\/www\.tripadvisor\.com\//);
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
