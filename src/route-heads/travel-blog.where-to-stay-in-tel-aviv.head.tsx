import { cityStayGuides } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.telaviv;
export const routeHead = () =>
  hotelEditorialMeta(g, "telaviv", stayEditorialHeroPhotos.telaviv.src);
