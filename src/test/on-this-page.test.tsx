import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OnThisPage, compactOnThisPageLabel } from "@/components/Guide";
import { SourcesDisclosure } from "@/components/SourcesDisclosure";
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

  it("omits Sources from visible jump links and All sections, without removing other sections", () => {
    const withSources = [...sections.slice(0, 12), ["sources", "Sources"] as const, ...sections.slice(12)];
    const { container } = render(<OnThisPage sections={withSources} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(within(nav).queryByRole("link", { name: "Sources" })).not.toBeInTheDocument();
    expect(nav.querySelector('a[href="#sources"]')).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(17);
    const details = nav.querySelector("details")!;
    expect(details).toBeInTheDocument();
    fireEvent.click(within(nav).getByText("All sections"));
    expect(details).toHaveAttribute("open");
    expect(details.querySelector('a[href="#sources"]')).toBeNull();
    expect(details.querySelectorAll("a")).toHaveLength(17);
    expect(container.querySelector('a[href="#section-17"]')).toBeInTheDocument();
  });

  it("keeps the bottom Sources disclosure collapsed and user-expandable", () => {
    render(
      <>
        <OnThisPage sections={[["overview", "Overview"], ["sources", "Sources"]]} />
        <main>
          <section aria-label="Overview">Guide details</section>
          <SourcesDisclosure><a href="https://example.org/reference">Official reference</a></SourcesDisclosure>
        </main>
      </>
    );
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(within(nav).getAllByRole("link")).toHaveLength(1);
    expect(within(nav).queryByRole("link", { name: "Sources" })).not.toBeInTheDocument();
    const sources = document.querySelector("#sources")!;
    const details = sources.querySelector("details")!;
    expect(details).not.toHaveAttribute("open");
    expect(sources).toHaveTextContent("Official reference");
    fireEvent.click(within(sources as HTMLElement).getByText("Sources"));
    expect(details).toHaveAttribute("open");
    expect(within(sources as HTMLElement).getByRole("link", { name: "Official reference" })).toHaveAttribute("href", "https://example.org/reference");
  });

  it("filters Sources before computing the compact menu overflow threshold", () => {
    const entries = [...sections.slice(0, 10), ["sources", "Sources"] as const];
    const { rerender } = render(<OnThisPage sections={entries} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.querySelector("details")).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(10);
    rerender(<OnThisPage sections={[["sources", "Source references"], ...sections.slice(0, 10)]} />);
    expect(nav.querySelector('a[href="#sources"]')).toBeNull();
    expect(nav.querySelector("details")).toBeNull();
  });

  it("does not show the overflow menu for ten or fewer links", () => {
    render(<OnThisPage sections={sections.slice(0, 10)} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.querySelector("details")).toBeNull();
    expect(nav.querySelector("ul.grid")?.children).toHaveLength(10);
  });
});
