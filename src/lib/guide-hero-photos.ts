import telAvivTourHero from "@/assets/tel-aviv/rothschild.webp";
import { guideDirectory } from "@/data/travelGuides";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import { jaffaSite } from "@/data/jaffaSite";
import jerusalemMuseumsHero from "@/assets/guides/museums-in-jerusalem.jpg";
import telAvivAttractionsHero from "@/assets/home/tel-aviv-coast.webp";

export type GuideHeroPhoto = { src: string; alt: string };
const normalized = (value: string) => value.replace(/\/+$/, "") + "/";

/**
 * The primary image of the linked destination is authoritative on every guide card.
 * Do not select a section image or alternate crop at rendering time.
 * Resolve collisions by giving the destination page its own distinct hero.
 */
export function guideHeroPhotoForPath(to: string): GuideHeroPhoto | undefined {
  const path = normalized(to);
  if (path === "/attractions/old-city-jerusalem/") return oldCityJerusalemSite.hero;
  if (path === "/tours/tel-aviv-jaffa/") return { src: telAvivTourHero, alt: "Rothschild Boulevard in central Tel Aviv with historic city architecture" };
  if (path === "/attractions/jaffa/") return jaffaSite.hero;
  if (path === "/travel-blog/museums-in-jerusalem/") return {
    src: jerusalemMuseumsHero, alt: "Rockefeller Archaeological Museum courtyard in Jerusalem",
  };
  if (path === "/travel-blog/attractions-in-tel-aviv/") return {
    src: telAvivAttractionsHero, alt: "Tel Aviv skyline and Mediterranean beachfront",
  };
  const guide = guideDirectory.find(entry => normalized(String(entry.to)) === path);
  if (guide?.photo) return guide.photo;
  const attractionId = attractionIds.find(id => normalized(attractionPath(id)) === path);
  return attractionId ? attractionGuides[attractionId].image : undefined;
}
