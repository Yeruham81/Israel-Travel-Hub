/** Local-date helpers: no browser timezone assumptions for visitors outside Israel. */
export type Month = { year:number; month:number; label:string; key:string };
const pad = (n:number) => String(n).padStart(2,"0");
export const monthKey = (year:number, month:number) => String(year)+"-"+pad(month+1);
export function israelToday(now:Date = new Date()):string {
  const parts = new Intl.DateTimeFormat("en-GB", {timeZone:"Asia/Jerusalem", year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const get=(type:string)=>parts.find(p=>p.type===type)?.value || "";
  return get("year")+"-"+get("month")+"-"+get("day");
}
export function nextMonth(year:number,month:number,distance=1) {
  const d=new Date(Date.UTC(year,month+distance,1));
  return {year:d.getUTCFullYear(),month:d.getUTCMonth()};
}
/** At most 15 whole current/future months, and never after the reviewed dataset. */
export function rollingMonths(today:string,coverageEnd:string,count=15):Month[] {
  if(today>coverageEnd) return [];
  const [year,month]=today.split("-").map(Number);
  if(!year||!month||month<1||month>12) return [];
  const months:Month[]=[];
  for(let offset=0;offset<count;offset++) {
    const candidate=nextMonth(year,month-1,offset);
    const key=monthKey(candidate.year,candidate.month);
    if(key+"-01">coverageEnd) break;
    months.push({...candidate,key,label:new Date(Date.UTC(candidate.year,candidate.month,1)).toLocaleDateString("en-GB",{month:"long",year:"numeric",timeZone:"UTC"})});
  }
  return months;
}
export function visibleHolidayYears(today:string,coverageEnd:string):number[] {
  if(today>coverageEnd) return [];
  const from=Number(today.slice(0,4)),to=Number(coverageEnd.slice(0,4));
  return Array.from({length:to-from+1},(_,i)=>from+i);
}
export function quarterRange(year:number, quarter:number|"all") {
  if(quarter==="all") return {from:year+"-01-01",to:year+"-12-31"};
  if(!Number.isInteger(quarter)||quarter<0||quarter>3) throw new Error("Invalid quarter");
  const month=quarter*3,from=monthKey(year,month)+"-01";
  const last=nextMonth(year,month,3);
  const to=new Date(Date.UTC(last.year,last.month,0)).toISOString().slice(0,10);
  return {from,to};
}
export function latestAllowedQuarter(year:number,today:string,end:string) {
  const start=year===Number(today.slice(0,4))?Number(today.slice(5,7))-1:0;
  for(let q=Math.floor(start/3);q<=3;q++) {
    const range=quarterRange(year,q);
    if(range.to>=today.slice(0,7)+"-01"&&range.from<=end) return q as 0|1|2|3;
  }
  return 0 as const;
}
