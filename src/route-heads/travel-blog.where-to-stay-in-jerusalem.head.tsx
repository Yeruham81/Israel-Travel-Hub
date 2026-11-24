import { cityStayGuides } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.jerusalem;
export const routeHead = () => hotelEditorialMeta(g, "jerusalem", stayEditorialHeroPhotos.jerusalem.src);