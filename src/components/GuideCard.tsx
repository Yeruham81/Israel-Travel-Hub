import { Link as RouterLink } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import { BookOpen } from "lucide-react";
import { guideTopics, type GuideTopicId } from "@/data/guide-topics";
import type { GuideDirectoryEntry, GuidePhoto } from "@/data/travelGuides";
import { isPublisherUrl } from "@/data/site-identity";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";

export function GuideTags({ topics, compact = false }: { topics: GuideTopicId[]; compact?: boolean }) {
  return <ul className={compact ? "flex flex-wrap gap-x-1.5 gap-y-1.5" : "flex flex-wrap gap-2"} aria-label="Guide topics">{topics.map((id) => <li key={id}><RouterLink to="/travel-blog/" search={{ topic: id }} className={compact ? "inline-flex min-h-6 items-center rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-secondary" : "inline-flex min-h-6 items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary hover:bg-secondary"}>{guideTopics.find((topic) => topic.id === id)!.label}</RouterLink></li>)}</ul>;
}

export function GuidePhotoCredit({ photo, insideDisclosure = false }: { photo: GuidePhoto; insideDisclosure?: boolean }) {
  if (!hasPublicPhotoCredit(photo)) return null;
  const sourceUrl = !isPublisherUrl(photo.sourceUrl) ? photo.sourceUrl : undefined;
  const attribution = <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit || "Photo source"}<span className="sr-only"> (opens in a new tab)</span></a> : photo.credit}{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licence<span className="sr-only"> (opens in a new tab)</span></a></>}</p>;
  // Keep attribution and licence links accessible, without showing technical metadata below photos.
  if (insideDisclosure) return attribution;
  return <details className="mt-2 text-xs text-muted-foreground">
    <summary className="w-fit cursor-pointer rounded px-1 py-1 text-xs font-medium underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-primary">Photo credits &amp; licence</summary>
    <div className="pb-2 pl-1">{attribution}</div>
  </details>;
}

export function GuideCard({ guide, headingLevel = 2, cardPhoto, compactHomeLayout = false, responsiveSrcSet }: { guide: GuideDirectoryEntry; headingLevel?: 2 | 3; cardPhoto?: { src: string; alt: string } | null; showReadMoreArrow?: boolean; compactHomeLayout?: boolean; responsiveSrcSet?: string | undefined }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  // Always show the main photo of the destination page, not a caller override.
  const displayedPhoto = guide.photo;
  return <article className="editorial-card-link flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card" data-testid="guide-directory-card">
    <Link to={guide.to} className="group flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
      {displayedPhoto ? <img src={displayedPhoto.src} srcSet={responsiveSrcSet ?? stage5PhotoSrcSet(displayedPhoto.src)} sizes={(responsiveSrcSet ?? stage5PhotoSrcSet(displayedPhoto.src)) ? "(min-width: 1280px) 360px, (min-width: 640px) calc(50vw - 26px), calc(100vw - 32px)" : undefined} alt={displayedPhoto.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" /> : <span aria-hidden="true" data-testid="guide-card-placeholder" className="flex aspect-[3/2] w-full items-center justify-center bg-secondary/50 text-muted-foreground"><BookOpen className="h-10 w-10 opacity-50" /></span>}
      <div className="flex flex-1 flex-col p-5"><Heading className="text-2xl font-semibold leading-tight group-hover:text-primary">{guide.title}</Heading><p className={compactHomeLayout ? "mt-3 text-sm leading-relaxed text-muted-foreground" : "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground"}>{guide.description}</p></div>
    </Link>
    <div className={compactHomeLayout ? "px-5 pb-4 pt-1" : "px-5 pb-5"}><GuideTags topics={guide.topics} compact={compactHomeLayout} /></div>
  </article>;
}
