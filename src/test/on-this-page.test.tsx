import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OnThisPage } from "@/components/Guide";

afterEach(cleanup);

const sections = Array.from({ length: 17 }, (_, index) => [
  `section-${index + 1}`,
  `Long descriptive section title number ${index + 1}`,
] as const);

describe("compact On this page navigation", () => {
  it("never needs more than three link rows at any responsive breakpoint", () => {
    const { container } = render(<OnThisPage sections={sections} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const grid = within(nav).getByRole("list", { name: "" });
    expect(grid).toHaveClass("grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5");
    const chips = [...grid.children] as HTMLElement[];
    expect(chips).toHaveLength(17);
    for (const [index, chip] of chips.entries()) {
      const expected = index >= 15 ? "hidden" : index >= 12 ? "xl:block" : index >= 9 ? "lg:block" : index >= 6 ? "sm:block" : "min-w-0";
      expect(chip).toHaveClass(expected);
    }
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

  it("does not show the overflow menu for six or fewer links", () => {
    render(<OnThisPage sections={sections.slice(0, 6)} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.querySelector("details")).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(6);
  });
});
