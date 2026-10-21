// @vitest-environment node
import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { createQuoteDeliveryService, deliveryFailure } from "@/lib/quote-delivery.server";
import { BrevoDeliveryError } from "@/lib/brevo-email.server";
import { emptyTransferQuote } from "@/lib/transfer-quote";
import { emptyDriverQuote } from "@/lib/private-driver-quote";
import { emptyShoreQuote } from "@/lib/shore-quote";
import type { QuoteRequest, QuoteRequestPayload } from "@/lib/quote-request";

const now = () => Date.parse("2026-10-21T12:00:00Z");
const enabled = () => ({ BREVO_API_KEY: "test-only-key", QUOTE_DELIVERY_ENABLED: "true" });
const contact = { name: "Jamie & Alex", email: "jamie+trip@example.com", phone: "+44 12345", consent: true, notes: "Child seat & stroller\nבקשה נוספת" };
const transfer: QuoteRequest = { kind: "transfer", fields: { ...emptyTransferQuote, ...contact, date: "2027-06-20", time: "14:30", flight: "LY315", destinationId: "other", otherDestination: "Ein Gedi", address: "Example Hotel", passengers: "6", suitcases: "4", carryOns: "2" } };
const driver: QuoteRequest = { kind: "driver", fields: { ...emptyDriverQuote, ...contact, serviceId: "multi-stop", date: "2027-06-20", time: "09:30", pickup: "Tel Aviv Hotel", dropoff: "Jerusalem Hotel", passengers: "5", luggage: "Three cases and stroller", itinerary: "Caesarea\nLunch & Jerusalem" } };
const shore: QuoteRequest = { kind: "shore", portId: "haifa", fields: { ...emptyShoreQuote, ...contact, country: "United Kingdom", ship: "Voyager", date: "2027-06-20", pickupTime: "08:30", allAboardDate: "2027-06-21", allAboardTime: "17:00", itineraryId: "other", otherItinerary: "Akko & Nazareth", passengers: "6" } };
const enquiry: QuoteRequest = { kind: "contact", fields: { name: contact.name, email: contact.email, subject: "Airport trip & a question", message: "שלום Moshe\n" + "x".repeat(3500), consent: true } };
const payload = (request: QuoteRequest = transfer): QuoteRequestPayload => ({
  requestId: randomUUID(), website: "", request,
  ...(request.kind === "transfer" ? { sourcePath: "/transfers/", sourceTitle: "Airport transfers" }
    : request.kind === "driver" ? { sourcePath: "/private-driver/", sourceTitle: "Private driver in Israel" }
      : request.kind === "contact" ? { sourcePath: "/about-moshe-barak/", sourceTitle: "About Moshe Barak" }
      : { sourcePath: `/${request.portId}-shore-excursions/`, sourceTitle: `${request.portId === "haifa" ? "Haifa" : "Ashdod"} shore excursions: private day trips & prices` }),
});
function post(data: unknown, headers: Record<string, string> = {}) {
  return new Request("https://preview.example/api/quote-request/", { method: "POST", headers: { Origin: "https://preview.example", "Content-Type": "application/json", ...headers }, body: JSON.stringify(data) });
}

