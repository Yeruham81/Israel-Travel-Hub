import type { GuidePhoto, TravelGuide } from "@/data/travelGuides";
import { TRAVEL_TIPS_TITLE, TRAVEL_TIPS_DESCRIPTION, TRAVEL_TIPS_UPDATED, travelTipsFaqs, travelTipsHero } from "@/data/israelTravelTips";
import { jerusalemShoppingPlaces as shoppingPlaces } from "@/data/jerusalemShopping";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { travelGuidePaths } from "@/data/registry";
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
    intro: "Landing on Friday or Saturday? Here is how to leave Ben Gurion Airport when regular public transport is limited, where to find the free weekend bus and what to arrange before your flight.",
    answer: "Ben Gurion Airport stays open on Shabbat, but most regular trains and buses stop for part of Friday and Saturday. Limited free weekend Line 711 serves central Tel Aviv from Terminal 1, if its timetable fits your arrival. Official airport taxis run 24 hours a day, while an advance-confirmed private transfer is an alternative for a direct journey, groups or other destinations. Check the actual first Saturday-night train before deciding to wait.",
    topics: ["transportation", "tips"],
    updatedAt: "2026-11-11",
    photo: {src: "/images/travel-blog/featured-shabbat-airport.webp", alt: "Road and airport travel during Shabbat near Ben Gurion Airport"},
    facts: [
      { label: "Free option", text: "Line 711: Terminal 1 to central Tel Aviv at limited weekend times" },
      { label: "Direct ride", text: "Authorized airport taxis operate 24/7; regulated meter and official queue" },
      { label: "After Shabbat", text: "Look up the first actual train or bus for your route and date" },
    ],
    comparison: {
      caption: "Shabbat transport options at a glance",
      headers: ["Option", "Best for", "Cost and limitation"],
      rows: [
        ["Free bus 711", "Flexible travelers staying near a central Tel Aviv stop", "Free; limited departures, Terminal 1 only, not door to door"],
        ["Official airport taxi", "Direct travel without advance arrangements", "Regulated metered fare; queues and vehicle availability vary"],
        ["Pre-booked private transfer", "Families, larger groups, extra bags or longer journeys", "Written quote; vehicle and pickup must be confirmed"],
        ["Rental car", "Beginning a road trip", "Rental, fuel and parking; verify Saturday collection in writing"],
        ["Wait for trains or buses", "Saturday evening arrivals with a workable connection", "Regular ticket fare; check first actual departure and last-mile travel"],
      ],
    },
    sections: [
      {
        id: "shabbat-hours",
        title: "What changes at Ben Gurion Airport on Shabbat?",
        paragraphs: [
          "Flights continue during an ordinary Shabbat, but Israel Railways and most regular buses stop before Shabbat on Friday and resume on different schedules on Saturday evening. Shabbat times change every week, and a Friday flight landing before sunset may still arrive too late for the last train.",
          "This guide also helps plan ground transport around many Jewish holidays, but service arrangements can differ by holiday and should not be assumed to match the Saturday timetable. Yom Kippur is a special exception, with major restrictions on airport flight operations; check the Israel Airports Authority and your airline before planning any Yom Kippur travel.",
          "Plan from the time you expect to clear passport control, collect your luggage and leave the terminal, not only from your scheduled landing. See my Ben Gurion Airport arrival tips for those steps. You can check local Shabbat start and end times using the link below, but those are not railway operating times.",
        ],
        inlineLinks: [{ text: "Jewish holidays", to: "/travel-blog/calendar-of-events/" }, { text: "Ben Gurion Airport arrival tips", to: travelGuidePaths.arrival }],
        sourceIds: ["israel-rail", "guide-iaa"],
      },
      {
        id: "arrival-time",
        title: "Which option suits your arrival time?",
        paragraphs: [
          "Your arrival window matters as much as your destination. If you land late on Saturday, waiting for a confirmed public-transport departure might make sense; on Friday evening or Saturday daytime, the options are different. Always check the exact timetable for your own date.",
        ],
        tables: [{
          caption: "Plan by when your flight arrives",
          headers: ["Arrival window", "First thing to check"],
          rows: [
            ["Friday, before Shabbat", "The final train or regular bus after allowing for immigration, bags and walking to the stop"],
            ["Friday evening or late night", "Whether Line 711 serves your Terminal 1 stop at a useful time; otherwise a taxi or booked transfer"],
            ["Saturday morning or afternoon", "Line 711 for central Tel Aviv, or a direct ride to your destination"],
            ["Saturday evening", "The first actual train or regular bus and the last connection to your accommodation"],
          ],
          note: "Friday and Saturday service varies with season, destination and holidays.",
        }],
        sourceIds: ["israel-rail", "guide-weekend-timetable"],
      },
      {
        id: "weekend-711",
        title: "Free weekend bus 711: Ben Gurion Airport to Tel Aviv",
        paragraphs: [
          "The free Na'im Besofash Line 711 connects Shoham and central Tel Aviv via Ben Gurion Airport Terminal 1. The current published route-wide hours are Friday 17:30 to 01:30 overnight and Saturday 10:30 to 18:30, roughly every two hours. Winter and summer operating hours may differ. These are not departures from the airport stop: check the current Line 711 timetable for Terminal 1 in the Tel Aviv-bound direction on your actual date.",
          "The airport stop is Ben Gurion Airport / Terminal 1 (stop 34609). In Tel Aviv, the route serves areas around HaRakevet Street, Rothschild Boulevard, Habima Square, Dizengoff Center and the Tel Aviv Museum. Choose the stop closest to your accommodation.",
          "Line 711 is not timed to flights or door to door; leave time for bags, the terminal transfer and any final ride or walk. Holiday schedules may differ from the usual Friday and Saturday service.",
        ],
        sourceIds: ["guide-weekend-711", "guide-weekend-timetable", "guide-711-hours"],
      },
      {
        id: "terminal-transfer",
        title: "How to reach bus 711 from Terminal 3",
        paragraphs: [
          "The airport's free inter-terminal shuttle operates approximately every 15 minutes, around the clock including Shabbat, according to the Israel Airports Authority. If you arrive at Terminal 3, allow time for the transfer to Terminal 1; the three steps below show where to go.",
          "The internal shuttle and city-bound Line 711 are different services with separate stops. If the airport bus departure is too close to your expected time out of arrivals, have a backup.",
        ],
        sourceIds: ["guide-iaa", "guide-weekend-711"],
      },
      {
        id: "taxis-transfers",
        title: "Official taxis and private transfers on Shabbat",
        paragraphs: [
          "Authorized airport taxis operate 24 hours a day on Shabbat and use the regulated meter. For an immediate taxi, obtain a ride code through Gett or an airport self-service kiosk, then join the official queue at Terminal 3 ground-floor Exit 03 (or the main arrivals exit at Terminal 1). You do not need the Gett app if you use the kiosk, and the code does not let you skip the queue. My official Ben Gurion Airport taxi guide explains the pickup procedure.",
          "Gett lists cash, card and in-app payment for its authorized airport taxis. A scheduled Gett ride is separate from the on-demand queue: book through the app at least two hours before pickup and follow the confirmation to Terminal 3 Level 2, Exit 23.",
          "A separately booked private transfer has its own agreed meeting point, vehicle and price. When contacting me, include your flight number, final address, passenger count, luggage and any child-seat or accessibility needs. Ask about waiting, payment and cancellation before confirming. You can also compare private airport-transfer options.",
        ],
        inlineLinks: [
          { text: "official Ben Gurion Airport taxi guide", to: travelGuidePaths.airportTaxis },
          { text: "private airport-transfer options", to: "/airport-transfers/" },
        ],
        sourceIds: ["guide-gett", "guide-iaa", "taxi-fares-2026"],
      },
      {
        id: "costs",
        title: "How much does it cost to leave the airport on Shabbat?",
        paragraphs: [
          "Line 711 is free. The estimated taxi prices below are based on Israel's official April 2026 taxi tariff and reflect typical travel during Shabbat. They are not fixed quotes for every pickup hour or address. For detailed meter rules and possible extra charges, see my Israeli taxi fares guide.",
        ],
        tables: [{
          caption: "Approximate taxi prices and travel times from Ben Gurion Airport",
          headers: ["Destination", "Approx. taxi fare", "Typical driving time"],
          rows: [
            ["Tel Aviv", "₪180–230", "30–40 min"],
            ["Jerusalem", "₪310–410", "45–65 min"],
            ["Haifa", "₪670–830", "75–105 min"],
          ],
          note: "These are general estimates, not fixed fares. The final price and driving time can vary with your destination, pickup time, traffic and route.",
        }],
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
          "Line 711 serves central Tel Aviv, but not individual hotels. For the last leg, see my Ben Gurion Airport to Tel Aviv guide. The table below compares options during the main Shabbat transport break; my Ben Gurion Airport to Jerusalem guide, Ben Gurion Airport to Haifa guide and Ben Gurion Airport to Ein Bokek guide explain those routes in more detail.",
          "There is no regular walk-up airport sherut service to Tel Aviv, Jerusalem or Haifa. The former Nesher and Amal airport services are no longer offered as regular walk-up connections, although outdated references remain online. My sherut guide covers other shared-taxi routes in Israel.",
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
        title: "When do trains and regular buses restart on Saturday?",
        paragraphs: [
          "For a Saturday evening arrival, check the first actual train or bus for your date and destination, not a general time after sunset. Allow for immigration, luggage and the final connection to your accommodation. If that connection is too tight, a taxi or confirmed transfer may be simpler. The official timetable links are below, and my getting around Israel guide explains the wider network.",
          "Traveling to Ben Gurion Airport for a Saturday flight? Reverse the same checks. Line 711 toward Shoham can serve Terminal 1 on its published limited timetable; the free airport shuttle connects to Terminal 3. Leave enough margin for airline check-in and security.",
        ],
        inlineLinks: [{ text: "getting around Israel guide", to: travelGuidePaths.israel }],
        sourceIds: ["israel-rail", "guide-weekend-711", "guide-iaa"],
      },
      {
        id: "practical",
        title: "Practical tips before you leave arrivals",
        paragraphs: [
          "Keep your hotel's full address saved offline, preferably in both English and Hebrew, along with your booking reference and pickup instructions. Ben Gurion Airport offers free Wi-Fi, but it is sensible to have working mobile data or consider an Israel eSIM for the journey after you leave the terminal. If you arrive late, check that your accommodation can admit you at that hour.",
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
      { label: "Explore car rental options", to: "/car-rental/", note: "Check Saturday counter hours and collection arrangements before paying." },
      { label: "Choose where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/", note: "Plan your neighbourhood and the final journey from your Line 711 stop." },
      { label: "Plan a visit to Jerusalem", to: "/travel-blog/jerusalem-travel-guide/", note: "Explore the capital’s main sights and plan a visit after your airport arrival." },
      { label: "Discover Dead Sea attractions", to: "/travel-blog/dead-sea-attractions/", note: "Explore natural sights and activities beyond the airport for a longer Israel trip." },
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
      { id: "first-itinerary", title: "How many days should you allow?", paragraphs: ["Use two or three days as an editorial planning suggestion, not a promise of seeing everything. For one day, concentrate on one main area and a few priorities. With extra nights, add museums, neighbourhood walks or a day outside the city rather than stretching a single walking day indefinitely.", "Choose your dates with the religious calendar in mind. Shabbat, feast days and major events can change transport, worship arrangements and opening windows. Leave a flexible slot instead of fixing every hour before checking those details."], sourceIds: [] },
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
    description: "How to get from Jerusalem to the Dead Sea: compare buses, tours, rentals and drivers, with Ein Bokek, Ein Gedi and Masada as distinct stops.",
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
