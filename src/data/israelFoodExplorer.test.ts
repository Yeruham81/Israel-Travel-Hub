import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import {
  foodDishes, foodKinds, foodStarterIdeas, foodExtras,
  foodMarkets, foodTours, foodFAQs
} from "./israelFoodExplorer";
import { travelGuides } from "./travelGuides";
import { migrationPhotos } from "./guideMigrationPhotos";
import { publicSources, affiliateConfig } from "./registry";

const route=()=>readFileSync("src/routes/travel-blog.what-to-eat-in-israel.tsx","utf8");
const ui=()=>readFileSync("src/components/IsraelFoodGuide.tsx","utf8");

describe("What to Eat in Israel — beginner visitor guide",()=>{
  it("keeps the existing food guide permalink and hero while upgrading the article",()=>{
    const guide=travelGuides.food;
    expect(guide.id).toBe("food");
    expect(guide.photo.src).toBe(migrationPhotos["what-to-eat-in-israel"].src);
    expect(guide.photo.alt).toBe(migrationPhotos["what-to-eat-in-israel"].alt);
    expect(guide.updatedAt).toBe("2026-11-21");
    expect(guide.title).toMatch(/^What to Eat in Israel/);
    expect(route()).toContain('travelGuideMeta("food")');
    expect(route()).toContain("component: IsraelFoodGuide");
    expect(route()).not.toContain('TravelGuidePage id="food"');
    expect(ui()).toContain("<GuideHeroMedia src={guide.photo.src} alt={guide.photo.alt}");
    expect(ui()).toContain("<PageUpdated date={guide.updatedAt");
  });

  it("offers all ten specific dishes with their previously owned photos",()=>{
    const expected=["shawarma","falafel","meorav-yerushalmi","hummus","shakshuka","sabich","bourekas","jachnun","malabi","knafeh"];
    expect(foodDishes.map(d=>d.id)).toEqual(expected);
    expect(new Set(expected).size).toBe(10);
    for(const [index,dish] of foodDishes.entries()){
      const id=`food-${index+1}` as keyof typeof migrationPhotos;
      expect(dish.photo.src).toBe(migrationPhotos[id].src);
      expect(dish.photo.alt).toBe(migrationPhotos[id].alt);
      expect(existsSync(`src/assets/guides/2026-10/${id}.webp`)).toBe(true);
      expect(dish.name.length).toBeGreaterThan(3);
      expect(dish.pronunciation.length).toBeGreaterThan(4);
      expect(dish.summary.length).toBeGreaterThan(50);
      expect(dish.order.length).toBeGreaterThan(35);
      expect(dish.note.length).toBeGreaterThan(30);
      expect(dish.roots.length).toBeGreaterThan(30);
    }
    expect(foodKinds.map(x=>x.id)).toEqual(["all","street","plates","bakery","sweets"]);
    expect(foodStarterIdeas).toHaveLength(4);
    expect(foodExtras).toHaveLength(6);
  });

  it("uses nuanced food history without exclusive national-origin claims",()=>{
    const foods=foodDishes.map(x=>x.roots).join(" ");
    expect(foods).toMatch(/Levant/i);
    expect(foods).toMatch(/Palestinian/i);
    expect(foods).toMatch(/North African/);
    expect(foods).toMatch(/Yemenite-Jewish/);
    expect(foodDishes.find(d=>d.id==="meorav-yerushalmi")?.note).toMatch(/offal/i);
    expect(foodDishes.find(d=>d.id==="hummus")?.note).toMatch(/sesame/i);
    expect(foodFAQs).toHaveLength(8);
    expect(foodFAQs.some(f=>/halal/i.test(f.q))).toBe(true);
    expect(foodFAQs.some(f=>/vegetarian/i.test(f.q))).toBe(true);
  });

  it("links four real market areas to related guides and map searches with available images",()=>{
    expect(foodMarkets.map(m=>m.id)).toEqual(["jerusalem","carmel","levinsky","jaffa"]);
    for(const market of foodMarkets){
      expect(existsSync("public"+market.image),market.image).toBe(true);
      expect(market.guide).toMatch(/^\/(?:travel-blog|attractions)\//);
      expect(market.map).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
      expect(market.why.length).toBeGreaterThan(55);
    }
  });

  it("uses exactly three approved Travelpayouts tour links with separate page-level attribution",()=>{
    expect(foodTours).toHaveLength(3);
    expect(new Set(foodTours.map(x=>x.subId)).size).toBe(3);
    for(const tour of foodTours){
      expect(affiliateConfig[tour.id]?.trackingUrl,tour.id).toMatch(/^https:\/\/viator\.tpm\.li\//);
      expect(tour.subId).toMatch(/^what_to_eat_israel_/);
      expect(tour.image).toBeTruthy();
      if(tour.key==="mahane-yehuda") expect(existsSync("src/assets/jerusalem/mahane-yehuda.webp")).toBe(true);
      else expect(existsSync("public"+tour.image),tour.image).toBe(true);
      expect(tour.detail).toContain("Approximately");
    }
    const content=ui();
    expect(content).toContain('url.searchParams.set("sub_id",tour.subId)');
    expect(content).toContain("<CuratedPartnerTourCard");
    expect(content).toContain('pageId="what_to_eat_in_israel"');
    expect(content).not.toContain('starting price');
    expect(content).toContain('data-testid="israel-food-tour-cards"');
    const marketImage=foodTours.find(t=>t.key==="mahane-yehuda")?.image;
    expect(marketImage).toBeTruthy();
    expect(readFileSync("src/data/israelFoodExplorer.ts","utf8")).toContain("image:mahaneYehudaStreetPhoto");
    expect(foodMarkets.find(m=>m.id==="jerusalem")?.image).toBe("/images/food-guide/mahane-yehuda-food-stalls.webp");
    expect(foodTours.find(t=>t.key==="levinsky")?.image).toBe("/images/food-guide/levinsky-spice-shop.webp");
    expect(content).toContain("commons.wikimedia.org/wiki/File:PikiWiki_Israel_9177_Levinsky_market_in_Tel_Aviv.JPG");
    expect(content).toContain("CC BY 2.5");
    expect(content).toContain("commons.wikimedia.org/wiki/File:Mahane_Yehuda_shoppers.jpg");
    expect(content).toContain("CC BY-SA 3.0");
  });

  it("keeps compact filtering, guide sets, contact and consolidated footer photo credits",()=>{
    const content=ui();
    expect(content).toContain('aria-pressed={filter===kind.id}');
    expect(content).toContain('aria-label="Jump to a food dish"');
    expect(content).toContain('onClick={event=>onPickFood(event,dish.id)}');
    expect(content).toContain('setFoodFilter("all")');
    expect(content).toContain('setPendingDish(dishId)');
    expect(content).toContain('target.scrollIntoView?.');
    expect(content).not.toContain('About this food tradition');
    expect(content).toContain('{dish.summary} {dish.roots}');
    expect(content).toContain('data-testid="israel-food-dish-grid"');
    expect(content).toContain("visible.length");
    expect(content).toContain("grid grid-cols-2 gap-4 lg:grid-cols-3");
    expect(content).toContain('guideHeroPhotoForPath(String(item.to))');
    expect((content.match(/<RelatedCard key=\{item\.to\}/g)||[]).length).toBe(2);
    expect(content).toContain('id="food-words"');
    expect(content).toContain('id="markets"');
    expect(content).toContain('id="practical"');
    expect(content).toContain("<FaqList faqs={foodFAQs}/>");
    expect(content).toContain("<HomeContactForm");
    expect(content.indexOf("<SourcesDisclosure>")).toBeGreaterThan(content.indexOf("<HomeContactForm"));
    expect(content).toContain("<PhotoCreditsDisclosure entries={[");
    expect(content).not.toContain('["sources"');
    expect(content).toContain('["contact","Contact me"]');
  });

  it("all four declared SEO citations resolve in the main registry",()=>{
    const ids=travelGuides.food.sourceIds;
    const sources=publicSources(ids);
    expect(ids).toHaveLength(4);
    expect(sources).toHaveLength(ids.length);
    expect(sources.map(s=>s.id)).toEqual(ids);
    expect(sources.some(s=>s.url==="https://visit.tel-aviv.gov.il/info/money")).toBe(true);
    expect(sources.some(s=>s.url.includes("itraveljerusalem.com/article/markets-and-fairs"))).toBe(true);
  });
});
