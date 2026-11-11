import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StayTripLinks, stayGuideGroups } from "@/components/StayTripLinks";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ to, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children?: ReactNode }) => (
      <a href={to} {...props}>{children}</a>
    ),
  };
});

afterEach(cleanup);

describe("hotel and neighborhood guide navigation", () => {
  const regions = ["jerusalem", "telaviv", "haifa", "tiberias", "deadsea"] as const;

  it.each(regions)("shows four local guides followed by six unique onward guides for %s", (region) => {
    const { container } = render(<StayTripLinks region={region} currentPath="/accommodation/" />);
    const wrapper = screen.getByTestId("stay-trip-planning");
    const local = within(wrapper).getByTestId("stay-local-photo-grid");
    const onward = within(wrapper).getByTestId("stay-trip-photo-grid");
    expect(within(local).getAllByRole("link")).toHaveLength(4);
    expect(within(onward).getAllByRole("link")).toHaveLength(6);
    expect(within(local).getAllByRole("img")).toHaveLength(4);
    expect(within(onward).getAllByRole("img")).toHaveLength(6);

    const links = within(wrapper).getAllByRole("link");
    expect(links.every((item) => item.getAttribute("href")?.startsWith("/"))).toBe(true);
    expect(new Set(links.map((item) => item.getAttribute("href"))).size).toBe(10);

    const photos = within(wrapper).getAllByRole("img");
    expect(new Set(photos.map((item) => item.getAttribute("src"))).size).toBe(10);
    for (const image of photos) {
      expect(image.getAttribute("src")).toBeTruthy();
      expect(image.getAttribute("alt")?.length).toBeGreaterThan(10);
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image).toHaveAttribute("width", "600");
      expect(image).toHaveAttribute("height", "375");
    }

    const localTitle = within(wrapper).getByRole("heading", { name: `Explore more around ${stayGuideGroups[region].name}` });
    const onwardTitle = within(wrapper).getByRole("heading", { name: "Plan the rest of your trip" });
    expect(localTitle.compareDocumentPosition(onwardTitle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(wrapper).getAllByRole("heading", { name: "Plan the rest of your trip" })).toHaveLength(1);
    expect(container.textContent).not.toContain("More ways to plan your stay");
  });

  it("uses the requested four exact Jerusalem local subjects and separates the travel logistics", () => {
    render(<StayTripLinks region="jerusalem" />);
    const localLinks = within(screen.getByTestId("stay-local-photo-grid")).getAllByRole("link");
    expect(localLinks.map((item) => item.getAttribute("href"))).toEqual([
      "/travel-blog/museums-in-jerusalem/",
      "/travel-blog/shopping-in-jerusalem/",
      "/travel-blog/old-city-jerusalem/",
      "/travel-blog/jerusalem-travel-guide/",
    ]);
    const travelLinks = within(screen.getByTestId("stay-trip-photo-grid")).getAllByRole("link");
    expect(travelLinks[0]).toHaveAttribute("href", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/");
    expect(travelLinks[1]).toHaveAttribute("href", "/travel-blog/jerusalem-to-bethlehem/");
    expect(travelLinks[2]).toHaveAttribute("href", "/travel-blog/jerusalem-to-the-dead-sea/");
    expect(travelLinks[3]).toHaveAttribute("href", "/travel-blog/day-trips-from-jerusalem/");
  });

  it("removes a link to the currently displayed page without repeating it elsewhere", () => {
    render(<StayTripLinks region="jerusalem" currentPath="/travel-blog/jerusalem-to-the-dead-sea/" />);
    const links = within(screen.getByTestId("stay-trip-planning")).getAllByRole("link");
    expect(links.map((item) => item.getAttribute("href"))).not.toContain("/travel-blog/jerusalem-to-the-dead-sea/");
    expect(new Set(links.map((item) => item.getAttribute("href"))).size).toBe(links.length);
  });
});
