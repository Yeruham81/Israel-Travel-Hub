import type { Attraction } from "@/data/attractionGuideTypes";
import haifaImg from "@/assets/haifa/panorama.webp";
import akkoImg from "@/assets/shore-excursions/akko-port.jpg";
import lake from "@/assets/home/tiberias-lake.webp";
import roshHanikra from "@/assets/guides/rosh-hanikra.jpg";
import mountTabor from "@/assets/guides/mount-tabor.jpg";
import capernaum from "@/assets/guides/capernaum.jpg";
import tabgha from "@/assets/guides/tabgha.jpg";
import mountOfBeatitudes from "@/assets/guides/mount-of-beatitudes.jpg";
export const northernAttractions: Record<string, Attraction> = {
"sea-of-galilee":{
 title:"Sea of Galilee: shores, historic sites and visitor guide",description:"Discover the Sea of Galilee, Tiberias, Capernaum, Tabgha, Mount of Beatitudes and scenic lakeside sites, with access and planning tips.",
 region:"Sea of Galilee",image:{src:lake,alt:"Tiberias and the shores of the Sea of Galilee"},duration:"Full day to two days",
 intro:"Lake Kinneret, known internationally as the Sea of Galilee, combines freshwater shores with landscapes important to Jewish and Christian history. Lakeside towns, sanctuaries and trails spread around the water, so choosing a base matters.",
 takeaway:"Start with Tiberias if you need accommodation and services, or focus on the northwestern shore if your priority is the Gospel sites. A car or driver makes multiple lake stops more practical.",
 highlights:[
 {name:"Tiberias",description:"An established lakeside city with hotels, a promenade and religious and historic sites.",tip:"Check summer heat and whether your chosen beach is designated for swimming."},
 {name:"Capernaum",description:"A lakeside archaeological and Christian pilgrimage area associated with Jesus' Galilean ministry.",tip:"The Franciscan archaeological compound and nearby Greek Orthodox church are distinct sites."},
 {name:"Tabgha",description:"Historic churches commemorate the feeding of the multitude and Peter's primacy beside the northwestern shore.",tip:"Respect worship schedules and keep shoulders and knees covered where requested."},
 {name:"Mount of Beatitudes",description:"A hilltop sanctuary overlooking the lake commemorates the Sermon on the Mount.",tip:"Hours and group access differ from the lakeside churches."},
 {name:"Nature, beaches and scenic stops",description:"Designated swimming spots, walking paths and nearby springs provide a counterpoint to religious landmarks.",tip:"Use regulated beaches and consult notices before entering water."}],
 arrival:["Tiberias is reached by intercity buses from major hubs; lakeside sites can be harder to reach independently.","Allow significant time to get between shores, especially without a car.","A private driver may be worthwhile for multiple small sites; confirm the itinerary and return timing."],
 planning:["Respect religious services, and verify closures and opening times on official sites.","Do not assume every part of the lake shore permits swimming or public access.","Hot days require water and shade breaks.","Combine two or three nearby sanctuaries to avoid a rushed visit."],
 faqs:[{q:"Is the Sea of Galilee actually a sea?",a:"No. It is a freshwater lake, also called Lake Kinneret."},{q:"Can I reach all the Christian sites by foot from Tiberias?",a:"Not comfortably. Most are spread around the northwestern shore and need road transport."},{q:"Where should I stay?",a:"Tiberias offers a broad range of accommodation and transport connections."}],
 official:[{label:"Israel Nature and Parks Authority",url:"https://en.parks.org.il/"}],
},
"akko-acre":{
 title:"Akko (Acre): Crusader halls, tunnels, market and harbour",description:"Plan a visit to Old Akko, including the Hospitaller Halls, Templar Tunnel, citadel, bazaar, Ottoman heritage and harbour.",
 region:"Haifa & northern coast",image:{src:akkoImg,alt:"Historic port of Akko on Israel's Mediterranean coast"},duration:"3–6 hours",
 intro:"Old Akko sits behind stone walls on the Mediterranean, preserving layers of Crusader, Ottoman and modern history. Its subterranean monuments are as compelling as the alleys, market and harbour above them.",
 takeaway:"Prioritise the Hospitaller Halls and one or two neighbouring paid heritage sites, then wander the market and harbour. Check combined admission arrangements rather than assuming every site shares a ticket.",
 highlights:[
 {name:"Hospitaller Halls and citadel",description:"Underground Crusader-era ceremonial and service halls reveal the scale of Akko's medieval history.",tip:"Check touring routes and opening times; ticket bundles can change."},
 {name:"Templar Tunnel",description:"A restored passage beneath the old town is linked to the medieval Templar quarter and port.",tip:"Check accessibility and seasonal opening before visiting."},
 {name:"Old market and lanes",description:"A busy mix of food stalls, shops, religious buildings and residential alleys creates the atmosphere of a living historic city.",tip:"Visit respectfully; private homes and courtyards are not tourist exhibits."},
 {name:"Ottoman Khan, walls and harbour",description:"Coastal fortifications and Ottoman-period heritage frame the fishing port and sea views.",tip:"Not all historic buildings are open for independent entry."}],
 arrival:["Akko has a train station outside the old town, followed by a local bus, taxi or a walk.","A visit from Haifa can be relatively straightforward by rail, though Shabbat services are restricted.","Old Town lanes are mostly explored on foot; arrange a road-accessible drop-off."],
 planning:["Check official attraction ticket combinations and any required reservation.","Wear stable shoes on old stone paving and stairs.","Choose half a day rather than squeezing Akko into a short stop.","Leave some time for the harbour and local food."],
 faqs:[{q:"Is Akko the same as Acre?",a:"Yes. Akko, Acre and Akka are names used for the same Mediterranean city."},{q:"Are Crusader halls underground?",a:"Several key parts of the Hospitaller complex are preserved below the present-day street level."},{q:"Can I visit Akko without a car?",a:"Yes, by train plus a local connection or walk, subject to service schedules."}],
 official:[{label:"Old Akko official heritage site",url:"https://www.akko.org.il/en/"}],
},
"rosh-hanikra":{
 title:"Rosh Hanikra: sea grottoes and the northern coast",description:"Plan Rosh Hanikra's coastal grottoes, scenic viewpoints, cable-car access when operating and nearby north-coast stops.",
 region:"Haifa & northern coast",image:{src:roshHanikra,alt:"Turquoise seawater inside the grottoes at Rosh Hanikra"},duration:"1–2 hours, excluding travel",
 intro:"At Israel's far northern Mediterranean coastline, Rosh Hanikra is known for pale limestone cliffs and sea-carved grottoes. Access to the tourist facilities can be disrupted by regional security and operational restrictions.",
 takeaway:"Confirm the visitor site's current operating status directly before travelling north. A dramatic viewpoint does not guarantee that the grotto tunnels or cable car are accessible on your date.",
 highlights:[
 {name:"Sea caves and grottoes",description:"Waves have carved passages and chambers into the chalky rock at the coast.",tip:"Access depends on the visitor site's operation and sea conditions."},
 {name:"Cliffside cable car",description:"A steep cable-car descent has historically connected the upper tourist site to the grotto walk.",tip:"Treat operation and ticket inclusion as date-specific, not guaranteed."},
 {name:"Northern Mediterranean views",description:"The white cliffs provide distinctive coastal scenery near the border area.",tip:"Obey security restrictions, barriers and official instructions."},
 {name:"Nearby beaches and towns",description:"The wider western Galilee coast includes Akko, Nahariya and designated beaches.",tip:"Do not assume restrictions or access are the same at every point."}],
 arrival:["Rosh Hanikra is north of Nahariya near the Lebanese border.","Public transport can take you toward Nahariya, but the final connection needs confirming.","Check security and road conditions before scheduling a driver, car rental or group trip."],
 planning:["Verify whether the site and cable car operate on your date.","Do not approach border fencing or prohibited areas.","Closed-toe shoes help on damp cave paths where access is permitted.","Choose a flexible backup attraction in the Western Galilee."],
 faqs:[{q:"Is Rosh Hanikra always open?",a:"No. Regional security and operating conditions can close the tourist site; seek a dated operator update."},{q:"Do I need the cable car?",a:"The historic tourist experience has used the cable car for cave access, but confirm current operation and alternatives."},{q:"Is this a swimming beach?",a:"No. The grotto area is not a designated bathing beach."}],
 official:[{label:"Rosh Hanikra visitor information",url:"https://www.rosh-hanikra.com/"}],
},
"haifa":{
 title:"Haifa visitor guide: Bahá’í Gardens, German Colony and coast",description:"Explore Haifa's Bahá’í Gardens, German Colony, Carmel views, museums, Bat Galim and the beach, with transport and visiting tips.",
 region:"Haifa & northern coast",image:{src:haifaImg,alt:"Haifa panorama above the Bahá’í Gardens"},duration:"One to two days",
 intro:"Haifa stretches from an active Mediterranean port to steep neighbourhoods on Mount Carmel. The Bahá’í Gardens and their terraces are a defining landmark, while the German Colony, museums, coastline and viewpoints offer varied city experiences.",
 takeaway:"Plan by elevation: choose a Carmel viewpoint and Bahá’í access point, then continue toward the German Colony or coast. The terraces have controlled visitor routes, so check approved viewpoints and tours rather than assuming free access from top to bottom.",
 highlights:[
 {name:"Bahá’í Gardens and Shrine",description:"Landscaped terraces climb the Carmel hillside around the Shrine of the Báb. Visitors use designated entrances and, for certain areas, guided visits.",tip:"Consult the official Gardens site for current openings, modest-dress rules and reservation requirements."},
 {name:"German Colony",description:"Historic Templer-era houses and restaurants line Ben Gurion Boulevard below the Gardens.",tip:"An excellent area for viewing the Gardens from the foot of the hill."},
 {name:"Mount Carmel and city overlooks",description:"Higher districts provide expansive views of the bay and port.",tip:"The hill can be steep; use transport between upper and lower stops."},
 {name:"Bat Galim and the coast",description:"Promenades, beach areas and maritime views give a very different perspective on the city.",tip:"Check safe bathing zones and waterfront access."},
 {name:"Museums and cultural institutions",description:"The Haifa Museums network and smaller institutions cover art, maritime heritage and local history.",tip:"Choose a museum by its current exhibition and check the specific branch hours."}],
 arrival:["Haifa has multiple railway stations along the coast, including Center HaShmona and Hof HaCarmel.","The Carmelit underground funicular, buses and taxis can help negotiate Carmel's slopes.","If arriving on a cruise, verify the passenger terminal and security gate before making plans."],
 planning:["Check official Bahá’í Gardens access procedures; the full terrace route is not an unrestricted public walkway.","Allow additional journey time between steep neighbourhoods.","Observe religious-site clothing and photography guidance.","A combination of hillside gardens and coast works better than many museum stops in one afternoon."],
 faqs:[{q:"Can I walk through all Bahá’í Garden terraces?",a:"Only designated areas and authorised guided routes may be open; see the official Gardens visit guidance."},{q:"What is the best train stop for downtown Haifa?",a:"Haifa Center HaShmona is useful for much of downtown and the German Colony, but check your exact destination."},{q:"Is Haifa easy to explore on foot?",a:"Individual districts are, but the slopes make cross-neighbourhood walks demanding."}],
 official:[{label:"Bahá’í Gardens official visits",url:"https://ganbahai.org.il/"}],
},
"mount-tabor":{
 title:"Mount Tabor: Church of the Transfiguration and Galilee views",description:"Visit Mount Tabor's Church of the Transfiguration, hilltop viewpoints and pilgrimage setting, with advice on shuttle access and opening hours.",
 region:"Sea of Galilee",image:{src:mountTabor,alt:"Church of the Transfiguration on Mount Tabor"},duration:"1–2 hours plus access time",
 intro:"Mount Tabor rises prominently above the Jezreel Valley and is traditionally associated with the Transfiguration of Jesus. The Franciscan sanctuary, views and wooded slopes form the focus of most visits.",
 takeaway:"Reach the base area first and confirm how visitors are currently admitted to the hilltop. Access for large coaches and private vehicles can be restricted, making a local shuttle or taxi necessary.",
 highlights:[
 {name:"Church of the Transfiguration",description:"A Franciscan church marks the Christian tradition of Jesus' transfiguration and is known for its distinctive architecture.",tip:"Dress modestly; services and visitor opening times take precedence."},
 {name:"Hilltop panorama",description:"The summit has viewpoints across the Jezreel Valley and towards Lower Galilee.",tip:"Haze and weather strongly affect the views."},
 {name:"Historic sanctuaries",description:"Remains and neighbouring churches reflect the mountain's long religious significance.",tip:"Confirm which areas are accessible rather than assuming every compound is open."}],
 arrival:["Mount Tabor lies near Daburiyya and Kfar Tavor in Lower Galilee.","Access up the steep road can be restricted; verify local transport at the base.","Public transport to nearby communities is not the same as transport to the summit."],
 planning:["Check religious services, opening times and the current ascent arrangement.","Wear footwear suitable for steps and uneven surfaces.","Allow extra time if a shuttle operates by demand.","Combine with nearby Galilee stops only if time and site access allow."],
 faqs:[{q:"Can a large tour bus drive to the church?",a:"Hilltop vehicle restrictions can apply; check the current local shuttle or taxi arrangement."},{q:"Is Mount Tabor the same as Mount of Beatitudes?",a:"No. Mount Tabor is in Lower Galilee; Mount of Beatitudes overlooks the Sea of Galilee."},{q:"Is the summit open all day?",a:"No. Church and site access depend on current visiting hours and services."}],
 official:[{label:"Christian Information Center",url:"https://www.cicts.org/"}],
},
"capernaum":{
 title:"Capernaum: ancient synagogue and churches by the Sea of Galilee",description:"Plan Capernaum on the Sea of Galilee: archaeological remains, ancient synagogue, Peter's house and the nearby Greek Orthodox church.",
 region:"Sea of Galilee",image:{src:capernaum,alt:"Ancient synagogue ruins at Capernaum by the Sea of Galilee"},duration:"1–2 hours",
 intro:"Capernaum, or Kfar Nahum, is an important archaeological and Christian pilgrimage area on the northwestern Sea of Galilee. Visitors come for the ancient synagogue remains and structures associated by tradition with the ministry of Jesus.",
 takeaway:"Treat the Franciscan archaeological compound and the nearby Greek Orthodox church as separate entrances. Confirm admission and services for each, rather than expecting one ticket or timetable.",
 highlights:[
 {name:"Ancient synagogue",description:"The limestone synagogue remains stand over earlier levels associated with the Roman-period village.",tip:"Respect preservation barriers and stay on marked paths."},
 {name:"Traditional House of Peter",description:"Excavated domestic structures are identified by Christian tradition with the apostle Peter's home.",tip:"The modern church structure above the remains is part of the religious compound."},
 {name:"Greek Orthodox church",description:"A separate lakeside complex offers a different architectural and devotional setting.",tip:"Check access and photography restrictions directly."},
 {name:"Lake setting",description:"Views over the water help place this village within the geography of Jesus' Galilean ministry.",tip:"A brief shoreline pause can complement the archaeological visit."}],
 arrival:["Capernaum is north of Tiberias near the lake's northwestern shore.","A vehicle, local bus plus walk, or organised excursion may be needed; confirm individual stops.","Tabgha and Mount of Beatitudes are nearby but not immediately adjacent on foot."],
 planning:["Wear respectful clothing for churches and archaeological sanctuaries.","Confirm separate admission for each compound.","Carry drinking water; exposed archaeological areas can be hot.","Plan a sensible grouping with Tabgha or the Mount of Beatitudes."],
 faqs:[{q:"Is Capernaum the same as Kfar Nahum?",a:"Yes, they refer to the same ancient village area."},{q:"Is the ancient synagogue from Jesus' lifetime?",a:"The prominent limestone remains are generally later than the time of Jesus; earlier archaeological layers lie beneath."},{q:"Do all churches share one admission?",a:"No. Each religious compound may have separate entrance rules."}],
 official:[{label:"Christian Information Center",url:"https://www.cicts.org/"}],
},
"tabgha":{
 title:"Tabgha: Church of the Multiplication and Primacy of Peter",description:"Discover Tabgha's two major pilgrimage churches on the Sea of Galilee, their historic mosaics and lakeside setting.",
 region:"Sea of Galilee",image:{src:tabgha,alt:"Courtyard and olive tree at the Church of the Multiplication in Tabgha"},duration:"1–2 hours",
 intro:"Tabgha is a quiet lakeside area west of Capernaum, traditionally linked with two New Testament events: the feeding of the multitude and Jesus' post-resurrection appearance to his disciples.",
 takeaway:"Visit the Church of the Multiplication and the Church of the Primacy of Peter as two separate sanctuaries. Walking distances are manageable for some visitors, but vehicle access and services differ.",
 highlights:[
 {name:"Church of the Multiplication",description:"An important modern church preserves early Christian mosaic heritage, including the traditional loaves-and-fishes design.",tip:"Look for worship and preservation notices before approaching the sanctuary."},
 {name:"Church of the Primacy of Peter",description:"The Franciscan church marks a tradition associated with Jesus, Peter and the lakeside meal.",tip:"Keep the shore and prayer spaces quiet; follow access signs."},
 {name:"Landscape and shoreline",description:"The area offers intimate views of the Sea of Galilee and a different atmosphere from urban Tiberias.",tip:"Do not assume the shore is an unrestricted public bathing area."}],
 arrival:["Tabgha sits on the northwest shore between Magdala and Capernaum.","Intercity transport does not necessarily stop directly at each church; plan the last leg.","Combine with Capernaum or Mount of Beatitudes when transport and visit schedules allow."],
 planning:["Check the two churches' separate opening and service arrangements.","Modest dress is appropriate.","Carry water for outdoor paths, particularly in summer.","Group access may need arrangement during pilgrimage seasons."],
 faqs:[{q:"What is Tabgha famous for?",a:"The churches commemorating the feeding of the multitude and the primacy of Peter."},{q:"Are the churches at one entrance?",a:"No. They are nearby but separately operated sanctuaries."},{q:"Is Tabgha a town?",a:"The name identifies a historical and religious lakeside area, not a large modern city."}],
 official:[{label:"Christian Information Center",url:"https://www.cicts.org/"}],
},
"mount-of-beatitudes":{
 title:"Mount of Beatitudes: church and panorama over Galilee",description:"Visit the Mount of Beatitudes above the Sea of Galilee: hilltop church, garden paths, viewpoints and practical travel advice.",
 region:"Sea of Galilee",image:{src:mountOfBeatitudes,alt:"Church of the Beatitudes and its gardens above the Sea of Galilee"},duration:"1–2 hours",
 intro:"The Mount of Beatitudes is traditionally associated with Jesus' Sermon on the Mount. Its peaceful sanctuary, gardens and views across the Sea of Galilee give the site a contemplative character.",
 takeaway:"Visit the church and its grounds with time for quiet reflection. This is a separate hilltop site from Mount Tabor, and access requires a distinct road journey.",
 highlights:[
 {name:"Church of the Beatitudes",description:"A distinctive octagonal Catholic church marks the setting of the Sermon on the Mount in Christian tradition.",tip:"Dress respectfully and check visiting hours and services."},
 {name:"Garden paths and quiet spaces",description:"The landscaped grounds encourage slow walking and contemplation.",tip:"Keep group noise low and respect reserved prayer areas."},
 {name:"Sea of Galilee viewpoint",description:"The hillside provides memorable views of the lake and surrounding Lower Galilee.",tip:"Views change with haze and weather; mornings are often more comfortable in warm seasons."}],
 arrival:["The Mount of Beatitudes is on a hillside north of the lake, not in Tiberias itself.","A road transfer is generally needed from Capernaum or other lakeside sites.","Check whether coaches have a specified parking and drop-off area."],
 planning:["Check current admission arrangements and worship schedules.","Bring sun protection for outdoor areas.","Choose a manageable route if anyone has mobility limitations.","A quieter visit works better than fitting it into an overloaded day."],
 faqs:[{q:"Is Mount of Beatitudes the same as Mount Tabor?",a:"No. These are two distinct Christian pilgrimage sites in different parts of Galilee."},{q:"Can visitors enter the church?",a:"Visitor access is generally possible when open, but services and private events take priority."},{q:"Is there a panoramic view?",a:"Yes. The grounds overlook the northern Sea of Galilee."}],
 official:[{label:"Christian Information Center",url:"https://www.cicts.org/"}],
}
};
