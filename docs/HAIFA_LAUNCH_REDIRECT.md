# Haifa guide: main-domain redirect and final QA

The Hostinger CI deployment intentionally excludes `/.htaccess` and will not modify the existing live `israel-taxi.com` hosting configuration. When the main domain is migrated, add this rule **above catch-all rules** in its Apache .htaccess, preserving its existing PHP and security rules:

```apache
RewriteEngine On
RewriteRule ^travel-blog/haifa/?$ /attractions/haifa/ [R=301,L,NC]
```

Verify on the actual main domain, without automatically following redirects, that both `/travel-blog/haifa` and `/travel-blog/haifa/` return HTTP 301 with the desired Location, and the destination responds HTTP 200 with the proper canonical URL. Do not mark complete before live verification.

**Travelpayouts:** Regression tests verify product codes, registered product URLs and affiliate link platforms, but cannot prove the external shortlinks' ultimate redirect destinations. Visually verify product names/IDs on each final Viator/GetYourGuide landing page after deployment and when a provider changes a listing.
