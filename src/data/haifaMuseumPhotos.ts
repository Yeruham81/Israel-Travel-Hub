/** Local editorial photos from the publisher's existing Haifa museum archive.
 * The other three museums use independently licensed Wikimedia Commons photos,
 * cropped and compressed locally with visible credit and license links.
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
  "hecht": {src:"/images/haifa-museums/hecht.webp",alt:"Archaeological exhibits inside the Hecht Museum at the University of Haifa",width:700,height:525},
  "struck": {src:"/images/haifa-museums/struck.webp",alt:"Restored limestone exterior of Hermann Struck's historic house in Haifa",width:700,height:525},
  "mane-katz": {src:"/images/haifa-museums/mane-katz.webp",alt:"Historic wrought-iron gate and plaque at the entrance to the Mané-Katz Museum",width:700,height:525},
};

/** Visible credit and license details for the three Commons photographs. */
export const haifaMuseumPhotoCredits = [
  {id:"hecht",label:"Hecht Museum",author:"Israel Zeller · Attribution: yigal zalmanson Pikiwiki Israel",license:"CC BY 2.5",sourceUrl:"https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_70469_hecht_museum.jpg",licenseUrl:"https://creativecommons.org/licenses/by/2.5/"},
  {id:"struck",label:"Hermann Struck Museum",author:"Haifa Museums",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:%D7%9E%D7%95%D7%96%D7%99%D7%90%D7%95%D7%9F_%D7%94%D7%A8%D7%9E%D7%9F_%D7%A9%D7%98%D7%A8%D7%95%D7%A7.jpg",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/"},
  {id:"mane-katz",label:"Mané-Katz Museum",author:"Hanay",license:"CC BY-SA 3.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Mane_Catz_Museum_(2).JPG",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
];
