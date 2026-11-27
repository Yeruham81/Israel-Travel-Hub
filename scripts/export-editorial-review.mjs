import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { JSDOM } from "jsdom";
const root = path.resolve(process.argv[2] || ".output/public");
const out = path.resolve(process.argv[3] || "editorial-review-export");
const tracker = JSON.parse(await readFile("docs/editorial-review/tracker.json", "utf8"));
const sitemap = await readFile(path.join(root,"sitemap.xml"),"utf8");
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const expected=tracker.pages.map(p=>p.path);
if(new Set(paths).size!==paths.length || new Set(expected).size!==expected.length || paths.length!==expected.length || expected.some(p=>!paths.includes(p))) throw new Error("Sitemap/tracker mismatch");
const hash=s=>createHash("sha256").update(s).digest("hex");
const tidy=s=>s.replace(/\s+/g," ").trim();
const blocks=new Set("H1 H2 H3 H4 H5 H6 P LI DT DD TD TH TR CAPTION FIGCAPTION BLOCKQUOTE PRE DIV SECTION ARTICLE MAIN HEADER FOOTER NAV ASIDE FORM FIELDSET LEGEND LABEL BUTTON SUMMARY DETAILS SELECT OPTION ADDRESS UL OL DL TABLE THEAD TBODY TFOOT FIGURE".split(" "));
const ignored=new Set("SCRIPT STYLE TEMPLATE SVG NOSCRIPT".split(" "));
function extract(rootNode){
  const lines=[];let buffer="";
  const flush=()=>{const s=tidy(buffer);if(s)lines.push(s);buffer="";};
  function visit(node){
    if(node.nodeType===3){buffer+=node.nodeValue||"";return;}
    if(node.nodeType!==1 || ignored.has(node.tagName))return;
    if(node.tagName==="BR"){flush();return;}
    const block=blocks.has(node.tagName);
    if(block)flush();
    for(const child of node.childNodes)visit(child);
    if(block)flush();
  }
  visit(rootNode);flush();
  const attrs=[];
  for(const el of rootNode.querySelectorAll("[alt],[placeholder],[aria-label],[title]")){
    if(el.closest("script,style,template,svg"))continue;
    for(const key of ["alt","placeholder","aria-label","title"]){const value=tidy(el.getAttribute(key)||"");if(value)attrs.push(key+": "+value);}
  }
  return {lines,attrs:[...new Set(attrs)]};
}
function format(r){return r.lines.map((s,i)=>String(i+1).padStart(4,"0")+"  "+s).join("\n")+"\n\n--- Labels, placeholders, alt text and tooltips ---\n"+r.attrs.join("\n")+"\n";}
await mkdir(out,{recursive:true});
const manifest=[];let shared="";
for(const entry of tracker.pages){
  const rel=entry.path==="/"?"index.html":entry.path.slice(1)+"index.html";
  const file=path.resolve(root,rel);
  if(!file.startsWith(root+path.sep))throw new Error("Unsafe path: "+entry.path);
  const dom=new JSDOM(await readFile(file,"utf8"));
  const doc=dom.window.document;
  const main=doc.querySelector("#main");
  if(!main||!main.querySelector("h1"))throw new Error("Missing main/H1: "+entry.path);
  if(!shared){shared=[...doc.querySelectorAll("body > header, .site-sidebar, body > footer")].map(el=>format(extract(el))).join("\n--- Shared region ---\n");if(!shared.trim())throw new Error("Missing shared regions");}
  for(const el of main.querySelectorAll(".site-sidebar"))el.remove();
  const result=extract(main);
  if(!result.lines.length)throw new Error("Empty extraction: "+entry.path);
  const id=String(entry.group).padStart(2,"0")+"-"+(entry.path==="/"?"home":entry.path.replace(/^\/|\/$/g,"").replaceAll("/","--"));
  const content="# "+entry.path+"\n\n"+format(result);
  await writeFile(path.join(out,id+".txt"),content);
  manifest.push({path:entry.path,group:entry.group,file:id+".txt",title:tidy(main.querySelector("h1").textContent),blocks:result.lines.length,words:result.lines.join(" ").split(/\s+/).length,sha256:hash(content)});
  dom.window.close();
}
await writeFile(path.join(out,"shared-static.txt"),shared);
await writeFile(path.join(out,"manifest.json"),JSON.stringify({commit:process.env.GITHUB_SHA||null,scope:"Prerendered HTML; client-only states require separate review.",pages:manifest,sharedSha256:hash(shared)},null,2)+"\n");
for(const group of tracker.groups){const pages=manifest.filter(p=>p.group===group.id);console.log("GROUP "+group.id+": "+pages.length+" pages, "+pages.reduce((n,p)=>n+p.words,0)+" words");}
console.log("EXTRACTED "+manifest.length+" canonical pages");
if(process.env.EDITORIAL_LOG_GROUP){const ids=process.env.EDITORIAL_LOG_GROUP.split(',').map(Number);for(const item of manifest.filter(p=>ids.includes(p.group)))console.log("\n===== PAGE "+item.path+" | "+item.sha256+" =====\n"+await readFile(path.join(out,item.file),"utf8"));}
