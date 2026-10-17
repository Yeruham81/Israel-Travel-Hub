import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { StayHotelCard } from "@/components/StayHotelCard";
import { tiberiasStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { affiliateConfig, getSource, providerLinks, tiberiasHotelRecommendations as hotels } from "@/data/registry";
import { activeHotelNotice } from "@/lib/hotel-notices";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { readOutboundClicks } from "@/lib/outbound";
import { routeTree } from "@/routeTree.gen";
import { Route as DestinationRoute } from "@/routes/travel-blog.best-hotels-in-tiberias";
import { Route as FamilyRoute } from "@/routes/tiberias.family-hotels";
import { Route as LuxuryRoute } from "@/routes/tiberias.luxury-hotels";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return { ...actual, Link: ({ to, hash, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string; children?: ReactNode }) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> };
});

afterEach(() => { cleanup(); localStorage.clear(); vi.useRealTimers(); });
const categories = hotelCategoryGuides.filter((guide) => guide.destinationId === destination.id);
const hotel = (id: string) => hotels.find((hotel) => hotel.id === id)!;

describe("Tiberias destination and distinct hotel intents", () => {
  it("keeps the original destination URL and resolves both new intent routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    expect(destination.path).toBe("/travel-blog/best-hotels-in-tiberias/");
    for (const path of [destination.path, "/tiberias/family-hotels/", "/tiberias/luxury-hotels/"]) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path.replace(/\/$/, ""));
    }
  });

  it("gives each page distinct metadata, a self canonical and the Tiberias breadcrumb without changing staging noindex", async () => {
    const records = [{ route: DestinationRoute, guide: destination }, { route: FamilyRoute, guide: categories.find((g) => g.id === "family")! }, { route: LuxuryRoute, guide: categories.find((g) => g.id === "luxury")! }];
    expect(new Set(records.map(({ guide }) => guide.title)).size).toBe(3);
    expect(new Set(records.map(({ guide }) => guide.metaDescription)).size).toBe(3);
    for (const { route, guide } of records) {
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({
        meta: expect.arrayContaining([{ title: guide.title }, { name: "description", content: guide.metaDescription }, { name: "robots", content: "noindex,nofollow" }]),
        links: [{ rel: "canonical", href: CANONICAL_ORIGIN + guide.path }],
        scripts: expect.arrayContaining([expect.objectContaining({ type: "application/ld+json", children: expect.stringContaining(CANONICAL_ORIGIN + destination.path) })]),
      });
    }
  });

  it("the parent compares all ten stays, provides a real town map and explains locations before booking", () => {
    const { container } = render(<HotelDestinationPage guide={destination} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByTestId("stay-hotel-group")).toHaveLength(4);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(10);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(10);
    for (const h of hotels) expect(container.querySelectorAll(`#hotel-${h.id}`)).toHaveLength(1);
    const cards = screen.getAllByTestId("stay-category-card");
    expect(cards).toHaveLength(2);
    for (const guide of categories) {
      const card = cards.find((card) => card.getAttribute("href") === guide.path)!;
      expect(card.querySelector("img")).toHaveAttribute("src", guide.photo.src);
    }
    const map = new URL(container.querySelector("#location iframe")!.getAttribute("src")!, "https://example.test");
    expect(map.pathname).toBe("/maps/area.html");
    expect(map.searchParams.get("lang")).toBe("en");
    expect(map.searchParams.get("marker")).toBe(`${destination.map.lat},${destination.map.lon}`);
    expect(container.querySelector("#location")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(container.querySelector("#more-stays") as HTMLElement).getByRole("link", { name: /Check prices on Booking.com/ })).toHaveAttribute("href", "https://www.booking.com/city/il/tiberias.html");
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it.each(categories)("$shortTitle contains only its own shortlist, parent, sibling and relevant sources", (guide) => {
    const { container } = render(<HotelCategoryPage guide={guide} destination={destination} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.title);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(3);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(3);
    for (const column of guide.comparison) expect(screen.getByRole("columnheader", { name: column.label })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.overviewTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.detailTitle })).toBeInTheDocument();
    expect(container.querySelector("#details")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: "Tiberias" })).toHaveAttribute("href", destination.path);
    expect(screen.getByRole("link", { name: /See the map and compare/ })).toHaveAttribute("href", `${destination.path}#location`);
    expect(screen.getByRole("link", { name: categories.find((other) => other.id !== guide.id)!.title })).toBeInTheDocument();
    expect(container.querySelector(`#sources a[href="${getSource("owner-hotels-tiberias").url}"]`)).toBeNull();
    expect(container.querySelector('#sources a[href^="https://"]')).not.toBeNull();
    expect(container.querySelector(`#sources a[href="${getSource("owner-hotels-deadsea").url}"]`)).toBeNull();
    expect(container.textContent).not.toMatch(/Ein Bokek|Ein Gedi|Dead Sea|Choose the spa experience/);
    expect(container.querySelector('a[href^="/dead-sea/"]')).toBeNull();
  });

  it("preserves every configured property booking, sponsored label and destination-specific click attribution", () => {
    const pages = [{ element: <HotelDestinationPage guide={destination} />, ids: hotels.map((hotel) => hotel.id), pageId: "stay-tiberias" }, ...categories.map((guide) => ({ element: <HotelCategoryPage guide={guide} destination={destination} />, ids: guide.picks.map((pick) => pick.hotelId), pageId: `stay-tiberias-${guide.id}` }))];
    for (const page of pages) {
      const { unmount } = render(page.element);
      for (const id of page.ids) {
        const booking = providerLinks.find((link) => link.id === `hotel-${id}-expedia`)!;
        const card = screen.getAllByTestId("hotel-recommendation").find((card) => card.id === `hotel-${id}`)!;
        expect(card).toHaveTextContent("Sponsored link");
        const link = within(card).getByRole("link", { name: `${booking.ctaLabel} for ${hotel(id).name}` });
        expect(link).toHaveAttribute("href", affiliateConfig[booking.id]!.trackingUrl);
        expect(link).toHaveAttribute("rel", "sponsored noopener noreferrer");
        link.addEventListener("click", (event) => event.preventDefault());
        fireEvent.click(link);
        expect(readOutboundClicks().at(-1)).toMatchObject({ event: "outbound_click", pageId: page.pageId, productId: id, offerId: booking.id });
      }
      unmount();
    }
  });

  it("distinguishes current full board from all-inclusive and excludes age-restricted luxury stays from the young-family shortlist", () => {
    const guide = categories.find((g) => g.id === "family")!;
    const { container } = render(<HotelCategoryPage guide={guide} destination={destination} />);
    expect(container.querySelector("#hotel-tib-leonardo-club")).toHaveTextContent("full board instead of all-inclusive");
    expect(container.querySelector("#hotel-tib-caesar")).toHaveTextContent("thermal mineral pool is reserved for guests aged 18 and over");
    expect(container.querySelector("#hotel-tib-galei-kinneret")).toBeNull();
    expect(container.querySelector("#hotel-tib-scots")).toBeNull();
    expect(hotel("tib-galei-kinneret").resortFacts.agePolicy).toBe("Hotel guests 12+");
    expect(hotel("tib-scots").resortFacts.agePolicy).toMatch(/Generally 16\+.*exceptions/);
  });

  it("expires operating notices after their last day in Israel, independently of the browser timezone", () => {
    const h = hotel("tib-leonardo-club");
    expect(activeHotelNotice(h, new Date("2026-10-27T21:59:59Z"))).toBe(h.operatingNotice);
    expect(activeHotelNotice(h, new Date("2026-10-27T22:00:00Z"))).toBeUndefined();
    expect(activeHotelNotice(hotel("tib-caesar"), new Date("2026-10-17T10:00:00Z"))).toBeUndefined();
  });

  it("shows the dated pool notice even on compact parent cards, then removes it after expiry", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-17T10:00:00Z"));
    const h = hotel("tib-leonardo-club");
    const { rerender } = render(<ul><StayHotelCard hotel={h} booking={undefined} pageId="stay-tiberias" compact /></ul>);
    expect(screen.getByTestId("hotel-operating-notice")).toHaveTextContent("25–27 October 2026");
    vi.setSystemTime(new Date("2026-10-28T10:00:00Z"));
    rerender(<ul><StayHotelCard hotel={h} booking={undefined} pageId="stay-tiberias" compact /></ul>);
    expect(screen.queryByTestId("hotel-operating-notice")).toBeNull();
  });
});
