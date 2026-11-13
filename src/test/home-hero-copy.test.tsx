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
    expect(screen.getByRole("heading", { level: 1, name: "Discover Israel, Travel Smarter" })).toBeInTheDocument();
    expect(screen.getByText("Your journey starts here")).toBeInTheDocument();
    expect(container.textContent).toContain("From airport arrivals and getting around to memorable day trips");
    expect(container.textContent).toContain("make the most of your time in Israel.");
    const headline = screen.getByRole("heading", { level: 1, name: "Discover Israel, Travel Smarter" });
    expect(headline).toHaveClass("md:text-5xl", "lg:max-w-none", "lg:whitespace-nowrap");
    expect(headline.nextElementSibling).toHaveClass("mt-3");
    const caption = screen.getByText("Jerusalem Old City from the Mount of Olives");
    expect(caption).toHaveClass("text-[10px]", "text-navy-foreground/60");
    expect(caption.parentElement).toHaveClass("mt-16", "md:mt-24");
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
      "Where to Stay in Israel",
      "Attractions & Experiences",
      "Practical Israel Travel Guides",
      "Personal Messages from Past Clients",
      "Send me a message",
    ];
    const actualHeadings = screen.getAllByRole("heading", { level: 2 }).map(heading => heading.textContent);
    expect(actualHeadings).toEqual(sectionHeadings);

    // Every broad-category CTA follows its own cards rather than preceding them.
    for (const [sectionId, linkName, target] of [
      ["transfers", "Explore Airport Transfers", "/airport-transfers/"],
      ["tours", "Explore tours & day trips", "/tours/"],
      ["shore-excursions", "Explore Shore Excursions", "/shore-excursions/"],
      ["accommodation", "Explore all accommodation", "/accommodation/"],
      ["attractions", "Explore attractions & experiences", "/attractions/"],
    ] as const) {
      const section = document.getElementById(sectionId)!;
      const button = within(section).getByRole("link", { name: new RegExp(linkName, "i") });
      expect(button).toHaveAttribute("href", target);
      expect(section.querySelector("header")?.contains(button)).toBe(false);
      expect(section.lastElementChild).toContainElement(button);
      expect(section.querySelector('[data-testid="service-layout-' + sectionId + '"]')!.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    // The former bottom destination strip is consolidated into the accommodation section.
    const accommodationSection = document.getElementById("accommodation")!;
    const destinationLinks = within(accommodationSection).getAllByRole("link").filter(link => link.getAttribute("href")?.startsWith("/travel-blog/"));
    expect(destinationLinks).toHaveLength(5);
    expect(destinationLinks.map(link => link.getAttribute("href"))).toEqual([
      "/travel-blog/where-to-stay-in-jerusalem/",
      "/travel-blog/where-to-stay-in-tel-aviv/",
      "/travel-blog/best-hotels-in-tiberias/",
      "/travel-blog/best-dead-sea-hotels/",
      "/travel-blog/best-hotels-in-haifa/",
    ]);
    expect(within(accommodationSection).getAllByRole("img")).toHaveLength(5);
    expect(within(accommodationSection).getByRole("link", { name: /Explore all accommodation/i })).toHaveAttribute("href", "/accommodation/");
    expect(screen.queryByText("Where to Base Yourself")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Popular Destinations" })).not.toBeInTheDocument();

    const guidesSection = document.getElementById("guides")!;
    const guideButton = within(guidesSection).getByRole("link", { name: /Browse all guides/i });
    expect(guideButton).toHaveAttribute("href", "/travel-blog/");
    expect(guidesSection.lastElementChild).toContainElement(guideButton);
    expect(guidesSection.querySelector('[data-testid="guide-row-two"]')!.compareDocumentPosition(guideButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.queryByRole("heading", { name: /Airport Transfers & Private Drivers/i })).not.toBeInTheDocument();

  });
});
