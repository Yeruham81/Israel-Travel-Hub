import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { test } from "node:test";
import prettier from "prettier";
import { registry, setTracking } from "./registry-source.mjs";

const fixture = `
const shoreTourProducts = [
 {id:'shore-gyg-haifa-akko',partnerId: 'getyourguide',publicUrl:
 'https://www.getyourguide.com/item', nested:{id:'unrelated'}}
];
const tourBookingOffers = ([['p','viator','https://www.viator.com/product']] as const).map(x=>x);
const sourceCatalog=[{id:'kiwitaxi-airport',url:'https://kiwitaxi.com/airport'}];
const affiliateConfig = {
 // Keep this comment
 'shore-gyg-haifa-akko': undefined,
 'existing': {trackingUrl:
 'https://viator.tpm.li/Existing'},
};
`;
const url = "https://getyourguide.tpm.li/Example";
test("read and write registry irrespective of layout and quote style", async () => {
 for (const source of [fixture,await prettier.format(fixture,{parser:"typescript",printWidth:40}),await prettier.format(fixture,{parser:"typescript",printWidth:120,singleQuote:true})]) {
  const view=registry(source);
  assert.deepEqual(view.shore("shore-gyg-haifa-akko"),{platform:"getyourguide",url:"https://www.getyourguide.com/item"});
  assert.equal(view.airport("kiwitaxi","https://kiwitaxi.com/airport"),true);
  assert.equal(view.airport("welcome","https://kiwitaxi.com/airport"),false);
  assert.equal(view.tour("p","viator","https://www.viator.com/product"),true);
  assert.equal(view.tour("p","viator","https://www.viator.com/other"),false);
  const updated=setTracking(source,"shore-gyg-haifa-akko",url);
  assert.equal(registry(updated).tracking("shore-gyg-haifa-akko").url,url);
  assert.equal(registry(updated).tracking("existing").url,"https://viator.tpm.li/Existing");
  assert.ok(updated.includes("// Keep this comment"));
  assert.equal(setTracking(updated,"shore-gyg-haifa-akko",url),updated);
  assert.throws(()=>setTracking(updated,"existing",url),/Refusing to overwrite/);
  assert.throws(()=>setTracking(updated,"unknown",url),/Missing tracking/);
  const inserted=setTracking(updated,"new",url,{allowInsert:true});
  assert.equal(registry(inserted).tracking("new").url,url);
  assert.throws(()=>registry(source.replace("undefined,", "undefined, 'shore-gyg-haifa-akko': undefined,")),/duplicate/);
 }
});
test("read actual registry without executing it", async () => {
 const source=await readFile("src/data/registry.ts","utf8");
 const view=registry(source);
 assert.equal(view.shore("shore-gyg-haifa-akko").platform,"getyourguide");
 assert.equal(view.tracking("shore-gyg-haifa-akko").state,"configured");
 assert.equal(view.airport("kiwitaxi","https://kiwitaxi.com/en/israel/ben-gurion-airport"),true);
 assert.equal(view.tour("jerusalem-old-city-walk","viator","https://www.viator.com/tours/Jerusalem/Old-Jerusalem-Holy-City-Tour/d921-6540P86"),true);
});

test("recognize only the audited default spread and preserve object precedence", async () => {
 const spread = "...Object.fromEntries(tourBookingOffers.map((offer) => [offer.id, undefined])),";
 const key = "tour-p-viator";
 const base = fixture.replace("const affiliateConfig = {", "const affiliateConfig = {\n" + spread);
 for (const source of [base, await prettier.format(base,{parser:"typescript",printWidth:40,singleQuote:true})]) {
   assert.deepEqual(registry(source).tracking(key),{state:"pending"});
   assert.equal(registry(source).tracking("missing").state,"missing");
   const updated=setTracking(source,key,url);
   assert.equal(registry(updated).tracking(key).url,url);
   assert.equal(registry(updated).tracking("existing").url,"https://viator.tpm.li/Existing");
   assert.equal(setTracking(updated,key,url),updated);
   assert.throws(()=>setTracking(updated,key,"https://viator.tpm.li/Other"),/Refusing to overwrite/);
 }
 const explicit = JSON.stringify(key) + ': {trackingUrl:"https://viator.tpm.li/Existing"},';
 const after = base.replace(spread,spread+"\n"+explicit);
 assert.equal(registry(after).tracking(key).url,"https://viator.tpm.li/Existing");
 const before = base.replace(spread,explicit+"\n"+spread);
 assert.equal(registry(before).tracking(key).state,"pending");
 assert.throws(()=>setTracking(before,key,url),/shadowed by defaults/);
 assert.throws(()=>registry(base.replace(spread,spread+"\n"+spread)),/Duplicate affiliate default spread/);
 assert.throws(()=>registry(base.replace(spread,"...unknown,")),/Unsupported affiliate spread/);
 assert.throws(()=>registry(base.replace("[offer.id, undefined]","[offer.id, 'unexpected']")),/Unsupported affiliate spread value/);
 assert.throws(()=>registry(base.replace("[offer.id, undefined]","[offer.other, undefined]")),/Unsupported affiliate spread value/);
});

test("airport lookup ignores unrelated computed and shorthand IDs but rejects ambiguous references", () => {
 const source=fixture.replace("const sourceCatalog=", "const unrelated=(id)=>({id,url:'https://wrong.example/'});\nconst sourceCatalog=")
   .replace("const sourceCatalog=[", "const sourceCatalog=[...[],{id: 'other', url:'https://other.example/'},");
 assert.equal(registry(source).airport("kiwitaxi","https://kiwitaxi.com/airport"),true);
 const duplicate=source.replace("const sourceCatalog=[","const sourceCatalog=[{id:'kiwitaxi-airport',url:'https://wrong.example/'},");
 assert.equal(registry(duplicate).airport("kiwitaxi","https://kiwitaxi.com/airport"),false);
 const decoy=source.replace("id:'kiwitaxi-airport'","id:'other-airport'");
 assert.equal(registry(decoy).airport("kiwitaxi","https://kiwitaxi.com/airport"),false);
});
