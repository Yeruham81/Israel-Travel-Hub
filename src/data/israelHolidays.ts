/**
 * Editorial travel-calendar dataset for Israel, reviewed 2026-10-23.
 * Gregorian date-only ranges are inclusive. For startsAt="sunset", the first
 * date is the EVENING before the principal observance; the checker deliberately
 * errs on the side of including a relevant travel date.
 * Do not infer live schedules, tariffs or venue availability from these records.
 * 2027 Jewish dates use the ISRAEL calendar, not Diaspora dates.
 */
export type Community = "Jewish" | "Christian" | "Muslim" | "Druze" | "National";
export type Impact = "major" | "mixed" | "local" | "awareness";
export type Certainty = "confirmed" | "tentative";
export type Holiday = {
  id: string;
  name: string;
  from: string;
  to: string;
  startsAt: "sunset" | "day";
  community: Community;
  otherCommunities?: Community[];
  impact: Impact;
  certainty: Certainty;
  summary: string;
  travel: string;
  location?: string;
  source: string;
};

export const HOLIDAY_COVERAGE = { from: "2026-10-23", to: "2028-01-01", checkedAt: "2026-10-23" } as const;
const HEB = "https://www.hebcal.com/holidays/2027?i=on";
const HEB26 = "https://www.hebcal.com/holidays/2026?i=on";
const CHRISTIAN = "https://www.timeanddate.com/holidays/israel/2027";
const ISRAEL2027 = "https://www.timeanddate.com/holidays/israel/2027";

