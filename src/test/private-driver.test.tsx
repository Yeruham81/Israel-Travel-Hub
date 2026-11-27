import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as DriverRoute } from "@/routes/private-driver-in-israel";
import { routeTree } from "@/routeTree.gen";
import {
  buildDriverQuoteDraft,
  emptyDriverQuote,
  validateDriverQuote,
} from "@/lib/private-driver-quote";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { privateDriverFaqs, privateDriverHero, privateDriverJourneys } from "@/data/privateDriver";
import scenicDrivePhoto from "@/assets/home/road-trip.webp";
import { airportTransferPhotos } from "@/data/airportTransfers";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});
async function renderDriver() {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/private-driver-in-israel/"] }),
    trailingSlash: "always",
  });
  await router.load();
  const Page = DriverRoute.options.component!;
  return {
    ...render(
      <RouterContextProvider router={router}>
        <Page />
      </RouterContextProvider>,
    ),
    router,
  };
}
function choose(index: number) {
  fireEvent.click(
    within(screen.getAllByTestId("driver-journey-card")[index]!).getByRole("link", {
      name: "Request this journey",
    }),
  );
}
function fill() {
  for (const [label, value] of [
    ["Full name *", "Jamie Smith"],
    ["Email address *", "jamie+trip@example.com"],
    ["Pickup date *", "2099-11-01"],
    ["Pickup city, hotel or address *", "Hotel A, Tel Aviv"],
    ["Final drop-off *", "Hotel B, Jerusalem"],
  ])
    fireEvent.change(screen.getByLabelText(label!), { target: { value } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("private driver page and inquiry", () => {
  it("shows illustrated journeys, an early inquiry, practical planning and six working guide cards", async () => {
    const { container, router } = await renderDriver();
    const quote = container.querySelector("#request-quote")!;
    const intro = within(quote as HTMLElement).getByTestId("quote-form-intro");
    expect(quote.firstElementChild?.firstElementChild).toBe(intro);
    expect(intro).toHaveClass("bg-navy", "border-b");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-contact")).toHaveClass(
      "sm:grid-cols-2",
      "xl:grid-cols-3",
    );
    const dateTime = within(quote as HTMLElement).getByTestId("quote-fields-journey");
    expect(dateTime).toHaveClass("grid-cols-2", "sm:grid-cols-3");
    expect(dateTime.firstElementChild).toHaveClass("col-span-2", "sm:col-span-1");
    expect(within(dateTime).getByLabelText("Pickup date *")).toHaveAttribute("type", "date");
    expect(within(dateTime).getByLabelText("Pickup time")).toHaveAttribute("type", "time");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-route")).toHaveClass(
      "sm:grid-cols-2",
    );
    const partyFields = within(quote as HTMLElement).getByTestId("quote-fields-party");
    expect(partyFields).toHaveClass("grid-cols-2");
    expect(within(partyFields).getByLabelText("Passengers *")).toHaveAttribute("type", "number");
    expect(within(partyFields).getByLabelText("Luggage")).toHaveAttribute("name", "luggage");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Private driver in Israel");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent(
      "Home /Private driver",
    );
    const serviceOverview = screen.getByTestId("driver-service-overview");
    expect(
      within(serviceOverview).getByRole("heading", {
        name: "Private driver service in Israel: travel on your own terms",
      }),
    ).toBeInTheDocument();
    expect(
      within(serviceOverview).getByRole("heading", {
        name: "Who is a private driver suitable for?",
      }),
    ).toBeInTheDocument();
    expect(serviceOverview).toHaveTextContent("couples, families, groups of friends");
    expect(serviceOverview).toHaveTextContent("business travelers");
    expect(serviceOverview).toHaveTextContent(
      /licensed guides and other extras are arranged separately unless confirmed in the quote/i,
    );
    expect(serviceOverview).toHaveTextContent(/entrance tickets/i);
    expect(serviceOverview.compareDocumentPosition(container.querySelector("#journeys")!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(screen.getAllByTestId("driver-journey-card")).toHaveLength(3);
    const dayHire = privateDriverJourneys.find((journey) => journey.id === "day-hire");
    expect(dayHire?.photo.src).toBe(scenicDrivePhoto);
    expect(dayHire?.photo.src).not.toBe(airportTransferPhotos["jerusalem"]?.src);
    expect(
      within(screen.getAllByTestId("driver-journey-card")[1]!).getByRole("img"),
    ).toHaveAttribute("src", scenicDrivePhoto);
    const header = screen.getByTestId("hub-header");
    expect(header).toContainElement(screen.getByRole("heading", { level: 1 }));
    expect(within(header).getByTestId("guide-hero-media")).toBeInTheDocument();
    expect(within(header).getByRole("link", { name: "Get a quote" })).toHaveAttribute(
      "href",
      "#request-quote",
    );
    expect(within(header).getByTestId("author-card")).toBeInTheDocument();
    expect(screen.getAllByTestId("author-card")).toHaveLength(1);
    expect(screen.queryByText("Plan the day before requesting a quote")).not.toBeInTheDocument();
    expect(screen.queryByText("From an idea to an agreed itinerary")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Tell me where you want to go" }),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".fixed.inset-x-0.bottom-0")).toBeNull();
    expect(
      screen.getByRole("region", { name: "A journey planned around you" }).querySelectorAll("h3"),
    ).toHaveLength(3);
    for (const card of screen.getAllByTestId("driver-journey-card")) {
      expect(within(card).getByRole("link", { name: "Request this journey" })).toHaveAttribute(
        "href",
        "#request-quote",
      );
      expect(card).toHaveClass("flex", "flex-col");
      expect(within(card).getByRole("img")).toHaveClass("aspect-[16/9]", "h-auto", "w-full");
    }
    const sections = [
      "journeys",
      "benefits",
      "request-quote",
      "faq",
      "travel-guides",
      "next-steps",
    ];
    for (let i = 1; i < sections.length; i++)
      expect(
        container
          .querySelector(`#${sections[i - 1]}`)!
          .compareDocumentPosition(container.querySelector(`#${sections[i]}`)!),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    for (const image of screen.getAllByRole("img")) {
      expect(image).toHaveAttribute("src");
      expect(image.getAttribute("alt")).toBeTruthy();
    }
    const guideSection = screen.getByRole("region", { name: "Related travel guides" });
    expect(guideSection.querySelector("ul")).toHaveClass("grid-cols-2", "lg:grid-cols-3");
    expect(privateDriverFaqs).toHaveLength(6);
    expect(screen.getByRole("region", { name: "Frequently asked questions" })).toHaveTextContent(
      "How do payment, cancellation and extra hours work?",
    );
    const afterFaq = screen.getByTestId("driver-after-faq-cta");
    expect(within(afterFaq).getByRole("link", { name: "Get a quote" })).toHaveAttribute(
      "href",
      "#request-quote",
    );
    expect(screen.queryByText("Photo credits & licences")).not.toBeInTheDocument();
    expect(privateDriverHero.alt).toMatch(/Car travelling on a winding road/);
    const guides = screen.getAllByTestId("driver-guide-card");
    expect(guides).toHaveLength(6);
    const relevantPhotos = [
      ...screen
        .getAllByTestId("driver-journey-card")
        .map((card) => within(card).getByRole("img").getAttribute("src")),
      ...guides.map((card) => within(card).getByRole("img").getAttribute("src")),
      within(header).getByTestId("guide-hero-media").querySelector("img")?.getAttribute("src"),
    ];
    expect(new Set(relevantPhotos).size).toBe(10);
    const nextSteps = screen.getByRole("region", { name: "Plan the next part of your trip" });
    expect(nextSteps.querySelector("ul")).toHaveClass("grid-cols-2", "lg:grid-cols-3");
    expect(nextSteps.querySelector("ul")).not.toHaveClass("sm:grid-cols-2");
    expect(within(nextSteps).getAllByRole("link")).toHaveLength(6);
    for (const link of within(nextSteps).getAllByRole("link")) {
      expect(
        router.matchRoutes(link.getAttribute("href")!).at(-1)?.routeId.replace(/\/$/, ""),
      ).toBe(link.getAttribute("href")!.replace(/\/$/, ""));
    }
    for (const card of guides)
      expect(router.matchRoutes(card.getAttribute("href")!).at(-1)?.routeId).toBe(
        card.getAttribute("href")!.replace(/\/$/, ""),
      );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy/",
    );
    expect(
      screen.queryByText(/Prefer an online form|existing .*contact form/),
    ).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ILS\s*\d|guaranteed pickup|live availability/i);
    const head = await DriverRoute.options.head?.({} as never);
    expect(head).toMatchObject({
      meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]),
      links: [{ rel: "canonical", href: expect.stringMatching(/\/private-driver-in-israel\/$/) }],
    });
    const crumbs = JSON.parse(head!.scripts![0]!.children as string);
    expect(crumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual([
      "Home",
      "Private driver",
    ]);
  });

  it("selects each journey without losing contact details and requires an itinerary for day hire", async () => {
    await renderDriver();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie" } });
    for (const [index, id] of ["intercity", "day-hire", "multi-stop"].entries()) {
      choose(index);
      expect(screen.getByLabelText("Type of journey *")).toHaveValue(id);
      expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie");
    }
    expect(screen.getByLabelText("Stops / itinerary *")).toBeRequired();
    fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Describe the stops or priorities");
    choose(0);
    expect(screen.getByLabelText("Stops / itinerary")).not.toBeRequired();
  });

  it("sends the route-specific details in one action and allows a new request after editing", async () => {
    await renderDriver();
    choose(2);
    fill();
    fireEvent.change(screen.getByLabelText("Stops / itinerary *"), {
      target: { value: "Caesarea & lunch\nThen Jerusalem" },
    });
    expect(screen.queryByLabelText("Driver or licensed guide?")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Additional requests")).toBeInTheDocument();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (_url, options) =>
        Response.json({ accepted: true, requestId: JSON.parse(String(options?.body)).requestId }),
      );
    fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    expect(await screen.findByText("Thank you for your message")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "I'll reply soon to the email address you provided.",
    );
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/quote-request/",
      expect.objectContaining({ method: "POST" }),
    );
    const data = JSON.parse(String(fetchSpy.mock.calls[0]![1]?.body));
    expect(data).toMatchObject({
      sourceTitle: "Private driver in Israel",
      request: {
        kind: "driver",
        fields: {
          serviceId: "multi-stop",
          email: "jamie+trip@example.com",
          pickup: "Hotel A, Tel Aviv",
          dropoff: "Hotel B, Jerusalem",
          itinerary: "Caesarea & lunch\nThen Jerusalem",
          consent: true,
        },
      },
    });
    expect(localStorage.length).toBe(0);
    choose(0);
    expect(screen.getByRole("button", { name: "Send quote request" })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    await screen.findByText("Thank you for your message");
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    fireEvent.change(screen.getByLabelText("Final drop-off *"), {
      target: { value: "A different hotel" },
    });
    expect(screen.getByRole("button", { name: "Send quote request" })).toBeEnabled();
  });
});

describe("shared photo-credit links", () => {
  it("omits empty photo credits while keeping genuine source links", () => {
    const absent = render(
      <StayPhotoCredits
        photos={[
          { src: "/photo.webp", alt: "Test photograph", label: "Test photo", sourceUrl: "" },
        ]}
      />,
    );
    expect(absent.queryByText("Photo credits & licences")).not.toBeInTheDocument();
    absent.unmount();
    const credited = render(
      <StayPhotoCredits
        photos={[
          { src: "/photo.webp", alt: "Local photo", label: "No external credit", sourceUrl: "" },
          {
            src: "/external.webp",
            alt: "External photo",
            label: "Photographer credit",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
          },
        ]}
      />,
    );
    expect(credited.getByText("Photo credits & licences")).toBeInTheDocument();
    const disclosure = credited.getByTestId("page-photo-credits");
    expect(disclosure).not.toHaveAttribute("open");
    expect(disclosure).toHaveTextContent("Photographer credit");
    expect(credited.getByText("Photo source")).toHaveAttribute(
      "href",
      "https://commons.wikimedia.org/wiki/File:Example.jpg",
    );
    expect(disclosure).not.toHaveTextContent("No external credit");
  });
});

describe("private driver request validation", () => {
  const good = {
    ...emptyDriverQuote,
    name: "Jamie",
    email: "jamie@example.com",
    serviceId: "intercity",
    date: "2026-10-18",
    pickup: "Tel Aviv",
    dropoff: "Jerusalem",
    consent: true,
  };
  const now = new Date("2026-10-17T14:00:00Z");
  it("validates real dates and Israel-local past dates/times while allowing an undecided pickup time", () => {
    expect(validateDriverQuote(good, now)).toEqual([]);
    expect(validateDriverQuote({ ...good, date: "2026-02-31" }, now)).toContain(
      "Choose a valid pickup date.",
    );
    expect(validateDriverQuote({ ...good, date: "2026-10-17", time: "15:00" }, now)).toContain(
      "That pickup time has already passed today in Israel.",
    );
    expect(validateDriverQuote({ ...good, time: "24:00" }, now)).toContain(
      "Enter a valid pickup time in Israel local time, or leave it open.",
    );
    expect(
      validateDriverQuote({ ...good, date: "2026-10-17" }, new Date("2026-10-17T22:30:00Z")),
    ).toContain("Choose today or a future pickup date.");
  });
  it("rejects missing route/itinerary, unknown services, invalid party sizes, overlong details and missing consent", () => {
    expect(
      validateDriverQuote({ ...good, pickup: "", dropoff: "", consent: false }, now),
    ).toHaveLength(3);
    for (const serviceId of ["day-hire", "multi-stop"])
      expect(validateDriverQuote({ ...good, serviceId }, now)).toContain(
        "Describe the stops or priorities for your journey.",
      );
    expect(
      validateDriverQuote(
        { ...good, serviceId: "invalid", passengers: "1.5", notes: "a".repeat(1501) },
        now,
      ),
    ).toHaveLength(3);
    for (const passengers of ["0", "100", ""])
      expect(validateDriverQuote({ ...good, passengers }, now)).toContain(
        "Enter the total number of passengers, including children (1–99).",
      );
  });
  it("preserves special characters and multiline requests in encoded drafts without injecting subject headers", () => {
    const draft = buildDriverQuoteDraft({
      ...good,
      name: "Jamie\r\nBcc: test@example.com",
      pickup: "מלון & Spa #2",
      notes: "Seat for age 3\nTwo large bags + stroller",
    });
    const url = new URL(draft.url);
    expect(draft.subject).not.toMatch(/[\r\n]/);
    expect(url.searchParams.get("body")).toContain("Pickup: מלון & Spa #2");
    expect(url.searchParams.get("body")).toContain("Seat for age 3\nTwo large bags + stroller");
    expect(url.searchParams.get("body")).not.toContain("\nBcc:");
    expect(url.searchParams.get("subject")).toBe(draft.subject);
    expect(draft.subject).toBe("Moshe Barak - Israel Taxi & Travel / Jamie Bcc: test@example.com");
  });
});
