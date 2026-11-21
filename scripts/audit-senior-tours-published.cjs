/* Read-only checks and screenshots of the published senior-tours guide. No form submissions. */
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const origin=(process.env.SENIORS_AUDIT_ORIGIN||"https://saddlebrown-guanaco-454061.hostingersite.com").replace(/\/+$/,"");
const url=origin+"/travel-blog/israel-tours-for-seniors/";
const dir="/tmp/israel-senior-tours-published";
fs.mkdirSync(dir,{recursive:true});
const results=[],errors=[],issues=[];
function check(ok,label,detail=""){
 results.push({passed:!!ok,label,detail});
 console.log((ok?"PASS ":"FAIL ")+label+(detail?" | "+detail:""));
 if(!ok)errors.push(label);
}
const nap=ms=>new Promise(r=>setTimeout(r,ms));
async function imagesDecoded(page){
 const imgs=page.locator("main img"),failed=[];
 for(let i=0;i<await imgs.count();i++){
  const img=imgs.nth(i),src=await img.getAttribute("src");
  try{
   await img.scrollIntoViewIfNeeded({timeout:12000});
   await nap(550);
   await img.evaluate(el=>el.decode());
   if(!await img.evaluate(el=>el.naturalWidth>0))throw Error("zero naturalWidth");
  }catch(e){failed.push({src,error:String(e).slice(0,130)});}
 }
 return failed;
}
async function snapshot(page,label){
 const data=await page.evaluate(()=>{
  const all=selector=>Array.from(document.querySelectorAll(selector));
  const h1=all("h1").map(x=>x.textContent.trim());
  const form=all("#contact form");
  const sections=["overview","private-driver","day-trips","choose-pace","accessibility","before-booking","faq","explore-sites","travel-guides","contact","sources"];
  const schema=all('script[type="application/ld+json"]').map(el=>el.textContent||"").join(" ");
  const dayCards=all("[data-senior-day-trip]");
  const related=all("#explore-sites .grid>a,#travel-guides .grid>a");
  const images=all("main img").map(img=>({alt:img.getAttribute("alt"),src:img.getAttribute("src"),loaded:img.complete&&img.naturalWidth>0}));
  return {
   h1,canonical:document.querySelector('link[rel="canonical"]')?.href,
   updated:document.querySelector("main time")?.getAttribute("datetime"),
   robots:document.querySelector('meta[name="robots"]')?.content,
   sections:sections.filter(id=>!!document.getElementById(id)),
   dayTrips:dayCards.map(x=>x.dataset.seniorDayTrip),
   related:related.map(x=>({to:x.getAttribute("href"),image:!!x.querySelector("img")?.naturalWidth})),
   siteLinks:all("main a[href^='/attractions/']").length,
   maps:all("#day-trips a[href*='google.com/maps/search/']").length,
   customEnquiries:dayCards.map(card=>({id:card.dataset.seniorDayTrip,href:card.querySelector("[data-senior-trip-enquiry]")?.getAttribute("href"),label:card.querySelector("[data-senior-trip-enquiry]")?.textContent.trim(),secondary:card.querySelector("a[href^='/tours/']")?.getAttribute("href")})),
   sampleOrders:dayCards.map(card=>({id:card.dataset.seniorDayTrip,steps:card.querySelectorAll("[data-senior-sample-route] li").length,rest:card.textContent.includes("Time to rest:"),short:card.textContent.includes("If you prefer a shorter day:")})),
   accessResources:all("#day-trips [data-senior-access-resources] a").map(a=>a.href),
   midpageCta:all("#day-trips [data-senior-midpage-cta] a[href='#contact']").length,
   faq:all("#faq details").length,articleSchema:schema.includes('"Article"'),
   contact:form.length===1,portrait:!!document.querySelector("#contact img[data-photo-role='contact-portrait']"),
   source:!!document.querySelector("#sources"),images,
   width:document.documentElement.scrollWidth,viewport:innerWidth,
  };
 });
 check(data.h1.length===1&&data.h1[0].startsWith("Israel Tours for Seniors"),label+" H1");
 check(data.canonical===url,label+" canonical",String(data.canonical));
 check(data.updated==="2026-11-21",label+" review date",String(data.updated));
 check(data.robots?.includes("noindex"),label+" staging noindex");
 check(data.sections.length===11,label+" all sections",JSON.stringify(data.sections));
 check(data.dayTrips.join(",")==="jerusalem,masada,galilee,coast",label+" four private trip ideas",JSON.stringify(data.dayTrips));
 check(data.related.length===12&&data.related.every(x=>x.to),label+" twelve illustrated internal guides",String(data.related.length));
 check(data.maps===4,label+" four geographical links",String(data.maps));
 check(data.customEnquiries.length===4&&data.customEnquiries.every(x=>x.href==="#contact"&&x.label.includes("Ask me about this private trip")&&x.secondary?.startsWith("/tours/")),label+" four personalized enquiry links and secondary tours",JSON.stringify(data.customEnquiries));
 check(data.sampleOrders.length===4&&data.sampleOrders.every(x=>x.steps===3&&x.rest&&x.short),label+" four practical three-stop routes with rests and shorter alternatives",JSON.stringify(data.sampleOrders));
 check(data.midpageCta===1,label+" additional modest enquiry link after day trips");
 check(data.accessResources.length>=6&&data.accessResources.some(h=>h.includes("play.google.com"))&&data.accessResources.some(h=>h.includes("apps.apple.com"))&&data.accessResources.some(h=>h.includes("parks.org.il")),label+" targeted accessible route maps and official park links",JSON.stringify(data.accessResources));
 check(data.faq===10&&data.articleSchema,label+" FAQ and Article metadata",JSON.stringify({faqs:data.faq,article:data.articleSchema}));
 check(data.contact&&data.portrait&&data.source,label+" personalized enquiry form and sources");
 check(data.images.length>=18&&data.images.every(i=>i.loaded&&i.alt!==null),label+" photos load and have alt attributes",JSON.stringify(data.images.filter(i=>!i.loaded||i.alt===null)));
 check(data.related.every(i=>i.image),label+" all twelve related photos decode");
 check(data.width<=data.viewport+8,label+" no horizontal overflow",JSON.stringify({pageWidth:data.width,viewport:data.viewport}));
 return data;
}
(async()=>{
 let browser,jsErrors=[];
 const snapshots={};
 try{
  browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
  page.on("pageerror",e=>jsErrors.push(e.message));
  page.on("response",res=>{if(res.status()>=400)issues.push({status:res.status(),url:res.url().slice(0,180)})});
  const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:90000});
  check(response?.status()===200,"published HTTP 200",String(response?.status()));
  if(response?.status()!==200)throw Error("Published page could not be loaded");
  for(const [label,w,h] of [["desktop-1440",1440,900],["mobile-390",390,844],["mobile-360",360,780]]){
   await page.setViewportSize({width:w,height:h});await nap(300);
   const failed=await imagesDecoded(page);
   check(failed.length===0,label+" all images decode",JSON.stringify(failed));
   snapshots[label]=await snapshot(page,label);
   await page.screenshot({path:path.join(dir,label+".png"),fullPage:true,animations:"disabled"});
  }
  check(jsErrors.length===0,"no JavaScript errors",JSON.stringify(jsErrors));
  if(issues.length)console.log("HTTP DIAGNOSTICS "+JSON.stringify(issues));
 }catch(e){check(false,"audit completed",String(e));}
 finally{
  if(browser)await browser.close();
  fs.writeFileSync(path.join(dir,"results.json"),JSON.stringify({url,checks:results,errors,issues,snapshots},null,2));
 }
 console.log("Total checks "+results.length+"; failures "+errors.length);
 if(errors.length)process.exitCode=1;
})();
