export interface AuthorProfile {
  name: string;
  role: string;
  experience: string;
  bio: string;
  reviewsUrl: string;
  sourceIds: string[];
}
export const mosheBarakAuthor: AuthorProfile = {
  name: "Moshe Barak",
  role: "Private transport operator & local travel expert",
  experience: "Over 20 years helping visitors with airport transfers, private day trips and travel around Israel.",
  bio: "",
  reviewsUrl: "https://www.tripadvisor.com/Attraction_Review-g293984-d14803612-Reviews-Moshe_Barak-Tel_Aviv_Tel_Aviv_District.html",
  sourceIds: ["moshe-author-profile"],
};

/** Keep migration provenance in the registry without publishing legacy-site referrals. */
export function isPublisherUrl(url?: string) {
  if (!url) return false;
  try { return new URL(url).hostname.replace(/^www\./, "") === "israel-taxi.com"; }
  catch { return false; }
}
