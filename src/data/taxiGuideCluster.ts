/**
 * Taxi content cluster. Each guide has ONE primary search intent:
 * taxis = how to use licensed taxis; taxiFares = regulated prices;
 * airportTaxis = authorized TLV airport ordering and pickup.
 * Cross-links intentionally avoid repeating other guides in full.
 */
import type { TravelGuide } from "@/data/travelGuides";
import { consumerFareTable, taxiFaresWithVat } from "@/data/taxiFares";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { travelGuidePaths } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import airportPickup from "@/assets/home/airport-pickup.webp";
import roadTrip from "@/assets/home/road-trip.webp";
import airportHall from "@/assets/home/ben-gurion-t3.webp";

const pickup = { src: airportPickup, alt: "Illustration of a driver assisting arriving travelers with luggage" };
const airport = airportTransferPhotos["other"]!;
const cityPhoto = airportTransferPhotos["tel-aviv"]!;
const intercityPhoto = { src: roadTrip, alt: "Illustration of a vehicle traveling on a road through the Israeli landscape" };
const terminalHallPhoto = { src: airportHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };

export const taxiGuideCluster: Record<"taxis" | "taxiFares" | "airportTaxis", TravelGuide> = {
  taxis: {
    id: "taxis",
    title: "Taxis in Israel: The Complete Guide for Tourists",
    description: "How to use taxis in Israel: booking apps, licensed cabs, regulated meter fares, Ben Gurion Airport pickup, Shabbat, payment, luggage and safety.",
    intro: "Taxis are useful for door-to-door travel in Israel, especially with luggage, at night, on Shabbat or where public transport is limited. Learn how to book a licensed cab, check fares and travel with confidence.",
    answer: "You can hail a licensed taxi in a major city, find one at an official stand, order from a local dispatcher or use Gett or another available taxi app. Confirm your destination, the meter or approved fare basis, and payment method. The regulated meter charges for time and distance, with higher tariffs at some times. At Ben Gurion Airport, use the authorized Gett app or kiosk and follow the designated taxi queue.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-11",
    photo: { src: "/images/guides/taxi-in-tel-aviv.webp", alt: "Two white licensed taxis with yellow roof signs on a street in Tel Aviv" },
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
        ["Street hail or taxi stand", "Spontaneous city journeys", "Licensed vehicle, meter, payment and room for bags"],
        ["Taxi app or dispatcher", "You need a specific address and ride record", "Driver and plate, actual availability, fare basis"],
        ["Official airport taxi", "Immediate taxi after landing at TLV", "Order code and authorized queue; see the airport guide"],
        ["Pre-booked private transfer", "Planned pickup or specified vehicle", "Written quote, meeting point, waiting and cancellation terms"],
      ],
    },
    sections: [
      {
        id: "recognize", title: "How to Recognize a Licensed Taxi in Israel",
        paragraphs: [
          "Licensed Israeli taxis have identifying marks, including a roof sign with the Hebrew word monit (מונית) and a license number displayed on the vehicle. Inside the taxi, look for the identification plate showing the owner's details; you can record these if you need to make a complaint. White taxis are common, but color alone does not establish that a vehicle is licensed.",
          "If you have booked through an app, match the license plate and driver information shown in your booking. At an airport or major transport hub, follow the official taxi signage instead of accepting an unsolicited approach inside a terminal.",
          "If you plan to cross between Israel, East Jerusalem and Palestinian Authority areas, ask in advance whether the driver and vehicle are permitted to complete the entire route; availability and access can differ by area. For other transport modes, see my getting around Israel guide.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        sourceIds: ["taxi-passenger-rights"],
      },
      {
        id: "booking", title: "How to Find and Book a Taxi in Israel",
        photo: cityPhoto,
        paragraphs: [
          "In central Tel Aviv, Jerusalem, Haifa and other busy areas, you may be able to hail an available licensed taxi on the street. Tell the driver the actual address and confirm the payment method and regulated meter before departure. At peak hours, late at night or in remote places, street hailing may not be practical.",
          "Taxi stands are found near major hotels, railway stations, hospitals and shopping areas. A hotel or local dispatcher can also arrange a pickup; ask whether a regulated ordering addition applies and keep a dispatcher's phone number or your hotel address available offline.",
          "Taxi apps can display your pickup point, driver and vehicle information, and booking history. Enter a precise street address or entrance pin, verify that the driver accepts the ride, and do not assume that an estimated fare is necessarily fixed. For choosing an app, see my Uber, Gett and Yango guide.",
          "Private transfers are a different booking product: a particular vehicle, route and pickup may be agreed in advance under a written quote. Check what is included and when the arrangement becomes a confirmed reservation.",
        ],
        inlineLinks: [{ text: "Uber, Gett and Yango guide", to: travelGuidePaths.uber }],
        links: [{ label: "Private driver for a planned trip", to: "/private-driver/" }],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
      },
      {
        id: "fares", title: "How Much Do Taxis Cost in Israel?",
        paragraphs: [
          "For an ordinary licensed taxi ride, the regulated meter combines the opening amount, travel time, distance and the applicable A, B or C tariff. Traffic can increase the fare even on a short journey. An approved fixed tariff may be available for certain intercity trips under the applicable regulations.",
          "Under the regulations effective from 1 April 2026, the opening meter amount is ₪12.46 including VAT outside Eilat. Daytime Tariff A adds both ₪1.95 per minute and ₪1.95 per kilometer for the first 10 km; time and distance are charged together. Tariffs B and C are higher, and the per-kilometer rate increases after 10 km. The table below is a useful snapshot, not a route-specific quote.",
          `An app, phone or dispatcher booking may carry the regulated ₪${taxiFaresWithVat.orderedTaxi.toFixed(2)} ordering supplement. Airport departures, tolls and other permitted items may cost extra. Consult the national tariff guide for the legal time windows, full additions, price examples and any subsequent changes.`,
          "A separately contracted private transfer can instead have a confirmed written price. Check whether waiting, tolls and extra stops are included before you book.",
        ],
        tables: [{
          caption: "Key 2026 regulated meter amounts (ILS, including VAT)",
          headers: consumerFareTable.headers,
          rows: consumerFareTable.rows.slice(0, 4),
          note: "Rates effective 1 April 2026 and scheduled through March 2027 unless amended. Time and distance are charged together. Eilat may use VAT-free rates; tolls and other allowed additions are not included.",
        }],
        inlineLinks: [{ text: "national tariff guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026", "taxi-passenger-rights"],
      },
      {
        id: "apps", title: "Taxi Apps in Israel: Gett, Yango and Uber",
        paragraphs: [
          "Gett and Yango let you request licensed taxis through an app, subject to driver availability in your area. You can use the official Gett and Yango Israel rider websites linked below to learn about the services or get their apps. Set up a usable payment method before travel, check the pickup pin and keep an alternative if no driver accepts the request.",
          "Uber passenger rides are not available in Israel as of November 2026. Gett and Yango are local taxi-booking alternatives; the separate Uber guide compares their practical use, while this article covers how licensed taxis operate.",
          "For an airport pickup, the official Gett taxi procedure uses a code and a physical authorized queue; the detailed airport instructions are covered in my airport taxi guide.",
        ],
        inlineLinks: [{ text: "separate Uber guide", to: travelGuidePaths.uber }, { text: "airport taxi guide", to: travelGuidePaths.airportTaxis }],
        externalLinks: [{ label: "Gett Israel — official website and app", href: "https://www.gett.com/il/" }, { label: "Yango Israel — official rider information", href: "https://appli.taxi/rider/" }],
        highlightedLinks: [
          { label: "Gett Israel — official app and service information", href: "https://www.gett.com/il/", context: "Check how to set up the app and request a licensed taxi before your trip." },
          { label: "Yango Israel — rider information", href: "https://appli.taxi/rider/", context: "Review service details, payments and availability for your pickup location." },
        ],
        sourceIds: ["guide-gett-app", "guide-yango-israel"],
      },
      {
        id: "airport", title: "Taking a Taxi from Ben Gurion Airport",
        photo: { src: "/images/guides/airport-taxi-sign.webp", alt: "Yellow Taxi Entrance sign inside an airport terminal" },
        paragraphs: [
          "Gett operates the official authorized taxi dispatch at Ben Gurion Airport (TLV). For an immediate ride, order via the Gett app or an airport self-service kiosk, which works without installing the app. Keep the ride code and proceed to the physical taxi queue. A code does not let you skip the line.",
          "For Terminal 3 on-demand taxis, go to the ground-floor arrivals level at Exit 03. A scheduled Gett ride must be booked at least two hours before pickup and uses Level 2, Exit 23. Gett says entering your flight number lets the app update your pickup time according to flight changes. At Terminal 1, follow the signs to the main arrivals exit. Check your booking instructions before travel, since procedures can change.",
          "An authorized taxi departing Ben Gurion Airport uses the regulated meter, with an additional ₪5 airport departure charge under the April 2026 fares; this supplement is not charged merely for a trip to the airport. Gett lists cash or card payment directly to the driver, as well as supported in-app payment. A separately booked private transfer has its own confirmed price, vehicle and meeting point: do not expect your private driver at the official taxi queue.",
          "For detailed procedures, see the airport taxi guide. The Ben Gurion Airport arrival guide covers immigration, baggage and other onward-transport choices.",
          "To compare transport choices for your exact route, read my guides to getting from Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa or Ein Bokek. If you prefer to arrange a vehicle and meeting point in advance, you can request a private airport transfer quote.",
        ],
        inlineLinks: [
          { text: "airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "Ben Gurion Airport arrival guide", to: travelGuidePaths.arrival },
          { text: "Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
          { text: "request a private airport transfer quote", to: "/transfers/" },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "sherut", title: "Are Shared Sherut Taxis Available from the Airport?",
        paragraphs: [
          "A sherut (monit sherut) is a shared minibus taxi, usually operating along a fixed route. Some local shared-taxi routes still operate elsewhere in Israel; they are not the same as a private taxi you book for your own journey.",
          "There is currently no regular airport sherut to Jerusalem, Haifa or Tel Aviv. The former Nesher service to Jerusalem and Amal service to Haifa have been discontinued, although older online guides may still mention them. Use rail or a bus where available, the official taxi service or a pre-booked transfer instead.",
          "The airport's free internal terminal and parking shuttle is not a sherut to another city. The sherut guide explains the remaining shared-taxi services.",
        ],
        inlineLinks: [{ text: "sherut guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "holidays", title: "Taxis on Shabbat and Jewish Holidays",
        paragraphs: [
          "Licensed taxis can operate on Shabbat and on many Jewish holidays, even when trains and most ordinary buses stop. However, fewer drivers may be working and a taxi may be harder to find outside busy areas. Arrange time-sensitive or long-distance pickups in advance.",
          "Taxi tariffs follow fixed local clock times rather than the exact sunset. On Fridays and holiday eves, Tariff A runs until 16:00, Tariff B from 16:01 to 21:00 and Tariff C from 21:01 overnight. On Shabbat and recognized holidays, Tariff B applies from 06:00 to 19:00 and Tariff C from 19:01 overnight. See the fares guide for the remaining weekdays, full hours and rates.",
          "Yom Kippur requires special care: ordinary road travel is severely limited, and travelers should not assume normal taxi service. For airport transport on a regular Shabbat, consult the airport weekend transport guide, and check Israel's Calendar of Events when planning your trip.",
        ],
        inlineLinks: [{ text: "fares guide", to: travelGuidePaths.taxiFares }, { text: "airport weekend transport guide", to: travelGuidePaths.shabbat }, { text: "Israel's Calendar of Events", to: travelGuidePaths.calendar }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "payment", title: "Payment, Tipping and Passenger Rights",
        paragraphs: [
          "Taxi prices are in Israeli shekels (NIS/ILS). Cash is widely accepted; card and app payment depend on the individual driver or booking provider. Check the method before departure, and avoid paying again in the cab for an app-paid trip.",
          "Tipping is optional and drivers do not expect a fixed percentage. A small round-up for particularly helpful service is your choice. Always keep the receipt (kabala) and ride details in case of forgotten property or a billing problem.",
          "A driver should not add an unofficial charge just for luggage or extra passengers within the vehicle's approved capacity. Only regulated extras may be charged. Ordinary special-taxi journeys generally use the meter, although there are specific intercity exceptions for officially listed fixed fares. Confirm the fare basis before the journey.",
        ],
        sourceIds: ["taxi-passenger-rights"],
      },
      {
        id: "special-needs", title: "Luggage, Child Seats, Groups and Accessibility",
        paragraphs: [
          "The number of seats in a standard taxi does not guarantee enough boot space for several large suitcases, a stroller and four travelers. Declare all passengers and bags before ordering, and request a larger vehicle when appropriate.",
          "Do not assume that every ordinary taxi carries a suitable child restraint. Ask the operator about the exact seat required and confirm provision ahead of the journey. Wheelchair users and travelers requiring specific assistance should similarly confirm an appropriate accessible vehicle and boarding method in advance.",
          "A remote attraction, special equipment or a large party may make advance coordination more practical than ordering the next available sedan.",
        ],
        links: [{ label: "Arrange a vehicle for a planned private journey", to: "/private-driver/" }],
      },
      {
        id: "intercity", title: "Long-Distance Taxis and Remote Destinations",
        photo: migrationPhotos["jerusalem-to-the-dead-sea"],
        paragraphs: [
          "A taxi can take you directly to a hotel or attraction, but a train or bus may be much cheaper when service is available. Compare the whole door-to-door route, not only a railway-station journey; the getting around Israel guide compares the options.",
          "The Dead Sea and Ein Bokek, Mitzpe Ramon, the Golan Heights, desert nature reserves and the crossings to Jordan and Egypt may have limited taxi availability. Do not assume a return taxi will be waiting: arrange the return pickup or a planned driver in advance.",
          "Getting from Jerusalem to Bethlehem may require a change of vehicle near Checkpoint 300 (Rachel Crossing): if the crossing is open for your journey, you may need to leave your Israeli taxi, complete the pedestrian crossing with the required travel documents and take a local Palestinian taxi on the other side. Israeli-plated taxis generally cannot enter Palestinian Authority Area A without authorization. Check the current security situation, opening arrangements and your eligibility to cross before setting out; see the Jerusalem to Bethlehem guide.",
          "If you are traveling to the Dead Sea, consider reserving both directions or arranging a driver for several stops. The Jerusalem to the Dead Sea guide explains practical choices.",
        ],
        inlineLinks: [
          { text: "getting around Israel guide", to: travelGuidePaths.israel },
          { text: "Jerusalem to Bethlehem guide", to: travelGuidePaths.bethlehem },
          { text: "Jerusalem to the Dead Sea guide", to: travelGuidePaths.jerusalemDeadSea },
        ],
        links: [{ label: "Arrange a private driver for a longer trip", to: "/private-driver/" }],
      },
      {
        id: "safety", title: "Taxi Safety and Common Mistakes to Avoid",
        paragraphs: [
          "Travel with a licensed taxi, verify the driver and plate shown in the app, and ignore unsolicited approaches inside an airport terminal. Save an accurate destination pin, confirm the meter or legal price basis, and check the final receipt.",
          "Common mistakes include expecting Uber or an old airport sherut, joining the wrong Gett pickup line, assuming every taxi takes credit cards, using an estimated app price as a fixed fare, not specifying oversized luggage and leaving a remote destination without a return plan.",
          "You can follow your route in a map app and share trip details if traveling alone. If you leave a wallet or bag behind, contact the operator quickly with the vehicle number, date, route and ride code.",
          "For overcharging, refusal of service or driver conduct, use the Ministry of Transport's official taxi complaint service linked below. Keep the receipt, vehicle registration or license number, date, route, driver or owner details and any booking messages. The taxi fares guide explains lawful meter charges and extras.",
        ],
        inlineLinks: [{ text: "taxi fares guide", to: travelGuidePaths.taxiFares }],
        externalLinks: [{ label: "File a taxi-service complaint — Ministry of Transport", href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation" }],
        highlightedLinks: [{ label: "File a taxi complaint — Ministry of Transport", href: "https://www.gov.il/en/service/complaint_about_conduct_in_public_transportation", context: "Use the official complaint service if you have a fare, refusal-of-service or driver-conduct issue. Keep your receipt and vehicle details." }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Use a licensed taxi or an operator whose booking you can verify",
      "Provide an exact destination and useful pickup entrance",
      "Confirm the meter or agreed written booking terms and accepted payment",
      "Check passenger numbers, child-seat needs and luggage capacity",
      "At TLV Terminal 3: Exit 03 for immediate taxis, Level 2 Exit 23 for scheduled Gett rides",
      "Keep the receipt, ride code and support contact",
      "Plan a return ride for remote or time-sensitive destinations",
    ],
    faqs: [
      { q: "How do I find or book a taxi in Israel?", a: "In main cities, hail a licensed taxi, use an official taxi stand or an available app such as Gett, or ask a hotel or local dispatcher. Check the destination, meter and payment method." },
      { q: "How much do taxis cost in Israel?", a: "The April 2026 regulated meter begins at ₪12.46 including VAT outside Eilat, then adds time and distance using tariff A, B or C. Lawful booking and road supplements may also apply." },
      { q: "Do taxi drivers have to use the meter?", a: "Generally yes for ordinary licensed special-taxi journeys, with legally defined exceptions for approved fixed-price intercity routes. Separately arranged private transfers have their own confirmed terms." },
      { q: "Can I take an airport taxi without installing Gett?", a: "Yes. Ben Gurion Airport self-service kiosks provide a ride code. Terminal 3 immediate taxis leave from ground-floor Exit 03; advance-scheduled Gett rides use Level 2, Exit 23." },
      { q: "Are Nesher or Amal shared taxis still available from the airport?", a: "No. These former airport sherut services have ended. Check trains, buses, licensed taxis or pre-booked transfers." },
      { q: "Do taxis charge extra for suitcases or more passengers?", a: "There should not be an unofficial luggage or extra-passenger fee when everyone and their baggage fit within the vehicle's permitted capacity. Book a larger vehicle if needed." },
      { q: "Can I pay by card or do I need cash?", a: "Many app rides accept card or in-app payment, but this varies by taxi. Confirm before leaving and carry some Israeli shekels if possible." },
      { q: "Do drivers usually speak English?", a: "Language skills vary. Keep your destination written in Hebrew or saved as a precise map pin to avoid misunderstandings." },
      { q: "Can I ride on Shabbat or Jewish holidays?", a: "Many taxis operate, but availability may be reduced and higher regulated tariff periods apply. Yom Kippur requires separate planning." },
      { q: "Should I tip my taxi driver?", a: "No tip is obligatory. Rounding up for especially helpful service is optional." },
      { q: "What if I need a child seat or space for four suitcases?", a: "Ordinary taxis may lack child restraints or enough luggage space. Arrange the appropriate equipment or larger vehicle before pickup." },
      { q: "Can I take a taxi from Jerusalem to Bethlehem?", a: "You may need to change vehicles around Checkpoint 300 because driver and vehicle permissions differ. Check current crossing requirements." },
      { q: "What if I lose property or want to complain?", a: "Keep the receipt, vehicle number, trip date and ride code. Contact the taxi company or app for lost belongings, or the Ministry of Transport for a formal complaint." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints"],
    related: ["taxiFares", "airportTaxis", "uber", "sherut", "shabbat", "israel"],
    services: [{ label: "Request a quote for a pre-booked airport transfer", to: "/transfers/" }, { label: "Arrange a private driver for a day trip", to: "/private-driver/" }],
  },

  taxiFares: {
    id: "taxiFares",
    title: "Taxi Fares in Israel: Official Rates, Night Tariffs & Price Estimates",
    description: "Official Israel taxi fares: A/B/C meter rates, time and distance, price after 10 km, Shabbat hours, booking supplements and example calculations.",
    intro: "Understand what the taxi meter charges, when higher rates apply and how to check legitimate extras. These are official regulated fare components, not live quotations for individual routes.",
    answer: "From April 1, 2026, the regulated meter starting amount is approximately ₪12.46 including 18% VAT where applicable. Time and distance are charged together; for the first 10 km the A/B/C rates are about ₪1.95/₪2.34/₪2.73 per minute and per kilometer. Each kilometer beyond 10 km costs more. Additional lawful charges may apply.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-10-22",
    photo: pickup,
    reviewNote: "Official fare figures shown are current as of October 2026. The April 2026 temporary tariff schedule is specified through March 31, 2027 unless amended. Prices shown include 18% VAT where applicable and are rounded to two decimals; the official order lists base amounts before VAT.",
    facts: [
      { label: "Meter start", text: "₪12.46 with 18% VAT, where applicable" },
      { label: "A / B / C", text: "Tariff depends on day and hour; time AND distance are charged" },
      { label: "Over 10 km", text: "A higher rate applies to the distance beyond 10 km" },
    ],
    nextSteps: [{ label: "Using licensed taxis: full guide", to: travelGuidePaths.taxis }, { label: "Airport taxi ordering and pickup", to: travelGuidePaths.airportTaxis }, { label: "Holiday calendar", to: travelGuidePaths.calendar }],
    comparison: {
      caption: "Official regulated taxi meter rates — effective April 2026 (₪, including 18% VAT where applicable)",
      headers: ["Meter component", "Tariff A", "Tariff B", "Tariff C"],
      rows: [
        ["Starting amount", "₪12.46", "₪12.46", "₪12.46"],
        ["Per minute", "₪1.95", "₪2.34", "₪2.73"],
        ["Per kilometer — first 10 km", "₪1.95", "₪2.34", "₪2.73"],
        ["Per kilometer — after 10 km", "₪3.79", "₪4.18", "₪4.57"],
      ],
    },
    sections: [
      {
        id: "scope", title: "Which Taxi Fares Does This Guide Cover?",
        paragraphs: [
          "The price controls discussed here apply to ordinary metered special taxi journeys, not shared taxi lines or separately contracted private transport services. Fares are billed in Israeli shekels (ILS/NIS), and a taximeter is known locally as a moneh (מונה). The Sherut in Israel guide covers shared-taxi services separately.",
          "The government fare order dated March 30, 2026 introduced an interim schedule effective April 1, 2026. It is expressly specified through March 31, 2027 unless amended. Always check for a later order before using this article for future travel.",
          "The government tables state pre-VAT amounts. To help most tourists, the leading comparison above displays consumer figures including 18% VAT where it applies. Eilat has separate VAT rules; do not assume the same tax treatment applies to every service involving Eilat.",
        ],
        inlineLinks: [{ text: "Sherut in Israel guide", to: travelGuidePaths.sherut }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "time-distance", title: "How the Meter Calculates the Price",
        photo: intercityPhoto,
        paragraphs: [
          "The taximeter combines a starting amount, an accumulated time charge and an accumulated distance charge; it does not choose the higher of the last two. Traffic jams may therefore increase the final fare without changing the route length.",
          "For the first 10 km, the time and per-kilometer amounts are the same within each tariff: A ₪1.95, B ₪2.34 and C ₪2.73 with 18% VAT. After 10 km, the distance rate rises to approximately ₪3.79, ₪4.18 and ₪4.57 per extra kilometer. Do not add this higher full per-kilometer rate again on top of the original distance rate.",
          "A practical estimate is: initial meter amount + (minutes × tariff-minute amount) + (first 10 km × ordinary kilometer amount) + (kilometers beyond 10 × higher kilometer amount) + any qualifying extras. Meter rounding and exact operating conditions can affect the amount payable.",
        ],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "tariff-hours", title: "When Do Tariffs A, B and C Apply?",
        paragraphs: [
          "The applicable rate depends on the legal day-and-time schedule, not merely whether it looks dark outside. Periods that continue overnight end the following morning. A holiday-eve or legally recognized rest-day rule can take precedence over the ordinary weekday pattern.",
          "The schedule is based on the government's tariff-hours framework. Not every cultural celebration or intermediate festival day automatically qualifies as a recognized rest day. Check the particular holiday and any amended regulations.",
        ],
        tables: [{
          caption: "Taxi tariff periods — local Israel time",
          headers: ["Day", "Tariff A", "Tariff B", "Tariff C"],
          rows: [
            ["Sunday–Wednesday", "06:00–21:00", "21:00–06:00", "—"],
            ["Thursday", "06:00–21:00", "21:00–23:00", "23:00–06:00"],
            ["Friday / holiday eve", "06:00–16:00", "16:00–21:00", "21:00–06:00"],
            ["Saturday / recognized rest-day holiday", "—", "06:00–19:00", "19:00–06:00"],
          ],
          note: "Times at a boundary follow the official meter tariff transition. Overnight intervals end the following morning.",
        }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "examples", title: "Two Worked Taxi Fare Examples",
        photo: cityPhoto,
        paragraphs: [
          "Example 1: a hypothetical 5 km daytime ride lasting 15 minutes under Tariff A, excluding dispatch, tolls and other additions. Using the official PRE-VAT figures: starting ₪10.56 + distance (5 × ₪1.65 = ₪8.25) + time (15 × ₪1.65 = ₪24.75) = ₪43.56. With 18% VAT, the estimated total is ₪51.40.",
          "Example 2: a hypothetical 12 km ride lasting 25 minutes under Tariff B. Starting ₪10.56 + first 10 km (10 × ₪1.98 = ₪19.80) + 2 km beyond 10 km (2 × ₪3.54 = ₪7.08) + 25 minutes (25 × ₪1.98 = ₪49.50) = ₪86.94 before VAT, or approximately ₪102.59 with 18% VAT.",
          "These are mathematical illustrations, not prices for a specific route. An actual journey may include legally permitted additions, different traffic and timing, or tariff transitions.",
        ],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "extras", title: "Booking Charges, Airport Supplements and Toll Roads",
        paragraphs: [
          "Ordering a taxi to collect you can add the regulated dispatch supplement of ₪4.90 before VAT, or approximately ₪5.78 including 18% VAT where it applies. This is distinct from the ordinary starting fare. The official meter order also regulates specified airport departures, certain toll-road journeys and other additions in defined circumstances.",
          "Do not treat a toll or airport addition as automatically applicable to every taxi trip. Check the exact trip conditions and whether you requested the route. For an airport arrival, the authorized Gett taxi remains metered; its order code is not a fixed-price quote. The official airport taxi guide explains the pickup process.",
          "Passenger waiting that qualifies for a separate waiting charge should not be confused with being stopped in normal traffic, which is reflected in the ordinary meter time component.",
        ],
        tables: [{
          caption: "Regulated fare additions — April 2026 rates, including 18% VAT where applicable",
          headers: ["Charge", "Amount / method"],
          rows: [
            ["Taxi ordered to your address", "₪5.78, when the regulated dispatch addition applies"],
            ["Ben Gurion Airport departure", "₪5.00, when the regulated airport departure supplement applies"],
            ["Ramon or Haifa Airport departure", "₪1.99, when the regulated supplement applies"],
            ["Highway 6 (excluding the northern Section 18)", "₪20.00, subject to the specified route and passenger-request conditions"],
            ["Highway 6 northern Section 18", "₪7.74, when the specific section surcharge applies"],
            ["Carmel Tunnels, one / two sections", "₪11.82 / ₪23.64 under the fare-order conditions"],
            ["Fast Lane toll", "Actual displayed toll when chargeable under the rules"],
            ["Separate passenger waiting — per hour", "A ₪116.82 / B ₪140.18 / C ₪162.84; where chargeable, proportional for shorter periods"],
          ],
          note: "Only the order's listed legally permitted additions may be charged. VAT and applicability can vary by transaction.",
        }],
        inlineLinks: [{ text: "official airport taxi guide", to: travelGuidePaths.airportTaxis }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "holidays", title: "Shabbat, Holidays and Late-Night Taxi Prices",
        paragraphs: [
          "Shabbat and legally recognized holidays fall into designated higher tariff periods. The price may rise even for a journey of identical distance and duration. Taxi availability and longer waiting times are separate from the regulated fare.",
          "My Israel events calendar helps you identify dates on which roads, attractions and public transport may change, but you must still check whether a specific date legally triggers holiday taxi tariffs. Yom Kippur needs exceptional advance planning. For the airport-specific options, read my airport Shabbat transport guide.",
        ],
        inlineLinks: [{ text: "Israel events calendar", to: travelGuidePaths.calendar }, { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "estimates", title: "Estimates, App Prices and Private Transfer Quotes",
        paragraphs: [
          "An app may show an estimate to help you budget. It is not necessarily the final regulated meter amount; read the actual service terms. A licensed taxi booked through an app can still be metered, including at Ben Gurion Airport. The Uber, Gett and Yango guide compares app choices.",
          "A private transfer arranged separately for a particular passenger group can have a written total price and specific conditions. A quote should identify vehicle type, meeting point, permitted waiting, tolls, luggage and cancellation terms. It is a different service, not a guarantee that a metered taxi will charge the quoted amount.",
          "For an introduction to licensed taxi booking, see the taxis in Israel guide. For specific airport-to-city alternatives, consult the destination-specific journey comparisons rather than treating the national meter guide as a guaranteed route-price list.",
        ],
        inlineLinks: [{ text: "Uber, Gett and Yango guide", to: travelGuidePaths.uber }, { text: "taxis in Israel guide", to: travelGuidePaths.taxis }],
        links: [{ label: "Private airport transportation", to: "/transfers/" }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "disputes", title: "How to Check a Fare and Report a Problem",
        paragraphs: [
          "Check that the meter runs for the whole ordinary taxi journey and that permitted additions reflect the service used. Keep your receipt, booking confirmation and, if possible, the taxi registration and journey time.",
          "If a charge seems incorrect, ask the operator for an explanation, then use the Ministry of Transport's public transport complaint service when appropriate. Provide the supporting records and follow the official submission deadlines. For general passenger safety and booking rights, see the taxis in Israel guide.",
        ],
        inlineLinks: [{ text: "taxis in Israel guide", to: travelGuidePaths.taxis }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Check the effective dates of the applicable taxi fare order",
      "Find the correct A/B/C time period",
      "Include the initial amount AND both time and distance charges",
      "Apply the higher rate only to kilometers beyond the first 10",
      "Add a dispatch, waiting or toll supplement only when legally applicable",
      "Confirm whether VAT applies to the actual transaction",
      "Keep the receipt and app booking reference",
    ],
    faqs: [
      { q: "What is the regulated taxi meter starting fare in Israel?", a: "Under the tariff effective from April 2026, the regulated meter begins at ₪10.56 before VAT, approximately ₪12.46 including 18% VAT where it applies. That is a starting component, not the complete cost of a ride." },
      { q: "Does the meter charge by time or distance?", a: "Both accumulate during the ride, along with the starting amount and permitted additions." },
      { q: "What changes after 10 kilometers?", a: "The per-kilometer distance rate increases only for kilometers beyond the first 10. The regular per-minute charge continues." },
      { q: "Why is the same route more expensive at night?", a: "The legally assigned tariff can change from A to B or C; traffic time and legitimate additions can also differ." },
      { q: "Are taxi fares higher on Shabbat?", a: "The tariff schedule assigns designated higher rates to Saturday and recognized rest-day holidays. Use the published hours table for the relevant day." },
      { q: "Does traffic increase the final fare?", a: "Generally yes, because elapsed travel time contributes to the metered price." },
      { q: "Does booking a taxi cost extra?", a: "A regulated dispatch supplement may apply if a taxi is ordered to collect you. Confirm how your booking is priced." },
      { q: "Is the taxi price per person?", a: "An ordinary licensed taxi meter prices the vehicle journey within its approved passenger capacity, rather than multiplying by each passenger." },
      { q: "Are airport taxi fares fixed?", a: "The authorized ordinary Gett airport taxis use the regulated meter; do not confuse them with separately quoted private transfers." },
      { q: "Are tourist taxi fares different?", a: "The regulated meter tariff does not set a separate tourist price. The legal fare and actual trip conditions apply." },
      { q: "When do these prices expire?", a: "The 2026 order specifies its temporary price schedule through March 31, 2027 unless amended earlier. Recheck the official order for later dates." },
    ],
    sourceIds: ["taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints"],
    related: ["taxis", "airportTaxis", "shabbat", "uber"],
    services: [{ label: "Compare separately booked airport transfers", to: "/transfers/" }],
  },

  airportTaxis: {
    id: "airportTaxis",
    title: "Ben Gurion Airport Taxis: Booking, Pickup Points & Fares",
    description: "Official Ben Gurion Airport taxi guide: Gett app or kiosk, ride code, Terminal 3 Exit 03, scheduled Exit 23, Terminal 1 pickup, meter and payments.",
    intro: "Arriving at TLV? The authorized taxi system has a ride-code process and different pickup points for immediate and scheduled rides. Follow the instructions for your booking type, not a generic airport taxi pin.",
    answer: "For an immediate official taxi, use Gett or an airport self-service kiosk, save the ride code and join the authorized physical queue. Terminal 3 on-demand taxis use ground-floor Exit 03; Terminal 1 uses its main exit. Terminal 3 Gett rides scheduled in advance use Level 2, Exit 23. Authorized airport taxis charge by regulated meter.",
    topics: ["transportation", "tips"],
    photo: airport,
    updatedAt: "2026-10-22",
    facts: [
      { label: "On-demand · T3", text: "Ground floor, Exit 03 — Gett code and physical queue" },
      { label: "Scheduled · T3", text: "Level 2, Exit 23 — follow your Gett confirmation" },
      { label: "On-demand · T1", text: "Arrivals main exit — authorized taxi pickup" },
    ],
    nextSteps: [{ label: "Official taxi meter rates", to: travelGuidePaths.taxiFares }, { label: "Airport arrival process", to: travelGuidePaths.arrival }, { label: "Shabbat airport transport", to: travelGuidePaths.shabbat }],
    comparison: {
      caption: "Airport taxi pickup points — check your booking type",
      headers: ["Booking", "Where to go", "What to bring"],
      rows: [
        ["Immediate taxi · Terminal 3", "Ground floor, Exit 03", "Gett app or kiosk ride code; queue in person"],
        ["Immediate taxi · Terminal 1", "Main arrivals exit", "Gett app or kiosk ride code; queue in person"],
        ["Gett ride scheduled in advance · Terminal 3", "Level 2, Exit 23", "Scheduled booking details and flight number"],
      ],
    },
    sections: [
      {
        id: "steps", title: "How to Order an Immediate Official Airport Taxi",
        photo: pickup,
        paragraphs: [
          "Step 1 — Create an order using the Gett app or one of the airport's self-service kiosks. Enter the destination and follow the service instructions. The kiosk lets you order without installing Gett on your phone.",
          "Step 2 — Receive the ride code. Save it or retain the SMS so that the driver and dispatcher can identify your journey and you can refer to it if support is needed later.",
          "Step 3 — Go to the taxi line for the correct terminal. When your turn comes, show the code to the dispatcher or driver and begin your journey. The ride code does NOT provide priority or allow you to skip the physical queue. The order of service is determined by arrival at the line.",
        ],
        sourceIds: ["guide-gett"],
      },
      {
        id: "terminal3", title: "Terminal 3: Exit 03 for Immediate Taxis",
        photo: terminalHallPhoto,
        paragraphs: [
          "After passport control, baggage collection and customs, follow signs for the authorized taxi queue at Terminal 3's ground floor, Exit 03. Keep the Gett ride code ready before joining the line. My airport arrival guide explains passport control, baggage and customs before reaching this point.",
          "Do not mistake the scheduled-ride pickup point on Level 2 for the on-demand queue on the ground floor. These are different services with different meeting instructions.",
          "Ignore unsolicited approaches inside the terminal when they cannot be matched to a confirmed service. The dispatcher at the authorized taxi line can help you find the next vehicle.",
        ],
        inlineLinks: [{ text: "airport arrival guide", to: travelGuidePaths.arrival }],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "terminal1", title: "Terminal 1: The Main Arrivals Exit",
        paragraphs: [
          "At Terminal 1, the authorized on-demand taxi line is at the main arrivals exit. Obtain your ride code using Gett or an available self-service station and follow the local taxi queue instructions.",
          "Terminal assignment depends on the actual flight and can change. Check your airline or airport flight information rather than relying on a general statement about all international or domestic flights.",
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "scheduled", title: "Booking a Scheduled Gett Airport Taxi",
        paragraphs: [
          "Gett permits advance scheduling through its app at least two hours before the requested pickup time. Terminal 3 scheduled Gett pickups use Level 2, Exit 23, not the ground-floor on-demand line.",
          "When creating the scheduled booking, enter your flight number. Gett states that the app can update the pickup timing according to flight updates. Check the actual confirmation, communication and support options if your flight changes.",
          "A scheduled Gett taxi should not be assumed to be a fixed-price transfer. Gett's authorized airport taxi rules specify the regulated meter, subject to the service conditions.",
        ],
        sourceIds: ["guide-gett"],
      },
      {
        id: "fares", title: "How Are Official Ben Gurion Airport Taxi Fares Calculated?",
        paragraphs: [
          "Gett and the airport authority describe authorized airport taxi journeys as regulated meter rides. Fare components include the starting amount, time, distance and legally permitted additions; congestion and the applicable A/B/C tariff affect the result.",
          "A regulated ₪5 airport departure supplement may apply to an authorized ride leaving Ben Gurion Airport. This page intentionally avoids duplicating the national price tables or claiming a universal fixed fare to a destination.",
          "For exact 2026 tariff components, evening and Shabbat hours, and worked estimates, visit the dedicated national taxi fares guide.",
        ],
        inlineLinks: [{ text: "dedicated national taxi fares guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["guide-gett", "taxi-fares-2026"],
      },
      {
        id: "pay", title: "Can You Pay by Card or Cash?",
        paragraphs: [
          "Gett's airport information says you may pay the driver directly in cash or by card, and app payment can also be used when supported by your order. Confirm your selected method with the driver before departure and avoid paying twice.",
          "The regulated taxi fare is in Israeli shekels. Overseas card providers may apply their own currency conversion charges. Keep the taxi receipt and ride code for assistance or lost property.",
          "Tipping is optional and is not a compulsory percentage.",
        ],
        sourceIds: ["guide-gett"],
      },
      {
        id: "special", title: "Luggage, Child Seats and Accessible Vehicles",
        paragraphs: [
          "A standard taxi may not fit four passengers and four large cases, even if it has enough passenger seats. Explain the size and quantity of luggage before boarding and ask the dispatcher or operator about a suitable vehicle.",
          "If you require a child restraint, wheelchair access or a particular boarding arrangement, confirm this ahead rather than assuming the next ordinary sedan can accommodate the request.",
          "Accessibility arrangements and suitable vehicle availability depend on the specific requirement and travel time. Gett or the airport dispatcher can advise on current options; consult official airport accessibility information for assistance within the terminal.",
        ],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "weekend", title: "Are Airport Taxis Available on Shabbat and Holidays?",
        paragraphs: [
          "The airport authority publishes the authorized taxi service as available around the clock, but a 24-hour operation is not a promise of no waiting. Vehicle availability can fluctuate at busy times and on holidays.",
          "For arriving passengers during Shabbat, taxis are one option when much scheduled public transport is suspended. The dedicated Shabbat guide compares other possible transport arrangements and advises checking the exact travel date.",
          "Jewish holidays, national observances and special dates can affect schedules and travel planning. My Israel's Calendar of Events helps you identify those dates; Yom Kippur deserves special advance caution.",
        ],
        inlineLinks: [{ text: "dedicated Shabbat guide", to: travelGuidePaths.shabbat }, { text: "Israel's Calendar of Events", to: travelGuidePaths.calendar }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "versus-transfer", title: "Official Airport Taxi or a Private Transfer?",
        paragraphs: [
          "The ordinary authorized airport taxi is requested through the airport's Gett system and charged by the regulated meter. A separately pre-booked private transfer has its own confirmed vehicle, meeting instructions, agreed price and waiting/cancellation rules.",
          "For a family with numerous bags, a group, a specific vehicle or an important long-distance arrival, you may prefer to request a private transfer quote ahead of time. This is not the same as booking a Gett queue code.",
          "If you choose a private transfer, read the actual operator confirmation to find the pickup point. Do not stand in the authorized airport taxi queue expecting your separate driver to appear there.",
        ],
        tables: [{
          caption: "Airport transport service types",
          headers: ["Feature", "Official Gett airport taxi", "Separately arranged private transfer"],
          rows: [
            ["Booking", "Gett app/kiosk or scheduled Gett app ride", "Confirmed with the operator"],
            ["Pickup", "Authorized queue or scheduled Gett location", "Meeting point stated in confirmation"],
            ["Price", "Regulated taxi meter", "Agreed written quotation and terms"],
            ["Vehicle", "Suitable taxi subject to availability", "Vehicle class specified in booking"],
            ["Waiting and changes", "According to the taxi service rules", "According to the confirmed transfer terms"],
          ],
        }],
        inlineLinks: [{ text: "private transfer quote", to: "/transfers/" }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "destinations", title: "Taxis to Tel Aviv, Jerusalem, Haifa and the Dead Sea",
        paragraphs: [
          "A taxi provides a direct trip to an accessible address, but whether it beats a train, bus or pre-booked vehicle depends on destination, luggage, travel date and final-mile transport. For example, the fastest rail ride to a station is not necessarily the shortest journey to your hotel.",
          "The following destination-specific guides compare the actual transport choices and their limitations. This airport-taxi guide does not reproduce their route comparisons or quote fixed meter prices.",
        ],
        links: [
          { label: "From Ben Gurion Airport to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
          { label: "From Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
          { label: "From Ben Gurion Airport to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
          { label: "From Ben Gurion Airport to Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
        ],
      },
      {
        id: "support", title: "Lost Property, Receipts and Gett Support",
        paragraphs: [
          "Keep your ride code, booking details, fare receipt, driver or plate number and travel time. These help Gett or the operator identify a particular journey if luggage or personal property was left in the vehicle.",
          "Gett publishes support through its app and website and lists the short number *2299 for assistance following an order made at a self-service kiosk. For a formal complaint about a licensed taxi service, the Ministry of Transport also offers an official process. For airline baggage problems before leaving the terminal, see my airport arrival and baggage guide.",
        ],
        inlineLinks: [{ text: "airport arrival and baggage guide", to: travelGuidePaths.arrival }],
        sourceIds: ["guide-gett", "taxi-complaints"],
      },
    ],
    checklist: [
      "Check the correct arrival terminal",
      "Choose immediate taxi or advance-scheduled Gett ride",
      "Get and save a ride code for an immediate taxi",
      "Remember the code does not bypass the physical taxi line",
      "Terminal 3 immediate: ground-floor Exit 03; scheduled: Level 2 Exit 23",
      "Terminal 1 immediate: main arrivals exit",
      "Confirm destination, payment and luggage or special needs",
      "Keep the fare receipt and support contact",
    ],
    faqs: [
      { q: "Where is the official taxi queue at Terminal 3?", a: "For an immediate taxi, use the ground floor at Exit 03. A Gett ride scheduled ahead uses Level 2, Exit 23 at Terminal 3." },
      { q: "Do I need the Gett app to take an airport taxi?", a: "No. Self-service kiosks allow passengers to create an immediate taxi order and receive a ride code." },
      { q: "Does my ride code let me skip the taxi line?", a: "No. For an on-demand ride, service is based on arrival at the physical authorized taxi queue." },
      { q: "Where are taxis collected at Terminal 1?", a: "At the main arrivals exit. Follow the taxi signage and Gett code/queue procedure." },
      { q: "Can I pre-book a Gett airport taxi?", a: "Gett says scheduled airport rides can be arranged through the app at least two hours ahead. Terminal 3 scheduled pickup is at Level 2, Exit 23." },
      { q: "What if my flight is delayed?", a: "Gett says adding your flight number to a scheduled ride allows pickup timing updates in the app. Review your actual booking and contact support if necessary." },
      { q: "Are authorized airport taxis fixed price?", a: "No general fixed price should be assumed. Official authorized airport taxis use the regulated taximeter, with lawful charges." },
      { q: "Can I pay by credit card?", a: "Gett lists cash or card payment to the driver and supported in-app payment. Confirm the method for your booking." },
      { q: "Are taxis available from TLV on Shabbat?", a: "The airport taxi service is published as operating around the clock, but availability and waiting can vary. Read the dedicated Shabbat airport transport guide." },
      { q: "Can I arrange a wheelchair-accessible vehicle or child seat?", a: "Contact Gett or the airport dispatcher ahead about specific vehicle and equipment requirements; do not assume an ordinary taxi has them." },
      { q: "Is a pre-booked private transfer the same as a Gett airport taxi?", a: "No. A separate operator's private transfer follows its own confirmed meeting point, vehicle and quoted terms; the official airport taxi uses the Gett system and regulated meter." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-complaints"],
    related: ["taxis", "taxiFares", "arrival", "shabbat", "sherut", "uber"],
    services: [{ label: "See private airport transfer options", to: "/transfers/" }],
  },
};