import type { LinkProps } from "@tanstack/react-router";
import { airportTransferRates, airportTransferRoutes, type AirportTransferRouteId } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";

type RouteGuide = {
  city: string; title: string; description: string; intro: string;
  journeyTitle: string; journeyText: string; areasTitle: string; checklistTip: string;
  areas: { title: string; text: string }[];
  planningTitle: string; planningText: string;
  example: { title: string; situation: string; response: string };
  faqs: { q: string; a: string }[];
  related: { label: string; to: LinkProps["to"] }[];
};

/** Route-specific editorial advice adapted from the four original publisher guides. */
const guides: Record<AirportTransferRouteId, RouteGuide> = {
  jerusalem: {
    city: "Jerusalem", title: "Private transfer from Ben Gurion Airport to Jerusalem",
    description: "Private Ben Gurion Airport to Jerusalem transfer: travel time, Old City hotel drop-off, luggage and weekday starting rate. Send a quote request.",
    intro: "Arrange a private ride between Ben Gurion Airport and Jerusalem, including Mamilla and the Old City area. Send me your flight, luggage and hotel address for a personal quote.",
    checklistTip: "For Old City accommodation, confirm a vehicle-accessible drop-off and any remaining walk or steps.",
    journeyTitle: "Driving to your Jerusalem hotel",
    journeyText: "Allow around 45–60 minutes or more after pickup from Ben Gurion Airport, depending on traffic and your hotel. Add time for passport control and baggage collection before the drive.",
    areasTitle: "Where in Jerusalem are you staying?",
    areas: [
      { title: "City centre, Mamilla & King David Street", text: "Include the hotel name and the entrance used for vehicle arrivals. Mamilla and King David Street hotels may have a separate luggage or reception entrance." },
      { title: "Inside or beside the Old City", text: "Arrange the nearest vehicle-accessible gate or unloading point with your hotel, then allow for the final walk through Old City lanes." },
      { title: "East Jerusalem & residential neighbourhoods", text: "Provide the full street address and entrance, plus a location pin for apartments or buildings with several entrances." },
    ],
    example: {
      title: "If your room is inside the Old City",
      situation: "Your hotel may be inside a pedestrian lane beyond the nearest vehicle-accessible gate.",
      response: "Ask reception for the best gate and luggage unloading point. Send me that location so I can confirm the drop-off, including the remaining walk if required.",
    },
    planningTitle: "Late arrival and Old City access",
    planningText: "For an evening arrival, arrange late check-in or key collection with your accommodation before you travel.",
    faqs: [
      { q: "How long is the private transfer to Jerusalem?", a: "The drive to Jerusalem is usually around 45–60 minutes after pickup, with extra time depending on traffic and your hotel's location. Allow separately for arrival formalities and baggage collection." },
      { q: "Can the driver take me to a hotel inside the Old City?", a: "Provide the exact hotel and ask for the nearest permitted drop-off. Confirm any remaining walk, steps and luggage arrangements with the hotel and me before booking." },
      { q: "Can I request a Friday-night or holiday arrival?", a: "Yes. Include your actual flight date and time in the request. I must confirm availability, pickup arrangements and any extra charges; submitting a request does not reserve a driver." },
    ],
    related: [
      { label: "Find your Jerusalem hotel area", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Tours from Jerusalem", to: "/tours/" },
    ],
  },
  "tel-aviv": {
    city: "Tel Aviv & Jaffa", title: "Private transfer from Ben Gurion Airport to Tel Aviv",
    description: "Private transfer from Ben Gurion Airport to Tel Aviv or Jaffa: drive time, hotel entrances, luggage and starting rate. Request a personal quote.",
    intro: "Arrange a direct private transfer between Ben Gurion Airport and your hotel in Tel Aviv or Jaffa. Send your flight, group size and luggage details for a personal quote.",
    checklistTip: "For Old Jaffa or beachfront accommodation, confirm the hotel entrance or nearest drivable drop-off.",
    journeyTitle: "Driving to Tel Aviv or Jaffa",
    journeyText: "Allow around 20–40 minutes or more after pickup from Ben Gurion Airport. The final approach depends on traffic, the beachfront hotel entrance or the streets around Old Jaffa.",
    areasTitle: "Beachfront hotel, central apartment or Jaffa stay?",
    areas: [
      { title: "Beachfront hotels", text: "Provide the full hotel name and the correct vehicle entrance; some seafront properties have a separate luggage drop-off." },
      { title: "Old Jaffa & the port area", text: "Confirm the closest accessible drop-off with your host. Some Old Jaffa lanes require a short walk with luggage." },
      { title: "Rothschild, Sarona & central apartments", text: "Provide the full street address, building entrance and a map pin for apartments around Rothschild Boulevard, Sarona or nearby neighborhoods." },
    ],
    example: {
      title: "If four travelers each have a large suitcase",
      situation: "Four travelers with large cases, carry-ons or a stroller may need more luggage space than a standard car provides.",
      response: "List the number and size of your cases, plus any stroller. I can confirm a vehicle with enough luggage space and quote the appropriate fare.",
    },
    planningTitle: "Match the vehicle to your luggage",
    planningText: "Include all suitcases, carry-ons, strollers and child-seat needs in your request so I can confirm the suitable vehicle.",
    faqs: [
      { q: "How long does an airport transfer to Tel Aviv take?", a: "Allow around 20–40 minutes as a planning estimate or more after pickup. Traffic and the exact Tel Aviv or Jaffa address can add time. Allow separately for immigration, baggage and reaching the meeting point." },
      { q: "Does the request form cover Jaffa too?", a: "Yes. Tel Aviv & Jaffa is preselected. Enter your actual Jaffa hotel or apartment address so I can confirm the final price and a suitable vehicle drop-off." },
      { q: "Will four passengers and all our suitcases fit?", a: "Passenger capacity and luggage capacity are separate considerations. List every suitcase, carry-on and stroller. I will need to confirm the vehicle and whether a larger option changes the quote." },
    ],
    related: [
      { label: "Find your Tel Aviv hotel area", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Hotels around Jaffa", to: "/accommodation/tel-aviv/jaffa/" },
    ],
  },
  haifa: {
    city: "Haifa", title: "Private transfer from Ben Gurion Airport to Haifa",
    description: "Private airport transfer from Ben Gurion to Haifa: drive time, Mount Carmel or coastal hotel drop-off, cruise connections and a quote request.",
    intro: "Arrange a private ride between Ben Gurion Airport and Haifa, from the waterfront to Mount Carmel. Send the hotel address or cruise details for a personal quote.",
    checklistTip: "For a cruise connection, add your ship, passenger terminal and check-in deadline, with a generous time buffer.",
    journeyTitle: "Driving to your Haifa address",
    journeyText: "Allow about 75–110 minutes or more after pickup from Ben Gurion Airport. Haifa stretches from the coast to Mount Carmel, so the final address and traffic affect the journey.",
    areasTitle: "Haifa's coast and hilltop hotels need different drop-offs",
    areas: [
      { title: "Downtown & the German Colony", text: "Share the exact hotel entrance; smaller streets and restored buildings may have a designated place to unload bags." },
      { title: "Mount Carmel & Carmel Centre", text: "Include the actual hilltop address and mention any steps, accessibility needs or unusual entrance arrangements." },
      { title: "Beachfront & Bat Galim", text: "Name the property and preferred entrance; Haifa's coastal districts cover several distinct drop-off areas." },
    ],
    example: {
      title: "If your flight connects with a cruise departure",
      situation: "A cruise connection needs the ship, passenger entrance and required boarding time.",
      response: "Share your ship name and boarding deadline. I can plan the transfer to the confirmed passenger entrance, with time allowed for arrival formalities, traffic and terminal access.",
    },
    planningTitle: "Connecting to a cruise?",
    planningText: "Tell me the ship name, passenger terminal and latest check-in time so I can check the practical route and timing.",
    faqs: [
      { q: "How long should I allow for a private transfer to Haifa?", a: "Allow about 75–110 minutes as a planning estimate or more after pickup. The Haifa neighbourhood and traffic matter, and time in the airport is additional. Avoid a tight onward connection based only on that estimate." },
      { q: "Can I request a hotel on Mount Carmel?", a: "Yes. Include the full hotel or apartment address and any entrance instructions. Explain steps or mobility needs so I can confirm a practical drop-off and suitable vehicle." },
      { q: "Is a Haifa Port drop-off the same as a city hotel transfer?", a: "No. Include the exact passenger terminal, ship and required arrival time. Send me your exact port entrance so I can confirm access, the route and the final price." },
    ],
    related: [
      { label: "Choose where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Shore excursions from Haifa", to: "/shore-excursions/haifa/" },
    ],
  },
  "dead-sea": {
    city: "Ein Bokek (Dead Sea)", title: "Private transfer from Ben Gurion Airport to Ein Bokek",
    description: "Private transfer from Ben Gurion Airport to Ein Bokek: journey time, exact Dead Sea hotel, one-way starting rate and return-trip requests.",
    intro: "Arrange a private transfer between Ben Gurion Airport and your Ein Bokek hotel at the Dead Sea. Share the hotel, flight and luggage details for a personal quote.",
    checklistTip: "The starting fare covers Ein Bokek; mention Neve Zohar, Ein Gedi, Masada or other stops separately.",
    journeyTitle: "Driving to your Ein Bokek hotel",
    journeyText: "Allow around 1 hour 45 minutes to 2 hours 30 minutes or more after pickup from Ben Gurion Airport. Share your exact Dead Sea hotel so I can confirm the route and fare.",
    areasTitle: "Choose your Dead Sea hotel location",
    areas: [
      { title: "Ein Bokek hotels", text: "The published starting fare covers Ein Bokek hotels. Include your hotel name and entrance for the confirmed fare." },
      { title: "Neve Zohar & the southern hotel district", text: "For Neve Zohar and the southern hotel district, send the exact property for a tailored route and price." },
      { title: "Ein Gedi, Masada or a stop along the way", text: "For Ein Gedi, Masada or sightseeing along the way, describe your desired stops for a tailored itinerary and quote." },
    ],
    example: {
      title: "If you want to stop at Masada en route",
      situation: "A Masada visit adds sightseeing time and can change the journey to your Ein Bokek hotel.",
      response: "Mention the Masada stop in your request. I can quote the extended drive and waiting time; arrange site admission and opening hours for your visit.",
    },
    planningTitle: "Extra stops and return journeys",
    planningText: "Include any rest break, Masada stop or return flight in your request for an itinerary and total fare tailored to your trip.",
    faqs: [
      { q: "How long is the private airport transfer to Ein Bokek?", a: "Allow around 1 hour 45 minutes to 2 hours 30 minutes or more after pickup, as a planning estimate. Airport formalities, traffic and road disruptions can add time. Confirm your hotel check-in arrangements independently." },
      { q: "Does the Ein Bokek price apply to every Dead Sea hotel?", a: "No. Enter the exact property. Ein Gedi, Neve Zohar and other Dead Sea locations need confirmation for their own route and final quote; the displayed starting rate is specifically for Ein Bokek." },
      { q: "Can I stop at Masada or arrange the return journey?", a: "Describe any extra stop and the return flight details in the additional requests field. Ask for the itinerary, time and price to be agreed separately. Neither sightseeing nor a return ride is included in the one-way starting rate." },
    ],
    related: [
      { label: "Compare Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" },
      { label: "Plan a visit to Masada", to: "/attractions/masada/" },
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
