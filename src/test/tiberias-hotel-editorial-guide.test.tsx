import "@/test/consent-fixture";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TiberiasHotelEditorialGuide } from "@/components/TiberiasHotelEditorialGuide";
import { tiberiasStayGuide } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/Guide", () => ({
  GuideHeader: ({ title, image }: { title: string; image: { src: string; alt: string } }) => (
    <header>
      <h1>{title}</h1>
      <img src={image.src} alt={image.alt} />
    </header>
  ),
  OnThisPage: ({ sections }: { sections: readonly (readonly [string, string])[] }) => (
    <nav aria-label="On this page" data-sections={sections.map(([id]) => id).join(",")} />
  ),
  FaqList: ({ faqs }: { faqs: { q: string; a: string }[] }) => (
    <section id="faq" data-count={faqs.length} />
  ),
  SourceList: ({ ids, intro }: { ids: string[]; intro: string }) => (
    <section data-testid="tiberias-sources" data-ids={ids.join(",")} data-intro={intro} />
  ),
}));
vi.mock("@/components/StayTripLinks", () => ({
  StayTripLinks: ({ region, currentPath }: { region: string; currentPath: string }) => (
    <section data-testid="related-guides" data-region={region} data-current={currentPath} />
  ),
}));
vi.mock("@/components/HomeContactForm", () => ({
  HomeContactForm: ({ guide }: { guide: { heading: string; introduction: string } }) => (
    <form
      aria-label="Standard contact form"
      data-heading={guide.heading}
      data-intro={guide.introduction}
    />
  ),
}));
afterEach(cleanup);

