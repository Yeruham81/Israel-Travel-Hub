import gloryNaimanPhoto from "@/assets/testimonials/glory-naiman.webp";
import billyGorePhoto from "@/assets/testimonials/billy-gore.webp";
import markWeiglerPhoto from "@/assets/testimonials/mark-weigler.webp";
import jimJillLustigPhoto from "@/assets/testimonials/jim-jill-lustig.webp";

/** A one-time editorial snapshot, not an automatic Tripadvisor integration. */
export const tripadvisorProfileUrl = "https://www.tripadvisor.com/Attraction_Review-g293984-d14803612-Reviews-Moshe_Barak-Tel_Aviv_Tel_Aviv_District.html";
export const tripadvisorSnapshot = { rating: 5, reviewCount: 11, checkedAt: "2026-10-18" } as const;

export const tripadvisorReviews = [
  { author: "Kaye L", period: "August 2025", excerpt: "He has always been on time and makes the process of finding him when we land at Ben Gurion airport easy." },
  { author: "Lilach T", period: "July 2025", excerpt: "He was on time, easy to communicate with, and very professional throughout. I felt completely safe and taken care of" },
  { author: "Janet", period: "June 2025", excerpt: "The service was easy to coordinate and reasonably priced. It was such a good experience we also used his service to return to the airport" },
] as const;

/** Original testimonials paired with the photographs published alongside them. */
export const customerTestimonials = [
  {
    author: "Glory Naiman", location: "United Kingdom", photo: gloryNaimanPhoto,
    quote: "Dear Moshe, our day tour with you was filled with emotion and enjoyment and we would once again like to thank you for all your help and efforts. Rest assured we will pass your card on to many of our friends and hope they will use your services.",
  },
  {
    author: "Billy Gore", location: "Australia", photo: billyGorePhoto,
    quote: "Dear Moshe, we are now back in Australia after a very enjoyable stay in Jerusalem. We would like to thank you for your excellent private taxi service when we visited Israel. We would have no hesitation in recommending your taxi service to our friends.",
  },
  {
    author: "Mark Weigler", location: "New Zealand", photo: markWeiglerPhoto,
    quote: "Thank you so much, Moshe. Your wonderful character and the professionalism you consistently exhibit are truly appreciated. Hearing that my daughter found you wonderful as well only reaffirms what a positive impact you’ve had. Thanks once again for everything.",
  },
  {
    author: "Jim & Jill Lustig", location: "United States", photo: jimJillLustigPhoto,
    quote: "Hi Moshe, I wanted to thank you again for everything you did for us. Your efforts truly made a good trip into an absolutely fantastic experience. If you ever travel to our part of the world, we would love to welcome you and catch up in person. All the best!",
  },
] as const;
