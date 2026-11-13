import { createFileRoute, redirect } from "@tanstack/react-router";
import { isGuideTopic, type GuideTopicId } from "@/data/travelGuides";

const validateGuideSearch = (search: Record<string, unknown>): { q?: string; topic?: GuideTopicId } => ({
  ...(typeof search.q === "string" && search.q.trim() ? { q: search.q.trim().slice(0, 120) } : {}),
  ...(isGuideTopic(search.topic) ? { topic: search.topic } : {}),
});

/** Preserve existing bookmarks, including topic/search filtering. */
export const Route = createFileRoute("/guides")({
  validateSearch: validateGuideSearch,
  beforeLoad: ({ search, location }) => {
    throw redirect({ to: "/travel-blog/", search: validateGuideSearch(search), hash: location.hash, replace: true, statusCode: 301 });
  },
});
