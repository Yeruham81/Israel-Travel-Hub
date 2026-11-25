import "@/test/consent-fixture";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readRouteSource } from "@/test-utils/read-route-source";
import { HaifaHotelEditorialGuide } from "@/components/HaifaHotelEditorialGuide";
import { haifaStayGuide } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { guideDirectory } from "@/data/travelGuides";
import { hotelBooking, resortHotel } from "@/components/StayGuideParts";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";
import { linksForPage } from "@/data/registry";
import { hotelGoogleMapsUrl } from "@/lib/hotel-google-maps";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) =>
    <a href={to} {...props}>{children}</a>,
}));
vi.mock("@/components/Guide", () => ({
  GuideHeader: ({ title, image, checkedAt, intro }: { title: string; image: { src: string; alt: string }; checkedAt?: string; intro: string }) =>
    <header data-date={checkedAt} data-intro={intro}><h1>{title}</h1><img src={image.src} alt={image.alt} /></header>,
  OnThisPage: ({ sections }: { sections: readonly (readonly [string, string])[] }) =>
    <nav aria-label="On this page" data-sections={sections.map(([id]) => id).join(",")} />,
  FaqList: ({ faqs }: { faqs: { q: string; a: string }[] }) => <section id="faq" data-count={faqs.length} />,
  SourceList: ({ ids }: { ids: string[] }) => <section data-testid="haifa-sources" data-ids={ids.join(",")} />,
}));
vi.mock("@/components/StayTripLinks", () => ({
  StayTripLinks: ({ region, currentPath, presentation }: { region: string; currentPath: string; presentation: string }) =>
    <section data-testid="related-guides" data-region={region} data-current={currentPath} data-presentation={presentation} />,
}));
vi.mock("@/components/HomeContactForm", () => ({
  HomeContactForm: ({ guide, showTripadvisorBesidePortraitMobile }: { guide: { heading: string; introduction: string }; showTripadvisorBesidePortraitMobile: boolean }) =>
    <form aria-label="Standard contact form" data-heading={guide.heading} data-intro={guide.introduction} data-tripadvisor={String(showTripadvisorBesidePortraitMobile)} />,
}));
afterEach(cleanup);

const guide = {
  ...haifaStayGuide,
  title: accommodationEditorial.haifa.title,
  intro: accommodationEditorial.haifa.intro,
  reviewedAt: "2026-11-25",
  photo: { ...haifaStayGuide.photo, src: "/images/travel-blog/featured-haifa-hotels.webp", alt: "Haifa hotels and cityscape" },
};

describe("Haifa hotel travel guide parity", () => {
  it("uses the full hotel comparison on the travel-blog route and the shared destination template on the accommodation route", () => {
    expect(readRouteSource("src/routes/travel-blog.best-hotels-in-haifa.tsx")).toContain("<HaifaHotelEditorialGuide guide={g} />");
    expect(readRouteSource("src/routes/accommodation.haifa.index.tsx")).toContain("<HotelDestinationPage guide={g} />");
    const directory = guideDirectory.find(entry => entry.to === accommodationEditorial.haifa.path);
    expect(directory?.photo).toEqual(guide.photo);
    expect(directory?.updatedAt).toBe("2026-11-25");
  });

  it("has four category tiles, a separate independent-stay option, ten hotel cards and a mobile-visible comparison table", () => {
    const { container } = render(<HaifaHotelEditorialGuide guide={guide} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(accommodationEditorial.haifa.title);
    expect(container.querySelector("header")).toHaveAttribute("data-date", "2026-11-25");
    expect(container.querySelector("header img")).toHaveAttribute("src", guide.photo.src);
    const categories = screen.getAllByTestId("haifa-category-card");
    expect(categories).toHaveLength(4);
    expect(screen.getByTestId("haifa-category-grid")).toHaveClass("min-[360px]:grid-cols-2", "lg:grid-cols-2");
    expect(new Set(categories.map(card => card.querySelector("img")?.getAttribute("src"))).size).toBe(4);
    expect(screen.getByTestId("haifa-budget-spotlight")).toHaveAttribute("href", "#group-budget");
    expect(screen.getAllByTestId("haifa-hotel-group")).toHaveLength(5);
    expect(screen.getAllByTestId("haifa-comparison-row")).toHaveLength(10);
    expect(screen.getAllByTestId("haifa-editorial-hotel-card")).toHaveLength(10);
    const comparison = screen.getByTestId("haifa-hotel-comparison");
    expect(comparison.closest(".overflow-x-auto")).toBeInTheDocument();
    expect(comparison).not.toHaveClass("hidden");
    expect(screen.getByRole("heading", { name: "Haifa hotel areas & getting around" })).toBeInTheDocument();
    expect(container.querySelector("#location iframe")).toHaveAttribute("src", expect.stringContaining("maps.google.com/maps?"));
    expect(container).toHaveTextContent("Haifa Center–HaShmona");
    expect(container).toHaveTextContent("Haifa Hof HaCarmel");
    expect(screen.getByTestId("related-guides")).toHaveAttribute("data-current", accommodationEditorial.haifa.path);
    expect(screen.getByRole("form", { name: "Standard contact form" })).toHaveAttribute("data-tripadvisor", "true");
  });

  it("preserves unique hotel click tracking, Google Maps links and six category-and-city Travelpayouts searches", () => {
    const { container } = render(<HaifaHotelEditorialGuide guide={guide} />);
    const pageId = "guide-best-hotels-in-haifa";
    const ids = haifaStayGuide.groups.flatMap(group => group.hotelIds);
    expect(new Set(ids).size).toBe(10);
    for (const id of ids) {
      const card = container.querySelector("#hotel-" + id) as HTMLElement;
      const booking = hotelBooking(id);
      expect(booking?.isAffiliate).toBe(true);
      const referral = within(card).getByTestId("haifa-editorial-hotel-link");
      expect(referral).toHaveAttribute("href", hotelAffiliateUrl(booking!, pageId, id));
      expect(referral).toHaveAttribute("rel", expect.stringContaining("sponsored"));
      expect(within(card).getByTestId("haifa-hotel-map-link")).toHaveAttribute("href", hotelGoogleMapsUrl(resortHotel(id)));
    }
    expect(new Set(screen.getAllByTestId("haifa-editorial-hotel-card").map(card => card.querySelector("img")?.getAttribute("src"))).size).toBe(10);
    for (const group of haifaStayGuide.groups) {
      const expectedId = "category-haifa-" + group.id + "-expedia";
      const affiliate = linksForPage("stay-haifa-" + group.id + "-browse").find(link => link.id === expectedId);
      expect(affiliate?.isAffiliate).toBe(true);
      const link = within(container.querySelector("#group-" + group.id) as HTMLElement).getByTestId("haifa-category-browse-link");
      expect(link).toHaveAttribute("href", hotelBrowseAffiliateUrl(affiliate!, pageId));
    }
    const allAffiliate = linksForPage("stay-haifa-browse").find(link => link.id === "hotels-haifa-expedia")!;
    expect(screen.getByTestId("haifa-all-hotels-browse-link")).toHaveAttribute("href", hotelBrowseAffiliateUrl(allAffiliate, pageId));
    expect(screen.getByTestId("haifa-sources")).toHaveAttribute("data-ids", expect.stringContaining("haifa-botanica-facilities"));
    expect(screen.getByRole("link", { name: "Haifa accommodation guide" })).toHaveAttribute("href", "/accommodation/haifa/");
  });
});
