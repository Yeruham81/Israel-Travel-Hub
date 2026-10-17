import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { deadSeaStayGuide, hotelCategoryGuides } from "@/data/content";
import { affiliateConfig, deadSeaHotelRecommendations, providerLinks } from "@/data/registry";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { readOutboundClicks } from "@/lib/outbound";
import { routeTree } from "@/routeTree.gen";
import { Route as DestinationRoute } from "@/routes/travel-blog.best-dead-sea-hotels";
import { Route as SpaRoute } from "@/routes/dead-sea.spa-hotels";
import { Route as FamilyRoute } from "@/routes/dead-sea.family-hotels";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return { ...actual, Link: ({ to, hash, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string; children?: ReactNode }) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> };
});

afterEach(() => { cleanup(); localStorage.clear(); });
const categories = hotelCategoryGuides.filter((guide) => guide.destinationId === deadSeaStayGuide.id);

describe("Dead Sea destination → travel intent → booking", () => {
  it("preserves the original destination URL and gives both category guides independent routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const path of [deadSeaStayGuide.path, ...categories.map((guide) => guide.path)]) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path.replace(/\/$/, ""));
    }
  });

  it("each intent page has its own title, description, canonical and breadcrumb while staging remains noindex", async () => {
    const records = [{ route: DestinationRoute, guide: deadSeaStayGuide }, { route: SpaRoute, guide: categories.find((g) => g.id === "spa")! }, { route: FamilyRoute, guide: categories.find((g) => g.id === "family")! }];
    expect(new Set(records.map(({ guide }) => guide.title)).size).toBe(3);
    expect(new Set(records.map(({ guide }) => guide.metaDescription)).size).toBe(3);
    for (const { route, guide } of records) {
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({
        meta: expect.arrayContaining([{ title: guide.title }, { name: "description", content: guide.metaDescription }, { name: "robots", content: "noindex,nofollow" }]),
        links: [{ rel: "canonical", href: CANONICAL_ORIGIN + guide.path }],
        scripts: expect.arrayContaining([expect.objectContaining({ type: "application/ld+json", children: expect.stringContaining(CANONICAL_ORIGIN + guide.path) })]),
      });
    }
  });

  it("the destination is a useful complete guide with every property, category photos and a real map before booking", () => {
    const { container } = render(<HotelDestinationPage guide={deadSeaStayGuide} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByTestId("stay-hotel-group")).toHaveLength(5);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(11);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(11);
    const categoryCards = screen.getAllByTestId("stay-category-card");
    expect(categoryCards).toHaveLength(2);
    for (const guide of categories) {
      const card = categoryCards.find((card) => card.getAttribute("href") === guide.path)!;
      expect(card.querySelector("img")).toHaveAttribute("src", guide.photo.src);
      expect(within(card).getByRole("heading", { name: guide.shortTitle })).toBeInTheDocument();
    }
    const map = container.querySelector("#location iframe")!;
    expect(new URL(map.getAttribute("src")!, "https://example.test").pathname).toBe("/maps/area.html");
    expect(container.querySelector("#location")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.querySelectorAll("main")).toHaveLength(1);
    for (const hotel of deadSeaHotelRecommendations) expect(container.querySelectorAll(`#hotel-${hotel.id}`)).toHaveLength(1);
  });

  it.each(categories)("$shortTitle answers a distinct intent before showing its own hotel shortlist", (guide) => {
    const { container } = render(<HotelCategoryPage guide={guide} destination={deadSeaStayGuide} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.title);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(guide.id === "spa" ? 5 : 4);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(guide.picks.length);
    for (const column of guide.comparison) expect(screen.getByRole("columnheader", { name: column.label })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.detailTitle })).toBeInTheDocument();
    expect(container.querySelector("#details")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: "Dead Sea" })).toHaveAttribute("href", deadSeaStayGuide.path);
    expect(screen.getByRole("link", { name: /See the map and compare/ })).toHaveAttribute("href", `${deadSeaStayGuide.path}#location`);
    const sibling = categories.find((g) => g.id !== guide.id)!;
    expect(screen.getByRole("link", { name: sibling.title })).toHaveAttribute("href", sibling.path);
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("all property bookings preserve publisher tracking, sponsored labels and the correct analytics page", () => {
    for (const guide of categories) {
      const { unmount } = render(<HotelCategoryPage guide={guide} destination={deadSeaStayGuide} />);
      for (const pick of guide.picks) {
        const hotel = deadSeaHotelRecommendations.find((hotel) => hotel.id === pick.hotelId)!;
        const booking = providerLinks.find((link) => link.id === `hotel-${hotel.id}-expedia`)!;
        const link = screen.getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
        expect(link).toHaveAttribute("href", affiliateConfig[booking.id]!.trackingUrl);
        expect(link).toHaveAttribute("rel", "sponsored noopener noreferrer");
        expect(link).toHaveAttribute("target", "_blank");
        link.addEventListener("click", (event) => event.preventDefault());
        fireEvent.click(link);
        expect(readOutboundClicks().at(-1)).toMatchObject({ event: "outbound_click", pageId: `stay-deadsea-${guide.id}`, productId: hotel.id, offerId: booking.id });
      }
      unmount();
    }
  });

  it("family recommendations exclude age-restricted hotels and explain spa access separately", () => {
    const family = categories.find((guide) => guide.id === "family")!;
    const { container } = render(<HotelCategoryPage guide={family} destination={deadSeaStayGuide} />);
    expect(container.querySelector("#hotel-ds-kayma")).toBeNull();
    expect(container.querySelector("#hotel-ds-oasis")).toBeNull();
    expect(container.querySelector("#hotel-ds-noga")).toHaveTextContent("Spa entry is 16+");
    expect(screen.getByRole("heading", { name: "What all-inclusive means here" })).toBeInTheDocument();
  });
});
