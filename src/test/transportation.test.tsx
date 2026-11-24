import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ComponentType } from "react";
import { Route as TransfersRoute } from "@/routes/airport-transfers.index";
import { Route as DriverRoute } from "@/routes/private-driver-in-israel";
import { Route as JerusalemRoute } from "@/routes/airport-transfers.jerusalem";
import { Route as TelAvivRoute } from "@/routes/airport-transfers.tel-aviv";
import { airportTransferRates, airportTransferRoutes, linksForPage } from "@/data/registry";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderPage(path: string, Page: ComponentType) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return { ...render(<RouterContextProvider router={router}><Page /></RouterContextProvider>), router };
}

describe("airport transfers and private driver separation", () => {
  it("keeps private airport services and the inquiry form separate from editorial transport comparisons", async () => {
    const { container } = await renderPage("/airport-transfers/", TransfersRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Private airport transfers from Ben Gurion Airport$/);
    const bookingSections = ["#popular-destinations", "#more-destinations", "#benefits", "#booking-steps", "#request-quote"];
    const bookingText = bookingSections.map(selector => container.querySelector(selector)?.textContent).join(" ");
    expect(bookingText).not.toMatch(/intercity|day hire|private driver|\btrain\b|metered|taxi rank/i);
    expect(container.querySelector("#compare-airport-transport")).toHaveTextContent("Compare all transport options");
    expect(screen.queryByTestId("provider-card")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("airport-destination-card")).toHaveLength(12);
    expect(screen.getByRole("form", { name: "Private airport transfer quote request" })).toBeInTheDocument();
    expect(container.querySelector('a[href^="/airport-transfers/ben-gurion-airport/"]')).toBeNull();
    for (const rate of airportTransferRates) {
      const card = container.querySelector(`[data-destination="${rate.id}"]`)! as HTMLElement;
      expect(card).toHaveTextContent(rate.destination);
      expect(card).toHaveTextContent(rate.price.amount.toLocaleString("en-US"));
      expect(within(card).getByRole("link", { name: /^(Get a quote|Request a quote|Get a quote Request a quote)$/ })).toHaveAttribute("href", "#request-quote");
    }
    for (const route of airportTransferRoutes) {
      const card = screen.getAllByTestId("airport-destination-card").find((item) => item.dataset["destination"] === route.id)!;
      expect(within(card).getByRole("link", { name: /View transfer details/ })).toHaveAttribute("href", route.path);
    }
    expect(screen.getByTestId("airport-rate-terms")).toHaveTextContent(/weekday pickups.*up to four passengers/s);
    const head = await TransfersRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }, { title: expect.stringContaining("Airport Transfers") }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/airport-transfers\/$/) }] });
  });

  it("preselects a destination directly on the consolidated page and retains contact details during selection", async () => {
    const { router } = await renderPage("/airport-transfers/?destination=netanya#request-quote", TransfersRoute.options.component!);
    expect(screen.getByLabelText("Destination *")).toHaveValue("netanya");
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Smith" } });
    const card = screen.getAllByTestId("airport-destination-card").find((item) => item.dataset["destination"] === "haifa")!;
    fireEvent.click(within(card).getByRole("link", { name: /^(Get a quote|Request a quote|Get a quote Request a quote)$/ }));
    expect(screen.getByLabelText("Destination *")).toHaveValue("haifa");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    await act(async () => { await router.navigate({ to: "/airport-transfers/", search: { destination: "jerusalem" }, hash: "request-quote" }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("jerusalem");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    await act(async () => { await router.navigate({ to: "/airport-transfers/", search: { destination: "other" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("other");
    await act(async () => { await router.navigate({ to: "/airport-transfers/", search: { destination: "unknown-destination" } }); });
    expect(screen.getByLabelText("Destination *")).toHaveValue("");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
  });

  it("places intercity/day hire and its inline inquiry on the independent private-driver route", async () => {
    const { container, router } = await renderPage("/private-driver-in-israel/", DriverRoute.options.component!);
    expect(router.matchRoutes("/private-driver-in-israel/").at(-1)?.routeId).toBe("/private-driver-in-israel");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Private driver in Israel");
    expect(screen.getByRole("heading", { name: "Choose the journey that suits you" })).toBeInTheDocument();
    const benefits = screen.getByRole("region", { name: "A journey planned around you" });
    const form = screen.getByRole("form", { name: "Private driver quote request" });
    expect(benefits.compareDocumentPosition(form)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.queryByRole("heading", { name: "Plan the day before requesting a quote" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy/");
    expect(screen.queryByText(/Prefer an online form|existing .*contact form/)).not.toBeInTheDocument();
    expect(screen.getByText(/Tell me what you have in mind, and I.ll prepare a personal quote/)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ILS\s*\d/);
    expect(linksForPage("private-driver").map((link) => link.id)).toEqual(["private-driver-moshe"]);
    expect(linksForPage("transfers-hub")).toEqual([]);
    const head = await DriverRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/private-driver-in-israel\/$/) }] });
  });

  it("uses Airport transfers in the airport and city-guide breadcrumb metadata", async () => {
    for (const route of [TransfersRoute, JerusalemRoute, TelAvivRoute]) {
      const head = await route.options.head?.({} as never);
      const breadcrumbs = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []).find((script) => script["@type"] === "BreadcrumbList");
      expect(breadcrumbs.itemListElement[1]).toMatchObject({ name: "Airport transfers", item: expect.stringMatching(/\/airport-transfers\/$/) });
    }
  });
});
