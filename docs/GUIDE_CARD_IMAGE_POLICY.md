# Sitewide guide-card / hero-image policy

1. Each guide, attraction, itinerary and accommodation page has one editorial primary/hero image that genuinely depicts the target page.
2. All cards linked to that destination reuse **that exact image** (using appropriately sized responsive derivatives of the same photograph, when provided), irrespective of the source page or recommendation collection.
3. Never swap a card's image for a gallery/subsection photo just to hide duplicates. Instead choose a distinct primary image for the destination page and update its hero/metadata and all cards together.
4. Primary images must be unique across distinct destination pages. Exact asset identifier auditing is automated for the directory; editorial review also needs to detect visually identical images under different filenames or crops.
5. Media are local in src/assets or public/images, licensed or publisher-provided, reasonably compressed, with accurate alt text and appropriate load behavior. Omit the illustration when no suitable primary photograph exists.
6. The removed Day trips from Jerusalem and Day trips from Tel Aviv guides must not return to routes, menus, cards, sitemaps or internal article links.

See src/lib/guide-hero-photos.ts, src/lib/guide-card-photos.ts, src/data/guidePhotoPolicy.test.ts, and AGENTS.md.
