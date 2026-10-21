// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import nodemailer from "nodemailer";
import { airportTransferContact } from "@/data/registry";
import { sendHostingerQuote } from "@/lib/hostinger-smtp.server";

vi.mock("nodemailer", () => ({ default: { createTransport: vi.fn() } }));
afterEach(() => vi.resetAllMocks());

describe("Hostinger SMTP transport", () => {
  it("requires STARTTLS and certificate checks, fixes the sender/recipient and uses the visitor only as Reply-To", async () => {
    const sendMail = vi.fn().mockResolvedValue({ accepted: [airportTransferContact.email], rejected: [] });
    const close = vi.fn();
    vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail, close } as never);
    await sendHostingerQuote({ requestId: "test-reference", replyTo: "guest@example.com", subject: "Test quote", text: "All enquiry fields" }, "test-only-password");
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
      host: "smtp.hostinger.com", port: 587, secure: false, requireTLS: true,
      auth: { user: airportTransferContact.email, pass: "test-only-password" },
      tls: { minVersion: "TLSv1.2", servername: "smtp.hostinger.com", rejectUnauthorized: true },
      disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
    }));
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: { name: "Israel Travel Hub", address: airportTransferContact.email },
      to: airportTransferContact.email, envelope: { from: airportTransferContact.email, to: [airportTransferContact.email] },
      replyTo: "guest@example.com", text: "All enquiry fields", messageId: "<quote-test-reference@israel-taxi.com>",
    }));
    expect(close).toHaveBeenCalledOnce();
  });

  it.each(["reject", "not-accepted"])("closes the connection and reports %s without a success claim", async (mode) => {
    const close = vi.fn();
    const sendMail = mode === "reject" ? vi.fn().mockRejectedValue(new Error("Connection failed")) : vi.fn().mockResolvedValue({ accepted: [], rejected: [airportTransferContact.email] });
    vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail, close } as never);
    await expect(sendHostingerQuote({ requestId: "test-reference", replyTo: "guest@example.com", subject: "Test", text: "Message" }, "test-only-password")).rejects.toThrow();
    expect(close).toHaveBeenCalledOnce();
  });
});
