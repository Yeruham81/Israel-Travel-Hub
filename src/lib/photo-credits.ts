import { isPublisherUrl } from "@/data/registry";

/** Only show public-source and legally relevant attributions; avoid decorative captions for illustrations. */
export function hasPublicPhotoCredit(photo: { sourceUrl?: string; licenseUrl?: string; credit?: string }) {
  return Boolean(photo.licenseUrl || (photo.sourceUrl && !isPublisherUrl(photo.sourceUrl)));
}
