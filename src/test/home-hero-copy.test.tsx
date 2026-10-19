import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeHero } from "@/components/HomeHero";
import { Route as HomeRoute } from "@/routes/index";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

describe("homepage marketing copy and top navigation", () => {
  it("shows a welcoming hero introduction without redundant marketing buttons", () => {
    const { container } = render(<HomeHero />);
    expect(screen.getByRole("heading", { level: 1, name: "Explore Israel with confidence." })).toBeInTheDocument();
    expect(screen.getByText("Your Israel journey starts here")).toBeInTheDocument();
    expect(container.textContent).toContain("From airport arrivals and private day trips");
    expect(screen.queryByRole("link", { name: "Find where to stay" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Browse destinations" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(screen.getByRole("region", { name: "Places in Israel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next place" })).toBeInTheDocument();
  });
  it("labels the homepage Tours shortcut as Tours & Day Trips", async () => {
    const router = createRouter({
      routeTree, context: { queryClient: new QueryClient() },
      history: createMemoryHistory({ initialEntries: ["/"] }), trailingSlash: "always",
    });
    await router.load();
    const View = HomeRoute.options.component!;
    render(<RouterContextProvider router={router}><View /></RouterContextProvider>);
    const nav = screen.getByRole("navigation", { name: "Services" });
    expect(within(nav).getAllByRole("link").map(link => link.textContent)).toEqual([
      "Airport Transfers", "Tours & Day Trips", "Shore Excursions", "Accommodation", "Attractions", "Travel Guides",
    ]);
    expect(within(nav).getByRole("link", { name: "Tours & Day Trips" })).toHaveAttribute("href", "#tours");
    const sectionHeadings = [
      "Airport Transfers",
      "Kind Words from Satisfied Travelers",
      "Tours & Day Trips",
      "Shore Excursions",
      "Accommodation in Israel",
      "Attractions & Experiences",
      "Practical Israel Travel Guides",
      "Popular Destinations",
      "Personal Messages from Past Clients",
      "Send Moshe a Message",
    ];
    const actualHeadings = screen.getAllByRole("heading", { level: 2 }).map(heading => heading.textContent);
    expect(actualHeadings).toEqual(sectionHeadings);
    expect(screen.queryByRole("heading", { name: /Airport Transfers & Private Drivers/i })).not.toBeInTheDocument();

  });
});
