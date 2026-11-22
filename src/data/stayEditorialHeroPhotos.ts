import jerusalemCover from "@/assets/guides/2026-11/where-to-stay-jerusalem-drive.webp";
import telAvivCover from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";

/**
 * One canonical image per Where to Stay editorial guide.
 * Its page header, SEO image, directory cards, and all related links
 * must use the same photograph, rather than an individual area card photo.
 */
export const stayEditorialHeroPhotos = {
  jerusalem: {
    src: jerusalemCover,
    alt: "Aerial view of Jaffa Road and central Jerusalem's historic buildings",
  },
  telaviv: {
    src: telAvivCover,
    alt: "Tel Aviv beachfront hotels, Mediterranean promenade and shoreline",
  },
} as const;
