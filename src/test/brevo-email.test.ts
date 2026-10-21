// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { sendBrevoQuote, classifyBrevoNetworkError } from "@/lib/brevo-email.server";
import { createQuoteDeliveryService } from "@/lib/quote-delivery.server";
import { israelSubmissionTime, quoteEmailHtml, safeEmailSenderName } from "@/lib/quote-email-format.server";

const message = { requestId: "test-reference", replyTo: "guest@example.com", subject: "Test enquiry", text: "Sent from page: Example\nAll fields\nשלום", html: "<strong>Sent from page:</strong> Example", senderName: "Test Visitor" };
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("Brevo email presentation", () => {
  it("formats Israel summer and winter time without relying on server timezone", () => {
    expect(israelSubmissionTime(new Date("2026-10-21T12:00:00Z"))).toBe("21 October 2026, 15:00 (Israel time)");
    expect(israelSubmissionTime(new Date("2026-12-21T12:00:00Z"))).toBe("21 December 2026, 14:00 (Israel time)");
  });

  it("escapes HTML input, styles only known labels and keeps multiline message text", () => {
    const html = quoteEmailHtml("Sent from page: About & contact\\nName: <script>alert(1)</script>\\nMessage:\\nHello & goodbye\\nUnknown: must remain plain");
    expect(html).toContain("<strong>Sent from page:</strong> About &amp; contact");
    expect(html).toContain("<strong>Name:</strong> &lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("<strong>Message:</strong><br>Hello &amp; goodbye");
    expect(html).toContain("Unknown: must remain plain");
    expect(html).not.toContain("<script>");
    expect(safeEmailSenderName("  Jane\\r\\nSmith  ")).toBe("Jane Smith");
  });
});

describe("Brevo REST transport", () => {
  it("posts fixed sender and recipient, full text and visitor Reply-To; accepts only 201 with messageId", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ messageId: "provider-reference" }, { status: 201 }));
    vi.stubGlobal("fetch", fetch);
    await sendBrevoQuote(message, "mock-credential");
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith("https://api.brevo.com/v3/smtp/email", expect.objectContaining({
      method: "POST", redirect: "manual", signal: expect.any(AbortSignal),
      headers: { "api-key": "mock-credential", accept: "application/json", "content-type": "application/json" },
    }));
    const options = fetch.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(options.body))).toEqual({
      sender: { email: "reservations@israel-taxi.com", name: "Test Visitor" },
      to: [{ email: "reservations@israel-taxi.com" }], replyTo: { email: "guest@example.com" },
      subject: message.subject, textContent: message.text, htmlContent: message.html,
    });
  });

  it.each([
    [302, {}, "BREVO_REDIRECT"], [401, {}, "BREVO_UNAUTHORIZED"], [403, {}, "BREVO_FORBIDDEN"], [429, {}, "BREVO_RATE_LIMIT"],
    [400, { code: "invalid_parameter", message: "sender is not valid: private" }, "BREVO_SENDER"],
    [400, { code: "invalid_parameter", message: "private parameter" }, "BREVO_REJECTED"],
    [503, { message: "private provider details" }, "BREVO_PROVIDER"],
    [200, { messageId: "not-201" }, "BREVO_REJECTED"], [201, {}, "BREVO_RESPONSE"],
    [201, { messageId: " " }, "BREVO_RESPONSE"],
  ])("sanitizes HTTP %s without retry or false acceptance", async (status, body, deliveryCode) => {
    const fetch = vi.fn().mockResolvedValue(Response.json(body, { status }));
    vi.stubGlobal("fetch", fetch);
    const error = await sendBrevoQuote(message, "mock-credential").catch((error: unknown) => error);
    expect(error).toMatchObject({ deliveryCode, providerStatus: status });
    expect(JSON.stringify(error)).not.toMatch(/private|guest|mock-credential|All fields/);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("rejects malformed acceptance JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not-json", { status: 201 })));
    await expect(sendBrevoQuote(message, "mock-credential")).rejects.toMatchObject({ deliveryCode: "BREVO_RESPONSE" });
  });

  it("classifies nested transport causes without leaking their text", () => {
    expect(classifyBrevoNetworkError({ cause: { code: "ENOTFOUND", message: "private hostname" } })).toBe("BREVO_DNS");
    expect(classifyBrevoNetworkError({ cause: { code: "ECONNRESET" } })).toBe("BREVO_CONNECT");
    expect(classifyBrevoNetworkError({ cause: { code: "ERR_TLS_CERT_ALTNAME_INVALID" } })).toBe("BREVO_TLS");
    expect(classifyBrevoNetworkError(new TypeError("fetch failed"))).toBe("BREVO_NETWORK");
    expect(classifyBrevoNetworkError(new ReferenceError("fetch is not defined"))).toBe("BREVO_RUNTIME");
  });

  it("retains a Brevo HTTP rejection if response stream cancellation fails", async () => {
    const response = new Response(JSON.stringify({ detail: "private" }), { status: 403 });
    Object.defineProperty(response, "body", { value: { cancel: () => Promise.reject(new Error("stream failed")) } });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await expect(sendBrevoQuote(message, "mock-credential")).rejects.toMatchObject({ deliveryCode: "BREVO_FORBIDDEN", providerStatus: 403 });
  });

  it("sanitizes network exceptions without retry", async () => {
    const fetch = vi.fn().mockRejectedValue(new Error("private credential and visitor"));
    vi.stubGlobal("fetch", fetch);
    await expect(sendBrevoQuote(message, "mock-credential")).rejects.toMatchObject({ message: "BREVO_NETWORK", deliveryCode: "BREVO_NETWORK" });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("aborts a stalled request after 20 seconds without retry", async () => {
    vi.useFakeTimers();
    const fetch = vi.fn((_url, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal?.addEventListener("abort", () => reject(new Error("private abort details")), { once: true });
    }));
    vi.stubGlobal("fetch", fetch);
    const assertion = expect(sendBrevoQuote(message, "mock-credential")).rejects.toMatchObject({ deliveryCode: "BREVO_TIMEOUT" });
    await vi.advanceTimersByTimeAsync(20_000);
    await assertion;
    expect(fetch).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("routes a valid contact through the real service and mocked Brevo with no provider reference or credentials in response", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ messageId: "private-provider-reference" }, { status: 201 }));
    vi.stubGlobal("fetch", fetch);
    const handle = createQuoteDeliveryService({ environment: () => ({ BREVO_API_KEY: "mock-credential", QUOTE_DELIVERY_ENABLED: "true" }) });
    const requestId = crypto.randomUUID();
    const request = () => new Request("https://example.com/api/quote-request/", {
      method: "POST", headers: { Origin: "https://example.com", "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, sourcePath: "/", sourceTitle: "Israel Travel Hub", website: "", request: { kind: "contact", fields: { name: "Test visitor", email: "guest@example.com", subject: "Test enquiry", message: "Test message", consent: true } } }),
    });
    expect(await (await handle(request())).json()).toEqual({ accepted: true, requestId });
    expect(await (await handle(request())).json()).toEqual({ accepted: true, requestId });
    expect(fetch).toHaveBeenCalledOnce();
  });
});