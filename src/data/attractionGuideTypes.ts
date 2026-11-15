export const attractionIds = [
"old-city-jerusalem","attractions-in-tel-aviv","dead-sea-attractions","jaffa",
"museums-in-jerusalem","sea-of-galilee","mitzpe-ramon-crater","akko-acre",
"ein-gedi","rosh-hanikra","mount-of-olives","haifa","mount-zion",
"mount-tabor","capernaum","tabgha","mount-of-beatitudes"
] as const;
export type AttractionId = typeof attractionIds[number];
export type Region = "Jerusalem" | "Tel Aviv & Jaffa" | "Dead Sea & Negev" | "Haifa & northern coast" | "Sea of Galilee" | "Lower Galilee & Jezreel Valley" | "Eilat & Red Sea";
export interface Attraction {
  title: string; description: string; region: Region; intro: string; takeaway: string; duration: string;
  highlights: {name:string; description:string; tip:string}[];
  arrival: string[]; planning: string[]; faqs: {q:string; a:string}[];
  official: {label:string;url:string}[];
  image?: {src:string;alt:string};
}
/** Regional overviews compare several destinations and stay in Travel Guides. */
export const regionalOverviewIds = ["attractions-in-tel-aviv","dead-sea-attractions","museums-in-jerusalem","sea-of-galilee","haifa"] as const satisfies readonly AttractionId[];
export const isRegionalOverview = (id: AttractionId): boolean => (regionalOverviewIds as readonly string[]).includes(id);
export const attractionPath = (id: AttractionId): `/travel-blog/${AttractionId}/` | `/attractions/${AttractionId}/` =>
  isRegionalOverview(id) ? `/travel-blog/${id}/` : `/attractions/${id}/`;
