# Israel Taxi & Travel — standard guide layout

This is the default editorial page skeleton for travel blogs, destination guides,
airport journey comparisons, attractions, accommodation guides, itineraries and
cruise-port guides. It keeps consistent reader expectations while allowing
content-specific modules.

## Universal header

1. Breadcrumbs (with the current guide).
2. A **two-column introduction on desktop**, using `GuideHeroLayout`:
   - Left, approximately two-thirds of the available content width:
     contextual eyebrow/category (where relevant), one `h1` using
     `.guide-page-title`, a concise practical introduction (ideally
     1–3 sentences), and the editorial update date when available.
   - Right, approximately one-third of the width: a **small authentic main
     photo** using `GuideHeroMedia`, aligned near the title.
   - On desktop, `GuideHeroLayout` may give the photo slightly more width
     (roughly 37% instead of 33%) **only when the full opening text actually
     fits within four rendered lines at the wider-photo width**. The layout
     measures the rendered introduction and falls back to the original, wider
     text column for longer opening paragraphs. It rechecks on viewport/font
     changes and never truncates or hides editorial text.
   - The title may wrap naturally and remains readable; at desktop widths
     the split-layout title is subtly reduced to 38px.
3. **Phone and tablet layouts** stack the image **beneath the introduction**.
   The heading must not be squeezed beside an image on narrow screens.
4. Editorial image rules:
   - Consistent 4:3 composition on desktop; 16:9 on smaller screens.
   - Desktop height capped at 260px; mobile/tablet cap 300px.
   - `object-cover` normally; `fit="contain"` when a landmark, sign,
     inscription or other important subject must not be cropped.
   - Keep required image attribution. Do not show internal file names.
   - Never use full-width giant banners or image-before-title layouts on
     individual guide pages.
5. Compact `AuthorCard` directly after the combined heading-and-image
   block, where the guide has author attribution.

Use `GuideHeroLayout` and `GuideHeroMedia` from
`src/components/GuideHeroMedia.tsx` and the shared H1 style in
`src/styles.css`. Do not independently assign other cover-photo dimensions.
An image-free guide can use the layout without an image, keeping the
headline full width. The main homepage slideshow is a **separate** design.

## Recommended body order

1. Brief **Quick answer** or **At a glance**: directly answer the search intent.
2. **On this page** navigation for longer guides; only real headings.
3. Primary information and comparisons, in order of reader importance.
4. Practical logistics (transport, costs, opening times, accessibility, border
   considerations where relevant) without duplicating the quick answer.
5. Contextual booking / tour / hotel choices when they genuinely help.
6. **Frequently asked questions**, limited to relevant remaining questions.
7. **Related practical guides** (directly related destinations / topics).
8. **Plan the rest of your trip** (one step less closely related), if relevant.
9. **Contact / quote request** when the page offers the owner's service.
10. **Sources** in a compact expandable section, if the article relies on
    external cited facts.

Do not force empty sections or duplicate recommendation carousels. Maintain
logical search-intent order, avoid changing meaning merely to match the layout.

## Page-type allowances

- **Commercial service landings** (e.g., airport transfer quote pages) can
  retain their price/CTA panel in the left column, with the smaller image on
  the right. The copy and price disclosures remain accurate.
- **Tour catalogue/category pages** can show a focused CTA beneath the intro
  in the left column; catalog filters and booking cards follow the header.
- **Landmark photos** may use `fit="contain"` and a descriptive caption to
  preserve the full subject.
- **Pages without a suitable licensed hero image** should omit the image
  rather than use generic or misleading stock imagery.
- **Special articles** (e.g., event calendars) can omit the cover image if a
  photograph is not meaningfully relevant.
- Keep any article-specific feature blocks, transport tables, maps, sourced
  prices, affiliate tracking behavior and forms intact during visual migrations.

## Regression coverage

`src/test/guide-hero-layout.test.tsx` asserts shared image properties,
desktop image-to-title placement, mobile stacking, uncropped exceptions
and homepage independence.
`src/test/guide-title-scale.test.ts` protects the H1 typography.
