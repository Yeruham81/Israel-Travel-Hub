/* Read-only browser audit for the published Christian tours guide. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const origin = (process.env.CHRISTIAN_AUDIT_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com").replace(/\/+$/, "");
const url = origin + "/travel-blog/christian-tours-in-israel/";
const output = "/tmp/christian-tours-published";
fs.mkdirSync(output, {recursive:true});
const checks = [], findings = [], responses = [], snapshots = {};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function verify(ok, name, info="") {
  checks.push({passed:!!ok,name,info});
  console.log((ok?"PASS ":"FAIL ")+name+(info?" | "+info:""));
  if(!ok)findings.push(name);
}
async function scrollImages(page) {
  const imgs = page.locator("main img");
  const failed = [];
  for(let i=0, n=await imgs.count(); i<n; i++){
    const img=imgs.nth(i),src=await img.getAttribute("src");
    try{
      await img.scrollIntoViewIfNeeded({timeout:14000});
      await delay(450);
      await img.evaluate(el=>el.decode());
      if(!(await img.evaluate(el=>el.naturalWidth>0)))throw Error("naturalWidth=0");
    }catch(e){failed.push({src,error:String(e).slice(0,170)});}
  }
  return failed;
}
async function inspect(page, label) {
  const data=await page.evaluate(()=>{
    const all=(s)=>Array.from(document.querySelectorAll(s));
    const images=all("main img").map(img=>({src:img.getAttribute("src"),alt:img.getAttribute("alt"),loaded:img.complete&&img.naturalWidth>0}));
    const tours=all("[data-christian-tour]").map(card=>({
      id:card.getAttribute("data-christian-tour"),
      href:card.querySelector("a[href*='.tpm.li/']")?.href,
      img:card.querySelector("img")?.getAttribute("src"),
      loaded:!!card.querySelector("img")?.naturalWidth,
    }));
    const maps=all("#itineraries a[href*='google.com/maps/dir/']").map(a=>({title:a.textContent.trim(),url:a.href}));
    const related=all("#more-sites .grid>a,#plan-trip .grid>a");
    const schema=all('script[type="application/ld+json"]').map(s=>s.textContent||"").join(" ");
    return {
      h1:all("h1").map(x=>x.textContent.trim()),
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      updated:document.querySelector("main time")?.getAttribute("datetime"),
      robots:document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      sections:["start","destinations","itineraries","tours","practical","other-places","faq","more-sites","plan-trip","contact","sources"].filter(id=>!!document.getElementById(id)),
      areas:all("[data-christian-area]").map(a=>a.getAttribute("data-christian-area")),
      areaPlaceLinks:all("[data-christian-area] a[href*='google.com/maps/search']").length,
      official:all("[data-christian-area] a[href*='custodia.org'],[data-christian-area] a[href*='bethlehem-city.org'],[data-christian-area] a[href*='carmelholylanddco.org']").map(a=>a.href),
      tours, south:all("[data-christian-tour-group='south'] [data-christian-tour]").map(a=>a.getAttribute("data-christian-tour")),
      north:all("[data-christian-tour-group='north'] [data-christian-tour]").map(a=>a.getAttribute("data-christian-tour")),
      maps, related:related.map(a=>({href:a.getAttribute("href"),image:!!a.querySelector("img")?.naturalWidth})),
      faq:all("#faq details").length,
      hasArticle:schema.includes('"Article"'), hasFaq:schema.includes('"FAQPage"'),
      contact:!!document.querySelector("#contact form"), portrait:!!document.querySelector("#contact [data-photo-role='contact-portrait']"),
      sourcesAfterContact:!!(document.querySelector("#sources")&&document.querySelector("#contact")&&(document.querySelector("#contact").compareDocumentPosition(document.querySelector("#sources"))&Node.DOCUMENT_POSITION_FOLLOWING)),
      images, width:document.documentElement.scrollWidth,viewport:innerWidth,
    };
  });
  verify(data.h1.length===1&&data.h1[0].startsWith("Christian Tours in Israel"),label+" H1");
  verify(data.canonical===url,label+" canonical",String(data.canonical));
  verify(data.updated==="2026-11-21",label+" editorial review date",String(data.updated));
  verify(data.robots?.includes("noindex"),label+" staging noindex");
  verify(data.sections.length===11,label+" all 11 guide sections",JSON.stringify(data.sections));
  verify(data.areas.length===7,label+" seven distinct areas",JSON.stringify(data.areas));
  verify(data.areaPlaceLinks>=12&&data.official.length>=5,label+" individual maps and verified site references",JSON.stringify({maps:data.areaPlaceLinks,official:data.official.length}));
  verify(data.tours.length===6&&data.south.length===3&&data.north.length===3&&data.south.includes("baptism-jericho")&&data.north.includes("nazareth-yardenit"),label+" accurate tour groupings");
  verify(data.tours.every(t=>/^https:\/\/(?:viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+\?sub_id=christian_tours_/.test(t.href||"")),label+" six page-specific Travelpayouts URLs",JSON.stringify(data.tours.map(t=>({id:t.id,href:t.href}))));
  verify(data.maps.length===12&&data.maps.some(m=>m.url.includes("waypoints=")),label+" twelve regional Google Maps segments",String(data.maps.length));
  verify(data.related.length===12&&data.related.every(x=>x.href),label+" twelve related guide cards");
  verify(data.faq===10&&data.hasArticle,label+" FAQ and Article metadata",JSON.stringify({faq:data.faq,article:data.hasArticle}));
  verify(data.contact&&data.portrait&&data.sourcesAfterContact,label+" personal contact form and sources");
  verify(data.images.length>=26&&data.images.every(i=>i.loaded&&i.alt!==null),label+" all published photos decode",JSON.stringify(data.images.filter(i=>!i.loaded||i.alt===null)));
  verify(data.tours.every(t=>t.loaded),label+" all six tour photos decode");
  verify(data.related.every(x=>x.image),label+" all twelve linked guide photos decode");
  verify(data.width<=data.viewport+8,label+" no horizontal overflow",JSON.stringify({width:data.width,viewport:data.viewport}));
  return data;
}
(async()=>{
  let browser;
  const jsErrors=[];
  try{
    browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
    page.on("pageerror",e=>jsErrors.push(e.message));
    page.on("response",r=>{if(r.status()>=400)responses.push({status:r.status(),url:r.url().slice(0,220)});});
    page.on("requestfailed",r=>responses.push({status:"network_error",url:r.url().slice(0,220),reason:r.failure()?.errorText}));
    const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:80000});
    verify(response?.status()===200,"published page HTTP 200",String(response?.status()));
    if(response?.status()!==200)throw Error("Live page unavailable");
    for(const [label,width,height] of [["desktop-1440",1440,900],["mobile-390",390,844],["mobile-360",360,780]]){
      await page.setViewportSize({width,height});
      await delay(350);
      const failed=await scrollImages(page);
      verify(failed.length===0,label+" lazy images decode",JSON.stringify(failed));
      snapshots[label]=await inspect(page,label);
      await page.screenshot({path:path.join(output,label+".png"),fullPage:true,animations:"disabled"});
    }
    verify(jsErrors.length===0,"no JavaScript errors",JSON.stringify(jsErrors));
    if(responses.length)console.log("HTTP/NETWORK DIAGNOSTICS: "+JSON.stringify(responses));
    await page.close();
  }catch(e){verify(false,"browser audit completed",String(e));}
  finally{
    if(browser)await browser.close();
    fs.writeFileSync(path.join(output,"results.json"),JSON.stringify({url,checks,findings,responses,jsErrors,snapshots},null,2));
  }
  console.log("Total checks "+checks.length+"; failures "+findings.length);
  if(findings.length)process.exitCode=1;
})();
