# Reusable individual attraction page - editorial and visual standard

The fully researched Capernaum article at /attractions/capernaum/ is the first
reference implementation. Reuse the structural component
src/components/AttractionDestinationPage.tsx with attraction-specific content
instead of cloning the entire Capernaum page.

## Universal layout

1. Home / Attractions / attraction breadcrumbs.
2. Compact hero: title and a two-to-four-line introduction left, small
   authentic photo right on desktop; photo beneath the text on narrow screens.
   Use GuideHeroLayout, GuideHeroMedia, AuthorCard and PageUpdated.
3. Six compact **At a glance** fact cards (two columns mobile, three desktop).
   Only high-value, verified facts (location, duration, published fee/hours,
   accessibility, booking). Identify the operator that published a fee or
   time, and clarify distinct entrances.
4. OnThisPage navigation for real article sections, never Sources.
5. Main highlights first, with specific historic/architectural interpretation
   and a few non-duplicative, authentic, locally stored photographs.
6. History/context where relevant: distinguish documented finds from tradition.
7. Operator-specific hours, prices, reservations, mobility access and visitor
   preparation. Use a small comparison table for separate managed compounds.
8. Getting there: target the correct entrance, not a remote road junction.
   Do not call a multi-kilometre walk from a bus stop a short walk.
9. Suggested focused site visit and optional nearby itinerary, without
   unsupported travel-time estimates.
10. Relevant guided tours and a restrained private-driver reference after the
    substantive visitor content; never fabricate tour prices or availability.
11. Concise FAQs for remaining questions.
12. Related attraction cards with no duplicated photos.
13. Shared contact form once only; Sources last, closed by default.

## Site-specific variation

- Religious sites: separate worship/visitor entrances and appointment rules.
- Archaeological sites: periods, excavation evidence, scholarly uncertainty.
- National parks: trail status, weather, safety notices, ranger instructions.
- City sights: walking order, local streets and entry points.
- Omit a genuinely irrelevant module instead of filling space.

## Image and data integrity

All images must be local project assets. Prefer licensed/owned photos from the
owner's archived site and truthful alt descriptions. Never insert an image
between a heading and its introductory paragraph. No duplicate images within
an article, except the author portrait near the top and the contact form.
Do not publish source filenames, invented visitor prices, ratings or tickets.

Keep H1 and opening year-free. Show an authentic Updated Month Year and use
the corresponding structured-data dateModified. Keep the site owner's voice
in first-person singular when describing his services, and preserve
affiliate tracking on linked external tour catalogues. Booking inquiries
require confirmation.
