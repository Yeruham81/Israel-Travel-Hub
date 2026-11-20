/** Local optimized photographs for all fifteen museum cards. The music image is an illustration. */
export type JerusalemMuseumPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "contain";
  illustrative?: boolean;
};
export const jerusalemMuseumPhotos: Record<string, JerusalemMuseumPhoto> = {
  israel: {src: "/images/jerusalem-museums/israel.webp", alt: "The Shrine of the Book at the Israel Museum in Jerusalem", width: 691, height: 518},
  bible: {src: "/images/jerusalem-museums/bible.webp", alt: "Exterior of the Bible Lands Museum Jerusalem", width: 717, height: 538},
  science: {src: "/images/jerusalem-museums/science.webp", alt: "Interactive exhibits inside the Bloomfield Science Museum", width: 730, height: 548},
  yad: {src: "/images/jerusalem-museums/yad.webp", alt: "Interior of the Yad Vashem Holocaust History Museum", width: 669, height: 446},
  tower: {src: "/images/jerusalem-museums/tower.webp", alt: "Stone walls and towers of the Tower of David citadel", width: 691, height: 460},
  rockefeller: {src: "/images/jerusalem-museums/rockefeller.webp", alt: "Rockefeller Archaeological Museum stone courtyard", width: 710, height: 473},
  time: {src: "/images/jerusalem-museums/time.webp", alt: "Theatre seating and projection screen at Time Elevator Jerusalem", width: 720, height: 480},
  prison: {src: "/images/jerusalem-museums/prison.webp", alt: "Museum of the Underground Prisoners in the Russian Compound", width: 717, height: 475},
  friends: {src: "/images/jerusalem-museums/friends.webp", alt: "Historic stone exterior of Friends of Zion Museum", width: 755, height: 566},
  tolerance: {src: "/images/jerusalem-museums/tolerance.webp", alt: "Exterior of the Museum of Tolerance Jerusalem", width: 755, height: 339, fit: "contain"},
  music: {src: "/images/jerusalem-museums/music.svg", alt: "Original illustration of traditional musical instruments representing the Hebrew Music Museum", width: 1200, height: 675, illustrative: true},
  italian: {src: "/images/jerusalem-museums/italian.webp", alt: "Limestone courtyard of the Nahon Museum of Italian Jewish Art", width: 720, height: 540},
  seam: {src: "/images/jerusalem-museums/seam.webp", alt: "Historic stone facade of the Museum on the Seam", width: 720, height: 540},
  islamic: {src: "/images/jerusalem-museums/islamic.webp", alt: "Exhibition gallery at the Museum for Islamic Art Jerusalem", width: 717, height: 479},
  begin: {src: "/images/jerusalem-museums/begin.webp", alt: "Atrium and museum exhibit at Menachem Begin Heritage Center", width: 654, height: 436},
};
