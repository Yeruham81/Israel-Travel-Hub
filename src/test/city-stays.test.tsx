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
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
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
    expect(screen.getByRole("heading", { name: `Compare areas in ${g.city}` })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Compare (the six|all [0-9]+) areas/ })).not.toBeInTheDocument();
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
      const cards = screen.getAllByTestId("hotel-recommendation");
      expect(cards).toHaveLength(4);
      expect(container.querySelector("#book [data-testid='neighborhood-hotel-grid']")).toHaveClass("sm:grid-cols-2");
      const imageUrls = cards.map((card) => within(card).getByTestId("hotel-illustration").getAttribute("src"));
      expect(new Set(imageUrls).size).toBe(4);
      expect(screen.getByTestId("neighborhood-hotel-photo-credits")).toBeInTheDocument();
      expect(within(container.querySelector("#book") as HTMLElement).getByRole("heading", { name: `My top picks in ${area.name}` })).toBeInTheDocument();
      expect(within(container.querySelector("#book") as HTMLElement).queryByText(/Images are illustrative, not photographs of these hotels/i)).not.toBeInTheDocument();
      expect(screen.queryByText("Who it suits")).not.toBeInTheDocument();
      expect(screen.queryByText("Check before booking")).not.toBeInTheDocument();
      expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: g.city })).toHaveAttribute("href", g.path);
      expect(container.querySelector(`a[href="${g.related[0]!.to}"]`)).toBeInTheDocument();
      expect(container.querySelector(`a[href="${otherCity.related[0]!.to}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(g.sourceIds[0]!).url}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(otherCity.sourceIds[0]!).url}"]`)).toBeNull();
      for (const hotel of hotelsForArea(area.id, g.id)) {
        expect(hotel.cityId).toBe(g.id);
        const booking = linksForPage(`stay-area-${area.id}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
        expect(getSource(hotel.sourceId).url).toMatch(/^https:\/\//);
        const link = screen.getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
        expect(link).toHaveAttribute("href", booking.url);
        expect(link).toHaveAttribute("target", "_blank");
        if (booking.isAffiliate) {
          expect(booking.url).toBe(affiliateConfig[booking.id]?.trackingUrl);
          expect(link).toHaveAttribute("rel", expect.stringContaining("sponsored"));
          expect(booking.ctaLabel).toBe("Check rooms on Expedia");
        } else {
          expect(affiliateConfig[booking.id]?.trackingUrl).toBeUndefined();
          expect(booking.url).toBe(getSource(hotel.sourceId).url);
          expect(booking.url).toMatch(/^https:\/\/www\.expedia\.com\/.+\.Hotel-Information$/);
          expect(booking.ctaLabel).toBe("View hotel on Expedia");
          expect(link.getAttribute("rel")).not.toContain("sponsored");
        }
        const card = cards.find((entry) => within(entry).queryByRole("heading", { name: hotel.name }))!;
        expect(card).toBeDefined();
        expect(within(card).getByTestId("hotel-short-description").textContent!.split(" ").length).toBeLessThanOrEqual(25);
        expect(within(card).getByTestId("hotel-best-for").textContent).toMatch(/^Best for:/);
        expect(within(card).getAllByRole("link")).toHaveLength(1);
      }
      unmount();
    }
  }, 20000);

  it("city gallery matches the complete four-per-area inventory with no missing or duplicate hotel IDs", () => {
    const expected = areas.flatMap((area) => hotelsForArea(area.id, g.id));
    const inCity = hotelsInCityCatalog(g.id as "jerusalem" | "telaviv");
    expect(inCity).toHaveLength(areas.length * 4);
    expect(new Set(inCity.map((hotel) => hotel.id)).size).toBe(inCity.length);
    expect(inCity.map((hotel) => hotel.id)).toEqual(expected.map((hotel) => hotel.id));
    for (const hotel of inCity) {
      const photo = cityHotelPhoto(hotel);
      expect(photo.src).toBeTruthy();
      expect(photo.credit).toBeTruthy();
      const offer = linksForPage(`stay-area-${hotel.areaId}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
      expect(offer).toBeDefined();
      expect(offer.isAffiliate).toBe(Boolean(affiliateConfig[offer.id]?.trackingUrl));
    }
  });

  it("each area has a balanced mix of two existing affiliate hotels and two new direct Expedia pages", () => {
    for (const area of areas) {
      const hotels = hotelsForArea(area.id, g.id);
      expect(hotels).toHaveLength(4);
      const bookings = linksForPage(`stay-area-${area.id}`).filter((link) => link.id.startsWith("hotel-"));
      expect(bookings).toHaveLength(4);
      expect(bookings.filter((link) => link.isAffiliate)).toHaveLength(2);
      expect(bookings.filter((link) => !link.isAffiliate)).toHaveLength(2);
      for (const offer of bookings.filter((link) => !link.isAffiliate)) {
        expect(offer.url).toContain("expedia.com/");
        expect(offer.url).toContain(".Hotel-Information");
        expect(offer.providerName).toBe("Expedia");
        expect(offer.ctaLabel).toBe("View hotel on Expedia");
        expect(offer.relationship).toBe("booking_platform");
      }
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
  it("shows all 32 neighborhood hotels with booking links and area-specific copy", () => {
    expect(telAvivHotelCatalog).toHaveLength(32);
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    expect(within(catalog).getByRole("heading", { name: "Choose a Tel Aviv hotel" })).toBeInTheDocument();
    const cards = within(catalog).getAllByTestId("tel-aviv-hotel-card");
    expect(cards).toHaveLength(32);
    expect(catalog.textContent).not.toMatch(/\\b\\d+ hotels? (across|in) (Tel Aviv|Jerusalem|Jaffa|Florentin|Mamilla)/i);
    for (const hotel of telAvivHotelCatalog) {
      const booking = linksForPage(`stay-area-${hotel.areaId}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
      expect(booking, hotel.name).toBeDefined();
      const card = cards.find((item) => item.querySelector("h3")?.textContent === hotel.name)!;
      const link = within(card).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
      expect(link).toHaveAttribute("href", booking.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain(booking.isAffiliate ? "sponsored" : "noopener");

      expect(card).toBeDefined();
      expect(within(card).getByRole("heading", { name: hotel.name, level: 3 })).toBeInTheDocument();
      const area = telAvivAreaGuides.find((item) => item.id === hotel.areaId)!;
      expect(within(card).getByRole("link", { name: `Explore ${area.shortName} area guide` })).toHaveAttribute("href", area.path);
      expect(within(card).getByTestId("hotel-short-description")).toHaveTextContent((hotelTileCopy[hotel.id] || { description: hotel.summary }).description);
      expect(within(card).getByTestId("hotel-best-for")).toHaveTextContent(`Best for: ${(hotelTileCopy[hotel.id] || { bestFor: hotel.bestFor }).bestFor}`);
      expect((hotelTileCopy[hotel.id]?.bestFor || hotel.bestFor).split(" ").length).toBeLessThanOrEqual(6);
      expect((hotelTileCopy[hotel.id]?.description || hotel.summary).split(" ").length).toBeLessThanOrEqual(25);
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      expect(within(card).queryByText("Explore the area")).not.toBeInTheDocument();
    }
    const displayedImages = within(catalog).getAllByTestId("hotel-illustration") as HTMLImageElement[];
    expect(displayedImages).toHaveLength(32);
    expect(new Set(displayedImages.map((img) => img.src)).size).toBe(16); // one unique photo per original recommendation; new photos are reused licensed illustrations
    expect(new Set(Object.values(telAvivHotelPhotos).map((photo) => photo.src)).size).toBe(16);
    expect(within(catalog).queryByText(/Neighborhood photograph|Illustrative hotel photograph|Tel Aviv city photograph/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Confirm dates, guests and final price on Expedia/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Hotel recommendations are editorial and do not reflect live room availability/)).not.toBeInTheDocument();
    expect(within(catalog).getByLabelText("Choose hotel area")).toBeInTheDocument();
    expect(within(catalog).getByRole("group", { name: "Filter Tel Aviv hotels by area" })).toHaveClass("hidden", "md:flex");
    expect(within(catalog).queryByText(/do not depict the listed hotels|Images are illustrative/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("tel-aviv-hotel-photo-credits")).toBeInTheDocument();
    expect(catalog.textContent).not.toMatch(/ILS\s*\d{2,}|rooms available now|live price/i);
  }, 20000);

  it("keeps attributions and locally hosted images for all 32 hotel cards", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const credits = screen.getByTestId("tel-aviv-hotel-photo-credits");
    const sources = within(credits).getAllByRole("link", { hidden: true });
    // Licensed local files can retain source links, but images never load from those links.
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const hotel of telAvivHotelCatalog) {
      const photo = cityHotelPhoto(hotel);
      expect(photo.alt).not.toContain(hotel.name);
      expect(photo.src).toBeTruthy();
      expect(photo.credit).toBeTruthy();
      expect(photo.src).not.toMatch(/^https?:\/\//i);
      if (photo.sourceUrl) expect(photo.sourceUrl).toMatch(/^https:\/\//);
    }
    expect(container.querySelectorAll("#book [data-testid='tel-aviv-hotel-card']")).toHaveLength(32);
  });

  it("filters by individual area, resets to all, and sorts cards by hotel name", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.telaviv} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const filter = within(catalog).getByRole("group", { name: "Filter Tel Aviv hotels by area" });
    const ja = within(filter).getByRole("button", { name: /^Jaffa/i });
    fireEvent.click(ja);
    expect(ja).toHaveAttribute("aria-pressed", "true");
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(4);
    expect(within(catalog).queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(within(filter).getByRole("button", { name: /^All areas/i }));
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(32);
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
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(4);
    expect(within(catalog).queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(within(catalog).getByRole("button", { name: "View all Tel Aviv hotels" }));
    expect(select.value).toBe("all");
    expect(within(catalog).getAllByTestId("tel-aviv-hotel-card")).toHaveLength(32);
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
  it("shows all 24 Jerusalem neighborhood hotels with correctly attributed photos and links", () => {
    expect(jerusalemHotelCatalog).toHaveLength(24);
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    expect(within(catalog).getByRole("heading", { name: "Choose a Jerusalem hotel" })).toBeInTheDocument();
    const cards = within(catalog).getAllByTestId("jerusalem-hotel-card");
    expect(cards).toHaveLength(24);
    expect(catalog.textContent).not.toMatch(/\\b\\d+ hotels? (across|in) (Tel Aviv|Jerusalem|Jaffa|Florentin|Mamilla)/i);
    expect(within(catalog).getAllByTestId("hotel-illustration")).toHaveLength(24);

    for (const hotel of jerusalemHotelCatalog) {
      const card = cards.find((candidate) => candidate.querySelector("h3")?.textContent === hotel.name)!;
      expect(card).toBeDefined();
      const area = jerusalemAreaGuides.find((entry) => entry.id === hotel.areaId)!;
      const booking = linksForPage(`stay-area-${hotel.areaId}`).find((entry) => entry.id === `hotel-${hotel.id}-expedia`)!;
      const copy = jerusalemHotelTileCopy[hotel.id] || { description: hotel.summary, bestFor: hotel.bestFor };
      expect(booking, hotel.name).toBeDefined();
      expect(booking.url).toBe(affiliateConfig[booking.id]?.trackingUrl || getSource(hotel.sourceId).url);
      expect(within(card).getByRole("heading", { name: hotel.name, level: 3 })).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: `Explore ${area.shortName} area guide` })).toHaveAttribute("href", area.path);
      expect(within(card).getByTestId("hotel-short-description")).toHaveTextContent(copy.description);
      expect(within(card).getByTestId("hotel-best-for")).toHaveTextContent(`Best for: ${copy.bestFor}`);
      expect(copy.bestFor.split(" ").length).toBeLessThanOrEqual(6);
      expect(copy.description.split(" ").length).toBeLessThanOrEqual(25);
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      const book = within(card).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
      expect(book).toHaveAttribute("href", booking.url);
      expect(book).toHaveAttribute("target", "_blank");
      expect(book.getAttribute("rel")).toContain(booking.isAffiliate ? "sponsored" : "noopener");
      const photo = cityHotelPhoto(hotel);
      expect(photo).toBeDefined();
      expect(photo.alt).not.toContain(hotel.name);
      expect(photo.credit).toBeTruthy();
      if (photo.src.startsWith("https://")) {
        expect(photo.src).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
        expect(photo.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
        expect(photo.licenseUrl).toBe("https://unsplash.com/license");
      }
    }
    expect(new Set(Object.values(jerusalemHotelPhotos).map((photo) => photo.src)).size).toBe(12);
    expect(within(catalog).getByTestId("jerusalem-hotel-photo-credits")).toBeInTheDocument();
    expect(within(catalog).queryByText(/Neighborhood photograph|Illustrative hotel photograph/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Already know your dates|Confirm dates, guests and final price/)).not.toBeInTheDocument();
    expect(catalog.textContent).not.toMatch(/ILS\s*\d{2,}|rooms available now|live price/i);
    expect(container.querySelector("#more-hotels")).toBeInTheDocument();
    expect(container.querySelector("#planning")).toBeInTheDocument();
  }, 20000);

  it("filters to Mamilla on desktop, sorts by hotel name and resets the catalog", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const filters = within(catalog).getByRole("group", { name: "Filter Jerusalem hotels by area" });
    const mamilla = within(filters).getByRole("button", { name: "Mamilla & King David" });
    fireEvent.click(mamilla);
    expect(mamilla).toHaveAttribute("aria-pressed", "true");
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(4);
    expect(within(catalog).queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(within(filters).getByRole("button", { name: "All areas" }));
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(24);
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
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(4);
    fireEvent.click(within(catalog).getByRole("button", { name: "View all Jerusalem hotels" }));
    expect(select.value).toBe("all");
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(24);
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
