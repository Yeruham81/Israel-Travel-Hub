import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StayTripLinks } from "@/components/StayTripLinks";

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

describe("hotel and neighbourhood trip-planning cards", () => {
  const regions = ["jerusalem", "telaviv", "haifa", "tiberias", "deadsea"] as const;

  it.each(regions)("illustrates four locally relevant guides for %s with real licensed photos", (region) => {
    const { container } = render(<StayTripLinks region={region} currentPath="/accommodation/" />);
    const section = screen.getByTestId("stay-trip-planning");
    expect(within(section).getByRole("heading", { name: "Plan the rest of your trip" })).toBeInTheDocument();
    const grid = within(section).getByTestId("stay-trip-photo-grid");
    const cards = within(grid).getAllByRole("link");
    expect(cards).toHaveLength(4);
    expect(within(grid).getAllByRole("img")).toHaveLength(4);
    expect(cards.every((link) => link.getAttribute("href")?.startsWith("/"))).toBe(true);
    expect(new Set(cards.map((link) => link.getAttribute("href"))).size).toBe(4);
    for (const img of within(grid).getAllByRole("img")) {
      expect(img.getAttribute("src")).toBeTruthy();
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img).toHaveAttribute("width", "600");
      expect(img).toHaveAttribute("height", "340");
    }
    expect(container.querySelectorAll("a[href^='https://']")).toHaveLength(0);
  });

  it("retains useful service links as compact navigation and removes duplicate/self links", () => {
    const { container } = render(<StayTripLinks
      region="jerusalem"
      currentPath="/travel-blog/from-ben-gurion-airport-on-shabbat/"
      extras={[
        { label: "All accommodation", to: "/accommodation/" },
        { label: "Car rental", to: "/car-rental/" },
        { label: "Masada duplicate", to: "/travel-blog/masada/" },
      ]}
    />);
    const section = screen.getByTestId("stay-trip-planning");
    const rendered = within(section).getAllByRole("link");
    const destinations = rendered.map((link) => link.getAttribute("href"));
    expect(destinations).not.toContain("/travel-blog/from-ben-gurion-airport-on-shabbat/");
    expect(destinations).toContain("/car-rental/");
    expect(destinations).toContain("/accommodation/");
    expect(destinations.filter((link) => link === "/travel-blog/masada/")).toHaveLength(1);
    expect(new Set(destinations).size).toBe(destinations.length);
    expect(within(section).getByRole("navigation", { name: "More trip planning options" })).toBeInTheDocument();
    expect(container.textContent).not.toContain("Masada duplicate");
  });
});
