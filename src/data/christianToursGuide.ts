import type { LinkProps } from "@tanstack/react-router";
import bethlehemPhoto from "@/assets/home/bethlehem-nativity.webp";
import bethlehemRelatedPhoto from "@/assets/home/bethlehem-nativity-tile.webp";
import yardenitRelatedPhoto from "@/assets/guides/yardenit.jpg";
import bethlehemTourPhoto from "@/assets/guides/bethlehem/nativity-courtyard.jpg";
import qasrTourPhoto from "@/assets/guides/qasr-el-yahud.jpg";
import holySepulchrePhoto from "@/assets/guides/holy-sepulchre.jpg";
import christianToursCover from "@/assets/guides/christian-tours-hero.webp";
import tiberiasPhoto from "@/assets/home/tiberias-lake.webp";
import fiveDayPhoto from "@/assets/home/hero-caesarea-sm.webp";
import sevenDayPhoto from "@/assets/home/hero-galilee-sm-optimized.webp";
import calendarPhoto from "@/assets/guides/2026-10/calendar-of-events.webp";
import railPhoto from "@/assets/airport-journeys/ben-gurion-rail-platform.webp";
import privateDriverPhoto from "@/assets/guides/taxi-cabs-israel.webp";

/** The Christian Tours page and every inbound guide card share this single image.
 * Use the approved photograph here so every linking card updates with the page. */
export const christianToursHero = {
  src: christianToursCover,
  alt: "Cross atop the domed Church of the Holy Sepulchre in Jerusalem",
} as const;

export type ChristianSite = { name: string; note: string; to?: LinkProps["to"]; officialUrl?: string; mapPlace?: string };
export type ChristianArea = {
  id: string; name: string; title: string; image: string; alt: string;
  intro: string; planning: string; sites: ChristianSite[]; mapPlace: string;
  related: { label: string; to: LinkProps["to"] };
};

