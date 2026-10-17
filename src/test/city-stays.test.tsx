import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CityStayPage } from "@/components/CityStayPage";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { cityStayGuides, jerusalemAreaGuides, telAvivAreaGuides, neighborhoodGuidesForCity } from "@/data/content";
import { affiliateConfig, getSource, hotelsForArea, linksForPage } from "@/data/registry";
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

  it("the city hub gives every area its own image, real map and internal guide link", () => {
    render(<CityStayPage g={g} />);
    const cards = screen.getAllByTestId("neighborhood-card");
    expect(cards).toHaveLength(areas.length);
    expect(neighborhoodGuidesForCity(g.id)).toEqual(areas);
    for (const area of areas) {
      const card = cards.find((card) => within(card).queryByRole("heading", { name: area.name }))!;
      expect(card).toBeDefined();
      expect(card.querySelector("img")?.getAttribute("src")).toBe(area.photo.src);
      const map = card.querySelector("iframe")!;
      expect(new URL(map.src).pathname).toBe("/maps/area.html");
      expect(new URL(map.src).searchParams.get("lang")).toBe("en");
      expect(new URL(map.src).searchParams.get("marker")).toBe(`${area.map.lat},${area.map.lon}`);
      expect(map.title).toContain(area.name);
      expect(within(card).getByRole("link", { name: `Read the ${area.name} guide and hotel recommendations` })).toHaveAttribute("href", area.path);
    }
    expect(screen.queryByText(/We don't list specific properties yet/)).not.toBeInTheDocument();
  });

  it("travel-style filters narrow the areas and All areas restores the complete guide", () => {
    render(<CityStayPage g={g} />);
    fireEvent.click(screen.getByRole("button", { name: filter }));
    expect(screen.getAllByTestId("neighborhood-card")).toHaveLength(matches);
    expect(screen.getByRole("status")).toHaveTextContent(`${matches} areas for ${filter.toLowerCase()}`);
    fireEvent.click(screen.getByRole("button", { name: "All areas" }));
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
});
