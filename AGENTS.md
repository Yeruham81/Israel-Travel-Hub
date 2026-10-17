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
- Robots belongs only to leaf `pageMeta()`; pure `siteConfig()` supports launch-configuration tests without changing staging — so root defaults cannot override a launch decision.
- Substantial hotel landing guides use `hotelGuideMeta()` and private airport landings use WebPage/Service metadata without offers — so schema reflects the visible editorial/service intent, not live inventory.
- Router uses `trailingSlash: "always"` to preserve the existing site's URL paths.
- Global navigation lives in `src/data/nav.ts` and renders in `__root.tsx` (desktop rail + mobile drawer); pages render only their own content — so every page shares one nav.
- Non-transfer referrals are `ProviderLink` records with a `BookingMode`; live prices require `isDisplayableLiveQuote` in `src/lib/booking.ts` — so no unverified price can render.
- Editorial guide content (city stay guides) lives in `src/data/content.ts`; leaf pages use shared components in `src/components/Guide.tsx`, with information sections before provider sections.