describe("server-side quote delivery", () => {
  it("remains disabled unless both the runtime API key and explicit switch are set", async () => {
    const send = vi.fn();
    for (const env of [{}, { BREVO_API_KEY: "test" }, { QUOTE_DELIVERY_ENABLED: "true" }, { BREVO_API_KEY: "test", QUOTE_DELIVERY_ENABLED: "false" }]) {
      const handle = createQuoteDeliveryService({ environment: () => env, send, now });
      const status = await handle(new Request("https://preview.example/api/quote-request/"));
      expect(await status.json()).toEqual({ available: false });
      expect(status.headers.get("cache-control")).toBe("no-store");
      expect((await handle(post(payload()))).status).toBe(503);
    }
    expect(send).not.toHaveBeenCalled();
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    expect(await (await handle(new Request("https://preview.example/api/quote-request/"))).json()).toEqual({ available: true });
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    [transfer, ["Name: Jamie & Alex", "Email: jamie+trip@example.com", "Phone / WhatsApp: +44 12345", "Destination: Ein Gedi", "Hotel / address: Example Hotel", "2027-06-20 at 14:30", "Flight number: LY315", "Passengers: 6", "Suitcases: 4", "Carry-ons: 2", contact.notes]],
    [driver, ["2027-06-20", "09:30", "Pickup: Tel Aviv Hotel", "Final drop-off: Jerusalem Hotel", "Passengers: 5", "Luggage: Three cases and stroller", "Caesarea\nLunch & Jerusalem", contact.notes]],
    [shore, ["Haifa", "Country: United Kingdom", "Cruise ship: Voyager", "2027-06-20", "08:30", "2027-06-21 at 17:00", "Requested itinerary: Akko & Nazareth", "Passengers: 6", contact.notes]],
    [enquiry, ["Name: Jamie & Alex", "Email: jamie+trip@example.com", "Subject: Airport trip & a question", enquiry.fields.message]],
  ] as const)("builds every %s field into the server-generated message", async (request, values) => {
    const send = vi.fn().mockResolvedValue(undefined);
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    const data = payload(request as QuoteRequest);
    const result = await handle(post(data));
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ accepted: true, requestId: data.requestId });
    const message = send.mock.calls[0]![0];
    for (const value of values) expect(message.text).toContain(value);
    const consent = "I consent to sharing these details with Moshe Barak for this inquiry.";
    expect(message.text.split(consent)).toHaveLength(2);
    expect(message.text).not.toMatch(/Hello Moshe|Please send me a quote|Please confirm|I understand that|Please quote a suitable vehicle/);
    expect(message.html).toContain(consent);
    expect(message.subject).toBe("Moshe Barak - Taxi & Travel in Israel / Jamie & Alex");
    expect(message.text.startsWith(`Sent from page: ${data.sourceTitle}\n\n`)).toBe(true);
    expect(message.text).toContain("21 October 2026, 15:00 (Israel time)");
    expect(message.replyTo).toBe(contact.email);
    expect(message.senderName).toBe(contact.name);
    if (request.kind === "driver") {
      expect(message.text).not.toContain("Guide preference:");
      expect(message.text).toContain("Additional requests:");
      expect(message.html).toContain("<strong>Additional requests:</strong>");
    }
    expect(message.html).toContain("<strong>Sent from page:</strong>");
    expect(message.html).toContain("<strong>Name:</strong>");
    if (request.kind !== "contact") {
      expect(message.html).toContain("<strong>Passengers:</strong>");
      expect(message.text).not.toContain("Passengers (including children):");
    }
    if (request.kind === "shore") {
      expect(message.text).toContain("Departure & return port: Haifa Port");
      expect(message.html).toContain("<strong>Departure &amp; return port:</strong> Haifa Port");
    }
    expect(Object.keys(message).sort()).toEqual(["html", "replyTo", "requestId", "senderName", "subject", "text"]);
    expect(send.mock.calls[0]![1]).toBe("test-only-key");
  });

  it("uses the actual page title independently of the selected destination and supports older clients without a title", async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    const data = { ...payload(), sourcePath: "/travel-blog/ben-gurion-airport-to-jerusalem/", sourceTitle: "Private transfer from Ben Gurion Airport to Jerusalem" };
    expect((await handle(post(data))).status).toBe(200);
    expect(send.mock.calls[0]![0].text).toMatch(/^Sent from page: Private transfer from Ben Gurion Airport to Jerusalem\n\nName: Jamie & Alex/);
    expect(send.mock.calls[0]![0].text).toContain("Destination: Ein Gedi");
    const legacy = { ...payload(), sourceTitle: undefined };
    expect((await handle(post(legacy))).status).toBe(200);
    expect(send.mock.calls[1]![0].text).toMatch(/^Sent from page: \/transfers\/\n\nName: Jamie & Alex/);
    expect((await handle(post({ ...data, sourceTitle: "Changed page title" }))).status).toBe(409);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("rejects forged types, consent, destinations, dates, extra recipients and header injection", async () => {
    const send = vi.fn();
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    const base = payload();
    const fields = transfer.fields;
    const cases = [
      { ...base, to: "attacker@example.com" },
      { ...base, request: { ...transfer, fields: { ...fields, consent: false } } },
      { ...base, request: { ...transfer, fields: { ...fields, email: "a@example.com\r\nBcc: other@example.com" } } },
      { ...base, request: { ...transfer, fields: { ...fields, name: { value: "Invalid" } } } },
      { ...base, request: { ...transfer, fields: { ...fields, destinationId: "made-up" } } },
      { ...base, request: { ...transfer, fields: { ...fields, date: "2020-01-01" } } },
      { ...base, website: "spam.example" },
      { ...base, sourcePath: "/?email=private@example.com" },
      { ...base, sourceTitle: { title: "Invalid" } },
      { ...base, sourceTitle: "" },
      { ...base, sourceTitle: "x".repeat(301) },
      { ...base, sourceTitle: "Page\r\nInjected content" },
      { ...base, sourceTitle: "Page\u0000title" },
      { ...base, request: { ...shore, portId: "other" } },
      { ...base, request: { kind: "contact", fields: { ...enquiry.fields, message: "x".repeat(4001) } } },
      { ...base, request: { kind: "contact", fields: { ...enquiry.fields, subject: "x".repeat(161) } } },
      { ...base, request: { kind: "contact", fields: { ...enquiry.fields, consent: false } } },
      { ...base, request: { kind: "contact", fields: { ...enquiry.fields, email: "a@example.com,other@example.com" } } },
    ];
    for (const data of cases) expect((await handle(post(data))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("requires a same-origin JSON POST and bounds actual bytes without trusting Content-Length", async () => {
    const send = vi.fn();
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    expect((await handle(post(payload(), { Origin: "https://other.example" }))).status).toBe(403);
    expect((await handle(post(payload(), { "Sec-Fetch-Site": "cross-site" }))).status).toBe(403);
    const missingOrigin = post(payload()); missingOrigin.headers.delete("origin");
    expect((await handle(missingOrigin)).status).toBe(403);
    expect((await handle(post(payload(), { "Content-Type": "text/plain" }))).status).toBe(415);
    const oversize = { ...payload(), website: "a".repeat(21_000) };
    expect((await handle(post(oversize, { "Content-Length": "1" }))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("shares an in-flight attempt and accepted result, and rejects editing an existing reference", async () => {
    let finish!: () => void;
    const send = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
    const handle = createQuoteDeliveryService({ environment: enabled, send, now });
    const data = payload();
    const first = handle(post(data));
    await vi.waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    const second = handle(post(data));
    finish();
    expect((await first).status).toBe(200);
    expect((await second).status).toBe(200);
    expect((await handle(post(data))).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
    expect((await handle(post({ ...data, sourcePath: "/private-driver/" }))).status).toBe(409);
  });

  it("does not claim success, leak provider errors, or retry an ambiguous failed attempt", async () => {
    const send = vi.fn().mockRejectedValue(new Error("SMTP password=do-not-expose; AUTH failed"));
    const reportFailure = vi.fn();
    const handle = createQuoteDeliveryService({ environment: enabled, send, now, reportFailure });
    const data = payload();
    const result = await handle(post(data));
    expect(result.status).toBe(502);
    const body = await result.text();
    expect(body).not.toMatch(/accepted|password|AUTH|do-not-expose/);
    expect((await handle(post(data))).status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
    expect(reportFailure).toHaveBeenCalledOnce();
    expect(reportFailure).toHaveBeenCalledWith({ event: "quote-delivery.failed", requestId: data.requestId, deliveryCode: "BREVO_PROVIDER" });
  });

  it.each([
    ["BREVO_UNAUTHORIZED", 401], ["BREVO_FORBIDDEN", 403], ["BREVO_SENDER", 400],
    ["BREVO_RATE_LIMIT", 429], ["BREVO_PROVIDER", 503], ["BREVO_TIMEOUT", undefined], ["BREVO_NETWORK", undefined],
  ] as const)("returns safe %s diagnostics without visitor or provider details", async (deliveryCode, providerStatus) => {
    const reportFailure = vi.fn();
    const send = vi.fn().mockRejectedValue(new BrevoDeliveryError(deliveryCode, providerStatus));
    const handle = createQuoteDeliveryService({ environment: enabled, send, now, reportFailure });
    const data = payload();
    const result = await handle(post(data));
    expect(result.status).toBe(502);
    expect(await result.json()).toMatchObject({ deliveryCode, requestId: data.requestId });
    expect(reportFailure).toHaveBeenCalledWith({ event: "quote-delivery.failed", requestId: data.requestId, deliveryCode, ...(providerStatus === undefined ? {} : { providerStatus }) });
    expect(JSON.stringify(reportFailure.mock.calls)).not.toMatch(/visitor|password|jamie|test-only-key/i);
    expect((await handle(post(data))).status).toBe(502);
    expect(send).toHaveBeenCalledOnce();
  });

  it("does not expose arbitrary exception properties", () => {
    expect(deliveryFailure({ deliveryCode: "private", message: "private", providerStatus: 535 }, "reference"))
      .toEqual({ event: "quote-delivery.failed", requestId: "reference", deliveryCode: "BREVO_PROVIDER" });
  });

  it("limits submissions per contact/network window and permits a later fresh request", async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    let clock = now();
    const handle = createQuoteDeliveryService({ environment: enabled, send, now: () => clock });
    for (let i = 0; i < 5; i++) expect((await handle(post(payload()))).status).toBe(200);
    expect((await handle(post(payload()))).status).toBe(429);
    clock += 10 * 60_000 + 1;
    expect((await handle(post(payload()))).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(6);
  });
});
