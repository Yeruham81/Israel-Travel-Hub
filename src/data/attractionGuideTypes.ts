export const attractionIds = [
"old-city-jerusalem","attractions-in-tel-aviv","dead-sea-attractions","jaffa",
"museums-in-jerusalem","sea-of-galilee","mitzpe-ramon-crater","akko-acre",
"ein-gedi","rosh-hanikra","mount-of-olives","haifa","mount-zion",
"mount-tabor","capernaum","tabgha","mount-of-beatitudes"
] as const;
export type AttractionId = typeof attractionIds[number];
export type Region = "Jerusalem" | "Tel Aviv & Jaffa" | "Dead Sea & Negev" | "Haifa & northern coast" | "Sea of Galilee";
export interface Attraction {
  title: string; description: string; region: Region; intro: string; takeaway: string; duration: string;
  highlights: {name:string; description:string; tip:string}[];
  arrival: string[]; planning: string[]; faqs: {q:string; a:string}[];
  official: {label:string;url:string}[];
  image?: {src:string;alt:string};
}
export const attractionPath = (id: AttractionId): `/travel-blog/${AttractionId}/` => `/travel-blog/${id}/`;