export const christianAreas: ChristianArea[] = [
  {
    id: "jerusalem", name: "Jerusalem", title: "Jerusalem: the Passion, Crucifixion and Resurrection",
    image: "/images/attractions/old-jerusalem-via-dolorosa.webp", alt: "Via Dolorosa in Jerusalem's Old City",
    intro: "Jerusalem is the natural starting point for many pilgrimages. The Church of the Holy Sepulchre is revered by several Christian traditions as the place of Jesus' crucifixion, burial and resurrection. The Via Dolorosa is a traditional Stations of the Cross route, not a historically verified street-by-street account.",
    planning: "Allow a full day for the Old City and selected Mount of Olives or Mount Zion stops; a second day gives space for prayer, services and unhurried visits. Explore the Old City on foot, allowing for stone steps and uneven lanes.",
    sites: [
      {name:"Church of the Holy Sepulchre",note:"Calvary and the traditional tomb of Christ",to:"/travel-blog/churches-in-jerusalem/"},
      {name:"Via Dolorosa",note:"The traditional Stations of the Cross",to:"/attractions/via-dolorosa/"},
      {name:"Gethsemane and Church of All Nations",note:"At the foot of the Mount of Olives",to:"/attractions/mount-of-olives/"},
      {name:"Cenacle and Mount Zion",note:"Traditional Last Supper associations",to:"/attractions/mount-zion/"},
    ],
    mapPlace:"Church of the Holy Sepulchre, Jerusalem, Israel",
    related:{label:"Churches in Jerusalem - my detailed guide",to:"/travel-blog/churches-in-jerusalem/"},
  },
  {
    id:"bethlehem",name:"Bethlehem",title:"Bethlehem: the Nativity and the shepherds' fields",
    image:bethlehemPhoto,alt:"The Church of the Nativity in Bethlehem",
    intro:"Bethlehem is a Palestinian city in the West Bank, south of Jerusalem. The Church of the Nativity is a UNESCO-listed pilgrimage landmark built around the site traditionally associated with Jesus' birth. Visit Manger Square and nearby Beit Sahour to explore other places associated with the Nativity story.",
    planning:"Plan Bethlehem as a separate half- or full-day visit. Entry and checkpoint arrangements may differ by nationality, vehicle and conditions on your travel date. Confirm your driver's eligibility to enter Palestinian Authority areas.",
    sites:[
      {name:"Church of the Nativity",note:"Traditional birthplace of Jesus",officialUrl:"https://www.custodia.org/en/sanctuaries/bethlehem-basilica-of-the-nativity/",mapPlace:"Church of the Nativity, Manger Square, Bethlehem, West Bank"},
      {name:"Milk Grotto",note:"A small chapel close to the Nativity Church",officialUrl:"https://bethlehem-city.org/en/milkgrotto",mapPlace:"Milk Grotto Chapel, Bethlehem, West Bank"},
      {name:"Shepherds' Field, Beit Sahour",note:"Chapels recalling the announcement to the shepherds",officialUrl:"https://www.custodia.org/en/sanctuaries/bethlehem-the-shepherds-field-and-grotto/",mapPlace:"Shepherds Field Chapel, Beit Sahour, West Bank"},
    ],
    mapPlace:"Church of the Nativity, Bethlehem, West Bank",
    related:{label:"How to get from Jerusalem to Bethlehem",to:"/travel-blog/jerusalem-to-bethlehem/"},
  },
  {
    id:"nazareth",name:"Nazareth",title:"Nazareth: the Annunciation and Jesus' early life",
    image:"/images/attractions/annunciation-upper-basilica.webp",alt:"Inside the Basilica of the Annunciation in Nazareth",
    intro:"Nazareth combines living Christian communities with churches linked to the Annunciation and the early life of Jesus. The Basilica of the Annunciation is the main attraction, alongside smaller churches and Nazareth's old market.",
    planning:"Give Nazareth at least half a day. Allow additional travel time to visit Cana and Mount Precipice.",
    sites:[
      {name:"Basilica of the Annunciation",note:"A major Catholic pilgrimage church",to:"/attractions/basilica-of-the-annunciation/"},
      {name:"St Joseph's Church",note:"Associated by tradition with the Holy Family",mapPlace:"Church of Saint Joseph, Nazareth, Israel"},
      {name:"Cana (Kafr Kanna)",note:"Tradition of the wedding miracle",mapPlace:"Wedding Church, Kafr Kanna, Israel"},
      {name:"Mount Precipice",note:"Viewpoint linked to the Gospel narrative",to:"/attractions/mount-precipice/"},
    ],
    mapPlace:"Basilica of the Annunciation, Nazareth, Israel",
    related:{label:"Basilica of the Annunciation guide",to:"/attractions/basilica-of-the-annunciation/"},
  },
  {
    id:"galilee",name:"Sea of Galilee",title:"Sea of Galilee: teachings, villages and lakeside churches",
    image:"/images/attractions/capernaum-synagogue.webp",alt:"Ancient synagogue ruins at Capernaum by the Sea of Galilee",
    intro:"A day around the Sea of Galilee connects towns, archaeological remains and churches traditionally associated with Jesus' ministry. Capernaum, Tabgha, the Mount of Beatitudes and Magdala are separate visitor sites around the lake.",
    planning:"Allow a full day to explore the lakeside sites. I recommend staying overnight near the lake if you're travelling from Jerusalem.",
    sites:[
      {name:"Capernaum",note:"Ancient village and synagogue remains",to:"/attractions/capernaum/"},
      {name:"Tabgha",note:"Multiplication of Loaves and Fishes and Primacy traditions",to:"/attractions/tabgha/"},
      {name:"Mount of Beatitudes",note:"Hillside church associated with the Sermon on the Mount",to:"/attractions/mount-of-beatitudes/"},
      {name:"Magdala",note:"Archaeology and contemporary pilgrimage centre",to:"/attractions/magdala/"},
    ],
    mapPlace:"Capernaum, Sea of Galilee, Israel",
    related:{label:"Sea of Galilee attractions guide",to:"/attractions/sea-of-galilee/"},
  },
  {
    id:"tabor",name:"Mount Tabor",title:"Mount Tabor: the Transfiguration tradition",
    image:"/images/attractions/mount-tabor-basilica-aerial.webp",alt:"Basilica of the Transfiguration on Mount Tabor",
    intro:"Mount Tabor is traditionally associated with the Transfiguration. The hilltop basilica, views and wooded surroundings make it a distinctive stop between Nazareth and the eastern Lower Galilee.",
    planning:"Mount Tabor is best visited as a separate trip from Nazareth. Check church opening hours and vehicle access before visiting Mount Tabor.",
    sites:[{name:"Basilica of the Transfiguration",note:"The main church and viewpoint",to:"/attractions/mount-tabor/"}],
    mapPlace:"Church of the Transfiguration, Mount Tabor, Israel",
    related:{label:"My Mount Tabor visitor guide",to:"/attractions/mount-tabor/"},
  },
  {
    id:"jordan",name:"Jordan River",title:"Jordan River: choose the right baptismal site",
    image:"/images/attractions/jordan-river-baptism.webp",alt:"Steps leading into the Jordan River at a designated baptism site",
    intro:"Qasr al-Yahud, on the lower Jordan near Jericho, is traditionally associated with Jesus' baptism. Yardenit is a modern baptism site near the southern end of the Sea of Galilee.",
    planning:"Choose the baptism site that best fits your itinerary and religious plans. If you're planning a baptism or group prayer, arrange clergy, clothing and any required permissions in advance. Follow the site's current access instructions.",
    sites:[
      {name:"Qasr al-Yahud",note:"Traditional baptismal location near Jericho",to:"/attractions/qasr-el-yahud/"},
      {name:"Yardenit",note:"Organised baptismal facilities south of the Sea of Galilee",to:"/attractions/yardenit/"},
    ],
    mapPlace:"Qasr al-Yahud Baptism Site, West Bank",
    related:{label:"Where to visit the Jordan River for baptism",to:"/travel-blog/baptism-in-the-jordan-river/"},
  },
  {
    id:"carmel",name:"Haifa & Carmel",title:"Haifa and Mount Carmel: a different Christian tradition",
    image:"/images/attractions/haifa-stella-maris.webp",alt:"Stella Maris Carmelite monastery in Haifa",
    intro:"On the Mediterranean coast, the Stella Maris monastery in Haifa is linked with Carmelite spirituality and the prophet Elijah. Deir al-Mukhraqa (Muhraqa), on another part of the Carmel ridge, is traditionally associated with Elijah's contest described in the Book of Kings.",
    planning:"Stella Maris and Muhraqa are in different parts of Mount Carmel. Allow time to drive between them and check their opening hours.",
    sites:[
      {name:"Stella Maris, Haifa",note:"Carmelite monastery overlooking the Mediterranean",officialUrl:"https://www.carmelholylanddco.org/contacts/",mapPlace:"Stella Maris Monastery, Haifa, Israel"},
      {name:"Deir al-Mukhraqa, Mount Carmel",note:"Traditional site linked with Elijah",officialUrl:"https://www.carmelholylanddco.org/who-we-are/the-discalced-carmelites-in-the-holy-land/",mapPlace:"Deir al-Mukhraqa Carmelite Monastery, Daliyat al-Karmel, Israel"},
    ],
    mapPlace:"Stella Maris Monastery, Haifa, Israel",
    related:{label:"Explore Haifa and the Carmel area",to:"/attractions/haifa/"},
  },
];

