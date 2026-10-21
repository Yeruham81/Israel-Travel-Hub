import nodemailer from "nodemailer";
import { airportTransferContact } from "@/data/registry";

export type QuoteEmail = { requestId: string; replyTo: string; subject: string; text: string };

/** Server only. These are the owner's existing, confirmed WP Mail SMTP settings. */
export function createHostingerTransport(password: string) {
  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false, // Port 587 upgrades with STARTTLS; this does not disable TLS.
    requireTLS: true,
    auth: { user: airportTransferContact.email, pass: password },
    tls: { minVersion: "TLSv1.2", servername: "smtp.hostinger.com", rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
    logger: false,
    debug: false,
  });
}

export async function sendHostingerQuote(message: QuoteEmail, password: string) {
  const transport = createHostingerTransport(password);
  try {
    const result = await transport.sendMail({
      from: { name: "Israel Travel Hub", address: airportTransferContact.email },
      to: airportTransferContact.email,
      envelope: { from: airportTransferContact.email, to: [airportTransferContact.email] },
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      messageId: `<quote-${message.requestId}@israel-taxi.com>`,
    });
    if (!result.accepted.includes(airportTransferContact.email) || result.rejected.length) throw new Error("Mail was not accepted");
  } finally {
    transport.close();
  }
}
