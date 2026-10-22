import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { routeTree } from "@/routeTree.gen";
import { Route as BethlehemRoute } from "@/routes/travel-blog.jerusalem-to-bethlehem";
import { Route as DeadSeaRoute } from "@/routes/travel-blog.jerusalem-to-the-dead-sea";
import { affiliateConfig, tourBookingOffers, travelGuidePaths, getSource } from "@/data/registry";
import { travelGuides } from "@/data/travelGuides";

afterEach(cleanup);

async function renderGuide(path: string, component: () => JSX.Element) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  const Page = component;
  const result = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
  return { ...result, router };
}

describe("Jerusalem independent day-trip planning guides", () => {
  it("Bethlehem distinguishes bus lines, crossing and tour products without asserting affiliate status", async () => {
    const { container } = await renderGuide(travelGuidePaths.bethlehem, BethlehemRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bus, Taxi & Tours");
    expect(screen.getByTestId("journey-option-cards").children).toHaveLength(4);
    expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(3);
    expect(screen.getByText("Bus 231")).toBeInTheDocument();
    expect(screen.getByText("Bus 234")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Check the operator's stops/ })).toHaveAttribute("href", "https://south-buses.com/lines-and-stations/?lang=en");
    expect(screen.getByRole("heading", { name: "Checkpoint, passports and rental cars" })).toBeInTheDocument();
    expect(screen.getByText(/Star Street and the Milk Grotto/)).toBeInTheDocument();
    const cards = screen.getAllByTestId("journey-tour-card");
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      const link = within(card).getByRole("link", { name: /View on (Viator|GetYourGuide)/ });
      const product = tourBookingOffers.find((offer) => offer.publicUrl === link.getAttribute("href"));
      expect(product, link.getAttribute("href") || "").toBeDefined();
      expect(affiliateConfig[product!.id]?.trackingUrl).toBeUndefined();
      expect(link.getAttribute("rel")).not.toContain("sponsored");
    }
    expect(container.querySelector('#visit-return p a[href="/travel-blog/day-trips-from-jerusalem/"]')).toBeInTheDocument();
    expect(screen.queryByRole("table", { name: /Compare ways to reach Bethlehem/ })).not.toBeInTheDocument();
  }, 15000);

  it("Dead Sea chooses a precise beach or park, explains 486/444 and separates private transport from guiding", async () => {
    const { container } = await renderGuide(travelGuidePaths.jerusalemDeadSea, DeadSeaRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bus 486, Tours & Driving");
    expect(screen.getByTestId("journey-option-cards").children).toHaveLength(4);
    expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(4);
    expect(screen.getByRole("heading", { name: "Ein Bokek" })).toBeInTheDocument();
    expect(screen.getByText(/Egged 486 serves/)).toBeInTheDocument();
    expect(screen.getByText(/₪2,100 per vehicle/)).toBeInTheDocument();
    expect(screen.getByTestId("journey-owner-trip")).toHaveTextContent("transport");
    expect(screen.getByTestId("journey-owner-trip")).toHaveTextContent("guiding");
    expect(screen.queryAllByTestId("journey-tour-card")).toHaveLength(0);
    expect(container.querySelector('#bus p')).toHaveTextContent("486");
    expect(container.querySelector('#driving p a[href="/car-rental/"]')).toBeInTheDocument();
    expect(container.querySelector('#day-plan p a[href="/travel-blog/the-dead-sea/"]')).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ein Gedi Nature Reserve updates/ })).toHaveAttribute("href", "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/");
  }, 15000);

  it("retains original SEO URLs, updated metadata and real source references", async () => {
    for (const [id, route] of [["bethlehem", BethlehemRoute], ["jerusalemDeadSea", DeadSeaRoute]] as const) {
      const guide = travelGuides[id];
      expect(guide.updatedAt).toBe("2026-10-23");
      expect(guide.faqs.length).toBeGreaterThanOrEqual(7);
      expect(guide.sourceIds.every((sourceId) => getSource(sourceId)?.url.startsWith("https://"))).toBe(true);
      for (const section of guide.sections) for (const link of section.inlineLinks || []) {
        expect(section.paragraphs.join(" ")).toContain(link.text);
      }
      const head = await route.options.head?.({} as never);
      expect(head?.meta).toContainEqual(expect.objectContaining({ title: expect.stringContaining(guide.title) }));
      const canonical = head?.links?.find((link) => link.rel === "canonical");
      expect(canonical?.href).toContain(travelGuidePaths[id]);
    }
  });
});
