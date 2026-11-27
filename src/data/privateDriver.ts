import { airportTransferPhotos as photos } from "@/data/airportTransfers";
import { privateDriverServices, travelGuidePaths } from "@/data/registry";
import jerusalemRoadPhoto from "@/assets/road-to-jerusalem.jpg";
import scenicDrivePhoto from "@/assets/home/road-trip.webp";
import localBusesPhoto from "@/assets/guides/2026-11/buses-in-tel-aviv.webp";
import itineraryPhoto from "@/assets/home/masada-dead-sea-card.webp";
import deadSeaRoadPhoto from "@/assets/guides/dead-sea-route-road.webp";
import jerusalemPhoto from "@/assets/home/jerusalem-old-city-card.webp";
import caesareaPhoto from "@/assets/home/caesarea-dusk-card.webp";
import deadSeaPhoto from "@/assets/dead-sea/beach-card.webp";

const descriptions = {
  intercity: {
    title: "Hotel-to-hotel transfers",
    text: "Travel directly between hotels, with an agreed pickup time and space for your luggage.",
    photo: photos["haifa"]!,
  },
  "day-hire": {
    title: "Private driver for the day",
    text: "Set aside a day for sightseeing on a route of your choice. Tell me where you'd like to go, how long to spend at each stop and where to finish.",
    photo: {
      src: scenicDrivePhoto,
      alt: "Private car travelling on a scenic desert road during a day trip in Israel",
      sourceUrl: "",
      label: "Scenic private day trip",
    },
  },
  "multi-stop": {
    title: "Multi-stop journeys",
    text: "Add a visit to Caesarea or another attraction on your way from one city to the next.",
    photo: photos["caesarea"]!,
  },
};
export const privateDriverJourneys = privateDriverServices.map(service => ({ ...service, ...descriptions[service.id] }));
export const privateDriverHero = {
  src: jerusalemRoadPhoto,
  alt: "Car travelling on a winding road towards Jerusalem at sunset",
  sourceUrl: "",
  label: "Scenic road to Jerusalem",
};
export const privateDriverBenefits = [
  { title: "A route that fits your plans", text: "Choose where to start, which sights to visit and where to finish." },
  { title: "Space for your group", text: "Tell me how many passengers and bags you're travelling with so I can arrange a suitable vehicle." },
  { title: "A clear quote before booking", text: "I'll confirm your route, vehicle and total price before you book." },
];
export const privateDriverFaqs = [
  { q: "How is my private driver quote calculated?", a: "The price depends on your route, date, vehicle size, hours and special requests. I'll confirm the total and explain what's included, including stops, waiting time and any parking or tolls, before you book." },
  { q: "Can I add stops or change the route during the journey?", a: "Yes, if the driver is available. Changes on the day may affect the price, so please discuss them with me first. Planning your stops in advance helps you make the most of your time." },
  { q: "Is a licensed tour guide included?", a: "A licensed guide is arranged separately from your private driver. Tell me which sites you'd like to visit and your preferred language, and I'll check the options." },
  { q: "Can I request a larger vehicle, child seats or accessibility support?", a: "Please include your group size, children's ages, luggage and any accessibility needs. I'll check which vehicles and equipment are available for your date." },
  { q: "How do payment, cancellation and extra hours work?", a: "Your quote will explain payment, cancellation, any limits on hours or mileage, and charges for extra time or stops. Your booking is confirmed once we've agreed on the route, vehicle, price and terms." },
  { q: "Can I book a pickup from Ben Gurion Airport?", a: "Yes. For airport pickups, use my Airport Transfers page to see starting prices to popular destinations and request a quote for your arrival." },
];
export const privateDriverGuides = [
  { title: "Getting around Israel", to: travelGuidePaths.israel, text: "Plan your travel between cities and regions.", photo: { src: localBusesPhoto, alt: "Buses at an Israeli transport terminal", sourceUrl: "", label: "Getting around Israel" } },
  { title: "Israel itinerary: 7 days", to: "/travel-blog/israel-itinerary-7-days/" as const, text: "Ideas for a week of sightseeing around Israel.", photo: { src: itineraryPhoto, alt: "Masada and the Dead Sea landscape", sourceUrl: "", label: "Seven-day Israel itinerary" } },
  { title: "Jerusalem to the Dead Sea", to: "/travel-blog/jerusalem-to-the-dead-sea/" as const, text: "Choose stops and plan the journey to the Dead Sea.", photo: { src: deadSeaRoadPhoto, alt: "Winding road beside the Dead Sea", sourceUrl: "", label: "Dead Sea scenic route" } },
  { title: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" as const, text: "Choose a convenient area for your hotel stay.", photo: { src: jerusalemPhoto, alt: "Stone buildings in Jerusalem's Old City", sourceUrl: "", label: "Jerusalem Old City" } },
  { title: "Caesarea visitor guide", to: "/attractions/caesarea/" as const, text: "Add ancient Caesarea to a coastal journey.", photo: { src: caesareaPhoto, alt: "Ancient Caesarea beside the Mediterranean Sea", sourceUrl: "", label: "Caesarea" } },
  { title: "Dead Sea hotels", to: "/travel-blog/best-dead-sea-hotels/" as const, text: "Find your base on the Dead Sea coast.", photo: { src: deadSeaPhoto, alt: "Beach and hotels near the Dead Sea", sourceUrl: "", label: "Dead Sea beach" } },
];
