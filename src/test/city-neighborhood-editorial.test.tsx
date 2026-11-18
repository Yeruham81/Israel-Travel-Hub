import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cityStayGuides, neighborhoodGuidesForCity } from "@/data/content";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => <a href={to} {...props}>{children}</a>,
}));
vi.mock("@/components/Guide", () => ({
  GuideHeader: ({ title, image }: { title: string; image: { src: string; alt: string } }) => <header><h1>{title}</h1><img src={image.src} alt={image.alt} /></header>,
  OnThisPage: () => <nav aria-label="On this page" />,
  FaqList: ({ faqs }: { faqs: { q: string; a: string }[] }) => <section id="faq" data-faq-count={faqs.length} />,
  SourceList: ({ ids }: { ids: string[] }) => <section aria-label="Sources" data-testid="sources" data-ids={ids.join(",")} />,
}));
vi.mock("@/components/StayTripLinks", () => ({
  StayTripLinks: ({ region, presentation }: { region: string; presentation: string }) => <section data-testid="trip-links-props" data-region={region} data-presentation={presentation} />,
}));
vi.mock("@/components/HomeContactForm", () => ({
  HomeContactForm: () => <form aria-label="Standard contact form" />,
}));

afterEach(cleanup);

describe("Jerusalem and Tel Aviv neighbourhood editorial guides", () => {
  it.each(["jerusalem", "telaviv"] as const)("shows %s maps, image captions and hotel links without technical explanations", (region) => {
    const { container } = render(<CityNeighborhoodEditorial guide={cityStayGuides[region]} />);
    const areas = neighborhoodGuidesForCity(region);
    const sections = within(screen.getByTestId("city-neighborhood-editorial")).getAllByTestId("editorial-neighborhood");
    expect(sections).toHaveLength(region === "jerusalem" ? 6 : 8);
    expect(container.querySelectorAll('iframe[src^="https://maps.google.com/maps?"]')).toHaveLength(areas.length);
    expect(container.querySelectorAll('a[href*="google.com/maps"]')).toHaveLength(0);
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]!;
      const section = sections[i]!;
      expect(section.querySelector("figcaption")?.textContent).toBe(region === "jerusalem" && area.id === "old-city"
        ? "Narrow sandstone lane in Jerusalem's Jewish Quarter" : area.photo.alt);
      expect(section).not.toHaveTextContent("neighbourhood view");
      const button = within(section).getByRole("link", { name: new RegExp(`${region === "jerusalem" ? "Browse more hotels in " : "Browse hotels in "}${area.shortName}`) });
      expect(button).toHaveAttribute("href", area.path);
      expect(button).toHaveClass("btn", "btn-primary");
      expect(button.parentElement).toHaveClass("justify-center");
    }
    if (region === "jerusalem") {
      expect(container.querySelectorAll('[data-testid="jerusalem-practical-notes"]')).toHaveLength(6);
      expect(container).toHaveTextContent("Walking to Jaffa Gate");
      expect(container).toHaveTextContent("Choose the right gate");
      expect(container).toHaveTextContent("Market streets after dark");
      expect(container).not.toHaveTextContent("Worth considering");
      const navigation = screen.getByTestId("jerusalem-area-image-grid");
      expect(within(navigation).getAllByRole("link")).toHaveLength(6);
      expect(within(navigation).getAllByRole("img")).toHaveLength(6);
      expect(container.querySelector("#compare")).toBeNull();
      expect(within(container.querySelector("#choose")!).getByText(/Jerusalem is hilly/)).toBeInTheDocument();
      expect(container.querySelectorAll('[data-testid="jerusalem-area-highlights"]')).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-picks"]')).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-card"]')).toHaveLength(12);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-link"]')).toHaveLength(12);
      const hotelGrids = container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-grid"]');
      expect(hotelGrids).toHaveLength(6);
      for (const grid of hotelGrids) {
        expect(grid).toHaveClass("grid-cols-2");
        expect(grid.querySelectorAll("li")).toHaveLength(2);
        expect(grid.querySelectorAll("img")).toHaveLength(0);
        expect(grid.querySelectorAll("svg")).toHaveLength(4);
      }
      const bookingChecklist = screen.getByTestId("jerusalem-booking-checklist");
      expect(bookingChecklist).toHaveClass("rounded-2xl", "border", "bg-secondary/20", "sm:grid-cols-2");
      expect(bookingChecklist.querySelectorAll("li")).toHaveLength(8);
      expect(within(bookingChecklist).getByRole("heading", { name: "Check accessibility" })).toBeInTheDocument();
      expect(within(bookingChecklist).getByRole("heading", { name: "Read the full booking terms" })).toBeInTheDocument();
      for (const section of sections) {
        const heading = section.querySelector("h3[id$='-h']");
        const facts = section.querySelector('[data-testid="jerusalem-area-highlights"]');
        const paragraphs = section.querySelectorAll("p");
        expect(heading).toBeTruthy();
        expect(facts).toBeTruthy();
        expect(heading!.compareDocumentPosition(facts!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(Array.from(paragraphs).some((paragraph) => paragraph.textContent?.startsWith("Best for:"))).toBe(true);
        expect(within(section).getAllByTestId("jerusalem-editorial-hotel-card")).toHaveLength(2);
        expect(within(section).getByRole("heading", { name: /^Popular hotels in / })).toBeInTheDocument();
      }
      expect(container).not.toHaveTextContent("The maps show the general location of each area");
      expect(container).not.toHaveTextContent("Photos illustrate the surrounding neighbourhoods, not the hotels themselves");
      const layouts = container.querySelectorAll('[data-testid="jerusalem-area-layout"]');
      expect(layouts).toHaveLength(6);
      for (const layout of layouts) {
        expect(layout).toHaveClass("items-stretch");
        const textColumn = layout.children[0]!;
        const mediaColumn = layout.children[1]!;
        const hotelSection = textColumn.querySelector('[data-testid="jerusalem-editorial-hotel-picks"]');
        const mapHolder = mediaColumn.querySelector('[data-testid="jerusalem-area-map"]');
        const mapFrame = mapHolder?.querySelector("iframe");
        expect(hotelSection).toBeTruthy();
        expect(textColumn.lastElementChild).toBe(hotelSection);
        expect(hotelSection?.querySelectorAll('[data-testid="jerusalem-editorial-hotel-card"]')).toHaveLength(2);
        expect(mapHolder).toHaveClass("mt-6", "flex-1");
        expect(mapFrame).toHaveClass("min-h-44", "flex-1");
        expect(mediaColumn.querySelector("figure")).toBeTruthy();
      }
      expect(container).toHaveTextContent("Blue Line light-rail construction");
      expect(screen.getByTestId("sources")).toHaveAttribute("data-ids", expect.stringContaining("jerusalem-emek-refaim-works"));
      expect(container.querySelector("#faq")).toHaveAttribute("data-faq-count", "5");
    } else {
      expect(container.querySelector("#compare")).toBeInTheDocument();
      expect(container.querySelector('[data-testid="jerusalem-area-image-grid"]')).toBeNull();
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-card"]')).toHaveLength(0);
      expect(container.querySelector('[data-testid="jerusalem-area-layout"]')).toBeNull();
      expect(container.querySelector('[data-testid="jerusalem-booking-checklist"]')).toBeNull();
      expect(container.querySelectorAll('[data-testid="jerusalem-practical-notes"]')).toHaveLength(0);
      expect(container.querySelector("#faq")).toHaveAttribute("data-faq-count", "4");
    }
    expect(container).not.toHaveTextContent("Use these short summaries to narrow your options");
    expect(container).not.toHaveTextContent("Hotel selections are kept separately under Accommodation");
    expect(within(screen.getByTestId("city-neighborhood-editorial")).getByTestId("trip-links-props")).toHaveAttribute("data-presentation", "guide");
    expect(screen.getByRole("form", { name: "Standard contact form" })).toBeInTheDocument();
  });
});
