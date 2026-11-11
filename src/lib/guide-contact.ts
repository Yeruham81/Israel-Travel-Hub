/** Subject and personal message copy for informational travel-guide inquiries.
 * No form submission constitutes a confirmed booking.
 */
export type GuideContactKind = "transport" | "airport" | "shabbat" | "sherut" | "attraction" | "itinerary" | "accommodation" | "connectivity" | "general";
export type GuideContactCopy = { heading: string; introduction: string; subject: string; placeholder: string };

export function guideContactCopy(title: string, kind: GuideContactKind, place?: string): GuideContactCopy {
  const destination = place?.trim() || "Israel";
  const base = { subject: `Question about: ${title}`.slice(0, 160) };
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
      return { ...base, heading: "Questions about planning your Israel itinerary?",
        introduction: "Have a question about adapting this itinerary to your own trip? Tell me your dates, travel group, preferred stops and how you plan to get around. I'll reply personally and can discuss private transport where appropriate.",
        placeholder: "Dates, number of days, destinations, transport needs or your question…" };
    case "accommodation":
      return { ...base, heading: `Questions about staying in ${destination}?`,
        introduction: `Wondering which area of ${destination} makes sense for your visit? Tell me your dates, priorities and how you plan to arrive. I'll reply personally with relevant planning guidance; hotel availability and booking conditions must be checked with the provider.`,
        placeholder: "Travel dates, preferred area, arrival plans or your question…" };
    case "connectivity":
      return { ...base, heading: "Questions about staying connected in Israel?",
        introduction: "Have a question about the mobile-data and eSIM options explained here? Tell me what device you use and what you need during your trip. I'll reply personally; plan compatibility and availability should be confirmed with the provider.",
        placeholder: "Device model, trip length, data needs or your question…" };
    default:
      return { ...base, heading: "Ask me about your visit to Israel",
        introduction: "Have a question about the practical advice in this guide? Tell me where and when you plan to visit and what you'd like to clarify. I'll reply personally and can help with transport planning where relevant.",
        placeholder: "Travel dates, places you plan to visit or your question…" };
  }
}
