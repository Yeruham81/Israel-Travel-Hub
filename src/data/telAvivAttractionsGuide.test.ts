import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
 telAvivExperiences, telAvivMapPoints, telAvivRoutes, telAvivFaqs,
 telAvivEditorialOverview
} from "@/data/telAvivAttractionsGuide";
import { attractionGuides } from "@/data/attractionGuides";
import { affiliateConfig } from "@/data/registry";

describe("Upgraded Tel Aviv attractions editorial guide",()=>{
 it("contains ten distinct city experiences with practical content and meaningful Google Maps destinations",()=>{
   expect(telAvivExperiences).toHaveLength(10);
   expect(new Set(telAvivExperiences.map(x=>x.id)).size).toBe(10);
   expect(telAvivFaqs).toHaveLength(6);
   for(const x of telAvivExperiences){
     expect(x.description.length).toBeGreaterThan(100);
     expect(x.practical.length).toBeGreaterThan(80);
     expect(x.transport.length).toBeGreaterThan(45);
     expect(x.mapLinks.length).toBeGreaterThan(0);
     expect(x.mapLinks.every(p=>p.query.endsWith("Israel"))).toBe(true);
     expect(x.entry.length).toBeGreaterThan(20);
     if(x.guide)expect(x.guide.to).toMatch(/^\//);
     if(x.official)expect(x.official.url).toMatch(/^https:\/\//);
   }
   expect(telAvivExperiences.find(x=>x.id==="beaches")?.practical).toContain("lifeguards");
   expect(telAvivExperiences.find(x=>x.id==="old-jaffa")?.practical).toContain("steps");
   expect(telAvivExperiences.find(x=>x.id==="white-city")?.practical).toContain("UNESCO");
   expect(telAvivExperiences.find(x=>x.id==="carmel-market")?.practical).toContain("Shabbat");
 });

 it("reuses a shared metadata source rather than a stale five-highlight overview",()=>{
   expect(attractionGuides["attractions-in-tel-aviv"]).toEqual(telAvivEditorialOverview);
   expect(telAvivEditorialOverview.highlights).toHaveLength(10);
   expect(telAvivEditorialOverview.official.length).toBeGreaterThan(2);
   const route=readFileSync(resolve(process.cwd(),"src/routes/travel-blog.attractions-in-tel-aviv.tsx"),"utf8");
   expect(route).toContain("component: TelAvivAttractionsGuide");
 });

 it("uses ten different local photos, including four verified Google Drive images",()=>{
   expect(new Set(telAvivExperiences.map(x=>x.image.src)).size).toBe(10);
   const slugs=["carmel-market","tel-aviv-museum-of-art","sarona-market","tel-aviv-port"];
   for(const slug of slugs) {
     const expected="/images/tel-aviv-attractions/"+slug+".webp";
     expect(existsSync(resolve(process.cwd(),"public"+expected))).toBe(true);
     expect(telAvivExperiences.some(x=>x.image.src===expected)).toBe(true);
   }
 });

 it("provides ten map points, three realistic city routes and an interactive region map",()=>{
   expect(telAvivMapPoints).toHaveLength(10);
   expect(new Set(telAvivMapPoints.map(x=>x.id)).size).toBe(10);
   expect(telAvivMapPoints.every(x=>x.lat>=32.04 && x.lat<=32.12 && x.lon>=34.74 && x.lon<=34.81)).toBe(true);
   expect(telAvivRoutes).toHaveLength(3);
   for(const x of telAvivRoutes){
     expect(x.ids.length).toBeGreaterThan(2);
     expect(x.allow.length).toBeGreaterThan(20);
     for(const id of x.ids)expect(telAvivExperiences.some(e=>e.id===id)).toBe(true);
   }
   const html=readFileSync(resolve(process.cwd(),"public/maps/tel-aviv-attractions.html"),"utf8");
   expect(html).toContain("places.length !== 10");
   expect(html).toContain("tel-aviv-attractions-map-focus");
   expect(html).toContain("tel-aviv-attractions-map-selected");
   expect(html).toContain("place-labels");
 });

 it("embeds only existing exact Travelpayouts product links and retains tour category links",()=>{
   const ids=[
    "tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",
    "tour-old-jaffa-walk-viator@tours-tel-aviv-jaffa",
    "tour-carmel-market-food-tour-viator@tours-tel-aviv-jaffa",
    "tour-tel-aviv-street-art-viator@tours-tel-aviv-jaffa"
   ];
   for(const id of ids)expect(affiliateConfig[id]?.trackingUrl).toMatch(/^https:\/\/(?:getyourguide|viator)\.tpm\.li\//);
   const page=readFileSync(resolve(process.cwd(),"src/components/TelAvivAttractionsGuide.tsx"),"utf8");
   for(const id of ids)expect(page).toContain(id);
   expect(page).toContain("tel_aviv_attractions_");
   expect(page).toContain("relFor(true)");
   expect(page).toContain('data-testid="tel-aviv-curated-tour"');
   expect(page).toContain('to="/tours/tel-aviv-jaffa/"');
   expect(page).toContain('to="/tours/food-market-tours/"');
 });

 it("follows the content-first mobile pattern and connects key local guides",()=>{
   const page=readFileSync(resolve(process.cwd(),"src/components/TelAvivAttractionsGuide.tsx"),"utf8");
   expect(page).toContain("grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5");
   expect(page).toContain("Show the comparison of all ten experiences");
   expect(page.indexOf('<section id="explore"')).toBeLessThan(page.indexOf('<section id="map"'));
   expect(page).toContain("HomeContactForm");
   expect(page.indexOf("<HomeContactForm")).toBeLessThan(page.indexOf("<SourcesDisclosure>"));
   expect(page).toContain("related.map");
   expect(page).toContain("planning.map");
   expect(page).toContain("Where to Stay in Israel");
   expect(page).toContain('/travel-blog/beaches-in-tel-aviv/');
   expect(page).toContain('/travel-blog/museums-in-tel-aviv/');
   expect(page).toContain('/travel-blog/getting-around-tel-aviv/');
 });
});
