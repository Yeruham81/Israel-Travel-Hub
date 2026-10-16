import { israelNow } from "./israel-time";

/** Date/time inputs are Israel local landing time; compared against "now" in Asia/Jerusalem. */
export function validate(date: string, time: string, pax: string, lug: string, at: Date = new Date()) {
  const errors: Partial<Record<"date" | "time" | "pax" | "lug", string>> = {};
  const p = Number(pax);
  const l = Number(lug);
  if (!Number.isInteger(p) || p < 1 || p > 16) errors.pax = "Enter between 1 and 16 passengers.";
  if (lug.trim() === "" || !Number.isInteger(l) || l < 0 || l > 40) errors.lug = "Enter a luggage count between 0 and 40.";
  if (time && !date) errors.date = "Add the arrival date for this time.";
  if (date) {
    const now = israelNow(at);
    if (date < now.date) errors.date = "This date is in the past in Israel. Choose today or a later date.";
    else if (date === now.date && time) {
      const [h = 0, m = 0] = time.split(":").map(Number);
      if (h * 60 + m < now.minutes) errors.time = "This time has already passed today in Israel.";
    }
  }
  return errors;
}

