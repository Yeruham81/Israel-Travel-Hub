import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as AboutRoute } from "@/routes/about-moshe-barak";
import { GuidePhotoCredit } from "@/components/TravelGuide";
import { SourceList } from "@/components/Guide";
import { formatCheckDate, getSource, isPublisherUrl, mosheBarakAuthor } from "@/data/registry";

afterEach(cleanup);

async function pageAt(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  const id = router.matchRoutes(path).at(-1)!.routeId;
  const Page = router.routesById[id]!.options.component!;
  return render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
}

describe("independent author identity and page credits", () => {
  it("shows one real portrait, experience statement and exact review profile across the page families", async () => {
    const paths = ["/", "/guides/", "/hotels/", "/transfers/", "/private-driver/", "/haifa-shore-excursions/", "/travel-blog/ben-gurion-airport-to-jerusalem/", "/travel-blog/where-to-stay-in-jerusalem/", "/tel-aviv/jaffa-hotels/", "/travel-blog/best-hotels-in-haifa/", "/dead-sea/spa-hotels/", "/attractions/caesarea/"];
    for (const path of paths) {
      const { container, unmount } = await pageAt(path);
      const cards = screen.getAllByTestId("author-card");
      expect(cards, path).toHaveLength(1);
      const card = cards[0]!;
      expect(within(card).getByRole("img", { name: "Moshe Barak" })).toHaveAttribute("width", "64");
      expect(card, path).toHaveTextContent("Over 20 years helping visitors travel around Israel");
      const reviews = within(card).getByRole("link", { name: /Read traveler reviews on Tripadvisor/ });
      expect(reviews, path).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
      expect(reviews).toHaveAttribute("target", "_blank");
      expect(reviews).toHaveAttribute("rel", "noopener noreferrer");
      expect(within(card).getByRole("link", { name: "Moshe Barak" })).toHaveAttribute("href", "/about-moshe-barak/#moshe-barak");
      expect(card).not.toHaveTextContent(/5\.0|five stars|\d+ reviews|licensed guide/i);
      expect(container.querySelector('a[href*="israel-taxi.com/wp-content/"]'), path).toBeNull();
      expect(container.querySelector('#sources a[href*="israel-taxi.com"]'), path).toBeNull();
      expect(container.textContent, path).not.toMatch(/editorial team|Adapted from|Source checks and limitations below|Image from the original publisher guide/);
      unmount();
    }
  });

  it("keeps required external photo attribution and removes owned-image migration credits", () => {
    const owned = { src: "/photo.jpg", alt: "Owned photograph", sourceUrl: "https://www.israel-taxi.com/wp-content/uploads/photo.jpg", credit: "Image from the original publisher guide" };
    const external = { src: "/commons.jpg", alt: "Licensed photograph", sourceUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg", credit: "Photographer · CC BY-SA 4.0 · resized", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
    const illustration = { src: "/illustration.webp", alt: "Illustration of an airport pickup", credit: "Illustrative scene; check the real route and terms." };
    const { container } = render(<><GuidePhotoCredit photo={owned} /><GuidePhotoCredit photo={illustration} /><GuidePhotoCredit photo={external} /></>);
    expect(container.querySelector(`a[href="${owned.sourceUrl}"]`)).toBeNull();
    expect(screen.getByRole("link", { name: /Photographer/ })).toHaveAttribute("href", external.sourceUrl);
    expect(screen.getByRole("link", { name: /Licence/ })).toHaveAttribute("href", external.licenseUrl);
    expect(container.textContent).not.toContain("original publisher");
    expect(container.textContent).not.toContain("Illustrative scene");
  });

  it("expands public references on demand and omits empty legacy-only source sections", () => {
    const { container, rerender } = render(<SourceList ids={["guide-original-shabbat"]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<SourceList ids={["guide-original-shabbat", "guide-weekend-711"]} />);
    const disclosure = container.querySelector("#sources details")!;
    const summary = disclosure.querySelector("summary")!;
    const reference = disclosure.querySelector("a")!;
    expect(disclosure).not.toHaveAttribute("open");
    expect(screen.getByRole("heading", { name: "Sources" })).toBeVisible();
    expect(reference).not.toBeVisible();
    fireEvent.click(summary);
    expect(disclosure).toHaveAttribute("open");
    expect(reference).toBeVisible();
    expect(screen.getByRole("link", { name: /Tel Aviv-Yafo Municipality/ })).toHaveAttribute("href", getSource("guide-weekend-711").url);
    expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
    fireEvent.click(summary);
    expect(disclosure).not.toHaveAttribute("open");
    expect(reference).not.toBeVisible();
    expect(formatCheckDate("2026-10-17")).toBe("October 2026");
    expect(isPublisherUrl("https://israel-taxi.com/about-me/")).toBe(true);
    expect(isPublisherUrl(mosheBarakAuthor.reviewsUrl)).toBe(false);
  });

  it("connects the visible local author biography to Person metadata without inventing review ratings", async () => {
    const { container } = await pageAt("/about-moshe-barak/");
    expect(container.querySelector("#moshe-barak")).toHaveTextContent("Moshe Barak");
    expect(screen.getByRole("heading", { level: 1, name: "About Moshe Barak" })).toBeInTheDocument();
    const head = await AboutRoute.options.head?.({} as never);
    const schema = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []).find((item) => item["@type"] === "Person");
    expect(schema).toMatchObject({ name: "Moshe Barak", url: expect.stringMatching(/\/about-moshe-barak\/#moshe-barak$/), sameAs: [mosheBarakAuthor.reviewsUrl] });
    expect(schema.aggregateRating).toBeUndefined();
    expect(schema.review).toBeUndefined();
    expect(head!.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
  });
});
