import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelStyleEditorialGuide } from "@/components/HotelStyleEditorialGuide";
import { deadSeaStayGuide } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => <a href={to} {...props}>{children}</a>,
}));
vi.mock("@/components/Guide", () => ({
  GuideHeader: ({ title, image }: { title: string; image: { src: string; alt: string } }) => <header><h1>{title}</h1><img src={image.src} alt={image.alt} /></header>,
  OnThisPage: ({ sections }: { sections: readonly (readonly [string, string])[] }) => <nav aria-label="On this page" data-sections={sections.map(([id]) => id).join(",")} />,
  FaqList: ({ faqs }: { faqs: { q: string; a: string }[] }) => <section id="faq" data-count={faqs.length} />,
  SourceList: ({ ids, intro }: { ids: string[]; intro: string }) => <section data-testid="deadsea-sources" data-ids={ids.join(",")} data-intro={intro} />,
}));
vi.mock("@/components/StayTripLinks", () => ({
  StayTripLinks: ({ region, presentation, currentPath }: { region: string; presentation: string; currentPath: string }) =>
    <section data-testid="related-guides" data-region={region} data-presentation={presentation} data-current={currentPath} />,
}));
vi.mock("@/components/HomeContactForm", () => ({
  HomeContactForm: () => <form aria-label="Standard contact form" />,
}));

afterEach(cleanup);

describe("Dead Sea category-first travel-blog hotel guide", () => {
  it("shows four category images, an Ein Gedi alternative and a comparison of all eleven unique hotels", () => {
    const { container } = render(<HotelStyleEditorialGuide guide={deadSeaStayGuide} />);
    expect(screen.getByRole("heading", { level: 1, name: "Best Dead Sea hotels: where to stay" })).toBeInTheDocument();
    const categories = screen.getAllByTestId("deadsea-category-card");
    expect(categories).toHaveLength(4);
    expect(categories.map(a => a.getAttribute("href"))).toEqual(["#group-luxury", "#group-spa", "#group-family", "#group-value"]);
    expect(categories.every(a => a.querySelector("img")?.getAttribute("src"))).toBe(true);
    expect(screen.getByTestId("deadsea-ein-gedi-spotlight")).toHaveAttribute("href", "#group-ein-gedi");
    expect(screen.getAllByTestId("deadsea-hotel-group")).toHaveLength(5);
    const expectedIds = deadSeaStayGuide.groups.flatMap(group => group.hotelIds);
    expect(expectedIds).toHaveLength(11);
    expect(new Set(expectedIds).size).toBe(11);
    expect(screen.getAllByTestId("deadsea-comparison-row")).toHaveLength(11);
    const cards = screen.getAllByTestId("deadsea-editorial-hotel-card");
    expect(cards).toHaveLength(11);
    for (const id of expectedIds) {
      expect(container.querySelector("#hotel-" + id)).toBeInTheDocument();
      expect(container.querySelector('a[href="#hotel-' + id + '"]')).toHaveTextContent(resortHotel(id).name);
    }
    expect(container.querySelectorAll('#location iframe')).toHaveLength(1);
    expect(screen.getAllByRole("listitem").filter(node => node.closest('#tips') !== null)).toHaveLength(8);
    expect(container).toHaveTextContent("Separate hotel and spa age rules");
    expect(container).toHaveTextContent("entry from 16");
    expect(container).toHaveTextContent("operating bathing beach");
    expect(container).not.toHaveTextContent("Oasis is strictly adults-only");
  });

  it("keeps every property-specific Travelpayouts link and category search link with per-page attribution", () => {
    const { container } = render(<HotelStyleEditorialGuide guide={deadSeaStayGuide} />);
    const pageId = "guide-best-dead-sea-hotels";
    const cards = screen.getAllByTestId("deadsea-editorial-hotel-card");
    const ids = deadSeaStayGuide.groups.flatMap(group => group.hotelIds);
    cards.forEach((card, index) => {
      const id = ids[index]!;
      const booking = hotelBooking(id)!;
      const link = within(card).getByTestId("deadsea-editorial-hotel-link");
      expect(link).toHaveAttribute("href", hotelAffiliateUrl(booking, pageId, id));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("sponsored"));
      expect(link).toHaveTextContent("Check rooms & rates");
      expect(link.getAttribute("aria-label")).toContain(resortHotel(id).name);
      expect(card.querySelector("img")).toBeInTheDocument();
    });
    expect(container.querySelectorAll('[data-testid="deadsea-editorial-hotel-link"]')).toHaveLength(11);
    for (const group of deadSeaStayGuide.groups) {
      const key = group.browsePageId ?? ("stay-deadsea-" + group.id + "-browse");
      const booking = linksForPage(key)[0]!;
      const section = container.querySelector("#group-" + group.id)!;
      expect(within(section as HTMLElement).getByRole("link", { name: /Browse more .* hotels|Browse more Ein Gedi stays/ })).toHaveAttribute("href", hotelBrowseAffiliateUrl(booking, pageId));
    }
    const overallLink = linksForPage("stay-deadsea-browse")[0]!;
    expect(screen.getByRole("link", { name: /Browse more Dead Sea hotels/ })).toHaveAttribute("href", hotelBrowseAffiliateUrl(overallLink, pageId));
  });

  it("retains the common editorial layout, holiday calendar, trip links, contact form and official hotel sources", () => {
    render(<HotelStyleEditorialGuide guide={deadSeaStayGuide} />);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav.getAttribute("data-sections")).toContain("choose,compare,hotels,location,tips,faq");
    expect(screen.getByRole("link", { name: "Israel calendar of events" })).toHaveAttribute("href", "/travel-blog/calendar-of-events/");
    expect(screen.getByTestId("related-guides")).toHaveAttribute("data-region", "deadsea");
    expect(screen.getByTestId("related-guides")).toHaveAttribute("data-presentation", "guide");
    expect(screen.getByTestId("related-guides")).toHaveAttribute("data-current", "/travel-blog/best-dead-sea-hotels/");
    expect(screen.getByRole("form", { name: "Standard contact form" })).toBeInTheDocument();
    const sourceList = screen.getByTestId("deadsea-sources");
    const sources = sourceList.getAttribute("data-ids")!.split(",");
    const hotels = deadSeaStayGuide.groups.flatMap(group => group.hotelIds);
    hotels.forEach(id => expect(sources).toContain(resortHotel(id).sourceId));
    expect(sources.length).toBeGreaterThanOrEqual(11);
    expect(sourceList).toHaveAttribute("data-intro", expect.stringContaining("Hotel facilities, access and age policies"));
  });
});