describe("Tiberias hotel editorial", () => {
  it("renders four distinct travel-style categories, ten hotel cards, Google Maps and two helpful tip cards", () => {
    const { container } = render(<TiberiasHotelEditorialGuide guide={tiberiasStayGuide} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "The best hotels in Tiberias: where to stay" }),
    ).toBeInTheDocument();
    const categories = screen.getAllByTestId("tiberias-category-card");
    expect(categories).toHaveLength(4);
    expect(screen.getByTestId("tiberias-category-grid")).toHaveClass(
      "min-[360px]:grid-cols-2",
      "lg:grid-cols-2",
    );
    expect(categories.map((card) => card.getAttribute("href"))).toEqual([
      "#group-luxury",
      "#group-family",
      "#group-central",
      "#group-budget",
    ]);
    expect(
      new Set(categories.map((card) => card.querySelector("img")?.getAttribute("src"))).size,
    ).toBe(4);
    const groups = screen.getAllByTestId("tiberias-hotel-group");
    expect(groups).toHaveLength(4);
    for (const group of groups) {
      expect(within(group).getByTestId("tiberias-hotel-grid")).toHaveClass(
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      );
      expect(within(group).queryAllByTestId("tiberias-category-tip")).toHaveLength(
        ["group-family", "group-budget"].includes(group.id) ? 1 : 0,
      );
    }
    expect(screen.getAllByTestId("tiberias-category-tip")).toHaveLength(2);
    const ids = tiberiasStayGuide.groups.flatMap((group) => group.hotelIds);
    expect(ids).toHaveLength(10);
    expect(new Set(ids).size).toBe(10);
    expect(screen.getAllByTestId("tiberias-comparison-row")).toHaveLength(10);
    const cards = screen.getAllByTestId("tiberias-editorial-hotel-card");
    expect(cards).toHaveLength(10);
    expect(new Set(cards.map((card) => card.querySelector("img")?.getAttribute("src"))).size).toBe(
      10,
    );
    for (const id of ids) {
      expect(container.querySelector("#hotel-" + id)).toBeInTheDocument();
      expect(container.querySelector('a[href="#hotel-' + id + '"]')).toHaveTextContent(
        resortHotel(id).name,
      );
    }
    expect(resortHotelPhoto("tib-tiberia").src).not.toBe(tiberiasStayGuide.photo.src);
    expect(container.querySelector("#location iframe")).toHaveAttribute(
      "src",
      expect.stringMatching(/^https:\/\/maps\.google\.com\/maps\?.*z=13/),
    );
    expect(container).toHaveTextContent("The hotel currently offers full-board accommodation.");
    expect(container).toHaveTextContent("Guests must be aged 12 or older");
    expect(screen.getAllByTestId("tiberias-hotel-facility-notice")).toHaveLength(3);
    expect(container).toHaveTextContent("The private beach closed on October 4, 2026");
    expect(container).toHaveTextContent(
      "The seasonal outdoor pool is closed from November 1, 2026",
    );
    expect(container).toHaveTextContent("currently offers full-board stays");
    expect(container).not.toHaveTextContent("Select a hotel name to jump");
  });

  it("keeps direct Expedia Travelpayouts links and category-level attribution", () => {
    const { container } = render(<TiberiasHotelEditorialGuide guide={tiberiasStayGuide} />);
    const pageId = "guide-best-hotels-in-tiberias";
    const ids = tiberiasStayGuide.groups.flatMap((group) => group.hotelIds);
    screen.getAllByTestId("tiberias-editorial-hotel-card").forEach((card, i) => {
      const id = ids[i]!;
      const link = within(card).getByTestId("tiberias-editorial-hotel-link");
      expect(link).toHaveAttribute("href", hotelAffiliateUrl(hotelBooking(id)!, pageId, id));
      expect(link).toHaveAttribute("rel", expect.stringContaining("sponsored"));
      expect(link).toHaveTextContent("Check rooms & rates");
      const map = within(card).getByTestId("tiberias-hotel-map-link");
      expect(map).toHaveAttribute("href", hotelGoogleMapsUrl(resortHotel(id)));
      expect(map).toHaveAttribute("target", "_blank");
      expect(map).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(map).toHaveTextContent("View location on Google Maps");
    });
    for (const group of tiberiasStayGuide.groups) {
      const booking = linksForPage(
        group.browsePageId ?? "stay-tiberias-" + group.id + "-browse",
      )[0]!;
      const link = within(container.querySelector("#group-" + group.id) as HTMLElement).getByTestId(
        "tiberias-category-browse-link",
      );
      expect(link).toHaveAttribute("href", hotelBrowseAffiliateUrl(booking, pageId));
      expect(link).toHaveClass("bg-primary", "text-primary-foreground");
      expect(link.parentElement).toHaveClass("justify-center");
    }
    expect(screen.getByRole("link", { name: /Browse more Tiberias hotels/ })).toHaveAttribute(
      "href",
      hotelBrowseAffiliateUrl(linksForPage("stay-tiberias-browse")[0]!, pageId),
    );
  });

  it("includes regional sightseeing, the holiday calendar, contact and hotel source links", () => {
    const { container } = render(<TiberiasHotelEditorialGuide guide={tiberiasStayGuide} />);
    for (const [name, href] of [
      ["Magdala", "/attractions/magdala/"],
      ["Capernaum", "/attractions/capernaum/"],
      ["Tabgha", "/attractions/tabgha/"],
      ["Mount of Beatitudes", "/attractions/mount-of-beatitudes/"],
      ["Sea of Galilee guide", "/attractions/sea-of-galilee/"],
    ] as const)
      expect(
        within(container.querySelector("#location") as HTMLElement).getByRole("link", { name }),
      ).toHaveAttribute("href", href);
    expect(screen.getByRole("link", { name: "Israel calendar of events" })).toHaveAttribute(
      "href",
      "/travel-blog/calendar-of-events/",
    );
    expect(screen.getByTestId("related-guides")).toHaveAttribute("data-region", "tiberias");
    expect(screen.getByTestId("related-guides")).toHaveAttribute(
      "data-current",
      "/travel-blog/best-hotels-in-tiberias/",
    );
    expect(screen.getByRole("form", { name: "Standard contact form" })).toHaveAttribute(
      "data-heading",
      "Need private transport to Tiberias?",
    );
    const ids = screen.getByTestId("tiberias-sources").getAttribute("data-ids")!.split(",");
    for (const id of tiberiasStayGuide.groups.flatMap((group) => group.hotelIds))
      expect(ids).toContain(resortHotel(id).sourceId);
  });
});
