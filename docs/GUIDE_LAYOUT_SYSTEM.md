# Israel Taxi & Travel — standard guide layout

This is the default editorial page skeleton for travel blogs, destination guides,
airport journey comparisons, attractions, accommodation guides, itineraries and
cruise-port guides. It keeps consistent reader expectations while allowing
content-specific modules.

## Universal header

1. Breadcrumbs (with the current guide).
2. Small contextual eyebrow / category label (where relevant).
3. One `h1` using `.guide-page-title`. Full available text width; do not
   constrain it to a narrow half-column beside an image.
4. Concise practical introduction (ideally 1–3 sentences).
5. Editorial update date, when available.
6. Relevant, authentic lead photo using `GuideHeroMedia` **below** the text:
   - Image container: `max-w-4xl` inside the normal `max-w-5xl` content.
   - Display ratio: 16:9, capped at 360px tall on larger screens.
   - On mobile: stacked after the title and summary, fluid width.
   - `object-cover` normally; `fit="contain"` where a landmark, inscription,
     sign, or other important composition must not be cut off.
   - Keep legitimate image attribution where needed; do not expose internal
     file names or editorial/source metadata.
   - No giant full-bleed image or image-before-title promotional header.
7. Compact `AuthorCard`, where the guide has author attribution.

Use `src/components/GuideHeroMedia.tsx` and shared H1 style in
`src/styles.css`; do not independently specify other dimensions. The main
homepage slideshow is a **separate** design and should not use this component.

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

- **Commercial service landings** (e.g., airport transfer quote pages) can show
  their price/CTA panel before the lead image, while keeping title/intro before
  the image and using the same image component.
- **Tour catalogue/category pages** can show a focused CTA after the intro and
  before the image; catalog filters and booking cards follow the header.
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
text-before-image ordering, uncropped exceptions and homepage independence.
`src/test/guide-title-scale.test.ts` protects the H1 typography.
