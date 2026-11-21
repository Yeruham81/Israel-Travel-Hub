/**
 * Published-site read-only Chromium audit of the evergreen Israel holiday guide.
 * Run only after Hostinger reports a successful deployment of the same commit.
 */
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const origin=(process.env.HOLIDAY_GUIDE_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com").replace(/\/$/,"");
const url=origin+"/travel-blog/calendar-of-events/";
const folder="/tmp/holiday-guide-published";
fs.mkdirSync(folder,{recursive:true});
const checks=[], failures=[];
const assert=(ok,label,detail="")=>{
  checks.push({ok:!!ok,label,detail});
  console.log((ok?"PASS ":"FAIL ")+label+(detail?" | "+detail:""));
  if(!ok)failures.push({label,detail});
};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function inspect(page,label,isDesktop) {
  const data=await page.evaluate(async()=>{
    const all=q=>[...document.querySelectorAll(q)];
    const imgs=all("main img");
    const hero=all('[data-testid="guide-hero-media"] img')[0];
    if(hero){try{await hero.decode()}catch{}}
    window.scrollTo(0,0);
    const cards=all("[data-holiday-card]");
    const related=all("#explore-more .grid>a");
    const source=document.querySelector("#sources");
    const contact=document.querySelector("#contact");
    return {
      h1:all("h1").map(el=>el.textContent?.trim()),
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      robots:document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      date:document.querySelector("main time")?.getAttribute("datetime"),
      articleLd:all('script[type="application/ld+json"]').map(s=>s.textContent).join(" "),
      hero:document.querySelector('[data-testid="guide-hero-media"] img')?.currentSrc,
      cards:cards.length,
      cardIds:cards.map(x=>x.id),
      holidaySections:["weekly","jewish-major","other-jewish","national","other-traditions"].map(x=>[x,document.querySelectorAll("#"+x+" [data-holiday-card]").length]),
      tableRows:all("#travel-effects tbody tr").length,
      faq:all("#faq details").length,
      related:related.length,
      cols:related[0]?getComputedStyle(document.querySelector("#explore-more .grid")).gridTemplateColumns.split(" ").filter(Boolean).length:0,
      hasEventPlanner:!!document.querySelector("#event-planner,#confirmed-events,#annual-festivals"),
      hasEventFilters:!!document.querySelector('button[aria-label="Previous month"],fieldset legend'),
      dateSources:!!document.querySelector('a[href="https://www.hebcal.com/holidays/?i=on"]') && !!document.querySelector('a[href="https://www.timeanddate.com/holidays/israel/"]'),
      removedHolidayLink:!!document.querySelector('a[href="/travel-blog/israel-holidays/"]'),
      railLink:!!document.querySelector('a[href*="rail.co.il"]'),
      contactForm:!!contact?.querySelector("form"),
      contactPhoto:!!contact?.querySelector('[data-photo-role="contact-portrait"]'),
      afterContact:!!(contact&&source&&(contact.compareDocumentPosition(source)&Node.DOCUMENT_POSITION_FOLLOWING)),
      broken:imgs.filter(img=>img.getAttribute("loading")!=="lazy" && img.getAttribute("alt")!=="" && img.complete && img.naturalWidth===0).map(img=>img.getAttribute("src")),
      missingAlt:imgs.filter(img=>!img.hasAttribute("alt")).map(img=>img.getAttribute("src")),
      viewport:innerWidth,docWidth:document.documentElement.scrollWidth,
    };
  });
  assert(data.h1.length===1&&data.h1[0]==="Holidays in Israel: A Practical Guide for Visitors",label+": single guide H1",JSON.stringify(data.h1));
  assert(data.canonical===url,label+": preserved canonical",data.canonical);
  assert(data.robots?.includes("noindex"),label+": staging noindex",data.robots);
  assert(data.date==="2026-11-21",label+": correct editorial update date",data.date);
  assert(data.articleLd.includes("Holidays in Israel: A Practical Guide for Visitors")&&data.articleLd.includes("2026-11-21"),label+": Article metadata and date");
  assert(data.hero?.includes("/images/holiday-guide/jewish-holiday-celebration.webp"),label+": authentic holiday hero",data.hero);
  assert(data.cards===18&&new Set(data.cardIds).size===18,label+": 18 holiday explanations",String(data.cards));
  assert(JSON.stringify(data.holidaySections)===JSON.stringify([["weekly",1],["jewish-major",5],["other-jewish",3],["national",4],["other-traditions",5]]),label+": five editorial holiday groups",JSON.stringify(data.holidaySections));
  assert(data.tableRows===6,label+": transport, closure and demand comparison",String(data.tableRows));
  assert(data.faq===9,label+": practical FAQ",String(data.faq));
  assert(data.related===6 && data.cols===(isDesktop?3:2),label+": related guides grid",JSON.stringify({cards:data.related,columns:data.cols}));
  assert(!data.hasEventPlanner && !data.hasEventFilters,label+": event database and booking filters removed");
  assert(data.dateSources && data.railLink && !data.removedHolidayLink,label+": external holiday-date sources and no removed route links");
  assert(data.contactForm && data.contactPhoto && data.afterContact,label+": contact portrait, form and sources footer");
  assert(data.broken.length===0&&data.missingAlt.length===0,label+": no broken or inaccessible photos",JSON.stringify({broken:data.broken,missingAlt:data.missingAlt}));
  assert(data.docWidth<=data.viewport+8,label+": no unwanted horizontal overflow",JSON.stringify({doc:data.docWidth,viewport:data.viewport}));
  return data;
}
(async()=>{
  let browser;const snapshots={};
  try {
    browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
    // Hostinger can rate-limit repeated page requests from one CI IP.
    // Use one successful document load and resize the SAME page for each
    // viewport instead of issuing three full site requests.
    const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
    const exceptions=[];page.on("pageerror",e=>exceptions.push(e.message));
    try {
      const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:70000});
      assert(response?.status()===200,"published holiday guide: HTTP 200",String(response?.status()));
      if(response?.status()!==200)throw Error("The published page was not available for the responsive audit");
      await sleep(600);
      for(const [label,width,height] of [["desktop-1440",1440,900],["mobile-390",390,844],["mobile-360",360,780]]) {
        await page.setViewportSize({width,height});
        await sleep(150);
        snapshots[label]=await inspect(page,label,width>=1000);
        await page.screenshot({path:path.join(folder,label+".png"),fullPage:true,animations:"disabled"});
      }
      assert(exceptions.length===0,"single published page: no JavaScript exceptions",JSON.stringify(exceptions));
    }catch(e){assert(false,"published holiday page browser inspection completed",e.message);}
    finally{await page.close();}
  }catch(e){assert(false,"Chromium launch",e.message);}
  finally {
    if(browser)await browser.close();
    fs.writeFileSync(path.join(folder,"results.json"),JSON.stringify({url,checks,failures,snapshots},null,2));
  }
  // The deleted route is checked over SSH by the deployment's exact-path
  // removal step. An HTTP 429 from the Hostinger rate limiter is not a valid
  // observation about whether a deleted page still exists.
  if(failures.length){console.error(failures.length+" holiday guide checks failed");process.exitCode=1;}
  else console.log("All published holiday guide checks passed");
})();
