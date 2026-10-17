import { isPublisherUrl } from "@/data/registry";

/** Publisher-owned image provenance stays in source files; external licences stay visible. */
export function hasPublicPhotoCredit(photo: { sourceUrl?: string; licenseUrl?: string; credit?: string }) {
  return Boolean(photo.licenseUrl || (!isPublisherUrl(photo.sourceUrl) && (photo.sourceUrl || photo.credit)));
}
