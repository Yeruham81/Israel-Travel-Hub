/** Subject and personal message copy for informational travel-guide inquiries.
 * No form submission constitutes a confirmed booking.
 */
export type GuideContactKind =
  | "transport"
  | "airport"
  | "shabbat"
  | "sherut"
  | "attraction"
  | "itinerary"
  | "accommodation"
  | "connectivity"
  | "general";
export type GuideContactCopy = {
  eyebrow?: string;
  heading: string;
  introduction: string;
  subject: string;
  placeholder: string;
};

export function guideContactCopy(
  _title: string,
  kind: GuideContactKind,
  place?: string,
): GuideContactCopy {
  const destination = place?.trim() || "Israel";
  // Always let the visitor write the subject; page context is attached separately to the submission.
  const base = { subject: "" };
  switch (kind) {
    case "sherut":
      return {
        ...base,
        eyebrow: "Contact me",
        heading: "Need a Private Airport Transfer?",
        introduction:
          "Tell me your flight details, destination, travel date, passengers and luggage. I'll reply personally about arranging your private pickup.",
        placeholder: "Flight details, destination, date, passengers and luggage…",
      };
    case "shabbat":
      return {
        ...base,
        heading: "Need a private airport transfer on Shabbat?",
        introduction:
          "Share your flight, destination, passengers and luggage. I'll reply personally about arranging your private airport pickup.",
        placeholder: "Flight date and number, destination, passengers and luggage…",
      };
    case "airport":
      return {
        ...base,
        heading: "Need a private airport pickup?",
        introduction:
          "I'm Moshe Barak. I arrange private airport pickups and transfers from Ben Gurion Airport. Tell me your flight date, destination, passengers and luggage, and I'll reply personally about your transfer.",
        placeholder: "Arrival date, destination, travelers, luggage or your question…",
      };
    case "transport":
      return {
        ...base,
        heading: "Need a private transfer or driver in Israel?",
        introduction:
          "I'm Moshe Barak. I arrange private transfers, city-to-city rides and day trips with a driver. Tell me your pickup point, destinations, travel date and group size, and I'll reply personally.",
        placeholder: "Starting point, destination, travel date, passengers or your question…",
      };
    case "attraction":
      return {
        ...base,
        heading: `Need a private driver to visit ${destination}?`,
        introduction: `I'm Moshe Barak. I arrange private transfers and day trips with a driver to ${destination} and nearby places. Tell me your travel date, pickup point, destinations and passenger count, and I'll reply personally.`,
        placeholder: "Travel date, starting point, places of interest or your question…",
      };
    case "itinerary":
      return {
        ...base,
        subject: "",
        heading: "Need private transport for your Israel itinerary?",
        introduction:
          "I'm Moshe Barak. I arrange airport transfers, private journeys between cities and sightseeing days with a driver. Send me your travel dates, pickup point, destinations and number of passengers, and I'll reply personally.",
        placeholder: "Dates, number of days, destinations, transport needs or your question…",
      };
    case "accommodation":
      return {
        ...base,
        heading: `Need a private transfer to or from ${destination}?`,
        introduction: `I'm Moshe Barak. I arrange private airport transfers, city-to-city rides and private day trips in Israel. Tell me your pickup point, destination, travel date and group size, and I'll reply personally about your transport options.`,
        placeholder: "Pickup point, destination, date, passengers, luggage or your question…",
      };
    case "connectivity":
      return {
        ...base,
        heading: "Need a private transfer during your Israel trip?",
        introduction:
          "I'm Moshe Barak. I arrange private airport transfers and day trips with a driver in Israel. Tell me your travel dates, pickup location, destinations and number of passengers, and I'll reply personally.",
        placeholder: "Travel dates, destinations, number of travelers or your question…",
      };
    default:
      return {
        ...base,
        heading: "Need a private driver for your Israel trip?",
        introduction:
          "I'm Moshe Barak. I arrange private transfers and sightseeing journeys with a driver in Israel. Tell me your pickup point, travel dates, destinations and group size, and I'll reply personally.",
        placeholder: "Travel dates, places you plan to visit or your question…",
      };
  }
}

/** City-specific transport and sightseeing inquiry, for Jerusalem and Tel Aviv neighborhood pages.
 * Hotel recommendations remain in the guide; the contact form is for trip planning and private travel.
 */
export function neighborhoodTripContactCopy(
  city: "Jerusalem" | "Tel Aviv" | "Haifa",
): GuideContactCopy {
  return {
    subject: "",
    heading: `Need a private driver or transfer in ${city}?`,
    introduction:
      city === "Jerusalem"
        ? "I'm Moshe Barak. Need an airport transfer to Jerusalem, a private driver for sightseeing or a day trip beyond the city? Tell me your dates, pickup point and group size, and I'll reply personally."
        : city === "Tel Aviv"
          ? "I'm Moshe Barak. Need an airport transfer to Tel Aviv or Jaffa, a private ride or a day trip? Tell me your travel dates, pickup point and group size, and I'll reply personally."
          : "I'm Moshe Barak. Need an airport transfer to Haifa, a private driver for sightseeing or a day trip along the northern coast? Tell me your travel dates, pickup point and group size, and I'll reply personally.",
    placeholder:
      "Travel dates, number of travelers, pickup location, destinations or your question…",
  };
}
