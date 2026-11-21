/** Jerusalem's editorial planning hub. Each topic card delegates to its own canonical guide. */
export const JERUSALEM_HUB_PATH = "/travel-blog/jerusalem-travel-guide/";
export const JERUSALEM_HUB_TITLE = "Jerusalem Travel Guide: What to See, Where to Stay & How to Plan";
export const JERUSALEM_HUB_DESCRIPTION = "Plan your Jerusalem visit with my guide to the Old City, Mount of Olives, museums, food markets, how many days to stay, best neighbourhoods, local transport and day trips.";
export const JERUSALEM_HUB_UPDATED = "2026-11-21";

export const jerusalemTopicCards = [
  {title:"Old City of Jerusalem",to:"/attractions/old-city-jerusalem/",description:"Find the four quarters, the right gates, historic landmarks and walking routes."},
  {title:"Mount of Olives",to:"/attractions/mount-of-olives/",description:"Plan panoramic viewpoints, hillside churches and a realistic downhill walk."},
  {title:"Mount Zion",to:"/attractions/mount-zion/",description:"Explore the Cenacle, Dormition Abbey and sacred places near Zion Gate."},
  {title:"Museums in Jerusalem",to:"/travel-blog/museums-in-jerusalem/",description:"Choose the Israel Museum, Yad Vashem, Tower of David and more."},
  {title:"Churches in Jerusalem",to:"/travel-blog/churches-in-jerusalem/",description:"Find meaningful pilgrimage visits by area, not just a long list."},
  {title:"Shopping & markets",to:"/travel-blog/shopping-in-jerusalem/",description:"Discover Mahane Yehuda, Old City markets, crafts and downtown streets."},
] as const;

export const jerusalemDayPlans = [
  {label:"One day",title:"Focus on the Old City",description:"Start at a suitable gate, choose the religious and historic sites that matter to you, and add just one nearby stop if time allows.",route:"Jaffa Gate · Old City · optional Mamilla or Mount Zion",links:[{title:"Old City walking guide",to:"/attractions/old-city-jerusalem/"},{title:"Jerusalem guided tours",to:"/tours/jerusalem/"}]},
  {label:"Two days",title:"Add one different side of Jerusalem",description:"Give the Old City its own day. On the second, choose Mount of Olives and its churches, or a museum followed by the market.",route:"Day 1: Old City · Day 2: viewpoints or museums + market",links:[{title:"Mount of Olives",to:"/attractions/mount-of-olives/"},{title:"Jerusalem museums",to:"/travel-blog/museums-in-jerusalem/"}]},
  {label:"Three or more days",title:"Build in the neighbourhoods and extra time",description:"Use the extra time for museums, Mahane Yehuda, Ein Karem or the German Colony. If you want a trip outside the city, give it a separate day.",route:"City highlights · museum & market · a chosen neighbourhood or day trip",links:[{title:"Where to stay",to:"/travel-blog/where-to-stay-in-jerusalem/"},{title:"Day trips from Jerusalem",to:"#day-trips"}]},
] as const;

export const jerusalemStayAreas = [
  {name:"Old City",character:"Immersive historic setting",best:"Walkable sacred-site stays",consider:"Cobblestones, steps, restricted vehicle access"},
  {name:"Mamilla / King David",character:"Central, near Jaffa Gate",best:"Old City visits with hotel convenience",consider:"Walking distance varies by address"},
  {name:"Downtown / Jaffa Road",character:"Restaurants and light rail",best:"Public transport and central sightseeing",consider:"Allow for the last walk to historic sites"},
  {name:"Mahane Yehuda / Nachlaot",character:"Markets and local neighbourhood life",best:"Food, markets and city-centre atmosphere",consider:"Stall hours and evening noise vary"},
  {name:"German Colony / Baka",character:"Residential cafés and quieter streets",best:"A relaxed base away from the Old City",consider:"Plan transport to the principal sights"},
] as const;

export const jerusalemDayTripCards = [
  {title:"Dead Sea from Jerusalem",to:"/travel-blog/jerusalem-to-the-dead-sea/",description:"Choose a beach, Masada or an overnight stay before arranging transport."},
  {title:"Bethlehem",to:"/travel-blog/jerusalem-to-bethlehem/",description:"Understand access, bus and tour options to the Church of the Nativity."},
  {title:"Masada",to:"/attractions/masada/",description:"Visit the fortress and plan the cable car, park entry and desert conditions."},
  {title:"Ein Gedi",to:"/attractions/ein-gedi/",description:"Check which desert-oasis trails and reserve areas are open."},
  {title:"Qasr el-Yahud",to:"/attractions/qasr-el-yahud/",description:"The lower-Jordan baptism site requires a separate visitor reservation."},
  {title:"Tel Aviv & Old Jaffa",to:"/attractions/jaffa/",description:"A longer city-to-coast outing, best planned around your travel time."},
] as const;

