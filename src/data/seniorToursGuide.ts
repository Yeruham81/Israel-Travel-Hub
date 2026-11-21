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
      "Begin near an agreed Old City drop-off, and choose just one suitable historic route rather than trying to cover every quarter.",
      "Spend time at one priority site, such as the Tower of David Museum or the Western Wall, after checking its actual accessible entrance.",
      "Finish with a scenic viewpoint or a comfortable return toward your agreed pickup location.",
    ],
    restStop:"Plan a seated coffee or lunch break near Mamilla or the museum area; confirm convenient access and available seating.",
    shortenDay:"Skip Mount of Olives and additional Old City lanes if the first visit takes longer than expected.",
    accessInfo:[
      {label:"Old City accessible-route map app — Android",url:"https://play.google.com/store/apps/details?id=pami.accessibility.sayyes"},
      {label:"Old City accessible-route map app — iPhone",url:"https://apps.apple.com/il/app/accessible-jlm/id1434672106"},
    ],
    image:"/images/attractions/old-jerusalem-western-wall.webp",alt:"Western Wall in Jerusalem's Old City",
    intro:"Choose one part of Jerusalem rather than trying to see the Old City, museums and hillside churches in a single day. A private driver can connect hotel pickup, an agreed drop-off point and another area later in the day.",
    easy:"Try a scenic city viewpoint plus one museum or a short selected Old City route. Leave room for a seated lunch and longer stops.",
    watchFor:"Stone paving, steps, slopes and security-controlled vehicle access can prevent drop-off at an attraction's actual entrance. Even upgraded Old City streets are only partially accessible.",
    suggestedStops:[{label:"Old City",to:"/attractions/old-city-jerusalem/"},{label:"Mount of Olives",to:"/attractions/mount-of-olives/"},{label:"Jerusalem travel guide",to:"/travel-blog/jerusalem-travel-guide/"}],
    to:"/tours/jerusalem/",googlePlace:"Old City Jerusalem, Israel",
  },
  {
    id:"masada",title:"Masada & the Dead Sea, without a strenuous hike",duration:"Full-day",
    sampleOrder:[
      "Start early at Masada's eastern visitor entrance; check cable-car operation and the accessible areas before buying tickets.",
      "Ride the cable car and visit a limited, appropriate section of the plateau and viewpoints rather than walking every archaeological path.",
      "Continue to Ein Bokek for a relaxed lunch or a Dead Sea viewpoint; enter the water only if conditions and personal needs allow.",
    ],
    restStop:"Use the visitor complex before or after the cable car, then plan a seated break at Ein Bokek.",
    shortenDay:"Skip longer plateau walks, Ein Gedi hiking and any beach entry if the day is too hot or tiring.",
    accessInfo:[
      {label:"Masada official site and accessibility details",url:"https://en.parks.org.il/reserve-park/masada-national-park/"},
      {label:"Official Masada cable-car accessibility information",url:"https://en.parks.org.il/article/the-masada-cable-car/"},
    ],
    image:"/images/attractions/dead-sea.webp",alt:"Dead Sea and desert shoreline",
    intro:"This desert day can focus on viewpoints, Masada's eastern visitor complex and a relaxed stop at the Dead Sea. The Masada cable car offers an alternative to climbing the Snake Path.",
    easy:"Consider the cable car and a limited section of the archaeological plateau, followed by lunch or a scenic stop at Ein Bokek.",
    watchFor:"The cable car is wheelchair accessible according to the park authority, but this does not mean every ruin, staircase or beach entry is. Dead Sea shores can be slippery, the heat can be intense, and entering the water may be inappropriate for some visitors.",
    suggestedStops:[{label:"Masada",to:"/attractions/masada/"},{label:"Dead Sea",to:"/attractions/dead-sea/"},{label:"Jerusalem to the Dead Sea",to:"/travel-blog/jerusalem-to-the-dead-sea/"}],
    to:"/tours/masada-dead-sea/",googlePlace:"Masada National Park, Israel",
  },
  {
    id:"galilee",title:"Nazareth & the Sea of Galilee",duration:"Full-day or two shorter days",
    sampleOrder:[
      "Visit one priority church in Nazareth, such as the Basilica of the Annunciation, after checking step-free access for your entrance.",
      "Drive to the lakeside and choose one site such as Capernaum rather than combining every Galilee church.",
      "Enjoy lunch or a seated lake-view break near Tiberias, then decide whether an additional short stop is worthwhile.",
    ],
    restStop:"Allow a leisurely lakeside lunch around Tiberias or another suitable location, with time to rest after the Nazareth visit.",
    shortenDay:"Skip extra churches and Mount Tabor; if starting far away, consider two shorter days or an overnight base in Galilee.",
    image:"/images/attractions/sea-of-galilee.webp",alt:"Sea of Galilee surrounded by low green hills",
    intro:"A journey north can combine Nazareth's churches with peaceful lakeside sites. For travelers who tire easily, splitting the region across two days may be far more pleasant than a long round trip.",
    easy:"Choose one main Nazareth church and one or two lakeside stops; enjoy the scenery and a quiet meal rather than trying to visit every chapel.",
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
    shortenDay:"Leave Akko for a separate visit rather than rushing through three cities in one day.",
    accessInfo:[
      {label:"Caesarea National Park official accessibility details",url:"https://en.parks.org.il/reserve-park/caesarea-national-park/"},
      {label:"Accessible national parks and sites map",url:"https://en.parks.org.il/accessibility/"},
    ],
    image:"/images/attractions/haifa-bahai-gardens.webp",alt:"Baháʼí Gardens on the slopes of Mount Carmel in Haifa",
    intro:"The Mediterranean coast offers a good mix of archaeology, city panoramas and relaxed waterside stops. You can enjoy a memorable day by choosing two highlights rather than racing through all three cities.",
    easy:"A selected accessible section at Caesarea plus a Haifa viewpoint or the Akko waterfront can work better than touring every site.",
    watchFor:"Caesarea has designated accessible areas, but not every archaeological surface is step-free. The Baháʼí Gardens' terraces and Akko's historic lanes can involve substantial steps or uneven ground.",
    suggestedStops:[{label:"Caesarea",to:"/attractions/caesarea/"},{label:"Haifa",to:"/attractions/haifa/"},{label:"Akko",to:"/attractions/akko-acre/"}],
    to:"/tours/caesarea-haifa-acre/",googlePlace:"Caesarea National Park, Israel",
  },
];