export const holidays: Holiday[] = [
  {id:"sigd26",name:"Sigd (Ethiopian Jewish holiday)",from:"2026-11-08",to:"2026-11-09",startsAt:"sunset",community:"Jewish",impact:"local",location:"Jerusalem and Ethiopian Jewish communities",certainty:"confirmed",summary:"A day of prayer, gathering and Ethiopian Jewish heritage.",travel:"Ceremonies can draw crowds around Jerusalem venues. This is not a nationwide transport shutdown.",source:HEB26},
  {id:"hanukkah26",name:"Hanukkah",from:"2026-12-04",to:"2026-12-12",startsAt:"sunset",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"Eight nights of candle-lighting and public celebrations.",travel:"Weekday transport and businesses generally continue. School breaks and family events can make popular attractions and hotels busier; Shabbat hours still apply.",source:HEB26},
  {id:"christmas26",name:"Western Christmas",from:"2026-12-24",to:"2026-12-25",startsAt:"day",community:"Christian",impact:"local",location:"Bethlehem, Nazareth, Jerusalem and Christian communities",certainty:"confirmed",summary:"Christmas Eve and Christmas Day in churches following the Western calendar.",travel:"Church services and local festivities may change access and bring crowds. It is not a nationwide Israeli closure.",source:"https://www.timeanddate.com/holidays/israel/2026"},
  {id:"orthodox-christmas",name:"Orthodox Christmas",from:"2027-01-06",to:"2027-01-07",startsAt:"day",community:"Christian",impact:"local",location:"Jerusalem, Bethlehem and Orthodox communities",certainty:"confirmed",summary:"Christmas services held by Eastern churches following the Julian calendar.",travel:"Some church services restrict sightseeing access; confirm the specific denomination and sanctuary.",source:CHRISTIAN},
  {id:"armenian-christmas",name:"Armenian Christmas in Jerusalem",from:"2027-01-18",to:"2027-01-19",startsAt:"day",community:"Christian",impact:"local",location:"Armenian Quarter, Jerusalem and Bethlehem",certainty:"confirmed",summary:"Christmas and Epiphany celebrated according to the Armenian Church calendar in Jerusalem.",travel:"Local religious services may change access and attract worshippers; do not expect national business closures.",source:CHRISTIAN},
  {id:"tubishvat",name:"Tu BiShvat",from:"2027-01-22",to:"2027-01-23",startsAt:"sunset",community:"Jewish",impact:"awareness",certainty:"confirmed",summary:"A Jewish celebration of trees and renewal, often marked by planting and fruit.",travel:"Usually no special weekday transport shutdown. Planting events may attract families; Shabbat still applies.",source:HEB},
  {id:"ramadan",name:"Ramadan (estimated start)",from:"2027-02-07",to:"2027-03-09",startsAt:"sunset",community:"Muslim",impact:"local",location:"Muslim communities nationwide; Jerusalem, Nazareth and mixed cities",certainty:"tentative",summary:"The Muslim month of daytime fasting, evening meals and prayer; dates depend on local moon-sighting.",travel:"Some Muslim-run businesses adjust daytime hours, while markets and restaurants may be livelier after sunset. Prayer gatherings affect local streets, not nationwide transport.",source:ISRAEL2027},
  {id:"eid-fitr",name:"Eid al-Fitr (tentative)",from:"2027-03-09",to:"2027-03-12",startsAt:"sunset",community:"Muslim",impact:"local",location:"Muslim communities nationwide",certainty:"tentative",summary:"The festival marking the end of Ramadan; its exact dates depend on local confirmation.",travel:"Some Muslim-run services may close or shorten hours and family travel can be busy in affected communities; public transport does not shut nationally.",source:ISRAEL2027},
  {id:"purim",name:"Purim",from:"2027-03-22",to:"2027-03-23",startsAt:"sunset",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"A joyful Jewish holiday with costumes, parties and the reading of Esther.",travel:"Parties and processions can close streets; many ordinary businesses operate. Confirm city events separately.",source:HEB},
  {id:"shushan-purim",name:"Shushan Purim (Jerusalem)",from:"2027-03-23",to:"2027-03-24",startsAt:"sunset",community:"Jewish",impact:"local",location:"Jerusalem",certainty:"confirmed",summary:"Jerusalem marks Purim one day later than most Israeli cities.",travel:"Watch for city-centre festivities, road restrictions and crowded attractions; this is not a national shutdown.",source:HEB},
  {id:"western-holy-week",name:"Western Holy Week and Easter",from:"2027-03-21",to:"2027-03-28",startsAt:"day",community:"Christian",impact:"local",location:"Jerusalem, Nazareth and Bethlehem",certainty:"confirmed",summary:"Western Christian Holy Week: Palm Sunday 21 March, Good Friday 26 March and Easter 28 March.",travel:"Palm Sunday processions, Good Friday services and Easter worship can restrict access around Jerusalem's Old City and key churches. The Western and Orthodox calendars differ in 2027.",source:CHRISTIAN},
  {id:"passover-first",name:"Passover — first festival day",from:"2027-04-21",to:"2027-04-22",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"Passover recalls the Exodus from Egypt. The Seder is on 21 April evening; 22 April is a major festival day.",travel:"Regular public transport generally stops on the festival day and many Jewish-run businesses close. Some kosher restaurants and hotel dining change to Passover menus. The wider school break can increase hotel demand.",source:HEB},
  {id:"passover-intermediate",name:"Passover — intermediate days (Chol HaMoed)",from:"2027-04-23",to:"2027-04-27",startsAt:"day",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"Chol HaMoed is the intermediate part of Passover, not a continuous public-service shutdown. Shabbat falls on 24 April.",travel:"Many attractions and services operate during Chol HaMoed, but the school-break period often brings heavy domestic crowds and hotel demand. Shabbat on 24 April remains more restricted.",source:HEB},
  {id:"druze-nabi-shuayb",name:"Nabi Shu'ayb pilgrimage (Druze)",from:"2027-04-24",to:"2027-04-28",startsAt:"day",community:"Druze",impact:"local",location:"Hittin / Mount Arbel area and Druze communities",certainty:"confirmed",summary:"The annual Druze pilgrimage to the shrine of Prophet Jethro (Nabi Shu’ayb) near Tiberias.",travel:"Some Druze-owned businesses may adjust hours; local pilgrim traffic can be busy. Check venue-specific arrangements.",source:ISRAEL2027},
  {id:"passover-last",name:"Passover — final festival day",from:"2027-04-27",to:"2027-04-28",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"The final sacred day of the seven-day Passover festival in Israel falls on 28 April.",travel:"Regular public transport generally stops and many Jewish-run businesses close. Do not confuse Israeli 7-day Passover with the 8-day Diaspora calendar.",source:HEB},
  {id:"orthodox-holy-week",name:"Orthodox / Armenian Holy Week and Easter",from:"2027-04-25",to:"2027-05-02",startsAt:"day",community:"Christian",impact:"local",location:"Jerusalem, Bethlehem and Orthodox / Armenian churches",certainty:"confirmed",summary:"Eastern Christian Holy Week: Palm Sunday 25 April, Good Friday 30 April, Holy Fire 1 May, and Easter 2 May.",travel:"The Holy Fire ceremony on 1 May can bring major crowd controls around the Church of the Holy Sepulchre; access and processions may also affect Old City streets during Holy Week.",source:CHRISTIAN},
  {id:"holocaust-memorial",name:"Yom HaShoah — Holocaust Remembrance Day",from:"2027-05-03",to:"2027-05-04",startsAt:"sunset",community:"National",impact:"mixed",certainty:"confirmed",summary:"Israel's day of remembrance for Holocaust victims, including a nationwide morning siren.",travel:"Entertainment venues may close or change hours and ceremonies affect access. It is not the same full transport stoppage as Yom Kippur.",source:HEB},
  {id:"memorial",name:"Yom HaZikaron — Memorial Day",from:"2027-05-10",to:"2027-05-11",startsAt:"sunset",community:"National",impact:"mixed",certainty:"confirmed",summary:"A national day of mourning for fallen soldiers and victims of terrorism.",travel:"Sirens and ceremonies are held; many entertainment venues close and some streets are controlled. Respect local commemorations.",source:HEB},
  {id:"independence",name:"Yom HaAtzmaut — Independence Day",from:"2027-05-11",to:"2027-05-12",startsAt:"sunset",community:"National",impact:"mixed",certainty:"confirmed",summary:"Israel's Independence Day, with public celebrations following Memorial Day.",travel:"Municipal events can alter road access and bus routes; some businesses close, while leisure venues may be busy. Do not assume any specific show will run.",source:HEB},
  {id:"eid-adha",name:"Eid al-Adha (tentative)",from:"2027-05-16",to:"2027-05-20",startsAt:"sunset",community:"Muslim",otherCommunities:["Druze"],impact:"local",location:"Muslim and Druze communities nationwide",certainty:"tentative",summary:"The Festival of Sacrifice is observed by Muslim and Druze communities, with distinct religious traditions.",travel:"Some Muslim- and Druze-run businesses may close or adjust hours, and family visits can increase local travel demand.",source:ISRAEL2027},
  {id:"lagbaomer",name:"Lag BaOmer",from:"2027-05-24",to:"2027-05-25",startsAt:"sunset",community:"Jewish",impact:"local",location:"Meron / Galilee and other bonfire locations",certainty:"confirmed",summary:"A Jewish festival associated with bonfires and the annual pilgrimage to Meron.",travel:"Large gatherings near Meron can involve security and road restrictions; local celebrations do not stop national transport.",source:HEB},
  {id:"jerusalemday",name:"Jerusalem Day",from:"2027-06-03",to:"2027-06-04",startsAt:"sunset",community:"National",impact:"local",location:"Jerusalem",certainty:"confirmed",summary:"An Israeli observance marking the city's reunification in 1967, with Jerusalem ceremonies and gatherings.",travel:"Expect possible city-centre road closures, crowds and restricted routes; check municipal guidance.",source:HEB},
  {id:"shavuot",name:"Shavuot",from:"2027-06-10",to:"2027-06-11",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"Shavuot commemorates the giving of the Torah. In Israel it falls on Friday 11 June, followed by Shabbat.",travel:"Regular public transport is generally unavailable from Thursday evening through Saturday night because Shavuot falls on Friday and leads straight into Shabbat.",source:HEB},
  {id:"tishabav",name:"Tisha B'Av",from:"2027-08-11",to:"2027-08-12",startsAt:"sunset",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"A Jewish day of fasting and mourning for the destruction of the ancient Temples in Jerusalem.",travel:"Entertainment and some food venues may close, notably the previous evening. Transport generally runs on an ordinary weekday.",source:HEB},
  {id:"roshhashanah",name:"Rosh Hashanah",from:"2027-10-01",to:"2027-10-03",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"The Jewish New Year, observed over two days: Saturday and Sunday in 2027.",travel:"Regular public transport and many Jewish-run businesses are generally unavailable. Hotel demand may change; check actual prices rather than assuming a surcharge.",source:HEB},
  {id:"yomkippur",name:"Yom Kippur",from:"2027-10-10",to:"2027-10-11",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"Judaism's Day of Atonement, observed with fasting and prayer for about 25 hours.",travel:"Scheduled flights at Ben Gurion Airport and most regular public transport generally stop during Yom Kippur. Arrange airport travel outside the observance; most businesses close.",source:HEB},
  {id:"sukkot-first",name:"Sukkot — first festival day",from:"2027-10-15",to:"2027-10-16",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"Sukkot (Feast of Tabernacles) recalls the Israelites' desert journey; the first festival day is Shabbat in 2027.",travel:"Regular public transport generally stops. Many shops and sites close for the festival day; plan Friday afternoon travel.",source:HEB},
  {id:"sukkot-intermediate",name:"Sukkot — intermediate days (Chol HaMoed)",from:"2027-10-17",to:"2027-10-22",startsAt:"day",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"Chol HaMoed is the intermediate part of Sukkot, when many places operate; the final festival begins Friday 22 October evening.",travel:"Attractions often run with holiday hours during Chol HaMoed, while school breaks may bring busy family sites and higher demand for rooms. Transport winds down before the Friday evening festival and Shabbat.",source:HEB},
  {id:"simchattorah",name:"Shemini Atzeret / Simchat Torah (Israel)",from:"2027-10-22",to:"2027-10-23",startsAt:"sunset",community:"Jewish",impact:"major",certainty:"confirmed",summary:"Shemini Atzeret and Simchat Torah celebrate the close of the festival season and the annual Torah-reading cycle; one day in Israel.",travel:"Regular transport generally stops; many Jewish-run businesses close. Overseas calendars may list these as two days.",source:HEB},
  {id:"sigd27",name:"Sigd (Ethiopian Jewish holiday)",from:"2027-11-28",to:"2027-11-29",startsAt:"sunset",community:"Jewish",impact:"local",location:"Jerusalem and Ethiopian Jewish communities",certainty:"confirmed",summary:"An Ethiopian Jewish holiday of prayer and pilgrimage, with major gatherings in Jerusalem.",travel:"Jerusalem ceremony areas may be busy; ordinary nationwide transport is not suspended.",source:HEB},
  {id:"hanukkah27",name:"Hanukkah",from:"2027-12-24",to:"2028-01-01",startsAt:"sunset",community:"Jewish",impact:"mixed",certainty:"confirmed",summary:"The Jewish Festival of Lights, marked by candle-lighting across eight nights from 24 December 2027.",travel:"Weekday transport and most businesses continue, but holiday activities and school breaks can make family attractions and some hotels busier. Shabbat restrictions remain separate.",source:HEB},
  {id:"western-christmas27",name:"Western Christmas",from:"2027-12-24",to:"2027-12-25",startsAt:"day",community:"Christian",impact:"local",location:"Bethlehem, Nazareth, Jerusalem and Christian communities",certainty:"confirmed",summary:"Christmas Eve and Christmas Day in Catholic, Protestant and other Western Christian traditions.",travel:"Check Bethlehem border/entry arrangements and church service admission. It is not a national shutdown in Israel.",source:CHRISTIAN},
];

