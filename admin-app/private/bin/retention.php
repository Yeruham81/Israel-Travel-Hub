<?php
declare(strict_types=1);
namespace ITH\Admin;

// Run only from a private Hostinger cron/SSH task. No HTTP entrypoint.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/src/Core.php';

try {
    $pdo = db();
    $changes = [
        'consent_receipts' => $pdo->exec('DELETE FROM admin_consent_events WHERE recorded_at < (NOW() - INTERVAL 365 DAY)'),
        'rate_limit_hashes' => $pdo->exec('DELETE FROM admin_consent_rate_limits WHERE recorded_at < (NOW() - INTERVAL 1 DAY)'),
        'login_attempt_hashes' => $pdo->exec('DELETE FROM admin_login_attempts WHERE attempted_at < (NOW() - INTERVAL 1 DAY)'),
    ];
    foreach ($changes as $key => $count) fwrite(STDOUT, $key . ': ' . (int)$count . " expired rows removed\n");
} catch (\Throwable $error) {
    fwrite(STDERR, "Private retention maintenance failed.\n");
    exit(1);
}
