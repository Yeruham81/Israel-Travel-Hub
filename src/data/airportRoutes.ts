import type { LinkProps } from "@tanstack/react-router";
import { airportTransferRates, airportTransferRoutes, type AirportTransferRouteId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";

type RouteGuide = {
  city: string; title: string; description: string; intro: string;
  journeyTitle: string; journeyText: string; areasTitle: string;
  areas: { title: string; text: string }[];
  planningTitle: string; planningText: string;
  faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"] }[];
};

/** Route-specific editorial advice adapted from the four original publisher guides. */
const guides: Record<AirportTransferRouteId, RouteGuide> = {
  jerusalem: {
    city: "Jerusalem", title: "Private transfer from Ben Gurion Airport to Jerusalem",
    description: "Plan a private Ben Gurion Airport transfer to Jerusalem: drive-time guidance, Old City hotel access, luggage and weekday starting-rate conditions. Prepare a quote request to Moshe.",
    intro: "Start your Jerusalem visit with your airport pickup planned. Send Moshe your flight and hotel details to arrange a private ride for your party, with the vehicle and full price agreed before booking.",
    journeyTitle: "From the arrivals hall to your Jerusalem address",
    journeyText: "The original route guide allows around 45–60 minutes or more for the drive after pickup. Traffic on the approach to Jerusalem and the final journey through the city can add time. Passport control, baggage collection and the walk to your meeting point come before this estimate. Share the hotel's actual address so Moshe can plan the whole journey, rather than just an airport-to-city-centre trip.",
    areasTitle: "Where in Jerusalem are you staying?",
    areas: [
      { title: "City centre, Mamilla & King David Street", text: "Give the exact hotel name and vehicle entrance. A property near a familiar landmark can still have its reception or drop-off on a different street; ask the hotel which entrance to use with luggage." },
      { title: "Inside or beside the Old City", text: "Confirm the nearest permitted vehicle drop-off with your accommodation and Moshe. Include any walking distance, steps and luggage assistance you need in the request; do not assume a car can reach every doorway." },
      { title: "East Jerusalem & residential neighbourhoods", text: "Send the full street address and a location pin where useful. For an apartment, obtain the building entrance, host contact and check-in arrangements before your flight." },
    ],
    planningTitle: "A late arrival needs a hotel plan too",
    planningText: "Include your flight's Israel-local arrival date and time, especially when landing after midnight. Ask your hotel about late reception or key collection, and request any night, weekend or holiday supplement in the written quote. For an onward appointment or event, leave room for airport formalities and traffic as well as the drive.",
    faqs: [
      { q: "How long is the private transfer to Jerusalem?", a: "Allow approximately 45–60 minutes or more after pickup, based on the original route guide. Your hotel location and traffic can make it longer. This is a road-time estimate, not a promise of reaching your hotel within an hour of landing." },
      { q: "Can the driver take me to a hotel inside the Old City?", a: "Provide the exact hotel and ask for the nearest permitted drop-off. Confirm any remaining walk, steps and luggage arrangements with the hotel and Moshe before booking." },
      { q: "Can I request a Friday-night or holiday arrival?", a: "Yes. Include your actual flight date and time in the request. Moshe must confirm availability, pickup arrangements and any supplement; submitting a request does not reserve a driver." },
    ],
    related: [
      { label: "Find your Jerusalem hotel area", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Tours from Jerusalem", to: "/tours/" },
    ],
  },
  "tel-aviv": {
    city: "Tel Aviv & Jaffa", title: "Private transfer from Ben Gurion Airport to Tel Aviv",
    description: "Arrange a private Ben Gurion Airport transfer to Tel Aviv or Jaffa. Check drive-time estimates, hotel entrances, luggage capacity and starting-rate conditions before requesting a quote.",
    intro: "Head from Ben Gurion Airport to your Tel Aviv hotel or Jaffa address with your ride arranged in advance. Share your arrival details and luggage so Moshe can confirm a suitable vehicle and a personal quote.",
    journeyTitle: "A short distance, with a city arrival to plan",
    journeyText: "The original guide estimates around 20–40 minutes or more for the drive after pickup. Traffic entering Tel Aviv and the final streets around your accommodation can lengthen the journey. Airport formalities and baggage collection are additional. Giving your hotel name, apartment entrance or full Jaffa address helps make the quote and drop-off specific to your stay.",
    areasTitle: "Beachfront hotel, central apartment or Jaffa stay?",
    areas: [
      { title: "Beachfront hotels", text: "Send the full hotel name and ask which vehicle entrance or luggage drop-off the reception recommends. A seafront address alone may not identify the right side of the building." },
      { title: "Old Jaffa & the port area", text: "Check the nearest drivable meeting or drop-off point with your host. Share any remaining walk, steps and luggage needs before booking, particularly for accommodation on a pedestrian lane." },
      { title: "Neve Tzedek, Florentin & rental apartments", text: "Use the full street and building number, with the entrance or a map pin where helpful. Arrange key collection with your host separately; a transfer booking does not include apartment check-in." },
    ],
    planningTitle: "Match the car to the bags, as well as the people",
    planningText: "The published car starting rate is for up to four passengers, but luggage still needs to fit the confirmed vehicle. List large cases, carry-ons, strollers and children's ages. If your party needs a larger vehicle or child seats, request them explicitly so the quote covers the actual journey to Tel Aviv or Jaffa.",
    faqs: [
      { q: "How long does an airport transfer to Tel Aviv take?", a: "The guide estimate is around 20–40 minutes or more after pickup. Traffic and the exact Tel Aviv or Jaffa address can add time. Allow separately for immigration, baggage and reaching the meeting point." },
      { q: "Does the request form cover Jaffa too?", a: "Yes. Tel Aviv & Jaffa is preselected. Enter your actual Jaffa hotel or apartment address so Moshe can confirm the final price and a suitable vehicle drop-off." },
      { q: "Will four passengers and all our suitcases fit?", a: "Do not assume that passenger capacity also guarantees luggage space. List every suitcase, carry-on and stroller. Moshe will need to confirm the vehicle and whether a larger option changes the quote." },
    ],
    related: [
      { label: "Find your Tel Aviv hotel area", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Hotels around Jaffa", to: "/tel-aviv/jaffa-hotels/" },
    ],
  },
  haifa: {
    city: "Haifa", title: "Private transfer from Ben Gurion Airport to Haifa",
    description: "Plan a private Ben Gurion Airport transfer to Haifa, Mount Carmel or a coastal hotel. Check road-time estimates, exact drop-off and cruise-connection margins before requesting a quote.",
    intro: "Arrange your airport-to-Haifa journey before you fly. Send Moshe your flight, destination and party details for a private pickup, a suitable vehicle and a price confirmed before booking.",
    journeyTitle: "Plan the complete journey to your part of Haifa",
    journeyText: "The original route guide estimates about 75–110 minutes or more by road after pickup. Heavy traffic and your final address can extend the trip. Haifa stretches along the coast and up Mount Carmel, so a city name or a pin near the bay is not enough to identify your hotel. Include its complete address, and allow separately for time spent in the airport after landing.",
    areasTitle: "Haifa's coast and hilltop hotels need different drop-offs",
    areas: [
      { title: "Downtown & the German Colony", text: "Share your hotel's street address and entrance instructions. If your accommodation is in a restored building or on a smaller side street, ask reception where a vehicle can stop with your luggage." },
      { title: "Mount Carmel & Carmel Centre", text: "Identify the actual hilltop hotel or apartment. A nearby-looking coastal landmark does not describe the final drive uphill. Ask about steps, reception access or mobility requirements before confirming the vehicle." },
      { title: "Beachfront & Bat Galim", text: "Give the specific property and its preferred drop-off point. Haifa's coastline covers several areas; a beach or neighbourhood name alone can leave the destination unclear." },
    ],
    planningTitle: "Continuing to a cruise? Include the terminal details",
    planningText: "If your destination is a passenger terminal rather than a Haifa hotel, say so in the request and include the ship and boarding details. The operator must confirm the usable drop-off point and access arrangements. Leave a generous margin for flight delays, airport formalities, road traffic and the cruise line's check-in deadline; a transfer request is not a boarding-time guarantee.",
    faqs: [
      { q: "How long should I allow for a private transfer to Haifa?", a: "The original guide uses a planning estimate of about 75–110 minutes or more after pickup. The Haifa neighbourhood and traffic matter, and time in the airport is additional. Avoid a tight onward connection based only on that estimate." },
      { q: "Can I request a hotel on Mount Carmel?", a: "Yes. Include the full hotel or apartment address and any entrance instructions. Explain steps or mobility needs so Moshe can confirm a practical drop-off and suitable vehicle." },
      { q: "Is a Haifa Port drop-off the same as a city hotel transfer?", a: "No. Include the exact passenger terminal, ship and required arrival time. Ask Moshe to confirm the route, access and final price rather than assuming a general Haifa quote includes every port entrance." },
    ],
    related: [
      { label: "Choose where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Shore excursions from Haifa", to: "/haifa-shore-excursions/" },
    ],
  },
  "dead-sea": {
    city: "Ein Bokek (Dead Sea)", title: "Private transfer from Ben Gurion Airport to Ein Bokek",
    description: "Arrange a private Ben Gurion Airport transfer to Ein Bokek on the Israeli Dead Sea shore. Check the longer drive, exact hotel, one-way starting-rate conditions and separate return requests.",
    intro: "Begin your Dead Sea stay with the longer airport journey arranged. Request a private transfer to your Ein Bokek hotel and agree the vehicle, full price and pickup details with Moshe before booking.",
    journeyTitle: "From the airport to the Ein Bokek hotel area",
    journeyText: "The original guide allows around 1 hour 45 minutes to 2 hours 30 minutes or more for the road journey after pickup. Traffic, road conditions and your exact hotel affect the timing; passport control and baggage collection come before the drive. Share the hotel name rather than simply asking for the Dead Sea, which covers several different destinations.",
    areasTitle: "Make sure the quote matches your Dead Sea hotel",
    areas: [
      { title: "Ein Bokek hotels", text: "Enter the full hotel name and preferred reception entrance. The published starting rate on this page is for Ein Bokek; Moshe confirms the exact hotel, vehicle and final total in your quote." },
      { title: "Neve Zohar & the southern hotel district", text: "If your booking is outside Ein Bokek, give that address explicitly. Ask for a quote for the actual property rather than assuming that every hotel advertised as Dead Sea has the same destination or transfer price." },
      { title: "Ein Gedi, Masada or a stop along the way", text: "These are separate destinations or additions to the journey. List every intended stop and ask about the extra time and charge. The Ein Bokek starting rate does not establish a price for sightseeing or a different resort area." },
    ],
    planningTitle: "Coordinate the longer drive with hotel check-in",
    planningText: "For an evening flight, ask the hotel how late reception and any booked meal remain available. Include your flight number and discuss any requested rest stop when arranging the ride. If you also need a return transfer, add the departure flight and hotel pickup details to your message so Moshe can quote and confirm it separately.",
    faqs: [
      { q: "How long is the private airport transfer to Ein Bokek?", a: "Allow around 1 hour 45 minutes to 2 hours 30 minutes or more after pickup, based on the original guide. Airport formalities, traffic and road disruptions can add time. Confirm your hotel check-in arrangements independently." },
      { q: "Does the Ein Bokek price apply to every Dead Sea hotel?", a: "No. Enter the exact property. Ein Gedi, Neve Zohar and other Dead Sea locations need confirmation for their own route and final quote; the displayed starting rate is specifically for Ein Bokek." },
      { q: "Can I stop at Masada or arrange the return journey?", a: "Describe any extra stop and the return flight details in the additional requests field. Ask for the itinerary, time and price to be agreed separately. Neither sightseeing nor a return ride is included in the one-way starting rate." },
    ],
    related: [
      { label: "Compare Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Plan a visit to Masada", to: "/travel-blog/masada/" },
    ],
  },
};

export function getAirportRouteGuide(id: AirportTransferRouteId) {
  const route = airportTransferRoutes.find((item) => item.id === id);
  const rate = airportTransferRates.find((item) => item.id === id);
  const photo = airportTransferPhotos[id];
  if (!route || !rate || !photo) throw new Error(`Missing airport route data: ${id}`);
  return { ...guides[id], ...route, rate, photo };
}
