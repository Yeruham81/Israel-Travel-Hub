/** Evergreen travel interpretation; exact dates and operating hours belong to official sites and the separate holiday date-checker. This content is not an event feed. */
export type HolidayVisitorImpact = "very-high" | "high" | "moderate" | "local";
export type HolidayGuideItem = {id:string;name:string;season:string;impact:HolidayVisitorImpact;why:string;transport:string;visitor:string;tip:string};
export type HolidayGuideGroup = {id:string;title:string;intro:string;items:HolidayGuideItem[]};
export const holidayImpactLevels:Record<HolidayVisitorImpact,{label:string;summary:string}> = {
  "very-high": {
    "label": "Plan around it",
    "summary": "Major interruption to ordinary travel and services"
  },
  "high": {
    "label": "Major travel effect",
    "summary": "Closure days or important transport changes"
  },
  "moderate": {
    "label": "Check local schedules",
    "summary": "Crowds or changed opening and service hours"
  },
  "local": {
    "label": "Local or site-specific",
    "summary": "Impact depends heavily on the city and community"
  }
};
export const schoolCalendarPlanning = {
  title: "School holidays and the September return to school",
  body: "July and August are usually Israel's main summer school-break months, so family attractions, beaches and popular hotels can be busy even while ordinary weekday public transport continues. Most state schools typically reopen around the beginning of September, which can ease some daytime family crowds, but calendars vary by community and school. Sukkot, Hanukkah and Passover school breaks can bring domestic visitors back to popular sites. School vacations follow the Ministry of Education calendar. Check individual opening times and transport schedules."
} as const;

