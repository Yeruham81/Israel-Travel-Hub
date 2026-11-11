import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OnThisPage, compactOnThisPageLabel } from "@/components/Guide";
import { travelGuides } from "@/data/travelGuides";

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

  it("shows short, meaningful labels while keeping full accessible titles and the overflow list", () => {
    const pairs = [
      ["passport-control", "What happens at passport control in Ben Gurion Airport?", "Passport control"],
      ["intercity-trains", "How can tourists use Israel Railways between cities?", "Intercity trains"],
      ["hillsides-and-heritage", "Add the Mount of Olives, Mount Zion or Ein Karem", "Mounts & Ein Karem"],
      ["booking-without-app", "How can I get a taxi without Gett or Yango?", "Without an app"],
      ["new-topic", "An unusually long heading about the local area", "New topic"],
    ] as const;
    const { container } = render(<OnThisPage sections={pairs.map(([id, full]) => [id, full] as const)} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    for (const [id, full, short] of pairs) {
      const chip = nav.querySelector(`ul.grid a[href="#${id}"]`);
      expect(chip).toHaveTextContent(short);
      expect(chip).toHaveAttribute("aria-label", full);
      expect(chip).toHaveAttribute("title", full);
    }
    expect(container.querySelector("ul.grid")).not.toHaveClass("overflow-x-auto");
  });

  it("derives compact navigation labels for every travel guide without truncating the heading", () => {
    for (const guide of Object.values(travelGuides)) {
      for (const section of guide.sections) {
        const short = compactOnThisPageLabel(section.id, section.title);
        expect(short.length, `${guide.id}/${section.id}: ${short}`).toBeLessThanOrEqual(23);
        expect(short.length).toBeGreaterThan(0);
      }
    }
  });

  it("does not show the overflow menu for ten or fewer links", () => {
    render(<OnThisPage sections={sections.slice(0, 10)} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.querySelector("details")).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(10);
  });
});
