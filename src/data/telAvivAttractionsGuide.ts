import type { LinkProps } from "@tanstack/react-router";
import type { Attraction } from "@/data/attractionGuideTypes";
import hero from "@/assets/guides/tel-aviv-attractions-hero.webp";
import jaffa from "@/assets/tel-aviv/jaffa.webp";
import beaches from "@/assets/guides/2026-10/beaches-in-tel-aviv.webp";
import neve from "@/assets/tel-aviv/neve-tzedek.webp";
import rothschild from "@/assets/tel-aviv/rothschild.webp";
import florentin from "@/assets/tel-aviv/florentin.webp";
import dizengoff from "@/assets/tel-aviv/dizengoff.webp";

export type TelAvivExperience = {
  id: string; title: string; shortTitle: string; area: string; category: string;
  bestFor: string; time: string; entry: string; description: string;
  practical: string; tip: string; transport: string;
  image: {src:string;alt:string};
  mapLinks: {label:string;query:string}[];
  guide?: {label:string;to:LinkProps["to"]};
  official?: {label:string;url:string;note?:string};
  additionalOfficial?: {label:string;url:string;note?:string};
};

/** Canonical cover: the page header and all cards linking here must use the same photograph. */
export const telAvivAttractionsHero = { src: hero, alt: "I Love Tel Aviv sign on the Tel Aviv Port promenade overlooking the Mediterranean Sea" } as const;

