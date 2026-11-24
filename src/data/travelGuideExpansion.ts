import type { GuidePhoto, TravelGuide } from "@/data/travelGuides";
import { TRAVEL_TIPS_TITLE, TRAVEL_TIPS_DESCRIPTION, TRAVEL_TIPS_UPDATED, travelTipsFaqs, travelTipsHero } from "@/data/israelTravelTips";
import { jerusalemShoppingPlaces as shoppingPlaces } from "@/data/jerusalemShopping";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { travelGuidePaths } from "@/data/registry";
import { shabbatAirportTaxiFareTable } from "@/data/shabbatAirportTaxiFares";
import airportRailPlatform from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import hall from "@/assets/home/ben-gurion-t3.webp";
import panorama from "@/assets/home/jerusalem-old-city.webp";
import market from "@/assets/jerusalem/mahane-yehuda.webp";
import masada from "@/assets/home/masada-dead-sea.webp";
import yardenit from "@/assets/guides/yardenit.jpg";
import qasr from "@/assets/guides/qasr-el-yahud.jpg";
import sepulchre from "@/assets/guides/holy-sepulchre.jpg";
import jerusalemShabbatNight from "@/assets/travel-blog-hub/jerusalem-night-443d64981d-420.webp";
import jerusalemShoppingFeature from "@/assets/guides/2026-11/jerusalem-old-city-market-lanes.webp";

