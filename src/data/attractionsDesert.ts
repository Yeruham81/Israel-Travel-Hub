import type { Attraction } from "@/data/attractionGuideTypes";
import deadSea from "@/assets/dead-sea/landscape.webp";
import einGedi from "@/assets/dead-sea/ein-gedi.webp";
import ramonCrater from "@/assets/guides/mitzpe-ramon-crater.jpg";
export const desertAttractions: Record<string, Attraction> = {
"dead-sea-attractions": {
 title:"Dead Sea attractions: beaches, nature and historic sites",description:"Explore the Dead Sea's top attractions, from Ein Bokek and Masada to Ein Gedi and desert viewpoints, with planning and road-trip advice.",region:"Dead Sea & Negev",image:{src:deadSea,alt:"Dead Sea mountains and shoreline"},duration:"One day to several days",
 intro:"The Dead Sea region is more than a place to float. Desert ruins, mineral-rich shores, reserves and wide open viewpoints reward visitors who know how far apart the stops are. The resort strip of Ein Bokek is different from the northern Dead Sea and Ein Gedi.",
 takeaway:"Choose two or three compatible activities rather than every attraction. Masada and a designated swimming beach are a popular pairing; Ein Gedi requires separate trail planning and current access checks.",
 highlights:[
 {name:"Designated Dead Sea swimming beaches",description:"Ein Bokek's managed beach zone offers facilities near major hotels. Conditions and seasonal access differ around the lake.",tip:"Use only designated swimming areas; never enter muddy or unregulated shoreline with sinkhole risks."},
 {name:"Masada National Park",description:"An ancient fortress above the Dead Sea, reached by cable car or permitted hiking trails.",tip:"Check the entrance side, heat alerts and official reservations before departure."},
 {name:"Ein Gedi Nature Reserve",description:"Desert springs, vegetation and canyons contrast sharply with the lake basin.",tip:"Rockfall and flood damage have affected access; verify the specific open route rather than assuming full access."},
 {name:"Qumran and desert archaeology",description:"The area around Qumran is associated with the Dead Sea Scrolls and desert archaeological sites.",tip:"Admission and route availability vary; check the parks authority."},
 {name:"Lookouts and other stops",description:"Roadside views, visitor centres and nearby desert towns can round out a longer stay.",tip:"Do not stop on highway shoulders or enter unsigned desert tracks."}],
 arrival:["Road travel from Jerusalem or Ben Gurion Airport generally requires a car, driver or a careful bus connection.","Public buses can serve specific resort stops, but services are limited and often unavailable during Shabbat.","The north and south shores are not interchangeable: check the exact beach or hotel address."],
 planning:["Dead Sea water is extremely salty: avoid eyes and wounds; rinse at provided showers.","Drink water, use shade and avoid midday desert hikes.","Watch weather and flash-flood alerts, especially around wadis.","Check the official site for trails and admission before assuming a location is open."],
 faqs:[{q:"Is the Dead Sea safe for swimming anywhere?",a:"No. Use designated supervised facilities; unstable shorelines and sinkholes make informal access hazardous."},{q:"Can I combine Masada and Ein Gedi?",a:"Sometimes, but check actual Ein Gedi trail access and allow realistic time for both."},{q:"Does Ein Bokek require a ticket?",a:"Public beach access is generally available; paid spa, hotel and excursion facilities are separate."}],
 official:[{label:"Israel Nature and Parks Authority",url:"https://en.parks.org.il/"}],
},
"mitzpe-ramon-crater": {
 title:"Mitzpe Ramon & Ramon Crater: viewpoints and desert nature",description:"Visit the Makhtesh Ramon crater, Mitzpe Ramon viewpoints, visitor centre, desert trails and stargazing, with weather and access tips.",region:"Dead Sea & Negev",image:{src:ramonCrater,alt:"Layered desert cliffs and the landscape of Ramon Crater"},duration:"Half day to two days",
 intro:"Makhtesh Ramon is a huge erosion landform carved through the Negev Highlands, not a volcanic or meteor-impact crater. The town of Mitzpe Ramon stands on its rim and makes a comfortable starting point for scenery, geology and desert experiences.",
 takeaway:"Begin at a marked rim viewpoint and the visitor centre, then choose a short signed trail or authorised guided experience. Overnight stays let you enjoy cooler walking hours and clear-sky stargazing.",
 highlights:[
 {name:"Ramon Crater Visitor Center",description:"Exhibits interpret the geology, ecology and the legacy of astronaut Ilan Ramon.",tip:"Check reservations, opening conditions and guided programmes in advance."},
 {name:"Rim viewpoints and promenade",description:"Lookouts along the town-side cliff reveal the makhtesh's scale and layered rock.",tip:"Keep well behind cliff edges and respect wildlife."},
 {name:"Marked desert trails",description:"Walking options differ by difficulty, shade and access; routes at the bottom of the crater need extra planning.",tip:"Carry ample water and maps, and check heat and flash-flood warnings."},
 {name:"Stargazing and desert experiences",description:"The remote Negev setting can provide striking night skies; authorised activities vary by provider and weather.",tip:"Use a reputable local guide for off-road access and never drive on unmarked trails."}],
 arrival:["Mitzpe Ramon is south of Beersheba, reached via Route 40 by road or relevant intercity buses.","Public transport serves the town, but reaching individual trailheads may require additional transport.","For a desert outing, a rental car or confirmed driver gives more flexibility, with weather constraints."],
 planning:["Summer midday heat can be dangerous; choose cooler hours.","Do not approach wild ibex or feed animals.","Park only in authorised places and never walk near unstable cliffs.","Check weather, flash floods, trail closures and site access with the parks authority."],
 faqs:[{q:"Is Ramon Crater a meteorite crater?",a:"No. It is a makhtesh formed mainly through erosion of folded rock layers."},{q:"Can I enjoy it without hiking?",a:"Yes. Several marked viewpoints around Mitzpe Ramon give impressive views."},{q:"Is stargazing guaranteed?",a:"No. Cloud cover, the moon, light pollution and season affect sky visibility."}],
 official:[{label:"Israel Nature and Parks Authority",url:"https://en.parks.org.il/"}],
},
"ein-gedi":{
 title:"Ein Gedi Nature Reserve: waterfalls, trails and visitor advice",description:"Plan Ein Gedi Nature Reserve near the Dead Sea, including Nahal David, Nahal Arugot, springs, wildlife and current trail restrictions.",region:"Dead Sea & Negev",image:{src:einGedi,alt:"Desert oasis vegetation near Ein Gedi"},duration:"2–4 hours for an accessible open route",
 intro:"Ein Gedi is a desert oasis beside the Dead Sea, known for springs, ravines and ibex. Its streams and canyon paths are weather-sensitive, and damage from rockfalls and flash floods means the open trail network can change.",
 takeaway:"Check the reserve's official, date-specific opening announcement before setting out. Choose only an open trail appropriate to the group's ability and allow for significant heat even when water is present.",
 highlights:[
 {name:"Nahal David",description:"A well-known stream canyon and waterfall area, subject to changing access and repair after damage.",tip:"Do not assume the full former walking circuit is open."},
 {name:"Nahal Arugot",description:"A separate canyon route with longer walking opportunities when conditions permit.",tip:"Check whether this route is open and whether a timed entrance is required."},
 {name:"Oasis wildlife",description:"Ibex, hyrax and a variety of birds inhabit the reserve's rocky habitat.",tip:"Keep your distance and never feed wild animals."},
 {name:"Kibbutz and surrounding Dead Sea area",description:"Nearby facilities and viewpoints may be visited separately from protected reserve trails.",tip:"Distinguish the nature reserve entrance from hotel and spa locations."}],
 arrival:["Ein Gedi lies along Route 90, north of the Ein Bokek resort strip.","Public buses may stop nearby on some dates, but verify the correct stop and last return service.","Driving or an arranged vehicle can simplify a visit, but parking does not guarantee entry or an open trail."],
 planning:["Rockfall and flash-flood restrictions can change with little warning.","Bring water, closed shoes and sun protection; water in the canyon is not drinking water.","Do not enter closed trail sections or cross barricades.","Pair this with a Dead Sea stop only after confirming the reserve will be open."],
 faqs:[{q:"Is Ein Gedi fully open?",a:"Trail accessibility changes. Check the current official Israel Nature and Parks Authority alert for the particular route."},{q:"Can I hike Nahal David and Nahal Arugot on the same visit?",a:"Possibly when both are open, but the two trail systems and available time need separate consideration."},{q:"Can I swim in the Dead Sea at the reserve?",a:"Nature-reserve trails are not a supervised Dead Sea swimming facility. Use designated safe beaches elsewhere."}],
 official:[{label:"Israel Nature and Parks Authority",url:"https://en.parks.org.il/"}],
}
};
