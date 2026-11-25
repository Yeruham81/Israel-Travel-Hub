import type { LinkProps } from "@tanstack/react-router";
import calendarPhoto from "@/assets/guides/2026-10/calendar-of-events.webp";
import railPhoto from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import caesareaCardPhoto from "@/assets/attractions-hub/card-caesarea-420.webp";

export const seniorUpdatedAt = "2026-11-21";
export const seniorPath = "/travel-blog/israel-tours-for-seniors/" as const;
export const seniorHero = {src:"/images/senior-tours/israel-tours-for-seniors-1200x900.webp",mobileSrc:"/images/senior-tours/israel-tours-for-seniors-1200x675.webp",alt:"Older couple enjoying a seaside holiday together"};

export type SeniorDay = {
  id:string; title:string; duration:string; image:string; alt:string; intro:string;
  easy:string; watchFor:string; suggestedStops:{label:string;to:LinkProps["to"]}[];
  sampleOrder:string[]; restStop:string; shortenDay:string;
  accessInfo?:{label:string;url:string}[];
  to:LinkProps["to"]; googlePlace:string;
};
export const seniorDayTrips:SeniorDay[] = [
  {
    id:"jerusalem",title:"Jerusalem at a comfortable pace",duration:"Half-day or full-day",
    sampleOrder:[
      "Begin near an agreed Old City drop-off and follow one suitable historic route.",
      "Spend time at one priority site, such as the Tower of David Museum or the Western Wall, after checking its actual accessible entrance.",
      "Finish with a scenic viewpoint or a comfortable return toward your agreed pickup location.",
    ],
    restStop:"Plan a seated coffee or lunch break near Mamilla or the museum area; confirm convenient access and available seating.",
    shortenDay:"Keep Mount of Olives and extra Old City lanes for another outing if you prefer more time at your first stop.",
    accessInfo:[
      {label:"Old City accessible-route map app — Android",url:"https://play.google.com/store/apps/details?id=pami.accessibility.sayyes"},
      {label:"Old City accessible-route map app — iPhone",url:"https://apps.apple.com/il/app/accessible-jlm/id1434672106"},
    ],
    image:"/images/attractions/old-jerusalem-western-wall.webp",alt:"Western Wall in Jerusalem's Old City",
    intro:"Spend the day in one part of Jerusalem, such as the Old City or the museum district. A private driver can connect hotel pickup, an agreed drop-off point and another area later in the day.",
    easy:"Try a scenic city viewpoint plus one museum or a short selected Old City route. Leave room for a seated lunch and longer stops.",
    watchFor:"Plan for stone paving, steps, slopes and controlled vehicle access in the Old City. Agree on a convenient permitted drop-off and check the accessibility of your exact route.",
    suggestedStops:[{label:"Old City",to:"/attractions/old-city-jerusalem/"},{label:"Mount of Olives",to:"/attractions/mount-of-olives/"},{label:"Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/"}],
    to:"/tours/jerusalem/",googlePlace:"Old City Jerusalem, Israel",
  },
  {
    id:"masada",title:"Masada & the Dead Sea, without a strenuous hike",duration:"Full-day",
    sampleOrder:[
      "Start early at Masada's eastern visitor entrance; check cable-car operation and the accessible areas before buying tickets.",
      "Ride the cable car and choose a section of the plateau and viewpoints suited to your mobility.",
      "Continue to Ein Bokek for a relaxed lunch or a Dead Sea viewpoint; enter the water only if conditions and personal needs allow.",
    ],
    restStop:"Use the visitor complex before or after the cable car, then plan a seated break at Ein Bokek.",
    shortenDay:"Focus on the visitor complex, cable car and comfortable scenic stops on hot or tiring days.",
    accessInfo:[
      {label:"Masada official site and accessibility details",url:"https://en.parks.org.il/reserve-park/masada-national-park/"},
      {label:"Official Masada cable-car accessibility information",url:"https://en.parks.org.il/article/the-masada-cable-car/"},
    ],
    image:"/images/attractions/dead-sea.webp",alt:"Dead Sea and desert shoreline",
    intro:"This desert day can focus on viewpoints, Masada's eastern visitor complex and a relaxed stop at the Dead Sea. The Masada cable car offers an alternative to climbing the Snake Path.",
    easy:"Consider the cable car and a limited section of the archaeological plateau, followed by lunch or a scenic stop at Ein Bokek.",
    watchFor:"The park authority identifies the cable car as wheelchair accessible. Check access to the plateau, ruins and beaches separately. Be prepared for uneven surfaces, intense heat and slippery areas along the Dead Sea shore.",
    suggestedStops:[{label:"Masada",to:"/attractions/masada/"},{label:"Dead Sea",to:"/attractions/dead-sea/"},{label:"Jerusalem to the Dead Sea",to:"/travel-blog/jerusalem-to-the-dead-sea/"}],
    to:"/tours/masada-dead-sea/",googlePlace:"Masada National Park, Israel",
  },
  {
    id:"galilee",title:"Nazareth & the Sea of Galilee",duration:"Full-day or two shorter days",
    sampleOrder:[
      "Visit one priority church in Nazareth, such as the Basilica of the Annunciation, after checking step-free access for your entrance.",
      "Drive to the lakeside and choose one site such as Capernaum.",
      "Enjoy lunch or a seated lake-view break near Tiberias, then decide whether an additional short stop is worthwhile.",
    ],
    restStop:"Allow a leisurely lakeside lunch around Tiberias or another suitable location, with time to rest after the Nazareth visit.",
    shortenDay:"Choose the lakeside highlights first and save additional churches or Mount Tabor for a second day; an overnight Galilee base can help.",
    image:"/images/attractions/sea-of-galilee.webp",alt:"Sea of Galilee surrounded by low green hills",
    intro:"A journey north can combine Nazareth's churches with peaceful lakeside sites. For travelers who tire easily, splitting the region across two days may be far more pleasant than a long round trip.",
    easy:"Choose one main Nazareth church and one or two lakeside stops, with time for the scenery and a quiet meal.",
    watchFor:"Some sanctuaries have steps, uneven paths and busy services. Drive times from Jerusalem are longer than they appear on a small map; verify the entry and mobility details for each location.",
    suggestedStops:[{label:"Annunciation Basilica",to:"/attractions/basilica-of-the-annunciation/"},{label:"Sea of Galilee",to:"/attractions/sea-of-galilee/"},{label:"Capernaum",to:"/attractions/capernaum/"}],
    to:"/tours/nazareth-sea-of-galilee/",googlePlace:"Basilica of the Annunciation, Nazareth, Israel",
  },
  {
    id:"coast",title:"Caesarea, Haifa & Akko — choose your stops",duration:"Full-day",
    sampleOrder:[
      "Explore a selected visitor route at Caesarea, beginning at the entrance that best suits your walking needs.",
      "Pause for a seated lunch around Caesarea Harbor or Haifa before continuing along the coast.",
      "Finish at a Haifa viewpoint; add Akko's waterfront only when energy and the remaining travel time permit.",
    ],
    restStop:"A relaxed meal near Caesarea Harbor or Haifa's German Colony can provide a comfortable break between stops.",
    shortenDay:"Leave Akko for a separate visit.",
    accessInfo:[
      {label:"Caesarea National Park official accessibility details",url:"https://en.parks.org.il/reserve-park/caesarea-national-park/"},
      {label:"Accessible national parks and sites map",url:"https://en.parks.org.il/accessibility/"},
    ],
    image:"/images/attractions/haifa-bahai-gardens.webp",alt:"Baháʼí Gardens on the slopes of Mount Carmel in Haifa",
    intro:"The Mediterranean coast offers a good mix of archaeology, city panoramas and relaxed waterside stops. Choose two highlights for a comfortable day with plenty of time at each stop.",
    easy:"A selected accessible section at Caesarea plus a Haifa viewpoint or the Akko waterfront can work better than touring every site.",
    watchFor:"Caesarea has designated accessible areas; check the precise visitor route and its surfaces. The Baháʼí Gardens' terraces and Akko's historic lanes may include steps and uneven ground.",
    suggestedStops:[{label:"Caesarea",to:"/attractions/caesarea/"},{label:"Haifa",to:"/attractions/haifa/"},{label:"Akko",to:"/attractions/akko-acre/"}],
    to:"/tours/caesarea-haifa-acre/",googlePlace:"Caesarea National Park, Israel",
  },
];

