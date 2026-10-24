import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SacredHillGuideContent } from "@/components/SacredHillGuideContent";
import { mapsWalkUrl } from "@/components/SacredHillPlanningSections";
import { sacredHillPlanning } from "@/data/sacredHillPlanning";
import type { SacredHillId } from "@/data/sacredHillGuides";
import { routeTree } from "@/routeTree.gen";
import { createQuoteDeliveryService } from "@/lib/quote-delivery.server";

const enabled = () => ({ BREVO_API_KEY: "test-only-key", QUOTE_DELIVERY_ENABLED: "true" });
const now = () => Date.parse("2026-10-24T11:00:00Z");
const labelFor = (id: SacredHillId) => id === "mount-zion" ? "Mount Zion" : "the Mount of Olives";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
  document.title = "";
});

async function mountGuide(id: SacredHillId) {
  const path = `/travel-blog/${id}/`;
  const title = id === "mount-zion" ? "Mount Zion, Jerusalem" : "Mount of Olives, Jerusalem";
  window.history.replaceState(null, "", path);
  document.title = title;
  const router = createRouter({
    routeTree, context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always",
  });
  await router.load();
  const view = render(<RouterContextProvider router={router}><main><h1>{title}</h1><SacredHillGuideContent id={id} /></main></RouterContextProvider>);
  return { path, title, view };
}

describe("sacred hill visit planning", () => {
  it.each(["mount-zion", "mount-of-olives"] as const)("covers every site in the %s reference table with sources", (id) => {
    const facts = sacredHillPlanning[id].facts;
    expect(facts.length).toBe(id === "mount-zion" ? 7 : 8);
    expect(facts.every(f => f.site && f.hours && f.admission && f.sourceUrl.startsWith("https://"))).toBe(true);
    expect(sacredHillPlanning[id].days).toHaveLength(2);
    expect(sacredHillPlanning[id].days.every(day => day.steps.length >= 3)).toBe(true);
    expect(sacredHillPlanning[id].walks).toHaveLength(3);
  });

  it("encodes Maps URLs with explicit walking mode but does not claim live ETA", () => {
    const url = mapsWalkUrl("Zion Gate, Jerusalem", "St Peter in Gallicantu Jerusalem");
    expect(url).toContain("api=1");
    expect(url).toContain("travelmode=walking");
    expect(url).toContain("Zion%20Gate%2C%20Jerusalem");
    expect(url).not.toContain("minutes");
  });

  it.each(["mount-zion", "mount-of-olives"] as const)("renders %s with hours before FAQ and FAQs before contact", async id => {
    const { view } = await mountGuide(id);
    const main = view.container.querySelector("main")!;
    const hours = main.querySelector("#visit-facts");
    const faq = main.querySelector("#faq");
    const contact = main.querySelector("#contact-moshe");
    expect(hours).toBeInTheDocument();
    expect(faq).toBeInTheDocument();
    expect(contact).toBeInTheDocument();
    expect(hours!.compareDocumentPosition(faq!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(faq!.compareDocumentPosition(contact!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(hours as HTMLElement).getAllByRole("row")).toHaveLength(sacredHillPlanning[id].facts.length + 1);
    expect(screen.getByRole("form", { name: `Message Moshe about ${labelFor(id)}` })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Message Moshe" })).toHaveAttribute("href", "#contact-moshe");
    expect(screen.getByText("Choose the right day for your route")).toBeInTheDocument();
    expect(main.querySelectorAll('a[href*="google.com/maps/dir/"]')).toHaveLength(3);
  });

  it.each(["mount-zion", "mount-of-olives"] as const)("submits %s contact via the established Brevo endpoint with source context", async id => {
    const send = vi.fn().mockResolvedValue(undefined);
    const service = createQuoteDeliveryService({ environment: enabled, send, now });
    const fetch = vi.fn().mockImplementation((url: string, options: RequestInit) =>
      service(new Request(`https://website.example${url}`, {
        ...options, headers: { ...options.headers, Origin: "https://website.example" },
      })));
    vi.stubGlobal("fetch", fetch);
    const { path, title } = await mountGuide(id);
    const form = screen.getByRole("form", { name: `Message Moshe about ${labelFor(id)}` });
    expect(within(form).getByLabelText("Subject *")).toHaveValue(id === "mount-zion" ? "Mount Zion visit" : "Mount of Olives visit");
    fireEvent.submit(form);
    expect(fetch).not.toHaveBeenCalled();
    expect(within(form).getByRole("alert")).toBeInTheDocument();

    fireEvent.change(within(form).getByLabelText("Your name *"), { target: { value: "A traveller" } });
    fireEvent.change(within(form).getByLabelText("Email address *"), { target: { value: "guest@example.com" } });
    fireEvent.change(within(form).getByLabelText("Your message *"), { target: { value: "Can you arrange pickup from my hotel and visit the churches?" } });
    fireEvent.click(within(form).getByRole("checkbox"));
    fireEvent.submit(form);
    expect(await within(form).findByText("Thank you for contacting me")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledOnce();
    const payload = JSON.parse(fetch.mock.calls[0]![1].body);
    expect(payload.sourcePath).toBe(path);
    expect(payload.sourceTitle).toBe(title);
    expect(payload.request.kind).toBe("contact");
    expect(payload.request.fields).toMatchObject({
      name: "A traveller", email: "guest@example.com", consent: true,
      subject: id === "mount-zion" ? "Mount Zion visit" : "Mount of Olives visit",
    });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0]![0].subject).toBe("Moshe Barak - Taxi & Travel in Israel / A traveller");
    expect(send.mock.calls[0]![0].text).toContain(payload.request.fields.subject);
    expect(send.mock.calls[0]![0].text).toContain("Sent from page: " + title);
    fireEvent.submit(form);
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
  });
});
