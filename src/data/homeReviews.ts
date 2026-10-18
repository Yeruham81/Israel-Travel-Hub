/** A one-time editorial snapshot, not an automatic Tripadvisor integration. */
export const tripadvisorProfileUrl = "https://www.tripadvisor.com/Attraction_Review-g293984-d14803612-Reviews-Moshe_Barak-Tel_Aviv_Tel_Aviv_District.html";
export const tripadvisorSnapshot = { rating: 5, reviewCount: 11, checkedAt: "2026-10-18" } as const;

export const tripadvisorReviews = [
  { author: "Kaye L", period: "August 2025", summary: "A reliable airport pickup, clear pricing and welcome assistance when travel plans changed." },
  { author: "Lilach T", period: "July 2025", summary: "Professional, punctual service and easy communication throughout the journey." },
  { author: "Janet", period: "June 2025", summary: "A well-coordinated Shabbat transfer to Jerusalem for a larger group, with return airport transportation." },
] as const;

/** Customer messages originally published by Moshe's Israel Taxi Service.
 * Photos intentionally omitted until their owners and consent can be verified.
 */
export const customerTestimonials = [
  {
    author: "Glory Naiman", location: "United Kingdom", initials: "GN",
    quote: "Dear Moshe, our day tour with you was filled with emotion and enjoyment and we would once again like to thank you for all your help and efforts. Rest assured we will pass your card on to many of our friends and hope they will use your services.",
  },
  {
    author: "Billy Gore", location: "Australia", initials: "BG",
    quote: "Dear Moshe, we are now back in Australia after a very enjoyable stay in Jerusalem. We would like to thank you for your excellent private taxi service when we visited Israel. We would have no hesitation in recommending your taxi service to our friends.",
  },
  {
    author: "Jim & Jill Lustig", location: "United States", initials: "JL",
    quote: "Hi Moshe, I wanted to thank you again for everything you did for us. Your efforts truly made a good trip into an absolutely fantastic experience. If you ever travel to our part of the world, we would love to welcome you and catch up in person. All the best!",
  },
] as const;
