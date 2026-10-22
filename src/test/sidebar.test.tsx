import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalNav, SiteHeader } from "@/components/Layout";
import { routeTree } from "@/routeTree.gen";
import { Route as HotelsRoute } from "@/routes/hotels";
import { accommodationDestinations } from "@/data/content";
import { tourCategories, tourCategoryPaths } from "@/data/tours";
import { travelGuidePaths } from "@/data/registry";

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
    const guides = screen.getByRole("region", { name: "Travel guides & tips" });
    expect(within(guides).getByRole("link", { name: "Jerusalem to Bethlehem: travel options" })).toHaveAttribute("href", travelGuidePaths.bethlehem);
  });

  it("renders the six topic groups and marks the exact current page", async () => {
    const router = await navigationRouter("/travel-blog/where-to-stay-in-jerusalem/");
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const nav = screen.getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("heading").map((heading) => heading.textContent)).toEqual([
      "Transportation", "Tours & trips", "Accommodation", "Attractions", "Religious sites", "Travel guides & tips",
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
      ["Rent a car in Israel", "/car-rental/"],
    ]);
  });

  it("opens the migrated practical guides inside the portal", async () => {
    const router = await navigationRouter();
    const onNavigate = vi.fn();
    render(<RouterContextProvider router={router}><GlobalNav onNavigate={onNavigate} /></RouterContextProvider>);
    const guides = screen.getByRole("region", { name: "Travel guides & tips" });
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
    expect(within(nav).getAllByRole("region")).toHaveLength(6);
    expect(within(nav).getAllByRole("link")[0]).toHaveTextContent("Home");
    expect(within(nav).getAllByRole("link").at(-1)).toHaveTextContent("About");
    expect(within(nav).getByRole("list", { name: "Airport transfer destinations" })).toBeVisible();
    expect(within(nav).getByRole("list", { name: "Tour categories" })).toBeVisible();
    expect(within(nav).queryByRole("button", { name: "Show tour categories" })).not.toBeInTheDocument();
    expect(within(nav).queryByText("Popular Links")).not.toBeInTheDocument();
    fireEvent.click(within(nav).getByRole("link", { name: "Private driver service" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/private-driver/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    const guides = within(nav).getByRole("region", { name: "Travel guides & tips" });
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
    const religiousSites = within(dialog).getByRole("region", { name: "Religious sites" });
    expect(within(religiousSites).getAllByRole("link")).toHaveLength(11);
    fireEvent.click(within(religiousSites).getByRole("link", { name: "Yardenit" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/yardenit/"));
  });
});

describe("accommodation destination hub", () => {
  it("presents six illustrated destinations with real guide links and inviting copy", async () => {
    const router = await navigationRouter("/hotels/");
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
      links: expect.arrayContaining([expect.objectContaining({ rel: "canonical", href: expect.stringMatching(/\/hotels\/$/) })]),
    });
    expect(new Set(accommodationDestinations.map((destination) => destination.photo.src)).size).toBe(6);
  });
});