export const DAY_MS = 86_400_000;
export function isValidIsoDay(input: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return false;
  const d = new Date(input + "T12:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === input;
}
export function dayIndex(input: string): number {
  return Date.parse(input + "T12:00:00Z") / DAY_MS;
}
export function intersects(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}
export function checkRange(arrival: string, departure: string): string | null {
  if (!isValidIsoDay(arrival) || !isValidIsoDay(departure)) return "Enter both arrival and departure dates.";
  if (arrival > departure) return "Departure cannot be before arrival.";
  if (arrival < HOLIDAY_COVERAGE.from || departure > HOLIDAY_COVERAGE.to) return "This calendar has checked coverage only from 23 October 2026 through 1 January 2028. Choose dates within that range; dates outside it must not be treated as free of holidays.";
  if (dayIndex(departure) - dayIndex(arrival) > 90) return "Choose a visit of up to 90 days for a focused trip check. The full annual calendar is below.";
  return null;
}
export function findHolidayMatches(arrival: string, departure: string): Holiday[] {
  if (checkRange(arrival,departure)) return [];
  return holidays.filter(h => intersects(arrival,departure,h.from,h.to)).sort((a,b)=>a.from.localeCompare(b.from));
}
export function shabbatDates(arrival: string, departure: string): string[] {
  if (checkRange(arrival,departure)) return [];
  const results: string[] = [];
  for(let i=dayIndex(arrival);i<=dayIndex(departure);i++){
    const d=new Date(i*DAY_MS).getUTCDay();
    if(d===5 || d===6) results.push(new Date(i*DAY_MS).toISOString().slice(0,10));
  }
  return results;
}
export function isDestinationRelevant(holiday: Holiday, destination: string): boolean {
  if (!holiday.location || destination === "all") return true;
  const text=holiday.location.toLowerCase();
  if(destination==="jerusalem") return /jerusalem|nationwide/.test(text);
  if(destination==="nazareth") return /nazareth|christian|muslim|nationwide/.test(text);
  if(destination==="bethlehem") return /bethlehem|christian/.test(text);
  if(destination==="north") return /galilee|meron|nazareth|hittin|druze|haifa|nationwide/.test(text);
  return /nationwide/.test(text);
}
