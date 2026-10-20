import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as DriverRoute } from "@/routes/private-driver";
import { routeTree } from "@/routeTree.gen";
import { privateDriverContact } from "@/data/registry";
import { buildDriverQuoteDraft, emptyDriverQuote, validateDriverQuote } from "@/lib/private-driver-quote";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });
async function renderDriver() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/private-driver/"] }), trailingSlash: "always" });
  await router.load();
  const Page = DriverRoute.options.component!;
  return { ...render(<RouterContextProvider router={router}><Page /></RouterContextProvider>), router };
}
function choose(index: number) { fireEvent.click(within(screen.getAllByTestId("driver-journey-card")[index]!).getByRole("link", { name: "Plan this journey" })); }
function fill() {
  for (const [label, value] of [["Full name *", "Jamie Smith"], ["Email address *", "jamie+trip@example.com"], ["Pickup date *", "2099-11-01"], ["Pickup city, hotel or address *", "Hotel A, Tel Aviv"], ["Final drop-off *", "Hotel B, Jerusalem"]]) fireEvent.change(screen.getByLabelText(label!), { target: { value } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("private driver page and inquiry", () => {
  it("shows illustrated journeys, an early inquiry, practical planning and six working guide cards", async () => {
    const { container, router } = await renderDriver();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Private driver in Israel");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent("Home /Private driver");
    expect(screen.getAllByTestId("driver-journey-card")).toHaveLength(3);
    const sections = ["journeys", "request-quote", "benefits", "planning", "how-it-works", "faq", "travel-guides"];
    for (let i = 1; i < sections.length; i++) expect(container.querySelector(`#${sections[i - 1]}`)!.compareDocumentPosition(container.querySelector(`#${sections[i]}`)!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    for (const image of screen.getAllByRole("img")) { expect(image).toHaveAttribute("src"); expect(image.getAttribute("alt")).toBeTruthy(); }
    const guides = screen.getAllByTestId("driver-guide-card");
    expect(guides).toHaveLength(6);
    for (const card of guides) expect(router.matchRoutes(card.getAttribute("href")!).at(-1)?.routeId).toBe(card.getAttribute("href")!.replace(/\/$/, ""));
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy/");
    expect(screen.queryByText(/Prefer an online form|existing .*contact form/)).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ILS\s*\d|guaranteed pickup|live availability/i);
    const head = await DriverRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/private-driver\/$/) }] });
    const crumbs = JSON.parse(head!.scripts![0]!.children as string);
    expect(crumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual(["Home", "Private driver"]);
  });

  it("selects each journey without losing contact details and requires an itinerary for day hire", async () => {
    await renderDriver();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie" } });
    for (const [index, id] of ["intercity", "day-hire", "multi-stop"].entries()) { choose(index); expect(screen.getByLabelText("Type of journey *")).toHaveValue(id); expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie"); }
    expect(screen.getByLabelText("Stops / itinerary *")).toBeRequired();
    fireEvent.click(screen.getByRole("button", { name: "Prepare my quote request" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Describe the stops or priorities");
    choose(0);
    expect(screen.getByLabelText("Stops / itinerary")).not.toBeRequired();
  });

  it("prepares an unsent route-specific email, supports copy fallback, stores no lead and invalidates edited drafts", async () => {
    await renderDriver(); choose(2); fill();
    fireEvent.change(screen.getByLabelText("Stops / itinerary *"), { target: { value: "Caesarea & lunch\nThen Jerusalem" } });
    fireEvent.change(screen.getByLabelText("Driver or licensed guide?"), { target: { value: "licensed-guide" } });
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    fireEvent.click(screen.getByRole("button", { name: "Prepare my quote request" }));
    expect(screen.getByRole("status")).toHaveTextContent("Your request has not been sent yet");
    const url = new URL(screen.getByRole("link", { name: "Open email to Moshe" }).getAttribute("href")!);
    expect(url.protocol).toBe("mailto:"); expect(url.pathname).toBe(privateDriverContact.email);
    expect(url.searchParams.get("subject")).toContain("Multi-stop journey on 2099-11-01");
    const body = url.searchParams.get("body")!;
    for (const value of ["jamie+trip@example.com", "Hotel A, Tel Aviv", "Hotel B, Jerusalem", "Caesarea & lunch\nThen Jerusalem", "Please quote a licensed guide as well", "To be agreed (Israel local time)", "booking requires confirmation"]) expect(body).toContain(value);
    expect(fetchSpy).not.toHaveBeenCalled(); expect(localStorage.length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Copy request" }));
    expect(await screen.findByText(/Select and copy the request text/)).toBeInTheDocument();
    expect((screen.getByLabelText("Prepared driver request") as HTMLTextAreaElement).value).toContain("Caesarea & lunch");
    choose(0);
    expect(screen.queryByRole("link", { name: "Open email to Moshe" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Prepare my quote request" }));
    expect(screen.getByRole("link", { name: "Open email to Moshe" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Final drop-off *"), { target: { value: "A different hotel" } });
    expect(screen.queryByRole("link", { name: "Open email to Moshe" })).not.toBeInTheDocument();
  });
});

describe("private driver request validation", () => {
  const good = { ...emptyDriverQuote, name: "Jamie", email: "jamie@example.com", serviceId: "intercity", date: "2026-10-18", pickup: "Tel Aviv", dropoff: "Jerusalem", consent: true };
  const now = new Date("2026-10-17T14:00:00Z");
  it("validates real dates and Israel-local past dates/times while allowing an undecided pickup time", () => {
    expect(validateDriverQuote(good, now)).toEqual([]);
    expect(validateDriverQuote({ ...good, date: "2026-02-31" }, now)).toContain("Choose a valid pickup date.");
    expect(validateDriverQuote({ ...good, date: "2026-10-17", time: "15:00" }, now)).toContain("That pickup time has already passed today in Israel.");
    expect(validateDriverQuote({ ...good, time: "24:00" }, now)).toContain("Enter a valid pickup time in Israel local time, or leave it open.");
    expect(validateDriverQuote({ ...good, date: "2026-10-17" }, new Date("2026-10-17T22:30:00Z"))).toContain("Choose a pickup date that is not in the past in Israel.");
  });
  it("rejects missing route/itinerary, unknown services and guide options, invalid party sizes, overlong details and missing consent", () => {
    expect(validateDriverQuote({ ...good, pickup: "", dropoff: "", consent: false }, now)).toHaveLength(3);
    for (const serviceId of ["day-hire", "multi-stop"]) expect(validateDriverQuote({ ...good, serviceId }, now)).toContain("Describe the stops or priorities for your journey.");
    expect(validateDriverQuote({ ...good, serviceId: "invalid", guide: "invalid", passengers: "1.5", notes: "a".repeat(1501) }, now)).toHaveLength(4);
    for (const passengers of ["0", "100", ""]) expect(validateDriverQuote({ ...good, passengers }, now)).toContain("Enter passengers between 1 and 99, including children.");
  });
  it("preserves special characters and multiline requests in encoded drafts without injecting subject headers", () => {
    const draft = buildDriverQuoteDraft({ ...good, name: "Jamie\r\nBcc: test@example.com", pickup: "מלון & Spa #2", notes: "Seat for age 3\nTwo large bags + stroller" });
    const url = new URL(draft.url);
    expect(draft.subject).not.toMatch(/[\r\n]/);
    expect(url.searchParams.get("body")).toContain("Pickup: מלון & Spa #2");
    expect(url.searchParams.get("body")).toContain("Seat for age 3\nTwo large bags + stroller");
    expect(url.searchParams.get("body")).not.toContain("\nBcc:");
    expect(url.searchParams.get("subject")).toBe(draft.subject);
  });
});
