import "@/test/consent-fixture";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HotelStyleEditorialGuide } from "@/components/HotelStyleEditorialGuide";
import { deadSeaStayGuide } from "@/data/content";
import { linksForPage } from "@/data/registry";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";

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
  HomeContactForm: ({ guide }: { guide: { heading: string; introduction: string; placeholder: string } }) => <form aria-label="Standard contact form" data-heading={guide.heading} data-intro={guide.introduction} data-placeholder={guide.placeholder} />,
}));

afterEach(cleanup);

describe("Dead Sea category-first travel-blog hotel guide", () => {
  it("shows four category images, an Ein Gedi alternative and a comparison of all eleven unique hotels", () => {
    const { container } = render(<HotelStyleEditorialGuide guide={deadSeaStayGuide} />);
    expect(screen.getByRole("heading", { level: 1, name: "Best Dead Sea hotels: where to stay" })).toBeInTheDocument();
    const categories = screen.getAllByTestId("deadsea-category-card");
    expect(categories).toHaveLength(4);
    expect(screen.getByTestId("deadsea-category-grid")).toHaveClass("min-[360px]:grid-cols-2", "lg:grid-cols-3");
    expect(categories.map(a => a.getAttribute("href"))).toEqual(["#group-luxury", "#group-spa", "#group-family", "#group-value"]);
    expect(categories.every(a => a.querySelector("img")?.getAttribute("src"))).toBe(true);
    const categoryImages = categories.map(card => card.querySelector("img")!.getAttribute("src"));
    expect(new Set(categoryImages).size).toBe(4);
    expect(categoryImages).not.toContain(deadSeaStayGuide.photo.src);
    expect(categoryImages).not.toContain(resortHotelPhoto("ds-leonardo-club").src);
    expect(resortHotelPhoto("ds-leonardo-club").src).not.toBe(deadSeaStayGuide.photo.src);
    expect(screen.getByTestId("deadsea-ein-gedi-spotlight")).toHaveAttribute("href", "#group-ein-gedi");
    expect(screen.getAllByTestId("deadsea-hotel-group")).toHaveLength(5);
    for (const group of screen.getAllByTestId("deadsea-hotel-group")) {
      expect(within(group).getByTestId("deadsea-hotel-grid")).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");
      const groupId = group.getAttribute("id");
      const tips = within(group).queryAllByTestId("deadsea-category-tip");
      expect(tips).toHaveLength(groupId === "group-luxury" ? 0 : 1);
      if (tips.length) {
        expect(tips[0]).toHaveClass("lg:col-span-1", "sm:col-span-2");
        expect(within(tips[0]!).getAllByRole("listitem")).toHaveLength(2);
      }
    }
    expect(screen.getAllByTestId("deadsea-category-tip")).toHaveLength(4);
    expect(screen.getByText("Make the most of your spa break")).toBeInTheDocument();
    expect(screen.getByText("Plan a family-friendly stay")).toBeInTheDocument();
    expect(screen.getByText("Find the best overall value")).toBeInTheDocument();
    expect(screen.getByText("Plan your Ein Gedi outings")).toBeInTheDocument();
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
    expect(container.querySelector("#location iframe")).toHaveAttribute("src", expect.stringMatching(/^https:\/\/maps\.google\.com\/maps\?.*z=9/));
    expect(container).not.toHaveTextContent("Scroll the comparison sideways");
    expect(container).not.toHaveTextContent("Wellness without assuming adults-only");
    expect(container).not.toHaveTextContent("Compare the package, not a fixed price tier");
    expect(container).not.toHaveTextContent("Nature first, not a beachfront resort");
    const oasisPhoto = container.querySelector<HTMLImageElement>("#hotel-ds-oasis img");
    expect(oasisPhoto).toHaveAttribute("src", resortHotelPhoto("ds-oasis").src);
    expect(oasisPhoto).not.toHaveAttribute("src", "/images/hotel-cards/ds-oasis.jpg");
    expect(resortHotelPhoto("ds-oasis").src).not.toBe(resortHotelPhoto("ds-nevo").src);
    expect(resortHotelPhoto("ds-oasis").src).not.toBe(resortHotelPhoto("ds-noga").src);
    expect(container).not.toHaveTextContent("Compare other properties on the booking provider");
    expect(screen.getAllByTestId("deadsea-hotel-facility-notice")).toHaveLength(2);
    expect(container).toHaveTextContent("As of November 2026, the water park is temporarily closed");
    expect(container).toHaveTextContent("As of November 2026, the spa Jacuzzi is temporarily out of service.");
    expect(container).not.toHaveTextContent("Select a hotel name to jump");
    expect(container).not.toHaveTextContent("Current room prices and availability are checked on the booking provider");
    expect(new Set(cards.map(card => card.querySelector("img")?.getAttribute("src"))).size).toBe(11);
    expect(screen.getAllByRole("listitem").filter(node => node.closest('#tips') !== null)).toHaveLength(8);
    expect(container).toHaveTextContent("Separate hotel and spa age rules");
    const arrival = within(container.querySelector("#location") as HTMLElement);
    expect(arrival.getByText(/sites along Route 90, such as/)).toBeInTheDocument();
    for (const [name, href] of [
      ["Masada", "/attractions/masada/"],
      ["Ein Gedi Nature Reserve", "/attractions/ein-gedi/"],
      ["Qasr el Yahud", "/attractions/qasr-el-yahud/"],
      ["Dead Sea attractions guide", "/travel-blog/dead-sea-attractions/"],
    ] as const) {
      expect(arrival.getByRole("link", { name })).toHaveAttribute("href", href);
    }
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
      const map = within(card).getByTestId("deadsea-hotel-map-link");
      expect(map).toHaveAttribute("href", hotelGoogleMapsUrl(resortHotel(id)));
      expect(map).toHaveAttribute("target", "_blank");
      expect(map).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(map).toHaveTextContent("View location on Google Maps");
      expect(link.getAttribute("aria-label")).toContain(resortHotel(id).name);
      expect(card.querySelector("img")).toBeInTheDocument();
    });
    expect(container.querySelectorAll('[data-testid="deadsea-editorial-hotel-link"]')).toHaveLength(11);
    for (const group of deadSeaStayGuide.groups) {
      const key = group.browsePageId ?? ("stay-deadsea-" + group.id + "-browse");
      const booking = linksForPage(key)[0]!;
      const section = container.querySelector("#group-" + group.id)!;
      const browse = within(section as HTMLElement).getByTestId("deadsea-category-browse-link");
      expect(browse).toHaveAttribute("href", hotelBrowseAffiliateUrl(booking, pageId));
      expect(browse).toHaveClass("bg-primary", "text-primary-foreground");
      expect(browse.parentElement).toHaveClass("justify-center");
      expect(section.querySelector(`a[href="${group.guidePath}"]`)).toBeNull();
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
    const form = screen.getByRole("form", { name: "Standard contact form" });
    expect(form).toHaveAttribute("data-heading", "Need a private transfer to the Dead Sea?");
    expect(form).toHaveAttribute("data-intro", expect.stringContaining("private transfers to Ein Bokek and the Dead Sea"));
    expect(form).toHaveAttribute("data-placeholder", expect.stringContaining("Pickup location, Ein Bokek hotel"));
    const sourceList = screen.getByTestId("deadsea-sources");
    const sources = sourceList.getAttribute("data-ids")!.split(",");
    const hotels = deadSeaStayGuide.groups.flatMap(group => group.hotelIds);
    hotels.forEach(id => expect(sources).toContain(resortHotel(id).sourceId));
    expect(sources.length).toBeGreaterThanOrEqual(11);
    expect(sourceList).toHaveAttribute("data-intro", expect.stringContaining("Official hotel websites and practical travel resources"));
  });
});
