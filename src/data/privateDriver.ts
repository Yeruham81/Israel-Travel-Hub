import { airportTransferPhotos as photos } from "@/data/airportTransfers";
import { privateDriverServices, travelGuidePaths } from "@/data/registry";

const descriptions = {
  intercity: { title: "Intercity transfers", text: "Change cities without planning the driving yourself. Request a pickup at one hotel and a drop-off at the next, with room for everyone and their bags.", photo: photos["haifa"]! },
  "day-hire": { title: "A private driver for the day", text: "Build a day around your own priorities. Share your stops and preferred pace, then agree the hours, waiting time and return point before booking.", photo: photos["jerusalem"]! },
  "multi-stop": { title: "A journey with several stops", text: "Make the journey part of your trip: a visit, a lunch break or a meeting between two destinations. Ask for realistic timing and a quote for the complete route.", photo: photos["caesarea"]! },
};
export const privateDriverJourneys = privateDriverServices.map((service) => ({ ...service, ...descriptions[service.id] }));
export const privateDriverHero = photos["tel-aviv"]!;
export const privateDriverBenefits = [
  { title: "Your itinerary, clearly agreed", text: "Specify the places that matter to you, the pickup and final drop-off, and the time you want at each stop." },
  { title: "A vehicle matched to your party", text: "Include every passenger, suitcase, stroller and requested child seat so Moshe can quote for an appropriate vehicle." },
  { title: "A pace that suits your day", text: "Mention walking limits, longer visits or appointment times early. Leave space for traffic and a sensible break between stops." },
  { title: "One complete written quote", text: "Ask for the total, included hours and distance, waiting and extra-time charges, and payment and cancellation terms." },
];
export const privateDriverSteps = [
  { title: "Describe your journey", text: "Send the date, addresses, stops, party size and luggage. If the route is still taking shape, explain your priorities and any fixed appointments." },
  { title: "Review the proposal", text: "Agree the itinerary, vehicle and full price. Check what is included and whether you need transport only or a separately quoted licensed guide." },
  { title: "Confirm and keep the details", text: "Book only after confirmation. Save the pickup instructions, contact number and agreed itinerary where you can reach them during the trip." },
];
export const privateDriverFaqs = [
  { q: "Can I arrange a transfer between two hotels?", a: "Yes, you can request an intercity or hotel-to-hotel journey. Give both addresses, your date and preferred pickup time, passengers and luggage. Moshe confirms availability, the vehicle and the price before booking." },
  { q: "How much does a private driver in Israel cost?", a: "This service is quoted for your actual trip. The operator's original page bases the price on the vehicle, itinerary and distance, date and time, and special requests. Ask for a written total and the terms for changes; no fixed daily fare is displayed here." },
  { q: "Is a licensed tour guide included?", a: "Do not assume so. A driver handles transportation; guided visits are a separate requirement. Select your guide preference in the request and ask Moshe to confirm the guide, language, availability and any additional fee." },
  { q: "What should I check for a full-day hire?", a: "Agree the start and finish, included hours and distance, the route and waiting arrangements. Check parking, tolls, extra stops, overtime and the final drop-off. Meals, admission tickets and guided visits should each be addressed in the quote." },
  { q: "Can I request child seats or help with mobility needs?", a: "Include children's ages, luggage and any mobility or vehicle-access needs. Ask the operator to confirm the actual seat and vehicle arrangements. A request alone does not confirm that a particular vehicle or accessible facility is available." },
  { q: "Can I book an airport pickup here?", a: "Use the separate Airport transfers page for Ben Gurion pickups and the published airport starting rates. This page focuses on intercity journeys, day hire and routes with multiple stops." },
  { q: "Should I hire a driver or rent a car?", a: "A driver can suit a planned journey when you prefer someone else to handle the driving. A rental can suit independent daily travel. Compare the complete costs, parking, hours and the route you want; use the car-rental page to explore that alternative." },
];
export const privateDriverGuides = [
  { title: "Getting around Israel", to: travelGuidePaths.israel, text: "Plan how each part of your trip connects.", photo: photos["haifa"]! },
  { title: "Getting around Tel Aviv", to: travelGuidePaths.telAviv, text: "Decide when a private ride fits your city plans.", photo: photos["tel-aviv"]! },
  { title: "Taxis in Israel", to: travelGuidePaths.taxis, text: "Know what to check before agreeing a ride.", photo: photos["herzliya"]! },
  { title: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const, text: "Choose an area and plan your hotel arrival.", photo: photos["jerusalem"]! },
  { title: "Caesarea visitor guide", to: "/attractions/caesarea/" as const, text: "Explore an idea for a stop along the coast.", photo: photos["caesarea"]! },
  { title: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" as const, text: "Find your destination and give its exact address.", photo: photos["dead-sea"]! },
];
