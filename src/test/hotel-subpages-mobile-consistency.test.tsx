import "@/test/consent-fixture";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { jerusalemAreaGuides, telAvivAreaGuides, hotelCategoryGuides, haifaStayGuide, tiberiasStayGuide, deadSeaStayGuide, neighborhoodGuidesForCity } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { hotelsForArea } from "@/data/registry";
import { mosheBarakAuthor } from "@/data/site-identity";
import { airportTransferPhotos } from "@/data/airportTransfers";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ to, hash, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string; children?: ReactNode }) =>
      <a href={hash ? to + "#" + hash : to} {...props}>{children}</a>,
  };
});
afterEach(cleanup);

function assertMobileReviewsPanel(container: HTMLElement) {
  const contact = container.querySelector("#contact") as HTMLElement;
  expect(contact).toBeInTheDocument();
  const reviewsRow = within(contact).getByTestId("contact-reviews-row");
  expect(reviewsRow).toHaveClass("flex", "flex-nowrap", "md:flex-wrap");
  const portrait = reviewsRow.querySelector('img[data-photo-role="contact-portrait"]');
  expect(portrait).toHaveAttribute("src", airportTransferPhotos.moshe.src);
  expect(portrait).toHaveAttribute("alt", airportTransferPhotos.moshe.alt);
  const reviews = within(reviewsRow).getByRole("link", { name: /Read Reviews on.*TripAdvisor/i });
  expect(reviews).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
  expect(reviews).toHaveClass("bg-[#34E0A1]");
  expect(contact).toHaveTextContent(/private transfer|private driver|private journey/i);
}

const allAreas = [...jerusalemAreaGuides, ...telAvivAreaGuides];

describe.each(allAreas)("Neighborhood subpage: $name", (area) => {
  it("has the approved mobile portrait/reviews layout, 5 local/nearby hotel choices and six consistent related cards", () => {
    const { container } = render(<NeighborhoodStayPage area={area} />);
    assertMobileReviewsPanel(container);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(area.title);
    expect(container.querySelector("#book")).toBeInTheDocument();
    expect(container.querySelector("#overview")).toBeInTheDocument();
    expect(container.querySelector("#area-guide")).toBeInTheDocument();
    expect(container.querySelector("#location")).toBeInTheDocument();
    expect(container.querySelector("#book")!.compareDocumentPosition(container.querySelector("#overview")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const hotelGrid = within(container.querySelector("#book") as HTMLElement).getByTestId("neighborhood-hotel-grid");
    expect(hotelGrid).toHaveClass("min-[360px]:grid-cols-2", "xl:grid-cols-3");
    const hotels = within(hotelGrid).getAllByTestId("hotel-recommendation");
    expect(hotels).toHaveLength(5);
    const local = hotelsForArea(area.id, area.cityId);
    expect(hotels.slice(0, local.length).map((card) => card.querySelector("h3")?.textContent)).toEqual(local.map((hotel) => hotel.name));
    if (area.cityId === "telaviv") {
      expect(local).toHaveLength(4);
      expect(hotels[4]).toHaveTextContent("Nearby ·");
    } else {
      expect(local).toHaveLength(5);
    }
    const relatedGrid = within(container.querySelector("#other-areas") as HTMLElement).getByTestId("related-neighborhood-grid");
    expect(relatedGrid).toHaveClass("grid-cols-2", "lg:grid-cols-3");
    const links = within(relatedGrid).getAllByRole("link");
    expect(links).toHaveLength(6);
    expect(new Set(links.map((link) => link.getAttribute("href"))).size).toBe(6);
    const city = area.cityId === "jerusalem" ? "/accommodation/jerusalem/" : "/accommodation/tel-aviv/";
    expect(links[5]).toHaveAttribute("href", city);
    const siblings = neighborhoodGuidesForCity(area.cityId);
    for (const link of links.slice(0, 5)) {
      const target = siblings.find((item) => item.path === link.getAttribute("href"));
      expect(target).toBeDefined();
      expect(target!.id).not.toBe(area.id);
      expect(link.querySelector("img")).toHaveAttribute("src", target!.photo.src);
      expect(link.querySelector("img")).toHaveAttribute("alt", target!.photo.alt);
      expect(link).not.toHaveTextContent(/Explore this page|Read more/i);
      expect(link.querySelector("svg")).toBeNull();
    }
    expect(container.querySelector('a[href="' + city + '"]')).toBeInTheDocument();
  });
});

const destinations = [haifaStayGuide, tiberiasStayGuide, deadSeaStayGuide];

describe.each(hotelCategoryGuides)("Hotel category subpage: $title", (category) => {
  const destination = destinations.find((guide) => guide.id === category.destinationId)!;
  it("leads from search-intent comparison to ordered hotel picks and focused details, with the same mobile reviews panel", () => {
    const { container } = render(<HotelCategoryPage guide={category} destination={destination} />);
    assertMobileReviewsPanel(container);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(category.title);
    expect(category.title).not.toBe(destination.title);
    expect(category.metaDescription).not.toBe(destination.metaDescription);
    const table = container.querySelector("#compare table") as HTMLElement;
    expect(table).toBeInTheDocument();
    expect(within(table).getAllByTestId("stay-comparison-row")).toHaveLength(category.picks.length);
    const cards = within(container.querySelector("#book") as HTMLElement).getAllByTestId("hotel-recommendation");
    expect(cards.map((card) => card.id)).toEqual(category.picks.map((pick) => "hotel-" + pick.hotelId));
    expect(new Set(cards.map((card) => card.id)).size).toBe(cards.length);
    expect(container.querySelector("#overview")!.compareDocumentPosition(container.querySelector("#compare")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("#compare")!.compareDocumentPosition(container.querySelector("#book")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("#book")!.compareDocumentPosition(container.querySelector("#details")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const editorialPath = accommodationEditorial[category.destinationId as "haifa" | "tiberias" | "deadsea"].path;
    expect(container.querySelector('a[href="' + destination.path + '"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="' + editorialPath + '"]')).toBeInTheDocument();
    const relatedCards = screen.getByTestId("stay-trip-planning");
    expect(within(relatedCards).getByTestId("stay-local-photo-grid").querySelectorAll("a")).toHaveLength(6);
    expect(within(relatedCards).getByTestId("stay-trip-photo-grid").querySelectorAll("a")).toHaveLength(6);
  });
});
