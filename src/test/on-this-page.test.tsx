import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OnThisPage } from "@/components/Guide";

afterEach(cleanup);

const sections = Array.from({ length: 17 }, (_, index) => [
  `section-${index + 1}`,
  `Long descriptive section title number ${index + 1}`,
] as const);

describe("compact On this page navigation", () => {
  it("shows ten links in five mobile rows and more at wider breakpoints", () => {
    const { container } = render(<OnThisPage sections={sections} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const grid = nav.querySelector("ul.grid") as HTMLElement;
    expect(grid).toHaveClass("grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5");
    const chips = [...grid.children] as HTMLElement[];
    expect(chips).toHaveLength(17);
    for (const [index, chip] of chips.entries()) {
      const expected = index >= 15 ? "hidden" : index >= 12 ? "xl:block" : index >= 10 ? "lg:block" : "min-w-0";
      expect(chip).toHaveClass(expected);
    }
    expect(chips.slice(0, 10).every((chip) => !chip.classList.contains("hidden"))).toBe(true);
    expect(chips[10]).toHaveClass("hidden", "lg:block");
    expect(container.querySelector('nav[aria-label="On this page"]')).not.toHaveClass("overflow-x-auto");
  });

  it("keeps every section reachable in an accessible, compact overflow menu", () => {
    render(<OnThisPage sections={sections} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const details = nav.querySelector("details")!;
    expect(details).toBeInTheDocument();
    expect(details).not.toHaveAttribute("open");
    fireEvent.click(within(nav).getByText("All sections"));
    expect(details).toHaveAttribute("open");
    const menu = details.querySelector("ul")!;
    expect(menu.querySelectorAll("a")).toHaveLength(17);
    expect(menu.querySelector('a[href="#section-17"]')).toHaveTextContent("Long descriptive section title number 17");
  });

  it("does not show the overflow menu for ten or fewer links", () => {
    render(<OnThisPage sections={sections.slice(0, 10)} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.querySelector("details")).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(10);
  });
});