export const seniorTransportPreferences=[
  {title:"Door-to-door travel",text:"Plan pickup from an airport, cruise terminal, hotel or agreed address, with luggage handling and convenient return pickup discussed in advance."},
  {title:"A flexible pace",text:"Choose later starts, shorter days, additional breaks, one region per day and extra time when a visit is more meaningful than expected."},
  {title:"A suitable vehicle",text:"Tell me the number of passengers, seating and legroom preferences, luggage, walking aids and ease of getting in and out so I can check a suitable vehicle before confirming your quote."},
  {title:"Realistic drop-off points",text:"I'll help identify the closest permitted drop-off, with a realistic walking distance to the entrance. Pedestrian streets and restricted roads call for an agreed meeting point."},
  {title:"Clear arrangements",text:"Agree on stops, pickup time, approximate day length, any separate guide, charges and cancellation terms before booking. Changes remain subject to confirmation."},
  {title:"Companions are welcome",text:"Family members, friends or carers can share the journey when the vehicle is suitable. Please mention any assistance that must be provided by someone travelling with you."},
] as const;

export const seniorAccessQuestions=[
  "What is the comfortable walking distance between breaks: a few steps, about 10 minutes, or longer?",
  "Are stairs, steep slopes, uneven paving or standing in lines difficult?",
  "Will anyone travel with a cane, folding walker, wheelchair or mobility scooter? Include dimensions for bulky equipment.",
  "Do you need a step-free entrance or a wheelchair-accessible vehicle? Please mention both so I can check the arrangements separately.",
  "Is anyone accompanying the traveler to provide personal care or physical transfers if required?",
  "Which two or three sites are essential, and which could be optional if the day becomes tiring?",
  "Where will pickup and drop-off take place, and do you want a shorter morning or afternoon outing?",
] as const;

