import telAvivTourHero from "@/assets/home/hero-tel-aviv-large.webp";
import deadSeaHero from "@/assets/dead-sea/landscape.webp";

import { guideDirectory } from "@/data/travelGuides";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath } from "@/data/attractionGuideTypes";
import { oldCityJerusalemSite } from "@/data/oldCityJerusalemSite";
import { jaffaSite } from "@/data/jaffaSite";
import { yardenitSite } from "@/data/yardenitSite";
import { qasrElYahudSite } from "@/data/qasrElYahudSite";
import { magdalaSite } from "@/data/magdalaSite";
import { masadaSite } from "@/data/masadaSite";
import { caesareaSite } from "@/data/caesareaSite";
import { eilatSite } from "@/data/eilatSite";
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
  if (path === "/tours/tel-aviv-jaffa/") return { src: telAvivTourHero, alt: "Panoramic view of Tel Aviv's Mediterranean coast and skyline" };
  if (path === "/attractions/jaffa/") return jaffaSite.hero;
  if (path === "/attractions/yardenit/") return yardenitSite.hero;
  if (path === "/attractions/qasr-el-yahud/") return qasrElYahudSite.hero;
  if (path === "/attractions/magdala/") return magdalaSite.hero;
  if (path === "/attractions/masada/") return masadaSite.hero;
  if (path === "/attractions/caesarea/") return caesareaSite.hero;
  if (path === "/attractions/eilat/") return eilatSite.hero;
  if (path === "/attractions/dead-sea/") return { src: deadSeaHero, alt: "Dead Sea shoreline and desert scenery" };
  if (path === "/attractions/sea-of-galilee/") return { src: "/images/attractions/sea-of-galilee.webp", alt: "Sea of Galilee and surrounding hills" };
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
