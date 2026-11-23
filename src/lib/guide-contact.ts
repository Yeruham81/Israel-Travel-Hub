/** Subject and personal message copy for informational travel-guide inquiries.
 * No form submission constitutes a confirmed booking.
 */
export type GuideContactKind = "transport" | "airport" | "shabbat" | "sherut" | "attraction" | "itinerary" | "accommodation" | "connectivity" | "general";
export type GuideContactCopy = { eyebrow?: string; heading: string; introduction: string; subject: string; placeholder: string };

export function guideContactCopy(_title: string, kind: GuideContactKind, place?: string): GuideContactCopy {
  const destination = place?.trim() || "Israel";
  // Always let the visitor write the subject; page context is attached separately to the submission.
  const base = { subject: "" };
  switch (kind) {
    case "sherut":
      return { ...base, heading: "Questions about leaving Ben Gurion Airport?",
        introduction: "Found an old airport sherut listing or need help choosing another way to your destination? Tell me your arrival date, flight, address, passengers and luggage. I'll reply personally and can discuss a confirmed private pickup when appropriate.",
        placeholder: "Landing date, flight, destination, passengers, luggage or your question…" };
    case "shabbat":
      return { ...base, heading: "Questions about arriving on Shabbat?",
        introduction: "Landing at Ben Gurion Airport on Friday evening or Saturday? Tell me your flight, destination and any luggage or accessibility needs, or ask about Line 711 and onward transport. I'll reply personally and can discuss an arranged airport pickup where appropriate.",
        placeholder: "Flight date and time, destination, passengers, bags or your question…" };
    case "airport":
      return { ...base, heading: "Questions about your airport arrival?",
        introduction: "Have a question about Ben Gurion Airport, your onward journey or an airport pickup? Tell me your arrival date, destination and what you'd like to clarify. I'll reply personally and can discuss private transport when appropriate.",
        placeholder: "Arrival date, destination, travellers, luggage or your question…" };
    case "transport":
      return { ...base, heading: "Questions about getting around Israel?",
        introduction: "Have a question about the transport choices in this guide? Tell me where and when you plan to travel and which option you are considering. I'll reply personally and can discuss private transport where suitable.",
        placeholder: "Starting point, destination, travel date, passengers or your question…" };
    case "attraction":
      return { ...base, heading: `Planning a visit to ${destination}?`,
        introduction: `Have a question about visiting ${destination}? Tell me when you plan to go, where you'll be staying and what interests you most. I'll reply personally and can discuss transport arrangements where relevant.`,
        placeholder: "Travel date, starting point, places of interest or your question…" };
    case "itinerary":
      return { ...base, subject: "", heading: "Questions about planning your Israel itinerary?",
        introduction: "Have a question about your itinerary, or need to arrange an airport transfer or private journey in Israel? Send me a message and I'll reply personally.",
        placeholder: "Dates, number of days, destinations, transport needs or your question…" };
    case "accommodation":
      return { ...base, heading: `Need a private transfer to or from ${destination}?`,
        introduction: `I'm Moshe Barak. I arrange private airport transfers, city-to-city rides and private day trips in Israel. Tell me your pickup point, destination, travel date and group size, and I'll reply personally about your transport options.`,
        placeholder: "Pickup point, destination, date, passengers, luggage or your question…" };
    case "connectivity":
      return { ...base, heading: "Planning a trip to Israel?",
        introduction: "Have a question about planning your visit, getting from the airport or arranging a private journey? Send me your travel dates, destinations and what you would like help with. I'll reply personally.",
        placeholder: "Travel dates, destinations, number of travellers or your question…" };
    default:
      return { ...base, heading: "Ask me about your visit to Israel",
        introduction: "Have a question about the practical advice in this guide? Tell me where and when you plan to visit and what you'd like to clarify. I'll reply personally and can help with transport planning where relevant.",
        placeholder: "Travel dates, places you plan to visit or your question…" };
  }
}

/** City-specific transport and sightseeing inquiry, for Jerusalem and Tel Aviv neighborhood pages.
 * Hotel recommendations remain in the guide; the contact form is for trip planning and private travel.
 */
export function neighborhoodTripContactCopy(city: "Jerusalem" | "Tel Aviv" | "Haifa"): GuideContactCopy {
  return {
    subject: "",
    heading: `Planning a trip to ${city}?`,
    introduction: city === "Jerusalem"
      ? "I'm Moshe Barak. Need an airport transfer to Jerusalem, a private driver for sightseeing or a day trip beyond the city? Tell me your dates, pickup point and group size, and I'll reply personally."
      : city === "Tel Aviv"
      ? "I'm Moshe Barak. Need an airport transfer to Tel Aviv or Jaffa, a private ride or a day trip? Tell me your travel dates, pickup point and group size, and I'll reply personally."
      : "I'm Moshe Barak. Need an airport transfer to Haifa, a private driver for sightseeing or a day trip along the northern coast? Tell me your travel dates, pickup point and group size, and I'll reply personally.",
    placeholder: "Travel dates, number of travelers, pickup location, destinations or your question…",
  };
}
