import "@/test/consent-fixture";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { regionalHotelAreas } from "@/components/ResortHotelBrowser";
import {
  deadSeaStayGuide,
  haifaStayGuide,
  tiberiasStayGuide,
  hotelCategoryGuides,
} from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";

vi.mock("@tanstack/react-router", async () => {
  const actual =
    await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({
      to,
      hash,
      children,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & {
      to: string;
      hash?: string;
      children?: ReactNode;
    }) => (
      <a href={hash ? to + "#" + hash : to} {...props}>
        {children}
      </a>
    ),
  };
});
afterEach(cleanup);

const destinations = [haifaStayGuide, tiberiasStayGuide, deadSeaStayGuide];

describe.each(destinations)("Regional accommodation: $name", (guide) => {
  const ids = guide.groups.flatMap((group) => group.hotelIds);
  const areas = regionalHotelAreas[guide.id]!;
  const categoryGuides = hotelCategoryGuides.filter(
    (category) => category.destinationId === guide.id,
  );

  it("places the six-card booking catalog first while retaining all unique hotels and location groups", () => {
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(areas.flatMap((area) => area.hotelIds))).toEqual(new Set(ids));
    expect(areas.flatMap((area) => area.hotelIds)).toHaveLength(ids.length);

    const { container } = render(<HotelDestinationPage guide={guide} />);
    const catalog = screen.getByTestId("regional-hotel-browser");
    expect(within(catalog).getAllByTestId("hotel-recommendation")).toHaveLength(6);
    expect(within(catalog).getByTestId("regional-hotel-count")).toHaveTextContent(
      `Showing 6 of ${ids.length} hotels`,
    );
    expect(
      container
        .querySelector("#book")!
        .compareDocumentPosition(container.querySelector("#categories")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      container
        .querySelector("#categories")!
        .compareDocumentPosition(container.querySelector("#location")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(container.querySelector("#location iframe")).toHaveAttribute(
      "src",
      expect.stringContaining("https://maps.google.com/maps?"),
    );

    fireEvent.click(within(catalog).getByRole("button", { name: `Show all ${ids.length} hotels` }));
    const cards = within(catalog).getAllByTestId("hotel-recommendation");
    expect(cards).toHaveLength(ids.length);
    for (const id of ids) {
      const card = cards.find((node) => node.id === `hotel-${id}`)!;
      expect(card).toBeDefined();
      const offer = hotelBooking(id)!;
      expect(
        within(card).getByRole("link", { name: `${offer.ctaLabel} for ${resortHotel(id).name}` }),
      ).toHaveAttribute("href", hotelAffiliateUrl(offer, `stay-${guide.id}`, id));
    }
    expect(new Set(cards.map((card) => card.id)).size).toBe(ids.length);
  });

  it("supports style and location filters, combined filtering and alphabetical sorting", () => {
    render(<HotelDestinationPage guide={guide} />);
    const catalog = screen.getByTestId("regional-hotel-browser");
    const styles = within(catalog).getByRole("group", {
      name: `Filter ${guide.name} hotels by style`,
    });
    const locations = within(catalog).getByRole("group", {
      name: `Filter ${guide.name} hotels by location`,
    });
    const firstGroup = guide.groups[0]!;
    const firstArea = areas[0]!;
    const firstButton = within(styles).getAllByRole("button")[1]!;
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-pressed", "true");
    expect(within(catalog).getAllByTestId("hotel-recommendation")).toHaveLength(
      firstGroup.hotelIds.length,
    );
    if (firstGroup.guidePath) {
      expect(
        within(catalog).getByRole("link", { name: /Compare .* hotels in detail/ }),
      ).toHaveAttribute("href", firstGroup.guidePath);
    }

    fireEvent.click(within(locations).getByRole("button", { name: firstArea.label }));
    const intersection = firstGroup.hotelIds.filter((id) => firstArea.hotelIds.includes(id));
    expect(within(catalog).queryAllByTestId("hotel-recommendation")).toHaveLength(
      intersection.length,
    );
    fireEvent.click(within(catalog).getByRole("button", { name: `View all ${guide.name} hotels` }));
    expect(within(catalog).getAllByTestId("hotel-recommendation")).toHaveLength(6);

    fireEvent.change(within(catalog).getByRole("combobox", { name: "Sort hotels" }), {
      target: { value: "name" },
    });
    fireEvent.click(within(catalog).getByRole("button", { name: `Show all ${ids.length} hotels` }));
    const names = within(catalog)
      .getAllByTestId("hotel-recommendation")
      .map((item) => item.querySelector("h3")!.textContent!);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("links to the full editorial hotel guide and preserves two category guides and their hero photos", () => {
    const { container } = render(<HotelDestinationPage guide={guide} />);
    const editorial = accommodationEditorial[guide.id as "haifa" | "tiberias" | "deadsea"];
    const link = screen.getByTestId("regional-editorial-guide-link");
    expect(link).toHaveAttribute("href", editorial.path);
    const hero = guideHeroPhotoForPath(editorial.path);
    if (hero) expect(container.querySelector("#guide img")).toHaveAttribute("src", hero.src);
    const cards = screen.getAllByTestId("stay-category-card");
    expect(cards).toHaveLength(2);
    for (const item of categoryGuides) {
      const card = cards.find((node) => node.getAttribute("href") === item.path)!;
      expect(card).toBeDefined();
      expect(card.querySelector("img")).toHaveAttribute("src", item.photo.src);
    }
    expect(container.querySelectorAll('a[href^="/accommodation/"]')).not.toHaveLength(0);
    expect(container.querySelector("#more-stays")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});

it("keeps every style mapped once and exactly three location zones in all regional catalogs", () => {
  for (const guide of destinations) {
    expect(guide.groups.length).toBeGreaterThanOrEqual(4);
    expect(regionalHotelAreas[guide.id]).toHaveLength(3);
    expect(new Set(guide.groups.map((group) => group.id)).size).toBe(guide.groups.length);
    const officialIds = guide.groups.flatMap((group) => group.hotelIds);
    expect(new Set(regionalHotelAreas[guide.id]!.flatMap((area) => area.hotelIds))).toEqual(
      new Set(officialIds),
    );
  }
});
