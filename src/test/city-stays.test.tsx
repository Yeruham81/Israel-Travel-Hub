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
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { telAvivHotelPhotos } from "@/data/telAvivHotelPhotos";
import { hotelTileCopy } from "@/components/TelAvivHotelBrowser";
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
import { jerusalemHotelCatalog, jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { jerusalemHotelPhotos } from "@/data/jerusalemHotelPhotos";
import jerusalemEditorialHero from "@/assets/guides/2026-11/where-to-stay-jerusalem-drive.webp";
import jewishQuarterLanePhoto from "@/assets/guides/2026-11/jerusalem-jewish-quarter-stone-lane.webp";
import eastJerusalemHousePhoto from "@/assets/jerusalem/east-jerusalem-house.webp";
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
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path === g.path ? path : path.replace(/\/$/, ""));
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
      const image = card.querySelector("img")!;
      const expectedSrc = g.id === "jerusalem" && area.id === "old-city"
        ? jewishQuarterLanePhoto
        : g.id === "jerusalem" && area.id === "east-jerusalem"
          ? eastJerusalemHousePhoto
          : area.photo.src;
      expect(image.getAttribute("src")).toBe(expectedSrc);
      if (g.id === "jerusalem" && area.id === "old-city") {
        expect(image.getAttribute("alt")).toContain("Jewish Quarter");
      }
      if (g.id === "jerusalem" && area.id === "east-jerusalem") {
        expect(image.getAttribute("alt")).toContain("stone house");
      }
      expect(card.querySelector("iframe")).toBeNull();
      expect(card.querySelector("img")).toHaveClass("aspect-[16/10]", "object-cover");
      expect(card.querySelector("img")).toHaveAttribute("width", "755");
      expect(within(card).getByRole("link", { name: `Explore ${area.name}: area guide and hotel recommendations` })).toHaveAttribute("href", area.path);
      expect(within(card).getByRole("link", { name: `Explore ${area.name}: area guide and hotel recommendations` })).toHaveTextContent(/(?:Discover|Browse|Explore|Find)/);
      expect(within(card).queryByText("Explore Area & Hotels")).toBeNull();
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

  it("each area presents hotels prominently with working booking links and useful location guidance", () => {
    for (const area of areas) {
      const { container, unmount } = render(<NeighborhoodStayPage area={area} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(area.title);
      expect(container.querySelectorAll("main")).toHaveLength(1);
      expect(container.querySelector("main main")).toBeNull();
      expect(container.querySelector("#book")!.compareDocumentPosition(container.querySelector("#location")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      const cards = screen.getAllByTestId("hotel-recommendation");
      const expectedHotels = g.id === "jerusalem" && area.id === "downtown" ? 5 : 4;
      expect(cards).toHaveLength(expectedHotels);
      expect(container.querySelector("#book [data-testid='neighborhood-hotel-grid']")).toHaveClass(g.id === "jerusalem" && area.id === "downtown" ? "sm:grid-cols-2" : "lg:grid-cols-2");
      const imageUrls = cards.map((card) => within(card).getByTestId("hotel-illustration").getAttribute("src"));
      expect(new Set(imageUrls).size).toBe(expectedHotels);
      expect(screen.getByTestId("neighborhood-hotel-photo-credits")).toBeInTheDocument();
      expect(within(container.querySelector("#book") as HTMLElement).getByRole("heading", {
        name: `Hotels in ${area.shortName}`,
      })).toBeInTheDocument();
      {
        const hotelSection = container.querySelector("#book") as HTMLElement;
        if (g.id === "jerusalem") expect(within(hotelSection).getAllByTestId("jerusalem-hotel-booking-cta")).toHaveLength(expectedHotels);
        expect(within(hotelSection).getAllByRole("link", { name: /^(Check rooms|View hotel)/ })).toHaveLength(expectedHotels);
        expect(within(hotelSection).queryByText(/Check rooms on Expedia|View hotel on Expedia/)).not.toBeInTheDocument();
        expect(within(container.querySelector("#other-areas") as HTMLElement).getAllByRole("link")).toHaveLength(areas.length);
        expect(within(container.querySelector("#other-areas") as HTMLElement).getByRole("link", { name: /All .* neighborhoods/ })).toHaveAttribute("href", g.path);
        if (area.id === "downtown") {
          expect(screen.getByRole("link", { name: /Compare neighborhoods/ })).toHaveAttribute("href", "/travel-blog/where-to-stay-in-jerusalem/");
        } else {
          expect(screen.getByRole("link", { name: /Read my guide to where to stay in/ })).toHaveAttribute("href", g.id === "jerusalem" ? "/travel-blog/where-to-stay-in-jerusalem/" : "/travel-blog/where-to-stay-in-tel-aviv/");
        }
        expect(container.querySelector("#book")!.compareDocumentPosition(container.querySelector("#overview")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(container.querySelector("#overview")!.compareDocumentPosition(container.querySelector("#location")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(container.querySelector("#location")!.compareDocumentPosition(container.querySelector("#checklist")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        if (area.id === "downtown") {
          expect(container.querySelector("#more-hotels")).toBeNull();
          expect(container.querySelector("#area-guide")).toBeInTheDocument();
          expect(container.querySelector("#overview")!.compareDocumentPosition(container.querySelector("#area-guide")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
          expect(container.querySelectorAll("#book iframe")).toHaveLength(1);
          expect(container.querySelector("#location iframe")).toBeNull();
          const grid = container.querySelector("#book [data-testid='neighborhood-hotel-grid']")!;
          expect(grid).toHaveClass("xl:grid-cols-3", "auto-rows-fr");
          expect(grid.children).toHaveLength(6);
          expect(grid.lastElementChild).toHaveAttribute("data-testid", "downtown-hotel-map");
        } else {
          expect(container.querySelector("#more-hotels")!.compareDocumentPosition(container.querySelector("#overview")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        }
        expect(within(container.querySelector("#location") as HTMLElement).getByText(/Arriving with luggage:/)).toBeInTheDocument();
        expect(within(hotelSection).getByText(/Hotel stays are provided by independent properties/)).toBeInTheDocument();
        for (const src of imageUrls) expect(src).not.toBe(area.photo.src);
        if (area.id === "downtown") {
          for (const card of cards) {
            expect(card).toHaveClass("flex", "flex-col");
            expect(within(card).getByTestId("hotel-illustration")).toHaveClass("aspect-[16/9]", "w-full", "object-cover");
            expect(card.lastElementChild).toContainElement(within(card).getByRole("link", { name: /^(Check rooms|View hotel)/ }));
          }
          expect(within(container.querySelector("#location") as HTMLElement).queryByText("Make your arrival easier")).toBeNull();
          expect(within(container.querySelector("#checklist") as HTMLElement).getByText("Location & arrival")).toBeInTheDocument();
        }
        expect(container.querySelector("#sources")).not.toBeNull();
        expect(container.querySelector("#sources")!.compareDocumentPosition(screen.getByTestId("neighborhood-hotel-photo-credits")) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
      }
      expect(within(container.querySelector("#book") as HTMLElement).queryByText(/Images are illustrative, not photographs of these hotels/i)).not.toBeInTheDocument();
      expect(screen.queryByText("Who it suits")).not.toBeInTheDocument();
      expect(screen.queryByText("Check before booking")).not.toBeInTheDocument();
      expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: g.city })).toHaveAttribute("href", g.path);
      if (area.id === "downtown") {
        expect(container.querySelector(`a[href="${g.related[0]!.to}"]`)).toBeNull();
      } else {
        expect(container.querySelector(`a[href="${g.related[0]!.to}"]`)).toBeInTheDocument();
      }
      expect(container.querySelector(`a[href="${otherCity.related[0]!.to}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(g.sourceIds[0]!).url}"]`)).toBeNull();
      expect(container.querySelector(`#sources a[href="${getSource(otherCity.sourceIds[0]!).url}"]`)).toBeNull();
      for (const hotel of hotelsForArea(area.id, g.id)) {
        expect(hotel.cityId).toBe(g.id);
        const booking = linksForPage(`stay-area-${area.id}`).find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
        expect(getSource(hotel.sourceId).url).toMatch(/^https:\/\//);
        const link = screen.getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
        expect(link).toHaveAttribute("href", hotelAffiliateUrl(booking, `stay-area-${area.id}`, hotel.id));
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

  it("places five Downtown hotel cards and a compact sixth-cell map with a tracked Expedia link", () => {
    const { container } = render(<NeighborhoodStayPage area={jerusalemAreaGuides.find((area) => area.id === "downtown")!} />);
    const section = container.querySelector("#book") as HTMLElement;
    const grid = within(section).getByTestId("downtown-hotels-with-map");
    const list = within(grid).getByTestId("neighborhood-hotel-grid");
    expect(list).toHaveClass("sm:grid-cols-2", "xl:grid-cols-3", "auto-rows-fr", "items-stretch");
    expect(within(grid).getAllByTestId("hotel-recommendation")).toHaveLength(5);
    expect(list.children).toHaveLength(6);
    const map = within(section).getByTestId("downtown-hotel-map");
    expect(map.querySelector("iframe")).toHaveAttribute("src", expect.stringContaining("maps.google.com"));
    expect(map.querySelector("figure")).toHaveClass("h-full", "flex", "flex-col");
    const browse = within(section).getByTestId("downtown-area-browse-expedia");
    const offer = linksForPage("stay-area-downtown-browse")[0]!;
    expect(offer.id).toBe("area-downtown-expedia");
    expect(browse).toHaveTextContent("Browse more Downtown hotels");
    expect(browse).toHaveClass("btn-primary");
    expect(browse).toHaveAttribute("href", hotelBrowseAffiliateUrl(offer, "stay-area-downtown"));
    expect(browse.getAttribute("href")).toContain("sub_id=itt_stay_area_downtown_area_downtown_expedia");
    expect(browse.getAttribute("rel")).toContain("sponsored");
    fireEvent.click(browse);
    expect(readOutboundClicks()).toContainEqual(expect.objectContaining({
      pageId: "stay-area-downtown", productId: offer.id, offerId: offer.id,
    }));
    expect(screen.getByRole("heading", { name: "Getting around Downtown Jerusalem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Not sure where to base yourself in Jerusalem?" })).toBeInTheDocument();
    expect(screen.queryByText(/Planning an airport arrival\?/)).not.toBeInTheDocument();
  });

  it("city gallery matches every area inventory with no missing or duplicate hotel IDs", () => {
    const expected = areas.flatMap((area) => hotelsForArea(area.id, g.id));
    const inCity = hotelsInCityCatalog(g.id as "jerusalem" | "telaviv");
    expect(inCity).toHaveLength(areas.length * 4 + (g.id === "jerusalem" ? 1 : 0));
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

  it("keeps distinct hotels in each neighborhood with verified Expedia sources", () => {
    for (const area of areas) {
      const hotels = hotelsForArea(area.id, g.id);
      const expectedCount = g.id === "jerusalem" && area.id === "downtown" ? 5 : 4;
      expect(hotels).toHaveLength(expectedCount);
      const bookings = linksForPage(`stay-area-${area.id}`).filter((link) => link.id.startsWith("hotel-"));
      expect(bookings).toHaveLength(expectedCount);
      const configured = bookings.filter((link) => affiliateConfig[link.id]?.trackingUrl);
      expect(bookings.filter((link) => link.isAffiliate)).toHaveLength(configured.length);
      expect(configured.length).toBeGreaterThanOrEqual(2);
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
  it("shows local illustrated guides followed by six planning guides", () => {
    const { container } = render(<CityStayPage g={g} />);
    const local = container.querySelector("#explore")!;
    const planning = container.querySelector("#trip-planning")!;
    const faq = container.querySelector("#faq")!;
    const contact = container.querySelector("#contact")!;
    const sources = container.querySelector("#sources");
    expect(within(local as HTMLElement).getByRole("heading", { name: `Explore more around ${g.city}` })).toBeInTheDocument();
    expect(within(planning as HTMLElement).getByRole("heading", { name: "Plan the rest of your trip" })).toBeInTheDocument();
    expect(local.querySelectorAll("a img")).toHaveLength(6);
    expect(planning.querySelectorAll("a img")).toHaveLength(6);
    expect(faq.compareDocumentPosition(local) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(local.compareDocumentPosition(planning) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(planning.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    if (sources) expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
      expect(link).toHaveAttribute("href", hotelAffiliateUrl(booking, "stay-telaviv", hotel.id));
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
    expect(new Set(displayedImages.map((img) => img.src)).size).toBe(32); // every listed Tel Aviv hotel has its own image
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
  it("shows all 25 Jerusalem neighborhood hotels with correctly attributed photos and links", () => {
    expect(jerusalemHotelCatalog).toHaveLength(25);
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    expect(within(catalog).getByRole("heading", { name: "Choose a Jerusalem hotel" })).toBeInTheDocument();
    expect(catalog.compareDocumentPosition(container.querySelector("#areas")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
    expect(within(catalog).getByTestId("jerusalem-hotel-count")).toHaveTextContent("Showing 12 of 25 hotels across 6 neighborhoods");
    expect(within(catalog).getByTestId("jerusalem-hotels")).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");
    const initialCards = within(catalog).getAllByTestId("jerusalem-hotel-card");
    const initialAreaCounts = new Map<string, number>();
    for (const card of initialCards) {
      const label = within(card).getByTestId("hotel-area-label").textContent;
      const areaName = jerusalemAreaGuides.find((area) => area.shortName === label)?.id;
      expect(areaName).toBeDefined();
      initialAreaCounts.set(areaName!, (initialAreaCounts.get(areaName!) ?? 0) + 1);
    }
    expect([...initialAreaCounts.values()]).toEqual([2, 2, 2, 2, 2, 2]);
    const expand = within(catalog).getByRole("button", { name: "Show more hotels" });
    expect(expand.querySelector("svg")).toBeNull();
    expect(expand).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(expand);
    expect(within(catalog).queryByTestId("jerusalem-hotel-expand")).toBeNull();
    expect(within(catalog).queryByRole("button", { name: "Show fewer hotels" })).toBeNull();
    expect(within(catalog).getByTestId("jerusalem-hotel-count")).toHaveTextContent("25 hotels across 6 neighborhoods");
    const cards = within(catalog).getAllByTestId("jerusalem-hotel-card");
    expect(cards).toHaveLength(25);
    expect(catalog).toHaveTextContent("25 hotels across 6 neighborhoods");
    expect(within(catalog).getAllByTestId("hotel-illustration")).toHaveLength(25);

    for (const hotel of jerusalemHotelCatalog) {
      const card = cards.find((candidate) => candidate.querySelector("h3")?.textContent === hotel.name)!;
      expect(card).toBeDefined();
      const area = jerusalemAreaGuides.find((entry) => entry.id === hotel.areaId)!;
      const booking = linksForPage(`stay-area-${hotel.areaId}`).find((entry) => entry.id === `hotel-${hotel.id}-expedia`)!;
      const copy = jerusalemHotelTileCopy[hotel.id] || { description: hotel.summary, bestFor: hotel.bestFor };
      expect(booking, hotel.name).toBeDefined();
      expect(booking.url).toBe(affiliateConfig[booking.id]?.trackingUrl || getSource(hotel.sourceId).url);
      expect(within(card).getByRole("heading", { name: hotel.name, level: 3 })).toBeInTheDocument();
      expect(within(card).queryByRole("link", { name: `Explore ${area.shortName} area guide` })).toBeNull();
      expect(within(card).getByText(area.shortName)).toBeInTheDocument();
      expect(within(card).getByTestId("hotel-short-description")).toHaveTextContent(copy.description);
      expect(within(card).getByTestId("hotel-best-for")).toHaveTextContent(`Best for: ${copy.bestFor}`);
      expect(copy.bestFor.split(" ").length).toBeLessThanOrEqual(6);
      expect(copy.description.split(" ").length).toBeLessThanOrEqual(25);
      expect(within(card).getAllByRole("link")).toHaveLength(1);
      const book = within(card).getByRole("link", { name: `Check rooms & rates for ${hotel.name} on Expedia` });
      expect(book).toHaveTextContent("Check rooms & rates");
      expect(book).not.toHaveClass("btn-primary");
      expect(book).toHaveAttribute("href", hotelAffiliateUrl(booking, "stay-jerusalem", hotel.id));
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
    expect(screen.getByTestId("jerusalem-hotel-photo-credits")).toBeInTheDocument();
    expect(catalog.querySelector('[data-testid="jerusalem-hotel-photo-credits"]')).toBeNull();
    expect(within(catalog).queryByText(/Neighborhood photograph|Illustrative hotel photograph/)).not.toBeInTheDocument();
    expect(within(catalog).queryByText(/Already know your dates|Confirm dates, guests and final price/)).not.toBeInTheDocument();
    expect(catalog.textContent).not.toMatch(/ILS\s*\d{2,}|rooms available now|live price/i);
    expect(container.querySelector("#more-hotels")).toBeNull();
    expect(screen.queryByText("Looking for another Jerusalem hotel?")).not.toBeInTheDocument();
    const cityOffer = linksForPage("stay-jerusalem").find((item) => item.id === "hotels-jerusalem-expedia")!;
    const browseAll = within(catalog).getByTestId("jerusalem-all-hotels-expedia");
    expect(browseAll).toHaveTextContent("Browse all Jerusalem hotels");
    expect(browseAll).toHaveAttribute("href", hotelBrowseAffiliateUrl(cityOffer, "stay-jerusalem"));
    expect(browseAll).toHaveClass("btn-primary");
    expect(browseAll.getAttribute("rel")).toContain("sponsored");
    expect(container.querySelector("#compare details")).toBeNull();
    expect(container.querySelector("#compare table")).toBeInTheDocument();
    expect(container.querySelector("#areas > p")).toHaveClass("w-full", "text-pretty");
    fireEvent.click(browseAll);
    expect(readOutboundClicks()).toContainEqual(expect.objectContaining({
      pageId: "stay-jerusalem", productId: cityOffer.id, offerId: cityOffer.id,
    }));
    expect(container.querySelector("#trip-planning")).toBeInTheDocument();
  }, 20000);

  it("shows bookable hotel cards above neighborhood guidance, with a compact responsive design", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const neighborhoodSection = container.querySelector("#areas") as HTMLElement;
    expect(catalog.compareDocumentPosition(neighborhoodSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
    expect(container.querySelector("#areas [role='group']")).toBeInTheDocument();
    expect(within(neighborhoodSection).getAllByRole("button")).toHaveLength(7);
    expect(neighborhoodSection.querySelectorAll("[data-testid='neighborhood-card']")).toHaveLength(6);
    expect(within(catalog).getByRole("button", { name: "Show more hotels" })).toBeInTheDocument();
    const areaGuide = container.querySelector("#area-guide")! as HTMLElement;
    const comparison = container.querySelector("#compare")!;
    const checklist = container.querySelector("#checklist")!;
    expect(comparison.compareDocumentPosition(areaGuide) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(areaGuide.compareDocumentPosition(checklist) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(areaGuide).getByRole("heading", { name: "Not sure where to base yourself in Jerusalem?" })).toBeInTheDocument();
    expect(areaGuide.querySelector("img")).toHaveAttribute("src", jerusalemEditorialHero);
    expect(within(areaGuide).getByRole("link", { name: /Compare neighborhoods/i })).toHaveAttribute("href", "/travel-blog/where-to-stay-in-jerusalem/");
    const neighborhoodCards = neighborhoodSection.querySelector("ul")!;
    const firstTip = within(neighborhoodSection).getByText("Think about the last walk.").closest("div")!;
    const secondTip = within(neighborhoodSection).getByText("Check your dates.").closest("div")!;
    expect(neighborhoodCards.compareDocumentPosition(firstTip) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(firstTip.compareDocumentPosition(secondTip) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(comparison as HTMLElement).getByText(/Compare each neighborhood’s advantages/)).toBeInTheDocument();
    expect(screen.getByTestId("stay-local-photo-grid").querySelectorAll("a")).toHaveLength(6);
    expect(screen.getByRole("img", { name: "Jaffa Gate and Jerusalem Old City walls" })).toBeInTheDocument();
    const firstCard = within(catalog).getAllByTestId("jerusalem-hotel-card")[0]!;
    expect(firstCard).toHaveClass("flex", "flex-col");
    expect(firstCard).not.toHaveClass("sm:grid");
    expect(within(firstCard).getByTestId("hotel-illustration")).toHaveClass("aspect-[16/9]", "w-full", "object-cover");
    expect(firstCard.lastElementChild).toContainElement(within(firstCard).getByTestId("jerusalem-hotel-booking-cta"));
    const areaCards = within(neighborhoodSection).getAllByTestId("neighborhood-card");
    for (const areaCard of areaCards) {
      expect(areaCard.querySelectorAll("a")).toHaveLength(1);
      expect(areaCard.querySelector("a")).toHaveClass("grid", "h-full");
    }
    expect(within(firstCard).getByTestId("hotel-best-for")).toHaveTextContent("Best for:");
    expect(within(firstCard).getByRole("link", { name: /on Expedia/i })).toHaveAttribute("data-testid", "jerusalem-hotel-booking-cta");
    expect(within(firstCard).queryByText(/area view/i)).toBeNull();
  });

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
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
    fireEvent.click(within(catalog).getByRole("button", { name: "Show more hotels" }));
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(25);
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
    expect(within(catalog).getAllByTestId("jerusalem-hotel-card")).toHaveLength(12);
  });

  it("records a hotel outbound click with the Jerusalem page identifier", () => {
    const { container } = render(<CityStayPage g={cityStayGuides.jerusalem} />);
    const catalog = container.querySelector("#book") as HTMLElement;
    const hotel = jerusalemHotelCatalog[0]!;
    const booking = linksForPage(`stay-area-${hotel.areaId}`).find((item) => item.id === `hotel-${hotel.id}-expedia`)!;
    fireEvent.click(within(catalog).getByRole("link", { name: `Check rooms & rates for ${hotel.name} on Expedia` }));
    expect(readOutboundClicks()).toContainEqual(expect.objectContaining({
      event: "outbound_click", pageId: "stay-jerusalem", productId: hotel.id, offerId: booking.id,
    }));
  });
});
