/**
 * Taxi content cluster. Each guide has ONE primary search intent:
 * taxis = how to use licensed taxis; taxiFares = regulated prices;
 * airportTaxis = authorized TLV airport ordering and pickup.
 * Cross-links intentionally avoid repeating other guides in full.
 */
import type { TravelGuide } from "@/data/travelGuides";
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
    description: "How to use taxis in Israel: licensed vehicles, booking with Gett or Yango, meters, payment, Shabbat travel, child seats, safety and airport taxi options.",
    intro: "Taxis can make travel across Israel easier, especially with luggage, at night or when public transport does not reach your address. Here is how the local system works and what to check before you ride.",
    answer: "Choose a licensed taxi, enter or give the exact destination, confirm the meter and payment method, and keep the ride details. Street hailing, taxi stations and apps such as Gett are common booking methods. For precise prices or Ben Gurion Airport pickup procedures, use the dedicated guides linked below.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-10-22",
    photo: pickup,
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
          "Licensed Israeli taxis operate under transport regulations. Look for the proper taxi identification, a roof sign bearing the Hebrew word monit (מונית), and the vehicle's licensing details. White taxis are common, but color alone does not prove that a vehicle is licensed.",
          "If you have booked through an app, match the license plate and driver information shown in your booking. At an airport or major transport hub, follow the official taxi signage instead of accepting an unsolicited approach inside a terminal.",
          "If you plan to cross between Israel, East Jerusalem and Palestinian Authority areas, ask in advance whether the driver and vehicle are permitted to complete the entire route; availability and access can differ by area.",
        ],
        links: [{ label: "How to get around Israel by train, bus or taxi", to: travelGuidePaths.israel }],
        sourceIds: ["taxi-passenger-rights"],
      },
      {
        id: "booking", title: "How to Find and Book a Taxi in Israel",
        photo: cityPhoto,
        paragraphs: [
          "In central Tel Aviv, Jerusalem, Haifa and other busy areas, you may be able to hail an available licensed taxi on the street. Tell the driver the actual address and confirm the payment method and regulated meter before departure. At peak hours, late at night or in remote places, street hailing may not be practical.",
          "Taxi stands are found near major hotels, railway stations, hospitals and shopping areas. A hotel or local dispatcher can also arrange a pickup; ask whether a regulated ordering addition applies and keep a dispatcher's phone number or your hotel address available offline.",
          "Taxi apps can display your pickup point, driver and vehicle information, and booking history. Enter a precise street address or entrance pin, verify that the driver accepts the ride, and do not assume that an estimated fare is necessarily fixed.",
          "Private transfers are a different booking product: a particular vehicle, route and pickup may be agreed in advance under a written quote. Check what is included and when the arrangement becomes a confirmed reservation.",
        ],
        links: [{ label: "Taxi apps, Uber availability and alternatives", to: travelGuidePaths.uber }, { label: "Private driver for a planned trip", to: "/private-driver/" }],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
      },
      {
        id: "fares", title: "How Much Do Taxis Cost in Israel?",
        paragraphs: [
          "An ordinary licensed taxi uses a regulated meter. The amount combines an initial charge, distance, elapsed journey time, the applicable A, B or C tariff and lawful extras. Traffic matters because travel time continues to accumulate even when the distance is unchanged.",
          "The official price schedule changes and has defined hours for evenings, Shabbat and recognized holidays. The national tariff guide contains the actual 2026 consumer tables, higher distance rate after 10 km, additional charges, worked examples and its sources; this general guide does not reproduce those figures.",
          "A separately quoted private transfer is not automatically priced in the same way as a metered taxi. For either product, check whether tolls, waiting and special requirements are included.",
        ],
        links: [{ label: "See the official 2026 taxi fare tables and examples", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "apps", title: "Taxi Apps in Israel: Gett, Yango and Uber",
        paragraphs: [
          "Gett is a major licensed-taxi booking option in Israel. Yango may provide another local app-based choice, but coverage and available features should be checked for your pickup location. Register in advance and keep a backup if a driver is unavailable.",
          "Do not assume that the same Uber or Lyft passenger service you have used abroad operates locally. Availability can change, so the separate Uber guide is responsible for the current picture and alternatives rather than duplicating app comparisons here.",
          "For an airport pickup, the official Gett taxi procedure uses a code and a physical authorized queue; the detailed airport instructions are covered in our airport taxi guide.",
        ],
        links: [{ label: "Is Uber available in Israel? App alternatives", to: travelGuidePaths.uber }, { label: "Gett at Ben Gurion Airport: official pickup", to: travelGuidePaths.airportTaxis }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "airport", title: "Taking a Taxi from Ben Gurion Airport",
        paragraphs: [
          "Ben Gurion Airport has an authorized taxi-ordering system operated by Gett. For an immediate taxi, travelers can request a ride using the Gett app or a self-service kiosk, obtain a code and go to the designated taxi queue. A scheduled Gett ride uses different pickup instructions.",
          "The authorized taxi fare uses the regulated meter. A pre-booked private transfer instead follows the operator's written confirmation, specified meeting point and agreed conditions. Do not confuse its driver meeting instructions with the official airport taxi queue.",
          "Because airport exit levels and procedures are service-specific, use the dedicated airport taxi guide before you land rather than treating a generic map pin as pickup instructions.",
        ],
        links: [{ label: "Ben Gurion Airport official taxis: Gett, queue and pickup points", to: travelGuidePaths.airportTaxis }, { label: "Compare private airport transfer services", to: "/transfers/ben-gurion-airport/" }],
        sourceIds: ["guide-gett", "guide-iaa"],
      },
      {
        id: "holidays", title: "Taxis on Shabbat and Jewish Holidays",
        paragraphs: [
          "Taxis can operate during Shabbat and on many Jewish holidays even when most regular train and bus services are suspended. That does not guarantee an available car: local driver supply, demand and the particular holiday can all affect your options.",
          "Regulated nighttime, weekend and holiday tariff periods are defined by the tariff schedule, not simply by sunset. For the applicable A, B and C hours and prices, use our fares guide. For travel from the airport during the main Shabbat break, see the separate airport weekend transport guide.",
          "Jewish holidays, national observances and special events can affect transport schedules, traffic and availability. For help planning your travel dates, see our Israel's Calendar of Events, covering important holidays, observances and events throughout the year. Yom Kippur requires particularly careful advance planning; do not assume ordinary road travel is available.",
        ],
        links: [{ label: "Israel's Calendar of Events — holidays and special dates", to: travelGuidePaths.calendar }, { label: "Taxi tariff hours on Shabbat and holidays", to: travelGuidePaths.taxiFares }, { label: "Getting out of Ben Gurion Airport on Shabbat", to: travelGuidePaths.shabbat }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "payment", title: "Payment, Tipping and Receipts",
        paragraphs: [
          "Taxi fares are expressed in Israeli shekels (ILS/NIS). Cash may be useful as a backup; cards and in-app payment depend on the particular taxi or booking service. Confirm the accepted method before you start, and check an app booking to avoid paying twice.",
          "Tipping taxi drivers is optional rather than an obligatory percentage. Rounding up for helpful service is your choice. Keep the taxi receipt, booking code, vehicle details and driver's contact route, especially in case of lost property or a fare dispute.",
        ],
        sourceIds: ["guide-gett", "taxi-passenger-rights"],
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
        photo: intercityPhoto,
        paragraphs: [
          "A taxi can be convenient between cities and at destinations that lack an easy public transport connection. Check the entire journey to your hotel or attraction rather than comparing only the railway-station or bus-stop distance.",
          "Do not assume that an app can find a return ride at a remote Dead Sea viewpoint, nature reserve or desert attraction. Confirm your return pickup, time, meeting point and contact number before departing, or consider an arranged driver for a multi-stop day.",
          "Trips involving Bethlehem or some West Bank destinations can involve different vehicle permissions and access considerations. Do not assume a driver will cross a checkpoint; use destination-specific guidance and check current restrictions.",
        ],
        links: [{ label: "Getting around Israel", to: travelGuidePaths.israel }, { label: "Jerusalem to Bethlehem travel options", to: travelGuidePaths.bethlehem }, { label: "Private driver services", to: "/private-driver/" }],
      },
      {
        id: "safety", title: "Taxi Safety, Passenger Rights and Common Mistakes",
        paragraphs: [
          "Use clearly identified licensed transport, match your ordered driver and vehicle, agree your destination and keep a receipt. For ordinary meter-based taxi travel, check that the regulated meter is used and ask the driver to explain any lawful addition or requested toll route.",
          "Frequent preventable mistakes include choosing the wrong airport exit, assuming all taxis accept cards, failing to declare oversized luggage, treating an app estimate as a fixed quote and leaving a remote destination without a return plan.",
          "For a billing, driver-conduct or service complaint, record the time, vehicle registration, receipt and trip details. The Ministry of Transport operates an official complaints service covering taxis; keep supporting documents and follow its stated deadlines.",
        ],
        links: [{ label: "Taxi fares and permitted surcharges", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Use a licensed taxi or an operator whose booking you can verify",
      "Provide an exact destination and useful pickup entrance",
      "Confirm the meter or agreed written booking terms and accepted payment",
      "Check passenger numbers, child-seat needs and luggage capacity",
      "Follow the pickup instructions for your particular airport service",
      "Keep the receipt, ride code and support contact",
      "Plan a return ride for remote or time-sensitive destinations",
    ],
    faqs: [
      { q: "Are taxis available throughout Israel?", a: "Licensed taxis are commonly found in cities and major transport hubs. Rural availability, busy periods and holidays are less predictable; important journeys deserve a confirmed plan." },
      { q: "How do I order a taxi without speaking Hebrew?", a: "A booking app or hotel dispatcher can accept a written destination. Save the address in Hebrew or as a precise map pin and confirm that the driver has accepted your trip." },
      { q: "Do Israeli taxis use meters?", a: "Ordinary licensed special taxis generally follow the regulated meter and its legal charges. A separately contracted transfer has its own written price and booking terms." },
      { q: "Is cash required?", a: "Not necessarily. Some taxis accept credit cards or app payment, but confirm the method for your specific ride and keep a backup." },
      { q: "Do taxi drivers usually speak English?", a: "English ability varies by driver. Keeping the exact address or entrance on your phone avoids misunderstandings." },
      { q: "Do I need to tip the taxi driver?", a: "No fixed percentage is obligatory. An optional small extra for helpful service is your decision." },
      { q: "Can I get a taxi on Shabbat?", a: "Many taxis operate during Shabbat, but availability varies, and higher legal tariff periods can apply. Yom Kippur deserves extra caution." },
      { q: "Can four passengers travel with four large suitcases?", a: "Not in every standard taxi. Confirm the number and size of bags and ask for a suitable vehicle if necessary." },
      { q: "Can I rely on a taxi from a remote site?", a: "Arrange a return pickup or a backup before traveling to remote attractions. App presence alone is not a guarantee of a driver." },
      { q: "What if I lose something in a taxi?", a: "Contact the taxi app or dispatcher with the receipt, ride code, vehicle number, date and time. Keep a record of the journey for follow-up." },
      { q: "Are ordinary airport taxis the same as private airport transfers?", a: "No. The authorized airport taxi follows Gett's booking process and the regulated meter. Private transfers follow a separately agreed vehicle, pickup and booking confirmation." },
    ],
    sourceIds: ["guide-original-taxis", "guide-gett", "guide-iaa", "taxi-fares-2026", "taxi-passenger-rights", "taxi-complaints"],
    related: ["taxiFares", "airportTaxis", "uber", "sherut", "shabbat", "israel"],
    services: [{ label: "Airport transfers and vehicle requests", to: "/transfers/" }, { label: "Private driver for a planned itinerary", to: "/private-driver/" }],
  },

  taxiFares: {
    id: "taxiFares",
    title: "Taxi Fares in Israel (2026): Official Rates, Night Tariffs & Price Estimates",
    description: "Official Israel taxi fares for 2026: A/B/C meter rates, time and distance, price after 10 km, Shabbat hours, booking supplements and example calculations.",
    intro: "Understand what the taxi meter charges, when higher rates apply and how to check legitimate extras. These are official regulated fare components, not live quotations for individual routes.",
    answer: "From April 1, 2026, the regulated meter starting amount is approximately ₪12.46 including 18% VAT where applicable. Time and distance are charged together; for the first 10 km the A/B/C rates are about ₪1.95/₪2.34/₪2.73 per minute and per kilometer. Each kilometer beyond 10 km costs more. Additional lawful charges may apply.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-10-22",
    photo: pickup,
    reviewNote: "Official figures checked October 22, 2026. The April 2026 temporary tariff schedule is specified through March 31, 2027 unless amended. Prices shown include 18% VAT where applicable and are rounded to two decimals; the official order lists base amounts before VAT.",
    facts: [
      { label: "Meter start", text: "₪12.46 with 18% VAT, where applicable" },
      { label: "A / B / C", text: "Tariff depends on day and hour; time AND distance are charged" },
      { label: "Over 10 km", text: "A higher rate applies to the distance beyond 10 km" },
    ],
    nextSteps: [{ label: "Using licensed taxis: full guide", to: travelGuidePaths.taxis }, { label: "Airport taxi ordering and pickup", to: travelGuidePaths.airportTaxis }, { label: "Holiday calendar", to: travelGuidePaths.calendar }],
    comparison: {
      caption: "Official regulated taxi meter rates — 2026 (₪, including 18% VAT where applicable)",
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
          "The price controls discussed here apply to ordinary metered special taxi journeys, not shared taxi lines or separately contracted private transport services. Fares are billed in Israeli shekels (ILS/NIS), and a taximeter is known locally as a moneh (מונה).",
          "The government fare order dated March 30, 2026 introduced an interim schedule effective April 1, 2026. It is expressly specified through March 31, 2027 unless amended. Always check for a later order before using this article for future travel.",
          "The government tables state pre-VAT amounts. To help most tourists, the leading comparison above displays consumer figures including 18% VAT where it applies. Eilat has separate VAT rules; do not assume the same tax treatment applies to every service involving Eilat.",
        ],
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
          "Do not treat a toll or airport addition as automatically applicable to every taxi trip. Check the exact trip conditions and whether you requested the route. For an airport arrival, the authorized Gett taxi remains metered; its order code is not a fixed-price quote.",
          "Passenger waiting that qualifies for a separate waiting charge should not be confused with being stopped in normal traffic, which is reflected in the ordinary meter time component.",
        ],
        tables: [{
          caption: "Specific 2026 additions — including 18% VAT where applicable",
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
        links: [{ label: "How the official Ben Gurion Airport taxi system works", to: travelGuidePaths.airportTaxis }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "holidays", title: "Shabbat, Holidays and Late-Night Taxi Prices",
        paragraphs: [
          "Shabbat and legally recognized holidays fall into designated higher tariff periods. The price may rise even for a journey of identical distance and duration. Taxi availability and longer waiting times are separate from the regulated fare.",
          "A festival calendar helps you identify dates on which roads, attractions and public transport may change, but you must still check whether a specific date legally triggers holiday taxi tariffs. Yom Kippur needs exceptional advance planning.",
        ],
        links: [{ label: "Israel's Calendar of Events and Jewish holidays", to: travelGuidePaths.calendar }, { label: "Airport travel during Shabbat", to: travelGuidePaths.shabbat }],
        sourceIds: ["taxi-tariff-hours"],
      },
      {
        id: "estimates", title: "Estimates, App Prices and Private Transfer Quotes",
        paragraphs: [
          "An app may show an estimate to help you budget. It is not necessarily the final regulated meter amount; read the actual service terms. A licensed taxi booked through an app can still be metered, including at Ben Gurion Airport.",
          "A private transfer arranged separately for a particular passenger group can have a written total price and specific conditions. A quote should identify vehicle type, meeting point, permitted waiting, tolls, luggage and cancellation terms. It is a different service, not a guarantee that a metered taxi will charge the quoted amount.",
          "For specific airport-to-city alternatives, consult the destination-specific journey comparisons rather than treating the national meter guide as a guaranteed route-price list.",
        ],
        links: [{ label: "How ordinary taxis work in Israel", to: travelGuidePaths.taxis }, { label: "Private airport transportation", to: "/transfers/ben-gurion-airport/" }],
        sourceIds: ["guide-gett"],
      },
      {
        id: "disputes", title: "How to Check a Fare and Report a Problem",
        paragraphs: [
          "Check that the meter runs for the whole ordinary taxi journey and that permitted additions reflect the service used. Keep your receipt, booking confirmation and, if possible, the taxi registration and journey time.",
          "If a charge seems incorrect, ask the operator for an explanation, then use the Ministry of Transport's public transport complaint service when appropriate. Provide the supporting records and follow the official submission deadlines.",
        ],
        links: [{ label: "Taxi booking, safety and passenger rights", to: travelGuidePaths.taxis }],
        sourceIds: ["taxi-passenger-rights", "taxi-complaints"],
      },
    ],
    checklist: [
      "Check the fare order date before relying on 2026 figures",
      "Find the correct A/B/C time period",
      "Include the initial amount AND both time and distance charges",
      "Apply the higher rate only to kilometers beyond the first 10",
      "Add a dispatch, waiting or toll supplement only when legally applicable",
      "Confirm whether VAT applies to the actual transaction",
      "Keep the receipt and app booking reference",
    ],
    faqs: [
      { q: "What is the starting taxi fare in Israel in 2026?", a: "The regulated meter begins at ₪10.56 before VAT, approximately ₪12.46 including 18% VAT where it applies. That is a starting component, not the complete cost of a ride." },
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
    services: [{ label: "Compare separately booked airport transfers", to: "/transfers/ben-gurion-airport/" }],
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
    nextSteps: [{ label: "Official 2026 taxi meter rates", to: travelGuidePaths.taxiFares }, { label: "Airport arrival process", to: travelGuidePaths.arrival }, { label: "Shabbat airport transport", to: travelGuidePaths.shabbat }],
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
          "After passport control, baggage collection and customs, follow signs for the authorized taxi queue at Terminal 3's ground floor, Exit 03. Keep the Gett ride code ready before joining the line.",
          "Do not mistake the scheduled-ride pickup point on Level 2 for the on-demand queue on the ground floor. These are different services with different meeting instructions.",
          "Ignore unsolicited approaches inside the terminal when they cannot be matched to a confirmed service. The dispatcher at the authorized taxi line can help you find the next vehicle.",
        ],
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
        links: [{ label: "Official Taxi Fares in Israel — 2026 prices and examples", to: travelGuidePaths.taxiFares }],
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
          "Jewish holidays, national observances and special dates can affect schedules and travel planning. Our Israel's Calendar of Events helps you identify those dates; Yom Kippur deserves special advance caution.",
        ],
        links: [{ label: "Ben Gurion Airport transport on Shabbat", to: travelGuidePaths.shabbat }, { label: "Israel's Calendar of Events", to: travelGuidePaths.calendar }],
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
        links: [{ label: "Private transfers from Ben Gurion Airport", to: "/transfers/ben-gurion-airport/" }],
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
          "Gett publishes support through its app and website and lists the short number *2299 for assistance following an order made at a self-service kiosk. For a formal complaint about a licensed taxi service, the Ministry of Transport also offers an official process.",
        ],
        links: [{ label: "General airport arrival and baggage guidance", to: travelGuidePaths.arrival }],
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
    services: [{ label: "See private airport transfer options", to: "/transfers/ben-gurion-airport/" }],
  },
};