export const christianRoutes = [
  {
    time:"1 day",title:"Christian Jerusalem",subtitle:"A focused Jerusalem day",
    steps:["Start near the Mount of Olives and Gethsemane","Walk part of the Via Dolorosa","Visit the Church of the Holy Sepulchre","Add Mount Zion only if time and access permit"],
    advice:"Best for a first visit based in Jerusalem or a day trip from the centre of Israel. Reserve time for walking, prayer and church queues.",
    mapLegs:[{label:"Jerusalem walking route",origin:"Gethsemane, Jerusalem, Israel",waypoints:["Via Dolorosa, Jerusalem, Israel"],destination:"Church of the Holy Sepulchre, Jerusalem, Israel",mode:"walking"}],
  },
  {
    time:"2 days",title:"Nazareth & the Sea of Galilee",subtitle:"A northern Christian heritage stay",
    steps:["Day 1: Nazareth's Annunciation churches; optional Cana and Mount Tabor","Stay near Nazareth or the lake","Day 2: Capernaum, Tabgha and the Mount of Beatitudes","Consider Magdala or Yardenit if your schedule permits"],
    advice:"An overnight stay helps you avoid spending both days driving back and forth to central Israel.",
    mapLegs:[
      {label:"Day 1 - Nazareth & Mount Tabor",origin:"Basilica of the Annunciation, Nazareth, Israel",waypoints:["Cana Wedding Church, Kafr Kanna, Israel"],destination:"Church of the Transfiguration, Mount Tabor, Israel",mode:"driving"},
      {label:"Day 2 - Lakeside churches",origin:"Magdala, Israel",waypoints:["Capernaum, Israel","Tabgha, Israel"],destination:"Mount of Beatitudes, Israel",mode:"driving"},
    ],
  },
  {
    time:"4 days",title:"Holy Land highlights",subtitle:"Jerusalem, Bethlehem and Galilee",
    steps:["Day 1: Jerusalem Old City, Via Dolorosa and Holy Sepulchre","Day 2: Mount of Olives or Bethlehem, with separate travel arrangements","Day 3: Nazareth and optional Mount Tabor","Day 4: Capernaum, Tabgha, Mount of Beatitudes and the lake"],
    advice:"Before including Bethlehem in your itinerary, check whether you and your driver are permitted to enter.",
    mapLegs:[
      {label:"Day 1 - Jerusalem on foot",origin:"Via Dolorosa, Jerusalem, Israel",waypoints:[],destination:"Church of the Holy Sepulchre, Jerusalem, Israel",mode:"walking"},
      {label:"Day 2 - Bethlehem (check access)",origin:"Church of the Nativity, Bethlehem, West Bank",waypoints:["Milk Grotto, Bethlehem, West Bank"],destination:"Shepherds Field, Beit Sahour, West Bank",mode:"driving"},
      {label:"Day 3 - Nazareth & Tabor",origin:"Basilica of the Annunciation, Nazareth, Israel",waypoints:[],destination:"Mount Tabor, Israel",mode:"driving"},
      {label:"Day 4 - Sea of Galilee",origin:"Capernaum, Israel",waypoints:["Tabgha, Israel"],destination:"Mount of Beatitudes, Israel",mode:"driving"},
    ],
  },
  {
    time:"7 days",title:"A more complete pilgrimage",subtitle:"Room for reflection and extra stops",
    steps:["Days 1–2: Jerusalem Old City, Mount of Olives and Mount Zion","Day 3: Bethlehem and Beit Sahour, subject to current arrangements","Day 4: lower Jordan baptismal site or optional Jericho visit","Day 5: Nazareth, Cana and Mount Tabor","Days 6–7: Sea of Galilee churches, Magdala and optional Haifa/Carmel"],
    advice:"Arrival, luggage, road travel, religious services and any West Bank access require extra time.",
    mapLegs:[
      {label:"Days 1–2 - Jerusalem churches",origin:"Gethsemane, Jerusalem, Israel",waypoints:["Via Dolorosa, Jerusalem, Israel"],destination:"Mount Zion, Jerusalem, Israel",mode:"walking"},
      {label:"Day 3 - Bethlehem (check access)",origin:"Church of the Nativity, Bethlehem, West Bank",waypoints:["Milk Grotto, Bethlehem, West Bank"],destination:"Shepherds Field, Beit Sahour, West Bank",mode:"driving"},
      {label:"Day 4 - Lower Jordan (check access)",origin:"Jerusalem, Israel",waypoints:[],destination:"Qasr al-Yahud Baptism Site, West Bank",mode:"driving"},
      {label:"Day 5 - Nazareth & Tabor",origin:"Basilica of the Annunciation, Nazareth, Israel",waypoints:["Kafr Kanna, Israel"],destination:"Mount Tabor, Israel",mode:"driving"},
      {label:"Days 6–7 - Galilee churches",origin:"Magdala, Israel",waypoints:["Capernaum, Israel","Tabgha, Israel"],destination:"Mount of Beatitudes, Israel",mode:"driving"},
    ],
  },
] as const;

