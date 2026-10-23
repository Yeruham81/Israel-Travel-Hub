/**
 * Refresh the Israel travel holiday calendar. Run from repository root:
 *   node scripts/sync-israel-holidays.mjs
 *   node scripts/sync-israel-holidays.mjs --check
 *
 * Generated years start in 2028; the manually reviewed 2026/2027 records
 * remain authoritative. This script never labels predicted Islamic dates
 * confirmed, and fails without overwriting the last good snapshot.
 * External endpoints are called only by GitHub Actions, not site visitors.
 */
import { readFile, writeFile } from "node:fs/promises";

const OUTPUT = new URL("../src/data/israelHolidayFuture.generated.json", import.meta.url);
const HEB_API = "https://www.hebcal.com/hebcal";
const ISLAMIC_API = "https://api.aladhan.com/v1";
const ALADHAN_SOURCE = "https://aladhan.com/islamic-calendar-api";
const times = (iso) => Date.parse(iso + "T12:00:00Z");
const iso = (stamp) => new Date(stamp).toISOString().slice(0, 10);
const shift = (date, days) => iso(times(date) + days * 86400000);
const yearOf = (date) => Number(date.slice(0, 4));
const md = (year, month, day) => iso(Date.UTC(year, month - 1, day, 12));
const assertDay = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || iso(times(value)) !== value) throw new Error("Invalid date: " + value);
  return value;
};

