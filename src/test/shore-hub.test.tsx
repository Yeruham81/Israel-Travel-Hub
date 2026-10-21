import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Route } from "@/routes/shore-excursions";
import { routeTree } from "@/routeTree.gen";
import { shoreHubExperiences } from "@/data/shoreHub";
import { servicesForPort, filterShoreServices } from "@/lib/shore-services";
import { CANONICAL_ORIGIN } from "@/lib/site";

afterEach(cleanup);

async function renderHub() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/shore-excursions/"] }), trailingSlash: "always" });
  await router.load();
  const Page = Route.options.component!;
  render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
  return router;
}

describe("Israel shore excursion hub", () => {
  it("connects useful destination choices to the matching return-tour catalog", async () => {
    const router = await renderHub();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Your cruise port makes the difference" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Private driver or guided shore excursion?" })).toBeInTheDocument();
    const destinations = screen.getByRole("region", { name: "Where can you go on an Israel shore excursion?" });
    for (const choice of shoreHubExperiences.flatMap((experience) => experience.links)) {
      const link = within(destinations).getByRole("link", { name: choice.label });
      const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
      expect(url.searchParams.get("destination")).toBe(choice.destination);
      const matches = filterShoreServices(choice.portId, { destination: choice.destination });
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.every((tour) => servicesForPort(choice.portId).some((item) => item.id === tour.id))).toBe(true);
    }
    fireEvent.click(within(destinations).getByRole("link", { name: "Masada from Ashdod" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/ashdod-shore-excursions/"));
    expect(router.state.location.search).toEqual({ destination: "masada" });
  });

  it("provides six illustrated destination guides, working internal links and port-specific inquiry anchors", async () => {
    const router = await renderHub();
    const guides = screen.getByRole("region", { name: "Get to know the places on your route" });
    expect(within(guides).getAllByRole("article")).toHaveLength(6);
    expect(within(guides).getAllByRole("img")).toHaveLength(6);
    expect(within(guides).getAllByRole("link").every((link) => link.textContent === "Read More")).toBe(true);
    expect(guides).not.toHaveTextContent("→");
    expect(screen.getByRole("link", { name: "Plan my day from Ashdod" })).toHaveAttribute("href", "/ashdod-shore-excursions/#request-quote");
    expect(screen.getByRole("link", { name: "Plan my day from Haifa" })).toHaveAttribute("href", "/haifa-shore-excursions/#request-quote");
    for (const link of document.querySelectorAll('main a[href^="/"]')) {
      const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
      expect(router.matchRoutes(url.pathname).at(-1)?.routeId.replace(/\/$/, "")).toBe(url.pathname.replace(/\/$/, ""));
    }
    expect(document.querySelector("a a")).toBeNull();
  });

  it("describes a collection of the two real port pages without changing staging indexing or claiming live offers", async () => {
    const head = await Route.options.head?.({} as never);
    expect(head?.meta).toEqual(expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]));
    expect(head?.links).toContainEqual({ rel: "canonical", href: `${CANONICAL_ORIGIN}/shore-excursions/` });
    const schemas = (head?.scripts || []).map((script) => JSON.parse(String(script?.children)));
    const collection = schemas.find((schema) => schema["@type"] === "CollectionPage");
    expect(collection.mainEntity.itemListElement.map((item: { item: { url: string } }) => item.item.url)).toEqual([`${CANONICAL_ORIGIN}/ashdod-shore-excursions/`, `${CANONICAL_ORIGIN}/haifa-shore-excursions/`]);
    expect(collection.author).toMatchObject({ "@type": "Person", name: "Moshe Barak" });
    expect(JSON.stringify(schemas)).not.toMatch(/"(?:offers|aggregateRating|review)"|"@type":"(?:Product|FAQPage)"/);
  });
});
