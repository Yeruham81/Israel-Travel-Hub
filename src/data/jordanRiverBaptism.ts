/** Jordan River baptism editorial facts, FAQ and curated supplier identities. */
export const BAPTISM_PATH = "/travel-blog/baptism-in-the-jordan-river/";
export const BAPTISM_TITLE = "Baptism in the Jordan River: Yardenit vs. Qasr el-Yahud";
export const BAPTISM_DESCRIPTION = "My practical Jordan River baptism guide: compare Yardenit and Qasr el-Yahud, arrange clergy and robes, check access, and plan your Holy Land tour or private driver.";
export const BAPTISM_UPDATED = "2026-11-21";
export const BAPTISM_HERO = { src: "/images/attractions/jordan-river-baptism.webp", alt: "Pilgrims in white robes participating in a Jordan River baptism" } as const;
export const baptismSources = [
  {label:"Yardenit — official baptism arrangements",url:"https://www.yardenit.com/baptism/"},
  {label:"Yardenit — questions and answers",url:"https://www.yardenit.com/qa/"},
  {label:"Yardenit — contact and visitor information",url:"https://www.yardenit.com/contact/"},
  {label:"Qasr el-Yahud — official park and reservations",url:"https://en.parks.org.il/reserve-park/baptismal-site-on-the-jordan-river-qasr-al-yahud/"},
  {label:"Qasr el-Yahud — group ceremonies",url:"https://www.parks.org.il/ceremony/%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%99%D7%95%D7%AA-%D7%A9%D7%A0%D7%99%D7%AA%D7%9F-%D7%9C%D7%A7%D7%99%D7%99%D7%9D-%D7%91%D7%90%D7%AA%D7%A8-%D7%94%D7%98%D7%91%D7%99%D7%9C%D7%94-%D7%A7%D7%90%D7%A1%D7%A8/"},
  {label:"UNESCO — Bethany Beyond the Jordan / Al-Maghtas",url:"https://whc.unesco.org/en/list/1446/"},
] as const;

/** Products and exact booking destinations are sourced from the existing tour catalog.
 * Affiliate links live exclusively in affiliateConfig, keyed to this page.
 */
export const baptismTourGroups=[
  {id:"galilee-tours",title:"Nazareth, Galilee & Yardenit tours",description:"These tours advertise Yardenit as a stop. An organised sightseeing visit does not automatically include a baptism ceremony.",products:[
    {id:"nazareth-galilee-tel-aviv",provider:"getyourguide",departure:"From Tel Aviv"},
    {id:"nazareth-galilee-jerusalem",provider:"viator",departure:"From Jerusalem"},
    {id:"nazareth-tiberias-tel-aviv",provider:"viator",departure:"From Tel Aviv"},
  ]},
  {id:"jordan-valley-tours",title:"Jericho, Qasr el-Yahud & Dead Sea tours",description:"These routes identify the lower-Jordan baptism site. Confirm the listed river stop, site access and any ceremony arrangements.",products:[
    {id:"bethlehem-jericho-qasr-small-group",provider:"viator",departure:"From Jerusalem"},
    {id:"bethlehem-jericho-qasr-tel-aviv",provider:"viator",departure:"From Tel Aviv"},
    {id:"bethlehem-qasr-dead-sea",provider:"viator",departure:"Check departure point"},
  ]},
] as const;
export const baptismFaqs=[
 {q:"Which Jordan River baptism site should I choose?",a:"Yardenit is often best for a Galilee-based baptism using modern facilities; Qasr el-Yahud suits a journey to the traditional lower-Jordan landscape near Jericho. Choose with your church leader before arranging transport."},
 {q:"Are Yardenit and Qasr el-Yahud the same place?",a:"No. Yardenit is beside the southern Sea of Galilee, while Qasr el-Yahud is far to the south near Jericho. Always name the exact site when booking a tour or driver."},
 {q:"Where was Jesus baptized?",a:"Christian tradition connects Jesus' baptism with the lower Jordan near Qasr el-Yahud and Jordan's Bethany Beyond the Jordan. The exact historical spot should not be asserted as certain. Yardenit is a modern commemorative baptism site."},
 {q:"Is admission free at the baptism sites?",a:"The operators describe general entry as free at both sites. At Yardenit a white robe and some facilities cost extra; Qasr el-Yahud requires an advance free visitor reservation. Services and special arrangements may have separate charges."},
 {q:"Can I arrange a baptism without bringing clergy?",a:"Yardenit has no resident priest but can share contacts for local clergy. Qasr el-Yahud does not automatically provide an officiant either. Confirm the person leading the service with your church, the site or your organiser."},
 {q:"Do I need to reserve in advance?",a:"Qasr el-Yahud requires advance registration even for an ordinary visit. At either site, coordinate a religious ceremony, group size and time separately; a sightseeing tour booking does not substitute for this."},
 {q:"What clothing should I bring?",a:"Yardenit requires a white baptism robe for entering the river, available to rent or buy. At Qasr el-Yahud follow the site's modest-clothing and river-access instructions. Bring a towel, a change of clothes and suitable shoes."},
 {q:"Can I visit without being baptized?",a:"Yes. Visitors may observe the designated riverside, pray and reflect when the sites are open. Give worshippers space and ask before photographing ceremonies."},
 {q:"Are the baptismal waters wheelchair-accessible?",a:"Facilities and viewpoints may be accessible, but actual entry into the river may involve steps, uneven ground and changing water conditions. Contact the chosen operator about specific mobility needs."},
 {q:"Does a tour or private transfer include a baptism ceremony?",a:"Not unless the provider explicitly confirms it. My private-driver service covers transport rather than clergy. Confirm the religious arrangements, visitor admission, guiding and transportation separately."},
] as const;
