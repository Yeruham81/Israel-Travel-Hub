import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ComponentType } from "react";
import { Route as TransfersRoute } from "@/routes/transfers.index";
import { Route as AirportRoute } from "@/routes/transfers.ben-gurion-airport";
import { Route as DriverRoute } from "@/routes/private-driver";
import { Route as JerusalemRoute } from "@/routes/travel-blog.ben-gurion-airport-to-jerusalem";
import { Route as TelAvivRoute } from "@/routes/travel-blog.ben-gurion-airport-to-tel-aviv";
import { airportTransferRates, linksForPage } from "@/data/registry";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderPage(path: string, Page: ComponentType) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return { ...render(<RouterContextProvider router={router}><Page /></RouterContextProvider>), router };
}

describe("airport transfers and private driver separation", () => {
  it("keeps the airport hub private-pickup-only and sends every destination to the matching quote", async () => {
    const { container } = await renderPage("/transfers/", TransfersRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Airport transfers in Israel");
    expect(container.querySelector("main")!.textContent).not.toMatch(/intercity|day hire|private driver|\btrain\b|metered|taxi rank/i);
    expect(screen.queryByTestId("provider-card")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("airport-hub-destination")).toHaveLength(4);
    const quoteLinks = [...container.querySelectorAll('a[href*="?destination="]')];
    expect(quoteLinks).toHaveLength(12);
    for (const rate of airportTransferRates) {
      const link = quoteLinks.find((item) => new URL(item.getAttribute("href")!, "https://example.test").searchParams.get("destination") === rate.id)!;
      expect(link).toHaveTextContent(rate.destination);
      expect(link).toHaveTextContent(rate.price.amount.toLocaleString("en-US"));
      expect(new URL(link.getAttribute("href")!, "https://example.test")).toMatchObject({ pathname: "/transfers/ben-gurion-airport/", hash: "#request-quote" });
    }
    expect(screen.getByTestId("airport-hub-rate-terms")).toHaveTextContent(/weekday.*4 passengers.*supplements.*24 hours/s);
    const head = await TransfersRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }, { title: expect.stringContaining("Airport transfers") }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/transfers\/$/) }] });
  });

  it("preselects a destination from a hub link and updates it on same-page navigation without clearing contact details", async () => {
    const hub = await renderPage("/transfers/", TransfersRoute.options.component!);
    const haifa = screen.getAllByTestId("airport-hub-destination").find((card) => within(card).getByRole("heading").textContent === "Haifa")!;
    fireEvent.click(haifa);
    await waitFor(() => expect(hub.router.state.location.pathname).toBe("/transfers/ben-gurion-airport/"));
    const target = hub.router.state.location.href;
    cleanup();
    const { router } = await renderPage(target, AirportRoute.options.component!);
    expect(screen.getByLabelText("Destination *")).toHaveValue("haifa");
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Smith" } });
    await act(async () => { await router.navigate({ to: "/transfers/ben-gurion-airport/", search: { destination: "jerusalem" }, hash: "request-quote" }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("jerusalem");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    await act(async () => { await router.navigate({ to: "/transfers/ben-gurion-airport/", search: { destination: "other" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("other");
    await act(async () => { await router.navigate({ to: "/transfers/ben-gurion-airport/", search: { destination: "unknown-destination" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
  });

  it("places intercity/day hire and its existing operator inquiry on the independent private-driver route", async () => {
    const { container, router } = await renderPage("/private-driver/", DriverRoute.options.component!);
    expect(router.matchRoutes("/private-driver/").at(-1)?.routeId).toBe("/private-driver");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Private driver in Israel");
    expect(screen.getByRole("heading", { name: "Intercity transfers & day hire" })).toBeInTheDocument();
    const planning = screen.getByRole("region", { name: "Plan the day before requesting a quote" });
    const provider = screen.getByTestId("provider-card");
    expect(planning.compareDocumentPosition(provider)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(provider).getByRole("link")).toHaveAttribute("href", "https://www.israel-taxi.com/private-driver-in-israel/");
    expect(provider).toHaveTextContent("operated by the publisher's local transport business");
    expect(container.textContent).not.toMatch(/ILS\s*\d/);
    expect(linksForPage("private-driver").map((link) => link.id)).toEqual(["private-driver-moshe"]);
    expect(linksForPage("transfers-hub")).toEqual([]);
    const head = await DriverRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/private-driver\/$/) }] });
  });

  it("uses Airport transfers in the airport and city-guide breadcrumb metadata", async () => {
    for (const route of [TransfersRoute, AirportRoute, JerusalemRoute, TelAvivRoute]) {
      const head = await route.options.head?.({} as never);
      const breadcrumbs = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []).find((script) => script["@type"] === "BreadcrumbList");
      expect(breadcrumbs.itemListElement[1]).toMatchObject({ name: "Airport transfers", item: expect.stringMatching(/\/transfers\/$/) });
    }
  });
});
