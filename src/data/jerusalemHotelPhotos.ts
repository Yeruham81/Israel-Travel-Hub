/**
 * Twelve distinct illustrative images for the twelve Jerusalem hotel recommendations.
 * Photos show Jerusalem or other accommodation spaces, never the named property.
 * Free Unsplash license for the eleven external photos was verified 22 Oct 2026.
 * Credits and source URLs are exposed in the city catalogue's photo disclosure.
 */
import jerusalemOldCity from "@/assets/home/jerusalem-old-city.webp";
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";

const unsplash = (id: string, url: string, alt: string, photographer: string): HotelIllustration => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=562&q=76`,
  alt,
  label: "Illustrative photograph",
  credit: `Photo: ${photographer} / Unsplash`,
  sourceUrl: url,
  licenseUrl: "https://unsplash.com/license",
});

export const jerusalemHotelPhotos: Record<string, HotelIllustration> = {
  "herbert-samuel": unsplash(
    "photo-1725962479542-1be0a6b0d444",
    "https://unsplash.com/photos/a-hotel-room-with-a-large-bed-and-a-flat-screen-tv-xMbzmWROWxE",
    "Bright contemporary guest room with a bed, window and writing desk",
    "ikhbale",
  ),
  "arthur": unsplash(
    "photo-1702014859878-5d4743176d28",
    "https://unsplash.com/photos/a-hotel-room-with-a-bed-desk-chairs-and-a-television-1EJXSLUfqU0",
    "Boutique-style guest room with warm timber finishes and tall windows",
    "Aquilion Property",
  ),
  "mamilla": unsplash(
    "photo-1772665762866-8dcfff65b3f3",
    "https://unsplash.com/photos/four-armchairs-around-a-white-coffee-table-in-a-lobby-D12XNAze8SY",
    "Inviting contemporary hospitality lounge with armchairs and a coffee table",
    "Josh Hild",
  ),
  "king-david": unsplash(
    "photo-1575667456742-4269014e68aa",
    "https://unsplash.com/photos/a-view-of-the-old-city-of-jerusalem-Kltv_Kh0j7g",
    "Jerusalem Old City stone walls and domes at sunset",
    "David Holifield",
  ),
  "new-imperial": {
    src: jerusalemOldCity,
    alt: "Historic skyline and stone buildings in Jerusalem's Old City",
    label: "Jerusalem city photograph",
    credit: "Berthold Werner · Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG",
  },
  "sephardic-house": unsplash(
    "photo-1675409145919-277c0fc2aa7d",
    "https://unsplash.com/photos/a-bedroom-with-a-large-bed-and-a-large-window-EYoK3eVKIiQ",
    "Warm guest bedroom with a large bed and timber detailing",
    "Natalia Gusakova",
  ),
  "bezalel": unsplash(
    "photo-1652161854125-1f5289c13eac",
    "https://unsplash.com/photos/a-bed-in-a-hotel-room-GOzvLXx4E-E",
    "Hotel bedroom with neutral furnishings and a comfortable bed",
    "Kin Shing Lai",
  ),
  "market-courtyard": unsplash(
    "photo-1669664863985-ac4a81e7483e",
    "https://unsplash.com/photos/a-hotel-room-with-two-beds-nJ98PzYapKM",
    "Guest room with two beds, representing an apartment-style accommodation option",
    "Mky Moody",
  ),
  "american-colony": unsplash(
    "photo-1677129667171-92abd8740fa3",
    "https://unsplash.com/photos/a-hotel-lobby-with-a-chandelier-hanging-from-the-ceiling-WR1bkBstInw",
    "Elegant hotel lobby with decorative lighting and seating",
    "Quang Nguyen Vinh",
  ),
  "jerusalem-hotel": unsplash(
    "photo-1631015108968-ba3b87f89005",
    "https://unsplash.com/photos/white-soap-on-white-towel-COp-kDF4RWs",
    "Freshly folded bath towels arranged on a guest bed",
    "Vije Vijendranath",
  ),
  "orient": unsplash(
    "photo-1716667282993-cd8f2bffb91f",
    "https://unsplash.com/photos/a-hotel-pool-with-lounge-chairs-and-umbrellas-O2--QA3GljY",
    "Hotel swimming pool with loungers and umbrellas",
    "Olha",
  ),
  "rafael-residence": unsplash(
    "photo-1587874522487-fe10e954d035",
    "https://unsplash.com/photos/white-bed-linen-on-bed-pHcLOc_RzQ0",
    "Comfortable guest bedroom with a wide bed and soft lighting",
    "Pranav Kumar Jain",
  ),
};
