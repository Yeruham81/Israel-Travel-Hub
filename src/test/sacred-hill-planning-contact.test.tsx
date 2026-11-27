import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MountZionAttractionPage } from "@/components/MountZionAttractionPage";
import { MountOlivesAttractionPage } from "@/components/MountOlivesAttractionPage";
import { mountZionSite } from "@/data/mountZionSite";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import type { SacredHillId } from "@/data/sacredHillGuides";
import { routeTree } from "@/routeTree.gen";
import { createQuoteDeliveryService } from "@/lib/quote-delivery.server";

const enabled = () => ({ BREVO_API_KEY: "test-only-key", QUOTE_DELIVERY_ENABLED: "true" });
const now = () => Date.parse("2026-10-24T11:00:00Z");
const siteFor = (id: SacredHillId) => (id === "mount-zion" ? mountZionSite : mountOlivesSite);
const testIdFor = (id: SacredHillId) => (id === "mount-zion" ? "mount-zion" : "mount-olives");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
  document.title = "";
});

async function mountGuide(id: SacredHillId) {
  const path = `/attractions/${id}/`;
  const Page = id === "mount-zion" ? MountZionAttractionPage : MountOlivesAttractionPage;
  window.history.replaceState(null, "", path);
  document.title = siteFor(id).title;
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
    trailingSlash: "always",
  });
  await router.load();
  const view = render(
    <RouterContextProvider router={router}>
      <Page />
    </RouterContextProvider>,
  );
  const title = within(view.container).getByRole("heading", { level: 1 }).textContent!.trim();
  return { path, title, view };
}

describe("sacred hill visit planning", () => {
  it.each(["mount-zion", "mount-of-olives"] as const)(
    "covers every site in the active %s reference table with sources",
    (id) => {
      const site = siteFor(id);
      expect(site.hours).toHaveLength(id === "mount-zion" ? 7 : 8);
      expect(site.hours.every((f) => f.name && f.time && f.admission && f.note)).toBe(true);
      expect(Object.values(site.official).every((url) => url.startsWith("https://"))).toBe(true);
    },
  );

  it.each(["mount-zion", "mount-of-olives"] as const)(
    "renders %s with current hours, walking links, FAQ and contact",
    async (id) => {
      const { view } = await mountGuide(id);
      const main = view.container.querySelector("main")!;
      const hours = main.querySelector("#visitor-info");
      const faq = main.querySelector("#faq");
      const contact = main.querySelector<HTMLElement>("#contact");
      expect(hours).toBeInTheDocument();
      expect(faq).toBeInTheDocument();
      expect(contact).toBeInTheDocument();
      expect(hours!.compareDocumentPosition(faq!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(
        faq!.compareDocumentPosition(contact!) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      const table = within(main).getByTestId(testIdFor(id) + "-hours-fees");
      expect(table).toHaveClass("overflow-x-auto");
      expect(table.querySelectorAll("tbody tr")).toHaveLength(siteFor(id).hours.length);
      for (const fact of siteFor(id).hours)
        expect(within(table).getByRole("rowheader", { name: fact.name })).toBeInTheDocument();
      expect(table.querySelectorAll("table")).toHaveLength(1);
      const orderedIds = [
        "highlights",
        "visit-plan",
        "visitor-info",
        "getting-there",
        "history",
        "tours",
        "faq",
        "nearby",
        "trip-planning",
        "contact",
      ];
      const sectionNodes = orderedIds.map((sectionId) => main.querySelector("#" + sectionId));
      expect(sectionNodes.every(Boolean)).toBe(true);
      for (let i = 0; i < sectionNodes.length - 1; i++) {
        expect(
          sectionNodes[i]!.compareDocumentPosition(sectionNodes[i + 1]!) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
      }
      expect(
        within(contact!).getByRole("form", { name: "Guide contact message" }),
      ).toBeInTheDocument();
      expect(contact?.querySelector('[data-testid="contact-reviews-row"]')).toBeInTheDocument();
      expect(contact?.querySelector('[data-photo-role="contact-portrait"]')).toBeInTheDocument();
      expect(
        contact?.querySelector(
          '[data-testid="contact-tripadvisor-reviews"] a[href*="tripadvisor"]',
        ),
      ).not.toBeNull();
      expect(
        within(main)
          .getByRole("navigation", { name: "On this page" })
          .querySelector('a[href="#contact"]'),
      ).not.toBeNull();
      const walks = within(main)
        .getByTestId(testIdFor(id) + "-walking-connections")
        .querySelectorAll("a[href*='google.com/maps/dir/']");
      expect(walks).toHaveLength(3);
      for (const walk of walks) {
        const url = new URL(walk.getAttribute("href")!);
        expect(url.searchParams.get("api")).toBe("1");
        expect(url.searchParams.get("travelmode")).toBe("walking");
        expect(url.searchParams.get("origin")).toBeTruthy();
        expect(url.searchParams.get("destination")).toBeTruthy();
      }
    },
    15000,
  );

  it.each(["mount-zion", "mount-of-olives"] as const)(
    "submits %s contact via the established Brevo endpoint with source context",
    async (id) => {
      const send = vi.fn().mockResolvedValue(undefined);
      const service = createQuoteDeliveryService({ environment: enabled, send, now });
      const fetch = vi.fn().mockImplementation((url: string, options: RequestInit) =>
        service(
          new Request(`https://website.example${url}`, {
            ...options,
            headers: { ...options.headers, Origin: "https://website.example" },
          }),
        ),
      );
      vi.stubGlobal("fetch", fetch);
      const { path, title } = await mountGuide(id);
      const form = screen.getByRole("form", { name: "Guide contact message" });
      expect(within(form).getByLabelText("Subject *")).toHaveValue("");
      fireEvent.submit(form);
      expect(fetch).not.toHaveBeenCalled();
      expect(within(form).getByRole("alert")).toBeInTheDocument();

      fireEvent.change(within(form).getByLabelText("Full name *"), {
        target: { value: "A traveller" },
      });
      fireEvent.change(within(form).getByLabelText("Email address *"), {
        target: { value: "guest@example.com" },
      });
      fireEvent.change(within(form).getByLabelText("Subject *"), {
        target: { value: id === "mount-zion" ? "Mount Zion visit" : "Mount of Olives visit" },
      });
      fireEvent.change(within(form).getByLabelText("Your message *"), {
        target: { value: "Can you arrange pickup from my hotel and visit the churches?" },
      });
      fireEvent.click(within(form).getByRole("checkbox"));
      fireEvent.submit(form);
      expect(await within(form).findByText("Thank you for your message")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledOnce();
      const payload = JSON.parse(fetch.mock.calls[0]![1].body);
      expect(payload.sourcePath).toBe(path);
      expect(payload.sourceTitle).toBe(title);
      expect(payload.request.kind).toBe("contact");
      expect(payload.request.fields).toMatchObject({
        name: "A traveller",
        email: "guest@example.com",
        consent: true,
        subject: id === "mount-zion" ? "Mount Zion visit" : "Mount of Olives visit",
      });
      expect(send).toHaveBeenCalledOnce();
      expect(send.mock.calls[0]![0].subject).toBe(
        "Moshe Barak - Israel Taxi & Travel / A traveller",
      );
      expect(send.mock.calls[0]![0].text).toContain(payload.request.fields.subject);
      expect(send.mock.calls[0]![0].text).toContain("Sent from page: " + title);
      fireEvent.submit(form);
      await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    },
    15000,
  );
});
