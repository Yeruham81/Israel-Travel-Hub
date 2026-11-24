import { expect, it } from "vitest";
import { guideDirectory as original, travelGuides, filterGuides as originalFilter } from "@/data/travelGuides";
import { attractionGuides } from "@/data/attractionGuides";
import { guideDirectory, travelGuidePhotos, attractionGuidePhotos, travelGuideCardPhotos, filterGuides } from "@/data/generated/guide-directory";
it("retains exact editorial directory, ordering, original hero images and filter behavior",()=>{
  expect(guideDirectory).toEqual(original);
  expect(travelGuidePhotos).toEqual(Object.fromEntries(Object.entries(travelGuides).map(([id,g])=>[id,g.photo])));
  expect(attractionGuidePhotos).toEqual(Object.fromEntries(Object.entries(attractionGuides).map(([id,g])=>[id,g.image??null])));
  for(const q of ["","Jerusalem","airport","hotel","Shabbat","Galilee","unknown"])for(const topic of [undefined,"transportation","accommodation","itineraries","unknown"])expect(filterGuides(q,topic)).toEqual(originalFilter(q,topic));
});

it("preserves all original card-photo fallbacks",()=>{expect(travelGuideCardPhotos).toEqual(Object.fromEntries(Object.entries(travelGuides).map(([id,g])=>[id,g.cardPhoto??g.photo])));});