export const telAvivAttractionsUpdatedAt="2026-11-20";
export const telAvivExperiences: TelAvivExperience[]=[
  {
    id:"old-jaffa",title:"Wander through Old Jaffa and its port",shortTitle:"Old Jaffa",area:"Jaffa",category:"Historic streets & harbour",
    bestFor:"History, viewpoints and harbour walks",time:"2–4 hours",entry:"Public lanes and viewpoints free; selected sites charge",
    description:"Jaffa's historic stone alleys, Kedumim Square, churches, galleries and fishing harbour contrast beautifully with modern Tel Aviv. You can spend a rewarding morning walking from the Clock Tower up to the old hill, down to the port and across to the flea market.",
    practical:"The upper old town has steps and uneven stone surfaces. Public viewpoints and lanes can be visited without tickets, but museums, performances and individual exhibitions have their own hours and admission rules. Restaurants around the flea market may be open when the daytime stalls are not.",
    tip:"I'd explore the hill before the hottest part of the day and leave time for the sea views from Summit Garden. The port is a pleasant place for a break.",
    transport:"Use the Red Line light rail or a suitable bus and walk from the Clock Tower area. Arrange drop-off close to an accessible entrance if needed.",
    image:{src:jaffa,alt:"Old stone buildings and picturesque streets in historic Jaffa"},
    guide:{label:"My detailed guide to Old Jaffa",to:"/attractions/jaffa/"},
    official:{label:"Old Jaffa sightseeing route - municipality (Hebrew)",url:"https://www.tel-aviv.gov.il/Visitors/Jaffa/Pages/oldjaffatour.aspx",note:"Hebrew"},
    mapLinks:[{label:"Jaffa Clock Tower",query:"Jaffa Clock Tower Tel Aviv Yafo Israel"},{label:"Kedumim Square",query:"Kedumim Square Old Jaffa Israel"},{label:"Jaffa Port",query:"Jaffa Port Tel Aviv Israel"}]
  },
  {
    id:"beaches",title:"Enjoy the beaches and seaside promenade",shortTitle:"Beaches & promenade",area:"Central coast",category:"Seaside & relaxation",
    bestFor:"Swimming, people-watching and sunset walks",time:"1–3 hours or longer",entry:"Promenade free; supervised public beaches are generally free",
    description:"The Mediterranean coastline is Tel Aviv's most immediately recognisable attraction. Gordon, Frishman and neighbouring central beaches are convenient for a dip, a rest beneath the shade and a walk along the continuous promenade towards Jaffa or the northern port.",
    practical:"Swim only in designated areas while lifeguards are on duty, and check sea conditions, flags and any seasonal restrictions. Facilities, accessibility, sports areas and lifeguard hours differ by beach.",
    tip:"I prefer choosing one central beach close to the day's other plans.",
    transport:"Walk or cycle along the beachfront; buses and taxis serve parallel streets. Tel Aviv's railway stations are farther inland, so take a bus or taxi to the beach.",
    image:{src:beaches,alt:"Sandy Mediterranean bathing beach and blue sea in Tel Aviv"},
    guide:{label:"My complete Tel Aviv beach guide",to:"/travel-blog/beaches-in-tel-aviv/"},
    official:{label:"Tel Aviv beach information - municipality",url:"https://www.tel-aviv.gov.il/en/visit/beaches/pages/default.aspx"},
    additionalOfficial:{label:"Live municipal beach and lifeguard information (Hebrew)",url:"https://www.tel-aviv.gov.il/Visitors/Beaches/Pages/Beaches.aspx",note:"Hebrew"},
    mapLinks:[{label:"Gordon Beach",query:"Gordon Beach Tel Aviv Israel"},{label:"Frishman Beach",query:"Frishman Beach Tel Aviv Israel"}]
  },
  {
    id:"carmel-market",title:"Taste your way through Carmel Market",shortTitle:"Carmel Market",area:"Kerem HaTeimanim",category:"Markets & local food",
    bestFor:"Street food, lively stalls and local atmosphere",time:"1–2 hours",entry:"Free to explore; food and tastings extra",
    description:"Carmel Market is one of the liveliest places in Tel Aviv, filled with fresh produce, spices, pastries and street food. The neighbouring Kerem HaTeimanim streets offer a quieter contrast with low-rise houses and small places to eat.",
    practical:"The market is usually liveliest on weekdays and Friday mornings, and most stalls close before Shabbat. Opening hours vary between shops and stalls. The nearby Nahalat Binyamin Arts & Crafts Fair generally runs on Tuesdays and Fridays; check the organisers’ current schedule. The pedestrian lanes can be busy and uneven; watch for delivery carts.",
    tip:"I'd come hungry, taste a few things that appeal to you and then walk towards the nearby Nahalat Binyamin crafts area when the fair is operating.",
    transport:"Best approached on foot from central Tel Aviv, the seafront or Allenby Street; parking nearby can be difficult.",
    image:{src:"/images/tel-aviv-attractions/carmel-market.webp",alt:"Carmel Market in central Tel Aviv"},
    mapLinks:[{label:"Carmel Market",query:"Carmel Market Tel Aviv Yafo Israel"},{label:"Nahalat Binyamin Arts Fair",query:"Nahalat Binyamin Arts and Crafts Fair Tel Aviv Israel"}],
    official:{label:"Carmel Market - municipal page (Hebrew)",url:"https://www.tel-aviv.gov.il/Residents/Development/Pages/CarmelMarket.aspx",note:"Hebrew"},
    additionalOfficial:{label:"Nahalat Binyamin Arts & Crafts Fair - official website",url:"https://nachalatbinyamin-tlv.com/en/"}
  },
  {
    id:"neve-tzedek",title:"Explore Neve Tzedek's historic lanes",shortTitle:"Neve Tzedek",area:"South-central Tel Aviv",category:"Architecture & neighbourhoods",
    bestFor:"Historic streets, boutiques and relaxed cafés",time:"1–2 hours",entry:"Neighbourhood streets free; exhibitions and performances vary",
    description:"Neve Tzedek developed outside old Jaffa before Tel Aviv was founded. Its restored houses, colourful doorways, galleries and pedestrian-friendly side streets invite a slower wander. The Suzanne Dellal Centre adds a cultural landmark in the heart of the area.",
    practical:"This is a residential neighbourhood as well as a visitor destination. Please respect local privacy. Galleries, shops, the Suzanne Dellal programme and the old railway-station compound set their own schedules. Plan exhibition or performance visits around their opening times.",
    tip:"I'd combine Neve Tzedek with Jaffa, the old railway-station area or a food stop at Carmel Market.",
    transport:"Walk from Jaffa or the southern centre. You can also reach Neve Tzedek by light rail or bus.",
    image:{src:neve,alt:"Restored historic houses and intimate streets of Neve Tzedek"},
    mapLinks:[{label:"Suzanne Dellal Centre",query:"Suzanne Dellal Centre Neve Tzedek Tel Aviv Israel"},{label:"Neve Tzedek",query:"Neve Tzedek Tel Aviv Israel"}],
    official:{label:"Neve Tzedek heritage - Suzanne Dellal Centre",url:"https://suzannedellal.org.il/en/neve-tzedek/"}
  },
  {
    id:"white-city",title:"Follow Rothschild Boulevard through the White City",shortTitle:"Rothschild & White City",area:"Central Tel Aviv",category:"Bauhaus architecture & city life",
    bestFor:"Design, city history and relaxed boulevard walks",time:"1–2 hours",entry:"Outdoor architecture walk free; guided visits vary",
    description:"Rothschild Boulevard is an attractive place to understand Tel Aviv's early development and its concentration of International Style architecture. Tree-lined paths, cafés, nearby streets and historic public buildings make it an appealing self-guided walk.",
    practical:"The UNESCO-listed White City covers a broad historic area, not one building. Buildings are mostly private or in active use, so admire their façades from public streets. Independence Hall and other historic interiors may have separate arrangements or be closed for renovation.",
    tip:"Start near the southern end of Rothschild Boulevard and take time to explore the surrounding side streets.",
    transport:"Reach the boulevard on foot from Allenby, the market area or the Red Line; allow time to continue towards Habima.",
    image:{src:rothschild,alt:"Shaded Rothschild Boulevard and its surrounding early Tel Aviv architecture"},
    mapLinks:[{label:"Rothschild Boulevard",query:"Rothschild Boulevard 16 Tel Aviv Israel"},{label:"Liebling Haus White City Center",query:"Liebling Haus Idelson Street Tel Aviv Israel"}],
    official:{label:"UNESCO White City of Tel Aviv",url:"https://whc.unesco.org/en/list/1096/"}
  },
  {
    id:"tel-aviv-art-museum",title:"Visit the Tel Aviv Museum of Art",shortTitle:"Art museum",area:"Cultural district",category:"Museums & exhibitions",
    bestFor:"Art, architecture and an indoor alternative",time:"2–3 hours",entry:"Museum admission applies; some events require separate booking",
    description:"The Tel Aviv Museum of Art combines Israeli and international modern and contemporary works with striking architecture and rotating exhibitions. It's my first choice for enjoying art on a particularly hot or rainy day.",
    practical:"Check the exhibition programme, current opening hours, ticket rules and last-entry time directly with the museum. Check exhibition dates and any separate admission or guided-tour arrangements.",
    tip:"I'd reserve an unhurried couple of hours and explore the surrounding cultural district only if you still have energy.",
    transport:"The museum is east of the beachfront around Shaul HaMelech Boulevard. Use a bus, taxi or a longer walk from the central neighbourhoods.",
    image:{src:"/images/tel-aviv-attractions/tel-aviv-museum-of-art.webp",alt:"Entrance façade and sculpture outside Tel Aviv Museum of Art"},
    guide:{label:"My museums in Tel Aviv guide",to:"/travel-blog/museums-in-tel-aviv/"},
    official:{label:"Tel Aviv Museum of Art - official visitor information",url:"https://www.tamuseum.org.il/en/visit/"},
    mapLinks:[{label:"Tel Aviv Museum of Art",query:"Tel Aviv Museum of Art 27 Shaul Hamelech Tel Aviv Israel"}]
  },
  {
    id:"florentin",title:"Discover Florentin and Levinsky Market",shortTitle:"Florentin & Levinsky",area:"Southern Tel Aviv",category:"Street art & neighbourhood food",
    bestFor:"Urban culture, murals and speciality food shops",time:"1½–2½ hours",entry:"Street walk free; food and guided activities extra",
    description:"Florentin offers a different Tel Aviv mood, with workshops, cafés, old industrial façades and a changing street-art scene. Close by, Levinsky Market is known for spices, speciality food stores, coffee and small places to taste Mediterranean and Middle Eastern flavours.",
    practical:"Florentin's street art is constantly changing, with new murals appearing regularly. Some streets are busy working areas and should be explored respectfully. Market shop hours vary; many close for Shabbat, while restaurants and bars may follow different schedules.",
    tip:"I'd choose a guided street-art or food walk if you want stories behind the area, or wander independently with no fixed list of murals.",
    transport:"The area is accessible on foot from Neve Tzedek and the southern city centre. Check light-rail and bus stops for a more direct arrival.",
    image:{src:florentin,alt:"Graffiti, cafés and distinctive streets in the Florentin neighbourhood"},
    mapLinks:[{label:"Florentin street art",query:"Florentin Tel Aviv Israel"},{label:"Levinsky Market",query:"Levinsky Market Tel Aviv Israel"}]
  },
  {
    id:"sarona",title:"Combine Sarona's historic houses and food market",shortTitle:"Sarona Market",area:"East-central Tel Aviv",category:"Food & heritage",
    bestFor:"Food stalls, restored buildings and a relaxed break",time:"1–2 hours",entry:"Public compound free; food purchases extra",
    description:"Sarona blends restored nineteenth-century buildings and landscaped pedestrian paths with a modern indoor food market. It is an easy food-focused stop, with a different atmosphere from the bustle of Carmel Market and convenient access from the eastern city centre.",
    practical:"The open-air heritage compound and the indoor market are different spaces; individual stalls, businesses and exhibitions have their own opening hours. For a food-focused visit, check when the market's food stalls are open.",
    tip:"I'd plan Sarona as a lunch or early-evening stop near the museum or business district, not as a replacement for the street-market atmosphere at Carmel.",
    transport:"The complex is east of Rothschild and close to the Azrieli and Hashalom area; walking, buses and taxis are practical depending on your starting point.",
    image:{src:"/images/tel-aviv-attractions/sarona-market.webp",alt:"Glass entrance to Sarona Market in Tel Aviv"},
    mapLinks:[{label:"Sarona Market",query:"Sarona Market Tel Aviv Israel"},{label:"Sarona heritage compound",query:"Sarona Compound Tel Aviv Israel"}]
  },
  {
    id:"dizengoff",title:"Spend time around Dizengoff Square",shortTitle:"Dizengoff Square",area:"City centre",category:"Urban squares & shopping streets",
    bestFor:"Cafés, local design and people-watching",time:"1–2 hours",entry:"Public square free; shops and activities extra",
    description:"Dizengoff Square and the surrounding central streets show another side of the city: neighbourhood cafés, shops, design stores and a lively everyday street scene. The square itself is a convenient meeting point when exploring central Tel Aviv.",
    practical:"Explore the neighbourhood on foot and enjoy its cafés, shops and architecture. Shops, occasional markets and events vary by date. Be aware of cycling lanes and road crossings, particularly when walking with children.",
    tip:"I'd combine Dizengoff with the central beaches or a visit to the museum, depending on the weather and how much time you have.",
    transport:"Walk from the central seafront or use local buses; the square is not a suburban rail stop.",
    image:{src:dizengoff,alt:"Dizengoff Square and the surrounding central Tel Aviv streets"},
    mapLinks:[{label:"Dizengoff Square",query:"Dizengoff Square Tel Aviv Israel"}]
  },
  {
    id:"tel-aviv-port",title:"Walk through Tel Aviv Port and the northern waterfront",shortTitle:"Tel Aviv Port",area:"Northern waterfront",category:"Waterfront & recreation",
    bestFor:"Families, casual dining and seaside walks",time:"1½–3 hours",entry:"Public waterfront free; businesses and activities charge",
    description:"The redeveloped Tel Aviv Port, often called Namal Tel Aviv, offers broad seafront boardwalks, cafés and shops. Nearby Yarkon Park offers walking and cycling paths, open lawns and recreational facilities away from the busy city centre.",
    practical:"For swimming, choose a designated beach with lifeguard service. Choose a designated beach for entering the sea. Activities and equipment hire in the park are operated separately, with their own booking conditions.",
    tip:"I'd save the port and nearby Yarkon Park for a second day or a relaxed family afternoon.",
    transport:"The port is north of the central beachfront. Use a bus, taxi, bicycle or a longer promenade walk depending on your starting point.",
    image:{src:"/images/tel-aviv-attractions/tel-aviv-port.webp",alt:"Aerial view of Tel Aviv Port's boardwalk, buildings and the mouth of the Yarkon River"},
    mapLinks:[{label:"Tel Aviv Port",query:"Namal Tel Aviv Port Israel"},{label:"Yarkon Park",query:"Hayarkon Park Tel Aviv Israel"}]
  }
];
export const telAvivMapPoints=[
 {id:"old-jaffa",name:"Jaffa Clock Tower",label:"Jaffa",lat:32.0541,lon:34.7562,query:"Jaffa Clock Tower Tel Aviv Yafo Israel"},
 {id:"beaches",name:"Gordon Beach",label:"Beach",lat:32.0825,lon:34.7681,query:"Gordon Beach Tel Aviv Israel"},
 {id:"carmel-market",name:"Carmel Market",label:"Market",lat:32.0672,lon:34.7688,query:"Carmel Market Tel Aviv Israel"},
 {id:"neve-tzedek",name:"Suzanne Dellal Centre",label:"Neve Tzedek",lat:32.0599,lon:34.7659,query:"Suzanne Dellal Centre Tel Aviv Israel"},
 {id:"white-city",name:"Rothschild Boulevard",label:"White City",lat:32.0645,lon:34.7726,query:"Rothschild Boulevard 16 Tel Aviv Israel"},
 {id:"tel-aviv-art-museum",name:"Tel Aviv Museum of Art",label:"Museum",lat:32.0771,lon:34.7864,query:"Tel Aviv Museum of Art Israel"},
 {id:"florentin",name:"Levinsky Market",label:"Florentin",lat:32.0598,lon:34.7747,query:"Levinsky Market Tel Aviv Israel"},
 {id:"sarona",name:"Sarona Market",label:"Sarona",lat:32.0726,lon:34.7869,query:"Sarona Market Tel Aviv Israel"},
 {id:"dizengoff",name:"Dizengoff Square",label:"Dizengoff",lat:32.078,lon:34.7734,query:"Dizengoff Square Tel Aviv Israel"},
 {id:"tel-aviv-port",name:"Tel Aviv Port",label:"Port",lat:32.0974,lon:34.773,query:"Namal Tel Aviv Port Israel"}
] as const;
export const telAvivRoutes=[
 {title:"First time in Tel Aviv",kind:"Old Jaffa, neighbourhoods & the sea",allow:"Full day, around 7–9 hours including breaks",ids:["old-jaffa","neve-tzedek","carmel-market","beaches"],text:"Start in Old Jaffa, wander through Neve Tzedek and Carmel Market, then finish with a central beach or sunset promenade walk. Allow extra time if exploring museums inside Jaffa.",tip:"I'd avoid adding the northern port to this walking day. The route is more enjoyable with time for food and a rest."},
 {title:"Architecture, cafés and art",kind:"A central city culture day",allow:"About 5–7 hours depending on museum time",ids:["white-city","dizengoff","tel-aviv-art-museum","sarona"],text:"Explore Rothschild's International Style buildings, have a coffee near Dizengoff, visit the museum, and consider Sarona for food afterwards.",tip:"Allow travel time between the museum, Sarona and the earlier stops."},
 {title:"Markets and local culture",kind:"Food & street art",allow:"Half to full day, depending on tastings",ids:["carmel-market","neve-tzedek","florentin"],text:"Begin at Carmel Market, head southwest to Neve Tzedek, then finish farther east in Florentin and Levinsky Market. A guided food or street-art experience can replace part of the self-guided walk.",tip:"Choose a weekday when food markets are active. On Friday, allow for earlier closures before Shabbat. The route can also be walked in reverse."}
] as const;

