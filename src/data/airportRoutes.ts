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
    intro: "Book a private pickup to your Jerusalem hotel or address, including Mamilla and the Old City area. Send me your flight, luggage and exact drop-off point for a confirmed quote.",
    checklistTip: "For Old City accommodation, confirm a vehicle-accessible drop-off and any remaining walk or steps.",
    journeyTitle: "Driving to your Jerusalem hotel",
    journeyText: "Allow around 45–60 minutes or more after pickup, depending on traffic and your hotel's location. Airport formalities come before the drive, and Old City accommodation may require a nearby permitted vehicle drop-off.",
    areasTitle: "Where in Jerusalem are you staying?",
    areas: [
      { title: "City centre, Mamilla & King David Street", text: "Give the full hotel name and ask which entrance accommodates vehicles and luggage. Reception may be on a different street." },
      { title: "Inside or beside the Old City", text: "Check the nearest permitted drop-off with your hotel. Some Old City lanes require a final walk with luggage." },
      { title: "East Jerusalem & residential neighbourhoods", text: "Give the full street address, building entrance and a location pin if useful. Arrange apartment check-in separately." },
    ],
    example: {
      title: "If your room is inside the Old City",
      situation: "A hotel's street address may sit inside a lane where ordinary vehicles cannot stop.",
      response: "Send the hotel name and ask reception which gate and permitted unloading point to use. The quote should identify the practical drop-off; the remaining walk or luggage assistance may need separate arrangements.",
    },
    planningTitle: "Late arrival and Old City access",
    planningText: "For late flights, check your hotel's reception or key collection arrangements. Include the exact entrance or nearest vehicle-accessible Old City drop-off in your request.",
    faqs: [
      { q: "How long is the private transfer to Jerusalem?", a: "Allow approximately 45–60 minutes or more after pickup, as a planning estimate. Your hotel location and traffic can make it longer. This is a road-time estimate, not a promise of reaching your hotel within an hour of landing." },
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
    intro: "Travel directly from Ben Gurion Airport to your hotel or address in Tel Aviv or Jaffa. Share your flight, group size and luggage details to receive a confirmed private-transfer quote.",
    checklistTip: "For Old Jaffa or beachfront accommodation, confirm the hotel entrance or nearest drivable drop-off.",
    journeyTitle: "Driving to Tel Aviv or Jaffa",
    journeyText: "Allow around 20–40 minutes or more after pickup. Traffic entering Tel Aviv, beachfront access and Old Jaffa's narrow streets can affect the final approach; airport formalities are additional.",
    areasTitle: "Beachfront hotel, central apartment or Jaffa stay?",
    areas: [
      { title: "Beachfront hotels", text: "Provide the full hotel name and the correct vehicle entrance; some seafront properties have a separate luggage drop-off." },
      { title: "Old Jaffa & the port area", text: "Confirm the closest accessible drop-off with your host. Some Old Jaffa lanes require a short walk with luggage." },
      { title: "Neve Tzedek, Florentin & rental apartments", text: "Provide the street number, building entrance and a map pin if useful. Arrange apartment key collection separately." },
    ],
    example: {
      title: "If four travelers each have a large suitcase",
      situation: "A car with four passenger seats may not have enough luggage capacity, particularly with hand luggage or a stroller.",
      response: "Specify the number and size of cases when requesting the quote. A larger vehicle may be needed even when the party is within the published four-person rate category.",
    },
    planningTitle: "Match the vehicle to your luggage",
    planningText: "Four passenger seats do not guarantee space for four large suitcases. List bags, strollers and child-seat needs so I can quote the right vehicle.",
    faqs: [
      { q: "How long does an airport transfer to Tel Aviv take?", a: "Allow around 20–40 minutes as a planning estimate or more after pickup. Traffic and the exact Tel Aviv or Jaffa address can add time. Allow separately for immigration, baggage and reaching the meeting point." },
      { q: "Does the request form cover Jaffa too?", a: "Yes. Tel Aviv & Jaffa is preselected. Enter your actual Jaffa hotel or apartment address so I can confirm the final price and a suitable vehicle drop-off." },
      { q: "Will four passengers and all our suitcases fit?", a: "Do not assume that passenger capacity also guarantees luggage space. List every suitcase, carry-on and stroller. I will need to confirm the vehicle and whether a larger option changes the quote." },
    ],
    related: [
      { label: "Find your Tel Aviv hotel area", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Hotels around Jaffa", to: "/accommodation/tel-aviv/jaffa/" },
    ],
  },
  haifa: {
    city: "Haifa", title: "Private transfer from Ben Gurion Airport to Haifa",
    description: "Private airport transfer from Ben Gurion to Haifa: drive time, Mount Carmel or coastal hotel drop-off, cruise connections and a quote request.",
    intro: "Arrange a private pickup from Ben Gurion Airport to your hotel or address in Haifa, from the coast to Mount Carmel. Share your flight and destination for a confirmed quote.",
    checklistTip: "For a cruise connection, add your ship, passenger terminal and check-in deadline, with a generous time buffer.",
    journeyTitle: "Driving to your Haifa address",
    journeyText: "Allow about 75–110 minutes or more after pickup. Haifa stretches from the coast up Mount Carmel, so the exact hotel or terminal matters; airport formalities and traffic can add time.",
    areasTitle: "Haifa's coast and hilltop hotels need different drop-offs",
    areas: [
      { title: "Downtown & the German Colony", text: "Share the exact hotel entrance; smaller streets and restored buildings may have a designated place to unload bags." },
      { title: "Mount Carmel & Carmel Centre", text: "Include the actual hilltop address and mention any steps, accessibility needs or unusual entrance arrangements." },
      { title: "Beachfront & Bat Galim", text: "Name the property and preferred entrance; Haifa's coastal districts cover several distinct drop-off areas." },
    ],
    example: {
      title: "If your flight connects with a cruise departure",
      situation: "A booking for a Haifa city hotel is not the same as confirmed delivery to the cruise passenger terminal.",
      response: "Provide the ship and boarding deadline. Confirm the correct passenger access point and allow for immigration, baggage, road delays and the walk or terminal access arrangements before check-in.",
    },
    planningTitle: "Connecting to a cruise?",
    planningText: "A cruise-terminal drop-off is different from a city hotel. Include your ship, correct terminal and boarding deadline, and allow a generous buffer for flight and road delays.",
    faqs: [
      { q: "How long should I allow for a private transfer to Haifa?", a: "Allow about 75–110 minutes as a planning estimate or more after pickup. The Haifa neighbourhood and traffic matter, and time in the airport is additional. Avoid a tight onward connection based only on that estimate." },
      { q: "Can I request a hotel on Mount Carmel?", a: "Yes. Include the full hotel or apartment address and any entrance instructions. Explain steps or mobility needs so I can confirm a practical drop-off and suitable vehicle." },
      { q: "Is a Haifa Port drop-off the same as a city hotel transfer?", a: "No. Include the exact passenger terminal, ship and required arrival time. Ask me to confirm the route, access and final price rather than assuming a general Haifa quote includes every port entrance." },
    ],
    related: [
      { label: "Choose where to stay in Haifa", to: "/travel-blog/best-hotels-in-haifa/" },
      { label: "Shore excursions from Haifa", to: "/shore-excursions/haifa/" },
    ],
  },
  "dead-sea": {
    city: "Ein Bokek (Dead Sea)", title: "Private transfer from Ben Gurion Airport to Ein Bokek",
    description: "Private transfer from Ben Gurion Airport to Ein Bokek: journey time, exact Dead Sea hotel, one-way starting rate and return-trip requests.",
    intro: "Book a private transfer from Ben Gurion Airport to your Ein Bokek hotel at the Dead Sea. Share your flight, luggage and exact hotel for a confirmed quote.",
    checklistTip: "The starting fare covers Ein Bokek; mention Neve Zohar, Ein Gedi, Masada or other stops separately.",
    journeyTitle: "Driving to your Ein Bokek hotel",
    journeyText: "Allow around 1 hour 45 minutes to 2 hours 30 minutes or more after pickup. The published fare is specifically for Ein Bokek; other Dead Sea districts and sightseeing stops require their own quote.",
    areasTitle: "Make sure the quote matches your Dead Sea hotel",
    areas: [
      { title: "Ein Bokek hotels", text: "Give your full hotel name and entrance. The displayed starting fare applies to Ein Bokek, with the final total confirmed in your quote." },
      { title: "Neve Zohar & the southern hotel district", text: "Hotels in Neve Zohar and other areas need a quote for their actual address, not the Ein Bokek starting fare." },
      { title: "Ein Gedi, Masada or a stop along the way", text: "Ein Gedi, Masada and sightseeing stops are not included in the one-way Ein Bokek fare. Ask for a separate route and price." },
    ],
    example: {
      title: "If you want to stop at Masada en route",
      situation: "The published one-way price is for transport to Ein Bokek, not sightseeing or a different Dead Sea district.",
      response: "Request a separate multi-stop itinerary, including time for admission and access at Masada, and agree the additional travel time and total before booking. Do not assume the stop is included.",
    },
    planningTitle: "Extra stops and return journeys",
    planningText: "The one-way Ein Bokek fare does not include sightseeing or a return journey. List any requested Masada stop, rest break or return flight so I can quote it separately.",
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
