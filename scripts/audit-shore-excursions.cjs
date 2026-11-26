const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const base=process.env.SHORE_AUDIT_URL||"http://127.0.0.1:4173";
const key="ith:cookie-consent:v1";
const output="shore-browser-evidence";
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--enable-webgl","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
 const failures=[];
 try{
 for(const width of [320,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900}});
  const external=[];
  await context.route("**/*",async route=>{
   const url=new URL(route.request().url());
   if(url.origin!==base&&/^https?:$/.test(url.protocol)){
    external.push(url.href);
    if(/tpwgt\.com|google-analytics|googletagmanager|doubleclick|googlesyndication/.test(url.hostname))return route.abort();
   }
   return route.continue();
  });
  const page=await context.newPage();
  page.on("pageerror",error=>console.log("PAGE_ERROR",width,error.message));
  await page.goto(base+"/shore-excursions/",{waitUntil:"domcontentloaded"});
  await page.getByRole("button",{name:"Accept necessary",exact:true}).click();
  await page.locator('[aria-label="Cruise port excursion guides"]').waitFor();
  const hub=page.locator('[aria-label="Cruise port excursion guides"]');
  assert.equal(await hub.locator("li").count(),2);
  const cards=await hub.locator("li").evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y,width:n.getBoundingClientRect().width})));
  assert(Math.abs(cards[0].y-cards[1].y)<2,"port cards same row at "+width);
  assert.equal(await page.locator("[data-experience]").count(),6);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"hub horizontal overflow "+width);
  for(const [port,count] of [["haifa",7],["ashdod",8]]){
   try{
    await page.goto(base+"/shore-excursions/"+port+"/",{waitUntil:"domcontentloaded"});
    const map=page.locator("#shore-map");
    await map.scrollIntoViewIfNeeded();
    assert.equal(await map.locator("iframe[src]").count(),0,"map must stay blocked without consent");
    assert.equal(await map.locator("ol li").count(),count);
    const table=page.locator("#shore-planning table");
    assert.equal(await table.locator("tbody tr").count(),6);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"page overflow "+port+" "+width);
    const form=page.locator("#request-quote");
    await form.scrollIntoViewIfNeeded();
    const fields=form.getByTestId("quote-fields-schedule");
    const fieldBoxes=await fields.locator("label").evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,right:r.right}}));
    assert.equal(fieldBoxes.length,4);
    assert(Math.abs(fieldBoxes[0].y-fieldBoxes[1].y)<3,"schedule pairs "+port+" "+width);
    assert(fieldBoxes.every(r=>r.x>=0&&r.right<=width+1),"schedule fields fit "+port+" "+width);
    const reviews=form.getByTestId("contact-reviews-row");
    assert(await reviews.isVisible(),"reviews row");
    const quote=page.locator("#my-private-days").getByRole("link",{name:/Request a quote:/}).first();
    await quote.click();
    assert(await form.locator('select[name="itinerary"]').inputValue(),"quote preselection");
    await form.screenshot({path:output+"/"+port+"-form-"+width+".png"});
    await map.getByRole("button",{name:"Cookie settings for External content"}).click();
    await page.getByRole("dialog").getByRole("checkbox").nth(1).check();
    await page.getByRole("button",{name:"Save preferences"}).click();
    const frame=map.locator("iframe[src]");
    await frame.waitFor();
    await frame.scrollIntoViewIfNeeded();
    const inside=page.frameLocator("#shore-map iframe[src]");
    await inside.locator(".shore-pin").first().waitFor({timeout:45000});
    assert.equal(await inside.locator(".shore-pin").count(),count,"all map pins rendered");
    const fit=await inside.locator(".shore-pin").evaluateAll(nodes=>nodes.every(n=>{const r=n.getBoundingClientRect();return r.left>=-1&&r.top>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1}));
    assert(fit,"all pins in view "+port+" "+width);
    await inside.locator(".shore-pin").first().click();
    await inside.locator(".maplibregl-popup-content").waitFor();
    await map.screenshot({path:output+"/"+port+"-map-"+width+".png"});
    await page.locator("footer").getByRole("button",{name:"Cookie settings",exact:true}).click();
    await page.getByRole("button",{name:"Accept necessary",exact:true}).click();
    await frame.waitFor({state:"detached"});
    console.log("SHORE_BROWSER_PASS",port,width,count);
   }catch(error){
    failures.push(port+" "+width+": "+error.message);
    console.error("SHORE_BROWSER_FAIL",port,width,error.message,external.slice(-10));
    await page.screenshot({path:output+"/"+port+"-failure-"+width+".png",fullPage:true}).catch(()=>{});
    await page.evaluate(k=>localStorage.removeItem(k),key);
    await page.reload({waitUntil:"domcontentloaded"});
    const necessary=page.getByRole("button",{name:"Accept necessary",exact:true});
    if(await necessary.isVisible())await necessary.click();
   }
  }
  await context.close();
 }
 }finally{await browser.close();}
 assert.deepEqual(failures,[]);
})().catch(error=>{console.error(error);process.exit(1);});