/** Google Maps walking waypoints correspond to the three route cards above. */
export const telAvivRouteNavigation = [
 {origin:"Jaffa Clock Tower Tel Aviv Israel", waypoints:["Suzanne Dellal Centre Neve Tzedek Tel Aviv Israel","Carmel Market Tel Aviv Israel"], destination:"Gordon Beach Tel Aviv Israel"},
 {origin:"Rothschild Boulevard 16 Tel Aviv Israel", waypoints:["Dizengoff Square Tel Aviv Israel","Tel Aviv Museum of Art Israel"], destination:"Sarona Market Tel Aviv Israel"},
 {origin:"Carmel Market Tel Aviv Israel", waypoints:["Suzanne Dellal Centre Neve Tzedek Tel Aviv Israel"], destination:"Levinsky Market Tel Aviv Israel"},
] as const;

export const telAvivFaqs=[
 {q:"What are the must-see attractions in Tel Aviv on a first visit?",a:"I'd prioritise Old Jaffa, one central Mediterranean beach, Carmel Market and a neighbourhood walk through Neve Tzedek or Rothschild Boulevard. With another day, choose a museum, Florentin or the northern port."},
 {q:"Can I see Tel Aviv in one day?",a:"You can enjoy several central highlights in a full day, but the city stretches from Old Jaffa to the northern waterfront. Choose a route by area and allow time for food and breaks."},
 {q:"Which attractions are free?",a:"Public beaches and promenades, Old Jaffa's streets, the Rothschild architectural walk, neighbourhoods and the port waterfront are generally free to explore. Museums, performances, purchases and guided activities are separate."},
 {q:"What can I do on Shabbat (Saturday)?",a:"Seaside walks, public squares and outdoor neighbourhoods are options, while many traditional markets and normal public transport services have changed or limited schedules. The free Na’im BeSofash weekend shuttle serves parts of greater Tel Aviv on Fridays and Saturdays; check its current routes and times with the municipality. Also check beach lifeguard arrangements and the city’s event calendar."},
 {q:"How should I get around Tel Aviv?",a:"Walking is ideal within neighbourhoods, but buses, the Red Line light rail, taxis and cycling can help with longer distances. Rail stations are inland, away from the beach. Choose the transport option that suits each leg of your journey."},
 {q:"Are the beaches and Old Jaffa accessible?",a:"Some promenade and waterfront routes are relatively accessible, but historic Jaffa has slopes, steps and cobblestones. Each beach has different accessible facilities; check the specific entrance and arrangements in advance."}
];
export const telAvivEditorialOverview: Attraction={
  title:"Best Things to Do in Tel Aviv: Attractions & Local Experiences",
  description:"Explore ten Tel Aviv and Jaffa attractions: Old Jaffa, beaches, markets, Bauhaus streets, museums, Sarona and waterfront, with maps and local tips.",
  region:"Tel Aviv & Jaffa",
  image:telAvivAttractionsHero,
  duration:"One to three days",
  intro:"Tel Aviv is made for exploring on foot: seaside promenades, Old Jaffa's stone lanes, local markets, museums and energetic neighbourhoods provide different experiences within one city.",
  takeaway:"I recommend choosing three or four nearby places for one day and saving the farther northern waterfront for a separate outing.",
  highlights:telAvivExperiences.map(e=>({name:e.title,description:e.description,tip:e.tip})),
  arrival:telAvivExperiences.map(e=>e.transport),
  planning:["Use supervised bathing beaches and check lifeguard information.","Group nearby neighbourhoods to minimise transport time.","Check cultural venues, markets and public transport around Shabbat and holidays."],
  faqs:telAvivFaqs,
  official:telAvivExperiences.flatMap(e=>[...(e.official?[{label:e.official.label,url:e.official.url}]:[]),...(e.additionalOfficial?[{label:e.additionalOfficial.label,url:e.additionalOfficial.url}]:[])])
};