export type ChristianOffer = {
  id:string; affiliateKey:string; platform:"Viator"|"GetYourGuide"; title:string; duration:string;
  summary:string; image:string; alt:string; subId:string; group:"south"|"north";
};
export const christianOffers: ChristianOffer[] = [
  {
    id:"oldcity",affiliateKey:"churches-jerusalem-old-city-walk-viator",platform:"Viator",title:"Old City of Jerusalem walking tour",
    duration:"About 4 hours",summary:"Explore the historic quarters and religious landmarks with a local guide. Check whether church interiors and Holy Sepulchre entry are included.",
    image:"/images/attractions/old-jerusalem-damascus-gate.webp",alt:"Historic gateway into Jerusalem's Old City",subId:"christian_tours_jerusalem_oldcity",
    group:"south",
  },
  {
    id:"bethlehem",affiliateKey:"churches-jerusalem-bethlehem-halfday-gyg",platform:"GetYourGuide",title:"Bethlehem and the Church of the Nativity",
    duration:"About 4 hours",summary:"A half-day visit from Jerusalem to Bethlehem's Christian heritage sites. Confirm permitted nationalities and access to the grotto.",
    image:bethlehemTourPhoto,alt:"Courtyard of the Church of the Nativity in Bethlehem",subId:"christian_tours_bethlehem_halfday",
    group:"south",
  },
  {
    id:"baptism-jericho",affiliateKey:"tour-bethlehem-jericho-qasr-small-group-viator@tours-bethlehem-jericho",platform:"Viator",title:"Bethlehem, Jericho & Qasr al-Yahud",
    duration:"About 7–9 hours",summary:"A small-group itinerary visiting Bethlehem, Jericho and the lower-Jordan baptism site. Check West Bank crossing conditions and any separate ceremony arrangements.",
    image:qasrTourPhoto,alt:"Jordan River baptismal site at Qasr al-Yahud",subId:"christian_tours_qasr_jericho",
    group:"south",
  },
  {
    id:"nazareth-galilee",affiliateKey:"tour-nazareth-galilee-tel-aviv-getyourguide@tours-nazareth-galilee",platform:"GetYourGuide",title:"Nazareth and Sea of Galilee from Tel Aviv",
    duration:"About 10 hours",summary:"Guided visits to Nazareth and Gospel-related locations by the lake, with a possible Yardenit stop depending on the booked itinerary.",
    image:"/images/attractions/annunciation-grotto.webp",alt:"Grotto inside the Basilica of the Annunciation in Nazareth",subId:"christian_tours_nazareth_galilee",
    group:"north",
  },
  {
    id:"christian-galilee",affiliateKey:"tour-galilee-christian-jerusalem-viator@tours-nazareth-galilee",platform:"Viator",title:"Christian heritage of Galilee from Jerusalem",
    duration:"About 11 hours",summary:"Explore Nazareth, Capernaum and lakeside traditions on a guided day. Ask which locations include time inside churches.",
    image:"/images/attractions/tabgha-primacy-chapel.webp",alt:"Church of the Primacy of Saint Peter at Tabgha",subId:"christian_tours_galilee_jerusalem",
    group:"north",
  },
  {
    id:"nazareth-yardenit",affiliateKey:"tour-nazareth-tiberias-tel-aviv-viator@tours-nazareth-galilee",platform:"Viator",title:"Nazareth, Tiberias, Galilee & Yardenit",
    duration:"About 10 hours",summary:"A guided day from Tel Aviv visiting Nazareth and Galilee churches with a listed stop at the Yardenit baptism site. A religious ceremony is not included automatically.",
    image:"/images/attractions/sea-of-galilee.webp",alt:"Shore and hills of the Sea of Galilee",subId:"christian_tours_nazareth_yardenit",
    group:"north",
  },];

