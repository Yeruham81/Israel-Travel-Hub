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
import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";

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
    expect(within(comparison).getByRole("rowheader", { name: "Bus 231" })).toBeInTheDocument();
    const buses = container.querySelector("#buses");
    expect(buses).not.toBeNull();
    expect(buses).toHaveTextContent("Bab al-Zaqaq");
    expect(buses).toHaveTextContent("Checkpoint 300");
    expect(within(buses as HTMLElement).getByRole("link", { name: /South Buses' routes and timetables/ }))
      .toHaveAttribute("href", "https://south-buses.com/lines-and-stations/?lang=en");
    expect(within(buses as HTMLElement).getByRole("link", { name: /fares and payment information/ }))
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
    expect(rentalLink).toHaveAttribute("href", carRentalAffiliateUrl(travelGuidePaths.bethlehem));
    expect(rentalLink.getAttribute("rel")).toContain("sponsored");
    expect(screen.getByRole("heading", { name: /visit Bethlehem on Saturday or Sunday/ })).toBeInTheDocument();
    const localTaxi = container.querySelector("#private-taxi") as HTMLElement;
    expect(localTaxi.querySelector("p")?.textContent?.startsWith("An appropriately authorised and insured Palestinian taxi")).toBe(true);
    expect(localTaxi.querySelector("p")).toHaveTextContent("Confirm that both the driver and vehicle are permitted");
    expect(within(localTaxi).queryByRole("link", { name: /Enquire about a legally permitted private journey/ })).not.toBeInTheDocument();
    expect(localTaxi.querySelector('a[href="/private-driver/"]')).toBeNull();
    expect((container.querySelector("#visit-return") as HTMLElement).querySelectorAll("p")[0]).not.toHaveTextContent("Manger Square");
    expect((container.querySelector("#bethlehem-sites") as HTMLElement)).toHaveTextContent("Manger Square");
    expect(screen.getByTestId("bethlehem-tour-options")).toHaveTextContent("Prices and availability can change");
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
    expect(within(buses as HTMLElement).getByRole("link", { name: /South Buses' routes and timetables/ }).closest("p")).toHaveTextContent("departures and return services");
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("link", { name: /published notice/ })).toHaveAttribute("href", "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/");
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("link", { name: /published notice/ }).closest("p")).toHaveTextContent("12:30–14:30");
    expect(container.querySelector("#shabbat")).toHaveTextContent("Check both the bus timetable and church visiting hours");
    expect(container.querySelector("#checklist")?.querySelectorAll("li")).toHaveLength(4);
    expect(within(container.querySelector("#checklist") as HTMLElement).getByRole("heading", { name: "Travel checklist" })).toBeInTheDocument();
    expect(within(container.querySelector("#visit-return") as HTMLElement).getByRole("note")).toHaveTextContent("allow time for the queue");
    expect(container.textContent).not.toContain("return later if your schedule allows");
    const bodyPhotos = [...container.querySelectorAll("#private-taxi img, #visit-return img")].map(img => img.getAttribute("src"));
    expect(cards.some(card => bodyPhotos.includes(within(card).getByRole("img").getAttribute("src")))).toBe(false);
    for (const card of cards) {
      expect(card.tagName).toBe("A");
      expect(card.getAttribute("href")).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\//);
      expect(card.getAttribute("rel")).toContain("sponsored");
      expect(within(card).getByText(/US\$\d+/)).toBeInTheDocument();
      expect(within(card).getByLabelText(/out of 5 from \d+ reviews/)).toBeInTheDocument();
    }
    expect(cards.filter(card => card.textContent?.includes("per group (up to 4)"))).toHaveLength(2);
    expect(cards.filter(card => card.textContent?.includes("per person"))).toHaveLength(4);
    expect(screen.queryByRole("heading", { name: /Bethlehem tickets, local visits and the correct return route/ })).not.toBeInTheDocument();
    expect(screen.queryByTestId("journey-tour-card")).not.toBeInTheDocument();
    const related = screen.getByTestId("bethlehem-related-guides");
    expect(within(related).getAllByRole("img")).toHaveLength(6);
    expect(new Set(within(related).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    expect(within(screen.getByTestId("bethlehem-next-steps")).getAllByRole("link")).toHaveLength(4);
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
    expect(screen.getByText(/Discover Ein Gedi's desert oasis, waterfalls/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qumran" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qasr al-Yahud" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where to go for a Dead Sea beach day" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Add a stop to your Dead Sea day" })).toBeInTheDocument();
    expect(container.querySelector("#day-plan")).toBeNull();
    expect(screen.queryByText("Optional stops to add to your Dead Sea day trip")).not.toBeInTheDocument();
    expect(screen.getByText(/Parking near the central beach is paid/)).toBeInTheDocument();
    const beachSection = container.querySelector("#beach");
    expect(beachSection).not.toBeNull();
    expect(beachSection).toHaveTextContent("Northern beaches such as Kalia are closer to Jerusalem");
    expect(beachSection).toHaveTextContent("I recommend Ein Bokek");
    expect(within(beachSection as HTMLElement).getByRole("link", { name: /Kalia Beach — admission and facilities/ }))
      .toHaveAttribute("href", "https://kaliadeadsea.com/en/kalia-beach-en/");
    expect(screen.getByRole("heading", { name: "By public bus: Egged 486 and 444" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By taxi or private driver: direct travel from your hotel" })).toBeInTheDocument();
    expect(screen.getAllByText(/Egged 486/).length).toBeGreaterThanOrEqual(1);

    const drivingPhoto = within(container.querySelector("#driving") as HTMLElement).getByRole("img", { name: /Turquoise Dead Sea water and white salt formations/ });
    const einBokekPhoto = within(container.querySelector("#beach") as HTMLElement).getByRole("img", { name: /Ein Bokek shoreline/ });
    expect(drivingPhoto.getAttribute("src")).not.toBe(einBokekPhoto.getAttribute("src"));
    const mainPhoto = container.querySelector("header figure img");
    expect(mainPhoto).not.toBeNull();
    expect(drivingPhoto.getAttribute("src")).not.toBe(mainPhoto?.getAttribute("src"));
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
      expect(card.tagName).toBe("A");
      expect(card).toHaveAttribute("href", expectedLinks[index]);
      expect(card.getAttribute("rel")).toContain("sponsored");
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
    expect(screen.getAllByRole("note")).toHaveLength(2);
    expect(container.querySelector('#beach p a[href="/travel-blog/the-dead-sea/"]')).toBeInTheDocument();
    expect(container.querySelector('#driving p a[href="' + carRentalAffiliateUrl(travelGuidePaths.jerusalemDeadSea) + '"]')).toBeInTheDocument();
    expect(container.querySelector("#driving")).not.toHaveTextContent("(affiliate link)");
    const relatedGuides = screen.getByTestId("deadsea-related-guides");
    expect(relatedGuides.children).toHaveLength(6);
    expect(within(relatedGuides).getAllByRole("img")).toHaveLength(6);
    expect(within(relatedGuides).getByRole("img", { name: /Nubian ibex near a stream in Ein Gedi/ })).toBeInTheDocument();
    expect(new Set(within(relatedGuides).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    const nextSteps = screen.getByTestId("deadsea-next-steps");
    expect(within(nextSteps).getAllByRole("link")).toHaveLength(4);
    expect(within(nextSteps).getByRole("link", { name: /Israel's Calendar of Events/ }))
      .toHaveAttribute("href", "/travel-blog/calendar-of-events/");
    expect(nextSteps).not.toHaveTextContent("Arriving from Ben Gurion Airport?");
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
    expect(deadSea.answer).toContain("reserved-seat bus 444");
    expect(deadSea.sections.find(section => section.id === "beach")?.tip).toContain("I recommend Ein Bokek");
    expect(deadSea.sections.find(section => section.id === "private")?.paragraphs.join(" ")).toContain("₪2,100");
    expect(deadSea.sections.find(section => section.id === "driving")?.paragraphs.join(" ")).toContain("Winter rain can trigger flash floods");
    expect(deadSea.sections.find(section => section.id === "bus")?.paragraphs.join(" ")).toContain("Bus 444 also serves the area");
  });

  it("retains original SEO URLs, updated metadata and real source references", async () => {
    for (const [id, route] of [["bethlehem", BethlehemRoute], ["jerusalemDeadSea", DeadSeaRoute]] as const) {
      const guide = travelGuides[id];
      expect(guide.updatedAt).toBe("2026-11-13");
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