async function requestJSON(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "Israel-Travel-Hub-calendar/1.0" }, signal: controller.signal });
    if (!res.ok) throw new Error(url + ": HTTP " + res.status);
    const raw = await res.text();
    if (raw.length > 800000) throw new Error("Oversized calendar response");
    return JSON.parse(raw);
  } finally { clearTimeout(timer); }
}
const mk = (year, key, name, from, to, community, impact, summary, travel, options = {}) => ({
  id: key + "-" + year, name, from: assertDay(from), to: assertDay(to),
  startsAt: options.sunset ? "sunset" : "day", community, impact,
  certainty: options.tentative ? "tentative" : "confirmed", summary, travel,
  ...(options.location ? { location: options.location } : {}),
  ...(options.otherCommunities ? { otherCommunities: options.otherCommunities } : {}),
  source: options.source,
});
const JEWISH_IMPACTS = {
  major: "Regular buses and trains generally stop during the festival. Many Jewish-run shops and services close; check times for your route.",
  intermediate: "Many attractions and services operate during Chol HaMoed, but school holidays can bring heavier domestic crowds and demand. Shabbat remains separate.",
  mixed: "Many services continue, though festivities or ceremonies can change local opening hours and access.",
  local: "Celebrations and gatherings may affect nearby streets and venues; regular transport usually operates elsewhere.",
};
async function hebcal(year) {
  const url = HEB_API + "?v=1&cfg=json&i=on&year=" + year + "&maj=on&min=on&mod=on&mf=on";
  const response = await requestJSON(url);
  if (!Array.isArray(response.items) || response.items.length < 25) throw new Error("Incomplete Hebcal calendar for " + year);
  const items = response.items.filter((item) => item && typeof item.title === "string" && typeof item.date === "string").map((item) => ({ title: item.title.replace(/[’‘]/g, "'"), date: assertDay(item.date.slice(0, 10)) }));
  const find = (pattern, required = true) => {
    const item = items.find(item => pattern.test(item.title));
    if (!item && required) throw new Error("Hebcal missing " + pattern + " for " + year);
    return item?.date;
  };
  const p1 = find(/^Pesach I$/i);
  const p7 = find(/^Pesach VII$/i);
  const sukkot = find(/^Sukkot I$/i);
  const simchat = find(/^(Shmini Atzeret|Shemini Atzeret|Simchat Torah)$/i);
  const rosh = find(/^Rosh Hashana(h)? (?!II\b)/i);
  const kippur = find(/^Yom Kippur$/i);
  const shavuot = find(/^Shavuot$/i);
  const purim = find(/^Purim$/i);
  const shushan = find(/^Shushan Purim$/i);
  const tubishvat = find(/^Tu B(?:i|')Shvat$/i);
  const lag = find(/^Lag B(?:a|')Omer$/i);
  const fast = find(/^Tish'?a B'Av$/i);
  const hanukkah = find(/^Chanukah: 1 Candle$/i);
  const sigd = find(/^Sigd$/i);
  const yshoah = find(/^Yom HaShoah$/i);
  const yzikaron = find(/^Yom HaZikaron$/i);
  const yatz = find(/^Yom HaAtzma'ut$/i);
  const yeru = find(/^Yom Yerushalayim$/i);
  const source = "https://www.hebcal.com/holidays/" + year + "?i=on";
  const jewish = (key, name, from, to, impact, summary, travel, other = {}) =>
    mk(year, key, name, from, to, "Jewish", impact, summary, travel, { sunset: other.sunset ?? true, location: other.location, source });
  const national = (key, name, day, summary, travel, location) =>
    mk(year, key, name, shift(day, -1), day, "National", "mixed", summary, travel, { sunset: true, location, source });
  const result = [
    jewish("tu-bishvat","Tu BiShvat",shift(tubishvat,-1),tubishvat,"awareness","A Jewish celebration of trees and renewal, often marked by fruit and tree planting.","Usually no special weekday transport shutdown. Local planting activities may be busy."),
    jewish("purim","Purim",shift(purim,-1),purim,"mixed","Jewish holiday marked by costumes, festive meals and the Book of Esther.","Street parties or parades can alter local road access. Most ordinary services continue."),
    jewish("shushan-purim","Shushan Purim (Jerusalem)",shift(shushan,-1),shushan,"local","Jerusalem celebrates Purim one day after most other cities.","Jerusalem festivities can change city-centre traffic and access.",{location:"Jerusalem"}),
    jewish("passover-first","Passover — first festival day",shift(p1,-1),p1,"major","Passover recalls the Exodus from Egypt, beginning with the Seder meal.","Regular buses and trains generally stop on the festival day. Some kosher hotels and restaurants serve special Passover menus."),
    jewish("passover-intermediate","Passover — intermediate days (Chol HaMoed)",shift(p1,1),shift(p7,-1),"mixed","The intermediate days of Passover, when many places operate.","Many attractions and services operate; school holidays can make sights and accommodation crowded.",{sunset:false}),
    jewish("passover-last","Passover — final festival day",shift(p7,-1),p7,"major","The final sacred day of the seven-day Passover festival in Israel.",JEWISH_IMPACTS.major),
    jewish("lag-baomer","Lag BaOmer",shift(lag,-1),lag,"local","Jewish festival of bonfires and pilgrimage traditions.","Large gatherings near Meron may bring traffic and access restrictions.",{location:"Meron, Galilee and bonfire locations"}),
    jewish("shavuot","Shavuot",shift(shavuot,-1),shavuot,"major","The Jewish festival commemorating the giving of the Torah; one festival day in Israel.",JEWISH_IMPACTS.major),
    jewish("tisha-bav","Tisha B'Av",shift(fast,-1),fast,"mixed","A solemn Jewish fast day remembering the destruction of Jerusalem's ancient Temples.","Some entertainment and restaurants close, particularly the evening before. Regular weekday transport often runs."),
    jewish("rosh-hashanah","Rosh Hashanah",shift(rosh,-1),shift(rosh,1),"major","The Jewish New Year, observed over two festival days in Israel.","Many Jewish-run businesses close; regular transport generally stops during the holiday."),
    jewish("yom-kippur","Yom Kippur",shift(kippur,-1),kippur,"major","Judaism's Day of Atonement, marked by fasting and prayer for about 25 hours.","Scheduled flights at Ben Gurion Airport and most regular transport generally stop; plan airport journeys outside this period."),
    jewish("sukkot-first","Sukkot — first festival day",shift(sukkot,-1),sukkot,"major","The Feast of Tabernacles recalls the Israelites' desert journey.",JEWISH_IMPACTS.major),
    jewish("sukkot-intermediate","Sukkot — intermediate days (Chol HaMoed)",shift(sukkot,1),shift(simchat,-1),"mixed","Intermediate days of Sukkot with many attractions and shops operating.","Holiday activities and school breaks can make accommodation and family attractions busy.",{sunset:false}),
    jewish("simchat-torah","Shemini Atzeret / Simchat Torah (Israel)",shift(simchat,-1),simchat,"major","One combined festival day in Israel celebrating the Torah-reading cycle.",JEWISH_IMPACTS.major),
    jewish("hanukkah","Hanukkah",hanukkah,shift(hanukkah,8),"mixed","The Jewish Festival of Lights, marked by candle-lighting across eight nights.","Most weekday services continue; school breaks and holiday activities may bring higher family demand."),
    jewish("sigd","Sigd (Ethiopian Jewish holiday)",shift(sigd,-1),sigd,"local","An Ethiopian Jewish festival of prayer and gathering.","Jerusalem ceremony sites can be busy; it is not a nationwide transport shutdown.",{location:"Jerusalem and Ethiopian Jewish communities"}),
    national("yom-hashoah","Yom HaShoah — Holocaust Remembrance Day",yshoah,"Israel's solemn day of Holocaust remembrance, including a morning siren.","Ceremonies and entertainment venue closures can affect local plans."),
    national("yom-hazikaron","Yom HaZikaron — Memorial Day",yzikaron,"National remembrance of fallen soldiers and victims of terrorism.","Sirens and commemorations affect some roads and entertainment venues."),
    national("independence","Yom HaAtzmaut — Independence Day",yatz,"Israel's Independence Day, with celebrations following Memorial Day.","Local celebrations can change traffic and business hours."),
    mk(year,"jerusalem-day","Jerusalem Day",shift(yeru,-1),yeru,"National","local","Israeli national observance with ceremonies in Jerusalem.","Events may restrict movement around the Old City and central streets.",{sunset:true,location:"Jerusalem",source}),
  ];
  if (result.length !== 20 || !result.every(h=>h.from<=h.to)) throw new Error("Invalid mapped Jewish holiday calendar "+year);
  return result;
}
function easterWestern(year) {
  // Gregorian computus, valid for 1900–2099.
  const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3);
  const h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k+7*7)%7;
  const m=Math.floor((a+11*h+22*l)/451),month=Math.floor((h+l-7*m+114)/31),day=((h+l-7*m+114)%31)+1;
  return md(year,month,day);
}
function easterOrthodox(year) {
  // Julian computus, converted to Gregorian (13-day offset in 1900–2099).
  const a=year%4,b=year%7,c=year%19,d=(19*c+15)%30,e=(2*a+4*b-d+34)%7;
  const month=Math.floor((d+e+114)/31),day=((d+e+114)%31)+1;
  return shift(md(year,month,day),13);
}
function christian(year) {
  const west=easterWestern(year),orth=easterOrthodox(year),source="https://www.timeanddate.com/holidays/israel/"+year;
  return [
    mk(year,"western-christmas","Western Christmas",md(year,12,24),md(year,12,25),"Christian","local","Christmas Eve and Day in Western Christian traditions.","Local worship and celebrations may restrict church visits in Bethlehem, Jerusalem and Nazareth.",{location:"Bethlehem, Nazareth, Jerusalem and Christian communities",source}),
    mk(year,"orthodox-christmas","Orthodox Christmas",md(year,1,6),md(year,1,7),"Christian","local","Christmas services in churches following the Julian calendar.","Services may restrict sightseeing access to particular churches.",{location:"Jerusalem, Bethlehem and Orthodox communities",source}),
    mk(year,"armenian-christmas","Armenian Christmas in Jerusalem",md(year,1,18),md(year,1,19),"Christian","local","Christmas and Epiphany in Jerusalem's Armenian tradition.","Religious services affect local access around the Armenian Quarter and Bethlehem.",{location:"Jerusalem and Bethlehem",source}),
    mk(year,"western-easter","Western Holy Week and Easter",shift(west,-7),west,"Christian","local","Western Holy Week with Palm Sunday, Good Friday and Easter Sunday.","Processions and Easter worship can restrict access around Jerusalem's Old City and major churches.",{location:"Jerusalem, Nazareth and Bethlehem",source}),
    mk(year,"orthodox-easter","Orthodox / Armenian Holy Week and Easter",shift(orth,-7),orth,"Christian","local","Eastern Holy Week including the Holy Fire ceremony on the Saturday before Easter.","The Holy Fire ceremony can bring substantial crowd controls around the Holy Sepulchre and Old City.",{location:"Jerusalem and Bethlehem",source}),
  ];
}
function parseIslamicDay(payload) {
  if (payload?.code!==200 || typeof payload?.data?.gregorian?.date!=="string") throw new Error("Invalid AlAdhan Gregorian date");
  const [d,m,y]=payload.data.gregorian.date.split("-");
  return assertDay(y+"-"+m+"-"+d);
}
async function islamic(year) {
  const r=await requestJSON(ISLAMIC_API+"/islamicYearFromGregorianForRamadan/"+year);
  if(r.code!==200 || !Number.isInteger(Number(r.data))) throw new Error("Could not identify Ramadan Hijri year "+year);
  const h=Number(r.data),method="?calendarMethod=UAQ";
  const [ramadan,fitr,adha]=await Promise.all([
    requestJSON(ISLAMIC_API+"/hToG/01-09-"+h+method),
    requestJSON(ISLAMIC_API+"/hToG/01-10-"+h+method),
    requestJSON(ISLAMIC_API+"/hToG/10-12-"+h+method),
  ]).then(data=>data.map(parseIslamicDay));
  if(yearOf(ramadan)!==year || yearOf(fitr)!==year || yearOf(adha)!==year || !(ramadan<fitr && fitr<adha)) throw new Error("Unexpected Islamic holiday chronology "+year);
  return [
    mk(year,"ramadan","Ramadan (estimated)",shift(ramadan,-1),shift(fitr,-1),"Muslim","local","A month of daytime fasting, evening meals and prayer.","Some Muslim-run businesses adjust hours; restaurants and markets may be livelier after sunset.",{sunset:true,tentative:true,location:"Muslim communities; Jerusalem and mixed cities",source:ALADHAN_SOURCE}),
    mk(year,"eid-fitr","Eid al-Fitr (estimated)",shift(fitr,-1),shift(fitr,2),"Muslim","local","Festival marking the end of Ramadan.","Some Muslim-run businesses may close or use holiday hours; family travel can be busy.",{sunset:true,tentative:true,location:"Muslim communities nationwide",source:ALADHAN_SOURCE}),
    mk(year,"eid-adha","Eid al-Adha (estimated)",shift(adha,-1),shift(adha,3),"Muslim","local","The Festival of Sacrifice, celebrated by Muslim and Druze communities.","Some Muslim- and Druze-run services may close or change hours; local family travel can increase.",{sunset:true,tentative:true,otherCommunities:["Druze"],location:"Muslim and Druze communities",source:ALADHAN_SOURCE}),
  ];
}
function druze(year) {
  return [mk(year,"nabi-shuayb","Nabi Shu'ayb pilgrimage (Druze)",md(year,4,24),md(year,4,28),"Druze","local","A pilgrimage to the shrine of Prophet Jethro near Tiberias.","Druze-owned businesses may adjust opening hours and shrine roads can become busy.",{location:"Hittin / Mount Arbel area and Druze communities",source:"https://www.timeanddate.com/holidays/israel/"+year})];
}
function validate(holidays, start, end) {
  const ids=new Set();
  const communities=new Set();
  for(const h of holidays) {
    if(ids.has(h.id)) throw new Error("Duplicate holiday "+h.id);
    ids.add(h.id);communities.add(h.community);
    if(h.from>h.to || h.from<start || h.from>end || h.summary.length<25 || h.travel.length<35 || !/^https:\/\//.test(h.source)) throw new Error("Invalid holiday "+h.id);
  }
  if(holidays.length<55 || !["Jewish","Christian","Muslim","Druze","National"].every(c=>communities.has(c))) throw new Error("Generated calendar is incomplete");
  return holidays.sort((a,b)=>a.from.localeCompare(b.from)||a.name.localeCompare(b.name));
}
async function run() {
  if(process.argv.some(arg=>arg!=="--check" && arg.startsWith("--"))) throw new Error("Unknown CLI argument");
  const thisYear=new Date().getUTCFullYear();
  // Keep the preceding year for festivals crossing New Year (such as Hanukkah).
  const startYear=Math.max(2028,thisYear-1);
  const endYear=Math.max(startYear+2,thisYear+2);
  if(endYear>=2100) throw new Error("Easter conversion requires extension past 2099");
  const years=Array.from({length:endYear-startYear+1},(_,i)=>startYear+i);
  const batches=[];
  for(const year of years) batches.push([...(await hebcal(year)),...christian(year),...(await islamic(year)),...druze(year)]);
  const holidays=validate(batches.flat(),startYear+"-01-01",endYear+"-12-31");
  const generatedAt=new Date().toISOString().slice(0,10);
  const snapshot={generatedAt,through:endYear+"-12-31",holidays};
  const output=JSON.stringify(snapshot,null,2)+"\n";
  const existing=await readFile(OUTPUT,"utf8");
  const old=JSON.parse(existing);
  const comparable={...snapshot,generatedAt:old.generatedAt};
  if(JSON.stringify(comparable)===JSON.stringify(old)) { console.log("Holiday data unchanged");return; }
  if(process.argv.includes("--check")) throw new Error("Holiday data requires refresh");
  await writeFile(OUTPUT,output);
  console.log("Generated "+holidays.length+" holiday periods through "+snapshot.through);
}
run().catch(e=>{ console.error(e);process.exitCode=1;});
