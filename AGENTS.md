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

## Owner workflow preference — mandatory
- **Do not invoke the Lovable AI agent, send Lovable chat messages or use Lovable credits for site development.** The owner has repeatedly and explicitly requested that all implementation, content edits and tests be handled independently through **GitHub only**.
- Read and edit the connected GitHub repository directly (owner/repository: `Yeruham81/Israel-Travel-Hub`) and use GitHub Actions for validation. GitHub commits may sync into Lovable as a preview; that sync is not authorization to contact the Lovable agent.
- Preserve pushed history, do not force-push, and do not publish to the production domain or change DNS without explicit owner authorization.
- Only change this workflow if the owner explicitly instructs you to do so.

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
- All contact and quote forms share the gated quote-delivery service and server-only Brevo REST transport; fixed recipients and sanitized diagnostics prevent client-controlled routing or credential leaks.

## Editorial voice (sitewide)

- The website belongs to **Moshe Barak** and its owner-authored public-facing copy speaks in the **first-person singular**: `I`, `me`, `my` (`my guide`, `I can arrange`, `contact me`, `I may earn a commission`). Apply this to guide text, section descriptions, service CTAs, affiliate disclosures, quote-form prompts and error/contact guidance.
- Avoid referring to the operator as `we` / `our` or as `Moshe` in third person when the sentence is directly addressed from the owner. Named attribution still belongs in SEO metadata, structured data, bylines, external provider records and transparent consent wording.
- Preserve plural language where it is genuinely another speaker or a collective (e.g. a **visitor's** FAQ question `Will all our suitcases fit?`, a quotation/testimonial, an independent operator's identity, or a truly shared visitor-and-owner planning invitation). Do not modify third-party URLs, organization names or verbatim quotes to satisfy a global string replacement.
- Keep on-page owner voice and server/system messages semantically honest: a delivery failure may be described neutrally rather than suggesting Moshe himself personally handled the failure. Ensure paragraph `inlineLinks[].text` continues matching the displayed anchor phrase after copy edits.
