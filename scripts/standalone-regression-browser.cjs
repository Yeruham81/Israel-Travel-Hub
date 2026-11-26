const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = "http://127.0.0.1:4180";
(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844}});
  let requests=[], errors=[], failedAssets=[], submissions=0;
  await context.route("**/*",async route=>{
    const req=route.request(), u=new URL(req.url());
    if(u.origin===base && u.pathname==="/api/quote-request/"){
      assert.equal(req.method(),"POST"); const p=req.postDataJSON();
      assert.equal(p.request.kind,"contact"); assert.equal(p.request.fields.email,"audit@example.invalid");
      submissions++;
      return route.fulfill({json:{accepted:true,requestId:p.requestId}});
    }
    if(u.origin===base)return route.continue();
    if(/^https?:$/.test(u.protocol)){requests.push(u.href);return route.fulfill({status:200,contentType:req.resourceType()==="document"?"text/html":"application/javascript",body:""});}
    return route.continue();
  });
  const page=await context.newPage();
  page.on("pageerror",e=>errors.push(e.message));
  page.on("response",r=>{if(r.url().startsWith(base)&&r.status()>=400&&!r.url().includes("/api/"))failedAssets.push(r.url()+" "+r.status());});
  await page.goto(base+"/",{waitUntil:"networkidle"});
  await page.getByRole("button",{name:"Accept necessary",exact:true}).click();
  const f=page.locator("#contact form");
  for(const [n,v] of Object.entries({name:"Regression Audit",email:"audit@example.invalid",subject:"Local audit",message:"This is an isolated test, not a real booking."}))await f.locator('[name="'+n+'"]').fill(v);
  await f.locator('[name="consent"]').check();
  await f.getByRole("button",{name:"Send message",exact:true}).click();
  await page.waitForFunction(()=>document.querySelector("#contact form")?.textContent?.match(/message sent|message.*received|thank you|sent successfully/i));
  assert.equal(submissions,1);
  assert.equal(requests.length,0,"No external requests before optional consent");
  for(const path of ["/airport-transfers/","/private-driver-in-israel/","/shore-excursions/haifa/","/tours/","/accommodation/","/attractions/mount-of-olives/","/travel-blog/israel-itinerary-7-days/","/car-rental/"]){
    await page.goto(base+path,{waitUntil:"networkidle"});
    assert.equal(await page.locator("main h1").count(),1,path);
    assert(await page.locator("main h1").isVisible(),path);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),"Mobile overflow "+path);
    console.log("BROWSER PAGE PASS",path);
  }
  assert.deepEqual(failedAssets,[]);
  assert.deepEqual(errors,[]);
  console.log("PASS: static browser hydration, mobile pages and mocked enquiry submission; no live email");
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
