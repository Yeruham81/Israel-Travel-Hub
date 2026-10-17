import { shoreExcursionContact, shoreExcursionRates, shorePorts, type ShorePortId } from "@/data/registry";
import { israelNow } from "@/lib/israel-time";

export type ShoreQuoteFields = {
  name: string; email: string; phone: string; country: string; ship: string;
  date: string; pickupTime: string; allAboardDate: string; allAboardTime: string;
  itineraryId: string; otherItinerary: string; passengers: string; notes: string; consent: boolean;
};
export const emptyShoreQuote: ShoreQuoteFields = {
  name: "", email: "", phone: "", country: "", ship: "", date: "", pickupTime: "",
  allAboardDate: "", allAboardTime: "", itineraryId: "", otherItinerary: "", passengers: "2", notes: "", consent: false,
};

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}
const validTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

export function validateShoreQuote(v: ShoreQuoteFields, portId: ShorePortId, now = new Date()) {
  const errors: string[] = [];
  const today = israelNow(now);
  if (!v.name.trim() || v.name.length > 120) errors.push("Enter your full name (up to 120 characters).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()) || v.email.length > 254) errors.push("Enter a valid email address.");
  if (!v.ship.trim() || v.ship.length > 120) errors.push("Enter your cruise ship's name.");
  if (!validDate(v.date)) errors.push("Choose a valid excursion date.");
  else if (v.date < today.date) errors.push("Choose an excursion date that is not in the past in Israel.");
  if (!validTime(v.pickupTime)) errors.push("Enter the expected disembarkation time in Israel local time.");
  else if (v.date === today.date && v.pickupTime < `${String(Math.floor(today.minutes / 60)).padStart(2, "0")}:${String(today.minutes % 60).padStart(2, "0")}`) errors.push("That disembarkation time has already passed today in Israel.");
  if (!validDate(v.allAboardDate)) errors.push("Choose a valid all-aboard date.");
  if (!validTime(v.allAboardTime)) errors.push("Enter the ship's all-aboard time in Israel local time.");
  if (validDate(v.date) && validDate(v.allAboardDate) && validTime(v.pickupTime) && validTime(v.allAboardTime) && `${v.allAboardDate}T${v.allAboardTime}` <= `${v.date}T${v.pickupTime}`) errors.push("All-aboard must be later than disembarkation. Check the dates for an overnight port call.");
  if (!shoreExcursionRates.some((rate) => rate.id === v.itineraryId && rate.portId === portId) && v.itineraryId !== "other") errors.push("Choose an itinerary from this port.");
  if (v.itineraryId === "other" && !v.otherItinerary.trim()) errors.push("Describe your requested itinerary or destination.");
  const passengers = Number(v.passengers);
  if (!v.passengers.trim() || !Number.isInteger(passengers) || passengers < 1 || passengers > 99) errors.push("Enter passengers between 1 and 99, including children.");
  if (v.notes.length > 1500 || v.otherItinerary.length > 250 || v.phone.length > 50 || v.country.length > 100) errors.push("Shorten the additional details to the limits shown in the form.");
  if (!v.consent) errors.push("Confirm that you agree to share your details with Moshe for this request.");
  return errors;
}

/** A local draft only: the application neither transmits nor stores the inquiry. */
export function buildShoreQuoteDraft(v: ShoreQuoteFields, portId: ShorePortId) {
  const port = shorePorts[portId];
  const itinerary = shoreExcursionRates.find((rate) => rate.id === v.itineraryId && rate.portId === portId)?.destination || v.otherItinerary.trim();
  const line = (value: string) => value.trim().replace(/[\r\n]+/g, " ");
  const subject = `${port.name} shore excursion quote: ${line(itinerary)}`;
  const body = ["Hello Moshe,", "", `Please send me a quote for a private shore excursion from ${port.name} Port, returning to the same port.`, "",
    `Name: ${line(v.name)}`, `Email: ${line(v.email)}`, `Phone / WhatsApp: ${line(v.phone) || "Not supplied"}`, `Country: ${line(v.country) || "Not supplied"}`,
    `Cruise ship: ${line(v.ship)}`, `Excursion date: ${v.date}`, `Expected disembarkation: ${v.pickupTime} (Israel local time)`,
    `Ship's all-aboard deadline: ${v.allAboardDate} at ${v.allAboardTime} (Israel local time)`, `Requested itinerary: ${line(itinerary)}`, `Passengers (including children): ${v.passengers}`,
    ...(Number(v.passengers) > 4 ? ["Please quote a suitable vehicle for our larger group; the published up-to-four starting rates do not apply to our party."] : []),
    "", "Priorities, child seats, mobility needs or additional requests:", v.notes.trim() || "None specified", "",
    "Please confirm itinerary feasibility, site access, vehicle, full price and exclusions, licensed-guide options, meeting point, planned return time and buffer, payment/deposit, cancellation and missed-port-call terms.",
    "I understand that this is an inquiry and the excursion is only booked after confirmation.", "I consent to sharing these details with Moshe Barak for this inquiry.",
  ].join("\n");
  return { subject, body, url: `mailto:${shoreExcursionContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
