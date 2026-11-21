/**
 * Read-only Chromium verification of the actual published Israel food guide.
 * Produces desktop/mobile screenshots and JSON; never changes production.
 */
const { chromium }=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const origin=(process.env.FOOD_AUDIT_ORIGIN||"https://saddlebrown-guanaco-454061.hostingersite.com").replace(/\/$/,"");
const url=origin+"/travel-blog/what-to-eat-in-israel/";
const folder="/tmp/israel-food-published";
fs.mkdirSync(folder,{recursive:true});
const failures=[];
const records=[];
function check(ok,topic,detail=""){
 records.push({ok:!!ok,topic,detail});
 if(!ok)failures.push(topic+(detail?" — "+detail:""));
}
async function evaluatePage(page,device){
 const metrics=await page.evaluate(async()=>{
   const all=(s)=>[...document.querySelectorAll(s)];
   const imgs=all("main img");
   for(const im of imgs){
     im.scrollIntoView({block:"center"});
     try{await im.decode()}catch{}
   }
   window.scrollTo(0,0);
   const filters=all('#dishes button[aria-pressed]').map(b=>({name:b.textContent?.trim(),pressed:b.getAttribute("aria-pressed")}));
   const photoURLs=imgs.map(i=>i.currentSrc);
   const canonical=document.querySelector('link[rel="canonical"]')?.getAttribute("href");
   return {
     heading:all("h1").map(x=>x.textContent?.trim()),
     title:document.title,
     canonical,robots:document.querySelector('meta[name="robots"]')?.content,
     hero:document.querySelector("[data-testid='guide-hero-media'] img")?.currentSrc,
     intro:document.querySelector("[data-guide-intro]")?.textContent?.trim()?.slice(0,170),
     dishCount:all("#dishes article").length,
     dishImageCount:all("#dishes article img").length,
     dishIds:all("#dishes article").map(x=>x.id),
     marketCount:all("#markets article").length,
     marketImageCount:all("#markets article img").length,
     tourCount:all("#food-tours article").length,
     tourImageCount:all("#food-tours article img").length,
     tourLinks:all('#food-tours a[href*="tpm.li"]').map(x=>({href:x.href,rel:x.rel})),
     wordsCount:all("#food-words article").length,
     faqCount:all("#faq details").length,
     relatedCount:all("#explore-more .grid>a").length,
     planningCount:all("#plan-trip .grid>a").length,
     relatedCols:(getComputedStyle(document.querySelector("#explore-more .grid")).gridTemplateColumns.match(/\S+/g)||[]).length,
     sourceAfterContact:(()=>{const a=document.querySelector("main #contact"),b=document.querySelector("main #sources");return !!a&&!!b&&(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)!==0})(),
     authorForm:!!document.querySelector("main #contact form"),
     authorPhoto:!!document.querySelector("main #contact [data-photo-role='contact-portrait']"),
     guideLinks:all("#explore-more .grid>a").map(a=>a.getAttribute("href")),
     allInternal:all("main a[href]").map(a=>a.getAttribute("href")).filter(s=>s?.startsWith("/")&&!s.startsWith("//")),
     imageCount:imgs.length,
     brokenImages:imgs.filter(im=>!im.complete||im.naturalWidth===0).map(im=>im.src),
     photoURLs,
     missingAlts:imgs.filter(im=>!im.hasAttribute("alt")).map(im=>im.src),
     duplicateImages:imgs.filter((im,i)=>photoURLs.indexOf(im.currentSrc)!==i && !/moshe/i.test(im.currentSrc)).map(im=>im.currentSrc),
     filters,
     directDishJumpLinks:all('nav[aria-label="Jump to a food dish"] a').map(x=>x.getAttribute("href")),
     mahaneTourPhoto:document.querySelector('#food-tours article:nth-child(2) img')?.getAttribute("src"),
     levinskyTourPhoto:document.querySelector('#food-tours article:nth-child(3) img')?.getAttribute("src"),
     jaffaMarketPhoto:all("#markets article")[3]?.querySelector("img")?.getAttribute("src"),
     licenseVisible:document.querySelector("#sources")?.textContent?.includes("CC BY-SA 3.0"),
     viewportWidth:window.innerWidth,docWidth:document.documentElement.scrollWidth,
     jsonLd:all('script[type="application/ld+json"]').map(x=>x.textContent).join("\n")
   };
 });
 check(metrics.heading.length===1&&metrics.heading[0]==="What to Eat in Israel",device+": one visitor-facing H1",JSON.stringify(metrics.heading));
 check(metrics.canonical===url,device+": canonical remains unchanged",metrics.canonical);
 check(metrics.robots?.includes("noindex"),device+": staging still not indexable",metrics.robots);
 check(metrics.hero?.includes("what-to-eat-in-israel"),device+": original food hero loads",metrics.hero);
 check(metrics.dishCount===10&&metrics.dishImageCount===10,device+": all ten illustrated foods",String(metrics.dishCount));
 check(metrics.marketCount===4&&metrics.marketImageCount===4,device+": four photographed food areas");
 check(metrics.tourCount===3&&metrics.tourImageCount===3,device+": three photographed tours");
 check(metrics.tourLinks.length===3&&metrics.tourLinks.every(x=>x.href.includes("sub_id=what_to_eat_israel_")&&x.rel.includes("sponsored")),device+": tracked sponsored tour links",JSON.stringify(metrics.tourLinks));
 check(metrics.wordsCount===6&&metrics.faqCount===8,device+": useful menu vocabulary and FAQ",JSON.stringify({words:metrics.wordsCount,faq:metrics.faqCount}));
 check(metrics.relatedCount===6&&metrics.planningCount===6,device+": both six-card guide blocks");
 check(metrics.relatedCols===(device.startsWith("desktop")?3:2),device+": responsive related card grid",String(metrics.relatedCols));
 check(metrics.sourceAfterContact&&metrics.authorForm&&metrics.authorPhoto,device+": contact form and sources at bottom");
 check(metrics.brokenImages.length===0,device+": no broken pictures",JSON.stringify(metrics.brokenImages));
 check(metrics.missingAlts.length===0,device+": every photograph has alt text",JSON.stringify(metrics.missingAlts));
 check(metrics.duplicateImages.length===0,device+": no repeated photographs",JSON.stringify(metrics.duplicateImages));
 check(metrics.docWidth<=metrics.viewportWidth+8,device+": no unwanted horizontal page scroll",JSON.stringify({doc:metrics.docWidth,viewport:metrics.viewportWidth}));
 check(metrics.filters.length===5,device+": five food category buttons");
 check(metrics.directDishJumpLinks.length===10&&new Set(metrics.directDishJumpLinks).size===10,device+": ten distinct direct dish links",JSON.stringify(metrics.directDishJumpLinks));
 check(metrics.mahaneTourPhoto==="/images/food-guide/mahane-yehuda-food-stalls.webp",device+": genuine Mahane Yehuda food-stall photo",String(metrics.mahaneTourPhoto));
 check(metrics.levinskyTourPhoto==="/images/food-guide/levinsky-spice-shop.webp",device+": genuine Levinsky Market spice-shop photo",String(metrics.levinskyTourPhoto));
 check(metrics.jaffaMarketPhoto==="/images/attractions/jaffa-flea-market.webp",device+": local Jaffa market picture",String(metrics.jaffaMarketPhoto));
 check(metrics.licenseVisible===true,device+": credited CC BY-SA Mahane image in sources");
 check(metrics.jsonLd.includes("itraveljerusalem.com"),device+": structured sources retained");
 check(metrics.jsonLd.includes("visit.tel-aviv.gov.il/info/money")&&metrics.jsonLd.includes("itraveljerusalem.com/article/markets-and-fairs"),device+": Article JSON-LD links official sources");
 const kinds=[
  ["Street food",3],["Breakfast & plates",3],["Bakery",2],["Sweet treats",2]
 ];
 for(const [name,expected] of kinds){
   await page.getByRole("button",{name,exact:true}).click();
   check((await page.locator("#dishes article").count())===expected,device+": filter "+name,JSON.stringify({expected}));
 }
 await page.getByRole("button",{name:"Sweet treats",exact:true}).click();
 await page.locator('#quick-start a[href="#falafel"]').first().click();
 await page.waitForTimeout(90);
 const afterJump=await page.evaluate(()=>({hash:location.hash,dishes:document.querySelectorAll("#dishes article").length,target:!!document.getElementById("falafel")}));
 check(afterJump.dishes===10&&afterJump.target&&afterJump.hash==="#falafel",device+": jumping to hidden falafel resets food filter",JSON.stringify(afterJump));
 await page.getByRole("button",{name:"All 10 dishes",exact:true}).click();
 check((await page.locator("#dishes article").count())===10,device+": reset filter shows ten dishes");
 await page.screenshot({path:path.join(folder,device+".png"),fullPage:true,animations:"disabled"});
 return metrics;
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const audits={};
 try{
  for(const [device,viewport] of [["desktop-1440",{width:1440,height:900}],["mobile-390",{width:390,height:844}],["mobile-360",{width:360,height:780}]]){
   const page=await browser.newPage({viewport,deviceScaleFactor:1,reducedMotion:"reduce"});
   const errors=[];
   page.on("pageerror",error=>errors.push(error.message));
   try{
    const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:70000});
    check(response?.status()===200,device+": HTTP 200",String(response?.status()));
    await page.waitForTimeout(1200);
    audits[device]=await evaluatePage(page,device);
    check(errors.length===0,device+": no JavaScript errors",JSON.stringify(errors));
   }catch(error){failures.push(device+": "+error.message);console.error(error.stack||error.message)}
   finally{await page.close()}
  }
 }finally{await browser.close()}
 fs.writeFileSync(path.join(folder,"audit.json"),JSON.stringify({url,results:audits,records,failures},null,2));
 console.log("PUBLISHED ISRAEL FOOD GUIDE CHECKS");
 for(const record of records)console.log((record.ok?"PASS ":"FAIL ")+record.topic+(record.detail?" | "+record.detail:""));
 for(const [device,metrics] of Object.entries(audits))console.log("METRICS "+device+" "+JSON.stringify({
  dishes:metrics.dishCount,markets:metrics.marketCount,tours:metrics.tourCount,related:metrics.relatedCount,
  planning:metrics.planningCount,images:metrics.imageCount,broken:metrics.brokenImages,
  duplicates:metrics.duplicateImages,cols:metrics.relatedCols,width:metrics.docWidth,
  hero:metrics.hero,canonical:metrics.canonical
 }));
 console.log("FAILURE COUNT="+failures.length);
 if(failures.length)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1});
