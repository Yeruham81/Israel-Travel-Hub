const assert = require("node:assert/strict");
const {chromium}=require("playwright");
const base=process.env.COOKIE_AUDIT_URL||"http://127.0.0.1:4173";
const key="ith:cookie-consent:v1";
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [320,360,390,768,1440]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const requests=[];let fail=false;
   await context.addInitScript(k=>localStorage.setItem(k,JSON.stringify({version:2,categories:{analytics:false,external:false,marketing:false,advertising:false},expiresAt:Date.now()+86400000})),key);
   await context.route("**/*",async route=>{
    const url=new URL(route.request().url());
    if(url.origin===base||!/^https?:$/.test(url.protocol))return route.continue();
    requests.push(url.href);
    if(url.hostname==="tpwgt.com"&&url.searchParams.get("campaign_id")==="117"){
      if(fail)return route.abort();
      return route.fulfill({contentType:"application/javascript",body:`document.body.insertAdjacentHTML("beforeend", '<div id="fixture" style="padding:12px;background:#f2f6f9;font:16px system-ui"><label>Pickup <select aria-label="Pickup"><option>Tel Aviv Airport</option><option>Jerusalem</option></select></label><br><label>Pickup date <input type="date" aria-label="Pickup date"></label><br><label>Return date <input type="date" aria-label="Return date"></label><br><button type="button">Search cars</button></div>');`});
    }
    return route.fulfill({status:200,contentType:route.request().resourceType()==="document"?"text/html":"application/javascript",body:""});
   });
   const page=await context.newPage();
   await page.goto(base+"/car-rental/",{waitUntil:"networkidle"});
   const widget=page.getByTestId("discovercars-search-widget");
   assert.equal(await widget.locator("iframe[src]").count(),0);
   assert.equal(requests.filter(x=>x.includes("tpwgt.com")).length,0);
   const direct=widget.getByRole("link",{name:"Compare cars on DiscoverCars"});
   assert(await direct.isVisible());
   assert.match(await direct.getAttribute("href"),/^https:\/\/discovercars\.tpm\.li\/w2RwEsmb\?sub_id=/);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"page horizontal overflow "+width);
   await widget.getByRole("button",{name:"Cookie settings for Booking widgets"}).click();
   await page.getByRole("dialog").getByRole("checkbox").nth(2).check();
   await page.getByRole("button",{name:"Save preferences"}).click();
   const frame=widget.locator("iframe[src]");
   await frame.waitFor();
   const inside=page.frameLocator('iframe[title="DiscoverCars car rental search"][src]');
   await inside.locator("#fixture").waitFor();
   await inside.getByLabel("Pickup",{exact:true}).selectOption("Jerusalem");
   await inside.getByLabel("Pickup date").fill("2027-01-15");
   await inside.getByLabel("Return date").fill("2027-01-19");
   assert.equal(await inside.getByLabel("Pickup",{exact:true}).inputValue(),"Jerusalem");
   await page.waitForFunction(()=>document.querySelector('[data-testid="discovercars-search-widget"] [aria-busy="false"]'));
   const box=await frame.boundingBox();
   assert(box&&box.x>=0&&box.x+box.width<=width+1,"frame fits "+width);
   assert(Number(await frame.getAttribute("height"))<355,"short frame shrinks "+width);
   await page.locator("footer").getByRole("button",{name:"Cookie settings",exact:true}).click();
   await page.getByRole("button",{name:"Accept necessary",exact:true}).click();
   await frame.waitFor({state:"detached"});
   fail=true;
   await widget.getByRole("button",{name:"Cookie settings for Booking widgets"}).click();
   await page.getByRole("dialog").getByRole("checkbox").nth(2).check();
   await page.getByRole("button",{name:"Save preferences"}).click();
   await widget.getByText("Car search is temporarily unavailable.",{exact:false}).waitFor({timeout:20000});
   assert.equal(await widget.locator("iframe[src]").count(),0);
   assert(await direct.isVisible());
   console.log("RENTAL_WIDGET_FIXTURE_PASS",width);
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
