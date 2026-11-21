/**
 * Read-only Travelpayouts-only affiliate audit for Israel Travel Hub.
 * Audits source and, with --published, the actual published anchor hrefs.
 * This intentionally checks the INITIAL link on our website, not downstream
 * redirect intermediaries (e.g. a partner network used by a travel brand).
 */
const fs = require("node:fs");
const path = require("node:path");
const DOMAIN = "https://saddlebrown-guanaco-454061.hostingersite.com";
const EXPECTED_MARKER = "622032";
const EXPECTED_PROJECT = "406243";
const BAD_NETWORK = /(?:^|\.)(?:awin1\.com|awin\.com|anrdoezrs\.net|jdoqocy\.com|tkqlhce\.com|dpbolvw\.net|linksynergy\.com|rakutenadvertising\.com|impact\.com|impactradius\.com|partnerize\.com|admitad\.com|tradetracker\.net|shareasale\.com|skimlinks\.com|viglink\.com)$/i;
const MERCHANT = /(?:^|\.)(?:viator\.com|getyourguide\.com|expedia\.com|booking\.com|agoda\.com|discovercars\.com|trip\.com|hotels\.com|airalo\.com)$/i;
const ALTERNATE_AFFILIATE_PARAMS = /(?:^|[?&])(?:aff|affid|aff_id|affiliate|affiliate_id|refid|partnerid|partner_id|clickref|tag|aid|utm_source=affiliate)=/i;
const failures = [];
const review = [];
const stats = { sourceFiles: 0, sourceTrackingUrls: 0, sourceTravelpayoutsLinks: 0, pages: 0, publishedAffiliateLinks: 0, publishedTravelpayoutsLinks: 0, pageErrors: 0 };
const allowed = (href) => {
  try {
    const u = new URL(href);
    const h = u.hostname.toLowerCase();
    return h === "tp.media" || h === "tp.st" || h === "tpwgt.com" ||
      h === "tpm.li" || h.endsWith(".tpm.li") ||
      h === "tpk.lv" || h.endsWith(".tpk.lv");
  } catch { return false; }
};
const inspectUrl = (href, location, explicitAffiliate) => {
  let u;
  try { u = new URL(href); } catch { return; }
  if (!/^https?:$/.test(u.protocol)) return;
  const host = u.hostname.toLowerCase();
  if (allowed(href)) {
    if (host === "tp.media" && u.pathname === "/r" &&
      (u.searchParams.get("marker") !== EXPECTED_MARKER || u.searchParams.get("trs") !== EXPECTED_PROJECT)) {
      failures.push({location, reason:"Travelpayouts publisher/project marker mismatch", href});
    }
    return;
  }
  if (BAD_NETWORK.test(host)) failures.push({location,reason:"Direct link to a different affiliate network",href});
  else if (explicitAffiliate) failures.push({location,reason:"Affiliate-designated link is not Travelpayouts",href});
  else if (MERCHANT.test(host) && ALTERNATE_AFFILIATE_PARAMS.test(u.search)) {
    failures.push({location,reason:"Merchant URL contains non-Travelpayouts affiliate parameters",href});
  }
};
const walk = (base) => {
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base,{withFileTypes:true}).flatMap(d=>{
    const full=path.join(base,d.name);
    if(d.isDirectory()){
      if(["node_modules","test","__tests__","dist",".git"].includes(d.name))return [];
      return walk(full);
    }
    return /\.(?:ts|tsx|js|jsx|mjs|cjs|html)$/.test(d.name)&&!/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(d.name)?[full]:[];
  });
};
function staticAudit(){
  for(const file of [...walk("src"),...walk("cms-pilot"),...walk("public")]){
    const src=fs.readFileSync(file,"utf8");
    stats.sourceFiles++;
    const re=/\b(?:trackingUrl|affiliateUrl|affiliateLink|scriptUrl)\s*:\s*["'](https?:\/\/[^"' ]+)["']/g;
    for(const m of src.matchAll(re)){
      stats.sourceTrackingUrls++;
      inspectUrl(m[1],file+": affiliate URL",true);
    }
    const allUrls=/https?:\/\/[^\s"'<>\\]+/g;
    for(const m of src.matchAll(allUrls)){
      const url=m[0].replace(/[);,]+$/,"");
      if(allowed(url))stats.sourceTravelpayoutsLinks++;
      // Check direct affiliate networks and parameter-tagged merchant URLs.
      inspectUrl(url,file+": literal URL",false);
    }
  }
  console.log("SOURCE_AUDIT",JSON.stringify(stats));
}
function xmlLocs(xml){
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(m=>m[1].trim().replace(/&amp;/g,"&"));
}
async function publishedAudit(){
  const {chromium} = require("playwright");
  const browser = await chromium.launch({headless:true,args:["--no-sandbox"]});
  const origin = new URL(DOMAIN);
  const candidate = new Set([DOMAIN+"/"]);
  const fetchedMaps = new Set();
  const sitemapQueue = [DOMAIN+"/sitemap.xml"];
  while(sitemapQueue.length && fetchedMaps.size<12){
    const sitemap=sitemapQueue.shift();
    if(fetchedMaps.has(sitemap))continue;
    fetchedMaps.add(sitemap);
    try{
      const response=await fetch(sitemap,{signal:AbortSignal.timeout(15000)});
      if(!response.ok)continue;
      for(const loc of xmlLocs(await response.text())){
        const p=new URL(loc,origin);
        if(p.pathname.endsWith(".xml"))sitemapQueue.push(origin.origin+p.pathname);
        else if(p.pathname.startsWith("/") && !/\.(?:jpg|jpeg|png|webp|pdf|svg)$/i.test(p.pathname))
          candidate.add(origin.origin+p.pathname);
      }
    }catch(e){console.warn("SITEMAP_FETCH_WARNING",sitemap,String(e).slice(0,140));}
  }
  const MAX_PAGES=400;
  const queue=[...candidate].slice(0,MAX_PAGES);
  const visited=new Set();
  const found=[];
  let cursor=0;
  async function worker(){
    const page=await browser.newPage({viewport:{width:1280,height:800}});
    try{
      while(cursor<queue.length && visited.size<MAX_PAGES){
        const url=queue[cursor++];
        if(visited.has(url))continue;
        visited.add(url);
        try{
          const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:25000});
          if(!res || res.status()>=400){stats.pageErrors++;review.push({page:url,reason:"HTTP status",status:res?.status()});continue;}
          await page.waitForTimeout(240);
          const items=await page.locator("a[href]").evaluateAll(els=>els.map(a=>({href:a.href,rel:a.getAttribute("rel")||"",text:(a.textContent||"").trim().slice(0,90)})));
          stats.pages++;
          for(const item of items){
            let dest;
            try{dest=new URL(item.href);}catch{continue;}
            if(dest.origin===origin.origin){
              if(queue.length<MAX_PAGES && !visited.has(dest.origin+dest.pathname) && !queue.includes(dest.origin+dest.pathname))
                queue.push(dest.origin+dest.pathname);
              continue;
            }
            if(!/^https?:$/.test(dest.protocol))continue;
            const sponsored=item.rel.split(/\s+/).includes("sponsored");
            const isTP=allowed(item.href);
            if(sponsored || isTP){
              stats.publishedAffiliateLinks++;
              if(isTP)stats.publishedTravelpayoutsLinks++;
              inspectUrl(item.href,url+" :: "+item.text,sponsored);
            }else{
              inspectUrl(item.href,url+" :: "+item.text,false);
              if(MERCHANT.test(dest.hostname) && /\b(?:book|reserve|buy|check (?:rooms|prices|rates)|find deals|tickets|availability|view tour)\b/i.test(item.text))
                found.push({page:url,text:item.text,href:item.href,reason:"Commercial CTA without Travelpayouts link"});
            }
          }
        }catch(e){stats.pageErrors++;review.push({page:url,reason:String(e).slice(0,170)});}
      }
    }finally{await page.close();}
  }
  await Promise.all(Array.from({length:4},()=>worker()));
  await browser.close();
  review.push(...found);
  console.log("PUBLISHED_AUDIT",JSON.stringify({sitemapCandidates:candidate.size,stats,failures:failures.slice(0,40),review:review.slice(0,70)}));
  if(stats.pages===0)failures.push({reason:"Published site could not be inspected"});
  if(candidate.size>MAX_PAGES)failures.push({reason:"Sitemap exceeds audit page limit",total:candidate.size});
}
(async()=>{
  staticAudit();
  if(process.argv.includes("--published"))await publishedAudit();
  const report={checkedAt:new Date().toISOString(),stats,failures,review};
  fs.writeFileSync("/tmp/travelpayouts-affiliate-audit.json",JSON.stringify(report,null,2));
  if(failures.length) console.log("AUDIT_FAILURE_DETAILS",JSON.stringify(failures.slice(0,50)));
  console.log("AUDIT_TOTAL",JSON.stringify({stats,failures:failures.length,review:review.length}));
  if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
