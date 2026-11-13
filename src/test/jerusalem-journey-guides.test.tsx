import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { routeTree } from "@/routeTree.gen";
import { Route as BethlehemRoute } from "@/routes/travel-blog.jerusalem-to-bethlehem";
import { Route as DeadSeaRoute } from "@/routes/travel-blog.jerusalem-to-the-dead-sea";
import { affiliateConfig, tourBookingOffers, travelGuidePaths, getSource } from "@/data/registry";
import { travelGuides } from "@/data/travelGuides";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";

afterEach(cleanup);

async function renderGuide(path: string, component: NonNullable<typeof BethlehemRoute.options.component>) {
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

  it("Dead Sea puts useful beach guidance and real booking options beside the relevant sections", async () => {
    const { container } = await renderGuide(travelGuidePaths.jerusalemDeadSea, DeadSeaRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bus, Taxi, Tours & Car");
    expect(screen.queryByTestId("journey-option-cards")).not.toBeInTheDocument();
    expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(4);
    expect(screen.getByRole("heading", { name: /Jerusalem to the Dead Sea: ways to travel/ })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /Jerusalem to the Dead Sea: ways to travel/ })).toBeInTheDocument();
    expect(screen.getByText(/Masada, Ein Gedi, Qumran and Qasr al-Yahud can each add something different/)).toBeInTheDocument();
    expect(screen.getByText(/Walk among springs, waterfalls, green vegetation/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qumran" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qasr al-Yahud" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where to go for a Dead Sea beach day" })).toBeInTheDocument();
    const beachSection = container.querySelector("#beach");
    expect(beachSection).not.toBeNull();
    expect(beachSection).toHaveTextContent("Northern-shore bathing beaches such as Kalia are closer to Jerusalem");
    expect(beachSection).toHaveTextContent("I generally recommend continuing south to Ein Bokek");
    expect(within(beachSection as HTMLElement).getByRole("link", { name: /Kalia Beach — admission and facilities/ }))
      .toHaveAttribute("href", "https://kaliadeadsea.com/en/kalia-beach-en/");
    expect(screen.getByRole("heading", { name: "By public bus: Egged 486 and 444" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By taxi or private driver: direct travel from your hotel" })).toBeInTheDocument();
    expect(screen.getAllByText(/Egged 486/).length).toBeGreaterThanOrEqual(1);

    const stopCards = screen.getAllByTestId("deadsea-attraction-card");
    expect(stopCards).toHaveLength(4);
    expect(new Set(stopCards.map(card => within(card).getByRole("img").getAttribute("src"))).size).toBe(4);
    for (const stopCard of stopCards) {
      expect(stopCard.tagName).toBe("A");
      expect(stopCard).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
    }
    const tourSection = container.querySelector("#tours");
    expect(tourSection).not.toBeNull();
    expect(within(tourSection as HTMLElement).queryByTestId("deadsea-moshe-tour")).not.toBeInTheDocument();
    expect(within(tourSection as HTMLElement).queryByRole("link", { name: /Moshe Barak|private Masada/i })).not.toBeInTheDocument();
    const privateSection = container.querySelector("#private");
    expect(privateSection).not.toBeNull();
    const privateTourLink = within(privateSection as HTMLElement).getByRole("link", { name: "private Masada and Dead Sea tour" });
    expect(privateTourLink).toHaveAttribute("href", "/tours/masada-dead-sea/");
    expect(privateSection).toHaveTextContent("₪2,100 per vehicle");
    const cards = within(tourSection as HTMLElement).getAllByTestId("deadsea-bookable-tour");
    expect(cards).toHaveLength(5);
    expect(deadSeaTourCards.filter(tour => tour.provider === "Viator")).toHaveLength(3);
    expect(deadSeaTourCards.filter(tour => tour.provider === "GetYourGuide")).toHaveLength(2);
    const expectedLinks = [
      "https://viator.tpm.li/mFyULbRB",
      "https://viator.tpm.li/ccE2RHo7",
      "https://viator.tpm.li/2OUbWPvV",
      "https://getyourguide.tpm.li/htf3XviP",
      "https://getyourguide.tpm.li/BcWk9QKl",
    ];
    expect(deadSeaTourCards.map(tour => affiliateConfig[tour.id]?.trackingUrl)).toEqual(expectedLinks);
    for (const [index, card] of cards.entries()) {
      expect(card.tagName).toBe("A");
      expect(card).toHaveAttribute("href", expectedLinks[index]);
      expect(card.getAttribute("rel")).toContain("sponsored");
      expect(within(card).getByRole("img")).toBeInTheDocument();
      expect(card).toHaveTextContent("From US$");
      expect(card).toHaveTextContent(deadSeaTourCards[index].duration);
      expect(card).toHaveTextContent(deadSeaTourCards[index].rating.toFixed(1));
      expect(card).not.toHaveTextContent("affiliate link");
      expect(card).not.toHaveTextContent("Sponsored link");
    }
    const allTourPhotos = cards.map(card => within(card).getByRole("img").getAttribute("src"));
    expect(new Set(allTourPhotos).size).toBe(5);
    expect(allTourPhotos.every(photo => !stopCards.some(stop => within(stop).getByRole("img").getAttribute("src") === photo))).toBe(true);
    expect(container.querySelector("#journey-booking")).toBeNull();
    expect(screen.getAllByRole("note")).toHaveLength(6);
    expect(container.querySelector('#beach p a[href="/travel-blog/the-dead-sea/"]')).toBeInTheDocument();
    expect(container.querySelector('#driving p a[href="' + carRentalAffiliateUrl(travelGuidePaths.jerusalemDeadSea) + '"]')).toBeInTheDocument();
    expect(container.querySelector("#driving")).not.toHaveTextContent("(affiliate link)");
    const relatedGuides = screen.getByTestId("deadsea-related-guides");
    expect(relatedGuides.children).toHaveLength(6);
    expect(within(relatedGuides).getAllByRole("img")).toHaveLength(6);
    expect(new Set(within(relatedGuides).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    const nextSteps = screen.getByTestId("deadsea-next-steps");
    expect(within(nextSteps).getAllByRole("link")).toHaveLength(4);
    expect(nextSteps).not.toHaveTextContent("affiliate");
    const contact = container.querySelector("#contact");
    const sources = container.querySelector("#sources");
    expect(contact).not.toBeNull();
    expect(sources).not.toBeNull();
    expect(contact!.compareDocumentPosition(sources!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("link", { name: /Plan an Ein Gedi visit/ }))
      .toHaveAttribute("href", "https://en.parks.org.il/reserve-park/en-gedi-nature-reserve/");
    const compare = container.querySelector("#at-a-glance")!;
    const bus = container.querySelector("#bus")!;
    const attractions = container.querySelector("#journey-destinations")!;
    expect(compare.compareDocumentPosition(bus) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(bus.compareDocumentPosition(attractions) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }, 15000);

  it("retains original SEO URLs, updated metadata and real source references", async () => {
    for (const [id, route] of [["bethlehem", BethlehemRoute], ["jerusalemDeadSea", DeadSeaRoute]] as const) {
      const guide = travelGuides[id];
      expect(guide.updatedAt).toBe(id === "jerusalemDeadSea" ? "2026-11-13" : "2026-10-24");
      expect(guide.faqs.length).toBeGreaterThanOrEqual(7);
      expect(guide.sourceIds.every((sourceId) => getSource(sourceId)?.url.startsWith("https://"))).toBe(true);
      for (const section of guide.sections) for (const link of section.inlineLinks || []) {
        expect(section.paragraphs.join(" ")).toContain(link.text);
      }
      const head = await route.options.head?.({} as never);
      expect(head?.meta).toContainEqual(expect.objectContaining({ title: expect.stringContaining(guide.title) }));
      const canonical = head?.links?.find((link) => link?.rel === "canonical");
      expect(canonical?.href).toContain(travelGuidePaths[id]);
    }
  });
});
