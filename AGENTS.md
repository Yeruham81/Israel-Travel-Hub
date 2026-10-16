<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Provider/source/offer data lives in `src/data/registry.ts` as typed DB-shaped records; pages read only from it so it can be swapped for a database later.
- Operators and booking partners are separate types; affiliate URLs live in `affiliateConfig`, never hardcoded into offers — so sponsored labeling stays truthful.
- Head metadata goes through `pageMeta()` in `src/lib/site.ts` (staging noindex + configurable canonical origin) — so launch is a config change.
- Router uses `trailingSlash: "always"` to preserve the existing site's URL paths.
