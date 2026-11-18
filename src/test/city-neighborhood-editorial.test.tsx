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
  FaqList: () => <section id="faq" />,
  SourceList: () => <section aria-label="Sources" />,
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
      const area = areas[i];
      const section = sections[i];
      expect(section.querySelector("figcaption")?.textContent).toBe(area.photo.alt);
      expect(section).not.toHaveTextContent("neighbourhood view");
      const button = within(section).getByRole("link", { name: new RegExp(`Browse hotels in ${area.shortName}`) });
      expect(button).toHaveAttribute("href", area.path);
      expect(button).toHaveClass("btn", "btn-primary");
      expect(button.parentElement).toHaveClass("justify-center");
    }
    expect(container).not.toHaveTextContent("Use these short summaries to narrow your options");
    expect(container).not.toHaveTextContent("Hotel selections are kept separately under Accommodation");
    expect(within(screen.getByTestId("city-neighborhood-editorial")).getByTestId("trip-links-props")).toHaveAttribute("data-presentation", "guide");
    expect(screen.getByRole("form", { name: "Standard contact form" })).toBeInTheDocument();
  });
});
