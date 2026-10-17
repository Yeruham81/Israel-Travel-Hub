import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, isRedirect, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ComponentType } from "react";
import { Route as TransfersRoute } from "@/routes/transfers.index";
import { Route as LegacyAirportRoute } from "@/routes/transfers.ben-gurion-airport";
import { Route as DriverRoute } from "@/routes/private-driver";
import { Route as JerusalemRoute } from "@/routes/travel-blog.ben-gurion-airport-to-jerusalem";
import { Route as TelAvivRoute } from "@/routes/travel-blog.ben-gurion-airport-to-tel-aviv";
import { airportTransferRates, airportTransferRoutes, linksForPage } from "@/data/registry";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderPage(path: string, Page: ComponentType) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return { ...render(<RouterContextProvider router={router}><Page /></RouterContextProvider>), router };
}

describe("airport transfers and private driver separation", () => {
  it("consolidates every airport destination and the inquiry form on one private-pickup-only page", async () => {
    const { container } = await renderPage("/transfers/", TransfersRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Airport transfers$/);
    expect(container.querySelector("main")!.textContent).not.toMatch(/intercity|day hire|private driver|\btrain\b|metered|taxi rank/i);
    expect(screen.queryByTestId("provider-card")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("airport-destination-card")).toHaveLength(12);
    expect(screen.getByRole("form", { name: "Private airport transfer quote request" })).toBeInTheDocument();
    expect(container.querySelector('a[href^="/transfers/ben-gurion-airport/"]')).toBeNull();
    for (const rate of airportTransferRates) {
      const card = container.querySelector(`[data-destination="${rate.id}"]`)! as HTMLElement;
      expect(card).toHaveTextContent(rate.destination);
      expect(card).toHaveTextContent(rate.price.amount.toLocaleString("en-US"));
      expect(within(card).getByRole("link", { name: "Request a quote" })).toHaveAttribute("href", "#request-quote");
    }
    for (const route of airportTransferRoutes) {
      const card = screen.getAllByTestId("airport-destination-card").find((item) => item.dataset["destination"] === route.id)!;
      expect(within(card).getByRole("link", { name: /View transfer details/ })).toHaveAttribute("href", route.path);
    }
    expect(screen.getByTestId("airport-rate-terms")).toHaveTextContent(/weekday.*up to four.*Night, weekend and holiday/s);
    const head = await TransfersRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }, { title: expect.stringContaining("Airport transfers") }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/transfers\/$/) }] });
  });

  it("preselects a destination directly on the consolidated page and retains contact details during selection", async () => {
    const { router } = await renderPage("/transfers/?destination=netanya#request-quote", TransfersRoute.options.component!);
    expect(screen.getByLabelText("Destination *")).toHaveValue("netanya");
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Smith" } });
    const card = screen.getAllByTestId("airport-destination-card").find((item) => item.dataset["destination"] === "haifa")!;
    fireEvent.click(within(card).getByRole("link", { name: "Request a quote" }));
    expect(screen.getByLabelText("Destination *")).toHaveValue("haifa");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    await act(async () => { await router.navigate({ to: "/transfers/", search: { destination: "jerusalem" }, hash: "request-quote" }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("jerusalem");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    await act(async () => { await router.navigate({ to: "/transfers/", search: { destination: "other" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("other");
    await act(async () => { await router.navigate({ to: "/transfers/", search: { destination: "unknown-destination" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
  });

  it.each([
    { path: "/transfers/ben-gurion-airport/", destination: "", hash: "" },
    { path: "/transfers/ben-gurion-airport/?destination=haifa#request-quote", destination: "haifa", hash: "request-quote" },
    { path: "/transfers/ben-gurion-airport/?destination=unknown#request-quote", destination: "", hash: "request-quote" },
  ])("redirects the former airport sub-hub $path to the one complete page", async ({ path, destination, hash }) => {
    const { router, container } = await renderPage(path, TransfersRoute.options.component!);
    await waitFor(() => expect(router.state.location.pathname).toBe("/transfers/"));
    expect(router.state.location.hash).toBe(hash);
    expect(router.state.location.search).toEqual(destination ? { destination } : {});
    expect(screen.getByLabelText("Destination *")).toHaveValue(destination);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getAllByTestId("airport-destination-card")).toHaveLength(12);
  });

  it("uses a permanent redirect while retaining only valid destination data and the form anchor", async () => {
    expect.assertions(5);
    try {
      await LegacyAirportRoute.options.beforeLoad?.({ search: { destination: "haifa", unrelated: "discard" }, location: { hash: "request-quote" } } as never);
    } catch (error) {
      if (!isRedirect(error)) throw error;
      expect(error.status).toBe(301);
      expect(error.options.to).toBe("/transfers/");
      expect(error.options.search).toEqual({ destination: "haifa" });
      expect(error.options.hash).toBe("request-quote");
      expect(error.options.replace).toBe(true);
    }
  });

  it("places intercity/day hire and its inline inquiry on the independent private-driver route", async () => {
    const { container, router } = await renderPage("/private-driver/", DriverRoute.options.component!);
    expect(router.matchRoutes("/private-driver/").at(-1)?.routeId).toBe("/private-driver");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Private driver in Israel");
    expect(screen.getByRole("heading", { name: "Intercity transfers & day hire" })).toBeInTheDocument();
    const planning = screen.getByRole("region", { name: "Plan the day before requesting a quote" });
    const form = screen.getByRole("form", { name: "Private driver quote request" });
    expect(form.compareDocumentPosition(planning)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole("link", { name: /Use Moshe's existing contact form/ })).toHaveAttribute("href", "https://www.israel-taxi.com/private-driver-in-israel/#contact-me");
    expect(screen.getByText(/Disclosure: Moshe Barak operates the publisher's local transport business/)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ILS\s*\d/);
    expect(linksForPage("private-driver").map((link) => link.id)).toEqual(["private-driver-moshe"]);
    expect(linksForPage("transfers-hub")).toEqual([]);
    const head = await DriverRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/private-driver\/$/) }] });
  });

  it("uses Airport transfers in the airport and city-guide breadcrumb metadata", async () => {
    for (const route of [TransfersRoute, JerusalemRoute, TelAvivRoute]) {
      const head = await route.options.head?.({} as never);
      const breadcrumbs = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []).find((script) => script["@type"] === "BreadcrumbList");
      expect(breadcrumbs.itemListElement[1]).toMatchObject({ name: "Airport transfers", item: expect.stringMatching(/\/transfers\/$/) });
    }
  });
});