export const jerusalemMoreGuides = [
  {title:"Israel in 3 days",to:"/travel-blog/israel-itinerary-3-days/",description:"Use Jerusalem as part of a focused short visit to Israel."},
  {title:"Israel in 5 days",to:"/travel-blog/israel-itinerary-5-days/",description:"Fit Jerusalem, another city and a selected extra region together."},
  {title:"Israel in 7 days",to:"/travel-blog/israel-itinerary-7-days/",description:"See how Jerusalem fits into a more comfortable national itinerary."},
  {title:"Israel in 10 days",to:"/travel-blog/israel-itinerary-10-days/",description:"Allow extra time for the Galilee, Dead Sea and other destinations."},
  {title:"Israel's calendar of events",to:"/travel-blog/calendar-of-events/",description:"Check Jewish holidays, religious festivals and important dates."},
  {title:"Israel travel tips",to:"/travel-blog/israel-travel-tips/",description:"Entry preparation, payments, practical customs and trip planning."},
] as const;

export const jerusalemTourGroups = [
  {id:"city-tours",title:"Jerusalem tours & experiences",description:"If you would prefer a local guide, these are three distinct ways to explore the city. Confirm which areas and entrance fees are included.",products:[
    {id:"jerusalem-old-city-walk",partner:"viator",label:"Old City introduction"},
    {id:"jerusalem-beyond-walls",partner:"viator",label:"Neighbourhoods & tastings"},
    {id:"jerusalem-market-food-walk",partner:"viator",label:"Mahane Yehuda food walk"},
  ]},
  {id:"day-trip-tours",title:"Organised excursions from Jerusalem",description:"Choose between a shorter Bethlehem visit and full-day trips. Check starting point, border arrangements where applicable, and actual time at each stop.",products:[
    {id:"bethlehem-halfday-jerusalem",partner:"getyourguide",label:"Bethlehem half-day"},
    {id:"masada-dead-sea-jerusalem",partner:"viator",label:"Masada & Dead Sea"},
    {id:"bethlehem-jericho-jordan",partner:"viator",label:"Bethlehem, Jericho & Jordan"},
  ]},
] as const;

export const jerusalemHubFaqs = [
  {q:"Can I visit Jerusalem in just one day?",a:"Yes, if you choose a focused route. I suggest one Old City entrance and the sights most important to you, with perhaps one nearby area. A day trip is not the right moment to see every museum, church and quarter."},
  {q:"How many days should I stay in Jerusalem?",a:"I suggest two or three days as a useful starting point for a first visit, with more time if you enjoy museums, pilgrimage visits or unhurried neighbourhood walks. An excursion to the Dead Sea or Bethlehem deserves its own travel allowance."},
  {q:"What is the best area to stay for a first visit?",a:"If the Old City is your priority, compare Mamilla or the area around Jaffa Gate. Downtown suits light-rail access and dining, while Mahane Yehuda suits market life. Your final hotel's actual entrance and luggage access matter as much as its area name."},
  {q:"Can I drive inside Jerusalem's Old City?",a:"Not through most of its historic pedestrian lanes. Cars and private drivers can take you to an accessible nearby drop-off, but the last part is normally on foot. Check the correct gate and steps with your hotel or guide."},
  {q:"Do I need a rental car while sightseeing in Jerusalem?",a:"Not for most central sightseeing. Walking, city buses, light rail and taxis are often more practical; a private driver is useful for a tailored route or several widely separated stops. A rental may suit a wider road trip."},
  {q:"What should I know about Jerusalem on Shabbat or holidays?",a:"Many regular buses, trains and businesses operate differently or stop around Shabbat and Jewish holidays. Religious sites follow their own worship and visitor hours. Check your exact travel date, the event calendar and official transport schedules."},
  {q:"What should I wear to religious sites in Jerusalem?",a:"Carry clothing that covers shoulders and knees as a sensible starting point; individual synagogues, churches, mosques and holy compounds may have additional rules. Follow staff instructions and respect services and worshippers."},
  {q:"Can I visit Bethlehem or the Dead Sea on a day trip from Jerusalem?",a:"Both are possible depending on your date and travel arrangements, but they are distinct journeys. Bethlehem is in the West Bank and has particular access and operator rules; for the Dead Sea you must choose a specific beach, attraction or hotel and plan your return."},
] as const;

export const jerusalemHubSources=[
  {label:"Israel Ministry of Tourism — Jerusalem visitor information",url:"https://www.gov.il/en/government-service-branches/jerusalem-tourism-office"},
  {label:"Israel Railways — official planner and service notices",url:"https://rail.co.il/?lan=en&page=updates"},
  {label:"Israel Ministry of Tourism — entry and visitor information",url:"https://www.gov.il/en/departments/topics/tourist-and-travelers-info"},
  {label:"Jerusalem Convention & Visitors Bureau — sights and neighbourhoods",url:"https://www.jerusalemcvb.com/explore-the-city/see-and-do/"},
  {label:"Christian Information Center — holy sites and visitor instructions",url:"https://www.cicts.org/our-services/"},
] as const;
