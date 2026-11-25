# Haifa guide: main-domain redirect and final QA

The `/travel-blog/haifa/` client navigation alias has been removed from the new site; the Hostinger deployment safely retires any obsolete HTML file after confirming `/attractions/haifa/` is present. The static deployment intentionally excludes `/.htaccess` and does not modify the old `israel-taxi.com` hosting configuration. Keep this rule **above catch-all/WordPress rules** in the old domain's Apache `.htaccess`, preserving PHP and security rules:

```apache
RewriteEngine On
RewriteRule ^travel-blog/haifa/?$ /attractions/haifa/ [R=301,L,NC]
```

Verify on the actual main domain, without automatically following redirects, that both `/travel-blog/haifa` and `/travel-blog/haifa/` return HTTP 301 with the desired Location, and the destination responds HTTP 200 with the proper canonical URL. Do not mark complete before live verification.

**Travelpayouts:** Regression tests verify product codes, registered product URLs and affiliate link platforms, but cannot prove the external shortlinks' ultimate redirect destinations. Visually verify product names/IDs on each final Viator/GetYourGuide landing page after deployment and when a provider changes a listing.
