/**
 * Taxi content cluster. Each guide has ONE primary search intent:
 * taxis = how to use licensed taxis; taxiFares = regulated prices;
 * airportTaxis = authorized TLV airport ordering and pickup.
 * Cross-links intentionally avoid repeating other guides in full.
 */
import type { TravelGuide } from "@/data/travelGuides";
import { consumerFareTable, taxiFaresWithVat } from "@/data/taxiFares";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { travelGuidePaths } from "@/data/travel-guide-paths";
import { airportTaxiEstimateTable } from "@/data/airportTaxiFareEstimates";
import { airportTransferPhotos } from "@/data/airportTransfers";
import roadTrip from "@/assets/home/road-trip.webp";
import taxiMeterPhoto from "@/assets/guides/israeli-taxi-roof-sign.webp";
import airportHall from "@/assets/home/ben-gurion-t3.webp";

const cityPhoto = airportTransferPhotos["tel-aviv"]!;
const intercityPhoto = { src: roadTrip, alt: "Illustration of a vehicle traveling on a road through the Israeli landscape" };
const terminalHallPhoto = { src: airportHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };

export const taxiGuideCluster: Record<"taxis" | "taxiFares" | "airportTaxis", TravelGuide> = {
  taxis: {
    id: "taxis",
    title: "Taxis in Israel: The Complete Guide for Tourists",
    description: "How to use taxis in Israel: booking apps, licensed cabs, regulated meter fares, Ben Gurion Airport pickup, Shabbat, payment, luggage and safety.",
    intro: "Taxis are useful for city trips, late arrivals and journeys with luggage. I'll explain how to find a licensed taxi, use booking apps, choose a payment method and plan longer trips across Israel.",
    answer: "In Israel, you can hail a licensed taxi, use a taxi stand, ask your hotel or book through Gett or Yango. Confirm your destination, payment method and whether the journey will use the regulated meter. At Ben Gurion Airport, use the authorized Gett or kiosk ordering system and the designated pickup line.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-24",
    photo: { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "Two white licensed taxis with yellow roof signs on a street in Tel Aviv" },
    facts: [
      { label: "Fare", text: "Regulated meter for an ordinary taxi; time, distance and tariff affect the total" },
      { label: "Booking", text: "Street, taxi stand, local dispatcher or an available app" },
      { label: "Payment", text: "Confirm cash, card or app payment before the journey" },
    ],
    nextSteps: [
      { label: "Official taxi fares and tariff hours", to: travelGuidePaths.taxiFares },
      { label: "Official Ben Gurion Airport taxis", to: travelGuidePaths.airportTaxis },
      { label: "Uber, Gett and Yango alternatives", to: travelGuidePaths.uber },
      { label: "Airport transport on Shabbat", to: travelGuidePaths.shabbat },
    ],
    comparison: {
      caption: "Choose the right taxi booking method",
      headers: ["How to ride", "Useful when", "Check before starting"],
      rows: [
        ["Street hail or taxi stand", "Spontaneous city journeys", "Taxi licence, meter, payment method and luggage space"],
        ["Taxi app or dispatcher", "You need a specific address and ride record", "Driver details, licence plate, availability and fare"],
        ["Official airport taxi", "Immediate taxi after landing at TLV", "Ride code and official taxi queue"],
        ["Pre-booked private transfer", "Planned pickup or specified vehicle", "Confirmed price, pickup point, waiting time and cancellation policy"],
      ],
    },
    sections: [
      {
        id: "recognize", title: "How to Recognize a Licensed Taxi in Israel",
        paragraphs: [
          "Licensed taxis in Israel carry a roof sign marked monit (מונית) and taxi identification details. Most are white; verify the licence information inside the vehicle and keep the taxi number if you need help after the journey.",
          "If you have booked through an app, match the license plate and driver information shown in your booking. At an airport or major transport hub, follow the official taxi signage instead of accepting an unsolicited approach inside a terminal.",
          "For journeys involving the West Bank, confirm in advance that the driver and vehicle are allowed to complete your route. Entry and vehicle restrictions vary by area.",
        ],
        sourceIds: ["taxi-passenger-rights"],
      },
      {
        id: "booking", title: "How to Find and Book a Taxi in Israel",
        photo: cityPhoto,
        paragraphs: [
          "In major cities such as Tel Aviv, Jerusalem and Haifa, you can often hail a licensed taxi on the street. Tell the driver the actual address and confirm the payment method and regulated meter before departure. During busy periods or in remote areas, booking a taxi may be more reliable.",
          "You'll find taxi stands near many hotels, railway stations, hospitals and shopping centres. A hotel or local dispatcher can also arrange a pickup; ask whether a regulated ordering addition applies and keep a dispatcher's phone number or your hotel address available offline.",
          "Taxi apps let you enter your pickup location and view the driver's details and your ride history. Enter the correct pickup address, wait for driver confirmation and check whether the displayed price is an estimate or a fixed offer. For choosing an app, see my Uber, Gett and Yango guide.",
          "A private transfer is booked in advance, usually with an agreed vehicle, pickup point and price. Check what is included and when the arrangement becomes a confirmed reservation.",
        ],
        inlineLinks: [{ text: "Uber, Gett and Yango guide", to: travelGuidePaths.uber }],
        links: [{ label: "Private driver for a planned trip", to: "/private-driver-in-israel/" }],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
      },
      {
        id: "fares", title: "How Much Do Taxis Cost in Israel?",
        paragraphs: [
          "An ordinary taxi uses a regulated meter that adds a starting fare, driving time and distance. The meter starts at ₪12.46 including VAT outside Eilat under the April 2026 tariff. Journeys at night, on Shabbat or over longer distances may cost more.",
          "A booking, airport departure or toll charge can apply when permitted. For the exact A/B/C meter rates, tariff hours, permitted surcharges and worked calculations, see my taxi fares in Israel guide.",
          "For a pre-booked private transfer, check the quoted price, waiting time and any additional stops or tolls before confirming your booking.",
        ],
        inlineLinks: [{ text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "apps", title: "Taxi Apps in Israel: Gett, Yango and Uber",
        paragraphs: [
          "Gett and Yango let you book licensed taxis in supported areas, depending on driver availability. You can use the official Gett and Yango Israel rider websites linked below to learn about the services or get their apps. Set up your payment method, check the pickup location and have a backup option if no driver accepts your request.",
          "Uber passenger rides are not currently available in Israel. Gett and Yango are local taxi-booking apps; compare their coverage, pickup details and payment options for your city.",
        ],
        externalLinks: [{ label: "Gett Israel - official website and app", href: "https://www.gett.com/il/" }, { label: "Yango Israel - official rider information", href: "https://appli.taxi/rider/" }],
        highlightedLinks: [
          { label: "Gett Israel - official app and service information", href: "https://www.gett.com/il/", context: "Check how to set up the app and request a licensed taxi before your trip." },
          { label: "Yango Israel - rider information", href: "https://appli.taxi/rider/", context: "Review service details, payments and availability for your pickup location." },
        ],
        sourceIds: ["guide-gett-app", "guide-yango-israel"],
      },
      {
        id: "airport", title: "Taking a Taxi from Ben Gurion Airport",
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Yellow Taxi Entrance sign inside an airport terminal" },
        paragraphs: [
          "At Ben Gurion Airport, order an authorized taxi through Gett or an airport self-service kiosk. For an immediate ride at Terminal 3, follow the official taxi line at ground-floor Exit 03; advance-scheduled Gett pickups at Terminal 3 use Level 2, Exit 23. Terminal 1 has its own taxi queue outside the main arrivals exit.",
          "My airport taxi guide explains ride codes, payment, accessibility, scheduled bookings and indicative fares to popular destinations. The Ben Gurion Airport arrival guide covers the steps from passport control and baggage collection to onward transport.",
          "To compare transport choices for your exact route, read my guides to getting from Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa or Ein Bokek. If you prefer to arrange a vehicle and meeting point in advance, you can request a private airport transfer quote.",
        ],
        inlineLinks: [
          { text: "airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival },
          { text: "Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { text: "request a private airport transfer quote", to: "/airport-transfers/" },
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "sherut", title: "Are Shared Sherut Taxis Available from the Airport?",
        paragraphs: [
          "A sherut is a shared taxi or minibus operating on a set route. Local sherut services still run on some routes in Israel, while the former regular airport shared-taxi services to Jerusalem and Haifa have ended.",
          "For an airport-to-city journey, use an available train or bus, an authorized taxi or a pre-booked private transfer. The free airport terminal shuttle connects airport facilities. My airport sherut guide explains which shared-taxi routes have ended and what alternatives remain.",
        ],
        inlineLinks: [{ text: "airport sherut guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "holidays", title: "Taxis on Shabbat and Jewish Holidays",
        paragraphs: [
          "Licensed taxis often operate on Shabbat and Jewish holidays, when regular trains and most bus services are suspended. Availability can be lower, particularly outside central cities. Arrange important pickups in advance.",
          "Night, Shabbat and holiday prices follow the official A/B/C tariff timetable, which is explained in my fares guide. Yom Kippur requires separate planning because normal road travel is extremely limited. My airport Shabbat guide covers practical alternatives, and Israel's calendar of events helps with choosing travel dates.",
        ],
        inlineLinks: [{ text: "fares guide", to: travelGuidePaths.taxiFares }, { text: "airport Shabbat guide", to: travelGuidePaths.shabbat }, { text: "Israel's calendar of events", to: "/travel-blog/calendar-of-events/" }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "payment", title: "Payment, Tipping and Passenger Rights",
        paragraphs: [
          "Taxi fares are charged in Israeli shekels. Cash is widely accepted, while card and app payments depend on the provider. Check the method before departure, and avoid paying again in the cab for an app-paid trip.",
          "Tipping isn't required, but you can round up the fare for good service. A small round-up for particularly helpful service is your choice. Keep your receipt and ride details in case you leave something behind or need to question a charge.",
          "Drivers cannot add unofficial fees for luggage or passengers travelling within the taxi's permitted capacity. Only regulated extras may be charged. Ordinary special-taxi journeys generally use the meter, although there are specific intercity exceptions for officially listed fixed fares. Confirm the fare basis before the journey.",
        ],
        sourceIds: ["taxi-passenger-rights"],
      },
      {
        id: "special-needs", title: "Luggage, Child Seats, Groups and Accessibility",
        paragraphs: [
          "A taxi may have enough seats for your group but not enough room for everyone's luggage. Declare all passengers and bags before ordering, and request a larger vehicle when appropriate.",
          "For a child seat, tell the operator the child's age and size and confirm that the correct restraint will be provided. For wheelchair access, arrange an appropriate vehicle and boarding assistance in advance.",
          "For larger groups, special equipment or remote destinations, booking ahead is usually easier.",
        ],
        links: [{ label: "Arrange a vehicle for a planned private journey", to: "/private-driver-in-israel/" }],
      },
      {
        id: "intercity", title: "Long-Distance Taxis and Remote Destinations",
        photo: migrationPhotos["jerusalem-to-the-dead-sea"],
        paragraphs: [
          "A taxi can take you directly to a hotel or attraction, but a train or bus may be much cheaper when service is available. Compare the door-to-door journey; the getting around Israel guide explains your transport options.",
          "The Dead Sea and Ein Bokek, Mitzpe Ramon, the Golan Heights, desert nature reserves and the crossings to Jordan and Egypt may have limited taxi availability. Arrange your return taxi in advance when visiting remote destinations.",
          "Getting from Jerusalem to Bethlehem may require a change of vehicle near Checkpoint 300 (Rachel Crossing): if the crossing is open for your journey, you may need to leave your Israeli taxi, complete the pedestrian crossing with the required travel documents and take a local Palestinian taxi on the other side. Israeli-plated taxis generally cannot enter Palestinian Authority Area A without authorization. Check the current security situation, opening arrangements and your eligibility to cross before setting out; see the Jerusalem to Bethlehem guide.",
          "If you are traveling to the Dead Sea, consider reserving both directions or arranging a driver for several stops. The Jerusalem to the Dead Sea guide explains practical choices.",
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "Jerusalem to Bethlehem guide", to: travelGuidePaths.bethlehem },
          { text: "Jerusalem to the Dead Sea guide", to: travelGuidePaths.jerusalemDeadSea },
        ],
        links: [{ label: "Arrange a private driver for a longer trip", to: "/private-driver-in-israel/" }],
      },
      {
        id: "safety", title: "Taxi Safety and Common Mistakes to Avoid",
        paragraphs: [
          "Use a licensed taxi, check the driver and number plate against your booking, and avoid unsolicited rides at the airport. Save an accurate destination pin, confirm the meter or legal price basis, and check the final receipt.",
          "For a smooth journey, choose a confirmed pickup point, distinguish an app fare estimate from a fixed quote, mention oversized luggage and arrange transport back from remote destinations.",
          "You can follow your route in a map app and share trip details if traveling alone. If you leave a wallet or bag behind, contact the operator quickly with the vehicle number, date, route and ride code.",
          "If you're overcharged or have a problem with the driver, you can file a complaint with the Ministry of Transport using the official link below. Keep the receipt, vehicle registration or license number, date, route, driver or owner details and any booking messages. The taxi fares guide explains lawful meter charges and extras.",
        ],
        inlineLinks: [{ text: "taxi fares guide", to: travelGuidePaths.taxiFares }],
        externalLinks: [{ label: "File a taxi-service complaint - Ministry of Transport", href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation" }],
        highlightedLinks: [{ label: "File a taxi complaint - Ministry of Transport", href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation", context: "Use the official complaint service if you have a fare, refusal-of-service or driver-conduct issue. Keep your receipt and vehicle details." }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Choose a licensed taxi and confirm your pickup address",
      "Confirm the meter or written private-transfer terms and payment method",
      "Arrange enough seats, luggage space or a child restraint",
      "Save the driver's details and receipt",
      "Arrange your return ride for remote destinations",
    ],
    faqs: [
      { q: "Can I book a taxi without a smartphone?", a: "Yes. Hail a licensed taxi, use a taxi stand, ask your accommodation to call a dispatcher or arrange a pickup by phone." },
      { q: "Can I pay for a taxi by credit card?", a: "Card and in-app payments depend on the provider and vehicle. Confirm your preferred method when ordering or before departure; cash in shekels is widely accepted." },
      { q: "Do drivers usually speak English?", a: "English proficiency varies. Keep your destination address and map pin ready, preferably also in Hebrew." },
      { q: "Can I arrange a child seat or wheelchair-accessible taxi?", a: "Yes, through an operator that provides the right vehicle or equipment. Confirm the exact requirements and availability in advance." },
      { q: "Can I take a taxi to the Dead Sea or a remote destination?", a: "Yes. For long journeys, confirm the destination and return plan before departure. My airport and intercity guides compare taxis with other transport choices." },
      { q: "How do I report lost property or a driver complaint?", a: "Keep the taxi's licence number, receipt and booking details. Contact the operator for lost items or the Ministry of Transport for a formal complaint." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints"],
    related: ["taxiFares", "airportTaxis", "uber", "sherut", "shabbat", "israel"],
    services: [{ label: "Request a quote for a pre-booked airport transfer", to: "/airport-transfers/" }, { label: "Arrange a private driver for a day trip", to: "/private-driver-in-israel/" }],
  },

  taxiFares: {
    id: "taxiFares",
    title: "Taxi Fares in Israel: Meter Rates, Night Prices & Surcharges",
    description: "How much does a taxi cost in Israel? Compare official meter fares, night and Shabbat tariffs, booking surcharges, airport fees and transfer options.",
    intro: "Israel's taxi fares follow regulated meter rates. Here I'll explain the starting charge, how time and distance affect the total, the A/B/C tariff hours and the extra fees a driver may charge.",
    answer: "Under the April 2026 national rates, the meter starts at ₪12.46 including VAT outside Eilat. It then adds charges for both driving time and distance. Tariffs A, B and C apply at defined hours, with a higher per-kilometre rate after 10 km. The tables below show the amounts and lawful surcharges.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-24",
    photo: { src: taxiMeterPhoto, alt: "Yellow taxi roof sign on a licensed Israeli taxi" },
    facts: [
      { label: "Meter starts at", text: "₪12.46 including VAT outside Eilat" },
      { label: "Day / night", text: "Tariffs A, B and C change with the day and hour" },
      { label: "Price calculation", text: "Time + distance, with higher kilometre rates after 10 km" },
    ],
    comparison: {
      caption: "Taxi meter rates at a glance",
      headers: ["Meter charge", "Tariff A", "Tariff B", "Tariff C"],
      rows: [
        ["Starting amount", "₪12.46", "₪12.46", "₪12.46"],
        ["Per minute", "₪1.95", "₪2.34", "₪2.73"],
        ["Per kilometer — first 10 km", "₪1.95", "₪2.34", "₪2.73"],
        ["Per kilometer — after 10 km", "₪3.79", "₪4.18", "₪4.57"],
      ],
    },
    sections: [
      {
        id: "time-distance",
        title: "How the taxi meter calculates your fare",
        paragraphs: [
          "The meter adds a starting fee plus charges for both minutes and kilometres. This means traffic can increase your fare, even when the distance doesn't change.",
          "The first 10 km use the standard distance rate. After 10 km, the higher kilometre rate applies, but the per-minute charge stays the same.",
          "These rates cover ordinary metered taxi rides. Pricing for shared sherut rides and separately booked private transfers follows different arrangements. Eilat may have different consumer prices because of its VAT exemption.",
        ],
        inlineLinks: [{ text: "shared sherut rides", to: travelGuidePaths.sherut }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "tariff-hours",
        title: "When do daytime, night and Shabbat tariffs apply?",
        paragraphs: [
          "Tariff A is the lowest, B the middle and C the highest. The applicable tariff is determined by the day and local clock time in Israel.",
          "The schedule below also covers Friday evenings, Shabbat and recognized holidays. Use Israel's calendar of events for holiday dates and my airport Shabbat guide for transport alternatives.",
        ],
        inlineLinks: [
          { text: "Israel's calendar of events", to: travelGuidePaths.calendar },
          { text: "airport Shabbat guide", to: travelGuidePaths.shabbat },
        ],
        tables: [{
          caption: "Taxi tariff times — Israel local time",
          headers: ["Day", "Tariff A", "Tariff B", "Tariff C"],
          rows: [
            ["Sunday–Wednesday", "06:00–21:00", "21:01–05:59", "—"],
            ["Thursday", "06:00–21:00", "21:01–23:00", "23:01–05:59"],
            ["Friday / holiday eve", "06:00–16:00", "16:01–21:00", "21:01–05:59"],
            ["Saturday / recognized holiday", "—", "06:00–19:00", "19:01–05:59"],
          ],
          note: "Overnight tariffs continue until 05:59 the next morning.",
        }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "extras",
        title: "Taxi surcharges: booking, airports and tolls",
        paragraphs: [
          "Regulated extra charges include a dispatch fee when a taxi is ordered to collect you and an airport departure fee when a journey starts at certain airports. For the official Gett booking and pickup process at Ben Gurion Airport, see my airport taxi guide.",
          "Permitted tolls and passenger-requested waiting can add to the total. Traffic delays are reflected in the meter's time charge. Luggage and the number of passengers within the vehicle's licensed capacity carry no general extra charge.",
        ],
        tables: [{
          caption: "Common permitted surcharges (VAT included where applicable)",
          headers: ["Surcharge or fee", "Amount or rule"],
          rows: [
            ["Taxi ordered to pick you up", "₪5.78, if the regulated dispatch surcharge applies"],
            ["Leaving Ben Gurion Airport", "₪5.00"],
            ["Leaving Ramon or Haifa Airport", "About ₪1.99"],
            ["Certain toll roads and tunnels", "Specific regulated amounts or actual toll, only when applicable"],
            ["Waiting requested by the passenger", "Per hour: A ₪116.82 · B ₪140.18 · C ₪162.84; shorter periods are proportional"],
          ],
          note: "Rates are based on the April 2026 regulations. Extra charges apply only when the legal conditions are met.",
        }],
        inlineLinks: [{ text: "airport taxi guide", to: travelGuidePaths.airportTaxis }],
        sourceIds: ["taxi-fares-2026", "guide-gett"],
      },
      {
        id: "examples",
        title: "How much might a taxi ride cost? Two examples",
        paragraphs: [
          "Example 1: A 5 km ride taking 15 minutes under Tariff A costs approximately ₪51.40, excluding extra charges.",
          "Example 2: A 12 km ride taking 25 minutes under Tariff B costs approximately ₪102.59. The final 2 km use the higher distance rate, while the time charge continues throughout the ride.",
          "These are examples, not guaranteed prices. Actual fares depend on your journey and any permitted extra charges. Calculations use the official rates before final rounding, so adding displayed rounded rates may produce a small difference.",
        ],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "estimates", title: "Metered taxis, app estimates and pre-booked transfers",
        paragraphs: [
          "Taxi apps may display an estimated amount before the ride, while a metered journey is settled according to the regulated taxi meter and any permitted additions. Check the pricing terms when booking and keep the final receipt. My taxis in Israel guide explains booking methods; the Uber alternatives guide compares available apps.",
          "A separately arranged private transfer can offer a confirmed written price, vehicle type and meeting instructions. Compare the quoted inclusions, waiting time, tolls and cancellation terms. My Ben Gurion Airport taxis guide includes illustrative fares to four destinations. For a wider comparison of taxis with trains and buses, see my getting around Israel guide.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "Uber alternatives guide", to: travelGuidePaths.uber },
          { text: "Ben Gurion Airport taxis guide", to: travelGuidePaths.airportTaxis },
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
        ],
        sourceIds: ["guide-gett", "taxi-fares-2026"],
      },
      {
        id: "disputes",
        title: "Checking your fare and avoiding overcharges",
        paragraphs: [
          "Before starting, confirm that the taxi is licensed, the meter is running and any additional charges are explained. For a metered ride, the meter should be visible and used as required.",
          "Keep your receipt, trip date, route and taxi number in case you need to question a charge. You can first ask the driver or booking service to explain the charge, then use the official complaint process if necessary.",
        ],
        highlightedLinks: [{
          label: "Submit a taxi fare or service complaint",
          href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation",
          context: "The Ministry of Transport accepts complaints about taxis. Keep the receipt and identification details for your report.",
        }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Identify the A, B or C tariff for your date and time",
      "Confirm that the regulated meter is used for an ordinary taxi ride",
      "Check which booking, airport or toll additions apply",
      "Save your receipt or app ride record",
    ],
    faqs: [
      { q: "Is the taxi fare charged per passenger?", a: "An ordinary metered taxi fare covers the vehicle journey. The number of passengers within its licensed capacity does not create a general per-person surcharge." },
      { q: "Can the price in an app differ from the final meter fare?", a: "Yes. A displayed amount may be an estimate rather than a fixed-price offer. The regulated meter and legally permitted additions determine the total on a metered ride." },
      { q: "Are suitcase charges allowed?", a: "The published taxi tariff includes no general luggage fee. Confirm that the vehicle has enough space for your bags, especially for a group." },
      { q: "Why does a journey cost more on Shabbat?", a: "Tariffs B and C apply during specified hours, including Shabbat and recognized holidays. Use the timetable on this page to identify the applicable tariff." },
      { q: "Do these rates apply in Eilat?", a: "Eilat may have different consumer prices because of the VAT exemption. Check the local fare before travel." },
      { q: "What should I do if the fare looks wrong?", a: "Ask the driver or booking service to explain the meter and extra charges. Retain the receipt and taxi number for a formal Ministry of Transport complaint if necessary." },
    ],
    sourceIds: ["taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints", "guide-gett"],
    related: ["taxis", "airportTaxis", "uber", "sherut", "shabbat", "arrival"],
    services: [
      { label: "Compare pre-booked airport transfers", to: "/airport-transfers/", note: "Choose a planned airport pickup with a confirmed provider price and meeting point instead of an on-arrival metered taxi." },
      { label: "Request a private driver quote", to: "/private-driver-in-israel/", note: "Arrange a longer intercity journey, multi-stop route or group vehicle to suit your itinerary." },
      { label: "Compare car rentals in Israel", to: "/car-rental/", note: "For a multi-day itinerary with stops beyond the main cities, compare rental options and choose a pickup location that suits your route." },
      { label: "Compare trains, buses and taxis around Israel", to: travelGuidePaths.israel, note: "Find less expensive public-transport options and decide when a taxi is worth the extra cost." },
    ],
  },

  airportTaxis: {
    id: "airportTaxis",
    title: "Ben Gurion Airport Taxis: Booking, Pickup Points & Fares",
    description: "Where to get an official taxi at Ben Gurion Airport: Gett ride codes, Terminal 3 and Terminal 1 pickup, advance bookings, meter fares and payment.",
    intro: "Taking a taxi from Ben Gurion Airport is straightforward once you know where to go. I'll explain how to order an authorized taxi, which terminal exit to use, what the meter costs and when a pre-booked private transfer may suit you better.",
    answer: "For an immediate airport taxi, order through Gett or an airport self-service kiosk, save your ride code and join the official taxi queue. At Terminal 3, go to ground-floor Exit 03; at Terminal 1, use the main arrivals exit. A Gett taxi scheduled in advance at Terminal 3 uses Level 2, Exit 23. Official airport taxis charge by the regulated meter.",
    topics: ["transportation", "tips"],
    photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Yellow taxi entrance sign inside the airport terminal" },
    updatedAt: "2026-11-24",
    facts: [], // Pickup comparison already gives the relevant locations.
    comparison: {
      caption: "Where to pick up your airport taxi",
      headers: ["Type of taxi", "Pickup location", "How to board"],
      rows: [
        ["Immediate taxi · Terminal 3", "Ground floor, Exit 03", "Get a ride code from Gett or a kiosk, then join the queue"],
        ["Immediate taxi · Terminal 1", "Main arrivals exit", "Get a ride code and follow the authorized taxi queue"],
        ["Gett ride scheduled in advance · Terminal 3", "Level 2, Exit 23", "Use your scheduled booking and follow its meeting instructions"],
      ],
    },
    sections: [
      {
        id: "steps", title: "How to order an airport taxi",
        paragraphs: [
          "1. Open the Gett app or use an airport self-service kiosk. Enter your destination and create an immediate taxi order. The kiosks are useful if you would rather order without installing the app.",
          "2. Save the ride code shown on screen or sent by SMS. You will need it when the dispatcher or driver matches you with a taxi.",
          "3. Join the authorized queue at your arrival terminal and show the code when your turn comes. The code identifies your ride; taxis are assigned in the order passengers reach the queue.",
        ],
        highlightedLinks: [
          { label: "Gett - official airport taxi instructions", href: "https://www.gett.com/il/airport-en/", context: "See the three ordering steps, kiosk option and official pickup points." },
        ],
        sourceIds: ["guide-gett"],
      },
      {
        id: "terminal3", title: "Finding the taxi queue at Terminal 3",
        photo: terminalHallPhoto,
        paragraphs: [
          "After passport control, collecting your bags and passing through customs, follow the signs to the taxi queue on the ground floor at Exit 03. Have your ride code ready for the dispatcher. My Ben Gurion arrival guide covers the earlier arrival steps.",
          "The pickup at Level 2, Exit 23 is for Gett rides scheduled in advance, so use the ground-floor queue when you want an immediate taxi. Choose the official taxi line rather than accepting unsolicited rides inside the terminal.",
        ],
        inlineLinks: [{ text: "Ben Gurion arrival guide", to: travelGuidePaths.arrival }],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "terminal1", title: "Taxi pickup at Terminal 1",
        paragraphs: [
          "At Terminal 1, the official taxi queue is outside the main arrivals exit. Create your immediate ride order through Gett or an available self-service kiosk and show the code when you reach the front of the line.",
          "Your airline's flight details will tell you which terminal you are using. Check the actual arrival terminal before following the pickup instructions.",
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "scheduled", title: "Booking a Gett airport taxi in advance",
        paragraphs: [
          "Gett accepts scheduled airport taxi bookings through its app at least two hours before pickup. At Terminal 3, meet your scheduled ride on Level 2 at Exit 23, following the details in your confirmation.",
          "Include your flight number when booking. Gett says it uses flight updates to adjust the pickup time in the app. Keep your booking and driver contact details handy in case you need to communicate after landing.",
          "Scheduled Gett airport taxis also follow the regulated meter. For an agreed advance price and a separately arranged vehicle, compare a private airport transfer.",
        ],
        inlineLinks: [{ text: "private airport transfer", to: "/airport-transfers/" }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "fares", title: "Airport taxi fares and the meter",
        paragraphs: [
          "Authorized Ben Gurion Airport taxis run on the regulated meter. The fare depends on distance, driving time, the applicable A, B or C tariff and permitted extra charges. Traffic delays therefore affect the final amount.",
          "Under the temporary tariff introduced in April 2026, the standard meter starts at ₪12.46 including VAT and a ₪5 addition applies when departing Ben Gurion Airport. The table below offers daytime meter estimates based on route distance and driving time. For tariff hours, per-kilometer rates and permitted extras, see my taxi fares in Israel guide.",
          "The meter is used for the official taxi queue and scheduled Gett taxis. A separately arranged private transfer follows the written quote and terms agreed with its provider.",
        ],
        inlineLinks: [{ text: "taxi fares in Israel guide", to: travelGuidePaths.taxiFares }],
        tables: [airportTaxiEstimateTable],
        highlightedLinks: [
          { label: "Israel Ministry of Transport - official taxi tariff", href: "https://www.gov.il/BlobFolder/policy/taxi-rate-2026/he/taxi-rate-26.pdf", context: "Official fare order and regulated charging rules effective from April 2026." },
        ],
        sourceIds: ["guide-gett", "taxi-fares-2026"],
      },
      {
        id: "pay", title: "Paying for your airport taxi",
        paragraphs: [
          "Gett allows payment directly to the driver in cash or by card, and supports in-app payment for eligible orders. Choose the method when ordering and confirm it before you set off. Taxi fares are charged in Israeli shekels.",
          "Ask for a receipt and retain your ride code in case you need help with the journey or something left in the vehicle. Tipping is optional. For booking and paying for taxis elsewhere in Israel, see my taxis in Israel guide.",
        ],
        inlineLinks: [{ text: "taxis in Israel guide", to: travelGuidePaths.taxis }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "special", title: "Luggage, child seats and accessible taxis",
        paragraphs: [
          "For several large cases, a stroller or more than four passengers, arrange a taxi with enough luggage space and seats. Tell the operator what you are carrying before your pickup.",
          "At Terminal 3, ramp-equipped wheelchair-accessible taxis can be requested in the Gett app, at the terminal's self-service taxi kiosks or through the dispatcher at the official queue near Exit 03. For specific wheelchair space or boarding needs, arrange assistance in advance.",
          "If a child restraint is required, request the correct seat for your child's age and size before your journey. Airline or airport assistance inside the terminal is arranged separately from the taxi ride.",
        ],
        highlightedLinks: [
          { label: "Accessible taxis at Terminal 3 - Access Israel", href: "https://aisrael.org/wp-content/uploads/2026/02/Neg.-Terminal-A5-12_25-Eng-1.pdf", context: "English accessibility guide explaining how to request a taxi equipped with a wheelchair ramp." },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "guide-accessible-airport"],
      },
      {
        id: "weekend", title: "Airport taxis on Shabbat and holidays",
        paragraphs: [
          "Authorized taxis operate at Ben Gurion Airport 24 hours a day, including Shabbat. Waiting times can be longer when fewer drivers are available, particularly at busy arrival periods. Night, Shabbat and holiday tariff rules can also affect the meter.",
          "When train and regular bus services are limited, taxis and pre-arranged transfers may be the most practical door-to-door options. My airport Shabbat transport guide explains the alternatives, and Israel's calendar of events helps you plan around major holidays, including Yom Kippur. For older shared-taxi routes and current alternatives, see my airport sherut guide.",
        ],
        inlineLinks: [
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
          { text: "Israel's calendar of events", to: "/travel-blog/calendar-of-events/" },
          { text: "airport sherut guide", to: travelGuidePaths.sherut },
        ],
        sourceIds: ["guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "versus-transfer", title: "Official airport taxi or pre-booked private transfer?",
        paragraphs: [
          "For an ordinary arrival with manageable luggage, an authorized metered taxi is a practical choice. I recommend considering a pre-booked private transfer for a larger group, a particular vehicle, several suitcases or a long journey where you prefer the pickup and price arrangements agreed ahead of time.",
          "Private transfers are booked with their own operator and have a confirmed meeting place, vehicle class and waiting terms. Follow the meeting instructions in your booking confirmation. You can compare my private airport transfer service and request a quote. For taxi apps elsewhere in Israel, my Uber in Israel guide explains Gett, Yango and current ride-hailing options.",
        ],
        tables: [{
          caption: "Compare your airport pickup options",
          headers: ["", "Authorized airport taxi", "Pre-booked private transfer"],
          rows: [
            ["Booking", "Gett app or kiosk; advance Gett booking also available", "Arranged with the chosen operator"],
            ["Pickup", "Official taxi queue or scheduled Gett pickup point", "Meeting place in your confirmation"],
            ["Fare", "Regulated meter and permitted extras", "Agreed quotation and booking terms"],
            ["Vehicle", "Available taxi suited to your party", "Vehicle class specified in advance"],
            ["Changes", "According to Gett or taxi service rules", "According to the operator's waiting and cancellation policy"],
          ],
        }],
        inlineLinks: [{ text: "private airport transfer service", to: "/airport-transfers/" }, { text: "Uber in Israel guide", to: travelGuidePaths.uber }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "destinations", title: "Taxis from Ben Gurion Airport to popular destinations",
        paragraphs: [
          "A taxi can take you directly to your hotel or another vehicle-accessible address. The four guides below compare the full journey by taxi, train, bus and private transfer, including the final connection to your accommodation. For travel across the country, my getting around Israel guide compares transport choices more broadly.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
      },
      {
        id: "support", title: "Receipts, lost property and Gett support",
        paragraphs: [
          "For an item left in a taxi or a problem with your fare, keep the ride code, receipt, trip date and taxi registration number. Gett provides customer-service chat through its app and website. For kiosk bookings, phone *2299 using the number entered when ordering.",
          "For a formal complaint about a licensed taxi, use the Ministry of Transport complaint service. Airline baggage missing before you leave the airport is handled by the airline; my arrival guide explains that process.",
        ],
        inlineLinks: [{ text: "arrival guide", to: travelGuidePaths.arrival }],
        highlightedLinks: [
          { label: "Gett airport taxi support", href: "https://www.gett.com/il/airport-en/", context: "Find Gett chat support and the kiosk help details for your ride." },
          { label: "File a taxi complaint - Ministry of Transport", href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation", context: "Official complaint process for licensed taxi journeys." },
        ],
        sourceIds: ["guide-gett", "taxi-complaints"],
      },
    ],
    checklist: [
      "Save your destination address and actual arrival terminal",
      "For a kiosk order, use a mobile number you can receive messages on",
      "Arrange larger vehicles, child seats or accessible boarding when needed",
      "Keep your booking, preferred payment method and fare receipt",
    ],
    faqs: [
      { q: "What happens if my flight is delayed?", a: "For a scheduled Gett ride, enter your flight number so pickup timing can follow flight updates. If the change is substantial, use the contact or chat option in your booking." },
      { q: "Can I order a taxi without an Israeli mobile number?", a: "You can use an airport self-service kiosk without downloading Gett. Make sure you can receive the ride code and any service messages on the number you provide; ask the dispatcher for help if necessary." },
      { q: "Can I request a wheelchair-accessible taxi?", a: "At Terminal 3, ramp-equipped vehicles can be requested through Gett, a taxi kiosk or the official dispatcher. For specific wheelchair and boarding requirements, arrange assistance in advance." },
      { q: "What if I leave something in the taxi?", a: "Contact Gett through its customer-service chat, or call *2299 if your order was placed at a kiosk. Have your ride code, trip details and receipt ready." },
      { q: "Are the daytime fare estimates guaranteed prices?", a: "They are illustrative meter calculations using the official Tariff A rates and typical distances and driving times. The fare changes with traffic, exact address, tariff hours, tolls and other permitted charges." },
      { q: "Can I take an airport taxi directly to the Dead Sea?", a: "Yes. Authorized taxis serve destinations across Israel. Ein Bokek is a long drive, so compare the meter estimate with a confirmed private-transfer quotation before traveling." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-complaints"],
    related: ["taxis", "taxiFares", "arrival", "shabbat", "sherut", "uber"],
    services: [{ label: "Request a private airport transfer quote", to: "/airport-transfers/", note: "For a pre-arranged vehicle and pickup meeting point." }],
  },
};