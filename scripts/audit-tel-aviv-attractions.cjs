const {chromium}=require("playwright");
const fs=require("node:fs");
async function main(){
const url=process.env.TEL_AVIV_AUDIT_URL||"https://saddlebrown-guanaco-454061.hostingersite.com/travel-blog/attractions-in-tel-aviv/";
const localMode=Boolean(process.env.TEL_AVIV_AUDIT_URL);
const expected="Carmel Market Food-Tasting Tour";
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let published=false;
for(let i=0;i<28;i++){
  try {
    const res=await fetch(url,{signal:AbortSignal.timeout(18000)});
    const html=await res.text();
    if(res.ok && (localMode || html.includes(expected))){
      published=true;
      console.log(localMode?"LOCAL BUILD READY":"CURRENT TEL AVIV REVISION PUBLISHED",res.status,html.length);
      break;
    }
    console.log("Awaiting published revision",i,res.status,html.includes(expected));
  } catch(e) { console.log("Published page probe",i,String(e).slice(0,150)); }
  await sleep(15000);
}
if(!published)throw Error(localMode?"Local Tel Aviv preview not responding":"Updated Tel Aviv page not visible publicly within audit window");
fs.mkdirSync("tel-aviv-visual-audit",{recursive:true});
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const results=[];
try {
 for (const config of [{name:"mobile-390",width:390,height:844},{name:"desktop-1440",width:1440,height:900}]) {
   const page=await browser.newPage({viewport:{width:config.width,height:config.height},deviceScaleFactor:1});
   const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
   await page.locator('[data-testid="tel-aviv-experience-card"]').first().waitFor({timeout:30000});
   await page.evaluate(()=>{for(const img of document.images)img.loading="eager"});
   await page.evaluate(async()=>{
     await Promise.allSettled(Array.from(document.images,im=>im.complete?Promise.resolve():new Promise(resolve=>{
       im.addEventListener("load",resolve,{once:true});im.addEventListener("error",resolve,{once:true});
     })));
   });
   await page.waitForTimeout(600);
   // Actively scroll to trigger intersection-based image rendering and the lazy map iframe.
   const totalHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<totalHeight;y+=Math.max(500,Math.floor(config.height*0.82))){
     await page.evaluate(y=>window.scrollTo({top:y,behavior:"instant"}),y);
     await page.waitForTimeout(85);
   }
   await page.locator('iframe[title="Interactive map of ten Tel Aviv and Jaffa attractions"]').scrollIntoViewIfNeeded();
   await page.waitForTimeout(3500);
   const iframeDebug=await page.evaluate(()=>{
     const el=document.querySelector('iframe[title="Interactive map of ten Tel Aviv and Jaffa attractions"]');
     return {src:el?.src,loaded:el?.contentDocument?.readyState,bodyText:el?.contentDocument?.body?.textContent?.slice(0,160),hasMapEl:!!el?.contentDocument?.querySelector("#map")};
   });
   console.log("MAP_FRAME_DEBUG",config.name,JSON.stringify(iframeDebug));
   await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
   await page.waitForTimeout(1200);
   const stat=await page.evaluate(()=>{
     const link=label=>Array.from(document.querySelectorAll("a")).filter(a=>a.textContent?.includes(label));
     const imgs=Array.from(document.querySelectorAll("main img")).map(im=>({src:new URL(im.src).pathname,loaded:im.complete&&im.naturalWidth>0,natural:im.naturalWidth,alt:im.alt}));
     const links=Array.from(document.querySelectorAll("a[href]")).map(a=>a.href);
     const oldLink=links.some(h=>h.includes("/en/Visit/Beaches/Pages/Beaches.aspx"));
     const main=document.querySelector("main");
     const overflow=document.documentElement.scrollWidth-window.innerWidth;
     const tourImgs=Array.from(document.querySelectorAll('[data-testid="tel-aviv-curated-tour"] img')).map(x=>x.src);
     return {
       title:document.title,
       h1:document.querySelector("h1")?.textContent?.trim(),
       experiences:document.querySelectorAll('[data-testid="tel-aviv-experience-card"]').length,
       tours:document.querySelectorAll('[data-testid="tel-aviv-curated-tour"]').length,
       quickPicks:document.querySelectorAll('[data-testid="tel-aviv-quick-picks"] a').length,
       routeLinks:link("Open walking route on Google Maps").length,
       newEnglishBeach:links.some(h=>h.includes("/en/visit/beaches/pages/default.aspx")),
       hebrewBeach:links.some(h=>h.includes("/Visitors/Beaches/Pages/Beaches.aspx")),
       noOldBeachLink:!oldLink,
       correctFoodTour:!!main?.textContent?.includes("Carmel Market Food-Tasting Tour"),
       noCookingWorkshop:!main?.textContent?.includes("Market Tour & Israeli Cooking Workshop"),
       weekendBus:!!main?.textContent?.includes("Na'im BeSofash weekend shuttle"),
       graffitiPhoto:tourImgs.some(h=>h.includes("florentin-graffiti.webp")),
       foodPhoto:tourImgs.some(h=>h.includes("carmel-food-tasting.webp")),
       images:imgs.length,brokenImages:imgs.filter(x=>!x.loaded),horizontalOverflowPixels:overflow,
       imageVisibility: Array.from(document.querySelectorAll('[data-testid="tel-aviv-experience-card"] img')).map(im=>({src:new URL(im.src).pathname,opacity:getComputedStyle(im).opacity,visibility:getComputedStyle(im).visibility,display:getComputedStyle(im).display,height:Math.round(im.getBoundingClientRect().height)})),
       sourceCredit:!!main?.textContent?.includes("Nizzan Cohen")
     };
   });
   await page.screenshot({path:"tel-aviv-visual-audit/"+config.name+"-first-screen.png",animations:"disabled",timeout:30000});
   await page.screenshot({path:"tel-aviv-visual-audit/"+config.name+"-full.png",fullPage:true,animations:"disabled",timeout:60000});
   const map=page.frameLocator('iframe[title="Interactive map of ten Tel Aviv and Jaffa attractions"]');
   try {
     await map.locator("#status").waitFor({state:"attached",timeout:10000});
     stat.mapStatus=await map.locator("#status").evaluate(el=>({hidden:el.hidden,message:el.textContent?.trim().slice(0,180)}));
   } catch(e) { stat.mapStatus={error:String(e).slice(0,200)}; }
   console.log("VISUAL_AUDIT",config.name,JSON.stringify(stat));
   results.push({viewport:config.name,status:response?.status(),...stat});
   await page.close();
 }
} finally {await browser.close();}
fs.writeFileSync("tel-aviv-visual-audit/report.json",JSON.stringify(results,null,2));
for(const a of results){
 if(a.status!==200||a.experiences!==10||a.tours!==4||a.routeLinks!==3||!a.correctFoodTour||!a.noCookingWorkshop||!a.weekendBus||!a.newEnglishBeach||!a.hebrewBeach||!a.noOldBeachLink||!a.graffitiPhoto||!a.foodPhoto||!a.sourceCredit||a.brokenImages.length||a.horizontalOverflowPixels>2)throw Error("Visual check failed for "+a.viewport);
}
console.log("TEL AVIV PUBLIC PAGE VISUAL AUDIT PASSED");
}
main().catch(error=>{console.error(error);process.exitCode=1;});
