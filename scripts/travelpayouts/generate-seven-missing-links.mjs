/** Generate exactly seven missing, page-attributed Travelpayouts clickout links.
 * Does not modify any published links, and never prints the API token.
 * Use --validate to inspect all source products before API access.
 */
import { mkdir, writeFile } from "node:fs/promises";
const trs=406243, marker=622032;
const entries=[
  {id:"haifa-family-booking",provider:"booking",page:"/accommodation/haifa/family/",url:"https://www.booking.com/city/il/haifa.html"},
  {id:"haifa-boutique-booking",provider:"booking",page:"/accommodation/haifa/boutique/",url:"https://www.booking.com/city/il/haifa.html"},
  {id:"tiberias-stays-booking",provider:"booking",page:"/accommodation/tiberias/",url:"https://www.booking.com/city/il/tiberias.html"},
  {id:"olives-6540p87",provider:"viator",page:"/attractions/mount-of-olives/",url:"https://www.viator.com/en-GB/tours/Jerusalem/Jerusalem-Mount-of-Olives-Tour/d921-6540P87"},
  {id:"olives-117240p3",provider:"viator",page:"/attractions/mount-of-olives/",url:"https://www.viator.com/en-GB/tours/Jerusalem/Mt-of-Olives-from-the-Church-of-the-Ascension-to-Gethsemane/d921-117240P3"},
  {id:"zion-5209p123",provider:"viator",page:"/attractions/mount-zion/",url:"https://www.viator.com/tours/Jerusalem/Jerusalem-Old-City/d921-5209P123"},
  {id:"zion-5209tel210",provider:"viator",page:"/attractions/mount-zion/",url:"https://www.viator.com/tours/Tel-Aviv/Old-Jerusalem-Day-Trip-from-Tel-Aviv/d920-5209TEL210"},
].map(e=>({...e,sub_id:"itt_"+e.id.replaceAll("-","_")}));
if(entries.length!==7||new Set(entries.map(e=>e.id)).size!==7||new Set(entries.map(e=>e.sub_id)).size!==7)throw Error("Invalid seven-link batch");
for (const e of entries){
  const url=new URL(e.url),host=e.provider==="booking"?"www.booking.com":"www.viator.com";
  if(url.protocol!=="https:"||url.hostname!==host||url.username||url.password||url.hash)throw Error("Unexpected provider destination: "+e.id);
}
if(process.argv.includes("--validate")){console.log("Verified 7 exact source destinations and distinct tracking subIDs");process.exit(0);}
const token=process.env.TRAVELPAYOUTS_API_TOKEN;
if(!token)throw Error("TRAVELPAYOUTS_API_TOKEN is not configured");
const result=[];
for(const e of entries){
  try {
    const response=await fetch("https://api.travelpayouts.com/links/v1/create",{
      method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json","X-Access-Token":token},
      body:JSON.stringify({trs,marker,shorten:true,links:[{url:e.url,sub_id:e.sub_id}]}),
      redirect:"error",signal:AbortSignal.timeout(25000)
    });
    if(!response.ok){result.push({...e,status:"api_http_"+response.status,affiliate_url:null});continue;}
    const data=await response.json(),record=data?.result?.links?.find(x=>x.url===e.url);
    let affiliate_url=null;
    if(data?.code==="success"&&record?.code==="success"&&typeof record.partner_url==="string"){
      const link=new URL(record.partner_url);
      if(link.protocol==="https:"&&!link.username&&!link.password&&(
        link.hostname==="tp.st"||link.hostname==="tp.media"||
        link.hostname.endsWith(".tpm.li")||link.hostname.endsWith(".tpk.lv")
      ))affiliate_url=link.toString();
    }
    result.push({...e,status:affiliate_url?"ready":"not_supported",affiliate_url,
      note:affiliate_url?null:String(record?.message||data?.message||"Affiliate conversion unavailable").slice(0,180)});
  } catch(error){result.push({...e,status:"api_exception",affiliate_url:null,note:error instanceof Error?error.name:"UnknownError"});}
}
await mkdir("artifacts",{recursive:true});
await writeFile("artifacts/seven-missing-travelpayouts-links.json",JSON.stringify({trs,marker,checkedAt:new Date().toISOString(),results:result},null,2)+"\n");
for(const row of result)console.log(JSON.stringify({id:row.id,status:row.status,url:row.affiliate_url,note:row.note}));
console.log("Generated "+result.filter(x=>x.affiliate_url).length+"/7 verified Travelpayouts URLs");
if(result.some(x=>!x.affiliate_url))process.exitCode=1;
