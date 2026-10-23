import type { LinkProps } from "@tanstack/react-router";
import type { GuidePhoto } from "@/data/travelGuides";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { hotelCategoryGuides, jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import benGurionPhoto from "@/assets/home/ben-gurion-t3.webp";
import airportPickupPhoto from "@/assets/home/airport-pickup.webp";
import roadTripPhoto from "@/assets/home/road-trip.webp";
import caesareaPhoto from "@/assets/home/caesarea-aqueduct.webp";

/** Editorial content for the /accommodation/ hub. Photos are existing local assets with their recorded provenance. */
export type HubPhoto = GuidePhoto & { label: string };
type InternalTo = NonNullable<LinkProps["to"]>;

const category = (destinationId: string, id: string) => {
  const guide = hotelCategoryGuides.find((g) => g.destinationId === destinationId && g.id === id);
  if (!guide) throw new Error(`Missing hotel category guide ${destinationId}/${id}`);
  return guide;
};
const area = (id: string) => {
  const found = [...jerusalemAreaGuides, ...telAvivAreaGuides].find((a) => a.id === id);
  if (!found) throw new Error(`Missing area guide ${id}`);
  return found;
};
const fromMigration = (key: keyof typeof migrationPhotos, label: string): HubPhoto => ({ ...migrationPhotos[key], label });

const boutique = category("haifa", "boutique");
const spa = category("deadsea", "spa");
const family = category("tiberias", "family");
const downtown = area("downtown");
const beachfront = area("telaviv-beachfront");
const florentin = area("telaviv-florentin");

export type HotelStyle = { id: string; title: string; advantage: string; suits: string; check: string; photo: HubPhoto; link?: { to: InternalTo; label: string } };

export const hotelStyles: HotelStyle[] = [
  { id: "boutique", title: "Boutique & heritage hotels", advantage: "Restored buildings, fewer rooms and a strong sense of place.", suits: "Couples and travelers who value character over facilities.", check: "Room sizes vary, older buildings may lack elevators, and parking is often off-site.", photo: { ...boutique.photo, label: boutique.photo.label }, link: { to: boutique.path as InternalTo, label: "Boutique hotels in Haifa" } },
  { id: "city", title: "Central city hotels", advantage: "Walk or ride the light rail to sights, markets and restaurants.", suits: "First visits and car-free trips.", check: "Ask about street noise, the taxi drop-off point and how far the nearest step-free entrance is.", photo: { ...downtown.photo, label: "Jerusalem — Downtown" }, link: { to: downtown.path as InternalTo, label: "Downtown Jerusalem hotels" } },
  { id: "beach", title: "Beachfront hotels", advantage: "Swims, sunsets and the promenade on your doorstep.", suits: "Summer stays and slower city breaks.", check: "“Sea view” can mean full or side view — confirm the exact room category.", photo: { src: "/images/city-stays/tel-aviv-beachfront.webp", alt: "Gordon Beach and the Mediterranean in Tel Aviv", label: "Tel Aviv — beachfront view" }, link: { to: beachfront.path as InternalTo, label: "Tel Aviv beachfront hotels" } },
  { id: "spa", title: "Spa & wellness resorts", advantage: "Pools, treatments and a full day of rest without moving.", suits: "Couples and anyone adding rest days to a busy itinerary.", check: "Spa access, hours, age limits and treatment prices often differ from the room rate.", photo: { ...spa.photo, label: spa.photo.label }, link: { to: spa.path as InternalTo, label: "Dead Sea spa hotels" } },
  { id: "family", title: "Family-friendly hotels", advantage: "Connecting or family rooms, pools and easier meal times.", suits: "Parents traveling with babies, children or teenagers.", check: "Confirm how the hotel counts children's ages, cot availability and the occupancy of each room.", photo: { ...family.photo, label: family.photo.label }, link: { to: family.path as InternalTo, label: "Family hotels in Tiberias" } },
  { id: "apartment", title: "Apartments & aparthotels", advantage: "A kitchen, more space and a local neighborhood feel.", suits: "Longer stays, families and groups who like to self-cater.", check: "Check-in may be self-service; confirm stairs, cleaning, deposits and who to call if something goes wrong.", photo: { ...florentin.photo, label: "Tel Aviv — Florentin" }, link: { to: florentin.path as InternalTo, label: "Explore Florentin, Tel Aviv" } },
];

export type ChoiceTip = { id: string; title: string; text: string; icon: "map" | "bed" | "access" | "meal" | "receipt" | "calendar" };
export const choiceTips: ChoiceTip[] = [
  { id: "location", icon: "map", title: "Location & the last few hundred meters", text: "Check the real walking route to the places you'll visit, not just the neighborhood name. Jerusalem and Haifa are hilly, and pedestrian streets or Old City lanes may mean a walk from the nearest car drop-off. Ask the hotel where a taxi can stop." },
  { id: "room", icon: "bed", title: "Room type & occupancy", text: "Rates are set per room and occupancy. Confirm the bed setup, the maximum number of guests and how children of each age are counted before comparing prices." },
  { id: "access", icon: "access", title: "Steps, elevators & accessibility", text: "Historic buildings can have stairs at the entrance or no elevator. If anyone needs step-free access, ask about the entrance, bathroom and elevators — including any Shabbat elevator arrangement." },
  { id: "meals", icon: "meal", title: "Breakfast & Shabbat dining", text: "Check whether breakfast is included. Many hotels serve Friday-evening and Saturday meals differently, and some restaurants close for Shabbat, so ask what will be open on the evening you arrive." },
  { id: "price", icon: "receipt", title: "Total price, deposits & cancellation", text: "Compare the final total including taxes and fees, the deposit or prepayment and the cancellation deadline. Parking, resort facilities and late check-out may cost extra." },
  { id: "transport", icon: "calendar", title: "Friday evening, Saturday & holidays", text: "Regular rail service and most buses pause for Shabbat and major Jewish holidays; some local or special services may operate. If you arrive then, plan a taxi or private transfer and confirm the hotel's late check-in." },
];

export const seasons = [
  { id: "spring", title: "Spring", text: "Often comfortable for city walks and northern countryside, though weather can be changeable and Passover/Easter dates matter." },
  { id: "summer", title: "Summer", text: "Coastal and beach stays come into their own; inland areas, the Dead Sea and the desert can be intensely hot by day." },
  { id: "autumn", title: "Autumn", text: "Often a good mix of city sightseeing and outdoor days, but the autumn Jewish holidays can affect transport and bookings." },
  { id: "winter", title: "Winter", text: "Good for museums and city stays, and southern areas such as Eilat are milder. Expect shorter days and possible rain in the north and Jerusalem." },
];

export const seasonPhoto = fromMigration("best-time-to-visit-israel", "Best time to visit Israel — guide photo");
export const eventsPhoto = fromMigration("calendar-of-events", "Calendar of events — guide photo");

export type HubCard = { id: string; group: string; title: string; text: string; cta: string; to: InternalTo; photo: HubPhoto };

export const arrivalCards: HubCard[] = [
  { id: "arrival", group: "Before you land", title: "Ben Gurion arrival tips", text: "Passport control, luggage, SIM cards and where each type of transport leaves from, so you reach your hotel without stress.", cta: "Read the arrival tips", to: "/travel-blog/ben-gurion-airport-arrival-tips/", photo: { src: benGurionPhoto, alt: "The reception hall in Ben Gurion Airport Terminal 3", credit: "GeorgeDement · CC BY-SA 2.0 · resized", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", label: "Ben Gurion Airport Terminal 3" } },
  { id: "shabbat", group: "Before you land", title: "Arriving on Shabbat", text: "Landing between Friday afternoon and Saturday evening? See which options keep running and how to plan the drive to your hotel.", cta: "Plan a Shabbat arrival", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/", photo: { src: "/images/hotels/jerusalem-night.webp", alt: "Jerusalem skyline illuminated at night", label: "Jerusalem skyline by night" } },
  { id: "jerusalem", group: "Airport to your city", title: "Airport to Jerusalem", text: "Train, bus, taxi and pre-booked transfer compared — including the final approach to Old City hotels.", cta: "Compare ways to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", photo: { src: "/images/attractions/hero-jerusalem.webp", alt: "Jerusalem's Old City skyline and walls in daylight", label: "Jerusalem skyline by day" } },
  { id: "telaviv", group: "Airport to your city", title: "Airport to Tel Aviv", text: "Compare trains, buses, taxis and private transfers, then check the last leg to your beachfront, city-centre or Jaffa hotel.", cta: "Compare ways to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", photo: fromMigration("EXISTING:coast", "Tel Aviv shoreline from Jaffa") },
  { id: "haifa", group: "Airport to your city", title: "Airport to Haifa", text: "Rail along the coast or a direct drive — and how to handle Haifa's hills on the last stretch.", cta: "Compare ways to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", photo: { src: "/images/attractions/haifa-coast.webp", alt: "Haifa and the Mediterranean coast", label: "Haifa coast" } },
  { id: "einbokek", group: "Airport to your city", title: "Airport to Ein Bokek", text: "Getting to the Dead Sea hotels takes longer; compare buses, connections and a direct drive to your resort.", cta: "Compare ways to Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/", photo: fromMigration("EXISTING:deadSea", "Dead Sea shoreline") },
  { id: "around", group: "Moving between hotels", title: "Getting around Israel", text: "Trains, buses, shared taxis and car rental for moving between hotel bases during your trip.", cta: "Read the transport guide", to: "/travel-blog/getting-around-israel/", photo: { src: roadTripPhoto, alt: "Illustration of a car on an open road", label: "Road trip illustration" } },
  { id: "transfers", group: "Moving between hotels", title: "Book a private transfer", text: "Prefer to be met and driven straight to your hotel door? See private airport and intercity transfer options.", cta: "See transfer options", to: "/transfers/", photo: { src: airportPickupPhoto, alt: "Illustration of a driver greeting travelers at an airport", label: "Airport pickup illustration" } },
];

/** Internal routes retain the publisher's original four itinerary URL slugs. */
export type ItineraryCard = { id: string; days: number; title: string; route: string; bases: string; to: InternalTo; photo: HubPhoto };
export const itineraryCards: ItineraryCard[] = [
  { id: "3", days: 3, title: "Israel in 3 days", route: "Jerusalem, Masada & the Dead Sea, then Tel Aviv.", bases: "Jerusalem and Tel Aviv can serve as convenient bases; adjust overnight stays to your arrival and departure times.", to: "/travel-blog/israel-itinerary-3-days/", photo: fromMigration("EXISTING:masada", "Masada") },
  { id: "5", days: 5, title: "Israel in 5 days", route: "Jerusalem, Masada & the Dead Sea, Tel Aviv & Jaffa, then Caesarea and Haifa.", bases: "Stay in Jerusalem and Tel Aviv; Caesarea and Haifa work as a day out or a final coastal night.", to: "/travel-blog/israel-itinerary-5-days/", photo: { src: caesareaPhoto, alt: "The Roman aqueduct on the beach at Caesarea", credit: "זאב שטיין (Zeev Stein) · CC BY 2.5 · resized", sourceUrl: "https://commons.wikimedia.org/wiki/File:125359_caesarea_national_park_PikiWiki_Israel.jpg", licenseUrl: "https://creativecommons.org/licenses/by/2.5/", label: "Caesarea aqueduct" } },
  { id: "7", days: 7, title: "Israel in 7 days", route: "Adds Nazareth, the Sea of Galilee and the Golan Heights to Jerusalem, Haifa, Caesarea and Tel Aviv.", bases: "Add a northern base — Tiberias or the Galilee — for a couple of nights.", to: "/travel-blog/israel-itinerary-7-days/", photo: fromMigration("EXISTING:galilee", "Tiberias and the Sea of Galilee") },
  { id: "10", days: 10, title: "Israel in 10 days", route: "Adds Akko and Rosh Hanikra in the north, then Eilat, the Red Sea and Timna Park in the south.", bases: "Plan northern nights plus a southern stay in Eilat for the desert and Red Sea days.", to: "/travel-blog/israel-itinerary-10-days/", photo: { src: "/images/attractions/eilat.webp", alt: "Red Sea beach and coastal scenery in Eilat", label: "Eilat Red Sea beach" } },
];

export const hotelHubFaqs = [
  { q: "Should I change hotels every night?", a: "Not usually. Choose a few well-positioned hotel bases and make day trips where practical; longer drives to northern or southern destinations may justify another overnight stay." },
  { q: "Which city is best for a first trip?", a: "Most first trips combine Jerusalem for history and Tel Aviv for the beach and city life. Open each city guide to compare neighborhoods before choosing a hotel." },
  { q: "What should I check if I arrive on a Friday evening?", a: "Confirm late check-in, ask what meals are served that evening and plan a taxi or private transfer, because most public transport stops for Shabbat." },
];
