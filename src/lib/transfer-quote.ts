import { airportTransferContact, airportTransferRates } from "@/data/registry";
import { israelNow } from "@/lib/israel-time";

/** Shared by the canonical page and its legacy redirect; only known destination IDs survive. */
export function parseAirportTransferSearch(search: Record<string, unknown>): { destination?: string } {
  const destination = search["destination"];
  return typeof destination === "string" && (destination === "other" || airportTransferRates.some((rate) => rate.id === destination)) ? { destination } : {};
}

export type TransferQuoteFields = {
  name: string; email: string; phone: string; date: string; time: string; flight: string;
  destinationId: string; otherDestination: string; address: string; passengers: string;
  suitcases: string; carryOns: string; notes: string; consent: boolean;
};

export const emptyTransferQuote: TransferQuoteFields = {
  name: "", email: "", phone: "", date: "", time: "", flight: "", destinationId: "",
  otherDestination: "", address: "", passengers: "2", suitcases: "2", carryOns: "0", notes: "", consent: false,
};

export function validateTransferQuote(v: TransferQuoteFields, now = new Date()) {
  const errors: string[] = [];
  if (!v.name.trim() || v.name.length > 120) errors.push("Enter your full name (up to 120 characters).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()) || v.email.length > 254) errors.push("Enter a valid email address.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date) || Number.isNaN(Date.parse(`${v.date}T00:00:00Z`)) || new Date(`${v.date}T00:00:00Z`).toISOString().slice(0, 10) !== v.date) errors.push("Choose a valid flight arrival date.");
  else if (v.date < israelNow(now).date) errors.push("Choose an arrival date that is not in the past in Israel.");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v.time)) errors.push("Enter the flight arrival time in Israel local time.");
  else if (v.date === israelNow(now).date) {
    const [hours = 0, minutes = 0] = v.time.split(":").map(Number);
    if (hours * 60 + minutes < israelNow(now).minutes) errors.push("That arrival time has already passed today in Israel.");
  }
  if (!airportTransferRates.some((r) => r.id === v.destinationId) && v.destinationId !== "other") errors.push("Choose your destination.");
  if (v.destinationId === "other" && !v.otherDestination.trim()) errors.push("Enter the city or destination for your request.");
  for (const [key, label, min, max] of [["passengers", "passengers", 1, 99], ["suitcases", "suitcases", 0, 40], ["carryOns", "carry-ons", 0, 40]] as const) {
    const value = Number(v[key]);
    if (!v[key].trim() || !Number.isInteger(value) || value < min || value > max) errors.push(`Enter ${label} between ${min} and ${max}.`);
  }
  if (v.notes.length > 1500 || v.address.length > 250 || v.otherDestination.length > 120 || v.phone.length > 50 || v.flight.length > 30) errors.push("Shorten the trip details to the limits shown in the form.");
  if (!v.consent) errors.push("Confirm that you agree to share your details with Moshe for this request.");
  return errors;
}

/** Local draft only. No request is transmitted or stored by the application. */
export function buildTransferQuoteDraft(v: TransferQuoteFields) {
  const destination = airportTransferRates.find((r) => r.id === v.destinationId)?.destination || v.otherDestination.trim();
  const singleLine = (value: string) => value.trim().replace(/[\r\n]+/g, " ");
  const subject = `Private airport transfer quote: Ben Gurion to ${singleLine(destination)}`;
  const body = [
    "Hello Moshe,", "", "Please send me a quote for a private transfer from Ben Gurion Airport.", "",
    `Name: ${singleLine(v.name)}`, `Email: ${singleLine(v.email)}`, `Phone / WhatsApp: ${singleLine(v.phone) || "Not supplied"}`,
    "Pickup: Ben Gurion Airport (TLV)", `Destination: ${singleLine(destination)}`, `Hotel / address: ${singleLine(v.address) || "To be confirmed"}`,
    `Flight arrival: ${v.date} at ${v.time} (Israel local time)`, `Flight number: ${singleLine(v.flight) || "To be confirmed"}`,
    `Passengers (including children): ${v.passengers}`, `Suitcases: ${v.suitcases}`, `Carry-ons: ${v.carryOns}`,
    "", "Additional requests / child seats:", v.notes.trim() || "None specified", "",
    "Please confirm availability, the full price, vehicle, meeting point, waiting time, payment and cancellation terms.",
    "I understand that this is a quote request and the transfer is only booked after confirmation.",
    "I consent to sharing these details with Moshe Barak for this inquiry.",
  ].join("\n");
  return { subject, body, url: `mailto:${airportTransferContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
