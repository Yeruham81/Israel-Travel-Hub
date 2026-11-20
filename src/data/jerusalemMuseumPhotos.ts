/** Local photographs for the fifteen Jerusalem museum cards. Music is an original illustration. */
export type JerusalemMuseumPhoto = { src: string; alt: string; illustrative?: boolean };
export const jerusalemMuseumPhotos: Record<string, JerusalemMuseumPhoto> = {
  israel: {src: "/images/jerusalem-museums/israel.webp", alt: "The Israel Museum building and grounds in Jerusalem"},
  bible: {src: "/images/jerusalem-museums/bible.webp", alt: "Bible Lands Museum Jerusalem"},
  science: {src: "/images/jerusalem-museums/science.webp", alt: "Bloomfield Science Museum in Jerusalem"},
  yad: {src: "/images/jerusalem-museums/yad.webp", alt: "Yad Vashem Holocaust memorial complex in Jerusalem"},
  tower: {src: "/images/jerusalem-museums/tower.webp", alt: "Tower of David citadel near Jerusalem's Jaffa Gate"},
  rockefeller: {src: "/images/jerusalem-museums/rockefeller.webp", alt: "Rockefeller Archaeological Museum in Jerusalem"},
  time: {src: "/images/jerusalem-museums/time.webp", alt: "Time Elevator Jerusalem attraction"},
  prison: {src: "/images/jerusalem-museums/prison.webp", alt: "Museum of the Underground Prisoners in Jerusalem"},
  friends: {src: "/images/jerusalem-museums/friends.webp", alt: "Friends of Zion Museum in Jerusalem"},
  tolerance: {src: "/images/jerusalem-museums/tolerance.webp", alt: "Museum of Tolerance in Jerusalem"},
  music: {src: "/images/jerusalem-museums/music.svg", alt: "Original illustration of traditional musical instruments, representing the Hebrew Music Museum", illustrative: true},
  italian: {src: "/images/jerusalem-museums/italian.webp", alt: "Limestone courtyard and blue doors of the Nahon Museum of Italian Jewish Art in Jerusalem"},
  seam: {src: "/images/jerusalem-museums/seam.webp", alt: "Historic limestone facade of the Museum on the Seam in Jerusalem"},
  islamic: {src: "/images/jerusalem-museums/islamic.webp", alt: "Museum for Islamic Art in Jerusalem"},
  begin: {src: "/images/jerusalem-museums/begin.webp", alt: "Menachem Begin Heritage Center in Jerusalem"},
};
