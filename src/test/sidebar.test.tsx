import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalNav, SiteHeader } from "@/components/Layout";
import { routeTree } from "@/routeTree.gen";
import { Route as HotelsRoute } from "@/routes/accommodation";
import { accommodationDestinations } from "@/data/content";
import { tourCategories, tourCategoryPaths } from "@/data/tours";
import { travelGuidePaths } from "@/data/registry";
import { attractionHubRegions } from "@/data/attractionsHub";
import { attractionSidebarGuideLabels } from "@/data/nav";

afterEach(cleanup);

async function navigationRouter(path = "/") {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
    trailingSlash: "always",
  });
  await router.load();
  return router;
}

describe("shared sidebar navigation", () => {
  it("shows All attractions and exactly seven collapsible geographic areas", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const section = screen.getByRole("region", { name: "Attractions" });
    const all = within(section).getByRole("link", { name: "All attractions" });
    expect(all).toHaveAttribute("href", "/attractions/");
    const buttons = within(section).getAllByRole("button");
    expect(buttons).toHaveLength(7);
    expect(buttons.map(button => button.textContent?.trim())).toEqual(
      attractionHubRegions.map(region => region.navLabel ?? region.title),
    );
    expect(within(section).getAllByRole("link")).toHaveLength(1);
    for (const region of attractionHubRegions) {
      const button = within(section).getByRole("button", { name: `Toggle ${region.title} guides` });
      expect(button).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      const list = within(section).getByRole("list", { name: `${region.title} guides` });
      expect(list).toBeVisible();
      expect(within(list).getAllByRole("link")).toHaveLength(region.cards.length);
      region.cards.forEach(card => {
        const label = attractionSidebarGuideLabels[card.id] ?? card.title;
        expect(within(list).getByRole("link", { name: label })).toHaveAttribute("href", String(card.to));
      });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(list).not.toBeVisible();
    }
  });

  it("automatically opens an area's guide list on a matching article", async () => {
    const router = await navigationRouter("/travel-blog/mount-zion/");
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const section = screen.getByRole("region", { name: "Attractions" });
    const jerusalem = within(section).getByRole("button", { name: "Toggle Jerusalem guides" });
    expect(jerusalem).toHaveAttribute("aria-expanded", "true");
    const links = within(section).getByRole("list", { name: "Jerusalem guides" });
    expect(within(links).getByRole("link", { name: "Mount Zion" })).toHaveAttribute("aria-current", "page");
    expect(within(section).getByRole("button", { name: "Toggle Tel Aviv & Jaffa guides" })).toHaveAttribute("aria-expanded", "false");
  });
  it("always shows all tour categories without a toggle and places the Bethlehem journey under guides", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const trips = screen.getByRole("region", { name: "Tours & trips" });
    expect(within(trips).queryByRole("button")).not.toBeInTheDocument();
    const categories = within(trips).getByRole("list", { name: "Tour categories" });
    expect(categories).toBeVisible();
    expect(within(categories).getAllByRole("link")).toHaveLength(tourCategories.length);
    for (const category of tourCategories) {
      const link = within(categories).getByRole("link", { name: category.shortTitle });
      expect(link).toBeVisible();
      expect(link).toHaveAttribute("href", tourCategoryPaths[category.id]);
    }
    expect(trips.querySelector('a[href="/tours/bethlehem-from-jerusalem/"]')).toBeNull();
    expect(trips.querySelector(`a[href="${travelGuidePaths.bethlehem}"]`)).toBeNull();
    const guides = screen.getByRole("region", { name: "Travel guides" });
    expect(within(guides).getByRole("link", { name: "How to get from Jerusalem to Bethlehem" })).toHaveAttribute("href", travelGuidePaths.bethlehem);
    expect(within(guides).getByRole("link", { name: "How to get from Jerusalem to the Dead Sea" })).toHaveAttribute("href", travelGuidePaths.jerusalemDeadSea);
  });

  it("renders the five topic groups and marks the exact current page", async () => {
    const router = await navigationRouter("/travel-blog/where-to-stay-in-jerusalem/");
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const nav = screen.getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("heading").map((heading) => heading.textContent)).toEqual([
      "Transportation", "Tours & trips", "Accommodation", "Attractions", "Travel guides",
    ]);
    expect(within(nav).queryByRole("region", { name: "Popular Links" })).not.toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Hotels in Jerusalem" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "All accommodation" })).not.toHaveAttribute("aria-current");
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    const links = within(nav).getAllByRole("link");
    expect(links[0]).toHaveTextContent("Home");
    expect(links.at(-1)).toHaveTextContent("About");
    expect(nav.textContent).not.toMatch(/[↗→]/);
    const transportation = within(nav).getByRole("region", { name: "Transportation" });
    expect(within(transportation).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Airport transfers", "/transfers/"],
      ["To Jerusalem", "/travel-blog/ben-gurion-airport-to-jerusalem/"],
      ["To Tel Aviv & Jaffa", "/travel-blog/ben-gurion-airport-to-tel-aviv/"],
      ["To Haifa", "/travel-blog/ben-gurion-airport-to-haifa/"],
      ["To Ein Bokek at the Dead Sea", "/travel-blog/ben-gurion-airport-to-ein-bokek/"],
      ["To other destinations", "/transfers/"],
      ["Private driver service", "/private-driver/"],
      ["Rent a car in Israel", "https://discovercars.tpm.li/w2RwEsmb?sub_id=itt_car_where_to_stay_in_jerusalem"],
    ]);
  });

  it("emphasizes linked sidebar parents while preserving destinations and visible child guides", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);

    const linkedParents = [
      { section: "Transportation", label: "Airport transfers", path: "/transfers/", list: "Airport transfer destinations", count: 5 },
      { section: "Tours & trips", label: "Tours & day trips", path: "/tours/", list: "Tour categories", count: tourCategories.length },
      { section: "Tours & trips", label: "Shore excursions", path: "/shore-excursions/", list: "Shore excursion ports", count: 2 },
    ];
    const guides = screen.getByRole("region", { name: "Travel guides" });
    const nonLinkHeading = within(guides).getByText("Israel itineraries");
    expect(nonLinkHeading).toHaveClass("font-semibold", "text-foreground");

    for (const parent of linkedParents) {
      const section = screen.getByRole("region", { name: parent.section });
      const link = within(section).getByRole("link", { name: parent.label });
      expect(link).toHaveAttribute("href", parent.path);
      expect(link).toHaveClass("font-semibold", "text-foreground");
      const children = within(section).getByRole("list", { name: parent.list });
      expect(children).toBeVisible();
      expect(within(children).getAllByRole("link")).toHaveLength(parent.count);
    }
  });

  it("groups the four Ben Gurion Airport arrival guides under Travel guides", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const guides = screen.getByRole("region", { name: "Travel guides" });
    expect(within(guides).getByRole("link", { name: "All travel guides" })).toHaveAttribute("href", "/guides/");
    for (const label of ["Israel itineraries", "From Ben Gurion Airport"]) {
      expect(within(guides).getByText(label)).toBeVisible();
      expect(within(guides).queryByRole("link", { name: label })).not.toBeInTheDocument();
      expect(within(guides).queryByRole("button", { name: label })).not.toBeInTheDocument();
    }
    const itineraries = within(guides).getByRole("list", { name: "Trip lengths" });
    expect(within(itineraries).getAllByRole("link").map(link => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Israel in 3 days", "/travel-blog/israel-itinerary-3-days/"],
      ["Israel in 5 days", "/travel-blog/israel-itinerary-5-days/"],
      ["Israel in 7 days", "/travel-blog/israel-itinerary-7-days/"],
      ["Israel in 10 days", "/travel-blog/israel-itinerary-10-days/"],
    ]);
    const airportGuides = within(guides).getByRole("list", { name: "Ben Gurion Airport arrival guides" });
    expect(airportGuides).toBeVisible();
    const expected = [
      ["How to get to Jerusalem", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/"],
      ["How to get to Tel Aviv", "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/"],
      ["How to get to Haifa", "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/"],
      ["How to get to Ein Bokek", "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/"],
    ];
    expect(within(airportGuides).getAllByRole("link").map(link => [link.textContent, link.getAttribute("href")])).toEqual(expected);
    expect(within(guides).getByRole("list", { name: "Trip lengths" })).toBeVisible();
  });

  it("opens the migrated practical guides inside the portal", async () => {
    const router = await navigationRouter();
    const onNavigate = vi.fn();
    render(<RouterContextProvider router={router}><GlobalNav onNavigate={onNavigate} /></RouterContextProvider>);
    const guides = screen.getByRole("region", { name: "Travel guides" });
    for (const [label, path] of [
      ["Is there Uber in Israel?", "uber-in-israel"],
      ["Choosing an eSIM for Israel", "best-esim-for-israel"],
      ["Ben Gurion arrival tips", "ben-gurion-airport-arrival-tips"],
    ] as const) {
      const link = within(guides).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", `/travel-blog/${path}/`);
      expect(link).not.toHaveAttribute("target");
      expect(link.querySelector('[aria-hidden]')).toBeNull();
    }
    fireEvent.click(within(guides).getByRole("link", { name: /Is there Uber in Israel/ }));
    expect(onNavigate).toHaveBeenCalledOnce();
  });

  it("keeps airport destinations visible on every page and links other destinations to the airport hub", async () => {
    const router = await navigationRouter();
    const result = render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const transportation = screen.getByRole("region", { name: "Transportation" });
    expect(within(transportation).queryByRole("button")).not.toBeInTheDocument();
    expect(within(transportation).getByRole("link", { name: "Airport transfers" })).toHaveAttribute("href", "/transfers/");
    const destinations = within(transportation).getByRole("list", { name: "Airport transfer destinations" });
    expect(destinations).toBeVisible();
    expect(within(destinations).getAllByRole("link")).toHaveLength(5);
    expect(within(destinations).getAllByRole("link").at(-1)).toHaveTextContent("To other destinations");
    fireEvent.click(within(destinations).getByRole("link", { name: "To Haifa" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/ben-gurion-airport-to-haifa/"));
    result.unmount();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    expect(screen.getByRole("list", { name: "Airport transfer destinations" })).toBeVisible();
    expect(screen.getByRole("link", { name: "To Haifa" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("link", { name: "To other destinations" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/transfers/"));
    expect(screen.getByRole("list", { name: "Airport transfer destinations" })).toBeVisible();

    expect(screen.queryByRole("button", { name: "Choose a shore excursion port" })).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Shore excursion ports" })).toBeVisible();
    expect(screen.getByRole("link", { name: "From Ashdod Port" })).toBeVisible();
    expect(screen.getByRole("link", { name: "From Haifa Port" })).toBeVisible();
  });

  it("uses the same groups in the mobile drawer and closes it after service and guide navigation", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><SiteHeader /></RouterContextProvider>);
    const trigger = screen.getByRole("button", { name: "Menu" });
    const brand = screen.getByRole("link", { name: "Israel Taxi & Travel home" });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand.querySelector("span.font-serif.whitespace-nowrap")).toHaveTextContent("Israel Taxi & Travel");
    const byline = within(brand).getByTestId("wordmark-byline");
    expect(byline).toHaveTextContent("Moshe Barak");
    expect(byline).toHaveClass("font-sans", "font-bold", "text-primary", "w-full", "justify-center", "items-center");
    expect(byline.querySelectorAll("span")).toHaveLength(2);
    expect(byline.lastElementChild).toHaveTextContent("Moshe Barak");
    const taxiIcon = within(byline).getByTestId("custom-taxi-icon");
    expect(taxiIcon).toHaveClass("bg-primary");
    expect(taxiIcon).toHaveAttribute("aria-hidden", "true");
    expect(taxiIcon).toHaveStyle({ mask: "url(/images/taxi-byline.png) center / contain no-repeat" });
    expect(trigger).toHaveClass("shrink-0", "whitespace-nowrap", "px-3");
    fireEvent.click(trigger);
    let dialog = await screen.findByRole("dialog");
    let nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("region")).toHaveLength(5);
    expect(within(nav).getAllByRole("link")[0]).toHaveTextContent("Home");
    expect(within(nav).getAllByRole("link").at(-1)).toHaveTextContent("About");
    expect(within(nav).getByRole("list", { name: "Airport transfer destinations" })).toBeVisible();
    expect(within(nav).getByRole("list", { name: "Tour categories" })).toBeVisible();
    for (const label of ["Airport transfers", "Tours & day trips", "Shore excursions"]) {
      expect(within(nav).getByRole("link", { name: label })).toHaveClass("font-semibold", "text-foreground");
    }
    expect(within(nav).queryByRole("button", { name: "Show tour categories" })).not.toBeInTheDocument();
    expect(within(nav).queryByText("Popular Links")).not.toBeInTheDocument();
    fireEvent.click(within(nav).getByRole("link", { name: "Private driver service" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/private-driver/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    const guides = within(nav).getByRole("region", { name: "Travel guides" });
    expect(within(guides).getByRole("link", { name: "All travel guides" })).toHaveAttribute("href", "/guides/");
    for (const label of ["Israel itineraries", "From Ben Gurion Airport"]) {
      expect(within(guides).getByText(label)).toBeVisible();
      expect(within(guides).queryByRole("link", { name: label })).not.toBeInTheDocument();
      expect(within(guides).queryByRole("button", { name: label })).not.toBeInTheDocument();
    }
    fireEvent.click(within(guides).getByRole("link", { name: /Choosing an eSIM for Israel/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/best-esim-for-israel/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("link", { name: "To Jerusalem" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/ben-gurion-airport-to-jerusalem/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).queryByRole("region", { name: "Religious sites" })).not.toBeInTheDocument();
    const airportGuides = within(nav).getByRole("list", { name: "Ben Gurion Airport arrival guides" });
    fireEvent.click(within(airportGuides).getByRole("link", { name: "How to get to Ein Bokek" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/"));
  });
});

describe("accommodation destination hub", () => {
  it("presents six illustrated destinations with real guide links and inviting copy", async () => {
    const router = await navigationRouter("/accommodation/");
    const Hotels = HotelsRoute.options.component!;
    render(<RouterContextProvider router={router}><Hotels /></RouterContextProvider>);
    const cards = screen.getAllByTestId("accommodation-destination-card");
    expect(cards).toHaveLength(6);
    expect(cards.map((card) => within(card).getByRole("heading").textContent)).toEqual([
      "Hotels in Jerusalem", "Hotels in Tel Aviv", "Hotels in Haifa", "Hotels in Tiberias", "Dead Sea hotels", "Hotels in Eilat",
    ]);
    for (const card of cards) {
      expect(within(card).getByRole("img")).toHaveAttribute("src");
      expect(within(card).getByRole("img").getAttribute("alt")).not.toBe("");
      expect(card.textContent).not.toMatch(/compare\s+(?:\d+|six|eight|ten|eleven)\s+(?:hotels|areas)/i);
      const href = card.getAttribute("href")!;
      if (href.startsWith("/")) expect(router.matchRoutes(href.split("#")[0]!).at(-1)?.routeId).toBe(href.split("#")[0]!.replace(/\/$/, ""));
    }
    const eilat = cards.at(-1)!;
    expect(eilat).toHaveAttribute("href", "/travel-blog/eilat/#arrival-stay");
    expect(eilat).toHaveTextContent("Explore Eilat Hotels");
    expect(eilat).not.toHaveAttribute("target");
    expect(eilat).not.toHaveTextContent("israel-taxi.com");
    expect(screen.queryByText("Guide image sources")).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="israel-taxi.com/wp-content/"]')).toBeNull();
  });

  it("retains the accommodation URL and includes Eilat in page discovery", async () => {
    const head = await HotelsRoute.options.head?.({} as never);
    expect(head).toMatchObject({
      meta: expect.arrayContaining([expect.objectContaining({ name: "description", content: expect.stringContaining("Eilat") })]),
      links: expect.arrayContaining([expect.objectContaining({ rel: "canonical", href: expect.stringMatching(/\/accommodation\/$/) })]),
    });
    expect(new Set(accommodationDestinations.map((destination) => destination.photo.src)).size).toBe(6);
  });
});