export const holidayGuideGroups:HolidayGuideGroup[] = [
  {
    "id": "weekly",
    "title": "Shabbat & the holiday-eve rule",
    "intro": "The most useful part of Israel's calendar to understand is the weekly rhythm. It matters even when you are not visiting during a major holiday.",
    "items": [
      {
        "id": "shabbat",
        "name": "Shabbat (the Jewish weekly day of rest)",
        "season": "Every week · Friday afternoon to Saturday night",
        "impact": "high",
        "why": "Shabbat is observed from Friday sunset to Saturday night. Work and travel patterns begin to change earlier on Friday, before the religious start time.",
        "transport": "Regular Israel Railways services and most scheduled bus routes pause; the exact last and first departures vary. Limited city weekend networks, taxis and some local services may operate, depending on place and operator.",
        "visitor": "In Jerusalem and other Jewish-majority areas many shops and attractions close or shorten hours. Tel Aviv's leisure areas, mixed cities and non-Jewish neighbourhoods can be quite different.",
        "tip": "Never assume you can take a Friday-evening train from Ben Gurion Airport. Check the actual timetable and arrange a confirmed alternative when necessary."
      }
    ]
  },
  {
    "id": "jewish-major",
    "title": "Major Jewish holidays that can change your itinerary",
    "intro": "The main religious festival days can affect transport and business hours much like Shabbat. The days between festival days can feel completely different.",
    "items": [
      {
        "id": "rosh-hashanah",
        "name": "Rosh Hashanah — Jewish New Year",
        "season": "Usually September or October · two days",
        "impact": "high",
        "why": "A two-day holiday marked by family meals, prayer and the sounding of the shofar. It begins at sunset on the eve of the first day.",
        "transport": "Regular national train services and most buses generally do not run during the holiday; services may finish early beforehand and restart later after it ends.",
        "visitor": "Many businesses close; family-oriented trips and hotels may be busy. Sites, dining and tourist services vary by locality.",
        "tip": "Allow time for shopping and travel before the eve. Do not plan an important rail connection on either holiday day."
      },
      {
        "id": "yom-kippur",
        "name": "Yom Kippur — Day of Atonement",
        "season": "Usually September or October · about 25 hours",
        "impact": "very-high",
        "why": "A solemn fast and day of prayer. In much of Israel, streets become unusually quiet and commercial activity stops.",
        "transport": "Regular public transport ceases and Ben Gurion Airport suspends normal flight operations for the observance; normal intercity taxi arrangements should not be assumed. Check airline and airport notices for the exact closure period.",
        "visitor": "Almost all shops and restaurants close, even many businesses that operate on Shabbat. Roads may appear open but pedestrian and bicycle activity can be intense.",
        "tip": "Treat Yom Kippur as a stay-put day: confirm your hotel meal arrangements and avoid planning flights or long-distance transfers across the observance."
      },
      {
        "id": "sukkot",
        "name": "Sukkot, Shemini Atzeret & Simchat Torah",
        "season": "Usually September or October · holiday days plus intermediate days",
        "impact": "high",
        "why": "Sukkot is the Festival of Booths, followed in Israel by the combined observance of Shemini Atzeret and Simchat Torah. Temporary sukkah structures are common.",
        "transport": "The first and final festival days resemble Shabbat in their transport restrictions. During Chol HaMoed (intermediate days), much regular service operates, but schedules and demand can differ.",
        "visitor": "School holidays and pilgrimage visits bring crowds to Jerusalem, parks, the Galilee and family attractions. Accommodation prices may rise during peak demand.",
        "tip": "Distinguish the first and last holy days from Chol HaMoed before making transport and hotel plans."
      },
      {
        "id": "passover",
        "name": "Passover (Pesach)",
        "season": "Usually March or April · seven days in Israel",
        "impact": "high",
        "why": "Passover commemorates the Exodus and is marked by the Seder meal. In Israel it lasts seven days, with a festival day at each end.",
        "transport": "The first and seventh days generally follow holiday restrictions; the intermediate Chol HaMoed days are not blanket transport shutdowns, though special timetables may apply.",
        "visitor": "Family travel, parks and hotels can be heavily booked. Some restaurants and food outlets change menus or close for Passover. Holy Week and Easter can also coincide.",
        "tip": "Reserve hotels and popular attractions early. If you are planning a Friday or holiday-eve train, check the exact last departure."
      },
      {
        "id": "shavuot",
        "name": "Shavuot — Feast of Weeks",
        "season": "Usually May or June · one festival day in Israel",
        "impact": "high",
        "why": "Shavuot commemorates the giving of the Torah and is traditionally associated with harvest and dairy foods.",
        "transport": "Regular intercity trains and many buses do not operate during the festival, with earlier finishes on the eve.",
        "visitor": "Many shops close on the holiday. Religious learning gatherings and family visits may affect particular areas.",
        "tip": "In Israel Shavuot is a one-day holiday; do not automatically apply two-day calendars intended for communities abroad."
      }
    ]
  },
  {
    "id": "other-jewish",
    "title": "Jewish celebrations and fast days with a different impact",
    "intro": "These dates can be culturally memorable without creating the nationwide shutdown associated with the main Jewish festival days.",
    "items": [
      {
        "id": "hanukkah",
        "name": "Hanukkah — Festival of Lights",
        "season": "Usually November or December · eight nights",
        "impact": "moderate",
        "why": "Families light hanukkiot, eat traditional fried foods and attend celebrations during eight evenings.",
        "transport": "Most ordinary weekday public transport continues; Shabbat restrictions still apply on the weekend.",
        "visitor": "Schools may be on holiday, making museums, hotels and family attractions busier. Evening candle-lighting events take place in public spaces.",
        "tip": "Do not confuse Hanukkah with a nationwide eight-day public holiday; most workplaces remain open."
      },
      {
        "id": "purim",
        "name": "Purim & Shushan Purim",
        "season": "Usually February or March · one main day; Jerusalem follows on the next day",
        "impact": "local",
        "why": "A lively holiday of costumes, charity, festive meals and the reading of the Book of Esther. Jerusalem observes Shushan Purim later than most Israeli cities.",
        "transport": "Ordinary weekday service often continues, but parades, parties and security arrangements can close streets or redirect buses locally.",
        "visitor": "Popular nightlife districts and city-centre parades may be crowded; some schools and businesses adjust schedules.",
        "tip": "Check whether your location follows Purim or Shushan Purim before scheduling a Jerusalem visit."
      },
      {
        "id": "lag-baomer",
        "name": "Lag BaOmer — bonfires and the Mount Meron pilgrimage",
        "season": "Usually April or May · begins the previous evening",
        "impact": "local",
        "why": "Lag BaOmer is marked in many communities by bonfires and gatherings. A traditional pilgrimage to the tomb of Rabbi Shimon bar Yochai on Mount Meron in the Upper Galilee may attract large numbers of people when permitted.",
        "transport": "Regular weekday trains and buses generally operate elsewhere, but events and special access controls can divert traffic. Mount Meron roads and pilgrimage transport can be heavily restricted or unavailable, depending on current safety decisions.",
        "visitor": "Bonfire smoke, gatherings and local closures may affect neighbourhoods. Access to Meron, Safed and nearby roads depends on the specific year's police and safety arrangements, not on a fixed annual schedule.",
        "tip": "If you plan to visit the Upper Galilee around Lag BaOmer, check official access and transport notices close to your trip; never assume the Meron pilgrimage is taking place."
      },
      {
        "id": "tisha-bav",
        "name": "Tisha B'Av and other fasting days",
        "season": "Usually July or August · date moves yearly",
        "impact": "local",
        "why": "Tisha B'Av is a day of mourning and fasting in the Jewish calendar. Other fast days have more limited effects on tourism.",
        "transport": "Usually no blanket national transport shutdown on a weekday, but local operating patterns can change.",
        "visitor": "Some entertainment venues or restaurants may close early or stay closed around the fast, especially in Jewish neighbourhoods.",
        "tip": "Check dining and cultural opening hours if your visit coincides with the fast; closures differ across cities."
      }
    ]
  },
  {
    "id": "national",
    "title": "National remembrance and civic dates",
    "intro": "Israel's memorial days and Independence Day are particularly important for visitors because street life and public ceremonies can change rapidly.",
    "items": [
      {
        "id": "holocaust-day",
        "name": "Yom HaShoah — Holocaust Remembrance Day",
        "season": "Spring · Hebrew date changes each year",
        "impact": "moderate",
        "why": "A national day of remembrance. A two-minute siren is sounded in the morning and memorial services are held across the country.",
        "transport": "Normal weekday travel may continue, but road closures and local ceremony arrangements are possible.",
        "visitor": "People stand still respectfully during the siren. Some entertainment venues and institutions adjust their hours.",
        "tip": "If you hear the siren, pause respectfully with the people around you."
      },
      {
        "id": "memorial-day",
        "name": "Yom HaZikaron — Memorial Day",
        "season": "Spring · immediately before Independence Day",
        "impact": "moderate",
        "why": "Israel remembers fallen soldiers and victims of hostilities. Sirens sound during the observance, including one on the eve and one during the day.",
        "transport": "Cemetery and memorial-site traffic, ceremonies and road closures can affect routes. Do not infer that ordinary public transport stops everywhere.",
        "visitor": "Many shops and entertainment venues change hours. The atmosphere is solemn until the transition to Independence Day celebrations.",
        "tip": "Allow extra travel time near military cemeteries and central ceremonies, and be aware of the sirens."
      },
      {
        "id": "independence",
        "name": "Yom HaAtzmaut — Independence Day",
        "season": "Spring · follows Memorial Day",
        "impact": "high",
        "why": "A public holiday marked by gatherings, ceremonies, picnics and celebrations, with events often starting on the eve.",
        "transport": "Public transport runs on altered holiday schedules that differ by route and year; evening festivities and road closures also affect access.",
        "visitor": "Parks and beaches can be busy. Some museums and stores close; other leisure venues open with special hours.",
        "tip": "Check traffic restrictions on the holiday eve and the transport schedule for the holiday itself."
      },
      {
        "id": "jerusalem-day",
        "name": "Jerusalem Day and local commemorations",
        "season": "Usually May or June · date moves yearly",
        "impact": "local",
        "why": "Jerusalem Day includes ceremonies, celebrations and marches, while municipalities also hold local commemorations throughout the year.",
        "transport": "Crowds, marches, police barriers and temporary street closures can strongly affect particular Jerusalem routes.",
        "visitor": "Old City access and meeting points can change for several hours. Other Israeli cities may continue normally.",
        "tip": "If visiting Jerusalem, check the city's published route changes and avoid tight schedules around major processions."
      }
    ]
  },
  {
    "id": "other-traditions",
    "title": "Muslim, Christian & Druze holidays",
    "intro": "Israel is home to different religious communities. Their observances may strongly affect a neighbourhood, pilgrimage site or town without shutting down the whole country.",
    "items": [
      {
        "id": "ramadan",
        "name": "Ramadan",
        "season": "Lunar month · moves earlier through the Gregorian calendar",
        "impact": "local",
        "why": "The Muslim fasting month is observed from dawn to sunset. Ramadan evenings can be lively, with families gathering for iftar.",
        "transport": "National rail services generally follow normal weekday and Shabbat patterns, but local services and road access may change near mosques and busy areas.",
        "visitor": "Restaurants and businesses in some Muslim communities change daytime or evening hours. Jerusalem's Old City may experience large prayer crowds, especially on Fridays.",
        "tip": "Respect fasting people and ask permission before photographing religious gatherings. Muslim dates are subject to local religious confirmation."
      },
      {
        "id": "eid",
        "name": "Eid al-Fitr & Eid al-Adha",
        "season": "Islamic lunar calendar · dates vary and may be confirmed near the holiday",
        "impact": "local",
        "why": "Eid al-Fitr marks the end of Ramadan; Eid al-Adha is a major festival associated with the Hajj period.",
        "transport": "Expect possible altered business hours and heavier local traffic in Muslim communities. Eid-related changes are primarily local; check the train timetable for your travel date.",
        "visitor": "Shops may close while leisure and family attractions become very busy, especially in mixed cities and Arab towns.",
        "tip": "Check restaurant, guided-visit and transport arrangements for the specific city or neighbourhood."
      },
      {
        "id": "christmas",
        "name": "Christmas in Israel",
        "season": "December or January · according to Christian tradition",
        "impact": "local",
        "why": "Different churches celebrate Christmas on different calendar dates. Nazareth, Jerusalem and nearby Bethlehem draw pilgrims, worshippers and visitors.",
        "transport": "Most Israeli weekday national services operate, but road access, parking and specific pilgrim-bus arrangements may change near churches.",
        "visitor": "Religious sites may restrict sightseeing during services. Accommodation and tours can fill around major pilgrimage dates.",
        "tip": "Check the relevant church's calendar: 25 December is not the only Christmas date observed in the region."
      },
      {
        "id": "easter",
        "name": "Easter & Holy Week",
        "season": "Spring · western and eastern Christian dates can differ",
        "impact": "local",
        "why": "Holy Week, Good Friday and Easter bring important services and processions to churches, especially in Jerusalem's Old City.",
        "transport": "Local road controls, crowd management and changes to pickup points are possible; there is no automatic nationwide rail closure.",
        "visitor": "Church of the Holy Sepulchre access can be tightly managed during major services. Pilgrim demand may increase hotel and tour prices.",
        "tip": "Plan church visits around religious schedules and check each site's security, ticketing and entry requirements."
      },
      {
        "id": "druze",
        "name": "Druze religious festivals",
        "season": "Spring and other dates · community calendar",
        "impact": "local",
        "why": "The Nabi Shu'ayb pilgrimage near Tiberias is one of the principal Druze religious observances.",
        "transport": "Traffic and access near the shrine and Druze communities may change locally; unrelated parts of Israel generally continue normally.",
        "visitor": "Specific sites may host religious gatherings; respectful conduct and locally published visiting arrangements matter.",
        "tip": "Religious holidays can affect opening hours differently across cities, neighbourhoods and businesses."
      }
    ]
  }
];
export const holidayGuideSources = [
{label:"Ministry of Tourism - holidays in Israel",url:"https://data.gov.il/he/datasets/ministry_of_tourism/holidaysinisrael/38a82e1f-2800-452f-bf70-20c1f4439924"},
{label:"Israel Railways - trains on holidays",url:"https://rail.co.il/?lan=en&page=holidays-information"},
{label:"Israeli government - weekly rest and statutory holiday guidance",url:"https://www.gov.il/BlobFolder/generalpage/employment_guides/en/employment_en.pdf"},
{label:"Israel Airports Authority - Ben Gurion Airport",url:"https://www.iaa.gov.il/en/airports/ben-gurion/"},
{label:"Hebcal - Israel Jewish holiday dates",url:"https://www.hebcal.com/holidays/?i=on"},
{label:"Time and Date - holidays and observances",url:"https://www.timeanddate.com/holidays/israel/"},
{label:"Israel Nature and Parks Authority",url:"https://www.parks.org.il/en/"},
] as const;
