import "@/test/consent-fixture";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as HubRoute } from "@/routes/accommodation.index";
import { accommodationDestinations, hotelCategoryGuides, neighborhoodGuidesForCity } from "@/data/content";
import { hotelStyles } from "@/data/hotelHub";
import { hotelSearchWidgets } from "@/components/TravelpayoutsHotelWidgets";
import { CANONICAL_ORIGIN } from "@/lib/site";

vi.mock("@tanstack/react-router", async () => {
 const actual=await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
 return { ...actual, Link: ({to,hash,children,...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {to:string;hash?:string;children?:ReactNode}) =>
   <a href={hash ? to+"#"+hash : to} {...props}>{children}</a> };
});
afterEach(cleanup);
const page=() => render((() => { const Page=HubRoute.options.component!; return <Page/>; })());

describe("Accommodation booking hub",()=>{
 it("has one H1, five destination cards and six balanced area guides",()=>{
  const {container}=page();
  expect(screen.getAllByRole("heading",{level:1})).toHaveLength(1);
  expect(screen.getByRole("heading",{name:"Hotels in Israel"})).toBeInTheDocument();
  const cards=container.querySelectorAll('[data-testid="accommodation-destination-card"]');
  expect(cards).toHaveLength(5);
  expect(accommodationDestinations).toHaveLength(5);
  const destinationsGrid = container.querySelector('[aria-label="Hotel destinations in Israel"]')!;
  expect(destinationsGrid).toHaveClass("grid-cols-2");
  expect(destinationsGrid).not.toHaveClass("md:grid-cols-3");
  const allCards = [...container.querySelectorAll('[data-testid="hotel-destination-card"]')];
  expect(allCards).toHaveLength(5);
  expect(allCards.map(card => card.querySelector("h3")?.textContent)).toEqual([
    "Hotels in Jerusalem", "Hotels in Tel Aviv", "Hotels in Haifa",
    "Hotels in Tiberias", "Dead Sea hotels",
  ]);
  expect(allCards.every(card => !card.closest("li")?.classList.contains("md:col-span-2"))).toBe(true);
  const retiredEilatGuide = "/travel-blog/" + "eilat/";
  expect(container.querySelector(`a[href="${retiredEilatGuide}"]`)).toBeNull();
  expect(screen.queryByRole("link", { name: /Explore hotel destinations/i })).toBeNull();
  const jerusalem = container.querySelector('[data-testid="hotel-destination-card"]')!;
  expect(jerusalem.closest("li")).toHaveClass("min-w-0");
  expect(jerusalem.querySelector('a[href="/travel-blog/where-to-stay-in-jerusalem/"]')).toBeNull();
  expect(jerusalem.querySelectorAll("a")).toHaveLength(1);
  expect(allCards.every(card => card.querySelectorAll("a").length <= 1)).toBe(true);
  for (const [index, card] of allCards.entries()) {
    const description = card.querySelector("p");
    expect(description).not.toHaveClass("line-clamp-3");
    const [mobile, desktop] = [...(description?.querySelectorAll("span") ?? [])];
    expect(mobile).toHaveClass("sm:hidden");
    expect(desktop).toHaveClass("hidden", "sm:inline");
    expect(mobile).toHaveTextContent(accommodationDestinations[index]!.mobileText!);
    expect(accommodationDestinations[index]!.mobileText!.length).toBeLessThan(accommodationDestinations[index]!.text.length);
  }
  expect(jerusalem.querySelector("img")).toHaveAttribute("src", accommodationDestinations[0]!.photo.src);
  expect(jerusalem.querySelector("img")?.getAttribute("alt")).toMatch(/panoramic view of Jerusalem/i);
  expect(screen.getByTestId("guide-hero-media")).toBeInTheDocument();
  const urls=[...cards].map(card=>card.getAttribute("href"));
  expect(urls).toEqual(["/accommodation/jerusalem/","/accommodation/tel-aviv/","/accommodation/haifa/","/accommodation/tiberias/","/accommodation/dead-sea/"]);
  const areaGuides = screen.getByTestId("accommodation-area-guides");
  expect(areaGuides.querySelectorAll('[data-testid="accommodation-area-guide-card"]')).toHaveLength(5);
  expect(areaGuides.querySelectorAll('[data-testid="accommodation-area-guide-coming-soon"]')).toHaveLength(1);
  expect(areaGuides.querySelector("ul")).toHaveClass("lg:grid-cols-3");
  const allAreaCards = [...areaGuides.querySelectorAll("li")];
  expect(allAreaCards).toHaveLength(6);
  expect(allAreaCards.map(card => card.querySelector("h3")?.textContent)).toEqual([
    "Jerusalem", "Tel Aviv", "Haifa", "Tiberias & the Galilee", "Dead Sea", "Eilat",
  ]);
  expect(allAreaCards.map(card => card.querySelector("span")?.textContent?.trim())).toEqual([
    "History & city walks", "Beach & city life", "Coast & Carmel",
    "Lakeside escapes", "Desert & wellness", "Red Sea getaways",
  ]);
  expect(allAreaCards.every(card => !/where to stay|stay guide/i.test(card.textContent ?? ""))).toBe(true);
  const upcomingAreaCard = screen.getByTestId("accommodation-area-guide-coming-soon");
  expect(upcomingAreaCard).toHaveTextContent("Coming soon");
  expect(upcomingAreaCard.querySelector("a")).toBeNull();
  expect(container.querySelectorAll('a[href^="/travel-blog/where-to-stay"], a[href^="/travel-blog/best-hotels"], a[href^="/travel-blog/best-dead-sea"]')).toHaveLength(5);
  expect(areaGuides).toHaveTextContent("Not sure where to base yourself?");
  expect(areaGuides).toHaveTextContent("most popular neighborhoods and best areas to stay in Israel");
  expect(areaGuides).toHaveTextContent("practical tips");
  expect(areaGuides).toHaveTextContent("handpicked hotel recommendations");
  expect(areaGuides.querySelectorAll("img")).toHaveLength(0);
 });
 it("shows hotel styles that lead to the actual area or category catalogues",()=>{
  page();
  expect(hotelStyles).toHaveLength(6);
  for(const style of hotelStyles){
   expect(screen.getByRole("heading",{name:style.title})).toBeInTheDocument();
   expect(style.link?.to).toMatch(/^\/accommodation\//);
  }
  expect(screen.getAllByTestId("hotel-style-card")).toHaveLength(6);
  expect(screen.getAllByTestId("hotel-style-card").every(card => card.querySelector("img"))).toBe(true);
  expect(screen.getByRole("heading", { name: "Plan the rest of your trip" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Frequently asked questions" })).toBeInTheDocument();
  expect(neighborhoodGuidesForCity("jerusalem")).toHaveLength(6);
  expect(neighborhoodGuidesForCity("telaviv")).toHaveLength(8);
  expect(hotelCategoryGuides).toHaveLength(6);
 });
 it("separates Booking above booking tips and Agoda below the FAQ without changing commission tracking", () => {
  const { container } = page();
  const bookingSection = screen.getByTestId("hotel-search-booking");
  const agodaSection = screen.getByTestId("hotel-search-widgets");
  const stylesSection = container.querySelector("#styles")!;
  const bookingTipsSection = container.querySelector("#booking-tips")!;
  const areaGuidesSection = screen.getByTestId("accommodation-area-guides");
  const faqs = screen.getByRole("heading", { name: "Frequently asked questions" });

  expect(bookingSection).toHaveAttribute("aria-label", "Search hotels with Booking.com");
  expect(agodaSection).toHaveAttribute("aria-label", "Search hotels with Agoda");
  expect(bookingSection.querySelector("h2, h3")).toBeNull();
  expect(agodaSection.querySelector("h2, h3")).toBeNull();
  expect(stylesSection.compareDocumentPosition(bookingSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(bookingSection.compareDocumentPosition(areaGuidesSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(areaGuidesSection.compareDocumentPosition(bookingTipsSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(faqs.compareDocumentPosition(agodaSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(bookingSection).toContainElement(screen.getByTestId("booking-hotel-search-widget"));
  expect(agodaSection).toContainElement(screen.getByTestId("agoda-hotel-search-widget"));
  expect(bookingSection).not.toContainElement(screen.getByTestId("agoda-hotel-search-widget"));
  expect(agodaSection).not.toContainElement(screen.getByTestId("booking-hotel-search-widget"));

  expect(hotelSearchWidgets.map((widget) => widget.id).sort()).toEqual(["agoda", "booking"]);
  expect(hotelSearchWidgets).toHaveLength(2);
  for (const widget of hotelSearchWidgets) {
    const card = screen.getByTestId(`${widget.id}-hotel-search-widget`);
    const mount = screen.getByTestId(`${widget.id}-hotel-widget-mount`);
    expect(card).toContainElement(mount);
    expect(mount).toHaveAttribute("aria-label", widget.title);
    const url = new URL(widget.scriptUrl);
    expect(url.origin).toBe("https://tpwgt.com");
    expect(url.pathname).toBe("/content");
    expect(url.searchParams.get("trs")).toBe("406243");
    expect(url.searchParams.get("shmarker")).toBe("622032.accommodation_hub_widget");
    expect(url.searchParams.get("powered_by")).toBe("false");
    // The approved widget runs in a disposable document, never the parent page.
    const frame = mount.querySelector("iframe");
    expect(frame).not.toBeNull();
    const doc = new DOMParser().parseFromString(frame!.getAttribute("srcdoc")!, "text/html");
    const script = doc.querySelector("script[src]");
    expect(script?.getAttribute("src")).toBe(widget.scriptUrl);
    expect(mount.querySelector("script")).toBeNull();
  }

  const booking = new URL(hotelSearchWidgets.find((widget) => widget.id === "booking")!.scriptUrl);
  expect(booking.searchParams.get("campaign_id")).toBe("84");
  expect(booking.searchParams.get("promo_id")).toBe("9240");
  const agoda = new URL(hotelSearchWidgets.find((widget) => widget.id === "agoda")!.scriptUrl);
  expect(agoda.searchParams.get("campaign_id")).toBe("104");
  expect(agoda.searchParams.get("promo_id")).toBe("8303");
  expect(agoda.searchParams.get("default_destination")).toBe("Jerusalem, Israel");
  expect(agoda.searchParams.get("primary_override")).toBe("#5392F9");
  expect(container.querySelectorAll('[data-testid$="-hotel-search-widget"]')).toHaveLength(2);
  expect(screen.queryByTestId("trip-hotel-search-widget")).toBeNull();
 });
 it("keeps a canonical Accommodation hub and no live room price claims", async()=>{
  page();
  expect(screen.queryByText(/enter your dates and guests to check current room prices/i)).toBeNull();
  expect(screen.queryByText(/Jerusalem and Tel Aviv have neighborhood-by-neighborhood hotel guides/i)).toBeNull();
  expect(screen.queryByText(/Have a particular kind of stay in mind/i)).toBeNull();
  expect(screen.queryByText(/A well-located room with the right facilities/i)).toBeNull();
  const guides = screen.getByTestId("accommodation-area-guides");
  const guideLinks = [...guides.querySelectorAll('a[data-testid="accommodation-area-guide-card"]')];
  expect(guideLinks.map(link => link.getAttribute("href"))).toEqual([
    "/travel-blog/where-to-stay-in-jerusalem/",
    "/travel-blog/where-to-stay-in-tel-aviv/",
    "/travel-blog/best-hotels-in-haifa/",
    "/travel-blog/best-hotels-in-tiberias/",
    "/travel-blog/best-dead-sea-hotels/",
  ]);
  expect(guides).toHaveTextContent("Weigh German Colony charm, Carmel views and beach access");
  expect(screen.getByTestId("hub-header").querySelector("[data-guide-intro]")).toHaveTextContent(
    "Find the right place to stay in Israel, from Jerusalem's historic neighborhoods and Tel Aviv's beaches to Haifa, the Sea of Galilee and the Dead Sea."
  );
  expect(screen.getByText("Which hotel areas are best if I travel without a car?")).toBeInTheDocument();
  expect(screen.getByText(/Jaffa Road light rail/)).toBeInTheDocument();
  expect(screen.queryByText("What should I check if I arrive on a Friday evening?")).toBeNull();
  const checklist = screen.getByRole("list", { name: "Hotel booking checklist" });
  expect(checklist.querySelectorAll("li")).toHaveLength(4);
  expect(checklist.querySelectorAll("svg")).toHaveLength(4);
  expect(checklist).toHaveTextContent("Compare the full price");
  expect(checklist).toHaveTextContent("Plan your arrival");
  expect(screen.queryByText(/unverified live room rates/i)).toBeNull();
  const meta=await HubRoute.options.head?.({} as never);
  expect(meta).toMatchObject({links:[{rel:"canonical",href:CANONICAL_ORIGIN+"/accommodation/"}]});
  const jsonLd = meta?.scripts?.flatMap(script => {
    const children = script?.children;
    return typeof children === "string" ? [JSON.parse(children)] : [];
  }) ?? [];
  const collection = jsonLd.find(entry => entry["@type"] === "CollectionPage");
  expect(collection?.mainEntity?.itemListElement).toHaveLength(5);
  expect(collection.mainEntity.itemListElement.some((item: {name:string}) => /Eilat/i.test(item.name))).toBe(false);
 });
});
