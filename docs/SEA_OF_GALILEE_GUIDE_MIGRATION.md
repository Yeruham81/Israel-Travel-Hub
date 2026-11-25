# Sea of Galilee guide upgrade

New destination: /attractions/sea-of-galilee/
Previous path: /travel-blog/sea-of-galilee/

The new page is the individual lake visitor attraction, using the same shared
destination layout as the Dead Sea page. Capernaum, Tabgha, Magdala, Yardenit
and other heritage sites retain their own dedicated pages.

The old `/travel-blog/sea-of-galilee/` route and its noindex client alias have been removed from the new site. The Hostinger publishing workflow retires its obsolete HTML file after confirming the canonical attraction page is present, with a private backup outside `public_html`.

On the **old site's** Apache server, keep an HTTP 301 above any WordPress or catch-all rewrite rules:

```apache
RewriteEngine On
RewriteRule ^travel-blog/sea-of-galilee/?$ /attractions/sea-of-galilee/ [R=301,L,NC]
```

The new site's GitHub deployment does **not** write `.htaccess`. Install and verify the rule separately on the actual old-domain server. Confirm both slash variations return HTTP 301, the `Location` is correct, and the destination returns HTTP 200. Do not describe this redirect as live until verified.

Beach policies are researched from the Kinneret Cities Association. A free
pedestrian entrance does not imply free vehicle parking or supervised bathing
outside designated lifeguard hours. The page deliberately avoids presenting
dated 2026 bathing-season dates as permanent rules.

Three existing affiliate tour identifiers are reused, and current prices,
ratings and review counts are obtained on the supplier's booking pages rather
than hardcoded without sufficient validation.
