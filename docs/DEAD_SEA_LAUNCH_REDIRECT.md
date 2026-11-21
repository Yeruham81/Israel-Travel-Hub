# Dead Sea attraction guide migration

The new individual attraction guide is at /attractions/dead-sea/. It replaces the previous general Dead Sea page /travel-blog/the-dead-sea/ without replacing the distinct regional roundup /travel-blog/dead-sea-attractions/.

The trial website keeps the old path as a noindex client-side navigation alias to the new page. **That is not an HTTP 301**.

At main-domain launch, add this rule ABOVE catch-all rules in the main domain's actual Apache .htaccess (not the trial hosting deployment, which intentionally excludes .htaccess):

    RewriteEngine On
    RewriteRule ^travel-blog/the-dead-sea/?$ /attractions/dead-sea/ [R=301,L,NC]

Confirm both slash variations return HTTP 301 on the live main domain; confirm target HTTP 200 and canonical URL. Do not mark this done before the actual host is changed.

Beach information sources are linked inline and listed in the article. Never claim free public beach access means safe 24/7 bathing. Reconfirm operating hours and road closures with the responsible operators.
