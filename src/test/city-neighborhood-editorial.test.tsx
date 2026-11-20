import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cityStayGuides, neighborhoodGuidesForCity } from "@/data/content";
import { jerusalemStaySourceIds } from "@/data/accommodationEditorial";
import { publicSources } from "@/data/registry";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import mamillaStreet from "@/assets/jerusalem/mamilla.webp";
import eastJerusalemHouse from "@/assets/jerusalem/east-jerusalem-house.webp";
import oldCityStoneLane from "@/assets/guides/2026-11/jerusalem-jewish-quarter-stone-lane.webp";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => <a href={to} {...props}>{children}</a>,
}));
vi.mock("@/components/Guide", () => ({
  GuideHeader: ({ title, image }: { title: string; image: { src: string; alt: string } }) => <header><h1>{title}</h1><img src={image.src} alt={image.alt} /></header>,
  OnThisPage: () => <nav aria-label="On this page" />,
  FaqList: ({ faqs }: { faqs: { q: string; a: string }[] }) => <section id="faq" data-faq-count={faqs.length} />,
  SourceList: ({ ids, intro }: { ids: string[]; intro?: string }) => <section aria-label="Sources" data-testid="sources" data-ids={ids.join(",")} data-intro={intro} />,
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
      const gridId = region === "jerusalem" ? "jerusalem-area-image-grid" : "telaviv-area-image-grid";
      const cardImage = screen.getByTestId(gridId).querySelector(`a[href="#area-${area.id}"] img`);
      expect(cardImage).toBeTruthy();
      expect(cardImage).toHaveAttribute("alt", expect.any(String));
      expect(cardImage?.getAttribute("alt")).toBeTruthy();
      expect(section.querySelector("figure img")).toHaveAttribute("src", cardImage?.getAttribute("src"));
      expect(section.querySelector("figcaption")).toHaveTextContent(cardImage?.getAttribute("alt") || "");
      expect(section).not.toHaveTextContent("neighbourhood view");
      const button = within(section).getByRole("link", { name: new RegExp(`Browse more hotels in ${area.shortName}`) });
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
      const eastJerusalemCard = navigation.querySelector('a[href="#area-east-jerusalem"] img');
      expect(eastJerusalemCard).toHaveAttribute("src", eastJerusalemHouse);
      expect(navigation.querySelector('a[href="#area-old-city"] img')).toHaveAttribute("src", oldCityStoneLane);
      expect(container.querySelector('img[src*="old-city-BJwjTGND"]')).toBeNull();
      expect(container.querySelector("#compare")).toBeNull();
      expect(navigation.querySelector('a[href="#area-mamilla"] img')).toHaveAttribute("src", mamillaStreet);
      expect(navigation.querySelector('a[href="#area-german-colony"] img')).toHaveAttribute("src", "/images/city-stays/jerusalem-german-colony.webp");
      expect(within(container.querySelector("#choose")!).getByText(/Jerusalem is hilly/)).toBeInTheDocument();
      expect(container.querySelectorAll('[data-testid="jerusalem-area-highlights"]')).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-picks"]')).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-card"]')).toHaveLength(12);
      expect(container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-link"]')).toHaveLength(12);
      for (const link of container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-link"]')) {
        expect(link.getAttribute("aria-label")).toMatch(/^Check rooms and rates for .+ on Expedia \(opens in a new tab\)$/);
      }
      const hotelGrids = container.querySelectorAll('[data-testid="jerusalem-editorial-hotel-grid"]');
      expect(hotelGrids).toHaveLength(6);
      for (const grid of hotelGrids) {
        expect(grid).toHaveClass("grid-cols-2");
        expect(grid.querySelectorAll("li")).toHaveLength(2);
        expect(grid.querySelectorAll("img")).toHaveLength(0);
        expect(grid.querySelectorAll("svg")).toHaveLength(6);
        expect(grid.querySelectorAll('[data-testid="hotel-type"]')).toHaveLength(2);
        expect(grid.querySelectorAll('[data-testid="hotel-location"]')).toHaveLength(2);
        expect(grid.querySelectorAll('[data-testid="hotel-highlight"]')).toHaveLength(2);
        const cards = grid.querySelectorAll('[data-testid="jerusalem-editorial-hotel-card"]');
        for (const card of cards) {
          const wholeCardLink = card.querySelector('[data-testid="jerusalem-editorial-hotel-link"]');
          expect(wholeCardLink?.tagName).toBe("A");
          expect(wholeCardLink).toHaveClass("flex", "h-full", "flex-col", "group");
          expect(card.querySelectorAll("a")).toHaveLength(1);
          expect(wholeCardLink).toHaveTextContent("Check rooms & rates");
          expect(wholeCardLink?.querySelector('[data-testid="hotel-highlight"]')?.textContent?.trim()).toBeTruthy();
        }
      }
      const bookingChecklist = screen.getByTestId("jerusalem-booking-checklist");
      expect(bookingChecklist).toHaveClass("grid", "sm:grid-cols-2");
      expect([...bookingChecklist.children]).toHaveLength(2);
      for (const card of bookingChecklist.children) expect(card).toHaveClass("rounded-2xl", "border", "bg-secondary/35");
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
        const popularHotelsHeading = within(section).getByRole("heading", { name: /^Popular hotels in / });
        expect(popularHotelsHeading).toBeInTheDocument();
        expect(popularHotelsHeading.querySelector("svg")).toBeNull();
        const area = areas.find((candidate) => candidate.name === heading!.textContent)!;
        const hotelCards = within(section).getAllByTestId("jerusalem-editorial-hotel-card");
        const hotels = hotelsForArea(area.id, "jerusalem").slice(0, 2);
        const bookingOffers = linksForPage(`stay-area-${area.id}`);
        expect(hotels).toHaveLength(2);
        hotelCards.forEach((card, index) => {
          const hotel = hotels[index]!;
          const booking = bookingOffers.find((offer) => offer.id === `hotel-${hotel.id}-expedia`)!;
          const cardLink = within(card).getByTestId("jerusalem-editorial-hotel-link");
          expect(cardLink).toHaveAttribute("href", hotelAffiliateUrl(booking, "guide-where-to-stay-jerusalem", hotel.id));
          expect(cardLink).toHaveAttribute("target", "_blank");
          expect(cardLink).toHaveTextContent(hotel.name);
        });
      }
      expect(container).not.toHaveTextContent("The maps show the general location of each area");
      expect(container).not.toHaveTextContent("Photos illustrate the surrounding neighbourhoods, not the hotels themselves");
      expect(container).toHaveTextContent("Hotels and booking websites are independent providers.");
      expect(container).not.toHaveTextContent("Check the exact property address, room type, total price and cancellation terms with the provider before booking.");
      expect(container).toHaveTextContent("If western Downtown restaurants and Mahane Yehuda nightlife are your priority");
      expect(container).toHaveTextContent("holiday dates that may affect local services");
      const layouts = container.querySelectorAll('[data-testid="jerusalem-area-layout"]');
      expect(layouts).toHaveLength(6);
      for (const section of sections) {
        expect(section.querySelector("figure img")).toHaveAttribute("alt", "");
        expect(section.querySelector("figure figcaption")?.textContent).toBeTruthy();
      }
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
      expect(container.querySelector("#compare")).toBeNull();
      const navigation = screen.getByTestId("telaviv-area-image-grid");
      expect(within(navigation).getAllByRole("link")).toHaveLength(8);
      expect(within(navigation).getAllByRole("img")).toHaveLength(8);
      expect(navigation).toHaveClass("lg:grid-cols-4");
      expect(navigation.querySelector('a[href="#area-telaviv-beachfront"] img')).toHaveAttribute("src", "/images/city-stays/tel-aviv-beachfront.webp");
      expect(navigation.querySelector('a[href="#area-telaviv-dizengoff"] img')).toHaveAttribute("src", "/images/city-stays/tel-aviv-dizengoff.webp");
      expect(navigation.querySelector('a[href="#area-telaviv-jaffa"] img')).toHaveAttribute("src", "/images/city-stays/tel-aviv-jaffa.webp");
      expect(navigation.querySelector('a[href="#area-telaviv-old-north"] img')).toHaveAttribute("src", areas.find((area) => area.id === "telaviv-old-north")?.photo.src);
      expect(navigation.querySelector('a[href="#area-telaviv-rothschild"] img')).toHaveAttribute("src", areas.find((area) => area.id === "telaviv-rothschild")?.photo.src);
      const photoSources = within(navigation).getAllByRole("img").map((img) => img.getAttribute("src"));
      expect(new Set(photoSources).size).toBe(8);
      expect(container.querySelectorAll('[data-testid="telaviv-practical-notes"]')).toHaveLength(8);
      expect(container.querySelectorAll('[data-testid="telaviv-area-highlights"]')).toHaveLength(8);
      expect(container.querySelectorAll('[data-testid="telaviv-area-layout"]')).toHaveLength(8);
      expect(container.querySelectorAll('[data-testid="telaviv-area-map"]')).toHaveLength(8);
      expect(container.querySelectorAll('[data-testid="telaviv-editorial-hotel-picks"]')).toHaveLength(8);
      expect(container.querySelectorAll('[data-testid="telaviv-editorial-hotel-card"]')).toHaveLength(16);
      const cards = container.querySelectorAll('[data-testid="telaviv-editorial-hotel-link"]');
      expect(cards).toHaveLength(16);
      for (const card of cards) {
        expect(card).toHaveTextContent("Check rooms & rates");
        expect(card).toHaveAttribute("target", "_blank");
        expect(card.querySelector('[data-testid="hotel-highlight"]')?.textContent?.trim()).toBeTruthy();
        const hotelType = card.querySelector<HTMLElement>('[data-testid="hotel-type"]');
        const words = hotelType?.textContent?.trim().split(/\s+/) ?? [];
        expect(words.length).toBeGreaterThanOrEqual(2);
        expect(words.length).toBeLessThanOrEqual(3);
        expect(hotelType).toHaveClass("whitespace-nowrap", "truncate");
      }
      expect(container).not.toHaveTextContent("Historic cinema building on Dizengoff Square");
      expect(container).not.toHaveTextContent("Luxury heritage hotel in Old Jaffa");
      expect(container).not.toHaveTextContent("Small hotel with digital self check-in");
      for (const area of areas) {
        const section = container.querySelector('#area-' + area.id)!;
        const hotelCards = within(section as HTMLElement).getAllByTestId("telaviv-editorial-hotel-card");
        expect(hotelCards).toHaveLength(2);
        expect(section.querySelector("figure img")).toHaveAttribute("alt", "");
        expect(section.querySelector("figure figcaption")?.textContent).toBeTruthy();
        expect(section.querySelector('[data-testid="telaviv-area-map"]')).toHaveClass("mt-6", "flex-1");
        expect(section.querySelector('[data-testid="telaviv-area-layout"]')).toHaveClass("items-stretch");
        const hotels = hotelsForArea(area.id, "telaviv").slice(0, 2);
        const bookingOffers = linksForPage('stay-area-' + area.id);
        hotelCards.forEach((card, index) => {
          const hotel = hotels[index]!;
          const booking = bookingOffers.find((offer) => offer.id === 'hotel-' + hotel.id + '-expedia')!;
          const link = within(card).getByTestId("telaviv-editorial-hotel-link");
          expect(link).toHaveAttribute("href", hotelAffiliateUrl(booking, "guide-where-to-stay-tel-aviv", hotel.id));
          expect(link).toHaveTextContent(hotel.name);
        });
      }
      const bookingChecklist = screen.getByTestId("telaviv-booking-checklist");
      expect(bookingChecklist).toHaveClass("grid", "sm:grid-cols-2");
      expect([...bookingChecklist.children]).toHaveLength(2);
      for (const card of bookingChecklist.children) expect(card).toHaveClass("rounded-2xl", "border", "bg-secondary/35");
      expect(bookingChecklist.querySelectorAll("li")).toHaveLength(8);
      expect(within(bookingChecklist).getByRole("heading", { name: "Book the right view" })).toBeInTheDocument();
      expect(container).toHaveTextContent("Hills, steps & luggage");
      expect(container).toHaveTextContent("Nightlife & room noise");
      expect(container).toHaveTextContent("Hotels and booking websites are independent providers.");
      expect(container.querySelector("#faq")).toHaveAttribute("data-faq-count", "4");
    }
    expect(screen.getByTestId("sources")).toHaveAttribute("data-intro", region === "jerusalem"
      ? "Transport and access information for planning your stay."
      : "Neighbourhood and accommodation information for planning your stay.");
    expect(container).not.toHaveTextContent("Use these short summaries to narrow your options");
    expect(container).not.toHaveTextContent("Hotel selections are kept separately under Accommodation");
    expect(within(screen.getByTestId("city-neighborhood-editorial")).getByTestId("trip-links-props")).toHaveAttribute("data-presentation", "guide");
    expect(screen.getByRole("form", { name: "Standard contact form" })).toBeInTheDocument();
  });
});

describe("Jerusalem accommodation guide structured data", () => {
  it("uses the same public sources for visible guide citations and Article JSON-LD", () => {
    const guide = cityStayGuides.jerusalem;
    const meta = hotelEditorialMeta(guide, "jerusalem", "/example-hero.webp");
    const article = JSON.parse(meta.scripts[meta.scripts.length - 1]!.children);
    const expectedSources = publicSources([...guide.sourceIds, ...jerusalemStaySourceIds]).map((source) => source.url);
    expect(expectedSources.length).toBeGreaterThan(0);
    expect(article["@type"]).toBe("Article");
    expect(article.citation).toEqual(expectedSources);
  });
});
