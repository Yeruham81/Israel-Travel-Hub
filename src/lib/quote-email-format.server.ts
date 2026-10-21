import { ISRAEL_TZ } from "@/lib/israel-time";

/** Formats actual send time using Israel's daylight-saving rules, not server/browser locale. */
export function israelSubmissionTime(instant: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: ISRAEL_TZ,
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(instant);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("day")} ${value("month")} ${value("year")}, ${value("hour")}:${value("minute")} (Israel time)`;
}

/** The API uses a verified email address, while displaying the form visitor's name. */
export function safeEmailSenderName(name: string): string {
  return name.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Only trusted form labels are styled; arbitrary user message lines remain plain and escaped. */
const fieldLabels = new Set([
  "Sent from page", "Name", "Email", "Subject", "Message",
  "Phone / WhatsApp", "Pickup", "Destination", "Hotel / address",
  "Flight arrival", "Flight number", "Passengers (including children)",
  "Suitcases", "Carry-ons", "Additional requests / child seats",
  "Service", "Pickup date", "Preferred pickup time", "Final drop-off",
  "Luggage", "Guide preference", "Stops, approximate timing and priorities",
  "Child seats, mobility needs or additional requests", "Country",
  "Cruise ship", "Excursion date", "Expected disembarkation",
  "Ship's all-aboard deadline", "Requested itinerary",
  "Priorities, child seats, mobility needs or additional requests",
  "Website", "Form", "Submitted", "Request reference",
]);

/** Rich HTML and readable plain text are sent in the same Brevo request. */
export function quoteEmailHtml(text: string): string {
  const lines = text.split(/\r?\n/).map((line) => {
    const labelMatch = /^([^:\r\n]{1,90}):(.*)$/.exec(line);
    if (labelMatch && fieldLabels.has(labelMatch[1])) {
      return `<strong>${escapeHtml(labelMatch[1])}:</strong>${escapeHtml(labelMatch[2])}`;
    }
    return escapeHtml(line);
  });
  return `<!doctype html><html><body><div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#1a2d42;">${lines.join("<br>")}</div></body></html>`;
}
