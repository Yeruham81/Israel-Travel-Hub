/** Local editorial photos from the publisher's existing Haifa museum archive.
 * New museums are deliberately left without a photo until the owner supplies one.
 * Do not substitute another institution's image or an invented museum exterior.
 */
export type HaifaMuseumPhoto = {src:string;alt:string;width:number;height:number;fit?:"contain"};
export const haifaMuseumPhotos: Record<string, HaifaMuseumPhoto | undefined> = {
  art: {src:"/images/haifa-museums/art.webp",alt:"Exterior of Haifa Museum of Art near Wadi Nisnas",width:700,height:522},
  maritime: {src:"/images/haifa-museums/maritime.webp",alt:"The National Maritime Museum building on Allenby Road, Haifa",width:700,height:322},
  tikotin: {src:"/images/haifa-museums/tikotin.webp",alt:"The Tikotin Museum of Japanese Art in Haifa",width:700,height:525},
  madatech: {src:"/images/haifa-museums/madatech.webp",alt:"MadaTech science museum in Haifa's historic Technion campus",width:700,height:393},
  city: {src:"/images/haifa-museums/city.webp",alt:"The restored Templer-era building of Haifa City Museum",width:700,height:525},
  naval: {src:"/images/haifa-museums/naval.webp",alt:"Aerial view of the Clandestine Immigration and Naval Museum complex in Haifa",width:735,height:531},
  railway: {src:"/images/haifa-museums/railway.webp",alt:"Historic rail vehicles at the Israel Railway Museum in Haifa",width:700,height:466},
};
