import { privateDriverContact, privateDriverServices } from "@/data/registry";
import { israelNow } from "@/lib/israel-time";

export type DriverQuoteFields = {
  name: string; email: string; phone: string; serviceId: string; date: string; time: string;
  pickup: string; dropoff: string; passengers: string; luggage: string; itinerary: string;
  guide: string; notes: string; consent: boolean;
};
export const driverGuideOptions = [
  { id: "driver-only", label: "Driver only" },
  { id: "licensed-guide", label: "Please quote a licensed guide as well" },
  { id: "unsure", label: "Not sure yet — please advise" },
] as const;
export const emptyDriverQuote: DriverQuoteFields = {
  name: "", email: "", phone: "", serviceId: "", date: "", time: "", pickup: "", dropoff: "",
  passengers: "2", luggage: "", itinerary: "", guide: "unsure", notes: "", consent: false,
};

export function validateDriverQuote(v: DriverQuoteFields, now = new Date()) {
  const errors: string[] = [];
  const today = israelNow(now);
  if (!v.name.trim() || v.name.length > 120) errors.push("Enter your full name (up to 120 characters).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()) || v.email.length > 254) errors.push("Enter a valid email address.");
  if (!privateDriverServices.some((service) => service.id === v.serviceId)) errors.push("Choose the type of journey.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date) || Number.isNaN(Date.parse(`${v.date}T00:00:00Z`)) || new Date(`${v.date}T00:00:00Z`).toISOString().slice(0, 10) !== v.date) errors.push("Choose a valid pickup date.");
  else if (v.date < today.date) errors.push("Choose a pickup date that is not in the past in Israel.");
  if (v.time) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v.time)) errors.push("Enter a valid pickup time in Israel local time, or leave it open.");
    else if (v.date === today.date) {
      const [hours, minutes] = v.time.split(":").map(Number);
      if (hours! * 60 + minutes! < today.minutes) errors.push("That pickup time has already passed today in Israel.");
    }
  }
  if (!v.pickup.trim()) errors.push("Enter the pickup city, hotel or address.");
  if (!v.dropoff.trim()) errors.push("Enter the final drop-off, or say you will return to the pickup point.");
  if ((v.serviceId === "day-hire" || v.serviceId === "multi-stop") && !v.itinerary.trim()) errors.push("Describe the stops or priorities for your journey.");
  const passengers = Number(v.passengers);
  if (!v.passengers.trim() || !Number.isInteger(passengers) || passengers < 1 || passengers > 99) errors.push("Enter passengers between 1 and 99, including children.");
  if (!driverGuideOptions.some((option) => option.id === v.guide)) errors.push("Choose your guide preference.");
  if (v.phone.length > 50 || v.pickup.length > 250 || v.dropoff.length > 250 || v.luggage.length > 250 || v.itinerary.length > 1500 || v.notes.length > 1500) errors.push("Shorten the trip details to the limits shown in the form.");
  if (!v.consent) errors.push("Confirm that you agree to share your details with Moshe for this request.");
  return errors;
}

/** Prepared locally: the visitor reviews and sends it using their email app. */
export function buildDriverQuoteDraft(v: DriverQuoteFields) {
  const line = (value: string) => value.trim().replace(/[\r\n]+/g, " ");
  const service = privateDriverServices.find((item) => item.id === v.serviceId)!.label;
  const subject = `Private driver quote: ${service} on ${line(v.date)}`;
  const body = ["Hello Moshe,", "", "Please send me a quote for a private driver in Israel.", "",
    `Name: ${line(v.name)}`, `Email: ${line(v.email)}`, `Phone / WhatsApp: ${line(v.phone) || "Not supplied"}`,
    `Service: ${service}`, `Pickup date: ${line(v.date)}`, `Preferred pickup time: ${line(v.time) || "To be agreed"} (Israel local time)`,
    `Pickup: ${line(v.pickup)}`, `Final drop-off: ${line(v.dropoff)}`, `Passengers (including children): ${line(v.passengers)}`,
    `Luggage: ${line(v.luggage) || "To be confirmed"}`, `Guide preference: ${driverGuideOptions.find((item) => item.id === v.guide)!.label}`,
    "", "Stops, approximate timing and priorities:", v.itinerary.trim() || "Direct journey between the addresses above.",
    "", "Child seats, mobility needs or additional requests:", v.notes.trim() || "None specified", "",
    "Please confirm itinerary feasibility, vehicle and luggage capacity, full price, included hours and distance, waiting, parking/tolls and extra-time charges, guiding and other exclusions, pickup arrangements, payment and cancellation terms.",
    "I understand that this is an inquiry and a booking requires confirmation.", "I consent to sharing these details with Moshe Barak for this inquiry.",
  ].join("\n");
  return { subject, body, url: `mailto:${privateDriverContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
