<?php
declare(strict_types=1);

/*
 * Server-only example. Copy to
 *   /home/<user>/domains/<domain>/private-admin/config.php
 * and replace placeholders. Never put the configured file under public_html
 * or commit production credentials.
 */
return [
    'db_dsn' => 'mysql:host=localhost;port=3306;dbname=ith_admin;charset=utf8mb4',
    'db_user' => 'YOUR_DATABASE_USER',
    'db_password' => 'YOUR_DATABASE_PASSWORD',
    // Run: php -r 'echo bin2hex(random_bytes(32)), PHP_EOL;'
    'audit_hmac_secret' => 'REPLACE_WITH_A_RANDOM_64_CHARACTER_HEX_VALUE',
];
