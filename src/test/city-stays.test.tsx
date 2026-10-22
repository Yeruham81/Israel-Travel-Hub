import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CityStayPage } from "@/components/CityStayPage";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { cityStayGuides, jerusalemAreaGuides, telAvivAreaGuides, neighborhoodGuidesForCity } from "@/data/content";
import { affiliateConfig, getSource, hotelsForArea, linksForPage } from "@/data/registry";
import { telAvivHotelCatalog } from "@/components/TelAvivHotelBrowser";
import { readOutboundClicks } from "@/lib/outbound";
import { telAvivHotelPhotos } from "@/data/telAvivHotelPhotos";
import { hotelTileCopy } from "@/components/TelAvivHotelBrowser";
import { jerusalemHotelCatalog, jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { jerusalemHotelPhotos } from "@/data/jerusalemHotelPhotos";
import { routeTree } from "@/routeTree.gen";

// Keep router matching real, while making isolated page renders independent of
// the app shell and the external stylesheet that React waits for in jsdom.
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return { ...actual, Link: ({ to, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children?: ReactNode }) => <a href={to} {...props}>{children}</a> };
});

afterEach(cleanup);

describe.each([
  { g: cityStayGuides.jerusalem, areas: jerusalemAreaGuides, filter: "Luxury hotels", matches: 2, otherCity: cityStayGuides.telaviv },
  { g: cityStayGuides.telaviv, areas: telAvivAreaGuides, filter: "Beach days", matches: 3, otherCity: cityStayGuides.jerusalem },
])("$g.city city → neighborhood → booking journey", ({ g, areas, filter, matches, otherCity }) => {
  it("the existing city URL and every linked neighborhood resolve to their own page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const path of [g.path, ...areas.map((area) => area.path)]) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path.replace(/\/$/, ""));
    }
  });

  it("the city hub gives every area a properly cropped image, no redundant map or numbering, and a working guide link", () => {
    render(<CityStayPage g={g} />);
    const cards = screen.getAllByTestId("neighborhood-card");
    expect(cards).toHaveLength(areas.length);
    expect(neighborhoodGuidesForCity(g.id)).toEqual(areas);
    for (const area of areas) {
      const card = cards.find((card) => within(card).queryByRole("heading", { name: area.name }))!;
      expect(card).toBeDefined();
      expect(card.querySelector("img")?.getAttribute("src")).toBe(area.photo.src);
      expect(card.querySelector("iframe")).toBeNull();
      expect(card.querySelector("img")).toHaveClass("aspect-[16/10]", "object-cover");
      expect(card.querySelector("img")).toHaveAttribute("width", "755");
      expect(within(card).getByRole("link", { name: `Explore ${area.name}: area guide and hotel recommendations` })).toHaveAttribute("href", area.path);
      expect(within(card).getByText("Explore Area & Hotels")).toBeInTheDocument();
      expect(card.textContent).not.toMatch(/Area guide & [0-9]+ hotel picks/);
    }
    expect(screen.queryByText(/We don't list specific properties yet/)).not.toBeInTheDocument();
  });

  it("travel-style filters narrow the areas and All areas restores the complete guide", () => {
    const { container } = render(<CityStayPage g={g} />);
    fireEvent.click(screen.getByRole("button", { name: filter }));
    expect(screen.getAllByTestId("neighborhood-card")).toHaveLength(matches);
    expect(within(container.querySelector("#areas") as HTMLElement).getByRole("status")).toHaveTextContent(`${matches} areas for ${filter.toLowerCase()}`);
    fireEvent.click(within(container.querySelector("#areas") as HTMLElement).getByRole("button", { name: "All areas" }));
    expect(screen.getAllByTestId("neighborhood-card")).toHaveLength(areas.length);
  });

  it("each area explains location before hotel recommendations and preserves sponsored booking links", () => {
    for (const area of areas) {
      const { container, unmount } = render(<NeighborhoodStayPage area={area} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(area.title);
      expect(container.querySelectorAll("main")).toHaveLength(1);
      expect(container.querySelector("main main")).toBeNull();
      expect(container.querySelector("#location")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(2);
      expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: g.city })).toHaveAttribute("href", g.path);
      expect(container.querySelector(`a[href="${g.related[0]!.to}"]`)).toBeInTheDocument();
      expect(container.querySelector(`a[href="${otherCity.related[0]!.to}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(g.sourceIds[0]!).url}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(otherCity.sourceIds[0]!).url}"]`)).toBeNull();
      for (const hotel of hotelsForArea(area.id, g.id)) {
        expect(hotel.cityId).toBe(g.id);
        const booking = linksForPage(`stay-area-${area.id}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
        expect(getSource(hotel.sourceId).url).toMatch(/^https:\/\//);
        expect(booking.url).toBe(affiliateConfig[booking.id]?.trackingUrl);
        const link = screen.getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
        expect(link).toHaveAttribute("href", booking.url);
        expect(link).toHaveAttribute("rel", expect.stringContaining("sponsored"));
        expect(link).toHaveAttribute("target", "_blank");
      }
      unmount();
    }
  });

  it("city and area browsing links retain the correct guide's configured affiliate destination", () => {
    for (const [pageId, sourceId] of [
      [`stay-${g.id}`, g.sourceIds[0]!],
      ...areas.map((area) => [`stay-area-${area.id}-browse`, g.sourceIds[0]!]),
    ]) {
      const affiliateLinks = linksForPage(pageId!).filter((link) => link.isAffiliate);
      expect(affiliateLinks).toHaveLength(1);
      expect(affiliateLinks[0]!.url).toBe(affiliateConfig[affiliateLinks[0]!.id]?.trackingUrl);
      expect(affiliateLinks[0]!.sourceId).toBe(sourceId);
    }
  });
  it("replaces the plain planning links with six illustrated, route-specific reading cards", () => {
    const { container } = render(<CityStayPage g={g} />);
    const planning = container.querySelector("#planning")!;
    expect(within(planning as HTMLElement).getByRole("heading", { name: "Plan the rest of your trip" })).toBeInTheDocument();
    expect(planning.querySelectorAll("img")).toHaveLength(6);
    expect(planning.querySelectorAll('a[href^="/"]')).toHaveLength(6);
    expect(planning.querySelectorAll('a[href^="/"] img')).toHaveLength(6);
  });

});

describe("Tel Aviv direct hotel catalog", () => {
  it("shows all 16 existing editorial hotels with clearly labelled neighborhood photos and bookable offers", () => {
    expect(telAvivHotelCatalog).toHaveLength(16);
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    expect(within(catalog).getByRole("heading", { name: "Choose a Tel Aviv hotel" })).toBeInTheDocument();
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(16);
    for (const hotel of telAvivHotelCatalog) {
      const booking = linksForPage(`stay-area-${hotel.areaId}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
      expect(booking, hotel.name).toBeDefined();
      const link = within(catalog).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
      expect(link).toHaveAttribute("href", booking.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain(booking.isAffiliate ? "sponsored" : "noopener");
      const card = within(catalog).getAllByTestId("tel-aviv-hotel-card").find((item) => within(item).queryByRole("heading", { name: hotel.name }))!;
      expect(card).toBeDefined();
      expect(within(card).getByRole("heading", { name: hotel.name, level: 3 })).toBeInTheDocument();
      const area = telAvivAreaGuides.find((item) => item.id === hotel.areaId)!;
      expect(within(card).getByRole("link", { name: `Explore ${area.shortName} area guide` })).toHaveAttribute("href", area.path);
      expect(within(card).getByTestId("hotel-short-description")).toHaveTextContent(hotelTileCopy[hotel.id]!.description);
      expect(within(card).getByTestId("hotel-best-for")).toHaveTextContent(`Best for: ${hotelTileCopy[hotel.id]!.bestFor}`);
      expect(hotelTileCopy[hotel.id]!.bestFor.split(" ").length).toBeLessThanOrEqual(5);
      expect(hotelTileCopy[hotel.id]!.description.split(" ").length).toBeLessThanOrEqual(24);
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      expect(within(card).queryByText("Explore the area")).not.toBeInTheDocument();
    }
    const displayedImages = within(catalog).getAllByTestId("hotel-illustration") as HTMLImageElement[];
    expect(displayedImages).toHaveLength(16);
    expect(new Set(displayedImages.map((img) => img.src)).size).toBe(16);
    expect(new Set(telAvivHotelCatalog.map((hotel) => telAvivHotelPhotos[hotel.id]?.src)).size).toBe(16);
    expect(within(catalog).queryByText(/Neighborhood photograph|Illustrative hotel photograph|Tel Aviv city photograph/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Confirm dates, guests and final price on Expedia/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Hotel recommendations are editorial and do not reflect live room availability/)).not.toBeInTheDocument();
    expect(within(catalog).getByLabelText("Choose hotel area")).toBeInTheDocument();
    expect(within(catalog).getByRole("group", { name: "Filter Tel Aviv hotels by area" })).toHaveClass("hidden", "md:flex");
    expect(within(catalog).getByText(/do not depict the listed hotels/i)).toBeInTheDocument();
    expect(screen.getByTestId("tel-aviv-hotel-photo-credits")).toBeInTheDocument();
    expect(catalog.textContent).not.toMatch(/ILS\s*\d{2,}|rooms available now|live price/i);
  });

  it("allows all sixteen property-independent photo licences to be inspected", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const credits = screen.getByTestId("tel-aviv-hotel-photo-credits");
    const sources = within(credits).getAllByRole("link", { hidden: true });
    expect(sources.length).toBeGreaterThanOrEqual(12);
    for (const hotel of telAvivHotelCatalog) {
      const photo = telAvivHotelPhotos[hotel.id]!;
      expect(photo.alt).not.toContain(hotel.name);
      expect(photo.src).toBeTruthy();
      expect(photo.credit).toBeTruthy();
      if (photo.src.startsWith("https://")) {
        expect(photo.src).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
        expect(photo.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
        expect(photo.licenseUrl).toBe("https://unsplash.com/license");
      }
    }
    expect(container.querySelectorAll("#book [data-testid='tel-aviv-hotel-card']")).toHaveLength(16);
  });

  it("filters by individual area, resets to all, and sorts cards by hotel name", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const filter = within(catalog).getByRole("group", { name: "Filter Tel Aviv hotels by area" });
    const ja = within(filter).getByRole("button", { name: /^Jaffa/i });
    fireEvent.click(ja);
    expect(ja).toHaveAttribute("aria-pressed", "true");
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(2);
    expect(within(catalog).getByRole("status")).toHaveTextContent("2 hotels in Jaffa");
    fireEvent.click(within(filter).getByRole("button", { name: /^All areas/i }));
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(16);
    fireEvent.change(within(catalog).getByLabelText("Sort"), { target: { value: "name" } });
    const visibleNames = within(catalog).getAllByTestId("tel-aviv-hotel-card").map((card) => card.querySelector("h3")!.textContent!);
    expect(visibleNames).toEqual([...visibleNames].sort((a, b) => a.localeCompare(b)));
  });

  it("supports the compact mobile area selector and clears the choice", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const select = within(catalog).getByLabelText("Choose hotel area") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "telaviv-florentin" } });
    expect(select.value).toBe("telaviv-florentin");
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(2);
    expect(within(catalog).getByRole("status")).toHaveTextContent("2 hotels in Florentin");
    fireEvent.click(within(catalog).getByRole("button", { name: "View all Tel Aviv hotels" }));
    expect(select.value).toBe("all");
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(16);
  });

  it("records actual hotel outbound clicks without claiming bookings", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const hotel = telAvivHotelCatalog[0]!;
    const offer = linksForPage(`stay-area-${hotel.areaId}`).find((item) => item.id === `hotel-${hotel.id}-expedia`)!;
    const target = within(catalog).getByRole("link", { name: `${offer.ctaLabel} for ${hotel.name}` });
    fireEvent.click(target);
    expect(readOutboundClicks()).toContainEqual(expect.objectContaining({ event: "outbound_click", pageId: "stay-telaviv", productId: hotel.id, offerId: offer.id }));
  });
});

