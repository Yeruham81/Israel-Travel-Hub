import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Route } from "@/routes/shore-excursions.index";
import { services } from "@/routes/index";
import { routeTree } from "@/routeTree.gen";
import { shoreHubExperiences } from "@/data/shoreHub";
import { shoreHubGuides } from "@/data/shoreReading";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { servicesForPort, filterShoreServices } from "@/lib/shore-services";
import { CANONICAL_ORIGIN } from "@/lib/site";

afterEach(cleanup);

async function renderHub() {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/shore-excursions/"] }),
    trailingSlash: "always",
  });
  await router.load();
  const Page = Route.options.component!;
  render(
    <RouterContextProvider router={router}>
      <Page />
    </RouterContextProvider>,
  );
  return router;
}

describe("Israel shore excursion hub", () => {
  it("connects useful destination choices to the matching return-tour catalog", async () => {
    const router = await renderHub();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Choose your cruise port" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Private driver or guided excursion?" }),
    ).toBeInTheDocument();
    const destinations = screen.getByRole("region", { name: "Popular shore excursion routes" });
    for (const experience of shoreHubExperiences) {
      const card = destinations.querySelector(
        `[data-experience="${experience.id}"]`,
      )! as HTMLElement;
      expect(new Set(experience.links.map((link) => link.label)).size).toBe(
        experience.links.length,
      );
      for (const choice of experience.links) {
        const link = within(card).getByRole("link", { name: choice.label });
        const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
        expect(url.searchParams.get("destination")).toBe(choice.destination);
        const matches = filterShoreServices(choice.portId, { destination: choice.destination });
        expect(matches.length).toBeGreaterThan(0);
        expect(
          matches.every((tour) =>
            servicesForPort(choice.portId).some((item) => item.id === tour.id),
          ),
        ).toBe(true);
      }
    }
    const desert = destinations.querySelector('[data-experience="desert"]')! as HTMLElement;
    expect(within(desert).getAllByRole("link", { name: "From Ashdod" })).toHaveLength(1);
    expect(
      filterShoreServices("ashdod", { destination: "masada" }).some((item) =>
        item.destinationIds.includes("dead-sea"),
      ),
    ).toBe(true);
    fireEvent.click(within(desert).getByRole("link", { name: "From Ashdod" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/shore-excursions/ashdod/"));
    expect(router.state.location.search).toEqual({ destination: "masada" });
  });

  it("uses compact illustrated port choices, matching primary CTAs and on-demand credits", async () => {
    await renderHub();
    const destinations = screen.getByRole("region", { name: "Popular shore excursion routes" });
    const homepageShorePhoto = services.find((service) => service.id === "shore-excursions")
      ?.feature?.src;
    expect(homepageShorePhoto).toBeTruthy();
    expect(
      within(screen.getByTestId("hub-header")).getByRole("img", {
        name: /Cruise passengers walking/,
      }),
    ).toHaveAttribute("src", homepageShorePhoto);
    // The six route cards have distinct illustrations, separate from related-guide images.
    expect(within(destinations).getAllByRole("img")).toHaveLength(6);
    expect(
      destinations.querySelector('[data-experience="coast"] img')?.getAttribute("src"),
    ).toMatch(/jaffa-route/);
    for (const experience of shoreHubExperiences) {
      const card = destinations.querySelector(`[data-experience="${experience.id}"]`);
      expect(card).not.toBeNull();
      expect(card?.querySelector("img")).not.toBeNull();
      expect(card).toHaveTextContent(experience.title);
    }
    expect(
      within(screen.getByTestId("hub-header")).queryByRole("link", {
        name: "Excursions from Ashdod",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByTestId("hub-header")).queryByRole("link", {
        name: "Excursions from Haifa",
      }),
    ).not.toBeInTheDocument();
    const quoteNav = screen.getByRole("navigation", { name: "Private cruise-port quote requests" });
    const bottomChoices = [
      within(quoteNav).getByRole("link", { name: "Request a quote from Ashdod" }),
      within(quoteNav).getByRole("link", { name: "Request a quote from Haifa" }),
    ];
    expect(bottomChoices[0]).toHaveClass("text-primary");
    expect(bottomChoices[1]).toHaveClass("text-primary");
    expect(bottomChoices[0]).toHaveAttribute("href", "/shore-excursions/ashdod/#request-quote");
    expect(bottomChoices[1]).toHaveAttribute("href", "/shore-excursions/haifa/#request-quote");
    expect(screen.getByRole("img", { name: "Moshe Barak" })).toBeInTheDocument();
    const ports = screen.getByRole("list", { name: "Cruise port excursion guides" });
    expect(ports).toHaveTextContent(
      "A convenient starting point for Jerusalem, Tel Aviv, Jaffa and the Dead Sea.",
    );
    expect(ports).toHaveTextContent(
      "A convenient gateway to Acre, Nazareth, the Sea of Galilee and Israel's northern coast.",
    );
    expect([...ports.querySelectorAll("img")].map((image) => image.getAttribute("src"))).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/ashdod-shore-excursions/),
        expect.stringMatching(/haifa-shore-excursions/),
      ]),
    );
    expect(screen.queryByText(/Pickup arrangements differ:/)).not.toBeInTheDocument();
    const credits = screen.getByText("Photo credits & licences").closest("details");
    expect(credits).not.toBeNull();
    expect(credits?.hasAttribute("open")).toBe(false);
    expect(credits?.querySelectorAll('a[href*="creativecommons.org"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll("a[href*='commons.wikimedia.org']").length).toBeGreaterThan(0);
  });

  it("provides six illustrated destination guides, working internal links and port-specific inquiry anchors", async () => {
    const router = await renderHub();
    const guides = screen.getByRole("region", { name: "Discover Israel's main attractions" });
    const related = within(guides).getAllByRole("link");
    expect(related).toHaveLength(6);
    expect(within(guides).getAllByRole("img")).toHaveLength(6);
    expect([...guides.querySelectorAll("img")].map((image) => image.getAttribute("src"))).toEqual(
      shoreHubGuides.map(
        (guide) => guideHeroPhotoForPath(String(guide.to))?.src ?? guide.photo.src,
      ),
    );
    expect(
      screen.getByText("Choose a destination to explore shore excursions from Ashdod or Haifa."),
    ).toBeInTheDocument();
    expect(
      within(guides)
        .getAllByRole("link")
        .every((link) => {
          const preview = link.querySelector("span.text-muted-foreground");
          return Boolean(preview && preview.textContent && preview.textContent.length < 80);
        }),
    ).toBe(true);
    const practical = screen.getByRole("region", { name: "Plan your trip to Israel" });
    expect(within(practical).getAllByRole("link")).toHaveLength(6);
    expect(within(practical).queryAllByRole("img")).toHaveLength(0);
    expect(
      within(practical)
        .getAllByRole("link")
        .every((link) => link.querySelector("svg") !== null),
    ).toBe(true);
    expect(
      related.every(
        (link) =>
          link.classList.contains("editorial-card-link") &&
          !link.textContent?.includes("Read more"),
      ),
    ).toBe(true);
    const photos = Array.from(document.querySelectorAll("main img")).map((image) =>
      image.getAttribute("src"),
    );
    expect(new Set(photos).size).toBe(photos.length);
    expect(guides).not.toHaveTextContent("→");
    const quoteNav = screen.getByRole("navigation", { name: "Private cruise-port quote requests" });
    expect(
      within(quoteNav).getByRole("link", { name: "Request a quote from Ashdod" }),
    ).toHaveAttribute("href", "/shore-excursions/ashdod/#request-quote");
    expect(
      within(quoteNav).getByRole("link", { name: "Request a quote from Haifa" }),
    ).toHaveAttribute("href", "/shore-excursions/haifa/#request-quote");
    for (const link of document.querySelectorAll('main a[href^="/"]')) {
      const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
      expect(router.matchRoutes(url.pathname).at(-1)?.routeId.replace(/\/$/, "")).toBe(
        url.pathname.replace(/\/$/, ""),
      );
    }
    expect(document.querySelector("a a")).toBeNull();
  });

  it("describes a collection of the two real port pages without changing staging indexing or claiming live offers", async () => {
    const head = await Route.options.head?.({} as never);
    expect(head?.meta).toEqual(
      expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]),
    );
    expect(head?.links).toContainEqual({
      rel: "canonical",
      href: `${CANONICAL_ORIGIN}/shore-excursions/`,
    });
    const schemas = (head?.scripts || []).map((script) => JSON.parse(String(script?.children)));
    const collection = schemas.find((schema) => schema["@type"] === "CollectionPage");
    expect(
      collection.mainEntity.itemListElement.map((item: { item: { url: string } }) => item.item.url),
    ).toEqual([
      `${CANONICAL_ORIGIN}/shore-excursions/ashdod/`,
      `${CANONICAL_ORIGIN}/shore-excursions/haifa/`,
    ]);
    expect(collection.author).toMatchObject({ "@type": "Person", name: "Moshe Barak" });
    expect(JSON.stringify(schemas)).not.toMatch(
      /"(?:offers|aggregateRating|review)"|"@type":"(?:Product|FAQPage)"/,
    );
  });
});
