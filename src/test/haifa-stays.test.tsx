import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { haifaStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { affiliateConfig, getSource, providerLinks, haifaHotelRecommendations as hotels } from "@/data/registry";
import { hotelNav } from "@/data/nav";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { readOutboundClicks } from "@/lib/outbound";
import { routeTree } from "@/routeTree.gen";
import { Route as DestinationRoute } from "@/routes/travel-blog.best-hotels-in-haifa";
import { Route as FamilyRoute } from "@/routes/haifa.family-hotels";
import { Route as BoutiqueRoute } from "@/routes/haifa.boutique-hotels";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return { ...actual, Link: ({ to, hash, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string; children?: ReactNode }) => <a href={hash ? `${to}#${hash}` : to} {...props}>{children}</a> };
});

afterEach(() => { cleanup(); localStorage.clear(); });
const categories = hotelCategoryGuides.filter((guide) => guide.destinationId === destination.id);

describe("Haifa accommodation: location and travel intent before booking", () => {
  it("uses the original destination path with two independent category routes and a global hotel shortcut", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    expect(destination.path).toBe("/travel-blog/best-hotels-in-haifa/");
    for (const path of [destination.path, "/haifa/boutique-hotels/", "/haifa/family-hotels/"]) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path.replace(/\/$/, ""));
    }
    expect(hotelNav.find((item) => item.label === "Hotels in Haifa")?.to).toBe(destination.path);
  });

  it("gives the three pages distinct metadata, canonicals and Haifa breadcrumbs while retaining staging noindex", async () => {
    const records = [{ route: DestinationRoute, guide: destination }, { route: FamilyRoute, guide: categories.find((g) => g.id === "family")! }, { route: BoutiqueRoute, guide: categories.find((g) => g.id === "boutique")! }];
    expect(new Set(records.map(({ guide }) => guide.title)).size).toBe(3);
    expect(new Set(records.map(({ guide }) => guide.metaDescription)).size).toBe(3);
    for (const { route, guide } of records) {
      expect(await route.options.head?.({} as never)).toMatchObject({
        meta: expect.arrayContaining([{ title: guide.title }, { name: "description", content: guide.metaDescription }, { name: "robots", content: "noindex,nofollow" }]),
        links: [{ rel: "canonical", href: CANONICAL_ORIGIN + guide.path }],
        scripts: expect.arrayContaining([expect.objectContaining({ type: "application/ld+json", children: expect.stringContaining(CANONICAL_ORIGIN + destination.path) })]),
      });
    }
  });

  it("the parent covers all ten properties, five categories and a real map before hotel referrals", () => {
    const { container } = render(<HotelDestinationPage guide={destination} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByTestId("stay-hotel-group")).toHaveLength(5);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(10);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(10);
    for (const hotel of hotels) expect(container.querySelectorAll(`#hotel-${hotel.id}`)).toHaveLength(1);
    const cards = screen.getAllByTestId("stay-category-card");
    expect(cards).toHaveLength(2);
    for (const guide of categories) expect(cards.find((card) => card.getAttribute("href") === guide.path)!.querySelector("img")).toHaveAttribute("src", guide.photo.src);
    const map = new URL(container.querySelector("#location iframe")!.getAttribute("src")!);
    expect(map.hostname).toBe("www.openstreetmap.org");
    expect(map.searchParams.get("marker")).toBe(`${destination.map.lat},${destination.map.lon}`);
    expect(container.querySelector("#location")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole("link", { name: /Shore excursions from Haifa Port/ })).toHaveAttribute("href", "/haifa-shore-excursions/");
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it.each(categories)("$shortTitle has a distinct comparison with correct parent, sibling and sources", (guide) => {
    const { container } = render(<HotelCategoryPage guide={guide} destination={destination} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.title);
    expect(screen.getAllByTestId("hotel-recommendation")).toHaveLength(3);
    expect(screen.getAllByTestId("stay-comparison-row")).toHaveLength(3);
    for (const column of guide.comparison) expect(screen.getByRole("columnheader", { name: column.label })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.overviewTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.detailTitle })).toBeInTheDocument();
    expect(container.querySelector("#details")!.compareDocumentPosition(container.querySelector("#book")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: "Haifa" })).toHaveAttribute("href", destination.path);
    expect(screen.getByRole("link", { name: /See the map and compare/ })).toHaveAttribute("href", `${destination.path}#location`);
    expect(screen.getByRole("link", { name: categories.find((other) => other.id !== guide.id)!.title })).toBeInTheDocument();
    expect(container.querySelector(`#sources a[href="${getSource("owner-hotels-haifa").url}"]`)).toBeInTheDocument();
    for (const id of ["owner-hotels-tiberias", "owner-hotels-deadsea"]) expect(container.querySelector(`#sources a[href="${getSource(id).url}"]`)).toBeNull();
    expect(container.textContent).not.toMatch(/Ein Bokek|Ein Gedi|Tiberias|Dead Sea/);
    expect(container.querySelector('a[href^="/tiberias/"], a[href^="/dead-sea/"]')).toBeNull();
  });

  it("preserves exact property tracking and labels the ordinary city browse link correctly", () => {
    const pages = [{ element: <HotelDestinationPage guide={destination} />, ids: hotels.map((hotel) => hotel.id), pageId: "stay-haifa" }, ...categories.map((guide) => ({ element: <HotelCategoryPage guide={guide} destination={destination} />, ids: guide.picks.map((pick) => pick.hotelId), pageId: `stay-haifa-${guide.id}` }))];
    for (const page of pages) {
      const { container, unmount } = render(page.element);
      for (const id of page.ids) {
        const hotel = hotels.find((hotel) => hotel.id === id)!;
        const booking = providerLinks.find((link) => link.id === `hotel-${id}-expedia`)!;
        const card = container.querySelector(`#hotel-${id}`) as HTMLElement;
        expect(card).toHaveTextContent("Sponsored link");
        const link = within(card).getByRole("link", { name: `${booking.ctaLabel} for ${hotel.name}` });
        expect(link).toHaveAttribute("href", affiliateConfig[booking.id]!.trackingUrl);
        expect(link).toHaveAttribute("rel", "sponsored noopener noreferrer");
        expect(link).toHaveAttribute("target", "_blank");
        link.addEventListener("click", (event) => event.preventDefault());
        fireEvent.click(link);
        expect(readOutboundClicks().at(-1)).toMatchObject({ event: "outbound_click", pageId: page.pageId, productId: id, offerId: booking.id });
      }
      const browse = within(container.querySelector("#more-stays") as HTMLElement).getByRole("link", { name: /Check prices on Booking.com/ });
      expect(browse).toHaveAttribute("href", "https://www.booking.com/city/il/haifa.html");
      expect(browse).toHaveAttribute("rel", "noopener noreferrer");
      unmount();
    }
  });

  it("keeps age-restricted boutiques out of the young-family picks and explains date-dependent activities", () => {
    const guide = categories.find((g) => g.id === "family")!;
    const { container } = render(<HotelCategoryPage guide={guide} destination={destination} />);
    expect(container.querySelector("#hotel-haifa-botanica")).toBeNull();
    expect(container.querySelector("#hotel-haifa-schumacher")).toBeNull();
    expect(container.querySelector("#hotel-haifa-leonardo-plaza")).toHaveTextContent("weekends, holidays and July–August");
    expect(container.querySelector("#hotel-haifa-crowne-plaza")).toHaveTextContent("Do not assume a children's activity club");
    expect(container.querySelector("#hotel-haifa-dan-carmel")).toHaveTextContent("not mean every room or executive category fits the same party");
  });

  it("identifies the Bay View/Nof name difference and makes limited Port Inn verification explicit", () => {
    const { container } = render(<HotelDestinationPage guide={destination} />);
    expect(container.querySelector("#hotel-haifa-nof")).toHaveTextContent("Nof Hotel (Haifa Bay View)");
    expect(container.querySelector("#hotel-haifa-nof")).toHaveTextContent("now presented by Nara Hotels as Nof Hotel");
    expect(getSource("hotel-haifa-nof-official").url).toBe("https://www.nara-hotels.com/nof");
    expect(getSource("hotel-haifa-port-inn-official").note).toMatch(/name and downtown address only/);
    expect(hotels.find((hotel) => hotel.id === "haifa-port-inn")!.resortFacts.spa).toMatch(/No resort-spa or pool facilities assumed/);
  });
});
