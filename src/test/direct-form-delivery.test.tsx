import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HomeContactForm } from "@/components/HomeContactForm";
import { routeTree } from "@/routeTree.gen";
import { createQuoteDeliveryService } from "@/lib/quote-delivery.server";

const fields = { name: "Jamie & Alex", email: "jamie+trip@example.com", subject: "Airport & tour #2", message: "שלום Moshe\n".padEnd(4000, "x"), consent: true };
const enabled = () => ({ BREVO_API_KEY: "test-only-key", QUOTE_DELIVERY_ENABLED: "true" });
const now = () => Date.parse("2026-10-21T12:00:00Z");

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); window.history.replaceState(null, "", "/"); document.title = ""; localStorage.clear(); });

async function contactForm(context: "homepage" | "about" = "homepage") {
  const path = context === "about" ? "/about-moshe-barak/" : "/";
  const title = context === "about" ? "About Moshe Barak" : "Israel Travel Hub";
  window.history.replaceState(null, "", `${path}?campaign=private#contact`);
  document.title = "SEO title | Israel Travel Hub";
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  render(<RouterContextProvider router={router}><main><h1>{title}</h1><HomeContactForm context={context} /></main></RouterContextProvider>);
  return { path, title, form: screen.getByRole("form", { name: context === "about" ? "Contact me" : "Homepage contact message" }) };
}

function fill() {
  for (const [label, value] of [["Your name *", fields.name], ["Email address *", fields.email], ["Subject *", fields.subject], ["Your message *", fields.message]]) fireEvent.change(screen.getByLabelText(label!), { target: { value } });
  fireEvent.click(screen.getByRole("checkbox"));
}

function connectServer(service: ReturnType<typeof createQuoteDeliveryService>) {
  const mock = vi.fn().mockImplementation((url: string, options: RequestInit) => service(new Request(`https://website.example${url}`, { ...options, headers: { ...options.headers, Origin: "https://website.example" } })));
  vi.stubGlobal("fetch", mock);
  return mock;
}

describe("one-step direct form delivery", () => {
  it.each(["homepage", "about"] as const)("delivers the %s contact form through server validation with every field and the source name", async (context) => {
    const send = vi.fn().mockResolvedValue(undefined);
    const fetch = connectServer(createQuoteDeliveryService({ environment: enabled, send, now }));
    const { path, title } = await contactForm(context);
    expect(fetch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    fill();
    expect(fetch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText("Your message has been sent to Moshe")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith("/api/quote-request/", expect.objectContaining({ method: "POST", credentials: "same-origin" }));
    const payload = JSON.parse(fetch.mock.calls[0]![1].body);
    expect(payload).toMatchObject({ sourcePath: path, sourceTitle: title, website: "", request: { kind: "contact", fields } });
    expect(send).toHaveBeenCalledOnce();
    const email = send.mock.calls[0]![0];
    expect(email.text.startsWith(`Source page: ${title}\nPage path: ${path}\n\n`)).toBe(true);
    for (const value of [fields.name, fields.email, fields.subject, fields.message, "I consent to sharing these details"]) expect(email.text).toContain(value);
    expect(email.replyTo).toBe(fields.email);
    expect(email.subject).toBe("Israel Travel Hub enquiry: " + fields.subject);
    expect(email.text).not.toMatch(/campaign=|SEO title|#contact/);
    expect(screen.queryByText("Your Message Is Ready")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Open email/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Copy|Prepare/ })).not.toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it("locks fields and rejects double submissions while waiting for Brevo acceptance", async () => {
    let finish!: () => void;
    const send = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
    const fetch = connectServer(createQuoteDeliveryService({ environment: enabled, send, now }));
    const { form } = await contactForm(); fill();
    fireEvent.submit(form); fireEvent.submit(form);
    await waitFor(() => expect(send).toHaveBeenCalledOnce());
    expect(fetch).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(screen.getByLabelText("Your message *")).toBeDisabled();
    expect(screen.queryByText("Your message has been sent to Moshe")).not.toBeInTheDocument();
    finish();
    await screen.findByText("Your message has been sent to Moshe");
    fireEvent.submit(form);
    expect(fetch).toHaveBeenCalledOnce();
    expect(send).toHaveBeenCalledOnce();
  });

  it("shows an error and preserves the original fields when runtime Brevo is not enabled", async () => {
    const send = vi.fn();
    const fetch = connectServer(createQuoteDeliveryService({ environment: () => ({}), send, now }));
    await contactForm(); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Message sending is temporarily unavailable");
    expect(screen.getByLabelText("Your message *")).toHaveValue(fields.message);
    expect(screen.queryByText("Your message has been sent to Moshe")).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledOnce();
    expect(send).not.toHaveBeenCalled();
  });

  it("does not retry an ambiguous failure automatically, reuses its reference on an explicit retry and gives edited details a new reference", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ error: "SMTP password=never-display" }, { status: 502 }));
    vi.stubGlobal("fetch", fetch);
    await contactForm(); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not confirm email delivery");
    expect(screen.getByRole("alert")).not.toHaveTextContent(/SMTP|password/);
    expect(screen.getByLabelText("Your message *")).toHaveValue(fields.message);
    expect(fetch).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    await screen.findByRole("alert");
    const first = JSON.parse(fetch.mock.calls[0]![1].body);
    expect(JSON.parse(fetch.mock.calls[1]![1].body).requestId).toBe(first.requestId);
    fireEvent.change(screen.getByLabelText("Subject *"), { target: { value: "Changed journey" } });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    await screen.findByRole("alert");
    expect(JSON.parse(fetch.mock.calls[2]![1].body).requestId).not.toBe(first.requestId);
  });

  it("does not show success for an HTTP 200 without matching Brevo acceptance", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ accepted: true, requestId: "unrelated-reference" }));
    vi.stubGlobal("fetch", fetch);
    await contactForm(); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not confirm email delivery");
    expect(screen.getByRole("alert")).toHaveTextContent("Error code: BAD_RESPONSE (HTTP 200)");
    expect(screen.queryByText("Your message has been sent to Moshe")).not.toBeInTheDocument();
  });

  it.each([
    [403, null, "HTTP_403"], [404, null, "HTTP_404"],
    [502, { deliveryCode: "BREVO_UNAUTHORIZED" }, "BREVO_UNAUTHORIZED"],
    [502, { deliveryCode: "BREVO_NETWORK" }, "BREVO_NETWORK"],
    [502, { deliveryCode: "BREVO_PROVIDER" }, "BREVO_PROVIDER"],
    [502, { deliveryCode: "password=must-not-display" }, "HTTP_ERROR"],
    [500, null, "HTTP_ERROR"],
  ])("distinguishes HTTP %s / %s errors from Brevo failures without displaying arbitrary server details", async (status, body, code) => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => body ? Response.json(body, { status }) : new Response("<html>Private server diagnostic</html>", { status, headers: { "Content-Type": "text/html" } })));
    await contactForm(); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(`Error code: ${code} (HTTP ${status})`);
    expect(alert).not.toHaveTextContent(/password|Private server diagnostic/);
    expect(screen.getByLabelText("Your message *")).toHaveValue(fields.message);
    expect(screen.queryByText("Your message has been sent to Moshe")).not.toBeInTheDocument();
  });
});
