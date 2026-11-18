import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as HubRoute } from "@/routes/accommodation.index";
import { accommodationDestinations, hotelCategoryGuides, neighborhoodGuidesForCity } from "@/data/content";
import { hotelStyles } from "@/data/hotelHub";
import { CANONICAL_ORIGIN } from "@/lib/site";

vi.mock("@tanstack/react-router", async () => {
 const actual=await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
 return { ...actual, Link: ({to,hash,children,...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {to:string;hash?:string;children?:ReactNode}) =>
   <a href={hash ? to+"#"+hash : to} {...props}>{children}</a> };
});
afterEach(cleanup);
const page=() => render((() => { const Page=HubRoute.options.component!; return <Page/>; })());

describe("Accommodation booking hub",()=>{
 it("has one H1, five city hotel cards and independent area-guide links",()=>{
  const {container}=page();
  expect(screen.getAllByRole("heading",{level:1})).toHaveLength(1);
  expect(screen.getByRole("heading",{name:"Hotels in Israel"})).toBeInTheDocument();
  const cards=container.querySelectorAll('[data-testid="accommodation-destination-card"]');
  expect(cards).toHaveLength(5);
  expect(accommodationDestinations).toHaveLength(6);
  const urls=[...cards].map(card=>card.getAttribute("href"));
  expect(urls).toEqual(["/accommodation/jerusalem/","/accommodation/tel-aviv/","/accommodation/haifa/","/accommodation/tiberias/","/accommodation/dead-sea/"]);
  expect(container.querySelectorAll('a[href^="/travel-blog/where-to-stay"], a[href^="/travel-blog/best-hotels"], a[href^="/travel-blog/best-dead-sea"]')).toHaveLength(5);
 });
 it("shows hotel styles that lead to the actual area or category catalogues",()=>{
  page();
  expect(hotelStyles).toHaveLength(6);
  for(const style of hotelStyles){
   expect(screen.getByRole("heading",{name:style.title})).toBeInTheDocument();
   expect(style.link?.to).toMatch(/^\/accommodation\//);
  }
  expect(neighborhoodGuidesForCity("jerusalem")).toHaveLength(6);
  expect(neighborhoodGuidesForCity("telaviv")).toHaveLength(8);
  expect(hotelCategoryGuides).toHaveLength(6);
 });
 it("keeps a canonical Accommodation hub and no live room price claims", async()=>{
  page();
  expect(screen.getByText(/I do not display unverified live room rates/i)).toBeInTheDocument();
  const meta=await HubRoute.options.head?.({} as never);
  expect(meta).toMatchObject({links:[{rel:"canonical",href:CANONICAL_ORIGIN+"/accommodation/"}]});
 });
});