const photos = {
  hall: { src: hall, alt: "Ben Gurion Airport Terminal 3 arrivals hall", credit: "GeorgeDement · CC BY-SA 2.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  jerusalem: { src: panorama, alt: "Jerusalem Old City skyline with the Dome of the Rock", credit: "Berthold Werner · public domain · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG" },
  market: { src: market, alt: "Agripas Street beside Mahane Yehuda Market in Jerusalem", sourceUrl: "", credit: "Photo from the publisher's travel image archive." },
  masada: { src: masada, alt: "Masada plateau and the surrounding Dead Sea desert", credit: "Godot13 · CC BY-SA 4.0 · resized WebP", sourceUrl: "https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  yardenit: { src: yardenit, alt: "Visitors at the designated baptism areas at Yardenit, south of the Sea of Galilee", sourceUrl: "", credit: "Photo from the publisher's travel image archive." },
  qasr: { src: qasr, alt: "A baptism gathering at Qasr el-Yahud on the lower Jordan near Jericho", sourceUrl: "", credit: "Photo from the publisher's travel image archive." },
  sepulchre: { src: sepulchre, alt: "Courtyard and facade of the Church of the Holy Sepulchre in Jerusalem", sourceUrl: "", credit: "Photo from the publisher's travel image archive." },
} satisfies Record<string, GuidePhoto>;

export const expandedTravelGuides = {
  shabbat: {
    id: "shabbat",
    title: "How to Get from Ben Gurion Airport on Shabbat",
    description: "Arriving at Ben Gurion Airport on Shabbat? Compare free bus 711, official taxis, private transfers and Saturday-night trains, with practical pickup tips.",
    intro: "Landing at Ben Gurion Airport on Friday or Saturday? I explain the free weekend bus to Tel Aviv, the terminal transfer, licensed taxis and private pickups, and when trains resume.",
    answer: "When regular trains and buses pause for Shabbat, free weekend Line 711 can take you from Terminal 1 to central Tel Aviv at limited times. International arrivals use Terminal 3, so first take the free airport shuttle to Terminal 1. Licensed airport taxis run around the clock, and you can arrange a confirmed private pickup. On Saturday evening, compare your arrival time with the first actual train for your destination.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-24",
    photo: {src: "/images/travel-blog/featured-shabbat-airport.webp", alt: "Road and airport travel during Shabbat near Ben Gurion Airport"},
    facts: [
      { label: "Free weekend bus", text: "Line 711 from Terminal 1 to central Tel Aviv; winter service ends earlier on Saturdays" },
      { label: "Direct ride", text: "Authorized airport taxis operate 24/7; regulated meter and official queue" },
      { label: "After Shabbat", text: "Look up the first actual train or bus for your route and date" },
    ],
    comparison: {
      caption: "Shabbat transport options at a glance",
      headers: ["Option", "Best for", "Practical details"],
      rows: [
        ["Free bus 711", "Flexible travellers heading to central Tel Aviv", "Board at Terminal 1; winter and summer schedules differ; choose your final stop"],
        ["Official airport taxi", "Direct travel to your final address", "Gett or airport kiosk, Terminal 3 Exit 03; Shabbat meter tariffs apply"],
        ["Pre-booked private transfer", "Families, groups, luggage or longer distances", "Confirmed vehicle, price, waiting terms and meeting point"],
        ["Rental car", "Starting a multi-stop road trip", "Check Saturday counter hours, vehicle collection and full costs"],
        ["Train or regular bus after Shabbat", "Saturday evening arrivals", "Check the first departure for your route and your hotel connection"],
      ],
    },
    sections: [
      {
        id: "shabbat-hours",
        title: "What changes at Ben Gurion Airport on Shabbat?",
        paragraphs: [
          "On an ordinary Shabbat, most regular trains and buses stop on Friday and resume on Saturday evening. The last Friday departure and the first Saturday-night service depend on the date and route. Compare your expected exit from the airport with the published transport schedule.",
          "Holiday periods can follow different ground-transport schedules. Yom Kippur is a special exception with major restrictions on airport flight operations, so consult the Israel Airports Authority and your airline when planning travel on that date. My calendar of Jewish holidays explains dates and their effect on visitors.",
          "Allow time for passport control, baggage claim and customs before your next connection. My Ben Gurion Airport arrival tips explain each step. The Shabbat-times link below helps you understand the weekly calendar; use the transport timetables for actual train and bus departures.",
        ],
        inlineLinks: [{ text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" }, { text: "Ben Gurion Airport arrival tips", to: travelGuidePaths.arrival }],
        sourceIds: ["israel-rail", "guide-iaa"],
      },
      {
        id: "arrival-time",
        title: "Which option suits your arrival time?",
        paragraphs: [
          "Use your estimated time out of the arrivals hall when choosing an option. The table below shows what is usually available at different points on Friday and Saturday; match any public-transport connection to the actual timetable for your date.",
        ],
        tables: [{
          caption: "Plan by when your flight arrives",
          headers: ["Arrival window", "Available transport options", "Practical first step"],
          rows: [
            ["Friday before regular service stops", "Train or scheduled bus, licensed taxi, private transfer", "Check the last service after allowing time for arrivals"],
            ["Friday evening and overnight", "Free Line 711 when scheduled, licensed taxi, confirmed private transfer", "Compare the bus departure at Terminal 1 with your exit time"],
            ["Saturday daytime", "Free Line 711 when scheduled, licensed taxi, confirmed private transfer, arranged rental", "Check the seasonal Saturday bus timetable"],
            ["Saturday evening", "First trains or regular buses as they restart, taxis or pre-booked transfers", "Check the first actual service and the last leg to your hotel"],
          ],
          note: "Friday and Saturday service varies with season, destination and holidays.",
        }],
        sourceIds: ["israel-rail", "guide-weekend-timetable"],
      },
      {
        id: "weekend-711",
        title: "Free weekend bus 711: Ben Gurion Airport to Tel Aviv",
        paragraphs: [
          "The free Na’im Besofash Line 711 connects Shoham with central Tel Aviv via Ben Gurion Airport Terminal 1. The November 2026 winter-time route listing shows Friday 15:45–01:30 and Saturday 10:30–16:30, about every two hours. Saturday service ends earlier during Israel’s winter time; daylight-saving-time schedules extend service later in the day. Departure times at the airport stop differ from the route-wide operating window.",
          "At the airport, use Ben Gurion Airport / Terminal 1, stop 34609, in the Tel Aviv-bound direction. The line serves HaRakevet Street, Rothschild Boulevard, Habima Square, Dizengoff Center and the Tel Aviv Museum. The stop guide below helps you choose the part of the city closest to your accommodation.",
          "Allow time for passport control, baggage collection and the shuttle from Terminal 3 to Terminal 1. Select the stop closest to your hotel and plan the remaining walk or local ride. For holidays and summer travel, use the operator’s current timetable for the exact date and direction.",
        ],
        tables: [{
          caption: "Where to get off Line 711 in Tel Aviv",
          headers: ["Line 711 stop / area", "Useful for", "Next step"],
          rows: [
            ["HaRakevet Street", "Southern city centre and nearby streets", "Use your accommodation address to select the nearest stop"],
            ["Rothschild Boulevard", "Hotels and apartments along Rothschild", "Check which stop on the boulevard best matches your address"],
            ["Habima Square", "Central Tel Aviv and the cultural district", "Continue to your hotel on foot or by a suitable local ride"],
            ["Dizengoff Center", "Dizengoff and surrounding central streets", "Check your hotel’s position north or south of the centre"],
            ["Tel Aviv Museum", "The museum and nearby city-centre streets", "Plan the last connection for your actual address"],
          ],
          note: "These are route areas, not exact walking-time claims. Check the stop-by-stop timetable for the current direction and stop names.",
        }],
        sourceIds: ["guide-weekend-711", "guide-weekend-timetable", "guide-711-hours"],
      },
      {
        id: "terminal-transfer",
        title: "How to reach bus 711 from Terminal 3",
        paragraphs: [
          "For international arrivals at Terminal 3, take the airport’s free inter-terminal shuttle to Terminal 1. The Israel Airports Authority lists an approximately 15-minute frequency around the clock, including Shabbat. Follow the three steps below from arrivals to the Line 711 stop.",
          "The internal shuttle connects the two airport terminals; Line 711 then travels toward Tel Aviv. Include the shuttle wait, ride and short walk to bus stop 34609 when planning the connection.",
        ],
        sourceIds: ["guide-iaa", "guide-weekend-711"],
      },
      {
        id: "taxis-transfers",
        title: "Licensed airport taxis and private transfers on Shabbat",
        photo: { src: "/images/travel-blog/airport-taxi-sign.webp", alt: "Official taxi sign at Ben Gurion Airport" },
        paragraphs: [
          "Licensed airport taxis operate 24 hours a day, including Shabbat, and charge a regulated meter fare at the applicable Shabbat tariff. For an immediate ride, get a ride code through Gett or an airport taxi kiosk and join the official queue at Terminal 3 ground-floor Exit 03 (or follow the official Terminal 1 pickup signs). A kiosk can issue the code without the Gett app; the same queue procedure applies. My Ben Gurion Airport taxi guide explains the steps.",
          "Gett lists cash, card and in-app payment options for airport taxis. For a Gett taxi booked in advance, book in the app at least two hours before pickup and follow the separate meeting instructions at Terminal 3 Level 2, Exit 23.",
          "A pre-booked private transfer can provide a confirmed vehicle, meeting point and price. Tell me your flight number, full destination address, number of travellers, luggage and any child-seat or accessibility needs. I will explain the waiting, payment and cancellation terms before a booking is confirmed. You can compare private airport-transfer options.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport-transfer options", to: "/airport-transfers/" },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "costs",
        title: "Estimated airport taxi fares on Shabbat",
        paragraphs: [
          "Line 711 is free. The table below uses the regulated Shabbat taxi meter tariffs, which are higher than the corresponding ordinary weekday daytime Tariff A. Saturday daytime generally uses Tariff B (06:00–19:00) and Saturday evening/night Tariff C (19:00–06:00). Friday uses B from 16:00 and C from 21:00. These are estimated meter journeys for planning; for the exact rules and permitted additions, see my Israeli taxi fares guide.",
        ],
        tables: [shabbatAirportTaxiFareTable],
        inlineLinks: [{ text: "Israeli taxi fares guide", to: travelGuidePaths.taxiFares }],
        sourceIds: ["taxi-fares-2026"],
      },
      {
        id: "rental-car",
        title: "Can I collect a rental car on Saturday?",
        paragraphs: [
          "Possibly. Airport rental desks have different Saturday and holiday opening arrangements, and an online booking is not proof that keys can be collected at your arrival time. Confirm the actual counter, hours and late-flight handover procedure directly with the company before paying.",
          "A rental makes more sense if you are beginning a multi-stop trip than if you simply need a ride to central Tel Aviv. Include fuel, insurance, tolls and parking when comparing it with an airport taxi. You can compare available cars on DiscoverCars.",
        ],
        inlineLinks: [{ text: "DiscoverCars", to: "/car-rental/" }],
        sourceIds: [],
      },
      {
        id: "destinations",
        title: "Getting to Tel Aviv, Jerusalem, Haifa and the Dead Sea",
        paragraphs: [
          "Line 711 serves central Tel Aviv; choose the bus stop that best matches your hotel and consult my Ben Gurion Airport to Tel Aviv guide for onward travel. The table below compares destinations during the main Shabbat transport break. My Ben Gurion Airport to Jerusalem guide, Ben Gurion Airport to Haifa guide and Ben Gurion Airport to Ein Bokek guide cover longer journeys.",
          "For direct travel to Jerusalem, Haifa or other destinations beyond the Line 711 route, consider an official airport taxi or a confirmed private transfer. My sherut guide explains current shared-taxi alternatives elsewhere in Israel.",
        ],
        inlineLinks: [
          { text: "Ben Gurion Airport to Tel Aviv guide", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
          { text: "Ben Gurion Airport to Jerusalem guide", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { text: "Ben Gurion Airport to Haifa guide", to: "/travel-blog/ben-gurion-airport-to-haifa/" },
          { text: "Ben Gurion Airport to Ein Bokek guide", to: "/travel-blog/ben-gurion-airport-to-ein-bokek/" },
          { text: "sherut guide", to: travelGuidePaths.sherut },
        ],
        tables: [{
          caption: "Choose by final destination",
          headers: ["Destination", "Options during the main Shabbat break", "Check first"],
          rows: [
            ["Central Tel Aviv", "Free Line 711, official taxi or confirmed transfer", "Bus time, Terminal 1 stop and last leg to the hotel"],
            ["Jerusalem", "Metered taxi, confirmed transfer or collectable rental car", "Final address and the first train after Shabbat"],
            ["Haifa", "Metered taxi, confirmed transfer or collectable rental car", "Travel time, luggage and car availability"],
            ["Ein Bokek / Dead Sea", "Confirmed direct ride or suitable rental car; taxi may be possible", "Exact resort address and long-distance quote"],
            ["Nazareth, Tiberias / Galilee", "Confirmed direct ride or suitable rental car; taxi may be possible", "Arrival time and accommodation access"],
          ],
        }],
        sourceIds: ["guide-weekend-711", "guide-iaa"],
      },
      {
        id: "restart",
        title: "When do trains and regular buses resume on Saturday?",
        photo: { src: airportRailPlatform, alt: "Train platform at Ben Gurion Airport railway station" },
        paragraphs: [
          "On Saturday evening, check the first train or bus actually scheduled for your date, direction and destination. Include time for arrivals and your final connection to the hotel. The official timetable links appear below, and my getting around Israel guide explains the wider network.",
          "Travelling to Ben Gurion Airport for a Saturday flight? Line 711 toward Shoham serves Terminal 1 when scheduled; the free airport shuttle then connects to Terminal 3. Plan enough time for airline check-in and security.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        sourceIds: ["israel-rail", "guide-weekend-711", "guide-iaa"],
      },
      {
        id: "practical",
        title: "Practical tips before you leave arrivals",
        paragraphs: [
          "Save your hotel’s address in English and Hebrew, your booking reference and any driver instructions offline. Ben Gurion Airport offers free Wi-Fi, and an Israel eSIM can help with navigation and messages after you leave the terminal. Confirm late check-in with your accommodation when relevant.",
          "Families with strollers or several large suitcases should think about every transfer between vehicles and the space available in a regular car. For an accessible Line 711 journey, Na'im Besofash asks passengers to coordinate with its service center at 03-7313911 at least three hours before the desired pickup. The airport's internal shuttle is described as accessible; check your complete onward route and ask about the specific vehicle you need.",
        ],
        inlineLinks: [{ text: "Israel eSIM", to: travelGuidePaths.esim }],
        sourceIds: ["guide-weekend-timetable", "guide-iaa"],
      },
    ],
    checklist: [
      "Check your exact Israeli Friday or Saturday arrival date and the last or first regular service",
      "For Line 711, verify the Terminal 1 stop 34609, direction and current departure",
      "Allow time to reach Terminal 1 by free airport shuttle after arriving at Terminal 3",
      "Keep your destination and meeting instructions saved offline, with mobile data available",
      "For a taxi, save the ride code, receipt and a backup payment method",
      "Confirm luggage, child-seat or accessibility needs ahead of any booked ride",
      "Check the last leg to your accommodation and any late hotel check-in",
    ],
    faqs: [
      { q: "Does Line 711 pick up directly at Terminal 3?", a: "No. It serves Terminal 1; follow the airport shuttle steps above and check the stop and direction on the operator's timetable." },
      { q: "When is the last Line 711 bus from the airport on Saturday?", a: "Check the current departure for Terminal 1 toward Tel Aviv. The advertised route-wide operating window is not the time of the last bus at the airport." },
      { q: "Is Line 711 suitable for passengers using wheelchairs?", a: "The operator requests accessible-trip coordination on 03-7313911 at least three hours before pickup. Confirm the complete route, including the terminal shuttle and your destination." },
      { q: "Is a taxi or private transfer cheaper to Jerusalem on Shabbat?", a: "Neither is always cheaper. Compare the estimated metered taxi fare with a written private-transfer quote for your exact pickup time, address, party and luggage." },
      { q: "Can I take a train after Shabbat ends?", a: "Possibly. Check the first actual departure for your Saturday date and route, allowing enough time to leave arrivals and make your final connection." },
      { q: "Can I travel to Ben Gurion Airport during Shabbat?", a: "Yes. Check Line 711 toward Shoham and the free transfer from Terminal 1 to Terminal 3, or arrange a licensed taxi or confirmed private ride." },
    ],
    sourceIds: ["guide-weekend-711", "guide-weekend-timetable", "guide-gett", "guide-iaa", "israel-rail", "taxi-fares-2026"],
    related: ["airportTaxis", "taxiFares", "arrival", "sherut"],
    services: [
      { label: "Explore car rental options", to: "/car-rental/", note: "Rental options and Saturday pickup arrangements." },
      { label: "Choose where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Find a neighbourhood that suits your plans." },
      { label: "Plan a visit to Jerusalem", to: "/travel-blog/jerusalem-travel-guide/", note: "Explore sights, routes and city highlights." },
      { label: "Discover Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Beaches, Masada and desert experiences." },
      { label: "Getting around Israel", to: travelGuidePaths.israel, note: "Trains, buses and journeys between cities." },
      { label: "Israel travel tips", to: travelGuidePaths.travelTips, note: "Essential advice for your visit to Israel." },
    ],
  },
  travelTips: {
    id: "travelTips", title: TRAVEL_TIPS_TITLE,
    description: TRAVEL_TIPS_DESCRIPTION,
    updatedAt: TRAVEL_TIPS_UPDATED,
    intro: "My practical guide to planning an Israel trip: start with entry and travel dates, arrange airport transport, choose a realistic route, and prepare for everyday life.",
    answer: "Check the official entry requirements for your passport, choose a manageable set of bases, and plan arrival and hotel changes around Shabbat and holidays. Then connect each day's real addresses, prepare mobile data and offline records, and confirm bookings and site access before relying on them. Use current official travel advice when deciding whether and where to travel.",
    topics: ["tips", "transportation", "destinations"], photo: travelTipsHero,
    facts: [],
    comparison: { caption: "Israel first-time travel tips", headers: [], rows: [] },
    sections: [],
    checklist: [],
    faqs: [...travelTipsFaqs],
    sourceIds: ["guide-entry", "guide-tourist-emergency", "guide-homefront-emergency", "guide-iaa", "guide-weekend-711", "israel-rail", "guide-public-transport-payments", "guide-telaviv-transit", "fx-bank-of-israel"], related: ["bestTime", "calendar", "arrival", "israel", "food", "topTen"],
    services: [{ label: "Accommodation by destination", to: "/accommodation/" }, { label: "Private airport transfers", to: "/airport-transfers/" }, { label: "Private driver for your itinerary", to: "/private-driver-in-israel/" }, { label: "Tours & day trips", to: "/tours/" }],
  },
  jerusalem: {
    id: "jerusalem", title: "Jerusalem travel guide: Old City sights and itinerary ideas",
    description: "Plan a Jerusalem visit with Old City highlights, Mount of Olives, museums, markets and practical itinerary routes, hotels and day trips.",
    intro: "Plan Jerusalem by area and interest. A rewarding visit leaves time for its streets and neighbourhoods as well as the landmarks on your list.",
    answer: "For a first visit, consider two or three days as a planning starting point: an Old City day, a museum/market day and time for a hillside or neighbourhood that interests you. With one day, choose a focused route. Base yourself around the places you will visit and check Shabbat, religious-site access and reservations for your exact dates.",
    topics: ["destinations", "attractions", "tips", "religion"], photo: { src: "/images/travel-blog/featured-jerusalem-travel-guide.webp", alt: "Jerusalem Old City framed by the window of Dominus Flevit Church" },
    facts: [{ label: "Planning starting point", text: "Two or three days; more for specialist interests or excursions" }, { label: "On foot", text: "Stone surfaces, hills and steps affect the route" }, { label: "Hotel choice", text: "Match neighbourhood, vehicle access and walking distance" }],
    comparison: { caption: "Choose an area for each part of your Jerusalem visit", headers: ["Area", "Why include it", "Plan around"], rows: [["Old City", "Sacred sites, historic streets and markets", "Access, worship, queues and uneven walking"], ["Mount of Olives / Kidron", "Views and Christian pilgrimage sites", "Slopes, site windows and a workable route"], ["City centre / Mahane Yehuda", "Market food and everyday city life", "Separate stall and restaurant hours"], ["Museum areas", "Art, archaeology and city history", "Reservations, interests and time inside"], ["German Colony / Ein Karem", "Neighbourhood atmosphere or a separate church visit", "Travel time beyond the Old City"]] },
    sections: [
      { id: "first-itinerary", title: "How many days should you allow?", paragraphs: ["I recommend two or three days for a first Jerusalem visit. With one day, focus on one main area and a few priorities. Extra nights give you room for museums, neighbourhood walks or a day outside the city.", "Choose your dates with the religious calendar in mind. Shabbat, feast days and major events can change transport, worship arrangements and opening windows. Leave a flexible slot instead of fixing every hour before checking those details."], sourceIds: [] },
      { id: "old-city", title: "Start with the Old City", paragraphs: ["Plan a route through the quarters around the places you most want to see: the Western Wall area, Church of the Holy Sepulchre, historic lanes and markets are different experiences within a compact but intricate city. Access to individual religious compounds has its own rules; being able to walk through a quarter does not grant entry everywhere.", "Allow for stone surfaces, steps, security checks and queues. Agree an accessible entrance or permitted vehicle drop-off with your accommodation or guide if mobility and luggage matter. A map's shortest line is not necessarily the easiest walking route."], sourceIds: ["guide-jerusalem-tourism", "guide-holy-sepulchre"] },
      { id: "hillsides-and-heritage", title: "Add the Mount of Olives, Mount Zion or Ein Karem", paragraphs: ["The Mount of Olives offers viewpoints and church visits above the Kidron Valley; Mount Zion lies beside the Old City and includes Dormition Abbey and the Cenacle. Treat the hills, crossings and visit windows as part of the itinerary, not empty space between attractions.", "Ein Karem is a separate neighbourhood outing, useful for the Visitation and St John the Baptist churches and time in the village. My churches guide groups the sites by area so you can choose a coherent route instead of trying to reach every shrine in one day."], sourceIds: [] },
      { id: "museums-and-market", title: "Balance museums with market life", paragraphs: ["Choose museums by interest: the Israel Museum for art and archaeology, the Tower of David for Jerusalem's story, or Yad Vashem for Holocaust remembrance. Check the chosen institution's booking, age and visit conditions before planning the rest of the day around it.", "Mahane Yehuda adds food, shopping and a different neighbourhood atmosphere. Market stalls and evening venues have different rhythms. Combine nearby city-centre stops and use the shopping guide to decide where browsing fits your route."], sourceIds: ["guide-jerusalem-tourism", "guide-mahane-yehuda"], photo: photos.market },
      { id: "staying-and-arriving", title: "Choose your base and plan the last leg", paragraphs: ["Mamilla and the city centre can suit an Old City-focused stay; Mahane Yehuda/Nachlaot can suit market life; the German Colony offers a different neighbourhood setting. Inside the Old City, check access, steps, vehicle drop-off and reception arrangements particularly carefully.", "Use my accommodation comparison for detailed area choices. For airport arrival, check the train against the actual date and include the journey from the station, or agree a direct transfer. Do not plan from a generic weekday schedule when arriving on Shabbat."], sourceIds: ["israel-rail"] },
      { id: "beyond-city", title: "Keep day trips separate from your city days", paragraphs: ["A Dead Sea day, a Tel Aviv/Jaffa visit and a long northern excursion use very different amounts of travelling time. Choose an excursion around a main interest and your return plans rather than adding it to an already full Old City itinerary.", "For Bethlehem, confirm the operator's actual itinerary, document conditions and transport arrangements. A booking for Jerusalem or a rental car does not by itself establish that every onward route can be undertaken."], sourceIds: [] },
    ],
    checklist: ["Choose your top interests before choosing a hotel", "Group Old City, hillside and neighbourhood visits sensibly", "Check site reservations, worship and visitor windows", "Prepare for hills, steps and exact vehicle access", "Plan Shabbat meals and transport together", "Keep a day trip distinct from your city sightseeing"],
    faqs: [{ q: "Can I see Jerusalem on a day trip?", a: "You can make a focused visit, especially to the Old City and one nearby area. Overnight stays allow more time for museums, markets, evening atmosphere and different neighbourhoods." }, { q: "Is Jerusalem walkable?", a: "Many central sights can be combined on foot, but hills, steps and stone surfaces matter. Check the whole route and individual access arrangements for mobility needs." }, { q: "Where should a first-time visitor stay?", a: "Compare Mamilla/city centre, Old City surroundings, Mahane Yehuda/Nachlaot and the German Colony against your priorities. Use the area guide for the trade-offs and exact hotel-access questions." }],
    sourceIds: ["guide-jerusalem-tourism", "guide-holy-sepulchre", "guide-mahane-yehuda", "israel-rail"], related: ["jerusalemChurches", "jerusalemShopping", "jerusalemDeadSea", "travelTips", "shabbat"],
    services: [{ label: "Compare Jerusalem hotel areas", to: "/travel-blog/where-to-stay-in-jerusalem/" }, { label: "Private airport transfer to Jerusalem", to: "/airport-transfers/jerusalem/" }, { label: "Private driver for a planned day", to: "/private-driver-in-israel/" }, { label: "Compare Bethlehem & Jericho tours", to: "/tours/bethlehem-jericho-jordan-river/" }],
  },
  jerusalemDeadSea: {
    id: "jerusalemDeadSea", title: "Jerusalem to the Dead Sea: bus, car, tour or private driver?",
    description: "Jerusalem to the Dead Sea: compare buses, tours, rental cars and private drivers to Ein Bokek, Ein Gedi and Masada, with return-trip tips.",
    intro: "The Dead Sea is a region, not one destination. Start with the beach or hotel you actually want, then decide how to reach it and get back.",
    answer: "For a Jerusalem-to-Dead-Sea trip, choose the exact beach, hotel or attraction before comparing a tour, private driver, public bus or rental. Northern-shore stops and Ein Bokek are different journeys; Ein Gedi Nature Reserve and Masada are separate visits. Check access, facilities, date-specific transport and the return before committing to a day plan.",
    topics: ["transportation", "destinations", "itineraries"], photo: airportTransferPhotos["dead-sea"]!,
    facts: [{ label: "Specify the destination", text: "A named beach/hotel, not only ‘Dead Sea’" }, { label: "Separate experiences", text: "Beach time, Ein Gedi hiking and Masada each need time" }, { label: "Return journey", text: "Plan it before leaving Jerusalem" }],
    comparison: { caption: "Choose how to reach the Dead Sea from Jerusalem", headers: ["Option", "What it can suit", "Main checks"], rows: [["Organised tour", "A set itinerary with arranged transport", "Actual beach, entry, guiding and pickup"], ["Private driver", "A tailored route or hotel transfer", "Full quote, stops, waiting and return"], ["Public bus", "A trip that fits operating connections", "Exact stop, walking distance and last return"], ["Rental car", "An independent wider itinerary", "Rental terms, parking, road and access notices"]] },
    sections: [
      { id: "choose-shore", title: "Which part of the Dead Sea do you mean?", paragraphs: ["A northern-shore beach is not the same destination as Ein Bokek's southern hotel and beach area. A single distance or driving-time claim for ‘the Dead Sea’ can therefore be misleading. Give the full beach/hotel name when asking for transport.", "Ein Gedi Nature Reserve is a hiking destination, not a guarantee of a place to float. Masada is an archaeological visit with its own access and entry arrangements. Choose one main experience and add another only when the timetable leaves enough usable time."], sourceIds: ["guide-jerusalem-deadsea", "guide-ein-gedi"] },
      { id: "tour-or-driver", title: "Compare a tour with a private driver", paragraphs: ["Read a tour's actual inclusions: which beach, how long there, whether admission and guiding are included, and where you are collected. Do not assume a lunch, hotel pickup or every attraction shown in a promotional photograph is included.", "For a private driver, list the stops in order and say whether you need a one-way hotel transfer or a full return day. Ask about waiting, included hours, parking, entrance tickets, changes and the total. A driver-only quote does not automatically include a licensed guide."], sourceIds: [] },
      { id: "public-bus", title: "Can I go by public bus?", paragraphs: ["Use the current journey planner for Jerusalem Central Bus Station and the exact beach, hotel or attraction stop. Published guides describe a bus corridor along the Dead Sea, but route numbers, stopping patterns and fares are not a substitute for a date-specific result.", "Check the walk from the stop, shade and the last return departure before choosing this option. A bus passing the region does not establish easy access to a particular shoreline. Check Shabbat and holiday service explicitly and keep a workable return alternative."], sourceIds: ["guide-jerusalem-deadsea", "guide-bus-planner"] },
      { id: "driving-and-stops", title: "Driving and combining stops", paragraphs: ["Build the trip around actual road and site conditions rather than the map distance alone. Check rental-use terms, parking and any current route or weather restrictions. Do not add an unplanned shoreline shortcut or an unmarked access path.", "A Masada-and-beach day needs time for both visits and the drive between them. Add Ein Gedi or a baptismal-site visit only after checking each site's current access and your available hours. Fewer well-chosen stops can produce a better day than a long list with no time to use them."], sourceIds: ["guide-ein-gedi", "guide-qasr"] },
      { id: "beach-plan", title: "Prepare for the beach you are actually visiting", paragraphs: ["Check the chosen beach's facilities, operating status, admission arrangements and permitted bathing area. Bring a towel, suitable footwear, dry clothes, water and sun protection. Follow the posted bathing and staff instructions; do not infer a safe or permitted entry point from an old photo.", "Keep the transport meeting point and return time handy. If you want a resort day package or an overnight stay, check those terms separately from public beach access and from your transport quote."], sourceIds: [] },
    ],
    checklist: ["Name the exact beach, hotel or attraction", "Separate entry/facility costs from transport", "Check current access, weather and site notices", "Leave time between the chosen stops", "Confirm the final bus or prearranged return", "Pack for the beach and keep pickup details offline"],
    faqs: [{ q: "How long is the trip from Jerusalem to the Dead Sea?", a: "It depends on the exact destination and traffic. Northern-shore beaches, Ein Gedi, Masada and Ein Bokek are different journeys. Compare the actual address and full round trip rather than one generic regional estimate." }, { q: "Is Ein Gedi a Dead Sea bathing beach?", a: "The nature reserve is a separate hiking visit. Do not treat its name, a nearby bus stop or older spa advice as confirmation of a currently accessible bathing beach." }, { q: "Can I do Masada, Ein Gedi and the beach in one day?", a: "Ask for a realistic itinerary with current access, entry windows and travel time between stops. Choose a main focus and drop an extra stop if the resulting time on site would be too short." }],
    sourceIds: ["guide-jerusalem-deadsea", "guide-ein-gedi", "guide-qasr"], related: ["jerusalem", "baptism", "israel", "shabbat"],
    services: [{ label: "Request a private-driver itinerary", to: "/private-driver-in-israel/" }, { label: "Masada visitor guide", to: "/attractions/masada/" }, { label: "Dead Sea hotels and areas", to: "/travel-blog/best-dead-sea-hotels/" }, { label: "Car rental", to: "/car-rental/" }, { label: "Tours & day trips", to: "/tours/" }],
  },
  baptism: {
    id: "baptism", updatedAt: "2026-11-21", title: "Baptism in the Jordan River: Yardenit vs. Qasr el-Yahud",
    description: "My practical Jordan River baptism guide: compare Yardenit and Qasr el-Yahud, arrange clergy and robes, check access, and plan your Holy Land tour or private driver.",
    intro: "If you are planning a baptism or a Jordan River visit, I can help you compare Yardenit and Qasr el-Yahud, prepare for the ceremony and choose suitable transport.",
    answer: "Yardenit, south of the Sea of Galilee, and Qasr el-Yahud on the lower Jordan near Jericho are different places on the same river. Yardenit offers an established visitor and baptism facility; Qasr el-Yahud is associated with the traditional baptism location in the lower Jordan. Confirm access and ceremony arrangements with the chosen site and your clergy before arranging transport.",
    topics: ["religion", "attractions", "itineraries"], photo: { src: "/images/travel-blog/featured-jordan-baptism.webp", alt: "Baptism ceremony at Yardenit on the Jordan River" },
    facts: [{ label: "Yardenit", text: "Galilee, beside the southern Sea of Galilee" }, { label: "Qasr el-Yahud", text: "Lower Jordan near Jericho, far from Yardenit" }, { label: "Ceremony", text: "Agree clergy, timing and site requirements separately" }],
    reviewNote: "Yardenit's own pages currently display different hour sets. Confirm your visit window and last permitted baptism directly instead of relying on one copied timetable. Historical photographs do not establish present access or water conditions.",
    comparison: { caption: "Choose the Jordan River baptism site", headers: ["Site", "Itinerary context", "Confirm"], rows: [["Yardenit", "Sea of Galilee, Tiberias or a Galilee pilgrimage", "Clergy, robe policy, ceremony window and facilities"], ["Qasr el-Yahud", "Jerusalem, Jericho or a planned lower-Jordan journey", "Current access, permitted activity and ceremony arrangements"], ["A ceremonial visit", "A dedicated appointment rather than a quick photo stop", "Your church's requirements and the complete visit duration"]] },
    sections: [
      { id: "choose-site", title: "These are two distinct places", paragraphs: ["Yardenit lies beside the Jordan's southern outlet from the Sea of Galilee. Qasr el-Yahud lies much farther south near Jericho. Do not book a pickup using only ‘Jordan River baptism’: the name can conceal a substantial difference in route and travel time.", "Distinguish religious tradition from a claim of historical certainty. Qasr el-Yahud is connected with the traditional lower-Jordan baptism setting; choosing Yardenit can reflect its facilities and fit with a Galilee itinerary. Discuss the location with the person leading your ceremony."], sourceIds: ["guide-yardenit", "guide-qasr"] },
      { id: "yardenit-visit", title: "Planning a visit to Yardenit", paragraphs: ["The operator describes designated river access and visitor facilities, including changing arrangements and robes. It requires the specified white baptismal robes for baptism; check current rental/purchase terms and what you should bring.", "Contact the site and your clergy about a personal or group ceremony. Admission and facilities do not by themselves arrange a minister, sacrament or certificate for your denomination. Confirm the actual visit and ceremony cut-off times, particularly because the site's published pages show differing hours."], sourceIds: ["guide-yardenit", "guide-yardenit-about"] },
      { id: "qasr-visit", title: "Planning a visit to Qasr el-Yahud", paragraphs: ["Use the Nature and Parks Authority's site information and current instructions for the lower-Jordan location. Confirm access and the activity you intend before setting out; an online description or an old tour itinerary is not confirmation that the river access will be available on your date.", "Tell the transport operator the precise site, the ceremony time and how long the group needs. Agree a meeting and return plan. Do not treat this stop as interchangeable with Yardenit or add it to a packed day without checking the route and usable time."], sourceIds: ["guide-qasr"], photo: photos.qasr },
      { id: "ceremony-and-kit", title: "Agree the ceremony and prepare practical items", paragraphs: ["Speak with your church leader about the form of service, language, participants and any documentation. Coordinate group size and arrival with the site; ask who is responsible for any ceremony-related booking and charges.", "Bring a towel, dry clothes, suitable footwear and a way to keep valuables dry. Follow staff instructions and use only the designated areas. Ask specifically about steps, changing facilities and assistance if anyone has mobility needs; do not infer accessible river entry from a photo."], sourceIds: ["guide-yardenit", ] },
      { id: "baptism-itinerary", title: "Build the day around the appointment", paragraphs: ["For Yardenit, consider which Galilee stops matter most rather than combining every church around the lake. For Qasr el-Yahud, evaluate the actual lower-Jordan route and any additional stop separately.", "A private driver can be asked to quote transport and waiting; guiding and ceremony services need their own confirmation. Share the appointment, exact pickup address, passenger count and bags so that transport supports the visit rather than dictating it."], sourceIds: [] },
    ],
    checklist: ["Agree Yardenit or Qasr el-Yahud by name", "Coordinate with your clergy and the actual site", "Confirm access, visiting and last-baptism times", "Check robe, changing, fee and documentation arrangements", "Pack towel, dry clothes and suitable footwear", "Confirm mobility needs and designated river access", "Give your driver the appointment and return plan"],
    faqs: [{ q: "Are Yardenit and Qasr el-Yahud the same site?", a: "No. Yardenit is in the Galilee near the Sea of Galilee; Qasr el-Yahud is on the lower Jordan near Jericho. Choose the exact location before booking transport." }, { q: "Does a transport booking include baptism or clergy?", a: "No assumption should be made. Arrange the service with your clergy and the site, then confirm separately what any transport, guide or ceremony package includes." }, { q: "Where can I confirm baptism-site robe prices and opening times?", a: "Confirm directly with the site. Yardenit's published pages have differed on visiting hours; check current robe, ceremony and access arrangements before travelling." }],
    sourceIds: ["guide-yardenit", "guide-yardenit-about", "guide-qasr"], related: ["yardenit", "qasr", "jerusalemChurches", "jerusalemDeadSea", "travelTips"],
    services: [{ label: "Private driver for a planned pilgrimage route", to: "/private-driver-in-israel/" }, { label: "Tiberias and Sea of Galilee hotel guide", to: "/travel-blog/best-hotels-in-tiberias/" }, { label: "Haifa shore excursions", to: "/shore-excursions/haifa/" }, { label: "Ashdod shore excursions", to: "/shore-excursions/ashdod/" }],
  },
  jerusalemChurches: {
    id: "jerusalemChurches", updatedAt: "2026-11-21", title: "Churches in Jerusalem: Holy Sepulchre, Mount of Olives and more",
    description: "Plan Jerusalem church visits by Old City, Mount of Olives, Mount Zion and Ein Karem. Check walking routes, worship and visitor access.",
    intro: "Choose a meaningful route through living places of worship. Their geography, traditions and visitor arrangements matter as much as the number of churches on your list.",
    answer: "Group Jerusalem church visits into the Old City, Mount of Olives/Kidron Valley, Mount Zion and Ein Karem. Start with the sites important to your interests or pilgrimage, then check each site's own visitor and worship windows. Do not use one church's opening hours or one universal entrance-fee rule for every location.",
    topics: ["religion", "attractions", "destinations"], photo: { src: "/images/travel-blog/featured-jerusalem-churches.webp", alt: "Jerusalem churches and religious architecture" },
    facts: [{ label: "Four clusters", text: "Old City, Mount of Olives, Mount Zion, Ein Karem" }, { label: "Worship first", text: "A visitor opening is not permission to join every service" }, { label: "Walking", text: "Allow for slopes, stairs, stone surfaces and queues" }],
    comparison: { caption: "Choose a Jerusalem church-visiting route", headers: ["Area", "Key places", "Planning issue"], rows: [["Old City", "Holy Sepulchre and Via Dolorosa", "Lanes, queues and shared worship spaces"], ["Mount of Olives / Kidron", "Gethsemane, Dominus Flevit and neighbouring churches", "Steep terrain and separate visiting windows"], ["Mount Zion", "Dormition Abbey, Cenacle and Gallicantu", "Individual access and entry arrangements"], ["Ein Karem", "Visitation and St John the Baptist", "Separate journey and hillside walking"]] },
    sections: [
      { id: "old-city-churches", title: "Old City: Holy Sepulchre and the Via Dolorosa", paragraphs: ["The Church of the Holy Sepulchre is central to Christian traditions of Jesus' crucifixion, burial and resurrection. Its different spaces and communities require time and respectful attention. The Via Dolorosa is a route through the Old City, not a single church visit.", "Other possible stops include St Anne's, the Lutheran Church of the Redeemer and the Armenian Cathedral of St James. Check whether the particular church, archaeological area, tower or service is open to visitors; one admission arrangement does not cover every part."], sourceIds: ["guide-holy-sepulchre", ] },
      { id: "mount-olives", title: "Mount of Olives and the Kidron Valley", paragraphs: ["The Church of All Nations and Garden of Gethsemane lie near the foot of the hill, close to the Tomb of the Virgin Mary. Higher on the slope, Dominus Flevit is associated with Jesus weeping over Jerusalem. Pater Noster, the Church of Mary Magdalene and the Chapel of the Ascension are additional distinct visits.", "A downhill route can reduce climbing for some visitors, but it still involves steep or uneven stretches. Choose the sites with compatible visit windows; restricted hours at one church can shape the whole route. Arrange a suitable drop-off and pickup if walking the hillside is not appropriate for your party."], sourceIds: [] },
      { id: "mount-zion", title: "Mount Zion: Dormition, the Cenacle and Gallicantu", paragraphs: ["Dormition Abbey is associated with the tradition of Mary's dormition; the Cenacle with the Last Supper and Pentecost; St Peter in Gallicantu with Peter's denial. These are separate places with different custodians and practical arrangements.", "Combine the stops that matter to you with an Old City route only when there is time for the walk, steps and the visit itself. Ask permission for organised prayer or a ceremony rather than assuming a visitor ticket or open door authorises it."], sourceIds: [] },
      { id: "ein-karem", title: "Ein Karem: a separate neighbourhood outing", paragraphs: ["The Church of the Visitation and Church of St John the Baptist are associated with traditions around Mary, Elizabeth and John the Baptist. Ein Karem sits away from the Old City clusters, so allow a separate journey and time in the neighbourhood.", "Check the approach to each church: hillside walks, steps and visiting breaks can affect the order of your day. A quick transport stop is not necessarily enough for both churches and a meal."], sourceIds: [] },
      { id: "church-visit-plan", title: "How to plan a respectful and workable visit", paragraphs: ["Cover shoulders and knees as a useful starting point and follow any more specific dress instructions. Ask about photography, keep voices low and leave room for worshippers. Religious calendars and events can change visitor access or create queues.", "For a pilgrimage, build the route around a few priorities and ask a licensed guide for the context you want. Check actual opening windows, entry requirements and mobility access with the responsible site. The old guide's blanket fees, taxi prices and minute-by-minute schedules are not a reliable booking plan."], sourceIds: ["guide-holy-sepulchre", "guide-jerusalem-tourism"] },
    ],
    checklist: ["Choose your priorities and geographic cluster", "Check each site's own visitor and worship arrangements", "Prepare appropriate dress and follow photography instructions", "Include queues, steps and steep walking in the route", "Confirm guiding and ceremony permissions separately", "Save the exact pickup/meeting point and a shorter alternative"],
    faqs: [{ q: "Can I visit every major church in one day?", a: "A full checklist can leave little time on site and may conflict with different visit windows. Choose one or two geographic clusters and the sites most important to you." }, { q: "Are all churches free and open all day?", a: "No universal rule applies. Churches, archaeological areas, towers and special visits can have different terms, breaks and charges. Check the actual place rather than relying on a general list." }, { q: "Can I join services or arrange group prayer?", a: "Ask the responsible church or organiser about permission, timing, language and group arrangements. Ordinary visitor access does not settle those questions." }],
    sourceIds: ["guide-holy-sepulchre", "guide-jerusalem-tourism"], related: ["jerusalem", "baptism", "jerusalemShopping", "travelTips"],
    services: [{ label: "Choose a Jerusalem hotel area", to: "/travel-blog/where-to-stay-in-jerusalem/" }, { label: "Plan transport with a private driver", to: "/private-driver-in-israel/" }, { label: "Compare Bethlehem & Jericho tours", to: "/tours/bethlehem-jericho-jordan-river/" }, { label: "Airport transfer to Jerusalem", to: "/airport-transfers/jerusalem/" }],
  },
  jerusalemShopping: {
    id: "jerusalemShopping",
    updatedAt: "2026-11-20",
    title: "Shopping in Jerusalem: Markets, Crafts, Malls & Local Streets",
    description: "My guide to ten Jerusalem shopping areas, including Mahane Yehuda, Old City markets, Mamilla, Malha, the Cardo and Friday's Bezalel Arts Fair, with a map and practical tips.",
    intro: "From Mahane Yehuda and the Old City souks to modern stores and local arts fairs, my guide will help you choose where to shop and what to combine.",
    answer: "I suggest Mahane Yehuda for food, the Old City for traditional souvenirs, Mamilla for brands, Malha for indoor shopping and Hutzot Hayotzer for artisan gifts. Check current dates for the Friday Bezalel Arts Fair.",
    topics: ["shopping", "destinations", "tips"],
    photo: { src: jerusalemShoppingFeature, alt: "Traditional market stalls along a stone passage in Jerusalem's Old City" },
    facts: [
      { label: "10 places", text: "Markets, shopping streets, workshops and a mall" },
      { label: "Central picks", text: "Mahane Yehuda, Old City, Mamilla and Ben Yehuda" },
      { label: "Plan your visit", text: "Check Friday, Shabbat and fair opening times" },
    ],
    comparison: {
      caption: "Ten places to shop in Jerusalem",
      headers: ["Place", "Best for", "Area", "When to go"],
      rows: shoppingPlaces.map(place => [place.name, place.bestFor, place.area, place.when]),
    },
    sections: shoppingPlaces.map(place => ({
      id: "shop-" + place.id,
      title: place.name,
      paragraphs: [place.description, place.practical, place.gettingThere],
      ...(place.id === "mahane"
        ? { inlineLinks: [{ text: "Mahane Yehuda", to: "/accommodation/jerusalem/mahane-yehuda-nachlaot/" as const }] }
        : {}),
    })),
    checklist: [
      "Choose your shopping area and what you want to buy",
      "Check Friday, Shabbat and festival dates for your visit",
      "Ask about origin, materials, final prices and return terms",
      "Check tourist VAT eligibility and required paperwork before purchase",
      "Plan a practical walking route and return journey with shopping bags",
    ],
    faqs: [
      { q: "Where is the best place to buy souvenirs in Jerusalem?", a: "I would start in the Old City for traditional souvenirs, the Cardo for Judaica and art, or Hutzot Hayotzer for original work." },
      { q: "Where is best for indoor shopping?", a: "Malha Mall is an enclosed shopping centre with multiple retailers, outside the historic centre." },
      { q: "Is shopping open on Shabbat?", a: "Many city-centre shops close. The First Station has Saturday dining and cultural activities, while its shopping page lists Saturday shopping hours of 18:00–22:00." },
      { q: "Can I claim VAT back?", a: "Eligible visitors can claim qualifying purchases from participating retailers under the Israel Tax Authority's rules." },
      { q: "Can I bargain in Jerusalem?", a: "Some market sellers welcome polite bargaining, while fixed-price stores and galleries work differently." },
      { q: "When is the Bezalel Arts Fair?", a: "It is associated with Fridays on Bezalel and Shatz pedestrian streets. Verify this week's schedule." },
    ],
    sourceIds: ["guide-jerusalem-shopping", "guide-mahane-yehuda", "guide-first-station"],
    related: ["jerusalem", "food", "calendar", "israel"],
    services: [
      { label: "Old City walking guide", to: "/attractions/old-city-jerusalem/" },
      { label: "Mahane Yehuda & Nachlaot hotels", to: "/accommodation/jerusalem/mahane-yehuda-nachlaot/" },
      { label: "Where to stay in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
      { label: "Food and market tours", to: "/tours/food-market-tours/" },
      { label: "Jerusalem tours", to: "/tours/jerusalem/" },
      { label: "Israel's calendar of events", to: "/travel-blog/calendar-of-events/" },
    ],
  },
} satisfies Record<string, TravelGuide>;