export const seniorFaqs=[
 {q:"Are these private tours only for people over a certain age?",a:"This guide is for anyone who values a quieter pace, extra flexibility or more attention to transport and walking distances, whether travelling alone, with a partner or with family."},
 {q:"Can I arrange an itinerary with very little walking?",a:"Yes, often by choosing viewpoints, museums, short suitable routes and convenient drop-offs near pedestrian areas. I'll help plan the route and check step-free entrances with the relevant sites before booking."},
 {q:"Is the private vehicle wheelchair accessible?",a:"Please tell me whether the passenger can transfer to a standard vehicle seat, whether the wheelchair folds and whether a lift-equipped vehicle is needed. I'll check adapted-vehicle availability separately and confirm the arrangement before booking."},
 {q:"Can the driver provide mobility, lifting or nursing assistance?",a:"My service focuses on private transportation and planning agreed stops. For nursing, personal care, lifting or wheelchair transfers, please arrange a qualified companion or specialist. Professional sightseeing guides can be requested as a separate service, subject to confirmation."},
 {q:"What if I cannot stand for long periods?",a:"Please tell me how long you can comfortably stand. We can prioritize seated experiences, short stops and sites with visitor facilities, then check seating, queues and access with each destination."},
 {q:"Is Jerusalem's Old City accessible for wheelchairs?",a:"Some Old City routes have improved access, while historic paving, slopes and steps still affect others. Choose a specific route and confirm the entrance and mobility conditions for each stop."},
 {q:"Can a senior visitor go up Masada without hiking?",a:"Masada has an eastern entrance served by an accessible cable car. The plateau has varied surfaces and steps, so check cable-car operation and the specific archaeological areas you'd like to visit before travelling."},
 {q:"Do private day trips include a licensed tour guide?",a:"My service covers private transport and help with route planning. If you'd like a licensed sightseeing guide, please request it in advance so the separate arrangement can be checked and confirmed."},
 {q:"Can you pick us up at Ben Gurion Airport or a cruise terminal?",a:"Airport or cruise-port pickup can form part of a private transport arrangement. Share your flight or ship information, luggage and destination so that the appropriate pickup instructions and vehicle can be confirmed."},
 {q:"How long should a day trip last?",a:"There is no fixed ideal duration. Four to six hours may be more comfortable for some travelers, while others enjoy a full day with regular breaks. We can set a realistic schedule based on your preferences and the locations involved."},
];

