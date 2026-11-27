import { sourceFragment } from "@/test-utils/source-fragment";
import { readRouteSource } from "@/test-utils/read-route-source";
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
  expect(readRouteSource("src/routes/travel-blog.israel-tours-for-seniors.tsx")).toMatch(sourceFragment('travelGuideMeta("seniorTours")'));
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
  expect(component).toMatch(sourceFragment("<HomeContactForm"));
  expect(component).toMatch(sourceFragment("<AuthorCard/>"));
  expect(readFileSync("src/components/HomeContactForm.tsx", "utf8")).toMatch(sourceFragment("All bookings require confirmation."));
  expect(component).not.toMatch(sourceFragment("All bookings require confirmation."));
  expect(component).toMatch(sourceFragment("A private vehicle"));
  expect(component).not.toMatch(sourceFragment("personal-care attendant or medical service"));
  expect(component).toContain("step-free");
  expect(component).toContain("wheelchair");
  expect(dataSource).toMatch(sourceFragment("wheelchair-accessible vehicle"));
  expect(dataSource).toMatch(sourceFragment("For nursing, personal care, lifting or wheelchair transfers"));
  expect(component).not.toMatch(sourceFragment("does not automatically include"));
  expect(component).not.toMatch(sourceFragment("I cannot assume or guarantee"));
  expect(component).toMatch(sourceFragment("check suitable vehicle availability"));
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
  expect(component).toMatch(sourceFragment("Google Maps"));
  expect(component).toMatch(sourceFragment('data-senior-trip-enquiry={item.id}'));
  expect(component).toMatch(sourceFragment("{tripEnquiryLabels[item.id]}"));
  expect(component).toMatch(sourceFragment("Plan your Jerusalem day with me"));
  expect(component).toMatch(sourceFragment("Discuss a Masada & Dead Sea trip"));
  expect(component).toMatch(sourceFragment("Share your Galilee plans"));
  expect(component).toMatch(sourceFragment("Plan a coastal day trip"));
  expect(component).toMatch(sourceFragment("Browse other tours"));
  expect(component).toContain("data-senior-midpage-cta");
  expect(component).toMatch(sourceFragment("Plan your day with me"));
  expect(component).not.toMatch(sourceFragment("Ask Moshe about your day"));
  expect(component).not.toMatch(sourceFragment("How private day trips work"));
  expect(component).not.toMatch(sourceFragment("Ask about my private driver service"));
  expect(component).not.toMatch(sourceFragment("The private driver provides transportation and agreed stops"));
  expect(component).toMatch(sourceFragment('heading:"Need a private driver for a comfortable day trip?"'));
  expect(component).toMatch(sourceFragment("I arrange comfortable private day trips with a driver in Israel"));
  expect(component).toMatch(sourceFragment("A suggested, unhurried visit"));
  expect(component).toMatch(sourceFragment("If you prefer a shorter day:"));
  for(const trip of seniorDayTrips){
   expect(trip.sampleOrder).toHaveLength(3);
   expect(trip.restStop.length).toBeGreaterThan(40);
   expect(trip.shortenDay.length).toBeGreaterThan(40);
  }
  for(const id of ["jerusalem","masada","coast"]){
   expect(seniorDayTrips.find(trip=>trip.id===id)?.accessInfo?.length).toBe(2);
  }
  expect(component).toMatch(sourceFragment("Accessible JLM map app (<External"));
  expect(component).toMatch(sourceFragment(">Android</External>) (<External"));
  expect(component).toMatch(sourceFragment(">iPhone</External>)"));
  expect(component).toMatch(sourceFragment("<CompactResourceLinks items={item.accessInfo}"));
  expect(component).toMatch(sourceFragment("Israel Nature and Parks Authority's accessibility guide and site map"));
  expect(component).not.toContain("Island");
 });
 it("provides twelve related guides and distinct, locally stored, appropriately compressed images",()=>{
  expect(seniorSites).toHaveLength(6);
  expect(seniorPlanning).toHaveLength(6);
  expect(seniorHero.src).toBe("/images/senior-tours/israel-tours-for-seniors-1200x900.webp");
  expect(seniorHero.mobileSrc).toBe("/images/senior-tours/israel-tours-for-seniors-1200x675.webp");
  expect(existsSync("public"+seniorHero.mobileSrc)).toBe(true);
  expect(component).toMatch(sourceFragment("mobileSrc={seniorHero.mobileSrc}"));
  const photos=[seniorHero.src,...seniorDayTrips.map(x=>x.image),...seniorSites.map(x=>x.image),...seniorPlanning.map(x=>x.image)];
  expect(new Set(photos).size).toBe(photos.length);
  for(const entry of [...seniorSites,...seniorPlanning])expect(entry.to).toMatch(/^\//);
  for(const p of photos.filter(p=>p.startsWith("/images/")))expect(existsSync("public"+p),p).toBe(true);
  expect(component).toMatch(sourceFragment("loading=\"lazy\""));
  expect(component).toContain("SourcesDisclosure");
  expect(component).toContain("PageUpdated");
 });
});
