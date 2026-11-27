import { isPublisherUrl } from "@/data/site-identity";

/** Only show public-source and legally relevant attributions; avoid decorative captions for illustrations. */
export function hasPublicPhotoCredit(photo: {
  sourceUrl?: string;
  licenseUrl?: string;
  credit?: string;
}) {
  return Boolean(
    photo.licenseUrl ||
    /^(©|Photo:)/.test(photo.credit || "") ||
    (photo.sourceUrl && !isPublisherUrl(photo.sourceUrl)),
  );
}
