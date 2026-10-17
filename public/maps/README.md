# English area maps

`area.html` is the shared, lazily embedded map viewer. It accepts the guide's
`marker=latitude,longitude`, `bbox=west,south,east,north` and English `name`.
The larger-map link uses the same viewer and coordinates. The standalone viewer
is noindex and has no app navigation, accounts, geolocation or booking controls.

MapLibre GL JS 5.12.0 and its CSS load from pinned, integrity-checked unpkg URLs.
The library is BSD-3-Clause licensed; its distributed copyright notice is retained.
https://github.com/maplibre/maplibre-gl-js/blob/v5.12.0/LICENSE.txt

`english-style.json` adapts the OpenFreeMap Liberty style, downloaded from
https://tiles.openfreemap.org/styles/liberty on 17 October 2026. Named symbol
layers use `name:en`, then `name:latin`, then an empty label. The local `name`,
legacy `name_en` (which can fall back to a local-script name), and
`name:nonlatin` are deliberately excluded. Reference-number shields and icons
retain their original expressions. No Hebrew-label fallback is used.

Style sources, sprite, glyphs and credits are preserved. Live OpenFreeMap
TileJSON supplies the current tile release; no dated tile-release URL is pinned.
The adapted style is hosted here so labels are English from the first render.

Style credit: OpenFreeMap / OSM Liberty / OSM Bright / Mapbox Open Styles.
Style design: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ .
Modification: English/Latin labels. The upstream BSD and MIT license notices
are in `LICENSE-OSM-Liberty.md` and `LICENSE-OpenFreeMap.md`.
Visible map credits link to OpenStreetMap, OpenMapTiles and the original style.

OpenFreeMap permits commercial use of its public instance without registration,
API keys, mandatory subscriptions or usage charges:
https://openfreemap.org/ . No paid map service or billing configuration is used.

If the SDK, WebGL or map data cannot load, an English notice provides an ordinary
Google Maps location link (not a Google Maps API integration). It uses the same
coordinates; its display language in a native Maps app follows that app's settings.