export type SeniorRelated={title:string;description:string;to:LinkProps["to"];image:string;alt:string};
export const seniorSites:SeniorRelated[]=[
 {title:"Old City of Jerusalem",description:"Historic sites and route choices, including uneven lanes and steps",to:"/attractions/old-city-jerusalem/",image:"/images/attractions/old-jerusalem-cardo.webp",alt:"Ancient Cardo street in Jerusalem"},
 {title:"Masada",description:"Cable car, eastern entrance and desert viewpoints",to:"/attractions/masada/",image:"/images/top-ten-israel/masada.webp",alt:"Archaeological remains on the plateau at Masada"},
 {title:"Caesarea",description:"Roman coast and selected visitor routes",to:"/attractions/caesarea/",image:caesareaCardPhoto,alt:"Archaeological stone ruins at Caesarea National Park"},
 {title:"Haifa & Mount Carmel",description:"City panoramas, museums and the garden viewpoint",to:"/attractions/haifa/",image:"/images/attractions/haifa-german-colony.webp",alt:"Haifa German Colony below the Mount Carmel slopes"},
 {title:"Akko (Acre)",description:"Port views and selected historic streets",to:"/attractions/akko-acre/",image:"/images/attractions/akko-fishing-harbour.webp",alt:"Fishing boats in the historic port of Akko"},
 {title:"Old Jaffa",description:"A flexible coastal stop with ancient streets and scenic views",to:"/attractions/jaffa/",image:"/images/attractions/jaffa-port.webp",alt:"Old Jaffa harbour and waterfront"},
];
export const seniorPlanning:SeniorRelated[]=[
 {title:"Private driver in Israel",description:"Discuss personalized pickups, private day trips and vehicle needs",to:"/private-driver-in-israel/",image:"/images/travel-blog/airport-taxi-sign.webp",alt:"Official airport taxi sign for private transport"},
 {title:"Getting around Israel",description:"Compare train, taxi, private transfer and other connections",to:"/travel-blog/getting-around-israel/",image:railPhoto,alt:"Platform at Ben Gurion Airport train station"},
 {title:"Israel in 5 days",description:"Adapt a multi-day itinerary to your own pace and preferred stops",to:"/travel-blog/israel-itinerary-5-days/",image:"/images/attractions/nazareth-galilee.webp",alt:"Nazareth and Galilee countryside"},
 {title:"Israel's calendar of events",description:"Check dates that affect opening hours, traffic and travel plans",to:"/travel-blog/calendar-of-events/",image:calendarPhoto,alt:"Calendar dates and event planning"},
 {title:"Where to stay in Jerusalem",description:"Choose a convenient neighborhood and hotel location",to:"/travel-blog/where-to-stay-in-jerusalem/",image:"/images/city-stays/jerusalem-downtown.webp",alt:"Central Jerusalem streets and accommodation area"},
 {title:"Airport transfers",description:"Plan a comfortable arrival or departure with luggage",to:"/airport-transfers/",image:"/images/home/transfer-tel-aviv-beach-skyline.webp",alt:"Tel Aviv coast, a popular arrival destination"},
];
