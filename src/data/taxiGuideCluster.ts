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
import roadTrip from "@/assets/home/road-trip.webp";
import airportHall from "@/assets/home/ben-gurion-t3.webp";

const airport = airportTransferPhotos["other"]!;
const cityPhoto = airportTransferPhotos["tel-aviv"]!;
const intercityPhoto = { src: roadTrip, alt: "Illustration of a vehicle traveling on a road through the Israeli landscape" };
const terminalHallPhoto = { src: airportHall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };

export const taxiGuideCluster: Record<"taxis" | "taxiFares" | "airportTaxis", TravelGuide> = {
  taxis: {
    id: "taxis",
    title: "Taxis in Israel: The Complete Guide for Tourists",
    description: "How to use taxis in Israel: booking apps, licensed cabs, regulated meter fares, Ben Gurion Airport pickup, Shabbat, payment, luggage and safety.",
    intro: "Taxis are a convenient way to travel in Israel, especially with luggage, late at night or during Shabbat. Here's how to find a licensed taxi, book through an app, understand fares and avoid common problems.",
    answer: "You can hail a licensed taxi, use a taxi stand, ask your hotel to call one or book through an app such as Gett or Yango. Before starting, confirm your destination, how the fare will be calculated and how you can pay. Metered fares depend on distance, travel time and the applicable day or night tariff. At Ben Gurion Airport, order an official taxi through Gett or an airport kiosk, then join the designated taxi queue.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-11",
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
          "Licensed taxis in Israel usually have a roof sign marked monit (מונית) and an identifying licence number. Look for the taxi identification details inside the vehicle. Keep them if you need to report a problem. Most taxis are white, but colour alone doesn't prove a vehicle is licensed.",
          "If you have booked through an app, match the license plate and driver information shown in your booking. At an airport or major transport hub, follow the official taxi signage instead of accepting an unsolicited approach inside a terminal.",
          "For journeys involving the West Bank, confirm in advance that the driver and vehicle are allowed to complete your route. Entry and vehicle restrictions vary by area. For other transport modes, see my getting around Israel guide.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
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
        links: [{ label: "Private driver for a planned trip", to: "/private-driver/" }],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
      },
      {
        id: "fares", title: "How Much Do Taxis Cost in Israel?",
        paragraphs: [
          "An ordinary taxi meter calculates the fare using a starting charge, distance, travel time and the applicable tariff. Heavy traffic can increase the fare, even for a short trip. Some intercity journeys have legally approved fixed-fare options. Confirm which pricing method applies before travelling.",
          "Under the regulations effective from 1 April 2026, the opening meter amount is ₪12.46 including VAT outside Eilat. Daytime Tariff A adds both ₪1.95 per minute and ₪1.95 per kilometer for the first 10 km; time and distance are charged together. Tariffs B and C are higher, and the per-kilometer rate increases after 10 km. These are regulated meter rates, not fixed prices for individual routes.",
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
          "Gett and Yango let you book licensed taxis in supported areas, depending on driver availability. You can use the official Gett and Yango Israel rider websites linked below to learn about the services or get their apps. Set up your payment method, check the pickup location and have a backup option if no driver accepts your request.",
          "Uber passenger rides are not currently available in Israel. Gett and Yango are local taxi-booking alternatives; the separate Uber guide compares their practical use, while this article covers how licensed taxis operate.",
          "At Ben Gurion Airport, Gett uses a ride code and an official taxi queue. See my airport taxi guide for pickup instructions.",
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
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Yellow Taxi Entrance sign inside an airport terminal" },
        paragraphs: [
          "Gett operates the official airport taxi-ordering service at Ben Gurion Airport. For an immediate taxi, use Gett or an airport kiosk to get a ride code, then join the official taxi queue. You don't need the app to use a kiosk, and the code doesn't let you skip the queue.",
          "For an immediate taxi at Terminal 3, go to ground-floor Exit 03. A scheduled Gett ride must be booked at least two hours before pickup and uses Level 2, Exit 23. If you book in advance, enter your flight number so Gett can adjust the pickup time when your flight changes. At Terminal 1, follow the signs to the main arrivals exit. Check your booking instructions before travel, since procedures can change.",
          "Official airport taxis use the regulated meter. A permitted airport departure fee applies to rides leaving Ben Gurion Airport, not to rides arriving there. Gett lists cash or card payment directly to the driver, as well as supported in-app payment. A private transfer has its own meeting point and booking terms. Follow your driver's instructions rather than joining the official taxi queue.",
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
          { text: "request a private airport transfer quote", to: "/airport-transfers/" },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "sherut", title: "Are Shared Sherut Taxis Available from the Airport?",
        paragraphs: [
          "A sherut is a shared taxi or minibus that follows a set route. Some local shared-taxi routes still operate elsewhere in Israel; they are not the same as a private taxi you book for your own journey.",
          "There is currently no regular airport sherut to Jerusalem, Haifa or Tel Aviv. Don't rely on older guides that still list the former airport sherut services. Use rail or a bus where available, the official taxi service or a pre-booked transfer instead.",
          "The airport's free internal terminal and parking shuttle is not a sherut to another city. The sherut guide explains the remaining shared-taxi services.",
        ],
        inlineLinks: [{ text: "sherut guide", to: travelGuidePaths.sherut }],
        sourceIds: ["guide-iaa"],
      },
      {
        id: "holidays", title: "Taxis on Shabbat and Jewish Holidays",
        paragraphs: [
          "Licensed taxis can operate on Shabbat and on many Jewish holidays, even when trains and most ordinary buses stop. However, fewer drivers may be working and a taxi may be harder to find outside busy areas. Arrange time-sensitive or long-distance pickups in advance.",
          "Taxi tariffs change according to set hours, not the exact time of sunset. On Fridays and holiday eves, Tariff A runs until 16:00, Tariff B from 16:01 to 21:00 and Tariff C from 21:01 overnight. On Shabbat and recognized holidays, Tariff B applies from 06:00 to 19:00 and Tariff C from 19:01 overnight. See the fares guide for the remaining weekdays, full hours and rates.",
          "Travel during Yom Kippur is very different from an ordinary Shabbat. Roads are largely empty, and you should not expect normal taxi availability. For airport transport on a regular Shabbat, consult the airport weekend transport guide, and check Israel's Calendar of Events when planning your trip.",
        ],
        inlineLinks: [{ text: "fares guide", to: travelGuidePaths.taxiFares }, { text: "airport weekend transport guide", to: travelGuidePaths.shabbat }, { text: "Israel's Calendar of Events", to: travelGuidePaths.calendar }],
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
          "Not every taxi has a child seat. Arrange the right seat before travelling. Ask the operator about the exact seat required and confirm provision ahead of the journey. If you need a wheelchair-accessible taxi, confirm the vehicle and boarding arrangements in advance.",
          "For larger groups, special equipment or remote destinations, booking ahead is usually easier.",
        ],
        links: [{ label: "Arrange a vehicle for a planned private journey", to: "/private-driver/" }],
      },
      {
        id: "intercity", title: "Long-Distance Taxis and Remote Destinations",
        photo: migrationPhotos["jerusalem-to-the-dead-sea"],
        paragraphs: [
          "A taxi can take you directly to a hotel or attraction, but a train or bus may be much cheaper when service is available. Compare the whole door-to-door route, not only a railway-station journey; the getting around Israel guide compares the options.",
          "The Dead Sea and Ein Bokek, Mitzpe Ramon, the Golan Heights, desert nature reserves and the crossings to Jordan and Egypt may have limited taxi availability. For remote destinations, arrange your return journey in advance rather than relying on finding another taxi.",
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
          "If you're overcharged or have a problem with the driver, you can file a complaint with the Ministry of Transport using the official link below. Keep the receipt, vehicle registration or license number, date, route, driver or owner details and any booking messages. The taxi fares guide explains lawful meter charges and extras.",
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
    services: [{ label: "Request a quote for a pre-booked airport transfer", to: "/airport-transfers/" }, { label: "Arrange a private driver for a day trip", to: "/private-driver/" }],
  },

  taxiFares: {
    id: "taxiFares",
    title: "Taxi Fares in Israel: Meter Rates, Night Prices & Surcharges",
    description: "How much does a taxi cost in Israel? Compare official meter fares, night and Shabbat tariffs, booking surcharges, airport fees and transfer options.",
    intro: "Taxi prices in Israel are regulated, but the final fare depends on distance, travel time and when you ride. Here's how the meter works, when higher tariffs apply and which extra charges are permitted.",
    answer: "Under the current published rates, a taxi meter starts at ₪12.46 outside Eilat. The fare then increases with both time and distance. Tariffs A, B and C apply at different hours, and longer trips have a higher rate per kilometre after 10 km. Permitted extra charges may also apply.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-13",
    photo: { src: "/images/travel-blog/taxi-in-tel-aviv.webp", alt: "Licensed white taxis with yellow roof signs on a street in Tel Aviv" },
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
          "These rates apply to ordinary metered taxis, not shared sherut rides or separately priced private transfers. Taxi fares in Eilat may differ because of the city's VAT exemption.",
        ],
        inlineLinks: [{ text: "shared sherut services", to: travelGuidePaths.sherut }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "tariff-hours",
        title: "When do daytime, night and Shabbat tariffs apply?",
        paragraphs: [
          "Tariff A is the cheapest, followed by B and then C. Higher fares apply at specific hours, not simply after sunset.",
          "Higher tariffs also apply during Shabbat and certain holidays, according to the hours below. Use my Israel holiday calendar to check dates, and the airport Shabbat guide to compare transport choices when trains and regular buses may be unavailable.",
        ],
        inlineLinks: [
          { text: "Israel holiday calendar", to: travelGuidePaths.calendar },
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
          "Some additional taxi charges are permitted by law. A booking fee may apply when you order a taxi to collect you. This is separate from the starting meter charge. Airport departure fees apply to rides leaving certain airports, not to rides going to them. See my airport taxi pickup guide for Ben Gurion ordering details.",
          "Tolls and waiting fees may be added when permitted by the regulations. Traffic delays are already included in the meter's time charge. There is no general luggage or tourist surcharge.",
        ],
        tables: [{
          caption: "Common permitted surcharges — VAT included where applicable",
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
        inlineLinks: [{ text: "airport taxi pickup guide", to: travelGuidePaths.airportTaxis }],
        highlightedLinks: [{
          label: "Ben Gurion Airport: official taxi ordering and pickup",
          href: "https://www.gett.com/il/airport-en/",
          context: "Check where to collect your authorized taxi and how to obtain an order code before leaving the terminal.",
        }],
        sourceIds: ["taxi-fares-2026", "guide-gett"],
      },
      {
        id: "examples",
        title: "How much might a taxi ride cost? Two examples",
        paragraphs: [
          "Example 1: A 5 km ride taking 15 minutes under Tariff A costs approximately ₪51.40, excluding extra charges.",
          "Example 2: A 12 km ride taking 25 minutes under Tariff B costs approximately ₪102.59. The final 2 km use the higher distance rate, while the time charge continues throughout the ride.",
          "These are examples, not guaranteed prices. Actual fares depend on your journey and any permitted extra charges.",
        ],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "estimates",
        title: "Metered taxis, app estimates and pre-booked transfers",
        paragraphs: [
          "The price shown in a taxi app may be an estimate rather than a guaranteed fare. Check the price details before booking and save your ride receipt. My taxis in Israel guide explains how to book licensed cabs; the guide to Uber alternatives in Israel compares Gett, Yango and current ridesharing availability.",
          "A private transfer may be useful for airport pickups, families, larger groups or long-distance journeys. Before booking, confirm the total price, vehicle size, pickup location, waiting time, tolls and cancellation terms.",
          "For practical route choices, compare Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa or Ein Bokek. Those guides cover trains and other alternatives as well as taxis.",
        ],
        inlineLinks: [
          { text: "taxis in Israel guide", to: travelGuidePaths.taxis },
          { text: "guide to Uber alternatives in Israel", to: travelGuidePaths.uber },
          { text: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/" },
        ],
        highlightedLinks: [{
          label: "Compare airport transfer options",
          href: "/airport-transfers/",
          context: "Useful if you want a specified pickup and vehicle rather than an on-arrival metered taxi; compare the actual booking terms.",
        }],
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
      "Check whether Tariff A, B or C applies at your travel time",
      "For a metered taxi, check that the meter is running",
      "Ask about dispatch, airport and toll additions where relevant",
      "Confirm how you can pay before the trip",
      "Keep the receipt or app ride record",
    ],
    faqs: [
      { q: "How much is the starting taxi fare in Israel?", a: "The regulated meter starts at ₪12.46 including 18% VAT outside Eilat under the rates effective April 2026. Minutes, kilometres and permitted surcharges are added." },
      { q: "Does a taxi meter charge for both time and distance?", a: "Yes. Both time and distance accumulate. The per-kilometre rate increases after the first 10 km; the time rate remains unchanged." },
      { q: "Are taxi fares more expensive at night or on Shabbat?", a: "Yes. Tariffs B and C apply during specified evening, overnight, weekend and holiday periods. See the hours table above for each day." },
      { q: "Is a taxi fare charged per person?", a: "An ordinary metered taxi charges for the vehicle journey within its licensed passenger capacity, not separately for each passenger." },
      { q: "Do I pay extra for luggage in a taxi?", a: "There is no standard luggage surcharge under the regulated meter tariff. Confirm that the vehicle has enough room before accepting the ride." },
      { q: "Is an airport taxi a fixed-price service?", a: "Ordinary authorized taxis departing Ben Gurion Airport use the regulated meter, with the permitted airport departure addition. Separately pre-booked private transfers can use a quoted price." },
      { q: "Can I rely on the fare shown in a taxi app?", a: "An estimate is not necessarily a fixed price. Check the app's price terms, final meter amount and any applicable surcharges." },
    ],
    sourceIds: ["taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints", "guide-gett"],
    related: ["taxis", "airportTaxis", "uber", "sherut", "shabbat", "arrival"],
    services: [
      { label: "Compare pre-booked airport transfers", to: "/airport-transfers/", note: "Choose a planned airport pickup with a confirmed provider price and meeting point instead of an on-arrival metered taxi." },
      { label: "Request a private driver quote", to: "/private-driver/", note: "Arrange a longer intercity journey, multi-stop route or group vehicle to suit your itinerary." },
      { label: "Compare car rentals in Israel", to: "/car-rental/", note: "For a multi-day itinerary with stops beyond the main cities, compare rental options and choose a pickup location that suits your route." },
      { label: "Compare trains, buses and taxis around Israel", to: travelGuidePaths.israel, note: "Find less expensive public-transport options and decide when a taxi is worth the extra cost." },
    ],
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
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Taxi entrance sign at Ben Gurion Airport" },
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
        inlineLinks: [{ text: "private transfer quote", to: "/airport-transfers/" }],
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
    services: [{ label: "See private airport transfer options", to: "/airport-transfers/" }],
  },
};