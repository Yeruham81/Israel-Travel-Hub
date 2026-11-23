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
        links: [{ label: "Private driver for a planned trip", to: "/private-driver-in-israel/" }],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
      },
      {
        id: "fares", title: "How Much Do Taxis Cost in Israel?",
        paragraphs: [
          "An ordinary taxi meter calculates the fare using a starting charge, distance, travel time and the applicable tariff. Heavy traffic can increase the fare, even for a short trip. Some intercity journeys have legally approved fixed-fare options. Confirm which pricing method applies before travelling.",
          "Under the published regulations, the meter starts at ₪12.46 outside Eilat and then increases with both time and distance. Night and weekend tariffs can be higher, and longer rides have a higher rate per kilometre. The table below summarizes the main regulated charges.",
          `An app, telephone or dispatcher booking may carry a regulated booking fee. Airport departures, tolls and other permitted items may cost extra. For tariff hours, permitted additions and fare examples, see my guide to taxi fares in Israel. Check the latest official tariff updates before travelling.`,
          "A separately contracted private transfer can instead have a confirmed written price. Check whether waiting, tolls and extra stops are included before you book.",
        ],
        tables: [{
          caption: "Regulated meter amounts (ILS, including VAT)",
          headers: consumerFareTable.headers,
          rows: consumerFareTable.rows.slice(0, 4),
          note: "Rates effective 1 April 2026 and scheduled through March 2027 unless amended. Time and distance are charged together. Eilat may use VAT-free rates; tolls and other allowed additions are not included.",
        }],
        inlineLinks: [{ text: "guide to taxi fares in Israel", to: travelGuidePaths.taxiFares }],
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
          { text: "Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
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
          "Travel during Yom Kippur is very different from an ordinary Shabbat. Roads are largely empty, and you should not expect normal taxi availability. For airport transport on a regular Shabbat, consult the airport weekend transport guide, and check the dates of upcoming Jewish observances before your trip.",
        ],
        inlineLinks: [{ text: "fares guide", to: travelGuidePaths.taxiFares }, { text: "airport weekend transport guide", to: travelGuidePaths.shabbat }, { text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" }],
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
        links: [{ label: "Arrange a vehicle for a planned private journey", to: "/private-driver-in-israel/" }],
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
        links: [{ label: "Arrange a private driver for a longer trip", to: "/private-driver-in-israel/" }],
      },
      {
        id: "safety", title: "Taxi Safety and Common Mistakes to Avoid",
        paragraphs: [
          "Use a licensed taxi, check the driver and number plate against your booking, and avoid unsolicited rides at the airport. Save an accurate destination pin, confirm the meter or legal price basis, and check the final receipt.",
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
      { q: "How do I find or book a taxi in Israel?", a: "In major cities, hail a licensed taxi, use a taxi stand, book through Gett or Yango, or ask your hotel to arrange one. Check the destination, meter and payment method." },
      { q: "How much do taxis cost in Israel?", a: "Taxi fares are regulated and calculated using a starting charge, time, distance and the applicable tariff. See my current fare table for exact amounts and permitted extra charges." },
      { q: "Do taxi drivers have to use the meter?", a: "Generally, yes. Licensed taxis normally use the meter, although some intercity journeys have legally approved fixed-fare exceptions. Separately arranged private transfers have their own confirmed terms." },
      { q: "Can I take an airport taxi without installing Gett?", a: "Yes. Ben Gurion Airport self-service kiosks provide a ride code. Terminal 3 immediate taxis leave from ground-floor Exit 03; advance-scheduled Gett rides use Level 2, Exit 23." },
      { q: "Are Nesher or Amal shared taxis still available from the airport?", a: "No. These former airport sherut services have ended. Check trains, buses, licensed taxis or pre-booked transfers." },
      { q: "Do taxis charge extra for suitcases or more passengers?", a: "No unofficial luggage or passenger fee should apply when your group and bags fit within the taxi's approved capacity. Book a larger vehicle if needed." },
      { q: "Can I pay by card or do I need cash?", a: "Card and in-app payments are available on some services. Check before starting your journey. Confirm before leaving and carry some Israeli shekels if possible." },
      { q: "Do drivers usually speak English?", a: "Not all drivers speak English. Save your destination in a map app or keep the address written in Hebrew." },
      { q: "Can I ride on Shabbat or Jewish holidays?", a: "Many taxis operate, but availability may be reduced and higher regulated tariff periods apply. Yom Kippur requires separate planning." },
      { q: "Should I tip my taxi driver?", a: "No tip is obligatory. Rounding up for especially helpful service is optional." },
      { q: "What if I need a child seat or space for four suitcases?", a: "Ordinary taxis may lack child restraints or enough luggage space. Arrange the appropriate equipment or larger vehicle before pickup." },
      { q: "Can I take a taxi from Jerusalem to Bethlehem?", a: "You may need to change vehicles around Checkpoint 300 because driver and vehicle permissions differ. Check current crossing requirements." },
      { q: "What if I lose property or want to complain?", a: "Keep the receipt, vehicle number, trip date and ride code. Contact the taxi company or app for lost belongings, or the Ministry of Transport for a formal complaint." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-tariff-hours", "taxi-passenger-rights", "taxi-complaints"],
    related: ["taxiFares", "airportTaxis", "uber", "sherut", "shabbat", "israel"],
    services: [{ label: "Request a quote for a pre-booked airport transfer", to: "/airport-transfers/" }, { label: "Arrange a private driver for a day trip", to: "/private-driver-in-israel/" }],
  },

  taxiFares: {
    id: "taxiFares",
    title: "Taxi Fares in Israel: Meter Rates, Night Prices & Surcharges",
    description: "How much does a taxi cost in Israel? Compare official meter fares, night and Shabbat tariffs, booking surcharges, airport fees and transfer options.",
    intro: "Taxi prices in Israel are regulated, but the final fare depends on distance, travel time and when you ride. Here's how the meter works, when higher tariffs apply and which extra charges are permitted.",
    answer: "Under the current published rates, a taxi meter starts at ₪12.46 outside Eilat. The fare then increases with both time and distance. Tariffs A, B and C apply at different hours, and longer trips have a higher rate per kilometre after 10 km. Permitted extra charges may also apply.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-13",
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
          "These rates apply to ordinary metered taxis, not shared sherut rides or separately priced private transfers. Taxi fares in Eilat may differ because of the city's VAT exemption.",
        ],
        inlineLinks: [{ text: "shared sherut rides", to: travelGuidePaths.sherut }],
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
          "These are examples, not guaranteed prices. Actual fares depend on your journey and any permitted extra charges. Calculations use the official rates before final rounding, so adding displayed rounded rates may produce a small difference.",
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
          { text: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ein Bokek", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
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
      { q: "How much is the starting taxi fare in Israel?", a: "Under the published April 2026 rates, the meter starts at ₪12.46 outside Eilat, including VAT. Time, distance and any permitted extra charges are added." },
      { q: "Does a taxi meter charge for both time and distance?", a: "Yes. The meter charges for both time and distance. After 10 km, a higher kilometre rate applies, but the time rate stays the same." },
      { q: "Are taxi fares more expensive at night or on Shabbat?", a: "Yes. Tariffs B and C apply during specified evening, overnight, weekend and holiday periods. See the hours table above for each day." },
      { q: "Is a taxi fare charged per person?", a: "No. A regular taxi fare covers the vehicle journey, not each passenger individually, provided everyone fits within its licensed capacity." },
      { q: "Do I pay extra for luggage in a taxi?", a: "No general luggage surcharge applies, but make sure your taxi has enough room for your bags. Confirm that the vehicle has enough room before accepting the ride." },
      { q: "Is an airport taxi a fixed-price service?", a: "Ordinary authorized taxis departing Ben Gurion Airport use the regulated meter, with the permitted airport departure addition. Separately pre-booked private transfers can use a quoted price." },
      { q: "Can I rely on the fare shown in a taxi app?", a: "Not always. The app may show an estimated price. Check whether the fare is fixed or metered and whether extra charges apply." },
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
          { label: "Gett — official airport taxi instructions", href: "https://www.gett.com/il/airport-en/", context: "See the three ordering steps, kiosk option and official pickup points." },
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
          { label: "Israel Ministry of Transport — official taxi tariff", href: "https://www.gov.il/BlobFolder/policy/taxi-rate-2026/he/taxi-rate-26.pdf", context: "Official fare order and regulated charging rules effective from April 2026." },
        ],
        sourceIds: ["guide-gett", "taxi-fares-2026"],
      },
      {
        id: "pay", title: "Paying for your airport taxi",
        paragraphs: [
          "Gett allows payment directly to the driver in cash or by card, and supports in-app payment for eligible orders. Choose the method when ordering and confirm it before you set off. Taxi fares are charged in Israeli shekels.",
          "Ask for a receipt and retain your ride code in case you need help with the journey or something left in the vehicle. Tipping is optional.",
        ],
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
          { label: "Accessible taxis at Terminal 3 — Access Israel", href: "https://aisrael.org/wp-content/uploads/2026/02/Neg.-Terminal-A5-12_25-Eng-1.pdf", context: "English accessibility guide explaining how to request a taxi equipped with a wheelchair ramp." },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "guide-accessible-airport"],
      },
      {
        id: "weekend", title: "Airport taxis on Shabbat and holidays",
        paragraphs: [
          "Authorized taxis operate at Ben Gurion Airport 24 hours a day, including Shabbat. Waiting times can be longer when fewer drivers are available, particularly at busy arrival periods. Night, Shabbat and holiday tariff rules can also affect the meter.",
          "When train and regular bus services are limited, taxis and pre-arranged transfers may be the most practical door-to-door options. My airport Shabbat transport guide explains the alternatives; Israel's calendar of events helps you plan around major holidays, including Yom Kippur.",
        ],
        inlineLinks: [
          { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
          { text: "Israel's calendar of events", to: "/travel-blog/calendar-of-events/" },
        ],
        sourceIds: ["guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "versus-transfer", title: "Official airport taxi or pre-booked private transfer?",
        paragraphs: [
          "For an ordinary arrival with manageable luggage, an authorized metered taxi is a practical choice. I recommend considering a pre-booked private transfer for a larger group, a particular vehicle, several suitcases or a long journey where you prefer the pickup and price arrangements agreed ahead of time.",
          "Private transfers are booked with their own operator and have a confirmed meeting place, vehicle class and waiting terms. Use the meeting instructions on that booking rather than the Gett taxi queue. You can compare my private airport transfer service and request a quote.",
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
        inlineLinks: [{ text: "private airport transfer service", to: "/airport-transfers/" }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "destinations", title: "Taxis from Ben Gurion Airport to popular destinations",
        paragraphs: [
          "A taxi can take you directly to your hotel or another accessible address. Travel time and fare depend on the exact destination and traffic, so compare the full door-to-door journey rather than only the time on a train.",
          "I've prepared individual guides for traveling to Tel Aviv, Jerusalem, Haifa and Ein Bokek at the Dead Sea. Each compares taxis with other ways of reaching the destination.",
        ],
        links: [
          { label: "Traveling to Tel Aviv & Jaffa", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { label: "Traveling to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { label: "Traveling to Haifa", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { label: "Traveling to Ein Bokek & the Dead Sea", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
        ],
      },
      {
        id: "support", title: "Receipts, lost property and Gett support",
        paragraphs: [
          "For a lost item or a problem with your trip, keep the ride code, receipt, date, destination and taxi registration number. Contact Gett through the app or website; for journeys ordered at an airport kiosk, Gett also lists *2299 for support. For checked baggage missing at the airport, use the airline's baggage service described in my arrival guide.",
        ],
        inlineLinks: [{ text: "arrival guide", to: travelGuidePaths.arrival }],
        sourceIds: ["guide-gett", "taxi-complaints"],
      },
    ],
    checklist: [
      "Have your destination address ready in English or Hebrew",
      "Use Gett or a self-service kiosk and keep your ride code",
      "Immediate ride: Terminal 3 Exit 03 or Terminal 1 main arrivals exit",
      "Scheduled Gett pickup at Terminal 3: Level 2, Exit 23",
      "Confirm enough seats, luggage room and any required child seat",
      "Choose your payment method and retain the receipt",
    ],
    faqs: [
      { q: "Where do I find a taxi at Terminal 3?", a: "For an immediate authorized taxi, go to the ground floor, Exit 03. Gett rides booked ahead at Terminal 3 use Level 2, Exit 23." },
      { q: "Can I get an airport taxi without the Gett app?", a: "Yes. Use an airport self-service kiosk to create an immediate order and receive a ride code." },
      { q: "Can the ride code reserve a taxi for me?", a: "The code identifies your booking. For an immediate taxi, you still join the official queue and board when your turn comes." },
      { q: "Can I book an airport taxi before landing?", a: "Yes. Gett accepts scheduled app bookings at least two hours in advance. Enter your flight number so pickup timing can follow flight updates." },
      { q: "How much is a taxi from Ben Gurion Airport?", a: "Official airport taxis use the regulated meter, which depends on distance, time, tariff and permitted extras. A ₪5 airport departure supplement applies under the April 2026 fare order." },
      { q: "Do airport taxis run on Shabbat?", a: "Yes. Authorized taxis operate 24 hours a day, although the number of available vehicles and waiting times can vary." },
      { q: "Can I pay by credit card?", a: "Gett accepts payment to the driver by cash or card, and supports payment through the app for eligible rides." },
      { q: "What about large luggage or a wheelchair?", a: "Arrange vehicle capacity, child seats or accessibility requirements with the operator in advance." },
    ],
    sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-complaints"],
    related: ["taxis", "taxiFares", "arrival", "shabbat", "sherut", "uber"],
    services: [{ label: "Request a private airport transfer quote", to: "/airport-transfers/", note: "For a pre-arranged vehicle and pickup meeting point." }],
  },
};