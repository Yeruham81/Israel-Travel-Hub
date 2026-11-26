import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { routeTree } from "@/routeTree.gen";
import { Route as BethlehemRoute } from "@/routes/travel-blog.jerusalem-to-bethlehem";
import { Route as DeadSeaRoute } from "@/routes/travel-blog.jerusalem-to-the-dead-sea";
import { affiliateConfig, tourBookingOffers, travelGuidePaths, getSource } from "@/data/registry";
import { travelGuides } from "@/data/travelGuides";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
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
  it("Bethlehem compares complete transport choices, authentic photos, relevant tours and return planning", async () => {
    const { container } = await renderGuide(travelGuidePaths.bethlehem, BethlehemRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bus, Taxi & Tours");
    expect(screen.queryByTestId("journey-option-cards")).not.toBeInTheDocument();
    expect(screen.queryByTestId("journey-stop-cards")).not.toBeInTheDocument();
    const comparison = screen.getByRole("table", { name: /Compare ways to reach Bethlehem/ });
    expect(comparison).toBeInTheDocument();
    expect(within(comparison).getByRole("rowheader", { name: "Bus 231" })).toHaveClass("sticky");
    expect(within(comparison).getAllByRole("columnheader")[0]).toHaveClass("sticky");
    const buses = container.querySelector("#buses");
    expect(buses).not.toBeNull();
    expect(buses).toHaveTextContent("Bab al-Zaqaq");
    expect(buses).toHaveTextContent("Checkpoint 300");
    expect(within(buses as HTMLElement).getByRole("link", { name: /return timetable for your journey/ }))
      .toHaveAttribute("href", "https://south-buses.com/lines-and-stations/?lang=en");
    expect(within(buses as HTMLElement).getByRole("link", { name: /publishes an ₪8 standard cash fare/ }))
      .toHaveAttribute("href", "https://south-buses.com/?lang=en");
    expect(within(buses as HTMLElement).getByRole("link", { name: /Christian Information Center's East Jerusalem bus guide/ }))
      .toHaveAttribute("href", "https://www.cicts.org/en/east-jerusalem-bus-lines");
    const entry = container.querySelector("#entry-rules") as HTMLElement;
    const rental = container.querySelector("#rental-car") as HTMLElement;
    expect(screen.getByRole("heading", { name: "Before you go: Area A, entry rules and checkpoints" })).toBeInTheDocument();
    expect(entry).toHaveTextContent("Bethlehem is in Area A of the West Bank");
    expect(entry).toHaveTextContent("including dual citizens");
    expect(entry).not.toHaveTextContent("rental-car agreements");
    expect(entry.compareDocumentPosition(comparison) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(comparison.compareDocumentPosition(buses!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelectorAll("#entry-rules")).toHaveLength(1);
    const entryNavLink = container.querySelector('a[href="#entry-rules"]') as HTMLAnchorElement;
    const comparisonNavLink = container.querySelector('a[href="#at-a-glance"]') as HTMLAnchorElement;
    expect(entryNavLink).toBeInTheDocument();
    expect(comparisonNavLink).toBeInTheDocument();
    expect(entryNavLink.compareDocumentPosition(comparisonNavLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Can you drive a rental car to Bethlehem?" })).toBeInTheDocument();
    const rentalLink = within(rental).getByRole("link", { name: /^rental car/i });
    expect(rentalLink).toHaveAttribute("href", "/car-rental/");
    expect(rentalLink).not.toHaveAttribute("target");
    expect(rentalLink).not.toHaveAttribute("rel");
    expect(screen.getByRole("heading", { name: /visit Bethlehem on Saturday or Sunday/ })).toBeInTheDocument();
    const localTaxi = container.querySelector("#private-taxi") as HTMLElement;
    expect(localTaxi.querySelector("p")).toHaveTextContent("Palestinian taxi driver who has the necessary permits and insurance");
    expect(localTaxi.querySelector("p")).toHaveTextContent("Confirm that both the driver and vehicle are permitted");
    expect(within(localTaxi).queryByRole("link", { name: /Enquire about a legally permitted private journey/ })).not.toBeInTheDocument();
    expect(localTaxi.querySelector('a[href="/private-driver-in-israel/"]')).toBeNull();
    expect((container.querySelector("#visit-return") as HTMLElement).querySelectorAll("p")[0]).not.toHaveTextContent("Manger Square");
    expect((container.querySelector("#bethlehem-sites") as HTMLElement)).toHaveTextContent("Manger Square");
    expect(screen.getByTestId("bethlehem-tour-options")).toHaveTextContent("These tours are operated by independent providers");
    expect(within(container.querySelector("#private-taxi") as HTMLElement)
      .getByRole("img", { name: /Yellow Palestinian taxi/ })).toBeInTheDocument();
    expect(within(container.querySelector("#visit-return") as HTMLElement)
      .getByRole("img", { name: /Christmas lights/ })).toBeInTheDocument();
    expect(within(container.querySelector("#bethlehem-sites") as HTMLElement)
      .getByRole("img", { name: /Milk Grotto/ })).toBeInTheDocument();
    const cards = screen.getAllByTestId("bethlehem-tour-card");
    expect(cards).toHaveLength(6);
    expect(new Set(cards.map(card => within(card).getByRole("img").getAttribute("src"))).size).toBe(6);
    expect(cards.map(card => within(card).getByRole("img").getAttribute("src")).join(" ")).not.toMatch(/palestinian-taxi|mamilla|manger-square|milk-grotto|nativity-courtyard/);
    expect(within(cards[5]!).getByRole("img", { name: /Shepherds’ Field Chapel mural/ }).getAttribute("src")).toMatch(/shepherds-field-chapel/);
    expect(within(screen.getByTestId("bethlehem-tour-options")).getByRole("link", { name: /Armineaghayan \/ Wikimedia Commons/ })).toHaveAttribute("href", expect.stringContaining("commons.wikimedia.org"));
    expect(container.querySelectorAll("#buses [role='note'], #private-taxi [role='note'], #visit-return [role='note']")).toHaveLength(3);
    expect(container.textContent).not.toContain("These are route descriptions, not live departures.");
    expect(container.textContent).not.toContain("Compare organised Bethlehem tours");
    expect(container.textContent).not.toContain("Prices, reviews and itinerary details are snapshots");
    expect(container.textContent).not.toContain("Starting prices and ratings were checked");
    expect(within(buses as HTMLElement).getByRole("link", { name: /return timetable for your journey/ }).closest("p")).toHaveTextContent("₪8");
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("link", { name: /Grotto of the Nativity has separate visiting hours/ })).toHaveAttribute("href", "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/");
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("link", { name: /Grotto of the Nativity has separate visiting hours/ }).closest("p")).toHaveTextContent("12:30–14:30");
    expect(container.querySelector("#shabbat")).toHaveTextContent("Check both the bus timetable and church visiting hours");
    expect(container.querySelector("#checklist")?.querySelectorAll("li")).toHaveLength(4);
    expect(within(container.querySelector("#checklist") as HTMLElement).getByRole("heading", { name: "Travel checklist" })).toBeInTheDocument();
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("note")).toHaveTextContent("allow time for the queue");
    expect(container.textContent).not.toContain("return later if your schedule allows");
    const bodyPhotos = [...container.querySelectorAll("#private-taxi img, #visit-return img")].map(img => img.getAttribute("src"));
    expect(cards.some(card => bodyPhotos.includes(within(card).getByRole("img").getAttribute("src")))).toBe(false);
    for (const card of cards) {
      expect(card.tagName).toBe("ARTICLE");
      expect(within(card).getByRole("link", {name:/^View tour:/}).getAttribute("href")).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\//);
      expect(within(card).getByRole("link", {name:/^View tour:/}).getAttribute("rel")).toContain("sponsored");
      expect(within(card).getByText(/US\$\d+/)).toBeInTheDocument();
      expect(within(card).getByLabelText(/out of 5 from \d+ reviews/)).toBeInTheDocument();
    }
    expect(cards.filter(card => card.textContent?.includes("per group (up to 4)"))).toHaveLength(2);
    expect(cards.filter(card => card.textContent?.includes("per person"))).toHaveLength(4);
    expect(screen.queryByRole("heading", { name: /Bethlehem tickets, local visits and the correct return route/ })).not.toBeInTheDocument();
    expect(screen.queryByTestId("journey-tour-card")).not.toBeInTheDocument();
    const related = screen.getByTestId("bethlehem-related-guides");
    expect(within(related).getAllByRole("img")).toHaveLength(6);
    const oldCityGuideCard = within(related).getByRole("link", { name: /Jerusalem's Old City/i });
    expect(within(oldCityGuideCard).getByRole("img").getAttribute("src")).toBe(oldCityJerusalemSite.hero.src);
    expect(within(related).getAllByRole("img").map(img => img.getAttribute("src")).join(" ")).not.toContain("old-city-BJwjTGND");
    expect(new Set(within(related).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    const nextBethlehem = screen.getByTestId("bethlehem-next-steps");
    expect(within(nextBethlehem).getAllByRole("link")).toHaveLength(6);
    expect(nextBethlehem.querySelectorAll("li svg")).toHaveLength(6);
    expect(within(related).getByRole("link", { name: /Christian Tours in Israel/i })).toHaveAttribute("href", "/travel-blog/christian-tours-in-israel/");
    expect(within(related).queryByRole("link", { name: /Masada National Park/i })).not.toBeInTheDocument();
    expect(container.querySelector("#contact")).toHaveTextContent("Need a Private Transfer To or From Jerusalem?");
    expect(container.querySelector("#contact")).toHaveTextContent("private transport to or from Jerusalem");
    const faq = container.querySelector("#faq")!;
    const contact = container.querySelector("#contact")!;
    const sources = container.querySelector("#sources")!;
    expect(faq.compareDocumentPosition(related) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(comparison.compareDocumentPosition(buses!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }, 15000);

  it("Dead Sea puts useful beach guidance and real booking options beside the relevant sections", async () => {
    const { container } = await renderGuide(travelGuidePaths.jerusalemDeadSea, DeadSeaRoute.options.component!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bus, Taxi, Tours & Car");
    expect(screen.queryByTestId("journey-option-cards")).not.toBeInTheDocument();
    expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(4);
    expect(screen.getByRole("heading", { name: /Jerusalem to the Dead Sea: ways to travel/ })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /Jerusalem to the Dead Sea: ways to travel/ })).toBeInTheDocument();
    expect(screen.getByText(/If you have extra time, consider adding Masada/)).toBeInTheDocument();
    expect(screen.getByText(/Explore an oasis and desert trails/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qumran" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qasr al-Yahud" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where to go for a Dead Sea beach day" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Add a stop to your Dead Sea day" })).toBeInTheDocument();
    expect(container.querySelector("#day-plan")).toBeNull();
    expect(screen.queryByText("Optional stops to add to your Dead Sea day trip")).not.toBeInTheDocument();
    expect(screen.getByText(/Blue-and-white parking near the central beach is paid/)).toBeInTheDocument();
    const beachSection = container.querySelector("#beach");
    expect(beachSection).not.toBeNull();
    expect(beachSection).toHaveTextContent("hotel-operated public beaches");
    expect(beachSection).toHaveTextContent("I recommend Ein Bokek");
    expect(within(beachSection as HTMLElement).getByRole("link", { name: /Tamar Regional Council - hotel-beach equipment rules/ }))
      .toHaveAttribute("href", "https://www.deadsea.co.il/attractions/the-hotel-beaches/?lang=en/");
    expect(screen.getByRole("heading", { name: "By public bus: Egged 486 and 444" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By taxi or private driver: direct travel from your hotel" })).toBeInTheDocument();
    expect(screen.getAllByText(/Egged 486/).length).toBeGreaterThanOrEqual(1);

    const drivingPhoto = within(container.querySelector("#driving") as HTMLElement).getByRole("img", { name: /Route 90 curving beside the Dead Sea/ });
    const einBokekPhoto = within(container.querySelector("#beach") as HTMLElement).getByRole("img", { name: /Ein Bokek shoreline/ });
    expect(drivingPhoto.getAttribute("src")).not.toBe(einBokekPhoto.getAttribute("src"));
    const mainPhoto = container.querySelector("header figure img");
    expect(mainPhoto).not.toBeNull();
    expect(drivingPhoto.getAttribute("src")).not.toBe(mainPhoto?.getAttribute("src"));
    const stopCards = screen.getAllByTestId("deadsea-attraction-card");
    expect(stopCards).toHaveLength(4);
    expect(new Set(stopCards.map(card => within(card).getByRole("img").getAttribute("src"))).size).toBe(4);
    expect(stopCards.every(card => card.tagName === "A")).toBe(true);
    for (const href of ["/attractions/masada/", "/attractions/ein-gedi/", "/attractions/qasr-el-yahud/"]) {
      expect(stopCards.some(card => card.getAttribute("href") === href)).toBe(true);
    }
    expect(stopCards.find(card => card.getAttribute("href")?.includes("qumran"))?.getAttribute("target")).toBe("_blank");
    const tourSection = container.querySelector("#tours");
    expect(tourSection).not.toBeNull();
    expect(within(tourSection as HTMLElement).queryByTestId("deadsea-moshe-tour")).not.toBeInTheDocument();
    expect(within(tourSection as HTMLElement).queryByRole("link", { name: /Moshe Barak|private Masada/i })).not.toBeInTheDocument();
    const privateSection = container.querySelector("#private");
    expect(privateSection).not.toBeNull();
    const privateTourLink = within(privateSection as HTMLElement).getByRole("link", { name: "Masada and Dead Sea tours" });
    expect(privateTourLink).toHaveAttribute("href", "/tours/masada-dead-sea/");
    expect(privateSection).toHaveTextContent("I'll reply personally with a quote");
    expect(privateSection).not.toHaveTextContent("₪2,100");
    expect(tourSection).not.toHaveTextContent("The tours below offer different combinations of sightseeing and beach time.");
    const cards = within(tourSection as HTMLElement).getAllByTestId("deadsea-bookable-tour");
    expect(cards).toHaveLength(6);
    expect(deadSeaTourCards.filter(tour => tour.provider === "Viator")).toHaveLength(4);
    expect(deadSeaTourCards.filter(tour => tour.provider === "GetYourGuide")).toHaveLength(2);
    const regionalTour = deadSeaTourCards.find(tour => tour.id === "jslm-deadsea-jericho-jordan-viator");
    expect(regionalTour).toMatchObject({ fromUsd: 116, rating: 4.2, reviewCount: 16, photoId: "jordan-river" });
    expect(deadSeaTourCards.some(tour => tour.title.includes("Bethlehem"))).toBe(false);
    const expectedLinks = [
      "https://viator.tpm.li/mFyULbRB",
      "https://viator.tpm.li/ccE2RHo7",
      "https://viator.tpm.li/2OUbWPvV",
      "https://getyourguide.tpm.li/htf3XviP",
      "https://getyourguide.tpm.li/BcWk9QKl",
      "https://viator.tpm.li/OVUPYDvw",
    ];
    expect(deadSeaTourCards.map(tour => affiliateConfig[tour.id]?.trackingUrl)).toEqual(expectedLinks);
    for (const [index, card] of cards.entries()) {
      const tour = deadSeaTourCards[index]!;
      expect(card.tagName).toBe("ARTICLE");
      expect(within(card).getByRole("link", {name:/^View tour:/})).toHaveAttribute("href", expectedLinks[index]);
      expect(within(card).getByRole("link", {name:/^View tour:/}).getAttribute("rel")).toContain("sponsored");
      expect(within(card).getByRole("img")).toBeInTheDocument();
      expect(card).toHaveTextContent("From US$" + tour.fromUsd);
      expect(card).toHaveTextContent(tour.duration);
      expect(card).toHaveTextContent(tour.rating.toFixed(1));
      expect(card).not.toHaveTextContent("affiliate link");
      expect(card).not.toHaveTextContent("Sponsored link");
      expect(card).not.toHaveTextContent("Jerusalem departure");
    }
    const allTourPhotos = cards.map(card => within(card).getByRole("img").getAttribute("src"));
    expect(new Set(allTourPhotos).size).toBe(6);
    expect(allTourPhotos.every(photo => !stopCards.some(stop => within(stop).getByRole("img").getAttribute("src") === photo))).toBe(true);
    expect(container.querySelector("#journey-booking")).toBeNull();
    expect(screen.queryAllByRole("note")).toHaveLength(0);
    expect(container.querySelector('#beach p a[href="/attractions/dead-sea/"]')).toBeInTheDocument();
    expect(container.querySelector('#driving p a[href="/car-rental/"]')).toBeInTheDocument();
    expect(container.querySelector("#driving")).not.toHaveTextContent("(affiliate link)");
    const relatedGuides = screen.getByTestId("deadsea-related-guides");
    expect(relatedGuides.children).toHaveLength(6);
    expect(within(relatedGuides).getAllByRole("img")).toHaveLength(6);
    expect(within(relatedGuides).getByRole("link", { name: /Getting around Israel/i })).toHaveAttribute("href", "/travel-blog/getting-around-israel/");
    expect(within(relatedGuides).getByRole("link", { name: /Best time to visit Israel/i })).toHaveAttribute("href", "/travel-blog/best-time-to-visit-israel/");
    expect(within(relatedGuides).queryByRole("link", { name: /Ein Gedi Nature Reserve/i })).not.toBeInTheDocument();
    expect(new Set(within(relatedGuides).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    const nextSteps = screen.getByTestId("deadsea-next-steps");
    expect(within(nextSteps).getAllByRole("link")).toHaveLength(6);
    expect(nextSteps.querySelectorAll("li svg")).toHaveLength(6);
    expect(within(nextSteps).getByRole("link", { name: /Israel's Calendar of Events/ }))
      .toHaveAttribute("href", "/travel-blog/calendar-of-events/");
    expect(nextSteps).not.toHaveTextContent("Arriving from Ben Gurion Airport?");
    expect(nextSteps).not.toHaveTextContent("affiliate");
    const contact = container.querySelector("#contact");
    const sources = container.querySelector("#sources");
    expect(contact).not.toBeNull();
    expect(sources).not.toBeNull();
    expect(contact!.compareDocumentPosition(sources!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("link", { name: /Ein Gedi.*Explore an oasis/i }))
      .toHaveAttribute("href", "/attractions/ein-gedi/");
    const compare = container.querySelector("#at-a-glance")!;
    const bus = container.querySelector("#bus")!;
    const attractions = container.querySelector("#journey-destinations")!;
    expect(compare.compareDocumentPosition(bus) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(bus.compareDocumentPosition(attractions) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }, 15000);

  it("uses concise copy while preserving Bethlehem rich links and Dead Sea booking details", () => {
    const bethlehem = travelGuides.bethlehem;
    const deadSea = travelGuides.jerusalemDeadSea;
    const entry = bethlehem.sections.find(section => section.id === "entry-rules")!;
    const bus = bethlehem.sections.find(section => section.id === "buses")!;
    const rental = bethlehem.sections.find(section => section.id === "rental-car")!;
    const visit = bethlehem.sections.find(section => section.id === "visit-return")!;
    const weekend = bethlehem.sections.find(section => section.id === "shabbat")!;
    for (const section of [entry, bus, rental, visit, weekend]) {
      expect(section.richParagraphs).toHaveLength(section.paragraphs.length);
      section.richParagraphs?.forEach((spans, index) => {
        expect(spans.map(span => span.text).join(""), section.id + " paragraph " + index).toBe(section.paragraphs[index]);
      });
    }
    expect(bethlehem.intro).toContain("getting there requires some planning");
    expect(bus.subsections?.find(sub => sub.id === "bus-231")?.title).toContain("via Beit Jala");
    expect(bus.paragraphs.join(" ")).not.toContain("Line 231 passes through the Bab al-Zaqaq");
    expect(visit.paragraphs[1]).toContain("12:30–14:30");
    expect(weekend.paragraphs.join(" ")).not.toContain("11:00 to 15:00");
    expect(deadSea.answer).toContain("line 444 requires an advance seat reservation");
    expect(deadSea.sections.find(section => section.id === "beach")?.tip).toBeUndefined();
    expect(deadSea.sections.find(section => section.id === "private")?.paragraphs.join(" ")).not.toContain("₪2,100");
    expect(deadSea.sections.find(section => section.id === "driving")?.paragraphs.join(" ")).toContain("Desert rain can cause sudden flash floods");
    expect(deadSea.sections.find(section => section.id === "bus")?.paragraphs.join(" ")).toContain("Line 444 continues towards Eilat");
  });

  it("retains original SEO URLs, updated metadata and real source references", async () => {
    for (const [id, route] of [["bethlehem", BethlehemRoute], ["jerusalemDeadSea", DeadSeaRoute]] as const) {
      const guide = travelGuides[id];
      expect(guide.updatedAt).toBe("2026-11-24");
      if (id === "jerusalemDeadSea") {
        expect(guide.faqs).toHaveLength(5);
        expect(guide.faqs.some(faq => faq.q === "Is the public beach at Ein Bokek wheelchair-accessible?")).toBe(true);
        expect(guide.faqs.some(faq => faq.a.includes("beach wheelchairs can be borrowed"))).toBe(true);
        expect(guide.faqs.some(faq => faq.q === "Can I make a Dead Sea day trip without a car?")).toBe(false);
      } else expect(guide.faqs.length).toBeGreaterThanOrEqual(7);
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