describe("Jerusalem direct hotel catalog", () => {
  it("shows twelve concise cards with unique illustrated images, linked areas and real external booking links", () => {
    expect(jerusalemHotelCatalog).toHaveLength(12);
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    expect(within(catalog).getByRole("heading", { name: "Choose a Jerusalem hotel" })).toBeInTheDocument();
    const cards = within(catalog).getAllByTestId("jerusalem-hotel-card");
    expect(cards).toHaveLength(12);
    expect(within(catalog).getAllByTestId("hotel-illustration")).toHaveLength(12);

    for (const hotel of jerusalemHotelCatalog) {
      const card = cards.find((candidate) => within(candidate).queryByRole("heading", { name: hotel.name }))!;
      expect(card).toBeDefined();
      const area = jerusalemAreaGuides.find((entry) => entry.id === hotel.areaId)!;
      const booking = linksForPage(`stay-area-${hotel.areaId}`).find((entry) => entry.id === `hotel-${hotel.id}-expedia`)!;
      const copy = jerusalemHotelTileCopy[hotel.id]!;
      expect(booking, hotel.name).toBeDefined();
      expect(booking.url).toBe(affiliateConfig[booking.id]?.trackingUrl);
      expect(within(card).getByRole("heading", { name: hotel.name, level: 3 })).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: `Explore ${area.shortName} area guide` })).toHaveAttribute("href", area.path);
      expect(within(card).getByTestId("hotel-short-description")).toHaveTextContent(copy.description);
      expect(within(card).getByTestId("hotel-best-for")).toHaveTextContent(`Best for: ${copy.bestFor}`);
      expect(copy.bestFor.split(" ").length).toBeLessThanOrEqual(5);
      expect(copy.description.split(" ").length).toBeLessThanOrEqual(24);
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      const book = within(card).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
      expect(book).toHaveAttribute("href", booking.url);
      expect(book).toHaveAttribute("target", "_blank");
      expect(book).toHaveAttribute("rel", expect.stringContaining("sponsored"));
      const photo = jerusalemHotelPhotos[hotel.id]!;
      expect(photo).toBeDefined();
      expect(photo.alt).not.toContain(hotel.name);
      expect(photo.credit).toBeTruthy();
      if (photo.src.startsWith("https://")) {
        expect(photo.src).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
        expect(photo.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
        expect(photo.licenseUrl).toBe("https://unsplash.com/license");
      }
    }
    expect(new Set(jerusalemHotelCatalog.map((hotel) => jerusalemHotelPhotos[hotel.id]?.src)).size).toBe(12);
    expect(within(catalog).getByTestId("jerusalem-hotel-photo-credits")).toBeInTheDocument();
    expect(within(catalog).queryByText(/Neighborhood photograph|Illustrative hotel photograph/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Already know your dates|Confirm dates, guests and final price/)).not.toBeInTheDocument();
    expect(catalog.textContent).not.toMatch(/ILS\s*\d{2,}|rooms available now|live price/i);
    expect(container.querySelector("#more-hotels")).toBeInTheDocument();
    expect(container.querySelector("#planning")).toBeInTheDocument();
  });

  it("filters to Mamilla on desktop, sorts by hotel name and resets the catalog", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const filters = within(catalog).getByRole("group", { name: "Filter Jerusalem hotels by area" });
    const mamilla = within(filters).getByRole("button", { name: "Mamilla & King David" });
    fireEvent.click(mamilla);
    expect(mamilla).toHaveAttribute("aria-pressed", "true");
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(2);
    expect(within(catalog).getByRole("status")).toHaveTextContent("2 hotels in Mamilla & King David");
    fireEvent.click(within(filters).getByRole("button", { name: "All areas" }));
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
    fireEvent.change(within(catalog).getByLabelText("Sort"), { target: { value: "name" } });
    const names = within(catalog).getAllByTestId("jerusalem-hotel-card").map((card) => card.querySelector("h3")!.textContent!);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("offers the same compact mobile area selector with a reset option", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const select = within(catalog).getByLabelText("Choose hotel area") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "old-city" } });
    expect(select.value).toBe("old-city");
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(2);
    fireEvent.click(within(catalog).getByRole("button", { name: "View all Jerusalem hotels" }));
    expect(select.value).toBe("all");
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
  });

  it("records a hotel outbound click with the Jerusalem page identifier", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const hotel = jerusalemHotelCatalog[0]!;
    const booking = linksForPage(`stay-area-${hotel.areaId}`).find((item) => item.id === `hotel-${hotel.id}-expedia`)!;
    fireEvent.click(within(catalog).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` }));
    expect(readOutboundClicks()).toContainEqual(expect.objectContaining({
      event: "outbound_click", pageId: "stay-jerusalem", productId: hotel.id, offerId: booking.id,
    }));
  });
});
