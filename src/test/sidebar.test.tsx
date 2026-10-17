import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalNav, SiteHeader } from "@/components/Layout";
import { routeTree } from "@/routeTree.gen";
import { Route as HotelsRoute } from "@/routes/hotels";
import { accommodationDestinations } from "@/data/content";

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
  it("renders the six topic groups and marks the exact current page", async () => {
    const router = await navigationRouter("/travel-blog/where-to-stay-in-jerusalem/");
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const nav = screen.getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("heading").map((heading) => heading.textContent)).toEqual([
      "Transportation", "Tours & Trips", "Accommodation", "Attractions", "Travel Guides & Tips", "Popular Links",
    ]);
    expect(within(nav).getByRole("link", { name: "Hotels in Jerusalem" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "All accommodation" })).not.toHaveAttribute("aria-current");
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    const links = within(nav).getAllByRole("link");
    expect(links[0]).toHaveTextContent("Home");
    expect(links.at(-1)).toHaveTextContent("About");
    expect(nav.textContent).not.toMatch(/[↗→]/);
    const transportation = within(nav).getByRole("region", { name: "Transportation" });
    expect(within(transportation).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Airport transfers", "/transfers/"], ["Private driver", "/private-driver/"], ["Car rental", "/car-rental/"],
    ]);
  });

  it("opens the migrated practical guides inside the portal", async () => {
    const router = await navigationRouter();
    const onNavigate = vi.fn();
    render(<RouterContextProvider router={router}><GlobalNav onNavigate={onNavigate} /></RouterContextProvider>);
    const popular = screen.getByRole("region", { name: "Popular Links" });
    for (const [label, path] of [
      ["Is there Uber in Israel?", "uber-in-israel"],
      ["Choosing an eSIM for Israel", "best-esim-for-israel"],
      ["Ben Gurion arrival tips", "ben-gurion-airport-arrival-tips"],
    ] as const) {
      const link = within(popular).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", `/travel-blog/${path}/`);
      expect(link).not.toHaveAttribute("target");
      expect(link.querySelector('[aria-hidden]')).toBeNull();
    }
    fireEvent.click(within(popular).getByRole("link", { name: /Is there Uber in Israel/ }));
    expect(onNavigate).toHaveBeenCalledOnce();
    expect(within(popular).getByRole("link", { name: "Ben Gurion to Jerusalem" })).toHaveAttribute("href", "/travel-blog/ben-gurion-airport-to-jerusalem/");
  });

  it("uses the same groups in the mobile drawer and closes it after service and guide navigation", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><SiteHeader /></RouterContextProvider>);
    const trigger = screen.getByRole("button", { name: "Explore Israel" });
    fireEvent.click(trigger);
    let dialog = await screen.findByRole("dialog");
    let nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("region")).toHaveLength(6);
    expect(within(nav).getAllByRole("link")[0]).toHaveTextContent("Home");
    expect(within(nav).getAllByRole("link").at(-1)).toHaveTextContent("About");
    fireEvent.click(within(nav).getByRole("link", { name: "Private driver" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/private-driver/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    const popular = within(nav).getByRole("region", { name: "Popular Links" });
    fireEvent.click(within(popular).getByRole("link", { name: /Choosing an eSIM for Israel/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/best-esim-for-israel/"));
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
      if (href.startsWith("/")) expect(router.matchRoutes(href).at(-1)?.routeId).toBe(href.replace(/\/$/, ""));
    }
    const eilat = cards.at(-1)!;
    expect(eilat).toHaveAttribute("href", "https://www.israel-taxi.com/travel-blog/eilat/");
    expect(eilat).toHaveAttribute("target", "_blank");
    expect(eilat).toHaveTextContent("Travel guide on israel-taxi.com");
    expect(screen.getByText("Guide image sources").closest("details")!.querySelectorAll("a")).toHaveLength(6);
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
