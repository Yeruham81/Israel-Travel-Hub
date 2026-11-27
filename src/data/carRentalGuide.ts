import roadPhoto from "@/assets/guides/car-rental-israel-road.webp";
import type { SourceReference } from "@/data/registry";

export const CAR_RENTAL_UPDATED = "2026-11-22";
export const carRentalHero = {
  src: roadPhoto,
  alt: "A red car travelling along a sunny coastal road beside blue water and green hills",
};
export const carRentalTitle = "Car Rental in Israel: My Practical Guide for Visitors";
export const carRentalDescription =
  "Plan a self-drive trip in Israel: compare car rentals, airport and city pickup, documents, insurance, deposits, costs and practical driving tips.";

export const rentalDecisionRows = [
  [
    "A stay in central Tel Aviv or Jerusalem",
    "Walking, public transport and occasional taxis",
    "Collect a car when you leave the city for your next destination.",
  ],
  [
    "Several days around the Galilee or the Negev",
    "A rental car for independent exploring",
    "Choose accommodation with parking and group nearby stops together.",
  ],
  [
    "One day visiting several attractions",
    "A rental, an organised tour or a private driver",
    "Compare the total cost of renting a car, including fuel and parking, with the price of a tour or private driver.",
  ],
  [
    "An airport arrival followed by a road trip",
    "Airport collection",
    "Allow time for passport control and baggage collection, and confirm your rental car pickup time.",
  ],
  [
    "A relaxed trip with someone else driving",
    "A private driver or guided tour",
    "Choose a private driver for flexible transport or a guided tour to learn more about the places you visit.",
  ],
];

export const rentalCostRows = [
  [
    "Rental period",
    "The total for your collection and return times",
    "Check the charge for a late return or an extra rental day.",
  ],
  [
    "Included cover",
    "Damage and theft protection, third-party insurance and your excess",
    "Read exclusions and compare any optional protection separately.",
  ],
  [
    "Security deposit",
    "The amount held on your card",
    "Make sure your credit card has enough available credit for the deposit and your travel expenses.",
  ],
  [
    "Pickup, return and one-way fees",
    "Airport fees, one-way rental fees and pickup or return outside opening hours",
    "Compare the total rental cost for your chosen pickup and return locations.",
  ],
  [
    "Mileage and fuel",
    "Mileage allowance and the fuel-return policy",
    "Plan your route and check the rate for extra kilometres.",
  ],
  [
    "Drivers and equipment",
    "Additional or young drivers, child seats and other extras",
    "Include every driver and essential item in the quotation.",
  ],
  [
    "Parking, tolls and administration",
    "Hotel parking, paid car parks and road tolls",
    "Ask how the rental company charges for toll roads and any additional administrative fees.",
  ],
  [
    "Taxes and cancellation",
    "Applicable taxes and cancellation policy",
    "Keep your entry permit; confirm any tourist VAT exemption and the refund method.",
  ],
];

export const rentalChecklists = {
  collect: [
    "Bring the booking voucher, original driving licence, passport, entry permit and the required payment card.",
    "Confirm the return location, agreed time, fuel level, mileage allowance and deposit.",
    "Photograph the bodywork, wheels, glass and interior; have existing damage recorded before leaving.",
    "Check the fuel type, lights, air conditioning, child seats and room for all your bags.",
    "Save the supplier’s roadside-assistance number and your rental documents.",
  ],
  return: [
    "Follow your supplier’s return directions and allow time for any airport shuttle.",
    "Return the car with the agreed fuel level and keep your refuelling receipt.",
    "Photograph the parked car, mileage and fuel gauge at handover.",
    "Collect your belongings and ask for written confirmation that you've returned the car. If you're returning it outside opening hours, follow the key-drop instructions.",
    "Keep the final invoice and check the deposit release with your card issuer and supplier.",
  ],
};

