# Reusable individual attraction page - editorial and visual standard

The fully researched Capernaum article at /attractions/capernaum/ is the first
reference implementation. The Tabgha article at /attractions/tabgha/ is the
second example, covering two neighbouring churches with different hours. Reuse the structural component
src/components/AttractionDestinationPage.tsx with attraction-specific content
instead of cloning the entire Capernaum page.

## Universal layout

1. Home / Attractions / attraction breadcrumbs.
2. Compact hero: title and a two-to-four-line introduction left, small
   authentic photo right on desktop; photo beneath the text on narrow screens.
   Use GuideHeroLayout, GuideHeroMedia, AuthorCard and PageUpdated.
3. Compact **At a glance** fact cards on a distinct warm-toned background (two columns mobile, up to three desktop). Prefer around four to six meaningful, verified facts rather than empty filler. Each fact chooses its own semantically appropriate icon.
   Only high-value, verified facts (location, duration, published fee/hours,
   accessibility, booking). Identify the operator that published a fee or
   time, and clarify distinct entrances.
4. OnThisPage navigation for real article sections, never Sources.
5. Main highlights first, with specific historic/architectural interpretation
   and a few non-duplicative, authentic, locally stored photographs.
6. Operator-specific visitor essentials when relevant: hours, prices,
   reservations, mobility access and practical preparation. A small desktop
   table with stacked mobile cards suits multiple operators; a single-operator
   attraction may need only a simple block. Use a few editorial tips with
   the shared yellow lightbulb; never invent first-hand experience.
7. Getting there: target the correct entrance, not a remote road junction.
   A compact location map with an accessible larger-map fallback is useful when
   verified coordinates are available. State public transport constraints
   without repeating junction names.
8. A focused site visit and/or suggested nearby day trip if useful.
   For a full-day itinerary, suggest around three to five realistic stops,
   depending on departure point and available time; avoid repetitive negative
   constructions or unnecessary caveats.
9. History and context where relevant, after practical visitor information.
   Distinguish documented finds from tradition without repeating disclaimers.
10. Relevant guided tours and a restrained private-driver reference after the
    substantive visitor content; never fabricate tour prices or availability.
11. Concise FAQs for remaining questions.
12. Curated related attraction cards. When there are six genuinely relevant
    destinations with appropriate locally stored photography, display six
    cards in a two-row, three-column desktop grid. With fewer relevant links
    use a smaller, responsive layout (normally two columns on desktop), not
    invented filler or a partial three-column grid. Never duplicate photos.
13. A compact `Plan your trip to Israel` panel with icon-led linked cards,
    beneath the related attractions where such practical links are useful.
14. Shared contact form once only; Sources last, closed by default.

## Site-specific variation and optional sections

The Capernaum content is a reference **not a compulsory checklist**.
Select sections to match the attraction and the traveller's search intent,
rather than reproducing every heading verbatim. The shared page takes
optional `visitorContent`, `transportContent`, `itineraryContent`,
`historyContent`, `tourContent`, `faqs`, `nearby`, and `planningLinks`.
Omitted sections must also disappear from `OnThisPage` navigation.
Every page should keep a strong introduction and essential highlights;
adapt section labels, order and presentation when warranted by the site.
Do not create empty headings or filler cards.

- Religious sites: separate worship/visitor entrances and appointment rules;
  worship services and visitor schedules may require distinct explanations.
- Archaeological sites: periods, excavation evidence, scholarly uncertainty.
- National parks and trails: access, seasons, trail status, weather, safety
  notices, ranger instructions and restrictions; history may be irrelevant.
- Museums: timed admission, exhibitions, accessible entrances and suggested
  visit duration; a nearby day-trip itinerary may be unnecessary.
- City sights: walking order, neighbourhood context, local streets and entry points.
- Viewpoints and outdoor monuments: a brief visit and public access may be enough;
  omit tours, booking blocks, or lengthy historical sections if not useful.
- Different availability of related attractions should determine card count
  and grid layout; six is not a universal requirement.

## Image and data integrity

All images must be local project assets. Prefer licensed/owned photos from the
owner's archived site and truthful alt descriptions. Never insert an image
between a heading and its introductory paragraph. No duplicate images within
an article, except the author portrait near the top and the contact form.
For standard editorial photos within guide sections, reuse `AttractionContentImage`:
4:3 at all breakpoints, 260×195 CSS pixels at desktop (up to 220px wide
at intermediate widths), and responsive full width on mobile. The history photo
and highlight cards use the same component. Do not impose conflicting max-height
constraints: preserve the ratio and let the source crop with `object-cover`.
Compact hero, panoramic images and link/tour thumbnails keep independent
aspect ratios and sizes.
Do not publish source filenames, invented visitor prices, ratings or tickets.

Do not add a repeating "Worth knowing:" label to every highlight. Remove
redundant historical disclaimers, use lists for multi-step visitor instructions,
and keep highlight paragraphs short. Use original photographs of the exact site
where possible and confirm rights and required credits.

Keep H1 and opening year-free. Show an authentic Updated Month Year and use
the corresponding structured-data dateModified. Keep the site owner's voice
in first-person singular when describing his services, and preserve
affiliate tracking on linked external tour catalogues. Booking inquiries
require confirmation.

## Reference implementation and data ownership

Capernaum's high-value facts, contacts, title, URL metadata, operator hours,
sources, and update date are centralised in `src/data/capernaumSite.ts`.
Its full editorial body is in `src/components/CapernaumAttractionPage.tsx`.
The older `attractionsNorth.ts` registry deliberately contains metadata only
for Capernaum; never recreate a second independently maintained guide there.
The shared page template displays the history section **after** practical
visiting hours, navigation, and suggested itineraries for visitor intent
whenever those sections apply. Related-photo grids use three desktop columns
only when six illustrated cards are available; otherwise they fall back
to a more compact layout.

The Capernaum national-park Friday and holiday-eve visiting hours used in
`src/data/capernaumSite.ts` were checked and confirmed by the site owner:
**08:00–15:00 year-round**, with special holiday-eve hours of 08:00–13:00.
The 13:00–15:00 summer Friday entry still appearing on the park authority
website is a known published error for this site; do not reintroduce it from
that page without new verification. The owner-verified hours take precedence
in this guide. Preserve source attribution and reassess if operating schedules
change.

Photographs contributed for Capernaum were resized and converted into distinct
local WebP assets: the Orthodox church, an aerial overview of the shore and
ruins, and an aerial photograph of the synagogue. Avoid duplicate uses within
the same page. Keep the Galilee tour-category referral generic rather than
adding individual tours to each attraction page.

## Second example: Tabgha

The Tabgha guide uses the same compact hero, 4:3 editorial photos, factual
summary, illustrated nearby cards, planning links, one contact form, and
final source disclosure. It adapts the visiting-hours comparison to two
independent churches and concentrates on the mosaics, the Primacy chapel,
and practical route planning. No dedicated tour product is required:
link to the regional Galilee tour catalogue and keep private-trip enquiries
linked to the form below.

High-value site facts and the verified November 2026 visitor-hours snapshot
live in `src/data/tabghaSite.ts`; its editorial body lives in
`src/components/TabghaAttractionPage.tsx`. Its older registry entry is
metadata-only, and SEO's `dateModified` matches the canonical update date.

The Multiplication church is currently listed as open Monday-Saturday
09:00-15:00 and closed Sunday. The Primacy of Peter is listed 08:00-17:00,
with last entry at 16:30 and some holiday exceptions. Keep these separate
and refresh them from the operators when they change. Do not reuse the
opening hours of another church or state an admission price unless verified.