export const seniorTransportPreferences=[
  {title:"Door-to-door travel",text:"Plan pickup from an airport, cruise terminal, hotel or agreed address, with luggage handling and convenient return pickup discussed in advance."},
  {title:"A flexible pace",text:"Choose later starts, shorter days, additional breaks, one region per day and extra time when a visit is more meaningful than expected."},
  {title:"A suitable vehicle",text:"Confirm the number of passengers, seating preferences, legroom, air conditioning, luggage, walking aids and the ease of getting in and out before a quote is accepted."},
  {title:"Realistic drop-off points",text:"The closest legal drop-off can still be a walk from the entrance. I can discuss practical pickup points, but pedestrian-only streets and restricted roads are not drive-through routes."},
  {title:"Clear arrangements",text:"Agree on stops, pickup time, approximate day length, any separate guide, charges and cancellation terms before booking. Changes remain subject to confirmation."},
  {title:"Companions are welcome",text:"Family members, friends or carers can share the journey when the vehicle is suitable. Please mention any assistance that must be provided by someone travelling with you."},
] as const;

export const seniorAccessQuestions=[
  "What is the comfortable walking distance between breaks: a few steps, about 10 minutes, or longer?",
  "Are stairs, steep slopes, uneven paving or standing in lines difficult?",
  "Will anyone travel with a cane, folding walker, wheelchair or mobility scooter? Include dimensions for bulky equipment.",
  "Is a step-free entrance or a wheelchair-accessible vehicle essential? These must be checked separately, not assumed.",
  "Is anyone accompanying the traveler to provide personal care or physical transfers if required?",
  "Which two or three sites are essential, and which could be optional if the day becomes tiring?",
  "Where will pickup and drop-off take place, and do you want a shorter morning or afternoon outing?",
] as const;

export const seniorFaqs=[
 {q:"Are these private tours only for people over a certain age?",a:"No. This guide is for anyone who values a quieter pace, extra flexibility or more attention to transport and walking distances, whether travelling alone, with a partner or with family."},
 {q:"Can I arrange an itinerary with very little walking?",a:"Often yes, by choosing suitable viewpoints, museums, short accessible routes and well-positioned stops. No private car can drive through pedestrian-only areas or guarantee step-free entry at every historic site. We should confirm the exact plan before booking."},
 {q:"Is the private vehicle wheelchair accessible?",a:"Do not assume this. Tell me whether a passenger can transfer to a standard vehicle seat, whether a wheelchair folds, and whether a wheelchair-accessible vehicle or lift is essential. An adapted vehicle is a separate requirement and can be offered only if availability is specifically confirmed."},
 {q:"Can the driver provide mobility, lifting or nursing assistance?",a:"My service is private transportation. It does not automatically include nursing, personal care, physical lifting, wheelchair transfer assistance or a licensed tour guide. Please arrange a suitable companion or specialist service where necessary."},
 {q:"What if I cannot stand for long periods?",a:"Tell me in advance. We can prioritize seated experiences, short stops, sites with known visitor facilities and a less crowded visiting schedule. Seating, queues and access still need to be verified with each destination."},
 {q:"Is Jerusalem's Old City accessible for wheelchairs?",a:"Access has improved on some routes, but Jerusalem's Old City remains only partially accessible due to historic paving, slopes, steps and the layout of individual buildings. Choose an exact route and confirm entry conditions rather than relying on a general accessibility label."},
 {q:"Can a senior visitor go up Masada without hiking?",a:"Masada has an eastern entrance served by an accessible cable car, but not every area on the plateau is equally accessible. Confirm cable-car operation and which archaeological sites you want to reach before travelling."},
 {q:"Do private day trips include a licensed tour guide?",a:"Not automatically. I can arrange transport and help plan a route, while professional guiding is a separate service that must be requested and confirmed in advance."},
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
