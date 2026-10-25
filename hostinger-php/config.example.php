<?php
// COPY THIS TEMPLATE MANUALLY to a file OUTSIDE Hostinger's public_html:
//   <directory containing public_html>/ith-hostinger-config.php
// Never put your API key in GitHub, Lovable messages or /public_html.
// Until enabled, the quote endpoint reports available:false and POST returns 503.
return [
    'BREVO_API_KEY' => 'INSERT_YOUR_BREVO_TRANSACTIONAL_EMAIL_KEY_LOCALLY',
    'QUOTE_DELIVERY_ENABLED' => false,
    // The PHP process must be able to create and write this directory.
    // It MUST be outside public_html.
    // 'STORAGE_DIR' => '/home/username/domains/example.com/ith-private-cache',
];
