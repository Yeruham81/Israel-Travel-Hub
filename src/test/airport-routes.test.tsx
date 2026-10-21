import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { airportTransferRates, airportTransferRoutes, getSource, linksForPage } from "@/data/registry";
import { readOutboundClicks, relFor } from "@/lib/outbound";
import { routeTree } from "@/routeTree.gen";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });

describe("four dedicated airport transfer routes", () => {
  it.each(airportTransferRoutes)("provides a complete, route-specific quote journey for $id", async (route) => {
    const guide = getAirportRouteGuide(route.id);
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [`${route.path}?destination=unrelated`] }), trailingSlash: "always" });
    await router.load();
    const { container } = render(<RouterContextProvider router={router}><AirportRoutePage id={route.id} /></RouterContextProvider>);
    expect(router.matchRoutes(route.path).at(-1)?.routeId).toBe(route.path.replace(/\/$/, ""));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.title);
    const visibleBreadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(visibleBreadcrumbs).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([["Home", "/"], ["Airport transfers", "/transfers/"]]);
    expect(within(visibleBreadcrumbs).getByText(guide.city)).toHaveAttribute("aria-current", "page");
    expect(visibleBreadcrumbs).not.toHaveTextContent("Ben Gurion Airport");
    expect(container.querySelector("main")!.textContent).not.toMatch(/taxi rank|\btrain\b|\bbuses\b|live availability|guaranteed pickup/i);
    expect(screen.getByTestId("route-starting-rate")).toHaveTextContent(`From ILS ${guide.rate.price.amount.toLocaleString("en-US")}`);
    expect(screen.getByTestId("route-starting-rate")).toHaveTextContent("One way · per vehicle · up to 4");
    expect(screen.getByTestId("route-starting-rate")).toHaveTextContent(route.driveTime);
    expect(screen.getByRole("link", { name: "Request your airport transfer" })).toHaveAttribute("href", "#request-quote");
    const form = screen.getByRole("form", { name: "Private airport transfer quote request" });
    const journey = container.querySelector("#journey-details");
    if (!journey) throw new Error("Missing route information");
    expect(journey.compareDocumentPosition(form)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByLabelText("Destination *")).toHaveValue(guide.rate.destination);
    expect(screen.getByLabelText("Destination *")).toHaveAttribute("readonly");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.areasTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: guide.planningTitle })).toBeInTheDocument();
    for (const area of guide.areas) expect(screen.getByRole("heading", { name: area.title })).toBeInTheDocument();
    const otherRoutes = screen.getByRole("region", { name: "Other airport transfer routes" });
    for (const other of airportTransferRoutes.filter((item) => item.id !== route.id)) expect(within(otherRoutes).getByRole("link", { name: `Ben Gurion to ${getAirportRouteGuide(other.id).city}` })).toHaveAttribute("href", other.path);
    expect(getSource(route.sourceId).url).toBe(`https://www.israel-taxi.com${route.path}`);
    expect(guide.rate).toBe(airportTransferRates.find((rate) => rate.id === route.id));
    const platformSection = screen.getByRole("region", { name: "Prefer to book through a platform?" });
    const platformLinks = linksForPage(`airport-route-${route.id}`);
    const banners = within(platformSection).getAllByTestId("airport-platform-banner");
    expect(platformLinks.map((platform) => platform.providerName)).toEqual(["Kiwitaxi", "Welcome Pickups", "Intui.travel", "GetTransfer.com"]);
    expect(banners).toHaveLength(4);
    expect(platformSection).toHaveTextContent(`airport pickup to ${guide.city}`);
    expect(platformSection).toHaveTextContent("The starting prices above belong to Moshe's service");
    expect(container.querySelector("#faq")!.compareDocumentPosition(platformSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    for (const [index, platform] of platformLinks.entries()) {
      expect(within(banners[index]!).getByRole("img", { name: `${platform.providerName} logo` })).toHaveAttribute("src");
      expect(banners[index]).toHaveAttribute("href", platform.url);
      expect(banners[index]).toHaveAttribute("target", "_blank");
      expect(banners[index]).toHaveAttribute("rel", relFor(platform.isAffiliate));
    }
    const metadata = airportRouteMeta(route.id);
    expect(metadata.meta).toEqual(expect.arrayContaining([{ title: guide.title }, { name: "description", content: guide.description }, { name: "robots", content: "noindex,nofollow" }]));
    expect(metadata.links).toEqual([{ rel: "canonical", href: expect.stringMatching(new RegExp(`${route.path}$`)) }]);
    const breadcrumb = JSON.parse(metadata.scripts[0]!.children);
    expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual(["Home", "Airport transfers", guide.city]);

    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Smith" } });
    fireEvent.change(screen.getByLabelText("Email address *"), { target: { value: "jamie+israel@example.com" } });
    fireEvent.change(screen.getByLabelText("Flight arrival date *"), { target: { value: "2099-11-01" } });
    fireEvent.change(screen.getByLabelText("Flight arrival time *"), { target: { value: "22:30" } });
    fireEvent.change(screen.getByLabelText("Drop-off hotel or address"), { target: { value: `Example Hotel, ${guide.city}` } });
    fireEvent.change(screen.getByLabelText("Passengers, including children *"), { target: { value: "6" } });
    expect(screen.getByText(/published car starting prices do not apply/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox"));
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, options) => Response.json({ accepted: true, requestId: JSON.parse(String(options?.body)).requestId }));
    fireEvent.submit(form);
    expect(await screen.findByText("Thank you for contacting me")).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith("/api/quote-request/", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(String(fetchSpy.mock.calls[0]![1]?.body))).toMatchObject({ sourceTitle: guide.title, request: { kind: "transfer", fields: { destinationId: route.id, address: `Example Hotel, ${guide.city}`, passengers: "6", consent: true } } });
    expect(localStorage.length).toBe(0);
    fireEvent.click(banners[0]!);
    expect(readOutboundClicks()).toEqual([expect.objectContaining({ pageId: `airport-route-${route.id}`, productId: "airport-kiwitaxi", offerId: "airport-kiwitaxi" })]);
    expect(JSON.stringify(readOutboundClicks())).not.toMatch(/Jamie|jamie\+israel|Example Hotel/);
  });

  it("keeps the scope to four distinct guides and separates the Ein Bokek rate from other Dead Sea destinations", () => {
    expect(airportTransferRoutes.map((route) => route.id).sort()).toEqual(["dead-sea", "haifa", "jerusalem", "tel-aviv"]);
    const guides = airportTransferRoutes.map((route) => getAirportRouteGuide(route.id));
    expect(new Set(guides.map((guide) => guide.title)).size).toBe(4);
    expect(new Set(guides.map((guide) => guide.description)).size).toBe(4);
    expect(new Set(guides.map((guide) => guide.journeyText)).size).toBe(4);
    expect(new Set(guides.map((guide) => guide.planningText)).size).toBe(4);
    const deadSea = getAirportRouteGuide("dead-sea");
    expect(deadSea.rate.price.amount).toBe(1300);
    expect(deadSea.areas.map((area) => area.text).join(" ")).toMatch(/Ein Bokek.*Neve|Ein Bokek.*every hotel/s);
    expect(deadSea.faqs.find((faq) => faq.q.includes("every Dead Sea hotel"))?.a).toMatch(/Ein Gedi, Neve Zohar.*own route.*Ein Bokek/);
  });
});