export const carRentalFaqs = [
  {
    q: "Should I rent a car for my whole trip to Israel?",
    a: "Match the rental to the days you will drive between destinations. For a trip that starts with several days in central Tel Aviv or Jerusalem, I suggest exploring the city first and collecting a car for the regional part of your journey.",
  },
  {
    q: "Is airport or city pickup better?",
    a: "Pick up your car at the airport if you're starting a road trip straight away. If you're sightseeing in the city first, collect it from a city branch when you're ready to leave. Compare total prices, opening hours and return options.",
  },
  {
    q: "Do I need an international driving permit?",
    a: "Check the selected supplier’s rules for your original licence. Hertz Israel requires an international permit when the licence uses a non-Latin script; Eldan asks for one when the licence is not in English. Bring the original licence alongside any required permit.",
  },
  {
    q: "Can I use a debit card for the deposit?",
    a: "Check the payment section of the specific rental offer before booking. Many suppliers require a physical credit card in the main driver’s name, even when online payment can be made by another method. Choose an offer whose deposit requirements match the card you will bring.",
  },
  {
    q: "Does DiscoverCars Full Coverage remove the deposit?",
    a: "DiscoverCars describes Full Coverage as reimbursement protection for eligible charges. The rental supplier’s deposit and rental agreement still apply. Read the offer’s deposit amount, covered items, exclusions and claims requirements together.",
  },
  {
    q: "Can I collect or return a car on Shabbat?",
    a: "Opening hours depend on the branch, supplier and date. Confirm collection and return at your exact times, including public holidays, and ask about any out-of-hours charge or key-drop arrangement.",
  },
  {
    q: "Can I drive the rental car to Bethlehem or across a border?",
    a: "Have the supplier confirm permitted territory and insurance cover for your complete route. Hertz Israel’s contract excludes Area A, including Bethlehem. For a Bethlehem visit, plan a suitable tour or separately arranged transport; arrange cross-border travel separately with the relevant operators.",
  },
  {
    q: "Can I return the car in another Israeli city?",
    a: "Check availability and the one-way fee when selecting pickup and return locations. Compare the whole-trip cost with returning to the original branch, especially when your itinerary ends in Eilat or at the airport.",
  },
];

export const carRentalSources: SourceReference[] = [
  {
    id: "car-rental-iaa",
    publisher: "Israel Airports Authority",
    title: "Ben Gurion Airport car-rental companies",
    url: "https://www.iaa.gov.il/en/airports/ben-gurion/car-rental-companies/",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Official collection counters, company-specific vehicle-return locations and terminal shuttle arrangements.",
  },
  {
    id: "car-rental-hertz-essentials",
    publisher: "Hertz Israel",
    title: "Rental documents, driver requirements and charges",
    url: "https://www.hertz.co.il/en/GoodToKnow/InfoIsrael/.aspx",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Supplier-specific licence, payment-card, entry-permit and tourist VAT requirements; check the conditions of your chosen offer.",
  },
  {
    id: "car-rental-eldan-terms",
    publisher: "Eldan",
    title: "Detailed rental terms",
    url: "https://www.eldan.co.il/en/detailedtermsofrental",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Authorised drivers, licence language and experience, rental periods, vehicle condition and supplier responsibilities.",
  },
  {
    id: "car-rental-discover-terms",
    publisher: "DiscoverCars",
    title: "Booking terms and Rental Conditions",
    url: "https://www.discovercars.com/terms-and-conditions",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Offer-specific documents, payment, deposit, cancellation and protection terms.",
  },
  {
    id: "car-rental-discover-deposit",
    publisher: "DiscoverCars",
    title: "Understanding the security deposit",
    url: "https://www.discovercars.com/help/articles/picking-up-your-car/security-deposits/how-much-is-the-security-deposit",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Deposit amounts vary by supplier and vehicle; the selected Rental Conditions specify the payment-card requirements.",
  },
  {
    id: "car-rental-discover-cover",
    publisher: "DiscoverCars",
    title: "Full Coverage and the supplier’s deposit",
    url: "https://www.discovercars.com/help/articles/protection-coverage/discovercars-full-coverage/do-i-need-to-leave-a-security-deposit-if-i-purchase-full-coverage-online",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "Full Coverage reimburses eligible charges under its terms; the supplier’s deposit and contract remain applicable.",
  },
  {
    id: "car-rental-road6",
    publisher: "Highway 6",
    title: "Tolls for rental vehicles",
    url: "https://www.kvish6.co.il/Info.aspx",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "The toll operator explains billing to the registered vehicle owner and rental-company handling fees. Information is in Hebrew.",
  },
  {
    id: "car-rental-hertz-territory",
    publisher: "Hertz Israel",
    title: "Rental agreement and permitted territory",
    url: "https://www.hertz.co.il/en/GoodToKnow/IsraelContract/",
    checkedAt: CAR_RENTAL_UPDATED,
    note: "This supplier’s contract excludes driving in Area A. Confirm the terms for your own vehicle and route.",
  },
];