export const christianFaqs = [
  {q:"How many days do I need for the main Christian sites?",a:"Three or four days can introduce Jerusalem, Bethlehem and the Galilee, but you will travel frequently. Five to seven days makes it easier to keep visits at a comfortable pace and allow for services and longer stays at individual churches."},
  {q:"Can I visit Bethlehem from Jerusalem?",a:"Visits to Bethlehem, a Palestinian city in the West Bank, depend on entry eligibility and current access conditions. Check whether you can enter Bethlehem, whether the checkpoints are open and whether you need a local Palestinian driver or guide. Confirm whether your Israeli rental car or private driver is permitted to enter."},
  {q:"Where was Jesus traditionally baptized?",a:"Christian tradition associates the baptism of Jesus with the lower Jordan near Qasr al-Yahud. Yardenit, at the southern end of the Sea of Galilee, is a modern designated baptism site and a different location."},
  {q:"Do I need a licensed tour guide for Christian sightseeing?",a:"You can visit many sites independently. A licensed guide can explain the history and religious significance of the places you visit. I provide private transportation; professional guiding should be arranged separately."},
  {q:"Can tourists visit churches on Sundays?",a:"Often yes, but Sunday services and local worship have priority and some areas may be temporarily restricted. Check the particular church's schedule and whether a service is open to visitors."},
  {q:"What should I wear when visiting churches?",a:"Wear modest clothing that covers your shoulders and knees. Some monasteries and sacred spaces have stricter rules; carry a scarf or additional layer and follow the site's signs."},
  {q:"Can I see Christian sites without renting a car?",a:"Yes. Jerusalem's Old City is mostly on foot, and organised day trips serve major regions. Public transport can cover some connections, but isolated church sites, steep approaches and changes of schedule may justify a driver or guided tour."},
  {q:"What is the best season for a Holy Land pilgrimage?",a:"Spring and autumn are often pleasant for walking, although religious holidays bring crowds and special schedules. Summer can be very hot, particularly around the Jordan Valley. Check each church's calendar and your preferred travel dates."},
  {q:"Is a baptism ceremony included in a Jordan River tour?",a:"A visit to the river site may be sightseeing only. Arrange your ceremony and confirm clergy, robes, changing facilities, group bookings and any fees."},
  {q:"Are Christian tours appropriate for visitors who are not religious?",a:"Yes. Churches, archaeological sites and biblical landscapes are part of the region's shared cultural and historical heritage. Choose tours with an emphasis on history, architecture and archaeology if that is your interest."},
];

