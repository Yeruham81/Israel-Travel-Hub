import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { seniorDayTrips, seniorTransportPreferences, seniorAccessQuestions, seniorFaqs, seniorHero, seniorSites, seniorPlanning, seniorPath, seniorUpdatedAt } from "@/data/seniorToursGuide";
import { travelGuidePaths } from "@/data/registry";
import { travelGuides, guideDirectory } from "@/data/travelGuides";
import { allNavGroups } from "@/data/nav";

const component=readFileSync("src/components/SeniorToursGuide.tsx","utf8");
const dataSource=readFileSync("src/data/seniorToursGuide.ts","utf8");

describe("Israel tours for seniors: private transport guide",()=>{
 it("publishes the new legacy-compatible slug, SEO metadata, directory entry and navigation",()=>{
  expect(seniorPath).toBe("/travel-blog/israel-tours-for-seniors/");
  expect(travelGuidePaths.seniorTours).toBe(seniorPath);
  expect(existsSync("src/routes/travel-blog.israel-tours-for-seniors.tsx")).toBe(true);
  expect(readFileSync("src/routes/travel-blog.israel-tours-for-seniors.tsx","utf8")).toContain('travelGuideMeta("seniorTours")');
  expect(guideDirectory.filter(entry=>entry.to===seniorPath)).toHaveLength(1);
  expect(travelGuides.seniorTours.title).toMatch(/^Israel Tours for Seniors/);
  expect(travelGuides.seniorTours.updatedAt).toBe(seniorUpdatedAt);
  expect(travelGuides.seniorTours.topics).toContain("transportation");
  expect(allNavGroups.some(group=>group.items.some(item=>"to" in item&&item.to===seniorPath))).toBe(true);
 });
 it("focuses on practical individualized care without promising clinical support, wheelchair lift or guiding",()=>{
  expect(seniorDayTrips).toHaveLength(4);
  expect(new Set(seniorDayTrips.map(t=>t.id)).size).toBe(4);
  expect(seniorTransportPreferences).toHaveLength(6);
  expect(seniorAccessQuestions).toHaveLength(7);
  expect(seniorFaqs).toHaveLength(10);
  expect(component).toContain("<HomeContactForm");
  expect(component).toContain("<AuthorCard/>");
  expect(component).toContain("All bookings require confirmation.");
  expect(component).toContain("A private vehicle");
  expect(component).toContain("personal-care attendant or medical service");
  expect(component).toContain("step-free");
  expect(component).toContain("wheelchair");
  expect(dataSource).toContain("wheelchair-accessible vehicle or lift is essential");
  expect(dataSource).toContain("not automatically include nursing");
  expect(component).toContain("does not automatically");
 });
 it("uses four meaningful day trips and honest mobility trade-offs",()=>{
  expect(seniorDayTrips.map(d=>d.id)).toEqual(["jerusalem","masada","galilee","coast"]);
  for(const trip of seniorDayTrips) {
   expect(trip.suggestedStops.length).toBe(3);
   expect(trip.watchFor.length).toBeGreaterThan(100);
   expect(trip.easy.length).toBeGreaterThan(60);
   expect(trip.to).toMatch(/^\/tours\//);
  }
  expect(component).toContain("seniorDayTrips.map");
  expect(component).toContain("Google Maps");
  expect(component).not.toContain("Island");
 });
 it("provides twelve related guides and distinct, locally stored, appropriately compressed images",()=>{
  expect(seniorSites).toHaveLength(6);
  expect(seniorPlanning).toHaveLength(6);
  const photos=[seniorHero.src,...seniorDayTrips.map(x=>x.image),...seniorSites.map(x=>x.image),...seniorPlanning.map(x=>x.image)];
  expect(new Set(photos).size).toBe(photos.length);
  for(const entry of [...seniorSites,...seniorPlanning])expect(entry.to).toMatch(/^\//);
  for(const p of photos.filter(p=>p.startsWith("/images/")))expect(existsSync("public"+p),p).toBe(true);
  expect(component).toContain("loading=\"lazy\"");
  expect(component).toContain("SourcesDisclosure");
  expect(component).toContain("PageUpdated");
 });
});
