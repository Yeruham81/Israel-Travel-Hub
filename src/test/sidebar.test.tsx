import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalNav, SiteHeader } from "@/components/Layout";
import { routeTree } from "@/routeTree.gen";

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
  });

  it("clearly identifies external guides and preserves their real destinations", async () => {
    const router = await navigationRouter();
    const onNavigate = vi.fn();
    render(<RouterContextProvider router={router}><GlobalNav onNavigate={onNavigate} /></RouterContextProvider>);
    const popular = screen.getByRole("region", { name: "Popular Links" });
    for (const [label, path] of [
      ["Is there Uber in Israel?", "uber-in-israel"],
      ["Choosing an eSIM for Israel", "best-esim-for-israel"],
      ["Ben Gurion arrival tips", "ben-gurion-airport-arrival-tips"],
    ]) {
      const link = within(popular).getByRole("link", { name: `${label} (on israel-taxi.com, opens in a new tab)` });
      expect(link).toHaveAttribute("href", `https://www.israel-taxi.com/travel-blog/${path}/`);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.querySelector('[aria-hidden]')).toHaveTextContent("↗");
    }
    fireEvent.click(within(popular).getByRole("link", { name: /Is there Uber in Israel/ }));
    expect(onNavigate).toHaveBeenCalledOnce();
    expect(within(popular).getByRole("link", { name: "Ben Gurion → Jerusalem" })).toHaveAttribute("href", "/travel-blog/ben-gurion-airport-to-jerusalem/");
  });

  it("uses the same groups in the mobile drawer and closes it after either kind of link", async () => {
    const router = await navigationRouter();
    render(<RouterContextProvider router={router}><SiteHeader /></RouterContextProvider>);
    const trigger = screen.getByRole("button", { name: "Explore Israel" });
    fireEvent.click(trigger);
    let dialog = await screen.findByRole("dialog");
    let nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("region")).toHaveLength(6);
    fireEvent.click(within(nav).getByRole("link", { name: "Hotels in Haifa" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/best-hotels-in-haifa/"));

    fireEvent.click(trigger);
    dialog = await screen.findByRole("dialog");
    nav = within(dialog).getByRole("navigation", { name: "Explore Israel" });
    const popular = within(nav).getByRole("region", { name: "Popular Links" });
    fireEvent.click(within(popular).getByRole("link", { name: /Choosing an eSIM for Israel/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(router.state.location.pathname).toBe("/travel-blog/best-hotels-in-haifa/");
  });
});
