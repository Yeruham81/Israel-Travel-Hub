import { NECESSARY_ONLY, ALL_CATEGORIES, saveCookieConsent } from "@/lib/cookie-consent";
import "@/test/consent-fixture";
import { readFileSync } from "node:fs";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { CarRentalGuide } from "@/components/CarRentalGuide";
import { DiscoverCarsSearchWidget } from "@/components/DiscoverCarsSearchWidget";
import { carRentalSources, carRentalHero } from "@/data/carRentalGuide";
import { getSource } from "@/data/registry";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("car rental guide and Travelpayouts search", () => {
  it("offers practical planning, real tables, six related guides and tracked comparison links", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/car-rental/"] }), trailingSlash: "always" });
    await router.load();
    const { container } = render(<RouterContextProvider router={router}><CarRentalGuide /></RouterContextProvider>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Car Rental in Israel");
    for (const link of within(screen.getByRole("navigation", { name: "On this page" })).getAllByRole("link")) {
      expect(container.querySelector(link.getAttribute("href")!)).not.toBeNull();
    }
    const documents = container.querySelector("#documents") as HTMLElement;
    const driving = container.querySelector("#vehicle-driving") as HTMLElement;
    expect(within(documents).getByText("Hertz Israel", { exact: true }).tagName).toBe("STRONG");
    expect(within(documents).getByText("Eldan", { exact: true }).tagName).toBe("STRONG");
    expect(within(driving).getByText("Hertz Israel", { exact: true }).tagName).toBe("STRONG");
    for (const section of [documents, driving]) {
      expect(section.querySelector('a[href*="hertz.co.il"], a[href*="eldan.co.il"]')).toBeNull();
    }
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    const summaries = related.querySelectorAll(".line-clamp-2");
    expect(summaries).toHaveLength(6);
    expect(Array.from(summaries).every(summary => (summary.textContent?.length || 0) <= 80)).toBe(true);
    const tables = screen.getAllByRole("table");
    expect(tables).toHaveLength(2);
    for (const table of tables) {
      expect(table).not.toHaveClass("hidden");
      expect(table.parentElement).toHaveClass("overflow-x-auto");
    }
    expect(container.querySelector('[data-testid="stay-trip-photo-grid"]')?.children).toHaveLength(6);
    expect(container.querySelector('[data-testid="stay-trip-photo-grid"]')).toHaveClass("grid-cols-2", "lg:grid-cols-3");
    for (const source of carRentalSources) expect(getSource(source.id)?.url).toBe(source.url);
    expect(guideHeroPhotoForPath("/car-rental/")).toEqual(carRentalHero);
    const referrals = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href*="discovercars.tpm.li"]'));
    expect(referrals).toHaveLength(3);
    expect(new Set(referrals.map(link=>new URL(link.href).searchParams.get("sub_id"))).size).toBe(3);
    for (const link of referrals) {
      const url = new URL(link.href);
      expect(url.pathname).toBe("/w2RwEsmb");
      expect(url.searchParams.get("sub_id")).toMatch(/^itt_car_car_rental_/);
      expect(link.rel).toContain("sponsored");
    }
    expect(container).not.toHaveTextContent("Tips only");
    expect(screen.queryByRole("complementary", { name: "A private driver alternative" })).not.toBeInTheDocument();
    const widget = container.querySelector("#compare-rentals")!;
    expect(widget.compareDocumentPosition(container.querySelector("#car-needed")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(widget.compareDocumentPosition(screen.getByRole("navigation",{name:"On this page"})) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("time")?.nextElementSibling).toHaveAttribute("data-testid","author-card");
    expect(screen.getByTestId("rental-vehicle-categories").children).toHaveLength(3);
    const planning = screen.getByTestId("icon-trip-planning-links");
    expect(within(planning).getAllByRole("link")).toHaveLength(6);
    const contactSection = container.querySelector("#contact") as HTMLElement;
    const form = screen.getByRole("form", { name: "Guide contact message" });
    expect(container.querySelectorAll("form")).toHaveLength(1);
    expect(related.nextElementSibling).toBe(planning);
    expect(planning.nextElementSibling).toBe(contactSection);
    expect(within(contactSection).getByTestId("contact-reviews-row")).toHaveClass("flex-nowrap");
    expect(within(contactSection).getByRole("heading", { name: "Need a private driver for your Israel journey?" })).toBeInTheDocument();
    expect(within(form).getByRole("textbox", { name: "Your name *" })).toBeRequired();
    expect(within(form).getByRole("textbox", { name: "Email address *" })).toBeRequired();
    expect(within(form).getByRole("textbox", { name: "Subject *" })).toHaveValue("");
    expect(within(form).getByRole("textbox", { name: "Your message *" })).toBeRequired();
    expect(within(form).getByRole("button", { name: "Send message" })).toBeInTheDocument();
    expect(form).toHaveTextContent("All bookings require confirmation.");
  });

  it("uses the official campaign, publisher and airport default inside an isolated local frame", () => {
    render(<DiscoverCarsSearchWidget />);
    expect(screen.getByTitle("DiscoverCars car rental search")).toHaveAttribute("src", "/widgets/discovercars.html");
    const html = new DOMParser().parseFromString(readFileSync("public/widgets/discovercars.html", "utf8"), "text/html");
    const src = new URL(html.querySelector<HTMLScriptElement>("script[data-consent-src]")!.dataset["consentSrc"]!);
    expect(src.origin).toBe("https://tpwgt.com");
    expect(Object.fromEntries(src.searchParams)).toMatchObject({ campaign_id: "117", promo_id: "3873", trs: "406243", shmarker: "622032.car_rental_widget", location: "israel/tel-aviv/tlv", locale: "en" });
    expect(html.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,nofollow");
  });

  it("accepts height changes only from its own same-origin frame and removes the frame on unmount", () => {
    const { unmount } = render(<DiscoverCarsSearchWidget />);
    const frame = screen.getByTitle("DiscoverCars car rental search") as HTMLIFrameElement;
    const resize = (origin: string, source: Window | null, height: number) => fireEvent(window, new MessageEvent("message", { origin, source, data: { type: "itt-discovercars-height", height } }));
    resize("https://unrelated.example", frame.contentWindow, 700);
    resize(window.location.origin, window, 700);
    resize(window.location.origin, frame.contentWindow, NaN);
    expect(frame).toHaveAttribute("height", "355");
    resize(window.location.origin, frame.contentWindow, 240);
    expect(frame).toHaveAttribute("height", "240");
    expect(screen.queryByText("Loading car search…")).not.toBeInTheDocument();
    resize(window.location.origin, frame.contentWindow, 700);
    expect(frame).toHaveAttribute("height", "700");
    resize(window.location.origin, frame.contentWindow, 50000);
    expect(frame).toHaveAttribute("height", "1600");
    unmount();
    expect(frame.isConnected).toBe(false);
  });

  it("keeps a tracked alternative available when the provider reports a loading error", () => {
    render(<DiscoverCarsSearchWidget />);
    const frame = screen.getByTitle("DiscoverCars car rental search") as HTMLIFrameElement;
    fireEvent(window, new MessageEvent("message", { origin: window.location.origin, source: frame.contentWindow, data: { type: "itt-discovercars-error" } }));
    expect(screen.getByRole("status")).toHaveTextContent("temporarily unavailable");
    expect(frame.isConnected).toBe(false);
    expect(screen.getByRole("link", { name: "Compare cars on DiscoverCars" })).toHaveAttribute("rel", "sponsored noopener noreferrer");
  });
  it("keeps the comparison link usable without marketing consent, and resets on withdrawal", () => {
    saveCookieConsent(NECESSARY_ONLY);
    const {container} = render(<DiscoverCarsSearchWidget/>);
    expect(container.querySelector("iframe[src]")).toBeNull();
    expect(screen.getByRole("link",{name:"Compare cars on DiscoverCars"})).toHaveAttribute("rel","sponsored noopener noreferrer");
    act(()=>saveCookieConsent(ALL_CATEGORIES));
    expect(container.querySelector("iframe[src]")).not.toBeNull();
    act(()=>saveCookieConsent(NECESSARY_ONLY));
    expect(container.querySelector("iframe[src]")).toBeNull();
    act(()=>saveCookieConsent(ALL_CATEGORIES));
    expect(screen.getByRole("status")).toHaveTextContent("Loading car search");
  });
  it("replaces an empty provider frame with the tracked alternative after a bounded timeout", () => {
    vi.useFakeTimers();
    const {container}=render(<DiscoverCarsSearchWidget/>);
    act(()=>vi.advanceTimersByTime(15000));
    expect(container.querySelector("iframe[src]")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("temporarily unavailable");
    expect(screen.getByRole("link",{name:"Compare cars on DiscoverCars"})).toBeInTheDocument();
  });
});
