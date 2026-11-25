import { lazy, Suspense } from "react";
import { useRouterState } from "@tanstack/react-router";
import { isShareableContentPath, normalizedSharePath } from "@/lib/content-sharing";

// Keep sharing controls, brand icons and styling off home and service bundles.
const ContentSharePanel = lazy(() =>
  import("./ContentSharePanel").then((module) => ({ default: module.ContentSharePanel })),
);

/** The successful leaf match also excludes 404s and failed/unfinished routes. */
export function PageContentSharePanel() {
  const pathname = useRouterState({
    select: (state) => {
      const leaf = state.matches[state.matches.length - 1];
      const path = normalizedSharePath(state.location.pathname);
      return leaf?.status === "success" &&
        !leaf._notFound &&
        normalizedSharePath(leaf.fullPath) === path
        ? path
        : "";
    },
  });
  return pathname && isShareableContentPath(pathname) ? (
    <Suspense fallback={null}>
      <ContentSharePanel key={pathname} pathname={pathname} />
    </Suspense>
  ) : null;
}
