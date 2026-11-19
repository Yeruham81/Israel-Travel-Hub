import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StayTripLinks, stayGuideGroups } from "@/components/StayTripLinks";
import einGediWaterfall from "@/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp";
import deadSeaMudBathing from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";

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

  it.each(regions)("shows local guides followed by six unique onward guides for %s", (region) => {
    const { container } = render(<StayTripLinks region={region} currentPath="/accommodation/" />);
    const wrapper = screen.getByTestId("stay-trip-planning");
    const local = within(wrapper).getByTestId("stay-local-photo-grid");
    const onward = within(wrapper).getByTestId("stay-trip-photo-grid");
    const localCount = region === "jerusalem" || region === "telaviv" || region === "deadsea" || region === "tiberias" ? 6 : 4;
    expect(within(local).getAllByRole("link")).toHaveLength(localCount);
    expect(within(onward).getAllByRole("link")).toHaveLength(6);
    expect(within(local).getAllByRole("img")).toHaveLength(localCount);
    if (region === "jerusalem" || region === "telaviv" || region === "deadsea" || region === "tiberias") {
      expect(local).toHaveClass("grid-cols-2", "lg:grid-cols-3");
      expect(onward).toHaveClass("grid-cols-2", "lg:grid-cols-3");
    }
    expect(within(onward).getAllByRole("img")).toHaveLength(6);

    const links = within(wrapper).getAllByRole("link");
    expect(links.every((item) => item.getAttribute("href")?.startsWith("/"))).toBe(true);
    expect(new Set(links.map((item) => item.getAttribute("href"))).size).toBe(localCount + 6);

    const photos = within(wrapper).getAllByRole("img");
    expect(new Set(photos.map((item) => item.getAttribute("src"))).size).toBe(localCount + 6);
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

  it("keeps four original Jerusalem local subjects, adds Mount of Olives and churches, and separates travel logistics", () => {
    render(<StayTripLinks region="jerusalem" />);
    const localLinks = within(screen.getByTestId("stay-local-photo-grid")).getAllByRole("link");
    expect(localLinks.map((item) => item.getAttribute("href"))).toEqual([
      "/travel-blog/museums-in-jerusalem/",
      "/travel-blog/shopping-in-jerusalem/",
      "/attractions/old-city-jerusalem/",
      "/travel-blog/jerusalem-travel-guide/",
      "/attractions/mount-of-olives/",
      "/travel-blog/churches-in-jerusalem/",
    ]);
    const travelLinks = within(screen.getByTestId("stay-trip-photo-grid")).getAllByRole("link");
    expect(travelLinks[0]).toHaveAttribute("href", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/");
    expect(travelLinks[1]).toHaveAttribute("href", "/travel-blog/jerusalem-to-bethlehem/");
    expect(travelLinks[2]).toHaveAttribute("href", "/travel-blog/jerusalem-to-the-dead-sea/");
    expect(travelLinks[3]).toHaveAttribute("href", "/travel-blog/getting-around-israel/");
    expect(travelLinks.map((item) => item.getAttribute("href"))).not.toContain("/travel-blog/day-trips-from-jerusalem/");
  });

  it("includes six useful Tiberias-area guides and six onward travel cards", () => {
    render(<StayTripLinks region="tiberias" currentPath="/travel-blog/best-hotels-in-tiberias/" presentation="guide" />);
    const local = within(screen.getByTestId("stay-local-photo-grid")).getAllByRole("link");
    const onward = within(screen.getByTestId("stay-trip-photo-grid")).getAllByRole("link");
    expect(local).toHaveLength(6);
    expect(onward).toHaveLength(6);
    expect(local.map(item => item.getAttribute("href"))).toContain("/attractions/yardenit/");
    expect(local.map(item => item.getAttribute("href"))).toContain("/attractions/mount-of-beatitudes/");
    expect(onward.map(item => item.getAttribute("href"))).toContain("/attractions/mount-tabor/");
    expect(onward.map(item => item.getAttribute("href"))).toContain("/tours/nazareth-sea-of-galilee/");
    expect(new Set([...local, ...onward].map(item => item.querySelector("img")?.getAttribute("src"))).size).toBe(12);
  });

  it("shows six Dead Sea destination guides and six distinct onward guides", () => {
    render(<StayTripLinks region="deadsea" currentPath="/travel-blog/best-dead-sea-hotels/" presentation="guide" />);
    const local = within(screen.getByTestId("stay-local-photo-grid")).getAllByRole("link");
    const onward = within(screen.getByTestId("stay-trip-photo-grid")).getAllByRole("link");
    expect(local).toHaveLength(6);
    expect(onward).toHaveLength(6);
    expect(local.map(link => link.getAttribute("href"))).toContain("/tours/masada-dead-sea/");
    expect(local.map(link => link.getAttribute("href"))).toContain("/attractions/qasr-el-yahud/");
    const einGedi = local.find(link => link.getAttribute("href") === "/attractions/ein-gedi/")!;
    const attractions = local.find(link => link.getAttribute("href") === "/travel-blog/dead-sea-attractions/")!;
    const masada = local.find(link => link.getAttribute("href") === "/attractions/masada/")!;
    expect(einGedi.querySelector("img")).toHaveAttribute("src", einGediWaterfall);
    expect(einGedi.querySelector("img")).toHaveAttribute("alt", expect.stringContaining("Waterfall"));
    expect(attractions.querySelector("img")).toHaveAttribute("src", deadSeaMudBathing);
    expect(attractions.querySelector("img")).toHaveAttribute("alt", expect.stringContaining("mineral mud"));
    expect(attractions.querySelector("img")!.getAttribute("src")).not.toBe(masada.querySelector("img")!.getAttribute("src"));
    expect(onward.map(link => link.getAttribute("href"))).toContain("/travel-blog/calendar-of-events/");
  });

  it("removes a link to the currently displayed page without repeating it elsewhere", () => {
    render(<StayTripLinks region="jerusalem" currentPath="/travel-blog/jerusalem-to-the-dead-sea/" />);
    const links = within(screen.getByTestId("stay-trip-planning")).getAllByRole("link");
    expect(links.map((item) => item.getAttribute("href"))).not.toContain("/travel-blog/jerusalem-to-the-dead-sea/");
    expect(new Set(links.map((item) => item.getAttribute("href"))).size).toBe(links.length);
  });
});