export type ChristianRelated = { title:string;description:string;to:LinkProps["to"];image:string;alt:string };
export const christianSiteCards: ChristianRelated[] = [
  {title:"Churches in Jerusalem",description:"Choose the Old City, Mount of Olives, Mount Zion and Ein Karem churches",to:"/travel-blog/churches-in-jerusalem/",image:holySepulchrePhoto,alt:"Church of the Holy Sepulchre"},
  {title:"Mount of Olives",description:"Churches, slopes, viewpoints and practical access",to:"/attractions/mount-of-olives/",image:"/images/attractions/mount-of-olives.webp",alt:"Mount of Olives above Jerusalem"},
  {title:"Visiting Bethlehem from Jerusalem",description:"Plan transport and access to the Nativity Church and nearby sites",to:"/travel-blog/jerusalem-to-bethlehem/",image:bethlehemRelatedPhoto,alt:"Church of the Nativity in Bethlehem"},
  {title:"Basilica of the Annunciation",description:"Visit Nazareth's main Christian pilgrimage landmark",to:"/attractions/basilica-of-the-annunciation/",image:"/images/attractions/annunciation-dome.webp",alt:"Dome of the Basilica of the Annunciation"},
  {title:"Sea of Galilee",description:"Explore Capernaum, Tabgha, Magdala and lakeside stops",to:"/attractions/sea-of-galilee/",image:tiberiasPhoto,alt:"The Sea of Galilee seen from Tiberias"},
  {title:"Jordan River baptism sites",description:"Compare Yardenit and Qasr al-Yahud before choosing",to:"/travel-blog/baptism-in-the-jordan-river/",image:yardenitRelatedPhoto,alt:"Jordan River baptismal facilities at Yardenit"},
];
export const christianPlanningCards: ChristianRelated[] = [
  {title:"Jerusalem travel guide",description:"Practical planning for the Old City and its surroundings",to:"/travel-blog/jerusalem-travel-guide/",image:"/images/attractions/jerusalem.webp",alt:"Jerusalem panorama"},
  {title:"Israel in 5 days",description:"Build a short itinerary with sensible travel distances",to:"/travel-blog/israel-itinerary-5-days/",image:fiveDayPhoto,alt:"Caesarea by the Mediterranean"},
  {title:"Israel in 7 days",description:"Slow down and allow time for northern and central Israel",to:"/travel-blog/israel-itinerary-7-days/",image:sevenDayPhoto,alt:"Green landscape around the Sea of Galilee"},
  {title:"Israel's calendar of events",description:"Understand religious dates and changes to opening hours",to:"/travel-blog/calendar-of-events/",image:calendarPhoto,alt:"Israel calendar guide"},
  {title:"Getting around Israel",description:"Train, bus, road travel and intercity transport basics",to:"/travel-blog/getting-around-israel/",image:railPhoto,alt:"Passenger train at Ben Gurion Airport station"},
  {title:"Private driver in Israel",description:"Discuss a tailored multi-stop journey with Moshe Barak",to:"/private-driver-in-israel/",image:privateDriverPhoto,alt:"Licensed passenger taxi vehicle in Israel, illustrating private transport"},
];
